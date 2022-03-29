import React from "react";
import { connect } from "react-redux";
import NewTodoForm from "./NewTodoForm";
import styled from "styled-components";
import "./TodoList.css";
import TodoListItem from "./TodoListItem";
import {
  getTodosLoading,
  getIncompleteTodos,
  getCompletedTodos,
} from "../selectors";
import {
  loadTodos,
  removeTodoRequest,
  markTodoCompletedRequest,
} from "../thunks";
//import { markTodoAsCompleted } from "./actions";
//import { displayAlert } from "./thunks";

const ListWrapper = styled.div`
  max-width: 700px;
  margin: auto;ss
  padding-top: 50px;
  
`;

function TodoList({
  isLoading,
  completedTodos,
  incompleteTodos,
  onRemovePressed,
  onCompletedPressed,
  startLoadingTodos,
}) {
  React.useEffect(() => {
    startLoadingTodos();
  }, []);
  const loadingMessage = <div>Loading todos...</div>;
  const content = (
    <ListWrapper>
      <NewTodoForm />
      <h3>Incomplete:</h3>
      {incompleteTodos.map((todo, key) => (
        <TodoListItem todo={todo} key={key} />
      ))}
      <h3>Completed:</h3>
      {completedTodos.map((todo, key) => (
        <TodoListItem todo={todo} key={key}/>
      ))}
    </ListWrapper>
  );
  return isLoading ? loadingMessage : content;
}

const mapStateToProps = (state) => ({
  isLoading: getTodosLoading(state),
  completedTodos: getCompletedTodos(state),
  incompleteTodos: getIncompleteTodos(state),
});
// todos: getTodos(state),

const mapDispatchToProps = (dispatch) => ({
  startLoadingTodos: () => dispatch(loadTodos()),
  onRemovePressed: (id) => dispatch(removeTodoRequest(id)),
  onCompletedPressed: (id) => dispatch(markTodoCompletedRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
