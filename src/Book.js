import { useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { falert } from './lib/GLib';
import { SessionDestroy, SessionSet } from './lib/Session';

export default function Book(){
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
      <h3>Books</h3>
      <table width="100%" border="1">
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Author</th>
          <th>Create</th>
        </tr>
        <tr>
          <td>Title</td>
          <td>Description</td>
          <td>Author</td>
          <td>Create</td>
        </tr>
      </table>
    </form>
  );
}