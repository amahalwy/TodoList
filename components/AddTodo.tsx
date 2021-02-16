import React from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  InputGroup,
  FormErrorMessage,
} from "@chakra-ui/react";
import * as chrono from "chrono-node";
import { Form, Field } from "react-final-form";

const AddTodo = ({ todos, setTodos }) => {
  const required = (value) => (value ? undefined : "Required");
  const onSubmit = (values) => {
    values.status = "Not Started";
    values.active = false;
    const res: any = chrono.parseDate(values.description);
    const newD: any = new Date();
    values.duration = res > 0 ? ((res - newD) / 60000).toFixed(2) : null;
    const newTodos = todos.concat(values);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  return (
    <Box m="2% auto">
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <Box display="flex" ml="2%">
              <Field
                name="description"
                validate={required}
                render={({ input, meta }) => (
                  <FormControl isInvalid={meta.touched && meta.error} w="80%">
                    <InputGroup>
                      <Input
                        w="100%"
                        id="description"
                        h="2.68rem"
                        placeholder="Add a Todo with duration"
                        {...input}
                      />
                    </InputGroup>
                    {meta.touched && meta.error && (
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    )}
                  </FormControl>
                )}
              />
              <Button
                ml="4%"
                type="submit"
                onClick={() => {
                  onSubmit(values);
                  form.reset();
                }}
              >
                Create Todo
              </Button>
            </Box>
          </form>
        )}
      />
    </Box>
  );
};

export default AddTodo;