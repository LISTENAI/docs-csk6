"use strict";(self.webpackChunkls_docs_web=self.webpackChunkls_docs_web||[]).push([[7920],{20895:(e,t,n)=>{n.d(t,{Hk:()=>m,Iz:()=>u,_k:()=>c,dK:()=>l,qo:()=>i,rx:()=>s,vc:()=>o});var a=n(31336),r=n.n(a);n(30892)(r()),n(54212).w(r()),n(74182)(r());const l=["en","zh"],c=!1,o=null,s=null,i=8,m=50,u={search_placeholder:"\u641c\u7d22",see_all_results:"\u67e5\u770b\u6240\u6709\u7ed3\u679c",no_results:"\u65e0\u67e5\u8be2\u7ed3\u679c",search_results_for:'\u641c\u7d22\u5173\u952e\u5b57 "{{ keyword }}" \u7684\u7ed3\u679c',count_documents_found_plural:"\u5171 {{ count }} \u4e2a\u67e5\u8be2\u7ed3\u679c",no_documents_were_found:"\u65e0\u67e5\u8be2\u7ed3\u679c",search_the_documentation:"Search the documentation",count_documents_found:"{{ count }} document found"}},24973:(e,t,n)=>{n.d(t,{Z:()=>u,I:()=>m});var a=n(67294);const r=/{\w+}/g,l="{}";function c(e,t){const n=[],c=e.replace(r,(e=>{const r=e.substr(1,e.length-2),c=null==t?void 0:t[r];if(void 0!==c){const e=a.isValidElement(c)?c:String(c);return n.push(e),l}return e}));return 0===n.length?e:n.every((e=>"string"==typeof e))?c.split(l).reduce(((e,t,a)=>{var r;return e.concat(t).concat(null!==(r=n[a])&&void 0!==r?r:"")}),""):c.split(l).reduce(((e,t,r)=>[...e,a.createElement(a.Fragment,{key:r},t,n[r])]),[])}function o(e){let{children:t,values:n}=e;return c(t,n)}var s=n(57529);function i(e){let{id:t,message:n}=e;var a;return null!==(a=s[null!=t?t:n])&&void 0!==a?a:n}function m(e,t){let{message:n,id:a}=e;var r;return c(null!==(r=i({message:n,id:a}))&&void 0!==r?r:n,t)}function u(e){let{children:t,id:n,values:r}=e;var l;const c=null!==(l=i({message:t,id:n}))&&void 0!==l?l:t;return a.createElement(o,{values:r},c)}},7731:(e,t,n)=>{n.r(t),n.d(t,{default:()=>w});var a=n(67294),r=n(52263),l=n(40932),c=n(99105),o=n(36742),s=n(5977),i=n(10412);const m=function(){const e=(0,s.k6)(),t=(0,s.TH)(),{siteConfig:{baseUrl:n}}=(0,r.Z)();return{searchValue:i.Z.canUseDOM&&new URLSearchParams(t.search).get("q")||"",updateSearchPath:n=>{const a=new URLSearchParams(t.search);n?a.set("q",n):a.delete("q"),e.replace({search:a.toString()})},generateSearchPageLink:e=>n+"search?q="+encodeURIComponent(e)}};var u=n(90022),d=n(30206),h=n(82539),v=n(29481),f=n(91073),g=n(34041),E=n(37365);function p(e,t){return e.replace(/\{\{\s*(\w+)\s*\}\}/g,((e,n)=>Object.prototype.hasOwnProperty.call(t,n)?String(t[n]):e))}const b="searchQueryInput_5r-w",_="searchResultItem_18XW",k="searchResultItemPath_TjRL",Z="searchResultItemSummary_5qSX";function N(e){let{searchResult:{document:t,type:n,page:r,tokens:l,metadata:c}}=e;const s=0===n,i=2===n,m=(s?t.b:r.b).slice(),u=i?t.s:t.t;return s||m.push(r.t),a.createElement("article",{className:_},a.createElement("h2",null,a.createElement(o.Z,{to:t.u+(t.h||""),dangerouslySetInnerHTML:{__html:i?(0,h.C)(u,l):(0,v.o)(u,(0,f.m)(c,"t"),l,100)}})),m.length>0&&a.createElement("p",{className:k},m.join(" \u203a ")),i&&a.createElement("p",{className:Z,dangerouslySetInnerHTML:{__html:(0,v.o)(t.t,(0,f.m)(c,"t"),l,100)}}))}const w=function(){const{siteConfig:{baseUrl:e}}=(0,r.Z)(),{searchValue:t,updateSearchPath:n}=m(),[o,s]=(0,a.useState)(t),[i,h]=(0,a.useState)(),[v,f]=(0,a.useState)(),_=(0,a.useMemo)((()=>o?p(E.Iz.search_results_for,{keyword:o}):E.Iz.search_the_documentation),[o]);(0,a.useEffect)((()=>{n(o),i&&(o?i(o,(e=>{f(e)})):f(void 0))}),[o,i]);const k=(0,a.useCallback)((e=>{s(e.target.value)}),[]);return(0,a.useEffect)((()=>{t&&t!==o&&s(t)}),[t]),(0,a.useEffect)((()=>{!async function(){const{wrappedIndexes:t,zhDictionary:n}=await(0,u.w)(e);h((()=>(0,d.v)(t,n,100)))}()}),[e]),a.createElement(l.Z,{title:_},a.createElement(c.Z,null,a.createElement("meta",{property:"robots",content:"noindex, follow"})),a.createElement("div",{className:"container margin-vert--lg"},a.createElement("h1",null,_),a.createElement("input",{type:"search",name:"q",className:b,"aria-label":"Search",onChange:k,value:o,autoComplete:"off",autoFocus:!0}),!i&&o&&a.createElement("div",null,a.createElement(g.Z,null)),v&&(v.length>0?a.createElement("p",null,p(1===v.length?E.Iz.count_documents_found:E.Iz.count_documents_found_plural,{count:v.length})):a.createElement("p",null,E.Iz.no_documents_were_found)),a.createElement("section",null,v&&v.map((e=>a.createElement(N,{key:e.document.i,searchResult:e}))))))}},80607:(e,t,n)=>{n.d(t,{Z:()=>l});var a=n(87462),r=n(67294);const l=e=>{let{width:t=30,height:n=30,className:l,...c}=e;return r.createElement("svg",(0,a.Z)({className:l,width:t,height:n,viewBox:"0 0 30 30","aria-hidden":"true"},c),r.createElement("path",{stroke:"currentColor",strokeLinecap:"round",strokeMiterlimit:"10",strokeWidth:"2",d:"M4 7h22M4 15h22M4 23h22"}))}},40932:(e,t,n)=>{n.d(t,{Z:()=>q});var a=n(67294),r=n(86010),l=n(24973),c=n(39306);const o="skipToContent_vO2r";function s(e){e.setAttribute("tabindex","-1"),e.focus(),e.removeAttribute("tabindex")}const i=function(){const e=(0,a.useRef)(null);return(0,c.SL)((t=>{let{location:n}=t;e.current&&!n.hash&&s(e.current)})),a.createElement("div",{ref:e},a.createElement("a",{href:"#main",className:o,onClick:e=>{e.preventDefault();const t=document.querySelector("main:first-of-type")||document.querySelector(".main-wrapper");t&&s(t)}},a.createElement(l.Z,{id:"theme.common.skipToMainContent",description:"The skip to content label used for accessibility, allowing to rapidly navigate to main content with keyboard tab/enter navigation"},"Skip to main content")))},m="announcementBar_i4ae",u="announcementBarClose_1H6k",d="announcementBarContent_7r5X",h="announcementBarCloseable_cuQL";const v=function(){const{isClosed:e,close:t}=(0,c.nT)(),{announcementBar:n}=(0,c.LU)();if(!n)return null;const{content:o,backgroundColor:s,textColor:i,isCloseable:v}=n;return!o||v&&e?null:a.createElement("div",{className:m,style:{backgroundColor:s,color:i},role:"banner"},a.createElement("div",{className:(0,r.Z)(d,{[h]:v}),dangerouslySetInnerHTML:{__html:o}}),v?a.createElement("button",{type:"button",className:(0,r.Z)(u,"clean-btn"),onClick:t,"aria-label":(0,l.I)({id:"theme.AnnouncementBar.closeButtonAriaLabel",message:"Close",description:"The ARIA label for close button of announcement bar"})},a.createElement("span",{"aria-hidden":"true"},"\xd7")):null)};var f=n(67919),g=n(87462),E=n(69936),p=n(4146),b=n(52263),_=n(35202),k=n(36742),Z=n(44996),N=n(5977),w=n(13919);function y(e){let{activeBasePath:t,activeBaseRegex:n,to:r,href:l,label:c,activeClassName:o="subnavbar__link--active",prependBaseUrlToHref:s,...i}=e;const m=(0,Z.Z)(r),u=(0,Z.Z)(t),d=(0,Z.Z)(l,{forcePrependBaseUrl:!0}),h=c&&l&&!(0,w.Z)(l);return a.createElement(k.Z,(0,g.Z)({},l?{href:s?d:l}:{isNavLink:!0,activeClassName:o,to:m,...t||n?{isActive:(e,t)=>n?new RegExp(n).test(t.pathname):t.pathname.startsWith(u)}:null},i),h?a.createElement("span",{className:"navbar__exlink"},c):c)}function C(e){var t;let{items:n,position:l,className:c,...o}=e;const s=(0,a.useRef)(null),i=(0,a.useRef)(null),[m,u]=(0,a.useState)(!1);(0,a.useEffect)((()=>{const e=e=>{s.current&&!s.current.contains(e.target)&&u(!1)};return document.addEventListener("mousedown",e),document.addEventListener("touchstart",e),()=>{document.removeEventListener("mousedown",e),document.removeEventListener("touchstart",e)}}),[s]);const d=function(e,t){return void 0===t&&(t=!1),(0,r.Z)({"subnavbar__item subnavbar__link":!t,dropdown__link:t},e)};return n?a.createElement("div",{ref:s,className:(0,r.Z)("navbar__item","dropdown","dropdown--hoverable",{"dropdown--left":"left"===l,"dropdown--right":"right"===l,"dropdown--show":m})},a.createElement(y,(0,g.Z)({className:d(c)},o,{onClick:o.to?void 0:e=>e.preventDefault(),onKeyDown:e=>{"Enter"===e.key&&(e.preventDefault(),u(!m))}}),null!=(t=o.children)?t:o.label),a.createElement("ul",{ref:i,className:"dropdown__menu"},n.map(((e,t)=>{let{className:r,...l}=e;return a.createElement("li",{key:t},a.createElement(y,(0,g.Z)({onKeyDown:e=>{if(t===n.length-1&&"Tab"===e.key){e.preventDefault(),u(!1);const t=s.current.nextElementSibling;t&&t.focus()}},activeClassName:"dropdown__link--active",className:d(r,!0)},l)))})))):a.createElement(y,(0,g.Z)({className:d(c)},o))}function L(e){var t,n,l;let{items:o,className:s,position:i,...m}=e;const u=(0,a.useRef)(null),{pathname:d}=(0,N.TH)(),[h,v]=(0,a.useState)((()=>{var e;return null==(e=!(null!=o&&o.some((e=>(0,c.Mg)(e.to,d)))))||e})),f=function(e,t){return void 0===t&&(t=!1),(0,r.Z)("menu__link",{"menu__link--sublist":t},e)};if(!o)return a.createElement("li",{className:"menu__list-item"},a.createElement(y,(0,g.Z)({className:f(s)},m)));const E=null!=(t=u.current)&&t.scrollHeight?(null==(n=u.current)?void 0:n.scrollHeight)+"px":void 0;return a.createElement("li",{className:(0,r.Z)("menu__list-item",{"menu__list-item--collapsed":h})},a.createElement(y,(0,g.Z)({role:"button",className:f(s,!0)},m,{onClick:e=>{e.preventDefault(),v((e=>!e))}}),null!=(l=m.children)?l:m.label),a.createElement("ul",{className:"menu__list",ref:u,style:{height:h?void 0:E}},o.map(((e,t)=>{let{className:n,...r}=e;return a.createElement("li",{className:"menu__list-item",key:t},a.createElement(y,(0,g.Z)({activeClassName:"menu__link--active",className:f(n)},r,{onClick:m.onClick})))}))))}const I=function(e){let{mobile:t=!1,...n}=e;const r=t?L:C;return a.createElement(r,n)},S="navbarHidden_NPQZ";const D=function(){const{subNavbar:e}=(0,c.LU)(),t=(0,N.TH)(),[n,l]=(0,a.useState)(!1),{baseUrl:o}=(0,b.Z)().siteConfig,[s,i]=(0,a.useState)(!1);(0,E.Z)((e=>{let{scrollY:t}=e;i(!(t<200))})),(0,p.Z)(n);const m=(0,_.Z)();return(0,a.useEffect)((()=>{m===_.D.desktop&&l(!1)}),[m]),a.createElement(a.Fragment,null,a.createElement("nav",{className:(0,r.Z)("navbar","subnavbar--fixed-top","sub-navbar",{[S]:s}),style:{padding:0}},a.createElement("div",{className:"navbar__inner subnavbar__inner"},a.createElement("div",{className:"navbar__items",style:{overflowX:"auto",padding:" var(--ifm-navbar-padding-vertical) var(--ifm-navbar-padding-horizontal)"}},e.map((e=>t.pathname.startsWith((o+(e.dirName||"")).replace(/\/\//g,"/"))?e.items.map(((t,n)=>a.createElement(I,(0,g.Z)({dirname:e.dirName},t,{key:n})))):a.createElement(a.Fragment,null)))))))},T="footerLogoLink_7A53";var x=n(72572);function A(e){let{to:t,href:n,label:r,prependBaseUrlToHref:l,...c}=e;const o=(0,Z.Z)(t),s=(0,Z.Z)(n,{forcePrependBaseUrl:!0});return a.createElement(k.Z,(0,g.Z)({className:"footer__link-item"},n?{href:l?s:n}:{to:o},c),r)}const U=e=>{let{sources:t,alt:n}=e;return a.createElement(x.Z,{className:"footer__logo",alt:n,sources:t})};const H=function(){const{footer:e}=(0,c.LU)(),{copyright:t,links:n=[],logo:l={}}=e||{},o={light:(0,Z.Z)(l.src),dark:(0,Z.Z)(l.srcDark||l.src)};return e?a.createElement("footer",{className:(0,r.Z)("footer",{"footer--dark":"dark"===e.style})},a.createElement("div",{className:"container"},n&&n.length>0&&a.createElement("div",{className:"row footer__links"},n.map(((e,t)=>a.createElement("div",{key:t,className:"col footer__col"},null!=e.title?a.createElement("div",{className:"footer__title"},e.title):null,null!=e.items&&Array.isArray(e.items)&&e.items.length>0?a.createElement("ul",{className:"footer__items"},e.items.map(((e,t)=>e.html?a.createElement("li",{key:t,className:"footer__item",dangerouslySetInnerHTML:{__html:e.html}}):a.createElement("li",{key:e.href||e.to,className:"footer__item"},a.createElement(A,e))))):null)))),(l||t)&&a.createElement("div",{className:"footer__bottom text--center"},l&&(l.src||l.srcDark)&&a.createElement("div",{className:"margin-bottom--sm"},l.href?a.createElement(k.Z,{href:l.href,className:T},a.createElement(U,{alt:l.alt,sources:o})):a.createElement(U,{alt:l.alt,sources:o})),t?a.createElement("div",{className:"footer__copyright",dangerouslySetInnerHTML:{__html:t}}):null))):null};var R=n(8206),M=n(99105);function B(e){let{locale:t,version:n,tag:r}=e;return a.createElement(M.Z,null,t&&a.createElement("meta",{name:"docusaurus_locale",content:t}),n&&a.createElement("meta",{name:"docusaurus_version",content:n}),r&&a.createElement("meta",{name:"docusaurus_tag",content:r}))}var P=n(73322);function V(){const{i18n:{defaultLocale:e,locales:t}}=(0,b.Z)(),n=(0,c.l5)();return a.createElement(M.Z,null,t.map((e=>a.createElement("link",{key:e,rel:"alternate",href:n.createUrl({locale:e,fullyQualified:!0}),hrefLang:e}))),a.createElement("link",{rel:"alternate",href:n.createUrl({locale:e,fullyQualified:!0}),hrefLang:"x-default"}))}function z(e){let{permalink:t}=e;const{siteConfig:{url:n}}=(0,b.Z)(),r=function(){const{siteConfig:{url:e}}=(0,b.Z)(),{pathname:t}=(0,N.TH)();return e+(0,Z.Z)(t)}(),l=t?""+n+t:r;return a.createElement(M.Z,null,a.createElement("meta",{property:"og:url",content:l}),a.createElement("link",{rel:"canonical",href:l}))}function W(e){const{siteConfig:{favicon:t,themeConfig:{metadatas:n,image:r}},i18n:{currentLocale:l,localeConfigs:o}}=(0,b.Z)(),{title:s,description:i,image:m,keywords:u,searchMetadatas:d}=e,h=(0,Z.Z)(t),v=(0,c.pe)(s),f=l,E=o[l].direction;return a.createElement(a.Fragment,null,a.createElement(M.Z,null,a.createElement("html",{lang:f,dir:E}),t&&a.createElement("link",{rel:"shortcut icon",href:h}),a.createElement("title",null,v),a.createElement("meta",{property:"og:title",content:v}),m||r&&a.createElement("meta",{name:"twitter:card",content:"summary_large_image"})),a.createElement(P.Z,{description:i,keywords:u,image:m}),a.createElement(z,null),a.createElement(V,null),a.createElement(B,(0,g.Z)({tag:c.HX,locale:l},d)),a.createElement(M.Z,null,n.map(((e,t)=>a.createElement("meta",(0,g.Z)({key:"metadata_"+t},e))))))}const O=function(){(0,a.useEffect)((()=>{const e="navigation-with-keyboard";function t(t){"keydown"===t.type&&"Tab"===t.key&&document.body.classList.add(e),"mousedown"===t.type&&document.body.classList.remove(e)}return document.addEventListener("keydown",t),document.addEventListener("mousedown",t),()=>{document.body.classList.remove(e),document.removeEventListener("keydown",t),document.removeEventListener("mousedown",t)}}),[])};const q=function(e){const{children:t,noFooter:n,wrapperClassName:l,pageClassName:o}=e;return O(),a.createElement(R.Z,null,a.createElement(W,e),a.createElement(i,null),a.createElement(v,null),a.createElement(f.Z,null),a.createElement(D,null),a.createElement("div",{className:(0,r.Z)(c.kM.wrapper.main,l,o)},t),!n&&a.createElement(H,null))}},8206:(e,t,n)=>{n.d(t,{Z:()=>p});var a=n(67294),r=n(10412),l=n(39306);const c=(0,l.WA)("theme"),o="light",s="dark",i=e=>e===s?s:o,m=e=>{(0,l.WA)("theme").set(i(e))},u=()=>{const{colorMode:{defaultMode:e,disableSwitch:t,respectPrefersColorScheme:n}}=(0,l.LU)(),[u,d]=(0,a.useState)((e=>r.Z.canUseDOM?i(document.documentElement.getAttribute("data-theme")):i(e))(e)),h=(0,a.useCallback)((()=>{d(o),m(o)}),[]),v=(0,a.useCallback)((()=>{d(s),m(s)}),[]);return(0,a.useEffect)((()=>{document.documentElement.setAttribute("data-theme",i(u))}),[u]),(0,a.useEffect)((()=>{if(!t)try{const e=c.get();null!==e&&d(i(e))}catch(e){console.error(e)}}),[d]),(0,a.useEffect)((()=>{t&&!n||window.matchMedia("(prefers-color-scheme: dark)").addListener((e=>{let{matches:t}=e;d(t?s:o)}))}),[]),{isDarkTheme:u===s,setLightTheme:h,setDarkTheme:v}};var d=n(17526);const h=function(e){const{isDarkTheme:t,setLightTheme:n,setDarkTheme:r}=u();return a.createElement(d.Z.Provider,{value:{isDarkTheme:t,setLightTheme:n,setDarkTheme:r}},e.children)},v="docusaurus.tab.",f=()=>{const[e,t]=(0,a.useState)({}),n=(0,a.useCallback)(((e,t)=>{(0,l.WA)("docusaurus.tab."+e).set(t)}),[]);return(0,a.useEffect)((()=>{try{const e={};(0,l._f)().forEach((t=>{if(t.startsWith(v)){const n=t.substring(v.length);e[n]=(0,l.WA)(t).get()}})),t(e)}catch(e){console.error(e)}}),[]),{tabGroupChoices:e,setTabGroupChoices:(e,a)=>{t((t=>({...t,[e]:a}))),n(e,a)}}};var g=n(12674);const E=function(e){const{tabGroupChoices:t,setTabGroupChoices:n}=f();return a.createElement(g.Z.Provider,{value:{tabGroupChoices:t,setTabGroupChoices:n}},e.children)};function p(e){let{children:t}=e;return a.createElement(h,null,a.createElement(l.pl,null,a.createElement(E,null,a.createElement(l.L5,null,t))))}},65475:(e,t,n)=>{n.d(t,{Z:()=>i});var a=n(87462),r=n(67294),l=n(36742),c=n(72572),o=n(44996),s=n(52263);const i=e=>{const{siteConfig:{title:t,themeConfig:{navbar:{title:n,logo:i={src:""}}}},isClient:m}=(0,s.Z)(),{imageClassName:u,...d}=e,h=(0,o.Z)(i.href||"/"),v={light:(0,o.Z)(i.src),dark:(0,o.Z)(i.srcDark||i.src)};return r.createElement(l.Z,(0,a.Z)({to:h},d,i.target&&{target:i.target}),i.src&&r.createElement(c.Z,{key:m,className:u,sources:v,alt:i.alt||n||t}))}},67919:(e,t,n)=>{n.d(t,{Z:()=>U});var a=n(87462),r=n(67294),l=n(86010),c=n(25865),o=n(72572),s=n(39306),i=n(44996),m=n(52263);const u={toggle:"toggle_8pH0"},d=e=>{let{icon:t,style:n}=e;return r.createElement("span",{className:(0,l.Z)(u.toggle,u.dark),style:n},r.createElement(o.Z,{sources:t}))},h=e=>{let{icon:t,style:n}=e;return r.createElement("span",{className:(0,l.Z)(u.toggle,u.light),style:n},r.createElement(o.Z,{sources:t}))},v=(0,r.memo)((e=>{let{className:t,icons:n,checked:a,disabled:c,onChange:o}=e;const[s,i]=(0,r.useState)(a),m=(0,r.useRef)(null);return r.createElement("div",{className:(0,l.Z)("react-toggle",t,{"react-toggle--checked":s,"react-toggle--disabled":c})},r.createElement("div",{className:"react-toggle-track",role:"button",tabIndex:-1,onClick:()=>{var e;return null==(e=m.current)?void 0:e.click()}},r.createElement("div",{className:"react-toggle-track-check"},n.checked),r.createElement("div",{className:"react-toggle-track-x"},n.unchecked)),r.createElement("input",{ref:m,checked:s,type:"checkbox",className:"react-toggle-screenreader-only","aria-label":"Switch between dark and light mode",onChange:o,onClick:()=>i(!s)}))}));function f(e){const{colorMode:{switchConfig:{darkIcon:t,darkIconStyle:n,lightIcon:l,lightIconStyle:c}}}=(0,s.LU)(),{isClient:o}=(0,m.Z)();return r.createElement(v,(0,a.Z)({disabled:!o,icons:{checked:r.createElement(h,{icon:{light:(0,i.Z)(l.light),dark:(0,i.Z)(l.dark)},style:c}),unchecked:r.createElement(d,{icon:{light:(0,i.Z)(t.light),dark:(0,i.Z)(t.dark)},style:n})}},e))}var g=n(27181),E=n(5977),p=n(69936);const b=e=>{const t=(0,E.TH)(),[n,a]=(0,r.useState)(e),l=(0,r.useRef)(!1),[c,o]=(0,r.useState)(0),i=(0,r.useCallback)((e=>{null!==e&&o(e.getBoundingClientRect().height)}),[]);return(0,p.Z)(((t,n)=>{let{scrollY:r}=t,{scrollY:o}=n;if(!e)return;if(r<c)return void a(!0);if(l.current)return l.current=!1,void a(!1);o&&0===r&&a(!0);const s=document.documentElement.scrollHeight-c,i=window.innerHeight;o&&r>=o?a(!1):r+i<s&&a(!0)}),[c,l]),(0,s.SL)((t=>{e&&!t.location.hash&&a(!0)})),(0,r.useEffect)((()=>{e&&t.hash&&(l.current=!0)}),[t.hash]),{navbarRef:i,isNavbarVisible:n}};var _=n(4146),k=n(35202),Z=n(14938);const N=e=>{let{width:t=20,height:n=20,...l}=e;return r.createElement("svg",(0,a.Z)({viewBox:"0 0 20 20",width:t,height:n,"aria-hidden":"true"},l),r.createElement("path",{fill:"currentColor",d:"M19.753 10.909c-.624-1.707-2.366-2.726-4.661-2.726-.09 0-.176.002-.262.006l-.016-2.063 3.525-.607c.115-.019.133-.119.109-.231-.023-.111-.167-.883-.188-.976-.027-.131-.102-.127-.207-.109-.104.018-3.25.461-3.25.461l-.013-2.078c-.001-.125-.069-.158-.194-.156l-1.025.016c-.105.002-.164.049-.162.148l.033 2.307s-3.061.527-3.144.543c-.084.014-.17.053-.151.143.019.09.19 1.094.208 1.172.018.08.072.129.188.107l2.924-.504.035 2.018c-1.077.281-1.801.824-2.256 1.303-.768.807-1.207 1.887-1.207 2.963 0 1.586.971 2.529 2.328 2.695 3.162.387 5.119-3.06 5.769-4.715 1.097 1.506.256 4.354-2.094 5.98-.043.029-.098.129-.033.207l.619.756c.08.096.206.059.256.023 2.51-1.73 3.661-4.515 2.869-6.683zm-7.386 3.188c-.966-.121-.944-.914-.944-1.453 0-.773.327-1.58.876-2.156a3.21 3.21 0 011.229-.799l.082 4.277a2.773 2.773 0 01-1.243.131zm2.427-.553l.046-4.109c.084-.004.166-.01.252-.01.773 0 1.494.145 1.885.361.391.217-1.023 2.713-2.183 3.758zm-8.95-7.668a.196.196 0 00-.196-.145h-1.95a.194.194 0 00-.194.144L.008 16.916c-.017.051-.011.076.062.076h1.733c.075 0 .099-.023.114-.072l1.008-3.318h3.496l1.008 3.318c.016.049.039.072.113.072h1.734c.072 0 .078-.025.062-.076-.014-.05-3.083-9.741-3.494-11.04zm-2.618 6.318l1.447-5.25 1.447 5.25H3.226z"}))};function w(e){let{mobile:t,dropdownItemsBefore:n,dropdownItemsAfter:l,...c}=e;const{i18n:{currentLocale:o,locales:i,localeConfigs:u}}=(0,m.Z)(),d=(0,s.l5)();function h(e){return u[e].label}const v=[...n,...i.map((e=>{const t="pathname://"+d.createUrl({locale:e,fullyQualified:!1});return{isNavLink:!0,label:h(e),to:t,target:"_self",autoAddBaseUrl:!1,className:e===o?"dropdown__link--active":"",style:{textTransform:"capitalize"}}})),...l],f=t?"Languages":h(o);return r.createElement(Z.Z,(0,a.Z)({},c,{href:"#",mobile:t,label:r.createElement("span",null,r.createElement(N,{style:{verticalAlign:"text-bottom",marginRight:5}}),r.createElement("span",null,f)),items:v}))}function y(e){let{mobile:t}=e;return t?null:r.createElement(c.Z,null)}const C={default:()=>Z.Z,localeDropdown:()=>w,search:()=>y,docsVersion:()=>n(73747).Z,docsVersionDropdown:()=>n(66701).Z,doc:()=>n(76431).Z};function L(e){let{type:t,...n}=e;const a=function(e){void 0===e&&(e="default");const t=C[e];if(!t)throw new Error('No NavbarItem component found for type "'+e+'".');return t()}(t);return r.createElement(a,n)}var I=n(65475),S=n(80607);const D="displayOnlyInLargeViewport_a-w0",T="navbarHideable_0LFp",x="navbarHidden_97UM",A="right";const U=function(){const{navbar:{items:e,hideOnScroll:t,style:n},colorMode:{disableSwitch:o}}=(0,s.LU)(),[i,m]=(0,r.useState)(!1),{isDarkTheme:u,setLightTheme:d,setDarkTheme:h}=(0,g.Z)(),{navbarRef:v,isNavbarVisible:E}=b(t),[Z,N]=(0,r.useState)(!1);(0,p.Z)((e=>{let{scrollY:t}=e;N(!(t<200))})),(0,_.Z)(i);const w=(0,r.useCallback)((()=>{m(!0)}),[m]),y=(0,r.useCallback)((()=>{m(!1)}),[m]),C=(0,r.useCallback)((e=>e.target.checked?h():d()),[d,h]),U=(0,k.Z)();(0,r.useEffect)((()=>{U===k.D.desktop&&m(!1)}),[U]);const H=e.some((e=>"search"===e.type)),{leftItems:R,rightItems:M}=function(e){return{leftItems:e.filter((e=>{var t;return"left"===(null!=(t=e.position)?t:A)})),rightItems:e.filter((e=>{var t;return"right"===(null!=(t=e.position)?t:A)}))}}(e);return r.createElement("nav",{ref:v,className:(0,l.Z)("navbar","navbar--fixed-top",{"navbar--dark":"dark"===n,"navbar--primary":"primary"===n,"navbar-sidebar--show":i,[T]:t,[x]:t&&!E||Z})},r.createElement("div",{className:"navbar__inner"},r.createElement("div",{className:"navbar__items"},null!=e&&0!==e.length&&r.createElement("button",{"aria-label":"Navigation bar toggle",className:"navbar__toggle clean-btn",type:"button",tabIndex:0,onClick:w,onKeyDown:w},r.createElement(S.Z,null)),r.createElement(I.Z,{className:"navbar__brand",imageClassName:"navbar__logo",titleClassName:"navbar__title"}),R.map(((e,t)=>r.createElement(L,(0,a.Z)({},e,{key:t}))))),r.createElement("div",{className:"navbar__items navbar__items--right"},M.map(((e,t)=>r.createElement(L,(0,a.Z)({},e,{key:t})))),!o&&r.createElement(f,{className:D,checked:u,onChange:C}),!H&&r.createElement(c.Z,null))),r.createElement("div",{role:"presentation",className:"navbar-sidebar__backdrop",onClick:y}),r.createElement("div",{className:"navbar-sidebar"},r.createElement("div",{className:"navbar-sidebar__brand"},r.createElement(I.Z,{className:"navbar__brand",imageClassName:"navbar__logo",titleClassName:"navbar__title",onClick:y}),!o&&i&&r.createElement(f,{checked:u,onChange:C})),r.createElement("div",{className:"navbar-sidebar__items"},r.createElement("div",{className:"menu"},r.createElement("ul",{className:"menu__list"},e.map(((e,t)=>r.createElement(L,(0,a.Z)({mobile:!0},e,{onClick:y,key:t})))))))))}},14938:(e,t,n)=>{n.d(t,{Z:()=>v});var a=n(87462),r=n(67294),l=n(86010),c=n(36742),o=n(44996),s=n(5977),i=n(39306),m=n(13919);function u(e){let{activeBasePath:t,activeBaseRegex:n,to:l,href:s,label:i,activeClassName:u="navbar__link--active",prependBaseUrlToHref:d,...h}=e;const v=(0,o.Z)(l),f=(0,o.Z)(s,{forcePrependBaseUrl:!0}),g=i&&s&&!(0,m.Z)(s);return r.createElement(c.Z,(0,a.Z)({},s?{href:d?f:s}:{isNavLink:!0,activeClassName:u,to:v,...t||n?{isActive:(e,a)=>n?new RegExp(n).test(a.pathname):a.pathname.startsWith(t)}:null},h),g?r.createElement("span",{className:"navbar__exlink"},i):i)}function d(e){var t;let{items:n,position:c,className:o,...s}=e;const i=(0,r.useRef)(null),m=(0,r.useRef)(null),[d,h]=(0,r.useState)(!1);(0,r.useEffect)((()=>{const e=e=>{i.current&&!i.current.contains(e.target)&&h(!1)};return document.addEventListener("mousedown",e),document.addEventListener("touchstart",e),()=>{document.removeEventListener("mousedown",e),document.removeEventListener("touchstart",e)}}),[i]);const v=function(e,t){return void 0===t&&(t=!1),(0,l.Z)({"navbar__item navbar__link":!t,dropdown__link:t},e)};return n?r.createElement("div",{ref:i,className:(0,l.Z)("navbar__item","dropdown","dropdown--hoverable",{"dropdown--left":"left"===c,"dropdown--right":"right"===c,"dropdown--show":d})},r.createElement(u,(0,a.Z)({className:v(o)},s,{onClick:s.to?void 0:e=>e.preventDefault(),onKeyDown:e=>{"Enter"===e.key&&(e.preventDefault(),h(!d))}}),null!=(t=s.children)?t:s.label),r.createElement("ul",{ref:m,className:"dropdown__menu"},n.map(((e,t)=>{let{className:l,...c}=e;return r.createElement("li",{key:t},r.createElement(u,(0,a.Z)({onKeyDown:e=>{if(t===n.length-1&&"Tab"===e.key){e.preventDefault(),h(!1);const t=i.current.nextElementSibling;t&&t.focus()}},activeClassName:"dropdown__link--active",className:v(l,!0)},c)))})))):r.createElement(u,(0,a.Z)({className:v(o)},s))}function h(e){var t,n,c;let{items:o,className:m,position:d,...h}=e;const v=(0,r.useRef)(null),{pathname:f}=(0,s.TH)(),[g,E]=(0,r.useState)((()=>{var e;return null==(e=!(null!=o&&o.some((e=>(0,i.Mg)(e.to,f)))))||e})),p=function(e,t){return void 0===t&&(t=!1),(0,l.Z)("menu__link",{"menu__link--sublist":t},e)};if(!o)return r.createElement("li",{className:"menu__list-item"},r.createElement(u,(0,a.Z)({activeClassName:"mobile__navbar__link--active",className:p(m)},h)));const b=null!=(t=v.current)&&t.scrollHeight?(null==(n=v.current)?void 0:n.scrollHeight)+"px":void 0;return r.createElement("li",{className:(0,l.Z)("menu__list-item",{"menu__list-item--collapsed":g})},r.createElement(u,(0,a.Z)({role:"button",className:p(m,!0)},h,{onClick:e=>{e.preventDefault(),E((e=>!e))}}),null!=(c=h.children)?c:h.label),r.createElement("ul",{className:"menu__list",ref:v,style:{height:g?void 0:b}},o.map(((e,t)=>{let{className:n,...l}=e;return r.createElement("li",{className:"menu__list-item",key:t},r.createElement(u,(0,a.Z)({activeClassName:"menu__link--active",className:p(n)},l,{onClick:h.onClick})))}))))}const v=function(e){let{mobile:t=!1,...n}=e;const a=t?h:d;return r.createElement(a,n)}},76431:(e,t,n)=>{n.d(t,{Z:()=>m});var a=n(87462),r=n(67294),l=n(14938),c=n(47227),o=n(86010),s=n(39306),i=n(18780);function m(e){let{docId:t,activeSidebarClassName:n,label:m,docsPluginId:u,...d}=e;const{activeVersion:h,activeDoc:v}=(0,c.Iw)(u),{preferredVersion:f}=(0,s.J)(u),g=(0,c.yW)(u),E=function(e,t){const n=[].concat(...e.map((e=>e.docs))),a=n.find((e=>e.id===t));if(!a){const a=n.map((e=>e.id)).join("\n- ");throw new Error("DocNavbarItem: couldn't find any doc with id \""+t+'" in version'+(e.length?"s":"")+" "+e.map((e=>e.name)).join(", ")+'".\nAvailable doc ids are:\n- '+a)}return a}((0,i.uniq)([h,f,g].filter(Boolean)),t);return r.createElement(l.Z,(0,a.Z)({exact:!0},d,{className:(0,o.Z)(d.className,{[n]:v&&v.sidebar===E.sidebar}),label:null!=m?m:E.id,to:E.path}))}},66701:(e,t,n)=>{n.d(t,{Z:()=>i});var a=n(87462),r=n(67294),l=n(14938),c=n(47227),o=n(39306);const s=e=>e.docs.find((t=>t.id===e.mainDocId));function i(e){var t,n;let{mobile:i,docsPluginId:m,dropdownActiveClassDisabled:u,dropdownItemsBefore:d,dropdownItemsAfter:h,...v}=e;const f=(0,c.Iw)(m),g=(0,c.gB)(m),E=(0,c.yW)(m),{preferredVersion:p,savePreferredVersionName:b}=(0,o.J)(m);const _=function(){const e=g.map((e=>{const t=(null==f?void 0:f.alternateDocVersions[e.name])||s(e);return{isNavLink:!0,label:e.label,to:t.path,isActive:()=>e===(null==f?void 0:f.activeVersion),onClick:()=>{b(e.name)}}})),t=[...d,...e,...h];if(!(t.length<=1))return t}(),k=null!=(t=null!=(n=f.activeVersion)?n:p)?t:E,Z=i&&_?"Versions":k.label,N=i&&_?void 0:s(k).path;return r.createElement(l.Z,(0,a.Z)({},v,{mobile:i,label:Z,to:N,items:_,isActive:u?()=>!1:void 0}))}},73747:(e,t,n)=>{n.d(t,{Z:()=>s});var a=n(87462),r=n(67294),l=n(14938),c=n(47227),o=n(39306);function s(e){var t;let{label:n,to:s,docsPluginId:i,...m}=e;const u=(0,c.zu)(i),{preferredVersion:d}=(0,o.J)(i),h=(0,c.yW)(i),v=null!=(t=null!=u?u:d)?t:h,f=null!=n?n:v.label,g=null!=s?s:(e=>e.docs.find((t=>t.id===e.mainDocId)))(v).path;return r.createElement(l.Z,(0,a.Z)({},m,{label:f,to:g}))}},73322:(e,t,n)=>{n.d(t,{Z:()=>o});var a=n(67294),r=n(99105),l=n(39306),c=n(44996);function o(e){let{title:t,description:n,keywords:o,image:s}=e;const{image:i}=(0,l.LU)(),m=(0,l.pe)(t),u=(0,c.Z)(s||i,{absolute:!0});return a.createElement(r.Z,null,t&&a.createElement("title",null,m),t&&a.createElement("meta",{property:"og:title",content:m}),n&&a.createElement("meta",{name:"description",content:n}),n&&a.createElement("meta",{property:"og:description",content:n}),o&&a.createElement("meta",{name:"keywords",content:Array.isArray(o)?o.join(","):o}),u&&a.createElement("meta",{property:"og:image",content:u}),u&&a.createElement("meta",{name:"twitter:image",content:u}))}},17526:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n(67294).createContext(void 0)},72572:(e,t,n)=>{n.d(t,{Z:()=>i});var a=n(87462),r=n(67294),l=n(86010),c=n(52263),o=n(27181);const s={themedImage:"themedImage_K3WP","themedImage--light":"themedImage--light_Fy0T","themedImage--dark":"themedImage--dark_V9oi"},i=e=>{const{isClient:t}=(0,c.Z)(),{isDarkTheme:n}=(0,o.Z)(),{sources:i,className:m,alt:u="",...d}=e,h=t?n?["dark"]:["light"]:["light","dark"];return r.createElement(r.Fragment,null,h.map((e=>r.createElement("img",(0,a.Z)({key:e,src:i[e],alt:u,className:(0,l.Z)(s.themedImage,s["themedImage--"+e],m)},d)))))}},12674:(e,t,n)=>{n.d(t,{Z:()=>a});const a=(0,n(67294).createContext)(void 0)},47227:(e,t,n)=>{n.d(t,{Iw:()=>a.useActiveDocContext,Jo:()=>a.useDocVersionSuggestions,_r:()=>a.useAllDocsData,gA:()=>a.useActivePlugin,gB:()=>a.useVersions,yW:()=>a.useLatestVersion,zh:()=>a.useDocsData,zu:()=>a.useActiveVersion});var a=n(96730)},4146:(e,t,n)=>{n.d(t,{Z:()=>r});var a=n(67294);const r=function(e){void 0===e&&(e=!0),(0,a.useEffect)((()=>(document.body.style.overflow=e?"hidden":"visible",()=>{document.body.style.overflow="visible"})),[e])}},69936:(e,t,n)=>{n.d(t,{Z:()=>c});var a=n(67294),r=n(10412);const l=()=>({scrollX:r.Z.canUseDOM?window.pageXOffset:0,scrollY:r.Z.canUseDOM?window.pageYOffset:0}),c=function(e,t){void 0===t&&(t=[]);const n=(0,a.useRef)(l()),r=()=>{const t=l();e&&e(t,n.current),n.current=t};(0,a.useEffect)((()=>{const e={passive:!0};return r(),window.addEventListener("scroll",r,e),()=>window.removeEventListener("scroll",r,e)}),t)}},27181:(e,t,n)=>{n.d(t,{Z:()=>l});var a=n(67294),r=n(17526);const l=function(){const e=(0,a.useContext)(r.Z);if(null==e)throw new Error('"useThemeContext" is used outside of "Layout" component. Please see https://docusaurus.io/docs/api/themes/configuration#usethemecontext.');return e}},35202:(e,t,n)=>{n.d(t,{D:()=>l,Z:()=>c});var a=n(67294),r=n(10412);const l={desktop:"desktop",mobile:"mobile"};const c=function(){const e=r.Z.canUseDOM;function t(){if(e)return window.innerWidth>1255?l.desktop:l.mobile}const[n,c]=(0,a.useState)(t);return(0,a.useEffect)((()=>{if(e)return window.addEventListener("resize",n),()=>window.removeEventListener("resize",n);function n(){c(t())}}),[]),n}}}]);