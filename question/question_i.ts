export type Question = {
  id: number;
  text: string;
  choices: {
    id: string;
    text: string;
    scores: Record<string, number>;
  }[];
};


export const questions: Question[] = [
  {
    id: 1,
    text: "プレイ中、相手との距離感で理想に近いのは？",
    choices: [
      {
        id: "a",
        text: "抱き着いたり、甘えたりできる親密な関係",
        scores: { swt: 1 },
      },
      {
        id: "b",
        text: "お互いにプレイを楽しむことを中心とした関係",
        scores: { cl: 1 },
      },
      {
        id: "c",
        text: "特にこだわりはない（相手に合わせる）",
        scores: {},
      },
    ],
  },
  {
    id: 2,
    text: "プレイの始め方はどんな感じがいい？",
    choices: [
      {
        id: "a",
        text: "不意打ちでくすぐり始める",
        scores: { prog: 1.3 },
      },
      {
        id: "b",
        text: "お互いの準備ができてから始める",
        scores: { imme: 1.3 },
      },
      {
        id: "c",
        text: "特にこだわりはない",
        scores: {},
      },
    ],
  },
  {
    id: 3,
    text: "プレイ中、相手があなたの予想とは違う反応を見せたら、どうする？",
    choices: [
      {
        id: "a",
        text: "自分の想定していた反応や展開に近づけたい",
        scores: { domi: 1 },
      },
      {
        id: "b",
        text: "嫌がっていないなら、相手の反応に合わせて楽しみたい",
        scores: { subm: 1 },
      },
      {
        id: "c",
        text: "予想外の反応も含めて、何でも楽しみたい",
        scores: {},
      },
    ],
  },
  {
    id: 4,
    text: "相手の弱点を知っているとき、あなたはどうする？",
    choices: [
      {
        id: "a",
        text: "相手の反応を見ながら、すぐその部位をくすぐる",
        scores: { domi: 0.2, prog: 0.5 },
      },
      {
        id: "b",
        text: "あえて弱点の周りなどを責めて、相手の反応をじっくり楽しむ",
        scores: { subm: 0.1, imme: 0.6, sens: 0.1 },
      },
      {
        id: "c",
        text: "知らないふりをして別の場所を責める",
        scores: { domi: 0.1, prog: 0.1 },
      },
    ],
  },
  {
    id: 5,
    text: "プレイ中、あなたがより嬉しいと感じるのは？",
    choices: [
      {
        id: "a",
        text: "自分のくすぐりで相手が可愛い反応を見せてくれること",
        scores: { reac: 1.1 },
      },
      {
        id: "b",
        text: "相手をくすぐる感覚そのものを存分に味わえること",
        scores: { reac: 0.5, sens: 0.5 },
      },
      {
        id: "c",
        text: "どちらも好き",
        scores: { sens: 1 },
      },
    ],
  },
  {
    id: 6,
    text: "くすぐっている最中に鏡を置くとき、どうする？",
    choices: [
      {
        id: "a",
        text: "鏡越しに、くすぐっている手の動きを見る",
        scores: { sens: 1 },
      },
      {
        id: "b",
        text: "鏡越しに、相手の反応を見て楽しむ",
        scores: { reac: 1 },
      },
      {
        id: "c",
        text: "特に鏡を見る必要はない",
        scores: {},
      },
    ],
  },
  {
    id: 7,
    text: "プレイが終わったあと、『どんな可愛いリアクションだったか』を相手に褒めたり振り返ったりするのは好き？",
    choices: [
      {
        id: "a",
        text: "すごく好き",
        scores: { reac: 1 },
      },
      {
        id: "b",
        text: "普通",
        scores: { cl: 0.2 },
      },
      {
        id: "c",
        text: "あまり好きではない",
        scores: { sens: 1 },
      },
    ],
  },
  {
    id: 8,
    text: "信頼できる相手とのプレイ前後、あなたはどのように過ごすのが好き？",
    choices: [
      {
        id: "a",
        text: "ご飯や雑談も楽しみながら、気分を切り替えてプレイしたい",
        scores: { cl: 0.5, prog: 0.5 },
      },
      {
        id: "b",
        text: "プレイの余韻やその場の雰囲気を大切にして、二人だけの時間をじっくり楽しみたい",
        scores: { swt: 1, imme: 0.5 },
      },
      {
        id: "c",
        text: "プレイ前後の時間にはあまりこだわらず、プレイそのものを楽しめれば十分",
        scores: { cl: 1 },
      },
    ],
  },
  {
    id: 9,
    text: "相手から仕返しでくすぐられるとき、あなたはどう感じる？",
    choices: [
      {
        id: "a",
        text: "さらに仕返しをしたくなる",
        scores: { subm: 1 },
      },
      {
        id: "b",
        text: "立場が逆転することそのものを楽しむ",
        scores: { domi: 1 },
      },
      {
        id: "c",
        text: "自分がくすぐられるのはあまり好みではない",
        scores: { subm: 0.5 },
      },
    ],
  },
  {
    id: 10,
    text: "同じ相手と何度もプレイするうちに、あなたが嬉しいと感じるのは？",
    choices: [
      {
        id: "a",
        text: "プレイ以外でも仲良くなり、特別な存在になれること",
        scores: { swt: 1 },
      },
      {
        id: "b",
        text: "お互いの好みを理解し、プレイの相性が深まること",
        scores: { swt: 0.5, cl: 0.2 },
      },
      {
        id: "c",
        text: "毎回気軽にプレイを楽しめる関係でいられること",
        scores: { cl: 1, sens: 0.1 },
      },
    ],
  },
];

