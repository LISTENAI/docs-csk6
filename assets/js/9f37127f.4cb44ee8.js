"use strict";(self.webpackChunkls_docs_web=self.webpackChunkls_docs_web||[]).push([[9204],{3905:(e,t,n)=>{n.d(t,{Zo:()=>o,kt:()=>d});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),m=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},o=function(e){var t=m(e.components);return r.createElement(s.Provider,{value:t},e.children)},k={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},c=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,o=l(e,["components","mdxType","originalType","parentName"]),c=m(n),d=a,u=c["".concat(s,".").concat(d)]||c[d]||k[d]||i;return n?r.createElement(u,p(p({ref:t},o),{},{components:n})):r.createElement(u,p({ref:t},o))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,p=new Array(i);p[0]=c;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,p[1]=l;for(var m=2;m<i;m++)p[m]=n[m];return r.createElement.apply(null,p)}return r.createElement.apply(null,n)}c.displayName="MDXCreateElement"},31345:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>p,default:()=>o,frontMatter:()=>i,metadata:()=>l,toc:()=>s});var r=n(87462),a=(n(67294),n(3905));const i={},p="\u5b9a\u65f6\u5668",l={unversionedId:"chips/600X/kernel/timing/timers",id:"chips/600X/kernel/timing/timers",isDocsHomePage:!1,title:"\u5b9a\u65f6\u5668",description:"\u5b9a\u65f6\u5668\u662f\u4e00\u4e2a\u5185\u6838\u5bf9\u8c61\uff0c\u5b83\u4f7f\u7528\u5185\u6838\u7684\u7cfb\u7edf\u65f6\u949f\u6765\u6d4b\u91cf\u65f6\u95f4\u7684\u6d41\u901d\u3002\u5f53\u8fbe\u5230\u5b9a\u65f6\u5668\u7684\u6307\u5b9a\u65f6\u95f4\u65f6\uff0c\u5b83\u53ef\u4ee5\u6267\u884c\u5e94\u7528\u7a0b\u5e8f\u5b9a\u4e49\u7684\u64cd\u4f5c\uff0c\u6216\u8005\u5b83\u53ef\u4ee5\u7b80\u5355\u5730\u8bb0\u5f55\u5230\u671f\u65f6\u95f4\u5e76\u7b49\u5f85\u5e94\u7528\u7a0b\u5e8f\u8bfb\u53d6\u5176\u72b6\u6001\u3002",source:"@site/docs/chips/600X/kernel/timing/timers.md",sourceDirName:"chips/600X/kernel/timing",slug:"/chips/600X/kernel/timing/timers",permalink:"/docs-csk6/chips/600X/kernel/timing/timers",version:"current",frontMatter:{},sidebar:"docs/chips/600X",previous:{title:"\u4e92\u65a5\u9501",permalink:"/docs-csk6/chips/600X/kernel/mutexes"},next:{title:"FIFOs",permalink:"/docs-csk6/chips/600X/kernel/fifos"}},s=[{value:'<span id="concepts">\u6982\u5ff5</span>',id:"\u6982\u5ff5",children:[]},{value:'<span id="impl">\u5b9e\u73b0</span>',id:"\u5b9e\u73b0",children:[{value:'<span id="dat">\u5b9a\u4e49\u5b9a\u65f6\u5668</span>',id:"\u5b9a\u4e49\u5b9a\u65f6\u5668",children:[]},{value:'<span id="uatef">\u4f7f\u7528\u5b9a\u65f6\u5668\u8fc7\u671f\u51fd\u6570</span>',id:"\u4f7f\u7528\u5b9a\u65f6\u5668\u8fc7\u671f\u51fd\u6570",children:[]},{value:'<span id="rts">\u8bfb\u53d6\u5b9a\u65f6\u5668\u72b6\u6001</span>',id:"\u8bfb\u53d6\u5b9a\u65f6\u5668\u72b6\u6001",children:[]},{value:'<span id="utss">\u4f7f\u7528\u5b9a\u65f6\u5668\u72b6\u6001\u540c\u6b65</span>',id:"\u4f7f\u7528\u5b9a\u65f6\u5668\u72b6\u6001\u540c\u6b65",children:[]}]},{value:'<span id="su">\u7528\u9014\u5efa\u8bae</span>',id:"\u7528\u9014\u5efa\u8bae",children:[]},{value:'<span id="co">\u914d\u7f6e\u9009\u9879</span>',id:"\u914d\u7f6e\u9009\u9879",children:[]},{value:'<span id="apiref">API\u53c2\u8003</span>',id:"api\u53c2\u8003",children:[]}],m={toc:s};function o(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"\u5b9a\u65f6\u5668"},"\u5b9a\u65f6\u5668"),(0,a.kt)("p",null,"\u5b9a\u65f6\u5668\u662f\u4e00\u4e2a\u5185\u6838\u5bf9\u8c61\uff0c\u5b83\u4f7f\u7528\u5185\u6838\u7684\u7cfb\u7edf\u65f6\u949f\u6765\u6d4b\u91cf\u65f6\u95f4\u7684\u6d41\u901d\u3002\u5f53\u8fbe\u5230\u5b9a\u65f6\u5668\u7684\u6307\u5b9a\u65f6\u95f4\u65f6\uff0c\u5b83\u53ef\u4ee5\u6267\u884c\u5e94\u7528\u7a0b\u5e8f\u5b9a\u4e49\u7684\u64cd\u4f5c\uff0c\u6216\u8005\u5b83\u53ef\u4ee5\u7b80\u5355\u5730\u8bb0\u5f55\u5230\u671f\u65f6\u95f4\u5e76\u7b49\u5f85\u5e94\u7528\u7a0b\u5e8f\u8bfb\u53d6\u5176\u72b6\u6001\u3002"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#concepts"},"\u6982\u5ff5")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#impl"},"\u5b9e\u73b0"),(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#dat"},"\u5b9a\u4e49\u5b9a\u65f6\u5668")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#uatef"},"\u4f7f\u7528\u5b9a\u65f6\u5668\u8fc7\u671f\u51fd\u6570")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#rts"},"\u8bfb\u53d6\u5b9a\u65f6\u5668\u72b6\u6001")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#utss"},"\u4f7f\u7528\u5b9a\u65f6\u5668\u72b6\u6001\u540c\u6b65")))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#su"},"\u7528\u9014\u5efa\u8bae")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#co"},"\u914d\u7f6e\u9009\u9879")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#apiref"},"API\u53c2\u8003"))),(0,a.kt)("h2",{id:"\u6982\u5ff5"},(0,a.kt)("span",{id:"concepts"},"\u6982\u5ff5")),(0,a.kt)("p",null,"\u53ef\u4ee5\u5b9a\u4e49\u4efb\u610f\u6570\u91cf\u7684\u5b9a\u65f6\u5668\uff08\u4ec5\u53d7\u53ef\u7528RAM\u9650\u5236\uff09\u3002\u6bcf\u4e2a\u5b9a\u65f6\u5668\u90fd\u7531\u5b83\u7684\u5185\u5b58\u5730\u5740\u5f15\u7528\u3002"),(0,a.kt)("p",null,"\u5b9a\u65f6\u5668\u5177\u6709\u4ee5\u4e0b\u5173\u952e\u5c5e\u6027\uff1a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"duration \u6307\u5b9a\u7b2c\u4e00\u4e2a\u5b9a\u65f6\u5668\u5230\u671f\u524d\u7684\u65f6\u95f4\u95f4\u9694\u7684\u6301\u7eed\u65f6\u95f4\uff0c\u8fd9\u662f\u4e00\u4e2a",(0,a.kt)("inlineCode",{parentName:"p"},"k_timeout_t"),"\u503c\uff0c\u53ef\u4ee5\u901a\u8fc7\u4e0d\u540c\u7684\u5355\u4f4d\u8fdb\u884c\u521d\u59cb\u5316\u3002")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"period \u6307\u5b9a\u7b2c\u4e00\u4e2a\u5b9a\u65f6\u5668\u5230\u671f\u540e\u6240\u6709\u5b9a\u65f6\u5668\u5230\u671f\u4e4b\u95f4\u7684\u65f6\u95f4\u95f4\u9694\u7684\u65f6\u95f4\u6bb5\uff0c\u4e5f\u662f\u4e00\u4e2a",(0,a.kt)("inlineCode",{parentName:"p"},"k_timeout_t"),"\u503c\u3002\u5b83\u5fc5\u987b\u662f\u975e\u8d1f\u6570\u3002",(0,a.kt)("inlineCode",{parentName:"p"},"K_NO_WAIT"),"(\u5373\u96f6)\u6216 ",(0,a.kt)("inlineCode",{parentName:"p"},"K_FOREVER"),"\u610f\u5473\u7740\u5b9a\u65f6\u5668\u662f\u5355\u6b21\u5b9a\u65f6\u5668\uff0c\u5728\u5355\u6b21\u5230\u671f\u540e\u505c\u6b62\u3002\uff08\u4f8b\u5982\uff0c\u5047\u8bbe\u4e00\u4e2a\u5b9a\u65f6\u5668\u4ee5200ms\u6301\u7eed\u65f6\u95f4\u548c75ms\u7684\u5468\u671f\u542f\u52a8\uff0c\u5b83\u9996\u5148\u4f1a\u5728200ms\u8fc7\u671f\u540e\u518d\u6bcf\u969475ms\u6267\u884c\u4e00\u6b21\u3002\uff09")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"expiry \u6bcf\u6b21\u5b9a\u65f6\u5668\u5230\u671f\u65f6\u6267\u884c\u7684\u5230\u671f\u51fd\u6570\u529f\u80fd\u7531\u7cfb\u7edf\u65f6\u949f\u4e2d\u65ad\u5904\u7406\u7a0b\u5e8f\u6267\u884c\u3002\u5982\u679c\u4e0d\u9700\u8981\u5230\u671f\u51fd\u6570\uff0c\u5219\u628a\u51fd\u6570\u6307\u5b9a\u4e3aNULL\u3002")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"\u5982\u679c\u5b9a\u65f6\u5668\u5728\u8fd0\u884c\u8fc7\u7a0b\u4e2d\u63d0\u524d\u505c\u6b62\uff0c\u5b83\u4f1a\u6267\u884c\u505c\u6b62\u56de\u8c03\u51fd\u6570\u3002\u51fd\u6570\u5728\u8c03\u7528\u505c\u6b62\u5b9a\u65f6\u5668\u7684\u7ebf\u7a0b\u4e0a\u4e0b\u6587\u6267\u884c\u3002\u5982\u679c\u4e0d\u9700\u8981\u505c\u6b62\u51fd\u6570\uff0c\u5219\u628a\u51fd\u6570\u5236\u5b9a\u4e3aNULL\u3002")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"status \u662f\u4e00\u4e2a\u72b6\u6001\u503c\uff0c\u6307\u81ea\u4ece\u4e0a\u6b21\u8bfb\u53d6\u72b6\u6001\u503c\u4ee5\u6765\uff0c\u5b9a\u65f6\u5668\u5df2\u8fc7\u671f\u7684\u6b21\u6570\u3002"))),(0,a.kt)("p",null,"\u521d\u59cb\u5316\u65f6\u9700\u5bf9\u5230\u671f\u51fd\u6570\u548c\u505c\u6b62\u51fd\u6570\u8d4b\u503c\uff0c\u5c06\u5b9a\u65f6\u5668\u7684\u72b6\u6001\u8bbe\u7f6e\u4e3a\u96f6\uff0c\u5e76\u5c06\u5b9a\u65f6\u5668\u8bbe\u7f6e\u4e3a",(0,a.kt)("strong",{parentName:"p"},"\u505c\u6b62"),"\u72b6\u6001\u3002"),(0,a.kt)("p",null,"timer \u901a\u8fc7\u6307\u5b9a\u6301\u7eed\u65f6\u95f4\u548c\u5468\u671f\u6765",(0,a.kt)("strong",{parentName:"p"},"\u542f\u52a8"),"\u5b9a\u65f6\u5668\u3002\u3002\u5b9a\u65f6\u5668\u7684\u72b6\u6001\u91cd\u7f6e\u4e3a\u96f6\uff0c\u7136\u540e\u5b9a\u65f6\u5668\u8fdb\u5165",(0,a.kt)("strong",{parentName:"p"},"\u8fd0\u884c"),"\u72b6\u6001\u5e76\u5f00\u59cb\u5012\u8ba1\u65f6\u76f4\u5230\u5230\u671f\u3002"),(0,a.kt)("p",null,"\u8bf7\u6ce8\u610f\uff0c\u5b9a\u65f6\u5668\u7684\u6301\u7eed\u65f6\u95f4\u548c\u5468\u671f\u53c2\u6570\u6307\u5b9a\u5c06\u8981\u7ecf\u8fc7",(0,a.kt)("strong",{parentName:"p"},"\u6700\u5c0f\u5ef6\u8fdf"),"\u3002\u7531\u4e8e\u5185\u90e8\u7cfb\u7edf\u5b9a\u65f6\u5668\u7684\u7cbe\u5ea6\uff08\u4ee5\u53ca\u8fd0\u884c\u65f6\u7684\u4ea4\u4e92\uff0c\u5982\u4e2d\u65ad\u5ef6\u8fdf\uff09\uff0c\u901a\u8fc7\u4ece\u76f8\u5173\u7cfb\u7edf\u65f6\u95f4API\u8bfb\u53d6\u6765\u8861\u91cf\uff0c\u53ef\u80fd\u5df2\u7ecf\u8fc7\u53bb\u4e86\u66f4\u591a\u65f6\u95f4\u3002\u4f46\u4f46\u81f3\u5c11\u8fd9\u6bb5\u65f6\u95f4\u80af\u5b9a\u5df2\u7ecf\u8fc7\u53bb\u4e86\u3002"),(0,a.kt)("p",null,"\u5f53\u4e00\u4e2a\u6b63\u5728\u8fd0\u884c\u7684\u5b9a\u65f6\u5668\u5230\u671f\u65f6\u5b83\u7684\u72b6\u6001\u65f6\u9012\u589e\u7684\uff0c\u5e76\u4e14\u5b9a\u65f6\u5668\u6267\u884c\u5b83\u7684\u5230\u671f\u51fd\u6570\uff08\u5982\u679c\u5b58\u5728\u7684\u8bdd\uff09\uff1b\u5982\u679c\u4e00\u4e2a\u7ebf\u7a0b\u6b63\u5728\u7b49\u5f85\u5b9a\u65f6\u5668\uff0c\u5b83\u5c06\u4f1a\u88ab\u89e3\u9664\u963b\u585e\u72b6\u6001\u3002\u5982\u679c\u5b9a\u65f6\u5668\u7684\u5468\u671f\u4e3a\u96f6\uff0c\u90a3\u4e48\u5b9a\u65f6\u5668\u5c31\u4f1a\u8fdb\u5165\u505c\u6b62\u72b6\u6001\uff1b\u5426\u5219\u5b9a\u65f6\u5668\u91cd\u4f1a\u65b0\u542f\u52a8\uff0c\u5b83\u6301\u7eed\u65f6\u95f4\u7b49\u4e8e\u5b83\u7684\u5468\u671f"),(0,a.kt)("p",null,"\u5982\u679c\u6709\u9700\u8981\uff0c\u53ef\u4ee5\u5728\u5012\u8ba1\u65f6\u4e2d\u95f4\u505c\u6b62\u8fd0\u884c\u5b9a\u65f6\u5668\u3002\u5b9a\u65f6\u5668\u7684\u72b6\u6001\u4fdd\u6301\u4e0d\u53d8\uff0c\u7136\u540e\u5b9a\u65f6\u5668\u8fdb\u5165\u505c\u6b62\u72b6\u6001\u5e76\u6267\u884c\u5b83\u7684\u505c\u6b62\u51fd\u6570\uff08\u5982\u679c\u5b58\u5728\u7684\u8bdd\uff09\u3002\u5982\u679c\u4e00\u4e2a\u7ebf\u7a0b\u6b63\u5728\u7b49\u5f85\u5b9a\u65f6\u5668\uff0c\u5b83\u5c06\u4f1a\u88ab\u89e3\u9664\u963b\u585e\u72b6\u6001\u3002\u5141\u8bb8\u5c1d\u8bd5\u505c\u6b62\u672a\u8fd0\u884c\u7684\u5b9a\u65f6\u5668\uff0c\u4f46\u5bf9\u5b9a\u65f6\u5668\u6ca1\u6709\u5f71\u54cd\uff0c\u56e0\u4e3a\u5b83\u5df2\u7ecf\u505c\u6b62\u4e86\u3002"),(0,a.kt)("p",null,"\u5982\u679c\u6709\u9700\u8981\uff0c\u8fd0\u884c\u4e2d\u7684\u5b9a\u65f6\u5668\u53ef\u4ee5\u5728\u5012\u8ba1\u65f6\u4e2d\u95f4\u91cd\u65b0\u542f\u52a8\u3002\u5b9a\u65f6\u5668\u7684\u72b6\u6001\u91cd\u8bbe\u4e3a\u96f6\uff0c\u7136\u540e\u5b9a\u65f6\u5668\u4f7f\u7528\u8c03\u7528\u8005\u6307\u5b9a\u7684\u65b0\u7684\u6301\u7eed\u65f6\u95f4\u548c\u5468\u671f\u503c\u8fdb\u884c\u5012\u8ba1\u65f6\u3002\u5982\u679c\u4e00\u4e2a\u7ebf\u7a0b\u6b63\u5728\u7b49\u5f85\u5b9a\u65f6\u5668\uff0c\u5b83\u5c06\u4f1a\u7ee7\u7eed\u7b49\u5f85\u3002"),(0,a.kt)("p",null,"\u53ef\u4ee5\u968f\u65f6\u76f4\u63a5\u8bfb\u533a\u5b9a\u65f6\u5668\u7684\u72b6\u6001\uff0c\u7528\u6765\u786e\u8ba4\u81ea\u4e0a\u6b21\u8bfb\u53d6\u5176\u72b6\u6001\u4ee5\u6765\u5b9a\u65f6\u5668\u5df2\u8fc7\u671f\u7684\u6b21\u6570\u3002\u8bfb\u53d6\u5b9a\u65f6\u5668\u7684\u72b6\u6001\u4f1a\u628a\u5b83\u7684\u503c\u91cd\u7f6e\u4e3a\u96f6\u3002\u8fd8\u53ef\u4ee5\u8bfb\u53d6\u5b9a\u65f6\u5668\u5230\u671f\u524d\u7684\u5269\u4f59\u65f6\u95f4\uff1b\u96f6\u8868\u793a\u5b9a\u65f6\u5668\u5df2\u505c\u6b62\u3002"),(0,a.kt)("p",null,"\u7ebf\u7a0b\u53ef\u4ee5\u901a\u8fc7\u4e0e\u5b9a\u65f6\u5668",(0,a.kt)("strong",{parentName:"p"},"\u540c\u6b65"),"\u6765\u95f4\u63a5\u8bfb\u533a\u5b9a\u65f6\u5668\u72b6\u6001\u3002\u8fd9\u4f1a\u963b\u585e\u7ebf\u7a0b\uff0c\u76f4\u5230\u5b9a\u65f6\u5668\u72b6\u6001\u975e\u96f6\u4e3a\u6b62\uff08\u8868\u660e\u5b83\u81f3\u5c11\u5df2\u8fc7\u671f\u4e00\u6b21\uff09\u6216\u5b9a\u65f6\u5668\u505c\u6b62\uff1b\u5982\u679c\u5b9a\u65f6\u5668\u72b6\u6001\u5df2\u7ecf\u975e\u96f6\u6216\u5b9a\u65f6\u5668\u5df2\u7ecf\u505c\u6b62\uff0c\u5219\u7ebf\u7a0b\u7ee7\u7eed\u8fdb\u884c\u800c\u4e0d\u7b49\u5f85\u3002\u540c\u6b65\u64cd\u4f5c\u8fd4\u56de\u5b9a\u65f6\u5668\u7684\u72b6\u6001\u5e76\u5c06\u5b83\u91cd\u7f6e\u4e3a\u96f6\u3002"),(0,a.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"\u6ce8\u610f")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"\u53ea\u6709\u4e00\u4e2a\u7528\u6237\u5e94\u8be5\u68c0\u67e5\u4efb\u4f55\u7ed9\u5b9a\u5b9a\u65f6\u5668\u7684\u72b6\u6001\uff0c\u56e0\u4e3a\u8bfb\u53d6\u72b6\u6001\uff08\u76f4\u63a5\u6216\u95f4\u63a5\uff09\u4f1a\u6539\u53d8\u5b83\u7684\u503c\u3002\u7c7b\u4f3c\u5730\uff0c\u4e00\u6b21\u53ea\u80fd\u6709\u4e00\u4e2a\u7ebf\u7a0b\u4e0e\u7ed9\u5b9a\u7684\u5b9a\u65f6\u5668\u540c\u6b65\u3002ISR\u4e0d\u5141\u8bb8\u4e0e\u5b9a\u65f6\u5668\u540c\u6b65\uff0c\u56e0\u4e3aISR\u4e0d\u5141\u8bb8\u963b\u585e\u3002"))),(0,a.kt)("h2",{id:"\u5b9e\u73b0"},(0,a.kt)("span",{id:"impl"},"\u5b9e\u73b0")),(0,a.kt)("h3",{id:"\u5b9a\u4e49\u5b9a\u65f6\u5668"},(0,a.kt)("span",{id:"dat"},"\u5b9a\u4e49\u5b9a\u65f6\u5668")),(0,a.kt)("p",null,"\u5b9a\u65f6\u5668\u662f\u4f7f\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"k_timer")," \u7c7b\u578b\u5b9a\u4e49\u53d8\u91cf\u7684\u3002\u5fc5\u987b\u901a\u8fc7\u8c03\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"k_timer_init()")," \u6765\u521d\u59cb\u5316\u3002"),(0,a.kt)("p",null,"\u4e0b\u9762\u7684\u4ee3\u7801\u5b9a\u4e49\u5e76\u521d\u59cb\u5316\u4e86\u4e00\u4e2a\u5b9a\u65f6\u5668\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"struct k_timer my_timer;\nextern void my_expiry_function(struct k_timer *timer_id);\n\nk_timer_init(&my_timer, my_expiry_function, NULL);\n")),(0,a.kt)("p",null,"\u901a\u8fc7 ",(0,a.kt)("a",{parentName:"p",href:"https://docs.zephyrproject.org/2.7.0/reference/kernel/timing/timers.html#c.K_TIMER_DEFINE"},"K_TIMER_DEFINE")," \u5b9a\u4e49\u5b9a\u65f6\u5668\u540e\uff0c\u5b83\u5c06\u5728\u7f16\u8bd1\u65f6\u88ab\u5b9a\u4e49\u548c\u521d\u59cb\u5316\u3002"),(0,a.kt)("p",null,"\u4e0b\u9762\u7684\u4ee3\u7801\u4e0e\u4e0a\u9762\u7684\u4ee3\u7801\u5177\u6709\u76f8\u540c\u7684\u6548\u679c\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"K_TIMER_DEFINE(my_timer, my_expiry_function, NULL);\n")),(0,a.kt)("h3",{id:"\u4f7f\u7528\u5b9a\u65f6\u5668\u8fc7\u671f\u51fd\u6570"},(0,a.kt)("span",{id:"uatef"},"\u4f7f\u7528\u5b9a\u65f6\u5668\u8fc7\u671f\u51fd\u6570")),(0,a.kt)("p",null,"\u4e0b\u9762\u7684\u4ee3\u7801\u4f7f\u7528\u5b9a\u65f6\u5668\u5b9a\u671f\u6267\u884c\u91cd\u8981\u7684\u64cd\u4f5c\u3002\u7531\u4e8e\u4e0d\u80fd\u5728\u4e2d\u65ad\u7ea7\u522b\u5b8c\u6210\u6240\u9700\u7684\u4efb\u52a1\uff0c\u56e0\u6b64\u5b9a\u65f6\u5668\u7684\u5230\u671f\u51fd\u6570\u5c06\u4efb\u52a1\u9879\u63d0\u4ea4\u7ed9",(0,a.kt)("a",{parentName:"p",href:"/docs-csk6/chips/600X/kernel/workqueue"},"\u7cfb\u7edf\u5de5\u4f5c\u961f\u5217"),"\u7ebf\u7a0b\u6267\u884c\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"void my_work_handler(struct k_work *work)\n{\n    /* do the processing that needs to be done periodically */\n    ...\n}\n\nK_WORK_DEFINE(my_work, my_work_handler);\n\nvoid my_timer_handler(struct k_timer *dummy)\n{\n    k_work_submit(&my_work);\n}\n\nK_TIMER_DEFINE(my_timer, my_timer_handler, NULL);\n\n...\n\n/* start periodic timer that expires once every second */\nk_timer_start(&my_timer, K_SECONDS(1), K_SECONDS(1));\n")),(0,a.kt)("h3",{id:"\u8bfb\u53d6\u5b9a\u65f6\u5668\u72b6\u6001"},(0,a.kt)("span",{id:"rts"},"\u8bfb\u53d6\u5b9a\u65f6\u5668\u72b6\u6001")),(0,a.kt)("p",null,"\u4e0b\u9762\u7684\u4ee3\u7801\u76f4\u63a5\u8bfb\u53d6\u5b9a\u65f6\u5668\u7684\u72b6\u6001\u6765\u786e\u8ba4\u5b9a\u65f6\u5668\u662f\u5426\u5df2\u8fc7\u671f\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"K_TIMER_DEFINE(my_status_timer, NULL, NULL);\n\n...\n\n/* start one shot timer that expires after 200 ms */\nk_timer_start(&my_status_timer, K_MSEC(200), K_NO_WAIT);\n\n/* do work */\n...\n\n/* check timer status */\nif (k_timer_status_get(&my_status_timer) > 0) {\n    /* timer has expired */\n} else if (k_timer_remaining_get(&my_status_timer) == 0) {\n    /* timer was stopped (by someone else) before expiring */\n} else {\n    /* timer is still running */\n}\n")),(0,a.kt)("h3",{id:"\u4f7f\u7528\u5b9a\u65f6\u5668\u72b6\u6001\u540c\u6b65"},(0,a.kt)("span",{id:"utss"},"\u4f7f\u7528\u5b9a\u65f6\u5668\u72b6\u6001\u540c\u6b65")),(0,a.kt)("p",null,"\u4e0b\u9762\u7684\u4ee3\u7801\u6267\u884c\u5b9a\u65f6\u5668\u72b6\u6001\u540c\u6b65\u6765\u5141\u8bb8\u7ebf\u7a0b\u6267\u884c\u53ef\u7528\u7684\u4efb\u52a1\uff0c\u540c\u65f6\u786e\u4fdd\u8fd9\u534f\u8bae\u64cd\u4f5c\u6309\u6307\u5b9a\u7684\u65f6\u95f4\u95f4\u8ddd\u5206\u5f00\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"K_TIMER_DEFINE(my_sync_timer, NULL, NULL);\n\n...\n\n/* do first protocol operation */\n...\n\n/* start one shot timer that expires after 500 ms */\nk_timer_start(&my_sync_timer, K_MSEC(500), K_NO_WAIT);\n\n/* do other work */\n...\n\n/* ensure timer has expired (waiting for expiry, if necessary) */\nk_timer_status_sync(&my_sync_timer);\n\n/* do second protocol operation */\n...\n")),(0,a.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"\u6ce8\u610f")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"\u5982\u679c\u7ebf\u7a0b\u6ca1\u6709\u5176\u4ed6\u4efb\u52a1\u8981\u505a\uff0c\u5b83\u53ef\u4ee5\u7b80\u5355\u5730\u5728\u4e24\u4e2a\u534f\u8bae\u4e4b\u95f4\u4f11\u7720\uff0c\u800c\u4e0d\u9700\u8981\u4f7f\u7528\u5b9a\u65f6\u5668\u3002 "))),(0,a.kt)("h2",{id:"\u7528\u9014\u5efa\u8bae"},(0,a.kt)("span",{id:"su"},"\u7528\u9014\u5efa\u8bae")),(0,a.kt)("p",null,"\u4f7f\u7528\u5b9a\u65f6\u5668\u5728\u6307\u5b9a\u65f6\u95f4\u540e\u542f\u52a8\u5f02\u6b65\u64cd\u4f5c\u3002"),(0,a.kt)("p",null,"\u4f7f\u7528\u5b9a\u65f6\u5668\u786e\u5b9a\u662f\u5426\u7ecf\u8fc7\u4e86\u6307\u5b9a\u7684\u65f6\u95f4\u3002\u7279\u522b\u662f,\u5f53\u9700\u8981\u6bd4\u8f83\u7b80\u5355\u7684 ",(0,a.kt)("a",{parentName:"p",href:"#"},"k_sleep()")," \u548c ",(0,a.kt)("a",{parentName:"p",href:"#"},"k_usleep()")," \u8c03\u7528\u66f4\u9ad8\u7684\u7cbe\u5ea6\u548c/\u6216\u5355\u5143\u63a7\u5236\u65f6\uff0c\u5e94\u8be5\u4f7f\u7528\u5b9a\u65f6\u5668\u3002"),(0,a.kt)("p",null,"\u5728\u6267\u884c\u6d89\u53ca\u65f6\u95f4\u9650\u5236\u7684\u64cd\u4f5c\u65f6\uff0c\u5e94\u8be5\u4f7f\u7528\u5b9a\u65f6\u5668\u6267\u884c\u5176\u4ed6\u4efb\u52a1\u3002"),(0,a.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"\u6ce8\u610f")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"\u5982\u679c\u9700\u8981\u6d4b\u91cf\u7ebf\u7a0b\u6267\u884c\u64cd\u4f5c\u6240\u9700\u7684\u65f6\u95f4\uff0c\u5b83\u53ef\u4ee5\u76f4\u63a5\u8bfb\u53d6",(0,a.kt)("a",{parentName:"p",href:"#"},"\u7cfb\u7edf\u65f6\u949f\u6216\u786c\u4ef6\u65f6\u949f"),",\u800c\u4e0d\u662f\u4f7f\u7528\u5b9a\u65f6\u5668\u3002"))),(0,a.kt)("h2",{id:"\u914d\u7f6e\u9009\u9879"},(0,a.kt)("span",{id:"co"},"\u914d\u7f6e\u9009\u9879")),(0,a.kt)("p",null,"\u76f8\u5173\u914d\u7f6e\u9009\u9879\uff1a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"None\n\u6ca1\u6709")),(0,a.kt)("h2",{id:"api\u53c2\u8003"},(0,a.kt)("span",{id:"apiref"},"API\u53c2\u8003")),(0,a.kt)("p",null,"\u8be6\u60c5\u8bf7\u6253\u5f00",(0,a.kt)("a",{parentName:"p",href:"https://docs.zephyrproject.org/2.7.0/reference/kernel/timing/timers.html#api-reference"},"API\u53c2\u8003"),"\u3002"),(0,a.kt)("p",null,"\u76f8\u5173\u793a\u4f8b\u8bf7\u67e5\u770b",(0,a.kt)("a",{parentName:"p",href:"/docs-csk6/chips/600X/application/kernel/timer"},"sample/timers"),"\u3002"))}o.isMDXComponent=!0}}]);