import { useState } from 'react';
import { SessionDestroy, SessionSet } from './lib/Session';

export default function Login(){
  const [inputs, setInputs] = useState({});
  const handleChange = (event) => { //all form changes will directly transferred to inputs variable
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}));
  }
  const Register = (event) => {
    event.preventDefault();
    var url="https://dy71wcl0rh.execute-api.ap-southeast-1.amazonaws.com/staging/register";
    fetch(url,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        username:inputs['username'],
        password:inputs['password'],
        password_confirmation:inputs['password'],
      })
    }).then(
      (response) => response.json()
    ).then((result)=>{
      alert(JSON.stringify(result));
    }).catch(error => console.warn(error));
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    //var url="http://localhost/test_react.php";
    var url="https://dy71wcl0rh.execute-api.ap-southeast-1.amazonaws.com/staging/login";
    fetch(url,{
      method:"POST",
      //headers:{"Content-Type":"application/x-www-form-urlencoded"},
      headers:{"Content-Type":"application/json"},
      //body:new URLSearchParams(inputs).toString()
      body:JSON.stringify(inputs)
    }).then(
      (response) => response.json()
    ).then((result)=>{
      alert(JSON.stringify(result));
      if(result['result']){
        SessionSet("session_id",result['result']['id']);
        SessionSet("session_name",result['result']['username']);
        SessionSet("session_token",result['result']['token']);
        window.location='/';
      }
    }).catch(error => console.warn(error));
  }
  return (
    <form onSubmit={handleSubmit}>
      <center>
        <input name="username" value={inputs["username"] || ""}  onChange={handleChange} placeholder="Username"/><br/>
        <input name="password" value={inputs["password"] || ""}  onChange={handleChange} placeholder="Password"/><br/>
        <button type="submit">Submit</button>
        <button type="button" onClick={Register}>Register</button>
      </center>
    </form>
  );
}
export function Logout(){
  SessionDestroy();
  window.location="/home";
  //return (<div>You have been logout successfully.</div>);
}