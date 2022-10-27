import { useState } from 'react';
import { NotificationContainer } from 'react-notifications';
import { falert } from './lib/GLib';
import { SessionDestroy, SessionSet } from './lib/Session';

export default function Login(){
  //falert('baru nih');
  const [inputs, setInputs] = useState({});
  const handleChange = (event) => { //all form changes will directly transferred to inputs variable
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}));
  }
  const Notify = (event) => {
    falert('keren nih');
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
      if(result['status']==true){
        SessionSet("session_id",result['result']['id']);
        SessionSet("session_name",result['result']['username']);
        SessionSet("session_token",result['result']['token']);
        window.location='/';
      }
    }).catch(error => console.warn(error));
  }
  return (
    <form onSubmit={handleSubmit}>
      <NotificationContainer/>
      <center>
        <input name="username" value={inputs["username"] || ""} placeholder="Username" onChange={handleChange}/><br/>
        <input name="password" value={inputs["password"] || ""} placeholder="Password" onChange={handleChange}/><br/>
        <button type="submit">Submit</button>
        <button type="button" onClick={Register}>Register</button>
        <button type="button" onClick={Notify}>Notify</button>
      </center>
    </form>
  );
}
export function Logout(){
  SessionDestroy();
  window.location="/home";
  //return (<div>You have been logout successfully.</div>);
}