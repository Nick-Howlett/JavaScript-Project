/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./lib/axios */ \"./node_modules/axios/lib/axios.js\");\n\n//# sourceURL=webpack:///./node_modules/axios/index.js?");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar settle = __webpack_require__(/*! ./../core/settle */ \"./node_modules/axios/lib/core/settle.js\");\nvar buildURL = __webpack_require__(/*! ./../helpers/buildURL */ \"./node_modules/axios/lib/helpers/buildURL.js\");\nvar parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ \"./node_modules/axios/lib/helpers/parseHeaders.js\");\nvar isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ \"./node_modules/axios/lib/helpers/isURLSameOrigin.js\");\nvar createError = __webpack_require__(/*! ../core/createError */ \"./node_modules/axios/lib/core/createError.js\");\nvar btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(/*! ./../helpers/btoa */ \"./node_modules/axios/lib/helpers/btoa.js\");\n\nmodule.exports = function xhrAdapter(config) {\n  return new Promise(function dispatchXhrRequest(resolve, reject) {\n    var requestData = config.data;\n    var requestHeaders = config.headers;\n\n    if (utils.isFormData(requestData)) {\n      delete requestHeaders['Content-Type']; // Let the browser set it\n    }\n\n    var request = new XMLHttpRequest();\n    var loadEvent = 'onreadystatechange';\n    var xDomain = false;\n\n    // For IE 8/9 CORS support\n    // Only supports POST and GET calls and doesn't returns the response headers.\n    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.\n    if ( true &&\n        typeof window !== 'undefined' &&\n        window.XDomainRequest && !('withCredentials' in request) &&\n        !isURLSameOrigin(config.url)) {\n      request = new window.XDomainRequest();\n      loadEvent = 'onload';\n      xDomain = true;\n      request.onprogress = function handleProgress() {};\n      request.ontimeout = function handleTimeout() {};\n    }\n\n    // HTTP basic authentication\n    if (config.auth) {\n      var username = config.auth.username || '';\n      var password = config.auth.password || '';\n      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);\n    }\n\n    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);\n\n    // Set the request timeout in MS\n    request.timeout = config.timeout;\n\n    // Listen for ready state\n    request[loadEvent] = function handleLoad() {\n      if (!request || (request.readyState !== 4 && !xDomain)) {\n        return;\n      }\n\n      // The request errored out and we didn't get a response, this will be\n      // handled by onerror instead\n      // With one exception: request that using file: protocol, most browsers\n      // will return status as 0 even though it's a successful request\n      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {\n        return;\n      }\n\n      // Prepare the response\n      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;\n      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;\n      var response = {\n        data: responseData,\n        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)\n        status: request.status === 1223 ? 204 : request.status,\n        statusText: request.status === 1223 ? 'No Content' : request.statusText,\n        headers: responseHeaders,\n        config: config,\n        request: request\n      };\n\n      settle(resolve, reject, response);\n\n      // Clean up request\n      request = null;\n    };\n\n    // Handle low level network errors\n    request.onerror = function handleError() {\n      // Real errors are hidden from us by the browser\n      // onerror should only fire if it's a network error\n      reject(createError('Network Error', config, null, request));\n\n      // Clean up request\n      request = null;\n    };\n\n    // Handle timeout\n    request.ontimeout = function handleTimeout() {\n      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',\n        request));\n\n      // Clean up request\n      request = null;\n    };\n\n    // Add xsrf header\n    // This is only done if running in a standard browser environment.\n    // Specifically not if we're in a web worker, or react-native.\n    if (utils.isStandardBrowserEnv()) {\n      var cookies = __webpack_require__(/*! ./../helpers/cookies */ \"./node_modules/axios/lib/helpers/cookies.js\");\n\n      // Add xsrf header\n      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?\n          cookies.read(config.xsrfCookieName) :\n          undefined;\n\n      if (xsrfValue) {\n        requestHeaders[config.xsrfHeaderName] = xsrfValue;\n      }\n    }\n\n    // Add headers to the request\n    if ('setRequestHeader' in request) {\n      utils.forEach(requestHeaders, function setRequestHeader(val, key) {\n        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {\n          // Remove Content-Type if data is undefined\n          delete requestHeaders[key];\n        } else {\n          // Otherwise add header to the request\n          request.setRequestHeader(key, val);\n        }\n      });\n    }\n\n    // Add withCredentials to request if needed\n    if (config.withCredentials) {\n      request.withCredentials = true;\n    }\n\n    // Add responseType to request if needed\n    if (config.responseType) {\n      try {\n        request.responseType = config.responseType;\n      } catch (e) {\n        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.\n        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.\n        if (config.responseType !== 'json') {\n          throw e;\n        }\n      }\n    }\n\n    // Handle progress if needed\n    if (typeof config.onDownloadProgress === 'function') {\n      request.addEventListener('progress', config.onDownloadProgress);\n    }\n\n    // Not all browsers support upload events\n    if (typeof config.onUploadProgress === 'function' && request.upload) {\n      request.upload.addEventListener('progress', config.onUploadProgress);\n    }\n\n    if (config.cancelToken) {\n      // Handle cancellation\n      config.cancelToken.promise.then(function onCanceled(cancel) {\n        if (!request) {\n          return;\n        }\n\n        request.abort();\n        reject(cancel);\n        // Clean up request\n        request = null;\n      });\n    }\n\n    if (requestData === undefined) {\n      requestData = null;\n    }\n\n    // Send the request\n    request.send(requestData);\n  });\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/adapters/xhr.js?");

