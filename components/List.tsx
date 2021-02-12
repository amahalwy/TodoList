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
import TodoItem from "./TodoItem";
import { parse } from "path";

export default function List({ todos }) {
  const totalDuration = () => {
    if (todos.length === 0) return null;
    const durations = todos.map((todo) => parseFloat(todo.duration));

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return durations.reduce(reducer);
  };

  return (
    <Box>
      <Box shadow="base" h="500px">
        <Table>
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
      </Box>
    </Box>
  );
}
