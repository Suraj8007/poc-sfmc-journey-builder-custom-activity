/*! Salesforce Marketing Cloud - Journey Builder Custom Activities - Custom Split */
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./modules/discount-redemption-split/src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./modules/discount-redemption-split/src/index.js":
/*!********************************************************!*\
  !*** ./modules/discount-redemption-split/src/index.js ***!
  \********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var postmonger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! postmonger */ "./node_modules/postmonger/postmonger.js");
/* harmony import */ var postmonger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(postmonger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _sampleInteraction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sampleInteraction.js */ "./modules/discount-redemption-split/src/sampleInteraction.js");
// JOURNEY BUILDER CUSTOM SPLIT ACTIVITY (Discount Redemption)
// ````````````````````````````````````````````````````````````
// This example demonstrates a Rest Decision Split where your application tells the
// contact which way to go through the journey.
//
// We're building on concepts visited in previous examples so make sure
// you check out the "discount-code" module before jumping into this one



// This contains sample life-cycle events.

const connection = new postmonger__WEBPACK_IMPORTED_MODULE_0___default.a.Session();
let activity = null;
document.addEventListener('DOMContentLoaded', () => {
  // Setup a test harness so we can interact with our custom activity
  // outside of journey builder using window functions and browser devtools.
  // This isn't required by your activity, its for example purposes only
  setupExampleTestHarness();

  // setup our ui event handlers
  setupEventHandlers();

  // Journey Builder will trigger "initActivity" after it receives the "ready" event
  connection.on('initActivity', onInitActivity);
  connection.on('requestedInteractionDefaults', requestedInteractionDefaults);
  connection.on('requestedInteraction', requestedInteraction);

  // We're all set! let's signal Journey Builder
  // that we're ready to receive the activity payload...

  // Tell the parent iFrame that we are ready.
  connection.trigger('ready');

  // Tell the parent iFrame we want the Interaction Defaults
  connection.trigger('requestInteractionDefaults');

  // Tell the parent iFrame we want the Interaction
  connection.trigger('requestInteraction');
});
function requestedInteractionDefaults(payload) {
  console.log('-------- requestedInteractionDefaults --------');
  console.log('payload\n', JSON.stringify(payload, null, 4));
  console.log('requestInteraction', payload);
  console.log('---------------------------------------------');
}
function requestedInteraction(payload) {
  console.log('-------- requestedInteraction --------');
  console.log('payload\n', JSON.stringify(payload, null, 4));
  console.log('requestInteraction', payload);
  console.log('--------------------------------------');
  let selectedValue;

  // determine the selected item (if there is one)
  if (activity.arguments.execute.inArguments) {
    const discount = activity.arguments.execute.inArguments[0].discount;
    const discountCode = activity.arguments.execute.inArguments[0].discountCode;
    const existingSelection = discount !== null && discount !== undefined ? discount : discountCode;
    if (existingSelection.split('.').length == 3) {
      selectedValue = existingSelection.split('.')[1];
    }
  }

  // populate the select dropdown.
  const selectElement = document.getElementById('discount-code');
  payload.activities.forEach(a => {
    if (a.schema && a.schema.arguments && a.schema.arguments.execute && a.schema.arguments.execute.outArguments && a.schema.arguments.execute.outArguments.length > 0) {
      a.schema.arguments.execute.outArguments.forEach(inArg => {
        if (inArg.discountCode) {
          let option = document.createElement("option");
          option.text = `${a.name} - (${a.key})`;
          option.value = a.key;
          selectElement.add(option);
        }
      });
    }
  });

  // Display the warning if there is an issue, otherwise, display the
  if (selectElement.childElementCount == 0) {
    document.getElementById('main-form').style.display = 'hidden';
    document.getElementById('warning').style.display = 'block';
  } else {
    document.getElementById('main-form').style.display = 'block';
    document.getElementById('warning').style.display = 'hidden';

    // if we have a previously selected value, repopulate that value.
    if (selectedValue) {
      const selectOption = selectElement.querySelector(`[value='${selectedValue}']`);
      if (selectOption) {
        selectOption.selected = true;
      } else {
        console.log('Could not select value from list', `[value='${selectedValue}]'`);
      }
    }

    // let journey builder know the activity has changes
    connection.trigger('setActivityDirtyState', true);
  }
}