/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./utils */ \"./node_modules/axios/lib/utils.js\");\nvar bind = __webpack_require__(/*! ./helpers/bind */ \"./node_modules/axios/lib/helpers/bind.js\");\nvar Axios = __webpack_require__(/*! ./core/Axios */ \"./node_modules/axios/lib/core/Axios.js\");\nvar defaults = __webpack_require__(/*! ./defaults */ \"./node_modules/axios/lib/defaults.js\");\n\n/**\n * Create an instance of Axios\n *\n * @param {Object} defaultConfig The default config for the instance\n * @return {Axios} A new instance of Axios\n */\nfunction createInstance(defaultConfig) {\n  var context = new Axios(defaultConfig);\n  var instance = bind(Axios.prototype.request, context);\n\n  // Copy axios.prototype to instance\n  utils.extend(instance, Axios.prototype, context);\n\n  // Copy context to instance\n  utils.extend(instance, context);\n\n  return instance;\n}\n\n// Create the default instance to be exported\nvar axios = createInstance(defaults);\n\n// Expose Axios class to allow class inheritance\naxios.Axios = Axios;\n\n// Factory for creating new instances\naxios.create = function create(instanceConfig) {\n  return createInstance(utils.merge(defaults, instanceConfig));\n};\n\n// Expose Cancel & CancelToken\naxios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ \"./node_modules/axios/lib/cancel/Cancel.js\");\naxios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ \"./node_modules/axios/lib/cancel/CancelToken.js\");\naxios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ \"./node_modules/axios/lib/cancel/isCancel.js\");\n\n// Expose all/spread\naxios.all = function all(promises) {\n  return Promise.all(promises);\n};\naxios.spread = __webpack_require__(/*! ./helpers/spread */ \"./node_modules/axios/lib/helpers/spread.js\");\n\nmodule.exports = axios;\n\n// Allow use of default import syntax in TypeScript\nmodule.exports.default = axios;\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/axios.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * A `Cancel` is an object that is thrown when an operation is canceled.\n *\n * @class\n * @param {string=} message The message.\n */\nfunction Cancel(message) {\n  this.message = message;\n}\n\nCancel.prototype.toString = function toString() {\n  return 'Cancel' + (this.message ? ': ' + this.message : '');\n};\n\nCancel.prototype.__CANCEL__ = true;\n\nmodule.exports = Cancel;\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/cancel/Cancel.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar Cancel = __webpack_require__(/*! ./Cancel */ \"./node_modules/axios/lib/cancel/Cancel.js\");\n\n/**\n * A `CancelToken` is an object that can be used to request cancellation of an operation.\n *\n * @class\n * @param {Function} executor The executor function.\n */\nfunction CancelToken(executor) {\n  if (typeof executor !== 'function') {\n    throw new TypeError('executor must be a function.');\n  }\n\n  var resolvePromise;\n  this.promise = new Promise(function promiseExecutor(resolve) {\n    resolvePromise = resolve;\n  });\n\n  var token = this;\n  executor(function cancel(message) {\n    if (token.reason) {\n      // Cancellation has already been requested\n      return;\n    }\n\n    token.reason = new Cancel(message);\n    resolvePromise(token.reason);\n  });\n}\n\n/**\n * Throws a `Cancel` if cancellation has been requested.\n */\nCancelToken.prototype.throwIfRequested = function throwIfRequested() {\n  if (this.reason) {\n    throw this.reason;\n  }\n};\n\n/**\n * Returns an object that contains a new `CancelToken` and a function that, when called,\n * cancels the `CancelToken`.\n */\nCancelToken.source = function source() {\n  var cancel;\n  var token = new CancelToken(function executor(c) {\n    cancel = c;\n  });\n  return {\n    token: token,\n    cancel: cancel\n  };\n};\n\nmodule.exports = CancelToken;\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/cancel/CancelToken.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function isCancel(value) {\n  return !!(value && value.__CANCEL__);\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/cancel/isCancel.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar defaults = __webpack_require__(/*! ./../defaults */ \"./node_modules/axios/lib/defaults.js\");\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ \"./node_modules/axios/lib/core/InterceptorManager.js\");\nvar dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ \"./node_modules/axios/lib/core/dispatchRequest.js\");\n\n/**\n * Create a new instance of Axios\n *\n * @param {Object} instanceConfig The default config for the instance\n */\nfunction Axios(instanceConfig) {\n  this.defaults = instanceConfig;\n  this.interceptors = {\n    request: new InterceptorManager(),\n    response: new InterceptorManager()\n  };\n}\n\n/**\n * Dispatch a request\n *\n * @param {Object} config The config specific for this request (merged with this.defaults)\n */\nAxios.prototype.request = function request(config) {\n  /*eslint no-param-reassign:0*/\n  // Allow for axios('example/url'[, config]) a la fetch API\n  if (typeof config === 'string') {\n    config = utils.merge({\n      url: arguments[0]\n    }, arguments[1]);\n  }\n\n  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);\n  config.method = config.method.toLowerCase();\n\n  // Hook up interceptors middleware\n  var chain = [dispatchRequest, undefined];\n  var promise = Promise.resolve(config);\n\n  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {\n    chain.unshift(interceptor.fulfilled, interceptor.rejected);\n  });\n\n  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {\n    chain.push(interceptor.fulfilled, interceptor.rejected);\n  });\n\n  while (chain.length) {\n    promise = promise.then(chain.shift(), chain.shift());\n  }\n\n  return promise;\n};\n\n// Provide aliases for supported request methods\nutils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {\n  /*eslint func-names:0*/\n  Axios.prototype[method] = function(url, config) {\n    return this.request(utils.merge(config || {}, {\n      method: method,\n      url: url\n    }));\n  };\n});\n\nutils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {\n  /*eslint func-names:0*/\n  Axios.prototype[method] = function(url, data, config) {\n    return this.request(utils.merge(config || {}, {\n      method: method,\n      url: url,\n      data: data\n    }));\n  };\n});\n\nmodule.exports = Axios;\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/Axios.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nfunction InterceptorManager() {\n  this.handlers = [];\n}\n\n/**\n * Add a new interceptor to the stack\n *\n * @param {Function} fulfilled The function to handle `then` for a `Promise`\n * @param {Function} rejected The function to handle `reject` for a `Promise`\n *\n * @return {Number} An ID used to remove interceptor later\n */\nInterceptorManager.prototype.use = function use(fulfilled, rejected) {\n  this.handlers.push({\n    fulfilled: fulfilled,\n    rejected: rejected\n  });\n  return this.handlers.length - 1;\n};\n\n/**\n * Remove an interceptor from the stack\n *\n * @param {Number} id The ID that was returned by `use`\n */\nInterceptorManager.prototype.eject = function eject(id) {\n  if (this.handlers[id]) {\n    this.handlers[id] = null;\n  }\n};\n\n/**\n * Iterate over all the registered interceptors\n *\n * This method is particularly useful for skipping over any\n * interceptors that may have become `null` calling `eject`.\n *\n * @param {Function} fn The function to call for each interceptor\n */\nInterceptorManager.prototype.forEach = function forEach(fn) {\n  utils.forEach(this.handlers, function forEachHandler(h) {\n    if (h !== null) {\n      fn(h);\n    }\n  });\n};\n\nmodule.exports = InterceptorManager;\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/InterceptorManager.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar enhanceError = __webpack_require__(/*! ./enhanceError */ \"./node_modules/axios/lib/core/enhanceError.js\");\n\n/**\n * Create an Error with the specified message, config, error code, request and response.\n *\n * @param {string} message The error message.\n * @param {Object} config The config.\n * @param {string} [code] The error code (for example, 'ECONNABORTED').\n * @param {Object} [request] The request.\n * @param {Object} [response] The response.\n * @returns {Error} The created error.\n */\nmodule.exports = function createError(message, config, code, request, response) {\n  var error = new Error(message);\n  return enhanceError(error, config, code, request, response);\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/createError.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar transformData = __webpack_require__(/*! ./transformData */ \"./node_modules/axios/lib/core/transformData.js\");\nvar isCancel = __webpack_require__(/*! ../cancel/isCancel */ \"./node_modules/axios/lib/cancel/isCancel.js\");\nvar defaults = __webpack_require__(/*! ../defaults */ \"./node_modules/axios/lib/defaults.js\");\nvar isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ \"./node_modules/axios/lib/helpers/isAbsoluteURL.js\");\nvar combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ \"./node_modules/axios/lib/helpers/combineURLs.js\");\n\n/**\n * Throws a `Cancel` if cancellation has been requested.\n */\nfunction throwIfCancellationRequested(config) {\n  if (config.cancelToken) {\n    config.cancelToken.throwIfRequested();\n  }\n}\n\n/**\n * Dispatch a request to the server using the configured adapter.\n *\n * @param {object} config The config that is to be used for the request\n * @returns {Promise} The Promise to be fulfilled\n */\nmodule.exports = function dispatchRequest(config) {\n  throwIfCancellationRequested(config);\n\n  // Support baseURL config\n  if (config.baseURL && !isAbsoluteURL(config.url)) {\n    config.url = combineURLs(config.baseURL, config.url);\n  }\n\n  // Ensure headers exist\n  config.headers = config.headers || {};\n\n  // Transform request data\n  config.data = transformData(\n    config.data,\n    config.headers,\n    config.transformRequest\n  );\n\n  // Flatten headers\n  config.headers = utils.merge(\n    config.headers.common || {},\n    config.headers[config.method] || {},\n    config.headers || {}\n  );\n\n  utils.forEach(\n    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],\n    function cleanHeaderConfig(method) {\n      delete config.headers[method];\n    }\n  );\n\n  var adapter = config.adapter || defaults.adapter;\n\n  return adapter(config).then(function onAdapterResolution(response) {\n    throwIfCancellationRequested(config);\n\n    // Transform response data\n    response.data = transformData(\n      response.data,\n      response.headers,\n      config.transformResponse\n    );\n\n    return response;\n  }, function onAdapterRejection(reason) {\n    if (!isCancel(reason)) {\n      throwIfCancellationRequested(config);\n\n      // Transform response data\n      if (reason && reason.response) {\n        reason.response.data = transformData(\n          reason.response.data,\n          reason.response.headers,\n          config.transformResponse\n        );\n      }\n    }\n\n    return Promise.reject(reason);\n  });\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/dispatchRequest.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Update an Error with the specified config, error code, and response.\n *\n * @param {Error} error The error to update.\n * @param {Object} config The config.\n * @param {string} [code] The error code (for example, 'ECONNABORTED').\n * @param {Object} [request] The request.\n * @param {Object} [response] The response.\n * @returns {Error} The error.\n */\nmodule.exports = function enhanceError(error, config, code, request, response) {\n  error.config = config;\n  if (code) {\n    error.code = code;\n  }\n  error.request = request;\n  error.response = response;\n  return error;\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/enhanceError.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar createError = __webpack_require__(/*! ./createError */ \"./node_modules/axios/lib/core/createError.js\");\n\n/**\n * Resolve or reject a Promise based on response status.\n *\n * @param {Function} resolve A function that resolves the promise.\n * @param {Function} reject A function that rejects the promise.\n * @param {object} response The response.\n */\nmodule.exports = function settle(resolve, reject, response) {\n  var validateStatus = response.config.validateStatus;\n  // Note: status is not exposed by XDomainRequest\n  if (!response.status || !validateStatus || validateStatus(response.status)) {\n    resolve(response);\n  } else {\n    reject(createError(\n      'Request failed with status code ' + response.status,\n      response.config,\n      null,\n      response.request,\n      response\n    ));\n  }\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/settle.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\n/**\n * Transform the data for a request or a response\n *\n * @param {Object|String} data The data to be transformed\n * @param {Array} headers The headers for the request or response\n * @param {Array|Function} fns A single function or Array of functions\n * @returns {*} The resulting transformed data\n */\nmodule.exports = function transformData(data, headers, fns) {\n  /*eslint no-param-reassign:0*/\n  utils.forEach(fns, function transform(fn) {\n    data = fn(data, headers);\n  });\n\n  return data;\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/transformData.js?");

