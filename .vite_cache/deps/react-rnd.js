import {
  require_react_dom
} from "./chunk-4AJF6FOG.js";
import {
  require_jsx_runtime
} from "./chunk-CN66GVJG.js";
import {
  require_react
} from "./chunk-GWAROZSO.js";
import {
  __commonJS,
  __esm,
  __export,
  __toCommonJS,
  __toESM
} from "./chunk-V4OQ3NZ2.js";

// node_modules/react-is/cjs/react-is.development.js
var require_react_is_development = __commonJS({
  "node_modules/react-is/cjs/react-is.development.js"(exports) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        var hasSymbol = typeof Symbol === "function" && Symbol.for;
        var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103;
        var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106;
        var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107;
        var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108;
        var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114;
        var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109;
        var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110;
        var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for("react.async_mode") : 60111;
        var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for("react.concurrent_mode") : 60111;
        var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112;
        var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113;
        var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 60120;
        var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115;
        var REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116;
        var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121;
        var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for("react.fundamental") : 60117;
        var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 60118;
        var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 60119;
        function isValidElementType(type) {
          return typeof type === "string" || typeof type === "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
          type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
        }
        function typeOf(object) {
          if (typeof object === "object" && object !== null) {
            var $$typeof = object.$$typeof;
            switch ($$typeof) {
              case REACT_ELEMENT_TYPE:
                var type = object.type;
                switch (type) {
                  case REACT_ASYNC_MODE_TYPE:
                  case REACT_CONCURRENT_MODE_TYPE:
                  case REACT_FRAGMENT_TYPE:
                  case REACT_PROFILER_TYPE:
                  case REACT_STRICT_MODE_TYPE:
                  case REACT_SUSPENSE_TYPE:
                    return type;
                  default:
                    var $$typeofType = type && type.$$typeof;
                    switch ($$typeofType) {
                      case REACT_CONTEXT_TYPE:
                      case REACT_FORWARD_REF_TYPE:
                      case REACT_LAZY_TYPE:
                      case REACT_MEMO_TYPE:
                      case REACT_PROVIDER_TYPE:
                        return $$typeofType;
                      default:
                        return $$typeof;
                    }
                }
              case REACT_PORTAL_TYPE:
                return $$typeof;
            }
          }
          return void 0;
        }
        var AsyncMode = REACT_ASYNC_MODE_TYPE;
        var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
        var ContextConsumer = REACT_CONTEXT_TYPE;
        var ContextProvider = REACT_PROVIDER_TYPE;
        var Element2 = REACT_ELEMENT_TYPE;
        var ForwardRef = REACT_FORWARD_REF_TYPE;
        var Fragment = REACT_FRAGMENT_TYPE;
        var Lazy = REACT_LAZY_TYPE;
        var Memo = REACT_MEMO_TYPE;
        var Portal = REACT_PORTAL_TYPE;
        var Profiler = REACT_PROFILER_TYPE;
        var StrictMode = REACT_STRICT_MODE_TYPE;
        var Suspense = REACT_SUSPENSE_TYPE;
        var hasWarnedAboutDeprecatedIsAsyncMode = false;
        function isAsyncMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsAsyncMode) {
              hasWarnedAboutDeprecatedIsAsyncMode = true;
              console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.");
            }
          }
          return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
        }
        function isConcurrentMode(object) {
          return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
        }
        function isContextConsumer(object) {
          return typeOf(object) === REACT_CONTEXT_TYPE;
        }
        function isContextProvider(object) {
          return typeOf(object) === REACT_PROVIDER_TYPE;
        }
        function isElement(object) {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        function isForwardRef(object) {
          return typeOf(object) === REACT_FORWARD_REF_TYPE;
        }
        function isFragment(object) {
          return typeOf(object) === REACT_FRAGMENT_TYPE;
        }
        function isLazy(object) {
          return typeOf(object) === REACT_LAZY_TYPE;
        }
        function isMemo(object) {
          return typeOf(object) === REACT_MEMO_TYPE;
        }
        function isPortal(object) {
          return typeOf(object) === REACT_PORTAL_TYPE;
        }
        function isProfiler(object) {
          return typeOf(object) === REACT_PROFILER_TYPE;
        }
        function isStrictMode(object) {
          return typeOf(object) === REACT_STRICT_MODE_TYPE;
        }
        function isSuspense(object) {
          return typeOf(object) === REACT_SUSPENSE_TYPE;
        }
        exports.AsyncMode = AsyncMode;
        exports.ConcurrentMode = ConcurrentMode;
        exports.ContextConsumer = ContextConsumer;
        exports.ContextProvider = ContextProvider;
        exports.Element = Element2;
        exports.ForwardRef = ForwardRef;
        exports.Fragment = Fragment;
        exports.Lazy = Lazy;
        exports.Memo = Memo;
        exports.Portal = Portal;
        exports.Profiler = Profiler;
        exports.StrictMode = StrictMode;
        exports.Suspense = Suspense;
        exports.isAsyncMode = isAsyncMode;
        exports.isConcurrentMode = isConcurrentMode;
        exports.isContextConsumer = isContextConsumer;
        exports.isContextProvider = isContextProvider;
        exports.isElement = isElement;
        exports.isForwardRef = isForwardRef;
        exports.isFragment = isFragment;
        exports.isLazy = isLazy;
        exports.isMemo = isMemo;
        exports.isPortal = isPortal;
        exports.isProfiler = isProfiler;
        exports.isStrictMode = isStrictMode;
        exports.isSuspense = isSuspense;
        exports.isValidElementType = isValidElementType;
        exports.typeOf = typeOf;
      })();
    }
  }
});

// node_modules/react-is/index.js
var require_react_is = __commonJS({
  "node_modules/react-is/index.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_is_development();
    }
  }
});

// node_modules/object-assign/index.js
var require_object_assign = __commonJS({
  "node_modules/object-assign/index.js"(exports, module) {
    "use strict";
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;
    function toObject(val) {
      if (val === null || val === void 0) {
        throw new TypeError("Object.assign cannot be called with null or undefined");
      }
      return Object(val);
    }
    function shouldUseNative() {
      try {
        if (!Object.assign) {
          return false;
        }
        var test1 = new String("abc");
        test1[5] = "de";
        if (Object.getOwnPropertyNames(test1)[0] === "5") {
          return false;
        }
        var test2 = {};
        for (var i = 0; i < 10; i++) {
          test2["_" + String.fromCharCode(i)] = i;
        }
        var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
          return test2[n];
        });
        if (order2.join("") !== "0123456789") {
          return false;
        }
        var test3 = {};
        "abcdefghijklmnopqrst".split("").forEach(function(letter) {
          test3[letter] = letter;
        });
        if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    }
    module.exports = shouldUseNative() ? Object.assign : function(target, source) {
      var from;
      var to = toObject(target);
      var symbols;
      for (var s = 1; s < arguments.length; s++) {
        from = Object(arguments[s]);
        for (var key in from) {
          if (hasOwnProperty.call(from, key)) {
            to[key] = from[key];
          }
        }
        if (getOwnPropertySymbols) {
          symbols = getOwnPropertySymbols(from);
          for (var i = 0; i < symbols.length; i++) {
            if (propIsEnumerable.call(from, symbols[i])) {
              to[symbols[i]] = from[symbols[i]];
            }
          }
        }
      }
      return to;
    };
  }
});

// node_modules/prop-types/lib/ReactPropTypesSecret.js
var require_ReactPropTypesSecret = __commonJS({
  "node_modules/prop-types/lib/ReactPropTypesSecret.js"(exports, module) {
    "use strict";
    var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
    module.exports = ReactPropTypesSecret;
  }
});

// node_modules/prop-types/lib/has.js
var require_has = __commonJS({
  "node_modules/prop-types/lib/has.js"(exports, module) {
    module.exports = Function.call.bind(Object.prototype.hasOwnProperty);
  }
});

// node_modules/prop-types/checkPropTypes.js
var require_checkPropTypes = __commonJS({
  "node_modules/prop-types/checkPropTypes.js"(exports, module) {
    "use strict";
    var printWarning = function() {
    };
    if (true) {
      ReactPropTypesSecret = require_ReactPropTypesSecret();
      loggedTypeFailures = {};
      has = require_has();
      printWarning = function(text) {
        var message = "Warning: " + text;
        if (typeof console !== "undefined") {
          console.error(message);
        }
        try {
          throw new Error(message);
        } catch (x) {
        }
      };
    }
    var ReactPropTypesSecret;
    var loggedTypeFailures;
    var has;
    function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
      if (true) {
        for (var typeSpecName in typeSpecs) {
          if (has(typeSpecs, typeSpecName)) {
            var error;
            try {
              if (typeof typeSpecs[typeSpecName] !== "function") {
                var err = Error(
                  (componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
                );
                err.name = "Invariant Violation";
                throw err;
              }
              error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
            } catch (ex) {
              error = ex;
            }
            if (error && !(error instanceof Error)) {
              printWarning(
                (componentName || "React class") + ": type specification of " + location + " `" + typeSpecName + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof error + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
              );
            }
            if (error instanceof Error && !(error.message in loggedTypeFailures)) {
              loggedTypeFailures[error.message] = true;
              var stack = getStack ? getStack() : "";
              printWarning(
                "Failed " + location + " type: " + error.message + (stack != null ? stack : "")
              );
            }
          }
        }
      }
    }
    checkPropTypes.resetWarningCache = function() {
      if (true) {
        loggedTypeFailures = {};
      }
    };
    module.exports = checkPropTypes;
  }
});

