!(function(e) {
    (e.fn.appear = function(a, r) {
        var p = e.extend({
            data: void 0,
            one: !0,
            accX: 0,
            accY: 0
        }, r);
        return this.each(function() {
            var r = e(this);
            if (((r.appeared = !1), a)) {
                var n = e(window),
                    t = function() {
                        if (r.is(":visible")) {
                            var e = n.scrollLeft(),
                                a = n.scrollTop(),
                                t = r.offset(),
                                c = t.left,
                                i = t.top,
                                o = p.accX,
                                f = p.accY,
                                s = r.height(),
                                l = n.height(),
                                h = r.width(),
                                d = n.width();
                            i + s + f >= a &&
                                i <= a + l + f &&
                                c + h + o >= e &&
                                c <= e + d + o ?
                                r.appeared || r.trigger("appear", p.data) :
                                (r.appeared = !1);
                        } else r.appeared = !1;
                    },
                    c = function() {
                        if (((r.appeared = !0), p.one)) {
                            n.unbind("scroll", t);
                            var c = e.inArray(t, e.fn.appear.checks);
                            c >= 0 && e.fn.appear.checks.splice(c, 1);
                        }
                        a.apply(this, arguments);
                    };
                p.one ? r.one("appear", p.data, c) : r.bind("appear", p.data, c),
                    n.scroll(t),
                    e.fn.appear.checks.push(t),
                    t();
            } else r.trigger("appear", p.data);
        });
    }),
    e.extend(e.fn.appear, {
            checks: [],
            timeout: null,
            checkAll: function() {
                var a = e.fn.appear.checks.length;
                if (a > 0)
                    for (; a--;) e.fn.appear.checks[a]();
            },
            run: function() {
                e.fn.appear.timeout && clearTimeout(e.fn.appear.timeout),
                    (e.fn.appear.timeout = setTimeout(e.fn.appear.checkAll, 20));
            },
        }),
        e.each(
            [
                "append",
                "prepend",
                "after",
                "before",
                "attr",
                "removeAttr",
                "addClass",
                "removeClass",
                "toggleClass",
                "remove",
                "css",
                "show",
                "hide",
            ],
            function(a, r) {
                var p = e.fn[r];
                p &&
                    (e.fn[r] = function() {
                        var a = p.apply(this, arguments);
                        return e.fn.appear.run(), a;
                    });
            }
        );
})(jQuery);