
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
        text: "抱き着いたり、甘えたりする距離",
        scores: { swt: 1 },
      },
      {
        id: "b",
        text: "ただ単にプレイするだけの関係",
        scores: { cl: 1 },
      },
      {
        id: "c",
        text: "特にこだわりはない（相手に任せる）",
        scores: {},
      },
    ],
  },
  {
    id: 2,
    text: "プレイの始まり方はどんな感じがいい？",
    choices: [
      {
        id: "a",
        text: "不意打ちスタート",
        scores: { prog: 1.3 },
      },
      {
        id: "b",
        text: "お互いの準備ができたら",
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
    text: "プレイ中、相手があなたの予想とは違う展開に進めようとしている。あなたは？",
    choices: [
      {
        id: "a",
        text: "自分の希望する流れに戻したい",
        scores: { domi: 1 },
      },
      {
        id: "b",
        text: "嫌じゃない範囲なら、相手に任せて楽しみたい",
        scores: { subm: 1 },
      },
      {
        id: "c",
        text: "なんでもウェルカムで楽しみたい",
        scores: {},
      },
    ],
  },
  {
    id: 4,
    text: "自分が特に好きな部位の周りをくすぐられてる時、あなたはどうする？",
    choices: [
      {
        id: "a",
        text: "早く触ってとお願いする",
        scores: { domi: 0.2, prog: 0.5 },
      },
      {
        id: "b",
        text: "焦らされている感覚を楽しむ",
        scores: { subm: 0.1, imme: 0.6, sens: 0.1 },
      },
      {
        id: "c",
        text: "触ってほしくてもはずかしくて言えない",
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
        text: "自分の反応を見た相手が、楽しそうにしていること",
        scores: { reac: 1.1 },
      },
      {
        id: "b",
        text: "刺激を存分に味わえること",
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
    text: "くすぐられている時に鏡を置かれたらどうなる？",
    choices: [
      {
        id: "a",
        text: "恥ずかしいけれど、つい自分の姿を見てしまう",
        scores: { sens: 1 },
      },
      {
        id: "b",
        text: "相手の手の動きを見てドキドキする",
        scores: { reac: 1 },
      },
      {
        id: "c",
        text: "絶対に鏡なんか見ない",
        scores: {},
      },
    ],
  },
  {
    id: 7,
    text: "プレイが終わったあと、『どんな可愛いリアクションだったか』を相手に褒められたり振り返られたりするのは好き？",
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
        text: "あまり好きじゃない",
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
    text: "仕返しでぐりの人をくすぐる時、あなたはどう感じる？",
    choices: [
      {
        id: "a",
        text: "仕返しの仕返し待ち",
        scores: { subm: 1 },
      },
      {
        id: "b",
        text: "立場の逆転そのものが楽しい",
        scores: { domi: 1 },
      },
      {
        id: "c",
        text: "自分が仕返しするのは好みではない",
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