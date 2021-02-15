import React from "react";
import { Box, Table, Thead, Tbody, Tfoot, Tr, Th } from "@chakra-ui/react";
import TodoItem from "./TodoItem";

export default function List({ todos }) {
  const [activeTodo, setActiveTodo] = React.useState(null);

  const totalDuration = () => {
    if (todos.length === 0) return null;
    const durations = todos.map((todo) => parseFloat(todo.duration));

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return durations.reduce(reducer).toFixed(2);
  };

  return (
    <Box bg="eee" mt="2%">
      <Box
        shadow="2xl"
        maxH="800px"
        overflowY="scroll"
        border="1px solid #eaeaea"
        borderRadius="10px"
      >
        <Table m="1%" w="98%" size="md">
          <Thead>
            <Tr>
              <Th w="40%" fontSize={16}>
                Description
              </Th>
              <Th fontSize={16}>Duration (mins)</Th>
              <Th fontSize={16} w="20%">
                Status
              </Th>
              <Th fontSize={16}>Time Left</Th>
            </Tr>
          </Thead>
          <Tbody>
            {todos.map((todo, i) => {
              return (
                <TodoItem
                  activeTodo={activeTodo}
                  setActiveTodo={setActiveTodo}
                  todos={todos}
                  todo={todo}
                  key={i}
                  id={i}
                />
              );
            })}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Total Tasks: {todos.length}</Th>
              <Th>Total Duration: {totalDuration()} (mins)</Th>
            </Tr>
          </Tfoot>
        </Table>
      </Box>
    </Box>
  );
}
