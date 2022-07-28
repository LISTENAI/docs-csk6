"use strict";(self.webpackChunkls_docs_web=self.webpackChunkls_docs_web||[]).push([[8449],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>m});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=a.createContext({}),c=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},d=function(e){var t=c(e.components);return a.createElement(o.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,d=p(e,["components","mdxType","originalType","parentName"]),u=c(n),m=r,k=u["".concat(o,".").concat(m)]||u[m]||s[m]||i;return n?a.createElement(k,l(l({ref:t},d),{},{components:n})):a.createElement(k,l({ref:t},d))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=u;var p={};for(var o in t)hasOwnProperty.call(t,o)&&(p[o]=t[o]);p.originalType=e,p.mdxType="string"==typeof e?e:r,l[1]=p;for(var c=2;c<i;c++)l[c]=n[c];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},6218:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>l,default:()=>d,frontMatter:()=>i,metadata:()=>p,toc:()=>o});var a=n(87462),r=(n(67294),n(3905));const i={},l="\u7591\u96be\u89e3\u7b54",p={unversionedId:"chips/600X/build/dts/troubleshooting",id:"chips/600X/build/dts/troubleshooting",isDocsHomePage:!1,title:"\u7591\u96be\u89e3\u7b54",description:"\u4ee5\u4e0b\u662f\u4e00\u4e9b\u63d0\u793a\uff0c\u7528\u4e8e\u4fee\u590d\u4e0e\u8bbe\u5907\u6811\u76f8\u5173\u7684\u3001\u884c\u4e3a\u4e0d\u6b63\u786e\u7684\u4ee3\u7801\u3002",source:"@site/docs/chips/600X/build/dts/troubleshooting.md",sourceDirName:"chips/600X/build/dts",slug:"/chips/600X/build/dts/troubleshooting",permalink:"/docs-csk6/chips/600X/build/dts/troubleshooting",version:"current",frontMatter:{},sidebar:"docs/chips/600X",previous:{title:"\u8bbe\u8ba1\u76ee\u6807",permalink:"/docs-csk6/chips/600X/build/dts/design"},next:{title:"\u8bbe\u5907\u6811 VS Kconfig",permalink:"/docs-csk6/chips/600X/build/dts/dt_vs_kconfig"}},o=[{value:"\u6062\u590d\u539f\u59cb\u6784\u5efa\u76ee\u5f55\u540e\u91cd\u8bd5",id:"\u6062\u590d\u539f\u59cb\u6784\u5efa\u76ee\u5f55\u540e\u91cd\u8bd5",children:[]},{value:"\u786e\u4fdd\u5305\u542b <code>#include &lt;devicetree.h&gt;</code>",id:"\u786e\u4fdd\u5305\u542b-include-devicetreeh",children:[]},{value:"\u786e\u4fdd\u4f60\u4f7f\u7528\u4e86\u6b63\u786e\u7684\u540d\u79f0",id:"\u786e\u4fdd\u4f60\u4f7f\u7528\u4e86\u6b63\u786e\u7684\u540d\u79f0",children:[]},{value:"\u68c0\u67e5\u9884\u5904\u7406\u5668\u7684\u8f93\u51fa",id:"\u68c0\u67e5\u9884\u5904\u7406\u5668\u7684\u8f93\u51fa",children:[]},{value:"\u9a8c\u8bc1\u5c5e\u6027",id:"\u9a8c\u8bc1\u5c5e\u6027",children:[]},{value:"\u68c0\u67e5\u7f3a\u5931\u7684\u7ed1\u5b9a",id:"\u68c0\u67e5\u7f3a\u5931\u7684\u7ed1\u5b9a",children:[]},{value:"<code>DT_INST_()</code> API \u5f15\u53d1\u7684\u9519\u8bef",id:"dt_inst_-api-\u5f15\u53d1\u7684\u9519\u8bef",children:[]}],c={toc:o};function d(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"\u7591\u96be\u89e3\u7b54"},"\u7591\u96be\u89e3\u7b54"),(0,r.kt)("p",null,"\u4ee5\u4e0b\u662f\u4e00\u4e9b\u63d0\u793a\uff0c\u7528\u4e8e\u4fee\u590d\u4e0e\u8bbe\u5907\u6811\u76f8\u5173\u7684\u3001\u884c\u4e3a\u4e0d\u6b63\u786e\u7684\u4ee3\u7801\u3002"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/docs-csk6/chips/600X/build/dts/howtos"},"\u8bbe\u5907\u6811\u64cd\u4f5c\u6307\u5f15")," \u7ae0\u8282\u4e2d\u4f60\u53ef\u4ee5\u770b\u5230\u5176\u4ed6\u201c\u5982\u4f55\u505a\u201d\u98ce\u683c\u7684\u4ecb\u7ecd\u3002"),(0,r.kt)("h2",{id:"\u6062\u590d\u539f\u59cb\u6784\u5efa\u76ee\u5f55\u540e\u91cd\u8bd5"},"\u6062\u590d\u539f\u59cb\u6784\u5efa\u76ee\u5f55\u540e\u91cd\u8bd5"),(0,r.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"\u91cd\u8981")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"\u5728\u5c1d\u8bd5\u5176\u4ed6\u89e3\u51b3\u65b9\u5f0f\u4e4b\u524d\uff0c\u603b\u662f ",(0,r.kt)("strong",{parentName:"p"},"\u5148\u8bd5\u8bd5")," \u8fd9\u79cd\u65b9\u5f0f\u3002"))),(0,r.kt)("p",null,"\u8bf7\u53c2\u9605 ",(0,r.kt)("a",{parentName:"p",href:"/docs-csk6/chips/600X/tool/lisa_plugin_zephyr/build_flash_debug#%E5%8E%9F%E5%A7%8B%E7%BC%96%E8%AF%91"},"\u539f\u59cb\u6784\u5efa")," \u4e86\u89e3\u76f8\u5173\u793a\u4f8b\uff0c\u6216\u8005\u76f4\u63a5\u5b8c\u5168\u5220\u9664\u6784\u5efa\u76ee\u5f55\uff08\u901a\u5e38\u662f ",(0,r.kt)("inlineCode",{parentName:"p"},"build/")," \uff09\u5e76\u91cd\u8bd5\u3002"),(0,r.kt)("p",null,"\u8fd9\u662f\u7279\u522b\u9002\u7528\u4e8e\u8c03\u8bd5\u8bbe\u5907\u6811\u95ee\u9898\u7684\u901a\u7528\u5efa\u8bae\uff0c\u56e0\u4e3a\u8bbe\u5907\u6811\u7684\u8f93\u51fa\u4ea7\u7269\u662f\u5728 CMake \u7684\u914d\u7f6e\u9636\u6bb5\u521b\u5efa\u7684\uff0c\u5e76\u4e14\u5f53\u5176\u4e2d\u67d0\u4e9b\u8f93\u5165\u66f4\u6539\u65f6\u5e76\u4e0d\u603b\u4f1a\u91cd\u65b0\u751f\u6210\u3002"),(0,r.kt)("h2",{id:"\u786e\u4fdd\u5305\u542b-include-devicetreeh"},"\u786e\u4fdd\u5305\u542b ",(0,r.kt)("inlineCode",{parentName:"h2"},"#include <devicetree.h>")),(0,r.kt)("p",null,"\u4e0e Kconfig \u7b26\u53f7\u4e0d\u540c\uff0c\u5fc5\u987b\u660e\u786e\u5305\u542b ",(0,r.kt)("inlineCode",{parentName:"p"},"devicetree.h")," \u5934\u6587\u4ef6\u3002"),(0,r.kt)("p",null,"\u8bb8\u591a Zephyr \u5934\u6587\u4ef6\u90fd\u4f9d\u8d56\u4e8e\u6765\u81ea\u8bbe\u5907\u6811\u7684\u4fe1\u606f\uff0c\u56e0\u6b64\u5f53\u4f60\u5305\u542b\u4e00\u4e9b\u5176\u4ed6 API \u65f6\uff0c\u53ef\u80fd\u987a\u5e26\u4e5f\u5305\u542b\u4e86 ",(0,r.kt)("inlineCode",{parentName:"p"},"devicetree.h")," \uff0c\u4f46\u8fd9\u5e76\u4e0d\u80fd\u5f97\u5230\u4fdd\u8bc1\u3002"),(0,r.kt)("h2",{id:"\u786e\u4fdd\u4f60\u4f7f\u7528\u4e86\u6b63\u786e\u7684\u540d\u79f0"},"\u786e\u4fdd\u4f60\u4f7f\u7528\u4e86\u6b63\u786e\u7684\u540d\u79f0"),(0,r.kt)("p",null,"\u8bf7\u8bb0\u4f4f\uff1a"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u5728 C/C++ \u4e2d\u5f15\u7528\u7684\u8bbe\u5907\u6811\u540d\u79f0\uff0c\u5fc5\u987b\u4f7f\u7528\u5c0f\u5199\u5b57\u6bcd\uff0c\u7279\u6b8a\u5b57\u7b26\u5fc5\u987b\u8f6c\u6362\u4e3a\u4e0b\u5212\u7ebf\u3002\u4e00\u4e2a Zephyr \u751f\u6210\u7684\u8bbe\u5907\u6811\u5934\u6587\u4ef6\u4e2d\u7684\u540d\u79f0\uff0c\u90fd\u4ee5\u8fd9\u79cd\u65b9\u5f0f\u8f6c\u6362 DTS \u540d\u79f0\uff0c\u6700\u7ec8\u5728\u57fa\u4e8e\u9884\u5904\u7406\u5668\u7684 ",(0,r.kt)("inlineCode",{parentName:"li"},"<devicetree.h>")," \u4e2d\uff0c\u751f\u6210\u53ef\u5728 C \u4e2d\u4f7f\u7528\u7684\u6807\u8bc6\u3002"),(0,r.kt)("li",{parentName:"ul"},"\u5728 overlay \u4e2d\uff0c\u4f7f\u7528\u8bbe\u5907\u6811\u8282\u70b9\u548c\u5c5e\u6027\u540d\u79f0\u7684\u65b9\u5f0f\uff0c\u7b49\u540c\u4e8e\u5b83\u4eec\u5728\u4efb\u4f55 DTS \u6587\u4ef6\u4e2d\u7684\u663e\u793a\u65b9\u5f0f\u3002 Zephyr overlay \u5e94\u89c6\u4e3a DTS \u7247\u6bb5\u3002")),(0,r.kt)("p",null,"\u4f8b\u5982\uff0c\u5982\u679c\u4f60\u5c1d\u8bd5\u5728 C/C++ \u6587\u4ef6\u4e2d\uff0c\u4f7f\u7528\u8def\u5f84\u4e3a ",(0,r.kt)("inlineCode",{parentName:"p"},"/soc/i2c@12340000")," \u7684\u8282\u70b9 ",(0,r.kt)("strong",{parentName:"p"},"\u83b7\u53d6")," ",(0,r.kt)("inlineCode",{parentName:"p"},"clock-frequency")," \u5c5e\u6027\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-c"},"/*\n * foo.c: \u4f7f\u7528\u5c0f\u5199\u5b57\u6bcd\u4e0e\u4e0b\u5212\u7ebf\u7684\u540d\u79f0\n */\n\n/* \u4e0d\u5e94\u5982\u6b64: */\n#define MY_CLOCK_FREQ DT_PROP(DT_PATH(soc, i2c@1234000), clock-frequency)\n/*                                           ^               ^\n *                                        @ \u5e94\u66ff\u6362\u4e3a _     - \u5e94\u66ff\u6362\u4e3a _  */\n\n/* \u6b63\u786e\u505a\u6cd5: */\n#define MY_CLOCK_FREQ DT_PROP(DT_PATH(soc, i2c_1234000), clock_frequency)\n/*                                           ^               ^           */\n")),(0,r.kt)("p",null,"\u5982\u679c\u4f60\u5c1d\u8bd5\u5728\u8bbe\u5907\u6811 overlay \u4e2d ",(0,r.kt)("strong",{parentName:"p"},"\u8bbe\u7f6e")," \u8be5\u5c5e\u6027\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-c"},"/*\n * foo.overlay: \u5305\u542b\u7279\u6b8a\u5b57\u7b26\u7b49\u5185\u5bb9\u7684 DTS \u540d\u79f0\u3002\n */\n\n/* \u7981\u6b62\uff1b\u4f60\u5c06\u6536\u5230\u8bbe\u5907\u6811\u9519\u8bef\u3002 */\n&{/soc/i2c_12340000/} {\n     clock_frequency = <115200>;\n};\n\n/* \u6b63\u786e\u505a\u6cd5\u3002 Overlay \u5e94\u89c6\u4e3a DTS \u7247\u6bb5\u3002 */\n&{/soc/i2c@12340000/} {\n     clock-frequency = <115200>;\n};\n")),(0,r.kt)("h2",{id:"\u68c0\u67e5\u9884\u5904\u7406\u5668\u7684\u8f93\u51fa"},"\u68c0\u67e5\u9884\u5904\u7406\u5668\u7684\u8f93\u51fa"),(0,r.kt)("p",null,"\u56e0\u4e3a\u6211\u4eec\u4f7f\u7528\u57fa\u4e8e GCC \u7684\u5de5\u5177\u94fe\uff0c\u56e0\u6b64\u5c06 ",(0,r.kt)("inlineCode",{parentName:"p"},"-save-temps=obj")," \u6dfb\u52a0\u5230 CMake \u53d8\u91cf ",(0,r.kt)("inlineCode",{parentName:"p"},"EXTRA_CFLAGS")," \u4e2d\uff0c\u5373\u53ef\u5728\u6784\u5efa\u65f6\u4fdd\u5b58\u9884\u5904\u7406\u5668\u8f93\u51fa\u3002\u4f8b\u5982\uff0c\u8981\u4f7f\u7528\u6b64\u9009\u9879\u4f7f\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"lisa zep")," \u6784\u5efa Hello World\uff0c\u8bf7\u4f7f\u7528\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"lisa zep build -b BOARD samples/hello_world -- -DEXTRA_CFLAGS=-save-temps=obj\n")),(0,r.kt)("p",null,"\u8fd9\u5c06\u5728\u6784\u5efa\u76ee\u5f55\u4e2d\uff0c\u4e3a\u6bcf\u4e2a\u6e90\u7801\u6587\u4ef6 ",(0,r.kt)("inlineCode",{parentName:"p"},"foo.c")," \u521b\u5efa\u4e00\u4e2a\u540d\u4e3a ",(0,r.kt)("inlineCode",{parentName:"p"},"foo.c.i")," \u7684\u9884\u5904\u7406\u5668\u8f93\u51fa\u6587\u4ef6\u3002"),(0,r.kt)("p",null,"\u7136\u540e\uff0c\u4f60\u53ef\u4ee5\u5728\u6784\u5efa\u76ee\u5f55\u4e2d\u641c\u7d22\u8be5\u6587\u4ef6\uff0c\u4ee5\u67e5\u770b\u4f60\u7684\u8bbe\u5907\u6811\u5b8f\u6269\u5c55\u6210\u4ec0\u4e48\u3002\u5728 macOS \u548c Linux \u4e0a\uff0c\u53ef\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"find")," \u547d\u4ee4\u67e5\u627e ",(0,r.kt)("inlineCode",{parentName:"p"},"main.c.i")," \uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"$ find build -name main.c.i\nbuild/CMakeFiles/app.dir/src/main.c.i\n")),(0,r.kt)("p",null,"\u5728\u6253\u5f00\u8fd9\u4e9b\u6587\u4ef6\u4e4b\u524d\uff0c\u5bf9\u6587\u4ef6\u8fd0\u884c\u6837\u5f0f\u683c\u5f0f\u5316\uff0c\u901a\u5e38\u5bf9\u67e5\u770b\u5b83\u4eec\u66f4\u6709\u5e2e\u52a9\u3002\u4f8b\u5982\uff0c\u5982\u679c\u5b89\u88c5\u4e86 ",(0,r.kt)("inlineCode",{parentName:"p"},"clang-format")," \uff0c\u53ef\u4ee5\u8fd9\u6837\u91cd\u65b0\u683c\u5f0f\u5316\u6587\u4ef6\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"clang-format -i build/CMakeFiles/app.dir/src/main.c.i\n")),(0,r.kt)("p",null,"\u7136\u540e\uff0c\u4f60\u53ef\u4ee5\u5728\u4f60\u559c\u6b22\u7684\u7f16\u8f91\u5668\u4e2d\u6253\u5f00\u8be5\u6587\u4ef6\uff0c\u4ee5\u67e5\u770b\u9884\u5904\u7406\u540e\u7684\u6700\u7ec8 C \u7ed3\u679c\u3002"),(0,r.kt)("h2",{id:"\u9a8c\u8bc1\u5c5e\u6027"},"\u9a8c\u8bc1\u5c5e\u6027"),(0,r.kt)("p",null,"\u5982\u679c\u4f60\u5728\u8bfb\u53d6\u8282\u70b9\u5c5e\u6027\u65f6\u9047\u5230\u7f16\u8bd1\u9519\u8bef\uff0c\u8bf7\u68c0\u67e5\u4f60\u6240\u4f7f\u7528\u7684\u7684\u8282\u70b9 id \u548c\u5c5e\u6027\u3002\u4f8b\u5982\uff0c\u5982\u679c\u4f60\u7684\u6784\u5efa\u51fa\u73b0\u9519\u8bef\uff0c\u5e76\u6307\u5411\u5982\u4e0b\u6240\u793a\u7684\u6e90\u7801\u884c\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-c"},"int baud_rate = DT_PROP(DT_NODELABEL(my_serial), current_speed);\n")),(0,r.kt)("p",null,"\u53ef\u5c1d\u8bd5\u5c06\u4ee5\u4e0b\u5185\u5bb9\u6dfb\u52a0\u5230\u6e90\u7801\u6587\u4ef6\uff0c\u5e76\u91cd\u65b0\u7f16\u8bd1\u6765\u68c0\u67e5\u8282\u70b9\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-c"},'#if !DT_NODE_EXISTS(DT_NODELABEL(my_serial))\n#error "whoops"\n#endif\n')),(0,r.kt)("p",null,"\u5982\u679c\u4f60\u5728\u91cd\u65b0\u6784\u5efa\u65f6\u770b\u5230\u201cwhoops\u201d\u9519\u8bef\u6d88\u606f\uff0c\u5219\u8868\u793a\u8fd9\u4e00\u8282\u70b9 id \u4e0d\u80fd\u6307\u5411\u6709\u6548\u8282\u70b9\u3002",(0,r.kt)("a",{parentName:"p",href:"/docs-csk6/chips/600X/build/dts/howtos#%E8%8E%B7%E5%8F%96%E8%AE%BE%E5%A4%87%E6%A0%91%E4%B8%8E%E7%94%9F%E6%88%90%E7%9A%84-header"},"\u83b7\u53d6\u8bbe\u5907\u6811\u4e0e\u751f\u6210\u7684 header")," \u5e76\u4ece\u6b64\u5904\u5165\u624b\u8fdb\u884c\u8c03\u8bd5\u3002"),(0,r.kt)("p",null,"\u5982\u679c\u4f60\u6ca1\u6709\u770b\u5230\u201cwhoops\u201d\u9519\u8bef\u6d88\u606f\uff0c\u5e94\u63a5\u7740\u68c0\u67e5\uff1a"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u4f60\u662f\u5426 ",(0,r.kt)("a",{parentName:"li",href:"#%E7%A1%AE%E4%BF%9D%E4%BD%A0%E4%BD%BF%E7%94%A8%E4%BA%86%E6%AD%A3%E7%A1%AE%E7%9A%84%E5%90%8D%E7%A7%B0"},"\u786e\u4fdd\u4f7f\u7528\u4e86\u6b63\u786e\u7684\u540d\u79f0")," \uff1f"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs-csk6/chips/600X/build/dts/api_usage#%E6%A3%80%E6%9F%A5%E5%B1%9E%E6%80%A7%E4%B8%8E%E5%AF%B9%E5%BA%94%E5%80%BC"},"\u5c5e\u6027\u662f\u5426\u5b58\u5728")," \uff1f"),(0,r.kt)("li",{parentName:"ul"},"\u8be5\u8282\u70b9\u662f\u5426\u6709 ",(0,r.kt)("a",{parentName:"li",href:"/docs-csk6/chips/600X/build/dts/bindings"},"\u5339\u914d\u7684\u7ed1\u5b9a")," \uff1f"),(0,r.kt)("li",{parentName:"ul"},"\u4e0a\u4e00\u6b65\u7684\u7ed1\u5b9a\u662f\u5426\u5b9a\u4e49\u4e86\u8be5\u5c5e\u6027\uff1f")),(0,r.kt)("h2",{id:"\u68c0\u67e5\u7f3a\u5931\u7684\u7ed1\u5b9a"},"\u68c0\u67e5\u7f3a\u5931\u7684\u7ed1\u5b9a"),(0,r.kt)("p",null,"\u8bf7\u53c2\u9605 ",(0,r.kt)("a",{parentName:"p",href:"/docs-csk6/chips/600X/build/dts/bindings"},"\u8bbe\u5907\u6811\u7ed1\u5b9a")," \u67e5\u770b\u7ed1\u5b9a\u7684\u76f8\u5173\u4fe1\u606f\uff0c\u8bf7\u53c2\u9605 ",(0,r.kt)("a",{parentName:"p",href:"https://docs.zephyrproject.org/latest/build/dts/api/bindings.html#devicetree-binding-index"},"\u7ed1\u5b9a\u7d22\u5f15")," \u67e5\u770b Zephyr \u4e2d\u5185\u7f6e\u7ed1\u5b9a\u7684\u76f8\u5173\u4fe1\u606f\u3002"),(0,r.kt)("p",null,"\u5982\u679c\u5728\u6784\u5efa\u65f6\u672a\u80fd ",(0,r.kt)("a",{parentName:"p",href:"/docs-csk6/chips/600X/build/dts/howtos#%E6%9F%A5%E6%89%BE%E8%AE%BE%E5%A4%87%E6%A0%91%E7%BB%91%E5%AE%9A"},"\u627e\u5230\u8282\u70b9\u7684\u8bbe\u5907\u6811\u7ed1\u5b9a")," \uff0c\u90a3\u4e48\u82e5\u975e\u8282\u70b9\u7684 ",(0,r.kt)("inlineCode",{parentName:"p"},"compatible")," \u5c5e\u6027\u672a\u5b9a\u4e49\uff0c\u5c31\u662f\u5176\u503c\u6ca1\u6709\u5339\u914d\u7684\u7ed1\u5b9a\u3002\u5982\u679c\u8bbe\u7f6e\u4e86\u5c5e\u6027\uff0c\u8bf7\u68c0\u67e5\u5176\u540d\u79f0\u4e2d\u7684\u62fc\u5199\u9519\u8bef\u3002\u5728\u8bbe\u5907\u6811\u6e90\u7801\u6587\u4ef6\u4e2d\uff0c ",(0,r.kt)("inlineCode",{parentName:"p"},"compatible")," \u5e94\u8be5\u770b\u8d77\u6765\u50cf ",(0,r.kt)("inlineCode",{parentName:"p"},'"vnd,some-device"')," \u2014\u2014 ",(0,r.kt)("a",{parentName:"p",href:"#%E7%A1%AE%E4%BF%9D%E4%BD%A0%E4%BD%BF%E7%94%A8%E4%BA%86%E6%AD%A3%E7%A1%AE%E7%9A%84%E5%90%8D%E7%A7%B0"},"\u786e\u4fdd\u4f60\u4f7f\u7528\u4e86\u6b63\u786e\u7684\u540d\u79f0")," \u3002"),(0,r.kt)("p",null,"\u5982\u679c\u4f60\u6240\u4f7f\u7528\u7684\u7684\u7ed1\u5b9a\u6587\u4ef6\u4e0d\u5728 ",(0,r.kt)("inlineCode",{parentName:"p"},"zephyr/dts")," \u4e2d\uff0c\u90a3\u4e48\u9700\u8981\u8bbe\u7f6e ",(0,r.kt)("a",{parentName:"p",href:"/docs-csk6/chips/600X/application/application_development#%E8%AE%BE%E5%A4%87%E6%A0%91%E5%AE%9A%E4%B9%89"},"DTS_ROOT")," \u6307\u5b9a\u7ed1\u5b9a\u6587\u4ef6\u6240\u5728\u4f4d\u7f6e\uff1b\u8bf7\u53c2\u9605 ",(0,r.kt)("a",{parentName:"p",href:"/docs-csk6/chips/600X/build/dts/bindings#%E7%BB%91%E5%AE%9A%E5%9C%A8%E4%BD%95%E5%A4%84%E5%AE%9A%E4%BD%8D"},"\u7ed1\u5b9a\u5728\u4f55\u5904\u5b9a\u4f4d")," \u3002"),(0,r.kt)("h2",{id:"dt_inst_-api-\u5f15\u53d1\u7684\u9519\u8bef"},(0,r.kt)("inlineCode",{parentName:"h2"},"DT_INST_()")," API \u5f15\u53d1\u7684\u9519\u8bef"),(0,r.kt)("p",null,"\u5982\u679c\u4f60\u4f7f\u7528\u5f62\u5982 ",(0,r.kt)("inlineCode",{parentName:"p"},"DT_INST_()")," \u7684 API \uff08\u4f8b\u5982 ",(0,r.kt)("a",{parentName:"p",href:"https://docs.zephyrproject.org/latest/build/dts/api/api.html#c.DT_INST_PROP"},(0,r.kt)("inlineCode",{parentName:"a"},"DT_INST_PROP()"))," \uff09\uff0c\u5219\u5fc5\u987b\u5c06 ",(0,r.kt)("inlineCode",{parentName:"p"},"DT_DRV_COMPAT")," \u5bf9\u5e94\u5230\u4f60\u671f\u671b\u7684 compatible \uff08\u6ce8\u610f\u5e94\u662f\u5c0f\u5199\u5b57\u6bcd\u548c\u4e0b\u5212\u7ebf\u7248\u672c\uff09\u3002\u8bf7\u53c2\u9605 ",(0,r.kt)("a",{parentName:"p",href:"/docs-csk6/chips/600X/build/dts/howtos#%E6%96%B9%E6%B3%95-1%EF%BC%9A%E4%BD%BF%E7%94%A8%E5%AE%9E%E4%BE%8B%E7%BC%96%E5%8F%B7%E5%88%9B%E5%BB%BA%E8%AE%BE%E5%A4%87"},"\u65b9\u6cd5 1\uff1a\u4f7f\u7528\u5b9e\u4f8b\u7f16\u53f7\u521b\u5efa\u8bbe\u5907")," \u3002"))}d.isMDXComponent=!0}}]);