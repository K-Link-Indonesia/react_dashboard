export default function GEnv(item){
  return process.env["REACT_APP_"+item];
}