export interface ListProps {
  todos: Todo[];
  setTodos: (t) => void;
}

export interface Todo {
  id?: number;
  duration: string | number;
  timeLeft?: number;
  active: boolean;
  status: string;
  description: string;
}

export interface DisplayInfoProps {
  todo: Todo;
  status: string;
  timeLeft: number;
  activeTodo: number;
  start: () => void;
  toggleActive: (t) => void;
}

export interface TodoItemProps {
  id: number;
  todo: Todo;
  todos: Todo[];
  activeTodo: number;
  setTodos: (t) => void;
  setActiveTodo: (t) => void;
}

export interface TimerProps {
  todo: Todo;
  todos: Todo[];
  status: string;
  activeTodo: number;
  setStatus: (s) => void;
  setActiveTodo: (t) => void;
}
