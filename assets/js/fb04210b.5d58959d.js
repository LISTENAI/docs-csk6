(self.webpackChunkls_docs_web=self.webpackChunkls_docs_web||[]).push([[8897],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return p},kt:function(){return d}});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),m=c(n),d=r,v=m["".concat(l,".").concat(d)]||m[d]||u[d]||i;return n?a.createElement(v,s(s({ref:t},p),{},{components:n})):a.createElement(v,s({ref:t},p))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,s=new Array(i);s[0]=m;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:r,s[1]=o;for(var c=2;c<i;c++)s[c]=n[c];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},17018:function(e,t,n){"use strict";var a=n(67294);t.Z=function(e){var t=e.children,n=e.hidden,r=e.className;return a.createElement("div",{role:"tabpanel",hidden:n,className:r},t)}},98936:function(e,t,n){"use strict";n.d(t,{Z:function(){return u}});var a=n(67294),r=n(12674);var i=function(){var e=(0,a.useContext)(r.Z);if(null==e)throw new Error('"useUserPreferencesContext" is used outside of "Layout" component.');return e},s=n(86010),o="tabItem_1DhX",l="tabItemActive_1mVs";var c=37,p=39;var u=function(e){var t=e.lazy,n=e.block,r=e.defaultValue,u=e.values,m=e.groupId,d=e.className,v=i(),h=v.tabGroupChoices,k=v.setTabGroupChoices,f=(0,a.useState)(r),g=f[0],N=f[1],y=a.Children.toArray(e.children),b=[];if(null!=m){var w=h[m];null!=w&&w!==g&&u.some((function(e){return e.value===w}))&&N(w)}var z=function(e){var t=e.currentTarget,n=b.indexOf(t),a=u[n].value;N(a),null!=m&&(k(m,a),setTimeout((function(){var e,n,a,r,i,s,o,c;(e=t.getBoundingClientRect(),n=e.top,a=e.left,r=e.bottom,i=e.right,s=window,o=s.innerHeight,c=s.innerWidth,n>=0&&i<=c&&r<=o&&a>=0)||(t.scrollIntoView({block:"center",behavior:"smooth"}),t.classList.add(l),setTimeout((function(){return t.classList.remove(l)}),2e3))}),150))},O=function(e){var t,n;switch(e.keyCode){case p:var a=b.indexOf(e.target)+1;n=b[a]||b[0];break;case c:var r=b.indexOf(e.target)-1;n=b[r]||b[b.length-1]}null==(t=n)||t.focus()};return a.createElement("div",{className:"tabs-container"},a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.Z)("tabs",{"tabs--block":n},d)},u.map((function(e){var t=e.value,n=e.label;return a.createElement("li",{role:"tab",tabIndex:g===t?0:-1,"aria-selected":g===t,className:(0,s.Z)("tabs__item",o,{"tabs__item--active":g===t}),key:t,ref:function(e){return b.push(e)},onKeyDown:O,onFocus:z,onClick:z},n)}))),t?(0,a.cloneElement)(y.filter((function(e){return e.props.value===g}))[0],{className:"margin-vert--md"}):a.createElement("div",{className:"margin-vert--md"},y.map((function(e,t){return(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==g})}))))}},12674:function(e,t,n){"use strict";var a=(0,n(67294).createContext)(void 0);t.Z=a},48642:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return c},contentTitle:function(){return p},metadata:function(){return u},toc:function(){return m},default:function(){return v}});var a=n(22122),r=n(19756),i=(n(67294),n(3905)),s=n(98936),o=n(17018),l=["components"],c={},p="\u5b89\u88c5\u5f00\u53d1\u5de5\u5177",u={unversionedId:"chips/600X/quick_start/start_env",id:"chips/600X/quick_start/start_env",isDocsHomePage:!1,title:"\u5b89\u88c5\u5f00\u53d1\u5de5\u5177",description:"\u83b7\u53d6 Lisa \u5e76\u5b89\u88c5 Zephyr \u5f00\u53d1\u73af\u5883",source:"@site/docs/chips/600X/quick_start/start_env.md",sourceDirName:"chips/600X/quick_start",slug:"/chips/600X/quick_start/start_env",permalink:"/docs-csk6/chips/600X/quick_start/start_env",version:"current",frontMatter:{},sidebar:"docs/chips/600X",previous:{title:"\u7cfb\u7edf\u4e0e\u8f6f\u4ef6",permalink:"/docs-csk6/chips/600X/overview/system"},next:{title:"\u5f00\u59cb\u65b0\u9879\u76ee",permalink:"/docs-csk6/chips/600X/quick_start/start_project"}},m=[{value:"\u83b7\u53d6 Lisa \u5e76\u5b89\u88c5 Zephyr \u5f00\u53d1\u73af\u5883",id:"\u83b7\u53d6-lisa-\u5e76\u5b89\u88c5-zephyr-\u5f00\u53d1\u73af\u5883",children:[]},{value:"\u68c0\u67e5\u5b89\u88c5\u73af\u5883",id:"\u68c0\u67e5\u5b89\u88c5\u73af\u5883",children:[]},{value:"\u62c9\u53d6 CSK6 SDK",id:"\u62c9\u53d6-csk6-sdk",children:[]},{value:"\u914d\u7f6e CSK6 \u7f16\u8bd1\u73af\u5883",id:"\u914d\u7f6e-csk6-\u7f16\u8bd1\u73af\u5883",children:[]}],d={toc:m};function v(e){var t=e.components,c=(0,r.Z)(e,l);return(0,i.kt)("wrapper",(0,a.Z)({},d,c,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"\u5b89\u88c5\u5f00\u53d1\u5de5\u5177"},"\u5b89\u88c5\u5f00\u53d1\u5de5\u5177"),(0,i.kt)("h2",{id:"\u83b7\u53d6-lisa-\u5e76\u5b89\u88c5-zephyr-\u5f00\u53d1\u73af\u5883"},"\u83b7\u53d6 Lisa \u5e76\u5b89\u88c5 Zephyr \u5f00\u53d1\u73af\u5883"),(0,i.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"\u5728\u5f00\u59cb\u5f00\u53d1\u73af\u5883\u7684\u642d\u5efa\u4e4b\u524d\uff0c\u8bf7\u5148\u786e\u4fdd\u672c\u673a\u5df2\u7ecf\u5b89\u88c5\u4e86 ",(0,i.kt)("strong",{parentName:"p"},"GIT")," \u5de5\u5177\u3002"),(0,i.kt)("p",{parentName:"div"},"\u82e5\u672a\u5b89\u88c5\uff0c\u8bf7\u8bbf\u95ee",(0,i.kt)("a",{parentName:"p",href:"https://git-scm.com/"},"GIT\u5b98\u7f51"),"\u6216\u53c2\u7167\u7f51\u4e0a\u6559\u7a0b\u8fdb\u884c\u4e0b\u8f7d\u5b89\u88c5\u3002"))),(0,i.kt)(s.Z,{defaultValue:"win",values:[{label:"Windows",value:"win"},{label:"macOS\u3001Ubuntu",value:"mac"}],mdxType:"Tabs"},(0,i.kt)(o.Z,{value:"win",mdxType:"TabItem"},(0,i.kt)("p",null,"1. \u4e0b\u8f7d ",(0,i.kt)("a",{href:"https://castor.iflyos.cn/castor/v3/lisaPluginZephyr/download?platform=windows"},"Lisa & Zephyr Installer")," \u5e76\u8fd0\u884c\uff1b"),(0,i.kt)("p",null,"2. \u6839\u636e\u5b89\u88c5\u5f15\u5bfc\u8fdb\u884c\u5b89\u88c5\u3002"),(0,i.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},(0,i.kt)("strong",{parentName:"p"},"Lisa & Zephyr Installer")," \u662f\u9762\u5411Windows\u64cd\u4f5c\u7cfb\u7edf\u7684\u5f00\u53d1\u7684CSK6\u5f00\u53d1\u73af\u5883\u4e00\u4f53\u5316\u5b89\u88c5\u5305\uff0c\u652f\u6301SDK\u4e00\u952e\u62c9\u53d6\u4e0e\u914d\u7f6e\uff0c\u65b9\u4fbf\u5f00\u53d1\u8005\u5feb\u901f\u6784\u5efa\u5f00\u53d1\u73af\u5883\u3002")))),(0,i.kt)(o.Z,{value:"mac",mdxType:"TabItem"},(0,i.kt)("p",null,"1. \u5b89\u88c5lisa & lisa plugin zephyr"),(0,i.kt)("p",null,"\u5728 ",(0,i.kt)("strong",{parentName:"p"},"\u7528\u6237\u6743\u9650")," \u4e0b\u6267\u884c\uff1a"),(0,i.kt)("p",null,"\u4f7f\u7528 curl"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"curl -o- https://cdn.iflyos.cn/public/cskTools/lisa-zephyr-install.sh | bash\n")),(0,i.kt)("p",null,"\u6216\u4f7f\u7528 wget"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"wget -qO- https://cdn.iflyos.cn/public/cskTools/lisa-zephyr-install.sh | bash\n")),(0,i.kt)("p",null,"2. \u5b89\u88c5 zephyr \u5bf9\u5e94\u73af\u5883"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"lisa zep install\n")))),(0,i.kt)("h2",{id:"\u68c0\u67e5\u5b89\u88c5\u73af\u5883"},"\u68c0\u67e5\u5b89\u88c5\u73af\u5883"),(0,i.kt)("p",null,"\u5b8c\u6210\u73af\u5883\u7684\u5b89\u88c5\u540e\uff0c\u6253\u5f00\u7ec8\u7aef\uff0c\u6267\u884c\u4f60\u7684\u7b2c\u4e00\u4e2alisa\u547d\u4ee4\uff0c\u68c0\u67e5\u5f53\u524d\u5f00\u53d1\u73af\u5883\u5427~"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"lisa info zephyr\n")),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"lisa info zephyr")," \u6307\u4ee4\u7528\u4e8e\u67e5\u770b\u5f53\u524d Zephyr \u7684\u73af\u5883\u3002\u5728\u540e\u7eed\u7684\u5f00\u53d1\u4e0a\uff0c\u8be5\u547d\u4ee4\u4e5f\u53ef\u4f5c\u4e3a\u73af\u5883\u81ea\u68c0\u7684\u4e00\u4e2a\u65b9\u5f0f\u3002\u82e5\u5728\u73af\u5883\u68c0\u6d4b\u8fc7\u4e2d\u5b58\u5728\u5de5\u5177\u7f3a\u5931\u7684\u60c5\u51b5\uff0c\u8bf7\u53c2\u7167FAQ\u7ae0\u8282\u8fdb\u884c\u89e3\u51b3\u6216\u8054\u7cfb\u6211\u4eec\u3002"),(0,i.kt)("p",null,"\u65b0\u642d\u5efa\u7684\u73af\u5883\uff0c\u5982\u4e0b\u56fe\uff1a"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"image",src:n(66753).Z})),(0,i.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"\u5982\u4e0a\u56fe\u6240\u793a\uff0c\u9664 ",(0,i.kt)("inlineCode",{parentName:"p"},"env")," \u548c ",(0,i.kt)("inlineCode",{parentName:"p"},"ZEPHYR_BASE")," \u672a\u8bbe\u7f6e\u5916\uff0c\u5176\u4f59\u73af\u5883\u9879\u5747\u5b89\u88c5\u6210\u529f\uff0c"),(0,i.kt)("p",{parentName:"div"},"\u82e5\u53d1\u73b0\u5b58\u5728\u672a\u5b89\u88c5\u7684\u5de5\u5177\uff0c\u8bf7\u81ea\u884c\u6267\u884c ",(0,i.kt)("inlineCode",{parentName:"p"},"lisa zep install")," \uff0c\u8be5\u6307\u4ee4\u5c06\u5bf9\u7f3a\u5931\u7684\u73af\u5883\u5de5\u5177\u8fdb\u884c\u91cd\u65b0\u5b89\u88c5\u3002"))),(0,i.kt)("h2",{id:"\u62c9\u53d6-csk6-sdk"},"\u62c9\u53d6 CSK6 SDK"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"lisa zep use-sdk --default\n")),(0,i.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"\u8be5\u547d\u4ee4\u4f1a\u5728 ",(0,i.kt)("inlineCode",{parentName:"p"},"~/.listenai")," \u76ee\u5f55\u4e0b\uff0c\u62c9\u53d6 SDK \u5e76\u8fdb\u884c\u521d\u59cb\u5316\u3002\n\u82e5\u9700\u8981\u81ea\u5b9a\u4e49 SDK \u7684\u5b58\u653e\u8def\u5f84\uff0c\u53ef\u6267\u884c:"),(0,i.kt)("pre",{parentName:"div"},(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"lisa zep use-sdk ./my-zephyr-sdk --default\n")))),(0,i.kt)("h2",{id:"\u914d\u7f6e-csk6-\u7f16\u8bd1\u73af\u5883"},"\u914d\u7f6e CSK6 \u7f16\u8bd1\u73af\u5883"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"lisa zep use-env csk6\n")),(0,i.kt)("p",null,"\u8be5\u547d\u4ee4\u4f1a\u5b89\u88c5\u8bbe\u7f6e\u597d csk6 \u76f8\u5173\u7684\u7f16\u8bd1\u73af\u5883\u3002"),(0,i.kt)("p",null,"\u6b64\u65f6\u518d\u6267\u884c ",(0,i.kt)("inlineCode",{parentName:"p"},"lisa info zephyr"),"\uff0c\u67e5\u770b\u5f53\u524d\u7684 Zephyr \u73af\u5883\u5427~"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"image",src:n(43812).Z})))}v.isMDXComponent=!0},86010:function(e,t,n){"use strict";function a(e){var t,n,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=a(e[t]))&&(r&&(r+=" "),r+=n);else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}function r(){for(var e,t,n=0,r="";n<arguments.length;)(e=arguments[n++])&&(t=a(e))&&(r&&(r+=" "),r+=t);return r}n.d(t,{Z:function(){return r}})},66753:function(e,t,n){"use strict";t.Z=n.p+"assets/images/start_1-9b609840096536e1087f16c503953ccc.png"},43812:function(e,t,n){"use strict";t.Z=n.p+"assets/images/start_2-6959360c25483c18e17a34cfe1d1934d.png"}}]);