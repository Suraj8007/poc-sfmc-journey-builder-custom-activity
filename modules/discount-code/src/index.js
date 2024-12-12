// JOURNEY BUILDER CUSTOM ACTIVITY - discountCode ACTIVITY
// ````````````````````````````````````````````````````````````
// This example demonstrates a custom activity that utilizes an external service to generate
// a discount code where the user inputs the discount percent in the configuration.

import Postmonger from "postmonger";

// Create a new connection for this session.
const connection = new Postmonger.Session();

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
      activity["arguments"].execute.inArguments[0][
        `${attr.substring(keyIndex)}`
      ] = "{{" + attr + "}}";
    }
  });

  console.log("activity:", JSON.stringify(activity, null, 4));
  const hasInArguments = Boolean(
    activity.arguments &&
      activity.arguments.execute &&
      activity.arguments.execute.inArguments.length > 0
  );
  const inArguments = hasInArguments
    ? activity.arguments.execute.inArguments
    : [];

  // Check if a discount code back argument was set.
  const discountArgument = inArguments.find((arg) => arg.discount);
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
  activity.arguments.execute.inArguments = [
    {
      discount: discountValue,
      EmailAddress: emailAddress,
      firstName: "{{Contact.Attribute.FirstName}}",
    },
  ];

  activity.name = `Issue ${activity.arguments.execute.inArguments[0].discount}% Code`;

  console.log(
    "sending message back to updateActivity",
    JSON.stringify(activity, null, 4)
  );
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
  document
    .getElementById("cancel")
    .addEventListener("click", onCancelButtonClick);
  document
    .getElementById("discount-code")
    .addEventListener("change", onDiscountCodeSelectChange);

  // Listen for changes in the custom discount code input field
  document
    .getElementById("custom-discount-code")
    .addEventListener("input", function () {
      connection.trigger("setActivityDirtyState", true); // Mark the activity as dirty
      if (document.getElementById("custom-discount-code").value) {
        document.getElementById("done").removeAttribute("disabled");
      } else {
        document.getElementById("done").setAttribute("disabled", "");
      }
    });
}

// This function is for example purposes only. It sets up a Postmonger session that emulates how Journey Builder works.
function setupExampleTestHarness() {
  const isLocalhost =
    location.hostname === "localhost" || location.hostname === "127.0.0.1";
  if (!isLocalhost) {
    return;
  }

  const jbSession = new Postmonger.Session();
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
          inArguments: [
            {
              discount: 10,
            },
          ],
          outArguments: [],
        },
        startActivityKey: "{{Context.StartActivityKey}}",
        definitionInstanceId: "{{Context.DefinitionInstanceId}}",
        requestObjectId: "{{Context.RequestObjectId}}",
      },
    });
  };
}
