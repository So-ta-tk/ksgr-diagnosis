import './style.css';
import {questions as guraQuestions} from './question/question_a.ts';
import {questions as guriQuestions} from './question/question_i.ts';
import  type {Question} from './question/question.ts';

// ==========================================================
// 型
// ==========================================================
type ScreenId = "start-screen" | "choice-screen" | "question-screen";
type Role = "ぐり" | "ぐら" | "両方";

// ==========================================================
// 状態
// ==========================================================
let selectedRole: Role | null = null;

// ==========================================================
// 質問関連
// ==========================================================
function getElement<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id);
  if (element === null) {
    throw new Error(`#${id} が見つかりません`);
  }
  return element as T;
}

// 現在の質問番号
let currentQuestionIndex = 0;

// 回答を保存する
const selectedAnswers: Record<number, string> = {};

let currentQuestions: Question[]=[];

function setCurrentQuestions(): void {
  if (selectedRole === "ぐら") {
    currentQuestions = guraQuestions;
  } else if (selectedRole === "ぐり") {
    currentQuestions = guriQuestions;
  } else {
    currentQuestions = [];
  }
}
// 質問を表示する
function showQuestion(index: number): void {
  const question = currentQuestions[index];

  if (!question) {
    return;
  }

  currentQuestionIndex = index;

  getElement("question-number").textContent =
    `QUESTION ${index + 1} / ${currentQuestions.length}`;

  getElement("question-text").textContent = question.text;

  const choicesArea = getElement<HTMLDivElement>("question-choices");

  // 選択肢をリセット
  choicesArea.replaceChildren();
  const prevButton = getElement<HTMLButtonElement>("prev-question-button");

  // 1問目では戻るボタンを非表示にする
  prevButton.style.display = index === 0 ? "none" : "block";

  // クリックしたら1問前に戻る
  prevButton.onclick = () => {
    if (currentQuestionIndex > 0) {
      showQuestion(currentQuestionIndex - 1);
    }
  };

  // 選択肢を生成
  question.choices.forEach((choice) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "choice-button";
    button.textContent = choice.text;

    // クリックしたら回答を保存して次へ
    button.addEventListener("click", () => {
      selectedAnswers[index] = choice.id;

      // 最後の質問か確認
      if (index + 1 < currentQuestions.length) {
        showQuestion(index + 1);
      } else {
        // 全問回答完了
        showResult();
      }
    });

    choicesArea.appendChild(button);
  });
}

//点数計算

function calculateScores(): Record<string, number> {
  const totalScores: Record<string, number> = {
    swt: 0,
    cl: 0,
    domi: 0,
    subm: 0,
    prog: 0,
    imme: 0,
    reac: 0,
    sens: 0,
  };

  currentQuestions.forEach((question, index) => {
    const selectedChoiceId = selectedAnswers[index];

    const selectedChoice = question.choices.find(
      (choice) => choice.id === selectedChoiceId
    );

    if (!selectedChoice) return;

    Object.entries(selectedChoice.scores).forEach(([key, point]) => {
      totalScores[key] = (totalScores[key] ?? 0) + point;
    });
  });

  return totalScores;
}