// node_modules/prop-types/factoryWithTypeCheckers.js
var require_factoryWithTypeCheckers = __commonJS({
  "node_modules/prop-types/factoryWithTypeCheckers.js"(exports, module) {
    "use strict";
    var ReactIs = require_react_is();
    var assign = require_object_assign();
    var ReactPropTypesSecret = require_ReactPropTypesSecret();
    var has = require_has();
    var checkPropTypes = require_checkPropTypes();
    var printWarning = function() {
    };
    if (true) {
      printWarning = function(text) {
        var message = "Warning: " + text;
        if (typeof console !== "undefined") {
          console.error(message);
        }
        try {
          throw new Error(message);
        } catch (x) {
        }
      };
    }
    function emptyFunctionThatReturnsNull() {
      return null;
    }
    module.exports = function(isValidElement, throwOnDirectAccess) {
      var ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
        if (typeof iteratorFn === "function") {
          return iteratorFn;
        }
      }
      var ANONYMOUS = "<<anonymous>>";
      var ReactPropTypes = {
        array: createPrimitiveTypeChecker("array"),
        bigint: createPrimitiveTypeChecker("bigint"),
        bool: createPrimitiveTypeChecker("boolean"),
        func: createPrimitiveTypeChecker("function"),
        number: createPrimitiveTypeChecker("number"),
        object: createPrimitiveTypeChecker("object"),
        string: createPrimitiveTypeChecker("string"),
        symbol: createPrimitiveTypeChecker("symbol"),
        any: createAnyTypeChecker(),
        arrayOf: createArrayOfTypeChecker,
        element: createElementTypeChecker(),
        elementType: createElementTypeTypeChecker(),
        instanceOf: createInstanceTypeChecker,
        node: createNodeChecker(),
        objectOf: createObjectOfTypeChecker,
        oneOf: createEnumTypeChecker,
        oneOfType: createUnionTypeChecker,
        shape: createShapeTypeChecker,
        exact: createStrictShapeTypeChecker
      };
      function is(x, y) {
        if (x === y) {
          return x !== 0 || 1 / x === 1 / y;
        } else {
          return x !== x && y !== y;
        }
      }
      function PropTypeError(message, data) {
        this.message = message;
        this.data = data && typeof data === "object" ? data : {};
        this.stack = "";
      }
      PropTypeError.prototype = Error.prototype;
      function createChainableTypeChecker(validate) {
        if (true) {
          var manualPropTypeCallCache = {};
          var manualPropTypeWarningCount = 0;
        }
        function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
          componentName = componentName || ANONYMOUS;
          propFullName = propFullName || propName;
          if (secret !== ReactPropTypesSecret) {
            if (throwOnDirectAccess) {
              var err = new Error(
                "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
              );
              err.name = "Invariant Violation";
              throw err;
            } else if (typeof console !== "undefined") {
              var cacheKey = componentName + ":" + propName;
              if (!manualPropTypeCallCache[cacheKey] && // Avoid spamming the console because they are often not actionable except for lib authors
              manualPropTypeWarningCount < 3) {
                printWarning(
                  "You are manually calling a React.PropTypes validation function for the `" + propFullName + "` prop on `" + componentName + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
                );
                manualPropTypeCallCache[cacheKey] = true;
                manualPropTypeWarningCount++;
              }
            }
          }
          if (props[propName] == null) {
            if (isRequired) {
              if (props[propName] === null) {
                return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required " + ("in `" + componentName + "`, but its value is `null`."));
              }
              return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required in " + ("`" + componentName + "`, but its value is `undefined`."));
            }
            return null;
          } else {
            return validate(props, propName, componentName, location, propFullName);
          }
        }
        var chainedCheckType = checkType.bind(null, false);
        chainedCheckType.isRequired = checkType.bind(null, true);
        return chainedCheckType;
      }
      function createPrimitiveTypeChecker(expectedType) {
        function validate(props, propName, componentName, location, propFullName, secret) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== expectedType) {
            var preciseType = getPreciseType(propValue);
            return new PropTypeError(
              "Invalid " + location + " `" + propFullName + "` of type " + ("`" + preciseType + "` supplied to `" + componentName + "`, expected ") + ("`" + expectedType + "`."),
              { expectedType }
            );
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createAnyTypeChecker() {
        return createChainableTypeChecker(emptyFunctionThatReturnsNull);
      }
      function createArrayOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
          if (typeof typeChecker !== "function") {
            return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside arrayOf.");
          }
          var propValue = props[propName];
          if (!Array.isArray(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an array."));
          }
          for (var i = 0; i < propValue.length; i++) {
            var error = typeChecker(propValue, i, componentName, location, propFullName + "[" + i + "]", ReactPropTypesSecret);
            if (error instanceof Error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createElementTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          if (!isValidElement(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createElementTypeTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          if (!ReactIs.isValidElementType(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement type."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createInstanceTypeChecker(expectedClass) {
        function validate(props, propName, componentName, location, propFullName) {
          if (!(props[propName] instanceof expectedClass)) {
            var expectedClassName = expectedClass.name || ANONYMOUS;
            var actualClassName = getClassName(props[propName]);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + actualClassName + "` supplied to `" + componentName + "`, expected ") + ("instance of `" + expectedClassName + "`."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createEnumTypeChecker(expectedValues) {
        if (!Array.isArray(expectedValues)) {
          if (true) {
            if (arguments.length > 1) {
              printWarning(
                "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
              );
            } else {
              printWarning("Invalid argument supplied to oneOf, expected an array.");
            }
          }
          return emptyFunctionThatReturnsNull;
        }
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          for (var i = 0; i < expectedValues.length; i++) {
            if (is(propValue, expectedValues[i])) {
              return null;
            }
          }
          var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
            var type = getPreciseType(value);
            if (type === "symbol") {
              return String(value);
            }
            return value;
          });
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of value `" + String(propValue) + "` " + ("supplied to `" + componentName + "`, expected one of " + valuesString + "."));
        }
        return createChainableTypeChecker(validate);
      }
      function createObjectOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
          if (typeof typeChecker !== "function") {
            return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside objectOf.");
          }
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an object."));
          }
          for (var key in propValue) {
            if (has(propValue, key)) {
              var error = typeChecker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
              if (error instanceof Error) {
                return error;
              }
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createUnionTypeChecker(arrayOfTypeCheckers) {
        if (!Array.isArray(arrayOfTypeCheckers)) {
          true ? printWarning("Invalid argument supplied to oneOfType, expected an instance of array.") : void 0;
          return emptyFunctionThatReturnsNull;
        }
        for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
          var checker = arrayOfTypeCheckers[i];
          if (typeof checker !== "function") {
            printWarning(
              "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + getPostfixForTypeWarning(checker) + " at index " + i + "."
            );
            return emptyFunctionThatReturnsNull;
          }
        }
        function validate(props, propName, componentName, location, propFullName) {
          var expectedTypes = [];
          for (var i2 = 0; i2 < arrayOfTypeCheckers.length; i2++) {
            var checker2 = arrayOfTypeCheckers[i2];
            var checkerResult = checker2(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
            if (checkerResult == null) {
              return null;
            }
            if (checkerResult.data && has(checkerResult.data, "expectedType")) {
              expectedTypes.push(checkerResult.data.expectedType);
            }
          }
          var expectedTypesMessage = expectedTypes.length > 0 ? ", expected one of type [" + expectedTypes.join(", ") + "]" : "";
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`" + expectedTypesMessage + "."));
        }
        return createChainableTypeChecker(validate);
      }
      function createNodeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          if (!isNode(props[propName])) {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`, expected a ReactNode."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function invalidValidatorError(componentName, location, propFullName, key, type) {
        return new PropTypeError(
          (componentName || "React class") + ": " + location + " type `" + propFullName + "." + key + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + type + "`."
        );
      }
      function createShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
          }
          for (var key in shapeTypes) {
            var checker = shapeTypes[key];
            if (typeof checker !== "function") {
              return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
            }
            var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
            if (error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createStrictShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
          }
          var allKeys = assign({}, props[propName], shapeTypes);
          for (var key in allKeys) {
            var checker = shapeTypes[key];
            if (has(shapeTypes, key) && typeof checker !== "function") {
              return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
            }
            if (!checker) {
              return new PropTypeError(
                "Invalid " + location + " `" + propFullName + "` key `" + key + "` supplied to `" + componentName + "`.\nBad object: " + JSON.stringify(props[propName], null, "  ") + "\nValid keys: " + JSON.stringify(Object.keys(shapeTypes), null, "  ")
              );
            }
            var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
            if (error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function isNode(propValue) {
        switch (typeof propValue) {
          case "number":
          case "string":
          case "undefined":
            return true;
          case "boolean":
            return !propValue;
          case "object":
            if (Array.isArray(propValue)) {
              return propValue.every(isNode);
            }
            if (propValue === null || isValidElement(propValue)) {
              return true;
            }
            var iteratorFn = getIteratorFn(propValue);
            if (iteratorFn) {
              var iterator = iteratorFn.call(propValue);
              var step;
              if (iteratorFn !== propValue.entries) {
                while (!(step = iterator.next()).done) {
                  if (!isNode(step.value)) {
                    return false;
                  }
                }
              } else {
                while (!(step = iterator.next()).done) {
                  var entry = step.value;
                  if (entry) {
                    if (!isNode(entry[1])) {
                      return false;
                    }
                  }
                }
              }
            } else {
              return false;
            }
            return true;
          default:
            return false;
        }
      }
      function isSymbol(propType, propValue) {
        if (propType === "symbol") {
          return true;
        }
        if (!propValue) {
          return false;
        }
        if (propValue["@@toStringTag"] === "Symbol") {
          return true;
        }
        if (typeof Symbol === "function" && propValue instanceof Symbol) {
          return true;
        }
        return false;
      }
      function getPropType(propValue) {
        var propType = typeof propValue;
        if (Array.isArray(propValue)) {
          return "array";
        }
        if (propValue instanceof RegExp) {
          return "object";
        }
        if (isSymbol(propType, propValue)) {
          return "symbol";
        }
        return propType;
      }
      function getPreciseType(propValue) {
        if (typeof propValue === "undefined" || propValue === null) {
          return "" + propValue;
        }
        var propType = getPropType(propValue);
        if (propType === "object") {
          if (propValue instanceof Date) {
            return "date";
          } else if (propValue instanceof RegExp) {
            return "regexp";
          }
        }
        return propType;
      }
      function getPostfixForTypeWarning(value) {
        var type = getPreciseType(value);
        switch (type) {
          case "array":
          case "object":
            return "an " + type;
          case "boolean":
          case "date":
          case "regexp":
            return "a " + type;
          default:
            return type;
        }
      }
      function getClassName(propValue) {
        if (!propValue.constructor || !propValue.constructor.name) {
          return ANONYMOUS;
        }
        return propValue.constructor.name;
      }
      ReactPropTypes.checkPropTypes = checkPropTypes;
      ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
      ReactPropTypes.PropTypes = ReactPropTypes;
      return ReactPropTypes;
    };
  }
});

// node_modules/prop-types/index.js
var require_prop_types = __commonJS({
  "node_modules/prop-types/index.js"(exports, module) {
    if (true) {
      ReactIs = require_react_is();
      throwOnDirectAccess = true;
      module.exports = require_factoryWithTypeCheckers()(ReactIs.isElement, throwOnDirectAccess);
    } else {
      module.exports = null();
    }
    var ReactIs;
    var throwOnDirectAccess;
  }
});

// node_modules/clsx/dist/clsx.m.js
var clsx_m_exports = {};
__export(clsx_m_exports, {
  clsx: () => clsx,
  default: () => clsx_m_default
});
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e) n += e;
  else if ("object" == typeof e) if (Array.isArray(e)) for (t = 0; t < e.length; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
  else for (t in e) e[t] && (n && (n += " "), n += t);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = ""; f < arguments.length; ) (e = arguments[f++]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
var clsx_m_default;
var init_clsx_m = __esm({
  "node_modules/clsx/dist/clsx.m.js"() {
    clsx_m_default = clsx;
  }
});

// node_modules/react-draggable/build/cjs/utils/shims.js
var require_shims = __commonJS({
  "node_modules/react-draggable/build/cjs/utils/shims.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.dontSetMe = dontSetMe;
    exports.findInArray = findInArray;
    exports.int = int;
    exports.isFunction = isFunction;
    exports.isNum = isNum;
    function findInArray(array, callback) {
      for (let i = 0, length = array.length; i < length; i++) {
        if (callback.apply(callback, [array[i], i, array])) return array[i];
      }
    }
    function isFunction(func) {
      return typeof func === "function" || Object.prototype.toString.call(func) === "[object Function]";
    }
    function isNum(num) {
      return typeof num === "number" && !isNaN(num);
    }
    function int(a) {
      return parseInt(a, 10);
    }
    function dontSetMe(props, propName, componentName) {
      if (props[propName]) {
        return new Error("Invalid prop ".concat(propName, " passed to ").concat(componentName, " - do not set this, set it on the child."));
      }
    }
  }
});

// node_modules/react-draggable/build/cjs/utils/getPrefix.js
var require_getPrefix = __commonJS({
  "node_modules/react-draggable/build/cjs/utils/getPrefix.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.browserPrefixToKey = browserPrefixToKey;
    exports.browserPrefixToStyle = browserPrefixToStyle;
    exports.default = void 0;
    exports.getPrefix = getPrefix;
    var prefixes = ["Moz", "Webkit", "O", "ms"];
    function getPrefix() {
      var _window$document;
      let prop = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "transform";
      if (typeof window === "undefined") return "";
      const style = (_window$document = window.document) === null || _window$document === void 0 || (_window$document = _window$document.documentElement) === null || _window$document === void 0 ? void 0 : _window$document.style;
      if (!style) return "";
      if (prop in style) return "";
      for (let i = 0; i < prefixes.length; i++) {
        if (browserPrefixToKey(prop, prefixes[i]) in style) return prefixes[i];
      }
      return "";
    }
    function browserPrefixToKey(prop, prefix) {
      return prefix ? "".concat(prefix).concat(kebabToTitleCase(prop)) : prop;
    }
    function browserPrefixToStyle(prop, prefix) {
      return prefix ? "-".concat(prefix.toLowerCase(), "-").concat(prop) : prop;
    }
    function kebabToTitleCase(str) {
      let out = "";
      let shouldCapitalize = true;
      for (let i = 0; i < str.length; i++) {
        if (shouldCapitalize) {
          out += str[i].toUpperCase();
          shouldCapitalize = false;
        } else if (str[i] === "-") {
          shouldCapitalize = true;
        } else {
          out += str[i];
        }
      }
      return out;
    }
    var _default = exports.default = getPrefix();
  }
});

// node_modules/react-draggable/build/cjs/utils/domFns.js
var require_domFns = __commonJS({
  "node_modules/react-draggable/build/cjs/utils/domFns.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.addClassName = addClassName;
    exports.addEvent = addEvent;
    exports.addUserSelectStyles = addUserSelectStyles;
    exports.createCSSTransform = createCSSTransform;
    exports.createSVGTransform = createSVGTransform;
    exports.getTouch = getTouch;
    exports.getTouchIdentifier = getTouchIdentifier;
    exports.getTranslation = getTranslation;
    exports.innerHeight = innerHeight;
    exports.innerWidth = innerWidth;
    exports.matchesSelector = matchesSelector;
    exports.matchesSelectorAndParentsTo = matchesSelectorAndParentsTo;
    exports.offsetXYFromParent = offsetXYFromParent;
    exports.outerHeight = outerHeight;
    exports.outerWidth = outerWidth;
    exports.removeClassName = removeClassName;
    exports.removeEvent = removeEvent;
    exports.removeUserSelectStyles = removeUserSelectStyles;
    var _shims = require_shims();
    var _getPrefix = _interopRequireWildcard(require_getPrefix());
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function") return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return { default: obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    var matchesSelectorFunc = "";
    function matchesSelector(el, selector) {
      if (!matchesSelectorFunc) {
        matchesSelectorFunc = (0, _shims.findInArray)(["matches", "webkitMatchesSelector", "mozMatchesSelector", "msMatchesSelector", "oMatchesSelector"], function(method) {
          return (0, _shims.isFunction)(el[method]);
        });
      }
      if (!(0, _shims.isFunction)(el[matchesSelectorFunc])) return false;
      return el[matchesSelectorFunc](selector);
    }
    function matchesSelectorAndParentsTo(el, selector, baseNode) {
      let node = el;
      do {
        if (matchesSelector(node, selector)) return true;
        if (node === baseNode) return false;
        node = node.parentNode;
      } while (node);
      return false;
    }
    function addEvent(el, event, handler, inputOptions) {
      if (!el) return;
      const options = {
        capture: true,
        ...inputOptions
      };
      if (el.addEventListener) {
        el.addEventListener(event, handler, options);
      } else if (el.attachEvent) {
        el.attachEvent("on" + event, handler);
      } else {
        el["on" + event] = handler;
      }
    }
    function removeEvent(el, event, handler, inputOptions) {
      if (!el) return;
      const options = {
        capture: true,
        ...inputOptions
      };
      if (el.removeEventListener) {
        el.removeEventListener(event, handler, options);
      } else if (el.detachEvent) {
        el.detachEvent("on" + event, handler);
      } else {
        el["on" + event] = null;
      }
    }
    function outerHeight(node) {
      let height = node.clientHeight;
      const computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
      height += (0, _shims.int)(computedStyle.borderTopWidth);
      height += (0, _shims.int)(computedStyle.borderBottomWidth);
      return height;
    }
    function outerWidth(node) {
      let width = node.clientWidth;
      const computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
      width += (0, _shims.int)(computedStyle.borderLeftWidth);
      width += (0, _shims.int)(computedStyle.borderRightWidth);
      return width;
    }
    function innerHeight(node) {
      let height = node.clientHeight;
      const computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
      height -= (0, _shims.int)(computedStyle.paddingTop);
      height -= (0, _shims.int)(computedStyle.paddingBottom);
      return height;
    }
    function innerWidth(node) {
      let width = node.clientWidth;
      const computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
      width -= (0, _shims.int)(computedStyle.paddingLeft);
      width -= (0, _shims.int)(computedStyle.paddingRight);
      return width;
    }
    function offsetXYFromParent(evt, offsetParent, scale) {
      const isBody = offsetParent === offsetParent.ownerDocument.body;
      const offsetParentRect = isBody ? {
        left: 0,
        top: 0
      } : offsetParent.getBoundingClientRect();
      const x = (evt.clientX + offsetParent.scrollLeft - offsetParentRect.left) / scale;
      const y = (evt.clientY + offsetParent.scrollTop - offsetParentRect.top) / scale;
      return {
        x,
        y
      };
    }
    function createCSSTransform(controlPos, positionOffset) {
      const translation = getTranslation(controlPos, positionOffset, "px");
      return {
        [(0, _getPrefix.browserPrefixToKey)("transform", _getPrefix.default)]: translation
      };
    }
    function createSVGTransform(controlPos, positionOffset) {
      const translation = getTranslation(controlPos, positionOffset, "");
      return translation;
    }
    function getTranslation(_ref, positionOffset, unitSuffix) {
      let {
        x,
        y
      } = _ref;
      let translation = "translate(".concat(x).concat(unitSuffix, ",").concat(y).concat(unitSuffix, ")");
      if (positionOffset) {
        const defaultX = "".concat(typeof positionOffset.x === "string" ? positionOffset.x : positionOffset.x + unitSuffix);
        const defaultY = "".concat(typeof positionOffset.y === "string" ? positionOffset.y : positionOffset.y + unitSuffix);
        translation = "translate(".concat(defaultX, ", ").concat(defaultY, ")") + translation;
      }
      return translation;
    }
    function getTouch(e, identifier) {
      return e.targetTouches && (0, _shims.findInArray)(e.targetTouches, (t) => identifier === t.identifier) || e.changedTouches && (0, _shims.findInArray)(e.changedTouches, (t) => identifier === t.identifier);
    }
    function getTouchIdentifier(e) {
      if (e.targetTouches && e.targetTouches[0]) return e.targetTouches[0].identifier;
      if (e.changedTouches && e.changedTouches[0]) return e.changedTouches[0].identifier;
    }
    function addUserSelectStyles(doc) {
      if (!doc) return;
      let styleEl = doc.getElementById("react-draggable-style-el");
      if (!styleEl) {
        styleEl = doc.createElement("style");
        styleEl.type = "text/css";
        styleEl.id = "react-draggable-style-el";
        styleEl.innerHTML = ".react-draggable-transparent-selection *::-moz-selection {all: inherit;}\n";
        styleEl.innerHTML += ".react-draggable-transparent-selection *::selection {all: inherit;}\n";
        doc.getElementsByTagName("head")[0].appendChild(styleEl);
      }
      if (doc.body) addClassName(doc.body, "react-draggable-transparent-selection");
    }
    function removeUserSelectStyles(doc) {
      if (!doc) return;
      try {
        if (doc.body) removeClassName(doc.body, "react-draggable-transparent-selection");
        if (doc.selection) {
          doc.selection.empty();
        } else {
          const selection = (doc.defaultView || window).getSelection();
          if (selection && selection.type !== "Caret") {
            selection.removeAllRanges();
          }
        }
      } catch (e) {
      }
    }
    function addClassName(el, className) {
      if (el.classList) {
        el.classList.add(className);
      } else {
        if (!el.className.match(new RegExp("(?:^|\\s)".concat(className, "(?!\\S)")))) {
          el.className += " ".concat(className);
        }
      }
    }
    function removeClassName(el, className) {
      if (el.classList) {
        el.classList.remove(className);
      } else {
        el.className = el.className.replace(new RegExp("(?:^|\\s)".concat(className, "(?!\\S)"), "g"), "");
      }
    }
  }
});

// node_modules/react-draggable/build/cjs/utils/positionFns.js
var require_positionFns = __commonJS({
  "node_modules/react-draggable/build/cjs/utils/positionFns.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.canDragX = canDragX;
    exports.canDragY = canDragY;
    exports.createCoreData = createCoreData;
    exports.createDraggableData = createDraggableData;
    exports.getBoundPosition = getBoundPosition;
    exports.getControlPosition = getControlPosition;
    exports.snapToGrid = snapToGrid;
    var _shims = require_shims();
    var _domFns = require_domFns();
    function getBoundPosition(draggable, x, y) {
      if (!draggable.props.bounds) return [x, y];
      let {
        bounds
      } = draggable.props;
      bounds = typeof bounds === "string" ? bounds : cloneBounds(bounds);
      const node = findDOMNode(draggable);
      if (typeof bounds === "string") {
        const {
          ownerDocument
        } = node;
        const ownerWindow = ownerDocument.defaultView;
        let boundNode;
        if (bounds === "parent") {
          boundNode = node.parentNode;
        } else {
          boundNode = ownerDocument.querySelector(bounds);
        }
        if (!(boundNode instanceof ownerWindow.HTMLElement)) {
          throw new Error('Bounds selector "' + bounds + '" could not find an element.');
        }
        const boundNodeEl = boundNode;
        const nodeStyle = ownerWindow.getComputedStyle(node);
        const boundNodeStyle = ownerWindow.getComputedStyle(boundNodeEl);
        bounds = {
          left: -node.offsetLeft + (0, _shims.int)(boundNodeStyle.paddingLeft) + (0, _shims.int)(nodeStyle.marginLeft),
          top: -node.offsetTop + (0, _shims.int)(boundNodeStyle.paddingTop) + (0, _shims.int)(nodeStyle.marginTop),
          right: (0, _domFns.innerWidth)(boundNodeEl) - (0, _domFns.outerWidth)(node) - node.offsetLeft + (0, _shims.int)(boundNodeStyle.paddingRight) - (0, _shims.int)(nodeStyle.marginRight),
          bottom: (0, _domFns.innerHeight)(boundNodeEl) - (0, _domFns.outerHeight)(node) - node.offsetTop + (0, _shims.int)(boundNodeStyle.paddingBottom) - (0, _shims.int)(nodeStyle.marginBottom)
        };
      }
      if ((0, _shims.isNum)(bounds.right)) x = Math.min(x, bounds.right);
      if ((0, _shims.isNum)(bounds.bottom)) y = Math.min(y, bounds.bottom);
      if ((0, _shims.isNum)(bounds.left)) x = Math.max(x, bounds.left);
      if ((0, _shims.isNum)(bounds.top)) y = Math.max(y, bounds.top);
      return [x, y];
    }
    function snapToGrid(grid, pendingX, pendingY) {
      const x = Math.round(pendingX / grid[0]) * grid[0];
      const y = Math.round(pendingY / grid[1]) * grid[1];
      return [x, y];
    }
    function canDragX(draggable) {
      return draggable.props.axis === "both" || draggable.props.axis === "x";
    }
    function canDragY(draggable) {
      return draggable.props.axis === "both" || draggable.props.axis === "y";
    }
    function getControlPosition(e, touchIdentifier, draggableCore) {
      const touchObj = typeof touchIdentifier === "number" ? (0, _domFns.getTouch)(e, touchIdentifier) : null;
      if (typeof touchIdentifier === "number" && !touchObj) return null;
      const node = findDOMNode(draggableCore);
      const offsetParent = draggableCore.props.offsetParent || node.offsetParent || node.ownerDocument.body;
      return (0, _domFns.offsetXYFromParent)(touchObj || e, offsetParent, draggableCore.props.scale);
    }
    function createCoreData(draggable, x, y) {
      const isStart = !(0, _shims.isNum)(draggable.lastX);
      const node = findDOMNode(draggable);
      if (isStart) {
        return {
          node,
          deltaX: 0,
          deltaY: 0,
          lastX: x,
          lastY: y,
          x,
          y
        };
      } else {
        return {
          node,
          deltaX: x - draggable.lastX,
          deltaY: y - draggable.lastY,
          lastX: draggable.lastX,
          lastY: draggable.lastY,
          x,
          y
        };
      }
    }
    function createDraggableData(draggable, coreData) {
      const scale = draggable.props.scale;
      return {
        node: coreData.node,
        x: draggable.state.x + coreData.deltaX / scale,
        y: draggable.state.y + coreData.deltaY / scale,
        deltaX: coreData.deltaX / scale,
        deltaY: coreData.deltaY / scale,
        lastX: draggable.state.x,
        lastY: draggable.state.y
      };
    }
    function cloneBounds(bounds) {
      return {
        left: bounds.left,
        top: bounds.top,
        right: bounds.right,
        bottom: bounds.bottom
      };
    }
    function findDOMNode(draggable) {
      const node = draggable.findDOMNode();
      if (!node) {
        throw new Error("<DraggableCore>: Unmounted during event!");
      }
      return node;
    }
  }
});

// node_modules/react-draggable/build/cjs/utils/log.js
var require_log = __commonJS({
  "node_modules/react-draggable/build/cjs/utils/log.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = log;
    function log() {
      if (void 0) console.log(...arguments);
    }
  }
});

// node_modules/react-draggable/build/cjs/DraggableCore.js
var require_DraggableCore = __commonJS({
  "node_modules/react-draggable/build/cjs/DraggableCore.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var React = _interopRequireWildcard(require_react());
    var _propTypes = _interopRequireDefault(require_prop_types());
    var _reactDom = _interopRequireDefault(require_react_dom());
    var _domFns = require_domFns();
    var _positionFns = require_positionFns();
    var _shims = require_shims();
    var _log = _interopRequireDefault(require_log());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function") return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return { default: obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function _defineProperty(obj, key, value) {
      key = _toPropertyKey(key);
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return typeof key === "symbol" ? key : String(key);
    }
    function _toPrimitive(input, hint) {
      if (typeof input !== "object" || input === null) return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== void 0) {
        var res = prim.call(input, hint || "default");
        if (typeof res !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    var eventsFor = {
      touch: {
        start: "touchstart",
        move: "touchmove",
        stop: "touchend"
      },
      mouse: {
        start: "mousedown",
        move: "mousemove",
        stop: "mouseup"
      }
    };
    var dragEventFor = eventsFor.mouse;
    var DraggableCore = class extends React.Component {
      constructor() {
        super(...arguments);
        _defineProperty(this, "dragging", false);
        _defineProperty(this, "lastX", NaN);
        _defineProperty(this, "lastY", NaN);
        _defineProperty(this, "touchIdentifier", null);
        _defineProperty(this, "mounted", false);
        _defineProperty(this, "handleDragStart", (e) => {
          this.props.onMouseDown(e);
          if (!this.props.allowAnyClick && typeof e.button === "number" && e.button !== 0) return false;
          const thisNode = this.findDOMNode();
          if (!thisNode || !thisNode.ownerDocument || !thisNode.ownerDocument.body) {
            throw new Error("<DraggableCore> not mounted on DragStart!");
          }
          const {
            ownerDocument
          } = thisNode;
          if (this.props.disabled || !(e.target instanceof ownerDocument.defaultView.Node) || this.props.handle && !(0, _domFns.matchesSelectorAndParentsTo)(e.target, this.props.handle, thisNode) || this.props.cancel && (0, _domFns.matchesSelectorAndParentsTo)(e.target, this.props.cancel, thisNode)) {
            return;
          }
          if (e.type === "touchstart") e.preventDefault();
          const touchIdentifier = (0, _domFns.getTouchIdentifier)(e);
          this.touchIdentifier = touchIdentifier;
          const position = (0, _positionFns.getControlPosition)(e, touchIdentifier, this);
          if (position == null) return;
          const {
            x,
            y
          } = position;
          const coreEvent = (0, _positionFns.createCoreData)(this, x, y);
          (0, _log.default)("DraggableCore: handleDragStart: %j", coreEvent);
          (0, _log.default)("calling", this.props.onStart);
          const shouldUpdate = this.props.onStart(e, coreEvent);
          if (shouldUpdate === false || this.mounted === false) return;
          if (this.props.enableUserSelectHack) (0, _domFns.addUserSelectStyles)(ownerDocument);
          this.dragging = true;
          this.lastX = x;
          this.lastY = y;
          (0, _domFns.addEvent)(ownerDocument, dragEventFor.move, this.handleDrag);
          (0, _domFns.addEvent)(ownerDocument, dragEventFor.stop, this.handleDragStop);
        });
        _defineProperty(this, "handleDrag", (e) => {
          const position = (0, _positionFns.getControlPosition)(e, this.touchIdentifier, this);
          if (position == null) return;
          let {
            x,
            y
          } = position;
          if (Array.isArray(this.props.grid)) {
            let deltaX = x - this.lastX, deltaY = y - this.lastY;
            [deltaX, deltaY] = (0, _positionFns.snapToGrid)(this.props.grid, deltaX, deltaY);
            if (!deltaX && !deltaY) return;
            x = this.lastX + deltaX, y = this.lastY + deltaY;
          }
          const coreEvent = (0, _positionFns.createCoreData)(this, x, y);
          (0, _log.default)("DraggableCore: handleDrag: %j", coreEvent);
          const shouldUpdate = this.props.onDrag(e, coreEvent);
          if (shouldUpdate === false || this.mounted === false) {
            try {
              this.handleDragStop(new MouseEvent("mouseup"));
            } catch (err) {
              const event = document.createEvent("MouseEvents");
              event.initMouseEvent("mouseup", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
              this.handleDragStop(event);
            }
            return;
          }
          this.lastX = x;
          this.lastY = y;
        });
        _defineProperty(this, "handleDragStop", (e) => {
          if (!this.dragging) return;
          const position = (0, _positionFns.getControlPosition)(e, this.touchIdentifier, this);
          if (position == null) return;
          let {
            x,
            y
          } = position;
          if (Array.isArray(this.props.grid)) {
            let deltaX = x - this.lastX || 0;
            let deltaY = y - this.lastY || 0;
            [deltaX, deltaY] = (0, _positionFns.snapToGrid)(this.props.grid, deltaX, deltaY);
            x = this.lastX + deltaX, y = this.lastY + deltaY;
          }
          const coreEvent = (0, _positionFns.createCoreData)(this, x, y);
          const shouldContinue = this.props.onStop(e, coreEvent);
          if (shouldContinue === false || this.mounted === false) return false;
          const thisNode = this.findDOMNode();
          if (thisNode) {
            if (this.props.enableUserSelectHack) (0, _domFns.removeUserSelectStyles)(thisNode.ownerDocument);
          }
          (0, _log.default)("DraggableCore: handleDragStop: %j", coreEvent);
          this.dragging = false;
          this.lastX = NaN;
          this.lastY = NaN;
          if (thisNode) {
            (0, _log.default)("DraggableCore: Removing handlers");
            (0, _domFns.removeEvent)(thisNode.ownerDocument, dragEventFor.move, this.handleDrag);
            (0, _domFns.removeEvent)(thisNode.ownerDocument, dragEventFor.stop, this.handleDragStop);
          }
        });
        _defineProperty(this, "onMouseDown", (e) => {
          dragEventFor = eventsFor.mouse;
          return this.handleDragStart(e);
        });
        _defineProperty(this, "onMouseUp", (e) => {
          dragEventFor = eventsFor.mouse;
          return this.handleDragStop(e);
        });
        _defineProperty(this, "onTouchStart", (e) => {
          dragEventFor = eventsFor.touch;
          return this.handleDragStart(e);
        });
        _defineProperty(this, "onTouchEnd", (e) => {
          dragEventFor = eventsFor.touch;
          return this.handleDragStop(e);
        });
      }
      componentDidMount() {
        this.mounted = true;
        const thisNode = this.findDOMNode();
        if (thisNode) {
          (0, _domFns.addEvent)(thisNode, eventsFor.touch.start, this.onTouchStart, {
            passive: false
          });
        }
      }
      componentWillUnmount() {
        this.mounted = false;
        const thisNode = this.findDOMNode();
        if (thisNode) {
          const {
            ownerDocument
          } = thisNode;
          (0, _domFns.removeEvent)(ownerDocument, eventsFor.mouse.move, this.handleDrag);
          (0, _domFns.removeEvent)(ownerDocument, eventsFor.touch.move, this.handleDrag);
          (0, _domFns.removeEvent)(ownerDocument, eventsFor.mouse.stop, this.handleDragStop);
          (0, _domFns.removeEvent)(ownerDocument, eventsFor.touch.stop, this.handleDragStop);
          (0, _domFns.removeEvent)(thisNode, eventsFor.touch.start, this.onTouchStart, {
            passive: false
          });
          if (this.props.enableUserSelectHack) (0, _domFns.removeUserSelectStyles)(ownerDocument);
        }
      }
      // React Strict Mode compatibility: if `nodeRef` is passed, we will use it instead of trying to find
      // the underlying DOM node ourselves. See the README for more information.
      findDOMNode() {
        var _this$props, _this$props2;
        return (_this$props = this.props) !== null && _this$props !== void 0 && _this$props.nodeRef ? (_this$props2 = this.props) === null || _this$props2 === void 0 || (_this$props2 = _this$props2.nodeRef) === null || _this$props2 === void 0 ? void 0 : _this$props2.current : _reactDom.default.findDOMNode(this);
      }
      render() {
        return React.cloneElement(React.Children.only(this.props.children), {
          // Note: mouseMove handler is attached to document so it will still function
          // when the user drags quickly and leaves the bounds of the element.
          onMouseDown: this.onMouseDown,
          onMouseUp: this.onMouseUp,
          // onTouchStart is added on `componentDidMount` so they can be added with
          // {passive: false}, which allows it to cancel. See
          // https://developers.google.com/web/updates/2017/01/scrolling-intervention
          onTouchEnd: this.onTouchEnd
        });
      }
    };
    exports.default = DraggableCore;
    _defineProperty(DraggableCore, "displayName", "DraggableCore");
    _defineProperty(DraggableCore, "propTypes", {
      /**
       * `allowAnyClick` allows dragging using any mouse button.
       * By default, we only accept the left button.
       *
       * Defaults to `false`.
       */
      allowAnyClick: _propTypes.default.bool,
      children: _propTypes.default.node.isRequired,
      /**
       * `disabled`, if true, stops the <Draggable> from dragging. All handlers,
       * with the exception of `onMouseDown`, will not fire.
       */
      disabled: _propTypes.default.bool,
      /**
       * By default, we add 'user-select:none' attributes to the document body
       * to prevent ugly text selection during drag. If this is causing problems
       * for your app, set this to `false`.
       */
      enableUserSelectHack: _propTypes.default.bool,
      /**
       * `offsetParent`, if set, uses the passed DOM node to compute drag offsets
       * instead of using the parent node.
       */
      offsetParent: function(props, propName) {
        if (props[propName] && props[propName].nodeType !== 1) {
          throw new Error("Draggable's offsetParent must be a DOM Node.");
        }
      },
      /**
       * `grid` specifies the x and y that dragging should snap to.
       */
      grid: _propTypes.default.arrayOf(_propTypes.default.number),
      /**
       * `handle` specifies a selector to be used as the handle that initiates drag.
       *
       * Example:
       *
       * ```jsx
       *   let App = React.createClass({
       *       render: function () {
       *         return (
       *            <Draggable handle=".handle">
       *              <div>
       *                  <div className="handle">Click me to drag</div>
       *                  <div>This is some other content</div>
       *              </div>
       *           </Draggable>
       *         );
       *       }
       *   });
       * ```
       */
      handle: _propTypes.default.string,
      /**
       * `cancel` specifies a selector to be used to prevent drag initialization.
       *
       * Example:
       *
       * ```jsx
       *   let App = React.createClass({
       *       render: function () {
       *           return(
       *               <Draggable cancel=".cancel">
       *                   <div>
       *                     <div className="cancel">You can't drag from here</div>
       *                     <div>Dragging here works fine</div>
       *                   </div>
       *               </Draggable>
       *           );
       *       }
       *   });
       * ```
       */
      cancel: _propTypes.default.string,
      /* If running in React Strict mode, ReactDOM.findDOMNode() is deprecated.
       * Unfortunately, in order for <Draggable> to work properly, we need raw access
       * to the underlying DOM node. If you want to avoid the warning, pass a `nodeRef`
       * as in this example:
       *
       * function MyComponent() {
       *   const nodeRef = React.useRef(null);
       *   return (
       *     <Draggable nodeRef={nodeRef}>
       *       <div ref={nodeRef}>Example Target</div>
       *     </Draggable>
       *   );
       * }
       *
       * This can be used for arbitrarily nested components, so long as the ref ends up
       * pointing to the actual child DOM node and not a custom component.
       */
      nodeRef: _propTypes.default.object,
      /**
       * Called when dragging starts.
       * If this function returns the boolean false, dragging will be canceled.
       */
      onStart: _propTypes.default.func,
      /**
       * Called while dragging.
       * If this function returns the boolean false, dragging will be canceled.
       */
      onDrag: _propTypes.default.func,
      /**
       * Called when dragging stops.
       * If this function returns the boolean false, the drag will remain active.
       */
      onStop: _propTypes.default.func,
      /**
       * A workaround option which can be passed if onMouseDown needs to be accessed,
       * since it'll always be blocked (as there is internal use of onMouseDown)
       */
      onMouseDown: _propTypes.default.func,
      /**
       * `scale`, if set, applies scaling while dragging an element
       */
      scale: _propTypes.default.number,
      /**
       * These properties should be defined on the child, not here.
       */
      className: _shims.dontSetMe,
      style: _shims.dontSetMe,
      transform: _shims.dontSetMe
    });
    _defineProperty(DraggableCore, "defaultProps", {
      allowAnyClick: false,
      // by default only accept left click
      disabled: false,
      enableUserSelectHack: true,
      onStart: function() {
      },
      onDrag: function() {
      },
      onStop: function() {
      },
      onMouseDown: function() {
      },
      scale: 1
    });
  }
});

// node_modules/react-draggable/build/cjs/Draggable.js
var require_Draggable = __commonJS({
  "node_modules/react-draggable/build/cjs/Draggable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "DraggableCore", {
      enumerable: true,
      get: function() {
        return _DraggableCore.default;
      }
    });
    exports.default = void 0;
    var React = _interopRequireWildcard(require_react());
    var _propTypes = _interopRequireDefault(require_prop_types());
    var _reactDom = _interopRequireDefault(require_react_dom());
    var _clsx = _interopRequireDefault((init_clsx_m(), __toCommonJS(clsx_m_exports)));
    var _domFns = require_domFns();
    var _positionFns = require_positionFns();
    var _shims = require_shims();
    var _DraggableCore = _interopRequireDefault(require_DraggableCore());
    var _log = _interopRequireDefault(require_log());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function") return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return { default: obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function _extends() {
      _extends = Object.assign ? Object.assign.bind() : function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _defineProperty(obj, key, value) {
      key = _toPropertyKey(key);
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return typeof key === "symbol" ? key : String(key);
    }
    function _toPrimitive(input, hint) {
      if (typeof input !== "object" || input === null) return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== void 0) {
        var res = prim.call(input, hint || "default");
        if (typeof res !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    var Draggable2 = class extends React.Component {
      // React 16.3+
      // Arity (props, state)
      static getDerivedStateFromProps(_ref, _ref2) {
        let {
          position
        } = _ref;
        let {
          prevPropsPosition
        } = _ref2;
        if (position && (!prevPropsPosition || position.x !== prevPropsPosition.x || position.y !== prevPropsPosition.y)) {
          (0, _log.default)("Draggable: getDerivedStateFromProps %j", {
            position,
            prevPropsPosition
          });
          return {
            x: position.x,
            y: position.y,
            prevPropsPosition: {
              ...position
            }
          };
        }
        return null;
      }
      constructor(props) {
        super(props);
        _defineProperty(this, "onDragStart", (e, coreData) => {
          (0, _log.default)("Draggable: onDragStart: %j", coreData);
          const shouldStart = this.props.onStart(e, (0, _positionFns.createDraggableData)(this, coreData));
          if (shouldStart === false) return false;
          this.setState({
            dragging: true,
            dragged: true
          });
        });
        _defineProperty(this, "onDrag", (e, coreData) => {
          if (!this.state.dragging) return false;
          (0, _log.default)("Draggable: onDrag: %j", coreData);
          const uiData = (0, _positionFns.createDraggableData)(this, coreData);
          const newState = {
            x: uiData.x,
            y: uiData.y,
            slackX: 0,
            slackY: 0
          };
          if (this.props.bounds) {
            const {
              x,
              y
            } = newState;
            newState.x += this.state.slackX;
            newState.y += this.state.slackY;
            const [newStateX, newStateY] = (0, _positionFns.getBoundPosition)(this, newState.x, newState.y);
            newState.x = newStateX;
            newState.y = newStateY;
            newState.slackX = this.state.slackX + (x - newState.x);
            newState.slackY = this.state.slackY + (y - newState.y);
            uiData.x = newState.x;
            uiData.y = newState.y;
            uiData.deltaX = newState.x - this.state.x;
            uiData.deltaY = newState.y - this.state.y;
          }
          const shouldUpdate = this.props.onDrag(e, uiData);
          if (shouldUpdate === false) return false;
          this.setState(newState);
        });
        _defineProperty(this, "onDragStop", (e, coreData) => {
          if (!this.state.dragging) return false;
          const shouldContinue = this.props.onStop(e, (0, _positionFns.createDraggableData)(this, coreData));
          if (shouldContinue === false) return false;
          (0, _log.default)("Draggable: onDragStop: %j", coreData);
          const newState = {
            dragging: false,
            slackX: 0,
            slackY: 0
          };
          const controlled = Boolean(this.props.position);
          if (controlled) {
            const {
              x,
              y
            } = this.props.position;
            newState.x = x;
            newState.y = y;
          }
          this.setState(newState);
        });
        this.state = {
          // Whether or not we are currently dragging.
          dragging: false,
          // Whether or not we have been dragged before.
          dragged: false,
          // Current transform x and y.
          x: props.position ? props.position.x : props.defaultPosition.x,
          y: props.position ? props.position.y : props.defaultPosition.y,
          prevPropsPosition: {
            ...props.position
          },
          // Used for compensating for out-of-bounds drags
          slackX: 0,
          slackY: 0,
          // Can only determine if SVG after mounting
          isElementSVG: false
        };
        if (props.position && !(props.onDrag || props.onStop)) {
          console.warn("A `position` was applied to this <Draggable>, without drag handlers. This will make this component effectively undraggable. Please attach `onDrag` or `onStop` handlers so you can adjust the `position` of this element.");
        }
      }
      componentDidMount() {
        if (typeof window.SVGElement !== "undefined" && this.findDOMNode() instanceof window.SVGElement) {
          this.setState({
            isElementSVG: true
          });
        }
      }
      componentWillUnmount() {
        this.setState({
          dragging: false
        });
      }
      // React Strict Mode compatibility: if `nodeRef` is passed, we will use it instead of trying to find
      // the underlying DOM node ourselves. See the README for more information.
      findDOMNode() {
        var _this$props$nodeRef$c, _this$props;
        return (_this$props$nodeRef$c = (_this$props = this.props) === null || _this$props === void 0 || (_this$props = _this$props.nodeRef) === null || _this$props === void 0 ? void 0 : _this$props.current) !== null && _this$props$nodeRef$c !== void 0 ? _this$props$nodeRef$c : _reactDom.default.findDOMNode(this);
      }
      render() {
        const {
          axis,
          bounds,
          children,
          defaultPosition,
          defaultClassName,
          defaultClassNameDragging,
          defaultClassNameDragged,
          position,
          positionOffset,
          scale,
          ...draggableCoreProps
        } = this.props;
        let style = {};
        let svgTransform = null;
        const controlled = Boolean(position);
        const draggable = !controlled || this.state.dragging;
        const validPosition = position || defaultPosition;
        const transformOpts = {
          // Set left if horizontal drag is enabled
          x: (0, _positionFns.canDragX)(this) && draggable ? this.state.x : validPosition.x,
          // Set top if vertical drag is enabled
          y: (0, _positionFns.canDragY)(this) && draggable ? this.state.y : validPosition.y
        };
        if (this.state.isElementSVG) {
          svgTransform = (0, _domFns.createSVGTransform)(transformOpts, positionOffset);
        } else {
          style = (0, _domFns.createCSSTransform)(transformOpts, positionOffset);
        }
        const className = (0, _clsx.default)(children.props.className || "", defaultClassName, {
          [defaultClassNameDragging]: this.state.dragging,
          [defaultClassNameDragged]: this.state.dragged
        });
        return React.createElement(_DraggableCore.default, _extends({}, draggableCoreProps, {
          onStart: this.onDragStart,
          onDrag: this.onDrag,
          onStop: this.onDragStop
        }), React.cloneElement(React.Children.only(children), {
          className,
          style: {
            ...children.props.style,
            ...style
          },
          transform: svgTransform
        }));
      }
    };
    exports.default = Draggable2;
    _defineProperty(Draggable2, "displayName", "Draggable");
    _defineProperty(Draggable2, "propTypes", {
      // Accepts all props <DraggableCore> accepts.
      ..._DraggableCore.default.propTypes,
      /**
       * `axis` determines which axis the draggable can move.
       *
       *  Note that all callbacks will still return data as normal. This only
       *  controls flushing to the DOM.
       *
       * 'both' allows movement horizontally and vertically.
       * 'x' limits movement to horizontal axis.
       * 'y' limits movement to vertical axis.
       * 'none' limits all movement.
       *
       * Defaults to 'both'.
       */
      axis: _propTypes.default.oneOf(["both", "x", "y", "none"]),
      /**
       * `bounds` determines the range of movement available to the element.
       * Available values are:
       *
       * 'parent' restricts movement within the Draggable's parent node.
       *
       * Alternatively, pass an object with the following properties, all of which are optional:
       *
       * {left: LEFT_BOUND, right: RIGHT_BOUND, bottom: BOTTOM_BOUND, top: TOP_BOUND}
       *
       * All values are in px.
       *
       * Example:
       *
       * ```jsx
       *   let App = React.createClass({
       *       render: function () {
       *         return (
       *            <Draggable bounds={{right: 300, bottom: 300}}>
       *              <div>Content</div>
       *           </Draggable>
       *         );
       *       }
       *   });
       * ```
       */
      bounds: _propTypes.default.oneOfType([_propTypes.default.shape({
        left: _propTypes.default.number,
        right: _propTypes.default.number,
        top: _propTypes.default.number,
        bottom: _propTypes.default.number
      }), _propTypes.default.string, _propTypes.default.oneOf([false])]),
      defaultClassName: _propTypes.default.string,
      defaultClassNameDragging: _propTypes.default.string,
      defaultClassNameDragged: _propTypes.default.string,
      /**
       * `defaultPosition` specifies the x and y that the dragged item should start at
       *
       * Example:
       *
       * ```jsx
       *      let App = React.createClass({
       *          render: function () {
       *              return (
       *                  <Draggable defaultPosition={{x: 25, y: 25}}>
       *                      <div>I start with transformX: 25px and transformY: 25px;</div>
       *                  </Draggable>
       *              );
       *          }
       *      });
       * ```
       */
      defaultPosition: _propTypes.default.shape({
        x: _propTypes.default.number,
        y: _propTypes.default.number
      }),
      positionOffset: _propTypes.default.shape({
        x: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
        y: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])
      }),
      /**
       * `position`, if present, defines the current position of the element.
       *
       *  This is similar to how form elements in React work - if no `position` is supplied, the component
       *  is uncontrolled.
       *
       * Example:
       *
       * ```jsx
       *      let App = React.createClass({
       *          render: function () {
       *              return (
       *                  <Draggable position={{x: 25, y: 25}}>
       *                      <div>I start with transformX: 25px and transformY: 25px;</div>
       *                  </Draggable>
       *              );
       *          }
       *      });
       * ```
       */
      position: _propTypes.default.shape({
        x: _propTypes.default.number,
        y: _propTypes.default.number
      }),
      /**
       * These properties should be defined on the child, not here.
       */
      className: _shims.dontSetMe,
      style: _shims.dontSetMe,
      transform: _shims.dontSetMe
    });
    _defineProperty(Draggable2, "defaultProps", {
      ..._DraggableCore.default.defaultProps,
      axis: "both",
      bounds: false,
      defaultClassName: "react-draggable",
      defaultClassNameDragging: "react-draggable-dragging",
      defaultClassNameDragged: "react-draggable-dragged",
      defaultPosition: {
        x: 0,
        y: 0
      },
      scale: 1
    });
  }
});

// node_modules/react-draggable/build/cjs/cjs.js
var require_cjs = __commonJS({
  "node_modules/react-draggable/build/cjs/cjs.js"(exports, module) {
    "use strict";
    var {
      default: Draggable2,
      DraggableCore
    } = require_Draggable();
    module.exports = Draggable2;
    module.exports.default = Draggable2;
    module.exports.DraggableCore = DraggableCore;
  }
});

// node_modules/react-rnd/lib/index.js
var import_react3 = __toESM(require_react());
var import_react_draggable = __toESM(require_cjs());

// node_modules/re-resizable/lib/index.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var import_react2 = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());

// node_modules/re-resizable/lib/resizer.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var import_react = __toESM(require_react());
var __assign = function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var rowSizeBase = {
  width: "100%",
  height: "10px",
  top: "0px",
  left: "0px",
  cursor: "row-resize"
};
var colSizeBase = {
  width: "10px",
  height: "100%",
  top: "0px",
  left: "0px",
  cursor: "col-resize"
};
var edgeBase = {
  width: "20px",
  height: "20px",
  position: "absolute",
  zIndex: 1
};
var styles = {
  top: __assign(__assign({}, rowSizeBase), { top: "-5px" }),
  right: __assign(__assign({}, colSizeBase), { left: void 0, right: "-5px" }),
  bottom: __assign(__assign({}, rowSizeBase), { top: void 0, bottom: "-5px" }),
  left: __assign(__assign({}, colSizeBase), { left: "-5px" }),
  topRight: __assign(__assign({}, edgeBase), { right: "-10px", top: "-10px", cursor: "ne-resize" }),
  bottomRight: __assign(__assign({}, edgeBase), { right: "-10px", bottom: "-10px", cursor: "se-resize" }),
  bottomLeft: __assign(__assign({}, edgeBase), { left: "-10px", bottom: "-10px", cursor: "sw-resize" }),
  topLeft: __assign(__assign({}, edgeBase), { left: "-10px", top: "-10px", cursor: "nw-resize" })
};
var Resizer = (0, import_react.memo)(function(props) {
  var onResizeStart = props.onResizeStart, direction = props.direction, children = props.children, replaceStyles = props.replaceStyles, className = props.className;
  var onMouseDown = (0, import_react.useCallback)(function(e) {
    onResizeStart(e, direction);
  }, [onResizeStart, direction]);
  var onTouchStart = (0, import_react.useCallback)(function(e) {
    onResizeStart(e, direction);
  }, [onResizeStart, direction]);
  var style = (0, import_react.useMemo)(function() {
    return __assign(__assign({ position: "absolute", userSelect: "none" }, styles[direction]), replaceStyles !== null && replaceStyles !== void 0 ? replaceStyles : {});
  }, [replaceStyles, direction]);
  return (0, import_jsx_runtime.jsx)("div", { className: className || void 0, style, onMouseDown, onTouchStart, children });
});

// node_modules/re-resizable/lib/index.js
var __extends = /* @__PURE__ */ function() {
  var extendStatics2 = function(d, b) {
    extendStatics2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
    };
    return extendStatics2(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics2(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __assign2 = function() {
  __assign2 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign2.apply(this, arguments);
};
var DEFAULT_SIZE = {
  width: "auto",
  height: "auto"
};
var clamp = function(n, min, max) {
  return Math.max(Math.min(n, max), min);
};
var snap = function(n, size, gridGap) {
  var v = Math.round(n / size);
  return v * size + gridGap * (v - 1);
};
var hasDirection = function(dir, target) {
  return new RegExp(dir, "i").test(target);
};
var isTouchEvent = function(event) {
  return Boolean(event.touches && event.touches.length);
};
var isMouseEvent = function(event) {
  return Boolean((event.clientX || event.clientX === 0) && (event.clientY || event.clientY === 0));
};
var findClosestSnap = function(n, snapArray, snapGap) {
  if (snapGap === void 0) {
    snapGap = 0;
  }
  var closestGapIndex = snapArray.reduce(function(prev, curr, index) {
    return Math.abs(curr - n) < Math.abs(snapArray[prev] - n) ? index : prev;
  }, 0);
  var gap = Math.abs(snapArray[closestGapIndex] - n);
  return snapGap === 0 || gap < snapGap ? snapArray[closestGapIndex] : n;
};
var getStringSize = function(n) {
  n = n.toString();
  if (n === "auto") {
    return n;
  }
  if (n.endsWith("px")) {
    return n;
  }
  if (n.endsWith("%")) {
    return n;
  }
  if (n.endsWith("vh")) {
    return n;
  }
  if (n.endsWith("vw")) {
    return n;
  }
  if (n.endsWith("vmax")) {
    return n;
  }
  if (n.endsWith("vmin")) {
    return n;
  }
  return "".concat(n, "px");
};
var getPixelSize = function(size, parentSize, innerWidth, innerHeight) {
  if (size && typeof size === "string") {
    if (size.endsWith("px")) {
      return Number(size.replace("px", ""));
    }
    if (size.endsWith("%")) {
      var ratio = Number(size.replace("%", "")) / 100;
      return parentSize * ratio;
    }
    if (size.endsWith("vw")) {
      var ratio = Number(size.replace("vw", "")) / 100;
      return innerWidth * ratio;
    }
    if (size.endsWith("vh")) {
      var ratio = Number(size.replace("vh", "")) / 100;
      return innerHeight * ratio;
    }
  }
  return size;
};
var calculateNewMax = function(parentSize, innerWidth, innerHeight, maxWidth, maxHeight, minWidth, minHeight) {
  maxWidth = getPixelSize(maxWidth, parentSize.width, innerWidth, innerHeight);
  maxHeight = getPixelSize(maxHeight, parentSize.height, innerWidth, innerHeight);
  minWidth = getPixelSize(minWidth, parentSize.width, innerWidth, innerHeight);
  minHeight = getPixelSize(minHeight, parentSize.height, innerWidth, innerHeight);
  return {
    maxWidth: typeof maxWidth === "undefined" ? void 0 : Number(maxWidth),
    maxHeight: typeof maxHeight === "undefined" ? void 0 : Number(maxHeight),
    minWidth: typeof minWidth === "undefined" ? void 0 : Number(minWidth),
    minHeight: typeof minHeight === "undefined" ? void 0 : Number(minHeight)
  };
};
var normalizeToPair = function(val) {
  return Array.isArray(val) ? val : [val, val];
};
var definedProps = [
  "as",
  "ref",
  "style",
  "className",
  "grid",
  "gridGap",
  "snap",
  "bounds",
  "boundsByDirection",
  "size",
  "defaultSize",
  "minWidth",
  "minHeight",
  "maxWidth",
  "maxHeight",
  "lockAspectRatio",
  "lockAspectRatioExtraWidth",
  "lockAspectRatioExtraHeight",
  "enable",
  "handleStyles",
  "handleClasses",
  "handleWrapperStyle",
  "handleWrapperClass",
  "children",
  "onResizeStart",
  "onResize",
  "onResizeStop",
  "handleComponent",
  "scale",
  "resizeRatio",
  "snapGap"
];
var baseClassName = "__resizable_base__";
var Resizable = (
  /** @class */
  function(_super) {
    __extends(Resizable2, _super);
    function Resizable2(props) {
      var _a, _b, _c, _d;
      var _this = _super.call(this, props) || this;
      _this.ratio = 1;
      _this.resizable = null;
      _this.parentLeft = 0;
      _this.parentTop = 0;
      _this.resizableLeft = 0;
      _this.resizableRight = 0;
      _this.resizableTop = 0;
      _this.resizableBottom = 0;
      _this.targetLeft = 0;
      _this.targetTop = 0;
      _this.delta = {
        width: 0,
        height: 0
      };
      _this.appendBase = function() {
        if (!_this.resizable || !_this.window) {
          return null;
        }
        var parent = _this.parentNode;
        if (!parent) {
          return null;
        }
        var element = _this.window.document.createElement("div");
        element.style.width = "100%";
        element.style.height = "100%";
        element.style.position = "absolute";
        element.style.transform = "scale(0, 0)";
        element.style.left = "0";
        element.style.flex = "0 0 100%";
        if (element.classList) {
          element.classList.add(baseClassName);
        } else {
          element.className += baseClassName;
        }
        parent.appendChild(element);
        return element;
      };
      _this.removeBase = function(base) {
        var parent = _this.parentNode;
        if (!parent) {
          return;
        }
        parent.removeChild(base);
      };
      _this.state = {
        isResizing: false,
        width: (_b = (_a = _this.propsSize) === null || _a === void 0 ? void 0 : _a.width) !== null && _b !== void 0 ? _b : "auto",
        height: (_d = (_c = _this.propsSize) === null || _c === void 0 ? void 0 : _c.height) !== null && _d !== void 0 ? _d : "auto",
        direction: "right",
        original: {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        },
        backgroundStyle: {
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(0,0,0,0)",
          cursor: "auto",
          opacity: 0,
          position: "fixed",
          zIndex: 9999,
          top: "0",
          left: "0",
          bottom: "0",
          right: "0"
        },
        flexBasis: void 0
      };
      _this.onResizeStart = _this.onResizeStart.bind(_this);
      _this.onMouseMove = _this.onMouseMove.bind(_this);
      _this.onMouseUp = _this.onMouseUp.bind(_this);
      return _this;
    }
    Object.defineProperty(Resizable2.prototype, "parentNode", {
      get: function() {
        if (!this.resizable) {
          return null;
        }
        return this.resizable.parentNode;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Resizable2.prototype, "window", {
      get: function() {
        if (!this.resizable) {
          return null;
        }
        if (!this.resizable.ownerDocument) {
          return null;
        }
        return this.resizable.ownerDocument.defaultView;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Resizable2.prototype, "propsSize", {
      get: function() {
        return this.props.size || this.props.defaultSize || DEFAULT_SIZE;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Resizable2.prototype, "size", {
      get: function() {
        var width = 0;
        var height = 0;
        if (this.resizable && this.window) {
          var orgWidth = this.resizable.offsetWidth;
          var orgHeight = this.resizable.offsetHeight;
          var orgPosition = this.resizable.style.position;
          if (orgPosition !== "relative") {
            this.resizable.style.position = "relative";
          }
          width = this.resizable.style.width !== "auto" ? this.resizable.offsetWidth : orgWidth;
          height = this.resizable.style.height !== "auto" ? this.resizable.offsetHeight : orgHeight;
          this.resizable.style.position = orgPosition;
        }
        return { width, height };
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Resizable2.prototype, "sizeStyle", {
      get: function() {
        var _this = this;
        var size = this.props.size;
        var getSize = function(key) {
          var _a;
          if (typeof _this.state[key] === "undefined" || _this.state[key] === "auto") {
            return "auto";
          }
          if (_this.propsSize && _this.propsSize[key] && ((_a = _this.propsSize[key]) === null || _a === void 0 ? void 0 : _a.toString().endsWith("%"))) {
            if (_this.state[key].toString().endsWith("%")) {
              return _this.state[key].toString();
            }
            var parentSize = _this.getParentSize();
            var value = Number(_this.state[key].toString().replace("px", ""));
            var percent = value / parentSize[key] * 100;
            return "".concat(percent, "%");
          }
          return getStringSize(_this.state[key]);
        };
        var width = size && typeof size.width !== "undefined" && !this.state.isResizing ? getStringSize(size.width) : getSize("width");
        var height = size && typeof size.height !== "undefined" && !this.state.isResizing ? getStringSize(size.height) : getSize("height");
        return { width, height };
      },
      enumerable: false,
      configurable: true
    });
    Resizable2.prototype.getParentSize = function() {
      if (!this.parentNode) {
        if (!this.window) {
          return { width: 0, height: 0 };
        }
        return { width: this.window.innerWidth, height: this.window.innerHeight };
      }
      var base = this.appendBase();
      if (!base) {
        return { width: 0, height: 0 };
      }
      var wrapChanged = false;
      var wrap = this.parentNode.style.flexWrap;
      if (wrap !== "wrap") {
        wrapChanged = true;
        this.parentNode.style.flexWrap = "wrap";
      }
      base.style.position = "relative";
      base.style.minWidth = "100%";
      base.style.minHeight = "100%";
      var size = {
        width: base.offsetWidth,
        height: base.offsetHeight
      };
      if (wrapChanged) {
        this.parentNode.style.flexWrap = wrap;
      }
      this.removeBase(base);
      return size;
    };
    Resizable2.prototype.bindEvents = function() {
      if (this.window) {
        this.window.addEventListener("mouseup", this.onMouseUp);
        this.window.addEventListener("mousemove", this.onMouseMove);
        this.window.addEventListener("mouseleave", this.onMouseUp);
        this.window.addEventListener("touchmove", this.onMouseMove, {
          capture: true,
          passive: false
        });
        this.window.addEventListener("touchend", this.onMouseUp);
      }
    };
    Resizable2.prototype.unbindEvents = function() {
      if (this.window) {
        this.window.removeEventListener("mouseup", this.onMouseUp);
        this.window.removeEventListener("mousemove", this.onMouseMove);
        this.window.removeEventListener("mouseleave", this.onMouseUp);
        this.window.removeEventListener("touchmove", this.onMouseMove, true);
        this.window.removeEventListener("touchend", this.onMouseUp);
      }
    };
    Resizable2.prototype.componentDidMount = function() {
      if (!this.resizable || !this.window) {
        return;
      }
      var computedStyle = this.window.getComputedStyle(this.resizable);
      this.setState({
        width: this.state.width || this.size.width,
        height: this.state.height || this.size.height,
        flexBasis: computedStyle.flexBasis !== "auto" ? computedStyle.flexBasis : void 0
      });
    };
    Resizable2.prototype.componentWillUnmount = function() {
      if (this.window) {
        this.unbindEvents();
      }
    };
    Resizable2.prototype.createSizeForCssProperty = function(newSize, kind) {
      var propsSize = this.propsSize && this.propsSize[kind];
      return this.state[kind] === "auto" && this.state.original[kind] === newSize && (typeof propsSize === "undefined" || propsSize === "auto") ? "auto" : newSize;
    };
    Resizable2.prototype.calculateNewMaxFromBoundary = function(maxWidth, maxHeight) {
      var boundsByDirection = this.props.boundsByDirection;
      var direction = this.state.direction;
      var widthByDirection = boundsByDirection && hasDirection("left", direction);
      var heightByDirection = boundsByDirection && hasDirection("top", direction);
      var boundWidth;
      var boundHeight;
      if (this.props.bounds === "parent") {
        var parent_1 = this.parentNode;
        if (parent_1) {
          boundWidth = widthByDirection ? this.resizableRight - this.parentLeft : parent_1.offsetWidth + (this.parentLeft - this.resizableLeft);
          boundHeight = heightByDirection ? this.resizableBottom - this.parentTop : parent_1.offsetHeight + (this.parentTop - this.resizableTop);
        }
      } else if (this.props.bounds === "window") {
        if (this.window) {
          boundWidth = widthByDirection ? this.resizableRight : this.window.innerWidth - this.resizableLeft;
          boundHeight = heightByDirection ? this.resizableBottom : this.window.innerHeight - this.resizableTop;
        }
      } else if (this.props.bounds) {
        boundWidth = widthByDirection ? this.resizableRight - this.targetLeft : this.props.bounds.offsetWidth + (this.targetLeft - this.resizableLeft);
        boundHeight = heightByDirection ? this.resizableBottom - this.targetTop : this.props.bounds.offsetHeight + (this.targetTop - this.resizableTop);
      }
      if (boundWidth && Number.isFinite(boundWidth)) {
        maxWidth = maxWidth && maxWidth < boundWidth ? maxWidth : boundWidth;
      }
      if (boundHeight && Number.isFinite(boundHeight)) {
        maxHeight = maxHeight && maxHeight < boundHeight ? maxHeight : boundHeight;
      }
      return { maxWidth, maxHeight };
    };
    Resizable2.prototype.calculateNewSizeFromDirection = function(clientX, clientY) {
      var scale = this.props.scale || 1;
      var _a = normalizeToPair(this.props.resizeRatio || 1), resizeRatioX = _a[0], resizeRatioY = _a[1];
      var _b = this.state, direction = _b.direction, original = _b.original;
      var _c = this.props, lockAspectRatio = _c.lockAspectRatio, lockAspectRatioExtraHeight = _c.lockAspectRatioExtraHeight, lockAspectRatioExtraWidth = _c.lockAspectRatioExtraWidth;
      var newWidth = original.width;
      var newHeight = original.height;
      var extraHeight = lockAspectRatioExtraHeight || 0;
      var extraWidth = lockAspectRatioExtraWidth || 0;
      if (hasDirection("right", direction)) {
        newWidth = original.width + (clientX - original.x) * resizeRatioX / scale;
        if (lockAspectRatio) {
          newHeight = (newWidth - extraWidth) / this.ratio + extraHeight;
        }
      }
      if (hasDirection("left", direction)) {
        newWidth = original.width - (clientX - original.x) * resizeRatioX / scale;
        if (lockAspectRatio) {
          newHeight = (newWidth - extraWidth) / this.ratio + extraHeight;
        }
      }
      if (hasDirection("bottom", direction)) {
        newHeight = original.height + (clientY - original.y) * resizeRatioY / scale;
        if (lockAspectRatio) {
          newWidth = (newHeight - extraHeight) * this.ratio + extraWidth;
        }
      }
      if (hasDirection("top", direction)) {
        newHeight = original.height - (clientY - original.y) * resizeRatioY / scale;
        if (lockAspectRatio) {
          newWidth = (newHeight - extraHeight) * this.ratio + extraWidth;
        }
      }
      return { newWidth, newHeight };
    };
    Resizable2.prototype.calculateNewSizeFromAspectRatio = function(newWidth, newHeight, max, min) {
      var _a = this.props, lockAspectRatio = _a.lockAspectRatio, lockAspectRatioExtraHeight = _a.lockAspectRatioExtraHeight, lockAspectRatioExtraWidth = _a.lockAspectRatioExtraWidth;
      var computedMinWidth = typeof min.width === "undefined" ? 10 : min.width;
      var computedMaxWidth = typeof max.width === "undefined" || max.width < 0 ? newWidth : max.width;
      var computedMinHeight = typeof min.height === "undefined" ? 10 : min.height;
      var computedMaxHeight = typeof max.height === "undefined" || max.height < 0 ? newHeight : max.height;
      var extraHeight = lockAspectRatioExtraHeight || 0;
      var extraWidth = lockAspectRatioExtraWidth || 0;
      if (lockAspectRatio) {
        var extraMinWidth = (computedMinHeight - extraHeight) * this.ratio + extraWidth;
        var extraMaxWidth = (computedMaxHeight - extraHeight) * this.ratio + extraWidth;
        var extraMinHeight = (computedMinWidth - extraWidth) / this.ratio + extraHeight;
        var extraMaxHeight = (computedMaxWidth - extraWidth) / this.ratio + extraHeight;
        var lockedMinWidth = Math.max(computedMinWidth, extraMinWidth);
        var lockedMaxWidth = Math.min(computedMaxWidth, extraMaxWidth);
        var lockedMinHeight = Math.max(computedMinHeight, extraMinHeight);
        var lockedMaxHeight = Math.min(computedMaxHeight, extraMaxHeight);
        newWidth = clamp(newWidth, lockedMinWidth, lockedMaxWidth);
        newHeight = clamp(newHeight, lockedMinHeight, lockedMaxHeight);
      } else {
        newWidth = clamp(newWidth, computedMinWidth, computedMaxWidth);
        newHeight = clamp(newHeight, computedMinHeight, computedMaxHeight);
      }
      return { newWidth, newHeight };
    };
    Resizable2.prototype.setBoundingClientRect = function() {
      var adjustedScale = 1 / (this.props.scale || 1);
      if (this.props.bounds === "parent") {
        var parent_2 = this.parentNode;
        if (parent_2) {
          var parentRect = parent_2.getBoundingClientRect();
          this.parentLeft = parentRect.left * adjustedScale;
          this.parentTop = parentRect.top * adjustedScale;
        }
      }
      if (this.props.bounds && typeof this.props.bounds !== "string") {
        var targetRect = this.props.bounds.getBoundingClientRect();
        this.targetLeft = targetRect.left * adjustedScale;
        this.targetTop = targetRect.top * adjustedScale;
      }
      if (this.resizable) {
        var _a = this.resizable.getBoundingClientRect(), left = _a.left, top_1 = _a.top, right = _a.right, bottom = _a.bottom;
        this.resizableLeft = left * adjustedScale;
        this.resizableRight = right * adjustedScale;
        this.resizableTop = top_1 * adjustedScale;
        this.resizableBottom = bottom * adjustedScale;
      }
    };
    Resizable2.prototype.onResizeStart = function(event, direction) {
      if (!this.resizable || !this.window) {
        return;
      }
      var clientX = 0;
      var clientY = 0;
      if (event.nativeEvent && isMouseEvent(event.nativeEvent)) {
        clientX = event.nativeEvent.clientX;
        clientY = event.nativeEvent.clientY;
      } else if (event.nativeEvent && isTouchEvent(event.nativeEvent)) {
        clientX = event.nativeEvent.touches[0].clientX;
        clientY = event.nativeEvent.touches[0].clientY;
      }
      if (this.props.onResizeStart) {
        if (this.resizable) {
          var startResize = this.props.onResizeStart(event, direction, this.resizable);
          if (startResize === false) {
            return;
          }
        }
      }
      if (this.props.size) {
        if (typeof this.props.size.height !== "undefined" && this.props.size.height !== this.state.height) {
          this.setState({ height: this.props.size.height });
        }
        if (typeof this.props.size.width !== "undefined" && this.props.size.width !== this.state.width) {
          this.setState({ width: this.props.size.width });
        }
      }
      this.ratio = typeof this.props.lockAspectRatio === "number" ? this.props.lockAspectRatio : this.size.width / this.size.height;
      var flexBasis;
      var computedStyle = this.window.getComputedStyle(this.resizable);
      if (computedStyle.flexBasis !== "auto") {
        var parent_3 = this.parentNode;
        if (parent_3) {
          var dir = this.window.getComputedStyle(parent_3).flexDirection;
          this.flexDir = dir.startsWith("row") ? "row" : "column";
          flexBasis = computedStyle.flexBasis;
        }
      }
      this.setBoundingClientRect();
      this.bindEvents();
      var state = {
        original: {
          x: clientX,
          y: clientY,
          width: this.size.width,
          height: this.size.height
        },
        isResizing: true,
        backgroundStyle: __assign2(__assign2({}, this.state.backgroundStyle), { cursor: this.window.getComputedStyle(event.target).cursor || "auto" }),
        direction,
        flexBasis
      };
      this.setState(state);
    };
    Resizable2.prototype.onMouseMove = function(event) {
      var _this = this;
      if (!this.state.isResizing || !this.resizable || !this.window) {
        return;
      }
      if (this.window.TouchEvent && isTouchEvent(event)) {
        try {
          event.preventDefault();
          event.stopPropagation();
        } catch (e) {
        }
      }
      var _a = this.props, maxWidth = _a.maxWidth, maxHeight = _a.maxHeight, minWidth = _a.minWidth, minHeight = _a.minHeight;
      var clientX = isTouchEvent(event) ? event.touches[0].clientX : event.clientX;
      var clientY = isTouchEvent(event) ? event.touches[0].clientY : event.clientY;
      var _b = this.state, direction = _b.direction, original = _b.original, width = _b.width, height = _b.height;
      var parentSize = this.getParentSize();
      var max = calculateNewMax(parentSize, this.window.innerWidth, this.window.innerHeight, maxWidth, maxHeight, minWidth, minHeight);
      maxWidth = max.maxWidth;
      maxHeight = max.maxHeight;
      minWidth = max.minWidth;
      minHeight = max.minHeight;
      var _c = this.calculateNewSizeFromDirection(clientX, clientY), newHeight = _c.newHeight, newWidth = _c.newWidth;
      var boundaryMax = this.calculateNewMaxFromBoundary(maxWidth, maxHeight);
      if (this.props.snap && this.props.snap.x) {
        newWidth = findClosestSnap(newWidth, this.props.snap.x, this.props.snapGap);
      }
      if (this.props.snap && this.props.snap.y) {
        newHeight = findClosestSnap(newHeight, this.props.snap.y, this.props.snapGap);
      }
      var newSize = this.calculateNewSizeFromAspectRatio(newWidth, newHeight, { width: boundaryMax.maxWidth, height: boundaryMax.maxHeight }, { width: minWidth, height: minHeight });
      newWidth = newSize.newWidth;
      newHeight = newSize.newHeight;
      if (this.props.grid) {
        var newGridWidth = snap(newWidth, this.props.grid[0], this.props.gridGap ? this.props.gridGap[0] : 0);
        var newGridHeight = snap(newHeight, this.props.grid[1], this.props.gridGap ? this.props.gridGap[1] : 0);
        var gap = this.props.snapGap || 0;
        var w = gap === 0 || Math.abs(newGridWidth - newWidth) <= gap ? newGridWidth : newWidth;
        var h = gap === 0 || Math.abs(newGridHeight - newHeight) <= gap ? newGridHeight : newHeight;
        newWidth = w;
        newHeight = h;
      }
      var delta = {
        width: newWidth - original.width,
        height: newHeight - original.height
      };
      this.delta = delta;
      if (width && typeof width === "string") {
        if (width.endsWith("%")) {
          var percent = newWidth / parentSize.width * 100;
          newWidth = "".concat(percent, "%");
        } else if (width.endsWith("vw")) {
          var vw = newWidth / this.window.innerWidth * 100;
          newWidth = "".concat(vw, "vw");
        } else if (width.endsWith("vh")) {
          var vh = newWidth / this.window.innerHeight * 100;
          newWidth = "".concat(vh, "vh");
        }
      }
      if (height && typeof height === "string") {
        if (height.endsWith("%")) {
          var percent = newHeight / parentSize.height * 100;
          newHeight = "".concat(percent, "%");
        } else if (height.endsWith("vw")) {
          var vw = newHeight / this.window.innerWidth * 100;
          newHeight = "".concat(vw, "vw");
        } else if (height.endsWith("vh")) {
          var vh = newHeight / this.window.innerHeight * 100;
          newHeight = "".concat(vh, "vh");
        }
      }
      var newState = {
        width: this.createSizeForCssProperty(newWidth, "width"),
        height: this.createSizeForCssProperty(newHeight, "height")
      };
      if (this.flexDir === "row") {
        newState.flexBasis = newState.width;
      } else if (this.flexDir === "column") {
        newState.flexBasis = newState.height;
      }
      var widthChanged = this.state.width !== newState.width;
      var heightChanged = this.state.height !== newState.height;
      var flexBaseChanged = this.state.flexBasis !== newState.flexBasis;
      var changed = widthChanged || heightChanged || flexBaseChanged;
      if (changed) {
        (0, import_react_dom.flushSync)(function() {
          _this.setState(newState);
        });
      }
      if (this.props.onResize) {
        if (changed) {
          this.props.onResize(event, direction, this.resizable, delta);
        }
      }
    };
    Resizable2.prototype.onMouseUp = function(event) {
      var _a, _b;
      var _c = this.state, isResizing = _c.isResizing, direction = _c.direction, original = _c.original;
      if (!isResizing || !this.resizable) {
        return;
      }
      if (this.props.onResizeStop) {
        this.props.onResizeStop(event, direction, this.resizable, this.delta);
      }
      if (this.props.size) {
        this.setState({ width: (_a = this.props.size.width) !== null && _a !== void 0 ? _a : "auto", height: (_b = this.props.size.height) !== null && _b !== void 0 ? _b : "auto" });
      }
      this.unbindEvents();
      this.setState({
        isResizing: false,
        backgroundStyle: __assign2(__assign2({}, this.state.backgroundStyle), { cursor: "auto" })
      });
    };
    Resizable2.prototype.updateSize = function(size) {
      var _a, _b;
      this.setState({ width: (_a = size.width) !== null && _a !== void 0 ? _a : "auto", height: (_b = size.height) !== null && _b !== void 0 ? _b : "auto" });
    };
    Resizable2.prototype.renderResizer = function() {
      var _this = this;
      var _a = this.props, enable = _a.enable, handleStyles = _a.handleStyles, handleClasses = _a.handleClasses, handleWrapperStyle = _a.handleWrapperStyle, handleWrapperClass = _a.handleWrapperClass, handleComponent = _a.handleComponent;
      if (!enable) {
        return null;
      }
      var resizers = Object.keys(enable).map(function(dir) {
        if (enable[dir] !== false) {
          return (0, import_jsx_runtime2.jsx)(Resizer, { direction: dir, onResizeStart: _this.onResizeStart, replaceStyles: handleStyles && handleStyles[dir], className: handleClasses && handleClasses[dir], children: handleComponent && handleComponent[dir] ? handleComponent[dir] : null }, dir);
        }
        return null;
      });
      return (0, import_jsx_runtime2.jsx)("div", { className: handleWrapperClass, style: handleWrapperStyle, children: resizers });
    };
    Resizable2.prototype.render = function() {
      var _this = this;
      var extendsProps = Object.keys(this.props).reduce(function(acc, key) {
        if (definedProps.indexOf(key) !== -1) {
          return acc;
        }
        acc[key] = _this.props[key];
        return acc;
      }, {});
      var style = __assign2(__assign2(__assign2({ position: "relative", userSelect: this.state.isResizing ? "none" : "auto" }, this.props.style), this.sizeStyle), { maxWidth: this.props.maxWidth, maxHeight: this.props.maxHeight, minWidth: this.props.minWidth, minHeight: this.props.minHeight, boxSizing: "border-box", flexShrink: 0 });
      if (this.state.flexBasis) {
        style.flexBasis = this.state.flexBasis;
      }
      var Wrapper = this.props.as || "div";
      return (0, import_jsx_runtime2.jsxs)(Wrapper, __assign2({ style, className: this.props.className }, extendsProps, {
        // `ref` is after `extendsProps` to ensure this one wins over a version
        // passed in
        ref: function(c) {
          if (c) {
            _this.resizable = c;
          }
        },
        children: [this.state.isResizing && (0, import_jsx_runtime2.jsx)("div", { style: this.state.backgroundStyle }), this.props.children, this.renderResizer()]
      }));
    };
    Resizable2.defaultProps = {
      as: "div",
      onResizeStart: function() {
      },
      onResize: function() {
      },
      onResizeStop: function() {
      },
      enable: {
        top: true,
        right: true,
        bottom: true,
        left: true,
        topRight: true,
        bottomRight: true,
        bottomLeft: true,
        topLeft: true
      },
      style: {},
      grid: [1, 1],
      gridGap: [0, 0],
      lockAspectRatio: false,
      lockAspectRatioExtraWidth: 0,
      lockAspectRatioExtraHeight: 0,
      scale: 1,
      resizeRatio: 1,
      snapGap: 0
    };
    return Resizable2;
  }(import_react2.PureComponent)
);

// node_modules/react-rnd/lib/index.js
var import_react_dom2 = __toESM(require_react_dom());
var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
  };
  return extendStatics(d, b);
};
function __extends2(d, b) {
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign3 = function() {
  __assign3 = Object.assign || function __assign4(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign3.apply(this, arguments);
};
function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
var resizableStyle = {
  width: "auto",
  height: "auto",
  display: "inline-block",
  position: "absolute",
  top: 0,
  left: 0
};
var getEnableResizingByFlag = function(flag) {
  return {
    bottom: flag,
    bottomLeft: flag,
    bottomRight: flag,
    left: flag,
    right: flag,
    top: flag,
    topLeft: flag,
    topRight: flag
  };
};
var Rnd = (
  /** @class */
  function(_super) {
    __extends2(Rnd2, _super);
    function Rnd2(props) {
      var _this = _super.call(this, props) || this;
      _this.resizingPosition = { x: 0, y: 0 };
      _this.offsetFromParent = { left: 0, top: 0 };
      _this.resizableElement = { current: null };
      _this.originalPosition = { x: 0, y: 0 };
      _this.state = {
        resizing: false,
        bounds: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
        maxWidth: props.maxWidth,
        maxHeight: props.maxHeight
      };
      _this.onResizeStart = _this.onResizeStart.bind(_this);
      _this.onResize = _this.onResize.bind(_this);
      _this.onResizeStop = _this.onResizeStop.bind(_this);
      _this.onDragStart = _this.onDragStart.bind(_this);
      _this.onDrag = _this.onDrag.bind(_this);
      _this.onDragStop = _this.onDragStop.bind(_this);
      _this.getMaxSizesFromProps = _this.getMaxSizesFromProps.bind(_this);
      return _this;
    }
    Rnd2.prototype.componentDidMount = function() {
      this.updateOffsetFromParent();
      var _a = this.offsetFromParent, left = _a.left, top = _a.top;
      var _b = this.getDraggablePosition(), x = _b.x, y = _b.y;
      this.draggable.setState({
        x: x - left,
        y: y - top
      });
      this.forceUpdate();
    };
    Rnd2.prototype.getDraggablePosition = function() {
      var _a = this.draggable.state, x = _a.x, y = _a.y;
      return { x, y };
    };
    Rnd2.prototype.getParent = function() {
      return this.resizable && this.resizable.parentNode;
    };
    Rnd2.prototype.getParentSize = function() {
      return this.resizable.getParentSize();
    };
    Rnd2.prototype.getMaxSizesFromProps = function() {
      var maxWidth = typeof this.props.maxWidth === "undefined" ? Number.MAX_SAFE_INTEGER : this.props.maxWidth;
      var maxHeight = typeof this.props.maxHeight === "undefined" ? Number.MAX_SAFE_INTEGER : this.props.maxHeight;
      return { maxWidth, maxHeight };
    };
    Rnd2.prototype.getSelfElement = function() {
      return this.resizable && this.resizable.resizable;
    };
    Rnd2.prototype.getOffsetHeight = function(boundary) {
      var scale = this.props.scale;
      switch (this.props.bounds) {
        case "window":
          return window.innerHeight / scale;
        case "body":
          return document.body.offsetHeight / scale;
        default:
          return boundary.offsetHeight;
      }
    };
    Rnd2.prototype.getOffsetWidth = function(boundary) {
      var scale = this.props.scale;
      switch (this.props.bounds) {
        case "window":
          return window.innerWidth / scale;
        case "body":
          return document.body.offsetWidth / scale;
        default:
          return boundary.offsetWidth;
      }
    };
    Rnd2.prototype.onDragStart = function(e, data) {
      if (this.props.onDragStart) {
        this.props.onDragStart(e, data);
      }
      var pos = this.getDraggablePosition();
      this.originalPosition = pos;
      if (!this.props.bounds)
        return;
      var parent = this.getParent();
      var scale = this.props.scale;
      var boundary;
      if (this.props.bounds === "parent") {
        boundary = parent;
      } else if (this.props.bounds === "body") {
        var parentRect_1 = parent.getBoundingClientRect();
        var parentLeft_1 = parentRect_1.left;
        var parentTop_1 = parentRect_1.top;
        var bodyRect = document.body.getBoundingClientRect();
        var left_1 = -(parentLeft_1 - parent.offsetLeft * scale - bodyRect.left) / scale;
        var top_1 = -(parentTop_1 - parent.offsetTop * scale - bodyRect.top) / scale;
        var right = (document.body.offsetWidth - this.resizable.size.width * scale) / scale + left_1;
        var bottom = (document.body.offsetHeight - this.resizable.size.height * scale) / scale + top_1;
        return this.setState({ bounds: { top: top_1, right, bottom, left: left_1 } });
      } else if (this.props.bounds === "window") {
        if (!this.resizable)
          return;
        var parentRect_2 = parent.getBoundingClientRect();
        var parentLeft_2 = parentRect_2.left;
        var parentTop_2 = parentRect_2.top;
        var left_2 = -(parentLeft_2 - parent.offsetLeft * scale) / scale;
        var top_2 = -(parentTop_2 - parent.offsetTop * scale) / scale;
        var right = (window.innerWidth - this.resizable.size.width * scale) / scale + left_2;
        var bottom = (window.innerHeight - this.resizable.size.height * scale) / scale + top_2;
        return this.setState({ bounds: { top: top_2, right, bottom, left: left_2 } });
      } else if (typeof this.props.bounds === "string") {
        boundary = document.querySelector(this.props.bounds);
      } else if (this.props.bounds instanceof HTMLElement) {
        boundary = this.props.bounds;
      }
      if (!(boundary instanceof HTMLElement) || !(parent instanceof HTMLElement)) {
        return;
      }
      var boundaryRect = boundary.getBoundingClientRect();
      var boundaryLeft = boundaryRect.left;
      var boundaryTop = boundaryRect.top;
      var parentRect = parent.getBoundingClientRect();
      var parentLeft = parentRect.left;
      var parentTop = parentRect.top;
      var left = (boundaryLeft - parentLeft) / scale;
      var top = boundaryTop - parentTop;
      if (!this.resizable)
        return;
      this.updateOffsetFromParent();
      var offset = this.offsetFromParent;
      this.setState({
        bounds: {
          top: top - offset.top,
          right: left + (boundary.offsetWidth - this.resizable.size.width) - offset.left / scale,
          bottom: top + (boundary.offsetHeight - this.resizable.size.height) - offset.top,
          left: left - offset.left / scale
        }
      });
    };
    Rnd2.prototype.onDrag = function(e, data) {
      if (!this.props.onDrag)
        return;
      var _a = this.offsetFromParent, left = _a.left, top = _a.top;
      if (!this.props.dragAxis || this.props.dragAxis === "both") {
        return this.props.onDrag(e, __assign3(__assign3({}, data), { x: data.x + left, y: data.y + top }));
      } else if (this.props.dragAxis === "x") {
        return this.props.onDrag(e, __assign3(__assign3({}, data), { x: data.x + left, y: this.originalPosition.y + top, deltaY: 0 }));
      } else if (this.props.dragAxis === "y") {
        return this.props.onDrag(e, __assign3(__assign3({}, data), { x: this.originalPosition.x + left, y: data.y + top, deltaX: 0 }));
      }
    };
    Rnd2.prototype.onDragStop = function(e, data) {
      if (!this.props.onDragStop)
        return;
      var _a = this.offsetFromParent, left = _a.left, top = _a.top;
      if (!this.props.dragAxis || this.props.dragAxis === "both") {
        return this.props.onDragStop(e, __assign3(__assign3({}, data), { x: data.x + left, y: data.y + top }));
      } else if (this.props.dragAxis === "x") {
        return this.props.onDragStop(e, __assign3(__assign3({}, data), { x: data.x + left, y: this.originalPosition.y + top, deltaY: 0 }));
      } else if (this.props.dragAxis === "y") {
        return this.props.onDragStop(e, __assign3(__assign3({}, data), { x: this.originalPosition.x + left, y: data.y + top, deltaX: 0 }));
      }
    };
    Rnd2.prototype.onResizeStart = function(e, dir, elementRef) {
      e.stopPropagation();
      this.setState({
        resizing: true
      });
      var scale = this.props.scale;
      var offset = this.offsetFromParent;
      var pos = this.getDraggablePosition();
      this.resizingPosition = { x: pos.x + offset.left, y: pos.y + offset.top };
      this.originalPosition = pos;
      if (this.props.bounds) {
        var parent_1 = this.getParent();
        var boundary = void 0;
        if (this.props.bounds === "parent") {
          boundary = parent_1;
        } else if (this.props.bounds === "body") {
          boundary = document.body;
        } else if (this.props.bounds === "window") {
          boundary = window;
        } else if (typeof this.props.bounds === "string") {
          boundary = document.querySelector(this.props.bounds);
        } else if (this.props.bounds instanceof HTMLElement) {
          boundary = this.props.bounds;
        }
        var self_1 = this.getSelfElement();
        if (self_1 instanceof Element && (boundary instanceof HTMLElement || boundary === window) && parent_1 instanceof HTMLElement) {
          var _a = this.getMaxSizesFromProps(), maxWidth = _a.maxWidth, maxHeight = _a.maxHeight;
          var parentSize = this.getParentSize();
          if (maxWidth && typeof maxWidth === "string") {
            if (maxWidth.endsWith("%")) {
              var ratio = Number(maxWidth.replace("%", "")) / 100;
              maxWidth = parentSize.width * ratio;
            } else if (maxWidth.endsWith("px")) {
              maxWidth = Number(maxWidth.replace("px", ""));
            }
          }
          if (maxHeight && typeof maxHeight === "string") {
            if (maxHeight.endsWith("%")) {
              var ratio = Number(maxHeight.replace("%", "")) / 100;
              maxHeight = parentSize.height * ratio;
            } else if (maxHeight.endsWith("px")) {
              maxHeight = Number(maxHeight.replace("px", ""));
            }
          }
          var selfRect = self_1.getBoundingClientRect();
          var selfLeft = selfRect.left;
          var selfTop = selfRect.top;
          var boundaryRect = this.props.bounds === "window" ? { left: 0, top: 0 } : boundary.getBoundingClientRect();
          var boundaryLeft = boundaryRect.left;
          var boundaryTop = boundaryRect.top;
          var offsetWidth = this.getOffsetWidth(boundary);
          var offsetHeight = this.getOffsetHeight(boundary);
          var hasLeft = dir.toLowerCase().endsWith("left");
          var hasRight = dir.toLowerCase().endsWith("right");
          var hasTop = dir.startsWith("top");
          var hasBottom = dir.startsWith("bottom");
          if ((hasLeft || hasTop) && this.resizable) {
            var max = (selfLeft - boundaryLeft) / scale + this.resizable.size.width;
            this.setState({ maxWidth: max > Number(maxWidth) ? maxWidth : max });
          }
          if (hasRight || this.props.lockAspectRatio && !hasLeft && !hasTop) {
            var max = offsetWidth + (boundaryLeft - selfLeft) / scale;
            this.setState({ maxWidth: max > Number(maxWidth) ? maxWidth : max });
          }
          if ((hasTop || hasLeft) && this.resizable) {
            var max = (selfTop - boundaryTop) / scale + this.resizable.size.height;
            this.setState({
              maxHeight: max > Number(maxHeight) ? maxHeight : max
            });
          }
          if (hasBottom || this.props.lockAspectRatio && !hasTop && !hasLeft) {
            var max = offsetHeight + (boundaryTop - selfTop) / scale;
            this.setState({
              maxHeight: max > Number(maxHeight) ? maxHeight : max
            });
          }
        }
      } else {
        this.setState({
          maxWidth: this.props.maxWidth,
          maxHeight: this.props.maxHeight
        });
      }
      if (this.props.onResizeStart) {
        this.props.onResizeStart(e, dir, elementRef);
      }
    };
    Rnd2.prototype.onResize = function(e, direction, elementRef, delta) {
      var _this = this;
      var newPos = { x: this.originalPosition.x, y: this.originalPosition.y };
      var left = -delta.width;
      var top = -delta.height;
      var directions = ["top", "left", "topLeft", "bottomLeft", "topRight"];
      if (directions.includes(direction)) {
        if (direction === "bottomLeft") {
          newPos.x += left;
        } else if (direction === "topRight") {
          newPos.y += top;
        } else {
          newPos.x += left;
          newPos.y += top;
        }
      }
      var draggableState = this.draggable.state;
      if (newPos.x !== draggableState.x || newPos.y !== draggableState.y) {
        (0, import_react_dom2.flushSync)(function() {
          _this.draggable.setState(newPos);
        });
      }
      this.updateOffsetFromParent();
      var offset = this.offsetFromParent;
      var x = this.getDraggablePosition().x + offset.left;
      var y = this.getDraggablePosition().y + offset.top;
      this.resizingPosition = { x, y };
      if (!this.props.onResize)
        return;
      this.props.onResize(e, direction, elementRef, delta, {
        x,
        y
      });
    };
    Rnd2.prototype.onResizeStop = function(e, direction, elementRef, delta) {
      this.setState({
        resizing: false
      });
      var _a = this.getMaxSizesFromProps(), maxWidth = _a.maxWidth, maxHeight = _a.maxHeight;
      this.setState({ maxWidth, maxHeight });
      if (this.props.onResizeStop) {
        this.props.onResizeStop(e, direction, elementRef, delta, this.resizingPosition);
      }
    };
    Rnd2.prototype.updateSize = function(size) {
      if (!this.resizable)
        return;
      this.resizable.updateSize({ width: size.width, height: size.height });
    };
    Rnd2.prototype.updatePosition = function(position) {
      this.draggable.setState(position);
    };
    Rnd2.prototype.updateOffsetFromParent = function() {
      var scale = this.props.scale;
      var parent = this.getParent();
      var self = this.getSelfElement();
      if (!parent || self === null) {
        return {
          top: 0,
          left: 0
        };
      }
      var parentRect = parent.getBoundingClientRect();
      var parentLeft = parentRect.left;
      var parentTop = parentRect.top;
      var selfRect = self.getBoundingClientRect();
      var position = this.getDraggablePosition();
      var scrollLeft = parent.scrollLeft;
      var scrollTop = parent.scrollTop;
      this.offsetFromParent = {
        left: selfRect.left - parentLeft + scrollLeft - position.x * scale,
        top: selfRect.top - parentTop + scrollTop - position.y * scale
      };
    };
    Rnd2.prototype.render = function() {
      var _this = this;
      var _a = this.props, disableDragging = _a.disableDragging, style = _a.style, dragHandleClassName = _a.dragHandleClassName, position = _a.position, onMouseDown = _a.onMouseDown, onMouseUp = _a.onMouseUp, dragAxis = _a.dragAxis, dragGrid = _a.dragGrid, bounds = _a.bounds, enableUserSelectHack = _a.enableUserSelectHack, cancel = _a.cancel, children = _a.children, onResizeStart = _a.onResizeStart, onResize = _a.onResize, onResizeStop = _a.onResizeStop, onDragStart = _a.onDragStart, onDrag = _a.onDrag, onDragStop = _a.onDragStop, resizeHandleStyles = _a.resizeHandleStyles, resizeHandleClasses = _a.resizeHandleClasses, resizeHandleComponent = _a.resizeHandleComponent, enableResizing = _a.enableResizing, resizeGrid = _a.resizeGrid, resizeHandleWrapperClass = _a.resizeHandleWrapperClass, resizeHandleWrapperStyle = _a.resizeHandleWrapperStyle, scale = _a.scale, allowAnyClick = _a.allowAnyClick, dragPositionOffset = _a.dragPositionOffset, resizableProps = __rest(_a, ["disableDragging", "style", "dragHandleClassName", "position", "onMouseDown", "onMouseUp", "dragAxis", "dragGrid", "bounds", "enableUserSelectHack", "cancel", "children", "onResizeStart", "onResize", "onResizeStop", "onDragStart", "onDrag", "onDragStop", "resizeHandleStyles", "resizeHandleClasses", "resizeHandleComponent", "enableResizing", "resizeGrid", "resizeHandleWrapperClass", "resizeHandleWrapperStyle", "scale", "allowAnyClick", "dragPositionOffset"]);
      var defaultValue = this.props.default ? __assign3({}, this.props.default) : void 0;
      delete resizableProps.default;
      var cursorStyle = disableDragging || dragHandleClassName ? { cursor: "auto" } : { cursor: "move" };
      var innerStyle = __assign3(__assign3(__assign3({}, resizableStyle), cursorStyle), style);
      var _b = this.offsetFromParent, left = _b.left, top = _b.top;
      var draggablePosition;
      if (position) {
        draggablePosition = {
          x: position.x - left,
          y: position.y - top
        };
      }
      var pos = this.state.resizing ? void 0 : draggablePosition;
      var dragAxisOrUndefined = this.state.resizing ? "both" : dragAxis;
      return (0, import_react3.createElement)(
        import_react_draggable.default,
        {
          ref: function(c) {
            if (!c)
              return;
            _this.draggable = c;
          },
          handle: dragHandleClassName ? ".".concat(dragHandleClassName) : void 0,
          defaultPosition: defaultValue,
          onMouseDown,
          // @ts-expect-error
          onMouseUp,
          onStart: this.onDragStart,
          onDrag: this.onDrag,
          onStop: this.onDragStop,
          axis: dragAxisOrUndefined,
          disabled: disableDragging,
          grid: dragGrid,
          bounds: bounds ? this.state.bounds : void 0,
          position: pos,
          enableUserSelectHack,
          cancel,
          scale,
          allowAnyClick,
          nodeRef: this.resizableElement,
          positionOffset: dragPositionOffset
        },
        (0, import_react3.createElement)(Resizable, __assign3({}, resizableProps, { ref: function(c) {
          if (!c)
            return;
          _this.resizable = c;
          _this.resizableElement.current = c.resizable;
        }, defaultSize: defaultValue, size: this.props.size, enable: typeof enableResizing === "boolean" ? getEnableResizingByFlag(enableResizing) : enableResizing, onResizeStart: this.onResizeStart, onResize: this.onResize, onResizeStop: this.onResizeStop, style: innerStyle, minWidth: this.props.minWidth, minHeight: this.props.minHeight, maxWidth: this.state.resizing ? this.state.maxWidth : this.props.maxWidth, maxHeight: this.state.resizing ? this.state.maxHeight : this.props.maxHeight, grid: resizeGrid, handleWrapperClass: resizeHandleWrapperClass, handleWrapperStyle: resizeHandleWrapperStyle, lockAspectRatio: this.props.lockAspectRatio, lockAspectRatioExtraWidth: this.props.lockAspectRatioExtraWidth, lockAspectRatioExtraHeight: this.props.lockAspectRatioExtraHeight, handleStyles: resizeHandleStyles, handleClasses: resizeHandleClasses, handleComponent: resizeHandleComponent, scale: this.props.scale }), children)
      );
    };
    Rnd2.defaultProps = {
      maxWidth: Number.MAX_SAFE_INTEGER,
      maxHeight: Number.MAX_SAFE_INTEGER,
      scale: 1,
      onResizeStart: function() {
      },
      onResize: function() {
      },
      onResizeStop: function() {
      },
      onDragStart: function() {
      },
      onDrag: function() {
      },
      onDragStop: function() {
      }
    };
    return Rnd2;
  }(import_react3.PureComponent)
);
export {
  Rnd
};
/*! Bundled license information:

react-is/cjs/react-is.development.js:
  (** @license React v16.13.1
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

object-assign/index.js:
  (*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  *)

react-rnd/lib/index.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0
  
  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.
  
  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** *)
*/
//# sourceMappingURL=react-rnd.js.map
