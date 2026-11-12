import "./style_result.css";
import {explains} from './type_explain.ts';


// ==========================================================
// 型と定義
// ==========================================================
type AxisKey = "relation" | "playstyle" | "focus" | "initiative";
type KsgrKey = "K" | "S" | "G" | "R";
type Pole = { ja: string; en: string };

type AxisDef = {
  axis: AxisKey;      // HTML の data-axis / data-letter と同じ名前
  key: KsgrKey;       // 診断データ(KSGR / rate)のキー
  firstCode: string;  // KSGR[key] がこの値なら「前の極」が勝ち
  first: Pole;        // 前の極(カードでは左)
  second: Pole;       // 後の極(カードでは右)
};

// 4軸の定義。カードに表示される順番(上から)もこの並びになる。
// 軸の名前と KSGR のキーは必ずここで1組にして持つ(別々の配列にしない)。
const AXES: AxisDef[] = [
  {
    axis: "relation", key: "K", firstCode: "S",
    first: { ja: "甘い", en: "Sweet" },
    second: { ja: "ドライ", en: "Cool" },
  },
  {
    axis: "playstyle", key: "S", firstCode: "P",
    first: { ja: "変化", en: "Progression" },
    second: { ja: "じっくり", en: "Immersive" },
  },
  {
    axis: "focus", key: "G", firstCode: "R",
    first: { ja: "反応", en: "Reaction" },
    second: { ja: "感覚", en: "Sensation" },
  },
  {
    axis: "initiative", key: "R", firstCode: "D",
    first: { ja: "支配", en: "Dominance" },
    second: { ja: "従順", en: "Submission" },
  },
];

type DiagnosisData = {
  result: unknown;
  scores: unknown;
  KSGR: Record<string, string>;
  rate: Record<string, number | string>;
  role: unknown;
};

// ==========================================================
// 保存したデータを取得
// ==========================================================
function loadData(): DiagnosisData | null {
  const storedData = sessionStorage.getItem("diagnosisData");
  if (storedData === null) {
    return null;
  }
  try {
    return JSON.parse(storedData) as DiagnosisData;
  } catch (error) {
    console.error("diagnosisData を読み込めませんでした:", error);
    return null;
  }
}

// ==========================================================
// 描画の部品
// ==========================================================

// [data-axis="軸"] の中の [data-field="項目"] に文字を入れる
function setAxisText(axis: string, field: string, value: string): void {
  const element = document.querySelector(
    `[data-axis="${axis}"] [data-field="${field}"]`
  );
  if (element) {
    element.textContent = value;
  }
}

// [data-axis="軸"] の中の棒の長さ(%)を決める
function setBarWidth(axis: string, field: string, percent: number): void {
  const element = document.querySelector<HTMLElement>(
    `[data-axis="${axis}"] [data-field="${field}"]`
  );
  if (element) {
    element.style.width = `${percent}%`;
  }
}

// 頭文字(S / I / R / D)と英単語を入れる
function setLetter(axis: string, word: string): void {
  const initial = document.querySelector(
    `[data-letter="${axis}"] [data-field="initial"]`
  );
  const wordElement = document.querySelector(
    `[data-letter="${axis}"] [data-field="word"]`
  );
  if (initial) {
    initial.textContent = word.charAt(0);
  }
  if (wordElement) {
    wordElement.textContent = word;
  }
}

// 1つの軸(棒グラフと頭文字)を描く
function renderAxis(
  def: AxisDef,
  ksgr: Record<string, string>,
  rate: Record<string, number | string>
): void {
  const axisElement = document.querySelector<HTMLElement>(
    `.axis[data-axis="${def.axis}"]`
  );
  if (!axisElement) {
    return;
  }

  // 診断結果が「前の極」なら左、「後の極」なら右が勝ち
  const firstWins = ksgr[def.key] === def.firstCode;
  const winner = firstWins ? def.first : def.second;

  axisElement.dataset.win = firstWins ? "left" : "right";
  setAxisText(def.axis, "left", def.first.ja);
  setAxisText(def.axis, "right", def.second.ja);
  setLetter(def.axis, winner.en);

  // 優勢度(勝った側の割合)。数値でなければ数値と棒は触らない
  const pct = Number(rate[def.key]);
  if (!Number.isFinite(pct)) {
    return;
  }
  const winnerShare = Math.min(100, Math.max(0, pct));
  const leftShare = firstWins ? winnerShare : 100 - winnerShare;

  // 数値は両側に入れる。負けた側の数値は CSS で隠れる
  setAxisText(def.axis, "pct-left", `${winnerShare}%`);
  setAxisText(def.axis, "pct-right", `${winnerShare}%`);
  setBarWidth(def.axis, "bar-left", leftShare);
  setBarWidth(def.axis, "bar-right", 100 - leftShare);
}

// タイプ名を入れる。長い名前は CSS が文字数に合わせて1行に収まるよう縮める
function setTypeName(name: string): void {
  const element = document.getElementById("card-name");
  if (!element) {
    return;
  }
  element.textContent = name;
  element.style.setProperty("--name-chars", String(name.length));
}
function setTypecatch(name: string): void {
  const element = document.getElementById("card-catch");
  if (!element) {
    return;
  }
  element.textContent = name;
}

// ==========================================================
// 実行
// ==========================================================
const data = loadData();

if (data) {
  console.log("診断結果:", data.result);
  console.log("得点:", data.scores);
  console.log("KSGR:", data.KSGR);
  console.log("優勢度:", data.rate);
  console.log("role:",data.role);
  AXES.forEach((def) => {
    renderAxis(def, data.KSGR, data.rate);
  });
  const type =explains.find(
    (type) => type.KSGR === data.result
  );
  if(type){
    setTypeName(type?.type_name);
    setTypecatch(type?.type_explain);
    const cardRole = document.getElementById("card-role");

  if (cardRole) {
    cardRole.textContent = `as ${data.role}`;
  }
  };
  

  // タイプ名は今まで通り HTML の文字のまま。
  // 診断結果からタイプ名が決まったら、ここで次のように呼ぶ:
  // setTypeName("小悪魔な恋人");
}

// もう一度診断するボタン ====================================
const retryButton = document.getElementById("retry-button");

retryButton?.addEventListener("click", () => {
  // 保存している診断結果を削除
  sessionStorage.removeItem("diagnosisData");

  // ホーム画面に戻る
  window.location.href = "../index.html";
});
