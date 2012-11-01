/*! jQuery v1.7.1 jquery.com | jquery.org/license */
(function(a,b){function cy(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cv(a){if(!ck[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){cl||(cl=c.createElement("iframe"),cl.frameBorder=cl.width=cl.height=0),b.appendChild(cl);if(!cm||!cl.createElement)cm=(cl.contentWindow||cl.contentDocument).document,cm.write((c.compatMode==="CSS1Compat"?"<!doctype html>":"")+"<html><body>"),cm.close();d=cm.createElement(a),cm.body.appendChild(d),e=f.css(d,"display"),b.removeChild(cl)}ck[a]=e}return ck[a]}function cu(a,b){var c={};f.each(cq.concat.apply([],cq.slice(0,b)),function(){c[this]=a});return c}function ct(){cr=b}function cs(){setTimeout(ct,0);return cr=f.now()}function cj(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ci(){try{return new a.XMLHttpRequest}catch(b){}}function cc(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function cb(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function ca(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bE.test(a)?d(a,e):ca(a+"["+(typeof e=="object"||f.isArray(e)?b:"")+"]",e,c,d)});else if(!c&&b!=null&&typeof b=="object")for(var e in b)ca(a+"["+e+"]",b[e],c,d);else d(a,b)}function b_(a,c){var d,e,g=f.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((g[d]?a:e||(e={}))[d]=c[d]);e&&f.extend(!0,a,e)}function b$(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bT,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=b$(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=b$(a,c,d,e,"*",g));return l}function bZ(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bP),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bC(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?bx:by,g=0,h=e.length;if(d>0){if(c!=="border")for(;g<h;g++)c||(d-=parseFloat(f.css(a,"padding"+e[g]))||0),c==="margin"?d+=parseFloat(f.css(a,c+e[g]))||0:d-=parseFloat(f.css(a,"border"+e[g]+"Width"))||0;return d+"px"}d=bz(a,b,b);if(d<0||d==null)d=a.style[b]||0;d=parseFloat(d)||0;if(c)for(;g<h;g++)d+=parseFloat(f.css(a,"padding"+e[g]))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+e[g]+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+e[g]))||0);return d+"px"}function bp(a,b){b.src?f.ajax({url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bf,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)}function bo(a){var b=c.createElement("div");bh.appendChild(b),b.innerHTML=a.outerHTML;return b.firstChild}function bn(a){var b=(a.nodeName||"").toLowerCase();b==="input"?bm(a):b!=="script"&&typeof a.getElementsByTagName!="undefined"&&f.grep(a.getElementsByTagName("input"),bm)}function bm(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bl(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bk(a,b){var c;if(b.nodeType===1){b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase();if(c==="object")b.outerHTML=a.outerHTML;else if(c!=="input"||a.type!=="checkbox"&&a.type!=="radio"){if(c==="option")b.selected=a.defaultSelected;else if(c==="input"||c==="textarea")b.defaultValue=a.defaultValue}else a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value);b.removeAttribute(f.expando)}}function bj(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c,d,e,g=f._data(a),h=f._data(b,g),i=g.events;if(i){delete h.handle,h.events={};for(c in i)for(d=0,e=i[c].length;d<e;d++)f.event.add(b,c+(i[c][d].namespace?".":"")+i[c][d].namespace,i[c][d],i[c][d].data)}h.data&&(h.data=f.extend({},h.data))}}function bi(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function U(a){var b=V.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function T(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(O.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function S(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function K(){return!0}function J(){return!1}function n(a,b,c){var d=b+"defer",e=b+"queue",g=b+"mark",h=f._data(a,d);h&&(c==="queue"||!f._data(a,e))&&(c==="mark"||!f._data(a,g))&&setTimeout(function(){!f._data(a,e)&&!f._data(a,g)&&(f.removeData(a,d,!0),h.fire())},0)}function m(a){for(var b in a){if(b==="data"&&f.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function l(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(k,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNumeric(d)?parseFloat(d):j.test(d)?f.parseJSON(d):d}catch(g){}f.data(a,c,d)}else d=b}return d}function h(a){var b=g[a]={},c,d;a=a.split(/\s+/);for(c=0,d=a.length;c<d;c++)b[a[c]]=!0;return b}var c=a.document,d=a.navigator,e=a.location,f=function(){function J(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(J,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,n=/^[\],:{}\s]*$/,o=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,p=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,q=/(?:^|:|,)(?:\s*\[)+/g,r=/(webkit)[ \/]([\w.]+)/,s=/(opera)(?:.*version)?[ \/]([\w.]+)/,t=/(msie) ([\w.]+)/,u=/(mozilla)(?:.*? rv:([\w.]+))?/,v=/-([a-z]|[0-9])/ig,w=/^-ms-/,x=function(a,b){return(b+"").toUpperCase()},y=d.userAgent,z,A,B,C=Object.prototype.toString,D=Object.prototype.hasOwnProperty,E=Array.prototype.push,F=Array.prototype.slice,G=String.prototype.trim,H=Array.prototype.indexOf,I={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=m.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.7.1",length:0,size:function(){return this.length},toArray:function(){return F.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?E.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),A.add(a);return this},eq:function(a){a=+a;return a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(F.apply(this,arguments),"slice",F.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:E,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;A.fireWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").off("ready")}},bindReady:function(){if(!A){A=e.Callbacks("once memory");if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",B,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",B),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&J()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a&&typeof a=="object"&&"setInterval"in a},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):I[C.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;try{if(a.constructor&&!D.call(a,"constructor")&&!D.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||D.call(a,d)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw new Error(a)},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(n.test(b.replace(o,"@").replace(p,"]").replace(q,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(c){var d,f;try{a.DOMParser?(f=new DOMParser,d=f.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(g){d=b}(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&e.error("Invalid XML: "+c);return d},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(w,"ms-").replace(v,x)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:G?function(a){return a==null?"":G.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?E.call(c,a):e.merge(c,a)}return c},inArray:function(a,b,c){var d;if(b){if(H)return H.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=F.call(arguments,2),g=function(){return a.apply(c,f.concat(F.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h){var i=a.length;if(typeof c=="object"){for(var j in c)e.access(a,j,c[j],f,g,d);return a}if(d!==b){f=!h&&f&&e.isFunction(d);for(var k=0;k<i;k++)g(a[k],c,f?d.call(a[k],k,g(a[k],c)):d,h);return a}return i?g(a[0],c):b},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=r.exec(a)||s.exec(a)||t.exec(a)||a.indexOf("compatible")<0&&u.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){I["[object "+b+"]"]=b.toLowerCase()}),z=e.uaMatch(y),z.browser&&(e.browser[z.browser]=!0,e.browser.version=z.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?B=function(){c.removeEventListener("DOMContentLoaded",B,!1),e.ready()}:c.attachEvent&&(B=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",B),e.ready())});return e}(),g={};f.Callbacks=function(a){a=a?g[a]||h(a):{};var c=[],d=[],e,i,j,k,l,m=function(b){var d,e,g,h,i;for(d=0,e=b.length;d<e;d++)g=b[d],h=f.type(g),h==="array"?m(g):h==="function"&&(!a.unique||!o.has(g))&&c.push(g)},n=function(b,f){f=f||[],e=!a.memory||[b,f],i=!0,l=j||0,j=0,k=c.length;for(;c&&l<k;l++)if(c[l].apply(b,f)===!1&&a.stopOnFalse){e=!0;break}i=!1,c&&(a.once?e===!0?o.disable():c=[]:d&&d.length&&(e=d.shift(),o.fireWith(e[0],e[1])))},o={add:function(){if(c){var a=c.length;m(arguments),i?k=c.length:e&&e!==!0&&(j=a,n(e[0],e[1]))}return this},remove:function(){if(c){var b=arguments,d=0,e=b.length;for(;d<e;d++)for(var f=0;f<c.length;f++)if(b[d]===c[f]){i&&f<=k&&(k--,f<=l&&l--),c.splice(f--,1);if(a.unique)break}}return this},has:function(a){if(c){var b=0,d=c.length;for(;b<d;b++)if(a===c[b])return!0}return!1},empty:function(){c=[];return this},disable:function(){c=d=e=b;return this},disabled:function(){return!c},lock:function(){d=b,(!e||e===!0)&&o.disable();return this},locked:function(){return!d},fireWith:function(b,c){d&&(i?a.once||d.push([b,c]):(!a.once||!e)&&n(b,c));return this},fire:function(){o.fireWith(this,arguments);return this},fired:function(){return!!e}};return o};var i=[].slice;f.extend({Deferred:function(a){var b=f.Callbacks("once memory"),c=f.Callbacks("once memory"),d=f.Callbacks("memory"),e="pending",g={resolve:b,reject:c,notify:d},h={done:b.add,fail:c.add,progress:d.add,state:function(){return e},isResolved:b.fired,isRejected:c.fired,then:function(a,b,c){i.done(a).fail(b).progress(c);return this},always:function(){i.done.apply(i,arguments).fail.apply(i,arguments);return this},pipe:function(a,b,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[b,"reject"],progress:[c,"notify"]},function(a,b){var c=b[0],e=b[1],g;f.isFunction(c)?i[a](function(){g=c.apply(this,arguments),g&&f.isFunction(g.promise)?g.promise().then(d.resolve,d.reject,d.notify):d[e+"With"](this===i?d:this,[g])}):i[a](d[e])})}).promise()},promise:function(a){if(a==null)a=h;else for(var b in h)a[b]=h[b];return a}},i=h.promise({}),j;for(j in g)i[j]=g[j].fire,i[j+"With"]=g[j].fireWith;i.done(function(){e="resolved"},c.disable,d.lock).fail(function(){e="rejected"},b.disable,d.lock),a&&a.call(i,i);return i},when:function(a){function m(a){return function(b){e[a]=arguments.length>1?i.call(arguments,0):b,j.notifyWith(k,e)}}function l(a){return function(c){b[a]=arguments.length>1?i.call(arguments,0):c,--g||j.resolveWith(j,b)}}var b=i.call(arguments,0),c=0,d=b.length,e=Array(d),g=d,h=d,j=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred(),k=j.promise();if(d>1){for(;c<d;c++)b[c]&&b[c].promise&&f.isFunction(b[c].promise)?b[c].promise().then(l(c),j.reject,m(c)):--g;g||j.resolveWith(j,b)}else j!==a&&j.resolveWith(j,d?[a]:[]);return k}}),f.support=function(){var b,d,e,g,h,i,j,k,l,m,n,o,p,q=c.createElement("div"),r=c.documentElement;q.setAttribute("className","t"),q.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=q.getElementsByTagName("*"),e=q.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=q.getElementsByTagName("input")[0],b={leadingWhitespace:q.firstChild.nodeType===3,tbody:!q.getElementsByTagName("tbody").length,htmlSerialize:!!q.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:q.className!=="t",enctype:!!c.createElement("form").enctype,html5Clone:c.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0},i.checked=!0,b.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,b.optDisabled=!h.disabled;try{delete q.test}catch(s){b.deleteExpando=!1}!q.addEventListener&&q.attachEvent&&q.fireEvent&&(q.attachEvent("onclick",function(){b.noCloneEvent=!1}),q.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),b.radioValue=i.value==="t",i.setAttribute("checked","checked"),q.appendChild(i),k=c.createDocumentFragment(),k.appendChild(q.lastChild),b.checkClone=k.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=i.checked,k.removeChild(i),k.appendChild(q),q.innerHTML="",a.getComputedStyle&&(j=c.createElement("div"),j.style.width="0",j.style.marginRight="0",q.style.width="2px",q.appendChild(j),b.reliableMarginRight=(parseInt((a.getComputedStyle(j,null)||{marginRight:0}).marginRight,10)||0)===0);if(q.attachEvent)for(o in{submit:1,change:1,focusin:1})n="on"+o,p=n in q,p||(q.setAttribute(n,"return;"),p=typeof q[n]=="function"),b[o+"Bubbles"]=p;k.removeChild(q),k=g=h=j=q=i=null,f(function(){var a,d,e,g,h,i,j,k,m,n,o,r=c.getElementsByTagName("body")[0];!r||(j=1,k="position:absolute;top:0;left:0;width:1px;height:1px;margin:0;",m="visibility:hidden;border:0;",n="style='"+k+"border:5px solid #000;padding:0;'",o="<div "+n+"><div></div></div>"+"<table "+n+" cellpadding='0' cellspacing='0'>"+"<tr><td></td></tr></table>",a=c.createElement("div"),a.style.cssText=m+"width:0;height:0;position:static;top:0;margin-top:"+j+"px",r.insertBefore(a,r.firstChild),q=c.createElement("div"),a.appendChild(q),q.innerHTML="<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>",l=q.getElementsByTagName("td"),p=l[0].offsetHeight===0,l[0].style.display="",l[1].style.display="none",b.reliableHiddenOffsets=p&&l[0].offsetHeight===0,q.innerHTML="",q.style.width=q.style.paddingLeft="1px",f.boxModel=b.boxModel=q.offsetWidth===2,typeof q.style.zoom!="undefined"&&(q.style.display="inline",q.style.zoom=1,b.inlineBlockNeedsLayout=q.offsetWidth===2,q.style.display="",q.innerHTML="<div style='width:4px;'></div>",b.shrinkWrapBlocks=q.offsetWidth!==2),q.style.cssText=k+m,q.innerHTML=o,d=q.firstChild,e=d.firstChild,h=d.nextSibling.firstChild.firstChild,i={doesNotAddBorder:e.offsetTop!==5,doesAddBorderForTableAndCells:h.offsetTop===5},e.style.position="fixed",e.style.top="20px",i.fixedPosition=e.offsetTop===20||e.offsetTop===15,e.style.position=e.style.top="",d.style.overflow="hidden",d.style.position="relative",i.subtractsBorderForOverflowNotVisible=e.offsetTop===-5,i.doesNotIncludeMarginInBodyOffset=r.offsetTop!==j,r.removeChild(a),q=a=null,f.extend(b,i))});return b}();var j=/^(?:\{.*\}|\[.*\])$/,k=/([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!m(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g,h,i,j=f.expando,k=typeof c=="string",l=a.nodeType,m=l?f.cache:a,n=l?a[j]:a[j]&&j,o=c==="events";if((!n||!m[n]||!o&&!e&&!m[n].data)&&k&&d===b)return;n||(l?a[j]=n=++f.uuid:n=j),m[n]||(m[n]={},l||(m[n].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?m[n]=f.extend(m[n],c):m[n].data=f.extend(m[n].data,c);g=h=m[n],e||(h.data||(h.data={}),h=h.data),d!==b&&(h[f.camelCase(c)]=d);if(o&&!h[c])return g.events;k?(i=h[c],i==null&&(i=h[f.camelCase(c)])):i=h;return i}},removeData:function(a,b,c){if(!!f.acceptData(a)){var d,e,g,h=f.expando,i=a.nodeType,j=i?f.cache:a,k=i?a[h]:h;if(!j[k])return;if(b){d=c?j[k]:j[k].data;if(d){f.isArray(b)||(b in d?b=[b]:(b=f.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,g=b.length;e<g;e++)delete d[b[e]];if(!(c?m:f.isEmptyObject)(d))return}}if(!c){delete j[k].data;if(!m(j[k]))return}f.support.deleteExpando||!j.setInterval?delete j[k]:j[k]=null,i&&(f.support.deleteExpando?delete a[h]:a.removeAttribute?a.removeAttribute(h):a[h]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d,e,g,h=null;if(typeof a=="undefined"){if(this.length){h=f.data(this[0]);if(this[0].nodeType===1&&!f._data(this[0],"parsedAttrs")){e=this[0].attributes;for(var i=0,j=e.length;i<j;i++)g=e[i].name,g.indexOf("data-")===0&&(g=f.camelCase(g.substring(5)),l(this[0],g,h[g]));f._data(this[0],"parsedAttrs",!0)}}return h}if(typeof a=="object")return this.each(function(){f.data(this,a)});d=a.split("."),d[1]=d[1]?"."+d[1]:"";if(c===b){h=this.triggerHandler("getData"+d[1]+"!",[d[0]]),h===b&&this.length&&(h=f.data(this[0],a),h=l(this[0],a,h));return h===b&&d[1]?this.data(d[0]):h}return this.each(function(){var b=f(this),e=[d[0],c];b.triggerHandler("setData"+d[1]+"!",e),f.data(this,a,c),b.triggerHandler("changeData"+d[1]+"!",e)})},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,b){a&&(b=(b||"fx")+"mark",f._data(a,b,(f._data(a,b)||0)+1))},_unmark:function(a,b,c){a!==!0&&(c=b,b=a,a=!1);if(b){c=c||"fx";var d=c+"mark",e=a?0:(f._data(b,d)||1)-1;e?f._data(b,d,e):(f.removeData(b,d,!0),n(b,c,"mark"))}},queue:function(a,b,c){var d;if(a){b=(b||"fx")+"queue",d=f._data(a,b),c&&(!d||f.isArray(c)?d=f._data(a,b,f.makeArray(c)):d.push(c));return d||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e={};d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),f._data(a,b+".run",e),d.call(a,function(){f.dequeue(a,b)},e)),c.length||(f.removeData(a,b+"queue "+b+".run",!0),n(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){typeof a!="string"&&(c=a,a="fx");if(c===b)return f.queue(this[0],a);return this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f.Callbacks("once memory"),!0))h++,l.add(m);m();return d.promise()}});var o=/[\n\t\r]/g,p=/\s+/,q=/\r/g,r=/^(?:button|input)$/i,s=/^(?:button|input|object|select|textarea)$/i,t=/^a(?:rea)?$/i,u=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,v=f.support.getSetAttribute,w,x,y;f.fn.extend({attr:function(a,b){return f.access(this,a,b,!0,f.attr)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,a,b,!0,f.prop)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,g,h,i;if(f.isFunction(a))return this.each(function(b){f(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(p);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{g=" "+e.className+" ";for(h=0,i=b.length;h<i;h++)~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ");e.className=f.trim(g)}}}return this},removeClass:function(a){var c,d,e,g,h,i,j;if(f.isFunction(a))return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(p);for(d=0,e=this.length;d<e;d++){g=this[d];if(g.nodeType===1&&g.className)if(a){h=(" "+g.className+" ").replace(o," ");for(i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(p);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(o," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e,g=this[0];{if(!!arguments.length){e=f.isFunction(a);return this.each(function(d){var g=f(this),h;if(this.nodeType===1){e?h=a.call(this,d,g.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.nodeName.toLowerCase()]||f.valHooks[this.type];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}if(g){c=f.valHooks[g.nodeName.toLowerCase()]||f.valHooks[g.type];if(c&&"get"in c&&(d=c.get(g,"value"))!==b)return d;d=g.value;return typeof d=="string"?d.replace(q,""):d==null?"":d}}}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,g=a.selectedIndex,h=[],i=a.options,j=a.type==="select-one";if(g<0)return null;c=j?g:0,d=j?g+1:i.length;for(;c<d;c++){e=i[c];if(e.selected&&(f.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!f.nodeName(e.parentNode,"optgroup"))){b=f(e).val();if(j)return b;h.push(b)}}if(j&&!h.length&&i.length)return f(i[g]).val();return h},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attr:function(a,c,d,e){var g,h,i,j=a.nodeType;if(!!a&&j!==3&&j!==8&&j!==2){if(e&&c in f.attrFn)return f(a)[c](d);if(typeof a.getAttribute=="undefined")return f.prop(a,c,d);i=j!==1||!f.isXMLDoc(a),i&&(c=c.toLowerCase(),h=f.attrHooks[c]||(u.test(c)?x:w));if(d!==b){if(d===null){f.removeAttr(a,c);return}if(h&&"set"in h&&i&&(g=h.set(a,d,c))!==b)return g;a.setAttribute(c,""+d);return d}if(h&&"get"in h&&i&&(g=h.get(a,c))!==null)return g;g=a.getAttribute(c);return g===null?b:g}},removeAttr:function(a,b){var c,d,e,g,h=0;if(b&&a.nodeType===1){d=b.toLowerCase().split(p),g=d.length;for(;h<g;h++)e=d[h],e&&(c=f.propFix[e]||e,f.attr(a,e,""),a.removeAttribute(v?e:c),u.test(e)&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(r.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},value:{get:function(a,b){if(w&&f.nodeName(a,"button"))return w.get(a,b);return b in a?a.value:null},set:function(a,b,c){if(w&&f.nodeName(a,"button"))return w.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,g,h,i=a.nodeType;if(!!a&&i!==3&&i!==8&&i!==2){h=i!==1||!f.isXMLDoc(a),h&&(c=f.propFix[c]||c,g=f.propHooks[c]);return d!==b?g&&"set"in g&&(e=g.set(a,d,c))!==b?e:a[c]=d:g&&"get"in g&&(e=g.get(a,c))!==null?e:a[c]}},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):s.test(a.nodeName)||t.test(a.nodeName)&&a.href?0:b}}}}),f.attrHooks.tabindex=f.propHooks.tabIndex,x={get:function(a,c){var d,e=f.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));return c}},v||(y={name:!0,id:!0},w=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&(y[c]?d.nodeValue!=="":d.specified)?d.nodeValue:b},set:function(a,b,d){var e=a.getAttributeNode(d);e||(e=c.createAttribute(d),a.setAttributeNode(e));return e.nodeValue=b+""}},f.attrHooks.tabindex.set=w.set,f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})}),f.attrHooks.contenteditable={get:w.get,set:function(a,b,c){b===""&&(b="false"),w.set(a,b,c)}}),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex);return null}})),f.support.enctype||(f.propFix.enctype="encoding"),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var z=/^(?:textarea|input|select)$/i,A=/^([^\.]*)?(?:\.(.+))?$/,B=/\bhover(\.\S+)?\b/,C=/^key/,D=/^(?:mouse|contextmenu)|click/,E=/^(?:focusinfocus|focusoutblur)$/,F=/^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,G=function(a){var b=F.exec(a);b&&(b[1]=(b[1]||"").toLowerCase(),b[3]=b[3]&&new RegExp("(?:^|\\s)"+b[3]+"(?:\\s|$)"));return b},H=function(a,b){var c=a.attributes||{};return(!b[1]||a.nodeName.toLowerCase()===b[1])&&(!b[2]||(c.id||{}).value===b[2])&&(!b[3]||b[3].test((c["class"]||{}).value))},I=function(a){return f.event.special.hover?a:a.replace(B,"mouseenter$1 mouseleave$1")};
f.event={add:function(a,c,d,e,g){var h,i,j,k,l,m,n,o,p,q,r,s;if(!(a.nodeType===3||a.nodeType===8||!c||!d||!(h=f._data(a)))){d.handler&&(p=d,d=p.handler),d.guid||(d.guid=f.guid++),j=h.events,j||(h.events=j={}),i=h.handle,i||(h.handle=i=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.dispatch.apply(i.elem,arguments):b},i.elem=a),c=f.trim(I(c)).split(" ");for(k=0;k<c.length;k++){l=A.exec(c[k])||[],m=l[1],n=(l[2]||"").split(".").sort(),s=f.event.special[m]||{},m=(g?s.delegateType:s.bindType)||m,s=f.event.special[m]||{},o=f.extend({type:m,origType:l[1],data:e,handler:d,guid:d.guid,selector:g,quick:G(g),namespace:n.join(".")},p),r=j[m];if(!r){r=j[m]=[],r.delegateCount=0;if(!s.setup||s.setup.call(a,e,n,i)===!1)a.addEventListener?a.addEventListener(m,i,!1):a.attachEvent&&a.attachEvent("on"+m,i)}s.add&&(s.add.call(a,o),o.handler.guid||(o.handler.guid=d.guid)),g?r.splice(r.delegateCount++,0,o):r.push(o),f.event.global[m]=!0}a=null}},global:{},remove:function(a,b,c,d,e){var g=f.hasData(a)&&f._data(a),h,i,j,k,l,m,n,o,p,q,r,s;if(!!g&&!!(o=g.events)){b=f.trim(I(b||"")).split(" ");for(h=0;h<b.length;h++){i=A.exec(b[h])||[],j=k=i[1],l=i[2];if(!j){for(j in o)f.event.remove(a,j+b[h],c,d,!0);continue}p=f.event.special[j]||{},j=(d?p.delegateType:p.bindType)||j,r=o[j]||[],m=r.length,l=l?new RegExp("(^|\\.)"+l.split(".").sort().join("\\.(?:.*\\.)?")+"(\\.|$)"):null;for(n=0;n<r.length;n++)s=r[n],(e||k===s.origType)&&(!c||c.guid===s.guid)&&(!l||l.test(s.namespace))&&(!d||d===s.selector||d==="**"&&s.selector)&&(r.splice(n--,1),s.selector&&r.delegateCount--,p.remove&&p.remove.call(a,s));r.length===0&&m!==r.length&&((!p.teardown||p.teardown.call(a,l)===!1)&&f.removeEvent(a,j,g.handle),delete o[j])}f.isEmptyObject(o)&&(q=g.handle,q&&(q.elem=null),f.removeData(a,["events","handle"],!0))}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){if(!e||e.nodeType!==3&&e.nodeType!==8){var h=c.type||c,i=[],j,k,l,m,n,o,p,q,r,s;if(E.test(h+f.event.triggered))return;h.indexOf("!")>=0&&(h=h.slice(0,-1),k=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if((!e||f.event.customEvent[h])&&!f.event.global[h])return;c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.isTrigger=!0,c.exclusive=k,c.namespace=i.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)"):null,o=h.indexOf(":")<0?"on"+h:"";if(!e){j=f.cache;for(l in j)j[l].events&&j[l].events[h]&&f.event.trigger(c,d,j[l].handle.elem,!0);return}c.result=b,c.target||(c.target=e),d=d!=null?f.makeArray(d):[],d.unshift(c),p=f.event.special[h]||{};if(p.trigger&&p.trigger.apply(e,d)===!1)return;r=[[e,p.bindType||h]];if(!g&&!p.noBubble&&!f.isWindow(e)){s=p.delegateType||h,m=E.test(s+h)?e:e.parentNode,n=null;for(;m;m=m.parentNode)r.push([m,s]),n=m;n&&n===e.ownerDocument&&r.push([n.defaultView||n.parentWindow||a,s])}for(l=0;l<r.length&&!c.isPropagationStopped();l++)m=r[l][0],c.type=r[l][1],q=(f._data(m,"events")||{})[c.type]&&f._data(m,"handle"),q&&q.apply(m,d),q=o&&m[o],q&&f.acceptData(m)&&q.apply(m,d)===!1&&c.preventDefault();c.type=h,!g&&!c.isDefaultPrevented()&&(!p._default||p._default.apply(e.ownerDocument,d)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)&&o&&e[h]&&(h!=="focus"&&h!=="blur"||c.target.offsetWidth!==0)&&!f.isWindow(e)&&(n=e[o],n&&(e[o]=null),f.event.triggered=h,e[h](),f.event.triggered=b,n&&(e[o]=n));return c.result}},dispatch:function(c){c=f.event.fix(c||a.event);var d=(f._data(this,"events")||{})[c.type]||[],e=d.delegateCount,g=[].slice.call(arguments,0),h=!c.exclusive&&!c.namespace,i=[],j,k,l,m,n,o,p,q,r,s,t;g[0]=c,c.delegateTarget=this;if(e&&!c.target.disabled&&(!c.button||c.type!=="click")){m=f(this),m.context=this.ownerDocument||this;for(l=c.target;l!=this;l=l.parentNode||this){o={},q=[],m[0]=l;for(j=0;j<e;j++)r=d[j],s=r.selector,o[s]===b&&(o[s]=r.quick?H(l,r.quick):m.is(s)),o[s]&&q.push(r);q.length&&i.push({elem:l,matches:q})}}d.length>e&&i.push({elem:this,matches:d.slice(e)});for(j=0;j<i.length&&!c.isPropagationStopped();j++){p=i[j],c.currentTarget=p.elem;for(k=0;k<p.matches.length&&!c.isImmediatePropagationStopped();k++){r=p.matches[k];if(h||!c.namespace&&!r.namespace||c.namespace_re&&c.namespace_re.test(r.namespace))c.data=r.data,c.handleObj=r,n=((f.event.special[r.origType]||{}).handle||r.handler).apply(p.elem,g),n!==b&&(c.result=n,n===!1&&(c.preventDefault(),c.stopPropagation()))}}return c.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode);return a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,d){var e,f,g,h=d.button,i=d.fromElement;a.pageX==null&&d.clientX!=null&&(e=a.target.ownerDocument||c,f=e.documentElement,g=e.body,a.pageX=d.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=d.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?d.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0);return a}},fix:function(a){if(a[f.expando])return a;var d,e,g=a,h=f.event.fixHooks[a.type]||{},i=h.props?this.props.concat(h.props):this.props;a=f.Event(g);for(d=i.length;d;)e=i[--d],a[e]=g[e];a.target||(a.target=g.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey===b&&(a.metaKey=a.ctrlKey);return h.filter?h.filter(a,g):a},special:{ready:{setup:f.bindReady},load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=f.extend(new f.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?f.event.trigger(e,null,b):f.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},f.event.handle=f.event.dispatch,f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!(this instanceof f.Event))return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?K:J):this.type=a,b&&f.extend(this,b),this.timeStamp=a&&a.timeStamp||f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=K;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=K;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=K,this.stopPropagation()},isDefaultPrevented:J,isPropagationStopped:J,isImmediatePropagationStopped:J},f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c=this,d=a.relatedTarget,e=a.handleObj,g=e.selector,h;if(!d||d!==c&&!f.contains(c,d))a.type=e.origType,h=e.handler.apply(this,arguments),a.type=b;return h}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(){if(f.nodeName(this,"form"))return!1;f.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=f.nodeName(c,"input")||f.nodeName(c,"button")?c.form:b;d&&!d._submit_attached&&(f.event.add(d,"submit._submit",function(a){this.parentNode&&!a.isTrigger&&f.event.simulate("submit",this.parentNode,a,!0)}),d._submit_attached=!0)})},teardown:function(){if(f.nodeName(this,"form"))return!1;f.event.remove(this,"._submit")}}),f.support.changeBubbles||(f.event.special.change={setup:function(){if(z.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")f.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),f.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1,f.event.simulate("change",this,a,!0))});return!1}f.event.add(this,"beforeactivate._change",function(a){var b=a.target;z.test(b.nodeName)&&!b._change_attached&&(f.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&f.event.simulate("change",this.parentNode,a,!0)}),b._change_attached=!0)})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){f.event.remove(this,"._change");return z.test(this.nodeName)}}),f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){var d=0,e=function(a){f.event.simulate(b,a.target,f.event.fix(a),!0)};f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.fn.extend({on:function(a,c,d,e,g){var h,i;if(typeof a=="object"){typeof c!="string"&&(d=c,c=b);for(i in a)this.on(i,c,d,a[i],g);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=J;else if(!e)return this;g===1&&(h=e,e=function(a){f().off(a);return h.apply(this,arguments)},e.guid=h.guid||(h.guid=f.guid++));return this.each(function(){f.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on.call(this,a,b,c,d,1)},off:function(a,c,d){if(a&&a.preventDefault&&a.handleObj){var e=a.handleObj;f(a.delegateTarget).off(e.namespace?e.type+"."+e.namespace:e.type,e.selector,e.handler);return this}if(typeof a=="object"){for(var g in a)this.off(g,c,a[g]);return this}if(c===!1||typeof c=="function")d=c,c=b;d===!1&&(d=J);return this.each(function(){f.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){f(this.context).on(a,this.selector,b,c);return this},die:function(a,b){f(this.context).off(a,this.selector||"**",b);return this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length==1?this.off(a,"**"):this.off(b,a,c)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f._data(this,"lastToggle"+a.guid)||0)%d;f._data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.on(b,null,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0),C.test(b)&&(f.event.fixHooks[b]=f.event.keyHooks),D.test(b)&&(f.event.fixHooks[b]=f.event.mouseHooks)}),function(){function x(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}if(j.nodeType===1){g||(j[d]=c,j.sizset=h);if(typeof b!="string"){if(j===b){k=!0;break}}else if(m.filter(b,[j]).length>0){k=j;break}}j=j[a]}e[h]=k}}}function w(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}j.nodeType===1&&!g&&(j[d]=c,j.sizset=h);if(j.nodeName.toLowerCase()===b){k=j;break}j=j[a]}e[h]=k}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d="sizcache"+(Math.random()+"").replace(".",""),e=0,g=Object.prototype.toString,h=!1,i=!0,j=/\\/g,k=/\r\n/g,l=/\W/;[0,0].sort(function(){i=!1;return 0});var m=function(b,d,e,f){e=e||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return e;var i,j,k,l,n,q,r,t,u=!0,v=m.isXML(d),w=[],x=b;do{a.exec(""),i=a.exec(x);if(i){x=i[3],w.push(i[1]);if(i[2]){l=i[3];break}}}while(i);if(w.length>1&&p.exec(b))if(w.length===2&&o.relative[w[0]])j=y(w[0]+w[1],d,f);else{j=o.relative[w[0]]?[d]:m(w.shift(),d);while(w.length)b=w.shift(),o.relative[b]&&(b+=w.shift()),j=y(b,j,f)}else{!f&&w.length>1&&d.nodeType===9&&!v&&o.match.ID.test(w[0])&&!o.match.ID.test(w[w.length-1])&&(n=m.find(w.shift(),d,v),d=n.expr?m.filter(n.expr,n.set)[0]:n.set[0]);if(d){n=f?{expr:w.pop(),set:s(f)}:m.find(w.pop(),w.length===1&&(w[0]==="~"||w[0]==="+")&&d.parentNode?d.parentNode:d,v),j=n.expr?m.filter(n.expr,n.set):n.set,w.length>0?k=s(j):u=!1;while(w.length)q=w.pop(),r=q,o.relative[q]?r=w.pop():q="",r==null&&(r=d),o.relative[q](k,r,v)}else k=w=[]}k||(k=j),k||m.error(q||b);if(g.call(k)==="[object Array]")if(!u)e.push.apply(e,k);else if(d&&d.nodeType===1)for(t=0;k[t]!=null;t++)k[t]&&(k[t]===!0||k[t].nodeType===1&&m.contains(d,k[t]))&&e.push(j[t]);else for(t=0;k[t]!=null;t++)k[t]&&k[t].nodeType===1&&e.push(j[t]);else s(k,e);l&&(m(l,h,e,f),m.uniqueSort(e));return e};m.uniqueSort=function(a){if(u){h=i,a.sort(u);if(h)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},m.matches=function(a,b){return m(a,null,null,b)},m.matchesSelector=function(a,b){return m(b,null,null,[a]).length>0},m.find=function(a,b,c){var d,e,f,g,h,i;if(!a)return[];for(e=0,f=o.order.length;e<f;e++){h=o.order[e];if(g=o.leftMatch[h].exec(a)){i=g[1],g.splice(1,1);if(i.substr(i.length-1)!=="\\"){g[1]=(g[1]||"").replace(j,""),d=o.find[h](g,b,c);if(d!=null){a=a.replace(o.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},m.filter=function(a,c,d,e){var f,g,h,i,j,k,l,n,p,q=a,r=[],s=c,t=c&&c[0]&&m.isXML(c[0]);while(a&&c.length){for(h in o.filter)if((f=o.leftMatch[h].exec(a))!=null&&f[2]){k=o.filter[h],l=f[1],g=!1,f.splice(1,1);if(l.substr(l.length-1)==="\\")continue;s===r&&(r=[]);if(o.preFilter[h]){f=o.preFilter[h](f,s,d,r,e,t);if(!f)g=i=!0;else if(f===!0)continue}if(f)for(n=0;(j=s[n])!=null;n++)j&&(i=k(j,f,n,s),p=e^i,d&&i!=null?p?g=!0:s[n]=!1:p&&(r.push(j),g=!0));if(i!==b){d||(s=r),a=a.replace(o.match[h],"");if(!g)return[];break}}if(a===q)if(g==null)m.error(a);else break;q=a}return s},m.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)};var n=m.getText=function(a){var b,c,d=a.nodeType,e="";if(d){if(d===1||d===9){if(typeof a.textContent=="string")return a.textContent;if(typeof a.innerText=="string")return a.innerText.replace(k,"");for(a=a.firstChild;a;a=a.nextSibling)e+=n(a)}else if(d===3||d===4)return a.nodeValue}else for(b=0;c=a[b];b++)c.nodeType!==8&&(e+=n(c));return e},o=m.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!l.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&m.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!l.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&m.filter(b,a,!0)}},"":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("parentNode",b,f,a,d,c)},"~":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("previousSibling",b,f,a,d,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(j,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(j,"")},TAG:function(a,b){return a[1].replace(j,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||m.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&m.error(a[0]);a[0]=e++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(j,"");!f&&o.attrMap[g]&&(a[1]=o.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(j,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=m(b[3],null,null,c);else{var g=m.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(o.match.POS.test(b[0])||o.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!m(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=o.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||n([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}m.error(e)},CHILD:function(a,b){var c,e,f,g,h,i,j,k=b[1],l=a;switch(k){case"only":case"first":while(l=l.previousSibling)if(l.nodeType===1)return!1;if(k==="first")return!0;l=a;case"last":while(l=l.nextSibling)if(l.nodeType===1)return!1;return!0;case"nth":c=b[2],e=b[3];if(c===1&&e===0)return!0;f=b[0],g=a.parentNode;if(g&&(g[d]!==f||!a.nodeIndex)){i=0;for(l=g.firstChild;l;l=l.nextSibling)l.nodeType===1&&(l.nodeIndex=++i);g[d]=f}j=a.nodeIndex-e;return c===0?j===0:j%c===0&&j/c>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||!!a.nodeName&&a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=m.attr?m.attr(a,c):o.attrHandle[c]?o.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":!f&&m.attr?d!=null:f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=o.setFilters[e];if(f)return f(a,c,b,d)}}},p=o.match.POS,q=function(a,b){return"\\"+(b-0+1)};for(var r in o.match)o.match[r]=new RegExp(o.match[r].source+/(?![^\[]*\])(?![^\(]*\))/.source),o.leftMatch[r]=new RegExp(/(^(?:.|\r|\n)*?)/.source+o.match[r].source.replace(/\\(\d+)/g,q));var s=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(t){s=function(a,b){var c=0,d=b||[];if(g.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var e=a.length;c<e;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var u,v;c.documentElement.compareDocumentPosition?u=function(a,b){if(a===b){h=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(u=function(a,b){if(a===b){h=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,i=b.parentNode,j=g;if(g===i)return v(a,b);if(!g)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return v(e[k],f[k]);return k===c?v(a,f[k],-1):v(e[k],b,1)},v=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(o.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},o.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(o.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(o.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=m,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){m=function(b,e,f,g){e=e||c;if(!g&&!m.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return s(e.getElementsByTagName(b),f);if(h[2]&&o.find.CLASS&&e.getElementsByClassName)return s(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return s([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return s([],f);if(i.id===h[3])return s([i],f)}try{return s(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var k=e,l=e.getAttribute("id"),n=l||d,p=e.parentNode,q=/^\s*[+~]/.test(b);l?n=n.replace(/'/g,"\\$&"):e.setAttribute("id",n),q&&p&&(e=e.parentNode);try{if(!q||p)return s(e.querySelectorAll("[id='"+n+"'] "+b),f)}catch(r){}finally{l||k.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)m[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}m.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!m.isXML(a))try{if(e||!o.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return m(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;o.order.splice(1,0,"CLASS"),o.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?m.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?m.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:m.contains=function(){return!1},m.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var y=function(a,b,c){var d,e=[],f="",g=b.nodeType?[b]:b;while(d=o.match.PSEUDO.exec(a))f+=d[0],a=a.replace(o.match.PSEUDO,"");a=o.relative[a]?a+"*":a;for(var h=0,i=g.length;h<i;h++)m(a,g[h],e,c);return m.filter(f,e)};m.attr=f.attr,m.selectors.attrMap={},f.find=m,f.expr=m.selectors,f.expr[":"]=f.expr.filters,f.unique=m.uniqueSort,f.text=m.getText,f.isXMLDoc=m.isXML,f.contains=m.contains}();var L=/Until$/,M=/^(?:parents|prevUntil|prevAll)/,N=/,/,O=/^.[^:#\[\.,]*$/,P=Array.prototype.slice,Q=f.expr.match.POS,R={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(T(this,a,!1),"not",a)},filter:function(a){return this.pushStack(T(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?Q.test(a)?f(a,this.context).index(this[0])>=0:f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h=1;while(g&&g.ownerDocument&&g!==b){for(d=0;d<a.length;d++)f(g).is(a[d])&&c.push({selector:a[d],elem:g,level:h});g=g.parentNode,h++}return c}var i=Q.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(i?i.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a)return this[0]&&this[0].parentNode?this.prevAll().length:-1;if(typeof a=="string")return f.inArray(this[0],f(a));return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(S(c[0])||S(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling(a.parentNode.firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c);L.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!R[a]?f.unique(e):e,(this.length>1||N.test(d))&&M.test(a)&&(e=e.reverse());return this.pushStack(e,a,P.call(arguments).join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var V="abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",W=/ jQuery\d+="(?:\d+|null)"/g,X=/^\s+/,Y=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Z=/<([\w:]+)/,$=/<tbody/i,_=/<|&#?\w+;/,ba=/<(?:script|style)/i,bb=/<(?:script|object|embed|option|style)/i,bc=new RegExp("<(?:"+V+")","i"),bd=/checked\s*(?:[^=]|=\s*.checked.)/i,be=/\/(java|ecma)script/i,bf=/^\s*<!(?:\[CDATA\[|\-\-)/,bg={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bh=U(c);bg.optgroup=bg.option,bg.tbody=bg.tfoot=bg.colgroup=bg.caption=bg.thead,bg.th=bg.td,f.support.htmlSerialize||(bg._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){if(f.isFunction(a))return this.each(function(b){var c=f(this);c.text(a.call(this,b,c.text()))});if(typeof a!="object"&&a!==b)return this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a));return f.text(this)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=f.isFunction(a);return this.each(function(c){f(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f.clean(arguments);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f.clean(arguments));return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function()
{for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){if(a===b)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(W,""):null;if(typeof a=="string"&&!ba.test(a)&&(f.support.leadingWhitespace||!X.test(a))&&!bg[(Z.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Y,"<$1></$2>");try{for(var c=0,d=this.length;c<d;c++)this[c].nodeType===1&&(f.cleanData(this[c].getElementsByTagName("*")),this[c].innerHTML=a)}catch(e){this.empty().append(a)}}else f.isFunction(a)?this.each(function(b){var c=f(this);c.html(a.call(this,b,c.html()))}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bd.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bi(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,bp)}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i,j=a[0];b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof j=="string"&&j.length<512&&i===c&&j.charAt(0)==="<"&&!bb.test(j)&&(f.support.checkClone||!bd.test(j))&&(f.support.html5Clone||!bc.test(j))&&(g=!0,h=f.fragments[j],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[j]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d,e,g,h=f.support.html5Clone||!bc.test("<"+a.nodeName)?a.cloneNode(!0):bo(a);if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bk(a,h),d=bl(a),e=bl(h);for(g=0;d[g];++g)e[g]&&bk(d[g],e[g])}if(b){bj(a,h);if(c){d=bl(a),e=bl(h);for(g=0;d[g];++g)bj(d[g],e[g])}}d=e=null;return h},clean:function(a,b,d,e){var g;b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);var h=[],i;for(var j=0,k;(k=a[j])!=null;j++){typeof k=="number"&&(k+="");if(!k)continue;if(typeof k=="string")if(!_.test(k))k=b.createTextNode(k);else{k=k.replace(Y,"<$1></$2>");var l=(Z.exec(k)||["",""])[1].toLowerCase(),m=bg[l]||bg._default,n=m[0],o=b.createElement("div");b===c?bh.appendChild(o):U(b).appendChild(o),o.innerHTML=m[1]+k+m[2];while(n--)o=o.lastChild;if(!f.support.tbody){var p=$.test(k),q=l==="table"&&!p?o.firstChild&&o.firstChild.childNodes:m[1]==="<table>"&&!p?o.childNodes:[];for(i=q.length-1;i>=0;--i)f.nodeName(q[i],"tbody")&&!q[i].childNodes.length&&q[i].parentNode.removeChild(q[i])}!f.support.leadingWhitespace&&X.test(k)&&o.insertBefore(b.createTextNode(X.exec(k)[0]),o.firstChild),k=o.childNodes}var r;if(!f.support.appendChecked)if(k[0]&&typeof (r=k.length)=="number")for(i=0;i<r;i++)bn(k[i]);else bn(k);k.nodeType?h.push(k):h=f.merge(h,k)}if(d){g=function(a){return!a.type||be.test(a.type)};for(j=0;h[j];j++)if(e&&f.nodeName(h[j],"script")&&(!h[j].type||h[j].type.toLowerCase()==="text/javascript"))e.push(h[j].parentNode?h[j].parentNode.removeChild(h[j]):h[j]);else{if(h[j].nodeType===1){var s=f.grep(h[j].getElementsByTagName("script"),g);h.splice.apply(h,[j+1,0].concat(s))}d.appendChild(h[j])}}return h},cleanData:function(a){var b,c,d=f.cache,e=f.event.special,g=f.support.deleteExpando;for(var h=0,i;(i=a[h])!=null;h++){if(i.nodeName&&f.noData[i.nodeName.toLowerCase()])continue;c=i[f.expando];if(c){b=d[c];if(b&&b.events){for(var j in b.events)e[j]?f.event.remove(i,j):f.removeEvent(i,j,b.handle);b.handle&&(b.handle.elem=null)}g?delete i[f.expando]:i.removeAttribute&&i.removeAttribute(f.expando),delete d[c]}}}});var bq=/alpha\([^)]*\)/i,br=/opacity=([^)]*)/,bs=/([A-Z]|^ms)/g,bt=/^-?\d+(?:px)?$/i,bu=/^-?\d/,bv=/^([\-+])=([\-+.\de]+)/,bw={position:"absolute",visibility:"hidden",display:"block"},bx=["Left","Right"],by=["Top","Bottom"],bz,bA,bB;f.fn.css=function(a,c){if(arguments.length===2&&c===b)return this;return f.access(this,a,c,!0,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)})},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bz(a,"opacity","opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d,h==="string"&&(g=bv.exec(d))&&(d=+(g[1]+1)*+g[2]+parseFloat(f.css(a,c)),h="number");if(d==null||h==="number"&&isNaN(d))return;h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(bz)return bz(a,c)},swap:function(a,b,c){var d={};for(var e in b)d[e]=a.style[e],a.style[e]=b[e];c.call(a);for(e in b)a.style[e]=d[e]}}),f.curCSS=f.css,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){var e;if(c){if(a.offsetWidth!==0)return bC(a,b,d);f.swap(a,bw,function(){e=bC(a,b,d)});return e}},set:function(a,b){if(!bt.test(b))return b;b=parseFloat(b);if(b>=0)return b+"px"}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return br.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=f.isNumeric(b)?"alpha(opacity="+b*100+")":"",g=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&f.trim(g.replace(bq,""))===""){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bq.test(g)?g.replace(bq,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){var c;f.swap(a,{display:"inline-block"},function(){b?c=bz(a,"margin-right","marginRight"):c=a.style.marginRight});return c}})}),c.defaultView&&c.defaultView.getComputedStyle&&(bA=function(a,b){var c,d,e;b=b.replace(bs,"-$1").toLowerCase(),(d=a.ownerDocument.defaultView)&&(e=d.getComputedStyle(a,null))&&(c=e.getPropertyValue(b),c===""&&!f.contains(a.ownerDocument.documentElement,a)&&(c=f.style(a,b)));return c}),c.documentElement.currentStyle&&(bB=function(a,b){var c,d,e,f=a.currentStyle&&a.currentStyle[b],g=a.style;f===null&&g&&(e=g[b])&&(f=e),!bt.test(f)&&bu.test(f)&&(c=g.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),g.left=b==="fontSize"?"1em":f||0,f=g.pixelLeft+"px",g.left=c,d&&(a.runtimeStyle.left=d));return f===""?"auto":f}),bz=bA||bB,f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style&&a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)});var bD=/%20/g,bE=/\[\]$/,bF=/\r?\n/g,bG=/#.*$/,bH=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bI=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bJ=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,bK=/^(?:GET|HEAD)$/,bL=/^\/\//,bM=/\?/,bN=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bO=/^(?:select|textarea)/i,bP=/\s+/,bQ=/([?&])_=[^&]*/,bR=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bS=f.fn.load,bT={},bU={},bV,bW,bX=["*/"]+["*"];try{bV=e.href}catch(bY){bV=c.createElement("a"),bV.href="",bV=bV.href}bW=bR.exec(bV.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bS)return bS.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bN,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bO.test(this.nodeName)||bI.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bF,"\r\n")}}):{name:b.name,value:c.replace(bF,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.on(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?b_(a,f.ajaxSettings):(b=a,a=f.ajaxSettings),b_(a,b);return a},ajaxSettings:{url:bV,isLocal:bJ.test(bW[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":bX},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:bZ(bT),ajaxTransport:bZ(bU),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a>0?4:0;var o,r,u,w=c,x=l?cb(d,v,l):b,y,z;if(a>=200&&a<300||a===304){if(d.ifModified){if(y=v.getResponseHeader("Last-Modified"))f.lastModified[k]=y;if(z=v.getResponseHeader("Etag"))f.etag[k]=z}if(a===304)w="notmodified",o=!0;else try{r=cc(d,x),w="success",o=!0}catch(A){w="parsererror",u=A}}else{u=w;if(!w||a)w="error",a<0&&(a=0)}v.status=a,v.statusText=""+(c||w),o?h.resolveWith(e,[r,w,v]):h.rejectWith(e,[v,w,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.fireWith(e,[v,w]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f.Callbacks("once memory"),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bH.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.add,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bG,"").replace(bL,bW[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bP),d.crossDomain==null&&(r=bR.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bW[1]&&r[2]==bW[2]&&(r[3]||(r[1]==="http:"?80:443))==(bW[3]||(bW[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),b$(bT,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bK.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bM.test(d.url)?"&":"?")+d.data,delete d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bQ,"$1_="+x);d.url=y+(y===d.url?(bM.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", "+bX+"; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=b$(bU,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){if(s<2)w(-1,z);else throw z}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)ca(g,a[g],c,e);return d.join("&").replace(bD,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var cd=f.now(),ce=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+cd++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=b.contentType==="application/x-www-form-urlencoded"&&typeof b.data=="string";if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(ce.test(b.url)||e&&ce.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(ce,l),b.url===j&&(e&&(k=k.replace(ce,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var cf=a.ActiveXObject?function(){for(var a in ch)ch[a](0,1)}:!1,cg=0,ch;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ci()||cj()}:ci,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,cf&&delete ch[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n),m.text=h.responseText;try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cg,cf&&(ch||(ch={},f(a).unload(cf)),ch[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var ck={},cl,cm,cn=/^(?:toggle|show|hide)$/,co=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,cp,cq=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cr;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(cu("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),e===""&&f.css(d,"display")==="none"&&f._data(d,"olddisplay",cv(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(cu("hide",3),a,b,c);var d,e,g=0,h=this.length;for(;g<h;g++)d=this[g],d.style&&(e=f.css(d,"display"),e!=="none"&&!f._data(d,"olddisplay")&&f._data(d,"olddisplay",e));for(g=0;g<h;g++)this[g].style&&(this[g].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(cu("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){function g(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]),h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(!f.support.inlineBlockNeedsLayout||cv(this.nodeName)==="inline"?this.style.display="inline-block":this.style.zoom=1))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)j=new f.fx(this,b,i),h=a[i],cn.test(h)?(o=f._data(this,"toggle"+i)||(h==="toggle"?d?"show":"hide":0),o?(f._data(this,"toggle"+i,o==="show"?"hide":"show"),j[o]()):j[h]()):(k=co.exec(h),l=j.cur(),k?(m=parseFloat(k[2]),n=k[3]||(f.cssNumber[i]?"":"px"),n!=="px"&&(f.style(this,i,(m||1)+n),l=(m||1)/j.cur()*l,f.style(this,i,l+n)),k[1]&&(m=(k[1]==="-="?-1:1)*m+l),j.custom(l,m,n)):j.custom(l,h,""));return!0}var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return e.queue===!1?this.each(g):this.queue(e.queue,g)},stop:function(a,c,d){typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]);return this.each(function(){function h(a,b,c){var e=b[c];f.removeData(a,c,!0),e.stop(d)}var b,c=!1,e=f.timers,g=f._data(this);d||f._unmark(!0,this);if(a==null)for(b in g)g[b]&&g[b].stop&&b.indexOf(".run")===b.length-4&&h(this,g,b);else g[b=a+".run"]&&g[b].stop&&h(this,g,b);for(b=e.length;b--;)e[b].elem===this&&(a==null||e[b].queue===a)&&(d?e[b](!0):e[b].saveState(),c=!0,e.splice(b,1));(!d||!c)&&f.dequeue(this,a)})}}),f.each({slideDown:cu("show",1),slideUp:cu("hide",1),slideToggle:cu("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue?f.dequeue(this,d.queue):a!==!1&&f._unmark(this)};return d},easing:{linear:function(a,b,c,d){return c+d*a},swing:function(a,b,c,d){return(-Math.cos(a*Math.PI)/2+.5)*d+c}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,c,d){function h(a){return e.step(a)}var e=this,g=f.fx;this.startTime=cr||cs(),this.end=c,this.now=this.start=a,this.pos=this.state=0,this.unit=d||this.unit||(f.cssNumber[this.prop]?"":"px"),h.queue=this.options.queue,h.elem=this.elem,h.saveState=function(){e.options.hide&&f._data(e.elem,"fxshow"+e.prop)===b&&f._data(e.elem,"fxshow"+e.prop,e.start)},h()&&f.timers.push(h)&&!cp&&(cp=setInterval(g.tick,g.interval))},show:function(){var a=f._data(this.elem,"fxshow"+this.prop);this.options.orig[this.prop]=a||f.style(this.elem,this.prop),this.options.show=!0,a!==b?this.custom(this.cur(),a):this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f._data(this.elem,"fxshow"+this.prop)||f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b,c,d,e=cr||cs(),g=!0,h=this.elem,i=this.options;if(a||e>=i.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),i.animatedProperties[this.prop]=!0;for(b in i.animatedProperties)i.animatedProperties[b]!==!0&&(g=!1);if(g){i.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){h.style["overflow"+b]=i.overflow[a]}),i.hide&&f(h).hide();if(i.hide||i.show)for(b in i.animatedProperties)f.style(h,b,i.orig[b]),f.removeData(h,"fxshow"+b,!0),f.removeData(h,"toggle"+b,!0);d=i.complete,d&&(i.complete=!1,d.call(h))}return!1}i.duration==Infinity?this.now=e:(c=e-this.startTime,this.state=c/i.duration,this.pos=f.easing[i.animatedProperties[this.prop]](this.state,c,0,1,i.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){var a,b=f.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||f.fx.stop()},interval:13,stop:function(){clearInterval(cp),cp=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=a.now+a.unit:a.elem[a.prop]=a.now}}}),f.each(["width","height"],function(a,b){f.fx.step[b]=function(a){f.style(a.elem,b,Math.max(0,a.now)+a.unit)}}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cw=/^t(?:able|d|h)$/i,cx=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?f.fn.offset=function(a){var b=this[0],c;if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);try{c=b.getBoundingClientRect()}catch(d){}var e=b.ownerDocument,g=e.documentElement;if(!c||!f.contains(g,b))return c?{top:c.top,left:c.left}:{top:0,left:0};var h=e.body,i=cy(e),j=g.clientTop||h.clientTop||0,k=g.clientLeft||h.clientLeft||0,l=i.pageYOffset||f.support.boxModel&&g.scrollTop||h.scrollTop,m=i.pageXOffset||f.support.boxModel&&g.scrollLeft||h.scrollLeft,n=c.top+l-j,o=c.left+m-k;return{top:n,left:o}}:f.fn.offset=function(a){var b=this[0];if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);var c,d=b.offsetParent,e=b,g=b.ownerDocument,h=g.documentElement,i=g.body,j=g.defaultView,k=j?j.getComputedStyle(b,null):b.currentStyle,l=b.offsetTop,m=b.offsetLeft;while((b=b.parentNode)&&b!==i&&b!==h){if(f.support.fixedPosition&&k.position==="fixed")break;c=j?j.getComputedStyle(b,null):b.currentStyle,l-=b.scrollTop,m-=b.scrollLeft,b===d&&(l+=b.offsetTop,m+=b.offsetLeft,f.support.doesNotAddBorder&&(!f.support.doesAddBorderForTableAndCells||!cw.test(b.nodeName))&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),e=d,d=b.offsetParent),f.support.subtractsBorderForOverflowNotVisible&&c.overflow!=="visible"&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),k=c}if(k.position==="relative"||k.position==="static")l+=i.offsetTop,m+=i.offsetLeft;f.support.fixedPosition&&k.position==="fixed"&&(l+=Math.max(h.scrollTop,i.scrollTop),m+=Math.max(h.scrollLeft,i.scrollLeft));return{top:l,left:m}},f.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=cx.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!cx.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each(["Left","Top"],function(a,c){var d="scroll"+c;f.fn[d]=function(c){var e,g;if(c===b){e=this[0];if(!e)return null;g=cy(e);return g?"pageXOffset"in g?g[a?"pageYOffset":"pageXOffset"]:f.support.boxModel&&g.document.documentElement[d]||g.document.body[d]:e[d]}return this.each(function(){g=cy(this),g?g.scrollTo(a?f(g).scrollLeft():c,a?c:f(g).scrollTop()):this[d]=c})}}),f.each(["Height","Width"],function(a,c){var d=c.toLowerCase();f.fn["inner"+c]=function(){var a=this[0];return a?a.style?parseFloat(f.css(a,d,"padding")):this[d]():null},f.fn["outer"+c]=function(a){var b=this[0];return b?b.style?parseFloat(f.css(b,d,a?"margin":"border")):this[d]():null},f.fn[d]=function(a){var e=this[0];if(!e)return a==null?null:this;if(f.isFunction(a))return this.each(function(b){var c=f(this);c[d](a.call(this,b,c[d]()))});if(f.isWindow(e)){var g=e.document.documentElement["client"+c],h=e.document.body;return e.document.compatMode==="CSS1Compat"&&g||h&&h["client"+c]||g}if(e.nodeType===9)return Math.max(e.documentElement["client"+c],e.body["scroll"+c],e.documentElement["scroll"+c],e.body["offset"+c],e.documentElement["offset"+c]);if(a===b){var i=f.css(e,d),j=parseFloat(i);return f.isNumeric(j)?j:i}return this.css(d,typeof a=="string"?a:a+"px")}}),a.jQuery=a.$=f,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return f})})(window);

/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.core.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){function c(b,c){var e=b.nodeName.toLowerCase();if("area"===e){var f=b.parentNode,g=f.name,h;return!b.href||!g||f.nodeName.toLowerCase()!=="map"?!1:(h=a("img[usemap=#"+g+"]")[0],!!h&&d(h))}return(/input|select|textarea|button|object/.test(e)?!b.disabled:"a"==e?b.href||c:c)&&d(b)}function d(b){return!a(b).parents().andSelf().filter(function(){return a.curCSS(this,"visibility")==="hidden"||a.expr.filters.hidden(this)}).length}a.ui=a.ui||{};if(a.ui.version)return;a.extend(a.ui,{version:"1.8.20",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}}),a.fn.extend({propAttr:a.fn.prop||a.fn.attr,_focus:a.fn.focus,focus:function(b,c){return typeof b=="number"?this.each(function(){var d=this;setTimeout(function(){a(d).focus(),c&&c.call(d)},b)}):this._focus.apply(this,arguments)},scrollParent:function(){var b;return a.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?b=this.parents().filter(function(){return/(relative|absolute|fixed)/.test(a.curCSS(this,"position",1))&&/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0):b=this.parents().filter(function(){return/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0),/fixed/.test(this.css("position"))||!b.length?a(document):b},zIndex:function(c){if(c!==b)return this.css("zIndex",c);if(this.length){var d=a(this[0]),e,f;while(d.length&&d[0]!==document){e=d.css("position");if(e==="absolute"||e==="relative"||e==="fixed"){f=parseInt(d.css("zIndex"),10);if(!isNaN(f)&&f!==0)return f}d=d.parent()}}return 0},disableSelection:function(){return this.bind((a.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(a){a.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),a.each(["Width","Height"],function(c,d){function h(b,c,d,f){return a.each(e,function(){c-=parseFloat(a.curCSS(b,"padding"+this,!0))||0,d&&(c-=parseFloat(a.curCSS(b,"border"+this+"Width",!0))||0),f&&(c-=parseFloat(a.curCSS(b,"margin"+this,!0))||0)}),c}var e=d==="Width"?["Left","Right"]:["Top","Bottom"],f=d.toLowerCase(),g={innerWidth:a.fn.innerWidth,innerHeight:a.fn.innerHeight,outerWidth:a.fn.outerWidth,outerHeight:a.fn.outerHeight};a.fn["inner"+d]=function(c){return c===b?g["inner"+d].call(this):this.each(function(){a(this).css(f,h(this,c)+"px")})},a.fn["outer"+d]=function(b,c){return typeof b!="number"?g["outer"+d].call(this,b):this.each(function(){a(this).css(f,h(this,b,!0,c)+"px")})}}),a.extend(a.expr[":"],{data:function(b,c,d){return!!a.data(b,d[3])},focusable:function(b){return c(b,!isNaN(a.attr(b,"tabindex")))},tabbable:function(b){var d=a.attr(b,"tabindex"),e=isNaN(d);return(e||d>=0)&&c(b,!e)}}),a(function(){var b=document.body,c=b.appendChild(c=document.createElement("div"));c.offsetHeight,a.extend(c.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0}),a.support.minHeight=c.offsetHeight===100,a.support.selectstart="onselectstart"in c,b.removeChild(c).style.display="none"}),a.extend(a.ui,{plugin:{add:function(b,c,d){var e=a.ui[b].prototype;for(var f in d)e.plugins[f]=e.plugins[f]||[],e.plugins[f].push([c,d[f]])},call:function(a,b,c){var d=a.plugins[b];if(!d||!a.element[0].parentNode)return;for(var e=0;e<d.length;e++)a.options[d[e][0]]&&d[e][1].apply(a.element,c)}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)},hasScroll:function(b,c){if(a(b).css("overflow")==="hidden")return!1;var d=c&&c==="left"?"scrollLeft":"scrollTop",e=!1;return b[d]>0?!0:(b[d]=1,e=b[d]>0,b[d]=0,e)},isOverAxis:function(a,b,c){return a>b&&a<b+c},isOver:function(b,c,d,e,f,g){return a.ui.isOverAxis(b,d,f)&&a.ui.isOverAxis(c,e,g)}})})(jQuery);;/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.widget.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){if(a.cleanData){var c=a.cleanData;a.cleanData=function(b){for(var d=0,e;(e=b[d])!=null;d++)try{a(e).triggerHandler("remove")}catch(f){}c(b)}}else{var d=a.fn.remove;a.fn.remove=function(b,c){return this.each(function(){return c||(!b||a.filter(b,[this]).length)&&a("*",this).add([this]).each(function(){try{a(this).triggerHandler("remove")}catch(b){}}),d.call(a(this),b,c)})}}a.widget=function(b,c,d){var e=b.split(".")[0],f;b=b.split(".")[1],f=e+"-"+b,d||(d=c,c=a.Widget),a.expr[":"][f]=function(c){return!!a.data(c,b)},a[e]=a[e]||{},a[e][b]=function(a,b){arguments.length&&this._createWidget(a,b)};var g=new c;g.options=a.extend(!0,{},g.options),a[e][b].prototype=a.extend(!0,g,{namespace:e,widgetName:b,widgetEventPrefix:a[e][b].prototype.widgetEventPrefix||b,widgetBaseClass:f},d),a.widget.bridge(b,a[e][b])},a.widget.bridge=function(c,d){a.fn[c]=function(e){var f=typeof e=="string",g=Array.prototype.slice.call(arguments,1),h=this;return e=!f&&g.length?a.extend.apply(null,[!0,e].concat(g)):e,f&&e.charAt(0)==="_"?h:(f?this.each(function(){var d=a.data(this,c),f=d&&a.isFunction(d[e])?d[e].apply(d,g):d;if(f!==d&&f!==b)return h=f,!1}):this.each(function(){var b=a.data(this,c);b?b.option(e||{})._init():a.data(this,c,new d(e,this))}),h)}},a.Widget=function(a,b){arguments.length&&this._createWidget(a,b)},a.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:!1},_createWidget:function(b,c){a.data(c,this.widgetName,this),this.element=a(c),this.options=a.extend(!0,{},this.options,this._getCreateOptions(),b);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy()}),this._create(),this._trigger("create"),this._init()},_getCreateOptions:function(){return a.metadata&&a.metadata.get(this.element[0])[this.widgetName]},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName),this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled "+"ui-state-disabled")},widget:function(){return this.element},option:function(c,d){var e=c;if(arguments.length===0)return a.extend({},this.options);if(typeof c=="string"){if(d===b)return this.options[c];e={},e[c]=d}return this._setOptions(e),this},_setOptions:function(b){var c=this;return a.each(b,function(a,b){c._setOption(a,b)}),this},_setOption:function(a,b){return this.options[a]=b,a==="disabled"&&this.widget()[b?"addClass":"removeClass"](this.widgetBaseClass+"-disabled"+" "+"ui-state-disabled").attr("aria-disabled",b),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_trigger:function(b,c,d){var e,f,g=this.options[b];d=d||{},c=a.Event(c),c.type=(b===this.widgetEventPrefix?b:this.widgetEventPrefix+b).toLowerCase(),c.target=this.element[0],f=c.originalEvent;if(f)for(e in f)e in c||(c[e]=f[e]);return this.element.trigger(c,d),!(a.isFunction(g)&&g.call(this.element[0],c,d)===!1||c.isDefaultPrevented())}}})(jQuery);;/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.mouse.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){var c=!1;a(document).mouseup(function(a){c=!1}),a.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var b=this;this.element.bind("mousedown."+this.widgetName,function(a){return b._mouseDown(a)}).bind("click."+this.widgetName,function(c){if(!0===a.data(c.target,b.widgetName+".preventClickEvent"))return a.removeData(c.target,b.widgetName+".preventClickEvent"),c.stopImmediatePropagation(),!1}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),a(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(b){if(c)return;this._mouseStarted&&this._mouseUp(b),this._mouseDownEvent=b;var d=this,e=b.which==1,f=typeof this.options.cancel=="string"&&b.target.nodeName?a(b.target).closest(this.options.cancel).length:!1;if(!e||f||!this._mouseCapture(b))return!0;this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){d.mouseDelayMet=!0},this.options.delay));if(this._mouseDistanceMet(b)&&this._mouseDelayMet(b)){this._mouseStarted=this._mouseStart(b)!==!1;if(!this._mouseStarted)return b.preventDefault(),!0}return!0===a.data(b.target,this.widgetName+".preventClickEvent")&&a.removeData(b.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(a){return d._mouseMove(a)},this._mouseUpDelegate=function(a){return d._mouseUp(a)},a(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),b.preventDefault(),c=!0,!0},_mouseMove:function(b){return!a.browser.msie||document.documentMode>=9||!!b.button?this._mouseStarted?(this._mouseDrag(b),b.preventDefault()):(this._mouseDistanceMet(b)&&this._mouseDelayMet(b)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,b)!==!1,this._mouseStarted?this._mouseDrag(b):this._mouseUp(b)),!this._mouseStarted):this._mouseUp(b)},_mouseUp:function(b){return a(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,b.target==this._mouseDownEvent.target&&a.data(b.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(b)),!1},_mouseDistanceMet:function(a){return Math.max(Math.abs(this._mouseDownEvent.pageX-a.pageX),Math.abs(this._mouseDownEvent.pageY-a.pageY))>=this.options.distance},_mouseDelayMet:function(a){return this.mouseDelayMet},_mouseStart:function(a){},_mouseDrag:function(a){},_mouseStop:function(a){},_mouseCapture:function(a){return!0}})})(jQuery);;/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.draggable.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.widget("ui.draggable",a.ui.mouse,{widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1},_create:function(){this.options.helper=="original"&&!/^(?:r|a|f)/.test(this.element.css("position"))&&(this.element[0].style.position="relative"),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._mouseInit()},destroy:function(){if(!this.element.data("draggable"))return;return this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._mouseDestroy(),this},_mouseCapture:function(b){var c=this.options;return this.helper||c.disabled||a(b.target).is(".ui-resizable-handle")?!1:(this.handle=this._getHandle(b),this.handle?(c.iframeFix&&a(c.iframeFix===!0?"iframe":c.iframeFix).each(function(){a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1e3}).css(a(this).offset()).appendTo("body")}),!0):!1)},_mouseStart:function(b){var c=this.options;return this.helper=this._createHelper(b),this._cacheHelperProportions(),a.ui.ddmanager&&(a.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(),this.offset=this.positionAbs=this.element.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},a.extend(this.offset,{click:{left:b.pageX-this.offset.left,top:b.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.originalPosition=this.position=this._generatePosition(b),this.originalPageX=b.pageX,this.originalPageY=b.pageY,c.cursorAt&&this._adjustOffsetFromHelper(c.cursorAt),c.containment&&this._setContainment(),this._trigger("start",b)===!1?(this._clear(),!1):(this._cacheHelperProportions(),a.ui.ddmanager&&!c.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,b),this.helper.addClass("ui-draggable-dragging"),this._mouseDrag(b,!0),a.ui.ddmanager&&a.ui.ddmanager.dragStart(this,b),!0)},_mouseDrag:function(b,c){this.position=this._generatePosition(b),this.positionAbs=this._convertPositionTo("absolute");if(!c){var d=this._uiHash();if(this._trigger("drag",b,d)===!1)return this._mouseUp({}),!1;this.position=d.position}if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";return a.ui.ddmanager&&a.ui.ddmanager.drag(this,b),!1},_mouseStop:function(b){var c=!1;a.ui.ddmanager&&!this.options.dropBehaviour&&(c=a.ui.ddmanager.drop(this,b)),this.dropped&&(c=this.dropped,this.dropped=!1);var d=this.element[0],e=!1;while(d&&(d=d.parentNode))d==document&&(e=!0);if(!e&&this.options.helper==="original")return!1;if(this.options.revert=="invalid"&&!c||this.options.revert=="valid"&&c||this.options.revert===!0||a.isFunction(this.options.revert)&&this.options.revert.call(this.element,c)){var f=this;a(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){f._trigger("stop",b)!==!1&&f._clear()})}else this._trigger("stop",b)!==!1&&this._clear();return!1},_mouseUp:function(b){return this.options.iframeFix===!0&&a("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)}),a.ui.ddmanager&&a.ui.ddmanager.dragStop(this,b),a.ui.mouse.prototype._mouseUp.call(this,b)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),this},_getHandle:function(b){var c=!this.options.handle||!a(this.options.handle,this.element).length?!0:!1;return a(this.options.handle,this.element).find("*").andSelf().each(function(){this==b.target&&(c=!0)}),c},_createHelper:function(b){var c=this.options,d=a.isFunction(c.helper)?a(c.helper.apply(this.element[0],[b])):c.helper=="clone"?this.element.clone().removeAttr("id"):this.element;return d.parents("body").length||d.appendTo(c.appendTo=="parent"?this.element[0].parentNode:c.appendTo),d[0]!=this.element[0]&&!/(fixed|absolute)/.test(d.css("position"))&&d.css("position","absolute"),d},_adjustOffsetFromHelper:function(b){typeof b=="string"&&(b=b.split(" ")),a.isArray(b)&&(b={left:+b[0],top:+b[1]||0}),"left"in b&&(this.offset.click.left=b.left+this.margins.left),"right"in b&&(this.offset.click.left=this.helperProportions.width-b.right+this.margins.left),"top"in b&&(this.offset.click.top=b.top+this.margins.top),"bottom"in b&&(this.offset.click.top=this.helperProportions.height-b.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var b=this.offsetParent.offset();this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0])&&(b.left+=this.scrollParent.scrollLeft(),b.top+=this.scrollParent.scrollTop());if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&a.browser.msie)b={top:0,left:0};return{top:b.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:b.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var a=this.element.position();return{top:a.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var b=this.options;b.containment=="parent"&&(b.containment=this.helper[0].parentNode);if(b.containment=="document"||b.containment=="window")this.containment=[b.containment=="document"?0:a(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,b.containment=="document"?0:a(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,(b.containment=="document"?0:a(window).scrollLeft())+a(b.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(b.containment=="document"?0:a(window).scrollTop())+(a(b.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(b.containment)&&b.containment.constructor!=Array){var c=a(b.containment),d=c[0];if(!d)return;var e=c.offset(),f=a(d).css("overflow")!="hidden";this.containment=[(parseInt(a(d).css("borderLeftWidth"),10)||0)+(parseInt(a(d).css("paddingLeft"),10)||0),(parseInt(a(d).css("borderTopWidth"),10)||0)+(parseInt(a(d).css("paddingTop"),10)||0),(f?Math.max(d.scrollWidth,d.offsetWidth):d.offsetWidth)-(parseInt(a(d).css("borderLeftWidth"),10)||0)-(parseInt(a(d).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(f?Math.max(d.scrollHeight,d.offsetHeight):d.offsetHeight)-(parseInt(a(d).css("borderTopWidth"),10)||0)-(parseInt(a(d).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relative_container=c}else b.containment.constructor==Array&&(this.containment=b.containment)},_convertPositionTo:function(b,c){c||(c=this.position);var d=b=="absolute"?1:-1,e=this.options,f=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,g=/(html|body)/i.test(f[0].tagName);return{top:c.top+this.offset.relative.top*d+this.offset.parent.top*d-(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():g?0:f.scrollTop())*d),left:c.left+this.offset.relative.left*d+this.offset.parent.left*d-(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():g?0:f.scrollLeft())*d)}},_generatePosition:function(b){var c=this.options,d=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,e=/(html|body)/i.test(d[0].tagName),f=b.pageX,g=b.pageY;if(this.originalPosition){var h;if(this.containment){if(this.relative_container){var i=this.relative_container.offset();h=[this.containment[0]+i.left,this.containment[1]+i.top,this.containment[2]+i.left,this.containment[3]+i.top]}else h=this.containment;b.pageX-this.offset.click.left<h[0]&&(f=h[0]+this.offset.click.left),b.pageY-this.offset.click.top<h[1]&&(g=h[1]+this.offset.click.top),b.pageX-this.offset.click.left>h[2]&&(f=h[2]+this.offset.click.left),b.pageY-this.offset.click.top>h[3]&&(g=h[3]+this.offset.click.top)}if(c.grid){var j=c.grid[1]?this.originalPageY+Math.round((g-this.originalPageY)/c.grid[1])*c.grid[1]:this.originalPageY;g=h?j-this.offset.click.top<h[1]||j-this.offset.click.top>h[3]?j-this.offset.click.top<h[1]?j+c.grid[1]:j-c.grid[1]:j:j;var k=c.grid[0]?this.originalPageX+Math.round((f-this.originalPageX)/c.grid[0])*c.grid[0]:this.originalPageX;f=h?k-this.offset.click.left<h[0]||k-this.offset.click.left>h[2]?k-this.offset.click.left<h[0]?k+c.grid[0]:k-c.grid[0]:k:k}}return{top:g-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():e?0:d.scrollTop()),left:f-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():e?0:d.scrollLeft())}},_clear:function(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval&&this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1},_trigger:function(b,c,d){return d=d||this._uiHash(),a.ui.plugin.call(this,b,[c,d]),b=="drag"&&(this.positionAbs=this._convertPositionTo("absolute")),a.Widget.prototype._trigger.call(this,b,c,d)},plugins:{},_uiHash:function(a){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),a.extend(a.ui.draggable,{version:"1.8.20"}),a.ui.plugin.add("draggable","connectToSortable",{start:function(b,c){var d=a(this).data("draggable"),e=d.options,f=a.extend({},c,{item:d.element});d.sortables=[],a(e.connectToSortable).each(function(){var c=a.data(this,"sortable");c&&!c.options.disabled&&(d.sortables.push({instance:c,shouldRevert:c.options.revert}),c.refreshPositions(),c._trigger("activate",b,f))})},stop:function(b,c){var d=a(this).data("draggable"),e=a.extend({},c,{item:d.element});a.each(d.sortables,function(){this.instance.isOver?(this.instance.isOver=0,d.cancelHelperRemoval=!0,this.instance.cancelHelperRemoval=!1,this.shouldRevert&&(this.instance.options.revert=!0),this.instance._mouseStop(b),this.instance.options.helper=this.instance.options._helper,d.options.helper=="original"&&this.instance.currentItem.css({top:"auto",left:"auto"})):(this.instance.cancelHelperRemoval=!1,this.instance._trigger("deactivate",b,e))})},drag:function(b,c){var d=a(this).data("draggable"),e=this,f=function(b){var c=this.offset.click.top,d=this.offset.click.left,e=this.positionAbs.top,f=this.positionAbs.left,g=b.height,h=b.width,i=b.top,j=b.left;return a.ui.isOver(e+c,f+d,i,j,g,h)};a.each(d.sortables,function(f){this.instance.positionAbs=d.positionAbs,this.instance.helperProportions=d.helperProportions,this.instance.offset.click=d.offset.click,this.instance._intersectsWith(this.instance.containerCache)?(this.instance.isOver||(this.instance.isOver=1,this.instance.currentItem=a(e).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item",!0),this.instance.options._helper=this.instance.options.helper,this.instance.options.helper=function(){return c.helper[0]},b.target=this.instance.currentItem[0],this.instance._mouseCapture(b,!0),this.instance._mouseStart(b,!0,!0),this.instance.offset.click.top=d.offset.click.top,this.instance.offset.click.left=d.offset.click.left,this.instance.offset.parent.left-=d.offset.parent.left-this.instance.offset.parent.left,this.instance.offset.parent.top-=d.offset.parent.top-this.instance.offset.parent.top,d._trigger("toSortable",b),d.dropped=this.instance.element,d.currentItem=d.element,this.instance.fromOutside=d),this.instance.currentItem&&this.instance._mouseDrag(b)):this.instance.isOver&&(this.instance.isOver=0,this.instance.cancelHelperRemoval=!0,this.instance.options.revert=!1,this.instance._trigger("out",b,this.instance._uiHash(this.instance)),this.instance._mouseStop(b,!0),this.instance.options.helper=this.instance.options._helper,this.instance.currentItem.remove(),this.instance.placeholder&&this.instance.placeholder.remove(),d._trigger("fromSortable",b),d.dropped=!1)})}}),a.ui.plugin.add("draggable","cursor",{start:function(b,c){var d=a("body"),e=a(this).data("draggable").options;d.css("cursor")&&(e._cursor=d.css("cursor")),d.css("cursor",e.cursor)},stop:function(b,c){var d=a(this).data("draggable").options;d._cursor&&a("body").css("cursor",d._cursor)}}),a.ui.plugin.add("draggable","opacity",{start:function(b,c){var d=a(c.helper),e=a(this).data("draggable").options;d.css("opacity")&&(e._opacity=d.css("opacity")),d.css("opacity",e.opacity)},stop:function(b,c){var d=a(this).data("draggable").options;d._opacity&&a(c.helper).css("opacity",d._opacity)}}),a.ui.plugin.add("draggable","scroll",{start:function(b,c){var d=a(this).data("draggable");d.scrollParent[0]!=document&&d.scrollParent[0].tagName!="HTML"&&(d.overflowOffset=d.scrollParent.offset())},drag:function(b,c){var d=a(this).data("draggable"),e=d.options,f=!1;if(d.scrollParent[0]!=document&&d.scrollParent[0].tagName!="HTML"){if(!e.axis||e.axis!="x")d.overflowOffset.top+d.scrollParent[0].offsetHeight-b.pageY<e.scrollSensitivity?d.scrollParent[0].scrollTop=f=d.scrollParent[0].scrollTop+e.scrollSpeed:b.pageY-d.overflowOffset.top<e.scrollSensitivity&&(d.scrollParent[0].scrollTop=f=d.scrollParent[0].scrollTop-e.scrollSpeed);if(!e.axis||e.axis!="y")d.overflowOffset.left+d.scrollParent[0].offsetWidth-b.pageX<e.scrollSensitivity?d.scrollParent[0].scrollLeft=f=d.scrollParent[0].scrollLeft+e.scrollSpeed:b.pageX-d.overflowOffset.left<e.scrollSensitivity&&(d.scrollParent[0].scrollLeft=f=d.scrollParent[0].scrollLeft-e.scrollSpeed)}else{if(!e.axis||e.axis!="x")b.pageY-a(document).scrollTop()<e.scrollSensitivity?f=a(document).scrollTop(a(document).scrollTop()-e.scrollSpeed):a(window).height()-(b.pageY-a(document).scrollTop())<e.scrollSensitivity&&(f=a(document).scrollTop(a(document).scrollTop()+e.scrollSpeed));if(!e.axis||e.axis!="y")b.pageX-a(document).scrollLeft()<e.scrollSensitivity?f=a(document).scrollLeft(a(document).scrollLeft()-e.scrollSpeed):a(window).width()-(b.pageX-a(document).scrollLeft())<e.scrollSensitivity&&(f=a(document).scrollLeft(a(document).scrollLeft()+e.scrollSpeed))}f!==!1&&a.ui.ddmanager&&!e.dropBehaviour&&a.ui.ddmanager.prepareOffsets(d,b)}}),a.ui.plugin.add("draggable","snap",{start:function(b,c){var d=a(this).data("draggable"),e=d.options;d.snapElements=[],a(e.snap.constructor!=String?e.snap.items||":data(draggable)":e.snap).each(function(){var b=a(this),c=b.offset();this!=d.element[0]&&d.snapElements.push({item:this,width:b.outerWidth(),height:b.outerHeight(),top:c.top,left:c.left})})},drag:function(b,c){var d=a(this).data("draggable"),e=d.options,f=e.snapTolerance,g=c.offset.left,h=g+d.helperProportions.width,i=c.offset.top,j=i+d.helperProportions.height;for(var k=d.snapElements.length-1;k>=0;k--){var l=d.snapElements[k].left,m=l+d.snapElements[k].width,n=d.snapElements[k].top,o=n+d.snapElements[k].height;if(!(l-f<g&&g<m+f&&n-f<i&&i<o+f||l-f<g&&g<m+f&&n-f<j&&j<o+f||l-f<h&&h<m+f&&n-f<i&&i<o+f||l-f<h&&h<m+f&&n-f<j&&j<o+f)){d.snapElements[k].snapping&&d.options.snap.release&&d.options.snap.release.call(d.element,b,a.extend(d._uiHash(),{snapItem:d.snapElements[k].item})),d.snapElements[k].snapping=!1;continue}if(e.snapMode!="inner"){var p=Math.abs(n-j)<=f,q=Math.abs(o-i)<=f,r=Math.abs(l-h)<=f,s=Math.abs(m-g)<=f;p&&(c.position.top=d._convertPositionTo("relative",{top:n-d.helperProportions.height,left:0}).top-d.margins.top),q&&(c.position.top=d._convertPositionTo("relative",{top:o,left:0}).top-d.margins.top),r&&(c.position.left=d._convertPositionTo("relative",{top:0,left:l-d.helperProportions.width}).left-d.margins.left),s&&(c.position.left=d._convertPositionTo("relative",{top:0,left:m}).left-d.margins.left)}var t=p||q||r||s;if(e.snapMode!="outer"){var p=Math.abs(n-i)<=f,q=Math.abs(o-j)<=f,r=Math.abs(l-g)<=f,s=Math.abs(m-h)<=f;p&&(c.position.top=d._convertPositionTo("relative",{top:n,left:0}).top-d.margins.top),q&&(c.position.top=d._convertPositionTo("relative",{top:o-d.helperProportions.height,left:0}).top-d.margins.top),r&&(c.position.left=d._convertPositionTo("relative",{top:0,left:l}).left-d.margins.left),s&&(c.position.left=d._convertPositionTo("relative",{top:0,left:m-d.helperProportions.width}).left-d.margins.left)}!d.snapElements[k].snapping&&(p||q||r||s||t)&&d.options.snap.snap&&d.options.snap.snap.call(d.element,b,a.extend(d._uiHash(),{snapItem:d.snapElements[k].item})),d.snapElements[k].snapping=p||q||r||s||t}}}),a.ui.plugin.add("draggable","stack",{start:function(b,c){var d=a(this).data("draggable").options,e=a.makeArray(a(d.stack)).sort(function(b,c){return(parseInt(a(b).css("zIndex"),10)||0)-(parseInt(a(c).css("zIndex"),10)||0)});if(!e.length)return;var f=parseInt(e[0].style.zIndex)||0;a(e).each(function(a){this.style.zIndex=f+a}),this[0].style.zIndex=f+e.length}}),a.ui.plugin.add("draggable","zIndex",{start:function(b,c){var d=a(c.helper),e=a(this).data("draggable").options;d.css("zIndex")&&(e._zIndex=d.css("zIndex")),d.css("zIndex",e.zIndex)},stop:function(b,c){var d=a(this).data("draggable").options;d._zIndex&&a(c.helper).css("zIndex",d._zIndex)}})})(jQuery);;/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.sortable.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.widget("ui.sortable",a.ui.mouse,{widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3},_create:function(){var a=this.options;this.containerCache={},this.element.addClass("ui-sortable"),this.refresh(),this.floating=this.items.length?a.axis==="x"||/left|right/.test(this.items[0].item.css("float"))||/inline|table-cell/.test(this.items[0].item.css("display")):!1,this.offset=this.element.offset(),this._mouseInit(),this.ready=!0},destroy:function(){a.Widget.prototype.destroy.call(this),this.element.removeClass("ui-sortable ui-sortable-disabled"),this._mouseDestroy();for(var b=this.items.length-1;b>=0;b--)this.items[b].item.removeData(this.widgetName+"-item");return this},_setOption:function(b,c){b==="disabled"?(this.options[b]=c,this.widget()[c?"addClass":"removeClass"]("ui-sortable-disabled")):a.Widget.prototype._setOption.apply(this,arguments)},_mouseCapture:function(b,c){var d=this;if(this.reverting)return!1;if(this.options.disabled||this.options.type=="static")return!1;this._refreshItems(b);var e=null,f=this,g=a(b.target).parents().each(function(){if(a.data(this,d.widgetName+"-item")==f)return e=a(this),!1});a.data(b.target,d.widgetName+"-item")==f&&(e=a(b.target));if(!e)return!1;if(this.options.handle&&!c){var h=!1;a(this.options.handle,e).find("*").andSelf().each(function(){this==b.target&&(h=!0)});if(!h)return!1}return this.currentItem=e,this._removeCurrentsFromItems(),!0},_mouseStart:function(b,c,d){var e=this.options,f=this;this.currentContainer=this,this.refreshPositions(),this.helper=this._createHelper(b),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),a.extend(this.offset,{click:{left:b.pageX-this.offset.left,top:b.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.originalPosition=this._generatePosition(b),this.originalPageX=b.pageX,this.originalPageY=b.pageY,e.cursorAt&&this._adjustOffsetFromHelper(e.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!=this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),e.containment&&this._setContainment(),e.cursor&&(a("body").css("cursor")&&(this._storedCursor=a("body").css("cursor")),a("body").css("cursor",e.cursor)),e.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",e.opacity)),e.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",e.zIndex)),this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",b,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions();if(!d)for(var g=this.containers.length-1;g>=0;g--)this.containers[g]._trigger("activate",b,f._uiHash(this));return a.ui.ddmanager&&(a.ui.ddmanager.current=this),a.ui.ddmanager&&!e.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,b),this.dragging=!0,this.helper.addClass("ui-sortable-helper"),this._mouseDrag(b),!0},_mouseDrag:function(b){this.position=this._generatePosition(b),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs);if(this.options.scroll){var c=this.options,d=!1;this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-b.pageY<c.scrollSensitivity?this.scrollParent[0].scrollTop=d=this.scrollParent[0].scrollTop+c.scrollSpeed:b.pageY-this.overflowOffset.top<c.scrollSensitivity&&(this.scrollParent[0].scrollTop=d=this.scrollParent[0].scrollTop-c.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-b.pageX<c.scrollSensitivity?this.scrollParent[0].scrollLeft=d=this.scrollParent[0].scrollLeft+c.scrollSpeed:b.pageX-this.overflowOffset.left<c.scrollSensitivity&&(this.scrollParent[0].scrollLeft=d=this.scrollParent[0].scrollLeft-c.scrollSpeed)):(b.pageY-a(document).scrollTop()<c.scrollSensitivity?d=a(document).scrollTop(a(document).scrollTop()-c.scrollSpeed):a(window).height()-(b.pageY-a(document).scrollTop())<c.scrollSensitivity&&(d=a(document).scrollTop(a(document).scrollTop()+c.scrollSpeed)),b.pageX-a(document).scrollLeft()<c.scrollSensitivity?d=a(document).scrollLeft(a(document).scrollLeft()-c.scrollSpeed):a(window).width()-(b.pageX-a(document).scrollLeft())<c.scrollSensitivity&&(d=a(document).scrollLeft(a(document).scrollLeft()+c.scrollSpeed))),d!==!1&&a.ui.ddmanager&&!c.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,b)}this.positionAbs=this._convertPositionTo("absolute");if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";for(var e=this.items.length-1;e>=0;e--){var f=this.items[e],g=f.item[0],h=this._intersectsWithPointer(f);if(!h)continue;if(g!=this.currentItem[0]&&this.placeholder[h==1?"next":"prev"]()[0]!=g&&!a.ui.contains(this.placeholder[0],g)&&(this.options.type=="semi-dynamic"?!a.ui.contains(this.element[0],g):!0)){this.direction=h==1?"down":"up";if(this.options.tolerance=="pointer"||this._intersectsWithSides(f))this._rearrange(b,f);else break;this._trigger("change",b,this._uiHash());break}}return this._contactContainers(b),a.ui.ddmanager&&a.ui.ddmanager.drag(this,b),this._trigger("sort",b,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(b,c){if(!b)return;a.ui.ddmanager&&!this.options.dropBehaviour&&a.ui.ddmanager.drop(this,b);if(this.options.revert){var d=this,e=d.placeholder.offset();d.reverting=!0,a(this.helper).animate({left:e.left-this.offset.parent.left-d.margins.left+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollLeft),top:e.top-this.offset.parent.top-d.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)},parseInt(this.options.revert,10)||500,function(){d._clear(b)})}else this._clear(b,c);return!1},cancel:function(){var b=this;if(this.dragging){this._mouseUp({target:null}),this.options.helper=="original"?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();for(var c=this.containers.length-1;c>=0;c--)this.containers[c]._trigger("deactivate",null,b._uiHash(this)),this.containers[c].containerCache.over&&(this.containers[c]._trigger("out",null,b._uiHash(this)),this.containers[c].containerCache.over=0)}return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.options.helper!="original"&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),a.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?a(this.domPosition.prev).after(this.currentItem):a(this.domPosition.parent).prepend(this.currentItem)),this},serialize:function(b){var c=this._getItemsAsjQuery(b&&b.connected),d=[];return b=b||{},a(c).each(function(){var c=(a(b.item||this).attr(b.attribute||"id")||"").match(b.expression||/(.+)[-=_](.+)/);c&&d.push((b.key||c[1]+"[]")+"="+(b.key&&b.expression?c[1]:c[2]))}),!d.length&&b.key&&d.push(b.key+"="),d.join("&")},toArray:function(b){var c=this._getItemsAsjQuery(b&&b.connected),d=[];return b=b||{},c.each(function(){d.push(a(b.item||this).attr(b.attribute||"id")||"")}),d},_intersectsWith:function(a){var b=this.positionAbs.left,c=b+this.helperProportions.width,d=this.positionAbs.top,e=d+this.helperProportions.height,f=a.left,g=f+a.width,h=a.top,i=h+a.height,j=this.offset.click.top,k=this.offset.click.left,l=d+j>h&&d+j<i&&b+k>f&&b+k<g;return this.options.tolerance=="pointer"||this.options.forcePointerForContainers||this.options.tolerance!="pointer"&&this.helperProportions[this.floating?"width":"height"]>a[this.floating?"width":"height"]?l:f<b+this.helperProportions.width/2&&c-this.helperProportions.width/2<g&&h<d+this.helperProportions.height/2&&e-this.helperProportions.height/2<i},_intersectsWithPointer:function(b){var c=this.options.axis==="x"||a.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,b.top,b.height),d=this.options.axis==="y"||a.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,b.left,b.width),e=c&&d,f=this._getDragVerticalDirection(),g=this._getDragHorizontalDirection();return e?this.floating?g&&g=="right"||f=="down"?2:1:f&&(f=="down"?2:1):!1},_intersectsWithSides:function(b){var c=a.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,b.top+b.height/2,b.height),d=a.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,b.left+b.width/2,b.width),e=this._getDragVerticalDirection(),f=this._getDragHorizontalDirection();return this.floating&&f?f=="right"&&d||f=="left"&&!d:e&&(e=="down"&&c||e=="up"&&!c)},_getDragVerticalDirection:function(){var a=this.positionAbs.top-this.lastPositionAbs.top;return a!=0&&(a>0?"down":"up")},_getDragHorizontalDirection:function(){var a=this.positionAbs.left-this.lastPositionAbs.left;return a!=0&&(a>0?"right":"left")},refresh:function(a){return this._refreshItems(a),this.refreshPositions(),this},_connectWith:function(){var a=this.options;return a.connectWith.constructor==String?[a.connectWith]:a.connectWith},_getItemsAsjQuery:function(b){var c=this,d=[],e=[],f=this._connectWith();if(f&&b)for(var g=f.length-1;g>=0;g--){var h=a(f[g]);for(var i=h.length-1;i>=0;i--){var j=a.data(h[i],this.widgetName);j&&j!=this&&!j.options.disabled&&e.push([a.isFunction(j.options.items)?j.options.items.call(j.element):a(j.options.items,j.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),j])}}e.push([a.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):a(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]);for(var g=e.length-1;g>=0;g--)e[g][0].each(function(){d.push(this)});return a(d)},_removeCurrentsFromItems:function(){var a=this.currentItem.find(":data("+this.widgetName+"-item)");for(var b=0;b<this.items.length;b++)for(var c=0;c<a.length;c++)a[c]==this.items[b].item[0]&&this.items.splice(b,1)},_refreshItems:function(b){this.items=[],this.containers=[this];var c=this.items,d=this,e=[[a.isFunction(this.options.items)?this.options.items.call(this.element[0],b,{item:this.currentItem}):a(this.options.items,this.element),this]],f=this._connectWith();if(f&&this.ready)for(var g=f.length-1;g>=0;g--){var h=a(f[g]);for(var i=h.length-1;i>=0;i--){var j=a.data(h[i],this.widgetName);j&&j!=this&&!j.options.disabled&&(e.push([a.isFunction(j.options.items)?j.options.items.call(j.element[0],b,{item:this.currentItem}):a(j.options.items,j.element),j]),this.containers.push(j))}}for(var g=e.length-1;g>=0;g--){var k=e[g][1],l=e[g][0];for(var i=0,m=l.length;i<m;i++){var n=a(l[i]);n.data(this.widgetName+"-item",k),c.push({item:n,instance:k,width:0,height:0,left:0,top:0})}}},refreshPositions:function(b){this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());for(var c=this.items.length-1;c>=0;c--){var d=this.items[c];if(d.instance!=this.currentContainer&&this.currentContainer&&d.item[0]!=this.currentItem[0])continue;var e=this.options.toleranceElement?a(this.options.toleranceElement,d.item):d.item;b||(d.width=e.outerWidth(),d.height=e.outerHeight());var f=e.offset();d.left=f.left,d.top=f.top}if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(var c=this.containers.length-1;c>=0;c--){var f=this.containers[c].element.offset();this.containers[c].containerCache.left=f.left,this.containers[c].containerCache.top=f.top,this.containers[c].containerCache.width=this.containers[c].element.outerWidth(),this.containers[c].containerCache.height=this.containers[c].element.outerHeight()}return this},_createPlaceholder:function(b){var c=b||this,d=c.options;if(!d.placeholder||d.placeholder.constructor==String){var e=d.placeholder;d.placeholder={element:function(){var b=a(document.createElement(c.currentItem[0].nodeName)).addClass(e||c.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];return e||(b.style.visibility="hidden"),b},update:function(a,b){if(e&&!d.forcePlaceholderSize)return;b.height()||b.height(c.currentItem.innerHeight()-parseInt(c.currentItem.css("paddingTop")||0,10)-parseInt(c.currentItem.css("paddingBottom")||0,10)),b.width()||b.width(c.currentItem.innerWidth()-parseInt(c.currentItem.css("paddingLeft")||0,10)-parseInt(c.currentItem.css("paddingRight")||0,10))}}}c.placeholder=a(d.placeholder.element.call(c.element,c.currentItem)),c.currentItem.after(c.placeholder),d.placeholder.update(c,c.placeholder)},_contactContainers:function(b){var c=null,d=null;for(var e=this.containers.length-1;e>=0;e--){if(a.ui.contains(this.currentItem[0],this.containers[e].element[0]))continue;if(this._intersectsWith(this.containers[e].containerCache)){if(c&&a.ui.contains(this.containers[e].element[0],c.element[0]))continue;c=this.containers[e],d=e}else this.containers[e].containerCache.over&&(this.containers[e]._trigger("out",b,this._uiHash(this)),this.containers[e].containerCache.over=0)}if(!c)return;if(this.containers.length===1)this.containers[d]._trigger("over",b,this._uiHash(this)),this.containers[d].containerCache.over=1;else if(this.currentContainer!=this.containers[d]){var f=1e4,g=null,h=this.positionAbs[this.containers[d].floating?"left":"top"];for(var i=this.items.length-1;i>=0;i--){if(!a.ui.contains(this.containers[d].element[0],this.items[i].item[0]))continue;var j=this.items[i][this.containers[d].floating?"left":"top"];Math.abs(j-h)<f&&(f=Math.abs(j-h),g=this.items[i])}if(!g&&!this.options.dropOnEmpty)return;this.currentContainer=this.containers[d],g?this._rearrange(b,g,null,!0):this._rearrange(b,null,this.containers[d].element,!0),this._trigger("change",b,this._uiHash()),this.containers[d]._trigger("change",b,this._uiHash(this)),this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[d]._trigger("over",b,this._uiHash(this)),this.containers[d].containerCache.over=1}},_createHelper:function(b){var c=this.options,d=a.isFunction(c.helper)?a(c.helper.apply(this.element[0],[b,this.currentItem])):c.helper=="clone"?this.currentItem.clone():this.currentItem;return d.parents("body").length||a(c.appendTo!="parent"?c.appendTo:this.currentItem[0].parentNode)[0].appendChild(d[0]),d[0]==this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),(d[0].style.width==""||c.forceHelperSize)&&d.width(this.currentItem.width()),(d[0].style.height==""||c.forceHelperSize)&&d.height(this.currentItem.height()),d},_adjustOffsetFromHelper:function(b){typeof b=="string"&&(b=b.split(" ")),a.isArray(b)&&(b={left:+b[0],top:+b[1]||0}),"left"in b&&(this.offset.click.left=b.left+this.margins.left),"right"in b&&(this.offset.click.left=this.helperProportions.width-b.right+this.margins.left),"top"in b&&(this.offset.click.top=b.top+this.margins.top),"bottom"in b&&(this.offset.click.top=this.helperProportions.height-b.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var b=this.offsetParent.offset();this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0])&&(b.left+=this.scrollParent.scrollLeft(),b.top+=this.scrollParent.scrollTop());if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&a.browser.msie)b={top:0,left:0};return{top:b.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:b.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var a=this.currentItem.position();return{top:a.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var b=this.options;b.containment=="parent"&&(b.containment=this.helper[0].parentNode);if(b.containment=="document"||b.containment=="window")this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,a(b.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(a(b.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(b.containment)){var c=a(b.containment)[0],d=a(b.containment).offset(),e=a(c).css("overflow")!="hidden";this.containment=[d.left+(parseInt(a(c).css("borderLeftWidth"),10)||0)+(parseInt(a(c).css("paddingLeft"),10)||0)-this.margins.left,d.top+(parseInt(a(c).css("borderTopWidth"),10)||0)+(parseInt(a(c).css("paddingTop"),10)||0)-this.margins.top,d.left+(e?Math.max(c.scrollWidth,c.offsetWidth):c.offsetWidth)-(parseInt(a(c).css("borderLeftWidth"),10)||0)-(parseInt(a(c).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,d.top+(e?Math.max(c.scrollHeight,c.offsetHeight):c.offsetHeight)-(parseInt(a(c).css("borderTopWidth"),10)||0)-(parseInt(a(c).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]}},_convertPositionTo:function(b,c){c||(c=this.position);var d=b=="absolute"?1:-1,e=this.options,f=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,g=/(html|body)/i.test(f[0].tagName);return{top:c.top+this.offset.relative.top*d+this.offset.parent.top*d-(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():g?0:f.scrollTop())*d),left:c.left+this.offset.relative.left*d+this.offset.parent.left*d-(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():g?0:f.scrollLeft())*d)}},_generatePosition:function(b){var c=this.options,d=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,e=/(html|body)/i.test(d[0].tagName);this.cssPosition=="relative"&&(this.scrollParent[0]==document||this.scrollParent[0]==this.offsetParent[0])&&(this.offset.relative=this._getRelativeOffset());var f=b.pageX,g=b.pageY;if(this.originalPosition){this.containment&&(b.pageX-this.offset.click.left<this.containment[0]&&(f=this.containment[0]+this.offset.click.left),b.pageY-this.offset.click.top<this.containment[1]&&(g=this.containment[1]+this.offset.click.top),b.pageX-this.offset.click.left>this.containment[2]&&(f=this.containment[2]+this.offset.click.left),b.pageY-this.offset.click.top>this.containment[3]&&(g=this.containment[3]+this.offset.click.top));if(c.grid){var h=this.originalPageY+Math.round((g-this.originalPageY)/c.grid[1])*c.grid[1];g=this.containment?h-this.offset.click.top<this.containment[1]||h-this.offset.click.top>this.containment[3]?h-this.offset.click.top<this.containment[1]?h+c.grid[1]:h-c.grid[1]:h:h;var i=this.originalPageX+Math.round((f-this.originalPageX)/c.grid[0])*c.grid[0];f=this.containment?i-this.offset.click.left<this.containment[0]||i-this.offset.click.left>this.containment[2]?i-this.offset.click.left<this.containment[0]?i+c.grid[0]:i-c.grid[0]:i:i}}return{top:g-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(a.browser.safari&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():e?0:d.scrollTop()),left:f-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(a.browser.safari&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():e?0:d.scrollLeft())}},_rearrange:function(a,b,c,d){c?c[0].appendChild(this.placeholder[0]):b.item[0].parentNode.insertBefore(this.placeholder[0],this.direction=="down"?b.item[0]:b.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var e=this,f=this.counter;window.setTimeout(function(){f==e.counter&&e.refreshPositions(!d)},0)},_clear:function(b,c){this.reverting=!1;var d=[],e=this;!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null;if(this.helper[0]==this.currentItem[0]){for(var f in this._storedCSS)if(this._storedCSS[f]=="auto"||this._storedCSS[f]=="static")this._storedCSS[f]="";this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else this.currentItem.show();this.fromOutside&&!c&&d.push(function(a){this._trigger("receive",a,this._uiHash(this.fromOutside))}),(this.fromOutside||this.domPosition.prev!=this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!=this.currentItem.parent()[0])&&!c&&d.push(function(a){this._trigger("update",a,this._uiHash())});if(!a.ui.contains(this.element[0],this.currentItem[0])){c||d.push(function(a){this._trigger("remove",a,this._uiHash())});for(var f=this.containers.length-1;f>=0;f--)a.ui.contains(this.containers[f].element[0],this.currentItem[0])&&!c&&(d.push(function(a){return function(b){a._trigger("receive",b,this._uiHash(this))}}.call(this,this.containers[f])),d.push(function(a){return function(b){a._trigger("update",b,this._uiHash(this))}}.call(this,this.containers[f])))}for(var f=this.containers.length-1;f>=0;f--)c||d.push(function(a){return function(b){a._trigger("deactivate",b,this._uiHash(this))}}.call(this,this.containers[f])),this.containers[f].containerCache.over&&(d.push(function(a){return function(b){a._trigger("out",b,this._uiHash(this))}}.call(this,this.containers[f])),this.containers[f].containerCache.over=0);this._storedCursor&&a("body").css("cursor",this._storedCursor),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex",this._storedZIndex=="auto"?"":this._storedZIndex),this.dragging=!1;if(this.cancelHelperRemoval){if(!c){this._trigger("beforeStop",b,this._uiHash());for(var f=0;f<d.length;f++)d[f].call(this,b);this._trigger("stop",b,this._uiHash())}return!1}c||this._trigger("beforeStop",b,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.helper[0]!=this.currentItem[0]&&this.helper.remove(),this.helper=null;if(!c){for(var f=0;f<d.length;f++)d[f].call(this,b);this._trigger("stop",b,this._uiHash())}return this.fromOutside=!1,!0},_trigger:function(){a.Widget.prototype._trigger.apply(this,arguments)===!1&&this.cancel()},_uiHash:function(b){var c=b||this;return{helper:c.helper,placeholder:c.placeholder||a([]),position:c.position,originalPosition:c.originalPosition,offset:c.positionAbs,item:c.currentItem,sender:b?b.element:null}}}),a.extend(a.ui.sortable,{version:"1.8.20"})})(jQuery);;


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
(function(a){a.fn.mousehold=function(d,c){if(d&&typeof d=="function"){c=d;d=100}if(c&&typeof c=="function"){var e=0;var b=0;return this.each(function(){a(this).mousedown(function(){b=1;var g=0;var f=this;e=setInterval(function(){g++;c.call(f,g);b=2},d)});clearMousehold=function(){clearInterval(e);if(b==1){c.call(this,1)}b=0};a(this).mouseout(clearMousehold);a(this).mouseup(clearMousehold)})}}})(jQuery);


/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * jQuery mousewheel Version: 3.0.6
 * 
 * Requires: 1.2.2+
 */
(function(d){var b=["DOMMouseScroll","mousewheel"];if(d.event.fixHooks){for(var a=b.length;a;){d.event.fixHooks[b[--a]]=d.event.mouseHooks}}d.event.special.mousewheel={setup:function(){if(this.addEventListener){for(var e=b.length;e;){this.addEventListener(b[--e],c,false)}}else{this.onmousewheel=c}},teardown:function(){if(this.removeEventListener){for(var e=b.length;e;){this.removeEventListener(b[--e],c,false)}}else{this.onmousewheel=null}}};d.fn.extend({mousewheel:function(e){return e?this.bind("mousewheel",e):this.trigger("mousewheel")},unmousewheel:function(e){return this.unbind("mousewheel",e)}});function c(j){var h=j||window.event,g=[].slice.call(arguments,1),k=0,i=true,f=0,e=0;j=d.event.fix(h);j.type="mousewheel";if(h.wheelDelta){k=h.wheelDelta/120}if(h.detail){k=-h.detail/3}e=k;if(h.axis!==undefined&&h.axis===h.HORIZONTAL_AXIS){e=0;f=-1*k}if(h.wheelDeltaY!==undefined){e=h.wheelDeltaY/120}if(h.wheelDeltaX!==undefined){f=-1*h.wheelDeltaX/120}g.unshift(j,k,f,e);return(d.event.dispatch||d.event.handle).apply(this,g)}})(jQuery);


/**
LazyLoad makes it easy and painless to lazily load one or more external
JavaScript or CSS files on demand either during or after the rendering of a web
page.

Supported browsers include Firefox 2+, IE6+, Safari 3+ (including Mobile
Safari), Google Chrome, and Opera 9+. Other browsers may or may not work and
are not officially supported.

Visit https://github.com/rgrove/lazyload/ for more info.

Copyright (c) 2011 Ryan Grove <ryan@wonko.com>
All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the 'Software'), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

@module lazyload
@class LazyLoad
@static
@version 2.0.3 (git)
*/
LazyLoad=(function(j){var g,h,b={},e=0,f={css:[],js:[]},m=j.styleSheets;function l(p,o){var q=j.createElement(p),n;for(n in o){if(o.hasOwnProperty(n)){q.setAttribute(n,o[n])}}return q}function i(n){var q=b[n],r,o;if(q){r=q.callback;o=q.urls;o.shift();e=0;if(!o.length){r&&r.call(q.context,q.obj);b[n]=null;f[n].length&&k(n)}}}function c(){var n=navigator.userAgent;g={async:j.createElement("script").async===true};(g.webkit=/AppleWebKit\//.test(n))||(g.ie=/MSIE/.test(n))||(g.opera=/Opera/.test(n))||(g.gecko=/Gecko\//.test(n))||(g.unknown=true)}function k(z,y,A,v,r){var t=function(){i(z)},B=z==="css",o=[],u,w,s,q,x,n;g||c();if(y){y=typeof y==="string"?[y]:y.concat();if(B||g.async||g.gecko||g.opera){f[z].push({urls:y,callback:A,obj:v,context:r})}else{for(u=0,w=y.length;u<w;++u){f[z].push({urls:[y[u]],callback:u===w-1?A:null,obj:v,context:r})}}}if(b[z]||!(q=b[z]=f[z].shift())){return}h||(h=j.head||j.getElementsByTagName("head")[0]);x=q.urls;for(u=0,w=x.length;u<w;++u){n=x[u];if(B){s=g.gecko?l("style"):l("link",{href:n,rel:"stylesheet"})}else{s=l("script",{src:n});s.async=false}s.className="lazyload";s.setAttribute("charset","utf-8");if(g.ie&&!B){s.onreadystatechange=function(){if(/loaded|complete/.test(s.readyState)){s.onreadystatechange=null;t()}}}else{if(B&&(g.gecko||g.webkit)){if(g.webkit){q.urls[u]=s.href;d()}else{s.innerHTML='@import "'+n+'";';a(s)}}else{s.onload=s.onerror=t}}o.push(s)}for(u=0,w=o.length;u<w;++u){h.appendChild(o[u])}}function a(p){var o;try{o=!!p.sheet.cssRules}catch(n){e+=1;if(e<200){setTimeout(function(){a(p)},50)}else{o&&i("css")}return}i("css")}function d(){var o=b.css,n;if(o){n=m.length;while(--n>=0){if(m[n].href===o.urls[0]){i("css");break}}e+=1;if(o){if(e<200){setTimeout(d,50)}else{i("css")}}}}return{css:function(p,q,o,n){k("css",p,q,o,n)},js:function(p,q,o,n){k("js",p,q,o,n)}}})(this.document);


/**
Genoverse - HTML5 genome browser
Copyright (c) 2011 Genome Research Ltd.
Authors: Evgeny Bragin, Simon Brent

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
1. Redistributions of source code must retain the above copyright notice,
this list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright
notice, this list of conditions and the following disclaimer in the
documentation and/or other materials provided with the distribution.
3. Neither the names Genome Research Ltd and Wellcome Trust Sanger
Institute nor the names of its contributors may be used to endorse or promote
products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY GENOME RESEARCH LTD AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL GENOME RESEARCH LTD OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


/*
  Base.js, version 1.1
  Copyright 2006-2007, Dean Edwards
  License: http://www.opensource.org/licenses/mit-license.php
*/
var Base=function(){};Base.extend=function(b,e){var f=Base.prototype.extend;Base._prototyping=true;var d=new this;f.call(d,b);delete Base._prototyping;var c=d.constructor;var a=d.constructor=function(){if(!Base._prototyping){if(this._constructing||this.constructor==a){this._constructing=true;c.apply(this,arguments);delete this._constructing}else{if(arguments[0]!=null){return(arguments[0].extend||f).call(arguments[0],d)}}}};a.ancestor=this;a.extend=this.extend;a.forEach=this.forEach;a.implement=this.implement;a.prototype=d;a.toString=this.toString;a.valueOf=function(g){return(g=="object")?a:c.valueOf()};f.call(a,e);if(typeof a.init=="function"){a.init()}return a};Base.prototype={extend:function(b,h){if(arguments.length>1){var e=this[b];if(e&&(typeof h=="function")&&(!e.valueOf||e.valueOf()!=h.valueOf())&&/\bbase\b/.test(h)){var a=h.valueOf();h=function(){var k=this.base||Base.prototype.base;this.base=e;var i=a.apply(this,arguments);this.base=k;return i};h.valueOf=function(i){return(i=="object")?h:a};h.toString=Base.toString}this[b]=h}else{if(b){var g=Base.prototype.extend;if(!Base._prototyping&&typeof this!="function"){g=this.extend||g}var d={toSource:null};var f=["constructor","toString","valueOf"];var c=Base._prototyping?0:1;while(j=f[c++]){if(b[j]!=d[j]){g.call(this,j,b[j])}}for(var j in b){if(!d[j]){g.call(this,j,b[j])}}}}return this},base:function(){}};Base=Base.extend({constructor:function(){this.extend(arguments[0])}},{ancestor:Object,version:"1.1",forEach:function(a,d,c){for(var b in a){if(this.prototype[b]===undefined){d.call(c,a[b],b,a)}}},implement:function(){for(var a=0;a<arguments.length;a++){if(typeof arguments[a]=="function"){arguments[a](this.prototype)}else{this.prototype.extend(arguments[a])}}return this},toString:function(){return String(this.valueOf())}});


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
var RTree=function(a){var c=3;var b=6;if(!isNaN(a)){c=Math.floor(a/2);b=a}var f={x:0,y:0,w:0,h:0,id:"root",nodes:[]};var j=function(p){return Object.prototype.toString.call(p)==="[object Array]"};var i=(function(){var o={};return function(q){var p=0;if(q in o){p=o[q]++}else{o[q]=0}return q+"_"+p}})();RTree.Rectangle.squarified_ratio=function(p,o,t){var s=(p+o)/2;var r=p*o;var q=r/(s*s);return(r*t/q)};var e=function(u,q,v){var w=[];var r=[];var x=[];var y=1;if(!u||!RTree.Rectangle.overlap_rectangle(u,v)){return x}var o={x:u.x,y:u.y,w:u.w,h:u.h,target:q};r.push(v.nodes.length);w.push(v);do{var A=w.pop();var p=r.pop()-1;if("target" in o){while(p>=0){var s=A.nodes[p];if(RTree.Rectangle.overlap_rectangle(o,s)){if((o.target&&"leaf" in s&&s.leaf===o.target)||(!o.target&&("leaf" in s||RTree.Rectangle.contains_rectangle(s,o)))){if("nodes" in s){x=m(s,true,[],s);A.nodes.splice(p,1)}else{x=A.nodes.splice(p,1)}RTree.Rectangle.make_MBR(A.nodes,A);delete o.target;if(A.nodes.length<c){o.nodes=m(A,true,[],A)}break}else{if("nodes" in s){y+=1;r.push(p);w.push(A);A=s;p=s.nodes.length}}}p-=1}}else{if("nodes" in o){A.nodes.splice(p+1,1);if(A.nodes.length>0){RTree.Rectangle.make_MBR(A.nodes,A)}for(var z=0;z<o.nodes.length;z++){h(o.nodes[z],A)}o.nodes.length=0;if(w.length==0&&A.nodes.length<=1){o.nodes=m(A,true,o.nodes,A);A.nodes.length=0;w.push(A);r.push(1)}else{if(w.length>0&&A.nodes.length<c){o.nodes=m(A,true,o.nodes,A);A.nodes.length=0}else{delete o.nodes}}}else{RTree.Rectangle.make_MBR(A.nodes,A)}}y-=1}while(w.length>0);return(x)};var l=function(w,x){var s=-1;var v=[];var z;var A=function(C,B){return(function(D){C._attach_data(B,D)})};v.push(x);var o=x.nodes;do{if(s!=-1){v.push(o[s]);o=o[s].nodes;s=-1}for(var q=o.length-1;q>=0;q--){var u=o[q];if("leaf" in u){s=-1;break}var t=RTree.Rectangle.squarified_ratio(u.w,u.h,u.nodes.length+1);var r=Math.max(u.x+u.w,w.x+w.w)-Math.min(u.x,w.x);var p=Math.max(u.y+u.h,w.y+w.h)-Math.min(u.y,w.y);var y=RTree.Rectangle.squarified_ratio(r,p,u.nodes.length+2);if(s<0||Math.abs(y-t)<z){z=Math.abs(y-t);s=q}}}while(s!=-1);return(v)};var d=function(o){var p=k(o);while(o.length>0){g(o,p[0],p[1])}return(p)};var g=function(o,B,A){var s=RTree.Rectangle.squarified_ratio(B.w,B.h,B.nodes.length+1);var r=RTree.Rectangle.squarified_ratio(A.w,A.h,A.nodes.length+1);var q;var x;var C;for(var v=o.length-1;v>=0;v--){var p=o[v];var w={};w.x=Math.min(B.x,p.x);w.y=Math.min(B.y,p.y);w.w=Math.max(B.x+B.w,p.x+p.w)-w.x;w.h=Math.max(B.y+B.h,p.y+p.h)-w.y;var z=Math.abs(RTree.Rectangle.squarified_ratio(w.w,w.h,B.nodes.length+2)-s);var u={};u.x=Math.min(A.x,p.x);u.y=Math.min(A.y,p.y);u.w=Math.max(A.x+A.w,p.x+p.w)-u.x;u.h=Math.max(A.y+A.h,p.y+p.h)-u.y;var y=Math.abs(RTree.Rectangle.squarified_ratio(u.w,u.h,A.nodes.length+2)-r);if(!x||!q||Math.abs(y-z)<q){x=v;q=Math.abs(y-z);C=y<z?A:B}}var t=o.splice(x,1)[0];if(B.nodes.length+o.length+1<=c){B.nodes.push(t);RTree.Rectangle.expand_rectangle(B,t)}else{if(A.nodes.length+o.length+1<=c){A.nodes.push(t);RTree.Rectangle.expand_rectangle(A,t)}else{C.nodes.push(t);RTree.Rectangle.expand_rectangle(C,t)}}};var k=function(o){var q=o.length-1;var y=0;var p=o.length-1;var w=0;var u,t;for(var s=o.length-2;s>=0;s--){var r=o[s];if(r.x>o[y].x){y=s}else{if(r.x+r.w<o[q].x+o[q].w){q=s}}if(r.y>o[w].y){w=s}else{if(r.y+r.h<o[p].y+o[p].h){p=s}}}var x=Math.abs((o[q].x+o[q].w)-o[y].x);var v=Math.abs((o[p].y+o[p].h)-o[w].y);if(x>v){if(q>y){u=o.splice(q,1)[0];t=o.splice(y,1)[0]}else{t=o.splice(y,1)[0];u=o.splice(q,1)[0]}}else{if(p>w){u=o.splice(p,1)[0];t=o.splice(w,1)[0]}else{t=o.splice(w,1)[0];u=o.splice(p,1)[0]}}return([{x:u.x,y:u.y,w:u.w,h:u.h,nodes:[u]},{x:t.x,y:t.y,w:t.w,h:t.h,nodes:[t]}])};var n=function(p,o){p.nodes=o.nodes;p.x=o.x;p.y=o.y;p.w=o.w;p.h=o.h;return(p)};var m=function(t,q,s,u){var v=[];if(!RTree.Rectangle.overlap_rectangle(t,u)){return(s)}var w=function(y,x){return(function(z){y._attach_data(x,z)})};v.push(u.nodes);do{var o=v.pop();for(var p=o.length-1;p>=0;p--){var r=o[p];if(RTree.Rectangle.overlap_rectangle(t,r)){if("nodes" in r){v.push(r.nodes)}else{if("leaf" in r){if(!q){s.push(r.leaf)}else{s.push(r)}}}}}}while(v.length>0);return(s)};var h=function(o,u){var r;if(u.nodes.length==0){u.x=o.x;u.y=o.y;u.w=o.w;u.h=o.h;u.nodes.push(o);return}var q=l(o,u);var p=o;do{if(r&&"nodes" in r&&r.nodes.length==0){var x=r;r=q.pop();for(var w=0;w<r.nodes.length;w++){if(r.nodes[w]===x||r.nodes[w].nodes.length==0){r.nodes.splice(w,1);break}}}else{r=q.pop()}if("leaf" in p||"nodes" in p||j(p)){if(j(p)){for(var s=0;s<p.length;s++){RTree.Rectangle.expand_rectangle(r,p[s])}r.nodes=r.nodes.concat(p)}else{RTree.Rectangle.expand_rectangle(r,p);r.nodes.push(p)}if(r.nodes.length<=b){p={x:r.x,y:r.y,w:r.w,h:r.h}}else{var v=d(r.nodes);p=v;if(q.length<1){r.nodes.push(v[0]);q.push(r);p=v[1]}}}else{RTree.Rectangle.expand_rectangle(r,p);p={x:r.x,y:r.y,w:r.w,h:r.h}}}while(q.length>0)};this.get_tree=function(){return f};this.set_tree=function(p,o){if(!o){o=f}return(n(o,p))};this.search=function(p,q,o){if(arguments.length<1){throw"Wrong number of arguments. RT.Search requires at least a bounding rectangle."}switch(arguments.length){case 1:arguments[1]=false;case 2:arguments[2]=[];case 3:arguments[3]=f;default:arguments.length=4}return(m.apply(this,arguments))};this.toJSON=function(x,C){var z=[];var u=[];var y={};var q=3;var A=1;var p="";if(x&&!RTree.Rectangle.overlap_rectangle(x,f)){return""}if(!C){u.push(f.nodes.length);z.push(f.nodes);p+="var main_tree = {x:"+f.x.toFixed()+",y:"+f.y.toFixed()+",w:"+f.w.toFixed()+",h:"+f.h.toFixed()+",nodes:["}else{q+=4;u.push(C.nodes.length);z.push(C.nodes);p+="var main_tree = {x:"+C.x.toFixed()+",y:"+C.y.toFixed()+",w:"+C.w.toFixed()+",h:"+C.h.toFixed()+",nodes:["}do{var o=z.pop();var t=u.pop()-1;if(t>=0&&t<o.length-1){p+=","}while(t>=0){var w=o[t];if(!x||RTree.Rectangle.overlap_rectangle(x,w)){if(w.nodes){if(A>=q){var v=y.length;var s=i("saved_subtree");p+="{x:"+w.x.toFixed()+",y:"+w.y.toFixed()+",w:"+w.w.toFixed()+",h:"+w.h.toFixed()+",load:'"+s+".js'}";y[s]=this.toJSON(x,w);if(t>0){p+=","}}else{p+="{x:"+w.x.toFixed()+",y:"+w.y.toFixed()+",w:"+w.w.toFixed()+",h:"+w.h.toFixed()+",nodes:[";A+=1;u.push(t);z.push(o);o=w.nodes;t=w.nodes.length}}else{if(w.leaf){var r=w.leaf.toJSON?w.leaf.toJSON():JSON.stringify(w.leaf);p+="{x:"+w.x.toFixed()+",y:"+w.y.toFixed()+",w:"+w.w.toFixed()+",h:"+w.h.toFixed()+",leaf:"+r+"}";if(t>0){p+=","}}else{if(w.load){p+="{x:"+w.x.toFixed()+",y:"+w.y.toFixed()+",w:"+w.w.toFixed()+",h:"+w.h.toFixed()+",load:'"+w.load+"'}";if(t>0){p+=","}}}}}t-=1}if(t<0){p+="]}";A-=1}}while(z.length>0);p+=";";for(var B in y){p+="\nvar "+B+" = function(){"+y[B]+" return(main_tree);};"}return(p)};this.remove=function(p,r){if(arguments.length<1){throw"Wrong number of arguments. RT.remove requires at least a bounding rectangle."}switch(arguments.length){case 1:arguments[1]=false;case 2:arguments[2]=f;default:arguments.length=3}if(arguments[1]===false){var o=0;var q=[];do{o=q.length;q=q.concat(e.apply(this,arguments))}while(o!=q.length);return q}else{return(e.apply(this,arguments))}};this.insert=function(o,p){if(arguments.length<2){throw"Wrong number of arguments. RT.Insert requires at least a bounding rectangle and an object."}return(h({x:o.x,y:o.y,w:o.w,h:o.h,leaf:p},f))}};RTree.Rectangle=function(c,b,d,k){var i,a,f,g,j,e;if(c.x){i=c.x;f=c.y;if(c.w!==0&&!c.w&&c.x2){j=c.x2-c.x;e=c.y2-c.y}else{j=c.w;e=c.h}a=i+j;g=f+e}else{i=c;f=b;j=d;e=k;a=i+j;g=f+e}this.x1=this.x=function(){return i};this.y1=this.y=function(){return f};this.x2=function(){return a};this.y2=function(){return g};this.w=function(){return j};this.h=function(){return e};this.toJSON=function(){return('{"x":'+i.toString()+', "y":'+f.toString()+', "w":'+j.toString()+', "h":'+e.toString()+"}")};this.overlap=function(h){return(this.x()<h.x2()&&this.x2()>h.x()&&this.y()<h.y2()&&this.y2()>h.y())};this.expand=function(l){var h=Math.min(this.x(),l.x());var m=Math.min(this.y(),l.y());j=Math.max(this.x2(),l.x2())-h;e=Math.max(this.y2(),l.y2())-m;i=h;f=m;return(this)};this.setRect=function(n,m,o,u){var s,l,q,r,t,p;if(n.x){s=n.x;q=n.y;if(n.w!==0&&!n.w&&n.x2){t=n.x2-n.x;p=n.y2-n.y}else{t=n.w;p=n.h}l=s+t;r=q+p}else{s=n;q=m;t=o;p=u;l=s+t;r=q+p}}};RTree.Rectangle.overlap_rectangle=function(d,c){return(d.x<(c.x+c.w)&&(d.x+d.w)>c.x&&d.y<(c.y+c.h)&&(d.y+d.h)>c.y)};RTree.Rectangle.contains_rectangle=function(d,c){return((d.x+d.w)<=(c.x+c.w)&&d.x>=c.x&&(d.y+d.h)<=(c.y+c.h)&&d.y>=c.y)};RTree.Rectangle.expand_rectangle=function(e,d){var c=Math.min(e.x,d.x);var f=Math.min(e.y,d.y);e.w=Math.max(e.x+e.w,d.x+d.w)-c;e.h=Math.max(e.y+e.h,d.y+d.h)-f;e.x=c;e.y=f;return(e)};RTree.Rectangle.make_MBR=function(a,c){if(a.length<1){return({x:0,y:0,w:0,h:0})}if(!c){c={x:a[0].x,y:a[0].y,w:a[0].w,h:a[0].h}}else{c.x=a[0].x}c.y=a[0].y;c.w=a[0].w;c.h=a[0].h;for(var b=a.length-1;b>0;b--){RTree.Rectangle.expand_rectangle(c,a[b])}return(c)};

/*
  FRegion.js, version 0.1
*/
var FRegion=function(b){var c=new Array();var d=new Array();var a=false;if(b&&typeof b=="object"){c=b}this.insert=function(e){c.push(e);a=false};this.add=function(e){c.concat(e);a=false};this.sort=function(e){if(a&&!e){return}c.sort(function(g,f){return g.start-f.start});c.every(function(g,f){g.index=f;return true});d=c.slice();d.sort(function(g,f){return g.end-f.end});a=true};this.bruteForceSearch=function(j){var h=new Array();var f=j.x;var e=f+j.w;for(var g=0;g<c.length;g++){if(c[g].start<e&&c[g].end>f){h.push(c[g])}}return h};this.binarySearch=function(i){if(!a){this.sort()}var h=i.x;var f=h+i.w;var g=this.findFirstEndingAfterX(h);var e=this.findLastStartingBeforeX(f);if(c[g].start<f&&c[g].end>h){return c.slice(g,e+1)}else{return[]}};this.findLastStartingBeforeX=function(e,h,g){if(!a){this.sort()}if(d[d.length-1].end<e){return d[d.length-1].index}if(h===undefined){h=0}if(g===undefined){g=c.length-1}var f=Math.floor((g+h)/2);if(h==f){return h}else{if(c[f].start<e){return this.findLastStartingBeforeX(e,f,g)}else{if(c[f].start>=e){return this.findLastStartingBeforeX(e,h,f)}}}};this.findFirstEndingAfterX=function(e,h,g){if(!a){this.sort()}if(d[0].end>e){return d[0].index}if(h===undefined){h=0}if(g===undefined){g=d.length-1}var f=Math.ceil((g+h)/2);if(g==f){return d[g].index}else{if(d[f].end<e){return this.findFirstEndingAfterX(e,f,g)}else{if(d[f].end>=e){return this.findFirstEndingAfterX(e,h,f)}}}};this.search=function(e){if(!c.length){return[]}return this.binarySearch(e)};this.getElement=function(e){return c[e]}};




(function($){

/*
  Genoverse.js
*/
var Genoverse = Base.extend({

  // Defaults
  urlParamTemplate : 'r=__CHR__:__START__-__END__', // Overwrite this for your URL style
  width            : 1000,
  height           : 200,
  labelWidth       : 90,
  buffer           : 1,
  longestLabel     : 30,
  trackSpacing     : 2,
  tracks           : [],
  tracksById       : {},
  menus            : [],
  plugins          : [],
  dragAction       : 'scroll', // options are: scroll, select, off
  wheelAction      : 'zoom',   // options are: zoom, off
  colors           : {
    background     : '#FFFFFF',
    majorGuideLine : '#CCCCCC',
    minorGuideLine : '#E5E5E5',
    sortHandle     : '#CFD4E7'
  },
  
  constructor: function (config) {
    if (!this.supported()) {
      this.die('Your browser does not support this functionality');
    }

    // Make sure container is a jquery thingy, jQuery recognises itself automatically
    config.container = $(config.container);

    $.extend(this, config);
    var browser = this;

    $.when(browser.loadPlugins()).always(function(){
      for (var key in browser) {
        if (typeof browser[key] === 'function' && !key.match(/^(base|extend|constructor|functionWrap|debugWrap)$/)) {
          browser.functionWrap(key);
        }
      }
      browser.init();
    });
  },

  loadPlugins: function () {
    var browser = this;
    var loadPluginsTask = $.Deferred();

    // Load plugins css file
    browser.plugins.every(function (plugin, index, array) {
      LazyLoad.css(browser.origin + '/css/' + plugin + '.css');
      return true;
    });

    $.when.apply(
      $, 
      $.map(browser.plugins, function (plugin) {
        return $.ajax({
          url      : browser.origin + '/js/plugins/' + plugin + '.js',
          dataType : "text",
        });
      })
    ).done(function () {
      (function($, scripts){
        // Localize variables
        var $ = $;
        for (var i=0; i<scripts.length; i++) {
          try {
            eval(scripts[i][0]);
          } catch (e) {
            // TODO: add plugin name to this message
            console.log("Error evaluating plugin script: " + e);
            console.log(scripts[i][0]);
          };
        }
      })($, browser.plugins.length == 1 ? [ arguments ] : arguments);
    }).always(function(){
      loadPluginsTask.resolve();
    });

    return loadPluginsTask;
  },

  init: function () {
    var browser = this;
    var width   = this.width;

    if (!(this.container && this.container.length)) {
      this.die('You must supply a ' + (this.container ? 'valid ' : '') + 'container element');
    }

    this.container.addClass('canvas_container');
   
    this.paramRegex = this.urlParamTemplate ? new RegExp('([?&;])' + this.urlParamTemplate
      .replace(/(\b(\w+=)?__CHR__(.)?)/,   '$2(\\w+)$3')
      .replace(/(\b(\w+=)?__START__(.)?)/, '$2(\\d+)$3')
      .replace(/(\b(\w+=)?__END__(.)?)/,   '$2(\\d+)$3') + '([;&])'
    ) : '';
    
    this.history          = {};
    this.prev             = {};
    this.backgrounds      = {};
    this.urlParamTemplate = this.urlParamTemplate || '';
    this.useHash          = typeof window.history.pushState !== 'function';
    this.proxy            = $.support.cors ? false : this.proxy;
    this.textWidth        = document.createElement('canvas').getContext('2d').measureText('W').width;
    this.menuContainer    = $('<div class="menu_container">').css({ width: width - 1, left: 1 }).appendTo(this.container);

    this.labelContainer   = $('<ul class="label_container">').appendTo(this.container).sortable({
      items       : 'li:not(.unsortable)',
      handle      : '.handle',
      placeholder : 'label',
      axis        : 'y',
      helper      : 'clone',
      cursor      : 'move',
      start       : function (e, ui) {
        ui.placeholder.css({ height: ui.item.height(), visibility: 'visible', background: browser.colors.sortHandle }).html(ui.item.html());
        ui.helper.hide();
      },
      update      : function (e, ui) {
        browser.tracks[ui.item.data('index')].container[ui.item[0].previousSibling ? 'insertAfter' : 'insertBefore'](browser.tracks[$(ui.item[0].previousSibling || ui.item[0].nextSibling).data('index')].container);
      }
    });

    this.labelWidth       = this.labelContainer.outerWidth(true);
    this.wrapperLeft      = this.labelWidth - width;
    this.width           -= this.labelWidth;

    this.wrapper  = $('<div class="wrapper">').appendTo(this.container);
    this.selector = $('<div class="selector crosshair"></div>').appendTo(this.wrapper);

    this.container.width(width);
    
    this.selectorControls = $('                      \
      <div class="selector_controls">                \
        <button class="zoomHere">Zoom here</button>  \
        <button class="center">Center</button>       \
        <button class="summary">Summary</button>     \
        <button class="cancel">Cancel</button>       \
      </div>                                         \
    ').appendTo(this.selector);
    
    this.zoomInHighlight = $('     \
      <div class="canvas_zoom i">  \
        <div class="t l h"></div>  \
        <div class="t r h"></div>  \
        <div class="t l v"></div>  \
        <div class="t r v"></div>  \
        <div class="b l h"></div>  \
        <div class="b r h"></div>  \
        <div class="b l v"></div>  \
        <div class="b r v"></div>  \
      </div>                       \
    ').appendTo('body');
    
    this.zoomOutHighlight = this.zoomInHighlight.clone().toggleClass('i o').appendTo('body');
    
    var coords = this.chr && this.start && this.end ? { chr: this.chr, start: this.start, end: this.end } : this.getCoords();
    
    this.chr = coords.chr;
    
    this.setRange(coords.start, coords.end);
    this.setHistory();
    this.setTracks();
    this.makeImage();
    this.addUserEventHandlers();
  },

  addUserEventHandlers: function () {
    var browser = this;
    
    this.container.on({
      mousedown: function (e) {
        // Only scroll on left click, and do nothing if clicking on a button in selectorControls
        if ((!e.which || e.which === 1) && !(this === browser.selector[0] && e.target !== this)) {
          browser.mousedown(e);
        }
        
        return false;
      },
      mousewheel: function (e, delta) {
        if (browser.wheelAction === 'zoom') {
          return browser.mousewheelZoom(e, delta);
        }
      }
    }, '.image_container, .overlay, .selector');

    $(document).on({
      mouseup   : $.proxy(this.mouseup,   this),
      mousemove : $.proxy(this.mousemove, this),
      keydown   : $.proxy(this.keydown,   this),
      keyup     : $.proxy(this.keyup,     this)
    });
    
    this.selectorControls.on('click', function (e) {
      var left  = browser.selector.position().left;
      var width = browser.selector.outerWidth(true);
      var start = Math.round(left / browser.scale) + browser.start;
      var end   = Math.round((left + width) / browser.scale) + browser.start - 1;
          end   = end <= start ? start : end;
      
      switch (e.target.className) {
        case 'zoomHere' : browser.setRange(start, end, true); break;
        case 'center'   : browser.startDragScroll(); browser.move(null, browser.width / 2 - (left + width / 2), 'fast', $.proxy(browser.stopDragScroll, browser)); break;
        case 'summary'  : browser.summary(start, end); break;
        case 'cancel'   : browser.cancelSelect(); break;
        default         : break;
      }
    });
    
    this.container.on('click', '.menu .close', function () {
      $(this).parent().fadeOut('fast', function () { $(this).remove() });
    });
    
    if (this.useHash) {
      $(window).on('hashchange', function () {  
        browser.popState();
      });
    } else {
      window.onpopstate = function () {
        browser.popState();
      };
    }
  },
  
  reset: function () {
    var i = this.tracks.length;
    
    while (i--) {
      this.tracks[i].reset();
    }
    
    this.scale   = 9e99; // arbitrary value so that setScale resets track scales as well
    this.history = {};
    
    this.setRange(this.start, this.end);
    this.makeImage();
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
    this.dragging   = true;
    this.scrolling  = !e;
    this.prev.left  = this.left;
    this.dragOffset = e ? e.pageX - this.left : 0;
    this.dragStart  = this.start;
  },

  stopDragScroll: function (e, update) {
    this.dragging  = false;
    this.scrolling = false;
    
    $('.overlay', this.wrapper).add('.menu', this.menuContainer).add(this.selector).css({
      left       : function (i, left) { return (this.className.indexOf('selector') === -1 ? 0 : 1) + parseFloat(left, 10) + parseFloat($(this).css('marginLeft'), 10); },
      marginLeft : function ()        { return  this.className.indexOf('selector') === -1 ? 0 : -1 }
    });
    
    if (update !== false) {
      if (this.start !== this.dragStart) {
        this.updateURL();
        this.setHistory();
        this.redraw();
      }
      
      this.checkTrackSize();
    }
  },

  startDragSelect: function (e) {
    if (!e) {
      return false;
    }
    
    var x = Math.max(0, e.pageX - this.wrapper.offset().left - 2);
    
    this.dragging        = true;
    this.selectorStalled = false;
    this.selectorStart   = x;
    
    this.selector.css({ left: x, width: 0 }).removeClass('crosshair');
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
    
    this.selectorControls.css({
      marginTop : -this.selectorControls.outerHeight() / 2,
      left      : this.selector.outerWidth(true) / 2 - this.selectorControls.outerWidth(true) / 2
    }).show();
  },

  cancelSelect: function () {
    this.dragging        = false;
    this.selectorStalled = false;
    
    this.selector.addClass('crosshair').width(0);
    this.selectorControls.hide();
    
    if (this.dragAction === 'scroll') {
      this.selector.hide();
    }
  },

  dragSelect: function (e) {
    var x = e.pageX - this.wrapper.offset().left - 2;

    if (x > this.selectorStart) {
      this.selector.css({ 
        left  : this.selectorStart, 
        width : Math.min(x - this.selectorStart, this.width - this.selectorStart) - 4
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
      this.selector.addClass('crosshair').width(0).show();
    } else if (keepSelect && !this.selector.hasClass('crosshair')) {
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
  
  mouseup: function (e, update) {
    if (!this.dragging) {
      return false;
    }
    
    switch (this.dragAction) {
      case 'select' : this.stopDragSelect(e);         break;
      case 'scroll' : this.stopDragScroll(e, update); break;
      default       : break;
    }
  },
  
  mousemove: function (e) {
    if (this.dragging && !this.scrolling) {
      switch (this.dragAction) {
        case 'scroll' : this.move(e);       break;
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

  move: function (e, delta, speed, callback) {
    var wrapperOffset = this.wrapper.offset().left;
    var start, end, step;
    
    this.left = e ? e.pageX - this.dragOffset : this.left + delta;
    
    if (this.menus.length) this.closeMenus();

    if (this.scale > 1) {
      this.left = Math.round(this.left / this.scale) * this.scale; // Force stepping by base pair when in small regions
      
      if (delta) {
        delta = Math.round(delta / this.scale) * this.scale;
      }
    }
    
    if (this.left < this.minLeft) {
      this.left = this.minLeft;
      
      start = this.chromosomeSize - this.length + 1;
      end   = this.chromosomeSize;
    } else if (this.left > this.maxLeft) {
      this.left = this.maxLeft;
      
      start = 1;
      end   = this.length;
    } else {
      start = e ? this.dragStart - (this.left - this.prev.left) / this.scale : this.start - delta / this.scale;
      end   = start + this.length - 1;
    }
    
    if (speed) {
      $.when($('.track_container', this.container).stop().animate({ left: this.left }, speed).add(
        $('.overlay', this.wrapper).add('.menu', this.menuContainer).stop().animate({ marginLeft: this.left - this.prev.left }, speed).add(
          this.selector.stop().animate({ marginLeft: this.left - this.prev.left - 1 }, speed)
        )
      )).done(function () {
        if (typeof callback === 'function') {
          callback();
        }
      });
    } else {
      $('.track_container', this.container).css('left', this.left);
      $('.overlay', this.wrapper).add('.menu', this.menuContainer).css('marginLeft', this.left - this.prev.left);
      this.selector.css('marginLeft', this.left - this.prev.left - 1);
      
      if (typeof callback === 'function') {
        callback();
      }
    }
    
    $('.expander', this.wrapper).css('left', -this.left);
    $('.image_container img.static', this.container).css('marginLeft', function () { return wrapperOffset - $(this.parentNode).offset().left; });
    
    this.setRange(start, end);
    
    if (this.redraw()) {
      step = this.left - this.prev.left > 0 ? 1 : -1;
      
      this.stopDragScroll(e, false);
      this.startDragScroll(e);
      this.move(false, step); // Force the scroll on 1px in order to ensure the URL updates correctly (otherwise it might not if scrolling a very small amount on the boundary)
    }
  },
  
  checkTrackSize: function () {
    if (this.dragging) {
      return;
    }
    
    for (var i = 0; i < this.tracks.length; i++) {
      if (!this.tracks[i].fixedHeight) {
        this.tracks[i].checkSize();
        
        if (this.tracks[i].autoHeight || this.tracks[i].separateLabels) {
          this.tracks[i].resize(this.tracks[i][this.tracks[i].autoHeight ? 'fullVisibleHeight' : 'height'], this.tracks[i].labelTop);
        } else {
          this.tracks[i].toggleExpander();
        }
      }
    }
  },

  resetTrackHeights: function () {
    var track;
    
    for (var i = 0; i < this.tracks.length; i++) {
      track = this.tracks[i];
      
      if (track.resizable) {
        // track.autoHeight = !!([ (track.config || {}).autoHeight, track.defaults.autoHeight, this.autoHeight ].sort(function (a, b) {
        //   return (typeof a !== 'undefined' && a !== null ? 0 : 1) - (typeof b !== 'undefined' && b !== null ?  0 : 1);
        // })[0]);
        
        track.heightToggler[track.autoHeight ? 'addClass' : 'removeClass']('auto_height');
        track.resize(track.height + track.spacing);
      }
    }
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
    
    if (start < 1) {
      start = 1;
    }
    
    if (end > this.chromosomeSize) {
      end = this.chromosomeSize;
    }
    
    this.setRange(start, end, true);
  },
  
  redraw: function () {
    if (this.left === 0 || (this.left > 0 && this.left < this.offsets.right) || (this.left < 0 && Math.abs(this.left) < Math.abs(this.offsets.left + this.wrapperLeft))) {
      return false;
    }
    
    this.makeImage();
    
    return true;
  },
  
  setRange: function (start, end, update, force) {
    this.prev.start = this.start;
    this.prev.end   = this.end;
    this.start      = typeof start === 'number' ? Math.floor(start) : parseInt(start, 10);
    this.end        = typeof end   === 'number' ? Math.floor(end)   : parseInt(end,   10);
    
    if (this.start < 1) {
      this.start = 1;
    }
    
    if (this.end > this.chromosomeSize) {
      this.end = this.chromosomeSize;
    }
    
    this.length = this.end - this.start + 1;
    
    this.setScale(force);
    
    if (update === true && (this.prev.start !== this.start || this.prev.end !== this.end)) {
      this.updateURL();
      this.setHistory();
      this.makeImage();
    }
  },
  
  setScale: function (force) {
    this.prev.scale  = this.scale;
    this.scale       = this.width / this.length;
    this.scaledStart = this.start * this.scale;
    
    if (force || this.prev.scale !== this.scale) {
      this.dataRegion  = { start: 9e99, end: -9e99 };
      this.offsets     = { right: this.width, left: -this.width };
      this.left        = 0;
      this.prev.left   = 0;
      this.minLeft     = Math.round((this.end   - this.chromosomeSize) * this.scale);
      this.maxLeft     = Math.round((this.start - 1) * this.scale);
      this.scrollStart = 'ss_' + this.start + '_' + this.end;
      this.labelBuffer = Math.ceil(this.textWidth / this.scale) * this.longestLabel;
      
      if (this.prev.scale) {
        var i = this.tracks.length;
        
        this.cancelSelect();
        this.menuContainer.children().hide();
        
        while (i--) {
          this.tracks[i].setScale();
        }
        
        if (this.backgrounds) {
          for (var c in this.backgrounds) {
            i = this.backgrounds[c].length;
            
            while (i--) {
              this.backgrounds[c][i].scaledStart = this.backgrounds[c][i].start * this.scale;
              this.backgrounds[c][i].scaledEnd   = this.backgrounds[c][i].end   * this.scale;
            }
          }
        }
      }
    }
  },
  
  setTracks: function (tracks, index) {
    var defaults = {
      browser         : this,
      width           : this.width
    };
    
    var push = !!tracks;
    var hierarchy, Class, subClass;
    
    tracks = tracks || this.tracks;
    index  = index  || 0;
    
    for (var i = 0; i < tracks.length; i++) {
      if (typeof tracks[i].extend === 'function') {
        continue;
      }
      
      // Well, this is probably ugly, there could be a nicer way of doing it.
      hierarchy = (tracks[i].type || '').split('.');
      Class     = Genoverse.Track;
      
      while (subClass = hierarchy.shift()) {
        Class = Class[subClass];
      }
      
      tracks[i] = new Class($.extend(tracks[i], defaults, { index: i + index }));

      if (push) {
        this.tracks.push(tracks[i]);
      }
      
      if (tracks[i].strand === -1 && tracks[i].orderReverse) {
        tracks[i].order = tracks[i].orderReverse;
      }

      if (tracks[i].id) {
        this.tracksById[tracks[i].id] = tracks[i];
      }
    }
    
    if (!push) {
      this.sortTracks(); // initial sort
    }
    
    return tracks;
  },
  
  addTracks: function (tracks) {
    this.setTracks(tracks, this.tracks.length);
    this.sortTracks();
    this.makeTrackImages(tracks);
  },
  
  removeTracks: function (tracks) {
    var i      = tracks.length;
    var redraw = false;
    var track, j, k, bg;
    
    tracks.sort(function (a, b) { return a.index - b.index; }); // tracks must be ordered low to high by index for splice to work correctly (splice is done in track.remove())
    
    while (i--) {
      track = tracks[i];
      j     = track.backgrounds ? track.backgrounds.length : 0;
      
      while (j--) {
        bg = this.backgrounds[track.backgrounds[j].background];
        k  = bg.length;
        
        while (k--) {
          if (bg[k] === track.backgrounds[j]) {
            bg.splice(k, 1);
            redraw = true;
            break;
          }
        }
        
        if (bg.length === 0) {
          delete this.backgrounds[track.backgrounds[j].background];
        }
      }
      
      track.remove();
    }
    
    this.updateTracks(redraw);
  },
  
  updateTracks: function (redrawBackground) {
    var i = this.tracks.length;
    
    while (i--) {
      // redraw all backgrounds if a track which contributed to this.backgrounds has been added removed
      if (redrawBackground) {
        $(this.tracks[i].imgContainers).each(function () {
          $(this).children('.bg').remove().end().data('img').drawBackground();
        });
      }
      
      // correct track index
      if (this.tracks[i].index !== i) {
        this.tracks[i].index = i;
        this.tracks[i].label.data('index', i);
      }
    }
  },
  
  sortTracks: function () {
    var sorted     = $.extend([], this.tracks).sort(function (a, b) { return a.order - b.order; });
    var labels     = $();
    var containers = $();
    
    for (var i = 0; i < sorted.length; i++) {
      labels.push(sorted[i].label[0]);
      containers.push(sorted[i].canvas[0], sorted[i].container.detach()[0]);
    }
    
    this.labelContainer.append(labels);
    this.wrapper.append(containers);
    
    sorted = labels = containers = null;
  },
  
  makeImage: function () {
    var left = -this.left;
    var dir  = left < 0 ? 'right' : 'left';
    var start, end;
    
    if (left) {
      start = left > 0 ? this.dataRegion.end   : this.dataRegion.start - (this.buffer * this.length);
      end   = left < 0 ? this.dataRegion.start : this.dataRegion.end   + (this.buffer * this.length);
    } else {
      start = Math.max(this.start - this.length, 1);
      end   = Math.min(this.end   + this.length + 1, this.chromosomeSize);
    }
    
    var width = Math.round((end - start) * this.scale);
    
    this.dataRegion.start = Math.min(start, this.dataRegion.start);
    this.dataRegion.end   = Math.max(end,   this.dataRegion.end);
    this.offsets[dir]    += width;
    
    if (this.updateFromHistory()) {
      return;
    }
    
    this.makeTrackImages(this.tracks, start, end, width);
  },
  
  makeTrackImages: function (tracks, start, end, width) {
    start = start || this.dataRegion.start;
    end   = end   || this.dataRegion.end;
    width = width || Math.round((end - start + 1) * this.scale);
    
    // Maximum texture width is 32Kb. Above this, images will fail to load.
    // FIXME: rewrite so that addTrack/setRenderer cannot create an image that is this wide
    if (width > 32 * 1024) {
      return this.reset();
    }
    
    var browser    = this;
    var left       = -this.left;
    var dataRegion = $.extend({}, this.dataRegion);
    var offsets    = $.extend({}, this.offsets);
    var allTracks  = tracks.length === this.tracks.length;
    var overlay    = this.makeOverlays(width, allTracks ? false : tracks);
    
    function removeOverlay() {
      if (overlay) {
        overlay.remove();
        overlay = null;
      }
    }
    
    $.when.apply($, $.map(tracks, function (track) { return track.makeImage(start, end, width, left, browser.scrollStart); })).done(function () {
      var redraw = false;
      
      $.when.apply($, $.map($.map(arguments, function (a) {
        $(a.target).show();
        return a.img;
      }), function (i) {
        if (i.track.backgrounds && !allTracks) {
          i.track.scaleFeatures(i.track.backgrounds);
          redraw = true;
        }
        
        return i.drawBackground();
      })).done(removeOverlay);
      
      if (allTracks) {
        browser.prev.history = browser.start + '-' + browser.end;
        browser.setHistory(dataRegion, offsets);
      } else {
        browser.updateTracks(redraw);
      }
      
      browser.checkTrackSize();
    }).fail(removeOverlay);
  },
  
  makeOverlays: function (width, tracks) {
    var overlay = $('<div class="overlay">').css({ left: this.left && !tracks ? (width - (Math.abs(this.left) % width)) * (width > Math.abs(this.left) || this.left > 0 ? -1 : 1) : -this.offsets.right, width: width });
    
    if (tracks) {
      overlay = $($.map(
        $.map(tracks, function (t) { return [ t, t.forwardTrack || t.reverseTrack ]; }),
        function (track) { return track ? overlay.clone().addClass('track').css({ top: track.container.position().top, height: track.height })[0] : false; }
      ));
    }
    
    return overlay.prependTo(this.wrapper);
  },
  
  updateURL: function () {
    if (!this.urlParamTemplate) {
      return;
    }
    
    if (this.useHash) {
      window.location.hash = this.getQueryString();
    } else {
      window.history.pushState({}, '', this.getQueryString());
    }
  },
  
  setHistory: function (dataRegion, offsets) {
    if (this.prev.history) {
      var history = {
        dataRegion : dataRegion || this.history[this.prev.history].dataRegion,
        offsets    : offsets    || this.history[this.prev.history].offsets
      };
      
      if (!this.history[this.start + '-' + this.end] || (dataRegion && offsets)) {
        this.history[this.start + '-' + this.end] = $.extend({
          left        : this.left,
          scrollStart : this.scrollStart
        }, history);
      }
      
      if (dataRegion && offsets) {
        for (var i in this.history) {
          if (this.history[i].scrollStart === this.scrollStart) {
            $.extend(this.history[i], history);
          }
        }
      }
    }
  },
  
  popState: function () {
    var coords = this.getCoords();
    
    if (coords.start && !(parseInt(coords.start, 10) === this.start && parseInt(coords.end, 10) === this.end)) {
      this.setRange(coords.start, coords.end);
      
      if (!this.updateFromHistory()) {
        this.reset();
      }
    }
    
    var delta = Math.round((this.start - this.prev.start) * this.scale);
    
    $('.menu', this.menuContainer).css('left', function (i, left) { return parseFloat(left, 10) - delta; });
  },
  
  updateFromHistory: function () {
    var history = this.history[this.start + '-' + this.end];
    
    if (history && (this.prev.start !== this.start || this.prev.end !== this.end)) {
      var images = $('.track_container .' + history.scrollStart, this.container);
      
      if (images.length) {
        var newTracks = $.grep(this.tracks, function (track) { return !$(track.imgContainers).filter('.' + history.scrollStart).length; });
        
        $('.track_container', this.container).css('left', history.left).children('.image_container').hide();
        
        $.extend(this, history);
        
        if (newTracks.length) {
          this.makeTrackImages(newTracks);
        }
        
        this.checkTrackSize();
        
        images.show();
        images = null;
        
        return true;
      }
    }
    
    return false;
  },
  
  getCoords: function () {
    var match  = ((this.useHash ? window.location.hash.replace(/^#/, '?') || window.location.search : window.location.search) + '&').match(this.paramRegex).slice(2, -1);
    var coords = {};
    var i      = 0;
    
    $.each(this.urlParamTemplate.split('__'), function () {
      var tmp = this.match(/^(CHR|START|END)$/);
      
      if (tmp) {
        coords[tmp[1].toLowerCase()] = match[i++];
      }
    });
    
    return coords;
  },
  
  getQueryString: function () {
    var location = this.urlParamTemplate
      .replace('__CHR__',   this.chr)
      .replace('__START__', this.start)
      .replace('__END__',   this.end);
    
    return this.useHash ? location : (window.location.search + '&').replace(this.paramRegex, '$1' + location + '$5').slice(0, -1);
  },
    
  supported: function () {
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
  },
  
  die: function (error) {
    alert(error);
    throw(error);
  },
  
  menuTemplate: $('               \
    <div class="menu">            \
      <div class="close">x</div>  \
      <table></table>             \
    </div>                        \
  '),
  

  makeMenu: function (feature, position, track) {
    var wrapper = this.wrapper;
    var offset  = wrapper.offset();
    var menu    = this.menuTemplate.clone().appendTo(this.container);

    //debugger;
    //position.top  -= offset.top;
    //position.left -= offset.left;
    //position.left  = Math.min(position.left, this.width - menu.outerWidth());
    //menu.css(position);

    this.menus.push(menu);
    
    if (track) {
      track.menus.push(menu[0]);
    }
    
    $.when(track ? track.populateMenu(feature) : feature).done(function (feature) {
      $('table', menu).append(
        (feature.title ? '<tr class="header"><th colspan="2" class="title">' + feature.title + '</th></tr>' : '') +
        $.map(feature, function (value, key) {
          if (key !== 'title') {
            return '<tr><td>'+ key +'</td><td>'+ value +'</td></tr>';
          }
        }).join()
      );
      
      menu.show();
      menu.css(
        position || 
        { 
          top  : offset.top  + 100,
          left : offset.left + (wrapper.outerWidth(true) - menu.outerWidth(true))/2
        }
      );
    });
    
    return menu;
  },

  closeMenus: function () {
    var i = this.menus.length;
    while (i--) {
      this.menus[i].fadeOut('fast', function () { $(this).remove() });
    }
    this.menus = [];
  },

  // Provide summary of a region (as a popup menu)
  summary: function (start, end) {
    alert(
      'Not implemented' + "\n" +
      'Start: ' + start + "\n" +
      'End: '   + end   + "\n"
    );
  },

  /**
   * functionWrap - wraps event handlers and adds debugging functionality
   **/
  functionWrap: function (key, obj) {
    var func = key.substring(0, 1).toUpperCase() + key.substring(1);
        name = (obj ? (obj.name || '') + '(' + (obj.type || 'Track.') + ')' : 'Genoverse.') + key;
        obj  = obj || this;
    
    if (obj.debug) {
      this.debugWrap(obj, key, name, func);
    }
    
    // turn function into system event, enabling eventHandlers for before/after the event
    if (obj.systemEventHandlers['before' + func] || obj.systemEventHandlers['after' + func]) {
      obj['__original' + func] = obj[key];

      obj[key] = function () {
        var i, rtn;
        
        if (this.systemEventHandlers['before' + func]) {
          for (i = 0; i < this.systemEventHandlers['before' + func].length; i++) {
            // TODO: Should it stop once beforeFunc returned false or something??
            this.systemEventHandlers['before' + func][i].apply(this, arguments);
          }
        }
        
        rtn = this['__original' + func].apply(this, arguments);
        
        if (this.systemEventHandlers['after' + func]) {
          for (i = 0; i < this.systemEventHandlers['after' + func].length; i++) {
            // TODO: Should it stop once afterFunc returned false or something??
            this.systemEventHandlers['after' + func][i].apply(this, arguments);
          }
        }
        
        return rtn;
      };
    }
  },
  
  debugWrap: function (obj, key, name, func) {
    // Debugging functionality
    // Enabled by "debug": true || { functionName: true, ...} option
    // if "debug": true, simply log function call
    if (obj.debug === true) {
      if (!obj.systemEventHandlers['before' + func]) {
        obj.systemEventHandlers['before' + func] = [];
      }
      
      obj.systemEventHandlers['before' + func].unshift(function () {
        console.log(name + ' is called');
      });
    }
    
    // if debug: { functionName: true, ...}, log function time
    if (typeof obj.debug === 'object' && obj.debug[key]) {
      if (!obj.systemEventHandlers['before' + func]) {
        obj.systemEventHandlers['before' + func] = [];
      }
      
      if (!obj.systemEventHandlers['after' + func]) {
        obj.systemEventHandlers['after' + func] = [];
      }
      
      obj.systemEventHandlers['before' + func].unshift(function () {
        console.time(name);
      });
      
      obj.systemEventHandlers['after' + func].push(function () {
        console.timeEnd(name);
      });
    }
  },
  
  systemEventHandlers: {}
}, {
  on: function (events, handler) {
    $.each(events.split(' '), function () {
      if (typeof Genoverse.prototype.systemEventHandlers[this] === 'undefined') {
        Genoverse.prototype.systemEventHandlers[this] = [];
      }
      
      Genoverse.prototype.systemEventHandlers[this].push(handler);
    });
  }
});

window.Genoverse = Genoverse;




/*
  Track.js
*/
Genoverse.Track = Base.extend({

  // Defaults
  height         : 12,
  dataType       : 'json',
  fontSize       : 10,
  fontFamily     : 'sans-serif',
  fontWeight     : 'normal',
  bump           : false,
  bumpSpacing    : 2,
  featureSpacing : 1,
  urlParams      : {},
  urlTemplate    : {},
  inherit        : [],
  xhrFields      : {},

  constructor: function (config) {
    // Deep clone all [..] and {..} objects in this to prevent sharing between instances
    var deepCopy = {};
    for (var key in this) {
      if (typeof this[key] === 'object') deepCopy[key] = this[key];
    }
    this.extend($.extend(true, {}, deepCopy));

    // Use Base.extend to make any funciton in config have this.base
    this.extend(config);
    var track = this;
    
    for (var i = 0; i < this.inherit.length; i++) {
      if (Genoverse.Track[this.inherit[i]]) {
        this.extend(Genoverse.Track[this.inherit[i]]);
      }
    }
    
    if (typeof this.inheritedConstructor === 'function') {
      this.inheritedConstructor(config);
    }
    
    for (var key in this) {
      if (typeof this[key] === 'function' && !key.match(/^(base|extend|constructor|functionWrap|debugWrap)$/)) {
        this.browser.functionWrap(key, this);
      }
    }
    
    if (this.url) {
      this.url = this.url.split('?');
      
      if (this.url[1]) {
        $.each(this.url[1].split(/[;&]/), function () {
          var tmp = this.split('=');
          track[tmp[1].match(/__(CHR|START|END)__/) ? 'urlTemplate' : 'urlParams'][tmp[0]] = tmp[1];
        });
      }
      
      this.url = this.url[0];
      
      if (this.browser.proxy) {
        this.urlParams.url = this.url;
        this.url = this.browser.proxy;
      }
    }
    
    this.addDomElements(config);
    this.addUserEventHandlers();
    this.init();
    this.setScale();
  },

  addDomElements: function (config) {
    var track = this;

    this.order          = typeof this.order          !== 'undefined' ? this.order          : this.index;
    this.separateLabels = typeof this.separateLabels !== 'undefined' ? this.separateLabels : !!this.depth;
    this.spacing        = typeof this.spacing        !== 'undefined' ? this.spacing        : this.browser.trackSpacing;
    this.featureHeight  = typeof this.featureHeight  !== 'undefined' ? this.featureHeight  : this.height;
    this.fixedHeight    = typeof this.fixedHeight    !== 'undefined' ? this.fixedHeight    : this.featureHeight === this.height && !(this.bump || this.bumpLabels);
    this.autoHeight     = typeof this.autoHeight     !== 'undefined' ? this.autoHeight     : !this.fixedHeight && !config.height ? this.browser.autoHeight : false;
    this.resizable      = typeof this.resizable      !== 'undefined' ? this.resizable      : !this.fixedHeight;
    this.height        += this.spacing;
    this.initialHeight  = this.height;
    this.minLabelHeight = 0;
    this.canvas         = $('<canvas>').appendTo(this.browser.wrapper);
    this.container      = $('<div class="track_container">').appendTo(this.browser.wrapper);
    this.imgContainer   = $('<div class="image_container">');
    this.label          = $('<li>').appendTo(this.browser.labelContainer).height(this.height).data('index', this.index);
    this.menus          = $();
    this.context        = this.canvas[0].getContext('2d');
    this.context.font   = this.fontWeight + ' ' + this.fontSize + 'px ' + this.fontFamily;
    this.fontHeight     = this.fontSize;
    this.labelUnits     = [ 'bp', 'Kb', 'Mb', 'Gb', 'Tb' ];

    if (this.hidden) {
      this.height  = 0;
    }
    
    if (this.autoHeight === 'force') {
      this.autoHeight  = true;
      this.fixedHeight = false;
      this.resizable   = false;
    } else if (this.threshold) {
      this.thresholdMessage = this.browser.setTracks([{ type: 'Threshold', track: this }], this.browser.tracks.length)[0];
    }
    
   
    if (this.name) {
      if (this.unsortable) {
        this.label.addClass('unsortable');
      } else {
        $('<div class="handle"></div>').appendTo(this.label);
      }
      
      this.minLabelHeight = $('<span class="name">' + this.name + '</span>').appendTo(this.label).outerHeight(true);
      this.label.height(this.hidden ? 0 : Math.max(this.height, this.minLabelHeight));
    } else {
      this.label.addClass('unsortable');
    }
    
    this.container.height(this.hidden ? 0 : Math.max(this.height, this.minLabelHeight));
    
    if (!this.fixedHeight && this.resizable !== false) {
      this.heightToggler = $('<div class="height_toggler"><div class="auto">Set track to auto-adjust height</div><div class="fixed">Set track to fixed height</div></div>').on({
        mouseover : function () { $(this).children(track.autoHeight ? '.fixed' : '.auto').show(); },
        mouseout  : function () { $(this).children().hide(); },
        click     : function () {
          var height;
          
          if (track.autoHeight = !track.autoHeight) {
            track.heightBeforeToggle = track.height;
            height = track.fullVisibleHeight;
          } else {
            height = track.heightBeforeToggle || track.initialHeight;
          }
          
          $(this).toggleClass('auto_height').children(':visible').hide().siblings().show();
          
          track.resize(height, true);
        }
      }).addClass(this.autoHeight ? 'auto_height' : '').appendTo(this.label);
    }
  },
  
  init: function () {
    if (this.renderer) {
      this.urlParams.renderer = this.renderer;
      this.featuresByRenderer = {};
      this.features           = this.featuresByRenderer[this.renderer] = new RTree();
    } else {
      this.features = new RTree();
    }
    
    this.dataRegion    = { start: 9e99, end: -9e99 };
    this.scaleSettings = {};
    this.featureIds    = {};
  },
  
  reset: function () {
    this.container.children('.image_container').remove();
    
    if (this.url !== false) {
      this.init();
    }
  },
  
  addUserEventHandlers: function () {
    var track   = this;
    var browser = this.browser;
    
    this.container.on('mouseup', '.image_container', function (e) {
      if ((e.which && e.which !== 1) || (browser.prev.left !== browser.left) || (browser.dragAction === 'select' && browser.selector.outerWidth(true) > 2)) {
        return; // Only show menus on left click when not dragging and not selecting
      }

      track.click(e);
    });
  },
  
  click: function (e) {
    var x = e.pageX - this.container.parent().offset().left + this.browser.scaledStart;
    var y = e.pageY - $(e.target).offset().top;
    var feature = this[e.target.className === 'labels' ? 'labelPositions' : 'featurePositions'].search({ x: x, y: y, w: 1, h: 1 }).sort(function (a, b) { return a.sort - b.sort; })[0];
    
    if (feature) {
      this.browser.makeMenu(feature, { left: e.pageX, top: e.pageY }, this);
    }
  },
  
  checkSize: function () {
    if (this.threshold && this.browser.length > this.threshold) {
      this.fullVisibleHeight = 0;
      return;
    }
    
    var bounds = { x: this.browser.scaledStart, w: this.width, y: 0, h: this.heights.max };
    var scale  = this.scale;
    var height = Math.max.apply(Math, $.map(this.featurePositions.search(bounds), function (feature) { return feature.bottom[scale]; }).concat(0));
    
    if (this.separateLabels) {
      this.labelTop = height;
      height += Math.max.apply(Math, $.map(this.labelPositions.search(bounds), function (feature) { return feature.labelBottom[scale]; }).concat(0));
    }
    
    if (!height && this.errorMessage) {
      height = this.errorMessage.height;
    }
    
    this.fullVisibleHeight = height;
  },
  
  resize: function (height) {
    if (arguments[1] !== true && height < this.featureHeight) {
      height = 0;
    } else {
      height = this.hidden ? 0 : Math.max(height, this.minLabelHeight);
    }
    
    this.height = height;
    
    if (typeof arguments[1] === 'number') {
      $(this.imgContainers).children('.labels').css('top', arguments[1]);
    }
    
    this.container.height(height);
    this.label.height(height);//[height ? 'show' : 'hide']();
    this.toggleExpander();
  },
  
  toggleExpander: function () {
    if (!this.resizable) {
      return;
    }
    
    var track = this;
    
    // Note: this.fullVisibleHeight - this.bumpSpacing is not actually the correct value to test against, but it's the easiest best guess to obtain.
    // this.fullVisibleHeight is the maximum bottom position of the track's features in the region, which includes spacing at the bottom of each feature and label
    // Therefore this.fullVisibleHeight includes this spacing for the bottom-most feature.
    // The correct value (for a track using the default positionFeatures code) is:
    // this.fullVisibleHeight - ([there are labels in this region] ? (this.separateLabels ? 0 : this.bumpSpacing + 1) + 2 : this.bumpSpacing)
    //                                                                ^ padding on label y-position                     ^ margin on label height
    if (this.fullVisibleHeight - this.bumpSpacing > this.height) {
      this.expander = (this.expander || $('<div class="expander">').width(this.width).appendTo(this.container).on('click', function () {
        track.resize(track.fullVisibleHeight);
      })).css('left', -this.browser.left)[this.height === 0 ? 'hide' : 'show']();
    } else if (this.expander) {
      this.expander.hide();
    }    
  },
  
  remove: function () {
    var thresholdMessage = this.thresholdMessage;
    
    if (thresholdMessage) {
      delete this.thresholdMessage;
      return this.browser.removeTracks([ this, thresholdMessage ]);
    }
    
    this.container.add(this.label).add(this.menus).remove();
    this.browser.tracks.splice(this.index, 1);
  },
  
  setScale: function () {
    var track = this;
    var featurePositions, labelPositions;
    
    this.scale = this.browser.scale;
    
    // Reset scaleSettings if the user has zoomed back to a previously existent zoom level, but has scrolled to a new region.
    // This is needed to get the newly created images in the right place.
    // Sadly we have to throw away all other images generated at this zoom level for it to work, 
    // since the new image probably won't fit exactly with the positioning of the old images,
    // and there would probably be a gap between this image and the old ones.
    if (this.scaleSettings[this.scale] && !this.browser.history[this.browser.start + '-' + this.browser.end]) {
      featurePositions = this.scaleSettings[this.scale].featurePositions;
      labelPositions   = this.scaleSettings[this.scale].labelPositions;
      
      this.container.children('.' + this.browser.scrollStart).remove();
      
      delete this.scaleSettings[this.scale];
    }
    
    if (!this.scaleSettings[this.scale]) {
      featurePositions = featurePositions || new RTree();
      
      this.scaleSettings[this.scale] = {
        imgContainers    : [],
        heights          : { max: this.height, maxFeatures: 0 },
        featurePositions : featurePositions,
        labelPositions   : this.separateLabels ? labelPositions || new RTree() : featurePositions
      };
    }
    
    var scaleSettings = this.scaleSettings[this.scale];
    
    $.each([ 'featurePositions', 'labelPositions', 'imgContainers', 'heights' ], function () {
      track[this] = scaleSettings[this];
    });
    
    if (this.renderer) {
      var renderer = this.getRenderer();
      
      if (renderer !== this.urlParams.renderer) {
        this.setRenderer(renderer);
      }
    }
    
    this.container.css('left', this.browser.left).children('.image_container').hide();
  },
  
  setRenderer: function (renderer, permanent) {
    if (this.urlParams.renderer !== renderer) {
      this.urlParams.renderer = renderer;
      this.dataRegion = { start: 9e99, end: -9e99 };
      
      if (!this.featuresByRenderer[renderer]) {
        this.featuresByRenderer[renderer] = new RTree();
      }
      
      this.features = this.featuresByRenderer[renderer];
    }
    
    if (permanent && this.renderer !== renderer) {
      this.renderer = renderer;
      
      var browser = this.browser;
      var img     = $(this.imgContainers).filter(browser.left > 0 ? ':first' : ':last').data('img');
      
      if (img) {
        this.reset();
        this.setScale();
        browser.makeTrackImages([ this ]);
      }
    }
  },
  
  getRenderer: function () {
    return this.urlParams.renderer;
  },
  
  parseData: function (data, bounds) {
    var i = data.features.length;
    
    while (i--) {
      data.features[i].sort        = i;
      data.features[i].bounds      = {};
      data.features[i].visible     = {};
      data.features[i].bottom      = {};
      data.features[i].labelBottom = {};
      
      if (!this.featureIds[data.features[i].id]) {
        this.features.insert({ x: data.features[i].start, y: 0, w: data.features[i].end - data.features[i].start + 1, h: 1 }, data.features[i]);
        this.featureIds[data.features[i].id] = 1;
      }
    }
    
    if (this.allData) {
      return this.features.search(bounds).sort(function (a, b) { return a.sort - b.sort; });
    } else {
      return data.features;
    }
  },
  
  scaleFeatures: function (features) {
    var i = features.length;
    
    while (i--) {
      features[i].scaledStart = features[i].start * this.scale;
      features[i].scaledEnd   = features[i].end   * this.scale;
    }
    
    return features;
  },
  
  positionFeatures: function (features, startOffset, imageWidth) {
    var feature, start, end, x, y, width, originalWidth, bounds, bump, depth, j, k, labelStart, labelWidth, maxIndex;
    var showLabels   = this.forceLabels === true || !(this.maxLabelRegion && this.browser.length > this.maxLabelRegion);
    var height       = 0;
    var labelsHeight = 0;
    var scale        = this.scale > 1 ? this.scale : 1;
    var scaleKey     = this.scale;
    var seen         = {};
    var draw         = { fill: {}, border: {}, label: {}, highlight: {}, labelHighlight: {} };
    
    for (var i = 0; i < features.length; i++) {
      feature = features[i];
      
      if (seen[feature.id]) {
        continue;
      }
      
      seen[feature.id] = 1;
      
      start      = feature.scaledStart - startOffset;
      end        = feature.scaledEnd   - startOffset;
      bounds     = feature.bounds[scaleKey];
      labelStart = start;
      labelWidth = feature.label ? Math.ceil(this.context.measureText(feature.label).width) + 1 : 0;
      
      if (bounds) {
        width      = bounds[0].w   - this.featureSpacing;
        maxIndex   = bounds.length - 1;
      } else {
        width = end - start + scale;
        
        if (end < start) {
          width = 1;
        } else if (width < scale) {
          width = scale;
        }
        
        x      = feature.scaledStart;
        y      = feature.y ? feature.y * (this.featureHeight + this.bumpSpacing) : 0;
        bounds = [{ x: x, y: y, w: width + this.featureSpacing, h: this.featureHeight + this.bumpSpacing }];
        
        if (feature.label && showLabels && !this.labelOverlay && this.forceLabels !== 'off' && !(scale > 1 && start < -this.browser.labelBuffer)) {
          if (this.separateLabels) {
            bounds.push({ x: x, y: y, w: labelWidth, h: this.fontHeight + 2 });
          } else {
            bounds.push({ x: x, y: y + this.featureHeight + this.bumpSpacing + 1, w: Math.max(labelWidth, width + this.featureSpacing), h: this.fontHeight + 2 });
          }
        }
        
        maxIndex = bounds.length - 1;
        
        bounds[0].h += this.separateLabels ? 0 : maxIndex;
        
        if (this.bump) {
          depth = 0;
          
          if (this.separateLabels) { // labels are drawn on a separate image, below the features
            j = bounds.length;
            
            while (j--) {
              do {
                if (j === 0 && this.depth && ++depth >= this.depth) {
                  if ($.grep(this.featurePositions.search(bounds[0]), function (f) { return f.visible[scaleKey] !== false; }).length) {
                    feature.visible[scaleKey] = false;
                  }
                  
                  break;
                }
                
                bump = false;
                
                if ((this[j ? 'labelPositions' : 'featurePositions'].search(bounds[j])[0] || feature).id !== feature.id) {
                  bounds[j].y += bounds[j].h;
                  bump      = true;
                }
              } while (bump);
            }
          } else { // labels and features drawn on the same image
            do {
              if (this.depth && ++depth >= this.depth) {
                if ($.grep(this.featurePositions.search(bounds[0]), function (f) { return f.visible[scaleKey] !== false; }).length) {
                  feature.visible[scaleKey] = false;
                }
                
                break;
              }
            
              bump = false;
              j    = bounds.length;
              
              while (j--) {              
                if ((this.featurePositions.search(bounds[j])[0] || feature).id !== feature.id) {
                  k = bounds.length;
                  
                  while (k--) {
                    bounds[k].y += bounds[j].h; // bump both feature and label by the height of the current bounds
                  }
                  
                  bump = true;
                }
              }
            } while (bump);
          }
        } else if (this.bumpLabels && bounds[1]) { // labels are bumped, but features aren't
          do {
            bump = false;
            
            if ((this.labelPositions.search(bounds[1])[0] || feature).id !== feature.id) {
              bounds[1].y++;
              bump = true;
            }
          } while (bump);
        }
        
        this.featurePositions.insert(bounds[0], feature);
        
        if (bounds[1]) {
          this.labelPositions.insert(bounds[1], feature);
        }

        feature.bounds[scaleKey] = bounds;
      }
      
      if (feature.visible[scaleKey] === false) {
        continue;
      }
      
      if (!draw.fill[feature.color]) {
        draw.fill[feature.color] = [];
        
        if (feature.order) {
          this.colorOrder[feature.order] = feature.color;
        }
      }
      
      if (feature.borderColor && !draw.border[feature.borderColor]) {
        draw.border[feature.borderColor] = [];
      }
      
      if (feature.labelColor) {
        if ((this.separateLabels || this.labelOverlay) && !draw.label[feature.labelColor]) {
          draw.label[feature.labelColor] = [];
        } else if (feature.labelColor !== feature.color && !draw.fill[feature.labelColor]) {
          draw.fill[feature.labelColor] = [];
        }
      }
      
      originalWidth = width;
      
      // truncate features in very small regions (where scale > 1) - make the features start at 1px outside the canvas to ensure no lines are drawn at the borders incorrectly
      if (scale > 1 && start < end && (start < 0 || end > imageWidth)) {
        start = Math.max(start, -1);
        end   = Math.min(end, imageWidth + 1);
        width = end - start + scale;
      }
      
      if (width > 0) {
        draw.fill[feature.color].push([ 'fillRect', [ start, bounds[0].y, width, this.featureHeight ] ]);
        
        if (feature.borderColor) {
          draw.border[feature.borderColor].push([ 'strokeRect', [ start, bounds[0].y + 0.5, width, this.featureHeight ] ]);
        }
      }
      
      if (this.labelOverlay && feature.label && labelWidth < originalWidth - 1) { // Don't show overlaid labels on features which aren't wider than the label
        draw.label[feature.labelColor].push([ 'fillText', [ feature.label, labelStart + (originalWidth - labelWidth) / 2, bounds[0].y + bounds[0].h / 2 ] ]);
      } else if (bounds[1]) {
        draw[this.separateLabels ? 'label' : 'fill'][feature.labelColor].push([ 'fillText', [ feature.label, labelStart, bounds[1].y ] ]);
      }
      
      if (this.separateLabels && bounds[1]) {
        feature.bottom[scaleKey]      = bounds[0].y + bounds[0].h + this.spacing;
        feature.labelBottom[scaleKey] = bounds[1].y + bounds[1].h + this.spacing;
        labelsHeight                  = Math.max(feature.labelBottom[scaleKey], labelsHeight);
      } else {
        feature.bottom[scaleKey] = bounds[maxIndex].y + bounds[maxIndex].h + this.spacing;
      }
      
      if (feature.decorations) {
        for (j = 0; j < feature.decorations.length; j++) {
          if (!this.decorations[feature.decorations[j].color]) {
            this.decorations[feature.decorations[j].color] = [];
          }
          
          this.decorations[feature.decorations[j].color].push([ feature, feature.decorations[j] ]);
        }
      }
      
      if (feature.highlight) {
        if (!draw.highlight[feature.highlight]) {
          draw.highlight[feature.highlight] = [];
        }
        
        if (bounds[1]) {
          if (this.separateLabels) {
            if (!draw.labelHighlight[feature.highlight]) {
              draw.labelHighlight[feature.highlight] = [];
            }
            
            draw.labelHighlight[feature.highlight].push([ 'fillRect', [ start, bounds[1].y, labelWidth, this.fontHeight ] ]);
          } else {
            draw.highlight[feature.highlight].push([ 'fillRect', [ start - 1, bounds[0].y - 1, Math.max(labelWidth, width + 1) + 1, bounds[0].h + bounds[1].h ] ]);
          }
        } else {
          draw.highlight[feature.highlight].push([ 'fillRect', [ start - 1, bounds[0].y - 1, width + 2, bounds[0].h + 1] ]);
        }
      }
      
      height = Math.max(feature.bottom[scaleKey], height);
    }
    
    this.featuresHeight      = Math.max(height, this.fixedHeight ? Math.max(this.height, this.minLabelHeight) : 0);
    this.labelsHeight        = labelsHeight;
    this.fullHeight          = Math.max(height, this.initialHeight) + labelsHeight;
    this.heights.max         = Math.max(this.fullHeight, this.heights.max);
    this.heights.maxFeatures = Math.max(height, this.heights.maxFeatures);
    
    return draw;
  },
  
  makeImage: function (start, end, width, moved, cls) {
    var div   = this.imgContainer.clone().width(width).addClass(cls);
    var prev  = $(this.imgContainers).filter('.' + this.browser.scrollStart + ':' + (moved < 0 ? 'first' : 'last'));
    var image = new Genoverse.TrackImage({
      track       : this,
      container   : div,
      start       : start, 
      end         : end,
      width       : width,
      scaledStart : start * this.scale,
      background  : this.browser.colors.background
    });
    
    div.css('left', prev.length ? prev.position().left + (moved < 0 ? -this.width : prev.width()) : -this.browser.offsets.right);
    
    this.imgContainers[moved < 0 ? 'unshift' : 'push'](div[0]);
    this.container.append(this.imgContainers);
    
    var deferred = image.makeImage();
    
    this.getData(image, deferred);
    
    if (this.thresholdMessage) {
      this.thresholdMessage.draw(div);
    }
    
    div = prev = null;
    
    return deferred;
  },
  
  getData: function (image, deferred) {
    if (this.threshold && this.browser.length > this.threshold) {
      return this.draw(image, []);
    }
    
    var bounds   = { x: image.bufferedStart, y: 0, w: image.end - image.bufferedStart, h: 1 };
    var features = !this.url || (image.start >= this.dataRegion.start && image.end <= this.dataRegion.end) ? this.features.search(bounds) : false;
    
    if (features) {
      this.draw(image, features.sort(function (a, b) { return a.sort - b.sort; }));
    } else {
      $.ajax({
        url      : this.url,
        data     : this.getQueryString(image.bufferedStart, image.end),
        dataType : this.dataType,
        context  : this,
        xhrFields: this.xhrFields,
        success  : function (data) {
          this.dataRegion.start = Math.min(image.start, this.dataRegion.start);
          this.dataRegion.end   = Math.max(image.end,   this.dataRegion.end);
          try {
            this.draw(image, this.parseData(data, bounds));
          } catch (e) {
            this.showError(image, deferred, e + ' ' + e.fileName + ':' + e.lineNumber);
          }
          
          if (this.allData) {
            this.url = false;
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          this.showError(image, deferred, errorThrown.message);
        }
      });
    }
  },
  
  showError: function (image, deferred, error) {
    if (!this.errorMessage) {
      this.errorMessage = this.browser.setTracks([{ type: 'Error', track: this }], this.browser.tracks.length)[0];
    }
    
    this.errorMessage.draw(this.imgContainers[0], error);
    deferred.resolve({ target: image.images, img: image }); 
  },
  
  getQueryString: function (start, end) {
    var chr      = this.browser.chr;
    var data     = {};
    var template = false;
        start    = this.allData ? 1 : Math.max(start, 1);
        end      = this.allData ? this.browser.chromosomeSize : Math.min(end, this.browser.chromosomeSize);
    
    $.each(this.urlTemplate, function (key, val) {
      data[key] = val.replace(/__CHR__/, chr).replace(/__START__/, start).replace(/__END__/, end);
      template  = true;
    });
    
    if (!template) {
      data = { chr: chr, start: start, end: end };
    }
    
    return $.extend(data, this.urlParams);
  },
  
  draw: function (image, features) {
    this.colorOrder  = [];
    this.decorations = {};

    image.draw(this.positionFeatures(this.scaleFeatures(features), image.scaledStart, image.width));
  },
  
  drawBackground: function (image, height) {
    var guideLines  = { major: [ this.browser.colors.majorGuideLine, this.browser.majorUnit ], minor: [ this.browser.colors.minorGuideLine, this.browser.minorUnit ] };
    var scaledStart = Math.round(image.scaledStart);
    var x;
    
    if (this.browser.backgrounds) {
      this.drawBackgroundColor(image, height, scaledStart);
    }
    
    for (var c in guideLines) {
      this.context.fillStyle = guideLines[c][0];
      
      for (x = Math.max(image.start - (image.start % guideLines[c][1]), 0); x < image.end + this.browser.minorUnit; x += guideLines[c][1]) {
        this.context.fillRect((this.browser.guideLines[c][x] || 0) - scaledStart, 0, 1, height);
      }
    }
  },
  
  drawBackgroundColor: function (image, height, scaledStart) {
    var backgrounds = this.browser.backgrounds;
    var i, start, end;
    
    for (var c in backgrounds) {
      this.context.fillStyle = c;
      
      i = backgrounds[c].length;
      
      while (i--) {
        if (backgrounds[c][i].end >= image.start && backgrounds[c][i].start <= image.end) {
          start = Math.max(backgrounds[c][i].scaledStart - scaledStart, 0);
          end   = Math.min(backgrounds[c][i].scaledEnd   - scaledStart, image.width);
          
          this.context.fillRect(start, 0, end - start, height);
        }
      }
    }
  },
  
  formatLabel: function (label) {
    var str = label.toString();
    
    if (this.minorUnit < 1000) {
      return str.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    } else {
      var power = Math.floor((str.length - 1) / 3);
      var unit  = this.labelUnits[power];
      
      label /= Math.pow(10, power * 3);
      
      return Math.floor(label) + (unit === 'bp' ? '' : '.' + (label.toString().split('.')[1] || '').concat('00').substring(0, 2)) + ' ' + unit;
    }
  },
  
  populateMenu: function (feature) {
    return {
      title : feature.label || feature.id,
      Start : feature.start,
      End   : feature.end
    };
  },
  
  show: function () {
    this.hidden = false; 
    this.resize(this.initialHeight);
  },

  hide: function () {
    this.hidden = true; 
    this.resize(0);
  },


  beforeDraw          : $.noop, // decoration for the track, drawn before the features
  decorateFeatures    : $.noop, // decoration for the features
  afterDraw           : $.noop, // decoration for the track, drawn after the features
  systemEventHandlers : {}
}, {
  on: function (events, handler) {
    $.each(events.split(' '), function () {
      if (typeof Genoverse.Track.prototype.systemEventHandlers[this] === 'undefined') {
        Genoverse.Track.prototype.systemEventHandlers[this] = [];
      }
      
      Genoverse.Track.prototype.systemEventHandlers[this].push(handler);
    });
  }
});








/*
  Track/Threshold.js
*/
Genoverse.Track.Threshold = Genoverse.Track.extend({

  // Dafaults
  color   : '#FF0000',
  spacing : 0,
  inherit : [ 'Static' ],
  
  constructor: function (config) {
    this.base(config);
    
    this.container.hide();
    this.label.hide();
    
    this.height = this.featuresHeight = this.fontHeight + 2;
  },
  
  resize: $.noop,
  
  positionFeatures: function () {
    if (this.browser.length <= this.track.threshold) {
      return false;
    }
    
    var text  = 'This data is not displayed in regions greater than ' + this.formatLabel(this.track.threshold);
    var width = this.context.measureText(text).width;
    var fill  = {};
    
    fill[this.color] = [[ 'fillText', [ text, (this.width - width) / 2, 0 ] ]];
    
    return { fill: fill };
  },
  
  draw: function (trackImgContainer) {
    this.image.makeImage();
    this.base(this.image);
    this.image.container.children().addClass('static').appendTo(trackImgContainer).css({ marginTop: -this.height / 2, marginLeft: this.width - this.browser.left });
  }
});




/*
  Track/Error.js
*/
Genoverse.Track.Error = Genoverse.Track.extend({

  // Defaults 
  color   : '#FF0000',
  spacing : 0,
  inherit : [ 'Static' ],
  
  constructor: function (config) {
    this.base(config);
    
    this.container.hide();
    this.label.hide();
    
    this.height = this.featuresHeight = this.fontHeight + 2;
  },
  
  resize: $.noop,
  
  positionFeatures: function () {
    var width = this.context.measureText(this.message).width;
    var fill  = {};
    fill[this.color] = [[ 'fillText', [ this.message, (this.width - width) / 2, 0 ] ]];
    
    return { fill: fill };
  },
  
  draw: function (trackImgContainer, message) {
    this.message = message || 'Unknown error';

    this.image.makeImage();
    this.base(this.image);
    this.image.container.children().addClass('static').appendTo(trackImgContainer).css({ marginTop: -this.height / 2, marginLeft: this.width - this.browser.left });
  }
});





/*
  TrackImage.js
*/
Genoverse.TrackImage = Base.extend({
  constructor: function (config) {
    $.extend(this, config);
    this.bufferedStart = Math.max(this.start - (this.track.labelOverlay ? 0 : this.track.browser.labelBuffer), 1);
    this.container.data('img', this);
  },
  
  makeImage: function () {
    var img      = this;
    var deferred = $.Deferred();
    
    if (this.track.separateLabels) {
      this.images = $('<img class="features" /><img class="labels" />');
      
      $.when.apply($, this.images.map(function () {
        var dfd = $.Deferred();
        $(this).load(dfd.resolve).data('deferred', dfd);
        return dfd;
      }).toArray()).done(function () {
        deferred.resolve({ target: $.map(arguments, function (a) { return a.target; }), img: img });
      });
    } else {
      this.images = $('<img />').load(function (e) { deferred.resolve({ target: e.target, img: img }); }).data('deferred', deferred);
    }
    
    return deferred;
  },
  
  draw: function (features) {
    if (features === false) {
      return;
    }
    
    var img   = this;
    var track = this.track;
    var i, color, labelColor, labels;
    
    if (!track.colorOrder.length) {
      for (color in features.fill) {
        track.colorOrder.push(color);
      }
    }
    
    if (track.featuresHeight === 0) {
      return this.images.each(function () { $(this).data('deferred').resolve({ target: this, img: img }); });
    }
    
    track.canvas.attr({ width: this.width, height: track.featuresHeight });
    track.context.textBaseline = 'top';
    
    track.beforeDraw(this);
    
    this.drawFeatures(features.highlight, 'fillStyle');
    this.drawFeatures(features.fill,      'fillStyle', track.colorOrder);
    this.drawFeatures(features.border,    'strokeStyle');
    
    track.decorateFeatures(this);
    
    if (track.separateLabels) {
      labels = this.images.filter('.labels');
      
      track.afterDraw(this);
      
      this.container.append(this.images.filter('.features').attr('src', track.canvas[0].toDataURL()));
      
      if (track.labelsHeight === 0) {
        return labels.data('deferred').resolve({ target: labels, img: img });
      }
      
      track.canvas.attr({ width: this.width, height: track.labelsHeight });
      track.context.textBaseline = 'top';
      
      this.drawFeatures(features.labelHighlight, 'fillStyle');
      this.drawFeatures(features.label,          'fillStyle');
      
      this.container.append(labels.attr('src', track.canvas[0].toDataURL()));
    } else {
      track.context.textBaseline = 'middle'; // labels overlaid on features - use middle to position them correctly
      
      this.drawFeatures(features.label, 'fillStyle');
      
      track.afterDraw(this);
      
      this.container.append(this.images.attr('src', track.canvas[0].toDataURL()));
    }
  },
  
  drawFeatures: function (features, style, order) {
    var color, i;
    
    if (!order) {
      order = [];
      
      for (color in features) {
        order.push(color);
      }
    }
    
    var c = order.length;
    
    // reverse order - lower orders are more important so draw them last
    while (c--) {
      color = order[c];
      
      if (color) {
        this.track.context[style] = color;
        
        i = features[color].length;
        
        while (i--) {
          this.track.context[features[color][i][0]].apply(this.track.context, features[color][i][1]);
        }
      }
    }
  },
  
  drawBackground: function () {
    var backgrounds = $();
    var deferred    = $.Deferred();
    var heights     = this.track.backgrounds ? [ Math.max(this.track.fullHeight, this.track.minLabelHeight), 1 ] : [ 1 ];
    
    for (var i = 0; i < heights.length; i++) {
      this.track.canvas.attr({ width: this.width, height: heights[i] });
      this.track.context.fillStyle = this.background;
      this.track.context.fillRect(0, 0, this.width, heights[i]);
      this.track.drawBackground(this, heights[i]);
      
      backgrounds.push($('<img class="bg" src="' + this.track.canvas[0].toDataURL() + '"/>').prependTo(this.container)[0]);
    }
    
    backgrounds.last().height('100%');
    
    $.when.apply($, backgrounds.map(function () {
      var dfd = $.Deferred();
      $(this).load(dfd.resolve);
      return dfd;
    }).toArray()).done(deferred.resolve);
    
    return deferred;
  }
});






/*
  Track/Static.js
*/
Genoverse.Track.Static = {
  init: function () {
    this['static']   = true;
    this.unsortable  = true;
    this.fixedHeight = true;
    this.url         = false;
    
    this.base();
    
    this.image = new Genoverse.TrackImage({
      track       : this,
      container   : this.imgContainer.width(this.width),
      width       : this.width,
      background  : this.browser.colors.background,
      start       : 0, 
      scaledStart : 0
    });
    
    this.container.toggleClass('track_container track_container_static').html(this.imgContainer);
  },
  
  reset: $.noop,
  
  setScale: function () {
    this.base();
    this.container.css('left', 0);
    this.imgContainer.show();
  },
  
  makeImage: function (force) {
    var features = this.getFeatures();
    
    if (force || this.stringified !== features.toString()) {
      this.image.makeImage().done(function (a) { $(a.target).prev().remove(); });
      this.draw(this.image, features);
      this.imgContainer.children(':last').show();
      this.resize(this.featuresHeight);
    }
    
    this.stringified = features.toString();
    
    return true;
  },
  
  getFeatures: function () {
    return this.base.apply(this, arguments) || []; // drops through to plugin
  },
  
  scaleFeatures: function (features) {
    return features;
  }
};






/*
  Track/Legend.js
*/
Genoverse.on('afterSetTracks afterRemoveTracks', function () {
  for (var i in this.legends) {
    this.legends[i].setTracks();
  }
});

Genoverse.on('afterCheckTrackSize afterRemoveTracks', function () {
  for (var i in this.legends) {
    this.legends[i].makeImage();
  }
});

Genoverse.Track.on('afterResize', function (height, userResize) {
  if (this.legend && userResize === true) {
    this.legend.makeImage();
  }
});

Genoverse.Track.Legend = Genoverse.Track.extend({

  // Defaults
  textColor : '#000000',
  inherit   : [ 'Static' ],
  
  init: function () {
    this.imgContainer.css('background', this.browser.colors.background);
    
    this.base();
    
    if (!this.browser.legends) {
      this.browser.legends = {};
    }
    
    this.browser.legends[this.id] = this;
  },
  
  setTracks: function () {
    var legend = this;
    var type   = this.featureType;
    
    this.tracks = $.grep(this.browser.tracks, function (t) { if (t.type === type) { t.legend = legend; return true; } });
  },
  
  getFeatures: function () {
    var bounds   = { x: this.browser.scaledStart, y: 0, w: this.width };
    var features = {};
    
    $.each($.map(this.tracks, function (track) {
      bounds.h = track.height;
      return track.featurePositions.search(bounds).concat(track.labelPositions.search(bounds));
    }), function () {
      features[this.legend] = this.color;
    });
    
    // sort legend alphabetically
    return $.map(features, function (color, text) { return [[ text, color ]]; }).sort(function (a, b) {
      var x = a[0].toLowerCase();
      var y = b[0].toLowerCase();
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  },
  
  positionFeatures: function (features) {
    var cols     = 2;
    var pad      = 5;
    var w        = 20;
    var x        = 0;
    var y        = 0;
    var xScale   = this.image.width / cols;
    var yScale   = this.fontHeight + pad;
    var fill     = {};
    
    fill[this.textColor] = [[ 'fillRect', [ 0, 0, this.width, 1 ] ]];
    
    this.colorOrder = [ this.textColor ];
    
    for (var i = 0; i < features.length; i++) {
      if (!fill[features[i][1]]) {
        fill[features[i][1]] = [];
        this.colorOrder.push(features[i][1]);
      }
      
      fill[features[i][1]].push([ 'fillRect', [ (x * xScale) + pad, (y * yScale) + pad, w, this.featureHeight ] ]);
      fill[this.textColor].push([ 'fillText', [ features[i][0], (x * xScale) + w + (2 * pad), (y * yScale) + pad ] ]);
      
      if (++x === cols) {
        x = 0;
        y++;
      }
    }
    
    this.height = this.featuresHeight = ((y + (x ? 1 : 0)) * yScale) + pad;
    
    fill[this.browser.colors.background] = [[ 'fillRect', [ 0, 0, this.width, this.height ] ]];
    
    this.colorOrder.push(this.browser.colors.background);
    
    return { fill: fill };
  },
  
  remove: function () {
    delete this.browser.legends[this.id];
    this.base();
  }
});






/*
  Track/Stranded.js
*/
Genoverse.Track.Stranded = {
  inheritedConstructor: function (config) {
    if (typeof this._makeImage === 'function') {
      return;
    }
    
    this.base(config);
    
    if (this.strand === -1) {
      this.url        = false;
      this._makeImage = this.makeReverseImage || this.makeImage;
      this.makeImage  = $.noop;
    } else {
      this.strand       = 1;
      this._makeImage   = this.makeImage;
      this.makeImage    = this.makeForwardImage;
      this.reverseTrack = this.browser.setTracks([ $.extend({}, config, { strand: -1, forwardTrack: this }) ], this.browser.tracks.length)[0];
    }
    
    if (!this.featureStrand) {
      this.featureStrand = this.strand;
    }
    
    this.urlParams.strand = this.featureStrand;
  },
  
  init: function () {
    this.base();
    
    if (this.strand === 1) {
      this.reverseTrack.features = this.features;
    } else {
      this.features = this.forwardTrack.features;
    }
  },
  
  positionFeatures: function (features, startOffset, imageWidth) {
    var strand = this.featureStrand;
    return this.base($.grep(features, function (feature) { return feature.strand === strand; }), startOffset, imageWidth);
  },
  
  makeForwardImage: function () {
    var args         = [].splice.call(arguments, 0);
    var deferred     = $.Deferred();
    var reverseTrack = this.reverseTrack;
    
    $.when(this._makeImage.apply(this, args)).done(function (dfd) {
      $.when(reverseTrack._makeImage.apply(reverseTrack, args.concat($.extend(true, {}, dfd.img)))).done(function (dfd2) {
        deferred.resolve({ target: $.map([ dfd.target, dfd2.target ], function (t) { return t; }), img: [ dfd.img, dfd2.img ] }); // map flattens arrays if targets have labels and features
      });
    });
    
    return deferred;
  },
  
  remove: function () {
    if (!this.removing) {
      var track = this.forwardTrack || this.reverseTrack;
      
      track.removing = true;
      this.browser.removeTracks([ track ]);
    }
    
    this.base();
  }
};




/*
  Track/Scaleline.js
*/
Genoverse.Track.Scaleline = Genoverse.Track.extend({

  // Defaults
  color          : '#000000',
  height         : 12,
  featuresHeight : 14,
  inherit        : [ 'Static' ],
  
  resize: $.noop,
  
  positionFeatures: function () {
    if (this.scale === this.drawnScale) {
      return false;
    }
    
    var text   = this.formatLabel(this.browser.length);
    var text2  = 'Forward strand';
    var width1 = this.context.measureText(text).width;
    var width2 = this.context.measureText(text2).width;
    var fill   = {};
    
    fill[this.color] = [
      [ 'fillRect', [ 0,                                       this.height / 2, (this.width - width1 - 10) / 2,            1 ] ],
      [ 'fillRect', [ width1 + (this.width - width1 + 10) / 2, this.height / 2, ((this.width - width1) / 2) - width2 - 45, 1 ] ],
      [ 'fillRect', [ this.width - 30,                         this.height / 2, 5,                                         1 ] ],
      [ 'fillText', [ text, (this.width - width1) / 2, 2 ] ],
      [ 'fillText', [ text2, this.width - width2 - 35, 2 ] ]
    ];
    
    fill[this.browser.colors.background] = [[ 'fillRect', [ 0, 0, this.width, this.height ] ]];
    
    this.drawnScale = this.scale;
    
    return { fill: fill };
  },
  
  decorateFeatures: function () {
    this.context.strokeStyle = this.color;
    
    this.context.beginPath();
    this.context.moveTo(this.width - 25, this.height * 0.25);
    this.context.lineTo(this.width - 5,  this.height * 0.5);
    this.context.lineTo(this.width - 25, this.height * 0.75);
    this.context.closePath();
    this.context.stroke();
    this.context.fill();
  }
});





/*  
  Track/Scalebar.js
*/
Genoverse.Track.Scalebar = Genoverse.Track.extend({

  height        : 20,
  featureHeight : 3,
  spacing       : 0,
  color         : '#000000',
  autoHeight    : false,
  unsortable    : true,
  forceLabels   : true,
  bump          : false,
  fixedHeight   : true,
  order         : 0,
  orderReverse  : 1e5,
  featureStrand : 1,
  inherit       : [ 'Stranded' ],
  
  reset: function () {
    this.container.children('.image_container').remove();
    this.init();
  },
  
  setScale: function () {
    this.base();
    
    var length = this.browser.length;
    var majorUnit, minorUnit, exponent, mantissa;
    
    if (length <= 51) {
      majorUnit = 10;
      minorUnit = 1;
    } else {
      exponent = Math.pow(10, Math.floor(Math.log(length) / Math.log(10)));
      mantissa = length / exponent;
      
      if (mantissa < 1.2) {
        majorUnit = exponent  / 10;
        minorUnit = majorUnit / 5;
      } else if (mantissa < 2.5) {
        majorUnit = exponent  / 5;
        minorUnit = majorUnit / 4;
      } else if (mantissa < 5) {
        majorUnit = exponent  / 2;
        minorUnit = majorUnit / 5;
      } else {
        majorUnit = exponent;
        minorUnit = majorUnit / 5;
      }
    }
    
    this.minorUnit  = this.browser.minorUnit = minorUnit;
    this.majorUnit  = this.browser.majorUnit = majorUnit;
    this.seen       = {};
    this.features   = new RTree();
    this.featureIds = {};
    
    if (this.strand === 1) {
      if (!this.browser.guideLinesByScale) {
        this.browser.guideLinesByScale = {};
      }
      
      if (!this.browser.guideLinesByScale[this.scale]) {
        this.browser.guideLinesByScale[this.scale] = { major: {}, minor: {} };
      }
      
      this.browser.guideLines = this.browser.guideLinesByScale[this.scale];
    }
  },
  
  setFeatures: function (start, end) {
    start = Math.max(start - (start % this.minorUnit) - this.majorUnit, 0);
    
    var flip     = (start / this.minorUnit) % 2 ? 1 : -1;
    var features = [];
    var feature, major, label;
    
    for (var x = start; x < end + this.minorUnit; x += this.minorUnit) {
      flip *= -1;
      
      if (this.seen[x]) {
        continue;
      }
      
      this.seen[x] = 1;
      
      feature = { id: x, strand: 1 };
      major   = x && !(x % this.majorUnit);
      
      if (flip === 1) {
        feature.start = x;
        feature.end   = x + this.minorUnit - 1;
        feature.color = this.color;
      }
      
      if (major) {
        label = this.formatLabel(x);
        
        if (label !== this.lastLabel) {
          feature.label      = label;
          feature.labelColor = this.color;
          
          if (!feature.end) {
            feature.start = x;
            feature.end   = x;
            feature.color = this.browser.colors.background;
          }
        }
        
        this.lastLabel = label;
      }
      
      if (feature.end) {
        features.push(feature);
      }
      
      if (this.strand === 1) {
        this.browser.guideLines[major ? 'major' : 'minor'][x] = Math.round(x * this.scale);
      }
    }
    
    return this.parseData({ features: features });
  },
  
  positionFeatures: function (features, startOffset, imageWidth) {
    var features = this.base(features, startOffset, imageWidth);
    
    this.labels = $.grep(features.fill[this.color], function (f) { return f[0] === 'fillText'; });
    
    if (features.fill[this.browser.colors.background]) {
      this.colorOrder = [ this.color, this.browser.colors.background ];
    }
    
    return features;
  },
  
  makeReverseImage: function (start, end, width, moved, cls, img) {
    var div      = this.imgContainer.clone().width(width).addClass(cls).css('left', img.container.position().left).data('img', img);
    var deferred = $.Deferred();
    
    this.imgContainers[moved < 0 ? 'unshift' : 'push'](div[0]);
    this.container.append(this.imgContainers);
    
    img.track     = this;
    img.container = div;
    
    img.images.clone().appendTo(div).load(function (e) { deferred.resolve({ target: e.target, img: img }); }).data('deferred', deferred);
    
    div = null;
    
    return deferred;
  },
  
  getData: function (image, deferred) {
    this.setFeatures(image.start, image.end);
    this.base(image, deferred);
  },
  
  afterDraw: function (image) {
    var i = this.labels.length;
    
    while (i--) {
      this.context.fillRect(Math.round(this.labels[i][1][1]), this.featureHeight, 1, 3);
    }
    
    this.context.fillRect(0, 0,                  image.width, 1);
    this.context.fillRect(0, this.featureHeight, image.width, 1);
  },
  
  drawBackground: function () {
    return this.strand === 1 ? this.base.apply(this, arguments) : false;
  },
  
  drawBackgroundColor: function (image, height) {
    this.context.fillStyle = this.browser.colors.background;
    this.context.fillRect(0, 0, this.width, height);
  }
});





/*
  Track/Gene.js
*/
Genoverse.Track.Gene = Genoverse.Track.extend({ 

  // Config
  height : 50,
  bump   : true,

  init: function () {
    this.base();
    this.setRenderer(this.renderer, true);
  },
  
  setRenderer: function (renderer, permanent) {
    if (renderer.match(/transcript/)) {
      this.separateLabels = false;
      this.maxLabelRegion = 1e5;
      this.featureHeight  = 8;
      this.bumpSpacing    = 2;
    } else if (renderer.match(/collapsed/)) {
      this.separateLabels = false;
      this.maxLabelRegion = 1e6;
      this.featureHeight  = 8;
      this.bumpSpacing    = 2;
    } else {
      this.separateLabels = true;
      this.maxLabelRegion = 1e7;
      this.featureHeight  = 6;
      this.bumpSpacing    = 1;
    }
    
    if (renderer.match(/nolabel/)) {
      this.maxLabelRegion = -1;
    }
    
    if (this.urlParams.renderer !== renderer || permanent) {
      this.base(renderer, permanent);
    }
  },
  
  getRenderer: function () {
    var renderer = this.renderer.split('_');
    
    if (this.browser.length > 1e7) {
      renderer[0] = 'gene';
    } else if (this.browser.length > 1e6 && this.renderer.match(/transcript/)) {
      renderer[0] = 'collapsed';
    }
    
    return renderer.join('_');
  },
  
  scaleFeatures: function (features) {
    if (this.urlParams.renderer.match(/gene/)) {
      return this.base(features);
    }
  
    var i = features.length;
    var j;
        
    while (i--) {
      features[i].scaledStart = features[i].start * this.scale;
      features[i].scaledEnd   = features[i].end   * this.scale;
      
      for (j = 0; j < features[i].exons.length; j++) {
        features[i].exons[j].scaledStart = features[i].exons[j].start * this.scale;
        features[i].exons[j].scaledEnd   = features[i].exons[j].end   * this.scale;
      }
    }
    
    return features;
  },
  
  positionFeatures: function (features, startOffset, imageWidth) {
    if (this.urlParams.renderer.match(/gene/)) {
      return this.base(features, startOffset, imageWidth);
    }
    
    var transcript, start, end, x, width, bounds, bump, j, k, label, labelStart, labelHeight, maxIndex, exon, exonStart, exonEnd, exonWidth, introns, intronY1, intronY2;
    var expanded   = this.urlParams.renderer.match(/transcript/);
    var context    = this.context;
    var showLabels = this.browser.length <= this.maxLabelRegion;
    var height     = 0;
    var scale      = this.scale > 1 ? this.scale : 1;
    var scaleKey   = this.scale;
    var intronY    = this.featureHeight / 2;
    var seen       = {};
    var draw       = { fill: {}, border: {}, highlight: {} };
    
    for (var i = 0; i < features.length; i++) {
      transcript = features[i];
      
      if (seen[transcript.id]) {
        continue;
      }
      
      seen[transcript.id] = 1;
      
      start   = transcript.scaledStart - startOffset;
      end     = transcript.scaledEnd   - startOffset;
      bounds  = transcript.bounds[scaleKey];
      introns = [];
      
      if (transcript.label && showLabels) {
        label       = transcript.label.split('\n');
        labelStart  = start;
        labelHeight = (this.fontHeight + 2) * label.length;
      } else {
        label       = false;
        labelHeight = 0;
      }
      
      if (bounds) {
        width      = bounds[0].w   - 1;
        maxIndex   = bounds.length - 1;
      } else {
        width = end - start;
        
        if (width < 1) {
          width = scale;
        }
        
        x      = transcript.scaledStart;
        bounds = [{ x: x, y: 0, w: width + 1, h: this.featureHeight + this.bumpSpacing }];
        
        if (label) {
          if (expanded && scale > 1 && start < -this.browser.labelBuffer) {
            bounds[0].h += labelHeight + 1;
          } else {
            bounds.push({ x: x, y: this.featureHeight + this.bumpSpacing + 1, w: Math.max.apply(Math, $.map(label, function (l) { return Math.ceil(context.measureText(l).width); }).concat(width)) + 1, h: labelHeight });
          }
        }
        
        maxIndex = bounds.length - 1;
        
        bounds[0].h += maxIndex;
        
        do {
          bump = false;
          j    = bounds.length;
          
          while (j--) {
            if ((this.featurePositions.search(bounds[j])[0] || transcript).id !== transcript.id) {
              k = bounds.length;
              
              while (k--) {
                bounds[k].y += bounds[j].h; // bump both transcript and label by the height of the current bounds
              }
              
              bump = true;
            }
          }
        } while (bump);
        
        this.featurePositions.insert(bounds[0], transcript);
        
        if (bounds[1]) {
          this.featurePositions.insert(bounds[1], transcript);
        }
        
        transcript.bounds[scaleKey] = bounds;
      }
      
      if (!draw.fill[transcript.color]) {
        draw.fill[transcript.color]   = [];
        draw.border[transcript.color] = [];
        
        if (transcript.order) {
          this.colorOrder[transcript.order] = transcript.color;
        }
      }
      
      if (scale > 1 && start < end) {
        start = Math.max(start, -1);
        end   = Math.min(end, imageWidth + 1);
        width = end - start;
      }
      
      if (bounds[1]) {
        for (j = 0; j < label.length; j++) {
          draw.fill[transcript.color].push([ 'fillText', [ label[j], labelStart, bounds[1].y + j * (this.fontHeight + 2) ], transcript.color ]);
        }
      }
      
      transcript.bottom[scaleKey] = bounds[maxIndex].y + bounds[maxIndex].h + this.spacing;
      
      height = Math.max(transcript.bottom[scaleKey], height);
      
      intronY1 = bounds[0].y + intronY;
      intronY2 = bounds[0].y + (transcript.strand > 0 ? 0 : this.featureHeight);
      
      for (j = 0; j < transcript.exons.length; j++) {
        exon      = transcript.exons[j];
        exonStart = exon.scaledStart - startOffset;
        exonEnd   = exon.scaledEnd   - startOffset;
        exonWidth = exonEnd - exonStart;
        
        if (exonWidth < 1) {
          exonWidth = scale;
        }
        
        if (scale > 1 && exonStart < exonEnd) {
          exonStart = Math.max(exonStart, -1);
          exonEnd   = Math.min(exonEnd, imageWidth + 1);
          exonWidth = exonEnd - exonStart;
        }
        
        if (exonWidth > 0) {
          if (exon.style === 'strokeRect') {
            draw.border[transcript.color].push([ 'strokeRect', [ exonStart, bounds[0].y + 1.5, exonWidth, this.featureHeight - 3 ] ]);
          } else {
            draw.fill[transcript.color].push([ 'fillRect', [ exonStart, bounds[0].y, exonWidth, this.featureHeight ] ]);
          }
        }
        
        if (this.urlParams.renderer.match(/transcript/)) {
          introns.push({ id: exon.id, x: exonStart, y1: intronY1, y2: intronY2, w: exonWidth });
        }
      }
      
      if (this.urlParams.renderer.match(/collapsed/)) {
        draw.fill[transcript.color].push([ 'fillRect', [ start, intronY1, width, 1 ] ]);
      } else if (introns.length > 1) {
        if (!this.decorations[transcript.color]) {
          this.decorations[transcript.color] = [];
        }
        
        this.decorations[transcript.color].push(introns);
      }
      
      if (transcript.highlight) {
        if (!draw.highlight[transcript.highlight]) {
          draw.highlight[transcript.highlight] = [];
        }
        
        draw.highlight[transcript.highlight].push([ 'fillRect', [ start, bounds[0].y, bounds[maxIndex].w, bounds[0].h + labelHeight ] ]);
      }
    }
    
    this.featuresHeight      = height;
    this.labelsHeight        = 0;
    this.fullHeight          = Math.max(height, this.initialHeight);
    this.heights.max         = Math.max(this.fullHeight, this.heights.max);
    this.heights.maxFeatures = Math.max(height, this.heights.maxFeatures);
    
    return draw;
  },
  
  // Draw intron "hats"
  decorateFeatures: function (image) {
    var i, j, exons, x, x1, x2, x3, xMid, y, y1, y2, y3, yScale;
    var xMax = image.width;
    
    for (var color in this.decorations) {
      this.context.strokeStyle = color;
      
      i = this.decorations[color].length;
      
      while (i--) {
        exons = this.decorations[color][i];
        
        for (j = 0; j < exons.length - 1; j++) {
          // For partially coding exons, the exon is duplicated in the decorations array, with one strokeRect and one fillRect
          // In this case, this exon can the same as the next one, in which case skip decoration - lines are only drawn from the edges of the exon boxes
          // and drawing this one would create an internal line
          if (exons[j].id === exons[j+1].id) {
            continue;
          }
          
          // If this is a partially coding exon, get x and y from the first bit of the exon
          if (j && exons[j].id === exons[j-1].id) {
            x = exons[j-1].x + exons[j-1].w;
            y = exons[j-1].y1;
          } else {
            x = exons[j].x + exons[j].w;
            y = exons[j].y1;
          }
          
          x1 = x;             // x coord of the right edge of the first exon
          x3 = exons[j+1].x;  // x coord of the left edge of the second exon
          
          // Skip if completely outside the image's region
          if (x3 < 0 || x1 > xMax) {
            continue;
          }
          
          xMid   = (x1 + x3) / 2;
          x2     = xMid;                     // x coord of the peak of the hat
          y1     = y3 = y;                   // y coord of the ends of the line (half way down the exon box)
          y2     = exons[j].y2;              // y coord of the peak of the hat  (level with the top (forward strand) or bottom (reverse strand) of the exon box)
          yScale = (y2 - y1) / (xMid - x1);  // Scale factor for recalculating coords if points lie outside the image region
          
          if (xMid < 0) {
            y2 = y + (yScale * x3);
            x2 = 0;
          } else if (xMid > xMax) {
            y2 = y + (yScale * (xMax - x));
            x2 = xMax;
          }
          
          if (x1 < 0) {
            y1 = xMid < 0 ? y2 : y - (yScale * x);
            x1 = 0;
          }
          
          if (x3 > xMax) {
            y3 = xMid > xMax ? y2 : y2 - (yScale * (xMax - x2));
            x3 = xMax;
          }
          
          this.context.beginPath();
          this.context.moveTo(x1, y1);
          this.context.lineTo(x2, y2);
          this.context.lineTo(x3, y3);
          this.context.stroke();
        }
      }
    }
  }
});






/*
  Track/DAS.js
*/
Genoverse.Track.DAS = Genoverse.Track.Gene.extend({

  // Defualts 
  dataType : 'xml',

  init: function () {
    this.base();
    this.urlTemplate = { segment: '__CHR__:__START__,__END__' }
    if (!this.url) this.url = this.source + '/features';
    if (this.display) {
      for (var key in this.display) {
        if (this.display[key] instanceof Array) {
          for (var i=0; i<this.display[key].length; i++) {
            this.display[key][this.display[key][i]] = 1;
          }
        } else {
          var value = this.display[key];
          this.display[key] = {};
          this.display[key][value] = 1;
        }
      }
    }

    this.getStylesheet();
  },


  getQueryString: function () {    
    var queryString = $.param(this.base.apply(this, arguments));
    
    if (this.filter && this.filter.type instanceof Array) {
      queryString += '&' + $.param({ type: this.filter.type }, true);
    }

    return decodeURIComponent(queryString);
  },


  getStylesheet: function () {
    this.stylesheetRequest = $.ajax({
      url      : (this.browser.proxy ? this.browser.proxy + '?url=' : '') + this.source + '/stylesheet',
      dataType : 'xml',
      context  : this,
      timeout  : 5000,
      error    : function (jqXHR, textStatus, errorThrown) {
        // Warn about the error?
      },
      success  : this.parseStylesheet,
    });
  },


  // getQueryString: function (start, end) {
  //   return this.base(start - (end-start)*10, end + (end-start)*10);
  // },

  parseStylesheet: function (XML) {
    var stylesheet = {};
    var track = this;

    $(XML).find('TYPE').each(function (i, TYPE) {
      var glyphs = [];
      
      $(TYPE).find('GLYPH>*').each(function(i, GLYPH) {
        var glyph = { type: $(GLYPH).prop('tagName').toLowerCase() };

        $(GLYPH).children().each(function(i, PROPERTY){
          glyph[$(PROPERTY).prop('tagName').toLowerCase()] = $(PROPERTY).text();
        })

        glyph.fgcolor = glyph.fgcolor ? track.mapColor(glyph.fgcolor) : track._stylesheet.default.fgcolor;
        glyph.bgcolor = glyph.bgcolor ? track.mapColor(glyph.bgcolor) : null;

        glyphs.push(glyph);
      });

      // Take first glyph as default
      for (var key in glyphs[0]) {
        glyphs[key] = glyphs[0][key];
      }

      stylesheet[TYPE.getAttribute('id')] = glyphs;
    });

    this.stylesheet = $.extend(this._stylesheet, stylesheet, this.stylesheet);

    // TODO: check for existing images? or if any drawing has started 
    //this.redraw = true;
  },


  drawFeature: function (feature, bounds) {
    var style = feature.style || this.stylesheet[feature.type] || this.stylesheet.default;
    bounds.x  = Math.floor(bounds.x) + 0.5;
    bounds.y  = Math.floor(bounds.y) + 0.5;
    bounds.w  = Math.floor(bounds.w);

    // controlY and middleY for line, hat and bezierCurve
    bounds.controlY = (feature.orientation == '-') ? bounds.y + this.featureHeight : bounds.y;
    bounds.middleY  = bounds.y + this.featureHeight/2;


    this.context.lineWidth = 1;

    switch (style.type) {

      case 'line' :
        this.context.strokeStyle = style.fgcolor;
        this.context.strokeRect(bounds.x, bounds.middleY, bounds.w, 0);
      break;

      case 'hat' :
        this.context.strokeStyle = style.fgcolor;
        this.context.lineWidth = 0.5;
        this.context.beginPath();
        this.context.moveTo(bounds.x, bounds.middleY);
        this.context.lineTo(bounds.x + bounds.w/2, bounds.controlY);
        this.context.lineTo(bounds.x + bounds.w, bounds.middleY);
        this.context.stroke();
        this.context.closePath();
      break;

      case 'bezierCurve' :
        this.context.strokeStyle = style.fgcolor;
        this.context.lineWidth   = 0.4;
        
        this.context.beginPath();
        this.context.moveTo(bounds.x, bounds.middleY);
        this.context.bezierCurveTo(bounds.x, bounds.controlY, bounds.x+bounds.w, bounds.controlY, bounds.x+bounds.w, bounds.middleY);
        this.context.stroke();
        this.context.closePath();
      break;

      case 'triangle' :
        this.context.strokeStyle = style.fgcolor;
        this.context.beginPath();
        this.context.moveTo(bounds.x, bounds.y);
        this.context.lineTo(bounds.x, bounds.y + this.featureHeight);
        this.context.lineTo(bounds.x + bounds.w, bounds.middleY);
        this.context.lineTo(bounds.x, bounds.y);
        this.context.stroke();
        this.context.closePath();
      break;

      case 'box':
        if (!style.bgcolor || style.bgcolor == this.mapColor('white')) {
          this.context.strokeStyle = style.fgcolor;
          this.context.strokeRect(bounds.x, bounds.y, bounds.w, bounds.h);
        } else {
          this.context.fillStyle = style.bgcolor;
          this.context.fillRect(bounds.x, bounds.y, bounds.w, bounds.h);
          if (style.fgcolor) {
            this.context.strokeStyle = style.fgcolor;
            this.context.strokeRect(bounds.x, bounds.y, bounds.w, bounds.h);
          }
        }
      break;

      default:
        this.context.strokeStyle = style.fgcolor;
        this.context.strokeRect(bounds.x, bounds.y, bounds.w, bounds.h);
      break;
    }
  },


  drawLabel: function (feature, bounds) {
    var style = this.stylesheet[feature.type] || this.stylesheet.default;
    this.context.fillStyle = style.fgcolor;
    this.context.fillText(feature.label, bounds.x, bounds.y);
  },


  mapColor: function (DASColor) {
    if (DASColor.indexOf('#')==0) 
      return DASColor;
    
    DASColor = DASColor.toLowerCase();

    if (DASColorMap[DASColor]) {
      return DASColorMap[DASColor];
    } 

    var match = /^gr[ea]y(\d+)$/i.exec(DASColor);
    if (match) {
      var c = Math.round(match[1]*2.55);
      return "rgb("+c+","+c+","+c+")";
    }

    // Can't workout color, return grey
    return 'grey';
  },


  parseData: function (data, bounds) {
    var features = new Array();

    $(data).find('FEATURE').each(function (i, FEATURE) {
      var feature = {};

      feature.id    = FEATURE.getAttribute('id');
      feature.label = FEATURE.getAttribute('label') || feature.id;

      $(FEATURE).children().each(function (i, property) {
        feature[$(property).prop('tagName').toLowerCase()] = $(property).text();
      });

      feature.start = feature.start *1; // Converting to number with *1
      feature.end   = feature.end   *1; // Converting to number with *1
      feature.width = feature.end - feature.start;

      feature.links  = {};
      feature.notes  = [];

      $(FEATURE).find('LINK').each(function (i, LINK) {
        feature.links[LINK.getAttribute('href')] = $(LINK).text() || 'link';
      });

      $(FEATURE).find('NOTE').each(function (i, NOTE) { 
        feature.notes.push($(NOTE).text());
      });

      $(FEATURE).find('GROUP,PARENT').each(function (i, GROUP) {
        var group   = {};
        group.id    = GROUP.getAttribute('id');
        group.type  = GROUP.getAttribute('type');
        group.links = {};
        group.notes = [];

        $(GROUP).find('LINK').each(function (i, LINK) {
          group.links[LINK.getAttribute('href')] = $(LINK).text() || 'link';
        });

        $(GROUP).find('NOTE').each(function (i, NOTE) {
          group.notes.push($(NOTE).text());
        });

        if (!feature.groups) feature.groups = [];
        feature.groups.push(group);
      });

      // $(FEATURE).find('PARENT').each(function (i, PARENT) {
      //   if (!feature.parents) feature.parents = [];
      //   feature.parents.push({ id: PARENT.getAttribute('id') });
      // });

      features.push(feature)
    });

    return features;
  },

  _stylesheet: {
    default: {
      bgcolor: 'grey',
      fgcolor: 'grey',
      type: 'box'
    },
    group: {
      fgcolor: 'black',
      type: 'line'
    },
  },

});






/*
  Track/DAS/colorMap.js
*/
var DASColorMap = {
"snow" : "rgb(255, 250, 250)",
"ghost white" : "rgb(248, 248, 255)",
"ghostwhite" : "rgb(248, 248, 255)",
"white smoke" : "rgb(245, 245, 245)",
"whitesmoke" : "rgb(245, 245, 245)",
"gainsboro" : "rgb(220, 220, 220)",
"floral white" : "rgb(255, 250, 240)",
"floralwhite" : "rgb(255, 250, 240)",
"old lace" : "rgb(253, 245, 230)",
"oldlace" : "rgb(253, 245, 230)",
"linen" : "rgb(250, 240, 230)",
"antique white" : "rgb(250, 235, 215)",
"antiquewhite" : "rgb(250, 235, 215)",
"papaya whip" : "rgb(255, 239, 213)",
"papayawhip" : "rgb(255, 239, 213)",
"blanched almond" : "rgb(255, 235, 205)",
"blanchedalmond" : "rgb(255, 235, 205)",
"bisque" : "rgb(255, 228, 196)",
"peach puff" : "rgb(255, 218, 185)",
"peachpuff" : "rgb(255, 218, 185)",
"navajo white" : "rgb(255, 222, 173)",
"navajowhite" : "rgb(255, 222, 173)",
"moccasin" : "rgb(255, 228, 181)",
"cornsilk" : "rgb(255, 248, 220)",
"ivory" : "rgb(255, 255, 240)",
"lemon chiffon" : "rgb(255, 250, 205)",
"lemonchiffon" : "rgb(255, 250, 205)",
"seashell" : "rgb(255, 245, 238)",
"honeydew" : "rgb(240, 255, 240)",
"mint cream" : "rgb(245, 255, 250)",
"mintcream" : "rgb(245, 255, 250)",
"azure" : "rgb(240, 255, 255)",
"alice blue" : "rgb(240, 248, 255)",
"aliceblue" : "rgb(240, 248, 255)",
"lavender" : "rgb(230, 230, 250)",
"lavender blush" : "rgb(255, 240, 245)",
"lavenderblush" : "rgb(255, 240, 245)",
"misty rose" : "rgb(255, 228, 225)",
"mistyrose" : "rgb(255, 228, 225)",
"white" : "rgb(255, 255, 255)",
"black" : "rgb(0, 0, 0)",
"dark slate gray" : "rgb(47, 79, 79)",
"darkslategray" : "rgb(47, 79, 79)",
"dark slate grey" : "rgb(47, 79, 79)",
"darkslategrey" : "rgb(47, 79, 79)",
"dim gray" : "rgb(105, 105, 105)",
"dimgray" : "rgb(105, 105, 105)",
"dim grey" : "rgb(105, 105, 105)",
"dimgrey" : "rgb(105, 105, 105)",
"slate gray" : "rgb(112, 128, 144)",
"slategray" : "rgb(112, 128, 144)",
"slate grey" : "rgb(112, 128, 144)",
"slategrey" : "rgb(112, 128, 144)",
"light slate gray" : "rgb(119, 136, 153)",
"lightslategray" : "rgb(119, 136, 153)",
"light slate grey" : "rgb(119, 136, 153)",
"lightslategrey" : "rgb(119, 136, 153)",
"gray" : "rgb(190, 190, 190)",
"grey" : "rgb(190, 190, 190)",
"light grey" : "rgb(211, 211, 211)",
"lightgrey" : "rgb(211, 211, 211)",
"light gray" : "rgb(211, 211, 211)",
"lightgray" : "rgb(211, 211, 211)",
"midnight blue" : "rgb(25, 25, 112)",
"midnightblue" : "rgb(25, 25, 112)",
"navy" : "rgb(0, 0, 128)",
"navy blue" : "rgb(0, 0, 128)",
"navyblue" : "rgb(0, 0, 128)",
"cornflower blue" : "rgb(100, 149, 237)",
"cornflowerblue" : "rgb(100, 149, 237)",
"dark slate blue" : "rgb(72, 61, 139)",
"darkslateblue" : "rgb(72, 61, 139)",
"slate blue" : "rgb(106, 90, 205)",
"slateblue" : "rgb(106, 90, 205)",
"medium slate blue" : "rgb(123, 104, 238)",
"mediumslateblue" : "rgb(123, 104, 238)",
"light slate blue" : "rgb(132, 112, 255)",
"lightslateblue" : "rgb(132, 112, 255)",
"medium blue" : "rgb(0, 0, 205)",
"mediumblue" : "rgb(0, 0, 205)",
"royal blue" : "rgb(65, 105, 225)",
"royalblue" : "rgb(65, 105, 225)",
"blue" : "rgb(0, 0, 255)",
"dodger blue" : "rgb(30, 144, 255)",
"dodgerblue" : "rgb(30, 144, 255)",
"deep sky blue" : "rgb(0, 191, 255)",
"deepskyblue" : "rgb(0, 191, 255)",
"sky blue" : "rgb(135, 206, 235)",
"skyblue" : "rgb(135, 206, 235)",
"light sky blue" : "rgb(135, 206, 250)",
"lightskyblue" : "rgb(135, 206, 250)",
"steel blue" : "rgb(70, 130, 180)",
"steelblue" : "rgb(70, 130, 180)",
"light steel blue" : "rgb(176, 196, 222)",
"lightsteelblue" : "rgb(176, 196, 222)",
"light blue" : "rgb(173, 216, 230)",
"lightblue" : "rgb(173, 216, 230)",
"powder blue" : "rgb(176, 224, 230)",
"powderblue" : "rgb(176, 224, 230)",
"pale turquoise" : "rgb(175, 238, 238)",
"paleturquoise" : "rgb(175, 238, 238)",
"dark turquoise" : "rgb(0, 206, 209)",
"darkturquoise" : "rgb(0, 206, 209)",
"medium turquoise" : "rgb(72, 209, 204)",
"mediumturquoise" : "rgb(72, 209, 204)",
"turquoise" : "rgb(64, 224, 208)",
"cyan" : "rgb(0, 255, 255)",
"light cyan" : "rgb(224, 255, 255)",
"lightcyan" : "rgb(224, 255, 255)",
"cadet blue" : "rgb(95, 158, 160)",
"cadetblue" : "rgb(95, 158, 160)",
"medium aquamarine" : "rgb(102, 205, 170)",
"mediumaquamarine" : "rgb(102, 205, 170)",
"aquamarine" : "rgb(127, 255, 212)",
"dark green" : "rgb(0, 100, 0)",
"darkgreen" : "rgb(0, 100, 0)",
"dark olive green" : "rgb(85, 107, 47)",
"darkolivegreen" : "rgb(85, 107, 47)",
"dark sea green" : "rgb(143, 188, 143)",
"darkseagreen" : "rgb(143, 188, 143)",
"sea green" : "rgb(46, 139, 87)",
"seagreen" : "rgb(46, 139, 87)",
"medium sea green" : "rgb(60, 179, 113)",
"mediumseagreen" : "rgb(60, 179, 113)",
"light sea green" : "rgb(32, 178, 170)",
"lightseagreen" : "rgb(32, 178, 170)",
"pale green" : "rgb(152, 251, 152)",
"palegreen" : "rgb(152, 251, 152)",
"spring green" : "rgb(0, 255, 127)",
"springgreen" : "rgb(0, 255, 127)",
"lawn green" : "rgb(124, 252, 0)",
"lawngreen" : "rgb(124, 252, 0)",
"green" : "rgb(0, 255, 0)",
"chartreuse" : "rgb(127, 255, 0)",
"medium spring green" : "rgb(0, 250, 154)",
"mediumspringgreen" : "rgb(0, 250, 154)",
"green yellow" : "rgb(173, 255, 47)",
"greenyellow" : "rgb(173, 255, 47)",
"lime green" : "rgb(50, 205, 50)",
"limegreen" : "rgb(50, 205, 50)",
"yellow green" : "rgb(154, 205, 50)",
"yellowgreen" : "rgb(154, 205, 50)",
"forest green" : "rgb(34, 139, 34)",
"forestgreen" : "rgb(34, 139, 34)",
"olive drab" : "rgb(107, 142, 35)",
"olivedrab" : "rgb(107, 142, 35)",
"dark khaki" : "rgb(189, 183, 107)",
"darkkhaki" : "rgb(189, 183, 107)",
"khaki" : "rgb(240, 230, 140)",
"pale goldenrod" : "rgb(238, 232, 170)",
"palegoldenrod" : "rgb(238, 232, 170)",
"light goldenrod yellow" : "rgb(250, 250, 210)",
"lightgoldenrodyellow" : "rgb(250, 250, 210)",
"light yellow" : "rgb(255, 255, 224)",
"lightyellow" : "rgb(255, 255, 224)",
"yellow" : "rgb(255, 255, 0)",
"gold" : "rgb(255, 215, 0)",
"light goldenrod" : "rgb(238, 221, 130)",
"lightgoldenrod" : "rgb(238, 221, 130)",
"goldenrod" : "rgb(218, 165, 32)",
"dark goldenrod" : "rgb(184, 134, 11)",
"darkgoldenrod" : "rgb(184, 134, 11)",
"rosy brown" : "rgb(188, 143, 143)",
"rosybrown" : "rgb(188, 143, 143)",
"indian red" : "rgb(205, 92, 92)",
"indianred" : "rgb(205, 92, 92)",
"saddle brown" : "rgb(139, 69, 19)",
"saddlebrown" : "rgb(139, 69, 19)",
"sienna" : "rgb(160, 82, 45)",
"peru" : "rgb(205, 133, 63)",
"burlywood" : "rgb(222, 184, 135)",
"beige" : "rgb(245, 245, 220)",
"wheat" : "rgb(245, 222, 179)",
"sandy brown" : "rgb(244, 164, 96)",
"sandybrown" : "rgb(244, 164, 96)",
"tan" : "rgb(210, 180, 140)",
"chocolate" : "rgb(210, 105, 30)",
"firebrick" : "rgb(178, 34, 34)",
"brown" : "rgb(165, 42, 42)",
"dark salmon" : "rgb(233, 150, 122)",
"darksalmon" : "rgb(233, 150, 122)",
"salmon" : "rgb(250, 128, 114)",
"light salmon" : "rgb(255, 160, 122)",
"lightsalmon" : "rgb(255, 160, 122)",
"orange" : "rgb(255, 165, 0)",
"dark orange" : "rgb(255, 140, 0)",
"darkorange" : "rgb(255, 140, 0)",
"coral" : "rgb(255, 127, 80)",
"light coral" : "rgb(240, 128, 128)",
"lightcoral" : "rgb(240, 128, 128)",
"tomato" : "rgb(255, 99, 71)",
"orange red" : "rgb(255, 69, 0)",
"orangered" : "rgb(255, 69, 0)",
"red" : "rgb(255, 0, 0)",
"hot pink" : "rgb(255, 105, 180)",
"hotpink" : "rgb(255, 105, 180)",
"deep pink" : "rgb(255, 20, 147)",
"deeppink" : "rgb(255, 20, 147)",
"pink" : "rgb(255, 192, 203)",
"light pink" : "rgb(255, 182, 193)",
"lightpink" : "rgb(255, 182, 193)",
"pale violet red" : "rgb(219, 112, 147)",
"palevioletred" : "rgb(219, 112, 147)",
"maroon" : "rgb(176, 48, 96)",
"medium violet red" : "rgb(199, 21, 133)",
"mediumvioletred" : "rgb(199, 21, 133)",
"violet red" : "rgb(208, 32, 144)",
"violetred" : "rgb(208, 32, 144)",
"magenta" : "rgb(255, 0, 255)",
"violet" : "rgb(238, 130, 238)",
"plum" : "rgb(221, 160, 221)",
"orchid" : "rgb(218, 112, 214)",
"medium orchid" : "rgb(186, 85, 211)",
"mediumorchid" : "rgb(186, 85, 211)",
"dark orchid" : "rgb(153, 50, 204)",
"darkorchid" : "rgb(153, 50, 204)",
"dark violet" : "rgb(148, 0, 211)",
"darkviolet" : "rgb(148, 0, 211)",
"blue violet" : "rgb(138, 43, 226)",
"blueviolet" : "rgb(138, 43, 226)",
"purple" : "rgb(160, 32, 240)",
"medium purple" : "rgb(147, 112, 219)",
"mediumpurple" : "rgb(147, 112, 219)",
"thistle" : "rgb(216, 191, 216)",
"snow1" : "rgb(255, 250, 250)",
"snow2" : "rgb(238, 233, 233)",
"snow3" : "rgb(205, 201, 201)",
"snow4" : "rgb(139, 137, 137)",
"seashell1" : "rgb(255, 245, 238)",
"seashell2" : "rgb(238, 229, 222)",
"seashell3" : "rgb(205, 197, 191)",
"seashell4" : "rgb(139, 134, 130)",
"antiquewhite1" : "rgb(255, 239, 219)",
"antiquewhite2" : "rgb(238, 223, 204)",
"antiquewhite3" : "rgb(205, 192, 176)",
"antiquewhite4" : "rgb(139, 131, 120)",
"bisque1" : "rgb(255, 228, 196)",
"bisque2" : "rgb(238, 213, 183)",
"bisque3" : "rgb(205, 183, 158)",
"bisque4" : "rgb(139, 125, 107)",
"peachpuff1" : "rgb(255, 218, 185)",
"peachpuff2" : "rgb(238, 203, 173)",
"peachpuff3" : "rgb(205, 175, 149)",
"peachpuff4" : "rgb(139, 119, 101)",
"navajowhite1" : "rgb(255, 222, 173)",
"navajowhite2" : "rgb(238, 207, 161)",
"navajowhite3" : "rgb(205, 179, 139)",
"navajowhite4" : "rgb(139, 121, 94)",
"lemonchiffon1" : "rgb(255, 250, 205)",
"lemonchiffon2" : "rgb(238, 233, 191)",
"lemonchiffon3" : "rgb(205, 201, 165)",
"lemonchiffon4" : "rgb(139, 137, 112)",
"cornsilk1" : "rgb(255, 248, 220)",
"cornsilk2" : "rgb(238, 232, 205)",
"cornsilk3" : "rgb(205, 200, 177)",
"cornsilk4" : "rgb(139, 136, 120)",
"ivory1" : "rgb(255, 255, 240)",
"ivory2" : "rgb(238, 238, 224)",
"ivory3" : "rgb(205, 205, 193)",
"ivory4" : "rgb(139, 139, 131)",
"honeydew1" : "rgb(240, 255, 240)",
"honeydew2" : "rgb(224, 238, 224)",
"honeydew3" : "rgb(193, 205, 193)",
"honeydew4" : "rgb(131, 139, 131)",
"lavenderblush1" : "rgb(255, 240, 245)",
"lavenderblush2" : "rgb(238, 224, 229)",
"lavenderblush3" : "rgb(205, 193, 197)",
"lavenderblush4" : "rgb(139, 131, 134)",
"mistyrose1" : "rgb(255, 228, 225)",
"mistyrose2" : "rgb(238, 213, 210)",
"mistyrose3" : "rgb(205, 183, 181)",
"mistyrose4" : "rgb(139, 125, 123)",
"azure1" : "rgb(240, 255, 255)",
"azure2" : "rgb(224, 238, 238)",
"azure3" : "rgb(193, 205, 205)",
"azure4" : "rgb(131, 139, 139)",
"slateblue1" : "rgb(131, 111, 255)",
"slateblue2" : "rgb(122, 103, 238)",
"slateblue3" : "rgb(105, 89, 205)",
"slateblue4" : "rgb(71, 60, 139)",
"royalblue1" : "rgb(72, 118, 255)",
"royalblue2" : "rgb(67, 110, 238)",
"royalblue3" : "rgb(58, 95, 205)",
"royalblue4" : "rgb(39, 64, 139)",
"blue1" : "rgb(0, 0, 255)",
"blue2" : "rgb(0, 0, 238)",
"blue3" : "rgb(0, 0, 205)",
"blue4" : "rgb(0, 0, 139)",
"dodgerblue1" : "rgb(30, 144, 255)",
"dodgerblue2" : "rgb(28, 134, 238)",
"dodgerblue3" : "rgb(24, 116, 205)",
"dodgerblue4" : "rgb(16, 78, 139)",
"steelblue1" : "rgb(99, 184, 255)",
"steelblue2" : "rgb(92, 172, 238)",
"steelblue3" : "rgb(79, 148, 205)",
"steelblue4" : "rgb(54, 100, 139)",
"deepskyblue1" : "rgb(0, 191, 255)",
"deepskyblue2" : "rgb(0, 178, 238)",
"deepskyblue3" : "rgb(0, 154, 205)",
"deepskyblue4" : "rgb(0, 104, 139)",
"skyblue1" : "rgb(135, 206, 255)",
"skyblue2" : "rgb(126, 192, 238)",
"skyblue3" : "rgb(108, 166, 205)",
"skyblue4" : "rgb(74, 112, 139)",
"lightskyblue1" : "rgb(176, 226, 255)",
"lightskyblue2" : "rgb(164, 211, 238)",
"lightskyblue3" : "rgb(141, 182, 205)",
"lightskyblue4" : "rgb(96, 123, 139)",
"slategray1" : "rgb(198, 226, 255)",
"slategray2" : "rgb(185, 211, 238)",
"slategray3" : "rgb(159, 182, 205)",
"slategray4" : "rgb(108, 123, 139)",
"lightsteelblue1" : "rgb(202, 225, 255)",
"lightsteelblue2" : "rgb(188, 210, 238)",
"lightsteelblue3" : "rgb(162, 181, 205)",
"lightsteelblue4" : "rgb(110, 123, 139)",
"lightblue1" : "rgb(191, 239, 255)",
"lightblue2" : "rgb(178, 223, 238)",
"lightblue3" : "rgb(154, 192, 205)",
"lightblue4" : "rgb(104, 131, 139)",
"lightcyan1" : "rgb(224, 255, 255)",
"lightcyan2" : "rgb(209, 238, 238)",
"lightcyan3" : "rgb(180, 205, 205)",
"lightcyan4" : "rgb(122, 139, 139)",
"paleturquoise1" : "rgb(187, 255, 255)",
"paleturquoise2" : "rgb(174, 238, 238)",
"paleturquoise3" : "rgb(150, 205, 205)",
"paleturquoise4" : "rgb(102, 139, 139)",
"cadetblue1" : "rgb(152, 245, 255)",
"cadetblue2" : "rgb(142, 229, 238)",
"cadetblue3" : "rgb(122, 197, 205)",
"cadetblue4" : "rgb(83, 134, 139)",
"turquoise1" : "rgb(0, 245, 255)",
"turquoise2" : "rgb(0, 229, 238)",
"turquoise3" : "rgb(0, 197, 205)",
"turquoise4" : "rgb(0, 134, 139)",
"cyan1" : "rgb(0, 255, 255)",
"cyan2" : "rgb(0, 238, 238)",
"cyan3" : "rgb(0, 205, 205)",
"cyan4" : "rgb(0, 139, 139)",
"darkslategray1" : "rgb(151, 255, 255)",
"darkslategray2" : "rgb(141, 238, 238)",
"darkslategray3" : "rgb(121, 205, 205)",
"darkslategray4" : "rgb(82, 139, 139)",
"aquamarine1" : "rgb(127, 255, 212)",
"aquamarine2" : "rgb(118, 238, 198)",
"aquamarine3" : "rgb(102, 205, 170)",
"aquamarine4" : "rgb(69, 139, 116)",
"darkseagreen1" : "rgb(193, 255, 193)",
"darkseagreen2" : "rgb(180, 238, 180)",
"darkseagreen3" : "rgb(155, 205, 155)",
"darkseagreen4" : "rgb(105, 139, 105)",
"seagreen1" : "rgb(84, 255, 159)",
"seagreen2" : "rgb(78, 238, 148)",
"seagreen3" : "rgb(67, 205, 128)",
"seagreen4" : "rgb(46, 139, 87)",
"palegreen1" : "rgb(154, 255, 154)",
"palegreen2" : "rgb(144, 238, 144)",
"palegreen3" : "rgb(124, 205, 124)",
"palegreen4" : "rgb(84, 139, 84)",
"springgreen1" : "rgb(0, 255, 127)",
"springgreen2" : "rgb(0, 238, 118)",
"springgreen3" : "rgb(0, 205, 102)",
"springgreen4" : "rgb(0, 139, 69)",
"green1" : "rgb(0, 255, 0)",
"green2" : "rgb(0, 238, 0)",
"green3" : "rgb(0, 205, 0)",
"green4" : "rgb(0, 139, 0)",
"chartreuse1" : "rgb(127, 255, 0)",
"chartreuse2" : "rgb(118, 238, 0)",
"chartreuse3" : "rgb(102, 205, 0)",
"chartreuse4" : "rgb(69, 139, 0)",
"olivedrab1" : "rgb(192, 255, 62)",
"olivedrab2" : "rgb(179, 238, 58)",
"olivedrab3" : "rgb(154, 205, 50)",
"olivedrab4" : "rgb(105, 139, 34)",
"darkolivegreen1" : "rgb(202, 255, 112)",
"darkolivegreen2" : "rgb(188, 238, 104)",
"darkolivegreen3" : "rgb(162, 205, 90)",
"darkolivegreen4" : "rgb(110, 139, 61)",
"khaki1" : "rgb(255, 246, 143)",
"khaki2" : "rgb(238, 230, 133)",
"khaki3" : "rgb(205, 198, 115)",
"khaki4" : "rgb(139, 134, 78)",
"lightgoldenrod1" : "rgb(255, 236, 139)",
"lightgoldenrod2" : "rgb(238, 220, 130)",
"lightgoldenrod3" : "rgb(205, 190, 112)",
"lightgoldenrod4" : "rgb(139, 129, 76)",
"lightyellow1" : "rgb(255, 255, 224)",
"lightyellow2" : "rgb(238, 238, 209)",
"lightyellow3" : "rgb(205, 205, 180)",
"lightyellow4" : "rgb(139, 139, 122)",
"yellow1" : "rgb(255, 255, 0)",
"yellow2" : "rgb(238, 238, 0)",
"yellow3" : "rgb(205, 205, 0)",
"yellow4" : "rgb(139, 139, 0)",
"gold1" : "rgb(255, 215, 0)",
"gold2" : "rgb(238, 201, 0)",
"gold3" : "rgb(205, 173, 0)",
"gold4" : "rgb(139, 117, 0)",
"goldenrod1" : "rgb(255, 193, 37)",
"goldenrod2" : "rgb(238, 180, 34)",
"goldenrod3" : "rgb(205, 155, 29)",
"goldenrod4" : "rgb(139, 105, 20)",
"darkgoldenrod1" : "rgb(255, 185, 15)",
"darkgoldenrod2" : "rgb(238, 173, 14)",
"darkgoldenrod3" : "rgb(205, 149, 12)",
"darkgoldenrod4" : "rgb(139, 101, 8)",
"rosybrown1" : "rgb(255, 193, 193)",
"rosybrown2" : "rgb(238, 180, 180)",
"rosybrown3" : "rgb(205, 155, 155)",
"rosybrown4" : "rgb(139, 105, 105)",
"indianred1" : "rgb(255, 106, 106)",
"indianred2" : "rgb(238, 99, 99)",
"indianred3" : "rgb(205, 85, 85)",
"indianred4" : "rgb(139, 58, 58)",
"sienna1" : "rgb(255, 130, 71)",
"sienna2" : "rgb(238, 121, 66)",
"sienna3" : "rgb(205, 104, 57)",
"sienna4" : "rgb(139, 71, 38)",
"burlywood1" : "rgb(255, 211, 155)",
"burlywood2" : "rgb(238, 197, 145)",
"burlywood3" : "rgb(205, 170, 125)",
"burlywood4" : "rgb(139, 115, 85)",
"wheat1" : "rgb(255, 231, 186)",
"wheat2" : "rgb(238, 216, 174)",
"wheat3" : "rgb(205, 186, 150)",
"wheat4" : "rgb(139, 126, 102)",
"tan1" : "rgb(255, 165, 79)",
"tan2" : "rgb(238, 154, 73)",
"tan3" : "rgb(205, 133, 63)",
"tan4" : "rgb(139, 90, 43)",
"chocolate1" : "rgb(255, 127, 36)",
"chocolate2" : "rgb(238, 118, 33)",
"chocolate3" : "rgb(205, 102, 29)",
"chocolate4" : "rgb(139, 69, 19)",
"firebrick1" : "rgb(255, 48, 48)",
"firebrick2" : "rgb(238, 44, 44)",
"firebrick3" : "rgb(205, 38, 38)",
"firebrick4" : "rgb(139, 26, 26)",
"brown1" : "rgb(255, 64, 64)",
"brown2" : "rgb(238, 59, 59)",
"brown3" : "rgb(205, 51, 51)",
"brown4" : "rgb(139, 35, 35)",
"salmon1" : "rgb(255, 140, 105)",
"salmon2" : "rgb(238, 130, 98)",
"salmon3" : "rgb(205, 112, 84)",
"salmon4" : "rgb(139, 76, 57)",
"lightsalmon1" : "rgb(255, 160, 122)",
"lightsalmon2" : "rgb(238, 149, 114)",
"lightsalmon3" : "rgb(205, 129, 98)",
"lightsalmon4" : "rgb(139, 87, 66)",
"orange1" : "rgb(255, 165, 0)",
"orange2" : "rgb(238, 154, 0)",
"orange3" : "rgb(205, 133, 0)",
"orange4" : "rgb(139, 90, 0)",
"darkorange1" : "rgb(255, 127, 0)",
"darkorange2" : "rgb(238, 118, 0)",
"darkorange3" : "rgb(205, 102, 0)",
"darkorange4" : "rgb(139, 69, 0)",
"coral1" : "rgb(255, 114, 86)",
"coral2" : "rgb(238, 106, 80)",
"coral3" : "rgb(205, 91, 69)",
"coral4" : "rgb(139, 62, 47)",
"tomato1" : "rgb(255, 99, 71)",
"tomato2" : "rgb(238, 92, 66)",
"tomato3" : "rgb(205, 79, 57)",
"tomato4" : "rgb(139, 54, 38)",
"orangered1" : "rgb(255, 69, 0)",
"orangered2" : "rgb(238, 64, 0)",
"orangered3" : "rgb(205, 55, 0)",
"orangered4" : "rgb(139, 37, 0)",
"red1" : "rgb(255, 0, 0)",
"red2" : "rgb(238, 0, 0)",
"red3" : "rgb(205, 0, 0)",
"red4" : "rgb(139, 0, 0)",
"deeppink1" : "rgb(255, 20, 147)",
"deeppink2" : "rgb(238, 18, 137)",
"deeppink3" : "rgb(205, 16, 118)",
"deeppink4" : "rgb(139, 10, 80)",
"hotpink1" : "rgb(255, 110, 180)",
"hotpink2" : "rgb(238, 106, 167)",
"hotpink3" : "rgb(205, 96, 144)",
"hotpink4" : "rgb(139, 58, 98)",
"pink1" : "rgb(255, 181, 197)",
"pink2" : "rgb(238, 169, 184)",
"pink3" : "rgb(205, 145, 158)",
"pink4" : "rgb(139, 99, 108)",
"lightpink1" : "rgb(255, 174, 185)",
"lightpink2" : "rgb(238, 162, 173)",
"lightpink3" : "rgb(205, 140, 149)",
"lightpink4" : "rgb(139, 95, 101)",
"palevioletred1" : "rgb(255, 130, 171)",
"palevioletred2" : "rgb(238, 121, 159)",
"palevioletred3" : "rgb(205, 104, 137)",
"palevioletred4" : "rgb(139, 71, 93)",
"maroon1" : "rgb(255, 52, 179)",
"maroon2" : "rgb(238, 48, 167)",
"maroon3" : "rgb(205, 41, 144)",
"maroon4" : "rgb(139, 28, 98)",
"violetred1" : "rgb(255, 62, 150)",
"violetred2" : "rgb(238, 58, 140)",
"violetred3" : "rgb(205, 50, 120)",
"violetred4" : "rgb(139, 34, 82)",
"magenta1" : "rgb(255, 0, 255)",
"magenta2" : "rgb(238, 0, 238)",
"magenta3" : "rgb(205, 0, 205)",
"magenta4" : "rgb(139, 0, 139)",
"orchid1" : "rgb(255, 131, 250)",
"orchid2" : "rgb(238, 122, 233)",
"orchid3" : "rgb(205, 105, 201)",
"orchid4" : "rgb(139, 71, 137)",
"plum1" : "rgb(255, 187, 255)",
"plum2" : "rgb(238, 174, 238)",
"plum3" : "rgb(205, 150, 205)",
"plum4" : "rgb(139, 102, 139)",
"mediumorchid1" : "rgb(224, 102, 255)",
"mediumorchid2" : "rgb(209, 95, 238)",
"mediumorchid3" : "rgb(180, 82, 205)",
"mediumorchid4" : "rgb(122, 55, 139)",
"darkorchid1" : "rgb(191, 62, 255)",
"darkorchid2" : "rgb(178, 58, 238)",
"darkorchid3" : "rgb(154, 50, 205)",
"darkorchid4" : "rgb(104, 34, 139)",
"purple1" : "rgb(155, 48, 255)",
"purple2" : "rgb(145, 44, 238)",
"purple3" : "rgb(125, 38, 205)",
"purple4" : "rgb(85, 26, 139)",
"mediumpurple1" : "rgb(171, 130, 255)",
"mediumpurple2" : "rgb(159, 121, 238)",
"mediumpurple3" : "rgb(137, 104, 205)",
"mediumpurple4" : "rgb(93, 71, 139)",
"thistle1" : "rgb(255, 225, 255)",
"thistle2" : "rgb(238, 210, 238)",
"thistle3" : "rgb(205, 181, 205)",
"thistle4" : "rgb(139, 123, 139)",
"gray0" : "rgb(0, 0, 0)",
"grey0" : "rgb(0, 0, 0)",
"gray1" : "rgb(3, 3, 3)",
"grey1" : "rgb(3, 3, 3)",
"gray2" : "rgb(5, 5, 5)",
"grey2" : "rgb(5, 5, 5)",
"gray3" : "rgb(8, 8, 8)",
"grey3" : "rgb(8, 8, 8)",
"gray4" : "rgb(10, 10, 10)",
"grey4" : "rgb(10, 10, 10)",
"gray5" : "rgb(13, 13, 13)",
"grey5" : "rgb(13, 13, 13)",
"gray6" : "rgb(15, 15, 15)",
"grey6" : "rgb(15, 15, 15)",
"gray7" : "rgb(18, 18, 18)",
"grey7" : "rgb(18, 18, 18)",
"gray8" : "rgb(20, 20, 20)",
"grey8" : "rgb(20, 20, 20)",
"gray9" : "rgb(23, 23, 23)",
"grey9" : "rgb(23, 23, 23)",
"gray10" : "rgb(26, 26, 26)",
"grey10" : "rgb(26, 26, 26)",
"gray11" : "rgb(28, 28, 28)",
"grey11" : "rgb(28, 28, 28)",
"gray12" : "rgb(31, 31, 31)",
"grey12" : "rgb(31, 31, 31)",
"gray13" : "rgb(33, 33, 33)",
"grey13" : "rgb(33, 33, 33)",
"gray14" : "rgb(36, 36, 36)",
"grey14" : "rgb(36, 36, 36)",
"gray15" : "rgb(38, 38, 38)",
"grey15" : "rgb(38, 38, 38)",
"gray16" : "rgb(41, 41, 41)",
"grey16" : "rgb(41, 41, 41)",
"gray17" : "rgb(43, 43, 43)",
"grey17" : "rgb(43, 43, 43)",
"gray18" : "rgb(46, 46, 46)",
"grey18" : "rgb(46, 46, 46)",
"gray19" : "rgb(48, 48, 48)",
"grey19" : "rgb(48, 48, 48)",
"gray20" : "rgb(51, 51, 51)",
"grey20" : "rgb(51, 51, 51)",
"gray21" : "rgb(54, 54, 54)",
"grey21" : "rgb(54, 54, 54)",
"gray22" : "rgb(56, 56, 56)",
"grey22" : "rgb(56, 56, 56)",
"gray23" : "rgb(59, 59, 59)",
"grey23" : "rgb(59, 59, 59)",
"gray24" : "rgb(61, 61, 61)",
"grey24" : "rgb(61, 61, 61)",
"gray25" : "rgb(64, 64, 64)",
"grey25" : "rgb(64, 64, 64)",
"gray26" : "rgb(66, 66, 66)",
"grey26" : "rgb(66, 66, 66)",
"gray27" : "rgb(69, 69, 69)",
"grey27" : "rgb(69, 69, 69)",
"gray28" : "rgb(71, 71, 71)",
"grey28" : "rgb(71, 71, 71)",
"gray29" : "rgb(74, 74, 74)",
"grey29" : "rgb(74, 74, 74)",
"gray30" : "rgb(77, 77, 77)",
"grey30" : "rgb(77, 77, 77)",
"gray31" : "rgb(79, 79, 79)",
"grey31" : "rgb(79, 79, 79)",
"gray32" : "rgb(82, 82, 82)",
"grey32" : "rgb(82, 82, 82)",
"gray33" : "rgb(84, 84, 84)",
"grey33" : "rgb(84, 84, 84)",
"gray34" : "rgb(87, 87, 87)",
"grey34" : "rgb(87, 87, 87)",
"gray35" : "rgb(89, 89, 89)",
"grey35" : "rgb(89, 89, 89)",
"gray36" : "rgb(92, 92, 92)",
"grey36" : "rgb(92, 92, 92)",
"gray37" : "rgb(94, 94, 94)",
"grey37" : "rgb(94, 94, 94)",
"gray38" : "rgb(97, 97, 97)",
"grey38" : "rgb(97, 97, 97)",
"gray39" : "rgb(99, 99, 99)",
"grey39" : "rgb(99, 99, 99)",
"gray40" : "rgb(102, 102, 102)",
"grey40" : "rgb(102, 102, 102)",
"gray41" : "rgb(105, 105, 105)",
"grey41" : "rgb(105, 105, 105)",
"gray42" : "rgb(107, 107, 107)",
"grey42" : "rgb(107, 107, 107)",
"gray43" : "rgb(110, 110, 110)",
"grey43" : "rgb(110, 110, 110)",
"gray44" : "rgb(112, 112, 112)",
"grey44" : "rgb(112, 112, 112)",
"gray45" : "rgb(115, 115, 115)",
"grey45" : "rgb(115, 115, 115)",
"gray46" : "rgb(117, 117, 117)",
"grey46" : "rgb(117, 117, 117)",
"gray47" : "rgb(120, 120, 120)",
"grey47" : "rgb(120, 120, 120)",
"gray48" : "rgb(122, 122, 122)",
"grey48" : "rgb(122, 122, 122)",
"gray49" : "rgb(125, 125, 125)",
"grey49" : "rgb(125, 125, 125)",
"gray50" : "rgb(127, 127, 127)",
"grey50" : "rgb(127, 127, 127)",
"gray51" : "rgb(130, 130, 130)",
"grey51" : "rgb(130, 130, 130)",
"gray52" : "rgb(133, 133, 133)",
"grey52" : "rgb(133, 133, 133)",
"gray53" : "rgb(135, 135, 135)",
"grey53" : "rgb(135, 135, 135)",
"gray54" : "rgb(138, 138, 138)",
"grey54" : "rgb(138, 138, 138)",
"gray55" : "rgb(140, 140, 140)",
"grey55" : "rgb(140, 140, 140)",
"gray56" : "rgb(143, 143, 143)",
"grey56" : "rgb(143, 143, 143)",
"gray57" : "rgb(145, 145, 145)",
"grey57" : "rgb(145, 145, 145)",
"gray58" : "rgb(148, 148, 148)",
"grey58" : "rgb(148, 148, 148)",
"gray59" : "rgb(150, 150, 150)",
"grey59" : "rgb(150, 150, 150)",
"gray60" : "rgb(153, 153, 153)",
"grey60" : "rgb(153, 153, 153)",
"gray61" : "rgb(156, 156, 156)",
"grey61" : "rgb(156, 156, 156)",
"gray62" : "rgb(158, 158, 158)",
"grey62" : "rgb(158, 158, 158)",
"gray63" : "rgb(161, 161, 161)",
"grey63" : "rgb(161, 161, 161)",
"gray64" : "rgb(163, 163, 163)",
"grey64" : "rgb(163, 163, 163)",
"gray65" : "rgb(166, 166, 166)",
"grey65" : "rgb(166, 166, 166)",
"gray66" : "rgb(168, 168, 168)",
"grey66" : "rgb(168, 168, 168)",
"gray67" : "rgb(171, 171, 171)",
"grey67" : "rgb(171, 171, 171)",
"gray68" : "rgb(173, 173, 173)",
"grey68" : "rgb(173, 173, 173)",
"gray69" : "rgb(176, 176, 176)",
"grey69" : "rgb(176, 176, 176)",
"gray70" : "rgb(179, 179, 179)",
"grey70" : "rgb(179, 179, 179)",
"gray71" : "rgb(181, 181, 181)",
"grey71" : "rgb(181, 181, 181)",
"gray72" : "rgb(184, 184, 184)",
"grey72" : "rgb(184, 184, 184)",
"gray73" : "rgb(186, 186, 186)",
"grey73" : "rgb(186, 186, 186)",
"gray74" : "rgb(189, 189, 189)",
"grey74" : "rgb(189, 189, 189)",
"gray75" : "rgb(191, 191, 191)",
"grey75" : "rgb(191, 191, 191)",
"gray76" : "rgb(194, 194, 194)",
"grey76" : "rgb(194, 194, 194)",
"gray77" : "rgb(196, 196, 196)",
"grey77" : "rgb(196, 196, 196)",
"gray78" : "rgb(199, 199, 199)",
"grey78" : "rgb(199, 199, 199)",
"gray79" : "rgb(201, 201, 201)",
"grey79" : "rgb(201, 201, 201)",
"gray80" : "rgb(204, 204, 204)",
"grey80" : "rgb(204, 204, 204)",
"gray81" : "rgb(207, 207, 207)",
"grey81" : "rgb(207, 207, 207)",
"gray82" : "rgb(209, 209, 209)",
"grey82" : "rgb(209, 209, 209)",
"gray83" : "rgb(212, 212, 212)",
"grey83" : "rgb(212, 212, 212)",
"gray84" : "rgb(214, 214, 214)",
"grey84" : "rgb(214, 214, 214)",
"gray85" : "rgb(217, 217, 217)",
"grey85" : "rgb(217, 217, 217)",
"gray86" : "rgb(219, 219, 219)",
"grey86" : "rgb(219, 219, 219)",
"gray87" : "rgb(222, 222, 222)",
"grey87" : "rgb(222, 222, 222)",
"gray88" : "rgb(224, 224, 224)",
"grey88" : "rgb(224, 224, 224)",
"gray89" : "rgb(227, 227, 227)",
"grey89" : "rgb(227, 227, 227)",
"gray90" : "rgb(229, 229, 229)",
"grey90" : "rgb(229, 229, 229)",
"gray91" : "rgb(232, 232, 232)",
"grey91" : "rgb(232, 232, 232)",
"gray92" : "rgb(235, 235, 235)",
"grey92" : "rgb(235, 235, 235)",
"gray93" : "rgb(237, 237, 237)",
"grey93" : "rgb(237, 237, 237)",
"gray94" : "rgb(240, 240, 240)",
"grey94" : "rgb(240, 240, 240)",
"gray95" : "rgb(242, 242, 242)",
"grey95" : "rgb(242, 242, 242)",
"gray96" : "rgb(245, 245, 245)",
"grey96" : "rgb(245, 245, 245)",
"gray97" : "rgb(247, 247, 247)",
"grey97" : "rgb(247, 247, 247)",
"gray98" : "rgb(250, 250, 250)",
"grey98" : "rgb(250, 250, 250)",
"gray99" : "rgb(252, 252, 252)",
"grey99" : "rgb(252, 252, 252)",
"gray100" : "rgb(255, 255, 255)",
"grey100" : "rgb(255, 255, 255)",
"dark grey" : "rgb(169, 169, 169)",
"darkgrey" : "rgb(169, 169, 169)",
"dark gray" : "rgb(169, 169, 169)",
"darkgray" : "rgb(169, 169, 169)",
"dark blue" : "rgb(0, 0, 139)",
"darkblue" : "rgb(0, 0, 139)",
"dark cyan" : "rgb(0, 139, 139)",
"darkcyan" : "rgb(0, 139, 139)",
"dark magenta" : "rgb(139, 0, 139)",
"darkmagenta" : "rgb(139, 0, 139)",
"dark red" : "rgb(139, 0, 0)",
"darkred" : "rgb(139, 0, 0)",
"light green" : "rgb(144, 238, 144)",
"lightgreen" : "rgb(144, 238, 144)"
}





/*
  Track/DAS/Band.js
*/
Genoverse.Track.DAS.Band = Genoverse.Track.DAS.extend({

  // Default config
  name         : "Chromosome bands", 
  labelOverlay : true, 
  allData      : true, 
  dataType     : 'xml',
  depth        : null,
  url          : 'http://www.ensembl.org/das/Homo_sapiens.GRCh37.karyotype/features?segment=__CHR__',


  colorMap : {
    "default"      : "grey50",
    "band:acen"    : "slategrey",
    "band:gneg"    : "white",
    "band:gpos"    : "black",
    "band:gpos100" : "black",
    "band:gpos25"  : "grey85",
    "band:gpos33"  : "grey75",
    "band:gpos50"  : "grey60",
    "band:gpos66"  : "grey50",
    "band:gpos75"  : "grey40",
    "band:gvar"    : "grey88",
    "band:mark"    : "blue",
    "band:stalk"   : "slategrey",
    "band:tip"     : "black"
  },


  setFeatureColor: function (feature) {
    feature.labelColor = '#FFFFFF';

    feature.color = this.colorMap[feature.type];
    var match = /^grey(\d+)$/i.exec(feature.color);
    if (match) {
      if (match[1] > 70) { 
        feature.labelColor = '#000000';
      }

      var c = Math.round(match[1]*2.55);
      feature.color = "rgb("+c+","+c+","+c+")";
    }

    if (feature.color == 'white') feature.labelColor = '#000000';
  },

  
  parseData: function (data, bounds) {
    var features = this.base(data, bounds);
    var i = features.length;
    
    while (i--) {
      var feature         = features[i];
      feature.sort        = i;
      feature.bounds      = {};
      feature.visible     = {};
      feature.bottom      = {};
      feature.labelBottom = {};

      this.setFeatureColor(feature);
      this.features.insert({ x: feature.start, w: feature.end - feature.start, y:0, h:1 }, feature);
    }

    return this.features.search(bounds);
  },


  afterDraw: function (image) {
    this.context.globalAlpha = 1;
    this.context.fillStyle   = '#000000';
    this.context.fillRect(0, 0, image.width, 1);
    this.context.fillRect(0, this.featureHeight, image.width, 1);
  },


});





/*
  Track/DAS/Transcript.js
*/
Genoverse.Track.DAS.Transcript = Genoverse.Track.DAS.extend({

  name           : "Transcript (DAS)", 
  dataType       : 'xml',
  bump           : true,
  height         : 200,
  source         : 'http://www.ensembl.org/das/Homo_sapiens.GRCh37.transcript',
  renderer       : 'transcript_label',
  featureHeight  : 10,
  decorations    : {},
  separateLabels : true,
  groups         : {},

  
  parseData: function (data, bounds) {
    var track = this;
    var features = track.base(data, bounds);
    this.groupFeatures(features);

    return this.features.search(bounds);
  },


  groupFeatures: function (features) {
    //if (!this.groups) this.groups = {};
    
    for (var i=0; i<features.length; i++) {

      var feature = features[i];
      if (!feature.start || !feature.end) continue;

      //this.setFeatureStyle(feature);

      if (feature.groups) {

        for (var j=0; j<feature.groups.length; j++) {
          if (this.display && this.display.group && !this.display.group[feature.groups[j].type]) continue;

          if (this.groups[feature.groups[j].id]) {

            var group  = this.groups[feature.groups[j].id];

            if (feature.start < group.start) group.start = feature.start;
            if (feature.end > group.end) group.end = feature.end;

            if (!group.new) {
              this.redraw       = true;
              group.bounds      = {};
              group.bottom      = {};
              group.labelBottom = {};
              group.new         = true;
            }

          } else {
            this.groups[feature.groups[j].id] = $.extend({
              sort        : i,
              bounds      : {},
              visible     : {},
              bottom      : {},
              labelBottom : {},
              exons       : [],
              start       : feature.start,
              end         : feature.end,
              new         : 1
            }, feature.groups[j]);
          }

          this.groups[feature.groups[j].id].exons.push(feature);
        }
      }
    }

    for (id in this.groups) {
      var group = this.groups[id];
      if (group.new) {
        if (!group.label) group.label = group.id;
        group.exons.sort(function (a, b) { var s = a.start - b.start; return s ? s : a.width - b.width });
        group.type = 'group';
        this.features.insert({ x: group.start, w: group.end - group.start, y:0, h:1 }, group.id);
      }
    }
  },


  reDraw: function () {
    var browser = this.browser;
    //this.reset();
    //this.dataRegion    = { start: 9e99, end: -9e99 };
    this.scaleSettings = {};    
    this.setScale();
    
    var start   = browser.dataRegion.start;
    var end     = browser.dataRegion.end;
    var width   = Math.round((end - start + 1) * this.scale);
    //var overlay = browser.makeOverlays(width, [ this ]);
    
    $.when(this.makeImage(start, end, width, -browser.left, browser.scrollStart)).done(function (a) {
      $(a.target).show()
      a.img.drawBackground();
      browser.checkTrackSize();
    });
  },


  draw: function (image, features) {

    if (this.redraw) {
      this.canvas.attr({ width: image.width, height: this.fullHeight });
      this.context.textBaseline = 'top';
      this.beforeDraw(image);
      this.redraw = false; 
      this.afterDraw(image);
      image.container.append(image.images.attr('src', this.canvas[0].toDataURL()));
      return this.reDraw(); 
    } 

    var track = this;

    $.when(track.stylesheetRequest).always(function(){
      features.every(function(element, index, array){
          array[index] = track.groups[element];
          array[index].bounds = {};
          return true;
      });

      track.positionFeatures(track.scaleFeatures(features), image.scaledStart, image.width);

      track.canvas.attr({ width: image.width, height: track.fullHeight });
      track.context.textBaseline = 'top';
      track.beforeDraw(image);

      track.drawFeatures(image, features);


      track.afterDraw(image);
      image.container.append(image.images.attr('src', track.canvas[0].toDataURL()));    
    });

  },


  drawFeatures: function (image, features) {
    var seen = {};
    
    //this.context.globalAlpha = 0.5;

    for (var i=0; i<features.length; i++) {
      var feature = features[i];
      feature.new = false;
      var bounds  = feature.bounds[this.scale];
      if (!bounds || seen[feature.id]) continue;
      seen[feature.id] = 1;

      // this.drawFeature(
      //   feature, 
      //   {
      //     x: feature.scaledStart - image.scaledStart, 
      //     y: bounds[0].y, 
      //     w: feature.scaledEnd - feature.scaledStart, 
      //     h: this.featureHeight 
      //   }
      // );

      var j = feature.exons.length;
      for (var j=0; j<feature.exons.length; j++) {
        var exon = feature.exons[j];
        this.drawFeature(
          exon, 
          {
            x: exon.scaledStart - image.scaledStart, 
            y: bounds[0].y, 
            w: exon.scaledEnd - exon.scaledStart, 
            h: this.featureHeight
          }
        );

        // Introns (connections between exons)
        if (feature.exons[j+1] && exon.scaledEnd < feature.exons[j+1].scaledStart) {
          this.drawFeature(
            {
              orientation: exon.orientation,
              style: $.extend(
                {},
                this.stylesheet[feature.type] || { fgcolog: 'black' },
                { type: 'bezierCurve' }
              )
            },
            {
              x: exon.scaledEnd - image.scaledStart, 
              y: bounds[0].y,
              w: feature.exons[j+1].scaledStart - exon.scaledEnd
            }
          );
        }

      }

      if (feature.label && bounds[1]) {
        this.drawLabel(feature, { x: bounds[1].x - image.scaledStart, y: bounds[1].y });
      }

    }
  }

});





/*
  Track/DAS/Sequence.js
*/
Genoverse.Track.DAS.Sequence = Genoverse.Track.extend({

  // Defaults 
  name          : "Sequence",
  height        : 45,
  featureHeight : 20,
  yOffset       : 2,
  complementary : true,
  chunkSize     : 1000,
  threshold     : 2000,
  labelOverlay  : true, 
  allData       : false,
  fontSize      : 10,
  fontFamily    : 'Verdana',
  fontWeight    : 'bold',
  dataType      : 'xml',
  textColor     : 'white',
  source        : 'http://www.ensembl.org/das/Homo_sapiens.GRCh37.reference',
  colorMap      : {
    a : "#FFAA00",
    t : "#FFDD73",
    g : "#0772A1",
    c : "#009999",
    n : "grey",
    default : "grey"
  },


  complementaryMap: {
    a: 't',
    t: 'a',
    g: 'c',
    c: 'g',
    n: 'n',
    default : 'n'
  },


  complement: function (sequence) {
    var track = this;
    return $.map(
      sequence.toLowerCase().split(''), 
      function(bp){ 
        return track.complementaryMap[bp] 
      }
    ).join('');    
  },


  init: function () {
    this.base();
    this.chunks = {};

    if (!this.url) this.url = this.source + '/sequence';

    this.context.font  = this.font;
    this.bpLabelWidths = {
      a : this.context.measureText('a').width,
      t : this.context.measureText('t').width,
      g : this.context.measureText('g').width,
      c : this.context.measureText('c').width,
      n : this.context.measureText('n').width
    };

    this.labelYOffset = this.featureHeight/2 + this.fontHeight/4;

  },


  getQueryString: function (start, end) {
    var start = start - start % this.chunkSize + 1;
    var end = end + this.chunkSize - end % this.chunkSize;
    return 'segment=' + this.browser.chr + ':' + start + ',' + end;
  },


  parseData: function (data, bounds) {
    var track = this;
    var features = new Array();
    //debugger;
    $(data).find('SEQUENCE').each(function (index, SEQUENCE) {
      var sequence = $(SEQUENCE).text();
      var start = parseInt(SEQUENCE.getAttribute('start'));
      // Check if the sequence is multi-line or not
      if (track.multiLine === undefined) {
        if (sequence.indexOf("\n") !== -1) {
          track.multiLine = true;
        } else {
          track.multiLine = false;
        }
      }

      if (track.multiLine) {
        sequence = sequence.replace(/\n/g, "");
      }

      for (var i=0; i<sequence.length; i+=track.chunkSize) {
        if (track.chunks[start+i]) continue;
        var feature = {
          id    : start+i,
          start : start+i,
          end   : start + i + track.chunkSize,
          sequence : sequence.substr(i, track.chunkSize),
        }
        track.chunks[feature.start] = feature;

        track.features.insert({ x: feature.start, w: track.chunkSize, y:0, h:1 }, feature.id);
      }

    });

    return this.features.search(bounds);
  },


  draw: function (image, features) {

    if (this.redraw) {
      this.canvas.attr({ width: image.width, height: this.height });
      this.context.textBaseline = 'top';
      this.beforeDraw(image);
      this.redraw = false; 
      this.afterDraw(image);
      image.container.append(image.images.attr('src', this.canvas[0].toDataURL()));
      return this.reDraw(); 
    } 

    var track = this;

    track.canvas.attr({ width: image.width, height: track.height });
    track.beforeDraw(image);

    track.drawFeatures(image, features);

    track.afterDraw(image);
    image.container.append(image.images.attr('src', track.canvas[0].toDataURL()));    
  },


  drawFeatures: function (image, features) {
    for (var i=0; i<features.length; i++) {
      this.drawSequence(image, this.chunks[features[i]]);
    }
  },

  drawSequence: function (image, feature, yOffset, xOffset, complementary) {
    var complementary = complementary !== undefined ? complementary : this.complementary;
    var yOffset       = yOffset !== undefined ? yOffset : this.yOffset;
    var scaledStart   = feature.start * this.scale - image.scaledStart + (xOffset || 0);
    var scaledWidth   = (feature.end - feature.start) * this.scale;    
    var bpWidth       = this.scale;

    var drawLabels = this.bpLabelWidths.a < bpWidth;
    var labelsOffset = {
      a: (bpWidth - this.bpLabelWidths.a) / 2,
      t: (bpWidth - this.bpLabelWidths.t) / 2,
      g: (bpWidth - this.bpLabelWidths.g) / 2,
      c: (bpWidth - this.bpLabelWidths.c) / 2,
      n: (bpWidth - this.bpLabelWidths.n) / 2
    };

    this.context.font  = this.font;

    for (var j = 0; j<feature.sequence.length; j++) {
      var bp = feature.sequence.substr(j,1);
      this.context.fillStyle = this.colorMap[bp];
      this.context.fillRect(scaledStart + j*bpWidth, yOffset, bpWidth, this.featureHeight);

      if (complementary) {
        this.context.fillStyle = this.colorMap[this.complementaryMap[bp]];
        this.context.fillRect(scaledStart + j*bpWidth, yOffset + this.featureHeight, bpWidth, this.featureHeight);
      }

      if (drawLabels) {
        this.context.fillStyle = this.textColor;
        this.context.fillText(bp, scaledStart + j*bpWidth + labelsOffset[bp], yOffset + this.labelYOffset);
        if (complementary) {
          this.context.fillText(this.complementaryMap[bp], scaledStart + j*bpWidth + labelsOffset[this.complementaryMap[bp]], this.featureHeight + yOffset + this.labelYOffset);
        }
      }
    }
  },


});






/*
  Track/DAS/SV.js (Sequence variation)
*/
Genoverse.Track.SV = Genoverse.Track.DAS.Sequence.extend({

  // defaults
  complementary : false,
  yOffset       : 10,
  height        : 100,
  distance      : 0.2,
  yOffset       : 35,
  featureHeight : 15,
  shadow        : {
    offsetX : 0,
    offsetY : 0,
    blur    : 5,
    color   : "black"
  },


  // I guess getData vould be different to get both sequence and variation

  drawFeatures: function (image, features) {
    this.base(image, features);
    // TODO: overlapping variations only
    this.drawVariations(image, this.variations);
  },


  drawVariations: function (image, variations) {
    for (var i = 0; i < variations.length; i++) {
      var variation = variations[i];
      variation.scaledStart = variation.start * this.scale - image.scaledStart;
      variation.scaledWidth = (variation.end - variation.start) * this.scale; 

      this['draw' + variations[i].type].call(this, image, variation);
    }    
  },


  drawDeletion: function (image, variation) {
    var featureHeight = this.complementary ? this.featureHeight * 2 : this.featureHeight;

    this.applyShadow();
    this.context.lineWidth = 3;
    this.context.strokeStyle = 'red';
    this.context.strokeRect(variation.scaledStart, this.yOffset, variation.scaledWidth, featureHeight);
    this.repealShadow();

    this.context.fillStyle = 'rgba(50,0,0,0.7)';
    this.context.fillRect(variation.scaledStart, this.yOffset, variation.scaledWidth, featureHeight);
  },


  drawInDel: function (image, variation) {
    var featuresHeight = this.complementary ? this.featureHeight * 2 : this.featureHeight;
    var referenceScaledWidth = variation.reference_allele.length * this.scale; 
    var alternateScaledWidth = variation.alternate_allele.length * this.scale; 

    this.applyShadow();
    this.context.beginPath();
    this.context.moveTo(variation.scaledStart + (referenceScaledWidth - alternateScaledWidth)/2, this.yOffset - (1 + this.distance)*this.featureHeight);
    this.context.lineTo(variation.scaledStart + (referenceScaledWidth + alternateScaledWidth)/2, this.yOffset - (1 + this.distance)*this.featureHeight);
    this.context.lineTo(variation.scaledStart + (referenceScaledWidth + alternateScaledWidth)/2, this.yOffset - this.distance*this.featureHeight);
    this.context.lineTo(variation.scaledStart + referenceScaledWidth, this.yOffset);

    if (this.complementary) {
      this.context.lineTo(variation.scaledStart + referenceScaledWidth, this.yOffset + 2*this.featureHeight);
      this.context.lineTo(variation.scaledStart, this.yOffset + 2*this.featureHeight);
    } else {
      this.context.lineTo(variation.scaledStart + referenceScaledWidth, this.yOffset + this.featureHeight);
      this.context.lineTo(variation.scaledStart, this.yOffset + this.featureHeight);
    }

    this.context.lineTo(variation.scaledStart, this.yOffset);
    this.context.lineTo(variation.scaledStart + (referenceScaledWidth - alternateScaledWidth)/2, this.yOffset - this.distance*this.featureHeight);
    this.context.lineTo(variation.scaledStart + (referenceScaledWidth - alternateScaledWidth)/2, this.yOffset - (1 + this.distance)*this.featureHeight);
    this.context.closePath();

    this.context.strokeStyle = '#1DD300';
    this.context.stroke();
    this.repealShadow();

    this.context.fillStyle = 'rgba(0,0,0,0.7)';
    this.context.fill();


    this.drawSequence(
      image, 
      { start: variation.start, end: variation.end, sequence: variation.alternate_allele.toLowerCase() }, 
      this.yOffset - (1 + this.distance)*this.featureHeight, 
      (referenceScaledWidth - alternateScaledWidth)/2,
      false
    );

    // if (this.complementary) {
    //   var track = this;
    //   this.drawSequence(
    //     image, 
    //     { start: variation.start, end: variation.end, sequence: this.complement(variation.alternate_allele) }, 
    //     this.yOffset + featureHeight, 
    //     false
    //   );
    // }    
  },


  click: function (e) {
    var x = (e.pageX - this.container.parent().offset().left)/this.scale + this.browser.start;
    var y = e.pageY - $(e.target).offset().top;    

    for (var i = 0; i < this.variations.length; i++) {
      var variation = this.variations[i];
      if (x > variation.start && x < variation.start + Math.max(variation.reference_allele.length, variation.alternate_allele.length)) {
        this.browser.makeMenu(this, variation, { left: e.pageX, top: e.pageY });
      }
    }
  },


  populateMenu: function (variation) {
    return {
      title : variation.type,
      Start : variation.start,
      End   : variation.end
    };
  },


  applyShadow: function () {
    if (this.shadow) {
      this.context.shadowOffsetX = this.shadow.offsetX;
      this.context.shadowOffsetY = this.shadow.offsetY;
      this.context.shadowBlur    = this.shadow.blur;
      this.context.shadowColor   = this.shadow.color;
    }
  },

  repealShadow: function () {
    this.context.shadowBlur = 0;
  },

});





/*
  Track/DAS/GC.js
*/
Genoverse.Track.DAS.Sequence.GC = Genoverse.Track.DAS.Sequence.extend({

  // Defaults
  name         : "GC content",
  height       : 50,
  chunkSize    : 1000,
  threshold    : 10000,
  chunks       : {},
  labelOverlay : true, 
  allData      : false,
  dataType     : 'xml',
  source       : 'http://www.ensembl.org/das/Homo_sapiens.GRCh37.reference',


  init: function () {
    this.base();
    if (!this.url) this.url = this.source + '/sequence';
  },


  draw: function (image, features) {

    if (this.redraw) {
      this.canvas.attr({ width: image.width, height: this.height });
      this.context.textBaseline = 'top';
      this.beforeDraw(image);
      this.redraw = false; 
      this.afterDraw(image);
      image.container.append(image.images.attr('src', this.canvas[0].toDataURL()));
      return this.reDraw(); 
    } 

    var track = this;

    track.canvas.attr({ width: image.width, height: track.height });
    track.beforeDraw(image);

    track.drawFeatures(image, features);

    track.afterDraw(image);
    image.container.append(image.images.attr('src', track.canvas[0].toDataURL()));    
  },


  drawFeatures: function (image, features) {
    var pieceSize = this.scale < 1 ? Math.floor(5/this.scale) : 5;//Math.floor(10/this.scale);
    var seen = {};

    features.sort(function(a,b) { return a-b });

    this.context.beginPath();
    //debugger;
    for (var i=0; i<features.length; i++) {
      var feature = this.chunks[features[i]];

      if (seen[feature.id])
        continue;
      seen[feature.id] = 1;

      var scaledStart = feature.start * this.scale - image.scaledStart;
      var scaledWidth = (feature.end - feature.start) * this.scale;    
      var bpWidth     = scaledWidth / this.chunkSize;
      var pieceWidth  = bpWidth * pieceSize;

      if (i == 0) {
        this.context.moveTo(scaledStart, this.height/2);
      }


      for (var j = 0; j<feature.sequence.length; j += pieceSize) {
        var piece = feature.sequence.substr(j, pieceSize);
        var score = 0;

        for (var k = 0; k<piece.length; k++) {
          var bp = piece.substr(k, 1);
          if (bp == 'g' || bp == 'c') {
            score++;
          }
        }

        this.context.lineTo(scaledStart + j*bpWidth + pieceWidth, this.height - this.height*score/pieceSize);
      }
    }

    this.context.lineWidth = 1;
    this.context.strokeStyle = "blue";
    this.context.stroke();
    this.context.closePath();
  },

});


// Last script tag should always be this script
var thisScriptTag = $('script:last');
var config = thisScriptTag.text();
var origin = thisScriptTag.attr('src').split("/").slice(0, -2).join("/") || '.';

LazyLoad.css(origin + '/css/genoverse.css');

if (config) {
  try {
    config = eval('('+ config +')');
    config.origin = origin;

    $(document).ready(function(){ window.genoverse = new Genoverse(config) });
  } catch (e) {
    throw('ERROR while parsing the configuration:' + e);
  };
}


})($.noConflict(true));



