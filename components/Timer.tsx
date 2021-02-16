import React from "react";
import { Td, Button, Box } from "@chakra-ui/react";
import DisplayInfo from "./DisplayInfo";
import { TimerProps } from "../typescript/interfaces";
import { CloseIcon } from "@chakra-ui/icons";

const Timer: React.FC<TimerProps> = ({
  todo,
  todos,
  status,
  setStatus,
  activeTodo,
  setActiveTodo,
}) => {
  const [initialDuration, setInitialDuration] = React.useState<number | any>(
    Number(todo.duration) * 60000
  );

  const [timeLeft, setTimeLeft] = React.useState<number | any>(
    todo.timeLeft === undefined ? Number(todo.duration) * 60000 : todo.timeLeft
  );

  React.useEffect(() => {
    todo.timeLeft = timeLeft;
    getAndSetStatus();
    localStorage.setItem("todos", JSON.stringify(todos));

    let interval = null;

    if (activeTodo === todo.id && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1000);
      }, 1000);
    } else if (activeTodo === todo.id && timeLeft <= 0) {
      setActiveTodo(null);
      getAndSetStatus();
      todo.active = false;
    }

    return () => clearInterval(interval);
  }, [activeTodo, timeLeft]);

  const start = () => {
    setActiveTodo(todo.id);
    todos[todo.id].active = true;
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleActive = () => {
    activeTodo === null ? setActiveTodo(todo.id) : setActiveTodo(null);
    todos[todo.id].active
      ? (todos[todo.id].active = false)
      : (todos[todo.id].active = true);

    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getAndSetStatus = () => {
    if (timeLeft >= initialDuration) {
      setStatus("Not Started");
      todo.status = "Not Started";
      return;
    } else if (timeLeft > 0 && timeLeft < initialDuration) {
      setStatus("In Progress...");
      todo.status = "In Progress...";
      return;
    } else if (timeLeft === 0) {
      setStatus("Completed");
      todo.status = "Completed";
      return;
    }
  };

  return (
    <Td>
      <Box d="flex">
        <DisplayInfo
          todo={todo}
          start={start}
          status={status}
          timeLeft={timeLeft}
          activeTodo={activeTodo}
          toggleActive={toggleActive}
        />
      </Box>
    </Td>
  );
};

export default Timer;
