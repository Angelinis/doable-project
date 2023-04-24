import DOMHandler from "./DOM.js";
import editTask from "./editTask.js";
import getTasks from "./getTasks.js";
import {htmlHeader} from "./header.js";
import homePage from "./homepage.js";
import postChore from "./postChore.js";
import {sessionManage} from "./sessionManage.js";


function htmlSVG (importance, id) {
  return `<svg class="important-button ${importance}" width="16" height="16" viewBox="0 0 16 16" fill="" xmlns="http://www.w3.org/2000/svg">
  <path id="important-button-${id}" class="important-button ${importance}" fill-rule="evenodd" clip-rule="evenodd" d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM9 12C9 12.5523 8.55229 13 8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11C8.55229 11 9 11.4477 9 12ZM8 3C7.44772 3 7 3.44772 7 4V8C7 8.55228 7.44772 9 8 9C8.55229 9 9 8.55228 9 8V4C9 3.44772 8.55229 3 8 3Z" fill=""/>
  </svg>
`
} 
;

const htmlForm = 
`<form class="new-chore-form">
    <input id="title" name="title" type="text" placeholder="do the dishes ...">
    <input id="due_date" name="due_date" type="date" placeholder="mm/dd/yy">
    <input class="btn" type="submit" value="Add Task"/>
  </form>
`; 

const htmlFilter =
`<div>
<label>Sort</label>
<select name="sort-list" id="sort-list">
<option value="Alphabetical (a-z)">Alphabetical (a-z)</option>
<option value="Due date">Due date</option>
<option value="Importance">Importance</option>
</select>
</br>
<label>Show</label>
<input type="checkbox" id="pending-chore" name="pending-chore">
<label for="pending-chore">Only pending</label>
<input type="checkbox" id="important-chore" name="important-chore">
<label for="important-chore">Only important</label>
</div>

`
;

function htmlTask(id, title, due_date = null, important, completed) {
  const importantValue = (completed) ? ((important) ? "completed-important": "not-completed-important") : ((important) ? "important": "not-important");
  return `
  <div>
  <input class="task-checkbox" type="checkbox" id="task-checkbox-${id}" name="task-${id}">
  <label for="task-${id}"> ${title} </label>   ${htmlSVG(importantValue, id)}<br/>
  <span> ${(due_date === null) ? "" : (new Date(due_date)).toDateString()} </span>
  </div>
`
}
;

function compareAndSort(sortData){
  if (sortData == "Alphabetical (a-z)")  {
  return function sort(objectA,objectB) {
  const valueA = objectA.title.toUpperCase();
  const valueB = objectB.title.toUpperCase();
  let comparison = 0;
  if (valueA > valueB) {
    comparison = 1;
  } else if(valueA < valueB) {
    comparison = -1;
  }
  return comparison;
}} else if (sortData == "Due date") {
  return function sort(objectA,objectB) {
    const valueA = objectA.due_date;
    const valueB = objectB.due_date;
    let comparison = 0;
    if (valueA > valueB) {
      comparison = 1;
    } else if(valueA < valueB) {
      comparison = -1;
    }
    return comparison
}
} else {
  return function sort(objectA,objectB) {
    const valueA = objectA.important ? 0 : 1;
    const valueB = objectB.important ? 0 : 1 ;
    let comparison = 0;
    if (valueA > valueB) {
      comparison = 1;
    } else if(valueA < valueB) {
      comparison = -1;
    }
    return comparison
}
}
}



const sortValue = function() {
  const taskList = document.querySelector("#sort-list");
  return taskList.value
}

const addSortListen = function(){
  const taskList = document.querySelector("#sort-list");
  taskList.addEventListener("click", (event) => {
    sortValue();
    insertTask();
  })
}

const addCompletedListen = function() {
  const completedFeatures = document.querySelectorAll(".task-checkbox");
  completedFeatures.forEach(completedFeature =>
    completedFeature.addEventListener("click", (event) => {
      const id = completedFeature.id.substring(14,)
      if (completedFeature.checked == true) editTask(id , "Completed" , true);
      if (completedFeature.checked == false) editTask(id , "Completed" , false);
  }))
}



const insertTask = function(filter = null){
  const taskList = document.querySelector(".tasks-list");
  async function renderTask() {
    taskList.innerHTML = "";
    let tasks = await getTasks();
    tasks = tasks.sort(compareAndSort(sortValue()));
    // tasks = tasks.sort()
    if (filter === "Only Important") tasks = tasks.filter(task => task.important == true );
    if (filter === "Only Pending") tasks = tasks.filter(task => task.completed == false );
    tasks.forEach((task) => {
      taskList.innerHTML += htmlTask(task.id, task.title, task.due_date, task.important, task.completed)      
    })    
    tasks.forEach((task) => {
    const checkboxTaskId = `task-checkbox-${task.id}` 
    const checkboxTask = document.getElementById(checkboxTaskId);
    if (task.completed) checkboxTask.checked = true;
    })
    addIconListen();
    addCompletedListen();
  }
  renderTask()
}

const htmlTaskPage = function(){
  return  `${htmlHeader}
  ${htmlFilter}
  <div class="tasks-list">
  <input type="checkbox" id="chore1" name="chore1">
  <label for="chore1">Complete assignments </label>   ${htmlSVG("important")}<br/>
  <span>Thursday, September 30</span>
  </div>
  <div>
   ${htmlForm}
  </div>

  ` 
};


const addFilterListen = function (){
  const filterImportant = document.querySelector("#important-chore");
  const filterPending = document.querySelector("#pending-chore");
  filterImportant.addEventListener("click", (event) => {
    if (filterImportant.checked== true) insertTask("Only Important")
    if (filterImportant.checked== false) insertTask()
  })
  filterPending.addEventListener("click", (event) => {
    if (filterPending.checked== true) insertTask("Only Pending")
    if (filterPending.checked== false) insertTask()
  })
}

function addIconListen() {
  const button = document.querySelector(".logout-button");
  button.addEventListener("click", (event) => {
    event.preventDefault();
    sessionManage.logout();
    DOMHandler.load(homePage);
  })

  

  const importanceButtons = document.querySelectorAll(".important-button");
  importanceButtons.forEach((importanceButton) => {
    importanceButton.addEventListener("click", function() {
      if (importanceButton.classList.contains("completed-important") || importanceButton.classList.contains("not-completed-important")){
        importanceButton.classList.toggle("completed-important")
        importanceButton.classList.toggle("not-completed-important")
      }
      if (importanceButton.classList.contains("important")|| importanceButton.classList.contains("not-important")){
      importanceButton.classList.toggle("important")
      importanceButton.classList.toggle("not-important")
      
    }
    const id = importanceButton.id.substring(17,)
    if ((importanceButton.classList.contains("completed-important")|| importanceButton.classList.contains("important")) && id.length > 0 ) editTask(id , "Important" , true);
    if ((importanceButton.classList.contains("not-completed-important")|| importanceButton.classList.contains("not-important")) && id.length > 0 ) editTask(id , "Important" , false);
  })
  })
};

const tasks = {
  toString() {
    return htmlTaskPage();
  },
  addListeners() {
    addSortListen();
    addFilterListen();
    insertTask();
    postChore();
  }
};


export default tasks;