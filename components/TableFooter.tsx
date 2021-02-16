import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { TableFooterProps } from "../typescript/interfaces";

const TableFooter: React.FC<TableFooterProps> = ({ todos }) => {
  const totalDuration = () => {
    if (todos.length === 0) return null;
    const durations = todos.map((todo) => Number(todo.duration));

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return durations.reduce(reducer).toFixed(2);
  };
  return (
    <Box d="flex" justifyContent="space-between" w="95%" m="0 auto">
      <Box d="flex" w="25%">
        <Text d="inline" fontWeight="bold">
          Total Todos:
        </Text>
        <Text d="inline" ml="4px">
          {" "}
          {todos.length}
        </Text>
      </Box>
      <Box d="flex">
        <Text d="inline" fontWeight="bold">
          Total duration:
        </Text>
        <Text d="inline" ml="4px">
          {" "}
          {totalDuration()}
        </Text>
      </Box>
      <Box d="flex">
        <Text d="inline" fontWeight="bold">
          Completed Todos:
        </Text>
        <Text d="inline" ml="4px">
          {" "}
          {totalDuration()}
        </Text>
      </Box>
    </Box>
  );
};

export default TableFooter;
