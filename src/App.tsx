import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import Layaut from "src/components/layaut/layaut";

import TodoList from "src/components/todo/todoList/todoList";
import TodoFilters from "src/components/todo/todoFilters/todoFilters";
import AddTodoInput from "src/components/todo/addTodoInput/addTodoInput";

import moonSvg from "src/assets/icon-moon.svg";
import sunSvg from "src/assets/icon-sun.svg";

import "./App.css";
import useTheme from "./hooks/useTheme";
import classNames from "classnames";
import useTodos from "./hooks/useTodos";

export type Todo = {
  id: number;
  todo: string;
  isCompleted: boolean;
};

export type Filter = "All" | "Active" | "Completed";

const filters: Filter[] = ["All", "Active", "Completed"];

function App() {
  const {
    todos,
    handelTodoClick,
    handelTodoRemove,
    onDragEnd,
    clearCompletedTodos,
    addNewTodo,
  } = useTodos();
  const [inputValue, setInputValue] = useState("");
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const { toggleTheme, isLightTheme } = useTheme();

  const filteredTodos = useMemo(() => {
    if (activeFilter === "Active") {
      return todos.filter((todo) => !todo.isCompleted);
    } else if (activeFilter === "Completed") {
      return todos.filter((todo) => todo.isCompleted);
    }

    return todos;
  }, [todos, activeFilter]);

  const handelInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handelSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addNewTodo(inputValue);
    setInputValue("");
  };

  const appClass = classNames("App", {
    "App--dark": !isLightTheme,
  });

  return (
    <div className={appClass}>
      <Layaut>
        <section className="todos-container">
          <div className="todos-container__header">
            <h1 className="todos-container__title">TODO</h1>
            <img
              className="todos-container__theme-toggler"
              src={isLightTheme ? moonSvg : sunSvg}
              alt=""
              onClick={toggleTheme}
            />
          </div>
          <AddTodoInput
            inputValue={inputValue}
            handelInputChange={handelInputChange}
            handelSubmit={handelSubmit}
          />
          <div className="todos-list-container">
            <TodoList
              todos={filteredTodos}
              onDragEnd={onDragEnd}
              onTodoClick={handelTodoClick}
              onTodoRemove={handelTodoRemove}
            />
            <div className="todos-list-container__footer">
              <span> {todos.length} items left:</span>
              <TodoFilters
                activeFilter={activeFilter}
                filters={filters}
                onSelect={setActiveFilter}
              />
              <span onClick={clearCompletedTodos}>Clear Completed</span>
            </div>
          </div>

          <TodoFilters
            className="todo-filters--mobile"
            activeFilter={activeFilter}
            filters={filters}
            onSelect={setActiveFilter}
          />

          <p className="footer-text">Drag and drop to reorder list</p>
        </section>
      </Layaut>
    </div>
  );
}

export default App;
