import DOMHandler from "./DOM.js";
import {htmlHeaderLogin} from "./header.js";
import {getData, sessionManage} from "./sessionManage.js";
import signPage from "./signup.js";
import tasks from "./tasks.js";

const htmlLoginPage = 
`${htmlHeaderLogin}
  <form class ="login-form" action="">
  <div class="container-md">
    <label for="email">Email</label>
    <input
      type="text"
      name="email"
      id="email"
      placeholder="you@example.com"
    />
  </div>
  <div class="container-md">
    <label for="password">Password</label>
    <input
      type="password"
      name="password"
      id="password"
      placeholder="******"
    />
  </div>
  <input
  type="submit"
  value="Login"
  class="primary-button btn"
  />

  </form>
  <button type="button" class="secondary-button btn">Create account</button>
</div>`;


function addFormListen() {
  const button = document.querySelector(".secondary-button");
  const form = document.querySelector(".login-form")
  button.addEventListener("click", function() {
    DOMHandler.load(signPage)
  })
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const {email, password} = event.target.elements
    const body = {
      email: email.value,
      password: password.value
    }
    async function getToken() {
      const token = await getData(body, "login")
      const tokenKey = token.token;
      if (tokenKey) {
      sessionManage.login(tokenKey);
      DOMHandler.load(tasks);
    } 
  } 
  getToken();
  })
};


const loginPage = {
  toString() {
    return htmlLoginPage;
  },
  addListeners() {
    addFormListen();
  }
};


export default loginPage;