// this function is triggered by Journey Builder after it receives the "ready" signal
function onInitActivity(payload) {
  // set the activity object from this payload. We'll refer to this object as we
  // modify it before saving.
  activity = payload;
  console.log('-------- triggered:onInitActivity({obj}) --------');
  console.log('activity:\n ', JSON.stringify(activity, null, 4));
  console.log('-------------------------------------------------');

  // render all of this activity's outcomes into a drop down list
  const selectOptions = activity.outcomes.map(outcome => {
    const value = outcome.arguments.branchResult;
    const text = outcome.metaData.label;
    return `<option value="${value}">${text}</option>`;
  });

  // There is no need to have the disabled attribute on the close button as there
  // are no options for the user to select.
  document.getElementById('done').removeAttribute('disabled');
}
function onDoneButtonClick() {
  // we set must metaData.isConfigured in order to tell JB that
  // this activity is ready for activation
  activity['metaData'].isConfigured = true;

  // you can set the name that appears below the activity with the name property
  activity.name = 'Code Engagement';

  // get the option that the user selected and save it to
  const select = document.getElementById('discount-code');
  const option = select.options[select.selectedIndex];

  // Iterate over the inArguments and replace the data-binding string
  // to reflect the activity that they selected above.
  activity.arguments.execute.inArguments.forEach(inArg => {
    if (inArg.discount) {
      inArg.discount = `{{Interaction.${option.value}.discount}}`;
    } else if (inArg.discountCode) {
      inArg.discountCode = `{{Interaction.${option.value}.discountCode}}`;
    }
  });

  // get the option that the user selected and save it to
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
function setupEventHandlers() {
  document.getElementById('done').addEventListener('click', onDoneButtonClick);
  document.getElementById('cancel').addEventListener('click', onCancelButtonClick);
}

// this function is for example purposes only. it sets ups a Postmonger
// session that emulates how Journey Builder works. You can call jb.ready()
// from the console to kick off the initActivity event with a mock activity object
function setupExampleTestHarness() {
  const isLocalhost = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  if (!isLocalhost) {
    // don't load the test harness functions when running in Journey Builder
    return;
  }
  const jbSession = new postmonger__WEBPACK_IMPORTED_MODULE_0___default.a.Session();
  const jb = {};
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
    jbSession.trigger('initActivity', _sampleInteraction_js__WEBPACK_IMPORTED_MODULE_1__["default"].onInitActivity);

    // Simulated the completion of "requestedInteractionDefaults"
    jbSession.trigger('requestedInteractionDefaults', _sampleInteraction_js__WEBPACK_IMPORTED_MODULE_1__["default"].requestedInteractionDefaults);

    // Simulated the completion of "requestedInteraction"
    jbSession.trigger('requestedInteraction', _sampleInteraction_js__WEBPACK_IMPORTED_MODULE_1__["default"].requestedInteraction);
    window.jb.activity = _sampleInteraction_js__WEBPACK_IMPORTED_MODULE_1__["default"].onInitActivity;
  };
}

/***/ }),

