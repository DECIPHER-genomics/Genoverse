(function () {

/*! jQuery v3.2.1 | (c) JS Foundation and other contributors | jquery.org/license */
!function(a,b){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){"use strict";var c=[],d=a.document,e=Object.getPrototypeOf,f=c.slice,g=c.concat,h=c.push,i=c.indexOf,j={},k=j.toString,l=j.hasOwnProperty,m=l.toString,n=m.call(Object),o={};function p(a,b){b=b||d;var c=b.createElement("script");c.text=a,b.head.appendChild(c).parentNode.removeChild(c)}var q="3.2.1",r=function(a,b){return new r.fn.init(a,b)},s=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,t=/^-ms-/,u=/-([a-z])/g,v=function(a,b){return b.toUpperCase()};r.fn=r.prototype={jquery:q,constructor:r,length:0,toArray:function(){return f.call(this)},get:function(a){return null==a?f.call(this):a<0?this[a+this.length]:this[a]},pushStack:function(a){var b=r.merge(this.constructor(),a);return b.prevObject=this,b},each:function(a){return r.each(this,a)},map:function(a){return this.pushStack(r.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(f.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(a<0?b:0);return this.pushStack(c>=0&&c<b?[this[c]]:[])},end:function(){return this.prevObject||this.constructor()},push:h,sort:c.sort,splice:c.splice},r.extend=r.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||r.isFunction(g)||(g={}),h===i&&(g=this,h--);h<i;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(r.isPlainObject(d)||(e=Array.isArray(d)))?(e?(e=!1,f=c&&Array.isArray(c)?c:[]):f=c&&r.isPlainObject(c)?c:{},g[b]=r.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},r.extend({expando:"jQuery"+(q+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===r.type(a)},isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){var b=r.type(a);return("number"===b||"string"===b)&&!isNaN(a-parseFloat(a))},isPlainObject:function(a){var b,c;return!(!a||"[object Object]"!==k.call(a))&&(!(b=e(a))||(c=l.call(b,"constructor")&&b.constructor,"function"==typeof c&&m.call(c)===n))},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?j[k.call(a)]||"object":typeof a},globalEval:function(a){p(a)},camelCase:function(a){return a.replace(t,"ms-").replace(u,v)},each:function(a,b){var c,d=0;if(w(a)){for(c=a.length;d<c;d++)if(b.call(a[d],d,a[d])===!1)break}else for(d in a)if(b.call(a[d],d,a[d])===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(s,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(w(Object(a))?r.merge(c,"string"==typeof a?[a]:a):h.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:i.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;d<c;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;f<g;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,e,f=0,h=[];if(w(a))for(d=a.length;f<d;f++)e=b(a[f],f,c),null!=e&&h.push(e);else for(f in a)e=b(a[f],f,c),null!=e&&h.push(e);return g.apply([],h)},guid:1,proxy:function(a,b){var c,d,e;if("string"==typeof b&&(c=a[b],b=a,a=c),r.isFunction(a))return d=f.call(arguments,2),e=function(){return a.apply(b||this,d.concat(f.call(arguments)))},e.guid=a.guid=a.guid||r.guid++,e},now:Date.now,support:o}),"function"==typeof Symbol&&(r.fn[Symbol.iterator]=c[Symbol.iterator]),r.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(a,b){j["[object "+b+"]"]=b.toLowerCase()});function w(a){var b=!!a&&"length"in a&&a.length,c=r.type(a);return"function"!==c&&!r.isWindow(a)&&("array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a)}var x=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ha(),z=ha(),A=ha(),B=function(a,b){return a===b&&(l=!0),0},C={}.hasOwnProperty,D=[],E=D.pop,F=D.push,G=D.push,H=D.slice,I=function(a,b){for(var c=0,d=a.length;c<d;c++)if(a[c]===b)return c;return-1},J="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",K="[\\x20\\t\\r\\n\\f]",L="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",M="\\["+K+"*("+L+")(?:"+K+"*([*^$|!~]?=)"+K+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+L+"))|)"+K+"*\\]",N=":("+L+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+M+")*)|.*)\\)|)",O=new RegExp(K+"+","g"),P=new RegExp("^"+K+"+|((?:^|[^\\\\])(?:\\\\.)*)"+K+"+$","g"),Q=new RegExp("^"+K+"*,"+K+"*"),R=new RegExp("^"+K+"*([>+~]|"+K+")"+K+"*"),S=new RegExp("="+K+"*([^\\]'\"]*?)"+K+"*\\]","g"),T=new RegExp(N),U=new RegExp("^"+L+"$"),V={ID:new RegExp("^#("+L+")"),CLASS:new RegExp("^\\.("+L+")"),TAG:new RegExp("^("+L+"|[*])"),ATTR:new RegExp("^"+M),PSEUDO:new RegExp("^"+N),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+K+"*(even|odd|(([+-]|)(\\d*)n|)"+K+"*(?:([+-]|)"+K+"*(\\d+)|))"+K+"*\\)|)","i"),bool:new RegExp("^(?:"+J+")$","i"),needsContext:new RegExp("^"+K+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+K+"*((?:-\\d)?\\d*)"+K+"*\\)|)(?=[^-]|$)","i")},W=/^(?:input|select|textarea|button)$/i,X=/^h\d$/i,Y=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,$=/[+~]/,_=new RegExp("\\\\([\\da-f]{1,6}"+K+"?|("+K+")|.)","ig"),aa=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:d<0?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},ba=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,ca=function(a,b){return b?"\0"===a?"\ufffd":a.slice(0,-1)+"\\"+a.charCodeAt(a.length-1).toString(16)+" ":"\\"+a},da=function(){m()},ea=ta(function(a){return a.disabled===!0&&("form"in a||"label"in a)},{dir:"parentNode",next:"legend"});try{G.apply(D=H.call(v.childNodes),v.childNodes),D[v.childNodes.length].nodeType}catch(fa){G={apply:D.length?function(a,b){F.apply(a,H.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function ga(a,b,d,e){var f,h,j,k,l,o,r,s=b&&b.ownerDocument,w=b?b.nodeType:9;if(d=d||[],"string"!=typeof a||!a||1!==w&&9!==w&&11!==w)return d;if(!e&&((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,p)){if(11!==w&&(l=Z.exec(a)))if(f=l[1]){if(9===w){if(!(j=b.getElementById(f)))return d;if(j.id===f)return d.push(j),d}else if(s&&(j=s.getElementById(f))&&t(b,j)&&j.id===f)return d.push(j),d}else{if(l[2])return G.apply(d,b.getElementsByTagName(a)),d;if((f=l[3])&&c.getElementsByClassName&&b.getElementsByClassName)return G.apply(d,b.getElementsByClassName(f)),d}if(c.qsa&&!A[a+" "]&&(!q||!q.test(a))){if(1!==w)s=b,r=a;else if("object"!==b.nodeName.toLowerCase()){(k=b.getAttribute("id"))?k=k.replace(ba,ca):b.setAttribute("id",k=u),o=g(a),h=o.length;while(h--)o[h]="#"+k+" "+sa(o[h]);r=o.join(","),s=$.test(a)&&qa(b.parentNode)||b}if(r)try{return G.apply(d,s.querySelectorAll(r)),d}catch(x){}finally{k===u&&b.removeAttribute("id")}}}return i(a.replace(P,"$1"),b,d,e)}function ha(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ia(a){return a[u]=!0,a}function ja(a){var b=n.createElement("fieldset");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ka(a,b){var c=a.split("|"),e=c.length;while(e--)d.attrHandle[c[e]]=b}function la(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&a.sourceIndex-b.sourceIndex;if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function na(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function oa(a){return function(b){return"form"in b?b.parentNode&&b.disabled===!1?"label"in b?"label"in b.parentNode?b.parentNode.disabled===a:b.disabled===a:b.isDisabled===a||b.isDisabled!==!a&&ea(b)===a:b.disabled===a:"label"in b&&b.disabled===a}}function pa(a){return ia(function(b){return b=+b,ia(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function qa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=ga.support={},f=ga.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return!!b&&"HTML"!==b.nodeName},m=ga.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=n.documentElement,p=!f(n),v!==n&&(e=n.defaultView)&&e.top!==e&&(e.addEventListener?e.addEventListener("unload",da,!1):e.attachEvent&&e.attachEvent("onunload",da)),c.attributes=ja(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ja(function(a){return a.appendChild(n.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Y.test(n.getElementsByClassName),c.getById=ja(function(a){return o.appendChild(a).id=u,!n.getElementsByName||!n.getElementsByName(u).length}),c.getById?(d.filter.ID=function(a){var b=a.replace(_,aa);return function(a){return a.getAttribute("id")===b}},d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c?[c]:[]}}):(d.filter.ID=function(a){var b=a.replace(_,aa);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}},d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c,d,e,f=b.getElementById(a);if(f){if(c=f.getAttributeNode("id"),c&&c.value===a)return[f];e=b.getElementsByName(a),d=0;while(f=e[d++])if(c=f.getAttributeNode("id"),c&&c.value===a)return[f]}return[]}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){if("undefined"!=typeof b.getElementsByClassName&&p)return b.getElementsByClassName(a)},r=[],q=[],(c.qsa=Y.test(n.querySelectorAll))&&(ja(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\r\\' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+K+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+K+"*(?:value|"+J+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ja(function(a){a.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var b=n.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+K+"*[*^$|!~]?="),2!==a.querySelectorAll(":enabled").length&&q.push(":enabled",":disabled"),o.appendChild(a).disabled=!0,2!==a.querySelectorAll(":disabled").length&&q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=Y.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ja(function(a){c.disconnectedMatch=s.call(a,"*"),s.call(a,"[s!='']:x"),r.push("!=",N)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=Y.test(o.compareDocumentPosition),t=b||Y.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===n||a.ownerDocument===v&&t(v,a)?-1:b===n||b.ownerDocument===v&&t(v,b)?1:k?I(k,a)-I(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,g=[a],h=[b];if(!e||!f)return a===n?-1:b===n?1:e?-1:f?1:k?I(k,a)-I(k,b):0;if(e===f)return la(a,b);c=a;while(c=c.parentNode)g.unshift(c);c=b;while(c=c.parentNode)h.unshift(c);while(g[d]===h[d])d++;return d?la(g[d],h[d]):g[d]===v?-1:h[d]===v?1:0},n):n},ga.matches=function(a,b){return ga(a,null,null,b)},ga.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(S,"='$1']"),c.matchesSelector&&p&&!A[b+" "]&&(!r||!r.test(b))&&(!q||!q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return ga(b,n,null,[a]).length>0},ga.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},ga.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&C.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},ga.escape=function(a){return(a+"").replace(ba,ca)},ga.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},ga.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=ga.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=ga.selectors={cacheLength:50,createPseudo:ia,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(_,aa),a[3]=(a[3]||a[4]||a[5]||"").replace(_,aa),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||ga.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&ga.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return V.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&T.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(_,aa).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+K+")"+a+"("+K+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=ga.attr(d,a);return null==e?"!="===b:!b||(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(O," ")+" ").indexOf(c)>-1:"|="===b&&(e===c||e.slice(0,c.length+1)===c+"-"))}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h,t=!1;if(q){if(f){while(p){m=b;while(m=m[p])if(h?m.nodeName.toLowerCase()===r:1===m.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){m=q,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n&&j[2],m=n&&q.childNodes[n];while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if(1===m.nodeType&&++t&&m===b){k[a]=[w,n,t];break}}else if(s&&(m=b,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n),t===!1)while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if((h?m.nodeName.toLowerCase()===r:1===m.nodeType)&&++t&&(s&&(l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),k[a]=[w,t]),m===b))break;return t-=e,t===d||t%d===0&&t/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||ga.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ia(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=I(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ia(function(a){var b=[],c=[],d=h(a.replace(P,"$1"));return d[u]?ia(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ia(function(a){return function(b){return ga(a,b).length>0}}),contains:ia(function(a){return a=a.replace(_,aa),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ia(function(a){return U.test(a||"")||ga.error("unsupported lang: "+a),a=a.replace(_,aa).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:oa(!1),disabled:oa(!0),checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return X.test(a.nodeName)},input:function(a){return W.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:pa(function(){return[0]}),last:pa(function(a,b){return[b-1]}),eq:pa(function(a,b,c){return[c<0?c+b:c]}),even:pa(function(a,b){for(var c=0;c<b;c+=2)a.push(c);return a}),odd:pa(function(a,b){for(var c=1;c<b;c+=2)a.push(c);return a}),lt:pa(function(a,b,c){for(var d=c<0?c+b:c;--d>=0;)a.push(d);return a}),gt:pa(function(a,b,c){for(var d=c<0?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=ma(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=na(b);function ra(){}ra.prototype=d.filters=d.pseudos,d.setFilters=new ra,g=ga.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){c&&!(e=Q.exec(h))||(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=R.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(P," ")}),h=h.slice(c.length));for(g in d.filter)!(e=V[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?ga.error(a):z(a,i).slice(0)};function sa(a){for(var b=0,c=a.length,d="";b<c;b++)d+=a[b].value;return d}function ta(a,b,c){var d=b.dir,e=b.next,f=e||d,g=c&&"parentNode"===f,h=x++;return b.first?function(b,c,e){while(b=b[d])if(1===b.nodeType||g)return a(b,c,e);return!1}:function(b,c,i){var j,k,l,m=[w,h];if(i){while(b=b[d])if((1===b.nodeType||g)&&a(b,c,i))return!0}else while(b=b[d])if(1===b.nodeType||g)if(l=b[u]||(b[u]={}),k=l[b.uniqueID]||(l[b.uniqueID]={}),e&&e===b.nodeName.toLowerCase())b=b[d]||b;else{if((j=k[f])&&j[0]===w&&j[1]===h)return m[2]=j[2];if(k[f]=m,m[2]=a(b,c,i))return!0}return!1}}function ua(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function va(a,b,c){for(var d=0,e=b.length;d<e;d++)ga(a,b[d],c);return c}function wa(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;h<i;h++)(f=a[h])&&(c&&!c(f,d,e)||(g.push(f),j&&b.push(h)));return g}function xa(a,b,c,d,e,f){return d&&!d[u]&&(d=xa(d)),e&&!e[u]&&(e=xa(e,f)),ia(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||va(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:wa(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=wa(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?I(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=wa(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):G.apply(g,r)})}function ya(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=ta(function(a){return a===b},h,!0),l=ta(function(a){return I(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];i<f;i++)if(c=d.relative[a[i].type])m=[ta(ua(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;e<f;e++)if(d.relative[a[e].type])break;return xa(i>1&&ua(m),i>1&&sa(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(P,"$1"),c,i<e&&ya(a.slice(i,e)),e<f&&ya(a=a.slice(e)),e<f&&sa(a))}m.push(c)}return ua(m)}function za(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,o,q,r=0,s="0",t=f&&[],u=[],v=j,x=f||e&&d.find.TAG("*",k),y=w+=null==v?1:Math.random()||.1,z=x.length;for(k&&(j=g===n||g||k);s!==z&&null!=(l=x[s]);s++){if(e&&l){o=0,g||l.ownerDocument===n||(m(l),h=!p);while(q=a[o++])if(q(l,g||n,h)){i.push(l);break}k&&(w=y)}c&&((l=!q&&l)&&r--,f&&t.push(l))}if(r+=s,c&&s!==r){o=0;while(q=b[o++])q(t,u,g,h);if(f){if(r>0)while(s--)t[s]||u[s]||(u[s]=E.call(i));u=wa(u)}G.apply(i,u),k&&!f&&u.length>0&&r+b.length>1&&ga.uniqueSort(i)}return k&&(w=y,j=v),t};return c?ia(f):f}return h=ga.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=ya(b[c]),f[u]?d.push(f):e.push(f);f=A(a,za(e,d)),f.selector=a}return f},i=ga.select=function(a,b,c,e){var f,i,j,k,l,m="function"==typeof a&&a,n=!e&&g(a=m.selector||a);if(c=c||[],1===n.length){if(i=n[0]=n[0].slice(0),i.length>2&&"ID"===(j=i[0]).type&&9===b.nodeType&&p&&d.relative[i[1].type]){if(b=(d.find.ID(j.matches[0].replace(_,aa),b)||[])[0],!b)return c;m&&(b=b.parentNode),a=a.slice(i.shift().value.length)}f=V.needsContext.test(a)?0:i.length;while(f--){if(j=i[f],d.relative[k=j.type])break;if((l=d.find[k])&&(e=l(j.matches[0].replace(_,aa),$.test(i[0].type)&&qa(b.parentNode)||b))){if(i.splice(f,1),a=e.length&&sa(i),!a)return G.apply(c,e),c;break}}}return(m||h(a,n))(e,b,!p,c,!b||$.test(a)&&qa(b.parentNode)||b),c},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ja(function(a){return 1&a.compareDocumentPosition(n.createElement("fieldset"))}),ja(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ka("type|href|height|width",function(a,b,c){if(!c)return a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ja(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ka("value",function(a,b,c){if(!c&&"input"===a.nodeName.toLowerCase())return a.defaultValue}),ja(function(a){return null==a.getAttribute("disabled")})||ka(J,function(a,b,c){var d;if(!c)return a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),ga}(a);r.find=x,r.expr=x.selectors,r.expr[":"]=r.expr.pseudos,r.uniqueSort=r.unique=x.uniqueSort,r.text=x.getText,r.isXMLDoc=x.isXML,r.contains=x.contains,r.escapeSelector=x.escape;var y=function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&r(a).is(c))break;d.push(a)}return d},z=function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c},A=r.expr.match.needsContext;function B(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()}var C=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,D=/^.[^:#\[\.,]*$/;function E(a,b,c){return r.isFunction(b)?r.grep(a,function(a,d){return!!b.call(a,d,a)!==c}):b.nodeType?r.grep(a,function(a){return a===b!==c}):"string"!=typeof b?r.grep(a,function(a){return i.call(b,a)>-1!==c}):D.test(b)?r.filter(b,a,c):(b=r.filter(b,a),r.grep(a,function(a){return i.call(b,a)>-1!==c&&1===a.nodeType}))}r.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?r.find.matchesSelector(d,a)?[d]:[]:r.find.matches(a,r.grep(b,function(a){return 1===a.nodeType}))},r.fn.extend({find:function(a){var b,c,d=this.length,e=this;if("string"!=typeof a)return this.pushStack(r(a).filter(function(){for(b=0;b<d;b++)if(r.contains(e[b],this))return!0}));for(c=this.pushStack([]),b=0;b<d;b++)r.find(a,e[b],c);return d>1?r.uniqueSort(c):c},filter:function(a){return this.pushStack(E(this,a||[],!1))},not:function(a){return this.pushStack(E(this,a||[],!0))},is:function(a){return!!E(this,"string"==typeof a&&A.test(a)?r(a):a||[],!1).length}});var F,G=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,H=r.fn.init=function(a,b,c){var e,f;if(!a)return this;if(c=c||F,"string"==typeof a){if(e="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:G.exec(a),!e||!e[1]&&b)return!b||b.jquery?(b||c).find(a):this.constructor(b).find(a);if(e[1]){if(b=b instanceof r?b[0]:b,r.merge(this,r.parseHTML(e[1],b&&b.nodeType?b.ownerDocument||b:d,!0)),C.test(e[1])&&r.isPlainObject(b))for(e in b)r.isFunction(this[e])?this[e](b[e]):this.attr(e,b[e]);return this}return f=d.getElementById(e[2]),f&&(this[0]=f,this.length=1),this}return a.nodeType?(this[0]=a,this.length=1,this):r.isFunction(a)?void 0!==c.ready?c.ready(a):a(r):r.makeArray(a,this)};H.prototype=r.fn,F=r(d);var I=/^(?:parents|prev(?:Until|All))/,J={children:!0,contents:!0,next:!0,prev:!0};r.fn.extend({has:function(a){var b=r(a,this),c=b.length;return this.filter(function(){for(var a=0;a<c;a++)if(r.contains(this,b[a]))return!0})},closest:function(a,b){var c,d=0,e=this.length,f=[],g="string"!=typeof a&&r(a);if(!A.test(a))for(;d<e;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&r.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?r.uniqueSort(f):f)},index:function(a){return a?"string"==typeof a?i.call(r(a),this[0]):i.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(r.uniqueSort(r.merge(this.get(),r(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function K(a,b){while((a=a[b])&&1!==a.nodeType);return a}r.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return y(a,"parentNode")},parentsUntil:function(a,b,c){return y(a,"parentNode",c)},next:function(a){return K(a,"nextSibling")},prev:function(a){return K(a,"previousSibling")},nextAll:function(a){return y(a,"nextSibling")},prevAll:function(a){return y(a,"previousSibling")},nextUntil:function(a,b,c){return y(a,"nextSibling",c)},prevUntil:function(a,b,c){return y(a,"previousSibling",c)},siblings:function(a){return z((a.parentNode||{}).firstChild,a)},children:function(a){return z(a.firstChild)},contents:function(a){return B(a,"iframe")?a.contentDocument:(B(a,"template")&&(a=a.content||a),r.merge([],a.childNodes))}},function(a,b){r.fn[a]=function(c,d){var e=r.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=r.filter(d,e)),this.length>1&&(J[a]||r.uniqueSort(e),I.test(a)&&e.reverse()),this.pushStack(e)}});var L=/[^\x20\t\r\n\f]+/g;function M(a){var b={};return r.each(a.match(L)||[],function(a,c){b[c]=!0}),b}r.Callbacks=function(a){a="string"==typeof a?M(a):r.extend({},a);var b,c,d,e,f=[],g=[],h=-1,i=function(){for(e=e||a.once,d=b=!0;g.length;h=-1){c=g.shift();while(++h<f.length)f[h].apply(c[0],c[1])===!1&&a.stopOnFalse&&(h=f.length,c=!1)}a.memory||(c=!1),b=!1,e&&(f=c?[]:"")},j={add:function(){return f&&(c&&!b&&(h=f.length-1,g.push(c)),function d(b){r.each(b,function(b,c){r.isFunction(c)?a.unique&&j.has(c)||f.push(c):c&&c.length&&"string"!==r.type(c)&&d(c)})}(arguments),c&&!b&&i()),this},remove:function(){return r.each(arguments,function(a,b){var c;while((c=r.inArray(b,f,c))>-1)f.splice(c,1),c<=h&&h--}),this},has:function(a){return a?r.inArray(a,f)>-1:f.length>0},empty:function(){return f&&(f=[]),this},disable:function(){return e=g=[],f=c="",this},disabled:function(){return!f},lock:function(){return e=g=[],c||b||(f=c=""),this},locked:function(){return!!e},fireWith:function(a,c){return e||(c=c||[],c=[a,c.slice?c.slice():c],g.push(c),b||i()),this},fire:function(){return j.fireWith(this,arguments),this},fired:function(){return!!d}};return j};function N(a){return a}function O(a){throw a}function P(a,b,c,d){var e;try{a&&r.isFunction(e=a.promise)?e.call(a).done(b).fail(c):a&&r.isFunction(e=a.then)?e.call(a,b,c):b.apply(void 0,[a].slice(d))}catch(a){c.apply(void 0,[a])}}r.extend({Deferred:function(b){var c=[["notify","progress",r.Callbacks("memory"),r.Callbacks("memory"),2],["resolve","done",r.Callbacks("once memory"),r.Callbacks("once memory"),0,"resolved"],["reject","fail",r.Callbacks("once memory"),r.Callbacks("once memory"),1,"rejected"]],d="pending",e={state:function(){return d},always:function(){return f.done(arguments).fail(arguments),this},"catch":function(a){return e.then(null,a)},pipe:function(){var a=arguments;return r.Deferred(function(b){r.each(c,function(c,d){var e=r.isFunction(a[d[4]])&&a[d[4]];f[d[1]](function(){var a=e&&e.apply(this,arguments);a&&r.isFunction(a.promise)?a.promise().progress(b.notify).done(b.resolve).fail(b.reject):b[d[0]+"With"](this,e?[a]:arguments)})}),a=null}).promise()},then:function(b,d,e){var f=0;function g(b,c,d,e){return function(){var h=this,i=arguments,j=function(){var a,j;if(!(b<f)){if(a=d.apply(h,i),a===c.promise())throw new TypeError("Thenable self-resolution");j=a&&("object"==typeof a||"function"==typeof a)&&a.then,r.isFunction(j)?e?j.call(a,g(f,c,N,e),g(f,c,O,e)):(f++,j.call(a,g(f,c,N,e),g(f,c,O,e),g(f,c,N,c.notifyWith))):(d!==N&&(h=void 0,i=[a]),(e||c.resolveWith)(h,i))}},k=e?j:function(){try{j()}catch(a){r.Deferred.exceptionHook&&r.Deferred.exceptionHook(a,k.stackTrace),b+1>=f&&(d!==O&&(h=void 0,i=[a]),c.rejectWith(h,i))}};b?k():(r.Deferred.getStackHook&&(k.stackTrace=r.Deferred.getStackHook()),a.setTimeout(k))}}return r.Deferred(function(a){c[0][3].add(g(0,a,r.isFunction(e)?e:N,a.notifyWith)),c[1][3].add(g(0,a,r.isFunction(b)?b:N)),c[2][3].add(g(0,a,r.isFunction(d)?d:O))}).promise()},promise:function(a){return null!=a?r.extend(a,e):e}},f={};return r.each(c,function(a,b){var g=b[2],h=b[5];e[b[1]]=g.add,h&&g.add(function(){d=h},c[3-a][2].disable,c[0][2].lock),g.add(b[3].fire),f[b[0]]=function(){return f[b[0]+"With"](this===f?void 0:this,arguments),this},f[b[0]+"With"]=g.fireWith}),e.promise(f),b&&b.call(f,f),f},when:function(a){var b=arguments.length,c=b,d=Array(c),e=f.call(arguments),g=r.Deferred(),h=function(a){return function(c){d[a]=this,e[a]=arguments.length>1?f.call(arguments):c,--b||g.resolveWith(d,e)}};if(b<=1&&(P(a,g.done(h(c)).resolve,g.reject,!b),"pending"===g.state()||r.isFunction(e[c]&&e[c].then)))return g.then();while(c--)P(e[c],h(c),g.reject);return g.promise()}});var Q=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;r.Deferred.exceptionHook=function(b,c){a.console&&a.console.warn&&b&&Q.test(b.name)&&a.console.warn("jQuery.Deferred exception: "+b.message,b.stack,c)},r.readyException=function(b){a.setTimeout(function(){throw b})};var R=r.Deferred();r.fn.ready=function(a){return R.then(a)["catch"](function(a){r.readyException(a)}),this},r.extend({isReady:!1,readyWait:1,ready:function(a){(a===!0?--r.readyWait:r.isReady)||(r.isReady=!0,a!==!0&&--r.readyWait>0||R.resolveWith(d,[r]))}}),r.ready.then=R.then;function S(){d.removeEventListener("DOMContentLoaded",S),
a.removeEventListener("load",S),r.ready()}"complete"===d.readyState||"loading"!==d.readyState&&!d.documentElement.doScroll?a.setTimeout(r.ready):(d.addEventListener("DOMContentLoaded",S),a.addEventListener("load",S));var T=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===r.type(c)){e=!0;for(h in c)T(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,r.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(r(a),c)})),b))for(;h<i;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},U=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function V(){this.expando=r.expando+V.uid++}V.uid=1,V.prototype={cache:function(a){var b=a[this.expando];return b||(b={},U(a)&&(a.nodeType?a[this.expando]=b:Object.defineProperty(a,this.expando,{value:b,configurable:!0}))),b},set:function(a,b,c){var d,e=this.cache(a);if("string"==typeof b)e[r.camelCase(b)]=c;else for(d in b)e[r.camelCase(d)]=b[d];return e},get:function(a,b){return void 0===b?this.cache(a):a[this.expando]&&a[this.expando][r.camelCase(b)]},access:function(a,b,c){return void 0===b||b&&"string"==typeof b&&void 0===c?this.get(a,b):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d=a[this.expando];if(void 0!==d){if(void 0!==b){Array.isArray(b)?b=b.map(r.camelCase):(b=r.camelCase(b),b=b in d?[b]:b.match(L)||[]),c=b.length;while(c--)delete d[b[c]]}(void 0===b||r.isEmptyObject(d))&&(a.nodeType?a[this.expando]=void 0:delete a[this.expando])}},hasData:function(a){var b=a[this.expando];return void 0!==b&&!r.isEmptyObject(b)}};var W=new V,X=new V,Y=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Z=/[A-Z]/g;function $(a){return"true"===a||"false"!==a&&("null"===a?null:a===+a+""?+a:Y.test(a)?JSON.parse(a):a)}function _(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(Z,"-$&").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c=$(c)}catch(e){}X.set(a,b,c)}else c=void 0;return c}r.extend({hasData:function(a){return X.hasData(a)||W.hasData(a)},data:function(a,b,c){return X.access(a,b,c)},removeData:function(a,b){X.remove(a,b)},_data:function(a,b,c){return W.access(a,b,c)},_removeData:function(a,b){W.remove(a,b)}}),r.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=X.get(f),1===f.nodeType&&!W.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=r.camelCase(d.slice(5)),_(f,d,e[d])));W.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){X.set(this,a)}):T(this,function(b){var c;if(f&&void 0===b){if(c=X.get(f,a),void 0!==c)return c;if(c=_(f,a),void 0!==c)return c}else this.each(function(){X.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){X.remove(this,a)})}}),r.extend({queue:function(a,b,c){var d;if(a)return b=(b||"fx")+"queue",d=W.get(a,b),c&&(!d||Array.isArray(c)?d=W.access(a,b,r.makeArray(c)):d.push(c)),d||[]},dequeue:function(a,b){b=b||"fx";var c=r.queue(a,b),d=c.length,e=c.shift(),f=r._queueHooks(a,b),g=function(){r.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return W.get(a,c)||W.access(a,c,{empty:r.Callbacks("once memory").add(function(){W.remove(a,[b+"queue",c])})})}}),r.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?r.queue(this[0],a):void 0===b?this:this.each(function(){var c=r.queue(this,a,b);r._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&r.dequeue(this,a)})},dequeue:function(a){return this.each(function(){r.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=r.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=W.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var aa=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,ba=new RegExp("^(?:([+-])=|)("+aa+")([a-z%]*)$","i"),ca=["Top","Right","Bottom","Left"],da=function(a,b){return a=b||a,"none"===a.style.display||""===a.style.display&&r.contains(a.ownerDocument,a)&&"none"===r.css(a,"display")},ea=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};function fa(a,b,c,d){var e,f=1,g=20,h=d?function(){return d.cur()}:function(){return r.css(a,b,"")},i=h(),j=c&&c[3]||(r.cssNumber[b]?"":"px"),k=(r.cssNumber[b]||"px"!==j&&+i)&&ba.exec(r.css(a,b));if(k&&k[3]!==j){j=j||k[3],c=c||[],k=+i||1;do f=f||".5",k/=f,r.style(a,b,k+j);while(f!==(f=h()/i)&&1!==f&&--g)}return c&&(k=+k||+i||0,e=c[1]?k+(c[1]+1)*c[2]:+c[2],d&&(d.unit=j,d.start=k,d.end=e)),e}var ga={};function ha(a){var b,c=a.ownerDocument,d=a.nodeName,e=ga[d];return e?e:(b=c.body.appendChild(c.createElement(d)),e=r.css(b,"display"),b.parentNode.removeChild(b),"none"===e&&(e="block"),ga[d]=e,e)}function ia(a,b){for(var c,d,e=[],f=0,g=a.length;f<g;f++)d=a[f],d.style&&(c=d.style.display,b?("none"===c&&(e[f]=W.get(d,"display")||null,e[f]||(d.style.display="")),""===d.style.display&&da(d)&&(e[f]=ha(d))):"none"!==c&&(e[f]="none",W.set(d,"display",c)));for(f=0;f<g;f++)null!=e[f]&&(a[f].style.display=e[f]);return a}r.fn.extend({show:function(){return ia(this,!0)},hide:function(){return ia(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){da(this)?r(this).show():r(this).hide()})}});var ja=/^(?:checkbox|radio)$/i,ka=/<([a-z][^\/\0>\x20\t\r\n\f]+)/i,la=/^$|\/(?:java|ecma)script/i,ma={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ma.optgroup=ma.option,ma.tbody=ma.tfoot=ma.colgroup=ma.caption=ma.thead,ma.th=ma.td;function na(a,b){var c;return c="undefined"!=typeof a.getElementsByTagName?a.getElementsByTagName(b||"*"):"undefined"!=typeof a.querySelectorAll?a.querySelectorAll(b||"*"):[],void 0===b||b&&B(a,b)?r.merge([a],c):c}function oa(a,b){for(var c=0,d=a.length;c<d;c++)W.set(a[c],"globalEval",!b||W.get(b[c],"globalEval"))}var pa=/<|&#?\w+;/;function qa(a,b,c,d,e){for(var f,g,h,i,j,k,l=b.createDocumentFragment(),m=[],n=0,o=a.length;n<o;n++)if(f=a[n],f||0===f)if("object"===r.type(f))r.merge(m,f.nodeType?[f]:f);else if(pa.test(f)){g=g||l.appendChild(b.createElement("div")),h=(ka.exec(f)||["",""])[1].toLowerCase(),i=ma[h]||ma._default,g.innerHTML=i[1]+r.htmlPrefilter(f)+i[2],k=i[0];while(k--)g=g.lastChild;r.merge(m,g.childNodes),g=l.firstChild,g.textContent=""}else m.push(b.createTextNode(f));l.textContent="",n=0;while(f=m[n++])if(d&&r.inArray(f,d)>-1)e&&e.push(f);else if(j=r.contains(f.ownerDocument,f),g=na(l.appendChild(f),"script"),j&&oa(g),c){k=0;while(f=g[k++])la.test(f.type||"")&&c.push(f)}return l}!function(){var a=d.createDocumentFragment(),b=a.appendChild(d.createElement("div")),c=d.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),o.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",o.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var ra=d.documentElement,sa=/^key/,ta=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,ua=/^([^.]*)(?:\.(.+)|)/;function va(){return!0}function wa(){return!1}function xa(){try{return d.activeElement}catch(a){}}function ya(a,b,c,d,e,f){var g,h;if("object"==typeof b){"string"!=typeof c&&(d=d||c,c=void 0);for(h in b)ya(a,h,c,d,b[h],f);return a}if(null==d&&null==e?(e=c,d=c=void 0):null==e&&("string"==typeof c?(e=d,d=void 0):(e=d,d=c,c=void 0)),e===!1)e=wa;else if(!e)return a;return 1===f&&(g=e,e=function(a){return r().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=r.guid++)),a.each(function(){r.event.add(this,b,e,d,c)})}r.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=W.get(a);if(q){c.handler&&(f=c,c=f.handler,e=f.selector),e&&r.find.matchesSelector(ra,e),c.guid||(c.guid=r.guid++),(i=q.events)||(i=q.events={}),(g=q.handle)||(g=q.handle=function(b){return"undefined"!=typeof r&&r.event.triggered!==b.type?r.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(L)||[""],j=b.length;while(j--)h=ua.exec(b[j])||[],n=p=h[1],o=(h[2]||"").split(".").sort(),n&&(l=r.event.special[n]||{},n=(e?l.delegateType:l.bindType)||n,l=r.event.special[n]||{},k=r.extend({type:n,origType:p,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&r.expr.match.needsContext.test(e),namespace:o.join(".")},f),(m=i[n])||(m=i[n]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,o,g)!==!1||a.addEventListener&&a.addEventListener(n,g)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),r.event.global[n]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=W.hasData(a)&&W.get(a);if(q&&(i=q.events)){b=(b||"").match(L)||[""],j=b.length;while(j--)if(h=ua.exec(b[j])||[],n=p=h[1],o=(h[2]||"").split(".").sort(),n){l=r.event.special[n]||{},n=(d?l.delegateType:l.bindType)||n,m=i[n]||[],h=h[2]&&new RegExp("(^|\\.)"+o.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&p!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,o,q.handle)!==!1||r.removeEvent(a,n,q.handle),delete i[n])}else for(n in i)r.event.remove(a,n+b[j],c,d,!0);r.isEmptyObject(i)&&W.remove(a,"handle events")}},dispatch:function(a){var b=r.event.fix(a),c,d,e,f,g,h,i=new Array(arguments.length),j=(W.get(this,"events")||{})[b.type]||[],k=r.event.special[b.type]||{};for(i[0]=b,c=1;c<arguments.length;c++)i[c]=arguments[c];if(b.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,b)!==!1){h=r.event.handlers.call(this,b,j),c=0;while((f=h[c++])&&!b.isPropagationStopped()){b.currentTarget=f.elem,d=0;while((g=f.handlers[d++])&&!b.isImmediatePropagationStopped())b.rnamespace&&!b.rnamespace.test(g.namespace)||(b.handleObj=g,b.data=g.data,e=((r.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(b.result=e)===!1&&(b.preventDefault(),b.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,b),b.result}},handlers:function(a,b){var c,d,e,f,g,h=[],i=b.delegateCount,j=a.target;if(i&&j.nodeType&&!("click"===a.type&&a.button>=1))for(;j!==this;j=j.parentNode||this)if(1===j.nodeType&&("click"!==a.type||j.disabled!==!0)){for(f=[],g={},c=0;c<i;c++)d=b[c],e=d.selector+" ",void 0===g[e]&&(g[e]=d.needsContext?r(e,this).index(j)>-1:r.find(e,this,null,[j]).length),g[e]&&f.push(d);f.length&&h.push({elem:j,handlers:f})}return j=this,i<b.length&&h.push({elem:j,handlers:b.slice(i)}),h},addProp:function(a,b){Object.defineProperty(r.Event.prototype,a,{enumerable:!0,configurable:!0,get:r.isFunction(b)?function(){if(this.originalEvent)return b(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[a]},set:function(b){Object.defineProperty(this,a,{enumerable:!0,configurable:!0,writable:!0,value:b})}})},fix:function(a){return a[r.expando]?a:new r.Event(a)},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==xa()&&this.focus)return this.focus(),!1},delegateType:"focusin"},blur:{trigger:function(){if(this===xa()&&this.blur)return this.blur(),!1},delegateType:"focusout"},click:{trigger:function(){if("checkbox"===this.type&&this.click&&B(this,"input"))return this.click(),!1},_default:function(a){return B(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}}},r.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c)},r.Event=function(a,b){return this instanceof r.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?va:wa,this.target=a.target&&3===a.target.nodeType?a.target.parentNode:a.target,this.currentTarget=a.currentTarget,this.relatedTarget=a.relatedTarget):this.type=a,b&&r.extend(this,b),this.timeStamp=a&&a.timeStamp||r.now(),void(this[r.expando]=!0)):new r.Event(a,b)},r.Event.prototype={constructor:r.Event,isDefaultPrevented:wa,isPropagationStopped:wa,isImmediatePropagationStopped:wa,isSimulated:!1,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=va,a&&!this.isSimulated&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=va,a&&!this.isSimulated&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=va,a&&!this.isSimulated&&a.stopImmediatePropagation(),this.stopPropagation()}},r.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(a){var b=a.button;return null==a.which&&sa.test(a.type)?null!=a.charCode?a.charCode:a.keyCode:!a.which&&void 0!==b&&ta.test(a.type)?1&b?1:2&b?3:4&b?2:0:a.which}},r.event.addProp),r.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){r.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return e&&(e===d||r.contains(d,e))||(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),r.fn.extend({on:function(a,b,c,d){return ya(this,a,b,c,d)},one:function(a,b,c,d){return ya(this,a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,r(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return b!==!1&&"function"!=typeof b||(c=b,b=void 0),c===!1&&(c=wa),this.each(function(){r.event.remove(this,a,c,b)})}});var za=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,Aa=/<script|<style|<link/i,Ba=/checked\s*(?:[^=]|=\s*.checked.)/i,Ca=/^true\/(.*)/,Da=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function Ea(a,b){return B(a,"table")&&B(11!==b.nodeType?b:b.firstChild,"tr")?r(">tbody",a)[0]||a:a}function Fa(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function Ga(a){var b=Ca.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function Ha(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(W.hasData(a)&&(f=W.access(a),g=W.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;c<d;c++)r.event.add(b,e,j[e][c])}X.hasData(a)&&(h=X.access(a),i=r.extend({},h),X.set(b,i))}}function Ia(a,b){var c=b.nodeName.toLowerCase();"input"===c&&ja.test(a.type)?b.checked=a.checked:"input"!==c&&"textarea"!==c||(b.defaultValue=a.defaultValue)}function Ja(a,b,c,d){b=g.apply([],b);var e,f,h,i,j,k,l=0,m=a.length,n=m-1,q=b[0],s=r.isFunction(q);if(s||m>1&&"string"==typeof q&&!o.checkClone&&Ba.test(q))return a.each(function(e){var f=a.eq(e);s&&(b[0]=q.call(this,e,f.html())),Ja(f,b,c,d)});if(m&&(e=qa(b,a[0].ownerDocument,!1,a,d),f=e.firstChild,1===e.childNodes.length&&(e=f),f||d)){for(h=r.map(na(e,"script"),Fa),i=h.length;l<m;l++)j=e,l!==n&&(j=r.clone(j,!0,!0),i&&r.merge(h,na(j,"script"))),c.call(a[l],j,l);if(i)for(k=h[h.length-1].ownerDocument,r.map(h,Ga),l=0;l<i;l++)j=h[l],la.test(j.type||"")&&!W.access(j,"globalEval")&&r.contains(k,j)&&(j.src?r._evalUrl&&r._evalUrl(j.src):p(j.textContent.replace(Da,""),k))}return a}function Ka(a,b,c){for(var d,e=b?r.filter(b,a):a,f=0;null!=(d=e[f]);f++)c||1!==d.nodeType||r.cleanData(na(d)),d.parentNode&&(c&&r.contains(d.ownerDocument,d)&&oa(na(d,"script")),d.parentNode.removeChild(d));return a}r.extend({htmlPrefilter:function(a){return a.replace(za,"<$1></$2>")},clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=r.contains(a.ownerDocument,a);if(!(o.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||r.isXMLDoc(a)))for(g=na(h),f=na(a),d=0,e=f.length;d<e;d++)Ia(f[d],g[d]);if(b)if(c)for(f=f||na(a),g=g||na(h),d=0,e=f.length;d<e;d++)Ha(f[d],g[d]);else Ha(a,h);return g=na(h,"script"),g.length>0&&oa(g,!i&&na(a,"script")),h},cleanData:function(a){for(var b,c,d,e=r.event.special,f=0;void 0!==(c=a[f]);f++)if(U(c)){if(b=c[W.expando]){if(b.events)for(d in b.events)e[d]?r.event.remove(c,d):r.removeEvent(c,d,b.handle);c[W.expando]=void 0}c[X.expando]&&(c[X.expando]=void 0)}}}),r.fn.extend({detach:function(a){return Ka(this,a,!0)},remove:function(a){return Ka(this,a)},text:function(a){return T(this,function(a){return void 0===a?r.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=a)})},null,a,arguments.length)},append:function(){return Ja(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Ea(this,a);b.appendChild(a)}})},prepend:function(){return Ja(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Ea(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return Ja(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return Ja(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(r.cleanData(na(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null!=a&&a,b=null==b?a:b,this.map(function(){return r.clone(this,a,b)})},html:function(a){return T(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!Aa.test(a)&&!ma[(ka.exec(a)||["",""])[1].toLowerCase()]){a=r.htmlPrefilter(a);try{for(;c<d;c++)b=this[c]||{},1===b.nodeType&&(r.cleanData(na(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=[];return Ja(this,arguments,function(b){var c=this.parentNode;r.inArray(this,a)<0&&(r.cleanData(na(this)),c&&c.replaceChild(b,this))},a)}}),r.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){r.fn[a]=function(a){for(var c,d=[],e=r(a),f=e.length-1,g=0;g<=f;g++)c=g===f?this:this.clone(!0),r(e[g])[b](c),h.apply(d,c.get());return this.pushStack(d)}});var La=/^margin/,Ma=new RegExp("^("+aa+")(?!px)[a-z%]+$","i"),Na=function(b){var c=b.ownerDocument.defaultView;return c&&c.opener||(c=a),c.getComputedStyle(b)};!function(){function b(){if(i){i.style.cssText="box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",i.innerHTML="",ra.appendChild(h);var b=a.getComputedStyle(i);c="1%"!==b.top,g="2px"===b.marginLeft,e="4px"===b.width,i.style.marginRight="50%",f="4px"===b.marginRight,ra.removeChild(h),i=null}}var c,e,f,g,h=d.createElement("div"),i=d.createElement("div");i.style&&(i.style.backgroundClip="content-box",i.cloneNode(!0).style.backgroundClip="",o.clearCloneStyle="content-box"===i.style.backgroundClip,h.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",h.appendChild(i),r.extend(o,{pixelPosition:function(){return b(),c},boxSizingReliable:function(){return b(),e},pixelMarginRight:function(){return b(),f},reliableMarginLeft:function(){return b(),g}}))}();function Oa(a,b,c){var d,e,f,g,h=a.style;return c=c||Na(a),c&&(g=c.getPropertyValue(b)||c[b],""!==g||r.contains(a.ownerDocument,a)||(g=r.style(a,b)),!o.pixelMarginRight()&&Ma.test(g)&&La.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function Pa(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}var Qa=/^(none|table(?!-c[ea]).+)/,Ra=/^--/,Sa={position:"absolute",visibility:"hidden",display:"block"},Ta={letterSpacing:"0",fontWeight:"400"},Ua=["Webkit","Moz","ms"],Va=d.createElement("div").style;function Wa(a){if(a in Va)return a;var b=a[0].toUpperCase()+a.slice(1),c=Ua.length;while(c--)if(a=Ua[c]+b,a in Va)return a}function Xa(a){var b=r.cssProps[a];return b||(b=r.cssProps[a]=Wa(a)||a),b}function Ya(a,b,c){var d=ba.exec(b);return d?Math.max(0,d[2]-(c||0))+(d[3]||"px"):b}function Za(a,b,c,d,e){var f,g=0;for(f=c===(d?"border":"content")?4:"width"===b?1:0;f<4;f+=2)"margin"===c&&(g+=r.css(a,c+ca[f],!0,e)),d?("content"===c&&(g-=r.css(a,"padding"+ca[f],!0,e)),"margin"!==c&&(g-=r.css(a,"border"+ca[f]+"Width",!0,e))):(g+=r.css(a,"padding"+ca[f],!0,e),"padding"!==c&&(g+=r.css(a,"border"+ca[f]+"Width",!0,e)));return g}function $a(a,b,c){var d,e=Na(a),f=Oa(a,b,e),g="border-box"===r.css(a,"boxSizing",!1,e);return Ma.test(f)?f:(d=g&&(o.boxSizingReliable()||f===a.style[b]),"auto"===f&&(f=a["offset"+b[0].toUpperCase()+b.slice(1)]),f=parseFloat(f)||0,f+Za(a,b,c||(g?"border":"content"),d,e)+"px")}r.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Oa(a,"opacity");return""===c?"1":c}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=r.camelCase(b),i=Ra.test(b),j=a.style;return i||(b=Xa(h)),g=r.cssHooks[b]||r.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:j[b]:(f=typeof c,"string"===f&&(e=ba.exec(c))&&e[1]&&(c=fa(a,b,e),f="number"),null!=c&&c===c&&("number"===f&&(c+=e&&e[3]||(r.cssNumber[h]?"":"px")),o.clearCloneStyle||""!==c||0!==b.indexOf("background")||(j[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i?j.setProperty(b,c):j[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=r.camelCase(b),i=Ra.test(b);return i||(b=Xa(h)),g=r.cssHooks[b]||r.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=Oa(a,b,d)),"normal"===e&&b in Ta&&(e=Ta[b]),""===c||c?(f=parseFloat(e),c===!0||isFinite(f)?f||0:e):e}}),r.each(["height","width"],function(a,b){r.cssHooks[b]={get:function(a,c,d){if(c)return!Qa.test(r.css(a,"display"))||a.getClientRects().length&&a.getBoundingClientRect().width?$a(a,b,d):ea(a,Sa,function(){return $a(a,b,d)})},set:function(a,c,d){var e,f=d&&Na(a),g=d&&Za(a,b,d,"border-box"===r.css(a,"boxSizing",!1,f),f);return g&&(e=ba.exec(c))&&"px"!==(e[3]||"px")&&(a.style[b]=c,c=r.css(a,b)),Ya(a,c,g)}}}),r.cssHooks.marginLeft=Pa(o.reliableMarginLeft,function(a,b){if(b)return(parseFloat(Oa(a,"marginLeft"))||a.getBoundingClientRect().left-ea(a,{marginLeft:0},function(){return a.getBoundingClientRect().left}))+"px"}),r.each({margin:"",padding:"",border:"Width"},function(a,b){r.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];d<4;d++)e[a+ca[d]+b]=f[d]||f[d-2]||f[0];return e}},La.test(a)||(r.cssHooks[a+b].set=Ya)}),r.fn.extend({css:function(a,b){return T(this,function(a,b,c){var d,e,f={},g=0;if(Array.isArray(b)){for(d=Na(a),e=b.length;g<e;g++)f[b[g]]=r.css(a,b[g],!1,d);return f}return void 0!==c?r.style(a,b,c):r.css(a,b)},a,b,arguments.length>1)}});function _a(a,b,c,d,e){return new _a.prototype.init(a,b,c,d,e)}r.Tween=_a,_a.prototype={constructor:_a,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||r.easing._default,this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(r.cssNumber[c]?"":"px")},cur:function(){var a=_a.propHooks[this.prop];return a&&a.get?a.get(this):_a.propHooks._default.get(this)},run:function(a){var b,c=_a.propHooks[this.prop];return this.options.duration?this.pos=b=r.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):_a.propHooks._default.set(this),this}},_a.prototype.init.prototype=_a.prototype,_a.propHooks={_default:{get:function(a){var b;return 1!==a.elem.nodeType||null!=a.elem[a.prop]&&null==a.elem.style[a.prop]?a.elem[a.prop]:(b=r.css(a.elem,a.prop,""),b&&"auto"!==b?b:0)},set:function(a){r.fx.step[a.prop]?r.fx.step[a.prop](a):1!==a.elem.nodeType||null==a.elem.style[r.cssProps[a.prop]]&&!r.cssHooks[a.prop]?a.elem[a.prop]=a.now:r.style(a.elem,a.prop,a.now+a.unit)}}},_a.propHooks.scrollTop=_a.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},r.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2},_default:"swing"},r.fx=_a.prototype.init,r.fx.step={};var ab,bb,cb=/^(?:toggle|show|hide)$/,db=/queueHooks$/;function eb(){bb&&(d.hidden===!1&&a.requestAnimationFrame?a.requestAnimationFrame(eb):a.setTimeout(eb,r.fx.interval),r.fx.tick())}function fb(){return a.setTimeout(function(){ab=void 0}),ab=r.now()}function gb(a,b){var c,d=0,e={height:a};for(b=b?1:0;d<4;d+=2-b)c=ca[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function hb(a,b,c){for(var d,e=(kb.tweeners[b]||[]).concat(kb.tweeners["*"]),f=0,g=e.length;f<g;f++)if(d=e[f].call(c,b,a))return d}function ib(a,b,c){var d,e,f,g,h,i,j,k,l="width"in b||"height"in b,m=this,n={},o=a.style,p=a.nodeType&&da(a),q=W.get(a,"fxshow");c.queue||(g=r._queueHooks(a,"fx"),null==g.unqueued&&(g.unqueued=0,h=g.empty.fire,g.empty.fire=function(){g.unqueued||h()}),g.unqueued++,m.always(function(){m.always(function(){g.unqueued--,r.queue(a,"fx").length||g.empty.fire()})}));for(d in b)if(e=b[d],cb.test(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}n[d]=q&&q[d]||r.style(a,d)}if(i=!r.isEmptyObject(b),i||!r.isEmptyObject(n)){l&&1===a.nodeType&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=q&&q.display,null==j&&(j=W.get(a,"display")),k=r.css(a,"display"),"none"===k&&(j?k=j:(ia([a],!0),j=a.style.display||j,k=r.css(a,"display"),ia([a]))),("inline"===k||"inline-block"===k&&null!=j)&&"none"===r.css(a,"float")&&(i||(m.done(function(){o.display=j}),null==j&&(k=o.display,j="none"===k?"":k)),o.display="inline-block")),c.overflow&&(o.overflow="hidden",m.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]})),i=!1;for(d in n)i||(q?"hidden"in q&&(p=q.hidden):q=W.access(a,"fxshow",{display:j}),f&&(q.hidden=!p),p&&ia([a],!0),m.done(function(){p||ia([a]),W.remove(a,"fxshow");for(d in n)r.style(a,d,n[d])})),i=hb(p?q[d]:0,d,m),d in q||(q[d]=i.start,p&&(i.end=i.start,i.start=0))}}function jb(a,b){var c,d,e,f,g;for(c in a)if(d=r.camelCase(c),e=b[d],f=a[c],Array.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=r.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function kb(a,b,c){var d,e,f=0,g=kb.prefilters.length,h=r.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=ab||fb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;g<i;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),f<1&&i?c:(i||h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:r.extend({},b),opts:r.extend(!0,{specialEasing:{},easing:r.easing._default},c),originalProperties:b,originalOptions:c,startTime:ab||fb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=r.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;c<d;c++)j.tweens[c].run(1);return b?(h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j,b])):h.rejectWith(a,[j,b]),this}}),k=j.props;for(jb(k,j.opts.specialEasing);f<g;f++)if(d=kb.prefilters[f].call(j,a,k,j.opts))return r.isFunction(d.stop)&&(r._queueHooks(j.elem,j.opts.queue).stop=r.proxy(d.stop,d)),d;return r.map(k,hb,j),r.isFunction(j.opts.start)&&j.opts.start.call(a,j),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always),r.fx.timer(r.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j}r.Animation=r.extend(kb,{tweeners:{"*":[function(a,b){var c=this.createTween(a,b);return fa(c.elem,a,ba.exec(b),c),c}]},tweener:function(a,b){r.isFunction(a)?(b=a,a=["*"]):a=a.match(L);for(var c,d=0,e=a.length;d<e;d++)c=a[d],kb.tweeners[c]=kb.tweeners[c]||[],kb.tweeners[c].unshift(b)},prefilters:[ib],prefilter:function(a,b){b?kb.prefilters.unshift(a):kb.prefilters.push(a)}}),r.speed=function(a,b,c){var d=a&&"object"==typeof a?r.extend({},a):{complete:c||!c&&b||r.isFunction(a)&&a,duration:a,easing:c&&b||b&&!r.isFunction(b)&&b};return r.fx.off?d.duration=0:"number"!=typeof d.duration&&(d.duration in r.fx.speeds?d.duration=r.fx.speeds[d.duration]:d.duration=r.fx.speeds._default),null!=d.queue&&d.queue!==!0||(d.queue="fx"),d.old=d.complete,d.complete=function(){r.isFunction(d.old)&&d.old.call(this),d.queue&&r.dequeue(this,d.queue)},d},r.fn.extend({fadeTo:function(a,b,c,d){return this.filter(da).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=r.isEmptyObject(a),f=r.speed(b,c,d),g=function(){var b=kb(this,r.extend({},a),f);(e||W.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=r.timers,g=W.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&db.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));!b&&c||r.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=W.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=r.timers,g=d?d.length:0;for(c.finish=!0,r.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;b<g;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),r.each(["toggle","show","hide"],function(a,b){var c=r.fn[b];r.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(gb(b,!0),a,d,e)}}),r.each({slideDown:gb("show"),slideUp:gb("hide"),slideToggle:gb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){r.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),r.timers=[],r.fx.tick=function(){var a,b=0,c=r.timers;for(ab=r.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||r.fx.stop(),ab=void 0},r.fx.timer=function(a){r.timers.push(a),r.fx.start()},r.fx.interval=13,r.fx.start=function(){bb||(bb=!0,eb())},r.fx.stop=function(){bb=null},r.fx.speeds={slow:600,fast:200,_default:400},r.fn.delay=function(b,c){return b=r.fx?r.fx.speeds[b]||b:b,c=c||"fx",this.queue(c,function(c,d){var e=a.setTimeout(c,b);d.stop=function(){a.clearTimeout(e)}})},function(){var a=d.createElement("input"),b=d.createElement("select"),c=b.appendChild(d.createElement("option"));a.type="checkbox",o.checkOn=""!==a.value,o.optSelected=c.selected,a=d.createElement("input"),a.value="t",a.type="radio",o.radioValue="t"===a.value}();var lb,mb=r.expr.attrHandle;r.fn.extend({attr:function(a,b){return T(this,r.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){r.removeAttr(this,a)})}}),r.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return"undefined"==typeof a.getAttribute?r.prop(a,b,c):(1===f&&r.isXMLDoc(a)||(e=r.attrHooks[b.toLowerCase()]||(r.expr.match.bool.test(b)?lb:void 0)),void 0!==c?null===c?void r.removeAttr(a,b):e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:(a.setAttribute(b,c+""),c):e&&"get"in e&&null!==(d=e.get(a,b))?d:(d=r.find.attr(a,b),
null==d?void 0:d))},attrHooks:{type:{set:function(a,b){if(!o.radioValue&&"radio"===b&&B(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}},removeAttr:function(a,b){var c,d=0,e=b&&b.match(L);if(e&&1===a.nodeType)while(c=e[d++])a.removeAttribute(c)}}),lb={set:function(a,b,c){return b===!1?r.removeAttr(a,c):a.setAttribute(c,c),c}},r.each(r.expr.match.bool.source.match(/\w+/g),function(a,b){var c=mb[b]||r.find.attr;mb[b]=function(a,b,d){var e,f,g=b.toLowerCase();return d||(f=mb[g],mb[g]=e,e=null!=c(a,b,d)?g:null,mb[g]=f),e}});var nb=/^(?:input|select|textarea|button)$/i,ob=/^(?:a|area)$/i;r.fn.extend({prop:function(a,b){return T(this,r.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[r.propFix[a]||a]})}}),r.extend({prop:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return 1===f&&r.isXMLDoc(a)||(b=r.propFix[b]||b,e=r.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=r.find.attr(a,"tabindex");return b?parseInt(b,10):nb.test(a.nodeName)||ob.test(a.nodeName)&&a.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),o.optSelected||(r.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null},set:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex)}}),r.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){r.propFix[this.toLowerCase()]=this});function pb(a){var b=a.match(L)||[];return b.join(" ")}function qb(a){return a.getAttribute&&a.getAttribute("class")||""}r.fn.extend({addClass:function(a){var b,c,d,e,f,g,h,i=0;if(r.isFunction(a))return this.each(function(b){r(this).addClass(a.call(this,b,qb(this)))});if("string"==typeof a&&a){b=a.match(L)||[];while(c=this[i++])if(e=qb(c),d=1===c.nodeType&&" "+pb(e)+" "){g=0;while(f=b[g++])d.indexOf(" "+f+" ")<0&&(d+=f+" ");h=pb(d),e!==h&&c.setAttribute("class",h)}}return this},removeClass:function(a){var b,c,d,e,f,g,h,i=0;if(r.isFunction(a))return this.each(function(b){r(this).removeClass(a.call(this,b,qb(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof a&&a){b=a.match(L)||[];while(c=this[i++])if(e=qb(c),d=1===c.nodeType&&" "+pb(e)+" "){g=0;while(f=b[g++])while(d.indexOf(" "+f+" ")>-1)d=d.replace(" "+f+" "," ");h=pb(d),e!==h&&c.setAttribute("class",h)}}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):r.isFunction(a)?this.each(function(c){r(this).toggleClass(a.call(this,c,qb(this),b),b)}):this.each(function(){var b,d,e,f;if("string"===c){d=0,e=r(this),f=a.match(L)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else void 0!==a&&"boolean"!==c||(b=qb(this),b&&W.set(this,"__className__",b),this.setAttribute&&this.setAttribute("class",b||a===!1?"":W.get(this,"__className__")||""))})},hasClass:function(a){var b,c,d=0;b=" "+a+" ";while(c=this[d++])if(1===c.nodeType&&(" "+pb(qb(c))+" ").indexOf(b)>-1)return!0;return!1}});var rb=/\r/g;r.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=r.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,r(this).val()):a,null==e?e="":"number"==typeof e?e+="":Array.isArray(e)&&(e=r.map(e,function(a){return null==a?"":a+""})),b=r.valHooks[this.type]||r.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=r.valHooks[e.type]||r.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(rb,""):null==c?"":c)}}}),r.extend({valHooks:{option:{get:function(a){var b=r.find.attr(a,"value");return null!=b?b:pb(r.text(a))}},select:{get:function(a){var b,c,d,e=a.options,f=a.selectedIndex,g="select-one"===a.type,h=g?null:[],i=g?f+1:e.length;for(d=f<0?i:g?f:0;d<i;d++)if(c=e[d],(c.selected||d===f)&&!c.disabled&&(!c.parentNode.disabled||!B(c.parentNode,"optgroup"))){if(b=r(c).val(),g)return b;h.push(b)}return h},set:function(a,b){var c,d,e=a.options,f=r.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=r.inArray(r.valHooks.option.get(d),f)>-1)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),r.each(["radio","checkbox"],function(){r.valHooks[this]={set:function(a,b){if(Array.isArray(b))return a.checked=r.inArray(r(a).val(),b)>-1}},o.checkOn||(r.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var sb=/^(?:focusinfocus|focusoutblur)$/;r.extend(r.event,{trigger:function(b,c,e,f){var g,h,i,j,k,m,n,o=[e||d],p=l.call(b,"type")?b.type:b,q=l.call(b,"namespace")?b.namespace.split("."):[];if(h=i=e=e||d,3!==e.nodeType&&8!==e.nodeType&&!sb.test(p+r.event.triggered)&&(p.indexOf(".")>-1&&(q=p.split("."),p=q.shift(),q.sort()),k=p.indexOf(":")<0&&"on"+p,b=b[r.expando]?b:new r.Event(p,"object"==typeof b&&b),b.isTrigger=f?2:3,b.namespace=q.join("."),b.rnamespace=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=e),c=null==c?[b]:r.makeArray(c,[b]),n=r.event.special[p]||{},f||!n.trigger||n.trigger.apply(e,c)!==!1)){if(!f&&!n.noBubble&&!r.isWindow(e)){for(j=n.delegateType||p,sb.test(j+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),i=h;i===(e.ownerDocument||d)&&o.push(i.defaultView||i.parentWindow||a)}g=0;while((h=o[g++])&&!b.isPropagationStopped())b.type=g>1?j:n.bindType||p,m=(W.get(h,"events")||{})[b.type]&&W.get(h,"handle"),m&&m.apply(h,c),m=k&&h[k],m&&m.apply&&U(h)&&(b.result=m.apply(h,c),b.result===!1&&b.preventDefault());return b.type=p,f||b.isDefaultPrevented()||n._default&&n._default.apply(o.pop(),c)!==!1||!U(e)||k&&r.isFunction(e[p])&&!r.isWindow(e)&&(i=e[k],i&&(e[k]=null),r.event.triggered=p,e[p](),r.event.triggered=void 0,i&&(e[k]=i)),b.result}},simulate:function(a,b,c){var d=r.extend(new r.Event,c,{type:a,isSimulated:!0});r.event.trigger(d,null,b)}}),r.fn.extend({trigger:function(a,b){return this.each(function(){r.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];if(c)return r.event.trigger(a,b,c,!0)}}),r.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(a,b){r.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),r.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),o.focusin="onfocusin"in a,o.focusin||r.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){r.event.simulate(b,a.target,r.event.fix(a))};r.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=W.access(d,b);e||d.addEventListener(a,c,!0),W.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=W.access(d,b)-1;e?W.access(d,b,e):(d.removeEventListener(a,c,!0),W.remove(d,b))}}});var tb=a.location,ub=r.now(),vb=/\?/;r.parseXML=function(b){var c;if(!b||"string"!=typeof b)return null;try{c=(new a.DOMParser).parseFromString(b,"text/xml")}catch(d){c=void 0}return c&&!c.getElementsByTagName("parsererror").length||r.error("Invalid XML: "+b),c};var wb=/\[\]$/,xb=/\r?\n/g,yb=/^(?:submit|button|image|reset|file)$/i,zb=/^(?:input|select|textarea|keygen)/i;function Ab(a,b,c,d){var e;if(Array.isArray(b))r.each(b,function(b,e){c||wb.test(a)?d(a,e):Ab(a+"["+("object"==typeof e&&null!=e?b:"")+"]",e,c,d)});else if(c||"object"!==r.type(b))d(a,b);else for(e in b)Ab(a+"["+e+"]",b[e],c,d)}r.param=function(a,b){var c,d=[],e=function(a,b){var c=r.isFunction(b)?b():b;d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(null==c?"":c)};if(Array.isArray(a)||a.jquery&&!r.isPlainObject(a))r.each(a,function(){e(this.name,this.value)});else for(c in a)Ab(c,a[c],b,e);return d.join("&")},r.fn.extend({serialize:function(){return r.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=r.prop(this,"elements");return a?r.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!r(this).is(":disabled")&&zb.test(this.nodeName)&&!yb.test(a)&&(this.checked||!ja.test(a))}).map(function(a,b){var c=r(this).val();return null==c?null:Array.isArray(c)?r.map(c,function(a){return{name:b.name,value:a.replace(xb,"\r\n")}}):{name:b.name,value:c.replace(xb,"\r\n")}}).get()}});var Bb=/%20/g,Cb=/#.*$/,Db=/([?&])_=[^&]*/,Eb=/^(.*?):[ \t]*([^\r\n]*)$/gm,Fb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Gb=/^(?:GET|HEAD)$/,Hb=/^\/\//,Ib={},Jb={},Kb="*/".concat("*"),Lb=d.createElement("a");Lb.href=tb.href;function Mb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(L)||[];if(r.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Nb(a,b,c,d){var e={},f=a===Jb;function g(h){var i;return e[h]=!0,r.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Ob(a,b){var c,d,e=r.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&r.extend(!0,a,d),a}function Pb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}if(f)return f!==i[0]&&i.unshift(f),c[f]}function Qb(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}r.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:tb.href,type:"GET",isLocal:Fb.test(tb.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Kb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":r.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Ob(Ob(a,r.ajaxSettings),b):Ob(r.ajaxSettings,a)},ajaxPrefilter:Mb(Ib),ajaxTransport:Mb(Jb),ajax:function(b,c){"object"==typeof b&&(c=b,b=void 0),c=c||{};var e,f,g,h,i,j,k,l,m,n,o=r.ajaxSetup({},c),p=o.context||o,q=o.context&&(p.nodeType||p.jquery)?r(p):r.event,s=r.Deferred(),t=r.Callbacks("once memory"),u=o.statusCode||{},v={},w={},x="canceled",y={readyState:0,getResponseHeader:function(a){var b;if(k){if(!h){h={};while(b=Eb.exec(g))h[b[1].toLowerCase()]=b[2]}b=h[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return k?g:null},setRequestHeader:function(a,b){return null==k&&(a=w[a.toLowerCase()]=w[a.toLowerCase()]||a,v[a]=b),this},overrideMimeType:function(a){return null==k&&(o.mimeType=a),this},statusCode:function(a){var b;if(a)if(k)y.always(a[y.status]);else for(b in a)u[b]=[u[b],a[b]];return this},abort:function(a){var b=a||x;return e&&e.abort(b),A(0,b),this}};if(s.promise(y),o.url=((b||o.url||tb.href)+"").replace(Hb,tb.protocol+"//"),o.type=c.method||c.type||o.method||o.type,o.dataTypes=(o.dataType||"*").toLowerCase().match(L)||[""],null==o.crossDomain){j=d.createElement("a");try{j.href=o.url,j.href=j.href,o.crossDomain=Lb.protocol+"//"+Lb.host!=j.protocol+"//"+j.host}catch(z){o.crossDomain=!0}}if(o.data&&o.processData&&"string"!=typeof o.data&&(o.data=r.param(o.data,o.traditional)),Nb(Ib,o,c,y),k)return y;l=r.event&&o.global,l&&0===r.active++&&r.event.trigger("ajaxStart"),o.type=o.type.toUpperCase(),o.hasContent=!Gb.test(o.type),f=o.url.replace(Cb,""),o.hasContent?o.data&&o.processData&&0===(o.contentType||"").indexOf("application/x-www-form-urlencoded")&&(o.data=o.data.replace(Bb,"+")):(n=o.url.slice(f.length),o.data&&(f+=(vb.test(f)?"&":"?")+o.data,delete o.data),o.cache===!1&&(f=f.replace(Db,"$1"),n=(vb.test(f)?"&":"?")+"_="+ub++ +n),o.url=f+n),o.ifModified&&(r.lastModified[f]&&y.setRequestHeader("If-Modified-Since",r.lastModified[f]),r.etag[f]&&y.setRequestHeader("If-None-Match",r.etag[f])),(o.data&&o.hasContent&&o.contentType!==!1||c.contentType)&&y.setRequestHeader("Content-Type",o.contentType),y.setRequestHeader("Accept",o.dataTypes[0]&&o.accepts[o.dataTypes[0]]?o.accepts[o.dataTypes[0]]+("*"!==o.dataTypes[0]?", "+Kb+"; q=0.01":""):o.accepts["*"]);for(m in o.headers)y.setRequestHeader(m,o.headers[m]);if(o.beforeSend&&(o.beforeSend.call(p,y,o)===!1||k))return y.abort();if(x="abort",t.add(o.complete),y.done(o.success),y.fail(o.error),e=Nb(Jb,o,c,y)){if(y.readyState=1,l&&q.trigger("ajaxSend",[y,o]),k)return y;o.async&&o.timeout>0&&(i=a.setTimeout(function(){y.abort("timeout")},o.timeout));try{k=!1,e.send(v,A)}catch(z){if(k)throw z;A(-1,z)}}else A(-1,"No Transport");function A(b,c,d,h){var j,m,n,v,w,x=c;k||(k=!0,i&&a.clearTimeout(i),e=void 0,g=h||"",y.readyState=b>0?4:0,j=b>=200&&b<300||304===b,d&&(v=Pb(o,y,d)),v=Qb(o,v,y,j),j?(o.ifModified&&(w=y.getResponseHeader("Last-Modified"),w&&(r.lastModified[f]=w),w=y.getResponseHeader("etag"),w&&(r.etag[f]=w)),204===b||"HEAD"===o.type?x="nocontent":304===b?x="notmodified":(x=v.state,m=v.data,n=v.error,j=!n)):(n=x,!b&&x||(x="error",b<0&&(b=0))),y.status=b,y.statusText=(c||x)+"",j?s.resolveWith(p,[m,x,y]):s.rejectWith(p,[y,x,n]),y.statusCode(u),u=void 0,l&&q.trigger(j?"ajaxSuccess":"ajaxError",[y,o,j?m:n]),t.fireWith(p,[y,x]),l&&(q.trigger("ajaxComplete",[y,o]),--r.active||r.event.trigger("ajaxStop")))}return y},getJSON:function(a,b,c){return r.get(a,b,c,"json")},getScript:function(a,b){return r.get(a,void 0,b,"script")}}),r.each(["get","post"],function(a,b){r[b]=function(a,c,d,e){return r.isFunction(c)&&(e=e||d,d=c,c=void 0),r.ajax(r.extend({url:a,type:b,dataType:e,data:c,success:d},r.isPlainObject(a)&&a))}}),r._evalUrl=function(a){return r.ajax({url:a,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,"throws":!0})},r.fn.extend({wrapAll:function(a){var b;return this[0]&&(r.isFunction(a)&&(a=a.call(this[0])),b=r(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this},wrapInner:function(a){return r.isFunction(a)?this.each(function(b){r(this).wrapInner(a.call(this,b))}):this.each(function(){var b=r(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=r.isFunction(a);return this.each(function(c){r(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(a){return this.parent(a).not("body").each(function(){r(this).replaceWith(this.childNodes)}),this}}),r.expr.pseudos.hidden=function(a){return!r.expr.pseudos.visible(a)},r.expr.pseudos.visible=function(a){return!!(a.offsetWidth||a.offsetHeight||a.getClientRects().length)},r.ajaxSettings.xhr=function(){try{return new a.XMLHttpRequest}catch(b){}};var Rb={0:200,1223:204},Sb=r.ajaxSettings.xhr();o.cors=!!Sb&&"withCredentials"in Sb,o.ajax=Sb=!!Sb,r.ajaxTransport(function(b){var c,d;if(o.cors||Sb&&!b.crossDomain)return{send:function(e,f){var g,h=b.xhr();if(h.open(b.type,b.url,b.async,b.username,b.password),b.xhrFields)for(g in b.xhrFields)h[g]=b.xhrFields[g];b.mimeType&&h.overrideMimeType&&h.overrideMimeType(b.mimeType),b.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest");for(g in e)h.setRequestHeader(g,e[g]);c=function(a){return function(){c&&(c=d=h.onload=h.onerror=h.onabort=h.onreadystatechange=null,"abort"===a?h.abort():"error"===a?"number"!=typeof h.status?f(0,"error"):f(h.status,h.statusText):f(Rb[h.status]||h.status,h.statusText,"text"!==(h.responseType||"text")||"string"!=typeof h.responseText?{binary:h.response}:{text:h.responseText},h.getAllResponseHeaders()))}},h.onload=c(),d=h.onerror=c("error"),void 0!==h.onabort?h.onabort=d:h.onreadystatechange=function(){4===h.readyState&&a.setTimeout(function(){c&&d()})},c=c("abort");try{h.send(b.hasContent&&b.data||null)}catch(i){if(c)throw i}},abort:function(){c&&c()}}}),r.ajaxPrefilter(function(a){a.crossDomain&&(a.contents.script=!1)}),r.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(a){return r.globalEval(a),a}}}),r.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),r.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(e,f){b=r("<script>").prop({charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&f("error"===a.type?404:200,a.type)}),d.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Tb=[],Ub=/(=)\?(?=&|$)|\?\?/;r.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Tb.pop()||r.expando+"_"+ub++;return this[a]=!0,a}}),r.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Ub.test(b.url)?"url":"string"==typeof b.data&&0===(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Ub.test(b.data)&&"data");if(h||"jsonp"===b.dataTypes[0])return e=b.jsonpCallback=r.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Ub,"$1"+e):b.jsonp!==!1&&(b.url+=(vb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||r.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){void 0===f?r(a).removeProp(e):a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Tb.push(e)),g&&r.isFunction(f)&&f(g[0]),g=f=void 0}),"script"}),o.createHTMLDocument=function(){var a=d.implementation.createHTMLDocument("").body;return a.innerHTML="<form></form><form></form>",2===a.childNodes.length}(),r.parseHTML=function(a,b,c){if("string"!=typeof a)return[];"boolean"==typeof b&&(c=b,b=!1);var e,f,g;return b||(o.createHTMLDocument?(b=d.implementation.createHTMLDocument(""),e=b.createElement("base"),e.href=d.location.href,b.head.appendChild(e)):b=d),f=C.exec(a),g=!c&&[],f?[b.createElement(f[1])]:(f=qa([a],b,g),g&&g.length&&r(g).remove(),r.merge([],f.childNodes))},r.fn.load=function(a,b,c){var d,e,f,g=this,h=a.indexOf(" ");return h>-1&&(d=pb(a.slice(h)),a=a.slice(0,h)),r.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&r.ajax({url:a,type:e||"GET",dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?r("<div>").append(r.parseHTML(a)).find(d):a)}).always(c&&function(a,b){g.each(function(){c.apply(this,f||[a.responseText,b,a])})}),this},r.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){r.fn[b]=function(a){return this.on(b,a)}}),r.expr.pseudos.animated=function(a){return r.grep(r.timers,function(b){return a===b.elem}).length},r.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=r.css(a,"position"),l=r(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=r.css(a,"top"),i=r.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),r.isFunction(b)&&(b=b.call(a,c,r.extend({},h))),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},r.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){r.offset.setOffset(this,a,b)});var b,c,d,e,f=this[0];if(f)return f.getClientRects().length?(d=f.getBoundingClientRect(),b=f.ownerDocument,c=b.documentElement,e=b.defaultView,{top:d.top+e.pageYOffset-c.clientTop,left:d.left+e.pageXOffset-c.clientLeft}):{top:0,left:0}},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===r.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),B(a[0],"html")||(d=a.offset()),d={top:d.top+r.css(a[0],"borderTopWidth",!0),left:d.left+r.css(a[0],"borderLeftWidth",!0)}),{top:b.top-d.top-r.css(c,"marginTop",!0),left:b.left-d.left-r.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent;while(a&&"static"===r.css(a,"position"))a=a.offsetParent;return a||ra})}}),r.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c="pageYOffset"===b;r.fn[a]=function(d){return T(this,function(a,d,e){var f;return r.isWindow(a)?f=a:9===a.nodeType&&(f=a.defaultView),void 0===e?f?f[b]:a[d]:void(f?f.scrollTo(c?f.pageXOffset:e,c?e:f.pageYOffset):a[d]=e)},a,d,arguments.length)}}),r.each(["top","left"],function(a,b){r.cssHooks[b]=Pa(o.pixelPosition,function(a,c){if(c)return c=Oa(a,b),Ma.test(c)?r(a).position()[b]+"px":c})}),r.each({Height:"height",Width:"width"},function(a,b){r.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){r.fn[d]=function(e,f){var g=arguments.length&&(c||"boolean"!=typeof e),h=c||(e===!0||f===!0?"margin":"border");return T(this,function(b,c,e){var f;return r.isWindow(b)?0===d.indexOf("outer")?b["inner"+a]:b.document.documentElement["client"+a]:9===b.nodeType?(f=b.documentElement,Math.max(b.body["scroll"+a],f["scroll"+a],b.body["offset"+a],f["offset"+a],f["client"+a])):void 0===e?r.css(b,c,h):r.style(b,c,e,h)},b,g?e:void 0,g)}})}),r.fn.extend({bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}}),r.holdReady=function(a){a?r.readyWait++:r.ready(!0)},r.isArray=Array.isArray,r.parseJSON=JSON.parse,r.nodeName=B,"function"==typeof define&&define.amd&&define("jquery",[],function(){return r});var Vb=a.jQuery,Wb=a.$;return r.noConflict=function(b){return a.$===r&&(a.$=Wb),b&&a.jQuery===r&&(a.jQuery=Vb),r},b||(a.jQuery=a.$=r),r});


/*! jQuery UI - v1.12.1 - 2017-08-01
* http://jqueryui.com
* Includes: widget.js, position.js, data.js, disable-selection.js, scroll-parent.js, widgets/draggable.js, widgets/resizable.js, widgets/sortable.js, widgets/mouse.js
* Copyright jQuery Foundation and other contributors; Licensed MIT */

(function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)})(function(t){t.ui=t.ui||{},t.ui.version="1.12.1";var e=0,i=Array.prototype.slice;t.cleanData=function(e){return function(i){var s,n,o;for(o=0;null!=(n=i[o]);o++)try{s=t._data(n,"events"),s&&s.remove&&t(n).triggerHandler("remove")}catch(a){}e(i)}}(t.cleanData),t.widget=function(e,i,s){var n,o,a,r={},l=e.split(".")[0];e=e.split(".")[1];var h=l+"-"+e;return s||(s=i,i=t.Widget),t.isArray(s)&&(s=t.extend.apply(null,[{}].concat(s))),t.expr[":"][h.toLowerCase()]=function(e){return!!t.data(e,h)},t[l]=t[l]||{},n=t[l][e],o=t[l][e]=function(t,e){return this._createWidget?(arguments.length&&this._createWidget(t,e),void 0):new o(t,e)},t.extend(o,n,{version:s.version,_proto:t.extend({},s),_childConstructors:[]}),a=new i,a.options=t.widget.extend({},a.options),t.each(s,function(e,s){return t.isFunction(s)?(r[e]=function(){function t(){return i.prototype[e].apply(this,arguments)}function n(t){return i.prototype[e].apply(this,t)}return function(){var e,i=this._super,o=this._superApply;return this._super=t,this._superApply=n,e=s.apply(this,arguments),this._super=i,this._superApply=o,e}}(),void 0):(r[e]=s,void 0)}),o.prototype=t.widget.extend(a,{widgetEventPrefix:n?a.widgetEventPrefix||e:e},r,{constructor:o,namespace:l,widgetName:e,widgetFullName:h}),n?(t.each(n._childConstructors,function(e,i){var s=i.prototype;t.widget(s.namespace+"."+s.widgetName,o,i._proto)}),delete n._childConstructors):i._childConstructors.push(o),t.widget.bridge(e,o),o},t.widget.extend=function(e){for(var s,n,o=i.call(arguments,1),a=0,r=o.length;r>a;a++)for(s in o[a])n=o[a][s],o[a].hasOwnProperty(s)&&void 0!==n&&(e[s]=t.isPlainObject(n)?t.isPlainObject(e[s])?t.widget.extend({},e[s],n):t.widget.extend({},n):n);return e},t.widget.bridge=function(e,s){var n=s.prototype.widgetFullName||e;t.fn[e]=function(o){var a="string"==typeof o,r=i.call(arguments,1),l=this;return a?this.length||"instance"!==o?this.each(function(){var i,s=t.data(this,n);return"instance"===o?(l=s,!1):s?t.isFunction(s[o])&&"_"!==o.charAt(0)?(i=s[o].apply(s,r),i!==s&&void 0!==i?(l=i&&i.jquery?l.pushStack(i.get()):i,!1):void 0):t.error("no such method '"+o+"' for "+e+" widget instance"):t.error("cannot call methods on "+e+" prior to initialization; "+"attempted to call method '"+o+"'")}):l=void 0:(r.length&&(o=t.widget.extend.apply(null,[o].concat(r))),this.each(function(){var e=t.data(this,n);e?(e.option(o||{}),e._init&&e._init()):t.data(this,n,new s(o,this))})),l}},t.Widget=function(){},t.Widget._childConstructors=[],t.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{classes:{},disabled:!1,create:null},_createWidget:function(i,s){s=t(s||this.defaultElement||this)[0],this.element=t(s),this.uuid=e++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=t(),this.hoverable=t(),this.focusable=t(),this.classesElementLookup={},s!==this&&(t.data(s,this.widgetFullName,this),this._on(!0,this.element,{remove:function(t){t.target===s&&this.destroy()}}),this.document=t(s.style?s.ownerDocument:s.document||s),this.window=t(this.document[0].defaultView||this.document[0].parentWindow)),this.options=t.widget.extend({},this.options,this._getCreateOptions(),i),this._create(),this.options.disabled&&this._setOptionDisabled(this.options.disabled),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:function(){return{}},_getCreateEventData:t.noop,_create:t.noop,_init:t.noop,destroy:function(){var e=this;this._destroy(),t.each(this.classesElementLookup,function(t,i){e._removeClass(i,t)}),this.element.off(this.eventNamespace).removeData(this.widgetFullName),this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),this.bindings.off(this.eventNamespace)},_destroy:t.noop,widget:function(){return this.element},option:function(e,i){var s,n,o,a=e;if(0===arguments.length)return t.widget.extend({},this.options);if("string"==typeof e)if(a={},s=e.split("."),e=s.shift(),s.length){for(n=a[e]=t.widget.extend({},this.options[e]),o=0;s.length-1>o;o++)n[s[o]]=n[s[o]]||{},n=n[s[o]];if(e=s.pop(),1===arguments.length)return void 0===n[e]?null:n[e];n[e]=i}else{if(1===arguments.length)return void 0===this.options[e]?null:this.options[e];a[e]=i}return this._setOptions(a),this},_setOptions:function(t){var e;for(e in t)this._setOption(e,t[e]);return this},_setOption:function(t,e){return"classes"===t&&this._setOptionClasses(e),this.options[t]=e,"disabled"===t&&this._setOptionDisabled(e),this},_setOptionClasses:function(e){var i,s,n;for(i in e)n=this.classesElementLookup[i],e[i]!==this.options.classes[i]&&n&&n.length&&(s=t(n.get()),this._removeClass(n,i),s.addClass(this._classes({element:s,keys:i,classes:e,add:!0})))},_setOptionDisabled:function(t){this._toggleClass(this.widget(),this.widgetFullName+"-disabled",null,!!t),t&&(this._removeClass(this.hoverable,null,"ui-state-hover"),this._removeClass(this.focusable,null,"ui-state-focus"))},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_classes:function(e){function i(i,o){var a,r;for(r=0;i.length>r;r++)a=n.classesElementLookup[i[r]]||t(),a=e.add?t(t.unique(a.get().concat(e.element.get()))):t(a.not(e.element).get()),n.classesElementLookup[i[r]]=a,s.push(i[r]),o&&e.classes[i[r]]&&s.push(e.classes[i[r]])}var s=[],n=this;return e=t.extend({element:this.element,classes:this.options.classes||{}},e),this._on(e.element,{remove:"_untrackClassesElement"}),e.keys&&i(e.keys.match(/\S+/g)||[],!0),e.extra&&i(e.extra.match(/\S+/g)||[]),s.join(" ")},_untrackClassesElement:function(e){var i=this;t.each(i.classesElementLookup,function(s,n){-1!==t.inArray(e.target,n)&&(i.classesElementLookup[s]=t(n.not(e.target).get()))})},_removeClass:function(t,e,i){return this._toggleClass(t,e,i,!1)},_addClass:function(t,e,i){return this._toggleClass(t,e,i,!0)},_toggleClass:function(t,e,i,s){s="boolean"==typeof s?s:i;var n="string"==typeof t||null===t,o={extra:n?e:i,keys:n?t:e,element:n?this.element:t,add:s};return o.element.toggleClass(this._classes(o),s),this},_on:function(e,i,s){var n,o=this;"boolean"!=typeof e&&(s=i,i=e,e=!1),s?(i=n=t(i),this.bindings=this.bindings.add(i)):(s=i,i=this.element,n=this.widget()),t.each(s,function(s,a){function r(){return e||o.options.disabled!==!0&&!t(this).hasClass("ui-state-disabled")?("string"==typeof a?o[a]:a).apply(o,arguments):void 0}"string"!=typeof a&&(r.guid=a.guid=a.guid||r.guid||t.guid++);var l=s.match(/^([\w:-]*)\s*(.*)$/),h=l[1]+o.eventNamespace,c=l[2];c?n.on(h,c,r):i.on(h,r)})},_off:function(e,i){i=(i||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.off(i).off(i),this.bindings=t(this.bindings.not(e).get()),this.focusable=t(this.focusable.not(e).get()),this.hoverable=t(this.hoverable.not(e).get())},_delay:function(t,e){function i(){return("string"==typeof t?s[t]:t).apply(s,arguments)}var s=this;return setTimeout(i,e||0)},_hoverable:function(e){this.hoverable=this.hoverable.add(e),this._on(e,{mouseenter:function(e){this._addClass(t(e.currentTarget),null,"ui-state-hover")},mouseleave:function(e){this._removeClass(t(e.currentTarget),null,"ui-state-hover")}})},_focusable:function(e){this.focusable=this.focusable.add(e),this._on(e,{focusin:function(e){this._addClass(t(e.currentTarget),null,"ui-state-focus")},focusout:function(e){this._removeClass(t(e.currentTarget),null,"ui-state-focus")}})},_trigger:function(e,i,s){var n,o,a=this.options[e];if(s=s||{},i=t.Event(i),i.type=(e===this.widgetEventPrefix?e:this.widgetEventPrefix+e).toLowerCase(),i.target=this.element[0],o=i.originalEvent)for(n in o)n in i||(i[n]=o[n]);return this.element.trigger(i,s),!(t.isFunction(a)&&a.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},t.each({show:"fadeIn",hide:"fadeOut"},function(e,i){t.Widget.prototype["_"+e]=function(s,n,o){"string"==typeof n&&(n={effect:n});var a,r=n?n===!0||"number"==typeof n?i:n.effect||i:e;n=n||{},"number"==typeof n&&(n={duration:n}),a=!t.isEmptyObject(n),n.complete=o,n.delay&&s.delay(n.delay),a&&t.effects&&t.effects.effect[r]?s[e](n):r!==e&&s[r]?s[r](n.duration,n.easing,o):s.queue(function(i){t(this)[e](),o&&o.call(s[0]),i()})}}),t.widget,function(){function e(t,e,i){return[parseFloat(t[0])*(u.test(t[0])?e/100:1),parseFloat(t[1])*(u.test(t[1])?i/100:1)]}function i(e,i){return parseInt(t.css(e,i),10)||0}function s(e){var i=e[0];return 9===i.nodeType?{width:e.width(),height:e.height(),offset:{top:0,left:0}}:t.isWindow(i)?{width:e.width(),height:e.height(),offset:{top:e.scrollTop(),left:e.scrollLeft()}}:i.preventDefault?{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}:{width:e.outerWidth(),height:e.outerHeight(),offset:e.offset()}}var n,o=Math.max,a=Math.abs,r=/left|center|right/,l=/top|center|bottom/,h=/[\+\-]\d+(\.[\d]+)?%?/,c=/^\w+/,u=/%$/,d=t.fn.position;t.position={scrollbarWidth:function(){if(void 0!==n)return n;var e,i,s=t("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),o=s.children()[0];return t("body").append(s),e=o.offsetWidth,s.css("overflow","scroll"),i=o.offsetWidth,e===i&&(i=s[0].clientWidth),s.remove(),n=e-i},getScrollInfo:function(e){var i=e.isWindow||e.isDocument?"":e.element.css("overflow-x"),s=e.isWindow||e.isDocument?"":e.element.css("overflow-y"),n="scroll"===i||"auto"===i&&e.width<e.element[0].scrollWidth,o="scroll"===s||"auto"===s&&e.height<e.element[0].scrollHeight;return{width:o?t.position.scrollbarWidth():0,height:n?t.position.scrollbarWidth():0}},getWithinInfo:function(e){var i=t(e||window),s=t.isWindow(i[0]),n=!!i[0]&&9===i[0].nodeType,o=!s&&!n;return{element:i,isWindow:s,isDocument:n,offset:o?t(e).offset():{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:i.outerWidth(),height:i.outerHeight()}}},t.fn.position=function(n){if(!n||!n.of)return d.apply(this,arguments);n=t.extend({},n);var u,p,f,g,m,_,v=t(n.of),b=t.position.getWithinInfo(n.within),y=t.position.getScrollInfo(b),w=(n.collision||"flip").split(" "),k={};return _=s(v),v[0].preventDefault&&(n.at="left top"),p=_.width,f=_.height,g=_.offset,m=t.extend({},g),t.each(["my","at"],function(){var t,e,i=(n[this]||"").split(" ");1===i.length&&(i=r.test(i[0])?i.concat(["center"]):l.test(i[0])?["center"].concat(i):["center","center"]),i[0]=r.test(i[0])?i[0]:"center",i[1]=l.test(i[1])?i[1]:"center",t=h.exec(i[0]),e=h.exec(i[1]),k[this]=[t?t[0]:0,e?e[0]:0],n[this]=[c.exec(i[0])[0],c.exec(i[1])[0]]}),1===w.length&&(w[1]=w[0]),"right"===n.at[0]?m.left+=p:"center"===n.at[0]&&(m.left+=p/2),"bottom"===n.at[1]?m.top+=f:"center"===n.at[1]&&(m.top+=f/2),u=e(k.at,p,f),m.left+=u[0],m.top+=u[1],this.each(function(){var s,r,l=t(this),h=l.outerWidth(),c=l.outerHeight(),d=i(this,"marginLeft"),_=i(this,"marginTop"),x=h+d+i(this,"marginRight")+y.width,C=c+_+i(this,"marginBottom")+y.height,D=t.extend({},m),T=e(k.my,l.outerWidth(),l.outerHeight());"right"===n.my[0]?D.left-=h:"center"===n.my[0]&&(D.left-=h/2),"bottom"===n.my[1]?D.top-=c:"center"===n.my[1]&&(D.top-=c/2),D.left+=T[0],D.top+=T[1],s={marginLeft:d,marginTop:_},t.each(["left","top"],function(e,i){t.ui.position[w[e]]&&t.ui.position[w[e]][i](D,{targetWidth:p,targetHeight:f,elemWidth:h,elemHeight:c,collisionPosition:s,collisionWidth:x,collisionHeight:C,offset:[u[0]+T[0],u[1]+T[1]],my:n.my,at:n.at,within:b,elem:l})}),n.using&&(r=function(t){var e=g.left-D.left,i=e+p-h,s=g.top-D.top,r=s+f-c,u={target:{element:v,left:g.left,top:g.top,width:p,height:f},element:{element:l,left:D.left,top:D.top,width:h,height:c},horizontal:0>i?"left":e>0?"right":"center",vertical:0>r?"top":s>0?"bottom":"middle"};h>p&&p>a(e+i)&&(u.horizontal="center"),c>f&&f>a(s+r)&&(u.vertical="middle"),u.important=o(a(e),a(i))>o(a(s),a(r))?"horizontal":"vertical",n.using.call(this,t,u)}),l.offset(t.extend(D,{using:r}))})},t.ui.position={fit:{left:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollLeft:s.offset.left,a=s.width,r=t.left-e.collisionPosition.marginLeft,l=n-r,h=r+e.collisionWidth-a-n;e.collisionWidth>a?l>0&&0>=h?(i=t.left+l+e.collisionWidth-a-n,t.left+=l-i):t.left=h>0&&0>=l?n:l>h?n+a-e.collisionWidth:n:l>0?t.left+=l:h>0?t.left-=h:t.left=o(t.left-r,t.left)},top:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollTop:s.offset.top,a=e.within.height,r=t.top-e.collisionPosition.marginTop,l=n-r,h=r+e.collisionHeight-a-n;e.collisionHeight>a?l>0&&0>=h?(i=t.top+l+e.collisionHeight-a-n,t.top+=l-i):t.top=h>0&&0>=l?n:l>h?n+a-e.collisionHeight:n:l>0?t.top+=l:h>0?t.top-=h:t.top=o(t.top-r,t.top)}},flip:{left:function(t,e){var i,s,n=e.within,o=n.offset.left+n.scrollLeft,r=n.width,l=n.isWindow?n.scrollLeft:n.offset.left,h=t.left-e.collisionPosition.marginLeft,c=h-l,u=h+e.collisionWidth-r-l,d="left"===e.my[0]?-e.elemWidth:"right"===e.my[0]?e.elemWidth:0,p="left"===e.at[0]?e.targetWidth:"right"===e.at[0]?-e.targetWidth:0,f=-2*e.offset[0];0>c?(i=t.left+d+p+f+e.collisionWidth-r-o,(0>i||a(c)>i)&&(t.left+=d+p+f)):u>0&&(s=t.left-e.collisionPosition.marginLeft+d+p+f-l,(s>0||u>a(s))&&(t.left+=d+p+f))},top:function(t,e){var i,s,n=e.within,o=n.offset.top+n.scrollTop,r=n.height,l=n.isWindow?n.scrollTop:n.offset.top,h=t.top-e.collisionPosition.marginTop,c=h-l,u=h+e.collisionHeight-r-l,d="top"===e.my[1],p=d?-e.elemHeight:"bottom"===e.my[1]?e.elemHeight:0,f="top"===e.at[1]?e.targetHeight:"bottom"===e.at[1]?-e.targetHeight:0,g=-2*e.offset[1];0>c?(s=t.top+p+f+g+e.collisionHeight-r-o,(0>s||a(c)>s)&&(t.top+=p+f+g)):u>0&&(i=t.top-e.collisionPosition.marginTop+p+f+g-l,(i>0||u>a(i))&&(t.top+=p+f+g))}},flipfit:{left:function(){t.ui.position.flip.left.apply(this,arguments),t.ui.position.fit.left.apply(this,arguments)},top:function(){t.ui.position.flip.top.apply(this,arguments),t.ui.position.fit.top.apply(this,arguments)}}}}(),t.ui.position,t.extend(t.expr[":"],{data:t.expr.createPseudo?t.expr.createPseudo(function(e){return function(i){return!!t.data(i,e)}}):function(e,i,s){return!!t.data(e,s[3])}}),t.fn.extend({disableSelection:function(){var t="onselectstart"in document.createElement("div")?"selectstart":"mousedown";return function(){return this.on(t+".ui-disableSelection",function(t){t.preventDefault()})}}(),enableSelection:function(){return this.off(".ui-disableSelection")}}),t.fn.scrollParent=function(e){var i=this.css("position"),s="absolute"===i,n=e?/(auto|scroll|hidden)/:/(auto|scroll)/,o=this.parents().filter(function(){var e=t(this);return s&&"static"===e.css("position")?!1:n.test(e.css("overflow")+e.css("overflow-y")+e.css("overflow-x"))}).eq(0);return"fixed"!==i&&o.length?o:t(this[0].ownerDocument||document)},t.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());var s=!1;t(document).on("mouseup",function(){s=!1}),t.widget("ui.mouse",{version:"1.12.1",options:{cancel:"input, textarea, button, select, option",distance:1,delay:0},_mouseInit:function(){var e=this;this.element.on("mousedown."+this.widgetName,function(t){return e._mouseDown(t)}).on("click."+this.widgetName,function(i){return!0===t.data(i.target,e.widgetName+".preventClickEvent")?(t.removeData(i.target,e.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1):void 0}),this.started=!1},_mouseDestroy:function(){this.element.off("."+this.widgetName),this._mouseMoveDelegate&&this.document.off("mousemove."+this.widgetName,this._mouseMoveDelegate).off("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(e){if(!s){this._mouseMoved=!1,this._mouseStarted&&this._mouseUp(e),this._mouseDownEvent=e;var i=this,n=1===e.which,o="string"==typeof this.options.cancel&&e.target.nodeName?t(e.target).closest(this.options.cancel).length:!1;return n&&!o&&this._mouseCapture(e)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){i.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(e)&&this._mouseDelayMet(e)&&(this._mouseStarted=this._mouseStart(e)!==!1,!this._mouseStarted)?(e.preventDefault(),!0):(!0===t.data(e.target,this.widgetName+".preventClickEvent")&&t.removeData(e.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(t){return i._mouseMove(t)},this._mouseUpDelegate=function(t){return i._mouseUp(t)},this.document.on("mousemove."+this.widgetName,this._mouseMoveDelegate).on("mouseup."+this.widgetName,this._mouseUpDelegate),e.preventDefault(),s=!0,!0)):!0}},_mouseMove:function(e){if(this._mouseMoved){if(t.ui.ie&&(!document.documentMode||9>document.documentMode)&&!e.button)return this._mouseUp(e);if(!e.which)if(e.originalEvent.altKey||e.originalEvent.ctrlKey||e.originalEvent.metaKey||e.originalEvent.shiftKey)this.ignoreMissingWhich=!0;else if(!this.ignoreMissingWhich)return this._mouseUp(e)}return(e.which||e.button)&&(this._mouseMoved=!0),this._mouseStarted?(this._mouseDrag(e),e.preventDefault()):(this._mouseDistanceMet(e)&&this._mouseDelayMet(e)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,e)!==!1,this._mouseStarted?this._mouseDrag(e):this._mouseUp(e)),!this._mouseStarted)},_mouseUp:function(e){this.document.off("mousemove."+this.widgetName,this._mouseMoveDelegate).off("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,e.target===this._mouseDownEvent.target&&t.data(e.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(e)),this._mouseDelayTimer&&(clearTimeout(this._mouseDelayTimer),delete this._mouseDelayTimer),this.ignoreMissingWhich=!1,s=!1,e.preventDefault()},_mouseDistanceMet:function(t){return Math.max(Math.abs(this._mouseDownEvent.pageX-t.pageX),Math.abs(this._mouseDownEvent.pageY-t.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}}),t.ui.plugin={add:function(e,i,s){var n,o=t.ui[e].prototype;for(n in s)o.plugins[n]=o.plugins[n]||[],o.plugins[n].push([i,s[n]])},call:function(t,e,i,s){var n,o=t.plugins[e];if(o&&(s||t.element[0].parentNode&&11!==t.element[0].parentNode.nodeType))for(n=0;o.length>n;n++)t.options[o[n][0]]&&o[n][1].apply(t.element,i)}},t.ui.safeActiveElement=function(t){var e;try{e=t.activeElement}catch(i){e=t.body}return e||(e=t.body),e.nodeName||(e=t.body),e},t.ui.safeBlur=function(e){e&&"body"!==e.nodeName.toLowerCase()&&t(e).trigger("blur")},t.widget("ui.draggable",t.ui.mouse,{version:"1.12.1",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1,drag:null,start:null,stop:null},_create:function(){"original"===this.options.helper&&this._setPositionRelative(),this.options.addClasses&&this._addClass("ui-draggable"),this._setHandleClassName(),this._mouseInit()},_setOption:function(t,e){this._super(t,e),"handle"===t&&(this._removeHandleClassName(),this._setHandleClassName())},_destroy:function(){return(this.helper||this.element).is(".ui-draggable-dragging")?(this.destroyOnClear=!0,void 0):(this._removeHandleClassName(),this._mouseDestroy(),void 0)},_mouseCapture:function(e){var i=this.options;return this.helper||i.disabled||t(e.target).closest(".ui-resizable-handle").length>0?!1:(this.handle=this._getHandle(e),this.handle?(this._blurActiveElement(e),this._blockFrames(i.iframeFix===!0?"iframe":i.iframeFix),!0):!1)},_blockFrames:function(e){this.iframeBlocks=this.document.find(e).map(function(){var e=t(this);return t("<div>").css("position","absolute").appendTo(e.parent()).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()).offset(e.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_blurActiveElement:function(e){var i=t.ui.safeActiveElement(this.document[0]),s=t(e.target);s.closest(i).length||t.ui.safeBlur(i)},_mouseStart:function(e){var i=this.options;return this.helper=this._createHelper(e),this._addClass(this.helper,"ui-draggable-dragging"),this._cacheHelperProportions(),t.ui.ddmanager&&(t.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(!0),this.offsetParent=this.helper.offsetParent(),this.hasFixedAncestor=this.helper.parents().filter(function(){return"fixed"===t(this).css("position")}).length>0,this.positionAbs=this.element.offset(),this._refreshOffsets(e),this.originalPosition=this.position=this._generatePosition(e,!1),this.originalPageX=e.pageX,this.originalPageY=e.pageY,i.cursorAt&&this._adjustOffsetFromHelper(i.cursorAt),this._setContainment(),this._trigger("start",e)===!1?(this._clear(),!1):(this._cacheHelperProportions(),t.ui.ddmanager&&!i.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e),this._mouseDrag(e,!0),t.ui.ddmanager&&t.ui.ddmanager.dragStart(this,e),!0)},_refreshOffsets:function(t){this.offset={top:this.positionAbs.top-this.margins.top,left:this.positionAbs.left-this.margins.left,scroll:!1,parent:this._getParentOffset(),relative:this._getRelativeOffset()},this.offset.click={left:t.pageX-this.offset.left,top:t.pageY-this.offset.top}},_mouseDrag:function(e,i){if(this.hasFixedAncestor&&(this.offset.parent=this._getParentOffset()),this.position=this._generatePosition(e,!0),this.positionAbs=this._convertPositionTo("absolute"),!i){var s=this._uiHash();if(this._trigger("drag",e,s)===!1)return this._mouseUp(new t.Event("mouseup",e)),!1;this.position=s.position}return this.helper[0].style.left=this.position.left+"px",this.helper[0].style.top=this.position.top+"px",t.ui.ddmanager&&t.ui.ddmanager.drag(this,e),!1},_mouseStop:function(e){var i=this,s=!1;return t.ui.ddmanager&&!this.options.dropBehaviour&&(s=t.ui.ddmanager.drop(this,e)),this.dropped&&(s=this.dropped,this.dropped=!1),"invalid"===this.options.revert&&!s||"valid"===this.options.revert&&s||this.options.revert===!0||t.isFunction(this.options.revert)&&this.options.revert.call(this.element,s)?t(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){i._trigger("stop",e)!==!1&&i._clear()}):this._trigger("stop",e)!==!1&&this._clear(),!1},_mouseUp:function(e){return this._unblockFrames(),t.ui.ddmanager&&t.ui.ddmanager.dragStop(this,e),this.handleElement.is(e.target)&&this.element.trigger("focus"),t.ui.mouse.prototype._mouseUp.call(this,e)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp(new t.Event("mouseup",{target:this.element[0]})):this._clear(),this},_getHandle:function(e){return this.options.handle?!!t(e.target).closest(this.element.find(this.options.handle)).length:!0},_setHandleClassName:function(){this.handleElement=this.options.handle?this.element.find(this.options.handle):this.element,this._addClass(this.handleElement,"ui-draggable-handle")},_removeHandleClassName:function(){this._removeClass(this.handleElement,"ui-draggable-handle")},_createHelper:function(e){var i=this.options,s=t.isFunction(i.helper),n=s?t(i.helper.apply(this.element[0],[e])):"clone"===i.helper?this.element.clone().removeAttr("id"):this.element;return n.parents("body").length||n.appendTo("parent"===i.appendTo?this.element[0].parentNode:i.appendTo),s&&n[0]===this.element[0]&&this._setPositionRelative(),n[0]===this.element[0]||/(fixed|absolute)/.test(n.css("position"))||n.css("position","absolute"),n},_setPositionRelative:function(){/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative")},_adjustOffsetFromHelper:function(e){"string"==typeof e&&(e=e.split(" ")),t.isArray(e)&&(e={left:+e[0],top:+e[1]||0}),"left"in e&&(this.offset.click.left=e.left+this.margins.left),"right"in e&&(this.offset.click.left=this.helperProportions.width-e.right+this.margins.left),"top"in e&&(this.offset.click.top=e.top+this.margins.top),"bottom"in e&&(this.offset.click.top=this.helperProportions.height-e.bottom+this.margins.top)},_isRootNode:function(t){return/(html|body)/i.test(t.tagName)||t===this.document[0]},_getParentOffset:function(){var e=this.offsetParent.offset(),i=this.document[0];return"absolute"===this.cssPosition&&this.scrollParent[0]!==i&&t.contains(this.scrollParent[0],this.offsetParent[0])&&(e.left+=this.scrollParent.scrollLeft(),e.top+=this.scrollParent.scrollTop()),this._isRootNode(this.offsetParent[0])&&(e={top:0,left:0}),{top:e.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:e.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"!==this.cssPosition)return{top:0,left:0};var t=this.element.position(),e=this._isRootNode(this.scrollParent[0]);return{top:t.top-(parseInt(this.helper.css("top"),10)||0)+(e?0:this.scrollParent.scrollTop()),left:t.left-(parseInt(this.helper.css("left"),10)||0)+(e?0:this.scrollParent.scrollLeft())}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var e,i,s,n=this.options,o=this.document[0];return this.relativeContainer=null,n.containment?"window"===n.containment?(this.containment=[t(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,t(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,t(window).scrollLeft()+t(window).width()-this.helperProportions.width-this.margins.left,t(window).scrollTop()+(t(window).height()||o.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],void 0):"document"===n.containment?(this.containment=[0,0,t(o).width()-this.helperProportions.width-this.margins.left,(t(o).height()||o.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],void 0):n.containment.constructor===Array?(this.containment=n.containment,void 0):("parent"===n.containment&&(n.containment=this.helper[0].parentNode),i=t(n.containment),s=i[0],s&&(e=/(scroll|auto)/.test(i.css("overflow")),this.containment=[(parseInt(i.css("borderLeftWidth"),10)||0)+(parseInt(i.css("paddingLeft"),10)||0),(parseInt(i.css("borderTopWidth"),10)||0)+(parseInt(i.css("paddingTop"),10)||0),(e?Math.max(s.scrollWidth,s.offsetWidth):s.offsetWidth)-(parseInt(i.css("borderRightWidth"),10)||0)-(parseInt(i.css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(e?Math.max(s.scrollHeight,s.offsetHeight):s.offsetHeight)-(parseInt(i.css("borderBottomWidth"),10)||0)-(parseInt(i.css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relativeContainer=i),void 0):(this.containment=null,void 0)},_convertPositionTo:function(t,e){e||(e=this.position);var i="absolute"===t?1:-1,s=this._isRootNode(this.scrollParent[0]);return{top:e.top+this.offset.relative.top*i+this.offset.parent.top*i-("fixed"===this.cssPosition?-this.offset.scroll.top:s?0:this.offset.scroll.top)*i,left:e.left+this.offset.relative.left*i+this.offset.parent.left*i-("fixed"===this.cssPosition?-this.offset.scroll.left:s?0:this.offset.scroll.left)*i}},_generatePosition:function(t,e){var i,s,n,o,a=this.options,r=this._isRootNode(this.scrollParent[0]),l=t.pageX,h=t.pageY;return r&&this.offset.scroll||(this.offset.scroll={top:this.scrollParent.scrollTop(),left:this.scrollParent.scrollLeft()}),e&&(this.containment&&(this.relativeContainer?(s=this.relativeContainer.offset(),i=[this.containment[0]+s.left,this.containment[1]+s.top,this.containment[2]+s.left,this.containment[3]+s.top]):i=this.containment,t.pageX-this.offset.click.left<i[0]&&(l=i[0]+this.offset.click.left),t.pageY-this.offset.click.top<i[1]&&(h=i[1]+this.offset.click.top),t.pageX-this.offset.click.left>i[2]&&(l=i[2]+this.offset.click.left),t.pageY-this.offset.click.top>i[3]&&(h=i[3]+this.offset.click.top)),a.grid&&(n=a.grid[1]?this.originalPageY+Math.round((h-this.originalPageY)/a.grid[1])*a.grid[1]:this.originalPageY,h=i?n-this.offset.click.top>=i[1]||n-this.offset.click.top>i[3]?n:n-this.offset.click.top>=i[1]?n-a.grid[1]:n+a.grid[1]:n,o=a.grid[0]?this.originalPageX+Math.round((l-this.originalPageX)/a.grid[0])*a.grid[0]:this.originalPageX,l=i?o-this.offset.click.left>=i[0]||o-this.offset.click.left>i[2]?o:o-this.offset.click.left>=i[0]?o-a.grid[0]:o+a.grid[0]:o),"y"===a.axis&&(l=this.originalPageX),"x"===a.axis&&(h=this.originalPageY)),{top:h-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.offset.scroll.top:r?0:this.offset.scroll.top),left:l-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.offset.scroll.left:r?0:this.offset.scroll.left)}},_clear:function(){this._removeClass(this.helper,"ui-draggable-dragging"),this.helper[0]===this.element[0]||this.cancelHelperRemoval||this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1,this.destroyOnClear&&this.destroy()},_trigger:function(e,i,s){return s=s||this._uiHash(),t.ui.plugin.call(this,e,[i,s,this],!0),/^(drag|start|stop)/.test(e)&&(this.positionAbs=this._convertPositionTo("absolute"),s.offset=this.positionAbs),t.Widget.prototype._trigger.call(this,e,i,s)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),t.ui.plugin.add("draggable","connectToSortable",{start:function(e,i,s){var n=t.extend({},i,{item:s.element});s.sortables=[],t(s.options.connectToSortable).each(function(){var i=t(this).sortable("instance");i&&!i.options.disabled&&(s.sortables.push(i),i.refreshPositions(),i._trigger("activate",e,n))})},stop:function(e,i,s){var n=t.extend({},i,{item:s.element});s.cancelHelperRemoval=!1,t.each(s.sortables,function(){var t=this;t.isOver?(t.isOver=0,s.cancelHelperRemoval=!0,t.cancelHelperRemoval=!1,t._storedCSS={position:t.placeholder.css("position"),top:t.placeholder.css("top"),left:t.placeholder.css("left")},t._mouseStop(e),t.options.helper=t.options._helper):(t.cancelHelperRemoval=!0,t._trigger("deactivate",e,n))})},drag:function(e,i,s){t.each(s.sortables,function(){var n=!1,o=this;o.positionAbs=s.positionAbs,o.helperProportions=s.helperProportions,o.offset.click=s.offset.click,o._intersectsWith(o.containerCache)&&(n=!0,t.each(s.sortables,function(){return this.positionAbs=s.positionAbs,this.helperProportions=s.helperProportions,this.offset.click=s.offset.click,this!==o&&this._intersectsWith(this.containerCache)&&t.contains(o.element[0],this.element[0])&&(n=!1),n})),n?(o.isOver||(o.isOver=1,s._parent=i.helper.parent(),o.currentItem=i.helper.appendTo(o.element).data("ui-sortable-item",!0),o.options._helper=o.options.helper,o.options.helper=function(){return i.helper[0]},e.target=o.currentItem[0],o._mouseCapture(e,!0),o._mouseStart(e,!0,!0),o.offset.click.top=s.offset.click.top,o.offset.click.left=s.offset.click.left,o.offset.parent.left-=s.offset.parent.left-o.offset.parent.left,o.offset.parent.top-=s.offset.parent.top-o.offset.parent.top,s._trigger("toSortable",e),s.dropped=o.element,t.each(s.sortables,function(){this.refreshPositions()}),s.currentItem=s.element,o.fromOutside=s),o.currentItem&&(o._mouseDrag(e),i.position=o.position)):o.isOver&&(o.isOver=0,o.cancelHelperRemoval=!0,o.options._revert=o.options.revert,o.options.revert=!1,o._trigger("out",e,o._uiHash(o)),o._mouseStop(e,!0),o.options.revert=o.options._revert,o.options.helper=o.options._helper,o.placeholder&&o.placeholder.remove(),i.helper.appendTo(s._parent),s._refreshOffsets(e),i.position=s._generatePosition(e,!0),s._trigger("fromSortable",e),s.dropped=!1,t.each(s.sortables,function(){this.refreshPositions()}))})}}),t.ui.plugin.add("draggable","cursor",{start:function(e,i,s){var n=t("body"),o=s.options;n.css("cursor")&&(o._cursor=n.css("cursor")),n.css("cursor",o.cursor)},stop:function(e,i,s){var n=s.options;n._cursor&&t("body").css("cursor",n._cursor)
}}),t.ui.plugin.add("draggable","opacity",{start:function(e,i,s){var n=t(i.helper),o=s.options;n.css("opacity")&&(o._opacity=n.css("opacity")),n.css("opacity",o.opacity)},stop:function(e,i,s){var n=s.options;n._opacity&&t(i.helper).css("opacity",n._opacity)}}),t.ui.plugin.add("draggable","scroll",{start:function(t,e,i){i.scrollParentNotHidden||(i.scrollParentNotHidden=i.helper.scrollParent(!1)),i.scrollParentNotHidden[0]!==i.document[0]&&"HTML"!==i.scrollParentNotHidden[0].tagName&&(i.overflowOffset=i.scrollParentNotHidden.offset())},drag:function(e,i,s){var n=s.options,o=!1,a=s.scrollParentNotHidden[0],r=s.document[0];a!==r&&"HTML"!==a.tagName?(n.axis&&"x"===n.axis||(s.overflowOffset.top+a.offsetHeight-e.pageY<n.scrollSensitivity?a.scrollTop=o=a.scrollTop+n.scrollSpeed:e.pageY-s.overflowOffset.top<n.scrollSensitivity&&(a.scrollTop=o=a.scrollTop-n.scrollSpeed)),n.axis&&"y"===n.axis||(s.overflowOffset.left+a.offsetWidth-e.pageX<n.scrollSensitivity?a.scrollLeft=o=a.scrollLeft+n.scrollSpeed:e.pageX-s.overflowOffset.left<n.scrollSensitivity&&(a.scrollLeft=o=a.scrollLeft-n.scrollSpeed))):(n.axis&&"x"===n.axis||(e.pageY-t(r).scrollTop()<n.scrollSensitivity?o=t(r).scrollTop(t(r).scrollTop()-n.scrollSpeed):t(window).height()-(e.pageY-t(r).scrollTop())<n.scrollSensitivity&&(o=t(r).scrollTop(t(r).scrollTop()+n.scrollSpeed))),n.axis&&"y"===n.axis||(e.pageX-t(r).scrollLeft()<n.scrollSensitivity?o=t(r).scrollLeft(t(r).scrollLeft()-n.scrollSpeed):t(window).width()-(e.pageX-t(r).scrollLeft())<n.scrollSensitivity&&(o=t(r).scrollLeft(t(r).scrollLeft()+n.scrollSpeed)))),o!==!1&&t.ui.ddmanager&&!n.dropBehaviour&&t.ui.ddmanager.prepareOffsets(s,e)}}),t.ui.plugin.add("draggable","snap",{start:function(e,i,s){var n=s.options;s.snapElements=[],t(n.snap.constructor!==String?n.snap.items||":data(ui-draggable)":n.snap).each(function(){var e=t(this),i=e.offset();this!==s.element[0]&&s.snapElements.push({item:this,width:e.outerWidth(),height:e.outerHeight(),top:i.top,left:i.left})})},drag:function(e,i,s){var n,o,a,r,l,h,c,u,d,p,f=s.options,g=f.snapTolerance,m=i.offset.left,_=m+s.helperProportions.width,v=i.offset.top,b=v+s.helperProportions.height;for(d=s.snapElements.length-1;d>=0;d--)l=s.snapElements[d].left-s.margins.left,h=l+s.snapElements[d].width,c=s.snapElements[d].top-s.margins.top,u=c+s.snapElements[d].height,l-g>_||m>h+g||c-g>b||v>u+g||!t.contains(s.snapElements[d].item.ownerDocument,s.snapElements[d].item)?(s.snapElements[d].snapping&&s.options.snap.release&&s.options.snap.release.call(s.element,e,t.extend(s._uiHash(),{snapItem:s.snapElements[d].item})),s.snapElements[d].snapping=!1):("inner"!==f.snapMode&&(n=g>=Math.abs(c-b),o=g>=Math.abs(u-v),a=g>=Math.abs(l-_),r=g>=Math.abs(h-m),n&&(i.position.top=s._convertPositionTo("relative",{top:c-s.helperProportions.height,left:0}).top),o&&(i.position.top=s._convertPositionTo("relative",{top:u,left:0}).top),a&&(i.position.left=s._convertPositionTo("relative",{top:0,left:l-s.helperProportions.width}).left),r&&(i.position.left=s._convertPositionTo("relative",{top:0,left:h}).left)),p=n||o||a||r,"outer"!==f.snapMode&&(n=g>=Math.abs(c-v),o=g>=Math.abs(u-b),a=g>=Math.abs(l-m),r=g>=Math.abs(h-_),n&&(i.position.top=s._convertPositionTo("relative",{top:c,left:0}).top),o&&(i.position.top=s._convertPositionTo("relative",{top:u-s.helperProportions.height,left:0}).top),a&&(i.position.left=s._convertPositionTo("relative",{top:0,left:l}).left),r&&(i.position.left=s._convertPositionTo("relative",{top:0,left:h-s.helperProportions.width}).left)),!s.snapElements[d].snapping&&(n||o||a||r||p)&&s.options.snap.snap&&s.options.snap.snap.call(s.element,e,t.extend(s._uiHash(),{snapItem:s.snapElements[d].item})),s.snapElements[d].snapping=n||o||a||r||p)}}),t.ui.plugin.add("draggable","stack",{start:function(e,i,s){var n,o=s.options,a=t.makeArray(t(o.stack)).sort(function(e,i){return(parseInt(t(e).css("zIndex"),10)||0)-(parseInt(t(i).css("zIndex"),10)||0)});a.length&&(n=parseInt(t(a[0]).css("zIndex"),10)||0,t(a).each(function(e){t(this).css("zIndex",n+e)}),this.css("zIndex",n+a.length))}}),t.ui.plugin.add("draggable","zIndex",{start:function(e,i,s){var n=t(i.helper),o=s.options;n.css("zIndex")&&(o._zIndex=n.css("zIndex")),n.css("zIndex",o.zIndex)},stop:function(e,i,s){var n=s.options;n._zIndex&&t(i.helper).css("zIndex",n._zIndex)}}),t.ui.draggable,t.widget("ui.resizable",t.ui.mouse,{version:"1.12.1",widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,classes:{"ui-resizable-se":"ui-icon ui-icon-gripsmall-diagonal-se"},containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:90,resize:null,start:null,stop:null},_num:function(t){return parseFloat(t)||0},_isNumber:function(t){return!isNaN(parseFloat(t))},_hasScroll:function(e,i){if("hidden"===t(e).css("overflow"))return!1;var s=i&&"left"===i?"scrollLeft":"scrollTop",n=!1;return e[s]>0?!0:(e[s]=1,n=e[s]>0,e[s]=0,n)},_create:function(){var e,i=this.options,s=this;this._addClass("ui-resizable"),t.extend(this,{_aspectRatio:!!i.aspectRatio,aspectRatio:i.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:i.helper||i.ghost||i.animate?i.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i)&&(this.element.wrap(t("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("ui-resizable",this.element.resizable("instance")),this.elementIsWrapper=!0,e={marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom"),marginLeft:this.originalElement.css("marginLeft")},this.element.css(e),this.originalElement.css("margin",0),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css(e),this._proportionallyResize()),this._setupHandles(),i.autoHide&&t(this.element).on("mouseenter",function(){i.disabled||(s._removeClass("ui-resizable-autohide"),s._handles.show())}).on("mouseleave",function(){i.disabled||s.resizing||(s._addClass("ui-resizable-autohide"),s._handles.hide())}),this._mouseInit()},_destroy:function(){this._mouseDestroy();var e,i=function(e){t(e).removeData("resizable").removeData("ui-resizable").off(".resizable").find(".ui-resizable-handle").remove()};return this.elementIsWrapper&&(i(this.element),e=this.element,this.originalElement.css({position:e.css("position"),width:e.outerWidth(),height:e.outerHeight(),top:e.css("top"),left:e.css("left")}).insertAfter(e),e.remove()),this.originalElement.css("resize",this.originalResizeStyle),i(this.originalElement),this},_setOption:function(t,e){switch(this._super(t,e),t){case"handles":this._removeHandles(),this._setupHandles();break;default:}},_setupHandles:function(){var e,i,s,n,o,a=this.options,r=this;if(this.handles=a.handles||(t(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se"),this._handles=t(),this.handles.constructor===String)for("all"===this.handles&&(this.handles="n,e,s,w,se,sw,ne,nw"),s=this.handles.split(","),this.handles={},i=0;s.length>i;i++)e=t.trim(s[i]),n="ui-resizable-"+e,o=t("<div>"),this._addClass(o,"ui-resizable-handle "+n),o.css({zIndex:a.zIndex}),this.handles[e]=".ui-resizable-"+e,this.element.append(o);this._renderAxis=function(e){var i,s,n,o;e=e||this.element;for(i in this.handles)this.handles[i].constructor===String?this.handles[i]=this.element.children(this.handles[i]).first().show():(this.handles[i].jquery||this.handles[i].nodeType)&&(this.handles[i]=t(this.handles[i]),this._on(this.handles[i],{mousedown:r._mouseDown})),this.elementIsWrapper&&this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i)&&(s=t(this.handles[i],this.element),o=/sw|ne|nw|se|n|s/.test(i)?s.outerHeight():s.outerWidth(),n=["padding",/ne|nw|n/.test(i)?"Top":/se|sw|s/.test(i)?"Bottom":/^e$/.test(i)?"Right":"Left"].join(""),e.css(n,o),this._proportionallyResize()),this._handles=this._handles.add(this.handles[i])},this._renderAxis(this.element),this._handles=this._handles.add(this.element.find(".ui-resizable-handle")),this._handles.disableSelection(),this._handles.on("mouseover",function(){r.resizing||(this.className&&(o=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),r.axis=o&&o[1]?o[1]:"se")}),a.autoHide&&(this._handles.hide(),this._addClass("ui-resizable-autohide"))},_removeHandles:function(){this._handles.remove()},_mouseCapture:function(e){var i,s,n=!1;for(i in this.handles)s=t(this.handles[i])[0],(s===e.target||t.contains(s,e.target))&&(n=!0);return!this.options.disabled&&n},_mouseStart:function(e){var i,s,n,o=this.options,a=this.element;return this.resizing=!0,this._renderProxy(),i=this._num(this.helper.css("left")),s=this._num(this.helper.css("top")),o.containment&&(i+=t(o.containment).scrollLeft()||0,s+=t(o.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:i,top:s},this.size=this._helper?{width:this.helper.width(),height:this.helper.height()}:{width:a.width(),height:a.height()},this.originalSize=this._helper?{width:a.outerWidth(),height:a.outerHeight()}:{width:a.width(),height:a.height()},this.sizeDiff={width:a.outerWidth()-a.width(),height:a.outerHeight()-a.height()},this.originalPosition={left:i,top:s},this.originalMousePosition={left:e.pageX,top:e.pageY},this.aspectRatio="number"==typeof o.aspectRatio?o.aspectRatio:this.originalSize.width/this.originalSize.height||1,n=t(".ui-resizable-"+this.axis).css("cursor"),t("body").css("cursor","auto"===n?this.axis+"-resize":n),this._addClass("ui-resizable-resizing"),this._propagate("start",e),!0},_mouseDrag:function(e){var i,s,n=this.originalMousePosition,o=this.axis,a=e.pageX-n.left||0,r=e.pageY-n.top||0,l=this._change[o];return this._updatePrevProperties(),l?(i=l.apply(this,[e,a,r]),this._updateVirtualBoundaries(e.shiftKey),(this._aspectRatio||e.shiftKey)&&(i=this._updateRatio(i,e)),i=this._respectSize(i,e),this._updateCache(i),this._propagate("resize",e),s=this._applyChanges(),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),t.isEmptyObject(s)||(this._updatePrevProperties(),this._trigger("resize",e,this.ui()),this._applyChanges()),!1):!1},_mouseStop:function(e){this.resizing=!1;var i,s,n,o,a,r,l,h=this.options,c=this;return this._helper&&(i=this._proportionallyResizeElements,s=i.length&&/textarea/i.test(i[0].nodeName),n=s&&this._hasScroll(i[0],"left")?0:c.sizeDiff.height,o=s?0:c.sizeDiff.width,a={width:c.helper.width()-o,height:c.helper.height()-n},r=parseFloat(c.element.css("left"))+(c.position.left-c.originalPosition.left)||null,l=parseFloat(c.element.css("top"))+(c.position.top-c.originalPosition.top)||null,h.animate||this.element.css(t.extend(a,{top:l,left:r})),c.helper.height(c.size.height),c.helper.width(c.size.width),this._helper&&!h.animate&&this._proportionallyResize()),t("body").css("cursor","auto"),this._removeClass("ui-resizable-resizing"),this._propagate("stop",e),this._helper&&this.helper.remove(),!1},_updatePrevProperties:function(){this.prevPosition={top:this.position.top,left:this.position.left},this.prevSize={width:this.size.width,height:this.size.height}},_applyChanges:function(){var t={};return this.position.top!==this.prevPosition.top&&(t.top=this.position.top+"px"),this.position.left!==this.prevPosition.left&&(t.left=this.position.left+"px"),this.size.width!==this.prevSize.width&&(t.width=this.size.width+"px"),this.size.height!==this.prevSize.height&&(t.height=this.size.height+"px"),this.helper.css(t),t},_updateVirtualBoundaries:function(t){var e,i,s,n,o,a=this.options;o={minWidth:this._isNumber(a.minWidth)?a.minWidth:0,maxWidth:this._isNumber(a.maxWidth)?a.maxWidth:1/0,minHeight:this._isNumber(a.minHeight)?a.minHeight:0,maxHeight:this._isNumber(a.maxHeight)?a.maxHeight:1/0},(this._aspectRatio||t)&&(e=o.minHeight*this.aspectRatio,s=o.minWidth/this.aspectRatio,i=o.maxHeight*this.aspectRatio,n=o.maxWidth/this.aspectRatio,e>o.minWidth&&(o.minWidth=e),s>o.minHeight&&(o.minHeight=s),o.maxWidth>i&&(o.maxWidth=i),o.maxHeight>n&&(o.maxHeight=n)),this._vBoundaries=o},_updateCache:function(t){this.offset=this.helper.offset(),this._isNumber(t.left)&&(this.position.left=t.left),this._isNumber(t.top)&&(this.position.top=t.top),this._isNumber(t.height)&&(this.size.height=t.height),this._isNumber(t.width)&&(this.size.width=t.width)},_updateRatio:function(t){var e=this.position,i=this.size,s=this.axis;return this._isNumber(t.height)?t.width=t.height*this.aspectRatio:this._isNumber(t.width)&&(t.height=t.width/this.aspectRatio),"sw"===s&&(t.left=e.left+(i.width-t.width),t.top=null),"nw"===s&&(t.top=e.top+(i.height-t.height),t.left=e.left+(i.width-t.width)),t},_respectSize:function(t){var e=this._vBoundaries,i=this.axis,s=this._isNumber(t.width)&&e.maxWidth&&e.maxWidth<t.width,n=this._isNumber(t.height)&&e.maxHeight&&e.maxHeight<t.height,o=this._isNumber(t.width)&&e.minWidth&&e.minWidth>t.width,a=this._isNumber(t.height)&&e.minHeight&&e.minHeight>t.height,r=this.originalPosition.left+this.originalSize.width,l=this.originalPosition.top+this.originalSize.height,h=/sw|nw|w/.test(i),c=/nw|ne|n/.test(i);return o&&(t.width=e.minWidth),a&&(t.height=e.minHeight),s&&(t.width=e.maxWidth),n&&(t.height=e.maxHeight),o&&h&&(t.left=r-e.minWidth),s&&h&&(t.left=r-e.maxWidth),a&&c&&(t.top=l-e.minHeight),n&&c&&(t.top=l-e.maxHeight),t.width||t.height||t.left||!t.top?t.width||t.height||t.top||!t.left||(t.left=null):t.top=null,t},_getPaddingPlusBorderDimensions:function(t){for(var e=0,i=[],s=[t.css("borderTopWidth"),t.css("borderRightWidth"),t.css("borderBottomWidth"),t.css("borderLeftWidth")],n=[t.css("paddingTop"),t.css("paddingRight"),t.css("paddingBottom"),t.css("paddingLeft")];4>e;e++)i[e]=parseFloat(s[e])||0,i[e]+=parseFloat(n[e])||0;return{height:i[0]+i[2],width:i[1]+i[3]}},_proportionallyResize:function(){if(this._proportionallyResizeElements.length)for(var t,e=0,i=this.helper||this.element;this._proportionallyResizeElements.length>e;e++)t=this._proportionallyResizeElements[e],this.outerDimensions||(this.outerDimensions=this._getPaddingPlusBorderDimensions(t)),t.css({height:i.height()-this.outerDimensions.height||0,width:i.width()-this.outerDimensions.width||0})},_renderProxy:function(){var e=this.element,i=this.options;this.elementOffset=e.offset(),this._helper?(this.helper=this.helper||t("<div style='overflow:hidden;'></div>"),this._addClass(this.helper,this._helper),this.helper.css({width:this.element.outerWidth(),height:this.element.outerHeight(),position:"absolute",left:this.elementOffset.left+"px",top:this.elementOffset.top+"px",zIndex:++i.zIndex}),this.helper.appendTo("body").disableSelection()):this.helper=this.element},_change:{e:function(t,e){return{width:this.originalSize.width+e}},w:function(t,e){var i=this.originalSize,s=this.originalPosition;return{left:s.left+e,width:i.width-e}},n:function(t,e,i){var s=this.originalSize,n=this.originalPosition;return{top:n.top+i,height:s.height-i}},s:function(t,e,i){return{height:this.originalSize.height+i}},se:function(e,i,s){return t.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[e,i,s]))},sw:function(e,i,s){return t.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[e,i,s]))},ne:function(e,i,s){return t.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[e,i,s]))},nw:function(e,i,s){return t.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[e,i,s]))}},_propagate:function(e,i){t.ui.plugin.call(this,e,[i,this.ui()]),"resize"!==e&&this._trigger(e,i,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),t.ui.plugin.add("resizable","animate",{stop:function(e){var i=t(this).resizable("instance"),s=i.options,n=i._proportionallyResizeElements,o=n.length&&/textarea/i.test(n[0].nodeName),a=o&&i._hasScroll(n[0],"left")?0:i.sizeDiff.height,r=o?0:i.sizeDiff.width,l={width:i.size.width-r,height:i.size.height-a},h=parseFloat(i.element.css("left"))+(i.position.left-i.originalPosition.left)||null,c=parseFloat(i.element.css("top"))+(i.position.top-i.originalPosition.top)||null;i.element.animate(t.extend(l,c&&h?{top:c,left:h}:{}),{duration:s.animateDuration,easing:s.animateEasing,step:function(){var s={width:parseFloat(i.element.css("width")),height:parseFloat(i.element.css("height")),top:parseFloat(i.element.css("top")),left:parseFloat(i.element.css("left"))};n&&n.length&&t(n[0]).css({width:s.width,height:s.height}),i._updateCache(s),i._propagate("resize",e)}})}}),t.ui.plugin.add("resizable","containment",{start:function(){var e,i,s,n,o,a,r,l=t(this).resizable("instance"),h=l.options,c=l.element,u=h.containment,d=u instanceof t?u.get(0):/parent/.test(u)?c.parent().get(0):u;d&&(l.containerElement=t(d),/document/.test(u)||u===document?(l.containerOffset={left:0,top:0},l.containerPosition={left:0,top:0},l.parentData={element:t(document),left:0,top:0,width:t(document).width(),height:t(document).height()||document.body.parentNode.scrollHeight}):(e=t(d),i=[],t(["Top","Right","Left","Bottom"]).each(function(t,s){i[t]=l._num(e.css("padding"+s))}),l.containerOffset=e.offset(),l.containerPosition=e.position(),l.containerSize={height:e.innerHeight()-i[3],width:e.innerWidth()-i[1]},s=l.containerOffset,n=l.containerSize.height,o=l.containerSize.width,a=l._hasScroll(d,"left")?d.scrollWidth:o,r=l._hasScroll(d)?d.scrollHeight:n,l.parentData={element:d,left:s.left,top:s.top,width:a,height:r}))},resize:function(e){var i,s,n,o,a=t(this).resizable("instance"),r=a.options,l=a.containerOffset,h=a.position,c=a._aspectRatio||e.shiftKey,u={top:0,left:0},d=a.containerElement,p=!0;d[0]!==document&&/static/.test(d.css("position"))&&(u=l),h.left<(a._helper?l.left:0)&&(a.size.width=a.size.width+(a._helper?a.position.left-l.left:a.position.left-u.left),c&&(a.size.height=a.size.width/a.aspectRatio,p=!1),a.position.left=r.helper?l.left:0),h.top<(a._helper?l.top:0)&&(a.size.height=a.size.height+(a._helper?a.position.top-l.top:a.position.top),c&&(a.size.width=a.size.height*a.aspectRatio,p=!1),a.position.top=a._helper?l.top:0),n=a.containerElement.get(0)===a.element.parent().get(0),o=/relative|absolute/.test(a.containerElement.css("position")),n&&o?(a.offset.left=a.parentData.left+a.position.left,a.offset.top=a.parentData.top+a.position.top):(a.offset.left=a.element.offset().left,a.offset.top=a.element.offset().top),i=Math.abs(a.sizeDiff.width+(a._helper?a.offset.left-u.left:a.offset.left-l.left)),s=Math.abs(a.sizeDiff.height+(a._helper?a.offset.top-u.top:a.offset.top-l.top)),i+a.size.width>=a.parentData.width&&(a.size.width=a.parentData.width-i,c&&(a.size.height=a.size.width/a.aspectRatio,p=!1)),s+a.size.height>=a.parentData.height&&(a.size.height=a.parentData.height-s,c&&(a.size.width=a.size.height*a.aspectRatio,p=!1)),p||(a.position.left=a.prevPosition.left,a.position.top=a.prevPosition.top,a.size.width=a.prevSize.width,a.size.height=a.prevSize.height)},stop:function(){var e=t(this).resizable("instance"),i=e.options,s=e.containerOffset,n=e.containerPosition,o=e.containerElement,a=t(e.helper),r=a.offset(),l=a.outerWidth()-e.sizeDiff.width,h=a.outerHeight()-e.sizeDiff.height;e._helper&&!i.animate&&/relative/.test(o.css("position"))&&t(this).css({left:r.left-n.left-s.left,width:l,height:h}),e._helper&&!i.animate&&/static/.test(o.css("position"))&&t(this).css({left:r.left-n.left-s.left,width:l,height:h})}}),t.ui.plugin.add("resizable","alsoResize",{start:function(){var e=t(this).resizable("instance"),i=e.options;t(i.alsoResize).each(function(){var e=t(this);e.data("ui-resizable-alsoresize",{width:parseFloat(e.width()),height:parseFloat(e.height()),left:parseFloat(e.css("left")),top:parseFloat(e.css("top"))})})},resize:function(e,i){var s=t(this).resizable("instance"),n=s.options,o=s.originalSize,a=s.originalPosition,r={height:s.size.height-o.height||0,width:s.size.width-o.width||0,top:s.position.top-a.top||0,left:s.position.left-a.left||0};t(n.alsoResize).each(function(){var e=t(this),s=t(this).data("ui-resizable-alsoresize"),n={},o=e.parents(i.originalElement[0]).length?["width","height"]:["width","height","top","left"];t.each(o,function(t,e){var i=(s[e]||0)+(r[e]||0);i&&i>=0&&(n[e]=i||null)}),e.css(n)})},stop:function(){t(this).removeData("ui-resizable-alsoresize")}}),t.ui.plugin.add("resizable","ghost",{start:function(){var e=t(this).resizable("instance"),i=e.size;e.ghost=e.originalElement.clone(),e.ghost.css({opacity:.25,display:"block",position:"relative",height:i.height,width:i.width,margin:0,left:0,top:0}),e._addClass(e.ghost,"ui-resizable-ghost"),t.uiBackCompat!==!1&&"string"==typeof e.options.ghost&&e.ghost.addClass(this.options.ghost),e.ghost.appendTo(e.helper)},resize:function(){var e=t(this).resizable("instance");e.ghost&&e.ghost.css({position:"relative",height:e.size.height,width:e.size.width})},stop:function(){var e=t(this).resizable("instance");e.ghost&&e.helper&&e.helper.get(0).removeChild(e.ghost.get(0))}}),t.ui.plugin.add("resizable","grid",{resize:function(){var e,i=t(this).resizable("instance"),s=i.options,n=i.size,o=i.originalSize,a=i.originalPosition,r=i.axis,l="number"==typeof s.grid?[s.grid,s.grid]:s.grid,h=l[0]||1,c=l[1]||1,u=Math.round((n.width-o.width)/h)*h,d=Math.round((n.height-o.height)/c)*c,p=o.width+u,f=o.height+d,g=s.maxWidth&&p>s.maxWidth,m=s.maxHeight&&f>s.maxHeight,_=s.minWidth&&s.minWidth>p,v=s.minHeight&&s.minHeight>f;s.grid=l,_&&(p+=h),v&&(f+=c),g&&(p-=h),m&&(f-=c),/^(se|s|e)$/.test(r)?(i.size.width=p,i.size.height=f):/^(ne)$/.test(r)?(i.size.width=p,i.size.height=f,i.position.top=a.top-d):/^(sw)$/.test(r)?(i.size.width=p,i.size.height=f,i.position.left=a.left-u):((0>=f-c||0>=p-h)&&(e=i._getPaddingPlusBorderDimensions(this)),f-c>0?(i.size.height=f,i.position.top=a.top-d):(f=c-e.height,i.size.height=f,i.position.top=a.top+o.height-f),p-h>0?(i.size.width=p,i.position.left=a.left-u):(p=h-e.width,i.size.width=p,i.position.left=a.left+o.width-p))}}),t.ui.resizable,t.widget("ui.sortable",t.ui.mouse,{version:"1.12.1",widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3,activate:null,beforeStop:null,change:null,deactivate:null,out:null,over:null,receive:null,remove:null,sort:null,start:null,stop:null,update:null},_isOverAxis:function(t,e,i){return t>=e&&e+i>t},_isFloating:function(t){return/left|right/.test(t.css("float"))||/inline|table-cell/.test(t.css("display"))},_create:function(){this.containerCache={},this._addClass("ui-sortable"),this.refresh(),this.offset=this.element.offset(),this._mouseInit(),this._setHandleClassName(),this.ready=!0},_setOption:function(t,e){this._super(t,e),"handle"===t&&this._setHandleClassName()},_setHandleClassName:function(){var e=this;this._removeClass(this.element.find(".ui-sortable-handle"),"ui-sortable-handle"),t.each(this.items,function(){e._addClass(this.instance.options.handle?this.item.find(this.instance.options.handle):this.item,"ui-sortable-handle")})},_destroy:function(){this._mouseDestroy();for(var t=this.items.length-1;t>=0;t--)this.items[t].item.removeData(this.widgetName+"-item");return this},_mouseCapture:function(e,i){var s=null,n=!1,o=this;return this.reverting?!1:this.options.disabled||"static"===this.options.type?!1:(this._refreshItems(e),t(e.target).parents().each(function(){return t.data(this,o.widgetName+"-item")===o?(s=t(this),!1):void 0}),t.data(e.target,o.widgetName+"-item")===o&&(s=t(e.target)),s?!this.options.handle||i||(t(this.options.handle,s).find("*").addBack().each(function(){this===e.target&&(n=!0)}),n)?(this.currentItem=s,this._removeCurrentsFromItems(),!0):!1:!1)},_mouseStart:function(e,i,s){var n,o,a=this.options;if(this.currentContainer=this,this.refreshPositions(),this.helper=this._createHelper(e),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},t.extend(this.offset,{click:{left:e.pageX-this.offset.left,top:e.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),this.originalPosition=this._generatePosition(e),this.originalPageX=e.pageX,this.originalPageY=e.pageY,a.cursorAt&&this._adjustOffsetFromHelper(a.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!==this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),a.containment&&this._setContainment(),a.cursor&&"auto"!==a.cursor&&(o=this.document.find("body"),this.storedCursor=o.css("cursor"),o.css("cursor",a.cursor),this.storedStylesheet=t("<style>*{ cursor: "+a.cursor+" !important; }</style>").appendTo(o)),a.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",a.opacity)),a.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",a.zIndex)),this.scrollParent[0]!==this.document[0]&&"HTML"!==this.scrollParent[0].tagName&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",e,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions(),!s)for(n=this.containers.length-1;n>=0;n--)this.containers[n]._trigger("activate",e,this._uiHash(this));return t.ui.ddmanager&&(t.ui.ddmanager.current=this),t.ui.ddmanager&&!a.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e),this.dragging=!0,this._addClass(this.helper,"ui-sortable-helper"),this._mouseDrag(e),!0},_mouseDrag:function(e){var i,s,n,o,a=this.options,r=!1;for(this.position=this._generatePosition(e),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs),this.options.scroll&&(this.scrollParent[0]!==this.document[0]&&"HTML"!==this.scrollParent[0].tagName?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-e.pageY<a.scrollSensitivity?this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop+a.scrollSpeed:e.pageY-this.overflowOffset.top<a.scrollSensitivity&&(this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop-a.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-e.pageX<a.scrollSensitivity?this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft+a.scrollSpeed:e.pageX-this.overflowOffset.left<a.scrollSensitivity&&(this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft-a.scrollSpeed)):(e.pageY-this.document.scrollTop()<a.scrollSensitivity?r=this.document.scrollTop(this.document.scrollTop()-a.scrollSpeed):this.window.height()-(e.pageY-this.document.scrollTop())<a.scrollSensitivity&&(r=this.document.scrollTop(this.document.scrollTop()+a.scrollSpeed)),e.pageX-this.document.scrollLeft()<a.scrollSensitivity?r=this.document.scrollLeft(this.document.scrollLeft()-a.scrollSpeed):this.window.width()-(e.pageX-this.document.scrollLeft())<a.scrollSensitivity&&(r=this.document.scrollLeft(this.document.scrollLeft()+a.scrollSpeed))),r!==!1&&t.ui.ddmanager&&!a.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e)),this.positionAbs=this._convertPositionTo("absolute"),this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),i=this.items.length-1;i>=0;i--)if(s=this.items[i],n=s.item[0],o=this._intersectsWithPointer(s),o&&s.instance===this.currentContainer&&n!==this.currentItem[0]&&this.placeholder[1===o?"next":"prev"]()[0]!==n&&!t.contains(this.placeholder[0],n)&&("semi-dynamic"===this.options.type?!t.contains(this.element[0],n):!0)){if(this.direction=1===o?"down":"up","pointer"!==this.options.tolerance&&!this._intersectsWithSides(s))break;this._rearrange(e,s),this._trigger("change",e,this._uiHash());break}return this._contactContainers(e),t.ui.ddmanager&&t.ui.ddmanager.drag(this,e),this._trigger("sort",e,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(e,i){if(e){if(t.ui.ddmanager&&!this.options.dropBehaviour&&t.ui.ddmanager.drop(this,e),this.options.revert){var s=this,n=this.placeholder.offset(),o=this.options.axis,a={};o&&"x"!==o||(a.left=n.left-this.offset.parent.left-this.margins.left+(this.offsetParent[0]===this.document[0].body?0:this.offsetParent[0].scrollLeft)),o&&"y"!==o||(a.top=n.top-this.offset.parent.top-this.margins.top+(this.offsetParent[0]===this.document[0].body?0:this.offsetParent[0].scrollTop)),this.reverting=!0,t(this.helper).animate(a,parseInt(this.options.revert,10)||500,function(){s._clear(e)})}else this._clear(e,i);return!1}},cancel:function(){if(this.dragging){this._mouseUp(new t.Event("mouseup",{target:null})),"original"===this.options.helper?(this.currentItem.css(this._storedCSS),this._removeClass(this.currentItem,"ui-sortable-helper")):this.currentItem.show();for(var e=this.containers.length-1;e>=0;e--)this.containers[e]._trigger("deactivate",null,this._uiHash(this)),this.containers[e].containerCache.over&&(this.containers[e]._trigger("out",null,this._uiHash(this)),this.containers[e].containerCache.over=0)}return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),"original"!==this.options.helper&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),t.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?t(this.domPosition.prev).after(this.currentItem):t(this.domPosition.parent).prepend(this.currentItem)),this},serialize:function(e){var i=this._getItemsAsjQuery(e&&e.connected),s=[];return e=e||{},t(i).each(function(){var i=(t(e.item||this).attr(e.attribute||"id")||"").match(e.expression||/(.+)[\-=_](.+)/);i&&s.push((e.key||i[1]+"[]")+"="+(e.key&&e.expression?i[1]:i[2]))}),!s.length&&e.key&&s.push(e.key+"="),s.join("&")},toArray:function(e){var i=this._getItemsAsjQuery(e&&e.connected),s=[];return e=e||{},i.each(function(){s.push(t(e.item||this).attr(e.attribute||"id")||"")}),s},_intersectsWith:function(t){var e=this.positionAbs.left,i=e+this.helperProportions.width,s=this.positionAbs.top,n=s+this.helperProportions.height,o=t.left,a=o+t.width,r=t.top,l=r+t.height,h=this.offset.click.top,c=this.offset.click.left,u="x"===this.options.axis||s+h>r&&l>s+h,d="y"===this.options.axis||e+c>o&&a>e+c,p=u&&d;return"pointer"===this.options.tolerance||this.options.forcePointerForContainers||"pointer"!==this.options.tolerance&&this.helperProportions[this.floating?"width":"height"]>t[this.floating?"width":"height"]?p:e+this.helperProportions.width/2>o&&a>i-this.helperProportions.width/2&&s+this.helperProportions.height/2>r&&l>n-this.helperProportions.height/2},_intersectsWithPointer:function(t){var e,i,s="x"===this.options.axis||this._isOverAxis(this.positionAbs.top+this.offset.click.top,t.top,t.height),n="y"===this.options.axis||this._isOverAxis(this.positionAbs.left+this.offset.click.left,t.left,t.width),o=s&&n;return o?(e=this._getDragVerticalDirection(),i=this._getDragHorizontalDirection(),this.floating?"right"===i||"down"===e?2:1:e&&("down"===e?2:1)):!1},_intersectsWithSides:function(t){var e=this._isOverAxis(this.positionAbs.top+this.offset.click.top,t.top+t.height/2,t.height),i=this._isOverAxis(this.positionAbs.left+this.offset.click.left,t.left+t.width/2,t.width),s=this._getDragVerticalDirection(),n=this._getDragHorizontalDirection();
return this.floating&&n?"right"===n&&i||"left"===n&&!i:s&&("down"===s&&e||"up"===s&&!e)},_getDragVerticalDirection:function(){var t=this.positionAbs.top-this.lastPositionAbs.top;return 0!==t&&(t>0?"down":"up")},_getDragHorizontalDirection:function(){var t=this.positionAbs.left-this.lastPositionAbs.left;return 0!==t&&(t>0?"right":"left")},refresh:function(t){return this._refreshItems(t),this._setHandleClassName(),this.refreshPositions(),this},_connectWith:function(){var t=this.options;return t.connectWith.constructor===String?[t.connectWith]:t.connectWith},_getItemsAsjQuery:function(e){function i(){r.push(this)}var s,n,o,a,r=[],l=[],h=this._connectWith();if(h&&e)for(s=h.length-1;s>=0;s--)for(o=t(h[s],this.document[0]),n=o.length-1;n>=0;n--)a=t.data(o[n],this.widgetFullName),a&&a!==this&&!a.options.disabled&&l.push([t.isFunction(a.options.items)?a.options.items.call(a.element):t(a.options.items,a.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),a]);for(l.push([t.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):t(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]),s=l.length-1;s>=0;s--)l[s][0].each(i);return t(r)},_removeCurrentsFromItems:function(){var e=this.currentItem.find(":data("+this.widgetName+"-item)");this.items=t.grep(this.items,function(t){for(var i=0;e.length>i;i++)if(e[i]===t.item[0])return!1;return!0})},_refreshItems:function(e){this.items=[],this.containers=[this];var i,s,n,o,a,r,l,h,c=this.items,u=[[t.isFunction(this.options.items)?this.options.items.call(this.element[0],e,{item:this.currentItem}):t(this.options.items,this.element),this]],d=this._connectWith();if(d&&this.ready)for(i=d.length-1;i>=0;i--)for(n=t(d[i],this.document[0]),s=n.length-1;s>=0;s--)o=t.data(n[s],this.widgetFullName),o&&o!==this&&!o.options.disabled&&(u.push([t.isFunction(o.options.items)?o.options.items.call(o.element[0],e,{item:this.currentItem}):t(o.options.items,o.element),o]),this.containers.push(o));for(i=u.length-1;i>=0;i--)for(a=u[i][1],r=u[i][0],s=0,h=r.length;h>s;s++)l=t(r[s]),l.data(this.widgetName+"-item",a),c.push({item:l,instance:a,width:0,height:0,left:0,top:0})},refreshPositions:function(e){this.floating=this.items.length?"x"===this.options.axis||this._isFloating(this.items[0].item):!1,this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());var i,s,n,o;for(i=this.items.length-1;i>=0;i--)s=this.items[i],s.instance!==this.currentContainer&&this.currentContainer&&s.item[0]!==this.currentItem[0]||(n=this.options.toleranceElement?t(this.options.toleranceElement,s.item):s.item,e||(s.width=n.outerWidth(),s.height=n.outerHeight()),o=n.offset(),s.left=o.left,s.top=o.top);if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(i=this.containers.length-1;i>=0;i--)o=this.containers[i].element.offset(),this.containers[i].containerCache.left=o.left,this.containers[i].containerCache.top=o.top,this.containers[i].containerCache.width=this.containers[i].element.outerWidth(),this.containers[i].containerCache.height=this.containers[i].element.outerHeight();return this},_createPlaceholder:function(e){e=e||this;var i,s=e.options;s.placeholder&&s.placeholder.constructor!==String||(i=s.placeholder,s.placeholder={element:function(){var s=e.currentItem[0].nodeName.toLowerCase(),n=t("<"+s+">",e.document[0]);return e._addClass(n,"ui-sortable-placeholder",i||e.currentItem[0].className)._removeClass(n,"ui-sortable-helper"),"tbody"===s?e._createTrPlaceholder(e.currentItem.find("tr").eq(0),t("<tr>",e.document[0]).appendTo(n)):"tr"===s?e._createTrPlaceholder(e.currentItem,n):"img"===s&&n.attr("src",e.currentItem.attr("src")),i||n.css("visibility","hidden"),n},update:function(t,n){(!i||s.forcePlaceholderSize)&&(n.height()||n.height(e.currentItem.innerHeight()-parseInt(e.currentItem.css("paddingTop")||0,10)-parseInt(e.currentItem.css("paddingBottom")||0,10)),n.width()||n.width(e.currentItem.innerWidth()-parseInt(e.currentItem.css("paddingLeft")||0,10)-parseInt(e.currentItem.css("paddingRight")||0,10)))}}),e.placeholder=t(s.placeholder.element.call(e.element,e.currentItem)),e.currentItem.after(e.placeholder),s.placeholder.update(e,e.placeholder)},_createTrPlaceholder:function(e,i){var s=this;e.children().each(function(){t("<td>&#160;</td>",s.document[0]).attr("colspan",t(this).attr("colspan")||1).appendTo(i)})},_contactContainers:function(e){var i,s,n,o,a,r,l,h,c,u,d=null,p=null;for(i=this.containers.length-1;i>=0;i--)if(!t.contains(this.currentItem[0],this.containers[i].element[0]))if(this._intersectsWith(this.containers[i].containerCache)){if(d&&t.contains(this.containers[i].element[0],d.element[0]))continue;d=this.containers[i],p=i}else this.containers[i].containerCache.over&&(this.containers[i]._trigger("out",e,this._uiHash(this)),this.containers[i].containerCache.over=0);if(d)if(1===this.containers.length)this.containers[p].containerCache.over||(this.containers[p]._trigger("over",e,this._uiHash(this)),this.containers[p].containerCache.over=1);else{for(n=1e4,o=null,c=d.floating||this._isFloating(this.currentItem),a=c?"left":"top",r=c?"width":"height",u=c?"pageX":"pageY",s=this.items.length-1;s>=0;s--)t.contains(this.containers[p].element[0],this.items[s].item[0])&&this.items[s].item[0]!==this.currentItem[0]&&(l=this.items[s].item.offset()[a],h=!1,e[u]-l>this.items[s][r]/2&&(h=!0),n>Math.abs(e[u]-l)&&(n=Math.abs(e[u]-l),o=this.items[s],this.direction=h?"up":"down"));if(!o&&!this.options.dropOnEmpty)return;if(this.currentContainer===this.containers[p])return this.currentContainer.containerCache.over||(this.containers[p]._trigger("over",e,this._uiHash()),this.currentContainer.containerCache.over=1),void 0;o?this._rearrange(e,o,null,!0):this._rearrange(e,null,this.containers[p].element,!0),this._trigger("change",e,this._uiHash()),this.containers[p]._trigger("change",e,this._uiHash(this)),this.currentContainer=this.containers[p],this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[p]._trigger("over",e,this._uiHash(this)),this.containers[p].containerCache.over=1}},_createHelper:function(e){var i=this.options,s=t.isFunction(i.helper)?t(i.helper.apply(this.element[0],[e,this.currentItem])):"clone"===i.helper?this.currentItem.clone():this.currentItem;return s.parents("body").length||t("parent"!==i.appendTo?i.appendTo:this.currentItem[0].parentNode)[0].appendChild(s[0]),s[0]===this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),(!s[0].style.width||i.forceHelperSize)&&s.width(this.currentItem.width()),(!s[0].style.height||i.forceHelperSize)&&s.height(this.currentItem.height()),s},_adjustOffsetFromHelper:function(e){"string"==typeof e&&(e=e.split(" ")),t.isArray(e)&&(e={left:+e[0],top:+e[1]||0}),"left"in e&&(this.offset.click.left=e.left+this.margins.left),"right"in e&&(this.offset.click.left=this.helperProportions.width-e.right+this.margins.left),"top"in e&&(this.offset.click.top=e.top+this.margins.top),"bottom"in e&&(this.offset.click.top=this.helperProportions.height-e.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var e=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==this.document[0]&&t.contains(this.scrollParent[0],this.offsetParent[0])&&(e.left+=this.scrollParent.scrollLeft(),e.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===this.document[0].body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&t.ui.ie)&&(e={top:0,left:0}),{top:e.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:e.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var t=this.currentItem.position();return{top:t.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:t.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var e,i,s,n=this.options;"parent"===n.containment&&(n.containment=this.helper[0].parentNode),("document"===n.containment||"window"===n.containment)&&(this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,"document"===n.containment?this.document.width():this.window.width()-this.helperProportions.width-this.margins.left,("document"===n.containment?this.document.height()||document.body.parentNode.scrollHeight:this.window.height()||this.document[0].body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]),/^(document|window|parent)$/.test(n.containment)||(e=t(n.containment)[0],i=t(n.containment).offset(),s="hidden"!==t(e).css("overflow"),this.containment=[i.left+(parseInt(t(e).css("borderLeftWidth"),10)||0)+(parseInt(t(e).css("paddingLeft"),10)||0)-this.margins.left,i.top+(parseInt(t(e).css("borderTopWidth"),10)||0)+(parseInt(t(e).css("paddingTop"),10)||0)-this.margins.top,i.left+(s?Math.max(e.scrollWidth,e.offsetWidth):e.offsetWidth)-(parseInt(t(e).css("borderLeftWidth"),10)||0)-(parseInt(t(e).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,i.top+(s?Math.max(e.scrollHeight,e.offsetHeight):e.offsetHeight)-(parseInt(t(e).css("borderTopWidth"),10)||0)-(parseInt(t(e).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top])},_convertPositionTo:function(e,i){i||(i=this.position);var s="absolute"===e?1:-1,n="absolute"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&t.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,o=/(html|body)/i.test(n[0].tagName);return{top:i.top+this.offset.relative.top*s+this.offset.parent.top*s-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():o?0:n.scrollTop())*s,left:i.left+this.offset.relative.left*s+this.offset.parent.left*s-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():o?0:n.scrollLeft())*s}},_generatePosition:function(e){var i,s,n=this.options,o=e.pageX,a=e.pageY,r="absolute"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&t.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,l=/(html|body)/i.test(r[0].tagName);return"relative"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&this.scrollParent[0]!==this.offsetParent[0]||(this.offset.relative=this._getRelativeOffset()),this.originalPosition&&(this.containment&&(e.pageX-this.offset.click.left<this.containment[0]&&(o=this.containment[0]+this.offset.click.left),e.pageY-this.offset.click.top<this.containment[1]&&(a=this.containment[1]+this.offset.click.top),e.pageX-this.offset.click.left>this.containment[2]&&(o=this.containment[2]+this.offset.click.left),e.pageY-this.offset.click.top>this.containment[3]&&(a=this.containment[3]+this.offset.click.top)),n.grid&&(i=this.originalPageY+Math.round((a-this.originalPageY)/n.grid[1])*n.grid[1],a=this.containment?i-this.offset.click.top>=this.containment[1]&&i-this.offset.click.top<=this.containment[3]?i:i-this.offset.click.top>=this.containment[1]?i-n.grid[1]:i+n.grid[1]:i,s=this.originalPageX+Math.round((o-this.originalPageX)/n.grid[0])*n.grid[0],o=this.containment?s-this.offset.click.left>=this.containment[0]&&s-this.offset.click.left<=this.containment[2]?s:s-this.offset.click.left>=this.containment[0]?s-n.grid[0]:s+n.grid[0]:s)),{top:a-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():l?0:r.scrollTop()),left:o-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():l?0:r.scrollLeft())}},_rearrange:function(t,e,i,s){i?i[0].appendChild(this.placeholder[0]):e.item[0].parentNode.insertBefore(this.placeholder[0],"down"===this.direction?e.item[0]:e.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var n=this.counter;this._delay(function(){n===this.counter&&this.refreshPositions(!s)})},_clear:function(t,e){function i(t,e,i){return function(s){i._trigger(t,s,e._uiHash(e))}}this.reverting=!1;var s,n=[];if(!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null,this.helper[0]===this.currentItem[0]){for(s in this._storedCSS)("auto"===this._storedCSS[s]||"static"===this._storedCSS[s])&&(this._storedCSS[s]="");this.currentItem.css(this._storedCSS),this._removeClass(this.currentItem,"ui-sortable-helper")}else this.currentItem.show();for(this.fromOutside&&!e&&n.push(function(t){this._trigger("receive",t,this._uiHash(this.fromOutside))}),!this.fromOutside&&this.domPosition.prev===this.currentItem.prev().not(".ui-sortable-helper")[0]&&this.domPosition.parent===this.currentItem.parent()[0]||e||n.push(function(t){this._trigger("update",t,this._uiHash())}),this!==this.currentContainer&&(e||(n.push(function(t){this._trigger("remove",t,this._uiHash())}),n.push(function(t){return function(e){t._trigger("receive",e,this._uiHash(this))}}.call(this,this.currentContainer)),n.push(function(t){return function(e){t._trigger("update",e,this._uiHash(this))}}.call(this,this.currentContainer)))),s=this.containers.length-1;s>=0;s--)e||n.push(i("deactivate",this,this.containers[s])),this.containers[s].containerCache.over&&(n.push(i("out",this,this.containers[s])),this.containers[s].containerCache.over=0);if(this.storedCursor&&(this.document.find("body").css("cursor",this.storedCursor),this.storedStylesheet.remove()),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex","auto"===this._storedZIndex?"":this._storedZIndex),this.dragging=!1,e||this._trigger("beforeStop",t,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.cancelHelperRemoval||(this.helper[0]!==this.currentItem[0]&&this.helper.remove(),this.helper=null),!e){for(s=0;n.length>s;s++)n[s].call(this,t);this._trigger("stop",t,this._uiHash())}return this.fromOutside=!1,!this.cancelHelperRemoval},_trigger:function(){t.Widget.prototype._trigger.apply(this,arguments)===!1&&this.cancel()},_uiHash:function(e){var i=e||this;return{helper:i.helper,placeholder:i.placeholder||t([]),position:i.position,originalPosition:i.originalPosition,offset:i.positionAbs,item:i.currentItem,sender:e?e.element:null}}})});

/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 *
 * Requires: 1.2.2+
 */

(function($) {

var types = ['DOMMouseScroll', 'mousewheel'];

if ($.event.fixHooks) {
    for ( var i=types.length; i; ) {
        $.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
    }
}

$.event.special.mousewheel = {
    setup: function() {
        if ( this.addEventListener ) {
            for ( var i=types.length; i; ) {
                this.addEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = handler;
        }
    },

    teardown: function() {
        if ( this.removeEventListener ) {
            for ( var i=types.length; i; ) {
                this.removeEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = null;
        }
    }
};

$.fn.extend({
    mousewheel: function(fn) {
        return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
    },

    unmousewheel: function(fn) {
        return this.unbind("mousewheel", fn);
    }
});


function handler(event) {
    var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
    event = $.event.fix(orgEvent);
    event.type = "mousewheel";

    // Old school scrollwheel delta
    if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta/120; }
    if ( orgEvent.detail     ) { delta = -orgEvent.detail/3; }

    // New school multidimensional scroll (touchpads) deltas
    deltaY = delta;

    // Gecko
    if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
        deltaY = 0;
        deltaX = -1*delta;
    }

    // Webkit
    if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
    if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }

    // Add event and delta to the front of the arguments
    args.unshift(event, delta, deltaX, deltaY);

    return ($.event.dispatch || $.event.handle).apply(this, args);
}

})(jQuery);

/**
 * jQuery mousehold plugin - fires an event while the mouse is clicked down.
 * Additionally, the function, when executed, is passed a single
 * argument representing the count of times the event has been fired during
 * this session of the mouse hold.
 *
 * @author Remy Sharp (leftlogic.com)
 * @date 2006-12-15
 * @example $("img").mousehold(200, function(i){  })
 * @desc Repeats firing the passed function while the mouse is clicked down
 *
 * @name mousehold
 * @type jQuery
 * @param Number timeout The frequency to repeat the event in milliseconds
 * @param Function fn A function to execute
 * @cat Plugin
 */

(function($) {

$.fn.mousehold = function(timeout, f) {
  if (timeout && typeof timeout == 'function') {
    f = timeout;
    timeout = 100;
  }
  if (f && typeof f == 'function') {
    var timer = 0;
    var fireStep = 0;
    return this.each(function() {
      $(this).mousedown(function() {
        fireStep = 1;
        var ctr = 0;
        var t = this;
        timer = setInterval(function() {
          ctr++;
          f.call(t, ctr);
          fireStep = 2;
        }, timeout);
      })

      clearMousehold = function() {
        clearInterval(timer);
        if (fireStep == 1) f.call(this, 1);
        fireStep = 0;
      }

      $(this).mouseout(clearMousehold);
      $(this).mouseup(clearMousehold);
    })
  }
}

})(jQuery);


// tipsy, facebook style tooltips for jquery
// version 1.0.0a
// (c) 2008-2010 jason frame [jason@onehackoranother.com]
// released under the MIT license

(function($) {
    
    function maybeCall(thing, ctx) {
        return (typeof thing == 'function') ? (thing.call(ctx)) : thing;
    };
    
    function isElementInDOM(ele) {
      while (ele = ele.parentNode) {
        if (ele == document) return true;
      }
      return false;
    };
    
    function Tipsy(element, options) {
        this.$element = $(element);
        this.options = options;
        this.enabled = true;
        this.fixTitle();
    };
    
    Tipsy.prototype = {
        show: function() {
            var title = this.getTitle();
            if (title && this.enabled) {
                var $tip = this.tip();
                
                $tip.find('.tipsy-inner')[this.options.html ? 'html' : 'text'](title);
                $tip[0].className = 'tipsy'; // reset classname in case of dynamic gravity
                $tip.remove().css({top: 0, left: 0, visibility: 'hidden', display: 'block'}).prependTo(document.body);
                
                var pos = $.extend({}, this.$element.offset(), {
                    width: this.$element[0].offsetWidth,
                    height: this.$element[0].offsetHeight
                });
                
                var actualWidth = $tip[0].offsetWidth,
                    actualHeight = $tip[0].offsetHeight,
                    gravity = maybeCall(this.options.gravity, this.$element[0]);
                
                var tp;
                switch (gravity.charAt(0)) {
                    case 'n':
                        tp = {top: pos.top + pos.height + this.options.offset, left: pos.left + pos.width / 2 - actualWidth / 2};
                        break;
                    case 's':
                        tp = {top: pos.top - actualHeight - this.options.offset, left: pos.left + pos.width / 2 - actualWidth / 2};
                        break;
                    case 'e':
                        tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth - this.options.offset};
                        break;
                    case 'w':
                        tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width + this.options.offset};
                        break;
                }
                
                if (gravity.length == 2) {
                    if (gravity.charAt(1) == 'w') {
                        tp.left = pos.left + pos.width / 2 - 15;
                    } else {
                        tp.left = pos.left + pos.width / 2 - actualWidth + 15;
                    }
                }
                
                $tip.css(tp).addClass('tipsy-' + gravity);
                $tip.find('.tipsy-arrow')[0].className = 'tipsy-arrow tipsy-arrow-' + gravity.charAt(0);
                if (this.options.className) {
                    $tip.addClass(maybeCall(this.options.className, this.$element[0]));
                }
                
                if (this.options.fade) {
                    $tip.stop().css({opacity: 0, display: 'block', visibility: 'visible'}).animate({opacity: this.options.opacity});
                } else {
                    $tip.css({visibility: 'visible', opacity: this.options.opacity});
                }
            }
        },
        
        hide: function() {
            if (this.options.fade) {
                this.tip().stop().fadeOut(function() { $(this).remove(); });
            } else {
                this.tip().remove();
            }
        },
        
        fixTitle: function() {
            var $e = this.$element;
            if ($e.attr('title') || typeof($e.attr('original-title')) != 'string') {
                $e.attr('original-title', $e.attr('title') || '').removeAttr('title');
            }
        },
        
        getTitle: function() {
            var title, $e = this.$element, o = this.options;
            this.fixTitle();
            var title, o = this.options;
            if (typeof o.title == 'string') {
                title = $e.attr(o.title == 'title' ? 'original-title' : o.title);
            } else if (typeof o.title == 'function') {
                title = o.title.call($e[0]);
            }
            title = ('' + title).replace(/(^\s*|\s*$)/, "");
            return title || o.fallback;
        },
        
        tip: function() {
            if (!this.$tip) {
                this.$tip = $('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"></div>');
                this.$tip.data('tipsy-pointee', this.$element[0]);
            }
            return this.$tip;
        },
        
        validate: function() {
            if (!this.$element[0].parentNode) {
                this.hide();
                this.$element = null;
                this.options = null;
            }
        },
        
        enable: function() { this.enabled = true; },
        disable: function() { this.enabled = false; },
        toggleEnabled: function() { this.enabled = !this.enabled; }
    };
    
    $.fn.tipsy = function(options) {
        
        if (options === true) {
            return this.data('tipsy');
        } else if (typeof options == 'string') {
            var tipsy = this.data('tipsy');
            if (tipsy) tipsy[options]();
            return this;
        }
        
        options = $.extend({}, $.fn.tipsy.defaults, options);
        
        function get(ele) {
            var tipsy = $.data(ele, 'tipsy');
            if (!tipsy) {
                tipsy = new Tipsy(ele, $.fn.tipsy.elementOptions(ele, options));
                $.data(ele, 'tipsy', tipsy);
            }
            return tipsy;
        }
        
        function enter() {
            var tipsy = get(this);
            tipsy.hoverState = 'in';
            if (options.delayIn == 0) {
                tipsy.show();
            } else {
                tipsy.fixTitle();
                setTimeout(function() { if (tipsy.hoverState == 'in') tipsy.show(); }, options.delayIn);
            }
        };
        
        function leave() {
            var tipsy = get(this);
            tipsy.hoverState = 'out';
            if (options.delayOut == 0) {
                tipsy.hide();
            } else {
                setTimeout(function() { if (tipsy.hoverState == 'out') tipsy.hide(); }, options.delayOut);
            }
        };
        
        if (!options.live) this.each(function() { get(this); });
        
        if (options.trigger != 'manual') {
            var binder   = options.live ? 'live' : 'bind',
                eventIn  = options.trigger == 'hover' ? 'mouseenter' : 'focus',
                eventOut = options.trigger == 'hover' ? 'mouseleave' : 'blur';
            this[binder](eventIn, enter)[binder](eventOut, leave);
        }
        
        return this;
        
    };
    
    $.fn.tipsy.defaults = {
        className: null,
        delayIn: 0,
        delayOut: 0,
        fade: false,
        fallback: '',
        gravity: 'n',
        html: false,
        live: false,
        offset: 0,
        opacity: 0.8,
        title: 'title',
        trigger: 'hover'
    };
    
    $.fn.tipsy.revalidate = function() {
      $('.tipsy').each(function() {
        var pointee = $.data(this, 'tipsy-pointee');
        if (!pointee || !isElementInDOM(pointee)) {
          $(this).remove();
        }
      });
    };
    
    // Overwrite this method to provide options on a per-element basis.
    // For example, you could store the gravity in a 'tipsy-gravity' attribute:
    // return $.extend({}, options, {gravity: $(ele).attr('tipsy-gravity') || 'n' });
    // (remember - do not modify 'options' in place!)
    $.fn.tipsy.elementOptions = function(ele, options) {
        return $.metadata ? $.extend({}, options, $(ele).metadata()) : options;
    };
    
    $.fn.tipsy.autoNS = function() {
        return $(this).offset().top > ($(document).scrollTop() + $(window).height() / 2) ? 's' : 'n';
    };
    
    $.fn.tipsy.autoWE = function() {
        return $(this).offset().left > ($(document).scrollLeft() + $(window).width() / 2) ? 'e' : 'w';
    };
    
    /**
     * yields a closure of the supplied parameters, producing a function that takes
     * no arguments and is suitable for use as an autogravity function like so:
     *
     * @param margin (int) - distance from the viewable region edge that an
     *        element should be before setting its tooltip's gravity to be away
     *        from that edge.
     * @param prefer (string, e.g. 'n', 'sw', 'w') - the direction to prefer
     *        if there are no viewable region edges effecting the tooltip's
     *        gravity. It will try to vary from this minimally, for example,
     *        if 'sw' is preferred and an element is near the right viewable 
     *        region edge, but not the top edge, it will set the gravity for
     *        that element's tooltip to be 'se', preserving the southern
     *        component.
     */
     $.fn.tipsy.autoBounds = function(margin, prefer) {
		return function() {
			var dir = {ns: prefer[0], ew: (prefer.length > 1 ? prefer[1] : false)},
			    boundTop = $(document).scrollTop() + margin,
			    boundLeft = $(document).scrollLeft() + margin,
			    $this = $(this);

			if ($this.offset().top < boundTop) dir.ns = 'n';
			if ($this.offset().left < boundLeft) dir.ew = 'w';
			if ($(window).width() + $(document).scrollLeft() - $this.offset().left < margin) dir.ew = 'e';
			if ($(window).height() + $(document).scrollTop() - $this.offset().top < margin) dir.ns = 's';

			return dir.ns + (dir.ew ? dir.ew : '');
		}
	};
    
})(jQuery);

/*
  Base.js, version 1.1
  Copyright 2006-2007, Dean Edwards
  License: http://www.opensource.org/licenses/mit-license.php
*/

var Base = function() {
  // dummy
};

Base.extend = function(_instance, _static) { // subclass
  var extend = Base.prototype.extend;
  
  // build the prototype
  Base._prototyping = true;
  var proto = new this;
  extend.call(proto, _instance);
  delete Base._prototyping;
  
  // create the wrapper for the constructor function
  //var constructor = proto.constructor.valueOf(); //-dean
  var constructor = proto.constructor;
  var klass = proto.constructor = function() {
    if (!Base._prototyping) {
      if (this._constructing || this.constructor == klass) { // instantiation
        this._constructing = true;
        constructor.apply(this, arguments);
        delete this._constructing;
      } else if (arguments[0] != null) { // casting
        return (arguments[0].extend || extend).call(arguments[0], proto);
      }
    }
  };
  
  // build the class interface
  klass.ancestor = this;
  klass.extend = this.extend;
  klass.forEach = this.forEach;
  klass.implement = this.implement;
  klass.prototype = proto;
  klass.toString = this.toString;
  klass.valueOf = function(type) {
    //return (type == "object") ? klass : constructor; //-dean
    return (type == "object") ? klass : constructor.valueOf();
  };
  extend.call(klass, _static);
  // class initialisation
  if (typeof klass.init == "function") klass.init();
  return klass;
};

Base.prototype = {  
  extend: function(source, value) {
    if (arguments.length > 1) { // extending with a name/value pair
      var ancestor = this[source];
      if (ancestor && (typeof value == "function") && // overriding a method?
        // the valueOf() comparison is to avoid circular references
        (!ancestor.valueOf || ancestor.valueOf() != value.valueOf()) &&
        /\bbase\b/.test(value)) {
        // get the underlying method
        var method = value.valueOf();
        // override
        value = function() {
          var previous = this.base || Base.prototype.base;
          this.base = ancestor;
          var returnValue = method.apply(this, arguments);
          this.base = previous;
          return returnValue;
        };
        // point to the underlying method
        value.valueOf = function(type) {
          return (type == "object") ? value : method;
        };
        value.toString = Base.toString;
      }
      this[source] = value;
    } else if (source) { // extending with an object literal
      var extend = Base.prototype.extend;
      // if this object has a customised extend method then use it
      if (!Base._prototyping && typeof this != "function") {
        extend = this.extend || extend;
      }
      var proto = {toSource: null};
      // do the "toString" and other methods manually
      var hidden = ["constructor", "toString", "valueOf"];
      // if we are prototyping then include the constructor
      var i = Base._prototyping ? 0 : 1;
      while (key = hidden[i++]) {
        if (source[key] != proto[key]) {
          extend.call(this, key, source[key]);

        }
      }
      // copy each of the source object's properties to this object
      for (var key in source) {
        if (!proto[key]) extend.call(this, key, source[key]);
      }
    }
    return this;
  },

  base: function() {
    // call this method from any other method to invoke that method's ancestor
  }
};

// initialise
Base = Base.extend({
  constructor: function() {
    this.extend(arguments[0]);
  }
}, {
  ancestor: Object,
  version: "1.1",
  
  forEach: function(object, block, context) {
    for (var key in object) {
      if (this.prototype[key] === undefined) {
        block.call(context, object[key], key, object);
      }
    }
  },
    
  implement: function() {
    for (var i = 0; i < arguments.length; i++) {
      if (typeof arguments[i] == "function") {
        // if it's a function, call it
        arguments[i](this.prototype);
      } else {
        // add the interface using the extend method
        this.prototype.extend(arguments[i]);
      }
    }
    return this;
  },
  
  toString: function() {
    return String(this.valueOf());
  }
});


/******************************************************************************
  rtree.js - General-Purpose Non-Recursive Javascript R-Tree Library
  Version 0.6.2, December 5st 2009

  Copyright (c) 2009 Jon-Carlos Rivera

  Permission is hereby granted, free of charge, to any person obtaining
  a copy of this software and associated documentation files (the
  "Software"), to deal in the Software without restriction, including
  without limitation the rights to use, copy, modify, merge, publish,
  distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so, subject to
  the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
  LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
  WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

  Jon-Carlos Rivera - imbcmdth@hotmail.com
******************************************************************************/

/**
 * RTree - A simple r-tree structure for great results.
 * @constructor
 */
var RTree = function(width){
  // Variables to control tree-dimensions
  var _Min_Width = 3;  // Minimum width of any node before a merge
  var _Max_Width = 6;  // Maximum width of any node before a split
  if(!isNaN(width)){ _Min_Width = Math.floor(width/2.0); _Max_Width = width;}
  // Start with an empty root-tree
  var _T = {x:0, y:0, w:0, h:0, id:"root", nodes:[] };

  var isArray = function(o) {
    return Object.prototype.toString.call(o) === '[object Array]';
  };

  /* @function
   * @description Function to generate unique strings for element IDs
   * @param {String} n      The prefix to use for the IDs generated.
   * @return {String}        A guarenteed unique ID.
   */
    var _name_to_id = (function() {
        // hide our idCache inside this closure
        var idCache = {};

        // return the api: our function that returns a unique string with incrementing number appended to given idPrefix
        return function(idPrefix) {
            var idVal = 0;
            if(idPrefix in idCache) {
                idVal = idCache[idPrefix]++;
            } else {
                idCache[idPrefix] = 0;
            }
            return idPrefix + "_" + idVal;
        }
    })();

  // This is my special addition to the world of r-trees
  // every other (simple) method I found produced crap trees
  // this skews insertions to prefering squarer and emptier nodes
  RTree.Rectangle.squarified_ratio = function(l, w, fill) {
    // Area of new enlarged rectangle
    var lperi = (l + w) / 2.0; // Average size of a side of the new rectangle
    var larea = l * w; // Area of new rectangle
    // return the ratio of the perimeter to the area - the closer to 1 we are,
    // the more "square" a rectangle is. conversly, when approaching zero the
    // more elongated a rectangle is
    var lgeo = larea / (lperi*lperi);
    return(larea * fill / lgeo);
  };

  /* find the best specific node(s) for object to be deleted from
   * [ leaf node parent ] = _remove_subtree(rectangle, object, root)
   * @private
   */
  var _remove_subtree = function(rect, obj, root) {
    var hit_stack = []; // Contains the elements that overlap
    var count_stack = []; // Contains the elements that overlap
    var ret_array = [];
    var current_depth = 1;

    if(!rect || !RTree.Rectangle.overlap_rectangle(rect, root))
     return ret_array;

    var ret_obj = {x:rect.x, y:rect.y, w:rect.w, h:rect.h, target:obj};

    count_stack.push(root.nodes.length);
    hit_stack.push(root);

    do {
      var tree = hit_stack.pop();
      var i = count_stack.pop()-1;

      if("target" in ret_obj) { // We are searching for a target
        while(i >= 0)  {
          var ltree = tree.nodes[i];
          if(RTree.Rectangle.overlap_rectangle(ret_obj, ltree)) {
            if( (ret_obj.target && "leaf" in ltree && ltree.leaf === ret_obj.target)
              ||(!ret_obj.target && ("leaf" in ltree || RTree.Rectangle.contains_rectangle(ltree, ret_obj)))) { // A Match !!
              // Yup we found a match...
              // we can cancel search and start walking up the list
              if("nodes" in ltree) {// If we are deleting a node not a leaf...
                ret_array = _search_subtree(ltree, true, [], ltree);
                tree.nodes.splice(i, 1);
              } else {
                ret_array = tree.nodes.splice(i, 1);
              }
              // Resize MBR down...
              RTree.Rectangle.make_MBR(tree.nodes, tree);
              delete ret_obj.target;
              if(tree.nodes.length < _Min_Width) { // Underflow
                ret_obj.nodes = _search_subtree(tree, true, [], tree);
              }
              break;
            }/*  else if("load" in ltree) { // A load
            }*/  else if("nodes" in ltree) { // Not a Leaf
              current_depth += 1;
              count_stack.push(i);
              hit_stack.push(tree);
              tree = ltree;
              i = ltree.nodes.length;
            }
          }
          i -= 1;
        }
      } else if("nodes" in ret_obj) { // We are unsplitting
        tree.nodes.splice(i+1, 1); // Remove unsplit node
        // ret_obj.nodes contains a list of elements removed from the tree so far
        if(tree.nodes.length > 0)
          RTree.Rectangle.make_MBR(tree.nodes, tree);
        for(var t = 0;t<ret_obj.nodes.length;t++)
          _insert_subtree(ret_obj.nodes[t], tree);
        ret_obj.nodes.length = 0;
        if(hit_stack.length == 0 && tree.nodes.length <= 1) { // Underflow..on root!
          ret_obj.nodes = _search_subtree(tree, true, ret_obj.nodes, tree);
          tree.nodes.length = 0;
          hit_stack.push(tree);
          count_stack.push(1);
        } else if(hit_stack.length > 0 && tree.nodes.length < _Min_Width) { // Underflow..AGAIN!
          ret_obj.nodes = _search_subtree(tree, true, ret_obj.nodes, tree);
          tree.nodes.length = 0;
        }else {
          delete ret_obj.nodes; // Just start resizing
        }
      } else { // we are just resizing
        RTree.Rectangle.make_MBR(tree.nodes, tree);
      }
      current_depth -= 1;
    }while(hit_stack.length > 0);

    return(ret_array);
  };

  /* choose the best damn node for rectangle to be inserted into
   * [ leaf node parent ] = _choose_leaf_subtree(rectangle, root to start search at)
   * @private
   */
  var _choose_leaf_subtree = function(rect, root) {
    var best_choice_index = -1;
    var best_choice_stack = [];
    var best_choice_area;

    var load_callback = function(local_tree, local_node){
      return(function(data) {
        local_tree._attach_data(local_node, data);
      });
    };

    best_choice_stack.push(root);
    var nodes = root.nodes;

    do {
      if(best_choice_index != -1)  {
        best_choice_stack.push(nodes[best_choice_index]);
        nodes = nodes[best_choice_index].nodes;
        best_choice_index = -1;
      }

      for(var i = nodes.length-1; i >= 0; i--) {
        var ltree = nodes[i];
        if("leaf" in ltree) {
          // Bail out of everything and start inserting
          best_choice_index = -1;
          break;
        } /*else if(ltree.load) {
          throw( "Can't insert into partially loaded tree ... yet!");
          //jQuery.getJSON(ltree.load, load_callback(this, ltree));
          //delete ltree.load;
        }*/
        // Area of new enlarged rectangle
        var old_lratio = RTree.Rectangle.squarified_ratio(ltree.w, ltree.h, ltree.nodes.length+1);

        // Enlarge rectangle to fit new rectangle
        var nw = Math.max(ltree.x+ltree.w, rect.x+rect.w) - Math.min(ltree.x, rect.x);
        var nh = Math.max(ltree.y+ltree.h, rect.y+rect.h) - Math.min(ltree.y, rect.y);

        // Area of new enlarged rectangle
        var lratio = RTree.Rectangle.squarified_ratio(nw, nh, ltree.nodes.length+2);

        if(best_choice_index < 0 || Math.abs(lratio - old_lratio) < best_choice_area) {
          best_choice_area = Math.abs(lratio - old_lratio); best_choice_index = i;
        }
      }
    }while(best_choice_index != -1);

    return(best_choice_stack);
  };

  /* split a set of nodes into two roughly equally-filled nodes
   * [ an array of two new arrays of nodes ] = linear_split(array of nodes)
   * @private
   */
  var _linear_split = function(nodes) {
    var n = _pick_linear(nodes);
    while(nodes.length > 0)  {
      _pick_next(nodes, n[0], n[1]);
    }
    return(n);
  };

  /* insert the best source rectangle into the best fitting parent node: a or b
   * [] = pick_next(array of source nodes, target node array a, target node array b)
   * @private
   */
  var _pick_next = function(nodes, a, b) {
    // Area of new enlarged rectangle
    var area_a = RTree.Rectangle.squarified_ratio(a.w, a.h, a.nodes.length+1);
    var area_b = RTree.Rectangle.squarified_ratio(b.w, b.h, b.nodes.length+1);
    var high_area_delta;
    var high_area_node;
    var lowest_growth_group;

    for(var i = nodes.length-1; i>=0;i--) {
      var l = nodes[i];
      var new_area_a = {};
      new_area_a.x = Math.min(a.x, l.x); new_area_a.y = Math.min(a.y, l.y);
      new_area_a.w = Math.max(a.x+a.w, l.x+l.w) - new_area_a.x;  new_area_a.h = Math.max(a.y+a.h, l.y+l.h) - new_area_a.y;
      var change_new_area_a = Math.abs(RTree.Rectangle.squarified_ratio(new_area_a.w, new_area_a.h, a.nodes.length+2) - area_a);

      var new_area_b = {};
      new_area_b.x = Math.min(b.x, l.x); new_area_b.y = Math.min(b.y, l.y);
      new_area_b.w = Math.max(b.x+b.w, l.x+l.w) - new_area_b.x;  new_area_b.h = Math.max(b.y+b.h, l.y+l.h) - new_area_b.y;
      var change_new_area_b = Math.abs(RTree.Rectangle.squarified_ratio(new_area_b.w, new_area_b.h, b.nodes.length+2) - area_b);

      if( !high_area_node || !high_area_delta || Math.abs( change_new_area_b - change_new_area_a ) < high_area_delta ) {
        high_area_node = i;
        high_area_delta = Math.abs(change_new_area_b-change_new_area_a);
        lowest_growth_group = change_new_area_b < change_new_area_a ? b : a;
      }
    }
    var temp_node = nodes.splice(high_area_node, 1)[0];
    if(a.nodes.length + nodes.length + 1 <= _Min_Width)  {
      a.nodes.push(temp_node);
      RTree.Rectangle.expand_rectangle(a, temp_node);
    }  else if(b.nodes.length + nodes.length + 1 <= _Min_Width) {
      b.nodes.push(temp_node);
      RTree.Rectangle.expand_rectangle(b, temp_node);
    }
    else {
      lowest_growth_group.nodes.push(temp_node);
      RTree.Rectangle.expand_rectangle(lowest_growth_group, temp_node);
    }
  };

  /* pick the "best" two starter nodes to use as seeds using the "linear" criteria
   * [ an array of two new arrays of nodes ] = pick_linear(array of source nodes)
   * @private
   */
  var _pick_linear = function(nodes) {
    var lowest_high_x = nodes.length-1;
    var highest_low_x = 0;
    var lowest_high_y = nodes.length-1;
    var highest_low_y = 0;
        var t1, t2;

    for(var i = nodes.length-2; i>=0;i--)  {
      var l = nodes[i];
      if(l.x > nodes[highest_low_x].x ) highest_low_x = i;
      else if(l.x+l.w < nodes[lowest_high_x].x+nodes[lowest_high_x].w) lowest_high_x = i;
      if(l.y > nodes[highest_low_y].y ) highest_low_y = i;
      else if(l.y+l.h < nodes[lowest_high_y].y+nodes[lowest_high_y].h) lowest_high_y = i;
    }
    var dx = Math.abs((nodes[lowest_high_x].x+nodes[lowest_high_x].w) - nodes[highest_low_x].x);
    var dy = Math.abs((nodes[lowest_high_y].y+nodes[lowest_high_y].h) - nodes[highest_low_y].y);
    if( dx > dy )  {
      if(lowest_high_x > highest_low_x)  {
        t1 = nodes.splice(lowest_high_x, 1)[0];
        t2 = nodes.splice(highest_low_x, 1)[0];
      }  else {
        t2 = nodes.splice(highest_low_x, 1)[0];
        t1 = nodes.splice(lowest_high_x, 1)[0];
      }
    }  else {
      if(lowest_high_y > highest_low_y)  {
        t1 = nodes.splice(lowest_high_y, 1)[0];
        t2 = nodes.splice(highest_low_y, 1)[0];
      }  else {
        t2 = nodes.splice(highest_low_y, 1)[0];
        t1 = nodes.splice(lowest_high_y, 1)[0];
      }
    }
    return([{x:t1.x, y:t1.y, w:t1.w, h:t1.h, nodes:[t1]},
            {x:t2.x, y:t2.y, w:t2.w, h:t2.h, nodes:[t2]} ]);
  };

  var _attach_data = function(node, more_tree){
    node.nodes = more_tree.nodes;
    node.x = more_tree.x; node.y = more_tree.y;
    node.w = more_tree.w; node.h = more_tree.h;
    return(node);
  };

  /* non-recursive internal search function
   * [ nodes | objects ] = _search_subtree(rectangle, [return node data], [array to fill], root to begin search at)
   * @private
   */
  var _search_subtree = function(rect, return_node, return_array, root) {
    var hit_stack = []; // Contains the elements that overlap

    if(!RTree.Rectangle.overlap_rectangle(rect, root))
     return(return_array);

    var load_callback = function(local_tree, local_node){
      return(function(data) {
        local_tree._attach_data(local_node, data);
      });
    };

    hit_stack.push(root.nodes);

    do {
      var nodes = hit_stack.pop();

      for(var i = nodes.length-1; i >= 0; i--) {
        var ltree = nodes[i];
        if(RTree.Rectangle.overlap_rectangle(rect, ltree)) {
          if("nodes" in ltree) { // Not a Leaf
            hit_stack.push(ltree.nodes);
          } else if("leaf" in ltree) { // A Leaf !!
            if(!return_node)
              return_array.push(ltree.leaf);
            else
              return_array.push(ltree);
          }/*  else if("load" in ltree) { // We need to fetch a URL for some more tree data
            jQuery.getJSON(ltree.load, load_callback(this, ltree));
            delete ltree.load;
          //  i++; // Replay this entry
          }*/
        }
      }
    }while(hit_stack.length > 0);

    return(return_array);
  };

  /* non-recursive internal insert function
   * [] = _insert_subtree(rectangle, object to insert, root to begin insertion at)
   * @private
   */
  var _insert_subtree = function(node, root) {
    var bc; // Best Current node
    // Initial insertion is special because we resize the Tree and we don't
    // care about any overflow (seriously, how can the first object overflow?)
    if(root.nodes.length == 0) {
      root.x = node.x; root.y = node.y;
      root.w = node.w; root.h = node.h;
      root.nodes.push(node);
      return;
    }

    // Find the best fitting leaf node
    // choose_leaf returns an array of all tree levels (including root)
    // that were traversed while trying to find the leaf
    var tree_stack = _choose_leaf_subtree(node, root);
    var ret_obj = node;//{x:rect.x,y:rect.y,w:rect.w,h:rect.h, leaf:obj};

    // Walk back up the tree resizing and inserting as needed
    do {
      //handle the case of an empty node (from a split)
      if(bc && "nodes" in bc && bc.nodes.length == 0) {
        var pbc = bc; // Past bc
        bc = tree_stack.pop();
        for(var t=0;t<bc.nodes.length;t++)
          if(bc.nodes[t] === pbc || bc.nodes[t].nodes.length == 0) {
            bc.nodes.splice(t, 1);
            break;
        }
      } else {
        bc = tree_stack.pop();
      }

      // If there is data attached to this ret_obj
      if("leaf" in ret_obj || "nodes" in ret_obj || isArray(ret_obj)) {
        // Do Insert
        if(isArray(ret_obj)) {
          for(var ai = 0; ai < ret_obj.length; ai++) {
            RTree.Rectangle.expand_rectangle(bc, ret_obj[ai]);
          }
          bc.nodes = bc.nodes.concat(ret_obj);
        } else {
          RTree.Rectangle.expand_rectangle(bc, ret_obj);
          bc.nodes.push(ret_obj); // Do Insert
        }

        if(bc.nodes.length <= _Max_Width)  { // Start Resizeing Up the Tree
          ret_obj = {x:bc.x,y:bc.y,w:bc.w,h:bc.h};
        }  else { // Otherwise Split this Node
          // linear_split() returns an array containing two new nodes
          // formed from the split of the previous node's overflow
          var a = _linear_split(bc.nodes);
          ret_obj = a;//[1];

          if(tree_stack.length < 1)  { // If are splitting the root..
            bc.nodes.push(a[0]);
            tree_stack.push(bc);     // Reconsider the root element
            ret_obj = a[1];
          } /*else {
            delete bc;
          }*/
        }
      }  else { // Otherwise Do Resize
        //Just keep applying the new bounding rectangle to the parents..
        RTree.Rectangle.expand_rectangle(bc, ret_obj);
        ret_obj = {x:bc.x,y:bc.y,w:bc.w,h:bc.h};
      }
    } while(tree_stack.length > 0);
  };

  /* quick 'n' dirty function for plugins or manually drawing the tree
   * [ tree ] = RTree.get_tree(): returns the raw tree data. useful for adding
   * @public
   * !! DEPRECATED !!
   */
  this.get_tree = function() {
    return _T;
  };

  /* quick 'n' dirty function for plugins or manually loading the tree
   * [ tree ] = RTree.set_tree(sub-tree, where to attach): returns the raw tree data. useful for adding
   * @public
   * !! DEPRECATED !!
   */
  this.set_tree = function(new_tree, where) {
    if(!where)
      where = _T;
    return(_attach_data(where, new_tree));
  };

  /* non-recursive search function
   * [ nodes | objects ] = RTree.search(rectangle, [return node data], [array to fill])
   * @public
   */
  this.search = function(rect, return_node, return_array) {
    if(arguments.length < 1)
      throw "Wrong number of arguments. RT.Search requires at least a bounding rectangle."

    switch(arguments.length) {
      case 1:
        arguments[1] = false;// Add an "return node" flag - may be removed in future
      case 2:
        arguments[2] = []; // Add an empty array to contain results
      case 3:
        arguments[3] = _T; // Add root node to end of argument list
      default:
        arguments.length = 4;
    }
    return(_search_subtree.apply(this, arguments));
  };

  /* partially-recursive toJSON function
   * [ string ] = RTree.toJSON([rectangle], [tree])
   * @public
   */
  this.toJSON = function(rect, tree) {
    var hit_stack = []; // Contains the elements that overlap
    var count_stack = []; // Contains the elements that overlap
    var return_stack = {}; // Contains the elements that overlap
    var max_depth = 3;  // This triggers recursion and tree-splitting
    var current_depth = 1;
    var return_string = "";

    if(rect && !RTree.Rectangle.overlap_rectangle(rect, _T))
     return "";

    if(!tree)  {
      count_stack.push(_T.nodes.length);
      hit_stack.push(_T.nodes);
      return_string += "var main_tree = {x:"+_T.x.toFixed()+",y:"+_T.y.toFixed()+",w:"+_T.w.toFixed()+",h:"+_T.h.toFixed()+",nodes:[";
    }  else {
      max_depth += 4;
      count_stack.push(tree.nodes.length);
      hit_stack.push(tree.nodes);
      return_string += "var main_tree = {x:"+tree.x.toFixed()+",y:"+tree.y.toFixed()+",w:"+tree.w.toFixed()+",h:"+tree.h.toFixed()+",nodes:[";
    }

    do {
      var nodes = hit_stack.pop();
      var i = count_stack.pop()-1;

      if(i >= 0 && i < nodes.length-1)
        return_string += ",";

      while(i >= 0)  {
        var ltree = nodes[i];
        if(!rect || RTree.Rectangle.overlap_rectangle(rect, ltree)) {
          if(ltree.nodes) { // Not a Leaf
            if(current_depth >= max_depth) {
              var len = return_stack.length;
              var nam = _name_to_id("saved_subtree");
              return_string += "{x:"+ltree.x.toFixed()+",y:"+ltree.y.toFixed()+",w:"+ltree.w.toFixed()+",h:"+ltree.h.toFixed()+",load:'"+nam+".js'}";
              return_stack[nam] = this.toJSON(rect, ltree);
              if(i > 0)
                return_string += ","
            }  else {
              return_string += "{x:"+ltree.x.toFixed()+",y:"+ltree.y.toFixed()+",w:"+ltree.w.toFixed()+",h:"+ltree.h.toFixed()+",nodes:[";
              current_depth += 1;
              count_stack.push(i);
              hit_stack.push(nodes);
              nodes = ltree.nodes;
              i = ltree.nodes.length;
            }
          }  else if(ltree.leaf) { // A Leaf !!
            var data = ltree.leaf.toJSON ? ltree.leaf.toJSON() : JSON.stringify(ltree.leaf);
            return_string += "{x:"+ltree.x.toFixed()+",y:"+ltree.y.toFixed()+",w:"+ltree.w.toFixed()+",h:"+ltree.h.toFixed()+",leaf:" + data + "}";
            if(i > 0)
              return_string += ","
          }  else if(ltree.load) { // A load
            return_string += "{x:"+ltree.x.toFixed()+",y:"+ltree.y.toFixed()+",w:"+ltree.w.toFixed()+",h:"+ltree.h.toFixed()+",load:'" + ltree.load + "'}";
            if(i > 0)
              return_string += ","
          }
        }
        i -= 1;
      }
      if(i < 0)  {
        return_string += "]}"; current_depth -= 1;
      }
    }while(hit_stack.length > 0);

    return_string+=";";

    for(var my_key in return_stack) {
      return_string += "\nvar " + my_key + " = function(){" + return_stack[my_key] + " return(main_tree);};";
    }
    return(return_string);
  };

  /* non-recursive function that deletes a specific
   * [ number ] = RTree.remove(rectangle, obj)
   */
  this.remove = function(rect, obj) {
    if(arguments.length < 1)
      throw "Wrong number of arguments. RT.remove requires at least a bounding rectangle."

    switch(arguments.length) {
      case 1:
        arguments[1] = false; // obj == false for conditionals
      case 2:
        arguments[2] = _T; // Add root node to end of argument list
      default:
        arguments.length = 3;
    }
    if(arguments[1] === false) { // Do area-wide delete
      var numberdeleted = 0;
      var ret_array = [];
      do {
        numberdeleted=ret_array.length;
        ret_array = ret_array.concat(_remove_subtree.apply(this, arguments));
      }while( numberdeleted !=  ret_array.length);
      return ret_array;
    }
    else { // Delete a specific item
      return(_remove_subtree.apply(this, arguments));
    }
  };

  /* non-recursive insert function
   * [] = RTree.insert(rectangle, object to insert)
   */
  this.insert = function(rect, obj) {
    if(arguments.length < 2)
      throw "Wrong number of arguments. RT.Insert requires at least a bounding rectangle and an object."

    return(_insert_subtree({x:rect.x,y:rect.y,w:rect.w,h:rect.h,leaf:obj}, _T));
  };

  /* non-recursive delete function
   * [deleted object] = RTree.remove(rectangle, [object to delete])
   */

//End of RTree
};

/* Rectangle - Generic rectangle object - Not yet used */

RTree.Rectangle = function(ix, iy, iw, ih) { // new Rectangle(bounds) or new Rectangle(x, y, w, h)
  var x, x2, y, y2, w, h;

  if(ix.x) {
    x = ix.x; y = ix.y;
      if(ix.w !== 0 && !ix.w && ix.x2){
        w = ix.x2-ix.x;  h = ix.y2-ix.y;
      }  else {
        w = ix.w;  h = ix.h;
      }
    x2 = x + w; y2 = y + h; // For extra fastitude
  } else {
    x = ix; y = iy;  w = iw;  h = ih;
    x2 = x + w; y2 = y + h; // For extra fastitude
  }

  this.x1 = this.x = function(){return x;};
  this.y1 = this.y = function(){return y;};
  this.x2 = function(){return x2;};
  this.y2 = function(){return y2;};
  this.w = function(){return w;};
  this.h = function(){return h;};

  this.toJSON = function() {
    return('{"x":'+x.toString()+', "y":'+y.toString()+', "w":'+w.toString()+', "h":'+h.toString()+'}');
  };

  this.overlap = function(a) {
    return(this.x() < a.x2() && this.x2() > a.x() && this.y() < a.y2() && this.y2() > a.y());
  };

  this.expand = function(a) {
    var nx = Math.min(this.x(), a.x());
    var ny = Math.min(this.y(), a.y());
    w = Math.max(this.x2(), a.x2()) - nx;
    h = Math.max(this.y2(), a.y2()) - ny;
    x = nx; y = ny;
    return(this);
  };

  this.setRect = function(ix, iy, iw, ih) {
    var x, x2, y, y2, w, h;
    if(ix.x) {
      x = ix.x; y = ix.y;
      if(ix.w !== 0 && !ix.w && ix.x2) {
        w = ix.x2-ix.x;  h = ix.y2-ix.y;
      } else {
        w = ix.w;  h = ix.h;
      }
      x2 = x + w; y2 = y + h; // For extra fastitude
    } else {
      x = ix; y = iy;  w = iw;  h = ih;
      x2 = x + w; y2 = y + h; // For extra fastitude
    }
  };
//End of RTree.Rectangle
};


/* returns true if rectangle 1 overlaps rectangle 2
 * [ boolean ] = overlap_rectangle(rectangle a, rectangle b)
 * @static function
 */
RTree.Rectangle.overlap_rectangle = function(a, b) {
  return(a.x < (b.x+b.w) && (a.x+a.w) > b.x && a.y < (b.y+b.h) && (a.y+a.h) > b.y);
};

/* returns true if rectangle a is contained in rectangle b
 * [ boolean ] = contains_rectangle(rectangle a, rectangle b)
 * @static function
 */
RTree.Rectangle.contains_rectangle = function(a, b) {
  return((a.x+a.w) <= (b.x+b.w) && a.x >= b.x && (a.y+a.h) <= (b.y+b.h) && a.y >= b.y);
};

/* expands rectangle A to include rectangle B, rectangle B is untouched
 * [ rectangle a ] = expand_rectangle(rectangle a, rectangle b)
 * @static function
 */
RTree.Rectangle.expand_rectangle = function(a, b)  {
  var nx = Math.min(a.x, b.x);
  var ny = Math.min(a.y, b.y);
  a.w = Math.max(a.x+a.w, b.x+b.w) - nx;
  a.h = Math.max(a.y+a.h, b.y+b.h) - ny;
  a.x = nx; a.y = ny;
  return(a);
};

/* generates a minimally bounding rectangle for all rectangles in
 * array "nodes". If rect is set, it is modified into the MBR. Otherwise,
 * a new rectangle is generated and returned.
 * [ rectangle a ] = make_MBR(rectangle array nodes, rectangle rect)
 * @static function
 */
RTree.Rectangle.make_MBR = function(nodes, rect) {
  if(nodes.length < 1)
    return({x:0, y:0, w:0, h:0});
    //throw "make_MBR: nodes must contain at least one rectangle!";
  if(!rect)
    rect = {x:nodes[0].x, y:nodes[0].y, w:nodes[0].w, h:nodes[0].h};
  else
    rect.x = nodes[0].x; rect.y = nodes[0].y; rect.w = nodes[0].w; rect.h = nodes[0].h;

  for(var i = nodes.length-1; i>0; i--)
    RTree.Rectangle.expand_rectangle(rect, nodes[i]);

  return(rect);
};

(function(){function C(){}function A(){this.was=[0]}function B(a,b,c){this.hufts=new Int32Array(4320);this.window=new Uint8Array(c);this.end=c;this.checkfn=b;this.mode=0;this.reset(a,null);this.index=this.table=this.left=0;this.blens=null;this.bb=new Int32Array(1);this.tb=new Int32Array(1);this.codes=new D;this.check=this.write=this.read=this.bitb=this.bitk=this.last=0;this.inftree=new E}function D(){}function E(){}function y(a,b,c,d,h){if(0!=h){if(!a)throw"Undef src";if(!c)throw"Undef dest";if(0==
b&&h==a.length)c.set(a,d);else if(T)a=a.subarray(b,b+h),c.set(a,d);else if(1==a.BYTES_PER_ELEMENT&&100<h)a=new Uint8Array(a.buffer,a.byteOffset+b,h),c.set(a,d);else for(var f=0;f<h;++f)c[d+f]=a[b+f]}}function J(a,b,c,d){a=b?c?new Uint8Array(a,b,c):new Uint8Array(a,b,a.byteLength-b):new Uint8Array(a);c=new C;c.inflateInit(15,!0);c.next_in=a;c.next_in_index=0;c.avail_in=a.length;a=[];for(var h=0;;){var f=new Uint8Array(32E3);c.next_out=f;c.next_out_index=0;c.avail_out=f.length;var g=c.inflate(0);if(0!=
g&&1!=g&&-5!=g)throw c.msg;if(0!=c.avail_out){var e=new Uint8Array(f.length-c.avail_out);y(f,0,e,0,f.length-c.avail_out);f=e}a.push(f);h+=f.length;if(1==g||-5==g)break}d&&(d[0]=(b||0)+c.next_in_index);if(1==a.length)return a[0].buffer;b=new Uint8Array(h);for(c=d=0;c<a.length;++c)h=a[c],y(h,0,b,d,h.length),d+=h.length;return b.buffer}function K(a,b){this.block=a;this.offset=b}function G(a,b,c){var d=4294967296*(a[b+6]&255)+16777216*(a[b+5]&255)+65536*(a[b+4]&255)+256*(a[b+3]&255)+(a[b+2]&255);a=a[b+
1]<<8|a[b];return 0!=d||0!=a||c?new K(d,a):null}function L(a,b){b=Math.min(b||1,a.byteLength-50);for(var c=[],d=[0],h=0;d[0]<b;){var f=new Uint8Array(a,d[0],12),f=f[11]<<8|f[10],f=J(a,12+f+d[0],Math.min(65536,a.byteLength-12-f-d[0]),d);d[0]+=8;h+=f.byteLength;c.push(f)}if(1==c.length)return c[0];d=new Uint8Array(h);for(f=h=0;f<c.length;++f){var g=new Uint8Array(c[f]);y(g,0,d,h,g.length);h+=g.length}return d.buffer}function M(a,b){this.minv=a;this.maxv=b}function U(a,b){var c,d=[];--b;d.push(0);for(c=
1+(a>>26);c<=1+(b>>26);++c)d.push(c);for(c=9+(a>>23);c<=9+(b>>23);++c)d.push(c);for(c=73+(a>>20);c<=73+(b>>20);++c)d.push(c);for(c=585+(a>>17);c<=585+(b>>17);++c)d.push(c);for(c=4681+(a>>14);c<=4681+(b>>14);++c)d.push(c);return d}function F(a){this.blob=a}function z(a,b,c,d){d||("object"===typeof b?(d=b,b=void 0):d={});this.url=a;this.start=b||0;c&&(this.end=c);this.opts=d}function N(a){if(!a)return null;for(var b=new Uint8Array(a.length),c=0;c<b.length;++c)b[c]=a.charCodeAt(c);return b.buffer}function O(a,
b){var c=new ArrayBuffer(8),d=new Uint8Array(c),c=new Float32Array(c);d[0]=a[b];d[1]=a[b+1];d[2]=a[b+2];d[3]=a[b+3];return c[0]}function t(a,b){return a[b+3]<<24|a[b+2]<<16|a[b+1]<<8|a[b]}function P(a,b){return a[b+1]<<8|a[b]}function V(a,b){return a[b]}function H(){}function Q(a,b,c,d,h){function f(a){if(!a)return d(null,"Couldn't access BAM");a=L(a,a.byteLength);a=new Uint8Array(a);var b=t(a,0);if(21840194!=b)return d(null,"Not a BAM file, magic=0x"+b.toString(16));for(var c=t(a,4),e="",b=0;b<c;++b)e+=
String.fromCharCode(a[b+8]);e=t(a,c+8);c+=12;g.chrToIndex={};g.indexToChr=[];for(b=0;b<e;++b){for(var f=t(a,c),h="",k=0;k<f-1;++k)h+=String.fromCharCode(a[c+4+k]);t(a,c+f+4);g.chrToIndex[h]=b;0==h.indexOf("chr")?g.chrToIndex[h.substring(3)]=b:g.chrToIndex["chr"+h]=b;g.indexToChr.push(h);c=c+8+f}if(g.indices)return d(g)}var g=new H;g.data=a;g.bai=b;g.indexChunks=c;var e=g.indexChunks?g.indexChunks.minBlockIndex:1E9;if(g.indexChunks){b=g.indexChunks.chunks;g.indices=[];for(var k=0;k<b.length;k++)g.indices[k]=
null;g.data.slice(0,e).fetch(f)}else g.bai.fetch(function(b){var k,q,n;if(b){var l=new Uint8Array(b),u=t(l,0);if(21578050!=u)b=d(null,"Not a BAI file, magic=0x"+u.toString(16));else{u=t(l,4);g.indices=[];for(var s=8,w=0;w<u;++w){var I=s;k=l;var r=n=I;q=t(k,r);for(var r=r+4,v=0;v<q;++v){t(k,r);var x=t(k,r+4),r=r+(8+16*x)}for(var v=t(k,r),r=r+4,x=1E9,y=r,A=0;A<v;++A){var z=G(k,y),y=y+8;if(z){k=z.block;0<z.offset&&(k+=65536);k<x&&(x=k);break}}r+=8*v;k=x;n=r-n;s+=n;e=Math.min(k,e);0<q&&(g.indices[w]=
new Uint8Array(b,I,s-I))}b=!0}}else b="Couldn't access BAI";!0!==b?g.bai.url&&"undefined"===typeof h?(g.bai.url=g.data.url.replace(/.bam$/,".bai"),Q(a,g.bai,c,d,!0)):d(null,b):g.data.slice(0,e).fetch(f)})}function W(){}var x=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535],X=[96,7,256,0,8,80,0,8,16,84,8,115,82,7,31,0,8,112,0,8,48,0,9,192,80,7,10,0,8,96,0,8,32,0,9,160,0,8,0,0,8,128,0,8,64,0,9,224,80,7,6,0,8,88,0,8,24,0,9,144,83,7,59,0,8,120,0,8,56,0,9,208,81,7,17,0,8,104,0,8,40,
0,9,176,0,8,8,0,8,136,0,8,72,0,9,240,80,7,4,0,8,84,0,8,20,85,8,227,83,7,43,0,8,116,0,8,52,0,9,200,81,7,13,0,8,100,0,8,36,0,9,168,0,8,4,0,8,132,0,8,68,0,9,232,80,7,8,0,8,92,0,8,28,0,9,152,84,7,83,0,8,124,0,8,60,0,9,216,82,7,23,0,8,108,0,8,44,0,9,184,0,8,12,0,8,140,0,8,76,0,9,248,80,7,3,0,8,82,0,8,18,85,8,163,83,7,35,0,8,114,0,8,50,0,9,196,81,7,11,0,8,98,0,8,34,0,9,164,0,8,2,0,8,130,0,8,66,0,9,228,80,7,7,0,8,90,0,8,26,0,9,148,84,7,67,0,8,122,0,8,58,0,9,212,82,7,19,0,8,106,0,8,42,0,9,180,0,8,10,0,8,
138,0,8,74,0,9,244,80,7,5,0,8,86,0,8,22,192,8,0,83,7,51,0,8,118,0,8,54,0,9,204,81,7,15,0,8,102,0,8,38,0,9,172,0,8,6,0,8,134,0,8,70,0,9,236,80,7,9,0,8,94,0,8,30,0,9,156,84,7,99,0,8,126,0,8,62,0,9,220,82,7,27,0,8,110,0,8,46,0,9,188,0,8,14,0,8,142,0,8,78,0,9,252,96,7,256,0,8,81,0,8,17,85,8,131,82,7,31,0,8,113,0,8,49,0,9,194,80,7,10,0,8,97,0,8,33,0,9,162,0,8,1,0,8,129,0,8,65,0,9,226,80,7,6,0,8,89,0,8,25,0,9,146,83,7,59,0,8,121,0,8,57,0,9,210,81,7,17,0,8,105,0,8,41,0,9,178,0,8,9,0,8,137,0,8,73,0,9,242,
80,7,4,0,8,85,0,8,21,80,8,258,83,7,43,0,8,117,0,8,53,0,9,202,81,7,13,0,8,101,0,8,37,0,9,170,0,8,5,0,8,133,0,8,69,0,9,234,80,7,8,0,8,93,0,8,29,0,9,154,84,7,83,0,8,125,0,8,61,0,9,218,82,7,23,0,8,109,0,8,45,0,9,186,0,8,13,0,8,141,0,8,77,0,9,250,80,7,3,0,8,83,0,8,19,85,8,195,83,7,35,0,8,115,0,8,51,0,9,198,81,7,11,0,8,99,0,8,35,0,9,166,0,8,3,0,8,131,0,8,67,0,9,230,80,7,7,0,8,91,0,8,27,0,9,150,84,7,67,0,8,123,0,8,59,0,9,214,82,7,19,0,8,107,0,8,43,0,9,182,0,8,11,0,8,139,0,8,75,0,9,246,80,7,5,0,8,87,0,8,
23,192,8,0,83,7,51,0,8,119,0,8,55,0,9,206,81,7,15,0,8,103,0,8,39,0,9,174,0,8,7,0,8,135,0,8,71,0,9,238,80,7,9,0,8,95,0,8,31,0,9,158,84,7,99,0,8,127,0,8,63,0,9,222,82,7,27,0,8,111,0,8,47,0,9,190,0,8,15,0,8,143,0,8,79,0,9,254,96,7,256,0,8,80,0,8,16,84,8,115,82,7,31,0,8,112,0,8,48,0,9,193,80,7,10,0,8,96,0,8,32,0,9,161,0,8,0,0,8,128,0,8,64,0,9,225,80,7,6,0,8,88,0,8,24,0,9,145,83,7,59,0,8,120,0,8,56,0,9,209,81,7,17,0,8,104,0,8,40,0,9,177,0,8,8,0,8,136,0,8,72,0,9,241,80,7,4,0,8,84,0,8,20,85,8,227,83,7,43,
0,8,116,0,8,52,0,9,201,81,7,13,0,8,100,0,8,36,0,9,169,0,8,4,0,8,132,0,8,68,0,9,233,80,7,8,0,8,92,0,8,28,0,9,153,84,7,83,0,8,124,0,8,60,0,9,217,82,7,23,0,8,108,0,8,44,0,9,185,0,8,12,0,8,140,0,8,76,0,9,249,80,7,3,0,8,82,0,8,18,85,8,163,83,7,35,0,8,114,0,8,50,0,9,197,81,7,11,0,8,98,0,8,34,0,9,165,0,8,2,0,8,130,0,8,66,0,9,229,80,7,7,0,8,90,0,8,26,0,9,149,84,7,67,0,8,122,0,8,58,0,9,213,82,7,19,0,8,106,0,8,42,0,9,181,0,8,10,0,8,138,0,8,74,0,9,245,80,7,5,0,8,86,0,8,22,192,8,0,83,7,51,0,8,118,0,8,54,0,9,
205,81,7,15,0,8,102,0,8,38,0,9,173,0,8,6,0,8,134,0,8,70,0,9,237,80,7,9,0,8,94,0,8,30,0,9,157,84,7,99,0,8,126,0,8,62,0,9,221,82,7,27,0,8,110,0,8,46,0,9,189,0,8,14,0,8,142,0,8,78,0,9,253,96,7,256,0,8,81,0,8,17,85,8,131,82,7,31,0,8,113,0,8,49,0,9,195,80,7,10,0,8,97,0,8,33,0,9,163,0,8,1,0,8,129,0,8,65,0,9,227,80,7,6,0,8,89,0,8,25,0,9,147,83,7,59,0,8,121,0,8,57,0,9,211,81,7,17,0,8,105,0,8,41,0,9,179,0,8,9,0,8,137,0,8,73,0,9,243,80,7,4,0,8,85,0,8,21,80,8,258,83,7,43,0,8,117,0,8,53,0,9,203,81,7,13,0,8,101,
0,8,37,0,9,171,0,8,5,0,8,133,0,8,69,0,9,235,80,7,8,0,8,93,0,8,29,0,9,155,84,7,83,0,8,125,0,8,61,0,9,219,82,7,23,0,8,109,0,8,45,0,9,187,0,8,13,0,8,141,0,8,77,0,9,251,80,7,3,0,8,83,0,8,19,85,8,195,83,7,35,0,8,115,0,8,51,0,9,199,81,7,11,0,8,99,0,8,35,0,9,167,0,8,3,0,8,131,0,8,67,0,9,231,80,7,7,0,8,91,0,8,27,0,9,151,84,7,67,0,8,123,0,8,59,0,9,215,82,7,19,0,8,107,0,8,43,0,9,183,0,8,11,0,8,139,0,8,75,0,9,247,80,7,5,0,8,87,0,8,23,192,8,0,83,7,51,0,8,119,0,8,55,0,9,207,81,7,15,0,8,103,0,8,39,0,9,175,0,8,
7,0,8,135,0,8,71,0,9,239,80,7,9,0,8,95,0,8,31,0,9,159,84,7,99,0,8,127,0,8,63,0,9,223,82,7,27,0,8,111,0,8,47,0,9,191,0,8,15,0,8,143,0,8,79,0,9,255],Y=[80,5,1,87,5,257,83,5,17,91,5,4097,81,5,5,89,5,1025,85,5,65,93,5,16385,80,5,3,88,5,513,84,5,33,92,5,8193,82,5,9,90,5,2049,86,5,129,192,5,24577,80,5,2,87,5,385,83,5,25,91,5,6145,81,5,7,89,5,1537,85,5,97,93,5,24577,80,5,4,88,5,769,84,5,49,92,5,12289,82,5,13,90,5,3073,86,5,193,192,5,24577],Z=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,
115,131,163,195,227,258,0,0],aa=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,112,112],ba=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],ca=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];C.prototype.inflateInit=function(a,b){a||(a=15);b&&(b=!1);this.istate=new A;return this.istate.inflateInit(this,b?-a:a)};C.prototype.inflate=function(a){return null==this.istate?-2:this.istate.inflate(this,a)};C.prototype.inflateEnd=
function(){if(null==this.istate)return-2;var a=istate.inflateEnd(this);this.istate=null;return a};C.prototype.inflateSync=function(){return istate.inflateSync(this)};C.prototype.inflateSetDictionary=function(a,b){return istate.inflateSetDictionary(this,a,b)};A.prototype.inflateReset=function(a){if(null==a||null==a.istate)return-2;a.total_in=a.total_out=0;a.msg=null;a.istate.mode=0!=a.istate.nowrap?7:0;a.istate.blocks.reset(a,null);return 0};A.prototype.inflateEnd=function(a){null!=this.blocks&&this.blocks.free(a);
this.blocks=null;return 0};A.prototype.inflateInit=function(a,b){this.blocks=a.msg=null;nowrap=0;0>b&&(b=-b,nowrap=1);if(8>b||15<b)return this.inflateEnd(a),-2;this.wbits=b;a.istate.blocks=new B(a,0!=a.istate.nowrap?null:this,1<<b);this.inflateReset(a);return 0};A.prototype.inflate=function(a,b){var c,d;if(null==a||null==a.istate||null==a.next_in)return-2;b=4==b?-5:0;for(c=-5;;)switch(a.istate.mode){case 0:if(0==a.avail_in)return c;c=b;a.avail_in--;a.total_in++;if(8!=((a.istate.method=a.next_in[a.next_in_index++])&
15)){a.istate.mode=13;a.msg="unknown compression method";a.istate.marker=5;break}if((a.istate.method>>4)+8>a.istate.wbits){a.istate.mode=13;a.msg="invalid window size";a.istate.marker=5;break}a.istate.mode=1;case 1:if(0==a.avail_in)return c;c=b;a.avail_in--;a.total_in++;d=a.next_in[a.next_in_index++]&255;if(0!=((a.istate.method<<8)+d)%31){a.istate.mode=13;a.msg="incorrect header check";a.istate.marker=5;break}if(0==(d&32)){a.istate.mode=7;break}a.istate.mode=2;case 2:if(0==a.avail_in)return c;c=b;
a.avail_in--;a.total_in++;a.istate.need=(a.next_in[a.next_in_index++]&255)<<24&4278190080;a.istate.mode=3;case 3:if(0==a.avail_in)return c;c=b;a.avail_in--;a.total_in++;a.istate.need+=(a.next_in[a.next_in_index++]&255)<<16&16711680;a.istate.mode=4;case 4:if(0==a.avail_in)return c;c=b;a.avail_in--;a.total_in++;a.istate.need+=(a.next_in[a.next_in_index++]&255)<<8&65280;a.istate.mode=5;case 5:if(0==a.avail_in)return c;a.avail_in--;a.total_in++;a.istate.need+=a.next_in[a.next_in_index++]&255;a.adler=
a.istate.need;a.istate.mode=6;return 2;case 6:return a.istate.mode=13,a.msg="need dictionary",a.istate.marker=0,-2;case 7:c=a.istate.blocks.proc(a,c);if(-3==c){a.istate.mode=13;a.istate.marker=0;break}0==c&&(c=b);if(1!=c)return c;c=b;a.istate.blocks.reset(a,a.istate.was);if(0!=a.istate.nowrap){a.istate.mode=12;break}a.istate.mode=8;case 8:if(0==a.avail_in)return c;c=b;a.avail_in--;a.total_in++;a.istate.need=(a.next_in[a.next_in_index++]&255)<<24&4278190080;a.istate.mode=9;case 9:if(0==a.avail_in)return c;
c=b;a.avail_in--;a.total_in++;a.istate.need+=(a.next_in[a.next_in_index++]&255)<<16&16711680;a.istate.mode=10;case 10:if(0==a.avail_in)return c;c=b;a.avail_in--;a.total_in++;a.istate.need+=(a.next_in[a.next_in_index++]&255)<<8&65280;a.istate.mode=11;case 11:if(0==a.avail_in)return c;c=b;a.avail_in--;a.total_in++;a.istate.need+=a.next_in[a.next_in_index++]&255;if(a.istate.was[0]!=a.istate.need){a.istate.mode=13;a.msg="incorrect data check";a.istate.marker=5;break}a.istate.mode=12;case 12:return 1;
case 13:return-3;default:return-2}};A.prototype.inflateSetDictionary=function(a,b,c){var d=0,h=c;if(null==a||null==a.istate||6!=a.istate.mode)return-2;if(a._adler.adler32(1,b,0,c)!=a.adler)return-3;a.adler=a._adler.adler32(0,null,0,0);h>=1<<a.istate.wbits&&(h=(1<<a.istate.wbits)-1,d=c-h);a.istate.blocks.set_dictionary(b,d,h);a.istate.mode=7;return 0};var da=[0,0,255,255];A.prototype.inflateSync=function(a){var b,c,d;if(null==a||null==a.istate)return-2;13!=a.istate.mode&&(a.istate.mode=13,a.istate.marker=
0);if(0==(b=a.avail_in))return-5;c=a.next_in_index;for(d=a.istate.marker;0!=b&&4>d;)a.next_in[c]==da[d]?d++:d=0!=a.next_in[c]?0:4-d,c++,b--;a.total_in+=c-a.next_in_index;a.next_in_index=c;a.avail_in=b;a.istate.marker=d;if(4!=d)return-3;b=a.total_in;c=a.total_out;this.inflateReset(a);a.total_in=b;a.total_out=c;a.istate.mode=7;return 0};A.prototype.inflateSyncPoint=function(a){return null==a||null==a.istate||null==a.istate.blocks?-2:a.istate.blocks.sync_point()};var R=[16,17,18,0,8,7,9,6,10,5,11,4,
12,3,13,2,14,1,15];B.prototype.reset=function(a,b){b&&(b[0]=this.check);6==this.mode&&this.codes.free(a);this.read=this.write=this.bitb=this.bitk=this.mode=0;this.checkfn&&(a.adler=this.check=a._adler.adler32(0,null,0,0))};B.prototype.proc=function(a,b){var c,d,h,f,g,e,k;f=a.next_in_index;g=a.avail_in;d=this.bitb;h=this.bitk;e=this.write;for(k=e<this.read?this.read-e-1:this.end-e;;)switch(this.mode){case 0:for(;3>h;){if(0!=g)b=0;else return this.bitb=d,this.bitk=h,a.avail_in=g,a.total_in+=f-a.next_in_index,
a.next_in_index=f,this.write=e,this.inflate_flush(a,b);g--;d|=(a.next_in[f++]&255)<<h;h+=8}c=d&7;this.last=c&1;switch(c>>>1){case 0:d>>>=3;h-=3;c=h&7;d>>>=c;h-=c;this.mode=1;break;case 1:var m=new Int32Array(1),p=new Int32Array(1),q=[],n=[];c=p;var l=q,u=n;m[0]=9;c[0]=5;l[0]=X;u[0]=Y;this.codes.init(m[0],p[0],q[0],0,n[0],0,a);d>>>=3;h-=3;this.mode=6;break;case 2:d>>>=3;h-=3;this.mode=3;break;case 3:return d>>>=3,h-=3,this.mode=13,a.msg="invalid block type",b=-3,this.bitb=d,this.bitk=h,a.avail_in=
g,a.total_in+=f-a.next_in_index,a.next_in_index=f,this.write=e,this.inflate_flush(a,b)}break;case 1:for(;32>h;){if(0!=g)b=0;else return this.bitb=d,this.bitk=h,a.avail_in=g,a.total_in+=f-a.next_in_index,a.next_in_index=f,this.write=e,this.inflate_flush(a,b);g--;d|=(a.next_in[f++]&255)<<h;h+=8}if((~d>>>16&65535)!=(d&65535))return this.mode=13,a.msg="invalid stored block lengths",b=-3,this.bitb=d,this.bitk=h,a.avail_in=g,a.total_in+=f-a.next_in_index,a.next_in_index=f,this.write=e,this.inflate_flush(a,
b);this.left=d&65535;d=h=0;this.mode=0!=this.left?2:0!=this.last?7:0;break;case 2:if(0==g)return this.bitb=d,this.bitk=h,a.avail_in=g,a.total_in+=f-a.next_in_index,a.next_in_index=f,write=e,this.inflate_flush(a,b);if(0==k&&(e==end&&0!=read&&(e=0,k=e<this.read?this.read-e-1:this.end-e),0==k&&(this.write=e,b=this.inflate_flush(a,b),e=this.write,k=e<this.read?this.read-e-1:this.end-e,e==this.end&&0!=this.read&&(e=0,k=e<this.read?this.read-e-1:this.end-e),0==k)))return this.bitb=d,this.bitk=h,a.avail_in=
g,a.total_in+=f-a.next_in_index,a.next_in_index=f,this.write=e,this.inflate_flush(a,b);b=0;c=this.left;c>g&&(c=g);c>k&&(c=k);y(a.next_in,f,this.window,e,c);f+=c;g-=c;e+=c;k-=c;if(0!=(this.left-=c))break;this.mode=0!=this.last?7:0;break;case 3:for(;14>h;){if(0!=g)b=0;else return this.bitb=d,this.bitk=h,a.avail_in=g,a.total_in+=f-a.next_in_index,a.next_in_index=f,this.write=e,this.inflate_flush(a,b);g--;d|=(a.next_in[f++]&255)<<h;h+=8}this.table=c=d&16383;if(29<(c&31)||29<(c>>5&31))return this.mode=
9,a.msg="too many length or distance symbols",b=-3,this.bitb=d,this.bitk=h,a.avail_in=g,a.total_in+=f-a.next_in_index,a.next_in_index=f,this.write=e,this.inflate_flush(a,b);c=258+(c&31)+(c>>5&31);if(null==this.blens||this.blens.length<c)this.blens=new Int32Array(c);else for(k=0;k<c;k++)this.blens[k]=0;d>>>=14;h-=14;this.index=0;mode=4;case 4:for(;this.index<4+(this.table>>>10);){for(;3>h;){if(0!=g)b=0;else return this.bitb=d,this.bitk=h,a.avail_in=g,a.total_in+=f-a.next_in_index,a.next_in_index=f,
this.write=e,this.inflate_flush(a,b);g--;d|=(a.next_in[f++]&255)<<h;h+=8}this.blens[R[this.index++]]=d&7;d>>>=3;h-=3}for(;19>this.index;)this.blens[R[this.index++]]=0;this.bb[0]=7;c=this.inftree.inflate_trees_bits(this.blens,this.bb,this.tb,this.hufts,a);if(0!=c)return b=c,-3==b&&(this.blens=null,this.mode=9),this.bitb=d,this.bitk=h,a.avail_in=g,a.total_in+=f-a.next_in_index,a.next_in_index=f,write=e,this.inflate_flush(a,b);this.index=0;this.mode=5;case 5:for(;;){c=this.table;if(!(this.index<258+
(c&31)+(c>>5&31)))break;for(c=this.bb[0];h<c;){if(0!=g)b=0;else return this.bitb=d,this.bitk=h,a.avail_in=g,a.total_in+=f-a.next_in_index,a.next_in_index=f,this.write=e,this.inflate_flush(a,b);g--;d|=(a.next_in[f++]&255)<<h;h+=8}c=this.hufts[3*(this.tb[0]+(d&x[c]))+1];p=this.hufts[3*(this.tb[0]+(d&x[c]))+2];if(16>p)d>>>=c,h-=c,this.blens[this.index++]=p;else{k=18==p?7:p-14;for(m=18==p?11:3;h<c+k;){if(0!=g)b=0;else return this.bitb=d,this.bitk=h,a.avail_in=g,a.total_in+=f-a.next_in_index,a.next_in_index=
f,this.write=e,this.inflate_flush(a,b);g--;d|=(a.next_in[f++]&255)<<h;h+=8}d>>>=c;h-=c;m+=d&x[k];d>>>=k;h-=k;k=this.index;c=this.table;if(k+m>258+(c&31)+(c>>5&31)||16==p&&1>k)return this.blens=null,this.mode=9,a.msg="invalid bit length repeat",b=-3,this.bitb=d,this.bitk=h,a.avail_in=g,a.total_in+=f-a.next_in_index,a.next_in_index=f,this.write=e,this.inflate_flush(a,b);p=16==p?this.blens[k-1]:0;do this.blens[k++]=p;while(0!=--m);this.index=k}}this.tb[0]=-1;m=new Int32Array(1);p=new Int32Array(1);q=
new Int32Array(1);n=new Int32Array(1);m[0]=9;p[0]=6;c=this.table;c=this.inftree.inflate_trees_dynamic(257+(c&31),1+(c>>5&31),this.blens,m,p,q,n,this.hufts,a);if(0!=c)return-3==c&&(this.blens=null,this.mode=13),b=c,this.bitb=d,this.bitk=h,a.avail_in=g,a.total_in+=f-a.next_in_index,a.next_in_index=f,this.write=e,this.inflate_flush(a,b);this.codes.init(m[0],p[0],this.hufts,q[0],this.hufts,n[0],a);this.mode=6;case 6:this.bitb=d;this.bitk=h;a.avail_in=g;a.total_in+=f-a.next_in_index;a.next_in_index=f;
this.write=e;if(1!=(b=this.codes.proc(this,a,b)))return this.inflate_flush(a,b);b=0;this.codes.free(a);f=a.next_in_index;g=a.avail_in;d=this.bitb;h=this.bitk;e=this.write;k=e<this.read?this.read-e-1:this.end-e;if(0==this.last){this.mode=0;break}this.mode=7;case 7:this.write=e;b=this.inflate_flush(a,b);e=this.write;if(this.read!=this.write)return this.bitb=d,this.bitk=h,a.avail_in=g,a.total_in+=f-a.next_in_index,a.next_in_index=f,this.write=e,this.inflate_flush(a,b);mode=12;case 8:return b=1,this.bitb=
d,this.bitk=h,a.avail_in=g,a.total_in+=f-a.next_in_index,a.next_in_index=f,this.write=e,this.inflate_flush(a,b);case 9:return b=-3,this.bitb=d,this.bitk=h,a.avail_in=g,a.total_in+=f-a.next_in_index,a.next_in_index=f,this.write=e,this.inflate_flush(a,b);default:return b=-2,this.bitb=d,this.bitk=h,a.avail_in=g,a.total_in+=f-a.next_in_index,a.next_in_index=f,this.write=e,this.inflate_flush(a,b)}};B.prototype.free=function(a){this.reset(a,null);this.hufts=this.window=null};B.prototype.set_dictionary=
function(a,b,c){y(a,b,window,0,c);this.read=this.write=c};B.prototype.sync_point=function(){return 1==this.mode};B.prototype.inflate_flush=function(a,b){var c,d,h;d=a.next_out_index;h=this.read;c=(h<=this.write?this.write:this.end)-h;c>a.avail_out&&(c=a.avail_out);0!=c&&-5==b&&(b=0);a.avail_out-=c;a.total_out+=c;null!=this.checkfn&&(a.adler=this.check=a._adler.adler32(this.check,this.window,h,c));y(this.window,h,a.next_out,d,c);d+=c;h+=c;h==this.end&&(h=0,this.write==this.end&&(this.write=0),c=this.write-
h,c>a.avail_out&&(c=a.avail_out),0!=c&&-5==b&&(b=0),a.avail_out-=c,a.total_out+=c,null!=this.checkfn&&(a.adler=this.check=a._adler.adler32(this.check,this.window,h,c)),y(this.window,h,a.next_out,d,c),d+=c,h+=c);a.next_out_index=d;this.read=h;return b};D.prototype.init=function(a,b,c,d,h,f,g){this.mode=0;this.lbits=a;this.dbits=b;this.ltree=c;this.ltree_index=d;this.dtree=h;this.dtree_index=f;this.tree=null};D.prototype.proc=function(a,b,c){var d,h,f=0,g=0,e=0,k,m,p,e=b.next_in_index;k=b.avail_in;
f=a.bitb;g=a.bitk;m=a.write;for(p=m<a.read?a.read-m-1:a.end-m;;)switch(this.mode){case 0:if(258<=p&&10<=k&&(a.bitb=f,a.bitk=g,b.avail_in=k,b.total_in+=e-b.next_in_index,b.next_in_index=e,a.write=m,c=this.inflate_fast(this.lbits,this.dbits,this.ltree,this.ltree_index,this.dtree,this.dtree_index,a,b),e=b.next_in_index,k=b.avail_in,f=a.bitb,g=a.bitk,m=a.write,p=m<a.read?a.read-m-1:a.end-m,0!=c)){this.mode=1==c?7:9;break}this.need=this.lbits;this.tree=this.ltree;this.tree_index=this.ltree_index;this.mode=
1;case 1:for(d=this.need;g<d;){if(0!=k)c=0;else return a.bitb=f,a.bitk=g,b.avail_in=k,b.total_in+=e-b.next_in_index,b.next_in_index=e,a.write=m,a.inflate_flush(b,c);k--;f|=(b.next_in[e++]&255)<<g;g+=8}d=3*(this.tree_index+(f&x[d]));f>>>=this.tree[d+1];g-=this.tree[d+1];h=this.tree[d];if(0==h){this.lit=this.tree[d+2];this.mode=6;break}if(0!=(h&16)){this.get=h&15;this.len=this.tree[d+2];this.mode=2;break}if(0==(h&64)){this.need=h;this.tree_index=d/3+this.tree[d+2];break}if(0!=(h&32)){this.mode=7;break}this.mode=
9;b.msg="invalid literal/length code";c=-3;a.bitb=f;a.bitk=g;b.avail_in=k;b.total_in+=e-b.next_in_index;b.next_in_index=e;a.write=m;return a.inflate_flush(b,c);case 2:for(d=this.get;g<d;){if(0!=k)c=0;else return a.bitb=f,a.bitk=g,b.avail_in=k,b.total_in+=e-b.next_in_index,b.next_in_index=e,a.write=m,a.inflate_flush(b,c);k--;f|=(b.next_in[e++]&255)<<g;g+=8}this.len+=f&x[d];f>>=d;g-=d;this.need=this.dbits;this.tree=this.dtree;this.tree_index=this.dtree_index;this.mode=3;case 3:for(d=this.need;g<d;){if(0!=
k)c=0;else return a.bitb=f,a.bitk=g,b.avail_in=k,b.total_in+=e-b.next_in_index,b.next_in_index=e,a.write=m,a.inflate_flush(b,c);k--;f|=(b.next_in[e++]&255)<<g;g+=8}d=3*(this.tree_index+(f&x[d]));f>>=this.tree[d+1];g-=this.tree[d+1];h=this.tree[d];if(0!=(h&16)){this.get=h&15;this.dist=this.tree[d+2];this.mode=4;break}if(0==(h&64)){this.need=h;this.tree_index=d/3+this.tree[d+2];break}this.mode=9;b.msg="invalid distance code";c=-3;a.bitb=f;a.bitk=g;b.avail_in=k;b.total_in+=e-b.next_in_index;b.next_in_index=
e;a.write=m;return a.inflate_flush(b,c);case 4:for(d=this.get;g<d;){if(0!=k)c=0;else return a.bitb=f,a.bitk=g,b.avail_in=k,b.total_in+=e-b.next_in_index,b.next_in_index=e,a.write=m,a.inflate_flush(b,c);k--;f|=(b.next_in[e++]&255)<<g;g+=8}this.dist+=f&x[d];f>>=d;g-=d;this.mode=5;case 5:for(d=m-this.dist;0>d;)d+=a.end;for(;0!=this.len;){if(0==p&&(m==a.end&&0!=a.read&&(m=0,p=m<a.read?a.read-m-1:a.end-m),0==p&&(a.write=m,c=a.inflate_flush(b,c),m=a.write,p=m<a.read?a.read-m-1:a.end-m,m==a.end&&0!=a.read&&
(m=0,p=m<a.read?a.read-m-1:a.end-m),0==p)))return a.bitb=f,a.bitk=g,b.avail_in=k,b.total_in+=e-b.next_in_index,b.next_in_index=e,a.write=m,a.inflate_flush(b,c);a.window[m++]=a.window[d++];p--;d==a.end&&(d=0);this.len--}this.mode=0;break;case 6:if(0==p&&(m==a.end&&0!=a.read&&(m=0,p=m<a.read?a.read-m-1:a.end-m),0==p&&(a.write=m,c=a.inflate_flush(b,c),m=a.write,p=m<a.read?a.read-m-1:a.end-m,m==a.end&&0!=a.read&&(m=0,p=m<a.read?a.read-m-1:a.end-m),0==p)))return a.bitb=f,a.bitk=g,b.avail_in=k,b.total_in+=
e-b.next_in_index,b.next_in_index=e,a.write=m,a.inflate_flush(b,c);c=0;a.window[m++]=this.lit;p--;this.mode=0;break;case 7:7<g&&(g-=8,k++,e--);a.write=m;c=a.inflate_flush(b,c);m=a.write;if(a.read!=a.write)return a.bitb=f,a.bitk=g,b.avail_in=k,b.total_in+=e-b.next_in_index,b.next_in_index=e,a.write=m,a.inflate_flush(b,c);this.mode=8;case 8:return c=1,a.bitb=f,a.bitk=g,b.avail_in=k,b.total_in+=e-b.next_in_index,b.next_in_index=e,a.write=m,a.inflate_flush(b,c);case 9:return c=-3,a.bitb=f,a.bitk=g,b.avail_in=
k,b.total_in+=e-b.next_in_index,b.next_in_index=e,a.write=m,a.inflate_flush(b,c);default:return c=-2,a.bitb=f,a.bitk=g,b.avail_in=k,b.total_in+=e-b.next_in_index,b.next_in_index=e,a.write=m,a.inflate_flush(b,c)}};D.prototype.free=function(a){};D.prototype.inflate_fast=function(a,b,c,d,h,f,g,e){var k,m,p,q,n,l,u,s,w,t,r,v;l=e.next_in_index;u=e.avail_in;q=g.bitb;n=g.bitk;s=g.write;w=s<g.read?g.read-s-1:g.end-s;a=x[a];t=x[b];do{for(;20>n;)u--,q|=(e.next_in[l++]&255)<<n,n+=8;k=q&a;m=c;p=d;v=3*(p+k);if(0==
(b=m[v]))q>>=m[v+1],n-=m[v+1],g.window[s++]=m[v+2],w--;else{do{q>>=m[v+1];n-=m[v+1];if(0!=(b&16)){b&=15;r=m[v+2]+(q&x[b]);q>>=b;for(n-=b;15>n;)u--,q|=(e.next_in[l++]&255)<<n,n+=8;k=q&t;m=h;p=f;v=3*(p+k);b=m[v];do if(q>>=m[v+1],n-=m[v+1],0!=(b&16)){for(b&=15;n<b;)u--,q|=(e.next_in[l++]&255)<<n,n+=8;k=m[v+2]+(q&x[b]);q>>=b;n-=b;w-=r;if(s>=k)k=s-k,g.window[s++]=g.window[k++],g.window[s++]=g.window[k++],r-=2;else{k=s-k;do k+=g.end;while(0>k);b=g.end-k;if(r>b){r-=b;if(0<s-k&&b>s-k){do g.window[s++]=g.window[k++];
while(0!=--b)}else y(g.window,k,g.window,s,b),s+=b;k=0}}do g.window[s++]=g.window[k++];while(0!=--r);break}else if(0==(b&64))k+=m[v+2],k+=q&x[b],v=3*(p+k),b=m[v];else return e.msg="invalid distance code",r=e.avail_in-u,r=n>>3<r?n>>3:r,u+=r,l-=r,n-=r<<3,g.bitb=q,g.bitk=n,e.avail_in=u,e.total_in+=l-e.next_in_index,e.next_in_index=l,g.write=s,-3;while(1);break}if(0==(b&64)){if(k+=m[v+2],k+=q&x[b],v=3*(p+k),0==(b=m[v])){q>>=m[v+1];n-=m[v+1];g.window[s++]=m[v+2];w--;break}}else{if(0!=(b&32))return r=e.avail_in-
u,r=n>>3<r?n>>3:r,u+=r,l-=r,n-=r<<3,g.bitb=q,g.bitk=n,e.avail_in=u,e.total_in+=l-e.next_in_index,e.next_in_index=l,g.write=s,1;e.msg="invalid literal/length code";r=e.avail_in-u;r=n>>3<r?n>>3:r;u+=r;l-=r;n-=r<<3;g.bitb=q;g.bitk=n;e.avail_in=u;e.total_in+=l-e.next_in_index;e.next_in_index=l;g.write=s;return-3}}while(1)}}while(258<=w&&10<=u);r=e.avail_in-u;r=n>>3<r?n>>3:r;l-=r;g.bitb=q;g.bitk=n-(r<<3);e.avail_in=u+r;e.total_in+=l-e.next_in_index;e.next_in_index=l;g.write=s;return 0};E.prototype.huft_build=
function(a,b,c,d,h,f,g,e,k,m,p){var q,n,l,u,s,w,t,r,v;w=0;n=c;do this.c[a[b+w]]++,w++,n--;while(0!=n);if(this.c[0]==c)return g[0]=-1,e[0]=0;s=e[0];for(l=1;15>=l&&0==this.c[l];l++);u=l;s<l&&(s=l);for(n=15;0!=n&&0==this.c[n];n--);m=n;s>n&&(s=n);e[0]=s;for(e=1<<l;l<n;l++,e<<=1)if(0>(e-=this.c[l]))return-3;if(0>(e-=this.c[n]))return-3;this.c[n]+=e;this.x[1]=l=0;w=1;for(t=2;0!=--n;)this.x[t]=l+=this.c[w],t++,w++;w=n=0;do 0!=(l=a[b+w])&&(this.v[this.x[l]++]=n),w++;while(++n<c);c=this.x[m];w=this.x[0]=n=
0;b=-1;r=-s;for(v=t=this.u[0]=0;u<=m;u++)for(a=this.c[u];0!=a--;){for(;u>r+s;){b++;r+=s;v=m-r;v=v>s?s:v;if((q=1<<(l=u-r))>a+1&&(q-=a+1,t=u,l<v))for(;++l<v&&!((q<<=1)<=this.c[++t]);)q-=this.c[t];v=1<<l;if(1440<this.hn[0]+v)return-3;this.u[b]=t=this.hn[0];this.hn[0]+=v;0!=b?(this.x[b]=n,this.r[0]=l,this.r[1]=s,l=n>>>r-s,this.r[2]=t-this.u[b-1]-l,y(this.r,0,k,3*(this.u[b-1]+l),3)):g[0]=t}this.r[1]=u-r;w>=c?this.r[0]=192:p[w]<d?(this.r[0]=256>this.v[w]?0:96,this.r[2]=this.v[w++]):(this.r[0]=f[this.v[w]-
d]+16+64,this.r[2]=h[this.v[w++]-d]);q=1<<u-r;for(l=n>>>r;l<v;l+=q)y(this.r,0,k,3*(t+l),3);for(l=1<<u-1;0!=(n&l);l>>>=1)n^=l;n^=l;for(l=(1<<r)-1;(n&l)!=this.x[b];)b--,r-=s,l=(1<<r)-1}return 0!=e&&1!=m?-5:0};E.prototype.inflate_trees_bits=function(a,b,c,d,h){this.initWorkArea(19);this.hn[0]=0;a=this.huft_build(a,0,19,19,null,null,c,b,d,this.hn,this.v);if(-3==a)h.msg="oversubscribed dynamic bit lengths tree";else if(-5==a||0==b[0])h.msg="incomplete dynamic bit lengths tree",a=-3;return a};E.prototype.inflate_trees_dynamic=
function(a,b,c,d,h,f,g,e,k){this.initWorkArea(288);this.hn[0]=0;f=this.huft_build(c,0,a,257,Z,aa,f,d,e,this.hn,this.v);if(0!=f||0==d[0])return-3==f?k.msg="oversubscribed literal/length tree":-4!=f&&(k.msg="incomplete literal/length tree",f=-3),f;this.initWorkArea(288);f=this.huft_build(c,a,b,0,ba,ca,g,h,e,this.hn,this.v);return 0!=f||0==h[0]&&257<a?(-3==f?k.msg="oversubscribed distance tree":-5==f?(k.msg="incomplete distance tree",f=-3):-4!=f&&(k.msg="empty distance tree with lengths",f=-3),f):0};
E.prototype.initWorkArea=function(a){null==this.hn&&(this.hn=new Int32Array(1),this.v=new Int32Array(a),this.c=new Int32Array(16),this.r=new Int32Array(3),this.u=new Int32Array(15),this.x=new Int32Array(16));this.v.length<a&&(this.v=new Int32Array(a));for(var b=0;b<a;b++)this.v[b]=0;for(b=0;16>b;b++)this.c[b]=0;for(b=0;3>b;b++)this.r[b]=0;y(this.c,0,this.u,0,15);y(this.c,0,this.x,0,16)};var T="function"===typeof(new Uint8Array(1)).subarray;K.prototype.toString=function(){return""+this.block+":"+this.offset};
F.prototype.slice=function(a,b){var c;c=this.blob.slice?b?this.blob.slice(a,a+b):this.blob.slice(a):b?this.blob.webkitSlice(a,a+b):this.blob.webkitSlice(a);return new F(c)};F.prototype.salted=function(){return this};F.prototype.fetch="undefined"!==typeof FileReader?function(a){var b=new FileReader;b.onloadend=function(c){a(N(b.result))};b.readAsBinaryString(this.blob)}:function(a){var b=new FileReaderSync;try{var c=b.readAsArrayBuffer(this.blob);a(c)}catch(d){a(null,d)}};z.prototype.slice=function(a,
b){if(0>a)throw"Bad slice "+a;var c=this.start,d=this.end,c=c&&a?c+a:a||c;return new z(this.url,c,b&&c?c+b-1:d||b-1,this.opts)};0<=navigator.userAgent.indexOf("Safari")&&navigator.userAgent.indexOf("Chrome");z.prototype.fetchAsText=function(a){var b=this;this.getURL().then(function(c){try{var d=new XMLHttpRequest;d.open("GET",c,!0);if(b.end){if(1E8<b.end-b.start)throw"Monster fetch!";d.setRequestHeader("Range","bytes="+b.start+"-"+b.end)}d.onreadystatechange=function(){if(4==d.readyState)return 200==
d.status||206==d.status?a(d.responseText):a(null)};b.opts.credentials&&(d.withCredentials=!0);d.send("")}catch(h){return a(null)}}).fail(function(b){console.log(b);return a(null,b)})};z.prototype.salted=function(){var a=this.opts,b={},c;for(c in a)b[c]=a[c];b.salt=!0;return new z(this.url,this.start,this.end,b)};z.prototype.getURL=function(){return this.opts.resolver?this.opts.resolver(this.url).then(function(a){return"string"===typeof a?a:a.url}):$.Deferred().resolve(this.url)};z.prototype.fetch=
function(a,b){var c=this;b=b||{};var d=b.attempt||1,h=b.truncatedLength;if(3<d)return a(null);this.getURL().then(function(f){try{var g;b.timeout&&!c.opts.credentials&&(g=setTimeout(function(){console.log("timing out "+f);e.abort();return a(null,"Timeout")},b.timeout));var e=new XMLHttpRequest,k;e.open("GET",f,!0);e.overrideMimeType("text/plain; charset=x-user-defined");if(c.end){if(1E8<c.end-c.start)throw"Monster fetch!";e.setRequestHeader("Range","bytes="+c.start+"-"+c.end);k=c.end-c.start+1}e.responseType=
"arraybuffer";e.onreadystatechange=function(){if(4==e.readyState){g&&clearTimeout(g);if(200==e.status||206==e.status){if(e.response){var b=e.response.byteLength;return!k||k==b||h&&b==h?a(e.response):c.fetch(a,{attempt:d+1,truncatedLength:b})}if(e.mozResponseArrayBuffer)return a(e.mozResponseArrayBuffer);b=e.responseText;return!k||k==b.length||h&&b.length==h?a(N(e.responseText)):c.fetch(a,{attempt:d+1,truncatedLength:b.length})}return c.fetch(a,{attempt:d+1})}};c.opts.credentials&&(e.withCredentials=
!0);e.send("")}catch(m){return a(null)}}).fail(function(b){console.log(b);return a(null,b)})};H.prototype.blocksForRange=function(a,b,c){var d=this.indices[a];if(!d)return[];a=U(b,c);for(var h=[],f=0;f<a.length;++f)h[a[f]]=!0;a=[];for(var g=[],f=t(d,0),e=4,k=0;k<f;++k){var m=t(d,e),p=t(d,e+4),e=e+8;if(h[m])for(var q=0;q<p;++q){var n=G(d,e),l=G(d,e+8);(4681>m?g:a).push(new M(n,l));e+=16}else e+=16*p}f=t(d,e);h=null;b=Math.min(b>>14,f-1);c=Math.min(c>>14,f-1);for(f=b;f<=c;++f)(b=G(d,e+4+8*f))&&(!h||
b.block<h.block||b.offset<h.offset)&&(h=b);d=[];if(null!=h)for(f=0;f<g.length;++f)c=g[f],c.maxv.block>=h.block&&c.maxv.offset>=h.offset&&d.push(c);g=d;d=[];for(f=0;f<g.length;++f)d.push(g[f]);for(f=0;f<a.length;++f)d.push(a[f]);d.sort(function(a,b){var c=a.minv.block-b.minv.block;return 0!=c?c:a.minv.offset-b.minv.offset});a=[];if(0<d.length){g=d[0];for(f=1;f<d.length;++f)c=d[f],c.minv.block==g.maxv.block?g=new M(g.minv,c.maxv):(a.push(g),g=c);a.push(g)}return a};H.prototype.fetch=function(a,b,c,
d,h){function f(){if(q>=k.length)return d(p);if(n){var a=new Uint8Array(n),a=g.readBamRecords(a,k[q].minv.offset,p,b,c,e,h);n=null;++q;return a?d(p):f()}var m=k[q],a=m.minv.block;g.data.slice(a,m.maxv.block+65536-a).fetch(function(a){n=L(a,m.maxv.block-m.minv.block+1);return f()})}var g=this;h=h||{};var e=this.chrToIndex[a],k;if(void 0===e)k=[];else{if(null===this.indices[e]&&this.indexChunks.chunks[e]){var m=this.indexChunks.chunks[e];return this.bai.slice(m[0],m[1]).fetch(function(f){f=new Uint8Array(f);
this.indices[e]=f;return this.fetch(a,b,c,d,h)}.bind(this))}(k=this.blocksForRange(e,b,c))||d(null,"Error in index fetch")}var p=[],q=0,n;f()};var S="=ACxGxxxTxxxxxxN".split(""),ea="MIDNSHP=X???????".split("");H.prototype.readBamRecords=function(a,b,c,d,h,f,g){for(;;){var e=t(a,b),e=b+e+4;if(e>=a.length)return!1;var k=new W,m=t(a,b+4),p=t(a,b+8),q=t(a,b+12),n=(q&65280)>>8,l=q&255,q=t(a,b+16),u=(q&4294901760)>>16,s=q&65535,q=t(a,b+20),w=t(a,b+24),x=t(a,b+28);t(a,b+32);k.segment=this.indexToChr[m];
k.flag=u;k.pos=p;k.mq=n;g.light&&(k.seqLength=q);if(!g.light){0<=w&&(k.nextSegment=this.indexToChr[w],k.nextPos=x);n="";for(p=0;p<l-1;++p)n+=String.fromCharCode(a[b+36+p]);k.readName=n;b=b+36+l;l="";for(p=0;p<s;++p)n=t(a,b),l=l+(n>>4)+ea[n&15],b+=4;k.cigar=l;s="";l=q+1>>1;for(p=0;p<l;++p)n=a[b+p],s+=S[(n&240)>>4],s.length<q&&(s+=S[n&15]);b+=l;k.seq=s;s="";for(p=0;p<q;++p)s+=String.fromCharCode(a[b+p]+33);b+=q;for(k.quals=s;b<e;){s=String.fromCharCode(a[b],a[b+1]);l=String.fromCharCode(a[b+2]);if("A"==
l)l=String.fromCharCode(a[b+3]),b+=4;else if("i"==l||"I"==l)l=t(a,b+3),b+=7;else if("c"==l||"C"==l)l=a[b+3],b+=4;else if("s"==l||"S"==l)l=P(a,b+3),b+=5;else if("f"==l)l=O(a,b+3),b+=7;else if("Z"==l||"H"==l)for(b+=3,l="";p=a[b++],0!=p;)l+=String.fromCharCode(p);else if("B"==l){l=String.fromCharCode(a[b+3]);p=t(a,b+4);if("i"==l||"I"==l||"f"==l)n=4,u="f"==l?O:t;else if("s"==l||"S"==l)n=2,u=P;else if("c"==l||"C"==l)n=1,u=V;else throw"Unknown array type "+l;b+=8;l=[];for(w=0;w<p;++w)l.push(u(a,b)),b+=
n}else throw"Unknown type "+l;k[s]=l}}if(!d||k.pos<=h&&k.pos+q>=d)void 0!==f&&m!=f||c.push(k);if(k.pos>h)return!0;b=e}};window.dallianceLib={URLFetchable:z,BlobFetchable:F,makeBam:function(a,b,c,d,h){a.slice(0,10).fetch(function(f){return f?Q(a,b,c,d,h):d(null,"Couldn't access BAM.")},{timeout:5E3})},inflateBuffer:J};"object"===typeof module&&"object"===typeof module.exports&&(module.exports=window.dallianceLib)})();


!function(a){var b=this;"object"==typeof exports?module.exports=a(b):"function"==typeof define&&define.amd?define([],function(){return a(b)}):b.jDataView=a(b)}(function(a){"use strict";function b(a,b){return"object"!=typeof a||null===a?!1:a.constructor===b||Object.prototype.toString.call(a)==="[object "+b.name+"]"}function c(a,c){return!c&&b(a,Array)?a:Array.prototype.slice.call(a)}function d(a,b){return void 0!==a?a:b}function e(a,c,f,g){if(e.is(a)){var h=a.slice(c,c+f);return h._littleEndian=d(g,h._littleEndian),h}if(!e.is(this))return new e(a,c,f,g);if(this.buffer=a=e.wrapBuffer(a),this._isArrayBuffer=j.ArrayBuffer&&b(a,ArrayBuffer),this._isPixelData=!0&&j.PixelData&&b(a,CanvasPixelArray),this._isDataView=j.DataView&&this._isArrayBuffer,this._isNodeBuffer=!1,!this._isArrayBuffer&&!this._isPixelData&&!b(a,Array))throw new TypeError("jDataView buffer has an incompatible type");this._littleEndian=!!g;var i="byteLength"in a?a.byteLength:a.length;this.byteOffset=c=d(c,0),this.byteLength=f=d(f,i-c),this._offset=this._bitOffset=0,this._isDataView?this._view=new DataView(a,c,f):this._checkBounds(c,f,i),this._engineAction=this._isDataView?this._dataViewAction:this._isArrayBuffer?this._arrayBufferAction:this._arrayAction}function f(a){for(var b=j.ArrayBuffer?Uint8Array:Array,c=new b(a.length),d=0,e=a.length;e>d;d++)c[d]=255&a.charCodeAt(d);return c}function g(a){return a>=0&&31>a?1<<a:g[a]||(g[a]=Math.pow(2,a))}function h(a,b){this.lo=a,this.hi=b}function i(){h.apply(this,arguments)}var j={NodeBuffer:!1,DataView:"DataView"in a,ArrayBuffer:"ArrayBuffer"in a,PixelData:!0&&"CanvasPixelArray"in a&&!("Uint8ClampedArray"in a)&&"document"in a},k=a.TextEncoder,l=a.TextDecoder;if(j.PixelData)var m=document.createElement("canvas").getContext("2d"),n=function(a,b){var c=m.createImageData((a+3)/4,1).data;if(c.byteLength=a,void 0!==b)for(var d=0;a>d;d++)c[d]=b[d];return c};var o={Int8:1,Int16:2,Int32:4,Uint8:1,Uint16:2,Uint32:4,Float32:4,Float64:8};e.wrapBuffer=function(a){switch(typeof a){case"number":if(j.ArrayBuffer)a=new Uint8Array(a).buffer;else if(j.PixelData)a=n(a);else{a=new Array(a);for(var d=0;d<a.length;d++)a[d]=0}return a;case"string":a=f(a);default:return"length"in a&&!(j.ArrayBuffer&&b(a,ArrayBuffer)||j.PixelData&&b(a,CanvasPixelArray))&&(j.ArrayBuffer?b(a,ArrayBuffer)||(a=new Uint8Array(a).buffer,b(a,ArrayBuffer)||(a=new Uint8Array(c(a,!0)).buffer)):a=j.PixelData?n(a.length,a):c(a)),a}},e.is=function(a){return a&&a.jDataView},e.from=function(){return new e(arguments)},e.Uint64=h,h.prototype={valueOf:function(){return this.lo+g(32)*this.hi},toString:function(){return Number.prototype.toString.apply(this.valueOf(),arguments)}},h.fromNumber=function(a){var b=Math.floor(a/g(32)),c=a-b*g(32);return new h(c,b)},e.Int64=i,i.prototype="create"in Object?Object.create(h.prototype):new h,i.prototype.valueOf=function(){return this.hi<g(31)?h.prototype.valueOf.apply(this,arguments):-(g(32)-this.lo+g(32)*(g(32)-1-this.hi))},i.fromNumber=function(a){var b,c;if(a>=0){var d=h.fromNumber(a);b=d.lo,c=d.hi}else c=Math.floor(a/g(32)),b=a-c*g(32),c+=g(32);return new i(b,c)};var p=e.prototype={compatibility:j,jDataView:!0,_checkBounds:function(a,b,c){if("number"!=typeof a)throw new TypeError("Offset is not a number.");if("number"!=typeof b)throw new TypeError("Size is not a number.");if(0>b)throw new RangeError("Length is negative.");if(0>a||a+b>d(c,this.byteLength))throw new RangeError("Offsets are out of bounds.")},_action:function(a,b,c,e,f){return this._engineAction(a,b,d(c,this._offset),d(e,this._littleEndian),f)},_dataViewAction:function(a,b,c,d,e){return this._offset=c+o[a],b?this._view["get"+a](c,d):this._view["set"+a](c,e,d)},_arrayBufferAction:function(b,c,e,f,g){var h,i=o[b],j=a[b+"Array"];if(f=d(f,this._littleEndian),1===i||(this.byteOffset+e)%i===0&&f)return h=new j(this.buffer,this.byteOffset+e,1),this._offset=e+i,c?h[0]:h[0]=g;var k=new Uint8Array(c?this.getBytes(i,e,f,!0):i);return h=new j(k.buffer,0,1),c?h[0]:(h[0]=g,void this._setBytes(e,k,f))},_arrayAction:function(a,b,c,d,e){return b?this["_get"+a](c,d):this["_set"+a](c,e,d)},_getBytes:function(a,b,e){e=d(e,this._littleEndian),b=d(b,this._offset),a=d(a,this.byteLength-b),this._checkBounds(b,a),b+=this.byteOffset,this._offset=b-this.byteOffset+a;var f=this._isArrayBuffer?new Uint8Array(this.buffer,b,a):(this.buffer.slice||Array.prototype.slice).call(this.buffer,b,b+a);return e||1>=a?f:c(f).reverse()},getBytes:function(a,b,e,f){var g=this._getBytes(a,b,d(e,!0));return f?c(g):g},_setBytes:function(a,b,e){var f=b.length;if(0!==f){if(e=d(e,this._littleEndian),a=d(a,this._offset),this._checkBounds(a,f),!e&&f>1&&(b=c(b,!0).reverse()),a+=this.byteOffset,this._isArrayBuffer)new Uint8Array(this.buffer,a,f).set(b);else for(var g=0;f>g;g++)this.buffer[a+g]=b[g];this._offset=a-this.byteOffset+f}},setBytes:function(a,b,c){this._setBytes(a,b,d(c,!0))},getString:function(a,b,c){var d=this._getBytes(a,b,!0);if(c="utf8"===c?"utf-8":c||"binary",l&&"binary"!==c)return new l(c).decode(this._isArrayBuffer?d:new Uint8Array(d));var e="";a=d.length;for(var f=0;a>f;f++)e+=String.fromCharCode(d[f]);return"utf-8"===c&&(e=decodeURIComponent(escape(e))),e},setString:function(a,b,c){c="utf8"===c?"utf-8":c||"binary";var d;k&&"binary"!==c?d=new k(c).encode(b):("utf-8"===c&&(b=unescape(encodeURIComponent(b))),d=f(b)),this._setBytes(a,d,!0)},getChar:function(a){return this.getString(1,a)},setChar:function(a,b){this.setString(a,b)},tell:function(){return this._offset},seek:function(a){return this._checkBounds(a,0),this._offset=a},skip:function(a){return this.seek(this._offset+a)},slice:function(a,b,c){function f(a,b){return 0>a?a+b:a}return a=f(a,this.byteLength),b=f(d(b,this.byteLength),this.byteLength),c?new e(this.getBytes(b-a,a,!0,!0),void 0,void 0,this._littleEndian):new e(this.buffer,this.byteOffset+a,b-a,this._littleEndian)},alignBy:function(a){return this._bitOffset=0,1!==d(a,1)?this.skip(a-(this._offset%a||a)):this._offset},_getFloat64:function(a,b){var c=this._getBytes(8,a,b),d=1-2*(c[7]>>7),e=((c[7]<<1&255)<<3|c[6]>>4)-1023,f=(15&c[6])*g(48)+c[5]*g(40)+c[4]*g(32)+c[3]*g(24)+c[2]*g(16)+c[1]*g(8)+c[0];return 1024===e?0!==f?0/0:1/0*d:-1023===e?d*f*g(-1074):d*(1+f*g(-52))*g(e)},_getFloat32:function(a,b){var c=this._getBytes(4,a,b),d=1-2*(c[3]>>7),e=(c[3]<<1&255|c[2]>>7)-127,f=(127&c[2])<<16|c[1]<<8|c[0];return 128===e?0!==f?0/0:1/0*d:-127===e?d*f*g(-149):d*(1+f*g(-23))*g(e)},_get64:function(a,b,c){c=d(c,this._littleEndian),b=d(b,this._offset);for(var e=c?[0,4]:[4,0],f=0;2>f;f++)e[f]=this.getUint32(b+e[f],c);return this._offset=b+8,new a(e[0],e[1])},getInt64:function(a,b){return this._get64(i,a,b)},getUint64:function(a,b){return this._get64(h,a,b)},_getInt32:function(a,b){var c=this._getBytes(4,a,b);return c[3]<<24|c[2]<<16|c[1]<<8|c[0]},_getUint32:function(a,b){return this._getInt32(a,b)>>>0},_getInt16:function(a,b){return this._getUint16(a,b)<<16>>16},_getUint16:function(a,b){var c=this._getBytes(2,a,b);return c[1]<<8|c[0]},_getInt8:function(a){return this._getUint8(a)<<24>>24},_getUint8:function(a){return this._getBytes(1,a)[0]},_getBitRangeData:function(a,b){var c=(d(b,this._offset)<<3)+this._bitOffset,e=c+a,f=c>>>3,g=e+7>>>3,h=this._getBytes(g-f,f,!0),i=0;(this._bitOffset=7&e)&&(this._bitOffset-=8);for(var j=0,k=h.length;k>j;j++)i=i<<8|h[j];return{start:f,bytes:h,wideValue:i}},getSigned:function(a,b){var c=32-a;return this.getUnsigned(a,b)<<c>>c},getUnsigned:function(a,b){var c=this._getBitRangeData(a,b).wideValue>>>-this._bitOffset;return 32>a?c&~(-1<<a):c},_setBinaryFloat:function(a,b,c,d,e){var f,h,i=0>b?1:0,j=~(-1<<d-1),k=1-j;0>b&&(b=-b),0===b?(f=0,h=0):isNaN(b)?(f=2*j+1,h=1):1/0===b?(f=2*j+1,h=0):(f=Math.floor(Math.log(b)/Math.LN2),f>=k&&j>=f?(h=Math.floor((b*g(-f)-1)*g(c)),f+=j):(h=Math.floor(b/g(k-c)),f=0));for(var l=[];c>=8;)l.push(h%256),h=Math.floor(h/256),c-=8;for(f=f<<c|h,d+=c;d>=8;)l.push(255&f),f>>>=8,d-=8;l.push(i<<d|f),this._setBytes(a,l,e)},_setFloat32:function(a,b,c){this._setBinaryFloat(a,b,23,8,c)},_setFloat64:function(a,b,c){this._setBinaryFloat(a,b,52,11,c)},_set64:function(a,b,c,e){"object"!=typeof c&&(c=a.fromNumber(c)),e=d(e,this._littleEndian),b=d(b,this._offset);var f=e?{lo:0,hi:4}:{lo:4,hi:0};for(var g in f)this.setUint32(b+f[g],c[g],e);this._offset=b+8},setInt64:function(a,b,c){this._set64(i,a,b,c)},setUint64:function(a,b,c){this._set64(h,a,b,c)},_setUint32:function(a,b,c){this._setBytes(a,[255&b,b>>>8&255,b>>>16&255,b>>>24],c)},_setUint16:function(a,b,c){this._setBytes(a,[255&b,b>>>8&255],c)},_setUint8:function(a,b){this._setBytes(a,[255&b])},setUnsigned:function(a,b,c){var d=this._getBitRangeData(c,a),e=d.wideValue,f=d.bytes;e&=~(~(-1<<c)<<-this._bitOffset),e|=(32>c?b&~(-1<<c):b)<<-this._bitOffset;for(var g=f.length-1;g>=0;g--)f[g]=255&e,e>>>=8;this._setBytes(d.start,f,!0)}};for(var q in o)!function(a){p["get"+a]=function(b,c){return this._action(a,!0,b,c)},p["set"+a]=function(b,c,d){this._action(a,!1,b,d,c)}}(q);p._setInt32=p._setUint32,p._setInt16=p._setUint16,p._setInt8=p._setUint8,p.setSigned=p.setUnsigned;for(var r in p)"set"===r.slice(0,3)&&!function(a){p["write"+a]=function(){Array.prototype.unshift.call(arguments,void 0),this["set"+a].apply(this,arguments)}}(r.slice(3));return e});
//# sourceMappingURL=jdataview.js.map


(function () {

if (typeof jDataView === 'undefined' && typeof require !== 'undefined') {
	jDataView = require('jDataView');
}

// Extend code from underscorejs (modified for fast inheritance using prototypes)
function inherit(obj) {
  if ('create' in Object) {
    obj = Object.create(obj);
  } else {
    function ClonedObject() {}
    ClonedObject.prototype = obj;
    obj = new ClonedObject();
  }
  for (var i = 1; i < arguments.length; ++i) {
    var source = arguments[i];
    for (var prop in source) {
      if (source[prop] !== undefined) {
        obj[prop] = source[prop];
      }
    }
  }
  return obj;
}

function jParser(view, structure) {
  if (!(this instanceof arguments.callee)) {
    throw new Error("Constructor may not be called as a function");
  }
  if (!(view instanceof jDataView)) {
    view = new jDataView(view, undefined, undefined, true);
  }
  this.view = view;
  this.view.seek(0);
  this._bitShift = 0;
  this.structure = inherit(jParser.prototype.structure, structure);
}

function toInt(val) {
  return val instanceof Function ? val.call(this) : val;
}

jParser.prototype.structure = {
  uint8: function () { return this.view.getUint8(); },
  uint16: function () { return this.view.getUint16(); },
  uint32: function () { return this.view.getUint32(); },
  uint64 : function () { return parseInt(this.view.getUint64(),10); },
  int8: function () { return this.view.getInt8(); },
  int16: function () { return this.view.getInt16(); },
  int32: function () { return this.view.getInt32(); },
  float32: function () { return this.view.getFloat32(); },
  float64: function () { return this.view.getFloat64(); },
  char: function () { return this.view.getChar(); },
  string: function (length) {
    return this.view.getString(toInt.call(this, length));
  },
  array: function (type, length) {
    length = toInt.call(this, length);
    var results = [];
    for (var i = 0; i < length; ++i) {
      results.push(this.parse(type));
    }
    return results;
  },
  seek: function (position, block) {
    position = toInt.call(this, position);
    if (block instanceof Function) {
      var old_position = this.view.tell();
      this.view.seek(position);
      var result = block.call(this);
      this.view.seek(old_position);
      return result;
    } else {
      return this.view.seek(position);
    }
  },
  tell: function () {
    return this.view.tell();
  },
  skip: function (offset) {
    offset = toInt.call(this, offset);
    this.view.seek(this.view.tell() + offset);
    return offset;
  },
  err : function(e){
    this.current = { error : e };
    return;
  },
  if: function (predicate) {
    if (predicate instanceof Function ? predicate.call(this) : predicate) {
    return this.parse.apply(this, Array.prototype.slice.call(arguments, 1));
    }
  }
};

jParser.prototype.seek = jParser.prototype.structure.seek;
jParser.prototype.tell = jParser.prototype.structure.tell;
jParser.prototype.skip = jParser.prototype.structure.skip;
jParser.prototype.err  = jParser.prototype.structure.err;

jParser.prototype.parse = function (structure) {
  if (typeof structure === 'number') {
    var fieldValue = 0,
    bitSize = structure;

    if (this._bitShift < 0) {
      var byteShift = this._bitShift >> 3; // Math.floor(_bitShift / 8)
      this.skip(byteShift);
      this._bitShift &= 7; // _bitShift + 8 * Math.floor(_bitShift / 8)
    }
    if (this._bitShift > 0 && bitSize >= 8 - this._bitShift) {
      fieldValue = this.view.getUint8() & ~(-1 << (8 - this._bitShift));
      bitSize -= 8 - this._bitShift;
      this._bitShift = 0;
    }
    while (bitSize >= 8) {
      fieldValue = this.view.getUint8() | (fieldValue << 8);
      bitSize -= 8;
    }
    if (bitSize > 0) {
      fieldValue = ((this.view.getUint8() >>> (8 - (this._bitShift + bitSize))) & ~(-1 << bitSize)) | (fieldValue << bitSize);
      this._bitShift += bitSize - 8; // passing negative value for next pass
    }

    return fieldValue;
  }

  // f, 1, 2 means f(1, 2)
  if (structure instanceof Function) {
    return structure.apply(this, Array.prototype.slice.call(arguments, 1));
  }

  // 'int32', ... is a shortcut for ['int32', ...]
  if (typeof structure === 'string') {
    structure = Array.prototype.slice.call(arguments);
  }

  // ['string', 256] means structure['string'](256)
  if (structure instanceof Array) {
    var key = structure[0];
    if (!(key in this.structure)) {
      throw new Error("Missing structure for `" + key + "`");
    }
    return this.parse.apply(this, [this.structure[key]].concat(structure.slice(1)));
  }

  // {key: val} means {key: parse(val)}
  if (typeof structure === 'object') {
    var output = {},
    current = this.current;

    this.current = output;

    for (var key in structure) {
      if(this.current.error){
        output = this.current;
        return output;
      }
      var value = this.parse(structure[key]);

      // skipping undefined call results (useful for 'if' statement)
      if (value !== undefined) {
        output[key] = value;
      }
    }

    this.current = current;

    return output;
  }

  throw new Error("Unknown structure type `" + structure + "`");
};


var all;
if (typeof self !== 'undefined') {
  all = self;
} else if (typeof window !== 'undefined') {
  all = window;
} else if (typeof global !== 'undefined') {
  all = global;
}
// Browser + Web Worker
all.jParser = jParser;

})();


(function () {
  var tabi_fmt = {
    string0: function (size) {
      return this.parse(['string', size]).replace(/\0+$/, '');
    },
    header: {
      magic   : ['string', 4],
      n_ref   : 'int32',
      format  : 'int32',
      col_seq : 'int32',
      col_beg : 'int32',
      col_end : 'int32',
      meta    : 'int32',
      skip    : 'int32',
      l_nm    : 'int32',
      names   : ['string0', function () { return this.current.l_nm; }]
    },
    chunk: {
      cnk_beg: 'uint64',
      cnk_end: 'uint64'
    },
    bin: {
      bin      : 'uint32',
      n_chunk  : 'int32',
      chunkseq : ['array', 'chunk', function () { return this.current.n_chunk; }]
    },
    index: {
      n_bin     : 'int32',
      binseq    : ['array', 'bin', function () { return this.current.n_bin; }],
      n_intv    : 'int32',
      intervseq : ['array', 'uint64', function () { return this.current.n_intv; }]
    },
    tabix: {
      head     : 'header',
      indexseq : ['array', 'index', function () { return this.current.head.n_ref; }]
    }
  };

  var bgzf_hd_fmt = {
    header: {
      id1   : 'uint8',
      id2   : 'uint8',
      cm    : 'uint8',
      flg   : 'uint8',
      mtime : 'uint32',
      xfl   : 'uint8',
      os    : 'uint8',
      xlen  : 'uint16'
    },
    subheader: {
      si1   : 'uint8',
      si2   : 'uint8',
      slen  : 'uint16',
      bsize : 'uint16'
    },
    bgzfHd: { head: 'header', subhead: 'subheader' }
  };

  var hdSize  = 18;
  var inflate = dallianceLib.inflateBuffer;
  var _2p16   = 1 << 16;

  var VCFReader = function (vcf, tbi) {
    this.vcf_data = vcf;
    this.tbi_data = tbi;
  };

  VCFReader.prototype.readTabix = function (cb) {
    var bins2hash = function (binseq) {
      var hash = {};
      var i    = 0;
      var b;

      for (var x in binseq) {
        b       = binseq[x].bin;
        hash[b] = i;
        i++;
      }

      return hash;
    };

    var parse_tabix = function (tabix_buffer) {
      var tabix = new jParser(tabix_buffer, tabi_fmt).parse('tabix');

      tabix.head.names = tabix.head.names.split('\0');
      tabix.bhash = {};

      for (var i = 0; i < tabix.head.n_ref; i++){
        tabix.bhash[i] = bins2hash(tabix.indexseq[i].binseq);
      }

      cb(tabix);
    };

    this.inflateRegion(this.tbi_data, 0, 100000000, parse_tabix);
  };

  VCFReader.prototype.getRecords = function (ref, beg, end, callback) {
    var records = [];
    var chunks  = this.getChunks(ref, beg, end);
    var vcfThis = this;

    if (chunks == -1) {
      return callback([]);
    }

    (function loop(x) {
      if (x < chunks.length) {
        vcfThis.inflateRegion(vcfThis.vcf_data, chunks[x].start, chunks[x].end, function (record, ebsz) {
          var last = record.byteLength - ebsz + chunks[x].inner_end;
          record = vcfThis.buffer2String(record).slice(chunks[x].inner_start, last);

          if (record.length > 0) {
            record = record.split('\n').filter(function (rec) {
              if (rec.length > 0) {
                var n = parseInt(rec.split('\t')[1]);
                return ((beg <= n) && (n <= end));
              }
            }).join('\n');

            records.push(record);
          }

          loop(++x);
        });
      } else {
        callback(records.join('\n'));
      }
    })(0);
  };

  VCFReader.prototype.getChunks = function (ref, beg, end) {
    var tbi     = this.tabix;
    var vcfThis = this;

    ref = tbi.head.names.indexOf(ref.toString());

    if (ref == -1) {
      return -1;
    }

    var bids  = this.reg2bins(beg, end + 1).filter(function (x) { return typeof tbi.bhash[ref][x] != 'undefined'; });
    var bcnks = bids.map(function (x) { return vcfThis.bin2Ranges(tbi, ref, x); });
    var cnks  = bcnks.reduce(function (V, ranges) {
      ranges.forEach(function (item) { V.push(item); });
      return V;
    }, []);

    cnks = this.remove_duplicates(cnks);

    return cnks;
  };

  VCFReader.prototype.inflateRegion = function (d, beg, end, cbfn) {
    var blocks  = [];
    var vcfThis = this;

    var cb = function (block, nextBlockOffset) {
      blocks.push(block);

      if (nextBlockOffset == -1) {
        cbfn(vcfThis.appendBuffers(blocks), blocks[blocks.length - 1].byteLength);
      } else if (nextBlockOffset <= end) {
        vcfThis.inflateBlock(d, nextBlockOffset, cb);
      } else {
        cbfn(vcfThis.appendBuffers(blocks), blocks[blocks.length - 1].byteLength);
      }
    };

    this.inflateBlock(d, beg, cb);
  };

  VCFReader.prototype.inflateBlock = function (d, blockOffset, cbfn) {
    var cb2 = function (hdobj) {
      d.slice(blockOffset, hdobj.subhead.bsize + 1).fetch(function (block) {
        var inflated_block  = inflate(block, hdSize, block.byteLength - hdSize);
        var nextBlockOffset = blockOffset + hdobj.subhead.bsize + 1;

        if (hdobj.subhead.bsize == 27) {
          nextBlockOffset = -1; // last bgzf block
        }

        cbfn(inflated_block, nextBlockOffset);
      });
    };

    this.getBGZFHD(d, blockOffset, cb2);
  };

  VCFReader.prototype.getBGZFHD = function (d, offset, cbfn) {
    d.slice(offset, hdSize + 1).fetch(function (buf) {
      var parser = new jParser(buf, bgzf_hd_fmt);
      var hdobj  = parser.parse('bgzfHd');
      cbfn(hdobj);
    });
  };

  VCFReader.prototype.appendBuffers = function (bufferVec) {
    var totalSize = 0;

    for (var i = 0; i < bufferVec.length; i++) {
      totalSize = totalSize + bufferVec[i].byteLength;
    }

    var tmp    = new Uint8Array(totalSize);
    var offset = 0;

    for (i = 0; i < bufferVec.length; i++) {
      tmp.set(new Uint8Array(bufferVec[i]), offset);
      offset = offset + bufferVec[i].byteLength;
    }

    return tmp.buffer;
  };

  VCFReader.prototype.buffer2String = function (resultBuffer) {
    var s        = '';
    var resultBB = new Uint8Array(resultBuffer);

    for (var i = 0; i < resultBB.length; ++i) {
      s += String.fromCharCode(resultBB[i]);
    }

    return s;
  };

  VCFReader.prototype.remove_duplicates = function (objectsArray) {
    var usedObjects = {};

    for (var i = objectsArray.length - 1; i >= 0; i--) {
      var so = JSON.stringify(objectsArray[i]);

      if (usedObjects[so]) {
        objectsArray.splice(i, 1);
      } else {
        usedObjects[so] = true;
      }
    }

    return objectsArray;
  };

  VCFReader.prototype.bin2Ranges = function (tbi, ref, binid) {
    var ranges = [];
    var bs     = tbi.indexseq[ref].binseq;
    var cnkseq = bs[tbi.bhash[ref][binid]].chunkseq;
    var cnk;

    for (var i = 0; i < cnkseq.length; i++) {
      cnk = cnkseq[i];

      ranges.push({
        start       : Math.floor(cnk.cnk_beg / _2p16),
        inner_start : cnk.cnk_beg % _2p16,
        end         : Math.floor(cnk.cnk_end / _2p16),
        inner_end   : cnk.cnk_end % _2p16
      });
    }

    return ranges;
  };

  VCFReader.prototype.reg2bins = function (beg, end) {
    var list = [];
    var i;

    --end;

    list.push(0);

    for (i = 1    + (beg >> 26); i <= 1    + (end >> 26); ++i) { list.push(i); }
    for (i = 9    + (beg >> 23); i <= 9    + (end >> 23); ++i) { list.push(i); }
    for (i = 73   + (beg >> 20); i <= 73   + (end >> 20); ++i) { list.push(i); }
    for (i = 585  + (beg >> 17); i <= 585  + (end >> 17); ++i) { list.push(i); }
    for (i = 4681 + (beg >> 14); i <= 4681 + (end >> 14); ++i) { list.push(i); }

    return list;
  };

  window.VCFReader = VCFReader;

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = VCFReader;
  }
})();


var $         = jQuery; // Make sure we have local $ (this is for combined script in a function)
var Genoverse = Base.extend({
  // Defaults
  urlParamTemplate   : 'r=__CHR__:__START__-__END__', // Overwrite this for your URL style
  width              : 1000,
  longestLabel       : 30,
  defaultLength      : 5000,
  defaultScrollDelta : 100,
  tracks             : [],
  highlights         : [],
  plugins            : [],
  dragAction         : 'scroll',         // Options are: scroll, select, off
  wheelAction        : 'off',            // Options are: zoom, off
  isStatic           : false,            // If true, will stop drag, select and zoom actions occurring
  saveable           : false,            // If true, track configuration and ordering will be saved in sessionStorage/localStorage
  saveKey            : '',               // Default key for sessionStorage/localStorage configuration is 'genoverse'. saveKey will be appended to this if it is set
  storageType        : 'sessionStorage', // Set to localStorage for permanence
  autoHideMessages   : true,             // Determines whether to collapse track messages by default
  trackAutoHeight    : false,            // Determines whether to automatically resize tracks to show all their features (can be overridden by track.autoHeight)
  hideEmptyTracks    : true,             // Determines whether to hide an automatically resized tracks if it has no features, or to show it empty (can be overridden by track.hideEmpty)
  genome             : undefined,        // The genome used in the browser - can be an object or a string, which will be used to obtain a javascript file
  useHash            : undefined,        // If true, window.location.hash is changed on navigation. If false, window.history.pushState is used. If undefined, pushState will be used if present in the browser

  // Default coordinates for initial view, overwrite in your config
  chr   : 1,
  start : 1,
  end   : 1000000,

  constructor: function (config) {
    var browser = this;

    if (!this.supported()) {
      return this.die('Your browser does not support this functionality');
    }

    config = config || {};

    config.container = $(config.container); // Make sure container is a jquery object, jquery recognises itself automatically

    if (!(config.container && config.container.length)) {
      config.container = $('<div>').appendTo('body');
    }

    config.container.addClass('genoverse').data('genoverse', this);

    $.extend(this, config);

    this.eventNamespace = '.genoverse.' + (++Genoverse.id);
    this.events         = { browser: {}, tracks: {} };

    $.when(this.loadGenome(), this.loadPlugins()).always(function () {
      Genoverse.wrapFunctions(browser);
      browser.init();
    });
  },

  loadGenome: function () {
    if (typeof this.genome === 'string') {
      var genomeName = this.genome;

      return $.ajax({
        url      : this.origin + 'js/genomes/' + genomeName + '.js',
        dataType : 'script',
        context  : this,
        success  : function () {
          this.genome = Genoverse.Genomes[genomeName];

          if (!this.genome) {
            this.die('Unable to load genome ' + genomeName);
          }
        }
      });
    }
  },

  loadPlugins: function (plugins) {
    var browser         = this;
    var loadPluginsTask = $.Deferred();

    plugins = plugins || this.plugins;

    this.loadedPlugins = this.loadedPlugins || {};

    for (var i in Genoverse.Plugins) {
      this.loadedPlugins[i] = this.loadedPlugins[i] || 'script';
    }

    if (typeof plugins === 'string') {
      plugins = [ plugins ];
    }

    function loadPlugin(plugin) {
      var css      = browser.origin + 'css/'        + plugin + '.css';
      var js       = browser.origin + 'js/plugins/' + plugin + '.js';
      var deferred = $.Deferred();

      function getCSS() {
        function done() {
          browser.loadedPlugins[plugin] = browser.loadedPlugins[plugin] || 'script';
          deferred.resolve(plugin);
        }

        if (Genoverse.Plugins[plugin].noCSS || $('link[href="' + css + '"]').length) {
          return done();
        }

        $('<link href="' + css + '" rel="stylesheet">').on('load', done).appendTo('body');
      }

      if (browser.loadedPlugins[plugin] || $('script[src="' + js + '"]').length) {
        getCSS();
      } else {
        $.getScript(js, getCSS);
      }

      return deferred;
    }

    function initializePlugin(plugin) {
      if (typeof Genoverse.Plugins[plugin] !== 'function' || browser.loadedPlugins[plugin] === true) {
        return [];
      }

      var requires = Genoverse.Plugins[plugin].requires;
      var deferred = $.Deferred();

      function init() {
        if (browser.loadedPlugins[plugin] !== true) {
          Genoverse.Plugins[plugin].call(browser);
          browser.container.addClass('gv-' + plugin.replace(/([A-Z])/g, '-$1').toLowerCase() + '-plugin');
          browser.loadedPlugins[plugin] = true;
        }

        deferred.resolve();
      }

      if (requires) {
        $.when(browser.loadPlugins(requires)).done(init);
      } else {
        init();
      }

      return deferred;
    }

    // Load plugins css file
    $.when.apply($, $.map(plugins, loadPlugin)).done(function () {
      var pluginsLoaded = [];
      var plugin;

      for (var i = 0; i < arguments.length; i++) {
        plugin = arguments[i];

        if (browser.loadedPlugins[plugin] !== true) {
          pluginsLoaded.push(initializePlugin(plugin));
        }
      }

      $.when.apply($, pluginsLoaded).always(loadPluginsTask.resolve);
    });

    return loadPluginsTask;
  },

  init: function () {
    var width = this.width;

    this.addDomElements(width);
    this.addUserEventHandlers();

    if (this.isStatic) {
      this.dragAction       = this.wheelAction = 'off';
      this.urlParamTemplate = false;
    }

    this.tracksById       = {};
    this.prev             = {};
    this.legends          = {};
    this.saveKey          = this.saveKey ? 'genoverse-' + this.saveKey : 'genoverse';
    this.urlParamTemplate = this.urlParamTemplate || '';
    this.useHash          = typeof this.useHash === 'boolean' ? this.useHash : typeof window.history.pushState !== 'function';
    this.textWidth        = document.createElement('canvas').getContext('2d').measureText('W').width;
    this.labelWidth       = this.labelContainer.outerWidth(true);
    this.width           -= this.labelWidth;
    this.paramRegex       = this.urlParamTemplate ? new RegExp('([?&;])' + this.urlParamTemplate
      .replace(/(\b(\w+=)?__CHR__(.)?)/,   '$2([\\w\\.]+)$3')
      .replace(/(\b(\w+=)?__START__(.)?)/, '$2(\\d+)$3')
      .replace(/(\b(\w+=)?__END__(.)?)/,   '$2(\\d+)$3') + '([;&])'
    ) : '';

    var urlCoords = this.getURLCoords();
    var coords    = urlCoords.chr && urlCoords.start && urlCoords.end ? urlCoords : { chr: this.chr, start: this.start, end: this.end };

    this.chr = coords.chr;

    if (this.genome) {
      this.chromosomeSize = this.genome[this.chr].size;
    }

    this.canChangeChr = !!this.genome;

    if (this.saveable) {
      this.loadConfig();
    } else {
      this.addTracks();
    }

    this.setRange(coords.start, coords.end);

    if (this.highlights.length) {
      this.addHighlights(this.highlights);
    }
  },

  loadConfig: function () {
    this.defaultTracks = $.extend([], true, this.tracks);

    var config = window[this.storageType].getItem(this.saveKey);

    if (config) {
      config = JSON.parse(config);
    } else {
      return this.addTracks();
    }

    var tracksByNamespace = Genoverse.getAllTrackTypes();
    var tracks            = [];
    var tracksById        = {};
    var savedConfig       = {};
    var i, prop, track;

    function setConfig(track, conf) {
      for (prop in conf) {
        if (prop === 'config') {
          savedConfig[conf.id] = conf[prop];
        } else {
          if (prop === 'height') {
            conf[prop] = parseInt(conf[prop], 10);

            if (isNaN(conf[prop])) {
              continue;
            }
          }

          track.prototype[prop] = conf[prop];
        }
      }
    }

    for (i = 0; i < this.tracks.length; i++) {
      if (this.tracks[i].prototype.id) {
        tracksById[this.tracks[i].prototype.id] = this.tracks[i];
      }
    }

    for (i = 0; i < config.length; i++) {
      track = tracksById[config[i].id];

      if (track) {
        setConfig(track, config[i]);
        track._fromStorage = true;
      } else if (tracksByNamespace[config[i].namespace]) {
        track = tracksByNamespace[config[i].namespace];

        this.trackIds = this.trackIds || {};
        this.trackIds[track.prototype.id] = this.trackIds[track.prototype.id] || 1;

        config[i].id = config[i].id || track.prototype.id;

        track = track.extend({ id: !tracksById[config[i].id] ? config[i].id : track.prototype.id + (tracksById[track.prototype.id] ? this.trackIds[track.prototype.id]++ : '') });

        setConfig(track, config[i]);
        tracks.push(track);
      }
    }

    for (i = 0; i < this.tracks.length; i++) {
      if (this.tracks[i].prototype.id && !this.tracks[i]._fromStorage) {
        continue;
      }

      tracks.push(this.tracks[i]);
    }

    this.tracks      = tracks;
    this.savedConfig = savedConfig;

    this.addTracks();
  },

  saveConfig: function () {
    if (this._constructing || !this.saveable) {
      return;
    }

    var config = [];
    var conf, j;

    for (var i = 0; i < this.tracks.length; i++) {
      if (this.tracks[i].id && !(this.tracks[i] instanceof Genoverse.Track.Legend) && !(this.tracks[i] instanceof Genoverse.Track.HighlightRegion)) {
        // when saving height, initialHeight is the height of the track once margins have been added, while defaultHeight is the DEFINED height of the track.
        // Subtracting the difference between them gives you back the correct height to input back into the track when loading configuration
        conf = {
          id         : this.tracks[i].id,
          namespace  : this.tracks[i].namespace,
          order      : this.tracks[i].order,
          autoHeight : this.tracks[i].autoHeight,
          height     : this.tracks[i].height - (this.tracks[i].initialHeight - this.tracks[i].defaultHeight)
        };

        if (this.tracks[i].config) {
          for (j in this.tracks[i].config) {
            conf.config    = conf.config || {};
            conf.config[j] = this.tracks[i].config[j];
          }
        }

        config.push(conf);
      }
    }

    // Safari in private browsing mode does not allow writes to storage, so wrap in a try/catch to stop errors occuring
    try {
      window[this.storageType].setItem(this.saveKey, JSON.stringify(config));
    } catch (e) {}
  },

  resetConfig: function () {
    // Non removable highlights should be re-added after reset
    var unremovableHighlights = [];

    if (this.tracksById.highlights) {
      this.tracksById.highlights.removeHighlights();
      unremovableHighlights = $.map(this.tracksById.highlights.prop('featuresById'), function (h) { return h; });
    }

    window[this.storageType].removeItem(this.saveKey);

    this._constructing = true;
    this.savedConfig   = {};

    this.removeTracks($.extend([],    this.tracks)); // Shallow clone to ensure that removeTracks doesn't hit problems when splicing this.tracks
    this.addTracks($.extend(true, [], this.defaultTracks));

    if (unremovableHighlights.length) {
      this.addHighlights(unremovableHighlights);
    }

    this._constructing = false;
  },

  addDomElements: function (width) {
    this.menus          = $();
    this.labelContainer = $('<ul class="gv-label-container">').appendTo(this.container).sortable({
      items  : 'li:not(.gv-unsortable)',
      handle : '.gv-handle',
      axis   : 'y',
      helper : 'clone',
      cursor : 'move',
      update : $.proxy(this.updateTrackOrder, this),
      start  : function (e, ui) {
        ui.placeholder.css({ height: ui.item.height(), visibility: 'visible' }).html(ui.item.html());
        ui.helper.hide();
      }
    });

    this.wrapper  = $('<div class="gv-wrapper">').appendTo(this.container);
    this.selector = $('<div class="gv-selector gv-crosshair">').appendTo(this.wrapper);

    this.selectorControls = this.zoomInHighlight = this.zoomOutHighlight = $();

    this.container.addClass('gv-canvas-container').width(width);

    if (!this.isStatic) {
      this.selectorControls = $(
        '<div class="gv-selector-controls gv-panel">'         +
        '  <div class="gv-button-set">'                       +
        '  <div class="gv-position">'                         +
        '    <div class="gv-chr"></div>'                      +
        '    <div class="gv-start-end">'                      +
        '      <div class="gv-start"></div>'                  +
        '      <div class="gv-end"></div>'                    +
        '    </div>'                                          +
        '  </div>'                                            +
        '  </div>'                                            +
        '  <div class="gv-button-set">'                       +
        '    <button class="gv-zoom-here">Zoom here</button>' +
        '  </div>'                                            +
        '  <div class="gv-button-set">'                       +
        '    <button class="gv-center">Center</button>'       +
        '  </div>'                                            +
        '  <div class="gv-button-set">'                       +
        '    <button class="gv-highlight">Highlight</button>' +
        '  </div>'                                            +
        '  <div class="gv-button-set">'                       +
        '    <button class="gv-cancel">Cancel</button>'       +
        '  </div>'                                            +
        '</div>'
      ).appendTo(this.selector);

      this.zoomInHighlight = $(
        '<div class="gv-canvas-zoom gv-i">' +
        '  <div class="gv-t gv-l gv-h"></div>' +
        '  <div class="gv-t gv-r gv-h"></div>' +
        '  <div class="gv-t gv-l gv-v"></div>' +
        '  <div class="gv-t gv-r gv-v"></div>' +
        '  <div class="gv-b gv-l gv-h"></div>' +
        '  <div class="gv-b gv-r gv-h"></div>' +
        '  <div class="gv-b gv-l gv-v"></div>' +
        '  <div class="gv-b gv-r gv-v"></div>' +
        '</div>'
      ).appendTo('body');

      this.zoomOutHighlight = this.zoomInHighlight.clone().toggleClass('gv-i gv-o').appendTo('body');
    }
  },

  addUserEventHandlers: function () {
    var browser        = this;
    var documentEvents = {};

    this.container.on({
      mousedown: function (e) {
        browser.hideMessages();

        // Only scroll on left click, and do nothing if clicking on a button in selectorControls
        if ((!e.which || e.which === 1) && !(this === browser.selector[0] && e.target !== this)) {
          browser.mousedown(e);
        }

        return false;
      },
      mousewheel: function (e, delta, deltaX, deltaY) {
        if (browser.noWheelZoom) {
          return true;
        }

        browser.hideMessages();

        if (deltaY === 0 && deltaX !== 0) {
          browser.startDragScroll(e);
          browser.move(-deltaX * 10);
          browser.stopDragScroll(false);
        } else if (browser.wheelAction === 'zoom') {
          return browser.mousewheelZoom(e, delta);
        }
      },
      dblclick: function (e) {
        if (browser.isStatic) {
          return true;
        }

        browser.hideMessages();
        browser.mousewheelZoom(e, 1);
      }
    }, '.gv-image-container, .gv-selector');

    this.selectorControls.on('click', function (e) {
      var pos = browser.getSelectorPosition();

      switch (e.target.className) {
        case 'gv-zoom-here' : browser.setRange(pos.start, pos.end, true); break;
        case 'gv-center'    : browser.moveTo(browser.chr, pos.start, pos.end, true, true); browser.cancelSelect(); break;
        case 'gv-highlight' : browser.addHighlight({ chr: browser.chr, start: pos.start, end: pos.end });
        case 'gv-cancel'    : browser.cancelSelect(); break;
        default             : break;
      }
    });

    documentEvents['mouseup'    + this.eventNamespace] = $.proxy(this.mouseup,   this);
    documentEvents['mousemove'  + this.eventNamespace] = $.proxy(this.mousemove, this);
    documentEvents['keydown'    + this.eventNamespace] = $.proxy(this.keydown,   this);
    documentEvents['keyup'      + this.eventNamespace] = $.proxy(this.keyup,     this);
    documentEvents['mousewheel' + this.eventNamespace] = function (e) {
      if (browser.wheelAction === 'zoom') {
        if (browser.wheelTimeout) {
          clearTimeout(browser.wheelTimeout);
        }

        browser.noWheelZoom  = browser.noWheelZoom || e.target !== browser.container[0];
        browser.wheelTimeout = setTimeout(function () { browser.noWheelZoom = false; }, 300);
      }
    };

    $(document).on(documentEvents);
    $(window).on((this.useHash ? 'hashchange' : 'popstate') + this.eventNamespace, $.proxy(this.popState, this));
  },

  onTracks: function () {
    var args = $.extend([], arguments);
    var func = args.shift();
    var mvc;

    for (var i = 0; i < this.tracks.length; i++) {
      if (this.tracks[i].disabled) {
        continue;
      }

      mvc = this.tracks[i]._interface[func];

      if (mvc) {
        this.tracks[i][mvc][func].apply(this.tracks[i][mvc], args);
      } else if (this.tracks[i][func]) {
        this.tracks[i][func].apply(this.tracks[i], args);
      }
    }
  },

  reset: function () {
    this.onTracks.apply(this, [ 'reset' ].concat([].slice.call(arguments)));
    this.prev  = {};
    this.scale = 9e99; // arbitrary value so that setScale resets track scales as well
    this.setRange(this.start, this.end);
  },

  setWidth: function (width) {
    this.width  = width;
    this.width -= this.labelWidth;

    if (this.controlPanel) {
      this.width -= this.controlPanel.width();
    }

    if (this.superContainer) {
      this.superContainer.width(width);
      this.container.width(this.width);
    } else {
      this.container.width(width);
    }

    this.onTracks('setWidth', this.width);
    this.reset('resizing');
  },

  mousewheelZoom: function (e, delta) {
    var browser = this;

    clearTimeout(this.zoomDeltaTimeout);
    clearTimeout(this.zoomTimeout);

    this.zoomDeltaTimeout = setTimeout(function () {
      if (delta > 0) {
        browser.zoomInHighlight.css({ left: e.pageX - 20, top: e.pageY - 20, display: 'block' }).animate({
          width: 80, height: 80, top: '-=20', left: '-=20'
        }, {
          complete: function () { $(this).css({ width: 40, height: 40, display: 'none' }); }
        });
      } else {
        browser.zoomOutHighlight.css({ left: e.pageX - 40, top: e.pageY - 40, display: 'block' }).animate({
          width: 40, height: 40, top: '+=20', left: '+=20'
        }, {
          complete: function () { $(this).css({ width: 80, height: 80, display: 'none' }); }
        });
      }
    }, 100);

    this.zoomTimeout = setTimeout(function () {
      browser[delta > 0 ? 'zoomIn' : 'zoomOut'](e.pageX - browser.container.offset().left - browser.labelWidth);

      if (browser.dragAction === 'select') {
        browser.moveSelector(e);
      }
    }, 300);

    return false;
  },

  startDragScroll: function (e) {
    this.dragging    = 'scroll';
    this.scrolling   = !e;
    this.dragOffset  = e ? e.pageX - this.left : 0;
    this.dragStart   = this.start;
    this.scrollDelta = Math.max(this.scale, this.defaultScrollDelta);
  },

  stopDragScroll: function (update) {
    this.dragging  = false;
    this.scrolling = false;

    if (update !== false) {
      if (this.start !== this.dragStart) {
        this.updateURL();
      }

      this.checkTrackHeights();
    }
  },

  startDragSelect: function (e) {
    if (!e) {
      return false;
    }

    var x = Math.max(0, e.pageX - this.wrapper.offset().left - 2);

    this.dragging        = 'select';
    this.selectorStalled = false;
    this.selectorStart   = x;

    this.selector.css({ left: x, width: 0 }).removeClass('gv-crosshair');
    this.selectorControls.hide();
  },

  stopDragSelect: function (e) {
    if (!e) {
      return false;
    }

    this.dragging        = false;
    this.selectorStalled = true;

    if (this.selector.outerWidth(true) < 2) {
      return this.cancelSelect();
    }

    // Calculate the position, so that selectorControls appear near the mouse cursor
    var top = Math.min(e.pageY - this.wrapper.offset().top, this.wrapper.outerHeight(true) - 1.2 * this.selectorControls.outerHeight(true));
    var pos = this.getSelectorPosition();

    this.selectorControls.find('.gv-chr').html(this.chr);
    this.selectorControls.find('.gv-start').html(pos.start);
    this.selectorControls.find('.gv-end').html(pos.end);

    this.selectorControls.find('.gv-selector-location').html(this.chr + ':' + pos.start + '-' + pos.end).end().css({
      top  : top,
      left : this.selector.outerWidth(true) / 2 - this.selectorControls.outerWidth(true) / 2
    }).show();
  },

  cancelSelect: function (keepDragging) {
    if (!keepDragging) {
      this.dragging = false;
    }

    this.selectorStalled = false;

    this.selector.addClass('gv-crosshair').width(0);
    this.selectorControls.hide();

    if (this.dragAction === 'scroll') {
      this.selector.hide();
    }
  },

  dragSelect: function (e) {
    var x = e.pageX - this.wrapper.offset().left;

    if (x > this.selectorStart) {
      this.selector.css({
        left  : this.selectorStart,
        width : Math.min(x - this.selectorStart, this.width - this.selectorStart - 1)
      });
    } else {
      this.selector.css({
        left  : Math.max(x, 1),
        width : Math.min(this.selectorStart - x, this.selectorStart - 1)
      });
    }
  },

  setDragAction: function (action, keepSelect) {
    this.dragAction = action;

    if (this.dragAction === 'select') {
      this.selector.addClass('gv-crosshair').width(0).show();
    } else if (keepSelect && !this.selector.hasClass('gv-crosshair')) {
      this.selectorStalled = false;
    } else {
      this.cancelSelect();
      this.selector.hide();
    }
  },

  toggleSelect: function (on) {
    if (on) {
      this.prev.dragAction = 'scroll';
      this.setDragAction('select');
    } else {
      this.setDragAction(this.prev.dragAction, true);
      delete this.prev.dragAction;
    }
  },

  setWheelAction: function (action) {
    this.wheelAction = action;
  },

  keydown: function (e) {
    if (e.which === 16 && !this.prev.dragAction && this.dragAction === 'scroll') { // shift key
      this.toggleSelect(true);
    } else if (e.which === 27) { // escape key
      this.cancelSelect();
      this.closeMenus();
    }
  },

  keyup: function (e) {
    if (e.which === 16 && this.prev.dragAction) { // shift key
      this.toggleSelect();
    }
  },

  mousedown: function (e) {
    if (e.shiftKey) {
      if (this.dragAction === 'scroll') {
        this.toggleSelect(true);
      }
    } else if (this.prev.dragAction) {
      this.toggleSelect();
    }

    switch (this.dragAction) {
      case 'select' : this.startDragSelect(e); break;
      case 'scroll' : this.startDragScroll(e); break;
      default       : break;
    }
  },

  mouseup: function (e) {
    if (!this.dragging) {
      return false;
    }

    switch (this.dragging) {
      case 'select' : this.stopDragSelect(e); break;
      case 'scroll' : this.stopDragScroll();  break;
      default       : break;
    }
  },

  mousemove: function (e) {
    if (this.dragging && !this.scrolling) {
      switch (this.dragAction) {
        case 'scroll' : this.move(e.pageX - this.dragOffset - this.left); break;
        case 'select' : this.dragSelect(e); break;
        default       : break;
      }
    } else if (this.dragAction === 'select') {
      this.moveSelector(e);
    }
  },

  moveSelector: function (e) {
    if (!this.selectorStalled) {
      this.selector.css('left', e.pageX - this.wrapper.offset().left - 2);
    }
  },

  move: function (delta) {
    var scale = this.scale;
    var start, end, left;

    if (scale > 1) {
      delta = Math.round(delta / scale) * scale; // Force stepping by base pair when in small regions
    }

    left = this.left + delta;

    if (left <= this.minLeft) {
      left  = this.minLeft;
      delta = this.minLeft - this.left;
    } else if (left >= this.maxLeft) {
      left  = this.maxLeft;
      delta = this.maxLeft - this.left;
    }

    start = Math.max(Math.round(this.start - delta / scale), 1);
    end   = start + this.length - 1;

    if (end > this.chromosomeSize) {
      end   = this.chromosomeSize;
      start = end - this.length + 1;
    }

    this.left = left;

    if (start !== this.dragStart) {
      this.closeMenus();
      this.cancelSelect(true);
    }

    this.onTracks('move', delta);
    this.setRange(start, end);
  },

  moveTo: function (chr, start, end, update, keepLength) {
    if (typeof chr !== 'undefined' && chr != this.chr) {
      if (this.canChangeChr) {
        if (this.genome && this.genome[chr]) {
          this.chr            = chr;
          this.chromosomeSize = this.genome[chr].size;
          this.start          = this.end = this.scale = -1;
        } else {
          this.die('Chromosome cannot be found in genome');
        }

        this.onTracks('changeChr');
      } else {
        this.die('Chromosome changing is not allowed');
      }
    }

    this.setRange(start, end, update, keepLength);

    if (this.prev.scale === this.scale) {
      this.left = Math.max(Math.min(this.left + Math.round((this.prev.start - this.start) * this.scale), this.maxLeft), this.minLeft);
      this.onTracks('moveTo', this.chr, this.start, this.end, (this.prev.start - this.start) * this.scale);
    }
  },

  setRange: function (start, end, update, keepLength) {
    this.prev.start = this.start;
    this.prev.end   = this.end;
    this.start      = Math.min(Math.max(typeof start === 'number' ? Math.floor(start) : parseInt(start, 10), 1), this.chromosomeSize);
    this.end        = Math.max(Math.min(typeof end   === 'number' ? Math.floor(end)   : parseInt(end,   10), this.chromosomeSize), 1);

    if (this.end < this.start) {
      this.end = Math.min(this.start + this.defaultLength - 1, this.chromosomeSize);
    }

    if (keepLength && this.end - this.start + 1 !== this.length) {
      if (this.end === this.chromosomeSize) {
        this.start = this.end - this.length + 1;
      } else {
        var center = (this.start + this.end) / 2;
        this.start = Math.max(Math.floor(center - this.length / 2), 1);
        this.end   = this.start + this.length - 1;

        if (this.end > this.chromosomeSize) {
          this.end   = this.chromosomeSize;
          this.start = this.end - this.length + 1;
        }
      }
    } else {
      this.length = this.end - this.start + 1;
    }

    this.setScale();

    if (update === true && (this.prev.start !== this.start || this.prev.end !== this.end)) {
      this.updateURL();
    }
  },

  setScale: function () {
    this.prev.scale  = this.scale;
    this.scale       = this.width / this.length;
    this.scaledStart = this.start * this.scale;

    if (this.prev.scale !== this.scale) {
      this.left        = 0;
      this.minLeft     = Math.round((this.end   - this.chromosomeSize) * this.scale);
      this.maxLeft     = Math.round((this.start - 1) * this.scale);
      this.labelBuffer = Math.ceil(this.textWidth / this.scale) * this.longestLabel;

      if (this.prev.scale) {
        this.cancelSelect();
        this.closeMenus();
      }

      this.onTracks('setScale');
      this.onTracks('makeFirstImage');
    }
  },

  checkTrackHeights: function () {
    if (this.dragging) {
      return;
    }

    this.onTracks('checkHeight');
  },

  resetTrackHeights: function () {
    this.onTracks('resetHeight');
  },

  zoomIn: function (x) {
    if (!x) {
      x = this.width / 2;
    }

    var start = Math.round(this.start + x / (2 * this.scale));
    var end   = this.length === 2 ? start : Math.round(start + (this.length - 1) / 2);

    this.setRange(start, end, true);
  },

  zoomOut: function (x) {
    if (!x) {
      x = this.width / 2;
    }

    var start = Math.round(this.start - x / this.scale);
    var end   = this.length === 1 ? start + 1 : Math.round(start + 2 * (this.length - 1));

    this.setRange(start, end, true);
  },

  addTrack: function (track, after) {
    return this.addTracks([ track ], after)[0];
  },

  addTracks: function (tracks, after) {
    var defaults = {
      browser : this,
      width   : this.width
    };

    var trackTypes = Genoverse.getAllTrackTypes();
    var push       = !!tracks;
    var order;

    tracks = tracks || $.extend([], this.tracks);

    if (push && !$.grep(this.tracks, function (t) { return typeof t === 'function'; }).length) {
      var insertAfter = (after ? $.grep(this.tracks, function (t) { return t.order < after; }) : this.tracks).sort(function (a, b) { return b.order - a.order; })[0];

      if (insertAfter) {
        order = insertAfter.order + 0.1;
      }
    }

    for (var i = 0; i < tracks.length; i++) {
      tracks[i] = new tracks[i]($.extend(defaults, {
        namespace : Genoverse.getTrackNamespace(tracks[i]),
        order     : typeof order === 'number' ? order : i,
        config    : this.savedConfig ? $.extend(true, {}, this.savedConfig[tracks[i].prototype.id]) : undefined
      }));

      if (tracks[i].id) {
        this.tracksById[tracks[i].id] = tracks[i];
      }

      if (push) {
        this.tracks.push(tracks[i]);
      } else {
        this.tracks[i] = tracks[i];
      }
    }

    this.sortTracks();
    this.saveConfig();

    return tracks;
  },

  removeTrack: function (track) {
    this.removeTracks((track.prop('childTracks') || []).concat(track));
  },

  removeTracks: function (tracks) {
    var i = tracks.length;
    var track, j;

    while (i--) {
      track = tracks[i];
      j     = this.tracks.length;

      while (j--) {
        if (track === this.tracks[j]) {
          this.tracks.splice(j, 1);
          break;
        }
      }

      if (track.id) {
        delete this.tracksById[track.id];
      }

      track.destructor(); // Destroy DOM elements and track itself
    }

    this.saveConfig();
  },

  sortTracks: function () {
    if ($.grep(this.tracks, function (t) { return typeof t !== 'object'; }).length) {
      return;
    }

    var sorted     = $.extend([], this.tracks).sort(function (a, b) { return a.order - b.order; });
    var labels     = $();
    var containers = $();
    var container;

    for (var i = 0; i < sorted.length; i++) {
      if (sorted[i].prop('parentTrack')) {
        continue;
      }

      if (!sorted[i].prop('fixedOrder')) {
        sorted[i].prop('order', i);
      }

      container = sorted[i].prop('superContainer') || sorted[i].prop('container');

      if (sorted[i].prop('menus').length) {
        sorted[i].prop('top', container.position().top);
      }

      labels.push(sorted[i].prop('label')[0]);
      containers.push(container[0]);
    }

    this.labelContainer.append(labels);
    this.wrapper.append(containers);

    // Correct the order
    this.tracks = sorted;

    labels.map(function () { return $(this).data('track'); }).each(function () {
      if (this.prop('menus').length) {
        var diff = (this.prop('superContainer') || this.prop('container')).position().top - this.prop('top');
        this.prop('menus').css('top', function (i, top) { return parseInt(top, 10) + diff; });
        this.prop('top', null);
      }
    });

    sorted = labels = containers = null;
  },

  updateTrackOrder: function (e, ui) {
    var track = ui.item.data('track');

    if (track.prop('unsortable') || track.prop('fixedOrder')) {
      return;
    }

    var prev = ui.item.prev().data('track');
    var next = ui.item.next().data('track');
    var p    = prev ? prev.prop('order') : 0;
    var n    = next ? next.prop('order') : 0;
    var o    = p || n;
    var order;

    if (prev && next && Math.floor(n) === Math.floor(p)) {
      order = p + (n - p) / 2;
    } else {
      order = o + (p ? 1 : -1) * Math.abs(Math.round(o) - o || 1) / 2;
    }

    track.prop('order', order);

    this.sortTracks();
    this.saveConfig();
  },

  updateURL: function () {
    if (this.urlParamTemplate) {
      if (this.useHash) {
        window.location.hash = this.getQueryString();
      } else {
        window.history.pushState({}, '', this.getQueryString());
      }
    }
  },

  popState: function () {
    var coords = this.getURLCoords();
    var start  = parseInt(coords.start, 10);
    var end    = parseInt(coords.end,   10);

    if (
      (coords.chr && coords.chr != this.chr) ||
      (coords.start && !(start === this.start && end === this.end))
    ) {
      // FIXME: a back action which changes scale or a zoom out will reset tracks, since scrollStart will not be the same as it was before
      this.moveTo(coords.chr, start, end);
    }

    this.closeMenus();
    this.hideMessages();
  },

  getURLCoords: function () {
    var match  = ((this.useHash ? window.location.hash.replace(/^#/, '?') || window.location.search : window.location.search) + '&').match(this.paramRegex);
    var coords = {};
    var i      = 0;

    if (!match) {
      return coords;
    }

    match = match.slice(2, -1);

    $.each(this.urlParamTemplate.split('__'), function () {
      var tmp = this.match(/^(CHR|START|END)$/);

      if (tmp) {
        coords[tmp[1].toLowerCase()] = tmp[1] === 'CHR' ? match[i++] : parseInt(match[i++], 10);
      }
    });

    return coords;
  },

  getQueryString: function () {
    var location = this.urlParamTemplate
      .replace('__CHR__',   this.chr)
      .replace('__START__', this.start)
      .replace('__END__',   this.end);

    return this.useHash ? location : window.location.search ? (window.location.search + '&').replace(this.paramRegex, '$1' + location + '$5').slice(0, -1) : '?' + location;
  },

  getChromosomeSize: function (chr) {
    return chr && this.genome && this.genome[chr] ? this.genome[chr].size : this.chromosomeSize;
  },

  supported: function () {
    var el = document.createElement('canvas');
    return !!(el.getContext && el.getContext('2d'));
  },

  die: function (error, el) {
    if (el && el.length) {
      el.html(error);
    } else {
      throw error;
    }

    this.failed = true;
  },

  menuTemplate: $(
    '<div class="gv-menu">'                                            +
      '<div class="gv-close gv-menu-button fa fa-times-circle"></div>' +
      '<div class="gv-menu-loading">Loading...</div>'                  +
      '<div class="gv-menu-content">'                                  +
        '<div class="gv-title"></div>'                                 +
        '<a class="gv-focus" href="#">Focus here</a>'                  +
        '<a class="gv-highlight" href="#">Highlight this feature</a>'  +
        '<table></table>'                                              +
      '</div>'                                                         +
    '</div>'
  ).on('click', function (e) {
    if ($(e.target).hasClass('gv-close')) {
      $(this).fadeOut('fast', function () {
        var data = $(this).data();

        if (data.track) {
          data.track.prop('menus', data.track.prop('menus').not(this));
        }

        data.browser.menus = data.browser.menus.not(this);
      });
    }
  }),

  makeMenu: function (features, event, track) {
    if (!features) {
      return false;
    }

    if (!Array.isArray(features)) {
      features = [ features ];
    }

    if (features.length === 0) {
      return false;
    } else if (features.length === 1) {
      return this.makeFeatureMenu(features[0], event, track);
    }

    var browser = this;
    var menu    = this.menuTemplate.clone(true).data({ browser: this });
    var table   = $('.gv-menu-content', menu).addClass('gv-menu-content-first').find('table');

    $('.gv-focus, .gv-highlight, .gv-menu-loading', menu).remove();
    $('.gv-title', menu).html(features.length + ' features');

    $.each(features.sort(function (a, b) { return a.start - b.start; }), function (i, feature) {
      var location = feature.chr + ':' + feature.start + (feature.end === feature.start ? '' : '-' + feature.end);
      var title    = feature.menuLabel || feature.name || (Array.isArray(feature.label) ? feature.label.join(' ') : feature.label) || (feature.id + '');

      $('<a href="#">').html(title.match(location) ? title : (location + ' ' + title)).on('click', function (e) {
        browser.makeFeatureMenu(feature, e, track);
        return false;
      }).appendTo($('<td>').appendTo($('<tr>').appendTo(table)));
    });

    menu.appendTo(this.superContainer || this.container).show();

    if (event) {
      menu.css({ left: 0, top: 0 }).position({ of: event, my: 'left top', collision: 'flipfit' });
    }

    this.menus = this.menus.add(menu);

    if (track) {
      track.prop('menus', track.prop('menus').add(menu));
    }

    return menu;
  },

  makeFeatureMenu: function (feature, e, track) {
    var browser   = this;
    var container = this.superContainer || this.container;
    var menu, content, loading, getMenu, isDeferred, i, j,  el, chr, start, end, linkData, key, columns, colspan;

    function focus() {
      var data    = $(this).data();
      var length  = data.end - data.start + 1;
      var context = Math.max(Math.round(length / 4), 25);

      browser.moveTo(data.chr, data.start - context, data.end + context, true);

      return false;
    }

    function highlight() {
      browser.addHighlight($(this).data());
      return false;
    }

    if (!feature.menuEl) {
      menu       = browser.menuTemplate.clone(true).data({ browser: browser, feature: feature });
      content    = $('.gv-menu-content', menu).remove();
      loading    = $('.gv-menu-loading', menu);
      getMenu    = track ? track.controller.populateMenu(feature) : feature;
      isDeferred = typeof getMenu === 'object' && typeof getMenu.promise === 'function';

      if (isDeferred) {
        loading.show();
      }

      $.when(getMenu).done(function (properties) {
        if (!Array.isArray(properties)) {
          properties = [ properties ];
        }

        for (i = 0; i < properties.length; i++) {
          table   = '';
          el      = content.clone().addClass(i ? '' : 'gv-menu-content-first').appendTo(menu);
          chr     = typeof properties[i].chr !== 'undefined' ? properties[i].chr : feature.chr;
          start   = parseInt(typeof properties[i].start !== 'undefined' ? properties[i].start : feature.start, 10);
          end     = parseInt(typeof properties[i].end   !== 'undefined' ? properties[i].end   : feature.end,   10);
          columns = Math.max.apply(Math, $.map(properties[i], function (v) { return Array.isArray(v) ? v.length : 1; }));

          $('.gv-title', el)[properties[i].title ? 'html' : 'remove'](properties[i].title);

          if (track && start && end && !browser.isStatic) {
            linkData = { chr: chr, start: start, end: Math.max(end, start), label: feature.label || (properties[i].title || '').replace(/<[^>]+>/g, ''), color: feature.color };

            $('.gv-focus',     el).data(linkData).on('click', focus);
            $('.gv-highlight', el).data(linkData).on('click', highlight);
          } else {
            $('.gv-focus, .gv-highlight', el).remove();
          }

          for (key in properties[i]) {
            if (/^start|end$/.test(key) && properties[i][key] === false) {
              continue;
            }

            if (key !== 'title') {
              colspan = properties[i][key] === '' ? ' colspan="' + (columns + 1) + '"' : '';
              table  += '<tr><td' + colspan + '>' + key + '</td>';

              if (!colspan) {
                if (Array.isArray(properties[i][key])) {
                  for (j = 0; j < properties[i][key].length; j++) {
                    table += '<td>' + properties[i][key][j] + '</td>';
                  }
                } else if (columns === 1) {
                  table += '<td>' + properties[i][key] + '</td>';
                } else {
                  table += '<td colspan="' + columns + '">' + properties[i][key] + '</td>';
                }
              }

              table += '</tr>';
            }
          }

          $('table', el)[table ? 'html' : 'remove'](table);
        }

        if (isDeferred) {
          loading.hide();
        }
      });

      if (track) {
        menu.addClass(track.id).data('track', track);
      }

      feature.menuEl = menu.appendTo(container);
    } else {
      feature.menuEl.appendTo(container); // Move the menu to the end of the container again, so that it will always be on top of other menus
    }

    browser.menus = browser.menus.add(feature.menuEl);

    if (track) {
      track.prop('menus', track.prop('menus').add(feature.menuEl));
    }

    feature.menuEl.show(); // Must show before positioning, else position will be wrong

    if (e) {
      feature.menuEl.css({ left: 0, top: 0 }).position({ of: e, my: 'left top', collision: 'flipfit' });
    }

    return feature.menuEl;
  },

  closeMenus: function (obj) {
    obj = obj || this;

    obj.menus.filter(':visible').children('.gv-close').trigger('click');
    obj.menus = $();
  },

  hideMessages: function () {
    if (this.autoHideMessages) {
      this.wrapper.find('.gv-message-container').addClass('gv-collapsed');
    }
  },

  getSelectorPosition: function () {
    var left  = this.selector.position().left;
    var width = this.selector.outerWidth(true);
    var start = Math.round(left / this.scale) + this.start;
    var end   = Math.round((left + width) / this.scale) + this.start - 1;
        end   = end <= start ? start : end;

    return { start: start, end: end, left: left, width: width };
  },

  addHighlight: function (highlight) {
    this.addHighlights([ highlight ]);
  },

  addHighlights: function (highlights) {
    if (!this.tracksById.highlights) {
      this.addTrack(Genoverse.Track.HighlightRegion);
    }

    this.tracksById.highlights.addHighlights(highlights);
  },

  on: function (events, obj, fn, once) {
    var browser  = this;
    var eventMap = {};
    var i, j, f, fnString, event;

    function makeEventMap(types, handler) {
      types = types.split(' ');

      for (var j = 0; j < types.length; j++) {
        eventMap[types[j]] = (eventMap[types[j]] || []).concat(handler);
      }
    }

    function makeFnString(func) {
      return func.toString();
    }

    function compare(func) {
      f = func.toString();

      for (j = 0; j < fnString.length; j++) {
        if (f === fnString[j]) {
          return true;
        }
      }
    }

    if (typeof events === 'object') {
      for (i in events) {
        makeEventMap(i, events[i]);
      }

      obj = obj || this;
    } else {
      if (typeof fn === 'undefined') {
        fn  = obj;
        obj = this;
      }

      makeEventMap(events, fn);
    }

    var type = obj instanceof Genoverse.Track || obj === 'tracks' ? 'tracks' : 'browser';

    for (i in eventMap) {
      event = i + (once ? '.once' : '');

      browser.events[type][event] = browser.events[type][event] || [];
      fnString = $.map(eventMap[i], makeFnString);

      if (!$.grep(browser.events[type][event], compare).length) {
        browser.events[type][event].push.apply(browser.events[type][event], eventMap[i]);
      }
    }
  },

  once: function (events, obj, fn) {
    this.on(events, obj, fn, true);
  },

  destroy: function () {
    this.onTracks('destructor');
    (this.superContainer || this.container).empty();

    if (this.zoomInHighlight) {
      this.zoomInHighlight.add(this.zoomOutHighlight).remove();
    }

    $(window).add(document).off(this.eventNamespace);

    for (var key in this) {
      delete this[key];
    }
  }
}, {
  Genomes: {},
  Plugins: {},

  wrapFunctions: function (obj) {
    for (var key in obj) {
      if (typeof obj[key] === 'function' && typeof obj[key].ancestor !== 'function' && !key.match(/^(base|extend|constructor|on|once|prop|loadPlugins|loadGenome)$/)) {
        Genoverse.functionWrap(key, obj);
      }
    }
  },

  /**
   * functionWrap - wraps event handlers and adds debugging functionality
   **/
  functionWrap: function (key, obj) {
    obj.functions = obj.functions || {};

    if (obj.functions[key] || /^(before|after)/.test(key)) {
      return;
    }

    var func      = key.substring(0, 1).toUpperCase() + key.substring(1);
    var isBrowser = obj instanceof Genoverse;
    var mainObj   = isBrowser || obj instanceof Genoverse.Track ? obj : obj.track;
    var events    = isBrowser ? obj.events.browser : obj.browser.events.tracks;
    var debug;

    if (mainObj.debug) {
      debug = [ isBrowser ? 'Genoverse' : mainObj.id || mainObj.name || 'Track' ];

      if (!isBrowser && obj !== mainObj) {
        debug.push(obj instanceof Genoverse.Track.Controller ? 'Controller' : obj instanceof Genoverse.Track.Model ? 'Model' : 'View');
      }

      debug = debug.concat(key).join('.');
    }

    obj.functions[key] = obj[key];

    obj[key] = function () {
      var args          = [].slice.call(arguments);
      var currentConfig = (this._currentConfig || (this.track ? this.track._currentConfig : {}) || {}).func;
      var rtn;

      // Debugging functionality
      // Enabled by "debug": true || 'time' || { functionName: true, ...} option
      if (mainObj.debug === true) { // if "debug": true, simply log function call
        console.log(debug);
      } else if (mainObj.debug === 'time' || (typeof mainObj.debug === 'object' && mainObj.debug[key])) { // if debug: 'time' || { functionName: true, ...}, log function time
        console.time('time: ' + debug);
      }

      function trigger(when) {
        var once  = events[when + func + '.once'] || [];
        var funcs = (events[when + func] || []).concat(once, typeof mainObj[when + func] === 'function' ? mainObj[when + func] : []);

        if (once.length) {
          delete events[when + func + '.once'];
        }

        for (var i = 0; i < funcs.length; i++) {
          funcs[i].apply(this, args);
        }
      }

      trigger.call(this, 'before');

      if (currentConfig && currentConfig[key]) {
         // override to add a value for this.base
        rtn = function () {
          this.base = this.functions[key] || function () {};
          return currentConfig[key].apply(this, arguments);
        }.apply(this, args);
      } else {
        rtn = this.functions[key].apply(this, args);
      }

      trigger.call(this, 'after');

      if (mainObj.debug === 'time' || (typeof mainObj.debug === 'object' && mainObj.debug[key])) {
        console.timeEnd('time: ' + debug);
      }

      return rtn;
    };
  },

  getAllTrackTypes: function (namespace, n) {
    namespace = namespace || Genoverse.Track;

    if (n) {
      namespace = namespace[n];
    }

    if (!namespace) {
      return [];
    }

    var trackTypes = {};

    $.each(namespace, function (type, func) {
      if (typeof func === 'function' && !Base[type] && !/^(Controller|Model|View|Squishable|Static)$/.test(type)) {
        $.each(Genoverse.getAllTrackTypes(namespace, type), function (subtype, fn) {
          if (typeof fn === 'function') {
            trackTypes[type + '.' + subtype] = fn;
          }
        });

        trackTypes[type] = func;
      }
    });

    return trackTypes;
  },

  getTrackNamespace: function (track) {
    var trackTypes = Genoverse.getAllTrackTypes();
    var namespaces = $.map(trackTypes, function (constructor, name) { return track === constructor || track.prototype instanceof constructor ? name : null }); // Find all namespaces which this track could be
    var j          = namespaces.length;
    var i;

    // Find the most specific namespace for this track - the one which isn't a parent of any other namespaces this track could be
    while (namespaces.length > 1) {
      for (i = 0; i < namespaces.length - 1; i++) {
        if (trackTypes[namespaces[i]].prototype instanceof trackTypes[namespaces[i + 1]]) {
          namespaces.splice(i + 1, 1);
          break;
        } else if (trackTypes[namespaces[i + 1]].prototype instanceof trackTypes[namespaces[i]]) {
          namespaces.splice(i, 1);
          break;
        }
      }

      if (j-- < 0) {
        break; // Stop infinite loop if something went really wrong
      }
    }

    return namespaces[0];
  }
});

Genoverse.id = 0;
Genoverse.prototype.origin = (($('script[src]').filter(function () { return /\/(?:Genoverse|genoverse\.combined.*)\.js$/.test(this.src); }).attr('src') || '').match(/(.*)js\/\w+/) || [])[1] || '';

$(function () {
  if (!$('link[href^="' + Genoverse.prototype.origin + 'css/genoverse.css"]').length) {
    $('<link href="' + Genoverse.prototype.origin + 'css/genoverse.css" rel="stylesheet">').appendTo('body');
  }
});

window.Genoverse = Genoverse;

if (typeof module === 'object' && typeof module.exports === 'object') {
  module.exports = Genoverse;
}


Genoverse.Track = Base.extend({
  height     : 12,        // The height of the gv-track-container div
  margin     : 2,         // The spacing between this track and the next
  resizable  : true,      // Is the track resizable - can be true, false or 'auto'. Auto means the track will automatically resize to show all features, but the user cannot resize it themselves.
  border     : true,      // Does the track have a bottom border
  unsortable : false,     // Is the track unsortable by the user
  fixedOrder : false,     // Is the track unsortable by the user or automatically - use for tracks which always need to go at the top/bottom
  invert     : false,     // If true, features are drawn from the bottom of the track, rather than from the top. This is actually achieved by performing a CSS transform on the gv-image-container div
  legend     : false,     // Does the track have a legend - can be true, false, or a Genoverse.Track.Legend extension/child class.
  children   : undefined, // Does the track have any child tracks - can be one or an array of Genoverse.Track extension/child classes.
  name       : undefined, // The name of the track, which appears in its label
  autoHeight : undefined, // Does the track automatically resize so that all the features are visible
  hideEmpty  : undefined, // If the track automatically resizes, should it be hidden when there are no features, or should an empty track still be shown

  constructor: function (config) {
    if (this.stranded || config.stranded) {
      this.controller = this.controller || Genoverse.Track.Controller.Stranded;
      this.model      = this.model      || Genoverse.Track.Model.Stranded;
    }

    this.models = {};
    this.views  = {};

    this.setInterface();
    this.extend(config);
    this.setDefaults();
    this.setEvents();

    Genoverse.wrapFunctions(this);

    this.setLengthMap();
    this.setMVC();

    if (this.browser.scale) {
      this.controller.setScale();
      this.controller.makeFirstImage();
    }

    if (this.children) {
      this.addChildTracks();
    }

    if (this.legend) {
      this.addLegend();
    }
  },

  setEvents: $.noop,

  setDefaults: function () {
    this.config            = this.config         || {};
    this.configSettings    = this.configSettings || {};
    this.defaultConfig     = this.defaultConfig  || {};
    this.controls          = this.controls       || [];
    this.defaultHeight     = this.height;
    this.defaultAutoHeight = this.autoHeight;
    this.autoHeight        = typeof this.autoHeight !== 'undefined' ? this.autoHeight : this.browser.trackAutoHeight;
    this.hideEmpty         = typeof this.hideEmpty  !== 'undefined' ? this.hideEmpty  : this.browser.hideEmptyTracks;
    this.height           += this.margin;
    this.initialHeight     = this.height;

    if (this.resizable === 'auto') {
      this.autoHeight = true;
    }

    this.setDefaultConfig();
  },

  setDefaultConfig: function () {
    for (var i in this.defaultConfig) {
      if (typeof this.config[i] === 'undefined') {
        this.config[i] = this.defaultConfig[i];
      }
    }

    this._setCurrentConfig();
  },

  setInterface: function () {
    var mvc = [ 'Controller', 'Model', 'View', 'controller', 'model', 'view' ];
    var prop;

    this._interface = {};

    for (var i = 0; i < 3; i++) {
      for (prop in Genoverse.Track[mvc[i]].prototype) {
        if (!/^(constructor|init|reset|setDefaults|base|extend|lengthMap)$/.test(prop)) {
          this._interface[prop] = mvc[i + 3];
        }
      }
    }
  },

  setMVC: function () {
    if (this.model && typeof this.model.abort === 'function') { // TODO: don't abort unless model is changed?
      this.model.abort();
    }

    this._defaults = this._defaults || {};

    var settings           = $.extend(true, {}, this.constructor.prototype, this.getSettingsForLength()[1]); // model, view, options
    var controllerSettings = { prop: {}, func: {} };
    var trackSettings      = {};
    var i;

    settings.controller = settings.controller || this.controller || Genoverse.Track.Controller;

    for (i in settings) {
      if (!/^(constructor|init|reset|setDefaults|base|extend|lengthMap)$/.test(i) && isNaN(i)) {
        if (this._interface[i] === 'controller') {
          controllerSettings[typeof settings[i] === 'function' ? 'func' : 'prop'][i] = settings[i];
        }
        // If we allow trackSettings to overwrite the MVC properties, we will potentially lose of information about instantiated objects that the track needs to perform future switching correctly.
        else if (!Genoverse.Track.prototype.hasOwnProperty(i) && !/^(controller|models|views|config|disabled)$/.test(i)) {
          if (typeof this._defaults[i] === 'undefined') {
            this._defaults[i] = this[i];
          }

          trackSettings[i] = settings[i];
        }
      }
    }

    for (i in this._defaults) {
      if (typeof trackSettings[i] === 'undefined') {
        trackSettings[i] = this._defaults[i];
      }
    }

    // If there are configSettings for the track, ensure that any properties in _currentConfig are set for the model/view/controller/track as appropriate.
    // Functions in _currentConfig are accessed via Genoverse.functionWrap, so nothing needs to be done with them here.
    if (!$.isEmptyObject(this._currentConfig)) {
      var changed = {};
      var type;

      for (i in this._currentConfig.prop) {
        type = this._interface[i];

        if (/model|view/.test(type)) {
          if (trackSettings[type][i] !== this._currentConfig.prop[i]) {
            trackSettings[type][i] = this._currentConfig.prop[i];
            changed[type] = true;
          }
        } else if (type === 'controller') {
          controllerSettings.prop[i] = this._currentConfig.prop[i];
        } else {
          trackSettings[i] = this._currentConfig.prop[i];
        }
      }

      for (type in changed) {
        trackSettings[type].setDefaults(true);
      }
    }

    /*
     * Abandon all hope! If you've tracked a bug to this line of code, be afraid.
     * It will almost certainly be due to the wonderful way the javascript objects work.
     *
     * Consider the following:
     *
     * var Obj = function () {};
     *
     * Obj.prototype = {
     *   scalar : 1,
     *   array  : [ 1, 2, 3 ],
     *   hash   : { a: 1, b : 2 }
     * };
     *
     * var x = new Obj();
     *
     * x.scalar   = 10;
     * x.array[0] = 10;
     * x.hash.a   = 10;
     *
     * var y = new Obj();
     *
     * y is now { scalar: 1, array: [ 10, 2, 3 ], hash: { a: 10, b : 2 } }, since memory locations of objects in prototypes are shared.
     *
     * This has been the cause of numerous Genoverse bugs in the past, due to property sharing between different tracks, models, views, and controllers.
     */
    this.extend(trackSettings);

    this.model.setChrProps(); // make sure the data stores for the current chromsome are being used

    if (!this.controller || typeof this.controller === 'function') {
      this.controller = this.newMVC(settings.controller, controllerSettings.func, $.extend(controllerSettings.prop, { model: this.model, view: this.view }));
    } else {
      controllerSettings.prop.threshold = controllerSettings.prop.threshold || this.controller.constructor.prototype.threshold;
      $.extend(this.controller, controllerSettings.prop, { model: this.model, view: this.view });
    }
  },

  newMVC: function (object, functions, properties) {
    return new (object.extend(
      $.extend(true, {}, object.prototype, functions, {
        prop: $.proxy(this.prop, this)
      })
    ))(
      $.extend(properties, {
        browser : this.browser,
        width   : this.width,
        track   : this
      })
    );
  },

  setLengthMap: function () {
    var mv        = [ 'model', 'view' ];
    var lengthMap = [];
    var models    = {};
    var views     = {};
    var settings, value, deepCopy, prevLengthMap, mvSettings, type, prevType, i, j;

    function compare(a, b) {
      var checked = { browser: true, width: true, track: true }; // Properties set in newMVC should be ignored, as they will be missing if comparing an object with a prototype

      for (var key in a) {
        if (checked[key]) {
          continue;
        }

        checked[key] = true;

        if (typeof a[key] !== typeof b[key]) {
          return false;
        } else if (typeof a[key] === 'function' && typeof b[key] === 'function') {
          if (a[key].toString() !== b[key].toString()) {
            return false;
          }
        } else if (typeof a[key] === 'object' && !(a[key] instanceof $) && !compare(a[key], b[key])) {
          return false;
        } else if (a[key] !== b[key]) {
          return false;
        }
      }

      for (key in b) {
        if (!checked[key]) {
          return false;
        }
      }

      return true;
    }

    // Find all scale-map like keys
    for (var key in this) {
      if (!isNaN(key)) {
        key   = parseInt(key, 10);
        value = this[key];

        lengthMap.push([ key, value === false ? { threshold: key, resizable: 'auto', featureHeight: 0, model: Genoverse.Track.Model, view: Genoverse.Track.View } : $.extend(true, {}, value) ]);
      }
    }

    // Force at least one lengthMap entry to exist, containing the base model and view. lengthMap entries above -1 without a model or view will inherit from -1.
    lengthMap.push([ -1, { view: this.view || Genoverse.Track.View, model: this.model || Genoverse.Track.Model } ]);

    lengthMap = lengthMap.sort(function (a, b) { return b[0] - a[0]; });

    for (i = 0; i < lengthMap.length; i++) {
      if (lengthMap[i][1].model && lengthMap[i][1].view) {
        continue;
      }

      deepCopy = {};

      if (lengthMap[i][0] !== -1) {
        for (j in lengthMap[i][1]) {
          if (this._interface[j]) {
            deepCopy[this._interface[j]] = true;
          }

          if (deepCopy.model && deepCopy.view) {
            break;
          }
        }
      }

      // Ensure that every lengthMap entry has a model and view property, copying them from entries with smaller lengths if needed.
      for (j = i + 1; j < lengthMap.length; j++) {
        if (!lengthMap[i][1].model && lengthMap[j][1].model) {
          lengthMap[i][1].model = deepCopy.model ? Genoverse.Track.Model.extend($.extend(true, {}, lengthMap[j][1].model.prototype)) : lengthMap[j][1].model;
        }

        if (!lengthMap[i][1].view && lengthMap[j][1].view) {
          lengthMap[i][1].view = deepCopy.view ? Genoverse.Track.View.extend($.extend(true, {}, lengthMap[j][1].view.prototype)) : lengthMap[j][1].view;
        }

        if (lengthMap[i][1].model && lengthMap[i][1].view) {
          break;
        }
      }
    }

    // Now every lengthMap entry has a model and a view class, create instances of those classes.
    for (i = 0; i < lengthMap.length; i++) {
      prevLengthMap = lengthMap[i - 1] ? lengthMap[i - 1][1] : {};
      settings      = $.extend(true, {}, this.constructor.prototype, lengthMap[i][1]);
      mvSettings    = { model: { prop: {}, func: {} }, view: { prop: {}, func: {} } };

      // Work out which settings belong to models or views
      for (j in settings) {
        if (j !== 'constructor' && mvSettings[this._interface[j]]) {
          mvSettings[this._interface[j]][typeof settings[j] === 'function' ? 'func' : 'prop'][j] = settings[j];
        }
      }

      // Create models and views, if settings.model or settings.view is a class rather than an instance
      for (j = 0; j < mv.length; j++) {
        type = mv[j];

        if (typeof settings[type] === 'function') {
          prevType = this[mv[j] + 's'];

          // If the previous lengthMap contains an instance of the class in settings, it can be reused.
          // This allows sharing of models and views between lengthMap entries if they are the same, stopping the need to fetch identical data or draw identical images more than once
          if (prevLengthMap[type] instanceof settings[type]) {
            settings[type] = prevLengthMap[type];
          } else {
            // Make an instance of the model/view, based on the settings[type] class but with a prototype that contains the functions in mvSettings[type].func
            settings[type] = this.newMVC(settings[type], mvSettings[type].func, mvSettings[type].prop);

            // If the track already has this.models/this.views and the prototype of the new model/view is the same as the value of this.models/this.views for the same length key, reuse that value.
            // This can happen if the track has configSettings and the user changes config but that only affects one of the model and view.
            // Again, reusing the old value stops the need to fetch identical data or draw identical images more than once.
            if (prevType[lengthMap[i][0]] && compare(prevType[lengthMap[i][0]].constructor.prototype, $.extend({}, settings[type].constructor.prototype, mvSettings[type].prop))) {
              settings[type] = prevType[lengthMap[i][0]];
            }
          }
        }
      }

      models[lengthMap[i][0]] = lengthMap[i][1].model = settings.model;
      views[lengthMap[i][0]]  = lengthMap[i][1].view  = settings.view;
    }

    this.lengthMap = lengthMap;
    this.models    = models;
    this.views     = views;
  },

  getSettingsForLength: function () {
    var length = this.browser.length || (this.browser.end - this.browser.start + 1);

    for (var i = 0; i < this.lengthMap.length; i++) {
      if (length > this.lengthMap[i][0] || length === 1 && this.lengthMap[i][0] === 1) {
        return this.lengthMap[i];
      }
    }

    return [];
  },

  prop: function (key, value) {
    var mvc = [ 'controller', 'model', 'view' ];
    var obj;

    if (this._interface[key]) {
      obj = this[this._interface[key]];
    } else {
      for (var i = 0; i < 3; i++) {
        if (this[mvc[i]] && typeof this[mvc[i]][key] !== 'undefined') {
          obj = this[mvc[i]];
          break;
        }
      }

      obj = obj || this;
    }


    if (typeof value !== 'undefined') {
      if (value === null) {
        delete obj[key];
      } else {
        obj[key] = value;
      }
    }

    return obj ? obj[key] : undefined;
  },

  setHeight: function (height, forceShow) {
    if (this.disabled || (forceShow !== true && height < this.prop('featureHeight')) || (this.prop('threshold') && !this.prop('thresholdMessage') && this.browser.length > this.prop('threshold'))) {
      height = 0;
    } else {
      height = Math.max(height, this.prop('minLabelHeight'));
    }

    this.height = height;

    return height;
  },

  resetHeight: function () {
    if (this.resizable === true) {
      var resizer = this.prop('resizer');

      this.autoHeight = !!([ this.defaultAutoHeight, this.browser.trackAutoHeight ].sort(function (a, b) {
        return (typeof a !== 'undefined' && a !== null ? 0 : 1) - (typeof b !== 'undefined' && b !== null ?  0 : 1);
      })[0]);

      this.controller.resize(this.autoHeight ? this.prop('fullVisibleHeight') : this.defaultHeight + this.margin + (resizer ? resizer.height() : 0));
      this.initialHeight = this.height;
    }
  },

  setConfig: function (config) {
    if (typeof config === 'string' && arguments.length === 2) {
      var _config = {};
      _config[config] = arguments[1];
      config = _config;
    }

    var configChanged = false;
    var conf;

    for (var type in config) {
      conf = config[type];

      if (typeof this.configSettings[type] === 'undefined' || typeof this.configSettings[type][conf] === 'undefined' || this.config[type] === conf) {
        continue;
      }

      this.config[type] = conf;

      configChanged = true;
    }

    if (configChanged) {
      var features = this.prop('featuresById');

      for (var i in features) {
        delete features[i].menuEl;
      }

      this._setCurrentConfig();

      if (!this.disabled) {
        this.reset.apply(this, configChanged ? [ 'config', config ] : []);
      }

      (this.prop('childTracks') || []).forEach(function (track) {
        track.setConfig(config);
      });

      this.browser.saveConfig();
    }
  },

  _setCurrentConfig: function () {
    var settings       = [];
    var featureFilters = [];
    var conf;

    this._currentConfig = { prop: {}, func: {} };

    for (i in this.configSettings) {
      conf = this.getConfig(i);

      if (conf) {
        settings.push(conf);

        if (conf.featureFilter) {
          featureFilters.push(conf.featureFilter);
        }
      }
    }

    if (settings.length) {
      settings = $.extend.apply($, [ true, {} ].concat(settings, { featureFilters: featureFilters }));
      delete settings.featureFilter;
    }

    for (i in settings) {
      this._currentConfig[typeof settings[i] === 'function' && !/^(before|after)/.test(i) ? 'func' : 'prop'][i] = settings[i];
    }
  },

  getConfig: function (type) {
    return this.configSettings[type][this.config[type]];
  },

  addChildTracks: function () {
    if (!this.children) {
      return;
    }

    var track    = this;
    var browser  = this.browser;
    var children = (Array.isArray(this.children) ? this.children : [ this.children ]).filter(function (child) { return child.prototype instanceof Genoverse.Track; });
    var config   = {
      parentTrack : this,
      controls    : 'off',
      threshold   : this.prop('threshold')
    };

    setTimeout(function () {
      track.childTracks = children.map(function (child) {
        if (child.prototype instanceof Genoverse.Track.Legend || child === Genoverse.Track.Legend) {
          return track.addLegend(child.extend(config), true);
        } else {
          return browser.addTrack(child.extend(config));
        }
      });

      track.controller.setLabelHeight();
    }, 1);
  },

  addLegend: function (constructor, now) {
    if (!(constructor || this.legend)) {
      return;
    }

    constructor = constructor || (this.legend.prototype instanceof Genoverse.Track.Legend ? this.legend : Genoverse.Track.Legend);

    var track       = this;
    var legendType  = constructor.prototype.shared === true ? Genoverse.getTrackNamespace(constructor) : constructor.prototype.shared || this.id;
    var config      = {
      id   : legendType + 'Legend',
      name : constructor.prototype.name || (this.name + ' Legend'),
      type : legendType
    };

    this.legendType = legendType;

    function makeLegendTrack() {
      return track.legendTrack = track.browser.legends[config.id] || track.browser.addTrack(constructor.extend(config));
    }

    if (now === true) {
      return makeLegendTrack();
    } else {
      setTimeout(makeLegendTrack, 1);
    }
  },

  changeChr: function () {
    for (var i in this.models) {
      this.models[i].setChrProps();
    }
  },

  updateName: function (name) {
    this.controller.setName(name); // For ease of use in external code
  },

  enable: function () {
    if (this.disabled === true) {
      this.disabled = false;
      this.controller.resize(this.initialHeight);
      this.reset();
    }
  },

  disable: function () {
    if (!this.disabled) {
      this.disabled = true;
      this.controller.resize(0);
    }
  },

  reset: function () {
    this.setLengthMap();

    for (var i in this.models) {
      if (this.models[i].url !== false) {
        this.models[i].init(true);
      }
    }

    for (i in this.views) {
      this.views[i].init();
    }

    this.controller.reset.apply(this.controller, arguments);
  },

  remove: function () {
    this.browser.removeTrack(this);
  },

  destructor: function () {
    this.controller.destroy();

    var objs = [ this.view, this.model, this.controller, this ];

    for (var obj in objs) {
      for (var key in obj) {
        delete obj[key];
      }
    }
  }
});


Genoverse.Track.Controller = Base.extend({
  scrollBuffer   : 1.2,      // Number of widths, if left or right closer to the edges of viewpoint than the buffer, start making more images
  threshold      : Infinity, // Length above which the track is not drawn
  clickTolerance : 0,        // pixels of tolerance added to a click position when finding features for popup menus, when scale < 1
  messages       : undefined,

  constructor: function (properties) {
    $.extend(this, properties);
    Genoverse.wrapFunctions(this);
    this.init();
  },

  init: function () {
    this.setDefaults();
    this.addDomElements();
    this.addUserEventHandlers();

    this.deferreds = []; // tracks deferreds so they can be stopped if the track is destroyed
  },

  setDefaults: function () {
    this.imgRange    = {};
    this.scrollRange = {};
    this.messages    = this.messages || {
      error     : 'ERROR: ',
      threshold : 'Data for this track is not displayed in regions greater than ',
      resize    : 'Some features are currently hidden, <a class="gv-resize">resize to see all</a>'
    };
  },

  reset: function () {
    this.abort();
    this.setDefaults();
    this.resetImages();
    this.browser.closeMenus(this);

    if (arguments[0] !== 'resizing') {
      this.setScale();
      this.makeFirstImage();
    }
  },

  resetImages: function () {
    this.scrollContainer.empty();
    this.resetImageRanges();
  },

  resetImageRanges: function () {
    this.left        = 0;
    this.scrollStart = [ 'ss', this.browser.chr, this.browser.start, this.browser.end ].join('-');

    this.imgRange[this.scrollStart]    = this.imgRange[this.scrollStart]    || { left: this.width * -2, right: this.width * 2 };
    this.scrollRange[this.scrollStart] = this.scrollRange[this.scrollStart] || { start: this.browser.start - this.browser.length, end: this.browser.end + this.browser.length };
  },

  setName: function (name) {
    this.track.name = name;
    this.labelName  = this.labelName || $('<span class="gv-name">').appendTo(this.label);

    this.labelName.attr('title', name).html(name);

    this.minLabelHeight = Math.max(this.labelName.outerHeight(true), this.labelName.outerHeight());

    this.setLabelHeight(true);
  },

  addDomElements: function () {
    var name = this.track.name || '';

    this.menus            = $();
    this.container        = $('<div class="gv-track-container">').appendTo(this.browser.wrapper);
    this.scrollContainer  = $('<div class="gv-scroll-container">').appendTo(this.container);
    this.imgContainer     = $('<div class="gv-image-container">').width(this.width).addClass(this.prop('invert') ? 'gv-invert' : '');
    this.messageContainer = $('<div class="gv-message-container"><div class="gv-messages"></div><i class="gv-control gv-collapse fa fa-angle-double-left"></i><i class="gv-control gv-expand fa fa-angle-double-right"></i></div>').appendTo(this.container);
    this.label            = $('<li>').appendTo(this.browser.labelContainer).height(this.prop('height')).data('track', this.track);
    this.context          = $('<canvas>')[0].getContext('2d');

    if (this.prop('border')) {
      $('<div class="gv-track-border">').appendTo(this.container);
    }

    if (this.prop('unsortable')) {
      this.label.addClass('gv-unsortable');
    } else {
      $('<div class="gv-handle">').appendTo(this.label);
    }

    if (this.prop('children')) {
      this.superContainer = $('<div class="gv-track-container gv-track-super-container">').insertAfter(this.container);
      this.container.appendTo(this.superContainer);
    } else if (this.prop('parentTrack')) {
      this.superContainer = this.prop('parentTrack').prop('superContainer');

      this.container.appendTo(this.superContainer);
      this.label.remove();

      this.label = this.prop('parentTrack').prop('label');
    }

    this.setName(name);

    this.container.height(this.prop('disabled') ? 0 : Math.max(this.prop('height'), this.minLabelHeight));
  },

  addUserEventHandlers: function () {
    var controller = this;
    var browser    = this.browser;

    this.container.on('mouseup', '.gv-image-container', function (e) {
      if ((e.which && e.which !== 1) || (typeof browser.dragStart === 'number' && browser.start !== browser.dragStart) || (browser.dragAction === 'select' && browser.selector.outerWidth(true) > 2)) {
        return; // Only show menus on left click when not dragging and not selecting
      }

      controller.click(e);
    });

    this.messageContainer.children().on('click', function () {
      var collapsed = controller.messageContainer.children('.gv-messages').is(':visible') ? ' gv-collapsed' : '';
      var code      = controller.messageContainer.find('.gv-msg').data('code');

      controller.messageContainer.attr('class', 'gv-message-container' + collapsed);
      controller.checkHeight();

      if (code !== 'error') {
        document.cookie = [ 'gv_msg', code, controller.prop('id') ].join('_') + '=1; expires=' + (collapsed ? 'Tue, 19 Jan 2038' : 'Thu, 01 Jan 1970') + ' 00:00:00 GMT; path=/';
      }
    });
  },

  click: function (e) {
    var target = $(e.target);
    var x      = e.pageX - this.container.parent().offset().left + this.browser.scaledStart;
    var y      = e.pageY - target.offset().top;

    if (this.imgContainer.hasClass('gv-invert')) {
      y = target.height() - y;
    }

    return this.browser.makeMenu(this.getClickedFeatures(x, y, target), e, this.track);
  },

  getClickedFeatures: function (x, y, target) {
    var bounds    = { x: x, y: y, w: 1, h: 1 };
    var scale     = this.scale;
    var tolerance = scale < 1 ? this.clickTolerance : 0;

    if (tolerance) {
      bounds.x -= tolerance / 2;
      bounds.w += tolerance;
    }

    var features = this[target && target.hasClass('gv-labels') ? 'labelPositions' : 'featurePositions'].search(bounds);

    if (tolerance) {
      return features.sort(function (a, b) { return Math.abs(a.position[scale].start - x) - Math.abs(b.position[scale].start - x); });
    } else {
      return this.model.sortFeatures(features);
    }
  },

  // FIXME: messages are now hidden/shown instead of removed/added. This will cause a problem if a new message arrives with the same code as one that already exists.
  showMessage: function (code, additionalText) {
    var messages = this.messageContainer.children('.gv-messages');

    if (!messages.children('.gv-' + code).show().length) {
      var msg = $('<div class="gv-msg gv-' + code + '">' + this.messages[code] + (additionalText || '') + '</div>').data('code', code).prependTo(messages);

      if (code === 'resize') {
        msg.children('a.gv-resize').on('click', $.proxy(function () {
          this.resize(this.fullVisibleHeight);
        }, this));
      }

      this.messageContainer[document.cookie.match([ 'gv_msg', code, this.prop('id') ].join('_') + '=1') ? 'addClass' : 'removeClass']('gv-collapsed');
    }

    var height = this.messageContainer.show().outerHeight(true);

    if (height > this.prop('height')) {
      this.resize(height, undefined, false);
    }

    messages = null;
  },

  hideMessage: function (code) {
    var messages = this.messageContainer.find('.gv-msg');

    if (code) {
      messages = messages.filter('.gv-' + code).hide();

      if (messages.length && !messages.siblings().filter(function () { return this.style.display !== 'none'; }).length) {
        this.messageContainer.hide();
      }
    } else {
      messages.hide();
      this.messageContainer.hide();
    }

    messages = null;
  },

  showError: function (error) {
    this.showMessage('error', error);
  },

  checkHeight: function () {
    if (this.browser.length > this.threshold) {
      if (this.thresholdMessage) {
        this.showMessage('threshold', this.thresholdMessage);
        this.fullVisibleHeight = Math.max(this.messageContainer.outerHeight(true), this.minLabelHeight);
      } else {
        this.fullVisibleHeight = 0;
      }
    } else if (this.thresholdMessage) {
      this.hideMessage('threshold');
    }

    if (!this.prop('resizable')) {
      return;
    }

    var autoHeight;

    if (this.browser.length > this.threshold) {
      autoHeight = this.prop('autoHeight');
      this.prop('autoHeight', true);
    } else {
      this.fullVisibleHeight = this.visibleFeatureHeight() || (this.messageContainer.is(':visible') ? this.messageContainer.outerHeight(true) : this.prop('hideEmpty') ? 0 : this.minLabelHeight);
    }

    this.autoResize();

    if (typeof autoHeight !== 'undefined') {
      this.prop('autoHeight', autoHeight);
    }
  },

  visibleFeatureHeight: function () {
    var bounds    = { x: this.browser.scaledStart, w: this.width, y: 0, h: 9e99 };
    var scale     = this.scale;
    var features  = this.featurePositions.search(bounds);
    var minHeight = this.prop('hideEmpty') ? 0 : this.minLabelHeight;
    var height    = Math.max.apply(Math, $.map(features, function (feature) { return feature.position[scale].bottom; }).concat(minHeight));

    if (this.prop('labels') === 'separate') {
      this.labelTop = height;
      height += Math.max.apply(Math, $.map(this.labelPositions.search(bounds).concat(this.prop('repeatLabels') ? features : []), function (feature) { return feature.position[scale].label.bottom; }).concat(minHeight));
    }

    return height;
  },

  autoResize: function () {
    var autoHeight = this.prop('autoHeight');

    if (autoHeight || this.prop('labels') === 'separate') {
      this.resize(autoHeight ? this.fullVisibleHeight : this.prop('height'), this.labelTop, false);
    } else {
      this.toggleExpander(false);
    }
  },

  resize: function (height, arg, saveConfig) {
    height = this.track.setHeight(height, arg);

    if (typeof arg === 'number') {
      this.imgContainers.children('.gv-labels').css('top', arg);
    }

    this.container.height(height)[height ? 'show' : 'hide']();
    this.setLabelHeight();
    this.toggleExpander();

    if (saveConfig !== false) {
      this.browser.saveConfig();
    }
  },

  toggleExpander: function (saveConfig) {
    if (this.prop('resizable') !== true) {
      return;
    }

    var featureMargin = this.prop('featureMargin');
    var height        = this.prop('height');

    // Note: fullVisibleHeight - featureMargin.top - featureMargin.bottom is not actually the correct value to test against, but it's the easiest best guess to obtain.
    // fullVisibleHeight is the maximum bottom position of the track's features in the region, which includes margin at the bottom of each feature and label
    // Therefore fullVisibleHeight includes this margin for the bottom-most feature.
    // The correct value (for a track using the default positionFeatures code) is:
    // fullVisibleHeight - ([there are labels in this region] ? (labels === 'separate' ? 0 : featureMargin.bottom + 1) + 2 : featureMargin.bottom)
    if (this.fullVisibleHeight - featureMargin.top - featureMargin.bottom > height && !this.prop('disabled')) {
      this.showMessage('resize');

      var controller = this;
      var h          = this.messageContainer.outerHeight(true);

      if (h > height) {
        this.resize(h, undefined, saveConfig);
      }

      this.expander = (this.expander || $('<div class="gv-expander gv-static">').width(this.width).appendTo(this.container).on('click', function () {
        controller.resize(controller.fullVisibleHeight);
      }))[this.prop('height') === 0 ? 'hide' : 'show']();
    } else if (this.expander) {
      this.hideMessage('resize');
      this.expander.hide();
    }
  },

  setLabelHeight: function (enforceMinHeight) {
    var parent = this.prop('parentTrack');

    if (parent) {
      return parent.controller.setLabelHeight();
    }

    var tracks = [ this ].concat(this.prop('childTracks') || []);
    var height = tracks.reduce(function (h, track) { return h + (track.prop('disabled') ? 0 : track.prop('height')); }, 0);

    this.label.height(this.prop('disabled') ? 0 : enforceMinHeight && this.minLabelHeight ? Math.max(height, this.minLabelHeight) : height);

    if (tracks.length > 1) {
      var top = tracks[0].prop('height');

      tracks.slice(1).forEach(function (track) {
        var h = track.prop('height');

        track.prop('labelName').css('top', top)[h ? 'removeClass' : 'addClass']('gv-hide');
        top += h;
      });
    }
  },

  setWidth: function (width) {
    var track = this.track;

    $.each([ this, track, track.model, track.view ], function () {
      this.width = width;
    });

    this.imgContainer.add(this.expander).width(width);
  },

  setScale: function () {
    var controller = this;

    this.scale = this.browser.scale;

    this.track.setMVC();
    this.resetImageRanges();

    var labels = this.prop('labels');

    if (labels && labels !== 'overlay') {
      this.model.setLabelBuffer(this.browser.labelBuffer);
    }

    if (this.threshold !== Infinity && this.prop('resizable') !== 'auto') {
      this.thresholdMessage = this.view.formatLabel(this.threshold);
    }

    $.each(this.view.setScaleSettings(this.scale), function (k, v) { controller[k] = v; });

    this.hideMessage();
  },

  move: function (delta) {
    this.left += delta;
    this.scrollContainer.css('left', this.left);

    var scrollStart = this.scrollStart;

    if (this.imgRange[scrollStart] && this.imgRange[scrollStart].left + this.left > -this.scrollBuffer * this.width) {
      var end = this.scrollRange[scrollStart].start - 1;

      this.makeImage({
        scale : this.scale,
        chr   : this.browser.chr,
        start : end - this.browser.length + 1,
        end   : end,
        left  : this.imgRange[scrollStart].left,
        cls   : scrollStart
      });

      (this.imgRange[scrollStart]    || {}).left  -= this.width;
      (this.scrollRange[scrollStart] || {}).start -= this.browser.length;
    }

    if (this.imgRange[scrollStart] && this.imgRange[scrollStart].right + this.left < this.scrollBuffer * this.width) {
      var start = this.scrollRange[scrollStart].end + 1;

      this.makeImage({
        scale : this.scale,
        chr   : this.browser.chr,
        start : start,
        end   : start + this.browser.length - 1,
        left  : this.imgRange[scrollStart].right,
        cls   : scrollStart
      });

      (this.imgRange[scrollStart]    || {}).right += this.width;
      (this.scrollRange[scrollStart] || {}).end   += this.browser.length;
    }
  },

  moveTo: function (chr, start, end, delta) {
    var scrollRange = this.scrollRange[this.scrollStart];
    var scrollStart = [ 'ss', chr, start, end ].join('-');

    if (this.scrollRange[scrollStart] || start > scrollRange.end || end < scrollRange.start) {
      this.resetImageRanges();
      this.makeFirstImage(scrollStart);
    } else {
      this.move(typeof delta === 'number' ? delta : (start - this.browser.start) * this.scale);
      this.checkHeight();
    }
  },

  makeImage: function (params) {
    params.scaledStart   = params.scaledStart   || params.start * params.scale;
    params.width         = params.width         || this.width;
    params.height        = params.height        || this.prop('height');
    params.featureHeight = params.featureHeight || 0;
    params.labelHeight   = params.labelHeight   || 0;

    var deferred;
    var controller = this;
    var tooLarge   = this.browser.length > this.threshold;
    var div        = this.imgContainer.clone().addClass((params.cls + ' gv-loading').replace('.', '_')).css({ left: params.left, display: params.cls === this.scrollStart ? 'block' : 'none' });
    var bgImage    = params.background ? $('<img class="gv-bg">').hide().addClass(params.background).data(params).prependTo(div) : false;
    var image      = $('<img class="gv-data">').hide().data(params).appendTo(div).on('load', function () {
      $(this).fadeIn('fast').parent().removeClass('gv-loading');
      $(this).siblings('.gv-bg').show();
    });

    params.container = div;

    this.imgContainers.push(div[0]);
    this.scrollContainer.append(this.imgContainers);

    if (!tooLarge && !this.model.checkDataRange(params.chr, params.start, params.end)) {
      var buffer = this.prop('dataBuffer');

      params.start -= buffer.start;
      params.end   += buffer.end;
      deferred      = this.model.getData(params.chr, params.start, params.end);
    }

    if (!deferred) {
      deferred = $.Deferred();
      setTimeout($.proxy(deferred.resolve, this), 1); // This defer makes scrolling A LOT smoother, pushing render call to the end of the exec queue
    }

    this.deferreds.push(deferred);

    return deferred.done(function () {
      var features = tooLarge ? [] : controller.model.findFeatures(params.chr, params.start, params.end);
      controller.render(features, image);

      if (bgImage) {
        controller.renderBackground(features, bgImage);
      }
    }).fail(function (e) {
      controller.showError(e);
    });
  },

  makeFirstImage: function (moveTo) {
    var deferred = $.Deferred();

    if (this.scrollContainer.children().hide().filter('.' + (moveTo || this.scrollStart)).show().length) {
      this.scrollContainer.css('left', 0);
      this.checkHeight();

      return deferred.resolve();
    }

    var controller = this;
    var chr        = this.browser.chr;
    var start      = this.browser.start;
    var end        = this.browser.end;
    var length     = this.browser.length;
    var scale      = this.scale;
    var cls        = this.scrollStart;
    var images     = [{ chr: chr, start: start, end: end, scale: scale, cls: cls, left: 0 }];
    var left       = 0;
    var width      = this.width;

    if (!this.browser.isStatic) {
      if (start > 1) {
        images.push({ chr: chr, start: start - length, end: start - 1, scale: scale, cls: cls, left: -this.width });
        left   = -this.width;
        width += this.width;
      }

      if (end < this.browser.getChromosomeSize(chr)) {
        images.push({ chr: chr, start: end + 1, end: end + length, scale: scale, cls: cls, left: this.width });
        width += this.width;
      }
    }

    var loading = this.imgContainer.clone().addClass('gv-loading').css({ left: left, width: width }).prependTo(this.scrollContainer.css('left', 0));

    function makeImages() {
      $.when.apply($, images.map(function (image) {
        return controller.makeImage(image);
      })).done(deferred.resolve);

      loading.remove();
    }

    if (length > this.threshold || this.model.checkDataRange(chr, start, end)) {
      makeImages();
    } else {
      var buffer = this.prop('dataBuffer');

      this.model.getData(chr, start - buffer.start - length, end + buffer.end + length).done(makeImages).fail(function (e) {
        controller.showError(e);
      });
    }

    return deferred;
  },

  render: function (features, img) {
    var params         = img.data();
        features       = this.view.positionFeatures(this.view.scaleFeatures(features, params.scale), params); // positionFeatures alters params.featureHeight, so this must happen before the canvases are created
    var featureCanvas  = $('<canvas>').attr({ width: params.width, height: params.featureHeight || 1 });
    var labelCanvas    = this.prop('labels') === 'separate' && params.labelHeight ? featureCanvas.clone().attr('height', params.labelHeight) : featureCanvas;
    var featureContext = featureCanvas[0].getContext('2d');
    var labelContext   = labelCanvas[0].getContext('2d');

    featureContext.font = labelContext.font = this.prop('font');

    switch (this.prop('labels')) {
      case false     : break;
      case 'overlay' : labelContext.textAlign = 'center'; labelContext.textBaseline = 'middle'; break;
      default        : labelContext.textAlign = 'left';   labelContext.textBaseline = 'top';    break;
    }

    this.view.draw(features, featureContext, labelContext, params.scale);

    img.attr('src', featureCanvas[0].toDataURL());

    if (labelContext !== featureContext) {
      img.clone(true).attr({ 'class': 'gv-labels', src: labelCanvas[0].toDataURL() }).insertAfter(img);
    }

    this.checkHeight();

    featureCanvas = labelCanvas = img = null;
  },

  renderBackground: function (features, img, height) {
    var canvas = $('<canvas>').attr({ width: this.width, height: height || 1 })[0];
    this.view.drawBackground(features, canvas.getContext('2d'), img.data());
    img.attr('src', canvas.toDataURL());
    canvas = img = null;
  },

  populateMenu: function (feature) {
    var f    = $.extend(true, {}, feature);
    var menu = {
      title    : f.label ? f.label[0] : f.id,
      Location : f.chr + ':' + f.start + '-' + f.end
    };

    delete f.chr;
    delete f.start;
    delete f.end;
    delete f.sort;

    for (var i in f) {
      if (typeof f[i] === 'object' || menu.title === f[i]) {
        delete f[i];
      }
    }

    return $.extend(menu, f);
  },

  abort: function () {
    for (var i = 0; i < this.deferreds.length; i++) {
      if (this.deferreds[i].state() === 'pending') {
        this.deferreds[i].reject();
      }
    }

    this.deferreds = [];
  },

  destroy: function () {
    this.abort();
    this.container.add(this.label).add(this.menus).remove();
  }
});


Genoverse.Track.Model = Base.extend({
  dataType         : 'json',
  allData          : false,
  dataBuffer       : undefined, // e.g. { start: 0, end: 0 } - basepairs to extend data region for, when getting data from the origin
  xhrFields        : undefined,
  url              : undefined,
  urlParams        : undefined, // hash of URL params
  data             : undefined, // if defined, will be used instead of fetching data from a source
  dataRequestLimit : undefined, // if defined, multiple requests will be made by getData if the region size exceeds its value

  constructor: function (properties) {
    $.extend(this, properties);
    Genoverse.wrapFunctions(this);
    this.init();
  },

  init: function (reset) {
    this.setDefaults(reset);

    if (reset) {
      for (var i in this.featuresById) {
        delete this.featuresById[i].position;
      }
    }

    if (!reset || this.data) {
      delete this.dataRangesByChr;
      delete this.featuresByChr;
      this.featuresById = {};
      this.setChrProps();
    }

    this.dataLoading = []; // tracks incomplete requests for data
  },

  setDefaults: function (reset) {
    this.dataBuffer = this.dataBuffer || { start: 0, end: 0 }; // basepairs to extend data region for, when getting data from the origin
    this.urlParams  = this.urlParams  || {};                   // hash of URL params
    this.xhrFields  = this.xhrFields  || {};

    this.dataBufferStart = this.dataBuffer.start; // Remember original dataBuffer.start, since dataBuffer.start is updated based on browser scale, in setLabelBuffer

    if (!this._url) {
      this._url = this.url; // Remember original url
    }

    if (reset && !this.url && this._url) {
      this.url = this._url;
    }
  },

  setChrProps: function () {
    var chr = this.browser.chr;

    this.dataRangesByChr = this.dataRangesByChr || {};
    this.featuresByChr   = this.featuresByChr   || {};

    this.dataRangesByChr[chr] = this.dataRangesByChr[chr] || new RTree();
    this.featuresByChr[chr]   = this.featuresByChr[chr]   || new RTree();
  },

  features   : function (chr) { return this.featuresByChr[chr];   },
  dataRanges : function (chr) { return this.dataRangesByChr[chr]; },

  parseURL: function (chr, start, end, url) {
    if (this.allData) {
      start = 1;
      end   = this.browser.getChromosomeSize(chr);
    }

    return (url || this.url).replace(/__ASSEMBLY__/, this.browser.assembly).replace(/__CHR__/, chr).replace(/__START__/, start).replace(/__END__/, end);
  },

  setLabelBuffer: function (buffer) {
    this.dataBuffer.start = Math.max(this.dataBufferStart, buffer);
  },

  getData: function (chr, start, end, done) {
    start = Math.max(1, start);
    end   = Math.min(this.browser.getChromosomeSize(chr), end);

    var deferred = $.Deferred();

    if (typeof this.data !== 'undefined') {
      this.receiveData(typeof this.data.sort === 'function' ? this.data.sort(function (a, b) { return a.start - b.start; }) : this.data, chr, start, end);
      return deferred.resolveWith(this);
    }

    var model  = this;
    var bins   = [];
    var length = end - start + 1;

    if (!this.url) {
      return deferred.resolveWith(this);
    }

    if (this.dataRequestLimit && length > this.dataRequestLimit) {
      var i = Math.ceil(length / this.dataRequestLimit);

      while (i--) {
        bins.push([ start, i ? start += this.dataRequestLimit - 1 : end ]);
        start++;
      }
    } else {
      bins.push([ start, end ]);
    }

    $.when.apply($, $.map(bins, function (bin) {
      var request = $.ajax({
        url       : model.parseURL(chr, bin[0], bin[1]),
        data      : model.urlParams,
        dataType  : model.dataType,
        context   : model,
        xhrFields : model.xhrFields,
        success   : function (data) { this.receiveData(data, chr, bin[0], bin[1]); },
        error     : function (xhr, statusText) { this.track.controller.showError(statusText + ' while getting the data, see console for more details', arguments); },
        complete  : function (xhr) { this.dataLoading = $.grep(this.dataLoading, function (t) { return xhr !== t; }); }
      });

      request.coords = [ chr, bin[0], bin[1] ]; // store actual chr, start and end on the request, in case they are needed

      if (typeof done === 'function') {
        request.done(done);
      }

      model.dataLoading.push(request);

      return request;
    })).done(function () { deferred.resolveWith(model); });

    return deferred;
  },

  receiveData: function (data, chr, start, end) {
    start = Math.max(start, 1);
    end   = Math.min(end, this.browser.getChromosomeSize(chr));

    this.setDataRange(chr, start, end);
    this.parseData(data, chr, start, end);

    if (this.allData) {
      this.url = false;
    }
  },

  /**
  * parseData(data, chr, start, end) - parse raw data from the data source (e.g. online web service)
  * extract features and insert it into the internal features storage (RTree)
  *
  * >> data  - raw data from the data source (e.g. ajax response)
  * >> chr   - chromosome of the data
  * >> start - start location of the data
  * >> end   - end   location of the data
  * << nothing
  *
  * every feature extracted this routine must construct a hash with at least 3 values:
  *  {
  *    id    : [unique feature id, string],
  *    start : [chromosomal start position, integer],
  *    end   : [chromosomal end position, integer],
  *    [other optional key/value pairs]
  *  }
  *
  * and call this.insertFeature(feature)
  */
  parseData: function (data, chr, start, end) {
    var feature;

    // Example of parseData function when data is an array of hashes like { start: ..., end: ... }
    for (var i = 0; i < data.length; i++) {
      feature = data[i];

      feature.chr  = feature.chr || chr;
      feature.sort = start + i;

      this.insertFeature(feature);
    }
  },

  updateData: function (data) {
    this.data = data;
    this.track.reset();
  },

  setDataRange: function (chr, start, end) {
    if (this.allData) {
      start = 1;
      end   = this.browser.getChromosomeSize(chr);
    }

    this.dataRanges(chr).insert({ x: start, w: end - start + 1, y: 0, h: 1 }, [ start, end ]);
  },

  checkDataRange: function (chr, start, end) {
    start = Math.max(1, start);
    end   = Math.min(this.browser.getChromosomeSize(chr), end);

    var ranges = this.dataRanges(chr).search({ x: start, w: end - start + 1, y: 0, h: 1 }).sort(function (a, b) { return a[0] - b[0]; });

    if (!ranges.length) {
      return false;
    }

    var s = ranges.length === 1 ? ranges[0][0] : 9e99;
    var e = ranges.length === 1 ? ranges[0][1] : -9e99;

    for (var i = 0; i < ranges.length - 1; i++) {
      // s0 <= s1 && ((e0 >= e1) || (e0 + 1 >= s1))
      if (ranges[i][0] <= ranges[i + 1][0] && ((ranges[i][1] >= ranges[i + 1][1]) || (ranges[i][1] + 1 >= ranges[i + 1][0]))) {
        s = Math.min(s, ranges[i][0]);
        e = Math.max(e, ranges[i][1], ranges[i + 1][1]);
      } else {
        return false;
      }
    }

    return start >= s && end <= e;
  },

  insertFeature: function (feature) {
    if (!feature.chr) {
      return;
    }

    // Make sure we have a unique ID, this method is not efficient, so better supply your own id
    if (!feature.id) {
      feature.id = feature.ID || this.hashCode(JSON.stringify($.extend({}, feature, { sort: '' }))); // sort is dependant on the browser's region, so will change on zoom
    }

    var features = this.features(feature.chr);

    if (features && !this.featuresById[feature.id]) {
      if (feature.subFeatures) {
        feature.subFeatures.sort(function (a, b) { return a.start - b.start; });

        for (var i = 0; i < feature.subFeatures.length; i++) {
          feature.subFeatures[i].start = Math.min(Math.max(feature.subFeatures[i].start, feature.start), feature.end);
          feature.subFeatures[i].end   = Math.max(Math.min(feature.subFeatures[i].end,   feature.end),   feature.start);
        }

        // Add "fake" sub-features at the start and end of the feature - this will allow joins to be drawn when there are no sub-features in the current region.
        feature.subFeatures.unshift({ start: feature.start, end: feature.start, fake: true });
        feature.subFeatures.push   ({ start: feature.end,   end: feature.end,   fake: true });
      }

      features.insert({ x: feature.start, y: 0, w: feature.end - feature.start + 1, h: 1 }, feature);
      this.featuresById[feature.id] = feature;
    }
  },

  findFeatures: function (chr, start, end) {
    var features = this.features(chr).search({ x: start - this.dataBuffer.start, y: 0, w: end - start + this.dataBuffer.start + this.dataBuffer.end + 1, h: 1 });
    var filters  = this.prop('featureFilters') || [];

    for (var i = 0; i < filters.length; i++) {
      features = $.grep(features, $.proxy(filters[i], this));
    }

    return this.sortFeatures(features);
  },

  sortFeatures: function (features) {
    return features.sort(function (a, b) { return a.sort - b.sort; });
  },

  abort: function () {
    for (var i = 0; i < this.dataLoading.length; i++) {
      this.dataLoading[i].abort();
    }

    this.dataLoading = [];
  },

  hashCode: function (string) {
    var hash = 0;
    var c;

    if (!string.length) {
      return hash;
    }

    for (var i = 0; i < string.length; i++) {
      c    = string.charCodeAt(i);
      hash = ((hash << 5) - hash) + c;
      hash = hash & hash; // Convert to 32bit integer
    }

    return '' + hash;
  }
});


Genoverse.Track.View = Base.extend({
  fontHeight       : 10,
  fontFamily       : 'sans-serif',
  fontWeight       : 'normal',
  fontColor        : undefined, // label color defaults to this, or feature color, or track.color (below), in that order of precedence
  color            : '#000000',
  minScaledWidth   : 0.5,
  widthCorrection  : 1, // Pixels to add to the end of a feature when scale > 1 - ensures that 1bp features are always at least 1px wide
  labels           : true,
  repeatLabels     : false,
  bump             : false,
  alwaysReposition : false,
  depth            : undefined,
  featureHeight    : undefined, // defaults to track height
  featureMargin    : undefined, // e.g. { top: 3, right: 1, bottom: 1, left: 0 }

  subFeatureJoinStyle     : false, // Can be 'line', 'peak', 'curve'
  subFeatureJoinLineWidth : 0.5,

  constructor: function (properties) {
    $.extend(this, properties);
    Genoverse.wrapFunctions(this);
    this.init();
  },

  // difference between init and constructor: init gets called on reset, if reset is implemented
  init: function () {
    this.setDefaults();
    this.scaleSettings = {};
  },

  setDefaults: function () {
    this.featureMargin = this.featureMargin || { top: 3, right: 1, bottom: 1, left: 0 };

    var margin = [ 'top', 'right', 'bottom', 'left' ];

    for (var i = 0; i < margin.length; i++) {
      if (typeof this.featureMargin[margin[i]] !== 'number') {
        this.featureMargin[margin[i]] = 0;
      }
    }

    this.context       = $('<canvas>')[0].getContext('2d');
    this.featureHeight = typeof this.featureHeight !== 'undefined' ? this.featureHeight : this.prop('defaultHeight');
    this.font          = this.fontWeight + ' ' + this.fontHeight + 'px ' + this.fontFamily;
    this.labelUnits    = [ 'bp', 'kb', 'Mb', 'Gb', 'Tb' ];

    this.context.font = this.font;

    if (this.labels && this.labels !== 'overlay' && (this.depth || this.bump === 'labels')) {
      this.labels = 'separate';
    }
  },

  setScaleSettings: function (scale) {
    var chr = this.browser.chr;

    if (!this.scaleSettings[chr]) {
      this.scaleSettings[chr] = {};
    }

    if (!this.scaleSettings[chr][scale]) {
      var featurePositions = new RTree();

      this.scaleSettings[chr][scale] = {
        imgContainers    : $(),
        featurePositions : featurePositions,
        labelPositions   : this.labels === 'separate' ? new RTree() : featurePositions
      };
    }

    return this.scaleSettings[chr][scale];
  },

  scaleFeatures: function (features, scale) {
    var add = Math.max(scale, this.widthCorrection);
    var feature, j;

    for (var i = 0; i < features.length; i++) {
      feature = features[i];

      if (!feature.position) {
        feature.position = {};
      }

      if (!feature.position[scale]) {
        feature.position[scale] = {
          start  : feature.start * scale,
          width  : Math.max((feature.end - feature.start) * scale + add, this.minScaledWidth),
          height : feature.height || this.featureHeight
        };
      }

      if (feature.subFeatures) {
        for (j = 0; j < feature.subFeatures.length; j++) {
          if (typeof feature.subFeatures[j].height === 'undefined') {
            feature.subFeatures[j].height = feature.position[scale].height;
          }
        }

        this.scaleFeatures(feature.subFeatures, scale);
      }
    }

    return features;
  },

  positionFeatures: function (features, params) {
    params.margin = this.prop('margin');

    for (var i = 0; i < features.length; i++) {
      this.positionFeature(features[i], params);
    }

    params.width         = Math.ceil(params.width);
    params.height        = Math.ceil(params.height);
    params.featureHeight = Math.max(Math.ceil(params.featureHeight), this.prop('resizable') ? Math.max(this.prop('height'), this.prop('minLabelHeight')) : 0);
    params.labelHeight   = Math.ceil(params.labelHeight);

    return features;
  },

  positionFeature: function (feature, params) {
    var scale         = params.scale;
    var scaleSettings = this.scaleSettings[feature.chr][scale];

    if (!scaleSettings) {
      return;
    }

    var subFeatures = feature.subFeatures || [];
    var i;

    feature.position[scale].X = feature.position[scale].start - params.scaledStart; // FIXME: always have to reposition for X, in case a feature appears in 2 images. Pass scaledStart around instead?

    for (i = 0; i < subFeatures.length; i++) {
      subFeatures[i].position[scale].x = subFeatures[i].position[scale].start - params.scaledStart;

      if (this.subFeatureJoinStyle) {
        subFeatures[i].position[scale].join   = subFeatures[i].position[scale].join || {};
        subFeatures[i].position[scale].join.x = subFeatures[i].position[scale].start + subFeatures[i].position[scale].width - params.scaledStart;
      }
    }

    if (this.alwaysReposition || !feature.position[scale].positioned) {
      feature.position[scale].H = feature.position[scale].height + this.featureMargin.bottom;
      feature.position[scale].W = feature.position[scale].width  + (feature.marginRight || this.featureMargin.right);
      feature.position[scale].Y = (
        typeof feature.position[scale].y === 'number' ? feature.position[scale].y :
        typeof feature.y                 === 'number' ? feature.y * feature.position[scale].H : 0
      ) + (feature.marginTop || this.featureMargin.top);

      if (feature.label) {
        if (typeof feature.label === 'string') {
          feature.label = feature.label.split('\n');
        }

        var context = this.context;

        feature.labelHeight = feature.labelHeight || (this.fontHeight + 2) * feature.label.length;
        feature.labelWidth  = feature.labelWidth  || Math.max.apply(Math, $.map(feature.label, function (l) { return Math.ceil(context.measureText(l).width); })) + 1;

        if (this.labels === true) {
          feature.position[scale].H += feature.labelHeight;
          feature.position[scale].W  = Math.max(feature.labelWidth, feature.position[scale].W);
        } else if (this.labels === 'separate' && !feature.position[scale].label) {
          feature.position[scale].label = {
            x: feature.position[scale].start,
            y: feature.position[scale].Y,
            w: feature.labelWidth,
            h: feature.labelHeight
          };
        }
      }

      var bounds = {
        x: feature.position[scale].start,
        y: feature.position[scale].Y,
        w: feature.position[scale].W,
        h: feature.position[scale].H + (feature.marginTop || this.featureMargin.top)
      };

      feature.position[scale].bounds = bounds;

      if (this.bump === true) {
        this.bumpFeature(bounds, feature, scale, scaleSettings.featurePositions);
      }

      scaleSettings.featurePositions.insert(bounds, feature);

      feature.position[scale].bottom     = feature.position[scale].Y + bounds.h + params.margin;
      feature.position[scale].positioned = true;
    }

    var join = this.subFeatureJoinStyle && subFeatures.length ? {
      height : Math.max.apply(Math, subFeatures.map(function (c) { return c.fake ? 0 : c.position[scale].height; })) / 2 * (feature.strand > 0 ? -1 : 1),
      y      : feature.position[scale].Y + feature.position[scale].height / 2
    } : false;

    for (i = 0; i < subFeatures.length; i++) {
      subFeatures[i].position[scale].y = feature.position[scale].Y + (feature.position[scale].height - subFeatures[i].position[scale].height) / 2;

      if (join && subFeatures[i + 1]) {
        $.extend(subFeatures[i].position[scale].join, { width: subFeatures[i + 1].position[scale].x - subFeatures[i].position[scale].join.x }, join);
      }
    }

    if (this.labels === 'separate' && feature.position[scale].label) {
      if (this.alwaysReposition || !feature.position[scale].label.positioned) {
        this.bumpFeature(feature.position[scale].label, feature, scale, scaleSettings.labelPositions);

        feature.position[scale].label.bottom     = feature.position[scale].label.y + feature.position[scale].label.h + params.margin;
        feature.position[scale].label.positioned = true;

        scaleSettings.labelPositions.insert(feature.position[scale].label, feature);
      }

      params.labelHeight = Math.max(params.labelHeight, feature.position[scale].label.bottom);
    }

    params.featureHeight = Math.max(params.featureHeight, feature.position[scale].bottom);
    params.height        = Math.max(params.height, params.featureHeight + params.labelHeight);
  },

  // FIXME: should label bumping bounds be distinct from feature bumping bounds when label is smaller than feature?
  bumpFeature: function (bounds, feature, scale, tree) {
    var depth         = 0;
    var scaleSettings = this.scaleSettings[feature.chr][scale];
    var labels        = tree === scaleSettings.labelPositions && tree !== scaleSettings.featurePositions;
    var bump, clash;

    do {
      if (this.depth && ++depth >= this.depth) {
        if (!labels && $.grep(scaleSettings.featurePositions.search(bounds), function (f) { return f.position[scale].visible !== false; }).length) {
          feature.position[scale].visible = false;
        }

        break;
      }

      bump  = false;
      clash = tree.search(bounds)[0];

      if (clash && clash.id !== feature.id) {
        bounds.y = clash.position[scale][labels ? 'label' : 'bounds'].y + clash.position[scale][labels ? 'label' : 'bounds'].h;
        bump     = true;
      }
    } while (bump);

    if (!labels) {
      feature.position[scale].Y = bounds.y;
    }
  },

  draw: function (features, featureContext, labelContext, scale) {
    var feature, f;

    for (var i = 0; i < features.length; i++) {
      feature = features[i];

      if (feature.position[scale].visible !== false) {
        // TODO: extend with feature.position[scale], rationalize keys
        f = $.extend({}, feature, {
          x             : feature.position[scale].X,
          y             : feature.position[scale].Y,
          width         : feature.position[scale].width,
          height        : feature.position[scale].height,
          labelPosition : feature.position[scale].label
        });

        this.drawFeature(f, featureContext, labelContext, scale);

        if (f.legend !== feature.legend) {
          feature.legend      = f.legend;
          feature.legendColor = f.color;
        }
      }
    }
  },

  drawFeature: function (feature, featureContext, labelContext, scale) {
    if (feature.color !== false && !feature.color) {
      this.setFeatureColor(feature);
    }

    if (feature.subFeatures) {
      this.drawSubFeatures(feature, featureContext, labelContext, scale);
    } else {
      if (feature.x < 0 || feature.x + feature.width > this.width) {
        this.truncateForDrawing(feature);
      }

      if (feature.color !== false) {
        featureContext.fillStyle = feature.color;
        featureContext.fillRect(feature.x, feature.y, feature.width, feature.height);
      }

      if (feature.clear === true) {
        featureContext.clearRect(feature.x, feature.y, feature.width, feature.height);
      }

      if (feature.borderColor) {
        featureContext.strokeStyle = feature.borderColor;
        featureContext.strokeRect(feature.x, Math.floor(feature.y) + 0.5, feature.width, feature.height);
      }
    }

    if (this.labels && feature.label) {
      this.drawLabel(feature, labelContext, scale);
    }

    if (feature.decorations) {
      this.decorateFeature(feature, featureContext, scale);
    }
  },

  drawSubFeatures: function (feature, featureContext, labelContext, scale) {
    var subFeatures = $.extend(true, [], feature.subFeatures);
    var joinColor   = feature.joinColor || feature.color;

    for (var i = 0; i < subFeatures.length; i++) {
      if (!subFeatures[i].fake) {
        this.drawFeature($.extend(true, {}, feature, { subFeatures: false, label: false }, subFeatures[i].position[scale], subFeatures[i]), featureContext, labelContext, scale);
      }

      if (subFeatures[i].position[scale].join && subFeatures[i].position[scale].join.width > 0) {
        this.drawSubFeatureJoin($.extend({ color: joinColor }, subFeatures[i].position[scale].join), featureContext);
      }
    }
  },

  drawLabel: function (feature, context, scale) {
    var original = feature.untruncated;
    var width    = (original || feature).width;

    if (this.labels === 'overlay' && feature.labelWidth >= Math.floor(width)) {
      return;
    }

    if (feature.labelPosition) {
      context.labelPositions = context.labelPositions || new RTree();
    }

    if (typeof feature.label === 'string') {
      feature.label = [ feature.label ];
    }

    var x       = (original || feature).x;
    var n       = this.repeatLabels ? Math.ceil((width - Math.max(scale, 1) - (this.labels === 'overlay' ? feature.labelWidth : 0)) / this.width) || 1 : 1;
    var spacing = width / n;
    var label, start, j, y, currentY, h;

    if (this.repeatLabels && (scale > 1 || this.labels !== 'overlay')) { // Ensure there's always a label in each image
      spacing = this.browser.length * scale;
      n = Math.ceil(width / spacing);
    }

    if (!feature.labelColor) {
      this.setLabelColor(feature);
    }

    context.fillStyle = feature.labelColor;

    if (this.labels === 'overlay') {
      label = [ feature.label.join(' ') ];
      y     = feature.y + (feature.height + 1) / 2;
      h     = 0;
    } else {
      label = feature.label;
      y     = feature.labelPosition ? feature.labelPosition.y : feature.y + feature.height + this.featureMargin.bottom;
      h     = this.fontHeight + 2;
    }

    var i      = context.textAlign === 'center' ? 0.5 : 0;
    var offset = feature.labelWidth * i;

    if (n > 1) {
      i += Math.max(Math.floor(-(feature.labelWidth + x) / spacing), 0);
    }

    for (; i < n; i++) {
      start = x + (i * spacing);

      if (start + feature.labelWidth >= 0) {
        if ((start - offset > this.width) || (i >= 1 && start + feature.labelWidth > feature.position[scale].X + feature.position[scale].width)) {
          break;
        }

        for (j = 0; j < label.length; j++) {
          currentY = y + (j * h);

          if (context.labelPositions && context.labelPositions.search({ x: start, y: currentY, w: feature.labelWidth, h: h }).length) {
            feature.position[scale].label.visible = false;
            continue;
          }

          context.fillText(label[j], start, currentY);

          if (context.labelPositions) {
            context.labelPositions.insert({ x: start, y: currentY, w: feature.labelWidth, h: h }, label[j]);
          }
        }
      }
    }
  },

  setFeatureColor: function (feature) {
    feature.color = this.color;
  },

  setLabelColor: function (feature) {
    feature.labelColor = this.fontColor || feature.color || this.color;
  },

  // Method to lighten a color by an amount, adapted from http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
  shadeColor: function (color, percent) {
    var f = parseInt(color.slice(1), 16);
    var R = f >> 16;
    var G = f >> 8 & 0x00FF;
    var B = f & 0x0000FF;

    return '#' + (
      0x1000000 +
      (Math.round((255 - R) * percent) + R) * 0x10000 +
      (Math.round((255 - G) * percent) + G) * 0x100 +
      (Math.round((255 - B) * percent) + B)
    ).toString(16).slice(1);
  },

  // truncate features - make the features start at 1px outside the canvas to ensure no lines are drawn at the borders incorrectly
  truncateForDrawing: function (feature) {
    var start = Math.min(Math.max(feature.x, -1), this.width + 1);
    var width = feature.x - start + feature.width;

    if (width + start > this.width) {
      width = this.width - start + 1;
    }

    feature.untruncated = { x: feature.x, width: feature.width };
    feature.x           = start;
    feature.width       = Math.max(width, 0);
  },

  drawSubFeatureJoin: function (join, context) {
    var coords = this.truncateSubFeatureJoinForDrawing(join);

    if (!coords) {
      return;
    }

    var lineWidth = context.lineWidth;

    context.strokeStyle = join.color;
    context.lineWidth   = this.subFeatureJoinLineWidth;

    context.beginPath();
    context.moveTo(coords.x1, coords.y1);

    switch (this.subFeatureJoinStyle) {
      case 'line':
        context.lineTo(coords.x3, coords.y1);
        break;
      case 'peak':
        context.lineTo(coords.x2, coords.y2);
        context.lineTo(coords.x3, coords.y3);
        break;
      case 'curve':
        context.quadraticCurveTo(coords.x2, coords.y2, coords.x3, coords.y3);
        break;
      default: break;
    }

    context.stroke();

    context.lineWidth = lineWidth;
  },

  truncateSubFeatureJoinForDrawing: function (coords) {
    var y1 = coords.y; // y coord of the ends of the line (half way down the exon box)
    var y3 = y1;

    if (this.subFeatureJoinStyle === 'line') {
      this.truncateForDrawing(coords);
      y1 += 0.5; // Sharpen line
    }

    var x1 = coords.x;                // x coord of the right edge of the first exon
    var x3 = coords.x + coords.width; // x coord of the left edge of the second exon

    // Skip if completely outside the image's region
    if (x3 < 0 || x1 > this.width) {
      return false;
    }

    var x2, y2, xMid, yScale;

    // Truncate the coordinates of the line being drawn, so it is inside the image's region
    if (this.subFeatureJoinStyle === 'peak') {
      xMid   = (x1 + x3) / 2;
      x2     = xMid;                     // x coord of the peak of the peak/curve
      y2     = coords.y + coords.height; // y coord of the peak of the peak/curve (level with the top (forward strand) or bottom (reverse strand) of the exon box)
      yScale = (y2 - y1) / (xMid - x1);  // Scale factor for recalculating coords if points lie outside the image region

      if (xMid < 0) {
        y2 = coords.y + (yScale * x3);
        x2 = 0;
      } else if (xMid > this.width) {
        y2 = coords.y + (yScale * (this.width - coords.x));
        x2 = this.width;
      }

      if (x1 < 0) {
        y1 = xMid < 0 ? y2 : coords.y - (yScale * coords.x);
        x1 = 0;
      }

      if (x3 > this.width) {
        y3 = xMid > this.width ? y2 : y2 - (yScale * (this.width - x2));
        x3 = this.width;
      }
    } else if (this.subFeatureJoinStyle === 'curve') {
      // TODO: try truncating when style is curve
      x2 = coords.x + coords.width / 2;
      y2 = coords.y + coords.height;
    }

    return {
      x1: x1, y1: y1,
      x2: x2, y2: y2,
      x3: x3, y3: y3
    };
  },

  formatLabel: function (label) {
    var power = Math.floor((label.toString().length - 1) / 3);
    var unit  = this.labelUnits[power];

    label /= Math.pow(10, power * 3);

    return Math.floor(label) + (unit === 'bp' ? '' : '.' + (label.toString().split('.')[1] || '').concat('00').substring(0, 2)) + ' ' + unit;
  },

  drawBackground  : $.noop,
  decorateFeature : $.noop // decoration for the features
});


Genoverse.Track.Controller.Static = Genoverse.Track.Controller.extend({
  addDomElements: function () {
    this.base();

    this.image = $('<img>').appendTo(this.imgContainer);

    this.container.toggleClass('gv-track-container gv-track-container-static').prepend(this.imgContainer);
    this.scrollContainer.add(this.messageContainer).remove();
  },

  reset: function () {
    delete this.stringified;
    this.base.apply(this, arguments);
  },

  setWidth: function (width) {
    this.base(width);
    this.image.width = this.width;
  },

  makeFirstImage: function () {
    this.base.apply(this, arguments);
    this.container.css('left', 0);
    this.imgContainer.show();
  },

  makeImage: function (params) {
    if (this.prop('disabled')) {
      return $.Deferred().resolve();
    }

    var features = this.view.positionFeatures(this.model.findFeatures(params.chr, params.start, params.end), params);

    if (features) {
      var string = JSON.stringify(features);

      if (this.stringified !== string) {
        var height = this.prop('height');

        params.width         = this.width;
        params.featureHeight = height;

        this.render(features, this.image.data(params));
        this.imgContainer.children(':last').show();
        this.resize(height, undefined, false);

        this.stringified = string;
      }
    }

    return $.Deferred().resolve();
  }
});

Genoverse.Track.Model.Static = Genoverse.Track.Model.extend({
  url            : false,
  checkDataRange : function () { return true; }
});

Genoverse.Track.View.Static = Genoverse.Track.View.extend({
  featureMargin : { top: 0, right: 1, bottom: 0, left: 1 },

  positionFeature : $.noop,
  scaleFeatures   : function (features) { return features; },

  draw: function (features, featureContext, labelContext, scale) {
    for (var i = 0; i < features.length; i++) {
      this.drawFeature(features[i], featureContext, labelContext, scale);
    }
  }
});

Genoverse.Track.Static = Genoverse.Track.extend({
  controls   : 'off',
  resizable  : false,
  controller : Genoverse.Track.Controller.Static,
  model      : Genoverse.Track.Model.Static,
  view       : Genoverse.Track.View.Static
});


Genoverse.Track.Controller.Stranded = Genoverse.Track.Controller.extend({
  constructor: function (properties) {
    this.base(properties);

    if (typeof this._makeImage === 'function') {
      return;
    }

    var strand        = this.prop('strand');
    var featureStrand = this.prop('featureStrand');

    if (strand === -1) {
      this._makeImage = this.track.makeReverseImage ? $.proxy(this.track.makeReverseImage, this) : this.makeImage;
      this.makeImage  = $.noop;
    } else {
      strand = this.prop('strand', 1);

      this._makeImage = this.makeImage;
      this.makeImage  = this.makeForwardImage;

      var track = this.track;

      setTimeout(function () {
        track.reverseTrack = track.browser.addTrack(track.constructor.extend({
          id           : track.id ? track.id + 'Reverse' : undefined,
          strand       : -1,
          url          : false,
          order        : typeof track.orderReverse === 'number' ? track.orderReverse : track.order,
          forwardTrack : track
        }));

        $.each(track.controller._deferredReverseTrackImages, function (i, args) { track.controller._makeReverseTrackImage.apply(track.controller, args); });
        delete track.controller._deferredReverseTrackImages;
      }, 1);
    }

    if (!featureStrand) {
      this.prop('featureStrand', strand);
    }
  },

  makeForwardImage: function (params) {
    this._makeReverseTrackImage(params, this._makeImage(params));
  },

  _makeReverseTrackImage: function (params, deferred) {
    var reverseTrack = this.prop('reverseTrack');

    if (!reverseTrack) {
      this._deferredReverseTrackImages = (this._deferredReverseTrackImages || []).concat([[ params, deferred ]]);
      return;
    }

    if (deferred && typeof deferred.done === 'function') {
      deferred.done(function () {
        reverseTrack.controller._makeImage(params, deferred);
      });
    } else {
      reverseTrack.controller._makeImage(params, deferred);
    }
  },

  destroy: function () {
    if (this.removing) {
      return;
    }

    this.removing = true;

    this.browser.removeTrack(this.prop('forwardTrack') || this.prop('reverseTrack'));
    this.base();
  }
});

Genoverse.Track.Model.Stranded = Genoverse.Track.Model.extend({
  init: function (reset) {
    this.base(reset);

    if (!reset) {
      var otherTrack = this.prop('forwardTrack');

      if (otherTrack) {
        this.featuresByChr = otherTrack.prop('featuresByChr');
        this.features      = otherTrack.prop('features');
        this.featuresById  = otherTrack.prop('featuresById');
      }
    }
  },

  parseURL: function () {
    if (!this.urlParams.strand) {
      this.urlParams.strand = this.prop('featureStrand');
    }

    return this.base.apply(this, arguments);
  },

  findFeatures: function () {
    var strand = this.track.featureStrand;
    return $.grep(this.base.apply(this, arguments), function (feature) { return feature.strand === strand; });
  }
});


// These are abstract classes, implemented by Graph.Bar and Graph.Line. They will not work properly on their own.

Genoverse.Track.Controller.Graph = Genoverse.Track.Controller.extend({
  setYRange: function (min, max) {
    if (this.browser.dragging) {
      return;
    }

    if (this.prop('showZeroY')) {
      this.prop('range', [ Math.min(min, 0), Math.max(max, 0) ]);
    } else {
      this.prop('range', [ min, max ]);
    }

    this.track.reset();
  },

  yCoordsFromFeatures: function (features) {
    return features.reduce(function (arr, f) { return arr.concat(f.height); }, []);
  },

  afterSetName: function () {
    this.minLabelHeight = Math.max(this.minLabelHeight, this.prop('fontHeight') * 2 + this.prop('margin') + this.prop('marginTop')); // Minimum height that can contain axis labels for range[0] and range[1]
  },

  visibleFeatureHeight: function () {
    if (this.prop('rescaleable') === 'auto') {
      var yScale = this.track.getYScale();
      var y      = this.yCoordsFromFeatures(this.model.findFeatures(this.browser.chr, this.browser.start, this.browser.end)).sort(function (a, b) { return a - b });

      return Math.ceil(Math.max(yScale * (y[y.length - 1] - y[0]), this.prop('hideEmpty') ? 0 : this.minLabelHeight));
    }

    return this.prop('height');
  },

  resize: function () {
    var prevHeight = this.prop('height');
    var rtn        = this.base.apply(this, arguments);
    var height     = this.prop('height');

    if (prevHeight !== height) {
      if (this.prop('rescaleable') === true) {
        var prevRange     = this.prop('range');
        var maxDP         = Math.max.apply(null, prevRange.map(function (r) { return (r.toString().split('.')[1] || '').length; }));
        var prevRangeSize = prevRange[1] - prevRange[0];
        var rangeChange   = Math.ceil((prevRangeSize * (height / prevHeight) - prevRangeSize) / 2);

        this.setYRange(
          parseFloat((prevRange[0] - rangeChange).toFixed(maxDP), 10),
          parseFloat((prevRange[1] + rangeChange).toFixed(maxDP), 10)
        );
      } else {
        this.track.reset();
      }
    }

    (this.prop('expander') || $()).hide();
    (this.prop('resizer')  || $()).removeClass('gv-resizer-expander');

    return rtn;
  },

  autoResize: function () {
    if (this.prop('rescaleable') === 'auto') {
      var visibleFeatures = this.model.findFeatures(this.browser.chr, this.browser.start, this.browser.end);

      if (visibleFeatures.length) {
        var range = this.prop('range');
        var y     = this.yCoordsFromFeatures(visibleFeatures).sort(function (a, b) { return a - b });

        if (y.length) {
          var maxDP = Math.max.apply(null, range.map(function (r) { return (r.toString().split('.')[1] || '').length; }));
          var round = Math.pow(10, maxDP);
          var minY  = parseFloat((Math.floor(y[0]            * round) / round).toFixed(maxDP), 10);
          var maxY  = parseFloat((Math.ceil (y[y.length - 1] * round) / round).toFixed(maxDP), 10);

          if (this.prop('showZeroY')) {
            minY = Math.min(minY, 0);
            maxY = Math.max(maxY, 0);
          }

          if (minY !== range[0] || maxY !== range[1]) {
            return this.setYRange(minY, maxY);
          }
        }
      }
    } else {
      return this.base.apply(this, arguments);
    }
  },

  makeFirstImage: function () {
    var controller = this;

    return this.base.apply(this, arguments).done(function () {
      controller.prop('yAxisPlaceholder').hide();
      controller.prop('offsetContainer')
        .prepend(controller.prop('guidelinesCanvas'))
        .before(controller.prop('yAxisCanvas').removeClass('gv-loading'));
    });
  }
});

Genoverse.Track.Model.Graph = Genoverse.Track.Model.extend({
  dataBuffer     : { start: 1, end: 1 },
  setLabelBuffer : $.noop
});

Genoverse.Track.View.Graph = Genoverse.Track.View.extend({
  featureMargin: {},

  featureDataSets: function (features) {
    var datasets = this.prop('datasets').concat({ name: '_default' });
    var setNames = {};
    var sets     = {};

    for (var i = 0; i < datasets.length; i++) {
      setNames[datasets[i].name] = true;
    }

    for (i = 0; i < features.length; i++) {
      set = setNames[features[i].dataset] ? features[i].dataset : '_default';

      sets[set] = sets[set] || [];
      sets[set].push(features[i]);
    }

    return { list: datasets, features: sets };
  }
});

Genoverse.Track.Graph = Genoverse.Track.extend({
  margin       : 10,        // Same as fontHeight - needed to allow axis labels for range[0] and range[1] to be drawn without being cut off by the edge of the image
  invert       : true,
  yAxisLabels  : undefined, // An array of numerical labels for the y-axis. Should not be configured manually if the track is resizable.
  yRange       : undefined, // An array of [ minY, maxY ] for the graph
  showZeroY    : true,      // If true, 0 will always be included in auto-generated yRanges. If yRange is defined in configuration, this setting will be ignored.
  globalAlpha  : 1,
  axesSettings : { axisColor: 'black', axisLabelColor: 'black', scaleLineColor: '#E5E5E5' },
  datasets     : [],
  legend       : true,
  labels       : false,

  /*
   * resizable and rescaleableY combine to define what happens when the track "resizes", as follows:
   * resizable | rescaleableY | Effect
   * --------- | ------------ | ------
   * true      | true         | Users can change the track height, and doing so changes the y-axis range (y-axis range will change proportionally to track height change)
   * true      | 'auto'       | Users can change the track height, and doing so does not change the y-axis range. However, the y-axis range will automatically change so that no peaks are cut off.
   * true      | false        | Users can change the track height, and doing so does not change the y-axis range (peak heights will change proportionally to track height change)
   * false     | true         | Like true/true
   * false     | 'auto'       | Track height cannot be changed, but the y-axis range will automatically change so that no peaks are cut off
   * false     | false        | Neither track height nor y-axis range can be changed, either by users or automatically
   * 'auto'    | true         | Like false/'auto'
   * 'auto'    | 'auto'       | Like false/'auto'
   * 'auto'    | false        | Like false/'auto' (it is not possible to change a track's height such that no peaks are cut off without being able to change the y-axis range)
   */
  resizable    : true,
  rescaleableY : 'auto',

  setDefaults: function () {
    this.range       = this.yRange || [ 0, this.height ];
    this.rescaleable = this.rescaleableY;

    if ($.isPlainObject(this.margin)) {
      if (this.invert) {
        this.marginTop = this.margin.bottom;
        this.margin    = this.margin.top;
      } else {
        this.marginTop = this.margin.top;
        this.margin    = this.margin.bottom;
      }
    }

    this.marginTop = typeof this.marginTop === 'number' ? this.marginTop : this.margin;

    if (this.resizable === false) {
      this.resizable = this.rescaleable;
    } else if (this.resizable === 'auto') {
      this.rescaleable = 'auto';
    }

    this.base.apply(this, arguments);

    if (this.legend && !this.datasets.length) {
      this.legend = false;
    }

    this.height        += this.marginTop;
    this.initialHeight += this.marginTop;
  },

  setHeight: function (height) {
    return this.base(height, true); // always force show
  },

  setMVC: function () {
    var hadController = this.controller instanceof Genoverse.Track.Controller;
    var rtn           = this.base.apply(this, arguments);

    if (!hadController) {
      var scrollContainer = this.prop('scrollContainer');

      this.yAxisPlaceholder = $('<div class="gv-image-container gv-loading">');
      this.yAxisCanvas      = $('<canvas class="gv-image-container gv-barchart-axis">' ).attr('width', this.width);
      this.guidelinesCanvas = $('<canvas class="gv-image-container gv-barchart-guide">').attr('width', this.width);

      if (this.disabled) {
        this.yAxisCanvas.add(this.guidelinesCanvas).attr('height', 0);
      }

      this.offsetContainer = $('<div class="gv-scroll-container-offset">')
        .width(this.width)
        .insertAfter(scrollContainer)
        .append(scrollContainer)
        .before(this.yAxisPlaceholder)

      this.drawAxes();
    }

    return rtn;
  },

  afterSetMVC: function () {
    // Never show the control to switch between auto-height and manual resizing, since its behaviour is not the same here as for standard tracks, due to interactions between resizable and rescaleableY.
    (this.prop('heightToggler') || $()).addClass('gv-hidden');
    (this.prop('resizer')       || $()).off('click');
  },

  reset: function () {
    this.drawAxes();
    return this.base.apply(this, arguments);
  },

  enable: function () {
    var wasDisabled = this.disabled;
    var rtn         = this.base.apply(this, arguments);

    if (wasDisabled) {
      this.drawAxes();
    }

    return rtn;
  },

  getYScale: function () {
    var range  = this.prop('range');
    var yScale = (this.prop('height') - this.prop('margin') - this.prop('marginTop')) / (range[1] - range[0]);

    return yScale;
  },

  drawAxes: function () {
    if (this.prop('disabled')) {
      return;
    }

    var width        = this.width;
    var height       = this.prop('height');
    var invert       = this.prop('invert');
    var margin       = this.prop('margin');
    var marginTop    = this.prop('marginTop');
    var fontHeight   = this.prop('fontHeight');
    var range        = this.prop('range');
    var axesSettings = this.prop('axesSettings');
    var yAxisLabels  = this.prop('yAxisLabels');
    var yScale       = this.getYScale();
    var axisContext  = this.prop('yAxisCanvas'     ).attr('height', height)[0].getContext('2d');
    var linesContext = this.prop('guidelinesCanvas').attr('height', height)[0].getContext('2d');
    var y, n, i, interval, maxDP;

    if (!yAxisLabels) {
      n           = Math.floor((height - margin - marginTop) / (fontHeight * 2)); // number of labels that can be shown
      interval    = (range[1] - range[0]) / n;                                    // label incrementor
      yAxisLabels = [];

      if (interval !== Math.round(interval)) { // floats
        // Strenuously ensure that interval does not contain a floating point error.
        // Assumes that values in range do not contain floating point errors.
        maxDP = Math.max.apply(null, range.map(function (r) { return (r.toString().split('.')[1] || '').length; })) + 1;
      }

      for (i = 0; i <= n; i++) {
        yAxisLabels.push((range[0] + interval * i)[maxDP ? 'toFixed' : 'toString'](maxDP));
      }
    }

    var axisWidth = Math.max.apply(null, yAxisLabels.map(function (label) { return axisContext.measureText(label).width; })) + 10;

    this.prop('offsetContainer').css('marginLeft',  axisWidth).width(width - axisWidth);
    this.prop('scrollContainer').css('marginLeft', -axisWidth);

    this.prop('yAxisPlaceholder').width(axisWidth).show();

    axisContext.fillStyle = axesSettings.axisColor;
    axisContext.fillRect(axisWidth - 1, invert ? margin : marginTop, 1, height - margin - marginTop); // Vertical line

    linesContext.fillStyle  = axesSettings.scaleLineColor;
    axisContext.fillStyle    = axesSettings.axisLabelColor;
    axisContext.textBaseline = 'middle';
    axisContext.textAlign    = 'right';

    for (i = 0; i < yAxisLabels.length; i++) {
      y = marginTop + (parseFloat(yAxisLabels[i], 10) - range[0]) * yScale;
      y = invert ? height - y : y;

      linesContext.fillRect(0, y, width, 1);                 // Horizontal line, indicating the y-position of a numerical value
      axisContext.fillRect(axisWidth - 4, y, 4, 1);           // Horizontal line, indicating the y-position of a numerical value
      axisContext.fillText(yAxisLabels[i], axisWidth - 6, y); // The numerical value for the horizontal line
    }

    // Draw a horizontal line at y = 0
    y = (-range[0] * yScale) + marginTop;
    linesContext.fillStyle = axesSettings.axisColor;
    linesContext.fillRect(0, invert ? height - y : y, width, 1);
  }
});

Genoverse.Track.Controller.Graph.Bar = Genoverse.Track.Controller.Graph.extend({
  getClickedFeatures: function (x, y) {
    var yZero     = this.prop('marginTop') - (this.prop('range')[0] * this.track.getYScale());
    var scale     = this.scale;
    var tolerance = scale > 1 ? 0 : 1;

    // Bars with negative values are stored in featurePositions with h < 0.
    // While this works to a certain degree (fillRect allows negative height, drawing upwards from y), it makes them hard to search for in the RTree - to find such a feature you need to search with y = -h and h = y - h + 1
    // It is therefore easier to search featuresByChr (i.e. the genomic positions) for a feature overlapping the x of the click, and then filter those results for y position manually.
    var features = this.prop('featuresByChr')[this.browser.chr].search({
      x: (x - (tolerance / 2)) / scale,
      y: 0,
      w: (1 + tolerance) / scale,
      h: 1
    });

    if (features.length) {
      if (
        (y <  yZero && features.filter(function (f) { return f.position[scale].bounds.y + f.position[scale].bounds.h <= y && f.position[scale].bounds.y >= y; }).length === 0) ||
        (y >= yZero && this.featurePositions.search({ x: x, y: y, w: 1, h: 1 }).length === 0)
      ) {
        features = [];
      }
    }

    return features.length ? [ features ] : [];
  },

  populateMenu: function (features) {
    if (!features.length) {
      return [];
    }

    var start = features[0].start;
    var end   = features[features.length - 1].end;
    var avg   = features[0].start !== features[features.length - 1].start;
    var menu  = { title: features[0].chr + ':' + (start === end ? start : start + '-' + end) };
    var m, values;

    function getValues(_features) {
      var values = _features.map(function (f) { return f.height; }).sort(function (a, b) { return a - b });

      return {
        avg: values.reduce(function (n, v) { return n + v; }, 0) / values.length,
        min: values[0],
        max: values[values.length - 1]
      };
    }

    if (avg) {
      if (features.length === 1) {
        values = getValues(features);

        menu['Average value'] = values.avg;
        menu['Min value']     = values.min;
        menu['Max value']     = values.max;
      } else {
        menu = [ menu ];

        var datasets = this.prop('datasets');
        var featuresByDataset;

        if (datasets.length) {
          featuresByDataset = datasets.reduce(function (hash, d) { hash[d.name] = []; return hash; }, {});

          for (var i = 0; i < features.length; i++) {
            featuresByDataset[features[i].dataset].push(features[i]);
          }
        } else {
          datasets          = [{ name: '' }];
          featuresByDataset = { '': features };
        }

        for (i = 0; i < datasets.length; i++) {
          values = getValues(featuresByDataset[datasets[i].name]);

          menu.push($.extend({
            Average : values.avg,
            Min     : values.min,
            Max     : values.max
          }, datasets[i].name ? { title: datasets[i].name } : {}));
        }
      }
    } else {
      if (features.length === 1) {
        menu.Value = features[0].height;
      } else {
        for (var i = 0; i < features.length; i++) {
          menu[features[i].dataset] = features[i].height;
        }
      }
    }

    return menu;
  }
});

Genoverse.Track.Model.Graph.Bar = Genoverse.Track.Model.Graph.extend({
  insertFeature: function (feature) {
    var datasets = this.prop('datasets');

    if (datasets.length) {
      feature.legend = feature.dataset;
      feature.color  = (datasets.filter(function (s) { return s.name === feature.dataset; })[0] || { color: this.color }).color;
    }

    feature.id = feature.id || [ feature.chr, feature.start, feature.end, feature.dataset || '' ].join(':');

    return this.base.apply(this, arguments);
  }
});

Genoverse.Track.View.Graph.Bar = Genoverse.Track.View.Graph.extend({
  scaleFeatures: function (features, scale) {
    var yScale = this.track.getYScale();
    var zeroY  = this.prop('marginTop') - this.prop('range')[0] * yScale;

    features = this.base(features, scale);

    for (var i = 0; i < features.length; i++) {
      features[i].position[scale].height = features[i].height * yScale;
      features[i].position[scale].y      = zeroY;
    }

    return features;
  },

  draw: function (features, featureContext, labelContext, scale) {
    var datasets     = this.featureDataSets(features);
    var marginBottom = this.prop('margin');
    var binSize      = scale < 1 ? Math.ceil(1 / scale) : 0;
    var conf, set, setFeatures, j, binnedFeatures, bin, f;

    var defaults = {
      color       : this.color,
      globalAlpha : this.prop('globalAlpha')
    };

    for (var i = 0; i < datasets.list.length; i++) {
      conf        = $.extend({}, defaults, datasets.list[i]);
      set         = datasets.list[i].name;
      setFeatures = $.extend(true, [], datasets.features[set] || []);

      if (!setFeatures.length) {
        continue;
      }

      if (binSize) {
        binnedFeatures = [];

        for (j = 0; j < setFeatures.length; j += binSize) {
          bin = setFeatures.slice(j, j + binSize);
          f   = $.extend(true, {}, bin[0], {
            height : bin.reduce(function (a, b) { return a + b.height; }, 0) / bin.length,
            end    : bin[bin.length - 1].end
          });

          [ 'H', 'W', 'height', 'width' ].forEach(function (attr) { // what about Y?
            f.position[scale][attr] = bin.reduce(function (a, b) { return a + b.position[scale][attr]; }, 0) / bin.length
          });

          binnedFeatures.push(f);
        }

        setFeatures = binnedFeatures;
      }


      for (j = 0; j < setFeatures.length; j++) {
        setFeatures[j].color = conf.color;
      }

      featureContext.globalAlpha = conf.globalAlpha;

      this.base(setFeatures, featureContext, labelContext, scale);
    }

    // Don't allow features to be drawn in the margins
    featureContext.clearRect(0, 0,                                  this.width, this.prop('marginTop') - 1);
    featureContext.clearRect(0, this.prop('height') - marginBottom, this.width, marginBottom);
  }
});

Genoverse.Track.Graph.Bar = Genoverse.Track.Graph.extend({
  controller : Genoverse.Track.Controller.Graph.Bar,
  model      : Genoverse.Track.Model.Graph.Bar,
  view       : Genoverse.Track.View.Graph.Bar
});

Genoverse.Track.Controller.Graph.Line = Genoverse.Track.Controller.Graph.extend({
  yCoordsFromFeatures: function (features) {
    return features.reduce(function (arr, f) { return arr.concat(f.coords.map(function (c) { return c[1] })); }, []);
  },

  click: function () {
    if (this.prop('showPopups')) {
      this.prop('menus').hide(); // Hide first, because closeMenus causes fadeOut to happen, which doens't look great in this scenario
      this.browser.closeMenus(this);
      return this.base.apply(this, arguments);
    }
  },

  getClickedFeatures: function (x, y) {
    var bounds    = { x: x, y: 0, w: 1, h: 9e99 };
    var features  = this.featurePositions.search(bounds);
    var tolerance = this.scale > 1 ? 0 : 1 / this.scale;
    var xMid      = bounds.x / this.scale;
    var xRange    = tolerance ? [ Math.floor(xMid - tolerance), Math.ceil(xMid + tolerance) ] : [ Math.floor(xMid), Math.floor(xMid) ];

    return [
      this.model.sortFeatures(features.map(function (f) {
        return $.extend(true, {}, f, { clickedCoords: f.coords.filter(function (c) { return c[0] >= xRange[0] && c[0] <= xRange[1]; }) });
      }))
    ];
  },

  populateMenu: function (features) {
    if (!features.length || !features[0].clickedCoords.length) {
      return [];
    }

    var start = features[0].clickedCoords[0][0];
    var end   = features[0].clickedCoords[features[0].clickedCoords.length - 1][0];
    var avg   = start !== end;
    var menu  = { title: features[0].chr + ':' + (start === end ? start : start + '-' + end) };
    var m, values;

    function getValues(coords) {
      var values = coords.map(function (c) { return c[1]; }).sort(function (a, b) { return a - b });

      return {
        avg: values.reduce(function (n, v) { return n + v; }, 0) / values.length,
        min: values[0],
        max: values[values.length - 1]
      };
    }

    if (avg) {
      if (features.length === 1) {
        values = getValues(features[0].clickedCoords);

        menu['Average value'] = values.avg;
        menu['Min value']     = values.min;
        menu['Max value']     = values.max;
      } else {
        menu = [ menu ];

        for (var i = 0; i < features.length; i++) {
          values    = getValues(features[i].clickedCoords);
          m         = { title: features[i].dataset };
          m.Average = values.avg;
          m.Min     = values.min;
          m.Max     = values.max;

          menu.push(m);
        }
      }
    } else {
      if (features.length === 1) {
        menu.Value = features[0].clickedCoords[0][1];
      } else {
        for (var i = 0; i < features.length; i++) {
          menu[features[i].dataset] = features[i].clickedCoords[0][1];
        }
      }
    }

    return menu;
  }
});

Genoverse.Track.Model.Graph.Line = Genoverse.Track.Model.Graph.extend({
  parseData: function (data, chr, start, end) {
    var features = [];
    var feature, x;

    function getX(f) {
      return typeof f.x !== 'undefined' ? f.x : f.start + (f.start === f.end ? 0 : (f.end - f.start + 1) / 2);
    }

    data.sort(function (a, b) { return (a.start - b.start) || (a.x - b.x); })

    for (var i = 0; i < data.length; i++) {
      if (typeof data[i].y !== 'undefined' && !data[i].coords) {
        x = getX(data[i]);

        if (feature && feature.coords[feature.coords.length - 1][0] === x - 1) {
          feature.coords.push([ x, data[i].y ]);
          feature.end = x;
        } else {
          if (feature) {
            features.push(feature);
          }

          feature = $.extend({ coords: [[ x, data[i].y ]], start: x, end: x }, data[i]);
        }
      } else {
        if (feature) {
          features.push(feature);
          feature = undefined;
        }

        features.push(data[i]);
      }
    }

    if (feature) {
      features.push(feature);
    }

    return this.base(features, chr, start, end);
  },

  insertFeature: function (feature) {
    var datasets         = this.prop('datasets');
    var featureTree      = this.features(feature.chr);
    var bounds           = { x: feature.start, y: 0, w: feature.end - feature.start + 1, h: 1 };
    var existingFeatures = this.sortFeatures(featureTree.search(bounds));
    var x, removeExisting;

    if (feature.coords) {
      feature.coords = feature.coords.map(function (c, i) { return c.length > 1 ? c : [ feature.start + i, c ]; }).filter(function (c) { return c[0] >= feature.start && c[0] <= feature.end; });
    } else if (feature.y) {
      feature.coords = [[ feature.start + (feature.start === feature.end ? 0 : (feature.end - feature.start + 1) / 2), feature.y ]];
    } else {
      feature.coords = [];
    }

    if (datasets.length) {
      feature.legend = feature.dataset;
      feature.color  = (datasets.filter(function (s) { return s.name === feature.dataset; })[0] || { color: this.color }).color;

      existingFeatures = existingFeatures.filter(function (f) { return f.dataset === feature.dataset; });
    }

    for (var i = 0; i < existingFeatures.length; i++) {
      removeExisting = false;

      // new feature is entirely within existing feature
      if (feature.start >= existingFeatures[i].start && feature.end <= existingFeatures[i].end) {
        return;
      }

      // existing feature is entirely within new feature
      if (feature.start < existingFeatures[i].start && feature.end > existingFeatures[i].end) {
        removeExisting = true;
      } else {
        // new feature overlaps existing feature to the right
        if (feature.start > existingFeatures[i].start) {
          x              = feature.coords[0][0];
          removeExisting = true;
          feature.coords = existingFeatures[i].coords.filter(function (c) { return c[0] < x; }).concat(feature.coords);
          feature.start  = existingFeatures[i].start;
        }

        // new feature overlaps existing feature to the left
        if (feature.end < existingFeatures[i].end) {
          x              = feature.coords[feature.coords.length - 1][0];
          removeExisting = true;
          feature.coords = feature.coords.concat(existingFeatures[i].coords.filter(function (c) { return c[0] > x; }));
          feature.end    = existingFeatures[i].end;
        }
      }

      if (removeExisting) {
        featureTree.remove(bounds, existingFeatures[i]);
        delete this.featuresById[existingFeatures[i].id];
      }
    }

    feature.id = feature.id || [ feature.chr, feature.start, feature.end, feature.dataset || '' ].join(':');

    return this.base.apply(this, arguments);
  }
});

Genoverse.Track.View.Graph.Line = Genoverse.Track.View.Graph.extend({
  featureHeight: 1,

  positionFeatures: function (features, params) {
    var scale  = params.scale;
    var yScale = this.track.getYScale();
    var margin = this.prop('marginTop');
    var zeroY  = margin - this.prop('range')[0] * yScale;
    var add    = (scale > 1 ? scale / 2 : 0) - params.scaledStart;

    for (var i = 0; i < features.length; i++) {
      features[i].coordPositions = features[i].coords.map(function (c) { return [ c[0] * scale + add, c[1] * yScale + zeroY ]; });
    }

    params.featureHeight = this.prop('height');

    return this.base(features, params);
  },

  draw: function (features, featureContext, labelContext, scale) {
    if (!features.length) {
      return;
    }

    var datasets     = this.featureDataSets(features);
    var height       = this.prop('height');
    var marginTop    = this.prop('marginTop');
    var marginBottom = this.prop('margin');
    var baseline     = Math.min(Math.max(marginTop, marginTop - this.prop('range')[0] * this.track.getYScale()), height - marginTop);
    var binSize      = scale < 1 ? Math.floor(1 / scale) : 0;
    var set, conf, feature, coords, binnedFeatures, lastBinSize, j, k, c, x;

    var defaults = {
      color       : this.color,
      fill        : this.prop('fill'),
      lineWidth   : this.prop('lineWidth'),
      globalAlpha : this.prop('globalAlpha')
    };

    for (var i = 0; i < datasets.list.length; i++) {
      set  = datasets.list[i].name;
      conf = $.extend({}, defaults, datasets.list[i]);

      for (j = 0; j < (datasets.features[set] || []).length; j++) {
        feature = datasets.features[set][j];
        coords  = feature.coordPositions;

        if (coords.length) {
          if (binSize) {
            binnedFeatures = [];

            for (k = 0; k < coords.length; k += binSize) {
              c = coords.slice(k, k + binSize);
              x = Math.round(c.reduce(function (a, b) { return a + b[0]; }, 0) / c.length);

              if (binnedFeatures.length && x === binnedFeatures[binnedFeatures.length - 1][0]) {
                binnedFeatures[binnedFeatures.length - 1][1] = (binnedFeatures[binnedFeatures.length - 1][1] * lastBinSize + c.reduce(function (a, b) { return a + b[1]; }, 0)) / (lastBinSize + c.length);
              } else {
                binnedFeatures.push([ x, c.reduce(function (a, b) { return a + b[1]; }, 0) / c.length ]);
              }

              lastBinSize = c.length;
            }

            coords = binnedFeatures;
          }

          featureContext.fillStyle = featureContext.strokeStyle = conf.color;
          featureContext.lineWidth = conf.lineWidth;

          if (conf.fill) {
            featureContext.globalAlpha = conf.globalAlpha;
          }

          featureContext.beginPath();

          if (conf.fill) {
            featureContext.moveTo(coords[0][0], baseline);
            featureContext.lineTo.apply(featureContext, coords[0]);
          } else {
            featureContext.moveTo.apply(featureContext, coords[0]);
          }

          for (k = 1; k < coords.length; k++) {
            featureContext.lineTo.apply(featureContext, coords[k]);
          }

          featureContext.stroke();

          if (conf.fill) {
            featureContext.lineTo(coords[coords.length - 1][0], baseline);
            featureContext.closePath();
            featureContext.fill();
            featureContext.globalAlpha = 1;
          }
        }
      }
    }

    // Don't allow features to be drawn in the margins
    featureContext.clearRect(0, 0,                     this.width, marginTop - 1);
    featureContext.clearRect(0, height - marginBottom, this.width, marginBottom);
  }
});

Genoverse.Track.Graph.Line = Genoverse.Track.Graph.extend({
  showPopups : true,      // If true, clicking on the track will show popups. If false, popups will not appear.
  fill       : false,
  lineWidth  : 1,
  controller : Genoverse.Track.Controller.Graph.Line,
  model      : Genoverse.Track.Model.Graph.Line,
  view       : Genoverse.Track.View.Graph.Line
});

Genoverse.Track.Controller.Sequence = Genoverse.Track.Controller.extend({
  getClickedFeatures: function (x, y) {
    var feature = this.base(x, y)[0];

    return feature ? this.makeSeqFeatureMenu(feature, Math.floor(x / this.scale)) : false;
  },

  makeSeqFeatureMenu: function (feature, pos) {
    feature.featureMenus      = feature.featureMenus      || {};
    feature.featureMenus[pos] = feature.featureMenus[pos] || {
      title    : feature.sequence.charAt(pos - feature.start),
      Location : feature.chr + ':' + pos
    }

    return feature.featureMenus[pos].title ? feature.featureMenus[pos] : undefined;
  }
});


// Abstract Sequence model
// assumes that the data source responds with raw sequence text
// see Fasta model for more specific example
Genoverse.Track.Model.Sequence = Genoverse.Track.Model.extend({
  threshold : 100000,
  chunkSize : 1000,
  buffer    : 0,
  dataType  : 'text',

  setChrProps: function () {
    var chr = this.browser.chr;

    this.base();

    this.chunksByChr      = this.chunksByChr || {};
    this.chunksByChr[chr] = this.chunksByChr[chr] || {};
  },

  getData: function (chr, start, end) {
    start = start - start % this.chunkSize + 1;
    end   = end + this.chunkSize - end % this.chunkSize;
    return this.base(chr, start, end);
  },

  parseData: function (data, chr, start, end) {
    data = data.replace(/\n/g, '');

    if (this.prop('lowerCase')) {
      data = data.toLowerCase();
    }

    for (var i = 0; i < data.length; i += this.chunkSize) {
      if (this.chunksByChr[chr][start + i]) {
        continue;
      }

      var feature = {
        id       : chr + ':' + start + i,
        chr      : chr,
        start    : start + i,
        end      : start + i + this.chunkSize,
        sequence : data.substr(i, this.chunkSize),
        sort     : start + i
      };

      this.chunksByChr[chr][feature.start] = feature;
      this.insertFeature(feature);
    }
  }
});


Genoverse.Track.Model.Sequence.Fasta = Genoverse.Track.Model.Sequence.extend({
  url  : 'http://genoverse.org/data/Homo_sapiens.GRCh37.72.dna.chromosome.1.fa', // Example url

  // Following settings could be left undefined and will be detected automatically via .getStartByte()
  startByte  : undefined, // Byte in the file where the sequence actually starts
  lineLength : undefined, // Length of the sequence line in the file

  // TODO: Check if URL provided

  getData: function (chr, start, end) {
    var deferred = $.Deferred();

    $.when(this.getStartByte()).done(function () {
      start = start - start % this.chunkSize + 1;
      end   = end + this.chunkSize - end % this.chunkSize;

      var startByte = start - 1 + Math.floor((start - 1) / this.lineLength) + this.startByte;
      var endByte   = end   - 1 + Math.floor((end   - 1) / this.lineLength) + this.startByte;

      $.ajax({
        url       : this.parseURL(),
        dataType  : this.dataType,
        context   : this,
        headers   : { 'Range' : 'bytes=' + startByte + '-' + endByte },
        xhrFields : this.xhrFields,
        success   : function (data) { this.receiveData(data, chr, start, end); },
        error     : this.track.controller.showError
      }).done(function () { deferred.resolveWith(this); }).fail(function () { deferred.rejectWith(this); });
    }).fail(function () { deferred.rejectWith(this); });

    return deferred;
  },

  getStartByte: function () {
    if (this.startByteRequest) {
      return this.startByteRequest;
    }

    if (this.startByte === undefined || this.lineLength === undefined) {
      this.startByteRequest = $.ajax({
        url       : this.parseURL(),
        dataType  : 'text',
        context   : this,
        headers   : { 'Range': 'bytes=0-300' },
        xhrFields : this.xhrFields,
        success   : function (data) {
          if (data.indexOf('>') === 0) {
            this.startByte = data.indexOf('\n') + 1;
          } else {
            this.startByte = 0;
          }

          this.lineLength = data.indexOf('\n', this.startByte) - this.startByte;
        }
      });

      return this.startByteRequest;
    }
  }
});


Genoverse.Track.Model.Sequence.Ensembl = Genoverse.Track.Model.Sequence.extend({
  url              : '//rest.ensembl.org/sequence/region/human/__CHR__:__START__-__END__?content-type=text/plain', // Example url
  dataRequestLimit : 10000000 // As per e! REST API restrictions
});


Genoverse.Track.View.Sequence = Genoverse.Track.View.extend({
  featureMargin : { top: 0, right: 0, bottom: 0, left: 0 },
  colors        : { 'default': '#CCCCCC', A: '#73E973', T: '#DE4C61', G: '#FFFF77', C: '#688EC0' },
  labelColors   : { 'default': '#000000', T: '#FFFFFF', C: '#FFFFFF' },
  labels        : 'overlay',

  setDefaults: function () {
    this.base.apply(this, arguments);

    var lowerCase = this.prop('lowerCase');

    this.labelYOffset = typeof this.labelYOffset === 'number' ? this.labelYOffset : (this.featureHeight + 1) / 2;
    this.widestLabel  = typeof this.widestLabel  === 'string' ? this.widestLabel : lowerCase ? 'g' : 'G';
    this.labelWidth   = {};

    this.labelWidth[this.widestLabel] = Math.ceil(this.context.measureText(this.widestLabel).width) + 1;

    if (lowerCase) {
      for (var key in this.colors) {
        this.colors[key.toLowerCase()] = this.colors[key];
      }

      for (key in this.labelColors) {
        this.labelColors[key.toLowerCase()] = this.labelColors[key];
      }
    }
  },

  draw: function (features, featureContext, labelContext, scale) {
    featureContext.textBaseline = 'middle';
    featureContext.textAlign    = 'left';

    var width = Math.max(scale, this.minScaledWidth);

    for (var i = 0; i < features.length; i++) {
      this.drawSequence(features[i], featureContext, scale, width);
    }
  },

  drawSequence: function (feature, context, scale, width) {
    var drawLabels = this.labelWidth[this.widestLabel] < width - 1;
    var start, bp;

    for (var i = 0; i < feature.sequence.length; i++) {
      start = feature.position[scale].X + i * scale;

      if (start < -scale || start > context.canvas.width) {
        continue;
      }

      bp = feature.sequence.charAt(i);

      context.fillStyle = this.colors[bp] || this.colors['default'];
      context.fillRect(start, feature.position[scale].Y, width, this.featureHeight);

      if (!this.labelWidth[bp]) {
        this.labelWidth[bp] = Math.ceil(context.measureText(bp).width) + 1;
      }

      if (drawLabels) {
        context.fillStyle = this.labelColors[bp] || this.labelColors['default'];
        context.fillText(bp, start + (width - this.labelWidth[bp]) / 2, feature.position[scale].Y + this.labelYOffset);
      }
    }
  }
});


Genoverse.Track.View.SequenceVariation = Genoverse.Track.View.Sequence.extend({
  featureHeight : 15,
  featureMargin : { top: 0, right: 0, bottom: 4, left: 0 },
  bump          : true,
  showLegend    : false,

  positionFeature: function (feature, params) {
    var position = feature.position[params.scale];

    if (feature.alt_allele) {
      if (!position.positioned) {
        position.reference = { end: position.start + feature.ref_allele.length * params.scale };
      }

      position.reference.x = position.reference.end - params.scaledStart;
    }

    this.base(feature, params);
  },

  bumpFeature: function (bounds, feature) {
    if (feature.alt_allele) {
      this.base.apply(this, arguments);
    }
  },

  draw: function (features, featureContext, labelContext, scale) {
    var drawing = { seq: [], snv: [] };

    for (var i = 0; i < features.length; i++) {
      drawing[features[i].alt_allele ? 'snv' : 'seq'].push(features[i]);
    }

    this.base(drawing.seq, featureContext, labelContext, scale);
    this.highlightSNVs(drawing.snv, featureContext, scale);
    this.base(drawing.snv, featureContext, labelContext, scale);
    this.outlineSNVs(drawing.snv, featureContext, scale); // Redraw the outline for SNVs, since the feature will have been drawn on top of some of the outline created by highlightSNVs
  },

  highlightSNVs: function (features, context, scale) {
    var position, positionX, positionY;

    for (var i = 0; i < features.length; i++) {
      position  = features[i].position[scale];
      positionX = [ position.X, position.reference.x, position.X + position.width ];

      if (positionX[2] < 0 || positionX[0] > this.width) {
        continue;
      }

      if (positionX[0] < 0 || positionX[2] > this.width) {
        this.truncateForDrawing(positionX);
      }

      positionY = [ 0, position.Y - this.featureMargin.bottom / 2, position.Y, position.Y + this.featureHeight ];

      if (!features[i].highlightColor) {
        this.setHighlightColor(features[i]);
      }

      context.strokeStyle = context.fillStyle = features[i].highlightColor;
      context.lineWidth   = 2;

      context.beginPath();
      context.moveTo(positionX[0], positionY[0]);
      context.lineTo(positionX[1], positionY[0]);
      context.lineTo(positionX[1], positionY[1]);
      context.lineTo(positionX[2], positionY[2]);
      context.lineTo(positionX[2], positionY[3]);
      context.lineTo(positionX[0], positionY[3]);
      context.closePath();
      context.stroke();

      context.lineWidth   = 1;
      context.globalAlpha = 0.5;

      context.fill();

      context.globalAlpha = 1;
    }
  },

  outlineSNVs: function (features, context, scale) {
    var position, positionX, positionY;

    for (var i = 0; i < features.length; i++) {
      position  = features[i].position[scale];
      positionX = [ position.X, position.X + position.width ];
      positionY = [ position.Y, position.Y + this.featureHeight ];

      context.strokeStyle = features[i].highlightColor;

      context.lineWidth = 2;

      context.beginPath();
      context.moveTo(positionX[1], positionY[0]);
      context.lineTo(positionX[1], positionY[1]);
      context.lineTo(positionX[0], positionY[1]);
      context.lineTo(positionX[0], positionY[0]);
      context.stroke();

      context.lineWidth = 1;
    }
  },

  truncateForDrawing: function (positionX) {
    for (var i in positionX) {
      positionX[i] = Math.min(Math.max(positionX[i], -1), this.width + 1);
    }
  },

  setHighlightColor: function (feature) {
    feature.highlightColor = feature.alt_allele === '-' || feature.alt_allele.length < feature.ref_allele.length ? '#D31D00' : '#1DD300';
  }
});


Genoverse.Track.Model.SequenceVariation = Genoverse.Track.Model.extend({
  seqModel: Genoverse.Track.Model.Sequence.Ensembl,

  getSeqModel: function () {
    var models = this.prop('models');
    return models.seq = models.seq || this.track.newMVC(this.seqModel);
  },

  getData: function (chr, start, end) {
    var deferred = $.Deferred();
    var seqData  = this.getSeqModel().checkDataRange(chr, start, end);

    this.base(chr, start, end).done(function () {
      if (seqData) {
        deferred.resolve();
      } else {
        this.getSeqModel().getData(chr, start, end).done(deferred.resolve);
      }
    });

    return deferred;
  },

  insertFeature: function (feature) {
    return this.base($.extend(feature, {
      end      : feature.start + feature.alt_allele.length - 1,
      length   : feature.alt_allele.length,
      sequence : feature.alt_allele
    }));
  },

  checkDataRange: function (chr, start, end) {
    return this.base(chr, start, end) && this.getSeqModel().checkDataRange(chr, start, end);
  },

  findFeatures: function (chr, start, end) {
    return this.getSeqModel().findFeatures(chr, start, end).concat(this.base(chr, start, end));
  }
});


// Abstract Gene model
// see sub-models for more specific examples
Genoverse.Track.Model.Gene = Genoverse.Track.Model.extend({

});

// Ensembl REST API Gene model
Genoverse.Track.Model.Gene.Ensembl = Genoverse.Track.Model.Gene.extend({
  url              : '//rest.ensembl.org/overlap/region/human/__CHR__:__START__-__END__?feature=gene;content-type=application/json',
  dataRequestLimit : 5000000, // As per e! REST API restrictions

  // The url above responds in json format, data is an array
  // We assume that parents always preceed children in data array, gene -> transcript -> exon
  // See rest.ensembl.org/documentation/info/feature_region for more details
  parseData: function (data, chr) {
    for (var i = 0; i < data.length; i++) {
      var feature = data[i];

      if (feature.feature_type === 'gene' && !this.featuresById[feature.id]) {
        feature.chr         = feature.chr || chr;
        feature.label       = parseInt(feature.strand, 10) === 1 ? (feature.external_name || feature.id) + ' >' : '< ' + (feature.external_name || feature.id);
        feature.transcripts = [];

        this.insertFeature(feature);
      }
    }
  }
});


Genoverse.Track.View.Gene = Genoverse.Track.View.extend({
  featureHeight : 5,
  labels        : true,
  repeatLabels  : true,
  bump          : true
});


Genoverse.Track.View.Gene.Ensembl = Genoverse.Track.View.Gene.extend({
  setFeatureColor: function (feature) {
    var processed_transcript = {
      'sense_intronic'           : 1,
      'sense_overlapping'        : 1,
      'processed_transcript'     : 1,
      'nonsense_mediated_decay'  : 1,
      'non_stop_decay'           : 1,
      'antisense'                : 1,
      'retained_intron'          : 1,
      'tec'                      : 1,
      'non_coding'               : 1,
      'ambiguous_orf'            : 1,
      'disrupted_domain'         : 1,
      '3prime_overlapping_ncrna' : 1
    };

    feature.color = '#000000';

    if (feature.logic_name.indexOf('ensembl_havana') === 0) {
      feature.color  = '#CD9B1D';
      feature.legend = 'Merged Ensembl/Havana';
    } else if (processed_transcript[feature.biotype]) {
      feature.color  = '#0000FF';
      feature.legend = 'Processed transcript';
    } else if (feature.biotype === 'protein_coding') {
      feature.color  = '#A00000';
      feature.legend = 'Protein coding';
    } else if (feature.biotype.indexOf('pseudogene') > -1) {
      feature.color  = '#666666';
      feature.legend = 'Pseudogene';
    } else if (/rna/i.test(feature.biotype)) {
      feature.color  = '#8B668B';
      feature.legend = 'RNA gene';
    } else if (/^tr_.+_gene$/i.test(feature.biotype)) {
      feature.color  = '#CD6600';
      feature.legend = 'TR gene';
    } else if (/^ig_.+_gene$/i.test(feature.biotype)) {
      feature.color  = '#8B4500';
      feature.legend = 'IG gene';
    }

    feature.labelColor = feature.color;
  }
});

// Abstract Transcript model
// see sub-models for more specific examples
Genoverse.Track.Model.Transcript = Genoverse.Track.Model.extend({

});

// Ensembl REST API Transcript model
Genoverse.Track.Model.Transcript.Ensembl = Genoverse.Track.Model.Transcript.extend({
  url              : '//rest.ensembl.org/overlap/region/human/__CHR__:__START__-__END__?feature=transcript;feature=exon;feature=cds;content-type=application/json',
  dataRequestLimit : 5000000, // As per e! REST API restrictions

  setDefaults: function () {
    this.geneIds   = {};
    this.seenGenes = 0;

    this.base.apply(this, arguments);
  },

  // The url above responds in json format, data is an array
  // See rest.ensembl.org/documentation/info/overlap_region for more details
  parseData: function (data, chr) {
    var model        = this;
    var featuresById = this.featuresById;
    var ids          = [];

    data.filter(function (d) { return d.feature_type === 'transcript'; }).forEach(function (feature, i) {
      if (!featuresById[feature.id]) {
        model.geneIds[feature.Parent] = model.geneIds[feature.Parent] || ++model.seenGenes;

        feature.chr         = feature.chr || chr;
        feature.label       = parseInt(feature.strand, 10) === 1 ? (feature.external_name || feature.id) + ' >' : '< ' + (feature.external_name || feature.id);
        feature.sort        = (model.geneIds[feature.Parent] * 1e10) + (feature.logic_name.indexOf('ensembl_havana') === 0 ? 0 : 2e9) + (feature.biotype === 'protein_coding' ? 0 : 1e9) + feature.start + i;
        feature.cdsStart    = Infinity;
        feature.cdsEnd      = -Infinity;
        feature.exons       = {};
        feature.subFeatures = [];

        model.insertFeature(feature);
      }

      ids.push(feature.id);
    });

    data.filter(function (d) { return d.feature_type === 'cds' && featuresById[d.Parent]; }).forEach(function (cds) {
      featuresById[cds.Parent].cdsStart = Math.min(featuresById[cds.Parent].cdsStart, cds.start);
      featuresById[cds.Parent].cdsEnd   = Math.max(featuresById[cds.Parent].cdsEnd,   cds.end);
    });

    data.filter(function (d) { return d.feature_type === 'exon' && featuresById[d.Parent] && !featuresById[d.Parent].exons[d.id]; }).forEach(function (exon) {
      if (exon.end < featuresById[exon.Parent].cdsStart || exon.start > featuresById[exon.Parent].cdsEnd) {
        exon.utr = true;
      } else if (exon.start < featuresById[exon.Parent].cdsStart) {
        featuresById[exon.Parent].subFeatures.push($.extend({ utr: true }, exon, { end: featuresById[exon.Parent].cdsStart }));

        exon.start = featuresById[exon.Parent].cdsStart;
      } else if (exon.end > featuresById[exon.Parent].cdsEnd) {
        featuresById[exon.Parent].subFeatures.push($.extend({ utr: true }, exon, { start: featuresById[exon.Parent].cdsEnd }));

        exon.end = featuresById[exon.Parent].cdsEnd;
      }

      featuresById[exon.Parent].subFeatures.push(exon);
      featuresById[exon.Parent].exons[exon.id] = exon;
    });

    ids.forEach(function (id) {
      featuresById[id].subFeatures.sort(function (a, b) { return a.start - b.start; });
    });
  }
});


Genoverse.Track.View.Transcript = Genoverse.Track.View.extend({
  featureHeight       : 10,
  utrHeight           : 7,
  labels              : true,
  repeatLabels        : true,
  bump                : true,
  subFeatureJoinStyle : 'curve',

  scaleFeatures: function (features, scale) {
    var subFeatures, j;

    for (var i = 0; i < features.length; i++) {
      subFeatures = features[i].subFeatures || [];

      if (subFeatures.length) {
        for (j = 0; j < subFeatures.length; j++) {
          if (subFeatures[j].utr) {
            subFeatures[j].height = this.utrHeight;
          }
        }

        features[i].height = Math.max.apply(Math, subFeatures.map(function (c) { return c.fake ? 0 : c.height || 0; }).concat(this.featureHeight));
      }
    }

    return this.base(features, scale);
  }
});

Genoverse.Track.View.Transcript.Ensembl = Genoverse.Track.View.Transcript.extend({
  setFeatureColor: function (feature) {
    Genoverse.Track.View.Gene.Ensembl.prototype.setFeatureColor(feature);

    for (var i = 0; i < (feature.subFeatures || []).length; i++) {
      if (feature.subFeatures[i].utr) {
        feature.subFeatures[i].color       = false;
        feature.subFeatures[i].borderColor = feature.color;
      }
    }
  }
});

Genoverse.Track.Model.File = Genoverse.Track.Model.extend({
  dataType: 'text',

  init: function () {
    if (this.isLocal) {
      this.url = false;
    }

    if (!(this.largeFile || this.indexFile)) {
      this.allData = true;
    }

    this.base.apply(this, arguments);
  },

  getData: function (chr) {
    var model = this;

    if (this.isLocal && this.dataFile) {
      var reader   = new FileReader();
      var deferred = $.Deferred();

      reader.onload = function (e) {
        deferred.done(function () {
          this.receiveData(e.target.result, chr, 1, this.browser.getChromosomeSize(chr));
        }).resolveWith(model);
      };

      reader.readAsText(this.dataFile);

      return deferred;
    } else {
      return this.base.apply(this, arguments);
    }
  }
});


Genoverse.Track.Model.File.BAM = Genoverse.Track.Model.File.extend({
  getData: function (chr, start, end) {
    var model    = this;
    var deferred = $.Deferred();

    if (!this.bamFile) {
      if (this.url) {
        this.bamFile = new dallianceLib.URLFetchable(this.url);
        this.baiFile = new dallianceLib.URLFetchable(this.url + this.prop('indexExt'));
      } else if (this.dataFile && this.indexFile) {
        this.bamFile = new dallianceLib.BlobFetchable(this.dataFile);
        this.baiFile = new dallianceLib.BlobFetchable(this.indexFile);
      } else {
        return deferred.rejectWith(model, [ 'BAM files must be accompanied by a .bai index file' ]);
      }
    }

    dallianceLib.makeBam(this.bamFile, this.baiFile, null, function (bam, makeBamError) {
      if (makeBamError) {
        console.log(makeBamError);
      } else {
        bam.fetch(chr, start, end, function (features, fetchBamError) {
          if (fetchBamError) {
            console.log(fetchBamError);
          } else {
            model.receiveData(features, chr, start, end);
            deferred.resolveWith(model);
          }
        });
      }
    });

    return deferred;
  },

  insertFeature: function (feature) {
    feature.id       = feature.chr + ':' + feature.readName + ':' + feature.pos;
    feature.start    = feature.pos + 1;
    feature.end      = feature.start + feature.seq.length;
    feature.sequence = feature.seq;

    return this.base(feature);
  }
});


Genoverse.Track.Model.File.BED = Genoverse.Track.Model.File.extend({
  parseData: function (text, chr) {
    var lines = text.split('\n');

    for (var i = 0; i < lines.length; i++) {
      var fields = lines[i].split('\t');

      if (fields.length < 3) {
        continue;
      }

      if (fields[0] == chr || fields[0].toLowerCase() == 'chr' + chr || fields[0].match('[^1-9]' + chr + '$')) {
        var score = parseFloat(fields[4], 10);
        var color = '#000000';

        if (fields[8]) {
          color = 'rgb(' + fields[8] + ')';
        } else {
          color = this.scoreColor(isNaN(score) ? 1000 : score);
        }

        this.insertFeature({
          chr             : chr,
          start           : parseInt(fields[1], 10),
          end             : parseInt(fields[2], 10),
          id              : chr + ':' + fields[1] + '-' + fields[3],
          label           : fields[3],
          color           : color,
          originalFeature : fields
        });
      }
    }
  },

  // As per https://genome.ucsc.edu/FAQ/FAQformat.html#format1 specification
  scoreColor: function (score) {
    if (score <= 166) { return 'rgb(219,219,219)'; }
    if (score <= 277) { return 'rgb(186,186,186)'; }
    if (score <= 388) { return 'rgb(154,154,154)'; }
    if (score <= 499) { return 'rgb(122,122,122)'; }
    if (score <= 611) { return 'rgb(94,94,94)';    }
    if (score <= 722) { return 'rgb(67,67,67)';    }
    if (score <= 833) { return 'rgb(42,42,42)';    }
    if (score <= 944) { return 'rgb(21,21,21)';    }
    return '#000000';
  }
});


Genoverse.Track.Model.File.GFF = Genoverse.Track.Model.File.extend({
  parseData: function (text, chr) {
    var lines = text.split('\n');

    for (var i = 0; i < lines.length; i++) {
      if (!lines[i].length || lines[i].indexOf('#') === 0) {
        continue;
      }

      var fields = lines[i].split('\t');

      if (fields.length < 5) {
        continue;
      }

      var seqId = fields[0].toLowerCase();

      if (
        seqId == chr                      ||
        seqId == 'chr' + chr              ||
        seqId.match('[^1-9]' + chr + '$') ||
        seqId.match('^' + chr + '\\b')
      ) {
        this.insertFeature({
          id     : fields.slice(0, 5).join('|'),
          chr    : chr,
          start  : parseInt(fields[3], 10),
          end    : parseInt(fields[4], 10),
          source : fields[1],
          type   : fields[2],
          score  : fields[5],
          strand : fields[6] === '-' ? -1 : 1,
          label  : fields[1] + ' ' + fields[2] + ' ' + fields[3] + '-' + fields[4]
        });
      }
    }
  }
});

Genoverse.Track.Model.File.GTF = Genoverse.Track.Model.File.GFF;


Genoverse.Track.Model.File.VCF = Genoverse.Track.Model.File.extend({
  getData: function (chr, start, end) {
    var deferred = $.Deferred();
    var model    = this;

    if (!this.prop('gz')) {
      return this.base.apply(this, arguments);
    }

    if (!this.vcfFile) {
      if (this.url) {
        this.vcfFile = new dallianceLib.URLFetchable(this.url);
        this.tbiFile = new dallianceLib.URLFetchable(this.url + this.prop('indexExt'));
      } else if (this.dataFile && this.indexFile) {
        this.vcfFile = new dallianceLib.BlobFetchable(this.dataFile);
        this.tbiFile = new dallianceLib.BlobFetchable(this.indexFile);
      } else {
        return deferred.rejectWith(model, [ 'GZipped VCF files must be accompanied by a .tbi index file' ]);
      }
    }

    this.makeVCF(this.vcfFile, this.tbiFile).then(function (vcf) {
      model.cachedVCF = vcf;

      vcf.getRecords(chr, start, end, function (records) {
        model.receiveData(records, chr, start, end);
        deferred.resolveWith(model);
      });
    });

    return deferred;
  },

  makeVCF: function (vcfFile, tbiFile) {
    var deferred = $.Deferred();

    if (this.cachedVCF) {
      deferred.resolve(this.cachedVCF);
    } else {
      var vcf = new VCFReader(vcfFile, tbiFile);

      vcf.readTabix(function (tabix) {
        vcf.tabix = tabix;
        deferred.resolve(vcf);
      });
    }

    return deferred;
  },

  parseData: function (text, chr) {
    var lines   = text.split('\n');
    var maxQual = this.allData ? this.prop('maxQual') || 0 : false;

    for (var i = 0; i < lines.length; i++) {
      if (!lines[i].length || lines[i].indexOf('#') === 0) {
        continue;
      }

      var fields = lines[i].split('\t');

      if (fields.length < 5) {
        continue;
      }

      if (fields[0] == chr || fields[0] == 'chr' + chr) {
        var id      = fields.slice(0, 3).join('|');
        var start   = parseInt(fields[1], 10);
        var alleles = fields[4].split(',');

        alleles.unshift(fields[3]);

        for (var j = 0; j < alleles.length; j++) {
          var end = start + alleles[j].length - 1;

          this.insertFeature({
            id              : id + '|' + alleles[j],
            sort            : j,
            chr             : chr,
            start           : start,
            end             : end,
            width           : end - start,
            allele          : j === 0 ? 'REF' : 'ALT',
            sequence        : alleles[j],
            label           : alleles[j],
            labelColor      : '#FFFFFF',
            originalFeature : fields
          });
        }

        if (maxQual !== false) {
          maxQual = Math.max(maxQual, fields[5]);
        }
      }
    }

    if (maxQual) {
      this.prop('maxQual', maxQual);
    }
  }
});


Genoverse.Track.Chromosome = Genoverse.Track.extend({
  id            : 'chromosome',
  margin        : 1,
  featureMargin : { top: 0, right: 0, bottom: 0, left: 0 },
  labels        : 'overlay',
  url           : false,
  allData       : true,
  colors        : {
    acen    : '#708090',
    gneg    : '#FFFFFF',
    gpos    : '#000000',
    gpos100 : '#000000',
    gpos25  : '#D9D9D9',
    gpos33  : '#BFBFBF',
    gpos50  : '#999999',
    gpos66  : '#7F7F7F',
    gpos75  : '#666666',
    gvar    : '#E0E0E0',
    stalk   : '#708090'
  },
  labelColors: {
    gneg   : '#000000',
    gvar   : '#000000',
    gpos25 : '#000000',
    gpos33 : '#000000'
  },

  getData: function (chr, start, end) {
    this.receiveData($.extend(true, [], this.browser.genome[chr].bands), chr, start, end);
    return $.Deferred().resolveWith(this);
  },

  insertFeature: function (feature) {
    feature.label      = feature.type === 'acen' || feature.type === 'stalk' ? false : feature.id;
    feature.menuTitle  = feature.id ? feature.chr + feature.id : feature.chr + ':' + feature.start + '-' + feature.end;
    feature.color      = this.prop('colors')[feature.type]      || '#FFFFFF';
    feature.labelColor = this.prop('labelColors')[feature.type] || '#FFFFFF';

    if (feature.id) {
      feature.id = feature.chr + feature.id;
    }

    this.base(feature);
  },

  drawFeature: function (feature, featureContext, labelContext, scale) {
    featureContext.fillStyle   = feature.color;
    featureContext.strokeStyle = '#000000';

    if (feature.type === 'acen') {
      featureContext.beginPath();

      if (this.drawnAcen) {
        featureContext.moveTo(feature.x + feature.width, 0.5);
        featureContext.lineTo(feature.x, (feature.height + 0.5) / 2);
        featureContext.lineTo(feature.x + feature.width, feature.height + 0.5);
      } else {
        featureContext.moveTo(feature.x, 0.5);
        featureContext.lineTo(feature.x + feature.width, (feature.height + 0.5) / 2);
        featureContext.lineTo(feature.x, feature.height + 0.5);
        this.drawnAcen = true;
      }

      featureContext.fill();
      featureContext.stroke();
    } else if (feature.type === 'stalk') {
      for (var i = 0; i < 2; i++) {
        featureContext.beginPath();

        featureContext.moveTo(feature.x, 0.5);
        featureContext.lineTo(feature.x + feature.width * 0.25, feature.height * 0.25 + 0.5);
        featureContext.lineTo(feature.x + feature.width * 0.75, feature.height * 0.25 + 0.5);
        featureContext.lineTo(feature.x + feature.width, 0.5);

        featureContext[i ? 'moveTo' : 'lineTo'](feature.x + feature.width, feature.height + 0.5);
        featureContext.lineTo(feature.x + feature.width * 0.75, feature.height * 0.75 - 0.5);
        featureContext.lineTo(feature.x + feature.width * 0.25, feature.height * 0.75 - 0.5);
        featureContext.lineTo(feature.x, feature.height + 0.5);

        featureContext[i ? 'stroke' : 'fill']();
      }
    } else {
      this.base(feature, featureContext, labelContext, scale);

      featureContext.beginPath();

      var chrSize = this.browser.getChromosomeSize(feature.chr);

      if (feature.start === 1 || feature.end === chrSize) {
        if (feature.start === 1) {
          var end = feature.x + feature.width - (feature.end === chrSize ? 5 : 0);

          featureContext.clearRect(0, 0, 5, feature.height + 0.5);

          featureContext.fillStyle = feature.color;
          featureContext.moveTo(5,   0.5);
          featureContext.lineTo(end, 0.5);
          featureContext.moveTo(5,   feature.height + 0.5);
          featureContext.lineTo(end, feature.height + 0.5);
          featureContext.moveTo(5, 0.5);
          featureContext.bezierCurveTo(-1, 0.5, -1, feature.height + 0.5, 5, feature.height + 0.5);
          featureContext.fill();
        }

        if (feature.end === chrSize) {
          featureContext.clearRect(feature.x + feature.width - 5, 0, 5, feature.height + 0.5);

          if (feature.start !== 1) {
            featureContext.fillStyle = feature.color;
            featureContext.moveTo(feature.x, 0.5);
            featureContext.lineTo(feature.x + feature.width - 5, 0.5);
            featureContext.moveTo(feature.x, feature.height + 0.5);
            featureContext.lineTo(feature.x + feature.width - 5, feature.height + 0.5);
          }

          featureContext.moveTo(feature.x + feature.width - 5, 0.5);
          featureContext.bezierCurveTo(this.width + 1, 0.5, this.width + 1, feature.height + 0.5, feature.x + feature.width - 5, feature.height + 0.5);
          featureContext.fill();
        }
      } else {
        featureContext.moveTo(feature.x, 0.5);
        featureContext.lineTo(feature.x + feature.width, 0.5);
        featureContext.moveTo(feature.x, feature.height + 0.5);
        featureContext.lineTo(feature.x + feature.width, feature.height + 0.5);
      }

      featureContext.stroke();
    }
  },

  drawLabel: function (feature) {
    if ((feature.start === 1 || feature.end === this.browser.getChromosomeSize(feature.chr)) && feature.labelWidth >= Math.floor(feature.width - 5)) {
      return;
    }

    this.base.apply(this, arguments);
  },

  populateMenu: function (feature) {
    return {
      title    : feature.menuTitle,
      Position : feature.chr + ':' + feature.start + '-' + feature.end
    };
  }
});


Genoverse.Track.dbSNP = Genoverse.Track.extend({
  id               : 'dbSNP',
  name             : 'dbSNP',
  info             : 'All sequence variants from the database of Single Nucleotide Polymorphisms (dbSNP)',
  url              : '//rest.ensembl.org/overlap/region/human/__CHR__:__START__-__END__?feature=variation;content-type=application/json',
  dataRequestLimit : 5000000, // As per e! REST API restrictions
  threshold        : 1e5,
  labels           : false,
  legend           : true,
  autoHeight       : true,
  colorMap         : {
    transcript_ablation                : '#ff0000',
    splice_acceptor_variant            : '#FF581A',
    splice_donor_variant               : '#FF581A',
    stop_gained                        : '#ff0000',
    frameshift_variant                 : '#9400D3',
    stop_lost                          : '#ff0000',
    start_lost                         : '#ffd700',
    transcript_amplification           : '#ff69b4',
    inframe_insertion                  : '#ff69b4',
    inframe_deletion                   : '#ff69b4',
    missense_variant                   : '#ffd700',
    protein_altering_variant           : '#FF0080',
    splice_region_variant              : '#ff7f50',
    incomplete_terminal_codon_variant  : '#ff00ff',
    stop_retained_variant              : '#76ee00',
    synonymous_variant                 : '#76ee00',
    coding_sequence_variant            : '#458b00',
    mature_miRNA_variant               : '#458b00',
    '5_prime_UTR_variant'              : '#7ac5cd',
    '3_prime_UTR_variant'              : '#7ac5cd',
    non_coding_transcript_exon_variant : '#32cd32',
    intron_variant                     : '#02599c',
    NMD_transcript_variant             : '#ff4500',
    non_coding_transcript_variant      : '#32cd32',
    upstream_gene_variant              : '#a2b5cd',
    downstream_gene_variant            : '#a2b5cd',
    TFBS_ablation                      : '#a52a2a',
    TFBS_amplification                 : '#a52a2a',
    TF_binding_site_variant            : '#a52a2a',
    regulatory_region_ablation         : '#a52a2a',
    regulatory_region_amplification    : '#a52a2a',
    feature_elongation                 : '#7f7f7f',
    regulatory_region_variant          : '#a52a2a',
    feature_truncation                 : '#7f7f7f',
    intergenic_variant                 : '#636363'
  },

  insertFeature: function (feature) {
    feature.color  = this.prop('colorMap')[feature.consequence_type];
    feature.legend = feature.consequence_type;

    if (feature.start > feature.end) {
      feature.decorations = true;
    }

    this.base(feature);
  },

  decorateFeature: function (feature, context, scale) {
    context.fillStyle = feature.color;
    context.beginPath();
    context.moveTo(feature.position[scale].X - 3, feature.position[scale].Y + this.featureHeight);
    context.lineTo(feature.position[scale].X,     feature.position[scale].Y + this.featureHeight - 4);
    context.lineTo(feature.position[scale].X + 3, feature.position[scale].Y + this.featureHeight);
    context.fill();

    if (scale > 1) {
      context.fillRect(feature.position[scale].X - 0.5, feature.position[scale].Y, 1.5, feature.position[scale].height);
    }
  },

  populateMenu: function (feature) {
    var deferred = $.Deferred();
    var menu     = [{
      title       : '<a href="http://www.ensembl.org/Homo_sapiens/Variation/Summary?v=' + feature.id + '" target="_blank">' + feature.id + '</a>',
      Location    : feature.chr + ':' + feature.start + '-' + feature.end,
      Consequence : feature.consequence_type,
      Alleles     : feature.alleles.join(', ')
    }];

    $.ajax({
      url      : '//rest.ensembl.org/variation/human/' + feature.id + '?population_genotypes=1;content-type=application/json',
      dataType : 'json',
      success  : function (data) {
        var populationGenotypes = $.grep(data.population_genotypes, function (pop) { return /1000GENOMES.+ALL/.test(pop.population); }); // Only considering 1000 Genomes: ALL population
        var frequencies         = {};
        var pop, i, j;

        if (populationGenotypes.length) {
          for (i = 0; i < populationGenotypes.length; i++) {
            pop           = populationGenotypes[i];
            pop.frequency = parseFloat(pop.frequency, 10);
            pop.count     = parseInt(pop.count, 10);

            frequencies[pop.population] = frequencies[pop.population] || [];
            frequencies[pop.population].push(pop);
          }

          for (i in frequencies) {
            frequencies[i].sort(function (a, b) { return a.count < b.count; });

            pop = {
              title    : i + ' population genotypes',
              Genotype : [ 'Frequency', 'Count' ],
              start    : false,
              end      : false
            };

            for (j in frequencies[i]) {
              pop[frequencies[i][j].genotype] = [ (frequencies[i][j].frequency * 100).toFixed(2) + '%', frequencies[i][j].count ];
            }

            menu.push(pop);
          }

          pop = {
            start : false,
            end   : false
          };

          pop['<a href="http://www.ensembl.org/Homo_sapiens/Variation/Population?v=' + feature.id + '" target="_blank">See all population genotypes</a>'] = '';

          menu.push(pop);
        }

        deferred.resolve(menu);
      }
    });

    return deferred;
  },

  // Different settings for different zoom level
  5000: { // more than 5k
    bump: false
  },
  1: { // > 1 base-pair, but less then 5k
    bump: true
  }

});


Genoverse.Track.File = Genoverse.Track.extend({
  setInterface: function () {
    this.base();

    this._interface.isLocal   = 'model';
    this._interface.dataFile  = 'model';
    this._interface.indexFile = 'model';
    this._interface.largeFile = 'model';
  }
});


Genoverse.Track.File.BAM = Genoverse.Track.File.extend({
  name      : 'BAM',
  indexExt  : '.bai',
  threshold : 100000,
  largeFile : true,
  model     : Genoverse.Track.Model.File.BAM,
  view      : Genoverse.Track.View.Sequence.extend({
    bump       : true,
    autoHeight : true
  }),

  click: function () {
    var menu = this.base.apply(this, arguments);

    if (menu) {
      menu.addClass('gv-wrap-values');
    }

    return menu;
  },

  populateMenu: function (feature) {
    var f = $.extend({ title: feature.readName }, feature);

    delete f.sequence;
    delete f.id;

    return this.base(f);
  }
});


Genoverse.Track.File.BED = Genoverse.Track.File.extend({
  name          : 'BED',
  model         : Genoverse.Track.Model.File.BED,
  bump          : true,
  featureHeight : 6,

  populateMenu: function (feature) {
    return {
      title       : '<a target=_blank href="https://genome.ucsc.edu/FAQ/FAQformat.html#format1">BED feature details</a>',
      chrom       : feature.originalFeature[0],
      chromStart  : feature.originalFeature[1],
      chromEnd    : feature.originalFeature[2],
      name        : feature.originalFeature[3],
      score       : feature.originalFeature[4],
      strand      : feature.originalFeature[5],
      thickStart  : feature.originalFeature[6],
      thickEnd    : feature.originalFeature[7],
      itemRgb     : feature.originalFeature[8],
      blockCount  : feature.originalFeature[9],
      blockSizes  : feature.originalFeature[10],
      blockStarts : feature.originalFeature[11]
    };
  }
});

Genoverse.Track.File.GFF = Genoverse.Track.File.extend({
  name          : 'GFF',
  model         : Genoverse.Track.Model.File.GFF,
  bump          : true,
  height        : 100,
  featureHeight : 5
});

Genoverse.Track.File.GTF = Genoverse.Track.File.GFF;

Genoverse.Track.File.VCF = Genoverse.Track.File.extend({
  name       : 'VCF',
  indexExt   : '.tbi',
  model      : Genoverse.Track.Model.File.VCF,
  autoHeight : false,
  maxQual    : undefined, // Set this to the maximum value of the QUAL field in the file in order to color features by QUAL. Only required for large (tabix indexed) files - small ones can calculate this value automatically

  afterSetMVC: function () {
    if (this.prop('gz')) {
      this.prop('threshold', 1e5);
    }
  },

  populateMenu: function (feature) {
    return {
      title  : '<a target="_blank" href="http://www.1000genomes.org/node/101">VCF feature details</a>',
      CHROM  : feature.originalFeature[0],
      POS    : feature.originalFeature[1],
      ID     : feature.originalFeature[2],
      REF    : feature.originalFeature[3],
      ALT    : feature.originalFeature[4],
      QUAL   : feature.originalFeature[5],
      FILTER : feature.originalFeature[6],
      INFO   : feature.originalFeature[7].split(';').join('<br />')
    };
  },

  1: {
    view: Genoverse.Track.View.Sequence.extend({
      bump          : true,
      labels        : false,
      featureMargin : { top: 0, right: 0, bottom: 0, left: 0 },

      draw: function (features, featureContext, labelContext, scale) {
        this.base.apply(this, arguments);
        this.highlightRef(features, featureContext, scale);
      },

      highlightRef: function (features, context, scale) {
        context.strokeStyle = 'black';

        for (var i = 0; i < features.length; i++) {
          if (features[i].allele === 'REF') {
            context.strokeRect(features[i].position[scale].X, features[i].position[scale].Y, features[i].position[scale].width, features[i].position[scale].height);
          }
        }
      }
    })
  },

  1000: {
    view: Genoverse.Track.View.extend({
      bump   : false,
      labels : false,

      drawFeature: function (feature) {
        var maxQual = this.prop('maxQual');

        if (maxQual && !feature.color) {
          var heat  = Math.min(255, Math.floor(255 * (feature.originalFeature[5] || 0) / maxQual)) - 127;
          var red   = heat > 0 ? 255 : 127 + heat;
          var green = heat < 0 ? 255 : 127 - heat;

          feature.color = 'rgb(' + red + ',' + green + ',0)';
        }

        this.base.apply(this, arguments);
      }
    })
  }
});


Genoverse.Track.Gene = Genoverse.Track.extend({
  id     : 'genes',
  name   : 'Genes',
  height : 200,
  legend : true,

  populateMenu: function (feature) {
    var url  = 'http://www.ensembl.org/Homo_sapiens/' + (feature.feature_type === 'transcript' ? 'Transcript' : 'Gene') + '/Summary?' + (feature.feature_type === 'transcript' ? 't' : 'g') + '=' + feature.id;
    var menu = {
      title    : '<a target="_blank" href="' + url + '">' + (feature.external_name ? feature.external_name + ' (' + feature.id + ')' : feature.id) + '</a>',
      Location : feature.chr + ':' + feature.start + '-' + feature.end,
      Source   : feature.source,
      Biotype  : feature.biotype
    };

    if (feature.feature_type === 'transcript') {
      menu.Gene = '<a target="_blank" href="http://www.ensembl.org/Homo_sapiens/Gene/Summary?g=' + feature.Parent + '">' + feature.Parent + '</a>';
    }

    return menu;
  },

  // Different settings for different zoom level
  2000000: { // This one applies when > 2M base-pairs per screen
    labels : false
  },
  100000: { // more than 100K but less then 2M
    labels : true,
    model  : Genoverse.Track.Model.Gene.Ensembl,
    view   : Genoverse.Track.View.Gene.Ensembl
  },
  1: { // > 1 base-pair, but less then 100K
    labels : true,
    model  : Genoverse.Track.Model.Transcript.Ensembl,
    view   : Genoverse.Track.View.Transcript.Ensembl
  }
});


Genoverse.Track.HighlightRegion = Genoverse.Track.extend({
  id               : 'highlights',
  unsortable       : true,
  fixedOrder       : true,
  repeatLabels     : true,
  resizable        : false,
  border           : false,
  alwaysReposition : true,
  height           : 15,
  featureHeight    : 2,
  order            : -1,
  orderReverse     : 9e99,
  controls         : 'off',
  colors           : [ '#777777', '#F08080', '#3CB371', '#6495ED', '#FFA500', '#9370DB' ],
  labels           : 'separate',
  depth            : 1,
  featureMargin    : { top: 13, right: 0, bottom: 0, left: 0 },
  margin           : 0,

  constructor: function () {
    this.colorIndex = 0;
    return this.base.apply(this, arguments);
  },

  addHighlights: function (highlights) {
    for (var i = 0; i < highlights.length; i++) {
      this.model.insertFeature($.extend({ label: (highlights[i].start + '-' + highlights[i].end) }, highlights[i]));
    }

    this.reset();
  },

  removeHighlights: function (highlights) {
    var featuresByChr = this.prop('featuresByChr');
    var featuresById  = this.prop('featuresById');
    var features, bounds, h;

    highlights = highlights || $.map(featuresById, function (f) { return f; });

    for (var i = 0; i < highlights.length; i++) {
      if (highlights[i].removable === false) {
        continue;
      }

      features = featuresByChr[highlights[i].chr];
      bounds   = { x: highlights[i].start, y: 0, w: highlights[i].end - highlights[i].start + 1, h: 1 };

      // RTree.remove only works if the second argument (the object to be removed) === the object found in the tree.
      // Here, while highlight is effectively the same object as the one in the tree, it does has been cloned, so the === check fails.
      // To fix this, search for the feature to remove in the location of highlight.
      h = $.grep(features.search(bounds), function (item) { return item.id === highlights[i].id; });

      if (h.length) {
        features.remove(bounds, h[0]);
      }

      delete featuresById[highlights[i].id];
    }

    if (this.prop('strand') === 1) {
      this.prop('reverseTrack').removeHighlights(highlights);
    }

    this.reset();
  },

  controller: Genoverse.Track.Controller.Stranded.extend({
    setDefaults: function () {
      if (this.prop('strand') === -1) {
        this.prop('labels', false);
        this.prop('border', false);
        this.prop('height', 2);
        this.prop('featureMargin').top = 0;
      }

      this.base();
    },

    setName: function (name) {
      if (this.prop('strand') === -1) {
        this.base('');
        this.minLabelHeight = 0;
        this.label.height(0);
      } else {
        this.base(name);
      }
    },

    makeImage: function (params) {
      if (this.prop('strand') === 1) {
        params.background = 'gv-full-height';
      }

      var rtn = this.base(params);
      params.container.addClass(params.background);
      return rtn;
    },

    render: function (features, img) {
      this.base(features, img);
      img.siblings('.gv-labels').css('top', this.prop('featureHeight') - this.prop('featureMargin').top);
    },

    renderBackground: function (f, img) {
      this.base(f, img);
      img.height(this.browser.wrapper.outerHeight(true));
    },

    populateMenu: function (features) {
      var menu = [];
      var location, m;

      if (features.length > 1) {
        menu.push({ title: 'Highlights' });
      }

      for (var i = 0; i < features.length; i++) {
        location = features[i].start + '-' + features[i].end;
        m        = {
          title: features[i].label ? features[i].label[0] : location,
          start: false
        };

        m[m.title === location ? 'title' : 'Location'] = features[i].chr + ':' + location;
        m['<a class="gv-focus-highlight" href="#" data-chr="' + features[i].chr + '" data-start="' + features[i].start + '" data-end="' + features[i].end + '">Focus here</a>'] = '';

        if (features[i].removable !== false) {
          m['<a class="gv-remove-highlight"  href="#" data-id="' + features[i].id + '">Remove this highlight</a>'] = '';
          m['<a class="gv-remove-highlights" href="#">Remove all highlights</a>'] = '';
        }

        menu.push(m);
      }

      return menu;
    },

    click: function () {
      if (this.prop('strand') !== 1) {
        return;
      }

      var menuEl = this.base.apply(this, arguments);

      if (menuEl && !menuEl.data('highlightEvents')) {
        var track = this.track;

        menuEl.find('.gv-remove-highlight').on('click', function () {
          var id = $(this).data('id');
          track.removeHighlights($.grep(menuEl.data('feature'), function (f) { return f.id === id; }));
          return false;
        });

        menuEl.find('.gv-remove-highlights').on('click', function () {
          track.removeHighlights();
          return false;
        });

        menuEl.find('.gv-focus-highlight').on('click', function () {
          var data    = $(this).data();
          var length  = data.end - data.start + 1;
          var context = Math.max(Math.round(length / 4), 25);

          track.browser.moveTo(data.chr, data.start - context, data.end + context, true);

          return false;
        });

        menuEl.data('highlightEvents', true);
      }
    },

    getClickedFeatures: function (x, y, target) {
      var seen     = {};
      var scale    = this.scale;
      var features = $.grep(
        // feature positions
        this.featurePositions.search({ x: x, y: y, w: 1, h: 1 }).concat(
          // plus label positions where the labels are visible
          $.grep(this.labelPositions.search({ x: x, y: y, w: 1, h: 1 }), function (f) {
            return f.position[scale].label.visible !== false;
          })
        ), function (f) {
        // with duplicates removed
        var rtn = !seen[f.id];
        seen[f.id] = true;
        return rtn;
      });

      return features.length ? [ this.model.sortFeatures(features) ] : false;
    }
  }),

  model: Genoverse.Track.Model.Stranded.extend({
    url: false,

    insertFeature: function (feature) {
      feature.id   = feature.chr + ':' + feature.start + '-' + feature.end;
      feature.sort = feature.start;

      if (!feature.color) {
        var colors = this.prop('colors');
        var i      = this.prop('colorIndex');

        feature.color = colors[i++];

        this.prop('colorIndex', colors[i] ? i : 0);
      }

      if (!this.featuresById[feature.id]) {
        this.base(feature);
      }
    },

    findFeatures: function () {
      return Genoverse.Track.Model.prototype.findFeatures.apply(this, arguments);
    }
  }),

  view: Genoverse.Track.View.extend({
    positionFeatures: function (features, params) {
      var rtn = this.base.apply(this, arguments);

      // featureMargin.top gets used to define params.featureHeight, which is used to determine canvas height.
      // Since featureMargin.top = 13 on forward strand, the canvas has a 13px space at the bottom, meaning there is a gap before the background starts.
      // Reducing params.featureHeight here fixes that.
      params.featureHeight = Math.max(params.featureHeight - this.featureMargin.top, 0);

      return rtn;
    },

    draw: function (features, featureContext, labelContext, scale) {
      if (this.prop('strand') === 1) {
        featureContext.fillStyle = '#FFF';
        featureContext.fillRect(0, 0, featureContext.canvas.width, featureContext.canvas.height);
      }

      this.base(features, featureContext, labelContext, scale);
    },

    drawBackground: function (features, context, params) {
      if (this.prop('strand') === -1) {
        return;
      }

      for (var i = 0; i < features.length; i++) {
        context.fillStyle = features[i].color;

        this.drawFeature($.extend(true, {}, features[i], {
          x           : features[i].position[params.scale].X,
          y           : 0,
          width       : features[i].position[params.scale].width,
          height      : context.canvas.height,
          color       : this.shadeColor(context.fillStyle, 0.8),
          border      : features[i].color,
          label       : false,
          decorations : true
        }), context, false, params.scale);
      }
    },

    decorateFeature: function (feature, context, scale) {
      var x1   = feature.x + 0.5;
      var x2   = x1 + feature.width;
      var draw = false;

      context.strokeStyle = feature.border;
      context.lineWidth   = 2;
      context.beginPath();

      if (x1 >= 0 && x1 <= this.width) {
        context.moveTo(x1, feature.y);
        context.lineTo(x1, feature.y + feature.height);
        draw = true;
      }

      if (x2 >= 0 && x2 <= this.width) {
        context.moveTo(x2, feature.y);
        context.lineTo(x2, feature.y + feature.height);
        draw = true;
      }

      if (draw) {
        context.stroke();
      }

      context.lineWidth = 1;
    }
  })
});


Genoverse.Track.Controller.Legend = Genoverse.Track.Controller.Static.extend({
  init: function () {
    this.base();

    this.container.addClass('gv-track-container-legend');

    this.browser.legends[this.track.id] = this.track;

    this.track.setTracks();
  },

  destroy: function () {
    delete this.browser.legends[this.prop('id')];
    this.base();
  }
});

Genoverse.Track.Model.Legend = Genoverse.Track.Model.Static.extend({
  findFeatures: function () {
    var bounds   = { x: this.browser.scaledStart, y: 0, w: this.width };
    var features = {};

    $.each($.map(this.track.tracks, function (track) {
      var featurePositions = track.prop('featurePositions');
      bounds.h = track.prop('height');
      return featurePositions ? featurePositions.search(bounds).concat(track.prop('labelPositions').search(bounds)) : [];
    }), function () {
      if (this.legend) {
        features[this.legend] = this.legendColor || this.color;
      }
    });

    return this.sortFeatures($.map(features, function (color, text) { return [[ text, color ]]; }));
  },

  sortFeatures: function (features) {
    // sort legend alphabetically
    return features.sort(function (a, b) {
      var x = a[0].toLowerCase();
      var y = b[0].toLowerCase();
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }
});

Genoverse.Track.View.Legend = Genoverse.Track.View.Static.extend({
  textColor     : '#000000',
  labels        : 'overlay',
  featureHeight : 12,

  positionFeatures: function (f, params) {
    if (params.positioned) {
      return f;
    }

    var cols     = 2;
    var pad      = 5;
    var w        = 20;
    var x        = 0;
    var y        = 0;
    var xScale   = this.width / cols;
    var yScale   = this.fontHeight + pad;
    var features = [];
    var xOffest  = params.xOffset || 0;
    var xPos, yPos, labelWidth;

    for (var i = 0; i < f.length; i++) {
      xPos       = (x * xScale) + pad;
      yPos       = (y * yScale) + pad;
      labelWidth = this.context.measureText(f[i][0]).width;

      features.push(
        { x: xPos + xOffest,           y: yPos, width: w,              height: this.featureHeight, color: f[i][1] },
        { x: xPos + xOffest + pad + w, y: yPos, width: labelWidth + 1, height: this.featureHeight, color: false, labelColor: this.textColor, labelWidth: labelWidth, label: f[i][0] }
      );

      if (++x === cols) {
        x = 0;
        y++;
      }
    }

    params.height     = this.prop('height', f.length ? ((y + (x ? 1 : 0)) * yScale) + pad : 0);
    params.width      = this.width;
    params.positioned = true;

    return this.base(features, params);
  }
});

Genoverse.Track.Legend = Genoverse.Track.Static.extend({
  unsortable  : true,
  lockToTrack : true, // Always put the legend just below the last track that the legend is for
  removable   : false,

  controller : Genoverse.Track.Controller.Legend,
  model      : Genoverse.Track.Model.Legend,
  view       : Genoverse.Track.View.Legend,

  setDefaults: function () {
    this.order = typeof this.order !== 'undefined' ? this.order : 9e99;
    this.id    = this.id   || 'legend';
    this.type  = this.type || 'legend';
    this.base();
  },

  setEvents: function () {
    this.browser.on({
      'afterAddTracks afterRemoveTracks': function (tracks) {
        for (var i in this.legends) {
          this.legends[i].setTracks();
        }

        this.sortTracks();
      },
      afterRemoveTracks: function (tracks) {
        for (var i in tracks) {
          if (tracks[i].legendTrack && tracks[i].legendTrack.tracks.length === 0) {
            tracks[i].legendTrack.remove();
          }
        }

        for (var i in this.legends) {
          this.legends[i].controller.makeImage({});
        }
      },
      afterUpdateTrackOrder: function (e, ui) {
        var track       = ui.item.data('track');
        var legendTrack = this.legends[track.id] || track.legendTrack;

        // If a legend track, or a track with a sortable legend has been reordered, its lockToTrack status is ignored from now on.
        // This allows a legend to initially be locked to a track, but then to be reordered once the browser has been initialized
        if (legendTrack && legendTrack.lockToTrack && legendTrack.unsortable === false) {
          legendTrack.lockToTrack = false;
        }

        for (var i in this.legends) {
          this.legends[i].updateOrder();
        }

        this.sortTracks();
      }
    });

    this.browser.on({
      afterPositionFeatures: function (features, params) {
        var legend = this.prop('legendTrack');

        if (legend) {
          setTimeout(function () { legend.controller.makeImage(params); }, 1);
        }
      },
      afterResize: function (height, userResize) {
        var legend = this.prop('legendTrack');

        if (legend && userResize === true) {
          legend.controller.makeImage({});
        }
      },
      afterCheckHeight: function () {
        var legend = this.prop('legendTrack');

        if (legend) {
          legend.controller.makeImage({});
        }
      },
      afterSetMVC: function () {
        var legend = this.prop('legendTrack');

        if (legend && legend.tracks.length) {
          legend.disable();

          if (this.legend !== false) {
            legend.enable();
          }
        }
      }
    }, this);
  },

  setTracks: function () {
    var legend = this;
    var type   = this.type;

    this.tracks = $.map(this.browser.tracks.filter(function (t) {
      if (t.legendType === type) {
        t.legendTrack = t.legendTrack || legend;
        return true;
      }
    }), function (track) {
      return [ track ].concat(track.prop('childTracks'), track.prop('parentTrack')).filter(function (t) { return t && t !== legend && !t.prop('disabled'); })
    });

    this.updateOrder();

    if (typeof this.controller === 'object') {
      this[this.tracks.length ? 'enable' : 'disable']();
    } else {
      this.disabled = !this.tracks.length;
    }
  },

  updateOrder: function () {
    if (this.lockToTrack) {
      var tracks = this.tracks.filter(function (t) { return !t.prop('parentTrack'); });

      if (tracks.length) {
        this.order = tracks[tracks.length - 1].order + 0.1;
      }
    }
  },

  enable: function () {
    this.base();
    this.controller.makeImage({});
  },

  disable: function () {
    delete this.controller.stringified;
    this.base();
  }
});


Genoverse.Track.Scaleline = Genoverse.Track.Static.extend({
  strand     : 1,
  color      : '#000000',
  height     : 12,
  labels     : 'overlay',
  unsortable : true,
  fixedOrder : true,

  resize: $.noop,

  makeFirstImage: function () {
    this.prop('scaleline', false);
    this.base.apply(this, arguments);
  },

  render: function (f, img) {
    this.base(f, img);
    this.prop('drawnScale', img.data('scale'));
  },

  positionFeatures: function (features, params) {
    var scaleline = this.prop('scaleline');

    if (params.scale === this.drawnScale) {
      return false;
    } else if (scaleline) {
      return scaleline;
    }

    var strand = this.prop('strand');
    var height = this.prop('height');
    var text   = this.formatLabel(this.browser.length);
    var text2  = strand === 1 ? 'Forward strand' : 'Reverse strand';
    var width1 = this.context.measureText(text).width;
    var width2 = this.context.measureText(text2).width;
    var x1, x2;

    if (strand === 1) {
      x1 = 0;
      x2 = this.width - width2 - 40;
    } else {
      x1 = 25;
      x2 = 30;
    }

    scaleline = [
      { x: x1,                             y: height / 2, width: this.width - 25, height: 1, decorations: true },
      { x: (this.width - width1 - 10) / 2, y: 0,          width: width1 + 10,     height: height, clear: true, color: false, labelColor: this.color, labelWidth: width1, label: text  },
      { x: x2,                             y: 0,          width: width2 + 10,     height: height, clear: true, color: false, labelColor: this.color, labelWidth: width2, label: text2 }
    ];

    return this.base(this.prop('scaleline', scaleline), params);
  },

  decorateFeature: function (feature, context) {
    var strand = this.prop('strand');
    var height = this.prop('height');
    var x      = strand === 1 ? this.width - 25 : 25;

    context.strokeStyle = this.color;

    context.beginPath();
    context.moveTo(x,                 height * 0.25);
    context.lineTo(x + (strand * 20), height * 0.5);
    context.lineTo(x,                 height * 0.75);
    context.closePath();
    context.stroke();
    context.fill();
  }
});

Genoverse.Track.Scalebar = Genoverse.Track.extend({
  unsortable     : true,
  fixedOrder     : true,
  order          : 0,
  orderReverse   : 1e5,
  featureStrand  : 1,
  controls       : 'off',
  height         : 20,
  featureHeight  : 3,
  featureMargin  : { top: 0, right: 0, bottom: 2, left: 0 },
  margin         : 0,
  minPixPerMajor : 100, // Least number of pixels per written number
  color          : '#000000',
  autoHeight     : false,
  labels         : true,
  bump           : false,
  resizable      : false,
  click          : $.noop,
  colors         : {
    majorGuideLine : '#CCCCCC',
    minorGuideLine : '#E5E5E5'
  },

  setEvents: function () {
    var browser = this.browser;

    function resize() {
      $('.gv-bg.gv-full-height', browser.container).height(function () {
        return browser.wrapper.outerHeight(true) - $(this).parents('.gv-track-container').position().top;
      });
    }

    browser.on('afterAddTracks', resize);
    browser.on('afterResize', this, resize);
  },

  setScale: function () {
    var max       = this.prop('width') / this.prop('minPixPerMajor');
    var divisor   = 5;
    var majorUnit = -1;
    var fromDigit = ('' + this.browser.start).split(''); // Split into array of digits
    var toDigit   = ('' + this.browser.end).split('');
    var features  = {};
    var divisions, i;

    for (i = fromDigit.length; i < toDigit.length; i++) {
      fromDigit.unshift('0');
    }

    for (i = toDigit.length; i < fromDigit.length; i++) {
      toDigit.unshift('0');
    }

    // How many divisions would there be if we only kept i digits?
    for (i = 0; i < fromDigit.length; i++) {
      divisions = parseInt(toDigit.slice(0, fromDigit.length - i).join(''), 10) - parseInt(fromDigit.slice(0, fromDigit.length - i).join(''), 10);

      if (divisions && divisions <= max) {
        majorUnit = parseInt('1' + $.map(new Array(i), function () { return '0'; }).join(''), 10);
        break;
      }
    }

    if (majorUnit === -1) {
      majorUnit = this.browser.length === 1 ? 1 : parseInt('1' + $.map(new Array(fromDigit.length), function () { return '0'; }).join(''), 10);
      divisor   = 1;
    } else {
      // Improve things by trying simple multiples of 1<n zeroes>.
      // (eg if 100 will fit will 200, 400, 500).
      if (divisions * 5 <= max) {
        majorUnit /= 5;
        divisor    = 2;
      } else if (divisions * 4 <= max) {
        majorUnit /= 4;
        divisor    = 1;
      } else if (divisions * 2 <= max) {
        majorUnit /= 2;
      }
    }

    majorUnit = Math.max(majorUnit, 1);

    features[this.browser.chr] = new RTree();

    this.prop('minorUnit',     Math.max(majorUnit / divisor, 1));
    this.prop('majorUnit',     majorUnit);
    this.prop('featuresByChr', features);
    this.prop('featuresById',  {});
    this.prop('seen',          {});

    this.base();
  },

  setFeatures: function (chr, start, end) {
    var minorUnit = this.prop('minorUnit');
    var majorUnit = this.prop('majorUnit');
    var seen      = this.prop('seen');

    start = Math.max(start - (start % minorUnit) - majorUnit, 0);

    var flip = (start / minorUnit) % 2 ? 1 : -1;
    var feature, major, label;

    for (var x = start; x < end + minorUnit; x += minorUnit) {
      flip *= -1;

      if (seen[x]) {
        continue;
      }

      seen[x] = 1;

      feature = { id: chr + ':' + x, chr: chr, strand: 1, sort: x };
      major   = x && x % majorUnit === 0;

      if (flip === 1) {
        feature.start = x;
        feature.end   = x + minorUnit - 1;
      }

      if (major) {
        label = this.view.formatLabel(x);

        if (label !== this.lastLabel) {
          feature.label = label;

          if (!feature.end) {
            feature.start = x;
            feature.end   = x - 1;
          }
        }

        this.lastLabel = label;
      }

      if (feature.end) {
        this.model.insertFeature(feature);
      }
    }
  },

  makeFirstImage: function (moveTo) {
    if (this.prop('strand') === -1) {
      moveTo = this.track.forwardTrack.prop('scrollStart');
    }

    return this.base(moveTo);
  },

  makeImage: function (params) {
    params.background    = 'gv-guidelines gv-full-height';
    params.featureHeight = this.prop('height');

    this.track.setFeatures(params.chr, params.start, params.end);

    var rtn = this.base(params);

    params.container.addClass('gv-full-height');

    return rtn;
  },

  makeReverseImage: function (params) {
    this.imgContainers.push(params.container.clone().html(params.container.children('.gv-data').clone(true).css({ opacity: 1, background: this.browser.wrapper.css('backgroundColor') }))[0]);
    this.scrollContainer.append(this.imgContainers);
  },

  renderBackground: function (f, bgImage) {
    this.base(f, bgImage);
    bgImage.height(this.browser.wrapper.outerHeight(true));
  },

  draw: function (features, featureContext, labelContext, scale) {
    var i         = features.length;
    var minorUnit = this.prop('minorUnit');
    var width     = Math.ceil(minorUnit * scale);
    var feature, start, end;

    featureContext.textBaseline = 'top';
    featureContext.fillStyle    = this.color;

    this.guideLines = { major: {} }; // FIXME: pass params to draw, rather than scale. set guideLines on params

    while (i--) {
      feature = features[i];
      start   = Math.round(feature.position[scale].X);
      end     = start + width - 1;

      this.drawFeature($.extend({}, feature, {
        x      : start,
        y      : 0,
        width  : Math.ceil(feature.position[scale].width),
        height : this.featureHeight
      }), featureContext, labelContext, scale);

      if (feature.label) {
        if (start > -1) {
          featureContext.fillRect(start, this.featureHeight, 1, this.featureHeight);
        }

        this.guideLines.major[feature.start] = true;
      }

      // Fiddle the location so that these [additional major] lines overlap with normal lines
      if (feature.end < feature.start) {
        start--;
        end++;
      }

      this.guideLines[feature.start]             = start;
      this.guideLines[feature.start + minorUnit] = end;
    }

    featureContext.fillRect(0, 0, featureContext.canvas.width, 1);
    featureContext.fillRect(0, this.featureHeight, featureContext.canvas.width, 1);
  },

  // Draw guidelines
  drawBackground: function (f, context) {
    for (var i in this.guideLines) {
      if (this.guideLines[i] >= 0 && this.guideLines[i] <= this.width) {
        context.fillStyle = this.track.colors[this.guideLines.major[i] ? 'majorGuideLine' : 'minorGuideLine' ];
        context.fillRect(this.guideLines[i], 0, 1, context.canvas.height);
      }
    }
  },

  formatLabel: function (label) {
    return this.prop('minorUnit') < 1000 ? label.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') : this.base(label);
  }
});




var config = $('script:last').text();

if (config) {
  try {
    config = eval('('+ config +')');
    $(document).ready(function(){
      window.genoverse = new Genoverse(config);
    });
  } catch (e) {
    throw('Configuration ERROR:' + e);
  };
}
})();
