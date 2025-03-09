export interface INote {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

export const emptyNote: INote = {
  id: -1,
  title: '',
  content: '',
  created_at: ''
}

export enum EditMode {
  read,
  edit
}

