export type Question = {
  id: number;
  text: string;
  choices: {
    id: string;
    text: string;
    scores: Record<string, number>;
  }[];
};