/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(process) {\n\nvar utils = __webpack_require__(/*! ./utils */ \"./node_modules/axios/lib/utils.js\");\nvar normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ \"./node_modules/axios/lib/helpers/normalizeHeaderName.js\");\n\nvar DEFAULT_CONTENT_TYPE = {\n  'Content-Type': 'application/x-www-form-urlencoded'\n};\n\nfunction setContentTypeIfUnset(headers, value) {\n  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {\n    headers['Content-Type'] = value;\n  }\n}\n\nfunction getDefaultAdapter() {\n  var adapter;\n  if (typeof XMLHttpRequest !== 'undefined') {\n    // For browsers use XHR adapter\n    adapter = __webpack_require__(/*! ./adapters/xhr */ \"./node_modules/axios/lib/adapters/xhr.js\");\n  } else if (typeof process !== 'undefined') {\n    // For node use HTTP adapter\n    adapter = __webpack_require__(/*! ./adapters/http */ \"./node_modules/axios/lib/adapters/xhr.js\");\n  }\n  return adapter;\n}\n\nvar defaults = {\n  adapter: getDefaultAdapter(),\n\n  transformRequest: [function transformRequest(data, headers) {\n    normalizeHeaderName(headers, 'Content-Type');\n    if (utils.isFormData(data) ||\n      utils.isArrayBuffer(data) ||\n      utils.isBuffer(data) ||\n      utils.isStream(data) ||\n      utils.isFile(data) ||\n      utils.isBlob(data)\n    ) {\n      return data;\n    }\n    if (utils.isArrayBufferView(data)) {\n      return data.buffer;\n    }\n    if (utils.isURLSearchParams(data)) {\n      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');\n      return data.toString();\n    }\n    if (utils.isObject(data)) {\n      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');\n      return JSON.stringify(data);\n    }\n    return data;\n  }],\n\n  transformResponse: [function transformResponse(data) {\n    /*eslint no-param-reassign:0*/\n    if (typeof data === 'string') {\n      try {\n        data = JSON.parse(data);\n      } catch (e) { /* Ignore */ }\n    }\n    return data;\n  }],\n\n  /**\n   * A timeout in milliseconds to abort a request. If set to 0 (default) a\n   * timeout is not created.\n   */\n  timeout: 0,\n\n  xsrfCookieName: 'XSRF-TOKEN',\n  xsrfHeaderName: 'X-XSRF-TOKEN',\n\n  maxContentLength: -1,\n\n  validateStatus: function validateStatus(status) {\n    return status >= 200 && status < 300;\n  }\n};\n\ndefaults.headers = {\n  common: {\n    'Accept': 'application/json, text/plain, */*'\n  }\n};\n\nutils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {\n  defaults.headers[method] = {};\n});\n\nutils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {\n  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);\n});\n\nmodule.exports = defaults;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ \"./node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///./node_modules/axios/lib/defaults.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function bind(fn, thisArg) {\n  return function wrap() {\n    var args = new Array(arguments.length);\n    for (var i = 0; i < args.length; i++) {\n      args[i] = arguments[i];\n    }\n    return fn.apply(thisArg, args);\n  };\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/bind.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/btoa.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/btoa.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js\n\nvar chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';\n\nfunction E() {\n  this.message = 'String contains an invalid character';\n}\nE.prototype = new Error;\nE.prototype.code = 5;\nE.prototype.name = 'InvalidCharacterError';\n\nfunction btoa(input) {\n  var str = String(input);\n  var output = '';\n  for (\n    // initialize result and counter\n    var block, charCode, idx = 0, map = chars;\n    // if the next str index does not exist:\n    //   change the mapping table to \"=\"\n    //   check if d has no fractional digits\n    str.charAt(idx | 0) || (map = '=', idx % 1);\n    // \"8 - idx % 1 * 8\" generates the sequence 2, 4, 6, 8\n    output += map.charAt(63 & block >> 8 - idx % 1 * 8)\n  ) {\n    charCode = str.charCodeAt(idx += 3 / 4);\n    if (charCode > 0xFF) {\n      throw new E();\n    }\n    block = block << 8 | charCode;\n  }\n  return output;\n}\n\nmodule.exports = btoa;\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/btoa.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nfunction encode(val) {\n  return encodeURIComponent(val).\n    replace(/%40/gi, '@').\n    replace(/%3A/gi, ':').\n    replace(/%24/g, '$').\n    replace(/%2C/gi, ',').\n    replace(/%20/g, '+').\n    replace(/%5B/gi, '[').\n    replace(/%5D/gi, ']');\n}\n\n/**\n * Build a URL by appending params to the end\n *\n * @param {string} url The base of the url (e.g., http://www.google.com)\n * @param {object} [params] The params to be appended\n * @returns {string} The formatted url\n */\nmodule.exports = function buildURL(url, params, paramsSerializer) {\n  /*eslint no-param-reassign:0*/\n  if (!params) {\n    return url;\n  }\n\n  var serializedParams;\n  if (paramsSerializer) {\n    serializedParams = paramsSerializer(params);\n  } else if (utils.isURLSearchParams(params)) {\n    serializedParams = params.toString();\n  } else {\n    var parts = [];\n\n    utils.forEach(params, function serialize(val, key) {\n      if (val === null || typeof val === 'undefined') {\n        return;\n      }\n\n      if (utils.isArray(val)) {\n        key = key + '[]';\n      } else {\n        val = [val];\n      }\n\n      utils.forEach(val, function parseValue(v) {\n        if (utils.isDate(v)) {\n          v = v.toISOString();\n        } else if (utils.isObject(v)) {\n          v = JSON.stringify(v);\n        }\n        parts.push(encode(key) + '=' + encode(v));\n      });\n    });\n\n    serializedParams = parts.join('&');\n  }\n\n  if (serializedParams) {\n    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;\n  }\n\n  return url;\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/buildURL.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Creates a new URL by combining the specified URLs\n *\n * @param {string} baseURL The base URL\n * @param {string} relativeURL The relative URL\n * @returns {string} The combined URL\n */\nmodule.exports = function combineURLs(baseURL, relativeURL) {\n  return relativeURL\n    ? baseURL.replace(/\\/+$/, '') + '/' + relativeURL.replace(/^\\/+/, '')\n    : baseURL;\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/combineURLs.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = (\n  utils.isStandardBrowserEnv() ?\n\n  // Standard browser envs support document.cookie\n  (function standardBrowserEnv() {\n    return {\n      write: function write(name, value, expires, path, domain, secure) {\n        var cookie = [];\n        cookie.push(name + '=' + encodeURIComponent(value));\n\n        if (utils.isNumber(expires)) {\n          cookie.push('expires=' + new Date(expires).toGMTString());\n        }\n\n        if (utils.isString(path)) {\n          cookie.push('path=' + path);\n        }\n\n        if (utils.isString(domain)) {\n          cookie.push('domain=' + domain);\n        }\n\n        if (secure === true) {\n          cookie.push('secure');\n        }\n\n        document.cookie = cookie.join('; ');\n      },\n\n      read: function read(name) {\n        var match = document.cookie.match(new RegExp('(^|;\\\\s*)(' + name + ')=([^;]*)'));\n        return (match ? decodeURIComponent(match[3]) : null);\n      },\n\n      remove: function remove(name) {\n        this.write(name, '', Date.now() - 86400000);\n      }\n    };\n  })() :\n\n  // Non standard browser env (web workers, react-native) lack needed support.\n  (function nonStandardBrowserEnv() {\n    return {\n      write: function write() {},\n      read: function read() { return null; },\n      remove: function remove() {}\n    };\n  })()\n);\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/cookies.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Determines whether the specified URL is absolute\n *\n * @param {string} url The URL to test\n * @returns {boolean} True if the specified URL is absolute, otherwise false\n */\nmodule.exports = function isAbsoluteURL(url) {\n  // A URL is considered absolute if it begins with \"<scheme>://\" or \"//\" (protocol-relative URL).\n  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed\n  // by any combination of letters, digits, plus, period, or hyphen.\n  return /^([a-z][a-z\\d\\+\\-\\.]*:)?\\/\\//i.test(url);\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/isAbsoluteURL.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = (\n  utils.isStandardBrowserEnv() ?\n\n  // Standard browser envs have full support of the APIs needed to test\n  // whether the request URL is of the same origin as current location.\n  (function standardBrowserEnv() {\n    var msie = /(msie|trident)/i.test(navigator.userAgent);\n    var urlParsingNode = document.createElement('a');\n    var originURL;\n\n    /**\n    * Parse a URL to discover it's components\n    *\n    * @param {String} url The URL to be parsed\n    * @returns {Object}\n    */\n    function resolveURL(url) {\n      var href = url;\n\n      if (msie) {\n        // IE needs attribute set twice to normalize properties\n        urlParsingNode.setAttribute('href', href);\n        href = urlParsingNode.href;\n      }\n\n      urlParsingNode.setAttribute('href', href);\n\n      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils\n      return {\n        href: urlParsingNode.href,\n        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',\n        host: urlParsingNode.host,\n        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\\?/, '') : '',\n        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',\n        hostname: urlParsingNode.hostname,\n        port: urlParsingNode.port,\n        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?\n                  urlParsingNode.pathname :\n                  '/' + urlParsingNode.pathname\n      };\n    }\n\n    originURL = resolveURL(window.location.href);\n\n    /**\n    * Determine if a URL shares the same origin as the current location\n    *\n    * @param {String} requestURL The URL to test\n    * @returns {boolean} True if URL shares the same origin, otherwise false\n    */\n    return function isURLSameOrigin(requestURL) {\n      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;\n      return (parsed.protocol === originURL.protocol &&\n            parsed.host === originURL.host);\n    };\n  })() :\n\n  // Non standard browser envs (web workers, react-native) lack needed support.\n  (function nonStandardBrowserEnv() {\n    return function isURLSameOrigin() {\n      return true;\n    };\n  })()\n);\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/isURLSameOrigin.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = function normalizeHeaderName(headers, normalizedName) {\n  utils.forEach(headers, function processHeader(value, name) {\n    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {\n      headers[normalizedName] = value;\n      delete headers[name];\n    }\n  });\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/normalizeHeaderName.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\n// Headers whose duplicates are ignored by node\n// c.f. https://nodejs.org/api/http.html#http_message_headers\nvar ignoreDuplicateOf = [\n  'age', 'authorization', 'content-length', 'content-type', 'etag',\n  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',\n  'last-modified', 'location', 'max-forwards', 'proxy-authorization',\n  'referer', 'retry-after', 'user-agent'\n];\n\n/**\n * Parse headers into an object\n *\n * ```\n * Date: Wed, 27 Aug 2014 08:58:49 GMT\n * Content-Type: application/json\n * Connection: keep-alive\n * Transfer-Encoding: chunked\n * ```\n *\n * @param {String} headers Headers needing to be parsed\n * @returns {Object} Headers parsed into an object\n */\nmodule.exports = function parseHeaders(headers) {\n  var parsed = {};\n  var key;\n  var val;\n  var i;\n\n  if (!headers) { return parsed; }\n\n  utils.forEach(headers.split('\\n'), function parser(line) {\n    i = line.indexOf(':');\n    key = utils.trim(line.substr(0, i)).toLowerCase();\n    val = utils.trim(line.substr(i + 1));\n\n    if (key) {\n      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {\n        return;\n      }\n      if (key === 'set-cookie') {\n        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);\n      } else {\n        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;\n      }\n    }\n  });\n\n  return parsed;\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/parseHeaders.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Syntactic sugar for invoking a function and expanding an array for arguments.\n *\n * Common use case would be to use `Function.prototype.apply`.\n *\n *  ```js\n *  function f(x, y, z) {}\n *  var args = [1, 2, 3];\n *  f.apply(null, args);\n *  ```\n *\n * With `spread` this example can be re-written.\n *\n *  ```js\n *  spread(function(x, y, z) {})([1, 2, 3]);\n *  ```\n *\n * @param {Function} callback\n * @returns {Function}\n */\nmodule.exports = function spread(callback) {\n  return function wrap(arr) {\n    return callback.apply(null, arr);\n  };\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/spread.js?");

/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar bind = __webpack_require__(/*! ./helpers/bind */ \"./node_modules/axios/lib/helpers/bind.js\");\nvar isBuffer = __webpack_require__(/*! is-buffer */ \"./node_modules/is-buffer/index.js\");\n\n/*global toString:true*/\n\n// utils is a library of generic helper functions non-specific to axios\n\nvar toString = Object.prototype.toString;\n\n/**\n * Determine if a value is an Array\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an Array, otherwise false\n */\nfunction isArray(val) {\n  return toString.call(val) === '[object Array]';\n}\n\n/**\n * Determine if a value is an ArrayBuffer\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an ArrayBuffer, otherwise false\n */\nfunction isArrayBuffer(val) {\n  return toString.call(val) === '[object ArrayBuffer]';\n}\n\n/**\n * Determine if a value is a FormData\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an FormData, otherwise false\n */\nfunction isFormData(val) {\n  return (typeof FormData !== 'undefined') && (val instanceof FormData);\n}\n\n/**\n * Determine if a value is a view on an ArrayBuffer\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false\n */\nfunction isArrayBufferView(val) {\n  var result;\n  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {\n    result = ArrayBuffer.isView(val);\n  } else {\n    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);\n  }\n  return result;\n}\n\n/**\n * Determine if a value is a String\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a String, otherwise false\n */\nfunction isString(val) {\n  return typeof val === 'string';\n}\n\n/**\n * Determine if a value is a Number\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Number, otherwise false\n */\nfunction isNumber(val) {\n  return typeof val === 'number';\n}\n\n/**\n * Determine if a value is undefined\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if the value is undefined, otherwise false\n */\nfunction isUndefined(val) {\n  return typeof val === 'undefined';\n}\n\n/**\n * Determine if a value is an Object\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an Object, otherwise false\n */\nfunction isObject(val) {\n  return val !== null && typeof val === 'object';\n}\n\n/**\n * Determine if a value is a Date\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Date, otherwise false\n */\nfunction isDate(val) {\n  return toString.call(val) === '[object Date]';\n}\n\n/**\n * Determine if a value is a File\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a File, otherwise false\n */\nfunction isFile(val) {\n  return toString.call(val) === '[object File]';\n}\n\n/**\n * Determine if a value is a Blob\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Blob, otherwise false\n */\nfunction isBlob(val) {\n  return toString.call(val) === '[object Blob]';\n}\n\n/**\n * Determine if a value is a Function\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Function, otherwise false\n */\nfunction isFunction(val) {\n  return toString.call(val) === '[object Function]';\n}\n\n/**\n * Determine if a value is a Stream\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Stream, otherwise false\n */\nfunction isStream(val) {\n  return isObject(val) && isFunction(val.pipe);\n}\n\n/**\n * Determine if a value is a URLSearchParams object\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a URLSearchParams object, otherwise false\n */\nfunction isURLSearchParams(val) {\n  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;\n}\n\n/**\n * Trim excess whitespace off the beginning and end of a string\n *\n * @param {String} str The String to trim\n * @returns {String} The String freed of excess whitespace\n */\nfunction trim(str) {\n  return str.replace(/^\\s*/, '').replace(/\\s*$/, '');\n}\n\n/**\n * Determine if we're running in a standard browser environment\n *\n * This allows axios to run in a web worker, and react-native.\n * Both environments support XMLHttpRequest, but not fully standard globals.\n *\n * web workers:\n *  typeof window -> undefined\n *  typeof document -> undefined\n *\n * react-native:\n *  navigator.product -> 'ReactNative'\n */\nfunction isStandardBrowserEnv() {\n  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {\n    return false;\n  }\n  return (\n    typeof window !== 'undefined' &&\n    typeof document !== 'undefined'\n  );\n}\n\n/**\n * Iterate over an Array or an Object invoking a function for each item.\n *\n * If `obj` is an Array callback will be called passing\n * the value, index, and complete array for each item.\n *\n * If 'obj' is an Object callback will be called passing\n * the value, key, and complete object for each property.\n *\n * @param {Object|Array} obj The object to iterate\n * @param {Function} fn The callback to invoke for each item\n */\nfunction forEach(obj, fn) {\n  // Don't bother if no value provided\n  if (obj === null || typeof obj === 'undefined') {\n    return;\n  }\n\n  // Force an array if not already something iterable\n  if (typeof obj !== 'object') {\n    /*eslint no-param-reassign:0*/\n    obj = [obj];\n  }\n\n  if (isArray(obj)) {\n    // Iterate over array values\n    for (var i = 0, l = obj.length; i < l; i++) {\n      fn.call(null, obj[i], i, obj);\n    }\n  } else {\n    // Iterate over object keys\n    for (var key in obj) {\n      if (Object.prototype.hasOwnProperty.call(obj, key)) {\n        fn.call(null, obj[key], key, obj);\n      }\n    }\n  }\n}\n\n/**\n * Accepts varargs expecting each argument to be an object, then\n * immutably merges the properties of each object and returns result.\n *\n * When multiple objects contain the same key the later object in\n * the arguments list will take precedence.\n *\n * Example:\n *\n * ```js\n * var result = merge({foo: 123}, {foo: 456});\n * console.log(result.foo); // outputs 456\n * ```\n *\n * @param {Object} obj1 Object to merge\n * @returns {Object} Result of all merge properties\n */\nfunction merge(/* obj1, obj2, obj3, ... */) {\n  var result = {};\n  function assignValue(val, key) {\n    if (typeof result[key] === 'object' && typeof val === 'object') {\n      result[key] = merge(result[key], val);\n    } else {\n      result[key] = val;\n    }\n  }\n\n  for (var i = 0, l = arguments.length; i < l; i++) {\n    forEach(arguments[i], assignValue);\n  }\n  return result;\n}\n\n/**\n * Extends object a by mutably adding to it the properties of object b.\n *\n * @param {Object} a The object to be extended\n * @param {Object} b The object to copy properties from\n * @param {Object} thisArg The object to bind function to\n * @return {Object} The resulting value of object a\n */\nfunction extend(a, b, thisArg) {\n  forEach(b, function assignValue(val, key) {\n    if (thisArg && typeof val === 'function') {\n      a[key] = bind(val, thisArg);\n    } else {\n      a[key] = val;\n    }\n  });\n  return a;\n}\n\nmodule.exports = {\n  isArray: isArray,\n  isArrayBuffer: isArrayBuffer,\n  isBuffer: isBuffer,\n  isFormData: isFormData,\n  isArrayBufferView: isArrayBufferView,\n  isString: isString,\n  isNumber: isNumber,\n  isObject: isObject,\n  isUndefined: isUndefined,\n  isDate: isDate,\n  isFile: isFile,\n  isBlob: isBlob,\n  isFunction: isFunction,\n  isStream: isStream,\n  isURLSearchParams: isURLSearchParams,\n  isStandardBrowserEnv: isStandardBrowserEnv,\n  forEach: forEach,\n  merge: merge,\n  extend: extend,\n  trim: trim\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/utils.js?");

/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*!\n * Determine if an object is a Buffer\n *\n * @author   Feross Aboukhadijeh <https://feross.org>\n * @license  MIT\n */\n\n// The _isBuffer check is for Safari 5-7 support, because it's missing\n// Object.prototype.constructor. Remove this eventually\nmodule.exports = function (obj) {\n  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)\n}\n\nfunction isBuffer (obj) {\n  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)\n}\n\n// For Node v0.10 support. Remove this eventually.\nfunction isSlowBuffer (obj) {\n  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))\n}\n\n\n//# sourceURL=webpack:///./node_modules/is-buffer/index.js?");

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) { return [] }\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n\n//# sourceURL=webpack:///./node_modules/process/browser.js?");

