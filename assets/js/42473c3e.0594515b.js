"use strict";(self.webpackChunkls_docs_web=self.webpackChunkls_docs_web||[]).push([[110],{3905:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>m});var n=r(67294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var a=n.createContext({}),p=function(e){var t=n.useContext(a),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},s=function(e){var t=p(e.components);return n.createElement(a.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,i=e.originalType,a=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),d=p(r),m=o,f=d["".concat(a,".").concat(m)]||d[m]||u[m]||i;return r?n.createElement(f,l(l({ref:t},s),{},{components:r})):n.createElement(f,l({ref:t},s))}));function m(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=r.length,l=new Array(i);l[0]=d;var c={};for(var a in t)hasOwnProperty.call(t,a)&&(c[a]=t[a]);c.originalType=e,c.mdxType="string"==typeof e?e:o,l[1]=c;for(var p=2;p<i;p++)l[p]=r[p];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},19948:(e,t,r)=>{r.r(t),r.d(t,{contentTitle:()=>l,default:()=>s,frontMatter:()=>i,metadata:()=>c,toc:()=>a});var n=r(87462),o=(r(67294),r(3905));const i={},l="\u7cfb\u7edf\u7ebf\u7a0b",c={unversionedId:"chips/600X/kernel/system_threads",id:"chips/600X/kernel/system_threads",isDocsHomePage:!1,title:"\u7cfb\u7edf\u7ebf\u7a0b",description:"\u7cfb\u7edf\u7ebf\u7a0b\u662f\u5185\u6838\u5728\u7cfb\u7edf\u521d\u59cb\u5316\u671f\u95f4\u81ea\u52a8\u751f\u6210\u7684\u7ebf\u7a0b\u3002",source:"@site/docs/chips/600X/kernel/system_threads.md",sourceDirName:"chips/600X/kernel",slug:"/chips/600X/kernel/system_threads",permalink:"/docs-csk6/chips/600X/kernel/system_threads",version:"current",frontMatter:{},sidebar:"docs/chips/600X",previous:{title:"\u8c03\u5ea6",permalink:"/docs-csk6/chips/600X/kernel/scheduling"},next:{title:"\u5de5\u4f5c\u961f\u5217\u7ebf\u7a0b",permalink:"/docs-csk6/chips/600X/kernel/workqueue"}},a=[{value:"\u4e3b\u7ebf\u7a0b",id:"\u4e3b\u7ebf\u7a0b",children:[]},{value:"\u7a7a\u95f2\u7ebf\u7a0b",id:"\u7a7a\u95f2\u7ebf\u7a0b",children:[]}],p={toc:a};function s(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"\u7cfb\u7edf\u7ebf\u7a0b"},"\u7cfb\u7edf\u7ebf\u7a0b"),(0,o.kt)("p",null,"\u7cfb\u7edf\u7ebf\u7a0b\u662f\u5185\u6838\u5728\u7cfb\u7edf\u521d\u59cb\u5316\u671f\u95f4\u81ea\u52a8\u751f\u6210\u7684\u7ebf\u7a0b\u3002"),(0,o.kt)("p",null,"\u5185\u6838\u4f1a\u521b\u5efa\u4ee5\u4e0b\u7cfb\u7edf\u7ebf\u7a0b:"),(0,o.kt)("h2",{id:"\u4e3b\u7ebf\u7a0b"},"\u4e3b\u7ebf\u7a0b"),(0,o.kt)("p",null,"\u8fd9\u4e2a\u7ebf\u7a0b\u6267\u884c\u5185\u6838\u521d\u59cb\u5316\uff0c\u7136\u540e\u8c03\u7528\u5e94\u7528\u7a0b\u5e8f\u7684main()\u51fd\u6570(\u5982\u679c\u6709\u5b9a\u4e49)\u3002"),(0,o.kt)("p",null,"\u9ed8\u8ba4\u60c5\u51b5\u4e0b\uff0c\u4e3b\u7ebf\u7a0b\u914d\u7f6e\u4e3a\u6700\u9ad8\u7684\u53ef\u62a2\u5360\u7ebf\u7a0b\u4f18\u5148\u7ea7(\u53730)\u3002\u5982\u679c\u5185\u6838\u6ca1\u6709\u914d\u7f6e\u652f\u6301\u53ef\u62a2\u5360\u7ebf\u7a0b\uff0c\u4e3b\u7ebf\u7a0b\u914d\u7f6e\u4e3a\u6700\u4f4e\u7684\u534f\u4f5c\u7ebf\u7a0b\u4f18\u5148\u7ea7(\u5373-1)\u3002"),(0,o.kt)("p",null,"\u4e3b\u7ebf\u7a0b(",(0,o.kt)("inlineCode",{parentName:"p"},"main thread"),")\u5728\u6267\u884c\u5185\u6838\u521d\u59cb\u5316\u6216\u6267\u884c\u5e94\u7528\u7a0b\u5e8f\u7684",(0,o.kt)("inlineCode",{parentName:"p"},"main()"),"\u51fd\u6570\u65f6\u662f\u4e00\u4e2a\u57fa\u672c\u7ebf\u7a0b\u3002\u8fd9\u610f\u5473\u7740\u5982\u679c\u8be5\u7ebf\u7a0b\u4e2d\u6b62(abort)\uff0c\u4f1a\u5f15\u53d1\u4e00\u4e2a\u81f4\u547d\u7684\u7cfb\u7edf\u9519\u8bef\u3002\u5982\u679c",(0,o.kt)("inlineCode",{parentName:"p"},"main()"),"\u6ca1\u6709\u88ab\u5b9a\u4e49\uff0c\u6216\u8005\u5b83\u6267\u884c\u540e\u505a\u4e86\u4e00\u4e2a\u6b63\u5e38\u7684\u8fd4\u56de\uff0c\u90a3\u4e48\u4e3b\u7ebf\u7a0b\u5c31\u4f1a\u6b63\u5e38\u7ed3\u675f\uff0c\u4e0d\u4f1a\u5f15\u53d1\u9519\u8bef\u3002"),(0,o.kt)("h2",{id:"\u7a7a\u95f2\u7ebf\u7a0b"},"\u7a7a\u95f2\u7ebf\u7a0b"),(0,o.kt)("p",null,"\u5f53\u7cfb\u7edf\u4e2d\u65e0\u5176\u4ed6\u5c31\u7eea\u7ebf\u7a0b\u5b58\u5728\u65f6\uff0c\u4f1a\u6267\u884c\u7a7a\u95f2\u7ebf\u7a0b(idle thread)\u3002\u53ef\u4ee5\u5728\u7a7a\u95f2\u7ebf\u7a0b\u4e2d\u6267\u884c\u7535\u6e90\u7ba1\u7406\u6a21\u5757\u4ee5\u7701\u7535\uff0c\u5426\u5219\u7a7a\u95f2\u7ebf\u7a0b\u53ea\u4f1a\u6267\u884c\u4e00\u4e2a\u201c\u4ec0\u4e48\u90fd\u4e0d\u505a\u201d\u7684\u5faa\u73af\u3002\u53ea\u8981\u7cfb\u7edf\u5728\u8fd0\u884c\uff0c\u7a7a\u95f2\u7ebf\u7a0b\u5c31\u4e00\u76f4\u5b58\u5728\uff0c\u5e76\u4e14\u6c38\u8fdc\u4e0d\u4f1a\u7ed3\u675f\u3002"),(0,o.kt)("p",null,"\u7a7a\u95f2\u7ebf\u7a0b\u6c38\u8fdc\u914d\u7f6e\u4e3a\u6700\u4f4e\u4f18\u5148\u7ea7\u7ebf\u7a0b\u3002\u5982\u679c\u8fd9\u4f7f\u5b83\u6210\u4e3a\u4e00\u4e2a\u534f\u4f5c\u5f0f\u7ebf\u7a0b\uff0c\u90a3\u4e48\u7a7a\u95f2\u7ebf\u7a0b\u4f1a\u53cd\u590d\u8ba9\u51faCPU\uff0c\u4ee5\u4f7f\u5e94\u7528\u7a0b\u5e8f\u7684\u5176\u4ed6\u7ebf\u7a0b\u5728\u9700\u8981\u7684\u65f6\u5019\u8fd0\u884c\u3002"),(0,o.kt)("p",null,"\u7a7a\u95f2\u7ebf\u7a0b\u662f\u4e00\u4e2a\u5fc5\u4e0d\u53ef\u5c11\u7684\u7ebf\u7a0b\uff0c\u8fd9\u610f\u5473\u7740\u5982\u679c\u7ebf\u7a0b\u4e2d\u6b62\uff0c\u4f1a\u5f15\u53d1\u4e00\u4e2a\u81f4\u547d\u7684\u7cfb\u7edf\u9519\u8bef\u3002"),(0,o.kt)("p",null,"\u6839\u636e\u5e94\u7528\u7a0b\u5e8f\u548c\u5185\u6838\u7684\u914d\u7f6e\uff0c\u4e5f\u4f1a\u521b\u5efa\u5176\u4ed6\u7684\u7cfb\u7edf\u7ebf\u7a0b\u3002\u6bd4\u5982\uff0c\u5982\u679c\u4f7f\u7528\u4e86\u7cfb\u7edf\u5de5\u4f5c\u961f\u5217(system workqueue)\uff0c\u4f1a\u521b\u5efa\u4e00\u4e2a\u7cfb\u7edf\u7ebf\u7a0b\u7528\u4e8e\u6267\u884c\u5de5\u4f5c\u9879(work items)\u3002"))}s.isMDXComponent=!0}}]);