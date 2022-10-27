export default function Session() {

}

export function SessionSet(field,value){
  sessionStorage.setItem(field,value);
}
export function SessionGet(field){
  return sessionStorage.getItem(field);
}
export function SessionDestroy(field){
  sessionStorage.clear();
}