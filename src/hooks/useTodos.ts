import { useCallback, useReducer } from "react";
import { DropResult } from "react-beautiful-dnd";

export type Todo = {
  id: number;
  todo: string;
  isCompleted: boolean;
};

export enum TodoActionType {
  ADD_TODO = "ADD_TODO",
  TOGGLE_STATUS = "TOGGLE_STATUS",
  REMOVE_COMPLETE_TODOS = "REMOVE_COMPLETE_TODOS",
  REMOVE_TODO = "REMOVE_TODO",
  REORDER_TODO = "REORDER_TODO",
}

export type TodoAction =
  | {
      type: TodoActionType.ADD_TODO;
      payload: string;
    }
  | {
      type: TodoActionType.TOGGLE_STATUS;
      payload: number;
    }
  | {
      type: TodoActionType.REMOVE_COMPLETE_TODOS;
    }
  | {
      type: TodoActionType.REMOVE_TODO;
      payload: number;
    }
  | {
      type: TodoActionType.REORDER_TODO;
      payload: {
        source: number;
        destination?: number;
      };
    };

function todoReducer(state: Todo[], action: TodoAction) {
  switch (action.type) {
    case TodoActionType.ADD_TODO: {
      return [
        { todo: action.payload, id: state.length + 1, isCompleted: false },
        ...state,
      ];
    }
    case TodoActionType.TOGGLE_STATUS: {
      return state.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, isCompleted: !todo.isCompleted };
        } else {
          return todo;
        }
      });
    }
    case TodoActionType.REMOVE_COMPLETE_TODOS: {
      return state.filter((todo) => !todo.isCompleted);
    }
    case TodoActionType.REMOVE_TODO: {
      return state.filter((todo) => todo.id !== action.payload);
    }
    case TodoActionType.REORDER_TODO: {
      const { source, destination } = action.payload;
      if (!destination) return state;

      const result = [...state];
      const [removed] = result.splice(source, 1);
      result.splice(destination, 0, removed);

      return result;
    }
    default:
      return state;
  }
}

const useTodos = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);

  const addNewTodo = (todo: string) => {
    if (!todo) return;

    dispatch({
      type: TodoActionType.ADD_TODO,
      payload: todo,
    });
  };

  const handelTodoClick = useCallback((id: number) => {
    dispatch({
      type: TodoActionType.TOGGLE_STATUS,
      payload: id,
    });
  }, []);

  const handelTodoRemove = useCallback((todoId: number) => {
    dispatch({
      type: TodoActionType.REMOVE_TODO,
      payload: todoId,
    });
  }, []);

  const clearCompletedTodos = () => {
    dispatch({
      type: TodoActionType.REMOVE_COMPLETE_TODOS,
    });
  };

  const onDragEnd = useCallback((result: DropResult) => {
    dispatch({
      type: TodoActionType.REORDER_TODO,
      payload: {
        source: result.source.index,
        destination: result.destination?.index,
      },
    });
  }, []);

  return {
    addNewTodo,
    handelTodoClick,
    handelTodoRemove,
    clearCompletedTodos,
    onDragEnd,
    todos,
  };
};

export default useTodos;
