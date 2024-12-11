/*! Salesforce Marketing Cloud - Journey Builder Custom Activities - discount-code */!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){var o,r;r=this,void 0===(o=function(){return function(e){e=e||window;var t,n,o,r=r||void 0,i=e.Postmonger,c=e.addEventListener||e.attachEvent?e:window;return(t=void 0!==r?r:{}).noConflict=function(){return e.Postmonger=i,this},t.version="0.0.14",n=t.Connection=function(e){var t=(e="object"==typeof e?e:{}).connect||c.parent,n=e.from||"*",o=e.to||"*";return"string"==typeof t&&(t=document.getElementById(t)),t&&!t.postMessage&&t.jquery&&(t=t.get(0)),t&&!t.postMessage&&(t.contentWindow||t.contentDocument)&&(t=t.contentWindow||t.contentDocument),t&&t.postMessage?(this.connect=t,this.to=o,this.from=n,this):(c.console&&c.console.warn&&c.console.warn(" Warning: Postmonger could not establish connection with ",e.connect),!1)},o=t.Events=function(){var e=/\s+/,t=this;return t._callbacks={},t._has=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t._keys=function(e){if(Object.keys)return Object.keys(e);if("object"!=typeof e)throw new TypeError("Invalid object");var n=[];for(var o in e)t._has(e,o)&&(n[n.length]=o);return n},t.on=function(n,o,r){var i,c,s,a,l;if(!o)return t;for(n=n.split(e),t._callbacks=t._callbacks||{},i=t._callbacks;c=n.shift();)a={},(s=(l=i[c])?l.tail:{}).next=a,s.context=r,s.callback=o,i[c]={tail:a,next:l?l.next:s};return t},t.off=function(n,o,r){var i,c,s,a,l,u=t._callbacks;if(u){if(!(n||o||r))return delete t._callbacks,t;for(n=n?n.split(e):t._keys(u);i=n.shift();)if(c=u[i],delete u[i],c&&(o||r))for(s=c.tail;(c=c.next)!==s;)a=c.callback,l=c.context,(o&&a)===o&&(r&&l)===r||t.on(i,a,l);return t}},t.trigger=function(n){var o,r,i,c,s,a,l;if(!(i=t._callbacks))return t;for(a=i.all,n=n.split(e),l=Array.prototype.slice.call(arguments,1);o=n.shift();){if(r=i[o])for(c=r.tail;(r=r.next)!==c;)r.callback.apply(r.context||t,l);if(r=a)for(c=r.tail,s=[o].concat(l);(r=r.next)!==c;)r.callback.apply(r.context||t,s)}return t},t},t.Session=function(){var t,r,i,s,a,l,u=arguments.length>0?Array.prototype.slice.call(arguments,0):[{}],d=[],f=new o,g=new o,y=this;for(y.on=f.on,y.off=f.off,y.trigger=g.trigger,y.end=function(){return f.off(),g.off(),c.removeEventListener?c.removeEventListener("message",l,!1):c.detachEvent&&c.detachEvent("onmessage",l),y},r=0,s=u.length;r<s;r++)if(t=new n(u[r])){for(i=0,a=d.length;i<a;i++)if(d[i].connect===t.connect&&d[i].from===t.from&&d[i].to===t.to){t=null;break}t&&d.push(t)}if(l=function(t){var n,o,r,i=null,c=[];for(o=0,r=d.length;o<r;o++)if(d[o].connect===t.source){i=d[o];break}if(!i)return!1;if("*"!==i.from&&i.from!==t.origin)return!1;try{if(!(n=JSON.parse(t.data)).e)return!1}catch(e){return!1}for(o in c.push(n.e),delete n.e,n)c.push(n[o]);f.trigger.apply(e,c)},c.addEventListener)c.addEventListener("message",l,!1);else{if(!c.attachEvent)return c.console&&c.console.warn&&c.console.warn("WARNING: Postmonger could not listen for messages on window %o",c),!1;c.attachEvent("onmessage",l)}return g.on("all",(function(){var e,t,n=Array.prototype.slice.call(arguments,0),o={};for(o.e=n[0],e=1,t=n.length;e<t;e++)o["a"+e]=n[e];for(e=0,t=d.length;e<t;e++)d[e].connect.postMessage(JSON.stringify(o),d[e].to)})),y},t}(r)}.apply(t,[]))||(e.exports=o)},function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o);const i=new r.a.Session;let c=null;function s(e){c=e,i.trigger("requestSchema"),i.on("requestedSchema",(function(e){const t=e.schema;for(var n=0,o=t.length;n<o;n++){let e=t[n].key,o=e.lastIndexOf(".")+1;({})[e.substring(o)]="{{"+e+"}}",c.arguments.execute.inArguments[0][""+e.substring(o)]="{{"+e+"}}"}})),console.log("activityactivityactivity",c);const t=Boolean(c.arguments&&c.arguments.execute&&c.arguments.execute.inArguments&&c.arguments.execute.inArguments.length>0),n=t?c.arguments.execute.inArguments:[];console.log("-------- triggered:onInitActivity({obj}) --------"),console.log("activity:\n ",JSON.stringify(c,null,4)),console.log("Has In Arguments: ",t),console.log("inArguments",n),console.log("-------------------------------------------------");const o=n.find(e=>e.discount);console.log("Discount Argument",o),o&&function(e){const t=document.getElementById("discount-code").querySelector(`[value='${e}']`);t?(t.selected=!0,u()):console.log("Could not select value from list",`[value='${e}]'`)}(o.discount)}async function a(){c.metaData.isConfigured=!0;const e=document.getElementById("discount-code"),t=e.options[e.selectedIndex];c.arguments.execute.inArguments=[{discount:t.value,EmailAddress:"{{Contact.Attribute.EmailAddress}}",firstName:"{{Contact.Attribute.FirstName}}"}],console.log("activity before setting discount value",c.arguments.execute.inArguments[0]),c.name=`Issue ${c.arguments.execute.inArguments[0].discount}% Code`,console.log("------------ triggering:updateActivity({obj}) ----------------"),console.log("Sending message back to updateActivity"),console.log("saving\n",JSON.stringify(c,null,4)),console.log("--------------------------------------------------------------"),i.trigger("updateActivity",c)}function l(){i.trigger("setActivityDirtyState",!1),i.trigger("requestInspectorClose")}function u(){document.getElementById("discount-code").selectedIndex?document.getElementById("done").removeAttribute("disabled"):document.getElementById("done").setAttribute("disabled",""),i.trigger("setActivityDirtyState",!0)}document.addEventListener("DOMContentLoaded",(function(){!function(){if("localhost"!==location.hostname&&"127.0.0.1"!==location.hostname)return;const e=new r.a.Session,t={};window.jb=t,e.on("setActivityDirtyState",(function(e){console.log("[echo] setActivityDirtyState -> ",e)})),e.on("requestInspectorClose",(function(){console.log("[echo] requestInspectorClose")})),e.on("updateActivity",(async function(e){console.log("[echo] updateActivity -> ",JSON.stringify(e,null,4))})),e.on("ready",(function(){console.log("[echo] ready"),console.log("\tuse jb.ready() from the console to initialize your activity")})),t.ready=function(){e.trigger("initActivity",{name:"",key:"EXAMPLE-1",metaData:{},configurationArguments:{},arguments:{executionMode:"{{Context.ExecutionMode}}",definitionId:"{{Context.DefinitionId}}",activityId:"{{Activity.Id}}",contactKey:"{{Context.ContactKey}}",execute:{inArguments:[{discount:10}],outArguments:[]},startActivityKey:"{{Context.StartActivityKey}}",definitionInstanceId:"{{Context.DefinitionInstanceId}}",requestObjectId:"{{Context.RequestObjectId}}"}})}}(),document.getElementById("done").addEventListener("click",a),document.getElementById("cancel").addEventListener("click",l),document.getElementById("discount-code").addEventListener("change",u),i.on("initActivity",s),i.trigger("ready")}))}]);
//# sourceMappingURL=discount-code-activity.js.map