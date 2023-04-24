import DOMHandler from "./DOM.js";
import { getData, sessionManage } from "./sessionManage.js";
import tasks from "./tasks.js";

function editTask(id , input, value) {
    let body
    (input == "Completed") ? body = {completed: value} : body = {important: value}
    async function editData(){
    const data = await getData(body, `tasks/${id}`, sessionManage.get(), "PATCH")
    // if (data.id) {
    //   DOMHandler.load(tasks);
    // }
  }
    editData();
    
  }

export default editTask;
