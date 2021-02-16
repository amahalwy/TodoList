import React from "react";
import { Box, Heading, Button, useDisclosure } from "@chakra-ui/react";
import List from "../components/List";
// import { saveUser } from "../util/create";

const Home = () => {
  const [todos, setTodos] = React.useState([]);

  React.useEffect(() => {
    localStorage.clear();
    // if (localStorage.todos) setTodos(JSON.parse(localStorage.todos));
  }, []);

  return (
    <Box bg="#fff" h="100vh">
      <Box w="60%" p="4% 0" m="0 auto" maxH="600px">
        <Box display="flex" justifyContent="space-between">
          <Heading>To Do list - *date* </Heading>
        </Box>

        <List todos={todos} setTodos={setTodos} />
      </Box>
    </Box>
  );
};

export default Home;
