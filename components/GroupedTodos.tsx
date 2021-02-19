import React from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  InputGroup,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Form, Field } from "react-final-form";
import { AddIcon } from "@chakra-ui/icons";
import { GroupedTodosProps, Todo } from "../typescript/interfaces";
import * as chrono from "chrono-node";
import { STATUSES } from "../generals/statuses";

const RenderForms = ({ idx }) => {
  const required = (value) => (value ? undefined : "Required");
  const [desc, setDesc] = React.useState(`description${idx}`);

  return (
    <Box display="flex" ml="2%" w="96%" mb="2%">
      <Field
        name={desc}
        validate={required}
        render={({ input, meta }) => (
          <FormControl isInvalid={meta.touched && meta.error}>
            <InputGroup>
              <Input
                w="100%"
                id={desc}
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
    </Box>
  );
};

const GroupedTodos: React.FC<GroupedTodosProps> = ({
  todos,
  setTodos,
  todoCount,
  setTodoCount,
}) => {
  const [inputLength, setInputLength] = React.useState([]);

  const onSubmit = (values, form) => {
    const vals = Object.values(values);
    const objects = vals.map((description: string) => {
      const res: any = chrono.parseDate(description);
      const newD: any = new Date();
      const duration = res > 0 ? ((res - newD) / 60000).toFixed(2) : null;

      let obj: Todo = {
        description,
        active: false,
        duration,
        status: STATUSES.NOT_STARTED,
      };

      return obj;
    });

    const newTodos = todos.concat(objects);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setTimeout(form.reset);
  };

  React.useEffect(() => {
    // if (inputLength.length > 1) {
    setInputLength([...inputLength, undefined]);
    // } else {
    //   setInputLength([...inputLength]);
    // }
  }, [todoCount]);

  return (
    <Box m="2% auto">
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            {/* <Box>
              <p></p>
              
            </Box> */}
            {inputLength.map((notNeeded, idx) => {
              return (
                <Box key={idx}>
                  <RenderForms idx={idx} />
                </Box>
              );
            })}
            <Box>
              <Button ml="2%" onClick={() => setTodoCount(todoCount + 1)}>
                <AddIcon />
              </Button>
              <Button type="submit">Submit</Button>
            </Box>
          </form>
        )}
      />
    </Box>
  );
};

export default GroupedTodos;
