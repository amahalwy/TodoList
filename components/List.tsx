import React from "react";
import {
  Box,
  ListIcon,
  OrderedList,
  UnorderedList,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import ListTotals from "./ListTotals";
import TodoItem from "./TodoItem";

export default function List({ todos }) {
  const totalDuration = () => {
    const durations = todos.map((todo) => Number(todo.duration));
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return durations.reduce(reducer);
  };

  return (
    <Box>
      <Box bg="#ccc" border="1px solid black" h="500px">
        <Table>
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th w="40%">Description</Th>
              <Th>Duration (mins)</Th>
              <Th>Status</Th>
              <Th>Time Left</Th>
            </Tr>
          </Thead>
          <Tbody>
            {todos.map((todo, i) => {
              return <TodoItem todo={todo} key={i} />;
            })}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Total Tasks: {todos.length}</Th>
              <Th>Total Duration: {totalDuration()}</Th>
            </Tr>
          </Tfoot>
        </Table>
        {/* <UnorderedList listStyleType="none">
          <Box display="flex">
            <Box>Description</Box>
            <Box>Duration</Box>
            <Box></Box>
            <Box></Box>
          </Box>
          
        </UnorderedList> */}
        <ListTotals todos={todos} />
      </Box>
    </Box>
  );
}
