/**
 * Created by cuitao-pc on 16/5/26.
 */
import keyMirror from 'keymirror';
var DialogCmd = keyMirror({
  SHOW: null,
  CLOSE: null
});
var DialogEvent = keyMirror({
  SHOW_NEXT: null
});
export {
  DialogCmd,
  DialogEvent
};