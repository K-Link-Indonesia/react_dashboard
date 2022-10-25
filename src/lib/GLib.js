import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default function GLib() {

}
export function CCC() {
  return (<span></span>);
}
export function falert(msg) {
  NotificationManager.info(msg);
  return(<NotificationContainer/>);
}