/***/ }),

/***/ "./src/collisions.js":
/*!***************************!*\
  !*** ./src/collisions.js ***!
  \***************************/
/*! exports provided: bestLaserCollision, samePoint, lineCircleCollision, lineLineCollision */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"bestLaserCollision\", function() { return bestLaserCollision; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"samePoint\", function() { return samePoint; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"lineCircleCollision\", function() { return lineCircleCollision; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"lineLineCollision\", function() { return lineLineCollision; });\n/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vector */ \"./src/vector.js\");\n\nvar bestLaserCollision = function bestLaserCollision(laser) {\n  var min = 10;\n  var min_edge = null;\n\n  for (var i = 0; i < (arguments.length <= 1 ? 0 : arguments.length - 1); i++) {\n    var edge = i + 1 < 1 || arguments.length <= i + 1 ? undefined : arguments[i + 1];\n    var t = lineLineCollision(laser, edge);\n\n    if (typeof t === \"number\" && t < min) {\n      min = t;\n      min_edge = edge;\n    }\n  }\n\n  return [min, min_edge];\n};\nvar samePoint = function samePoint(p1, p2) {\n  return p1.x === p2.x && p1.y === p2.y;\n}; //https://stackoverflow.com/questions/1073336/circle-line-segment-collision-detection-algorithm\n\nvar lineCircleCollision = function lineCircleCollision(line, center, radius) {\n  var lineVec = line.vectorize();\n  var startToCenter = new _vector__WEBPACK_IMPORTED_MODULE_0__[\"default\"](center, line.p);\n  var a = lineVec.dot(lineVec);\n  var b = 2 * startToCenter.dot(lineVec);\n  var c = startToCenter.dot(startToCenter) - radius * radius;\n  var discrim = b * b - 4 * a * c;\n\n  if (discrim > 0) {\n    discrim = Math.sqrt(discrim);\n    var t1 = (-b - discrim) / (2 * a);\n    var t2 = (-b + discrim) / (2 * a);\n\n    if (t1 >= 0 && t1 <= 1) {\n      return true;\n    } else if (t2 >= 0 && t2 <= 1) {\n      return true;\n    } else {\n      return false;\n    }\n  }\n\n  return false;\n}; //https://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect\n\nvar lineLineCollision = function lineLineCollision(line1, line2) {\n  var r = new _vector__WEBPACK_IMPORTED_MODULE_0__[\"default\"](line1.q, line1.p);\n  var s = new _vector__WEBPACK_IMPORTED_MODULE_0__[\"default\"](line2.q, line2.p);\n  var startVec = new _vector__WEBPACK_IMPORTED_MODULE_0__[\"default\"](line2.p, line1.p);\n  var num = startVec.cross(r);\n  var denom = r.cross(s);\n\n  if (num === 0 && denom === 0) {\n    if (samePoint(line1.p, line2.p) || samePoint(line1.p, line2.q) || samePoint(line1.q, line2.p) || samePoint(line1.q, line2.q)) {\n      //lines literally start or end at same point\n      return 0.1;\n    } else {\n      if (line1.p.x - line2.p.x < 0 && line1.p.x - line2.q.x < 0 && line1.q.x - line2.p.x < 0 && line1.q.x - line2.q.x < 0 || line1.p.y - line2.p.y < 0 && line1.p.y - line2.q.y < 0 && line1.q.y - line2.p.y < 0 && line1.q.y - line2.q.y < 0) {\n        //Do lines overlap?\n        return 0.1;\n      }\n    }\n  } else if (denom === 0) {\n    //parallel\n    return false;\n  } else {\n    var u = num / denom;\n    var t = startVec.cross(s) / denom;\n\n    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {\n      return t;\n    } else {\n      return false;\n    }\n  }\n};\n\n//# sourceURL=webpack:///./src/collisions.js?");

