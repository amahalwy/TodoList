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

// interface TimerProps {
//   id: number;
//   todos: object[];
//   todo: any;
//   status: string;
//   setStatus: () => void;
//   isActive: undefined | number;
//   setIsActive: () => void;
// }

const Timer = ({
  id,
  todo,
  todos,
  status,
  setStatus,
  activeTodo,
  setActiveTodo,
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
    // console.log(activeTodo, todo.id, timeLeft);
    if (activeTodo === todo.id && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1000);
      }, 1000);
    } else if (activeTodo == todo.id && timeLeft <= 0) {
      setActiveTodo(null);
      getAndSetStatus();
      todo.active = false;
    }

    return () => clearInterval(interval);
  }, [activeTodo, timeLeft]);

  const toggleActive = () => {
    if (activeTodo === null) {
      setActiveTodo(todo.id);
    } else {
      setActiveTodo(null);
    }
    if (todos[todo.id].active) {
      todos[todo.id].active = false;
    } else {
      todos[todo.id].active = true;
    }
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const start = () => {
    setActiveTodo(todo.id);
    todos[todo.id].active = true;
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getAndSetStatus = () => {
    console.log(timeLeft, initialDuration);
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

  const returnStatus = () => {
    // Not active and not started => new todo

    if (
      (!activeTodo || (activeTodo && activeTodo !== todo.id)) &&
      status === "Not Started"
    ) {
      return (
        <Button onClick={start} disabled={activeTodo && activeTodo !== todo.id}>
          Start?
        </Button>
      );
    } else if (
      // Active and not started => JUST clicked start; want to show the beginning timeleft
      // Not active and completed => show time up
      (activeTodo === todo.id && status === "Not Started") ||
      (activeTodo !== todo.id && status === "Completed")
    ) {
      return <Text>{timeConvert(timeLeft)}</Text>;
    } else {
      // Active and in progess => counting down; should show a pause button
      if (activeTodo === todo.id && status === "In Progress...") {
        return (
          <Box display="flex" alignItems="center" justifyContent="space-around">
            <Text>{timeConvert(timeLeft)}</Text>
            <Button onClick={toggleActive} size="sm">
              <GiPauseButton />
            </Button>
          </Box>
        );
      } else if (activeTodo !== todo.id && status === "In Progress...") {
        // Not active but in progress => a paused todo
        return (
          <Box display="flex" alignItems="center" justifyContent="space-around">
            <Text>{timeConvert(timeLeft)}</Text>
            <Button
              onClick={toggleActive}
              size="sm"
              disabled={activeTodo && activeTodo !== todo.id}
            >
              <BsPlayFill />
            </Button>
          </Box>
        );
      }
    }
  };

  return <Td>{returnStatus()}</Td>;
};

const TodoItem = ({ todo, todos, id, setActiveTodo, activeTodo }) => {
  // const [isActive, setIsActive] = React.useState(todos[activeTodo]);
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
        status={status}
        setStatus={setStatus}
        activeTodo={activeTodo}
        setActiveTodo={setActiveTodo}
      />
    </Tr>
  );
};

export default TodoItem;
