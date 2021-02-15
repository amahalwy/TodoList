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

export default function AddTodo() {
  const required = (value) => (value ? undefined : "Required");
  const onSubmit = (values) => {
    console.log(values);
    const res = chrono.parseDate(values.description);
    console.log(res);
  };
  return (
    <Box>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <Box display="flex" justifyContent="space-between">
              <Field
                name="description"
                validate={required}
                render={({ input, meta }) => (
                  <FormControl
                    isInvalid={meta.touched && meta.error}
                    m="0 auto"
                  >
                    <InputGroup>
                      <Input
                        w="90%"
                        id="description"
                        h="2.68rem"
                        placeholder="Add a Todo"
                        {...input}
                      />
                    </InputGroup>
                    {meta.touched && meta.error && (
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    )}
                  </FormControl>
                )}
              />
              <Button type="submit">Create Todo</Button>
            </Box>
          </form>
        )}
      />
    </Box>
  );
}
