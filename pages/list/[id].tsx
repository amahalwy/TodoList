import React from "react";
import { Box, Heading, Button, useDisclosure } from "@chakra-ui/react";
import AddItem from "../../components/AddItem";
import List from "../../components/List";
import { PrismaClient } from "@prisma/client";

export const getServerSideProps = async ({ params }) => {
  const prisma = new PrismaClient();
  console.log(params);
  // const list = await prisma.list.findUnique({
  //   where: {
  //     id: params.id,
  //   },
  // });

  return {
    props: {
      // list,
    },
  };
};

const TodoList = (props) => {
  // console.log(props);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [todos, setTodos] = React.useState([]);

  React.useEffect(() => {
    if (localStorage.todos) setTodos(JSON.parse(localStorage.todos));
  }, []);

  return (
    <Box bg="#fff" h="100vh">
      <Box w="60%" p="4% 0" m="0 auto">
        <Box display="flex" justifyContent="space-between">
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
    </Box>
  );
};

export default TodoList;
