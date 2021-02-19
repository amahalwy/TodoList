import React from "react";
import { Button, Box, Text } from "@chakra-ui/react";
import { GiPauseButton } from "react-icons/gi";
import { BsPlayFill } from "react-icons/bs";
import { DisplayInfoProps } from "../typescript/interfaces";
import { STATUSES } from "../generals/statuses";
import { timeConvert } from "../generals/functions";

const DisplayInfo: React.FC<DisplayInfoProps> = ({
  todo,
  status,
  timeLeft,
  activeTodos,
  start,
  finishTodo,
  toggleActive,
}) => {
  if (!todo.duration) {
    if (!activeTodos.includes(todo.id) && status !== STATUSES.COMPLETED) {
      return (
        <Button
          onClick={start}
          // disabled={activeTodo && activeTodo !== todo.id}
        >
          Start
        </Button>
      );
    } else if (!todo.duration && activeTodos.includes(todo.id)) {
      return (
        <Button
          onClick={finishTodo}
          // disabled={activeTodo && activeTodo !== todo.id}
        >
          Complete
        </Button>
      );
    } else if (
      !todo.duration &&
      !activeTodos.includes(todo.id) &&
      status === STATUSES.COMPLETED
    )
      return null;
  } else {
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
    } else if (
      activeTodos.length > 0 &&
      activeTodos.includes(todo.id) &&
      status === STATUSES.IN_PROGRESS
    ) {
      return (
        <Box display="flex" alignItems="center">
          <Text>{timeConvert(timeLeft)}</Text>
          <Button onClick={toggleActive} size="sm" m="0 4px">
            <GiPauseButton />
          </Button>
        </Box>
      );
    } else if (
      activeTodos.length >= 0 &&
      !activeTodos.includes(todo.id) &&
      status === STATUSES.IN_PROGRESS
    ) {
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
};

export default DisplayInfo;
