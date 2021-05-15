import "./styles.css";
import React, { useEffect, useState } from "react";
import { AddTodo } from "./components/AddTodo/AddTodo";
import { ListTodos } from "./components/ListTodos/ListTodos";
import { Footer } from "./components/Footer/Footer";
import { ToggleTodos } from "./components/ToggleTodos/ToggleTodos";
import { Alert } from 'antd';

export default function App() {
  const [filter, setFilter] = useState("all");
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") {
      return !todo.completed;
    }
    if (filter === "completed") {
      return todo.completed;
    }
    return true;
  });

  const sendGetTodosRequest = () => {
    return fetch('http://localhost:3000/todos?_sort=id&_order=DESC')
      .then(response => response.json())
      .then(newTodos => setTodos(newTodos),
        (error) => setError(error));
  }

  useEffect(() => {
    sendGetTodosRequest();
  }, []);

  const sendPostTodoAddRequest = (todo) => {
    return fetch('http://localhost:3000/todos', {
      method: 'POST',
      body: JSON.stringify({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json());
  }

  const addNewTodo = (todo) => {
    const promisePostAddTodo = sendPostTodoAddRequest(todo);
    promisePostAddTodo.then(() => {
      if (todo.title.trim()) {
        sendGetTodosRequest()
      }
    })
  };

  const sendPatchTodosToggleRequest = (completed, id) => {
    return fetch(`http://localhost:3000/todos/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        completed,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json());
  }

  const toggleCompletedTodos = (completed) => {
    todos.map((todo) => sendPatchTodosToggleRequest(completed, todo.id))
    setTimeout(sendGetTodosRequest, 500)
  };

  const sendPutTodoToggleRequest = (id, title, completed) => {
    return fetch(`http://localhost:3000/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        id,
        title,
        completed,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json());
  }

  const toggleTodo = (id, title, completed) => {
    const promisePutToggleTodo = sendPutTodoToggleRequest(id, title, completed);
    promisePutToggleTodo.then(() => sendGetTodosRequest());
  };

  const sendDeleteTodoRequest = (id) => {
    return fetch(`http://localhost:3000/todos/${id}`, {
      method: 'DELETE',
    })
  }

  const removeTodo = (id) => {
    const promiseDeleteTodoList = sendDeleteTodoRequest(id);
    promiseDeleteTodoList.then(() => sendGetTodosRequest());
  }

  const sendPutTodoEditingRequest = (id, title, completed) => {
    return fetch(`http://localhost:3000/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        id,
        title,
        completed,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json());
  }

  const updateTodo = (id, title, completed) => {
    const promisePutEditingTodo = sendPutTodoEditingRequest(id, title, completed);
    if (title.trim()) {
      promisePutEditingTodo.then(() => sendGetTodosRequest());
    }
  };

  const uncompletedTodosCount = todos.reduce((count, todo) => {
    if (!todo.completed) {
      count++;
    }
    return count++;
  }, 0);

  const completedTodosCount = todos.reduce((count, todo) => {
    if (todo.completed) count++;
    return count;
  }, 0);

  const isCompletedAll = todos.length === completedTodosCount;

  const hasCompleted = completedTodosCount > 0;

  const sendDeleteCompletedTodosRequest = (id) => {
    return fetch(`http://localhost:3000/todos/${id}`, {
      method: 'DELETE',
    })
  }

  const clearCompletedTodos = () => {
    todos.filter((todo) => {
      if (todo.completed) {
        sendDeleteCompletedTodosRequest(todo.id);
      }
    })
    setTimeout(sendGetTodosRequest, 500);
  };
  if (error) {
    return <Alert
      message="Error"
      description="Server crashed or internet connection is lost."
      type="error"
      showIcon
    />
  } else {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <AddTodo onKeyPress={addNewTodo} sendPostTodoAddRequest={sendPostTodoAddRequest} />
        </header>
        <section className="main">
          {todos.length > 0 && (
            <ToggleTodos
              toggleCompletedTodos={toggleCompletedTodos}
              isCompletedAll={isCompletedAll}
              sendPatchTodosToggleRequest={sendPatchTodosToggleRequest}
            />
          )}
          <ListTodos
            todos={filteredTodos}
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
            sendPutTodoToggleRequest={sendPutTodoToggleRequest}
            sendPutTodoEditingRequest={sendPutTodoEditingRequest}
            sendDeleteTodoRequest={sendDeleteTodoRequest}
            toggleCompletedTodos={toggleCompletedTodos}

          />
        </section>
        {todos.length > 0 && (
          <Footer
            filter={filter}
            setFilter={setFilter}
            clearCompletedTodos={clearCompletedTodos}
            uncompletedTodosCount={uncompletedTodosCount}
            hasCompleted={hasCompleted}
            sendDeleteCompletedTodosRequest={sendDeleteCompletedTodosRequest}
          />
        )}
      </section>
    );
  }
}
