import React from "react";
import { Box, Heading, Button, useDisclosure } from "@chakra-ui/react";
import AddItem from "../components/AddItem";
import List from "../components/List";

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [todos, setTodos] = React.useState([]);

  React.useEffect(() => {
    if (localStorage.todos) setTodos(JSON.parse(localStorage.todos));
  }, []);

  return (
    <Box w="70%" m="6% auto">
      <Box display="flex" justifyContent="space-between" m="1% 0">
        <Heading>To Do list - *date* </Heading>
        <Button onClick={onOpen}>Create a task</Button>
        <AddItem
          todos={todos}
          setTodos={setTodos}
          isOpen={isOpen}
          onClose={onClose}
        />
      </Box>

      <List todos={todos} />
    </Box>
  );
};

export default Home;
