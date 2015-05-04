/*!
 * Dacoo - Web Worker Controller
 * https://github.com/jamesliu96/Dacoo
 *
 * Copyright (c) 2015 James Liu
 * Released under the MIT license
 */
var Dacoo = {};

Dacoo.$ = function(a) {
    a = a.split("/");
    for (var c = 0, b = this.map; c < a.length; c++) {
        b = b[a[c]] || b;
    }
    return b;
};

Dacoo.map = {
    eval: function(d) {
        return eval(d);
    }
};

onmessage = function(e) {
    var m = Dacoo.$(e.data.action), r;
    if (typeof m == "function") {
        r = m(e.data.argument);
    } else {
        r = m;
    }
    postMessage({
        action: e.data.action,
        result: r
    });
};

Dacoo.extend = function(a, c) {
    this.map[a] = this.map[a] || c;
};

/*** EDIT THE CODE BELOW ***/
Dacoo.extend("exec", function(s) {
    return {
        speed: Math.pow(s.w, 1 / 3) * 0.6,
        oy: s.fs * (Math.random() * s.cr | 0)
    };
});