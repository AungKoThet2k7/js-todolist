import {
  addListHandler,
  deleteAllHandler,
  doneAllHandler,
  listGroupHandler,
  taskInputHandler,
} from "./handlers.js";
import {
  addTaskBtn,
  deleteAll,
  doneAll,
  listGroup,
  taskInput,
} from "./selector.js";

const listener = () => {
  addTaskBtn.addEventListener("click", addListHandler);
  listGroup.addEventListener("click", listGroupHandler);
  taskInput.addEventListener("keyup", taskInputHandler);
  deleteAll.addEventListener("click", deleteAllHandler);
  doneAll.addEventListener("click", doneAllHandler);
};

export default listener;
