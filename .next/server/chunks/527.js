exports.id = 527;
exports.ids = [527];
exports.modules = {

/***/ 86828:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 31232, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 50831, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 56926, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 52987, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 44282, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 16505, 23))

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
/* harmony import */ var _context_AuthContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(63895);
/* __next_internal_client_entry_do_not_use__ Providers auto */ 


function Providers({ children }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_themes__WEBPACK_IMPORTED_MODULE_1__/* .ThemeProvider */ .f, {
        attribute: "class",
        defaultTheme: "system",
        enableSystem: true,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_context_AuthContext__WEBPACK_IMPORTED_MODULE_2__/* .AuthProvider */ .Ho, {
            children: children
        })
    });
}


/***/ }),

/***/ 63895:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Ho: () => (/* binding */ AuthProvider),
  aC: () => (/* binding */ useAuth)
});

// UNUSED EXPORTS: default

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
var react_default = /*#__PURE__*/__webpack_require__.n(react_);
// EXTERNAL MODULE: ./node_modules/firebase/auth/dist/index.mjs + 2 modules
var dist = __webpack_require__(98389);
// EXTERNAL MODULE: ./node_modules/firebase/app/dist/index.mjs
var app_dist = __webpack_require__(72856);
;// CONCATENATED MODULE: ./src/lib/firebase.ts


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDV2a5fUmYT5auX7lc2f2ZWoAGyf2lKFWc",
    authDomain: "swasthya-42ae5.firebaseapp.com",
    projectId: "swasthya-42ae5",
    storageBucket: "swasthya-42ae5.firebasestorage.app",
    messagingSenderId: "271708715566",
    appId: "1:271708715566:web:b1e23f2dd289915c1cbdbf",
    measurementId: "G-P3RZMGVLY6"
};
// Initialize Firebase
const app = (0,app_dist/* initializeApp */.ZF)(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = (0,dist/* getAuth */.v0)(app);


;// CONCATENATED MODULE: ./src/context/AuthContext.tsx
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'sonner'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());





const AuthContext = /*#__PURE__*/ react_default().createContext(null);
function getErrorMessage(error) {
    switch(error.code){
        case "auth/user-not-found":
            return "No account found with this email. Please register first.";
        case "auth/wrong-password":
            return "Incorrect password. Please try again.";
        case "auth/email-already-in-use":
            return "Email already registered. Please login instead.";
        case "auth/weak-password":
            return "Password should be at least 6 characters.";
        case "auth/invalid-email":
            return "Invalid email address.";
        default:
            return error.message;
    }
}
function AuthProvider({ children }) {
    const [user, setUser] = react_default().useState(null);
    const [loading, setLoading] = react_default().useState(true);
    const [isAuthenticated, setIsAuthenticated] = react_default().useState(false);
    react_default().useEffect(()=>{
        const unsubscribe = (0,dist/* onAuthStateChanged */.Aj)(auth, (user)=>{
            setUser(user);
            setIsAuthenticated(!!user);
            setLoading(false);
        });
        return ()=>unsubscribe();
    }, []);
    const login = async (email, password)=>{
        try {
            const userCredential = await (0,dist/* signInWithEmailAndPassword */.e5)(auth, email, password);
            setUser(userCredential.user);
            setIsAuthenticated(true);
            Object(function webpackMissingModule() { var e = new Error("Cannot find module 'sonner'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).success("Successfully logged in!");
        } catch (error) {
            Object(function webpackMissingModule() { var e = new Error("Cannot find module 'sonner'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).error(getErrorMessage(error));
            throw error;
        }
    };
    const register = async (email, password)=>{
        try {
            const userCredential = await (0,dist/* createUserWithEmailAndPassword */.Xb)(auth, email, password);
            setUser(userCredential.user);
            setIsAuthenticated(true);
            Object(function webpackMissingModule() { var e = new Error("Cannot find module 'sonner'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).success("Successfully registered!");
        } catch (error) {
            Object(function webpackMissingModule() { var e = new Error("Cannot find module 'sonner'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).error(getErrorMessage(error));
            throw error;
        }
    };
    const logout = async ()=>{
        try {
            await (0,dist/* signOut */.w7)(auth);
            setUser(null);
            setIsAuthenticated(false);
            Object(function webpackMissingModule() { var e = new Error("Cannot find module 'sonner'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).success("Successfully logged out!");
        } catch (error) {
            Object(function webpackMissingModule() { var e = new Error("Cannot find module 'sonner'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).error(getErrorMessage(error));
            throw error;
        }
    };
    return /*#__PURE__*/ jsx_runtime_.jsx(AuthContext.Provider, {
        value: {
            user,
            login,
            register,
            logout,
            loading,
            isAuthenticated
        },
        children: children
    });
}
function useAuth() {
    const context = react_default().useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
/* harmony default export */ const context_AuthContext = ((/* unused pure expression or super */ null && (AuthContext)));


/***/ }),

/***/ 12019:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cn: () => (/* binding */ cn)
/* harmony export */ });
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(80391);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var tailwind_merge__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(59610);


function cn(...inputs) {
    return (0,tailwind_merge__WEBPACK_IMPORTED_MODULE_1__/* .twMerge */ .m)((0,clsx__WEBPACK_IMPORTED_MODULE_0__.clsx)(inputs));
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