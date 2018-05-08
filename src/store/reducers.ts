import * as fromActions from "./actions";

export const initialState = {
  loaded: false,
  loading: false,
  data: [{ label: "Eat pizza", complete: false }]
};

export function reducer(
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case fromActions.ADD_TODO:
      return addTodo(state, action.payload);
    case fromActions.REMOVE_TODO:
      return removeTodo(state, action.payload);
  }
  return state;
}

function addTodo(state, todo) {
  return {
    ...state,
    data: [...state.data, todo]
  };
}

function removeTodo(state, todoToRemove) {
  const data = state.data.filter(todo => todo.label !== todoToRemove.label);
  return {
    ...state,
    data
  };
}
