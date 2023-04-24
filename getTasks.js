import { getData, sessionManage } from "./sessionManage.js";

function getTasks() {

   
  async function getTask(){
    const data = await getData( null , "tasks", sessionManage.get(), "GET")
    return data;
  }
  return getTask();
    
};

export default getTasks;
