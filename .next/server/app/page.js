(() => {
var exports = {};
exports.id = 931;
exports.ids = [931];
exports.modules = {

/***/ 18038:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/react");

/***/ }),

/***/ 98704:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/react-dom/server-rendering-stub");

/***/ }),

/***/ 97897:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/react-server-dom-webpack/client");

/***/ }),

/***/ 56786:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/react/jsx-runtime");

/***/ }),

/***/ 5868:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/app-render");

/***/ }),

/***/ 41844:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/get-segment-param");

/***/ }),

/***/ 96624:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/future/helpers/interception-routes");

/***/ }),

/***/ 75281:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/future/route-modules/route-module");

/***/ }),

/***/ 57085:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/app-router-context");

/***/ }),

/***/ 20199:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/hash");

/***/ }),

/***/ 39569:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/hooks-client-context");

/***/ }),

/***/ 17160:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context");

/***/ }),

/***/ 30893:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix");

/***/ }),

/***/ 12336:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-url");

/***/ }),

/***/ 17887:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/handle-smooth-scroll");

/***/ }),

/***/ 98735:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-bot");

/***/ }),

/***/ 60120:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-local-url");

/***/ }),

/***/ 68231:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path");

/***/ }),

/***/ 54614:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix");

/***/ }),

/***/ 53750:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash");

/***/ }),

/***/ 70982:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/resolve-href");

/***/ }),

/***/ 79618:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/server-inserted-html");

/***/ }),

/***/ 78423:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils");

/***/ }),

/***/ 35779:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GlobalError: () => (/* reexport default from dynamic */ next_dist_client_components_error_boundary__WEBPACK_IMPORTED_MODULE_2___default.a),
/* harmony export */   __next_app__: () => (/* binding */ __next_app__),
/* harmony export */   originalPathname: () => (/* binding */ originalPathname),
/* harmony export */   pages: () => (/* binding */ pages),
/* harmony export */   routeModule: () => (/* binding */ routeModule),
/* harmony export */   tree: () => (/* binding */ tree)
/* harmony export */ });
/* harmony import */ var next_dist_server_future_route_modules_app_page_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7262);
/* harmony import */ var next_dist_server_future_route_modules_app_page_module__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_page_module__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19513);
/* harmony import */ var next_dist_client_components_error_boundary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(31823);
/* harmony import */ var next_dist_client_components_error_boundary__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_components_error_boundary__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12502);
/* harmony import */ var next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__) if(["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
// @ts-ignore this need to be imported from next/dist to be external


const AppPageRouteModule = next_dist_server_future_route_modules_app_page_module__WEBPACK_IMPORTED_MODULE_0__.AppPageRouteModule;
// We inject the tree and pages here so that we can use them in the route
// module.
const tree = {
        children: [
        '',
        {
        children: ['__PAGE__', {}, {
          page: [() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 78159)), "c:\\Users\\datta\\OneDrive\\Desktop\\swasthyacare\\swasthyacare\\src\\app\\page.tsx"],
          
        }]
      },
        {
        'layout': [() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 26921)), "c:\\Users\\datta\\OneDrive\\Desktop\\swasthyacare\\swasthyacare\\src\\app\\layout.tsx"],
'not-found': [() => Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 95493, 23)), "next/dist/client/components/not-found-error"],
        
      }
      ]
      }.children;
const pages = ["c:\\Users\\datta\\OneDrive\\Desktop\\swasthyacare\\swasthyacare\\src\\app\\page.tsx"];

// @ts-expect-error - replaced by webpack/turbopack loader

const __next_app_require__ = __webpack_require__
const __next_app_load_chunk__ = () => Promise.resolve()
const originalPathname = "/page";
const __next_app__ = {
    require: __next_app_require__,
    loadChunk: __next_app_load_chunk__
};

// Create and export the route module that will be consumed.
const routeModule = new AppPageRouteModule({
    definition: {
        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_PAGE,
        page: "/page",
        pathname: "/",
        // The following aren't used in production.
        bundlePath: "",
        filename: "",
        appPaths: []
    },
    userland: {
        loaderTree: tree
    }
});

//# sourceMappingURL=app-page.js.map

/***/ }),

