// const body = {
// 	"email": "ang@mail.com",
// 	"password": "123456"
// };



const getData = async function(body = null, endPoint, token = null, method = "POST") {
  let URI = "https://doable-api.herokuapp.com/"
  const headers = (token === null) ? {"Content-Type" : "application/json"} : {"Content-Type" : "application/json", 
"Authorization": `Token token=${token}`}
  let result
  if (body ===null ){
    result = await fetch(URI+endPoint, {
      method: method,
      headers: {"Authorization": `Token token=${token}`}})
  } else {
    result = await fetch(URI+endPoint, {
    method: method,
    headers: headers,
    body: JSON.stringify(body)
  })
}
  const data = await result.json();
  return data;
}

const sessionManage = function() {
  return {
    login(token) {
      sessionStorage.setItem("user", JSON.stringify(token))
    },

    get(){
      return JSON.parse(sessionStorage.getItem("user"))
    },
    logout(){
      sessionStorage.clear("user");
    }
  }

}()

export {getData, sessionManage};