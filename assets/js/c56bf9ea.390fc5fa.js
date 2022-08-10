"use strict";(self.webpackChunkls_docs_web=self.webpackChunkls_docs_web||[]).push([[6015],{3905:(e,t,n)=>{n.d(t,{Zo:()=>k,kt:()=>m});var l=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,l)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,l,a=function(e,t){if(null==e)return{};var n,l,a={},r=Object.keys(e);for(l=0;l<r.length;l++)n=r[l],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(l=0;l<r.length;l++)n=r[l],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var o=l.createContext({}),_=function(e){var t=l.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},k=function(e){var t=_(e.components);return l.createElement(o.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return l.createElement(l.Fragment,{},t)}},c=l.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,o=e.parentName,k=i(e,["components","mdxType","originalType","parentName"]),c=_(n),m=a,d=c["".concat(o,".").concat(m)]||c[m]||s[m]||r;return n?l.createElement(d,p(p({ref:t},k),{},{components:n})):l.createElement(d,p({ref:t},k))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,p=new Array(r);p[0]=c;var i={};for(var o in t)hasOwnProperty.call(t,o)&&(i[o]=t[o]);i.originalType=e,i.mdxType="string"==typeof e?e:a,p[1]=i;for(var _=2;_<r;_++)p[_]=n[_];return l.createElement.apply(null,p)}return l.createElement.apply(null,n)}c.displayName="MDXCreateElement"},65427:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>p,default:()=>k,frontMatter:()=>r,metadata:()=>i,toc:()=>o});var l=n(87462),a=(n(67294),n(3905));const r={},p="\u8f6e\u8be2",i={unversionedId:"chips/600X/application/kernel/sync_poll",id:"chips/600X/application/kernel/sync_poll",isDocsHomePage:!1,title:"\u8f6e\u8be2",description:"\u6982\u8ff0",source:"@site/docs/chips/600X/application/kernel/sync_poll.md",sourceDirName:"chips/600X/application/kernel",slug:"/chips/600X/application/kernel/sync_poll",permalink:"/docs-csk6/chips/600X/application/kernel/sync_poll",version:"current",frontMatter:{},sidebar:"docs/chips/600X",previous:{title:"\u4e92\u65a5\u91cf",permalink:"/docs-csk6/chips/600X/application/kernel/sync_mutex"},next:{title:"\u7ebf\u7a0b\u5206\u6790\u5668\u7684\u4f7f\u7528",permalink:"/docs-csk6/chips/600X/application/kernel/thread_analyzer"}},o=[{value:"\u6982\u8ff0",id:"\u6982\u8ff0",children:[]},{value:"\u5e38\u7528API\u63a5\u53e3",id:"\u5e38\u7528api\u63a5\u53e3",children:[{value:"k_poll_event_init",id:"k_poll_event_init",children:[]},{value:"k_poll_signal_init",id:"k_poll_signal_init",children:[]},{value:"k_poll_signal_raise",id:"k_poll_signal_raise",children:[]},{value:"k_poll_signal_reset",id:"k_poll_signal_reset",children:[]},{value:"k_poll_signal_check",id:"k_poll_signal_check",children:[]}]},{value:"Poll\u7684\u4f7f\u7528",id:"poll\u7684\u4f7f\u7528",children:[{value:"\u5185\u6838\u5bf9\u8c61\u4f5c\u4e3a poll \u6761\u4ef6",id:"\u5185\u6838\u5bf9\u8c61\u4f5c\u4e3a-poll-\u6761\u4ef6",children:[]},{value:"poll \u4fe1\u53f7\u5904\u7406",id:"poll-\u4fe1\u53f7\u5904\u7406",children:[]}]}],_={toc:o};function k(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,l.Z)({},_,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"\u8f6e\u8be2"},"\u8f6e\u8be2"),(0,a.kt)("h2",{id:"\u6982\u8ff0"},"\u6982\u8ff0"),(0,a.kt)("p",null,"\u8f6e\u8be2(poll)\u662f\u4e00\u4e2a\u6bd4\u8f83\u7279\u6b8a\u7684\u5185\u6838\u5bf9\u8c61\uff0cpolling API \u5141\u8bb8\u4e00\u4e2a\u7ebf\u7a0b\u7b49\u5f85\u4e00\u4e2a\u6216\u8005\u591a\u4e2a\u6761\u4ef6\u6ee1\u8db3\u3002\u652f\u6301\u7684\u6761\u4ef6\u7c7b\u578b\u53ea\u80fd\u662f\u5185\u6838\u5bf9\u8c61\uff0c\u53ef\u4ee5\u662fSemaphore(\u4fe1\u53f7\u91cf), FIFO(\u7ba1\u9053), poll signal(\u8f6e\u8be2)\u4e09\u79cd\u3002\n\u4f8b\u5982\u4e00\u4e2a\u7ebf\u7a0b\u4f7f\u7528polling API\u540c\u65f6\u7b49\u5f85\u591a\u4e2asemaphore\uff0c\u53ea\u8981\u5176\u4e2d\u4e00\u4e2a semaphore \u89e6\u53d1\u65f6 polling API \u5c31\u4f1a\u5f97\u5230\u901a\u77e5\u3002\npoll \u5177\u6709\u4ee5\u4e0b\u7279\u6027\uff1a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u5f53\u4e00\u4e2a\u7ebf\u7a0b\u7b49\u5f85\u591a\u4e2a\u89e6\u53d1\u6761\u4ef6\u65f6\uff0c\u53ea\u8981\u6709\u4e00\u4e2a\u6761\u4ef6\u6ee1\u8db3 k_poll \u5c31\u4f1a\u8fd4\u56de\u3002"),(0,a.kt)("li",{parentName:"ul"},"\u5f53 Semaphore \u6216 FIFO \u6ee1\u8db3\u6761\u4ef6\u540e, k_poll \u53ea\u662f\u63a5\u5230\u901a\u77e5\u8fd4\u56de\uff0c\u7ebf\u7a0b\u5e76\u672a\u83b7\u53d6\u5230 semaphore \u6216FIFO, \u8fd8\u9700\u8981\u4f7f\u7528\u4ee3\u7801\u4e3b\u52a8\u83b7\u53d6\u3002")),(0,a.kt)("p",null,"\u672c\u7ae0\u8282\u5728\u4e0a\u4e2a\u7ae0\u8282-\u540c\u6b65\u4e4b\u4e92\u65a5\u91cf\u57fa\u7840\u4e0a\u8bb2\u89e3\u8f6e\u8be2\u7684\u4f7f\u7528\u573a\u666f\u548c\u4f7f\u7528\u65b9\u6cd5\uff0c\u901a\u8fc7\u672c\u7ae0\u8282\u5b66\u4e60\uff0c\u5f00\u53d1\u8005\u53ef\u4ee5\u4e86\u89e3\u5230\uff1a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u8f6e\u8be2\u7684\u57fa\u672c\u4fe1\u606f\u548c\u4f7f\u7528\u573a\u666f"),(0,a.kt)("li",{parentName:"ul"},"\u8f6e\u8be2\u7684\u4f7f\u7528\u65b9\u6cd5")),(0,a.kt)("h2",{id:"\u5e38\u7528api\u63a5\u53e3"},"\u5e38\u7528API\u63a5\u53e3"),(0,a.kt)("h3",{id:"k_poll_event_init"},"k_poll_event_init"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-c"},"void k_poll_event_init(struct k_poll_event *event, uint32_t type, int mode, void *obj);\n")),(0,a.kt)("p",null,"\u521d\u59cb\u5316\u4e00\u4e2a k_poll_event \u5b9e\u4f8b\uff0c\u4f7f\u7528\u8f6e\u8be2\u529f\u80fd\u9700\u8981\u5305\u542b\u5934\u6587\u4ef6",(0,a.kt)("inlineCode",{parentName:"p"},"#include <zephyr/kernel.h>"),"\u3002\u8f6e\u8be2\u4e8b\u4ef6\u5230\u6765\uff0c\u4f1a\u653e\u7f6e\u5728\u4e8b\u4ef6\u6570\u7ec4\u4e2d\uff0c\u540e\u9762\u4f20\u9012\u7ed9",(0,a.kt)("inlineCode",{parentName:"p"},"k_poll"),"\u63a5\u53e3\u3002"),(0,a.kt)("p",null,"\u7b49\u5f85\u4e00\u4e2a\u6216\u591a\u4e2a\u8f6e\u8be2\u4e8b\u4ef6\u53d1\u751f\u3002\u4e8b\u4ef6\u53ef\u4ee5\u662f\u5185\u6838\u5bf9\u8c61\uff0c\u5982\u4fe1\u53f7\u91cf(Semaphore)\u6216\u8f6e\u8be2\u4fe1\u53f7\u4e8b\u4ef6\u3002\u5728\u5bf9\u8c61\u53d8\u4e3a\u53ef\u7528\u4e14\u5176\u7b49\u5f85\u961f\u5217\u4e3a\u7a7a\u4e4b\u524d\uff0c\u8f6e\u8be2\u7ebf\u7a0b\u65e0\u6cd5\u83b7\u53d6\u5bf9\u8c61\u4e0a\u7684\u8f6e\u8be2\u4e8b\u4ef6\uff0c\u56e0\u6b64\uff0c\u5f53\u88ab\u8f6e\u8be2\u7684\u5bf9\u8c61\u53ea\u6709\u4e00\u4e2a\u7ebf\u7a0b\uff08\u8f6e\u8be2\u7ebf\u7a0b\uff09\u8bd5\u56fe\u83b7\u53d6\u5b83\u4eec\u65f6\uff0c",(0,a.kt)("inlineCode",{parentName:"p"},"k_poll()"),"\u8c03\u7528\u66f4\u6709\u6548\u3002\u5f53",(0,a.kt)("inlineCode",{parentName:"p"},"k_poll()"),"\u8fd4\u56de0\u65f6\uff0c\u8c03\u7528\u65b9\u5e94\u8f6e\u8be2\u6240\u6709\u7ed9",(0,a.kt)("inlineCode",{parentName:"p"},"k_poll()"),"\u7684\u4e8b\u4ef6\uff0c\u5e76\u68c0\u67e5\u72b6\u6001\u5b57\u6bb5\u4e2d\u9884\u671f\u7684\u503c\uff0c\u5e76\u91c7\u53d6\u76f8\u5173\u64cd\u4f5c\u3002\u518d\u6b21\u8c03\u7528",(0,a.kt)("inlineCode",{parentName:"p"},"k_poll()"),"\u4e4b\u524d\uff0c\u7528\u6237\u5fc5\u987b\u5c06\u72b6\u6001\u5b57\u6bb5\u91cd\u7f6e\u4e3a",(0,a.kt)("inlineCode",{parentName:"p"},"K_POLL_STATE_NOT_READY"),"\u3002"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"\u53c2\u6570\u8bf4\u660e")),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"\u5b57\u6bb5"),(0,a.kt)("th",{parentName:"tr",align:null},"\u8bf4\u660e"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"event"),(0,a.kt)("td",{parentName:"tr",align:null},"\u88ab\u8f6e\u8be2\u7684\u4e8b\u4ef6\u6570\u7ec4")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"num_events"),(0,a.kt)("td",{parentName:"tr",align:null},"\u88ab\u8f6e\u8be2\u7684\u4e8b\u4ef6\u6570\u91cf\uff08event\u6570\u7ec4\u4e2d\u4e8b\u4ef6\u7684\u4e2a\u6570\uff09")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"timeout"),(0,a.kt)("td",{parentName:"tr",align:null},"\u6307\u5b9a\u4e8b\u4ef6\u5230\u6765\u7684\u7b49\u5f85\u65f6\u95f4\uff0c\u6216\u8005\u4f20\u5165\u7279\u6b8a\u503c",(0,a.kt)("inlineCode",{parentName:"td"},"K_NO_WAIT"),"\u6216",(0,a.kt)("inlineCode",{parentName:"td"},"K_FOREVER"))))),(0,a.kt)("br",null),(0,a.kt)("h3",{id:"k_poll_signal_init"},"k_poll_signal_init"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-c"},"void k_poll_signal_init(struct k_poll_signal *sig);\n")),(0,a.kt)("p",null,"\u521d\u59cb\u5316\u8f6e\u8be2\u4fe1\u53f7\u7684\u5bf9\u8c61\uff0c\u4f5c\u4e3a\u8f6e\u8be2\u4e8b\u4ef6\u7684\u89e6\u53d1\u3002\u51c6\u5907\u597d\u4e00\u4e2a\u8f6e\u8be2\u7684\u5bf9\u8c61\uff0c\u53ef\u4ee5\u901a\u8fc7",(0,a.kt)("inlineCode",{parentName:"p"},"k_poll_signal_raise()"),"\u63a5\u53e3\u53d1\u9001\u4fe1\u53f7\u3002"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"\u53c2\u6570\u8bf4\u660e")),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"\u5b57\u6bb5"),(0,a.kt)("th",{parentName:"tr",align:null},"\u8bf4\u660e"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"sig"),(0,a.kt)("td",{parentName:"tr",align:null},"\u8f6e\u8be2\u4fe1\u53f7\u7684\u5bf9\u8c61")))),(0,a.kt)("br",null),(0,a.kt)("h3",{id:"k_poll_signal_raise"},"k_poll_signal_raise"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-c"},"int k_poll_signal_raise(struct k_poll_signal *sig, int result);\n")),(0,a.kt)("p",null,"\u8be5\u51fd\u6570\u63a5\u53e3\u51c6\u5907\u8f6e\u8be2\u4fe1\u53f7\uff0c\u8be5\u4fe1\u53f7\u57fa\u672c\u4e0a\u662f",(0,a.kt)("inlineCode",{parentName:"p"},"K_POLL_TYPE_SIGNAL"),"\u4fe1\u53f7\u7c7b\u578b\u7684\u8f6e\u8be2\u4e8b\u4ef6\u3002\u5982\u679c\u6709\u7ebf\u7a0b\u6b63\u5728\u8f6e\u8be2\u8be5\u4e8b\u4ef6\uff0c\u5219\u8be5\u7ebf\u7a0b\u53ef\u4ee5\u8df3\u51fapoll\u963b\u585e\u5f80\u4e0b\u6267\u884c\u3002\u8f6e\u8be2\u4fe1\u53f7\u5305\u542b\u7684\u201csignaled\u201d\u5b57\u6bb5\uff0c\u7531",(0,a.kt)("inlineCode",{parentName:"p"},"k_poll_signal_raise()"),"\u8bbe\u7f6e\u65f6\uff0c\u8be5\u5b57\u6bb5\u503c\u4e0d\u53d8\uff0c\u76f4\u5230\u7528\u6237\u4f7f\u7528",(0,a.kt)("inlineCode",{parentName:"p"},"k_poll_signal_reset()"),"\u5c06\u5176\u8bbe\u7f6e\u56de0\uff0c\u56e0\u6b64\uff0c\u5728\u518d\u6b21\u4f20\u9012\u7ed9",(0,a.kt)("inlineCode",{parentName:"p"},"k_poll()"),"\u4e4b\u524d\uff0c\u7528\u6237\u5fc5\u987b\u5bf9\u5176\u8fdb\u884c\u91cd\u7f6e\uff0c\u5426\u5219",(0,a.kt)("inlineCode",{parentName:"p"},"k_poll()"),"\u5c06\u8ba4\u4e3a\u5b83\u5df2\u53d1\u51fa\u4fe1\u53f7\uff0c\u5e76\u5c06\u7acb\u5373\u8fd4\u56de\u3002"),(0,a.kt)("p",null,"\u63a5\u53e3\u6210\u529f\u8fd4\u56de0\uff0c\u975e0\u8868\u793a\u5931\u8d25\u3002"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"\u53c2\u6570\u8bf4\u660e")),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"\u5b57\u6bb5"),(0,a.kt)("th",{parentName:"tr",align:null},"\u8bf4\u660e"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"sig"),(0,a.kt)("td",{parentName:"tr",align:null},"\u8f6e\u8be2\u4fe1\u53f7\u7684\u5bf9\u8c61")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"result"),(0,a.kt)("td",{parentName:"tr",align:null},"\u8d4b\u503c\u7ed9\u4fe1\u53f7\u5bf9\u8c61\u7684result\u5b57\u6bb5")))),(0,a.kt)("br",null),(0,a.kt)("h3",{id:"k_poll_signal_reset"},"k_poll_signal_reset"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-c"},"void k_poll_signal_reset(struct k_poll_signal *sig);\n")),(0,a.kt)("p",null,"\u590d\u4f4d\u4fe1\u53f7\u5bf9\u8c61\u3002\u5728\u88ab poll \u6355\u83b7\u524d\uff0c\u90fd\u53ef\u4ee5\u4f7f\u7528\u8be5\u63a5\u53e3\u51fd\u6570\u8fdb\u884c\u590d\u4f4d\u3002"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"\u53c2\u6570\u8bf4\u660e")),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"\u5b57\u6bb5"),(0,a.kt)("th",{parentName:"tr",align:null},"\u8bf4\u660e"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"sig"),(0,a.kt)("td",{parentName:"tr",align:null},"\u8f6e\u8be2\u4fe1\u53f7\u7684\u5bf9\u8c61")))),(0,a.kt)("br",null),(0,a.kt)("h3",{id:"k_poll_signal_check"},"k_poll_signal_check"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-c"},"void k_poll_signal_check(struct k_poll_signal *sig, unsigned int *signaled, int *result);\n")),(0,a.kt)("p",null,"\u83b7\u53d6\u8f6e\u8be2\u7684\u4fe1\u53f7\u5bf9\u8c61\u7684\u72b6\u6001\u548c result \u503c\u3002"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"\u53c2\u6570\u8bf4\u660e")),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"\u5b57\u6bb5"),(0,a.kt)("th",{parentName:"tr",align:null},"\u8bf4\u660e"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"sig"),(0,a.kt)("td",{parentName:"tr",align:null},"\u8f6e\u8be2\u4fe1\u53f7\u7684\u5bf9\u8c61")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"signaled"),(0,a.kt)("td",{parentName:"tr",align:null},"\u6536\u5230\u4fe1\u53f7\u7684\u5bf9\u8c61\uff0c\u8be5\u503c\u5c06\u4e3a\u975e\u96f6")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"result"),(0,a.kt)("td",{parentName:"tr",align:null},"\u6536\u5230\u4fe1\u53f7\u7684\u5bf9\u8c61\uff0c\u8be5\u503c\u6709\u610f\u4e49\uff0c\u5426\u5219\u8be5\u503c\u65e0\u610f\u4e49\u3002")))),(0,a.kt)("p",null,"\u66f4\u591a",(0,a.kt)("inlineCode",{parentName:"p"},"Poll API"),"\u63a5\u53e3 \u53ef\u4ee5\u5728zephyr\u5b98\u7f51",(0,a.kt)("a",{parentName:"p",href:"https://docs.zephyrproject.org/latest/doxygen/html/group__poll__apis.html"},"Async polling APIs"),"\u4e2d\u627e\u5230\u3002"),(0,a.kt)("br",null),(0,a.kt)("h2",{id:"poll\u7684\u4f7f\u7528"},"Poll\u7684\u4f7f\u7528"),(0,a.kt)("p",null,"\u6ce8\u610f\uff1a\u4f7f\u7528Poll\u529f\u80fd\uff0c\u9700\u8981\u914d\u7f6e",(0,a.kt)("inlineCode",{parentName:"p"},"CONFIG_POLL"),"\u5b8f\u5b9a\u4e49\u3002\u5982\u4f55\u914d\u7f6e\u53ef\u4ee5\u53c2\u8003",(0,a.kt)("a",{parentName:"p",href:"/docs-csk6/chips/600X/build/kconfig/Kconfig_configuration"},"\u8bbe\u7f6eKconfig\u914d\u7f6e"),"\u53ca\u5bf9\u5e94\u677f\u5757\u7684\u5176\u4ed6\u6587\u6863\u63cf\u8ff0\u3002"),(0,a.kt)("h3",{id:"\u5185\u6838\u5bf9\u8c61\u4f5c\u4e3a-poll-\u6761\u4ef6"},"\u5185\u6838\u5bf9\u8c61\u4f5c\u4e3a poll \u6761\u4ef6"),(0,a.kt)("p",null,"\u521d\u59cb\u5316 poll \u6761\u4ef6"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-c"},"struct k_poll_event events[2];\n\nvoid poll_init(void)\n{\n    /* \u5c06my_sem\u505a\u4e3apoll\u6761\u4ef6\uff0c\u6ce8\u610fmy_sem\uff0c\u9700\u8981\u5355\u72ec\u521d\u59cb\u5316 */\n    k_poll_event_init(&events[0],\n                      K_POLL_TYPE_SEM_AVAILABLE,\n                      K_POLL_MODE_NOTIFY_ONLY,\n                      &my_sem);\n\n    /* \u5c06my_fifo\u505a\u4e3apoll\u6761\u4ef6\uff0c\u6ce8\u610fmy_fifo\uff0c\u9700\u8981\u5355\u72ec\u521d\u59cb\u5316 */\n    k_poll_event_init(&events[1],\n                      K_POLL_TYPE_FIFO_DATA_AVAILABLE,\n                      K_POLL_MODE_NOTIFY_ONLY,\n                      &my_fifo);\n}\n")),(0,a.kt)("p",null,"\u4ee5\u4e0a\u521d\u59cb\u5316\u4e5f\u53ef\u4ee5\u7528\u4e0b\u9762\u65b9\u5f0f\u4ee3\u66ff, \u540c\u6837\u6ce8\u610fmy_sem\u548cmy_fifo\u9700\u8981\u5355\u72ec\u521d\u59cb\u5316"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-c"},"struct k_poll_event events[2] = {\n    K_POLL_EVENT_STATIC_INITIALIZER(K_POLL_TYPE_SEM_AVAILABLE,\n                                    K_POLL_MODE_NOTIFY_ONLY,\n                                    &my_sem, 0),\n    K_POLL_EVENT_STATIC_INITIALIZER(K_POLL_TYPE_FIFO_DATA_AVAILABLE,\n                                    K_POLL_MODE_NOTIFY_ONLY,\n                                    &my_fifo, 0),\n};\n")),(0,a.kt)("p",null,"poll\u7b49\u5f85\u548c\u5904\u7406"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-c"},"void poll_thread(void)\n{\n    for(;;) {\n        rc = k_poll(events, 2, K_FOREVER);\n        if (events[0].state == K_POLL_STATE_SEM_AVAILABLE) {\n            k_sem_take(events[0].sem, K_NO_WAIT);\n            /* handle sem */\n        } else if (events[1].state == K_POLL_STATE_FIFO_DATA_AVAILABLE) {\n            data = k_fifo_get(events[1].fifo, K_NO_WAIT);\n            /* handle data */\n        }\n        events[0].state = K_POLL_STATE_NOT_READY;\n        events[1].state = K_POLL_STATE_NOT_READY;\n    }\n}\n")),(0,a.kt)("h3",{id:"poll-\u4fe1\u53f7\u5904\u7406"},"poll \u4fe1\u53f7\u5904\u7406"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"\u7ebf\u7a0bA poll\u4fe1\u53f7\u662f\u5426\u53d1\u9001")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-c"},'/*\u5b9a\u4e49\u4e00\u4e2apoll signal\u4fe1\u53f7*/\nstruct k_poll_signal signal;\n\nvoid thread_A(void){\n    /*\u521d\u59cb\u5316\u4fe1\u53f7\uff0c\u5e76\u5c06\u5176\u4f5c\u4e3apoll\u6761\u4ef6*/\n    k_poll_signal_init(&signal);\n    \n    /*\u521d\u59cb\u5316poll event\u6761\u4ef6*/\n    struct k_poll_event events[1] = {\n        K_POLL_EVENT_INITIALIZER(K_POLL_TYPE_SIGNAL,\n                                 K_POLL_MODE_NOTIFY_ONLY,\n                                 &signal),\n    };\n\n    while(1){\n            k_poll(events, 1, K_FOREVER);\n\n            if (events[0].signal->result == 0x1337) {\n                printk("get signal");\n            } else {\n                 printk("weird error");\n            }\n\n            /*\u5728\u5faa\u73af\u4e2d\u8c03\u7528 k_poll() \u65f6\uff0c\u7528\u6237\u5fc5\u987b\u5c06event\u7684state\u6001\u91cd\u7f6e\u4e3aK_POLL_STATE_NOT_READY*/\n            events[0].signal->signaled = 0;\n            events[0].state = K_POLL_STATE_NOT_READY;\n    }\n}\n')),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"\u7ebf\u7a0b B \u53d1\u9001signal\u4fe1\u53f7\u89e6\u53d1event")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-c"},"void thread_B(void)\n{\n    k_poll_signal_raise(&signal, 0x1337);\n}\n")),(0,a.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"\u672c\u7ae0\u8282\u8bb2\u89e3\u7684\u540c\u6b65\u4e4b\u8f6e\u8be2\u5185\u5bb9\u5728",(0,a.kt)("inlineCode",{parentName:"p"},"csk6 sdk"),"\u4e2d\u63d0\u4f9b\u5177\u4f53\u7684\u5b9e\u73b0sample\uff0c\u5f00\u53d1\u8005\u53ef\u4ee5\u6839\u636e\u4ee5\u4e0a\u53c2\u8003\u4ee3\u7801\u5b8c\u6210\u8f6e\u8be2\u7684\u5e94\u7528\u5b9e\u73b0\uff0c\u4ee5\u63d0\u5347\u5f00\u53d1\u719f\u7ec3\u5ea6\u3002"))))}k.isMDXComponent=!0}}]);