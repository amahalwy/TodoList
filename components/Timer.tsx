import React from "react";
import { Td, Box } from "@chakra-ui/react";
import DisplayInfo from "./DisplayInfo";
import { TimerProps } from "../typescript/interfaces";
import { generateTimeLeft, findAndSliceTodos } from "../generals/functions";
import { STATUSES } from "../generals/statuses";

const Timer: React.FC<TimerProps> = ({
  todo,
  todos,
  status,
  setStatus,
  activeTodos,
  setActiveTodos,
}) => {
  const [initialDuration, setInitialDuration] = React.useState<number | any>(
    todo.duration ? Number(todo.duration) * 60000 : null
  );
  const [timeLeft, setTimeLeft] = React.useState<number | any>(
    generateTimeLeft(todo)
  );

  React.useEffect(() => {
    let interval = null;

    todo.timeLeft = timeLeft;
    getAndSetStatus();
    localStorage.setItem("todos", JSON.stringify(todos));

    if (!initialDuration && activeTodos.includes(todo.id)) {
      setStatus(STATUSES.IN_PROGRESS);
      todo.active = true;
    }

    if (activeTodos.includes(todo.id) && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1000);
      }, 1000);
    } else if (
      activeTodos.includes(todo.id) &&
      timeLeft <= 0 &&
      initialDuration
    ) {
      setActiveTodos(findAndSliceTodos(activeTodos, todo));
      getAndSetStatus();
      todo.active = false;
    }

    return () => clearInterval(interval);
  }, [activeTodos, timeLeft]);

  const start = () => {
    const newTodos = activeTodos.concat(todo.id);
    setActiveTodos(newTodos);
    todos[todo.id].active = true;
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const finishTodo = () => {
    setActiveTodos(findAndSliceTodos(activeTodos, todo));
    setStatus(STATUSES.COMPLETED);
    todo.status = STATUSES.COMPLETED;
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleActive = () => {
    activeTodos.length === 0
      ? setActiveTodos(activeTodos.concat(todo.id))
      : setActiveTodos(findAndSliceTodos(activeTodos, todo));
    todos[todo.id].active
      ? (todos[todo.id].active = false)
      : (todos[todo.id].active = true);

    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getAndSetStatus = () => {
    if (timeLeft >= initialDuration) {
      setStatus(STATUSES.NOT_STARTED);
      todo.status = STATUSES.NOT_STARTED;
      return;
    } else if (timeLeft > 0 && timeLeft < initialDuration) {
      setStatus(STATUSES.IN_PROGRESS);
      todo.status = STATUSES.IN_PROGRESS;
      return;
    } else if (timeLeft === 0) {
      setStatus(STATUSES.COMPLETED);
      todo.status = STATUSES.COMPLETED;
      return;
    }
  };

  return (
    <Td>
      <Box d="flex">
        <DisplayInfo
          todo={todo}
          status={status}
          timeLeft={timeLeft}
          activeTodos={activeTodos}
          start={start}
          finishTodo={finishTodo}
          toggleActive={toggleActive}
        />
      </Box>
    </Td>
  );
};

export default Timer;
