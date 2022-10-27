import classNames from "classnames";

import checkSvg from "src/assets/icon-check.svg";

type TodoStatusProps = {
  isCompleted?: boolean;
};

const TodoStatus = ({ isCompleted = false }: TodoStatusProps) => {
  const circleClass = classNames("todo-circle", {
    "todo-circle--completed": isCompleted,
  });

  return (
    <div className={circleClass}>
      {isCompleted && <img src={checkSvg} alt="completed" />}
    </div>
  );
};

export default TodoStatus;
