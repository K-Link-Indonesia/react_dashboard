import { useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { falert } from './lib/GLib';
import { SessionDestroy, SessionGet, SessionSet } from './lib/Session';
import ReactDOM from 'react-dom/client';

export default function Book(){
  const [inputs, setInputs] = useState({});
  const handleChange = (event) => { //all form changes will directly transferred to inputs variable
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}));
  }
  function GetList(){
    fetch("https://dy71wcl0rh.execute-api.ap-southeast-1.amazonaws.com/staging/graphql",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":SessionGet("session_token")
      },
      body:JSON.stringify({
        query:"query{getAllBooks{id\nauthor\ntitle\ndescription\ncreate_at}}",
      })
    }).then(
      (response) => response.json()
    ).then((result)=>{
      //alert(JSON.stringify(result.data.getAllBooks));
      ReactDOM.hydrateRoot(document.getElementById('list_cont'),result.data.getAllBooks.map(row =>
        <tr>
          <td>{row.title}</td>
          <td>{row.description}</td>
          <td>{row.author}</td>
          <td>{row.create_at}</td>
        </tr>
      ));
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
        <tbody>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Author</th>
            <th>Create</th>
          </tr>
        </tbody>
        <tbody id="list_cont"></tbody>
        {GetList()}
      </table>
    </form>
  );
}