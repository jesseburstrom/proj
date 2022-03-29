import React from "react";
import { connect } from "react-redux";
import "./TodoListItem.css";
import { removeTodoRequest, markTodoCompletedRequest } from "../thunks";

function TodoListItem({ todo, onRemovePressed, onCompletedPressed }) {
  return (
    <div className="todo-item-container">
      <h3>{todo.text}</h3>
      <div className="buttons-container">
        {todo.isCompleted ? null : (
          <button
            onClick={() => onCompletedPressed(todo.id)}
            className="completed-button"
          >
            Mark As Completed
          </button>
        )}
        <button
          onClick={() => onRemovePressed(todo.id)}
          className="remove-button"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  onRemovePressed: (id) => dispatch(removeTodoRequest(id)),
  onCompletedPressed: (id) => dispatch(markTodoCompletedRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoListItem);
