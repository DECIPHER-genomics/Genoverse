import jQuery from 'jquery';

// Bits of jquery-ui which we care about
import 'jquery-ui/ui/position';
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/resizable';
import 'jquery-ui/ui/widgets/sortable';

global.$ = global.jQuery = jQuery;

const importAll = r => r.keys().forEach(r);

importAll(require.context('./jquery-plugins', false, /\.js$/));

export default jQuery;
