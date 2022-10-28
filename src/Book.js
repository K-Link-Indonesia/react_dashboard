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
          <button type="button" onClick={()=>window.location='/book/save/'+row.id}>Edit</button>
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
      <button type="button" onClick={()=>window.location='/book/save/-'}>Add New</button>
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

export function BookSave(){
  var p=useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    if(p.id!="-"){
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
        if(!result.data.getOneBook){
          alert('Data tidak ditemukan');
          window.location='/book';
          return;
        }
        setData(result.data.getOneBook);
        //alert(JSON.stringify(result.data.getOneBook));
      }).catch(error => console.warn(error));
    }
  }, []);

  const handleChange = (event) => { //all form changes will directly transferred to inputs variable
    const name = event.target.name;
    const value = event.target.value;
    setData(values => ({...values, [name]: value}));
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    var errmsg="";
    if(!data.title){
      errmsg+="Title is required\n";
    }
    if(!data.author){
      errmsg+="Author is required\n";
    }
    if(errmsg==""){
      if(p.id=="-"){
        var ql_query="mutation{createBook(author:"+JSON.stringify(data.author)+",title:"+JSON.stringify(data.title)+",description:"+JSON.stringify(data.description)+"){id}}";
      }else{
        var ql_query="mutation{updateBook(idBook:"+p.id+",author:"+JSON.stringify(data.author)+",title:"+JSON.stringify(data.title)+",description:"+JSON.stringify(data.description)+"){id}}";
      }
      fetch("https://dy71wcl0rh.execute-api.ap-southeast-1.amazonaws.com/staging/graphql",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization":SessionGet("session_token")
        },
        body:JSON.stringify({
          query:ql_query,
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
          if(p.id=="-"){
            alert('Data berhasil ditambahkan');
          }else{
            alert('Data berhasil diupdate');
          }
          window.location='/book';
        }
      }).catch(error => console.warn(error));
    }else{
      alert(errmsg);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <NotificationContainer/>
      <h3>{(p.id=="-")?"Add":"Edit"} Book</h3>
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