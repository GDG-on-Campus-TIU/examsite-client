export type ExamType = {
  _id: string;
  name: string;
  slug: string;
  dept: string;
  iteration: number;
  mainSubject: string;
  subTopics: Array<string>;
  totalMarks: number;
  marksPerQuestion: number;
  started: "YES" | "NO";
  start_date: Date;
};

export type QuestionType = {
  question: string;
  choices: Array<{ index: number; choice: string }>;
  rightChoice: { index: number; choice: string };
  examId: string;
  _id: string;
};
