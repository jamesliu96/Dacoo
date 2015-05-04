/*!
 * Dacoo - Web Worker Controller
 * https://github.com/jamesliu96/Dacoo
 *
 * Copyright (c) 2015 James Liu
 * Released under the MIT license
 */
;(function(window) {
    var Dacoo = function() {
        this.worker = new Worker(Dacoo.path + 'dacoo-worker.js');
        this.worker.onmessage = function(e) {
            _done(e.data);
        };
    };

    Dacoo.dom = window.document;

    Dacoo.$ = function(a) {
        a = a.split("/");
        for (var c = 0, b = this.map; c < a.length; c++) {
            b = b[a[c]] || b;
        }
        return b;
    };

    Object.defineProperty(Dacoo, 'path', {
        get: function() {
            var st = Dacoo.dom.getElementsByTagName('script');
            for (var i = 0; i < st.length; i++) {
                var sc = st[i].src,
                    ps = sc.indexOf('dacoo.js');
                if (ps > 0) {
                    return sc.substring(0, ps);
                }
            }
            return '';
        }
    });

    Dacoo.map = {
        eval: function(d) {
            console.log(d);
        }
    };

    Dacoo.extend = function(a, c) {
        this.map[a] = this.map[a] || c;
    };

    var _done = function(d) {
        Dacoo.$(d.action)(d.result);
    };

    Dacoo.prototype.exec = function(a, g) {
        this.worker.postMessage({
            action: a,
            argument: g
        });
    };

    window.Dacoo = Dacoo;
})(window);