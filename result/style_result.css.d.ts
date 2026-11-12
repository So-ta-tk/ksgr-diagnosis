declare const styles: {
  "result-page": string;
  "card-frame": string;
  stage: string;
  actions: string;
  button: string;
  "button--sub": string;
  description: string;
  "description__heading": string;
  "description__text": string;
  card: string;
  "card__header": string;
  "card__body": string;
  "card__left": string;
  character: string;
  "character__label": string;
  "character__size": string;
  "character__img": string;
  "card__code": string;
  "card__right": string;
  "card__type-label": string;
  "card__name": string;
  "card__catch": string;
  chips: string;
  chip: string;
  "chip__text": string;
  "chip__axis": string;
  "chip__pole": string;
  "chip__pct": string;
  "card__footer": string;
  barcode: string;
  "card__footer-text": string;
};

declare module "*.css" {
  const styles: {
    [className: string]: string;
  };
  export default styles;
}