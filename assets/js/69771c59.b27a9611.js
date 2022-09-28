"use strict";(self.webpackChunkls_docs_web=self.webpackChunkls_docs_web||[]).push([[5480],{3905:(n,t,e)=>{e.d(t,{Zo:()=>p,kt:()=>f});var a=e(67294);function r(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}function l(n,t){var e=Object.keys(n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(n);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),e.push.apply(e,a)}return e}function i(n){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?l(Object(e),!0).forEach((function(t){r(n,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(e)):l(Object(e)).forEach((function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(e,t))}))}return n}function o(n,t){if(null==n)return{};var e,a,r=function(n,t){if(null==n)return{};var e,a,r={},l=Object.keys(n);for(a=0;a<l.length;a++)e=l[a],t.indexOf(e)>=0||(r[e]=n[e]);return r}(n,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(n);for(a=0;a<l.length;a++)e=l[a],t.indexOf(e)>=0||Object.prototype.propertyIsEnumerable.call(n,e)&&(r[e]=n[e])}return r}var s=a.createContext({}),d=function(n){var t=a.useContext(s),e=t;return n&&(e="function"==typeof n?n(t):i(i({},t),n)),e},p=function(n){var t=d(n.components);return a.createElement(s.Provider,{value:t},n.children)},c={inlineCode:"code",wrapper:function(n){var t=n.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(n,t){var e=n.components,r=n.mdxType,l=n.originalType,s=n.parentName,p=o(n,["components","mdxType","originalType","parentName"]),u=d(e),f=r,k=u["".concat(s,".").concat(f)]||u[f]||c[f]||l;return e?a.createElement(k,i(i({ref:t},p),{},{components:e})):a.createElement(k,i({ref:t},p))}));function f(n,t){var e=arguments,r=t&&t.mdxType;if("string"==typeof n||r){var l=e.length,i=new Array(l);i[0]=u;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=n,o.mdxType="string"==typeof n?n:r,i[1]=o;for(var d=2;d<l;d++)i[d]=e[d];return a.createElement.apply(null,i)}return a.createElement.apply(null,e)}u.displayName="MDXCreateElement"},41225:(n,t,e)=>{e.r(t),e.d(t,{contentTitle:()=>i,default:()=>p,frontMatter:()=>l,metadata:()=>o,toc:()=>s});var a=e(87462),r=(e(67294),e(3905));const l={},i="NVS \u7684\u4f7f\u7528",o={unversionedId:"chips/600X/application/modules/nvs",id:"chips/600X/application/modules/nvs",isDocsHomePage:!1,title:"NVS \u7684\u4f7f\u7528",description:"\u5728NVS(Non-Volatile Storage)\u5b58\u50a8\u4e2d\uff0c\u5143\u7d20\u662f\u901a\u8fc7\u5faa\u73af\u7f13\u51b2\u533a\u5b58\u50a8\u5230 flash \u4e2d\uff0c\u8fd9\u4e9b\u5143\u7d20\u4ee5 id-data \u5bf9\u7684\u5f62\u5f0f\u8868\u793a\u3002 flash \u533a\u57df\u4f1a\u88ab\u5212\u5206\u4e3a\u82e5\u5e72\u4e2a\u6247\u533a\u3002\u5f53flash\u4e2d\u7684\u4e00\u4e2a\u6247\u533a\u7684\u5b58\u50a8\u7a7a\u95f4\u7528\u5b8c\u65f6\uff0c\u4f1a\u5728 flash \u533a\u57df\u4e2d\u521b\u5efa\u4e00\u4e2a\u65b0\u6247\u533a\uff0c\u5e76\u5c06\u8be5\u6247\u533a\u4e2d\u5b58\u50a8\u7684 id-data \u503c\u62f7\u8d1d\u5230\u65b0\u7684\u6247\u533a\u3002",source:"@site/docs/chips/600X/application/modules/nvs.md",sourceDirName:"chips/600X/application/modules",slug:"/chips/600X/application/modules/nvs",permalink:"/docs-csk6/chips/600X/application/modules/nvs",version:"current",frontMatter:{},sidebar:"docs/chips/600X",previous:{title:"Shell \u7684\u4f7f\u7528",permalink:"/docs-csk6/chips/600X/application/shell_sample"},next:{title:"\u6587\u4ef6\u7cfb\u7edf\u7684\u4f7f\u7528",permalink:"/docs-csk6/chips/600X/application/modules/filesystem"}},s=[{value:"NVS \u5e38\u7528\u63a5\u53e3",id:"nvs-\u5e38\u7528\u63a5\u53e3",children:[{value:"\u5728flash\u4e2d\u521d\u59cb\u5316NVS\u6587\u4ef6\u7cfb\u7edf",id:"\u5728flash\u4e2d\u521d\u59cb\u5316nvs\u6587\u4ef6\u7cfb\u7edf",children:[]},{value:"NVS \u5199\u5165\u6761\u76ee",id:"nvs-\u5199\u5165\u6761\u76ee",children:[]},{value:"NVS \u8bfb\u53d6\u6761\u76ee",id:"nvs-\u8bfb\u53d6\u6761\u76ee",children:[]},{value:"NVS \u5220\u9664\u6761\u76ee",id:"nvs-\u5220\u9664\u6761\u76ee",children:[]},{value:"NVS \u8bfb\u53d6\u5386\u53f2\u8bb0\u5f55\u6761\u76ee",id:"nvs-\u8bfb\u53d6\u5386\u53f2\u8bb0\u5f55\u6761\u76ee",children:[]},{value:"NVS \u6e05\u9664\u6587\u4ef6\u7cfb\u7edf",id:"nvs-\u6e05\u9664\u6587\u4ef6\u7cfb\u7edf",children:[]},{value:"NVS \u8ba1\u7b97\u6587\u4ef6\u7cfb\u7edf\u53ef\u7528\u7a7a\u95f4",id:"nvs-\u8ba1\u7b97\u6587\u4ef6\u7cfb\u7edf\u53ef\u7528\u7a7a\u95f4",children:[]}]},{value:"\u4f7f\u7528\u793a\u4f8b",id:"\u4f7f\u7528\u793a\u4f8b",children:[{value:"\u51c6\u5907\u5de5\u4f5c",id:"\u51c6\u5907\u5de5\u4f5c",children:[]},{value:"\u83b7\u53d6sample",id:"\u83b7\u53d6sample",children:[]},{value:"\u793a\u4f8b\u9879\u76ee\u7ec4\u4ef6\u914d\u7f6e",id:"\u793a\u4f8b\u9879\u76ee\u7ec4\u4ef6\u914d\u7f6e",children:[]},{value:"\u793a\u4f8b\u5b9e\u73b0\u903b\u8f91",id:"\u793a\u4f8b\u5b9e\u73b0\u903b\u8f91",children:[]},{value:"\u793a\u4f8b\u7684\u5b9e\u73b0",id:"\u793a\u4f8b\u7684\u5b9e\u73b0",children:[]}]},{value:"\u7f16\u8bd1\u548c\u70e7\u5f55",id:"\u7f16\u8bd1\u548c\u70e7\u5f55",children:[{value:"\u7f16\u8bd1",id:"\u7f16\u8bd1",children:[]},{value:"\u70e7\u5f55",id:"\u70e7\u5f55",children:[]},{value:"\u67e5\u770b\u7ed3\u679c",id:"\u67e5\u770b\u7ed3\u679c",children:[]}]}],d={toc:s};function p(n){let{components:t,...e}=n;return(0,r.kt)("wrapper",(0,a.Z)({},d,e,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"nvs-\u7684\u4f7f\u7528"},"NVS \u7684\u4f7f\u7528"),(0,r.kt)("p",null,"\u5728NVS(Non-Volatile Storage)\u5b58\u50a8\u4e2d\uff0c\u5143\u7d20\u662f\u901a\u8fc7\u5faa\u73af\u7f13\u51b2\u533a\u5b58\u50a8\u5230 flash \u4e2d\uff0c\u8fd9\u4e9b\u5143\u7d20\u4ee5 id-data \u5bf9\u7684\u5f62\u5f0f\u8868\u793a\u3002 flash \u533a\u57df\u4f1a\u88ab\u5212\u5206\u4e3a\u82e5\u5e72\u4e2a\u6247\u533a\u3002\u5f53flash\u4e2d\u7684\u4e00\u4e2a\u6247\u533a\u7684\u5b58\u50a8\u7a7a\u95f4\u7528\u5b8c\u65f6\uff0c\u4f1a\u5728 flash \u533a\u57df\u4e2d\u521b\u5efa\u4e00\u4e2a\u65b0\u6247\u533a\uff0c\u5e76\u5c06\u8be5\u6247\u533a\u4e2d\u5b58\u50a8\u7684 id-data \u503c\u62f7\u8d1d\u5230\u65b0\u7684\u6247\u533a\u3002"),(0,r.kt)("p",null,"\u672c\u793a\u4f8b\u901a\u8fc7 NVS API \u7684\u8c03\u7528\u6f14\u793a\u4e86NVS\u7528\u4e8e\u5b58\u50a8\u4e0d\u540c\u7c7b\u578b\u7684\u6570\u636e(strings, binary blobs, unsigned 32 bit integer)\uff0c\u4ee5\u53ca\u5982\u4f55\u4eceflash\u4e2d\u8bfb\u53d6\u548c\u5220\u9664\u6570\u636e\u3002"),(0,r.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"\u66f4\u591a\u5173\u4e8eNVS\u7684\u5185\u5bb9\u53ef\u4ee5\u5b66\u4e60",(0,r.kt)("a",{parentName:"p",href:"/docs-csk6/chips/600X/service/storage/nvs"},"\u7cfb\u7edf\u670d\u52a1-NVS"),"\u7ae0\u8282\u3002"))),(0,r.kt)("h2",{id:"nvs-\u5e38\u7528\u63a5\u53e3"},"NVS \u5e38\u7528\u63a5\u53e3"),(0,r.kt)("h3",{id:"\u5728flash\u4e2d\u521d\u59cb\u5316nvs\u6587\u4ef6\u7cfb\u7edf"},"\u5728flash\u4e2d\u521d\u59cb\u5316NVS\u6587\u4ef6\u7cfb\u7edf"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-c"},"int nvs_init(struct nvs_fs *fs, const char *dev_name);\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\u53c2\u6570\u8bf4\u660e")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"\u5b57\u6bb5"),(0,r.kt)("th",{parentName:"tr",align:null},"\u8bf4\u660e"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"fs"),(0,r.kt)("td",{parentName:"tr",align:null},"\u6307\u5411\u6587\u4ef6\u7cfb\u7edf\u7684\u6307\u9488")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"dev_name"),(0,r.kt)("td",{parentName:"tr",align:null},"\u6307\u5411flash\u8bbe\u5907\u540d\u79f0\u7684\u6307\u9488")))),(0,r.kt)("h3",{id:"nvs-\u5199\u5165\u6761\u76ee"},"NVS \u5199\u5165\u6761\u76ee"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-c"},"ssize_t nvs_write(struct nvs_fs *fs, uint16_t id, const void *data, size_t len)\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\u53c2\u6570\u8bf4\u660e")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"\u5b57\u6bb5"),(0,r.kt)("th",{parentName:"tr",align:null},"\u8bf4\u660e"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"fs"),(0,r.kt)("td",{parentName:"tr",align:null},"\u6307\u5411\u6587\u4ef6\u7cfb\u7edf\u7684\u6307\u9488")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"id"),(0,r.kt)("td",{parentName:"tr",align:null},"\u8981\u5199\u5165\u7684\u6761\u76ee\u7684id")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"data"),(0,r.kt)("td",{parentName:"tr",align:null},"\u6307\u5411\u8981\u5199\u5165\u7684\u6570\u636e\u7684\u6307\u9488")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"len"),(0,r.kt)("td",{parentName:"tr",align:null},"\u8981\u5199\u5165\u7684\u5b57\u8282\u957f\u5ea6")))),(0,r.kt)("h3",{id:"nvs-\u8bfb\u53d6\u6761\u76ee"},"NVS \u8bfb\u53d6\u6761\u76ee"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-c"},"ssize_t nvs_read(struct nvs_fs *fs, uint16_t id, void *data, size_t len)\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\u53c2\u6570\u8bf4\u660e")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"\u5b57\u6bb5"),(0,r.kt)("th",{parentName:"tr",align:null},"\u8bf4\u660e"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"fs"),(0,r.kt)("td",{parentName:"tr",align:null},"\u6307\u5411\u6587\u4ef6\u7cfb\u7edf\u7684\u6307\u9488")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"id"),(0,r.kt)("td",{parentName:"tr",align:null},"\u8981\u5199\u5165\u7684\u6761\u76ee\u7684id")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"data"),(0,r.kt)("td",{parentName:"tr",align:null},"\u6307\u5411\u6570\u636e\u7f13\u51b2\u533a\u7684\u6307\u9488")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"len"),(0,r.kt)("td",{parentName:"tr",align:null},"\u8981\u8bfb\u53d6\u7684\u5b57\u8282\u957f\u5ea6")))),(0,r.kt)("h3",{id:"nvs-\u5220\u9664\u6761\u76ee"},"NVS \u5220\u9664\u6761\u76ee"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-c"},"int nvs_delete(struct nvs_fs *fs, uint16_t id);\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\u53c2\u6570\u8bf4\u660e")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"\u5b57\u6bb5"),(0,r.kt)("th",{parentName:"tr",align:null},"\u8bf4\u660e"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"fs"),(0,r.kt)("td",{parentName:"tr",align:null},"\u6307\u5411\u6587\u4ef6\u7cfb\u7edf\u7684\u6307\u9488")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"id"),(0,r.kt)("td",{parentName:"tr",align:null},"\u8981\u5199\u5165\u7684\u6761\u76ee\u7684id")))),(0,r.kt)("h3",{id:"nvs-\u8bfb\u53d6\u5386\u53f2\u8bb0\u5f55\u6761\u76ee"},"NVS \u8bfb\u53d6\u5386\u53f2\u8bb0\u5f55\u6761\u76ee"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-c"},"ssize_t nvs_read_hist(struct nvs_fs *fs, uint16_t id, void *data, size_t len, uint16_t cnt);\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\u53c2\u6570\u8bf4\u660e")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"\u5b57\u6bb5"),(0,r.kt)("th",{parentName:"tr",align:null},"\u8bf4\u660e"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"fs"),(0,r.kt)("td",{parentName:"tr",align:null},"\u6307\u5411\u6587\u4ef6\u7cfb\u7edf\u7684\u6307\u9488")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"id"),(0,r.kt)("td",{parentName:"tr",align:null},"\u8981\u5199\u5165\u7684\u6761\u76ee\u7684id")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"data"),(0,r.kt)("td",{parentName:"tr",align:null},"\u6307\u5411\u6570\u636e\u7f13\u51b2\u533a\u7684\u6307\u9488")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"len"),(0,r.kt)("td",{parentName:"tr",align:null},"\u8981\u8bfb\u53d6\u7684\u5b57\u8282\u957f\u5ea6")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"cnt"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5386\u53f2\u8ba1\u6570\u5668\uff1a0:\u6700\u65b0\u6761\u76ee\uff0c1:\u6700\u65b0\u9879\u4e4b\u524d\u7684\u4e00\u4e2a\u2026")))),(0,r.kt)("h3",{id:"nvs-\u6e05\u9664\u6587\u4ef6\u7cfb\u7edf"},"NVS \u6e05\u9664\u6587\u4ef6\u7cfb\u7edf"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-c"},"int nvs_delete(struct nvs_fs *fs, uint16_t id);\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\u53c2\u6570\u8bf4\u660e")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"\u5b57\u6bb5"),(0,r.kt)("th",{parentName:"tr",align:null},"\u8bf4\u660e"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"fs"),(0,r.kt)("td",{parentName:"tr",align:null},"\u6307\u5411\u6587\u4ef6\u7cfb\u7edf\u7684\u6307\u9488")))),(0,r.kt)("h3",{id:"nvs-\u8ba1\u7b97\u6587\u4ef6\u7cfb\u7edf\u53ef\u7528\u7a7a\u95f4"},"NVS \u8ba1\u7b97\u6587\u4ef6\u7cfb\u7edf\u53ef\u7528\u7a7a\u95f4"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-c"},"ssize_t nvs_calc_free_space(struct nvs_fs *fs);\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\u53c2\u6570\u8bf4\u660e")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"\u5b57\u6bb5"),(0,r.kt)("th",{parentName:"tr",align:null},"\u8bf4\u660e"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"fs"),(0,r.kt)("td",{parentName:"tr",align:null},"\u6307\u5411\u6587\u4ef6\u7cfb\u7edf\u7684\u6307\u9488")))),(0,r.kt)("h2",{id:"\u4f7f\u7528\u793a\u4f8b"},"\u4f7f\u7528\u793a\u4f8b"),(0,r.kt)("h3",{id:"\u51c6\u5907\u5de5\u4f5c"},"\u51c6\u5907\u5de5\u4f5c"),(0,r.kt)("p",null,"\u672c\u793a\u4f8b\u57fa\u4e8eCSK6-NanoKit\u5f00\u53d1\u677f\u5b9e\u73b0NVS\u529f\u80fd\u7684\u4f7f\u7528\uff0c\u9700\u8981\u505a\u4ee5\u4e0b\u51c6\u5907\u5de5\u4f5c\uff1a  "),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"CSK6-NanoKit\u5f00\u53d1\u677f\uff1b")),(0,r.kt)("h3",{id:"\u83b7\u53d6sample"},"\u83b7\u53d6sample"),(0,r.kt)("p",null,"csk6 sdk\u63d0\u4f9b\u4e86NVS\u7684\u4f7f\u7528\u793a\u4f8b\uff0c\u53ef\u4ee5\u901a\u8fc7Lisa\u547d\u4ee4\u83b7\u53d6\u793a\u4f8b\u9879\u76ee\uff1a"),(0,r.kt)("p",null,"\u901a\u8fc7Lisa\u547d\u4ee4\u521b\u5efa\u9879\u76ee\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"lisa zep create\n")),(0,r.kt)("p",null,"\u6309\u4ee5\u4e0b\u76ee\u5f55\u9009\u62e9\u5b8c\u6210sample\u521b\u5efa\uff1a  "),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"sample \u2192 subsys \u2192 nvs")),(0,r.kt)("h3",{id:"\u793a\u4f8b\u9879\u76ee\u7ec4\u4ef6\u914d\u7f6e"},"\u793a\u4f8b\u9879\u76ee\u7ec4\u4ef6\u914d\u7f6e"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"# \u542f\u7528flash\u914d\u7f6e\nCONFIG_FLASH=y\nCONFIG_FLASH_PAGE_LAYOUT=y\n# \u542f\u7528NVS\u914d\u7f6e\nCONFIG_NVS=y\nCONFIG_LOG=y\nCONFIG_NVS_LOG_LEVEL_DBG=y\n# \u542f\u7528\u91cd\u542f\u914d\u7f6e\nCONFIG_REBOOT=y\nCONFIG_MPU_ALLOW_FLASH_WRITE=y\n")),(0,r.kt)("h3",{id:"\u793a\u4f8b\u5b9e\u73b0\u903b\u8f91"},"\u793a\u4f8b\u5b9e\u73b0\u903b\u8f91"),(0,r.kt)("p",null,"\u6b64\u793a\u4f8b\u5b58\u50a8\u4ee5\u4e0b\u6761\u76ee\uff1a"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"1.\u5b58\u50a8\u4e00\u4e2aIP\u5730\u5740(\u5b57\u7b26\u4e32)\uff0c\u5b58\u50a8id=1\uff0cdata=\u201c192.168.1.1\u201d\uff1b")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"2.\u5b58\u50a8\u4e00\u4e2a\u5bc6\u94a5(\u4e8c\u8fdb\u5236blob)\uff0c\u5b58\u50a8id=2\u3001data=FF FE FD FC FB F9 F8\uff1b")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"3.\u5b58\u50a8\u4e00\u4e2a\u91cd\u542f\u8ba1\u6570\u5668\uff0832\u4f4d\uff09\uff0c\u5b58\u50a8id=3\uff0cdata=reboot_counter\uff1b")),(0,r.kt)("p",null,"\u6bcf\u6b21\u91cd\u65b0\u542f\u52a8\u90fd\u4f1a\u589e\u52a0",(0,r.kt)("inlineCode",{parentName:"p"},"reboot_ counter"),"\u7684\u503c\uff0c\u5e76\u5728 flash\u4e2d \u8fdb\u884c\u66f4\u65b0\u3002\u5e76\u901a\u8fc7",(0,r.kt)("inlineCode",{parentName:"p"},"nvs_read_hist\uff08\uff09"),"\u63a5\u53e3\u83b7\u53d6reboot_ counter\u7684\u5386\u53f2\u8bb0\u5f55\u3002"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"4.\u5b58\u50a8\u4e00\u4e2a\u5b57\u7b26\u4e32\uff0c\u5b58\u50a8id=4\uff0cdata=\u201cdata\u201d\uff0c\u5e76\u5c55\u793a\u5982\u4f55\u5220\u9664\u8be5\u6761\u76ee\u3002")),(0,r.kt)("p",null,"\u5728\u7b2c10\u6b21\u91cd\u65b0\u542f\u52a8\u65f6\uff0c\u5220\u9664id=4\u7684\u5b57\u7b26\u4e32\u6761\u76ee\uff0c\u5728\u7b2c11\u6b21\u91cd\u65b0\u542f\u52a8\u65f6\uff0c\u65e0\u6cd5\u83b7\u53d6\u8be5\u6761\u76ee\u6570\u636e\u3002"),(0,r.kt)("h3",{id:"\u793a\u4f8b\u7684\u5b9e\u73b0"},"\u793a\u4f8b\u7684\u5b9e\u73b0"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-c"},'#include <zephyr.h>\n#include <sys/reboot.h>\n#include <device.h>\n#include <string.h>\n#include <drivers/flash.h>\n#include <storage/flash_map.h>\n#include <fs/nvs.h>\n\nstatic struct nvs_fs fs;\n\n#define STORAGE_NODE DT_NODE_BY_FIXED_PARTITION_LABEL(storage)\n#define FLASH_NODE DT_MTD_FROM_FIXED_PARTITION(STORAGE_NODE)\n\n/* 1000 msec = 1 sec */\n#define SLEEP_TIME      100\n/* maximum reboot counts, make high enough to trigger sector change (buffer */\n/* rotation). */\n#define MAX_REBOOT 800\n\n#define ADDRESS_ID 1\n#define KEY_ID 2\n#define RBT_CNT_ID 3\n#define STRING_ID 4\n#define LONG_ID 5\n\n\nvoid main(void)\n{\n    int rc = 0, cnt = 0, cnt_his = 0;\n    char buf[16];\n    uint8_t key[8], longarray[128];\n    uint32_t reboot_counter = 0U, reboot_counter_his;\n    struct flash_pages_info info;\n    const struct device *flash_dev;\n\n    /* \u5b9a\u4e49NVS\u6587\u4ef6\u7cfb\u7edf\u5e76\u8bbe\u7f6e\u4ee5\u4e0b\u53c2\u6570\uff1a\n     * sector_size\uff1a\u6247\u533a\u6570\u91cf\u7b49\u4e8eflash page\u9875\u7684\u5927\u5c0f\n     * sector_count\uff1a\u6247\u533a\u6570\u91cf 3\n     * offset\uff1a\u504f\u79fb\u5730\u5740 FLASH_AREA_OFFSET(storage)\n     */\n    flash_dev = DEVICE_DT_GET(FLASH_NODE);\n    if (!device_is_ready(flash_dev)) {\n        printk("Flash device %s is not ready\\n", flash_dev->name);\n        return;\n    }\n    printk("Flash device %s \\n", flash_dev->name);\n    \n    fs.offset = FLASH_AREA_OFFSET(storage);\n    rc = flash_get_page_info_by_offs(flash_dev, fs.offset, &info);\n    if (rc) {\n        printk("Unable to get page info\\n");\n        return;\n    }\n    fs.sector_size = info.size;\n    fs.sector_count = 3U;\n\n    printk("Flash device %d \\n", fs.sector_size);\n\n    rc = nvs_init(&fs, flash_dev->name);\n    if (rc) {\n        printk("Flash Init failed\\n");\n        return;\n    }\n\n    /* ADDRESS_ID\u7528\u4e8e\u5b58\u50a8IP\u5730\u5740\uff0c\u5e76\u5c1d\u8bd5flash\u8bfb\u53d6 */\n    rc = nvs_read(&fs, ADDRESS_ID, &buf, sizeof(buf));\n    if (rc > 0) { /* \u8bfb\u53d6\u5230\u6570\u636e\u5e76\u5c55\u793a */\n        printk("Id: %d, Address: %s\\n", ADDRESS_ID, buf);\n    } else   {/* \u8bfb\u53d6\u4e0d\u5230\u6570\u636e\uff0c\u5219\u5199\u5165\u6570\u636e */\n        strcpy(buf, "192.168.1.1");\n        printk("No address found, adding %s at id %d\\n", buf,\n               ADDRESS_ID);\n        (void)nvs_write(&fs, ADDRESS_ID, &buf, strlen(buf)+1);\n    }\n    /* KEY_ID \u7528\u4e8e\u5b58\u50a8key\u6570\u7ec4\u6570\u636e\uff0c\u5e76\u5c1d\u8bd5flash\u8bfb\u53d6*/\n    rc = nvs_read(&fs, KEY_ID, &key, sizeof(key));\n    if (rc > 0) { /* \u8bfb\u5230\u6761\u6570\u6570\u636e\u5e76\u5c55\u793a */\n        printk("Id: %d, Key: ", KEY_ID);\n        for (int n = 0; n < 8; n++) {\n            printk("%x ", key[n]);\n        }\n        printk("\\n");\n    } else   {/* \u8bfb\u53d6\u6761\u76ee\u4e3a\u7a7a\uff0c\u5e76\u5199\u5165\u6570\u636e */\n        printk("No key found, adding it at id %d\\n", KEY_ID);\n        key[0] = 0xFF;\n        key[1] = 0xFE;\n        key[2] = 0xFD;\n        key[3] = 0xFC;\n        key[4] = 0xFB;\n        key[5] = 0xFA;\n        key[6] = 0xF9;\n        key[7] = 0xF8;\n        (void)nvs_write(&fs, KEY_ID, &key, sizeof(key));\n    }\n    /* RBT_CNT_ID  \u7528\u4e8e\u5b58\u50a8\u91cd\u542f\u8ba1\u6570\u6570\u636e\uff0c\u5e76\u5c1d\u8bd5\u4eceflash\u8bfb\u53d6 */\n    rc = nvs_read(&fs, RBT_CNT_ID, &reboot_counter, sizeof(reboot_counter));\n    if (rc > 0) { /* \u8bfb\u5230\u6761\u6570\u6570\u636e\u5e76\u5c55\u793a */\n        printk("Id: %d, Reboot_counter: %d\\n",\n            RBT_CNT_ID, reboot_counter);\n    } else   {/* \u8bfb\u53d6\u6761\u76ee\u4e3a\u7a7a\uff0c\u5e76\u5199\u5165\u6570\u636e */\n        printk("No Reboot counter found, adding it at id %d\\n",\n               RBT_CNT_ID);\n        (void)nvs_write(&fs, RBT_CNT_ID, &reboot_counter,\n              sizeof(reboot_counter));\n    }\n    /* STRING_ID \u7528\u4e8e\u5b58\u50a8\u5b57\u7b26\u4e32\u6570\u636e\uff0c\u5e76\u5c55\u793a\u5982\u4f55\u5220\u9664\u8be5\u6761\u76ee\u6570\u636e*/\n    rc = nvs_read(&fs, STRING_ID, &buf, sizeof(buf));\n    if (rc > 0) {\n        /* \u8bfb\u5230\u6761\u6570\u6570\u636e\u5e76\u5c55\u793a */\n        printk("Id: %d, Data: %s\\n",\n            STRING_ID, buf);\n        /* \u5728\u7b2c10\u6b21\u91cd\u65b0\u542f\u52a8\u65f6\uff0c\u5220\u9664id=4\u7684\u5b57\u7b26\u4e32\u6761\u76ee */\n        if (reboot_counter == 10U) {\n            (void)nvs_delete(&fs, STRING_ID);\n        }\n    } else   {\n        /* \u8bfb\u53d6\u4e0d\u5230\u6761\u76ee\u4fe1\u606f\uff0c\u5f53reboot_counter = 0\u65f6\u5199\u5165\u6570\u636e */\n        if (reboot_counter == 0U) {\n            printk("Id: %d not found, adding it\\n",\n            STRING_ID);\n            strcpy(buf, "DATA");\n            (void)nvs_write(&fs, STRING_ID, &buf, strlen(buf) + 1);\n        }\n    }\n\n    /* LONG_ID  \u7528\u4e8e\u5b58\u50a8\u5b57\u6bd4\u8f83\u5927\u7684\u6570\u636e,\u5e76\u5c1d\u8bd5\u4eceflash\u8bfb\u53d6 */\n    rc = nvs_read(&fs, LONG_ID, &longarray, sizeof(longarray));\n    if (rc > 0) {\n        /* \u8bfb\u5230\u6761\u6570\u6570\u636e\u5e76\u5c55\u793a */\n        printk("Id: %d, Longarray: ", LONG_ID);\n        for (int n = 0; n < sizeof(longarray); n++) {\n            printk("%x ", longarray[n]);\n        }\n        printk("\\n");\n    } else   {\n        /* \u8bfb\u53d6\u4e0d\u5230\u6761\u76ee\u4fe1\u606f\uff0c\u5f53reboot_counter = 0\u65f6\u5199\u5165\u6570\u636e */\n        if (reboot_counter == 0U) {\n            printk("Longarray not found, adding it as id %d\\n",\n                   LONG_ID);\n            for (int n = 0; n < sizeof(longarray); n++) {\n                longarray[n] = n;\n            }\n            (void)nvs_write(\n                &fs, LONG_ID, &longarray, sizeof(longarray));\n        }\n    }\n\n    cnt = 5;\n    while (1) {\n        k_msleep(SLEEP_TIME);\n        if (reboot_counter < MAX_REBOOT) {\n            if (cnt == 5) {\n                /* \u6253\u5370\u91cd\u65b0\u542f\u52a8\u8ba1\u6570\u5668\u5386\u53f2\u6570\u636e\n                 * \u4ee5\u786e\u8ba4\u8ba1\u6570\u5668\u5386\u53f2\u8bb0\u5f55\u5b58\u5728\u4e8eflash\u4e2d\n                 */\n                printk("Reboot counter history: \\n");\n                while (1) {\n                    /* \u83b7\u53d6\u91cd\u542f\u8ba1\u6570\u5668\u7684\u5386\u53f2\u6570\u636e */\n                    rc = nvs_read_hist(\n                        &fs, RBT_CNT_ID,\n                        &reboot_counter_his,\n                        sizeof(reboot_counter_his),\n                        cnt_his);\n                    if (rc < 0) {\n                        break;\n                    }\n                    printk("...%d", reboot_counter_his);\n                    cnt_his++;\n                }\n                if (cnt_his == 0) {\n                    printk("\\nError, no Reboot counter \\n");\n                } else {\n                    printk("\\nOldest reboot counter: %d \\n",\n                           reboot_counter_his);\n                }\n            }\n            printk("waiting for reboot ...%d \\n", cnt);\n            cnt--;\n            if (cnt == 0) {\n                reboot_counter++;\n                /* nvs \u5199\u5165reboot_counter */\n                (void)nvs_write(\n                    &fs, RBT_CNT_ID, &reboot_counter,\n                    sizeof(reboot_counter));\n                if (reboot_counter == MAX_REBOOT) {\n                    printk("Doing last reboot...\\n");\n                }\n                /* \u91cd\u542f\u7cfb\u7edf */\n                sys_reboot(0);\n            }\n        } else {\n            printk("Reboot counter reached max value.\\n");\n            printk("Reset to 0 and exit test.\\n");\n            reboot_counter = 0U;\n            (void)nvs_write(&fs, RBT_CNT_ID, &reboot_counter,\n              sizeof(reboot_counter));\n            break;\n        }\n    }\n}\n')),(0,r.kt)("h2",{id:"\u7f16\u8bd1\u548c\u70e7\u5f55"},"\u7f16\u8bd1\u548c\u70e7\u5f55"),(0,r.kt)("h3",{id:"\u7f16\u8bd1"},"\u7f16\u8bd1"),(0,r.kt)("p",null,"\u5728app\u6839\u76ee\u5f55\u4e0b\u901a\u8fc7\u4ee5\u4e0b\u6307\u4ee4\u5b8c\u6210\u7f16\u8bd1\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"lisa zep build -b csk6002_9s_nano\n")),(0,r.kt)("h3",{id:"\u70e7\u5f55"},"\u70e7\u5f55"),(0,r.kt)("p",null,"CSK6-NanoKit\u901a\u8fc7USB\u8fde\u63a5PC\uff0c\u901a\u8fc7\u70e7\u5f55\u6307\u4ee4\u5f00\u59cb\u70e7\u5f55\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"lisa zep flash --runner pyocd\n")),(0,r.kt)("h3",{id:"\u67e5\u770b\u7ed3\u679c"},"\u67e5\u770b\u7ed3\u679c"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"*** Booting Zephyr OS build v1.0.4-alpha.1  ***\nFlash device FLASH_CTRL \nFlash device 4096 \nId: 1, Address: 192.168.1.1\nId: 2, Key: ff fe fd fc fb fa f9 f8 \nId: 3, Reboot_counter: 799\nId: 5, Longarray: 0 1 2 3 4 5 6 7 8 9 a b c d e f 10 11 12 13 14 15 16 17 18 19 1a 1b 1c 1d 1e 1f 20 21 22 23 24 25 26 27 28 29 2a 2b 2c 2d 2e 2f 30 31 32 33 34 35 36 37 38 39 3a 3b 3c 3d 3e 3f 40 41 42 43 44 45 46 47 48 49 4a 4b 4c 4d 4e 4f 50 51 52 53 54 55 56 57 58 59 5a 5b 5c 5d 5e 5f 60 61 62 63 64 65 66 67 68 69 6a 6b 6c 6d 6e 6f 70 71 72 73 74 75 76 77 78 79 7a 7b 7c 7d 7e 7f \n[00:00:00.008,000] \x1b[0m<dbg> fs_nvs.nvs_recover_last_ate: Recovering last ate from sector 2\x1b[0m\n[00:00:00.010,000] \x1b[0m<inf> fs_nvs: 3 Sectors of 4096 bytes\x1b[0m\n[00:00:00.010,000] \x1b[0m<inf> fs_nvs: alloc wra: 2, b80\x1b[0m\n[00:00:00.010,000] \x1b[0m<inf> fs_nvs: data wra: 2, 2bc\x1b[0m\nReboot counter history: \n...799...798...797...796...795...794...793...792...791...790...789...788...787...786...785...784...783...782...781...780...779...778...777...776...775...774...773...772...771...770...769...768...767...766...765...764...763...762...761...760...759...758...757...756...755...754...753...752...751...750...749...748...747...746...745...744...743...742...741...740...739...738...737...736...735...734...733...732...731...730...729...728...727...726...725...724...723...722...721...720...719...718...717...716...715...714...713...712...711...710...709...708...707...706...705...704...703...702...701...700...699...698...697...696...695...694...693...692...691...690...689...688...687...686...685...684...683...682...681...680...679...678...677...676...675...674...673...672...671...670...669...668...667...666...665...664...663...662...661...660...659...658...657...656...655...654...653...652...651...650...649...648...647...646...645...644...643...642...641...640...639...638...637...636...635...634...633...632...631...630...629...628...627...626...625...624...623...622...621...620...619...618...617...616...615...614...613...612...611...610...609...608...607...606...605...604...603...602...601...600...599...598...597...596...595...594...593...592...591...590...589...588...587...586...585...584...583...582...581...580...579...578...577...576...575...574...573...572...571...570...569...568...567...566...565...564...563...562...561...560...559...558...557...556...555...554...553...552...551...550...549...548...547...546...545...544...543...542...541...540...539...538...537...536...535...534...533...532...531...530...529...528...527...526...525...524...523...522...521...520...519...518...517...516...515...514...513...512...511...510...509...508...507...506...505...504...503...502...501...500...499...498...497...496...495...494...493...492...491...490...489...488...487...486...485...484...483...482...481...480...479...478...477...476...475...474...473...472...471...470...469...468...467...466...465...464...463...462...461...460...459...458...457...456...455...454...453...452...451...450...449...448...447...446...445...444...443...442...441...440...439...438...437...436...435...434...433...432...431...430...429...428...427...426...425...424...423...422...421...420...419...418...417...416...415...414...413...412...411...410...409...408...407...406...405...404...403...402...401...400...399...398...397...396...395...394...393...392...391...390...389...388...387...386...385...384...383...382...381...380...379...378...377...376...375...374...373...372...371...370...369...368...367...366...365...364...363...362...361...360...359...358...357...356...355...354...353...352...351...350...349...348...347...346...345...344...343...342...341...340...339...338...337...336...335...334...333...332...331...330...329...328...327...326...325...324...323\nOldest reboot counter: 323 \nwaiting for reboot ...5 \nwaiting for reboot ...4 \nwaiting for reboot ...3 \nwaiting for reboot ...2 \nwaiting for reboot ...1 \nDoing last reboot...\n*** Booting Zephyr OS build v1.0.4-alpha.1  ***\nFlash device FLASH_CTRL \nFlash device 4096 \nId: 1, Address: 192.168.1.1\nId: 2, Key: ff fe fd fc fb fa f9 f8 \nId: 3, Reboot_counter: 800\nId: 5, Longarray: 0 1 2 3 4 5 6 7 8 9 a b c d e f 10 11 12 13 14 15 16 17 18 19 1a 1b 1c 1d 1e 1f 20 21 22 23 24 25 26 27 28 29 2a 2b 2c 2d 2e 2f 30 31 32 33 34 35 36 37 38 39 3a 3b 3c 3d 3e 3f 40 41 42 43 44 45 46 47 48 49 4a 4b 4c 4d 4e 4f 50 51 52 53 54 55 56 57 58 59 5a 5b 5c 5d 5e 5f 60 61 62 63 64 65 66 67 68 69 6a 6b 6c 6d 6e 6f 70 71 72 73 74 75 76 77 78 79 7a 7b 7c 7d 7e 7f \n[00:00:00.008,000] \x1b[0m<dbg> fs_nvs.nvs_recover_last_ate: Recovering last ate from sector 2\x1b[0m\n[00:00:00.010,000] \x1b[0m<inf> fs_nvs: 3 Sectors of 4096 bytes\x1b[0m\n[00:00:00.010,000] \x1b[0m<inf> fs_nvs: alloc wra: 2, b78\x1b[0m\n[00:00:00.010,000] \x1b[0m<inf> fs_nvs: data wra: 2, 2c0\x1b[0m\nReboot counter reached max value.\nReset to 0 and exit test.\n")))}p.isMDXComponent=!0}}]);