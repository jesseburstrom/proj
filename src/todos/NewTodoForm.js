import React from "react";
import { connect } from "react-redux";
//import { createTodo } from "./actions";
import { getTodos } from "../selectors";
import { addTodoRequest } from "../thunks";
import "./NewTodoForm.css";

// connect()() higher order function

function NewTodoForm({ todos, onCreatePressed }) {
  const [inputValue, setInputValue] = React.useState("");
  return (
    <div className="new-todo-form">
      <input
        className="new-todo-input"
        type="text"
        placeholder="Type your new todo here"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        onClick={() => {
          const isDuplicateText = todos.some(
            (todo) => todo.text === inputValue
          );
          if (!isDuplicateText && inputValue.length > 0) {
            onCreatePressed(inputValue);
            setInputValue("");
          }
        }}
        className="new-todo-button"
      >
        Create Todo
      </button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  todos: getTodos(state),
});

const mapDispatchToProps = (dispatch) => ({
  //onCreatePressed: (text) => dispatch(createTodo(text)),
  onCreatePressed: (text) => dispatch(addTodoRequest(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);
