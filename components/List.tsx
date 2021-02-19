import React from "react";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  FormControl,
  FormLabel,
  Switch,
} from "@chakra-ui/react";
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";
import { ListProps } from "../typescript/interfaces";
import TableFooter from "./TableFooter";
import GroupedTodos from "./GroupedTodos";

const List: React.FC<ListProps> = ({ todos, setTodos }) => {
  const [activeTodo, setActiveTodo] = React.useState<number | null>(null);
  // Use this for grouped tasks instead
  // If groupedTodos === true, allow activeTodos instead
  const [groupedTodos, setGroupedTodos] = React.useState<boolean>(false);
  const [activeTodos, setActiveTodos] = React.useState<number[]>([]);
  const [todoCount, setTodoCount] = React.useState<number>(1);

  const toggleGroupTodos = (value) => {
    if (value) {
      setGroupedTodos(false);
    } else {
      setGroupedTodos(true);
    }
  };

  return (
    <Box
      bg="eee"
      mt="2%"
      shadow="base"
      border="1px solid #eaeaea"
      borderRadius="10px"
    >
      <Box maxH="800px" overflowY="scroll">
        <Table m="1%" w="98%" size="md" variant="unstyled">
          <Thead borderBottom="1px solid rgb(219, 226, 236)">
            <Tr>
              <Th w="40%" fontSize={16}>
                Description
              </Th>
              <Th fontSize={16}>Duration (mins)</Th>
              <Th fontSize={16} w="17%">
                Status
              </Th>
              <Th fontSize={16}>Time Left</Th>
            </Tr>
          </Thead>
          <Tbody>
            {todos.map((todo, i) => {
              return (
                <TodoItem
                  id={i}
                  key={i}
                  todo={todo}
                  todos={todos}
                  activeTodo={activeTodo}
                  setTodos={setTodos}
                  setActiveTodo={setActiveTodo}
                />
              );
            })}
          </Tbody>
        </Table>
      </Box>
      {todos.length > 0 ? <TableFooter todos={todos} /> : null}

      <FormControl display="flex" w="95%" justifyContent="flex-end">
        <FormLabel htmlFor="group" mb="0" fontSize={14}>
          Group Todos
        </FormLabel>

        <Switch id="group" onChange={() => toggleGroupTodos(groupedTodos)} />
      </FormControl>

      {/* New component for grouped todos vs solo todos */}

      {groupedTodos ? (
        <GroupedTodos
          todoCount={todoCount}
          setTodoCount={setTodoCount}
          todos={todos}
          setTodos={setTodos}
        />
      ) : (
        <AddTodo todos={todos} setTodos={setTodos} />
      )}

      {/* <Button>Start All</Button> */}
    </Box>
  );
};

export default List;
