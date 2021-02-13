import React from "react";
import { Button, Tr, Td, Text } from "@chakra-ui/react";

const Timer = ({ todo, setStatus, isActive, setIsActive }) => {
  const [seconds, setSeconds] = React.useState<number | any>(
    todo.duration * 60000 - 1000
  );

  const toggle = () => {
    setIsActive(!isActive);
  };

  React.useEffect(() => {
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

  React.useEffect(() => {
    if (seconds >= todo.duration * 60000 - 1000) {
      setStatus("Not Started");
      return;
    } else if (seconds < todo.duration * 60000 - 1000 && seconds > 0) {
      setStatus("In Progress");
      return;
    } else if (seconds <= 0) {
      setStatus("Completed");
      return;
    }
  }, [seconds]);

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

// Maybe iterate and create <Td>s like this instead for 69-71
const __TODO_VALUES = ["description", "duration", "status"];

const TodoItem = ({ todo }) => {
  const [isActive, setIsActive] = React.useState(todo.active);
  const [status, setStatus] = React.useState(todo.status);

  return (
    <Tr>
      <Td>{todo.description}</Td>
      <Td>{todo.duration}</Td>
      <Td>{status}</Td>
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
