export interface TodoItem {
  id?: number;
  title: string;
  status: string;

  comments: string[];
}

export type UpdateTodoItem = Omit<Partial<TodoItem>, 'comments'> & {
  comment?: string;
}