/***/ }),

/***/ "./src/cursor.js":
/*!***********************!*\
  !*** ./src/cursor.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Cursor =\n/*#__PURE__*/\nfunction () {\n  function Cursor() {\n    _classCallCheck(this, Cursor);\n\n    this.pos = {\n      x: 0,\n      y: 0\n    };\n    this.size = 10;\n  }\n\n  _createClass(Cursor, [{\n    key: \"updatePos\",\n    value: function updatePos(x, y) {\n      this.pos = {\n        x: x,\n        y: y\n      };\n    }\n  }, {\n    key: \"draw\",\n    value: function draw(ctx) {\n      ctx.save();\n      ctx.strokeStyle = \"white\";\n      ctx.translate(this.pos.x, this.pos.y);\n      ctx.beginPath();\n      ctx.lineTo(0, -this.size);\n      ctx.lineTo(0, 0);\n      ctx.lineTo(0, this.size);\n      ctx.lineTo(0, 0);\n      ctx.lineTo(-this.size, 0);\n      ctx.lineTo(0, 0);\n      ctx.lineTo(this.size, 0);\n      ctx.stroke();\n      ctx.restore();\n    }\n  }]);\n\n  return Cursor;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Cursor);\n\n//# sourceURL=webpack:///./src/cursor.js?");

/***/ }),

/***/ "./src/enemy.js":
/*!**********************!*\
  !*** ./src/enemy.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _moving_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moving-object */ \"./src/moving-object.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n/* harmony import */ var _collisions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./collisions */ \"./src/collisions.js\");\n/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./vector */ \"./src/vector.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\n\n\nvar Enemy =\n/*#__PURE__*/\nfunction (_MovingObject) {\n  _inherits(Enemy, _MovingObject);\n\n  function Enemy(id, pos, vel, direc) {\n    var _this;\n\n    _classCallCheck(this, Enemy);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(Enemy).call(this, pos, vel, direc));\n    _this.id = id;\n    _this.radius = 10;\n    setInterval(function () {\n      return _this.vel += 0.5;\n    }, 5000);\n    return _this;\n  }\n\n  _createClass(Enemy, [{\n    key: \"is_collided\",\n    value: function is_collided(collider) {\n      if (Object(_collisions__WEBPACK_IMPORTED_MODULE_2__[\"lineCircleCollision\"])(collider, this.pos, this.radius)) return true;\n      return false;\n    }\n  }, {\n    key: \"reroute\",\n    value: function reroute(collidedEdge, playerPos, ctx) {\n      var vec1 = collidedEdge.vectorize().normalize();\n      var vec2 = new _vector__WEBPACK_IMPORTED_MODULE_3__[\"default\"](collidedEdge.q, collidedEdge.p).normalize();\n      var pos1 = {\n        x: this.pos.x + vec1.x,\n        y: this.pos.y + vec1.y\n      };\n      var pos2 = {\n        x: this.pos.x + vec2.x,\n        y: this.pos.y + vec2.y\n      };\n      if (Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"calculateDistance\"])(pos1, playerPos) > Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"calculateDistance\"])(pos2, playerPos)) this.pos = pos2;else {\n        this.pos = pos1;\n      }\n    }\n  }, {\n    key: \"draw\",\n    value: function draw(ctx) {\n      ctx.beginPath();\n      ctx.fillStyle = \"#11e023\";\n      ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);\n      ctx.fill();\n    }\n  }]);\n\n  return Enemy;\n}(_moving_object__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Enemy);\n\n//# sourceURL=webpack:///./src/enemy.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n/* harmony import */ var _collisions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./collisions */ \"./src/collisions.js\");\n/* harmony import */ var _line__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./line */ \"./src/line.js\");\n/* harmony import */ var _cursor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cursor */ \"./src/cursor.js\");\n/* harmony import */ var _laser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./laser */ \"./src/laser.js\");\n/* harmony import */ var _intervals__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./intervals */ \"./src/intervals.js\");\n/* harmony import */ var _inputs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./inputs */ \"./src/inputs.js\");\n/* harmony import */ var _obstacle__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./obstacle */ \"./src/obstacle.js\");\n/* harmony import */ var _particles_explosions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./particles/explosions */ \"./src/particles/explosions.js\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\n\n\n\n\n\n\n\n\n\nvar Game =\n/*#__PURE__*/\nfunction () {\n  function Game(canvas, ctx, finishOverlay, scoreOverlay, sounds, muted) {\n    _classCallCheck(this, Game);\n\n    this.finishOverlay = finishOverlay;\n    this.scoreOverlay = scoreOverlay;\n    this.canvas = canvas;\n    this.ctx = ctx;\n    this.sounds = sounds;\n    this.is_muted = muted;\n    this.dims = [canvas.width, canvas.height];\n    this.edges = [new _line__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\n      x: 0,\n      y: 0\n    }, {\n      x: canvas.width,\n      y: 0\n    }), new _line__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\n      x: 0,\n      y: 0\n    }, {\n      x: 0,\n      y: canvas.width\n    }), new _line__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\n      x: canvas.width,\n      y: 0\n    }, {\n      x: canvas.width,\n      y: canvas.height\n    }), new _line__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\n      x: 0,\n      y: canvas.height\n    }, {\n      x: canvas.width,\n      y: canvas.height\n    })];\n    this.player = new _player__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n      x: canvas.width / 2,\n      y: canvas.height / 2\n    }, 0, 0);\n    this.cursor = new _cursor__WEBPACK_IMPORTED_MODULE_4__[\"default\"]();\n    this.score = 0;\n    this.displayScore = 0;\n    this.laser = null;\n    this.enemySpeed = 1;\n    this.entities = [this.player];\n    this.obstacles = [new _obstacle__WEBPACK_IMPORTED_MODULE_8__[\"default\"]({\n      x: this.canvas.width / 4,\n      y: this.canvas.height / 4\n    }), new _obstacle__WEBPACK_IMPORTED_MODULE_8__[\"default\"]({\n      x: 3 * this.canvas.width / 4,\n      y: this.canvas.height / 4\n    }), new _obstacle__WEBPACK_IMPORTED_MODULE_8__[\"default\"]({\n      x: this.canvas.width / 4,\n      y: 3 * this.canvas.height / 4\n    }), new _obstacle__WEBPACK_IMPORTED_MODULE_8__[\"default\"]({\n      x: 3 * this.canvas.width / 4,\n      y: 3 * this.canvas.height / 4\n    })];\n    this.particles = [];\n    this.keys = {};\n  }\n\n  _createClass(Game, [{\n    key: \"start\",\n    value: function start() {\n      this.intervals = _intervals__WEBPACK_IMPORTED_MODULE_6__[\"default\"].bind(this)();\n      _inputs__WEBPACK_IMPORTED_MODULE_7__[\"default\"].bind(this)();\n    }\n  }, {\n    key: \"mute\",\n    value: function mute() {\n      this.is_muted = true;\n    }\n  }, {\n    key: \"unmute\",\n    value: function unmute() {\n      this.is_muted = false;\n    }\n  }, {\n    key: \"gameOver\",\n    value: function gameOver() {\n      this.intervals.forEach(function (interval) {\n        return clearInterval(interval);\n      });\n      this.canvas.className = \"inactive\";\n      this.finishOverlay.className = \"overlay game-over\";\n      var scoreSpan = document.getElementById('score');\n      scoreSpan.innerHTML = \"\";\n      var score = document.createTextNode(\"Your Score was: \".concat(this.score));\n      scoreSpan.appendChild(score);\n    }\n  }, {\n    key: \"check_collisions\",\n    value: function check_collisions() {\n      var _this = this;\n\n      var edges = _utils__WEBPACK_IMPORTED_MODULE_1__[\"aggregateEdges\"].apply(void 0, [this.player].concat(_toConsumableArray(this.obstacles)));\n      var t, edge;\n\n      if (this.laser && this.laser.is_collidable()) {\n        var laser = this.laser.vecs[this.laser.vecs.length - 1];\n\n        var _bestLaserCollision = _collisions__WEBPACK_IMPORTED_MODULE_2__[\"bestLaserCollision\"].apply(void 0, [laser].concat(_toConsumableArray(this.edges), _toConsumableArray(edges)));\n\n        var _bestLaserCollision2 = _slicedToArray(_bestLaserCollision, 2);\n\n        t = _bestLaserCollision2[0];\n        edge = _bestLaserCollision2[1];\n      }\n\n      if (edge) {\n        var _laser = this.laser.grow(t);\n\n        this.particles = this.particles.concat(Object(_particles_explosions__WEBPACK_IMPORTED_MODULE_9__[\"explode\"])(_laser.q, Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"calculateTheta\"])(_laser.p, _laser.q)));\n        this.laser.reflect(_laser, edge);\n      }\n\n      this.entities.slice(1).forEach(function (enemy) {\n        if (_this.laser) {\n          var pos = _this.laser.pos;\n\n          _this.laser.vecs.forEach(function (vector, i) {\n            if (Object(_collisions__WEBPACK_IMPORTED_MODULE_2__[\"lineCircleCollision\"])(vector, enemy.pos, enemy.radius)) {\n              _this.particles = _this.particles.concat(Object(_particles_explosions__WEBPACK_IMPORTED_MODULE_9__[\"explode\"])(enemy.pos));\n              delete _this.entities[_this.entities.indexOf(enemy)];\n              _this.score += 100 * (i + 1);\n            }\n\n            pos = vector;\n          });\n        }\n\n        if (_this.player.is_collided(enemy)) _this.gameOver();\n      });\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this2 = this;\n\n      this.scoreOverlay.innerHTML = \"\".concat(this.displayScore);\n      this.ctx.clearRect(0, 0, this.dims[0], this.dims[1]);\n      if (this.laser) this.laser.draw(this.ctx);\n      this.cursor.draw(this.ctx);\n      this.entities.forEach(function (entity) {\n        return entity.draw(_this2.ctx);\n      });\n      this.obstacles.forEach(function (obstacle) {\n        return obstacle.draw(_this2.ctx);\n      });\n      this.particles.forEach(function (particle) {\n        return particle.draw(_this2.ctx);\n      });\n    }\n  }, {\n    key: \"check_keys\",\n    value: function check_keys() {\n      var _this3 = this;\n\n      if (this.keys.KeyW) this.player.accelerate(-3);else this.player.decelerate();\n\n      if (this.chargeInterval) {\n        if (!this.keys.Space && !this.keys.Mouse) {\n          this.sounds.charge.pause();\n          clearInterval(this.chargeInterval);\n          this.chargeInterval = null;\n\n          if (this.player.charged()) {\n            var theta = Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"calculateTheta\"])(this.player.pos, this.cursor.pos);\n            var offsetVec = Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"calculateVector\"])(theta, -30);\n            this.laser = new _laser__WEBPACK_IMPORTED_MODULE_5__[\"default\"]({\n              x: this.player.pos.x + offsetVec.x,\n              y: this.player.pos.y + offsetVec.y\n            }, theta);\n\n            if (!this.is_muted) {\n              this.sounds.fire.load();\n              this.sounds.fire.play();\n            }\n          }\n\n          this.player.discharge();\n        }\n      } else if (this.keys.Space || this.keys.Mouse) {\n        var chargeTime = 500;\n        var i = 0;\n\n        if (!this.is_muted) {\n          this.sounds.charge.load();\n          this.sounds.charge.play();\n        }\n\n        this.chargeInterval = setInterval(function () {\n          _this3.player.chargeLaser(i / chargeTime);\n\n          i += 10;\n        }, 10);\n      }\n    }\n  }, {\n    key: \"tick\",\n    value: function tick() {\n      var _this4 = this;\n\n      this.check_keys();\n\n      if (this.laser) {\n        this.laser.grow(3);\n        this.laser.fade();\n        if (this.laser.is_finished()) this.laser = null;\n      }\n\n      this.entities.forEach(function (entity) {\n        if (entity === _this4.player) entity.rotate(Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"calculateTheta\"])(_this4.player.pos, _this4.cursor.pos));else entity.rotate(Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"calculateTheta\"])(_this4.player.pos, entity.pos));\n        var edges = _utils__WEBPACK_IMPORTED_MODULE_1__[\"aggregateEdges\"].apply(void 0, _toConsumableArray(_this4.obstacles));\n        var collidedEdges = entity.move(edges);\n\n        if (collidedEdges && entity !== _this4.player) {\n          collidedEdges.forEach(function (edge) {\n            entity.reroute(edge, _this4.player.pos);\n          });\n        }\n      });\n      this.particles.forEach(function (particle) {\n        particle.move();\n        particle.lifecycle();\n        if (particle.finished()) delete _this4.particles[_this4.particles.indexOf(particle)];\n      });\n      this.player.calculateLines();\n      this.check_collisions();\n      this.score++;\n      this.render();\n    }\n  }]);\n\n  return Game;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\nvar axios = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  var canvas = document.getElementById(\"game-canvas\");\n  var background = document.getElementById(\"background-canvas\");\n  drawBackground(background);\n  var ctx = canvas.getContext('2d');\n  var overlays = Array.from(document.getElementsByClassName('overlay'));\n  var gameOver = document.getElementById('game-over');\n  var scoreOverlay = document.getElementById('score-overlay');\n  var scoreBoard = document.getElementById('scoreboard');\n  var scoreButton = document.querySelector('.scoreboard');\n  var highScores = document.getElementById('highscores');\n  var play = Array.from(document.getElementsByClassName('play-button'));\n  var soundButton = document.querySelector(\".top-left\");\n  var audioContext = new AudioContext();\n  var sounds = {};\n  sounds.fire = document.getElementById('fire');\n  sounds.fire.volume = 0.4;\n  sounds.charge = document.getElementById('charge');\n  audioContext.createMediaElementSource(sounds.fire).connect(audioContext.destination);\n  audioContext.createMediaElementSource(sounds.charge).connect(audioContext.destination);\n  var mute = true;\n  var game;\n  play.forEach(function (button) {\n    button.addEventListener(\"click\", function () {\n      game = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas, ctx, gameOver, scoreOverlay, sounds, mute);\n      game.start();\n      overlays.forEach(function (overlay) {\n        return overlay.className = \"overlay hidden\";\n      });\n      canvas.className = \"active\";\n    });\n  });\n  scoreButton.addEventListener(\"click\", function () {\n    axios.get(\"https://trigonometry-scores.herokuapp.com/api/scores\").then(function (scores) {\n      var scoreArray = scores.data;\n      scoreArray.forEach(function (score) {\n        var scoreNode = document.createElement('div');\n        var scoreName = document.createElement('span');\n        scoreName.appendChild(document.createTextNode(score.name));\n        var scoreNum = document.createElement('span');\n        scoreNum.appendChild(document.createTextNode(score.score));\n        scoreNode.appendChild(scoreName);\n        scoreNode.appendChild(scoreNum);\n        highScores.appendChild(scoreNode);\n      });\n    });\n    scoreBoard.classList = \"overlay\";\n    gameOver.classList = \"overlay hidden\";\n  });\n  var muteIcon = document.getElementById(\"mute\");\n  var soundIcon = document.getElementById(\"sound\");\n  document.addEventListener(\"keypress\", function (e) {\n    if (e.key === \"m\" || e.key === \"M\") {\n      toggleMute();\n    }\n  });\n  soundButton.addEventListener(\"click\", function (e) {\n    return toggleMute();\n  });\n\n  var toggleMute = function toggleMute() {\n    if (mute) {\n      soundIcon.classList = \"\";\n      muteIcon.classList = \"hidden\";\n      mute = false;\n      if (game) game.unmute();\n    } else {\n      soundIcon.classList = \"hidden\";\n      muteIcon.classList = \"\";\n      mute = true;\n      if (game) game.mute();\n    }\n  };\n});\n\nvar drawBackground = function drawBackground(canvas) {\n  var width = canvas.width;\n  var height = canvas.height;\n  var ctx = canvas.getContext('2d');\n  ctx.fillRect(0, 0, width, height);\n  ctx.strokeStyle = \"#00ff00\";\n  ctx.lineWidth = 0.1;\n\n  for (var i = 0; i < canvas.width; i += Math.floor(canvas.width / 12)) {\n    ctx.moveTo(i, 0);\n    ctx.lineTo(i, height);\n    ctx.stroke();\n  }\n\n  for (var _i = 0; _i < canvas.height; _i += Math.floor(canvas.height / 8)) {\n    ctx.moveTo(0, _i);\n    ctx.lineTo(width, _i);\n    ctx.stroke();\n  }\n};\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/inputs.js":
/*!***********************!*\
  !*** ./src/inputs.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _laser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./laser */ \"./src/laser.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n\n\n\nfunction startInputs() {\n  var _this = this;\n\n  //moving the cursor\n  this.canvas.addEventListener(\"mousemove\", function (e) {\n    // from https://codepen.io/chrisjaime/pen/lcEpn\n    var rect = _this.canvas.getBoundingClientRect();\n\n    _this.cursor.updatePos(e.clientX - rect.left, e.clientY - rect.top);\n  });\n  this.clickListener = document.addEventListener(\"mousedown\", function (e) {\n    _this.keys.Mouse = true;\n  });\n  this.mouseUpListener = document.addEventListener(\"mouseup\", function (e) {\n    _this.keys.Mouse = false;\n  });\n  document.addEventListener(\"keydown\", function (e) {\n    _this.keys[e.code] = true;\n  });\n  document.addEventListener(\"keyup\", function (e) {\n    _this.keys[e.code] = false;\n  });\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (startInputs);\n\n//# sourceURL=webpack:///./src/inputs.js?");

