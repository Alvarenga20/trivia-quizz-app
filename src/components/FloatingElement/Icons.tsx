export type IconName =
  | "question"
  | "lightbulb"
  | "trophy"
  | "campaign"
  | "star";

export const Icons: Record<IconName, (size: string) => JSX.Element> = {
  question: (size) => (
    <span className={`material-symbols-outlined text-white ${size}`}>
      question_mark
    </span>
  ),
  lightbulb: (size) => (
    <span className={`material-symbols-outlined text-white ${size}`}>
      lightbulb
    </span>
  ),
  trophy: (size) => (
    <span className={`material-symbols-outlined text-white ${size}`}>
      trophy
    </span>
  ),
  star: (size) => (
    <span className={`material-symbols-outlined text-white ${size}`}>star</span>
  ),
  campaign: (size) => (
    <span className={`material-symbols-outlined text-white ${size}`}>
      campaign
    </span>
  ),
};
export const DefaultIcon = (size: string) => (
  <span className={`material-symbols-outlined ${size}`}>help_outline</span>
);
