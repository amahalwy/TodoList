import React from "react";
import { Button, Tr, Td } from "@chakra-ui/react";
import { TodoItemProps } from "../typescript/interfaces";
import Timer from "./Timer";
import { CloseIcon } from "@chakra-ui/icons";

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  todo,
  todos,
  setTodos,
  activeTodo,
  setActiveTodo,
}) => {
  const [status, setStatus] = React.useState(todo.status);

  React.useEffect(() => {
    todo.id = id;
  }, []);

  const statusColor = () => {
    switch (status) {
      case "Not Started":
        return "red";
      case "In Progress...":
        return "blue";
      case "Completed":
        return "rgb(0, 165, 0)";
    }
  };

  const removeTodo = () => {
    const newTodos = todos.slice(0, id).concat(todos.slice(id + 1));
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  return (
    <Tr borderBottom="1px solid rgb(219, 226, 236)" h="16">
      <Td>{todo.description}</Td>
      <Td>{todo.duration}</Td>
      <Td color={statusColor()}>{status}</Td>
      <Timer
        todo={todo}
        todos={todos}
        status={status}
        setStatus={setStatus}
        activeTodo={activeTodo}
        setActiveTodo={setActiveTodo}
      />
      <Td>
        <Button onClick={() => removeTodo()}>
          <CloseIcon fontSize={12} />
        </Button>
      </Td>
    </Tr>
  );
};

export default TodoItem;
