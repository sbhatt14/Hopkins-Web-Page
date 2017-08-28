! function t(e, r, n) {
    function i(o, s) {
        if (!r[o]) {
            if (!e[o]) {
                var u = "function" == typeof require && require;
                if (!s && u) return u(o, !0);
                if (a) return a(o, !0);
                throw new Error("Cannot find module '" + o + "'")
            }
            var c = r[o] = {
                exports: {}
            };
            e[o][0].call(c.exports, function(t) {
                var r = e[o][1][t];
                return i(r ? r : t)
            }, c, c.exports, t, e, r, n)
        }
        return r[o].exports
    }
    for (var a = "function" == typeof require && require, o = 0; o < n.length; o++) i(n[o]);
    return i
}({
    1: [function(t, e, r) {
        var n = t("./lib/WidgetCreator");
        new n(document.querySelectorAll(".hub-widget"))
    }, {
        "./lib/WidgetCreator": 3
    }],
    2: [function(t, e, r) {
        var n = t("./api"),
            i = t("./utils"),
            a = t("./date-formatter"),
            o = function(t) {
                this.widget = t, this.api = new n({
                    key: t.getAttribute("data-key"),
                    v: t.getAttribute("data-version")
                })
            };
        o.prototype.create = function() {
            this.createBaseHtml();
            var t = this;
            this.getData(function(e, r) {
                return e ? t.displayError() : void t.populateWidget(r)
            })
        }, o.prototype.createBaseHtml = function() {
            var t = this.widget.getAttribute("data-title");
            this.title = t ? t : "News from the Hub";
            var e = '<div class="header">' + this.title + "</div>";
            e += '<div class="content loading" ></div>', e += '<div class="hubpower clearfix"><div class="link"><a href="http://hub.jhu.edu "target="_blank">http://hub.jhu.edu</a></div><div class="image"><a href="http://hub.jhu.edu"><span>Powered by the Hub</span></a></div></div>', this.widget.innerHTML = e
        }, o.prototype.getQueryStringParams = function() {
            var t = {
                    per_page: 5
                },
                e = parseInt(this.widget.getAttribute("data-count"));
            i.isNumeric(e) && (t.per_page = e);
            var r = this.widget.getAttribute("data-channels");
            r && (t.channels = r);
            var n = this.widget.getAttribute("data-tags");
            n && (t.tags = n);
            var a = this.widget.getAttribute("data-topics");
            if (a && (t.topics = a), "events" === this.type) {
                var o = this.widget.getAttribute("data-featured");
                o && (t.featured = !0)
            }
            return t
        }, o.prototype.getData = function(t) {
            var e = this.widget.getAttribute("data-type");
            if (this.type = e ? e : "articles", !this.api[this.type]) return this.displayError(this.widget);
            var r = this.getQueryStringParams();
            this.api[this.type](r).then(function(e) {
                return e.error ? t(e.error) : t(null, e)
            })
        }, o.prototype.populateWidget = function(t) {
            var e = "";
            return "articles" == this.type ? e = this.getFormattedArticles(t) : "events" == this.type && (e = this.getFormattedEvents(t)), this.contentDiv = this.widget.querySelector(".content"), i.removeClass(this.contentDiv, "loading"), e ? void(this.contentDiv.innerHTML = "<ul>" + e + "</ul>") : this.displayError()
        }, o.prototype.getFormattedArticles = function(t) {
            var e = t._embedded.articles;
            if (e) {
                for (var r = "", n = 0, i = e.length; i > n; n++) {
                    var o = e[n],
                        s = new a(o.publish_date);
                    r += '<li><p class="headline"><a href="' + o.url + ' "target="_blank" ">' + o.headline + "</a></p>", r += '<p class="pubdate">' + s.article() + "</a></p></li>"
                }
                return r
            }
        }, o.prototype.getFormattedEvents = function(t) {
            var e = t._embedded.events;
            if (e) {
                for (var r = "", n = 0, i = e.length; i > n; n++) {
                    var o = e[n],
                        s = new a(o.start_date + " " + o.start_time);
                    r += '<li><p class="headline"><a href="' + o.url + '">' + o.name + "</a></p>", r += '<p class="pubdate">' + s.event() + "</a></p></li>"
                }
                return r
            }
        }, o.prototype.displayError = function() {
            this.contentDiv = this.widget.querySelector(".content"), i.removeClass(this.contentDiv, "loading"), this.contentDiv.innerHTML = '<p>Sorry, no results were found. Trying checking out <a href="http://hub.jhu.edu">The Hub</a> for the latest Johns Hopkins news and events.</p>'
        }, e.exports = o
    }, {
        "./api": 5,
        "./date-formatter": 6,
        "./utils": 8
    }],
    3: [function(t, e, r) {
        var n = t("./Widget");
        e.exports = function(t) {
            for (var e = t.length, r = 0; e > r; r++) {
                var i = t.item(r),
                    a = new n(i);
                a.create()
            }
        }
    }, {
        "./Widget": 2
    }],
    4: [function(t, e, r) {
        var n = t("./deferred"),
            i = function() {};
        i.prototype.getXHR = function() {
            var t;
            if ("undefined" != typeof XMLHttpRequest) t = new XMLHttpRequest;
            else
                for (var e = ["Microsoft.XmlHttp", "MSXML2.XmlHttp", "MSXML2.XmlHttp.3.0", "MSXML2.XmlHttp.4.0", "MSXML2.XmlHttp.5.0"], r = 0, n = e.length; n > r; r++) try {
                    t = new ActiveXObject(e[r]);
                    break
                } catch (i) {}
            return t
        }, i.prototype.crossDomainRequest = function(t) {
            var e = document.createElement("script");
            e.src = t, document.body.appendChild(e)
        }, i.prototype.get = function(t) {
            var e, r = new n;
            if (t.dataType && "jsonp" == t.dataType.toLowerCase()) {
                var i = this.randomCallbackName();
                window[i] = r.resolve, t.data.callback = i, e = t.url + this.createQueryString(t.data), this.crossDomainRequest(e)
            } else {
                e = t.url + this.createQueryString(t.data);
                var a = getXHR();
                a.onreadystatechange = function() {
                    4 === a.readyState && (200 == a.status ? r.resolve(a.responseText, a.status) : r.reject(a.status))
                }, a.open("GET", e, !0), a.send(null)
            }
            return r.promise
        }, i.prototype.createQueryString = function(t) {
            var e = "",
                r = !1;
            for (var n in t) r && (e += "&"), e += n + "=" + t[n], r = !0;
            return "?" + e
        }, i.prototype.random = function() {
            return Math.floor(1e10 * Math.random())
        }, i.prototype.randomCallbackName = function() {
            var t = (new Date).getTime();
            return "Ajax_" + this.random() + "_" + t + "_" + this.random()
        }, e.exports = new i
    }, {
        "./deferred": 7
    }],
    5: [function(t, e, r) {
        var n = t("./ajax"),
            i = function(t) {
                this.key = t.key, this.v = t.v
            };
        i.prototype.get = function(t, e) {
            return e.v = this.v, e.key = this.key, n.get({
                url: "https://api.hub.jhu.edu/" + t,
                dataType: "jsonp",
                data: e
            })
        }, i.prototype.articles = function(t) {
            return this.get("articles", t)
        }, i.prototype.events = function(t, e) {
            return e === !0 && (t.featured = !0), this.get("events", t)
        }, e.exports = i
    }, {
        "./ajax": 4
    }],
    6: [function(t, e, r) {
        function n(t) {
            var e = {
                    1: "January",
                    2: "February",
                    3: "March",
                    4: "April",
                    5: "May",
                    6: "June",
                    7: "July",
                    8: "August",
                    9: "September",
                    10: "October",
                    11: "November",
                    12: "December"
                },
                r = t.getMonth() + 1;
            return e[r]
        }

        function i(t) {
            var e = t.getHours();
            return e > 12 ? e - 12 : 0 === e ? 12 : e
        }

        function a(t) {
            var e = t.getMinutes();
            return 10 > e ? "0" + e.toString() : e.toString()
        }

        function o(t) {
            var e = t.getHours();
            return 12 > e ? "am" : "pm"
        }

        function s(t) {
            var e = t.split(" "),
                t = e[0].split("-"),
                r = e[1].split(":"),
                n = parseInt(t[1]) - 1;
            return new Date(t[0], n, t[2], r[0], r[1])
        }
        var u = function(t) {
            if ("number" == typeof t) {
                var e = 1e3 * t;
                this.dateObject = new Date(e)
            } else this.dateObject = s(t);
            this.date = {
                timstamp: e,
                dayOfMonth: this.dateObject.getDate(),
                monthName: n(this.dateObject),
                year: this.dateObject.getFullYear(),
                hour: i(this.dateObject),
                minutes: a(this.dateObject),
                ampm: o(this.dateObject)
            }
        };
        u.prototype.article = function() {
            return this.date.monthName + " " + this.date.dayOfMonth + ", " + this.date.year
        }, u.prototype.event = function() {
            return this.date.monthName + " " + this.date.dayOfMonth + " at " + this.date.hour + ":" + this.date.minutes + this.date.ampm
        }, e.exports = u
    }, {}],
    7: [function(t, e, r) {
        var n = function() {
            var t = {
                newDefer: {},
                resolve: function(e, r, n) {
                    var i = t.fulfilled(e, r, n);
                    i && i.then ? i.then(function(e) {
                        t.newDefer.resolve(e)
                    }) : "function" == typeof t.newDefer.resolve && t.newDefer.resolve(i)
                },
                reject: function(e) {
                    var r = t.error(e);
                    e && e.then ? e.then(function(e) {
                        t.newDefer.resolve(e)
                    }) : "function" == typeof t.newDefer.reject && t.newDefer.reject(r)
                },
                fulfilled: function(t, e, r) {},
                error: function(t, e) {},
                progress: function() {},
                promise: {
                    then: function(e, r, i) {
                        return t.fulfilled = "function" == typeof e ? e : function() {}, t.error = "function" == typeof r ? r : function() {}, t.progress = "function" == typeof i ? i : function() {}, t.newDefer = new n, t.newDefer.promise
                    }
                }
            };
            return t
        };
        e.exports = n
    }, {}],
    8: [function(t, e, r) {
        var n = function() {};
        n.prototype.removeClass = function(t, e) {
            var r = t.className,
                n = new RegExp(e),
                i = r.replace(n, "");
            t.className = i
        }, n.prototype.isNumeric = function(t) {
            return !isNaN(parseFloat(t)) && isFinite(t)
        }, e.exports = new n
    }, {}]
}, {}, [1]);