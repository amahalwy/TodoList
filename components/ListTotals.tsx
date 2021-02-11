import React from "react";
import { Box } from "@chakra-ui/react";

export default function ListTotals({ todos }) {
  return (
    <Box>
      <p>{todos.length}</p>
    </Box>
  );
}
