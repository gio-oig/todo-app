import { ChangeEvent, FormEvent } from "react";
import TodoStatus from "../todoStatus/todoStatus";

type AddTodoInputProps = {
  inputValue: string;
  handelInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handelSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

const AddTodoInput = ({
  inputValue,
  handelInputChange,
  handelSubmit,
}: AddTodoInputProps) => (
  <form onSubmit={handelSubmit}>
    <div className="input-container">
      <TodoStatus />
      <input
        type="text"
        value={inputValue}
        placeholder="Create new todo..."
        onChange={handelInputChange}
      />
    </div>
  </form>
);

export default AddTodoInput;
