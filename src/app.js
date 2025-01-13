const taskInput = document.querySelector("#taskInput");
const addTaskBtn = document.querySelector("#addTaskBtn");
const listGroup = document.querySelector("#listGroup");
const doneTaskTotal = document.querySelector("#doneTaskTotal");
const taskTotal = document.querySelector("#taskTotal");
const doneAll = document.querySelector("#doneAll");
const deleteAll = document.querySelector("#deleteAll");
const listTemplate = document.querySelector("#listTemplate");

// actions ( Business Logic)
const addlist = (text) => {
  listGroup.append(createList(text));
  taskInput.value = "";
  updateTaskTotal();
};

const updateTaskTotal = () => {
  const lists = document.querySelectorAll(".list");
  taskTotal.innerText = lists.length;
};

const updateDoneTaskTotal = () => {
  const lists = document.querySelectorAll(".list input:checked");
  doneTaskTotal.innerText = lists.length;
};

//create list

const createList = (currentTask) => {
  // const list = document.createElement("div");
  const list = listTemplate.content.cloneNode(true);
  console.log(list);
  list.querySelector(".list").id = "list" + Date.now();
  list.querySelector(".list-task").innerText = currentTask;

  // list.classList.add("list");
  // list.id = "list" + Date.now();

  const doneList = list.querySelector(".list-done-check");
  const listTask = list.querySelector(".list-task");
  const listEditBtn = list.querySelector(".list-edit-btn");
  const listDelBtn = list.querySelector(".list-del-btn");

  // doneList.addEventListener("change", () => {
  //   updateDoneTaskTotal();
  //   listTask.classList.toggle("line-through");
  //   list.classList.toggle("opacity-20");
  //   list.classList.toggle("scale-90");
  //   list.classList.add("duration-200");
  //   if (doneList.checked) {
  //     listEditBtn.setAttribute("disabled", true);
  //   } else {
  //     listEditBtn.removeAttribute("disabled");
  //   }
  // });

  // listDelBtn.addEventListener("click", () => {
  //   if (window.confirm("Are you sure to delete this ?")) {
  //     list.remove();
  //     updateTaskTotal();
  //   }
  // });

  // listEditBtn.addEventListener("click", () => {
  //   listEditBtn.removeAttribute("disabled");
  //   doneList.setAttribute("disabled", true);
  //   const taskEditInput = document.createElement("input");
  //   taskEditInput.className = "border border-stone-950 w-[240px] font-mono focus-visible:outline-none px-2";
  //   listTask.after(taskEditInput);
  //   listTask.classList.add("hidden");
  //   taskEditInput.focus();

  //   taskEditInput.addEventListener("blur", () => {
  //     listTask.classList.remove("hidden");
  //     taskEditInput.remove();
  //     listTask.innerText = taskEditInput.value;
  //     doneList.removeAttribute("disabled");
  //   });
  // });

  return list;
};

const listDelete = (listId) => {
  const currentList = document.querySelector(`#${listId}`);
  // if (window.confirm("Are you sure to delete this ?")) {
  currentList.className = "animate__animated animate__zoomOut";
  currentList.addEventListener("animationend", () => {
    console.log("Deleted");
    currentList.remove();
    updateTaskTotal();
    updateDoneTaskTotal();
  });
  // }
};

const listEdit = (listId) => {
  const currentList = document.querySelector(`#${listId}`);

  const listEditBtn = currentList.querySelector(".list-edit-btn");
  const doneList = currentList.querySelector(".list-done-check");
  const listTask = currentList.querySelector(".list-task");

  listEditBtn.removeAttribute("disabled");
  doneList.setAttribute("disabled", true);
  const taskEditInput = document.createElement("input");
  taskEditInput.className =
    "border border-stone-950 w-[240px] font-mono focus-visible:outline-none px-2";
  listTask.after(taskEditInput);
  listTask.classList.add("hidden");
  taskEditInput.focus();

  taskEditInput.addEventListener("blur", () => {
    listTask.classList.remove("hidden");
    taskEditInput.remove();
    listTask.innerText = taskEditInput.value;
    doneList.removeAttribute("disabled");
    console.log("Edited");
  });
};

const listDone = (listId) => {
  const currentList = document.querySelector(`#${listId}`);

  const listTask = currentList.querySelector(".list-task");
  const doneList = currentList.querySelector(".list-done-check");
  const listEditBtn = currentList.querySelector(".list-edit-btn");

  listTask.classList.toggle("line-through");
  currentList.classList.toggle("opacity-20");
  currentList.classList.toggle("scale-90");
  currentList.classList.add("duration-200");
  if (doneList.checked) {
    listEditBtn.setAttribute("disabled", true);
  } else {
    listEditBtn.removeAttribute("disabled");
  }
  updateDoneTaskTotal();
  console.log("Checked");
};

// Handler ( Application Logic)
const listGroupHandler = (event) => {
  const list = event.target.closest(".list");
  if (
    event.target.classList.contains("list-del-btn") &&
    window.confirm("Are you sure to delete this ?")
  ) {
    listDelete(event.target.closest(".list").id);
  }

  if (event.target.classList.contains("list-edit-btn")) {
    listEdit(event.target.closest(".list").id);
  }

  if (event.target.classList.contains("list-done-check")) {
    listDone(event.target.closest(".list").id);
  }
};

const addListHandler = () => {
  if (taskInput.value.trim()) {
    addlist(taskInput.value);
  }
};

const taskInputHandler = (event) => {
  if (event.key === "Enter" && taskInput.value.trim()) {
    addlist(taskInput.value);
  }
};

const deleteAllHandler = () => {
  if (confirm("Are you sure to delete all lists ?")) {
    const allList = listGroup.querySelectorAll(".list");
    allList.forEach((list) => {
      // list.remove();
      listDelete(list.id);
    });
    // updateDoneTaskTotal();
    // updateTaskTotal();
  }
};

const doneAllHandler = () => {
  if (confirm("Are you sure to done all lists ?")) {
    const allList = listGroup.querySelectorAll(".list");
    allList.forEach((list) => {
      list.querySelector(".list-done-check").checked = true;
      listDone(list.id);
    });
  }
};

//event Listener
addTaskBtn.addEventListener("click", addListHandler);
listGroup.addEventListener("click", listGroupHandler);
taskInput.addEventListener("keyup", taskInputHandler);
deleteAll.addEventListener("click", deleteAllHandler);
doneAll.addEventListener("click", doneAllHandler);
