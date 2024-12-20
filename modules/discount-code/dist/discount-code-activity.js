/*! Salesforce Marketing Cloud - Journey Builder Custom Activities - discount-code */
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./modules/discount-code/src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./modules/discount-code/src/index.js":
/*!********************************************!*\
  !*** ./modules/discount-code/src/index.js ***!
  \********************************************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var postmonger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! postmonger */ "./node_modules/postmonger/postmonger.js");
/* harmony import */ var postmonger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(postmonger__WEBPACK_IMPORTED_MODULE_0__);
// JOURNEY BUILDER CUSTOM ACTIVITY - discountCode ACTIVITY
// ````````````````````````````````````````````````````````````
// This example demonstrates a custom activity that utilizes an external service to generate
// a discount code where the user inputs the discount percent in the configuration.



// Create a new connection for this session.
const connection = new postmonger__WEBPACK_IMPORTED_MODULE_0___default.a.Session();

// We'll store the activity on this variable when we receive it
let activity = null;

// Wait for the document to load before we do anything
document.addEventListener("DOMContentLoaded", function main() {
  // Setup a test harness so we can interact with our custom activity
  setupExampleTestHarness();

  // Setup our UI event handlers
  setupEventHandlers();

  // Bind the initActivity event...
  connection.on("initActivity", onInitActivity);

  // Signal Journey Builder that we're ready to receive the activity payload
  connection.trigger("ready");
});

// This function is triggered by Journey Builder via Postmonger.
function onInitActivity(payload) {
  activity = payload;
  connection.trigger("requestSchema");
  connection.on("requestedSchema", function (data) {
    const schema = data["schema"];
    for (let i = 0, l = schema.length; i < l; i++) {
      let inArg = {};
      let attr = schema[i].key;
      let keyIndex = attr.lastIndexOf(".") + 1;
      inArg[attr.substring(keyIndex)] = "{{" + attr + "}}";
      activity["arguments"].execute.inArguments[0][`${attr.substring(keyIndex)}`] = "{{" + attr + "}}";
    }
  });
  console.log("activity:", JSON.stringify(activity, null, 4));
  const hasInArguments = Boolean(activity.arguments && activity.arguments.execute && activity.arguments.execute.inArguments.length > 0);
  const inArguments = hasInArguments ? activity.arguments.execute.inArguments : [];

  // Check if a discount code back argument was set.
  const discountArgument = inArguments.find(arg => arg.discount);
  if (discountArgument) {
    selectDiscountCodeOption(discountArgument.discount);
  }
}
async function onDoneButtonClick() {
  activity.metaData.isConfigured = true;

  // Get the selected discount code from the dropdown
  const select = document.getElementById("discount-code");
  const option = select.options[select.selectedIndex];

  // Get the custom discount code from the input field
  const emailAddress = document.getElementById("email-address").value;

  // If a custom discount code is entered, use it; otherwise, use the dropdown selection
  const discountValue = option.value;

  // Set the inArguments with the discount code and other attributes
  activity.arguments.execute.inArguments = [{
    discount: discountValue,
    EmailAddress: emailAddress,
    firstName: "{{Contact.Attribute.FirstName}}"
  }];
  activity.name = `Issue ${activity.arguments.execute.inArguments[0].discount}% Code`;
  console.log("sending message back to updateActivity", JSON.stringify(activity, null, 4));
  connection.trigger("updateActivity", activity);
}
function onCancelButtonClick() {
  connection.trigger("setActivityDirtyState", false);
  connection.trigger("requestInspectorClose");
}
function onDiscountCodeSelectChange() {
  const select = document.getElementById("discount-code");
  if (select.selectedIndex) {
    document.getElementById("done").removeAttribute("disabled");
  } else {
    document.getElementById("done").setAttribute("disabled", "");
  }
  connection.trigger("setActivityDirtyState", true);
}
function selectDiscountCodeOption(value) {
  const select = document.getElementById("discount-code");
  const selectOption = select.querySelector(`[value='${value}']`);
  if (selectOption) {
    selectOption.selected = true;
    onDiscountCodeSelectChange();
  } else {
    console.log("Could not select value from list", `[value='${value}]'`);
  }
}
function setupEventHandlers() {
  document.getElementById("done").addEventListener("click", onDoneButtonClick);
  document.getElementById("cancel").addEventListener("click", onCancelButtonClick);
  document.getElementById("discount-code").addEventListener("change", onDiscountCodeSelectChange);

  // Listen for changes in the custom discount code input field
  document.getElementById("email-address").addEventListener("input", function () {
    connection.trigger("setActivityDirtyState", true); // Mark the activity as dirty
    if (document.getElementById("email-address").value) {
      document.getElementById("done").removeAttribute("disabled");
    } else {
      document.getElementById("done").setAttribute("disabled", "");
    }
  });
}

