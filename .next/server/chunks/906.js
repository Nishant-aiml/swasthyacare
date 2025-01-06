exports.id = 906;
exports.ids = [906];
exports.modules = {

/***/ 23052:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 31232, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 56926, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 50831, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 52987, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 16505, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 44282, 23))

/***/ }),

/***/ 74308:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 94554))

/***/ }),

/***/ 94554:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Providers: () => (/* binding */ Providers)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_themes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(71072);
Object(function webpackMissingModule() { var e = new Error("Cannot find module '@/context/AuthContext'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* __next_internal_client_entry_do_not_use__ Providers auto */ 


function Providers({ children }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_themes__WEBPACK_IMPORTED_MODULE_1__/* .ThemeProvider */ .f, {
        attribute: "class",
        defaultTheme: "system",
        enableSystem: true,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@/context/AuthContext'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), {
            children: children
        })
    });
}


/***/ }),

/***/ 26921:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ RootLayout),
  metadata: () => (/* binding */ metadata),
  viewport: () => (/* binding */ viewport)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: ./node_modules/next/font/google/target.css?{"path":"src\\app\\layout.tsx","import":"Inter","arguments":[{"subsets":["latin"]}],"variableName":"inter"}
var target_path_src_app_layout_tsx_import_Inter_arguments_subsets_latin_variableName_inter_ = __webpack_require__(74490);
var target_path_src_app_layout_tsx_import_Inter_arguments_subsets_latin_variableName_inter_default = /*#__PURE__*/__webpack_require__.n(target_path_src_app_layout_tsx_import_Inter_arguments_subsets_latin_variableName_inter_);
// EXTERNAL MODULE: ./src/app/globals.css
var globals = __webpack_require__(5023);
// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-flight-loader/module-proxy.js
var module_proxy = __webpack_require__(61363);
;// CONCATENATED MODULE: ./src/app/providers.tsx

const proxy = (0,module_proxy.createProxy)(String.raw`c:\Users\datta\OneDrive\Desktop\swasthyacare\swasthyacare\src\app\providers.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;

const e0 = proxy["Providers"];

;// CONCATENATED MODULE: ./src/app/layout.tsx




const metadata = {
    title: "SwasthyaCare - Your Healthcare Companion",
    description: "Find nearby healthcare facilities and emergency services",
    manifest: "/manifest.json",
    icons: {
        apple: "/icons/icon-192x192.png"
    }
};
const viewport = {
    themeColor: "#4F46E5"
};
function RootLayout({ children }) {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("html", {
        lang: "en",
        suppressHydrationWarning: true,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("head", {
                children: /*#__PURE__*/ jsx_runtime_.jsx("link", {
                    rel: "stylesheet",
                    href: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
                    integrity: "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=",
                    crossOrigin: ""
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("body", {
                className: (target_path_src_app_layout_tsx_import_Inter_arguments_subsets_latin_variableName_inter_default()).className,
                children: /*#__PURE__*/ jsx_runtime_.jsx(e0, {
                    children: children
                })
            })
        ]
    });
}


/***/ }),

/***/ 5023:
/***/ (() => {



/***/ })

};
;