/***/ }),

/***/ "./src/intervals.js":
/*!**************************!*\
  !*** ./src/intervals.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _enemy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enemy */ \"./src/enemy.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\n\n\n\nfunction runIntervals() {\n  var _this = this;\n\n  var intervals = [];\n  intervals.push(setInterval(this.tick.bind(this), 20));\n  intervals.push(setInterval(function () {\n    var startPos = _utils__WEBPACK_IMPORTED_MODULE_1__[\"randomEdgePos\"].apply(void 0, _toConsumableArray(_this.dims));\n\n    _this.entities.push(new _enemy__WEBPACK_IMPORTED_MODULE_0__[\"default\"](_this.eid, startPos, _this.enemySpeed, Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"calculateTheta\"])(startPos, _this.player.pos)));\n  }, 1000));\n  intervals.push(setInterval(function () {\n    return _this.enemySpeed += 0.2;\n  }, 4000));\n  intervals.push(setInterval(function () {\n    return _this.displayScore = _this.score;\n  }, 100));\n  return intervals;\n}\n\n;\n/* harmony default export */ __webpack_exports__[\"default\"] = (runIntervals);\n\n//# sourceURL=webpack:///./src/intervals.js?");

/***/ }),

/***/ "./src/laser.js":
/*!**********************!*\
  !*** ./src/laser.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n/* harmony import */ var _line__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./line */ \"./src/line.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\n\nvar Laser =\n/*#__PURE__*/\nfunction () {\n  function Laser(pos, theta) {\n    _classCallCheck(this, Laser);\n\n    this.pos = pos;\n    this.duration = 20;\n    this.theta = theta;\n    this.reflections = 4;\n    var vec = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"calculateVector\"])(theta, -100);\n    this.vecs = [new _line__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.pos, {\n      x: this.pos.x + vec.x,\n      y: this.pos.y + vec.y\n    })];\n  }\n\n  _createClass(Laser, [{\n    key: \"is_finished\",\n    value: function is_finished() {\n      return this.duration <= 0;\n    }\n  }, {\n    key: \"fade\",\n    value: function fade() {\n      this.duration--;\n    }\n  }, {\n    key: \"reflect\",\n    value: function reflect(laserLine, reflectLine) {\n      if (this.reflections === 0) {\n        this.duration = Math.min(this.duration, 12);\n        return; //stop if we are out of reflections\n      }\n\n      var laserVec = laserLine.vectorize();\n      var norm = reflectLine.normalVec().normalize();\n      var reflectVec = laserVec.subtract(norm.scale(2 * laserVec.dot(norm)));\n      var currentVec = this.vecs[this.vecs.length - 1];\n      var newLine = reflectVec.createLine(currentVec.q);\n      var laserNormalized = reflectVec.normalize();\n      newLine.p.x += laserNormalized.x;\n      newLine.p.y += laserNormalized.y;\n      this.vecs.push(newLine);\n      this.reflections--;\n    }\n  }, {\n    key: \"is_collidable\",\n    value: function is_collidable() {\n      return this.duration > 5;\n    }\n  }, {\n    key: \"grow\",\n    value: function grow(factor) {\n      var current = this.vecs[this.vecs.length - 1];\n      var point = current.p;\n      this.vecs[this.vecs.length - 1] = current.vectorize().scale(factor).createLine(point);\n      return this.vecs[this.vecs.length - 1];\n    }\n  }, {\n    key: \"draw\",\n    value: function draw(ctx) {\n      ctx.save();\n      ctx.beginPath();\n      ctx.lineWidth = 3;\n      ctx.strokeStyle = \"#1aff1a\";\n      ctx.shadowColor = \"#1aff1a\";\n      ctx.shadowOffsetX = 0;\n      ctx.shadowOffsetY = 0;\n      ctx.shadowBlur = 5;\n      if (this.duration <= 10) ctx.globalAlpha = 1 - (10 - this.duration) / 10;\n      this.vecs.forEach(function (vector) {\n        ctx.moveTo(vector.p.x, vector.p.y);\n        ctx.lineTo(vector.q.x, vector.q.y);\n      });\n      ctx.stroke();\n      ctx.restore();\n    }\n  }]);\n\n  return Laser;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Laser);\n\n//# sourceURL=webpack:///./src/laser.js?");