/***/ 48694:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 86413))

/***/ }),

/***/ 86413:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Home)
});

// NAMESPACE OBJECT: ./src/components/header.tsx
var header_namespaceObject = {};
__webpack_require__.r(header_namespaceObject);

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(11440);
// EXTERNAL MODULE: ./node_modules/next/navigation.js
var navigation = __webpack_require__(57114);
// EXTERNAL MODULE: ../../../../node_modules/zustand/esm/react.mjs + 1 modules
var react = __webpack_require__(22382);
;// CONCATENATED MODULE: ./src/hooks/useNotifications.ts

const useNotifications_useNotifications = (0,react/* create */.U)((set)=>({
        notifications: [
            {
                id: "1",
                type: "health_alert",
                title: "COVID-19 Vaccination Drive",
                message: "New vaccination center opened near you. Book your slot now.",
                timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
                read: false
            },
            {
                id: "2",
                type: "appointment",
                title: "Upcoming Appointment",
                message: "Reminder: Doctor appointment with Dr. Smith tomorrow at 10:00 AM",
                timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
                read: false
            },
            {
                id: "3",
                type: "order",
                title: "Medicine Order Update",
                message: "Your order #12345 has been shipped and will arrive tomorrow.",
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
                read: true
            }
        ],
        addNotification: (notification)=>set((state)=>({
                    notifications: [
                        {
                            id: Date.now().toString(),
                            timestamp: new Date().toISOString(),
                            read: false,
                            ...notification
                        },
                        ...state.notifications
                    ]
                })),
        markAsRead: (id)=>set((state)=>({
                    notifications: state.notifications.map((notification)=>notification.id === id ? {
                            ...notification,
                            read: true
                        } : notification)
                })),
        clearAll: ()=>set({
                notifications: []
            })
    }));

;// CONCATENATED MODULE: ./src/services/notificationService.ts
// Service for handling notification operations
class NotificationService {
    static instance;
    webSocket = null;
    notificationCallbacks = [];
    maxReconnectAttempts = 3;
    reconnectAttempts = 0;
    reconnectTimeout = null;
    constructor(){
        this.initializeWebSocket();
    }
    static getInstance() {
        if (!NotificationService.instance) {
            NotificationService.instance = new NotificationService();
        }
        return NotificationService.instance;
    }
    initializeWebSocket() {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.log("Max reconnection attempts reached. WebSocket notifications will be disabled.");
            return;
        }
        // In production, use secure WebSocket with your actual backend URL
        const WS_URL = /* unsupported import.meta.env.PROD */ undefined.PROD ? "wss://api.swasthyacare.com/notifications" : "ws://localhost:8080/notifications";
        try {
            this.webSocket = new WebSocket(WS_URL);
            this.webSocket.onopen = ()=>{
                console.log("WebSocket connection established");
                this.reconnectAttempts = 0; // Reset attempts on successful connection
            };
            this.webSocket.onmessage = (event)=>{
                const notification = JSON.parse(event.data);
                this.notificationCallbacks.forEach((callback)=>callback(notification));
            };
            this.webSocket.onerror = (error)=>{
                console.warn("WebSocket error - notifications may be unavailable");
                this.reconnectAttempts++;
            };
            this.webSocket.onclose = ()=>{
                console.log("WebSocket connection closed");
                if (this.reconnectAttempts < this.maxReconnectAttempts) {
                    this.reconnectTimeout = setTimeout(()=>this.initializeWebSocket(), 5000);
                }
            };
        } catch (error) {
            console.warn("WebSocket initialization failed - notifications may be unavailable");
            this.reconnectAttempts++;
            if (this.reconnectAttempts < this.maxReconnectAttempts) {
                this.reconnectTimeout = setTimeout(()=>this.initializeWebSocket(), 5000);
            }
        }
    }
    disconnect() {
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
            this.reconnectTimeout = null;
        }
        if (this.webSocket) {
            this.webSocket.close();
            this.webSocket = null;
        }
        this.reconnectAttempts = this.maxReconnectAttempts; // Prevent further reconnection attempts
    }
    subscribeToNotifications(callback) {
        this.notificationCallbacks.push(callback);
        return ()=>{
            this.notificationCallbacks = this.notificationCallbacks.filter((cb)=>cb !== callback);
        };
    }
    async markAsRead(notificationId) {
        try {
            const response = await fetch("/api/notifications/mark-read", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    notificationId
                })
            });
            if (!response.ok) {
                throw new Error("Failed to mark notification as read");
            }
        } catch (error) {
            console.error("Error marking notification as read:", error);
            throw error;
        }
    }
    async clearAllNotifications() {
        try {
            const response = await fetch("/api/notifications/clear-all", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                throw new Error("Failed to clear notifications");
            }
        } catch (error) {
            console.error("Error clearing notifications:", error);
            throw error;
        }
    }
    async getNotificationPreferences() {
        try {
            const response = await fetch("/api/notifications/preferences");
            if (!response.ok) {
                throw new Error("Failed to fetch notification preferences");
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching notification preferences:", error);
            throw error;
        }
    }
    async updateNotificationPreferences(preferences) {
        try {
            const response = await fetch("/api/notifications/preferences", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(preferences)
            });
            if (!response.ok) {
                throw new Error("Failed to update notification preferences");
            }
        } catch (error) {
            console.error("Error updating notification preferences:", error);
            throw error;
        }
    }
}
const notificationService_notificationService = NotificationService.getInstance();

