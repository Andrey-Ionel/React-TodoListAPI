import React from "react";
import { TodoItem } from "../TodoItem/TodoItem";
import "./listTodos.css";

export function ListTodos({ todos, toggleTodo, removeTodo, updateTodo, sendPutTodoToggleRequest, sendPutTodoEditingRequest, sendDeleteTodoRequest, toggleCompletedTodos }) {
  return (

    <ul className="todo-list">
      {todos.map((todo, id) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          completed={todo.completed}
          toggleTodo={toggleTodo}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
          sendPutTodoToggleRequest={sendPutTodoToggleRequest}
          sendPutTodoEditingRequest={sendPutTodoEditingRequest}
          sendDeleteTodoRequest={sendDeleteTodoRequest}
          toggleCompletedTodos={toggleCompletedTodos}
        />
      ))}
    </ul>
  );
}