/***/ "./modules/discount-redemption-split/src/sampleInteraction.js":
/*!********************************************************************!*\
  !*** ./modules/discount-redemption-split/src/sampleInteraction.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const onInitActivity = {
  "name": "Redemption Code Engagement",
  "id": "0440a8d8-5c96-43ab-bacc-2a585c2d2a53",
  "key": "REST-2",
  "type": "REST",
  "arguments": {
    "executionMode": "{{Context.ExecutionMode}}",
    "definitionId": "{{Context.DefinitionId}}",
    "activityId": "{{Activity.Id}}",
    "contactKey": "{{Context.ContactKey}}",
    "execute": {
      "inArguments": [{
        "discount": "{{Interaction.REST-3.discount}}"
      }, {
        "discountCode": "{{Interaction.REST-3.discountCode}}"
      }],
      "outArguments": [],
      "url": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-redemption-split/execute"
    },
    "testExecute": "",
    "startActivityKey": "{{Context.StartActivityKey}}",
    "definitionInstanceId": "{{Context.DefinitionInstanceId}}",
    "requestObjectId": "{{Context.RequestObjectId}}"
  },
  "configurationArguments": {
    "save": {
      "url": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-redemption-split/save"
    },
    "testSave": "",
    "publish": {
      "url": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-redemption-split/publish"
    },
    "testPublish": "",
    "unpublish": "",
    "stop": {
      "url": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-redemption-split/stop"
    },
    "testStop": "",
    "testUnpublish": "",
    "partnerActivityId": "",
    "validate": {
      "url": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-redemption-split/validate"
    },
    "testValidate": "",
    "outArgumentSchema": {}
  },
  "metaData": {
    "icon": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-redemption-split/images/icon.svg",
    "category": "customer",
    "iconSmall": "",
    "statsContactIcon": "",
    "original_icon": "images/icon.svg",
    "isConfigured": true
  },
  "schema": {
    "arguments": {
      "execute": {
        "inArguments": [{
          "discountCode": {
            "dataType": "Text",
            "isNullable": false,
            "direction": "In",
            "readOnly": false,
            "access": "Visible"
          },
          "discount": {
            "dataType": "Number",
            "isNullable": false,
            "direction": "In",
            "readOnly": false,
            "access": "Visible"
          }
        }],
        "outArguments": []
      }
    }
  },
  "editable": true,
  "outcomes": [{
    "arguments": {
      "branchResult": "no_activity"
    },
    "metaData": {
      "label": "No Activity",
      "invalid": false
    },
    "key": "72997ab9-896e-472f-9551-629a26d2e0ab",
    "next": "WAITBYDURATION-1"
  }, {
    "arguments": {
      "branchResult": "viewed_item"
    },
    "metaData": {
      "label": "Viewed Item",
      "invalid": false
    },
    "key": "9e275a12-6216-4526-94f0-0d4767faa7b8",
    "next": "WAITBYDURATION-2"
  }, {
    "arguments": {
      "branchResult": "abandoned_cart"
    },
    "metaData": {
      "label": "Abandoned Cart",
      "invalid": false
    },
    "key": "8959088e-5d23-4522-b25a-856d06d23763",
    "next": "REST-3"
  }, {
    "arguments": {
      "branchResult": "purchased_item"
    },
    "metaData": {
      "label": "Purchased Item",
      "invalid": false
    },
    "key": "0bb3b908-3e88-49e8-bd64-05ba820ac9c2",
    "next": "WAITBYDURATION-4"
  }, {
    "arguments": {
      "branchResult": "invalid_code"
    },
    "metaData": {
      "label": "Invalid Code",
      "invalid": false
    },
    "key": "9027e384-6b1e-4380-b61c-fce51e76446d",
    "next": "WAITBYDURATION-5"
  }],
  "errors": null
};
const requestedInteractionDefaults = {
  "email": ["{{Event.DEAudience-835d6d25-dd61-b2b3-6a04-68c073afe732.\"Email\"}}"],
  "mobileNumber": [],
  "transactionKeys": null,
  "properties": {
    "analyticsTracking": {
      "enabled": false,
      "analyticsType": "google",
      "urlDomainsToTrack": []
    }
  }
};
const requestedInteraction = {
  "id": "c84b8fb2-bb59-4402-b878-f28fa263e8d7",
  "version": 4,
  "name": "Journey Name",
  "description": "",
  "workflowApiVersion": 1,
  "entryMode": "MultipleEntries",
  "activities": [{
    "key": "REST-1",
    "name": "Issue 15% Discount",
    "description": "",
    "type": "REST",
    "outcomes": [{
      "key": "686b5fff-3dc9-4277-b859-776a9d58a05b",
      "next": "WAITBYDURATION-9",
      "arguments": {},
      "metaData": {
        "invalid": false
      }
    }],
    "schema": {
      "arguments": {
        "execute": {
          "inArguments": [],
          "outArguments": [{
            "discountCode": {
              "dataType": "Text",
              "isNullable": false,
              "direction": "Out",
              "readOnly": false,
              "access": "Visible"
            },
            "discount": {
              "dataType": "Number",
              "isNullable": false,
              "direction": "Out",
              "readOnly": false,
              "access": "Visible"
            }
          }]
        }
      }
    },
    "metaData": {
      "icon": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-code/images/icon.svg",
      "category": "customer",
      "iconSmall": "",
      "statsContactIcon": "",
      "original_icon": "images/icon.svg",
      "isConfigured": true
    },
    "arguments": {
      "executionMode": "{{Context.ExecutionMode}}",
      "definitionId": "{{Context.DefinitionId}}",
      "activityId": "{{Activity.Id}}",
      "contactKey": "{{Context.ContactKey}}",
      "execute": {
        "inArguments": [{
          "discount": "15"
        }],
        "outArguments": [],
        "url": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-code/execute",
        "timeout": 10000,
        "retryCount": 3,
        "retryDelay": 0
      },
      "testExecute": "",
      "startActivityKey": "{{Context.StartActivityKey}}",
      "definitionInstanceId": "{{Context.DefinitionInstanceId}}",
      "requestObjectId": "{{Context.RequestObjectId}}"
    },
    "configurationArguments": {
      "save": "",
      "testSave": "",
      "publish": {
        "url": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-code/publish"
      },
      "testPublish": "",
      "unpublish": "",
      "stop": {
        "url": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-code/stop"
      },
      "testStop": "",
      "testUnpublish": "",
      "partnerActivityId": "",
      "validate": {
        "url": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-code/validate"
      },
      "testValidate": "",
      "outArgumentSchema": {
        "discountCode": {
          "dataType": "Text",
          "isNullable": false,
          "direction": "Out",
          "readOnly": false,
          "access": "Visible"
        },
        "discount": {
          "dataType": "Number",
          "isNullable": false,
          "direction": "Out",
          "readOnly": false,
          "access": "Visible"
        }
      },
      "applicationExtensionKey": "104a5141-b917-4c10-ad79-eccfd8cc7167"
    }
  }, {
    "key": "WAITBYDURATION-9",
    "name": "1 minute",
    "description": "",
    "type": "WAIT",
    "outcomes": [{
      "key": "c08f32ca-e08a-4223-952e-16a1bb148d57",
      "next": "REST-2",
      "arguments": {},
      "metaData": {
        "invalid": false
      }
    }],
    "schema": {
      "arguments": {
        "endDate": {
          "dataType": "Date",
          "isNullable": false,
          "direction": "Out",
          "readOnly": false,
          "access": "Hidden"
        },
        "waitEndDateAttributeDataBound": {
          "dataType": "Text",
          "isNullable": true,
          "direction": "In",
          "readOnly": false,
          "access": "Hidden"
        },
        "waitDefinitionId": {
          "dataType": "Text",
          "isNullable": false,
          "direction": "In",
          "readOnly": false,
          "access": "Hidden"
        },
        "waitForEventId": {
          "dataType": "Text",
          "isNullable": true,
          "direction": "In",
          "readOnly": false,
          "access": "Hidden"
        },
        "executionMode": {
          "dataType": "Text",
          "isNullable": false,
          "direction": "In",
          "readOnly": false,
          "access": "Hidden"
        },
        "startActivityKey": {
          "dataType": "Text",
          "isNullable": true,
          "direction": "In",
          "readOnly": false,
          "access": "Hidden"
        },
        "waitQueueId": {
          "dataType": "LongNumber",
          "isNullable": true,
          "direction": "In",
          "readOnly": false,
          "access": "Hidden"
        }
      }
    },
    "metaData": {
      "isConfigured": true,
      "isExtended": false,
      "waitType": "duration",
      "guidanceCardKey": "",
      "uiType": "WAITBYDURATION"
    },
    "arguments": {
      "waitEndDateAttributeDataBound": "",
      "waitDefinitionId": "5e378903-f3c6-44d2-a814-901980bc4698",
      "waitForEventId": "",
      "executionMode": "{{Context.ExecutionMode}}",
      "startActivityKey": "{{Context.StartActivityKey}}",
      "waitQueueId": "{{Context.WaitQueueId}}"
    },
    "configurationArguments": {
      "waitDuration": 1,
      "waitUnit": "MINUTES",
      "specifiedTime": "00:00",
      "timeZone": "Eastern Standard Time",
      "description": "",
      "waitEndDateAttributeExpression": "",
      "specificDate": "",
      "waitForEventKey": ""
    }
  }, {
    "key": "REST-2",
    "name": "My Split Activity",
    "description": "",
    "type": "REST",
    "outcomes": [{
      "key": "72997ab9-896e-472f-9551-629a26d2e0ab",
      "next": "WAITBYDURATION-1",
      "arguments": {
        "branchResult": "no_activity"
      },
      "metaData": {
        "label": "No Activity",
        "invalid": false
      }
    }, {
      "key": "9e275a12-6216-4526-94f0-0d4767faa7b8",
      "next": "WAITBYDURATION-2",
      "arguments": {
        "branchResult": "viewed_item"
      },
      "metaData": {
        "label": "Viewed Item",
        "invalid": false
      }
    }, {
      "key": "8959088e-5d23-4522-b25a-856d06d23763",
      "next": "REST-3",
      "arguments": {
        "branchResult": "abandoned_cart"
      },
      "metaData": {
        "label": "Abandoned Cart",
        "invalid": false
      }
    }, {
      "key": "0bb3b908-3e88-49e8-bd64-05ba820ac9c2",
      "next": "WAITBYDURATION-4",
      "arguments": {
        "branchResult": "purchased_item"
      },
      "metaData": {
        "label": "Purchased Item",
        "invalid": false
      }
    }, {
      "key": "9027e384-6b1e-4380-b61c-fce51e76446d",
      "next": "WAITBYDURATION-5",
      "arguments": {
        "branchResult": "invalid_code"
      },
      "metaData": {
        "label": "Invalid Code",
        "invalid": false
      }
    }],
    "schema": {
      "arguments": {
        "execute": {
          "inArguments": [{
            "discountCode": {
              "dataType": "Text",
              "isNullable": false,
              "direction": "In",
              "readOnly": false,
              "access": "Visible"
            },
            "discount": {
              "dataType": "Number",
              "isNullable": false,
              "direction": "In",
              "readOnly": false,
              "access": "Visible"
            }
          }],
          "outArguments": []
        }
      }
    },
    "metaData": {
      "icon": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-redemption-split/images/icon.svg",
      "category": "customer",
      "iconSmall": "",
      "statsContactIcon": "",
      "original_icon": "images/icon.svg",
      "isConfigured": true
    },
    "arguments": {
      "executionMode": "{{Context.ExecutionMode}}",
      "definitionId": "{{Context.DefinitionId}}",
      "activityId": "{{Activity.Id}}",
      "contactKey": "{{Context.ContactKey}}",
      "execute": {
        "inArguments": [{
          "discount": "{{Context.discount}}"
        }, {
          "discountCode": "{{Context.discountCode}}"
        }],
        "outArguments": [],
        "url": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-redemption-split/execute"
      },
      "testExecute": "",
      "startActivityKey": "{{Context.StartActivityKey}}",
      "definitionInstanceId": "{{Context.DefinitionInstanceId}}",
      "requestObjectId": "{{Context.RequestObjectId}}"
    },
    "configurationArguments": {
      "save": {
        "url": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-redemption-split/save"
      },
      "testSave": "",
      "publish": {
        "url": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-redemption-split/publish"
      },
      "testPublish": "",
      "unpublish": "",
      "stop": {
        "url": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-redemption-split/stop"
      },
      "testStop": "",
      "testUnpublish": "",
      "partnerActivityId": "",
      "validate": {
        "url": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-redemption-split/validate"
      },
      "testValidate": "",
      "outArgumentSchema": {},
      "applicationExtensionKey": "c1d8e65d-8551-4501-a9c0-af8224aa6dc9"
    }
  }, {
    "key": "WAITBYDURATION-1",
    "name": "1 minute",
    "description": "",
    "type": "WAIT",
    "outcomes": [{
      "key": "a5563a06-a135-4b78-a57c-55d276e904b8",
      "arguments": {},
      "metaData": {
        "invalid": false
      },
      "next": null
    }],
    "schema": {
      "arguments": {
        "endDate": {
          "dataType": "Date",
          "isNullable": false,
          "direction": "Out",
          "readOnly": false,
          "access": "Hidden"
        },
        "waitEndDateAttributeDataBound": {
          "dataType": "Text",
          "isNullable": true,
          "direction": "In",
          "readOnly": false,
          "access": "Hidden"
        },
        "waitDefinitionId": {
          "dataType": "Text",
          "isNullable": false,
          "direction": "In",
          "readOnly": false,
          "access": "Hidden"
        },
        "waitForEventId": {
          "dataType": "Text",
          "isNullable": true,
          "direction": "In",
          "readOnly": false,
          "access": "Hidden"
        },
        "executionMode": {
          "dataType": "Text",
          "isNullable": false,
          "direction": "In",
          "readOnly": false,
          "access": "Hidden"
        },
        "startActivityKey": {
          "dataType": "Text",
          "isNullable": true,
          "direction": "In",
          "readOnly": false,
          "access": "Hidden"
        },
        "waitQueueId": {
          "dataType": "LongNumber",
          "isNullable": true,
          "direction": "In",
          "readOnly": false,
          "access": "Hidden"
        }
      }
    },
    "metaData": {
      "isConfigured": true,
      "isExtended": false,
      "waitType": "duration",
      "guidanceCardKey": "",
      "uiType": "WAITBYDURATION"
    },
    "arguments": {
      "waitEndDateAttributeDataBound": "",
      "waitDefinitionId": "3a40a934-9f64-4b66-9658-26baa4452504",
      "waitForEventId": "",
      "executionMode": "{{Context.ExecutionMode}}",
      "startActivityKey": "{{Context.StartActivityKey}}",
      "waitQueueId": "{{Context.WaitQueueId}}"
    },
    "configurationArguments": {
      "waitDuration": 1,
      "waitUnit": "MINUTES",
      "specifiedTime": "00:00",
      "timeZone": "Eastern Standard Time",
      "description": "",
      "waitEndDateAttributeExpression": "",
      "specificDate": "",
      "waitForEventKey": ""
    }
  }, {
    "key": "WAITBYDURATION-2",
    "name": "1 minute",
    "description": "",
    "type": "WAIT",
    "outcomes": [{
      "key": "e14fb4c3-e503-40e6-9497-aa9475ca0b11",
      "arguments": {},
      "metaData": {
        "invalid": false
      },
      "next": null
    }],
    "schema": {
      "arguments": {
        "endDate": {
          "dataType": "Date",
          "isNullable": false,
          "direction": "Out",
          "readOnly": false,
          "access": "Hidden"
        },
        "waitEndDateAttributeDataBound": {
          "dataType": "Text",
          "isNullable": true,
          "direction": "In",
          "readOnly": false,
          "access": "Hidden"
        },
        "waitDefinitionId": {
          "dataType": "Text",
          "isNullable": false,
          "direction": "In",
          "readOnly": false,
          "access": "Hidden"
        },
        "waitForEventId": {
          "dataType": "Text",
          "isNullable": true,
          "direction": "In",
          "readOnly": false,
          "access": "Hidden"
        },
        "executionMode": {
          "dataType": "Text",
          "isNullable": false,
          "direction": "In",
          "readOnly": false,
          "access": "Hidden"
        },
        "startActivityKey": {
          "dataType": "Text",
          "isNullable": true,
          "direction": "In",
          "readOnly": false,
          "access": "Hidden"
        },
        "waitQueueId": {
          "dataType": "LongNumber",
          "isNullable": true,
          "direction": "In",
          "readOnly": false,
          "access": "Hidden"
        }
      }
    },
    "metaData": {
      "isConfigured": true,
      "isExtended": false,
      "waitType": "duration",
      "guidanceCardKey": "",
      "uiType": "WAITBYDURATION"
    },
    "arguments": {
      "waitEndDateAttributeDataBound": "",
      "waitDefinitionId": "fe043dc7-db68-4825-a0f9-a19727349e77",
      "waitForEventId": "",
      "executionMode": "{{Context.ExecutionMode}}",
      "startActivityKey": "{{Context.StartActivityKey}}",
      "waitQueueId": "{{Context.WaitQueueId}}"
    },
    "configurationArguments": {
      "waitDuration": 1,
      "waitUnit": "MINUTES",
      "specifiedTime": "00:00",
      "timeZone": "Eastern Standard Time",
      "description": "",
      "waitEndDateAttributeExpression": "",
      "specificDate": "",
      "waitForEventKey": ""
    }
  }, {
    "type": "REST",
    "key": "REST-3",
    "name": "Issue 20% Discount",
    "outcomes": [{
      "key": "5288567f-b7b9-49ba-9877-a675b27b3705",
      "next": "WAITBYDURATION-3",
      "arguments": {},
      "metaData": {
        "invalid": false
      }
    }],
    "schema": {
      "arguments": {
        "execute": {
          "inArguments": [],
          "outArguments": [{
            "discountCode": {
              "dataType": "Text",
              "isNullable": false,
              "direction": "Out",
              "readOnly": false,
              "access": "Visible"
            },
            "discount": {
              "dataType": "Number",
              "isNullable": false,
              "direction": "Out",
              "readOnly": false,
              "access": "Visible"
            }
          }]
        }
      }
    },
    "description": "",
    "metaData": {
      "icon": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-code/images/icon.svg",
      "category": "customer",
      "iconSmall": null,
      "statsContactIcon": null,
      "original_icon": "images/icon.svg",
      "isConfigured": true
    },
    "arguments": {
      "execute": {
        "inArguments": [{
          "discount": "20"
        }],
        "outArguments": [],
        "url": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-code/execute",
        "timeout": 10000,
        "retryCount": 3,
        "retryDelay": 0
      }
    },
    "configurationArguments": {
      "publish": {
        "url": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-code/publish"
      },
      "validate": {
        "url": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-code/validate"
      },
      "stop": {
        "url": "https://sfmc-example-custom-activity.herokuapp.com/modules/discount-code/stop"
      },
      "applicationExtensionKey": "104a5141-b917-4c10-ad79-eccfd8cc7167"
    }
  }, {
    "key": "WAITBYDURATION-3",
    "name": "1 minute",
    "description": "",
    "type": "WAIT",
    "outcomes": [{
      "key": "1abd91de-4b01-438e-b7d1-d4219715fa2b",
      "arguments": {},
      "metaData": {
        "invalid": false
      },
      "next": null
    }],
    "schema": {
      "arguments": {
        "endDate": {
          "dataType": "Date",
          "isNullable": false,
          "direction": "Out",
          "readOnly": false,
          "access": "Hidden"
        },
        "waitEndDateAttributeDataBound": {
          "dataType": "Text",
          "isNullable": true,
          "direction": "In",
          "readOnly": false,
          "access": "Hidden"
        },
        "waitDefinitionId": {
          "dataType": "Text",
          "isNullable": false,
          "direction": "In",
          "readOnly": false,
          "access": "Hidden"
        },
        "waitForEventId": {
          "dataType": "Text",
          "isNullable": true,
          "direction": "In",
          "readOnly": false,
          "access": "Hidden"
        },
        "executionMode": {
          "dataType": "Text",
          "isNullable": false,
          "direction": "In",
          "readOnly": false,
          "access": "Hidden"
        },
        "startActivityKey": {
          "dataType": "Text",
          "isNullable": true,
          "direction": "In",
          "readOnly": false,
          "access": "Hidden"
        },
        "waitQueueId": {
          "dataType": "LongNumber",
          "isNullable": true,
          "direction": "In",
          "readOnly": false,
          "access": "Hidden"
        }
      }
    },
    "metaData": {
      "isConfigured": true,
      "isExtended": false,
      "waitType": "duration",
      "guidanceCardKey": "",
      "uiType": "WAITBYDURATION"
    },
    "arguments": {
      "waitEndDateAttributeDataBound": "",
      "waitDefinitionId": "3b5602cd-17fb-4b39-b922-23d828fc1f5d",
      "waitForEventId": "",
      "executionMode": "{{Context.ExecutionMode}}",
      "startActivityKey": "{{Context.StartActivityKey}}",
      "waitQueueId": "{{Context.WaitQueueId}}"
    },
    "configurationArguments": {
      "waitDuration": 1,
      "waitUnit": "MINUTES",
      "specifiedTime": "00:00",
      "timeZone": "Eastern Standard Time",
      "description": "",
      "waitEndDateAttributeExpression": "",
      "specificDate": "",
      "waitForEventKey": ""
    }
  }, {
    "key": "WAITBYDURATION-4",
    "name": "1 minute",
    "description": "",
    "type": "WAIT",
    "outcomes": [{
      "key": "3c44a48f-042d-4833-b288-2557613be3e7",
      "arguments": {},
      "metaData": {
        "invalid": false
      },
      "next": null
    }],
    "schema": {
      "arguments": {
        "endDate": {
          "dataType": "Date",
          "isNullable": false,
          "direction": "Out",
          "readOnly": false,
          "access": "Hidden"
        },
        "waitEndDateAttributeDataBound": {
          "dataType": "Text",
          "isNullable": true,
          "direction": "In",
          "readOnly": false,
          "access": "Hidden"
        },
        "waitDefinitionId": {
          "dataType": "Text",
          "isNullable": false,
          "direction": "In",
          "readOnly": false,
          "access": "Hidden"
        },
        "waitForEventId": {
          "dataType": "Text",
          "isNullable": true,
          "direction": "In",
          "readOnly": false,
          "access": "Hidden"
        },
        "executionMode": {
          "dataType": "Text",
          "isNullable": false,
          "direction": "In",
          "readOnly": false,
          "access": "Hidden"
        },
        "startActivityKey": {
          "dataType": "Text",
          "isNullable": true,
          "direction": "In",
          "readOnly": false,
          "access": "Hidden"
        },
        "waitQueueId": {
          "dataType": "LongNumber",
          "isNullable": true,
          "direction": "In",
          "readOnly": false,
          "access": "Hidden"
        }
      }
    },
    "metaData": {
      "isConfigured": true,
      "isExtended": false,
      "waitType": "duration",
      "guidanceCardKey": "",
      "uiType": "WAITBYDURATION"
    },
    "arguments": {
      "waitEndDateAttributeDataBound": "",
      "waitDefinitionId": "2f2f2ecf-1afc-44cb-ae67-fef335b03edd",
      "waitForEventId": "",
      "executionMode": "{{Context.ExecutionMode}}",
      "startActivityKey": "{{Context.StartActivityKey}}",
      "waitQueueId": "{{Context.WaitQueueId}}"
    },
    "configurationArguments": {
      "waitDuration": 1,
      "waitUnit": "MINUTES",
      "specifiedTime": "00:00",
      "timeZone": "Eastern Standard Time",
      "description": "",
      "waitEndDateAttributeExpression": "",
      "specificDate": "",
      "waitForEventKey": ""
    }
  }, {
    "key": "WAITBYDURATION-5",
    "name": "1 minute",
    "description": "",
    "type": "WAIT",
    "outcomes": [{
      "key": "fbc33aea-3924-42fe-885a-911dff080f18",
      "arguments": {},
      "metaData": {
        "invalid": false
      },
      "next": null
    }],
    "schema": {
      "arguments": {
        "endDate": {
          "dataType": "Date",
          "isNullable": false,
          "direction": "Out",
          "readOnly": false,
          "access": "Hidden"
        },
        "waitEndDateAttributeDataBound": {
          "dataType": "Text",
          "isNullable": true,
          "direction": "In",
          "readOnly": false,
          "access": "Hidden"
        },
        "waitDefinitionId": {
          "dataType": "Text",
          "isNullable": false,
          "direction": "In",
          "readOnly": false,
          "access": "Hidden"
        },
        "waitForEventId": {
          "dataType": "Text",
          "isNullable": true,
          "direction": "In",
          "readOnly": false,
          "access": "Hidden"
        },
        "executionMode": {
          "dataType": "Text",
          "isNullable": false,
          "direction": "In",
          "readOnly": false,
          "access": "Hidden"
        },
        "startActivityKey": {
          "dataType": "Text",
          "isNullable": true,
          "direction": "In",
          "readOnly": false,
          "access": "Hidden"
        },
        "waitQueueId": {
          "dataType": "LongNumber",
          "isNullable": true,
          "direction": "In",
          "readOnly": false,
          "access": "Hidden"
        }
      }
    },
    "metaData": {
      "isConfigured": true,
      "isExtended": false,
      "waitType": "duration",
      "guidanceCardKey": "",
      "uiType": "WAITBYDURATION"
    },
    "arguments": {
      "waitEndDateAttributeDataBound": "",
      "waitDefinitionId": "52b04ac2-4d95-4ff6-b687-a41cc5041861",
      "waitForEventId": "",
      "executionMode": "{{Context.ExecutionMode}}",
      "startActivityKey": "{{Context.StartActivityKey}}",
      "waitQueueId": "{{Context.WaitQueueId}}"
    },
    "configurationArguments": {
      "waitDuration": 1,
      "waitUnit": "MINUTES",
      "specifiedTime": "00:00",
      "timeZone": "Eastern Standard Time",
      "description": "",
      "waitEndDateAttributeExpression": "",
      "specificDate": "",
      "waitForEventKey": ""
    }
  }],
  "persistenceModel_asyncStopping": {},
  "persistenceModel_pausing": {},
  "persistenceModel_resuming": {},
  "metaData": {
    "highThroughputSending": {
      "email": false
    }
  },
  "key": "6afdb8ca-312e-d6bd-f7ca-4f91ca68d7db",
  "createdDate": "2020-04-22T01:58:23.000Z",
  "modifiedDate": "2020-04-22T02:47:31.000Z",
  "goals": [],
  "exits": [],
  "definitionType": "Multistep",
  "channel": "",
  "executionMode": "Production",
  "categoryId": 20718,
  "definitionId": "d59cff7e-a90f-4af5-8cee-5451044fcdda",
  "scheduledStatus": "Draft",
  "defaults": {
    "email": ["{{Event.DEAudience-835d6d25-dd61-b2b3-6a04-68c073afe732.\"Email\"}}"],
    "mobileNumber": [],
    "transactionKeys": null,
    "properties": {
      "analyticsTracking": {
        "enabled": false,
        "analyticsType": "google",
        "urlDomainsToTrack": []
      }
    }
  },
  "triggers": [{
    "key": "TRIGGER",
    "name": "TRIGGER",
    "description": "",
    "type": "EmailAudience",
    "arguments": {
      "startActivityKey": "{{Context.StartActivityKey}}",
      "dequeueReason": "{{Context.DequeueReason}}",
      "lastExecutedActivityKey": "{{Context.LastExecutedActivityKey}}",
      "filterResult": "true"
    },
    "configurationArguments": {
      "filterDefinitionId": "00000000-0000-0000-0000-000000000000",
      "criteria": "",
      "schemaVersionId": 0
    },
    "metaData": {
      "sourceInteractionId": "00000000-0000-0000-0000-000000000000",
      "eventDefinitionId": "A5599B62-B80F-4237-978C-9EF48C115D68",
      "eventDefinitionKey": "DEAudience-835d6d25-dd61-b2b3-6a04-68c073afe732",
      "chainType": "none",
      "configurationRequired": false,
      "iconUrl": "/images/icon-data-extension.svg",
      "title": "Data Extension",
      "entrySourceGroupConfigUrl": "jb:///data/entry/audience/entrysourcegroupconfig.json"
    }
  }],
  "transactionKeys": null,
  "status": "DRAFT"
};
/* harmony default export */ __webpack_exports__["default"] = ({
  onInitActivity: onInitActivity,
  requestedInteractionDefaults: requestedInteractionDefaults,
  requestedInteraction: requestedInteraction
});

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
//# sourceMappingURL=split-activity.js.map