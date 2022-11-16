import './css/global.css';
import './css/local.css';
import './css/App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import * as GLib from './lib/GLib';
import {CCC} from './lib/GLib';
import Login, { Logout } from './Login';
import {SessionGet, SessionSet} from './lib/Session';
import { fontWeight } from '@mui/system';
import Book,{BookSave} from './Book';
import Blank from './Blank';

export default function Home() {
  //alert("before: "+SessionGet("test_session"));
  //SessionSet("test_session","value session");
  //alert(SessionGet("test_session"));
  function user_profile(){
    if(SessionGet('session_name')){
      return(<span>Hi, <b>{SessionGet('session_name')}</b> |&nbsp;<a href="/logout">Logout</a></span>);
    }else{
      return(<a href="/login">Login</a>);
    }
  }
  function show_alert(){
    var errmsg="",scsmsg="";
    errmsg=SessionGet('errmsg');
    SessionSet('errmsg','');
    if(errmsg){
      alert(errmsg);
    }
    scsmsg=SessionGet('scsmsg');
    SessionSet('scsmsg','');
    if(scsmsg){
      alert(scsmsg);
    }
  }

  return (
    <Router>
      <div className="Home-header">
        <div className="left" style={{"lineHeight":"50px"}}><img src={require('./images/logo.png')} onClick={()=>{window.location='/'}} style={{cursor:"pointer"}} height="38" align="absmiddle"/><span className='font1' style={{"marginLeft":"10px"}}>Dashboard Management System</span></div>
        <div className="right">{user_profile()}</div>
      </div>
      <div className="Home-body">
        <div id='mainmenu' className="Home-navigation noprint">
          <ul>
            <li><a href="/book">Books</a></li>
          </ul>
        </div>
        <div className="Home-content">
          <Routes>
            <Route path='/' element={<Blank/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/logout' element={<Logout/>}/>
            <Route path='/book' element={<Book/>}/>
            <Route path='/book/save/:id' element={<BookSave/>}/>
          </Routes>
        </div>
      </div>
      {show_alert()}
    </Router>
  );
}