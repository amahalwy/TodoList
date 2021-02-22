export interface Todo {
  id?: number;
  duration: string | number;
  timeLeft?: number;
  active: boolean;
  status: string;
  description: string;
  groupId?: number;
  groupMain?: boolean;
}

export interface ListProps {
  todos: Todo[];
  setTodos: (t) => void;
}

export interface DisplayInfoProps {
  todo: Todo;
  todos: Todo[];
  status: string;
  timeLeft: number;
  activeTodos: number[];
  start: () => void;
  finishTodo: (t) => void;
  toggleActive: (t) => void;
  setActiveTodos: (t) => void;
}

export interface TodoItemProps {
  id: number;
  todo: Todo;
  todos: Todo[];
  activeTodos: number[];
  setTodos: (t) => void;
  setActiveTodos: (t) => void;
}

export interface TimerProps {
  todo: Todo;
  todos: Todo[];
  status: string;
  activeTodos: number[];
  setStatus: (s) => void;
  setActiveTodos: (t) => void;
}

export interface AddTodoProps {
  todos: Todo[];
  setTodos: (t) => void;
}

export interface TableFooterProps {
  todos: Todo[];
}

export interface GroupedTodosProps {
  todos: Todo[];
  todoCount: number;
  setTodos: (t) => void;
  setTodoCount: (n) => void;
}

export interface RenderFieldsProps {
  idx: number;
  todoCount: number;
  inputLength: any[];
  setTodoCount: (t) => void;
  setInputLength: (t) => void;
}
