(self.webpackChunkls_docs_web=self.webpackChunkls_docs_web||[]).push([[9441],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return d},kt:function(){return u}});var r=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),p=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},d=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),m=p(n),u=o,f=m["".concat(s,".").concat(u)]||m[u]||c[u]||a;return n?r.createElement(f,l(l({ref:t},d),{},{components:n})):r.createElement(f,l({ref:t},d))}));function u(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,l=new Array(a);l[0]=m;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:o,l[1]=i;for(var p=2;p<a;p++)l[p]=n[p];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},16579:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return i},contentTitle:function(){return s},metadata:function(){return p},toc:function(){return d},default:function(){return m}});var r=n(22122),o=n(19756),a=(n(67294),n(3905)),l=["components"],i={},s=void 0,p={unversionedId:"tools/LISA_LPM/development/API/modules/fs.readv",id:"tools/LISA_LPM/development/API/modules/fs.readv",isDocsHomePage:!1,title:"fs.readv",description:"@listenai/lisa_core / Exports / fs / readv",source:"@site/docs/tools/LISA_LPM/development/API/modules/fs.readv.md",sourceDirName:"tools/LISA_LPM/development/API/modules",slug:"/tools/LISA_LPM/development/API/modules/fs.readv",permalink:"/docs-csk6/tools/LISA_LPM/development/API/modules/fs.readv",version:"current",frontMatter:{},sidebar:"toolsLISA",previous:{title:"fs.promises",permalink:"/docs-csk6/tools/LISA_LPM/development/API/modules/fs.promises"},next:{title:"fs.realpathsync",permalink:"/docs-csk6/tools/LISA_LPM/development/API/modules/fs.realpathsync"}},d=[{value:"Table of contents",id:"table-of-contents",children:[{value:"Functions",id:"functions",children:[]}]},{value:"Functions",id:"functions-1",children:[{value:"__promisify__",id:"__promisify__",children:[]}]}],c={toc:d};function m(e){var t=e.components,n=(0,o.Z)(e,l);return(0,a.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs-csk6/tools/LISA_LPM/development/API/README"},"@listenai/lisa_core")," / ",(0,a.kt)("a",{parentName:"p",href:"/docs-csk6/tools/LISA_LPM/development/API/modules"},"Exports")," / ",(0,a.kt)("a",{parentName:"p",href:"/docs-csk6/tools/LISA_LPM/development/API/modules/fs"},"fs")," / readv"),(0,a.kt)("h1",{id:"namespace-readv"},"Namespace: readv"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs-csk6/tools/LISA_LPM/development/API/modules/fs"},"fs"),".readv"),(0,a.kt)("h2",{id:"table-of-contents"},"Table of contents"),(0,a.kt)("h3",{id:"functions"},"Functions"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/docs-csk6/tools/LISA_LPM/development/API/modules/fs.readv#__promisify__"},"_","_","promisify","_","_"))),(0,a.kt)("h2",{id:"functions-1"},"Functions"),(0,a.kt)("h3",{id:"__promisify__"},"_","_","promisify","_","_"),(0,a.kt)("p",null,"\u25b8 ",(0,a.kt)("strong",{parentName:"p"},(0,a.kt)("strong",{parentName:"strong"},"promisify")),"(",(0,a.kt)("inlineCode",{parentName:"p"},"fd"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"buffers"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"position?"),"): ",(0,a.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,a.kt)("a",{parentName:"p",href:"/docs-csk6/tools/LISA_LPM/development/API/interfaces/fs.readvresult"},(0,a.kt)("inlineCode",{parentName:"a"},"ReadVResult")),">"),(0,a.kt)("h4",{id:"parameters"},"Parameters"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,a.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"fd")),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"number"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"buffers")),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"ReadonlyArray"),"<",(0,a.kt)("inlineCode",{parentName:"td"},"NodeJS.ArrayBufferView"),">")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"position?")),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"number"))))),(0,a.kt)("h4",{id:"returns"},"Returns"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,a.kt)("a",{parentName:"p",href:"/docs-csk6/tools/LISA_LPM/development/API/interfaces/fs.readvresult"},(0,a.kt)("inlineCode",{parentName:"a"},"ReadVResult")),">"),(0,a.kt)("h4",{id:"defined-in"},"Defined in"),(0,a.kt)("p",null,"node_modules/@types/node/fs.d.ts:2217"))}m.isMDXComponent=!0}}]);