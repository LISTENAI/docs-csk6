"use strict";(self.webpackChunkls_docs_web=self.webpackChunkls_docs_web||[]).push([[1162],{20895:(e,t,n)=>{n.d(t,{Hk:()=>m,Iz:()=>u,_k:()=>o,dK:()=>l,qo:()=>i,rx:()=>s,vc:()=>c});var a=n(31336),r=n.n(a);n(30892)(r()),n(54212).w(r()),n(74182)(r());const l=["en","zh"],o=!1,c=null,s=null,i=8,m=50,u={search_placeholder:"\u641c\u7d22",see_all_results:"\u67e5\u770b\u6240\u6709\u7ed3\u679c",no_results:"\u65e0\u67e5\u8be2\u7ed3\u679c",search_results_for:'\u641c\u7d22\u5173\u952e\u5b57 "{{ keyword }}" \u7684\u7ed3\u679c',count_documents_found_plural:"\u5171 {{ count }} \u4e2a\u67e5\u8be2\u7ed3\u679c",no_documents_were_found:"\u65e0\u67e5\u8be2\u7ed3\u679c",search_the_documentation:"Search the documentation",count_documents_found:"{{ count }} document found"}},24973:(e,t,n)=>{n.d(t,{Z:()=>u,I:()=>m});var a=n(67294);const r=/{\w+}/g,l="{}";function o(e,t){const n=[],o=e.replace(r,(e=>{const r=e.substr(1,e.length-2),o=null==t?void 0:t[r];if(void 0!==o){const e=a.isValidElement(o)?o:String(o);return n.push(e),l}return e}));return 0===n.length?e:n.every((e=>"string"==typeof e))?o.split(l).reduce(((e,t,a)=>{var r;return e.concat(t).concat(null!==(r=n[a])&&void 0!==r?r:"")}),""):o.split(l).reduce(((e,t,r)=>[...e,a.createElement(a.Fragment,{key:r},t,n[r])]),[])}function c(e){let{children:t,values:n}=e;return o(t,n)}var s=n(57529);function i(e){let{id:t,message:n}=e;var a;return null!==(a=s[null!=t?t:n])&&void 0!==a?a:n}function m(e,t){let{message:n,id:a}=e;var r;return o(null!==(r=i({message:n,id:a}))&&void 0!==r?r:n,t)}function u(e){let{children:t,id:n,values:r}=e;var l;const o=null!==(l=i({message:t,id:n}))&&void 0!==l?l:t;return a.createElement(c,{values:r},o)}},80607:(e,t,n)=>{n.d(t,{Z:()=>l});var a=n(87462),r=n(67294);const l=e=>{let{width:t=30,height:n=30,className:l,...o}=e;return r.createElement("svg",(0,a.Z)({className:l,width:t,height:n,viewBox:"0 0 30 30","aria-hidden":"true"},o),r.createElement("path",{stroke:"currentColor",strokeLinecap:"round",strokeMiterlimit:"10",strokeWidth:"2",d:"M4 7h22M4 15h22M4 23h22"}))}},40932:(e,t,n)=>{n.d(t,{Z:()=>O});var a=n(67294),r=n(86010),l=n(24973),o=n(39306);const c="skipToContent_vO2r";function s(e){e.setAttribute("tabindex","-1"),e.focus(),e.removeAttribute("tabindex")}const i=function(){const e=(0,a.useRef)(null);return(0,o.SL)((t=>{let{location:n}=t;e.current&&!n.hash&&s(e.current)})),a.createElement("div",{ref:e},a.createElement("a",{href:"#main",className:c,onClick:e=>{e.preventDefault();const t=document.querySelector("main:first-of-type")||document.querySelector(".main-wrapper");t&&s(t)}},a.createElement(l.Z,{id:"theme.common.skipToMainContent",description:"The skip to content label used for accessibility, allowing to rapidly navigate to main content with keyboard tab/enter navigation"},"Skip to main content")))},m="announcementBar_i4ae",u="announcementBarClose_1H6k",d="announcementBarContent_7r5X",h="announcementBarCloseable_cuQL";const v=function(){const{isClosed:e,close:t}=(0,o.nT)(),{announcementBar:n}=(0,o.LU)();if(!n)return null;const{content:c,backgroundColor:s,textColor:i,isCloseable:v}=n;return!c||v&&e?null:a.createElement("div",{className:m,style:{backgroundColor:s,color:i},role:"banner"},a.createElement("div",{className:(0,r.Z)(d,{[h]:v}),dangerouslySetInnerHTML:{__html:c}}),v?a.createElement("button",{type:"button",className:(0,r.Z)(u,"clean-btn"),onClick:t,"aria-label":(0,l.I)({id:"theme.AnnouncementBar.closeButtonAriaLabel",message:"Close",description:"The ARIA label for close button of announcement bar"})},a.createElement("span",{"aria-hidden":"true"},"\xd7")):null)};var f=n(67919),E=n(87462),g=n(69936),p=n(4146),b=n(35202),_=n(36742),k=n(44996),Z=n(5977),N=n(13919);function w(e){let{activeBasePath:t,activeBaseRegex:n,to:r,href:l,label:o,activeClassName:c="subnavbar__link--active",prependBaseUrlToHref:s,...i}=e;const m=(0,k.Z)(r),u=(0,k.Z)(t),d=(0,k.Z)(l,{forcePrependBaseUrl:!0}),h=o&&l&&!(0,N.Z)(l);return a.createElement(_.Z,(0,E.Z)({},l?{href:s?d:l}:{isNavLink:!0,activeClassName:c,to:m,...t||n?{isActive:(e,t)=>n?new RegExp(n).test(t.pathname):t.pathname.startsWith(u)}:null},i),h?a.createElement("span",{className:"navbar__exlink"},o):o)}function y(e){var t;let{items:n,position:l,className:o,...c}=e;const s=(0,a.useRef)(null),i=(0,a.useRef)(null),[m,u]=(0,a.useState)(!1);(0,a.useEffect)((()=>{const e=e=>{s.current&&!s.current.contains(e.target)&&u(!1)};return document.addEventListener("mousedown",e),document.addEventListener("touchstart",e),()=>{document.removeEventListener("mousedown",e),document.removeEventListener("touchstart",e)}}),[s]);const d=function(e,t){return void 0===t&&(t=!1),(0,r.Z)({"subnavbar__item subnavbar__link":!t,dropdown__link:t},e)};return n?a.createElement("div",{ref:s,className:(0,r.Z)("navbar__item","dropdown","dropdown--hoverable",{"dropdown--left":"left"===l,"dropdown--right":"right"===l,"dropdown--show":m})},a.createElement(w,(0,E.Z)({className:d(o)},c,{onClick:c.to?void 0:e=>e.preventDefault(),onKeyDown:e=>{"Enter"===e.key&&(e.preventDefault(),u(!m))}}),null!=(t=c.children)?t:c.label),a.createElement("ul",{ref:i,className:"dropdown__menu"},n.map(((e,t)=>{let{className:r,...l}=e;return a.createElement("li",{key:t},a.createElement(w,(0,E.Z)({onKeyDown:e=>{if(t===n.length-1&&"Tab"===e.key){e.preventDefault(),u(!1);const t=s.current.nextElementSibling;t&&t.focus()}},activeClassName:"dropdown__link--active",className:d(r,!0)},l)))})))):a.createElement(w,(0,E.Z)({className:d(o)},c))}function C(e){var t,n,l;let{items:c,className:s,position:i,...m}=e;const u=(0,a.useRef)(null),{pathname:d}=(0,Z.TH)(),[h,v]=(0,a.useState)((()=>{var e;return null==(e=!(null!=c&&c.some((e=>(0,o.Mg)(e.to,d)))))||e})),f=function(e,t){return void 0===t&&(t=!1),(0,r.Z)("menu__link",{"menu__link--sublist":t},e)};if(!c)return a.createElement("li",{className:"menu__list-item"},a.createElement(w,(0,E.Z)({className:f(s)},m)));const g=null!=(t=u.current)&&t.scrollHeight?(null==(n=u.current)?void 0:n.scrollHeight)+"px":void 0;return a.createElement("li",{className:(0,r.Z)("menu__list-item",{"menu__list-item--collapsed":h})},a.createElement(w,(0,E.Z)({role:"button",className:f(s,!0)},m,{onClick:e=>{e.preventDefault(),v((e=>!e))}}),null!=(l=m.children)?l:m.label),a.createElement("ul",{className:"menu__list",ref:u,style:{height:h?void 0:g}},c.map(((e,t)=>{let{className:n,...r}=e;return a.createElement("li",{className:"menu__list-item",key:t},a.createElement(w,(0,E.Z)({activeClassName:"menu__link--active",className:f(n)},r,{onClick:m.onClick})))}))))}const L=function(e){let{mobile:t=!1,...n}=e;const r=t?C:y;return a.createElement(r,n)},D="navbarHidden_NPQZ";const I=function(){const{subNavbar:e}=(0,o.LU)(),t=(0,Z.TH)(),[n,l]=(0,a.useState)(!1),[c,s]=(0,a.useState)(!1);(0,g.Z)((e=>{let{scrollY:t}=e;s(!(t<200))})),(0,p.Z)(n);const i=(0,b.Z)();return(0,a.useEffect)((()=>{i===b.D.desktop&&l(!1)}),[i]),a.createElement(a.Fragment,null,a.createElement("nav",{className:(0,r.Z)("navbar","subnavbar--fixed-top","sub-navbar",{[D]:c})},a.createElement("div",{className:"navbar__inner subnavbar__inner"},a.createElement("div",{className:"navbar__items"},e.map((e=>t.pathname.startsWith(e.dirName||"")?e.items.map(((t,n)=>a.createElement(L,(0,E.Z)({dirname:e.dirName},t,{key:n})))):a.createElement(a.Fragment,null)))))))},T="footerLogoLink_7A53";var S=n(72572);function x(e){let{to:t,href:n,label:r,prependBaseUrlToHref:l,...o}=e;const c=(0,k.Z)(t),s=(0,k.Z)(n,{forcePrependBaseUrl:!0});return a.createElement(_.Z,(0,E.Z)({className:"footer__link-item"},n?{href:l?s:n}:{to:c},o),r)}const A=e=>{let{sources:t,alt:n}=e;return a.createElement(S.Z,{className:"footer__logo",alt:n,sources:t})};const B=function(){const{footer:e}=(0,o.LU)(),{copyright:t,links:n=[],logo:l={}}=e||{},c={light:(0,k.Z)(l.src),dark:(0,k.Z)(l.srcDark||l.src)};return e?a.createElement("footer",{className:(0,r.Z)("footer",{"footer--dark":"dark"===e.style})},a.createElement("div",{className:"container"},n&&n.length>0&&a.createElement("div",{className:"row footer__links"},n.map(((e,t)=>a.createElement("div",{key:t,className:"col footer__col"},null!=e.title?a.createElement("div",{className:"footer__title"},e.title):null,null!=e.items&&Array.isArray(e.items)&&e.items.length>0?a.createElement("ul",{className:"footer__items"},e.items.map(((e,t)=>e.html?a.createElement("li",{key:t,className:"footer__item",dangerouslySetInnerHTML:{__html:e.html}}):a.createElement("li",{key:e.href||e.to,className:"footer__item"},a.createElement(x,e))))):null)))),(l||t)&&a.createElement("div",{className:"footer__bottom text--center"},l&&(l.src||l.srcDark)&&a.createElement("div",{className:"margin-bottom--sm"},l.href?a.createElement(_.Z,{href:l.href,className:T},a.createElement(A,{alt:l.alt,sources:c})):a.createElement(A,{alt:l.alt,sources:c})),t?a.createElement("div",{className:"footer__copyright",dangerouslySetInnerHTML:{__html:t}}):null))):null};var H=n(8206),M=n(99105),U=n(52263);function R(e){let{locale:t,version:n,tag:r}=e;return a.createElement(M.Z,null,t&&a.createElement("meta",{name:"docusaurus_locale",content:t}),n&&a.createElement("meta",{name:"docusaurus_version",content:n}),r&&a.createElement("meta",{name:"docusaurus_tag",content:r}))}var V=n(73322);function P(){const{i18n:{defaultLocale:e,locales:t}}=(0,U.Z)(),n=(0,o.l5)();return a.createElement(M.Z,null,t.map((e=>a.createElement("link",{key:e,rel:"alternate",href:n.createUrl({locale:e,fullyQualified:!0}),hrefLang:e}))),a.createElement("link",{rel:"alternate",href:n.createUrl({locale:e,fullyQualified:!0}),hrefLang:"x-default"}))}function W(e){let{permalink:t}=e;const{siteConfig:{url:n}}=(0,U.Z)(),r=function(){const{siteConfig:{url:e}}=(0,U.Z)(),{pathname:t}=(0,Z.TH)();return e+(0,k.Z)(t)}(),l=t?""+n+t:r;return a.createElement(M.Z,null,a.createElement("meta",{property:"og:url",content:l}),a.createElement("link",{rel:"canonical",href:l}))}function F(e){const{siteConfig:{favicon:t,themeConfig:{metadatas:n,image:r}},i18n:{currentLocale:l,localeConfigs:c}}=(0,U.Z)(),{title:s,description:i,image:m,keywords:u,searchMetadatas:d}=e,h=(0,k.Z)(t),v=(0,o.pe)(s),f=l,g=c[l].direction;return a.createElement(a.Fragment,null,a.createElement(M.Z,null,a.createElement("html",{lang:f,dir:g}),t&&a.createElement("link",{rel:"shortcut icon",href:h}),a.createElement("title",null,v),a.createElement("meta",{property:"og:title",content:v}),m||r&&a.createElement("meta",{name:"twitter:card",content:"summary_large_image"})),a.createElement(V.Z,{description:i,keywords:u,image:m}),a.createElement(W,null),a.createElement(P,null),a.createElement(R,(0,E.Z)({tag:o.HX,locale:l},d)),a.createElement(M.Z,null,n.map(((e,t)=>a.createElement("meta",(0,E.Z)({key:"metadata_"+t},e))))))}const z=function(){(0,a.useEffect)((()=>{const e="navigation-with-keyboard";function t(t){"keydown"===t.type&&"Tab"===t.key&&document.body.classList.add(e),"mousedown"===t.type&&document.body.classList.remove(e)}return document.addEventListener("keydown",t),document.addEventListener("mousedown",t),()=>{document.body.classList.remove(e),document.removeEventListener("keydown",t),document.removeEventListener("mousedown",t)}}),[])};const O=function(e){const{children:t,noFooter:n,wrapperClassName:l,pageClassName:c}=e;return z(),a.createElement(H.Z,null,a.createElement(F,e),a.createElement(i,null),a.createElement(v,null),a.createElement(f.Z,null),a.createElement(I,null),a.createElement("div",{className:(0,r.Z)(o.kM.wrapper.main,l,c)},t),!n&&a.createElement(B,null))}},8206:(e,t,n)=>{n.d(t,{Z:()=>p});var a=n(67294),r=n(10412),l=n(39306);const o=(0,l.WA)("theme"),c="light",s="dark",i=e=>e===s?s:c,m=e=>{(0,l.WA)("theme").set(i(e))},u=()=>{const{colorMode:{defaultMode:e,disableSwitch:t,respectPrefersColorScheme:n}}=(0,l.LU)(),[u,d]=(0,a.useState)((e=>r.Z.canUseDOM?i(document.documentElement.getAttribute("data-theme")):i(e))(e)),h=(0,a.useCallback)((()=>{d(c),m(c)}),[]),v=(0,a.useCallback)((()=>{d(s),m(s)}),[]);return(0,a.useEffect)((()=>{document.documentElement.setAttribute("data-theme",i(u))}),[u]),(0,a.useEffect)((()=>{if(!t)try{const e=o.get();null!==e&&d(i(e))}catch(e){console.error(e)}}),[d]),(0,a.useEffect)((()=>{t&&!n||window.matchMedia("(prefers-color-scheme: dark)").addListener((e=>{let{matches:t}=e;d(t?s:c)}))}),[]),{isDarkTheme:u===s,setLightTheme:h,setDarkTheme:v}};var d=n(17526);const h=function(e){const{isDarkTheme:t,setLightTheme:n,setDarkTheme:r}=u();return a.createElement(d.Z.Provider,{value:{isDarkTheme:t,setLightTheme:n,setDarkTheme:r}},e.children)},v="docusaurus.tab.",f=()=>{const[e,t]=(0,a.useState)({}),n=(0,a.useCallback)(((e,t)=>{(0,l.WA)("docusaurus.tab."+e).set(t)}),[]);return(0,a.useEffect)((()=>{try{const e={};(0,l._f)().forEach((t=>{if(t.startsWith(v)){const n=t.substring(v.length);e[n]=(0,l.WA)(t).get()}})),t(e)}catch(e){console.error(e)}}),[]),{tabGroupChoices:e,setTabGroupChoices:(e,a)=>{t((t=>({...t,[e]:a}))),n(e,a)}}};var E=n(12674);const g=function(e){const{tabGroupChoices:t,setTabGroupChoices:n}=f();return a.createElement(E.Z.Provider,{value:{tabGroupChoices:t,setTabGroupChoices:n}},e.children)};function p(e){let{children:t}=e;return a.createElement(h,null,a.createElement(l.pl,null,a.createElement(g,null,a.createElement(l.L5,null,t))))}},65475:(e,t,n)=>{n.d(t,{Z:()=>i});var a=n(87462),r=n(67294),l=n(36742),o=n(72572),c=n(44996),s=n(52263);const i=e=>{const{siteConfig:{title:t,themeConfig:{navbar:{title:n,logo:i={src:""}}}},isClient:m}=(0,s.Z)(),{imageClassName:u,...d}=e,h=(0,c.Z)(i.href||"/"),v={light:(0,c.Z)(i.src),dark:(0,c.Z)(i.srcDark||i.src)};return r.createElement(l.Z,(0,a.Z)({to:h},d,i.target&&{target:i.target}),i.src&&r.createElement(o.Z,{key:m,className:u,sources:v,alt:i.alt||n||t}))}},67919:(e,t,n)=>{n.d(t,{Z:()=>B});var a=n(87462),r=n(67294),l=n(86010),o=n(25865),c=n(72572),s=n(39306),i=n(44996),m=n(52263);const u={toggle:"toggle_8pH0"},d=e=>{let{icon:t,style:n}=e;return r.createElement("span",{className:(0,l.Z)(u.toggle,u.dark),style:n},r.createElement(c.Z,{sources:t}))},h=e=>{let{icon:t,style:n}=e;return r.createElement("span",{className:(0,l.Z)(u.toggle,u.light),style:n},r.createElement(c.Z,{sources:t}))},v=(0,r.memo)((e=>{let{className:t,icons:n,checked:a,disabled:o,onChange:c}=e;const[s,i]=(0,r.useState)(a),m=(0,r.useRef)(null);return r.createElement("div",{className:(0,l.Z)("react-toggle",t,{"react-toggle--checked":s,"react-toggle--disabled":o})},r.createElement("div",{className:"react-toggle-track",role:"button",tabIndex:-1,onClick:()=>{var e;return null==(e=m.current)?void 0:e.click()}},r.createElement("div",{className:"react-toggle-track-check"},n.checked),r.createElement("div",{className:"react-toggle-track-x"},n.unchecked)),r.createElement("input",{ref:m,checked:s,type:"checkbox",className:"react-toggle-screenreader-only","aria-label":"Switch between dark and light mode",onChange:c,onClick:()=>i(!s)}))}));function f(e){const{colorMode:{switchConfig:{darkIcon:t,darkIconStyle:n,lightIcon:l,lightIconStyle:o}}}=(0,s.LU)(),{isClient:c}=(0,m.Z)();return r.createElement(v,(0,a.Z)({disabled:!c,icons:{checked:r.createElement(h,{icon:{light:(0,i.Z)(l.light),dark:(0,i.Z)(l.dark)},style:o}),unchecked:r.createElement(d,{icon:{light:(0,i.Z)(t.light),dark:(0,i.Z)(t.dark)},style:n})}},e))}var E=n(27181),g=n(5977),p=n(69936);const b=e=>{const t=(0,g.TH)(),[n,a]=(0,r.useState)(e),l=(0,r.useRef)(!1),[o,c]=(0,r.useState)(0),i=(0,r.useCallback)((e=>{null!==e&&c(e.getBoundingClientRect().height)}),[]);return(0,p.Z)(((t,n)=>{let{scrollY:r}=t,{scrollY:c}=n;if(!e)return;if(r<o)return void a(!0);if(l.current)return l.current=!1,void a(!1);c&&0===r&&a(!0);const s=document.documentElement.scrollHeight-o,i=window.innerHeight;c&&r>=c?a(!1):r+i<s&&a(!0)}),[o,l]),(0,s.SL)((t=>{e&&!t.location.hash&&a(!0)})),(0,r.useEffect)((()=>{e&&t.hash&&(l.current=!0)}),[t.hash]),{navbarRef:i,isNavbarVisible:n}};var _=n(4146),k=n(35202),Z=n(14938);const N=e=>{let{width:t=20,height:n=20,...l}=e;return r.createElement("svg",(0,a.Z)({viewBox:"0 0 20 20",width:t,height:n,"aria-hidden":"true"},l),r.createElement("path",{fill:"currentColor",d:"M19.753 10.909c-.624-1.707-2.366-2.726-4.661-2.726-.09 0-.176.002-.262.006l-.016-2.063 3.525-.607c.115-.019.133-.119.109-.231-.023-.111-.167-.883-.188-.976-.027-.131-.102-.127-.207-.109-.104.018-3.25.461-3.25.461l-.013-2.078c-.001-.125-.069-.158-.194-.156l-1.025.016c-.105.002-.164.049-.162.148l.033 2.307s-3.061.527-3.144.543c-.084.014-.17.053-.151.143.019.09.19 1.094.208 1.172.018.08.072.129.188.107l2.924-.504.035 2.018c-1.077.281-1.801.824-2.256 1.303-.768.807-1.207 1.887-1.207 2.963 0 1.586.971 2.529 2.328 2.695 3.162.387 5.119-3.06 5.769-4.715 1.097 1.506.256 4.354-2.094 5.98-.043.029-.098.129-.033.207l.619.756c.08.096.206.059.256.023 2.51-1.73 3.661-4.515 2.869-6.683zm-7.386 3.188c-.966-.121-.944-.914-.944-1.453 0-.773.327-1.58.876-2.156a3.21 3.21 0 011.229-.799l.082 4.277a2.773 2.773 0 01-1.243.131zm2.427-.553l.046-4.109c.084-.004.166-.01.252-.01.773 0 1.494.145 1.885.361.391.217-1.023 2.713-2.183 3.758zm-8.95-7.668a.196.196 0 00-.196-.145h-1.95a.194.194 0 00-.194.144L.008 16.916c-.017.051-.011.076.062.076h1.733c.075 0 .099-.023.114-.072l1.008-3.318h3.496l1.008 3.318c.016.049.039.072.113.072h1.734c.072 0 .078-.025.062-.076-.014-.05-3.083-9.741-3.494-11.04zm-2.618 6.318l1.447-5.25 1.447 5.25H3.226z"}))};function w(e){let{mobile:t,dropdownItemsBefore:n,dropdownItemsAfter:l,...o}=e;const{i18n:{currentLocale:c,locales:i,localeConfigs:u}}=(0,m.Z)(),d=(0,s.l5)();function h(e){return u[e].label}const v=[...n,...i.map((e=>{const t="pathname://"+d.createUrl({locale:e,fullyQualified:!1});return{isNavLink:!0,label:h(e),to:t,target:"_self",autoAddBaseUrl:!1,className:e===c?"dropdown__link--active":"",style:{textTransform:"capitalize"}}})),...l],f=t?"Languages":h(c);return r.createElement(Z.Z,(0,a.Z)({},o,{href:"#",mobile:t,label:r.createElement("span",null,r.createElement(N,{style:{verticalAlign:"text-bottom",marginRight:5}}),r.createElement("span",null,f)),items:v}))}function y(e){let{mobile:t}=e;return t?null:r.createElement(o.Z,null)}const C={default:()=>Z.Z,localeDropdown:()=>w,search:()=>y,docsVersion:()=>n(73747).Z,docsVersionDropdown:()=>n(66701).Z,doc:()=>n(76431).Z};function L(e){let{type:t,...n}=e;const a=function(e){void 0===e&&(e="default");const t=C[e];if(!t)throw new Error('No NavbarItem component found for type "'+e+'".');return t()}(t);return r.createElement(a,n)}var D=n(65475),I=n(80607);const T="displayOnlyInLargeViewport_a-w0",S="navbarHideable_0LFp",x="navbarHidden_97UM",A="right";const B=function(){const{navbar:{items:e,hideOnScroll:t,style:n},colorMode:{disableSwitch:c}}=(0,s.LU)(),[i,m]=(0,r.useState)(!1),{isDarkTheme:u,setLightTheme:d,setDarkTheme:h}=(0,E.Z)(),{navbarRef:v,isNavbarVisible:g}=b(t),[Z,N]=(0,r.useState)(!1);(0,p.Z)((e=>{let{scrollY:t}=e;N(!(t<200))})),(0,_.Z)(i);const w=(0,r.useCallback)((()=>{m(!0)}),[m]),y=(0,r.useCallback)((()=>{m(!1)}),[m]),C=(0,r.useCallback)((e=>e.target.checked?h():d()),[d,h]),B=(0,k.Z)();(0,r.useEffect)((()=>{B===k.D.desktop&&m(!1)}),[B]);const H=e.some((e=>"search"===e.type)),{leftItems:M,rightItems:U}=function(e){return{leftItems:e.filter((e=>{var t;return"left"===(null!=(t=e.position)?t:A)})),rightItems:e.filter((e=>{var t;return"right"===(null!=(t=e.position)?t:A)}))}}(e);return r.createElement("nav",{ref:v,className:(0,l.Z)("navbar","navbar--fixed-top",{"navbar--dark":"dark"===n,"navbar--primary":"primary"===n,"navbar-sidebar--show":i,[S]:t,[x]:t&&!g||Z})},r.createElement("div",{className:"navbar__inner"},r.createElement("div",{className:"navbar__items"},null!=e&&0!==e.length&&r.createElement("button",{"aria-label":"Navigation bar toggle",className:"navbar__toggle clean-btn",type:"button",tabIndex:0,onClick:w,onKeyDown:w},r.createElement(I.Z,null)),r.createElement(D.Z,{className:"navbar__brand",imageClassName:"navbar__logo",titleClassName:"navbar__title"}),M.map(((e,t)=>r.createElement(L,(0,a.Z)({},e,{key:t}))))),r.createElement("div",{className:"navbar__items navbar__items--right"},U.map(((e,t)=>r.createElement(L,(0,a.Z)({},e,{key:t})))),!c&&r.createElement(f,{className:T,checked:u,onChange:C}),!H&&r.createElement(o.Z,null))),r.createElement("div",{role:"presentation",className:"navbar-sidebar__backdrop",onClick:y}),r.createElement("div",{className:"navbar-sidebar"},r.createElement("div",{className:"navbar-sidebar__brand"},r.createElement(D.Z,{className:"navbar__brand",imageClassName:"navbar__logo",titleClassName:"navbar__title",onClick:y}),!c&&i&&r.createElement(f,{checked:u,onChange:C})),r.createElement("div",{className:"navbar-sidebar__items"},r.createElement("div",{className:"menu"},r.createElement("ul",{className:"menu__list"},e.map(((e,t)=>r.createElement(L,(0,a.Z)({mobile:!0},e,{onClick:y,key:t})))))))))}},14938:(e,t,n)=>{n.d(t,{Z:()=>v});var a=n(87462),r=n(67294),l=n(86010),o=n(36742),c=n(44996),s=n(5977),i=n(39306),m=n(13919);function u(e){let{activeBasePath:t,activeBaseRegex:n,to:l,href:s,label:i,activeClassName:u="navbar__link--active",prependBaseUrlToHref:d,...h}=e;const v=(0,c.Z)(l),f=(0,c.Z)(s,{forcePrependBaseUrl:!0}),E=i&&s&&!(0,m.Z)(s);return r.createElement(o.Z,(0,a.Z)({},s?{href:d?f:s}:{isNavLink:!0,activeClassName:u,to:v,...t||n?{isActive:(e,a)=>n?new RegExp(n).test(a.pathname):a.pathname.startsWith(t)}:null},h),E?r.createElement("span",{className:"navbar__exlink"},i):i)}function d(e){var t;let{items:n,position:o,className:c,...s}=e;const i=(0,r.useRef)(null),m=(0,r.useRef)(null),[d,h]=(0,r.useState)(!1);(0,r.useEffect)((()=>{const e=e=>{i.current&&!i.current.contains(e.target)&&h(!1)};return document.addEventListener("mousedown",e),document.addEventListener("touchstart",e),()=>{document.removeEventListener("mousedown",e),document.removeEventListener("touchstart",e)}}),[i]);const v=function(e,t){return void 0===t&&(t=!1),(0,l.Z)({"navbar__item navbar__link":!t,dropdown__link:t},e)};return n?r.createElement("div",{ref:i,className:(0,l.Z)("navbar__item","dropdown","dropdown--hoverable",{"dropdown--left":"left"===o,"dropdown--right":"right"===o,"dropdown--show":d})},r.createElement(u,(0,a.Z)({className:v(c)},s,{onClick:s.to?void 0:e=>e.preventDefault(),onKeyDown:e=>{"Enter"===e.key&&(e.preventDefault(),h(!d))}}),null!=(t=s.children)?t:s.label),r.createElement("ul",{ref:m,className:"dropdown__menu"},n.map(((e,t)=>{let{className:l,...o}=e;return r.createElement("li",{key:t},r.createElement(u,(0,a.Z)({onKeyDown:e=>{if(t===n.length-1&&"Tab"===e.key){e.preventDefault(),h(!1);const t=i.current.nextElementSibling;t&&t.focus()}},activeClassName:"dropdown__link--active",className:v(l,!0)},o)))})))):r.createElement(u,(0,a.Z)({className:v(c)},s))}function h(e){var t,n,o;let{items:c,className:m,position:d,...h}=e;const v=(0,r.useRef)(null),{pathname:f}=(0,s.TH)(),[E,g]=(0,r.useState)((()=>{var e;return null==(e=!(null!=c&&c.some((e=>(0,i.Mg)(e.to,f)))))||e})),p=function(e,t){return void 0===t&&(t=!1),(0,l.Z)("menu__link",{"menu__link--sublist":t},e)};if(!c)return r.createElement("li",{className:"menu__list-item"},r.createElement(u,(0,a.Z)({activeClassName:"mobile__navbar__link--active",className:p(m)},h)));const b=null!=(t=v.current)&&t.scrollHeight?(null==(n=v.current)?void 0:n.scrollHeight)+"px":void 0;return r.createElement("li",{className:(0,l.Z)("menu__list-item",{"menu__list-item--collapsed":E})},r.createElement(u,(0,a.Z)({role:"button",className:p(m,!0)},h,{onClick:e=>{e.preventDefault(),g((e=>!e))}}),null!=(o=h.children)?o:h.label),r.createElement("ul",{className:"menu__list",ref:v,style:{height:E?void 0:b}},c.map(((e,t)=>{let{className:n,...l}=e;return r.createElement("li",{className:"menu__list-item",key:t},r.createElement(u,(0,a.Z)({activeClassName:"menu__link--active",className:p(n)},l,{onClick:h.onClick})))}))))}const v=function(e){let{mobile:t=!1,...n}=e;const a=t?h:d;return r.createElement(a,n)}},76431:(e,t,n)=>{n.d(t,{Z:()=>m});var a=n(87462),r=n(67294),l=n(14938),o=n(47227),c=n(86010),s=n(39306),i=n(18780);function m(e){let{docId:t,activeSidebarClassName:n,label:m,docsPluginId:u,...d}=e;const{activeVersion:h,activeDoc:v}=(0,o.Iw)(u),{preferredVersion:f}=(0,s.J)(u),E=(0,o.yW)(u),g=function(e,t){const n=[].concat(...e.map((e=>e.docs))),a=n.find((e=>e.id===t));if(!a){const a=n.map((e=>e.id)).join("\n- ");throw new Error("DocNavbarItem: couldn't find any doc with id \""+t+'" in version'+(e.length?"s":"")+" "+e.map((e=>e.name)).join(", ")+'".\nAvailable doc ids are:\n- '+a)}return a}((0,i.uniq)([h,f,E].filter(Boolean)),t);return r.createElement(l.Z,(0,a.Z)({exact:!0},d,{className:(0,c.Z)(d.className,{[n]:v&&v.sidebar===g.sidebar}),label:null!=m?m:g.id,to:g.path}))}},66701:(e,t,n)=>{n.d(t,{Z:()=>i});var a=n(87462),r=n(67294),l=n(14938),o=n(47227),c=n(39306);const s=e=>e.docs.find((t=>t.id===e.mainDocId));function i(e){var t,n;let{mobile:i,docsPluginId:m,dropdownActiveClassDisabled:u,dropdownItemsBefore:d,dropdownItemsAfter:h,...v}=e;const f=(0,o.Iw)(m),E=(0,o.gB)(m),g=(0,o.yW)(m),{preferredVersion:p,savePreferredVersionName:b}=(0,c.J)(m);const _=function(){const e=E.map((e=>{const t=(null==f?void 0:f.alternateDocVersions[e.name])||s(e);return{isNavLink:!0,label:e.label,to:t.path,isActive:()=>e===(null==f?void 0:f.activeVersion),onClick:()=>{b(e.name)}}})),t=[...d,...e,...h];if(!(t.length<=1))return t}(),k=null!=(t=null!=(n=f.activeVersion)?n:p)?t:g,Z=i&&_?"Versions":k.label,N=i&&_?void 0:s(k).path;return r.createElement(l.Z,(0,a.Z)({},v,{mobile:i,label:Z,to:N,items:_,isActive:u?()=>!1:void 0}))}},73747:(e,t,n)=>{n.d(t,{Z:()=>s});var a=n(87462),r=n(67294),l=n(14938),o=n(47227),c=n(39306);function s(e){var t;let{label:n,to:s,docsPluginId:i,...m}=e;const u=(0,o.zu)(i),{preferredVersion:d}=(0,c.J)(i),h=(0,o.yW)(i),v=null!=(t=null!=u?u:d)?t:h,f=null!=n?n:v.label,E=null!=s?s:(e=>e.docs.find((t=>t.id===e.mainDocId)))(v).path;return r.createElement(l.Z,(0,a.Z)({},m,{label:f,to:E}))}},87818:(e,t,n)=>{n.r(t),n.d(t,{default:()=>o});var a=n(67294),r=n(40932),l=n(24973);const o=function(){return a.createElement(r.Z,{title:(0,l.I)({id:"theme.NotFound.title",message:"Page Not Found"})},a.createElement("main",{className:"container margin-vert--xl"},a.createElement("div",{className:"row"},a.createElement("div",{className:"col col--6 col--offset-3"},a.createElement("h1",{className:"hero__title"},a.createElement(l.Z,{id:"theme.NotFound.title",description:"The title of the 404 page"},"Page Not Found")),a.createElement("p",null,a.createElement(l.Z,{id:"theme.NotFound.p1",description:"The first paragraph of the 404 page"},"We could not find what you were looking for.")),a.createElement("p",null,a.createElement(l.Z,{id:"theme.NotFound.p2",description:"The 2nd paragraph of the 404 page"},"Please contact the owner of the site that linked you to the original URL and let them know their link is broken."))))))}},73322:(e,t,n)=>{n.d(t,{Z:()=>c});var a=n(67294),r=n(99105),l=n(39306),o=n(44996);function c(e){let{title:t,description:n,keywords:c,image:s}=e;const{image:i}=(0,l.LU)(),m=(0,l.pe)(t),u=(0,o.Z)(s||i,{absolute:!0});return a.createElement(r.Z,null,t&&a.createElement("title",null,m),t&&a.createElement("meta",{property:"og:title",content:m}),n&&a.createElement("meta",{name:"description",content:n}),n&&a.createElement("meta",{property:"og:description",content:n}),c&&a.createElement("meta",{name:"keywords",content:Array.isArray(c)?c.join(","):c}),u&&a.createElement("meta",{property:"og:image",content:u}),u&&a.createElement("meta",{name:"twitter:image",content:u}))}},17526:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n(67294).createContext(void 0)},72572:(e,t,n)=>{n.d(t,{Z:()=>i});var a=n(87462),r=n(67294),l=n(86010),o=n(52263),c=n(27181);const s={themedImage:"themedImage_K3WP","themedImage--light":"themedImage--light_Fy0T","themedImage--dark":"themedImage--dark_V9oi"},i=e=>{const{isClient:t}=(0,o.Z)(),{isDarkTheme:n}=(0,c.Z)(),{sources:i,className:m,alt:u="",...d}=e,h=t?n?["dark"]:["light"]:["light","dark"];return r.createElement(r.Fragment,null,h.map((e=>r.createElement("img",(0,a.Z)({key:e,src:i[e],alt:u,className:(0,l.Z)(s.themedImage,s["themedImage--"+e],m)},d)))))}},12674:(e,t,n)=>{n.d(t,{Z:()=>a});const a=(0,n(67294).createContext)(void 0)},47227:(e,t,n)=>{n.d(t,{Iw:()=>a.useActiveDocContext,Jo:()=>a.useDocVersionSuggestions,_r:()=>a.useAllDocsData,gA:()=>a.useActivePlugin,gB:()=>a.useVersions,yW:()=>a.useLatestVersion,zh:()=>a.useDocsData,zu:()=>a.useActiveVersion});var a=n(96730)},4146:(e,t,n)=>{n.d(t,{Z:()=>r});var a=n(67294);const r=function(e){void 0===e&&(e=!0),(0,a.useEffect)((()=>(document.body.style.overflow=e?"hidden":"visible",()=>{document.body.style.overflow="visible"})),[e])}},69936:(e,t,n)=>{n.d(t,{Z:()=>o});var a=n(67294),r=n(10412);const l=()=>({scrollX:r.Z.canUseDOM?window.pageXOffset:0,scrollY:r.Z.canUseDOM?window.pageYOffset:0}),o=function(e,t){void 0===t&&(t=[]);const n=(0,a.useRef)(l()),r=()=>{const t=l();e&&e(t,n.current),n.current=t};(0,a.useEffect)((()=>{const e={passive:!0};return r(),window.addEventListener("scroll",r,e),()=>window.removeEventListener("scroll",r,e)}),t)}},27181:(e,t,n)=>{n.d(t,{Z:()=>l});var a=n(67294),r=n(17526);const l=function(){const e=(0,a.useContext)(r.Z);if(null==e)throw new Error('"useThemeContext" is used outside of "Layout" component. Please see https://docusaurus.io/docs/api/themes/configuration#usethemecontext.');return e}},35202:(e,t,n)=>{n.d(t,{D:()=>l,Z:()=>o});var a=n(67294),r=n(10412);const l={desktop:"desktop",mobile:"mobile"};const o=function(){const e=r.Z.canUseDOM;function t(){if(e)return window.innerWidth>1255?l.desktop:l.mobile}const[n,o]=(0,a.useState)(t);return(0,a.useEffect)((()=>{if(e)return window.addEventListener("resize",n),()=>window.removeEventListener("resize",n);function n(){o(t())}}),[]),n}}}]);