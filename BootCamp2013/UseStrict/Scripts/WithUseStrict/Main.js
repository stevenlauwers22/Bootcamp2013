﻿(function () {
    "use strict";

    function printToConsole(output) {
        console.log(output);
    }

    var variablesAndProperties = function() {
        var noGlobalAssignment = function() {
            foo = "bar"; // throws exception : not defined
        },
            extensibleObject = function() {

                var obj = {};
                obj.name = "QFrame";

                printToConsole(obj.name);
                // QFrame

                printToConsole(Object.isExtensible(obj));
                // true

                Object.preventExtensions(obj);

                obj.url = "http://www.qframe.be"; // throws exception : non extensible
            },
            multipleDefine = function() {
                //var obj = { foo: "bar", foo : "rab" }; // throws exception : duplicate declaration
            },
            propertyDescriptor = function() {
                var obj = {};

                Object.defineProperty(obj, "value", {
                    value: true,
                    writable: false,
                    enumerable: true,
                    configurable: true
                });

                (function() {
                    var name = "QFrame";

                    Object.defineProperty(obj, "name", {
                        get: function() { return name; },
                        set: function(value) { name = value; }
                    });
                })();

                printToConsole(obj.value);
                // true

                printToConsole(obj.name);
                // QFrame

                obj.name = "QFrame NV";

                printToConsole(obj.name);
                // QFrame NV

                for (var prop in obj)
                    printToConsole(prop);
                // value
                // name

                obj.value = false; // throws exception : writalble : false

                Object.defineProperty(obj, "value",
                    {
                        writeable: true,
                        configurable: false
                    });

                obj.value = false;

                printToConsole(obj.value);
                // false

                delete obj.value; // throws exception : configurable : false
            };

        return {
            noGlobalAssignment: noGlobalAssignment,
            extensibleObject: extensibleObject,
            multipleDefine: multipleDefine,
            propertyDescriptor: propertyDescriptor
        };
    }(),
        evalExamples = function() {
            var useEval = function() {
                // Any use throws an exception!
                
                //var eval = {};
                
                //for (var eval in obj) {
                //}
                
                //function eval(){}
                
                //function test(eval){}
                
                //function(eval){}

                //eval("var a = false;");
                //printToConsole( typeof a );
                // undefined
            };

            return {
                useEval: useEval              
            };
        }(),
        functions = function () {
            var setArguments = function() {
                //arguments = [""]; // throws exception: can't assign value to arguments
            },
                //identicalArguments = function(par, par) { // throws exception: duplicate parameter names
                //},
                argumentsCalleeWrong = function() {
                    return function(n) {
                        if (n <= 1)
                            return 1;
                        return n * arguments.callee(n - 1);
                    };
                },
                argumentsCalleeRight = function() {
                    return function rec(n) {
                        if (n <= 1)
                            return 1;
                        return n * rec(n - 1);
                    };
                };

            return {
                setArguments: setArguments,
                //identicalArguments: identicalArguments,
                argumentsCalleeWrong: argumentsCalleeWrong,
                argumentsCalleeRight: argumentsCalleeRight
            };
        }(),
        withExample = function () {
            var usage = function() {
                var obj = {};

                with ({ o: obj }) { // throws exception: strict mode code may not include a with statement
                    o.name = "QFrame";
                    o.url = "http://www.qframe.be";
                };
               
            };

            return {
                usage : usage
            };
        }();

    //variablesAndProperties.noGlobalAssignment();
    //variablesAndProperties.extensibleObject();
    //variablesAndProperties.multipleDefine();
    //variablesAndProperties.propertyDescriptor();

    //evalExamples.useEval();
    
    //functions.setArguments();
    //functions.identicalArguments("test1", "test2");
    //printToConsole(functions.argumentsCalleeWrong()(5)); // throws exception: callee may not be accessed for calls on them
    printToConsole(functions.argumentsCalleeRight()(5));
    // 120

    withExample.usage();
})();