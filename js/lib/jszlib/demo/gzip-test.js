var DATA = [31,139,8,8,141,124,72,77,0,3,103,122,105,112,45,116,101,115,116,46,116,120,116,0,53,144,205,113,67,49,8,132,239,169,98,11,240,188,42,146,91,174,41,128,72,107,135,25,253,89,2,143,203,15,242,75,110,66,192,178,251,125,246,201,10,29,203,43,114,47,125,98,169,65,42,237,130,212,219,98,50,154,79,72,214,161,75,147,182,27,88,52,186,139,57,54,64,245,85,123,134,177,142,216,214,150,52,107,246,102,112,67,145,239,208,7,237,212,38,170,220,154,64,138,222,93,14,124,25,216,180,134,56,170,238,199,35,74,169,23,220,93,23,90,95,54,61,131,79,206,164,38,166,189,193,75,145,154,250,169,188,135,194,212,190,244,146,212,17,195,160,132,243,26,158,250,153,32,78,217,129,247,45,41,110,132,78,15,39,103,88,109,152,28,147,63,108,153,51,146,199,199,163,23,31,113,142,97,39,146,130,107,17,73,75,249,71,20,129,28,87,191,169,24,218,54,132,33,51,10,159,7,62,158,137,195,232,155,99,48,232,41,9,83,204,37,31,154,197,246,70,164,24,179,107,102,219,20,55,169,56,154,188,12,217,185,209,175,215,192,44,200,92,156,187,91,123,217,54,100,3,210,192,177,254,184,122,61,222,126,1,248,169,137,153,191,1,0,0];


function handle() {
    if (typeof ArrayBuffer !== 'function') {
	dlog('We seem to be running on a browser without ArrayBuffer support');
    }

    var a = new Uint8Array(DATA.length);
    for (var i = 0; i < DATA.length; ++i) {
	a[i] = DATA[i];
    }
    var inputBuffer = a.buffer;

    dlog('id1=' + a[0]);
    dlog('id2=' + a[1]);
    dlog('method=' + a[2]);
    dlog('flags= ' + a[3]);
    if (a[3] & 8) {
	var idx = 10;
	var name = ''
	while (a[idx] != 0) {
	    name += String.fromCharCode(a[idx]);
	    ++idx;
	}
	dlog('Original name is ' + name);
    }

    var resultBuffer = jszlib_inflate_buffer(inputBuffer, idx + 1, a.length - idx - 1);
    dlog('Uncompressed size: ' + resultBuffer.length);
    var s = ''
    var resultBB = new Uint8Array(resultBuffer);
    for (i = 0; i < resultBB.length; ++i) {
	s += String.fromCharCode(resultBB[i]);
    }
    dlog(s);
}

function dlog(msg) {
    var logHolder = document.getElementById('log');
    if (logHolder) {
	logHolder.appendChild(makeElement('p', msg));
    }
}

function makeElement(tag, children, attribs, styles)
{
    var ele = document.createElement(tag);
    if (children) {
        if (! (children instanceof Array)) {
            children = [children];
        }
        for (var i = 0; i < children.length; ++i) {
            var c = children[i];
            if (typeof c == 'string') {
                c = document.createTextNode(c);
            }
            ele.appendChild(c);
        }
    }
    
    if (attribs) {
        for (var l in attribs) {
            ele[l] = attribs[l];
        }
    }
    if (styles) {
        for (var l in styles) {
            ele.style[l] = styles[l];
        }
    }
    return ele;
}