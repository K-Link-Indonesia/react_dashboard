import { useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { falert } from './lib/GLib';
import { SessionDestroy, SessionGet, SessionSet } from './lib/Session';

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
  const GetList = (event) => {
    fetch("https://dy71wcl0rh.execute-api.ap-southeast-1.amazonaws.com/staging/graphql",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":SessionGet("session_token")
      },
      body:JSON.stringify({
        query:"query{getAllBooks{id\nauthor}}",
      })
    }).then(
      (response) => response.json()
    ).then((result)=>{
      alert(JSON.stringify(result));
    }).catch(error => console.warn(error));
  }
  const handleSubmit = (event) => {
    event.preventDefault();
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
        {GetList()}
      </table>
    </form>
  );
}