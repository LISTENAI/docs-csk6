"use strict";(self.webpackChunkls_docs_web=self.webpackChunkls_docs_web||[]).push([[9919],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>d});var r=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var p=r.createContext({}),c=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},s=function(e){var t=c(e.components);return r.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,p=e.parentName,s=a(e,["components","mdxType","originalType","parentName"]),m=c(n),d=i,f=m["".concat(p,".").concat(d)]||m[d]||u[d]||o;return n?r.createElement(f,l(l({ref:t},s),{},{components:n})):r.createElement(f,l({ref:t},s))}));function d(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,l=new Array(o);l[0]=m;var a={};for(var p in t)hasOwnProperty.call(t,p)&&(a[p]=t[p]);a.originalType=e,a.mdxType="string"==typeof e?e:i,l[1]=a;for(var c=2;c<o;c++)l[c]=n[c];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},81e3:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>l,default:()=>s,frontMatter:()=>o,metadata:()=>a,toc:()=>p});var r=n(87462),i=(n(67294),n(3905));const o={},l="\u8bbe\u5907\u6811 VS Kconfig",a={unversionedId:"chips/600X/build/dts/dt_vs_kconfig",id:"chips/600X/build/dts/dt_vs_kconfig",isDocsHomePage:!1,title:"\u8bbe\u5907\u6811 VS Kconfig",description:"\u9664\u4e86\u8bbe\u5907\u6811\uff0c Zephyr \u8fd8\u4f7f\u7528 Kconfig \u8bed\u8a00\u6765\u914d\u7f6e\u6e90\u4ee3\u7801\u3002\u5728\u5b9e\u73b0\u4ee3\u7801\u65f6\uff0c\u9009\u62e9\u8bbe\u5907\u6811\u8fd8\u662f Kconfig \u6709\u65f6\u4f1a\u4ee4\u4eba\u56f0\u60d1\u3002\u672c\u7ae0\u8282\u65e8\u5728\u5e2e\u52a9\u4f60\u9762\u5bf9\u8be5\u96be\u9898\u65f6\u53ef\u505a\u51fa\u51b3\u5b9a\u3002",source:"@site/docs/chips/600X/build/dts/dt_vs_kconfig.md",sourceDirName:"chips/600X/build/dts",slug:"/chips/600X/build/dts/dt_vs_kconfig",permalink:"/docs-csk6/chips/600X/build/dts/dt_vs_kconfig",version:"current",frontMatter:{},sidebar:"docs/chips/600X",previous:{title:"\u7591\u96be\u89e3\u7b54",permalink:"/docs-csk6/chips/600X/build/dts/troubleshooting"},next:{title:"\u6982\u8ff0",permalink:"/docs-csk6/chips/600X/build/kconfig/overview"}},p=[],c={toc:p};function s(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"\u8bbe\u5907\u6811-vs-kconfig"},"\u8bbe\u5907\u6811 VS Kconfig"),(0,i.kt)("p",null,"\u9664\u4e86\u8bbe\u5907\u6811\uff0c Zephyr \u8fd8\u4f7f\u7528 Kconfig \u8bed\u8a00\u6765\u914d\u7f6e\u6e90\u4ee3\u7801\u3002\u5728\u5b9e\u73b0\u4ee3\u7801\u65f6\uff0c\u9009\u62e9\u8bbe\u5907\u6811\u8fd8\u662f Kconfig \u6709\u65f6\u4f1a\u4ee4\u4eba\u56f0\u60d1\u3002\u672c\u7ae0\u8282\u65e8\u5728\u5e2e\u52a9\u4f60\u9762\u5bf9\u8be5\u96be\u9898\u65f6\u53ef\u505a\u51fa\u51b3\u5b9a\u3002"),(0,i.kt)("p",null,"\u7b80\u800c\u8a00\u4e4b\uff1a"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"\u8bbe\u5907\u6811\u7528\u4e8e\u63cf\u8ff0 ",(0,i.kt)("strong",{parentName:"li"},"\u786c\u4ef6")," \u53ca\u5176 ",(0,i.kt)("strong",{parentName:"li"},"\u542f\u52a8\u65f6\u914d\u7f6e")," \u3002\u4f8b\u5982\uff0c\u5f00\u53d1\u677f\u4e0a\u7684\u5916\u8bbe\u3001\u542f\u52a8\u65f6\u8bbe\u7f6e\u7684\u65f6\u949f\u9891\u7387\u3001\u4e2d\u65ad\u7ebf\u8def\u7b49\u3002"),(0,i.kt)("li",{parentName:"ul"},"Kconfig \u7528\u4e8e\u914d\u7f6e ",(0,i.kt)("strong",{parentName:"li"},"\u8f6f\u4ef6\u652f\u6301")," \u6765\u6784\u5efa\u5230\u6700\u7ec8\u955c\u50cf\u4e2d\u3002\u4f8b\u5982\uff0c\u662f\u5426\u6dfb\u52a0\u7f51\u7edc\u652f\u6301\u3001\u5e94\u7528\u7a0b\u5e8f\u9700\u8981\u54ea\u4e9b\u9a71\u52a8\u7a0b\u5e8f\u7b49\u3002")),(0,i.kt)("p",null,"\u6362\u53e5\u8bdd\u8bf4\uff0c\u8bbe\u5907\u6811\u4e3b\u8981\u5904\u7406\u786c\u4ef6\uff0c\u800c Kconfig \u5219\u8d1f\u8d23\u8f6f\u4ef6\u3002"),(0,i.kt)("p",null,"\u4f8b\u5982\uff0c\u5047\u8bbe\u4e00\u4e2a\u5305\u542b\u5177\u6709 2 \u4e2a UART \u6216\u4e32\u884c\u7aef\u53e3\u5b9e\u4f8b\u7684 SoC \u7684\u5f00\u53d1\u677f\u3002"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"\u4e8b\u5b9e\u4e0a\uff0c\u5177\u6709\u6b64 UART ",(0,i.kt)("strong",{parentName:"li"},"\u786c\u4ef6")," \u7684\u5f00\u53d1\u677f\uff0c\u5c06\u901a\u8fc7\u8bbe\u5907\u6811\u4e2d\u7684\u4e24\u4e2a UART \u8282\u70b9\u8fdb\u884c\u63cf\u8ff0\u3002\u8fd9\u4e9b\u8bbe\u5907\u6811\u6570\u636e\u63d0\u4f9b\u4e86 UART \u7c7b\u578b\uff08\u901a\u8fc7 ",(0,i.kt)("inlineCode",{parentName:"li"},"compatible")," \u5c5e\u6027\uff09\u548c\u67d0\u4e9b\u8bbe\u7f6e\uff0c\u4f8b\u5982\u5185\u5b58\u4e2d\u786c\u4ef6\u5916\u8bbe\u5bc4\u5b58\u5668\u7684\u5730\u5740\u8303\u56f4\uff08\u901a\u8fc7 ",(0,i.kt)("inlineCode",{parentName:"li"},"reg")," \u5c5e\u6027\uff09\u3002"),(0,i.kt)("li",{parentName:"ul"},"\u6b64\u5916\uff0c\u8bbe\u5907\u6811\u8fd8\u63cf\u8ff0\u4e86 UART ",(0,i.kt)("strong",{parentName:"li"},"\u542f\u52a8\u65f6\u7684\u914d\u7f6e")," \u3002\u5176\u4e2d\u53ef\u80fd\u5305\u62ec\u8bf8\u5982 RX IRQ \u7ebf\u8def\u7684\u4f18\u5148\u7ea7\u548c UART \u6ce2\u7279\u7387\u7b49\u914d\u7f6e\u3002\u8fd9\u4e9b\u914d\u7f6e\u53ef\u4ee5\u5728\u8fd0\u884c\u65f6\u4fee\u6539\uff0c\u4f46\u5b83\u4eec\u542f\u52a8\u65f6\u7684\u914d\u7f6e\u5728\u8bbe\u5907\u6811\u4e2d\u63cf\u8ff0\u3002"),(0,i.kt)("li",{parentName:"ul"},"\u662f\u5426\u5728\u6784\u5efa\u4e2d\u5305\u542b\u5bf9 UART \u7684 ",(0,i.kt)("strong",{parentName:"li"},"\u8f6f\u4ef6\u652f\u6301")," \uff0c\u662f\u901a\u8fc7 Kconfig \u63a7\u5236\u7684\u3002\u4e0d\u9700\u8981\u4f7f\u7528 UART \u7684\u5e94\u7528\u7a0b\u5e8f\u53ef\u4ee5\u4f7f\u7528 Kconfig \u4ece\u6784\u5efa\u4e2d\u5220\u9664\u914d\u7f6e\u6b64\u9a71\u52a8\u7a0b\u5e8f\uff08\u4f8b\u5982 ",(0,i.kt)("inlineCode",{parentName:"li"},"CONFIG_UART=n")," \uff09\uff0c\u5373\u4f7f\u5f00\u53d1\u677f\u7684\u8bbe\u5907\u6811\u4ecd\u4fdd\u7559 UART \u8282\u70b9\u3002")),(0,i.kt)("p",null,"\u518d\u4e3e\u4e00\u4e2a\u4f8b\u5b50\uff0c\u5047\u8bbe\u4e00\u4e2a\u8bbe\u5907\u5177\u6709 2.4GHz\u3001\u591a\u534f\u8bae\uff08\u540c\u65f6\u652f\u6301\u4f4e\u529f\u8017\u84dd\u7259\u548c 802.15.4 \u65e0\u7ebf\u6280\u672f\uff09\u65e0\u7ebf\u7535\u3002"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"\u8bbe\u5907\u6811\u5e94\u8be5\u7528\u4e8e\u63cf\u8ff0\u65e0\u7ebf\u7535 ",(0,i.kt)("strong",{parentName:"li"},"\u786c\u4ef6")," \u7684\u5b58\u5728\u3001\u5b83\u4e0e\u4ec0\u4e48\u9a71\u52a8\u7a0b\u5e8f\u517c\u5bb9\uff0c\u7b49\u7b49\u3002"),(0,i.kt)("li",{parentName:"ul"},"\u65e0\u7ebf\u7535\u786c\u4ef6 ",(0,i.kt)("strong",{parentName:"li"},"\u542f\u52a8\u65f6\u7684\u914d\u7f6e")," \u4e5f\u5e94\u5728\u8bbe\u5907\u6811\u4e2d\u6307\u5b9a\uff0c\u4f8b\u5982\u4ee5 dBm \u4e3a\u5355\u4f4d\u7684 TX \u529f\u7387\u3002"),(0,i.kt)("li",{parentName:"ul"},"Kconfig \u5e94\u7528\u4e8e\u51b3\u5b9a\u4e3a\u65e0\u7ebf\u7535\u6784\u5efa\u54ea\u4e9b ",(0,i.kt)("strong",{parentName:"li"},"\u8f6f\u4ef6\u529f\u80fd")," \uff0c\u4f8b\u5982\u9009\u62e9 BLE \u6216 802.15.4 \u534f\u8bae\u6808\u3002")),(0,i.kt)("p",null,"\u4f5c\u4e3a\u53e6\u4e00\u4e2a\u793a\u4f8b\uff0c\u66fe\u7ecf\u5b58\u5728\u4e00\u4e9b Kconfig \u9009\u9879\u53ef\u7528\u4e8e\u542f\u7528\u7279\u5b9a\u9a71\u52a8\u7a0b\u5e8f\u5b9e\u4f8b\uff0c\u4f46\u5982\u4eca\u90fd\u5df2\u88ab\u5220\u9664\u3002\u4f60\u5e94\u8be5\u5728\u8bbe\u5907\u6811\u4e2d\uff0c\u627e\u5230\u76f8\u5e94\u7684\u786c\u4ef6\u5b9e\u4f8b\u4e0a\u4e3a\u8bbe\u5907\u914d\u7f6e ",(0,i.kt)("a",{parentName:"p",href:"https://docs.zephyrproject.org/latest/build/dts/intro.html#dt-important-props"},"status")," \u5173\u952e\u5b57\uff0c\u4ee5\u8868\u793a\u662f\u5426\u542f\u7528\u6b64\u8bbe\u5907\u9a71\u52a8\u3002"),(0,i.kt)("p",null,"\u8fd9\u4e9b\u89c4\u5219\u6709\u4e00\u4e9b ",(0,i.kt)("strong",{parentName:"p"},"\u4f8b\u5916")," \u60c5\u51b5\uff1a"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"\u7531\u4e8e Kconfig \u65e0\u6cd5\u7075\u6d3b\u63a7\u5236\u4e00\u4e9b\u7279\u5b9a\u4e8e\u5b9e\u4f8b\u7684\u9a71\u52a8\u914d\u7f6e\u53c2\u6570\uff0c\u4f8b\u5982\u5185\u90e8\u7f13\u51b2\u533a\u7684\u5927\u5c0f\uff0c\u8fd9\u4e9b\u9009\u9879\u53ef\u80fd\u5728\u8bbe\u5907\u6811\u4e2d\u5b9a\u4e49\u3002\u4f46\u662f\uff0c\u4e3a\u4e86\u660e\u786e\u5b83\u4eec\u4e0d\u5c5e\u4e8e\u786c\u4ef6\u63cf\u8ff0\u6216\u914d\u7f6e\uff0c\u800c\u662f\u7279\u5b9a\u4e8e Zephyr \u9a71\u52a8\u7a0b\u5e8f\u7684\uff0c\u8fd9\u4e9b\u5c5e\u6027\u5e94\u8be5\u4ee5 ",(0,i.kt)("inlineCode",{parentName:"li"},"zephyr,")," \u4e3a\u524d\u7f00\uff0c\u4f8b\u5982\u5728\u4ee5\u592a\u7f51\u8bbe\u5907\u6811\u901a\u7528\u5c5e\u6027\u4e2d\u7684 ",(0,i.kt)("inlineCode",{parentName:"li"},"zephyr,random-mac-address")," \u3002"),(0,i.kt)("li",{parentName:"ul"},"\u8bbe\u5907\u6811\u4e2d\u7684 ",(0,i.kt)("inlineCode",{parentName:"li"},"chosen")," \u5173\u952e\u5b57\uff0c\u5141\u8bb8\u7528\u6237\u51fa\u4e8e\u7279\u5b9a\u76ee\u7684\u9009\u62e9\u786c\u4ef6\u8bbe\u5907\u7684\u6307\u5b9a\u5b9e\u4f8b\uff0c\u5b83\u672c\u8d28\u4e0a\u662f\u7528\u4e8e\u6307\u5b9a\u67d0\u4e9b ",(0,i.kt)("strong",{parentName:"li"},"\u8f6f\u4ef6\u652f\u6301")," \u3002\u8fd9\u65b9\u9762\u7684\u4e00\u4e2a\u4f8b\u5b50\u662f\u9009\u62e9\u4e00\u4e2a\u7279\u5b9a\u7684 UART \u7528\u4f5c\u7cfb\u7edf\u7684\u63a7\u5236\u53f0\u3002")))}s.isMDXComponent=!0}}]);