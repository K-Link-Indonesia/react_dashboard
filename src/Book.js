import { useEffect, useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { falert, nl2br } from './lib/GLib';
import { SessionDestroy, SessionGet, SessionSet } from './lib/Session';
import ReactDOM from 'react-dom/client';
import { useParams } from 'react-router-dom';

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
        <tr valign="top">
          <td>{row.title}</td>
          <td>{nl2br(row.description)}</td>
          <td>{row.author}</td>
          <td>{row.create_at}</td>
          <td align="center">
          <button type="button" onClick={()=>window.location='/book/edit/'+row.id}>Edit</button>
            <button type="button" onClick={()=>Delete(row)}>Delete</button>
          </td>
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

export function BookEdit(){
  var p=useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://dy71wcl0rh.execute-api.ap-southeast-1.amazonaws.com/staging/graphql",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":SessionGet("session_token")
      },
      body:JSON.stringify({
        query:"query{getOneBook(bookId:"+p.id+"){id\nauthor\ntitle\ndescription\ncreate_at}}",
      })
    }).then(
      (response) => response.json()
    ).then((result)=>{
      setData(result.data.getOneBook);
      //alert(JSON.stringify(result.data.getOneBook));
    }).catch(error => console.warn(error));
  }, []);

  const handleChange = (event) => { //all form changes will directly transferred to inputs variable
    const name = event.target.name;
    const value = event.target.value;
    setData(values => ({...values, [name]: value}));
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("https://dy71wcl0rh.execute-api.ap-southeast-1.amazonaws.com/staging/graphql",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":SessionGet("session_token")
      },
      body:JSON.stringify({
        query:"mutation{updateBook(idBook:"+p.id+",author:"+JSON.stringify(data.author)+",title:"+JSON.stringify(data.title)+",description:"+JSON.stringify(data.description)+"){id\nauthor\ntitle\ndescription}}",
      })
    }).then(
      (response) => response.json()
    ).then((result)=>{
      if(result["errors"]){
        var errmsg="";
        for(var i in result["errors"]){
          errmsg+=result["errors"][i]['message']+"\n";
        }
        alert(errmsg);
        //alert(JSON.stringify(result));
      }else{
        alert('Data berhasil diupdate');
        window.location='/book';
      }
    }).catch(error => console.warn(error));
  }
  return (
    <form onSubmit={handleSubmit}>
      <NotificationContainer/>
      <h3>Book Edit</h3>
      Author:<br/>
      <input name="author" placeholder='Author' value={data.author} onChange={handleChange}/><br/>
      Title:<br/>
      <input name="title" placeholder='Title' value={data.title} onChange={handleChange}/><br/>
      Description:<br/>
      <textarea name="description" placeholder='Description' value={data.description} onChange={handleChange}/><br/>
      <button type="submit">Submit</button>
      <button type="button" onClick={()=>window.location='/book'}>Cancel</button>
    </form>
  );
}