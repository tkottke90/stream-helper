export type HtmlQueryField = {
  name: string;
  type: 'string' | 'date' | 'boolean' | 'number';
  required: boolean;
  default: string;
};
