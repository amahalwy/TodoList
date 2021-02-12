import React from "react";
import {
  Box,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormErrorMessage,
  FormControl,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { Form, Field } from "react-final-form";

const AddItem = ({ onClose, isOpen, setTodos, todos }) => {
  const onSubmit = (values) => {
    values.status = "Not Started";
    values.active = false;
    const newTodos = todos.concat(values);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    onClose();
  };

  const required = (value) => (value ? undefined : "Required");

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, form, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>New task</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Box display="flex" justifyContent="space-between">
                    <Field
                      name="description"
                      validate={required}
                      render={({ input, meta }) => (
                        <FormControl
                          isInvalid={meta.touched && meta.error}
                          m="0 auto"
                          w="70%"
                        >
                          <InputGroup>
                            <Input
                              {...input}
                              id="description"
                              h="2.68rem"
                              placeholder="Description"
                            />
                          </InputGroup>
                          {meta.touched && meta.error && (
                            <FormErrorMessage>{meta.error}</FormErrorMessage>
                          )}
                        </FormControl>
                      )}
                    />
                    <Field
                      name="duration"
                      validate={required}
                      render={({ input, meta }) => (
                        <FormControl
                          isInvalid={meta.touched && meta.error}
                          m="0 auto"
                          w="25%"
                        >
                          <InputGroup>
                            <Input
                              {...input}
                              id="duration"
                              h="2.68rem"
                              placeholder="Duration (minutes)"
                            />
                          </InputGroup>
                          {meta.touched && meta.error && (
                            <FormErrorMessage>{meta.error}</FormErrorMessage>
                          )}
                        </FormControl>
                      )}
                    />
                  </Box>
                </ModalBody>

                <ModalFooter display="block">
                  <Flex
                    justifyContent={{
                      base: "space-between",
                      sm: "space-around",
                    }}
                  >
                    <Button type="submit">Create Task</Button>
                    <Button
                      colorScheme="red"
                      type="reset"
                      onClick={() => {
                        onClose();
                        form.reset();
                      }}
                    >
                      Cancel
                    </Button>
                  </Flex>
                </ModalFooter>
                {/* {modalSubmit && values.owner ? (
                  <ShowStatus data={modalSubmit} />
                ) : (
                  ""
                )} */}
              </ModalContent>
            </form>
          )}
        />
      </Modal>
    </>
  );
};

export default AddItem;
