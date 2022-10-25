import './index.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import * as GLib from './lib/GLib';
import {CCC} from './lib/GLib';
import Login, { Logout } from './Login';
import {SessionGet, SessionSet} from './lib/Session';

export default function Home() {
  //alert("before: "+SessionGet("test_session"));
  //SessionSet("test_session","value session");
  //alert(SessionGet("test_session"));
  var user_html="";
  if(SessionGet('session_name')){
    user_html="Hi, <b>"+SessionGet('session_name')+"</b> | ";
  }else{
    user_html="";
  }
  return (
    <Router>
      <div class="Home-header">
        <div class="left"><p>HEADER SECTION</p></div>
        <div class="right">{user_html}<a href="/logout">Logout</a></div>
      </div>
      <div class="Home-body">
        <div class="Home-navigation">
          <a href="/">Home</a><br/>
          <a href="/login">Login Form</a><br/>
        </div>
        <div class="Home-content">
          <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/logout' element={<Logout/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}