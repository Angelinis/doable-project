import DOMHandler from "./DOM.js";
import {htmlHeaderLogin} from "./header.js";
import homePage from "./homepage.js";
import {getData} from "./sessionManage.js";

const htmlSignPage = 
`${htmlHeaderLogin}
  <form class ="signup-form" action="">
  <div>
    <label for="email">Email</label>
    <input
      type="text"
      name="email"
      id="email"
      placeholder="you@example.com"
    />
  </div>
  <div>
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
  value="Create Account"
  class="primary-button btn"
  />
  </form>
  <button type="button" class="secondary-button btn">Login</button>

</div>`;

function addFormListen() {
  const button = document.querySelector(".secondary-button");
  const form = document.querySelector(".signup-form");
  button.addEventListener("click", function() {
    DOMHandler.load(homePage) 
  })
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const {email, password} = event.target.elements
    const body = {
      email: email.value,
      password: password.value
    }
    getData(body, "signup");
  })
};

const signPage = {
  toString() {
    return htmlSignPage;
  },
  addListeners() {
    addFormListen();
  }
};


export default signPage;