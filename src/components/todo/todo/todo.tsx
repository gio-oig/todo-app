import classNames from "classnames";
import { Draggable } from "react-beautiful-dnd";
import { Todo } from "src/App";

import crossSvg from "src/assets/icon-cross.svg";
import TodoStatus from "../todoStatus/todoStatus";

import "./todo.css";

type TodoProps = {
  todo: Todo;
  index: number;
  onClick: () => void;
  onRemove: () => void;
};

const TodoItem = ({ todo, index, onClick, onRemove }: TodoProps) => {
  const todoClass = classNames("todo", {
    "todo--completed": todo.isCompleted,
  });

  return (
    <Draggable
      key={todo.id.toString()}
      draggableId={todo.id.toString()}
      index={index}
    >
      {(provided) => (
        <li
          className={todoClass}
          onClick={onClick}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <TodoStatus isCompleted={todo.isCompleted} />
          {todo.todo}
          <img
            className="todo__remove"
            src={crossSvg}
            alt="cross"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          />
        </li>
      )}
    </Draggable>
  );
};

export default TodoItem;
