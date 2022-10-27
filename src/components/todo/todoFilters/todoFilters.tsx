import classNames from "classnames";
import { Filter } from "src/App";

import "./todoFilters.css";

type TodoFiltersProps = {
  activeFilter: string;
  filters: Filter[];
  className?: string;
  onSelect: (filterType: Filter) => void;
};

const TodoFilters = ({
  onSelect,
  filters,
  activeFilter,
  className,
}: TodoFiltersProps) => (
  <ul className={`todo-filters ${className}`}>
    {filters.map((filter) => (
      <TodoFilter
        key={filter}
        text={filter}
        isActive={activeFilter === filter}
        onClick={() => onSelect(filter)}
      />
    ))}
  </ul>
);

type TodoFilterProps = {
  text: string;
  isActive: boolean;
  onClick: () => void;
};

const TodoFilter = ({ text, isActive, onClick }: TodoFilterProps) => {
  const filterClass = classNames("todo-filter", {
    "todo-filter--active": isActive,
  });

  return (
    <li className={filterClass} onClick={onClick}>
      {text}
    </li>
  );
};

export default TodoFilters;
