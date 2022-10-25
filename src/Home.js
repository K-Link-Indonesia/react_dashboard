import './index.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import * as GLib from './lib/GLib';
import {CCC} from './lib/GLib';
import Login, { Logout } from './Login';

export default function Home() {
  return (
    <Router>
      <div class="Home-header">
        <div class="left"><p>HEADER SECTION</p></div>
        <div class="right"><a href="/logout">Logout</a></div>
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