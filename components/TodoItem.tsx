import React from "react";
import { Box, Button, Tr, Td, Text } from "@chakra-ui/react";
import { GiPauseButton } from "react-icons/gi";
import { BsPlayFill } from "react-icons/bs";

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
    getAndSetStatus();
    localStorage.setItem("todos", JSON.stringify(todos));

    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1000);
      }, 1000);
    } else if (isActive && timeLeft <= 0) {
      setIsActive(false);
      getAndSetStatus();
      console.log("else");
      todo.active = false;
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleActive = () => {
    setIsActive(!isActive);
    todos[todo.id].active = true;
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const pause = () => {
    setIsActive(!isActive);
    if (todos[todo.id].active) {
      todos[todo.id].active = false;
    } else {
      todos[todo.id].active = true;
    }
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
    } else if (timeLeft === 0 && !isActive) {
      setStatus("Completed");
      todo.status = "Completed";
      return;
    }
  };

  const returnStatus = () => {
    // Not active and not started => new todo
    if (!isActive && status === "Not Started") {
      return <Button onClick={toggleActive}>Start?</Button>;
    } else if (
      // Active and not started => JUST clicked start; want to show the beginning timeleft
      // Not active and completed => show time up
      (isActive && status === "Not Started") ||
      (!isActive && status === "Completed")
    ) {
      return <Text>{timeConvert(timeLeft)}</Text>;
    } else {
      // Active and in progess => counting down; should show a pause button
      if (isActive && status === "In Progress...") {
        return (
          <Box display="flex" alignItems="center" justifyContent="space-around">
            <Text>{timeConvert(timeLeft)}</Text>
            <Button onClick={pause} size="sm">
              <GiPauseButton />
            </Button>
          </Box>
        );
      } else if (!isActive && status === "In Progress...") {
        // Not active but in progress => a paused todo
        return (
          <Box display="flex" alignItems="center" justifyContent="space-around">
            <Text>{timeConvert(timeLeft)}</Text>
            <Button onClick={pause} size="sm">
              <BsPlayFill />
            </Button>
          </Box>
        );
      }
    }
  };

  return <Td>{returnStatus()}</Td>;
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
