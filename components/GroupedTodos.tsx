import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { Form, Field } from "react-final-form";
import { GroupedTodosProps, Todo } from "../typescript/interfaces";
import * as chrono from "chrono-node";
import { STATUSES } from "../generals/statuses";
import RenderFields from "./RenderFields";

const GroupedTodos: React.FC<GroupedTodosProps> = ({
  todos,
  setTodos,
  todoCount,
  setTodoCount,
}) => {
  const [inputLength, setInputLength] = React.useState([]);
  const [groupId, setGroupId] = React.useState(1);

  const onSubmit = (values, form) => {
    const groupDuration: any = Object.values(values)[1];
    const vals = Object.values(values).filter((value, idx) => idx > 0);

    const objects = vals.map((description: string, id) => {
      const res: any = chrono.parseDate(groupDuration);
      const newD: any = new Date();
      const duration =
        res > 0 && id === 0 ? ((res - newD) / 60000).toFixed(2) : null;

      let obj: Todo = {
        id,
        description,
        active: false,
        duration,
        status: values.status,
        groupId,
        groupMain: false,
      };

      if (id === 0) {
        obj.groupMain = true;
      }

      return obj;
    });

    const newTodos = todos.concat(objects);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setGroupId(groupId + 1);
    setTimeout(form.reset);
  };

  React.useEffect(() => {
    let newArr = new Array(todoCount);
    newArr.fill(undefined);
    setInputLength(newArr);
  }, [todoCount]);

  return (
    <Box m="2% auto">
      <Form
        onSubmit={onSubmit}
        initialValues={{ status: "Not Started" }}
        render={({ handleSubmit, pristine }) => (
          <form onSubmit={handleSubmit}>
            <Box>
              {inputLength.map((notNeeded, idx) => {
                return (
                  <Box key={idx}>
                    <RenderFields
                      idx={idx}
                      todoCount={todoCount}
                      inputLength={inputLength}
                      setTodoCount={setTodoCount}
                      setInputLength={setInputLength}
                    />
                  </Box>
                );
              })}
            </Box>
            <Box ml="2%">
              <Button type="submit" disabled={pristine}>
                Submit
              </Button>
            </Box>
          </form>
        )}
      />
    </Box>
  );
};

export default GroupedTodos;
