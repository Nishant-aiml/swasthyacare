"use strict";
(() => {
var exports = {};
exports.id = 832;
exports.ids = [832];
exports.modules = {

/***/ 39491:
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ 82361:
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ 57147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 13685:
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ 95687:
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ 22037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 71017:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 12781:
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ 76224:
/***/ ((module) => {

module.exports = require("tty");

/***/ }),

/***/ 57310:
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ 73837:
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ 59796:
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ 20163:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  headerHooks: () => (/* binding */ headerHooks),
  originalPathname: () => (/* binding */ originalPathname),
  requestAsyncStorage: () => (/* binding */ requestAsyncStorage),
  routeModule: () => (/* binding */ routeModule),
  serverHooks: () => (/* binding */ serverHooks),
  staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),
  staticGenerationBailout: () => (/* binding */ staticGenerationBailout)
});

// NAMESPACE OBJECT: ./src/app/api/places/nearby/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  GET: () => (GET)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(42394);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(69692);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-kind.js
var route_kind = __webpack_require__(19513);
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 53 modules
var axios = __webpack_require__(54829);
;// CONCATENATED MODULE: ./src/app/api/places/nearby/route.ts

function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371; // in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const lat1Rad = lat1 * Math.PI / 180;
    const lat2Rad = lat2 * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    return distance;
}
async function GET(request) {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const type = searchParams.get("type");
    if (!lat || !lng) {
        return new Response(JSON.stringify({
            error: "Latitude and longitude are required"
        }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
    try {
        const response = await axios/* default */.Z.get(`https://nominatim.openstreetmap.org/search?format=json&q=${type === "all" ? "hospital|clinic|emergency" : type}&lat=${lat}&lon=${lng}&addressdetails=1&limit=10&radius=5000`);
        const places = response.data.filter((place)=>place.lat && place.lon).map((place)=>({
                id: place.place_id,
                name: place.display_name,
                type: place.type,
                position: [
                    parseFloat(place.lat),
                    parseFloat(place.lon)
                ],
                distance: calculateDistance(parseFloat(lat), parseFloat(lng), parseFloat(place.lat), parseFloat(place.lon))
            })).sort((a, b)=>(a.distance || 0) - (b.distance || 0));
        return new Response(JSON.stringify(places), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        console.error("Error fetching nearby places:", error);
        return new Response(JSON.stringify({
            error: "Failed to fetch nearby places"
        }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fplaces%2Fnearby%2Froute&name=app%2Fapi%2Fplaces%2Fnearby%2Froute&pagePath=private-next-app-dir%2Fapi%2Fplaces%2Fnearby%2Froute.ts&appDir=c%3A%5CUsers%5Cdatta%5COneDrive%5CDesktop%5Cswasthyacare%5Cswasthyacare%5Csrc%5Capp&appPaths=%2Fapi%2Fplaces%2Fnearby%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

// @ts-ignore this need to be imported from next/dist to be external


// @ts-expect-error - replaced by webpack/turbopack loader

const AppRouteRouteModule = app_route_module.AppRouteRouteModule;
// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = ""
const routeModule = new AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/api/places/nearby/route",
        pathname: "/api/places/nearby",
        filename: "route",
        bundlePath: "app/api/places/nearby/route"
    },
    resolvedPagePath: "c:\\Users\\datta\\OneDrive\\Desktop\\swasthyacare\\swasthyacare\\src\\app\\api\\places\\nearby\\route.ts",
    nextConfigOutput,
    userland: route_namespaceObject
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { requestAsyncStorage , staticGenerationAsyncStorage , serverHooks , headerHooks , staticGenerationBailout  } = routeModule;
const originalPathname = "/api/places/nearby/route";


//# sourceMappingURL=app-route.js.map

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [478,587], () => (__webpack_exec__(20163)));
module.exports = __webpack_exports__;

})();