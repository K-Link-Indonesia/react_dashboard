import './index.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import * as GLib from './lib/GLib';
import {CCC} from './lib/GLib';
import Login from './Login';

export default function Home() {
  return (
    <Router>
      <div class="Home-header">
        <div class="left"><p>HEADER SECTION</p></div>
        <div class="right"><p>Logout</p></div>
      </div>
      <div class="Home-body">
        <div class="Home-navigation">
          <a href="/">Home</a><br/>
          <a href="/login">Login Form</a><br/>
        </div>
        <div class="Home-content">
          <Routes>
            <Route path='/login' element={<Login/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}