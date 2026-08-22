function nm(e,t){for(var n=0;n<t.length;n++){const r=t[n];if(typeof r!="string"&&!Array.isArray(r)){for(const s in r)if(s!=="default"&&!(s in e)){const i=Object.getOwnPropertyDescriptor(r,s);i&&Object.defineProperty(e,s,i.get?i:{enumerable:!0,get:()=>r[s]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();function rm(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Qc={exports:{}},Wi={},Kc={exports:{}},J={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var js=Symbol.for("react.element"),sm=Symbol.for("react.portal"),im=Symbol.for("react.fragment"),am=Symbol.for("react.strict_mode"),lm=Symbol.for("react.profiler"),om=Symbol.for("react.provider"),um=Symbol.for("react.context"),cm=Symbol.for("react.forward_ref"),dm=Symbol.for("react.suspense"),fm=Symbol.for("react.memo"),pm=Symbol.for("react.lazy"),ou=Symbol.iterator;function mm(e){return e===null||typeof e!="object"?null:(e=ou&&e[ou]||e["@@iterator"],typeof e=="function"?e:null)}var Gc={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Yc=Object.assign,Xc={};function kr(e,t,n){this.props=e,this.context=t,this.refs=Xc,this.updater=n||Gc}kr.prototype.isReactComponent={};kr.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};kr.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Jc(){}Jc.prototype=kr.prototype;function Jl(e,t,n){this.props=e,this.context=t,this.refs=Xc,this.updater=n||Gc}var Zl=Jl.prototype=new Jc;Zl.constructor=Jl;Yc(Zl,kr.prototype);Zl.isPureReactComponent=!0;var uu=Array.isArray,Zc=Object.prototype.hasOwnProperty,eo={current:null},ed={key:!0,ref:!0,__self:!0,__source:!0};function td(e,t,n){var r,s={},i=null,a=null;if(t!=null)for(r in t.ref!==void 0&&(a=t.ref),t.key!==void 0&&(i=""+t.key),t)Zc.call(t,r)&&!ed.hasOwnProperty(r)&&(s[r]=t[r]);var o=arguments.length-2;if(o===1)s.children=n;else if(1<o){for(var u=Array(o),c=0;c<o;c++)u[c]=arguments[c+2];s.children=u}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)s[r]===void 0&&(s[r]=o[r]);return{$$typeof:js,type:e,key:i,ref:a,props:s,_owner:eo.current}}function hm(e,t){return{$$typeof:js,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function to(e){return typeof e=="object"&&e!==null&&e.$$typeof===js}function gm(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var cu=/\/+/g;function ga(e,t){return typeof e=="object"&&e!==null&&e.key!=null?gm(""+e.key):t.toString(36)}function ti(e,t,n,r,s){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var a=!1;if(e===null)a=!0;else switch(i){case"string":case"number":a=!0;break;case"object":switch(e.$$typeof){case js:case sm:a=!0}}if(a)return a=e,s=s(a),e=r===""?"."+ga(a,0):r,uu(s)?(n="",e!=null&&(n=e.replace(cu,"$&/")+"/"),ti(s,t,n,"",function(c){return c})):s!=null&&(to(s)&&(s=hm(s,n+(!s.key||a&&a.key===s.key?"":(""+s.key).replace(cu,"$&/")+"/")+e)),t.push(s)),1;if(a=0,r=r===""?".":r+":",uu(e))for(var o=0;o<e.length;o++){i=e[o];var u=r+ga(i,o);a+=ti(i,t,n,u,s)}else if(u=mm(e),typeof u=="function")for(e=u.call(e),o=0;!(i=e.next()).done;)i=i.value,u=r+ga(i,o++),a+=ti(i,t,n,u,s);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return a}function Is(e,t,n){if(e==null)return e;var r=[],s=0;return ti(e,r,"","",function(i){return t.call(n,i,s++)}),r}function vm(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var nt={current:null},ni={transition:null},ym={ReactCurrentDispatcher:nt,ReactCurrentBatchConfig:ni,ReactCurrentOwner:eo};function nd(){throw Error("act(...) is not supported in production builds of React.")}J.Children={map:Is,forEach:function(e,t,n){Is(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Is(e,function(){t++}),t},toArray:function(e){return Is(e,function(t){return t})||[]},only:function(e){if(!to(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};J.Component=kr;J.Fragment=im;J.Profiler=lm;J.PureComponent=Jl;J.StrictMode=am;J.Suspense=dm;J.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ym;J.act=nd;J.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Yc({},e.props),s=e.key,i=e.ref,a=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,a=eo.current),t.key!==void 0&&(s=""+t.key),e.type&&e.type.defaultProps)var o=e.type.defaultProps;for(u in t)Zc.call(t,u)&&!ed.hasOwnProperty(u)&&(r[u]=t[u]===void 0&&o!==void 0?o[u]:t[u])}var u=arguments.length-2;if(u===1)r.children=n;else if(1<u){o=Array(u);for(var c=0;c<u;c++)o[c]=arguments[c+2];r.children=o}return{$$typeof:js,type:e.type,key:s,ref:i,props:r,_owner:a}};J.createContext=function(e){return e={$$typeof:um,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:om,_context:e},e.Consumer=e};J.createElement=td;J.createFactory=function(e){var t=td.bind(null,e);return t.type=e,t};J.createRef=function(){return{current:null}};J.forwardRef=function(e){return{$$typeof:cm,render:e}};J.isValidElement=to;J.lazy=function(e){return{$$typeof:pm,_payload:{_status:-1,_result:e},_init:vm}};J.memo=function(e,t){return{$$typeof:fm,type:e,compare:t===void 0?null:t}};J.startTransition=function(e){var t=ni.transition;ni.transition={};try{e()}finally{ni.transition=t}};J.unstable_act=nd;J.useCallback=function(e,t){return nt.current.useCallback(e,t)};J.useContext=function(e){return nt.current.useContext(e)};J.useDebugValue=function(){};J.useDeferredValue=function(e){return nt.current.useDeferredValue(e)};J.useEffect=function(e,t){return nt.current.useEffect(e,t)};J.useId=function(){return nt.current.useId()};J.useImperativeHandle=function(e,t,n){return nt.current.useImperativeHandle(e,t,n)};J.useInsertionEffect=function(e,t){return nt.current.useInsertionEffect(e,t)};J.useLayoutEffect=function(e,t){return nt.current.useLayoutEffect(e,t)};J.useMemo=function(e,t){return nt.current.useMemo(e,t)};J.useReducer=function(e,t,n){return nt.current.useReducer(e,t,n)};J.useRef=function(e){return nt.current.useRef(e)};J.useState=function(e){return nt.current.useState(e)};J.useSyncExternalStore=function(e,t,n){return nt.current.useSyncExternalStore(e,t,n)};J.useTransition=function(){return nt.current.useTransition()};J.version="18.3.1";Kc.exports=J;var y=Kc.exports;const rd=rm(y),xm=nm({__proto__:null,default:rd},[y]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var wm=y,Sm=Symbol.for("react.element"),Nm=Symbol.for("react.fragment"),jm=Object.prototype.hasOwnProperty,Em=wm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,km={key:!0,ref:!0,__self:!0,__source:!0};function sd(e,t,n){var r,s={},i=null,a=null;n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(a=t.ref);for(r in t)jm.call(t,r)&&!km.hasOwnProperty(r)&&(s[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)s[r]===void 0&&(s[r]=t[r]);return{$$typeof:Sm,type:e,key:i,ref:a,props:s,_owner:Em.current}}Wi.Fragment=Nm;Wi.jsx=sd;Wi.jsxs=sd;Qc.exports=Wi;var l=Qc.exports,Ga={},id={exports:{}},vt={},ad={exports:{}},ld={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(_,D){var E=_.length;_.push(D);e:for(;0<E;){var b=E-1>>>1,U=_[b];if(0<s(U,D))_[b]=D,_[E]=U,E=b;else break e}}function n(_){return _.length===0?null:_[0]}function r(_){if(_.length===0)return null;var D=_[0],E=_.pop();if(E!==D){_[0]=E;e:for(var b=0,U=_.length,G=U>>>1;b<G;){var Q=2*(b+1)-1,ee=_[Q],H=Q+1,M=_[H];if(0>s(ee,E))H<U&&0>s(M,ee)?(_[b]=M,_[H]=E,b=H):(_[b]=ee,_[Q]=E,b=Q);else if(H<U&&0>s(M,E))_[b]=M,_[H]=E,b=H;else break e}}return D}function s(_,D){var E=_.sortIndex-D.sortIndex;return E!==0?E:_.id-D.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;e.unstable_now=function(){return i.now()}}else{var a=Date,o=a.now();e.unstable_now=function(){return a.now()-o}}var u=[],c=[],m=1,f=null,g=3,x=!1,j=!1,N=!1,S=typeof setTimeout=="function"?setTimeout:null,d=typeof clearTimeout=="function"?clearTimeout:null,p=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function h(_){for(var D=n(c);D!==null;){if(D.callback===null)r(c);else if(D.startTime<=_)r(c),D.sortIndex=D.expirationTime,t(u,D);else break;D=n(c)}}function w(_){if(N=!1,h(_),!j)if(n(u)!==null)j=!0,Le(C);else{var D=n(c);D!==null&&P(w,D.startTime-_)}}function C(_,D){j=!1,N&&(N=!1,d(A),A=-1),x=!0;var E=g;try{for(h(D),f=n(u);f!==null&&(!(f.expirationTime>D)||_&&!ie());){var b=f.callback;if(typeof b=="function"){f.callback=null,g=f.priorityLevel;var U=b(f.expirationTime<=D);D=e.unstable_now(),typeof U=="function"?f.callback=U:f===n(u)&&r(u),h(D)}else r(u);f=n(u)}if(f!==null)var G=!0;else{var Q=n(c);Q!==null&&P(w,Q.startTime-D),G=!1}return G}finally{f=null,g=E,x=!1}}var k=!1,L=null,A=-1,Z=5,B=-1;function ie(){return!(e.unstable_now()-B<Z)}function le(){if(L!==null){var _=e.unstable_now();B=_;var D=!0;try{D=L(!0,_)}finally{D?be():(k=!1,L=null)}}else k=!1}var be;if(typeof p=="function")be=function(){p(le)};else if(typeof MessageChannel<"u"){var te=new MessageChannel,Ze=te.port2;te.port1.onmessage=le,be=function(){Ze.postMessage(null)}}else be=function(){S(le,0)};function Le(_){L=_,k||(k=!0,be())}function P(_,D){A=S(function(){_(e.unstable_now())},D)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(_){_.callback=null},e.unstable_continueExecution=function(){j||x||(j=!0,Le(C))},e.unstable_forceFrameRate=function(_){0>_||125<_?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Z=0<_?Math.floor(1e3/_):5},e.unstable_getCurrentPriorityLevel=function(){return g},e.unstable_getFirstCallbackNode=function(){return n(u)},e.unstable_next=function(_){switch(g){case 1:case 2:case 3:var D=3;break;default:D=g}var E=g;g=D;try{return _()}finally{g=E}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(_,D){switch(_){case 1:case 2:case 3:case 4:case 5:break;default:_=3}var E=g;g=_;try{return D()}finally{g=E}},e.unstable_scheduleCallback=function(_,D,E){var b=e.unstable_now();switch(typeof E=="object"&&E!==null?(E=E.delay,E=typeof E=="number"&&0<E?b+E:b):E=b,_){case 1:var U=-1;break;case 2:U=250;break;case 5:U=1073741823;break;case 4:U=1e4;break;default:U=5e3}return U=E+U,_={id:m++,callback:D,priorityLevel:_,startTime:E,expirationTime:U,sortIndex:-1},E>b?(_.sortIndex=E,t(c,_),n(u)===null&&_===n(c)&&(N?(d(A),A=-1):N=!0,P(w,E-b))):(_.sortIndex=U,t(u,_),j||x||(j=!0,Le(C))),_},e.unstable_shouldYield=ie,e.unstable_wrapCallback=function(_){var D=g;return function(){var E=g;g=D;try{return _.apply(this,arguments)}finally{g=E}}}})(ld);ad.exports=ld;var Cm=ad.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Pm=y,gt=Cm;function O(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var od=new Set,rs={};function Gn(e,t){vr(e,t),vr(e+"Capture",t)}function vr(e,t){for(rs[e]=t,e=0;e<t.length;e++)od.add(t[e])}var Jt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Ya=Object.prototype.hasOwnProperty,Rm=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,du={},fu={};function bm(e){return Ya.call(fu,e)?!0:Ya.call(du,e)?!1:Rm.test(e)?fu[e]=!0:(du[e]=!0,!1)}function _m(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Tm(e,t,n,r){if(t===null||typeof t>"u"||_m(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function rt(e,t,n,r,s,i,a){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=s,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=a}var qe={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){qe[e]=new rt(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];qe[t]=new rt(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){qe[e]=new rt(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){qe[e]=new rt(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){qe[e]=new rt(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){qe[e]=new rt(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){qe[e]=new rt(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){qe[e]=new rt(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){qe[e]=new rt(e,5,!1,e.toLowerCase(),null,!1,!1)});var no=/[\-:]([a-z])/g;function ro(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(no,ro);qe[t]=new rt(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(no,ro);qe[t]=new rt(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(no,ro);qe[t]=new rt(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){qe[e]=new rt(e,1,!1,e.toLowerCase(),null,!1,!1)});qe.xlinkHref=new rt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){qe[e]=new rt(e,1,!1,e.toLowerCase(),null,!0,!0)});function so(e,t,n,r){var s=qe.hasOwnProperty(t)?qe[t]:null;(s!==null?s.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Tm(t,n,s,r)&&(n=null),r||s===null?bm(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):s.mustUseProperty?e[s.propertyName]=n===null?s.type===3?!1:"":n:(t=s.attributeName,r=s.attributeNamespace,n===null?e.removeAttribute(t):(s=s.type,n=s===3||s===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var rn=Pm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,zs=Symbol.for("react.element"),Zn=Symbol.for("react.portal"),er=Symbol.for("react.fragment"),io=Symbol.for("react.strict_mode"),Xa=Symbol.for("react.profiler"),ud=Symbol.for("react.provider"),cd=Symbol.for("react.context"),ao=Symbol.for("react.forward_ref"),Ja=Symbol.for("react.suspense"),Za=Symbol.for("react.suspense_list"),lo=Symbol.for("react.memo"),on=Symbol.for("react.lazy"),dd=Symbol.for("react.offscreen"),pu=Symbol.iterator;function Ar(e){return e===null||typeof e!="object"?null:(e=pu&&e[pu]||e["@@iterator"],typeof e=="function"?e:null)}var Ne=Object.assign,va;function Vr(e){if(va===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);va=t&&t[1]||""}return`
`+va+e}var ya=!1;function xa(e,t){if(!e||ya)return"";ya=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(c){var r=c}Reflect.construct(e,[],t)}else{try{t.call()}catch(c){r=c}e.call(t.prototype)}else{try{throw Error()}catch(c){r=c}e()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var s=c.stack.split(`
`),i=r.stack.split(`
`),a=s.length-1,o=i.length-1;1<=a&&0<=o&&s[a]!==i[o];)o--;for(;1<=a&&0<=o;a--,o--)if(s[a]!==i[o]){if(a!==1||o!==1)do if(a--,o--,0>o||s[a]!==i[o]){var u=`
`+s[a].replace(" at new "," at ");return e.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",e.displayName)),u}while(1<=a&&0<=o);break}}}finally{ya=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Vr(e):""}function Om(e){switch(e.tag){case 5:return Vr(e.type);case 16:return Vr("Lazy");case 13:return Vr("Suspense");case 19:return Vr("SuspenseList");case 0:case 2:case 15:return e=xa(e.type,!1),e;case 11:return e=xa(e.type.render,!1),e;case 1:return e=xa(e.type,!0),e;default:return""}}function el(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case er:return"Fragment";case Zn:return"Portal";case Xa:return"Profiler";case io:return"StrictMode";case Ja:return"Suspense";case Za:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case cd:return(e.displayName||"Context")+".Consumer";case ud:return(e._context.displayName||"Context")+".Provider";case ao:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case lo:return t=e.displayName||null,t!==null?t:el(e.type)||"Memo";case on:t=e._payload,e=e._init;try{return el(e(t))}catch{}}return null}function Lm(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return el(t);case 8:return t===io?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function kn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function fd(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Dm(e){var t=fd(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var s=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return s.call(this)},set:function(a){r=""+a,i.call(this,a)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(a){r=""+a},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Ms(e){e._valueTracker||(e._valueTracker=Dm(e))}function pd(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=fd(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function vi(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function tl(e,t){var n=t.checked;return Ne({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function mu(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=kn(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function md(e,t){t=t.checked,t!=null&&so(e,"checked",t,!1)}function nl(e,t){md(e,t);var n=kn(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?rl(e,t.type,n):t.hasOwnProperty("defaultValue")&&rl(e,t.type,kn(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function hu(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function rl(e,t,n){(t!=="number"||vi(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var qr=Array.isArray;function dr(e,t,n,r){if(e=e.options,t){t={};for(var s=0;s<n.length;s++)t["$"+n[s]]=!0;for(n=0;n<e.length;n++)s=t.hasOwnProperty("$"+e[n].value),e[n].selected!==s&&(e[n].selected=s),s&&r&&(e[n].defaultSelected=!0)}else{for(n=""+kn(n),t=null,s=0;s<e.length;s++){if(e[s].value===n){e[s].selected=!0,r&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}function sl(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(O(91));return Ne({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function gu(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(O(92));if(qr(n)){if(1<n.length)throw Error(O(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:kn(n)}}function hd(e,t){var n=kn(t.value),r=kn(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function vu(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function gd(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function il(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?gd(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Us,vd=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,s){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,s)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Us=Us||document.createElement("div"),Us.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Us.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function ss(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Kr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Am=["Webkit","ms","Moz","O"];Object.keys(Kr).forEach(function(e){Am.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Kr[t]=Kr[e]})});function yd(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Kr.hasOwnProperty(e)&&Kr[e]?(""+t).trim():t+"px"}function xd(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,s=yd(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,s):e[n]=s}}var Im=Ne({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function al(e,t){if(t){if(Im[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(O(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(O(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(O(61))}if(t.style!=null&&typeof t.style!="object")throw Error(O(62))}}function ll(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ol=null;function oo(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ul=null,fr=null,pr=null;function yu(e){if(e=Cs(e)){if(typeof ul!="function")throw Error(O(280));var t=e.stateNode;t&&(t=Xi(t),ul(e.stateNode,e.type,t))}}function wd(e){fr?pr?pr.push(e):pr=[e]:fr=e}function Sd(){if(fr){var e=fr,t=pr;if(pr=fr=null,yu(e),t)for(e=0;e<t.length;e++)yu(t[e])}}function Nd(e,t){return e(t)}function jd(){}var wa=!1;function Ed(e,t,n){if(wa)return e(t,n);wa=!0;try{return Nd(e,t,n)}finally{wa=!1,(fr!==null||pr!==null)&&(jd(),Sd())}}function is(e,t){var n=e.stateNode;if(n===null)return null;var r=Xi(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(O(231,t,typeof n));return n}var cl=!1;if(Jt)try{var Ir={};Object.defineProperty(Ir,"passive",{get:function(){cl=!0}}),window.addEventListener("test",Ir,Ir),window.removeEventListener("test",Ir,Ir)}catch{cl=!1}function zm(e,t,n,r,s,i,a,o,u){var c=Array.prototype.slice.call(arguments,3);try{t.apply(n,c)}catch(m){this.onError(m)}}var Gr=!1,yi=null,xi=!1,dl=null,Mm={onError:function(e){Gr=!0,yi=e}};function Um(e,t,n,r,s,i,a,o,u){Gr=!1,yi=null,zm.apply(Mm,arguments)}function $m(e,t,n,r,s,i,a,o,u){if(Um.apply(this,arguments),Gr){if(Gr){var c=yi;Gr=!1,yi=null}else throw Error(O(198));xi||(xi=!0,dl=c)}}function Yn(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function kd(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function xu(e){if(Yn(e)!==e)throw Error(O(188))}function Fm(e){var t=e.alternate;if(!t){if(t=Yn(e),t===null)throw Error(O(188));return t!==e?null:e}for(var n=e,r=t;;){var s=n.return;if(s===null)break;var i=s.alternate;if(i===null){if(r=s.return,r!==null){n=r;continue}break}if(s.child===i.child){for(i=s.child;i;){if(i===n)return xu(s),e;if(i===r)return xu(s),t;i=i.sibling}throw Error(O(188))}if(n.return!==r.return)n=s,r=i;else{for(var a=!1,o=s.child;o;){if(o===n){a=!0,n=s,r=i;break}if(o===r){a=!0,r=s,n=i;break}o=o.sibling}if(!a){for(o=i.child;o;){if(o===n){a=!0,n=i,r=s;break}if(o===r){a=!0,r=i,n=s;break}o=o.sibling}if(!a)throw Error(O(189))}}if(n.alternate!==r)throw Error(O(190))}if(n.tag!==3)throw Error(O(188));return n.stateNode.current===n?e:t}function Cd(e){return e=Fm(e),e!==null?Pd(e):null}function Pd(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Pd(e);if(t!==null)return t;e=e.sibling}return null}var Rd=gt.unstable_scheduleCallback,wu=gt.unstable_cancelCallback,Bm=gt.unstable_shouldYield,Hm=gt.unstable_requestPaint,Ce=gt.unstable_now,Vm=gt.unstable_getCurrentPriorityLevel,uo=gt.unstable_ImmediatePriority,bd=gt.unstable_UserBlockingPriority,wi=gt.unstable_NormalPriority,qm=gt.unstable_LowPriority,_d=gt.unstable_IdlePriority,Qi=null,Ft=null;function Wm(e){if(Ft&&typeof Ft.onCommitFiberRoot=="function")try{Ft.onCommitFiberRoot(Qi,e,void 0,(e.current.flags&128)===128)}catch{}}var Lt=Math.clz32?Math.clz32:Gm,Qm=Math.log,Km=Math.LN2;function Gm(e){return e>>>=0,e===0?32:31-(Qm(e)/Km|0)|0}var $s=64,Fs=4194304;function Wr(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Si(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,s=e.suspendedLanes,i=e.pingedLanes,a=n&268435455;if(a!==0){var o=a&~s;o!==0?r=Wr(o):(i&=a,i!==0&&(r=Wr(i)))}else a=n&~s,a!==0?r=Wr(a):i!==0&&(r=Wr(i));if(r===0)return 0;if(t!==0&&t!==r&&!(t&s)&&(s=r&-r,i=t&-t,s>=i||s===16&&(i&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Lt(t),s=1<<n,r|=e[n],t&=~s;return r}function Ym(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Xm(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,s=e.expirationTimes,i=e.pendingLanes;0<i;){var a=31-Lt(i),o=1<<a,u=s[a];u===-1?(!(o&n)||o&r)&&(s[a]=Ym(o,t)):u<=t&&(e.expiredLanes|=o),i&=~o}}function fl(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Td(){var e=$s;return $s<<=1,!($s&4194240)&&($s=64),e}function Sa(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Es(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Lt(t),e[t]=n}function Jm(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var s=31-Lt(n),i=1<<s;t[s]=0,r[s]=-1,e[s]=-1,n&=~i}}function co(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Lt(n),s=1<<r;s&t|e[r]&t&&(e[r]|=t),n&=~s}}var ue=0;function Od(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Ld,fo,Dd,Ad,Id,pl=!1,Bs=[],gn=null,vn=null,yn=null,as=new Map,ls=new Map,cn=[],Zm="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Su(e,t){switch(e){case"focusin":case"focusout":gn=null;break;case"dragenter":case"dragleave":vn=null;break;case"mouseover":case"mouseout":yn=null;break;case"pointerover":case"pointerout":as.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":ls.delete(t.pointerId)}}function zr(e,t,n,r,s,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[s]},t!==null&&(t=Cs(t),t!==null&&fo(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),e)}function eh(e,t,n,r,s){switch(t){case"focusin":return gn=zr(gn,e,t,n,r,s),!0;case"dragenter":return vn=zr(vn,e,t,n,r,s),!0;case"mouseover":return yn=zr(yn,e,t,n,r,s),!0;case"pointerover":var i=s.pointerId;return as.set(i,zr(as.get(i)||null,e,t,n,r,s)),!0;case"gotpointercapture":return i=s.pointerId,ls.set(i,zr(ls.get(i)||null,e,t,n,r,s)),!0}return!1}function zd(e){var t=Dn(e.target);if(t!==null){var n=Yn(t);if(n!==null){if(t=n.tag,t===13){if(t=kd(n),t!==null){e.blockedOn=t,Id(e.priority,function(){Dd(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function ri(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=ml(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);ol=r,n.target.dispatchEvent(r),ol=null}else return t=Cs(n),t!==null&&fo(t),e.blockedOn=n,!1;t.shift()}return!0}function Nu(e,t,n){ri(e)&&n.delete(t)}function th(){pl=!1,gn!==null&&ri(gn)&&(gn=null),vn!==null&&ri(vn)&&(vn=null),yn!==null&&ri(yn)&&(yn=null),as.forEach(Nu),ls.forEach(Nu)}function Mr(e,t){e.blockedOn===t&&(e.blockedOn=null,pl||(pl=!0,gt.unstable_scheduleCallback(gt.unstable_NormalPriority,th)))}function os(e){function t(s){return Mr(s,e)}if(0<Bs.length){Mr(Bs[0],e);for(var n=1;n<Bs.length;n++){var r=Bs[n];r.blockedOn===e&&(r.blockedOn=null)}}for(gn!==null&&Mr(gn,e),vn!==null&&Mr(vn,e),yn!==null&&Mr(yn,e),as.forEach(t),ls.forEach(t),n=0;n<cn.length;n++)r=cn[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<cn.length&&(n=cn[0],n.blockedOn===null);)zd(n),n.blockedOn===null&&cn.shift()}var mr=rn.ReactCurrentBatchConfig,Ni=!0;function nh(e,t,n,r){var s=ue,i=mr.transition;mr.transition=null;try{ue=1,po(e,t,n,r)}finally{ue=s,mr.transition=i}}function rh(e,t,n,r){var s=ue,i=mr.transition;mr.transition=null;try{ue=4,po(e,t,n,r)}finally{ue=s,mr.transition=i}}function po(e,t,n,r){if(Ni){var s=ml(e,t,n,r);if(s===null)Ta(e,t,r,ji,n),Su(e,r);else if(eh(s,e,t,n,r))r.stopPropagation();else if(Su(e,r),t&4&&-1<Zm.indexOf(e)){for(;s!==null;){var i=Cs(s);if(i!==null&&Ld(i),i=ml(e,t,n,r),i===null&&Ta(e,t,r,ji,n),i===s)break;s=i}s!==null&&r.stopPropagation()}else Ta(e,t,r,null,n)}}var ji=null;function ml(e,t,n,r){if(ji=null,e=oo(r),e=Dn(e),e!==null)if(t=Yn(e),t===null)e=null;else if(n=t.tag,n===13){if(e=kd(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return ji=e,null}function Md(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Vm()){case uo:return 1;case bd:return 4;case wi:case qm:return 16;case _d:return 536870912;default:return 16}default:return 16}}var pn=null,mo=null,si=null;function Ud(){if(si)return si;var e,t=mo,n=t.length,r,s="value"in pn?pn.value:pn.textContent,i=s.length;for(e=0;e<n&&t[e]===s[e];e++);var a=n-e;for(r=1;r<=a&&t[n-r]===s[i-r];r++);return si=s.slice(e,1<r?1-r:void 0)}function ii(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Hs(){return!0}function ju(){return!1}function yt(e){function t(n,r,s,i,a){this._reactName=n,this._targetInst=s,this.type=r,this.nativeEvent=i,this.target=a,this.currentTarget=null;for(var o in e)e.hasOwnProperty(o)&&(n=e[o],this[o]=n?n(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Hs:ju,this.isPropagationStopped=ju,this}return Ne(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Hs)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Hs)},persist:function(){},isPersistent:Hs}),t}var Cr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ho=yt(Cr),ks=Ne({},Cr,{view:0,detail:0}),sh=yt(ks),Na,ja,Ur,Ki=Ne({},ks,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:go,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Ur&&(Ur&&e.type==="mousemove"?(Na=e.screenX-Ur.screenX,ja=e.screenY-Ur.screenY):ja=Na=0,Ur=e),Na)},movementY:function(e){return"movementY"in e?e.movementY:ja}}),Eu=yt(Ki),ih=Ne({},Ki,{dataTransfer:0}),ah=yt(ih),lh=Ne({},ks,{relatedTarget:0}),Ea=yt(lh),oh=Ne({},Cr,{animationName:0,elapsedTime:0,pseudoElement:0}),uh=yt(oh),ch=Ne({},Cr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),dh=yt(ch),fh=Ne({},Cr,{data:0}),ku=yt(fh),ph={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},mh={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},hh={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function gh(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=hh[e])?!!t[e]:!1}function go(){return gh}var vh=Ne({},ks,{key:function(e){if(e.key){var t=ph[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=ii(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?mh[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:go,charCode:function(e){return e.type==="keypress"?ii(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?ii(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),yh=yt(vh),xh=Ne({},Ki,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Cu=yt(xh),wh=Ne({},ks,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:go}),Sh=yt(wh),Nh=Ne({},Cr,{propertyName:0,elapsedTime:0,pseudoElement:0}),jh=yt(Nh),Eh=Ne({},Ki,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),kh=yt(Eh),Ch=[9,13,27,32],vo=Jt&&"CompositionEvent"in window,Yr=null;Jt&&"documentMode"in document&&(Yr=document.documentMode);var Ph=Jt&&"TextEvent"in window&&!Yr,$d=Jt&&(!vo||Yr&&8<Yr&&11>=Yr),Pu=" ",Ru=!1;function Fd(e,t){switch(e){case"keyup":return Ch.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Bd(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var tr=!1;function Rh(e,t){switch(e){case"compositionend":return Bd(t);case"keypress":return t.which!==32?null:(Ru=!0,Pu);case"textInput":return e=t.data,e===Pu&&Ru?null:e;default:return null}}function bh(e,t){if(tr)return e==="compositionend"||!vo&&Fd(e,t)?(e=Ud(),si=mo=pn=null,tr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return $d&&t.locale!=="ko"?null:t.data;default:return null}}var _h={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function bu(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!_h[e.type]:t==="textarea"}function Hd(e,t,n,r){wd(r),t=Ei(t,"onChange"),0<t.length&&(n=new ho("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Xr=null,us=null;function Th(e){ef(e,0)}function Gi(e){var t=sr(e);if(pd(t))return e}function Oh(e,t){if(e==="change")return t}var Vd=!1;if(Jt){var ka;if(Jt){var Ca="oninput"in document;if(!Ca){var _u=document.createElement("div");_u.setAttribute("oninput","return;"),Ca=typeof _u.oninput=="function"}ka=Ca}else ka=!1;Vd=ka&&(!document.documentMode||9<document.documentMode)}function Tu(){Xr&&(Xr.detachEvent("onpropertychange",qd),us=Xr=null)}function qd(e){if(e.propertyName==="value"&&Gi(us)){var t=[];Hd(t,us,e,oo(e)),Ed(Th,t)}}function Lh(e,t,n){e==="focusin"?(Tu(),Xr=t,us=n,Xr.attachEvent("onpropertychange",qd)):e==="focusout"&&Tu()}function Dh(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Gi(us)}function Ah(e,t){if(e==="click")return Gi(t)}function Ih(e,t){if(e==="input"||e==="change")return Gi(t)}function zh(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var At=typeof Object.is=="function"?Object.is:zh;function cs(e,t){if(At(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var s=n[r];if(!Ya.call(t,s)||!At(e[s],t[s]))return!1}return!0}function Ou(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Lu(e,t){var n=Ou(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Ou(n)}}function Wd(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Wd(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Qd(){for(var e=window,t=vi();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=vi(e.document)}return t}function yo(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Mh(e){var t=Qd(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Wd(n.ownerDocument.documentElement,n)){if(r!==null&&yo(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var s=n.textContent.length,i=Math.min(r.start,s);r=r.end===void 0?i:Math.min(r.end,s),!e.extend&&i>r&&(s=r,r=i,i=s),s=Lu(n,i);var a=Lu(n,r);s&&a&&(e.rangeCount!==1||e.anchorNode!==s.node||e.anchorOffset!==s.offset||e.focusNode!==a.node||e.focusOffset!==a.offset)&&(t=t.createRange(),t.setStart(s.node,s.offset),e.removeAllRanges(),i>r?(e.addRange(t),e.extend(a.node,a.offset)):(t.setEnd(a.node,a.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Uh=Jt&&"documentMode"in document&&11>=document.documentMode,nr=null,hl=null,Jr=null,gl=!1;function Du(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;gl||nr==null||nr!==vi(r)||(r=nr,"selectionStart"in r&&yo(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Jr&&cs(Jr,r)||(Jr=r,r=Ei(hl,"onSelect"),0<r.length&&(t=new ho("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=nr)))}function Vs(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var rr={animationend:Vs("Animation","AnimationEnd"),animationiteration:Vs("Animation","AnimationIteration"),animationstart:Vs("Animation","AnimationStart"),transitionend:Vs("Transition","TransitionEnd")},Pa={},Kd={};Jt&&(Kd=document.createElement("div").style,"AnimationEvent"in window||(delete rr.animationend.animation,delete rr.animationiteration.animation,delete rr.animationstart.animation),"TransitionEvent"in window||delete rr.transitionend.transition);function Yi(e){if(Pa[e])return Pa[e];if(!rr[e])return e;var t=rr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Kd)return Pa[e]=t[n];return e}var Gd=Yi("animationend"),Yd=Yi("animationiteration"),Xd=Yi("animationstart"),Jd=Yi("transitionend"),Zd=new Map,Au="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Pn(e,t){Zd.set(e,t),Gn(t,[e])}for(var Ra=0;Ra<Au.length;Ra++){var ba=Au[Ra],$h=ba.toLowerCase(),Fh=ba[0].toUpperCase()+ba.slice(1);Pn($h,"on"+Fh)}Pn(Gd,"onAnimationEnd");Pn(Yd,"onAnimationIteration");Pn(Xd,"onAnimationStart");Pn("dblclick","onDoubleClick");Pn("focusin","onFocus");Pn("focusout","onBlur");Pn(Jd,"onTransitionEnd");vr("onMouseEnter",["mouseout","mouseover"]);vr("onMouseLeave",["mouseout","mouseover"]);vr("onPointerEnter",["pointerout","pointerover"]);vr("onPointerLeave",["pointerout","pointerover"]);Gn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Gn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Gn("onBeforeInput",["compositionend","keypress","textInput","paste"]);Gn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Gn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Gn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Qr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Bh=new Set("cancel close invalid load scroll toggle".split(" ").concat(Qr));function Iu(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,$m(r,t,void 0,e),e.currentTarget=null}function ef(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],s=r.event;r=r.listeners;e:{var i=void 0;if(t)for(var a=r.length-1;0<=a;a--){var o=r[a],u=o.instance,c=o.currentTarget;if(o=o.listener,u!==i&&s.isPropagationStopped())break e;Iu(s,o,c),i=u}else for(a=0;a<r.length;a++){if(o=r[a],u=o.instance,c=o.currentTarget,o=o.listener,u!==i&&s.isPropagationStopped())break e;Iu(s,o,c),i=u}}}if(xi)throw e=dl,xi=!1,dl=null,e}function fe(e,t){var n=t[Sl];n===void 0&&(n=t[Sl]=new Set);var r=e+"__bubble";n.has(r)||(tf(t,e,2,!1),n.add(r))}function _a(e,t,n){var r=0;t&&(r|=4),tf(n,e,r,t)}var qs="_reactListening"+Math.random().toString(36).slice(2);function ds(e){if(!e[qs]){e[qs]=!0,od.forEach(function(n){n!=="selectionchange"&&(Bh.has(n)||_a(n,!1,e),_a(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[qs]||(t[qs]=!0,_a("selectionchange",!1,t))}}function tf(e,t,n,r){switch(Md(t)){case 1:var s=nh;break;case 4:s=rh;break;default:s=po}n=s.bind(null,t,n,e),s=void 0,!cl||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),r?s!==void 0?e.addEventListener(t,n,{capture:!0,passive:s}):e.addEventListener(t,n,!0):s!==void 0?e.addEventListener(t,n,{passive:s}):e.addEventListener(t,n,!1)}function Ta(e,t,n,r,s){var i=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var a=r.tag;if(a===3||a===4){var o=r.stateNode.containerInfo;if(o===s||o.nodeType===8&&o.parentNode===s)break;if(a===4)for(a=r.return;a!==null;){var u=a.tag;if((u===3||u===4)&&(u=a.stateNode.containerInfo,u===s||u.nodeType===8&&u.parentNode===s))return;a=a.return}for(;o!==null;){if(a=Dn(o),a===null)return;if(u=a.tag,u===5||u===6){r=i=a;continue e}o=o.parentNode}}r=r.return}Ed(function(){var c=i,m=oo(n),f=[];e:{var g=Zd.get(e);if(g!==void 0){var x=ho,j=e;switch(e){case"keypress":if(ii(n)===0)break e;case"keydown":case"keyup":x=yh;break;case"focusin":j="focus",x=Ea;break;case"focusout":j="blur",x=Ea;break;case"beforeblur":case"afterblur":x=Ea;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":x=Eu;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":x=ah;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":x=Sh;break;case Gd:case Yd:case Xd:x=uh;break;case Jd:x=jh;break;case"scroll":x=sh;break;case"wheel":x=kh;break;case"copy":case"cut":case"paste":x=dh;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":x=Cu}var N=(t&4)!==0,S=!N&&e==="scroll",d=N?g!==null?g+"Capture":null:g;N=[];for(var p=c,h;p!==null;){h=p;var w=h.stateNode;if(h.tag===5&&w!==null&&(h=w,d!==null&&(w=is(p,d),w!=null&&N.push(fs(p,w,h)))),S)break;p=p.return}0<N.length&&(g=new x(g,j,null,n,m),f.push({event:g,listeners:N}))}}if(!(t&7)){e:{if(g=e==="mouseover"||e==="pointerover",x=e==="mouseout"||e==="pointerout",g&&n!==ol&&(j=n.relatedTarget||n.fromElement)&&(Dn(j)||j[Zt]))break e;if((x||g)&&(g=m.window===m?m:(g=m.ownerDocument)?g.defaultView||g.parentWindow:window,x?(j=n.relatedTarget||n.toElement,x=c,j=j?Dn(j):null,j!==null&&(S=Yn(j),j!==S||j.tag!==5&&j.tag!==6)&&(j=null)):(x=null,j=c),x!==j)){if(N=Eu,w="onMouseLeave",d="onMouseEnter",p="mouse",(e==="pointerout"||e==="pointerover")&&(N=Cu,w="onPointerLeave",d="onPointerEnter",p="pointer"),S=x==null?g:sr(x),h=j==null?g:sr(j),g=new N(w,p+"leave",x,n,m),g.target=S,g.relatedTarget=h,w=null,Dn(m)===c&&(N=new N(d,p+"enter",j,n,m),N.target=h,N.relatedTarget=S,w=N),S=w,x&&j)t:{for(N=x,d=j,p=0,h=N;h;h=Xn(h))p++;for(h=0,w=d;w;w=Xn(w))h++;for(;0<p-h;)N=Xn(N),p--;for(;0<h-p;)d=Xn(d),h--;for(;p--;){if(N===d||d!==null&&N===d.alternate)break t;N=Xn(N),d=Xn(d)}N=null}else N=null;x!==null&&zu(f,g,x,N,!1),j!==null&&S!==null&&zu(f,S,j,N,!0)}}e:{if(g=c?sr(c):window,x=g.nodeName&&g.nodeName.toLowerCase(),x==="select"||x==="input"&&g.type==="file")var C=Oh;else if(bu(g))if(Vd)C=Ih;else{C=Dh;var k=Lh}else(x=g.nodeName)&&x.toLowerCase()==="input"&&(g.type==="checkbox"||g.type==="radio")&&(C=Ah);if(C&&(C=C(e,c))){Hd(f,C,n,m);break e}k&&k(e,g,c),e==="focusout"&&(k=g._wrapperState)&&k.controlled&&g.type==="number"&&rl(g,"number",g.value)}switch(k=c?sr(c):window,e){case"focusin":(bu(k)||k.contentEditable==="true")&&(nr=k,hl=c,Jr=null);break;case"focusout":Jr=hl=nr=null;break;case"mousedown":gl=!0;break;case"contextmenu":case"mouseup":case"dragend":gl=!1,Du(f,n,m);break;case"selectionchange":if(Uh)break;case"keydown":case"keyup":Du(f,n,m)}var L;if(vo)e:{switch(e){case"compositionstart":var A="onCompositionStart";break e;case"compositionend":A="onCompositionEnd";break e;case"compositionupdate":A="onCompositionUpdate";break e}A=void 0}else tr?Fd(e,n)&&(A="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(A="onCompositionStart");A&&($d&&n.locale!=="ko"&&(tr||A!=="onCompositionStart"?A==="onCompositionEnd"&&tr&&(L=Ud()):(pn=m,mo="value"in pn?pn.value:pn.textContent,tr=!0)),k=Ei(c,A),0<k.length&&(A=new ku(A,e,null,n,m),f.push({event:A,listeners:k}),L?A.data=L:(L=Bd(n),L!==null&&(A.data=L)))),(L=Ph?Rh(e,n):bh(e,n))&&(c=Ei(c,"onBeforeInput"),0<c.length&&(m=new ku("onBeforeInput","beforeinput",null,n,m),f.push({event:m,listeners:c}),m.data=L))}ef(f,t)})}function fs(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Ei(e,t){for(var n=t+"Capture",r=[];e!==null;){var s=e,i=s.stateNode;s.tag===5&&i!==null&&(s=i,i=is(e,n),i!=null&&r.unshift(fs(e,i,s)),i=is(e,t),i!=null&&r.push(fs(e,i,s))),e=e.return}return r}function Xn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function zu(e,t,n,r,s){for(var i=t._reactName,a=[];n!==null&&n!==r;){var o=n,u=o.alternate,c=o.stateNode;if(u!==null&&u===r)break;o.tag===5&&c!==null&&(o=c,s?(u=is(n,i),u!=null&&a.unshift(fs(n,u,o))):s||(u=is(n,i),u!=null&&a.push(fs(n,u,o)))),n=n.return}a.length!==0&&e.push({event:t,listeners:a})}var Hh=/\r\n?/g,Vh=/\u0000|\uFFFD/g;function Mu(e){return(typeof e=="string"?e:""+e).replace(Hh,`
`).replace(Vh,"")}function Ws(e,t,n){if(t=Mu(t),Mu(e)!==t&&n)throw Error(O(425))}function ki(){}var vl=null,yl=null;function xl(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var wl=typeof setTimeout=="function"?setTimeout:void 0,qh=typeof clearTimeout=="function"?clearTimeout:void 0,Uu=typeof Promise=="function"?Promise:void 0,Wh=typeof queueMicrotask=="function"?queueMicrotask:typeof Uu<"u"?function(e){return Uu.resolve(null).then(e).catch(Qh)}:wl;function Qh(e){setTimeout(function(){throw e})}function Oa(e,t){var n=t,r=0;do{var s=n.nextSibling;if(e.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(r===0){e.removeChild(s),os(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=s}while(n);os(t)}function xn(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function $u(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Pr=Math.random().toString(36).slice(2),Ut="__reactFiber$"+Pr,ps="__reactProps$"+Pr,Zt="__reactContainer$"+Pr,Sl="__reactEvents$"+Pr,Kh="__reactListeners$"+Pr,Gh="__reactHandles$"+Pr;function Dn(e){var t=e[Ut];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Zt]||n[Ut]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=$u(e);e!==null;){if(n=e[Ut])return n;e=$u(e)}return t}e=n,n=e.parentNode}return null}function Cs(e){return e=e[Ut]||e[Zt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function sr(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(O(33))}function Xi(e){return e[ps]||null}var Nl=[],ir=-1;function Rn(e){return{current:e}}function pe(e){0>ir||(e.current=Nl[ir],Nl[ir]=null,ir--)}function de(e,t){ir++,Nl[ir]=e.current,e.current=t}var Cn={},Je=Rn(Cn),at=Rn(!1),Fn=Cn;function yr(e,t){var n=e.type.contextTypes;if(!n)return Cn;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var s={},i;for(i in n)s[i]=t[i];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=s),s}function lt(e){return e=e.childContextTypes,e!=null}function Ci(){pe(at),pe(Je)}function Fu(e,t,n){if(Je.current!==Cn)throw Error(O(168));de(Je,t),de(at,n)}function nf(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var s in r)if(!(s in t))throw Error(O(108,Lm(e)||"Unknown",s));return Ne({},n,r)}function Pi(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Cn,Fn=Je.current,de(Je,e),de(at,at.current),!0}function Bu(e,t,n){var r=e.stateNode;if(!r)throw Error(O(169));n?(e=nf(e,t,Fn),r.__reactInternalMemoizedMergedChildContext=e,pe(at),pe(Je),de(Je,e)):pe(at),de(at,n)}var Kt=null,Ji=!1,La=!1;function rf(e){Kt===null?Kt=[e]:Kt.push(e)}function Yh(e){Ji=!0,rf(e)}function bn(){if(!La&&Kt!==null){La=!0;var e=0,t=ue;try{var n=Kt;for(ue=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}Kt=null,Ji=!1}catch(s){throw Kt!==null&&(Kt=Kt.slice(e+1)),Rd(uo,bn),s}finally{ue=t,La=!1}}return null}var ar=[],lr=0,Ri=null,bi=0,St=[],Nt=0,Bn=null,Gt=1,Yt="";function On(e,t){ar[lr++]=bi,ar[lr++]=Ri,Ri=e,bi=t}function sf(e,t,n){St[Nt++]=Gt,St[Nt++]=Yt,St[Nt++]=Bn,Bn=e;var r=Gt;e=Yt;var s=32-Lt(r)-1;r&=~(1<<s),n+=1;var i=32-Lt(t)+s;if(30<i){var a=s-s%5;i=(r&(1<<a)-1).toString(32),r>>=a,s-=a,Gt=1<<32-Lt(t)+s|n<<s|r,Yt=i+e}else Gt=1<<i|n<<s|r,Yt=e}function xo(e){e.return!==null&&(On(e,1),sf(e,1,0))}function wo(e){for(;e===Ri;)Ri=ar[--lr],ar[lr]=null,bi=ar[--lr],ar[lr]=null;for(;e===Bn;)Bn=St[--Nt],St[Nt]=null,Yt=St[--Nt],St[Nt]=null,Gt=St[--Nt],St[Nt]=null}var ht=null,mt=null,he=!1,Ot=null;function af(e,t){var n=jt(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Hu(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,ht=e,mt=xn(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,ht=e,mt=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Bn!==null?{id:Gt,overflow:Yt}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=jt(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,ht=e,mt=null,!0):!1;default:return!1}}function jl(e){return(e.mode&1)!==0&&(e.flags&128)===0}function El(e){if(he){var t=mt;if(t){var n=t;if(!Hu(e,t)){if(jl(e))throw Error(O(418));t=xn(n.nextSibling);var r=ht;t&&Hu(e,t)?af(r,n):(e.flags=e.flags&-4097|2,he=!1,ht=e)}}else{if(jl(e))throw Error(O(418));e.flags=e.flags&-4097|2,he=!1,ht=e}}}function Vu(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;ht=e}function Qs(e){if(e!==ht)return!1;if(!he)return Vu(e),he=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!xl(e.type,e.memoizedProps)),t&&(t=mt)){if(jl(e))throw lf(),Error(O(418));for(;t;)af(e,t),t=xn(t.nextSibling)}if(Vu(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(O(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){mt=xn(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}mt=null}}else mt=ht?xn(e.stateNode.nextSibling):null;return!0}function lf(){for(var e=mt;e;)e=xn(e.nextSibling)}function xr(){mt=ht=null,he=!1}function So(e){Ot===null?Ot=[e]:Ot.push(e)}var Xh=rn.ReactCurrentBatchConfig;function $r(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(O(309));var r=n.stateNode}if(!r)throw Error(O(147,e));var s=r,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(a){var o=s.refs;a===null?delete o[i]:o[i]=a},t._stringRef=i,t)}if(typeof e!="string")throw Error(O(284));if(!n._owner)throw Error(O(290,e))}return e}function Ks(e,t){throw e=Object.prototype.toString.call(t),Error(O(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function qu(e){var t=e._init;return t(e._payload)}function of(e){function t(d,p){if(e){var h=d.deletions;h===null?(d.deletions=[p],d.flags|=16):h.push(p)}}function n(d,p){if(!e)return null;for(;p!==null;)t(d,p),p=p.sibling;return null}function r(d,p){for(d=new Map;p!==null;)p.key!==null?d.set(p.key,p):d.set(p.index,p),p=p.sibling;return d}function s(d,p){return d=jn(d,p),d.index=0,d.sibling=null,d}function i(d,p,h){return d.index=h,e?(h=d.alternate,h!==null?(h=h.index,h<p?(d.flags|=2,p):h):(d.flags|=2,p)):(d.flags|=1048576,p)}function a(d){return e&&d.alternate===null&&(d.flags|=2),d}function o(d,p,h,w){return p===null||p.tag!==6?(p=$a(h,d.mode,w),p.return=d,p):(p=s(p,h),p.return=d,p)}function u(d,p,h,w){var C=h.type;return C===er?m(d,p,h.props.children,w,h.key):p!==null&&(p.elementType===C||typeof C=="object"&&C!==null&&C.$$typeof===on&&qu(C)===p.type)?(w=s(p,h.props),w.ref=$r(d,p,h),w.return=d,w):(w=fi(h.type,h.key,h.props,null,d.mode,w),w.ref=$r(d,p,h),w.return=d,w)}function c(d,p,h,w){return p===null||p.tag!==4||p.stateNode.containerInfo!==h.containerInfo||p.stateNode.implementation!==h.implementation?(p=Fa(h,d.mode,w),p.return=d,p):(p=s(p,h.children||[]),p.return=d,p)}function m(d,p,h,w,C){return p===null||p.tag!==7?(p=Un(h,d.mode,w,C),p.return=d,p):(p=s(p,h),p.return=d,p)}function f(d,p,h){if(typeof p=="string"&&p!==""||typeof p=="number")return p=$a(""+p,d.mode,h),p.return=d,p;if(typeof p=="object"&&p!==null){switch(p.$$typeof){case zs:return h=fi(p.type,p.key,p.props,null,d.mode,h),h.ref=$r(d,null,p),h.return=d,h;case Zn:return p=Fa(p,d.mode,h),p.return=d,p;case on:var w=p._init;return f(d,w(p._payload),h)}if(qr(p)||Ar(p))return p=Un(p,d.mode,h,null),p.return=d,p;Ks(d,p)}return null}function g(d,p,h,w){var C=p!==null?p.key:null;if(typeof h=="string"&&h!==""||typeof h=="number")return C!==null?null:o(d,p,""+h,w);if(typeof h=="object"&&h!==null){switch(h.$$typeof){case zs:return h.key===C?u(d,p,h,w):null;case Zn:return h.key===C?c(d,p,h,w):null;case on:return C=h._init,g(d,p,C(h._payload),w)}if(qr(h)||Ar(h))return C!==null?null:m(d,p,h,w,null);Ks(d,h)}return null}function x(d,p,h,w,C){if(typeof w=="string"&&w!==""||typeof w=="number")return d=d.get(h)||null,o(p,d,""+w,C);if(typeof w=="object"&&w!==null){switch(w.$$typeof){case zs:return d=d.get(w.key===null?h:w.key)||null,u(p,d,w,C);case Zn:return d=d.get(w.key===null?h:w.key)||null,c(p,d,w,C);case on:var k=w._init;return x(d,p,h,k(w._payload),C)}if(qr(w)||Ar(w))return d=d.get(h)||null,m(p,d,w,C,null);Ks(p,w)}return null}function j(d,p,h,w){for(var C=null,k=null,L=p,A=p=0,Z=null;L!==null&&A<h.length;A++){L.index>A?(Z=L,L=null):Z=L.sibling;var B=g(d,L,h[A],w);if(B===null){L===null&&(L=Z);break}e&&L&&B.alternate===null&&t(d,L),p=i(B,p,A),k===null?C=B:k.sibling=B,k=B,L=Z}if(A===h.length)return n(d,L),he&&On(d,A),C;if(L===null){for(;A<h.length;A++)L=f(d,h[A],w),L!==null&&(p=i(L,p,A),k===null?C=L:k.sibling=L,k=L);return he&&On(d,A),C}for(L=r(d,L);A<h.length;A++)Z=x(L,d,A,h[A],w),Z!==null&&(e&&Z.alternate!==null&&L.delete(Z.key===null?A:Z.key),p=i(Z,p,A),k===null?C=Z:k.sibling=Z,k=Z);return e&&L.forEach(function(ie){return t(d,ie)}),he&&On(d,A),C}function N(d,p,h,w){var C=Ar(h);if(typeof C!="function")throw Error(O(150));if(h=C.call(h),h==null)throw Error(O(151));for(var k=C=null,L=p,A=p=0,Z=null,B=h.next();L!==null&&!B.done;A++,B=h.next()){L.index>A?(Z=L,L=null):Z=L.sibling;var ie=g(d,L,B.value,w);if(ie===null){L===null&&(L=Z);break}e&&L&&ie.alternate===null&&t(d,L),p=i(ie,p,A),k===null?C=ie:k.sibling=ie,k=ie,L=Z}if(B.done)return n(d,L),he&&On(d,A),C;if(L===null){for(;!B.done;A++,B=h.next())B=f(d,B.value,w),B!==null&&(p=i(B,p,A),k===null?C=B:k.sibling=B,k=B);return he&&On(d,A),C}for(L=r(d,L);!B.done;A++,B=h.next())B=x(L,d,A,B.value,w),B!==null&&(e&&B.alternate!==null&&L.delete(B.key===null?A:B.key),p=i(B,p,A),k===null?C=B:k.sibling=B,k=B);return e&&L.forEach(function(le){return t(d,le)}),he&&On(d,A),C}function S(d,p,h,w){if(typeof h=="object"&&h!==null&&h.type===er&&h.key===null&&(h=h.props.children),typeof h=="object"&&h!==null){switch(h.$$typeof){case zs:e:{for(var C=h.key,k=p;k!==null;){if(k.key===C){if(C=h.type,C===er){if(k.tag===7){n(d,k.sibling),p=s(k,h.props.children),p.return=d,d=p;break e}}else if(k.elementType===C||typeof C=="object"&&C!==null&&C.$$typeof===on&&qu(C)===k.type){n(d,k.sibling),p=s(k,h.props),p.ref=$r(d,k,h),p.return=d,d=p;break e}n(d,k);break}else t(d,k);k=k.sibling}h.type===er?(p=Un(h.props.children,d.mode,w,h.key),p.return=d,d=p):(w=fi(h.type,h.key,h.props,null,d.mode,w),w.ref=$r(d,p,h),w.return=d,d=w)}return a(d);case Zn:e:{for(k=h.key;p!==null;){if(p.key===k)if(p.tag===4&&p.stateNode.containerInfo===h.containerInfo&&p.stateNode.implementation===h.implementation){n(d,p.sibling),p=s(p,h.children||[]),p.return=d,d=p;break e}else{n(d,p);break}else t(d,p);p=p.sibling}p=Fa(h,d.mode,w),p.return=d,d=p}return a(d);case on:return k=h._init,S(d,p,k(h._payload),w)}if(qr(h))return j(d,p,h,w);if(Ar(h))return N(d,p,h,w);Ks(d,h)}return typeof h=="string"&&h!==""||typeof h=="number"?(h=""+h,p!==null&&p.tag===6?(n(d,p.sibling),p=s(p,h),p.return=d,d=p):(n(d,p),p=$a(h,d.mode,w),p.return=d,d=p),a(d)):n(d,p)}return S}var wr=of(!0),uf=of(!1),_i=Rn(null),Ti=null,or=null,No=null;function jo(){No=or=Ti=null}function Eo(e){var t=_i.current;pe(_i),e._currentValue=t}function kl(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function hr(e,t){Ti=e,No=or=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(it=!0),e.firstContext=null)}function kt(e){var t=e._currentValue;if(No!==e)if(e={context:e,memoizedValue:t,next:null},or===null){if(Ti===null)throw Error(O(308));or=e,Ti.dependencies={lanes:0,firstContext:e}}else or=or.next=e;return t}var An=null;function ko(e){An===null?An=[e]:An.push(e)}function cf(e,t,n,r){var s=t.interleaved;return s===null?(n.next=n,ko(t)):(n.next=s.next,s.next=n),t.interleaved=n,en(e,r)}function en(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var un=!1;function Co(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function df(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Xt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function wn(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,se&2){var s=r.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),r.pending=t,en(e,n)}return s=r.interleaved,s===null?(t.next=t,ko(r)):(t.next=s.next,s.next=t),r.interleaved=t,en(e,n)}function ai(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,co(e,n)}}function Wu(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var s=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?s=i=a:i=i.next=a,n=n.next}while(n!==null);i===null?s=i=t:i=i.next=t}else s=i=t;n={baseState:r.baseState,firstBaseUpdate:s,lastBaseUpdate:i,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Oi(e,t,n,r){var s=e.updateQueue;un=!1;var i=s.firstBaseUpdate,a=s.lastBaseUpdate,o=s.shared.pending;if(o!==null){s.shared.pending=null;var u=o,c=u.next;u.next=null,a===null?i=c:a.next=c,a=u;var m=e.alternate;m!==null&&(m=m.updateQueue,o=m.lastBaseUpdate,o!==a&&(o===null?m.firstBaseUpdate=c:o.next=c,m.lastBaseUpdate=u))}if(i!==null){var f=s.baseState;a=0,m=c=u=null,o=i;do{var g=o.lane,x=o.eventTime;if((r&g)===g){m!==null&&(m=m.next={eventTime:x,lane:0,tag:o.tag,payload:o.payload,callback:o.callback,next:null});e:{var j=e,N=o;switch(g=t,x=n,N.tag){case 1:if(j=N.payload,typeof j=="function"){f=j.call(x,f,g);break e}f=j;break e;case 3:j.flags=j.flags&-65537|128;case 0:if(j=N.payload,g=typeof j=="function"?j.call(x,f,g):j,g==null)break e;f=Ne({},f,g);break e;case 2:un=!0}}o.callback!==null&&o.lane!==0&&(e.flags|=64,g=s.effects,g===null?s.effects=[o]:g.push(o))}else x={eventTime:x,lane:g,tag:o.tag,payload:o.payload,callback:o.callback,next:null},m===null?(c=m=x,u=f):m=m.next=x,a|=g;if(o=o.next,o===null){if(o=s.shared.pending,o===null)break;g=o,o=g.next,g.next=null,s.lastBaseUpdate=g,s.shared.pending=null}}while(!0);if(m===null&&(u=f),s.baseState=u,s.firstBaseUpdate=c,s.lastBaseUpdate=m,t=s.shared.interleaved,t!==null){s=t;do a|=s.lane,s=s.next;while(s!==t)}else i===null&&(s.shared.lanes=0);Vn|=a,e.lanes=a,e.memoizedState=f}}function Qu(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],s=r.callback;if(s!==null){if(r.callback=null,r=n,typeof s!="function")throw Error(O(191,s));s.call(r)}}}var Ps={},Bt=Rn(Ps),ms=Rn(Ps),hs=Rn(Ps);function In(e){if(e===Ps)throw Error(O(174));return e}function Po(e,t){switch(de(hs,t),de(ms,e),de(Bt,Ps),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:il(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=il(t,e)}pe(Bt),de(Bt,t)}function Sr(){pe(Bt),pe(ms),pe(hs)}function ff(e){In(hs.current);var t=In(Bt.current),n=il(t,e.type);t!==n&&(de(ms,e),de(Bt,n))}function Ro(e){ms.current===e&&(pe(Bt),pe(ms))}var we=Rn(0);function Li(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Da=[];function bo(){for(var e=0;e<Da.length;e++)Da[e]._workInProgressVersionPrimary=null;Da.length=0}var li=rn.ReactCurrentDispatcher,Aa=rn.ReactCurrentBatchConfig,Hn=0,Se=null,ze=null,$e=null,Di=!1,Zr=!1,gs=0,Jh=0;function Qe(){throw Error(O(321))}function _o(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!At(e[n],t[n]))return!1;return!0}function To(e,t,n,r,s,i){if(Hn=i,Se=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,li.current=e===null||e.memoizedState===null?ng:rg,e=n(r,s),Zr){i=0;do{if(Zr=!1,gs=0,25<=i)throw Error(O(301));i+=1,$e=ze=null,t.updateQueue=null,li.current=sg,e=n(r,s)}while(Zr)}if(li.current=Ai,t=ze!==null&&ze.next!==null,Hn=0,$e=ze=Se=null,Di=!1,t)throw Error(O(300));return e}function Oo(){var e=gs!==0;return gs=0,e}function Mt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return $e===null?Se.memoizedState=$e=e:$e=$e.next=e,$e}function Ct(){if(ze===null){var e=Se.alternate;e=e!==null?e.memoizedState:null}else e=ze.next;var t=$e===null?Se.memoizedState:$e.next;if(t!==null)$e=t,ze=e;else{if(e===null)throw Error(O(310));ze=e,e={memoizedState:ze.memoizedState,baseState:ze.baseState,baseQueue:ze.baseQueue,queue:ze.queue,next:null},$e===null?Se.memoizedState=$e=e:$e=$e.next=e}return $e}function vs(e,t){return typeof t=="function"?t(e):t}function Ia(e){var t=Ct(),n=t.queue;if(n===null)throw Error(O(311));n.lastRenderedReducer=e;var r=ze,s=r.baseQueue,i=n.pending;if(i!==null){if(s!==null){var a=s.next;s.next=i.next,i.next=a}r.baseQueue=s=i,n.pending=null}if(s!==null){i=s.next,r=r.baseState;var o=a=null,u=null,c=i;do{var m=c.lane;if((Hn&m)===m)u!==null&&(u=u.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:e(r,c.action);else{var f={lane:m,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};u===null?(o=u=f,a=r):u=u.next=f,Se.lanes|=m,Vn|=m}c=c.next}while(c!==null&&c!==i);u===null?a=r:u.next=o,At(r,t.memoizedState)||(it=!0),t.memoizedState=r,t.baseState=a,t.baseQueue=u,n.lastRenderedState=r}if(e=n.interleaved,e!==null){s=e;do i=s.lane,Se.lanes|=i,Vn|=i,s=s.next;while(s!==e)}else s===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function za(e){var t=Ct(),n=t.queue;if(n===null)throw Error(O(311));n.lastRenderedReducer=e;var r=n.dispatch,s=n.pending,i=t.memoizedState;if(s!==null){n.pending=null;var a=s=s.next;do i=e(i,a.action),a=a.next;while(a!==s);At(i,t.memoizedState)||(it=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,r]}function pf(){}function mf(e,t){var n=Se,r=Ct(),s=t(),i=!At(r.memoizedState,s);if(i&&(r.memoizedState=s,it=!0),r=r.queue,Lo(vf.bind(null,n,r,e),[e]),r.getSnapshot!==t||i||$e!==null&&$e.memoizedState.tag&1){if(n.flags|=2048,ys(9,gf.bind(null,n,r,s,t),void 0,null),Fe===null)throw Error(O(349));Hn&30||hf(n,t,s)}return s}function hf(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Se.updateQueue,t===null?(t={lastEffect:null,stores:null},Se.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function gf(e,t,n,r){t.value=n,t.getSnapshot=r,yf(t)&&xf(e)}function vf(e,t,n){return n(function(){yf(t)&&xf(e)})}function yf(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!At(e,n)}catch{return!0}}function xf(e){var t=en(e,1);t!==null&&Dt(t,e,1,-1)}function Ku(e){var t=Mt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:vs,lastRenderedState:e},t.queue=e,e=e.dispatch=tg.bind(null,Se,e),[t.memoizedState,e]}function ys(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=Se.updateQueue,t===null?(t={lastEffect:null,stores:null},Se.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function wf(){return Ct().memoizedState}function oi(e,t,n,r){var s=Mt();Se.flags|=e,s.memoizedState=ys(1|t,n,void 0,r===void 0?null:r)}function Zi(e,t,n,r){var s=Ct();r=r===void 0?null:r;var i=void 0;if(ze!==null){var a=ze.memoizedState;if(i=a.destroy,r!==null&&_o(r,a.deps)){s.memoizedState=ys(t,n,i,r);return}}Se.flags|=e,s.memoizedState=ys(1|t,n,i,r)}function Gu(e,t){return oi(8390656,8,e,t)}function Lo(e,t){return Zi(2048,8,e,t)}function Sf(e,t){return Zi(4,2,e,t)}function Nf(e,t){return Zi(4,4,e,t)}function jf(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Ef(e,t,n){return n=n!=null?n.concat([e]):null,Zi(4,4,jf.bind(null,t,e),n)}function Do(){}function kf(e,t){var n=Ct();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&_o(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Cf(e,t){var n=Ct();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&_o(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Pf(e,t,n){return Hn&21?(At(n,t)||(n=Td(),Se.lanes|=n,Vn|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,it=!0),e.memoizedState=n)}function Zh(e,t){var n=ue;ue=n!==0&&4>n?n:4,e(!0);var r=Aa.transition;Aa.transition={};try{e(!1),t()}finally{ue=n,Aa.transition=r}}function Rf(){return Ct().memoizedState}function eg(e,t,n){var r=Nn(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},bf(e))_f(t,n);else if(n=cf(e,t,n,r),n!==null){var s=tt();Dt(n,e,r,s),Tf(n,t,r)}}function tg(e,t,n){var r=Nn(e),s={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(bf(e))_f(t,s);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var a=t.lastRenderedState,o=i(a,n);if(s.hasEagerState=!0,s.eagerState=o,At(o,a)){var u=t.interleaved;u===null?(s.next=s,ko(t)):(s.next=u.next,u.next=s),t.interleaved=s;return}}catch{}finally{}n=cf(e,t,s,r),n!==null&&(s=tt(),Dt(n,e,r,s),Tf(n,t,r))}}function bf(e){var t=e.alternate;return e===Se||t!==null&&t===Se}function _f(e,t){Zr=Di=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Tf(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,co(e,n)}}var Ai={readContext:kt,useCallback:Qe,useContext:Qe,useEffect:Qe,useImperativeHandle:Qe,useInsertionEffect:Qe,useLayoutEffect:Qe,useMemo:Qe,useReducer:Qe,useRef:Qe,useState:Qe,useDebugValue:Qe,useDeferredValue:Qe,useTransition:Qe,useMutableSource:Qe,useSyncExternalStore:Qe,useId:Qe,unstable_isNewReconciler:!1},ng={readContext:kt,useCallback:function(e,t){return Mt().memoizedState=[e,t===void 0?null:t],e},useContext:kt,useEffect:Gu,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,oi(4194308,4,jf.bind(null,t,e),n)},useLayoutEffect:function(e,t){return oi(4194308,4,e,t)},useInsertionEffect:function(e,t){return oi(4,2,e,t)},useMemo:function(e,t){var n=Mt();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Mt();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=eg.bind(null,Se,e),[r.memoizedState,e]},useRef:function(e){var t=Mt();return e={current:e},t.memoizedState=e},useState:Ku,useDebugValue:Do,useDeferredValue:function(e){return Mt().memoizedState=e},useTransition:function(){var e=Ku(!1),t=e[0];return e=Zh.bind(null,e[1]),Mt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=Se,s=Mt();if(he){if(n===void 0)throw Error(O(407));n=n()}else{if(n=t(),Fe===null)throw Error(O(349));Hn&30||hf(r,t,n)}s.memoizedState=n;var i={value:n,getSnapshot:t};return s.queue=i,Gu(vf.bind(null,r,i,e),[e]),r.flags|=2048,ys(9,gf.bind(null,r,i,n,t),void 0,null),n},useId:function(){var e=Mt(),t=Fe.identifierPrefix;if(he){var n=Yt,r=Gt;n=(r&~(1<<32-Lt(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=gs++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Jh++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},rg={readContext:kt,useCallback:kf,useContext:kt,useEffect:Lo,useImperativeHandle:Ef,useInsertionEffect:Sf,useLayoutEffect:Nf,useMemo:Cf,useReducer:Ia,useRef:wf,useState:function(){return Ia(vs)},useDebugValue:Do,useDeferredValue:function(e){var t=Ct();return Pf(t,ze.memoizedState,e)},useTransition:function(){var e=Ia(vs)[0],t=Ct().memoizedState;return[e,t]},useMutableSource:pf,useSyncExternalStore:mf,useId:Rf,unstable_isNewReconciler:!1},sg={readContext:kt,useCallback:kf,useContext:kt,useEffect:Lo,useImperativeHandle:Ef,useInsertionEffect:Sf,useLayoutEffect:Nf,useMemo:Cf,useReducer:za,useRef:wf,useState:function(){return za(vs)},useDebugValue:Do,useDeferredValue:function(e){var t=Ct();return ze===null?t.memoizedState=e:Pf(t,ze.memoizedState,e)},useTransition:function(){var e=za(vs)[0],t=Ct().memoizedState;return[e,t]},useMutableSource:pf,useSyncExternalStore:mf,useId:Rf,unstable_isNewReconciler:!1};function _t(e,t){if(e&&e.defaultProps){t=Ne({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Cl(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:Ne({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var ea={isMounted:function(e){return(e=e._reactInternals)?Yn(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=tt(),s=Nn(e),i=Xt(r,s);i.payload=t,n!=null&&(i.callback=n),t=wn(e,i,s),t!==null&&(Dt(t,e,s,r),ai(t,e,s))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=tt(),s=Nn(e),i=Xt(r,s);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=wn(e,i,s),t!==null&&(Dt(t,e,s,r),ai(t,e,s))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=tt(),r=Nn(e),s=Xt(n,r);s.tag=2,t!=null&&(s.callback=t),t=wn(e,s,r),t!==null&&(Dt(t,e,r,n),ai(t,e,r))}};function Yu(e,t,n,r,s,i,a){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,i,a):t.prototype&&t.prototype.isPureReactComponent?!cs(n,r)||!cs(s,i):!0}function Of(e,t,n){var r=!1,s=Cn,i=t.contextType;return typeof i=="object"&&i!==null?i=kt(i):(s=lt(t)?Fn:Je.current,r=t.contextTypes,i=(r=r!=null)?yr(e,s):Cn),t=new t(n,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=ea,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=s,e.__reactInternalMemoizedMaskedChildContext=i),t}function Xu(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&ea.enqueueReplaceState(t,t.state,null)}function Pl(e,t,n,r){var s=e.stateNode;s.props=n,s.state=e.memoizedState,s.refs={},Co(e);var i=t.contextType;typeof i=="object"&&i!==null?s.context=kt(i):(i=lt(t)?Fn:Je.current,s.context=yr(e,i)),s.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(Cl(e,t,i,n),s.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(t=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),t!==s.state&&ea.enqueueReplaceState(s,s.state,null),Oi(e,n,s,r),s.state=e.memoizedState),typeof s.componentDidMount=="function"&&(e.flags|=4194308)}function Nr(e,t){try{var n="",r=t;do n+=Om(r),r=r.return;while(r);var s=n}catch(i){s=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:t,stack:s,digest:null}}function Ma(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Rl(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var ig=typeof WeakMap=="function"?WeakMap:Map;function Lf(e,t,n){n=Xt(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){zi||(zi=!0,Ml=r),Rl(e,t)},n}function Df(e,t,n){n=Xt(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var s=t.value;n.payload=function(){return r(s)},n.callback=function(){Rl(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){Rl(e,t),typeof r!="function"&&(Sn===null?Sn=new Set([this]):Sn.add(this));var a=t.stack;this.componentDidCatch(t.value,{componentStack:a!==null?a:""})}),n}function Ju(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new ig;var s=new Set;r.set(t,s)}else s=r.get(t),s===void 0&&(s=new Set,r.set(t,s));s.has(n)||(s.add(n),e=xg.bind(null,e,t,n),t.then(e,e))}function Zu(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function ec(e,t,n,r,s){return e.mode&1?(e.flags|=65536,e.lanes=s,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Xt(-1,1),t.tag=2,wn(n,t,1))),n.lanes|=1),e)}var ag=rn.ReactCurrentOwner,it=!1;function et(e,t,n,r){t.child=e===null?uf(t,null,n,r):wr(t,e.child,n,r)}function tc(e,t,n,r,s){n=n.render;var i=t.ref;return hr(t,s),r=To(e,t,n,r,i,s),n=Oo(),e!==null&&!it?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,tn(e,t,s)):(he&&n&&xo(t),t.flags|=1,et(e,t,r,s),t.child)}function nc(e,t,n,r,s){if(e===null){var i=n.type;return typeof i=="function"&&!Bo(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=i,Af(e,t,i,r,s)):(e=fi(n.type,null,r,t,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!(e.lanes&s)){var a=i.memoizedProps;if(n=n.compare,n=n!==null?n:cs,n(a,r)&&e.ref===t.ref)return tn(e,t,s)}return t.flags|=1,e=jn(i,r),e.ref=t.ref,e.return=t,t.child=e}function Af(e,t,n,r,s){if(e!==null){var i=e.memoizedProps;if(cs(i,r)&&e.ref===t.ref)if(it=!1,t.pendingProps=r=i,(e.lanes&s)!==0)e.flags&131072&&(it=!0);else return t.lanes=e.lanes,tn(e,t,s)}return bl(e,t,n,r,s)}function If(e,t,n){var r=t.pendingProps,s=r.children,i=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},de(cr,pt),pt|=n;else{if(!(n&1073741824))return e=i!==null?i.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,de(cr,pt),pt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,de(cr,pt),pt|=r}else i!==null?(r=i.baseLanes|n,t.memoizedState=null):r=n,de(cr,pt),pt|=r;return et(e,t,s,n),t.child}function zf(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function bl(e,t,n,r,s){var i=lt(n)?Fn:Je.current;return i=yr(t,i),hr(t,s),n=To(e,t,n,r,i,s),r=Oo(),e!==null&&!it?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,tn(e,t,s)):(he&&r&&xo(t),t.flags|=1,et(e,t,n,s),t.child)}function rc(e,t,n,r,s){if(lt(n)){var i=!0;Pi(t)}else i=!1;if(hr(t,s),t.stateNode===null)ui(e,t),Of(t,n,r),Pl(t,n,r,s),r=!0;else if(e===null){var a=t.stateNode,o=t.memoizedProps;a.props=o;var u=a.context,c=n.contextType;typeof c=="object"&&c!==null?c=kt(c):(c=lt(n)?Fn:Je.current,c=yr(t,c));var m=n.getDerivedStateFromProps,f=typeof m=="function"||typeof a.getSnapshotBeforeUpdate=="function";f||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==r||u!==c)&&Xu(t,a,r,c),un=!1;var g=t.memoizedState;a.state=g,Oi(t,r,a,s),u=t.memoizedState,o!==r||g!==u||at.current||un?(typeof m=="function"&&(Cl(t,n,m,r),u=t.memoizedState),(o=un||Yu(t,n,o,r,g,u,c))?(f||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(t.flags|=4194308)):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=u),a.props=r,a.state=u,a.context=c,r=o):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,df(e,t),o=t.memoizedProps,c=t.type===t.elementType?o:_t(t.type,o),a.props=c,f=t.pendingProps,g=a.context,u=n.contextType,typeof u=="object"&&u!==null?u=kt(u):(u=lt(n)?Fn:Je.current,u=yr(t,u));var x=n.getDerivedStateFromProps;(m=typeof x=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==f||g!==u)&&Xu(t,a,r,u),un=!1,g=t.memoizedState,a.state=g,Oi(t,r,a,s);var j=t.memoizedState;o!==f||g!==j||at.current||un?(typeof x=="function"&&(Cl(t,n,x,r),j=t.memoizedState),(c=un||Yu(t,n,c,r,g,j,u)||!1)?(m||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(r,j,u),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(r,j,u)),typeof a.componentDidUpdate=="function"&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof a.componentDidUpdate!="function"||o===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=j),a.props=r,a.state=j,a.context=u,r=c):(typeof a.componentDidUpdate!="function"||o===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),r=!1)}return _l(e,t,n,r,i,s)}function _l(e,t,n,r,s,i){zf(e,t);var a=(t.flags&128)!==0;if(!r&&!a)return s&&Bu(t,n,!1),tn(e,t,i);r=t.stateNode,ag.current=t;var o=a&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&a?(t.child=wr(t,e.child,null,i),t.child=wr(t,null,o,i)):et(e,t,o,i),t.memoizedState=r.state,s&&Bu(t,n,!0),t.child}function Mf(e){var t=e.stateNode;t.pendingContext?Fu(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Fu(e,t.context,!1),Po(e,t.containerInfo)}function sc(e,t,n,r,s){return xr(),So(s),t.flags|=256,et(e,t,n,r),t.child}var Tl={dehydrated:null,treeContext:null,retryLane:0};function Ol(e){return{baseLanes:e,cachePool:null,transitions:null}}function Uf(e,t,n){var r=t.pendingProps,s=we.current,i=!1,a=(t.flags&128)!==0,o;if((o=a)||(o=e!==null&&e.memoizedState===null?!1:(s&2)!==0),o?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(s|=1),de(we,s&1),e===null)return El(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(a=r.children,e=r.fallback,i?(r=t.mode,i=t.child,a={mode:"hidden",children:a},!(r&1)&&i!==null?(i.childLanes=0,i.pendingProps=a):i=ra(a,r,0,null),e=Un(e,r,n,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=Ol(n),t.memoizedState=Tl,e):Ao(t,a));if(s=e.memoizedState,s!==null&&(o=s.dehydrated,o!==null))return lg(e,t,a,r,o,s,n);if(i){i=r.fallback,a=t.mode,s=e.child,o=s.sibling;var u={mode:"hidden",children:r.children};return!(a&1)&&t.child!==s?(r=t.child,r.childLanes=0,r.pendingProps=u,t.deletions=null):(r=jn(s,u),r.subtreeFlags=s.subtreeFlags&14680064),o!==null?i=jn(o,i):(i=Un(i,a,n,null),i.flags|=2),i.return=t,r.return=t,r.sibling=i,t.child=r,r=i,i=t.child,a=e.child.memoizedState,a=a===null?Ol(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},i.memoizedState=a,i.childLanes=e.childLanes&~n,t.memoizedState=Tl,r}return i=e.child,e=i.sibling,r=jn(i,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Ao(e,t){return t=ra({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Gs(e,t,n,r){return r!==null&&So(r),wr(t,e.child,null,n),e=Ao(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function lg(e,t,n,r,s,i,a){if(n)return t.flags&256?(t.flags&=-257,r=Ma(Error(O(422))),Gs(e,t,a,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=r.fallback,s=t.mode,r=ra({mode:"visible",children:r.children},s,0,null),i=Un(i,s,a,null),i.flags|=2,r.return=t,i.return=t,r.sibling=i,t.child=r,t.mode&1&&wr(t,e.child,null,a),t.child.memoizedState=Ol(a),t.memoizedState=Tl,i);if(!(t.mode&1))return Gs(e,t,a,null);if(s.data==="$!"){if(r=s.nextSibling&&s.nextSibling.dataset,r)var o=r.dgst;return r=o,i=Error(O(419)),r=Ma(i,r,void 0),Gs(e,t,a,r)}if(o=(a&e.childLanes)!==0,it||o){if(r=Fe,r!==null){switch(a&-a){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(r.suspendedLanes|a)?0:s,s!==0&&s!==i.retryLane&&(i.retryLane=s,en(e,s),Dt(r,e,s,-1))}return Fo(),r=Ma(Error(O(421))),Gs(e,t,a,r)}return s.data==="$?"?(t.flags|=128,t.child=e.child,t=wg.bind(null,e),s._reactRetry=t,null):(e=i.treeContext,mt=xn(s.nextSibling),ht=t,he=!0,Ot=null,e!==null&&(St[Nt++]=Gt,St[Nt++]=Yt,St[Nt++]=Bn,Gt=e.id,Yt=e.overflow,Bn=t),t=Ao(t,r.children),t.flags|=4096,t)}function ic(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),kl(e.return,t,n)}function Ua(e,t,n,r,s){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:s}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=s)}function $f(e,t,n){var r=t.pendingProps,s=r.revealOrder,i=r.tail;if(et(e,t,r.children,n),r=we.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&ic(e,n,t);else if(e.tag===19)ic(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(de(we,r),!(t.mode&1))t.memoizedState=null;else switch(s){case"forwards":for(n=t.child,s=null;n!==null;)e=n.alternate,e!==null&&Li(e)===null&&(s=n),n=n.sibling;n=s,n===null?(s=t.child,t.child=null):(s=n.sibling,n.sibling=null),Ua(t,!1,s,n,i);break;case"backwards":for(n=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&Li(e)===null){t.child=s;break}e=s.sibling,s.sibling=n,n=s,s=e}Ua(t,!0,n,null,i);break;case"together":Ua(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function ui(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function tn(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Vn|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(O(153));if(t.child!==null){for(e=t.child,n=jn(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=jn(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function og(e,t,n){switch(t.tag){case 3:Mf(t),xr();break;case 5:ff(t);break;case 1:lt(t.type)&&Pi(t);break;case 4:Po(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,s=t.memoizedProps.value;de(_i,r._currentValue),r._currentValue=s;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(de(we,we.current&1),t.flags|=128,null):n&t.child.childLanes?Uf(e,t,n):(de(we,we.current&1),e=tn(e,t,n),e!==null?e.sibling:null);de(we,we.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return $f(e,t,n);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),de(we,we.current),r)break;return null;case 22:case 23:return t.lanes=0,If(e,t,n)}return tn(e,t,n)}var Ff,Ll,Bf,Hf;Ff=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Ll=function(){};Bf=function(e,t,n,r){var s=e.memoizedProps;if(s!==r){e=t.stateNode,In(Bt.current);var i=null;switch(n){case"input":s=tl(e,s),r=tl(e,r),i=[];break;case"select":s=Ne({},s,{value:void 0}),r=Ne({},r,{value:void 0}),i=[];break;case"textarea":s=sl(e,s),r=sl(e,r),i=[];break;default:typeof s.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=ki)}al(n,r);var a;n=null;for(c in s)if(!r.hasOwnProperty(c)&&s.hasOwnProperty(c)&&s[c]!=null)if(c==="style"){var o=s[c];for(a in o)o.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(rs.hasOwnProperty(c)?i||(i=[]):(i=i||[]).push(c,null));for(c in r){var u=r[c];if(o=s!=null?s[c]:void 0,r.hasOwnProperty(c)&&u!==o&&(u!=null||o!=null))if(c==="style")if(o){for(a in o)!o.hasOwnProperty(a)||u&&u.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in u)u.hasOwnProperty(a)&&o[a]!==u[a]&&(n||(n={}),n[a]=u[a])}else n||(i||(i=[]),i.push(c,n)),n=u;else c==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,o=o?o.__html:void 0,u!=null&&o!==u&&(i=i||[]).push(c,u)):c==="children"?typeof u!="string"&&typeof u!="number"||(i=i||[]).push(c,""+u):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(rs.hasOwnProperty(c)?(u!=null&&c==="onScroll"&&fe("scroll",e),i||o===u||(i=[])):(i=i||[]).push(c,u))}n&&(i=i||[]).push("style",n);var c=i;(t.updateQueue=c)&&(t.flags|=4)}};Hf=function(e,t,n,r){n!==r&&(t.flags|=4)};function Fr(e,t){if(!he)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Ke(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var s=e.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags&14680064,r|=s.flags&14680064,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags,r|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function ug(e,t,n){var r=t.pendingProps;switch(wo(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ke(t),null;case 1:return lt(t.type)&&Ci(),Ke(t),null;case 3:return r=t.stateNode,Sr(),pe(at),pe(Je),bo(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Qs(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Ot!==null&&(Fl(Ot),Ot=null))),Ll(e,t),Ke(t),null;case 5:Ro(t);var s=In(hs.current);if(n=t.type,e!==null&&t.stateNode!=null)Bf(e,t,n,r,s),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(O(166));return Ke(t),null}if(e=In(Bt.current),Qs(t)){r=t.stateNode,n=t.type;var i=t.memoizedProps;switch(r[Ut]=t,r[ps]=i,e=(t.mode&1)!==0,n){case"dialog":fe("cancel",r),fe("close",r);break;case"iframe":case"object":case"embed":fe("load",r);break;case"video":case"audio":for(s=0;s<Qr.length;s++)fe(Qr[s],r);break;case"source":fe("error",r);break;case"img":case"image":case"link":fe("error",r),fe("load",r);break;case"details":fe("toggle",r);break;case"input":mu(r,i),fe("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},fe("invalid",r);break;case"textarea":gu(r,i),fe("invalid",r)}al(n,i),s=null;for(var a in i)if(i.hasOwnProperty(a)){var o=i[a];a==="children"?typeof o=="string"?r.textContent!==o&&(i.suppressHydrationWarning!==!0&&Ws(r.textContent,o,e),s=["children",o]):typeof o=="number"&&r.textContent!==""+o&&(i.suppressHydrationWarning!==!0&&Ws(r.textContent,o,e),s=["children",""+o]):rs.hasOwnProperty(a)&&o!=null&&a==="onScroll"&&fe("scroll",r)}switch(n){case"input":Ms(r),hu(r,i,!0);break;case"textarea":Ms(r),vu(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=ki)}r=s,t.updateQueue=r,r!==null&&(t.flags|=4)}else{a=s.nodeType===9?s:s.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=gd(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=a.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=a.createElement(n,{is:r.is}):(e=a.createElement(n),n==="select"&&(a=e,r.multiple?a.multiple=!0:r.size&&(a.size=r.size))):e=a.createElementNS(e,n),e[Ut]=t,e[ps]=r,Ff(e,t,!1,!1),t.stateNode=e;e:{switch(a=ll(n,r),n){case"dialog":fe("cancel",e),fe("close",e),s=r;break;case"iframe":case"object":case"embed":fe("load",e),s=r;break;case"video":case"audio":for(s=0;s<Qr.length;s++)fe(Qr[s],e);s=r;break;case"source":fe("error",e),s=r;break;case"img":case"image":case"link":fe("error",e),fe("load",e),s=r;break;case"details":fe("toggle",e),s=r;break;case"input":mu(e,r),s=tl(e,r),fe("invalid",e);break;case"option":s=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},s=Ne({},r,{value:void 0}),fe("invalid",e);break;case"textarea":gu(e,r),s=sl(e,r),fe("invalid",e);break;default:s=r}al(n,s),o=s;for(i in o)if(o.hasOwnProperty(i)){var u=o[i];i==="style"?xd(e,u):i==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&vd(e,u)):i==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&ss(e,u):typeof u=="number"&&ss(e,""+u):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(rs.hasOwnProperty(i)?u!=null&&i==="onScroll"&&fe("scroll",e):u!=null&&so(e,i,u,a))}switch(n){case"input":Ms(e),hu(e,r,!1);break;case"textarea":Ms(e),vu(e);break;case"option":r.value!=null&&e.setAttribute("value",""+kn(r.value));break;case"select":e.multiple=!!r.multiple,i=r.value,i!=null?dr(e,!!r.multiple,i,!1):r.defaultValue!=null&&dr(e,!!r.multiple,r.defaultValue,!0);break;default:typeof s.onClick=="function"&&(e.onclick=ki)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Ke(t),null;case 6:if(e&&t.stateNode!=null)Hf(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(O(166));if(n=In(hs.current),In(Bt.current),Qs(t)){if(r=t.stateNode,n=t.memoizedProps,r[Ut]=t,(i=r.nodeValue!==n)&&(e=ht,e!==null))switch(e.tag){case 3:Ws(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Ws(r.nodeValue,n,(e.mode&1)!==0)}i&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Ut]=t,t.stateNode=r}return Ke(t),null;case 13:if(pe(we),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(he&&mt!==null&&t.mode&1&&!(t.flags&128))lf(),xr(),t.flags|=98560,i=!1;else if(i=Qs(t),r!==null&&r.dehydrated!==null){if(e===null){if(!i)throw Error(O(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(O(317));i[Ut]=t}else xr(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Ke(t),i=!1}else Ot!==null&&(Fl(Ot),Ot=null),i=!0;if(!i)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||we.current&1?Ue===0&&(Ue=3):Fo())),t.updateQueue!==null&&(t.flags|=4),Ke(t),null);case 4:return Sr(),Ll(e,t),e===null&&ds(t.stateNode.containerInfo),Ke(t),null;case 10:return Eo(t.type._context),Ke(t),null;case 17:return lt(t.type)&&Ci(),Ke(t),null;case 19:if(pe(we),i=t.memoizedState,i===null)return Ke(t),null;if(r=(t.flags&128)!==0,a=i.rendering,a===null)if(r)Fr(i,!1);else{if(Ue!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(a=Li(e),a!==null){for(t.flags|=128,Fr(i,!1),r=a.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)i=n,e=r,i.flags&=14680066,a=i.alternate,a===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=a.childLanes,i.lanes=a.lanes,i.child=a.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=a.memoizedProps,i.memoizedState=a.memoizedState,i.updateQueue=a.updateQueue,i.type=a.type,e=a.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return de(we,we.current&1|2),t.child}e=e.sibling}i.tail!==null&&Ce()>jr&&(t.flags|=128,r=!0,Fr(i,!1),t.lanes=4194304)}else{if(!r)if(e=Li(a),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Fr(i,!0),i.tail===null&&i.tailMode==="hidden"&&!a.alternate&&!he)return Ke(t),null}else 2*Ce()-i.renderingStartTime>jr&&n!==1073741824&&(t.flags|=128,r=!0,Fr(i,!1),t.lanes=4194304);i.isBackwards?(a.sibling=t.child,t.child=a):(n=i.last,n!==null?n.sibling=a:t.child=a,i.last=a)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=Ce(),t.sibling=null,n=we.current,de(we,r?n&1|2:n&1),t):(Ke(t),null);case 22:case 23:return $o(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?pt&1073741824&&(Ke(t),t.subtreeFlags&6&&(t.flags|=8192)):Ke(t),null;case 24:return null;case 25:return null}throw Error(O(156,t.tag))}function cg(e,t){switch(wo(t),t.tag){case 1:return lt(t.type)&&Ci(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Sr(),pe(at),pe(Je),bo(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Ro(t),null;case 13:if(pe(we),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(O(340));xr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return pe(we),null;case 4:return Sr(),null;case 10:return Eo(t.type._context),null;case 22:case 23:return $o(),null;case 24:return null;default:return null}}var Ys=!1,Ye=!1,dg=typeof WeakSet=="function"?WeakSet:Set,$=null;function ur(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Ee(e,t,r)}else n.current=null}function Dl(e,t,n){try{n()}catch(r){Ee(e,t,r)}}var ac=!1;function fg(e,t){if(vl=Ni,e=Qd(),yo(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var s=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var a=0,o=-1,u=-1,c=0,m=0,f=e,g=null;t:for(;;){for(var x;f!==n||s!==0&&f.nodeType!==3||(o=a+s),f!==i||r!==0&&f.nodeType!==3||(u=a+r),f.nodeType===3&&(a+=f.nodeValue.length),(x=f.firstChild)!==null;)g=f,f=x;for(;;){if(f===e)break t;if(g===n&&++c===s&&(o=a),g===i&&++m===r&&(u=a),(x=f.nextSibling)!==null)break;f=g,g=f.parentNode}f=x}n=o===-1||u===-1?null:{start:o,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(yl={focusedElem:e,selectionRange:n},Ni=!1,$=t;$!==null;)if(t=$,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,$=e;else for(;$!==null;){t=$;try{var j=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(j!==null){var N=j.memoizedProps,S=j.memoizedState,d=t.stateNode,p=d.getSnapshotBeforeUpdate(t.elementType===t.type?N:_t(t.type,N),S);d.__reactInternalSnapshotBeforeUpdate=p}break;case 3:var h=t.stateNode.containerInfo;h.nodeType===1?h.textContent="":h.nodeType===9&&h.documentElement&&h.removeChild(h.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(O(163))}}catch(w){Ee(t,t.return,w)}if(e=t.sibling,e!==null){e.return=t.return,$=e;break}$=t.return}return j=ac,ac=!1,j}function es(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var s=r=r.next;do{if((s.tag&e)===e){var i=s.destroy;s.destroy=void 0,i!==void 0&&Dl(t,n,i)}s=s.next}while(s!==r)}}function ta(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Al(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Vf(e){var t=e.alternate;t!==null&&(e.alternate=null,Vf(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Ut],delete t[ps],delete t[Sl],delete t[Kh],delete t[Gh])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function qf(e){return e.tag===5||e.tag===3||e.tag===4}function lc(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||qf(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Il(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=ki));else if(r!==4&&(e=e.child,e!==null))for(Il(e,t,n),e=e.sibling;e!==null;)Il(e,t,n),e=e.sibling}function zl(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(zl(e,t,n),e=e.sibling;e!==null;)zl(e,t,n),e=e.sibling}var Be=null,Tt=!1;function an(e,t,n){for(n=n.child;n!==null;)Wf(e,t,n),n=n.sibling}function Wf(e,t,n){if(Ft&&typeof Ft.onCommitFiberUnmount=="function")try{Ft.onCommitFiberUnmount(Qi,n)}catch{}switch(n.tag){case 5:Ye||ur(n,t);case 6:var r=Be,s=Tt;Be=null,an(e,t,n),Be=r,Tt=s,Be!==null&&(Tt?(e=Be,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Be.removeChild(n.stateNode));break;case 18:Be!==null&&(Tt?(e=Be,n=n.stateNode,e.nodeType===8?Oa(e.parentNode,n):e.nodeType===1&&Oa(e,n),os(e)):Oa(Be,n.stateNode));break;case 4:r=Be,s=Tt,Be=n.stateNode.containerInfo,Tt=!0,an(e,t,n),Be=r,Tt=s;break;case 0:case 11:case 14:case 15:if(!Ye&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){s=r=r.next;do{var i=s,a=i.destroy;i=i.tag,a!==void 0&&(i&2||i&4)&&Dl(n,t,a),s=s.next}while(s!==r)}an(e,t,n);break;case 1:if(!Ye&&(ur(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(o){Ee(n,t,o)}an(e,t,n);break;case 21:an(e,t,n);break;case 22:n.mode&1?(Ye=(r=Ye)||n.memoizedState!==null,an(e,t,n),Ye=r):an(e,t,n);break;default:an(e,t,n)}}function oc(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new dg),t.forEach(function(r){var s=Sg.bind(null,e,r);n.has(r)||(n.add(r),r.then(s,s))})}}function bt(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var s=n[r];try{var i=e,a=t,o=a;e:for(;o!==null;){switch(o.tag){case 5:Be=o.stateNode,Tt=!1;break e;case 3:Be=o.stateNode.containerInfo,Tt=!0;break e;case 4:Be=o.stateNode.containerInfo,Tt=!0;break e}o=o.return}if(Be===null)throw Error(O(160));Wf(i,a,s),Be=null,Tt=!1;var u=s.alternate;u!==null&&(u.return=null),s.return=null}catch(c){Ee(s,t,c)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Qf(t,e),t=t.sibling}function Qf(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(bt(t,e),zt(e),r&4){try{es(3,e,e.return),ta(3,e)}catch(N){Ee(e,e.return,N)}try{es(5,e,e.return)}catch(N){Ee(e,e.return,N)}}break;case 1:bt(t,e),zt(e),r&512&&n!==null&&ur(n,n.return);break;case 5:if(bt(t,e),zt(e),r&512&&n!==null&&ur(n,n.return),e.flags&32){var s=e.stateNode;try{ss(s,"")}catch(N){Ee(e,e.return,N)}}if(r&4&&(s=e.stateNode,s!=null)){var i=e.memoizedProps,a=n!==null?n.memoizedProps:i,o=e.type,u=e.updateQueue;if(e.updateQueue=null,u!==null)try{o==="input"&&i.type==="radio"&&i.name!=null&&md(s,i),ll(o,a);var c=ll(o,i);for(a=0;a<u.length;a+=2){var m=u[a],f=u[a+1];m==="style"?xd(s,f):m==="dangerouslySetInnerHTML"?vd(s,f):m==="children"?ss(s,f):so(s,m,f,c)}switch(o){case"input":nl(s,i);break;case"textarea":hd(s,i);break;case"select":var g=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!i.multiple;var x=i.value;x!=null?dr(s,!!i.multiple,x,!1):g!==!!i.multiple&&(i.defaultValue!=null?dr(s,!!i.multiple,i.defaultValue,!0):dr(s,!!i.multiple,i.multiple?[]:"",!1))}s[ps]=i}catch(N){Ee(e,e.return,N)}}break;case 6:if(bt(t,e),zt(e),r&4){if(e.stateNode===null)throw Error(O(162));s=e.stateNode,i=e.memoizedProps;try{s.nodeValue=i}catch(N){Ee(e,e.return,N)}}break;case 3:if(bt(t,e),zt(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{os(t.containerInfo)}catch(N){Ee(e,e.return,N)}break;case 4:bt(t,e),zt(e);break;case 13:bt(t,e),zt(e),s=e.child,s.flags&8192&&(i=s.memoizedState!==null,s.stateNode.isHidden=i,!i||s.alternate!==null&&s.alternate.memoizedState!==null||(Mo=Ce())),r&4&&oc(e);break;case 22:if(m=n!==null&&n.memoizedState!==null,e.mode&1?(Ye=(c=Ye)||m,bt(t,e),Ye=c):bt(t,e),zt(e),r&8192){if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!m&&e.mode&1)for($=e,m=e.child;m!==null;){for(f=$=m;$!==null;){switch(g=$,x=g.child,g.tag){case 0:case 11:case 14:case 15:es(4,g,g.return);break;case 1:ur(g,g.return);var j=g.stateNode;if(typeof j.componentWillUnmount=="function"){r=g,n=g.return;try{t=r,j.props=t.memoizedProps,j.state=t.memoizedState,j.componentWillUnmount()}catch(N){Ee(r,n,N)}}break;case 5:ur(g,g.return);break;case 22:if(g.memoizedState!==null){cc(f);continue}}x!==null?(x.return=g,$=x):cc(f)}m=m.sibling}e:for(m=null,f=e;;){if(f.tag===5){if(m===null){m=f;try{s=f.stateNode,c?(i=s.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(o=f.stateNode,u=f.memoizedProps.style,a=u!=null&&u.hasOwnProperty("display")?u.display:null,o.style.display=yd("display",a))}catch(N){Ee(e,e.return,N)}}}else if(f.tag===6){if(m===null)try{f.stateNode.nodeValue=c?"":f.memoizedProps}catch(N){Ee(e,e.return,N)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===e)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===e)break e;for(;f.sibling===null;){if(f.return===null||f.return===e)break e;m===f&&(m=null),f=f.return}m===f&&(m=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:bt(t,e),zt(e),r&4&&oc(e);break;case 21:break;default:bt(t,e),zt(e)}}function zt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(qf(n)){var r=n;break e}n=n.return}throw Error(O(160))}switch(r.tag){case 5:var s=r.stateNode;r.flags&32&&(ss(s,""),r.flags&=-33);var i=lc(e);zl(e,i,s);break;case 3:case 4:var a=r.stateNode.containerInfo,o=lc(e);Il(e,o,a);break;default:throw Error(O(161))}}catch(u){Ee(e,e.return,u)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function pg(e,t,n){$=e,Kf(e)}function Kf(e,t,n){for(var r=(e.mode&1)!==0;$!==null;){var s=$,i=s.child;if(s.tag===22&&r){var a=s.memoizedState!==null||Ys;if(!a){var o=s.alternate,u=o!==null&&o.memoizedState!==null||Ye;o=Ys;var c=Ye;if(Ys=a,(Ye=u)&&!c)for($=s;$!==null;)a=$,u=a.child,a.tag===22&&a.memoizedState!==null?dc(s):u!==null?(u.return=a,$=u):dc(s);for(;i!==null;)$=i,Kf(i),i=i.sibling;$=s,Ys=o,Ye=c}uc(e)}else s.subtreeFlags&8772&&i!==null?(i.return=s,$=i):uc(e)}}function uc(e){for(;$!==null;){var t=$;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:Ye||ta(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!Ye)if(n===null)r.componentDidMount();else{var s=t.elementType===t.type?n.memoizedProps:_t(t.type,n.memoizedProps);r.componentDidUpdate(s,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&Qu(t,i,r);break;case 3:var a=t.updateQueue;if(a!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Qu(t,a,n)}break;case 5:var o=t.stateNode;if(n===null&&t.flags&4){n=o;var u=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var c=t.alternate;if(c!==null){var m=c.memoizedState;if(m!==null){var f=m.dehydrated;f!==null&&os(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(O(163))}Ye||t.flags&512&&Al(t)}catch(g){Ee(t,t.return,g)}}if(t===e){$=null;break}if(n=t.sibling,n!==null){n.return=t.return,$=n;break}$=t.return}}function cc(e){for(;$!==null;){var t=$;if(t===e){$=null;break}var n=t.sibling;if(n!==null){n.return=t.return,$=n;break}$=t.return}}function dc(e){for(;$!==null;){var t=$;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{ta(4,t)}catch(u){Ee(t,n,u)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var s=t.return;try{r.componentDidMount()}catch(u){Ee(t,s,u)}}var i=t.return;try{Al(t)}catch(u){Ee(t,i,u)}break;case 5:var a=t.return;try{Al(t)}catch(u){Ee(t,a,u)}}}catch(u){Ee(t,t.return,u)}if(t===e){$=null;break}var o=t.sibling;if(o!==null){o.return=t.return,$=o;break}$=t.return}}var mg=Math.ceil,Ii=rn.ReactCurrentDispatcher,Io=rn.ReactCurrentOwner,Et=rn.ReactCurrentBatchConfig,se=0,Fe=null,Oe=null,Ve=0,pt=0,cr=Rn(0),Ue=0,xs=null,Vn=0,na=0,zo=0,ts=null,st=null,Mo=0,jr=1/0,Qt=null,zi=!1,Ml=null,Sn=null,Xs=!1,mn=null,Mi=0,ns=0,Ul=null,ci=-1,di=0;function tt(){return se&6?Ce():ci!==-1?ci:ci=Ce()}function Nn(e){return e.mode&1?se&2&&Ve!==0?Ve&-Ve:Xh.transition!==null?(di===0&&(di=Td()),di):(e=ue,e!==0||(e=window.event,e=e===void 0?16:Md(e.type)),e):1}function Dt(e,t,n,r){if(50<ns)throw ns=0,Ul=null,Error(O(185));Es(e,n,r),(!(se&2)||e!==Fe)&&(e===Fe&&(!(se&2)&&(na|=n),Ue===4&&dn(e,Ve)),ot(e,r),n===1&&se===0&&!(t.mode&1)&&(jr=Ce()+500,Ji&&bn()))}function ot(e,t){var n=e.callbackNode;Xm(e,t);var r=Si(e,e===Fe?Ve:0);if(r===0)n!==null&&wu(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&wu(n),t===1)e.tag===0?Yh(fc.bind(null,e)):rf(fc.bind(null,e)),Wh(function(){!(se&6)&&bn()}),n=null;else{switch(Od(r)){case 1:n=uo;break;case 4:n=bd;break;case 16:n=wi;break;case 536870912:n=_d;break;default:n=wi}n=np(n,Gf.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Gf(e,t){if(ci=-1,di=0,se&6)throw Error(O(327));var n=e.callbackNode;if(gr()&&e.callbackNode!==n)return null;var r=Si(e,e===Fe?Ve:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=Ui(e,r);else{t=r;var s=se;se|=2;var i=Xf();(Fe!==e||Ve!==t)&&(Qt=null,jr=Ce()+500,Mn(e,t));do try{vg();break}catch(o){Yf(e,o)}while(!0);jo(),Ii.current=i,se=s,Oe!==null?t=0:(Fe=null,Ve=0,t=Ue)}if(t!==0){if(t===2&&(s=fl(e),s!==0&&(r=s,t=$l(e,s))),t===1)throw n=xs,Mn(e,0),dn(e,r),ot(e,Ce()),n;if(t===6)dn(e,r);else{if(s=e.current.alternate,!(r&30)&&!hg(s)&&(t=Ui(e,r),t===2&&(i=fl(e),i!==0&&(r=i,t=$l(e,i))),t===1))throw n=xs,Mn(e,0),dn(e,r),ot(e,Ce()),n;switch(e.finishedWork=s,e.finishedLanes=r,t){case 0:case 1:throw Error(O(345));case 2:Ln(e,st,Qt);break;case 3:if(dn(e,r),(r&130023424)===r&&(t=Mo+500-Ce(),10<t)){if(Si(e,0)!==0)break;if(s=e.suspendedLanes,(s&r)!==r){tt(),e.pingedLanes|=e.suspendedLanes&s;break}e.timeoutHandle=wl(Ln.bind(null,e,st,Qt),t);break}Ln(e,st,Qt);break;case 4:if(dn(e,r),(r&4194240)===r)break;for(t=e.eventTimes,s=-1;0<r;){var a=31-Lt(r);i=1<<a,a=t[a],a>s&&(s=a),r&=~i}if(r=s,r=Ce()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*mg(r/1960))-r,10<r){e.timeoutHandle=wl(Ln.bind(null,e,st,Qt),r);break}Ln(e,st,Qt);break;case 5:Ln(e,st,Qt);break;default:throw Error(O(329))}}}return ot(e,Ce()),e.callbackNode===n?Gf.bind(null,e):null}function $l(e,t){var n=ts;return e.current.memoizedState.isDehydrated&&(Mn(e,t).flags|=256),e=Ui(e,t),e!==2&&(t=st,st=n,t!==null&&Fl(t)),e}function Fl(e){st===null?st=e:st.push.apply(st,e)}function hg(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var s=n[r],i=s.getSnapshot;s=s.value;try{if(!At(i(),s))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function dn(e,t){for(t&=~zo,t&=~na,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Lt(t),r=1<<n;e[n]=-1,t&=~r}}function fc(e){if(se&6)throw Error(O(327));gr();var t=Si(e,0);if(!(t&1))return ot(e,Ce()),null;var n=Ui(e,t);if(e.tag!==0&&n===2){var r=fl(e);r!==0&&(t=r,n=$l(e,r))}if(n===1)throw n=xs,Mn(e,0),dn(e,t),ot(e,Ce()),n;if(n===6)throw Error(O(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Ln(e,st,Qt),ot(e,Ce()),null}function Uo(e,t){var n=se;se|=1;try{return e(t)}finally{se=n,se===0&&(jr=Ce()+500,Ji&&bn())}}function qn(e){mn!==null&&mn.tag===0&&!(se&6)&&gr();var t=se;se|=1;var n=Et.transition,r=ue;try{if(Et.transition=null,ue=1,e)return e()}finally{ue=r,Et.transition=n,se=t,!(se&6)&&bn()}}function $o(){pt=cr.current,pe(cr)}function Mn(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,qh(n)),Oe!==null)for(n=Oe.return;n!==null;){var r=n;switch(wo(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Ci();break;case 3:Sr(),pe(at),pe(Je),bo();break;case 5:Ro(r);break;case 4:Sr();break;case 13:pe(we);break;case 19:pe(we);break;case 10:Eo(r.type._context);break;case 22:case 23:$o()}n=n.return}if(Fe=e,Oe=e=jn(e.current,null),Ve=pt=t,Ue=0,xs=null,zo=na=Vn=0,st=ts=null,An!==null){for(t=0;t<An.length;t++)if(n=An[t],r=n.interleaved,r!==null){n.interleaved=null;var s=r.next,i=n.pending;if(i!==null){var a=i.next;i.next=s,r.next=a}n.pending=r}An=null}return e}function Yf(e,t){do{var n=Oe;try{if(jo(),li.current=Ai,Di){for(var r=Se.memoizedState;r!==null;){var s=r.queue;s!==null&&(s.pending=null),r=r.next}Di=!1}if(Hn=0,$e=ze=Se=null,Zr=!1,gs=0,Io.current=null,n===null||n.return===null){Ue=1,xs=t,Oe=null;break}e:{var i=e,a=n.return,o=n,u=t;if(t=Ve,o.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var c=u,m=o,f=m.tag;if(!(m.mode&1)&&(f===0||f===11||f===15)){var g=m.alternate;g?(m.updateQueue=g.updateQueue,m.memoizedState=g.memoizedState,m.lanes=g.lanes):(m.updateQueue=null,m.memoizedState=null)}var x=Zu(a);if(x!==null){x.flags&=-257,ec(x,a,o,i,t),x.mode&1&&Ju(i,c,t),t=x,u=c;var j=t.updateQueue;if(j===null){var N=new Set;N.add(u),t.updateQueue=N}else j.add(u);break e}else{if(!(t&1)){Ju(i,c,t),Fo();break e}u=Error(O(426))}}else if(he&&o.mode&1){var S=Zu(a);if(S!==null){!(S.flags&65536)&&(S.flags|=256),ec(S,a,o,i,t),So(Nr(u,o));break e}}i=u=Nr(u,o),Ue!==4&&(Ue=2),ts===null?ts=[i]:ts.push(i),i=a;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var d=Lf(i,u,t);Wu(i,d);break e;case 1:o=u;var p=i.type,h=i.stateNode;if(!(i.flags&128)&&(typeof p.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(Sn===null||!Sn.has(h)))){i.flags|=65536,t&=-t,i.lanes|=t;var w=Df(i,o,t);Wu(i,w);break e}}i=i.return}while(i!==null)}Zf(n)}catch(C){t=C,Oe===n&&n!==null&&(Oe=n=n.return);continue}break}while(!0)}function Xf(){var e=Ii.current;return Ii.current=Ai,e===null?Ai:e}function Fo(){(Ue===0||Ue===3||Ue===2)&&(Ue=4),Fe===null||!(Vn&268435455)&&!(na&268435455)||dn(Fe,Ve)}function Ui(e,t){var n=se;se|=2;var r=Xf();(Fe!==e||Ve!==t)&&(Qt=null,Mn(e,t));do try{gg();break}catch(s){Yf(e,s)}while(!0);if(jo(),se=n,Ii.current=r,Oe!==null)throw Error(O(261));return Fe=null,Ve=0,Ue}function gg(){for(;Oe!==null;)Jf(Oe)}function vg(){for(;Oe!==null&&!Bm();)Jf(Oe)}function Jf(e){var t=tp(e.alternate,e,pt);e.memoizedProps=e.pendingProps,t===null?Zf(e):Oe=t,Io.current=null}function Zf(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=cg(n,t),n!==null){n.flags&=32767,Oe=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Ue=6,Oe=null;return}}else if(n=ug(n,t,pt),n!==null){Oe=n;return}if(t=t.sibling,t!==null){Oe=t;return}Oe=t=e}while(t!==null);Ue===0&&(Ue=5)}function Ln(e,t,n){var r=ue,s=Et.transition;try{Et.transition=null,ue=1,yg(e,t,n,r)}finally{Et.transition=s,ue=r}return null}function yg(e,t,n,r){do gr();while(mn!==null);if(se&6)throw Error(O(327));n=e.finishedWork;var s=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(O(177));e.callbackNode=null,e.callbackPriority=0;var i=n.lanes|n.childLanes;if(Jm(e,i),e===Fe&&(Oe=Fe=null,Ve=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Xs||(Xs=!0,np(wi,function(){return gr(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=Et.transition,Et.transition=null;var a=ue;ue=1;var o=se;se|=4,Io.current=null,fg(e,n),Qf(n,e),Mh(yl),Ni=!!vl,yl=vl=null,e.current=n,pg(n),Hm(),se=o,ue=a,Et.transition=i}else e.current=n;if(Xs&&(Xs=!1,mn=e,Mi=s),i=e.pendingLanes,i===0&&(Sn=null),Wm(n.stateNode),ot(e,Ce()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)s=t[n],r(s.value,{componentStack:s.stack,digest:s.digest});if(zi)throw zi=!1,e=Ml,Ml=null,e;return Mi&1&&e.tag!==0&&gr(),i=e.pendingLanes,i&1?e===Ul?ns++:(ns=0,Ul=e):ns=0,bn(),null}function gr(){if(mn!==null){var e=Od(Mi),t=Et.transition,n=ue;try{if(Et.transition=null,ue=16>e?16:e,mn===null)var r=!1;else{if(e=mn,mn=null,Mi=0,se&6)throw Error(O(331));var s=se;for(se|=4,$=e.current;$!==null;){var i=$,a=i.child;if($.flags&16){var o=i.deletions;if(o!==null){for(var u=0;u<o.length;u++){var c=o[u];for($=c;$!==null;){var m=$;switch(m.tag){case 0:case 11:case 15:es(8,m,i)}var f=m.child;if(f!==null)f.return=m,$=f;else for(;$!==null;){m=$;var g=m.sibling,x=m.return;if(Vf(m),m===c){$=null;break}if(g!==null){g.return=x,$=g;break}$=x}}}var j=i.alternate;if(j!==null){var N=j.child;if(N!==null){j.child=null;do{var S=N.sibling;N.sibling=null,N=S}while(N!==null)}}$=i}}if(i.subtreeFlags&2064&&a!==null)a.return=i,$=a;else e:for(;$!==null;){if(i=$,i.flags&2048)switch(i.tag){case 0:case 11:case 15:es(9,i,i.return)}var d=i.sibling;if(d!==null){d.return=i.return,$=d;break e}$=i.return}}var p=e.current;for($=p;$!==null;){a=$;var h=a.child;if(a.subtreeFlags&2064&&h!==null)h.return=a,$=h;else e:for(a=p;$!==null;){if(o=$,o.flags&2048)try{switch(o.tag){case 0:case 11:case 15:ta(9,o)}}catch(C){Ee(o,o.return,C)}if(o===a){$=null;break e}var w=o.sibling;if(w!==null){w.return=o.return,$=w;break e}$=o.return}}if(se=s,bn(),Ft&&typeof Ft.onPostCommitFiberRoot=="function")try{Ft.onPostCommitFiberRoot(Qi,e)}catch{}r=!0}return r}finally{ue=n,Et.transition=t}}return!1}function pc(e,t,n){t=Nr(n,t),t=Lf(e,t,1),e=wn(e,t,1),t=tt(),e!==null&&(Es(e,1,t),ot(e,t))}function Ee(e,t,n){if(e.tag===3)pc(e,e,n);else for(;t!==null;){if(t.tag===3){pc(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Sn===null||!Sn.has(r))){e=Nr(n,e),e=Df(t,e,1),t=wn(t,e,1),e=tt(),t!==null&&(Es(t,1,e),ot(t,e));break}}t=t.return}}function xg(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=tt(),e.pingedLanes|=e.suspendedLanes&n,Fe===e&&(Ve&n)===n&&(Ue===4||Ue===3&&(Ve&130023424)===Ve&&500>Ce()-Mo?Mn(e,0):zo|=n),ot(e,t)}function ep(e,t){t===0&&(e.mode&1?(t=Fs,Fs<<=1,!(Fs&130023424)&&(Fs=4194304)):t=1);var n=tt();e=en(e,t),e!==null&&(Es(e,t,n),ot(e,n))}function wg(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),ep(e,n)}function Sg(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,s=e.memoizedState;s!==null&&(n=s.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(O(314))}r!==null&&r.delete(t),ep(e,n)}var tp;tp=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||at.current)it=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return it=!1,og(e,t,n);it=!!(e.flags&131072)}else it=!1,he&&t.flags&1048576&&sf(t,bi,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;ui(e,t),e=t.pendingProps;var s=yr(t,Je.current);hr(t,n),s=To(null,t,r,e,s,n);var i=Oo();return t.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,lt(r)?(i=!0,Pi(t)):i=!1,t.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,Co(t),s.updater=ea,t.stateNode=s,s._reactInternals=t,Pl(t,r,e,n),t=_l(null,t,r,!0,i,n)):(t.tag=0,he&&i&&xo(t),et(null,t,s,n),t=t.child),t;case 16:r=t.elementType;e:{switch(ui(e,t),e=t.pendingProps,s=r._init,r=s(r._payload),t.type=r,s=t.tag=jg(r),e=_t(r,e),s){case 0:t=bl(null,t,r,e,n);break e;case 1:t=rc(null,t,r,e,n);break e;case 11:t=tc(null,t,r,e,n);break e;case 14:t=nc(null,t,r,_t(r.type,e),n);break e}throw Error(O(306,r,""))}return t;case 0:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:_t(r,s),bl(e,t,r,s,n);case 1:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:_t(r,s),rc(e,t,r,s,n);case 3:e:{if(Mf(t),e===null)throw Error(O(387));r=t.pendingProps,i=t.memoizedState,s=i.element,df(e,t),Oi(t,r,null,n);var a=t.memoizedState;if(r=a.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){s=Nr(Error(O(423)),t),t=sc(e,t,r,n,s);break e}else if(r!==s){s=Nr(Error(O(424)),t),t=sc(e,t,r,n,s);break e}else for(mt=xn(t.stateNode.containerInfo.firstChild),ht=t,he=!0,Ot=null,n=uf(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(xr(),r===s){t=tn(e,t,n);break e}et(e,t,r,n)}t=t.child}return t;case 5:return ff(t),e===null&&El(t),r=t.type,s=t.pendingProps,i=e!==null?e.memoizedProps:null,a=s.children,xl(r,s)?a=null:i!==null&&xl(r,i)&&(t.flags|=32),zf(e,t),et(e,t,a,n),t.child;case 6:return e===null&&El(t),null;case 13:return Uf(e,t,n);case 4:return Po(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=wr(t,null,r,n):et(e,t,r,n),t.child;case 11:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:_t(r,s),tc(e,t,r,s,n);case 7:return et(e,t,t.pendingProps,n),t.child;case 8:return et(e,t,t.pendingProps.children,n),t.child;case 12:return et(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,s=t.pendingProps,i=t.memoizedProps,a=s.value,de(_i,r._currentValue),r._currentValue=a,i!==null)if(At(i.value,a)){if(i.children===s.children&&!at.current){t=tn(e,t,n);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var o=i.dependencies;if(o!==null){a=i.child;for(var u=o.firstContext;u!==null;){if(u.context===r){if(i.tag===1){u=Xt(-1,n&-n),u.tag=2;var c=i.updateQueue;if(c!==null){c=c.shared;var m=c.pending;m===null?u.next=u:(u.next=m.next,m.next=u),c.pending=u}}i.lanes|=n,u=i.alternate,u!==null&&(u.lanes|=n),kl(i.return,n,t),o.lanes|=n;break}u=u.next}}else if(i.tag===10)a=i.type===t.type?null:i.child;else if(i.tag===18){if(a=i.return,a===null)throw Error(O(341));a.lanes|=n,o=a.alternate,o!==null&&(o.lanes|=n),kl(a,n,t),a=i.sibling}else a=i.child;if(a!==null)a.return=i;else for(a=i;a!==null;){if(a===t){a=null;break}if(i=a.sibling,i!==null){i.return=a.return,a=i;break}a=a.return}i=a}et(e,t,s.children,n),t=t.child}return t;case 9:return s=t.type,r=t.pendingProps.children,hr(t,n),s=kt(s),r=r(s),t.flags|=1,et(e,t,r,n),t.child;case 14:return r=t.type,s=_t(r,t.pendingProps),s=_t(r.type,s),nc(e,t,r,s,n);case 15:return Af(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:_t(r,s),ui(e,t),t.tag=1,lt(r)?(e=!0,Pi(t)):e=!1,hr(t,n),Of(t,r,s),Pl(t,r,s,n),_l(null,t,r,!0,e,n);case 19:return $f(e,t,n);case 22:return If(e,t,n)}throw Error(O(156,t.tag))};function np(e,t){return Rd(e,t)}function Ng(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function jt(e,t,n,r){return new Ng(e,t,n,r)}function Bo(e){return e=e.prototype,!(!e||!e.isReactComponent)}function jg(e){if(typeof e=="function")return Bo(e)?1:0;if(e!=null){if(e=e.$$typeof,e===ao)return 11;if(e===lo)return 14}return 2}function jn(e,t){var n=e.alternate;return n===null?(n=jt(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function fi(e,t,n,r,s,i){var a=2;if(r=e,typeof e=="function")Bo(e)&&(a=1);else if(typeof e=="string")a=5;else e:switch(e){case er:return Un(n.children,s,i,t);case io:a=8,s|=8;break;case Xa:return e=jt(12,n,t,s|2),e.elementType=Xa,e.lanes=i,e;case Ja:return e=jt(13,n,t,s),e.elementType=Ja,e.lanes=i,e;case Za:return e=jt(19,n,t,s),e.elementType=Za,e.lanes=i,e;case dd:return ra(n,s,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case ud:a=10;break e;case cd:a=9;break e;case ao:a=11;break e;case lo:a=14;break e;case on:a=16,r=null;break e}throw Error(O(130,e==null?e:typeof e,""))}return t=jt(a,n,t,s),t.elementType=e,t.type=r,t.lanes=i,t}function Un(e,t,n,r){return e=jt(7,e,r,t),e.lanes=n,e}function ra(e,t,n,r){return e=jt(22,e,r,t),e.elementType=dd,e.lanes=n,e.stateNode={isHidden:!1},e}function $a(e,t,n){return e=jt(6,e,null,t),e.lanes=n,e}function Fa(e,t,n){return t=jt(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Eg(e,t,n,r,s){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Sa(0),this.expirationTimes=Sa(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Sa(0),this.identifierPrefix=r,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function Ho(e,t,n,r,s,i,a,o,u){return e=new Eg(e,t,n,o,u),t===1?(t=1,i===!0&&(t|=8)):t=0,i=jt(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Co(i),e}function kg(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Zn,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function rp(e){if(!e)return Cn;e=e._reactInternals;e:{if(Yn(e)!==e||e.tag!==1)throw Error(O(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(lt(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(O(171))}if(e.tag===1){var n=e.type;if(lt(n))return nf(e,n,t)}return t}function sp(e,t,n,r,s,i,a,o,u){return e=Ho(n,r,!0,e,s,i,a,o,u),e.context=rp(null),n=e.current,r=tt(),s=Nn(n),i=Xt(r,s),i.callback=t??null,wn(n,i,s),e.current.lanes=s,Es(e,s,r),ot(e,r),e}function sa(e,t,n,r){var s=t.current,i=tt(),a=Nn(s);return n=rp(n),t.context===null?t.context=n:t.pendingContext=n,t=Xt(i,a),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=wn(s,t,a),e!==null&&(Dt(e,s,a,i),ai(e,s,a)),a}function $i(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function mc(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Vo(e,t){mc(e,t),(e=e.alternate)&&mc(e,t)}function Cg(){return null}var ip=typeof reportError=="function"?reportError:function(e){console.error(e)};function qo(e){this._internalRoot=e}ia.prototype.render=qo.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(O(409));sa(e,t,null,null)};ia.prototype.unmount=qo.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;qn(function(){sa(null,e,null,null)}),t[Zt]=null}};function ia(e){this._internalRoot=e}ia.prototype.unstable_scheduleHydration=function(e){if(e){var t=Ad();e={blockedOn:null,target:e,priority:t};for(var n=0;n<cn.length&&t!==0&&t<cn[n].priority;n++);cn.splice(n,0,e),n===0&&zd(e)}};function Wo(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function aa(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function hc(){}function Pg(e,t,n,r,s){if(s){if(typeof r=="function"){var i=r;r=function(){var c=$i(a);i.call(c)}}var a=sp(t,r,e,0,null,!1,!1,"",hc);return e._reactRootContainer=a,e[Zt]=a.current,ds(e.nodeType===8?e.parentNode:e),qn(),a}for(;s=e.lastChild;)e.removeChild(s);if(typeof r=="function"){var o=r;r=function(){var c=$i(u);o.call(c)}}var u=Ho(e,0,!1,null,null,!1,!1,"",hc);return e._reactRootContainer=u,e[Zt]=u.current,ds(e.nodeType===8?e.parentNode:e),qn(function(){sa(t,u,n,r)}),u}function la(e,t,n,r,s){var i=n._reactRootContainer;if(i){var a=i;if(typeof s=="function"){var o=s;s=function(){var u=$i(a);o.call(u)}}sa(t,a,e,s)}else a=Pg(n,t,e,s,r);return $i(a)}Ld=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Wr(t.pendingLanes);n!==0&&(co(t,n|1),ot(t,Ce()),!(se&6)&&(jr=Ce()+500,bn()))}break;case 13:qn(function(){var r=en(e,1);if(r!==null){var s=tt();Dt(r,e,1,s)}}),Vo(e,1)}};fo=function(e){if(e.tag===13){var t=en(e,134217728);if(t!==null){var n=tt();Dt(t,e,134217728,n)}Vo(e,134217728)}};Dd=function(e){if(e.tag===13){var t=Nn(e),n=en(e,t);if(n!==null){var r=tt();Dt(n,e,t,r)}Vo(e,t)}};Ad=function(){return ue};Id=function(e,t){var n=ue;try{return ue=e,t()}finally{ue=n}};ul=function(e,t,n){switch(t){case"input":if(nl(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var s=Xi(r);if(!s)throw Error(O(90));pd(r),nl(r,s)}}}break;case"textarea":hd(e,n);break;case"select":t=n.value,t!=null&&dr(e,!!n.multiple,t,!1)}};Nd=Uo;jd=qn;var Rg={usingClientEntryPoint:!1,Events:[Cs,sr,Xi,wd,Sd,Uo]},Br={findFiberByHostInstance:Dn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},bg={bundleType:Br.bundleType,version:Br.version,rendererPackageName:Br.rendererPackageName,rendererConfig:Br.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:rn.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Cd(e),e===null?null:e.stateNode},findFiberByHostInstance:Br.findFiberByHostInstance||Cg,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Js=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Js.isDisabled&&Js.supportsFiber)try{Qi=Js.inject(bg),Ft=Js}catch{}}vt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Rg;vt.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Wo(t))throw Error(O(200));return kg(e,t,null,n)};vt.createRoot=function(e,t){if(!Wo(e))throw Error(O(299));var n=!1,r="",s=ip;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(s=t.onRecoverableError)),t=Ho(e,1,!1,null,null,n,!1,r,s),e[Zt]=t.current,ds(e.nodeType===8?e.parentNode:e),new qo(t)};vt.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(O(188)):(e=Object.keys(e).join(","),Error(O(268,e)));return e=Cd(t),e=e===null?null:e.stateNode,e};vt.flushSync=function(e){return qn(e)};vt.hydrate=function(e,t,n){if(!aa(t))throw Error(O(200));return la(null,e,t,!0,n)};vt.hydrateRoot=function(e,t,n){if(!Wo(e))throw Error(O(405));var r=n!=null&&n.hydratedSources||null,s=!1,i="",a=ip;if(n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),t=sp(t,null,e,1,n??null,s,!1,i,a),e[Zt]=t.current,ds(e),r)for(e=0;e<r.length;e++)n=r[e],s=n._getVersion,s=s(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,s]:t.mutableSourceEagerHydrationData.push(n,s);return new ia(t)};vt.render=function(e,t,n){if(!aa(t))throw Error(O(200));return la(null,e,t,!1,n)};vt.unmountComponentAtNode=function(e){if(!aa(e))throw Error(O(40));return e._reactRootContainer?(qn(function(){la(null,null,e,!1,function(){e._reactRootContainer=null,e[Zt]=null})}),!0):!1};vt.unstable_batchedUpdates=Uo;vt.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!aa(n))throw Error(O(200));if(e==null||e._reactInternals===void 0)throw Error(O(38));return la(e,t,n,!1,r)};vt.version="18.3.1-next-f1338f8080-20240426";function ap(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ap)}catch(e){console.error(e)}}ap(),id.exports=vt;var _g=id.exports,gc=_g;Ga.createRoot=gc.createRoot,Ga.hydrateRoot=gc.hydrateRoot;/**
 * @remix-run/router v1.23.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function ws(){return ws=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},ws.apply(null,arguments)}var hn;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(hn||(hn={}));const vc="popstate";function Tg(e){e===void 0&&(e={});function t(r,s){let{pathname:i,search:a,hash:o}=r.location;return Bl("",{pathname:i,search:a,hash:o},s.state&&s.state.usr||null,s.state&&s.state.key||"default")}function n(r,s){return typeof s=="string"?s:Fi(s)}return Lg(t,n,null,e)}function Pe(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Qo(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Og(){return Math.random().toString(36).substr(2,8)}function yc(e,t){return{usr:e.state,key:e.key,idx:t}}function Bl(e,t,n,r){return n===void 0&&(n=null),ws({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?Rr(t):t,{state:n,key:t&&t.key||r||Og()})}function Fi(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(t+=r.charAt(0)==="#"?r:"#"+r),t}function Rr(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function Lg(e,t,n,r){r===void 0&&(r={});let{window:s=document.defaultView,v5Compat:i=!1}=r,a=s.history,o=hn.Pop,u=null,c=m();c==null&&(c=0,a.replaceState(ws({},a.state,{idx:c}),""));function m(){return(a.state||{idx:null}).idx}function f(){o=hn.Pop;let S=m(),d=S==null?null:S-c;c=S,u&&u({action:o,location:N.location,delta:d})}function g(S,d){o=hn.Push;let p=Bl(N.location,S,d);c=m()+1;let h=yc(p,c),w=N.createHref(p);try{a.pushState(h,"",w)}catch(C){if(C instanceof DOMException&&C.name==="DataCloneError")throw C;s.location.assign(w)}i&&u&&u({action:o,location:N.location,delta:1})}function x(S,d){o=hn.Replace;let p=Bl(N.location,S,d);c=m();let h=yc(p,c),w=N.createHref(p);a.replaceState(h,"",w),i&&u&&u({action:o,location:N.location,delta:0})}function j(S){let d=s.location.origin!=="null"?s.location.origin:s.location.href,p=typeof S=="string"?S:Fi(S);return p=p.replace(/ $/,"%20"),Pe(d,"No window.location.(origin|href) available to create URL for href: "+p),new URL(p,d)}let N={get action(){return o},get location(){return e(s,a)},listen(S){if(u)throw new Error("A history only accepts one active listener");return s.addEventListener(vc,f),u=S,()=>{s.removeEventListener(vc,f),u=null}},createHref(S){return t(s,S)},createURL:j,encodeLocation(S){let d=j(S);return{pathname:d.pathname,search:d.search,hash:d.hash}},push:g,replace:x,go(S){return a.go(S)}};return N}var xc;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(xc||(xc={}));function Dg(e,t,n){return n===void 0&&(n="/"),Ag(e,t,n)}function Ag(e,t,n,r){let s=typeof t=="string"?Rr(t):t,i=Ko(s.pathname||"/",n);if(i==null)return null;let a=lp(e);Ig(a);let o=null,u=Kg(i);for(let c=0;o==null&&c<a.length;++c)o=qg(a[c],u);return o}function lp(e,t,n,r){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r="");let s=(i,a,o)=>{let u={relativePath:o===void 0?i.path||"":o,caseSensitive:i.caseSensitive===!0,childrenIndex:a,route:i};u.relativePath.startsWith("/")&&(Pe(u.relativePath.startsWith(r),'Absolute route path "'+u.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),u.relativePath=u.relativePath.slice(r.length));let c=En([r,u.relativePath]),m=n.concat(u);i.children&&i.children.length>0&&(Pe(i.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+c+'".')),lp(i.children,t,m,c)),!(i.path==null&&!i.index)&&t.push({path:c,score:Hg(c,i.index),routesMeta:m})};return e.forEach((i,a)=>{var o;if(i.path===""||!((o=i.path)!=null&&o.includes("?")))s(i,a);else for(let u of op(i.path))s(i,a,u)}),t}function op(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,s=n.endsWith("?"),i=n.replace(/\?$/,"");if(r.length===0)return s?[i,""]:[i];let a=op(r.join("/")),o=[];return o.push(...a.map(u=>u===""?i:[i,u].join("/"))),s&&o.push(...a),o.map(u=>e.startsWith("/")&&u===""?"/":u)}function Ig(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:Vg(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}const zg=/^:[\w-]+$/,Mg=3,Ug=2,$g=1,Fg=10,Bg=-2,wc=e=>e==="*";function Hg(e,t){let n=e.split("/"),r=n.length;return n.some(wc)&&(r+=Bg),t&&(r+=Ug),n.filter(s=>!wc(s)).reduce((s,i)=>s+(zg.test(i)?Mg:i===""?$g:Fg),r)}function Vg(e,t){return e.length===t.length&&e.slice(0,-1).every((r,s)=>r===t[s])?e[e.length-1]-t[t.length-1]:0}function qg(e,t,n){let{routesMeta:r}=e,s={},i="/",a=[];for(let o=0;o<r.length;++o){let u=r[o],c=o===r.length-1,m=i==="/"?t:t.slice(i.length)||"/",f=Wg({path:u.relativePath,caseSensitive:u.caseSensitive,end:c},m),g=u.route;if(!f)return null;Object.assign(s,f.params),a.push({params:s,pathname:En([i,f.pathname]),pathnameBase:Zg(En([i,f.pathnameBase])),route:g}),f.pathnameBase!=="/"&&(i=En([i,f.pathnameBase]))}return a}function Wg(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=Qg(e.path,e.caseSensitive,e.end),s=t.match(n);if(!s)return null;let i=s[0],a=i.replace(/(.)\/+$/,"$1"),o=s.slice(1);return{params:r.reduce((c,m,f)=>{let{paramName:g,isOptional:x}=m;if(g==="*"){let N=o[f]||"";a=i.slice(0,i.length-N.length).replace(/(.)\/+$/,"$1")}const j=o[f];return x&&!j?c[g]=void 0:c[g]=(j||"").replace(/%2F/g,"/"),c},{}),pathname:i,pathnameBase:a,pattern:e}}function Qg(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),Qo(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let r=[],s="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(a,o,u)=>(r.push({paramName:o,isOptional:u!=null}),u?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(r.push({paramName:"*"}),s+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?s+="\\/*$":e!==""&&e!=="/"&&(s+="(?:(?=\\/|$))"),[new RegExp(s,t?void 0:"i"),r]}function Kg(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return Qo(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function Ko(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}const Gg=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Yg=e=>Gg.test(e);function Xg(e,t){t===void 0&&(t="/");let{pathname:n,search:r="",hash:s=""}=typeof e=="string"?Rr(e):e,i;if(n)if(Yg(n))i=n;else{if(n.includes("//")){let a=n;n=up(n),Qo(!1,"Pathnames cannot have embedded double slashes - normalizing "+(a+" -> "+n))}n.startsWith("/")?i=Sc(n.substring(1),"/"):i=Sc(n,t)}else i=t;return{pathname:i,search:ev(r),hash:tv(s)}}function Sc(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(s=>{s===".."?n.length>1&&n.pop():s!=="."&&n.push(s)}),n.length>1?n.join("/"):"/"}function Ba(e,t,n,r){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function Jg(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function Go(e,t){let n=Jg(e);return t?n.map((r,s)=>s===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function Yo(e,t,n,r){r===void 0&&(r=!1);let s;typeof e=="string"?s=Rr(e):(s=ws({},e),Pe(!s.pathname||!s.pathname.includes("?"),Ba("?","pathname","search",s)),Pe(!s.pathname||!s.pathname.includes("#"),Ba("#","pathname","hash",s)),Pe(!s.search||!s.search.includes("#"),Ba("#","search","hash",s)));let i=e===""||s.pathname==="",a=i?"/":s.pathname,o;if(a==null)o=n;else{let f=t.length-1;if(!r&&a.startsWith("..")){let g=a.split("/");for(;g[0]==="..";)g.shift(),f-=1;s.pathname=g.join("/")}o=f>=0?t[f]:"/"}let u=Xg(s,o),c=a&&a!=="/"&&a.endsWith("/"),m=(i||a===".")&&n.endsWith("/");return!u.pathname.endsWith("/")&&(c||m)&&(u.pathname+="/"),u}const up=e=>e.replace(/\/\/+/g,"/"),En=e=>up(e.join("/")),Zg=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),ev=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,tv=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function nv(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const cp=["post","put","patch","delete"];new Set(cp);const rv=["get",...cp];new Set(rv);/**
 * React Router v6.30.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Ss(){return Ss=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Ss.apply(null,arguments)}const Xo=y.createContext(null),sv=y.createContext(null),_n=y.createContext(null),oa=y.createContext(null),Ht=y.createContext({outlet:null,matches:[],isDataRoute:!1}),dp=y.createContext(null);function iv(e,t){let{relative:n}=t===void 0?{}:t;br()||Pe(!1);let{basename:r,navigator:s}=y.useContext(_n),{hash:i,pathname:a,search:o}=pp(e,{relative:n}),u=a;return r!=="/"&&(u=a==="/"?r:En([r,a])),s.createHref({pathname:u,search:o,hash:i})}function br(){return y.useContext(oa)!=null}function Rs(){return br()||Pe(!1),y.useContext(oa).location}function fp(e){y.useContext(_n).static||y.useLayoutEffect(e)}function sn(){let{isDataRoute:e}=y.useContext(Ht);return e?wv():av()}function av(){br()||Pe(!1);let e=y.useContext(Xo),{basename:t,future:n,navigator:r}=y.useContext(_n),{matches:s}=y.useContext(Ht),{pathname:i}=Rs(),a=JSON.stringify(Go(s,n.v7_relativeSplatPath)),o=y.useRef(!1);return fp(()=>{o.current=!0}),y.useCallback(function(c,m){if(m===void 0&&(m={}),!o.current)return;if(typeof c=="number"){r.go(c);return}let f=Yo(c,JSON.parse(a),i,m.relative==="path");e==null&&t!=="/"&&(f.pathname=f.pathname==="/"?t:En([t,f.pathname])),(m.replace?r.replace:r.push)(f,m.state,m)},[t,r,a,i,e])}const lv=y.createContext(null);function ov(e){let t=y.useContext(Ht).outlet;return t&&y.createElement(lv.Provider,{value:e},t)}function ua(){let{matches:e}=y.useContext(Ht),t=e[e.length-1];return t?t.params:{}}function pp(e,t){let{relative:n}=t===void 0?{}:t,{future:r}=y.useContext(_n),{matches:s}=y.useContext(Ht),{pathname:i}=Rs(),a=JSON.stringify(Go(s,r.v7_relativeSplatPath));return y.useMemo(()=>Yo(e,JSON.parse(a),i,n==="path"),[e,a,i,n])}function uv(e,t){return cv(e,t)}function cv(e,t,n,r){br()||Pe(!1);let{navigator:s}=y.useContext(_n),{matches:i}=y.useContext(Ht),a=i[i.length-1],o=a?a.params:{};a&&a.pathname;let u=a?a.pathnameBase:"/";a&&a.route;let c=Rs(),m;if(t){var f;let S=typeof t=="string"?Rr(t):t;u==="/"||(f=S.pathname)!=null&&f.startsWith(u)||Pe(!1),m=S}else m=c;let g=m.pathname||"/",x=g;if(u!=="/"){let S=u.replace(/^\//,"").split("/");x="/"+g.replace(/^\//,"").split("/").slice(S.length).join("/")}let j=Dg(e,{pathname:x}),N=hv(j&&j.map(S=>Object.assign({},S,{params:Object.assign({},o,S.params),pathname:En([u,s.encodeLocation?s.encodeLocation(S.pathname).pathname:S.pathname]),pathnameBase:S.pathnameBase==="/"?u:En([u,s.encodeLocation?s.encodeLocation(S.pathnameBase).pathname:S.pathnameBase])})),i,n,r);return t&&N?y.createElement(oa.Provider,{value:{location:Ss({pathname:"/",search:"",hash:"",state:null,key:"default"},m),navigationType:hn.Pop}},N):N}function dv(){let e=xv(),t=nv(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,s={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return y.createElement(y.Fragment,null,y.createElement("h2",null,"Unexpected Application Error!"),y.createElement("h3",{style:{fontStyle:"italic"}},t),n?y.createElement("pre",{style:s},n):null,null)}const fv=y.createElement(dv,null);class pv extends y.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,n){return n.location!==t.location||n.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:n.error,location:n.location,revalidation:t.revalidation||n.revalidation}}componentDidCatch(t,n){console.error("React Router caught the following error during render",t,n)}render(){return this.state.error!==void 0?y.createElement(Ht.Provider,{value:this.props.routeContext},y.createElement(dp.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function mv(e){let{routeContext:t,match:n,children:r}=e,s=y.useContext(Xo);return s&&s.static&&s.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(s.staticContext._deepestRenderedBoundaryId=n.route.id),y.createElement(Ht.Provider,{value:t},r)}function hv(e,t,n,r){var s;if(t===void 0&&(t=[]),n===void 0&&(n=null),r===void 0&&(r=null),e==null){var i;if(!n)return null;if(n.errors)e=n.matches;else if((i=r)!=null&&i.v7_partialHydration&&t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let a=e,o=(s=n)==null?void 0:s.errors;if(o!=null){let m=a.findIndex(f=>f.route.id&&(o==null?void 0:o[f.route.id])!==void 0);m>=0||Pe(!1),a=a.slice(0,Math.min(a.length,m+1))}let u=!1,c=-1;if(n&&r&&r.v7_partialHydration)for(let m=0;m<a.length;m++){let f=a[m];if((f.route.HydrateFallback||f.route.hydrateFallbackElement)&&(c=m),f.route.id){let{loaderData:g,errors:x}=n,j=f.route.loader&&g[f.route.id]===void 0&&(!x||x[f.route.id]===void 0);if(f.route.lazy||j){u=!0,c>=0?a=a.slice(0,c+1):a=[a[0]];break}}}return a.reduceRight((m,f,g)=>{let x,j=!1,N=null,S=null;n&&(x=o&&f.route.id?o[f.route.id]:void 0,N=f.route.errorElement||fv,u&&(c<0&&g===0?(Sv("route-fallback"),j=!0,S=null):c===g&&(j=!0,S=f.route.hydrateFallbackElement||null)));let d=t.concat(a.slice(0,g+1)),p=()=>{let h;return x?h=N:j?h=S:f.route.Component?h=y.createElement(f.route.Component,null):f.route.element?h=f.route.element:h=m,y.createElement(mv,{match:f,routeContext:{outlet:m,matches:d,isDataRoute:n!=null},children:h})};return n&&(f.route.ErrorBoundary||f.route.errorElement||g===0)?y.createElement(pv,{location:n.location,revalidation:n.revalidation,component:N,error:x,children:p(),routeContext:{outlet:null,matches:d,isDataRoute:!0}}):p()},null)}var mp=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(mp||{}),hp=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(hp||{});function gv(e){let t=y.useContext(Xo);return t||Pe(!1),t}function vv(e){let t=y.useContext(sv);return t||Pe(!1),t}function yv(e){let t=y.useContext(Ht);return t||Pe(!1),t}function gp(e){let t=yv(),n=t.matches[t.matches.length-1];return n.route.id||Pe(!1),n.route.id}function xv(){var e;let t=y.useContext(dp),n=vv(),r=gp();return t!==void 0?t:(e=n.errors)==null?void 0:e[r]}function wv(){let{router:e}=gv(mp.UseNavigateStable),t=gp(hp.UseNavigateStable),n=y.useRef(!1);return fp(()=>{n.current=!0}),y.useCallback(function(s,i){i===void 0&&(i={}),n.current&&(typeof s=="number"?e.navigate(s):e.navigate(s,Ss({fromRouteId:t},i)))},[e,t])}const Nc={};function Sv(e,t,n){Nc[e]||(Nc[e]=!0)}function Nv(e,t){e==null||e.v7_startTransition,e==null||e.v7_relativeSplatPath}function Hl(e){let{to:t,replace:n,state:r,relative:s}=e;br()||Pe(!1);let{future:i,static:a}=y.useContext(_n),{matches:o}=y.useContext(Ht),{pathname:u}=Rs(),c=sn(),m=Yo(t,Go(o,i.v7_relativeSplatPath),u,s==="path"),f=JSON.stringify(m);return y.useEffect(()=>c(JSON.parse(f),{replace:n,state:r,relative:s}),[c,f,s,n,r]),null}function vp(e){return ov(e.context)}function wt(e){Pe(!1)}function jv(e){let{basename:t="/",children:n=null,location:r,navigationType:s=hn.Pop,navigator:i,static:a=!1,future:o}=e;br()&&Pe(!1);let u=t.replace(/^\/*/,"/"),c=y.useMemo(()=>({basename:u,navigator:i,static:a,future:Ss({v7_relativeSplatPath:!1},o)}),[u,o,i,a]);typeof r=="string"&&(r=Rr(r));let{pathname:m="/",search:f="",hash:g="",state:x=null,key:j="default"}=r,N=y.useMemo(()=>{let S=Ko(m,u);return S==null?null:{location:{pathname:S,search:f,hash:g,state:x,key:j},navigationType:s}},[u,m,f,g,x,j,s]);return N==null?null:y.createElement(_n.Provider,{value:c},y.createElement(oa.Provider,{children:n,value:N}))}function Ev(e){let{children:t,location:n}=e;return uv(Vl(t),n)}new Promise(()=>{});function Vl(e,t){t===void 0&&(t=[]);let n=[];return y.Children.forEach(e,(r,s)=>{if(!y.isValidElement(r))return;let i=[...t,s];if(r.type===y.Fragment){n.push.apply(n,Vl(r.props.children,i));return}r.type!==wt&&Pe(!1),!r.props.index||!r.props.children||Pe(!1);let a={id:r.props.id||i.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(a.children=Vl(r.props.children,i)),n.push(a)}),n}/**
 * React Router DOM v6.30.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function ql(){return ql=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},ql.apply(null,arguments)}function kv(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;n[r]=e[r]}return n}function Cv(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Pv(e,t){return e.button===0&&(!t||t==="_self")&&!Cv(e)}const Rv=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],bv="6";try{window.__reactRouterVersion=bv}catch{}const _v="startTransition",jc=xm[_v];function Tv(e){let{basename:t,children:n,future:r,window:s}=e,i=y.useRef();i.current==null&&(i.current=Tg({window:s,v5Compat:!0}));let a=i.current,[o,u]=y.useState({action:a.action,location:a.location}),{v7_startTransition:c}=r||{},m=y.useCallback(f=>{c&&jc?jc(()=>u(f)):u(f)},[u,c]);return y.useLayoutEffect(()=>a.listen(m),[a,m]),y.useEffect(()=>Nv(r),[r]),y.createElement(jv,{basename:t,children:n,location:o.location,navigationType:o.action,navigator:a,future:r})}const Ov=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",Lv=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Jo=y.forwardRef(function(t,n){let{onClick:r,relative:s,reloadDocument:i,replace:a,state:o,target:u,to:c,preventScrollReset:m,viewTransition:f}=t,g=kv(t,Rv),{basename:x}=y.useContext(_n),j,N=!1;if(typeof c=="string"&&Lv.test(c)&&(j=c,Ov))try{let h=new URL(window.location.href),w=c.startsWith("//")?new URL(h.protocol+c):new URL(c),C=Ko(w.pathname,x);w.origin===h.origin&&C!=null?c=C+w.search+w.hash:N=!0}catch{}let S=iv(c,{relative:s}),d=Dv(c,{replace:a,state:o,target:u,preventScrollReset:m,relative:s,viewTransition:f});function p(h){r&&r(h),h.defaultPrevented||d(h)}return y.createElement("a",ql({},g,{href:j||S,onClick:N||i?r:p,ref:n,target:u}))});var Ec;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(Ec||(Ec={}));var kc;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(kc||(kc={}));function Dv(e,t){let{target:n,replace:r,state:s,preventScrollReset:i,relative:a,viewTransition:o}=t===void 0?{}:t,u=sn(),c=Rs(),m=pp(e,{relative:a});return y.useCallback(f=>{if(Pv(f,n)){f.preventDefault();let g=r!==void 0?r:Fi(c)===Fi(m);u(e,{replace:g,state:s,preventScrollReset:i,relative:a,viewTransition:o})}},[c,u,m,r,s,n,e,i,a,o])}function yp(e,t){return function(){return e.apply(t,arguments)}}const{toString:Av}=Object.prototype,{getPrototypeOf:Er}=Object,{iterator:bs,toStringTag:xp}=Symbol,Bi=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),Ns=(e,t)=>{let n=e;const r=[];for(;n!=null&&n!==Object.prototype;){if(r.indexOf(n)!==-1)return!1;if(r.push(n),Bi(n,t))return!0;n=Er(n)}return!1},Iv=(e,t)=>e!=null&&Ns(e,t)?e[t]:void 0,Zo=(e=>t=>{const n=Av.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),Pt=e=>(e=e.toLowerCase(),t=>Zo(t)===e),ca=e=>t=>typeof t===e,{isArray:Wn}=Array,Qn=ca("undefined");function _r(e){return e!==null&&!Qn(e)&&e.constructor!==null&&!Qn(e.constructor)&&ut(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const wp=Pt("ArrayBuffer");function zv(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&wp(e.buffer),t}const Mv=ca("string"),ut=ca("function"),Sp=ca("number"),Tr=e=>e!==null&&typeof e=="object",Uv=e=>e===!0||e===!1,pi=e=>{if(!Tr(e))return!1;const t=Er(e);return(t===null||t===Object.prototype||Er(t)===null)&&!Ns(e,xp)&&!Ns(e,bs)},$v=e=>{if(!Tr(e)||_r(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},Fv=Pt("Date"),Bv=Pt("File"),Hv=e=>!!(e&&typeof e.uri<"u"),Vv=e=>e&&typeof e.getParts<"u",qv=Pt("Blob"),Wv=Pt("FileList"),Qv=Pt("Set"),Kv=e=>Tr(e)&&ut(e.pipe);function Gv(){return typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}}const Cc=Gv(),Pc=typeof Cc.FormData<"u"?Cc.FormData:void 0,Yv=e=>{if(!e)return!1;if(Pc&&e instanceof Pc)return!0;const t=Er(e);if(!t||t===Object.prototype||!ut(e.append))return!1;const n=Zo(e);return n==="formdata"||n==="object"&&ut(e.toString)&&e.toString()==="[object FormData]"},Xv=Pt("URLSearchParams"),[Jv,Zv,ey,ty]=["ReadableStream","Request","Response","Headers"].map(Pt),ny=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function _s(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let r,s;if(typeof e!="object"&&(e=[e]),Wn(e))for(r=0,s=e.length;r<s;r++)t.call(null,e[r],r,e);else{if(_r(e))return;const i=n?Object.getOwnPropertyNames(e):Object.keys(e),a=i.length;let o;for(r=0;r<a;r++)o=i[r],t.call(null,e[o],o,e)}}function Np(e,t){if(_r(e))return null;t=t.toLowerCase();const n=Object.keys(e);let r=n.length,s;for(;r-- >0;)if(s=n[r],t===s.toLowerCase())return s;return null}const zn=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,jp=e=>!Qn(e)&&e!==zn;function Wl(...e){const{caseless:t,skipUndefined:n}=jp(this)&&this||{},r={},s=(i,a)=>{if(a==="__proto__"||a==="constructor"||a==="prototype")return;const o=t&&typeof a=="string"&&Np(r,a)||a,u=Bi(r,o)?r[o]:void 0;pi(u)&&pi(i)?r[o]=Wl(u,i):pi(i)?r[o]=Wl({},i):Wn(i)?r[o]=i.slice():(!n||!Qn(i))&&(r[o]=i)};for(let i=0,a=e.length;i<a;i++){const o=e[i];if(!o||_r(o)||(_s(o,s),typeof o!="object"||Wn(o)))continue;const u=Object.getOwnPropertySymbols(o);for(let c=0;c<u.length;c++){const m=u[c];my.call(o,m)&&s(o[m],m)}}return r}const ry=(e,t,n,{allOwnKeys:r}={})=>(_s(t,(s,i)=>{n&&ut(s)?Object.defineProperty(e,i,{__proto__:null,value:yp(s,n),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(e,i,{__proto__:null,value:s,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:r}),e),sy=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),iy=(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),Object.defineProperty(e.prototype,"constructor",{__proto__:null,value:e,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(e,"super",{__proto__:null,value:t.prototype}),n&&Object.assign(e.prototype,n)},ay=(e,t,n,r)=>{let s,i,a;const o={};if(t=t||{},e==null)return t;do{for(s=Object.getOwnPropertyNames(e),i=s.length;i-- >0;)a=s[i],(!r||r(a,e,t))&&!o[a]&&(t[a]=e[a],o[a]=!0);e=n!==!1&&Er(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},ly=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const r=e.indexOf(t,n);return r!==-1&&r===n},oy=e=>{if(!e)return null;if(Wn(e))return e;let t=e.length;if(!Sp(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},uy=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&Er(Uint8Array)),cy=(e,t)=>{const r=(e&&e[bs]).call(e);let s;for(;(s=r.next())&&!s.done;){const i=s.value;t.call(e,i[0],i[1])}},dy=(e,t)=>{let n;const r=[];for(;(n=e.exec(t))!==null;)r.push(n);return r},fy=Pt("HTMLFormElement"),py=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,r,s){return r.toUpperCase()+s}),{propertyIsEnumerable:my}=Object.prototype,hy=Pt("RegExp"),Ep=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),r={};_s(n,(s,i)=>{let a;(a=t(s,i,e))!==!1&&(r[i]=a||s)}),Object.defineProperties(e,r)},gy=e=>{Ep(e,(t,n)=>{if(ut(e)&&["arguments","caller","callee"].includes(n))return!1;const r=e[n];if(ut(r)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},vy=(e,t)=>{const n={},r=s=>{s.forEach(i=>{n[i]=!0})};return Wn(e)?r(e):r(String(e).split(t)),n},yy=()=>{},xy=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function wy(e){return!!(e&&ut(e.append)&&e[xp]==="FormData"&&e[bs])}const Sy=e=>{const t=new WeakSet,n=r=>{if(Tr(r)){if(t.has(r))return;if(_r(r))return r;if(!("toJSON"in r)){t.add(r);let s;if(Qv(r)){s=[];for(const i of r){const a=n(i);!Qn(a)&&s.push(a)}}else s=Wn(r)?[]:{},_s(r,(i,a)=>{const o=n(i);!Qn(o)&&(s[a]=o)});return t.delete(r),s}}return r};return n(e)},Ny=Pt("AsyncFunction"),jy=e=>e&&(Tr(e)||ut(e))&&ut(e.then)&&ut(e.catch),kp=((e,t)=>e?setImmediate:t?((n,r)=>(zn.addEventListener("message",({source:s,data:i})=>{s===zn&&i===n&&r.length&&r.shift()()},!1),s=>{r.push(s),zn.postMessage(n,"*")}))(`axios@${Math.random()}`,[]):n=>setTimeout(n))(typeof setImmediate=="function",ut(zn.postMessage)),Ey=typeof queueMicrotask<"u"?queueMicrotask.bind(zn):typeof process<"u"&&process.nextTick||kp,Cp=e=>e!=null&&ut(e[bs]),ky=e=>e!=null&&Ns(e,bs)&&Cp(e),v={isArray:Wn,isArrayBuffer:wp,isBuffer:_r,isFormData:Yv,isArrayBufferView:zv,isString:Mv,isNumber:Sp,isBoolean:Uv,isObject:Tr,isPlainObject:pi,isEmptyObject:$v,isReadableStream:Jv,isRequest:Zv,isResponse:ey,isHeaders:ty,isUndefined:Qn,isDate:Fv,isFile:Bv,isReactNativeBlob:Hv,isReactNative:Vv,isBlob:qv,isRegExp:hy,isFunction:ut,isStream:Kv,isURLSearchParams:Xv,isTypedArray:uy,isFileList:Wv,forEach:_s,merge:Wl,extend:ry,trim:ny,stripBOM:sy,inherits:iy,toFlatObject:ay,kindOf:Zo,kindOfTest:Pt,endsWith:ly,toArray:oy,forEachEntry:cy,matchAll:dy,isHTMLForm:fy,hasOwnProperty:Bi,hasOwnProp:Bi,hasOwnInPrototypeChain:Ns,getSafeProp:Iv,reduceDescriptors:Ep,freezeMethods:gy,toObjectSet:vy,toCamelCase:py,noop:yy,toFiniteNumber:xy,findKey:Np,global:zn,isContextDefined:jp,isSpecCompliantForm:wy,toJSONObject:Sy,isAsyncFn:Ny,isThenable:jy,setImmediate:kp,asap:Ey,isIterable:Cp,isSafeIterable:ky},Cy=v.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),Py=e=>{const t={};let n,r,s;return e&&e.split(`
`).forEach(function(a){s=a.indexOf(":"),n=a.substring(0,s).trim().toLowerCase(),r=a.substring(s+1).trim();const o=v.hasOwnProp(t,n);!n||o&&v.hasOwnProp(Cy,n)||(n==="set-cookie"?o?t[n].push(r):t[n]=[r]:t[n]=o?t[n]+", "+r:r)}),t};function Ry(e){let t=0,n=e.length;for(;t<n;){const r=e.charCodeAt(t);if(r!==9&&r!==32)break;t+=1}for(;n>t;){const r=e.charCodeAt(n-1);if(r!==9&&r!==32)break;n-=1}return t===0&&n===e.length?e:e.slice(t,n)}const by=new RegExp("[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+","g"),_y=new RegExp("[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+","g");function eu(e,t){return v.isArray(e)?e.map(n=>eu(n,t)):Ry(String(e).replace(t,""))}const Ty=e=>eu(e,by),Oy=e=>eu(e,_y);function Pp(e){const t=Object.create(null);return v.forEach(e.toJSON(),(n,r)=>{t[r]=Oy(n)}),t}const Rc=Symbol("internals");function Hr(e){return e&&String(e).trim().toLowerCase()}function mi(e){return e===!1||e==null?e:v.isArray(e)?e.map(mi):Ty(String(e))}function Ly(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}const Dy=/^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;function Ha(e){let t=0,n=e.length;for(;t<n;){const r=e.charCodeAt(t);if(r!==9&&r!==32)break;t+=1}for(;n>t;){const r=e.charCodeAt(n-1);if(r!==9&&r!==32)break;n-=1}return t===0&&n===e.length?e:e.slice(t,n)}function Ay(e){const t=e.length-1;if(t<1||e.charCodeAt(0)!==34||e.charCodeAt(t)!==34)return e;let n="";for(let r=1;r<t;r++){const s=e.charCodeAt(r);if(s===34||s===92&&(r+=1,r>=t))return e;n+=e[r]}return n}function Iy(e){const t=Object.create(null),n=String(e);let r=0,s=!1,i=!1;function a(o){const u=Ha(n.slice(r,o)),c=u.indexOf("=");if(c<1)return;const m=Ha(u.slice(0,c));if(!Dy.test(m))return;const f=m.toLowerCase();if(f==="__proto__"||f==="constructor"||f==="prototype")return;const g=Ha(u.slice(c+1));t[f]=Ay(g)}for(let o=0;o<n.length;o++){const u=n.charCodeAt(o);s?i?i=!1:u===92?i=!0:u===34&&(s=!1):u===34?s=!0:(u===44||u===59)&&(a(o),r=o+1)}return a(n.length),t}const zy=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function Va(e,t,n,r,s){if(v.isFunction(r))return r.call(this,t,n);if(s&&(t=n),!!v.isString(t)){if(v.isString(r))return t.indexOf(r)!==-1;if(v.isRegExp(r))return r.test(t)}}function My(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,r)=>n.toUpperCase()+r)}function Uy(e,t){const n=v.toCamelCase(" "+t);["get","set","has"].forEach(r=>{Object.defineProperty(e,r+n,{__proto__:null,value:function(s,i,a){return this[r].call(this,t,s,i,a)},configurable:!0})})}let Xe=class{constructor(t){t&&this.set(t)}set(t,n,r){const s=this;function i(o,u,c){const m=Hr(u);if(!m)return;const f=v.findKey(s,m);(!f||s[f]===void 0||c===!0||c===void 0&&s[f]!==!1)&&(s[f||u]=mi(o))}const a=(o,u)=>v.forEach(o,(c,m)=>i(c,m,u));if(v.isPlainObject(t)||t instanceof this.constructor)a(t,n);else if(v.isString(t)&&(t=t.trim())&&!zy(t))a(Py(t),n);else if(v.isObject(t)&&v.isSafeIterable(t)){let o=Object.create(null),u,c;for(const m of t){if(!v.isArray(m))throw new TypeError("Object iterator must return a key-value pair");c=m[0],v.hasOwnProp(o,c)?(u=o[c],o[c]=v.isArray(u)?[...u,m[1]]:[u,m[1]]):o[c]=m[1]}a(o,n)}else t!=null&&i(n,t,r);return this}get(t,n){if(t=Hr(t),t){const r=v.findKey(this,t);if(r){const s=this[r];if(!n)return s;if(n===!0)return Ly(s);if(v.isFunction(n))return n.call(this,s,r);if(v.isRegExp(n))return n.exec(s);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=Hr(t),t){const r=v.findKey(this,t);return!!(r&&this[r]!==void 0&&(!n||Va(this,this[r],r,n)))}return!1}delete(t,n){const r=this;let s=!1;function i(a){if(a=Hr(a),a){const o=v.findKey(r,a);o&&(!n||Va(r,r[o],o,n))&&(delete r[o],s=!0)}}return v.isArray(t)?t.forEach(i):i(t),s}clear(t){const n=Object.keys(this);let r=n.length,s=!1;for(;r--;){const i=n[r];(!t||Va(this,this[i],i,t,!0))&&(delete this[i],s=!0)}return s}normalize(t){const n=this,r={};return v.forEach(this,(s,i)=>{const a=v.findKey(r,i);if(a){n[a]=mi(s),delete n[i];return}const o=t?My(i):String(i).trim();o!==i&&delete n[i],n[o]=mi(s),r[o]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return v.forEach(this,(r,s)=>{r!=null&&r!==!1&&(n[s]=t&&v.isArray(r)?r.join(", "):r)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}getSetCookie(){const t=this.get("set-cookie");return v.isArray(t)?t:t==null||t===!1?[]:[t]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static parseParameters(t){return Iy(t)}static concat(t,...n){const r=new this(t);return n.forEach(s=>r.set(s)),r}static accessor(t){const r=(this[Rc]=this[Rc]={accessors:{}}).accessors,s=this.prototype;function i(a){const o=Hr(a);r[o]||(Uy(s,a),r[o]=!0)}return v.isArray(t)?t.forEach(i):i(t),this}};Xe.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);v.reduceDescriptors(Xe.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(r){this[n]=r}}});v.freezeMethods(Xe);const Hi="[REDACTED ****]";function $y(e){if(v.hasOwnProp(e,"toJSON"))return!0;let t=Object.getPrototypeOf(e);for(;t&&t!==Object.prototype;){if(v.hasOwnProp(t,"toJSON"))return!0;t=Object.getPrototypeOf(t)}return!1}function Fy(e,t){const n=new Set(t.map(i=>String(i).toLowerCase())),r=[],s=i=>{if(i===null||typeof i!="object"||v.isBuffer(i))return i;if(r.indexOf(i)!==-1)return;i instanceof Xe&&(i=i.toJSON()),r.push(i);let a;if(v.isArray(i))a=[],i.forEach((o,u)=>{const c=s(o);v.isUndefined(c)||(a[u]=c)});else{if(!v.isPlainObject(i)&&$y(i))return r.pop(),i;a=Object.create(null);for(const[o,u]of Object.entries(i)){const c=n.has(o.toLowerCase())?Hi:s(u);v.isUndefined(c)||(a[o]=c)}}return r.pop(),a};return s(e)}function bc(e){try{return String(e)}catch{return""}}function By(e){return e.errors.map(n=>{try{return n&&n.message?bc(n.message):bc(n)}catch{return""}}).filter(Boolean).join("; ")||e.name||"AggregateError"}let I=class Rp extends Error{static from(t,n,r,s,i,a){let o=t.message;!o&&v.isArray(t.errors)&&t.errors.length&&(o=By(t));const u=new Rp(o,n||t.code,r,s,i);return Object.defineProperty(u,"cause",{__proto__:null,value:t,writable:!0,enumerable:!1,configurable:!0}),u.name=t.name,t.status!=null&&u.status==null&&(u.status=t.status),a&&Object.assign(u,a),u}constructor(t,n,r,s,i){super(t),Object.defineProperty(this,"message",{__proto__:null,value:t,enumerable:!0,writable:!0,configurable:!0}),this.name="AxiosError",this.isAxiosError=!0,n&&(this.code=n),r&&(this.config=r),s&&(this.request=s),i&&(this.response=i,this.status=i.status)}toJSON(){const t=this.config,n=t&&v.hasOwnProp(t,"redact")?t.redact:void 0,r=v.isArray(n)&&n.length>0?Fy(t,n):v.toJSONObject(t);return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:r,code:this.code,status:this.status}}};I.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";I.ERR_BAD_OPTION="ERR_BAD_OPTION";I.ECONNABORTED="ECONNABORTED";I.ETIMEDOUT="ETIMEDOUT";I.ECONNREFUSED="ECONNREFUSED";I.ERR_NETWORK="ERR_NETWORK";I.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";I.ERR_DEPRECATED="ERR_DEPRECATED";I.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";I.ERR_BAD_REQUEST="ERR_BAD_REQUEST";I.ERR_CANCELED="ERR_CANCELED";I.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";I.ERR_INVALID_URL="ERR_INVALID_URL";I.ERR_FORM_DATA_DEPTH_EXCEEDED="ERR_FORM_DATA_DEPTH_EXCEEDED";const Hy=null,bp=100;function Ql(e){return v.isPlainObject(e)||v.isArray(e)}function _p(e){return v.endsWith(e,"[]")?e.slice(0,-2):e}function qa(e,t,n){return e?e.concat(t).map(function(s,i){return s=_p(s),!n&&i?"["+s+"]":s}).join(n?".":""):t}function Vy(e){return v.isArray(e)&&!e.some(Ql)}const qy=v.toFlatObject(v,{},null,function(t){return/^is[A-Z]/.test(t)});function da(e,t,n){if(!v.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=v.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(p,h){return!v.isUndefined(h[p])});const r=n.metaTokens,s=n.visitor||j,i=n.dots,a=n.indexes,o=n.Blob||typeof Blob<"u"&&Blob,u=n.maxDepth===void 0?bp:n.maxDepth,c=o&&v.isSpecCompliantForm(t),m=[];if(!v.isFunction(s))throw new TypeError("visitor must be a function");function f(d){if(d===null)return"";if(v.isDate(d))return d.toISOString();if(v.isBoolean(d))return d.toString();if(!c&&v.isBlob(d))throw new I("Blob is not supported. Use a Buffer instead.");if(v.isArrayBuffer(d)||v.isTypedArray(d)){if(c&&typeof o=="function")return new o([d]);throw new I("Blob is not supported. Use a Buffer instead.",I.ERR_NOT_SUPPORT)}return d}function g(d){if(d>u)throw new I("Object is too deeply nested ("+d+" levels). Max depth: "+u,I.ERR_FORM_DATA_DEPTH_EXCEEDED)}function x(d,p){if(u===1/0)return JSON.stringify(d);const h=[];return JSON.stringify(d,function(C,k){if(!v.isObject(k))return k;for(;h.length&&h[h.length-1]!==this;)h.pop();return h.push(k),g(p+h.length-1),k})}function j(d,p,h){let w=d;if(v.isReactNative(t)&&v.isReactNativeBlob(d))return t.append(qa(h,p,i),f(d)),!1;if(d&&!h&&typeof d=="object"){if(v.endsWith(p,"{}"))p=r?p:p.slice(0,-2),d=x(d,1);else if(v.isArray(d)&&Vy(d)||(v.isFileList(d)||v.endsWith(p,"[]"))&&(w=v.toArray(d)))return p=_p(p),w.forEach(function(k,L){!(v.isUndefined(k)||k===null)&&t.append(a===!0?qa([p],L,i):a===null?p:p+"[]",f(k))}),!1}return Ql(d)?!0:(t.append(qa(h,p,i),f(d)),!1)}const N=Object.assign(qy,{defaultVisitor:j,convertValue:f,isVisitable:Ql});function S(d,p,h=0){if(!v.isUndefined(d)){if(g(h),m.indexOf(d)!==-1)throw new Error("Circular reference detected in "+p.join("."));m.push(d),v.forEach(d,function(C,k){(!(v.isUndefined(C)||C===null)&&s.call(t,C,v.isString(k)?k.trim():k,p,N))===!0&&S(C,p?p.concat(k):[k],h+1)}),m.pop()}}if(!v.isObject(e))throw new TypeError("data must be an object");return S(e),t}function _c(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+"};return encodeURIComponent(e).replace(/[!'()~]|%20/g,function(r){return t[r]})}function tu(e,t){this._pairs=[],e&&da(e,this,t)}const Tp=tu.prototype;Tp.append=function(t,n){this._pairs.push([t,n])};Tp.toString=function(t){const n=t?r=>t.call(this,r,_c):_c;return this._pairs.map(function(s){return n(s[0])+"="+n(s[1])},"").join("&")};function Wy(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function Op(e,t,n){if(!t)return e;e=e||"";const r=v.isFunction(n)?{serialize:n}:n,s=v.getSafeProp(r,"encode")||Wy,i=v.getSafeProp(r,"serialize");let a;if(i?a=i(t,r):a=v.isURLSearchParams(t)?t.toString():new tu(t,r).toString(s),a){const o=e.indexOf("#");o!==-1&&(e=e.slice(0,o)),e+=(e.indexOf("?")===-1?"?":"&")+a}return e}class Tc{constructor(){this.handlers=[]}use(t,n,r){return this.handlers.push({fulfilled:t,rejected:n,synchronous:r?r.synchronous:!1,runWhen:r?r.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){v.forEach(this.handlers,function(r){r!==null&&t(r)})}}const nu={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0,advertiseZstdAcceptEncoding:!1,validateStatusUndefinedResolves:!0},Qy=typeof URLSearchParams<"u"?URLSearchParams:tu,Ky=typeof FormData<"u"?FormData:null,Gy=typeof Blob<"u"?Blob:null,Yy={isBrowser:!0,classes:{URLSearchParams:Qy,FormData:Ky,Blob:Gy},protocols:["http","https","file","blob","url","data"]},ru=typeof window<"u"&&typeof document<"u",Kl=typeof navigator=="object"&&navigator||void 0,Xy=ru&&(!Kl||["ReactNative","NativeScript","NS"].indexOf(Kl.product)<0),Jy=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",Zy=ru&&window.location.href||"http://localhost",e0=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:ru,hasStandardBrowserEnv:Xy,hasStandardBrowserWebWorkerEnv:Jy,navigator:Kl,origin:Zy},Symbol.toStringTag,{value:"Module"})),He={...e0,...Yy};function t0(e,t){return da(e,new He.classes.URLSearchParams,{visitor:function(n,r,s,i){return He.isNode&&v.isBuffer(n)?(this.append(r,n.toString("base64")),!1):i.defaultVisitor.apply(this,arguments)},...t})}const Oc=bp;function Lp(e){if(e>Oc)throw new I("FormData field is too deeply nested ("+e+" levels). Max depth: "+Oc,I.ERR_FORM_DATA_DEPTH_EXCEEDED)}function n0(e){const t=[],n=/[^.[\]]+|\[([^.[\]]*)]/g;let r;for(;(r=n.exec(e))!==null;)Lp(t.length),t.push(r[0]==="[]"?"":r[1]||r[0]);return t}function r0(e){const t={},n=Object.keys(e);let r;const s=n.length;let i;for(r=0;r<s;r++)i=n[r],t[i]=e[i];return t}function Dp(e){function t(n,r,s,i){Lp(i);let a=n[i++];if(a==="__proto__")return!0;const o=Number.isFinite(+a),u=i>=n.length;return a=!a&&v.isArray(s)?s.length:a,u?(v.hasOwnProp(s,a)?s[a]=v.isArray(s[a])?s[a].concat(r):[s[a],r]:s[a]=r,!o):((!v.hasOwnProp(s,a)||!v.isObject(s[a]))&&(s[a]=[]),t(n,r,s[a],i)&&v.isArray(s[a])&&(s[a]=r0(s[a])),!o)}if(v.isFormData(e)&&v.isFunction(e.entries)){const n={};return v.forEachEntry(e,(r,s)=>{t(n0(r),s,n,0)}),n}return null}const Jn=(e,t)=>e!=null&&v.hasOwnProp(e,t)?e[t]:void 0;function s0(e,t,n){if(v.isString(e))try{return(t||JSON.parse)(e),v.trim(e)}catch(r){if(r.name!=="SyntaxError")throw r}return(n||JSON.stringify)(e)}const Ts={transitional:nu,adapter:["xhr","http","fetch"],transformRequest:[function(t,n){const r=n.getContentType()||"",s=r.indexOf("application/json")>-1,i=v.isObject(t);if(i&&v.isHTMLForm(t)&&(t=new FormData(t)),v.isFormData(t))return s?JSON.stringify(Dp(t)):t;if(v.isArrayBuffer(t)||v.isBuffer(t)||v.isStream(t)||v.isFile(t)||v.isBlob(t)||v.isReadableStream(t))return t;if(v.isArrayBufferView(t))return t.buffer;if(v.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let o;if(i){const u=Jn(this,"formSerializer");if(r.indexOf("application/x-www-form-urlencoded")>-1)return t0(t,u).toString();if((o=v.isFileList(t))||r.indexOf("multipart/form-data")>-1){const c=Jn(this,"env"),m=c&&c.FormData;return da(o?{"files[]":t}:t,m&&new m,u)}}return i||s?(n.setContentType("application/json",!1),s0(t)):t}],transformResponse:[function(t){const n=Jn(this,"transitional")||Ts.transitional,r=n&&n.forcedJSONParsing,s=Jn(this,"responseType"),i=s==="json";if(v.isResponse(t)||v.isReadableStream(t))return t;if(t&&v.isString(t)&&(r&&!s||i)){const o=!(n&&n.silentJSONParsing)&&i;try{return JSON.parse(t,Jn(this,"parseReviver"))}catch(u){if(o)throw u.name==="SyntaxError"?I.from(u,I.ERR_BAD_RESPONSE,this,null,Jn(this,"response")):u}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:He.classes.FormData,Blob:He.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};v.forEach(["delete","get","head","post","put","patch","query"],e=>{Ts.headers[e]={}});function Wa(e,t){const n=this||Ts,r=t||n,s=Xe.from(r.headers);let i=r.data;return v.forEach(e,function(o){i=o.call(n,i,s.normalize(),t?t.status:void 0)}),s.normalize(),i}function Ap(e){return!!(e&&e.__CANCEL__)}let Os=class extends I{constructor(t,n,r){super(t??"canceled",I.ERR_CANCELED,n,r),this.name="CanceledError",this.__CANCEL__=!0}};function Ip(e,t,n){const r=n.config.validateStatus;!n.status||!r||r(n.status)?e(n):t(new I("Request failed with status code "+n.status,n.status>=400&&n.status<500?I.ERR_BAD_REQUEST:I.ERR_BAD_RESPONSE,n.config,n.request,n))}function i0(e){const t=/^([-+\w]{1,25}):(?:\/\/)?/.exec(e);return t&&t[1]||""}function a0(e,t){e=e||10;const n=new Array(e),r=new Array(e);let s=0,i=0,a;return t=t!==void 0?t:1e3,function(u){const c=Date.now(),m=r[i];a||(a=c),n[s]=u,r[s]=c;let f=i,g=0;for(;f!==s;)g+=n[f++],f=f%e;if(s=(s+1)%e,s===i&&(i=(i+1)%e),c-a<t)return;const x=m&&c-m;return x?Math.round(g*1e3/x):void 0}}function l0(e,t){let n=0,r=1e3/t,s,i;const a=(c,m=Date.now())=>{n=m,s=null,i&&(clearTimeout(i),i=null),e(...c)};return[(...c)=>{const m=Date.now(),f=m-n;f>=r?a(c,m):(s=c,i||(i=setTimeout(()=>{i=null,a(s)},r-f)))},()=>s&&a(s)]}const Vi=(e,t,n=3)=>{let r=0;const s=a0(50,250);return l0(i=>{if(!i||typeof i.loaded!="number")return;const a=i.loaded,o=i.lengthComputable?i.total:void 0,u=Math.max(0,o!=null?Math.min(a,o):a),c=Math.max(0,u-r),m=s(c);r=Math.max(r,u);const f={loaded:u,total:o,progress:o?u/o:void 0,bytes:c,rate:m||void 0,estimated:m&&o?(o-u)/m:void 0,event:i,lengthComputable:o!=null,[t?"download":"upload"]:!0};e(f)},n)},Lc=(e,t)=>{const n=e!=null;return[r=>t[0]({lengthComputable:n,total:e,loaded:r}),t[1]]},Dc=(e,t=v.asap)=>(...n)=>t(()=>e(...n)),o0=He.hasStandardBrowserEnv?((e,t)=>n=>(n=new URL(n,He.origin),e.protocol===n.protocol&&e.host===n.host&&(t||e.port===n.port)))(new URL(He.origin),He.navigator&&/(msie|trident)/i.test(He.navigator.userAgent)):()=>!0,u0=He.hasStandardBrowserEnv?{write(e,t,n,r,s,i,a){if(typeof document>"u")return;const o=[`${e}=${encodeURIComponent(t)}`];v.isNumber(n)&&o.push(`expires=${new Date(n).toUTCString()}`),v.isString(r)&&o.push(`path=${r}`),v.isString(s)&&o.push(`domain=${s}`),i===!0&&o.push("secure"),v.isString(a)&&o.push(`SameSite=${a}`),document.cookie=o.join("; ")},read(e){if(typeof document>"u")return null;const t=document.cookie.split(";");for(let n=0;n<t.length;n++){const r=t[n].replace(/^\s+/,""),s=r.indexOf("=");if(s!==-1&&r.slice(0,s)===e)try{return decodeURIComponent(r.slice(s+1))}catch{return r.slice(s+1)}}return null},remove(e){this.write(e,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function c0(e){return typeof e!="string"?!1:/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function d0(e,t){if(!t)return e;let n=e.length;for(;n>0&&e.charCodeAt(n-1)===47;)n--;return e.slice(0,n)+"/"+t.replace(/^\/+/,"")}const f0=/^https?:(?!\/\/)/i,p0=/[\t\n\r]/g;function m0(e){let t=0;for(;t<e.length&&e.charCodeAt(t)<=32;)t++;return e.slice(t)}function h0(e){return m0(e).replace(p0,"")}function g0(e){return e&&e.replace(/(^|&)([^=&]*=)?[^&]+/g,(t,n,r="")=>`${n}${r}${Hi}`)}function v0(e){const t=e.replace(/^(https?:\/{0,2})[^/?#]*@/i,`$1${Hi}@`),n=t.indexOf("#"),s=(n===-1?t:t.slice(0,n)).replace(/([?&][^=&#]*=)[^&#]*/g,`$1${Hi}`);return n===-1?s:`${s}#${g0(t.slice(n+1))}`}function Ac(e,t){if(typeof e=="string"){const n=h0(e);if(f0.test(n))throw new I(`Invalid URL ${JSON.stringify(v0(n))}: missing "//" after protocol`,I.ERR_INVALID_URL,t)}}function zp(e,t,n,r){Ac(t,r);let s=!c0(t);return e&&(s||n===!1)?(Ac(e,r),d0(e,t)):t}const Ic=e=>e instanceof Xe?{...e}:e,y0=e=>Object.getOwnPropertySymbols&&Object.getOwnPropertyDescriptor?Object.keys(e).concat(Object.getOwnPropertySymbols(e).filter(t=>Object.getOwnPropertyDescriptor(e,t).enumerable)):Object.keys(e);function Kn(e,t){e=e||{},t=t||{};const n=Object.create(null);Object.defineProperty(n,"hasOwnProperty",{__proto__:null,value:Object.prototype.hasOwnProperty,enumerable:!1,writable:!0,configurable:!0});function r(m,f,g,x){return v.isPlainObject(m)&&v.isPlainObject(f)?v.merge.call({caseless:x},m,f):v.isPlainObject(f)?v.merge({},f):v.isArray(f)?f.slice():f}function s(m,f,g,x){if(v.isUndefined(f)){if(!v.isUndefined(m))return r(void 0,m,g,x)}else return r(m,f,g,x)}function i(m,f){if(!v.isUndefined(f))return r(void 0,f)}function a(m,f){if(v.isUndefined(f)){if(!v.isUndefined(m))return r(void 0,m)}else return r(void 0,f)}function o(m){const f=v.hasOwnProp(t,"transitional")?t.transitional:void 0;if(!v.isUndefined(f))if(v.isPlainObject(f)){if(v.hasOwnProp(f,m))return f[m]}else return;const g=v.hasOwnProp(e,"transitional")?e.transitional:void 0;if(v.isPlainObject(g)&&v.hasOwnProp(g,m))return g[m]}function u(m,f,g){if(v.hasOwnProp(t,g))return r(m,f);if(v.hasOwnProp(e,g))return r(void 0,m)}const c={url:i,method:i,data:i,baseURL:a,transformRequest:a,transformResponse:a,paramsSerializer:a,timeout:a,timeoutMessage:a,withCredentials:a,withXSRFToken:a,adapter:a,responseType:a,xsrfCookieName:a,xsrfHeaderName:a,onUploadProgress:a,onDownloadProgress:a,decompress:a,maxContentLength:a,maxBodyLength:a,beforeRedirect:a,transport:a,httpAgent:a,httpsAgent:a,cancelToken:a,socketPath:a,allowedSocketPaths:a,responseEncoding:a,validateStatus:u,headers:(m,f,g)=>s(Ic(m),Ic(f),g,!0)};return v.forEach(y0({...e,...t}),function(f){if(f==="__proto__"||f==="constructor"||f==="prototype")return;const g=v.hasOwnProp(c,f)?c[f]:s,x=v.hasOwnProp(e,f)?e[f]:void 0,j=v.hasOwnProp(t,f)?t[f]:void 0,N=g(x,j,f);v.isUndefined(N)&&g!==u||(n[f]=N)}),v.hasOwnProp(t,"validateStatus")&&v.isUndefined(t.validateStatus)&&o("validateStatusUndefinedResolves")===!1&&(v.hasOwnProp(e,"validateStatus")?n.validateStatus=r(void 0,e.validateStatus):delete n.validateStatus),n}const x0=["content-type","content-length"];function w0(e,t,n){if(n!=="content-only"){e.set(t);return}Object.entries(t||{}).forEach(([r,s])=>{x0.includes(r.toLowerCase())&&e.set(r,s)})}const S0=e=>encodeURIComponent(e).replace(/%([0-9A-F]{2})/gi,(t,n)=>String.fromCharCode(parseInt(n,16)));function Mp(e){const t=Kn({},e),n=g=>v.hasOwnProp(t,g)?t[g]:void 0,r=n("data");let s=n("withXSRFToken");const i=n("xsrfHeaderName"),a=n("xsrfCookieName");let o=n("headers");const u=n("auth"),c=n("baseURL"),m=n("allowAbsoluteUrls"),f=n("url");if(t.headers=o=Xe.from(o),t.url=Op(zp(c,f,m,t),n("params"),n("paramsSerializer")),u){const g=v.getSafeProp(u,"username")||"",x=v.getSafeProp(u,"password")||"";try{o.set("Authorization","Basic "+btoa(g+":"+(x?S0(x):"")))}catch(j){throw I.from(j,I.ERR_BAD_OPTION_VALUE,e)}}if(v.isFormData(r)&&(He.hasStandardBrowserEnv||He.hasStandardBrowserWebWorkerEnv||v.isReactNative(r)?o.setContentType(void 0):v.isFunction(r.getHeaders)&&w0(o,r.getHeaders(),n("formDataHeaderPolicy"))),He.hasStandardBrowserEnv&&(v.isFunction(s)&&(s=s(t)),s===!0||s==null&&o0(t.url))){const x=i&&a&&u0.read(a);x&&o.set(i,x)}return t}const N0=typeof XMLHttpRequest<"u",j0=N0&&function(e){return new Promise(function(n,r){const s=Mp(e);let i=s.data;const a=Xe.from(s.headers).normalize();let{responseType:o,onUploadProgress:u,onDownloadProgress:c}=s,m,f,g,x,j;function N(){x&&x(),j&&j(),s.cancelToken&&s.cancelToken.unsubscribe(m),s.signal&&s.signal.removeEventListener("abort",m)}let S=new XMLHttpRequest;S.open(s.method.toUpperCase(),s.url,!0),S.timeout=s.timeout;function d(){if(!S)return;const h=Xe.from("getAllResponseHeaders"in S&&S.getAllResponseHeaders()),C={data:!o||o==="text"||o==="json"?S.responseText:S.response,status:S.status,statusText:S.statusText,headers:h,config:e,request:S};Ip(function(L){n(L),N()},function(L){r(L),N()},C),S=null}"onloadend"in S?S.onloadend=d:S.onreadystatechange=function(){!S||S.readyState!==4||S.status===0&&!(S.responseURL&&S.responseURL.startsWith("file:"))||setTimeout(d)},S.onabort=function(){S&&(r(new I("Request aborted",I.ECONNABORTED,e,S)),N(),S=null)},S.onerror=function(w){const C=w&&w.message?w.message:"Network Error",k=new I(C,I.ERR_NETWORK,e,S);k.event=w||null,r(k),N(),S=null},S.ontimeout=function(){let w=s.timeout?"timeout of "+s.timeout+"ms exceeded":"timeout exceeded";const C=s.transitional||nu;s.timeoutErrorMessage&&(w=s.timeoutErrorMessage),r(new I(w,C.clarifyTimeoutError?I.ETIMEDOUT:I.ECONNABORTED,e,S)),N(),S=null},i===void 0&&a.setContentType(null),"setRequestHeader"in S&&v.forEach(Pp(a),function(w,C){S.setRequestHeader(C,w)}),v.isUndefined(s.withCredentials)||(S.withCredentials=!!s.withCredentials),o&&o!=="json"&&(S.responseType=s.responseType),c&&([g,j]=Vi(c,!0),S.addEventListener("progress",g)),u&&S.upload&&([f,x]=Vi(u),S.upload.addEventListener("progress",f),S.upload.addEventListener("loadend",x)),(s.cancelToken||s.signal)&&(m=h=>{S&&(r(!h||h.type?new Os(null,e,S):h),S.abort(),N(),S=null)},s.cancelToken&&s.cancelToken.subscribe(m),s.signal&&(s.signal.aborted?m():s.signal.addEventListener("abort",m)));const p=i0(s.url);if(p&&!He.protocols.includes(p)){r(new I("Unsupported protocol "+p+":",I.ERR_BAD_REQUEST,e)),N();return}S.send(i||null)})},E0=(e,t)=>{if(e=e?e.filter(Boolean):[],!t&&!e.length)return;const n=new AbortController;let r=!1;const s=function(u){if(!r){r=!0,a();const c=u instanceof Error?u:this.reason;n.abort(c instanceof I?c:new Os(c instanceof Error?c.message:c))}};let i=t&&setTimeout(()=>{i=null,s(new I(`timeout of ${t}ms exceeded`,I.ETIMEDOUT))},t);const a=()=>{e&&(i&&clearTimeout(i),i=null,e.forEach(u=>{u.unsubscribe?u.unsubscribe(s):u.removeEventListener("abort",s)}),e=null)};e.forEach(u=>{if(!r){if(u.aborted){s.call(u);return}u.addEventListener("abort",s,{once:!0})}});const{signal:o}=n;return o.unsubscribe=()=>v.asap(a),o},k0=function*(e,t){let n=e.byteLength;if(n<t){yield e;return}let r=0,s;for(;r<n;)s=r+t,yield e.slice(r,s),r=s},C0=async function*(e,t){for await(const n of P0(e))yield*k0(n,t)},P0=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:n,value:r}=await t.read();if(n)break;yield r}}finally{await t.cancel()}},zc=(e,t,n,r)=>{const s=C0(e,t);let i=0,a,o=u=>{a||(a=!0,r&&r(u))};return new ReadableStream({async pull(u){try{const{done:c,value:m}=await s.next();if(c){o(),u.close();return}let f=m.byteLength;if(n){let g=i+=f;n(g)}u.enqueue(new Uint8Array(m))}catch(c){throw o(c),c}},cancel(u){return o(u),s.return()}},{highWaterMark:2})},Mc=e=>e>=48&&e<=57||e>=65&&e<=70||e>=97&&e<=102,Up=(e,t,n)=>t+2<n&&Mc(e.charCodeAt(t+1))&&Mc(e.charCodeAt(t+2)),Uc=e=>e<=57?e-48:(e&223)-55,R0=e=>e>=65&&e<=90||e>=97&&e<=122||e>=48&&e<=57||e===43||e===47||e===45||e===95,b0=e=>e===9||e===10||e===12||e===13||e===32,_0=e=>{const t=Math.floor(e/4),n=e%4;return t*3+(n===2?1:n===3?2:0)},T0=e=>{const t=e.length;let n=0;return t>0&&e.charCodeAt(t-1)===61&&(n++,t>1&&e.charCodeAt(t-2)===61&&n++),Math.floor((t-n)*3/4)},O0=e=>{const t=e.length;let n=0,r=0,s=!1;for(let i=0;i<t;i++){let a=e.charCodeAt(i);if(a===37&&Up(e,i,t)&&(a=Uc(e.charCodeAt(i+1))*16+Uc(e.charCodeAt(i+2)),i+=2),!b0(a)){if(a===61){r++;continue}if(!R0(a)||r>0){s=!0;continue}n++}}return s||r>2||r>0&&(n+r)%4!==0||n%4===1?T0(e):_0(n)},L0=(e,t)=>{if(!e||typeof e!="string"||!e.startsWith("data:"))return 0;const n=e.indexOf(",");if(n<0)return 0;const r=e.slice(5,n),s=e.slice(n+1);if(/;base64/i.test(r))return t(s);let a=0;for(let o=0,u=s.length;o<u;o++){const c=s.charCodeAt(o);if(c===37&&Up(s,o,u))a+=1,o+=2;else if(c<128)a+=1;else if(c<2048)a+=2;else if(c>=55296&&c<=56319&&o+1<u){const m=s.charCodeAt(o+1);m>=56320&&m<=57343?(a+=4,o++):a+=3}else a+=3}return a};function D0(e){const t=typeof e=="string"?e.indexOf("#"):-1;return L0(t===-1?e:e.slice(0,t),O0)}const su="1.19.0",$c=64*1024,{isFunction:Zs}=v,A0=e=>encodeURIComponent(e).replace(/%([0-9A-F]{2})/gi,(t,n)=>String.fromCharCode(parseInt(n,16))),Fc=e=>{if(!v.isString(e))return e;try{return decodeURIComponent(e)}catch{return e}},Bc=(e,...t)=>{try{return!!e(...t)}catch{return!1}},I0=e=>{const t=e.indexOf("://");let n=e;return t!==-1&&(n=n.slice(t+3)),n.includes("@")||n.includes(":")},z0=e=>{const t=v.global!==void 0&&v.global!==null?v.global:globalThis,{ReadableStream:n,TextEncoder:r}=t;e=v.merge.call({skipUndefined:!0},{Request:t.Request,Response:t.Response},e);const{fetch:s,Request:i,Response:a}=e,o=s?Zs(s):typeof fetch=="function",u=Zs(i),c=Zs(a);if(!o)return!1;const m=o&&Zs(n),f=o&&(typeof r=="function"?(d=>p=>d.encode(p))(new r):async d=>new Uint8Array(await new i(d).arrayBuffer())),g=u&&m&&Bc(()=>{let d=!1;const p=new i(He.origin,{body:new n,method:"POST",get duplex(){return d=!0,"half"}}),h=p.headers.has("Content-Type");return p.body!=null&&p.body.cancel(),d&&!h}),x=c&&m&&Bc(()=>v.isReadableStream(new a("").body)),j={stream:x&&(d=>d.body)};o&&["text","arrayBuffer","blob","formData","stream"].forEach(d=>{!j[d]&&(j[d]=(p,h)=>{let w=p&&p[d];if(w)return w.call(p);throw new I(`Response type '${d}' is not supported`,I.ERR_NOT_SUPPORT,h)})});const N=async d=>{if(d==null)return 0;if(v.isBlob(d))return d.size;if(v.isSpecCompliantForm(d))return(await new i(He.origin,{method:"POST",body:d}).arrayBuffer()).byteLength;if(v.isArrayBufferView(d)||v.isArrayBuffer(d))return d.byteLength;if(v.isURLSearchParams(d)&&(d=d+""),v.isString(d))return(await f(d)).byteLength},S=async(d,p)=>{const h=v.toFiniteNumber(d.getContentLength());return h??N(p)};return async d=>{let{url:p,method:h,data:w,signal:C,cancelToken:k,timeout:L,onDownloadProgress:A,onUploadProgress:Z,responseType:B,headers:ie,withCredentials:le="same-origin",fetchOptions:be,maxContentLength:te,maxBodyLength:Ze}=Mp(d);const Le=v.isNumber(te)&&te>-1,P=v.isNumber(Ze)&&Ze>-1,_=H=>v.hasOwnProp(d,H)?d[H]:void 0;let D=s||fetch;B=B?(B+"").toLowerCase():"text";let E=E0([C,k&&k.toAbortSignal()],L),b=null;const U=E&&E.unsubscribe&&(()=>{E.unsubscribe()});let G,Q=null;const ee=()=>new I("Request body larger than maxBodyLength limit",I.ERR_BAD_REQUEST,d,b);try{let H;const M=_("auth");if(M){const q=v.getSafeProp(M,"username")||"",ce=v.getSafeProp(M,"password")||"";H={username:q,password:ce}}if(I0(p)){const q=new URL(p,He.origin);if(!H&&(q.username||q.password)){const ce=Fc(q.username),We=Fc(q.password);H={username:ce,password:We}}(q.username||q.password)&&(q.username="",q.password="",p=q.href)}if(H&&(ie.delete("authorization"),ie.set("Authorization","Basic "+btoa(A0((H.username||"")+":"+(H.password||""))))),Le&&typeof p=="string"&&p.startsWith("data:")&&D0(p)>te)throw new I("maxContentLength size of "+te+" exceeded",I.ERR_BAD_RESPONSE,d,b);if(P&&h!=="get"&&h!=="head"){const q=await N(w);if(typeof q=="number"&&isFinite(q)&&(G=q,q>Ze))throw ee()}const _e=P&&(v.isReadableStream(w)||v.isStream(w)),De=(q,ce,We)=>zc(q,$c,dt=>{if(P&&dt>Ze)throw Q=ee();ce&&ce(dt)},We);if(g&&h!=="get"&&h!=="head"&&(Z||_e)){if(G=G??await S(ie,w),G!==0||_e){let q=new i(p,{method:"POST",body:w,duplex:"half"}),ce;if(v.isFormData(w)&&(ce=q.headers.get("content-type"))&&ie.setContentType(ce),q.body){const[We,dt]=Z&&Lc(G,Vi(Dc(Z)))||[];w=De(q.body,We,dt)}}}else if(_e&&!u&&m&&h!=="get"&&h!=="head")w=De(w);else if(_e&&u&&!g&&h!=="get"&&h!=="head")throw new I("Stream request bodies are not supported by the current fetch implementation",I.ERR_NOT_SUPPORT,d,b);v.isString(le)||(le=le?"include":"omit");const re=u&&"credentials"in i.prototype;if(v.isFormData(w)){const q=ie.getContentType();q&&/^multipart\/form-data/i.test(q)&&!/boundary=/i.test(q)&&ie.delete("content-type")}ie.set("User-Agent","axios/"+su,!1);const Ae={...be,signal:E,method:h.toUpperCase(),headers:Pp(ie.normalize()),body:w,duplex:"half",credentials:re?le:void 0};b=u&&new i(p,Ae);let ge=await(u?D(b,be):D(p,Ae));const xt=Xe.from(ge.headers);if(Le){const q=v.toFiniteNumber(xt.getContentLength());if(q!=null&&q>te)throw new I("maxContentLength size of "+te+" exceeded",I.ERR_BAD_RESPONSE,d,b)}const ct=x&&(B==="stream"||B==="response");if(x&&ge.body&&(A||Le||ct&&U)){const q={};["status","statusText","headers"].forEach(qt=>{q[qt]=ge[qt]});const ce=v.toFiniteNumber(xt.getContentLength()),[We,dt]=A&&Lc(ce,Vi(Dc(A),!0))||[];let Vt=0;const Lr=qt=>{if(Le&&(Vt=qt,Vt>te))throw new I("maxContentLength size of "+te+" exceeded",I.ERR_BAD_RESPONSE,d,b);We&&We(qt)};ge=new a(zc(ge.body,$c,Lr,()=>{dt&&dt(),U&&U()}),q)}B=B||"text";let ve=await j[v.findKey(j,B)||"text"](ge,d);if(Le&&!x&&!ct){let q;if(ve!=null&&(typeof ve.byteLength=="number"?q=ve.byteLength:typeof ve.size=="number"?q=ve.size:typeof ve=="string"&&(q=typeof r=="function"?new r().encode(ve).byteLength:ve.length)),typeof q=="number"&&q>te)throw new I("maxContentLength size of "+te+" exceeded",I.ERR_BAD_RESPONSE,d,b)}return!ct&&U&&U(),await new Promise((q,ce)=>{Ip(q,ce,{data:ve,headers:Xe.from(ge.headers),status:ge.status,statusText:ge.statusText,config:d,request:b})})}catch(H){if(U&&U(),E&&E.aborted&&E.reason instanceof I){const M=E.reason;throw M.config=d,b&&(M.request=b),H!==M&&Object.defineProperty(M,"cause",{__proto__:null,value:H,writable:!0,enumerable:!1,configurable:!0}),M}if(Q)throw b&&!Q.request&&(Q.request=b),Q;if(H instanceof I)throw b&&!H.request&&(H.request=b),H;if(H&&H.name==="TypeError"&&/Load failed|fetch/i.test(H.message)){const M=new I("Network Error",I.ERR_NETWORK,d,b,H&&H.response);throw Object.defineProperty(M,"cause",{__proto__:null,value:H.cause||H,writable:!0,enumerable:!1,configurable:!0}),M}throw I.from(H,H&&H.code,d,b,H&&H.response)}}},M0=new Map,$p=e=>{let t=e&&e.env||{};const{fetch:n,Request:r,Response:s}=t,i=[r,s,n];let a=i.length,o=a,u,c,m=M0;for(;o--;)u=i[o],c=m.get(u),c===void 0&&m.set(u,c=o?new Map:z0(t)),m=c;return c};$p();const iu={http:Hy,xhr:j0,fetch:{get:$p}};v.forEach(iu,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{__proto__:null,value:t})}catch{}Object.defineProperty(e,"adapterName",{__proto__:null,value:t})}});const Hc=e=>`- ${e}`,U0=e=>v.isFunction(e)||e===null||e===!1;function $0(e,t){e=v.isArray(e)?e:[e];const{length:n}=e;let r,s;const i={};for(let a=0;a<n;a++){r=e[a];let o;if(s=r,!U0(r)&&(s=iu[(o=String(r)).toLowerCase()],s===void 0))throw new I(`Unknown adapter '${o}'`);if(s&&(v.isFunction(s)||(s=s.get(t))))break;i[o||"#"+a]=s}if(!s){const a=Object.entries(i).map(([u,c])=>`adapter ${u} `+(c===!1?"is not supported by the environment":"is not available in the build"));let o=n?a.length>1?`since :
`+a.map(Hc).join(`
`):" "+Hc(a[0]):"as no adapter specified";throw new I("There is no suitable adapter to dispatch the request "+o,I.ERR_NOT_SUPPORT)}return s}const Fp={getAdapter:$0,adapters:iu};function Qa(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new Os(null,e)}function Ka(e){return Qa(e),e.headers=Xe.from(e.headers),e.data=Wa.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),Fp.getAdapter(e.adapter||Ts.adapter,e)(e).then(function(r){Qa(e),e.response=r;try{r.data=Wa.call(e,e.transformResponse,r)}finally{delete e.response}return r.headers=Xe.from(r.headers),r},function(r){if(!Ap(r)&&(Qa(e),r&&r.response)){e.response=r.response;try{r.response.data=Wa.call(e,e.transformResponse,r.response)}finally{delete e.response}r.response.headers=Xe.from(r.response.headers)}return Promise.reject(r)})}const fa={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{fa[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}});const Vc={};fa.transitional=function(t,n,r){function s(i,a){return"[Axios v"+su+"] Transitional option '"+i+"'"+a+(r?". "+r:"")}return(i,a,o)=>{if(t===!1)throw new I(s(a," has been removed"+(n?" in "+n:"")),I.ERR_DEPRECATED);return n&&!Vc[a]&&(Vc[a]=!0,console.warn(s(a," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(i,a,o):!0}};fa.spelling=function(t){return(n,r)=>(console.warn(`${r} is likely a misspelling of ${t}`),!0)};function F0(e,t,n){if(typeof e!="object"||e===null)throw new I("options must be an object",I.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let s=r.length;for(;s-- >0;){const i=r[s],a=Object.prototype.hasOwnProperty.call(t,i)?t[i]:void 0;if(a){const o=e[i],u=o===void 0||a(o,i,e);if(u!==!0)throw new I("option "+i+" must be "+u,I.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new I("Unknown option "+i,I.ERR_BAD_OPTION)}}const hi={assertOptions:F0,validators:fa},Ge=hi.validators;let $n=class{constructor(t){this.defaults=t||{},this.interceptors={request:new Tc,response:new Tc}}async request(t,n){try{return await this._request(t,n)}catch(r){if(r instanceof Error){let s={};Error.captureStackTrace?Error.captureStackTrace(s):s=new Error;const i=(()=>{if(!s.stack)return"";const a=s.stack.indexOf(`
`);return a===-1?"":s.stack.slice(a+1)})();try{if(!r.stack)r.stack=i;else if(i){const a=i.indexOf(`
`),o=a===-1?-1:i.indexOf(`
`,a+1),u=o===-1?"":i.slice(o+1);String(r.stack).endsWith(u)||(r.stack+=`
`+i)}}catch{}}throw r}}_request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=Kn(this.defaults,n);const{transitional:r,paramsSerializer:s,headers:i}=n;r!==void 0&&hi.assertOptions(r,{silentJSONParsing:Ge.transitional(Ge.boolean),forcedJSONParsing:Ge.transitional(Ge.boolean),clarifyTimeoutError:Ge.transitional(Ge.boolean),legacyInterceptorReqResOrdering:Ge.transitional(Ge.boolean),advertiseZstdAcceptEncoding:Ge.transitional(Ge.boolean),validateStatusUndefinedResolves:Ge.transitional(Ge.boolean)},!1),s!=null&&(v.isFunction(s)?n.paramsSerializer={serialize:s}:hi.assertOptions(s,{encode:Ge.function,serialize:Ge.function},!0)),n.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?n.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:n.allowAbsoluteUrls=!0),hi.assertOptions(n,{baseUrl:Ge.spelling("baseURL"),withXsrfToken:Ge.spelling("withXSRFToken")},!0),n.method=(n.method||this.defaults.method||"get").toLowerCase();let a=i&&v.merge(i.common,i[n.method]);i&&v.forEach(["delete","get","head","post","put","patch","query","common"],j=>{delete i[j]}),n.headers=Xe.concat(a,i);const o=[];let u=!0;this.interceptors.request.forEach(function(N){if(typeof N.runWhen=="function"&&N.runWhen(n)===!1)return;u=u&&N.synchronous;const S=n.transitional||nu;S&&S.legacyInterceptorReqResOrdering?o.unshift(N.fulfilled,N.rejected):o.push(N.fulfilled,N.rejected)});const c=[];this.interceptors.response.forEach(function(N){c.push(N.fulfilled,N.rejected)});let m,f=0,g;if(!u){const j=[Ka.bind(this),void 0];for(j.unshift(...o),j.push(...c),g=j.length,m=Promise.resolve(n);f<g;)m=m.then(j[f++],j[f++]);return m}g=o.length;let x=n;for(;f<g;){const j=o[f++],N=o[f++];try{x=j?j(x):x}catch(S){if(!N){m=Promise.reject(S);break}try{const d=N.call(this,S);v.isThenable(d)&&(m=Promise.resolve(d).then(()=>Ka.call(this,x)))}catch(d){m=Promise.reject(d)}break}}if(!m)try{m=Ka.call(this,x)}catch(j){m=Promise.reject(j)}for(f=0,g=c.length;f<g;)m=m.then(c[f++],c[f++]);return m}getUri(t){t=Kn(this.defaults,t);const n=zp(t.baseURL,t.url,t.allowAbsoluteUrls,t);return Op(n,t.params,t.paramsSerializer)}};v.forEach(["delete","get","head","options"],function(t){$n.prototype[t]=function(n,r){return this.request(Kn(r||{},{method:t,url:n,data:r&&v.hasOwnProp(r,"data")?r.data:void 0}))}});v.forEach(["post","put","patch","query"],function(t){function n(r){return function(i,a,o){return this.request(Kn(o||{},{method:t,headers:r?{"Content-Type":"multipart/form-data"}:{},url:i,data:a}))}}$n.prototype[t]=n(),t!=="query"&&($n.prototype[t+"Form"]=n(!0))});let B0=class Bp{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(i){n=i});const r=this;this.promise.then(s=>{if(!r._listeners)return;let i=r._listeners.length;for(;i-- >0;)r._listeners[i](s);r._listeners=null}),this.promise.then=s=>{let i;const a=new Promise(o=>{r.subscribe(o),i=o}).then(s);return a.cancel=function(){r.unsubscribe(i)},a},t(function(i,a,o){r.reason||(r.reason=new Os(i,a,o),n(r.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}toAbortSignal(){const t=new AbortController,n=r=>{t.abort(r)};return this.subscribe(n),t.signal.unsubscribe=()=>this.unsubscribe(n),t.signal}static source(){let t;return{token:new Bp(function(s){t=s}),cancel:t}}};function H0(e){return function(n){return e.apply(null,n)}}function V0(e){return v.isObject(e)&&e.isAxiosError===!0}const Gl={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerReturnsAnUnknownError:520,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(Gl).forEach(([e,t])=>{Gl[t]=e});function Hp(e){const t=new $n(e),n=yp($n.prototype.request,t);return v.extend(n,$n.prototype,t,{allOwnKeys:!0}),v.extend(n,t,null,{allOwnKeys:!0}),n.create=function(s){return Hp(Kn(e,s))},n}const Re=Hp(Ts);Re.Axios=$n;Re.CanceledError=Os;Re.CancelToken=B0;Re.isCancel=Ap;Re.VERSION=su;Re.toFormData=da;Re.AxiosError=I;Re.Cancel=Re.CanceledError;Re.all=function(t){return Promise.all(t)};Re.spread=H0;Re.isAxiosError=V0;Re.mergeConfig=Kn;Re.AxiosHeaders=Xe;Re.formToJSON=e=>Dp(v.isHTMLForm(e)?new FormData(e):e);Re.getAdapter=Fp.getAdapter;Re.HttpStatusCode=Gl;Re.default=Re;const{Axios:Gx,AxiosError:Yx,CanceledError:Xx,isCancel:Jx,CancelToken:Zx,VERSION:ew,all:tw,Cancel:nw,isAxiosError:rw,spread:sw,toFormData:iw,AxiosHeaders:aw,HttpStatusCode:lw,formToJSON:ow,getAdapter:uw,mergeConfig:cw,create:dw}=Re,ne=Re.create({baseURL:"http://localhost:5000/api",headers:{"Content-Type":"application/json"}});ne.interceptors.request.use(e=>{const t=localStorage.getItem("token");return t&&(e.headers["x-auth-token"]=t),e},e=>Promise.reject(e));const Vp=y.createContext(),Or=()=>{const e=y.useContext(Vp);if(!e)throw new Error("useAuth must be used within an AuthProvider");return e},q0=({children:e})=>{const[t,n]=y.useState(null),[r,s]=y.useState(localStorage.getItem("token")),[i,a]=y.useState(!0),[o,u]=y.useState(""),[c,m]=y.useState("");y.useEffect(()=>{const d=localStorage.getItem("companyName");d&&u(d);const p=localStorage.getItem("companyPhone");p&&m(p),r?(ne.defaults.headers.common["x-auth-token"]=r,f()):a(!1)},[r]);const f=async()=>{try{const d=await ne.get("/auth/me");n(d.data),d.data.company&&(u(d.data.company),localStorage.setItem("companyName",d.data.company)),d.data.companyPhone!==void 0&&(m(d.data.companyPhone),localStorage.setItem("companyPhone",d.data.companyPhone))}catch(d){console.error("Error loading user:",d),N()}finally{a(!1)}},g=async(d,p)=>{try{const h=await ne.post("/auth/login",{email:d,password:p}),{token:w,user:C}=h.data;return localStorage.setItem("token",w),ne.defaults.headers.common["x-auth-token"]=w,s(w),n(C),C.company&&(u(C.company),localStorage.setItem("companyName",C.company)),C.companyPhone&&(m(C.companyPhone),localStorage.setItem("companyPhone",C.companyPhone)),C}catch(h){throw console.error("Login error:",h),h}},x=async d=>{try{const p=await ne.post("/auth/register",d),{token:h,user:w}=p.data;return localStorage.setItem("token",h),ne.defaults.headers.common["x-auth-token"]=h,s(h),n(w),w.company&&(u(w.company),localStorage.setItem("companyName",w.company)),w.companyPhone&&(m(w.companyPhone),localStorage.setItem("companyPhone",w.companyPhone)),w}catch(p){throw console.error("Register error:",p),p}},j=async({companyPhone:d})=>{try{const p=await ne.put("/auth/profile",{companyPhone:d});return m(p.data.user.companyPhone),localStorage.setItem("companyPhone",p.data.user.companyPhone),p.data.user}catch(p){throw console.error("Update profile error:",p),p}},N=()=>{localStorage.removeItem("token"),localStorage.removeItem("companyName"),localStorage.removeItem("companyPhone"),delete ne.defaults.headers.common["x-auth-token"],s(null),n(null),u(""),m("")},S={user:t,token:r,loading:i,companyName:o,companyPhone:c,login:g,register:x,logout:N,updateProfile:j,isAuthenticated:!!r};return l.jsx(Vp.Provider,{value:S,children:e})};let W0={data:""},Q0=e=>{if(typeof window=="object"){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||W0},K0=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,G0=/\/\*[^]*?\*\/|  +/g,qc=/\n+/g,fn=(e,t)=>{let n="",r="",s="";for(let i in e){let a=e[i];i[0]=="@"?i[1]=="i"?n=i+" "+a+";":r+=i[1]=="f"?fn(a,i):i+"{"+fn(a,i[1]=="k"?"":t)+"}":typeof a=="object"?r+=fn(a,t?t.replace(/([^,])+/g,o=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,u=>/&/.test(u)?u.replace(/&/g,o):o?o+" "+u:u)):i):a!=null&&(i=i[1]=="-"?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=fn.p?fn.p(i,a):i+":"+a+";")}return n+(t&&s?t+"{"+s+"}":s)+r},ln={},qp=e=>{if(typeof e=="object"){let t="";for(let n in e)t+=n+qp(e[n]);return t}return e},Y0=(e,t,n,r,s)=>{let i=qp(e),a=ln[i]||(ln[i]=(u=>{let c=0,m=11;for(;c<u.length;)m=101*m+u.charCodeAt(c++)>>>0;return"go"+m})(i));if(!ln[a]){let u=i!==e?e:(c=>{let m,f,g=[{}];for(;m=K0.exec(c.replace(G0,""));)m[4]?g.shift():m[3]?(f=m[3].replace(qc," ").trim(),g.unshift(g[0][f]=g[0][f]||{})):g[0][m[1]]=m[2].replace(qc," ").trim();return g[0]})(e);ln[a]=fn(s?{["@keyframes "+a]:u}:u,n?"":"."+a)}let o=n&&ln.g;return n&&(ln.g=ln[a]),((u,c,m,f)=>{f?c.data=c.data.replace(f,u):c.data.indexOf(u)===-1&&(c.data=m?u+c.data:c.data+u)})(ln[a],t,r,o),a},X0=(e,t,n)=>e.reduce((r,s,i)=>{let a=t[i];if(a&&a.call){let o=a(n),u=o&&o.props&&o.props.className||/^go/.test(o)&&o;a=u?"."+u:o&&typeof o=="object"?o.props?"":fn(o,""):o===!1?"":o}return r+s+(a??"")},"");function pa(e){let t=this||{},n=e.call?e(t.p):e;return Y0(n.unshift?n.raw?X0(n,[].slice.call(arguments,1),t.p):n.reduce((r,s)=>Object.assign(r,s&&s.call?s(t.p):s),{}):n,Q0(t.target),t.g,t.o,t.k)}let Wp,Yl,Xl;pa.bind({g:1});let nn=pa.bind({k:1});function J0(e,t,n,r){fn.p=t,Wp=e,Yl=n,Xl=r}function Tn(e,t){let n=this||{};return function(){let r=arguments;function s(i,a){let o=Object.assign({},i),u=o.className||s.className;n.p=Object.assign({theme:Yl&&Yl()},o),n.o=/go\d/.test(u),o.className=pa.apply(n,r)+(u?" "+u:"");let c=e;return e[0]&&(c=o.as||e,delete o.as),Xl&&c[0]&&Xl(o),Wp(c,o)}return s}}var Z0=e=>typeof e=="function",qi=(e,t)=>Z0(e)?e(t):e,ex=(()=>{let e=0;return()=>(++e).toString()})(),Qp=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),tx=20,au="default",Kp=(e,t)=>{let{toastLimit:n}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,n)};case 1:return{...e,toasts:e.toasts.map(a=>a.id===t.toast.id?{...a,...t.toast}:a)};case 2:let{toast:r}=t;return Kp(e,{type:e.toasts.find(a=>a.id===r.id)?1:0,toast:r});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(a=>a.id===s||s===void 0?{...a,dismissed:!0,visible:!1}:a)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(a=>a.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(a=>({...a,pauseDuration:a.pauseDuration+i}))}}},gi=[],Gp={toasts:[],pausedAt:void 0,settings:{toastLimit:tx}},$t={},Yp=(e,t=au)=>{$t[t]=Kp($t[t]||Gp,e),gi.forEach(([n,r])=>{n===t&&r($t[t])})},Xp=e=>Object.keys($t).forEach(t=>Yp(e,t)),nx=e=>Object.keys($t).find(t=>$t[t].toasts.some(n=>n.id===e)),ma=(e=au)=>t=>{Yp(t,e)},rx={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},sx=(e={},t=au)=>{let[n,r]=y.useState($t[t]||Gp),s=y.useRef($t[t]);y.useEffect(()=>(s.current!==$t[t]&&r($t[t]),gi.push([t,r]),()=>{let a=gi.findIndex(([o])=>o===t);a>-1&&gi.splice(a,1)}),[t]);let i=n.toasts.map(a=>{var o,u,c;return{...e,...e[a.type],...a,removeDelay:a.removeDelay||((o=e[a.type])==null?void 0:o.removeDelay)||(e==null?void 0:e.removeDelay),duration:a.duration||((u=e[a.type])==null?void 0:u.duration)||(e==null?void 0:e.duration)||rx[a.type],style:{...e.style,...(c=e[a.type])==null?void 0:c.style,...a.style}}});return{...n,toasts:i}},ix=(e,t="blank",n)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...n,id:(n==null?void 0:n.id)||ex()}),Ls=e=>(t,n)=>{let r=ix(t,e,n);return ma(r.toasterId||nx(r.id))({type:2,toast:r}),r.id},Me=(e,t)=>Ls("blank")(e,t);Me.error=Ls("error");Me.success=Ls("success");Me.loading=Ls("loading");Me.custom=Ls("custom");Me.dismiss=(e,t)=>{let n={type:3,toastId:e};t?ma(t)(n):Xp(n)};Me.dismissAll=e=>Me.dismiss(void 0,e);Me.remove=(e,t)=>{let n={type:4,toastId:e};t?ma(t)(n):Xp(n)};Me.removeAll=e=>Me.remove(void 0,e);Me.promise=(e,t,n)=>{let r=Me.loading(t.loading,{...n,...n==null?void 0:n.loading});return typeof e=="function"&&(e=e()),e.then(s=>{let i=t.success?qi(t.success,s):void 0;return i?Me.success(i,{id:r,...n,...n==null?void 0:n.success}):Me.dismiss(r),s}).catch(s=>{let i=t.error?qi(t.error,s):void 0;i?Me.error(i,{id:r,...n,...n==null?void 0:n.error}):Me.dismiss(r)}),e};var ax=1e3,lx=(e,t="default")=>{let{toasts:n,pausedAt:r}=sx(e,t),s=y.useRef(new Map).current,i=y.useCallback((f,g=ax)=>{if(s.has(f))return;let x=setTimeout(()=>{s.delete(f),a({type:4,toastId:f})},g);s.set(f,x)},[]);y.useEffect(()=>{if(r)return;let f=Date.now(),g=n.map(x=>{if(x.duration===1/0)return;let j=(x.duration||0)+x.pauseDuration-(f-x.createdAt);if(j<0){x.visible&&Me.dismiss(x.id);return}return setTimeout(()=>Me.dismiss(x.id,t),j)});return()=>{g.forEach(x=>x&&clearTimeout(x))}},[n,r,t]);let a=y.useCallback(ma(t),[t]),o=y.useCallback(()=>{a({type:5,time:Date.now()})},[a]),u=y.useCallback((f,g)=>{a({type:1,toast:{id:f,height:g}})},[a]),c=y.useCallback(()=>{r&&a({type:6,time:Date.now()})},[r,a]),m=y.useCallback((f,g)=>{let{reverseOrder:x=!1,gutter:j=8,defaultPosition:N}=g||{},S=n.filter(h=>(h.position||N)===(f.position||N)&&h.height),d=S.findIndex(h=>h.id===f.id),p=S.filter((h,w)=>w<d&&h.visible).length;return S.filter(h=>h.visible).slice(...x?[p+1]:[0,p]).reduce((h,w)=>h+(w.height||0)+j,0)},[n]);return y.useEffect(()=>{n.forEach(f=>{if(f.dismissed)i(f.id,f.removeDelay);else{let g=s.get(f.id);g&&(clearTimeout(g),s.delete(f.id))}})},[n,i]),{toasts:n,handlers:{updateHeight:u,startPause:o,endPause:c,calculateOffset:m}}},ox=nn`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,ux=nn`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,cx=nn`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,dx=Tn("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${ox} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${ux} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${cx} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,fx=nn`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,px=Tn("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${fx} 1s linear infinite;
`,mx=nn`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,hx=nn`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,gx=Tn("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${mx} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${hx} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,vx=Tn("div")`
  position: absolute;
`,yx=Tn("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,xx=nn`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,wx=Tn("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${xx} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Sx=({toast:e})=>{let{icon:t,type:n,iconTheme:r}=e;return t!==void 0?typeof t=="string"?y.createElement(wx,null,t):t:n==="blank"?null:y.createElement(yx,null,y.createElement(px,{...r}),n!=="loading"&&y.createElement(vx,null,n==="error"?y.createElement(dx,{...r}):y.createElement(gx,{...r})))},Nx=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,jx=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,Ex="0%{opacity:0;} 100%{opacity:1;}",kx="0%{opacity:1;} 100%{opacity:0;}",Cx=Tn("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Px=Tn("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Rx=(e,t)=>{let n=e.includes("top")?1:-1,[r,s]=Qp()?[Ex,kx]:[Nx(n),jx(n)];return{animation:t?`${nn(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${nn(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},bx=y.memo(({toast:e,position:t,style:n,children:r})=>{let s=e.height?Rx(e.position||t||"top-center",e.visible):{opacity:0},i=y.createElement(Sx,{toast:e}),a=y.createElement(Px,{...e.ariaProps},qi(e.message,e));return y.createElement(Cx,{className:e.className,style:{...s,...n,...e.style}},typeof r=="function"?r({icon:i,message:a}):y.createElement(y.Fragment,null,i,a))});J0(y.createElement);var _x=({id:e,className:t,style:n,onHeightUpdate:r,children:s})=>{let i=y.useCallback(a=>{if(a){let o=()=>{let u=a.getBoundingClientRect().height;r(e,u)};o(),new MutationObserver(o).observe(a,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return y.createElement("div",{ref:i,className:t,style:n},s)},Tx=(e,t)=>{let n=e.includes("top"),r=n?{top:0}:{bottom:0},s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:Qp()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(n?1:-1)}px)`,...r,...s}},Ox=pa`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ei=16,Lx=({reverseOrder:e,position:t="top-center",toastOptions:n,gutter:r,children:s,toasterId:i,containerStyle:a,containerClassName:o})=>{let{toasts:u,handlers:c}=lx(n,i);return y.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:ei,left:ei,right:ei,bottom:ei,pointerEvents:"none",...a},className:o,onMouseEnter:c.startPause,onMouseLeave:c.endPause},u.map(m=>{let f=m.position||t,g=c.calculateOffset(m,{reverseOrder:e,gutter:r,defaultPosition:t}),x=Tx(f,g);return y.createElement(_x,{id:m.id,key:m.id,onHeightUpdate:c.updateHeight,className:m.visible?Ox:"",style:x},m.type==="custom"?qi(m.message,m):s?s(m):y.createElement(bx,{toast:m,position:f}))}))},z=Me;function Dx(){const[e,t]=y.useState(""),[n,r]=y.useState(""),[s,i]=y.useState(!1),{login:a}=Or(),o=sn(),u=async c=>{var m,f;if(c.preventDefault(),!e||!n){z.error("Please enter email and password");return}i(!0);try{await a(e,n),z.success("Login successful!"),o("/manifest-manager")}catch(g){console.error("Login error:",g);const x=((f=(m=g.response)==null?void 0:m.data)==null?void 0:f.error)||"Login failed. Please try again.";z.error(x)}finally{i(!1)}};return l.jsx("div",{className:"auth-page",children:l.jsxs("div",{className:"auth-container",children:[l.jsxs("div",{className:"auth-logo",children:[l.jsx("i",{className:"fas fa-truck"}),l.jsx("h1",{children:"Manifest System"}),l.jsx("p",{children:"Sign in to manage your manifests"})]}),l.jsxs("form",{onSubmit:u,children:[l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"Email Address"}),l.jsx("input",{type:"email",value:e,onChange:c=>t(c.target.value),placeholder:"admin@company.com",required:!0})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"Password"}),l.jsx("input",{type:"password",value:n,onChange:c=>r(c.target.value),placeholder:"Enter password",required:!0})]}),l.jsxs("button",{type:"submit",className:"btn-auth",disabled:s,children:[l.jsx("i",{className:"fas fa-sign-in-alt"})," ",s?"Signing in...":"Sign In"]})]}),l.jsxs("div",{className:"auth-link",children:["Don't have an account? ",l.jsx(Jo,{to:"/register",children:"Register here"})]})]})})}function Ax(){const[e,t]=y.useState({company:"",companyPhone:"",name:"",email:"",password:"",confirmPassword:""}),[n,r]=y.useState(!1),{register:s}=Or(),i=sn(),a=u=>{t({...e,[u.target.name]:u.target.value})},o=async u=>{var c,m;if(u.preventDefault(),e.password!==e.confirmPassword){z.error("Passwords do not match");return}if(e.password.length<6){z.error("Password must be at least 6 characters");return}r(!0);try{await s({company:e.company,companyPhone:e.companyPhone,name:e.name,email:e.email,password:e.password}),z.success("Account created successfully!"),i("/manifest-manager")}catch(f){console.error("Registration error:",f);const g=((m=(c=f.response)==null?void 0:c.data)==null?void 0:m.error)||"Registration failed. Please try again.";z.error(g)}finally{r(!1)}};return l.jsx("div",{className:"auth-page",children:l.jsxs("div",{className:"auth-container",children:[l.jsxs("div",{className:"auth-logo",children:[l.jsx("i",{className:"fas fa-user-plus"}),l.jsx("h1",{children:"Create Account"}),l.jsx("p",{children:"Enter your company details to get started"})]}),l.jsxs("form",{onSubmit:o,children:[l.jsxs("div",{className:"form-group",children:[l.jsxs("label",{children:["Company Name ",l.jsx("span",{style:{color:"#e53e3e"},children:"*"})]}),l.jsx("input",{type:"text",name:"company",value:e.company,onChange:a,placeholder:"Enter your company name",required:!0})]}),l.jsxs("div",{className:"form-group",children:[l.jsxs("label",{children:["Company Phone Number ",l.jsx("span",{style:{color:"#e53e3e"},children:"*"})]}),l.jsx("input",{type:"tel",name:"companyPhone",value:e.companyPhone,onChange:a,placeholder:"Enter your company phone number",required:!0})]}),l.jsxs("div",{className:"form-group",children:[l.jsxs("label",{children:["Full Name ",l.jsx("span",{style:{color:"#e53e3e"},children:"*"})]}),l.jsx("input",{type:"text",name:"name",value:e.name,onChange:a,placeholder:"Enter your full name",required:!0})]}),l.jsxs("div",{className:"form-group",children:[l.jsxs("label",{children:["Email Address ",l.jsx("span",{style:{color:"#e53e3e"},children:"*"})]}),l.jsx("input",{type:"email",name:"email",value:e.email,onChange:a,placeholder:"admin@company.com",required:!0})]}),l.jsxs("div",{className:"form-group",children:[l.jsxs("label",{children:["Password ",l.jsx("span",{style:{color:"#e53e3e"},children:"*"})]}),l.jsx("input",{type:"password",name:"password",value:e.password,onChange:a,placeholder:"Create a password (min 6 characters)",required:!0})]}),l.jsxs("div",{className:"form-group",children:[l.jsxs("label",{children:["Confirm Password ",l.jsx("span",{style:{color:"#e53e3e"},children:"*"})]}),l.jsx("input",{type:"password",name:"confirmPassword",value:e.confirmPassword,onChange:a,placeholder:"Confirm your password",required:!0})]}),l.jsxs("button",{type:"submit",className:"btn-auth",disabled:n,children:[l.jsx("i",{className:"fas fa-user-plus"})," ",n?"Creating...":"Create Account"]})]}),l.jsxs("div",{className:"auth-link",children:["Already have an account? ",l.jsx(Jo,{to:"/login",children:"Sign in here"})]})]})})}const Ix="/assets/image-DQeb1gVZ.png";function ha(){const{companyName:e}=Or(),t=localStorage.getItem("companyName");return e||t||""}function Jp(){const{companyPhone:e}=Or(),t=localStorage.getItem("companyPhone");return e||t||""}function zx(){const{id:e}=ua(),t=sn(),n=ha(),r=Jp(),[s,i]=y.useState(null),[a,o]=y.useState([]),[u,c]=y.useState([{id:Date.now(),name:"",qty:"",rate:"",total:0}]),[m,f]=y.useState(!0),[g,x]=y.useState(""),[j,N]=y.useState(""),[S,d]=y.useState(""),[p,h]=y.useState(""),[w,C]=y.useState(""),[k,L]=y.useState(""),[A,Z]=y.useState(""),[B,ie]=y.useState(""),[le,be]=y.useState(!1),[te,Ze]=y.useState(!1),[Le,P]=y.useState(null),[_,D]=y.useState(!1),[E,b]=y.useState(1),U=3,[G,Q]=y.useState(!1),[ee,H]=y.useState("");y.useEffect(()=>{De()},[]);const M=R=>R?R.toUpperCase():"",_e=R=>(R||0).toFixed(2),De=async()=>{try{const R=await ne.get("/manifests"),W=R.data.filter(Te=>Te.status==="ACTIVE"),oe=R.data.filter(Te=>Te.status==="DRAFT"),ft=(Te=>Te.filter(Ie=>{const Wt=Ie.truckPlate&&Ie.truckPlate.trim()!=="",As=Ie.shipments&&Ie.shipments.length>0;return Wt||As}))(W).sort((Te,Ie)=>new Date(Ie.createdAt)-new Date(Te.createdAt));if(o(ft),e){const Te=R.data.find(Ie=>Ie._id===e);if(Te)P(e),i(Te),re(Te);else if(oe.length>0){const Ie=oe[0];P(Ie._id),i(Ie),re(Ie)}else ft.length>0,Ae()}else if(oe.length>0){const Te=oe[0];P(Te._id),i(Te),re(Te)}else ft.length>0,Ae()}catch{z.error("Failed to load manifests")}finally{f(!1)}},re=R=>{i(R),x(M(R.truckPlate||"")),N(M(R.driverName||""));const W=R.supervisor||"";if(d(W==="GEORGE"?"":M(W)),R.manifestDate){const oe=new Date(R.manifestDate);h(oe.toISOString().split("T")[0])}D(!1)},Ae=async()=>{try{const R={manifestDate:p||new Date().toISOString().split("T")[0]};g&&g!=="GEORGE"&&(R.truckPlate=M(g)),j&&j!=="GEORGE"&&(R.driverName=M(j)),S&&S!=="GEORGE"&&(R.supervisor=M(S));const W=await ne.post("/manifests",R);i(W.data),D(!0),P(W.data._id),await De()}catch{z.error("Failed to create new manifest")}},ge=R=>{x(M(R.target.value))},xt=R=>{N(M(R.target.value))},ct=R=>{d(M(R.target.value))},ve=R=>{C(M(R.target.value))},q=R=>{L(M(R.target.value))},ce=R=>{ie(M(R.target.value))},We=()=>{c([...u,{id:Date.now(),name:"",qty:"",rate:"",total:0}])},dt=R=>{if(u.length===1){z.error("You need at least one goods item.");return}c(u.filter(W=>W.id!==R))},Vt=(R,W,oe)=>{c(u.map(X=>{if(X.id===R){const me={...X,[W]:oe};if(W==="qty"||W==="rate"){const ft=W==="qty"?parseFloat(oe)||0:parseFloat(X.qty)||0,Te=W==="rate"?parseFloat(oe)||0:parseFloat(X.rate)||0;me.total=ft*Te}return W==="name"&&(me.name=M(oe)),me}return X}))},Lr=()=>{const R=u.filter(me=>me.name.trim()&&me.qty&&me.rate).map(me=>({name:me.name.trim(),qty:parseInt(me.qty),rate:parseFloat(me.rate),total:parseFloat(me.qty)*parseFloat(me.rate)})),W=R.reduce((me,ft)=>me+ft.total,0);let oe="";R.forEach((me,ft)=>{oe+=`${ft+1}. ${me.name} - Qty: ${me.qty}, TZS ${me.total.toLocaleString()}
`});const X=`Habari ${k||"Mteja"},

Tumepokea mzigo wako kama ifuatavyo:
${oe}
💰 Jumla : TZS ${W.toLocaleString()}
📍 Kwenda: ${B||"hapa"}

Asante kwa kuchagua huduma zetu!`;H(X),Q(!0)},qt=()=>{if(!A){z.error("Please enter a phone number first.");return}let R=A.replace(/\s/g,"");R.startsWith("+")||(R="+"+R);const W=`sms:${R}?body=${encodeURIComponent(ee)}`;window.open(W,"_blank"),Q(!1),z.success("Message sent successfully!")},Ds=R=>{const W=window.open("","_blank","width=302,height=600");if(!W){z.error("Please allow popups for this site");return}const oe=new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}),X=new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}),me=R.items.map(Wt=>`
      <div class="item-row">
        <div class="item-name">${M(Wt.name)}</div>
        <div class="item-values">
          <span class="qty">QTY: ${Wt.qty}</span>
        </div>
      </div>
    `).join(""),Te=r?(Wt=>{if(!Wt)return'<div class="contact-line">—</div>';const As=Wt.split(/[,;\n]/).map(Dr=>Dr.trim()).filter(Dr=>Dr);return As.length===0?'<div class="contact-line">—</div>':As.map(Dr=>`<div class="contact-line">${Dr}</div>`).join("")})(r):'<div class="contact-line">—</div>',Ie=`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Receipt</title>
        <style>
          @page { size: 58mm auto; margin: 0; }
          * { margin: 0; padding: 0; box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          html, body { width: 58mm; }
          body {
            font-family: 'Courier New', Consolas, monospace;
            font-size: 14px;
            font-weight: 700;
            color: #000;
            padding: 3mm 3mm;
            line-height: 1.5;
          }
          .center { text-align: center; }
          .right { text-align: right; }
          .company { font-size: 20px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; }
          .subtitle { font-size: 16px; font-weight: 800; text-transform: uppercase; margin-top: 2px; }
          .meta { font-size: 11px; font-weight: 600; color: #333; margin-top: 3px; }
          .divider-eq { margin: 8px 0; font-size: 12px; font-weight: 700; letter-spacing: 1px; white-space: nowrap; overflow: hidden; }
          .divider-dash { border-top: 1.5px dashed #000; margin: 8px 0; }
          .divider-solid { border-top: 2px solid #000; margin: 8px 0; }
          .line { font-size: 14px; font-weight: 700; text-transform: uppercase; padding: 2px 0; word-break: break-word; }

          .items-block { margin-top: 4px; }
          .item-row {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            font-size: 14px;
            font-weight: 700;
            text-transform: uppercase;
            padding: 5px 0;
            border-bottom: 1px dashed #999;
          }
          .item-row:last-child { border-bottom: none; }
          .item-name { flex: 1; padding-right: 8px; }
          .item-values { text-align: right; white-space: nowrap; }
          .item-values .qty { display: block; font-size: 14px; font-weight: 800; }

          .status-line {
            display: flex;
            justify-content: space-between;
            margin: 10px 0 4px;
            font-size: 14px;
            font-weight: 800;
            text-transform: uppercase;
          }
          .status-label {
            font-weight: 800;
          }
          .status-value {
            font-weight: 800;
          }

          .contact-block { margin-top: 4px; }
          .contact-title { font-size: 14px; font-weight: 800; text-transform: uppercase; }
          .contact-line { font-size: 16px; font-weight: 800; padding: 3px 0; }

          .footer { text-align: center; margin-top: 10px; }
          .footer .thanks { font-size: 14px; font-weight: 800; }
          .footer .copy { font-size: 10px; font-weight: 600; color: #444; margin-top: 5px; }
        </style>
      </head>
      <body>
        <div class="center">
          <div class="company">${M(n||"Manifest System")}</div>
          <div class="subtitle">Way Bill</div>
        </div>

        <div class="divider-eq">====================</div>

        <div class="line">Date: ${oe}</div>
        <div class="line">Time: ${X}</div>
        <div class="line">Truck: ${M(g)||"—"}</div>
        <div class="line">Driver: ${M(j)||"—"}</div>
        <div class="line">Sender: ${M(R.sender)||"—"}</div>

        <div class="divider-dash"></div>

        <div class="line">Customer: ${M(R.customer)||"—"}</div>
        <div class="line">Phone: ${R.phone||"—"}</div>
        <div class="line">Dest: ${M(R.destination)||"—"}</div>

        <div class="divider-dash"></div>

        <div class="items-block">
          ${me}
        </div>

        <!-- Status Line - Left: STATUS, Right: [PAID/UNPAID] -->
        <div class="status-line">
          <span class="status-label">STATUS</span>
          <span class="status-value">[${M(R.payment||"unpaid")}]</span>
        </div>

        <div class="divider-solid"></div>

        <div class="contact-block">
          <div class="contact-title">Kwa Mawasiliano</div>
          <div class="contact-title">Zaidi Tupigie:</div>
          ${Te}
        </div>

        <div class="divider-solid"></div>

        <div class="footer">
          <div class="thanks">Thank you for your business!</div>
          <div class="copy">© ${new Date().getFullYear()} ${M(n||"Manifest System")}</div>
        </div>
        <script>
          window.onload = function () {
            window.print();
            window.onafterprint = function () { window.close(); };
          };
        <\/script>
      </body>
      </html>
    `;W.document.write(Ie),W.document.close()},T=async()=>{var W,oe;if(!w||!k||!B){z.error("Please fill in Sender, Customer, and Destination fields.");return}const R=u.filter(X=>X.name.trim()&&X.qty&&X.rate).map(X=>({name:M(X.name.trim()),qty:parseInt(X.qty),rate:parseFloat(X.rate),total:parseFloat(X.qty)*parseFloat(X.rate)}));if(R.length===0){z.error("Please add at least one valid goods item.");return}if(!s){z.error("No manifest selected. Please create a new one.");return}f(!0);try{const X=S==="GEORGE"?"":M(S||"");await ne.put(`/manifests/${s._id}`,{truckPlate:M(g||""),driverName:M(j||""),supervisor:X,manifestDate:p});const me=R.reduce((Ie,Wt)=>Ie+Wt.total,0),ft={sender:M(w),customer:M(k),phone:A,destination:M(B),items:R,payment:le?"paid":"unpaid",status:te?"loaded":"not-loaded",manifestId:s._id},Te=await ne.post("/shipments",ft);if(Ds({...ft,total:me}),c([{id:Date.now(),name:"",qty:"",rate:"",total:0}]),C(""),L(""),Z(""),ie(""),be(!1),Ze(!1),z.success("Shipment added and receipt printed!"),await De(),s){x(M(s.truckPlate||g)),N(M(s.driverName||j));const Ie=s.supervisor||"";d(Ie==="GEORGE"?"":M(Ie))}}catch(X){console.error("Error adding shipment:",X),z.error(((oe=(W=X.response)==null?void 0:W.data)==null?void 0:oe.error)||"Failed to add shipment")}finally{f(!1)}},F=async(R,W)=>{if(W.stopPropagation(),!!confirm("Delete this manifest and all its shipments?"))try{await ne.delete(`/manifests/${R}`),z.success("Manifest deleted successfully"),await De()}catch{z.error("Failed to delete manifest")}},Y=(R,W)=>{W.stopPropagation(),t(`/edit-manifest/${R}`)},V=(R,W)=>{W.stopPropagation(),t(`/view-manifest/${R}`)},ae=Math.ceil(a.length/U),K=(E-1)*U,ke=K+U,ye=a.slice(K,ke),xe=()=>{E>1&&b(E-1)},Rt=()=>{E<ae&&b(E+1)};if(m)return l.jsx("div",{style:{textAlign:"center",padding:"50px"},children:"Loading..."});const je=(s==null?void 0:s.shipments)||[],It=je.reduce((R,W)=>{var oe;return R+(((oe=W.items)==null?void 0:oe.length)||0)},0)||0,lu=je.filter(R=>R.status!=="loaded").reduce((R,W)=>{var oe;return R+(((oe=W.items)==null?void 0:oe.length)||0)},0)||0,Zp=R=>new Date(R).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),em=()=>{s!=null&&s._id&&t(`/manifest-items/${s._id}`)},tm=R=>{R.stopPropagation(),s!=null&&s._id&&t(`/manifest-items/${s._id}`)};return l.jsxs("div",{className:"manifest-manager-page",children:[G&&l.jsx("div",{className:"modal-overlay",onClick:()=>Q(!1),children:l.jsxs("div",{className:"modal-content",onClick:R=>R.stopPropagation(),children:[l.jsxs("div",{className:"modal-header",children:[l.jsxs("h3",{children:[l.jsx("i",{className:"fas fa-comment-dots",style:{color:"#4da6ff"}})," Send Message"]}),l.jsx("button",{className:"modal-close",onClick:()=>Q(!1),children:"×"})]}),l.jsxs("div",{className:"modal-body",children:[l.jsxs("div",{className:"modal-recipient",children:[l.jsx("strong",{children:"To:"})," ",A||"No phone number provided"]}),l.jsx("div",{className:"modal-message",children:l.jsx("textarea",{value:ee,onChange:R=>H(R.target.value),rows:"10",className:"message-textarea"})})]}),l.jsxs("div",{className:"modal-footer",children:[l.jsx("button",{className:"btn-cancel",onClick:()=>Q(!1),children:"Cancel"}),l.jsxs("button",{className:"btn-send",onClick:qt,disabled:!A,children:[l.jsx("i",{className:"fas fa-paper-plane"})," Send"]})]})]})}),l.jsx("div",{className:"page-header",children:l.jsx("div",{className:"header-left",children:l.jsxs("div",{className:"header-title",children:[l.jsx("h2",{children:"Manifest Manager"}),l.jsx("span",{className:"subtitle",children:"Create and manage manifests"})]})})}),l.jsxs("div",{className:"card manifest-details-card",children:[l.jsx("div",{className:"card-header",children:l.jsxs("h3",{children:[l.jsx("i",{className:"fas fa-clipboard-list",style:{fontSize:"16px",color:"#4a5568",marginRight:"6px"}}),"Manifest Details"]})}),l.jsxs("div",{className:"form-row",children:[l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"Date"}),l.jsx("input",{type:"date",value:p,onChange:R=>h(R.target.value),placeholder:"DATE"})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"Truck Plate"}),l.jsx("input",{type:"text",value:g,onChange:ge,placeholder:"T 123 ABC"})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"Driver Name"}),l.jsx("input",{type:"text",value:j,onChange:xt,placeholder:"ENTER DRIVER NAME"})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"Supervisor"}),l.jsx("input",{type:"text",value:S,onChange:ct,placeholder:"ENTER SUPERVISOR NAME"})]})]})]}),l.jsxs("div",{className:"card add-shipment-card",children:[l.jsx("div",{className:"card-header",children:l.jsxs("h3",{children:[l.jsxs("span",{style:{display:"inline-flex",alignItems:"center",position:"relative",marginRight:"6px"},children:[l.jsx("i",{className:"fas fa-check-circle",style:{fontSize:"16px"}}),l.jsx("i",{className:"fas fa-plus",style:{fontSize:"8px",position:"absolute",bottom:"-1px",right:"-3px",background:"white",borderRadius:"50%",padding:"1px",fontWeight:"bold"}})]}),"Quick Shipment Entry"]})}),l.jsxs("div",{className:"form-row",children:[l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"Sender Name"}),l.jsx("input",{type:"text",value:w,onChange:ve,placeholder:"Enter sender name"})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"Customer Name"}),l.jsx("input",{type:"text",value:k,onChange:q,placeholder:"Enter customer name"})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"Phone / Contact"}),l.jsx("input",{type:"text",value:A,onChange:R=>Z(R.target.value),placeholder:"255 7xx 000 000"})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"Destination"}),l.jsx("input",{type:"text",value:B,onChange:ce,placeholder:"Enter destination city"})]})]}),l.jsxs("div",{className:"goods-section",children:[l.jsxs("div",{className:"goods-header",children:[l.jsxs("label",{children:[l.jsx("i",{className:"fas fa-box",style:{fontSize:"16px",color:"#4a5568",marginRight:"6px"}}),"Goods List"]}),l.jsxs("span",{className:"add-item-link",onClick:We,style:{color:"#a78bfa",cursor:"pointer",fontSize:"13px",fontWeight:"500",display:"flex",alignItems:"center",gap:"4px",transition:"all 0.3s ease"},onMouseEnter:R=>{R.currentTarget.style.color="#8b5cf6"},onMouseLeave:R=>{R.currentTarget.style.color="#a78bfa"},children:[l.jsx("i",{className:"fas fa-plus-circle",style:{fontSize:"14px",color:"#a78bfa",transition:"all 0.3s ease"}})," Add Item"]})]}),u.map(R=>l.jsxs("div",{className:"goods-row",children:[l.jsxs("div",{className:"goods-row-fields",children:[l.jsxs("div",{className:"goods-field",children:[l.jsx("label",{children:"Item Name"}),l.jsx("input",{type:"text",value:R.name,onChange:W=>Vt(R.id,"name",W.target.value),placeholder:"Item name"})]}),l.jsxs("div",{className:"goods-field",children:[l.jsx("label",{children:"Qty"}),l.jsx("input",{type:"number",value:R.qty,onChange:W=>Vt(R.id,"qty",W.target.value),placeholder:"0"})]}),l.jsxs("div",{className:"goods-field",children:[l.jsx("label",{children:"Rate"}),l.jsx("input",{type:"number",value:R.rate,onChange:W=>Vt(R.id,"rate",W.target.value),placeholder:"0"})]}),l.jsxs("div",{className:"goods-field",children:[l.jsx("label",{children:"Total Amount"}),l.jsx("input",{type:"text",value:_e(R.total),placeholder:"0.00",readOnly:!0,style:{background:"#f7fafc",fontWeight:"600",color:"#0a1628"}})]}),l.jsxs("div",{className:"goods-field goods-delete-pc",children:[l.jsx("label",{children:" "}),l.jsx("span",{className:"delete-icon-pc",onClick:()=>dt(R.id),children:l.jsx("i",{className:"fas fa-trash-alt"})})]})]}),l.jsxs("div",{className:"goods-row-total-mobile",children:[l.jsxs("div",{className:"goods-total-mobile",children:[l.jsx("label",{children:"Total Amount"}),l.jsx("input",{type:"text",value:_e(R.total),placeholder:"0.00",readOnly:!0})]}),l.jsx("span",{className:"delete-icon-mobile",onClick:()=>dt(R.id),children:l.jsx("i",{className:"fas fa-trash-alt"})})]})]},R.id))]}),l.jsxs("div",{className:"toggle-group",children:[l.jsx("div",{className:"toggle-item",children:l.jsxs("div",{className:"toggle-label-wrapper",children:[l.jsx("span",{className:"toggle-status-label",children:"Payment Status"}),l.jsxs("div",{className:`toggle-switch ${le?"active":""}`,onClick:()=>be(!le),children:[l.jsx("span",{className:"toggle-track",children:l.jsx("span",{className:"toggle-thumb"})}),l.jsx("span",{className:"toggle-label-text",children:le?"Paid":"Unpaid"})]})]})}),l.jsx("div",{className:"toggle-item",children:l.jsxs("div",{className:"toggle-label-wrapper",children:[l.jsx("span",{className:"toggle-status-label",children:"Loaded Status"}),l.jsxs("div",{className:`toggle-switch ${te?"active":""}`,onClick:()=>Ze(!te),children:[l.jsx("span",{className:"toggle-track",children:l.jsx("span",{className:"toggle-thumb"})}),l.jsx("span",{className:"toggle-label-text",children:te?"Loaded":"Not Loaded"})]})]})}),l.jsxs("div",{className:"toggle-item toggle-action",children:[l.jsx("button",{className:"btn-add-shipment",onClick:T,children:"Add & Print"}),l.jsx("button",{className:"btn-message",onClick:Lr,title:"Send Message",children:l.jsx("img",{src:Ix,alt:"Message"})})]})]})]}),l.jsxs("div",{className:"current-session-banner",onClick:em,style:{cursor:"pointer"},children:[l.jsxs("div",{className:"current-session-left",children:[l.jsx("span",{className:"session-title",children:"CURRENT SESSION"}),l.jsx("span",{className:"session-subtitle",children:lu>0?`${lu} item(s) remain unloaded`:"All items loaded ✓"})]}),l.jsx("div",{className:"current-session-right",children:l.jsxs("div",{className:"item-count-box",onClick:tm,style:{cursor:"pointer"},children:[l.jsx("div",{className:"count-row count-row-top",children:l.jsx("span",{className:"count-number",children:It})}),l.jsx("div",{className:"count-row count-row-middle",children:l.jsx("span",{className:"count-arrow",children:l.jsx("i",{className:"fas fa-chevron-right"})})}),l.jsx("div",{className:"count-row count-row-bottom",children:l.jsx("span",{className:"count-label",children:"items"})})]})})]}),l.jsxs("div",{className:"card recent-manifests-card",children:[l.jsxs("div",{className:"card-header",children:[l.jsxs("h3",{children:[l.jsx("i",{className:"fas fa-history"})," Recent Manifests"]}),l.jsxs("span",{className:"badge",children:["Total: ",a.length]})]}),a.length===0?l.jsx("p",{style:{color:"#a0aec0",textAlign:"center",padding:"20px"},children:"No saved manifests yet. Load and finalize the current session to see it here."}):l.jsxs(l.Fragment,{children:[l.jsx("div",{className:"recent-manifests-list",children:ye.map(R=>{var oe;const W=((oe=R.totals)==null?void 0:oe.totalItems)||0;return l.jsxs("div",{className:"manifest-summary-card",children:[l.jsxs("div",{className:"manifest-summary-header",children:[l.jsx("span",{className:"manifest-summary-plate",onClick:X=>V(R._id,X),style:{cursor:"pointer",transition:"all 0.2s ease",padding:"2px 8px",borderRadius:"4px",fontWeight:"600",color:"#0a1628"},onMouseEnter:X=>{X.currentTarget.style.background="#e8edf5",X.currentTarget.style.color="#4da6ff"},onMouseLeave:X=>{X.currentTarget.style.background="transparent",X.currentTarget.style.color="#0a1628"},onMouseDown:X=>{X.currentTarget.style.transform="scale(0.95)"},onMouseUp:X=>{X.currentTarget.style.transform="scale(1)"},children:M(R.truckPlate||"No Plate")}),l.jsx("span",{className:"manifest-summary-date",children:Zp(R.createdAt||R.manifestDate)}),l.jsxs("span",{className:"manifest-summary-items-count",children:["• ",W," Items"]})]}),l.jsxs("div",{className:"manifest-summary-actions",children:[l.jsx("button",{className:"btn-action btn-edit",onClick:X=>Y(R._id,X),title:"Edit Manifest",children:l.jsx("i",{className:"fas fa-edit"})}),l.jsx("button",{className:"btn-action btn-delete",onClick:X=>F(R._id,X),title:"Delete Manifest",children:l.jsx("i",{className:"fas fa-trash"})})]})]},R._id)})}),a.length>U&&l.jsxs("div",{className:"pagination",children:[l.jsxs("button",{className:"pagination-btn",onClick:xe,disabled:E===1,children:[l.jsx("i",{className:"fas fa-chevron-left"})," Previous"]}),l.jsxs("div",{className:"pagination-info",children:[l.jsx("span",{className:"pagination-current",children:E}),l.jsx("span",{children:"of"}),l.jsx("span",{children:ae})]}),l.jsxs("button",{className:"pagination-btn",onClick:Rt,disabled:E===ae,children:["Next ",l.jsx("i",{className:"fas fa-chevron-right"})]})]})]})]})]})}function Wc(){const{id:e}=ua(),t=sn(),[n,r]=y.useState(null),[s,i]=y.useState([]),[a,o]=y.useState(!0),[u,c]=y.useState(""),[m,f]=y.useState(null),[g,x]=y.useState(null),[j,N]=y.useState(null),[S,d]=y.useState(null),[p,h]=y.useState({name:"",qty:"",rate:""}),[w,C]=y.useState(!1),[k,L]=y.useState(!1),[A,Z]=y.useState(null),[B,ie]=y.useState(null),[le,be]=y.useState(""),[te,Ze]=y.useState(0),[Le,P]=y.useState(null),[_,D]=y.useState(0);y.useEffect(()=>{E()},[_]);const E=async()=>{try{const T=await ne.get("/manifests"),F=T.data.filter(ke=>ke.status==="DRAFT"),Y=T.data.filter(ke=>ke.status==="ACTIVE"),V=F.sort((ke,ye)=>new Date(ye.createdAt)-new Date(ke.createdAt)),ae=Y.sort((ke,ye)=>new Date(ye.createdAt)-new Date(ke.createdAt)),K=[...V,...ae];if(i(K),e){const ke=K.find(ye=>ye._id===e);ke?(f(e),r(ke)):F.length>0?(f(F[0]._id),r(F[0])):K.length>0&&(f(K[0]._id),r(K[0]))}else F.length>0?(f(F[0]._id),r(F[0])):K.length>0&&(f(K[0]._id),r(K[0]))}catch{z.error("Failed to load manifests")}finally{o(!1)}},b=async()=>{var V,ae;if(!n){z.error("No manifest to save.");return}const T=n.shipments||[],F=T.filter(K=>K.status==="loaded"),Y=T.filter(K=>K.status!=="loaded");if(F.length===0){z.error("No loaded shipments to save. Please load some items first.");return}try{o(!0);const K={truckPlate:n.truckPlate||"",driverName:n.driverName||"",supervisor:n.supervisor||"",manifestDate:n.manifestDate||new Date().toISOString().split("T")[0],status:"ACTIVE",shipments:F.map(ye=>ye._id)},ke=await ne.post("/manifests",K);for(const ye of F)await ne.put(`/shipments/${ye._id}`,{...ye,saved:!0,status:"loaded",manifestId:ke.data._id});Y.length>0?(await ne.put(`/manifests/${n._id}`,{truckPlate:n.truckPlate||"",driverName:n.driverName||"",supervisor:n.supervisor||"",manifestDate:n.manifestDate||new Date().toISOString().split("T")[0],status:"DRAFT",shipments:Y.map(ye=>ye._id)}),z.success(`${F.length} loaded shipment(s) saved successfully!`),z.success(`${Y.length} unloaded shipment(s) remain.`),D(ye=>ye+1)):(await ne.delete(`/manifests/${n._id}`),z.success(`${F.length} loaded shipment(s) saved successfully!`),z.success("All items saved!"),t("/manifest"))}catch(K){console.error("Save error:",K),z.error(((ae=(V=K.response)==null?void 0:V.data)==null?void 0:ae.error)||"Failed to save manifest")}finally{o(!1)}},U=async T=>{var F,Y;if(!T){z.error("Invalid shipment ID");return}if(confirm("Delete this shipment?"))try{await ne.delete(`/shipments/${T}`),z.success("Shipment deleted successfully"),D(V=>V+1)}catch(V){console.error("Delete error:",V),z.error(((Y=(F=V.response)==null?void 0:F.data)==null?void 0:Y.error)||"Failed to delete shipment")}},G=async()=>{var F,Y;if(!n||!n.shipments){z.error("No shipments to clear.");return}const T=n.shipments.filter(V=>V.status!=="loaded");if(T.length===0){z.error("No unloaded shipments to clear.");return}if(confirm(`Delete ${T.length} unloaded shipments?`))try{const V=T.map(K=>ne.delete(`/shipments/${K._id}`));await Promise.all(V);const ae=n.shipments.filter(K=>K.status==="loaded").map(K=>K._id);await ne.put(`/manifests/${n._id}`,{...n,shipments:ae}),z.success(`${T.length} unloaded shipments cleared successfully!`),D(K=>K+1)}catch(V){console.error("Clear unloaded error:",V),z.error(((Y=(F=V.response)==null?void 0:F.data)==null?void 0:Y.error)||"Failed to clear unloaded shipments")}},Q=(T,F,Y)=>{if(!T||!T.items||!T.items[Y]){z.error("Item not found");return}const V=T.items[Y];N(F),d(Y),P(T._id),h({name:V.name||"",qty:V.qty||"",rate:V.rate||""}),x(!0)},ee=()=>{x(null),N(null),d(null),P(null),h({name:"",qty:"",rate:""})},H=async()=>{var V,ae;const{name:T,qty:F,rate:Y}=p;if(!T||!F||!Y){z.error("Please fill all fields");return}try{const K=n.shipments.find(je=>je._id===Le);if(!K){z.error("Shipment not found");return}const ke=parseInt(F),ye=parseFloat(Y),xe=K.items.map((je,It)=>It===S?{...je,name:T,qty:ke,rate:ye,total:ke*ye}:je),Rt=xe.reduce((je,It)=>je+(It.total||0),0);await ne.put(`/shipments/${K._id}`,{...K,items:xe,total:Rt}),z.success("Item updated successfully!"),ee(),D(je=>je+1)}catch(K){console.error("Edit error:",K),z.error(((ae=(V=K.response)==null?void 0:V.data)==null?void 0:ae.error)||"Failed to update item")}},M=(T,F)=>{if(!T||!T.items)return;const Y=T.items.reduce((V,ae)=>V+(ae.qty||0),0);Ze(Y),Z(T),ie(F),be(""),L(!0)},_e=async()=>{var F,Y;if(!A)return;const T=parseInt(le);if(isNaN(T)||T<0){z.error("Please enter a valid quantity");return}if(T>te){z.error(`Cannot load more than ${te} items`);return}if(T===0){z.error("Please enter a quantity greater than 0");return}C(!0);try{const V=A,ae=V.items||[],K=te-T,ke=ae.map(xe=>{const Rt=(xe.qty||0)/te,je=Math.round(T*Rt);return{...xe,qty:je>0?je:0,total:je>0?je*(xe.rate||0):0}}).filter(xe=>xe.qty>0),ye=ae.map(xe=>{const Rt=(xe.qty||0)/te,je=Math.round(T*Rt),It=(xe.qty||0)-je;return{...xe,qty:It>0?It:0,total:It>0?It*(xe.rate||0):0}}).filter(xe=>xe.qty>0);if(await ne.delete(`/shipments/${V._id}`),ke.length>0){const xe={sender:V.sender,customer:V.customer,phone:V.phone,destination:V.destination,items:ke,payment:V.payment,status:"loaded",loadedQty:T,manifestId:n._id,saved:!1,total:ke.reduce((Rt,je)=>Rt+(je.total||0),0)};await ne.post("/shipments",xe)}if(ye.length>0){const xe={sender:V.sender,customer:V.customer,phone:V.phone,destination:V.destination,items:ye,payment:V.payment,status:"not-loaded",loadedQty:0,manifestId:n._id,saved:!1,total:ye.reduce((Rt,je)=>Rt+(je.total||0),0)};await ne.post("/shipments",xe)}z.success(`${T} items loaded. ${K} items remain unloaded.`),L(!1),D(xe=>xe+1)}catch(V){console.error("Error:",V),z.error(((Y=(F=V.response)==null?void 0:F.data)==null?void 0:Y.error)||"Failed to update status")}finally{C(!1)}},De=async(T,F)=>{if(!w){C(!0);try{const Y=F==="paid"?"unpaid":"paid";await ne.put(`/shipments/${T}`,{payment:Y}),z.success(`Shipment marked as ${Y==="paid"?"PAID":"UNPAID"}`),D(V=>V+1)}catch{z.error("Failed to update payment status")}finally{C(!1)}}},re=async()=>{if(!n||!n.shipments||n.shipments.length===0){z.error("No shipments to update.");return}if(confirm("Mark all shipments as LOADED?"))try{const T=n.shipments.map(F=>ne.put(`/shipments/${F._id}`,{...F,status:"loaded"}));await Promise.all(T),z.success("All shipments marked as LOADED!"),D(F=>F+1)}catch{z.error("Failed to update shipments")}},Ae=()=>{t("/manifest")};if(a)return l.jsx("div",{style:{textAlign:"center",padding:"50px"},children:"Loading..."});if(s.length===0)return l.jsxs("div",{className:"manifest-items-page",children:[l.jsx("div",{className:"view-page-header",children:l.jsxs("div",{className:"view-header-left",children:[l.jsx("button",{className:"view-back-btn",onClick:Ae,children:l.jsx("i",{className:"fas fa-arrow-left"})}),l.jsxs("div",{className:"view-header-title",children:[l.jsx("h2",{children:"Manifest Items"}),l.jsx("span",{className:"view-header-subtitle",children:"View, edit or delete items in manifests"})]})]})}),l.jsxs("div",{className:"card",style:{textAlign:"center",padding:"40px"},children:[l.jsx("i",{className:"fas fa-inbox",style:{fontSize:"48px",color:"#a0aec0",display:"block",marginBottom:"12px"}}),l.jsxs("p",{style:{color:"#a0aec0"},children:["No manifests found. ",l.jsx("a",{href:"/manifest",style:{color:"#2b6cb0"},children:"Create your first manifest"})]})]})]});const ge=(n==null?void 0:n.shipments)||[],xt=ge.filter(T=>T.status==="loaded"),ct=ge.filter(T=>T.status!=="loaded"),ve=ge.reduce((T,F)=>{var Y;return T+(((Y=F.items)==null?void 0:Y.reduce((V,ae)=>V+(ae.qty||0),0))||0)},0),q=xt.reduce((T,F)=>{var Y;return T+(((Y=F.items)==null?void 0:Y.reduce((V,ae)=>V+(ae.qty||0),0))||0)},0),ce=ct.reduce((T,F)=>{var Y;return T+(((Y=F.items)==null?void 0:Y.reduce((V,ae)=>V+(ae.qty||0),0))||0)},0),We=ge.reduce((T,F)=>T+(F.total||0),0),dt=T=>T.filter(F=>(F.sender||"").toLowerCase().includes(u.toLowerCase())||(F.customer||"").toLowerCase().includes(u.toLowerCase())||(F.destination||"").toLowerCase().includes(u.toLowerCase())),Vt=dt(xt),Lr=dt(ct),qt=T=>T?new Date(T).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}):"—",Ds=(T,F)=>{const Y=T.items||[],V=T.status==="loaded";return l.jsxs("div",{className:"shipment-card",children:[l.jsxs("div",{className:"customer-header-row",children:[l.jsx("span",{className:"customer-name",children:T.customer||"—"}),l.jsxs("div",{className:"header-action-icons",children:[l.jsx("button",{className:"icon-btn icon-edit",onClick:()=>Q(T,F,0),title:"Edit Item",children:l.jsx("i",{className:"fas fa-edit"})}),l.jsx("button",{className:"icon-btn icon-delete",onClick:()=>U(T._id),title:"Delete Shipment",children:l.jsx("i",{className:"fas fa-trash"})})]})]}),l.jsxs("div",{className:"phone-row",children:[l.jsx("i",{className:"fas fa-phone"})," ",T.phone||"—"]}),l.jsxs("div",{className:"goods-destination-row",children:[l.jsx("i",{className:"fas fa-box"}),l.jsx("span",{className:"goods-item",children:Y.map((ae,K)=>l.jsxs("span",{children:[K>0&&", ",ae.name||"—"]},K))}),l.jsx("span",{className:"arrow",children:"→"}),l.jsx("span",{className:"destination",children:T.destination||"—"})]}),l.jsxs("div",{className:"qra-header",children:[l.jsx("span",{className:"q-label",children:"Q"}),l.jsx("span",{className:"divider",children:"|"}),l.jsx("span",{className:"r-label",children:"R"}),l.jsx("span",{className:"divider",children:"|"}),l.jsx("span",{className:"a-label",children:"A"})]}),Y.map((ae,K)=>l.jsxs("div",{className:`qra-row ${K>0?"extra-qra":""}`,children:[l.jsx("span",{className:"q-value",children:ae.qty||0}),l.jsx("span",{className:"divider",children:"|"}),l.jsx("span",{className:"r-value",children:(ae.rate||0).toLocaleString()}),l.jsx("span",{className:"divider",children:"|"}),l.jsx("span",{className:"a-value",children:(ae.total||0).toLocaleString()})]},K)),l.jsxs("div",{className:"status-buttons-row",children:[l.jsxs("button",{className:`status-btn status-btn-loaded ${V?"active":"inactive"}`,onClick:()=>M(T,F),disabled:w,children:[l.jsx("i",{className:"fas fa-box"}),V?"Loaded":"Load"]}),l.jsxs("button",{className:`status-btn status-btn-paid ${T.payment==="paid"?"active":"inactive"}`,onClick:()=>De(T._id,T.payment),disabled:w,children:[l.jsx("i",{className:"fas fa-money-bill-wave"}),T.payment==="paid"?"Paid":"Unpaid"]})]})]},T._id||F)};return l.jsxs("div",{className:"manifest-items-page",children:[l.jsx("div",{className:"view-page-header",children:l.jsxs("div",{className:"view-header-left",children:[l.jsx("button",{className:"view-back-btn",onClick:Ae,children:l.jsx("i",{className:"fas fa-arrow-left"})}),l.jsxs("div",{className:"view-header-title",children:[l.jsx("h2",{children:"Manifest Items"}),l.jsx("span",{className:"view-header-subtitle",children:"View, edit or delete items in manifests"})]})]})}),l.jsxs("div",{className:"card manifest-details-card",children:[l.jsxs("div",{className:"card-header",children:[l.jsxs("h3",{children:[l.jsx("i",{className:"fas fa-clipboard-list",style:{fontSize:"16px",color:"#4a5568",marginRight:"6px"}}),"Manifest Details"]}),l.jsxs("span",{className:"badge",style:{background:"#e8edf5",color:"#0a1628"},children:[ge.length," Total"]})]}),l.jsxs("div",{className:"form-row",children:[l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"Date"}),l.jsx("input",{type:"text",value:qt(n==null?void 0:n.manifestDate),readOnly:!0,style:{background:"#f7fafc"}})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"Plate Number"}),l.jsx("input",{type:"text",value:(n==null?void 0:n.truckPlate)||"—",readOnly:!0,style:{background:"#f7fafc"}})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"Driver"}),l.jsx("input",{type:"text",value:(n==null?void 0:n.driverName)||"—",readOnly:!0,style:{background:"#f7fafc"}})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"Supervisor"}),l.jsx("input",{type:"text",value:(n==null?void 0:n.supervisor)||"—",readOnly:!0,style:{background:"#f7fafc"}})]})]})]}),l.jsx("div",{className:"card search-card",children:l.jsxs("div",{className:"search-wrapper",style:{position:"relative",width:"100%"},children:[l.jsx("i",{className:"fas fa-search",style:{position:"absolute",left:"14px",top:"50%",transform:"translateY(-50%)",color:"#a0aec0",fontSize:"16px"}}),l.jsx("input",{type:"text",className:"view-search-input",placeholder:"Search customer, sender or destination...",value:u,onChange:T=>c(T.target.value),style:{paddingLeft:"44px",width:"100%",padding:"12px 16px 12px 44px",border:"1.5px solid #e2e8f0",borderRadius:"10px",fontSize:"14px",fontFamily:"Inter, sans-serif",transition:"all 0.3s ease",background:"white"}})]})}),l.jsxs("div",{className:"session-summary-wrapper",children:[l.jsx("div",{className:"view-revenue-wrapper",children:l.jsxs("div",{className:"view-revenue-scroll",children:[l.jsxs("div",{className:"view-revenue-item total",children:[l.jsx("span",{className:"view-revenue-label",children:"Total Records"}),l.jsx("span",{className:"view-revenue-amount",children:ve}),l.jsxs("span",{className:"view-revenue-sub",style:{fontSize:"11px",color:"#718096",display:"block",marginTop:"2px"},children:[q," loaded · ",ce," unloaded"]})]}),l.jsxs("div",{className:"view-revenue-item collected",children:[l.jsx("span",{className:"view-revenue-label",children:"Total Amount"}),l.jsxs("span",{className:"view-revenue-amount",children:["TZS ",We.toLocaleString()]})]})]})}),l.jsxs("div",{className:"action-buttons-row",children:[l.jsxs("button",{onClick:re,className:"btn-mark-loaded",children:[l.jsx("i",{className:"fas fa-check-double"})," Mark All Loaded"]}),l.jsxs("button",{onClick:G,className:"btn-clear-unloaded",children:[l.jsx("i",{className:"fas fa-trash-alt"})," Clear Unloaded"]})]})]}),l.jsxs("div",{className:"card manifest-items-list",children:[l.jsxs("div",{className:"items-cards-container",children:[Vt.map((T,F)=>Ds(T,F)),Lr.map((T,F)=>Ds(T,F+Vt.length)),ge.length===0&&l.jsxs("div",{style:{textAlign:"center",padding:"40px"},children:[l.jsx("i",{className:"fas fa-inbox",style:{fontSize:"48px",color:"#a0aec0",display:"block",marginBottom:"12px"}}),l.jsx("p",{style:{color:"#a0aec0"},children:"No shipments in this manifest"})]})]}),l.jsx("div",{style:{marginTop:"16px",display:"flex",justifyContent:"center"},children:l.jsxs("button",{className:"btn-save-manifest",onClick:b,children:[l.jsx("i",{className:"fas fa-save"})," Save Manifest"]})})]}),k&&A&&l.jsx("div",{className:"modal-overlay",onClick:()=>L(!1),children:l.jsxs("div",{className:"modal-content",onClick:T=>T.stopPropagation(),children:[l.jsxs("div",{className:"modal-header",children:[l.jsxs("h3",{children:[l.jsx("i",{className:"fas fa-box",style:{color:"#4da6ff"}})," Load Quantity"]}),l.jsx("button",{className:"modal-close",onClick:()=>L(!1),children:"×"})]}),l.jsxs("div",{className:"modal-body",children:[l.jsxs("p",{style:{marginBottom:"12px",color:"#4a5568"},children:["Customer: ",l.jsx("strong",{children:A.customer||"—"})]}),l.jsxs("p",{style:{marginBottom:"16px",color:"#4a5568"},children:["Total Items: ",l.jsx("strong",{children:te})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"Quantity Loaded"}),l.jsx("input",{type:"number",value:le,onChange:T=>be(T.target.value),placeholder:`Enter quantity (max ${te})`,min:"0",max:te,style:{width:"100%",padding:"10px 14px",border:"1.5px solid #e2e8f0",borderRadius:"8px",fontSize:"14px"}})]}),le>0&&parseInt(le)<te&&l.jsxs("p",{style:{marginTop:"12px",color:"#e74c3c",fontSize:"13px"},children:[l.jsx("i",{className:"fas fa-info-circle"})," Remaining ",te-parseInt(le)," items will remain unloaded"]})]}),l.jsxs("div",{className:"modal-footer",children:[l.jsx("button",{className:"btn-cancel",onClick:()=>L(!1),children:"Cancel"}),l.jsxs("button",{className:"btn-send",onClick:_e,disabled:!le||parseInt(le)===0,children:[l.jsx("i",{className:"fas fa-check"})," Confirm"]})]})]})}),g&&l.jsx("div",{className:"modal-overlay",onClick:ee,children:l.jsxs("div",{className:"modal-content",onClick:T=>T.stopPropagation(),children:[l.jsxs("div",{className:"modal-header",children:[l.jsxs("h3",{children:[l.jsx("i",{className:"fas fa-edit",style:{color:"#4da6ff"}})," Edit Item"]}),l.jsx("button",{className:"modal-close",onClick:ee,children:"×"})]}),l.jsxs("div",{className:"modal-body",children:[l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"Item Name"}),l.jsx("input",{type:"text",value:p.name,onChange:T=>h({...p,name:T.target.value})})]}),l.jsxs("div",{className:"form-row",style:{gridTemplateColumns:"1fr 1fr"},children:[l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"Quantity"}),l.jsx("input",{type:"number",value:p.qty,onChange:T=>h({...p,qty:T.target.value})})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"Rate (TZS)"}),l.jsx("input",{type:"number",value:p.rate,onChange:T=>h({...p,rate:T.target.value})})]})]})]}),l.jsxs("div",{className:"modal-footer",children:[l.jsx("button",{className:"btn-cancel",onClick:ee,children:"Cancel"}),l.jsxs("button",{className:"btn-send",onClick:H,children:[l.jsx("i",{className:"fas fa-save"})," Save Changes"]})]})]})})]})}function Mx(){const{id:e}=ua(),t=sn(),n=ha(),r=Jp(),[s,i]=y.useState(null),[a,o]=y.useState([]),[u,c]=y.useState(!0),[m,f]=y.useState(""),g=y.useRef();y.useEffect(()=>{j()},[]);const x=P=>P?P.toUpperCase():"",j=async()=>{try{const _=(await ne.get("/manifests")).data.sort((D,E)=>new Date(E.createdAt)-new Date(D.createdAt));if(o(_),e){const D=_.find(E=>E._id===e);D&&i(D)}else _.length>0&&i(_[0])}catch{z.error("Failed to load manifests")}finally{c(!1)}};if(u)return l.jsx("div",{style:{textAlign:"center",padding:"50px"},children:"Loading..."});if(a.length===0)return l.jsxs("div",{className:"view-manifest-page",children:[l.jsx("div",{className:"view-page-header",children:l.jsxs("div",{className:"view-header-left",children:[l.jsx("button",{className:"view-back-btn",onClick:()=>t("/manifest-manager"),children:l.jsx("i",{className:"fas fa-arrow-left"})}),l.jsxs("div",{className:"view-header-title",children:[l.jsx("h2",{children:"View Manifest"}),l.jsx("span",{className:"view-header-subtitle",children:"Complete manifest details with identity and items"})]})]})}),l.jsxs("div",{className:"card",style:{textAlign:"center",padding:"40px"},children:[l.jsx("i",{className:"fas fa-inbox",style:{fontSize:"48px",color:"#a0aec0",display:"block",marginBottom:"12px"}}),l.jsxs("p",{style:{color:"#a0aec0"},children:["No manifests found. ",l.jsx("a",{href:"/manifest-manager",style:{color:"#2b6cb0"},children:"Create your first manifest"})]})]})]});const N=(s==null?void 0:s.shipments)||[],S=N.filter(P=>{var _,D,E,b;return((_=P.customer)==null?void 0:_.toLowerCase().includes(m.toLowerCase()))||((D=P.destination)==null?void 0:D.toLowerCase().includes(m.toLowerCase()))||((E=P.sender)==null?void 0:E.toLowerCase().includes(m.toLowerCase()))||((b=P.items)==null?void 0:b.some(U=>{var G;return(G=U.name)==null?void 0:G.toLowerCase().includes(m.toLowerCase())}))}),d=N.reduce((P,_)=>{var D;return P+((D=_.items)==null?void 0:D.reduce((E,b)=>E+b.qty,0))||0},0),p=N.reduce((P,_)=>P+(_.total||0),0),h=N.filter(P=>P.payment==="paid").reduce((P,_)=>P+(_.total||0),0),w=p-h,C=N.filter(P=>P.phone&&P.phone.trim()!==""),k=()=>{if(N.length===0){z.error("No shipments to print");return}const P=document.title;document.title=" ",window.onafterprint=()=>{document.title=P,window.onafterprint=null},window.print()},L=P=>{const _=window.open("","_blank","width=302,height=600");if(!_){z.error("Please allow popups for this site");return}const D=new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}),E=new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}),b=P.items.map(ee=>`
      <div class="item-row">
        <div class="item-name">${x(ee.name)}</div>
        <div class="item-values">
          <span class="qty">QTY: ${ee.qty}</span>
        </div>
      </div>
    `).join(""),G=r?(ee=>{if(!ee)return'<div class="contact-line">—</div>';const H=ee.split(/[,;\n]/).map(M=>M.trim()).filter(M=>M);return H.length===0?'<div class="contact-line">—</div>':H.map(M=>`<div class="contact-line">${M}</div>`).join("")})(r):'<div class="contact-line">—</div>',Q=`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Receipt</title>
        <style>
          @page { size: 58mm auto; margin: 0; }
          * { margin: 0; padding: 0; box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          html, body { width: 58mm; }
          body {
            font-family: 'Courier New', Consolas, monospace;
            font-size: 14px;
            font-weight: 700;
            color: #000;
            padding: 3mm 3mm;
            line-height: 1.5;
          }
          .center { text-align: center; }
          .right { text-align: right; }
          .company { font-size: 20px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; }
          .subtitle { font-size: 16px; font-weight: 800; text-transform: uppercase; margin-top: 2px; }
          .meta { font-size: 11px; font-weight: 600; color: #333; margin-top: 3px; }
          .divider-eq { margin: 8px 0; font-size: 12px; font-weight: 700; letter-spacing: 1px; white-space: nowrap; overflow: hidden; }
          .divider-dash { border-top: 1.5px dashed #000; margin: 8px 0; }
          .divider-solid { border-top: 2px solid #000; margin: 8px 0; }
          .line { font-size: 14px; font-weight: 700; text-transform: uppercase; padding: 2px 0; word-break: break-word; }

          .items-block { margin-top: 4px; }
          .item-row {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            font-size: 14px;
            font-weight: 700;
            text-transform: uppercase;
            padding: 5px 0;
            border-bottom: 1px dashed #999;
          }
          .item-row:last-child { border-bottom: none; }
          .item-name { flex: 1; padding-right: 8px; }
          .item-values { text-align: right; white-space: nowrap; }
          .item-values .qty { display: block; font-size: 14px; font-weight: 800; }

          .status-line {
            display: flex;
            justify-content: space-between;
            margin: 10px 0 4px;
            font-size: 14px;
            font-weight: 800;
            text-transform: uppercase;
          }
          .status-label {
            font-weight: 800;
          }
          .status-value {
            font-weight: 800;
          }

          .contact-block { margin-top: 4px; }
          .contact-title { font-size: 14px; font-weight: 800; text-transform: uppercase; }
          .contact-line { font-size: 16px; font-weight: 800; padding: 3px 0; }

          .footer { text-align: center; margin-top: 10px; }
          .footer .thanks { font-size: 14px; font-weight: 800; }
          .footer .copy { font-size: 10px; font-weight: 600; color: #444; margin-top: 5px; }
        </style>
      </head>
      <body>
        <div class="center">
          <div class="company">${x(n||"Manifest System")}</div>
          <div class="subtitle">Way Bill</div>
        </div>

        <div class="divider-eq">====================</div>

        <div class="line">Date: ${D}</div>
        <div class="line">Time: ${E}</div>
        <div class="line">Truck: ${x((s==null?void 0:s.truckPlate)||"—")}</div>
        <div class="line">Driver: ${x((s==null?void 0:s.driverName)||"—")}</div>
        <div class="line">Sender: ${x(P.sender)||"—"}</div>

        <div class="divider-dash"></div>

        <div class="line">Customer: ${x(P.customer)||"—"}</div>
        <div class="line">Phone: ${P.phone||"—"}</div>
        <div class="line">Dest: ${x(P.destination)||"—"}</div>

        <div class="divider-dash"></div>

        <div class="items-block">
          ${b}
        </div>

        <!-- Status Line - Left: STATUS, Right: [PAID/UNPAID] -->
        <div class="status-line">
          <span class="status-label">STATUS</span>
          <span class="status-value">[${x(P.payment||"unpaid")}]</span>
        </div>

        <div class="divider-solid"></div>

        <div class="contact-block">
          <div class="contact-title">Kwa Mawasiliano</div>
          <div class="contact-title">Zaidi Tupigie:</div>
          ${G}
        </div>

        <div class="divider-solid"></div>

        <div class="footer">
          <div class="thanks">Thank you for your business!</div>
          <div class="copy">© ${new Date().getFullYear()} ${x(n||"Manifest System")}</div>
        </div>
        <script>
          window.onload = function () {
            window.print();
            window.onafterprint = function () { window.close(); };
          };
        <\/script>
      </body>
      </html>
    `;_.document.write(Q),_.document.close()},A=()=>{var E;if(N.length===0){z.error("No shipments to send messages to.");return}if(C.length===0){z.error("No customer phone numbers found in this manifest.");return}const P=((E=document.getElementById("arrivalMessage"))==null?void 0:E.value)||"Your goods have arrived!",D=`RECIPIENTS:
${C.map(b=>`${b.customer}: ${b.phone}`).join(`
`)}

MESSAGE:
${P}`;navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(D).then(()=>{z.success("Recipients and message copied to clipboard!")}).catch(()=>{Z(D)}):Z(D)},Z=P=>{const _=document.createElement("textarea");_.value=P,document.body.appendChild(_),_.select(),document.execCommand("copy"),document.body.removeChild(_),z.success("Recipients and message copied to clipboard!")},B=P=>new Date(P).toLocaleDateString("en-US",{day:"numeric",month:"short",year:"numeric"}),ie=P=>P==="paid"?"paid":"unpaid",le=P=>P==="paid"?"Paid":"Unpaid",be=P=>P==="loaded"||P==="saved"?"Loaded":"Not Loaded",te=P=>P==="loaded"||P==="saved"?"loaded":"not-loaded",Ze=()=>{t("/manifest-manager")},Le=P=>String(P+1).padStart(3,"0");return l.jsxs("div",{className:"view-manifest-page",ref:g,children:[l.jsx("div",{className:"view-page-header",children:l.jsxs("div",{className:"view-header-left",children:[l.jsx("button",{className:"view-back-btn",onClick:Ze,children:l.jsx("i",{className:"fas fa-arrow-left"})}),l.jsxs("div",{className:"view-header-title",children:[l.jsx("h2",{children:"View Manifest"}),l.jsx("span",{className:"view-header-subtitle",children:"Complete manifest details with identity and items"})]})]})}),s&&l.jsxs("div",{children:[l.jsxs("div",{children:[l.jsx("div",{className:"view-section-title",children:"MANIFEST IDENTITY"}),l.jsxs("div",{className:"view-identity-card",children:[l.jsxs("div",{className:"view-identity-row",children:[l.jsx("div",{className:"view-identity-item",children:l.jsxs("span",{className:"view-identity-label truck-plate-label",children:[l.jsx("i",{className:"fas fa-truck",style:{color:"#718096",fontSize:"16px",marginRight:"8px"}}),(s==null?void 0:s.truckPlate)||"No Plate"]})}),l.jsxs("div",{className:"view-identity-item",children:[l.jsx("span",{className:"view-identity-label",children:"DATE"}),l.jsx("span",{className:"view-identity-value",children:B((s==null?void 0:s.manifestDate)||(s==null?void 0:s.createdAt))})]})]}),l.jsxs("div",{className:"view-identity-row",children:[l.jsxs("div",{className:"view-identity-item driver-name-item",children:[l.jsxs("span",{className:"view-identity-label driver-name-label",children:[l.jsx("i",{className:"fas fa-user",style:{color:"#718096",fontSize:"11px",marginRight:"6px"}}),"DRIVER"]}),l.jsx("span",{className:"view-identity-value driver-name-value",children:(s==null?void 0:s.driverName)||"—"})]}),l.jsxs("div",{className:"view-identity-item",children:[l.jsx("span",{className:"view-identity-label",children:"PERSON IN CHARGE"}),l.jsx("span",{className:"view-identity-value",children:(s==null?void 0:s.supervisor)||"—"})]})]})]}),l.jsx("div",{className:"view-section-title",children:"FREIGHT REVENUE"}),l.jsx("div",{className:"view-revenue-wrapper",children:l.jsxs("div",{className:"view-revenue-scroll",children:[l.jsxs("div",{className:"view-revenue-item total",children:[l.jsx("span",{className:"view-revenue-label",children:"Total Amount"}),l.jsxs("span",{className:"view-revenue-amount",children:["TZS ",p.toLocaleString()]}),l.jsxs("span",{className:"view-revenue-sub",children:[d," Items"]})]}),l.jsxs("div",{className:"view-revenue-item collected",children:[l.jsx("span",{className:"view-revenue-label",children:"Collected"}),l.jsxs("span",{className:"view-revenue-amount",children:["TZS ",h.toLocaleString()]})]}),l.jsxs("div",{className:"view-revenue-item outstanding",children:[l.jsx("span",{className:"view-revenue-label",children:"Outstanding"}),l.jsxs("span",{className:"view-revenue-amount",children:["TZS ",w.toLocaleString()]})]})]})}),l.jsxs("div",{className:"view-items-section-header",children:[l.jsx("span",{className:"view-section-title",style:{marginBottom:"0"},children:"MANIFEST ITEMS"}),l.jsxs("span",{className:"view-items-total",children:[d," Total"]})]}),l.jsxs("div",{className:"view-items-card",children:[l.jsxs("div",{className:"view-search-wrapper",children:[l.jsx("i",{className:"fas fa-search view-search-icon"}),l.jsx("input",{type:"text",className:"view-search-input",placeholder:"Search customer, goods, destination...",value:m,onChange:P=>f(P.target.value)})]}),l.jsx("div",{className:"view-items-table-wrapper",children:l.jsxs("table",{className:"view-items-table",children:[l.jsx("thead",{children:l.jsxs("tr",{children:[l.jsx("th",{className:"col-row",children:"#"}),l.jsx("th",{className:"col-customer",children:"Customer"}),l.jsx("th",{className:"col-phone",children:"Phone"}),l.jsx("th",{className:"col-goods",children:"Goods"}),l.jsx("th",{className:"col-qty",children:"Qty"}),l.jsx("th",{className:"col-destination",children:"Destination"}),l.jsxs("th",{className:"col-rate",children:["Rate ",l.jsx("span",{className:"currency-header",children:"(TZS)"})]}),l.jsxs("th",{className:"col-amount",children:["Amount ",l.jsx("span",{className:"currency-header",children:"(TZS)"})]}),l.jsx("th",{className:"col-payment",children:"Payment"}),l.jsx("th",{className:"col-status",children:"Status"}),l.jsx("th",{className:"col-actions",children:"Actions"})]})}),l.jsx("tbody",{children:S.length===0?l.jsx("tr",{children:l.jsx("td",{colSpan:"11",style:{textAlign:"center",padding:"40px",color:"#a0aec0"},children:"No shipments found"})}):S.map((P,_)=>{var U,G;const D=P.items||[],E=D.reduce((Q,ee)=>Q+(ee.qty||0),0),b=D.length>0&&((U=D[0])==null?void 0:U.rate)||0;return l.jsxs("tr",{children:[l.jsx("td",{className:"col-row",children:Le(_)}),l.jsx("td",{className:"col-customer",children:P.customer}),l.jsx("td",{className:"col-phone",children:P.phone||"—"}),l.jsx("td",{className:"col-goods",children:l.jsx("div",{className:"goods-list",children:D.length>0?D.map((Q,ee)=>l.jsx("div",{className:"goods-item",children:Q.name},ee)):l.jsx("span",{style:{color:"#a0aec0"},children:"—"})})}),l.jsx("td",{className:"col-qty",children:E}),l.jsx("td",{className:"col-destination",children:P.destination||"—"}),l.jsx("td",{className:"col-rate",children:b.toLocaleString()}),l.jsx("td",{className:"col-amount",children:((G=P.total)==null?void 0:G.toLocaleString())||0}),l.jsx("td",{className:"col-payment",children:l.jsx("span",{className:`payment-badge ${ie(P.payment)}`,children:le(P.payment)})}),l.jsx("td",{className:"col-status",children:l.jsx("span",{className:`status-badge ${te(P.status)}`,children:be(P.status)})}),l.jsx("td",{className:"col-actions",children:l.jsx("button",{className:"action-btn btn-delete",onClick:()=>{window.confirm(`Are you sure you want to delete ${P.customer}?`)&&z.success(`Deleted ${P.customer}`)},title:"Delete",children:l.jsx("i",{className:"fas fa-trash"})})})]},P._id||_)})})]})}),l.jsx("div",{className:"view-items-list",children:S.length===0?l.jsx("div",{className:"view-empty-state",children:"No shipments found"}):S.map((P,_)=>{var b,U,G;const D=((b=P.items)==null?void 0:b.length)||0,E=((U=P.items)==null?void 0:U.map(Q=>Q.name).join(", "))||"";return l.jsxs("div",{className:"view-item-card",children:[l.jsxs("div",{className:"view-item-top-row",children:[l.jsxs("div",{className:"view-customer-left",children:[l.jsx("span",{className:"view-item-label",children:"CUSTOMER"}),l.jsx("span",{className:"view-customer-name",children:P.customer})]}),l.jsxs("div",{className:"view-item-actions",children:[l.jsx("span",{className:`view-payment-badge ${ie(P.payment)}`,children:le(P.payment)}),l.jsx("button",{className:"view-item-print",onClick:()=>L(P),title:"Print Receipt",children:l.jsx("i",{className:"fas fa-print"})})]})]}),l.jsxs("div",{className:"view-item-row",children:[l.jsx("span",{className:"view-item-label",children:"SENDER"}),l.jsx("span",{className:"sender-value",children:P.sender||"—"})]}),l.jsxs("div",{className:"view-item-goods-row",children:[l.jsxs("div",{className:"view-item-goods-left",children:[l.jsx("span",{className:"view-item-label",children:"GOODS"}),l.jsxs("span",{className:"goods-value",children:[D," • ",E," ",P.destination?`→ ${P.destination}`:""]})]}),l.jsxs("span",{className:"view-item-amount",children:["TZS ",((G=P.total)==null?void 0:G.toLocaleString())||0]})]}),l.jsxs("div",{className:"view-item-status-row",style:{marginTop:"6px",paddingTop:"6px",borderTop:"1px solid #e8ecf0"},children:[l.jsx("span",{className:"view-item-label",children:"STATUS"}),l.jsx("span",{className:`view-status-badge ${te(P.status)}`,children:be(P.status)})]})]},P._id||_)})})]}),l.jsxs("div",{className:"view-action-buttons",children:[l.jsxs("button",{className:"view-btn view-btn-print",onClick:k,children:[l.jsx("i",{className:"fas fa-print"})," Print A4"]}),l.jsxs("button",{className:"view-btn view-btn-sms",onClick:A,children:[l.jsx("i",{className:"fas fa-sms"})," Arrival SMS"]}),l.jsxs("button",{className:"view-btn view-btn-hesabu",children:[l.jsx("i",{className:"fas fa-calculator"})," Hesabu"]})]})]}),l.jsxs("div",{className:"print-content",style:{display:"none"},children:[l.jsx("div",{className:"print-title",children:n||"Manifest System"}),l.jsxs("div",{className:"print-subtitle",children:[s==null?void 0:s.truckPlate," | ",B((s==null?void 0:s.manifestDate)||(s==null?void 0:s.createdAt))]}),l.jsxs("div",{className:"view-identity-card",children:[l.jsxs("div",{className:"view-identity-row",children:[l.jsx("div",{className:"view-identity-item",children:l.jsxs("span",{className:"view-identity-label truck-plate-label",children:[l.jsx("i",{className:"fas fa-truck",style:{color:"#718096",fontSize:"16px",marginRight:"8px"}}),(s==null?void 0:s.truckPlate)||"No Plate"]})}),l.jsxs("div",{className:"view-identity-item",children:[l.jsx("span",{className:"view-identity-label",children:"DATE"}),l.jsx("span",{className:"view-identity-value",children:B((s==null?void 0:s.manifestDate)||(s==null?void 0:s.createdAt))})]})]}),l.jsxs("div",{className:"view-identity-row",children:[l.jsxs("div",{className:"view-identity-item driver-name-item",children:[l.jsxs("span",{className:"view-identity-label driver-name-label",children:[l.jsx("i",{className:"fas fa-user",style:{color:"#718096",fontSize:"11px",marginRight:"6px"}}),"DRIVER"]}),l.jsx("span",{className:"view-identity-value driver-name-value",children:(s==null?void 0:s.driverName)||"—"})]}),l.jsxs("div",{className:"view-identity-item",children:[l.jsx("span",{className:"view-identity-label",children:"PERSON IN CHARGE"}),l.jsx("span",{className:"view-identity-value",children:(s==null?void 0:s.supervisor)||"—"})]})]})]}),l.jsx("div",{className:"print-table-title",children:"MANIFEST ITEMS"}),l.jsx("div",{className:"view-items-table-wrapper",children:l.jsxs("table",{className:"view-items-table",children:[l.jsx("thead",{children:l.jsxs("tr",{children:[l.jsx("th",{className:"col-row",children:"#"}),l.jsx("th",{className:"col-customer",children:"CUSTOMER"}),l.jsx("th",{className:"col-phone",children:"PHONE"}),l.jsx("th",{className:"col-goods",children:"GOODS"}),l.jsx("th",{className:"col-qty",children:"QTY"}),l.jsx("th",{className:"col-destination",children:"DESTINATION"}),l.jsx("th",{className:"col-rate",children:"RATE (TZS)"}),l.jsx("th",{className:"col-amount",children:"AMOUNT (TZS)"}),l.jsx("th",{className:"col-payment",children:"PAYMENT"}),l.jsx("th",{className:"col-status",children:"STATUS"})]})}),l.jsx("tbody",{children:S.map((P,_)=>{var ee,H,M,_e;const D=P.items||[],E=D.reduce((De,re)=>De+(re.qty||0),0),b=D.length>0&&((ee=D[0])==null?void 0:ee.rate)||0,U=((H=P.customer)==null?void 0:H.toUpperCase())||"—",G=P.phone||"—",Q=((M=P.destination)==null?void 0:M.toUpperCase())||"—";return l.jsxs("tr",{children:[l.jsx("td",{className:"col-row",children:Le(_)}),l.jsx("td",{className:"col-customer",children:U}),l.jsx("td",{className:"col-phone",children:G}),l.jsx("td",{className:"col-goods",children:l.jsx("div",{className:"goods-list",children:D.length>0?D.map((De,re)=>{var Ae;return l.jsx("div",{className:"goods-item",children:((Ae=De.name)==null?void 0:Ae.toUpperCase())||""},re)}):l.jsx("span",{style:{color:"#a0aec0"},children:"—"})})}),l.jsx("td",{className:"col-qty",children:E}),l.jsx("td",{className:"col-destination",children:Q}),l.jsx("td",{className:"col-rate",children:b.toLocaleString()}),l.jsx("td",{className:"col-amount",children:((_e=P.total)==null?void 0:_e.toLocaleString())||0}),l.jsx("td",{className:"col-payment",children:l.jsx("span",{className:`payment-badge ${ie(P.payment)}`,children:le(P.payment).toUpperCase()})}),l.jsx("td",{className:"col-status",children:l.jsx("span",{className:`status-badge ${te(P.status)}`,children:be(P.status).toUpperCase()})})]},P._id||_)})})]})}),l.jsx("div",{className:"print-revenue-summary",children:l.jsxs("table",{className:"revenue-summary-table",children:[l.jsx("thead",{children:l.jsx("tr",{children:l.jsx("th",{colSpan:"2",children:"REVENUE SUMMARY"})})}),l.jsxs("tbody",{children:[l.jsxs("tr",{children:[l.jsx("td",{children:"Total Items:"}),l.jsx("td",{className:"revenue-value",children:d})]}),l.jsxs("tr",{className:"total-amount",children:[l.jsx("td",{children:"Total Amount:"}),l.jsxs("td",{className:"revenue-value",children:["TZS ",p.toLocaleString()]})]}),l.jsxs("tr",{className:"collected-amount",children:[l.jsx("td",{children:"Collected:"}),l.jsxs("td",{className:"revenue-value",children:["TZS ",h.toLocaleString()]})]}),l.jsxs("tr",{className:"outstanding-amount",children:[l.jsx("td",{children:"Outstanding:"}),l.jsxs("td",{className:"revenue-value",children:["TZS ",w.toLocaleString()]})]}),l.jsxs("tr",{className:"total-revenue",children:[l.jsx("td",{children:"Total Revenue:"}),l.jsxs("td",{className:"revenue-value",children:["TZS ",p.toLocaleString()]})]})]})]})})]})]}),l.jsx("style",{children:`
        /* ===== PRINT STYLES ===== */
        @media print {
          @page {
            margin: 0;
          }

          body * {
            visibility: hidden !important;
          }

          .print-content,
          .print-content * {
            visibility: visible !important;
          }

          .print-content {
            display: block !important;
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            padding: 20px 30px !important;
            background: white !important;
            visibility: visible !important;
          }

          .print-title {
            text-align: center !important;
            font-size: 18px !important;
            font-weight: 700 !important;
            letter-spacing: 0.5px !important;
            text-transform: uppercase !important;
            color: #0a1628 !important;
            margin-bottom: 4px !important;
          }

          .print-subtitle {
            text-align: center !important;
            font-size: 12px !important;
            color: #718096 !important;
            margin-bottom: 15px !important;
          }

          .view-identity-card {
            border: 1px solid #e2e8f0 !important;
            box-shadow: none !important;
            page-break-inside: avoid !important;
            margin-bottom: 12px !important;
            display: block !important;
            background: white !important;
            padding: 12px 16px !important;
            border-radius: 4px !important;
            width: 100% !important;
          }

          .view-identity-row {
            display: flex !important;
            justify-content: space-between !important;
            padding: 4px 0 !important;
          }

          .view-identity-item {
            display: flex !important;
            flex-direction: column !important;
          }

          .view-identity-label {
            font-size: 9px !important;
            font-weight: 600 !important;
            color: #718096 !important;
            text-transform: uppercase !important;
            letter-spacing: 0.5px !important;
          }

          .view-identity-value {
            font-size: 14px !important;
            font-weight: 700 !important;
            color: #0a1628 !important;
          }

          .truck-plate-label {
            font-size: 16px !important;
            font-weight: 600 !important;
            color: #0a1628 !important;
            text-transform: none !important;
          }

          .driver-name-label {
            font-size: 9px !important;
            font-weight: 600 !important;
            color: #718096 !important;
            text-transform: uppercase !important;
          }

          .driver-name-value {
            font-size: 14px !important;
            font-weight: 700 !important;
            color: #0a1628 !important;
          }

          .print-table-title {
            font-size: 14px !important;
            font-weight: 700 !important;
            margin: 12px 0 8px 0 !important;
            color: #0a1628 !important;
            letter-spacing: 1px !important;
            text-transform: uppercase !important;
          }

          .view-items-table-wrapper {
            display: block !important;
            overflow: visible !important;
            width: 100% !important;
          }

          .view-items-table {
            width: 100% !important;
            border-collapse: collapse !important;
            font-size: 10px !important;
          }

          .view-items-table th {
            background: #1a2a4a !important;
            color: white !important;
            padding: 6px 8px !important;
            font-size: 9px !important;
            border: 1px solid #2d3748 !important;
            text-transform: uppercase !important;
            letter-spacing: 0.5px !important;
            font-weight: 700 !important;
            text-align: left !important;
          }

          .view-items-table td {
            padding: 5px 8px !important;
            font-size: 10px !important;
            border: 1px solid #e2e8f0 !important;
            text-transform: uppercase !important;
            vertical-align: middle !important;
          }

          .view-items-table tbody tr:nth-child(even) {
            background: #f7fafc !important;
          }

          .col-row {
            text-align: center !important;
            width: 30px !important;
          }

          .col-customer {
            min-width: 80px !important;
          }

          .col-phone {
            min-width: 80px !important;
          }

          .col-goods {
            min-width: 100px !important;
          }

          .col-qty {
            text-align: center !important;
            width: 40px !important;
          }

          .col-destination {
            min-width: 80px !important;
          }

          .col-rate {
            text-align: right !important;
            width: 80px !important;
          }

          .col-amount {
            text-align: right !important;
            width: 100px !important;
          }

          .col-payment {
            text-align: center !important;
            width: 70px !important;
          }

          .col-status {
            text-align: center !important;
            width: 70px !important;
          }

          .payment-badge {
            padding: 2px 10px !important;
            border-radius: 20px !important;
            font-size: 8px !important;
            font-weight: 700 !important;
            display: inline-block !important;
            text-transform: uppercase !important;
            min-width: 40px !important;
            text-align: center !important;
          }

          .payment-badge.paid {
            background: #d4edda !important;
            color: #155724 !important;
          }

          .payment-badge.unpaid {
            background: #f8d7da !important;
            color: #721c24 !important;
          }

          .status-badge {
            padding: 2px 10px !important;
            border-radius: 20px !important;
            font-size: 8px !important;
            font-weight: 700 !important;
            display: inline-block !important;
            text-transform: uppercase !important;
            min-width: 50px !important;
            text-align: center !important;
          }

          .status-badge.loaded {
            background: #d1ecf1 !important;
            color: #0c5460 !important;
          }

          .status-badge.not-loaded {
            background: #e2e8f0 !important;
            color: #4a5568 !important;
          }

          .goods-list {
            display: flex !important;
            flex-direction: column !important;
            gap: 1px !important;
          }

          .goods-item {
            font-size: 9px !important;
          }

          /* ===== REVENUE SUMMARY TABLE - Same width as main table ===== */
          .print-revenue-summary {
            display: block !important;
            margin: 12px 0 !important;
            width: 100% !important;
          }

          .revenue-summary-table {
            width: 100% !important;
            border-collapse: collapse !important;
            font-size: 10px !important;
          }

          .revenue-summary-table th {
            background: #1a2a4a !important;
            color: white !important;
            padding: 6px 8px !important;
            font-size: 9px !important;
            border: 1px solid #2d3748 !important;
            text-transform: uppercase !important;
            letter-spacing: 0.5px !important;
            font-weight: 700 !important;
            text-align: left !important;
          }

          .revenue-summary-table td {
            padding: 5px 8px !important;
            font-size: 10px !important;
            border: 1px solid #e2e8f0 !important;
            vertical-align: middle !important;
          }

          .revenue-summary-table tbody tr:nth-child(even) {
            background: #f7fafc !important;
          }

          .revenue-summary-table .revenue-value {
            text-align: right !important;
            font-weight: 600 !important;
          }

          .revenue-summary-table .total-amount td {
            color: #0a1628 !important;
            font-weight: 600 !important;
          }

          .revenue-summary-table .collected-amount td {
            color: #2ecc71 !important;
            font-weight: 600 !important;
          }

          .revenue-summary-table .outstanding-amount td {
            color: #e74c3c !important;
            font-weight: 600 !important;
          }

          .revenue-summary-table .total-revenue td {
            font-weight: 700 !important;
            border-top: 2px solid #0a1628 !important;
            color: #0a1628 !important;
            font-size: 11px !important;
          }
        }

        /* ===== MOBILE FREIGHT REVENUE - SWIPE ROW ===== */
        @media (max-width: 768px) {
          .view-revenue-scroll {
            display: flex !important;
            flex-direction: row !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            gap: 10px !important;
            -webkit-overflow-scrolling: touch !important;
            scrollbar-width: none !important;
          }

          .view-revenue-scroll::-webkit-scrollbar {
            display: none !important;
          }

          .view-revenue-item {
            flex: 0 0 calc(50% - 5px) !important;
            scroll-snap-align: start !important;
          }
        }
      `})]})}function Ux(){const{id:e}=ua(),t=sn(),[n,r]=y.useState(!0),[s,i]=y.useState(!1),[a,o]=y.useState(null),[u,c]=y.useState(""),[m,f]=y.useState(""),[g,x]=y.useState(""),[j,N]=y.useState(""),[S,d]=y.useState([]),[p,h]=y.useState(null),[w,C]=y.useState(!1),[k,L]=y.useState({sender:"",customer:"",phone:"",destination:"",items:[{name:"",qty:"",rate:""}],payment:!1,status:!1});y.useEffect(()=>{if(!e){z.error("Invalid manifest ID"),t("/manifest-manager");return}A()},[e,t]);const A=async()=>{try{const b=(await ne.get(`/manifests/${e}`)).data;o(b),c(b.truckPlate||""),f(b.driverName||""),x(b.supervisor||""),N(b.manifestDate?new Date(b.manifestDate).toISOString().split("T")[0]:""),d(b.shipments||[])}catch{z.error("Failed to load manifest"),t("/manifest-manager")}finally{r(!1)}},Z=async()=>{var E,b;if(!u.trim()){z.error("Please enter a truck plate number");return}i(!0);try{await ne.put(`/manifests/${e}`,{truckPlate:u.toUpperCase(),driverName:m.toUpperCase(),supervisor:g.toUpperCase(),manifestDate:j,status:"ACTIVE"}),z.success("Manifest updated successfully!"),t(`/view-manifest/${e}`)}catch(U){z.error(((b=(E=U.response)==null?void 0:E.data)==null?void 0:b.error)||"Failed to update manifest")}finally{i(!1)}},B=async()=>{var _e,De;const E=k.sender||"",b=k.customer||"",U=k.phone||"",G=k.destination||"",Q=k.items||[],ee=k.payment||!1,H=k.status||!1;if(!E.trim()||!b.trim()||!G.trim()){z.error("Please fill in Sender, Customer, and Destination");return}const M=Q.filter(re=>re.name&&re.name.trim()&&re.qty&&re.rate);if(M.length===0){z.error("Please add at least one valid item");return}try{const re=M.map(ve=>({name:ve.name.toUpperCase().trim(),qty:parseInt(ve.qty),rate:parseFloat(ve.rate),total:parseInt(ve.qty)*parseFloat(ve.rate)})),Ae=re.reduce((ve,q)=>ve+q.total,0),ge={sender:E.toUpperCase().trim(),customer:b.toUpperCase().trim(),phone:U||"",destination:G.toUpperCase().trim(),items:re,payment:ee?"paid":"unpaid",status:H?"loaded":"not-loaded",manifestId:e,total:Ae},xt=await ne.post("/shipments",ge),ct={...xt.data,total:xt.data.total||Ae};d([...S,ct]),C(!1),L({sender:"",customer:"",phone:"",destination:"",items:[{name:"",qty:"",rate:""}],payment:!1,status:!1}),z.success("Shipment added successfully!"),A()}catch(re){console.error("Add shipment error:",re),z.error(((De=(_e=re.response)==null?void 0:_e.data)==null?void 0:De.error)||"Failed to add shipment")}},ie=async(E,b)=>{if(confirm("Delete this shipment?"))try{await ne.delete(`/shipments/${E}`);const U=S.filter((G,Q)=>Q!==b);d(U),z.success("Shipment deleted successfully"),A()}catch{z.error("Failed to delete shipment")}},le=E=>{h(E);const b=S[E];L({sender:b.sender||"",customer:b.customer||"",phone:b.phone||"",destination:b.destination||"",items:b.items?b.items.map(U=>({name:U.name||"",qty:U.qty||"",rate:U.rate||""})):[{name:"",qty:"",rate:""}],payment:b.payment==="paid",status:b.status==="loaded"}),C(!0)},be=async()=>{var _e,De;const E=k.sender||"",b=k.customer||"",U=k.phone||"",G=k.destination||"",Q=k.items||[],ee=k.payment||!1,H=k.status||!1;if(!E.trim()||!b.trim()||!G.trim()){z.error("Please fill in Sender, Customer, and Destination");return}const M=Q.filter(re=>re.name&&re.name.trim()&&re.qty&&re.rate);if(M.length===0){z.error("Please add at least one valid item");return}try{const re=S[p],Ae=M.map(ce=>({name:ce.name.toUpperCase().trim(),qty:parseInt(ce.qty),rate:parseFloat(ce.rate),total:parseInt(ce.qty)*parseFloat(ce.rate)})),ge=Ae.reduce((ce,We)=>ce+We.total,0),xt={sender:E.toUpperCase().trim(),customer:b.toUpperCase().trim(),phone:U||"",destination:G.toUpperCase().trim(),items:Ae,payment:ee?"paid":"unpaid",status:H?"loaded":"not-loaded",total:ge},ct=await ne.put(`/shipments/${re._id}`,xt),ve={...ct.data,_id:re._id,total:ct.data.total||ge},q=S.map((ce,We)=>We===p?ve:ce);d(q),C(!1),h(null),L({sender:"",customer:"",phone:"",destination:"",items:[{name:"",qty:"",rate:""}],payment:!1,status:!1}),z.success("Shipment updated successfully!"),A()}catch(re){console.error("Update shipment error:",re),z.error(((De=(_e=re.response)==null?void 0:_e.data)==null?void 0:De.error)||"Failed to update shipment")}},te=()=>{L({...k,items:[...k.items,{name:"",qty:"",rate:""}]})},Ze=E=>{if(k.items.length===1){z.error("You need at least one item");return}const b=k.items.filter((U,G)=>G!==E);L({...k,items:b})},Le=(E,b,U)=>{const G=k.items.map((Q,ee)=>{if(ee===E){const H={...Q,[b]:U};if(b==="qty"||b==="rate"){const M=parseFloat(H.qty)||0,_e=parseFloat(H.rate)||0;H.total=M*_e}return H}return Q});L({...k,items:G})},P=E=>E?E.toUpperCase():"",_=()=>{L({...k,payment:!k.payment})},D=()=>{L({...k,status:!k.status})};return e?n?l.jsx("div",{style:{textAlign:"center",padding:"50px"},children:"Loading..."}):l.jsxs("div",{className:"edit-manifest-page",children:[l.jsxs("div",{className:"view-page-header",children:[l.jsxs("div",{className:"view-header-left",children:[l.jsx("button",{className:"view-back-btn",onClick:()=>t("/manifest-manager"),children:l.jsx("i",{className:"fas fa-arrow-left"})}),l.jsxs("div",{className:"view-header-title",children:[l.jsx("h2",{children:"Edit Manifest"}),l.jsx("span",{className:"view-header-subtitle",children:"Modify manifest details and manage shipments"})]})]}),l.jsx("div",{className:"header-right desktop-only",children:l.jsxs("button",{className:"btn-update",onClick:Z,disabled:s,children:[l.jsx("i",{className:"fas fa-save"})," ",s?"Updating...":"Update Manifest"]})})]}),l.jsxs("div",{className:"card",children:[l.jsx("div",{className:"card-header",children:l.jsxs("h3",{children:[l.jsx("i",{className:"fas fa-clipboard-list"})," Manifest Details"]})}),l.jsxs("div",{className:"form-row",children:[l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"Date"}),l.jsx("input",{type:"date",value:j,onChange:E=>N(E.target.value)})]}),l.jsxs("div",{className:"form-group",children:[l.jsxs("label",{children:["Truck Plate ",l.jsx("span",{className:"required",children:"*"})]}),l.jsx("input",{type:"text",value:u,onChange:E=>c(P(E.target.value)),placeholder:"T 123 ABC"})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"Driver Name"}),l.jsx("input",{type:"text",value:m,onChange:E=>f(P(E.target.value)),placeholder:"Enter driver name"})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"Supervisor"}),l.jsx("input",{type:"text",value:g,onChange:E=>x(P(E.target.value)),placeholder:"Enter supervisor name"})]})]})]}),l.jsxs("div",{className:"card",children:[l.jsxs("div",{className:"card-header",children:[l.jsx("h3",{className:"shipments-title",children:"Shipments"}),l.jsx("div",{className:"card-actions",children:l.jsx("span",{className:"badge",children:S.length})})]}),S.length===0?l.jsxs("div",{className:"empty-state",children:[l.jsx("i",{className:"fas fa-inbox"}),l.jsx("p",{children:"No shipments yet."})]}):l.jsx("div",{className:"shipments-list",children:S.map((E,b)=>{var U,G;return l.jsxs("div",{className:"shipment-item",children:[l.jsxs("div",{className:"shipment-header",children:[l.jsxs("div",{className:"shipment-customer",children:[l.jsx("span",{className:"customer-name",children:E.customer||"—"}),l.jsxs("div",{className:"shipment-status",children:[l.jsxs("span",{className:`status-badge ${E.status==="loaded"?"loaded":"not-loaded"}`,children:[l.jsx("i",{className:`fas ${E.status==="loaded"?"fa-check-circle":"fa-clock"}`}),E.status==="loaded"?"Loaded":"Not Loaded"]}),l.jsxs("span",{className:`payment-badge ${E.payment==="paid"?"paid":"unpaid"}`,children:[l.jsx("i",{className:`fas ${E.payment==="paid"?"fa-check-circle":"fa-times-circle"}`}),E.payment==="paid"?"Paid":"Unpaid"]})]})]}),l.jsxs("div",{className:"shipment-actions",children:[l.jsx("button",{className:"icon-btn edit-btn",onClick:()=>le(b),title:"Edit Shipment",children:l.jsx("i",{className:"fas fa-edit"})}),l.jsx("button",{className:"icon-btn delete-btn",onClick:()=>ie(E._id,b),title:"Delete Shipment",children:l.jsx("i",{className:"fas fa-trash"})})]})]}),l.jsxs("div",{className:"shipment-details",children:[l.jsxs("div",{className:"detail-row",children:[l.jsx("span",{className:"label",children:"Sender:"}),l.jsx("span",{className:"value",children:E.sender||"—"})]}),l.jsxs("div",{className:"detail-row",children:[l.jsx("span",{className:"label",children:"Phone:"}),l.jsx("span",{className:"value",children:E.phone||"—"})]}),l.jsxs("div",{className:"detail-row",children:[l.jsx("span",{className:"label",children:"Destination:"}),l.jsx("span",{className:"value",children:E.destination||"—"})]}),l.jsxs("div",{className:"detail-row",children:[l.jsx("span",{className:"label",children:"Items:"}),l.jsx("span",{className:"value",children:((U=E.items)==null?void 0:U.map((Q,ee)=>l.jsxs("span",{children:[ee>0&&", ",Q.name," (",Q.qty," × ",Q.rate,")"]},ee)))||"—"})]}),l.jsxs("div",{className:"detail-row total-row",children:[l.jsx("span",{className:"label",children:"Total:"}),l.jsxs("span",{className:"value",children:["TZS ",((G=E.total)==null?void 0:G.toLocaleString())||0]})]})]})]},E._id||b)})})]}),l.jsx("div",{className:"mobile-update-btn mobile-only",children:l.jsxs("button",{className:"btn-update-full",onClick:Z,disabled:s,children:[l.jsx("i",{className:"fas fa-save"})," ",s?"Updating...":"Update Manifest"]})}),w&&l.jsx("div",{className:"modal-overlay",onClick:()=>{C(!1),h(null)},children:l.jsxs("div",{className:"modal-content",onClick:E=>E.stopPropagation(),children:[l.jsxs("div",{className:"modal-header",children:[l.jsxs("h3",{children:[l.jsx("i",{className:"fas fa-box",style:{color:"#4da6ff"}}),p!==null?"Edit Shipment":"Add Shipment"]}),l.jsx("button",{className:"modal-close",onClick:()=>{C(!1),h(null)},children:l.jsx("i",{className:"fas fa-times"})})]}),l.jsxs("div",{className:"modal-body",children:[l.jsxs("div",{className:"form-row",children:[l.jsxs("div",{className:"form-group",children:[l.jsxs("label",{children:["Sender ",l.jsx("span",{className:"required",children:"*"})]}),l.jsx("input",{type:"text",value:k.sender,onChange:E=>L({...k,sender:P(E.target.value)}),placeholder:"Enter sender name"})]}),l.jsxs("div",{className:"form-group",children:[l.jsxs("label",{children:["Customer ",l.jsx("span",{className:"required",children:"*"})]}),l.jsx("input",{type:"text",value:k.customer,onChange:E=>L({...k,customer:P(E.target.value)}),placeholder:"Enter customer name"})]})]}),l.jsxs("div",{className:"form-row",children:[l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"Phone"}),l.jsx("input",{type:"text",value:k.phone,onChange:E=>L({...k,phone:E.target.value}),placeholder:"255 7XX 000 000"})]}),l.jsxs("div",{className:"form-group",children:[l.jsxs("label",{children:["Destination ",l.jsx("span",{className:"required",children:"*"})]}),l.jsx("input",{type:"text",value:k.destination,onChange:E=>L({...k,destination:P(E.target.value)}),placeholder:"Enter destination"})]})]}),l.jsxs("div",{className:"toggle-group",children:[l.jsx("div",{className:"toggle-item",children:l.jsxs("div",{className:"toggle-label-wrapper",children:[l.jsx("span",{className:"toggle-status-label",children:"Payment Status"}),l.jsxs("div",{className:`toggle-switch ${k.payment?"active":""}`,onClick:_,children:[l.jsx("span",{className:"toggle-track",children:l.jsx("span",{className:"toggle-thumb"})}),l.jsx("span",{className:"toggle-label-text",children:k.payment?"Paid":"Unpaid"})]})]})}),l.jsx("div",{className:"toggle-item",children:l.jsxs("div",{className:"toggle-label-wrapper",children:[l.jsx("span",{className:"toggle-status-label",children:"Loaded Status"}),l.jsxs("div",{className:`toggle-switch ${k.status?"active":""}`,onClick:D,children:[l.jsx("span",{className:"toggle-track",children:l.jsx("span",{className:"toggle-thumb"})}),l.jsx("span",{className:"toggle-label-text",children:k.status?"Loaded":"Not Loaded"})]})]})})]}),l.jsxs("div",{className:"items-section",children:[l.jsxs("div",{className:"items-header",children:[l.jsxs("label",{children:[l.jsx("i",{className:"fas fa-list"})," Items"]}),l.jsxs("span",{className:"add-item-link",onClick:te,children:[l.jsx("i",{className:"fas fa-plus-circle"})," Add Item"]})]}),k.items.map((E,b)=>l.jsx("div",{className:"item-row",children:l.jsxs("div",{className:"item-fields",children:[l.jsxs("div",{className:"item-field",children:[l.jsx("label",{children:"Item Name"}),l.jsx("input",{type:"text",value:E.name,onChange:U=>Le(b,"name",P(U.target.value)),placeholder:"Item name"})]}),l.jsxs("div",{className:"item-field",children:[l.jsx("label",{children:"Qty"}),l.jsx("input",{type:"number",value:E.qty,onChange:U=>Le(b,"qty",U.target.value),placeholder:"0",min:"0"})]}),l.jsxs("div",{className:"item-field",children:[l.jsx("label",{children:"Rate"}),l.jsx("input",{type:"number",value:E.rate,onChange:U=>Le(b,"rate",U.target.value),placeholder:"0",min:"0"})]}),l.jsxs("div",{className:"item-field",children:[l.jsx("label",{children:"Total"}),l.jsx("input",{type:"text",value:(parseFloat(E.qty)||0)*(parseFloat(E.rate)||0),readOnly:!0,className:"total-input"})]}),l.jsxs("div",{className:"item-field item-delete",children:[l.jsx("label",{children:" "}),l.jsx("span",{className:"delete-icon",onClick:()=>Ze(b),children:l.jsx("i",{className:"fas fa-trash-alt"})})]})]})},b))]})]}),l.jsxs("div",{className:"modal-footer",children:[l.jsx("button",{className:"btn-cancel",onClick:()=>{C(!1),h(null)},children:"Cancel"}),l.jsxs("button",{className:"btn-save-shipment",onClick:p!==null?be:B,children:[l.jsx("i",{className:"fas fa-check"}),p!==null?"Update Shipment":"Add Shipment"]})]})]})}),l.jsx("style",{children:`
        /* ===== PAGE STYLES ===== */
        .edit-manifest-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px 24px;
          min-height: 100vh;
          background: #f0f4f8;
        }

        /* ===== PAGE HEADER ===== */
        .view-page-header {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 2px solid #e8ecf0;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .view-header-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .view-back-btn {
          background: none;
          border: none;
          font-size: 20px;
          color: #0a1628;
          cursor: pointer;
          padding: 6px 10px;
          border-radius: 8px;
          transition: 0.3s;
        }

        .view-back-btn:hover {
          background: #e8ecf0;
        }

        .view-header-title h2 {
          font-size: 20px;
          font-weight: 700;
          color: #0a1628;
          margin: 0;
        }

        .view-header-subtitle {
          color: #718096;
          font-size: 13px;
          display: block;
          margin-top: 2px;
        }

        .header-right {
          display: flex;
          gap: 10px;
        }

        .desktop-only {
          display: block;
        }

        .mobile-only {
          display: none;
        }

        .btn-update {
          padding: 10px 24px;
          background: #0a1628;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Inter', sans-serif;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-update:hover:not(:disabled) {
          background: #1a2a4a;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(10, 22, 40, 0.25);
        }

        .btn-update:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-update-full {
          padding: 12px 24px;
          background: #0a1628;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Inter', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
        }

        .btn-update-full:hover:not(:disabled) {
          background: #1a2a4a;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(10, 22, 40, 0.25);
        }

        .btn-update-full:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* ===== CARDS ===== */
        .card {
          background: white;
          border-radius: 10px;
          padding: 18px 20px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
          margin-bottom: 16px;
          border: 1px solid #e8ecf0;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
          flex-wrap: wrap;
          gap: 8px;
        }

        .card-header h3 {
          font-size: 15px;
          font-weight: 600;
          color: #0a1628;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .card-header h3 i {
          color: #4a5568;
        }

        .shipments-title {
          font-size: 15px;
          font-weight: 600;
          color: #0a1628;
          margin: 0;
        }

        .card-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .badge {
          background: #e8edf5;
          color: #0a1628;
          padding: 2px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          min-width: 28px;
          text-align: center;
        }

        /* ===== FORM ROWS ===== */
        .form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 12px;
          margin-bottom: 0;
        }

        .form-group label {
          display: block;
          font-weight: 600;
          font-size: 11px;
          margin-bottom: 4px;
          color: #4a5568;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .form-group label .required {
          color: #e74c3c;
        }

        .form-group input {
          width: 100%;
          padding: 8px 12px;
          border: 1.5px solid #e2e8f0;
          border-radius: 8px;
          font-size: 13px;
          font-family: 'Inter', sans-serif;
          transition: all 0.3s ease;
          background: white;
          color: #2d3748;
        }

        .form-group input:focus {
          outline: none;
          border-color: #4da6ff;
          box-shadow: 0 0 0 3px rgba(77, 166, 255, 0.1);
        }

        .form-group input::placeholder {
          color: #a0aec0;
          font-size: 13px;
        }

        /* ===== TOGGLE SWITCHES ===== */
        .toggle-group {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-top: 12px;
          padding: 12px 16px;
          background: #f7fafc;
          border-radius: 10px;
          flex-wrap: wrap;
        }

        .toggle-item {
          display: flex;
          align-items: center;
          flex: 1 1 0;
          min-width: 0;
        }

        .toggle-label-wrapper {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
          width: 100%;
        }

        .toggle-status-label {
          font-size: 10px;
          font-weight: 600;
          color: #4a5568;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .toggle-switch {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          user-select: none;
          padding: 4px 12px;
          border-radius: 20px;
          transition: all 0.2s;
          border: 1px solid transparent;
          width: 100%;
        }

        .toggle-switch:hover {
          background: #edf2f7;
        }

        .toggle-track {
          display: inline-block;
          width: 40px;
          height: 22px;
          background: #cbd5e0;
          border-radius: 22px;
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          flex-shrink: 0;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .toggle-thumb {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 18px;
          height: 18px;
          background: white;
          border-radius: 50%;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
        }

        .toggle-label-text {
          font-size: 13px;
          font-weight: 600;
          color: #4a5568;
          transition: all 0.3s;
          white-space: nowrap;
          min-width: 60px;
        }

        .toggle-switch.active .toggle-track {
          background: #2ecc71;
        }

        .toggle-switch.active .toggle-thumb {
          transform: translateX(18px);
        }

        .toggle-switch.active .toggle-label-text {
          color: #155724;
        }

        .toggle-item:nth-child(2) .toggle-switch.active .toggle-track {
          background: #4da6ff;
        }

        .toggle-item:nth-child(2) .toggle-switch.active .toggle-label-text {
          color: #0c5460;
        }

        /* ===== SHIPMENTS LIST ===== */
        .shipments-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .shipment-item {
          background: #f7fafc;
          border-radius: 8px;
          padding: 12px 14px;
          border: 1px solid #edf2f7;
        }

        .shipment-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .shipment-customer {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .customer-name {
          font-size: 15px;
          font-weight: 600;
          color: #0a1628;
        }

        .shipment-status {
          display: flex;
          gap: 6px;
        }

        .status-badge,
        .payment-badge {
          padding: 3px 10px;
          border-radius: 12px;
          font-size: 9px;
          font-weight: 600;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .status-badge i,
        .payment-badge i {
          font-size: 10px;
        }

        .status-badge.loaded {
          background: #d1ecf1;
          color: #0c5460;
        }

        .status-badge.not-loaded {
          background: #e2e8f0;
          color: #4a5568;
        }

        .payment-badge.paid {
          background: #d4edda;
          color: #155724;
        }

        .payment-badge.unpaid {
          background: #f8d7da;
          color: #721c24;
        }

        .shipment-actions {
          display: flex;
          gap: 6px;
        }

        .icon-btn {
          width: 30px;
          height: 30px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          font-size: 13px;
        }

        .icon-btn.edit-btn {
          background: #ebf8ff;
          color: #2b6cb0;
        }

        .icon-btn.edit-btn:hover {
          background: #bee3f8;
          transform: scale(1.05);
        }

        .icon-btn.delete-btn {
          background: #fff5f5;
          color: #e53e3e;
        }

        .icon-btn.delete-btn:hover {
          background: #fed7d7;
          transform: scale(1.05);
        }

        .shipment-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px 16px;
          font-size: 13px;
        }

        .detail-row {
          display: flex;
          gap: 6px;
          padding: 2px 0;
        }

        .detail-row .label {
          color: #718096;
          font-weight: 500;
          min-width: 70px;
        }

        .detail-row .value {
          color: #2d3748;
        }

        .detail-row.total-row .value {
          font-weight: 700;
          color: #0a1628;
        }

        .empty-state {
          text-align: center;
          color: #a0aec0;
          padding: 30px 20px;
        }

        .empty-state i {
          font-size: 36px;
          display: block;
          margin-bottom: 8px;
        }

        .empty-state p {
          font-size: 14px;
        }

        /* ===== ITEMS SECTION IN MODAL ===== */
        .items-section {
          margin-top: 12px;
          border-top: 1px solid #e2e8f0;
          padding-top: 12px;
        }

        .items-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .items-header label {
          font-weight: 600;
          font-size: 13px;
          color: #0a1628;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .items-header label i {
          color: #4a5568;
        }

        .add-item-link {
          color: #a78bfa;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 4px;
          transition: all 0.3s ease;
        }

        .add-item-link:hover {
          color: #8b5cf6;
        }

        .item-row {
          background: #f8fafc;
          border-radius: 8px;
          padding: 10px 12px;
          margin-bottom: 8px;
          border: 1px solid #e8ecf0;
        }

        .item-fields {
          display: grid;
          grid-template-columns: 2fr 0.8fr 0.8fr 1fr 0.5fr;
          gap: 10px;
          align-items: end;
        }

        .item-field label {
          display: block;
          font-weight: 600;
          font-size: 10px;
          margin-bottom: 3px;
          color: #4a5568;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .item-field input {
          width: 100%;
          padding: 6px 10px;
          border: 1.5px solid #e2e8f0;
          border-radius: 6px;
          font-size: 13px;
          font-family: 'Inter', sans-serif;
          transition: all 0.3s ease;
          background: white;
          color: #2d3748;
        }

        .item-field input:focus {
          outline: none;
          border-color: #4da6ff;
          box-shadow: 0 0 0 3px rgba(77, 166, 255, 0.1);
        }

        .item-field .total-input {
          background: #f7fafc;
          font-weight: 600;
          color: #0a1628;
        }

        .item-delete {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .item-delete label {
          visibility: hidden;
        }

        .delete-icon {
          color: #e74c3c;
          cursor: pointer;
          font-size: 16px;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 36px;
        }

        .delete-icon:hover {
          color: #c0392b;
          transform: scale(1.15);
        }

        /* ===== MODAL ===== */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(4px);
          animation: fadeIn 0.3s ease;
          padding: 20px;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .modal-content {
          background: white;
          border-radius: 12px;
          max-width: 700px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.3s ease;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #e8ecf0;
          position: sticky;
          top: 0;
          background: white;
          z-index: 10;
          border-radius: 12px 12px 0 0;
        }

        .modal-header h3 {
          margin: 0;
          font-size: 18px;
          color: #0a1628;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .modal-close {
          background: none;
          border: none;
          font-size: 20px;
          color: #a0aec0;
          cursor: pointer;
          transition: 0.3s;
          padding: 4px 8px;
          border-radius: 4px;
        }

        .modal-close:hover {
          color: #e74c3c;
          background: #fef2f2;
        }

        .modal-body {
          padding: 20px;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding: 16px 20px;
          border-top: 1px solid #e8ecf0;
          position: sticky;
          bottom: 0;
          background: white;
          border-radius: 0 0 12px 12px;
        }

        .btn-cancel {
          padding: 8px 20px;
          background: #e2e8f0;
          color: #4a5568;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: 0.3s;
          font-family: 'Inter', sans-serif;
        }

        .btn-cancel:hover {
          background: #cbd5e0;
        }

        .btn-save-shipment {
          padding: 8px 24px;
          background: #0a1628;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: 0.3s;
          font-family: 'Inter', sans-serif;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-save-shipment:hover {
          background: #1a2a4a;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(10, 22, 40, 0.2);
        }

        /* ============================================ */
        /* RESPONSIVE */
        /* ============================================ */

        @media (max-width: 768px) {
          .desktop-only {
            display: none !important;
          }

          .mobile-only {
            display: block !important;
          }

          .edit-manifest-page {
            padding: 12px 16px;
          }

          .view-page-header {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding-bottom: 8px;
            gap: 4px;
          }

          .view-header-left {
            flex: 1;
            min-width: 0;
          }

          .view-header-title h2 {
            font-size: 17px;
          }

          .view-header-subtitle {
            font-size: 12px;
          }

          .view-back-btn {
            font-size: 18px;
            padding: 4px 8px;
          }

          .mobile-update-btn {
            margin-top: 8px;
            margin-bottom: 12px;
            padding: 0 4px;
          }

          .form-row {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }

          .card-header {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }

          .shipments-title {
            font-size: 14px;
          }

          .card-actions {
            gap: 6px;
          }

          .badge {
            font-size: 10px;
            padding: 2px 8px;
            min-width: 24px;
          }

          .toggle-group {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            padding: 12px 14px;
          }

          .toggle-item {
            flex: 1;
            min-width: 0;
          }

          .toggle-label-wrapper {
            align-items: center;
            width: 100%;
          }

          .toggle-status-label {
            font-size: 9px;
            text-align: center;
            width: 100%;
          }

          .toggle-switch {
            padding: 4px 8px;
            gap: 8px;
            justify-content: center;
          }

          .toggle-track {
            width: 34px;
            height: 20px;
          }

          .toggle-thumb {
            width: 16px;
            height: 16px;
            top: 2px;
            left: 2px;
          }

          .toggle-switch.active .toggle-thumb {
            transform: translateX(14px);
          }

          .toggle-label-text {
            font-size: 11px;
            min-width: 50px;
          }

          .shipment-details {
            grid-template-columns: 1fr;
          }

          .modal-content {
            max-width: 100%;
            margin: 10px;
          }

          .item-fields {
            grid-template-columns: 1fr 1fr;
          }

          .item-field:first-child {
            grid-column: span 2;
          }

          .item-delete {
            grid-column: span 2;
            align-items: flex-end;
          }

          .shipment-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .shipment-actions {
            align-self: flex-end;
          }

          .shipment-customer {
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
          }

          .card {
            padding: 14px;
          }

          .card-header h3 {
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .edit-manifest-page {
            padding: 10px 12px;
          }

          .view-header-title h2 {
            font-size: 15px;
          }

          .view-header-subtitle {
            font-size: 11px;
          }

          .form-row {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .toggle-group {
            gap: 10px;
            padding: 10px 12px;
          }

          .toggle-switch {
            padding: 3px 6px;
            gap: 6px;
          }

          .toggle-track {
            width: 30px;
            height: 18px;
          }

          .toggle-thumb {
            width: 14px;
            height: 14px;
          }

          .toggle-switch.active .toggle-thumb {
            transform: translateX(12px);
          }

          .toggle-label-text {
            font-size: 10px;
            min-width: 40px;
          }

          .toggle-status-label {
            font-size: 8px;
          }

          .modal-body {
            padding: 14px;
          }

          .modal-footer {
            flex-direction: column;
          }

          .btn-cancel,
          .btn-save-shipment {
            width: 100%;
            justify-content: center;
          }

          .item-fields {
            grid-template-columns: 1fr;
          }

          .item-field:first-child {
            grid-column: span 1;
          }

          .item-delete {
            grid-column: span 1;
            align-items: center;
          }

          .btn-update-full {
            font-size: 13px;
            padding: 10px 16px;
          }

          .shipments-title {
            font-size: 13px;
          }

          .badge {
            font-size: 9px;
            padding: 2px 6px;
            min-width: 20px;
          }
        }

        @media (min-width: 769px) {
          .mobile-only {
            display: none !important;
          }

          .desktop-only {
            display: block !important;
          }

          .toggle-group {
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: wrap !important;
          }

          .toggle-item {
            flex: 0 0 auto !important;
          }
        }
      `})]}):l.jsx("div",{style:{textAlign:"center",padding:"50px"},children:"Invalid manifest ID. Redirecting..."})}function $x(){const{logout:e}=Or(),t=ha(),n=sn(),r=()=>{e(),n("/login")};return l.jsx("header",{className:"header",children:l.jsxs("div",{className:"header-content",children:[l.jsx("div",{className:"header-left",children:l.jsxs(Jo,{to:"/manifest",className:"header-logo",children:[l.jsx("i",{className:"fas fa-truck"}),l.jsx("span",{children:t})]})}),l.jsx("div",{className:"header-right",children:l.jsxs("button",{onClick:r,className:"btn-logout",children:[l.jsx("i",{className:"fas fa-sign-out-alt"})," Logout"]})})]})})}function Fx(){const e=ha(),t=new Date().getFullYear();return l.jsx("footer",{className:"footer",children:l.jsx("div",{className:"footer-content",children:l.jsxs("p",{children:["© ",t," ",e,". All rights reserved."]})})})}function Bx(){return l.jsxs("div",{className:"layout",children:[l.jsx($x,{}),l.jsx("main",{className:"main-content",children:l.jsx(vp,{})}),l.jsx(Fx,{})]})}const Hx=()=>{const{isAuthenticated:e,loading:t}=Or();return t?l.jsx("div",{style:{textAlign:"center",padding:"50px"},children:"Loading..."}):e?l.jsx(vp,{}):l.jsx(Hl,{to:"/login"})};function Vx(){return l.jsx(Tv,{future:{v7_startTransition:!0,v7_relativeSplatPath:!0},children:l.jsx(q0,{children:l.jsxs(Ev,{children:[l.jsx(wt,{path:"/login",element:l.jsx(Dx,{})}),l.jsx(wt,{path:"/register",element:l.jsx(Ax,{})}),l.jsx(wt,{path:"/",element:l.jsx(Hl,{to:"/manifest-manager"})}),l.jsx(wt,{element:l.jsx(Hx,{}),children:l.jsxs(wt,{element:l.jsx(Bx,{}),children:[l.jsx(wt,{path:"/manifest-manager",element:l.jsx(zx,{})}),l.jsx(wt,{path:"/manifest",element:l.jsx(Hl,{to:"/manifest-manager"})}),l.jsx(wt,{path:"/manifest-items",element:l.jsx(Wc,{})}),l.jsx(wt,{path:"/manifest-items/:id",element:l.jsx(Wc,{})}),l.jsx(wt,{path:"/view-manifest/:id",element:l.jsx(Mx,{})}),l.jsx(wt,{path:"/edit-manifest/:id",element:l.jsx(Ux,{})})]})})]})})})}Ga.createRoot(document.getElementById("root")).render(l.jsxs(rd.StrictMode,{children:[l.jsx(Vx,{}),l.jsx(Lx,{position:"top-right"})]}));
