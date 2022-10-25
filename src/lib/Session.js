export default function Session() {
  /*
  const gset = (field,value) => {
    sessionStorage.setItem(field,value);
    // Also set this in cookie/localStorage
  }

  var get = function(field){
    return sessionStorage.getItem(field);;    // Or pull this from cookie/localStorage
  };

  var set = function(field,value){
    sessionStorage.setItem(field,value);
    // Also set this in cookie/localStorage
  };
  */
}
var arrsession=[];
export function SessionSet(field,value){
  sessionStorage.setItem(field,value);
  arrsession.push(field);
  // Also set this in cookie/localStorage
}
export function SessionGet(field){
  return sessionStorage.getItem(field);
}
export function SessionDestroy(field){
  sessionStorage.clear();
}