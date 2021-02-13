import React from "react";
import { Button, Tr, Td, Text } from "@chakra-ui/react";

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

const Timer = ({
  id,
  todo,
  todos,
  status,
  setStatus,
  isActive,
  setIsActive,
}) => {
  const [initialDuration, setInitialDuration] = React.useState<number | any>(
    todo.duration * 60000
  );

  const [timeLeft, setTimeLeft] = React.useState(
    todo.timeLeft === undefined ? todo.duration * 60000 : todo.timeLeft
  );

  React.useEffect(() => {
    todo.timeLeft = timeLeft;
    getStatus();
    localStorage.setItem("todos", JSON.stringify(todos));

    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1000);
      }, 1000);
    } else if (isActive && timeLeft <= 0) {
      setIsActive(false);
      getStatus();
      console.log("else");
      todo.active = false;
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggle = () => {
    setIsActive(!isActive);
    todos[todo.id].active = true;
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getStatus = () => {
    if (timeLeft >= initialDuration) {
      setStatus("Not Started");
      todo.status = "Not Started";
      return;
    } else if (timeLeft > 0 && timeLeft < initialDuration) {
      setStatus("In Progress...");
      todo.status = "In Progress...";
      return;
    } else if (timeLeft === 0 && !isActive) {
      setStatus("Completed");
      todo.status = "Completed";
      return;
    }
  };

  return (
    <Td>
      {!isActive && status === "Not Started" ? (
        <Button onClick={toggle}>Start?</Button>
      ) : (
        <Text>{timeConvert(timeLeft)}</Text>
      )}
    </Td>
  );
};

const TodoItem = ({ todo, todos, id }) => {
  const [isActive, setIsActive] = React.useState(todo.active);
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

  return (
    <Tr>
      <Td>{todo.description}</Td>
      <Td>{todo.duration}</Td>
      <Td color={statusColor()}>{status}</Td>
      <Timer
        id={id}
        todo={todo}
        todos={todos}
        isActive={isActive}
        status={status}
        setStatus={setStatus}
        setIsActive={setIsActive}
      />
    </Tr>
  );
};

export default TodoItem;
