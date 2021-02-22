import React from "react";
import { Button, Box, Text } from "@chakra-ui/react";
import { GiPauseButton } from "react-icons/gi";
import { BsPlayFill } from "react-icons/bs";
import { DisplayInfoProps } from "../typescript/interfaces";
import { STATUSES } from "../generals/statuses";
import { timeConvert } from "../generals/functions";

const DisplayInfo: React.FC<DisplayInfoProps> = ({
  todo,
  todos,
  status,
  timeLeft,
  activeTodos,
  start,
  finishTodo,
  toggleActive,
  setActiveTodos,
}) => {
  const startAllArray = todos.filter((val) => todo.groupId === val.groupId);

  const toggleAll = (todo) => {
    if (activeTodos.length > 0) {
      const currentTodos = activeTodos;
      setActiveTodos([]);
      currentTodos.map((id) => (todos[id].active = false));
      localStorage.setItem("todos", JSON.stringify(todos));
    } else {
      const newIds = todos
        .filter((value) => {
          if (value.groupId === todo.groupId) return value;
        })
        .map((val) => val.id);

      const newTodos = activeTodos.concat(newIds);
      setActiveTodos(newTodos);
      newTodos.map((id) => (todos[id].active = true));
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  };

  if (!todo.duration && !todo.groupId) {
    if (!activeTodos.includes(todo.id) && status !== STATUSES.COMPLETED) {
      return (
        <Button
          onClick={start}
          // disabled={activeTodo && activeTodo !== todo.id}
        >
          Start
        </Button>
      );
    } else if (activeTodos.includes(todo.id) && status !== STATUSES.COMPLETED) {
      return (
        <Button
          onClick={finishTodo}
          // disabled={activeTodo && activeTodo !== todo.id}
        >
          Complete
        </Button>
      );
    } else if (!activeTodos.includes(todo.id) && status === STATUSES.COMPLETED)
      return null;
  } else {
    if (!todo.groupId) {
      if (status === STATUSES.NOT_STARTED) {
        return (
          <Button
            onClick={start}
            // disabled={activeTodo && activeTodo !== todo.id}
          >
            Start
          </Button>
        );
      } else if (status === STATUSES.COMPLETED) {
        return (
          <Box display="flex" alignItems="center">
            <Text>{timeConvert(timeLeft)}</Text>
          </Box>
        );
      } else if (status === STATUSES.IN_PROGRESS) {
        if (activeTodos.length > 0 && activeTodos.includes(todo.id)) {
          return (
            <Box display="flex" alignItems="center">
              <Text>{timeConvert(timeLeft)}</Text>
              <Button onClick={toggleActive} size="sm" m="0 4px">
                <GiPauseButton />
              </Button>
            </Box>
          );
        } else if (activeTodos.length >= 0 && !activeTodos.includes(todo.id)) {
          return (
            <Box display="flex" alignItems="center">
              <Text>{timeConvert(timeLeft)}</Text>
              <Button
                onClick={toggleActive}
                size="sm"
                m="0 4px"
                // disabled={activeTodo && activeTodo !== todo.id}
              >
                <BsPlayFill />
              </Button>
            </Box>
          );
        }
      }
    } else {
      if (!activeTodos.includes(todo.id)) {
        if (
          todo.id === startAllArray[0].id &&
          status === STATUSES.NOT_STARTED
        ) {
          return (
            <Button
              onClick={() => toggleAll(todo)}
              // disabled={activeTodos.length > 0 && }
            >
              Start Group
            </Button>
          );
        } else if (
          todo.id === startAllArray[0].id &&
          status === STATUSES.IN_PROGRESS
        ) {
          return (
            <Box display="flex" alignItems="center">
              <Text>{timeConvert(timeLeft)}</Text>
              <Button
                onClick={() => toggleAll(todo)}
                size="sm"
                m="0 4px"
                // disabled={activeTodo && activeTodo !== todo.id}
              >
                <BsPlayFill />
              </Button>
            </Box>
          );
        } else {
          return null;
        }
      } else {
        if (todo.id === startAllArray[0].id) {
          console.log("first!");
          console.log(timeLeft);
          return (
            <Box display="flex" alignItems="center">
              <Text>{timeConvert(timeLeft)}</Text>
              <Button onClick={() => toggleAll(todo)} size="sm" m="0 4px">
                <GiPauseButton />
              </Button>
            </Box>
          );
        } else {
          console.log("not first!");
          return null;
        }
      }
    }
  }
};

export default DisplayInfo;
