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

  return (
    <Router>
      <div className="Home-header">
        <div className="left"><p className='font1'>HEADER SECTION</p></div>
        <div className="right">{user_profile()}</div>
      </div>
      <div className="Home-body">
        <div className="Home-navigation noprint">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/login">Login Form</a></li>
            <li><a href="/book">Books</a></li>
          </ul>
        </div>
        <div className="Home-content">
          <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/logout' element={<Logout/>}/>
            <Route path='/book' element={<Book/>}/>
            <Route path='/book/save/:id' element={<BookSave/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}