// This function is for example purposes only. It sets up a Postmonger session that emulates how Journey Builder works.
function setupExampleTestHarness() {
  const isLocalhost = location.hostname === "localhost" || location.hostname === "127.0.0.1";
  if (!isLocalhost) {
    return;
  }
  const jbSession = new postmonger__WEBPACK_IMPORTED_MODULE_0___default.a.Session();
  window.jb = {};
  jbSession.on("setActivityDirtyState", function (value) {
    console.log("[echo] setActivityDirtyState -> ", value);
  });
  jbSession.on("requestInspectorClose", function () {
    console.log("[echo] requestInspectorClose");
  });
  jbSession.on("updateActivity", async function (activity) {
    console.log("[echo] updateActivity -> ", JSON.stringify(activity, null, 4));
  });
  jbSession.on("ready", function () {
    console.log("[echo] ready");
  });
  jb.ready = function () {
    jbSession.trigger("initActivity", {
      name: "",
      key: "EXAMPLE-1",
      metaData: {},
      configurationArguments: {},
      arguments: {
        executionMode: "{{Context.ExecutionMode}}",
        definitionId: "{{Context.DefinitionId}}",
        activityId: "{{Activity.Id}}",
        contactKey: "{{Context.ContactKey}}",
        execute: {
          inArguments: [{
            discount: 10
          }],
          outArguments: []
        },
        startActivityKey: "{{Context.StartActivityKey}}",
        definitionInstanceId: "{{Context.DefinitionInstanceId}}",
        requestObjectId: "{{Context.RequestObjectId}}"
      }
    });
  };
}

/***/ }),

/***/ "./node_modules/postmonger/postmonger.js":
/*!***********************************************!*\
  !*** ./node_modules/postmonger/postmonger.js ***!
  \***********************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 * Postmonger.js   version 0.0.14
 * https://github.com/kevinparkerson/postmonger
 *
 * Copyright (c) 2012-2014 Kevin Parkerson
 * Available via the MIT or new BSD license.
 * Further details and documentation:
 * http://kevinparkerson.github.com/postmonger/
 *
 *///

