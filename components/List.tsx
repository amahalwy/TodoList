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

  const toggleAll = () => {
    if (activeTodos.length > 0) {
      setActiveTodos([]);
    } else {
      const ids = todos.map((todo, i) => i);
      setActiveTodos(ids);
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
              <Th fontSize={16} w="15%">
                Duration (mins)
              </Th>
              <Th fontSize={16} w="15%">
                Group Id
              </Th>
              <Th fontSize={16} w="15%">
                Status
              </Th>
              <Th fontSize={16} w="15%">
                Time Left
              </Th>
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
                  activeTodos={activeTodos}
                  setTodos={setTodos}
                  setActiveTodos={setActiveTodos}
                />
              );
            })}
          </Tbody>
        </Table>
      </Box>
      {todos.length > 0 ? <TableFooter todos={todos} /> : null}
      <Box d="flex" w="96%" m="1% 0" alignItems="center">
        {todos.length > 0 ? (
          <Button ml="2%" onClick={() => toggleAll()}>
            {activeTodos.length > 0 ? "Pause all" : "Start all"}
          </Button>
        ) : null}
        <FormControl d="flex" justifyContent="flex-end">
          <FormLabel htmlFor="group" mb="0" fontSize={14}>
            Group Todos
          </FormLabel>

          <Switch
            id="group"
            onChange={() => toggleGroupTodos(groupedTodos)}
            h="10px"
          />
        </FormControl>
      </Box>

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
    </Box>
  );
};

export default List;
