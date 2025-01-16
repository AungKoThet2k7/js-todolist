export const addlist = (text) => {
    listGroup.append(createList(text));
    taskInput.value = "";
    updateTaskTotal();
  };
  
export const updateTaskTotal = () => {
    const lists = document.querySelectorAll(".list");
    taskTotal.innerText = lists.length;
  };
  
export const updateDoneTaskTotal = () => {
    const lists = document.querySelectorAll(".list input:checked");
    doneTaskTotal.innerText = lists.length;
  };
  
export const createList = (currentTask) => {
    const list = listTemplate.content.cloneNode(true);
    // console.log(list);
    list.querySelector(".list").id = "list" + Date.now();
    list.querySelector(".list-task").innerText = currentTask;
  
    const doneList = list.querySelector(".list-done-check");
    const listTask = list.querySelector(".list-task");
    const listEditBtn = list.querySelector(".list-edit-btn");
    const listDelBtn = list.querySelector(".list-del-btn");
  
    return list;
  };
  
export const listDelete = (listId) => {
    const currentList = document.querySelector(`#${listId}`);
    currentList.className = "animate__animated animate__zoomOut";
    currentList.addEventListener("animationend", () => {
    //   console.log("Deleted");
      currentList.remove();
      updateTaskTotal();
      updateDoneTaskTotal();
    });
  };
  
export const listEdit = (listId) => {
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
    //   console.log("Edited");
    });
  };
  
export const listDone = (listId) => {
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
    // console.log("Checked");
  };