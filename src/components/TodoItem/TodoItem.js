import React, { useState, useEffect, useRef } from "react";

export function TodoItem({
  completed,
  title,
  id,
  toggleTodo,
  removeTodo,
  updateTodo,
  sendPutTodoToggleRequest,
  sendPutTodoEditingRequest,
  sendDeleteTodoRequest,
  toggleCompletedTodos
}) {
  const editRef = useRef();
  const [value, setValue] = useState(title);
  const [editing, setEditing] = useState(false);

  const onChangeCheckBoxVal = (event) => {
    if (toggleCompletedTodos) {
      event.preventDefault()
    }
    toggleTodo(id, title, event.target.checked);
  };

  const onChangeEditingValue = (event) => { setValue(event.target.value) }

  const onClickDeleteTodo = (event) => {
    if (event.target.classList.contains("destroy")) {
      removeTodo(id)
    }
  }

  const todoClassCompleted = completed ? "completed" : "";
  const todoClassEditing = editing ? "editing" : "";
  useEffect(() => {
    if (editing) {
      editRef.current.focus();
    }
  }, [editing]);

  useEffect(() => {
    if (completed !== completed) {
      sendPutTodoToggleRequest(id, title, completed)
    }
  }, [completed]);

  useEffect(() => {
    if (value !== value) {
      sendPutTodoEditingRequest(id, title, completed)
    }
  }, [value]);

  useEffect(() => {
    if (id !== id) {
      sendDeleteTodoRequest(id)
    }
  }, [id]);

  return (
    <li className={`${todoClassCompleted} ${todoClassEditing}`}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={onChangeCheckBoxVal}
        />
        <label onDoubleClick={() => setEditing(true)}>{title}</label>
        <button
          type="button"
          className="destroy"
          onClick={onClickDeleteTodo}
        ></button>
      </div>
      <input
        ref={editRef}
        type="text"
        className="edit"
        onBlur={() => {
          setEditing(false);
          updateTodo(id, value, completed);
        }}
        value={value}
        onChange={onChangeEditingValue}
      />
    </li>
  );
}
