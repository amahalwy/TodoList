import React from "react";
import { Box, Button, Table, Thead, Tbody, Tr, Th } from "@chakra-ui/react";
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";
import { ListProps } from "../typescript/interfaces";
import TableFooter from "./TableFooter";

const List: React.FC<ListProps> = ({ todos, setTodos }) => {
  const [activeTodo, setActiveTodo] = React.useState(null);

  return (
    <Box
      bg="eee"
      mt="2%"
      shadow="base"
      border="1px solid #eaeaea"
      borderRadius="10px"
    >
      <Box maxH="800px" overflowY="scroll">
        <Table m="1%" w="98%" size="md" variant="unstyled">
          <Thead borderBottom="1px solid rgb(219, 226, 236)">
            <Tr>
              <Th w="40%" fontSize={16}>
                Description
              </Th>
              <Th fontSize={16}>Duration (mins)</Th>
              <Th fontSize={16} w="17%">
                Status
              </Th>
              <Th fontSize={16}>Time Left</Th>
            </Tr>
          </Thead>
          <Tbody>
            {todos.map((todo, i) => {
              return (
                <TodoItem
                  id={i}
                  key={i}
                  todo={todo}
                  todos={todos}
                  activeTodo={activeTodo}
                  setTodos={setTodos}
                  setActiveTodo={setActiveTodo}
                />
              );
            })}
          </Tbody>
        </Table>
      </Box>
      {todos.length > 0 ? <TableFooter todos={todos} /> : null}

      <AddTodo todos={todos} setTodos={setTodos} />
      {/* <Button>Start All</Button> */}
    </Box>
  );
};

export default List;