/***/ }),

/***/ "./src/line.js":
/*!*********************!*\
  !*** ./src/line.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return line; });\n/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vector */ \"./src/vector.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar line =\n/*#__PURE__*/\nfunction () {\n  function line(p, q) {\n    _classCallCheck(this, line);\n\n    this.p = p;\n    this.q = q;\n  }\n\n  _createClass(line, [{\n    key: \"len\",\n    value: function len() {\n      return Math.sqrt(Math.pow(this.p.x - this.q.x, 2) + Math.pow(this.p.y - this.q.y, 2));\n    }\n  }, {\n    key: \"normalVec\",\n    value: function normalVec() {\n      return new _vector__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n        x: 0,\n        y: 0\n      }, {\n        x: -(this.q.y - this.p.y),\n        y: this.q.x - this.p.x\n      });\n    }\n  }, {\n    key: \"vectorize\",\n    value: function vectorize() {\n      return new _vector__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.p, this.q);\n    }\n  }]);\n\n  return line;\n}();\n\n\n\n//# sourceURL=webpack:///./src/line.js?");

/***/ }),

/***/ "./src/moving-object.js":
/*!******************************!*\
  !*** ./src/moving-object.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar MovingObject =\n/*#__PURE__*/\nfunction () {\n  function MovingObject(pos, vel, direc) {\n    _classCallCheck(this, MovingObject);\n\n    this.pos = pos;\n    this.vel = vel;\n    this.direc = direc;\n  }\n\n  _createClass(MovingObject, [{\n    key: \"accelerate\",\n    value: function accelerate(accel) {\n      this.vel = accel;\n    }\n  }, {\n    key: \"decelerate\",\n    value: function decelerate() {\n      this.vel = 0;\n    }\n  }, {\n    key: \"rotate\",\n    value: function rotate(rot) {\n      this.direc = rot;\n    }\n  }, {\n    key: \"move\",\n    value: function move(edges) {\n      var vec = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"calculateVector\"])(this.direc, this.vel);\n      this.pos.x += vec.x;\n      this.pos.y += vec.y;\n      var ret = [];\n\n      for (var i = 0; i < edges.length; i++) {\n        if (this.is_collided(edges[i])) {\n          this.pos.x -= vec.x;\n          this.pos.y -= vec.y;\n          ret.push(edges[i]);\n        }\n      }\n\n      return ret;\n    }\n  }]);\n\n  return MovingObject;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (MovingObject);\n\n//# sourceURL=webpack:///./src/moving-object.js?");

/***/ }),

/***/ "./src/obstacle.js":
/*!*************************!*\
  !*** ./src/obstacle.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Obstacle; });\n/* harmony import */ var _line__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./line */ \"./src/line.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar Obstacle =\n/*#__PURE__*/\nfunction () {\n  function Obstacle(pos) {\n    _classCallCheck(this, Obstacle);\n\n    this.pos = pos;\n    this.points = this.createPoints();\n    this.lines = this.createLines();\n  }\n\n  _createClass(Obstacle, [{\n    key: \"createPoints\",\n    value: function createPoints() {\n      var x = this.pos.x;\n      var y = this.pos.y;\n      return [{\n        x: x,\n        y: y - 25\n      }, {\n        x: x - 25,\n        y: y\n      }, {\n        x: x,\n        y: y + 25\n      }, {\n        x: x + 25,\n        y: y\n      }];\n    }\n  }, {\n    key: \"createLines\",\n    value: function createLines() {\n      var lines = [];\n\n      for (var i = 0; i < this.points.length - 1; i++) {\n        lines.push(new _line__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.points[i], this.points[i + 1]));\n      }\n\n      lines.push(new _line__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.points[this.points.length - 1], this.points[0]));\n      return lines;\n    }\n  }, {\n    key: \"draw\",\n    value: function draw(ctx) {\n      ctx.save();\n      ctx.fillStyle = \"#D0D0D0\";\n      ctx.beginPath();\n      ctx.moveTo(this.lines[0].p.x, this.lines[0].p.y);\n      this.lines.forEach(function (line) {\n        ctx.lineTo(line.q.x, line.q.y);\n      });\n      ctx.fill();\n      ctx.restore();\n    }\n  }]);\n\n  return Obstacle;\n}();\n\n\n\n//# sourceURL=webpack:///./src/obstacle.js?");

/***/ }),

/***/ "./src/particles/explosions.js":
/*!*************************************!*\
  !*** ./src/particles/explosions.js ***!
  \*************************************/
/*! exports provided: explode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"explode\", function() { return explode; });\n/* harmony import */ var _spark__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./spark */ \"./src/particles/spark.js\");\n\nfunction explode(pos, theta) {\n  var ret = [];\n\n  if (theta) {\n    //we only want half the explosion, this is a collision with a wall;\n    for (var i = 0; i < 5; i++) {\n      ret.push(new _spark__WEBPACK_IMPORTED_MODULE_0__[\"default\"](pos, theta - Math.PI / 2 + Math.random() * Math.PI, 10));\n    }\n  } else {\n    for (var _i = 0; _i < 30; _i++) {\n      ret.push(new _spark__WEBPACK_IMPORTED_MODULE_0__[\"default\"](pos, Math.random() * Math.PI * 2));\n    }\n  }\n\n  return ret;\n}\n\n//# sourceURL=webpack:///./src/particles/explosions.js?");

/***/ }),

