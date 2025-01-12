const taskInput = document.querySelector("#taskInput");
const addTaskBtn = document.querySelector("#addTaskBtn");
const listGroup = document.querySelector("#listGroup");
const doneTaskTotal = document.querySelector("#doneTaskTotal");
const taskTotal = document.querySelector("#taskTotal");

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
  const list = document.createElement("div");

  list.classList.add("list");
  list.id = "list" + Date.now();

  list.innerHTML = `<div class="bg-stone-50 flex justify-between items-center animate__animated animate__zoomIn border border-stone-950 p-3 mb-3">
              <div class="flex gap-3 items-center">
                <input type="checkbox" class="list-done-check accent-stone-950" />
                <p class="font-mono text-stone-900 list-task">${currentTask}</p>
              </div>
  
              <div class="flex gap-1">
                <button class="list-edit-btn border-[1.5px] p-[.7px] active:scale-90 active:bg-stone-200 active:rounded duration-200 border-stone-950 disabled:opacity-20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6 stroke-stone-900 pointer-events-none"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                </button>
  
                <button class="list-del-btn border-[1.5px] p-[.8px] active:scale-90 active:rounded active:bg-stone-200 duration-200 border-stone-950">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6 stroke-stone-900 pointer-events-none"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>`;

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
  if (window.confirm("Are you sure to delete this ?")) {
    currentList.className = "animate__animated animate__zoomOut";
    currentList.addEventListener("animationend", () => {
      console.log("Deleted");
      currentList.remove();
      updateTaskTotal();
      updateDoneTaskTotal();
    });
  }
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
  if (event.target.classList.contains("list-del-btn")) {
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

//event Listener
addTaskBtn.addEventListener("click", addListHandler);
listGroup.addEventListener("click", listGroupHandler);
taskInput.addEventListener("keyup", taskInputHandler);
