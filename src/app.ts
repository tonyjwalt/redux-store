import * as fromStore from "./store";

import { renderTodos } from "./utils";

const input = document.querySelector("input") as HTMLInputElement;
const button = document.querySelector("button") as HTMLButtonElement;
const destroy = document.querySelector(".unsubscribe") as HTMLButtonElement;
const todoList = document.querySelector(".todos") as HTMLLIElement;

const reducers = {
  todos: fromStore.reducer
};

const store = new fromStore.Store(reducers);

init();

function init() {
  bindListeners();
  const unsubscribe = store.subscribe(state => {
    renderTodos(state.todos.data);
  });
  store.subscribe(logState);

  destroy.addEventListener("click", unsubscribe, false);
}

function bindListeners() {
  button.addEventListener(
    "click",
    () => {
      if (!input.value.trim()) return;

      const todo = { label: input.value, complete: false };

      store.dispatch(new fromStore.AddTodo(todo));

      input.value = "";
    },
    false
  );

  todoList.addEventListener("click", function(event) {
    const target = event.target as HTMLButtonElement;
    if (target.nodeName.toLowerCase() === "button") {
      const todo = JSON.parse(target.getAttribute("data-todo") as string);
      store.dispatch(new fromStore.RemoveTodo(todo));
      console.log(target);
    }
  });
}

function logState(state) {
  console.log("STATE:::", state);
}
