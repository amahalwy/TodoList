import React from "react";
import { Box, Button, Tr, Td, Text } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";

const Timer = ({ todo, setStatus, isActive, setIsActive }) => {
  const [seconds, setSeconds] = useState<number | any>(
    todo.duration * 60000 - 1000
  );

  const getStatus = () => {
    switch (seconds) {
      case seconds === todo.duration * 60000 - 1000:
        return "Not Started";
      case seconds < todo.duration * 60000 - 1000 && seconds > 0:
        return "In Progress";
      case seconds <= 0:
        return "Completed";
    }
  };
  const toggle = () => {
    setIsActive(!isActive);
    setStatus(getStatus());
  };

  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1000);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const timeConvert = (num) => {
    if (num <= 0) return "Time Up!";
    let hours = Math.floor(num / 60000);
    let minutes = (num % 60000) / 1000;
    let newMinutes: string | number = minutes;
    if (minutes < 10) {
      newMinutes = `0${minutes.toString()}`;
    }
    return hours + ":" + newMinutes;
  };

  return (
    <Td>
      {!isActive ? (
        <Button onClick={toggle}>Start?</Button>
      ) : (
        <Text>{timeConvert(seconds)}</Text>
      )}
    </Td>
  );
};

const __TODO_VALUES = ["description", "duration", "status"];

const TodoItem = ({ todo }) => {
  const [isActive, setIsActive] = React.useState(todo.active);
  const [status, setStatus] = React.useState(todo.status);

  return (
    <Tr>
      {/* {__TODO_VALUES.map((value, i) => { */}
      {/* })} */}
      <Td>{todo.description}</Td>
      <Td>{todo.duration}</Td>
      <Td>{todo.status}</Td>
      <Timer
        todo={todo}
        isActive={isActive}
        setStatus={setStatus}
        setIsActive={setIsActive}
      />
    </Tr>
  );
};

export default TodoItem;
