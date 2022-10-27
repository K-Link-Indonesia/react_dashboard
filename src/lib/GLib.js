import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default function GLib() {

}
export function CCC() {
  return (<span></span>);
}
export function falert(msg,type){
  switch(type){
    case 'success':
      NotificationManager.success(msg);
    break;
    case 'error':
      NotificationManager.error(msg);
    break;
    case 'warning':
      NotificationManager.warning(msg);
    break;
    default:
      NotificationManager.info(msg);
    break;
  }
  
  return(<NotificationContainer/>);
}