/***/ "./src/particles/spark.js":
/*!********************************!*\
  !*** ./src/particles/spark.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Spark; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Spark =\n/*#__PURE__*/\nfunction () {\n  function Spark(start, direction, timeToLive) {\n    _classCallCheck(this, Spark);\n\n    this.pos = {\n      x: start.x,\n      y: start.y\n    };\n    this.direction = direction;\n    this.length = Math.random() * 15;\n    this.vel = Math.random() * 5 + 3;\n    this.age = 0;\n    this.timeToLive = timeToLive || 20;\n    this.opacity = 1;\n  }\n\n  _createClass(Spark, [{\n    key: \"finished\",\n    value: function finished() {\n      return this.age > this.timeToLive;\n    }\n  }, {\n    key: \"move\",\n    value: function move() {\n      this.pos.x += Math.cos(this.direction) * this.vel;\n      this.pos.y += Math.sin(this.direction) * this.vel;\n    }\n  }, {\n    key: \"lifecycle\",\n    value: function lifecycle() {\n      this.age++;\n      this.vel -= 0.1;\n      this.opacity = (this.timeToLive - this.age) / this.timeToLive;\n    }\n  }, {\n    key: \"draw\",\n    value: function draw(ctx) {\n      ctx.save();\n      ctx.globalAlpha = this.opacity;\n      ctx.strokeStyle = \"#1aff1a\";\n      ctx.shadowColor = \"#1aff1a\";\n      ctx.shadowOffsetX = 0;\n      ctx.shadowOffsetY = 0;\n      ctx.shadowBlur = 5;\n      ctx.beginPath();\n      ctx.moveTo(this.pos.x, this.pos.y);\n      ctx.lineTo(this.pos.x + Math.cos(this.direction) * this.length, this.pos.y + Math.sin(this.direction) * this.length);\n      ctx.stroke();\n      ctx.restore();\n    }\n  }]);\n\n  return Spark;\n}();\n\n\n\n//# sourceURL=webpack:///./src/particles/spark.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _moving_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moving-object */ \"./src/moving-object.js\");\n/* harmony import */ var _line__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./line */ \"./src/line.js\");\n/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vector */ \"./src/vector.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n/* harmony import */ var _collisions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./collisions */ \"./src/collisions.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\n\n\n\nvar Player =\n/*#__PURE__*/\nfunction (_MovingObject) {\n  _inherits(Player, _MovingObject);\n\n  function Player(pos, vel, direc) {\n    var _this;\n\n    _classCallCheck(this, Player);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(Player).call(this, pos, vel, direc));\n    _this.radius = 10;\n    _this.points = [{\n      x: -10,\n      y: 4\n    }, {\n      x: 0,\n      y: -22\n    }, {\n      x: 10,\n      y: 4\n    }];\n    _this.charge = 0;\n\n    _this.calculateLines();\n\n    return _this;\n  }\n\n  _createClass(Player, [{\n    key: \"is_collided\",\n    value: function is_collided(collider) {\n      if (collider.pos) {\n        for (var i = 0; i < this.lines.length; i++) {\n          if (Object(_collisions__WEBPACK_IMPORTED_MODULE_4__[\"lineCircleCollision\"])(this.lines[i], collider.pos, collider.radius)) return true;\n        }\n      } else {\n        for (var _i = 0; _i < this.lines.length; _i++) {\n          if (Object(_collisions__WEBPACK_IMPORTED_MODULE_4__[\"lineLineCollision\"])(collider, this.lines[_i])) return true;\n        }\n      }\n\n      return false;\n    }\n  }, {\n    key: \"chargeLaser\",\n    value: function chargeLaser(percent) {\n      if (percent > 1) percent = 1;\n      this.charge = percent;\n    }\n  }, {\n    key: \"charged\",\n    value: function charged() {\n      return this.charge === 1;\n    }\n  }, {\n    key: \"discharge\",\n    value: function discharge() {\n      this.charge = 0;\n    }\n  }, {\n    key: \"calculateLines\",\n    value: function calculateLines() {\n      var _this2 = this;\n\n      var x = this.pos.x;\n      var y = this.pos.y;\n      var points = this.points.map(function (point) {\n        var newPoint = Object(_utils__WEBPACK_IMPORTED_MODULE_3__[\"rotatePoint\"])(point, _this2.direc - Math.PI / 2);\n        newPoint.x += x;\n        newPoint.y += y;\n        return newPoint;\n      });\n      points.unshift({\n        x: x,\n        y: y\n      });\n      points.push({\n        x: x,\n        y: y\n      });\n      this.lines = [];\n\n      for (var i = 0; i < points.length - 1; i++) {\n        this.lines.push(new _line__WEBPACK_IMPORTED_MODULE_1__[\"default\"](points[i], points[i + 1]));\n      }\n\n      var charge1 = new _vector__WEBPACK_IMPORTED_MODULE_2__[\"default\"](points[1], points[2]);\n      var charge2 = new _vector__WEBPACK_IMPORTED_MODULE_2__[\"default\"](points[3], points[2]);\n      this.chargeLines = [charge1.scale(this.charge).createLine(points[1]), charge2.scale(this.charge).createLine(points[3])];\n    }\n  }, {\n    key: \"draw\",\n    value: function draw(ctx) {\n      ctx.save();\n      ctx.fillStyle = \"White\";\n      ctx.beginPath();\n      ctx.moveTo(this.pos.x, this.pos.y);\n      this.lines.forEach(function (line) {\n        ctx.lineTo(line.q.x, line.q.y);\n      });\n      ctx.fill();\n      ctx.restore();\n      ctx.save();\n      ctx.strokeStyle = \"#1aff1a\";\n      ctx.shadowColor = \"#1aff1a\";\n      ctx.shadowOffsetX = 0;\n      ctx.shadowOffsetY = 0;\n      ctx.shadowBlur = 4;\n      ctx.lineWidth = 3;\n      this.chargeLines.forEach(function (line) {\n        ctx.beginPath();\n        ctx.moveTo(line.p.x, line.p.y);\n        ctx.lineTo(line.q.x, line.q.y);\n        ctx.stroke();\n      });\n      ctx.restore();\n    }\n  }]);\n\n  return Player;\n}(_moving_object__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Player);\n\n//# sourceURL=webpack:///./src/player.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: calculateTheta, calculateDistance, calculateVector, rotatePoint, randomEdgePos, randomTheta, aggregateEdges, randInt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"calculateTheta\", function() { return calculateTheta; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"calculateDistance\", function() { return calculateDistance; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"calculateVector\", function() { return calculateVector; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"rotatePoint\", function() { return rotatePoint; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"randomEdgePos\", function() { return randomEdgePos; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"randomTheta\", function() { return randomTheta; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"aggregateEdges\", function() { return aggregateEdges; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"randInt\", function() { return randInt; });\n/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vector */ \"./src/vector.js\");\n\nvar calculateTheta = function calculateTheta(pos1, pos2) {\n  var diffX = pos1.x - pos2.x;\n  var diffY = pos1.y - pos2.y;\n  return Math.atan2(diffY, diffX);\n};\nvar calculateDistance = function calculateDistance(pos1, pos2) {\n  return Math.sqrt(Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2));\n};\nvar calculateVector = function calculateVector(theta, vel) {\n  return new _vector__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n    x: 0,\n    y: 0\n  }, {\n    x: Math.cos(theta) * vel,\n    y: Math.sin(theta) * vel\n  });\n};\nvar rotatePoint = function rotatePoint(point, rot) {\n  var ret = {};\n  ret.x = point.x * Math.cos(rot) - point.y * Math.sin(rot);\n  ret.y = point.y * Math.cos(rot) + point.x * Math.sin(rot);\n  return ret;\n};\nvar randomEdgePos = function randomEdgePos(width, height) {\n  var edges = ['top', 'bottom', 'left', 'right'];\n  var edge = edges[randInt(4)];\n\n  switch (edge) {\n    case 'top':\n      return {\n        x: randInt(width),\n        y: 0\n      };\n\n    case 'bottom':\n      return {\n        x: randInt(width),\n        y: height\n      };\n\n    case 'left':\n      return {\n        x: 0,\n        y: randInt(height)\n      };\n\n    case 'right':\n      return {\n        x: width,\n        y: randInt(height)\n      };\n  }\n};\nvar randomTheta = function randomTheta() {\n  return Math.floor(Math.random * Math.PI * 2);\n};\nvar aggregateEdges = function aggregateEdges() {\n  var ret = [];\n\n  for (var _len = arguments.length, edgeCollections = new Array(_len), _key = 0; _key < _len; _key++) {\n    edgeCollections[_key] = arguments[_key];\n  }\n\n  edgeCollections.forEach(function (collection) {\n    return ret = ret.concat(collection.lines);\n  });\n  return ret;\n};\nvar randInt = function randInt(max) {\n  return Math.floor(Math.random() * max);\n};\n\n//# sourceURL=webpack:///./src/utils.js?");

/***/ }),

/***/ "./src/vector.js":
/*!***********************!*\
  !*** ./src/vector.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Vector; });\n/* harmony import */ var _line__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./line */ \"./src/line.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar Vector =\n/*#__PURE__*/\nfunction () {\n  function Vector(p, q) {\n    _classCallCheck(this, Vector);\n\n    this.x = q.x - p.x;\n    this.y = q.y - p.y;\n    this.coords = [this.x, this.y];\n  }\n\n  _createClass(Vector, [{\n    key: \"createLine\",\n    value: function createLine(point) {\n      return new _line__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n        x: point.x,\n        y: point.y\n      }, {\n        x: point.x + this.x,\n        y: point.y + this.y\n      });\n    }\n  }, {\n    key: \"dot\",\n    value: function dot(vec) {\n      return this.x * vec.x + this.y * vec.y;\n    }\n  }, {\n    key: \"scale\",\n    value: function scale(scalar) {\n      this.x *= scalar;\n      this.y *= scalar;\n      return this;\n    }\n  }, {\n    key: \"normalize\",\n    value: function normalize() {\n      var mag = this.magnitude();\n      this.x /= mag;\n      this.y /= mag;\n      return this;\n    }\n  }, {\n    key: \"subtract\",\n    value: function subtract(vec) {\n      this.x -= vec.x;\n      this.y -= vec.y;\n      return this;\n    }\n  }, {\n    key: \"cross\",\n    value: function cross(vec) {\n      return this.x * vec.y - this.y * vec.x;\n    }\n  }, {\n    key: \"magnitude\",\n    value: function magnitude() {\n      return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));\n    }\n  }]);\n\n  return Vector;\n}();\n\n\n\n//# sourceURL=webpack:///./src/vector.js?");

/***/ })

/******/ });