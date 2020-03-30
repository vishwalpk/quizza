export interface Option {
  selected?: boolean;
  value: string;
}
export type Options = [Option, Option, Option, Option];
export default interface Question {
  value: string;
  options: Options;
}
