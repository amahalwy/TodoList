import React from "react";
import { Box, Button, Tr, Td } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

const __TODO_VALUES = ["description", "duration", "status"];

const TodoItem = ({ todo }) => {
  return (
    <Tr>
      {__TODO_VALUES.map((value, i) => {
        return <Td key={i}>{todo[value]}</Td>;
      })}

      <Td>
        <Button
          onClick={() => console.log(`counting down for ${todo.description}`)}
        >
          Start?
        </Button>
      </Td>
    </Tr>
  );
};

export default TodoItem;
