(self.webpackChunkls_docs_web=self.webpackChunkls_docs_web||[]).push([[5414],{3905:function(n,e,t){"use strict";t.d(e,{Zo:function(){return _},kt:function(){return d}});var a=t(67294);function i(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function r(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(n);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,a)}return t}function s(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?r(Object(t),!0).forEach((function(e){i(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}function p(n,e){if(null==n)return{};var t,a,i=function(n,e){if(null==n)return{};var t,a,i={},r=Object.keys(n);for(a=0;a<r.length;a++)t=r[a],e.indexOf(t)>=0||(i[t]=n[t]);return i}(n,e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);for(a=0;a<r.length;a++)t=r[a],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(n,t)&&(i[t]=n[t])}return i}var c=a.createContext({}),l=function(n){var e=a.useContext(c),t=e;return n&&(t="function"==typeof n?n(e):s(s({},e),n)),t},_=function(n){var e=l(n.components);return a.createElement(c.Provider,{value:e},n.children)},o={inlineCode:"code",wrapper:function(n){var e=n.children;return a.createElement(a.Fragment,{},e)}},u=a.forwardRef((function(n,e){var t=n.components,i=n.mdxType,r=n.originalType,c=n.parentName,_=p(n,["components","mdxType","originalType","parentName"]),u=l(t),d=i,m=u["".concat(c,".").concat(d)]||u[d]||o[d]||r;return t?a.createElement(m,s(s({ref:e},_),{},{components:t})):a.createElement(m,s({ref:e},_))}));function d(n,e){var t=arguments,i=e&&e.mdxType;if("string"==typeof n||i){var r=t.length,s=new Array(r);s[0]=u;var p={};for(var c in e)hasOwnProperty.call(e,c)&&(p[c]=e[c]);p.originalType=n,p.mdxType="string"==typeof n?n:i,s[1]=p;for(var l=2;l<r;l++)s[l]=t[l];return a.createElement.apply(null,s)}return a.createElement.apply(null,t)}u.displayName="MDXCreateElement"},32605:function(n,e,t){"use strict";t.r(e),t.d(e,{frontMatter:function(){return p},contentTitle:function(){return c},metadata:function(){return l},toc:function(){return _},default:function(){return u}});var a=t(22122),i=t(19756),r=(t(67294),t(3905)),s=["components"],p={},c="SPI",l={unversionedId:"chips/600X/application/peripheral/samples/spi",id:"chips/600X/application/peripheral/samples/spi",isDocsHomePage:!1,title:"SPI",description:"\u6982\u8ff0",source:"@site/docs/chips/600X/application/peripheral/samples/spi.md",sourceDirName:"chips/600X/application/peripheral/samples",slug:"/chips/600X/application/peripheral/samples/spi",permalink:"/docs-csk6/chips/600X/application/peripheral/samples/spi",version:"current",frontMatter:{},sidebar:"docs/chips/600X",previous:{title:"I2C",permalink:"/docs-csk6/chips/600X/application/peripheral/samples/I2C"},next:{title:"ADC",permalink:"/docs-csk6/chips/600X/application/peripheral/samples/ADC"}},_=[{value:"\u6982\u8ff0",id:"\u6982\u8ff0",children:[]},{value:"API\u63a5\u53e3",id:"api\u63a5\u53e3",children:[]},{value:"\u4f7f\u7528\u793a\u4f8b",id:"\u4f7f\u7528\u793a\u4f8b",children:[{value:"\u51c6\u5907\u5de5\u4f5c",id:"\u51c6\u5907\u5de5\u4f5c",children:[]},{value:"\u83b7\u53d6sample\u9879\u76ee",id:"\u83b7\u53d6sample\u9879\u76ee",children:[]},{value:"\u7ec4\u4ef6\u914d\u7f6e",id:"\u7ec4\u4ef6\u914d\u7f6e",children:[]},{value:"SPI\u8bbe\u5907\u6811\u914d\u7f6e",id:"spi\u8bbe\u5907\u6811\u914d\u7f6e",children:[]},{value:"\u793a\u4f8b\u5b9e\u73b0\u903b\u8f91",id:"\u793a\u4f8b\u5b9e\u73b0\u903b\u8f91",children:[]},{value:"\u5e94\u7528\u903b\u8f91\u5b9e\u73b0",id:"\u5e94\u7528\u903b\u8f91\u5b9e\u73b0",children:[]},{value:"\u7f16\u8bd1\u548c\u70e7\u5f55",id:"\u7f16\u8bd1\u548c\u70e7\u5f55",children:[]}]}],o={toc:_};function u(n){var e=n.components,p=(0,i.Z)(n,s);return(0,r.kt)("wrapper",(0,a.Z)({},o,p,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"spi"},"SPI"),(0,r.kt)("h2",{id:"\u6982\u8ff0"},"\u6982\u8ff0"),(0,r.kt)("p",null,"SPI\u5916\u8bbe\u662f\u6211\u4eec\u5e38\u7528\u7684\u5916\u8bbe\u529f\u80fd\u4e4b\u4e00\uff0cCSK6 SDK\u652f\u6301SPI\u5916\u8bbe\u529f\u80fd\uff0c\u672c\u7ae0\u8282\u901a\u8fc7\u793a\u4f8b\u4ecb\u7ecdSPI\u5916\u8bbe\u7684\u57fa\u672c\u4f7f\u7528\u65b9\u6cd5\u3002"),(0,r.kt)("p",null,"CSK6 \u82af\u7247\u6709\u4e24\u7ec4SPI\u786c\u4ef6\u5916\u8bbe\uff0cSPI0\u548cSPI1\u3002\nCSK6 I2C\u9a71\u52a8\u529f\u80fd\u7279\u6027\u5982\u4e0b\uff1a"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u652f\u6301\u4e3b\u6a21\u5f0f\u548c\u4ece\u6a21\u5f0f\u3002"),(0,r.kt)("li",{parentName:"ul"},"\u652f\u6301DMA\u786c\u4ef6\u63e1\u624b\u3002"),(0,r.kt)("li",{parentName:"ul"},"SPI\u65f6\u949f\u6700\u9ad8\u53ef\u8fbe50MHZ\u3002")),(0,r.kt)("h2",{id:"api\u63a5\u53e3"},"API\u63a5\u53e3"),(0,r.kt)("p",null,"\u5e38\u7528SPI API\u63a5\u53e3\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-c"},"/*SPI \u53d1\u9001\u63a5\u6536*/\nint spi_transceive(const struct device * dev, \nconst struct spi_config * config, \nconst struct spi_buf_set * tx_bufs, \nconst struct spi_buf_set * rx_bufs)\n\u53c2\u6570\u8bf4\u660e\uff1a\ndev spi\u8bbe\u5907\u5b9e\u4f8b\nconfig spi\u914d\u7f6e\ntx_bufs \u53d1\u9001\u6570\u636e\u7684\u7f13\u51b2\u533a\u6570\u7ec4\uff0c\u5982\u679c\u6ca1\u6709\u6570\u636e\uff0c\u5219\u4e3a NULL\nrx_bufs \u5c06\u8981\u8bfb\u53d6\u7684\u6570\u636e\u5199\u5165\u7684\u7f13\u51b2\u533a\u6570\u7ec4\uff0c\u5982\u679c\u6ca1\u6709\uff0c\u5219\u4e3a NULL\n\n/*SPI \u53d1\u9001*/\nint spi_write(const struct device * dev,\nconst struct spi_config * config, \nconst struct spi_buf_set * tx_bufs) \ndev spi\u8bbe\u5907\u5b9e\u4f8b\nconfig spi\u914d\u7f6e\ntx_bufs \u53d1\u9001\u6570\u636e\u7684\u7f13\u51b2\u533a\u6570\u7ec4\uff0c\u5982\u679c\u6ca1\u6709\u6570\u636e\n\n/*SPI \u63a5\u6536*/\nint spi_read(const struct device * dev,\nconst struct spi_config * config,\nconst struct spi_buf_set * rx_bufs \n)   \n")),(0,r.kt)("p",null,"\u66f4\u591aSPI API\u63a5\u53e3\u8bf7\u67e5\u770bzephyr\u5b98\u7f51",(0,r.kt)("a",{parentName:"p",href:"https://docs.zephyrproject.org/latest/doxygen/html/group__spi__interface.html"},"SPI Interface"),"\u3002"),(0,r.kt)("h2",{id:"\u4f7f\u7528\u793a\u4f8b"},"\u4f7f\u7528\u793a\u4f8b"),(0,r.kt)("h3",{id:"\u51c6\u5907\u5de5\u4f5c"},"\u51c6\u5907\u5de5\u4f5c"),(0,r.kt)("p",null,"\u672c\u793a\u4f8b\u57fa\u4e8e\u4e24\u4e2aCSK6-NanoKit\u5f00\u53d1\u677f\u5b9e\u73b0SPI\u6570\u636e\u7684\u901a\u4fe1\uff0c\u5176\u4e2d\u4e00\u4e2a\u4f5c\u4e3aSPI\u4e3b\u8bbe\u5907\uff0c\u53e6\u4e00\u8bbe\u5907\u4f5c\u4e3a\u4ece\u8bbe\u5907\uff0c\u5b9e\u73b0\u8be5\u793a\u4f8b\u9700\u8981\u4ee5\u4e0b\u51c6\u5907\u5de5\u4f5c:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"2\u4e2aCSK6-NanoKit\u5f00\u53d1\u677f"),(0,r.kt)("li",{parentName:"ul"},"\u4f7f\u7528\u675c\u90a6\u7ebf\u5c06",(0,r.kt)("inlineCode",{parentName:"li"},"spi1(GPIO_A_04 sclk, GPIO_A_05 cs, GPIO_A_06 miso, GPIO_A_07 mosi)"),"\u8fde\u63a5\uff0c\u63a5\u7ebf\u65b9\u5f0f\u5982\u4e0b\u56fe\u793a\uff1a\n",(0,r.kt)("img",{src:t(42332).Z}))),(0,r.kt)("h3",{id:"\u83b7\u53d6sample\u9879\u76ee"},"\u83b7\u53d6sample\u9879\u76ee"),(0,r.kt)("p",null,"\u901a\u8fc7Lisa\u547d\u4ee4\u521b\u5efa\u9879\u76ee\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"lisa zep create\n")),(0,r.kt)("p",null,(0,r.kt)("img",{src:t(89072).Z}),"\n\u4f9d\u6b21\u6309\u4ee5\u4e0b\u76ee\u5f55\u9009\u62e9\u5b8c\u6210adc sample\u521b\u5efa\uff1a  "),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"boards \u2192 csk6 \u2192 driver \u2192 spi_master_slave")),(0,r.kt)("h3",{id:"\u7ec4\u4ef6\u914d\u7f6e"},"\u7ec4\u4ef6\u914d\u7f6e"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"CONFIG_GPIO=y\n# SPI\u5916\u8bbe\u914d\u7f6e\nCONFIG_SPI=y\nCONFIG_LOG=y\nCONFIG_HEAP_MEM_POOL_SIZE=10240\n# SPI\u63a5\u6536\u5904\u7406\u8d85\u65f6\u65f6\u95f4 \nCONFIG_SPI_COMPLETION_TIMEOUT_TOLERANCE=10000\n")),(0,r.kt)("h3",{id:"spi\u8bbe\u5907\u6811\u914d\u7f6e"},"SPI\u8bbe\u5907\u6811\u914d\u7f6e"),(0,r.kt)("p",null,"CSK6-NanoKit\u5f00\u53d1\u677f\u63d0\u4f9b\u4e86\u4e24\u7ec4SPI\u5916\u8bbe\u3002\u672c\u793a\u4f8b\u4f7f\u7528",(0,r.kt)("inlineCode",{parentName:"p"},"spi1(GPIO_A_04 sclk, GPIO_A_05 cs, GPIO_A_06 miso, GPIO_A_07 mosi)"),"\u4f5c\u4e3aSPI\u901a\u8baf\u63a5\u53e3\uff0c\u56e0\u6b64\u9700\u8981\u5728\u8bbe\u5907\u6811\u4e2d\u5c06\u8fd9GPIO\u5f15\u811a\u590d\u7528\u4e3aSPI\u529f\u80fd\uff0c\u53ef\u901a\u8fc7",(0,r.kt)("inlineCode",{parentName:"p"},"boad overlay"),"\u7684\u65b9\u5f0f\u5b8c\u6210\uff0c\u5177\u4f53\u5982\u4e0b\uff1a\n\u5728app\u76ee\u5f55\u4e0b\u589e\u52a0",(0,r.kt)("inlineCode",{parentName:"p"},"csk6002_9s_nano.overlay"),"\u6587\u4ef6\u5e76\u6dfb\u52a0\u5982\u4e0b\u914d\u7f6e\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-c"},'&csk6002_9s_nano_pinctrl{\n            /* SPIC alternate function */\n            pinctrl_spi1_sclk_default: spi1_sclk_default{\n                    pinctrls = <&pinmuxa 4 7>;\n            };\n            \n            pinctrl_spi1_mosi_default: spi1_mosi_default{\n                    pinctrls = <&pinmuxa 7 7>;\n            };\n\n            pinctrl_spi1_miso_default: spi1_miso_default{\n                    pinctrls = <&pinmuxa 6 7>;\n            };    \n\n            pinctrl_spi1_cs_default: spi1_cs_default{\n                    pinctrls = <&pinmuxa 5 7>;\n            };\n            \n};\n\n&spi1{\n    pinctrl-0 = <&pinctrl_spi1_sclk_default &pinctrl_spi1_mosi_default &pinctrl_spi1_miso_default &pinctrl_spi1_cs_default>; \n    pinctrl-names = "default";\n    status = "okay";\n};\n')),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"\u5982\u679c\u60a8\u60f3\u4e86\u89e3\u66f4\u591a\u5173\u4e8e\u8bbe\u5907\u6811\u7684\u4fe1\u606f\uff0c\u8bf7\u5b66\u4e60",(0,r.kt)("a",{parentName:"p",href:"/docs-csk6/chips/600X/application/device_tree"},"\u8bbe\u5907\u6811"),"\u7ae0\u8282\u3002"))),(0,r.kt)("h3",{id:"\u793a\u4f8b\u5b9e\u73b0\u903b\u8f91"},"\u793a\u4f8b\u5b9e\u73b0\u903b\u8f91"),(0,r.kt)("p",null,"\u672c\u793a\u4f8b\u5b9e\u73b0\u4ee5\u4e0b\u4e1a\u52a1\u903b\u8f91\uff1a"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"SPI master\u8bbe\u5907\u6bcf\u96941S\u5411slave\u8bbe\u5907\u53d1\u9001\u4e00\u5305",(0,r.kt)("inlineCode",{parentName:"li"},"{1, 2, 3, 4, 5, 6, 7, 8, 9}"),"\u6570\u636e\u3002"),(0,r.kt)("li",{parentName:"ul"},"SPI slave\u8bbe\u5907\u63a5\u6536\u6570\u636e\u5e76\u5411master\u8bbe\u5907\u8fd4\u56de",(0,r.kt)("inlineCode",{parentName:"li"},"{9, 8, 7, 6, 5, 4, 3, 2, 1}"),"\u6570\u636e\u3002")),(0,r.kt)("h3",{id:"\u5e94\u7528\u903b\u8f91\u5b9e\u73b0"},"\u5e94\u7528\u903b\u8f91\u5b9e\u73b0"),(0,r.kt)("h4",{id:"master\u5e94\u7528\u903b\u8f91\u5b9e\u73b0"},"master\u5e94\u7528\u903b\u8f91\u5b9e\u73b0"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-c"},'uint8_t master_buffer_tx[BUF_SIZE] = {1, 2, 3, 4, 5, 6, 7, 8, 9};\nuint8_t master_buffer_rx[BUF_SIZE] = {};\n\n#define MASTER_STACK_SIZE 4096\n\nK_THREAD_STACK_DEFINE(master_stack_area, MASTER_STACK_SIZE);\n\nstruct k_thread master_thread_data;\n\nconst struct device *spi_master = NULL;\n\n/*\u83b7\u53d6spi1\u8bbe\u5907\u5b9e\u4f8b*/\nvoid spi_master_init(void)\n{\n    spi_master = DEVICE_DT_GET(DT_NODELABEL(spi1));\n    if (spi_master == NULL)\n    {\n        printk("spi_master: Device is not found.\\n");\n        return;\n    }\n\n    if (!device_is_ready(spi_master))\n    {\n        printk("spi_master: Device is not ready.\\n");\n        return;\n    }\n}\n\n/* master\u7ebf\u7a0b\u5904\u7406 */\nvoid master_thread(void *v1, void *v2, void *v3)\n{\n    struct spi_config spi_cfg = {0};\n    const struct spi_buf tx_bufs[] = {\n        {\n            .buf = master_buffer_tx,\n            .len = BUF_SIZE,\n        },\n    };\n    const struct spi_buf rx_bufs[] = {\n        {\n            .buf = master_buffer_rx,\n            .len = BUF_SIZE,\n        },\n    };\n    const struct spi_buf_set tx = {\n        .buffers = tx_bufs,\n        .count = ARRAY_SIZE(tx_bufs)};\n    const struct spi_buf_set rx = {\n        .buffers = rx_bufs,\n        .count = ARRAY_SIZE(rx_bufs)};\n\n    /* \u8bbe\u7f6eSPI\u914d\u7f6e\uff1a8bit\u6570\u636e\u4f4d, LSB \u6570\u636e\u683c\u5f0f\uff0cmaster\u6a21\u5f0f\uff0c\u65f6\u949f\u9891\u738710Mhz */\n    spi_cfg.operation = SPI_WORD_SET(8) | SPI_OP_MODE_MASTER | SPI_TRANSFER_LSB;\n    spi_cfg.frequency = 10 * 1000000UL;\n\n    while (1)\n    {   \n        /*\u6bcf\u95f4\u96941S\u89e6\u53d1\u4e00\u6b21\u6570\u636e\u53d1\u9001\u548c\u63a5\u6536*/\n        k_msleep(1000);\n        \n        /*\u6e05\u7a7a\u63a5\u6536\u7f13\u51b2\u533a*/\n        memset(master_buffer_rx, 0, BUF_SIZE);\n        printk("[Master]spi send data \\n");\n        \n        /*\u53d1\u9001\u548c\u63a5\u6536\u6570\u636e*/\n        spi_transceive(spi_master, &spi_cfg, &tx, &rx);\n        printk("[Master]spi received data \\n");\n        \n        /*\u6253\u5370\u63a5\u6536\u6570\u636e*/\n        for (uint8_t i = 0; i < BUF_SIZE; i++)\n        {\n            printk("0x%x", master_buffer_rx[i]);\n        }\n        printk("\\n");\n    }\n}\n\nvoid main(void)\n{\n    printk("SPI test start \\n");\n\n    spi_master_init();\n\n    /* \u521b\u5efa\u7ebf\u7a0b */\n    int pri = k_thread_priority_get(k_current_get());\n\n    k_thread_create(&master_thread_data, master_stack_area,\n                    K_THREAD_STACK_SIZEOF(master_stack_area), master_thread, NULL,\n                    NULL, NULL, pri, 0, K_NO_WAIT);\n\n    printk("SPI thread creaeted\\n");\n\n    while (1)\n    {\n        k_msleep(10);\n    }\n}\n\n')),(0,r.kt)("h4",{id:"slave\u5e94\u7528\u903b\u8f91\u5b9e\u73b0"},"slave\u5e94\u7528\u903b\u8f91\u5b9e\u73b0"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-c"},'uint8_t slave_buffer_tx[BUF_SIZE] = {9, 8, 7, 6, 5, 4, 3, 2, 1};\nuint8_t slave_buffer_rx[BUF_SIZE] = {};\n\n#define SLAVE_STACK_SIZE 4096\n\nK_THREAD_STACK_DEFINE(slave_stack_area, SLAVE_STACK_SIZE);\n\nstruct k_thread slave_thread_data;\n\nconst struct device *spi_slave = NULL;\n\nstruct k_thread slave_thread_data;\n\n/*\u83b7\u53d6spi1\u8bbe\u5907\u5b9e\u4f8b*/\nvoid spi_slave_init(void)\n{\n    spi_slave = DEVICE_DT_GET(DT_NODELABEL(spi1));\n    if (spi_slave == NULL)\n    {\n        printk("spi_slave: Device is not found.\\n");\n        return;\n    }\n\n    if (!device_is_ready(spi_slave))\n    {\n        printk("spi_slave: Device is not ready.\\n");\n        return;\n    }\n}\n\n/* slave\u7ebf\u7a0b\u5904\u7406 */\nvoid slave_thread(void *v1, void *v2, void *v3)\n{\n    struct spi_config spi_cfg = {0};\n    const struct spi_buf tx_bufs[] = {\n        {\n            .buf = slave_buffer_tx,\n            .len = BUF_SIZE,\n        },\n    };\n    const struct spi_buf rx_bufs[] = {\n        {\n            .buf = slave_buffer_rx,\n            .len = BUF_SIZE,\n        },\n    };\n    const struct spi_buf_set tx = {\n        .buffers = tx_bufs,\n        .count = ARRAY_SIZE(tx_bufs)};\n    const struct spi_buf_set rx = {\n        .buffers = rx_bufs,\n        .count = ARRAY_SIZE(rx_bufs)};\n\n    /* \u8bbe\u7f6eSPI\u914d\u7f6e\uff1a8bit\u6570\u636e\u4f4d, LSB \u6570\u636e\u683c\u5f0f\uff0cslave\u6a21\u5f0f\uff0c\u65f6\u949f\u9891\u738710Mhz */\n    spi_cfg.operation = SPI_WORD_SET(8) | SPI_OP_MODE_SLAVE | SPI_TRANSFER_LSB;\n    spi_cfg.frequency = 10 * 1000000UL;\n\n    while (1)\n    {\n        /*\u6e05\u7a7a\u63a5\u6536\u7f13\u51b2\u533a*/\n        memset(slave_buffer_rx, 0, BUF_SIZE);\n\n        /*\u63a5\u6536\u548c\u53d1\u9001\u6570\u636e*/\n        spi_transceive(spi_slave, &spi_cfg, &tx, &rx);\n        printk("[Slave]spi receive data, and send back \\n");\n        \n        /*\u6253\u5370\u63a5\u6536\u6570\u636e*/\n        for (uint8_t i = 0; i < BUF_SIZE; i++)\n        {\n            printk("0x%x", slave_buffer_rx[i]);\n        }\n        printk("\\n");\n    }\n}\n\nvoid main(void)\n{\n    printk("SPI test start \\n");\n\n    spi_slave_init();\n\n    /* \u521b\u5efa\u7ebf\u7a0b */\n    int pri = k_thread_priority_get(k_current_get());\n\n    k_thread_create(&slave_thread_data, slave_stack_area,\n                    K_THREAD_STACK_SIZEOF(slave_stack_area),\n                    slave_thread, NULL, NULL, NULL, pri, 0, K_NO_WAIT);\n    printk("SPI thread creaeted\\n");\n\n    while (1)\n    {\n        k_msleep(10);\n    }\n}\n\n')),(0,r.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"\u672c\u793a\u4f8b\u5b9e\u73b0\u4e86master\u548cslave\u4ee3\u7801\u903b\u8f91\uff0c\u901a\u8fc7\u5b8f\u5b9a\u4e49",(0,r.kt)("inlineCode",{parentName:"p"},"MASTER_MODE"),"\u6765\u8bbe\u7f6emaster\u548cslave\u6a21\u5f0f\u7684\u5b9e\u73b0\u903b\u8f91\uff0c1\u4e3amaster\u6a21\u5f0f\uff0c0\u4e3aslave\u6a21\u5f0f\uff0c\u5f00\u53d1\u8005\u9700\u8981\u5206\u522b\u7f16\u8bd1master\u548cslave\u6a21\u5f0f\u56fa\u4ef6\u70e7\u5f55\u5230\u4e24\u4e2aCSK6-NanoKit\u5f00\u53d1\u677f\u4e0a\u3002"))),(0,r.kt)("h3",{id:"\u7f16\u8bd1\u548c\u70e7\u5f55"},"\u7f16\u8bd1\u548c\u70e7\u5f55"),(0,r.kt)("h4",{id:"\u7f16\u8bd1"},"\u7f16\u8bd1"),(0,r.kt)("p",null,"\u5206\u522b\u914d\u7f6e",(0,r.kt)("inlineCode",{parentName:"p"},"MASTER_MODE"),"\u4e3a1\u548c0\u5e76\u70e7\u5f55\u5230\u4e24\u4e2aCSK6-NanoKit\u5f00\u53d1\u677f\u4e0a\u3002\n\u5728app\u6839\u76ee\u5f55\u4e0b\u901a\u8fc7\u4ee5\u4e0b\u6307\u4ee4\u5b8c\u6210\u7f16\u8bd1\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"lisa zep build -b csk6002_9s_nano\n")),(0,r.kt)("h4",{id:"\u70e7\u5f55"},"\u70e7\u5f55"),(0,r.kt)("p",null,"CSK6-NanoKit\u901a\u8fc7USB\u8fde\u63a5PC\uff0c\u901a\u8fc7\u70e7\u5f55\u6307\u4ee4\u5f00\u59cb\u70e7\u5f55\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"lisa zep flash --runner pyocd\n")),(0,r.kt)("h4",{id:"\u67e5\u770b\u7ed3\u679c"},"\u67e5\u770b\u7ed3\u679c"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\u67e5\u770b\u65e5\u5fd7\uff1a")),(0,r.kt)("p",null,"CSK6-NanoKit\u901a\u8fc7\u677f\u8f7dDAPlink\u865a\u62df\u4e32\u53e3\u8fde\u63a5\u7535\u8111\uff0c\u6216\u8005\u5c06CSK6-NanoKit\u7684\u65e5\u5fd7\u4e32\u53e3",(0,r.kt)("inlineCode",{parentName:"p"},"A03 TX A02 RX"),"\u5916\u63a5\u4e32\u53e3\u677f\u5e76\u8fde\u63a5\u7535\u8111\u3002"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u901a\u8fc7lisa\u63d0\u4f9b\u7684",(0,r.kt)("inlineCode",{parentName:"li"},"lisa term"),"\u547d\u4ee4\u67e5\u770b\u65e5\u5fd7"),(0,r.kt)("li",{parentName:"ul"},"\u6216\u8005\u5728\u7535\u8111\u7aef\u4f7f\u7528\u4e32\u53e3\u8c03\u8bd5\u52a9\u624b\u67e5\u770b\u65e5\u5fd7\uff0c\u9ed8\u8ba4\u6ce2\u7279\u7387\u4e3a115200\u3002")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"slave\u8bbe\u5907\u63a5\u6536\u5230master\u8bbe\u5907\u53d1\u9001\u7684\u6570\u636e\u7ed3\u679c\u5e94\u4e3a\uff1a")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"*** Booting Zephyr OS build 1ecc9604fbc0  ***\nSPI test start \nSPI thread creaeted\n[Slave]spi receive data, and send back \n0x10x20x30x40x50x60x70x80x9\n[Slave]spi receive data, and send back \n0x10x20x30x40x50x60x70x80x9\n[Slave]spi receive data, and send back \n0x10x20x30x40x50x60x70x80x9\n...\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"master\u8bbe\u5907\u63a5\u6536\u5230slave\u8bbe\u5907\u56de\u4f20\u7684\u6570\u636e\u7ed3\u679c\u5e94\u4e3a\uff1a")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"** Booting Zephyr OS build 1ecc9604fbc0  ***\nSPI test start \nSPI thread creaeted\n[Master]spi send data \n[Master]spi received data \n0x90x80x70x60x50x40x30x20x1\n[Master]spi send data \n[Master]spi received data \n0x90x80x70x60x50x40x30x20x1\n[Master]spi send data \n[Master]spi received data \n0x90x80x70x60x50x40x30x20x1\n...\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\u903b\u8f91\u5206\u6790\u4eea\u6570\u636e\u5206\u6790")),(0,r.kt)("p",null,(0,r.kt)("img",{src:t(58742).Z})),(0,r.kt)("p",null,"\u4ece\u903b\u8f91\u5206\u6790\u4eea\u8fc7\u7a0b\u6570\u636e\u53ef\u4ee5\u770b\u5230\uff0cmaster\u8bbe\u5907MOSI\u6570\u636e\u4e3a",(0,r.kt)("inlineCode",{parentName:"p"},"01~09"),"\uff0cMISO\u6570\u636e\u4e3a",(0,r.kt)("inlineCode",{parentName:"p"},"09~01"),"\uff0c\u7b26\u5408\u9884\u671f\u3002"))}u.isMDXComponent=!0},42332:function(n,e,t){"use strict";e.Z=t.p+"assets/images/SPI_connect-2ecb1447456028d42e302085b9f81726.png"},58742:function(n,e,t){"use strict";e.Z=t.p+"assets/images/SPI_data-c46b8da69b94a56ff1d590fc481aae67.png"},89072:function(n,e,t){"use strict";e.Z=t.p+"assets/images/uart_create01-4190be564317cfb86204637eaa81c2cb.png"}}]);