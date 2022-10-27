import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

import { memo } from "react";
import { Todo } from "src/App";
import TodoItem from "../todo/todo";

type TodoListProps = {
  todos: Todo[];
  onDragEnd: (result: DropResult) => void;
  onTodoClick: (todoId: number) => void;
  onTodoRemove: (todoId: number) => void;
};

const TodoList = memo(
  ({ todos, onTodoClick, onTodoRemove, onDragEnd }: TodoListProps) => {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <ul
              className="todos-list"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {todos.map((todo, i) => (
                <TodoItem
                  key={i}
                  index={i}
                  todo={todo}
                  onClick={() => onTodoClick(todo.id)}
                  onRemove={() => onTodoRemove(todo.id)}
                />
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
);

export default TodoList;
