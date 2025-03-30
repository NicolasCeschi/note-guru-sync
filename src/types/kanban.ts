
export interface Note {
  id: string;
  content: string;
  completed: boolean;
  createdAt: string;
}

export interface Column {
  id: string;
  title: string;
  notes: Note[];
}

export interface Board {
  columns: Column[];
}
