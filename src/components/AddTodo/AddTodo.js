import React, { useState, useEffect, useRef } from "react";
import "./addTodo.css";

export function AddTodo(props, { sendPostTodoAddRequest }) {
  const [todoName, setTodo] = useState("");
  const onChangeInputVal = (event) => {
    setTodo(event.target.value);
  };
  const onEnterPress = (event) => {
    if (event.charCode === 13 && todoName.trim()) {
      props.onKeyPress({
        id: Date.now(),
        title: todoName,
        completed: false
      });
      setTodo("");
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (todoName.trim()) {
      sendPostTodoAddRequest(props)
    }
  }, []);

  const inputRef = useRef(null);

  return (
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      onChange={onChangeInputVal}
      onKeyPress={onEnterPress}
      name="text"
      value={todoName}
      ref={inputRef}
    />
  );
}
