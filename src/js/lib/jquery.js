import jQuery from 'jquery';

// Bits of jquery-ui which we care about
import 'jquery-ui/ui/position';
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/resizable';
import 'jquery-ui/ui/widgets/sortable';

const oldGlobal = {
  $      : global.$,
  jQuery : global.jQuery,
};

global.$ = global.jQuery = jQuery;

const importAll = r => r.keys().forEach(r);

try {
  importAll(require.context('./jquery-plugins', false, /\.js$/));
} finally {
  // Don't assign Genoverse's version of jQuery to global (window)
  global.$      = oldGlobal.$;
  global.jQuery = oldGlobal.jQuery;
}

export default jQuery;
