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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var postmonger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! postmonger */ "./node_modules/postmonger/postmonger.js");
/* harmony import */ var postmonger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(postmonger__WEBPACK_IMPORTED_MODULE_0__);
// JOURNEY BUILDER CUSTOM ACTIVITY - discountCode ACTIVITY
// ````````````````````````````````````````````````````````````
// This example demonstrates a custom activity that utilizes an external service to generate
// a discount code where the user inputs the discount percent in the configuration.
//
// Journey Builder's Postmonger Events Reference can be found here:
// https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-app-development.meta/mc-app-development/using-postmonger.htm

// Custom activities load inside an iframe. We'll use postmonger to manage
// the cross-document messaging between Journey Builder and the activity


// Create a new connection for this session.
// We use this connection to talk to Journey Builder. You'll want to keep this
// reference handy and pass it into your UI framework if you're using React, Angular, Vue, etc.
var connection = new postmonger__WEBPACK_IMPORTED_MODULE_0___default.a.Session();

// we'll store the activity on this variable when we receive it
var activity = null;

// Wait for the document to load before we doing anything
document.addEventListener('DOMContentLoaded', function main() {
  // Setup a test harness so we can interact with our custom activity
  // outside of journey builder using window functions & browser devtools.
  // This isn't required by your activity, its for example purposes only
  setupExampleTestHarness();

  // setup our ui event handlers
  setupEventHandlers();

  // Bind the initActivity event...
  // Journey Builder will respond with "initActivity" after it receives the "ready" signal
  connection.on('initActivity', onInitActivity);

  // We're all set! let's signal Journey Builder
  // that we're ready to receive the activity payload...

  // Tell the parent iFrame that we are ready.
  connection.trigger('ready');
});

// this function is triggered by Journey Builder via Postmonger.
// Journey Builder will send us a copy of the activity here
function onInitActivity(payload) {
  // set the activity object from this payload. We'll refer to this object as we
  // modify it before saving.
  activity = payload;
  var hasInArguments = Boolean(activity.arguments && activity.arguments.execute && activity.arguments.execute.inArguments && activity.arguments.execute.inArguments.length > 0);
  var inArguments = hasInArguments ? activity.arguments.execute.inArguments : [];
  console.log('-------- triggered:onInitActivity({obj}) --------');
  console.log('activity:\n ', JSON.stringify(activity, null, 4));
  console.log('Has In Arguments: ', hasInArguments);
  console.log('inArguments', inArguments);
  console.log('-------------------------------------------------');

  // check if this activity has an incoming argument.
  // this would be set on the server side when the activity executes
  // (take a look at execute() in ./discountCode/app.js to see where that happens)
  var discountArgument = inArguments.find(function (arg) {
    return arg.discount;
  });
  console.log('Discount Argument', discountArgument);

  // if a discountCode back argument was set, show the message in the view.
  if (discountArgument) {
    selectDiscountCodeOption(discountArgument.discount);
  }

  // if the discountCode back argument doesn't exist the user can pick
  // a discountCode message from the drop down list. the discountCode back arg
  // will be set once the journey executes the activity
}
function onDoneButtonClick() {
  // we set must metaData.isConfigured in order to tell JB that
  // this activity is ready for activation
  activity.metaData.isConfigured = true;

  // get the option that the user selected and save it to
  var select = document.getElementById('discount-code');
  var option = select.options[select.selectedIndex];
  activity.arguments.execute.inArguments = [{
    discount: option.value
  }];

  // you can set the name that appears below the activity with the name property
  activity.name = "Issue ".concat(activity.arguments.execute.inArguments[0].discount, "% Code");
  console.log('------------ triggering:updateActivity({obj}) ----------------');
  console.log('Sending message back to updateActivity');
  console.log('saving\n', JSON.stringify(activity, null, 4));
  console.log('--------------------------------------------------------------');
  connection.trigger('updateActivity', activity);
}
function onCancelButtonClick() {
  // tell Journey Builder that this activity has no changes.
  // we wont be prompted to save changes when the inspector closes
  connection.trigger('setActivityDirtyState', false);

  // now request that Journey Builder closes the inspector/drawer
  connection.trigger('requestInspectorClose');
}
function onDiscountCodeSelectChange() {
  // enable or disable the done button when the select option changes
  var select = document.getElementById('discount-code');
  if (select.selectedIndex) {
    document.getElementById('done').removeAttribute('disabled');
  } else {
    document.getElementById('done').setAttribute('disabled', '');
  }

  // let journey builder know the activity has changes
  connection.trigger('setActivityDirtyState', true);
}
function selectDiscountCodeOption(value) {
  var select = document.getElementById('discount-code');
  var selectOption = select.querySelector("[value='".concat(value, "']"));
  if (selectOption) {
    selectOption.selected = true;
    onDiscountCodeSelectChange();
  } else {
    console.log('Could not select value from list', "[value='".concat(value, "]'"));
  }
}
function setupEventHandlers() {
  // Listen to events on the form
  document.getElementById('done').addEventListener('click', onDoneButtonClick);
  document.getElementById('cancel').addEventListener('click', onCancelButtonClick);
  document.getElementById('discount-code').addEventListener('change', onDiscountCodeSelectChange);
}

// this function is for example purposes only. it sets ups a Postmonger
// session that emulates how Journey Builder works. You can call jb.ready()
// from the console to kick off the initActivity event with a mock activity object
function setupExampleTestHarness() {
  var isLocalhost = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  if (!isLocalhost) {
    // don't load the test harness functions when running in Journey Builder
    return;
  }
  var jbSession = new postmonger__WEBPACK_IMPORTED_MODULE_0___default.a.Session();
  var jb = {};
  window.jb = jb;
  jbSession.on('setActivityDirtyState', function (value) {
    console.log('[echo] setActivityDirtyState -> ', value);
  });
  jbSession.on('requestInspectorClose', function () {
    console.log('[echo] requestInspectorClose');
  });
  jbSession.on('updateActivity', function (activity) {
    console.log('[echo] updateActivity -> ', JSON.stringify(activity, null, 4));
  });
  jbSession.on('ready', function () {
    console.log('[echo] ready');
    console.log('\tuse jb.ready() from the console to initialize your activity');
  });

  // fire the ready signal with an example activity
  jb.ready = function () {
    jbSession.trigger('initActivity', {
      name: '',
      key: 'EXAMPLE-1',
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