import { SessionGet, SessionSet } from "./Session";

export default function Auth() {

}
export function AuthRight(){
  if(!SessionGet('session_token') || SessionGet('session_token')==""){
    return false;
  }else{
    return true;
  }
}
export function AuthCheck(){
  if(AuthRight()!=true){
    SessionSet('errmsg','Authentication error, please relogin');
    window.location='/login';
  }
}