//　判定
function diagnosis(){
    const KSGR = {
      K:"K",
      S:"S",
      G:"G",
      R:"R"
    };
    const rate = {
      K:0,
      S:0,
      G:0,
      R:0
    };
    const scores =calculateScores();
  if(selectedRole == "ぐら"){
    const maxScore ={
      swt: 3,
      cl: 3.2,
      domi: 2.2,
      subm: 2.1,
      prog: 2.3,
      imme: 2.4,
      reac: 3.1,
      sens: 3.2,
    };
    const normScores={
      swt: scores.swt / maxScore.swt,
      cl: scores.cl / maxScore.cl,
      domi: scores.domi / maxScore.domi,
      subm: scores.subm / maxScore.subm,
      prog: scores.prog / maxScore.prog,
      imme: scores.imme / maxScore.imme,
      reac: scores.reac / maxScore.reac,
      sens: scores.sens / maxScore.sens,
    };

    //K
    if(normScores.swt > normScores.cl){
      KSGR.K ="S";
      rate.K = Math.round((normScores.swt/(normScores.cl+normScores.swt))*100);
    }else{
      KSGR.K ="C";
      rate.K = Math.round((normScores.cl/(normScores.swt+normScores.cl))*100);
    };
    //S
    if(normScores.prog > normScores.imme){
      KSGR.S ="P";
      rate.S = Math.round((normScores.prog/(normScores.imme+normScores.prog))*100);
    }else{
      KSGR.S ="I";
      rate.S = Math.round((normScores.imme/(normScores.prog+normScores.imme))*100);
    };
    //G
    if(normScores.reac > normScores.sens){
      KSGR.G ="R";
      rate.G = Math.round((normScores.reac/(normScores.sens+normScores.reac))*100);
    }else{
      KSGR.G ="S";
      rate.G = Math.round((normScores.sens/(normScores.reac+normScores.sens))*100);
    };
    //R
    if(normScores.domi > normScores.subm){
      KSGR.R ="D";
      rate.R = Math.round((normScores.domi/(normScores.subm+normScores.domi))*100);
    }else{
      KSGR.R ="S";
      rate.R = Math.round((normScores.subm/(normScores.domi+normScores.subm))*100);
    };
  }else if(selectedRole == "ぐり"){
    const maxScore ={
      swt: 3,
      cl: 3.2,
      domi: 2.2,
      subm: 2.1,
      prog: 2.3,
      imme: 2.4,
      reac: 3.1,
      sens: 3.2,
    };
    const normScores={
      swt: scores.swt / maxScore.swt,
      cl: scores.cl / maxScore.cl,
      domi: scores.domi / maxScore.domi,
      subm: scores.subm / maxScore.subm,
      prog: scores.prog / maxScore.prog,
      imme: scores.imme / maxScore.imme,
      reac: scores.reac / maxScore.reac,
      sens: scores.sens / maxScore.sens,
    };

    //K
    if(normScores.swt > normScores.cl){
      KSGR.K ="S";
      rate.K = Math.round((normScores.swt/(normScores.cl+normScores.swt))*100);
    }else{
      KSGR.K ="C";
      rate.K = Math.round((normScores.cl/(normScores.swt+normScores.cl))*100);
    };
    //S
    if(normScores.prog > normScores.imme){
      KSGR.S ="P";
      rate.S = Math.round((normScores.prog/(normScores.imme+normScores.prog))*100);
    }else{
      KSGR.S ="I";
      rate.S = Math.round((normScores.imme/(normScores.prog+normScores.imme))*100);
    };
    //G
    if(normScores.reac > normScores.sens){
      KSGR.G ="R";
      rate.G = Math.round((normScores.reac/(normScores.sens+normScores.reac))*100);
    }else{
      KSGR.G ="S";
      rate.G = Math.round((normScores.sens/(normScores.reac+normScores.sens))*100);
    };
    //R
    if(normScores.domi > normScores.subm){
      KSGR.R ="D";
      rate.R = Math.round((normScores.domi/(normScores.subm+normScores.domi))*100);
    }else{
      KSGR.R ="S";
      rate.R = Math.round((normScores.subm/(normScores.domi+normScores.subm))*100);
    };
  };


  const result = KSGR.K + KSGR.S + KSGR.G + KSGR.R;
  console.log("診断結果:", result);
  return [result,KSGR,rate];  
  
}

// 結果の表示
function showResult(): void {
  const scores = calculateScores();
  const [result,KSGR,rate] = diagnosis();
  const role =selectedRole;

  console.log("診断結果の点数:", scores);
  console.log("全回答:", selectedAnswers);
  console.log("診断結果:", result);
  console.log("KSGR:", KSGR);
  console.log("rate:", rate);
    sessionStorage.setItem(
      "diagnosisData",
      JSON.stringify({
        result,
        scores,
        KSGR,
        rate,
        role
      })
    );
  window.location.href = "./result/result.html";
}




// ==========================================================
// 画面遷移
//   すべての .screen から .active を外し、指定した画面だけに付ける。
//   表示/非表示は CSS(.screen / .screen.active)で制御する。
// ==========================================================
function showScreen(screenId: ScreenId): void {
  document.querySelectorAll<HTMLElement>(".screen").forEach((screen) => {
    screen.classList.remove("active");
  });
  getElement(screenId).classList.add("active");
  window.scrollTo(0, 0);
}

// ==========================================================
// 役割の選択(選ぶまで「次へ」は押せない)
// ==========================================================
function selectRole(role: Role, button: HTMLButtonElement): void {
  selectedRole = role;

  document.querySelectorAll<HTMLButtonElement>(".choice-button").forEach((b) => {
    b.classList.remove("selected");
    b.setAttribute("aria-pressed", "false");
  });
  button.classList.add("selected");
  button.setAttribute("aria-pressed", "true");

  getElement<HTMLButtonElement>("next-button").disabled = false;
}

// 役割選択 → 質問画面へ
function goToQuestion(): void {
  if (selectedRole === null) {
    return;
  }
  setCurrentQuestions();      // 選んだ立場の質問セットを入れる
  showQuestion(0);            // 1問目を表示する
  getElement("selected-role").textContent = `選択中の立場: ${selectedRole}`;
  showScreen("question-screen");
}

// ==========================================================
// イベントの登録
// ==========================================================

// data-goto="画面ID" を持つボタン → その画面へ移動
document.querySelectorAll<HTMLElement>("[data-goto]").forEach((button) => {
  button.addEventListener("click", () => {
    const destination = button.dataset.goto as ScreenId;

    // HOMEに戻るときだけ診断状態をリセット
    Object.keys(selectedAnswers).forEach((key) => {
      delete selectedAnswers[Number(key)];
    });

    selectedRole = null;
  

    showScreen(destination);
  });
});
// data-role="ぐり" などを持つボタン → 役割を選択
document.querySelectorAll<HTMLButtonElement>("[data-role]").forEach((button) => {
  button.addEventListener("click", () => {
    selectRole(button.dataset.role as Role, button);
  });
});


// 「次へ」ボタン
getElement<HTMLButtonElement>("next-button").addEventListener("click", goToQuestion);

showQuestion(currentQuestionIndex);
