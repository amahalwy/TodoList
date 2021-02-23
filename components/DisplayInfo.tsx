import React from "react";
import { Button, Box, Text } from "@chakra-ui/react";
import { GiPauseButton } from "react-icons/gi";
import { BsPlayFill } from "react-icons/bs";
import { DisplayInfoProps } from "../typescript/interfaces";
import { STATUSES } from "../generals/statuses";

const timeConvert = (num) => {
  if (num <= 0) return "Time Up!";
  let hours = Math.floor(num / 60000);
  let newHours: string | number = hours;
  if (hours < 10) {
    newHours = `0${hours.toString()}`;
  }
  let minutes = (num % 60000) / 1000;
  let newMinutes: string | number = minutes;
  if (minutes < 10) {
    newMinutes = `0${minutes.toString()}`;
  }
  return `${newHours}:${newMinutes}`;
};

const DisplayInfo: React.FC<DisplayInfoProps> = ({
  todo,
  status,
  timeLeft,
  activeTodo,
  start,
  finishTodo,
  toggleActive,
}) => {
  if (!todo.duration) {
    if (activeTodo !== todo.id && status !== "Completed") {
      return (
        <Button onClick={start} disabled={activeTodo && activeTodo !== todo.id}>
          Start
        </Button>
      );
    } else if (!todo.duration && activeTodo === todo.id) {
      return (
        <Button
          onClick={finishTodo}
          disabled={activeTodo && activeTodo !== todo.id}
        >
          Complete
        </Button>
      );
    } else if (
      !todo.duration &&
      activeTodo !== todo.id &&
      status === STATUSES.COMPLETED
    )
      return null;
  } else {
    if (status === STATUSES.NOT_STARTED) {
      return (
        <Button onClick={start} disabled={activeTodo && activeTodo !== todo.id}>
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
      activeTodo !== null &&
      activeTodo === todo.id &&
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
    } else if (activeTodo === null && status === STATUSES.IN_PROGRESS) {
      return (
        <Box display="flex" alignItems="center">
          <Text>{timeConvert(timeLeft)}</Text>
          <Button
            onClick={toggleActive}
            size="sm"
            m="0 4px"
            disabled={activeTodo && activeTodo !== todo.id}
          >
            <BsPlayFill />
          </Button>
        </Box>
      );
    }
  }
};

export default DisplayInfo;
