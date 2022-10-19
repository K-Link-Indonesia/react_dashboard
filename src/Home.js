import './index.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import * as GLib from './lib/GLib';
import {CCC} from './lib/GLib';
import Login from './Login';

export default function Home() {
  return (
    <Router>
      <header className="Home-header">
          <p>HEADER SECTION</p> <CCC>This is my comment</CCC>
          <a href="/">Home</a><br/>
          <a href="/login">Login Form</a><br/>
      </header>
      <Routes>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </Router>
  );
}