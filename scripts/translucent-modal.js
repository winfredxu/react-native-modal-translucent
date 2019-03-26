const fs = require("fs-extra");
const path = require("path");

let modal;
if (__dirname.search("node_modules") === -1) {
  modal = path.resolve(
    __dirname,
    "../node_modules/react-native/Libraries/Modal/RCTModalHostViewNativeComponent.js"
  );
} else {
  modal = path.resolve(
    __dirname,
    "../../react-native/Libraries/Modal/RCTModalHostViewNativeComponent.js"
  );
}

fs.readFile(modal, "utf8", function(err, data) {
  if (data.search("TranslucentModalHostView") === -1) {
    var str = data.replace(
      `'RCTModalHostView'`,
      `Platform.OS === 'ios' ? 'RCTModalHostView' : 'TranslucentModalHostView'`
    );

    str = str.replace(
      `'use strict';`,
      `'use strict'; import { Platform } from 'react-native';`
    )

    fs.outputFile(modal, str);
  }
});
