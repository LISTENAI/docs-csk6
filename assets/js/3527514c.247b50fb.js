"use strict";(self.webpackChunkls_docs_web=self.webpackChunkls_docs_web||[]).push([[2960],{3905:(e,n,t)=>{t.d(n,{Zo:()=>m,kt:()=>u});var r=t(67294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function p(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var d=r.createContext({}),o=function(e){var n=r.useContext(d),t=n;return e&&(t="function"==typeof e?e(n):p(p({},n),e)),t},m=function(e){var n=o(e.components);return r.createElement(d.Provider,{value:n},e.children)},s={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},c=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,l=e.originalType,d=e.parentName,m=i(e,["components","mdxType","originalType","parentName"]),c=o(t),u=a,_=c["".concat(d,".").concat(u)]||c[u]||s[u]||l;return t?r.createElement(_,p(p({ref:n},m),{},{components:t})):r.createElement(_,p({ref:n},m))}));function u(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var l=t.length,p=new Array(l);p[0]=c;var i={};for(var d in n)hasOwnProperty.call(n,d)&&(i[d]=n[d]);i.originalType=e,i.mdxType="string"==typeof e?e:a,p[1]=i;for(var o=2;o<l;o++)p[o]=t[o];return r.createElement.apply(null,p)}return r.createElement.apply(null,t)}c.displayName="MDXCreateElement"},40894:(e,n,t)=>{t.r(n),t.d(n,{contentTitle:()=>p,default:()=>m,frontMatter:()=>l,metadata:()=>i,toc:()=>d});var r=t(87462),a=(t(67294),t(3905));const l={},p="PWM",i={unversionedId:"chips/600X/application/peripheral/samples/pwm",id:"chips/600X/application/peripheral/samples/pwm",isDocsHomePage:!1,title:"PWM",description:"\u6982\u8ff0",source:"@site/docs/chips/600X/application/peripheral/samples/pwm.md",sourceDirName:"chips/600X/application/peripheral/samples",slug:"/chips/600X/application/peripheral/samples/pwm",permalink:"/docs-csk6/chips/600X/application/peripheral/samples/pwm",version:"current",frontMatter:{},sidebar:"docs/chips/600X",previous:{title:"GPIO",permalink:"/docs-csk6/chips/600X/application/peripheral/samples/gpio"},next:{title:"UART",permalink:"/docs-csk6/chips/600X/application/peripheral/samples/UART"}},d=[{value:"\u6982\u8ff0",id:"\u6982\u8ff0",children:[]},{value:"PWM\u5e38\u7528\u63a5\u53e3",id:"pwm\u5e38\u7528\u63a5\u53e3",children:[{value:"\u8bbe\u7f6ePWM \u8f93\u51fa\u5468\u671f\u548c\u8109\u51b2\u5bbd\u5ea6",id:"\u8bbe\u7f6epwm-\u8f93\u51fa\u5468\u671f\u548c\u8109\u51b2\u5bbd\u5ea6",children:[]}]},{value:"\u4f7f\u7528\u793a\u4f8b",id:"\u4f7f\u7528\u793a\u4f8b",children:[{value:"\u51c6\u5907\u5de5\u4f5c",id:"\u51c6\u5907\u5de5\u4f5c",children:[]},{value:"\u83b7\u53d6sample\u9879\u76ee",id:"\u83b7\u53d6sample\u9879\u76ee",children:[]},{value:"\u793a\u4f8b\u9879\u76ee\u7ec4\u4ef6\u914d\u7f6e",id:"\u793a\u4f8b\u9879\u76ee\u7ec4\u4ef6\u914d\u7f6e",children:[]},{value:"\u8bbe\u5907\u6811\u914d\u7f6e",id:"\u8bbe\u5907\u6811\u914d\u7f6e",children:[]},{value:"\u793a\u4f8b\u5b9e\u73b0\u903b\u8f91",id:"\u793a\u4f8b\u5b9e\u73b0\u903b\u8f91",children:[]},{value:"\u793a\u4f8b\u5b9e\u73b0",id:"\u793a\u4f8b\u5b9e\u73b0",children:[]},{value:"\u7f16\u8bd1\u548c\u70e7\u5f55",id:"\u7f16\u8bd1\u548c\u70e7\u5f55",children:[]}]}],o={toc:d};function m(e){let{components:n,...l}=e;return(0,a.kt)("wrapper",(0,r.Z)({},o,l,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"pwm"},"PWM"),(0,a.kt)("h2",{id:"\u6982\u8ff0"},"\u6982\u8ff0"),(0,a.kt)("p",null,"PWM\u662f\u6211\u4eec\u5e38\u7528\u7684\u5916\u8bbe\u529f\u80fd\u4e4b\u4e00\uff0ccsk6\u603b\u5171\u67098\u7ec4pwm\u8f93\u51fa\u53e3\uff0c\u672c\u8282\u5c06\u901a\u8fc7\u793a\u4f8b\u5c55\u793aPWM API\u63a5\u53e3\u548c\u4f7f\u7528\u65b9\u6cd5\u3002"),(0,a.kt)("h2",{id:"pwm\u5e38\u7528\u63a5\u53e3"},"PWM\u5e38\u7528\u63a5\u53e3"),(0,a.kt)("h3",{id:"\u8bbe\u7f6epwm-\u8f93\u51fa\u5468\u671f\u548c\u8109\u51b2\u5bbd\u5ea6"},"\u8bbe\u7f6ePWM \u8f93\u51fa\u5468\u671f\u548c\u8109\u51b2\u5bbd\u5ea6"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-c"},"int pwm_pin_set_usec(const struct device * dev, uint32_t channel, uint32_t period, uint32_t pulse, pwm_flags_t flags)   \n")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"\u53c2\u6570\u8bf4\u660e")),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"\u53c2\u6570"),(0,a.kt)("th",{parentName:"tr",align:null},"\u8bf4\u660e"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"dev"),(0,a.kt)("td",{parentName:"tr",align:null},"pwm\u8bbe\u5907\u5b9e\u4f8b")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"channel"),(0,a.kt)("td",{parentName:"tr",align:null},"\u901a\u9053")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"period"),(0,a.kt)("td",{parentName:"tr",align:null},"\u9891\u7387")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"pulse"),(0,a.kt)("td",{parentName:"tr",align:null},"\u8109\u51b2\u5bbd\u5ea6")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"flags"),(0,a.kt)("td",{parentName:"tr",align:null},"PWM\u6807\u5fd7")))),(0,a.kt)("p",null,"\u5176\u4e2dperiod\u548cpulse\u7684\u5355\u4f4d\u662fmicroseconds\u3002"),(0,a.kt)("br",null),(0,a.kt)("h2",{id:"\u4f7f\u7528\u793a\u4f8b"},"\u4f7f\u7528\u793a\u4f8b"),(0,a.kt)("h3",{id:"\u51c6\u5907\u5de5\u4f5c"},"\u51c6\u5907\u5de5\u4f5c"),(0,a.kt)("p",null,"\u9996\u5148\uff0c\u5b9e\u73b0Blinky_pwm\u793a\u4f8b\u7684\u9884\u671f\u6548\u679c\u9700\u8981\u786c\u4ef6\u5f00\u53d1\u677f\u4e0a\u5fc5\u987b\u6709\u4e00\u4e2aGPIO(\u5e26pwm\u8f93\u51fa\u529f\u80fd)\u8fde\u63a5\u4e86\u4e00\u4e2aLED\u706f\uff0c\u5728",(0,a.kt)("inlineCode",{parentName:"p"},"csk6002_9s_nano"),"\u5f00\u53d1\u677f\u4e0a\u662f\u6709\u8fd9\u4e2a\u8bbe\u8ba1\u7684\uff0c\u901a\u8fc7\u67e5\u770b\u5f00\u53d1\u677f\u5e95\u677f\u539f\u7406\u56fe\uff0c\u4f60\u53ef\u4ee5\u770b\u5230LED\u5bf9\u5e94\u7684\u7535\u8def\u8bbe\u8ba1\u5982\u4e0b\u56fe\u6240\u793a\uff0c\u6211\u4eec\u53ef\u4ee5\u770b\u5230LED1(Green)\u5bf9\u5e94\u7684\u63a7\u5236\u5f15\u811a\u4e3a:GPIOA_05\uff0cGPIOA_05\u53ef\u590d\u7528\u4e3apwm\u8f93\u51fa\u529f\u80fd\u3002\n",(0,a.kt)("img",{src:t(19545).Z})),(0,a.kt)("h3",{id:"\u83b7\u53d6sample\u9879\u76ee"},"\u83b7\u53d6sample\u9879\u76ee"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"CSK6 SDK"),"\u63d0\u4f9b\u4e86Blinky_pwm\u7684sample\uff0c\u4f60\u53ef\u4ee5\u5728\u4efb\u4e00\u671f\u671b\u653e\u7f6e\u9879\u76ee\u5de5\u7a0b\u7684\u76ee\u5f55\u4e0b\u8f93\u51fa\u4ee5\u4e0b\u6307\u4ee4\u521b\u5efa\u4e00\u4e2aBlinky_pwm\u9879\u76ee\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"lisa zep create\n")),(0,a.kt)("p",null,(0,a.kt)("img",{src:t(17943).Z})),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"basic \u2192 blinky_pwm")),(0,a.kt)("p",null,"Blinky pwm sample\u521b\u5efa\u6210\u529f\u3002"),(0,a.kt)("h3",{id:"\u793a\u4f8b\u9879\u76ee\u7ec4\u4ef6\u914d\u7f6e"},"\u793a\u4f8b\u9879\u76ee\u7ec4\u4ef6\u914d\u7f6e"),(0,a.kt)("p",null,"\u5728prj.conf\u6587\u4ef6\u4e2d\u6dfb\u52a0\u9879\u76ee\u57fa\u7840\u7ec4\u4ef6\u914d\u7f6e\u914d\u7f6e:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"CONFIG_STDOUT_CONSOLE=y\nCONFIG_PRINTK=y\n# \u6253\u5f00pwm\u914d\u7f6e\nCONFIG_PWM=y\n# \u6253\u5f00\u65e5\u5fd7\u914d\u7f6e\nCONFIG_LOG=y\nCONFIG_LOG_PRINTK=y\nCONFIG_LOG_MODE_IMMEDIATE=y\nCONFIG_PWM_LOG_LEVEL_DBG=y\n")),(0,a.kt)("h3",{id:"\u8bbe\u5907\u6811\u914d\u7f6e"},"\u8bbe\u5907\u6811\u914d\u7f6e"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"csk6002_9s_nano.dts"),"\u8bbe\u5907\u6811\u914d\u7f6e\u6587\u4ef6\u4e2d\u5df2\u7ecf\u5b9e\u73b0\u4e86",(0,a.kt)("inlineCode",{parentName:"p"},"pwmled"),"\u7684\u914d\u7f6e\uff0c\u5177\u4f53\u5982\u4e0b:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-c"},'{\n    model = "csk6002 9s nano";\n    compatible = "csk,csk6002_9s_nano";\n    aliases {\n            pwm-led0 = &green_pwm_led;\n\n    };\n\n    pwmleds {\n        compatible = "pwm-leds";\n        green_pwm_led: green_pwm_led {\n            pwms = <&pwm5 5 PWM_POLARITY_NORMAL>;\n            label = "User BOARD_LED_2 - PWM0";\n        };\n};\n')),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"pwmled \u8bbe\u5907\u6811\u914d\u7f6e\u8bf4\u660e\uff1a")),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"\u5b57\u6bb5"),(0,a.kt)("th",{parentName:"tr",align:null},"\u8bf4\u660e"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"green_pwm_led(green_pwm_led:)"),(0,a.kt)("td",{parentName:"tr",align:null},"pwm_led \u8bbe\u5907\u6811\u7684 node label\uff0c\u53ef\u901a\u8fc7 node label \u83b7\u53d6 pwm_led\u8bbe\u5907\u6811\u7684\u914d\u7f6e\u4fe1\u606f")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"green_pwm_led(:green_pwm_led)"),(0,a.kt)("td",{parentName:"tr",align:null},"pwm_led \u8bbe\u5907\u6811\u7684 node id\uff0c\u53ef\u901a\u8fc7 node id\u83b7\u53d6 pwm_led\u8bbe\u5907\u6811\u7684\u914d\u7f6e\u4fe1\u606f")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"gpios = <&pwm5 5 PWM_POLARITY_NORMAL>"),(0,a.kt)("td",{parentName:"tr",align:null},"&pwm5 \uff1apwm _5",(0,a.kt)("br",null),"5\uff1a\u901a\u9053",(0,a.kt)("br",null),"PWM_POLARITY_NORMAL\uff1a pwm \u5f15\u811a flag")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"User BOARD_LED_2 - PWM0"),(0,a.kt)("td",{parentName:"tr",align:null},"pwm_led \u8282\u70b9\u7684 label \u5c5e\u6027",(0,a.kt)("a",{parentName:"td",href:"https://docs.Zephyrproject.org/latest/build/dts/intro.html#important-properties"},"(Label propert)"),"\uff0c\u901a\u8fc7\u4f20\u5165device_get_binding()\u63a5\u53e3\u53ef\u4ee5\u83b7\u53d6pwm\u7684\u8bbe\u5907\u5b9e\u4f8b")))),(0,a.kt)("h3",{id:""}),(0,a.kt)("h3",{id:"\u793a\u4f8b\u5b9e\u73b0\u903b\u8f91"},"\u793a\u4f8b\u5b9e\u73b0\u903b\u8f91"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"\u6b64\u4f8b\u7a0b\u4f7f\u7528PWM\u63a7\u5236LED\u706f\u4ee51Hz\u7684\u9891\u7387\u95ea\u70c1\uff0c\u6bcf4\u79d2\u9891\u7387\u7ffb\u500d\u76f4\u523064hz\uff0c\u6b64\u540e\u6bcf4\u79d2\u9891\u7387\u51cf\u534a\uff0c\u76f4\u5230\u6062\u590d\u52301Hz\u5b8c\u6210\u4e00\u4e2a\u95ea\u70c1\u5468\u671f\uff0c\u4ee5\u5148\u5feb\u540e\u6162\u7684\u95ea\u70c1\u65b9\u5f0f\u5faa\u73af\u3002")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"\u90e8\u5206PWM\u786c\u4ef6\u65e0\u6cd5\u5b9e\u73b01Hz\u7684\u9891\u7387\u63a7\u5236\uff0c\u8fd9\u4e2asample\u5728\u542f\u52a8\u65f6\u4f1a\u5bf9\u786c\u4ef6\u8fdb\u884c\u6821\u51c6\uff0c\u9002\u5f53\u51cf\u5c0f\u6700\u5927PWM\u5468\u671f\uff0c\u76f4\u5230\u627e\u5230\u5339\u914d\u786c\u4ef6\u7684\u503c\u3002"))),(0,a.kt)("h3",{id:"\u793a\u4f8b\u5b9e\u73b0"},"\u793a\u4f8b\u5b9e\u73b0"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-c"},'#include <zephyr.h>\n#include <sys/printk.h>\n#include <device.h>\n#include <drivers/pwm.h>\n\n#define PWM_LED0_NODE   DT_ALIAS(pwm_led0)\n\n/* \u83b7\u53d6\u8bbe\u5907\u6811\u914d\u7f6e */\n#define PWM_CTLR    DT_PWMS_CTLR(PWM_LED0_NODE)\n#define PWM_CHANNEL DT_PWMS_CHANNEL(PWM_LED0_NODE)\n#define PWM_FLAGS   DT_PWMS_FLAGS(PWM_LED0_NODE)\n\n#define MIN_PERIOD_USEC (USEC_PER_SEC / 64U)\n#define MAX_PERIOD_USEC USEC_PER_SEC\n\nvoid main(void)\n{\n    const struct device *pwm;\n    uint32_t max_period;\n    uint32_t period;\n    uint8_t dir = 0U;\n    int ret;\n\n    printk("PWM-based blinky\\n");\n    \n    /* \u83b7\u53d6`pwm_led0`\u8bbe\u5907\u5b9e\u4f8b */\n    pwm = DEVICE_DT_GET(PWM_CTLR);\n    if (!device_is_ready(pwm)) {\n        printk("Error: PWM device %s is not ready\\n", pwm->name);\n        return;\n    }\n\n    /*\n     * In case the default MAX_PERIOD_USEC value cannot be set for\n     * some PWM hardware, decrease its value until it can.\n     *\n     * Keep its value at least MIN_PERIOD_USEC * 4 to make sure\n     * the sample changes frequency at least once.\n     */\n    printk("Calibrating for channel %d...\\n", PWM_CHANNEL);\n    max_period = MAX_PERIOD_USEC;\n    /* \u5bf9\u786c\u4ef6\u8fdb\u884c\u6821\u51c6\uff0c\u9002\u5f53\u51cf\u5c0f\u6700\u5927PWM\u5468\u671f\uff0c\u5230\u627e\u5339\u914d\u7684\u503c */\n    while (pwm_pin_set_usec(pwm, PWM_CHANNEL,\n                max_period, max_period / 2U, PWM_FLAGS)) {\n        max_period /= 2U;\n        if (max_period < (4U * MIN_PERIOD_USEC)) {\n            printk("Error: PWM device "\n                   "does not support a period at least %u\\n",\n                   4U * MIN_PERIOD_USEC);\n            return;\n        }\n    }\n\n    printk("Done calibrating; maximum/minimum periods %u/%u usec\\n",\n           max_period, MIN_PERIOD_USEC);\n\n    period = max_period;\n    /* pwm\u8f93\u51fa\u914d\u7f6e\u5b9e\u73b0LED\u95ea\u70c1\u9891\u7387\u63a7\u5236 */\n    while (1) {\n        /* \u8bbe\u7f6epwm\u53c2\u6570\uff0c\u901a\u9053\u3001\u9891\u7387(max_period=125000HZ)\u3001\u8109\u5bbd(50%)\u3001\u6807\u5fd7(PWM_POLARITY_NORMAL) */\n        ret = pwm_pin_set_usec(pwm, PWM_CHANNEL,\n                       period, period / 2U, PWM_FLAGS);\n        if (ret) {\n            printk("Error %d: failed to set pulse width\\n", ret);\n            return;\n        }\n        /* \u6539\u53d8pwm\u9891\u7387\u548c\u8109\u5bbd\u5b9e\u73b0LED\u7684\u52a8\u6001\u4eae\u5ea6\u663e\u793a */\n        period = dir ? (period * 2U) : (period / 2U);\n        if (period > max_period) {\n            period = max_period / 2U;\n            dir = 0U;\n        } else if (period < MIN_PERIOD_USEC) {\n            period = MIN_PERIOD_USEC * 2U;\n            dir = 1U;\n        }\n\n        k_sleep(K_SECONDS(4U));\n    }\n}\n\n')),(0,a.kt)("h3",{id:"\u7f16\u8bd1\u548c\u70e7\u5f55"},"\u7f16\u8bd1\u548c\u70e7\u5f55"),(0,a.kt)("h4",{id:"\u7f16\u8bd1"},"\u7f16\u8bd1"),(0,a.kt)("p",null,"\u5728sample\u6839\u76ee\u5f55\u4e0b\u901a\u8fc7\u4ee5\u4e0b\u6307\u4ee4\u5b8c\u6210\u7f16\u8bd1\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"lisa zep build -b csk6002_9s_nano\n")),(0,a.kt)("h4",{id:"\u70e7\u5f55"},"\u70e7\u5f55"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"csk6002_9s_nano"),"\u901a\u8fc7USB\u8fde\u63a5PC\uff0c\u901a\u8fc7\u70e7\u5f55\u6307\u4ee4\u5f00\u59cb\u70e7\u5f55\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"lisa zep flash --runner pyocd\n")),(0,a.kt)("p",null,"\u5b8c\u6210\u70e7\u5f55\u540e\uff0c\u53ef\u770b\u5230\u7ec8\u7aef\u8f93\u51fa \u201c\u70e7\u5f55\u6210\u529f\u201d \u7684\u63d0\u793a\uff0c\u5982\u56fe\uff1a\n",(0,a.kt)("img",{src:t(73405).Z})),(0,a.kt)("h4",{id:"\u67e5\u770b\u7ed3\u679c"},"\u67e5\u770b\u7ed3\u679c"),(0,a.kt)("p",null,"\u9884\u671f\u7684\u6548\u679c\u5e94\u5982\u4e0b\u89c6\u9891\u6240\u793a\uff0c\u5f00\u53d1\u677f\u4e0a\u7684LED\u706f(\u7eff)\u4ee5\u5148\u5feb\u540e\u6162\u7684\u65b9\u5f0f\u5faa\u73af\u95ea\u70c1\uff0c\u5982\u679c\u5728\u4f60\u7684\u5361\u53d1\u677f\u4e0a\u5b9e\u73b0\u4e86\u8fd9\u4e2a\u6548\u679c\uff0c\u90a3\u4e48\u606d\u559c\uff0c\u4f60\u987a\u5229\u7684\u5b8c\u6210\u4e86LED\u7684\u63a7\u5236\uff0c\u5728CSK6\u7684\u5f00\u53d1\u4e0a\u53c8\u8fc8\u51fa\u4e86\u4e00\u6b65\uff01"),(0,a.kt)("video",{src:"https://iflyos-external.oss-cn-shanghai.aliyuncs.com/public/lsopen/zephyr/%E6%96%87%E6%A1%A3%E8%A7%86%E9%A2%91%E4%BB%93/blinky_pwm.mp4",controls:"controls",width:"500",height:"300"},"\u60a8\u7684\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u64ad\u653e\u8be5\u89c6\u9891\uff01"))}m.isMDXComponent=!0},73405:(e,n,t)=>{t.d(n,{Z:()=>r});const r=t.p+"assets/images/flash-5e8b0d6c780a73c444d93c6bcd490b1c.png"},19545:(e,n,t)=>{t.d(n,{Z:()=>r});const r=t.p+"assets/images/led_pin-07a357fff1557e244a61f7e8302145d7.png"},17943:(e,n,t)=>{t.d(n,{Z:()=>r});const r=t.p+"assets/images/liza_zep_create-2b31c9953e388e8804c8d3c9f7efa66f.png"}}]);