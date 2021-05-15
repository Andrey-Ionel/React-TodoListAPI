import React, { useState, useEffect } from "react";
import "./toggleTodos.css";

export function ToggleTodos({ toggleCompletedTodos, isCompletedAll, sendPatchTodosToggleRequest, id }) {
  const [checked, setChecked] = useState(isCompletedAll);
  const onChangeCheckBoxAllVal = (event) => {
    setChecked(event.target.checked);
    toggleCompletedTodos(event.target.checked);
  };

  useEffect(() => {
    if (checked !== checked) {
      sendPatchTodosToggleRequest(checked, id);
    }
  }, [checked]);


  return (
    <>
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        checked={isCompletedAll}
        onChange={onChangeCheckBoxAllVal}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  );
}
