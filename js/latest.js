(function () {
/*! jQuery v1.7.1 jquery.com | jquery.org/license */
(function(a,b){function cy(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cv(a){if(!ck[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){cl||(cl=c.createElement("iframe"),cl.frameBorder=cl.width=cl.height=0),b.appendChild(cl);if(!cm||!cl.createElement)cm=(cl.contentWindow||cl.contentDocument).document,cm.write((c.compatMode==="CSS1Compat"?"<!doctype html>":"")+"<html><body>"),cm.close();d=cm.createElement(a),cm.body.appendChild(d),e=f.css(d,"display"),b.removeChild(cl)}ck[a]=e}return ck[a]}function cu(a,b){var c={};f.each(cq.concat.apply([],cq.slice(0,b)),function(){c[this]=a});return c}function ct(){cr=b}function cs(){setTimeout(ct,0);return cr=f.now()}function cj(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ci(){try{return new a.XMLHttpRequest}catch(b){}}function cc(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function cb(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function ca(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bE.test(a)?d(a,e):ca(a+"["+(typeof e=="object"||f.isArray(e)?b:"")+"]",e,c,d)});else if(!c&&b!=null&&typeof b=="object")for(var e in b)ca(a+"["+e+"]",b[e],c,d);else d(a,b)}function b_(a,c){var d,e,g=f.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((g[d]?a:e||(e={}))[d]=c[d]);e&&f.extend(!0,a,e)}function b$(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bT,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=b$(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=b$(a,c,d,e,"*",g));return l}function bZ(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bP),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bC(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?bx:by,g=0,h=e.length;if(d>0){if(c!=="border")for(;g<h;g++)c||(d-=parseFloat(f.css(a,"padding"+e[g]))||0),c==="margin"?d+=parseFloat(f.css(a,c+e[g]))||0:d-=parseFloat(f.css(a,"border"+e[g]+"Width"))||0;return d+"px"}d=bz(a,b,b);if(d<0||d==null)d=a.style[b]||0;d=parseFloat(d)||0;if(c)for(;g<h;g++)d+=parseFloat(f.css(a,"padding"+e[g]))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+e[g]+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+e[g]))||0);return d+"px"}function bp(a,b){b.src?f.ajax({url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bf,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)}function bo(a){var b=c.createElement("div");bh.appendChild(b),b.innerHTML=a.outerHTML;return b.firstChild}function bn(a){var b=(a.nodeName||"").toLowerCase();b==="input"?bm(a):b!=="script"&&typeof a.getElementsByTagName!="undefined"&&f.grep(a.getElementsByTagName("input"),bm)}function bm(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bl(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bk(a,b){var c;if(b.nodeType===1){b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase();if(c==="object")b.outerHTML=a.outerHTML;else if(c!=="input"||a.type!=="checkbox"&&a.type!=="radio"){if(c==="option")b.selected=a.defaultSelected;else if(c==="input"||c==="textarea")b.defaultValue=a.defaultValue}else a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value);b.removeAttribute(f.expando)}}function bj(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c,d,e,g=f._data(a),h=f._data(b,g),i=g.events;if(i){delete h.handle,h.events={};for(c in i)for(d=0,e=i[c].length;d<e;d++)f.event.add(b,c+(i[c][d].namespace?".":"")+i[c][d].namespace,i[c][d],i[c][d].data)}h.data&&(h.data=f.extend({},h.data))}}function bi(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function U(a){var b=V.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function T(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(O.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function S(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function K(){return!0}function J(){return!1}function n(a,b,c){var d=b+"defer",e=b+"queue",g=b+"mark",h=f._data(a,d);h&&(c==="queue"||!f._data(a,e))&&(c==="mark"||!f._data(a,g))&&setTimeout(function(){!f._data(a,e)&&!f._data(a,g)&&(f.removeData(a,d,!0),h.fire())},0)}function m(a){for(var b in a){if(b==="data"&&f.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function l(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(k,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNumeric(d)?parseFloat(d):j.test(d)?f.parseJSON(d):d}catch(g){}f.data(a,c,d)}else d=b}return d}function h(a){var b=g[a]={},c,d;a=a.split(/\s+/);for(c=0,d=a.length;c<d;c++)b[a[c]]=!0;return b}var c=a.document,d=a.navigator,e=a.location,f=function(){function J(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(J,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,n=/^[\],:{}\s]*$/,o=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,p=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,q=/(?:^|:|,)(?:\s*\[)+/g,r=/(webkit)[ \/]([\w.]+)/,s=/(opera)(?:.*version)?[ \/]([\w.]+)/,t=/(msie) ([\w.]+)/,u=/(mozilla)(?:.*? rv:([\w.]+))?/,v=/-([a-z]|[0-9])/ig,w=/^-ms-/,x=function(a,b){return(b+"").toUpperCase()},y=d.userAgent,z,A,B,C=Object.prototype.toString,D=Object.prototype.hasOwnProperty,E=Array.prototype.push,F=Array.prototype.slice,G=String.prototype.trim,H=Array.prototype.indexOf,I={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=m.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.7.1",length:0,size:function(){return this.length},toArray:function(){return F.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?E.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),A.add(a);return this},eq:function(a){a=+a;return a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(F.apply(this,arguments),"slice",F.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:E,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;A.fireWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").off("ready")}},bindReady:function(){if(!A){A=e.Callbacks("once memory");if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",B,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",B),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&J()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a&&typeof a=="object"&&"setInterval"in a},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):I[C.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;try{if(a.constructor&&!D.call(a,"constructor")&&!D.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||D.call(a,d)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw new Error(a)},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(n.test(b.replace(o,"@").replace(p,"]").replace(q,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(c){var d,f;try{a.DOMParser?(f=new DOMParser,d=f.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(g){d=b}(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&e.error("Invalid XML: "+c);return d},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(w,"ms-").replace(v,x)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:G?function(a){return a==null?"":G.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?E.call(c,a):e.merge(c,a)}return c},inArray:function(a,b,c){var d;if(b){if(H)return H.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=F.call(arguments,2),g=function(){return a.apply(c,f.concat(F.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h){var i=a.length;if(typeof c=="object"){for(var j in c)e.access(a,j,c[j],f,g,d);return a}if(d!==b){f=!h&&f&&e.isFunction(d);for(var k=0;k<i;k++)g(a[k],c,f?d.call(a[k],k,g(a[k],c)):d,h);return a}return i?g(a[0],c):b},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=r.exec(a)||s.exec(a)||t.exec(a)||a.indexOf("compatible")<0&&u.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){I["[object "+b+"]"]=b.toLowerCase()}),z=e.uaMatch(y),z.browser&&(e.browser[z.browser]=!0,e.browser.version=z.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?B=function(){c.removeEventListener("DOMContentLoaded",B,!1),e.ready()}:c.attachEvent&&(B=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",B),e.ready())});return e}(),g={};f.Callbacks=function(a){a=a?g[a]||h(a):{};var c=[],d=[],e,i,j,k,l,m=function(b){var d,e,g,h,i;for(d=0,e=b.length;d<e;d++)g=b[d],h=f.type(g),h==="array"?m(g):h==="function"&&(!a.unique||!o.has(g))&&c.push(g)},n=function(b,f){f=f||[],e=!a.memory||[b,f],i=!0,l=j||0,j=0,k=c.length;for(;c&&l<k;l++)if(c[l].apply(b,f)===!1&&a.stopOnFalse){e=!0;break}i=!1,c&&(a.once?e===!0?o.disable():c=[]:d&&d.length&&(e=d.shift(),o.fireWith(e[0],e[1])))},o={add:function(){if(c){var a=c.length;m(arguments),i?k=c.length:e&&e!==!0&&(j=a,n(e[0],e[1]))}return this},remove:function(){if(c){var b=arguments,d=0,e=b.length;for(;d<e;d++)for(var f=0;f<c.length;f++)if(b[d]===c[f]){i&&f<=k&&(k--,f<=l&&l--),c.splice(f--,1);if(a.unique)break}}return this},has:function(a){if(c){var b=0,d=c.length;for(;b<d;b++)if(a===c[b])return!0}return!1},empty:function(){c=[];return this},disable:function(){c=d=e=b;return this},disabled:function(){return!c},lock:function(){d=b,(!e||e===!0)&&o.disable();return this},locked:function(){return!d},fireWith:function(b,c){d&&(i?a.once||d.push([b,c]):(!a.once||!e)&&n(b,c));return this},fire:function(){o.fireWith(this,arguments);return this},fired:function(){return!!e}};return o};var i=[].slice;f.extend({Deferred:function(a){var b=f.Callbacks("once memory"),c=f.Callbacks("once memory"),d=f.Callbacks("memory"),e="pending",g={resolve:b,reject:c,notify:d},h={done:b.add,fail:c.add,progress:d.add,state:function(){return e},isResolved:b.fired,isRejected:c.fired,then:function(a,b,c){i.done(a).fail(b).progress(c);return this},always:function(){i.done.apply(i,arguments).fail.apply(i,arguments);return this},pipe:function(a,b,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[b,"reject"],progress:[c,"notify"]},function(a,b){var c=b[0],e=b[1],g;f.isFunction(c)?i[a](function(){g=c.apply(this,arguments),g&&f.isFunction(g.promise)?g.promise().then(d.resolve,d.reject,d.notify):d[e+"With"](this===i?d:this,[g])}):i[a](d[e])})}).promise()},promise:function(a){if(a==null)a=h;else for(var b in h)a[b]=h[b];return a}},i=h.promise({}),j;for(j in g)i[j]=g[j].fire,i[j+"With"]=g[j].fireWith;i.done(function(){e="resolved"},c.disable,d.lock).fail(function(){e="rejected"},b.disable,d.lock),a&&a.call(i,i);return i},when:function(a){function m(a){return function(b){e[a]=arguments.length>1?i.call(arguments,0):b,j.notifyWith(k,e)}}function l(a){return function(c){b[a]=arguments.length>1?i.call(arguments,0):c,--g||j.resolveWith(j,b)}}var b=i.call(arguments,0),c=0,d=b.length,e=Array(d),g=d,h=d,j=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred(),k=j.promise();if(d>1){for(;c<d;c++)b[c]&&b[c].promise&&f.isFunction(b[c].promise)?b[c].promise().then(l(c),j.reject,m(c)):--g;g||j.resolveWith(j,b)}else j!==a&&j.resolveWith(j,d?[a]:[]);return k}}),f.support=function(){var b,d,e,g,h,i,j,k,l,m,n,o,p,q=c.createElement("div"),r=c.documentElement;q.setAttribute("className","t"),q.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=q.getElementsByTagName("*"),e=q.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=q.getElementsByTagName("input")[0],b={leadingWhitespace:q.firstChild.nodeType===3,tbody:!q.getElementsByTagName("tbody").length,htmlSerialize:!!q.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:q.className!=="t",enctype:!!c.createElement("form").enctype,html5Clone:c.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0},i.checked=!0,b.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,b.optDisabled=!h.disabled;try{delete q.test}catch(s){b.deleteExpando=!1}!q.addEventListener&&q.attachEvent&&q.fireEvent&&(q.attachEvent("onclick",function(){b.noCloneEvent=!1}),q.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),b.radioValue=i.value==="t",i.setAttribute("checked","checked"),q.appendChild(i),k=c.createDocumentFragment(),k.appendChild(q.lastChild),b.checkClone=k.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=i.checked,k.removeChild(i),k.appendChild(q),q.innerHTML="",a.getComputedStyle&&(j=c.createElement("div"),j.style.width="0",j.style.marginRight="0",q.style.width="2px",q.appendChild(j),b.reliableMarginRight=(parseInt((a.getComputedStyle(j,null)||{marginRight:0}).marginRight,10)||0)===0);if(q.attachEvent)for(o in{submit:1,change:1,focusin:1})n="on"+o,p=n in q,p||(q.setAttribute(n,"return;"),p=typeof q[n]=="function"),b[o+"Bubbles"]=p;k.removeChild(q),k=g=h=j=q=i=null,f(function(){var a,d,e,g,h,i,j,k,m,n,o,r=c.getElementsByTagName("body")[0];!r||(j=1,k="position:absolute;top:0;left:0;width:1px;height:1px;margin:0;",m="visibility:hidden;border:0;",n="style='"+k+"border:5px solid #000;padding:0;'",o="<div "+n+"><div></div></div>"+"<table "+n+" cellpadding='0' cellspacing='0'>"+"<tr><td></td></tr></table>",a=c.createElement("div"),a.style.cssText=m+"width:0;height:0;position:static;top:0;margin-top:"+j+"px",r.insertBefore(a,r.firstChild),q=c.createElement("div"),a.appendChild(q),q.innerHTML="<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>",l=q.getElementsByTagName("td"),p=l[0].offsetHeight===0,l[0].style.display="",l[1].style.display="none",b.reliableHiddenOffsets=p&&l[0].offsetHeight===0,q.innerHTML="",q.style.width=q.style.paddingLeft="1px",f.boxModel=b.boxModel=q.offsetWidth===2,typeof q.style.zoom!="undefined"&&(q.style.display="inline",q.style.zoom=1,b.inlineBlockNeedsLayout=q.offsetWidth===2,q.style.display="",q.innerHTML="<div style='width:4px;'></div>",b.shrinkWrapBlocks=q.offsetWidth!==2),q.style.cssText=k+m,q.innerHTML=o,d=q.firstChild,e=d.firstChild,h=d.nextSibling.firstChild.firstChild,i={doesNotAddBorder:e.offsetTop!==5,doesAddBorderForTableAndCells:h.offsetTop===5},e.style.position="fixed",e.style.top="20px",i.fixedPosition=e.offsetTop===20||e.offsetTop===15,e.style.position=e.style.top="",d.style.overflow="hidden",d.style.position="relative",i.subtractsBorderForOverflowNotVisible=e.offsetTop===-5,i.doesNotIncludeMarginInBodyOffset=r.offsetTop!==j,r.removeChild(a),q=a=null,f.extend(b,i))});return b}();var j=/^(?:\{.*\}|\[.*\])$/,k=/([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!m(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g,h,i,j=f.expando,k=typeof c=="string",l=a.nodeType,m=l?f.cache:a,n=l?a[j]:a[j]&&j,o=c==="events";if((!n||!m[n]||!o&&!e&&!m[n].data)&&k&&d===b)return;n||(l?a[j]=n=++f.uuid:n=j),m[n]||(m[n]={},l||(m[n].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?m[n]=f.extend(m[n],c):m[n].data=f.extend(m[n].data,c);g=h=m[n],e||(h.data||(h.data={}),h=h.data),d!==b&&(h[f.camelCase(c)]=d);if(o&&!h[c])return g.events;k?(i=h[c],i==null&&(i=h[f.camelCase(c)])):i=h;return i}},removeData:function(a,b,c){if(!!f.acceptData(a)){var d,e,g,h=f.expando,i=a.nodeType,j=i?f.cache:a,k=i?a[h]:h;if(!j[k])return;if(b){d=c?j[k]:j[k].data;if(d){f.isArray(b)||(b in d?b=[b]:(b=f.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,g=b.length;e<g;e++)delete d[b[e]];if(!(c?m:f.isEmptyObject)(d))return}}if(!c){delete j[k].data;if(!m(j[k]))return}f.support.deleteExpando||!j.setInterval?delete j[k]:j[k]=null,i&&(f.support.deleteExpando?delete a[h]:a.removeAttribute?a.removeAttribute(h):a[h]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d,e,g,h=null;if(typeof a=="undefined"){if(this.length){h=f.data(this[0]);if(this[0].nodeType===1&&!f._data(this[0],"parsedAttrs")){e=this[0].attributes;for(var i=0,j=e.length;i<j;i++)g=e[i].name,g.indexOf("data-")===0&&(g=f.camelCase(g.substring(5)),l(this[0],g,h[g]));f._data(this[0],"parsedAttrs",!0)}}return h}if(typeof a=="object")return this.each(function(){f.data(this,a)});d=a.split("."),d[1]=d[1]?"."+d[1]:"";if(c===b){h=this.triggerHandler("getData"+d[1]+"!",[d[0]]),h===b&&this.length&&(h=f.data(this[0],a),h=l(this[0],a,h));return h===b&&d[1]?this.data(d[0]):h}return this.each(function(){var b=f(this),e=[d[0],c];b.triggerHandler("setData"+d[1]+"!",e),f.data(this,a,c),b.triggerHandler("changeData"+d[1]+"!",e)})},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,b){a&&(b=(b||"fx")+"mark",f._data(a,b,(f._data(a,b)||0)+1))},_unmark:function(a,b,c){a!==!0&&(c=b,b=a,a=!1);if(b){c=c||"fx";var d=c+"mark",e=a?0:(f._data(b,d)||1)-1;e?f._data(b,d,e):(f.removeData(b,d,!0),n(b,c,"mark"))}},queue:function(a,b,c){var d;if(a){b=(b||"fx")+"queue",d=f._data(a,b),c&&(!d||f.isArray(c)?d=f._data(a,b,f.makeArray(c)):d.push(c));return d||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e={};d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),f._data(a,b+".run",e),d.call(a,function(){f.dequeue(a,b)},e)),c.length||(f.removeData(a,b+"queue "+b+".run",!0),n(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){typeof a!="string"&&(c=a,a="fx");if(c===b)return f.queue(this[0],a);return this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f.Callbacks("once memory"),!0))h++,l.add(m);m();return d.promise()}});var o=/[\n\t\r]/g,p=/\s+/,q=/\r/g,r=/^(?:button|input)$/i,s=/^(?:button|input|object|select|textarea)$/i,t=/^a(?:rea)?$/i,u=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,v=f.support.getSetAttribute,w,x,y;f.fn.extend({attr:function(a,b){return f.access(this,a,b,!0,f.attr)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,a,b,!0,f.prop)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,g,h,i;if(f.isFunction(a))return this.each(function(b){f(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(p);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{g=" "+e.className+" ";for(h=0,i=b.length;h<i;h++)~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ");e.className=f.trim(g)}}}return this},removeClass:function(a){var c,d,e,g,h,i,j;if(f.isFunction(a))return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(p);for(d=0,e=this.length;d<e;d++){g=this[d];if(g.nodeType===1&&g.className)if(a){h=(" "+g.className+" ").replace(o," ");for(i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(p);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(o," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e,g=this[0];{if(!!arguments.length){e=f.isFunction(a);return this.each(function(d){var g=f(this),h;if(this.nodeType===1){e?h=a.call(this,d,g.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.nodeName.toLowerCase()]||f.valHooks[this.type];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}if(g){c=f.valHooks[g.nodeName.toLowerCase()]||f.valHooks[g.type];if(c&&"get"in c&&(d=c.get(g,"value"))!==b)return d;d=g.value;return typeof d=="string"?d.replace(q,""):d==null?"":d}}}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,g=a.selectedIndex,h=[],i=a.options,j=a.type==="select-one";if(g<0)return null;c=j?g:0,d=j?g+1:i.length;for(;c<d;c++){e=i[c];if(e.selected&&(f.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!f.nodeName(e.parentNode,"optgroup"))){b=f(e).val();if(j)return b;h.push(b)}}if(j&&!h.length&&i.length)return f(i[g]).val();return h},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attr:function(a,c,d,e){var g,h,i,j=a.nodeType;if(!!a&&j!==3&&j!==8&&j!==2){if(e&&c in f.attrFn)return f(a)[c](d);if(typeof a.getAttribute=="undefined")return f.prop(a,c,d);i=j!==1||!f.isXMLDoc(a),i&&(c=c.toLowerCase(),h=f.attrHooks[c]||(u.test(c)?x:w));if(d!==b){if(d===null){f.removeAttr(a,c);return}if(h&&"set"in h&&i&&(g=h.set(a,d,c))!==b)return g;a.setAttribute(c,""+d);return d}if(h&&"get"in h&&i&&(g=h.get(a,c))!==null)return g;g=a.getAttribute(c);return g===null?b:g}},removeAttr:function(a,b){var c,d,e,g,h=0;if(b&&a.nodeType===1){d=b.toLowerCase().split(p),g=d.length;for(;h<g;h++)e=d[h],e&&(c=f.propFix[e]||e,f.attr(a,e,""),a.removeAttribute(v?e:c),u.test(e)&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(r.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},value:{get:function(a,b){if(w&&f.nodeName(a,"button"))return w.get(a,b);return b in a?a.value:null},set:function(a,b,c){if(w&&f.nodeName(a,"button"))return w.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,g,h,i=a.nodeType;if(!!a&&i!==3&&i!==8&&i!==2){h=i!==1||!f.isXMLDoc(a),h&&(c=f.propFix[c]||c,g=f.propHooks[c]);return d!==b?g&&"set"in g&&(e=g.set(a,d,c))!==b?e:a[c]=d:g&&"get"in g&&(e=g.get(a,c))!==null?e:a[c]}},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):s.test(a.nodeName)||t.test(a.nodeName)&&a.href?0:b}}}}),f.attrHooks.tabindex=f.propHooks.tabIndex,x={get:function(a,c){var d,e=f.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));return c}},v||(y={name:!0,id:!0},w=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&(y[c]?d.nodeValue!=="":d.specified)?d.nodeValue:b},set:function(a,b,d){var e=a.getAttributeNode(d);e||(e=c.createAttribute(d),a.setAttributeNode(e));return e.nodeValue=b+""}},f.attrHooks.tabindex.set=w.set,f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})}),f.attrHooks.contenteditable={get:w.get,set:function(a,b,c){b===""&&(b="false"),w.set(a,b,c)}}),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex);return null}})),f.support.enctype||(f.propFix.enctype="encoding"),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var z=/^(?:textarea|input|select)$/i,A=/^([^\.]*)?(?:\.(.+))?$/,B=/\bhover(\.\S+)?\b/,C=/^key/,D=/^(?:mouse|contextmenu)|click/,E=/^(?:focusinfocus|focusoutblur)$/,F=/^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,G=function(a){var b=F.exec(a);b&&(b[1]=(b[1]||"").toLowerCase(),b[3]=b[3]&&new RegExp("(?:^|\\s)"+b[3]+"(?:\\s|$)"));return b},H=function(a,b){var c=a.attributes||{};return(!b[1]||a.nodeName.toLowerCase()===b[1])&&(!b[2]||(c.id||{}).value===b[2])&&(!b[3]||b[3].test((c["class"]||{}).value))},I=function(a){return f.event.special.hover?a:a.replace(B,"mouseenter$1 mouseleave$1")};
f.event={add:function(a,c,d,e,g){var h,i,j,k,l,m,n,o,p,q,r,s;if(!(a.nodeType===3||a.nodeType===8||!c||!d||!(h=f._data(a)))){d.handler&&(p=d,d=p.handler),d.guid||(d.guid=f.guid++),j=h.events,j||(h.events=j={}),i=h.handle,i||(h.handle=i=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.dispatch.apply(i.elem,arguments):b},i.elem=a),c=f.trim(I(c)).split(" ");for(k=0;k<c.length;k++){l=A.exec(c[k])||[],m=l[1],n=(l[2]||"").split(".").sort(),s=f.event.special[m]||{},m=(g?s.delegateType:s.bindType)||m,s=f.event.special[m]||{},o=f.extend({type:m,origType:l[1],data:e,handler:d,guid:d.guid,selector:g,quick:G(g),namespace:n.join(".")},p),r=j[m];if(!r){r=j[m]=[],r.delegateCount=0;if(!s.setup||s.setup.call(a,e,n,i)===!1)a.addEventListener?a.addEventListener(m,i,!1):a.attachEvent&&a.attachEvent("on"+m,i)}s.add&&(s.add.call(a,o),o.handler.guid||(o.handler.guid=d.guid)),g?r.splice(r.delegateCount++,0,o):r.push(o),f.event.global[m]=!0}a=null}},global:{},remove:function(a,b,c,d,e){var g=f.hasData(a)&&f._data(a),h,i,j,k,l,m,n,o,p,q,r,s;if(!!g&&!!(o=g.events)){b=f.trim(I(b||"")).split(" ");for(h=0;h<b.length;h++){i=A.exec(b[h])||[],j=k=i[1],l=i[2];if(!j){for(j in o)f.event.remove(a,j+b[h],c,d,!0);continue}p=f.event.special[j]||{},j=(d?p.delegateType:p.bindType)||j,r=o[j]||[],m=r.length,l=l?new RegExp("(^|\\.)"+l.split(".").sort().join("\\.(?:.*\\.)?")+"(\\.|$)"):null;for(n=0;n<r.length;n++)s=r[n],(e||k===s.origType)&&(!c||c.guid===s.guid)&&(!l||l.test(s.namespace))&&(!d||d===s.selector||d==="**"&&s.selector)&&(r.splice(n--,1),s.selector&&r.delegateCount--,p.remove&&p.remove.call(a,s));r.length===0&&m!==r.length&&((!p.teardown||p.teardown.call(a,l)===!1)&&f.removeEvent(a,j,g.handle),delete o[j])}f.isEmptyObject(o)&&(q=g.handle,q&&(q.elem=null),f.removeData(a,["events","handle"],!0))}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){if(!e||e.nodeType!==3&&e.nodeType!==8){var h=c.type||c,i=[],j,k,l,m,n,o,p,q,r,s;if(E.test(h+f.event.triggered))return;h.indexOf("!")>=0&&(h=h.slice(0,-1),k=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if((!e||f.event.customEvent[h])&&!f.event.global[h])return;c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.isTrigger=!0,c.exclusive=k,c.namespace=i.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)"):null,o=h.indexOf(":")<0?"on"+h:"";if(!e){j=f.cache;for(l in j)j[l].events&&j[l].events[h]&&f.event.trigger(c,d,j[l].handle.elem,!0);return}c.result=b,c.target||(c.target=e),d=d!=null?f.makeArray(d):[],d.unshift(c),p=f.event.special[h]||{};if(p.trigger&&p.trigger.apply(e,d)===!1)return;r=[[e,p.bindType||h]];if(!g&&!p.noBubble&&!f.isWindow(e)){s=p.delegateType||h,m=E.test(s+h)?e:e.parentNode,n=null;for(;m;m=m.parentNode)r.push([m,s]),n=m;n&&n===e.ownerDocument&&r.push([n.defaultView||n.parentWindow||a,s])}for(l=0;l<r.length&&!c.isPropagationStopped();l++)m=r[l][0],c.type=r[l][1],q=(f._data(m,"events")||{})[c.type]&&f._data(m,"handle"),q&&q.apply(m,d),q=o&&m[o],q&&f.acceptData(m)&&q.apply(m,d)===!1&&c.preventDefault();c.type=h,!g&&!c.isDefaultPrevented()&&(!p._default||p._default.apply(e.ownerDocument,d)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)&&o&&e[h]&&(h!=="focus"&&h!=="blur"||c.target.offsetWidth!==0)&&!f.isWindow(e)&&(n=e[o],n&&(e[o]=null),f.event.triggered=h,e[h](),f.event.triggered=b,n&&(e[o]=n));return c.result}},dispatch:function(c){c=f.event.fix(c||a.event);var d=(f._data(this,"events")||{})[c.type]||[],e=d.delegateCount,g=[].slice.call(arguments,0),h=!c.exclusive&&!c.namespace,i=[],j,k,l,m,n,o,p,q,r,s,t;g[0]=c,c.delegateTarget=this;if(e&&!c.target.disabled&&(!c.button||c.type!=="click")){m=f(this),m.context=this.ownerDocument||this;for(l=c.target;l!=this;l=l.parentNode||this){o={},q=[],m[0]=l;for(j=0;j<e;j++)r=d[j],s=r.selector,o[s]===b&&(o[s]=r.quick?H(l,r.quick):m.is(s)),o[s]&&q.push(r);q.length&&i.push({elem:l,matches:q})}}d.length>e&&i.push({elem:this,matches:d.slice(e)});for(j=0;j<i.length&&!c.isPropagationStopped();j++){p=i[j],c.currentTarget=p.elem;for(k=0;k<p.matches.length&&!c.isImmediatePropagationStopped();k++){r=p.matches[k];if(h||!c.namespace&&!r.namespace||c.namespace_re&&c.namespace_re.test(r.namespace))c.data=r.data,c.handleObj=r,n=((f.event.special[r.origType]||{}).handle||r.handler).apply(p.elem,g),n!==b&&(c.result=n,n===!1&&(c.preventDefault(),c.stopPropagation()))}}return c.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode);return a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,d){var e,f,g,h=d.button,i=d.fromElement;a.pageX==null&&d.clientX!=null&&(e=a.target.ownerDocument||c,f=e.documentElement,g=e.body,a.pageX=d.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=d.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?d.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0);return a}},fix:function(a){if(a[f.expando])return a;var d,e,g=a,h=f.event.fixHooks[a.type]||{},i=h.props?this.props.concat(h.props):this.props;a=f.Event(g);for(d=i.length;d;)e=i[--d],a[e]=g[e];a.target||(a.target=g.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey===b&&(a.metaKey=a.ctrlKey);return h.filter?h.filter(a,g):a},special:{ready:{setup:f.bindReady},load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=f.extend(new f.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?f.event.trigger(e,null,b):f.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},f.event.handle=f.event.dispatch,f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!(this instanceof f.Event))return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?K:J):this.type=a,b&&f.extend(this,b),this.timeStamp=a&&a.timeStamp||f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=K;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=K;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=K,this.stopPropagation()},isDefaultPrevented:J,isPropagationStopped:J,isImmediatePropagationStopped:J},f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c=this,d=a.relatedTarget,e=a.handleObj,g=e.selector,h;if(!d||d!==c&&!f.contains(c,d))a.type=e.origType,h=e.handler.apply(this,arguments),a.type=b;return h}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(){if(f.nodeName(this,"form"))return!1;f.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=f.nodeName(c,"input")||f.nodeName(c,"button")?c.form:b;d&&!d._submit_attached&&(f.event.add(d,"submit._submit",function(a){this.parentNode&&!a.isTrigger&&f.event.simulate("submit",this.parentNode,a,!0)}),d._submit_attached=!0)})},teardown:function(){if(f.nodeName(this,"form"))return!1;f.event.remove(this,"._submit")}}),f.support.changeBubbles||(f.event.special.change={setup:function(){if(z.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")f.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),f.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1,f.event.simulate("change",this,a,!0))});return!1}f.event.add(this,"beforeactivate._change",function(a){var b=a.target;z.test(b.nodeName)&&!b._change_attached&&(f.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&f.event.simulate("change",this.parentNode,a,!0)}),b._change_attached=!0)})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){f.event.remove(this,"._change");return z.test(this.nodeName)}}),f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){var d=0,e=function(a){f.event.simulate(b,a.target,f.event.fix(a),!0)};f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.fn.extend({on:function(a,c,d,e,g){var h,i;if(typeof a=="object"){typeof c!="string"&&(d=c,c=b);for(i in a)this.on(i,c,d,a[i],g);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=J;else if(!e)return this;g===1&&(h=e,e=function(a){f().off(a);return h.apply(this,arguments)},e.guid=h.guid||(h.guid=f.guid++));return this.each(function(){f.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on.call(this,a,b,c,d,1)},off:function(a,c,d){if(a&&a.preventDefault&&a.handleObj){var e=a.handleObj;f(a.delegateTarget).off(e.namespace?e.type+"."+e.namespace:e.type,e.selector,e.handler);return this}if(typeof a=="object"){for(var g in a)this.off(g,c,a[g]);return this}if(c===!1||typeof c=="function")d=c,c=b;d===!1&&(d=J);return this.each(function(){f.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){f(this.context).on(a,this.selector,b,c);return this},die:function(a,b){f(this.context).off(a,this.selector||"**",b);return this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length==1?this.off(a,"**"):this.off(b,a,c)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f._data(this,"lastToggle"+a.guid)||0)%d;f._data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.on(b,null,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0),C.test(b)&&(f.event.fixHooks[b]=f.event.keyHooks),D.test(b)&&(f.event.fixHooks[b]=f.event.mouseHooks)}),function(){function x(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}if(j.nodeType===1){g||(j[d]=c,j.sizset=h);if(typeof b!="string"){if(j===b){k=!0;break}}else if(m.filter(b,[j]).length>0){k=j;break}}j=j[a]}e[h]=k}}}function w(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}j.nodeType===1&&!g&&(j[d]=c,j.sizset=h);if(j.nodeName.toLowerCase()===b){k=j;break}j=j[a]}e[h]=k}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d="sizcache"+(Math.random()+"").replace(".",""),e=0,g=Object.prototype.toString,h=!1,i=!0,j=/\\/g,k=/\r\n/g,l=/\W/;[0,0].sort(function(){i=!1;return 0});var m=function(b,d,e,f){e=e||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return e;var i,j,k,l,n,q,r,t,u=!0,v=m.isXML(d),w=[],x=b;do{a.exec(""),i=a.exec(x);if(i){x=i[3],w.push(i[1]);if(i[2]){l=i[3];break}}}while(i);if(w.length>1&&p.exec(b))if(w.length===2&&o.relative[w[0]])j=y(w[0]+w[1],d,f);else{j=o.relative[w[0]]?[d]:m(w.shift(),d);while(w.length)b=w.shift(),o.relative[b]&&(b+=w.shift()),j=y(b,j,f)}else{!f&&w.length>1&&d.nodeType===9&&!v&&o.match.ID.test(w[0])&&!o.match.ID.test(w[w.length-1])&&(n=m.find(w.shift(),d,v),d=n.expr?m.filter(n.expr,n.set)[0]:n.set[0]);if(d){n=f?{expr:w.pop(),set:s(f)}:m.find(w.pop(),w.length===1&&(w[0]==="~"||w[0]==="+")&&d.parentNode?d.parentNode:d,v),j=n.expr?m.filter(n.expr,n.set):n.set,w.length>0?k=s(j):u=!1;while(w.length)q=w.pop(),r=q,o.relative[q]?r=w.pop():q="",r==null&&(r=d),o.relative[q](k,r,v)}else k=w=[]}k||(k=j),k||m.error(q||b);if(g.call(k)==="[object Array]")if(!u)e.push.apply(e,k);else if(d&&d.nodeType===1)for(t=0;k[t]!=null;t++)k[t]&&(k[t]===!0||k[t].nodeType===1&&m.contains(d,k[t]))&&e.push(j[t]);else for(t=0;k[t]!=null;t++)k[t]&&k[t].nodeType===1&&e.push(j[t]);else s(k,e);l&&(m(l,h,e,f),m.uniqueSort(e));return e};m.uniqueSort=function(a){if(u){h=i,a.sort(u);if(h)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},m.matches=function(a,b){return m(a,null,null,b)},m.matchesSelector=function(a,b){return m(b,null,null,[a]).length>0},m.find=function(a,b,c){var d,e,f,g,h,i;if(!a)return[];for(e=0,f=o.order.length;e<f;e++){h=o.order[e];if(g=o.leftMatch[h].exec(a)){i=g[1],g.splice(1,1);if(i.substr(i.length-1)!=="\\"){g[1]=(g[1]||"").replace(j,""),d=o.find[h](g,b,c);if(d!=null){a=a.replace(o.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},m.filter=function(a,c,d,e){var f,g,h,i,j,k,l,n,p,q=a,r=[],s=c,t=c&&c[0]&&m.isXML(c[0]);while(a&&c.length){for(h in o.filter)if((f=o.leftMatch[h].exec(a))!=null&&f[2]){k=o.filter[h],l=f[1],g=!1,f.splice(1,1);if(l.substr(l.length-1)==="\\")continue;s===r&&(r=[]);if(o.preFilter[h]){f=o.preFilter[h](f,s,d,r,e,t);if(!f)g=i=!0;else if(f===!0)continue}if(f)for(n=0;(j=s[n])!=null;n++)j&&(i=k(j,f,n,s),p=e^i,d&&i!=null?p?g=!0:s[n]=!1:p&&(r.push(j),g=!0));if(i!==b){d||(s=r),a=a.replace(o.match[h],"");if(!g)return[];break}}if(a===q)if(g==null)m.error(a);else break;q=a}return s},m.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)};var n=m.getText=function(a){var b,c,d=a.nodeType,e="";if(d){if(d===1||d===9){if(typeof a.textContent=="string")return a.textContent;if(typeof a.innerText=="string")return a.innerText.replace(k,"");for(a=a.firstChild;a;a=a.nextSibling)e+=n(a)}else if(d===3||d===4)return a.nodeValue}else for(b=0;c=a[b];b++)c.nodeType!==8&&(e+=n(c));return e},o=m.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!l.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&m.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!l.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&m.filter(b,a,!0)}},"":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("parentNode",b,f,a,d,c)},"~":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("previousSibling",b,f,a,d,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(j,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(j,"")},TAG:function(a,b){return a[1].replace(j,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||m.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&m.error(a[0]);a[0]=e++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(j,"");!f&&o.attrMap[g]&&(a[1]=o.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(j,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=m(b[3],null,null,c);else{var g=m.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(o.match.POS.test(b[0])||o.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!m(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=o.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||n([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}m.error(e)},CHILD:function(a,b){var c,e,f,g,h,i,j,k=b[1],l=a;switch(k){case"only":case"first":while(l=l.previousSibling)if(l.nodeType===1)return!1;if(k==="first")return!0;l=a;case"last":while(l=l.nextSibling)if(l.nodeType===1)return!1;return!0;case"nth":c=b[2],e=b[3];if(c===1&&e===0)return!0;f=b[0],g=a.parentNode;if(g&&(g[d]!==f||!a.nodeIndex)){i=0;for(l=g.firstChild;l;l=l.nextSibling)l.nodeType===1&&(l.nodeIndex=++i);g[d]=f}j=a.nodeIndex-e;return c===0?j===0:j%c===0&&j/c>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||!!a.nodeName&&a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=m.attr?m.attr(a,c):o.attrHandle[c]?o.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":!f&&m.attr?d!=null:f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=o.setFilters[e];if(f)return f(a,c,b,d)}}},p=o.match.POS,q=function(a,b){return"\\"+(b-0+1)};for(var r in o.match)o.match[r]=new RegExp(o.match[r].source+/(?![^\[]*\])(?![^\(]*\))/.source),o.leftMatch[r]=new RegExp(/(^(?:.|\r|\n)*?)/.source+o.match[r].source.replace(/\\(\d+)/g,q));var s=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(t){s=function(a,b){var c=0,d=b||[];if(g.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var e=a.length;c<e;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var u,v;c.documentElement.compareDocumentPosition?u=function(a,b){if(a===b){h=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(u=function(a,b){if(a===b){h=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,i=b.parentNode,j=g;if(g===i)return v(a,b);if(!g)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return v(e[k],f[k]);return k===c?v(a,f[k],-1):v(e[k],b,1)},v=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(o.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},o.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(o.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(o.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=m,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){m=function(b,e,f,g){e=e||c;if(!g&&!m.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return s(e.getElementsByTagName(b),f);if(h[2]&&o.find.CLASS&&e.getElementsByClassName)return s(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return s([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return s([],f);if(i.id===h[3])return s([i],f)}try{return s(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var k=e,l=e.getAttribute("id"),n=l||d,p=e.parentNode,q=/^\s*[+~]/.test(b);l?n=n.replace(/'/g,"\\$&"):e.setAttribute("id",n),q&&p&&(e=e.parentNode);try{if(!q||p)return s(e.querySelectorAll("[id='"+n+"'] "+b),f)}catch(r){}finally{l||k.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)m[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}m.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!m.isXML(a))try{if(e||!o.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return m(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;o.order.splice(1,0,"CLASS"),o.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?m.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?m.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:m.contains=function(){return!1},m.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var y=function(a,b,c){var d,e=[],f="",g=b.nodeType?[b]:b;while(d=o.match.PSEUDO.exec(a))f+=d[0],a=a.replace(o.match.PSEUDO,"");a=o.relative[a]?a+"*":a;for(var h=0,i=g.length;h<i;h++)m(a,g[h],e,c);return m.filter(f,e)};m.attr=f.attr,m.selectors.attrMap={},f.find=m,f.expr=m.selectors,f.expr[":"]=f.expr.filters,f.unique=m.uniqueSort,f.text=m.getText,f.isXMLDoc=m.isXML,f.contains=m.contains}();var L=/Until$/,M=/^(?:parents|prevUntil|prevAll)/,N=/,/,O=/^.[^:#\[\.,]*$/,P=Array.prototype.slice,Q=f.expr.match.POS,R={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(T(this,a,!1),"not",a)},filter:function(a){return this.pushStack(T(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?Q.test(a)?f(a,this.context).index(this[0])>=0:f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h=1;while(g&&g.ownerDocument&&g!==b){for(d=0;d<a.length;d++)f(g).is(a[d])&&c.push({selector:a[d],elem:g,level:h});g=g.parentNode,h++}return c}var i=Q.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(i?i.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a)return this[0]&&this[0].parentNode?this.prevAll().length:-1;if(typeof a=="string")return f.inArray(this[0],f(a));return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(S(c[0])||S(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling(a.parentNode.firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c);L.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!R[a]?f.unique(e):e,(this.length>1||N.test(d))&&M.test(a)&&(e=e.reverse());return this.pushStack(e,a,P.call(arguments).join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var V="abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",W=/ jQuery\d+="(?:\d+|null)"/g,X=/^\s+/,Y=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Z=/<([\w:]+)/,$=/<tbody/i,_=/<|&#?\w+;/,ba=/<(?:script|style)/i,bb=/<(?:script|object|embed|option|style)/i,bc=new RegExp("<(?:"+V+")","i"),bd=/checked\s*(?:[^=]|=\s*.checked.)/i,be=/\/(java|ecma)script/i,bf=/^\s*<!(?:\[CDATA\[|\-\-)/,bg={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bh=U(c);bg.optgroup=bg.option,bg.tbody=bg.tfoot=bg.colgroup=bg.caption=bg.thead,bg.th=bg.td,f.support.htmlSerialize||(bg._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){if(f.isFunction(a))return this.each(function(b){var c=f(this);c.text(a.call(this,b,c.text()))});if(typeof a!="object"&&a!==b)return this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a));return f.text(this)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=f.isFunction(a);return this.each(function(c){f(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f.clean(arguments);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f.clean(arguments));return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function()
{for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){if(a===b)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(W,""):null;if(typeof a=="string"&&!ba.test(a)&&(f.support.leadingWhitespace||!X.test(a))&&!bg[(Z.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Y,"<$1></$2>");try{for(var c=0,d=this.length;c<d;c++)this[c].nodeType===1&&(f.cleanData(this[c].getElementsByTagName("*")),this[c].innerHTML=a)}catch(e){this.empty().append(a)}}else f.isFunction(a)?this.each(function(b){var c=f(this);c.html(a.call(this,b,c.html()))}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bd.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bi(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,bp)}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i,j=a[0];b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof j=="string"&&j.length<512&&i===c&&j.charAt(0)==="<"&&!bb.test(j)&&(f.support.checkClone||!bd.test(j))&&(f.support.html5Clone||!bc.test(j))&&(g=!0,h=f.fragments[j],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[j]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d,e,g,h=f.support.html5Clone||!bc.test("<"+a.nodeName)?a.cloneNode(!0):bo(a);if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bk(a,h),d=bl(a),e=bl(h);for(g=0;d[g];++g)e[g]&&bk(d[g],e[g])}if(b){bj(a,h);if(c){d=bl(a),e=bl(h);for(g=0;d[g];++g)bj(d[g],e[g])}}d=e=null;return h},clean:function(a,b,d,e){var g;b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);var h=[],i;for(var j=0,k;(k=a[j])!=null;j++){typeof k=="number"&&(k+="");if(!k)continue;if(typeof k=="string")if(!_.test(k))k=b.createTextNode(k);else{k=k.replace(Y,"<$1></$2>");var l=(Z.exec(k)||["",""])[1].toLowerCase(),m=bg[l]||bg._default,n=m[0],o=b.createElement("div");b===c?bh.appendChild(o):U(b).appendChild(o),o.innerHTML=m[1]+k+m[2];while(n--)o=o.lastChild;if(!f.support.tbody){var p=$.test(k),q=l==="table"&&!p?o.firstChild&&o.firstChild.childNodes:m[1]==="<table>"&&!p?o.childNodes:[];for(i=q.length-1;i>=0;--i)f.nodeName(q[i],"tbody")&&!q[i].childNodes.length&&q[i].parentNode.removeChild(q[i])}!f.support.leadingWhitespace&&X.test(k)&&o.insertBefore(b.createTextNode(X.exec(k)[0]),o.firstChild),k=o.childNodes}var r;if(!f.support.appendChecked)if(k[0]&&typeof (r=k.length)=="number")for(i=0;i<r;i++)bn(k[i]);else bn(k);k.nodeType?h.push(k):h=f.merge(h,k)}if(d){g=function(a){return!a.type||be.test(a.type)};for(j=0;h[j];j++)if(e&&f.nodeName(h[j],"script")&&(!h[j].type||h[j].type.toLowerCase()==="text/javascript"))e.push(h[j].parentNode?h[j].parentNode.removeChild(h[j]):h[j]);else{if(h[j].nodeType===1){var s=f.grep(h[j].getElementsByTagName("script"),g);h.splice.apply(h,[j+1,0].concat(s))}d.appendChild(h[j])}}return h},cleanData:function(a){var b,c,d=f.cache,e=f.event.special,g=f.support.deleteExpando;for(var h=0,i;(i=a[h])!=null;h++){if(i.nodeName&&f.noData[i.nodeName.toLowerCase()])continue;c=i[f.expando];if(c){b=d[c];if(b&&b.events){for(var j in b.events)e[j]?f.event.remove(i,j):f.removeEvent(i,j,b.handle);b.handle&&(b.handle.elem=null)}g?delete i[f.expando]:i.removeAttribute&&i.removeAttribute(f.expando),delete d[c]}}}});var bq=/alpha\([^)]*\)/i,br=/opacity=([^)]*)/,bs=/([A-Z]|^ms)/g,bt=/^-?\d+(?:px)?$/i,bu=/^-?\d/,bv=/^([\-+])=([\-+.\de]+)/,bw={position:"absolute",visibility:"hidden",display:"block"},bx=["Left","Right"],by=["Top","Bottom"],bz,bA,bB;f.fn.css=function(a,c){if(arguments.length===2&&c===b)return this;return f.access(this,a,c,!0,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)})},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bz(a,"opacity","opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d,h==="string"&&(g=bv.exec(d))&&(d=+(g[1]+1)*+g[2]+parseFloat(f.css(a,c)),h="number");if(d==null||h==="number"&&isNaN(d))return;h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(bz)return bz(a,c)},swap:function(a,b,c){var d={};for(var e in b)d[e]=a.style[e],a.style[e]=b[e];c.call(a);for(e in b)a.style[e]=d[e]}}),f.curCSS=f.css,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){var e;if(c){if(a.offsetWidth!==0)return bC(a,b,d);f.swap(a,bw,function(){e=bC(a,b,d)});return e}},set:function(a,b){if(!bt.test(b))return b;b=parseFloat(b);if(b>=0)return b+"px"}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return br.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=f.isNumeric(b)?"alpha(opacity="+b*100+")":"",g=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&f.trim(g.replace(bq,""))===""){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bq.test(g)?g.replace(bq,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){var c;f.swap(a,{display:"inline-block"},function(){b?c=bz(a,"margin-right","marginRight"):c=a.style.marginRight});return c}})}),c.defaultView&&c.defaultView.getComputedStyle&&(bA=function(a,b){var c,d,e;b=b.replace(bs,"-$1").toLowerCase(),(d=a.ownerDocument.defaultView)&&(e=d.getComputedStyle(a,null))&&(c=e.getPropertyValue(b),c===""&&!f.contains(a.ownerDocument.documentElement,a)&&(c=f.style(a,b)));return c}),c.documentElement.currentStyle&&(bB=function(a,b){var c,d,e,f=a.currentStyle&&a.currentStyle[b],g=a.style;f===null&&g&&(e=g[b])&&(f=e),!bt.test(f)&&bu.test(f)&&(c=g.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),g.left=b==="fontSize"?"1em":f||0,f=g.pixelLeft+"px",g.left=c,d&&(a.runtimeStyle.left=d));return f===""?"auto":f}),bz=bA||bB,f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style&&a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)});var bD=/%20/g,bE=/\[\]$/,bF=/\r?\n/g,bG=/#.*$/,bH=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bI=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bJ=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,bK=/^(?:GET|HEAD)$/,bL=/^\/\//,bM=/\?/,bN=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bO=/^(?:select|textarea)/i,bP=/\s+/,bQ=/([?&])_=[^&]*/,bR=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bS=f.fn.load,bT={},bU={},bV,bW,bX=["*/"]+["*"];try{bV=e.href}catch(bY){bV=c.createElement("a"),bV.href="",bV=bV.href}bW=bR.exec(bV.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bS)return bS.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bN,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bO.test(this.nodeName)||bI.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bF,"\r\n")}}):{name:b.name,value:c.replace(bF,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.on(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?b_(a,f.ajaxSettings):(b=a,a=f.ajaxSettings),b_(a,b);return a},ajaxSettings:{url:bV,isLocal:bJ.test(bW[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":bX},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:bZ(bT),ajaxTransport:bZ(bU),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a>0?4:0;var o,r,u,w=c,x=l?cb(d,v,l):b,y,z;if(a>=200&&a<300||a===304){if(d.ifModified){if(y=v.getResponseHeader("Last-Modified"))f.lastModified[k]=y;if(z=v.getResponseHeader("Etag"))f.etag[k]=z}if(a===304)w="notmodified",o=!0;else try{r=cc(d,x),w="success",o=!0}catch(A){w="parsererror",u=A}}else{u=w;if(!w||a)w="error",a<0&&(a=0)}v.status=a,v.statusText=""+(c||w),o?h.resolveWith(e,[r,w,v]):h.rejectWith(e,[v,w,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.fireWith(e,[v,w]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f.Callbacks("once memory"),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bH.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.add,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bG,"").replace(bL,bW[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bP),d.crossDomain==null&&(r=bR.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bW[1]&&r[2]==bW[2]&&(r[3]||(r[1]==="http:"?80:443))==(bW[3]||(bW[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),b$(bT,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bK.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bM.test(d.url)?"&":"?")+d.data,delete d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bQ,"$1_="+x);d.url=y+(y===d.url?(bM.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", "+bX+"; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=b$(bU,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){if(s<2)w(-1,z);else throw z}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)ca(g,a[g],c,e);return d.join("&").replace(bD,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var cd=f.now(),ce=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+cd++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=b.contentType==="application/x-www-form-urlencoded"&&typeof b.data=="string";if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(ce.test(b.url)||e&&ce.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(ce,l),b.url===j&&(e&&(k=k.replace(ce,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var cf=a.ActiveXObject?function(){for(var a in ch)ch[a](0,1)}:!1,cg=0,ch;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ci()||cj()}:ci,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,cf&&delete ch[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n),m.text=h.responseText;try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cg,cf&&(ch||(ch={},f(a).unload(cf)),ch[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var ck={},cl,cm,cn=/^(?:toggle|show|hide)$/,co=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,cp,cq=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cr;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(cu("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),e===""&&f.css(d,"display")==="none"&&f._data(d,"olddisplay",cv(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(cu("hide",3),a,b,c);var d,e,g=0,h=this.length;for(;g<h;g++)d=this[g],d.style&&(e=f.css(d,"display"),e!=="none"&&!f._data(d,"olddisplay")&&f._data(d,"olddisplay",e));for(g=0;g<h;g++)this[g].style&&(this[g].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(cu("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){function g(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]),h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(!f.support.inlineBlockNeedsLayout||cv(this.nodeName)==="inline"?this.style.display="inline-block":this.style.zoom=1))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)j=new f.fx(this,b,i),h=a[i],cn.test(h)?(o=f._data(this,"toggle"+i)||(h==="toggle"?d?"show":"hide":0),o?(f._data(this,"toggle"+i,o==="show"?"hide":"show"),j[o]()):j[h]()):(k=co.exec(h),l=j.cur(),k?(m=parseFloat(k[2]),n=k[3]||(f.cssNumber[i]?"":"px"),n!=="px"&&(f.style(this,i,(m||1)+n),l=(m||1)/j.cur()*l,f.style(this,i,l+n)),k[1]&&(m=(k[1]==="-="?-1:1)*m+l),j.custom(l,m,n)):j.custom(l,h,""));return!0}var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return e.queue===!1?this.each(g):this.queue(e.queue,g)},stop:function(a,c,d){typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]);return this.each(function(){function h(a,b,c){var e=b[c];f.removeData(a,c,!0),e.stop(d)}var b,c=!1,e=f.timers,g=f._data(this);d||f._unmark(!0,this);if(a==null)for(b in g)g[b]&&g[b].stop&&b.indexOf(".run")===b.length-4&&h(this,g,b);else g[b=a+".run"]&&g[b].stop&&h(this,g,b);for(b=e.length;b--;)e[b].elem===this&&(a==null||e[b].queue===a)&&(d?e[b](!0):e[b].saveState(),c=!0,e.splice(b,1));(!d||!c)&&f.dequeue(this,a)})}}),f.each({slideDown:cu("show",1),slideUp:cu("hide",1),slideToggle:cu("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue?f.dequeue(this,d.queue):a!==!1&&f._unmark(this)};return d},easing:{linear:function(a,b,c,d){return c+d*a},swing:function(a,b,c,d){return(-Math.cos(a*Math.PI)/2+.5)*d+c}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,c,d){function h(a){return e.step(a)}var e=this,g=f.fx;this.startTime=cr||cs(),this.end=c,this.now=this.start=a,this.pos=this.state=0,this.unit=d||this.unit||(f.cssNumber[this.prop]?"":"px"),h.queue=this.options.queue,h.elem=this.elem,h.saveState=function(){e.options.hide&&f._data(e.elem,"fxshow"+e.prop)===b&&f._data(e.elem,"fxshow"+e.prop,e.start)},h()&&f.timers.push(h)&&!cp&&(cp=setInterval(g.tick,g.interval))},show:function(){var a=f._data(this.elem,"fxshow"+this.prop);this.options.orig[this.prop]=a||f.style(this.elem,this.prop),this.options.show=!0,a!==b?this.custom(this.cur(),a):this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f._data(this.elem,"fxshow"+this.prop)||f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b,c,d,e=cr||cs(),g=!0,h=this.elem,i=this.options;if(a||e>=i.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),i.animatedProperties[this.prop]=!0;for(b in i.animatedProperties)i.animatedProperties[b]!==!0&&(g=!1);if(g){i.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){h.style["overflow"+b]=i.overflow[a]}),i.hide&&f(h).hide();if(i.hide||i.show)for(b in i.animatedProperties)f.style(h,b,i.orig[b]),f.removeData(h,"fxshow"+b,!0),f.removeData(h,"toggle"+b,!0);d=i.complete,d&&(i.complete=!1,d.call(h))}return!1}i.duration==Infinity?this.now=e:(c=e-this.startTime,this.state=c/i.duration,this.pos=f.easing[i.animatedProperties[this.prop]](this.state,c,0,1,i.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){var a,b=f.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||f.fx.stop()},interval:13,stop:function(){clearInterval(cp),cp=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=a.now+a.unit:a.elem[a.prop]=a.now}}}),f.each(["width","height"],function(a,b){f.fx.step[b]=function(a){f.style(a.elem,b,Math.max(0,a.now)+a.unit)}}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cw=/^t(?:able|d|h)$/i,cx=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?f.fn.offset=function(a){var b=this[0],c;if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);try{c=b.getBoundingClientRect()}catch(d){}var e=b.ownerDocument,g=e.documentElement;if(!c||!f.contains(g,b))return c?{top:c.top,left:c.left}:{top:0,left:0};var h=e.body,i=cy(e),j=g.clientTop||h.clientTop||0,k=g.clientLeft||h.clientLeft||0,l=i.pageYOffset||f.support.boxModel&&g.scrollTop||h.scrollTop,m=i.pageXOffset||f.support.boxModel&&g.scrollLeft||h.scrollLeft,n=c.top+l-j,o=c.left+m-k;return{top:n,left:o}}:f.fn.offset=function(a){var b=this[0];if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);var c,d=b.offsetParent,e=b,g=b.ownerDocument,h=g.documentElement,i=g.body,j=g.defaultView,k=j?j.getComputedStyle(b,null):b.currentStyle,l=b.offsetTop,m=b.offsetLeft;while((b=b.parentNode)&&b!==i&&b!==h){if(f.support.fixedPosition&&k.position==="fixed")break;c=j?j.getComputedStyle(b,null):b.currentStyle,l-=b.scrollTop,m-=b.scrollLeft,b===d&&(l+=b.offsetTop,m+=b.offsetLeft,f.support.doesNotAddBorder&&(!f.support.doesAddBorderForTableAndCells||!cw.test(b.nodeName))&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),e=d,d=b.offsetParent),f.support.subtractsBorderForOverflowNotVisible&&c.overflow!=="visible"&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),k=c}if(k.position==="relative"||k.position==="static")l+=i.offsetTop,m+=i.offsetLeft;f.support.fixedPosition&&k.position==="fixed"&&(l+=Math.max(h.scrollTop,i.scrollTop),m+=Math.max(h.scrollLeft,i.scrollLeft));return{top:l,left:m}},f.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=cx.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!cx.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each(["Left","Top"],function(a,c){var d="scroll"+c;f.fn[d]=function(c){var e,g;if(c===b){e=this[0];if(!e)return null;g=cy(e);return g?"pageXOffset"in g?g[a?"pageYOffset":"pageXOffset"]:f.support.boxModel&&g.document.documentElement[d]||g.document.body[d]:e[d]}return this.each(function(){g=cy(this),g?g.scrollTo(a?f(g).scrollLeft():c,a?c:f(g).scrollTop()):this[d]=c})}}),f.each(["Height","Width"],function(a,c){var d=c.toLowerCase();f.fn["inner"+c]=function(){var a=this[0];return a?a.style?parseFloat(f.css(a,d,"padding")):this[d]():null},f.fn["outer"+c]=function(a){var b=this[0];return b?b.style?parseFloat(f.css(b,d,a?"margin":"border")):this[d]():null},f.fn[d]=function(a){var e=this[0];if(!e)return a==null?null:this;if(f.isFunction(a))return this.each(function(b){var c=f(this);c[d](a.call(this,b,c[d]()))});if(f.isWindow(e)){var g=e.document.documentElement["client"+c],h=e.document.body;return e.document.compatMode==="CSS1Compat"&&g||h&&h["client"+c]||g}if(e.nodeType===9)return Math.max(e.documentElement["client"+c],e.body["scroll"+c],e.documentElement["scroll"+c],e.body["offset"+c],e.documentElement["offset"+c]);if(a===b){var i=f.css(e,d),j=parseFloat(i);return f.isNumeric(j)?j:i}return this.css(d,typeof a=="string"?a:a+"px")}}),a.jQuery=a.$=f,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return f})})(window);



/*! jQuery UI - v1.10.2 - 2013-04-29
* http://jqueryui.com
* Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.position.js, jquery.ui.draggable.js, jquery.ui.resizable.js, jquery.ui.sortable.js
* Copyright 2013 jQuery Foundation and other contributors Licensed MIT */

(function(e,t){function i(t,i){var a,n,r,o=t.nodeName.toLowerCase();return"area"===o?(a=t.parentNode,n=a.name,t.href&&n&&"map"===a.nodeName.toLowerCase()?(r=e("img[usemap=#"+n+"]")[0],!!r&&s(r)):!1):(/input|select|textarea|button|object/.test(o)?!t.disabled:"a"===o?t.href||i:i)&&s(t)}function s(t){return e.expr.filters.visible(t)&&!e(t).parents().addBack().filter(function(){return"hidden"===e.css(this,"visibility")}).length}var a=0,n=/^ui-id-\d+$/;e.ui=e.ui||{},e.extend(e.ui,{version:"1.10.2",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({focus:function(t){return function(i,s){return"number"==typeof i?this.each(function(){var t=this;setTimeout(function(){e(t).focus(),s&&s.call(t)},i)}):t.apply(this,arguments)}}(e.fn.focus),scrollParent:function(){var t;return t=e.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(e.css(this,"position"))&&/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0),/fixed/.test(this.css("position"))||!t.length?e(document):t},zIndex:function(i){if(i!==t)return this.css("zIndex",i);if(this.length)for(var s,a,n=e(this[0]);n.length&&n[0]!==document;){if(s=n.css("position"),("absolute"===s||"relative"===s||"fixed"===s)&&(a=parseInt(n.css("zIndex"),10),!isNaN(a)&&0!==a))return a;n=n.parent()}return 0},uniqueId:function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++a)})},removeUniqueId:function(){return this.each(function(){n.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(i){return!!e.data(i,t)}}):function(t,i,s){return!!e.data(t,s[3])},focusable:function(t){return i(t,!isNaN(e.attr(t,"tabindex")))},tabbable:function(t){var s=e.attr(t,"tabindex"),a=isNaN(s);return(a||s>=0)&&i(t,!a)}}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(i,s){function a(t,i,s,a){return e.each(n,function(){i-=parseFloat(e.css(t,"padding"+this))||0,s&&(i-=parseFloat(e.css(t,"border"+this+"Width"))||0),a&&(i-=parseFloat(e.css(t,"margin"+this))||0)}),i}var n="Width"===s?["Left","Right"]:["Top","Bottom"],r=s.toLowerCase(),o={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+s]=function(i){return i===t?o["inner"+s].call(this):this.each(function(){e(this).css(r,a(this,i)+"px")})},e.fn["outer"+s]=function(t,i){return"number"!=typeof t?o["outer"+s].call(this,t):this.each(function(){e(this).css(r,a(this,t,!0,i)+"px")})}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(i){return arguments.length?t.call(this,e.camelCase(i)):t.call(this)}}(e.fn.removeData)),e.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),e.support.selectstart="onselectstart"in document.createElement("div"),e.fn.extend({disableSelection:function(){return this.bind((e.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(e){e.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),e.extend(e.ui,{plugin:{add:function(t,i,s){var a,n=e.ui[t].prototype;for(a in s)n.plugins[a]=n.plugins[a]||[],n.plugins[a].push([i,s[a]])},call:function(e,t,i){var s,a=e.plugins[t];if(a&&e.element[0].parentNode&&11!==e.element[0].parentNode.nodeType)for(s=0;a.length>s;s++)e.options[a[s][0]]&&a[s][1].apply(e.element,i)}},hasScroll:function(t,i){if("hidden"===e(t).css("overflow"))return!1;var s=i&&"left"===i?"scrollLeft":"scrollTop",a=!1;return t[s]>0?!0:(t[s]=1,a=t[s]>0,t[s]=0,a)}})})(jQuery);(function(e,t){var i=0,s=Array.prototype.slice,n=e.cleanData;e.cleanData=function(t){for(var i,s=0;null!=(i=t[s]);s++)try{e(i).triggerHandler("remove")}catch(a){}n(t)},e.widget=function(i,s,n){var a,r,o,h,l={},u=i.split(".")[0];i=i.split(".")[1],a=u+"-"+i,n||(n=s,s=e.Widget),e.expr[":"][a.toLowerCase()]=function(t){return!!e.data(t,a)},e[u]=e[u]||{},r=e[u][i],o=e[u][i]=function(e,i){return this._createWidget?(arguments.length&&this._createWidget(e,i),t):new o(e,i)},e.extend(o,r,{version:n.version,_proto:e.extend({},n),_childConstructors:[]}),h=new s,h.options=e.widget.extend({},h.options),e.each(n,function(i,n){return e.isFunction(n)?(l[i]=function(){var e=function(){return s.prototype[i].apply(this,arguments)},t=function(e){return s.prototype[i].apply(this,e)};return function(){var i,s=this._super,a=this._superApply;return this._super=e,this._superApply=t,i=n.apply(this,arguments),this._super=s,this._superApply=a,i}}(),t):(l[i]=n,t)}),o.prototype=e.widget.extend(h,{widgetEventPrefix:r?h.widgetEventPrefix:i},l,{constructor:o,namespace:u,widgetName:i,widgetFullName:a}),r?(e.each(r._childConstructors,function(t,i){var s=i.prototype;e.widget(s.namespace+"."+s.widgetName,o,i._proto)}),delete r._childConstructors):s._childConstructors.push(o),e.widget.bridge(i,o)},e.widget.extend=function(i){for(var n,a,r=s.call(arguments,1),o=0,h=r.length;h>o;o++)for(n in r[o])a=r[o][n],r[o].hasOwnProperty(n)&&a!==t&&(i[n]=e.isPlainObject(a)?e.isPlainObject(i[n])?e.widget.extend({},i[n],a):e.widget.extend({},a):a);return i},e.widget.bridge=function(i,n){var a=n.prototype.widgetFullName||i;e.fn[i]=function(r){var o="string"==typeof r,h=s.call(arguments,1),l=this;return r=!o&&h.length?e.widget.extend.apply(null,[r].concat(h)):r,o?this.each(function(){var s,n=e.data(this,a);return n?e.isFunction(n[r])&&"_"!==r.charAt(0)?(s=n[r].apply(n,h),s!==n&&s!==t?(l=s&&s.jquery?l.pushStack(s.get()):s,!1):t):e.error("no such method '"+r+"' for "+i+" widget instance"):e.error("cannot call methods on "+i+" prior to initialization; "+"attempted to call method '"+r+"'")}):this.each(function(){var t=e.data(this,a);t?t.option(r||{})._init():e.data(this,a,new n(r,this))}),l}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,s){s=e(s||this.defaultElement||this)[0],this.element=e(s),this.uuid=i++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this.bindings=e(),this.hoverable=e(),this.focusable=e(),s!==this&&(e.data(s,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===s&&this.destroy()}}),this.document=e(s.style?s.ownerDocument:s.document||s),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(i,s){var n,a,r,o=i;if(0===arguments.length)return e.widget.extend({},this.options);if("string"==typeof i)if(o={},n=i.split("."),i=n.shift(),n.length){for(a=o[i]=e.widget.extend({},this.options[i]),r=0;n.length-1>r;r++)a[n[r]]=a[n[r]]||{},a=a[n[r]];if(i=n.pop(),s===t)return a[i]===t?null:a[i];a[i]=s}else{if(s===t)return this.options[i]===t?null:this.options[i];o[i]=s}return this._setOptions(o),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,"disabled"===e&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!t).attr("aria-disabled",t),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(i,s,n){var a,r=this;"boolean"!=typeof i&&(n=s,s=i,i=!1),n?(s=a=e(s),this.bindings=this.bindings.add(s)):(n=s,s=this.element,a=this.widget()),e.each(n,function(n,o){function h(){return i||r.options.disabled!==!0&&!e(this).hasClass("ui-state-disabled")?("string"==typeof o?r[o]:o).apply(r,arguments):t}"string"!=typeof o&&(h.guid=o.guid=o.guid||h.guid||e.guid++);var l=n.match(/^(\w+)\s*(.*)$/),u=l[1]+r.eventNamespace,c=l[2];c?a.delegate(c,u,h):s.bind(u,h)})},_off:function(e,t){t=(t||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.unbind(t).undelegate(t)},_delay:function(e,t){function i(){return("string"==typeof e?s[e]:e).apply(s,arguments)}var s=this;return setTimeout(i,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,i,s){var n,a,r=this.options[t];if(s=s||{},i=e.Event(i),i.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),i.target=this.element[0],a=i.originalEvent)for(n in a)n in i||(i[n]=a[n]);return this.element.trigger(i,s),!(e.isFunction(r)&&r.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,i){e.Widget.prototype["_"+t]=function(s,n,a){"string"==typeof n&&(n={effect:n});var r,o=n?n===!0||"number"==typeof n?i:n.effect||i:t;n=n||{},"number"==typeof n&&(n={duration:n}),r=!e.isEmptyObject(n),n.complete=a,n.delay&&s.delay(n.delay),r&&e.effects&&e.effects.effect[o]?s[t](n):o!==t&&s[o]?s[o](n.duration,n.easing,a):s.queue(function(i){e(this)[t](),a&&a.call(s[0]),i()})}})})(jQuery);(function(e){var t=!1;e(document).mouseup(function(){t=!1}),e.widget("ui.mouse",{version:"1.10.2",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var t=this;this.element.bind("mousedown."+this.widgetName,function(e){return t._mouseDown(e)}).bind("click."+this.widgetName,function(i){return!0===e.data(i.target,t.widgetName+".preventClickEvent")?(e.removeData(i.target,t.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1):undefined}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&e(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(i){if(!t){this._mouseStarted&&this._mouseUp(i),this._mouseDownEvent=i;var s=this,n=1===i.which,a="string"==typeof this.options.cancel&&i.target.nodeName?e(i.target).closest(this.options.cancel).length:!1;return n&&!a&&this._mouseCapture(i)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){s.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(i)&&this._mouseDelayMet(i)&&(this._mouseStarted=this._mouseStart(i)!==!1,!this._mouseStarted)?(i.preventDefault(),!0):(!0===e.data(i.target,this.widgetName+".preventClickEvent")&&e.removeData(i.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(e){return s._mouseMove(e)},this._mouseUpDelegate=function(e){return s._mouseUp(e)},e(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),i.preventDefault(),t=!0,!0)):!0}},_mouseMove:function(t){return e.ui.ie&&(!document.documentMode||9>document.documentMode)&&!t.button?this._mouseUp(t):this._mouseStarted?(this._mouseDrag(t),t.preventDefault()):(this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,t)!==!1,this._mouseStarted?this._mouseDrag(t):this._mouseUp(t)),!this._mouseStarted)},_mouseUp:function(t){return e(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,t.target===this._mouseDownEvent.target&&e.data(t.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(t)),!1},_mouseDistanceMet:function(e){return Math.max(Math.abs(this._mouseDownEvent.pageX-e.pageX),Math.abs(this._mouseDownEvent.pageY-e.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}})})(jQuery);(function(t,e){function i(t,e,i){return[parseFloat(t[0])*(p.test(t[0])?e/100:1),parseFloat(t[1])*(p.test(t[1])?i/100:1)]}function s(e,i){return parseInt(t.css(e,i),10)||0}function n(e){var i=e[0];return 9===i.nodeType?{width:e.width(),height:e.height(),offset:{top:0,left:0}}:t.isWindow(i)?{width:e.width(),height:e.height(),offset:{top:e.scrollTop(),left:e.scrollLeft()}}:i.preventDefault?{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}:{width:e.outerWidth(),height:e.outerHeight(),offset:e.offset()}}t.ui=t.ui||{};var a,o=Math.max,r=Math.abs,h=Math.round,l=/left|center|right/,c=/top|center|bottom/,u=/[\+\-]\d+(\.[\d]+)?%?/,d=/^\w+/,p=/%$/,f=t.fn.position;t.position={scrollbarWidth:function(){if(a!==e)return a;var i,s,n=t("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),o=n.children()[0];return t("body").append(n),i=o.offsetWidth,n.css("overflow","scroll"),s=o.offsetWidth,i===s&&(s=n[0].clientWidth),n.remove(),a=i-s},getScrollInfo:function(e){var i=e.isWindow?"":e.element.css("overflow-x"),s=e.isWindow?"":e.element.css("overflow-y"),n="scroll"===i||"auto"===i&&e.width<e.element[0].scrollWidth,a="scroll"===s||"auto"===s&&e.height<e.element[0].scrollHeight;return{width:a?t.position.scrollbarWidth():0,height:n?t.position.scrollbarWidth():0}},getWithinInfo:function(e){var i=t(e||window),s=t.isWindow(i[0]);return{element:i,isWindow:s,offset:i.offset()||{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:s?i.width():i.outerWidth(),height:s?i.height():i.outerHeight()}}},t.fn.position=function(e){if(!e||!e.of)return f.apply(this,arguments);e=t.extend({},e);var a,p,m,g,v,_,b=t(e.of),y=t.position.getWithinInfo(e.within),w=t.position.getScrollInfo(y),x=(e.collision||"flip").split(" "),k={};return _=n(b),b[0].preventDefault&&(e.at="left top"),p=_.width,m=_.height,g=_.offset,v=t.extend({},g),t.each(["my","at"],function(){var t,i,s=(e[this]||"").split(" ");1===s.length&&(s=l.test(s[0])?s.concat(["center"]):c.test(s[0])?["center"].concat(s):["center","center"]),s[0]=l.test(s[0])?s[0]:"center",s[1]=c.test(s[1])?s[1]:"center",t=u.exec(s[0]),i=u.exec(s[1]),k[this]=[t?t[0]:0,i?i[0]:0],e[this]=[d.exec(s[0])[0],d.exec(s[1])[0]]}),1===x.length&&(x[1]=x[0]),"right"===e.at[0]?v.left+=p:"center"===e.at[0]&&(v.left+=p/2),"bottom"===e.at[1]?v.top+=m:"center"===e.at[1]&&(v.top+=m/2),a=i(k.at,p,m),v.left+=a[0],v.top+=a[1],this.each(function(){var n,l,c=t(this),u=c.outerWidth(),d=c.outerHeight(),f=s(this,"marginLeft"),_=s(this,"marginTop"),D=u+f+s(this,"marginRight")+w.width,T=d+_+s(this,"marginBottom")+w.height,C=t.extend({},v),M=i(k.my,c.outerWidth(),c.outerHeight());"right"===e.my[0]?C.left-=u:"center"===e.my[0]&&(C.left-=u/2),"bottom"===e.my[1]?C.top-=d:"center"===e.my[1]&&(C.top-=d/2),C.left+=M[0],C.top+=M[1],t.support.offsetFractions||(C.left=h(C.left),C.top=h(C.top)),n={marginLeft:f,marginTop:_},t.each(["left","top"],function(i,s){t.ui.position[x[i]]&&t.ui.position[x[i]][s](C,{targetWidth:p,targetHeight:m,elemWidth:u,elemHeight:d,collisionPosition:n,collisionWidth:D,collisionHeight:T,offset:[a[0]+M[0],a[1]+M[1]],my:e.my,at:e.at,within:y,elem:c})}),e.using&&(l=function(t){var i=g.left-C.left,s=i+p-u,n=g.top-C.top,a=n+m-d,h={target:{element:b,left:g.left,top:g.top,width:p,height:m},element:{element:c,left:C.left,top:C.top,width:u,height:d},horizontal:0>s?"left":i>0?"right":"center",vertical:0>a?"top":n>0?"bottom":"middle"};u>p&&p>r(i+s)&&(h.horizontal="center"),d>m&&m>r(n+a)&&(h.vertical="middle"),h.important=o(r(i),r(s))>o(r(n),r(a))?"horizontal":"vertical",e.using.call(this,t,h)}),c.offset(t.extend(C,{using:l}))})},t.ui.position={fit:{left:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollLeft:s.offset.left,a=s.width,r=t.left-e.collisionPosition.marginLeft,h=n-r,l=r+e.collisionWidth-a-n;e.collisionWidth>a?h>0&&0>=l?(i=t.left+h+e.collisionWidth-a-n,t.left+=h-i):t.left=l>0&&0>=h?n:h>l?n+a-e.collisionWidth:n:h>0?t.left+=h:l>0?t.left-=l:t.left=o(t.left-r,t.left)},top:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollTop:s.offset.top,a=e.within.height,r=t.top-e.collisionPosition.marginTop,h=n-r,l=r+e.collisionHeight-a-n;e.collisionHeight>a?h>0&&0>=l?(i=t.top+h+e.collisionHeight-a-n,t.top+=h-i):t.top=l>0&&0>=h?n:h>l?n+a-e.collisionHeight:n:h>0?t.top+=h:l>0?t.top-=l:t.top=o(t.top-r,t.top)}},flip:{left:function(t,e){var i,s,n=e.within,a=n.offset.left+n.scrollLeft,o=n.width,h=n.isWindow?n.scrollLeft:n.offset.left,l=t.left-e.collisionPosition.marginLeft,c=l-h,u=l+e.collisionWidth-o-h,d="left"===e.my[0]?-e.elemWidth:"right"===e.my[0]?e.elemWidth:0,p="left"===e.at[0]?e.targetWidth:"right"===e.at[0]?-e.targetWidth:0,f=-2*e.offset[0];0>c?(i=t.left+d+p+f+e.collisionWidth-o-a,(0>i||r(c)>i)&&(t.left+=d+p+f)):u>0&&(s=t.left-e.collisionPosition.marginLeft+d+p+f-h,(s>0||u>r(s))&&(t.left+=d+p+f))},top:function(t,e){var i,s,n=e.within,a=n.offset.top+n.scrollTop,o=n.height,h=n.isWindow?n.scrollTop:n.offset.top,l=t.top-e.collisionPosition.marginTop,c=l-h,u=l+e.collisionHeight-o-h,d="top"===e.my[1],p=d?-e.elemHeight:"bottom"===e.my[1]?e.elemHeight:0,f="top"===e.at[1]?e.targetHeight:"bottom"===e.at[1]?-e.targetHeight:0,m=-2*e.offset[1];0>c?(s=t.top+p+f+m+e.collisionHeight-o-a,t.top+p+f+m>c&&(0>s||r(c)>s)&&(t.top+=p+f+m)):u>0&&(i=t.top-e.collisionPosition.marginTop+p+f+m-h,t.top+p+f+m>u&&(i>0||u>r(i))&&(t.top+=p+f+m))}},flipfit:{left:function(){t.ui.position.flip.left.apply(this,arguments),t.ui.position.fit.left.apply(this,arguments)},top:function(){t.ui.position.flip.top.apply(this,arguments),t.ui.position.fit.top.apply(this,arguments)}}},function(){var e,i,s,n,a,o=document.getElementsByTagName("body")[0],r=document.createElement("div");e=document.createElement(o?"div":"body"),s={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},o&&t.extend(s,{position:"absolute",left:"-1000px",top:"-1000px"});for(a in s)e.style[a]=s[a];e.appendChild(r),i=o||document.documentElement,i.insertBefore(e,i.firstChild),r.style.cssText="position: absolute; left: 10.7432222px;",n=t(r).offset().left,t.support.offsetFractions=n>10&&11>n,e.innerHTML="",i.removeChild(e)}()})(jQuery);(function(e){e.widget("ui.draggable",e.ui.mouse,{version:"1.10.2",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1,drag:null,start:null,stop:null},_create:function(){"original"!==this.options.helper||/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative"),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._mouseInit()},_destroy:function(){this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._mouseDestroy()},_mouseCapture:function(t){var i=this.options;return this.helper||i.disabled||e(t.target).closest(".ui-resizable-handle").length>0?!1:(this.handle=this._getHandle(t),this.handle?(e(i.iframeFix===!0?"iframe":i.iframeFix).each(function(){e("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1e3}).css(e(this).offset()).appendTo("body")}),!0):!1)},_mouseStart:function(t){var i=this.options;return this.helper=this._createHelper(t),this.helper.addClass("ui-draggable-dragging"),this._cacheHelperProportions(),e.ui.ddmanager&&(e.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(),this.offset=this.positionAbs=this.element.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},e.extend(this.offset,{click:{left:t.pageX-this.offset.left,top:t.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.originalPosition=this.position=this._generatePosition(t),this.originalPageX=t.pageX,this.originalPageY=t.pageY,i.cursorAt&&this._adjustOffsetFromHelper(i.cursorAt),i.containment&&this._setContainment(),this._trigger("start",t)===!1?(this._clear(),!1):(this._cacheHelperProportions(),e.ui.ddmanager&&!i.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t),this._mouseDrag(t,!0),e.ui.ddmanager&&e.ui.ddmanager.dragStart(this,t),!0)},_mouseDrag:function(t,i){if(this.position=this._generatePosition(t),this.positionAbs=this._convertPositionTo("absolute"),!i){var s=this._uiHash();if(this._trigger("drag",t,s)===!1)return this._mouseUp({}),!1;this.position=s.position}return this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),!1},_mouseStop:function(t){var i,s=this,n=!1,a=!1;for(e.ui.ddmanager&&!this.options.dropBehaviour&&(a=e.ui.ddmanager.drop(this,t)),this.dropped&&(a=this.dropped,this.dropped=!1),i=this.element[0];i&&(i=i.parentNode);)i===document&&(n=!0);return n||"original"!==this.options.helper?("invalid"===this.options.revert&&!a||"valid"===this.options.revert&&a||this.options.revert===!0||e.isFunction(this.options.revert)&&this.options.revert.call(this.element,a)?e(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){s._trigger("stop",t)!==!1&&s._clear()}):this._trigger("stop",t)!==!1&&this._clear(),!1):!1},_mouseUp:function(t){return e("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)}),e.ui.ddmanager&&e.ui.ddmanager.dragStop(this,t),e.ui.mouse.prototype._mouseUp.call(this,t)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),this},_getHandle:function(t){return this.options.handle?!!e(t.target).closest(this.element.find(this.options.handle)).length:!0},_createHelper:function(t){var i=this.options,s=e.isFunction(i.helper)?e(i.helper.apply(this.element[0],[t])):"clone"===i.helper?this.element.clone().removeAttr("id"):this.element;return s.parents("body").length||s.appendTo("parent"===i.appendTo?this.element[0].parentNode:i.appendTo),s[0]===this.element[0]||/(fixed|absolute)/.test(s.css("position"))||s.css("position","absolute"),s},_adjustOffsetFromHelper:function(t){"string"==typeof t&&(t=t.split(" ")),e.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var t=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===document.body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&e.ui.ie)&&(t={top:0,left:0}),{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var e=this.element.position();return{top:e.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:e.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t,i,s,n=this.options;if("parent"===n.containment&&(n.containment=this.helper[0].parentNode),("document"===n.containment||"window"===n.containment)&&(this.containment=["document"===n.containment?0:e(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,"document"===n.containment?0:e(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,("document"===n.containment?0:e(window).scrollLeft())+e("document"===n.containment?document:window).width()-this.helperProportions.width-this.margins.left,("document"===n.containment?0:e(window).scrollTop())+(e("document"===n.containment?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]),/^(document|window|parent)$/.test(n.containment)||n.containment.constructor===Array)n.containment.constructor===Array&&(this.containment=n.containment);else{if(i=e(n.containment),s=i[0],!s)return;t="hidden"!==e(s).css("overflow"),this.containment=[(parseInt(e(s).css("borderLeftWidth"),10)||0)+(parseInt(e(s).css("paddingLeft"),10)||0),(parseInt(e(s).css("borderTopWidth"),10)||0)+(parseInt(e(s).css("paddingTop"),10)||0),(t?Math.max(s.scrollWidth,s.offsetWidth):s.offsetWidth)-(parseInt(e(s).css("borderRightWidth"),10)||0)-(parseInt(e(s).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(t?Math.max(s.scrollHeight,s.offsetHeight):s.offsetHeight)-(parseInt(e(s).css("borderBottomWidth"),10)||0)-(parseInt(e(s).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relative_container=i}},_convertPositionTo:function(t,i){i||(i=this.position);var s="absolute"===t?1:-1,n="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,a=/(html|body)/i.test(n[0].tagName);return{top:i.top+this.offset.relative.top*s+this.offset.parent.top*s-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():a?0:n.scrollTop())*s,left:i.left+this.offset.relative.left*s+this.offset.parent.left*s-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():a?0:n.scrollLeft())*s}},_generatePosition:function(t){var i,s,n,a,o=this.options,r="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,h=/(html|body)/i.test(r[0].tagName),l=t.pageX,u=t.pageY;return this.originalPosition&&(this.containment&&(this.relative_container?(s=this.relative_container.offset(),i=[this.containment[0]+s.left,this.containment[1]+s.top,this.containment[2]+s.left,this.containment[3]+s.top]):i=this.containment,t.pageX-this.offset.click.left<i[0]&&(l=i[0]+this.offset.click.left),t.pageY-this.offset.click.top<i[1]&&(u=i[1]+this.offset.click.top),t.pageX-this.offset.click.left>i[2]&&(l=i[2]+this.offset.click.left),t.pageY-this.offset.click.top>i[3]&&(u=i[3]+this.offset.click.top)),o.grid&&(n=o.grid[1]?this.originalPageY+Math.round((u-this.originalPageY)/o.grid[1])*o.grid[1]:this.originalPageY,u=i?n-this.offset.click.top>=i[1]||n-this.offset.click.top>i[3]?n:n-this.offset.click.top>=i[1]?n-o.grid[1]:n+o.grid[1]:n,a=o.grid[0]?this.originalPageX+Math.round((l-this.originalPageX)/o.grid[0])*o.grid[0]:this.originalPageX,l=i?a-this.offset.click.left>=i[0]||a-this.offset.click.left>i[2]?a:a-this.offset.click.left>=i[0]?a-o.grid[0]:a+o.grid[0]:a)),{top:u-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():h?0:r.scrollTop()),left:l-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():h?0:r.scrollLeft())}},_clear:function(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]===this.element[0]||this.cancelHelperRemoval||this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1},_trigger:function(t,i,s){return s=s||this._uiHash(),e.ui.plugin.call(this,t,[i,s]),"drag"===t&&(this.positionAbs=this._convertPositionTo("absolute")),e.Widget.prototype._trigger.call(this,t,i,s)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),e.ui.plugin.add("draggable","connectToSortable",{start:function(t,i){var s=e(this).data("ui-draggable"),n=s.options,a=e.extend({},i,{item:s.element});s.sortables=[],e(n.connectToSortable).each(function(){var i=e.data(this,"ui-sortable");i&&!i.options.disabled&&(s.sortables.push({instance:i,shouldRevert:i.options.revert}),i.refreshPositions(),i._trigger("activate",t,a))})},stop:function(t,i){var s=e(this).data("ui-draggable"),n=e.extend({},i,{item:s.element});e.each(s.sortables,function(){this.instance.isOver?(this.instance.isOver=0,s.cancelHelperRemoval=!0,this.instance.cancelHelperRemoval=!1,this.shouldRevert&&(this.instance.options.revert=this.shouldRevert),this.instance._mouseStop(t),this.instance.options.helper=this.instance.options._helper,"original"===s.options.helper&&this.instance.currentItem.css({top:"auto",left:"auto"})):(this.instance.cancelHelperRemoval=!1,this.instance._trigger("deactivate",t,n))})},drag:function(t,i){var s=e(this).data("ui-draggable"),n=this;e.each(s.sortables,function(){var a=!1,o=this;this.instance.positionAbs=s.positionAbs,this.instance.helperProportions=s.helperProportions,this.instance.offset.click=s.offset.click,this.instance._intersectsWith(this.instance.containerCache)&&(a=!0,e.each(s.sortables,function(){return this.instance.positionAbs=s.positionAbs,this.instance.helperProportions=s.helperProportions,this.instance.offset.click=s.offset.click,this!==o&&this.instance._intersectsWith(this.instance.containerCache)&&e.contains(o.instance.element[0],this.instance.element[0])&&(a=!1),a})),a?(this.instance.isOver||(this.instance.isOver=1,this.instance.currentItem=e(n).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item",!0),this.instance.options._helper=this.instance.options.helper,this.instance.options.helper=function(){return i.helper[0]},t.target=this.instance.currentItem[0],this.instance._mouseCapture(t,!0),this.instance._mouseStart(t,!0,!0),this.instance.offset.click.top=s.offset.click.top,this.instance.offset.click.left=s.offset.click.left,this.instance.offset.parent.left-=s.offset.parent.left-this.instance.offset.parent.left,this.instance.offset.parent.top-=s.offset.parent.top-this.instance.offset.parent.top,s._trigger("toSortable",t),s.dropped=this.instance.element,s.currentItem=s.element,this.instance.fromOutside=s),this.instance.currentItem&&this.instance._mouseDrag(t)):this.instance.isOver&&(this.instance.isOver=0,this.instance.cancelHelperRemoval=!0,this.instance.options.revert=!1,this.instance._trigger("out",t,this.instance._uiHash(this.instance)),this.instance._mouseStop(t,!0),this.instance.options.helper=this.instance.options._helper,this.instance.currentItem.remove(),this.instance.placeholder&&this.instance.placeholder.remove(),s._trigger("fromSortable",t),s.dropped=!1)})}}),e.ui.plugin.add("draggable","cursor",{start:function(){var t=e("body"),i=e(this).data("ui-draggable").options;t.css("cursor")&&(i._cursor=t.css("cursor")),t.css("cursor",i.cursor)},stop:function(){var t=e(this).data("ui-draggable").options;t._cursor&&e("body").css("cursor",t._cursor)}}),e.ui.plugin.add("draggable","opacity",{start:function(t,i){var s=e(i.helper),n=e(this).data("ui-draggable").options;s.css("opacity")&&(n._opacity=s.css("opacity")),s.css("opacity",n.opacity)},stop:function(t,i){var s=e(this).data("ui-draggable").options;s._opacity&&e(i.helper).css("opacity",s._opacity)}}),e.ui.plugin.add("draggable","scroll",{start:function(){var t=e(this).data("ui-draggable");t.scrollParent[0]!==document&&"HTML"!==t.scrollParent[0].tagName&&(t.overflowOffset=t.scrollParent.offset())},drag:function(t){var i=e(this).data("ui-draggable"),s=i.options,n=!1;i.scrollParent[0]!==document&&"HTML"!==i.scrollParent[0].tagName?(s.axis&&"x"===s.axis||(i.overflowOffset.top+i.scrollParent[0].offsetHeight-t.pageY<s.scrollSensitivity?i.scrollParent[0].scrollTop=n=i.scrollParent[0].scrollTop+s.scrollSpeed:t.pageY-i.overflowOffset.top<s.scrollSensitivity&&(i.scrollParent[0].scrollTop=n=i.scrollParent[0].scrollTop-s.scrollSpeed)),s.axis&&"y"===s.axis||(i.overflowOffset.left+i.scrollParent[0].offsetWidth-t.pageX<s.scrollSensitivity?i.scrollParent[0].scrollLeft=n=i.scrollParent[0].scrollLeft+s.scrollSpeed:t.pageX-i.overflowOffset.left<s.scrollSensitivity&&(i.scrollParent[0].scrollLeft=n=i.scrollParent[0].scrollLeft-s.scrollSpeed))):(s.axis&&"x"===s.axis||(t.pageY-e(document).scrollTop()<s.scrollSensitivity?n=e(document).scrollTop(e(document).scrollTop()-s.scrollSpeed):e(window).height()-(t.pageY-e(document).scrollTop())<s.scrollSensitivity&&(n=e(document).scrollTop(e(document).scrollTop()+s.scrollSpeed))),s.axis&&"y"===s.axis||(t.pageX-e(document).scrollLeft()<s.scrollSensitivity?n=e(document).scrollLeft(e(document).scrollLeft()-s.scrollSpeed):e(window).width()-(t.pageX-e(document).scrollLeft())<s.scrollSensitivity&&(n=e(document).scrollLeft(e(document).scrollLeft()+s.scrollSpeed)))),n!==!1&&e.ui.ddmanager&&!s.dropBehaviour&&e.ui.ddmanager.prepareOffsets(i,t)}}),e.ui.plugin.add("draggable","snap",{start:function(){var t=e(this).data("ui-draggable"),i=t.options;t.snapElements=[],e(i.snap.constructor!==String?i.snap.items||":data(ui-draggable)":i.snap).each(function(){var i=e(this),s=i.offset();this!==t.element[0]&&t.snapElements.push({item:this,width:i.outerWidth(),height:i.outerHeight(),top:s.top,left:s.left})})},drag:function(t,i){var s,n,a,o,r,h,l,u,c,d,p=e(this).data("ui-draggable"),f=p.options,m=f.snapTolerance,g=i.offset.left,v=g+p.helperProportions.width,y=i.offset.top,b=y+p.helperProportions.height;for(c=p.snapElements.length-1;c>=0;c--)r=p.snapElements[c].left,h=r+p.snapElements[c].width,l=p.snapElements[c].top,u=l+p.snapElements[c].height,g>r-m&&h+m>g&&y>l-m&&u+m>y||g>r-m&&h+m>g&&b>l-m&&u+m>b||v>r-m&&h+m>v&&y>l-m&&u+m>y||v>r-m&&h+m>v&&b>l-m&&u+m>b?("inner"!==f.snapMode&&(s=m>=Math.abs(l-b),n=m>=Math.abs(u-y),a=m>=Math.abs(r-v),o=m>=Math.abs(h-g),s&&(i.position.top=p._convertPositionTo("relative",{top:l-p.helperProportions.height,left:0}).top-p.margins.top),n&&(i.position.top=p._convertPositionTo("relative",{top:u,left:0}).top-p.margins.top),a&&(i.position.left=p._convertPositionTo("relative",{top:0,left:r-p.helperProportions.width}).left-p.margins.left),o&&(i.position.left=p._convertPositionTo("relative",{top:0,left:h}).left-p.margins.left)),d=s||n||a||o,"outer"!==f.snapMode&&(s=m>=Math.abs(l-y),n=m>=Math.abs(u-b),a=m>=Math.abs(r-g),o=m>=Math.abs(h-v),s&&(i.position.top=p._convertPositionTo("relative",{top:l,left:0}).top-p.margins.top),n&&(i.position.top=p._convertPositionTo("relative",{top:u-p.helperProportions.height,left:0}).top-p.margins.top),a&&(i.position.left=p._convertPositionTo("relative",{top:0,left:r}).left-p.margins.left),o&&(i.position.left=p._convertPositionTo("relative",{top:0,left:h-p.helperProportions.width}).left-p.margins.left)),!p.snapElements[c].snapping&&(s||n||a||o||d)&&p.options.snap.snap&&p.options.snap.snap.call(p.element,t,e.extend(p._uiHash(),{snapItem:p.snapElements[c].item})),p.snapElements[c].snapping=s||n||a||o||d):(p.snapElements[c].snapping&&p.options.snap.release&&p.options.snap.release.call(p.element,t,e.extend(p._uiHash(),{snapItem:p.snapElements[c].item})),p.snapElements[c].snapping=!1)}}),e.ui.plugin.add("draggable","stack",{start:function(){var t,i=this.data("ui-draggable").options,s=e.makeArray(e(i.stack)).sort(function(t,i){return(parseInt(e(t).css("zIndex"),10)||0)-(parseInt(e(i).css("zIndex"),10)||0)});s.length&&(t=parseInt(e(s[0]).css("zIndex"),10)||0,e(s).each(function(i){e(this).css("zIndex",t+i)}),this.css("zIndex",t+s.length))}}),e.ui.plugin.add("draggable","zIndex",{start:function(t,i){var s=e(i.helper),n=e(this).data("ui-draggable").options;s.css("zIndex")&&(n._zIndex=s.css("zIndex")),s.css("zIndex",n.zIndex)},stop:function(t,i){var s=e(this).data("ui-draggable").options;s._zIndex&&e(i.helper).css("zIndex",s._zIndex)}})})(jQuery);(function(e){function t(e){return parseInt(e,10)||0}function i(e){return!isNaN(parseInt(e,10))}e.widget("ui.resizable",e.ui.mouse,{version:"1.10.2",widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:90,resize:null,start:null,stop:null},_create:function(){var t,i,s,n,a,o=this,r=this.options;if(this.element.addClass("ui-resizable"),e.extend(this,{_aspectRatio:!!r.aspectRatio,aspectRatio:r.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:r.helper||r.ghost||r.animate?r.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)&&(this.element.wrap(e("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("ui-resizable",this.element.data("ui-resizable")),this.elementIsWrapper=!0,this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")}),this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0}),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css({margin:this.originalElement.css("margin")}),this._proportionallyResize()),this.handles=r.handles||(e(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se"),this.handles.constructor===String)for("all"===this.handles&&(this.handles="n,e,s,w,se,sw,ne,nw"),t=this.handles.split(","),this.handles={},i=0;t.length>i;i++)s=e.trim(t[i]),a="ui-resizable-"+s,n=e("<div class='ui-resizable-handle "+a+"'></div>"),n.css({zIndex:r.zIndex}),"se"===s&&n.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),this.handles[s]=".ui-resizable-"+s,this.element.append(n);this._renderAxis=function(t){var i,s,n,a;t=t||this.element;for(i in this.handles)this.handles[i].constructor===String&&(this.handles[i]=e(this.handles[i],this.element).show()),this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)&&(s=e(this.handles[i],this.element),a=/sw|ne|nw|se|n|s/.test(i)?s.outerHeight():s.outerWidth(),n=["padding",/ne|nw|n/.test(i)?"Top":/se|sw|s/.test(i)?"Bottom":/^e$/.test(i)?"Right":"Left"].join(""),t.css(n,a),this._proportionallyResize()),e(this.handles[i]).length},this._renderAxis(this.element),this._handles=e(".ui-resizable-handle",this.element).disableSelection(),this._handles.mouseover(function(){o.resizing||(this.className&&(n=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),o.axis=n&&n[1]?n[1]:"se")}),r.autoHide&&(this._handles.hide(),e(this.element).addClass("ui-resizable-autohide").mouseenter(function(){r.disabled||(e(this).removeClass("ui-resizable-autohide"),o._handles.show())}).mouseleave(function(){r.disabled||o.resizing||(e(this).addClass("ui-resizable-autohide"),o._handles.hide())})),this._mouseInit()},_destroy:function(){this._mouseDestroy();var t,i=function(t){e(t).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};return this.elementIsWrapper&&(i(this.element),t=this.element,this.originalElement.css({position:t.css("position"),width:t.outerWidth(),height:t.outerHeight(),top:t.css("top"),left:t.css("left")}).insertAfter(t),t.remove()),this.originalElement.css("resize",this.originalResizeStyle),i(this.originalElement),this},_mouseCapture:function(t){var i,s,n=!1;for(i in this.handles)s=e(this.handles[i])[0],(s===t.target||e.contains(s,t.target))&&(n=!0);return!this.options.disabled&&n},_mouseStart:function(i){var s,n,a,o=this.options,r=this.element.position(),h=this.element;return this.resizing=!0,/absolute/.test(h.css("position"))?h.css({position:"absolute",top:h.css("top"),left:h.css("left")}):h.is(".ui-draggable")&&h.css({position:"absolute",top:r.top,left:r.left}),this._renderProxy(),s=t(this.helper.css("left")),n=t(this.helper.css("top")),o.containment&&(s+=e(o.containment).scrollLeft()||0,n+=e(o.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:s,top:n},this.size=this._helper?{width:h.outerWidth(),height:h.outerHeight()}:{width:h.width(),height:h.height()},this.originalSize=this._helper?{width:h.outerWidth(),height:h.outerHeight()}:{width:h.width(),height:h.height()},this.originalPosition={left:s,top:n},this.sizeDiff={width:h.outerWidth()-h.width(),height:h.outerHeight()-h.height()},this.originalMousePosition={left:i.pageX,top:i.pageY},this.aspectRatio="number"==typeof o.aspectRatio?o.aspectRatio:this.originalSize.width/this.originalSize.height||1,a=e(".ui-resizable-"+this.axis).css("cursor"),e("body").css("cursor","auto"===a?this.axis+"-resize":a),h.addClass("ui-resizable-resizing"),this._propagate("start",i),!0},_mouseDrag:function(t){var i,s=this.helper,n={},a=this.originalMousePosition,o=this.axis,r=this.position.top,h=this.position.left,l=this.size.width,u=this.size.height,c=t.pageX-a.left||0,d=t.pageY-a.top||0,p=this._change[o];return p?(i=p.apply(this,[t,c,d]),this._updateVirtualBoundaries(t.shiftKey),(this._aspectRatio||t.shiftKey)&&(i=this._updateRatio(i,t)),i=this._respectSize(i,t),this._updateCache(i),this._propagate("resize",t),this.position.top!==r&&(n.top=this.position.top+"px"),this.position.left!==h&&(n.left=this.position.left+"px"),this.size.width!==l&&(n.width=this.size.width+"px"),this.size.height!==u&&(n.height=this.size.height+"px"),s.css(n),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),e.isEmptyObject(n)||this._trigger("resize",t,this.ui()),!1):!1},_mouseStop:function(t){this.resizing=!1;var i,s,n,a,o,r,h,l=this.options,u=this;return this._helper&&(i=this._proportionallyResizeElements,s=i.length&&/textarea/i.test(i[0].nodeName),n=s&&e.ui.hasScroll(i[0],"left")?0:u.sizeDiff.height,a=s?0:u.sizeDiff.width,o={width:u.helper.width()-a,height:u.helper.height()-n},r=parseInt(u.element.css("left"),10)+(u.position.left-u.originalPosition.left)||null,h=parseInt(u.element.css("top"),10)+(u.position.top-u.originalPosition.top)||null,l.animate||this.element.css(e.extend(o,{top:h,left:r})),u.helper.height(u.size.height),u.helper.width(u.size.width),this._helper&&!l.animate&&this._proportionallyResize()),e("body").css("cursor","auto"),this.element.removeClass("ui-resizable-resizing"),this._propagate("stop",t),this._helper&&this.helper.remove(),!1},_updateVirtualBoundaries:function(e){var t,s,n,a,o,r=this.options;o={minWidth:i(r.minWidth)?r.minWidth:0,maxWidth:i(r.maxWidth)?r.maxWidth:1/0,minHeight:i(r.minHeight)?r.minHeight:0,maxHeight:i(r.maxHeight)?r.maxHeight:1/0},(this._aspectRatio||e)&&(t=o.minHeight*this.aspectRatio,n=o.minWidth/this.aspectRatio,s=o.maxHeight*this.aspectRatio,a=o.maxWidth/this.aspectRatio,t>o.minWidth&&(o.minWidth=t),n>o.minHeight&&(o.minHeight=n),o.maxWidth>s&&(o.maxWidth=s),o.maxHeight>a&&(o.maxHeight=a)),this._vBoundaries=o},_updateCache:function(e){this.offset=this.helper.offset(),i(e.left)&&(this.position.left=e.left),i(e.top)&&(this.position.top=e.top),i(e.height)&&(this.size.height=e.height),i(e.width)&&(this.size.width=e.width)},_updateRatio:function(e){var t=this.position,s=this.size,n=this.axis;return i(e.height)?e.width=e.height*this.aspectRatio:i(e.width)&&(e.height=e.width/this.aspectRatio),"sw"===n&&(e.left=t.left+(s.width-e.width),e.top=null),"nw"===n&&(e.top=t.top+(s.height-e.height),e.left=t.left+(s.width-e.width)),e},_respectSize:function(e){var t=this._vBoundaries,s=this.axis,n=i(e.width)&&t.maxWidth&&t.maxWidth<e.width,a=i(e.height)&&t.maxHeight&&t.maxHeight<e.height,o=i(e.width)&&t.minWidth&&t.minWidth>e.width,r=i(e.height)&&t.minHeight&&t.minHeight>e.height,h=this.originalPosition.left+this.originalSize.width,l=this.position.top+this.size.height,u=/sw|nw|w/.test(s),c=/nw|ne|n/.test(s);return o&&(e.width=t.minWidth),r&&(e.height=t.minHeight),n&&(e.width=t.maxWidth),a&&(e.height=t.maxHeight),o&&u&&(e.left=h-t.minWidth),n&&u&&(e.left=h-t.maxWidth),r&&c&&(e.top=l-t.minHeight),a&&c&&(e.top=l-t.maxHeight),e.width||e.height||e.left||!e.top?e.width||e.height||e.top||!e.left||(e.left=null):e.top=null,e},_proportionallyResize:function(){if(this._proportionallyResizeElements.length){var e,t,i,s,n,a=this.helper||this.element;for(e=0;this._proportionallyResizeElements.length>e;e++){if(n=this._proportionallyResizeElements[e],!this.borderDif)for(this.borderDif=[],i=[n.css("borderTopWidth"),n.css("borderRightWidth"),n.css("borderBottomWidth"),n.css("borderLeftWidth")],s=[n.css("paddingTop"),n.css("paddingRight"),n.css("paddingBottom"),n.css("paddingLeft")],t=0;i.length>t;t++)this.borderDif[t]=(parseInt(i[t],10)||0)+(parseInt(s[t],10)||0);n.css({height:a.height()-this.borderDif[0]-this.borderDif[2]||0,width:a.width()-this.borderDif[1]-this.borderDif[3]||0})}}},_renderProxy:function(){var t=this.element,i=this.options;this.elementOffset=t.offset(),this._helper?(this.helper=this.helper||e("<div style='overflow:hidden;'></div>"),this.helper.addClass(this._helper).css({width:this.element.outerWidth()-1,height:this.element.outerHeight()-1,position:"absolute",left:this.elementOffset.left+"px",top:this.elementOffset.top+"px",zIndex:++i.zIndex}),this.helper.appendTo("body").disableSelection()):this.helper=this.element},_change:{e:function(e,t){return{width:this.originalSize.width+t}},w:function(e,t){var i=this.originalSize,s=this.originalPosition;return{left:s.left+t,width:i.width-t}},n:function(e,t,i){var s=this.originalSize,n=this.originalPosition;return{top:n.top+i,height:s.height-i}},s:function(e,t,i){return{height:this.originalSize.height+i}},se:function(t,i,s){return e.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[t,i,s]))},sw:function(t,i,s){return e.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[t,i,s]))},ne:function(t,i,s){return e.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[t,i,s]))},nw:function(t,i,s){return e.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[t,i,s]))}},_propagate:function(t,i){e.ui.plugin.call(this,t,[i,this.ui()]),"resize"!==t&&this._trigger(t,i,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),e.ui.plugin.add("resizable","animate",{stop:function(t){var i=e(this).data("ui-resizable"),s=i.options,n=i._proportionallyResizeElements,a=n.length&&/textarea/i.test(n[0].nodeName),o=a&&e.ui.hasScroll(n[0],"left")?0:i.sizeDiff.height,r=a?0:i.sizeDiff.width,h={width:i.size.width-r,height:i.size.height-o},l=parseInt(i.element.css("left"),10)+(i.position.left-i.originalPosition.left)||null,u=parseInt(i.element.css("top"),10)+(i.position.top-i.originalPosition.top)||null;i.element.animate(e.extend(h,u&&l?{top:u,left:l}:{}),{duration:s.animateDuration,easing:s.animateEasing,step:function(){var s={width:parseInt(i.element.css("width"),10),height:parseInt(i.element.css("height"),10),top:parseInt(i.element.css("top"),10),left:parseInt(i.element.css("left"),10)};n&&n.length&&e(n[0]).css({width:s.width,height:s.height}),i._updateCache(s),i._propagate("resize",t)}})}}),e.ui.plugin.add("resizable","containment",{start:function(){var i,s,n,a,o,r,h,l=e(this).data("ui-resizable"),u=l.options,c=l.element,d=u.containment,p=d instanceof e?d.get(0):/parent/.test(d)?c.parent().get(0):d;p&&(l.containerElement=e(p),/document/.test(d)||d===document?(l.containerOffset={left:0,top:0},l.containerPosition={left:0,top:0},l.parentData={element:e(document),left:0,top:0,width:e(document).width(),height:e(document).height()||document.body.parentNode.scrollHeight}):(i=e(p),s=[],e(["Top","Right","Left","Bottom"]).each(function(e,n){s[e]=t(i.css("padding"+n))}),l.containerOffset=i.offset(),l.containerPosition=i.position(),l.containerSize={height:i.innerHeight()-s[3],width:i.innerWidth()-s[1]},n=l.containerOffset,a=l.containerSize.height,o=l.containerSize.width,r=e.ui.hasScroll(p,"left")?p.scrollWidth:o,h=e.ui.hasScroll(p)?p.scrollHeight:a,l.parentData={element:p,left:n.left,top:n.top,width:r,height:h}))},resize:function(t){var i,s,n,a,o=e(this).data("ui-resizable"),r=o.options,h=o.containerOffset,l=o.position,u=o._aspectRatio||t.shiftKey,c={top:0,left:0},d=o.containerElement;d[0]!==document&&/static/.test(d.css("position"))&&(c=h),l.left<(o._helper?h.left:0)&&(o.size.width=o.size.width+(o._helper?o.position.left-h.left:o.position.left-c.left),u&&(o.size.height=o.size.width/o.aspectRatio),o.position.left=r.helper?h.left:0),l.top<(o._helper?h.top:0)&&(o.size.height=o.size.height+(o._helper?o.position.top-h.top:o.position.top),u&&(o.size.width=o.size.height*o.aspectRatio),o.position.top=o._helper?h.top:0),o.offset.left=o.parentData.left+o.position.left,o.offset.top=o.parentData.top+o.position.top,i=Math.abs((o._helper?o.offset.left-c.left:o.offset.left-c.left)+o.sizeDiff.width),s=Math.abs((o._helper?o.offset.top-c.top:o.offset.top-h.top)+o.sizeDiff.height),n=o.containerElement.get(0)===o.element.parent().get(0),a=/relative|absolute/.test(o.containerElement.css("position")),n&&a&&(i-=o.parentData.left),i+o.size.width>=o.parentData.width&&(o.size.width=o.parentData.width-i,u&&(o.size.height=o.size.width/o.aspectRatio)),s+o.size.height>=o.parentData.height&&(o.size.height=o.parentData.height-s,u&&(o.size.width=o.size.height*o.aspectRatio))},stop:function(){var t=e(this).data("ui-resizable"),i=t.options,s=t.containerOffset,n=t.containerPosition,a=t.containerElement,o=e(t.helper),r=o.offset(),h=o.outerWidth()-t.sizeDiff.width,l=o.outerHeight()-t.sizeDiff.height;t._helper&&!i.animate&&/relative/.test(a.css("position"))&&e(this).css({left:r.left-n.left-s.left,width:h,height:l}),t._helper&&!i.animate&&/static/.test(a.css("position"))&&e(this).css({left:r.left-n.left-s.left,width:h,height:l})}}),e.ui.plugin.add("resizable","alsoResize",{start:function(){var t=e(this).data("ui-resizable"),i=t.options,s=function(t){e(t).each(function(){var t=e(this);t.data("ui-resizable-alsoresize",{width:parseInt(t.width(),10),height:parseInt(t.height(),10),left:parseInt(t.css("left"),10),top:parseInt(t.css("top"),10)})})};"object"!=typeof i.alsoResize||i.alsoResize.parentNode?s(i.alsoResize):i.alsoResize.length?(i.alsoResize=i.alsoResize[0],s(i.alsoResize)):e.each(i.alsoResize,function(e){s(e)})},resize:function(t,i){var s=e(this).data("ui-resizable"),n=s.options,a=s.originalSize,o=s.originalPosition,r={height:s.size.height-a.height||0,width:s.size.width-a.width||0,top:s.position.top-o.top||0,left:s.position.left-o.left||0},h=function(t,s){e(t).each(function(){var t=e(this),n=e(this).data("ui-resizable-alsoresize"),a={},o=s&&s.length?s:t.parents(i.originalElement[0]).length?["width","height"]:["width","height","top","left"];e.each(o,function(e,t){var i=(n[t]||0)+(r[t]||0);i&&i>=0&&(a[t]=i||null)}),t.css(a)})};"object"!=typeof n.alsoResize||n.alsoResize.nodeType?h(n.alsoResize):e.each(n.alsoResize,function(e,t){h(e,t)})},stop:function(){e(this).removeData("resizable-alsoresize")}}),e.ui.plugin.add("resizable","ghost",{start:function(){var t=e(this).data("ui-resizable"),i=t.options,s=t.size;t.ghost=t.originalElement.clone(),t.ghost.css({opacity:.25,display:"block",position:"relative",height:s.height,width:s.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass("string"==typeof i.ghost?i.ghost:""),t.ghost.appendTo(t.helper)},resize:function(){var t=e(this).data("ui-resizable");t.ghost&&t.ghost.css({position:"relative",height:t.size.height,width:t.size.width})},stop:function(){var t=e(this).data("ui-resizable");t.ghost&&t.helper&&t.helper.get(0).removeChild(t.ghost.get(0))}}),e.ui.plugin.add("resizable","grid",{resize:function(){var t=e(this).data("ui-resizable"),i=t.options,s=t.size,n=t.originalSize,a=t.originalPosition,o=t.axis,r="number"==typeof i.grid?[i.grid,i.grid]:i.grid,h=r[0]||1,l=r[1]||1,u=Math.round((s.width-n.width)/h)*h,c=Math.round((s.height-n.height)/l)*l,d=n.width+u,p=n.height+c,f=i.maxWidth&&d>i.maxWidth,m=i.maxHeight&&p>i.maxHeight,g=i.minWidth&&i.minWidth>d,v=i.minHeight&&i.minHeight>p;i.grid=r,g&&(d+=h),v&&(p+=l),f&&(d-=h),m&&(p-=l),/^(se|s|e)$/.test(o)?(t.size.width=d,t.size.height=p):/^(ne)$/.test(o)?(t.size.width=d,t.size.height=p,t.position.top=a.top-c):/^(sw)$/.test(o)?(t.size.width=d,t.size.height=p,t.position.left=a.left-u):(t.size.width=d,t.size.height=p,t.position.top=a.top-c,t.position.left=a.left-u)}})})(jQuery);(function(t){function e(t,e,i){return t>e&&e+i>t}function i(t){return/left|right/.test(t.css("float"))||/inline|table-cell/.test(t.css("display"))}t.widget("ui.sortable",t.ui.mouse,{version:"1.10.2",widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3,activate:null,beforeStop:null,change:null,deactivate:null,out:null,over:null,receive:null,remove:null,sort:null,start:null,stop:null,update:null},_create:function(){var t=this.options;this.containerCache={},this.element.addClass("ui-sortable"),this.refresh(),this.floating=this.items.length?"x"===t.axis||i(this.items[0].item):!1,this.offset=this.element.offset(),this._mouseInit(),this.ready=!0},_destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled"),this._mouseDestroy();for(var t=this.items.length-1;t>=0;t--)this.items[t].item.removeData(this.widgetName+"-item");return this},_setOption:function(e,i){"disabled"===e?(this.options[e]=i,this.widget().toggleClass("ui-sortable-disabled",!!i)):t.Widget.prototype._setOption.apply(this,arguments)},_mouseCapture:function(e,i){var s=null,n=!1,a=this;return this.reverting?!1:this.options.disabled||"static"===this.options.type?!1:(this._refreshItems(e),t(e.target).parents().each(function(){return t.data(this,a.widgetName+"-item")===a?(s=t(this),!1):undefined}),t.data(e.target,a.widgetName+"-item")===a&&(s=t(e.target)),s?!this.options.handle||i||(t(this.options.handle,s).find("*").addBack().each(function(){this===e.target&&(n=!0)}),n)?(this.currentItem=s,this._removeCurrentsFromItems(),!0):!1:!1)},_mouseStart:function(e,i,s){var n,a,o=this.options;if(this.currentContainer=this,this.refreshPositions(),this.helper=this._createHelper(e),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},t.extend(this.offset,{click:{left:e.pageX-this.offset.left,top:e.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),this.originalPosition=this._generatePosition(e),this.originalPageX=e.pageX,this.originalPageY=e.pageY,o.cursorAt&&this._adjustOffsetFromHelper(o.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!==this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),o.containment&&this._setContainment(),o.cursor&&"auto"!==o.cursor&&(a=this.document.find("body"),this.storedCursor=a.css("cursor"),a.css("cursor",o.cursor),this.storedStylesheet=t("<style>*{ cursor: "+o.cursor+" !important; }</style>").appendTo(a)),o.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",o.opacity)),o.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",o.zIndex)),this.scrollParent[0]!==document&&"HTML"!==this.scrollParent[0].tagName&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",e,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions(),!s)for(n=this.containers.length-1;n>=0;n--)this.containers[n]._trigger("activate",e,this._uiHash(this));return t.ui.ddmanager&&(t.ui.ddmanager.current=this),t.ui.ddmanager&&!o.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e),this.dragging=!0,this.helper.addClass("ui-sortable-helper"),this._mouseDrag(e),!0},_mouseDrag:function(e){var i,s,n,a,o=this.options,r=!1;for(this.position=this._generatePosition(e),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs),this.options.scroll&&(this.scrollParent[0]!==document&&"HTML"!==this.scrollParent[0].tagName?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-e.pageY<o.scrollSensitivity?this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop+o.scrollSpeed:e.pageY-this.overflowOffset.top<o.scrollSensitivity&&(this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop-o.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-e.pageX<o.scrollSensitivity?this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft+o.scrollSpeed:e.pageX-this.overflowOffset.left<o.scrollSensitivity&&(this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft-o.scrollSpeed)):(e.pageY-t(document).scrollTop()<o.scrollSensitivity?r=t(document).scrollTop(t(document).scrollTop()-o.scrollSpeed):t(window).height()-(e.pageY-t(document).scrollTop())<o.scrollSensitivity&&(r=t(document).scrollTop(t(document).scrollTop()+o.scrollSpeed)),e.pageX-t(document).scrollLeft()<o.scrollSensitivity?r=t(document).scrollLeft(t(document).scrollLeft()-o.scrollSpeed):t(window).width()-(e.pageX-t(document).scrollLeft())<o.scrollSensitivity&&(r=t(document).scrollLeft(t(document).scrollLeft()+o.scrollSpeed))),r!==!1&&t.ui.ddmanager&&!o.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e)),this.positionAbs=this._convertPositionTo("absolute"),this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),i=this.items.length-1;i>=0;i--)if(s=this.items[i],n=s.item[0],a=this._intersectsWithPointer(s),a&&s.instance===this.currentContainer&&n!==this.currentItem[0]&&this.placeholder[1===a?"next":"prev"]()[0]!==n&&!t.contains(this.placeholder[0],n)&&("semi-dynamic"===this.options.type?!t.contains(this.element[0],n):!0)){if(this.direction=1===a?"down":"up","pointer"!==this.options.tolerance&&!this._intersectsWithSides(s))break;this._rearrange(e,s),this._trigger("change",e,this._uiHash());break}return this._contactContainers(e),t.ui.ddmanager&&t.ui.ddmanager.drag(this,e),this._trigger("sort",e,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(e,i){if(e){if(t.ui.ddmanager&&!this.options.dropBehaviour&&t.ui.ddmanager.drop(this,e),this.options.revert){var s=this,n=this.placeholder.offset(),a=this.options.axis,o={};a&&"x"!==a||(o.left=n.left-this.offset.parent.left-this.margins.left+(this.offsetParent[0]===document.body?0:this.offsetParent[0].scrollLeft)),a&&"y"!==a||(o.top=n.top-this.offset.parent.top-this.margins.top+(this.offsetParent[0]===document.body?0:this.offsetParent[0].scrollTop)),this.reverting=!0,t(this.helper).animate(o,parseInt(this.options.revert,10)||500,function(){s._clear(e)})}else this._clear(e,i);return!1}},cancel:function(){if(this.dragging){this._mouseUp({target:null}),"original"===this.options.helper?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();for(var e=this.containers.length-1;e>=0;e--)this.containers[e]._trigger("deactivate",null,this._uiHash(this)),this.containers[e].containerCache.over&&(this.containers[e]._trigger("out",null,this._uiHash(this)),this.containers[e].containerCache.over=0)}return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),"original"!==this.options.helper&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),t.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?t(this.domPosition.prev).after(this.currentItem):t(this.domPosition.parent).prepend(this.currentItem)),this},serialize:function(e){var i=this._getItemsAsjQuery(e&&e.connected),s=[];return e=e||{},t(i).each(function(){var i=(t(e.item||this).attr(e.attribute||"id")||"").match(e.expression||/(.+)[\-=_](.+)/);i&&s.push((e.key||i[1]+"[]")+"="+(e.key&&e.expression?i[1]:i[2]))}),!s.length&&e.key&&s.push(e.key+"="),s.join("&")},toArray:function(e){var i=this._getItemsAsjQuery(e&&e.connected),s=[];return e=e||{},i.each(function(){s.push(t(e.item||this).attr(e.attribute||"id")||"")}),s},_intersectsWith:function(t){var e=this.positionAbs.left,i=e+this.helperProportions.width,s=this.positionAbs.top,n=s+this.helperProportions.height,a=t.left,o=a+t.width,r=t.top,h=r+t.height,l=this.offset.click.top,c=this.offset.click.left,u=s+l>r&&h>s+l&&e+c>a&&o>e+c;return"pointer"===this.options.tolerance||this.options.forcePointerForContainers||"pointer"!==this.options.tolerance&&this.helperProportions[this.floating?"width":"height"]>t[this.floating?"width":"height"]?u:e+this.helperProportions.width/2>a&&o>i-this.helperProportions.width/2&&s+this.helperProportions.height/2>r&&h>n-this.helperProportions.height/2},_intersectsWithPointer:function(t){var i="x"===this.options.axis||e(this.positionAbs.top+this.offset.click.top,t.top,t.height),s="y"===this.options.axis||e(this.positionAbs.left+this.offset.click.left,t.left,t.width),n=i&&s,a=this._getDragVerticalDirection(),o=this._getDragHorizontalDirection();return n?this.floating?o&&"right"===o||"down"===a?2:1:a&&("down"===a?2:1):!1},_intersectsWithSides:function(t){var i=e(this.positionAbs.top+this.offset.click.top,t.top+t.height/2,t.height),s=e(this.positionAbs.left+this.offset.click.left,t.left+t.width/2,t.width),n=this._getDragVerticalDirection(),a=this._getDragHorizontalDirection();return this.floating&&a?"right"===a&&s||"left"===a&&!s:n&&("down"===n&&i||"up"===n&&!i)},_getDragVerticalDirection:function(){var t=this.positionAbs.top-this.lastPositionAbs.top;return 0!==t&&(t>0?"down":"up")},_getDragHorizontalDirection:function(){var t=this.positionAbs.left-this.lastPositionAbs.left;return 0!==t&&(t>0?"right":"left")},refresh:function(t){return this._refreshItems(t),this.refreshPositions(),this},_connectWith:function(){var t=this.options;return t.connectWith.constructor===String?[t.connectWith]:t.connectWith},_getItemsAsjQuery:function(e){var i,s,n,a,o=[],r=[],h=this._connectWith();if(h&&e)for(i=h.length-1;i>=0;i--)for(n=t(h[i]),s=n.length-1;s>=0;s--)a=t.data(n[s],this.widgetFullName),a&&a!==this&&!a.options.disabled&&r.push([t.isFunction(a.options.items)?a.options.items.call(a.element):t(a.options.items,a.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),a]);for(r.push([t.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):t(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]),i=r.length-1;i>=0;i--)r[i][0].each(function(){o.push(this)});return t(o)},_removeCurrentsFromItems:function(){var e=this.currentItem.find(":data("+this.widgetName+"-item)");this.items=t.grep(this.items,function(t){for(var i=0;e.length>i;i++)if(e[i]===t.item[0])return!1;return!0})},_refreshItems:function(e){this.items=[],this.containers=[this];var i,s,n,a,o,r,h,l,c=this.items,u=[[t.isFunction(this.options.items)?this.options.items.call(this.element[0],e,{item:this.currentItem}):t(this.options.items,this.element),this]],d=this._connectWith();if(d&&this.ready)for(i=d.length-1;i>=0;i--)for(n=t(d[i]),s=n.length-1;s>=0;s--)a=t.data(n[s],this.widgetFullName),a&&a!==this&&!a.options.disabled&&(u.push([t.isFunction(a.options.items)?a.options.items.call(a.element[0],e,{item:this.currentItem}):t(a.options.items,a.element),a]),this.containers.push(a));for(i=u.length-1;i>=0;i--)for(o=u[i][1],r=u[i][0],s=0,l=r.length;l>s;s++)h=t(r[s]),h.data(this.widgetName+"-item",o),c.push({item:h,instance:o,width:0,height:0,left:0,top:0})},refreshPositions:function(e){this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());var i,s,n,a;for(i=this.items.length-1;i>=0;i--)s=this.items[i],s.instance!==this.currentContainer&&this.currentContainer&&s.item[0]!==this.currentItem[0]||(n=this.options.toleranceElement?t(this.options.toleranceElement,s.item):s.item,e||(s.width=n.outerWidth(),s.height=n.outerHeight()),a=n.offset(),s.left=a.left,s.top=a.top);if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(i=this.containers.length-1;i>=0;i--)a=this.containers[i].element.offset(),this.containers[i].containerCache.left=a.left,this.containers[i].containerCache.top=a.top,this.containers[i].containerCache.width=this.containers[i].element.outerWidth(),this.containers[i].containerCache.height=this.containers[i].element.outerHeight();return this},_createPlaceholder:function(e){e=e||this;var i,s=e.options;s.placeholder&&s.placeholder.constructor!==String||(i=s.placeholder,s.placeholder={element:function(){var s=e.currentItem[0].nodeName.toLowerCase(),n=t(e.document[0].createElement(s)).addClass(i||e.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper");return"tr"===s?n.append("<td colspan='99'>&#160;</td>"):"img"===s&&n.attr("src",e.currentItem.attr("src")),i||n.css("visibility","hidden"),n},update:function(t,n){(!i||s.forcePlaceholderSize)&&(n.height()||n.height(e.currentItem.innerHeight()-parseInt(e.currentItem.css("paddingTop")||0,10)-parseInt(e.currentItem.css("paddingBottom")||0,10)),n.width()||n.width(e.currentItem.innerWidth()-parseInt(e.currentItem.css("paddingLeft")||0,10)-parseInt(e.currentItem.css("paddingRight")||0,10)))}}),e.placeholder=t(s.placeholder.element.call(e.element,e.currentItem)),e.currentItem.after(e.placeholder),s.placeholder.update(e,e.placeholder)},_contactContainers:function(s){var n,a,o,r,h,l,c,u,d,p,f=null,m=null;for(n=this.containers.length-1;n>=0;n--)if(!t.contains(this.currentItem[0],this.containers[n].element[0]))if(this._intersectsWith(this.containers[n].containerCache)){if(f&&t.contains(this.containers[n].element[0],f.element[0]))continue;f=this.containers[n],m=n}else this.containers[n].containerCache.over&&(this.containers[n]._trigger("out",s,this._uiHash(this)),this.containers[n].containerCache.over=0);if(f)if(1===this.containers.length)this.containers[m].containerCache.over||(this.containers[m]._trigger("over",s,this._uiHash(this)),this.containers[m].containerCache.over=1);else{for(o=1e4,r=null,p=f.floating||i(this.currentItem),h=p?"left":"top",l=p?"width":"height",c=this.positionAbs[h]+this.offset.click[h],a=this.items.length-1;a>=0;a--)t.contains(this.containers[m].element[0],this.items[a].item[0])&&this.items[a].item[0]!==this.currentItem[0]&&(!p||e(this.positionAbs.top+this.offset.click.top,this.items[a].top,this.items[a].height))&&(u=this.items[a].item.offset()[h],d=!1,Math.abs(u-c)>Math.abs(u+this.items[a][l]-c)&&(d=!0,u+=this.items[a][l]),o>Math.abs(u-c)&&(o=Math.abs(u-c),r=this.items[a],this.direction=d?"up":"down"));if(!r&&!this.options.dropOnEmpty)return;if(this.currentContainer===this.containers[m])return;r?this._rearrange(s,r,null,!0):this._rearrange(s,null,this.containers[m].element,!0),this._trigger("change",s,this._uiHash()),this.containers[m]._trigger("change",s,this._uiHash(this)),this.currentContainer=this.containers[m],this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[m]._trigger("over",s,this._uiHash(this)),this.containers[m].containerCache.over=1}},_createHelper:function(e){var i=this.options,s=t.isFunction(i.helper)?t(i.helper.apply(this.element[0],[e,this.currentItem])):"clone"===i.helper?this.currentItem.clone():this.currentItem;return s.parents("body").length||t("parent"!==i.appendTo?i.appendTo:this.currentItem[0].parentNode)[0].appendChild(s[0]),s[0]===this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),(!s[0].style.width||i.forceHelperSize)&&s.width(this.currentItem.width()),(!s[0].style.height||i.forceHelperSize)&&s.height(this.currentItem.height()),s},_adjustOffsetFromHelper:function(e){"string"==typeof e&&(e=e.split(" ")),t.isArray(e)&&(e={left:+e[0],top:+e[1]||0}),"left"in e&&(this.offset.click.left=e.left+this.margins.left),"right"in e&&(this.offset.click.left=this.helperProportions.width-e.right+this.margins.left),"top"in e&&(this.offset.click.top=e.top+this.margins.top),"bottom"in e&&(this.offset.click.top=this.helperProportions.height-e.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var e=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==document&&t.contains(this.scrollParent[0],this.offsetParent[0])&&(e.left+=this.scrollParent.scrollLeft(),e.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===document.body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&t.ui.ie)&&(e={top:0,left:0}),{top:e.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:e.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var t=this.currentItem.position();return{top:t.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:t.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var e,i,s,n=this.options;"parent"===n.containment&&(n.containment=this.helper[0].parentNode),("document"===n.containment||"window"===n.containment)&&(this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,t("document"===n.containment?document:window).width()-this.helperProportions.width-this.margins.left,(t("document"===n.containment?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]),/^(document|window|parent)$/.test(n.containment)||(e=t(n.containment)[0],i=t(n.containment).offset(),s="hidden"!==t(e).css("overflow"),this.containment=[i.left+(parseInt(t(e).css("borderLeftWidth"),10)||0)+(parseInt(t(e).css("paddingLeft"),10)||0)-this.margins.left,i.top+(parseInt(t(e).css("borderTopWidth"),10)||0)+(parseInt(t(e).css("paddingTop"),10)||0)-this.margins.top,i.left+(s?Math.max(e.scrollWidth,e.offsetWidth):e.offsetWidth)-(parseInt(t(e).css("borderLeftWidth"),10)||0)-(parseInt(t(e).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,i.top+(s?Math.max(e.scrollHeight,e.offsetHeight):e.offsetHeight)-(parseInt(t(e).css("borderTopWidth"),10)||0)-(parseInt(t(e).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top])},_convertPositionTo:function(e,i){i||(i=this.position);var s="absolute"===e?1:-1,n="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&t.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,a=/(html|body)/i.test(n[0].tagName);return{top:i.top+this.offset.relative.top*s+this.offset.parent.top*s-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():a?0:n.scrollTop())*s,left:i.left+this.offset.relative.left*s+this.offset.parent.left*s-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():a?0:n.scrollLeft())*s}},_generatePosition:function(e){var i,s,n=this.options,a=e.pageX,o=e.pageY,r="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&t.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,h=/(html|body)/i.test(r[0].tagName);return"relative"!==this.cssPosition||this.scrollParent[0]!==document&&this.scrollParent[0]!==this.offsetParent[0]||(this.offset.relative=this._getRelativeOffset()),this.originalPosition&&(this.containment&&(e.pageX-this.offset.click.left<this.containment[0]&&(a=this.containment[0]+this.offset.click.left),e.pageY-this.offset.click.top<this.containment[1]&&(o=this.containment[1]+this.offset.click.top),e.pageX-this.offset.click.left>this.containment[2]&&(a=this.containment[2]+this.offset.click.left),e.pageY-this.offset.click.top>this.containment[3]&&(o=this.containment[3]+this.offset.click.top)),n.grid&&(i=this.originalPageY+Math.round((o-this.originalPageY)/n.grid[1])*n.grid[1],o=this.containment?i-this.offset.click.top>=this.containment[1]&&i-this.offset.click.top<=this.containment[3]?i:i-this.offset.click.top>=this.containment[1]?i-n.grid[1]:i+n.grid[1]:i,s=this.originalPageX+Math.round((a-this.originalPageX)/n.grid[0])*n.grid[0],a=this.containment?s-this.offset.click.left>=this.containment[0]&&s-this.offset.click.left<=this.containment[2]?s:s-this.offset.click.left>=this.containment[0]?s-n.grid[0]:s+n.grid[0]:s)),{top:o-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():h?0:r.scrollTop()),left:a-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():h?0:r.scrollLeft())}},_rearrange:function(t,e,i,s){i?i[0].appendChild(this.placeholder[0]):e.item[0].parentNode.insertBefore(this.placeholder[0],"down"===this.direction?e.item[0]:e.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var n=this.counter;this._delay(function(){n===this.counter&&this.refreshPositions(!s)})},_clear:function(t,e){this.reverting=!1;var i,s=[];if(!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null,this.helper[0]===this.currentItem[0]){for(i in this._storedCSS)("auto"===this._storedCSS[i]||"static"===this._storedCSS[i])&&(this._storedCSS[i]="");this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else this.currentItem.show();for(this.fromOutside&&!e&&s.push(function(t){this._trigger("receive",t,this._uiHash(this.fromOutside))}),!this.fromOutside&&this.domPosition.prev===this.currentItem.prev().not(".ui-sortable-helper")[0]&&this.domPosition.parent===this.currentItem.parent()[0]||e||s.push(function(t){this._trigger("update",t,this._uiHash())}),this!==this.currentContainer&&(e||(s.push(function(t){this._trigger("remove",t,this._uiHash())}),s.push(function(t){return function(e){t._trigger("receive",e,this._uiHash(this))}}.call(this,this.currentContainer)),s.push(function(t){return function(e){t._trigger("update",e,this._uiHash(this))}}.call(this,this.currentContainer)))),i=this.containers.length-1;i>=0;i--)e||s.push(function(t){return function(e){t._trigger("deactivate",e,this._uiHash(this))}}.call(this,this.containers[i])),this.containers[i].containerCache.over&&(s.push(function(t){return function(e){t._trigger("out",e,this._uiHash(this))}}.call(this,this.containers[i])),this.containers[i].containerCache.over=0);if(this.storedCursor&&(this.document.find("body").css("cursor",this.storedCursor),this.storedStylesheet.remove()),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex","auto"===this._storedZIndex?"":this._storedZIndex),this.dragging=!1,this.cancelHelperRemoval){if(!e){for(this._trigger("beforeStop",t,this._uiHash()),i=0;s.length>i;i++)s[i].call(this,t);this._trigger("stop",t,this._uiHash())}return this.fromOutside=!1,!1}if(e||this._trigger("beforeStop",t,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.helper[0]!==this.currentItem[0]&&this.helper.remove(),this.helper=null,!e){for(i=0;s.length>i;i++)s[i].call(this,t);this._trigger("stop",t,this._uiHash())}return this.fromOutside=!1,!0},_trigger:function(){t.Widget.prototype._trigger.apply(this,arguments)===!1&&this.cancel()},_uiHash:function(e){var i=e||this;return{helper:i.helper,placeholder:i.placeholder||t([]),position:i.position,originalPosition:i.originalPosition,offset:i.positionAbs,item:i.currentItem,sender:e?e.element:null}}})})(jQuery);



/*jslint browser: true, eqeqeq: true, bitwise: true, newcap: true, immed: true, regexp: false */

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

LazyLoad = (function (doc) {
  // -- Private Variables ------------------------------------------------------

  // User agent and feature test information.
  var env,

  // Reference to the <head> element (populated lazily).
  head,

  // Requests currently in progress, if any.
  pending = {},

  // Number of times we've polled to check whether a pending stylesheet has
  // finished loading. If this gets too high, we're probably stalled.
  pollCount = 0,

  // Queued requests.
  queue = {css: [], js: []},

  // Reference to the browser's list of stylesheets.
  styleSheets = doc.styleSheets;

  // -- Private Methods --------------------------------------------------------

  /**
  Creates and returns an HTML element with the specified name and attributes.

  @method createNode
  @param {String} name element name
  @param {Object} attrs name/value mapping of element attributes
  @return {HTMLElement}
  @private
  */
  function createNode(name, attrs) {
    var node = doc.createElement(name), attr;

    for (attr in attrs) {
      if (attrs.hasOwnProperty(attr)) {
        node.setAttribute(attr, attrs[attr]);
      }
    }

    return node;
  }

  /**
  Called when the current pending resource of the specified type has finished
  loading. Executes the associated callback (if any) and loads the next
  resource in the queue.

  @method finish
  @param {String} type resource type ('css' or 'js')
  @private
  */
  function finish(type) {
    var p = pending[type],
        callback,
        urls;

    if (p) {
      callback = p.callback;
      urls     = p.urls;

      urls.shift();
      pollCount = 0;

      // If this is the last of the pending URLs, execute the callback and
      // start the next request in the queue (if any).
      if (!urls.length) {
        callback && callback.call(p.context, p.obj);
        pending[type] = null;
        queue[type].length && load(type);
      }
    }
  }

  /**
  Populates the <code>env</code> variable with user agent and feature test
  information.

  @method getEnv
  @private
  */
  function getEnv() {
    var ua = navigator.userAgent;

    env = {
      // True if this browser supports disabling async mode on dynamically
      // created script nodes. See
      // http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order
      async: doc.createElement('script').async === true
    };

    (env.webkit = /AppleWebKit\//.test(ua))
      || (env.ie = /MSIE/.test(ua))
      || (env.opera = /Opera/.test(ua))
      || (env.gecko = /Gecko\//.test(ua))
      || (env.unknown = true);
  }

  /**
  Loads the specified resources, or the next resource of the specified type
  in the queue if no resources are specified. If a resource of the specified
  type is already being loaded, the new request will be queued until the
  first request has been finished.

  When an array of resource URLs is specified, those URLs will be loaded in
  parallel if it is possible to do so while preserving execution order. All
  browsers support parallel loading of CSS, but only Firefox and Opera
  support parallel loading of scripts. In other browsers, scripts will be
  queued and loaded one at a time to ensure correct execution order.

  @method load
  @param {String} type resource type ('css' or 'js')
  @param {String|Array} urls (optional) URL or array of URLs to load
  @param {Function} callback (optional) callback function to execute when the
    resource is loaded
  @param {Object} obj (optional) object to pass to the callback function
  @param {Object} context (optional) if provided, the callback function will
    be executed in this object's context
  @private
  */
  function load(type, urls, callback, obj, context) {
    var _finish = function () { finish(type); },
        isCSS   = type === 'css',
        nodes   = [],
        i, len, node, p, pendingUrls, url;

    env || getEnv();

    if (urls) {
      // If urls is a string, wrap it in an array. Otherwise assume it's an
      // array and create a copy of it so modifications won't be made to the
      // original.
      urls = typeof urls === 'string' ? [urls] : urls.concat();

      // Create a request object for each URL. If multiple URLs are specified,
      // the callback will only be executed after all URLs have been loaded.
      //
      // Sadly, Firefox and Opera are the only browsers capable of loading
      // scripts in parallel while preserving execution order. In all other
      // browsers, scripts must be loaded sequentially.
      //
      // All browsers respect CSS specificity based on the order of the link
      // elements in the DOM, regardless of the order in which the stylesheets
      // are actually downloaded.
      if (isCSS || env.async || env.gecko || env.opera) {
        // Load in parallel.
        queue[type].push({
          urls    : urls,
          callback: callback,
          obj     : obj,
          context : context
        });
      } else {
        // Load sequentially.
        for (i = 0, len = urls.length; i < len; ++i) {
          queue[type].push({
            urls    : [urls[i]],
            callback: i === len - 1 ? callback : null, // callback is only added to the last URL
            obj     : obj,
            context : context
          });
        }
      }
    }

    // If a previous load request of this type is currently in progress, we'll
    // wait our turn. Otherwise, grab the next item in the queue.
    if (pending[type] || !(p = pending[type] = queue[type].shift())) {
      return;
    }

    head || (head = doc.head || doc.getElementsByTagName('head')[0]);
    pendingUrls = p.urls;

    for (i = 0, len = pendingUrls.length; i < len; ++i) {
      url = pendingUrls[i];

      if (isCSS) {
          node = env.gecko ? createNode('style') : createNode('link', {
            href: url,
            rel : 'stylesheet'
          });
      } else {
        node = createNode('script', {src: url});
        node.async = false;
      }

      node.className = 'lazyload';
      node.setAttribute('charset', 'utf-8');

      if (env.ie && !isCSS) {
        node.onreadystatechange = function () {
          if (/loaded|complete/.test(node.readyState)) {
            node.onreadystatechange = null;
            _finish();
          }
        };
      } else if (isCSS && (env.gecko || env.webkit)) {
        // Gecko and WebKit don't support the onload event on link nodes.
        if (env.webkit) {
          // In WebKit, we can poll for changes to document.styleSheets to
          // figure out when stylesheets have loaded.
          p.urls[i] = node.href; // resolve relative URLs (or polling won't work)
          pollWebKit();
        } else {
          // In Gecko, we can import the requested URL into a <style> node and
          // poll for the existence of node.sheet.cssRules. Props to Zach
          // Leatherman for calling my attention to this technique.
          node.innerHTML = '@import "' + url + '";';
          pollGecko(node);
        }
      } else {
        node.onload = node.onerror = _finish;
      }

      nodes.push(node);
    }

    for (i = 0, len = nodes.length; i < len; ++i) {
      head.appendChild(nodes[i]);
    }
  }

  /**
  Begins polling to determine when the specified stylesheet has finished loading
  in Gecko. Polling stops when all pending stylesheets have loaded or after 10
  seconds (to prevent stalls).

  Thanks to Zach Leatherman for calling my attention to the @import-based
  cross-domain technique used here, and to Oleg Slobodskoi for an earlier
  same-domain implementation. See Zach's blog for more details:
  http://www.zachleat.com/web/2010/07/29/load-css-dynamically/

  @method pollGecko
  @param {HTMLElement} node Style node to poll.
  @private
  */
  function pollGecko(node) {
    var hasRules;

    try {
      // We don't really need to store this value or ever refer to it again, but
      // if we don't store it, Closure Compiler assumes the code is useless and
      // removes it.
      hasRules = !!node.sheet.cssRules;
    } catch (ex) {
      // An exception means the stylesheet is still loading.
      pollCount += 1;

      if (pollCount < 200) {
        setTimeout(function () { pollGecko(node); }, 50);
      } else {
        // We've been polling for 10 seconds and nothing's happened. Stop
        // polling and finish the pending requests to avoid blocking further
        // requests.
        hasRules && finish('css');
      }

      return;
    }

    // If we get here, the stylesheet has loaded.
    finish('css');
  }

  /**
  Begins polling to determine when pending stylesheets have finished loading
  in WebKit. Polling stops when all pending stylesheets have loaded or after 10
  seconds (to prevent stalls).

  @method pollWebKit
  @private
  */
  function pollWebKit() {
    var css = pending.css, i;

    if (css) {
      i = styleSheets.length;

      // Look for a stylesheet matching the pending URL.
      while (--i >= 0) {
        if (styleSheets[i].href === css.urls[0]) {
          finish('css');
          break;
        }
      }

      pollCount += 1;

      if (css) {
        if (pollCount < 200) {
          setTimeout(pollWebKit, 50);
        } else {
          // We've been polling for 10 seconds and nothing's happened, which may
          // indicate that the stylesheet has been removed from the document
          // before it had a chance to load. Stop polling and finish the pending
          // request to prevent blocking further requests.
          finish('css');
        }
      }
    }
  }

  return {

    /**
    Requests the specified CSS URL or URLs and executes the specified
    callback (if any) when they have finished loading. If an array of URLs is
    specified, the stylesheets will be loaded in parallel and the callback
    will be executed after all stylesheets have finished loading.

    @method css
    @param {String|Array} urls CSS URL or array of CSS URLs to load
    @param {Function} callback (optional) callback function to execute when
      the specified stylesheets are loaded
    @param {Object} obj (optional) object to pass to the callback function
    @param {Object} context (optional) if provided, the callback function
      will be executed in this object's context
    @static
    */
    css: function (urls, callback, obj, context) {
      load('css', urls, callback, obj, context);
    },

    /**
    Requests the specified JavaScript URL or URLs and executes the specified
    callback (if any) when they have finished loading. If an array of URLs is
    specified and the browser supports it, the scripts will be loaded in
    parallel and the callback will be executed after all scripts have
    finished loading.

    Currently, only Firefox and Opera support parallel loading of scripts while
    preserving execution order. In other browsers, scripts will be
    queued and loaded one at a time to ensure correct execution order.

    @method js
    @param {String|Array} urls JS URL or array of JS URLs to load
    @param {Function} callback (optional) callback function to execute when
      the specified scripts are loaded
    @param {Object} obj (optional) object to pass to the callback function
    @param {Object} context (optional) if provided, the callback function
      will be executed in this object's context
    @static
    */
    js: function (urls, callback, obj, context) {
      load('js', urls, callback, obj, context);
    }

  };
})(this.document);



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
	 * @param {String} n			The prefix to use for the IDs generated.
	 * @return {String}				A guarenteed unique ID.
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
				while(i >= 0)	{
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
			  		}/*	else if("load" in ltree) { // A load
				  	}*/	else if("nodes" in ltree) { // Not a Leaf
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
			if(best_choice_index != -1)	{
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
		while(nodes.length > 0)	{
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
			new_area_a.w = Math.max(a.x+a.w, l.x+l.w) - new_area_a.x;	new_area_a.h = Math.max(a.y+a.h, l.y+l.h) - new_area_a.y;
			var change_new_area_a = Math.abs(RTree.Rectangle.squarified_ratio(new_area_a.w, new_area_a.h, a.nodes.length+2) - area_a);
	
			var new_area_b = {};
			new_area_b.x = Math.min(b.x, l.x); new_area_b.y = Math.min(b.y, l.y);
			new_area_b.w = Math.max(b.x+b.w, l.x+l.w) - new_area_b.x;	new_area_b.h = Math.max(b.y+b.h, l.y+l.h) - new_area_b.y;
			var change_new_area_b = Math.abs(RTree.Rectangle.squarified_ratio(new_area_b.w, new_area_b.h, b.nodes.length+2) - area_b);

			if( !high_area_node || !high_area_delta || Math.abs( change_new_area_b - change_new_area_a ) < high_area_delta ) {
				high_area_node = i;
				high_area_delta = Math.abs(change_new_area_b-change_new_area_a);
				lowest_growth_group = change_new_area_b < change_new_area_a ? b : a;
			}
		}
		var temp_node = nodes.splice(high_area_node, 1)[0];
		if(a.nodes.length + nodes.length + 1 <= _Min_Width)	{
			a.nodes.push(temp_node);
			RTree.Rectangle.expand_rectangle(a, temp_node);
		}	else if(b.nodes.length + nodes.length + 1 <= _Min_Width) {
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
		
		for(var i = nodes.length-2; i>=0;i--)	{
			var l = nodes[i];
			if(l.x > nodes[highest_low_x].x ) highest_low_x = i;
			else if(l.x+l.w < nodes[lowest_high_x].x+nodes[lowest_high_x].w) lowest_high_x = i;
			if(l.y > nodes[highest_low_y].y ) highest_low_y = i;
			else if(l.y+l.h < nodes[lowest_high_y].y+nodes[lowest_high_y].h) lowest_high_y = i;
		}
		var dx = Math.abs((nodes[lowest_high_x].x+nodes[lowest_high_x].w) - nodes[highest_low_x].x);
		var dy = Math.abs((nodes[lowest_high_y].y+nodes[lowest_high_y].h) - nodes[highest_low_y].y);
		if( dx > dy )	{ 
			if(lowest_high_x > highest_low_x)	{
				t1 = nodes.splice(lowest_high_x, 1)[0];
				t2 = nodes.splice(highest_low_x, 1)[0];
			}	else {
				t2 = nodes.splice(highest_low_x, 1)[0];
				t1 = nodes.splice(lowest_high_x, 1)[0];
			}
		}	else {
			if(lowest_high_y > highest_low_y)	{
				t1 = nodes.splice(lowest_high_y, 1)[0];
				t2 = nodes.splice(highest_low_y, 1)[0];
			}	else {
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
		  		}/*	else if("load" in ltree) { // We need to fetch a URL for some more tree data
	  				jQuery.getJSON(ltree.load, load_callback(this, ltree));
	  				delete ltree.load;
	  			//	i++; // Replay this entry
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
	
				if(bc.nodes.length <= _Max_Width)	{ // Start Resizeing Up the Tree
					ret_obj = {x:bc.x,y:bc.y,w:bc.w,h:bc.h};
				}	else { // Otherwise Split this Node
					// linear_split() returns an array containing two new nodes
					// formed from the split of the previous node's overflow
					var a = _linear_split(bc.nodes);
					ret_obj = a;//[1];
					
					if(tree_stack.length < 1)	{ // If are splitting the root..
						bc.nodes.push(a[0]);
						tree_stack.push(bc);     // Reconsider the root element
						ret_obj = a[1];
					} /*else {
						delete bc;
					}*/
				}
			}	else { // Otherwise Do Resize
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
		
		if(!tree)	{
			count_stack.push(_T.nodes.length);
			hit_stack.push(_T.nodes);
			return_string += "var main_tree = {x:"+_T.x.toFixed()+",y:"+_T.y.toFixed()+",w:"+_T.w.toFixed()+",h:"+_T.h.toFixed()+",nodes:[";
		}	else {
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
				
			while(i >= 0)	{
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
			  		}	else {
				  		return_string += "{x:"+ltree.x.toFixed()+",y:"+ltree.y.toFixed()+",w:"+ltree.w.toFixed()+",h:"+ltree.h.toFixed()+",nodes:[";
				  		current_depth += 1;
				  		count_stack.push(i);
				  		hit_stack.push(nodes);
				  		nodes = ltree.nodes;
				  		i = ltree.nodes.length;
				  	}
			  	}	else if(ltree.leaf) { // A Leaf !!
			  		var data = ltree.leaf.toJSON ? ltree.leaf.toJSON() : JSON.stringify(ltree.leaf);
		  			return_string += "{x:"+ltree.x.toFixed()+",y:"+ltree.y.toFixed()+",w:"+ltree.w.toFixed()+",h:"+ltree.h.toFixed()+",leaf:" + data + "}";
						if(i > 0)
							return_string += ","
		  		}	else if(ltree.load) { // A load
		  			return_string += "{x:"+ltree.x.toFixed()+",y:"+ltree.y.toFixed()+",w:"+ltree.w.toFixed()+",h:"+ltree.h.toFixed()+",load:'" + ltree.load + "'}";
						if(i > 0)
							return_string += ","
			  	}
				}
				i -= 1;
			}
			if(i < 0)	{
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
				w = ix.x2-ix.x;	h = ix.y2-ix.y;
			}	else {
				w = ix.w;	h = ix.h;
			}
		x2 = x + w; y2 = y + h; // For extra fastitude
	} else {
		x = ix; y = iy;	w = iw;	h = ih;
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
				w = ix.x2-ix.x;	h = ix.y2-ix.y;
			}	else {
				w = ix.w;	h = ix.h;
			}
			x2 = x + w; y2 = y + h; // For extra fastitude
		} else {
			x = ix; y = iy;	w = iw;	h = ih;
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
RTree.Rectangle.expand_rectangle = function(a, b)	{
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



var FRegion = function(features){
  var _features    = new Array();
  var _featuresSortedByEnds = new Array();
  var _isSorted   = false;

  if (features && typeof features == 'object') {
    _features = features;
  }

  this.insert = function (element) {
    _features.push(element);
    _isSorted = false;
  }

  this.add = function (array) {
    _features.concat(array);
    _isSorted = false;
  }

  this.sort = function (force) {
    if (_isSorted && !force) return;

    _features.sort(function (a, b) { return a.start - b.start });

    _features.every(function(element, index){
      element.index = index;
      return true;
    })

    // Shallow copy of the features array, to be sorted by feature ends
    _featuresSortedByEnds = _features.slice();
    _featuresSortedByEnds.sort(function (a, b) { return a.end - b.end });

    _isSorted = true;
  }

  this.bruteForceSearch = function (bounds) {
    var features = new Array();
    var a = bounds.x;
    var b = a + bounds.w;

    for (var i = 0; i < _features.length; i++) {
      if (_features[i].start < b && _features[i].end > a) {
        features.push(_features[i]);
      }
    }
    return features;
  }

  this.binarySearch = function (bounds) {
    if (!_isSorted) this.sort();

    var a = bounds.x;
    var b = a + bounds.w;

    var iA = this.findFirstEndingAfterX(a);
    var iB = this.findLastStartingBeforeX(b);

    if (_features[iA].start < b && _features[iA].end > a) {
      return _features.slice(iA, iB + 1);
    } else {
      return [];
    }
  }

  /* search for nearest element to the left of x within indexes iStart, iEnd
   */
  this.findLastStartingBeforeX = function (x, iStart, iEnd) {
    if (!_isSorted) this.sort();

    // Check last element
    if (_featuresSortedByEnds[_featuresSortedByEnds.length-1].end < x) 
      return _featuresSortedByEnds[_featuresSortedByEnds.length-1].index;

    if (iStart === undefined) iStart = 0;
    if (iEnd   === undefined) iEnd   = _features.length - 1;
    var iMiddle = Math.floor((iEnd+iStart)/2);

    if (iStart == iMiddle) {
      return iStart;
    } else if (_features[iMiddle].start < x) {
      return this.findLastStartingBeforeX(x, iMiddle, iEnd);
    } else if (_features[iMiddle].start >= x) {
      return this.findLastStartingBeforeX(x, iStart, iMiddle);
    }
  }

  this.findFirstEndingAfterX = function (x, iStart, iEnd) {
    if (!_isSorted) this.sort();

    // Check first element
    if (_featuresSortedByEnds[0].end > x) 
      return _featuresSortedByEnds[0].index;

    if (iStart === undefined) iStart = 0;
    if (iEnd   === undefined) iEnd   = _featuresSortedByEnds.length - 1;
    var iMiddle = Math.ceil((iEnd+iStart)/2);

    if (iEnd == iMiddle) {
      // Return real index (position) in the original array
      return _featuresSortedByEnds[iEnd].index;
    } else if (_featuresSortedByEnds[iMiddle].end < x) {
      return this.findFirstEndingAfterX(x, iMiddle, iEnd);
    } else if (_featuresSortedByEnds[iMiddle].end >= x) {
      return this.findFirstEndingAfterX(x, iStart, iMiddle);
    }
  }

  this.search = function (bounds) {
    if (!_features.length) return [];
    
    //return this.bruteForceSearch(bounds);
    return this.binarySearch(bounds);
  }

  this.getElement = function (i) {
    return _features[i];
  }
}




var grch37 = {
  "1": {
    "size": 249250621,
    "bands": [
      {
        "id": "p11.1",
        "start": 121500001,
        "end": 125000000,
        "type": "acen"
      },
      {
        "id": "p11.2",
        "start": 120600001,
        "end": 121500000,
        "type": "gneg"
      },
      {
        "id": "p12",
        "start": 117800001,
        "end": 120600000,
        "type": "gpos50"
      },
      {
        "id": "p13.1",
        "start": 116100001,
        "end": 117800000,
        "type": "gneg"
      },
      {
        "id": "p13.2",
        "start": 111800001,
        "end": 116100000,
        "type": "gpos50"
      },
      {
        "id": "p13.3",
        "start": 107200001,
        "end": 111800000,
        "type": "gneg"
      },
      {
        "id": "p21.1",
        "start": 102200001,
        "end": 107200000,
        "type": "gpos100"
      },
      {
        "id": "p21.2",
        "start": 99700001,
        "end": 102200000,
        "type": "gneg"
      },
      {
        "id": "p21.3",
        "start": 94700001,
        "end": 99700000,
        "type": "gpos75"
      },
      {
        "id": "p22.1",
        "start": 92000001,
        "end": 94700000,
        "type": "gneg"
      },
      {
        "id": "p22.2",
        "start": 88400001,
        "end": 92000000,
        "type": "gpos75"
      },
      {
        "id": "p22.3",
        "start": 84900001,
        "end": 88400000,
        "type": "gneg"
      },
      {
        "id": "p31.1",
        "start": 69700001,
        "end": 84900000,
        "type": "gpos100"
      },
      {
        "id": "p31.2",
        "start": 68900001,
        "end": 69700000,
        "type": "gneg"
      },
      {
        "id": "p31.3",
        "start": 61300001,
        "end": 68900000,
        "type": "gpos50"
      },
      {
        "id": "p32.1",
        "start": 59000001,
        "end": 61300000,
        "type": "gneg"
      },
      {
        "id": "p32.2",
        "start": 56100001,
        "end": 59000000,
        "type": "gpos50"
      },
      {
        "id": "p32.3",
        "start": 50700001,
        "end": 56100000,
        "type": "gneg"
      },
      {
        "id": "p33",
        "start": 46800001,
        "end": 50700000,
        "type": "gpos75"
      },
      {
        "id": "p34.1",
        "start": 44100001,
        "end": 46800000,
        "type": "gneg"
      },
      {
        "id": "p34.2",
        "start": 40100001,
        "end": 44100000,
        "type": "gpos25"
      },
      {
        "id": "p34.3",
        "start": 34600001,
        "end": 40100000,
        "type": "gneg"
      },
      {
        "id": "p35.1",
        "start": 32400001,
        "end": 34600000,
        "type": "gpos25"
      },
      {
        "id": "p35.2",
        "start": 30200001,
        "end": 32400000,
        "type": "gneg"
      },
      {
        "id": "p35.3",
        "start": 28000001,
        "end": 30200000,
        "type": "gpos25"
      },
      {
        "id": "p36.11",
        "start": 23900001,
        "end": 28000000,
        "type": "gneg"
      },
      {
        "id": "p36.12",
        "start": 20400001,
        "end": 23900000,
        "type": "gpos25"
      },
      {
        "id": "p36.13",
        "start": 16200001,
        "end": 20400000,
        "type": "gneg"
      },
      {
        "id": "p36.21",
        "start": 12700001,
        "end": 16200000,
        "type": "gpos50"
      },
      {
        "id": "p36.22",
        "start": 9200001,
        "end": 12700000,
        "type": "gneg"
      },
      {
        "id": "p36.23",
        "start": 7200001,
        "end": 9200000,
        "type": "gpos25"
      },
      {
        "id": "p36.31",
        "start": 5400001,
        "end": 7200000,
        "type": "gneg"
      },
      {
        "id": "p36.32",
        "start": 2300001,
        "end": 5400000,
        "type": "gpos25"
      },
      {
        "id": "p36.33",
        "start": 1,
        "end": 2300000,
        "type": "gneg"
      },
      {
        "id": "q11",
        "start": 125000001,
        "end": 128900000,
        "type": "acen"
      },
      {
        "id": "q12",
        "start": 128900001,
        "end": 142600000,
        "type": "gvar"
      },
      {
        "id": "q21.1",
        "start": 142600001,
        "end": 147000000,
        "type": "gneg"
      },
      {
        "id": "q21.2",
        "start": 147000001,
        "end": 150300000,
        "type": "gpos50"
      },
      {
        "id": "q21.3",
        "start": 150300001,
        "end": 155000000,
        "type": "gneg"
      },
      {
        "id": "q22",
        "start": 155000001,
        "end": 156500000,
        "type": "gpos50"
      },
      {
        "id": "q23.1",
        "start": 156500001,
        "end": 159100000,
        "type": "gneg"
      },
      {
        "id": "q23.2",
        "start": 159100001,
        "end": 160500000,
        "type": "gpos50"
      },
      {
        "id": "q23.3",
        "start": 160500001,
        "end": 165500000,
        "type": "gneg"
      },
      {
        "id": "q24.1",
        "start": 165500001,
        "end": 167200000,
        "type": "gpos50"
      },
      {
        "id": "q24.2",
        "start": 167200001,
        "end": 170900000,
        "type": "gneg"
      },
      {
        "id": "q24.3",
        "start": 170900001,
        "end": 172900000,
        "type": "gpos75"
      },
      {
        "id": "q25.1",
        "start": 172900001,
        "end": 176000000,
        "type": "gneg"
      },
      {
        "id": "q25.2",
        "start": 176000001,
        "end": 180300000,
        "type": "gpos50"
      },
      {
        "id": "q25.3",
        "start": 180300001,
        "end": 185800000,
        "type": "gneg"
      },
      {
        "id": "q31.1",
        "start": 185800001,
        "end": 190800000,
        "type": "gpos100"
      },
      {
        "id": "q31.2",
        "start": 190800001,
        "end": 193800000,
        "type": "gneg"
      },
      {
        "id": "q31.3",
        "start": 193800001,
        "end": 198700000,
        "type": "gpos100"
      },
      {
        "id": "q32.1",
        "start": 198700001,
        "end": 207200000,
        "type": "gneg"
      },
      {
        "id": "q32.2",
        "start": 207200001,
        "end": 211500000,
        "type": "gpos25"
      },
      {
        "id": "q32.3",
        "start": 211500001,
        "end": 214500000,
        "type": "gneg"
      },
      {
        "id": "q41",
        "start": 214500001,
        "end": 224100000,
        "type": "gpos100"
      },
      {
        "id": "q42.11",
        "start": 224100001,
        "end": 224600000,
        "type": "gneg"
      },
      {
        "id": "q42.12",
        "start": 224600001,
        "end": 227000000,
        "type": "gpos25"
      },
      {
        "id": "q42.13",
        "start": 227000001,
        "end": 230700000,
        "type": "gneg"
      },
      {
        "id": "q42.2",
        "start": 230700001,
        "end": 234700000,
        "type": "gpos50"
      },
      {
        "id": "q42.3",
        "start": 234700001,
        "end": 236600000,
        "type": "gneg"
      },
      {
        "id": "q43",
        "start": 236600001,
        "end": 243700000,
        "type": "gpos75"
      },
      {
        "id": "q44",
        "start": 243700001,
        "end": 249250621,
        "type": "gneg"
      }
    ]
  },
  "2": {
    "size": 243199373,
    "bands": [
      {
        "id": "p11.1",
        "start": 90500001,
        "end": 93300000,
        "type": "acen"
      },
      {
        "id": "p11.2",
        "start": 83300001,
        "end": 90500000,
        "type": "gneg"
      },
      {
        "id": "p12",
        "start": 75000001,
        "end": 83300000,
        "type": "gpos100"
      },
      {
        "id": "p13.1",
        "start": 73500001,
        "end": 75000000,
        "type": "gneg"
      },
      {
        "id": "p13.2",
        "start": 71500001,
        "end": 73500000,
        "type": "gpos50"
      },
      {
        "id": "p13.3",
        "start": 68600001,
        "end": 71500000,
        "type": "gneg"
      },
      {
        "id": "p14",
        "start": 64100001,
        "end": 68600000,
        "type": "gpos50"
      },
      {
        "id": "p15",
        "start": 61300001,
        "end": 64100000,
        "type": "gneg"
      },
      {
        "id": "p16.1",
        "start": 55000001,
        "end": 61300000,
        "type": "gpos100"
      },
      {
        "id": "p16.2",
        "start": 52900001,
        "end": 55000000,
        "type": "gneg"
      },
      {
        "id": "p16.3",
        "start": 47800001,
        "end": 52900000,
        "type": "gpos100"
      },
      {
        "id": "p21",
        "start": 41800001,
        "end": 47800000,
        "type": "gneg"
      },
      {
        "id": "p22.1",
        "start": 38600001,
        "end": 41800000,
        "type": "gpos50"
      },
      {
        "id": "p22.2",
        "start": 36600001,
        "end": 38600000,
        "type": "gneg"
      },
      {
        "id": "p22.3",
        "start": 32100001,
        "end": 36600000,
        "type": "gpos75"
      },
      {
        "id": "p23.1",
        "start": 30000001,
        "end": 32100000,
        "type": "gneg"
      },
      {
        "id": "p23.2",
        "start": 27900001,
        "end": 30000000,
        "type": "gpos25"
      },
      {
        "id": "p23.3",
        "start": 24000001,
        "end": 27900000,
        "type": "gneg"
      },
      {
        "id": "p24.1",
        "start": 19200001,
        "end": 24000000,
        "type": "gpos75"
      },
      {
        "id": "p24.2",
        "start": 16700001,
        "end": 19200000,
        "type": "gneg"
      },
      {
        "id": "p24.3",
        "start": 12200001,
        "end": 16700000,
        "type": "gpos75"
      },
      {
        "id": "p25.1",
        "start": 7100001,
        "end": 12200000,
        "type": "gneg"
      },
      {
        "id": "p25.2",
        "start": 4400001,
        "end": 7100000,
        "type": "gpos50"
      },
      {
        "id": "p25.3",
        "start": 1,
        "end": 4400000,
        "type": "gneg"
      },
      {
        "id": "q11.1",
        "start": 93300001,
        "end": 96800000,
        "type": "acen"
      },
      {
        "id": "q11.2",
        "start": 96800001,
        "end": 102700000,
        "type": "gneg"
      },
      {
        "id": "q12.1",
        "start": 102700001,
        "end": 106000000,
        "type": "gpos50"
      },
      {
        "id": "q12.2",
        "start": 106000001,
        "end": 107500000,
        "type": "gneg"
      },
      {
        "id": "q12.3",
        "start": 107500001,
        "end": 110200000,
        "type": "gpos25"
      },
      {
        "id": "q13",
        "start": 110200001,
        "end": 114400000,
        "type": "gneg"
      },
      {
        "id": "q14.1",
        "start": 114400001,
        "end": 118800000,
        "type": "gpos50"
      },
      {
        "id": "q14.2",
        "start": 118800001,
        "end": 122400000,
        "type": "gneg"
      },
      {
        "id": "q14.3",
        "start": 122400001,
        "end": 129900000,
        "type": "gpos50"
      },
      {
        "id": "q21.1",
        "start": 129900001,
        "end": 132500000,
        "type": "gneg"
      },
      {
        "id": "q21.2",
        "start": 132500001,
        "end": 135100000,
        "type": "gpos25"
      },
      {
        "id": "q21.3",
        "start": 135100001,
        "end": 136800000,
        "type": "gneg"
      },
      {
        "id": "q22.1",
        "start": 136800001,
        "end": 142200000,
        "type": "gpos100"
      },
      {
        "id": "q22.2",
        "start": 142200001,
        "end": 144100000,
        "type": "gneg"
      },
      {
        "id": "q22.3",
        "start": 144100001,
        "end": 148700000,
        "type": "gpos100"
      },
      {
        "id": "q23.1",
        "start": 148700001,
        "end": 149900000,
        "type": "gneg"
      },
      {
        "id": "q23.2",
        "start": 149900001,
        "end": 150500000,
        "type": "gpos25"
      },
      {
        "id": "q23.3",
        "start": 150500001,
        "end": 154900000,
        "type": "gneg"
      },
      {
        "id": "q24.1",
        "start": 154900001,
        "end": 159800000,
        "type": "gpos75"
      },
      {
        "id": "q24.2",
        "start": 159800001,
        "end": 163700000,
        "type": "gneg"
      },
      {
        "id": "q24.3",
        "start": 163700001,
        "end": 169700000,
        "type": "gpos75"
      },
      {
        "id": "q31.1",
        "start": 169700001,
        "end": 178000000,
        "type": "gneg"
      },
      {
        "id": "q31.2",
        "start": 178000001,
        "end": 180600000,
        "type": "gpos50"
      },
      {
        "id": "q31.3",
        "start": 180600001,
        "end": 183000000,
        "type": "gneg"
      },
      {
        "id": "q32.1",
        "start": 183000001,
        "end": 189400000,
        "type": "gpos75"
      },
      {
        "id": "q32.2",
        "start": 189400001,
        "end": 191900000,
        "type": "gneg"
      },
      {
        "id": "q32.3",
        "start": 191900001,
        "end": 197400000,
        "type": "gpos75"
      },
      {
        "id": "q33.1",
        "start": 197400001,
        "end": 203300000,
        "type": "gneg"
      },
      {
        "id": "q33.2",
        "start": 203300001,
        "end": 204900000,
        "type": "gpos50"
      },
      {
        "id": "q33.3",
        "start": 204900001,
        "end": 209000000,
        "type": "gneg"
      },
      {
        "id": "q34",
        "start": 209000001,
        "end": 215300000,
        "type": "gpos100"
      },
      {
        "id": "q35",
        "start": 215300001,
        "end": 221500000,
        "type": "gneg"
      },
      {
        "id": "q36.1",
        "start": 221500001,
        "end": 225200000,
        "type": "gpos75"
      },
      {
        "id": "q36.2",
        "start": 225200001,
        "end": 226100000,
        "type": "gneg"
      },
      {
        "id": "q36.3",
        "start": 226100001,
        "end": 231000000,
        "type": "gpos100"
      },
      {
        "id": "q37.1",
        "start": 231000001,
        "end": 235600000,
        "type": "gneg"
      },
      {
        "id": "q37.2",
        "start": 235600001,
        "end": 237300000,
        "type": "gpos50"
      },
      {
        "id": "q37.3",
        "start": 237300001,
        "end": 243199373,
        "type": "gneg"
      }
    ]
  },
  "3": {
    "size": 198022430,
    "bands": [
      {
        "id": "p11.1",
        "start": 87900001,
        "end": 91000000,
        "type": "acen"
      },
      {
        "id": "p11.2",
        "start": 87200001,
        "end": 87900000,
        "type": "gneg"
      },
      {
        "id": "p12.1",
        "start": 83500001,
        "end": 87200000,
        "type": "gpos75"
      },
      {
        "id": "p12.2",
        "start": 79800001,
        "end": 83500000,
        "type": "gneg"
      },
      {
        "id": "p12.3",
        "start": 74200001,
        "end": 79800000,
        "type": "gpos75"
      },
      {
        "id": "p13",
        "start": 69800001,
        "end": 74200000,
        "type": "gneg"
      },
      {
        "id": "p14.1",
        "start": 63700001,
        "end": 69800000,
        "type": "gpos50"
      },
      {
        "id": "p14.2",
        "start": 58600001,
        "end": 63700000,
        "type": "gneg"
      },
      {
        "id": "p14.3",
        "start": 54400001,
        "end": 58600000,
        "type": "gpos50"
      },
      {
        "id": "p21.1",
        "start": 52300001,
        "end": 54400000,
        "type": "gneg"
      },
      {
        "id": "p21.2",
        "start": 50600001,
        "end": 52300000,
        "type": "gpos25"
      },
      {
        "id": "p21.31",
        "start": 44200001,
        "end": 50600000,
        "type": "gneg"
      },
      {
        "id": "p21.32",
        "start": 44100001,
        "end": 44200000,
        "type": "gpos50"
      },
      {
        "id": "p21.33",
        "start": 43700001,
        "end": 44100000,
        "type": "gneg"
      },
      {
        "id": "p22.1",
        "start": 39400001,
        "end": 43700000,
        "type": "gpos75"
      },
      {
        "id": "p22.2",
        "start": 36500001,
        "end": 39400000,
        "type": "gneg"
      },
      {
        "id": "p22.3",
        "start": 32100001,
        "end": 36500000,
        "type": "gpos50"
      },
      {
        "id": "p23",
        "start": 30900001,
        "end": 32100000,
        "type": "gneg"
      },
      {
        "id": "p24.1",
        "start": 26400001,
        "end": 30900000,
        "type": "gpos75"
      },
      {
        "id": "p24.2",
        "start": 23900001,
        "end": 26400000,
        "type": "gneg"
      },
      {
        "id": "p24.3",
        "start": 16400001,
        "end": 23900000,
        "type": "gpos100"
      },
      {
        "id": "p25.1",
        "start": 13300001,
        "end": 16400000,
        "type": "gneg"
      },
      {
        "id": "p25.2",
        "start": 11800001,
        "end": 13300000,
        "type": "gpos25"
      },
      {
        "id": "p25.3",
        "start": 8700001,
        "end": 11800000,
        "type": "gneg"
      },
      {
        "id": "p26.1",
        "start": 4000001,
        "end": 8700000,
        "type": "gpos50"
      },
      {
        "id": "p26.2",
        "start": 2800001,
        "end": 4000000,
        "type": "gneg"
      },
      {
        "id": "p26.3",
        "start": 1,
        "end": 2800000,
        "type": "gpos50"
      },
      {
        "id": "q11.1",
        "start": 91000001,
        "end": 93900000,
        "type": "acen"
      },
      {
        "id": "q11.2",
        "start": 93900001,
        "end": 98300000,
        "type": "gvar"
      },
      {
        "id": "q12.1",
        "start": 98300001,
        "end": 100000000,
        "type": "gneg"
      },
      {
        "id": "q12.2",
        "start": 100000001,
        "end": 100900000,
        "type": "gpos25"
      },
      {
        "id": "q12.3",
        "start": 100900001,
        "end": 102800000,
        "type": "gneg"
      },
      {
        "id": "q13.11",
        "start": 102800001,
        "end": 106200000,
        "type": "gpos75"
      },
      {
        "id": "q13.12",
        "start": 106200001,
        "end": 107900000,
        "type": "gneg"
      },
      {
        "id": "q13.13",
        "start": 107900001,
        "end": 111300000,
        "type": "gpos50"
      },
      {
        "id": "q13.2",
        "start": 111300001,
        "end": 113500000,
        "type": "gneg"
      },
      {
        "id": "q13.31",
        "start": 113500001,
        "end": 117300000,
        "type": "gpos75"
      },
      {
        "id": "q13.32",
        "start": 117300001,
        "end": 119000000,
        "type": "gneg"
      },
      {
        "id": "q13.33",
        "start": 119000001,
        "end": 121900000,
        "type": "gpos75"
      },
      {
        "id": "q21.1",
        "start": 121900001,
        "end": 123800000,
        "type": "gneg"
      },
      {
        "id": "q21.2",
        "start": 123800001,
        "end": 125800000,
        "type": "gpos25"
      },
      {
        "id": "q21.3",
        "start": 125800001,
        "end": 129200000,
        "type": "gneg"
      },
      {
        "id": "q22.1",
        "start": 129200001,
        "end": 133700000,
        "type": "gpos25"
      },
      {
        "id": "q22.2",
        "start": 133700001,
        "end": 135700000,
        "type": "gneg"
      },
      {
        "id": "q22.3",
        "start": 135700001,
        "end": 138700000,
        "type": "gpos25"
      },
      {
        "id": "q23",
        "start": 138700001,
        "end": 142800000,
        "type": "gneg"
      },
      {
        "id": "q24",
        "start": 142800001,
        "end": 148900000,
        "type": "gpos100"
      },
      {
        "id": "q25.1",
        "start": 148900001,
        "end": 152100000,
        "type": "gneg"
      },
      {
        "id": "q25.2",
        "start": 152100001,
        "end": 155000000,
        "type": "gpos50"
      },
      {
        "id": "q25.31",
        "start": 155000001,
        "end": 157000000,
        "type": "gneg"
      },
      {
        "id": "q25.32",
        "start": 157000001,
        "end": 159000000,
        "type": "gpos50"
      },
      {
        "id": "q25.33",
        "start": 159000001,
        "end": 160700000,
        "type": "gneg"
      },
      {
        "id": "q26.1",
        "start": 160700001,
        "end": 167600000,
        "type": "gpos100"
      },
      {
        "id": "q26.2",
        "start": 167600001,
        "end": 170900000,
        "type": "gneg"
      },
      {
        "id": "q26.31",
        "start": 170900001,
        "end": 175700000,
        "type": "gpos75"
      },
      {
        "id": "q26.32",
        "start": 175700001,
        "end": 179000000,
        "type": "gneg"
      },
      {
        "id": "q26.33",
        "start": 179000001,
        "end": 182700000,
        "type": "gpos75"
      },
      {
        "id": "q27.1",
        "start": 182700001,
        "end": 184500000,
        "type": "gneg"
      },
      {
        "id": "q27.2",
        "start": 184500001,
        "end": 186000000,
        "type": "gpos25"
      },
      {
        "id": "q27.3",
        "start": 186000001,
        "end": 187900000,
        "type": "gneg"
      },
      {
        "id": "q28",
        "start": 187900001,
        "end": 192300000,
        "type": "gpos75"
      },
      {
        "id": "q29",
        "start": 192300001,
        "end": 198022430,
        "type": "gneg"
      }
    ]
  },
  "4": {
    "size": 191154276,
    "bands": [
      {
        "id": "p11",
        "start": 48200001,
        "end": 50400000,
        "type": "acen"
      },
      {
        "id": "p12",
        "start": 44600001,
        "end": 48200000,
        "type": "gneg"
      },
      {
        "id": "p13",
        "start": 41200001,
        "end": 44600000,
        "type": "gpos50"
      },
      {
        "id": "p14",
        "start": 35800001,
        "end": 41200000,
        "type": "gneg"
      },
      {
        "id": "p15.1",
        "start": 27700001,
        "end": 35800000,
        "type": "gpos100"
      },
      {
        "id": "p15.2",
        "start": 21300001,
        "end": 27700000,
        "type": "gneg"
      },
      {
        "id": "p15.31",
        "start": 17800001,
        "end": 21300000,
        "type": "gpos75"
      },
      {
        "id": "p15.32",
        "start": 15200001,
        "end": 17800000,
        "type": "gneg"
      },
      {
        "id": "p15.33",
        "start": 11300001,
        "end": 15200000,
        "type": "gpos50"
      },
      {
        "id": "p16.1",
        "start": 6000001,
        "end": 11300000,
        "type": "gneg"
      },
      {
        "id": "p16.2",
        "start": 4500001,
        "end": 6000000,
        "type": "gpos25"
      },
      {
        "id": "p16.3",
        "start": 1,
        "end": 4500000,
        "type": "gneg"
      },
      {
        "id": "q11",
        "start": 50400001,
        "end": 52700000,
        "type": "acen"
      },
      {
        "id": "q12",
        "start": 52700001,
        "end": 59500000,
        "type": "gneg"
      },
      {
        "id": "q13.1",
        "start": 59500001,
        "end": 66600000,
        "type": "gpos100"
      },
      {
        "id": "q13.2",
        "start": 66600001,
        "end": 70500000,
        "type": "gneg"
      },
      {
        "id": "q13.3",
        "start": 70500001,
        "end": 76300000,
        "type": "gpos75"
      },
      {
        "id": "q21.1",
        "start": 76300001,
        "end": 78900000,
        "type": "gneg"
      },
      {
        "id": "q21.21",
        "start": 78900001,
        "end": 82400000,
        "type": "gpos50"
      },
      {
        "id": "q21.22",
        "start": 82400001,
        "end": 84100000,
        "type": "gneg"
      },
      {
        "id": "q21.23",
        "start": 84100001,
        "end": 86900000,
        "type": "gpos25"
      },
      {
        "id": "q21.3",
        "start": 86900001,
        "end": 88000000,
        "type": "gneg"
      },
      {
        "id": "q22.1",
        "start": 88000001,
        "end": 93700000,
        "type": "gpos75"
      },
      {
        "id": "q22.2",
        "start": 93700001,
        "end": 95100000,
        "type": "gneg"
      },
      {
        "id": "q22.3",
        "start": 95100001,
        "end": 98800000,
        "type": "gpos75"
      },
      {
        "id": "q23",
        "start": 98800001,
        "end": 101100000,
        "type": "gneg"
      },
      {
        "id": "q24",
        "start": 101100001,
        "end": 107700000,
        "type": "gpos50"
      },
      {
        "id": "q25",
        "start": 107700001,
        "end": 114100000,
        "type": "gneg"
      },
      {
        "id": "q26",
        "start": 114100001,
        "end": 120800000,
        "type": "gpos75"
      },
      {
        "id": "q27",
        "start": 120800001,
        "end": 123800000,
        "type": "gneg"
      },
      {
        "id": "q28.1",
        "start": 123800001,
        "end": 128800000,
        "type": "gpos50"
      },
      {
        "id": "q28.2",
        "start": 128800001,
        "end": 131100000,
        "type": "gneg"
      },
      {
        "id": "q28.3",
        "start": 131100001,
        "end": 139500000,
        "type": "gpos100"
      },
      {
        "id": "q31.1",
        "start": 139500001,
        "end": 141500000,
        "type": "gneg"
      },
      {
        "id": "q31.21",
        "start": 141500001,
        "end": 146800000,
        "type": "gpos25"
      },
      {
        "id": "q31.22",
        "start": 146800001,
        "end": 148500000,
        "type": "gneg"
      },
      {
        "id": "q31.23",
        "start": 148500001,
        "end": 151100000,
        "type": "gpos25"
      },
      {
        "id": "q31.3",
        "start": 151100001,
        "end": 155600000,
        "type": "gneg"
      },
      {
        "id": "q32.1",
        "start": 155600001,
        "end": 161800000,
        "type": "gpos100"
      },
      {
        "id": "q32.2",
        "start": 161800001,
        "end": 164500000,
        "type": "gneg"
      },
      {
        "id": "q32.3",
        "start": 164500001,
        "end": 170100000,
        "type": "gpos100"
      },
      {
        "id": "q33",
        "start": 170100001,
        "end": 171900000,
        "type": "gneg"
      },
      {
        "id": "q34.1",
        "start": 171900001,
        "end": 176300000,
        "type": "gpos75"
      },
      {
        "id": "q34.2",
        "start": 176300001,
        "end": 177500000,
        "type": "gneg"
      },
      {
        "id": "q34.3",
        "start": 177500001,
        "end": 183200000,
        "type": "gpos100"
      },
      {
        "id": "q35.1",
        "start": 183200001,
        "end": 187100000,
        "type": "gneg"
      },
      {
        "id": "q35.2",
        "start": 187100001,
        "end": 191154276,
        "type": "gpos25"
      }
    ]
  },
  "5": {
    "size": 180915260,
    "bands": [
      {
        "id": "p11",
        "start": 46100001,
        "end": 48400000,
        "type": "acen"
      },
      {
        "id": "p12",
        "start": 42500001,
        "end": 46100000,
        "type": "gpos50"
      },
      {
        "id": "p13.1",
        "start": 38400001,
        "end": 42500000,
        "type": "gneg"
      },
      {
        "id": "p13.2",
        "start": 33800001,
        "end": 38400000,
        "type": "gpos25"
      },
      {
        "id": "p13.3",
        "start": 28900001,
        "end": 33800000,
        "type": "gneg"
      },
      {
        "id": "p14.1",
        "start": 24600001,
        "end": 28900000,
        "type": "gpos100"
      },
      {
        "id": "p14.2",
        "start": 23300001,
        "end": 24600000,
        "type": "gneg"
      },
      {
        "id": "p14.3",
        "start": 18400001,
        "end": 23300000,
        "type": "gpos100"
      },
      {
        "id": "p15.1",
        "start": 15000001,
        "end": 18400000,
        "type": "gneg"
      },
      {
        "id": "p15.2",
        "start": 9800001,
        "end": 15000000,
        "type": "gpos50"
      },
      {
        "id": "p15.31",
        "start": 6300001,
        "end": 9800000,
        "type": "gneg"
      },
      {
        "id": "p15.32",
        "start": 4500001,
        "end": 6300000,
        "type": "gpos25"
      },
      {
        "id": "p15.33",
        "start": 1,
        "end": 4500000,
        "type": "gneg"
      },
      {
        "id": "q11.1",
        "start": 48400001,
        "end": 50700000,
        "type": "acen"
      },
      {
        "id": "q11.2",
        "start": 50700001,
        "end": 58900000,
        "type": "gneg"
      },
      {
        "id": "q12.1",
        "start": 58900001,
        "end": 62900000,
        "type": "gpos75"
      },
      {
        "id": "q12.2",
        "start": 62900001,
        "end": 63200000,
        "type": "gneg"
      },
      {
        "id": "q12.3",
        "start": 63200001,
        "end": 66700000,
        "type": "gpos75"
      },
      {
        "id": "q13.1",
        "start": 66700001,
        "end": 68400000,
        "type": "gneg"
      },
      {
        "id": "q13.2",
        "start": 68400001,
        "end": 73300000,
        "type": "gpos50"
      },
      {
        "id": "q13.3",
        "start": 73300001,
        "end": 76900000,
        "type": "gneg"
      },
      {
        "id": "q14.1",
        "start": 76900001,
        "end": 81400000,
        "type": "gpos50"
      },
      {
        "id": "q14.2",
        "start": 81400001,
        "end": 82800000,
        "type": "gneg"
      },
      {
        "id": "q14.3",
        "start": 82800001,
        "end": 92300000,
        "type": "gpos100"
      },
      {
        "id": "q15",
        "start": 92300001,
        "end": 98200000,
        "type": "gneg"
      },
      {
        "id": "q21.1",
        "start": 98200001,
        "end": 102800000,
        "type": "gpos100"
      },
      {
        "id": "q21.2",
        "start": 102800001,
        "end": 104500000,
        "type": "gneg"
      },
      {
        "id": "q21.3",
        "start": 104500001,
        "end": 109600000,
        "type": "gpos100"
      },
      {
        "id": "q22.1",
        "start": 109600001,
        "end": 111500000,
        "type": "gneg"
      },
      {
        "id": "q22.2",
        "start": 111500001,
        "end": 113100000,
        "type": "gpos50"
      },
      {
        "id": "q22.3",
        "start": 113100001,
        "end": 115200000,
        "type": "gneg"
      },
      {
        "id": "q23.1",
        "start": 115200001,
        "end": 121400000,
        "type": "gpos100"
      },
      {
        "id": "q23.2",
        "start": 121400001,
        "end": 127300000,
        "type": "gneg"
      },
      {
        "id": "q23.3",
        "start": 127300001,
        "end": 130600000,
        "type": "gpos100"
      },
      {
        "id": "q31.1",
        "start": 130600001,
        "end": 136200000,
        "type": "gneg"
      },
      {
        "id": "q31.2",
        "start": 136200001,
        "end": 139500000,
        "type": "gpos25"
      },
      {
        "id": "q31.3",
        "start": 139500001,
        "end": 144500000,
        "type": "gneg"
      },
      {
        "id": "q32",
        "start": 144500001,
        "end": 149800000,
        "type": "gpos75"
      },
      {
        "id": "q33.1",
        "start": 149800001,
        "end": 152700000,
        "type": "gneg"
      },
      {
        "id": "q33.2",
        "start": 152700001,
        "end": 155700000,
        "type": "gpos50"
      },
      {
        "id": "q33.3",
        "start": 155700001,
        "end": 159900000,
        "type": "gneg"
      },
      {
        "id": "q34",
        "start": 159900001,
        "end": 168500000,
        "type": "gpos100"
      },
      {
        "id": "q35.1",
        "start": 168500001,
        "end": 172800000,
        "type": "gneg"
      },
      {
        "id": "q35.2",
        "start": 172800001,
        "end": 176600000,
        "type": "gpos25"
      },
      {
        "id": "q35.3",
        "start": 176600001,
        "end": 180915260,
        "type": "gneg"
      }
    ]
  },
  "6": {
    "size": 171115067,
    "bands": [
      {
        "id": "p11.1",
        "start": 58700001,
        "end": 61000000,
        "type": "acen"
      },
      {
        "id": "p11.2",
        "start": 57000001,
        "end": 58700000,
        "type": "gneg"
      },
      {
        "id": "p12.1",
        "start": 52900001,
        "end": 57000000,
        "type": "gpos100"
      },
      {
        "id": "p12.2",
        "start": 51800001,
        "end": 52900000,
        "type": "gneg"
      },
      {
        "id": "p12.3",
        "start": 46200001,
        "end": 51800000,
        "type": "gpos100"
      },
      {
        "id": "p21.1",
        "start": 40500001,
        "end": 46200000,
        "type": "gneg"
      },
      {
        "id": "p21.2",
        "start": 36600001,
        "end": 40500000,
        "type": "gpos25"
      },
      {
        "id": "p21.31",
        "start": 33500001,
        "end": 36600000,
        "type": "gneg"
      },
      {
        "id": "p21.32",
        "start": 32100001,
        "end": 33500000,
        "type": "gpos25"
      },
      {
        "id": "p21.33",
        "start": 30400001,
        "end": 32100000,
        "type": "gneg"
      },
      {
        "id": "p22.1",
        "start": 27000001,
        "end": 30400000,
        "type": "gpos50"
      },
      {
        "id": "p22.2",
        "start": 25200001,
        "end": 27000000,
        "type": "gneg"
      },
      {
        "id": "p22.3",
        "start": 15200001,
        "end": 25200000,
        "type": "gpos75"
      },
      {
        "id": "p23",
        "start": 13400001,
        "end": 15200000,
        "type": "gneg"
      },
      {
        "id": "p24.1",
        "start": 11600001,
        "end": 13400000,
        "type": "gpos25"
      },
      {
        "id": "p24.2",
        "start": 10600001,
        "end": 11600000,
        "type": "gneg"
      },
      {
        "id": "p24.3",
        "start": 7100001,
        "end": 10600000,
        "type": "gpos50"
      },
      {
        "id": "p25.1",
        "start": 4200001,
        "end": 7100000,
        "type": "gneg"
      },
      {
        "id": "p25.2",
        "start": 2300001,
        "end": 4200000,
        "type": "gpos25"
      },
      {
        "id": "p25.3",
        "start": 1,
        "end": 2300000,
        "type": "gneg"
      },
      {
        "id": "q11.1",
        "start": 61000001,
        "end": 63300000,
        "type": "acen"
      },
      {
        "id": "q11.2",
        "start": 63300001,
        "end": 63400000,
        "type": "gneg"
      },
      {
        "id": "q12",
        "start": 63400001,
        "end": 70000000,
        "type": "gpos100"
      },
      {
        "id": "q13",
        "start": 70000001,
        "end": 75900000,
        "type": "gneg"
      },
      {
        "id": "q14.1",
        "start": 75900001,
        "end": 83900000,
        "type": "gpos50"
      },
      {
        "id": "q14.2",
        "start": 83900001,
        "end": 84900000,
        "type": "gneg"
      },
      {
        "id": "q14.3",
        "start": 84900001,
        "end": 88000000,
        "type": "gpos50"
      },
      {
        "id": "q15",
        "start": 88000001,
        "end": 93100000,
        "type": "gneg"
      },
      {
        "id": "q16.1",
        "start": 93100001,
        "end": 99500000,
        "type": "gpos100"
      },
      {
        "id": "q16.2",
        "start": 99500001,
        "end": 100600000,
        "type": "gneg"
      },
      {
        "id": "q16.3",
        "start": 100600001,
        "end": 105500000,
        "type": "gpos100"
      },
      {
        "id": "q21",
        "start": 105500001,
        "end": 114600000,
        "type": "gneg"
      },
      {
        "id": "q22.1",
        "start": 114600001,
        "end": 118300000,
        "type": "gpos75"
      },
      {
        "id": "q22.2",
        "start": 118300001,
        "end": 118500000,
        "type": "gneg"
      },
      {
        "id": "q22.31",
        "start": 118500001,
        "end": 126100000,
        "type": "gpos100"
      },
      {
        "id": "q22.32",
        "start": 126100001,
        "end": 127100000,
        "type": "gneg"
      },
      {
        "id": "q22.33",
        "start": 127100001,
        "end": 130300000,
        "type": "gpos75"
      },
      {
        "id": "q23.1",
        "start": 130300001,
        "end": 131200000,
        "type": "gneg"
      },
      {
        "id": "q23.2",
        "start": 131200001,
        "end": 135200000,
        "type": "gpos50"
      },
      {
        "id": "q23.3",
        "start": 135200001,
        "end": 139000000,
        "type": "gneg"
      },
      {
        "id": "q24.1",
        "start": 139000001,
        "end": 142800000,
        "type": "gpos75"
      },
      {
        "id": "q24.2",
        "start": 142800001,
        "end": 145600000,
        "type": "gneg"
      },
      {
        "id": "q24.3",
        "start": 145600001,
        "end": 149000000,
        "type": "gpos75"
      },
      {
        "id": "q25.1",
        "start": 149000001,
        "end": 152500000,
        "type": "gneg"
      },
      {
        "id": "q25.2",
        "start": 152500001,
        "end": 155500000,
        "type": "gpos50"
      },
      {
        "id": "q25.3",
        "start": 155500001,
        "end": 161000000,
        "type": "gneg"
      },
      {
        "id": "q26",
        "start": 161000001,
        "end": 164500000,
        "type": "gpos50"
      },
      {
        "id": "q27",
        "start": 164500001,
        "end": 171115067,
        "type": "gneg"
      }
    ]
  },
  "7": {
    "size": 159138663,
    "bands": [
      {
        "id": "p11.1",
        "start": 58000001,
        "end": 59900000,
        "type": "acen"
      },
      {
        "id": "p11.2",
        "start": 54000001,
        "end": 58000000,
        "type": "gneg"
      },
      {
        "id": "p12.1",
        "start": 50500001,
        "end": 54000000,
        "type": "gpos75"
      },
      {
        "id": "p12.2",
        "start": 49000001,
        "end": 50500000,
        "type": "gneg"
      },
      {
        "id": "p12.3",
        "start": 45400001,
        "end": 49000000,
        "type": "gpos75"
      },
      {
        "id": "p13",
        "start": 43300001,
        "end": 45400000,
        "type": "gneg"
      },
      {
        "id": "p14.1",
        "start": 37200001,
        "end": 43300000,
        "type": "gpos75"
      },
      {
        "id": "p14.2",
        "start": 35000001,
        "end": 37200000,
        "type": "gneg"
      },
      {
        "id": "p14.3",
        "start": 28800001,
        "end": 35000000,
        "type": "gpos75"
      },
      {
        "id": "p15.1",
        "start": 28000001,
        "end": 28800000,
        "type": "gneg"
      },
      {
        "id": "p15.2",
        "start": 25500001,
        "end": 28000000,
        "type": "gpos50"
      },
      {
        "id": "p15.3",
        "start": 20900001,
        "end": 25500000,
        "type": "gneg"
      },
      {
        "id": "p21.1",
        "start": 16500001,
        "end": 20900000,
        "type": "gpos100"
      },
      {
        "id": "p21.2",
        "start": 13800001,
        "end": 16500000,
        "type": "gneg"
      },
      {
        "id": "p21.3",
        "start": 7300001,
        "end": 13800000,
        "type": "gpos100"
      },
      {
        "id": "p22.1",
        "start": 4500001,
        "end": 7300000,
        "type": "gneg"
      },
      {
        "id": "p22.2",
        "start": 2800001,
        "end": 4500000,
        "type": "gpos25"
      },
      {
        "id": "p22.3",
        "start": 1,
        "end": 2800000,
        "type": "gneg"
      },
      {
        "id": "q11.1",
        "start": 59900001,
        "end": 61700000,
        "type": "acen"
      },
      {
        "id": "q11.21",
        "start": 61700001,
        "end": 67000000,
        "type": "gneg"
      },
      {
        "id": "q11.22",
        "start": 67000001,
        "end": 72200000,
        "type": "gpos50"
      },
      {
        "id": "q11.23",
        "start": 72200001,
        "end": 77500000,
        "type": "gneg"
      },
      {
        "id": "q21.11",
        "start": 77500001,
        "end": 86400000,
        "type": "gpos100"
      },
      {
        "id": "q21.12",
        "start": 86400001,
        "end": 88200000,
        "type": "gneg"
      },
      {
        "id": "q21.13",
        "start": 88200001,
        "end": 91100000,
        "type": "gpos75"
      },
      {
        "id": "q21.2",
        "start": 91100001,
        "end": 92800000,
        "type": "gneg"
      },
      {
        "id": "q21.3",
        "start": 92800001,
        "end": 98000000,
        "type": "gpos75"
      },
      {
        "id": "q22.1",
        "start": 98000001,
        "end": 103800000,
        "type": "gneg"
      },
      {
        "id": "q22.2",
        "start": 103800001,
        "end": 104500000,
        "type": "gpos50"
      },
      {
        "id": "q22.3",
        "start": 104500001,
        "end": 107400000,
        "type": "gneg"
      },
      {
        "id": "q31.1",
        "start": 107400001,
        "end": 114600000,
        "type": "gpos75"
      },
      {
        "id": "q31.2",
        "start": 114600001,
        "end": 117400000,
        "type": "gneg"
      },
      {
        "id": "q31.31",
        "start": 117400001,
        "end": 121100000,
        "type": "gpos75"
      },
      {
        "id": "q31.32",
        "start": 121100001,
        "end": 123800000,
        "type": "gneg"
      },
      {
        "id": "q31.33",
        "start": 123800001,
        "end": 127100000,
        "type": "gpos75"
      },
      {
        "id": "q32.1",
        "start": 127100001,
        "end": 129200000,
        "type": "gneg"
      },
      {
        "id": "q32.2",
        "start": 129200001,
        "end": 130400000,
        "type": "gpos25"
      },
      {
        "id": "q32.3",
        "start": 130400001,
        "end": 132600000,
        "type": "gneg"
      },
      {
        "id": "q33",
        "start": 132600001,
        "end": 138200000,
        "type": "gpos50"
      },
      {
        "id": "q34",
        "start": 138200001,
        "end": 143100000,
        "type": "gneg"
      },
      {
        "id": "q35",
        "start": 143100001,
        "end": 147900000,
        "type": "gpos75"
      },
      {
        "id": "q36.1",
        "start": 147900001,
        "end": 152600000,
        "type": "gneg"
      },
      {
        "id": "q36.2",
        "start": 152600001,
        "end": 155100000,
        "type": "gpos25"
      },
      {
        "id": "q36.3",
        "start": 155100001,
        "end": 159138663,
        "type": "gneg"
      }
    ]
  },
  "8": {
    "size": 146364022,
    "bands": [
      {
        "id": "p11.1",
        "start": 43100001,
        "end": 45600000,
        "type": "acen"
      },
      {
        "id": "p11.21",
        "start": 39700001,
        "end": 43100000,
        "type": "gneg"
      },
      {
        "id": "p11.22",
        "start": 38300001,
        "end": 39700000,
        "type": "gpos25"
      },
      {
        "id": "p11.23",
        "start": 36500001,
        "end": 38300000,
        "type": "gneg"
      },
      {
        "id": "p12",
        "start": 28800001,
        "end": 36500000,
        "type": "gpos75"
      },
      {
        "id": "p21.1",
        "start": 27400001,
        "end": 28800000,
        "type": "gneg"
      },
      {
        "id": "p21.2",
        "start": 23300001,
        "end": 27400000,
        "type": "gpos50"
      },
      {
        "id": "p21.3",
        "start": 19000001,
        "end": 23300000,
        "type": "gneg"
      },
      {
        "id": "p22",
        "start": 12700001,
        "end": 19000000,
        "type": "gpos100"
      },
      {
        "id": "p23.1",
        "start": 6200001,
        "end": 12700000,
        "type": "gneg"
      },
      {
        "id": "p23.2",
        "start": 2200001,
        "end": 6200000,
        "type": "gpos75"
      },
      {
        "id": "p23.3",
        "start": 1,
        "end": 2200000,
        "type": "gneg"
      },
      {
        "id": "q11.1",
        "start": 45600001,
        "end": 48100000,
        "type": "acen"
      },
      {
        "id": "q11.21",
        "start": 48100001,
        "end": 52200000,
        "type": "gneg"
      },
      {
        "id": "q11.22",
        "start": 52200001,
        "end": 52600000,
        "type": "gpos75"
      },
      {
        "id": "q11.23",
        "start": 52600001,
        "end": 55500000,
        "type": "gneg"
      },
      {
        "id": "q12.1",
        "start": 55500001,
        "end": 61600000,
        "type": "gpos50"
      },
      {
        "id": "q12.2",
        "start": 61600001,
        "end": 62200000,
        "type": "gneg"
      },
      {
        "id": "q12.3",
        "start": 62200001,
        "end": 66000000,
        "type": "gpos50"
      },
      {
        "id": "q13.1",
        "start": 66000001,
        "end": 68000000,
        "type": "gneg"
      },
      {
        "id": "q13.2",
        "start": 68000001,
        "end": 70500000,
        "type": "gpos50"
      },
      {
        "id": "q13.3",
        "start": 70500001,
        "end": 73900000,
        "type": "gneg"
      },
      {
        "id": "q21.11",
        "start": 73900001,
        "end": 78300000,
        "type": "gpos100"
      },
      {
        "id": "q21.12",
        "start": 78300001,
        "end": 80100000,
        "type": "gneg"
      },
      {
        "id": "q21.13",
        "start": 80100001,
        "end": 84600000,
        "type": "gpos75"
      },
      {
        "id": "q21.2",
        "start": 84600001,
        "end": 86900000,
        "type": "gneg"
      },
      {
        "id": "q21.3",
        "start": 86900001,
        "end": 93300000,
        "type": "gpos100"
      },
      {
        "id": "q22.1",
        "start": 93300001,
        "end": 99000000,
        "type": "gneg"
      },
      {
        "id": "q22.2",
        "start": 99000001,
        "end": 101600000,
        "type": "gpos25"
      },
      {
        "id": "q22.3",
        "start": 101600001,
        "end": 106200000,
        "type": "gneg"
      },
      {
        "id": "q23.1",
        "start": 106200001,
        "end": 110500000,
        "type": "gpos75"
      },
      {
        "id": "q23.2",
        "start": 110500001,
        "end": 112100000,
        "type": "gneg"
      },
      {
        "id": "q23.3",
        "start": 112100001,
        "end": 117700000,
        "type": "gpos100"
      },
      {
        "id": "q24.11",
        "start": 117700001,
        "end": 119200000,
        "type": "gneg"
      },
      {
        "id": "q24.12",
        "start": 119200001,
        "end": 122500000,
        "type": "gpos50"
      },
      {
        "id": "q24.13",
        "start": 122500001,
        "end": 127300000,
        "type": "gneg"
      },
      {
        "id": "q24.21",
        "start": 127300001,
        "end": 131500000,
        "type": "gpos50"
      },
      {
        "id": "q24.22",
        "start": 131500001,
        "end": 136400000,
        "type": "gneg"
      },
      {
        "id": "q24.23",
        "start": 136400001,
        "end": 139900000,
        "type": "gpos75"
      },
      {
        "id": "q24.3",
        "start": 139900001,
        "end": 146364022,
        "type": "gneg"
      }
    ]
  },
  "9": {
    "size": 141213431,
    "bands": [
      {
        "id": "p11.1",
        "start": 47300001,
        "end": 49000000,
        "type": "acen"
      },
      {
        "id": "p11.2",
        "start": 43600001,
        "end": 47300000,
        "type": "gneg"
      },
      {
        "id": "p12",
        "start": 41000001,
        "end": 43600000,
        "type": "gpos50"
      },
      {
        "id": "p13.1",
        "start": 38400001,
        "end": 41000000,
        "type": "gneg"
      },
      {
        "id": "p13.2",
        "start": 36300001,
        "end": 38400000,
        "type": "gpos25"
      },
      {
        "id": "p13.3",
        "start": 33200001,
        "end": 36300000,
        "type": "gneg"
      },
      {
        "id": "p21.1",
        "start": 28000001,
        "end": 33200000,
        "type": "gpos100"
      },
      {
        "id": "p21.2",
        "start": 25600001,
        "end": 28000000,
        "type": "gneg"
      },
      {
        "id": "p21.3",
        "start": 19900001,
        "end": 25600000,
        "type": "gpos100"
      },
      {
        "id": "p22.1",
        "start": 18500001,
        "end": 19900000,
        "type": "gneg"
      },
      {
        "id": "p22.2",
        "start": 16600001,
        "end": 18500000,
        "type": "gpos25"
      },
      {
        "id": "p22.3",
        "start": 14200001,
        "end": 16600000,
        "type": "gneg"
      },
      {
        "id": "p23",
        "start": 9000001,
        "end": 14200000,
        "type": "gpos75"
      },
      {
        "id": "p24.1",
        "start": 4600001,
        "end": 9000000,
        "type": "gneg"
      },
      {
        "id": "p24.2",
        "start": 2200001,
        "end": 4600000,
        "type": "gpos25"
      },
      {
        "id": "p24.3",
        "start": 1,
        "end": 2200000,
        "type": "gneg"
      },
      {
        "id": "q11",
        "start": 49000001,
        "end": 50700000,
        "type": "acen"
      },
      {
        "id": "q12",
        "start": 50700001,
        "end": 65900000,
        "type": "gvar"
      },
      {
        "id": "q13",
        "start": 65900001,
        "end": 68700000,
        "type": "gneg"
      },
      {
        "id": "q21.11",
        "start": 68700001,
        "end": 72200000,
        "type": "gpos25"
      },
      {
        "id": "q21.12",
        "start": 72200001,
        "end": 74000000,
        "type": "gneg"
      },
      {
        "id": "q21.13",
        "start": 74000001,
        "end": 79200000,
        "type": "gpos50"
      },
      {
        "id": "q21.2",
        "start": 79200001,
        "end": 81100000,
        "type": "gneg"
      },
      {
        "id": "q21.31",
        "start": 81100001,
        "end": 84100000,
        "type": "gpos50"
      },
      {
        "id": "q21.32",
        "start": 84100001,
        "end": 86900000,
        "type": "gneg"
      },
      {
        "id": "q21.33",
        "start": 86900001,
        "end": 90400000,
        "type": "gpos50"
      },
      {
        "id": "q22.1",
        "start": 90400001,
        "end": 91800000,
        "type": "gneg"
      },
      {
        "id": "q22.2",
        "start": 91800001,
        "end": 93900000,
        "type": "gpos25"
      },
      {
        "id": "q22.31",
        "start": 93900001,
        "end": 96600000,
        "type": "gneg"
      },
      {
        "id": "q22.32",
        "start": 96600001,
        "end": 99300000,
        "type": "gpos25"
      },
      {
        "id": "q22.33",
        "start": 99300001,
        "end": 102600000,
        "type": "gneg"
      },
      {
        "id": "q31.1",
        "start": 102600001,
        "end": 108200000,
        "type": "gpos100"
      },
      {
        "id": "q31.2",
        "start": 108200001,
        "end": 111300000,
        "type": "gneg"
      },
      {
        "id": "q31.3",
        "start": 111300001,
        "end": 114900000,
        "type": "gpos25"
      },
      {
        "id": "q32",
        "start": 114900001,
        "end": 117700000,
        "type": "gneg"
      },
      {
        "id": "q33.1",
        "start": 117700001,
        "end": 122500000,
        "type": "gpos75"
      },
      {
        "id": "q33.2",
        "start": 122500001,
        "end": 125800000,
        "type": "gneg"
      },
      {
        "id": "q33.3",
        "start": 125800001,
        "end": 130300000,
        "type": "gpos25"
      },
      {
        "id": "q34.11",
        "start": 130300001,
        "end": 133500000,
        "type": "gneg"
      },
      {
        "id": "q34.12",
        "start": 133500001,
        "end": 134000000,
        "type": "gpos25"
      },
      {
        "id": "q34.13",
        "start": 134000001,
        "end": 135900000,
        "type": "gneg"
      },
      {
        "id": "q34.2",
        "start": 135900001,
        "end": 137400000,
        "type": "gpos25"
      },
      {
        "id": "q34.3",
        "start": 137400001,
        "end": 141213431,
        "type": "gneg"
      }
    ]
  },
  "10": {
    "size": 135534747,
    "bands": [
      {
        "id": "p11.1",
        "start": 38000001,
        "end": 40200000,
        "type": "acen"
      },
      {
        "id": "p11.21",
        "start": 34400001,
        "end": 38000000,
        "type": "gneg"
      },
      {
        "id": "p11.22",
        "start": 31300001,
        "end": 34400000,
        "type": "gpos25"
      },
      {
        "id": "p11.23",
        "start": 29600001,
        "end": 31300000,
        "type": "gneg"
      },
      {
        "id": "p12.1",
        "start": 24600001,
        "end": 29600000,
        "type": "gpos50"
      },
      {
        "id": "p12.2",
        "start": 22600001,
        "end": 24600000,
        "type": "gneg"
      },
      {
        "id": "p12.31",
        "start": 18700001,
        "end": 22600000,
        "type": "gpos75"
      },
      {
        "id": "p12.32",
        "start": 18600001,
        "end": 18700000,
        "type": "gneg"
      },
      {
        "id": "p12.33",
        "start": 17300001,
        "end": 18600000,
        "type": "gpos75"
      },
      {
        "id": "p13",
        "start": 12200001,
        "end": 17300000,
        "type": "gneg"
      },
      {
        "id": "p14",
        "start": 6600001,
        "end": 12200000,
        "type": "gpos75"
      },
      {
        "id": "p15.1",
        "start": 3800001,
        "end": 6600000,
        "type": "gneg"
      },
      {
        "id": "p15.2",
        "start": 3000001,
        "end": 3800000,
        "type": "gpos25"
      },
      {
        "id": "p15.3",
        "start": 1,
        "end": 3000000,
        "type": "gneg"
      },
      {
        "id": "q11.1",
        "start": 40200001,
        "end": 42300000,
        "type": "acen"
      },
      {
        "id": "q11.21",
        "start": 42300001,
        "end": 46100000,
        "type": "gneg"
      },
      {
        "id": "q11.22",
        "start": 46100001,
        "end": 49900000,
        "type": "gpos25"
      },
      {
        "id": "q11.23",
        "start": 49900001,
        "end": 52900000,
        "type": "gneg"
      },
      {
        "id": "q21.1",
        "start": 52900001,
        "end": 61200000,
        "type": "gpos100"
      },
      {
        "id": "q21.2",
        "start": 61200001,
        "end": 64500000,
        "type": "gneg"
      },
      {
        "id": "q21.3",
        "start": 64500001,
        "end": 70600000,
        "type": "gpos100"
      },
      {
        "id": "q22.1",
        "start": 70600001,
        "end": 74900000,
        "type": "gneg"
      },
      {
        "id": "q22.2",
        "start": 74900001,
        "end": 77700000,
        "type": "gpos50"
      },
      {
        "id": "q22.3",
        "start": 77700001,
        "end": 82000000,
        "type": "gneg"
      },
      {
        "id": "q23.1",
        "start": 82000001,
        "end": 87900000,
        "type": "gpos100"
      },
      {
        "id": "q23.2",
        "start": 87900001,
        "end": 89500000,
        "type": "gneg"
      },
      {
        "id": "q23.31",
        "start": 89500001,
        "end": 92900000,
        "type": "gpos75"
      },
      {
        "id": "q23.32",
        "start": 92900001,
        "end": 94100000,
        "type": "gneg"
      },
      {
        "id": "q23.33",
        "start": 94100001,
        "end": 97000000,
        "type": "gpos50"
      },
      {
        "id": "q24.1",
        "start": 97000001,
        "end": 99300000,
        "type": "gneg"
      },
      {
        "id": "q24.2",
        "start": 99300001,
        "end": 101900000,
        "type": "gpos50"
      },
      {
        "id": "q24.31",
        "start": 101900001,
        "end": 103000000,
        "type": "gneg"
      },
      {
        "id": "q24.32",
        "start": 103000001,
        "end": 104900000,
        "type": "gpos25"
      },
      {
        "id": "q24.33",
        "start": 104900001,
        "end": 105800000,
        "type": "gneg"
      },
      {
        "id": "q25.1",
        "start": 105800001,
        "end": 111900000,
        "type": "gpos100"
      },
      {
        "id": "q25.2",
        "start": 111900001,
        "end": 114900000,
        "type": "gneg"
      },
      {
        "id": "q25.3",
        "start": 114900001,
        "end": 119100000,
        "type": "gpos75"
      },
      {
        "id": "q26.11",
        "start": 119100001,
        "end": 121700000,
        "type": "gneg"
      },
      {
        "id": "q26.12",
        "start": 121700001,
        "end": 123100000,
        "type": "gpos50"
      },
      {
        "id": "q26.13",
        "start": 123100001,
        "end": 127500000,
        "type": "gneg"
      },
      {
        "id": "q26.2",
        "start": 127500001,
        "end": 130600000,
        "type": "gpos50"
      },
      {
        "id": "q26.3",
        "start": 130600001,
        "end": 135534747,
        "type": "gneg"
      }
    ]
  },
  "11": {
    "size": 135006516,
    "bands": [
      {
        "id": "p11.11",
        "start": 51600001,
        "end": 53700000,
        "type": "acen"
      },
      {
        "id": "p11.12",
        "start": 48800001,
        "end": 51600000,
        "type": "gpos75"
      },
      {
        "id": "p11.2",
        "start": 43500001,
        "end": 48800000,
        "type": "gneg"
      },
      {
        "id": "p12",
        "start": 36400001,
        "end": 43500000,
        "type": "gpos100"
      },
      {
        "id": "p13",
        "start": 31000001,
        "end": 36400000,
        "type": "gneg"
      },
      {
        "id": "p14.1",
        "start": 27200001,
        "end": 31000000,
        "type": "gpos75"
      },
      {
        "id": "p14.2",
        "start": 26100001,
        "end": 27200000,
        "type": "gneg"
      },
      {
        "id": "p14.3",
        "start": 21700001,
        "end": 26100000,
        "type": "gpos100"
      },
      {
        "id": "p15.1",
        "start": 16200001,
        "end": 21700000,
        "type": "gneg"
      },
      {
        "id": "p15.2",
        "start": 12700001,
        "end": 16200000,
        "type": "gpos50"
      },
      {
        "id": "p15.3",
        "start": 10700001,
        "end": 12700000,
        "type": "gneg"
      },
      {
        "id": "p15.4",
        "start": 2800001,
        "end": 10700000,
        "type": "gpos50"
      },
      {
        "id": "p15.5",
        "start": 1,
        "end": 2800000,
        "type": "gneg"
      },
      {
        "id": "q11",
        "start": 53700001,
        "end": 55700000,
        "type": "acen"
      },
      {
        "id": "q12.1",
        "start": 55700001,
        "end": 59900000,
        "type": "gpos75"
      },
      {
        "id": "q12.2",
        "start": 59900001,
        "end": 61700000,
        "type": "gneg"
      },
      {
        "id": "q12.3",
        "start": 61700001,
        "end": 63400000,
        "type": "gpos25"
      },
      {
        "id": "q13.1",
        "start": 63400001,
        "end": 65900000,
        "type": "gneg"
      },
      {
        "id": "q13.2",
        "start": 65900001,
        "end": 68400000,
        "type": "gpos25"
      },
      {
        "id": "q13.3",
        "start": 68400001,
        "end": 70400000,
        "type": "gneg"
      },
      {
        "id": "q13.4",
        "start": 70400001,
        "end": 75200000,
        "type": "gpos50"
      },
      {
        "id": "q13.5",
        "start": 75200001,
        "end": 77100000,
        "type": "gneg"
      },
      {
        "id": "q14.1",
        "start": 77100001,
        "end": 85600000,
        "type": "gpos100"
      },
      {
        "id": "q14.2",
        "start": 85600001,
        "end": 88300000,
        "type": "gneg"
      },
      {
        "id": "q14.3",
        "start": 88300001,
        "end": 92800000,
        "type": "gpos100"
      },
      {
        "id": "q21",
        "start": 92800001,
        "end": 97200000,
        "type": "gneg"
      },
      {
        "id": "q22.1",
        "start": 97200001,
        "end": 102100000,
        "type": "gpos100"
      },
      {
        "id": "q22.2",
        "start": 102100001,
        "end": 102900000,
        "type": "gneg"
      },
      {
        "id": "q22.3",
        "start": 102900001,
        "end": 110400000,
        "type": "gpos100"
      },
      {
        "id": "q23.1",
        "start": 110400001,
        "end": 112500000,
        "type": "gneg"
      },
      {
        "id": "q23.2",
        "start": 112500001,
        "end": 114500000,
        "type": "gpos50"
      },
      {
        "id": "q23.3",
        "start": 114500001,
        "end": 121200000,
        "type": "gneg"
      },
      {
        "id": "q24.1",
        "start": 121200001,
        "end": 123900000,
        "type": "gpos50"
      },
      {
        "id": "q24.2",
        "start": 123900001,
        "end": 127800000,
        "type": "gneg"
      },
      {
        "id": "q24.3",
        "start": 127800001,
        "end": 130800000,
        "type": "gpos50"
      },
      {
        "id": "q25",
        "start": 130800001,
        "end": 135006516,
        "type": "gneg"
      }
    ]
  },
  "12": {
    "size": 133851895,
    "bands": [
      {
        "id": "p11.1",
        "start": 33300001,
        "end": 35800000,
        "type": "acen"
      },
      {
        "id": "p11.21",
        "start": 30700001,
        "end": 33300000,
        "type": "gneg"
      },
      {
        "id": "p11.22",
        "start": 27800001,
        "end": 30700000,
        "type": "gpos50"
      },
      {
        "id": "p11.23",
        "start": 26500001,
        "end": 27800000,
        "type": "gneg"
      },
      {
        "id": "p12.1",
        "start": 21300001,
        "end": 26500000,
        "type": "gpos100"
      },
      {
        "id": "p12.2",
        "start": 20000001,
        "end": 21300000,
        "type": "gneg"
      },
      {
        "id": "p12.3",
        "start": 14800001,
        "end": 20000000,
        "type": "gpos100"
      },
      {
        "id": "p13.1",
        "start": 12800001,
        "end": 14800000,
        "type": "gneg"
      },
      {
        "id": "p13.2",
        "start": 10100001,
        "end": 12800000,
        "type": "gpos75"
      },
      {
        "id": "p13.31",
        "start": 5400001,
        "end": 10100000,
        "type": "gneg"
      },
      {
        "id": "p13.32",
        "start": 3300001,
        "end": 5400000,
        "type": "gpos25"
      },
      {
        "id": "p13.33",
        "start": 1,
        "end": 3300000,
        "type": "gneg"
      },
      {
        "id": "q11",
        "start": 35800001,
        "end": 38200000,
        "type": "acen"
      },
      {
        "id": "q12",
        "start": 38200001,
        "end": 46400000,
        "type": "gpos100"
      },
      {
        "id": "q13.11",
        "start": 46400001,
        "end": 49100000,
        "type": "gneg"
      },
      {
        "id": "q13.12",
        "start": 49100001,
        "end": 51500000,
        "type": "gpos25"
      },
      {
        "id": "q13.13",
        "start": 51500001,
        "end": 54900000,
        "type": "gneg"
      },
      {
        "id": "q13.2",
        "start": 54900001,
        "end": 56600000,
        "type": "gpos25"
      },
      {
        "id": "q13.3",
        "start": 56600001,
        "end": 58100000,
        "type": "gneg"
      },
      {
        "id": "q14.1",
        "start": 58100001,
        "end": 63100000,
        "type": "gpos75"
      },
      {
        "id": "q14.2",
        "start": 63100001,
        "end": 65100000,
        "type": "gneg"
      },
      {
        "id": "q14.3",
        "start": 65100001,
        "end": 67700000,
        "type": "gpos50"
      },
      {
        "id": "q15",
        "start": 67700001,
        "end": 71500000,
        "type": "gneg"
      },
      {
        "id": "q21.1",
        "start": 71500001,
        "end": 75700000,
        "type": "gpos75"
      },
      {
        "id": "q21.2",
        "start": 75700001,
        "end": 80300000,
        "type": "gneg"
      },
      {
        "id": "q21.31",
        "start": 80300001,
        "end": 86700000,
        "type": "gpos100"
      },
      {
        "id": "q21.32",
        "start": 86700001,
        "end": 89000000,
        "type": "gneg"
      },
      {
        "id": "q21.33",
        "start": 89000001,
        "end": 92600000,
        "type": "gpos100"
      },
      {
        "id": "q22",
        "start": 92600001,
        "end": 96200000,
        "type": "gneg"
      },
      {
        "id": "q23.1",
        "start": 96200001,
        "end": 101600000,
        "type": "gpos75"
      },
      {
        "id": "q23.2",
        "start": 101600001,
        "end": 103800000,
        "type": "gneg"
      },
      {
        "id": "q23.3",
        "start": 103800001,
        "end": 109000000,
        "type": "gpos50"
      },
      {
        "id": "q24.11",
        "start": 109000001,
        "end": 111700000,
        "type": "gneg"
      },
      {
        "id": "q24.12",
        "start": 111700001,
        "end": 112300000,
        "type": "gpos25"
      },
      {
        "id": "q24.13",
        "start": 112300001,
        "end": 114300000,
        "type": "gneg"
      },
      {
        "id": "q24.21",
        "start": 114300001,
        "end": 116800000,
        "type": "gpos50"
      },
      {
        "id": "q24.22",
        "start": 116800001,
        "end": 118100000,
        "type": "gneg"
      },
      {
        "id": "q24.23",
        "start": 118100001,
        "end": 120700000,
        "type": "gpos50"
      },
      {
        "id": "q24.31",
        "start": 120700001,
        "end": 125900000,
        "type": "gneg"
      },
      {
        "id": "q24.32",
        "start": 125900001,
        "end": 129300000,
        "type": "gpos50"
      },
      {
        "id": "q24.33",
        "start": 129300001,
        "end": 133851895,
        "type": "gneg"
      }
    ]
  },
  "13": {
    "size": 115169878,
    "bands": [
      {
        "id": "p11.1",
        "start": 16300001,
        "end": 17900000,
        "type": "acen"
      },
      {
        "id": "p11.2",
        "start": 10000001,
        "end": 16300000,
        "type": "gvar"
      },
      {
        "id": "p12",
        "start": 4500001,
        "end": 10000000,
        "type": "stalk"
      },
      {
        "id": "p13",
        "start": 1,
        "end": 4500000,
        "type": "gvar"
      },
      {
        "id": "q11",
        "start": 17900001,
        "end": 19500000,
        "type": "acen"
      },
      {
        "id": "q12.11",
        "start": 19500001,
        "end": 23300000,
        "type": "gneg"
      },
      {
        "id": "q12.12",
        "start": 23300001,
        "end": 25500000,
        "type": "gpos25"
      },
      {
        "id": "q12.13",
        "start": 25500001,
        "end": 27800000,
        "type": "gneg"
      },
      {
        "id": "q12.2",
        "start": 27800001,
        "end": 28900000,
        "type": "gpos25"
      },
      {
        "id": "q12.3",
        "start": 28900001,
        "end": 32200000,
        "type": "gneg"
      },
      {
        "id": "q13.1",
        "start": 32200001,
        "end": 34000000,
        "type": "gpos50"
      },
      {
        "id": "q13.2",
        "start": 34000001,
        "end": 35500000,
        "type": "gneg"
      },
      {
        "id": "q13.3",
        "start": 35500001,
        "end": 40100000,
        "type": "gpos75"
      },
      {
        "id": "q14.11",
        "start": 40100001,
        "end": 45200000,
        "type": "gneg"
      },
      {
        "id": "q14.12",
        "start": 45200001,
        "end": 45800000,
        "type": "gpos25"
      },
      {
        "id": "q14.13",
        "start": 45800001,
        "end": 47300000,
        "type": "gneg"
      },
      {
        "id": "q14.2",
        "start": 47300001,
        "end": 50900000,
        "type": "gpos50"
      },
      {
        "id": "q14.3",
        "start": 50900001,
        "end": 55300000,
        "type": "gneg"
      },
      {
        "id": "q21.1",
        "start": 55300001,
        "end": 59600000,
        "type": "gpos100"
      },
      {
        "id": "q21.2",
        "start": 59600001,
        "end": 62300000,
        "type": "gneg"
      },
      {
        "id": "q21.31",
        "start": 62300001,
        "end": 65700000,
        "type": "gpos75"
      },
      {
        "id": "q21.32",
        "start": 65700001,
        "end": 68600000,
        "type": "gneg"
      },
      {
        "id": "q21.33",
        "start": 68600001,
        "end": 73300000,
        "type": "gpos100"
      },
      {
        "id": "q22.1",
        "start": 73300001,
        "end": 75400000,
        "type": "gneg"
      },
      {
        "id": "q22.2",
        "start": 75400001,
        "end": 77200000,
        "type": "gpos50"
      },
      {
        "id": "q22.3",
        "start": 77200001,
        "end": 79000000,
        "type": "gneg"
      },
      {
        "id": "q31.1",
        "start": 79000001,
        "end": 87700000,
        "type": "gpos100"
      },
      {
        "id": "q31.2",
        "start": 87700001,
        "end": 90000000,
        "type": "gneg"
      },
      {
        "id": "q31.3",
        "start": 90000001,
        "end": 95000000,
        "type": "gpos100"
      },
      {
        "id": "q32.1",
        "start": 95000001,
        "end": 98200000,
        "type": "gneg"
      },
      {
        "id": "q32.2",
        "start": 98200001,
        "end": 99300000,
        "type": "gpos25"
      },
      {
        "id": "q32.3",
        "start": 99300001,
        "end": 101700000,
        "type": "gneg"
      },
      {
        "id": "q33.1",
        "start": 101700001,
        "end": 104800000,
        "type": "gpos100"
      },
      {
        "id": "q33.2",
        "start": 104800001,
        "end": 107000000,
        "type": "gneg"
      },
      {
        "id": "q33.3",
        "start": 107000001,
        "end": 110300000,
        "type": "gpos100"
      },
      {
        "id": "q34",
        "start": 110300001,
        "end": 115169878,
        "type": "gneg"
      }
    ]
  },
  "14": {
    "size": 107349540,
    "bands": [
      {
        "id": "p11.1",
        "start": 16100001,
        "end": 17600000,
        "type": "acen"
      },
      {
        "id": "p11.2",
        "start": 8100001,
        "end": 16100000,
        "type": "gvar"
      },
      {
        "id": "p12",
        "start": 3700001,
        "end": 8100000,
        "type": "stalk"
      },
      {
        "id": "p13",
        "start": 1,
        "end": 3700000,
        "type": "gvar"
      },
      {
        "id": "q11.1",
        "start": 17600001,
        "end": 19100000,
        "type": "acen"
      },
      {
        "id": "q11.2",
        "start": 19100001,
        "end": 24600000,
        "type": "gneg"
      },
      {
        "id": "q12",
        "start": 24600001,
        "end": 33300000,
        "type": "gpos100"
      },
      {
        "id": "q13.1",
        "start": 33300001,
        "end": 35300000,
        "type": "gneg"
      },
      {
        "id": "q13.2",
        "start": 35300001,
        "end": 36600000,
        "type": "gpos50"
      },
      {
        "id": "q13.3",
        "start": 36600001,
        "end": 37800000,
        "type": "gneg"
      },
      {
        "id": "q21.1",
        "start": 37800001,
        "end": 43500000,
        "type": "gpos100"
      },
      {
        "id": "q21.2",
        "start": 43500001,
        "end": 47200000,
        "type": "gneg"
      },
      {
        "id": "q21.3",
        "start": 47200001,
        "end": 50900000,
        "type": "gpos100"
      },
      {
        "id": "q22.1",
        "start": 50900001,
        "end": 54100000,
        "type": "gneg"
      },
      {
        "id": "q22.2",
        "start": 54100001,
        "end": 55500000,
        "type": "gpos25"
      },
      {
        "id": "q22.3",
        "start": 55500001,
        "end": 58100000,
        "type": "gneg"
      },
      {
        "id": "q23.1",
        "start": 58100001,
        "end": 62100000,
        "type": "gpos75"
      },
      {
        "id": "q23.2",
        "start": 62100001,
        "end": 64800000,
        "type": "gneg"
      },
      {
        "id": "q23.3",
        "start": 64800001,
        "end": 67900000,
        "type": "gpos50"
      },
      {
        "id": "q24.1",
        "start": 67900001,
        "end": 70200000,
        "type": "gneg"
      },
      {
        "id": "q24.2",
        "start": 70200001,
        "end": 73800000,
        "type": "gpos50"
      },
      {
        "id": "q24.3",
        "start": 73800001,
        "end": 79300000,
        "type": "gneg"
      },
      {
        "id": "q31.1",
        "start": 79300001,
        "end": 83600000,
        "type": "gpos100"
      },
      {
        "id": "q31.2",
        "start": 83600001,
        "end": 84900000,
        "type": "gneg"
      },
      {
        "id": "q31.3",
        "start": 84900001,
        "end": 89800000,
        "type": "gpos100"
      },
      {
        "id": "q32.11",
        "start": 89800001,
        "end": 91900000,
        "type": "gneg"
      },
      {
        "id": "q32.12",
        "start": 91900001,
        "end": 94700000,
        "type": "gpos25"
      },
      {
        "id": "q32.13",
        "start": 94700001,
        "end": 96300000,
        "type": "gneg"
      },
      {
        "id": "q32.2",
        "start": 96300001,
        "end": 101400000,
        "type": "gpos50"
      },
      {
        "id": "q32.31",
        "start": 101400001,
        "end": 103200000,
        "type": "gneg"
      },
      {
        "id": "q32.32",
        "start": 103200001,
        "end": 104000000,
        "type": "gpos50"
      },
      {
        "id": "q32.33",
        "start": 104000001,
        "end": 107349540,
        "type": "gneg"
      }
    ]
  },
  "15": {
    "size": 102531392,
    "bands": [
      {
        "id": "p11.1",
        "start": 15800001,
        "end": 19000000,
        "type": "acen"
      },
      {
        "id": "p11.2",
        "start": 8700001,
        "end": 15800000,
        "type": "gvar"
      },
      {
        "id": "p12",
        "start": 3900001,
        "end": 8700000,
        "type": "stalk"
      },
      {
        "id": "p13",
        "start": 1,
        "end": 3900000,
        "type": "gvar"
      },
      {
        "id": "q11.1",
        "start": 19000001,
        "end": 20700000,
        "type": "acen"
      },
      {
        "id": "q11.2",
        "start": 20700001,
        "end": 25700000,
        "type": "gneg"
      },
      {
        "id": "q12",
        "start": 25700001,
        "end": 28100000,
        "type": "gpos50"
      },
      {
        "id": "q13.1",
        "start": 28100001,
        "end": 30300000,
        "type": "gneg"
      },
      {
        "id": "q13.2",
        "start": 30300001,
        "end": 31200000,
        "type": "gpos50"
      },
      {
        "id": "q13.3",
        "start": 31200001,
        "end": 33600000,
        "type": "gneg"
      },
      {
        "id": "q14",
        "start": 33600001,
        "end": 40100000,
        "type": "gpos75"
      },
      {
        "id": "q15.1",
        "start": 40100001,
        "end": 42800000,
        "type": "gneg"
      },
      {
        "id": "q15.2",
        "start": 42800001,
        "end": 43600000,
        "type": "gpos25"
      },
      {
        "id": "q15.3",
        "start": 43600001,
        "end": 44800000,
        "type": "gneg"
      },
      {
        "id": "q21.1",
        "start": 44800001,
        "end": 49500000,
        "type": "gpos75"
      },
      {
        "id": "q21.2",
        "start": 49500001,
        "end": 52900000,
        "type": "gneg"
      },
      {
        "id": "q21.3",
        "start": 52900001,
        "end": 59100000,
        "type": "gpos75"
      },
      {
        "id": "q22.1",
        "start": 59100001,
        "end": 59300000,
        "type": "gneg"
      },
      {
        "id": "q22.2",
        "start": 59300001,
        "end": 63700000,
        "type": "gpos25"
      },
      {
        "id": "q22.31",
        "start": 63700001,
        "end": 67200000,
        "type": "gneg"
      },
      {
        "id": "q22.32",
        "start": 67200001,
        "end": 67300000,
        "type": "gpos25"
      },
      {
        "id": "q22.33",
        "start": 67300001,
        "end": 67500000,
        "type": "gneg"
      },
      {
        "id": "q23",
        "start": 67500001,
        "end": 72700000,
        "type": "gpos25"
      },
      {
        "id": "q24.1",
        "start": 72700001,
        "end": 75200000,
        "type": "gneg"
      },
      {
        "id": "q24.2",
        "start": 75200001,
        "end": 76600000,
        "type": "gpos25"
      },
      {
        "id": "q24.3",
        "start": 76600001,
        "end": 78300000,
        "type": "gneg"
      },
      {
        "id": "q25.1",
        "start": 78300001,
        "end": 81700000,
        "type": "gpos50"
      },
      {
        "id": "q25.2",
        "start": 81700001,
        "end": 85200000,
        "type": "gneg"
      },
      {
        "id": "q25.3",
        "start": 85200001,
        "end": 89100000,
        "type": "gpos50"
      },
      {
        "id": "q26.1",
        "start": 89100001,
        "end": 94300000,
        "type": "gneg"
      },
      {
        "id": "q26.2",
        "start": 94300001,
        "end": 98500000,
        "type": "gpos50"
      },
      {
        "id": "q26.3",
        "start": 98500001,
        "end": 102531392,
        "type": "gneg"
      }
    ]
  },
  "16": {
    "size": 90354753,
    "bands": [
      {
        "id": "p11.1",
        "start": 34600001,
        "end": 36600000,
        "type": "acen"
      },
      {
        "id": "p11.2",
        "start": 28100001,
        "end": 34600000,
        "type": "gneg"
      },
      {
        "id": "p12.1",
        "start": 24200001,
        "end": 28100000,
        "type": "gpos50"
      },
      {
        "id": "p12.2",
        "start": 21200001,
        "end": 24200000,
        "type": "gneg"
      },
      {
        "id": "p12.3",
        "start": 16800001,
        "end": 21200000,
        "type": "gpos50"
      },
      {
        "id": "p13.11",
        "start": 14800001,
        "end": 16800000,
        "type": "gneg"
      },
      {
        "id": "p13.12",
        "start": 12600001,
        "end": 14800000,
        "type": "gpos50"
      },
      {
        "id": "p13.13",
        "start": 10500001,
        "end": 12600000,
        "type": "gneg"
      },
      {
        "id": "p13.2",
        "start": 7900001,
        "end": 10500000,
        "type": "gpos50"
      },
      {
        "id": "p13.3",
        "start": 1,
        "end": 7900000,
        "type": "gneg"
      },
      {
        "id": "q11.1",
        "start": 36600001,
        "end": 38600000,
        "type": "acen"
      },
      {
        "id": "q11.2",
        "start": 38600001,
        "end": 47000000,
        "type": "gvar"
      },
      {
        "id": "q12.1",
        "start": 47000001,
        "end": 52600000,
        "type": "gneg"
      },
      {
        "id": "q12.2",
        "start": 52600001,
        "end": 56700000,
        "type": "gpos50"
      },
      {
        "id": "q13",
        "start": 56700001,
        "end": 57400000,
        "type": "gneg"
      },
      {
        "id": "q21",
        "start": 57400001,
        "end": 66700000,
        "type": "gpos100"
      },
      {
        "id": "q22.1",
        "start": 66700001,
        "end": 70800000,
        "type": "gneg"
      },
      {
        "id": "q22.2",
        "start": 70800001,
        "end": 72900000,
        "type": "gpos50"
      },
      {
        "id": "q22.3",
        "start": 72900001,
        "end": 74100000,
        "type": "gneg"
      },
      {
        "id": "q23.1",
        "start": 74100001,
        "end": 79200000,
        "type": "gpos75"
      },
      {
        "id": "q23.2",
        "start": 79200001,
        "end": 81700000,
        "type": "gneg"
      },
      {
        "id": "q23.3",
        "start": 81700001,
        "end": 84200000,
        "type": "gpos50"
      },
      {
        "id": "q24.1",
        "start": 84200001,
        "end": 87100000,
        "type": "gneg"
      },
      {
        "id": "q24.2",
        "start": 87100001,
        "end": 88700000,
        "type": "gpos25"
      },
      {
        "id": "q24.3",
        "start": 88700001,
        "end": 90354753,
        "type": "gneg"
      }
    ]
  },
  "17": {
    "size": 81195210,
    "bands": [
      {
        "id": "p11.1",
        "start": 22200001,
        "end": 24000000,
        "type": "acen"
      },
      {
        "id": "p11.2",
        "start": 16000001,
        "end": 22200000,
        "type": "gneg"
      },
      {
        "id": "p12",
        "start": 10700001,
        "end": 16000000,
        "type": "gpos75"
      },
      {
        "id": "p13.1",
        "start": 6500001,
        "end": 10700000,
        "type": "gneg"
      },
      {
        "id": "p13.2",
        "start": 3300001,
        "end": 6500000,
        "type": "gpos50"
      },
      {
        "id": "p13.3",
        "start": 1,
        "end": 3300000,
        "type": "gneg"
      },
      {
        "id": "q11.1",
        "start": 24000001,
        "end": 25800000,
        "type": "acen"
      },
      {
        "id": "q11.2",
        "start": 25800001,
        "end": 31800000,
        "type": "gneg"
      },
      {
        "id": "q12",
        "start": 31800001,
        "end": 38100000,
        "type": "gpos50"
      },
      {
        "id": "q21.1",
        "start": 38100001,
        "end": 38400000,
        "type": "gneg"
      },
      {
        "id": "q21.2",
        "start": 38400001,
        "end": 40900000,
        "type": "gpos25"
      },
      {
        "id": "q21.31",
        "start": 40900001,
        "end": 44900000,
        "type": "gneg"
      },
      {
        "id": "q21.32",
        "start": 44900001,
        "end": 47400000,
        "type": "gpos25"
      },
      {
        "id": "q21.33",
        "start": 47400001,
        "end": 50200000,
        "type": "gneg"
      },
      {
        "id": "q22",
        "start": 50200001,
        "end": 57600000,
        "type": "gpos75"
      },
      {
        "id": "q23.1",
        "start": 57600001,
        "end": 58300000,
        "type": "gneg"
      },
      {
        "id": "q23.2",
        "start": 58300001,
        "end": 61100000,
        "type": "gpos75"
      },
      {
        "id": "q23.3",
        "start": 61100001,
        "end": 62600000,
        "type": "gneg"
      },
      {
        "id": "q24.1",
        "start": 62600001,
        "end": 64200000,
        "type": "gpos50"
      },
      {
        "id": "q24.2",
        "start": 64200001,
        "end": 67100000,
        "type": "gneg"
      },
      {
        "id": "q24.3",
        "start": 67100001,
        "end": 70900000,
        "type": "gpos75"
      },
      {
        "id": "q25.1",
        "start": 70900001,
        "end": 74800000,
        "type": "gneg"
      },
      {
        "id": "q25.2",
        "start": 74800001,
        "end": 75300000,
        "type": "gpos25"
      },
      {
        "id": "q25.3",
        "start": 75300001,
        "end": 81195210,
        "type": "gneg"
      }
    ]
  },
  "18": {
    "size": 78077248,
    "bands": [
      {
        "id": "p11.1",
        "start": 15400001,
        "end": 17200000,
        "type": "acen"
      },
      {
        "id": "p11.21",
        "start": 10900001,
        "end": 15400000,
        "type": "gneg"
      },
      {
        "id": "p11.22",
        "start": 8500001,
        "end": 10900000,
        "type": "gpos25"
      },
      {
        "id": "p11.23",
        "start": 7100001,
        "end": 8500000,
        "type": "gneg"
      },
      {
        "id": "p11.31",
        "start": 2900001,
        "end": 7100000,
        "type": "gpos50"
      },
      {
        "id": "p11.32",
        "start": 1,
        "end": 2900000,
        "type": "gneg"
      },
      {
        "id": "q11.1",
        "start": 17200001,
        "end": 19000000,
        "type": "acen"
      },
      {
        "id": "q11.2",
        "start": 19000001,
        "end": 25000000,
        "type": "gneg"
      },
      {
        "id": "q12.1",
        "start": 25000001,
        "end": 32700000,
        "type": "gpos100"
      },
      {
        "id": "q12.2",
        "start": 32700001,
        "end": 37200000,
        "type": "gneg"
      },
      {
        "id": "q12.3",
        "start": 37200001,
        "end": 43500000,
        "type": "gpos75"
      },
      {
        "id": "q21.1",
        "start": 43500001,
        "end": 48200000,
        "type": "gneg"
      },
      {
        "id": "q21.2",
        "start": 48200001,
        "end": 53800000,
        "type": "gpos75"
      },
      {
        "id": "q21.31",
        "start": 53800001,
        "end": 56200000,
        "type": "gneg"
      },
      {
        "id": "q21.32",
        "start": 56200001,
        "end": 59000000,
        "type": "gpos50"
      },
      {
        "id": "q21.33",
        "start": 59000001,
        "end": 61600000,
        "type": "gneg"
      },
      {
        "id": "q22.1",
        "start": 61600001,
        "end": 66800000,
        "type": "gpos100"
      },
      {
        "id": "q22.2",
        "start": 66800001,
        "end": 68700000,
        "type": "gneg"
      },
      {
        "id": "q22.3",
        "start": 68700001,
        "end": 73100000,
        "type": "gpos25"
      },
      {
        "id": "q23",
        "start": 73100001,
        "end": 78077248,
        "type": "gneg"
      }
    ]
  },
  "19": {
    "size": 59128983,
    "bands": [
      {
        "id": "p11",
        "start": 24400001,
        "end": 26500000,
        "type": "acen"
      },
      {
        "id": "p12",
        "start": 20000001,
        "end": 24400000,
        "type": "gvar"
      },
      {
        "id": "p13.11",
        "start": 16300001,
        "end": 20000000,
        "type": "gneg"
      },
      {
        "id": "p13.12",
        "start": 14000001,
        "end": 16300000,
        "type": "gpos25"
      },
      {
        "id": "p13.13",
        "start": 13900001,
        "end": 14000000,
        "type": "gneg"
      },
      {
        "id": "p13.2",
        "start": 6900001,
        "end": 13900000,
        "type": "gpos25"
      },
      {
        "id": "p13.3",
        "start": 1,
        "end": 6900000,
        "type": "gneg"
      },
      {
        "id": "q11",
        "start": 26500001,
        "end": 28600000,
        "type": "acen"
      },
      {
        "id": "q12",
        "start": 28600001,
        "end": 32400000,
        "type": "gvar"
      },
      {
        "id": "q13.11",
        "start": 32400001,
        "end": 35500000,
        "type": "gneg"
      },
      {
        "id": "q13.12",
        "start": 35500001,
        "end": 38300000,
        "type": "gpos25"
      },
      {
        "id": "q13.13",
        "start": 38300001,
        "end": 38700000,
        "type": "gneg"
      },
      {
        "id": "q13.2",
        "start": 38700001,
        "end": 43400000,
        "type": "gpos25"
      },
      {
        "id": "q13.31",
        "start": 43400001,
        "end": 45200000,
        "type": "gneg"
      },
      {
        "id": "q13.32",
        "start": 45200001,
        "end": 48000000,
        "type": "gpos25"
      },
      {
        "id": "q13.33",
        "start": 48000001,
        "end": 51400000,
        "type": "gneg"
      },
      {
        "id": "q13.41",
        "start": 51400001,
        "end": 53600000,
        "type": "gpos25"
      },
      {
        "id": "q13.42",
        "start": 53600001,
        "end": 56300000,
        "type": "gneg"
      },
      {
        "id": "q13.43",
        "start": 56300001,
        "end": 59128983,
        "type": "gpos25"
      }
    ]
  },
  "20": {
    "size": 63025520,
    "bands": [
      {
        "id": "p11.1",
        "start": 25600001,
        "end": 27500000,
        "type": "acen"
      },
      {
        "id": "p11.21",
        "start": 22300001,
        "end": 25600000,
        "type": "gneg"
      },
      {
        "id": "p11.22",
        "start": 21300001,
        "end": 22300000,
        "type": "gpos25"
      },
      {
        "id": "p11.23",
        "start": 17900001,
        "end": 21300000,
        "type": "gneg"
      },
      {
        "id": "p12.1",
        "start": 12100001,
        "end": 17900000,
        "type": "gpos75"
      },
      {
        "id": "p12.2",
        "start": 9200001,
        "end": 12100000,
        "type": "gneg"
      },
      {
        "id": "p12.3",
        "start": 5100001,
        "end": 9200000,
        "type": "gpos75"
      },
      {
        "id": "p13",
        "start": 1,
        "end": 5100000,
        "type": "gneg"
      },
      {
        "id": "q11.1",
        "start": 27500001,
        "end": 29400000,
        "type": "acen"
      },
      {
        "id": "q11.21",
        "start": 29400001,
        "end": 32100000,
        "type": "gneg"
      },
      {
        "id": "q11.22",
        "start": 32100001,
        "end": 34400000,
        "type": "gpos25"
      },
      {
        "id": "q11.23",
        "start": 34400001,
        "end": 37600000,
        "type": "gneg"
      },
      {
        "id": "q12",
        "start": 37600001,
        "end": 41700000,
        "type": "gpos75"
      },
      {
        "id": "q13.11",
        "start": 41700001,
        "end": 42100000,
        "type": "gneg"
      },
      {
        "id": "q13.12",
        "start": 42100001,
        "end": 46400000,
        "type": "gpos25"
      },
      {
        "id": "q13.13",
        "start": 46400001,
        "end": 49800000,
        "type": "gneg"
      },
      {
        "id": "q13.2",
        "start": 49800001,
        "end": 55000000,
        "type": "gpos75"
      },
      {
        "id": "q13.31",
        "start": 55000001,
        "end": 56500000,
        "type": "gneg"
      },
      {
        "id": "q13.32",
        "start": 56500001,
        "end": 58400000,
        "type": "gpos50"
      },
      {
        "id": "q13.33",
        "start": 58400001,
        "end": 63025520,
        "type": "gneg"
      }
    ]
  },
  "21": {
    "size": 48129895,
    "bands": [
      {
        "id": "p11.1",
        "start": 10900001,
        "end": 13200000,
        "type": "acen"
      },
      {
        "id": "p11.2",
        "start": 6800001,
        "end": 10900000,
        "type": "gvar"
      },
      {
        "id": "p12",
        "start": 2800001,
        "end": 6800000,
        "type": "stalk"
      },
      {
        "id": "p13",
        "start": 1,
        "end": 2800000,
        "type": "gvar"
      },
      {
        "id": "q11.1",
        "start": 13200001,
        "end": 14300000,
        "type": "acen"
      },
      {
        "id": "q11.2",
        "start": 14300001,
        "end": 16400000,
        "type": "gneg"
      },
      {
        "id": "q21.1",
        "start": 16400001,
        "end": 24000000,
        "type": "gpos100"
      },
      {
        "id": "q21.2",
        "start": 24000001,
        "end": 26800000,
        "type": "gneg"
      },
      {
        "id": "q21.3",
        "start": 26800001,
        "end": 31500000,
        "type": "gpos75"
      },
      {
        "id": "q22.11",
        "start": 31500001,
        "end": 35800000,
        "type": "gneg"
      },
      {
        "id": "q22.12",
        "start": 35800001,
        "end": 37800000,
        "type": "gpos50"
      },
      {
        "id": "q22.13",
        "start": 37800001,
        "end": 39700000,
        "type": "gneg"
      },
      {
        "id": "q22.2",
        "start": 39700001,
        "end": 42600000,
        "type": "gpos50"
      },
      {
        "id": "q22.3",
        "start": 42600001,
        "end": 48129895,
        "type": "gneg"
      }
    ]
  },
  "22": {
    "size": 51304566,
    "bands": [
      {
        "id": "p11.1",
        "start": 12200001,
        "end": 14700000,
        "type": "acen"
      },
      {
        "id": "p11.2",
        "start": 8300001,
        "end": 12200000,
        "type": "gvar"
      },
      {
        "id": "p12",
        "start": 3800001,
        "end": 8300000,
        "type": "stalk"
      },
      {
        "id": "p13",
        "start": 1,
        "end": 3800000,
        "type": "gvar"
      },
      {
        "id": "q11.1",
        "start": 14700001,
        "end": 17900000,
        "type": "acen"
      },
      {
        "id": "q11.21",
        "start": 17900001,
        "end": 22200000,
        "type": "gneg"
      },
      {
        "id": "q11.22",
        "start": 22200001,
        "end": 23500000,
        "type": "gpos25"
      },
      {
        "id": "q11.23",
        "start": 23500001,
        "end": 25900000,
        "type": "gneg"
      },
      {
        "id": "q12.1",
        "start": 25900001,
        "end": 29600000,
        "type": "gpos50"
      },
      {
        "id": "q12.2",
        "start": 29600001,
        "end": 32200000,
        "type": "gneg"
      },
      {
        "id": "q12.3",
        "start": 32200001,
        "end": 37600000,
        "type": "gpos50"
      },
      {
        "id": "q13.1",
        "start": 37600001,
        "end": 41000000,
        "type": "gneg"
      },
      {
        "id": "q13.2",
        "start": 41000001,
        "end": 44200000,
        "type": "gpos50"
      },
      {
        "id": "q13.31",
        "start": 44200001,
        "end": 48400000,
        "type": "gneg"
      },
      {
        "id": "q13.32",
        "start": 48400001,
        "end": 49400000,
        "type": "gpos50"
      },
      {
        "id": "q13.33",
        "start": 49400001,
        "end": 51304566,
        "type": "gneg"
      }
    ]
  },
  "X": {
    "size": 155270560,
    "bands": [
      {
        "id": "p11.1",
        "start": 58100001,
        "end": 60600000,
        "type": "acen"
      },
      {
        "id": "p11.21",
        "start": 54800001,
        "end": 58100000,
        "type": "gneg"
      },
      {
        "id": "p11.22",
        "start": 49800001,
        "end": 54800000,
        "type": "gpos25"
      },
      {
        "id": "p11.23",
        "start": 46400001,
        "end": 49800000,
        "type": "gneg"
      },
      {
        "id": "p11.3",
        "start": 42400001,
        "end": 46400000,
        "type": "gpos75"
      },
      {
        "id": "p11.4",
        "start": 37600001,
        "end": 42400000,
        "type": "gneg"
      },
      {
        "id": "p21.1",
        "start": 31500001,
        "end": 37600000,
        "type": "gpos100"
      },
      {
        "id": "p21.2",
        "start": 29300001,
        "end": 31500000,
        "type": "gneg"
      },
      {
        "id": "p21.3",
        "start": 24900001,
        "end": 29300000,
        "type": "gpos100"
      },
      {
        "id": "p22.11",
        "start": 21900001,
        "end": 24900000,
        "type": "gneg"
      },
      {
        "id": "p22.12",
        "start": 19300001,
        "end": 21900000,
        "type": "gpos50"
      },
      {
        "id": "p22.13",
        "start": 17100001,
        "end": 19300000,
        "type": "gneg"
      },
      {
        "id": "p22.2",
        "start": 9500001,
        "end": 17100000,
        "type": "gpos50"
      },
      {
        "id": "p22.31",
        "start": 6000001,
        "end": 9500000,
        "type": "gneg"
      },
      {
        "id": "p22.32",
        "start": 4300001,
        "end": 6000000,
        "type": "gpos50"
      },
      {
        "id": "p22.33",
        "start": 1,
        "end": 4300000,
        "type": "gneg"
      },
      {
        "id": "q11.1",
        "start": 60600001,
        "end": 63000000,
        "type": "acen"
      },
      {
        "id": "q11.2",
        "start": 63000001,
        "end": 64600000,
        "type": "gneg"
      },
      {
        "id": "q12",
        "start": 64600001,
        "end": 67800000,
        "type": "gpos50"
      },
      {
        "id": "q13.1",
        "start": 67800001,
        "end": 71800000,
        "type": "gneg"
      },
      {
        "id": "q13.2",
        "start": 71800001,
        "end": 73900000,
        "type": "gpos50"
      },
      {
        "id": "q13.3",
        "start": 73900001,
        "end": 76000000,
        "type": "gneg"
      },
      {
        "id": "q21.1",
        "start": 76000001,
        "end": 84600000,
        "type": "gpos100"
      },
      {
        "id": "q21.2",
        "start": 84600001,
        "end": 86200000,
        "type": "gneg"
      },
      {
        "id": "q21.31",
        "start": 86200001,
        "end": 91800000,
        "type": "gpos100"
      },
      {
        "id": "q21.32",
        "start": 91800001,
        "end": 93500000,
        "type": "gneg"
      },
      {
        "id": "q21.33",
        "start": 93500001,
        "end": 98300000,
        "type": "gpos75"
      },
      {
        "id": "q22.1",
        "start": 98300001,
        "end": 102600000,
        "type": "gneg"
      },
      {
        "id": "q22.2",
        "start": 102600001,
        "end": 103700000,
        "type": "gpos50"
      },
      {
        "id": "q22.3",
        "start": 103700001,
        "end": 108700000,
        "type": "gneg"
      },
      {
        "id": "q23",
        "start": 108700001,
        "end": 116500000,
        "type": "gpos75"
      },
      {
        "id": "q24",
        "start": 116500001,
        "end": 120900000,
        "type": "gneg"
      },
      {
        "id": "q25",
        "start": 120900001,
        "end": 128700000,
        "type": "gpos100"
      },
      {
        "id": "q26.1",
        "start": 128700001,
        "end": 130400000,
        "type": "gneg"
      },
      {
        "id": "q26.2",
        "start": 130400001,
        "end": 133600000,
        "type": "gpos25"
      },
      {
        "id": "q26.3",
        "start": 133600001,
        "end": 138000000,
        "type": "gneg"
      },
      {
        "id": "q27.1",
        "start": 138000001,
        "end": 140300000,
        "type": "gpos75"
      },
      {
        "id": "q27.2",
        "start": 140300001,
        "end": 142100000,
        "type": "gneg"
      },
      {
        "id": "q27.3",
        "start": 142100001,
        "end": 147100000,
        "type": "gpos100"
      },
      {
        "id": "q28",
        "start": 147100001,
        "end": 155270560,
        "type": "gneg"
      }
    ]
  },
  "Y": {
    "size": 59373566,
    "bands": [
      {
        "id": "p11.1",
        "start": 11600001,
        "end": 12500000,
        "type": "acen"
      },
      {
        "id": "p11.2",
        "start": 3000001,
        "end": 11600000,
        "type": "gneg"
      },
      {
        "id": "p11.31",
        "start": 2500001,
        "end": 3000000,
        "type": "gpos50"
      },
      {
        "id": "p11.32",
        "start": 1,
        "end": 2500000,
        "type": "gneg"
      },
      {
        "id": "q11.1",
        "start": 12500001,
        "end": 13400000,
        "type": "acen"
      },
      {
        "id": "q11.21",
        "start": 13400001,
        "end": 15100000,
        "type": "gneg"
      },
      {
        "id": "q11.221",
        "start": 15100001,
        "end": 19800000,
        "type": "gpos50"
      },
      {
        "id": "q11.222",
        "start": 19800001,
        "end": 22100000,
        "type": "gneg"
      },
      {
        "id": "q11.223",
        "start": 22100001,
        "end": 26200000,
        "type": "gpos50"
      },
      {
        "id": "q11.23",
        "start": 26200001,
        "end": 28800000,
        "type": "gneg"
      },
      {
        "id": "q12",
        "start": 28800001,
        "end": 59373566,
        "type": "gvar"
      }
    ]
  }
};




// Make sure we have local $ (this is for combined script in a function)
var $ = jQuery;

var Genoverse = Base.extend({

  // Defaults
  urlParamTemplate : 'r=__CHR__:__START__-__END__', // Overwrite this for your URL style
  width            : 1000,
  height           : 200,
  labelWidth       : 90,
  buffer           : 1,
  longestLabel     : 30,
  trackSpacing     : 2,
  defaultLength    : 5000,
  tracks           : [],
  tracksById       : {},
  menus            : [],
  plugins          : [],
  guideLinesByScale: {},
  dragAction       : 'scroll', // options are: scroll, select, off
  wheelAction      : 'off',    // options are: zoom, off
  messages         : {},
  genome           : undefined,
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

    $.when(browser.loadGenome(), browser.loadPlugins()).always(function(){
      for (var key in browser) {
        if (typeof browser[key] === 'function' && !key.match(/^(base|extend|constructor|functionWrap|debugWrap)$/)) {
          browser.functionWrap(key);
        }
      }
      browser.init();
    });
  },


  loadGenome: function () {
    if (typeof this.genome == 'string') {
      var genomeName = this.genome;
      return $.ajax({
        url      : this.origin + 'js/genomes/' + genomeName + '.js', 
        dataType : "script",
        context  : this,
        success  : function () {
          try {
            this.genome = eval(genomeName);
          } catch (e) {
            console.log(e);
            this.die('Unable to load genome ' + genomeName);
          }
        }
      });
    }
  },


  loadPlugins: function () {
    var browser = this;
    var loadPluginsTask = $.Deferred();

    // Load plugins css file
    browser.plugins.every(function (plugin, index, array) {
      LazyLoad.css(browser.origin + 'css/' + plugin + '.css');
      return true;
    });

    $.when.apply(
      $, 
      $.map(browser.plugins, function (plugin) {
        return $.ajax({
          url      : browser.origin + 'js/plugins/' + plugin + '.js',
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
      .replace(/(\b(\w+=)?__CHR__(.)?)/,   '$2([\\w\\.]+)$3')
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
        ui.item.data('track').container[ui.item[0].previousSibling ? 'insertAfter' : 'insertBefore']($(ui.item[0].previousSibling || ui.item[0].nextSibling).data('track').container);
        // Correct the order
        var newOrderTracks = [];
        // Well, this is dodgy, but hopefully .children will always give us LIs in order of appearence
        browser.labelContainer.children('li').each(function (i) {
          if ($(this).data('track')) {
            newOrderTracks.push($(this).data('track'));
          }
        });
        browser.tracks = newOrderTracks;
      }
    });

    this.labelWidth       = this.labelContainer.outerWidth(true);
    this.wrapperLeft      = this.labelWidth - width;
    this.width           -= this.labelWidth;

    this.wrapper  = $('<div class="gv_wrapper">').appendTo(this.container);
    this.selector = $('<div class="selector crosshair"></div>').appendTo(this.wrapper);

    this.container.width(width);
    
    this.selectorControls = $('                      \
      <div class="selector_controls">                \
        <button class="zoomHere">Zoom here</button>  \
        <button class="center">Center</button>       \
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

    var urlCoords = this.getURLCoords();
    var coords    = urlCoords.chr && urlCoords.start && urlCoords.end 
                     ? urlCoords 
                     : { chr: this.chr, start: this.start, end: this.end };

    this.chr = coords.chr;
    if (!this.chromosomeSize && this.genome) {
      this.chromosomeSize = this.genome[this.chr].size;
    }    

    this.setRange(coords.start, coords.end);
    this.setHistory();
    this.setTracks();
    //this.makeImage();
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

      mousewheel: function (e, delta, deltaX, deltaY) {
        if(deltaY === 0 && deltaX !== 0) {
          browser.move(null, -deltaX * 10);
        } else if (browser.wheelAction === 'zoom') {
          return browser.mousewheelZoom(e, delta);
        }
      },

      dblclick: function (e) {
        browser.mousewheelZoom(e, +1);
      }
    }, '.image_container, .overlay, .selector, .message_container');

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
        case 'center'   : var delta = browser.width / 2 - (left + width / 2); browser.move(delta); browser.selector.css({ left: left+delta }); break;
        case 'summary'  : browser.summary(start, end); break;
        case 'cancel'   : browser.cancelSelect(); break;
        default         : break;
      }
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
      this.tracks[i].reset(false);
    }
    
    this.scale   = 9e99; // arbitrary value so that setScale resets track scales as well
    this.history = {};
    
    this.setRange(this.start, this.end);
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
    
    $('.overlay', this.wrapper).add('.gv-menu', this.menuContainer).add(this.selector).css({
      left       : function (i, left) { return (this.className.indexOf('selector') === -1 ? 0 : 1) + parseFloat(left, 10) + parseFloat($(this).css('marginLeft'), 10); },
      marginLeft : function ()        { return  this.className.indexOf('selector') === -1 ? 0 : -1 }
    });
    
    if (update !== false) {
      if (this.start !== this.dragStart) {
        this.updateURL();
        this.setHistory();
        this.redraw();
      }
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
    
    var top = Math.min(e.pageY - this.wrapper.offset().top, this.wrapper.outerHeight(true) - 1.2*this.selectorControls.outerHeight(true));

    this.selectorControls.css({
      top  : top,
      left : this.selector.outerWidth(true) / 2 - this.selectorControls.outerWidth(true) / 2
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

    if (e.which === 27) {
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

  
  move: function (delta, callback) {
    var wrapperOffset = this.wrapper.offset().left;
    var start, end, step;
    var scale = this.scale;

    if (this.menus.length) this.closeMenus();

    // Force stepping by base pair when in small regions
    if (scale > 1) {
      this.left = Math.round(this.left / scale) * scale; 
      if (delta) {
        delta = Math.round(delta / scale) * scale;
      }
    }
    
    if (this.left + delta < this.minLeft) {
      delta = this.minLeft - this.left;
    } else if (this.left + delta > this.maxLeft) {
      delta = this.maxLeft - this.left;
    }

    this.left += delta;
    start = this.start - delta / scale;
    if (start < 1) start = 1;
    end   = start + this.length - 1;
    
    for (var i=0; i < this.tracks.length; i++) {
      this.tracks[i].move(delta, scale)
    }

    this.setRange(start, end);
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

    if (!this.end || !(this.end > this.start)) {
      this.end = this.start + this.defaultLength;
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
          this.tracks[i].setScale(this.scale);
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

  
  checkHeights: function () {
    if (this.dragging) {
      return;
    }
    
    for (var i = 0; i < this.tracks.length; i++) {
      if (!this.tracks[i].fixedHeight) {
        this.tracks[i].checkHeight();
        
        // This should be in track!
        // if (this.tracks[i].autoHeight || this.tracks[i].separateLabels) {
        //   this.tracks[i].resize(this.tracks[i][this.tracks[i].autoHeight ? 'fullVisibleHeight' : 'height'], this.tracks[i].labelTop);
        // } else {
        //   this.tracks[i].toggleExpander();
        // }

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
    
    //this.makeImage();
    
    return true;
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

      tracks[i] = new Class($.extend(true, {}, tracks[i], defaults));

      // set the reference to the browser
      //
      // andrewtikhonov:
      // tracks might accidentally create
      // their own 'browser' variable, which
      // will be silently overridden, which
      // is obviously not perfect
      //
      // EugeneBragin:
      // Hmm, not sure about this one, 
      // could you give one example?
      tracks[i].browser = this;

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
    
    // if (!push) {
    //   this.sortTracks(); // initial sort
    // }
    
    return tracks;
  },
  
  
  addTrack: function (track) {
    this.addTracks([ track ]);
  },
  
  
  addTracks: function (tracks) {
    this.setTracks(tracks, this.tracks.length);
    //this.sortTracks();
  },
  
  
  removeTrack: function (track) {
    // splice tracks array
    for (var i=0; i<this.tracks.length; i++) {
      if (track == this.tracks[i]) {
        this.tracks.splice(i, 1);
        break;
      }
    }

    // Destroy DOM elements and track itself
    track.destroy();
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

    }
  },
  
  
  sortTracks: function () {
    var sorted     = $.extend([], this.tracks).sort(function (a, b) { return a.order - b.order; });
    var labels     = $();
    var containers = $();
    
    for (var i = 0; i < sorted.length; i++) {
      labels.push(sorted[i].label[0]);
      containers.push(sorted[i].container.detach()[0]);
    }
    
    this.labelContainer.append(labels);
    this.wrapper.append(containers);
    
    sorted = labels = containers = null;
  },
  
  
  makeImage: function () {
  },


  // makeImage: function () {
  //   //debugger;
  //   var left = -this.left;
  //   var dir  = left < 0 ? 'right' : 'left';
  //   var start, end;
    
  //   if (left) {
  //     start = left > 0 ? this.dataRegion.end   : this.dataRegion.start - (this.buffer * this.length);
  //     end   = left < 0 ? this.dataRegion.start : this.dataRegion.end   + (this.buffer * this.length);
  //   } else {
  //     start = Math.max(this.start, 1);
  //     end   = Math.min(this.end + 1, this.chromosomeSize);
  //   }
    
  //   var width = Math.round((end - start) * this.scale);
    
  //   this.dataRegion.start = Math.min(start, this.dataRegion.start);
  //   this.dataRegion.end   = Math.max(end,   this.dataRegion.end);
  //   this.offsets[dir]    += width;
    
  //   if (this.updateFromHistory()) {
  //     return;
  //   }
    
  //   this.makeTrackImages(this.tracks, start, end, width);
  // },
  
  
  // makeTrackImages: function (tracks, start, end, width) {
  //   start = start || this.dataRegion.start;
  //   end   = end   || this.dataRegion.end;
  //   width = width || Math.round((end - start + 1) * this.scale);
    
  //   // Maximum texture width is 32Kb. Above this, images will fail to load.
  //   // FIXME: rewrite so that addTrack/setRenderer cannot create an image that is this wide
  //   if (width > 32 * 1024) {
  //     return this.reset();
  //   }
    
  //   var left       = -this.left;
  //   var dataRegion = $.extend({}, this.dataRegion);
  //   var offsets    = $.extend({}, this.offsets);
  //   var allTracks  = tracks.length === this.tracks.length;


  //   // var overlay    = this.makeOverlays(width, allTracks ? false : tracks);
  //   // function removeOverlay() {
  //   //   if (overlay) {
  //   //     overlay.remove();
  //   //     overlay = null;
  //   //   }
  //   // }
    
  //   for (var i=0; i<tracks.length; i++) {
  //     tracks[i].makeImage(start, end, width, left, this.scale);
  //   }

  //   // $.when.apply($, $.map(tracks, function (track) { return track.makeImage(start, end, width, left, browser.scrollStart); })).done(function () {
  //   //   var redraw = false;
      
  //   //   $.when.apply($, $.map($.map(arguments, function (a) {
  //   //     $(a.target).show();
  //   //     return a.img;
  //   //   }), function (i) {
  //   //     if (i.track.backgrounds && !allTracks) {
  //   //       i.track.scaleFeatures(i.track.backgrounds);
  //   //       redraw = true;
  //   //     }
        
  //   //     return i.drawBackground();
  //   //   })).done(removeOverlay);
      
  //   //   if (allTracks) {
  //   //     browser.prev.history = browser.start + '-' + browser.end;
  //   //     browser.setHistory(dataRegion, offsets);
  //   //   } else {
  //   //     browser.updateTracks(redraw);
  //   //   }
      
  //   //   browser.checkTrackSize();
  //   // }).fail(removeOverlay);
  // },
  
  
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
    var coords = this.getURLCoords();
    
    if (coords.start && !(parseInt(coords.start, 10) === this.start && parseInt(coords.end, 10) === this.end)) {
      this.setRange(coords.start, coords.end);
      
      if (!this.updateFromHistory()) {
        this.reset();
      }
    }
    
    var delta = Math.round((this.start - this.prev.start) * this.scale);
    
    $('.gv-menu', this.menuContainer).css('left', function (i, left) { return parseFloat(left, 10) - delta; });
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
        
        this.checkHeights();
        
        images.show();
        images = null;
        
        return true;
      }
    }
    
    return false;
  },
  
  
  getURLCoords: function () {
    var coords = { chr: null, start:null, end:null };

    // check url parameters are not empty
    if (window.location.hash == "" && window.location.search == "") {
        return coords;
    }

    try {
      var match  = ((this.useHash ? window.location.hash.replace(/^#/, '?') ||
          window.location.search : window.location.search) + '&').match(this.paramRegex).slice(2, -1);

      var i = 0;
      
      $.each(this.urlParamTemplate.split('__'), function () {
        var tmp = this.match(/^(CHR|START|END)$/);
        
        if (tmp) {
          coords[tmp[1].toLowerCase()] = match[i++];
        }
      });
    } catch(e) {

    }

    return coords;
  },
  

  getQueryString: function () {
    var location = this.urlParamTemplate
      .replace('__CHR__',   this.chr)
      .replace('__START__', this.start)
      .replace('__END__',   this.end);

    if (this.useHash) {
        return location;
    }

    // no parameters
    if (window.location.search == "") {
        return "?" + location;
    }

    // otherwise
    return (window.location.search + '&').
        replace(this.paramRegex, '$1' + location + '$5').slice(0, -1);
  },
    

  supported: function () {
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
  },
  

  die: function (error) {
    alert(error);
    throw(error);
  },


  menuTemplate: $('<div class="gv_menu"> <div class="close">x</div> <table></table> </div>').on('click', function (e) {
    if ($(e.target).hasClass('close')) {
      $(this).fadeOut('fast', function () {
        var feature = $(this).data('feature');
        if (feature && feature['_menu']) delete feature['_menu'];
        $(this).remove();
      });
    }
  }),  


  makeMenu: function (feature, position, track) {
    if (feature._menu) return feature._menu;

    var wrapper = this.wrapper;
    var offset  = wrapper.offset();
    var menu    = this.menuTemplate.clone(true).data({ feature: feature }).appendTo($('body'));

    this.menus.push(menu);
    
    if (track) {
      track.menus.push(menu[0]);
    }
    
    $.when(track ? track.populateMenu(feature) : feature).done(function (feature) {
      if (Object.prototype.toString.call(feature) !== "[object Array]") feature = [ feature ];

      feature.every(function(feature) {
        $('table', menu).append(
          (feature.title ? '<tr class="header"><th colspan="2" class="title">' + feature.title + '</th></tr>' : '') +
          $.map(feature, function (value, key) {
            if (key !== 'title') {
              return '<tr><td>'+ key +'</td><td>'+ value +'</td></tr>';
            }
          }).join()
        );
        return true;
      });
      
      menu.show().css(
        position || 
        { 
          top  : Math.max(offset.top, $(document).scrollTop()) + menu.outerHeight(true)/10,
          left : offset.left + (wrapper.outerWidth(true) - menu.outerWidth(true))/2
        }
      );

      if (track && track.id) {
        menu.addClass(track.id);
      }
    });
    
    feature._menu = menu;
    return menu;
  },


  closeMenus: function () {
    var i = this.menus.length;
    while (i--) {
      $('.close', this.menus[i]).click();
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
    var name = (obj ? (obj.name || 'Track' + obj.type) : 'Genoverse') + '.' + key;
    obj = obj || this;

    if ((key.indexOf('after') === 0) || (key.indexOf('before') === 0)) {
      if (!obj.systemEventHandlers[key]) obj.systemEventHandlers[key] = [];
      obj.systemEventHandlers[key].push(obj[key]);
      return;
    }

    var func = key.substring(0, 1).toUpperCase() + key.substring(1);
    
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
            // TODO: Should it end when beforeFunc returned false??
            this.systemEventHandlers['before' + func][i].apply(this, arguments);
          }
        }
        
        rtn = this['__original' + func].apply(this, arguments);
        
        if (this.systemEventHandlers['after' + func]) {
          for (i = 0; i < this.systemEventHandlers['after' + func].length; i++) {
            // TODO: Should it end when afterFunc returned false??
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
        console.log(name);
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
        //console.log(name, arguments);        
        console.time('time: ' + name);
      });
      
      obj.systemEventHandlers['after' + func].push(function () {
        console.timeEnd('time: ' + name);
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


Genoverse.on('afterMove afterZoomIn afterZoomOut', function () {
  // $('.static', this.wrapper).css('left', -this.left);
  this.checkHeights();
});

window.Genoverse = Genoverse;

Genoverse.prototype.origin = ($('script:last').attr('src').match(/(.*)js\/\w+\.js/))[1];
LazyLoad.css(Genoverse.prototype.origin + 'css/genoverse.css');




Genoverse.Track = Base.extend({

  // Defaults
  height         : 12,
  dataType       : 'json',
  color          : '#000000',
  fontSize       : 10,
  buffer         : 1.2,          // number of widths, if left of right closer to the edges of viewpoint than the buffer, start making more images
  dataBuffer     : 0,            // basepairs, extend data region for, when getting data from the origin 
  fontFamily     : 'sans-serif',
  fontWeight     : 'normal',
  fontColor      : '#000000',
  bump           : false,
  bumpLabels     : true,
  bumpSpacing    : 2,
  featureSpacing : 1,
  minScaledWidth : 0.5,
  inherit        : [],
  xhrFields      : {},
  featuresById   : {},
  imgRange       : {},
  dataRange      : {},

  messages       : {
    ERROR            : 'ERROR: ',
    thresholdWarning : 'Data for this track is not displayed for this zoom level',
    resizeToSeeAll   : 'Not all features displayed, resize to see all'
  },
  


  constructor: function (config) {
    // Deep clone all [..] and {..} objects in this to prevent sharing between instances
    var deepCopy = {};
    for (var key in this) {
      if (typeof this[key] === 'object') deepCopy[key] = this[key];
    }
    this.extend($.extend(true, {}, deepCopy));

    config.inherit = $.merge(this.inherit, config.inherit || []);

    for (var i = 0; i < config.inherit.length; i++) {
      if (Genoverse.Track[config.inherit[i]]) {
        this.extend(Genoverse.Track[config.inherit[i]]);
      }
    }

    // Use Base.extend to make any funciton in config have this.base    
    this.extend(config);

    var track = this;

    if (typeof this.inheritedConstructor === 'function') {
      this.inheritedConstructor(config);
    }
    
    for (var key in this) {
      if (typeof this[key] === 'function' && !key.match(/^(base|extend|constructor|functionWrap|debugWrap)$/)) {
        this.browser.functionWrap(key, this);
      }
    }
    
    this.addDomElements(config);
    this.addUserEventHandlers();
    this.init();
    //this.setScale();
    //this.makeFirstImage();
  },


  addDomElements: function (config) {
    var track = this;

    this.order            = typeof this.order          !== 'undefined' ? this.order          : this.index;
    this.separateLabels   = typeof this.separateLabels !== 'undefined' ? this.separateLabels : !!this.depth;
    this.spacing          = typeof this.spacing        !== 'undefined' ? this.spacing        : this.browser.trackSpacing;
    this.featureHeight    = typeof this.featureHeight  !== 'undefined' ? this.featureHeight  : this.height;
    this.fixedHeight      = typeof this.fixedHeight    !== 'undefined' ? this.fixedHeight    : this.featureHeight === this.height && !(this.bump || this.bumpLabels);
    this.autoHeight       = typeof this.autoHeight     !== 'undefined' ? this.autoHeight     : !this.fixedHeight && !config.height ? this.browser.autoHeight : false;
    this.resizable        = typeof this.resizable      !== 'undefined' ? this.resizable      : !this.fixedHeight;
    this.height          += this.spacing;
    this.initialHeight    = this.height;
    this.minLabelHeight   = 0;
    this.container        = $('<div class="track_container">').appendTo(this.browser.wrapper);

    this.messageContainer = $('<div class="message_container" />').append(
      $('<a class="message_container_control">&laquo;</a>').click(function(){
        if ($(this).parent().hasClass('collapsed')) {
          $(this).html('&laquo;');
          $(this).parent().removeClass('collapsed');
        } else {
          $(this).html('&raquo;');
          $(this).parent().addClass('collapsed');
        }
      })
    ).appendTo(this.container);

    this.scrollContainer  = $('<div class="scroll_container">').appendTo(this.container);
    this.imgContainer     = $('<div class="image_container">');
    this.border           = $('<div class="track_border">').appendTo(this.container);

    this.label            = $('<li>').appendTo(this.browser.labelContainer).height(this.height).data('track', this);
    this.menus            = $();

    this.canvas           = $('<canvas>').css({display: 'none'});
    this.context          = this.canvas[0].getContext('2d');
    this.font             = this.fontWeight + ' ' + this.fontSize + 'px ' + this.fontFamily;
    this.context.font     = this.font;
    this.fontHeight       = this.fontSize;
    this.labelUnits       = [ 'bp', 'Kb', 'Mb', 'Gb', 'Tb' ];

    if (this.hidden) {
      this.height  = 0;
    }
    
    if (this.autoHeight === 'force') {
      this.autoHeight  = true;
      this.fixedHeight = false;
      this.resizable   = false;
    }
    
   
    if (this.unsortable) {
      this.label.addClass('unsortable');
    } else {
      $('<div class="handle"></div>').appendTo(this.label);
    }
    
    this.minLabelHeight = $('<span class="name" title="' + (this.name || '') + '">' + (this.name || '') + '</span>').appendTo(this.label).outerHeight(true);
    this.label.height(this.hidden ? 0 : Math.max(this.height, this.minLabelHeight));
    
    this.container.height(this.hidden ? 0 : Math.max(this.height, this.minLabelHeight));
    this.container.width(this.browser.width);
    
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
    this.resetData();
    this.setScale();
  },


  // Reset does init by default, unless init == false
  reset: function (init) {
    this.resetImages();
    this.resetData();

    if (typeof(init) == 'undefined' || init) {
      this.init();
    }
  },


  resetData: function () {
    this.features = new RTree();
    this.featuresById  = {};
    this.dataRange     = { start: 9e99, end: -9e99 };
    this.scaleSettings = {};
  },


  resetImages: function () {
    this.imgRange = {};
    this.scrollContainer.children('.image_container').remove();
  },


  resetFeaturePositions: function () {
    this.scaleSettings = {};
    this.featurePositions = new RTree();
    for (id in this.featuresById) {
      var feature = this.featuresById[id];
      delete feature.position;
    }
  },


  reDraw: function () {
    this.resetFeaturePositions();

    for (var i=0; i<this.imgContainers.length; i++) {
      var image = $('img.data', this.imgContainers[i]);
      var data  = image.data();

      var features = this.findFeatures(data.start, data.end);
      this.render(features, image);
    }
  },


  rename: function (newName) {
    this.name = newName;
    $('span.name', this.label).html(this.name);
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


  showMessage: function (code, additionalText) {
    if (!$('.' + code, this.messageContainer).length) {
      this.messageContainer.prepend(
        '<div class="'+ code +'">'+ (this.messages[code] || this.browser.messages[code]) + (additionalText || '') +'</div>'
      ).show();
    }
  },


  hideMessage: function (code) {
    if (code) {
      $('.' + code, this.messageContainer).remove();
      if (!$('div', this.messageContainer).length) {
        this.messageContainer.hide();
      }
    } else {
      $('div', this.messageContainer).remove();
      this.messageContainer.hide();
    }
  },
  

  click: function (e) {
    var x = e.pageX - this.container.parent().offset().left + this.browser.scaledStart;
    var y = e.pageY - $(e.target).offset().top;
    var feature = this.featurePositions.search({ x: x, y: (this.bump ? y : 0), w: 1, h: 1 })[0];
    
    if (feature) {
      this.browser.makeMenu(feature, { left: e.pageX, top: e.pageY }, this);
    }
  },


  checkHeight: function () {
    var bounds = { x: this.browser.scaledStart, w: this.width, y: 0, h: 10000 };
    var scale  = this.scale;
    var height = Math.max.apply(Math, $.map(this.featurePositions.search(bounds), function (feature) { return feature.position[scale].Y + feature.position[scale].H; }).concat(0));
    this.fullVisibleHeight = height;

    this.toggleExpander();
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
    if (this.fullVisibleHeight > this.container.height()) {
      this.showMessage('resizeToSeeAll');
      this.expander = (this.expander || $('<div class="expander">').width(this.width).appendTo(this.container).on('click', function () {
        track.resize(track.fullVisibleHeight);
      }))[this.height === 0 ? 'hide' : 'show']();
    } else if (this.expander) {
      this.hideMessage('resizeToSeeAll');
      this.expander.hide();
    }    
  },


  remove: function () {
    this.browser.removeTrack(this);
  },

  
  destroy: function () {
    this.container.add(this.label).add(this.menus).remove();
    delete this;
  },


  setScale: function () {
    var track = this;
    var featurePositions, labelPositions;
    
    this.left  = 0;
    this.scale = this.browser.scale;
    this.imgRange[this.scale] = {};
    this.imgRange[this.scale].left  = 0;
    this.imgRange[this.scale].right = this.width-1;

    this.dataRange[this.scale] = {};
    this.dataRange[this.scale].start = this.browser.start;
    this.dataRange[this.scale].end = this.browser.end;

    this.hideMessage();
    
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
    
    this.scrollContainer.css('left', this.browser.left).children('.image_container').remove();
    this.makeFirstImage();
  },


  /**
  * parseData(data) - parse raw data from the data source (e.g. online web service)
  * extract features and insert it into the internal features storage (RTree)
  *
  * >> data - raw data from the data source (e.g. ajax response)
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
  parseData: function (data) {
    // Example of parseData function when data is an array of hashes like {start:..., end...}
    for (var i=0; i<data.length; i++) {
      var feature = data[i];

      feature.width = feature.end - feature.start + 1;
      if (feature.width > 0) {
        this.insertFeature(feature);
      }
    }
  },


  insertFeature: function (feature) {
    // Make sure we have a unique ID, this method is not efficient, 
    // so better suppy your own id
    if (!feature.id) {
      feature.id = JSON.stringify(feature).hashCode();
    }
    if (!feature.width) {
      feature.width = feature.end - feature.start + 1;
    }

    if (!this.featuresById[feature.id] && feature.width > 0) {
      if (!feature.width) feature.width = feature.end - feature.start + 1;

      // RTree stuff
      this.features.insert({ x: feature.start, y: 0, w: feature.width, h: 1 }, feature);
      this.featuresById[feature.id] = feature;
    }
  },


  findFeatures: function (start, end) {
    var bounds = { x: start, y: 0, w: end - start, h: 1 };
    return this.features.search(bounds);
  },


  move: function (delta, scale) {
    this.left += delta;
    this.scrollContainer.css('left', this.left);

    if (this.imgRange[scale].left + this.left > -this.buffer*this.width) {
      this.imgRange[scale].left   -= this.width;
      this.dataRange[scale].start -= this.width/scale;

      this.makeImage({
        scale : scale,
        start : this.dataRange[scale].start,
        end   : this.dataRange[scale].start + this.width/scale,
        left  : this.imgRange[scale].left,
      });

      this.move(0, scale);
    }
    if (this.imgRange[scale].right + this.left < (1+this.buffer)*this.width) {
      this.imgRange[scale].right += this.width;
      this.dataRange[scale].end  += this.width/scale;
      this.makeImage({
        scale : scale,
        start : this.dataRange[scale].end  - this.width/scale,
        end   : this.dataRange[scale].end,
        left  : this.imgRange[scale].right - this.width + 1,
      });      

      this.move(0, scale);
    }

    return false;
  },
  

  makeImage: function (params) {
    var track = this;
    var defer = $.Deferred();

    // TODO: check params
    params.scaledStart = params.start*params.scale;
    params.height      = this.height || 0;
    params.width       = this.width;
    params.start       = Math.max(params.start, 0);
    params.end         = Math.min(params.end, this.browser.chromosomeSize);

    var div     = this.imgContainer
                  .clone()
                  .width(this.width)
                  .addClass(("scale_" + params.scale + " loading").replace('.','_'))
                  .css('left', params.left);

    var image   = $('<img class="data" />')
                  .css({ opacity : 0 })
                  .data(params)
                  .load(function(){ div.removeClass('loading'); $(this).animate({ opacity : 1 }, 100); })
                  .appendTo(div);

    this.imgContainers.push(div[0]);
    this.scrollContainer.append(this.imgContainers);

    if (this.threshold && this.threshold < this.browser.length) {
      this.dataRange.start = 9e99;
      this.dataRange.end   = -9e99;
      //this.resetData();
      this.render([], image);
      this.showMessage('thresholdWarning');
    } else if (params.start >= this.dataRange.start && params.end <= this.dataRange.end) {
      // This defer makes scrolling A LOT smoother, pushing render call to the end of the exec queue
      var defer = $.Deferred().then(function(){
        track.render(track.findFeatures(params.start, params.end), image);
      });

      setTimeout(function(){ defer.resolve() }, 1);
    } else {

      track.dataRange.start = track.allData ? 0    : Math.min(params.start - track.dataBuffer, track.dataRange.start);
      track.dataRange.end   = track.allData ? 9e99 : Math.max(params.end + track.dataBuffer, track.dataRange.end);

      $.when(this.getData(params.start - track.dataBuffer, params.end + track.dataBuffer))
       .done(function (data) {
         try {
           track.parseData(data, params.start, params.end);
           track.render(track.findFeatures(params.start, params.end), image);
         } catch (e) {
           track.showError(e);
         }
        
         if (track.allData) {
           track.url = false;
         }
       })
       .fail(function () {
         //debugger;
         track.showError({ message: 'error while getting the data, check console', arguments: arguments });
       });
    }
  },


  makeFirstImage: function() {
    var params = {
      start : this.browser.start,
      end   : this.browser.end,
      scale : this.browser.scale,
      left  : 0,
    };

    this.makeImage(params);
    this.move(0, params.scale);
  },


  getData: function (start, end) {
    return $.ajax({
      url      : this.parseUrl(start, end),
      dataType : this.dataType,
      context  : this,
      xhrFields: this.xhrFields,
    });
  },

  
  scaleFeatures: function (features, scale) {
    for (var i=0; i<features.length; i++) {
      var feature = features[i];
      if (!feature.position) feature.position = {};

      if (!feature.position[scale]) {
        feature.position[scale] = {};
        feature.position[scale].start  = feature.start * scale;
        feature.position[scale].width  = feature.width * scale;
        feature.position[scale].height = this.featureHeight;

        if (feature.position[scale].width < this.minScaledWidth) feature.position[scale].width = this.minScaledWidth;
      }
    }
  },

  
  positionFeatures: function (features, params) {
    for (var i=0; i<features.length; i++) {
      //if (!features[i].position[params.scale].X)
        this.positionFeature(features[i], params);
    }
    params.width = Math.ceil(params.width);
    params.height = Math.ceil(params.height);
  },


  positionFeature: function (feature, params) {
    var scale = params.scale;

    feature.position[scale].X = feature.position[scale].start - params.scaledStart;
    feature.position[scale].Y = feature.position[scale].Y || feature.y || this.featureSpacing;
    feature.position[scale].labelWidth = feature.label ? Math.ceil(this.context.measureText(feature.label).width) + 1 : 0;

    if (!feature.position[scale].H || !feature.position[scale].W) {
      feature.position[scale].H = feature.position[scale].height + this.featureSpacing;
      feature.position[scale].W = feature.position[scale].width + this.featureSpacing;
      if (this.labels && this.labels !== 'overlay' && feature.label) {
        feature.position[scale].H += this.fontHeight + this.featureSpacing;
        feature.position[scale].W  = Math.max(feature.position[scale].labelWidth, feature.position[scale].W);
        params.width               = Math.max(feature.position[scale].X + feature.position[scale].labelWidth, params.width);
      }
    }


    if (this.bump && !feature.position[scale].bumped) {
      this.bumpFeature(feature, scale);
    } else if (!this.bump) {
      this.featurePositions.insert({x: feature.position[scale].start, y:0, w: feature.position[scale].W, h:1}, feature);
    }

    params.height = Math.max(params.height, feature.position[params.scale].Y + feature.position[params.scale].H);
  },


  bumpFeature: function (feature, scale) {
    var bounds = { 
      x: feature.position[scale].start,
      w: feature.position[scale].W, 
      y: feature.position[scale].Y, 
      h: feature.position[scale].H
    };
    
    var bump;

    do {
      bump = false;

      if (this.featurePositions.search(bounds).length) {
        bounds.y += bounds.h;
        bump = true;
      }
    } while (bump);

    this.featurePositions.insert(bounds, feature);
    feature.position[scale].Y = bounds.y;
    feature.position[scale].bumped = true;
  },


  render: function (features, img) {
    var params = img.data();
    params.features = features;

    this.scaleFeatures(features, params.scale);
    this.positionFeatures(features, params);

    var canvas  = $('<canvas />').attr({ width: params.width, height: params.height || 1 })[0];
    var context = canvas.getContext('2d');
    context.font = this.font;
    context.textBaseline = 'top';

    this.draw(features, context, params.scale);

    img.width(params.width).attr('src', canvas.toDataURL());
    $(canvas).remove();
  },


  draw: function(features, context, scale) {
    for (var i=0; i<features.length; i++) {
      var feature = features[i];
      this.drawFeature(
        $.extend({}, feature, {
          x          : feature.position[scale].X,
          y          : feature.position[scale].Y,
          width      : feature.position[scale].width,
          height     : feature.position[scale].height,
          labelWidth : feature.position[scale].labelWidth,
        }), 
        context,
        scale
      );
    }
  },


  drawFeature: function(feature, context, scale) {
    context.fillStyle = feature.color || this.color;
    context.fillRect(Math.floor(feature.x), feature.y, Math.max(1, Math.floor(feature.width)), feature.height);

    if (this.labels && feature.label) {
      context.fillStyle = feature.labelColor || feature.color || this.color;
      if (this.labels === 'overlay') {
        if (feature.labelWidth < feature.width)
          context.fillText(feature.label, (feature.x < -feature.labelWidth && feature.x + feature.width > feature.labelWidth) ? 0 : feature.x, feature.y);
      } else {
        context.fillText(feature.label, (feature.x < -feature.labelWidth && feature.x + feature.width > feature.labelWidth) ? 0 : feature.x, feature.y + feature.height);
      }
    }
  },


  showError: function (error) {
    console.log(error);
    this.showMessage('ERROR', error.message);

    //console.log(arguments);
    // if (!this.errorMessage) {
    //   this.errorMessage = this.browser.setTracks([{ type: 'Error', track: this }], this.browser.tracks.length)[0];
    // }
    // this.errorMessage.draw(this.imgContainers[0], error);
    // deferred.resolve({ target: image.images, img: image }); 
  },
  

  parseUrl: function (start, end, url) {
    var chr = this.browser.chr;
    var url = url || this.url;

    return url.replace(/__CHR__/, chr).replace(/__START__/, start).replace(/__END__/, end);
  },


  renderBackground: function (img) {
    var canvas  = $('<canvas />').attr({ width: this.width, height: 1 })[0];
    this.drawBackground(img.data(), canvas.getContext('2d'));
    img.attr('src', canvas.toDataURL());
    $(canvas).remove();
  },


  drawBackground: function (data, context) {
    // // Draw background color
    // context.fillStyle = this.background || this.browser.colors.background;
    // context.fillRect(0, 0, context.canvas.width, 1);

    // // Draw guidelines
    // var guideLines  = { major: [ this.browser.colors.majorGuideLine, this.browser.majorUnit ], minor: [ this.browser.colors.minorGuideLine, this.browser.minorUnit ] };
    // var scaledStart = Math.round(data.scaledStart);
    // var x;
    
    // for (var c in guideLines) {
    //   context.fillStyle = guideLines[c][0];
      
    //   for (x = Math.max(data.start - (data.start % guideLines[c][1]), 0); x < data.end + this.browser.minorUnit; x += guideLines[c][1]) {
    //     context.fillRect((this.browser.guideLines[c][x] || 0) - scaledStart, 0, 1, context.canvas.height);
    //   }
    // }
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
    return feature;
  },


  show: function () {
    this.hidden = false; 
    this.resize(this.initialHeight);
  },


  hide: function () {
    this.hidden = true; 
    this.resize(0);
  },


  disable: function () {
    this.hide();
    $(this.imgContainers).remove();
    this.reset();    
    this.disabled = true;
  },


  enable: function () {
    this.show(); 
    this.disabled = false;

    this.makeImage(this.browser.start, this.browser.end, this.width, -this.browser.left);
  },



  message: function (text) {
    this.messageContainer.append(text);
  },

  decorateFeatures    : $.noop, // decoration for the features
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


Genoverse.Track.on('afterRender', function () {
  this.checkHeight();
});


String.prototype.hashCode = function(){
    var hash = 0, i, char;
    if (this.length == 0) return hash;
    for (i = 0; i < this.length; i++) {
        char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return ""+hash;
};



Genoverse.Track.Scalebar = Genoverse.Track.extend({

  height        : 20,
  featureHeight : 6,
  spacing       : 0,
  color         : '#000000',
  autoHeight    : false,
  unsortable    : true,
  labels        : true,
  bump          : false,
  fixedHeight   : true,
  order         : 0,
  orderReverse  : 1e5,
  featureStrand : 1,
  controls      : 'off',
  guideLines    : {},
  guideLinesByScale : {},
  //inherit       : [ 'Stranded' ],
  colors           : {
    background     : '#FFFFFF',
    majorGuideLine : '#CCCCCC',
    minorGuideLine : '#E5E5E5',
    sortHandle     : '#CFD4E7'
  },


  addDomElements: function () {
    this.base();
    this.container.css({ overflow: 'visible' });
  },


  setScale: function () {
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

    this.dataRegion = { start: 9e99, end: -9e99 };
    
    this.minorUnit = minorUnit;
    this.majorUnit = majorUnit;
    this.seen      = {};
    this.features  = new RTree();
    this.featuresById = {};

    if (!this.guideLinesByScale[this.scale]) {
      this.guideLinesByScale[this.scale] = { major: {}, minor: {} };
    }
    
    this.guideLines = this.guideLinesByScale[this.scale];
    this.base();
  },


  makeImage: function (params) {

    // TODO: check params
    params.scaledStart = params.start*params.scale;
    params.height      = this.height || 0;
    params.width       = this.width;

    var cls     = ("scale_" + params.scale).replace('.','_');
    var div     = this.imgContainer.clone().width(this.width).addClass(cls).css('left', params.left);      
    var bgImage = $('<img class="bg guidelines" />')
                    .width(this.width)
                    .height(this.browser.wrapper.outerHeight(true))
                    .data(params)
                    .prependTo(div);
    var image   = $('<img class="data" />').data(params).appendTo(div);

    this.imgContainers.push(div[0]);
    this.scrollContainer.append(this.imgContainers);

    this.setGuideLines(params.start, params.end);

    this.render(this.findFeatures(params.start, params.end), image);
    this.renderBackground(bgImage);
  },


  setGuideLines: function (start, end) {
    var start = Math.max(start - (start % this.minorUnit) - this.majorUnit, 0);
    
    var flip     = (start / this.minorUnit) % 2 ? 1 : -1;
    var features = [];
    var feature, major, label;
    for (var x = start; x < end + this.minorUnit; x += this.minorUnit) {
      flip *= -1;
      
      if (this.seen[x]) {
        continue;
      }
      
      this.seen[x] = 1;
      
      feature = { id: x, start: x, strand: 1 };
      major   = x && !(x % this.majorUnit);
      
      if (flip === 1) {
        feature.end = x + this.minorUnit - 1;
      } else {
        feature.end = x;
      }
      
      if (major) {
        feature.major = true;
        feature.label = this.formatLabel(x);
      }

      this.insertFeature(feature);
      features.push(feature);
      this.guideLines[major ? 'major' : 'minor'][x] = Math.round(x * this.scale);
    }

    return features;
  },


  draw: function (features, context, scale) {
    var i = features.length;
    context.textBaseline = 'top';

    while (i--) {
      var feature = features[i];
      context.fillRect(Math.round(feature.position[scale].X), 0, Math.ceil(feature.position[scale].width), this.featureHeight/2);
      if (feature.major) {
        context.fillRect(Math.round(feature.position[scale].X), 0, 1, this.featureHeight);
        context.fillText(feature.label, feature.position[scale].X, this.featureHeight);
      }
    }
    
    context.fillRect(0, 0, context.canvas.width, 1);
    context.fillRect(0, this.featureHeight/2, context.canvas.width, 1);
  },


  drawBackground: function (data, context) {
    // Draw background color
    // context.fillStyle = this.background || this.browser.colors.background;
    // context.fillRect(0, 0, context.canvas.width, 1);

    // Draw guidelines
    var guideLines  = { major: [ this.colors.majorGuideLine, this.majorUnit ], minor: [ this.colors.minorGuideLine, this.minorUnit ] };
    var scaledStart = Math.round(data.scaledStart);
    var x;
    
    for (var c in guideLines) {
      context.fillStyle = guideLines[c][0];
      
      for (x = Math.max(data.start - (data.start % guideLines[c][1]), 0); x < data.end + this.minorUnit; x += guideLines[c][1]) {
        context.fillRect((this.guideLines[c][x] || 0) - scaledStart, 0, 1, context.canvas.height);
      }
    }
  },


});


Genoverse.Track.on('afterInit afterResize', function () {
  var height = 0;
  for (var i=0; i<this.browser.tracks.length; i++) {
    height += this.browser.tracks[i].height || 0;
  }

  $('.guidelines', this.browser.container).height(Math.max(height, this.browser.wrapper.outerHeight(true)));
});



Genoverse.Track.Sequence = Genoverse.Track.extend({

  // Defaults 
  name          : "Sequence",
  height        : 45,
  featureHeight : 20,
  featureSpacing: 0,
  yOffset       : 5,
  //complementary : true,
  chunkSize   : 1000,
  threshold   : 1e5,
  labelOverlay: true, 
  allData     : false,
  fontSize    : 10,
  fontFamily  : 'Verdana',
  fontWeight  : 'bold',
  dataType    : 'xml',
  fontColor   : '#FFFFFF',
  url         : 'http://www.ensembl.org/das/Homo_sapiens.GRCh37.reference/sequence?segment=__CHR__:__START__,__END__',

  colorMap      : {
    a : "#00986A",
    t : "#0772A1",
    g : "#FF8E00",
    c : "#FFDD73",
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

    this.context.font  = this.font;
    this.bpLabelWidths = {
      a : this.context.measureText('a').width,
      t : this.context.measureText('t').width,
      g : this.context.measureText('g').width,
      c : this.context.measureText('c').width,
      n : this.context.measureText('n').width
    };

    if (this.featureSpacing > 0) this.yOffset = this.featureSpacing;
    this.labelYOffset = this.featureHeight/2 - this.fontHeight/2;
  },


  parseUrl: function (start, end) {
    var start = start - start % this.chunkSize + 1;
    var end = end + this.chunkSize - end % this.chunkSize;
    return this.base(start, end);
  },


  parseData: function (data) {
    var track = this;

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
          id    : start + i,
          start : start + i,
          end   : start + i + track.chunkSize,
          y     : track.yOffset,
          sequence : sequence.substr(i, track.chunkSize),
        }
        track.chunks[feature.start] = feature;
        track.features.insert({ x: feature.start, w: track.chunkSize, y:0, h:1 }, feature);
      }

    });

  },


  draw: function (features, context, scale) {
    for (var i=0; i<features.length; i++) {
      this.drawSequence(features[i], context, scale);
    } 
  },


  drawSequence: function (feature, context, scale) {
    var bpWidth = scale;
    var drawLabels = this.bpLabelWidths.a < bpWidth;
    var labelsOffset = {
      a: (bpWidth - this.bpLabelWidths.a) / 2,
      t: (bpWidth - this.bpLabelWidths.t) / 2,
      g: (bpWidth - this.bpLabelWidths.g) / 2,
      c: (bpWidth - this.bpLabelWidths.c) / 2,
      n: (bpWidth - this.bpLabelWidths.n) / 2
    };

    for (var i = 0; i<feature.sequence.length; i++) {
      var bp = feature.sequence.substr(i,1);
      context.fillStyle = this.colorMap[bp];
      context.fillRect(feature.position[scale].X + i*bpWidth, feature.position[scale].Y, bpWidth, this.featureHeight);

      // if (complementary) {
      //   this.context.fillStyle = this.colorMap[this.complementaryMap[bp]];
      //   this.context.fillRect(scaledStart + i*bpWidth, yOffset + this.featureHeight, bpWidth, this.featureHeight);
      // }

      if (drawLabels) {
        context.fillStyle = this.fontColor;
        context.fillText(bp, feature.position[scale].X + i*bpWidth + (labelsOffset[bp] || labelsOffset.n), feature.position[scale].Y + this.labelYOffset);
        // if (complementary) {
        //   this.context.fillText(this.complementaryMap[bp], scaledStart + i*bpWidth + labelsOffset[this.complementaryMap[bp]], this.featureHeight + yOffset + this.labelYOffset);
        // }
      }
    }
  },


});



Genoverse.Track.Fasta = Genoverse.Track.Sequence.extend({

  // Defaults 
  name       : "Fasta",

  // Following settings could be left undefined and will be detected automatically via .getStartByte()
  startByte  : undefined, // Byte in the file where the sequence actually starts
  lineLength : undefined, // Length of the sequence line in the file

  getData: function (start, end) {
    var promise = $.Deferred();
    $.when(this.getStartByte()).done(function () {
      start = start - start % this.chunkSize + 1;
      end   = end + this.chunkSize - end % this.chunkSize;

      var startByte = start - 1 + Math.floor((start - 1) / this.lineLength) + this.startByte;
      var endByte   = end   - 1 + Math.floor((end   - 1) / this.lineLength) + this.startByte;

      $.ajax({
        url       : this.parseUrl(),
        dataType  : 'text',
        headers   : {
          'Range' : 'bytes='+ startByte +'-'+ endByte
        },
        context   : this, 
        xhrFields : this.xhrFields,
      }).done(function (sequence) {
        promise.resolveWith(this, [{
          start    : start,
          end      : end,
          sequence : sequence
        }]);
      }).fail(function () {
        promise.rejectWith(this, arguments);
      });
    });

    return promise;
  },

  getStartByte: function () {
    if (this.startByteRequest) 
      return this.startByteRequest;

    if (this.startByte === undefined || this.lineLength === undefined) {
      this.startByteRequest = $.ajax({
        url       : this.parseUrl(),
        dataType  : 'text',
        context   : this,
        headers   : {
          'Range' : 'bytes=0-300'
        },
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
  },

  parseData: function (data) {
    data.sequence = data.sequence.replace(/\n/g, "").toLowerCase();
    for (var i=0; i<data.sequence.length; i+=this.chunkSize) {
      if (this.chunks[data.start + i]) continue;
      var feature = {
        id       : data.start + i,
        start    : data.start + i,
        end      : data.start + i + this.chunkSize,
        y        : this.yOffset,
        sequence : data.sequence.substr(i, this.chunkSize),
      };
      
      this.chunks[feature.start] = feature;
      this.features.insert({ x: feature.start, w: this.chunkSize, y:0, h:1 }, feature);
    }

  },


});



Genoverse.Track.File = {

  // Defaults 
  name     : 'File',  
  dataType : 'text',
  allData  : true,
  url      : false,
  data     : '',


  getData  : function () {
    return $.Deferred().resolve(this.data);
  }

};



Genoverse.Track.VCF = Genoverse.Track.extend({

  // Defaults 
  name           : "VCF",  
  height         : 45,
  featureHeight  : 20,
  featureSpacing : 2,
  dataType       : 'text',
  labels         : 'overlay',
  color          : '#000000',

  parseData: function (text) {
    //debugger;
    var lines = text.split("\n");
    for (var i=0; i<lines.length; i++) {
      if (!lines[i].length || lines[i].indexOf('#') === 0) continue;

      var fields  = lines[i].split("\t");

      if (fields.length < 5) continue;

      if (fields[0] == this.browser.chr || fields[0] == 'chr' + this.browser.chr || fields[0].match('[^1-9]'+ this.browser.chr +'$')) {
        var chr     = fields[0];
        var start   = fields[1]*1;
        var alleles = fields[4].split(",");
        // Just some unique id
        var id      = fields.slice(0,5).join("|");

        for (var j=0; j<alleles.length; j++) {
          var end     = start + Math.max(fields[3].length, alleles[j].length);
          
          var feature = {
            id     : id,
            start  : start,
            end    : end,
            width  : end - start,
            allele : alleles[j],
            label  : alleles[j],
            labelColor: 'white',
            originalFeature: fields,
          };
          this.insertFeature(feature);        
        }
      }

    }
  },


  populateMenu: function (feature) {
    return {
      title  : '<a target=_blank href="http://www.1000genomes.org/node/101">VCF feature details</a>',
      CHROM  : feature.originalFeature[0],
      POS    : feature.originalFeature[1],
      ID     : feature.originalFeature[2],
      REF    : feature.originalFeature[3],
      ALT    : feature.originalFeature[4],
      QUAL   : feature.originalFeature[5],
      FILTER : feature.originalFeature[6],
      INFO   : feature.originalFeature[7].split(';').join('<br>')
    };
  },


});



Genoverse.Track.BED = Genoverse.Track.extend({

  // Defaults 
  name           : "BED",
  height         : 45,
  featureHeight  : 5,
  featureSpacing : 2,
  bump           : true,
  dataType       : 'text',
  color          : '#000000',
  labels         : true,

  parseData: function (text) {
    var lines = text.split("\n");

    for (var i=0; i<lines.length; i++) {

      var fields = lines[i].split("\t");
      if (fields.length < 3 || fields[0] != 'chr' + this.browser.chr) continue;

      var start = fields[1]*1;
      var end   = fields[2]*1;
      var id    = fields[1] + '-' + fields[3];
      var score = isNaN(parseFloat(fields[4])) ? 1000 : fields[4];
      var color = "#000000";

      if (fields[8]) {
        color = 'rgb('+ fields[8] +')';
      } else if (!isNaN(parseFloat(fields[4]))) {
        color = this.scoreColor(fields[4]);
      }

      this.insertFeature({
        start : start,
        end   : end,
        id    : id,
        label : fields[3],
        color : color,
        originalFeature : fields,
      });
    }
  },

  // As per https://genome.ucsc.edu/FAQ/FAQformat.html#format1 specification
  scoreColor: function (score) {
    if (score <=166) return 'rgb(219,219,219)';
    if (score <=277) return 'rgb(186,186,186)'; 
    if (score <=388) return 'rgb(154,154,154)'; 
    if (score <=499) return 'rgb(122,122,122)'; 
    if (score <=611) return 'rgb(94,94,94)'; 
    if (score <=722) return 'rgb(67,67,67)'; 
    if (score <=833) return 'rgb(42,42,42)'; 
    if (score <=944) return 'rgb(21,21,21)'; 
    return "#000000";
  },


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
      blockStarts : feature.originalFeature[11],
    };
  },

});



Genoverse.Track.GFF3 = Genoverse.Track.extend({

  // Defaults 
  name           : "GFF3",
  height         : 100,
  featureHeight  : 8,
  featureSpacing : 2,
  bump           : true,
  dataType       : 'text',
  labels         : true,
  color          : '#000000',


  parseData: function (text) {
    //debugger;
    var lines = text.split("\n");
    for (var i=0; i<lines.length; i++) {
      if (!lines[i].length || lines[i].indexOf('#') === 0) continue;

      var fields  = lines[i].split("\t");

      if (fields.length < 5) continue;

      if (fields[0] == this.browser.chr || fields[0] == 'chr' + this.browser.chr || fields[0].match('[^1-9]'+ this.browser.chr +'$')) {
        var feature = {};

        if (fields[8]) {
          var frame = fields[8].split(';');
          for (var j=0; j<frame.length; j++) {
            var keyValue = frame[j].split('=');
            if (keyValue.length == 2) feature[keyValue[0].toLowerCase()] = keyValue[1];
          }
        }

        feature.start  = fields[3]*1;
        feature.end    = fields[4]*1;
        feature.id     = feature.id || fields.slice(0,5).join("|");

        feature.source = fields[1];
        feature.type   = fields[2];
        feature.score  = fields[5];
        feature.strand = fields[6];

        // Assuming here that parent always goes first in the GFF file, 
        // which seems to be the case for most examples
        if (feature.parent) {
          this.featuresById[feature.parent].parts.push(feature);
        } else {
          feature.label  = feature.name || feature.id || '';
          feature.parts = [];
          this.insertFeature(feature);
        }

      }
    }
  },


  drawFeature: function(feature, context, scale) {
    if (!feature.parts || !feature.parts.length) return this.base(feature, context, scale);

    context.fillRect(Math.floor(feature.x), Math.floor(feature.y + feature.height/2), Math.max(1, Math.floor(feature.width)), 0.5);

    for (var i=0; i<feature.parts.length; i++) {
      var part = feature.parts[i];
      this.base(
        $.extend({}, part, {
          x: feature.x + (part.start - feature.start) * scale, 
          y: feature.y,
          width: (part.end - part.start) * scale,
          height: feature.height
        }),
        context, 
        scale
      );
    }

    context.fillStyle = 'black';
    context.fillText(feature.label, feature.x, feature.y + feature.height + 2);
  },


});



Genoverse.Track.DAS = Genoverse.Track.extend({

  // Defualts 
  dataType : 'xml',

  init: function () {

    if (!this.url) this.url = this.source + '/features?segment=__CHR__:__START__,__END__';

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
    this.base();
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


  drawFeature: function (feature, context, scale) {
    var style = feature.style || this.stylesheet[feature.type] || this.stylesheet.default;

    feature.x = Math.floor(feature.x) + 0.5;
    feature.y = Math.floor(feature.y) + 0.5;
    feature.width = Math.floor(feature.width);

    // controlY and middleY for line, hat and bezierCurve
    feature.controlY = (feature.orientation == '-') ? feature.y + this.featureHeight : feature.y;
    feature.middleY  = feature.y + this.featureHeight/2;


    context.lineWidth = 1;

    switch (style.type) {

      // case 'line' :
      //   this.context.strokeStyle = style.fgcolor;
      //   this.context.strokeRect(bounds.x, bounds.middleY, bounds.w, 0);
      // break;

      case 'hat' :
        context.strokeStyle = style.fgcolor;
        context.lineWidth = 0.5;
        context.beginPath();
        context.moveTo(feature.x, feature.middleY);
        context.lineTo(feature.x + feature.width/2, feature.controlY);
        context.lineTo(feature.x + feature.width, feature.middleY);
        context.stroke();
        context.closePath();
      break;

      case 'bezierCurve' :
        context.strokeStyle = style.fgcolor;
        context.lineWidth   = 0.4;
        context.beginPath();
        context.moveTo(feature.x, feature.middleY);
        context.bezierCurveTo(feature.x, feature.controlY, feature.x + feature.width, feature.controlY, feature.x + feature.width, feature.middleY);
        context.stroke();
        context.closePath();
      break;

      case 'triangle' :
        context.strokeStyle = style.fgcolor;
        context.beginPath();
        context.moveTo(feature.x, feature.y);
        context.lineTo(feature.x, feature.y + this.featureHeight);
        context.lineTo(feature.x + feature.width, feature.middleY);
        context.lineTo(feature.x, feature.y);
        context.stroke();
        context.closePath();
      break;

      case 'box':
        if (!style.bgcolor || style.bgcolor == this.mapColor('white')) {
          context.strokeStyle = style.fgcolor;
          context.strokeRect(feature.x, feature.y, feature.width, feature.height);
        } else {
          context.fillStyle = style.bgcolor;
          context.fillRect(feature.x, feature.y, feature.width, feature.height);
          if (style.fgcolor) {
            context.strokeStyle = style.fgcolor;
            context.strokeRect(feature.x, feature.y, feature.width, feature.height);
          }
        }
      break;

      default:
        context.strokeStyle = style.fgcolor;
        context.strokeRect(feature.x, feature.y, feature.width, feature.height);
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


  parseData: function (data) {
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
      feature.width = feature.end - feature.start + 1;

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



Genoverse.Track.DAS.Transcript = Genoverse.Track.DAS.extend({

  name           : "Transcript (DAS)", 
  dataType       : 'xml',
  bump           : true,
  height         : 200,
  dataBuffer     : 30000,
  source         : 'http://www.ensembl.org/das/Homo_sapiens.GRCh37.transcript',
  featureHeight  : 10,
  featureSpacing : 3,
  labels         : true,
  intronStyle    : { 
    type: 'bezierCurve',
    fgcolor: 'black',
  },


  parseData: function (data) {
    var track = this;
    var exons = track.base(data);
    this.groupExons(exons);
  },


  groupExons: function (exons) {
    //if (!this.groups) this.groups = {};
    
    for (var i=0; i<exons.length; i++) {

      var exon = exons[i];
      if (!exon.start || !exon.end) continue;

      //this.setFeatureStyle(exon);

      if (exon.groups) {

        for (var j=0; j<exon.groups.length; j++) {
          if (this.display && this.display.group && !this.display.group[exon.groups[j].type]) continue;

          if (this.featuresById[exon.groups[j].id]) {
            var transcript  = this.featuresById[exon.groups[j].id];

            //if (!transcript.new) {
              this.features.remove({ x: transcript.start, w: transcript.width, y:0, h:1 }, transcript);
              this.redraw    = true;
              transcript.new = true;
            //}

            transcript.start = Math.min(transcript.start, exon.start);
            transcript.end   = Math.max(transcript.end,   exon.end);
            transcript.width = transcript.end - transcript.start + 1;
          } else {
            this.featuresById[exon.groups[j].id] = $.extend({
              exons       : [],
              start       : exon.start,
              end         : exon.end,
              new         : true
            }, exon.groups[j]);
          }

          this.featuresById[exon.groups[j].id].exons.push(exon);
        }

      }
    }

    for (id in this.featuresById) {
      var transcript = this.featuresById[id];
      if (transcript.new) {
        transcript.new = false;
        if (!transcript.label) transcript.label = transcript.id;
        transcript.exons.sort(function (a, b) { var s = a.start - b.start; return s ? s : a.width - b.width });
        for (var i=0; i<transcript.exons.length; i++) {
          transcript.exons[i].localStart = transcript.exons[i].start - transcript.start;
          transcript.exons[i].localEnd   = transcript.exons[i].end - transcript.start;
        }
        //transcript.type = 'group';

        delete this.featuresById[transcript.id];
        this.insertFeature(transcript);
      }
    }
  },


  render: function (features, img) {
    if (this.redraw) {
      this.redraw = false;
      return this.reDraw();
    }

    var track = this;
    var base  = this.base;

    $.when(track.stylesheetRequest).always(function(){
      base.apply(track, [features, img]);
    });
  },


  drawFeature: function(transcript, context, scale) {
    if (!transcript.exons || !transcript.exons.length) return;

    for (var i=0; i<transcript.exons.length; i++) {
      var exon = transcript.exons[i];
      this.base(
        $.extend({}, exon, {
          x: transcript.x + (exon.localStart * scale), 
          y: transcript.y,
          width: exon.width * scale,
          height: transcript.height
        }),
        context, 
        scale
      );

      // Introns (connections between exons)
      if (transcript.exons[i+1] && exon.end < transcript.exons[i+1].start) {
        this.base(
          {
            x: transcript.x + (exon.localStart + exon.width)*scale,
            y: transcript.y,
            width: (transcript.exons[i+1].start - exon.end)*scale,
            orientation: exon.orientation,
            style: this.intronStyle
          },
          context, 
          scale
        );
      }
    }

    context.fillStyle = 'black';
    context.fillText(transcript.label, transcript.x, transcript.y + transcript.height + 2);
  },

});




var thisScriptTag = $('script:last');          
var config = thisScriptTag.text();             
if (config) {                                  
  try {                                        
    config = eval('('+ config +')');           
    $(document).ready(function(){              
      window.genoverse = new Genoverse(config) 
    });                                        
  } catch (e) {                                
    throw('Configuration ERROR:' + e);         
  };                                           
}                                              
})();                                          
$.noConflict(true);