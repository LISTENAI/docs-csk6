"use strict";(self.webpackChunkls_docs_web=self.webpackChunkls_docs_web||[]).push([[4797],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>u});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=a.createContext({}),m=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},d=function(e){var t=m(e.components);return a.createElement(o.Provider,{value:t},e.children)},k={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},s=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,o=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),s=m(n),u=r,c=s["".concat(o,".").concat(u)]||s[u]||k[u]||l;return n?a.createElement(c,p(p({ref:t},d),{},{components:n})):a.createElement(c,p({ref:t},d))}));function u(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,p=new Array(l);p[0]=s;var i={};for(var o in t)hasOwnProperty.call(t,o)&&(i[o]=t[o]);i.originalType=e,i.mdxType="string"==typeof e?e:r,p[1]=i;for(var m=2;m<l;m++)p[m]=n[m];return a.createElement.apply(null,p)}return a.createElement.apply(null,n)}s.displayName="MDXCreateElement"},58728:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>p,default:()=>d,frontMatter:()=>l,metadata:()=>i,toc:()=>o});var a=n(87462),r=(n(67294),n(3905));const l={},p="\u7ebf\u7a0b\u95f4\u540c\u6b65\u4e4b\u4fe1\u53f7\u91cf",i={unversionedId:"chips/600X/application/kernel/sync_semaphore",id:"chips/600X/application/kernel/sync_semaphore",isDocsHomePage:!1,title:"\u7ebf\u7a0b\u95f4\u540c\u6b65\u4e4b\u4fe1\u53f7\u91cf",description:"\u6982\u8ff0",source:"@site/docs/chips/600X/application/kernel/sync_semaphore.md",sourceDirName:"chips/600X/application/kernel",slug:"/chips/600X/application/kernel/sync_semaphore",permalink:"/docs-csk6/chips/600X/application/kernel/sync_semaphore",version:"current",frontMatter:{},sidebar:"docs/chips/600X",previous:{title:"\u591a\u7ebf\u7a0b",permalink:"/docs-csk6/chips/600X/application/kernel/multithread"},next:{title:"\u7ebf\u7a0b\u95f4\u540c\u6b65\u4e4b\u4e92\u65a5\u91cf",permalink:"/docs-csk6/chips/600X/application/kernel/sync_mutex"}},o=[{value:"\u6982\u8ff0",id:"\u6982\u8ff0",children:[]},{value:"\u4fe1\u53f7\u91cf(Semaphore)",id:"\u4fe1\u53f7\u91cfsemaphore",children:[{value:"\u5e38\u7528API\u63a5\u53e3",id:"\u5e38\u7528api\u63a5\u53e3",children:[]},{value:"K_SEM_DEFINE",id:"k_sem_define",children:[]},{value:"k_sem_init",id:"k_sem_init",children:[]},{value:"k_sem_take",id:"k_sem_take",children:[]},{value:"k_sem_give",id:"k_sem_give",children:[]},{value:"\u4fe1\u53f7\u91cf\u7684\u4f7f\u7528",id:"\u4fe1\u53f7\u91cf\u7684\u4f7f\u7528",children:[]}]},{value:"\u83b7\u53d6sample\u9879\u76ee",id:"\u83b7\u53d6sample\u9879\u76ee",children:[]},{value:"\u4ee3\u7801\u5b9e\u73b0",id:"\u4ee3\u7801\u5b9e\u73b0",children:[]},{value:"\u7f16\u8bd1\u548c\u70e7\u5f55",id:"\u7f16\u8bd1\u548c\u70e7\u5f55",children:[]}],m={toc:o};function d(e){let{components:t,...l}=e;return(0,r.kt)("wrapper",(0,a.Z)({},m,l,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"\u7ebf\u7a0b\u95f4\u540c\u6b65\u4e4b\u4fe1\u53f7\u91cf"},"\u7ebf\u7a0b\u95f4\u540c\u6b65\u4e4b\u4fe1\u53f7\u91cf"),(0,r.kt)("h2",{id:"\u6982\u8ff0"},"\u6982\u8ff0"),(0,r.kt)("p",null,"\u5e94\u7528\u5f00\u53d1\u4f7f\u7528\u591a\u7ebf\u7a0b\u7684\u60c5\u51b5\u4e0b\uff0c\u5404\u4e2a\u7ebf\u7a0b\u5728\u8fd0\u884c\u65f6\u4f1a\u88ab\u8c03\u5ea6\u5668\u540c\u65f6\u8c03\u5ea6\uff0c\u4ece\u7cfb\u7edf\u5c42\u9762\u6765\u770b\u7ebf\u7a0b\u662f\u5e76\u884c\u8fd0\u884c\uff0c\u7cfb\u7edf\u5bf9\u5e76\u884c\u8fd0\u884c\u7684\u7ebf\u7a0b\u6709\u5148\u540e\u6267\u884c\u7684\u8981\u6c42\uff0c\u56e0\u6b64\u591a\u7ebf\u7a0b\u95f4\u5728\u5b58\u5728\u8d44\u6e90\u5171\u4eab\u6216\u914d\u5408\u7684\u60c5\u51b5\u65f6\u5c31\u9700\u8981\u7ebf\u7a0b\u540c\u6b65\u529f\u80fd\u3002"),(0,r.kt)("p",null,"\u5d4c\u5165\u5f0f\u64cd\u4f5c\u7cfb\u7edf\u90fd\u4f1a\u63d0\u4f9b\u7ebf\u7a0b\u540c\u6b65\u624b\u6bb5\uff0cZephyr\u4e5f\u4e0d\u4f8b\u5916\uff0cZephyr\u63d0\u4f9b\u4e86\u4fe1\u53f7\u91cf\uff0c\u4e92\u65a5\u9501\uff0c\u8f6e\u8be2\u4e09\u79cd\u5185\u6838\u5bf9\u8c61\u4f5c\u4e3a\u591a\u7ebf\u7a0b\u540c\u6b65\u7684\u65b9\u5f0f\u3002"),(0,r.kt)("p",null,"\u5728\u4e0a\u4e00\u4e2a\u7ae0\u8282-\u591a\u7ebf\u7a0b\u793a\u4f8b\u4e2d\uff0c\u4e24\u4e2a\u7ebf\u7a0b\u5206\u522b\u6267\u884c\u4e86\u5404\u81ea\u65e5\u5fd7\u8f93\u51fa\u7684\u4efb\u52a1\uff0c\u7136\u800c\u5728\u5b9e\u9645\u7684\u9879\u76ee\u5f00\u53d1\u4e2d\u5f80\u5f80\u4f1a\u9047\u5230\u591a\u4e2a\u7ebf\u7a0b\u534f\u540c\u6216\u9700\u8981\u64cd\u4f5c\u540c\u4e00\u4e2a\u51fd\u6570\u7684\u573a\u666f\uff0c\u6b64\u65f6\u5c31\u9700\u8981\u7528\u5230\u4fe1\u53f7\u91cf\u3002"),(0,r.kt)("p",null,"\u672c\u7ae0\u8282\u5728\u4e0a\u4e2a\u7ae0\u8282-\u540c\u6b65\u4e4b\u591a\u7ebf\u7a0b\u57fa\u7840\u4e0a\u8bb2\u89e3\u4fe1\u53f7\u91cf\u7684\u4f7f\u7528\u573a\u666f\u548c\u4f7f\u7528\u65b9\u6cd5\uff0c\u901a\u8fc7\u672c\u7ae0\u8282\u5b66\u4e60\uff0c\u5f00\u53d1\u8005\u53ef\u4ee5\u4e86\u89e3\u5230\uff1a"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u4fe1\u53f7\u91cf\u7684\u57fa\u672c\u4fe1\u606f\u548c\u4f7f\u7528\u573a\u666f"),(0,r.kt)("li",{parentName:"ul"},"\u4fe1\u53f7\u91cf\u7684\u4f7f\u7528\u65b9\u6cd5")),(0,r.kt)("h2",{id:"\u4fe1\u53f7\u91cfsemaphore"},"\u4fe1\u53f7\u91cf(Semaphore)"),(0,r.kt)("p",null,"\u4fe1\u53f7\u91cf\u662f\u7528\u4e8e\u63a7\u5236\u591a\u4e2a\u7ebf\u7a0b\u5bf9\u4e00\u7ec4\u8d44\u6e90\u7684\u8bbf\u95ee\uff0c\u4f7f\u7528\u4fe1\u53f7\u91cf\u5728\u751f\u4ea7\u8005(ISR/Thread)\u548c\u6d88\u8d39\u8005(ISR/Thread)\u4e4b\u95f4\u540c\u6b65\u3002\n\u4fe1\u53f7\u91cf\u6709\u4ee5\u4e0b\u7279\u6027\uff1a"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Zephyr\u7684\u4fe1\u53f7\u91cf\u5728\u521d\u59cb\u5316\u65f6\u53ef\u4ee5\u6307\u5b9a\u521d\u59cb\u5316\u8ba1\u6570\u503c\u548c\u6700\u5927\u8ba1\u6570\u503c\uff0c\u751f\u4ea7\u8005\u91ca\u653e(give)\u4fe1\u53f7\u91cf\u65f6\u8ba1\u6570\u503c+1\uff0c\u4f46\u4e0d\u4f1a\u8d85\u8fc7\u6700\u5927\u503c\uff0c\u6d88\u8d39\u8005\u83b7\u53d6(take)\u65f6\u8ba1\u6570\u503c-1\uff0c\u76f4\u5230\u4e3a0\u3002"),(0,r.kt)("li",{parentName:"ul"},"\u6bcf\u6b21\u4fe1\u53f7\u91cf\u91ca\u653e\u65f6\u90fd\u4f1a\u5f15\u53d1\u8c03\u5ea6\u3002"),(0,r.kt)("li",{parentName:"ul"},"\u5982\u679c\u591a\u4e2a\u7ebf\u7a0b\u90fd\u5728\u7b49\u5f85\u4fe1\u53f7\u91cf\uff0c\u65b0\u4ea7\u751f\u7684\u4fe1\u53f7\u91cf\u4f1a\u88ab\u7b49\u5f85\u65f6\u95f4\u6700\u957f\u7684\u6700\u9ad8\u4f18\u5148\u7ea7\u7ebf\u7a0b\u63a5\u6536\u3002")),(0,r.kt)("h3",{id:"\u5e38\u7528api\u63a5\u53e3"},"\u5e38\u7528API\u63a5\u53e3"),(0,r.kt)("h3",{id:"k_sem_define"},"K_SEM_DEFINE"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-c"},"K_SEM_DEFINE(name, initial_count, count_limit)\n")),(0,r.kt)("p",null,"\u9759\u6001\u5b9a\u4e49\u5e76\u521d\u59cb\u5316\u4fe1\u53f7\u91cf\uff0c\u4f7f\u7528\u4fe1\u53f7\u91cf\u9700\u8981\u5305\u542b\u5934\u6587\u4ef6",(0,r.kt)("inlineCode",{parentName:"p"},"#include <zephyr/kernel.h>"),"\uff0c\u8be5\u4fe1\u53f7\u91cf\u53ef\u4ee5\u5728\u5b9a\u4e49\u7684\u6a21\u5757\u4e4b\u5916\u53bb\u4f7f\u7528\uff0c\u4f46\u662f\u9700\u8981\u505a\u5982\u4e0b\u58f0\u660e\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-c"}," extern struct k_sem <name>;\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\u53c2\u6570\u8bf4\u660e")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"\u5b57\u6bb5"),(0,r.kt)("th",{parentName:"tr",align:null},"\u8bf4\u660e"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"name"),(0,r.kt)("td",{parentName:"tr",align:null},"\u4fe1\u53f7\u91cf\u540d\u5b57")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"initial_count"),(0,r.kt)("td",{parentName:"tr",align:null},"\u521d\u59cb\u5316\u4fe1\u53f7\u91cf\u7684\u8d77\u59cb\u8ba1\u6570\u503c")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"count_limit"),(0,r.kt)("td",{parentName:"tr",align:null},"\u4fe1\u53f7\u91cf\u8ba1\u6570\u6700\u5927\u503c\uff0c\u8be5\u503c\u4e0d\u80fd\u8d85\u8fc7\u4fe1\u53f7\u91cf\u5141\u8bb8\u7684\u6700\u5927\u503c",(0,r.kt)("inlineCode",{parentName:"td"},"K_SEM_MAX_LIMIT"))))),(0,r.kt)("br",null),(0,r.kt)("h3",{id:"k_sem_init"},"k_sem_init"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-c"},"int k_sem_init(struct k_sem *sem, unsigned int initial_count, unsigned int limit);\n")),(0,r.kt)("p",null,"\u521d\u59cb\u5316\u4fe1\u53f7\u91cf\uff0c\u4fe1\u53f7\u91cf\u5728\u4f7f\u7528\u4e4b\u524d\u5fc5\u987b\u5148\u8fdb\u884c\u521d\u59cb\u5316\uff0c\u4e0e",(0,r.kt)("inlineCode",{parentName:"p"},"K_SEM_DEFINE"),"\u7684\u533a\u522b\u662f",(0,r.kt)("inlineCode",{parentName:"p"},"k_sem_init"),"\u4f7f\u7528\u7684\u4fe1\u53f7\u91cf\u9700\u8981\u5148\u8fdb\u884c\u58f0\u660e\u5b9a\u4e49\u3002"),(0,r.kt)("p",null,"\u6210\u529f\u8fd4\u56de0\uff0c\u5931\u8d25\u8fd4\u56de\u975e0\u3002"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\u53c2\u6570\u8bf4\u660e")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"\u5b57\u6bb5"),(0,r.kt)("th",{parentName:"tr",align:null},"\u8bf4\u660e"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"sem"),(0,r.kt)("td",{parentName:"tr",align:null},"\u4fe1\u53f7\u91cf\u6307\u9488\uff0c\u8fd9\u91cc\u4f20\u5165\u7684\u4fe1\u53f7\u91cf\u6307\u9488\u9700\u8981\u5148\u8fdb\u884c\u58f0\u660e\u5b9a\u4e49")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"initial_count"),(0,r.kt)("td",{parentName:"tr",align:null},"\u521d\u59cb\u5316\u4fe1\u53f7\u91cf\u7684\u8d77\u59cb\u8ba1\u6570\u503c")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"limit"),(0,r.kt)("td",{parentName:"tr",align:null},"\u4fe1\u53f7\u91cf\u8ba1\u6570\u6700\u5927\u503c\uff0c\u8be5\u503c\u4e0d\u80fd\u8d85\u8fc7\u4fe1\u53f7\u91cf\u5141\u8bb8\u7684\u6700\u5927\u503c",(0,r.kt)("inlineCode",{parentName:"td"},"K_SEM_MAX_LIMIT"))))),(0,r.kt)("br",null),(0,r.kt)("h3",{id:"k_sem_take"},"k_sem_take"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-c"},"int k_sem_take(struct k_sem *sem, k_timeout_t timeout);\n")),(0,r.kt)("p",null,"\u83b7\u53d6\u4fe1\u53f7\u91cf\u3002\u8be5\u51fd\u6570\u53ef\u7528\u4e8e\u4e2d\u65ad\u5904\u7406\u51fd\u6570\uff0c\u4f46",(0,r.kt)("inlineCode",{parentName:"p"},"timeout"),"\u5fc5\u987b\u8bbe\u7f6e\u6210",(0,r.kt)("inlineCode",{parentName:"p"},"K_NO_WAIT"),"\u3002"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\u53c2\u6570\u8bf4\u660e")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"\u5b57\u6bb5"),(0,r.kt)("th",{parentName:"tr",align:null},"\u8bf4\u660e"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"sem"),(0,r.kt)("td",{parentName:"tr",align:null},"\u4fe1\u53f7\u91cf\u6307\u9488")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"timeout"),(0,r.kt)("td",{parentName:"tr",align:null},"\u7b49\u5f85\u4fe1\u53f7\u91cf\u7684\u65f6\u95f4\uff0c\u6216\u8005\u53ef\u4ee5\u6307\u5b9a\u8bbe\u7f6e\u6210",(0,r.kt)("inlineCode",{parentName:"td"},"K_NO_WAIT"),"\u6216",(0,r.kt)("inlineCode",{parentName:"td"},"K_FOREVER"))))),(0,r.kt)("br",null),(0,r.kt)("h3",{id:"k_sem_give"},"k_sem_give"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-c"},"void k_sem_give(struct k_sem *sem);\n")),(0,r.kt)("p",null,"\u91ca\u653e\u4fe1\u53f7\u91cf\u3002\u8be5\u51fd\u6570\u53ef\u7528\u4e8e\u4e2d\u65ad\u5904\u7406\u51fd\u6570\uff0c\u4f46",(0,r.kt)("inlineCode",{parentName:"p"},"timeout"),"\u5fc5\u987b\u8bbe\u7f6e\u6210",(0,r.kt)("inlineCode",{parentName:"p"},"K_NO_WAIT"),"\u3002"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\u53c2\u6570\u8bf4\u660e")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"\u5b57\u6bb5"),(0,r.kt)("th",{parentName:"tr",align:null},"\u8bf4\u660e"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"sem"),(0,r.kt)("td",{parentName:"tr",align:null},"\u4fe1\u53f7\u91cf\u6307\u9488")))),(0,r.kt)("p",null,"\u66f4\u591a",(0,r.kt)("inlineCode",{parentName:"p"},"Semaphore API"),"\u63a5\u53e3 \u53ef\u4ee5\u5728zephyr\u5b98\u7f51",(0,r.kt)("a",{parentName:"p",href:"https://docs.zephyrproject.org/latest/doxygen/html/group__semaphore__apis.html"},"Semaphore APIS"),"\u4e2d\u627e\u5230\u3002"),(0,r.kt)("br",null),(0,r.kt)("h3",{id:"\u4fe1\u53f7\u91cf\u7684\u4f7f\u7528"},"\u4fe1\u53f7\u91cf\u7684\u4f7f\u7528"),(0,r.kt)("p",null,"\u4fe1\u53f7\u91cf\u4f7f\u7528\u9700\u8981\u5305\u542b\u5934\u6587\u4ef6",(0,r.kt)("inlineCode",{parentName:"p"},"#include <zephyr/kernel.h>")),(0,r.kt)("p",null,"\u4ee5\u4e0b\u662f\u4e00\u4e2a\u4fe1\u53f7\u91cf\u4f7f\u7528\u4f8b\u7a0b\uff0c\u8be5\u793a\u4f8b\u521b\u5efa\u4e86\u4e00\u4e2a\u52a8\u6001\u4fe1\u53f7\u91cf\uff0c\u521d\u59cb\u5316\u4e24\u4e2a\u7ebf\u7a0b\uff0c\u5176\u4e2d\u4e00\u4e2a\u7ebf\u7a0b\u53d1\u9001\u4fe1\u53f7\u91cf\uff0c\u53e6\u4e00\u4e2a\u7ebf\u7a0b\u63a5\u6536\u4fe1\u53f7\u91cf\u5e76\u6267\u884c\u76f8\u5e94\u7684\u64cd\u4f5c\u3002\u5b9e\u73b0\u4ee3\u7801\u5982\u4e0b\uff1a\n",(0,r.kt)("strong",{parentName:"p"},"\u4fe1\u53f7\u91cf\u521d\u59cb\u5316"),"\n\u4e00\u4e2a\u4fe1\u53f7\u91cf\u4f7f\u7528\u4e00\u4e2a\u7c7b\u578b\u4e3a k_sem \u7684\u53d8\u91cf\u5b9a\u4e49\uff0c\u6709\u4e24\u79cd\u65b9\u5f0f\u53ef\u4ee5\u5b8c\u6210\u4fe1\u53f7\u91cf\u7684\u521d\u59cb\u5316\uff1a     "),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u65b9\u6cd51\uff0c\u4f7f\u7528\u5b8f\uff1a")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-c"},"K_SEM_DEFINE(my_sem, 0, 1);\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u65b9\u6cd52\uff0c\u4f7f\u7528\u51fd\u6570 \uff1a")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-c"},"struct k_sem my_sem;\n\nk_sem_init(&my_sem, 0, 1);\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\u53d1\u9001\u4fe1\u53f7\u91cf"),"  "),(0,r.kt)("p",null,"\u5728Thread\u6216\u8005ISR\u4e2d\u53d1\u9001\u4fe1\u53f7\u91cf\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-c"},'void productor_thread(void *arg)\n{\n    ...\n    uint8_t count = 0;\n    while(1){\n        if(ciunt <= 100){\n            count++;     \n        }else{\n            return;\n        }\n        /* count \u6bcf\u8ba1\u6570 20 \u6b21\uff0c\u91ca\u653e\u4e00\u6b21\u4fe1\u53f7\u91cf */\n        if(0 == (count % 20)){\n            k_sem_give(&my_sem);\n            printk("productor thread give semaphore");\n        }\n    }\n}\n')),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\u63a5\u6536\u4fe1\u53f7\u91cf")),(0,r.kt)("p",null,"\u4e00\u822c\u60c5\u51b5\u4e0b\u63a5\u6536\u4fe1\u53f7\u91cf\u7684thread\u662f\u6d88\u8d39\u8005\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-c"},'void consumer_thread(void)\n{\n    ...\n    uint8_t number = 0;\n    while(1){\n        /* \u7b49\u5f85\u4fe1\u53f7\u91cf\uff0c\u83b7\u53d6\u5230\u4fe1\u53f7\u91cf\uff0c\u5219\u6267\u884c number \u81ea\u52a0\u7684\u64cd\u4f5c */\n        if (k_sem_take(&my_sem, K_MSEC(50)) != 0) {\n            printk("Input data not available!");\n        } else {\n            number++;\n            printk("consumer thread number %d ", number);\n        }\n    }\n}\n')),(0,r.kt)("p",null,"\u4ee5\u4e0a\u662f\u4fe1\u53f7\u91cf\u7684\u57fa\u672c\u4f7f\u7528\u793a\u4f8b\uff0c\u5728\u4e0a\u4e00\u7ae0\u8282\u540c\u6b65\u4e4b\u591a\u7ebf\u7a0b\u4e2d\uff0c\u5f00\u53d1\u8005\u5df2\u7ecf\u5b9e\u73b0\u4e86\u4e24\u4e2a\u7ebf\u7a0b\u7684\u521b\u5efa\uff0c\u4e24\u4e2a\u7ebf\u7a0b\u5206\u522b\u5b8c\u6210\u4e86",(0,r.kt)("inlineCode",{parentName:"p"},"hello world"),"\u65e5\u5fd7\u8f93\u51fa\u3002"),(0,r.kt)("p",null,"\u5728\u5b66\u4e60\u672c\u7ae0\u8282",(0,r.kt)("strong",{parentName:"p"},"\u4fe1\u53f7\u91cf\u7684\u4f7f\u7528"),"\u4e4b\u540e\uff0c\u5f00\u53d1\u8005\u53ef\u4ee5\u5728\u591a\u7ebf\u7a0b\u7684sample\u57fa\u7840\u4e0a\u5b9e\u73b0\u5982\u4e0b\u76ee\u6807\uff1a"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u591a\u7ebf\u7a0b\u901a\u8fc7\u4fe1\u53f7\u91cf\u540c\u6b65\u7684\u65b9\u5f0f\u5171\u540c\u8c03\u7528\u65e5\u5fd7\u8f93\u51fa\u51fd\u6570\uff0c\u5b9e\u73b0",(0,r.kt)("inlineCode",{parentName:"li"},"hello world"),"\u65e5\u5fd7ping-pong\u8f93\u51fa\u7684\u76ee\u6807\u3002")),(0,r.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"\u5982\u679c\u60a8\u5df2\u7ecf\u5b8c\u6210\u4e86\u4e0a\u4e00\u7ae0\u8282\u540c\u6b65\u4e4b\u591a\u7ebf\u7a0b\u7684\u5f00\u53d1\u793a\u4f8b\uff0c\u53ef\u4ee5\u8df3\u8fc7",(0,r.kt)("strong",{parentName:"p"},"\u521b\u5efa\u9879\u76ee"),"\u6b65\u9aa4\u5728\u591a\u7ebf\u7a0b\u7684sample\u4e0a\u7ee7\u7eed\u5b8c\u6210\u4ee5\u4e0a\u76ee\u6807\u7684\u5b9e\u73b0\u3002"))),(0,r.kt)("h2",{id:"\u83b7\u53d6sample\u9879\u76ee"},"\u83b7\u53d6sample\u9879\u76ee"),(0,r.kt)("p",null,"\u901a\u8fc7Lisa\u547d\u4ee4\u521b\u5efa",(0,r.kt)("inlineCode",{parentName:"p"},"hello_world"),"\u9879\u76ee\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"lisa zep create\n")),(0,r.kt)("p",null,(0,r.kt)("img",{src:n(93279).Z})),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"sample \u2192 hello_world\n\u5b8c\u6210",(0,r.kt)("inlineCode",{parentName:"p"},"hello_world"),"\u9879\u76ee\u521b\u5efa\uff0c\u53c2\u8003\u4ee5\u4e0b",(0,r.kt)("strong",{parentName:"p"},"\u4ee3\u7801\u5b9e\u73b0"),"\u5b8c\u6210\u5e94\u7528\u903b\u8f91\u5f00\u53d1\u3002")),(0,r.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"csk6 sdk\u4e2d\u63d0\u4f9b\u4e86\u8be5\u4fe1\u53f7\u91cf\u793a\u4f8b\u7684sample\uff0c\u5982\u679c\u60a8\u60f3\u5feb\u901f\u4f53\u9a8c\u5b9e\u73b0\u7ed3\u679c\uff0c\u53ef\u4f7f\u7528",(0,r.kt)("inlineCode",{parentName:"p"},"lisa zep create"),"\u547d\u4ee4\u5b8c\u6210sample\u521b\u5efa\uff0c\u793a\u4f8b\u8def\u5f84",(0,r.kt)("inlineCode",{parentName:"p"},"samples--\x3esynchronization"),"\u3002"))),(0,r.kt)("h2",{id:"\u4ee3\u7801\u5b9e\u73b0"},"\u4ee3\u7801\u5b9e\u73b0"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\u5b9a\u4e49\u4e24\u4e2a\u4fe1\u53f7\u91cf")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-c"},"K_SEM_DEFINE(threadA_sem, 1, 1);\nK_SEM_DEFINE(threadB_sem, 0, 1);\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\u7f16\u5199\u4e00\u4e2ahelloLoop\u51fd\u6570\uff0c\u5b9e\u73b0hello world\u6253\u5370\u8f93\u51fa\uff0c\u5e76\u63d0\u4f9b\u4fe1\u53f7\u91cf\u53c2\u6570\u8f93\u5165")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-c"},'void helloLoop(const char *my_name,\n           struct k_sem *my_sem, struct k_sem *other_sem)\n{\n    const char *tname;\n    uint8_t cpu;\n    struct k_thread *current_thread;\n\n    while (1) {\n        /* take my semaphore */\n        k_sem_take(my_sem, K_FOREVER);\n\n        current_thread = k_current_get();\n        tname = k_thread_name_get(current_thread);\n#if CONFIG_SMP\n        cpu = arch_curr_cpu()->id;\n#else\n        cpu = 0;\n#endif\n        /* \u6253\u5370 "hello" */\n        if (tname == NULL) {\n            printk("%s: Hello World from cpu %d on %s!\\n",\n                my_name, cpu, CONFIG_BOARD);\n        } else {\n            printk("%s: Hello World from cpu %d on %s!\\n",\n                tname, cpu, CONFIG_BOARD);\n        }\n\n        k_busy_wait(100000);\n        k_msleep(SLEEPTIME);\n        k_sem_give(other_sem);\n    }\n}\n')),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\u521b\u5efa\u4e24\u4e2a\u7ebf\u7a0b\uff0c\u5e76\u5728\u7ebf\u7a0b\u4e2d\u5b8c\u6210helloLoop\u7684\u8c03\u7528")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-c"},'/* \u7ebf\u7a0b\u5806\u6808\u7a7a\u95f4 */\n#define STACKSIZE 1024\n/* \u7ebf\u7a0b\u4f18\u5148\u7ea7 */\n#define PRIORITY 7\n/* \u5ef6\u8fdf\u65f6\u95f4\uff08ms\uff09 */\n#define SLEEPTIME 500\n\n/* \u7ebf\u7a0bB\u5b9e\u73b0 */\nvoid threadB(void *dummy1, void *dummy2, void *dummy3)\n{\n    ARG_UNUSED(dummy1);\n    ARG_UNUSED(dummy2);\n    ARG_UNUSED(dummy3);\n\n    /* \u7ebf\u7a0bB\u4f20\u5165\u4fe1\u53f7\u91cf\u8c03\u7528helloLoop\u5b9e\u73b0\u6253\u5370 */\n    helloLoop(__func__, &threadB_sem, &threadA_sem);\n}\n\n/* \u7ebf\u7a0bA\u5b9e\u73b0 */\nvoid threadA(void *dummy1, void *dummy2, void *dummy3)\n{\n    ARG_UNUSED(dummy1);\n    ARG_UNUSED(dummy2);\n    ARG_UNUSED(dummy3);\n\n    /* \u7ebf\u7a0bA\u4f20\u5165\u4fe1\u53f7\u91cf\u8c03\u7528helloLoop\u5b9e\u73b0\u6253\u5370 */\n    helloLoop(__func__, &threadA_sem, &threadB_sem);\n}\n\nK_THREAD_STACK_DEFINE(threadA_stack_area, STACKSIZE);\nstatic struct k_thread threadA_data;\n\nK_THREAD_STACK_DEFINE(threadB_stack_area, STACKSIZE);\nstatic struct k_thread threadB_data;\n\nvoid main(void)\n{\n    /* \u521b\u5efa\u7ebf\u7a0b */\n    k_thread_create(&threadA_data, threadA_stack_area,\n            K_THREAD_STACK_SIZEOF(threadA_stack_area),\n            threadA, NULL, NULL, NULL,\n            PRIORITY, 0, K_FOREVER);\n    k_thread_name_set(&threadA_data, "thread_a");\n\n    k_thread_create(&threadB_data, threadB_stack_area,\n            K_THREAD_STACK_SIZEOF(threadB_stack_area),\n            threadB, NULL, NULL, NULL,\n            PRIORITY, 0, K_FOREVER);\n    k_thread_name_set(&threadB_data, "thread_b");\n\n    /* \u542f\u52a8\u7ebf\u7a0b */\n    k_thread_start(&threadA_data);\n    k_thread_start(&threadB_data);\n}\n')),(0,r.kt)("h2",{id:"\u7f16\u8bd1\u548c\u70e7\u5f55"},"\u7f16\u8bd1\u548c\u70e7\u5f55"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"\u7f16\u8bd1")," ")),(0,r.kt)("p",null,"\u5728app\u6839\u76ee\u5f55\u4e0b\u901a\u8fc7\u4ee5\u4e0b\u6307\u4ee4\u5b8c\u6210\u7f16\u8bd1\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"lisa zep build -b csk6002_9s_nano\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"\u70e7\u5f55"),"   ")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"csk6002_9s_nano"),"\u5f00\u53d1\u677f\u901a\u8fc7USB\u8fde\u63a5PC\uff0c\u901a\u8fc7\u70e7\u5f55\u6307\u4ee4\u5f00\u59cb\u70e7\u5f55\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"lisa zep flash --runner pyocd\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"\u67e5\u770b\u7ed3\u679c"),"  ")),(0,r.kt)("p",null,"\u5c06",(0,r.kt)("inlineCode",{parentName:"p"},"csk6002_9s_nano"),"\u7684\u65e5\u5fd7\u4e32\u53e3",(0,r.kt)("inlineCode",{parentName:"p"},"A03 TX A02 RX"),"\u63a5\u4e32\u53e3\u677f\u8fde\u63a5\u7535\u8111\uff0c\u5728\u7535\u8111\u7aef\u4f7f\u7528\u4e32\u53e3\u8c03\u8bd5\u52a9\u624b\u67e5\u770b\u65e5\u5fd7\uff0c\u6ce2\u7279\u7387\u4e3a115200\u3002"),(0,r.kt)("p",null,"\u65e5\u5fd7\u8f93\u51fa\u7ed3\u679c\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"*** Booting Zephyr OS build fd53c115d07a  ***\nthread_a: Hello World from cpu 0 on csk6002_9s_nano!\nthread_b: Hello World from cpu 0 on csk6002_9s_nano!\nthread_a: Hello World from cpu 0 on csk6002_9s_nano!\nthread_b: Hello World from cpu 0 on csk6002_9s_nano!\nthread_a: Hello World from cpu 0 on csk6002_9s_nano!\nthread_b: Hello World from cpu 0 on csk6002_9s_nano!\nthread_a: Hello World from cpu 0 on csk6002_9s_nano!\nthread_b: Hello World from cpu 0 on csk6002_9s_nano!\nthread_a: Hello World from cpu 0 on csk6002_9s_nano!\nthread_b: Hello World from cpu 0 on csk6002_9s_nano!\nthread_a: Hello World from cpu 0 on csk6002_9s_nano!\n\n")))}d.isMDXComponent=!0},93279:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/hello_world-70609b00276de9ad15c75adc08057a59.png"}}]);