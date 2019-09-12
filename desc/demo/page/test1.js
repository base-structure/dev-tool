module.exports = {
    isString: function(obj) {
        return Object.prototype.toString.call(obj) === "[object String]";
    },
    isArray: function(obj) {
        return Object.prototype.toString.call(obj) === "[object Array]";
    },
    isObject: function(obj) {
        return Object.prototype.toString.call(obj) === "[object Object]";
    }
}
