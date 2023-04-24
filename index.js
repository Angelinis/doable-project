import DOMHandler from "./DOM.js";
import homePage from "./homepage.js";
import { sessionManage } from "./sessionManage.js";
import tasks from "./tasks.js";

if (sessionManage.get()) {
  DOMHandler.load(tasks)
} else {
  DOMHandler.load(homePage)
}
;
