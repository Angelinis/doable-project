import DOMHandler from "./DOM.js";
import { getData, sessionManage } from "./sessionManage.js";
import tasks from "./tasks.js";

function postChore() {
  const form = document.querySelector(".new-chore-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(event.target.elements);
    const {title, due_date} = event.target.elements
    const body = {
      title: title.value,
      due_date: due_date.value
    }
    async function postData(){
    const data = await getData(body, "tasks", sessionManage.get())
    if (data.id) {
      DOMHandler.load(tasks);
    }
  }
    postData();
    
  })
};

export default postChore;
