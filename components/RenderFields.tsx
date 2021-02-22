import React from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  InputGroup,
  FormErrorMessage,
} from "@chakra-ui/react";
import { RenderFieldsProps } from "../typescript/interfaces";
import { required, requiredPrimary } from "../generals/functions";
import { Field, Form } from "react-final-form";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";

const RenderFields: React.FC<RenderFieldsProps> = ({
  idx,
  todoCount,
  inputLength,
  setTodoCount,
  setInputLength,
}) => {
  const [desc, setDesc] = React.useState(`description${idx}`);

  const removeInput = () => {
    const newInputs = inputLength
      .slice(0, idx)
      .concat(inputLength.slice(idx + 1));
    setInputLength(newInputs);
  };

  return (
    <Box display="flex" w="100%" m="2%">
      <Field
        name={desc}
        validate={idx === 0 ? requiredPrimary : required}
        render={({ input, meta }) => (
          <FormControl isInvalid={meta.touched && meta.error} w="78.4%">
            <InputGroup>
              <Input
                id={desc}
                h="2.68rem"
                placeholder={
                  idx === 0 ? "Add a Todo and group duration" : "Add a Todo"
                }
                {...input}
              />
            </InputGroup>
            {meta.touched && meta.error && (
              <FormErrorMessage>{meta.error}</FormErrorMessage>
            )}
          </FormControl>
        )}
      />
      <Box d="flex" pl="3%" justifyContent="space-between" w="15%" mr="7%">
        <Button h="2.68rem" onClick={() => setTodoCount(todoCount + 1)}>
          <AddIcon />
        </Button>
        {idx > 0 ? (
          <Button h="2.68rem" ml="4%" onClick={() => removeInput()}>
            <CloseIcon />
          </Button>
        ) : null}
      </Box>
    </Box>
  );
};

export default RenderFields;
