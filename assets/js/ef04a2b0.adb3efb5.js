(self.webpackChunkls_docs_web=self.webpackChunkls_docs_web||[]).push([[8274],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return s},kt:function(){return m}});var r=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),p=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},s=function(e){var t=p(e.components);return r.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),d=p(n),m=o,f=d["".concat(c,".").concat(m)]||d[m]||u[m]||a;return n?r.createElement(f,l(l({ref:t},s),{},{components:n})):r.createElement(f,l({ref:t},s))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,l=new Array(a);l[0]=d;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:o,l[1]=i;for(var p=2;p<a;p++)l[p]=n[p];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},582:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return i},contentTitle:function(){return c},metadata:function(){return p},toc:function(){return s},default:function(){return d}});var r=n(22122),o=n(19756),a=(n(67294),n(3905)),l=["components"],i={title:"\u4e0b\u8f7d\u6587\u4ef6",sidebar_position:1},c=void 0,p={unversionedId:"tools/LISA_LPM/development/examples/download",id:"tools/LISA_LPM/development/examples/download",isDocsHomePage:!1,title:"\u4e0b\u8f7d\u6587\u4ef6",description:"\u65b9\u6cd5",source:"@site/docs/tools/LISA_LPM/development/examples/download.md",sourceDirName:"tools/LISA_LPM/development/examples",slug:"/tools/LISA_LPM/development/examples/download",permalink:"/docs-csk6/tools/LISA_LPM/development/examples/download",version:"current",sidebarPosition:1,frontMatter:{title:"\u4e0b\u8f7d\u6587\u4ef6",sidebar_position:1},sidebar:"toolsLISA",previous:{title:"task\u6587\u4ef6",permalink:"/docs-csk6/tools/LISA_LPM/development/task_file"},next:{title:"\u5b50\u8fdb\u7a0b\u4f7f\u7528",permalink:"/docs-csk6/tools/LISA_LPM/development/examples/cmd"}},s=[{value:"\u65b9\u6cd5",id:"\u65b9\u6cd5",children:[]},{value:"\u4f7f\u7528",id:"\u4f7f\u7528",children:[{value:"\u8fd4\u56de",id:"\u8fd4\u56de",children:[]}]}],u={toc:s};function d(e){var t=e.components,n=(0,o.Z)(e,l);return(0,a.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"\u65b9\u6cd5"},"\u65b9\u6cd5"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"fs.project.downloadFile(options)")),(0,a.kt)("h2",{id:"\u4f7f\u7528"},"\u4f7f\u7528"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"\nconst {fs} = core // \u4ececore\u4e2d\u89e3\u6784\u51fafs\n\n// ...\n\nconst downRes = await fs.project.downloadFile({\n    url: '', // \u4e0b\u8f7d\u7684\u5730\u5740,\n    fileName: '', // \u4fdd\u5b58\u7684\u6587\u4ef6\u540d,\n    targetDir: '', // \u4e0b\u8f7d\u5230\u7684\u8def\u5f84,\n    progress: (percentage, transferred, total) => {\n        // task.output = `\u6b63\u5728\u4e0b\u8f7d: ${percentage}% ${transferred}/${total}`\n    }\n})\n")),(0,a.kt)("h3",{id:"\u8fd4\u56de"},"\u8fd4\u56de"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null}),(0,a.kt)("th",{parentName:"tr",align:null},"\u7c7b\u578b"),(0,a.kt)("th",{parentName:"tr",align:null},"\u63cf\u8ff0"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"err"),(0,a.kt)("td",{parentName:"tr",align:null},"number"),(0,a.kt)("td",{parentName:"tr",align:null},"\u4e0b\u8f7d\u6210\u529f\uff0c\u503c\u4e3a0\uff0c\u5176\u4f59\u5747\u4e3a\u5931\u8d25")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"msg"),(0,a.kt)("td",{parentName:"tr",align:null},"string"),(0,a.kt)("td",{parentName:"tr",align:null},"\u4e0b\u8f7d\u7ed3\u679c\u7684\u63cf\u8ff0")))))}d.isMDXComponent=!0}}]);