;// CONCATENATED MODULE: ./src/hooks/useNotificationSound.ts

function useNotificationSound_useNotificationSound() {
    const audioRef = useRef(null);
    const [canPlaySound, setCanPlaySound] = useState(false);
    const [audio, setAudio] = useState(null);
    // Initialize audio elements
    useEffect(()=>{
        const notificationAudio = new Audio("/sounds/notification.mp3");
        const successAudio = new Audio("/sounds/success.mp3");
        // Pre-load both sounds
        notificationAudio.load();
        successAudio.load();
        setAudio(notificationAudio);
        audioRef.current = notificationAudio;
        return ()=>{
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);
    // Handle user interaction
    useEffect(()=>{
        const handleInteraction = ()=>{
            setCanPlaySound(true);
        };
        const events = [
            "click",
            "touchstart",
            "keydown"
        ];
        events.forEach((event)=>document.addEventListener(event, handleInteraction, {
                once: true
            }));
        return ()=>{
            events.forEach((event)=>document.removeEventListener(event, handleInteraction));
        };
    }, []);
    const playSound = useCallback((type = "new")=>{
        if (!canPlaySound || !audio) {
            console.log("Sound will play after user interaction");
            return;
        }
        try {
            const source = type === "new" ? "/sounds/notification.mp3" : "/sounds/success.mp3";
            if (audio.src !== source) {
                audio.src = source;
            }
            audio.currentTime = 0;
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch((error)=>{
                    console.warn("Failed to play notification sound:", error);
                });
            }
        } catch (error) {
            console.warn("Error playing notification sound:", error);
        }
    }, [
        canPlaySound,
        audio
    ]);
    return {
        playSound
    };
}

;// CONCATENATED MODULE: ./src/components/Notifications/NotificationItem.tsx







function NotificationItem_NotificationItem({ notification, onMarkAsRead }) {
    const getIcon = ()=>{
        switch(notification.type){
            case "health_alert":
                return /*#__PURE__*/ _jsx(AlertCircle, {
                    className: "h-5 w-5 text-red-500"
                });
            case "appointment":
                return /*#__PURE__*/ _jsx(Calendar, {
                    className: "h-5 w-5 text-blue-500"
                });
            case "order":
                return /*#__PURE__*/ _jsx(Package, {
                    className: "h-5 w-5 text-emerald-500"
                });
            default:
                return /*#__PURE__*/ _jsx(Bell, {
                    className: "h-5 w-5 text-gray-500"
                });
        }
    };
    const getTimeAgo = (date)=>{
        const now = new Date();
        const notificationDate = new Date(date);
        const diffInMinutes = Math.floor((now.getTime() - notificationDate.getTime()) / (1000 * 60));
        if (diffInMinutes < 60) {
            return `${diffInMinutes}m ago`;
        } else if (diffInMinutes < 1440) {
            return `${Math.floor(diffInMinutes / 60)}h ago`;
        } else {
            return `${Math.floor(diffInMinutes / 1440)}d ago`;
        }
    };
    return /*#__PURE__*/ _jsx("div", {
        className: `p-4 hover:bg-gray-50 transition-colors ${!notification.read ? "bg-blue-50" : ""}`,
        children: /*#__PURE__*/ _jsxs("div", {
            className: "flex items-start gap-3",
            children: [
                /*#__PURE__*/ _jsx("div", {
                    className: "flex-shrink-0",
                    children: getIcon()
                }),
                /*#__PURE__*/ _jsxs("div", {
                    className: "flex-1 min-w-0",
                    children: [
                        /*#__PURE__*/ _jsx("p", {
                            className: "text-sm font-medium text-gray-900",
                            children: notification.title
                        }),
                        /*#__PURE__*/ _jsx("p", {
                            className: "text-sm text-gray-600 mt-1",
                            children: notification.message
                        }),
                        /*#__PURE__*/ _jsxs("div", {
                            className: "flex items-center gap-4 mt-2",
                            children: [
                                /*#__PURE__*/ _jsx("span", {
                                    className: "text-xs text-gray-500",
                                    children: getTimeAgo(notification.timestamp)
                                }),
                                !notification.read && /*#__PURE__*/ _jsxs("button", {
                                    onClick: ()=>onMarkAsRead(notification.id),
                                    className: "flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700",
                                    children: [
                                        /*#__PURE__*/ _jsx(Check, {
                                            className: "h-3 w-3"
                                        }),
                                        "Mark as read"
                                    ]
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
}

;// CONCATENATED MODULE: ./src/components/Notifications/NotificationList.tsx




function NotificationList_NotificationList({ notifications, onMarkAsRead, onClearAll }) {
    const groupedNotifications = groupNotificationsByDate(notifications);
    return /*#__PURE__*/ _jsxs("div", {
        className: "divide-y divide-gray-100",
        children: [
            notifications.length > 0 && /*#__PURE__*/ _jsx("div", {
                className: "px-4 py-2 flex justify-end",
                children: /*#__PURE__*/ _jsx("button", {
                    onClick: onClearAll,
                    className: "text-sm text-gray-500 hover:text-gray-700",
                    children: "Clear All"
                })
            }),
            groupedNotifications.map(([date, notifications])=>/*#__PURE__*/ _jsxs("div", {
                    children: [
                        /*#__PURE__*/ _jsx("div", {
                            className: "px-4 py-2 bg-gray-50",
                            children: /*#__PURE__*/ _jsx("span", {
                                className: "text-sm font-medium text-gray-600",
                                children: new Date(date).toLocaleDateString(undefined, {
                                    weekday: "long",
                                    month: "long",
                                    day: "numeric"
                                })
                            })
                        }),
                        /*#__PURE__*/ _jsx("div", {
                            className: "divide-y divide-gray-100",
                            children: notifications.map((notification)=>/*#__PURE__*/ _jsx(NotificationItem, {
                                    notification: notification,
                                    onMarkAsRead: onMarkAsRead
                                }, notification.id))
                        })
                    ]
                }, date)),
            notifications.length === 0 && /*#__PURE__*/ _jsx("div", {
                className: "p-4 text-center text-gray-500",
                children: "No notifications"
            })
        ]
    });
}

;// CONCATENATED MODULE: ./src/components/Notifications/NotificationPreferences.tsx






function NotificationPreferences_NotificationPreferences({ onClose }) {
    const [preferences, setPreferences] = useState({
        health_alert: true,
        appointment: true,
        order: true
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(()=>{
        loadPreferences();
    }, []);
    const loadPreferences = async ()=>{
        try {
            const prefs = await notificationService.getNotificationPreferences();
            setPreferences(prefs);
        } catch (err) {
            setError("Failed to load preferences");
        } finally{
            setLoading(false);
        }
    };
    const handleToggle = async (type)=>{
        try {
            const newPreferences = {
                ...preferences,
                [type]: !preferences[type]
            };
            await notificationService.updateNotificationPreferences(newPreferences);
            setPreferences(newPreferences);
        } catch (err) {
            setError("Failed to update preference");
        }
    };
    if (loading) {
        return /*#__PURE__*/ _jsx("div", {
            className: "p-4 text-center",
            children: /*#__PURE__*/ _jsx("div", {
                className: "animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600 mx-auto"
            })
        });
    }
    return /*#__PURE__*/ _jsxs("div", {
        className: "p-4",
        children: [
            /*#__PURE__*/ _jsxs("div", {
                className: "space-y-4",
                children: [
                    error && /*#__PURE__*/ _jsx("div", {
                        className: "p-2 text-sm text-red-600 bg-red-50 rounded",
                        children: error
                    }),
                    /*#__PURE__*/ _jsxs("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ _jsxs("div", {
                                className: "flex items-center space-x-3",
                                children: [
                                    /*#__PURE__*/ _jsx(AlertCircle, {
                                        className: "h-5 w-5 text-red-500"
                                    }),
                                    /*#__PURE__*/ _jsx("span", {
                                        children: "Health Alerts"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ _jsx("button", {
                                onClick: ()=>handleToggle("health_alert"),
                                className: `relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${preferences.health_alert ? "bg-emerald-600" : "bg-gray-200"}`,
                                children: /*#__PURE__*/ _jsx("span", {
                                    className: `inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${preferences.health_alert ? "translate-x-6" : "translate-x-1"}`
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ _jsxs("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ _jsxs("div", {
                                className: "flex items-center space-x-3",
                                children: [
                                    /*#__PURE__*/ _jsx(Calendar, {
                                        className: "h-5 w-5 text-blue-500"
                                    }),
                                    /*#__PURE__*/ _jsx("span", {
                                        children: "Appointments"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ _jsx("button", {
                                onClick: ()=>handleToggle("appointment"),
                                className: `relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${preferences.appointment ? "bg-emerald-600" : "bg-gray-200"}`,
                                children: /*#__PURE__*/ _jsx("span", {
                                    className: `inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${preferences.appointment ? "translate-x-6" : "translate-x-1"}`
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ _jsxs("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ _jsxs("div", {
                                className: "flex items-center space-x-3",
                                children: [
                                    /*#__PURE__*/ _jsx(Package, {
                                        className: "h-5 w-5 text-purple-500"
                                    }),
                                    /*#__PURE__*/ _jsx("span", {
                                        children: "Orders"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ _jsx("button", {
                                onClick: ()=>handleToggle("order"),
                                className: `relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${preferences.order ? "bg-emerald-600" : "bg-gray-200"}`,
                                children: /*#__PURE__*/ _jsx("span", {
                                    className: `inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${preferences.order ? "translate-x-6" : "translate-x-1"}`
                                })
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ _jsx("div", {
                className: "mt-6 flex justify-end",
                children: /*#__PURE__*/ _jsx("button", {
                    onClick: onClose,
                    className: "px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900",
                    children: "Done"
                })
            })
        ]
    });
}

;// CONCATENATED MODULE: ./src/components/Notifications/NotificationsPanel.tsx











function NotificationsPanel_NotificationsPanel() {
    // Move all useState declarations to the top
    const [isOpen, setIsOpen] = useState(false);
    const [showPreferences, setShowPreferences] = useState(false);
    // Custom hooks after useState
    const { notifications, markAsRead, clearAll } = useNotifications();
    const { playSound } = useNotificationSound();
    // Derived state
    const unreadCount = notifications.filter((n)=>!n.read).length;
    // Event handlers using useCallback
    const handleMarkAsRead = useCallback(async (id)=>{
        try {
            await notificationService.markAsRead(id);
            markAsRead(id);
            playSound("success");
        } catch (error) {
            console.error("Failed to mark notification as read:", error);
        }
    }, [
        markAsRead,
        playSound
    ]);
    const handleClearAll = useCallback(async ()=>{
        try {
            await notificationService.clearAllNotifications();
            clearAll();
        } catch (error) {
            console.error("Failed to clear notifications:", error);
        }
    }, [
        clearAll
    ]);
    // Side effects
    useEffect(()=>{
        const unsubscribe = notificationService.subscribeToNotifications((notification)=>{
            playSound("new");
            showPushNotification(notification);
        });
        return ()=>unsubscribe();
    }, [
        playSound
    ]);
    return /*#__PURE__*/ _jsxs("div", {
        className: "relative",
        children: [
            /*#__PURE__*/ _jsxs("button", {
                onClick: ()=>setIsOpen(!isOpen),
                className: "relative p-2 rounded-full text-gray-500 hover:text-gray-700",
                children: [
                    /*#__PURE__*/ _jsx(Bell, {
                        className: "h-6 w-6"
                    }),
                    unreadCount > 0 && /*#__PURE__*/ _jsx("span", {
                        className: "absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full",
                        children: unreadCount
                    })
                ]
            }),
            isOpen && /*#__PURE__*/ _jsxs("div", {
                className: "absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50",
                children: [
                    /*#__PURE__*/ _jsxs("div", {
                        className: "p-4 border-b flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ _jsx("h3", {
                                className: "text-lg font-medium",
                                children: "Notifications"
                            }),
                            /*#__PURE__*/ _jsxs("div", {
                                className: "flex space-x-2",
                                children: [
                                    /*#__PURE__*/ _jsx("button", {
                                        onClick: ()=>setShowPreferences(true),
                                        className: "p-2 text-gray-500 hover:text-gray-700 rounded-full",
                                        children: /*#__PURE__*/ _jsx(Settings, {
                                            className: "h-5 w-5"
                                        })
                                    }),
                                    /*#__PURE__*/ _jsx("button", {
                                        onClick: ()=>setIsOpen(false),
                                        className: "p-2 text-gray-500 hover:text-gray-700 rounded-full",
                                        children: /*#__PURE__*/ _jsx(X, {
                                            className: "h-5 w-5"
                                        })
                                    })
                                ]
                            })
                        ]
                    }),
                    showPreferences ? /*#__PURE__*/ _jsx(NotificationPreferences, {
                        onClose: ()=>setShowPreferences(false)
                    }) : /*#__PURE__*/ _jsx(NotificationList, {
                        notifications: notifications,
                        onMarkAsRead: handleMarkAsRead,
                        onClearAll: handleClearAll
                    })
                ]
            })
        ]
    });
}

// EXTERNAL MODULE: ./node_modules/@radix-ui/react-slot/dist/index.mjs
var dist = __webpack_require__(71085);
// EXTERNAL MODULE: ./node_modules/class-variance-authority/dist/index.mjs
var class_variance_authority_dist = __webpack_require__(91971);
;// CONCATENATED MODULE: ./src/components/ui/Button.tsx
Object(function webpackMissingModule() { var e = new Error("Cannot find module '@/lib/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());





const buttonVariants = (0,class_variance_authority_dist/* cva */.j)("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Button_Button = /*#__PURE__*/ react_.forwardRef(({ className, variant, size, asChild = false, ...props }, ref)=>{
    const Comp = asChild ? dist/* Slot */.g7 : "button";
    return /*#__PURE__*/ jsx_runtime_.jsx(Comp, {
        className: Object(function webpackMissingModule() { var e = new Error("Cannot find module '@/lib/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        ...props
    });
});
Button_Button.displayName = "Button";


// EXTERNAL MODULE: ../../../../node_modules/.pnpm/@radix-ui+react-avatar@1.1.2_@types+react@19.0.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@radix-ui/react-avatar/dist/index.mjs
var react_avatar_dist = __webpack_require__(88061);
;// CONCATENATED MODULE: ./src/components/ui/Avatar.tsx
Object(function webpackMissingModule() { var e = new Error("Cannot find module '@/lib/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());




const Avatar_Avatar = /*#__PURE__*/ react_.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ jsx_runtime_.jsx(react_avatar_dist/* Root */.fC, {
        ref: ref,
        className: Object(function webpackMissingModule() { var e = new Error("Cannot find module '@/lib/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className),
        ...props
    }));
Avatar_Avatar.displayName = react_avatar_dist/* Root */.fC.displayName;
const Avatar_AvatarImage = /*#__PURE__*/ react_.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ jsx_runtime_.jsx(react_avatar_dist/* Image */.Ee, {
        ref: ref,
        className: Object(function webpackMissingModule() { var e = new Error("Cannot find module '@/lib/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())("aspect-square h-full w-full", className),
        ...props
    }));
Avatar_AvatarImage.displayName = react_avatar_dist/* Image */.Ee.displayName;
const Avatar_AvatarFallback = /*#__PURE__*/ react_.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ jsx_runtime_.jsx(react_avatar_dist/* Fallback */.NY, {
        ref: ref,
        className: Object(function webpackMissingModule() { var e = new Error("Cannot find module '@/lib/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())("flex h-full w-full items-center justify-center rounded-full bg-muted", className),
        ...props
    }));
Avatar_AvatarFallback.displayName = react_avatar_dist/* Fallback */.NY.displayName;


;// CONCATENATED MODULE: ./src/components/header.tsx
Object(function webpackMissingModule() { var e = new Error("Cannot find module '@/context/AuthContext'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module '@/lib/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* __next_internal_client_entry_do_not_use__ Header auto */ 










function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const router = useRouter();
    const { user, signOut } = Object(function webpackMissingModule() { var e = new Error("Cannot find module '@/context/AuthContext'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    const toggleMenu = ()=>{
        setIsOpen(!isOpen);
    };
    const handleLogout = async ()=>{
        try {
            await signOut();
            router.push("/login");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };
    return /*#__PURE__*/ _jsxs("header", {
        className: "bg-white shadow-sm",
        children: [
            /*#__PURE__*/ _jsx("div", {
                className: "container mx-auto px-4",
                children: /*#__PURE__*/ _jsxs("div", {
                    className: "flex items-center justify-between h-16",
                    children: [
                        /*#__PURE__*/ _jsx("div", {
                            className: "flex items-center",
                            children: /*#__PURE__*/ _jsx(Link, {
                                href: "/",
                                className: "text-xl font-bold text-gray-800",
                                children: "SwasthyaCare"
                            })
                        }),
                        /*#__PURE__*/ _jsxs("nav", {
                            className: "hidden md:flex space-x-4",
                            children: [
                                /*#__PURE__*/ _jsx(Link, {
                                    href: "/dashboard",
                                    className: "text-gray-600 hover:text-gray-900",
                                    children: "Dashboard"
                                }),
                                /*#__PURE__*/ _jsx(Link, {
                                    href: "/appointments",
                                    className: "text-gray-600 hover:text-gray-900",
                                    children: "Appointments"
                                }),
                                /*#__PURE__*/ _jsx(Link, {
                                    href: "/emergency",
                                    className: "text-gray-600 hover:text-gray-900",
                                    children: "Emergency"
                                }),
                                /*#__PURE__*/ _jsx(Link, {
                                    href: "/resources",
                                    className: "text-gray-600 hover:text-gray-900",
                                    children: "Resources"
                                })
                            ]
                        }),
                        /*#__PURE__*/ _jsxs("div", {
                            className: "hidden md:flex items-center space-x-4",
                            children: [
                                /*#__PURE__*/ _jsxs(Button, {
                                    variant: "ghost",
                                    size: "icon",
                                    onClick: ()=>setShowNotifications(!showNotifications),
                                    children: [
                                        /*#__PURE__*/ _jsx("span", {
                                            className: "sr-only",
                                            children: "Notifications"
                                        }),
                                        /*#__PURE__*/ _jsx("svg", {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            className: "h-6 w-6",
                                            fill: "none",
                                            viewBox: "0 0 24 24",
                                            stroke: "currentColor",
                                            children: /*#__PURE__*/ _jsx("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                            })
                                        })
                                    ]
                                }),
                                user ? /*#__PURE__*/ _jsxs("div", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ _jsx(Button, {
                                            variant: "ghost",
                                            size: "icon",
                                            onClick: ()=>setIsOpen(!isOpen),
                                            className: "flex items-center space-x-2",
                                            children: /*#__PURE__*/ _jsxs(Avatar, {
                                                children: [
                                                    /*#__PURE__*/ _jsx(AvatarImage, {
                                                        src: user.photoURL || ""
                                                    }),
                                                    /*#__PURE__*/ _jsx(AvatarFallback, {
                                                        children: user.email?.[0].toUpperCase()
                                                    })
                                                ]
                                            })
                                        }),
                                        isOpen && /*#__PURE__*/ _jsx("div", {
                                            className: "absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5",
                                            children: /*#__PURE__*/ _jsxs("div", {
                                                className: "py-1",
                                                children: [
                                                    /*#__PURE__*/ _jsx(Link, {
                                                        href: "/profile",
                                                        className: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",
                                                        children: "Profile"
                                                    }),
                                                    /*#__PURE__*/ _jsx("button", {
                                                        onClick: handleLogout,
                                                        className: "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",
                                                        children: "Sign out"
                                                    })
                                                ]
                                            })
                                        })
                                    ]
                                }) : /*#__PURE__*/ _jsx(Link, {
                                    href: "/login",
                                    children: /*#__PURE__*/ _jsx(Button, {
                                        children: "Sign in"
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ _jsx("div", {
                            className: "md:hidden",
                            children: /*#__PURE__*/ _jsxs(Button, {
                                variant: "ghost",
                                size: "icon",
                                onClick: toggleMenu,
                                className: "inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500",
                                children: [
                                    /*#__PURE__*/ _jsx("span", {
                                        className: "sr-only",
                                        children: "Open main menu"
                                    }),
                                    isOpen ? /*#__PURE__*/ _jsx(X, {
                                        className: "block h-6 w-6",
                                        "aria-hidden": "true"
                                    }) : /*#__PURE__*/ _jsx(Menu, {
                                        className: "block h-6 w-6",
                                        "aria-hidden": "true"
                                    })
                                ]
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ _jsx("div", {
                className: Object(function webpackMissingModule() { var e = new Error("Cannot find module '@/lib/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())("md:hidden", isOpen ? "block" : "hidden"),
                children: /*#__PURE__*/ _jsxs("div", {
                    className: "px-2 pt-2 pb-3 space-y-1",
                    children: [
                        /*#__PURE__*/ _jsx(Link, {
                            href: "/dashboard",
                            className: "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50",
                            children: "Dashboard"
                        }),
                        /*#__PURE__*/ _jsx(Link, {
                            href: "/appointments",
                            className: "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50",
                            children: "Appointments"
                        }),
                        /*#__PURE__*/ _jsx(Link, {
                            href: "/emergency",
                            className: "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50",
                            children: "Emergency"
                        }),
                        /*#__PURE__*/ _jsx(Link, {
                            href: "/resources",
                            className: "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50",
                            children: "Resources"
                        }),
                        user && /*#__PURE__*/ _jsx("button", {
                            onClick: handleLogout,
                            className: "block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50",
                            children: "Sign out"
                        })
                    ]
                })
            }),
            showNotifications && /*#__PURE__*/ _jsx(NotificationsPanel, {
                onClose: ()=>setShowNotifications(false)
            })
        ]
    });
}

// EXTERNAL MODULE: ./node_modules/next/dist/shared/lib/app-dynamic.js
var app_dynamic = __webpack_require__(47335);
var app_dynamic_default = /*#__PURE__*/__webpack_require__.n(app_dynamic);
;// CONCATENATED MODULE: ./src/app/page.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 


const LocationMap = app_dynamic_default()(null, {
    loadableGenerated: {
        modules: [
            "c:\\Users\\datta\\OneDrive\\Desktop\\swasthyacare\\swasthyacare\\src\\app\\page.tsx -> " + "../components/Maps/LocationMap"
        ]
    },
    ssr: false
});
function Home() {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("main", {
        className: "min-h-screen",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(header_namespaceObject["default"], {}),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "container mx-auto px-4 py-8",
                children: /*#__PURE__*/ jsx_runtime_.jsx(LocationMap, {})
            })
        ]
    });
}


/***/ }),

/***/ 78159:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $$typeof: () => (/* binding */ $$typeof),
/* harmony export */   __esModule: () => (/* binding */ __esModule),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(61363);

const proxy = (0,next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__.createProxy)(String.raw`c:\Users\datta\OneDrive\Desktop\swasthyacare\swasthyacare\src\app\page.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__default__);

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [478,939,754,335,382,906], () => (__webpack_exec__(35779)));
module.exports = __webpack_exports__;

})();