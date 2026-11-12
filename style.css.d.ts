// style.css に定義しているクラス名の型定義。
// style.css にクラスを追加・削除したら、この一覧も合わせて更新してください。
declare const styles: {
  // 全体の枠・画面切り替え
  readonly container: string;
  readonly screen: string;
  readonly active: string;
 
  // 見出しまわり
  readonly hero: string;
  readonly "hero__label": string;
  readonly "hero__title": string;
  readonly "hero__lead": string;
  readonly heading: string;
 
  // 開始パネル
  readonly panel: string;
  readonly "panel__prompt": string;
  readonly cursor: string;
 
  // ボタン
  readonly "main-button": string;
  readonly "back-button": string;
  readonly actions: string;
  //  //ホームボタン
  readonly "home-button": string;
   
 
  // 役割の選択肢
  readonly choices: string;
  readonly "choice-button": string;
  readonly selected: string;
 
  // 質問画面
  readonly "question-placeholder": string;
  readonly "selected-role": string;
  readonly "question-options": string;
 
  // 注意書き
  readonly note: string;
};
 
export default styles;