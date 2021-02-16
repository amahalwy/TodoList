import React from "react";
import { Box, Table, Thead, Tbody, Tfoot, Tr, Th, Td } from "@chakra-ui/react";
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";
import { ListProps } from "../typescript/interfaces";
import TableFooter from "./TableFooter";

const List: React.FC<ListProps> = ({ todos, setTodos }) => {
  const [activeTodo, setActiveTodo] = React.useState(null);

  const totalDuration = () => {
    if (todos.length === 0) return null;
    const durations = todos.map((todo) => Number(todo.duration));

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return durations.reduce(reducer).toFixed(2);
  };

  return (
    <Box
      bg="eee"
      mt="2%"
      shadow="2xl"
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
    </Box>
  );
};

export default List;