(function (root, factory) {
	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () { return factory(root); }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}(this, function (root) {
	root = root || window;

	var exports = exports || undefined;
	var Postmonger;
	var previous = root.Postmonger;
	var _window = (root.addEventListener || root.attachEvent) ? root : window;
	var Connection, Events, Session;

	//Set up Postmonger namespace, provide noConflict support, and version
	if (typeof(exports) !== 'undefined') {
		Postmonger = exports;
	} else {
		Postmonger = {};
	}
	Postmonger.noConflict = function () {
		root.Postmonger = previous;
		return this;
	};
	Postmonger.version = '0.0.14';

	//Create a new Postmonger Connection
	Connection = Postmonger.Connection = function (options) {
		options = (typeof(options) === 'object') ? options : {};

		var connect = options.connect || _window.parent;
		var from = options.from || '*';
		var to = options.to || '*';
		var self = this;

		//If string, grab based on id
		if (typeof(connect) === 'string') {
			connect = document.getElementById(connect);
		}

		//If no connection, check for jquery object
		if (connect && !connect.postMessage && connect.jquery) {
			connect = connect.get(0);
		}

		//If still no connection, check for iframe
		if (connect && !connect.postMessage && (connect.contentWindow || connect.contentDocument)) {
			connect = connect.contentWindow || connect.contentDocument;
		}

		//Throw warning if connection could not be made
		if (!(connect && connect.postMessage)) {
			if (_window.console && _window.console.warn) {
				_window.console.warn(' Warning: Postmonger could not establish connection with ', options.connect);
			}
			return false;
		}

		self.connect = connect;
		self.to = to;
		self.from = from;

		return self;
	};

	//Postmonger.Events - Hacked together from Backbone.Events and two Underscore functions.
	Events = Postmonger.Events = function () {
		var eventSplitter = /\s+/;
		var self = this;

		self._callbacks = {};

		self._has = function (obj, key) {
			return Object.prototype.hasOwnProperty.call(obj, key);
		};

		self._keys = function (obj) {
			if (Object.keys) {
				return Object.keys(obj);
			}

			if (typeof(obj)!=='object') {
				throw new TypeError('Invalid object');
			}

			var keys = [];

			for (var key in obj) {
				if (self._has(obj, key)) {
					keys[keys.length] = key;
				}
			}

			return keys;
		};

		self.on = function (events, callback, context) {
			var calls, event, node, tail, list;

			if (!callback) {
				return self;
			}

			events = events.split(eventSplitter);

			self._callbacks = self._callbacks || {};
			calls = self._callbacks;

			while (event = events.shift()) {
				list = calls[event];

				node = (list) ? list.tail : {};
				tail = {};

				node.next = tail;
				node.context = context;
				node.callback = callback;

				calls[event] = {
					tail: tail,
					next: (list) ? list.next : node
				};
			}

			return self;
		};

		self.off = function (events, callback, context) {
			var calls = self._callbacks;
			var event, node, tail, cb, ctx;

			if (!calls) {
				return;
			}

			if (!(events || callback || context)) {
				delete self._callbacks;
				return self;
			}

			events = (events) ? events.split(eventSplitter) : self._keys(calls);

			while (event = events.shift()) {
				node = calls[event];
				delete calls[event];
				if (!node || !(callback || context)) {
					continue;
				}

				tail = node.tail;
				while ((node = node.next) !== tail) {
					cb = node.callback;
					ctx = node.context;
					if (((callback && cb) !== callback) || ((context && ctx) !== context)) {
						self.on(event, cb, ctx);
					}
				}
			}

			return self;
		};

		self.trigger = function (events) {
			var event, node, calls, tail, args, all, rest;

			if (!(calls = self._callbacks)) {
				return self;
			}

			all = calls.all;
			events = events.split(eventSplitter);
			rest = Array.prototype.slice.call(arguments, 1);

			while (event = events.shift()) {
				if (node = calls[event]) {
					tail = node.tail;
					while ((node = node.next) !== tail) {
						node.callback.apply(node.context || self, rest);
					}
				}
				if (node = all) {
					tail = node.tail;
					args = [event].concat(rest);
					while ((node = node.next) !== tail) {
						node.callback.apply(node.context || self, args);
					}
				}
			}

			return self;
		};

		return self;
	};

	//Create a new Postmonger Session
	Session = Postmonger.Session = function () {
		var args = (arguments.length>0) ? Array.prototype.slice.call(arguments, 0) : [{}];
		var connections = [];
		var incoming = new Events();
		var outgoing = new Events();
		var self = this;
		var connection, i, j, l, ln, postMessageListener;

		//Session API hooks
		self.on = incoming.on;
		self.off = incoming.off;
		self.trigger = outgoing.trigger;
		self.end = function () {
			incoming.off();
			outgoing.off();
			if (_window.removeEventListener) {
				_window.removeEventListener('message', postMessageListener, false);
			} else if (_window.detachEvent) {
				_window.detachEvent('onmessage', postMessageListener);
			}
			return self;
		};

		//Establishing connections
		for (i=0, l=args.length; i<l; i++) {
			connection = new Connection(args[i]);
			if (connection) {
				for (j=0, ln=connections.length; j<ln; j++) {
					if (
						connections[j].connect === connection.connect &&
						connections[j].from === connection.from &&
						connections[j].to === connection.to
					) {
						connection = null;
						break;
					}
				}
				if (connection) {
					connections.push(connection);
				}
			}
		}

		//Listener for incoming messages
		postMessageListener = function(event){
			var conn = null;
			var message = [];
			var data;
			var k, len;

			//Attempt to find the connection we're dealing with
			for (k=0, len=connections.length; k<len; k++) {
				if (connections[k].connect === event.source) {
					conn = connections[k];
					break;
				}
			}

			//Check if we've found the connection
			if (!conn) {
				return false;
			}

			//Check if the message is from the expected origin
			if (conn.from !== '*' && conn.from !== event.origin) {
				return false;
			}

			//Check the data that's been passed
			try{
				data = JSON.parse(event.data);
				if(!data.e){
					return false;
				}
			}catch(e){
				return false;
			}

			//Format the passed in data
			message.push(data.e);
			delete data.e;
			for (k in data) {
				message.push(data[k]);
			}

			//Send the message
			incoming['trigger'].apply(root, message);
		};

		//Add the listener
		if (_window.addEventListener) {
			_window.addEventListener('message', postMessageListener, false);
		} else if(_window.attachEvent) {
			_window.attachEvent('onmessage', postMessageListener);
		} else{
			if (_window.console && _window.console.warn) {
				_window.console.warn('WARNING: Postmonger could not listen for messages on window %o', _window);
			}
			return false;
		}

		//Sending outgoing messages
		outgoing.on('all', function () {
			var args = Array.prototype.slice.call(arguments, 0);
			var message = {};
			var k, len;

			message.e = args[0];

			for (k=1, len=args.length; k<len; k++) {
				message['a' + k] = args[k];
			}

			for (k=0, len=connections.length; k<len; k++) {
				connections[k].connect.postMessage(JSON.stringify(message), connections[k].to);
			}
		});

		return self;
	};

	return Postmonger;
}));


/***/ })

/******/ });
//# sourceMappingURL=discount-code-activity.js.map