/*! http://mths.be/contains v0.1.0 by @mathias */
if (!String.prototype.contains) {
        (function() {
                'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
                var defineProperty = (function() {
                        // IE 8 only supports `Object.defineProperty` on DOM elements
                        try {
                                var object = {};
                                var $defineProperty = Object.defineProperty;
                                var result = $defineProperty(object, object, object) && $defineProperty;
                        } catch(error) {}
                        return result;
                }());
                var indexOf = ''.indexOf;
                var contains = function(search) {
                        if (this == null) {
                                throw TypeError();
                        }
                        var string = String(this);
                        var stringLength = string.length;
                        var searchString = String(search);
                        var searchLength = searchString.length;
                        var position = arguments.length > 1 ? arguments[1] : undefined;
                        // `ToInteger`
                        var pos = position ? Number(position) : 0;
                        if (pos != pos) { // better `isNaN`
                                pos = 0;
                        }
                        var start = Math.min(Math.max(pos, 0), stringLength);
                        // Avoid the `indexOf` call if no match is possible
                        if (searchLength + start > stringLength) {
                                return false;
                        }
                        return indexOf.call(string, searchString, pos) != -1;
                };
                if (defineProperty) {
                        defineProperty(String.prototype, 'contains', {
                                'value': contains,
                                'configurable': true,
                                'writable': true
                        });
                } else {
                        String.prototype.contains = contains;
                }
        }());
}

if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length >>> 0;
    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;
 
    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}