import { useEffect, useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { falert } from './lib/GLib';
import { SessionDestroy, SessionGet, SessionSet } from './lib/Session';
import ReactDOM from 'react-dom/client';

export default function Book(){
  const [tableList, setTableList] = useState([]);
  useEffect(() => {
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
      setTableList(result.data.getAllBooks);
    }).catch(error => console.warn(error));
  }, []);
  function GetList(){
    return tableList.map(row =>
      <tbody key={row.id}>
        <tr>
          <td>{row.title}</td>
          <td>{row.description}</td>
          <td>{row.author}</td>
          <td>{row.create_at}</td>
          <td align="center"><button type="button" onClick={()=>Delete(row)}>Delete</button></td>
        </tr>
      </tbody>
    );
  }

  const [inputs, setInputs] = useState({});
  const handleChange = (event) => { //all form changes will directly transferred to inputs variable
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}));
  }
  const handleSubmit = (event) => {
    event.preventDefault();
  }
  const Delete = (data) => {
    var q=window.confirm("Are you sure to delete this data?");
    if(q==true){
      alert(JSON.stringify(data));
    }else{

    }
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
            <th></th>
          </tr>
        </tbody>
        {GetList()}
      </table>
    </form>
  );
}