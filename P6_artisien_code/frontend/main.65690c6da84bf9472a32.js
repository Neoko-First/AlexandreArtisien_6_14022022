(window.webpackJsonp = window.webpackJsonp || []).push([
  [1],
  {
    0: function (t, e, n) {
      t.exports = n("zUnb");
    },
    crnd: function (t, e) {
      function n(t) {
        return Promise.resolve().then(function () {
          var e = new Error("Cannot find module '" + t + "'");
          throw ((e.code = "MODULE_NOT_FOUND"), e);
        });
      }
      (n.keys = function () {
        return [];
      }),
        (n.resolve = n),
        (t.exports = n),
        (n.id = "crnd");
    },
    mrSG: function (t, e, n) {
      "use strict";
      n.d(e, "b", function () {
        return o;
      }),
        n.d(e, "a", function () {
          return i;
        }),
        n.d(e, "e", function () {
          return a;
        }),
        n.d(e, "c", function () {
          return s;
        }),
        n.d(e, "d", function () {
          return u;
        });
      var r = function (t, e) {
        return (r =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (t, e) {
              t.__proto__ = e;
            }) ||
          function (t, e) {
            for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
          })(t, e);
      };
      function o(t, e) {
        function n() {
          this.constructor = t;
        }
        r(t, e),
          (t.prototype =
            null === e
              ? Object.create(e)
              : ((n.prototype = e.prototype), new n()));
      }
      var i = function () {
        return (i =
          Object.assign ||
          function (t) {
            for (var e, n = 1, r = arguments.length; n < r; n++)
              for (var o in (e = arguments[n]))
                Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
            return t;
          }).apply(this, arguments);
      };
      function a(t) {
        var e = "function" == typeof Symbol && t[Symbol.iterator],
          n = 0;
        return e
          ? e.call(t)
          : {
              next: function () {
                return (
                  t && n >= t.length && (t = void 0),
                  { value: t && t[n++], done: !t }
                );
              },
            };
      }
      function s(t, e) {
        var n = "function" == typeof Symbol && t[Symbol.iterator];
        if (!n) return t;
        var r,
          o,
          i = n.call(t),
          a = [];
        try {
          for (; (void 0 === e || e-- > 0) && !(r = i.next()).done; )
            a.push(r.value);
        } catch (s) {
          o = { error: s };
        } finally {
          try {
            r && !r.done && (n = i.return) && n.call(i);
          } finally {
            if (o) throw o.error;
          }
        }
        return a;
      }
      function u() {
        for (var t = [], e = 0; e < arguments.length; e++)
          t = t.concat(s(arguments[e]));
        return t;
      }
    },
    zUnb: function (t, e, n) {
      "use strict";
      n.r(e);
      var r = n("mrSG"),
        o = (function () {
          return (
            Array.isArray ||
            function (t) {
              return t && "number" == typeof t.length;
            }
          );
        })();
      function i(t) {
        return null !== t && "object" == typeof t;
      }
      function a(t) {
        return "function" == typeof t;
      }
      var s = (function () {
          function t(t) {
            return (
              Error.call(this),
              (this.message = t
                ? t.length +
                  " errors occurred during unsubscription:\n" +
                  t
                    .map(function (t, e) {
                      return e + 1 + ") " + t.toString();
                    })
                    .join("\n  ")
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = t),
              this
            );
          }
          return (t.prototype = Object.create(Error.prototype)), t;
        })(),
        u = (function () {
          function t(t) {
            (this.closed = !1),
              (this._parentOrParents = null),
              (this._subscriptions = null),
              t && (this._unsubscribe = t);
          }
          return (
            (t.prototype.unsubscribe = function () {
              var e;
              if (!this.closed) {
                var n = this._parentOrParents,
                  r = this._unsubscribe,
                  u = this._subscriptions;
                if (
                  ((this.closed = !0),
                  (this._parentOrParents = null),
                  (this._subscriptions = null),
                  n instanceof t)
                )
                  n.remove(this);
                else if (null !== n)
                  for (var c = 0; c < n.length; ++c) n[c].remove(this);
                if (a(r))
                  try {
                    r.call(this);
                  } catch (f) {
                    e = f instanceof s ? l(f.errors) : [f];
                  }
                if (o(u)) {
                  c = -1;
                  for (var h = u.length; ++c < h; ) {
                    var p = u[c];
                    if (i(p))
                      try {
                        p.unsubscribe();
                      } catch (f) {
                        (e = e || []),
                          f instanceof s
                            ? (e = e.concat(l(f.errors)))
                            : e.push(f);
                      }
                  }
                }
                if (e) throw new s(e);
              }
            }),
            (t.prototype.add = function (e) {
              var n = e;
              if (!e) return t.EMPTY;
              switch (typeof e) {
                case "function":
                  n = new t(e);
                case "object":
                  if (
                    n === this ||
                    n.closed ||
                    "function" != typeof n.unsubscribe
                  )
                    return n;
                  if (this.closed) return n.unsubscribe(), n;
                  if (!(n instanceof t)) {
                    var r = n;
                    (n = new t())._subscriptions = [r];
                  }
                  break;
                default:
                  throw new Error(
                    "unrecognized teardown " + e + " added to Subscription."
                  );
              }
              var o = n._parentOrParents;
              if (null === o) n._parentOrParents = this;
              else if (o instanceof t) {
                if (o === this) return n;
                n._parentOrParents = [o, this];
              } else {
                if (-1 !== o.indexOf(this)) return n;
                o.push(this);
              }
              var i = this._subscriptions;
              return null === i ? (this._subscriptions = [n]) : i.push(n), n;
            }),
            (t.prototype.remove = function (t) {
              var e = this._subscriptions;
              if (e) {
                var n = e.indexOf(t);
                -1 !== n && e.splice(n, 1);
              }
            }),
            (t.EMPTY = (function (t) {
              return (t.closed = !0), t;
            })(new t())),
            t
          );
        })();
      function l(t) {
        return t.reduce(function (t, e) {
          return t.concat(e instanceof s ? e.errors : e);
        }, []);
      }
      var c = !1,
        h = {
          Promise: void 0,
          set useDeprecatedSynchronousErrorHandling(t) {
            c = t;
          },
          get useDeprecatedSynchronousErrorHandling() {
            return c;
          },
        };
      function p(t) {
        setTimeout(function () {
          throw t;
        }, 0);
      }
      var f = {
          closed: !0,
          next: function (t) {},
          error: function (t) {
            if (h.useDeprecatedSynchronousErrorHandling) throw t;
            p(t);
          },
          complete: function () {},
        },
        d = (function () {
          return "function" == typeof Symbol
            ? Symbol("rxSubscriber")
            : "@@rxSubscriber_" + Math.random();
        })(),
        m = (function (t) {
          function e(n, r, o) {
            var i = t.call(this) || this;
            switch (
              ((i.syncErrorValue = null),
              (i.syncErrorThrown = !1),
              (i.syncErrorThrowable = !1),
              (i.isStopped = !1),
              arguments.length)
            ) {
              case 0:
                i.destination = f;
                break;
              case 1:
                if (!n) {
                  i.destination = f;
                  break;
                }
                if ("object" == typeof n) {
                  n instanceof e
                    ? ((i.syncErrorThrowable = n.syncErrorThrowable),
                      (i.destination = n),
                      n.add(i))
                    : ((i.syncErrorThrowable = !0),
                      (i.destination = new y(i, n)));
                  break;
                }
              default:
                (i.syncErrorThrowable = !0),
                  (i.destination = new y(i, n, r, o));
            }
            return i;
          }
          return (
            r.b(e, t),
            (e.prototype[d] = function () {
              return this;
            }),
            (e.create = function (t, n, r) {
              var o = new e(t, n, r);
              return (o.syncErrorThrowable = !1), o;
            }),
            (e.prototype.next = function (t) {
              this.isStopped || this._next(t);
            }),
            (e.prototype.error = function (t) {
              this.isStopped || ((this.isStopped = !0), this._error(t));
            }),
            (e.prototype.complete = function () {
              this.isStopped || ((this.isStopped = !0), this._complete());
            }),
            (e.prototype.unsubscribe = function () {
              this.closed ||
                ((this.isStopped = !0), t.prototype.unsubscribe.call(this));
            }),
            (e.prototype._next = function (t) {
              this.destination.next(t);
            }),
            (e.prototype._error = function (t) {
              this.destination.error(t), this.unsubscribe();
            }),
            (e.prototype._complete = function () {
              this.destination.complete(), this.unsubscribe();
            }),
            (e.prototype._unsubscribeAndRecycle = function () {
              var t = this._parentOrParents;
              return (
                (this._parentOrParents = null),
                this.unsubscribe(),
                (this.closed = !1),
                (this.isStopped = !1),
                (this._parentOrParents = t),
                this
              );
            }),
            e
          );
        })(u),
        y = (function (t) {
          function e(e, n, r, o) {
            var i,
              s = t.call(this) || this;
            s._parentSubscriber = e;
            var u = s;
            return (
              a(n)
                ? (i = n)
                : n &&
                  ((i = n.next),
                  (r = n.error),
                  (o = n.complete),
                  n !== f &&
                    (a((u = Object.create(n)).unsubscribe) &&
                      s.add(u.unsubscribe.bind(u)),
                    (u.unsubscribe = s.unsubscribe.bind(s)))),
              (s._context = u),
              (s._next = i),
              (s._error = r),
              (s._complete = o),
              s
            );
          }
          return (
            r.b(e, t),
            (e.prototype.next = function (t) {
              if (!this.isStopped && this._next) {
                var e = this._parentSubscriber;
                h.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable
                  ? this.__tryOrSetError(e, this._next, t) && this.unsubscribe()
                  : this.__tryOrUnsub(this._next, t);
              }
            }),
            (e.prototype.error = function (t) {
              if (!this.isStopped) {
                var e = this._parentSubscriber,
                  n = h.useDeprecatedSynchronousErrorHandling;
                if (this._error)
                  n && e.syncErrorThrowable
                    ? (this.__tryOrSetError(e, this._error, t),
                      this.unsubscribe())
                    : (this.__tryOrUnsub(this._error, t), this.unsubscribe());
                else if (e.syncErrorThrowable)
                  n ? ((e.syncErrorValue = t), (e.syncErrorThrown = !0)) : p(t),
                    this.unsubscribe();
                else {
                  if ((this.unsubscribe(), n)) throw t;
                  p(t);
                }
              }
            }),
            (e.prototype.complete = function () {
              var t = this;
              if (!this.isStopped) {
                var e = this._parentSubscriber;
                if (this._complete) {
                  var n = function () {
                    return t._complete.call(t._context);
                  };
                  h.useDeprecatedSynchronousErrorHandling &&
                  e.syncErrorThrowable
                    ? (this.__tryOrSetError(e, n), this.unsubscribe())
                    : (this.__tryOrUnsub(n), this.unsubscribe());
                } else this.unsubscribe();
              }
            }),
            (e.prototype.__tryOrUnsub = function (t, e) {
              try {
                t.call(this._context, e);
              } catch (n) {
                if (
                  (this.unsubscribe(), h.useDeprecatedSynchronousErrorHandling)
                )
                  throw n;
                p(n);
              }
            }),
            (e.prototype.__tryOrSetError = function (t, e, n) {
              if (!h.useDeprecatedSynchronousErrorHandling)
                throw new Error("bad call");
              try {
                e.call(this._context, n);
              } catch (r) {
                return h.useDeprecatedSynchronousErrorHandling
                  ? ((t.syncErrorValue = r), (t.syncErrorThrown = !0), !0)
                  : (p(r), !0);
              }
              return !1;
            }),
            (e.prototype._unsubscribe = function () {
              var t = this._parentSubscriber;
              (this._context = null),
                (this._parentSubscriber = null),
                t.unsubscribe();
            }),
            e
          );
        })(m),
        g = (function () {
          return (
            ("function" == typeof Symbol && Symbol.observable) || "@@observable"
          );
        })();
      function v() {}
      function b() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        return _(t);
      }
      function _(t) {
        return t
          ? 1 === t.length
            ? t[0]
            : function (e) {
                return t.reduce(function (t, e) {
                  return e(t);
                }, e);
              }
          : v;
      }
      var w = (function () {
        function t(t) {
          (this._isScalar = !1), t && (this._subscribe = t);
        }
        return (
          (t.prototype.lift = function (e) {
            var n = new t();
            return (n.source = this), (n.operator = e), n;
          }),
          (t.prototype.subscribe = function (t, e, n) {
            var r = this.operator,
              o = (function (t, e, n) {
                if (t) {
                  if (t instanceof m) return t;
                  if (t[d]) return t[d]();
                }
                return t || e || n ? new m(t, e, n) : new m(f);
              })(t, e, n);
            if (
              (o.add(
                r
                  ? r.call(o, this.source)
                  : this.source ||
                    (h.useDeprecatedSynchronousErrorHandling &&
                      !o.syncErrorThrowable)
                  ? this._subscribe(o)
                  : this._trySubscribe(o)
              ),
              h.useDeprecatedSynchronousErrorHandling &&
                o.syncErrorThrowable &&
                ((o.syncErrorThrowable = !1), o.syncErrorThrown))
            )
              throw o.syncErrorValue;
            return o;
          }),
          (t.prototype._trySubscribe = function (t) {
            try {
              return this._subscribe(t);
            } catch (e) {
              h.useDeprecatedSynchronousErrorHandling &&
                ((t.syncErrorThrown = !0), (t.syncErrorValue = e)),
                (function (t) {
                  for (; t; ) {
                    var e = t.destination;
                    if (t.closed || t.isStopped) return !1;
                    t = e && e instanceof m ? e : null;
                  }
                  return !0;
                })(t)
                  ? t.error(e)
                  : console.warn(e);
            }
          }),
          (t.prototype.forEach = function (t, e) {
            var n = this;
            return new (e = C(e))(function (e, r) {
              var o;
              o = n.subscribe(
                function (e) {
                  try {
                    t(e);
                  } catch (n) {
                    r(n), o && o.unsubscribe();
                  }
                },
                r,
                e
              );
            });
          }),
          (t.prototype._subscribe = function (t) {
            var e = this.source;
            return e && e.subscribe(t);
          }),
          (t.prototype[g] = function () {
            return this;
          }),
          (t.prototype.pipe = function () {
            for (var t = [], e = 0; e < arguments.length; e++)
              t[e] = arguments[e];
            return 0 === t.length ? this : _(t)(this);
          }),
          (t.prototype.toPromise = function (t) {
            var e = this;
            return new (t = C(t))(function (t, n) {
              var r;
              e.subscribe(
                function (t) {
                  return (r = t);
                },
                function (t) {
                  return n(t);
                },
                function () {
                  return t(r);
                }
              );
            });
          }),
          (t.create = function (e) {
            return new t(e);
          }),
          t
        );
      })();
      function C(t) {
        if ((t || (t = h.Promise || Promise), !t))
          throw new Error("no Promise impl found");
        return t;
      }
      var E = (function () {
          function t() {
            return (
              Error.call(this),
              (this.message = "object unsubscribed"),
              (this.name = "ObjectUnsubscribedError"),
              this
            );
          }
          return (t.prototype = Object.create(Error.prototype)), t;
        })(),
        S = (function (t) {
          function e(e, n) {
            var r = t.call(this) || this;
            return (r.subject = e), (r.subscriber = n), (r.closed = !1), r;
          }
          return (
            r.b(e, t),
            (e.prototype.unsubscribe = function () {
              if (!this.closed) {
                this.closed = !0;
                var t = this.subject,
                  e = t.observers;
                if (
                  ((this.subject = null),
                  e && 0 !== e.length && !t.isStopped && !t.closed)
                ) {
                  var n = e.indexOf(this.subscriber);
                  -1 !== n && e.splice(n, 1);
                }
              }
            }),
            e
          );
        })(u),
        k = (function (t) {
          function e(e) {
            var n = t.call(this, e) || this;
            return (n.destination = e), n;
          }
          return r.b(e, t), e;
        })(m),
        T = (function (t) {
          function e() {
            var e = t.call(this) || this;
            return (
              (e.observers = []),
              (e.closed = !1),
              (e.isStopped = !1),
              (e.hasError = !1),
              (e.thrownError = null),
              e
            );
          }
          return (
            r.b(e, t),
            (e.prototype[d] = function () {
              return new k(this);
            }),
            (e.prototype.lift = function (t) {
              var e = new x(this, this);
              return (e.operator = t), e;
            }),
            (e.prototype.next = function (t) {
              if (this.closed) throw new E();
              if (!this.isStopped)
                for (
                  var e = this.observers, n = e.length, r = e.slice(), o = 0;
                  o < n;
                  o++
                )
                  r[o].next(t);
            }),
            (e.prototype.error = function (t) {
              if (this.closed) throw new E();
              (this.hasError = !0),
                (this.thrownError = t),
                (this.isStopped = !0);
              for (
                var e = this.observers, n = e.length, r = e.slice(), o = 0;
                o < n;
                o++
              )
                r[o].error(t);
              this.observers.length = 0;
            }),
            (e.prototype.complete = function () {
              if (this.closed) throw new E();
              this.isStopped = !0;
              for (
                var t = this.observers, e = t.length, n = t.slice(), r = 0;
                r < e;
                r++
              )
                n[r].complete();
              this.observers.length = 0;
            }),
            (e.prototype.unsubscribe = function () {
              (this.isStopped = !0),
                (this.closed = !0),
                (this.observers = null);
            }),
            (e.prototype._trySubscribe = function (e) {
              if (this.closed) throw new E();
              return t.prototype._trySubscribe.call(this, e);
            }),
            (e.prototype._subscribe = function (t) {
              if (this.closed) throw new E();
              return this.hasError
                ? (t.error(this.thrownError), u.EMPTY)
                : this.isStopped
                ? (t.complete(), u.EMPTY)
                : (this.observers.push(t), new S(this, t));
            }),
            (e.prototype.asObservable = function () {
              var t = new w();
              return (t.source = this), t;
            }),
            (e.create = function (t, e) {
              return new x(t, e);
            }),
            e
          );
        })(w),
        x = (function (t) {
          function e(e, n) {
            var r = t.call(this) || this;
            return (r.destination = e), (r.source = n), r;
          }
          return (
            r.b(e, t),
            (e.prototype.next = function (t) {
              var e = this.destination;
              e && e.next && e.next(t);
            }),
            (e.prototype.error = function (t) {
              var e = this.destination;
              e && e.error && this.destination.error(t);
            }),
            (e.prototype.complete = function () {
              var t = this.destination;
              t && t.complete && this.destination.complete();
            }),
            (e.prototype._subscribe = function (t) {
              return this.source ? this.source.subscribe(t) : u.EMPTY;
            }),
            e
          );
        })(T);
      function O(t) {
        return t && "function" == typeof t.schedule;
      }
      var P = (function (t) {
          function e(e, n, r) {
            var o = t.call(this) || this;
            return (
              (o.parent = e),
              (o.outerValue = n),
              (o.outerIndex = r),
              (o.index = 0),
              o
            );
          }
          return (
            r.b(e, t),
            (e.prototype._next = function (t) {
              this.parent.notifyNext(
                this.outerValue,
                t,
                this.outerIndex,
                this.index++,
                this
              );
            }),
            (e.prototype._error = function (t) {
              this.parent.notifyError(t, this), this.unsubscribe();
            }),
            (e.prototype._complete = function () {
              this.parent.notifyComplete(this), this.unsubscribe();
            }),
            e
          );
        })(m),
        A = function (t) {
          return function (e) {
            for (var n = 0, r = t.length; n < r && !e.closed; n++) e.next(t[n]);
            e.complete();
          };
        };
      function I() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      }
      var N = I(),
        R = function (t) {
          return t && "number" == typeof t.length && "function" != typeof t;
        };
      function D(t) {
        return (
          !!t && "function" != typeof t.subscribe && "function" == typeof t.then
        );
      }
      var j = function (t) {
        if (t && "function" == typeof t[g])
          return (
            (r = t),
            function (t) {
              var e = r[g]();
              if ("function" != typeof e.subscribe)
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              return e.subscribe(t);
            }
          );
        if (R(t)) return A(t);
        if (D(t))
          return (
            (n = t),
            function (t) {
              return (
                n
                  .then(
                    function (e) {
                      t.closed || (t.next(e), t.complete());
                    },
                    function (e) {
                      return t.error(e);
                    }
                  )
                  .then(null, p),
                t
              );
            }
          );
        if (t && "function" == typeof t[N])
          return (
            (e = t),
            function (t) {
              for (var n = e[N](); ; ) {
                var r = n.next();
                if (r.done) {
                  t.complete();
                  break;
                }
                if ((t.next(r.value), t.closed)) break;
              }
              return (
                "function" == typeof n.return &&
                  t.add(function () {
                    n.return && n.return();
                  }),
                t
              );
            }
          );
        var e,
          n,
          r,
          o = i(t) ? "an invalid object" : "'" + t + "'";
        throw new TypeError(
          "You provided " +
            o +
            " where a stream was expected. You can provide an Observable, Promise, Array, or Iterable."
        );
      };
      function M(t, e, n, r, o) {
        if ((void 0 === o && (o = new P(t, n, r)), !o.closed))
          return e instanceof w ? e.subscribe(o) : j(e)(o);
      }
      var V = (function (t) {
        function e() {
          return (null !== t && t.apply(this, arguments)) || this;
        }
        return (
          r.b(e, t),
          (e.prototype.notifyNext = function (t, e, n, r, o) {
            this.destination.next(e);
          }),
          (e.prototype.notifyError = function (t, e) {
            this.destination.error(t);
          }),
          (e.prototype.notifyComplete = function (t) {
            this.destination.complete();
          }),
          e
        );
      })(m);
      function F(t, e) {
        return function (n) {
          if ("function" != typeof t)
            throw new TypeError(
              "argument is not a function. Are you looking for `mapTo()`?"
            );
          return n.lift(new L(t, e));
        };
      }
      var L = (function () {
          function t(t, e) {
            (this.project = t), (this.thisArg = e);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new U(t, this.project, this.thisArg));
            }),
            t
          );
        })(),
        U = (function (t) {
          function e(e, n, r) {
            var o = t.call(this, e) || this;
            return (o.project = n), (o.count = 0), (o.thisArg = r || o), o;
          }
          return (
            r.b(e, t),
            (e.prototype._next = function (t) {
              var e;
              try {
                e = this.project.call(this.thisArg, t, this.count++);
              } catch (n) {
                return void this.destination.error(n);
              }
              this.destination.next(e);
            }),
            e
          );
        })(m);
      function H(t, e) {
        return new w(function (n) {
          var r = new u(),
            o = 0;
          return (
            r.add(
              e.schedule(function () {
                o !== t.length
                  ? (n.next(t[o++]), n.closed || r.add(this.schedule()))
                  : n.complete();
              })
            ),
            r
          );
        });
      }
      function z(t, e) {
        return e
          ? (function (t, e) {
              if (null != t) {
                if (
                  (function (t) {
                    return t && "function" == typeof t[g];
                  })(t)
                )
                  return (function (t, e) {
                    return new w(function (n) {
                      var r = new u();
                      return (
                        r.add(
                          e.schedule(function () {
                            var o = t[g]();
                            r.add(
                              o.subscribe({
                                next: function (t) {
                                  r.add(
                                    e.schedule(function () {
                                      return n.next(t);
                                    })
                                  );
                                },
                                error: function (t) {
                                  r.add(
                                    e.schedule(function () {
                                      return n.error(t);
                                    })
                                  );
                                },
                                complete: function () {
                                  r.add(
                                    e.schedule(function () {
                                      return n.complete();
                                    })
                                  );
                                },
                              })
                            );
                          })
                        ),
                        r
                      );
                    });
                  })(t, e);
                if (D(t))
                  return (function (t, e) {
                    return new w(function (n) {
                      var r = new u();
                      return (
                        r.add(
                          e.schedule(function () {
                            return t.then(
                              function (t) {
                                r.add(
                                  e.schedule(function () {
                                    n.next(t),
                                      r.add(
                                        e.schedule(function () {
                                          return n.complete();
                                        })
                                      );
                                  })
                                );
                              },
                              function (t) {
                                r.add(
                                  e.schedule(function () {
                                    return n.error(t);
                                  })
                                );
                              }
                            );
                          })
                        ),
                        r
                      );
                    });
                  })(t, e);
                if (R(t)) return H(t, e);
                if (
                  (function (t) {
                    return t && "function" == typeof t[N];
                  })(t) ||
                  "string" == typeof t
                )
                  return (function (t, e) {
                    if (!t) throw new Error("Iterable cannot be null");
                    return new w(function (n) {
                      var r,
                        o = new u();
                      return (
                        o.add(function () {
                          r && "function" == typeof r.return && r.return();
                        }),
                        o.add(
                          e.schedule(function () {
                            (r = t[N]()),
                              o.add(
                                e.schedule(function () {
                                  if (!n.closed) {
                                    var t, e;
                                    try {
                                      var o = r.next();
                                      (t = o.value), (e = o.done);
                                    } catch (i) {
                                      return void n.error(i);
                                    }
                                    e
                                      ? n.complete()
                                      : (n.next(t), this.schedule());
                                  }
                                })
                              );
                          })
                        ),
                        o
                      );
                    });
                  })(t, e);
              }
              throw new TypeError(
                ((null !== t && typeof t) || t) + " is not observable"
              );
            })(t, e)
          : t instanceof w
          ? t
          : new w(j(t));
      }
      function B(t, e, n) {
        return (
          void 0 === n && (n = Number.POSITIVE_INFINITY),
          "function" == typeof e
            ? function (r) {
                return r.pipe(
                  B(function (n, r) {
                    return z(t(n, r)).pipe(
                      F(function (t, o) {
                        return e(n, t, r, o);
                      })
                    );
                  }, n)
                );
              }
            : ("number" == typeof e && (n = e),
              function (e) {
                return e.lift(new q(t, n));
              })
        );
      }
      var q = (function () {
          function t(t, e) {
            void 0 === e && (e = Number.POSITIVE_INFINITY),
              (this.project = t),
              (this.concurrent = e);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new G(t, this.project, this.concurrent));
            }),
            t
          );
        })(),
        G = (function (t) {
          function e(e, n, r) {
            void 0 === r && (r = Number.POSITIVE_INFINITY);
            var o = t.call(this, e) || this;
            return (
              (o.project = n),
              (o.concurrent = r),
              (o.hasCompleted = !1),
              (o.buffer = []),
              (o.active = 0),
              (o.index = 0),
              o
            );
          }
          return (
            r.b(e, t),
            (e.prototype._next = function (t) {
              this.active < this.concurrent
                ? this._tryNext(t)
                : this.buffer.push(t);
            }),
            (e.prototype._tryNext = function (t) {
              var e,
                n = this.index++;
              try {
                e = this.project(t, n);
              } catch (r) {
                return void this.destination.error(r);
              }
              this.active++, this._innerSub(e, t, n);
            }),
            (e.prototype._innerSub = function (t, e, n) {
              var r = new P(this, void 0, void 0);
              this.destination.add(r), M(this, t, e, n, r);
            }),
            (e.prototype._complete = function () {
              (this.hasCompleted = !0),
                0 === this.active &&
                  0 === this.buffer.length &&
                  this.destination.complete(),
                this.unsubscribe();
            }),
            (e.prototype.notifyNext = function (t, e, n, r, o) {
              this.destination.next(e);
            }),
            (e.prototype.notifyComplete = function (t) {
              var e = this.buffer;
              this.remove(t),
                this.active--,
                e.length > 0
                  ? this._next(e.shift())
                  : 0 === this.active &&
                    this.hasCompleted &&
                    this.destination.complete();
            }),
            e
          );
        })(V);
      function W(t) {
        return t;
      }
      function Q(t) {
        return void 0 === t && (t = Number.POSITIVE_INFINITY), B(W, t);
      }
      function K(t, e) {
        return e ? H(t, e) : new w(A(t));
      }
      function Z() {
        return function (t) {
          return t.lift(new $(t));
        };
      }
      var $ = (function () {
          function t(t) {
            this.connectable = t;
          }
          return (
            (t.prototype.call = function (t, e) {
              var n = this.connectable;
              n._refCount++;
              var r = new X(t, n),
                o = e.subscribe(r);
              return r.closed || (r.connection = n.connect()), o;
            }),
            t
          );
        })(),
        X = (function (t) {
          function e(e, n) {
            var r = t.call(this, e) || this;
            return (r.connectable = n), r;
          }
          return (
            r.b(e, t),
            (e.prototype._unsubscribe = function () {
              var t = this.connectable;
              if (t) {
                this.connectable = null;
                var e = t._refCount;
                if (e <= 0) this.connection = null;
                else if (((t._refCount = e - 1), e > 1)) this.connection = null;
                else {
                  var n = this.connection,
                    r = t._connection;
                  (this.connection = null),
                    !r || (n && r !== n) || r.unsubscribe();
                }
              } else this.connection = null;
            }),
            e
          );
        })(m),
        J = (function (t) {
          function e(e, n) {
            var r = t.call(this) || this;
            return (
              (r.source = e),
              (r.subjectFactory = n),
              (r._refCount = 0),
              (r._isComplete = !1),
              r
            );
          }
          return (
            r.b(e, t),
            (e.prototype._subscribe = function (t) {
              return this.getSubject().subscribe(t);
            }),
            (e.prototype.getSubject = function () {
              var t = this._subject;
              return (
                (t && !t.isStopped) || (this._subject = this.subjectFactory()),
                this._subject
              );
            }),
            (e.prototype.connect = function () {
              var t = this._connection;
              return (
                t ||
                  ((this._isComplete = !1),
                  (t = this._connection = new u()).add(
                    this.source.subscribe(new tt(this.getSubject(), this))
                  ),
                  t.closed && ((this._connection = null), (t = u.EMPTY))),
                t
              );
            }),
            (e.prototype.refCount = function () {
              return Z()(this);
            }),
            e
          );
        })(w),
        Y = (function () {
          var t = J.prototype;
          return {
            operator: { value: null },
            _refCount: { value: 0, writable: !0 },
            _subject: { value: null, writable: !0 },
            _connection: { value: null, writable: !0 },
            _subscribe: { value: t._subscribe },
            _isComplete: { value: t._isComplete, writable: !0 },
            getSubject: { value: t.getSubject },
            connect: { value: t.connect },
            refCount: { value: t.refCount },
          };
        })(),
        tt = (function (t) {
          function e(e, n) {
            var r = t.call(this, e) || this;
            return (r.connectable = n), r;
          }
          return (
            r.b(e, t),
            (e.prototype._error = function (e) {
              this._unsubscribe(), t.prototype._error.call(this, e);
            }),
            (e.prototype._complete = function () {
              (this.connectable._isComplete = !0),
                this._unsubscribe(),
                t.prototype._complete.call(this);
            }),
            (e.prototype._unsubscribe = function () {
              var t = this.connectable;
              if (t) {
                this.connectable = null;
                var e = t._connection;
                (t._refCount = 0),
                  (t._subject = null),
                  (t._connection = null),
                  e && e.unsubscribe();
              }
            }),
            e
          );
        })(k);
      function et() {
        return new T();
      }
      var nt = "__parameters__";
      function rt(t, e, n) {
        var o = (function (t) {
          return function () {
            for (var e = [], n = 0; n < arguments.length; n++)
              e[n] = arguments[n];
            if (t) {
              var o = t.apply(void 0, Object(r.d)(e));
              for (var i in o) this[i] = o[i];
            }
          };
        })(e);
        function i() {
          for (var t, e = [], n = 0; n < arguments.length; n++)
            e[n] = arguments[n];
          if (this instanceof i) return o.apply(this, e), this;
          var a = new ((t = i).bind.apply(t, Object(r.d)([void 0], e)))();
          return (s.annotation = a), s;
          function s(t, e, n) {
            for (
              var r = t.hasOwnProperty(nt)
                ? t[nt]
                : Object.defineProperty(t, nt, { value: [] })[nt];
              r.length <= n;

            )
              r.push(null);
            return (r[n] = r[n] || []).push(a), t;
          }
        }
        return (
          n && (i.prototype = Object.create(n.prototype)),
          (i.prototype.ngMetadataName = t),
          (i.annotationCls = i),
          i
        );
      }
      var ot = rt("Inject", function (t) {
          return { token: t };
        }),
        it = rt("Optional"),
        at = rt("Self"),
        st = rt("SkipSelf"),
        ut = (function (t) {
          return (
            (t[(t.Default = 0)] = "Default"),
            (t[(t.Host = 1)] = "Host"),
            (t[(t.Self = 2)] = "Self"),
            (t[(t.SkipSelf = 4)] = "SkipSelf"),
            (t[(t.Optional = 8)] = "Optional"),
            t
          );
        })({});
      function lt(t) {
        for (var e in t) if (t[e] === lt) return e;
        throw Error("Could not find renamed property on target object.");
      }
      function ct(t) {
        return {
          token: t.token,
          providedIn: t.providedIn || null,
          factory: t.factory,
          value: void 0,
        };
      }
      function ht(t) {
        var e = t[pt];
        return e && e.token === t ? e : null;
      }
      var pt = lt({ ngInjectableDef: lt });
      function ft(t) {
        if ("string" == typeof t) return t;
        if (t instanceof Array) return "[" + t.map(ft).join(", ") + "]";
        if (null == t) return "" + t;
        if (t.overriddenName) return "" + t.overriddenName;
        if (t.name) return "" + t.name;
        var e = t.toString();
        if (null == e) return "" + e;
        var n = e.indexOf("\n");
        return -1 === n ? e : e.substring(0, n);
      }
      var dt = lt({ __forward_ref__: lt });
      function mt(t) {
        return (
          (t.__forward_ref__ = mt),
          (t.toString = function () {
            return ft(this());
          }),
          t
        );
      }
      function yt(t) {
        var e = t;
        return "function" == typeof e &&
          e.hasOwnProperty(dt) &&
          e.__forward_ref__ === mt
          ? e()
          : t;
      }
      var gt,
        vt = "undefined" != typeof globalThis && globalThis,
        bt = "undefined" != typeof window && window,
        _t =
          "undefined" != typeof self &&
          "undefined" != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          self,
        wt = "undefined" != typeof global && global,
        Ct = vt || wt || bt || _t,
        Et = (function () {
          function t(t, e) {
            (this._desc = t),
              (this.ngMetadataName = "InjectionToken"),
              (this.ngInjectableDef = void 0),
              "number" == typeof e
                ? (this.__NG_ELEMENT_ID__ = e)
                : void 0 !== e &&
                  (this.ngInjectableDef = ct({
                    token: this,
                    providedIn: e.providedIn || "root",
                    factory: e.factory,
                  }));
          }
          return (
            (t.prototype.toString = function () {
              return "InjectionToken " + this._desc;
            }),
            t
          );
        })(),
        St = new Et("INJECTOR", -1),
        kt = new Object(),
        Tt = /\n/gm,
        xt = "ɵ",
        Ot = "__source",
        Pt = lt({ provide: String, useValue: lt }),
        At = void 0;
      function It(t) {
        var e = At;
        return (At = t), e;
      }
      function Nt(t, e) {
        if ((void 0 === e && (e = ut.Default), void 0 === At))
          throw new Error("inject() must be called from an injection context");
        return null === At
          ? (function (t, e, n) {
              var r = ht(t);
              if (r && "root" == r.providedIn)
                return void 0 === r.value ? (r.value = r.factory()) : r.value;
              if (n & ut.Optional) return null;
              throw new Error("Injector: NOT_FOUND [" + ft(t) + "]");
            })(t, 0, e)
          : At.get(t, e & ut.Optional ? null : void 0, e);
      }
      function Rt(t, e) {
        return void 0 === e && (e = ut.Default), (gt || Nt)(t, e);
      }
      var Dt = (function () {
        function t() {}
        return (
          (t.prototype.get = function (t, e) {
            if ((void 0 === e && (e = kt), e === kt)) {
              var n = new Error(
                "NullInjectorError: No provider for " + ft(t) + "!"
              );
              throw ((n.name = "NullInjectorError"), n);
            }
            return e;
          }),
          t
        );
      })();
      function jt(t, e, n, r) {
        void 0 === r && (r = null),
          (t =
            t && "\n" === t.charAt(0) && t.charAt(1) == xt ? t.substr(2) : t);
        var o = ft(e);
        if (e instanceof Array) o = e.map(ft).join(" -> ");
        else if ("object" == typeof e) {
          var i = [];
          for (var a in e)
            if (e.hasOwnProperty(a)) {
              var s = e[a];
              i.push(
                a + ":" + ("string" == typeof s ? JSON.stringify(s) : ft(s))
              );
            }
          o = "{" + i.join(", ") + "}";
        }
        return (
          n + (r ? "(" + r + ")" : "") + "[" + o + "]: " + t.replace(Tt, "\n  ")
        );
      }
      var Mt = (function () {
          return function () {};
        })(),
        Vt = (function () {
          return function () {};
        })();
      function Ft(t, e, n) {
        e >= t.length ? t.push(n) : t.splice(e, 0, n);
      }
      function Lt(t, e) {
        return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0];
      }
      var Ut = (function (t) {
          return (
            (t[(t.Emulated = 0)] = "Emulated"),
            (t[(t.Native = 1)] = "Native"),
            (t[(t.None = 2)] = "None"),
            (t[(t.ShadowDom = 3)] = "ShadowDom"),
            t
          );
        })({}),
        Ht = (function () {
          return (
            ("undefined" != typeof requestAnimationFrame &&
              requestAnimationFrame) ||
            setTimeout
          ).bind(Ct);
        })(),
        zt = "ngDebugContext",
        Bt = "ngOriginalError",
        qt = "ngErrorLogger";
      function Gt(t) {
        return t[zt];
      }
      function Wt(t) {
        return t[Bt];
      }
      function Qt(t) {
        for (var e = [], n = 1; n < arguments.length; n++)
          e[n - 1] = arguments[n];
        t.error.apply(t, Object(r.d)(e));
      }
      var Kt = (function () {
          function t() {
            this._console = console;
          }
          return (
            (t.prototype.handleError = function (t) {
              var e = this._findOriginalError(t),
                n = this._findContext(t),
                r = (function (t) {
                  return t[qt] || Qt;
                })(t);
              r(this._console, "ERROR", t),
                e && r(this._console, "ORIGINAL ERROR", e),
                n && r(this._console, "ERROR CONTEXT", n);
            }),
            (t.prototype._findContext = function (t) {
              return t ? (Gt(t) ? Gt(t) : this._findContext(Wt(t))) : null;
            }),
            (t.prototype._findOriginalError = function (t) {
              for (var e = Wt(t); e && Wt(e); ) e = Wt(e);
              return e;
            }),
            t
          );
        })(),
        Zt = !0,
        $t = !1;
      function Xt() {
        return ($t = !0), Zt;
      }
      var Jt = (function () {
          function t(t) {
            if (
              ((this.defaultDoc = t),
              (this.inertDocument =
                this.defaultDoc.implementation.createHTMLDocument(
                  "sanitization-inert"
                )),
              (this.inertBodyElement = this.inertDocument.body),
              null == this.inertBodyElement)
            ) {
              var e = this.inertDocument.createElement("html");
              this.inertDocument.appendChild(e),
                (this.inertBodyElement =
                  this.inertDocument.createElement("body")),
                e.appendChild(this.inertBodyElement);
            }
            (this.inertBodyElement.innerHTML =
              '<svg><g onload="this.parentNode.remove()"></g></svg>'),
              !this.inertBodyElement.querySelector ||
              this.inertBodyElement.querySelector("svg")
                ? ((this.inertBodyElement.innerHTML =
                    '<svg><p><style><img src="</style><img src=x onerror=alert(1)//">'),
                  (this.getInertBodyElement =
                    this.inertBodyElement.querySelector &&
                    this.inertBodyElement.querySelector("svg img") &&
                    (function () {
                      try {
                        return !!window.DOMParser;
                      } catch (t) {
                        return !1;
                      }
                    })()
                      ? this.getInertBodyElement_DOMParser
                      : this.getInertBodyElement_InertDocument))
                : (this.getInertBodyElement = this.getInertBodyElement_XHR);
          }
          return (
            (t.prototype.getInertBodyElement_XHR = function (t) {
              t = "<body><remove></remove>" + t + "</body>";
              try {
                t = encodeURI(t);
              } catch (r) {
                return null;
              }
              var e = new XMLHttpRequest();
              (e.responseType = "document"),
                e.open("GET", "data:text/html;charset=utf-8," + t, !1),
                e.send(void 0);
              var n = e.response.body;
              return n.removeChild(n.firstChild), n;
            }),
            (t.prototype.getInertBodyElement_DOMParser = function (t) {
              t = "<body><remove></remove>" + t + "</body>";
              try {
                var e = new window.DOMParser().parseFromString(
                  t,
                  "text/html"
                ).body;
                return e.removeChild(e.firstChild), e;
              } catch (n) {
                return null;
              }
            }),
            (t.prototype.getInertBodyElement_InertDocument = function (t) {
              var e = this.inertDocument.createElement("template");
              return "content" in e
                ? ((e.innerHTML = t), e)
                : ((this.inertBodyElement.innerHTML = t),
                  this.defaultDoc.documentMode &&
                    this.stripCustomNsAttrs(this.inertBodyElement),
                  this.inertBodyElement);
            }),
            (t.prototype.stripCustomNsAttrs = function (t) {
              for (var e = t.attributes, n = e.length - 1; 0 < n; n--) {
                var r = e.item(n).name;
                ("xmlns:ns1" !== r && 0 !== r.indexOf("ns1:")) ||
                  t.removeAttribute(r);
              }
              for (var o = t.firstChild; o; )
                o.nodeType === Node.ELEMENT_NODE && this.stripCustomNsAttrs(o),
                  (o = o.nextSibling);
            }),
            t
          );
        })(),
        Yt = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
        te =
          /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
      function ee(t) {
        return (t = String(t)).match(Yt) || t.match(te)
          ? t
          : (Xt() &&
              console.warn(
                "WARNING: sanitizing unsafe URL value " +
                  t +
                  " (see http://g.co/ng/security#xss)"
              ),
            "unsafe:" + t);
      }
      function ne(t) {
        var e,
          n,
          o = {};
        try {
          for (
            var i = Object(r.e)(t.split(",")), a = i.next();
            !a.done;
            a = i.next()
          )
            o[a.value] = !0;
        } catch (s) {
          e = { error: s };
        } finally {
          try {
            a && !a.done && (n = i.return) && n.call(i);
          } finally {
            if (e) throw e.error;
          }
        }
        return o;
      }
      function re() {
        for (var t, e, n = [], o = 0; o < arguments.length; o++)
          n[o] = arguments[o];
        var i = {};
        try {
          for (var a = Object(r.e)(n), s = a.next(); !s.done; s = a.next()) {
            var u = s.value;
            for (var l in u) u.hasOwnProperty(l) && (i[l] = !0);
          }
        } catch (c) {
          t = { error: c };
        } finally {
          try {
            s && !s.done && (e = a.return) && e.call(a);
          } finally {
            if (t) throw t.error;
          }
        }
        return i;
      }
      var oe,
        ie = ne("area,br,col,hr,img,wbr"),
        ae = ne("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
        se = ne("rp,rt"),
        ue = re(se, ae),
        le = re(
          ie,
          re(
            ae,
            ne(
              "address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul"
            )
          ),
          re(
            se,
            ne(
              "a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video"
            )
          ),
          ue
        ),
        ce = ne("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
        he = ne("srcset"),
        pe = re(
          ce,
          he,
          ne(
            "abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"
          ),
          ne(
            "aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"
          )
        ),
        fe = ne("script,style,template"),
        de = (function () {
          function t() {
            (this.sanitizedSomething = !1), (this.buf = []);
          }
          return (
            (t.prototype.sanitizeChildren = function (t) {
              for (var e = t.firstChild, n = !0; e; )
                if (
                  (e.nodeType === Node.ELEMENT_NODE
                    ? (n = this.startElement(e))
                    : e.nodeType === Node.TEXT_NODE
                    ? this.chars(e.nodeValue)
                    : (this.sanitizedSomething = !0),
                  n && e.firstChild)
                )
                  e = e.firstChild;
                else
                  for (; e; ) {
                    e.nodeType === Node.ELEMENT_NODE && this.endElement(e);
                    var r = this.checkClobberedElement(e, e.nextSibling);
                    if (r) {
                      e = r;
                      break;
                    }
                    e = this.checkClobberedElement(e, e.parentNode);
                  }
              return this.buf.join("");
            }),
            (t.prototype.startElement = function (t) {
              var e,
                n = t.nodeName.toLowerCase();
              if (!le.hasOwnProperty(n))
                return (this.sanitizedSomething = !0), !fe.hasOwnProperty(n);
              this.buf.push("<"), this.buf.push(n);
              for (var r = t.attributes, o = 0; o < r.length; o++) {
                var i = r.item(o),
                  a = i.name,
                  s = a.toLowerCase();
                if (pe.hasOwnProperty(s)) {
                  var u = i.value;
                  ce[s] && (u = ee(u)),
                    he[s] &&
                      ((e = u),
                      (u = (e = String(e))
                        .split(",")
                        .map(function (t) {
                          return ee(t.trim());
                        })
                        .join(", "))),
                    this.buf.push(" ", a, '="', ge(u), '"');
                } else this.sanitizedSomething = !0;
              }
              return this.buf.push(">"), !0;
            }),
            (t.prototype.endElement = function (t) {
              var e = t.nodeName.toLowerCase();
              le.hasOwnProperty(e) &&
                !ie.hasOwnProperty(e) &&
                (this.buf.push("</"), this.buf.push(e), this.buf.push(">"));
            }),
            (t.prototype.chars = function (t) {
              this.buf.push(ge(t));
            }),
            (t.prototype.checkClobberedElement = function (t, e) {
              if (
                e &&
                (t.compareDocumentPosition(e) &
                  Node.DOCUMENT_POSITION_CONTAINED_BY) ===
                  Node.DOCUMENT_POSITION_CONTAINED_BY
              )
                throw new Error(
                  "Failed to sanitize html because the element is clobbered: " +
                    t.outerHTML
                );
              return e;
            }),
            t
          );
        })(),
        me = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        ye = /([^\#-~ |!])/g;
      function ge(t) {
        return t
          .replace(/&/g, "&amp;")
          .replace(me, function (t) {
            return (
              "&#" +
              (1024 * (t.charCodeAt(0) - 55296) +
                (t.charCodeAt(1) - 56320) +
                65536) +
              ";"
            );
          })
          .replace(ye, function (t) {
            return "&#" + t.charCodeAt(0) + ";";
          })
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }
      function ve(t) {
        return "content" in t &&
          (function (t) {
            return (
              t.nodeType === Node.ELEMENT_NODE && "TEMPLATE" === t.nodeName
            );
          })(t)
          ? t.content
          : null;
      }
      var be = (function (t) {
          return (
            (t[(t.NONE = 0)] = "NONE"),
            (t[(t.HTML = 1)] = "HTML"),
            (t[(t.STYLE = 2)] = "STYLE"),
            (t[(t.SCRIPT = 3)] = "SCRIPT"),
            (t[(t.URL = 4)] = "URL"),
            (t[(t.RESOURCE_URL = 5)] = "RESOURCE_URL"),
            t
          );
        })({}),
        _e = (function () {
          return function () {};
        })(),
        we = new RegExp(
          "^([-,.\"'%_!# a-zA-Z0-9]+|(?:(?:matrix|translate|scale|rotate|skew|perspective)(?:X|Y|Z|3d)?|(?:rgb|hsl)a?|(?:repeating-)?(?:linear|radial)-gradient|(?:calc|attr))\\([-0-9.%, #a-zA-Z]+\\))$",
          "g"
        ),
        Ce = /^url\(([^)]+)\)$/,
        Ee = /([A-Z])/g;
      function Se(t) {
        try {
          return null != t ? t.toString().slice(0, 30) : t;
        } catch (e) {
          return "[ERROR] Exception while trying to serialize the value";
        }
      }
      var ke = (function () {
          function t() {}
          return (
            (t.__NG_ELEMENT_ID__ = function () {
              return Te();
            }),
            t
          );
        })(),
        Te = function () {
          for (var t = [], e = 0; e < arguments.length; e++)
            t[e] = arguments[e];
        },
        xe = new Et(
          "The presence of this token marks an injector as being the root injector."
        ),
        Oe = function (t, e, n) {
          return new De(t, e, n);
        },
        Pe = (function () {
          function t() {}
          return (
            (t.create = function (t, e) {
              return Array.isArray(t)
                ? Oe(t, e, "")
                : Oe(t.providers, t.parent, t.name || "");
            }),
            (t.THROW_IF_NOT_FOUND = kt),
            (t.NULL = new Dt()),
            (t.ngInjectableDef = ct({
              token: t,
              providedIn: "any",
              factory: function () {
                return Rt(St);
              },
            })),
            (t.__NG_ELEMENT_ID__ = -1),
            t
          );
        })(),
        Ae = function (t) {
          return t;
        },
        Ie = [],
        Ne = Ae,
        Re = function () {
          return Array.prototype.slice.call(arguments);
        },
        De = (function () {
          function t(t, e, n) {
            void 0 === e && (e = Pe.NULL),
              void 0 === n && (n = null),
              (this.parent = e),
              (this.source = n);
            var r = (this._records = new Map());
            r.set(Pe, { token: Pe, fn: Ae, deps: Ie, value: this, useNew: !1 }),
              r.set(St, {
                token: St,
                fn: Ae,
                deps: Ie,
                value: this,
                useNew: !1,
              }),
              (function t(e, n) {
                if (n)
                  if ((n = yt(n)) instanceof Array)
                    for (var r = 0; r < n.length; r++) t(e, n[r]);
                  else {
                    if ("function" == typeof n)
                      throw Me("Function/Class not supported", n);
                    if (!n || "object" != typeof n || !n.provide)
                      throw Me("Unexpected provider", n);
                    var o = yt(n.provide),
                      i = (function (t) {
                        var e = (function (t) {
                            var e = Ie,
                              n = t.deps;
                            if (n && n.length) {
                              e = [];
                              for (var r = 0; r < n.length; r++) {
                                var o = 6;
                                if ((u = yt(n[r])) instanceof Array)
                                  for (var i = 0, a = u; i < a.length; i++) {
                                    var s = a[i];
                                    s instanceof it || s == it
                                      ? (o |= 1)
                                      : s instanceof st || s == st
                                      ? (o &= -3)
                                      : s instanceof at || s == at
                                      ? (o &= -5)
                                      : (u = s instanceof ot ? s.token : yt(s));
                                  }
                                e.push({ token: u, options: o });
                              }
                            } else if (t.useExisting) {
                              var u = yt(t.useExisting);
                              e = [{ token: u, options: 6 }];
                            } else if (!(n || Pt in t))
                              throw Me("'deps' required", t);
                            return e;
                          })(t),
                          n = Ae,
                          r = Ie,
                          o = !1,
                          i = yt(t.provide);
                        if (Pt in t) r = t.useValue;
                        else if (t.useFactory) n = t.useFactory;
                        else if (t.useExisting);
                        else if (t.useClass) (o = !0), (n = yt(t.useClass));
                        else {
                          if ("function" != typeof i)
                            throw Me(
                              "StaticProvider does not have [useValue|useFactory|useExisting|useClass] or [provide] is not newable",
                              t
                            );
                          (o = !0), (n = i);
                        }
                        return { deps: e, fn: n, useNew: o, value: r };
                      })(n);
                    if (!0 === n.multi) {
                      var a = e.get(o);
                      if (a) {
                        if (a.fn !== Re) throw je(o);
                      } else
                        e.set(
                          o,
                          (a = {
                            token: n.provide,
                            deps: [],
                            useNew: !1,
                            fn: Re,
                            value: Ie,
                          })
                        );
                      a.deps.push({ token: (o = n), options: 6 });
                    }
                    var s = e.get(o);
                    if (s && s.fn == Re) throw je(o);
                    e.set(o, i);
                  }
              })(r, t);
          }
          return (
            (t.prototype.get = function (t, e, n) {
              void 0 === n && (n = ut.Default);
              var o = this._records.get(t);
              try {
                return (function t(e, n, o, i, a, s) {
                  try {
                    return (function (e, n, o, i, a, s) {
                      var u, l;
                      if (!n || s & ut.SkipSelf)
                        s & ut.Self || (l = i.get(e, a, ut.Default));
                      else {
                        if ((l = n.value) == Ne)
                          throw Error("ɵCircular dependency");
                        if (l === Ie) {
                          n.value = Ne;
                          var c = n.useNew,
                            h = n.fn,
                            p = n.deps,
                            f = Ie;
                          if (p.length) {
                            f = [];
                            for (var d = 0; d < p.length; d++) {
                              var m = p[d],
                                y = m.options,
                                g = 2 & y ? o.get(m.token) : void 0;
                              f.push(
                                t(
                                  m.token,
                                  g,
                                  o,
                                  g || 4 & y ? i : Pe.NULL,
                                  1 & y ? null : Pe.THROW_IF_NOT_FOUND,
                                  ut.Default
                                )
                              );
                            }
                          }
                          n.value = l = c
                            ? new ((u = h).bind.apply(
                                u,
                                Object(r.d)([void 0], f)
                              ))()
                            : h.apply(void 0, f);
                        }
                      }
                      return l;
                    })(e, n, o, i, a, s);
                  } catch (u) {
                    throw (
                      (u instanceof Error || (u = new Error(u)),
                      (u.ngTempTokenPath = u.ngTempTokenPath || []).unshift(e),
                      n && n.value == Ne && (n.value = Ie),
                      u)
                    );
                  }
                })(t, o, this._records, this.parent, e, n);
              } catch (i) {
                return (function (t, e, n, r) {
                  var o = t.ngTempTokenPath;
                  throw (
                    (e[Ot] && o.unshift(e[Ot]),
                    (t.message = jt(
                      "\n" + t.message,
                      o,
                      "StaticInjectorError",
                      r
                    )),
                    (t.ngTokenPath = o),
                    (t.ngTempTokenPath = null),
                    t)
                  );
                })(i, t, 0, this.source);
              }
            }),
            (t.prototype.toString = function () {
              var t = [];
              return (
                this._records.forEach(function (e, n) {
                  return t.push(ft(n));
                }),
                "StaticInjector[" + t.join(", ") + "]"
              );
            }),
            t
          );
        })();
      function je(t) {
        return Me("Cannot mix multi providers and regular providers", t);
      }
      function Me(t, e) {
        return new Error(jt(t, e, "StaticInjectorError"));
      }
      var Ve = new Et("AnalyzeForEntryComponents"),
        Fe = null;
      function Le() {
        if (!Fe) {
          var t = Ct.Symbol;
          if (t && t.iterator) Fe = t.iterator;
          else
            for (
              var e = Object.getOwnPropertyNames(Map.prototype), n = 0;
              n < e.length;
              ++n
            ) {
              var r = e[n];
              "entries" !== r &&
                "size" !== r &&
                Map.prototype[r] === Map.prototype.entries &&
                (Fe = r);
            }
        }
        return Fe;
      }
      function Ue(t, e) {
        return (
          t === e ||
          ("number" == typeof t && "number" == typeof e && isNaN(t) && isNaN(e))
        );
      }
      function He(t, e) {
        var n = Be(t),
          r = Be(e);
        return n && r
          ? (function (t, e, n) {
              for (var r = t[Le()](), o = e[Le()](); ; ) {
                var i = r.next(),
                  a = o.next();
                if (i.done && a.done) return !0;
                if (i.done || a.done) return !1;
                if (!n(i.value, a.value)) return !1;
              }
            })(t, e, He)
          : !(
              n ||
              !t ||
              ("object" != typeof t && "function" != typeof t) ||
              r ||
              !e ||
              ("object" != typeof e && "function" != typeof e)
            ) || Ue(t, e);
      }
      var ze = (function () {
        function t(t) {
          this.wrapped = t;
        }
        return (
          (t.wrap = function (e) {
            return new t(e);
          }),
          (t.unwrap = function (e) {
            return t.isWrapped(e) ? e.wrapped : e;
          }),
          (t.isWrapped = function (e) {
            return e instanceof t;
          }),
          t
        );
      })();
      function Be(t) {
        return (
          !!qe(t) && (Array.isArray(t) || (!(t instanceof Map) && Le() in t))
        );
      }
      function qe(t) {
        return null !== t && ("function" == typeof t || "object" == typeof t);
      }
      function Ge(t) {
        return !!t && "function" == typeof t.then;
      }
      function We(t) {
        return !!t && "function" == typeof t.subscribe;
      }
      var Qe = (function () {
          function t(t, e, n) {
            (this.previousValue = t),
              (this.currentValue = e),
              (this.firstChange = n);
          }
          return (
            (t.prototype.isFirstChange = function () {
              return this.firstChange;
            }),
            t
          );
        })(),
        Ke = (function () {
          return function () {};
        })(),
        Ze = (function () {
          return function () {};
        })();
      function $e(t) {
        var e = Error(
          "No component factory found for " +
            ft(t) +
            ". Did you add it to @NgModule.entryComponents?"
        );
        return (e[Xe] = t), e;
      }
      var Xe = "ngComponent",
        Je = (function () {
          function t() {}
          return (
            (t.prototype.resolveComponentFactory = function (t) {
              throw $e(t);
            }),
            t
          );
        })(),
        Ye = (function () {
          function t() {}
          return (t.NULL = new Je()), t;
        })(),
        tn = (function () {
          function t(t, e, n) {
            (this._parent = e),
              (this._ngModule = n),
              (this._factories = new Map());
            for (var r = 0; r < t.length; r++) {
              var o = t[r];
              this._factories.set(o.componentType, o);
            }
          }
          return (
            (t.prototype.resolveComponentFactory = function (t) {
              var e = this._factories.get(t);
              if (
                (!e &&
                  this._parent &&
                  (e = this._parent.resolveComponentFactory(t)),
                !e)
              )
                throw $e(t);
              return new en(e, this._ngModule);
            }),
            t
          );
        })(),
        en = (function (t) {
          function e(e, n) {
            var r = t.call(this) || this;
            return (
              (r.factory = e),
              (r.ngModule = n),
              (r.selector = e.selector),
              (r.componentType = e.componentType),
              (r.ngContentSelectors = e.ngContentSelectors),
              (r.inputs = e.inputs),
              (r.outputs = e.outputs),
              r
            );
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.create = function (t, e, n, r) {
              return this.factory.create(t, e, n, r || this.ngModule);
            }),
            e
          );
        })(Ze);
      function nn() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
      }
      var rn = (function () {
          function t(t) {
            this.nativeElement = t;
          }
          return (
            (t.__NG_ELEMENT_ID__ = function () {
              return on(t);
            }),
            t
          );
        })(),
        on = nn,
        an = (function () {
          return function () {};
        })(),
        sn = (function () {
          return function () {};
        })(),
        un = (function (t) {
          return (
            (t[(t.Important = 1)] = "Important"),
            (t[(t.DashCase = 2)] = "DashCase"),
            t
          );
        })({}),
        ln = (function () {
          function t() {}
          return (
            (t.__NG_ELEMENT_ID__ = function () {
              return cn();
            }),
            t
          );
        })(),
        cn = nn,
        hn = (function () {
          return function (t) {
            (this.full = t),
              (this.major = t.split(".")[0]),
              (this.minor = t.split(".")[1]),
              (this.patch = t.split(".").slice(2).join("."));
          };
        })(),
        pn = new hn("8.2.13"),
        fn = (function () {
          function t() {}
          return (
            (t.prototype.supports = function (t) {
              return Be(t);
            }),
            (t.prototype.create = function (t) {
              return new mn(t);
            }),
            t
          );
        })(),
        dn = function (t, e) {
          return e;
        },
        mn = (function () {
          function t(t) {
            (this.length = 0),
              (this._linkedRecords = null),
              (this._unlinkedRecords = null),
              (this._previousItHead = null),
              (this._itHead = null),
              (this._itTail = null),
              (this._additionsHead = null),
              (this._additionsTail = null),
              (this._movesHead = null),
              (this._movesTail = null),
              (this._removalsHead = null),
              (this._removalsTail = null),
              (this._identityChangesHead = null),
              (this._identityChangesTail = null),
              (this._trackByFn = t || dn);
          }
          return (
            (t.prototype.forEachItem = function (t) {
              var e;
              for (e = this._itHead; null !== e; e = e._next) t(e);
            }),
            (t.prototype.forEachOperation = function (t) {
              for (
                var e = this._itHead, n = this._removalsHead, r = 0, o = null;
                e || n;

              ) {
                var i = !n || (e && e.currentIndex < bn(n, r, o)) ? e : n,
                  a = bn(i, r, o),
                  s = i.currentIndex;
                if (i === n) r--, (n = n._nextRemoved);
                else if (((e = e._next), null == i.previousIndex)) r++;
                else {
                  o || (o = []);
                  var u = a - r,
                    l = s - r;
                  if (u != l) {
                    for (var c = 0; c < u; c++) {
                      var h = c < o.length ? o[c] : (o[c] = 0),
                        p = h + c;
                      l <= p && p < u && (o[c] = h + 1);
                    }
                    o[i.previousIndex] = l - u;
                  }
                }
                a !== s && t(i, a, s);
              }
            }),
            (t.prototype.forEachPreviousItem = function (t) {
              var e;
              for (e = this._previousItHead; null !== e; e = e._nextPrevious)
                t(e);
            }),
            (t.prototype.forEachAddedItem = function (t) {
              var e;
              for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
            }),
            (t.prototype.forEachMovedItem = function (t) {
              var e;
              for (e = this._movesHead; null !== e; e = e._nextMoved) t(e);
            }),
            (t.prototype.forEachRemovedItem = function (t) {
              var e;
              for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
            }),
            (t.prototype.forEachIdentityChange = function (t) {
              var e;
              for (
                e = this._identityChangesHead;
                null !== e;
                e = e._nextIdentityChange
              )
                t(e);
            }),
            (t.prototype.diff = function (t) {
              if ((null == t && (t = []), !Be(t)))
                throw new Error(
                  "Error trying to diff '" +
                    ft(t) +
                    "'. Only arrays and iterables are allowed"
                );
              return this.check(t) ? this : null;
            }),
            (t.prototype.onDestroy = function () {}),
            (t.prototype.check = function (t) {
              var e = this;
              this._reset();
              var n,
                r,
                o,
                i = this._itHead,
                a = !1;
              if (Array.isArray(t)) {
                this.length = t.length;
                for (var s = 0; s < this.length; s++)
                  (o = this._trackByFn(s, (r = t[s]))),
                    null !== i && Ue(i.trackById, o)
                      ? (a && (i = this._verifyReinsertion(i, r, o, s)),
                        Ue(i.item, r) || this._addIdentityChange(i, r))
                      : ((i = this._mismatch(i, r, o, s)), (a = !0)),
                    (i = i._next);
              } else
                (n = 0),
                  (function (t, e) {
                    if (Array.isArray(t))
                      for (var n = 0; n < t.length; n++) e(t[n]);
                    else
                      for (
                        var r = t[Le()](), o = void 0;
                        !(o = r.next()).done;

                      )
                        e(o.value);
                  })(t, function (t) {
                    (o = e._trackByFn(n, t)),
                      null !== i && Ue(i.trackById, o)
                        ? (a && (i = e._verifyReinsertion(i, t, o, n)),
                          Ue(i.item, t) || e._addIdentityChange(i, t))
                        : ((i = e._mismatch(i, t, o, n)), (a = !0)),
                      (i = i._next),
                      n++;
                  }),
                  (this.length = n);
              return this._truncate(i), (this.collection = t), this.isDirty;
            }),
            Object.defineProperty(t.prototype, "isDirty", {
              get: function () {
                return (
                  null !== this._additionsHead ||
                  null !== this._movesHead ||
                  null !== this._removalsHead ||
                  null !== this._identityChangesHead
                );
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype._reset = function () {
              if (this.isDirty) {
                var t = void 0,
                  e = void 0;
                for (
                  t = this._previousItHead = this._itHead;
                  null !== t;
                  t = t._next
                )
                  t._nextPrevious = t._next;
                for (t = this._additionsHead; null !== t; t = t._nextAdded)
                  t.previousIndex = t.currentIndex;
                for (
                  this._additionsHead = this._additionsTail = null,
                    t = this._movesHead;
                  null !== t;
                  t = e
                )
                  (t.previousIndex = t.currentIndex), (e = t._nextMoved);
                (this._movesHead = this._movesTail = null),
                  (this._removalsHead = this._removalsTail = null),
                  (this._identityChangesHead = this._identityChangesTail =
                    null);
              }
            }),
            (t.prototype._mismatch = function (t, e, n, r) {
              var o;
              return (
                null === t
                  ? (o = this._itTail)
                  : ((o = t._prev), this._remove(t)),
                null !==
                (t =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(n, r))
                  ? (Ue(t.item, e) || this._addIdentityChange(t, e),
                    this._moveAfter(t, o, r))
                  : null !==
                    (t =
                      null === this._unlinkedRecords
                        ? null
                        : this._unlinkedRecords.get(n, null))
                  ? (Ue(t.item, e) || this._addIdentityChange(t, e),
                    this._reinsertAfter(t, o, r))
                  : (t = this._addAfter(new yn(e, n), o, r)),
                t
              );
            }),
            (t.prototype._verifyReinsertion = function (t, e, n, r) {
              var o =
                null === this._unlinkedRecords
                  ? null
                  : this._unlinkedRecords.get(n, null);
              return (
                null !== o
                  ? (t = this._reinsertAfter(o, t._prev, r))
                  : t.currentIndex != r &&
                    ((t.currentIndex = r), this._addToMoves(t, r)),
                t
              );
            }),
            (t.prototype._truncate = function (t) {
              for (; null !== t; ) {
                var e = t._next;
                this._addToRemovals(this._unlink(t)), (t = e);
              }
              null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
                null !== this._additionsTail &&
                  (this._additionsTail._nextAdded = null),
                null !== this._movesTail && (this._movesTail._nextMoved = null),
                null !== this._itTail && (this._itTail._next = null),
                null !== this._removalsTail &&
                  (this._removalsTail._nextRemoved = null),
                null !== this._identityChangesTail &&
                  (this._identityChangesTail._nextIdentityChange = null);
            }),
            (t.prototype._reinsertAfter = function (t, e, n) {
              null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
              var r = t._prevRemoved,
                o = t._nextRemoved;
              return (
                null === r ? (this._removalsHead = o) : (r._nextRemoved = o),
                null === o ? (this._removalsTail = r) : (o._prevRemoved = r),
                this._insertAfter(t, e, n),
                this._addToMoves(t, n),
                t
              );
            }),
            (t.prototype._moveAfter = function (t, e, n) {
              return (
                this._unlink(t),
                this._insertAfter(t, e, n),
                this._addToMoves(t, n),
                t
              );
            }),
            (t.prototype._addAfter = function (t, e, n) {
              return (
                this._insertAfter(t, e, n),
                (this._additionsTail =
                  null === this._additionsTail
                    ? (this._additionsHead = t)
                    : (this._additionsTail._nextAdded = t)),
                t
              );
            }),
            (t.prototype._insertAfter = function (t, e, n) {
              var r = null === e ? this._itHead : e._next;
              return (
                (t._next = r),
                (t._prev = e),
                null === r ? (this._itTail = t) : (r._prev = t),
                null === e ? (this._itHead = t) : (e._next = t),
                null === this._linkedRecords &&
                  (this._linkedRecords = new vn()),
                this._linkedRecords.put(t),
                (t.currentIndex = n),
                t
              );
            }),
            (t.prototype._remove = function (t) {
              return this._addToRemovals(this._unlink(t));
            }),
            (t.prototype._unlink = function (t) {
              null !== this._linkedRecords && this._linkedRecords.remove(t);
              var e = t._prev,
                n = t._next;
              return (
                null === e ? (this._itHead = n) : (e._next = n),
                null === n ? (this._itTail = e) : (n._prev = e),
                t
              );
            }),
            (t.prototype._addToMoves = function (t, e) {
              return t.previousIndex === e
                ? t
                : ((this._movesTail =
                    null === this._movesTail
                      ? (this._movesHead = t)
                      : (this._movesTail._nextMoved = t)),
                  t);
            }),
            (t.prototype._addToRemovals = function (t) {
              return (
                null === this._unlinkedRecords &&
                  (this._unlinkedRecords = new vn()),
                this._unlinkedRecords.put(t),
                (t.currentIndex = null),
                (t._nextRemoved = null),
                null === this._removalsTail
                  ? ((this._removalsTail = this._removalsHead = t),
                    (t._prevRemoved = null))
                  : ((t._prevRemoved = this._removalsTail),
                    (this._removalsTail = this._removalsTail._nextRemoved = t)),
                t
              );
            }),
            (t.prototype._addIdentityChange = function (t, e) {
              return (
                (t.item = e),
                (this._identityChangesTail =
                  null === this._identityChangesTail
                    ? (this._identityChangesHead = t)
                    : (this._identityChangesTail._nextIdentityChange = t)),
                t
              );
            }),
            t
          );
        })(),
        yn = (function () {
          return function (t, e) {
            (this.item = t),
              (this.trackById = e),
              (this.currentIndex = null),
              (this.previousIndex = null),
              (this._nextPrevious = null),
              (this._prev = null),
              (this._next = null),
              (this._prevDup = null),
              (this._nextDup = null),
              (this._prevRemoved = null),
              (this._nextRemoved = null),
              (this._nextAdded = null),
              (this._nextMoved = null),
              (this._nextIdentityChange = null);
          };
        })(),
        gn = (function () {
          function t() {
            (this._head = null), (this._tail = null);
          }
          return (
            (t.prototype.add = function (t) {
              null === this._head
                ? ((this._head = this._tail = t),
                  (t._nextDup = null),
                  (t._prevDup = null))
                : ((this._tail._nextDup = t),
                  (t._prevDup = this._tail),
                  (t._nextDup = null),
                  (this._tail = t));
            }),
            (t.prototype.get = function (t, e) {
              var n;
              for (n = this._head; null !== n; n = n._nextDup)
                if ((null === e || e <= n.currentIndex) && Ue(n.trackById, t))
                  return n;
              return null;
            }),
            (t.prototype.remove = function (t) {
              var e = t._prevDup,
                n = t._nextDup;
              return (
                null === e ? (this._head = n) : (e._nextDup = n),
                null === n ? (this._tail = e) : (n._prevDup = e),
                null === this._head
              );
            }),
            t
          );
        })(),
        vn = (function () {
          function t() {
            this.map = new Map();
          }
          return (
            (t.prototype.put = function (t) {
              var e = t.trackById,
                n = this.map.get(e);
              n || ((n = new gn()), this.map.set(e, n)), n.add(t);
            }),
            (t.prototype.get = function (t, e) {
              var n = this.map.get(t);
              return n ? n.get(t, e) : null;
            }),
            (t.prototype.remove = function (t) {
              var e = t.trackById;
              return this.map.get(e).remove(t) && this.map.delete(e), t;
            }),
            Object.defineProperty(t.prototype, "isEmpty", {
              get: function () {
                return 0 === this.map.size;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.clear = function () {
              this.map.clear();
            }),
            t
          );
        })();
      function bn(t, e, n) {
        var r = t.previousIndex;
        if (null === r) return r;
        var o = 0;
        return n && r < n.length && (o = n[r]), r + e + o;
      }
      var _n = (function () {
          function t() {}
          return (
            (t.prototype.supports = function (t) {
              return t instanceof Map || qe(t);
            }),
            (t.prototype.create = function () {
              return new wn();
            }),
            t
          );
        })(),
        wn = (function () {
          function t() {
            (this._records = new Map()),
              (this._mapHead = null),
              (this._appendAfter = null),
              (this._previousMapHead = null),
              (this._changesHead = null),
              (this._changesTail = null),
              (this._additionsHead = null),
              (this._additionsTail = null),
              (this._removalsHead = null),
              (this._removalsTail = null);
          }
          return (
            Object.defineProperty(t.prototype, "isDirty", {
              get: function () {
                return (
                  null !== this._additionsHead ||
                  null !== this._changesHead ||
                  null !== this._removalsHead
                );
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.forEachItem = function (t) {
              var e;
              for (e = this._mapHead; null !== e; e = e._next) t(e);
            }),
            (t.prototype.forEachPreviousItem = function (t) {
              var e;
              for (e = this._previousMapHead; null !== e; e = e._nextPrevious)
                t(e);
            }),
            (t.prototype.forEachChangedItem = function (t) {
              var e;
              for (e = this._changesHead; null !== e; e = e._nextChanged) t(e);
            }),
            (t.prototype.forEachAddedItem = function (t) {
              var e;
              for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
            }),
            (t.prototype.forEachRemovedItem = function (t) {
              var e;
              for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
            }),
            (t.prototype.diff = function (t) {
              if (t) {
                if (!(t instanceof Map || qe(t)))
                  throw new Error(
                    "Error trying to diff '" +
                      ft(t) +
                      "'. Only maps and objects are allowed"
                  );
              } else t = new Map();
              return this.check(t) ? this : null;
            }),
            (t.prototype.onDestroy = function () {}),
            (t.prototype.check = function (t) {
              var e = this;
              this._reset();
              var n = this._mapHead;
              if (
                ((this._appendAfter = null),
                this._forEach(t, function (t, r) {
                  if (n && n.key === r)
                    e._maybeAddToChanges(n, t),
                      (e._appendAfter = n),
                      (n = n._next);
                  else {
                    var o = e._getOrCreateRecordForKey(r, t);
                    n = e._insertBeforeOrAppend(n, o);
                  }
                }),
                n)
              ) {
                n._prev && (n._prev._next = null), (this._removalsHead = n);
                for (var r = n; null !== r; r = r._nextRemoved)
                  r === this._mapHead && (this._mapHead = null),
                    this._records.delete(r.key),
                    (r._nextRemoved = r._next),
                    (r.previousValue = r.currentValue),
                    (r.currentValue = null),
                    (r._prev = null),
                    (r._next = null);
              }
              return (
                this._changesTail && (this._changesTail._nextChanged = null),
                this._additionsTail && (this._additionsTail._nextAdded = null),
                this.isDirty
              );
            }),
            (t.prototype._insertBeforeOrAppend = function (t, e) {
              if (t) {
                var n = t._prev;
                return (
                  (e._next = t),
                  (e._prev = n),
                  (t._prev = e),
                  n && (n._next = e),
                  t === this._mapHead && (this._mapHead = e),
                  (this._appendAfter = t),
                  t
                );
              }
              return (
                this._appendAfter
                  ? ((this._appendAfter._next = e),
                    (e._prev = this._appendAfter))
                  : (this._mapHead = e),
                (this._appendAfter = e),
                null
              );
            }),
            (t.prototype._getOrCreateRecordForKey = function (t, e) {
              if (this._records.has(t)) {
                var n = this._records.get(t);
                this._maybeAddToChanges(n, e);
                var r = n._prev,
                  o = n._next;
                return (
                  r && (r._next = o),
                  o && (o._prev = r),
                  (n._next = null),
                  (n._prev = null),
                  n
                );
              }
              var i = new Cn(t);
              return (
                this._records.set(t, i),
                (i.currentValue = e),
                this._addToAdditions(i),
                i
              );
            }),
            (t.prototype._reset = function () {
              if (this.isDirty) {
                var t = void 0;
                for (
                  this._previousMapHead = this._mapHead,
                    t = this._previousMapHead;
                  null !== t;
                  t = t._next
                )
                  t._nextPrevious = t._next;
                for (t = this._changesHead; null !== t; t = t._nextChanged)
                  t.previousValue = t.currentValue;
                for (t = this._additionsHead; null != t; t = t._nextAdded)
                  t.previousValue = t.currentValue;
                (this._changesHead = this._changesTail = null),
                  (this._additionsHead = this._additionsTail = null),
                  (this._removalsHead = null);
              }
            }),
            (t.prototype._maybeAddToChanges = function (t, e) {
              Ue(e, t.currentValue) ||
                ((t.previousValue = t.currentValue),
                (t.currentValue = e),
                this._addToChanges(t));
            }),
            (t.prototype._addToAdditions = function (t) {
              null === this._additionsHead
                ? (this._additionsHead = this._additionsTail = t)
                : ((this._additionsTail._nextAdded = t),
                  (this._additionsTail = t));
            }),
            (t.prototype._addToChanges = function (t) {
              null === this._changesHead
                ? (this._changesHead = this._changesTail = t)
                : ((this._changesTail._nextChanged = t),
                  (this._changesTail = t));
            }),
            (t.prototype._forEach = function (t, e) {
              t instanceof Map
                ? t.forEach(e)
                : Object.keys(t).forEach(function (n) {
                    return e(t[n], n);
                  });
            }),
            t
          );
        })(),
        Cn = (function () {
          return function (t) {
            (this.key = t),
              (this.previousValue = null),
              (this.currentValue = null),
              (this._nextPrevious = null),
              (this._next = null),
              (this._prev = null),
              (this._nextAdded = null),
              (this._nextRemoved = null),
              (this._nextChanged = null);
          };
        })(),
        En = (function () {
          function t(t) {
            this.factories = t;
          }
          return (
            (t.create = function (e, n) {
              if (null != n) {
                var r = n.factories.slice();
                e = e.concat(r);
              }
              return new t(e);
            }),
            (t.extend = function (e) {
              return {
                provide: t,
                useFactory: function (n) {
                  if (!n)
                    throw new Error(
                      "Cannot extend IterableDiffers without a parent injector"
                    );
                  return t.create(e, n);
                },
                deps: [[t, new st(), new it()]],
              };
            }),
            (t.prototype.find = function (t) {
              var e,
                n = this.factories.find(function (e) {
                  return e.supports(t);
                });
              if (null != n) return n;
              throw new Error(
                "Cannot find a differ supporting object '" +
                  t +
                  "' of type '" +
                  ((e = t).name || typeof e) +
                  "'"
              );
            }),
            (t.ngInjectableDef = ct({
              token: t,
              providedIn: "root",
              factory: function () {
                return new t([new fn()]);
              },
            })),
            t
          );
        })(),
        Sn = (function () {
          function t(t) {
            this.factories = t;
          }
          return (
            (t.create = function (e, n) {
              if (n) {
                var r = n.factories.slice();
                e = e.concat(r);
              }
              return new t(e);
            }),
            (t.extend = function (e) {
              return {
                provide: t,
                useFactory: function (n) {
                  if (!n)
                    throw new Error(
                      "Cannot extend KeyValueDiffers without a parent injector"
                    );
                  return t.create(e, n);
                },
                deps: [[t, new st(), new it()]],
              };
            }),
            (t.prototype.find = function (t) {
              var e = this.factories.find(function (e) {
                return e.supports(t);
              });
              if (e) return e;
              throw new Error(
                "Cannot find a differ supporting object '" + t + "'"
              );
            }),
            (t.ngInjectableDef = ct({
              token: t,
              providedIn: "root",
              factory: function () {
                return new t([new _n()]);
              },
            })),
            t
          );
        })(),
        kn = [new _n()],
        Tn = new En([new fn()]),
        xn = new Sn(kn),
        On = (function () {
          function t() {}
          return (
            (t.__NG_ELEMENT_ID__ = function () {
              return Pn(t, rn);
            }),
            t
          );
        })(),
        Pn = nn,
        An = (function () {
          function t() {}
          return (
            (t.__NG_ELEMENT_ID__ = function () {
              return In(t, rn);
            }),
            t
          );
        })(),
        In = nn;
      function Nn(t, e, n, r) {
        var o =
          "ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: '" +
          e +
          "'. Current value: '" +
          n +
          "'.";
        return (
          r &&
            (o +=
              " It seems like the view has been created after its parent and its children have been dirty checked. Has it been created in a change detection hook ?"),
          (function (t, e) {
            var n = new Error(t);
            return Rn(n, e), n;
          })(o, t)
        );
      }
      function Rn(t, e) {
        (t[zt] = e), (t[qt] = e.logError.bind(e));
      }
      function Dn(t) {
        return new Error(
          "ViewDestroyedError: Attempt to use a destroyed view: " + t
        );
      }
      function jn(t, e, n) {
        var r = t.state,
          o = 1792 & r;
        return o === e
          ? ((t.state = (-1793 & r) | n), (t.initIndex = -1), !0)
          : o === n;
      }
      function Mn(t, e, n) {
        return (
          (1792 & t.state) === e &&
          t.initIndex <= n &&
          ((t.initIndex = n + 1), !0)
        );
      }
      function Vn(t, e) {
        return t.nodes[e];
      }
      function Fn(t, e) {
        return t.nodes[e];
      }
      function Ln(t, e) {
        return t.nodes[e];
      }
      function Un(t, e) {
        return t.nodes[e];
      }
      function Hn(t, e) {
        return t.nodes[e];
      }
      var zn = {
          setCurrentNode: void 0,
          createRootView: void 0,
          createEmbeddedView: void 0,
          createComponentView: void 0,
          createNgModuleRef: void 0,
          overrideProvider: void 0,
          overrideComponentView: void 0,
          clearOverrides: void 0,
          checkAndUpdateView: void 0,
          checkNoChangesView: void 0,
          destroyView: void 0,
          resolveDep: void 0,
          createDebugContext: void 0,
          handleEvent: void 0,
          updateDirectives: void 0,
          updateRenderer: void 0,
          dirtyParentQueries: void 0,
        },
        Bn = function () {},
        qn = new Map();
      function Gn(t) {
        var e = qn.get(t);
        return e || ((e = ft(t) + "_" + qn.size), qn.set(t, e)), e;
      }
      var Wn = "$$undefined",
        Qn = "$$empty";
      function Kn(t) {
        return {
          id: Wn,
          styles: t.styles,
          encapsulation: t.encapsulation,
          data: t.data,
        };
      }
      var Zn = 0;
      function $n(t, e, n, r) {
        return !(!(2 & t.state) && Ue(t.oldValues[e.bindingIndex + n], r));
      }
      function Xn(t, e, n, r) {
        return !!$n(t, e, n, r) && ((t.oldValues[e.bindingIndex + n] = r), !0);
      }
      function Jn(t, e, n, r) {
        var o = t.oldValues[e.bindingIndex + n];
        if (1 & t.state || !He(o, r)) {
          var i = e.bindings[n].name;
          throw Nn(
            zn.createDebugContext(t, e.nodeIndex),
            i + ": " + o,
            i + ": " + r,
            0 != (1 & t.state)
          );
        }
      }
      function Yn(t) {
        for (var e = t; e; )
          2 & e.def.flags && (e.state |= 8),
            (e = e.viewContainerParent || e.parent);
      }
      function tr(t, e) {
        for (var n = t; n && n !== e; )
          (n.state |= 64), (n = n.viewContainerParent || n.parent);
      }
      function er(t, e, n, r) {
        try {
          return (
            Yn(33554432 & t.def.nodes[e].flags ? Fn(t, e).componentView : t),
            zn.handleEvent(t, e, n, r)
          );
        } catch (o) {
          t.root.errorHandler.handleError(o);
        }
      }
      function nr(t) {
        return t.parent ? Fn(t.parent, t.parentNodeDef.nodeIndex) : null;
      }
      function rr(t) {
        return t.parent ? t.parentNodeDef.parent : null;
      }
      function or(t, e) {
        switch (201347067 & e.flags) {
          case 1:
            return Fn(t, e.nodeIndex).renderElement;
          case 2:
            return Vn(t, e.nodeIndex).renderText;
        }
      }
      function ir(t) {
        return !!t.parent && !!(32768 & t.parentNodeDef.flags);
      }
      function ar(t) {
        return !(!t.parent || 32768 & t.parentNodeDef.flags);
      }
      function sr(t) {
        return 1 << t % 32;
      }
      function ur(t) {
        var e = {},
          n = 0,
          o = {};
        return (
          t &&
            t.forEach(function (t) {
              var i = Object(r.c)(t, 2),
                a = i[0],
                s = i[1];
              "number" == typeof a ? ((e[a] = s), (n |= sr(a))) : (o[a] = s);
            }),
          { matchedQueries: e, references: o, matchedQueryIds: n }
        );
      }
      function lr(t, e) {
        return t.map(function (t) {
          var n, o, i;
          return (
            Array.isArray(t)
              ? ((i = (n = Object(r.c)(t, 2))[0]), (o = n[1]))
              : ((i = 0), (o = t)),
            o &&
              ("function" == typeof o || "object" == typeof o) &&
              e &&
              Object.defineProperty(o, Ot, { value: e, configurable: !0 }),
            { flags: i, token: o, tokenKey: Gn(o) }
          );
        });
      }
      function cr(t, e, n) {
        var r = n.renderParent;
        return r
          ? 0 == (1 & r.flags) ||
            0 == (33554432 & r.flags) ||
            (r.element.componentRendererType &&
              r.element.componentRendererType.encapsulation === Ut.Native)
            ? Fn(t, n.renderParent.nodeIndex).renderElement
            : void 0
          : e;
      }
      var hr = new WeakMap();
      function pr(t) {
        var e = hr.get(t);
        return (
          e ||
            (((e = t(function () {
              return Bn;
            })).factory = t),
            hr.set(t, e)),
          e
        );
      }
      function fr(t, e, n, r, o) {
        3 === e && (n = t.renderer.parentNode(or(t, t.def.lastRenderRootNode))),
          dr(t, e, 0, t.def.nodes.length - 1, n, r, o);
      }
      function dr(t, e, n, r, o, i, a) {
        for (var s = n; s <= r; s++) {
          var u = t.def.nodes[s];
          11 & u.flags && yr(t, u, e, o, i, a), (s += u.childCount);
        }
      }
      function mr(t, e, n, r, o, i) {
        for (var a = t; a && !ir(a); ) a = a.parent;
        for (
          var s = a.parent,
            u = rr(a),
            l = u.nodeIndex + u.childCount,
            c = u.nodeIndex + 1;
          c <= l;
          c++
        ) {
          var h = s.def.nodes[c];
          h.ngContentIndex === e && yr(s, h, n, r, o, i), (c += h.childCount);
        }
        if (!s.parent) {
          var p = t.root.projectableNodes[e];
          if (p) for (c = 0; c < p.length; c++) gr(t, p[c], n, r, o, i);
        }
      }
      function yr(t, e, n, r, o, i) {
        if (8 & e.flags) mr(t, e.ngContent.index, n, r, o, i);
        else {
          var a = or(t, e);
          if (
            (3 === n && 33554432 & e.flags && 48 & e.bindingFlags
              ? (16 & e.bindingFlags && gr(t, a, n, r, o, i),
                32 & e.bindingFlags &&
                  gr(Fn(t, e.nodeIndex).componentView, a, n, r, o, i))
              : gr(t, a, n, r, o, i),
            16777216 & e.flags)
          )
            for (
              var s = Fn(t, e.nodeIndex).viewContainer._embeddedViews, u = 0;
              u < s.length;
              u++
            )
              fr(s[u], n, r, o, i);
          1 & e.flags &&
            !e.element.name &&
            dr(t, n, e.nodeIndex + 1, e.nodeIndex + e.childCount, r, o, i);
        }
      }
      function gr(t, e, n, r, o, i) {
        var a = t.renderer;
        switch (n) {
          case 1:
            a.appendChild(r, e);
            break;
          case 2:
            a.insertBefore(r, e, o);
            break;
          case 3:
            a.removeChild(r, e);
            break;
          case 0:
            i.push(e);
        }
      }
      var vr = /^:([^:]+):(.+)$/;
      function br(t) {
        if (":" === t[0]) {
          var e = t.match(vr);
          return [e[1], e[2]];
        }
        return ["", t];
      }
      function _r(t) {
        for (var e = 0, n = 0; n < t.length; n++) e |= t[n].flags;
        return e;
      }
      var wr = new Object(),
        Cr = Gn(Pe),
        Er = Gn(St),
        Sr = Gn(Mt);
      function kr(t, e, n, r) {
        return (
          (n = yt(n)),
          { index: -1, deps: lr(r, ft(e)), flags: t, token: e, value: n }
        );
      }
      function Tr(t, e, n) {
        void 0 === n && (n = Pe.THROW_IF_NOT_FOUND);
        var r,
          o,
          i = It(t);
        try {
          if (8 & e.flags) return e.token;
          if ((2 & e.flags && (n = null), 1 & e.flags))
            return t._parent.get(e.token, n);
          var a = e.tokenKey;
          switch (a) {
            case Cr:
            case Er:
            case Sr:
              return t;
          }
          var s,
            u = t._def.providersByKey[a];
          if (u) {
            var l = t._providers[u.index];
            return (
              void 0 === l && (l = t._providers[u.index] = xr(t, u)),
              l === wr ? void 0 : l
            );
          }
          if (
            (s = ht(e.token)) &&
            ((r = t),
            null != (o = s).providedIn &&
              ((function (t, e) {
                return t._def.modules.indexOf(e) > -1;
              })(r, o.providedIn) ||
                ("root" === o.providedIn && r._def.isRoot)))
          ) {
            var c = t._providers.length;
            return (
              (t._def.providers[c] = t._def.providersByKey[e.tokenKey] =
                {
                  flags: 5120,
                  value: s.factory,
                  deps: [],
                  index: c,
                  token: e.token,
                }),
              (t._providers[c] = wr),
              (t._providers[c] = xr(t, t._def.providersByKey[e.tokenKey]))
            );
          }
          return 4 & e.flags ? n : t._parent.get(e.token, n);
        } finally {
          It(i);
        }
      }
      function xr(t, e) {
        var n;
        switch (201347067 & e.flags) {
          case 512:
            n = (function (t, e, n) {
              var o = n.length;
              switch (o) {
                case 0:
                  return new e();
                case 1:
                  return new e(Tr(t, n[0]));
                case 2:
                  return new e(Tr(t, n[0]), Tr(t, n[1]));
                case 3:
                  return new e(Tr(t, n[0]), Tr(t, n[1]), Tr(t, n[2]));
                default:
                  for (var i = new Array(o), a = 0; a < o; a++)
                    i[a] = Tr(t, n[a]);
                  return new (e.bind.apply(e, Object(r.d)([void 0], i)))();
              }
            })(t, e.value, e.deps);
            break;
          case 1024:
            n = (function (t, e, n) {
              var o = n.length;
              switch (o) {
                case 0:
                  return e();
                case 1:
                  return e(Tr(t, n[0]));
                case 2:
                  return e(Tr(t, n[0]), Tr(t, n[1]));
                case 3:
                  return e(Tr(t, n[0]), Tr(t, n[1]), Tr(t, n[2]));
                default:
                  for (var i = Array(o), a = 0; a < o; a++) i[a] = Tr(t, n[a]);
                  return e.apply(void 0, Object(r.d)(i));
              }
            })(t, e.value, e.deps);
            break;
          case 2048:
            n = Tr(t, e.deps[0]);
            break;
          case 256:
            n = e.value;
        }
        return (
          n === wr ||
            null === n ||
            "object" != typeof n ||
            131072 & e.flags ||
            "function" != typeof n.ngOnDestroy ||
            (e.flags |= 131072),
          void 0 === n ? wr : n
        );
      }
      function Or(t, e) {
        var n = t.viewContainer._embeddedViews;
        if (((null == e || e >= n.length) && (e = n.length - 1), e < 0))
          return null;
        var r = n[e];
        return (
          (r.viewContainerParent = null),
          Lt(n, e),
          zn.dirtyParentQueries(r),
          Ar(r),
          r
        );
      }
      function Pr(t, e, n) {
        var r = e ? or(e, e.def.lastRenderRootNode) : t.renderElement,
          o = n.renderer.parentNode(r),
          i = n.renderer.nextSibling(r);
        fr(n, 2, o, i, void 0);
      }
      function Ar(t) {
        fr(t, 3, null, null, void 0);
      }
      var Ir = new Object();
      function Nr(t, e, n, r, o, i) {
        return new Rr(t, e, n, r, o, i);
      }
      var Rr = (function (t) {
          function e(e, n, r, o, i, a) {
            var s = t.call(this) || this;
            return (
              (s.selector = e),
              (s.componentType = n),
              (s._inputs = o),
              (s._outputs = i),
              (s.ngContentSelectors = a),
              (s.viewDefFactory = r),
              s
            );
          }
          return (
            Object(r.b)(e, t),
            Object.defineProperty(e.prototype, "inputs", {
              get: function () {
                var t = [],
                  e = this._inputs;
                for (var n in e) t.push({ propName: n, templateName: e[n] });
                return t;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "outputs", {
              get: function () {
                var t = [];
                for (var e in this._outputs)
                  t.push({ propName: e, templateName: this._outputs[e] });
                return t;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (e.prototype.create = function (t, e, n, r) {
              if (!r) throw new Error("ngModule should be provided");
              var o = pr(this.viewDefFactory),
                i = o.nodes[0].element.componentProvider.nodeIndex,
                a = zn.createRootView(t, e || [], n, o, r, Ir),
                s = Ln(a, i).instance;
              return (
                n &&
                  a.renderer.setAttribute(
                    Fn(a, 0).renderElement,
                    "ng-version",
                    pn.full
                  ),
                new Dr(a, new Fr(a), s)
              );
            }),
            e
          );
        })(Ze),
        Dr = (function (t) {
          function e(e, n, r) {
            var o = t.call(this) || this;
            return (
              (o._view = e),
              (o._viewRef = n),
              (o._component = r),
              (o._elDef = o._view.def.nodes[0]),
              (o.hostView = n),
              (o.changeDetectorRef = n),
              (o.instance = r),
              o
            );
          }
          return (
            Object(r.b)(e, t),
            Object.defineProperty(e.prototype, "location", {
              get: function () {
                return new rn(
                  Fn(this._view, this._elDef.nodeIndex).renderElement
                );
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "injector", {
              get: function () {
                return new zr(this._view, this._elDef);
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "componentType", {
              get: function () {
                return this._component.constructor;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (e.prototype.destroy = function () {
              this._viewRef.destroy();
            }),
            (e.prototype.onDestroy = function (t) {
              this._viewRef.onDestroy(t);
            }),
            e
          );
        })(Ke);
      function jr(t, e, n) {
        return new Mr(t, e, n);
      }
      var Mr = (function () {
        function t(t, e, n) {
          (this._view = t),
            (this._elDef = e),
            (this._data = n),
            (this._embeddedViews = []);
        }
        return (
          Object.defineProperty(t.prototype, "element", {
            get: function () {
              return new rn(this._data.renderElement);
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "injector", {
            get: function () {
              return new zr(this._view, this._elDef);
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "parentInjector", {
            get: function () {
              for (var t = this._view, e = this._elDef.parent; !e && t; )
                (e = rr(t)), (t = t.parent);
              return t ? new zr(t, e) : new zr(this._view, null);
            },
            enumerable: !0,
            configurable: !0,
          }),
          (t.prototype.clear = function () {
            for (var t = this._embeddedViews.length - 1; t >= 0; t--) {
              var e = Or(this._data, t);
              zn.destroyView(e);
            }
          }),
          (t.prototype.get = function (t) {
            var e = this._embeddedViews[t];
            if (e) {
              var n = new Fr(e);
              return n.attachToViewContainerRef(this), n;
            }
            return null;
          }),
          Object.defineProperty(t.prototype, "length", {
            get: function () {
              return this._embeddedViews.length;
            },
            enumerable: !0,
            configurable: !0,
          }),
          (t.prototype.createEmbeddedView = function (t, e, n) {
            var r = t.createEmbeddedView(e || {});
            return this.insert(r, n), r;
          }),
          (t.prototype.createComponent = function (t, e, n, r, o) {
            var i = n || this.parentInjector;
            o || t instanceof en || (o = i.get(Mt));
            var a = t.create(i, r, void 0, o);
            return this.insert(a.hostView, e), a;
          }),
          (t.prototype.insert = function (t, e) {
            if (t.destroyed)
              throw new Error(
                "Cannot insert a destroyed View in a ViewContainer!"
              );
            var n,
              r,
              o,
              i,
              a = t;
            return (
              (i = (n = this._data).viewContainer._embeddedViews),
              null == (r = e) && (r = i.length),
              ((o = a._view).viewContainerParent = this._view),
              Ft(i, r, o),
              (function (t, e) {
                var n = nr(e);
                if (n && n !== t && !(16 & e.state)) {
                  e.state |= 16;
                  var r = n.template._projectedViews;
                  r || (r = n.template._projectedViews = []),
                    r.push(e),
                    (function (t, e) {
                      if (!(4 & e.flags)) {
                        (t.nodeFlags |= 4), (e.flags |= 4);
                        for (var n = e.parent; n; )
                          (n.childFlags |= 4), (n = n.parent);
                      }
                    })(e.parent.def, e.parentNodeDef);
                }
              })(n, o),
              zn.dirtyParentQueries(o),
              Pr(n, r > 0 ? i[r - 1] : null, o),
              a.attachToViewContainerRef(this),
              t
            );
          }),
          (t.prototype.move = function (t, e) {
            if (t.destroyed)
              throw new Error(
                "Cannot move a destroyed View in a ViewContainer!"
              );
            var n,
              r,
              o,
              i,
              a,
              s = this._embeddedViews.indexOf(t._view);
            return (
              (o = e),
              (a = (i = (n = this._data).viewContainer._embeddedViews)[
                (r = s)
              ]),
              Lt(i, r),
              null == o && (o = i.length),
              Ft(i, o, a),
              zn.dirtyParentQueries(a),
              Ar(a),
              Pr(n, o > 0 ? i[o - 1] : null, a),
              t
            );
          }),
          (t.prototype.indexOf = function (t) {
            return this._embeddedViews.indexOf(t._view);
          }),
          (t.prototype.remove = function (t) {
            var e = Or(this._data, t);
            e && zn.destroyView(e);
          }),
          (t.prototype.detach = function (t) {
            var e = Or(this._data, t);
            return e ? new Fr(e) : null;
          }),
          t
        );
      })();
      function Vr(t) {
        return new Fr(t);
      }
      var Fr = (function () {
        function t(t) {
          (this._view = t),
            (this._viewContainerRef = null),
            (this._appRef = null);
        }
        return (
          Object.defineProperty(t.prototype, "rootNodes", {
            get: function () {
              return fr(this._view, 0, void 0, void 0, (t = [])), t;
              var t;
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "context", {
            get: function () {
              return this._view.context;
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "destroyed", {
            get: function () {
              return 0 != (128 & this._view.state);
            },
            enumerable: !0,
            configurable: !0,
          }),
          (t.prototype.markForCheck = function () {
            Yn(this._view);
          }),
          (t.prototype.detach = function () {
            this._view.state &= -5;
          }),
          (t.prototype.detectChanges = function () {
            var t = this._view.root.rendererFactory;
            t.begin && t.begin();
            try {
              zn.checkAndUpdateView(this._view);
            } finally {
              t.end && t.end();
            }
          }),
          (t.prototype.checkNoChanges = function () {
            zn.checkNoChangesView(this._view);
          }),
          (t.prototype.reattach = function () {
            this._view.state |= 4;
          }),
          (t.prototype.onDestroy = function (t) {
            this._view.disposables || (this._view.disposables = []),
              this._view.disposables.push(t);
          }),
          (t.prototype.destroy = function () {
            this._appRef
              ? this._appRef.detachView(this)
              : this._viewContainerRef &&
                this._viewContainerRef.detach(
                  this._viewContainerRef.indexOf(this)
                ),
              zn.destroyView(this._view);
          }),
          (t.prototype.detachFromAppRef = function () {
            (this._appRef = null),
              Ar(this._view),
              zn.dirtyParentQueries(this._view);
          }),
          (t.prototype.attachToAppRef = function (t) {
            if (this._viewContainerRef)
              throw new Error(
                "This view is already attached to a ViewContainer!"
              );
            this._appRef = t;
          }),
          (t.prototype.attachToViewContainerRef = function (t) {
            if (this._appRef)
              throw new Error(
                "This view is already attached directly to the ApplicationRef!"
              );
            this._viewContainerRef = t;
          }),
          t
        );
      })();
      function Lr(t, e) {
        return new Ur(t, e);
      }
      var Ur = (function (t) {
        function e(e, n) {
          var r = t.call(this) || this;
          return (r._parentView = e), (r._def = n), r;
        }
        return (
          Object(r.b)(e, t),
          (e.prototype.createEmbeddedView = function (t) {
            return new Fr(
              zn.createEmbeddedView(
                this._parentView,
                this._def,
                this._def.element.template,
                t
              )
            );
          }),
          Object.defineProperty(e.prototype, "elementRef", {
            get: function () {
              return new rn(
                Fn(this._parentView, this._def.nodeIndex).renderElement
              );
            },
            enumerable: !0,
            configurable: !0,
          }),
          e
        );
      })(On);
      function Hr(t, e) {
        return new zr(t, e);
      }
      var zr = (function () {
        function t(t, e) {
          (this.view = t), (this.elDef = e);
        }
        return (
          (t.prototype.get = function (t, e) {
            return (
              void 0 === e && (e = Pe.THROW_IF_NOT_FOUND),
              zn.resolveDep(
                this.view,
                this.elDef,
                !!this.elDef && 0 != (33554432 & this.elDef.flags),
                { flags: 0, token: t, tokenKey: Gn(t) },
                e
              )
            );
          }),
          t
        );
      })();
      function Br(t, e) {
        var n = t.def.nodes[e];
        if (1 & n.flags) {
          var r = Fn(t, n.nodeIndex);
          return n.element.template ? r.template : r.renderElement;
        }
        if (2 & n.flags) return Vn(t, n.nodeIndex).renderText;
        if (20240 & n.flags) return Ln(t, n.nodeIndex).instance;
        throw new Error("Illegal state: read nodeValue for node index " + e);
      }
      function qr(t) {
        return new Gr(t.renderer);
      }
      var Gr = (function () {
        function t(t) {
          this.delegate = t;
        }
        return (
          (t.prototype.selectRootElement = function (t) {
            return this.delegate.selectRootElement(t);
          }),
          (t.prototype.createElement = function (t, e) {
            var n = Object(r.c)(br(e), 2),
              o = this.delegate.createElement(n[1], n[0]);
            return t && this.delegate.appendChild(t, o), o;
          }),
          (t.prototype.createViewRoot = function (t) {
            return t;
          }),
          (t.prototype.createTemplateAnchor = function (t) {
            var e = this.delegate.createComment("");
            return t && this.delegate.appendChild(t, e), e;
          }),
          (t.prototype.createText = function (t, e) {
            var n = this.delegate.createText(e);
            return t && this.delegate.appendChild(t, n), n;
          }),
          (t.prototype.projectNodes = function (t, e) {
            for (var n = 0; n < e.length; n++)
              this.delegate.appendChild(t, e[n]);
          }),
          (t.prototype.attachViewAfter = function (t, e) {
            for (
              var n = this.delegate.parentNode(t),
                r = this.delegate.nextSibling(t),
                o = 0;
              o < e.length;
              o++
            )
              this.delegate.insertBefore(n, e[o], r);
          }),
          (t.prototype.detachView = function (t) {
            for (var e = 0; e < t.length; e++) {
              var n = t[e],
                r = this.delegate.parentNode(n);
              this.delegate.removeChild(r, n);
            }
          }),
          (t.prototype.destroyView = function (t, e) {
            for (var n = 0; n < e.length; n++) this.delegate.destroyNode(e[n]);
          }),
          (t.prototype.listen = function (t, e, n) {
            return this.delegate.listen(t, e, n);
          }),
          (t.prototype.listenGlobal = function (t, e, n) {
            return this.delegate.listen(t, e, n);
          }),
          (t.prototype.setElementProperty = function (t, e, n) {
            this.delegate.setProperty(t, e, n);
          }),
          (t.prototype.setElementAttribute = function (t, e, n) {
            var o = Object(r.c)(br(e), 2),
              i = o[0],
              a = o[1];
            null != n
              ? this.delegate.setAttribute(t, a, n, i)
              : this.delegate.removeAttribute(t, a, i);
          }),
          (t.prototype.setBindingDebugInfo = function (t, e, n) {}),
          (t.prototype.setElementClass = function (t, e, n) {
            n ? this.delegate.addClass(t, e) : this.delegate.removeClass(t, e);
          }),
          (t.prototype.setElementStyle = function (t, e, n) {
            null != n
              ? this.delegate.setStyle(t, e, n)
              : this.delegate.removeStyle(t, e);
          }),
          (t.prototype.invokeElementMethod = function (t, e, n) {
            t[e].apply(t, n);
          }),
          (t.prototype.setText = function (t, e) {
            this.delegate.setValue(t, e);
          }),
          (t.prototype.animate = function () {
            throw new Error("Renderer.animate is no longer supported!");
          }),
          t
        );
      })();
      function Wr(t, e, n, r) {
        return new Qr(t, e, n, r);
      }
      var Qr = (function () {
          function t(t, e, n, r) {
            (this._moduleType = t),
              (this._parent = e),
              (this._bootstrapComponents = n),
              (this._def = r),
              (this._destroyListeners = []),
              (this._destroyed = !1),
              (this.injector = this),
              (function (t) {
                for (
                  var e = t._def,
                    n = (t._providers = new Array(e.providers.length)),
                    r = 0;
                  r < e.providers.length;
                  r++
                ) {
                  var o = e.providers[r];
                  4096 & o.flags || (void 0 === n[r] && (n[r] = xr(t, o)));
                }
              })(this);
          }
          return (
            (t.prototype.get = function (t, e, n) {
              void 0 === e && (e = Pe.THROW_IF_NOT_FOUND),
                void 0 === n && (n = ut.Default);
              var r = 0;
              return (
                n & ut.SkipSelf ? (r |= 1) : n & ut.Self && (r |= 4),
                Tr(this, { token: t, tokenKey: Gn(t), flags: r }, e)
              );
            }),
            Object.defineProperty(t.prototype, "instance", {
              get: function () {
                return this.get(this._moduleType);
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "componentFactoryResolver", {
              get: function () {
                return this.get(Ye);
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.destroy = function () {
              if (this._destroyed)
                throw new Error(
                  "The ng module " +
                    ft(this.instance.constructor) +
                    " has already been destroyed."
                );
              (this._destroyed = !0),
                (function (t, e) {
                  for (
                    var n = t._def, r = new Set(), o = 0;
                    o < n.providers.length;
                    o++
                  )
                    if (131072 & n.providers[o].flags) {
                      var i = t._providers[o];
                      if (i && i !== wr) {
                        var a = i.ngOnDestroy;
                        "function" != typeof a ||
                          r.has(i) ||
                          (a.apply(i), r.add(i));
                      }
                    }
                })(this),
                this._destroyListeners.forEach(function (t) {
                  return t();
                });
            }),
            (t.prototype.onDestroy = function (t) {
              this._destroyListeners.push(t);
            }),
            t
          );
        })(),
        Kr = Gn(an),
        Zr = Gn(ln),
        $r = Gn(rn),
        Xr = Gn(An),
        Jr = Gn(On),
        Yr = Gn(ke),
        to = Gn(Pe),
        eo = Gn(St);
      function no(t, e, n, o, i, a, s, u) {
        var l = [];
        if (s)
          for (var c in s) {
            var h = Object(r.c)(s[c], 2);
            l[h[0]] = {
              flags: 8,
              name: c,
              nonMinifiedName: h[1],
              ns: null,
              securityContext: null,
              suffix: null,
            };
          }
        var p = [];
        if (u)
          for (var f in u)
            p.push({ type: 1, propName: f, target: null, eventName: u[f] });
        return oo(t, (e |= 16384), n, o, i, i, a, l, p);
      }
      function ro(t, e, n, r, o) {
        return oo(-1, t, e, 0, n, r, o);
      }
      function oo(t, e, n, r, o, i, a, s, u) {
        var l = ur(n),
          c = l.matchedQueries,
          h = l.references,
          p = l.matchedQueryIds;
        u || (u = []), s || (s = []), (i = yt(i));
        var f = lr(a, ft(o));
        return {
          nodeIndex: -1,
          parent: null,
          renderParent: null,
          bindingIndex: -1,
          outputIndex: -1,
          checkIndex: t,
          flags: e,
          childFlags: 0,
          directChildFlags: 0,
          childMatchedQueries: 0,
          matchedQueries: c,
          matchedQueryIds: p,
          references: h,
          ngContentIndex: -1,
          childCount: r,
          bindings: s,
          bindingFlags: _r(s),
          outputs: u,
          element: null,
          provider: { token: o, value: i, deps: f },
          text: null,
          query: null,
          ngContent: null,
        };
      }
      function io(t, e) {
        return lo(t, e);
      }
      function ao(t, e) {
        for (var n = t; n.parent && !ir(n); ) n = n.parent;
        return co(n.parent, rr(n), !0, e.provider.value, e.provider.deps);
      }
      function so(t, e) {
        var n = co(
          t,
          e.parent,
          (32768 & e.flags) > 0,
          e.provider.value,
          e.provider.deps
        );
        if (e.outputs.length)
          for (var r = 0; r < e.outputs.length; r++) {
            var o = e.outputs[r],
              i = n[o.propName];
            if (!We(i))
              throw new Error(
                "@Output " +
                  o.propName +
                  " not initialized in '" +
                  n.constructor.name +
                  "'."
              );
            var a = i.subscribe(uo(t, e.parent.nodeIndex, o.eventName));
            t.disposables[e.outputIndex + r] = a.unsubscribe.bind(a);
          }
        return n;
      }
      function uo(t, e, n) {
        return function (r) {
          return er(t, e, n, r);
        };
      }
      function lo(t, e) {
        var n = (8192 & e.flags) > 0,
          o = e.provider;
        switch (201347067 & e.flags) {
          case 512:
            return co(t, e.parent, n, o.value, o.deps);
          case 1024:
            return (function (t, e, n, o, i) {
              var a = i.length;
              switch (a) {
                case 0:
                  return o();
                case 1:
                  return o(po(t, e, n, i[0]));
                case 2:
                  return o(po(t, e, n, i[0]), po(t, e, n, i[1]));
                case 3:
                  return o(
                    po(t, e, n, i[0]),
                    po(t, e, n, i[1]),
                    po(t, e, n, i[2])
                  );
                default:
                  for (var s = Array(a), u = 0; u < a; u++)
                    s[u] = po(t, e, n, i[u]);
                  return o.apply(void 0, Object(r.d)(s));
              }
            })(t, e.parent, n, o.value, o.deps);
          case 2048:
            return po(t, e.parent, n, o.deps[0]);
          case 256:
            return o.value;
        }
      }
      function co(t, e, n, o, i) {
        var a = i.length;
        switch (a) {
          case 0:
            return new o();
          case 1:
            return new o(po(t, e, n, i[0]));
          case 2:
            return new o(po(t, e, n, i[0]), po(t, e, n, i[1]));
          case 3:
            return new o(
              po(t, e, n, i[0]),
              po(t, e, n, i[1]),
              po(t, e, n, i[2])
            );
          default:
            for (var s = new Array(a), u = 0; u < a; u++)
              s[u] = po(t, e, n, i[u]);
            return new (o.bind.apply(o, Object(r.d)([void 0], s)))();
        }
      }
      var ho = {};
      function po(t, e, n, r, o) {
        if ((void 0 === o && (o = Pe.THROW_IF_NOT_FOUND), 8 & r.flags))
          return r.token;
        var i = t;
        2 & r.flags && (o = null);
        var a = r.tokenKey;
        a === Yr && (n = !(!e || !e.element.componentView)),
          e && 1 & r.flags && ((n = !1), (e = e.parent));
        for (var s = t; s; ) {
          if (e)
            switch (a) {
              case Kr:
                return qr(fo(s, e, n));
              case Zr:
                return fo(s, e, n).renderer;
              case $r:
                return new rn(Fn(s, e.nodeIndex).renderElement);
              case Xr:
                return Fn(s, e.nodeIndex).viewContainer;
              case Jr:
                if (e.element.template) return Fn(s, e.nodeIndex).template;
                break;
              case Yr:
                return Vr(fo(s, e, n));
              case to:
              case eo:
                return Hr(s, e);
              default:
                var u = (
                  n ? e.element.allProviders : e.element.publicProviders
                )[a];
                if (u) {
                  var l = Ln(s, u.nodeIndex);
                  return (
                    l ||
                      ((l = { instance: lo(s, u) }),
                      (s.nodes[u.nodeIndex] = l)),
                    l.instance
                  );
                }
            }
          (n = ir(s)), (e = rr(s)), (s = s.parent), 4 & r.flags && (s = null);
        }
        var c = i.root.injector.get(r.token, ho);
        return c !== ho || o === ho
          ? c
          : i.root.ngModule.injector.get(r.token, o);
      }
      function fo(t, e, n) {
        var r;
        if (n) r = Fn(t, e.nodeIndex).componentView;
        else for (r = t; r.parent && !ir(r); ) r = r.parent;
        return r;
      }
      function mo(t, e, n, r, o, i) {
        if (32768 & n.flags) {
          var a = Fn(t, n.parent.nodeIndex).componentView;
          2 & a.def.flags && (a.state |= 8);
        }
        if (((e.instance[n.bindings[r].name] = o), 524288 & n.flags)) {
          i = i || {};
          var s = ze.unwrap(t.oldValues[n.bindingIndex + r]);
          i[n.bindings[r].nonMinifiedName] = new Qe(s, o, 0 != (2 & t.state));
        }
        return (t.oldValues[n.bindingIndex + r] = o), i;
      }
      function yo(t, e) {
        if (t.def.nodeFlags & e)
          for (var n = t.def.nodes, r = 0, o = 0; o < n.length; o++) {
            var i = n[o],
              a = i.parent;
            for (
              !a && i.flags & e && vo(t, o, i.flags & e, r++),
                0 == (i.childFlags & e) && (o += i.childCount);
              a && 1 & a.flags && o === a.nodeIndex + a.childCount;

            )
              a.directChildFlags & e && (r = go(t, a, e, r)), (a = a.parent);
          }
      }
      function go(t, e, n, r) {
        for (var o = e.nodeIndex + 1; o <= e.nodeIndex + e.childCount; o++) {
          var i = t.def.nodes[o];
          i.flags & n && vo(t, o, i.flags & n, r++), (o += i.childCount);
        }
        return r;
      }
      function vo(t, e, n, r) {
        var o = Ln(t, e);
        if (o) {
          var i = o.instance;
          i &&
            (zn.setCurrentNode(t, e),
            1048576 & n && Mn(t, 512, r) && i.ngAfterContentInit(),
            2097152 & n && i.ngAfterContentChecked(),
            4194304 & n && Mn(t, 768, r) && i.ngAfterViewInit(),
            8388608 & n && i.ngAfterViewChecked(),
            131072 & n && i.ngOnDestroy());
        }
      }
      var bo = new Et("SCHEDULER_TOKEN", {
          providedIn: "root",
          factory: function () {
            return Ht;
          },
        }),
        _o = {},
        wo = (function (t) {
          return (
            (t[(t.LocaleId = 0)] = "LocaleId"),
            (t[(t.DayPeriodsFormat = 1)] = "DayPeriodsFormat"),
            (t[(t.DayPeriodsStandalone = 2)] = "DayPeriodsStandalone"),
            (t[(t.DaysFormat = 3)] = "DaysFormat"),
            (t[(t.DaysStandalone = 4)] = "DaysStandalone"),
            (t[(t.MonthsFormat = 5)] = "MonthsFormat"),
            (t[(t.MonthsStandalone = 6)] = "MonthsStandalone"),
            (t[(t.Eras = 7)] = "Eras"),
            (t[(t.FirstDayOfWeek = 8)] = "FirstDayOfWeek"),
            (t[(t.WeekendRange = 9)] = "WeekendRange"),
            (t[(t.DateFormat = 10)] = "DateFormat"),
            (t[(t.TimeFormat = 11)] = "TimeFormat"),
            (t[(t.DateTimeFormat = 12)] = "DateTimeFormat"),
            (t[(t.NumberSymbols = 13)] = "NumberSymbols"),
            (t[(t.NumberFormats = 14)] = "NumberFormats"),
            (t[(t.CurrencySymbol = 15)] = "CurrencySymbol"),
            (t[(t.CurrencyName = 16)] = "CurrencyName"),
            (t[(t.Currencies = 17)] = "Currencies"),
            (t[(t.PluralCase = 18)] = "PluralCase"),
            (t[(t.ExtraData = 19)] = "ExtraData"),
            t
          );
        })({}),
        Co = void 0,
        Eo = [
          "en",
          [["a", "p"], ["AM", "PM"], Co],
          [["AM", "PM"], Co, Co],
          [
            ["S", "M", "T", "W", "T", "F", "S"],
            ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
          ],
          Co,
          [
            ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
            [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
            [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ],
          ],
          Co,
          [
            ["B", "A"],
            ["BC", "AD"],
            ["Before Christ", "Anno Domini"],
          ],
          0,
          [6, 0],
          ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
          ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
          ["{1}, {0}", Co, "{1} 'at' {0}", Co],
          [".", ",", ";", "%", "+", "-", "E", "×", "‰", "∞", "NaN", ":"],
          ["#,##0.###", "#,##0%", "¤#,##0.00", "#E0"],
          "$",
          "US Dollar",
          {},
          function (t) {
            var e = Math.floor(Math.abs(t)),
              n = t.toString().replace(/^[^.]*\.?/, "").length;
            return 1 === e && 0 === n ? 1 : 5;
          },
        ],
        So = "en-US";
      function ko(t) {
        var e;
        (e = "Expected localeId to be defined"),
          null == t &&
            (function (t) {
              throw new Error("ASSERTION ERROR: " + t);
            })(e),
          "string" == typeof t && t.toLowerCase().replace(/_/g, "-");
      }
      var To = (function (t) {
        function e(e) {
          void 0 === e && (e = !1);
          var n = t.call(this) || this;
          return (n.__isAsync = e), n;
        }
        return (
          Object(r.b)(e, t),
          (e.prototype.emit = function (e) {
            t.prototype.next.call(this, e);
          }),
          (e.prototype.subscribe = function (e, n, r) {
            var o,
              i = function (t) {
                return null;
              },
              a = function () {
                return null;
              };
            e && "object" == typeof e
              ? ((o = this.__isAsync
                  ? function (t) {
                      setTimeout(function () {
                        return e.next(t);
                      });
                    }
                  : function (t) {
                      e.next(t);
                    }),
                e.error &&
                  (i = this.__isAsync
                    ? function (t) {
                        setTimeout(function () {
                          return e.error(t);
                        });
                      }
                    : function (t) {
                        e.error(t);
                      }),
                e.complete &&
                  (a = this.__isAsync
                    ? function () {
                        setTimeout(function () {
                          return e.complete();
                        });
                      }
                    : function () {
                        e.complete();
                      }))
              : ((o = this.__isAsync
                  ? function (t) {
                      setTimeout(function () {
                        return e(t);
                      });
                    }
                  : function (t) {
                      e(t);
                    }),
                n &&
                  (i = this.__isAsync
                    ? function (t) {
                        setTimeout(function () {
                          return n(t);
                        });
                      }
                    : function (t) {
                        n(t);
                      }),
                r &&
                  (a = this.__isAsync
                    ? function () {
                        setTimeout(function () {
                          return r();
                        });
                      }
                    : function () {
                        r();
                      }));
            var s = t.prototype.subscribe.call(this, o, i, a);
            return e instanceof u && e.add(s), s;
          }),
          e
        );
      })(T);
      function xo() {
        return this._results[Le()]();
      }
      var Oo = (function () {
          function t() {
            (this.dirty = !0),
              (this._results = []),
              (this.changes = new To()),
              (this.length = 0);
            var e = Le(),
              n = t.prototype;
            n[e] || (n[e] = xo);
          }
          return (
            (t.prototype.map = function (t) {
              return this._results.map(t);
            }),
            (t.prototype.filter = function (t) {
              return this._results.filter(t);
            }),
            (t.prototype.find = function (t) {
              return this._results.find(t);
            }),
            (t.prototype.reduce = function (t, e) {
              return this._results.reduce(t, e);
            }),
            (t.prototype.forEach = function (t) {
              this._results.forEach(t);
            }),
            (t.prototype.some = function (t) {
              return this._results.some(t);
            }),
            (t.prototype.toArray = function () {
              return this._results.slice();
            }),
            (t.prototype.toString = function () {
              return this._results.toString();
            }),
            (t.prototype.reset = function (t) {
              (this._results = (function t(e, n) {
                void 0 === n && (n = e);
                for (var r = 0; r < e.length; r++) {
                  var o = e[r];
                  Array.isArray(o)
                    ? (n === e && (n = e.slice(0, r)), t(o, n))
                    : n !== e && n.push(o);
                }
                return n;
              })(t)),
                (this.dirty = !1),
                (this.length = this._results.length),
                (this.last = this._results[this.length - 1]),
                (this.first = this._results[0]);
            }),
            (t.prototype.notifyOnChanges = function () {
              this.changes.emit(this);
            }),
            (t.prototype.setDirty = function () {
              this.dirty = !0;
            }),
            (t.prototype.destroy = function () {
              this.changes.complete(), this.changes.unsubscribe();
            }),
            t
          );
        })(),
        Po = new Et("Application Initializer"),
        Ao = (function () {
          function t(t) {
            var e = this;
            (this.appInits = t),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise(function (t, n) {
                (e.resolve = t), (e.reject = n);
              }));
          }
          return (
            (t.prototype.runInitializers = function () {
              var t = this;
              if (!this.initialized) {
                var e = [],
                  n = function () {
                    (t.done = !0), t.resolve();
                  };
                if (this.appInits)
                  for (var r = 0; r < this.appInits.length; r++) {
                    var o = this.appInits[r]();
                    Ge(o) && e.push(o);
                  }
                Promise.all(e)
                  .then(function () {
                    n();
                  })
                  .catch(function (e) {
                    t.reject(e);
                  }),
                  0 === e.length && n(),
                  (this.initialized = !0);
              }
            }),
            t
          );
        })(),
        Io = new Et("AppId");
      function No() {
        return "" + Ro() + Ro() + Ro();
      }
      function Ro() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      var Do = new Et("Platform Initializer"),
        jo = new Et("Platform ID"),
        Mo = new Et("appBootstrapListener"),
        Vo = (function () {
          function t() {}
          return (
            (t.prototype.log = function (t) {
              console.log(t);
            }),
            (t.prototype.warn = function (t) {
              console.warn(t);
            }),
            t
          );
        })(),
        Fo = new Et("LocaleId"),
        Lo = !1;
      function Uo() {
        throw new Error("Runtime compiler is not loaded");
      }
      var Ho,
        zo,
        Bo = Uo,
        qo = Uo,
        Go = Uo,
        Wo = Uo,
        Qo = (function () {
          function t() {
            (this.compileModuleSync = Bo),
              (this.compileModuleAsync = qo),
              (this.compileModuleAndAllComponentsSync = Go),
              (this.compileModuleAndAllComponentsAsync = Wo);
          }
          return (
            (t.prototype.clearCache = function () {}),
            (t.prototype.clearCacheFor = function (t) {}),
            (t.prototype.getModuleId = function (t) {}),
            t
          );
        })(),
        Ko = (function () {
          return function () {};
        })();
      function Zo() {
        var t = Ct.wtf;
        return !(!t || !(Ho = t.trace) || ((zo = Ho.events), 0));
      }
      var $o = Zo();
      function Xo(t, e) {
        return null;
      }
      var Jo = $o
          ? function (t, e) {
              return void 0 === e && (e = null), zo.createScope(t, e);
            }
          : function (t, e) {
              return Xo;
            },
        Yo = $o
          ? function (t, e) {
              return Ho.leaveScope(t, e), e;
            }
          : function (t, e) {
              return e;
            },
        ti = (function () {
          return Promise.resolve(0);
        })();
      function ei(t) {
        "undefined" == typeof Zone
          ? ti.then(function () {
              t && t.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", t);
      }
      var ni = (function () {
        function t(t) {
          var e,
            n = t.enableLongStackTrace,
            r = void 0 !== n && n;
          if (
            ((this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new To(!1)),
            (this.onMicrotaskEmpty = new To(!1)),
            (this.onStable = new To(!1)),
            (this.onError = new To(!1)),
            "undefined" == typeof Zone)
          )
            throw new Error("In this configuration Angular requires Zone.js");
          Zone.assertZonePatched(),
            (this._nesting = 0),
            (this._outer = this._inner = Zone.current),
            Zone.wtfZoneSpec &&
              (this._inner = this._inner.fork(Zone.wtfZoneSpec)),
            Zone.TaskTrackingZoneSpec &&
              (this._inner = this._inner.fork(new Zone.TaskTrackingZoneSpec())),
            r &&
              Zone.longStackTraceZoneSpec &&
              (this._inner = this._inner.fork(Zone.longStackTraceZoneSpec)),
            ((e = this)._inner = e._inner.fork({
              name: "angular",
              properties: { isAngularZone: !0 },
              onInvokeTask: function (t, n, r, o, i, a) {
                try {
                  return ai(e), t.invokeTask(r, o, i, a);
                } finally {
                  si(e);
                }
              },
              onInvoke: function (t, n, r, o, i, a, s) {
                try {
                  return ai(e), t.invoke(r, o, i, a, s);
                } finally {
                  si(e);
                }
              },
              onHasTask: function (t, n, r, o) {
                t.hasTask(r, o),
                  n === r &&
                    ("microTask" == o.change
                      ? ((e.hasPendingMicrotasks = o.microTask), ii(e))
                      : "macroTask" == o.change &&
                        (e.hasPendingMacrotasks = o.macroTask));
              },
              onHandleError: function (t, n, r, o) {
                return (
                  t.handleError(r, o),
                  e.runOutsideAngular(function () {
                    return e.onError.emit(o);
                  }),
                  !1
                );
              },
            }));
        }
        return (
          (t.isInAngularZone = function () {
            return !0 === Zone.current.get("isAngularZone");
          }),
          (t.assertInAngularZone = function () {
            if (!t.isInAngularZone())
              throw new Error("Expected to be in Angular Zone, but it is not!");
          }),
          (t.assertNotInAngularZone = function () {
            if (t.isInAngularZone())
              throw new Error("Expected to not be in Angular Zone, but it is!");
          }),
          (t.prototype.run = function (t, e, n) {
            return this._inner.run(t, e, n);
          }),
          (t.prototype.runTask = function (t, e, n, r) {
            var o = this._inner,
              i = o.scheduleEventTask("NgZoneEvent: " + r, t, oi, ri, ri);
            try {
              return o.runTask(i, e, n);
            } finally {
              o.cancelTask(i);
            }
          }),
          (t.prototype.runGuarded = function (t, e, n) {
            return this._inner.runGuarded(t, e, n);
          }),
          (t.prototype.runOutsideAngular = function (t) {
            return this._outer.run(t);
          }),
          t
        );
      })();
      function ri() {}
      var oi = {};
      function ii(t) {
        if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable)
          try {
            t._nesting++, t.onMicrotaskEmpty.emit(null);
          } finally {
            if ((t._nesting--, !t.hasPendingMicrotasks))
              try {
                t.runOutsideAngular(function () {
                  return t.onStable.emit(null);
                });
              } finally {
                t.isStable = !0;
              }
          }
      }
      function ai(t) {
        t._nesting++,
          t.isStable && ((t.isStable = !1), t.onUnstable.emit(null));
      }
      function si(t) {
        t._nesting--, ii(t);
      }
      var ui,
        li = (function () {
          function t() {
            (this.hasPendingMicrotasks = !1),
              (this.hasPendingMacrotasks = !1),
              (this.isStable = !0),
              (this.onUnstable = new To()),
              (this.onMicrotaskEmpty = new To()),
              (this.onStable = new To()),
              (this.onError = new To());
          }
          return (
            (t.prototype.run = function (t) {
              return t();
            }),
            (t.prototype.runGuarded = function (t) {
              return t();
            }),
            (t.prototype.runOutsideAngular = function (t) {
              return t();
            }),
            (t.prototype.runTask = function (t) {
              return t();
            }),
            t
          );
        })(),
        ci = (function () {
          function t(t) {
            var e = this;
            (this._ngZone = t),
              (this._pendingCount = 0),
              (this._isZoneStable = !0),
              (this._didWork = !1),
              (this._callbacks = []),
              (this.taskTrackingZone = null),
              this._watchAngularEvents(),
              t.run(function () {
                e.taskTrackingZone =
                  "undefined" == typeof Zone
                    ? null
                    : Zone.current.get("TaskTrackingZone");
              });
          }
          return (
            (t.prototype._watchAngularEvents = function () {
              var t = this;
              this._ngZone.onUnstable.subscribe({
                next: function () {
                  (t._didWork = !0), (t._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(function () {
                  t._ngZone.onStable.subscribe({
                    next: function () {
                      ni.assertNotInAngularZone(),
                        ei(function () {
                          (t._isZoneStable = !0), t._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }),
            (t.prototype.increasePendingRequestCount = function () {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }),
            (t.prototype.decreasePendingRequestCount = function () {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }),
            (t.prototype.isStable = function () {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }),
            (t.prototype._runCallbacksIfReady = function () {
              var t = this;
              if (this.isStable())
                ei(function () {
                  for (; 0 !== t._callbacks.length; ) {
                    var e = t._callbacks.pop();
                    clearTimeout(e.timeoutId), e.doneCb(t._didWork);
                  }
                  t._didWork = !1;
                });
              else {
                var e = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(function (t) {
                  return (
                    !t.updateCb ||
                    !t.updateCb(e) ||
                    (clearTimeout(t.timeoutId), !1)
                  );
                })),
                  (this._didWork = !0);
              }
            }),
            (t.prototype.getPendingTasks = function () {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map(function (t) {
                    return {
                      source: t.source,
                      creationLocation: t.creationLocation,
                      data: t.data,
                    };
                  })
                : [];
            }),
            (t.prototype.addCallback = function (t, e, n) {
              var r = this,
                o = -1;
              e &&
                e > 0 &&
                (o = setTimeout(function () {
                  (r._callbacks = r._callbacks.filter(function (t) {
                    return t.timeoutId !== o;
                  })),
                    t(r._didWork, r.getPendingTasks());
                }, e)),
                this._callbacks.push({ doneCb: t, timeoutId: o, updateCb: n });
            }),
            (t.prototype.whenStable = function (t, e, n) {
              if (n && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/dist/task-tracking.js" loaded?'
                );
              this.addCallback(t, e, n), this._runCallbacksIfReady();
            }),
            (t.prototype.getPendingRequestCount = function () {
              return this._pendingCount;
            }),
            (t.prototype.findProviders = function (t, e, n) {
              return [];
            }),
            t
          );
        })(),
        hi = (function () {
          function t() {
            (this._applications = new Map()), pi.addToWindow(this);
          }
          return (
            (t.prototype.registerApplication = function (t, e) {
              this._applications.set(t, e);
            }),
            (t.prototype.unregisterApplication = function (t) {
              this._applications.delete(t);
            }),
            (t.prototype.unregisterAllApplications = function () {
              this._applications.clear();
            }),
            (t.prototype.getTestability = function (t) {
              return this._applications.get(t) || null;
            }),
            (t.prototype.getAllTestabilities = function () {
              return Array.from(this._applications.values());
            }),
            (t.prototype.getAllRootElements = function () {
              return Array.from(this._applications.keys());
            }),
            (t.prototype.findTestabilityInTree = function (t, e) {
              return (
                void 0 === e && (e = !0), pi.findTestabilityInTree(this, t, e)
              );
            }),
            t
          );
        })(),
        pi = new ((function () {
          function t() {}
          return (
            (t.prototype.addToWindow = function (t) {}),
            (t.prototype.findTestabilityInTree = function (t, e, n) {
              return null;
            }),
            t
          );
        })())(),
        fi = new Et("AllowMultipleToken"),
        di = (function () {
          return function (t, e) {
            (this.name = t), (this.token = e);
          };
        })();
      function mi(t, e, n) {
        void 0 === n && (n = []);
        var r = "Platform: " + e,
          o = new Et(r);
        return function (e) {
          void 0 === e && (e = []);
          var i = yi();
          if (!i || i.injector.get(fi, !1))
            if (t) t(n.concat(e).concat({ provide: o, useValue: !0 }));
            else {
              var a = n.concat(e).concat({ provide: o, useValue: !0 });
              !(function (t) {
                if (ui && !ui.destroyed && !ui.injector.get(fi, !1))
                  throw new Error(
                    "There can be only one platform. Destroy the previous one to create a new one."
                  );
                ui = t.get(gi);
                var e = t.get(Do, null);
                e &&
                  e.forEach(function (t) {
                    return t();
                  });
              })(Pe.create({ providers: a, name: r }));
            }
          return (function (t) {
            var e = yi();
            if (!e) throw new Error("No platform exists!");
            if (!e.injector.get(t, null))
              throw new Error(
                "A platform with a different configuration has been created. Please destroy it first."
              );
            return e;
          })(o);
        };
      }
      function yi() {
        return ui && !ui.destroyed ? ui : null;
      }
      var gi = (function () {
        function t(t) {
          (this._injector = t),
            (this._modules = []),
            (this._destroyListeners = []),
            (this._destroyed = !1);
        }
        return (
          (t.prototype.bootstrapModuleFactory = function (t, e) {
            var n,
              r = this,
              o =
                "noop" === (n = e ? e.ngZone : void 0)
                  ? new li()
                  : ("zone.js" === n ? void 0 : n) ||
                    new ni({ enableLongStackTrace: Xt() }),
              i = [{ provide: ni, useValue: o }];
            return o.run(function () {
              var e = Pe.create({
                  providers: i,
                  parent: r.injector,
                  name: t.moduleType.name,
                }),
                n = t.create(e),
                a = n.injector.get(Kt, null);
              if (!a)
                throw new Error(
                  "No ErrorHandler. Is platform module (BrowserModule) included?"
                );
              return (
                Lo && ko(n.injector.get(Fo, So) || So),
                n.onDestroy(function () {
                  return _i(r._modules, n);
                }),
                o.runOutsideAngular(function () {
                  return o.onError.subscribe({
                    next: function (t) {
                      a.handleError(t);
                    },
                  });
                }),
                (function (t, e, o) {
                  try {
                    var i =
                      ((a = n.injector.get(Ao)).runInitializers(),
                      a.donePromise.then(function () {
                        return r._moduleDoBootstrap(n), n;
                      }));
                    return Ge(i)
                      ? i.catch(function (n) {
                          throw (
                            (e.runOutsideAngular(function () {
                              return t.handleError(n);
                            }),
                            n)
                          );
                        })
                      : i;
                  } catch (s) {
                    throw (
                      (e.runOutsideAngular(function () {
                        return t.handleError(s);
                      }),
                      s)
                    );
                  }
                  var a;
                })(a, o)
              );
            });
          }),
          (t.prototype.bootstrapModule = function (t, e) {
            var n = this;
            void 0 === e && (e = []);
            var r = vi({}, e);
            return (function (t, e, n) {
              return t.get(Ko).createCompiler([e]).compileModuleAsync(n);
            })(this.injector, r, t).then(function (t) {
              return n.bootstrapModuleFactory(t, r);
            });
          }),
          (t.prototype._moduleDoBootstrap = function (t) {
            var e = t.injector.get(bi);
            if (t._bootstrapComponents.length > 0)
              t._bootstrapComponents.forEach(function (t) {
                return e.bootstrap(t);
              });
            else {
              if (!t.instance.ngDoBootstrap)
                throw new Error(
                  "The module " +
                    ft(t.instance.constructor) +
                    ' was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.'
                );
              t.instance.ngDoBootstrap(e);
            }
            this._modules.push(t);
          }),
          (t.prototype.onDestroy = function (t) {
            this._destroyListeners.push(t);
          }),
          Object.defineProperty(t.prototype, "injector", {
            get: function () {
              return this._injector;
            },
            enumerable: !0,
            configurable: !0,
          }),
          (t.prototype.destroy = function () {
            if (this._destroyed)
              throw new Error("The platform has already been destroyed!");
            this._modules.slice().forEach(function (t) {
              return t.destroy();
            }),
              this._destroyListeners.forEach(function (t) {
                return t();
              }),
              (this._destroyed = !0);
          }),
          Object.defineProperty(t.prototype, "destroyed", {
            get: function () {
              return this._destroyed;
            },
            enumerable: !0,
            configurable: !0,
          }),
          t
        );
      })();
      function vi(t, e) {
        return Array.isArray(e) ? e.reduce(vi, t) : Object(r.a)({}, t, e);
      }
      var bi = (function () {
        function t(t, e, n, r, o, i) {
          var a = this;
          (this._zone = t),
            (this._console = e),
            (this._injector = n),
            (this._exceptionHandler = r),
            (this._componentFactoryResolver = o),
            (this._initStatus = i),
            (this._bootstrapListeners = []),
            (this._views = []),
            (this._runningTick = !1),
            (this._enforceNoNewChanges = !1),
            (this._stable = !0),
            (this.componentTypes = []),
            (this.components = []),
            (this._enforceNoNewChanges = Xt()),
            this._zone.onMicrotaskEmpty.subscribe({
              next: function () {
                a._zone.run(function () {
                  a.tick();
                });
              },
            });
          var s = new w(function (t) {
              (a._stable =
                a._zone.isStable &&
                !a._zone.hasPendingMacrotasks &&
                !a._zone.hasPendingMicrotasks),
                a._zone.runOutsideAngular(function () {
                  t.next(a._stable), t.complete();
                });
            }),
            u = new w(function (t) {
              var e;
              a._zone.runOutsideAngular(function () {
                e = a._zone.onStable.subscribe(function () {
                  ni.assertNotInAngularZone(),
                    ei(function () {
                      a._stable ||
                        a._zone.hasPendingMacrotasks ||
                        a._zone.hasPendingMicrotasks ||
                        ((a._stable = !0), t.next(!0));
                    });
                });
              });
              var n = a._zone.onUnstable.subscribe(function () {
                ni.assertInAngularZone(),
                  a._stable &&
                    ((a._stable = !1),
                    a._zone.runOutsideAngular(function () {
                      t.next(!1);
                    }));
              });
              return function () {
                e.unsubscribe(), n.unsubscribe();
              };
            });
          this.isStable = (function () {
            for (var t = [], e = 0; e < arguments.length; e++)
              t[e] = arguments[e];
            var n = Number.POSITIVE_INFINITY,
              r = null,
              o = t[t.length - 1];
            return (
              O(o)
                ? ((r = t.pop()),
                  t.length > 1 &&
                    "number" == typeof t[t.length - 1] &&
                    (n = t.pop()))
                : "number" == typeof o && (n = t.pop()),
              null === r && 1 === t.length && t[0] instanceof w
                ? t[0]
                : Q(n)(K(t, r))
            );
          })(
            s,
            u.pipe(function (t) {
              return Z()(
                ((e = et),
                function (t) {
                  var n;
                  n =
                    "function" == typeof e
                      ? e
                      : function () {
                          return e;
                        };
                  var r = Object.create(t, Y);
                  return (r.source = t), (r.subjectFactory = n), r;
                })(t)
              );
              var e;
            })
          );
        }
        var e;
        return (
          (e = t),
          (t.prototype.bootstrap = function (t, e) {
            var n,
              r = this;
            if (!this._initStatus.done)
              throw new Error(
                "Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module."
              );
            (n =
              t instanceof Ze
                ? t
                : this._componentFactoryResolver.resolveComponentFactory(t)),
              this.componentTypes.push(n.componentType);
            var o = n instanceof en ? null : this._injector.get(Mt),
              i = n.create(Pe.NULL, [], e || n.selector, o);
            i.onDestroy(function () {
              r._unloadComponent(i);
            });
            var a = i.injector.get(ci, null);
            return (
              a &&
                i.injector
                  .get(hi)
                  .registerApplication(i.location.nativeElement, a),
              this._loadComponent(i),
              Xt() &&
                this._console.log(
                  "Angular is running in the development mode. Call enableProdMode() to enable the production mode."
                ),
              i
            );
          }),
          (t.prototype.tick = function () {
            var t,
              n,
              o,
              i,
              a = this;
            if (this._runningTick)
              throw new Error("ApplicationRef.tick is called recursively");
            var s = e._tickScope();
            try {
              this._runningTick = !0;
              try {
                for (
                  var u = Object(r.e)(this._views), l = u.next();
                  !l.done;
                  l = u.next()
                )
                  l.value.detectChanges();
              } catch (p) {
                t = { error: p };
              } finally {
                try {
                  l && !l.done && (n = u.return) && n.call(u);
                } finally {
                  if (t) throw t.error;
                }
              }
              if (this._enforceNoNewChanges)
                try {
                  for (
                    var c = Object(r.e)(this._views), h = c.next();
                    !h.done;
                    h = c.next()
                  )
                    h.value.checkNoChanges();
                } catch (f) {
                  o = { error: f };
                } finally {
                  try {
                    h && !h.done && (i = c.return) && i.call(c);
                  } finally {
                    if (o) throw o.error;
                  }
                }
            } catch (d) {
              this._zone.runOutsideAngular(function () {
                return a._exceptionHandler.handleError(d);
              });
            } finally {
              (this._runningTick = !1), Yo(s);
            }
          }),
          (t.prototype.attachView = function (t) {
            var e = t;
            this._views.push(e), e.attachToAppRef(this);
          }),
          (t.prototype.detachView = function (t) {
            var e = t;
            _i(this._views, e), e.detachFromAppRef();
          }),
          (t.prototype._loadComponent = function (t) {
            this.attachView(t.hostView),
              this.tick(),
              this.components.push(t),
              this._injector
                .get(Mo, [])
                .concat(this._bootstrapListeners)
                .forEach(function (e) {
                  return e(t);
                });
          }),
          (t.prototype._unloadComponent = function (t) {
            this.detachView(t.hostView), _i(this.components, t);
          }),
          (t.prototype.ngOnDestroy = function () {
            this._views.slice().forEach(function (t) {
              return t.destroy();
            });
          }),
          Object.defineProperty(t.prototype, "viewCount", {
            get: function () {
              return this._views.length;
            },
            enumerable: !0,
            configurable: !0,
          }),
          (t._tickScope = Jo("ApplicationRef#tick()")),
          t
        );
      })();
      function _i(t, e) {
        var n = t.indexOf(e);
        n > -1 && t.splice(n, 1);
      }
      var wi = (function () {
          return function () {};
        })(),
        Ci = (function () {
          return function () {};
        })(),
        Ei = { factoryPathPrefix: "", factoryPathSuffix: ".ngfactory" },
        Si = (function () {
          function t(t, e) {
            (this._compiler = t), (this._config = e || Ei);
          }
          return (
            (t.prototype.load = function (t) {
              return !Lo && this._compiler instanceof Qo
                ? this.loadFactory(t)
                : this.loadAndCompile(t);
            }),
            (t.prototype.loadAndCompile = function (t) {
              var e = this,
                o = Object(r.c)(t.split("#"), 2),
                i = o[0],
                a = o[1];
              return (
                void 0 === a && (a = "default"),
                n("crnd")(i)
                  .then(function (t) {
                    return t[a];
                  })
                  .then(function (t) {
                    return ki(t, i, a);
                  })
                  .then(function (t) {
                    return e._compiler.compileModuleAsync(t);
                  })
              );
            }),
            (t.prototype.loadFactory = function (t) {
              var e = Object(r.c)(t.split("#"), 2),
                o = e[0],
                i = e[1],
                a = "NgFactory";
              return (
                void 0 === i && ((i = "default"), (a = "")),
                n("crnd")(
                  this._config.factoryPathPrefix +
                    o +
                    this._config.factoryPathSuffix
                )
                  .then(function (t) {
                    return t[i + a];
                  })
                  .then(function (t) {
                    return ki(t, o, i);
                  })
              );
            }),
            t
          );
        })();
      function ki(t, e, n) {
        if (!t) throw new Error("Cannot find '" + n + "' in '" + e + "'");
        return t;
      }
      var Ti = (function () {
          return function (t, e) {
            (this.name = t), (this.callback = e);
          };
        })(),
        xi = (function () {
          function t(t, e, n) {
            (this.listeners = []),
              (this.parent = null),
              (this._debugContext = n),
              (this.nativeNode = t),
              e && e instanceof Oi && e.addChild(this);
          }
          return (
            Object.defineProperty(t.prototype, "injector", {
              get: function () {
                return this._debugContext.injector;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "componentInstance", {
              get: function () {
                return this._debugContext.component;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "context", {
              get: function () {
                return this._debugContext.context;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "references", {
              get: function () {
                return this._debugContext.references;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "providerTokens", {
              get: function () {
                return this._debugContext.providerTokens;
              },
              enumerable: !0,
              configurable: !0,
            }),
            t
          );
        })(),
        Oi = (function (t) {
          function e(e, n, r) {
            var o = t.call(this, e, n, r) || this;
            return (
              (o.properties = {}),
              (o.attributes = {}),
              (o.classes = {}),
              (o.styles = {}),
              (o.childNodes = []),
              (o.nativeElement = e),
              o
            );
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.addChild = function (t) {
              t && (this.childNodes.push(t), (t.parent = this));
            }),
            (e.prototype.removeChild = function (t) {
              var e = this.childNodes.indexOf(t);
              -1 !== e && ((t.parent = null), this.childNodes.splice(e, 1));
            }),
            (e.prototype.insertChildrenAfter = function (t, e) {
              var n,
                o = this,
                i = this.childNodes.indexOf(t);
              -1 !== i &&
                ((n = this.childNodes).splice.apply(
                  n,
                  Object(r.d)([i + 1, 0], e)
                ),
                e.forEach(function (e) {
                  e.parent && e.parent.removeChild(e), (t.parent = o);
                }));
            }),
            (e.prototype.insertBefore = function (t, e) {
              var n = this.childNodes.indexOf(t);
              -1 === n
                ? this.addChild(e)
                : (e.parent && e.parent.removeChild(e),
                  (e.parent = this),
                  this.childNodes.splice(n, 0, e));
            }),
            (e.prototype.query = function (t) {
              return this.queryAll(t)[0] || null;
            }),
            (e.prototype.queryAll = function (t) {
              var e = [];
              return (
                (function t(e, n, r) {
                  e.childNodes.forEach(function (e) {
                    e instanceof Oi && (n(e) && r.push(e), t(e, n, r));
                  });
                })(this, t, e),
                e
              );
            }),
            (e.prototype.queryAllNodes = function (t) {
              var e = [];
              return (
                (function t(e, n, r) {
                  e instanceof Oi &&
                    e.childNodes.forEach(function (e) {
                      n(e) && r.push(e), e instanceof Oi && t(e, n, r);
                    });
                })(this, t, e),
                e
              );
            }),
            Object.defineProperty(e.prototype, "children", {
              get: function () {
                return this.childNodes.filter(function (t) {
                  return t instanceof e;
                });
              },
              enumerable: !0,
              configurable: !0,
            }),
            (e.prototype.triggerEventHandler = function (t, e) {
              this.listeners.forEach(function (n) {
                n.name == t && n.callback(e);
              });
            }),
            e
          );
        })(xi),
        Pi = new Map(),
        Ai = function (t) {
          return Pi.get(t) || null;
        };
      function Ii(t) {
        Pi.set(t.nativeNode, t);
      }
      var Ni = mi(null, "core", [
        { provide: jo, useValue: "unknown" },
        { provide: gi, deps: [Pe] },
        { provide: hi, deps: [] },
        { provide: Vo, deps: [] },
      ]);
      function Ri() {
        return Tn;
      }
      function Di() {
        return xn;
      }
      function ji(t) {
        return t ? (Lo && ko(t), t) : So;
      }
      function Mi(t) {
        var e = [];
        return (
          t.onStable.subscribe(function () {
            for (; e.length; ) e.pop()();
          }),
          function (t) {
            e.push(t);
          }
        );
      }
      var Vi = (function () {
        return function (t) {};
      })();
      function Fi(t, e, n, r, o, i) {
        t |= 1;
        var a = ur(e);
        return {
          nodeIndex: -1,
          parent: null,
          renderParent: null,
          bindingIndex: -1,
          outputIndex: -1,
          flags: t,
          checkIndex: -1,
          childFlags: 0,
          directChildFlags: 0,
          childMatchedQueries: 0,
          matchedQueries: a.matchedQueries,
          matchedQueryIds: a.matchedQueryIds,
          references: a.references,
          ngContentIndex: n,
          childCount: r,
          bindings: [],
          bindingFlags: 0,
          outputs: [],
          element: {
            ns: null,
            name: null,
            attrs: null,
            template: i ? pr(i) : null,
            componentProvider: null,
            componentView: null,
            componentRendererType: null,
            publicProviders: null,
            allProviders: null,
            handleEvent: o || Bn,
          },
          provider: null,
          text: null,
          query: null,
          ngContent: null,
        };
      }
      function Li(t, e, n, o, i, a, s, u, l, c, h, p) {
        var f;
        void 0 === s && (s = []), c || (c = Bn);
        var d = ur(n),
          m = d.matchedQueries,
          y = d.references,
          g = d.matchedQueryIds,
          v = null,
          b = null;
        a && ((v = (f = Object(r.c)(br(a), 2))[0]), (b = f[1])), (u = u || []);
        for (var _ = new Array(u.length), w = 0; w < u.length; w++) {
          var C = Object(r.c)(u[w], 3),
            E = C[0],
            S = C[1],
            k = C[2],
            T = Object(r.c)(br(S), 2),
            x = T[0],
            O = T[1],
            P = void 0,
            A = void 0;
          switch (15 & E) {
            case 4:
              A = k;
              break;
            case 1:
            case 8:
              P = k;
          }
          _[w] = {
            flags: E,
            ns: x,
            name: O,
            nonMinifiedName: O,
            securityContext: P,
            suffix: A,
          };
        }
        l = l || [];
        var I = new Array(l.length);
        for (w = 0; w < l.length; w++) {
          var N = Object(r.c)(l[w], 2);
          I[w] = { type: 0, target: N[0], eventName: N[1], propName: null };
        }
        var R = (s = s || []).map(function (t) {
          var e = Object(r.c)(t, 2),
            n = e[0],
            o = e[1],
            i = Object(r.c)(br(n), 2);
          return [i[0], i[1], o];
        });
        return (
          (p = (function (t) {
            if (t && t.id === Wn) {
              var e =
                (null != t.encapsulation && t.encapsulation !== Ut.None) ||
                t.styles.length ||
                Object.keys(t.data).length;
              t.id = e ? "c" + Zn++ : Qn;
            }
            return t && t.id === Qn && (t = null), t || null;
          })(p)),
          h && (e |= 33554432),
          {
            nodeIndex: -1,
            parent: null,
            renderParent: null,
            bindingIndex: -1,
            outputIndex: -1,
            checkIndex: t,
            flags: (e |= 1),
            childFlags: 0,
            directChildFlags: 0,
            childMatchedQueries: 0,
            matchedQueries: m,
            matchedQueryIds: g,
            references: y,
            ngContentIndex: o,
            childCount: i,
            bindings: _,
            bindingFlags: _r(_),
            outputs: I,
            element: {
              ns: v,
              name: b,
              attrs: R,
              template: null,
              componentProvider: null,
              componentView: h || null,
              componentRendererType: p,
              publicProviders: null,
              allProviders: null,
              handleEvent: c || Bn,
            },
            provider: null,
            text: null,
            query: null,
            ngContent: null,
          }
        );
      }
      function Ui(t, e, n) {
        var o,
          i = n.element,
          a = t.root.selectorOrNode,
          s = t.renderer;
        if (t.parent || !a) {
          o = i.name ? s.createElement(i.name, i.ns) : s.createComment("");
          var u = cr(t, e, n);
          u && s.appendChild(u, o);
        } else
          o = s.selectRootElement(
            a,
            !!i.componentRendererType &&
              i.componentRendererType.encapsulation === Ut.ShadowDom
          );
        if (i.attrs)
          for (var l = 0; l < i.attrs.length; l++) {
            var c = Object(r.c)(i.attrs[l], 3);
            s.setAttribute(o, c[1], c[2], c[0]);
          }
        return o;
      }
      function Hi(t, e, n, r) {
        for (var o = 0; o < n.outputs.length; o++) {
          var i = n.outputs[o],
            a = zi(
              t,
              n.nodeIndex,
              ((h = i.eventName), (c = i.target) ? c + ":" + h : h)
            ),
            s = i.target,
            u = t;
          "component" === i.target && ((s = null), (u = e));
          var l = u.renderer.listen(s || r, i.eventName, a);
          t.disposables[n.outputIndex + o] = l;
        }
        var c, h;
      }
      function zi(t, e, n) {
        return function (r) {
          return er(t, e, n, r);
        };
      }
      function Bi(t, e, n, r) {
        if (!Xn(t, e, n, r)) return !1;
        var o = e.bindings[n],
          i = Fn(t, e.nodeIndex),
          a = i.renderElement,
          s = o.name;
        switch (15 & o.flags) {
          case 1:
            !(function (t, e, n, r, o, i) {
              var a = e.securityContext,
                s = a ? t.root.sanitizer.sanitize(a, i) : i;
              s = null != s ? s.toString() : null;
              var u = t.renderer;
              null != i
                ? u.setAttribute(n, o, s, r)
                : u.removeAttribute(n, o, r);
            })(t, o, a, o.ns, s, r);
            break;
          case 2:
            !(function (t, e, n, r) {
              var o = t.renderer;
              r ? o.addClass(e, n) : o.removeClass(e, n);
            })(t, a, s, r);
            break;
          case 4:
            !(function (t, e, n, r, o) {
              var i = t.root.sanitizer.sanitize(be.STYLE, o);
              if (null != i) {
                i = i.toString();
                var a = e.suffix;
                null != a && (i += a);
              } else i = null;
              var s = t.renderer;
              null != i ? s.setStyle(n, r, i) : s.removeStyle(n, r);
            })(t, o, a, s, r);
            break;
          case 8:
            !(function (t, e, n, r, o) {
              var i = e.securityContext,
                a = i ? t.root.sanitizer.sanitize(i, o) : o;
              t.renderer.setProperty(n, r, a);
            })(
              33554432 & e.flags && 32 & o.flags ? i.componentView : t,
              o,
              a,
              s,
              r
            );
        }
        return !0;
      }
      function qi(t, e, n) {
        var r = [];
        for (var o in n) r.push({ propName: o, bindingType: n[o] });
        return {
          nodeIndex: -1,
          parent: null,
          renderParent: null,
          bindingIndex: -1,
          outputIndex: -1,
          checkIndex: -1,
          flags: t,
          childFlags: 0,
          directChildFlags: 0,
          childMatchedQueries: 0,
          ngContentIndex: -1,
          matchedQueries: {},
          matchedQueryIds: 0,
          references: {},
          childCount: 0,
          bindings: [],
          bindingFlags: 0,
          outputs: [],
          element: null,
          provider: null,
          text: null,
          query: { id: e, filterId: sr(e), bindings: r },
          ngContent: null,
        };
      }
      function Gi(t) {
        for (var e = t.def.nodeMatchedQueries; t.parent && ar(t); ) {
          var n = t.parentNodeDef;
          t = t.parent;
          for (var r = n.nodeIndex + n.childCount, o = 0; o <= r; o++)
            67108864 & (i = t.def.nodes[o]).flags &&
              536870912 & i.flags &&
              (i.query.filterId & e) === i.query.filterId &&
              Hn(t, o).setDirty(),
              (!(1 & i.flags && o + i.childCount < n.nodeIndex) &&
                67108864 & i.childFlags &&
                536870912 & i.childFlags) ||
                (o += i.childCount);
        }
        if (134217728 & t.def.nodeFlags)
          for (o = 0; o < t.def.nodes.length; o++) {
            var i;
            134217728 & (i = t.def.nodes[o]).flags &&
              536870912 & i.flags &&
              Hn(t, o).setDirty(),
              (o += i.childCount);
          }
      }
      function Wi(t, e) {
        var n = Hn(t, e.nodeIndex);
        if (n.dirty) {
          var r,
            o = void 0;
          if (67108864 & e.flags) {
            var i = e.parent.parent;
            (o = Qi(t, i.nodeIndex, i.nodeIndex + i.childCount, e.query, [])),
              (r = Ln(t, e.parent.nodeIndex).instance);
          } else
            134217728 & e.flags &&
              ((o = Qi(t, 0, t.def.nodes.length - 1, e.query, [])),
              (r = t.component));
          n.reset(o);
          for (var a = e.query.bindings, s = !1, u = 0; u < a.length; u++) {
            var l = a[u],
              c = void 0;
            switch (l.bindingType) {
              case 0:
                c = n.first;
                break;
              case 1:
                (c = n), (s = !0);
            }
            r[l.propName] = c;
          }
          s && n.notifyOnChanges();
        }
      }
      function Qi(t, e, n, r, o) {
        for (var i = e; i <= n; i++) {
          var a = t.def.nodes[i],
            s = a.matchedQueries[r.id];
          if (
            (null != s && o.push(Ki(t, a, s)),
            1 & a.flags &&
              a.element.template &&
              (a.element.template.nodeMatchedQueries & r.filterId) ===
                r.filterId)
          ) {
            var u = Fn(t, i);
            if (
              ((a.childMatchedQueries & r.filterId) === r.filterId &&
                (Qi(t, i + 1, i + a.childCount, r, o), (i += a.childCount)),
              16777216 & a.flags)
            )
              for (
                var l = u.viewContainer._embeddedViews, c = 0;
                c < l.length;
                c++
              ) {
                var h = l[c],
                  p = nr(h);
                p && p === u && Qi(h, 0, h.def.nodes.length - 1, r, o);
              }
            var f = u.template._projectedViews;
            if (f)
              for (c = 0; c < f.length; c++) {
                var d = f[c];
                Qi(d, 0, d.def.nodes.length - 1, r, o);
              }
          }
          (a.childMatchedQueries & r.filterId) !== r.filterId &&
            (i += a.childCount);
        }
        return o;
      }
      function Ki(t, e, n) {
        if (null != n)
          switch (n) {
            case 1:
              return Fn(t, e.nodeIndex).renderElement;
            case 0:
              return new rn(Fn(t, e.nodeIndex).renderElement);
            case 2:
              return Fn(t, e.nodeIndex).template;
            case 3:
              return Fn(t, e.nodeIndex).viewContainer;
            case 4:
              return Ln(t, e.nodeIndex).instance;
          }
      }
      function Zi(t, e, n) {
        var r = cr(t, e, n);
        r && mr(t, n.ngContent.index, 1, r, null, void 0);
      }
      function $i(t, e) {
        for (
          var n = Object.keys(e), r = n.length, o = new Array(r), i = 0;
          i < r;
          i++
        ) {
          var a = n[i];
          o[e[a]] = a;
        }
        return Xi(64, t, o);
      }
      function Xi(t, e, n) {
        for (var r = new Array(n.length), o = 0; o < n.length; o++) {
          var i = n[o];
          r[o] = {
            flags: 8,
            name: i,
            ns: null,
            nonMinifiedName: i,
            securityContext: null,
            suffix: null,
          };
        }
        return {
          nodeIndex: -1,
          parent: null,
          renderParent: null,
          bindingIndex: -1,
          outputIndex: -1,
          checkIndex: e,
          flags: t,
          childFlags: 0,
          directChildFlags: 0,
          childMatchedQueries: 0,
          matchedQueries: {},
          matchedQueryIds: 0,
          references: {},
          ngContentIndex: -1,
          childCount: 0,
          bindings: r,
          bindingFlags: _r(r),
          outputs: [],
          element: null,
          provider: null,
          text: null,
          query: null,
          ngContent: null,
        };
      }
      function Ji(t, e, n) {
        for (var r = new Array(n.length - 1), o = 1; o < n.length; o++)
          r[o - 1] = {
            flags: 8,
            name: null,
            ns: null,
            nonMinifiedName: null,
            securityContext: null,
            suffix: n[o],
          };
        return {
          nodeIndex: -1,
          parent: null,
          renderParent: null,
          bindingIndex: -1,
          outputIndex: -1,
          checkIndex: t,
          flags: 2,
          childFlags: 0,
          directChildFlags: 0,
          childMatchedQueries: 0,
          matchedQueries: {},
          matchedQueryIds: 0,
          references: {},
          ngContentIndex: e,
          childCount: 0,
          bindings: r,
          bindingFlags: 8,
          outputs: [],
          element: null,
          provider: null,
          text: { prefix: n[0] },
          query: null,
          ngContent: null,
        };
      }
      function Yi(t, e, n) {
        var r,
          o = t.renderer;
        r = o.createText(n.text.prefix);
        var i = cr(t, e, n);
        return i && o.appendChild(i, r), { renderText: r };
      }
      function ta(t, e) {
        return (null != t ? t.toString() : "") + e.suffix;
      }
      function ea(t, e, n, r) {
        for (
          var o = 0,
            i = 0,
            a = 0,
            s = 0,
            u = 0,
            l = null,
            c = null,
            h = !1,
            p = !1,
            f = null,
            d = 0;
          d < e.length;
          d++
        ) {
          var m = e[d];
          if (
            ((m.nodeIndex = d),
            (m.parent = l),
            (m.bindingIndex = o),
            (m.outputIndex = i),
            (m.renderParent = c),
            (a |= m.flags),
            (u |= m.matchedQueryIds),
            m.element)
          ) {
            var y = m.element;
            (y.publicProviders = l
              ? l.element.publicProviders
              : Object.create(null)),
              (y.allProviders = y.publicProviders),
              (h = !1),
              (p = !1),
              m.element.template &&
                (u |= m.element.template.nodeMatchedQueries);
          }
          if (
            (ra(l, m, e.length),
            (o += m.bindings.length),
            (i += m.outputs.length),
            !c && 3 & m.flags && (f = m),
            20224 & m.flags)
          ) {
            h ||
              ((h = !0),
              (l.element.publicProviders = Object.create(
                l.element.publicProviders
              )),
              (l.element.allProviders = l.element.publicProviders));
            var g = 0 != (32768 & m.flags);
            0 == (8192 & m.flags) || g
              ? (l.element.publicProviders[Gn(m.provider.token)] = m)
              : (p ||
                  ((p = !0),
                  (l.element.allProviders = Object.create(
                    l.element.publicProviders
                  ))),
                (l.element.allProviders[Gn(m.provider.token)] = m)),
              g && (l.element.componentProvider = m);
          }
          if (
            (l
              ? ((l.childFlags |= m.flags),
                (l.directChildFlags |= m.flags),
                (l.childMatchedQueries |= m.matchedQueryIds),
                m.element &&
                  m.element.template &&
                  (l.childMatchedQueries |=
                    m.element.template.nodeMatchedQueries))
              : (s |= m.flags),
            m.childCount > 0)
          )
            (l = m), na(m) || (c = m);
          else
            for (; l && d === l.nodeIndex + l.childCount; ) {
              var v = l.parent;
              v &&
                ((v.childFlags |= l.childFlags),
                (v.childMatchedQueries |= l.childMatchedQueries)),
                (c = (l = v) && na(l) ? l.renderParent : l);
            }
        }
        return {
          factory: null,
          nodeFlags: a,
          rootNodeFlags: s,
          nodeMatchedQueries: u,
          flags: t,
          nodes: e,
          updateDirectives: n || Bn,
          updateRenderer: r || Bn,
          handleEvent: function (t, n, r, o) {
            return e[n].element.handleEvent(t, r, o);
          },
          bindingCount: o,
          outputCount: i,
          lastRenderRootNode: f,
        };
      }
      function na(t) {
        return 0 != (1 & t.flags) && null === t.element.name;
      }
      function ra(t, e, n) {
        var r = e.element && e.element.template;
        if (r) {
          if (!r.lastRenderRootNode)
            throw new Error(
              "Illegal State: Embedded templates without nodes are not allowed!"
            );
          if (r.lastRenderRootNode && 16777216 & r.lastRenderRootNode.flags)
            throw new Error(
              "Illegal State: Last root node of a template can't have embedded views, at index " +
                e.nodeIndex +
                "!"
            );
        }
        if (20224 & e.flags && 0 == (1 & (t ? t.flags : 0)))
          throw new Error(
            "Illegal State: StaticProvider/Directive nodes need to be children of elements or anchors, at index " +
              e.nodeIndex +
              "!"
          );
        if (e.query) {
          if (67108864 & e.flags && (!t || 0 == (16384 & t.flags)))
            throw new Error(
              "Illegal State: Content Query nodes need to be children of directives, at index " +
                e.nodeIndex +
                "!"
            );
          if (134217728 & e.flags && t)
            throw new Error(
              "Illegal State: View Query nodes have to be top level nodes, at index " +
                e.nodeIndex +
                "!"
            );
        }
        if (e.childCount) {
          var o = t ? t.nodeIndex + t.childCount : n - 1;
          if (e.nodeIndex <= o && e.nodeIndex + e.childCount > o)
            throw new Error(
              "Illegal State: childCount of node leads outside of parent, at index " +
                e.nodeIndex +
                "!"
            );
        }
      }
      function oa(t, e, n, r) {
        var o = sa(t.root, t.renderer, t, e, n);
        return ua(o, t.component, r), la(o), o;
      }
      function ia(t, e, n) {
        var r = sa(t, t.renderer, null, null, e);
        return ua(r, n, n), la(r), r;
      }
      function aa(t, e, n, r) {
        var o,
          i = e.element.componentRendererType;
        return (
          (o = i
            ? t.root.rendererFactory.createRenderer(r, i)
            : t.root.renderer),
          sa(t.root, o, t, e.element.componentProvider, n)
        );
      }
      function sa(t, e, n, r, o) {
        var i = new Array(o.nodes.length),
          a = o.outputCount ? new Array(o.outputCount) : null;
        return {
          def: o,
          parent: n,
          viewContainerParent: null,
          parentNodeDef: r,
          context: null,
          component: null,
          nodes: i,
          state: 13,
          root: t,
          renderer: e,
          oldValues: new Array(o.bindingCount),
          disposables: a,
          initIndex: -1,
        };
      }
      function ua(t, e, n) {
        (t.component = e), (t.context = n);
      }
      function la(t) {
        var e;
        ir(t) &&
          (e = Fn(t.parent, t.parentNodeDef.parent.nodeIndex).renderElement);
        for (var n = t.def, r = t.nodes, o = 0; o < n.nodes.length; o++) {
          var i = n.nodes[o];
          zn.setCurrentNode(t, o);
          var a = void 0;
          switch (201347067 & i.flags) {
            case 1:
              var s = Ui(t, e, i),
                u = void 0;
              if (33554432 & i.flags) {
                var l = pr(i.element.componentView);
                u = zn.createComponentView(t, i, l, s);
              }
              Hi(t, u, i, s),
                (a = {
                  renderElement: s,
                  componentView: u,
                  viewContainer: null,
                  template: i.element.template ? Lr(t, i) : void 0,
                }),
                16777216 & i.flags && (a.viewContainer = jr(t, i, a));
              break;
            case 2:
              a = Yi(t, e, i);
              break;
            case 512:
            case 1024:
            case 2048:
            case 256:
              (a = r[o]) || 4096 & i.flags || (a = { instance: io(t, i) });
              break;
            case 16:
              a = { instance: ao(t, i) };
              break;
            case 16384:
              (a = r[o]) || (a = { instance: so(t, i) }),
                32768 & i.flags &&
                  ua(
                    Fn(t, i.parent.nodeIndex).componentView,
                    a.instance,
                    a.instance
                  );
              break;
            case 32:
            case 64:
            case 128:
              a = { value: void 0 };
              break;
            case 67108864:
            case 134217728:
              a = new Oo();
              break;
            case 8:
              Zi(t, e, i), (a = void 0);
          }
          r[o] = a;
        }
        va(t, ga.CreateViewNodes), Ca(t, 201326592, 268435456, 0);
      }
      function ca(t) {
        fa(t),
          zn.updateDirectives(t, 1),
          ba(t, ga.CheckNoChanges),
          zn.updateRenderer(t, 1),
          va(t, ga.CheckNoChanges),
          (t.state &= -97);
      }
      function ha(t) {
        1 & t.state ? ((t.state &= -2), (t.state |= 2)) : (t.state &= -3),
          jn(t, 0, 256),
          fa(t),
          zn.updateDirectives(t, 0),
          ba(t, ga.CheckAndUpdate),
          Ca(t, 67108864, 536870912, 0);
        var e = jn(t, 256, 512);
        yo(t, 2097152 | (e ? 1048576 : 0)),
          zn.updateRenderer(t, 0),
          va(t, ga.CheckAndUpdate),
          Ca(t, 134217728, 536870912, 0),
          yo(t, 8388608 | ((e = jn(t, 512, 768)) ? 4194304 : 0)),
          2 & t.def.flags && (t.state &= -9),
          (t.state &= -97),
          jn(t, 768, 1024);
      }
      function pa(t, e, n, o, i, a, s, u, l, c, h, p, f) {
        return 0 === n
          ? (function (t, e, n, r, o, i, a, s, u, l, c, h) {
              switch (201347067 & e.flags) {
                case 1:
                  return (function (t, e, n, r, o, i, a, s, u, l, c, h) {
                    var p = e.bindings.length,
                      f = !1;
                    return (
                      p > 0 && Bi(t, e, 0, n) && (f = !0),
                      p > 1 && Bi(t, e, 1, r) && (f = !0),
                      p > 2 && Bi(t, e, 2, o) && (f = !0),
                      p > 3 && Bi(t, e, 3, i) && (f = !0),
                      p > 4 && Bi(t, e, 4, a) && (f = !0),
                      p > 5 && Bi(t, e, 5, s) && (f = !0),
                      p > 6 && Bi(t, e, 6, u) && (f = !0),
                      p > 7 && Bi(t, e, 7, l) && (f = !0),
                      p > 8 && Bi(t, e, 8, c) && (f = !0),
                      p > 9 && Bi(t, e, 9, h) && (f = !0),
                      f
                    );
                  })(t, e, n, r, o, i, a, s, u, l, c, h);
                case 2:
                  return (function (t, e, n, r, o, i, a, s, u, l, c, h) {
                    var p = !1,
                      f = e.bindings,
                      d = f.length;
                    if (
                      (d > 0 && Xn(t, e, 0, n) && (p = !0),
                      d > 1 && Xn(t, e, 1, r) && (p = !0),
                      d > 2 && Xn(t, e, 2, o) && (p = !0),
                      d > 3 && Xn(t, e, 3, i) && (p = !0),
                      d > 4 && Xn(t, e, 4, a) && (p = !0),
                      d > 5 && Xn(t, e, 5, s) && (p = !0),
                      d > 6 && Xn(t, e, 6, u) && (p = !0),
                      d > 7 && Xn(t, e, 7, l) && (p = !0),
                      d > 8 && Xn(t, e, 8, c) && (p = !0),
                      d > 9 && Xn(t, e, 9, h) && (p = !0),
                      p)
                    ) {
                      var m = e.text.prefix;
                      d > 0 && (m += ta(n, f[0])),
                        d > 1 && (m += ta(r, f[1])),
                        d > 2 && (m += ta(o, f[2])),
                        d > 3 && (m += ta(i, f[3])),
                        d > 4 && (m += ta(a, f[4])),
                        d > 5 && (m += ta(s, f[5])),
                        d > 6 && (m += ta(u, f[6])),
                        d > 7 && (m += ta(l, f[7])),
                        d > 8 && (m += ta(c, f[8])),
                        d > 9 && (m += ta(h, f[9]));
                      var y = Vn(t, e.nodeIndex).renderText;
                      t.renderer.setValue(y, m);
                    }
                    return p;
                  })(t, e, n, r, o, i, a, s, u, l, c, h);
                case 16384:
                  return (function (t, e, n, r, o, i, a, s, u, l, c, h) {
                    var p = Ln(t, e.nodeIndex),
                      f = p.instance,
                      d = !1,
                      m = void 0,
                      y = e.bindings.length;
                    return (
                      y > 0 &&
                        $n(t, e, 0, n) &&
                        ((d = !0), (m = mo(t, p, e, 0, n, m))),
                      y > 1 &&
                        $n(t, e, 1, r) &&
                        ((d = !0), (m = mo(t, p, e, 1, r, m))),
                      y > 2 &&
                        $n(t, e, 2, o) &&
                        ((d = !0), (m = mo(t, p, e, 2, o, m))),
                      y > 3 &&
                        $n(t, e, 3, i) &&
                        ((d = !0), (m = mo(t, p, e, 3, i, m))),
                      y > 4 &&
                        $n(t, e, 4, a) &&
                        ((d = !0), (m = mo(t, p, e, 4, a, m))),
                      y > 5 &&
                        $n(t, e, 5, s) &&
                        ((d = !0), (m = mo(t, p, e, 5, s, m))),
                      y > 6 &&
                        $n(t, e, 6, u) &&
                        ((d = !0), (m = mo(t, p, e, 6, u, m))),
                      y > 7 &&
                        $n(t, e, 7, l) &&
                        ((d = !0), (m = mo(t, p, e, 7, l, m))),
                      y > 8 &&
                        $n(t, e, 8, c) &&
                        ((d = !0), (m = mo(t, p, e, 8, c, m))),
                      y > 9 &&
                        $n(t, e, 9, h) &&
                        ((d = !0), (m = mo(t, p, e, 9, h, m))),
                      m && f.ngOnChanges(m),
                      65536 & e.flags &&
                        Mn(t, 256, e.nodeIndex) &&
                        f.ngOnInit(),
                      262144 & e.flags && f.ngDoCheck(),
                      d
                    );
                  })(t, e, n, r, o, i, a, s, u, l, c, h);
                case 32:
                case 64:
                case 128:
                  return (function (t, e, n, r, o, i, a, s, u, l, c, h) {
                    var p = e.bindings,
                      f = !1,
                      d = p.length;
                    if (
                      (d > 0 && Xn(t, e, 0, n) && (f = !0),
                      d > 1 && Xn(t, e, 1, r) && (f = !0),
                      d > 2 && Xn(t, e, 2, o) && (f = !0),
                      d > 3 && Xn(t, e, 3, i) && (f = !0),
                      d > 4 && Xn(t, e, 4, a) && (f = !0),
                      d > 5 && Xn(t, e, 5, s) && (f = !0),
                      d > 6 && Xn(t, e, 6, u) && (f = !0),
                      d > 7 && Xn(t, e, 7, l) && (f = !0),
                      d > 8 && Xn(t, e, 8, c) && (f = !0),
                      d > 9 && Xn(t, e, 9, h) && (f = !0),
                      f)
                    ) {
                      var m = Un(t, e.nodeIndex),
                        y = void 0;
                      switch (201347067 & e.flags) {
                        case 32:
                          (y = new Array(p.length)),
                            d > 0 && (y[0] = n),
                            d > 1 && (y[1] = r),
                            d > 2 && (y[2] = o),
                            d > 3 && (y[3] = i),
                            d > 4 && (y[4] = a),
                            d > 5 && (y[5] = s),
                            d > 6 && (y[6] = u),
                            d > 7 && (y[7] = l),
                            d > 8 && (y[8] = c),
                            d > 9 && (y[9] = h);
                          break;
                        case 64:
                          (y = {}),
                            d > 0 && (y[p[0].name] = n),
                            d > 1 && (y[p[1].name] = r),
                            d > 2 && (y[p[2].name] = o),
                            d > 3 && (y[p[3].name] = i),
                            d > 4 && (y[p[4].name] = a),
                            d > 5 && (y[p[5].name] = s),
                            d > 6 && (y[p[6].name] = u),
                            d > 7 && (y[p[7].name] = l),
                            d > 8 && (y[p[8].name] = c),
                            d > 9 && (y[p[9].name] = h);
                          break;
                        case 128:
                          var g = n;
                          switch (d) {
                            case 1:
                              y = g.transform(n);
                              break;
                            case 2:
                              y = g.transform(r);
                              break;
                            case 3:
                              y = g.transform(r, o);
                              break;
                            case 4:
                              y = g.transform(r, o, i);
                              break;
                            case 5:
                              y = g.transform(r, o, i, a);
                              break;
                            case 6:
                              y = g.transform(r, o, i, a, s);
                              break;
                            case 7:
                              y = g.transform(r, o, i, a, s, u);
                              break;
                            case 8:
                              y = g.transform(r, o, i, a, s, u, l);
                              break;
                            case 9:
                              y = g.transform(r, o, i, a, s, u, l, c);
                              break;
                            case 10:
                              y = g.transform(r, o, i, a, s, u, l, c, h);
                          }
                      }
                      m.value = y;
                    }
                    return f;
                  })(t, e, n, r, o, i, a, s, u, l, c, h);
                default:
                  throw "unreachable";
              }
            })(t, e, o, i, a, s, u, l, c, h, p, f)
          : (function (t, e, n) {
              switch (201347067 & e.flags) {
                case 1:
                  return (function (t, e, n) {
                    for (var r = !1, o = 0; o < n.length; o++)
                      Bi(t, e, o, n[o]) && (r = !0);
                    return r;
                  })(t, e, n);
                case 2:
                  return (function (t, e, n) {
                    for (var r = e.bindings, o = !1, i = 0; i < n.length; i++)
                      Xn(t, e, i, n[i]) && (o = !0);
                    if (o) {
                      var a = "";
                      for (i = 0; i < n.length; i++) a += ta(n[i], r[i]);
                      a = e.text.prefix + a;
                      var s = Vn(t, e.nodeIndex).renderText;
                      t.renderer.setValue(s, a);
                    }
                    return o;
                  })(t, e, n);
                case 16384:
                  return (function (t, e, n) {
                    for (
                      var r = Ln(t, e.nodeIndex),
                        o = r.instance,
                        i = !1,
                        a = void 0,
                        s = 0;
                      s < n.length;
                      s++
                    )
                      $n(t, e, s, n[s]) &&
                        ((i = !0), (a = mo(t, r, e, s, n[s], a)));
                    return (
                      a && o.ngOnChanges(a),
                      65536 & e.flags &&
                        Mn(t, 256, e.nodeIndex) &&
                        o.ngOnInit(),
                      262144 & e.flags && o.ngDoCheck(),
                      i
                    );
                  })(t, e, n);
                case 32:
                case 64:
                case 128:
                  return (function (t, e, n) {
                    for (var o = e.bindings, i = !1, a = 0; a < n.length; a++)
                      Xn(t, e, a, n[a]) && (i = !0);
                    if (i) {
                      var s = Un(t, e.nodeIndex),
                        u = void 0;
                      switch (201347067 & e.flags) {
                        case 32:
                          u = n;
                          break;
                        case 64:
                          for (u = {}, a = 0; a < n.length; a++)
                            u[o[a].name] = n[a];
                          break;
                        case 128:
                          var l = n[0],
                            c = n.slice(1);
                          u = l.transform.apply(l, Object(r.d)(c));
                      }
                      s.value = u;
                    }
                    return i;
                  })(t, e, n);
                default:
                  throw "unreachable";
              }
            })(t, e, o);
      }
      function fa(t) {
        var e = t.def;
        if (4 & e.nodeFlags)
          for (var n = 0; n < e.nodes.length; n++) {
            var r = e.nodes[n];
            if (4 & r.flags) {
              var o = Fn(t, n).template._projectedViews;
              if (o)
                for (var i = 0; i < o.length; i++) {
                  var a = o[i];
                  (a.state |= 32), tr(a, t);
                }
            } else 0 == (4 & r.childFlags) && (n += r.childCount);
          }
      }
      function da(t, e, n, r, o, i, a, s, u, l, c, h, p) {
        return (
          0 === n
            ? (function (t, e, n, r, o, i, a, s, u, l, c, h) {
                var p = e.bindings.length;
                p > 0 && Jn(t, e, 0, n),
                  p > 1 && Jn(t, e, 1, r),
                  p > 2 && Jn(t, e, 2, o),
                  p > 3 && Jn(t, e, 3, i),
                  p > 4 && Jn(t, e, 4, a),
                  p > 5 && Jn(t, e, 5, s),
                  p > 6 && Jn(t, e, 6, u),
                  p > 7 && Jn(t, e, 7, l),
                  p > 8 && Jn(t, e, 8, c),
                  p > 9 && Jn(t, e, 9, h);
              })(t, e, r, o, i, a, s, u, l, c, h, p)
            : (function (t, e, n) {
                for (var r = 0; r < n.length; r++) Jn(t, e, r, n[r]);
              })(t, e, r),
          !1
        );
      }
      function ma(t, e) {
        if (Hn(t, e.nodeIndex).dirty)
          throw Nn(
            zn.createDebugContext(t, e.nodeIndex),
            "Query " + e.query.id + " not dirty",
            "Query " + e.query.id + " dirty",
            0 != (1 & t.state)
          );
      }
      function ya(t) {
        if (!(128 & t.state)) {
          if (
            (ba(t, ga.Destroy), va(t, ga.Destroy), yo(t, 131072), t.disposables)
          )
            for (var e = 0; e < t.disposables.length; e++) t.disposables[e]();
          !(function (t) {
            if (16 & t.state) {
              var e = nr(t);
              if (e) {
                var n = e.template._projectedViews;
                n && (Lt(n, n.indexOf(t)), zn.dirtyParentQueries(t));
              }
            }
          })(t),
            t.renderer.destroyNode &&
              (function (t) {
                for (var e = t.def.nodes.length, n = 0; n < e; n++) {
                  var r = t.def.nodes[n];
                  1 & r.flags
                    ? t.renderer.destroyNode(Fn(t, n).renderElement)
                    : 2 & r.flags
                    ? t.renderer.destroyNode(Vn(t, n).renderText)
                    : (67108864 & r.flags || 134217728 & r.flags) &&
                      Hn(t, n).destroy();
                }
              })(t),
            ir(t) && t.renderer.destroy(),
            (t.state |= 128);
        }
      }
      var ga = (function (t) {
        return (
          (t[(t.CreateViewNodes = 0)] = "CreateViewNodes"),
          (t[(t.CheckNoChanges = 1)] = "CheckNoChanges"),
          (t[(t.CheckNoChangesProjectedViews = 2)] =
            "CheckNoChangesProjectedViews"),
          (t[(t.CheckAndUpdate = 3)] = "CheckAndUpdate"),
          (t[(t.CheckAndUpdateProjectedViews = 4)] =
            "CheckAndUpdateProjectedViews"),
          (t[(t.Destroy = 5)] = "Destroy"),
          t
        );
      })({});
      function va(t, e) {
        var n = t.def;
        if (33554432 & n.nodeFlags)
          for (var r = 0; r < n.nodes.length; r++) {
            var o = n.nodes[r];
            33554432 & o.flags
              ? _a(Fn(t, r).componentView, e)
              : 0 == (33554432 & o.childFlags) && (r += o.childCount);
          }
      }
      function ba(t, e) {
        var n = t.def;
        if (16777216 & n.nodeFlags)
          for (var r = 0; r < n.nodes.length; r++) {
            var o = n.nodes[r];
            if (16777216 & o.flags)
              for (
                var i = Fn(t, r).viewContainer._embeddedViews, a = 0;
                a < i.length;
                a++
              )
                _a(i[a], e);
            else 0 == (16777216 & o.childFlags) && (r += o.childCount);
          }
      }
      function _a(t, e) {
        var n = t.state;
        switch (e) {
          case ga.CheckNoChanges:
            0 == (128 & n) &&
              (12 == (12 & n)
                ? ca(t)
                : 64 & n && wa(t, ga.CheckNoChangesProjectedViews));
            break;
          case ga.CheckNoChangesProjectedViews:
            0 == (128 & n) && (32 & n ? ca(t) : 64 & n && wa(t, e));
            break;
          case ga.CheckAndUpdate:
            0 == (128 & n) &&
              (12 == (12 & n)
                ? ha(t)
                : 64 & n && wa(t, ga.CheckAndUpdateProjectedViews));
            break;
          case ga.CheckAndUpdateProjectedViews:
            0 == (128 & n) && (32 & n ? ha(t) : 64 & n && wa(t, e));
            break;
          case ga.Destroy:
            ya(t);
            break;
          case ga.CreateViewNodes:
            la(t);
        }
      }
      function wa(t, e) {
        ba(t, e), va(t, e);
      }
      function Ca(t, e, n, r) {
        if (t.def.nodeFlags & e && t.def.nodeFlags & n)
          for (var o = t.def.nodes.length, i = 0; i < o; i++) {
            var a = t.def.nodes[i];
            if (a.flags & e && a.flags & n)
              switch ((zn.setCurrentNode(t, a.nodeIndex), r)) {
                case 0:
                  Wi(t, a);
                  break;
                case 1:
                  ma(t, a);
              }
            (a.childFlags & e && a.childFlags & n) || (i += a.childCount);
          }
      }
      var Ea = !1;
      function Sa(t, e, n, r, o, i) {
        var a = o.injector.get(sn);
        return ia(Ta(t, o, a, e, n), r, i);
      }
      function ka(t, e, n, r, o, i) {
        var a = o.injector.get(sn),
          s = Ta(t, o, new is(a), e, n),
          u = Ma(r);
        return rs(Ga.create, ia, null, [s, u, i]);
      }
      function Ta(t, e, n, r, o) {
        var i = e.injector.get(_e),
          a = e.injector.get(Kt),
          s = n.createRenderer(null, null);
        return {
          ngModule: e,
          injector: t,
          projectableNodes: r,
          selectorOrNode: o,
          sanitizer: i,
          rendererFactory: n,
          renderer: s,
          errorHandler: a,
        };
      }
      function xa(t, e, n, r) {
        var o = Ma(n);
        return rs(Ga.create, oa, null, [t, e, o, r]);
      }
      function Oa(t, e, n, r) {
        return (
          (n = Na.get(e.element.componentProvider.provider.token) || Ma(n)),
          rs(Ga.create, aa, null, [t, e, n, r])
        );
      }
      function Pa(t, e, n, r) {
        return Wr(
          t,
          e,
          n,
          (function (t) {
            var e = (function (t) {
                var e = !1,
                  n = !1;
                return 0 === Aa.size
                  ? { hasOverrides: e, hasDeprecatedOverrides: n }
                  : (t.providers.forEach(function (t) {
                      var r = Aa.get(t.token);
                      3840 & t.flags &&
                        r &&
                        ((e = !0), (n = n || r.deprecatedBehavior));
                    }),
                    t.modules.forEach(function (t) {
                      Ia.forEach(function (r, o) {
                        ht(o).providedIn === t &&
                          ((e = !0), (n = n || r.deprecatedBehavior));
                      });
                    }),
                    { hasOverrides: e, hasDeprecatedOverrides: n });
              })(t),
              n = e.hasDeprecatedOverrides;
            return e.hasOverrides
              ? ((function (t) {
                  for (var e = 0; e < t.providers.length; e++) {
                    var r = t.providers[e];
                    n && (r.flags |= 4096);
                    var o = Aa.get(r.token);
                    o &&
                      ((r.flags = (-3841 & r.flags) | o.flags),
                      (r.deps = lr(o.deps)),
                      (r.value = o.value));
                  }
                  if (Ia.size > 0) {
                    var i = new Set(t.modules);
                    Ia.forEach(function (e, r) {
                      if (i.has(ht(r).providedIn)) {
                        var o = {
                          token: r,
                          flags: e.flags | (n ? 4096 : 0),
                          deps: lr(e.deps),
                          value: e.value,
                          index: t.providers.length,
                        };
                        t.providers.push(o), (t.providersByKey[Gn(r)] = o);
                      }
                    });
                  }
                })(
                  (t = t.factory(function () {
                    return Bn;
                  }))
                ),
                t)
              : t;
          })(r)
        );
      }
      var Aa = new Map(),
        Ia = new Map(),
        Na = new Map();
      function Ra(t) {
        var e;
        Aa.set(t.token, t),
          "function" == typeof t.token &&
            (e = ht(t.token)) &&
            "function" == typeof e.providedIn &&
            Ia.set(t.token, t);
      }
      function Da(t, e) {
        var n = pr(e.viewDefFactory),
          r = pr(n.nodes[0].element.componentView);
        Na.set(t, r);
      }
      function ja() {
        Aa.clear(), Ia.clear(), Na.clear();
      }
      function Ma(t) {
        if (0 === Aa.size) return t;
        var e = (function (t) {
          for (var e = [], n = null, r = 0; r < t.nodes.length; r++) {
            var o = t.nodes[r];
            1 & o.flags && (n = o),
              n &&
                3840 & o.flags &&
                Aa.has(o.provider.token) &&
                (e.push(n.nodeIndex), (n = null));
          }
          return e;
        })(t);
        if (0 === e.length) return t;
        t = t.factory(function () {
          return Bn;
        });
        for (var n = 0; n < e.length; n++) r(t, e[n]);
        return t;
        function r(t, e) {
          for (var n = e + 1; n < t.nodes.length; n++) {
            var r = t.nodes[n];
            if (1 & r.flags) return;
            if (3840 & r.flags) {
              var o = r.provider,
                i = Aa.get(o.token);
              i &&
                ((r.flags = (-3841 & r.flags) | i.flags),
                (o.deps = lr(i.deps)),
                (o.value = i.value));
            }
          }
        }
      }
      function Va(t, e, n, r, o, i, a, s, u, l, c, h, p) {
        var f = t.def.nodes[e];
        return (
          pa(t, f, n, r, o, i, a, s, u, l, c, h, p),
          224 & f.flags ? Un(t, e).value : void 0
        );
      }
      function Fa(t, e, n, r, o, i, a, s, u, l, c, h, p) {
        var f = t.def.nodes[e];
        return (
          da(t, f, n, r, o, i, a, s, u, l, c, h, p),
          224 & f.flags ? Un(t, e).value : void 0
        );
      }
      function La(t) {
        return rs(Ga.detectChanges, ha, null, [t]);
      }
      function Ua(t) {
        return rs(Ga.checkNoChanges, ca, null, [t]);
      }
      function Ha(t) {
        return rs(Ga.destroy, ya, null, [t]);
      }
      var za,
        Ba,
        qa,
        Ga = (function (t) {
          return (
            (t[(t.create = 0)] = "create"),
            (t[(t.detectChanges = 1)] = "detectChanges"),
            (t[(t.checkNoChanges = 2)] = "checkNoChanges"),
            (t[(t.destroy = 3)] = "destroy"),
            (t[(t.handleEvent = 4)] = "handleEvent"),
            t
          );
        })({});
      function Wa(t, e) {
        (Ba = t), (qa = e);
      }
      function Qa(t, e, n, r) {
        return (
          Wa(t, e), rs(Ga.handleEvent, t.def.handleEvent, null, [t, e, n, r])
        );
      }
      function Ka(t, e) {
        if (128 & t.state) throw Dn(Ga[za]);
        return (
          Wa(t, Ja(t, 0)),
          t.def.updateDirectives(function (t, n, r) {
            for (var o = [], i = 3; i < arguments.length; i++)
              o[i - 3] = arguments[i];
            var a = t.def.nodes[n];
            return (
              0 === e ? $a(t, a, r, o) : Xa(t, a, r, o),
              16384 & a.flags && Wa(t, Ja(t, n)),
              224 & a.flags ? Un(t, a.nodeIndex).value : void 0
            );
          }, t)
        );
      }
      function Za(t, e) {
        if (128 & t.state) throw Dn(Ga[za]);
        return (
          Wa(t, Ya(t, 0)),
          t.def.updateRenderer(function (t, n, r) {
            for (var o = [], i = 3; i < arguments.length; i++)
              o[i - 3] = arguments[i];
            var a = t.def.nodes[n];
            return (
              0 === e ? $a(t, a, r, o) : Xa(t, a, r, o),
              3 & a.flags && Wa(t, Ya(t, n)),
              224 & a.flags ? Un(t, a.nodeIndex).value : void 0
            );
          }, t)
        );
      }
      function $a(t, e, n, o) {
        if (pa.apply(void 0, Object(r.d)([t, e, n], o))) {
          var i = 1 === n ? o[0] : o;
          if (16384 & e.flags) {
            for (var a = {}, s = 0; s < e.bindings.length; s++) {
              var u = e.bindings[s],
                l = i[s];
              8 & u.flags &&
                (a[
                  ((f = u.nonMinifiedName),
                  "ng-reflect-" +
                    f.replace(/[$@]/g, "_").replace(Ee, function () {
                      for (var t = [], e = 0; e < arguments.length; e++)
                        t[e] = arguments[e];
                      return "-" + t[1].toLowerCase();
                    }))
                ] = Se(l));
            }
            var c = e.parent,
              h = Fn(t, c.nodeIndex).renderElement;
            if (c.element.name)
              for (var p in a)
                null != (l = a[p])
                  ? t.renderer.setAttribute(h, p, l)
                  : t.renderer.removeAttribute(h, p);
            else
              t.renderer.setValue(h, "bindings=" + JSON.stringify(a, null, 2));
          }
        }
        var f;
      }
      function Xa(t, e, n, o) {
        da.apply(void 0, Object(r.d)([t, e, n], o));
      }
      function Ja(t, e) {
        for (var n = e; n < t.def.nodes.length; n++) {
          var r = t.def.nodes[n];
          if (16384 & r.flags && r.bindings && r.bindings.length) return n;
        }
        return null;
      }
      function Ya(t, e) {
        for (var n = e; n < t.def.nodes.length; n++) {
          var r = t.def.nodes[n];
          if (3 & r.flags && r.bindings && r.bindings.length) return n;
        }
        return null;
      }
      var ts = (function () {
        function t(t, e) {
          (this.view = t),
            (this.nodeIndex = e),
            null == e && (this.nodeIndex = e = 0),
            (this.nodeDef = t.def.nodes[e]);
          for (var n = this.nodeDef, r = t; n && 0 == (1 & n.flags); )
            n = n.parent;
          if (!n) for (; !n && r; ) (n = rr(r)), (r = r.parent);
          (this.elDef = n), (this.elView = r);
        }
        return (
          Object.defineProperty(t.prototype, "elOrCompView", {
            get: function () {
              return (
                Fn(this.elView, this.elDef.nodeIndex).componentView || this.view
              );
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "injector", {
            get: function () {
              return Hr(this.elView, this.elDef);
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "component", {
            get: function () {
              return this.elOrCompView.component;
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "context", {
            get: function () {
              return this.elOrCompView.context;
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "providerTokens", {
            get: function () {
              var t = [];
              if (this.elDef)
                for (
                  var e = this.elDef.nodeIndex + 1;
                  e <= this.elDef.nodeIndex + this.elDef.childCount;
                  e++
                ) {
                  var n = this.elView.def.nodes[e];
                  20224 & n.flags && t.push(n.provider.token),
                    (e += n.childCount);
                }
              return t;
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "references", {
            get: function () {
              var t = {};
              if (this.elDef) {
                ns(this.elView, this.elDef, t);
                for (
                  var e = this.elDef.nodeIndex + 1;
                  e <= this.elDef.nodeIndex + this.elDef.childCount;
                  e++
                ) {
                  var n = this.elView.def.nodes[e];
                  20224 & n.flags && ns(this.elView, n, t), (e += n.childCount);
                }
              }
              return t;
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "componentRenderElement", {
            get: function () {
              var t = (function (t) {
                for (; t && !ir(t); ) t = t.parent;
                return t.parent ? Fn(t.parent, rr(t).nodeIndex) : null;
              })(this.elOrCompView);
              return t ? t.renderElement : void 0;
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "renderNode", {
            get: function () {
              return 2 & this.nodeDef.flags
                ? or(this.view, this.nodeDef)
                : or(this.elView, this.elDef);
            },
            enumerable: !0,
            configurable: !0,
          }),
          (t.prototype.logError = function (t) {
            for (var e, n, o = [], i = 1; i < arguments.length; i++)
              o[i - 1] = arguments[i];
            2 & this.nodeDef.flags
              ? ((e = this.view.def), (n = this.nodeDef.nodeIndex))
              : ((e = this.elView.def), (n = this.elDef.nodeIndex));
            var a = es(e, n),
              s = -1,
              u = function () {
                var e;
                return ++s === a
                  ? (e = t.error).bind.apply(e, Object(r.d)([t], o))
                  : Bn;
              };
            e.factory(u),
              s < a &&
                (t.error(
                  "Illegal state: the ViewDefinitionFactory did not call the logger!"
                ),
                t.error.apply(t, Object(r.d)(o)));
          }),
          t
        );
      })();
      function es(t, e) {
        for (var n = -1, r = 0; r <= e; r++) 3 & t.nodes[r].flags && n++;
        return n;
      }
      function ns(t, e, n) {
        for (var r in e.references) n[r] = Ki(t, e, e.references[r]);
      }
      function rs(t, e, n, r) {
        var o,
          i,
          a = za,
          s = Ba,
          u = qa;
        try {
          za = t;
          var l = e.apply(n, r);
          return (Ba = s), (qa = u), (za = a), l;
        } catch (c) {
          if (Gt(c) || !Ba) throw c;
          throw (
            ((o = c),
            (i = os()),
            o instanceof Error || (o = new Error(o.toString())),
            Rn(o, i),
            o)
          );
        }
      }
      function os() {
        return Ba ? new ts(Ba, qa) : null;
      }
      var is = (function () {
          function t(t) {
            this.delegate = t;
          }
          return (
            (t.prototype.createRenderer = function (t, e) {
              return new as(this.delegate.createRenderer(t, e));
            }),
            (t.prototype.begin = function () {
              this.delegate.begin && this.delegate.begin();
            }),
            (t.prototype.end = function () {
              this.delegate.end && this.delegate.end();
            }),
            (t.prototype.whenRenderingDone = function () {
              return this.delegate.whenRenderingDone
                ? this.delegate.whenRenderingDone()
                : Promise.resolve(null);
            }),
            t
          );
        })(),
        as = (function () {
          function t(t) {
            (this.delegate = t),
              (this.debugContextFactory = os),
              (this.data = this.delegate.data);
          }
          return (
            (t.prototype.createDebugContext = function (t) {
              return this.debugContextFactory(t);
            }),
            (t.prototype.destroyNode = function (t) {
              var e = Ai(t);
              !(function (t) {
                Pi.delete(t.nativeNode);
              })(e),
                e instanceof xi && (e.listeners.length = 0),
                this.delegate.destroyNode && this.delegate.destroyNode(t);
            }),
            (t.prototype.destroy = function () {
              this.delegate.destroy();
            }),
            (t.prototype.createElement = function (t, e) {
              var n = this.delegate.createElement(t, e),
                r = this.createDebugContext(n);
              if (r) {
                var o = new Oi(n, null, r);
                (o.name = t), Ii(o);
              }
              return n;
            }),
            (t.prototype.createComment = function (t) {
              var e = this.delegate.createComment(t),
                n = this.createDebugContext(e);
              return n && Ii(new xi(e, null, n)), e;
            }),
            (t.prototype.createText = function (t) {
              var e = this.delegate.createText(t),
                n = this.createDebugContext(e);
              return n && Ii(new xi(e, null, n)), e;
            }),
            (t.prototype.appendChild = function (t, e) {
              var n = Ai(t),
                r = Ai(e);
              n && r && n instanceof Oi && n.addChild(r),
                this.delegate.appendChild(t, e);
            }),
            (t.prototype.insertBefore = function (t, e, n) {
              var r = Ai(t),
                o = Ai(e),
                i = Ai(n);
              r && o && r instanceof Oi && r.insertBefore(i, o),
                this.delegate.insertBefore(t, e, n);
            }),
            (t.prototype.removeChild = function (t, e) {
              var n = Ai(t),
                r = Ai(e);
              n && r && n instanceof Oi && n.removeChild(r),
                this.delegate.removeChild(t, e);
            }),
            (t.prototype.selectRootElement = function (t, e) {
              var n = this.delegate.selectRootElement(t, e),
                r = os();
              return r && Ii(new Oi(n, null, r)), n;
            }),
            (t.prototype.setAttribute = function (t, e, n, r) {
              var o = Ai(t);
              o && o instanceof Oi && (o.attributes[r ? r + ":" + e : e] = n),
                this.delegate.setAttribute(t, e, n, r);
            }),
            (t.prototype.removeAttribute = function (t, e, n) {
              var r = Ai(t);
              r &&
                r instanceof Oi &&
                (r.attributes[n ? n + ":" + e : e] = null),
                this.delegate.removeAttribute(t, e, n);
            }),
            (t.prototype.addClass = function (t, e) {
              var n = Ai(t);
              n && n instanceof Oi && (n.classes[e] = !0),
                this.delegate.addClass(t, e);
            }),
            (t.prototype.removeClass = function (t, e) {
              var n = Ai(t);
              n && n instanceof Oi && (n.classes[e] = !1),
                this.delegate.removeClass(t, e);
            }),
            (t.prototype.setStyle = function (t, e, n, r) {
              var o = Ai(t);
              o && o instanceof Oi && (o.styles[e] = n),
                this.delegate.setStyle(t, e, n, r);
            }),
            (t.prototype.removeStyle = function (t, e, n) {
              var r = Ai(t);
              r && r instanceof Oi && (r.styles[e] = null),
                this.delegate.removeStyle(t, e, n);
            }),
            (t.prototype.setProperty = function (t, e, n) {
              var r = Ai(t);
              r && r instanceof Oi && (r.properties[e] = n),
                this.delegate.setProperty(t, e, n);
            }),
            (t.prototype.listen = function (t, e, n) {
              if ("string" != typeof t) {
                var r = Ai(t);
                r && r.listeners.push(new Ti(e, n));
              }
              return this.delegate.listen(t, e, n);
            }),
            (t.prototype.parentNode = function (t) {
              return this.delegate.parentNode(t);
            }),
            (t.prototype.nextSibling = function (t) {
              return this.delegate.nextSibling(t);
            }),
            (t.prototype.setValue = function (t, e) {
              return this.delegate.setValue(t, e);
            }),
            t
          );
        })();
      function ss(t, e, n) {
        return new us(t, e, n);
      }
      var us = (function (t) {
          function e(e, n, r) {
            var o = t.call(this) || this;
            return (
              (o.moduleType = e),
              (o._bootstrapComponents = n),
              (o._ngModuleDefFactory = r),
              o
            );
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.create = function (t) {
              !(function () {
                if (!Ea) {
                  Ea = !0;
                  var t = Xt()
                    ? {
                        setCurrentNode: Wa,
                        createRootView: ka,
                        createEmbeddedView: xa,
                        createComponentView: Oa,
                        createNgModuleRef: Pa,
                        overrideProvider: Ra,
                        overrideComponentView: Da,
                        clearOverrides: ja,
                        checkAndUpdateView: La,
                        checkNoChangesView: Ua,
                        destroyView: Ha,
                        createDebugContext: function (t, e) {
                          return new ts(t, e);
                        },
                        handleEvent: Qa,
                        updateDirectives: Ka,
                        updateRenderer: Za,
                      }
                    : {
                        setCurrentNode: function () {},
                        createRootView: Sa,
                        createEmbeddedView: oa,
                        createComponentView: aa,
                        createNgModuleRef: Wr,
                        overrideProvider: Bn,
                        overrideComponentView: Bn,
                        clearOverrides: Bn,
                        checkAndUpdateView: ha,
                        checkNoChangesView: ca,
                        destroyView: ya,
                        createDebugContext: function (t, e) {
                          return new ts(t, e);
                        },
                        handleEvent: function (t, e, n, r) {
                          return t.def.handleEvent(t, e, n, r);
                        },
                        updateDirectives: function (t, e) {
                          return t.def.updateDirectives(0 === e ? Va : Fa, t);
                        },
                        updateRenderer: function (t, e) {
                          return t.def.updateRenderer(0 === e ? Va : Fa, t);
                        },
                      };
                  (zn.setCurrentNode = t.setCurrentNode),
                    (zn.createRootView = t.createRootView),
                    (zn.createEmbeddedView = t.createEmbeddedView),
                    (zn.createComponentView = t.createComponentView),
                    (zn.createNgModuleRef = t.createNgModuleRef),
                    (zn.overrideProvider = t.overrideProvider),
                    (zn.overrideComponentView = t.overrideComponentView),
                    (zn.clearOverrides = t.clearOverrides),
                    (zn.checkAndUpdateView = t.checkAndUpdateView),
                    (zn.checkNoChangesView = t.checkNoChangesView),
                    (zn.destroyView = t.destroyView),
                    (zn.resolveDep = po),
                    (zn.createDebugContext = t.createDebugContext),
                    (zn.handleEvent = t.handleEvent),
                    (zn.updateDirectives = t.updateDirectives),
                    (zn.updateRenderer = t.updateRenderer),
                    (zn.dirtyParentQueries = Gi);
                }
              })();
              var e = (function (t) {
                var e = Array.from(t.providers),
                  n = Array.from(t.modules),
                  r = {};
                for (var o in t.providersByKey) r[o] = t.providersByKey[o];
                return {
                  factory: t.factory,
                  isRoot: t.isRoot,
                  providers: e,
                  modules: n,
                  providersByKey: r,
                };
              })(pr(this._ngModuleDefFactory));
              return zn.createNgModuleRef(
                this.moduleType,
                t || Pe.NULL,
                this._bootstrapComponents,
                e
              );
            }),
            e
          );
        })(Vt),
        ls = (function () {
          return function () {};
        })(),
        cs = (function () {
          return function () {};
        })(),
        hs = (function () {
          return function () {};
        })(),
        ps = new Et("Location Initialized"),
        fs = (function () {
          return function () {};
        })(),
        ds = new Et("appBaseHref"),
        ms = (function () {
          function t(t, n) {
            var r = this;
            (this._subject = new To()),
              (this._urlChangeListeners = []),
              (this._platformStrategy = t);
            var o = this._platformStrategy.getBaseHref();
            (this._platformLocation = n),
              (this._baseHref = e.stripTrailingSlash(ys(o))),
              this._platformStrategy.onPopState(function (t) {
                r._subject.emit({
                  url: r.path(!0),
                  pop: !0,
                  state: t.state,
                  type: t.type,
                });
              });
          }
          var e;
          return (
            (e = t),
            (t.prototype.path = function (t) {
              return (
                void 0 === t && (t = !1),
                this.normalize(this._platformStrategy.path(t))
              );
            }),
            (t.prototype.getState = function () {
              return this._platformLocation.getState();
            }),
            (t.prototype.isCurrentPathEqualTo = function (t, n) {
              return (
                void 0 === n && (n = ""),
                this.path() == this.normalize(t + e.normalizeQueryParams(n))
              );
            }),
            (t.prototype.normalize = function (t) {
              return e.stripTrailingSlash(
                (function (t, e) {
                  return t && e.startsWith(t) ? e.substring(t.length) : e;
                })(this._baseHref, ys(t))
              );
            }),
            (t.prototype.prepareExternalUrl = function (t) {
              return (
                t && "/" !== t[0] && (t = "/" + t),
                this._platformStrategy.prepareExternalUrl(t)
              );
            }),
            (t.prototype.go = function (t, n, r) {
              void 0 === n && (n = ""),
                void 0 === r && (r = null),
                this._platformStrategy.pushState(r, "", t, n),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + e.normalizeQueryParams(n)),
                  r
                );
            }),
            (t.prototype.replaceState = function (t, n, r) {
              void 0 === n && (n = ""),
                void 0 === r && (r = null),
                this._platformStrategy.replaceState(r, "", t, n),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + e.normalizeQueryParams(n)),
                  r
                );
            }),
            (t.prototype.forward = function () {
              this._platformStrategy.forward();
            }),
            (t.prototype.back = function () {
              this._platformStrategy.back();
            }),
            (t.prototype.onUrlChange = function (t) {
              var e = this;
              this._urlChangeListeners.push(t),
                this.subscribe(function (t) {
                  e._notifyUrlChangeListeners(t.url, t.state);
                });
            }),
            (t.prototype._notifyUrlChangeListeners = function (t, e) {
              void 0 === t && (t = ""),
                this._urlChangeListeners.forEach(function (n) {
                  return n(t, e);
                });
            }),
            (t.prototype.subscribe = function (t, e, n) {
              return this._subject.subscribe({
                next: t,
                error: e,
                complete: n,
              });
            }),
            (t.normalizeQueryParams = function (t) {
              return t && "?" !== t[0] ? "?" + t : t;
            }),
            (t.joinWithSlash = function (t, e) {
              if (0 == t.length) return e;
              if (0 == e.length) return t;
              var n = 0;
              return (
                t.endsWith("/") && n++,
                e.startsWith("/") && n++,
                2 == n ? t + e.substring(1) : 1 == n ? t + e : t + "/" + e
              );
            }),
            (t.stripTrailingSlash = function (t) {
              var e = t.match(/#|\?|$/),
                n = (e && e.index) || t.length;
              return t.slice(0, n - ("/" === t[n - 1] ? 1 : 0)) + t.slice(n);
            }),
            t
          );
        })();
      function ys(t) {
        return t.replace(/\/index.html$/, "");
      }
      var gs = (function (t) {
          function e(e, n) {
            var r = t.call(this) || this;
            return (
              (r._platformLocation = e),
              (r._baseHref = ""),
              null != n && (r._baseHref = n),
              r
            );
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.onPopState = function (t) {
              this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t);
            }),
            (e.prototype.getBaseHref = function () {
              return this._baseHref;
            }),
            (e.prototype.path = function (t) {
              void 0 === t && (t = !1);
              var e = this._platformLocation.hash;
              return null == e && (e = "#"), e.length > 0 ? e.substring(1) : e;
            }),
            (e.prototype.prepareExternalUrl = function (t) {
              var e = ms.joinWithSlash(this._baseHref, t);
              return e.length > 0 ? "#" + e : e;
            }),
            (e.prototype.pushState = function (t, e, n, r) {
              var o = this.prepareExternalUrl(n + ms.normalizeQueryParams(r));
              0 == o.length && (o = this._platformLocation.pathname),
                this._platformLocation.pushState(t, e, o);
            }),
            (e.prototype.replaceState = function (t, e, n, r) {
              var o = this.prepareExternalUrl(n + ms.normalizeQueryParams(r));
              0 == o.length && (o = this._platformLocation.pathname),
                this._platformLocation.replaceState(t, e, o);
            }),
            (e.prototype.forward = function () {
              this._platformLocation.forward();
            }),
            (e.prototype.back = function () {
              this._platformLocation.back();
            }),
            e
          );
        })(fs),
        vs = (function (t) {
          function e(e, n) {
            var r = t.call(this) || this;
            if (
              ((r._platformLocation = e),
              null == n && (n = r._platformLocation.getBaseHrefFromDOM()),
              null == n)
            )
              throw new Error(
                "No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document."
              );
            return (r._baseHref = n), r;
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.onPopState = function (t) {
              this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t);
            }),
            (e.prototype.getBaseHref = function () {
              return this._baseHref;
            }),
            (e.prototype.prepareExternalUrl = function (t) {
              return ms.joinWithSlash(this._baseHref, t);
            }),
            (e.prototype.path = function (t) {
              void 0 === t && (t = !1);
              var e =
                  this._platformLocation.pathname +
                  ms.normalizeQueryParams(this._platformLocation.search),
                n = this._platformLocation.hash;
              return n && t ? "" + e + n : e;
            }),
            (e.prototype.pushState = function (t, e, n, r) {
              var o = this.prepareExternalUrl(n + ms.normalizeQueryParams(r));
              this._platformLocation.pushState(t, e, o);
            }),
            (e.prototype.replaceState = function (t, e, n, r) {
              var o = this.prepareExternalUrl(n + ms.normalizeQueryParams(r));
              this._platformLocation.replaceState(t, e, o);
            }),
            (e.prototype.forward = function () {
              this._platformLocation.forward();
            }),
            (e.prototype.back = function () {
              this._platformLocation.back();
            }),
            e
          );
        })(fs),
        bs = (function (t) {
          return (
            (t[(t.Zero = 0)] = "Zero"),
            (t[(t.One = 1)] = "One"),
            (t[(t.Two = 2)] = "Two"),
            (t[(t.Few = 3)] = "Few"),
            (t[(t.Many = 4)] = "Many"),
            (t[(t.Other = 5)] = "Other"),
            t
          );
        })({}),
        _s = new Et("UseV4Plurals"),
        ws = (function () {
          return function () {};
        })(),
        Cs = (function (t) {
          function e(e, n) {
            var r = t.call(this) || this;
            return (r.locale = e), (r.deprecatedPluralFn = n), r;
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.getPluralCategory = function (t, e) {
              switch (
                this.deprecatedPluralFn
                  ? this.deprecatedPluralFn(e || this.locale, t)
                  : (function (t) {
                      return (function (t) {
                        var e = t.toLowerCase().replace(/_/g, "-"),
                          n = _o[e];
                        if (n) return n;
                        var r = e.split("-")[0];
                        if ((n = _o[r])) return n;
                        if ("en" === r) return Eo;
                        throw new Error(
                          'Missing locale data for the locale "' + t + '".'
                        );
                      })(t)[wo.PluralCase];
                    })(e || this.locale)(t)
              ) {
                case bs.Zero:
                  return "zero";
                case bs.One:
                  return "one";
                case bs.Two:
                  return "two";
                case bs.Few:
                  return "few";
                case bs.Many:
                  return "many";
                default:
                  return "other";
              }
            }),
            e
          );
        })(ws);
      function Es(t, e) {
        var n, o;
        e = encodeURIComponent(e);
        try {
          for (
            var i = Object(r.e)(t.split(";")), a = i.next();
            !a.done;
            a = i.next()
          ) {
            var s = a.value,
              u = s.indexOf("="),
              l = Object(r.c)(
                -1 == u ? [s, ""] : [s.slice(0, u), s.slice(u + 1)],
                2
              ),
              c = l[1];
            if (l[0].trim() === e) return decodeURIComponent(c);
          }
        } catch (h) {
          n = { error: h };
        } finally {
          try {
            a && !a.done && (o = i.return) && o.call(i);
          } finally {
            if (n) throw n.error;
          }
        }
        return null;
      }
      var Ss = (function () {
          return function () {};
        })(),
        ks = (function () {
          function t(t, e, n, r) {
            (this._iterableDiffers = t),
              (this._keyValueDiffers = e),
              (this._ngEl = n),
              (this._renderer = r),
              (this._initialClasses = []);
          }
          return (
            (t.prototype.getValue = function () {
              return null;
            }),
            (t.prototype.setClass = function (t) {
              this._removeClasses(this._initialClasses),
                (this._initialClasses =
                  "string" == typeof t ? t.split(/\s+/) : []),
                this._applyClasses(this._initialClasses),
                this._applyClasses(this._rawClass);
            }),
            (t.prototype.setNgClass = function (t) {
              this._removeClasses(this._rawClass),
                this._applyClasses(this._initialClasses),
                (this._iterableDiffer = null),
                (this._keyValueDiffer = null),
                (this._rawClass = "string" == typeof t ? t.split(/\s+/) : t),
                this._rawClass &&
                  (Be(this._rawClass)
                    ? (this._iterableDiffer = this._iterableDiffers
                        .find(this._rawClass)
                        .create())
                    : (this._keyValueDiffer = this._keyValueDiffers
                        .find(this._rawClass)
                        .create()));
            }),
            (t.prototype.applyChanges = function () {
              if (this._iterableDiffer) {
                var t = this._iterableDiffer.diff(this._rawClass);
                t && this._applyIterableChanges(t);
              } else if (this._keyValueDiffer) {
                var e = this._keyValueDiffer.diff(this._rawClass);
                e && this._applyKeyValueChanges(e);
              }
            }),
            (t.prototype._applyKeyValueChanges = function (t) {
              var e = this;
              t.forEachAddedItem(function (t) {
                return e._toggleClass(t.key, t.currentValue);
              }),
                t.forEachChangedItem(function (t) {
                  return e._toggleClass(t.key, t.currentValue);
                }),
                t.forEachRemovedItem(function (t) {
                  t.previousValue && e._toggleClass(t.key, !1);
                });
            }),
            (t.prototype._applyIterableChanges = function (t) {
              var e = this;
              t.forEachAddedItem(function (t) {
                if ("string" != typeof t.item)
                  throw new Error(
                    "NgClass can only toggle CSS classes expressed as strings, got " +
                      ft(t.item)
                  );
                e._toggleClass(t.item, !0);
              }),
                t.forEachRemovedItem(function (t) {
                  return e._toggleClass(t.item, !1);
                });
            }),
            (t.prototype._applyClasses = function (t) {
              var e = this;
              t &&
                (Array.isArray(t) || t instanceof Set
                  ? t.forEach(function (t) {
                      return e._toggleClass(t, !0);
                    })
                  : Object.keys(t).forEach(function (n) {
                      return e._toggleClass(n, !!t[n]);
                    }));
            }),
            (t.prototype._removeClasses = function (t) {
              var e = this;
              t &&
                (Array.isArray(t) || t instanceof Set
                  ? t.forEach(function (t) {
                      return e._toggleClass(t, !1);
                    })
                  : Object.keys(t).forEach(function (t) {
                      return e._toggleClass(t, !1);
                    }));
            }),
            (t.prototype._toggleClass = function (t, e) {
              var n = this;
              (t = t.trim()) &&
                t.split(/\s+/g).forEach(function (t) {
                  e
                    ? n._renderer.addClass(n._ngEl.nativeElement, t)
                    : n._renderer.removeClass(n._ngEl.nativeElement, t);
                });
            }),
            t
          );
        })(),
        Ts = (function (t) {
          function e(e) {
            return t.call(this, e) || this;
          }
          return (
            Object(r.b)(e, t),
            Object.defineProperty(e.prototype, "klass", {
              set: function (t) {
                this._delegate.setClass(t);
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "ngClass", {
              set: function (t) {
                this._delegate.setNgClass(t);
              },
              enumerable: !0,
              configurable: !0,
            }),
            (e.prototype.ngDoCheck = function () {
              this._delegate.applyChanges();
            }),
            e
          );
        })(
          (function () {
            function t(t) {
              this._delegate = t;
            }
            return (
              (t.prototype.getValue = function () {
                return this._delegate.getValue();
              }),
              (t.ngDirectiveDef = void 0),
              t
            );
          })()
        ),
        xs = (function () {
          function t(t, e, n, r) {
            (this.$implicit = t),
              (this.ngForOf = e),
              (this.index = n),
              (this.count = r);
          }
          return (
            Object.defineProperty(t.prototype, "first", {
              get: function () {
                return 0 === this.index;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "last", {
              get: function () {
                return this.index === this.count - 1;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "even", {
              get: function () {
                return this.index % 2 == 0;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "odd", {
              get: function () {
                return !this.even;
              },
              enumerable: !0,
              configurable: !0,
            }),
            t
          );
        })(),
        Os = (function () {
          function t(t, e, n) {
            (this._viewContainer = t),
              (this._template = e),
              (this._differs = n),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          return (
            Object.defineProperty(t.prototype, "ngForOf", {
              set: function (t) {
                (this._ngForOf = t), (this._ngForOfDirty = !0);
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "ngForTrackBy", {
              get: function () {
                return this._trackByFn;
              },
              set: function (t) {
                Xt() &&
                  null != t &&
                  "function" != typeof t &&
                  console &&
                  console.warn &&
                  console.warn(
                    "trackBy must be a function, but received " +
                      JSON.stringify(t) +
                      ". See https://angular.io/docs/ts/latest/api/common/index/NgFor-directive.html#!#change-propagation for more information."
                  ),
                  (this._trackByFn = t);
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "ngForTemplate", {
              set: function (t) {
                t && (this._template = t);
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.ngDoCheck = function () {
              if (this._ngForOfDirty) {
                this._ngForOfDirty = !1;
                var t = this._ngForOf;
                if (!this._differ && t)
                  try {
                    this._differ = this._differs
                      .find(t)
                      .create(this.ngForTrackBy);
                  } catch (r) {
                    throw new Error(
                      "Cannot find a differ supporting object '" +
                        t +
                        "' of type '" +
                        ((e = t).name || typeof e) +
                        "'. NgFor only supports binding to Iterables such as Arrays."
                    );
                  }
              }
              var e;
              if (this._differ) {
                var n = this._differ.diff(this._ngForOf);
                n && this._applyChanges(n);
              }
            }),
            (t.prototype._applyChanges = function (t) {
              var e = this,
                n = [];
              t.forEachOperation(function (t, r, o) {
                if (null == t.previousIndex) {
                  var i = e._viewContainer.createEmbeddedView(
                      e._template,
                      new xs(null, e._ngForOf, -1, -1),
                      null === o ? void 0 : o
                    ),
                    a = new Ps(t, i);
                  n.push(a);
                } else null == o ? e._viewContainer.remove(null === r ? void 0 : r) : null !== r && ((i = e._viewContainer.get(r)), e._viewContainer.move(i, o), (a = new Ps(t, i)), n.push(a));
              });
              for (var r = 0; r < n.length; r++)
                this._perViewChange(n[r].view, n[r].record);
              r = 0;
              for (var o = this._viewContainer.length; r < o; r++) {
                var i = this._viewContainer.get(r);
                (i.context.index = r),
                  (i.context.count = o),
                  (i.context.ngForOf = this._ngForOf);
              }
              t.forEachIdentityChange(function (t) {
                e._viewContainer.get(t.currentIndex).context.$implicit = t.item;
              });
            }),
            (t.prototype._perViewChange = function (t, e) {
              t.context.$implicit = e.item;
            }),
            (t.ngTemplateContextGuard = function (t, e) {
              return !0;
            }),
            t
          );
        })(),
        Ps = (function () {
          return function (t, e) {
            (this.record = t), (this.view = e);
          };
        })(),
        As = (function () {
          function t(t, e) {
            (this._viewContainer = t),
              (this._context = new Is()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = e);
          }
          return (
            Object.defineProperty(t.prototype, "ngIf", {
              set: function (t) {
                (this._context.$implicit = this._context.ngIf = t),
                  this._updateView();
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "ngIfThen", {
              set: function (t) {
                Ns("ngIfThen", t),
                  (this._thenTemplateRef = t),
                  (this._thenViewRef = null),
                  this._updateView();
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "ngIfElse", {
              set: function (t) {
                Ns("ngIfElse", t),
                  (this._elseTemplateRef = t),
                  (this._elseViewRef = null),
                  this._updateView();
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype._updateView = function () {
              this._context.$implicit
                ? this._thenViewRef ||
                  (this._viewContainer.clear(),
                  (this._elseViewRef = null),
                  this._thenTemplateRef &&
                    (this._thenViewRef = this._viewContainer.createEmbeddedView(
                      this._thenTemplateRef,
                      this._context
                    )))
                : this._elseViewRef ||
                  (this._viewContainer.clear(),
                  (this._thenViewRef = null),
                  this._elseTemplateRef &&
                    (this._elseViewRef = this._viewContainer.createEmbeddedView(
                      this._elseTemplateRef,
                      this._context
                    )));
            }),
            t
          );
        })(),
        Is = (function () {
          return function () {
            (this.$implicit = null), (this.ngIf = null);
          };
        })();
      function Ns(t, e) {
        if (e && !e.createEmbeddedView)
          throw new Error(
            t + " must be a TemplateRef, but received '" + ft(e) + "'."
          );
      }
      var Rs = (function () {
          function t(t, e) {
            (this._viewContainerRef = t),
              (this._templateRef = e),
              (this._created = !1);
          }
          return (
            (t.prototype.create = function () {
              (this._created = !0),
                this._viewContainerRef.createEmbeddedView(this._templateRef);
            }),
            (t.prototype.destroy = function () {
              (this._created = !1), this._viewContainerRef.clear();
            }),
            (t.prototype.enforceState = function (t) {
              t && !this._created
                ? this.create()
                : !t && this._created && this.destroy();
            }),
            t
          );
        })(),
        Ds = (function () {
          function t() {
            (this._defaultUsed = !1),
              (this._caseCount = 0),
              (this._lastCaseCheckIndex = 0),
              (this._lastCasesMatched = !1);
          }
          return (
            Object.defineProperty(t.prototype, "ngSwitch", {
              set: function (t) {
                (this._ngSwitch = t),
                  0 === this._caseCount && this._updateDefaultCases(!0);
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype._addCase = function () {
              return this._caseCount++;
            }),
            (t.prototype._addDefault = function (t) {
              this._defaultViews || (this._defaultViews = []),
                this._defaultViews.push(t);
            }),
            (t.prototype._matchCase = function (t) {
              var e = t == this._ngSwitch;
              return (
                (this._lastCasesMatched = this._lastCasesMatched || e),
                this._lastCaseCheckIndex++,
                this._lastCaseCheckIndex === this._caseCount &&
                  (this._updateDefaultCases(!this._lastCasesMatched),
                  (this._lastCaseCheckIndex = 0),
                  (this._lastCasesMatched = !1)),
                e
              );
            }),
            (t.prototype._updateDefaultCases = function (t) {
              if (this._defaultViews && t !== this._defaultUsed) {
                this._defaultUsed = t;
                for (var e = 0; e < this._defaultViews.length; e++)
                  this._defaultViews[e].enforceState(t);
              }
            }),
            t
          );
        })(),
        js = (function () {
          function t(t, e, n) {
            (this.ngSwitch = n), n._addCase(), (this._view = new Rs(t, e));
          }
          return (
            (t.prototype.ngDoCheck = function () {
              this._view.enforceState(
                this.ngSwitch._matchCase(this.ngSwitchCase)
              );
            }),
            t
          );
        })(),
        Ms = (function () {
          function t() {}
          var e;
          return (
            (e = t),
            (t.prototype.transform = function (t) {
              if (!t) return t;
              if ("string" != typeof t)
                throw (function (t, e) {
                  return Error(
                    "InvalidPipeArgument: '" + e + "' for pipe '" + ft(t) + "'"
                  );
                })(e, t);
              return t.toUpperCase();
            }),
            t
          );
        })(),
        Vs = (function () {
          return function () {};
        })(),
        Fs = new Et("DocumentToken"),
        Ls = "browser",
        Us = "server",
        Hs = (function () {
          function t() {}
          return (
            (t.ngInjectableDef = ct({
              token: t,
              providedIn: "root",
              factory: function () {
                return new zs(Rt(Fs), window, Rt(Kt));
              },
            })),
            t
          );
        })(),
        zs = (function () {
          function t(t, e, n) {
            (this.document = t),
              (this.window = e),
              (this.errorHandler = n),
              (this.offset = function () {
                return [0, 0];
              });
          }
          return (
            (t.prototype.setOffset = function (t) {
              this.offset = Array.isArray(t)
                ? function () {
                    return t;
                  }
                : t;
            }),
            (t.prototype.getScrollPosition = function () {
              return this.supportScrollRestoration()
                ? [this.window.scrollX, this.window.scrollY]
                : [0, 0];
            }),
            (t.prototype.scrollToPosition = function (t) {
              this.supportScrollRestoration() &&
                this.window.scrollTo(t[0], t[1]);
            }),
            (t.prototype.scrollToAnchor = function (t) {
              if (this.supportScrollRestoration()) {
                t =
                  this.window.CSS && this.window.CSS.escape
                    ? this.window.CSS.escape(t)
                    : t.replace(/(\"|\'\ |:|\.|\[|\]|,|=)/g, "\\$1");
                try {
                  var e = this.document.querySelector("#" + t);
                  if (e) return void this.scrollToElement(e);
                  var n = this.document.querySelector("[name='" + t + "']");
                  if (n) return void this.scrollToElement(n);
                } catch (r) {
                  this.errorHandler.handleError(r);
                }
              }
            }),
            (t.prototype.setHistoryScrollRestoration = function (t) {
              if (this.supportScrollRestoration()) {
                var e = this.window.history;
                e && e.scrollRestoration && (e.scrollRestoration = t);
              }
            }),
            (t.prototype.scrollToElement = function (t) {
              var e = t.getBoundingClientRect(),
                n = e.left + this.window.pageXOffset,
                r = e.top + this.window.pageYOffset,
                o = this.offset();
              this.window.scrollTo(n - o[0], r - o[1]);
            }),
            (t.prototype.supportScrollRestoration = function () {
              try {
                return !!this.window && !!this.window.scrollTo;
              } catch (t) {
                return !1;
              }
            }),
            t
          );
        })();
      function Bs() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        var n = t[t.length - 1];
        return O(n) ? (t.pop(), H(t, n)) : K(t);
      }
      var qs = (function (t) {
          function e(e) {
            var n = t.call(this) || this;
            return (n._value = e), n;
          }
          return (
            r.b(e, t),
            Object.defineProperty(e.prototype, "value", {
              get: function () {
                return this.getValue();
              },
              enumerable: !0,
              configurable: !0,
            }),
            (e.prototype._subscribe = function (e) {
              var n = t.prototype._subscribe.call(this, e);
              return n && !n.closed && e.next(this._value), n;
            }),
            (e.prototype.getValue = function () {
              if (this.hasError) throw this.thrownError;
              if (this.closed) throw new E();
              return this._value;
            }),
            (e.prototype.next = function (e) {
              t.prototype.next.call(this, (this._value = e));
            }),
            e
          );
        })(T),
        Gs = (function () {
          function t() {
            return (
              Error.call(this),
              (this.message = "no elements in sequence"),
              (this.name = "EmptyError"),
              this
            );
          }
          return (t.prototype = Object.create(Error.prototype)), t;
        })(),
        Ws = {};
      function Qs() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        var n = null,
          r = null;
        return (
          O(t[t.length - 1]) && (r = t.pop()),
          "function" == typeof t[t.length - 1] && (n = t.pop()),
          1 === t.length && o(t[0]) && (t = t[0]),
          K(t, r).lift(new Ks(n))
        );
      }
      var Ks = (function () {
          function t(t) {
            this.resultSelector = t;
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new Zs(t, this.resultSelector));
            }),
            t
          );
        })(),
        Zs = (function (t) {
          function e(e, n) {
            var r = t.call(this, e) || this;
            return (
              (r.resultSelector = n),
              (r.active = 0),
              (r.values = []),
              (r.observables = []),
              r
            );
          }
          return (
            r.b(e, t),
            (e.prototype._next = function (t) {
              this.values.push(Ws), this.observables.push(t);
            }),
            (e.prototype._complete = function () {
              var t = this.observables,
                e = t.length;
              if (0 === e) this.destination.complete();
              else {
                (this.active = e), (this.toRespond = e);
                for (var n = 0; n < e; n++) {
                  var r = t[n];
                  this.add(M(this, r, r, n));
                }
              }
            }),
            (e.prototype.notifyComplete = function (t) {
              0 == (this.active -= 1) && this.destination.complete();
            }),
            (e.prototype.notifyNext = function (t, e, n, r, o) {
              var i = this.values,
                a = this.toRespond
                  ? i[n] === Ws
                    ? --this.toRespond
                    : this.toRespond
                  : 0;
              (i[n] = e),
                0 === a &&
                  (this.resultSelector
                    ? this._tryResultSelector(i)
                    : this.destination.next(i.slice()));
            }),
            (e.prototype._tryResultSelector = function (t) {
              var e;
              try {
                e = this.resultSelector.apply(this, t);
              } catch (n) {
                return void this.destination.error(n);
              }
              this.destination.next(e);
            }),
            e
          );
        })(V),
        $s = new w(function (t) {
          return t.complete();
        });
      function Xs(t) {
        return t
          ? (function (t) {
              return new w(function (e) {
                return t.schedule(function () {
                  return e.complete();
                });
              });
            })(t)
          : $s;
      }
      function Js(t) {
        return new w(function (e) {
          var n;
          try {
            n = t();
          } catch (r) {
            return void e.error(r);
          }
          return (n ? z(n) : Xs()).subscribe(e);
        });
      }
      function Ys() {
        return Q(1);
      }
      function tu(t, e) {
        return function (n) {
          return n.lift(new eu(t, e));
        };
      }
      var eu = (function () {
          function t(t, e) {
            (this.predicate = t), (this.thisArg = e);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new nu(t, this.predicate, this.thisArg));
            }),
            t
          );
        })(),
        nu = (function (t) {
          function e(e, n, r) {
            var o = t.call(this, e) || this;
            return (o.predicate = n), (o.thisArg = r), (o.count = 0), o;
          }
          return (
            r.b(e, t),
            (e.prototype._next = function (t) {
              var e;
              try {
                e = this.predicate.call(this.thisArg, t, this.count++);
              } catch (n) {
                return void this.destination.error(n);
              }
              e && this.destination.next(t);
            }),
            e
          );
        })(m),
        ru = (function () {
          function t() {
            return (
              Error.call(this),
              (this.message = "argument out of range"),
              (this.name = "ArgumentOutOfRangeError"),
              this
            );
          }
          return (t.prototype = Object.create(Error.prototype)), t;
        })();
      function ou(t) {
        return function (e) {
          return 0 === t ? Xs() : e.lift(new iu(t));
        };
      }
      var iu = (function () {
          function t(t) {
            if (((this.total = t), this.total < 0)) throw new ru();
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new au(t, this.total));
            }),
            t
          );
        })(),
        au = (function (t) {
          function e(e, n) {
            var r = t.call(this, e) || this;
            return (r.total = n), (r.ring = new Array()), (r.count = 0), r;
          }
          return (
            r.b(e, t),
            (e.prototype._next = function (t) {
              var e = this.ring,
                n = this.total,
                r = this.count++;
              e.length < n ? e.push(t) : (e[r % n] = t);
            }),
            (e.prototype._complete = function () {
              var t = this.destination,
                e = this.count;
              if (e > 0)
                for (
                  var n = this.count >= this.total ? this.total : this.count,
                    r = this.ring,
                    o = 0;
                  o < n;
                  o++
                ) {
                  var i = e++ % n;
                  t.next(r[i]);
                }
              t.complete();
            }),
            e
          );
        })(m);
      function su(t) {
        return (
          void 0 === t && (t = cu),
          function (e) {
            return e.lift(new uu(t));
          }
        );
      }
      var uu = (function () {
          function t(t) {
            this.errorFactory = t;
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new lu(t, this.errorFactory));
            }),
            t
          );
        })(),
        lu = (function (t) {
          function e(e, n) {
            var r = t.call(this, e) || this;
            return (r.errorFactory = n), (r.hasValue = !1), r;
          }
          return (
            r.b(e, t),
            (e.prototype._next = function (t) {
              (this.hasValue = !0), this.destination.next(t);
            }),
            (e.prototype._complete = function () {
              if (this.hasValue) return this.destination.complete();
              var t = void 0;
              try {
                t = this.errorFactory();
              } catch (e) {
                t = e;
              }
              this.destination.error(t);
            }),
            e
          );
        })(m);
      function cu() {
        return new Gs();
      }
      function hu(t) {
        return (
          void 0 === t && (t = null),
          function (e) {
            return e.lift(new pu(t));
          }
        );
      }
      var pu = (function () {
          function t(t) {
            this.defaultValue = t;
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new fu(t, this.defaultValue));
            }),
            t
          );
        })(),
        fu = (function (t) {
          function e(e, n) {
            var r = t.call(this, e) || this;
            return (r.defaultValue = n), (r.isEmpty = !0), r;
          }
          return (
            r.b(e, t),
            (e.prototype._next = function (t) {
              (this.isEmpty = !1), this.destination.next(t);
            }),
            (e.prototype._complete = function () {
              this.isEmpty && this.destination.next(this.defaultValue),
                this.destination.complete();
            }),
            e
          );
        })(m);
      function du(t, e) {
        var n = arguments.length >= 2;
        return function (r) {
          return r.pipe(
            t
              ? tu(function (e, n) {
                  return t(e, n, r);
                })
              : W,
            ou(1),
            n
              ? hu(e)
              : su(function () {
                  return new Gs();
                })
          );
        };
      }
      function mu(t) {
        return function (e) {
          var n = new yu(t),
            r = e.lift(n);
          return (n.caught = r);
        };
      }
      var yu = (function () {
          function t(t) {
            this.selector = t;
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new gu(t, this.selector, this.caught));
            }),
            t
          );
        })(),
        gu = (function (t) {
          function e(e, n, r) {
            var o = t.call(this, e) || this;
            return (o.selector = n), (o.caught = r), o;
          }
          return (
            r.b(e, t),
            (e.prototype.error = function (e) {
              if (!this.isStopped) {
                var n = void 0;
                try {
                  n = this.selector(e, this.caught);
                } catch (o) {
                  return void t.prototype.error.call(this, o);
                }
                this._unsubscribeAndRecycle();
                var r = new P(this, void 0, void 0);
                this.add(r), M(this, n, void 0, void 0, r);
              }
            }),
            e
          );
        })(V);
      function vu(t) {
        return function (e) {
          return 0 === t ? Xs() : e.lift(new bu(t));
        };
      }
      var bu = (function () {
          function t(t) {
            if (((this.total = t), this.total < 0)) throw new ru();
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new _u(t, this.total));
            }),
            t
          );
        })(),
        _u = (function (t) {
          function e(e, n) {
            var r = t.call(this, e) || this;
            return (r.total = n), (r.count = 0), r;
          }
          return (
            r.b(e, t),
            (e.prototype._next = function (t) {
              var e = this.total,
                n = ++this.count;
              n <= e &&
                (this.destination.next(t),
                n === e && (this.destination.complete(), this.unsubscribe()));
            }),
            e
          );
        })(m);
      function wu(t, e) {
        var n = arguments.length >= 2;
        return function (r) {
          return r.pipe(
            t
              ? tu(function (e, n) {
                  return t(e, n, r);
                })
              : W,
            vu(1),
            n
              ? hu(e)
              : su(function () {
                  return new Gs();
                })
          );
        };
      }
      var Cu = (function () {
          function t(t, e, n) {
            (this.predicate = t), (this.thisArg = e), (this.source = n);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(
                new Eu(t, this.predicate, this.thisArg, this.source)
              );
            }),
            t
          );
        })(),
        Eu = (function (t) {
          function e(e, n, r, o) {
            var i = t.call(this, e) || this;
            return (
              (i.predicate = n),
              (i.thisArg = r),
              (i.source = o),
              (i.index = 0),
              (i.thisArg = r || i),
              i
            );
          }
          return (
            r.b(e, t),
            (e.prototype.notifyComplete = function (t) {
              this.destination.next(t), this.destination.complete();
            }),
            (e.prototype._next = function (t) {
              var e = !1;
              try {
                e = this.predicate.call(
                  this.thisArg,
                  t,
                  this.index++,
                  this.source
                );
              } catch (n) {
                return void this.destination.error(n);
              }
              e || this.notifyComplete(!1);
            }),
            (e.prototype._complete = function () {
              this.notifyComplete(!0);
            }),
            e
          );
        })(m);
      function Su(t, e) {
        return "function" == typeof e
          ? function (n) {
              return n.pipe(
                Su(function (n, r) {
                  return z(t(n, r)).pipe(
                    F(function (t, o) {
                      return e(n, t, r, o);
                    })
                  );
                })
              );
            }
          : function (e) {
              return e.lift(new ku(t));
            };
      }
      var ku = (function () {
          function t(t) {
            this.project = t;
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new Tu(t, this.project));
            }),
            t
          );
        })(),
        Tu = (function (t) {
          function e(e, n) {
            var r = t.call(this, e) || this;
            return (r.project = n), (r.index = 0), r;
          }
          return (
            r.b(e, t),
            (e.prototype._next = function (t) {
              var e,
                n = this.index++;
              try {
                e = this.project(t, n);
              } catch (r) {
                return void this.destination.error(r);
              }
              this._innerSub(e, t, n);
            }),
            (e.prototype._innerSub = function (t, e, n) {
              var r = this.innerSubscription;
              r && r.unsubscribe();
              var o = new P(this, void 0, void 0);
              this.destination.add(o),
                (this.innerSubscription = M(this, t, e, n, o));
            }),
            (e.prototype._complete = function () {
              var e = this.innerSubscription;
              (e && !e.closed) || t.prototype._complete.call(this),
                this.unsubscribe();
            }),
            (e.prototype._unsubscribe = function () {
              this.innerSubscription = null;
            }),
            (e.prototype.notifyComplete = function (e) {
              this.destination.remove(e),
                (this.innerSubscription = null),
                this.isStopped && t.prototype._complete.call(this);
            }),
            (e.prototype.notifyNext = function (t, e, n, r, o) {
              this.destination.next(e);
            }),
            e
          );
        })(V);
      function xu() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        return Ys()(Bs.apply(void 0, t));
      }
      function Ou(t, e) {
        var n = !1;
        return (
          arguments.length >= 2 && (n = !0),
          function (r) {
            return r.lift(new Pu(t, e, n));
          }
        );
      }
      var Pu = (function () {
          function t(t, e, n) {
            void 0 === n && (n = !1),
              (this.accumulator = t),
              (this.seed = e),
              (this.hasSeed = n);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(
                new Au(t, this.accumulator, this.seed, this.hasSeed)
              );
            }),
            t
          );
        })(),
        Au = (function (t) {
          function e(e, n, r, o) {
            var i = t.call(this, e) || this;
            return (
              (i.accumulator = n),
              (i._seed = r),
              (i.hasSeed = o),
              (i.index = 0),
              i
            );
          }
          return (
            r.b(e, t),
            Object.defineProperty(e.prototype, "seed", {
              get: function () {
                return this._seed;
              },
              set: function (t) {
                (this.hasSeed = !0), (this._seed = t);
              },
              enumerable: !0,
              configurable: !0,
            }),
            (e.prototype._next = function (t) {
              if (this.hasSeed) return this._tryNext(t);
              (this.seed = t), this.destination.next(t);
            }),
            (e.prototype._tryNext = function (t) {
              var e,
                n = this.index++;
              try {
                e = this.accumulator(this.seed, t, n);
              } catch (r) {
                this.destination.error(r);
              }
              (this.seed = e), this.destination.next(e);
            }),
            e
          );
        })(m);
      function Iu(t, e) {
        return B(t, e, 1);
      }
      function Nu(t, e, n) {
        return function (r) {
          return r.lift(new Ru(t, e, n));
        };
      }
      var Ru = (function () {
          function t(t, e, n) {
            (this.nextOrObserver = t), (this.error = e), (this.complete = n);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(
                new Du(t, this.nextOrObserver, this.error, this.complete)
              );
            }),
            t
          );
        })(),
        Du = (function (t) {
          function e(e, n, r, o) {
            var i = t.call(this, e) || this;
            return (
              (i._tapNext = v),
              (i._tapError = v),
              (i._tapComplete = v),
              (i._tapError = r || v),
              (i._tapComplete = o || v),
              a(n)
                ? ((i._context = i), (i._tapNext = n))
                : n &&
                  ((i._context = n),
                  (i._tapNext = n.next || v),
                  (i._tapError = n.error || v),
                  (i._tapComplete = n.complete || v)),
              i
            );
          }
          return (
            r.b(e, t),
            (e.prototype._next = function (t) {
              try {
                this._tapNext.call(this._context, t);
              } catch (e) {
                return void this.destination.error(e);
              }
              this.destination.next(t);
            }),
            (e.prototype._error = function (t) {
              try {
                this._tapError.call(this._context, t);
              } catch (t) {
                return void this.destination.error(t);
              }
              this.destination.error(t);
            }),
            (e.prototype._complete = function () {
              try {
                this._tapComplete.call(this._context);
              } catch (t) {
                return void this.destination.error(t);
              }
              return this.destination.complete();
            }),
            e
          );
        })(m),
        ju = (function () {
          function t(t) {
            this.callback = t;
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new Mu(t, this.callback));
            }),
            t
          );
        })(),
        Mu = (function (t) {
          function e(e, n) {
            var r = t.call(this, e) || this;
            return r.add(new u(n)), r;
          }
          return r.b(e, t), e;
        })(m),
        Vu = null;
      function Fu() {
        return Vu;
      }
      var Lu,
        Uu = (function (t) {
          function e() {
            var e = t.call(this) || this;
            (e._animationPrefix = null), (e._transitionEnd = null);
            try {
              var n = e.createElement("div", document);
              if (null != e.getStyle(n, "animationName"))
                e._animationPrefix = "";
              else
                for (
                  var r = ["Webkit", "Moz", "O", "ms"], o = 0;
                  o < r.length;
                  o++
                )
                  if (null != e.getStyle(n, r[o] + "AnimationName")) {
                    e._animationPrefix = "-" + r[o].toLowerCase() + "-";
                    break;
                  }
              var i = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend",
              };
              Object.keys(i).forEach(function (t) {
                null != e.getStyle(n, t) && (e._transitionEnd = i[t]);
              });
            } catch (a) {
              (e._animationPrefix = null), (e._transitionEnd = null);
            }
            return e;
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.getDistributedNodes = function (t) {
              return t.getDistributedNodes();
            }),
            (e.prototype.resolveAndSetHref = function (t, e, n) {
              t.href = null == n ? e : e + "/../" + n;
            }),
            (e.prototype.supportsDOMEvents = function () {
              return !0;
            }),
            (e.prototype.supportsNativeShadowDOM = function () {
              return "function" == typeof document.body.createShadowRoot;
            }),
            (e.prototype.getAnimationPrefix = function () {
              return this._animationPrefix ? this._animationPrefix : "";
            }),
            (e.prototype.getTransitionEnd = function () {
              return this._transitionEnd ? this._transitionEnd : "";
            }),
            (e.prototype.supportsAnimation = function () {
              return (
                null != this._animationPrefix && null != this._transitionEnd
              );
            }),
            e
          );
        })(
          (function () {
            function t() {
              this.resourceLoaderType = null;
            }
            return (
              Object.defineProperty(t.prototype, "attrToPropMap", {
                get: function () {
                  return this._attrToPropMap;
                },
                set: function (t) {
                  this._attrToPropMap = t;
                },
                enumerable: !0,
                configurable: !0,
              }),
              t
            );
          })()
        ),
        Hu = {
          class: "className",
          innerHtml: "innerHTML",
          readonly: "readOnly",
          tabindex: "tabIndex",
        },
        zu = {
          "\b": "Backspace",
          "\t": "Tab",
          "": "Delete",
          "": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        Bu = {
          A: "1",
          B: "2",
          C: "3",
          D: "4",
          E: "5",
          F: "6",
          G: "7",
          H: "8",
          I: "9",
          J: "*",
          K: "+",
          M: "-",
          N: ".",
          O: "/",
          "`": "0",
          "": "NumLock",
        },
        qu = (function () {
          if (Ct.Node)
            return (
              Ct.Node.prototype.contains ||
              function (t) {
                return !!(16 & this.compareDocumentPosition(t));
              }
            );
        })(),
        Gu = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.parse = function (t) {
              throw new Error("parse not implemented");
            }),
            (e.makeCurrent = function () {
              var t;
              (t = new e()), Vu || (Vu = t);
            }),
            (e.prototype.hasProperty = function (t, e) {
              return e in t;
            }),
            (e.prototype.setProperty = function (t, e, n) {
              t[e] = n;
            }),
            (e.prototype.getProperty = function (t, e) {
              return t[e];
            }),
            (e.prototype.invoke = function (t, e, n) {
              var o;
              (o = t)[e].apply(o, Object(r.d)(n));
            }),
            (e.prototype.logError = function (t) {
              window.console &&
                (console.error ? console.error(t) : console.log(t));
            }),
            (e.prototype.log = function (t) {
              window.console && window.console.log && window.console.log(t);
            }),
            (e.prototype.logGroup = function (t) {
              window.console && window.console.group && window.console.group(t);
            }),
            (e.prototype.logGroupEnd = function () {
              window.console &&
                window.console.groupEnd &&
                window.console.groupEnd();
            }),
            Object.defineProperty(e.prototype, "attrToPropMap", {
              get: function () {
                return Hu;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (e.prototype.contains = function (t, e) {
              return qu.call(t, e);
            }),
            (e.prototype.querySelector = function (t, e) {
              return t.querySelector(e);
            }),
            (e.prototype.querySelectorAll = function (t, e) {
              return t.querySelectorAll(e);
            }),
            (e.prototype.on = function (t, e, n) {
              t.addEventListener(e, n, !1);
            }),
            (e.prototype.onAndCancel = function (t, e, n) {
              return (
                t.addEventListener(e, n, !1),
                function () {
                  t.removeEventListener(e, n, !1);
                }
              );
            }),
            (e.prototype.dispatchEvent = function (t, e) {
              t.dispatchEvent(e);
            }),
            (e.prototype.createMouseEvent = function (t) {
              var e = this.getDefaultDocument().createEvent("MouseEvent");
              return e.initEvent(t, !0, !0), e;
            }),
            (e.prototype.createEvent = function (t) {
              var e = this.getDefaultDocument().createEvent("Event");
              return e.initEvent(t, !0, !0), e;
            }),
            (e.prototype.preventDefault = function (t) {
              t.preventDefault(), (t.returnValue = !1);
            }),
            (e.prototype.isPrevented = function (t) {
              return (
                t.defaultPrevented || (null != t.returnValue && !t.returnValue)
              );
            }),
            (e.prototype.getInnerHTML = function (t) {
              return t.innerHTML;
            }),
            (e.prototype.getTemplateContent = function (t) {
              return "content" in t && this.isTemplateElement(t)
                ? t.content
                : null;
            }),
            (e.prototype.getOuterHTML = function (t) {
              return t.outerHTML;
            }),
            (e.prototype.nodeName = function (t) {
              return t.nodeName;
            }),
            (e.prototype.nodeValue = function (t) {
              return t.nodeValue;
            }),
            (e.prototype.type = function (t) {
              return t.type;
            }),
            (e.prototype.content = function (t) {
              return this.hasProperty(t, "content") ? t.content : t;
            }),
            (e.prototype.firstChild = function (t) {
              return t.firstChild;
            }),
            (e.prototype.nextSibling = function (t) {
              return t.nextSibling;
            }),
            (e.prototype.parentElement = function (t) {
              return t.parentNode;
            }),
            (e.prototype.childNodes = function (t) {
              return t.childNodes;
            }),
            (e.prototype.childNodesAsList = function (t) {
              for (
                var e = t.childNodes, n = new Array(e.length), r = 0;
                r < e.length;
                r++
              )
                n[r] = e[r];
              return n;
            }),
            (e.prototype.clearNodes = function (t) {
              for (; t.firstChild; ) t.removeChild(t.firstChild);
            }),
            (e.prototype.appendChild = function (t, e) {
              t.appendChild(e);
            }),
            (e.prototype.removeChild = function (t, e) {
              t.removeChild(e);
            }),
            (e.prototype.replaceChild = function (t, e, n) {
              t.replaceChild(e, n);
            }),
            (e.prototype.remove = function (t) {
              return t.parentNode && t.parentNode.removeChild(t), t;
            }),
            (e.prototype.insertBefore = function (t, e, n) {
              t.insertBefore(n, e);
            }),
            (e.prototype.insertAllBefore = function (t, e, n) {
              n.forEach(function (n) {
                return t.insertBefore(n, e);
              });
            }),
            (e.prototype.insertAfter = function (t, e, n) {
              t.insertBefore(n, e.nextSibling);
            }),
            (e.prototype.setInnerHTML = function (t, e) {
              t.innerHTML = e;
            }),
            (e.prototype.getText = function (t) {
              return t.textContent;
            }),
            (e.prototype.setText = function (t, e) {
              t.textContent = e;
            }),
            (e.prototype.getValue = function (t) {
              return t.value;
            }),
            (e.prototype.setValue = function (t, e) {
              t.value = e;
            }),
            (e.prototype.getChecked = function (t) {
              return t.checked;
            }),
            (e.prototype.setChecked = function (t, e) {
              t.checked = e;
            }),
            (e.prototype.createComment = function (t) {
              return this.getDefaultDocument().createComment(t);
            }),
            (e.prototype.createTemplate = function (t) {
              var e = this.getDefaultDocument().createElement("template");
              return (e.innerHTML = t), e;
            }),
            (e.prototype.createElement = function (t, e) {
              return (e = e || this.getDefaultDocument()).createElement(t);
            }),
            (e.prototype.createElementNS = function (t, e, n) {
              return (n = n || this.getDefaultDocument()).createElementNS(t, e);
            }),
            (e.prototype.createTextNode = function (t, e) {
              return (e = e || this.getDefaultDocument()).createTextNode(t);
            }),
            (e.prototype.createScriptTag = function (t, e, n) {
              var r = (n = n || this.getDefaultDocument()).createElement(
                "SCRIPT"
              );
              return r.setAttribute(t, e), r;
            }),
            (e.prototype.createStyleElement = function (t, e) {
              var n = (e = e || this.getDefaultDocument()).createElement(
                "style"
              );
              return this.appendChild(n, this.createTextNode(t, e)), n;
            }),
            (e.prototype.createShadowRoot = function (t) {
              return t.createShadowRoot();
            }),
            (e.prototype.getShadowRoot = function (t) {
              return t.shadowRoot;
            }),
            (e.prototype.getHost = function (t) {
              return t.host;
            }),
            (e.prototype.clone = function (t) {
              return t.cloneNode(!0);
            }),
            (e.prototype.getElementsByClassName = function (t, e) {
              return t.getElementsByClassName(e);
            }),
            (e.prototype.getElementsByTagName = function (t, e) {
              return t.getElementsByTagName(e);
            }),
            (e.prototype.classList = function (t) {
              return Array.prototype.slice.call(t.classList, 0);
            }),
            (e.prototype.addClass = function (t, e) {
              t.classList.add(e);
            }),
            (e.prototype.removeClass = function (t, e) {
              t.classList.remove(e);
            }),
            (e.prototype.hasClass = function (t, e) {
              return t.classList.contains(e);
            }),
            (e.prototype.setStyle = function (t, e, n) {
              t.style[e] = n;
            }),
            (e.prototype.removeStyle = function (t, e) {
              t.style[e] = "";
            }),
            (e.prototype.getStyle = function (t, e) {
              return t.style[e];
            }),
            (e.prototype.hasStyle = function (t, e, n) {
              var r = this.getStyle(t, e) || "";
              return n ? r == n : r.length > 0;
            }),
            (e.prototype.tagName = function (t) {
              return t.tagName;
            }),
            (e.prototype.attributeMap = function (t) {
              for (
                var e = new Map(), n = t.attributes, r = 0;
                r < n.length;
                r++
              ) {
                var o = n.item(r);
                e.set(o.name, o.value);
              }
              return e;
            }),
            (e.prototype.hasAttribute = function (t, e) {
              return t.hasAttribute(e);
            }),
            (e.prototype.hasAttributeNS = function (t, e, n) {
              return t.hasAttributeNS(e, n);
            }),
            (e.prototype.getAttribute = function (t, e) {
              return t.getAttribute(e);
            }),
            (e.prototype.getAttributeNS = function (t, e, n) {
              return t.getAttributeNS(e, n);
            }),
            (e.prototype.setAttribute = function (t, e, n) {
              t.setAttribute(e, n);
            }),
            (e.prototype.setAttributeNS = function (t, e, n, r) {
              t.setAttributeNS(e, n, r);
            }),
            (e.prototype.removeAttribute = function (t, e) {
              t.removeAttribute(e);
            }),
            (e.prototype.removeAttributeNS = function (t, e, n) {
              t.removeAttributeNS(e, n);
            }),
            (e.prototype.templateAwareRoot = function (t) {
              return this.isTemplateElement(t) ? this.content(t) : t;
            }),
            (e.prototype.createHtmlDocument = function () {
              return document.implementation.createHTMLDocument("fakeTitle");
            }),
            (e.prototype.getDefaultDocument = function () {
              return document;
            }),
            (e.prototype.getBoundingClientRect = function (t) {
              try {
                return t.getBoundingClientRect();
              } catch (e) {
                return {
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  width: 0,
                  height: 0,
                };
              }
            }),
            (e.prototype.getTitle = function (t) {
              return t.title;
            }),
            (e.prototype.setTitle = function (t, e) {
              t.title = e || "";
            }),
            (e.prototype.elementMatches = function (t, e) {
              return (
                !!this.isElementNode(t) &&
                ((t.matches && t.matches(e)) ||
                  (t.msMatchesSelector && t.msMatchesSelector(e)) ||
                  (t.webkitMatchesSelector && t.webkitMatchesSelector(e)))
              );
            }),
            (e.prototype.isTemplateElement = function (t) {
              return this.isElementNode(t) && "TEMPLATE" === t.nodeName;
            }),
            (e.prototype.isTextNode = function (t) {
              return t.nodeType === Node.TEXT_NODE;
            }),
            (e.prototype.isCommentNode = function (t) {
              return t.nodeType === Node.COMMENT_NODE;
            }),
            (e.prototype.isElementNode = function (t) {
              return t.nodeType === Node.ELEMENT_NODE;
            }),
            (e.prototype.hasShadowRoot = function (t) {
              return null != t.shadowRoot && t instanceof HTMLElement;
            }),
            (e.prototype.isShadowRoot = function (t) {
              return t instanceof DocumentFragment;
            }),
            (e.prototype.importIntoDoc = function (t) {
              return document.importNode(this.templateAwareRoot(t), !0);
            }),
            (e.prototype.adoptNode = function (t) {
              return document.adoptNode(t);
            }),
            (e.prototype.getHref = function (t) {
              return t.getAttribute("href");
            }),
            (e.prototype.getEventKey = function (t) {
              var e = t.key;
              if (null == e) {
                if (null == (e = t.keyIdentifier)) return "Unidentified";
                e.startsWith("U+") &&
                  ((e = String.fromCharCode(parseInt(e.substring(2), 16))),
                  3 === t.location && Bu.hasOwnProperty(e) && (e = Bu[e]));
              }
              return zu[e] || e;
            }),
            (e.prototype.getGlobalEventTarget = function (t, e) {
              return "window" === e
                ? window
                : "document" === e
                ? t
                : "body" === e
                ? t.body
                : null;
            }),
            (e.prototype.getHistory = function () {
              return window.history;
            }),
            (e.prototype.getLocation = function () {
              return window.location;
            }),
            (e.prototype.getBaseHref = function (t) {
              var e,
                n =
                  Wu || (Wu = document.querySelector("base"))
                    ? Wu.getAttribute("href")
                    : null;
              return null == n
                ? null
                : ((e = n),
                  Lu || (Lu = document.createElement("a")),
                  Lu.setAttribute("href", e),
                  "/" === Lu.pathname.charAt(0)
                    ? Lu.pathname
                    : "/" + Lu.pathname);
            }),
            (e.prototype.resetBaseElement = function () {
              Wu = null;
            }),
            (e.prototype.getUserAgent = function () {
              return window.navigator.userAgent;
            }),
            (e.prototype.setData = function (t, e, n) {
              this.setAttribute(t, "data-" + e, n);
            }),
            (e.prototype.getData = function (t, e) {
              return this.getAttribute(t, "data-" + e);
            }),
            (e.prototype.getComputedStyle = function (t) {
              return getComputedStyle(t);
            }),
            (e.prototype.supportsWebAnimation = function () {
              return "function" == typeof Element.prototype.animate;
            }),
            (e.prototype.performanceNow = function () {
              return window.performance && window.performance.now
                ? window.performance.now()
                : new Date().getTime();
            }),
            (e.prototype.supportsCookies = function () {
              return !0;
            }),
            (e.prototype.getCookie = function (t) {
              return Es(document.cookie, t);
            }),
            (e.prototype.setCookie = function (t, e) {
              document.cookie =
                encodeURIComponent(t) + "=" + encodeURIComponent(e);
            }),
            e
          );
        })(Uu),
        Wu = null;
      function Qu() {
        return !!window.history.pushState;
      }
      var Ku = (function (t) {
          function e(e) {
            var n = t.call(this) || this;
            return (n._doc = e), n._init(), n;
          }
          return (
            Object(r.b)(e, t),
            (e.prototype._init = function () {
              (this.location = Fu().getLocation()),
                (this._history = Fu().getHistory());
            }),
            (e.prototype.getBaseHrefFromDOM = function () {
              return Fu().getBaseHref(this._doc);
            }),
            (e.prototype.onPopState = function (t) {
              Fu()
                .getGlobalEventTarget(this._doc, "window")
                .addEventListener("popstate", t, !1);
            }),
            (e.prototype.onHashChange = function (t) {
              Fu()
                .getGlobalEventTarget(this._doc, "window")
                .addEventListener("hashchange", t, !1);
            }),
            Object.defineProperty(e.prototype, "href", {
              get: function () {
                return this.location.href;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "protocol", {
              get: function () {
                return this.location.protocol;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "hostname", {
              get: function () {
                return this.location.hostname;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "port", {
              get: function () {
                return this.location.port;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "pathname", {
              get: function () {
                return this.location.pathname;
              },
              set: function (t) {
                this.location.pathname = t;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "search", {
              get: function () {
                return this.location.search;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "hash", {
              get: function () {
                return this.location.hash;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (e.prototype.pushState = function (t, e, n) {
              Qu()
                ? this._history.pushState(t, e, n)
                : (this.location.hash = n);
            }),
            (e.prototype.replaceState = function (t, e, n) {
              Qu()
                ? this._history.replaceState(t, e, n)
                : (this.location.hash = n);
            }),
            (e.prototype.forward = function () {
              this._history.forward();
            }),
            (e.prototype.back = function () {
              this._history.back();
            }),
            (e.prototype.getState = function () {
              return this._history.state;
            }),
            e
          );
        })(hs),
        Zu = new Et("TRANSITION_ID"),
        $u = [
          {
            provide: Po,
            useFactory: function (t, e, n) {
              return function () {
                n.get(Ao).donePromise.then(function () {
                  var n = Fu();
                  Array.prototype.slice
                    .apply(n.querySelectorAll(e, "style[ng-transition]"))
                    .filter(function (e) {
                      return n.getAttribute(e, "ng-transition") === t;
                    })
                    .forEach(function (t) {
                      return n.remove(t);
                    });
                });
              };
            },
            deps: [Zu, Fs, Pe],
            multi: !0,
          },
        ],
        Xu = (function () {
          function t() {}
          return (
            (t.init = function () {
              var e;
              (e = new t()), (pi = e);
            }),
            (t.prototype.addToWindow = function (t) {
              (Ct.getAngularTestability = function (e, n) {
                void 0 === n && (n = !0);
                var r = t.findTestabilityInTree(e, n);
                if (null == r)
                  throw new Error("Could not find testability for element.");
                return r;
              }),
                (Ct.getAllAngularTestabilities = function () {
                  return t.getAllTestabilities();
                }),
                (Ct.getAllAngularRootElements = function () {
                  return t.getAllRootElements();
                }),
                Ct.frameworkStabilizers || (Ct.frameworkStabilizers = []),
                Ct.frameworkStabilizers.push(function (t) {
                  var e = Ct.getAllAngularTestabilities(),
                    n = e.length,
                    r = !1,
                    o = function (e) {
                      (r = r || e), 0 == --n && t(r);
                    };
                  e.forEach(function (t) {
                    t.whenStable(o);
                  });
                });
            }),
            (t.prototype.findTestabilityInTree = function (t, e, n) {
              if (null == e) return null;
              var r = t.getTestability(e);
              return null != r
                ? r
                : n
                ? Fu().isShadowRoot(e)
                  ? this.findTestabilityInTree(t, Fu().getHost(e), !0)
                  : this.findTestabilityInTree(t, Fu().parentElement(e), !0)
                : null;
            }),
            t
          );
        })();
      function Ju(t, e) {
        ("undefined" != typeof COMPILED && COMPILED) ||
          ((Ct.ng = Ct.ng || {})[t] = e);
      }
      var Yu = (function () {
        return { ApplicationRef: bi, NgZone: ni };
      })();
      function tl(t) {
        return Ai(t);
      }
      var el = new Et("EventManagerPlugins"),
        nl = (function () {
          function t(t, e) {
            var n = this;
            (this._zone = e),
              (this._eventNameToPlugin = new Map()),
              t.forEach(function (t) {
                return (t.manager = n);
              }),
              (this._plugins = t.slice().reverse());
          }
          return (
            (t.prototype.addEventListener = function (t, e, n) {
              return this._findPluginFor(e).addEventListener(t, e, n);
            }),
            (t.prototype.addGlobalEventListener = function (t, e, n) {
              return this._findPluginFor(e).addGlobalEventListener(t, e, n);
            }),
            (t.prototype.getZone = function () {
              return this._zone;
            }),
            (t.prototype._findPluginFor = function (t) {
              var e = this._eventNameToPlugin.get(t);
              if (e) return e;
              for (var n = this._plugins, r = 0; r < n.length; r++) {
                var o = n[r];
                if (o.supports(t)) return this._eventNameToPlugin.set(t, o), o;
              }
              throw new Error("No event manager plugin found for event " + t);
            }),
            t
          );
        })(),
        rl = (function () {
          function t(t) {
            this._doc = t;
          }
          return (
            (t.prototype.addGlobalEventListener = function (t, e, n) {
              var r = Fu().getGlobalEventTarget(this._doc, t);
              if (!r)
                throw new Error(
                  "Unsupported event target " + r + " for event " + e
                );
              return this.addEventListener(r, e, n);
            }),
            t
          );
        })(),
        ol = (function () {
          function t() {
            this._stylesSet = new Set();
          }
          return (
            (t.prototype.addStyles = function (t) {
              var e = this,
                n = new Set();
              t.forEach(function (t) {
                e._stylesSet.has(t) || (e._stylesSet.add(t), n.add(t));
              }),
                this.onStylesAdded(n);
            }),
            (t.prototype.onStylesAdded = function (t) {}),
            (t.prototype.getAllStyles = function () {
              return Array.from(this._stylesSet);
            }),
            t
          );
        })(),
        il = (function (t) {
          function e(e) {
            var n = t.call(this) || this;
            return (
              (n._doc = e),
              (n._hostNodes = new Set()),
              (n._styleNodes = new Set()),
              n._hostNodes.add(e.head),
              n
            );
          }
          return (
            Object(r.b)(e, t),
            (e.prototype._addStylesToHost = function (t, e) {
              var n = this;
              t.forEach(function (t) {
                var r = n._doc.createElement("style");
                (r.textContent = t), n._styleNodes.add(e.appendChild(r));
              });
            }),
            (e.prototype.addHost = function (t) {
              this._addStylesToHost(this._stylesSet, t), this._hostNodes.add(t);
            }),
            (e.prototype.removeHost = function (t) {
              this._hostNodes.delete(t);
            }),
            (e.prototype.onStylesAdded = function (t) {
              var e = this;
              this._hostNodes.forEach(function (n) {
                return e._addStylesToHost(t, n);
              });
            }),
            (e.prototype.ngOnDestroy = function () {
              this._styleNodes.forEach(function (t) {
                return Fu().remove(t);
              });
            }),
            e
          );
        })(ol),
        al = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
        },
        sl = /%COMP%/g,
        ul = "_nghost-%COMP%",
        ll = "_ngcontent-%COMP%";
      function cl(t, e, n) {
        for (var r = 0; r < e.length; r++) {
          var o = e[r];
          Array.isArray(o) ? cl(t, o, n) : ((o = o.replace(sl, t)), n.push(o));
        }
        return n;
      }
      function hl(t) {
        return function (e) {
          !1 === t(e) && (e.preventDefault(), (e.returnValue = !1));
        };
      }
      var pl = (function () {
          function t(t, e, n) {
            (this.eventManager = t),
              (this.sharedStylesHost = e),
              (this.appId = n),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new fl(t));
          }
          return (
            (t.prototype.createRenderer = function (t, e) {
              if (!t || !e) return this.defaultRenderer;
              switch (e.encapsulation) {
                case Ut.Emulated:
                  var n = this.rendererByCompId.get(e.id);
                  return (
                    n ||
                      ((n = new yl(
                        this.eventManager,
                        this.sharedStylesHost,
                        e,
                        this.appId
                      )),
                      this.rendererByCompId.set(e.id, n)),
                    n.applyToHost(t),
                    n
                  );
                case Ut.Native:
                case Ut.ShadowDom:
                  return new gl(this.eventManager, this.sharedStylesHost, t, e);
                default:
                  if (!this.rendererByCompId.has(e.id)) {
                    var r = cl(e.id, e.styles, []);
                    this.sharedStylesHost.addStyles(r),
                      this.rendererByCompId.set(e.id, this.defaultRenderer);
                  }
                  return this.defaultRenderer;
              }
            }),
            (t.prototype.begin = function () {}),
            (t.prototype.end = function () {}),
            t
          );
        })(),
        fl = (function () {
          function t(t) {
            (this.eventManager = t), (this.data = Object.create(null));
          }
          return (
            (t.prototype.destroy = function () {}),
            (t.prototype.createElement = function (t, e) {
              return e
                ? document.createElementNS(al[e] || e, t)
                : document.createElement(t);
            }),
            (t.prototype.createComment = function (t) {
              return document.createComment(t);
            }),
            (t.prototype.createText = function (t) {
              return document.createTextNode(t);
            }),
            (t.prototype.appendChild = function (t, e) {
              t.appendChild(e);
            }),
            (t.prototype.insertBefore = function (t, e, n) {
              t && t.insertBefore(e, n);
            }),
            (t.prototype.removeChild = function (t, e) {
              t && t.removeChild(e);
            }),
            (t.prototype.selectRootElement = function (t, e) {
              var n = "string" == typeof t ? document.querySelector(t) : t;
              if (!n)
                throw new Error(
                  'The selector "' + t + '" did not match any elements'
                );
              return e || (n.textContent = ""), n;
            }),
            (t.prototype.parentNode = function (t) {
              return t.parentNode;
            }),
            (t.prototype.nextSibling = function (t) {
              return t.nextSibling;
            }),
            (t.prototype.setAttribute = function (t, e, n, r) {
              if (r) {
                e = r + ":" + e;
                var o = al[r];
                o ? t.setAttributeNS(o, e, n) : t.setAttribute(e, n);
              } else t.setAttribute(e, n);
            }),
            (t.prototype.removeAttribute = function (t, e, n) {
              if (n) {
                var r = al[n];
                r ? t.removeAttributeNS(r, e) : t.removeAttribute(n + ":" + e);
              } else t.removeAttribute(e);
            }),
            (t.prototype.addClass = function (t, e) {
              t.classList.add(e);
            }),
            (t.prototype.removeClass = function (t, e) {
              t.classList.remove(e);
            }),
            (t.prototype.setStyle = function (t, e, n, r) {
              r & un.DashCase
                ? t.style.setProperty(e, n, r & un.Important ? "important" : "")
                : (t.style[e] = n);
            }),
            (t.prototype.removeStyle = function (t, e, n) {
              n & un.DashCase ? t.style.removeProperty(e) : (t.style[e] = "");
            }),
            (t.prototype.setProperty = function (t, e, n) {
              ml(e, "property"), (t[e] = n);
            }),
            (t.prototype.setValue = function (t, e) {
              t.nodeValue = e;
            }),
            (t.prototype.listen = function (t, e, n) {
              return (
                ml(e, "listener"),
                "string" == typeof t
                  ? this.eventManager.addGlobalEventListener(t, e, hl(n))
                  : this.eventManager.addEventListener(t, e, hl(n))
              );
            }),
            t
          );
        })(),
        dl = (function () {
          return "@".charCodeAt(0);
        })();
      function ml(t, e) {
        if (t.charCodeAt(0) === dl)
          throw new Error(
            "Found the synthetic " +
              e +
              " " +
              t +
              '. Please include either "BrowserAnimationsModule" or "NoopAnimationsModule" in your application.'
          );
      }
      var yl = (function (t) {
          function e(e, n, r, o) {
            var i = t.call(this, e) || this;
            i.component = r;
            var a = cl(o + "-" + r.id, r.styles, []);
            return (
              n.addStyles(a),
              (i.contentAttr = ll.replace(sl, o + "-" + r.id)),
              (i.hostAttr = ul.replace(sl, o + "-" + r.id)),
              i
            );
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.applyToHost = function (e) {
              t.prototype.setAttribute.call(this, e, this.hostAttr, "");
            }),
            (e.prototype.createElement = function (e, n) {
              var r = t.prototype.createElement.call(this, e, n);
              return (
                t.prototype.setAttribute.call(this, r, this.contentAttr, ""), r
              );
            }),
            e
          );
        })(fl),
        gl = (function (t) {
          function e(e, n, r, o) {
            var i = t.call(this, e) || this;
            (i.sharedStylesHost = n),
              (i.hostEl = r),
              (i.component = o),
              (i.shadowRoot =
                o.encapsulation === Ut.ShadowDom
                  ? r.attachShadow({ mode: "open" })
                  : r.createShadowRoot()),
              i.sharedStylesHost.addHost(i.shadowRoot);
            for (var a = cl(o.id, o.styles, []), s = 0; s < a.length; s++) {
              var u = document.createElement("style");
              (u.textContent = a[s]), i.shadowRoot.appendChild(u);
            }
            return i;
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.nodeOrShadowRoot = function (t) {
              return t === this.hostEl ? this.shadowRoot : t;
            }),
            (e.prototype.destroy = function () {
              this.sharedStylesHost.removeHost(this.shadowRoot);
            }),
            (e.prototype.appendChild = function (e, n) {
              return t.prototype.appendChild.call(
                this,
                this.nodeOrShadowRoot(e),
                n
              );
            }),
            (e.prototype.insertBefore = function (e, n, r) {
              return t.prototype.insertBefore.call(
                this,
                this.nodeOrShadowRoot(e),
                n,
                r
              );
            }),
            (e.prototype.removeChild = function (e, n) {
              return t.prototype.removeChild.call(
                this,
                this.nodeOrShadowRoot(e),
                n
              );
            }),
            (e.prototype.parentNode = function (e) {
              return this.nodeOrShadowRoot(
                t.prototype.parentNode.call(this, this.nodeOrShadowRoot(e))
              );
            }),
            e
          );
        })(fl),
        vl = (function () {
          return (
            ("undefined" != typeof Zone && Zone.__symbol__) ||
            function (t) {
              return "__zone_symbol__" + t;
            }
          );
        })(),
        bl = vl("addEventListener"),
        _l = vl("removeEventListener"),
        wl = {},
        Cl = "__zone_symbol__propagationStopped",
        El = (function () {
          var t = "undefined" != typeof Zone && Zone[vl("BLACK_LISTED_EVENTS")];
          if (t) {
            var e = {};
            return (
              t.forEach(function (t) {
                e[t] = t;
              }),
              e
            );
          }
        })(),
        Sl = function (t) {
          return !!El && El.hasOwnProperty(t);
        },
        kl = function (t) {
          var e = wl[t.type];
          if (e) {
            var n = this[e];
            if (n) {
              var r = [t];
              if (1 === n.length)
                return (a = n[0]).zone !== Zone.current
                  ? a.zone.run(a.handler, this, r)
                  : a.handler.apply(this, r);
              for (
                var o = n.slice(), i = 0;
                i < o.length && !0 !== t[Cl];
                i++
              ) {
                var a;
                (a = o[i]).zone !== Zone.current
                  ? a.zone.run(a.handler, this, r)
                  : a.handler.apply(this, r);
              }
            }
          }
        },
        Tl = (function (t) {
          function e(e, n, r) {
            var o = t.call(this, e) || this;
            return (
              (o.ngZone = n),
              (r &&
                (function (t) {
                  return t === Us;
                })(r)) ||
                o.patchEvent(),
              o
            );
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.patchEvent = function () {
              if (
                "undefined" != typeof Event &&
                Event &&
                Event.prototype &&
                !Event.prototype.__zone_symbol__stopImmediatePropagation
              ) {
                var t =
                  (Event.prototype.__zone_symbol__stopImmediatePropagation =
                    Event.prototype.stopImmediatePropagation);
                Event.prototype.stopImmediatePropagation = function () {
                  this && (this[Cl] = !0), t && t.apply(this, arguments);
                };
              }
            }),
            (e.prototype.supports = function (t) {
              return !0;
            }),
            (e.prototype.addEventListener = function (t, e, n) {
              var r = this,
                o = n;
              if (!t[bl] || (ni.isInAngularZone() && !Sl(e)))
                t.addEventListener(e, o, !1);
              else {
                var i = wl[e];
                i || (i = wl[e] = vl("ANGULAR" + e + "FALSE"));
                var a = t[i],
                  s = a && a.length > 0;
                a || (a = t[i] = []);
                var u = Sl(e) ? Zone.root : Zone.current;
                if (0 === a.length) a.push({ zone: u, handler: o });
                else {
                  for (var l = !1, c = 0; c < a.length; c++)
                    if (a[c].handler === o) {
                      l = !0;
                      break;
                    }
                  l || a.push({ zone: u, handler: o });
                }
                s || t[bl](e, kl, !1);
              }
              return function () {
                return r.removeEventListener(t, e, o);
              };
            }),
            (e.prototype.removeEventListener = function (t, e, n) {
              var r = t[_l];
              if (!r) return t.removeEventListener.apply(t, [e, n, !1]);
              var o = wl[e],
                i = o && t[o];
              if (!i) return t.removeEventListener.apply(t, [e, n, !1]);
              for (var a = !1, s = 0; s < i.length; s++)
                if (i[s].handler === n) {
                  (a = !0), i.splice(s, 1);
                  break;
                }
              a
                ? 0 === i.length && r.apply(t, [e, kl, !1])
                : t.removeEventListener.apply(t, [e, n, !1]);
            }),
            e
          );
        })(rl),
        xl = {
          pan: !0,
          panstart: !0,
          panmove: !0,
          panend: !0,
          pancancel: !0,
          panleft: !0,
          panright: !0,
          panup: !0,
          pandown: !0,
          pinch: !0,
          pinchstart: !0,
          pinchmove: !0,
          pinchend: !0,
          pinchcancel: !0,
          pinchin: !0,
          pinchout: !0,
          press: !0,
          pressup: !0,
          rotate: !0,
          rotatestart: !0,
          rotatemove: !0,
          rotateend: !0,
          rotatecancel: !0,
          swipe: !0,
          swipeleft: !0,
          swiperight: !0,
          swipeup: !0,
          swipedown: !0,
          tap: !0,
        },
        Ol = new Et("HammerGestureConfig"),
        Pl = new Et("HammerLoader"),
        Al = (function () {
          function t() {
            (this.events = []), (this.overrides = {});
          }
          return (
            (t.prototype.buildHammer = function (t) {
              var e = new Hammer(t, this.options);
              for (var n in (e.get("pinch").set({ enable: !0 }),
              e.get("rotate").set({ enable: !0 }),
              this.overrides))
                e.get(n).set(this.overrides[n]);
              return e;
            }),
            t
          );
        })(),
        Il = (function (t) {
          function e(e, n, r, o) {
            var i = t.call(this, e) || this;
            return (i._config = n), (i.console = r), (i.loader = o), i;
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.supports = function (t) {
              return !(
                (!xl.hasOwnProperty(t.toLowerCase()) &&
                  !this.isCustomEvent(t)) ||
                (!window.Hammer &&
                  !this.loader &&
                  (this.console.warn(
                    'The "' +
                      t +
                      '" event cannot be bound because Hammer.JS is not loaded and no custom loader has been specified.'
                  ),
                  1))
              );
            }),
            (e.prototype.addEventListener = function (t, e, n) {
              var r = this,
                o = this.manager.getZone();
              if (((e = e.toLowerCase()), !window.Hammer && this.loader)) {
                var i = !1,
                  a = function () {
                    i = !0;
                  };
                return (
                  this.loader()
                    .then(function () {
                      if (!window.Hammer)
                        return (
                          r.console.warn(
                            "The custom HAMMER_LOADER completed, but Hammer.JS is not present."
                          ),
                          void (a = function () {})
                        );
                      i || (a = r.addEventListener(t, e, n));
                    })
                    .catch(function () {
                      r.console.warn(
                        'The "' +
                          e +
                          '" event cannot be bound because the custom Hammer.JS loader failed.'
                      ),
                        (a = function () {});
                    }),
                  function () {
                    a();
                  }
                );
              }
              return o.runOutsideAngular(function () {
                var i = r._config.buildHammer(t),
                  a = function (t) {
                    o.runGuarded(function () {
                      n(t);
                    });
                  };
                return (
                  i.on(e, a),
                  function () {
                    i.off(e, a), "function" == typeof i.destroy && i.destroy();
                  }
                );
              });
            }),
            (e.prototype.isCustomEvent = function (t) {
              return this._config.events.indexOf(t) > -1;
            }),
            e
          );
        })(rl),
        Nl = ["alt", "control", "meta", "shift"],
        Rl = {
          alt: function (t) {
            return t.altKey;
          },
          control: function (t) {
            return t.ctrlKey;
          },
          meta: function (t) {
            return t.metaKey;
          },
          shift: function (t) {
            return t.shiftKey;
          },
        },
        Dl = (function (t) {
          function e(e) {
            return t.call(this, e) || this;
          }
          var n;
          return (
            Object(r.b)(e, t),
            (n = e),
            (e.prototype.supports = function (t) {
              return null != n.parseEventName(t);
            }),
            (e.prototype.addEventListener = function (t, e, r) {
              var o = n.parseEventName(e),
                i = n.eventCallback(o.fullKey, r, this.manager.getZone());
              return this.manager.getZone().runOutsideAngular(function () {
                return Fu().onAndCancel(t, o.domEventName, i);
              });
            }),
            (e.parseEventName = function (t) {
              var e = t.toLowerCase().split("."),
                r = e.shift();
              if (0 === e.length || ("keydown" !== r && "keyup" !== r))
                return null;
              var o = n._normalizeKey(e.pop()),
                i = "";
              if (
                (Nl.forEach(function (t) {
                  var n = e.indexOf(t);
                  n > -1 && (e.splice(n, 1), (i += t + "."));
                }),
                (i += o),
                0 != e.length || 0 === o.length)
              )
                return null;
              var a = {};
              return (a.domEventName = r), (a.fullKey = i), a;
            }),
            (e.getEventFullKey = function (t) {
              var e = "",
                n = Fu().getEventKey(t);
              return (
                " " === (n = n.toLowerCase())
                  ? (n = "space")
                  : "." === n && (n = "dot"),
                Nl.forEach(function (r) {
                  r != n && (0, Rl[r])(t) && (e += r + ".");
                }),
                (e += n)
              );
            }),
            (e.eventCallback = function (t, e, r) {
              return function (o) {
                n.getEventFullKey(o) === t &&
                  r.runGuarded(function () {
                    return e(o);
                  });
              };
            }),
            (e._normalizeKey = function (t) {
              switch (t) {
                case "esc":
                  return "escape";
                default:
                  return t;
              }
            }),
            e
          );
        })(rl),
        jl = (function () {
          return function () {};
        })(),
        Ml = (function (t) {
          function e(e) {
            var n = t.call(this) || this;
            return (n._doc = e), n;
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.sanitize = function (t, e) {
              if (null == e) return null;
              switch (t) {
                case be.NONE:
                  return e;
                case be.HTML:
                  return e instanceof Fl
                    ? e.changingThisBreaksApplicationSecurity
                    : (this.checkNotSafeValue(e, "HTML"),
                      (function (t, e) {
                        var n = null;
                        try {
                          oe = oe || new Jt(t);
                          var r = e ? String(e) : "";
                          n = oe.getInertBodyElement(r);
                          var o = 5,
                            i = r;
                          do {
                            if (0 === o)
                              throw new Error(
                                "Failed to sanitize html because the input is unstable"
                              );
                            o--,
                              (r = i),
                              (i = n.innerHTML),
                              (n = oe.getInertBodyElement(r));
                          } while (r !== i);
                          var a = new de(),
                            s = a.sanitizeChildren(ve(n) || n);
                          return (
                            Xt() &&
                              a.sanitizedSomething &&
                              console.warn(
                                "WARNING: sanitizing HTML stripped some content, see http://g.co/ng/security#xss"
                              ),
                            s
                          );
                        } finally {
                          if (n)
                            for (var u = ve(n) || n; u.firstChild; )
                              u.removeChild(u.firstChild);
                        }
                      })(this._doc, String(e)));
                case be.STYLE:
                  return e instanceof Ll
                    ? e.changingThisBreaksApplicationSecurity
                    : (this.checkNotSafeValue(e, "Style"),
                      (function (t) {
                        if (!(t = String(t).trim())) return "";
                        var e = t.match(Ce);
                        return (e && ee(e[1]) === e[1]) ||
                          (t.match(we) &&
                            (function (t) {
                              for (
                                var e = !0, n = !0, r = 0;
                                r < t.length;
                                r++
                              ) {
                                var o = t.charAt(r);
                                "'" === o && n
                                  ? (e = !e)
                                  : '"' === o && e && (n = !n);
                              }
                              return e && n;
                            })(t))
                          ? t
                          : (Xt() &&
                              console.warn(
                                "WARNING: sanitizing unsafe style value " +
                                  t +
                                  " (see http://g.co/ng/security#xss)."
                              ),
                            "unsafe");
                      })(e));
                case be.SCRIPT:
                  if (e instanceof Ul)
                    return e.changingThisBreaksApplicationSecurity;
                  throw (
                    (this.checkNotSafeValue(e, "Script"),
                    new Error("unsafe value used in a script context"))
                  );
                case be.URL:
                  return e instanceof zl || e instanceof Hl
                    ? e.changingThisBreaksApplicationSecurity
                    : (this.checkNotSafeValue(e, "URL"), ee(String(e)));
                case be.RESOURCE_URL:
                  if (e instanceof zl)
                    return e.changingThisBreaksApplicationSecurity;
                  throw (
                    (this.checkNotSafeValue(e, "ResourceURL"),
                    new Error(
                      "unsafe value used in a resource URL context (see http://g.co/ng/security#xss)"
                    ))
                  );
                default:
                  throw new Error(
                    "Unexpected SecurityContext " +
                      t +
                      " (see http://g.co/ng/security#xss)"
                  );
              }
            }),
            (e.prototype.checkNotSafeValue = function (t, e) {
              if (t instanceof Vl)
                throw new Error(
                  "Required a safe " +
                    e +
                    ", got a " +
                    t.getTypeName() +
                    " (see http://g.co/ng/security#xss)"
                );
            }),
            (e.prototype.bypassSecurityTrustHtml = function (t) {
              return new Fl(t);
            }),
            (e.prototype.bypassSecurityTrustStyle = function (t) {
              return new Ll(t);
            }),
            (e.prototype.bypassSecurityTrustScript = function (t) {
              return new Ul(t);
            }),
            (e.prototype.bypassSecurityTrustUrl = function (t) {
              return new Hl(t);
            }),
            (e.prototype.bypassSecurityTrustResourceUrl = function (t) {
              return new zl(t);
            }),
            e
          );
        })(jl),
        Vl = (function () {
          function t(t) {
            this.changingThisBreaksApplicationSecurity = t;
          }
          return (
            (t.prototype.toString = function () {
              return (
                "SafeValue must use [property]=binding: " +
                this.changingThisBreaksApplicationSecurity +
                " (see http://g.co/ng/security#xss)"
              );
            }),
            t
          );
        })(),
        Fl = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.getTypeName = function () {
              return "HTML";
            }),
            e
          );
        })(Vl),
        Ll = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.getTypeName = function () {
              return "Style";
            }),
            e
          );
        })(Vl),
        Ul = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.getTypeName = function () {
              return "Script";
            }),
            e
          );
        })(Vl),
        Hl = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.getTypeName = function () {
              return "URL";
            }),
            e
          );
        })(Vl),
        zl = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.getTypeName = function () {
              return "ResourceURL";
            }),
            e
          );
        })(Vl),
        Bl = mi(Ni, "browser", [
          { provide: jo, useValue: Ls },
          {
            provide: Do,
            useValue: function () {
              Gu.makeCurrent(), Xu.init();
            },
            multi: !0,
          },
          { provide: hs, useClass: Ku, deps: [Fs] },
          {
            provide: Fs,
            useFactory: function () {
              return document;
            },
            deps: [],
          },
        ]);
      function ql() {
        return new Kt();
      }
      var Gl = (function () {
        function t(t) {
          if (t)
            throw new Error(
              "BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead."
            );
        }
        var e;
        return (
          (e = t),
          (t.withServerTransition = function (t) {
            return {
              ngModule: e,
              providers: [
                { provide: Io, useValue: t.appId },
                { provide: Zu, useExisting: Io },
                $u,
              ],
            };
          }),
          t
        );
      })();
      "undefined" != typeof window && window;
      var Wl = (function () {
          return function (t, e) {
            (this.id = t), (this.url = e);
          };
        })(),
        Ql = (function (t) {
          function e(e, n, r, o) {
            void 0 === r && (r = "imperative"), void 0 === o && (o = null);
            var i = t.call(this, e, n) || this;
            return (i.navigationTrigger = r), (i.restoredState = o), i;
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.toString = function () {
              return (
                "NavigationStart(id: " + this.id + ", url: '" + this.url + "')"
              );
            }),
            e
          );
        })(Wl),
        Kl = (function (t) {
          function e(e, n, r) {
            var o = t.call(this, e, n) || this;
            return (o.urlAfterRedirects = r), o;
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.toString = function () {
              return (
                "NavigationEnd(id: " +
                this.id +
                ", url: '" +
                this.url +
                "', urlAfterRedirects: '" +
                this.urlAfterRedirects +
                "')"
              );
            }),
            e
          );
        })(Wl),
        Zl = (function (t) {
          function e(e, n, r) {
            var o = t.call(this, e, n) || this;
            return (o.reason = r), o;
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.toString = function () {
              return (
                "NavigationCancel(id: " + this.id + ", url: '" + this.url + "')"
              );
            }),
            e
          );
        })(Wl),
        $l = (function (t) {
          function e(e, n, r) {
            var o = t.call(this, e, n) || this;
            return (o.error = r), o;
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.toString = function () {
              return (
                "NavigationError(id: " +
                this.id +
                ", url: '" +
                this.url +
                "', error: " +
                this.error +
                ")"
              );
            }),
            e
          );
        })(Wl),
        Xl = (function (t) {
          function e(e, n, r, o) {
            var i = t.call(this, e, n) || this;
            return (i.urlAfterRedirects = r), (i.state = o), i;
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.toString = function () {
              return (
                "RoutesRecognized(id: " +
                this.id +
                ", url: '" +
                this.url +
                "', urlAfterRedirects: '" +
                this.urlAfterRedirects +
                "', state: " +
                this.state +
                ")"
              );
            }),
            e
          );
        })(Wl),
        Jl = (function (t) {
          function e(e, n, r, o) {
            var i = t.call(this, e, n) || this;
            return (i.urlAfterRedirects = r), (i.state = o), i;
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.toString = function () {
              return (
                "GuardsCheckStart(id: " +
                this.id +
                ", url: '" +
                this.url +
                "', urlAfterRedirects: '" +
                this.urlAfterRedirects +
                "', state: " +
                this.state +
                ")"
              );
            }),
            e
          );
        })(Wl),
        Yl = (function (t) {
          function e(e, n, r, o, i) {
            var a = t.call(this, e, n) || this;
            return (
              (a.urlAfterRedirects = r),
              (a.state = o),
              (a.shouldActivate = i),
              a
            );
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.toString = function () {
              return (
                "GuardsCheckEnd(id: " +
                this.id +
                ", url: '" +
                this.url +
                "', urlAfterRedirects: '" +
                this.urlAfterRedirects +
                "', state: " +
                this.state +
                ", shouldActivate: " +
                this.shouldActivate +
                ")"
              );
            }),
            e
          );
        })(Wl),
        tc = (function (t) {
          function e(e, n, r, o) {
            var i = t.call(this, e, n) || this;
            return (i.urlAfterRedirects = r), (i.state = o), i;
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.toString = function () {
              return (
                "ResolveStart(id: " +
                this.id +
                ", url: '" +
                this.url +
                "', urlAfterRedirects: '" +
                this.urlAfterRedirects +
                "', state: " +
                this.state +
                ")"
              );
            }),
            e
          );
        })(Wl),
        ec = (function (t) {
          function e(e, n, r, o) {
            var i = t.call(this, e, n) || this;
            return (i.urlAfterRedirects = r), (i.state = o), i;
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.toString = function () {
              return (
                "ResolveEnd(id: " +
                this.id +
                ", url: '" +
                this.url +
                "', urlAfterRedirects: '" +
                this.urlAfterRedirects +
                "', state: " +
                this.state +
                ")"
              );
            }),
            e
          );
        })(Wl),
        nc = (function () {
          function t(t) {
            this.route = t;
          }
          return (
            (t.prototype.toString = function () {
              return "RouteConfigLoadStart(path: " + this.route.path + ")";
            }),
            t
          );
        })(),
        rc = (function () {
          function t(t) {
            this.route = t;
          }
          return (
            (t.prototype.toString = function () {
              return "RouteConfigLoadEnd(path: " + this.route.path + ")";
            }),
            t
          );
        })(),
        oc = (function () {
          function t(t) {
            this.snapshot = t;
          }
          return (
            (t.prototype.toString = function () {
              return (
                "ChildActivationStart(path: '" +
                ((this.snapshot.routeConfig &&
                  this.snapshot.routeConfig.path) ||
                  "") +
                "')"
              );
            }),
            t
          );
        })(),
        ic = (function () {
          function t(t) {
            this.snapshot = t;
          }
          return (
            (t.prototype.toString = function () {
              return (
                "ChildActivationEnd(path: '" +
                ((this.snapshot.routeConfig &&
                  this.snapshot.routeConfig.path) ||
                  "") +
                "')"
              );
            }),
            t
          );
        })(),
        ac = (function () {
          function t(t) {
            this.snapshot = t;
          }
          return (
            (t.prototype.toString = function () {
              return (
                "ActivationStart(path: '" +
                ((this.snapshot.routeConfig &&
                  this.snapshot.routeConfig.path) ||
                  "") +
                "')"
              );
            }),
            t
          );
        })(),
        sc = (function () {
          function t(t) {
            this.snapshot = t;
          }
          return (
            (t.prototype.toString = function () {
              return (
                "ActivationEnd(path: '" +
                ((this.snapshot.routeConfig &&
                  this.snapshot.routeConfig.path) ||
                  "") +
                "')"
              );
            }),
            t
          );
        })(),
        uc = (function () {
          function t(t, e, n) {
            (this.routerEvent = t), (this.position = e), (this.anchor = n);
          }
          return (
            (t.prototype.toString = function () {
              return (
                "Scroll(anchor: '" +
                this.anchor +
                "', position: '" +
                (this.position
                  ? this.position[0] + ", " + this.position[1]
                  : null) +
                "')"
              );
            }),
            t
          );
        })(),
        lc = (function () {
          return function () {};
        })(),
        cc = "primary",
        hc = (function () {
          function t(t) {
            this.params = t || {};
          }
          return (
            (t.prototype.has = function (t) {
              return this.params.hasOwnProperty(t);
            }),
            (t.prototype.get = function (t) {
              if (this.has(t)) {
                var e = this.params[t];
                return Array.isArray(e) ? e[0] : e;
              }
              return null;
            }),
            (t.prototype.getAll = function (t) {
              if (this.has(t)) {
                var e = this.params[t];
                return Array.isArray(e) ? e : [e];
              }
              return [];
            }),
            Object.defineProperty(t.prototype, "keys", {
              get: function () {
                return Object.keys(this.params);
              },
              enumerable: !0,
              configurable: !0,
            }),
            t
          );
        })();
      function pc(t) {
        return new hc(t);
      }
      var fc = "ngNavigationCancelingError";
      function dc(t) {
        var e = Error("NavigationCancelingError: " + t);
        return (e[fc] = !0), e;
      }
      function mc(t, e, n) {
        var r = n.path.split("/");
        if (r.length > t.length) return null;
        if ("full" === n.pathMatch && (e.hasChildren() || r.length < t.length))
          return null;
        for (var o = {}, i = 0; i < r.length; i++) {
          var a = r[i],
            s = t[i];
          if (a.startsWith(":")) o[a.substring(1)] = s;
          else if (a !== s.path) return null;
        }
        return { consumed: t.slice(0, r.length), posParams: o };
      }
      var yc = (function () {
        return function (t, e) {
          (this.routes = t), (this.module = e);
        };
      })();
      function gc(t, e) {
        void 0 === e && (e = "");
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          vc(r, bc(e, r));
        }
      }
      function vc(t, e) {
        if (!t)
          throw new Error(
            "\n      Invalid configuration of route '" +
              e +
              "': Encountered undefined route.\n      The reason might be an extra comma.\n\n      Example:\n      const routes: Routes = [\n        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },\n        { path: 'dashboard',  component: DashboardComponent },, << two commas\n        { path: 'detail/:id', component: HeroDetailComponent }\n      ];\n    "
          );
        if (Array.isArray(t))
          throw new Error(
            "Invalid configuration of route '" +
              e +
              "': Array cannot be specified"
          );
        if (
          !t.component &&
          !t.children &&
          !t.loadChildren &&
          t.outlet &&
          t.outlet !== cc
        )
          throw new Error(
            "Invalid configuration of route '" +
              e +
              "': a componentless route without children or loadChildren cannot have a named outlet set"
          );
        if (t.redirectTo && t.children)
          throw new Error(
            "Invalid configuration of route '" +
              e +
              "': redirectTo and children cannot be used together"
          );
        if (t.redirectTo && t.loadChildren)
          throw new Error(
            "Invalid configuration of route '" +
              e +
              "': redirectTo and loadChildren cannot be used together"
          );
        if (t.children && t.loadChildren)
          throw new Error(
            "Invalid configuration of route '" +
              e +
              "': children and loadChildren cannot be used together"
          );
        if (t.redirectTo && t.component)
          throw new Error(
            "Invalid configuration of route '" +
              e +
              "': redirectTo and component cannot be used together"
          );
        if (t.path && t.matcher)
          throw new Error(
            "Invalid configuration of route '" +
              e +
              "': path and matcher cannot be used together"
          );
        if (
          void 0 === t.redirectTo &&
          !t.component &&
          !t.children &&
          !t.loadChildren
        )
          throw new Error(
            "Invalid configuration of route '" +
              e +
              "'. One of the following must be provided: component, redirectTo, children or loadChildren"
          );
        if (void 0 === t.path && void 0 === t.matcher)
          throw new Error(
            "Invalid configuration of route '" +
              e +
              "': routes must have either a path or a matcher specified"
          );
        if ("string" == typeof t.path && "/" === t.path.charAt(0))
          throw new Error(
            "Invalid configuration of route '" +
              e +
              "': path cannot start with a slash"
          );
        if ("" === t.path && void 0 !== t.redirectTo && void 0 === t.pathMatch)
          throw new Error(
            "Invalid configuration of route '{path: \"" +
              e +
              '", redirectTo: "' +
              t.redirectTo +
              "\"}': please provide 'pathMatch'. The default value of 'pathMatch' is 'prefix', but often the intent is to use 'full'."
          );
        if (
          void 0 !== t.pathMatch &&
          "full" !== t.pathMatch &&
          "prefix" !== t.pathMatch
        )
          throw new Error(
            "Invalid configuration of route '" +
              e +
              "': pathMatch can only be set to 'prefix' or 'full'"
          );
        t.children && gc(t.children, e);
      }
      function bc(t, e) {
        return e
          ? t || e.path
            ? t && !e.path
              ? t + "/"
              : !t && e.path
              ? e.path
              : t + "/" + e.path
            : ""
          : t;
      }
      function _c(t) {
        var e = t.children && t.children.map(_c),
          n = e ? Object(r.a)({}, t, { children: e }) : Object(r.a)({}, t);
        return (
          !n.component &&
            (e || n.loadChildren) &&
            n.outlet &&
            n.outlet !== cc &&
            (n.component = lc),
          n
        );
      }
      function wc(t, e) {
        var n,
          r = Object.keys(t),
          o = Object.keys(e);
        if (!r || !o || r.length != o.length) return !1;
        for (var i = 0; i < r.length; i++)
          if (t[(n = r[i])] !== e[n]) return !1;
        return !0;
      }
      function Cc(t) {
        return Array.prototype.concat.apply([], t);
      }
      function Ec(t) {
        return t.length > 0 ? t[t.length - 1] : null;
      }
      function Sc(t, e) {
        for (var n in t) t.hasOwnProperty(n) && e(t[n], n);
      }
      function kc(t) {
        return We(t) ? t : Ge(t) ? z(Promise.resolve(t)) : Bs(t);
      }
      function Tc(t, e, n) {
        return n
          ? (function (t, e) {
              return wc(t, e);
            })(t.queryParams, e.queryParams) &&
              (function t(e, n) {
                if (!Ac(e.segments, n.segments)) return !1;
                if (e.numberOfChildren !== n.numberOfChildren) return !1;
                for (var r in n.children) {
                  if (!e.children[r]) return !1;
                  if (!t(e.children[r], n.children[r])) return !1;
                }
                return !0;
              })(t.root, e.root)
          : (function (t, e) {
              return (
                Object.keys(e).length <= Object.keys(t).length &&
                Object.keys(e).every(function (n) {
                  return e[n] === t[n];
                })
              );
            })(t.queryParams, e.queryParams) &&
              (function t(e, n) {
                return (function e(n, r, o) {
                  if (n.segments.length > o.length)
                    return (
                      !!Ac((a = n.segments.slice(0, o.length)), o) &&
                      !r.hasChildren()
                    );
                  if (n.segments.length === o.length) {
                    if (!Ac(n.segments, o)) return !1;
                    for (var i in r.children) {
                      if (!n.children[i]) return !1;
                      if (!t(n.children[i], r.children[i])) return !1;
                    }
                    return !0;
                  }
                  var a = o.slice(0, n.segments.length),
                    s = o.slice(n.segments.length);
                  return (
                    !!Ac(n.segments, a) &&
                    !!n.children[cc] &&
                    e(n.children[cc], r, s)
                  );
                })(e, n, n.segments);
              })(t.root, e.root);
      }
      var xc = (function () {
          function t(t, e, n) {
            (this.root = t), (this.queryParams = e), (this.fragment = n);
          }
          return (
            Object.defineProperty(t.prototype, "queryParamMap", {
              get: function () {
                return (
                  this._queryParamMap ||
                    (this._queryParamMap = pc(this.queryParams)),
                  this._queryParamMap
                );
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.toString = function () {
              return Dc.serialize(this);
            }),
            t
          );
        })(),
        Oc = (function () {
          function t(t, e) {
            var n = this;
            (this.segments = t),
              (this.children = e),
              (this.parent = null),
              Sc(e, function (t, e) {
                return (t.parent = n);
              });
          }
          return (
            (t.prototype.hasChildren = function () {
              return this.numberOfChildren > 0;
            }),
            Object.defineProperty(t.prototype, "numberOfChildren", {
              get: function () {
                return Object.keys(this.children).length;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.toString = function () {
              return jc(this);
            }),
            t
          );
        })(),
        Pc = (function () {
          function t(t, e) {
            (this.path = t), (this.parameters = e);
          }
          return (
            Object.defineProperty(t.prototype, "parameterMap", {
              get: function () {
                return (
                  this._parameterMap ||
                    (this._parameterMap = pc(this.parameters)),
                  this._parameterMap
                );
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.toString = function () {
              return Hc(this);
            }),
            t
          );
        })();
      function Ac(t, e) {
        return (
          t.length === e.length &&
          t.every(function (t, n) {
            return t.path === e[n].path;
          })
        );
      }
      function Ic(t, e) {
        var n = [];
        return (
          Sc(t.children, function (t, r) {
            r === cc && (n = n.concat(e(t, r)));
          }),
          Sc(t.children, function (t, r) {
            r !== cc && (n = n.concat(e(t, r)));
          }),
          n
        );
      }
      var Nc = (function () {
          return function () {};
        })(),
        Rc = (function () {
          function t() {}
          return (
            (t.prototype.parse = function (t) {
              var e = new Wc(t);
              return new xc(
                e.parseRootSegment(),
                e.parseQueryParams(),
                e.parseFragment()
              );
            }),
            (t.prototype.serialize = function (t) {
              var e, n;
              return (
                "/" +
                (function t(e, n) {
                  if (!e.hasChildren()) return jc(e);
                  if (n) {
                    var r = e.children[cc] ? t(e.children[cc], !1) : "",
                      o = [];
                    return (
                      Sc(e.children, function (e, n) {
                        n !== cc && o.push(n + ":" + t(e, !1));
                      }),
                      o.length > 0 ? r + "(" + o.join("//") + ")" : r
                    );
                  }
                  var i = Ic(e, function (n, r) {
                    return r === cc
                      ? [t(e.children[cc], !1)]
                      : [r + ":" + t(n, !1)];
                  });
                  return jc(e) + "/(" + i.join("//") + ")";
                })(t.root, !0) +
                ((e = t.queryParams),
                (n = Object.keys(e).map(function (t) {
                  var n = e[t];
                  return Array.isArray(n)
                    ? n
                        .map(function (e) {
                          return Vc(t) + "=" + Vc(e);
                        })
                        .join("&")
                    : Vc(t) + "=" + Vc(n);
                })).length
                  ? "?" + n.join("&")
                  : "") +
                ("string" == typeof t.fragment
                  ? "#" + encodeURI(t.fragment)
                  : "")
              );
            }),
            t
          );
        })(),
        Dc = new Rc();
      function jc(t) {
        return t.segments
          .map(function (t) {
            return Hc(t);
          })
          .join("/");
      }
      function Mc(t) {
        return encodeURIComponent(t)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function Vc(t) {
        return Mc(t).replace(/%3B/gi, ";");
      }
      function Fc(t) {
        return Mc(t)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function Lc(t) {
        return decodeURIComponent(t);
      }
      function Uc(t) {
        return Lc(t.replace(/\+/g, "%20"));
      }
      function Hc(t) {
        return (
          "" +
          Fc(t.path) +
          ((e = t.parameters),
          Object.keys(e)
            .map(function (t) {
              return ";" + Fc(t) + "=" + Fc(e[t]);
            })
            .join(""))
        );
        var e;
      }
      var zc = /^[^\/()?;=#]+/;
      function Bc(t) {
        var e = t.match(zc);
        return e ? e[0] : "";
      }
      var qc = /^[^=?&#]+/,
        Gc = /^[^?&#]+/,
        Wc = (function () {
          function t(t) {
            (this.url = t), (this.remaining = t);
          }
          return (
            (t.prototype.parseRootSegment = function () {
              return (
                this.consumeOptional("/"),
                "" === this.remaining ||
                this.peekStartsWith("?") ||
                this.peekStartsWith("#")
                  ? new Oc([], {})
                  : new Oc([], this.parseChildren())
              );
            }),
            (t.prototype.parseQueryParams = function () {
              var t = {};
              if (this.consumeOptional("?"))
                do {
                  this.parseQueryParam(t);
                } while (this.consumeOptional("&"));
              return t;
            }),
            (t.prototype.parseFragment = function () {
              return this.consumeOptional("#")
                ? decodeURIComponent(this.remaining)
                : null;
            }),
            (t.prototype.parseChildren = function () {
              if ("" === this.remaining) return {};
              this.consumeOptional("/");
              var t = [];
              for (
                this.peekStartsWith("(") || t.push(this.parseSegment());
                this.peekStartsWith("/") &&
                !this.peekStartsWith("//") &&
                !this.peekStartsWith("/(");

              )
                this.capture("/"), t.push(this.parseSegment());
              var e = {};
              this.peekStartsWith("/(") &&
                (this.capture("/"), (e = this.parseParens(!0)));
              var n = {};
              return (
                this.peekStartsWith("(") && (n = this.parseParens(!1)),
                (t.length > 0 || Object.keys(e).length > 0) &&
                  (n[cc] = new Oc(t, e)),
                n
              );
            }),
            (t.prototype.parseSegment = function () {
              var t = Bc(this.remaining);
              if ("" === t && this.peekStartsWith(";"))
                throw new Error(
                  "Empty path url segment cannot have parameters: '" +
                    this.remaining +
                    "'."
                );
              return this.capture(t), new Pc(Lc(t), this.parseMatrixParams());
            }),
            (t.prototype.parseMatrixParams = function () {
              for (var t = {}; this.consumeOptional(";"); ) this.parseParam(t);
              return t;
            }),
            (t.prototype.parseParam = function (t) {
              var e = Bc(this.remaining);
              if (e) {
                this.capture(e);
                var n = "";
                if (this.consumeOptional("=")) {
                  var r = Bc(this.remaining);
                  r && this.capture((n = r));
                }
                t[Lc(e)] = Lc(n);
              }
            }),
            (t.prototype.parseQueryParam = function (t) {
              var e,
                n = (e = this.remaining.match(qc)) ? e[0] : "";
              if (n) {
                this.capture(n);
                var r = "";
                if (this.consumeOptional("=")) {
                  var o = (function (t) {
                    var e = t.match(Gc);
                    return e ? e[0] : "";
                  })(this.remaining);
                  o && this.capture((r = o));
                }
                var i = Uc(n),
                  a = Uc(r);
                if (t.hasOwnProperty(i)) {
                  var s = t[i];
                  Array.isArray(s) || (t[i] = s = [s]), s.push(a);
                } else t[i] = a;
              }
            }),
            (t.prototype.parseParens = function (t) {
              var e = {};
              for (
                this.capture("(");
                !this.consumeOptional(")") && this.remaining.length > 0;

              ) {
                var n = Bc(this.remaining),
                  r = this.remaining[n.length];
                if ("/" !== r && ")" !== r && ";" !== r)
                  throw new Error("Cannot parse url '" + this.url + "'");
                var o = void 0;
                n.indexOf(":") > -1
                  ? ((o = n.substr(0, n.indexOf(":"))),
                    this.capture(o),
                    this.capture(":"))
                  : t && (o = cc);
                var i = this.parseChildren();
                (e[o] = 1 === Object.keys(i).length ? i[cc] : new Oc([], i)),
                  this.consumeOptional("//");
              }
              return e;
            }),
            (t.prototype.peekStartsWith = function (t) {
              return this.remaining.startsWith(t);
            }),
            (t.prototype.consumeOptional = function (t) {
              return (
                !!this.peekStartsWith(t) &&
                ((this.remaining = this.remaining.substring(t.length)), !0)
              );
            }),
            (t.prototype.capture = function (t) {
              if (!this.consumeOptional(t))
                throw new Error('Expected "' + t + '".');
            }),
            t
          );
        })(),
        Qc = (function () {
          function t(t) {
            this._root = t;
          }
          return (
            Object.defineProperty(t.prototype, "root", {
              get: function () {
                return this._root.value;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.parent = function (t) {
              var e = this.pathFromRoot(t);
              return e.length > 1 ? e[e.length - 2] : null;
            }),
            (t.prototype.children = function (t) {
              var e = Kc(t, this._root);
              return e
                ? e.children.map(function (t) {
                    return t.value;
                  })
                : [];
            }),
            (t.prototype.firstChild = function (t) {
              var e = Kc(t, this._root);
              return e && e.children.length > 0 ? e.children[0].value : null;
            }),
            (t.prototype.siblings = function (t) {
              var e = Zc(t, this._root);
              return e.length < 2
                ? []
                : e[e.length - 2].children
                    .map(function (t) {
                      return t.value;
                    })
                    .filter(function (e) {
                      return e !== t;
                    });
            }),
            (t.prototype.pathFromRoot = function (t) {
              return Zc(t, this._root).map(function (t) {
                return t.value;
              });
            }),
            t
          );
        })();
      function Kc(t, e) {
        var n, o;
        if (t === e.value) return e;
        try {
          for (
            var i = Object(r.e)(e.children), a = i.next();
            !a.done;
            a = i.next()
          ) {
            var s = Kc(t, a.value);
            if (s) return s;
          }
        } catch (u) {
          n = { error: u };
        } finally {
          try {
            a && !a.done && (o = i.return) && o.call(i);
          } finally {
            if (n) throw n.error;
          }
        }
        return null;
      }
      function Zc(t, e) {
        var n, o;
        if (t === e.value) return [e];
        try {
          for (
            var i = Object(r.e)(e.children), a = i.next();
            !a.done;
            a = i.next()
          ) {
            var s = Zc(t, a.value);
            if (s.length) return s.unshift(e), s;
          }
        } catch (u) {
          n = { error: u };
        } finally {
          try {
            a && !a.done && (o = i.return) && o.call(i);
          } finally {
            if (n) throw n.error;
          }
        }
        return [];
      }
      var $c = (function () {
        function t(t, e) {
          (this.value = t), (this.children = e);
        }
        return (
          (t.prototype.toString = function () {
            return "TreeNode(" + this.value + ")";
          }),
          t
        );
      })();
      function Xc(t) {
        var e = {};
        return (
          t &&
            t.children.forEach(function (t) {
              return (e[t.value.outlet] = t);
            }),
          e
        );
      }
      var Jc = (function (t) {
        function e(e, n) {
          var r = t.call(this, e) || this;
          return (r.snapshot = n), oh(r, e), r;
        }
        return (
          Object(r.b)(e, t),
          (e.prototype.toString = function () {
            return this.snapshot.toString();
          }),
          e
        );
      })(Qc);
      function Yc(t, e) {
        var n = (function (t, e) {
            var n = new nh([], {}, {}, "", {}, cc, e, null, t.root, -1, {});
            return new rh("", new $c(n, []));
          })(t, e),
          r = new qs([new Pc("", {})]),
          o = new qs({}),
          i = new qs({}),
          a = new qs({}),
          s = new qs(""),
          u = new th(r, o, a, s, i, cc, e, n.root);
        return (u.snapshot = n.root), new Jc(new $c(u, []), n);
      }
      var th = (function () {
        function t(t, e, n, r, o, i, a, s) {
          (this.url = t),
            (this.params = e),
            (this.queryParams = n),
            (this.fragment = r),
            (this.data = o),
            (this.outlet = i),
            (this.component = a),
            (this._futureSnapshot = s);
        }
        return (
          Object.defineProperty(t.prototype, "routeConfig", {
            get: function () {
              return this._futureSnapshot.routeConfig;
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "root", {
            get: function () {
              return this._routerState.root;
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "parent", {
            get: function () {
              return this._routerState.parent(this);
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "firstChild", {
            get: function () {
              return this._routerState.firstChild(this);
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "children", {
            get: function () {
              return this._routerState.children(this);
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "pathFromRoot", {
            get: function () {
              return this._routerState.pathFromRoot(this);
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "paramMap", {
            get: function () {
              return (
                this._paramMap ||
                  (this._paramMap = this.params.pipe(
                    F(function (t) {
                      return pc(t);
                    })
                  )),
                this._paramMap
              );
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "queryParamMap", {
            get: function () {
              return (
                this._queryParamMap ||
                  (this._queryParamMap = this.queryParams.pipe(
                    F(function (t) {
                      return pc(t);
                    })
                  )),
                this._queryParamMap
              );
            },
            enumerable: !0,
            configurable: !0,
          }),
          (t.prototype.toString = function () {
            return this.snapshot
              ? this.snapshot.toString()
              : "Future(" + this._futureSnapshot + ")";
          }),
          t
        );
      })();
      function eh(t, e) {
        void 0 === e && (e = "emptyOnly");
        var n = t.pathFromRoot,
          o = 0;
        if ("always" !== e)
          for (o = n.length - 1; o >= 1; ) {
            var i = n[o],
              a = n[o - 1];
            if (i.routeConfig && "" === i.routeConfig.path) o--;
            else {
              if (a.component) break;
              o--;
            }
          }
        return (function (t) {
          return t.reduce(
            function (t, e) {
              return {
                params: Object(r.a)({}, t.params, e.params),
                data: Object(r.a)({}, t.data, e.data),
                resolve: Object(r.a)({}, t.resolve, e._resolvedData),
              };
            },
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(o));
      }
      var nh = (function () {
          function t(t, e, n, r, o, i, a, s, u, l, c) {
            (this.url = t),
              (this.params = e),
              (this.queryParams = n),
              (this.fragment = r),
              (this.data = o),
              (this.outlet = i),
              (this.component = a),
              (this.routeConfig = s),
              (this._urlSegment = u),
              (this._lastPathIndex = l),
              (this._resolve = c);
          }
          return (
            Object.defineProperty(t.prototype, "root", {
              get: function () {
                return this._routerState.root;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "parent", {
              get: function () {
                return this._routerState.parent(this);
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "firstChild", {
              get: function () {
                return this._routerState.firstChild(this);
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "children", {
              get: function () {
                return this._routerState.children(this);
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "pathFromRoot", {
              get: function () {
                return this._routerState.pathFromRoot(this);
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "paramMap", {
              get: function () {
                return (
                  this._paramMap || (this._paramMap = pc(this.params)),
                  this._paramMap
                );
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "queryParamMap", {
              get: function () {
                return (
                  this._queryParamMap ||
                    (this._queryParamMap = pc(this.queryParams)),
                  this._queryParamMap
                );
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.toString = function () {
              return (
                "Route(url:'" +
                this.url
                  .map(function (t) {
                    return t.toString();
                  })
                  .join("/") +
                "', path:'" +
                (this.routeConfig ? this.routeConfig.path : "") +
                "')"
              );
            }),
            t
          );
        })(),
        rh = (function (t) {
          function e(e, n) {
            var r = t.call(this, n) || this;
            return (r.url = e), oh(r, n), r;
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.toString = function () {
              return ih(this._root);
            }),
            e
          );
        })(Qc);
      function oh(t, e) {
        (e.value._routerState = t),
          e.children.forEach(function (e) {
            return oh(t, e);
          });
      }
      function ih(t) {
        var e =
          t.children.length > 0
            ? " { " + t.children.map(ih).join(", ") + " } "
            : "";
        return "" + t.value + e;
      }
      function ah(t) {
        if (t.snapshot) {
          var e = t.snapshot,
            n = t._futureSnapshot;
          (t.snapshot = n),
            wc(e.queryParams, n.queryParams) ||
              t.queryParams.next(n.queryParams),
            e.fragment !== n.fragment && t.fragment.next(n.fragment),
            wc(e.params, n.params) || t.params.next(n.params),
            (function (t, e) {
              if (t.length !== e.length) return !1;
              for (var n = 0; n < t.length; ++n) if (!wc(t[n], e[n])) return !1;
              return !0;
            })(e.url, n.url) || t.url.next(n.url),
            wc(e.data, n.data) || t.data.next(n.data);
        } else
          (t.snapshot = t._futureSnapshot), t.data.next(t._futureSnapshot.data);
      }
      function sh(t, e) {
        var n, r;
        return (
          wc(t.params, e.params) &&
          Ac((n = t.url), (r = e.url)) &&
          n.every(function (t, e) {
            return wc(t.parameters, r[e].parameters);
          }) &&
          !(!t.parent != !e.parent) &&
          (!t.parent || sh(t.parent, e.parent))
        );
      }
      function uh(t) {
        return (
          "object" == typeof t && null != t && !t.outlets && !t.segmentPath
        );
      }
      function lh(t, e, n, r, o) {
        var i = {};
        return (
          r &&
            Sc(r, function (t, e) {
              i[e] = Array.isArray(t)
                ? t.map(function (t) {
                    return "" + t;
                  })
                : "" + t;
            }),
          new xc(
            n.root === t
              ? e
              : (function t(e, n, r) {
                  var o = {};
                  return (
                    Sc(e.children, function (e, i) {
                      o[i] = e === n ? r : t(e, n, r);
                    }),
                    new Oc(e.segments, o)
                  );
                })(n.root, t, e),
            i,
            o
          )
        );
      }
      var ch = (function () {
          function t(t, e, n) {
            if (
              ((this.isAbsolute = t),
              (this.numberOfDoubleDots = e),
              (this.commands = n),
              t && n.length > 0 && uh(n[0]))
            )
              throw new Error("Root segment cannot have matrix parameters");
            var r = n.find(function (t) {
              return "object" == typeof t && null != t && t.outlets;
            });
            if (r && r !== Ec(n))
              throw new Error("{outlets:{}} has to be the last command");
          }
          return (
            (t.prototype.toRoot = function () {
              return (
                this.isAbsolute &&
                1 === this.commands.length &&
                "/" == this.commands[0]
              );
            }),
            t
          );
        })(),
        hh = (function () {
          return function (t, e, n) {
            (this.segmentGroup = t),
              (this.processChildren = e),
              (this.index = n);
          };
        })();
      function ph(t) {
        return "object" == typeof t && null != t && t.outlets
          ? t.outlets[cc]
          : "" + t;
      }
      function fh(t, e, n) {
        if (
          (t || (t = new Oc([], {})),
          0 === t.segments.length && t.hasChildren())
        )
          return dh(t, e, n);
        var r = (function (t, e, n) {
            for (
              var r = 0,
                o = e,
                i = { match: !1, pathIndex: 0, commandIndex: 0 };
              o < t.segments.length;

            ) {
              if (r >= n.length) return i;
              var a = t.segments[o],
                s = ph(n[r]),
                u = r < n.length - 1 ? n[r + 1] : null;
              if (o > 0 && void 0 === s) break;
              if (s && u && "object" == typeof u && void 0 === u.outlets) {
                if (!vh(s, u, a)) return i;
                r += 2;
              } else {
                if (!vh(s, {}, a)) return i;
                r++;
              }
              o++;
            }
            return { match: !0, pathIndex: o, commandIndex: r };
          })(t, e, n),
          o = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < t.segments.length) {
          var i = new Oc(t.segments.slice(0, r.pathIndex), {});
          return (
            (i.children[cc] = new Oc(
              t.segments.slice(r.pathIndex),
              t.children
            )),
            dh(i, 0, o)
          );
        }
        return r.match && 0 === o.length
          ? new Oc(t.segments, {})
          : r.match && !t.hasChildren()
          ? mh(t, e, n)
          : r.match
          ? dh(t, 0, o)
          : mh(t, e, n);
      }
      function dh(t, e, n) {
        if (0 === n.length) return new Oc(t.segments, {});
        var r = (function (t) {
            var e, n;
            return "object" != typeof t[0]
              ? (((e = {})[cc] = t), e)
              : void 0 === t[0].outlets
              ? (((n = {})[cc] = t), n)
              : t[0].outlets;
          })(n),
          o = {};
        return (
          Sc(r, function (n, r) {
            null !== n && (o[r] = fh(t.children[r], e, n));
          }),
          Sc(t.children, function (t, e) {
            void 0 === r[e] && (o[e] = t);
          }),
          new Oc(t.segments, o)
        );
      }
      function mh(t, e, n) {
        for (var r = t.segments.slice(0, e), o = 0; o < n.length; ) {
          if ("object" == typeof n[o] && void 0 !== n[o].outlets) {
            var i = yh(n[o].outlets);
            return new Oc(r, i);
          }
          if (0 === o && uh(n[0]))
            r.push(new Pc(t.segments[e].path, n[0])), o++;
          else {
            var a = ph(n[o]),
              s = o < n.length - 1 ? n[o + 1] : null;
            a && s && uh(s)
              ? (r.push(new Pc(a, gh(s))), (o += 2))
              : (r.push(new Pc(a, {})), o++);
          }
        }
        return new Oc(r, {});
      }
      function yh(t) {
        var e = {};
        return (
          Sc(t, function (t, n) {
            null !== t && (e[n] = mh(new Oc([], {}), 0, t));
          }),
          e
        );
      }
      function gh(t) {
        var e = {};
        return (
          Sc(t, function (t, n) {
            return (e[n] = "" + t);
          }),
          e
        );
      }
      function vh(t, e, n) {
        return t == n.path && wc(e, n.parameters);
      }
      var bh = (function () {
        function t(t, e, n, r) {
          (this.routeReuseStrategy = t),
            (this.futureState = e),
            (this.currState = n),
            (this.forwardEvent = r);
        }
        return (
          (t.prototype.activate = function (t) {
            var e = this.futureState._root,
              n = this.currState ? this.currState._root : null;
            this.deactivateChildRoutes(e, n, t),
              ah(this.futureState.root),
              this.activateChildRoutes(e, n, t);
          }),
          (t.prototype.deactivateChildRoutes = function (t, e, n) {
            var r = this,
              o = Xc(e);
            t.children.forEach(function (t) {
              var e = t.value.outlet;
              r.deactivateRoutes(t, o[e], n), delete o[e];
            }),
              Sc(o, function (t, e) {
                r.deactivateRouteAndItsChildren(t, n);
              });
          }),
          (t.prototype.deactivateRoutes = function (t, e, n) {
            var r = t.value,
              o = e ? e.value : null;
            if (r === o)
              if (r.component) {
                var i = n.getContext(r.outlet);
                i && this.deactivateChildRoutes(t, e, i.children);
              } else this.deactivateChildRoutes(t, e, n);
            else o && this.deactivateRouteAndItsChildren(e, n);
          }),
          (t.prototype.deactivateRouteAndItsChildren = function (t, e) {
            this.routeReuseStrategy.shouldDetach(t.value.snapshot)
              ? this.detachAndStoreRouteSubtree(t, e)
              : this.deactivateRouteAndOutlet(t, e);
          }),
          (t.prototype.detachAndStoreRouteSubtree = function (t, e) {
            var n = e.getContext(t.value.outlet);
            if (n && n.outlet) {
              var r = n.outlet.detach(),
                o = n.children.onOutletDeactivated();
              this.routeReuseStrategy.store(t.value.snapshot, {
                componentRef: r,
                route: t,
                contexts: o,
              });
            }
          }),
          (t.prototype.deactivateRouteAndOutlet = function (t, e) {
            var n = this,
              r = e.getContext(t.value.outlet);
            if (r) {
              var o = Xc(t),
                i = t.value.component ? r.children : e;
              Sc(o, function (t, e) {
                return n.deactivateRouteAndItsChildren(t, i);
              }),
                r.outlet &&
                  (r.outlet.deactivate(), r.children.onOutletDeactivated());
            }
          }),
          (t.prototype.activateChildRoutes = function (t, e, n) {
            var r = this,
              o = Xc(e);
            t.children.forEach(function (t) {
              r.activateRoutes(t, o[t.value.outlet], n),
                r.forwardEvent(new sc(t.value.snapshot));
            }),
              t.children.length && this.forwardEvent(new ic(t.value.snapshot));
          }),
          (t.prototype.activateRoutes = function (t, e, n) {
            var r = t.value,
              o = e ? e.value : null;
            if ((ah(r), r === o))
              if (r.component) {
                var i = n.getOrCreateContext(r.outlet);
                this.activateChildRoutes(t, e, i.children);
              } else this.activateChildRoutes(t, e, n);
            else if (r.component)
              if (
                ((i = n.getOrCreateContext(r.outlet)),
                this.routeReuseStrategy.shouldAttach(r.snapshot))
              ) {
                var a = this.routeReuseStrategy.retrieve(r.snapshot);
                this.routeReuseStrategy.store(r.snapshot, null),
                  i.children.onOutletReAttached(a.contexts),
                  (i.attachRef = a.componentRef),
                  (i.route = a.route.value),
                  i.outlet && i.outlet.attach(a.componentRef, a.route.value),
                  _h(a.route);
              } else {
                var s = (function (t) {
                    for (var e = t.parent; e; e = e.parent) {
                      var n = e.routeConfig;
                      if (n && n._loadedConfig) return n._loadedConfig;
                      if (n && n.component) return null;
                    }
                    return null;
                  })(r.snapshot),
                  u = s ? s.module.componentFactoryResolver : null;
                (i.attachRef = null),
                  (i.route = r),
                  (i.resolver = u),
                  i.outlet && i.outlet.activateWith(r, u),
                  this.activateChildRoutes(t, null, i.children);
              }
            else this.activateChildRoutes(t, null, n);
          }),
          t
        );
      })();
      function _h(t) {
        ah(t.value), t.children.forEach(_h);
      }
      function wh(t) {
        return "function" == typeof t;
      }
      function Ch(t) {
        return t instanceof xc;
      }
      var Eh = (function () {
          return function (t) {
            this.segmentGroup = t || null;
          };
        })(),
        Sh = (function () {
          return function (t) {
            this.urlTree = t;
          };
        })();
      function kh(t) {
        return new w(function (e) {
          return e.error(new Eh(t));
        });
      }
      function Th(t) {
        return new w(function (e) {
          return e.error(new Sh(t));
        });
      }
      function xh(t) {
        return new w(function (e) {
          return e.error(
            new Error(
              "Only absolute redirects can have named outlets. redirectTo: '" +
                t +
                "'"
            )
          );
        });
      }
      var Oh = (function () {
        function t(t, e, n, r, o) {
          (this.configLoader = e),
            (this.urlSerializer = n),
            (this.urlTree = r),
            (this.config = o),
            (this.allowRedirects = !0),
            (this.ngModule = t.get(Mt));
        }
        return (
          (t.prototype.apply = function () {
            var t = this;
            return this.expandSegmentGroup(
              this.ngModule,
              this.config,
              this.urlTree.root,
              cc
            )
              .pipe(
                F(function (e) {
                  return t.createUrlTree(
                    e,
                    t.urlTree.queryParams,
                    t.urlTree.fragment
                  );
                })
              )
              .pipe(
                mu(function (e) {
                  if (e instanceof Sh)
                    return (t.allowRedirects = !1), t.match(e.urlTree);
                  if (e instanceof Eh) throw t.noMatchError(e);
                  throw e;
                })
              );
          }),
          (t.prototype.match = function (t) {
            var e = this;
            return this.expandSegmentGroup(
              this.ngModule,
              this.config,
              t.root,
              cc
            )
              .pipe(
                F(function (n) {
                  return e.createUrlTree(n, t.queryParams, t.fragment);
                })
              )
              .pipe(
                mu(function (t) {
                  if (t instanceof Eh) throw e.noMatchError(t);
                  throw t;
                })
              );
          }),
          (t.prototype.noMatchError = function (t) {
            return new Error(
              "Cannot match any routes. URL Segment: '" + t.segmentGroup + "'"
            );
          }),
          (t.prototype.createUrlTree = function (t, e, n) {
            var r,
              o =
                t.segments.length > 0 ? new Oc([], (((r = {})[cc] = t), r)) : t;
            return new xc(o, e, n);
          }),
          (t.prototype.expandSegmentGroup = function (t, e, n, r) {
            return 0 === n.segments.length && n.hasChildren()
              ? this.expandChildren(t, e, n).pipe(
                  F(function (t) {
                    return new Oc([], t);
                  })
                )
              : this.expandSegment(t, n, e, n.segments, r, !0);
          }),
          (t.prototype.expandChildren = function (t, e, n) {
            var r = this;
            return (function (n, o) {
              if (0 === Object.keys(n).length) return Bs({});
              var i = [],
                a = [],
                s = {};
              return (
                Sc(n, function (n, o) {
                  var u,
                    l,
                    c = ((u = o),
                    (l = n),
                    r.expandSegmentGroup(t, e, l, u)).pipe(
                      F(function (t) {
                        return (s[o] = t);
                      })
                    );
                  o === cc ? i.push(c) : a.push(c);
                }),
                Bs.apply(null, i.concat(a)).pipe(
                  Ys(),
                  du(),
                  F(function () {
                    return s;
                  })
                )
              );
            })(n.children);
          }),
          (t.prototype.expandSegment = function (t, e, n, o, i, a) {
            var s = this;
            return Bs.apply(void 0, Object(r.d)(n)).pipe(
              F(function (r) {
                return s.expandSegmentAgainstRoute(t, e, n, r, o, i, a).pipe(
                  mu(function (t) {
                    if (t instanceof Eh) return Bs(null);
                    throw t;
                  })
                );
              }),
              Ys(),
              wu(function (t) {
                return !!t;
              }),
              mu(function (t, n) {
                if (t instanceof Gs || "EmptyError" === t.name) {
                  if (s.noLeftoversInUrl(e, o, i)) return Bs(new Oc([], {}));
                  throw new Eh(e);
                }
                throw t;
              })
            );
          }),
          (t.prototype.noLeftoversInUrl = function (t, e, n) {
            return 0 === e.length && !t.children[n];
          }),
          (t.prototype.expandSegmentAgainstRoute = function (
            t,
            e,
            n,
            r,
            o,
            i,
            a
          ) {
            return Nh(r) !== i
              ? kh(e)
              : void 0 === r.redirectTo
              ? this.matchSegmentAgainstRoute(t, e, r, o)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, e, n, r, o, i)
              : kh(e);
          }),
          (t.prototype.expandSegmentAgainstRouteUsingRedirect = function (
            t,
            e,
            n,
            r,
            o,
            i
          ) {
            return "**" === r.path
              ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(
                  t,
                  n,
                  r,
                  i
                )
              : this.expandRegularSegmentAgainstRouteUsingRedirect(
                  t,
                  e,
                  n,
                  r,
                  o,
                  i
                );
          }),
          (t.prototype.expandWildCardWithParamsAgainstRouteUsingRedirect =
            function (t, e, n, r) {
              var o = this,
                i = this.applyRedirectCommands([], n.redirectTo, {});
              return n.redirectTo.startsWith("/")
                ? Th(i)
                : this.lineralizeSegments(n, i).pipe(
                    B(function (n) {
                      var i = new Oc(n, {});
                      return o.expandSegment(t, i, e, n, r, !1);
                    })
                  );
            }),
          (t.prototype.expandRegularSegmentAgainstRouteUsingRedirect =
            function (t, e, n, r, o, i) {
              var a = this,
                s = Ph(e, r, o),
                u = s.consumedSegments,
                l = s.lastChild,
                c = s.positionalParamSegments;
              if (!s.matched) return kh(e);
              var h = this.applyRedirectCommands(u, r.redirectTo, c);
              return r.redirectTo.startsWith("/")
                ? Th(h)
                : this.lineralizeSegments(r, h).pipe(
                    B(function (r) {
                      return a.expandSegment(
                        t,
                        e,
                        n,
                        r.concat(o.slice(l)),
                        i,
                        !1
                      );
                    })
                  );
            }),
          (t.prototype.matchSegmentAgainstRoute = function (t, e, n, o) {
            var i = this;
            if ("**" === n.path)
              return n.loadChildren
                ? this.configLoader.load(t.injector, n).pipe(
                    F(function (t) {
                      return (n._loadedConfig = t), new Oc(o, {});
                    })
                  )
                : Bs(new Oc(o, {}));
            var a = Ph(e, n, o),
              s = a.consumedSegments,
              u = a.lastChild;
            if (!a.matched) return kh(e);
            var l = o.slice(u);
            return this.getChildConfig(t, n, o).pipe(
              B(function (t) {
                var n = t.module,
                  o = t.routes,
                  a = (function (t, e, n, o) {
                    return n.length > 0 &&
                      (function (t, e, n) {
                        return n.some(function (n) {
                          return Ih(t, e, n) && Nh(n) !== cc;
                        });
                      })(t, n, o)
                      ? {
                          segmentGroup: Ah(
                            new Oc(
                              e,
                              (function (t, e) {
                                var n,
                                  o,
                                  i = {};
                                i[cc] = e;
                                try {
                                  for (
                                    var a = Object(r.e)(t), s = a.next();
                                    !s.done;
                                    s = a.next()
                                  ) {
                                    var u = s.value;
                                    "" === u.path &&
                                      Nh(u) !== cc &&
                                      (i[Nh(u)] = new Oc([], {}));
                                  }
                                } catch (l) {
                                  n = { error: l };
                                } finally {
                                  try {
                                    s && !s.done && (o = a.return) && o.call(a);
                                  } finally {
                                    if (n) throw n.error;
                                  }
                                }
                                return i;
                              })(o, new Oc(n, t.children))
                            )
                          ),
                          slicedSegments: [],
                        }
                      : 0 === n.length &&
                        (function (t, e, n) {
                          return n.some(function (n) {
                            return Ih(t, e, n);
                          });
                        })(t, n, o)
                      ? {
                          segmentGroup: Ah(
                            new Oc(
                              t.segments,
                              (function (t, e, n, o) {
                                var i,
                                  a,
                                  s = {};
                                try {
                                  for (
                                    var u = Object(r.e)(n), l = u.next();
                                    !l.done;
                                    l = u.next()
                                  ) {
                                    var c = l.value;
                                    Ih(t, e, c) &&
                                      !o[Nh(c)] &&
                                      (s[Nh(c)] = new Oc([], {}));
                                  }
                                } catch (h) {
                                  i = { error: h };
                                } finally {
                                  try {
                                    l && !l.done && (a = u.return) && a.call(u);
                                  } finally {
                                    if (i) throw i.error;
                                  }
                                }
                                return Object(r.a)({}, o, s);
                              })(t, n, o, t.children)
                            )
                          ),
                          slicedSegments: n,
                        }
                      : { segmentGroup: t, slicedSegments: n };
                  })(e, s, l, o),
                  u = a.segmentGroup,
                  c = a.slicedSegments;
                return 0 === c.length && u.hasChildren()
                  ? i.expandChildren(n, o, u).pipe(
                      F(function (t) {
                        return new Oc(s, t);
                      })
                    )
                  : 0 === o.length && 0 === c.length
                  ? Bs(new Oc(s, {}))
                  : i.expandSegment(n, u, o, c, cc, !0).pipe(
                      F(function (t) {
                        return new Oc(s.concat(t.segments), t.children);
                      })
                    );
              })
            );
          }),
          (t.prototype.getChildConfig = function (t, e, n) {
            var r = this;
            return e.children
              ? Bs(new yc(e.children, t))
              : e.loadChildren
              ? void 0 !== e._loadedConfig
                ? Bs(e._loadedConfig)
                : (function (t, e, n) {
                    var r,
                      o = e.canLoad;
                    return o && 0 !== o.length
                      ? z(o)
                          .pipe(
                            F(function (r) {
                              var o,
                                i = t.get(r);
                              if (
                                (function (t) {
                                  return t && wh(t.canLoad);
                                })(i)
                              )
                                o = i.canLoad(e, n);
                              else {
                                if (!wh(i))
                                  throw new Error("Invalid CanLoad guard");
                                o = i(e, n);
                              }
                              return kc(o);
                            })
                          )
                          .pipe(
                            Ys(),
                            ((r = function (t) {
                              return !0 === t;
                            }),
                            function (t) {
                              return t.lift(new Cu(r, void 0, t));
                            })
                          )
                      : Bs(!0);
                  })(t.injector, e, n).pipe(
                    B(function (n) {
                      return n
                        ? r.configLoader.load(t.injector, e).pipe(
                            F(function (t) {
                              return (e._loadedConfig = t), t;
                            })
                          )
                        : (function (t) {
                            return new w(function (e) {
                              return e.error(
                                dc(
                                  "Cannot load children because the guard of the route \"path: '" +
                                    t.path +
                                    "'\" returned false"
                                )
                              );
                            });
                          })(e);
                    })
                  )
              : Bs(new yc([], t));
          }),
          (t.prototype.lineralizeSegments = function (t, e) {
            for (var n = [], r = e.root; ; ) {
              if (((n = n.concat(r.segments)), 0 === r.numberOfChildren))
                return Bs(n);
              if (r.numberOfChildren > 1 || !r.children[cc])
                return xh(t.redirectTo);
              r = r.children[cc];
            }
          }),
          (t.prototype.applyRedirectCommands = function (t, e, n) {
            return this.applyRedirectCreatreUrlTree(
              e,
              this.urlSerializer.parse(e),
              t,
              n
            );
          }),
          (t.prototype.applyRedirectCreatreUrlTree = function (t, e, n, r) {
            var o = this.createSegmentGroup(t, e.root, n, r);
            return new xc(
              o,
              this.createQueryParams(e.queryParams, this.urlTree.queryParams),
              e.fragment
            );
          }),
          (t.prototype.createQueryParams = function (t, e) {
            var n = {};
            return (
              Sc(t, function (t, r) {
                if ("string" == typeof t && t.startsWith(":")) {
                  var o = t.substring(1);
                  n[r] = e[o];
                } else n[r] = t;
              }),
              n
            );
          }),
          (t.prototype.createSegmentGroup = function (t, e, n, r) {
            var o = this,
              i = this.createSegments(t, e.segments, n, r),
              a = {};
            return (
              Sc(e.children, function (e, i) {
                a[i] = o.createSegmentGroup(t, e, n, r);
              }),
              new Oc(i, a)
            );
          }),
          (t.prototype.createSegments = function (t, e, n, r) {
            var o = this;
            return e.map(function (e) {
              return e.path.startsWith(":")
                ? o.findPosParam(t, e, r)
                : o.findOrReturn(e, n);
            });
          }),
          (t.prototype.findPosParam = function (t, e, n) {
            var r = n[e.path.substring(1)];
            if (!r)
              throw new Error(
                "Cannot redirect to '" + t + "'. Cannot find '" + e.path + "'."
              );
            return r;
          }),
          (t.prototype.findOrReturn = function (t, e) {
            var n,
              o,
              i = 0;
            try {
              for (
                var a = Object(r.e)(e), s = a.next();
                !s.done;
                s = a.next()
              ) {
                var u = s.value;
                if (u.path === t.path) return e.splice(i), u;
                i++;
              }
            } catch (l) {
              n = { error: l };
            } finally {
              try {
                s && !s.done && (o = a.return) && o.call(a);
              } finally {
                if (n) throw n.error;
              }
            }
            return t;
          }),
          t
        );
      })();
      function Ph(t, e, n) {
        if ("" === e.path)
          return "full" === e.pathMatch && (t.hasChildren() || n.length > 0)
            ? {
                matched: !1,
                consumedSegments: [],
                lastChild: 0,
                positionalParamSegments: {},
              }
            : {
                matched: !0,
                consumedSegments: [],
                lastChild: 0,
                positionalParamSegments: {},
              };
        var r = (e.matcher || mc)(n, t, e);
        return r
          ? {
              matched: !0,
              consumedSegments: r.consumed,
              lastChild: r.consumed.length,
              positionalParamSegments: r.posParams,
            }
          : {
              matched: !1,
              consumedSegments: [],
              lastChild: 0,
              positionalParamSegments: {},
            };
      }
      function Ah(t) {
        if (1 === t.numberOfChildren && t.children[cc]) {
          var e = t.children[cc];
          return new Oc(t.segments.concat(e.segments), e.children);
        }
        return t;
      }
      function Ih(t, e, n) {
        return (
          (!(t.hasChildren() || e.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path &&
          void 0 !== n.redirectTo
        );
      }
      function Nh(t) {
        return t.outlet || cc;
      }
      var Rh = (function () {
          return function (t) {
            (this.path = t), (this.route = this.path[this.path.length - 1]);
          };
        })(),
        Dh = (function () {
          return function (t, e) {
            (this.component = t), (this.route = e);
          };
        })();
      function jh(t, e, n) {
        var r = (function (t) {
          if (!t) return null;
          for (var e = t.parent; e; e = e.parent) {
            var n = e.routeConfig;
            if (n && n._loadedConfig) return n._loadedConfig;
          }
          return null;
        })(e);
        return (r ? r.module.injector : n).get(t);
      }
      function Mh(t, e, n, r, o) {
        void 0 === o &&
          (o = { canDeactivateChecks: [], canActivateChecks: [] });
        var i = Xc(e);
        return (
          t.children.forEach(function (t) {
            !(function (t, e, n, r, o) {
              void 0 === o &&
                (o = { canDeactivateChecks: [], canActivateChecks: [] });
              var i = t.value,
                a = e ? e.value : null,
                s = n ? n.getContext(t.value.outlet) : null;
              if (a && i.routeConfig === a.routeConfig) {
                var u = (function (t, e, n) {
                  if ("function" == typeof n) return n(t, e);
                  switch (n) {
                    case "pathParamsChange":
                      return !Ac(t.url, e.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !Ac(t.url, e.url) || !wc(t.queryParams, e.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !sh(t, e) || !wc(t.queryParams, e.queryParams);
                    case "paramsChange":
                    default:
                      return !sh(t, e);
                  }
                })(a, i, i.routeConfig.runGuardsAndResolvers);
                u
                  ? o.canActivateChecks.push(new Rh(r))
                  : ((i.data = a.data), (i._resolvedData = a._resolvedData)),
                  Mh(t, e, i.component ? (s ? s.children : null) : n, r, o),
                  u &&
                    o.canDeactivateChecks.push(
                      new Dh((s && s.outlet && s.outlet.component) || null, a)
                    );
              } else
                a && Vh(e, s, o),
                  o.canActivateChecks.push(new Rh(r)),
                  Mh(t, null, i.component ? (s ? s.children : null) : n, r, o);
            })(t, i[t.value.outlet], n, r.concat([t.value]), o),
              delete i[t.value.outlet];
          }),
          Sc(i, function (t, e) {
            return Vh(t, n.getContext(e), o);
          }),
          o
        );
      }
      function Vh(t, e, n) {
        var r = Xc(t),
          o = t.value;
        Sc(r, function (t, r) {
          Vh(t, o.component ? (e ? e.children.getContext(r) : null) : e, n);
        }),
          n.canDeactivateChecks.push(
            new Dh(
              o.component && e && e.outlet && e.outlet.isActivated
                ? e.outlet.component
                : null,
              o
            )
          );
      }
      var Fh = Symbol("INITIAL_VALUE");
      function Lh() {
        return Su(function (t) {
          return Qs.apply(
            void 0,
            Object(r.d)(
              t.map(function (t) {
                return t.pipe(
                  vu(1),
                  (function () {
                    for (var t = [], e = 0; e < arguments.length; e++)
                      t[e] = arguments[e];
                    var n = t[t.length - 1];
                    return O(n)
                      ? (t.pop(),
                        function (e) {
                          return xu(t, e, n);
                        })
                      : function (e) {
                          return xu(t, e);
                        };
                  })(Fh)
                );
              })
            )
          ).pipe(
            Ou(function (t, e) {
              var n = !1;
              return e.reduce(function (t, r, o) {
                if (t !== Fh) return t;
                if ((r === Fh && (n = !0), !n)) {
                  if (!1 === r) return r;
                  if (o === e.length - 1 || Ch(r)) return r;
                }
                return t;
              }, t);
            }, Fh),
            tu(function (t) {
              return t !== Fh;
            }),
            F(function (t) {
              return Ch(t) ? t : !0 === t;
            }),
            vu(1)
          );
        });
      }
      function Uh(t, e) {
        return null !== t && e && e(new ac(t)), Bs(!0);
      }
      function Hh(t, e) {
        return null !== t && e && e(new oc(t)), Bs(!0);
      }
      function zh(t, e, n) {
        var r = e.routeConfig ? e.routeConfig.canActivate : null;
        return r && 0 !== r.length
          ? Bs(
              r.map(function (r) {
                return Js(function () {
                  var o,
                    i = jh(r, e, n);
                  if (
                    (function (t) {
                      return t && wh(t.canActivate);
                    })(i)
                  )
                    o = kc(i.canActivate(e, t));
                  else {
                    if (!wh(i)) throw new Error("Invalid CanActivate guard");
                    o = kc(i(e, t));
                  }
                  return o.pipe(wu());
                });
              })
            ).pipe(Lh())
          : Bs(!0);
      }
      function Bh(t, e, n) {
        var r = e[e.length - 1],
          o = e
            .slice(0, e.length - 1)
            .reverse()
            .map(function (t) {
              return (function (t) {
                var e = t.routeConfig ? t.routeConfig.canActivateChild : null;
                return e && 0 !== e.length ? { node: t, guards: e } : null;
              })(t);
            })
            .filter(function (t) {
              return null !== t;
            })
            .map(function (e) {
              return Js(function () {
                return Bs(
                  e.guards.map(function (o) {
                    var i,
                      a = jh(o, e.node, n);
                    if (
                      (function (t) {
                        return t && wh(t.canActivateChild);
                      })(a)
                    )
                      i = kc(a.canActivateChild(r, t));
                    else {
                      if (!wh(a))
                        throw new Error("Invalid CanActivateChild guard");
                      i = kc(a(r, t));
                    }
                    return i.pipe(wu());
                  })
                ).pipe(Lh());
              });
            });
        return Bs(o).pipe(Lh());
      }
      var qh = (function () {
          return function () {};
        })(),
        Gh = (function () {
          function t(t, e, n, r, o, i) {
            (this.rootComponentType = t),
              (this.config = e),
              (this.urlTree = n),
              (this.url = r),
              (this.paramsInheritanceStrategy = o),
              (this.relativeLinkResolution = i);
          }
          return (
            (t.prototype.recognize = function () {
              try {
                var t = Kh(
                    this.urlTree.root,
                    [],
                    [],
                    this.config,
                    this.relativeLinkResolution
                  ).segmentGroup,
                  e = this.processSegmentGroup(this.config, t, cc),
                  n = new nh(
                    [],
                    Object.freeze({}),
                    Object.freeze(Object(r.a)({}, this.urlTree.queryParams)),
                    this.urlTree.fragment,
                    {},
                    cc,
                    this.rootComponentType,
                    null,
                    this.urlTree.root,
                    -1,
                    {}
                  ),
                  o = new $c(n, e),
                  i = new rh(this.url, o);
                return this.inheritParamsAndData(i._root), Bs(i);
              } catch (a) {
                return new w(function (t) {
                  return t.error(a);
                });
              }
            }),
            (t.prototype.inheritParamsAndData = function (t) {
              var e = this,
                n = t.value,
                r = eh(n, this.paramsInheritanceStrategy);
              (n.params = Object.freeze(r.params)),
                (n.data = Object.freeze(r.data)),
                t.children.forEach(function (t) {
                  return e.inheritParamsAndData(t);
                });
            }),
            (t.prototype.processSegmentGroup = function (t, e, n) {
              return 0 === e.segments.length && e.hasChildren()
                ? this.processChildren(t, e)
                : this.processSegment(t, e, e.segments, n);
            }),
            (t.prototype.processChildren = function (t, e) {
              var n,
                r = this,
                o = Ic(e, function (e, n) {
                  return r.processSegmentGroup(t, e, n);
                });
              return (
                (n = {}),
                o.forEach(function (t) {
                  var e = n[t.value.outlet];
                  if (e) {
                    var r = e.url
                        .map(function (t) {
                          return t.toString();
                        })
                        .join("/"),
                      o = t.value.url
                        .map(function (t) {
                          return t.toString();
                        })
                        .join("/");
                    throw new Error(
                      "Two segments cannot have the same outlet name: '" +
                        r +
                        "' and '" +
                        o +
                        "'."
                    );
                  }
                  n[t.value.outlet] = t.value;
                }),
                o.sort(function (t, e) {
                  return t.value.outlet === cc
                    ? -1
                    : e.value.outlet === cc
                    ? 1
                    : t.value.outlet.localeCompare(e.value.outlet);
                }),
                o
              );
            }),
            (t.prototype.processSegment = function (t, e, n, o) {
              var i, a;
              try {
                for (
                  var s = Object(r.e)(t), u = s.next();
                  !u.done;
                  u = s.next()
                ) {
                  var l = u.value;
                  try {
                    return this.processSegmentAgainstRoute(l, e, n, o);
                  } catch (c) {
                    if (!(c instanceof qh)) throw c;
                  }
                }
              } catch (h) {
                i = { error: h };
              } finally {
                try {
                  u && !u.done && (a = s.return) && a.call(s);
                } finally {
                  if (i) throw i.error;
                }
              }
              if (this.noLeftoversInUrl(e, n, o)) return [];
              throw new qh();
            }),
            (t.prototype.noLeftoversInUrl = function (t, e, n) {
              return 0 === e.length && !t.children[n];
            }),
            (t.prototype.processSegmentAgainstRoute = function (t, e, n, o) {
              if (t.redirectTo) throw new qh();
              if ((t.outlet || cc) !== o) throw new qh();
              var i,
                a = [],
                s = [];
              if ("**" === t.path) {
                var u = n.length > 0 ? Ec(n).parameters : {};
                i = new nh(
                  n,
                  u,
                  Object.freeze(Object(r.a)({}, this.urlTree.queryParams)),
                  this.urlTree.fragment,
                  Xh(t),
                  o,
                  t.component,
                  t,
                  Wh(e),
                  Qh(e) + n.length,
                  Jh(t)
                );
              } else {
                var l = (function (t, e, n) {
                  if ("" === e.path) {
                    if (
                      "full" === e.pathMatch &&
                      (t.hasChildren() || n.length > 0)
                    )
                      throw new qh();
                    return {
                      consumedSegments: [],
                      lastChild: 0,
                      parameters: {},
                    };
                  }
                  var o = (e.matcher || mc)(n, t, e);
                  if (!o) throw new qh();
                  var i = {};
                  Sc(o.posParams, function (t, e) {
                    i[e] = t.path;
                  });
                  var a =
                    o.consumed.length > 0
                      ? Object(r.a)(
                          {},
                          i,
                          o.consumed[o.consumed.length - 1].parameters
                        )
                      : i;
                  return {
                    consumedSegments: o.consumed,
                    lastChild: o.consumed.length,
                    parameters: a,
                  };
                })(e, t, n);
                (a = l.consumedSegments),
                  (s = n.slice(l.lastChild)),
                  (i = new nh(
                    a,
                    l.parameters,
                    Object.freeze(Object(r.a)({}, this.urlTree.queryParams)),
                    this.urlTree.fragment,
                    Xh(t),
                    o,
                    t.component,
                    t,
                    Wh(e),
                    Qh(e) + a.length,
                    Jh(t)
                  ));
              }
              var c = (function (t) {
                  return t.children
                    ? t.children
                    : t.loadChildren
                    ? t._loadedConfig.routes
                    : [];
                })(t),
                h = Kh(e, a, s, c, this.relativeLinkResolution),
                p = h.segmentGroup,
                f = h.slicedSegments;
              if (0 === f.length && p.hasChildren()) {
                var d = this.processChildren(c, p);
                return [new $c(i, d)];
              }
              if (0 === c.length && 0 === f.length) return [new $c(i, [])];
              var m = this.processSegment(c, p, f, cc);
              return [new $c(i, m)];
            }),
            t
          );
        })();
      function Wh(t) {
        for (var e = t; e._sourceSegment; ) e = e._sourceSegment;
        return e;
      }
      function Qh(t) {
        for (
          var e = t, n = e._segmentIndexShift ? e._segmentIndexShift : 0;
          e._sourceSegment;

        )
          n += (e = e._sourceSegment)._segmentIndexShift
            ? e._segmentIndexShift
            : 0;
        return n - 1;
      }
      function Kh(t, e, n, o, i) {
        if (
          n.length > 0 &&
          (function (t, e, n) {
            return n.some(function (n) {
              return Zh(t, e, n) && $h(n) !== cc;
            });
          })(t, n, o)
        ) {
          var a = new Oc(
            e,
            (function (t, e, n, o) {
              var i,
                a,
                s = {};
              (s[cc] = o),
                (o._sourceSegment = t),
                (o._segmentIndexShift = e.length);
              try {
                for (
                  var u = Object(r.e)(n), l = u.next();
                  !l.done;
                  l = u.next()
                ) {
                  var c = l.value;
                  if ("" === c.path && $h(c) !== cc) {
                    var h = new Oc([], {});
                    (h._sourceSegment = t),
                      (h._segmentIndexShift = e.length),
                      (s[$h(c)] = h);
                  }
                }
              } catch (p) {
                i = { error: p };
              } finally {
                try {
                  l && !l.done && (a = u.return) && a.call(u);
                } finally {
                  if (i) throw i.error;
                }
              }
              return s;
            })(t, e, o, new Oc(n, t.children))
          );
          return (
            (a._sourceSegment = t),
            (a._segmentIndexShift = e.length),
            { segmentGroup: a, slicedSegments: [] }
          );
        }
        if (
          0 === n.length &&
          (function (t, e, n) {
            return n.some(function (n) {
              return Zh(t, e, n);
            });
          })(t, n, o)
        ) {
          var s = new Oc(
            t.segments,
            (function (t, e, n, o, i, a) {
              var s,
                u,
                l = {};
              try {
                for (
                  var c = Object(r.e)(o), h = c.next();
                  !h.done;
                  h = c.next()
                ) {
                  var p = h.value;
                  if (Zh(t, n, p) && !i[$h(p)]) {
                    var f = new Oc([], {});
                    (f._sourceSegment = t),
                      (f._segmentIndexShift =
                        "legacy" === a ? t.segments.length : e.length),
                      (l[$h(p)] = f);
                  }
                }
              } catch (d) {
                s = { error: d };
              } finally {
                try {
                  h && !h.done && (u = c.return) && u.call(c);
                } finally {
                  if (s) throw s.error;
                }
              }
              return Object(r.a)({}, i, l);
            })(t, e, n, o, t.children, i)
          );
          return (
            (s._sourceSegment = t),
            (s._segmentIndexShift = e.length),
            { segmentGroup: s, slicedSegments: n }
          );
        }
        var u = new Oc(t.segments, t.children);
        return (
          (u._sourceSegment = t),
          (u._segmentIndexShift = e.length),
          { segmentGroup: u, slicedSegments: n }
        );
      }
      function Zh(t, e, n) {
        return (
          (!(t.hasChildren() || e.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path &&
          void 0 === n.redirectTo
        );
      }
      function $h(t) {
        return t.outlet || cc;
      }
      function Xh(t) {
        return t.data || {};
      }
      function Jh(t) {
        return t.resolve || {};
      }
      function Yh(t, e, n, r) {
        var o = jh(t, e, r);
        return kc(o.resolve ? o.resolve(e, n) : o(e, n));
      }
      function tp(t) {
        return function (e) {
          return e.pipe(
            Su(function (e) {
              var n = t(e);
              return n
                ? z(n).pipe(
                    F(function () {
                      return e;
                    })
                  )
                : z([e]);
            })
          );
        };
      }
      var ep = (function () {
          return function () {};
        })(),
        np = (function () {
          function t() {}
          return (
            (t.prototype.shouldDetach = function (t) {
              return !1;
            }),
            (t.prototype.store = function (t, e) {}),
            (t.prototype.shouldAttach = function (t) {
              return !1;
            }),
            (t.prototype.retrieve = function (t) {
              return null;
            }),
            (t.prototype.shouldReuseRoute = function (t, e) {
              return t.routeConfig === e.routeConfig;
            }),
            t
          );
        })(),
        rp = new Et("ROUTES"),
        op = (function () {
          function t(t, e, n, r) {
            (this.loader = t),
              (this.compiler = e),
              (this.onLoadStartListener = n),
              (this.onLoadEndListener = r);
          }
          return (
            (t.prototype.load = function (t, e) {
              var n = this;
              return (
                this.onLoadStartListener && this.onLoadStartListener(e),
                this.loadModuleFactory(e.loadChildren).pipe(
                  F(function (r) {
                    n.onLoadEndListener && n.onLoadEndListener(e);
                    var o = r.create(t);
                    return new yc(Cc(o.injector.get(rp)).map(_c), o);
                  })
                )
              );
            }),
            (t.prototype.loadModuleFactory = function (t) {
              var e = this;
              return "string" == typeof t
                ? z(this.loader.load(t))
                : kc(t()).pipe(
                    B(function (t) {
                      return t instanceof Vt
                        ? Bs(t)
                        : z(e.compiler.compileModuleAsync(t));
                    })
                  );
            }),
            t
          );
        })(),
        ip = (function () {
          return function () {};
        })(),
        ap = (function () {
          function t() {}
          return (
            (t.prototype.shouldProcessUrl = function (t) {
              return !0;
            }),
            (t.prototype.extract = function (t) {
              return t;
            }),
            (t.prototype.merge = function (t, e) {
              return t;
            }),
            t
          );
        })();
      function sp(t) {
        throw t;
      }
      function up(t, e, n) {
        return e.parse("/");
      }
      function lp(t, e) {
        return Bs(null);
      }
      var cp = (function () {
          function t(t, e, n, r, o, i, a, s) {
            var u = this;
            (this.rootComponentType = t),
              (this.urlSerializer = e),
              (this.rootContexts = n),
              (this.location = r),
              (this.config = s),
              (this.lastSuccessfulNavigation = null),
              (this.currentNavigation = null),
              (this.navigationId = 0),
              (this.isNgZoneEnabled = !1),
              (this.events = new T()),
              (this.errorHandler = sp),
              (this.malformedUriErrorHandler = up),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.hooks = {
                beforePreactivation: lp,
                afterPreactivation: lp,
              }),
              (this.urlHandlingStrategy = new ap()),
              (this.routeReuseStrategy = new np()),
              (this.onSameUrlNavigation = "ignore"),
              (this.paramsInheritanceStrategy = "emptyOnly"),
              (this.urlUpdateStrategy = "deferred"),
              (this.relativeLinkResolution = "legacy"),
              (this.ngModule = o.get(Mt)),
              (this.console = o.get(Vo));
            var l = o.get(ni);
            (this.isNgZoneEnabled = l instanceof ni),
              this.resetConfig(s),
              (this.currentUrlTree = new xc(new Oc([], {}), {}, null)),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.configLoader = new op(
                i,
                a,
                function (t) {
                  return u.triggerEvent(new nc(t));
                },
                function (t) {
                  return u.triggerEvent(new rc(t));
                }
              )),
              (this.routerState = Yc(
                this.currentUrlTree,
                this.rootComponentType
              )),
              (this.transitions = new qs({
                id: 0,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                extractedUrl: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                urlAfterRedirects: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                rawUrl: this.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: "imperative",
                restoredState: null,
                currentSnapshot: this.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: this.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              (this.navigations = this.setupNavigations(this.transitions)),
              this.processNavigations();
          }
          return (
            (t.prototype.setupNavigations = function (t) {
              var e = this,
                n = this.events;
              return t.pipe(
                tu(function (t) {
                  return 0 !== t.id;
                }),
                F(function (t) {
                  return Object(r.a)({}, t, {
                    extractedUrl: e.urlHandlingStrategy.extract(t.rawUrl),
                  });
                }),
                Su(function (t) {
                  var o,
                    i,
                    a,
                    s,
                    u = !1,
                    l = !1;
                  return Bs(t).pipe(
                    Nu(function (t) {
                      e.currentNavigation = {
                        id: t.id,
                        initialUrl: t.currentRawUrl,
                        extractedUrl: t.extractedUrl,
                        trigger: t.source,
                        extras: t.extras,
                        previousNavigation: e.lastSuccessfulNavigation
                          ? Object(r.a)({}, e.lastSuccessfulNavigation, {
                              previousNavigation: null,
                            })
                          : null,
                      };
                    }),
                    Su(function (t) {
                      var o,
                        i,
                        a,
                        s,
                        u =
                          !e.navigated ||
                          t.extractedUrl.toString() !==
                            e.browserUrlTree.toString();
                      if (
                        ("reload" === e.onSameUrlNavigation || u) &&
                        e.urlHandlingStrategy.shouldProcessUrl(t.rawUrl)
                      )
                        return Bs(t).pipe(
                          Su(function (t) {
                            var r = e.transitions.getValue();
                            return (
                              n.next(
                                new Ql(
                                  t.id,
                                  e.serializeUrl(t.extractedUrl),
                                  t.source,
                                  t.restoredState
                                )
                              ),
                              r !== e.transitions.getValue() ? $s : [t]
                            );
                          }),
                          Su(function (t) {
                            return Promise.resolve(t);
                          }),
                          ((o = e.ngModule.injector),
                          (i = e.configLoader),
                          (a = e.urlSerializer),
                          (s = e.config),
                          function (t) {
                            return t.pipe(
                              Su(function (t) {
                                return (function (t, e, n, r, o) {
                                  return new Oh(t, e, n, r, o).apply();
                                })(o, i, a, t.extractedUrl, s).pipe(
                                  F(function (e) {
                                    return Object(r.a)({}, t, {
                                      urlAfterRedirects: e,
                                    });
                                  })
                                );
                              })
                            );
                          }),
                          Nu(function (t) {
                            e.currentNavigation = Object(r.a)(
                              {},
                              e.currentNavigation,
                              { finalUrl: t.urlAfterRedirects }
                            );
                          }),
                          (function (t, n, o, i, a) {
                            return function (o) {
                              return o.pipe(
                                B(function (o) {
                                  return (function (t, e, n, r, o, i) {
                                    return (
                                      void 0 === o && (o = "emptyOnly"),
                                      void 0 === i && (i = "legacy"),
                                      new Gh(t, e, n, r, o, i).recognize()
                                    );
                                  })(
                                    t,
                                    n,
                                    o.urlAfterRedirects,
                                    ((s = o.urlAfterRedirects),
                                    e.serializeUrl(s)),
                                    i,
                                    a
                                  ).pipe(
                                    F(function (t) {
                                      return Object(r.a)({}, o, {
                                        targetSnapshot: t,
                                      });
                                    })
                                  );
                                  var s;
                                })
                              );
                            };
                          })(
                            e.rootComponentType,
                            e.config,
                            0,
                            e.paramsInheritanceStrategy,
                            e.relativeLinkResolution
                          ),
                          Nu(function (t) {
                            "eager" === e.urlUpdateStrategy &&
                              (t.extras.skipLocationChange ||
                                e.setBrowserUrl(
                                  t.urlAfterRedirects,
                                  !!t.extras.replaceUrl,
                                  t.id,
                                  t.extras.state
                                ),
                              (e.browserUrlTree = t.urlAfterRedirects));
                          }),
                          Nu(function (t) {
                            var r = new Xl(
                              t.id,
                              e.serializeUrl(t.extractedUrl),
                              e.serializeUrl(t.urlAfterRedirects),
                              t.targetSnapshot
                            );
                            n.next(r);
                          })
                        );
                      if (
                        u &&
                        e.rawUrlTree &&
                        e.urlHandlingStrategy.shouldProcessUrl(e.rawUrlTree)
                      ) {
                        var l = t.extractedUrl,
                          c = t.source,
                          h = t.restoredState,
                          p = t.extras,
                          f = new Ql(t.id, e.serializeUrl(l), c, h);
                        n.next(f);
                        var d = Yc(l, e.rootComponentType).snapshot;
                        return Bs(
                          Object(r.a)({}, t, {
                            targetSnapshot: d,
                            urlAfterRedirects: l,
                            extras: Object(r.a)({}, p, {
                              skipLocationChange: !1,
                              replaceUrl: !1,
                            }),
                          })
                        );
                      }
                      return (
                        (e.rawUrlTree = t.rawUrl),
                        (e.browserUrlTree = t.urlAfterRedirects),
                        t.resolve(null),
                        $s
                      );
                    }),
                    tp(function (t) {
                      var n = t.extras;
                      return e.hooks.beforePreactivation(t.targetSnapshot, {
                        navigationId: t.id,
                        appliedUrlTree: t.extractedUrl,
                        rawUrlTree: t.rawUrl,
                        skipLocationChange: !!n.skipLocationChange,
                        replaceUrl: !!n.replaceUrl,
                      });
                    }),
                    Nu(function (t) {
                      var n = new Jl(
                        t.id,
                        e.serializeUrl(t.extractedUrl),
                        e.serializeUrl(t.urlAfterRedirects),
                        t.targetSnapshot
                      );
                      e.triggerEvent(n);
                    }),
                    F(function (t) {
                      return Object(r.a)({}, t, {
                        guards:
                          ((n = t.targetSnapshot),
                          (o = t.currentSnapshot),
                          (i = e.rootContexts),
                          (a = n._root),
                          Mh(a, o ? o._root : null, i, [a.value])),
                      });
                      var n, o, i, a;
                    }),
                    (function (t, e) {
                      return function (n) {
                        return n.pipe(
                          B(function (n) {
                            var o = n.targetSnapshot,
                              i = n.currentSnapshot,
                              a = n.guards,
                              s = a.canActivateChecks,
                              u = a.canDeactivateChecks;
                            return 0 === u.length && 0 === s.length
                              ? Bs(Object(r.a)({}, n, { guardsResult: !0 }))
                              : (function (t, e, n, r) {
                                  return z(t).pipe(
                                    B(function (t) {
                                      return (function (t, e, n, r, o) {
                                        var i =
                                          e && e.routeConfig
                                            ? e.routeConfig.canDeactivate
                                            : null;
                                        return i && 0 !== i.length
                                          ? Bs(
                                              i.map(function (i) {
                                                var a,
                                                  s = jh(i, e, o);
                                                if (
                                                  (function (t) {
                                                    return (
                                                      t && wh(t.canDeactivate)
                                                    );
                                                  })(s)
                                                )
                                                  a = kc(
                                                    s.canDeactivate(t, e, n, r)
                                                  );
                                                else {
                                                  if (!wh(s))
                                                    throw new Error(
                                                      "Invalid CanDeactivate guard"
                                                    );
                                                  a = kc(s(t, e, n, r));
                                                }
                                                return a.pipe(wu());
                                              })
                                            ).pipe(Lh())
                                          : Bs(!0);
                                      })(t.component, t.route, n, e, r);
                                    }),
                                    wu(function (t) {
                                      return !0 !== t;
                                    }, !0)
                                  );
                                })(u, o, i, t).pipe(
                                  B(function (n) {
                                    return n && "boolean" == typeof n
                                      ? (function (t, e, n, r) {
                                          return z(e).pipe(
                                            Iu(function (e) {
                                              return z([
                                                Hh(e.route.parent, r),
                                                Uh(e.route, r),
                                                Bh(t, e.path, n),
                                                zh(t, e.route, n),
                                              ]).pipe(
                                                Ys(),
                                                wu(function (t) {
                                                  return !0 !== t;
                                                }, !0)
                                              );
                                            }),
                                            wu(function (t) {
                                              return !0 !== t;
                                            }, !0)
                                          );
                                        })(o, s, t, e)
                                      : Bs(n);
                                  }),
                                  F(function (t) {
                                    return Object(r.a)({}, n, {
                                      guardsResult: t,
                                    });
                                  })
                                );
                          })
                        );
                      };
                    })(e.ngModule.injector, function (t) {
                      return e.triggerEvent(t);
                    }),
                    Nu(function (t) {
                      if (Ch(t.guardsResult)) {
                        var n = dc(
                          'Redirecting to "' +
                            e.serializeUrl(t.guardsResult) +
                            '"'
                        );
                        throw ((n.url = t.guardsResult), n);
                      }
                    }),
                    Nu(function (t) {
                      var n = new Yl(
                        t.id,
                        e.serializeUrl(t.extractedUrl),
                        e.serializeUrl(t.urlAfterRedirects),
                        t.targetSnapshot,
                        !!t.guardsResult
                      );
                      e.triggerEvent(n);
                    }),
                    tu(function (t) {
                      if (!t.guardsResult) {
                        e.resetUrlToCurrentUrlTree();
                        var r = new Zl(
                          t.id,
                          e.serializeUrl(t.extractedUrl),
                          ""
                        );
                        return n.next(r), t.resolve(!1), !1;
                      }
                      return !0;
                    }),
                    tp(function (t) {
                      if (t.guards.canActivateChecks.length)
                        return Bs(t).pipe(
                          Nu(function (t) {
                            var n = new tc(
                              t.id,
                              e.serializeUrl(t.extractedUrl),
                              e.serializeUrl(t.urlAfterRedirects),
                              t.targetSnapshot
                            );
                            e.triggerEvent(n);
                          }),
                          ((n = e.paramsInheritanceStrategy),
                          (o = e.ngModule.injector),
                          function (t) {
                            return t.pipe(
                              B(function (t) {
                                var e = t.targetSnapshot,
                                  i = t.guards.canActivateChecks;
                                return i.length
                                  ? z(i).pipe(
                                      Iu(function (t) {
                                        return (function (t, e, n, o) {
                                          return (function (t, e, n, r) {
                                            var o = Object.keys(t);
                                            if (0 === o.length) return Bs({});
                                            if (1 === o.length) {
                                              var i = o[0];
                                              return Yh(t[i], e, n, r).pipe(
                                                F(function (t) {
                                                  var e;
                                                  return ((e = {})[i] = t), e;
                                                })
                                              );
                                            }
                                            var a = {};
                                            return z(o)
                                              .pipe(
                                                B(function (o) {
                                                  return Yh(t[o], e, n, r).pipe(
                                                    F(function (t) {
                                                      return (a[o] = t), t;
                                                    })
                                                  );
                                                })
                                              )
                                              .pipe(
                                                du(),
                                                F(function () {
                                                  return a;
                                                })
                                              );
                                          })(t._resolve, t, e, o).pipe(
                                            F(function (e) {
                                              return (
                                                (t._resolvedData = e),
                                                (t.data = Object(r.a)(
                                                  {},
                                                  t.data,
                                                  eh(t, n).resolve
                                                )),
                                                null
                                              );
                                            })
                                          );
                                        })(t.route, e, n, o);
                                      }),
                                      (function (t, e) {
                                        return arguments.length >= 2
                                          ? function (n) {
                                              return b(
                                                Ou(t, e),
                                                ou(1),
                                                hu(e)
                                              )(n);
                                            }
                                          : function (e) {
                                              return b(
                                                Ou(function (e, n, r) {
                                                  return t(e, n, r + 1);
                                                }),
                                                ou(1)
                                              )(e);
                                            };
                                      })(function (t, e) {
                                        return t;
                                      }),
                                      F(function (e) {
                                        return t;
                                      })
                                    )
                                  : Bs(t);
                              })
                            );
                          }),
                          Nu(function (t) {
                            var n = new ec(
                              t.id,
                              e.serializeUrl(t.extractedUrl),
                              e.serializeUrl(t.urlAfterRedirects),
                              t.targetSnapshot
                            );
                            e.triggerEvent(n);
                          })
                        );
                      var n, o;
                    }),
                    tp(function (t) {
                      var n = t.extras;
                      return e.hooks.afterPreactivation(t.targetSnapshot, {
                        navigationId: t.id,
                        appliedUrlTree: t.extractedUrl,
                        rawUrlTree: t.rawUrl,
                        skipLocationChange: !!n.skipLocationChange,
                        replaceUrl: !!n.replaceUrl,
                      });
                    }),
                    F(function (t) {
                      var n,
                        o,
                        i,
                        a =
                          ((i = (function t(e, n, o) {
                            if (
                              o &&
                              e.shouldReuseRoute(n.value, o.value.snapshot)
                            ) {
                              (l = o.value)._futureSnapshot = n.value;
                              var i = (function (e, n, o) {
                                return n.children.map(function (n) {
                                  var i, a;
                                  try {
                                    for (
                                      var s = Object(r.e)(o.children),
                                        u = s.next();
                                      !u.done;
                                      u = s.next()
                                    ) {
                                      var l = u.value;
                                      if (
                                        e.shouldReuseRoute(
                                          l.value.snapshot,
                                          n.value
                                        )
                                      )
                                        return t(e, n, l);
                                    }
                                  } catch (c) {
                                    i = { error: c };
                                  } finally {
                                    try {
                                      u &&
                                        !u.done &&
                                        (a = s.return) &&
                                        a.call(s);
                                    } finally {
                                      if (i) throw i.error;
                                    }
                                  }
                                  return t(e, n);
                                });
                              })(e, n, o);
                              return new $c(l, i);
                            }
                            var a = e.retrieve(n.value);
                            if (a) {
                              var s = a.route;
                              return (
                                (function t(e, n) {
                                  if (
                                    e.value.routeConfig !== n.value.routeConfig
                                  )
                                    throw new Error(
                                      "Cannot reattach ActivatedRouteSnapshot created from a different route"
                                    );
                                  if (e.children.length !== n.children.length)
                                    throw new Error(
                                      "Cannot reattach ActivatedRouteSnapshot with a different number of children"
                                    );
                                  n.value._futureSnapshot = e.value;
                                  for (var r = 0; r < e.children.length; ++r)
                                    t(e.children[r], n.children[r]);
                                })(n, s),
                                s
                              );
                            }
                            var u,
                              l = new th(
                                new qs((u = n.value).url),
                                new qs(u.params),
                                new qs(u.queryParams),
                                new qs(u.fragment),
                                new qs(u.data),
                                u.outlet,
                                u.component,
                                u
                              );
                            return (
                              (i = n.children.map(function (n) {
                                return t(e, n);
                              })),
                              new $c(l, i)
                            );
                          })(
                            e.routeReuseStrategy,
                            (n = t.targetSnapshot)._root,
                            (o = t.currentRouterState) ? o._root : void 0
                          )),
                          new Jc(i, n));
                      return Object(r.a)({}, t, { targetRouterState: a });
                    }),
                    Nu(function (t) {
                      (e.currentUrlTree = t.urlAfterRedirects),
                        (e.rawUrlTree = e.urlHandlingStrategy.merge(
                          e.currentUrlTree,
                          t.rawUrl
                        )),
                        (e.routerState = t.targetRouterState),
                        "deferred" === e.urlUpdateStrategy &&
                          (t.extras.skipLocationChange ||
                            e.setBrowserUrl(
                              e.rawUrlTree,
                              !!t.extras.replaceUrl,
                              t.id,
                              t.extras.state
                            ),
                          (e.browserUrlTree = t.urlAfterRedirects));
                    }),
                    ((i = e.rootContexts),
                    (a = e.routeReuseStrategy),
                    (s = function (t) {
                      return e.triggerEvent(t);
                    }),
                    F(function (t) {
                      return (
                        new bh(
                          a,
                          t.targetRouterState,
                          t.currentRouterState,
                          s
                        ).activate(i),
                        t
                      );
                    })),
                    Nu({
                      next: function () {
                        u = !0;
                      },
                      complete: function () {
                        u = !0;
                      },
                    }),
                    ((o = function () {
                      if (!u && !l) {
                        e.resetUrlToCurrentUrlTree();
                        var r = new Zl(
                          t.id,
                          e.serializeUrl(t.extractedUrl),
                          "Navigation ID " +
                            t.id +
                            " is not equal to the current navigation id " +
                            e.navigationId
                        );
                        n.next(r), t.resolve(!1);
                      }
                      e.currentNavigation = null;
                    }),
                    function (t) {
                      return t.lift(new ju(o));
                    }),
                    mu(function (r) {
                      if (((l = !0), (s = r) && s[fc])) {
                        var o = Ch(r.url);
                        o ||
                          ((e.navigated = !0),
                          e.resetStateAndUrl(
                            t.currentRouterState,
                            t.currentUrlTree,
                            t.rawUrl
                          ));
                        var i = new Zl(
                          t.id,
                          e.serializeUrl(t.extractedUrl),
                          r.message
                        );
                        n.next(i), t.resolve(!1), o && e.navigateByUrl(r.url);
                      } else {
                        e.resetStateAndUrl(
                          t.currentRouterState,
                          t.currentUrlTree,
                          t.rawUrl
                        );
                        var a = new $l(t.id, e.serializeUrl(t.extractedUrl), r);
                        n.next(a);
                        try {
                          t.resolve(e.errorHandler(r));
                        } catch (u) {
                          t.reject(u);
                        }
                      }
                      var s;
                      return $s;
                    })
                  );
                })
              );
            }),
            (t.prototype.resetRootComponentType = function (t) {
              (this.rootComponentType = t),
                (this.routerState.root.component = this.rootComponentType);
            }),
            (t.prototype.getTransition = function () {
              var t = this.transitions.value;
              return (t.urlAfterRedirects = this.browserUrlTree), t;
            }),
            (t.prototype.setTransition = function (t) {
              this.transitions.next(Object(r.a)({}, this.getTransition(), t));
            }),
            (t.prototype.initialNavigation = function () {
              this.setUpLocationChangeListener(),
                0 === this.navigationId &&
                  this.navigateByUrl(this.location.path(!0), {
                    replaceUrl: !0,
                  });
            }),
            (t.prototype.setUpLocationChangeListener = function () {
              var t = this;
              this.locationSubscription ||
                (this.locationSubscription = this.location.subscribe(function (
                  e
                ) {
                  var n = t.parseUrl(e.url),
                    r = "popstate" === e.type ? "popstate" : "hashchange",
                    o = e.state && e.state.navigationId ? e.state : null;
                  setTimeout(function () {
                    t.scheduleNavigation(n, r, o, { replaceUrl: !0 });
                  }, 0);
                }));
            }),
            Object.defineProperty(t.prototype, "url", {
              get: function () {
                return this.serializeUrl(this.currentUrlTree);
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.getCurrentNavigation = function () {
              return this.currentNavigation;
            }),
            (t.prototype.triggerEvent = function (t) {
              this.events.next(t);
            }),
            (t.prototype.resetConfig = function (t) {
              gc(t),
                (this.config = t.map(_c)),
                (this.navigated = !1),
                (this.lastSuccessfulId = -1);
            }),
            (t.prototype.ngOnDestroy = function () {
              this.dispose();
            }),
            (t.prototype.dispose = function () {
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = null));
            }),
            (t.prototype.createUrlTree = function (t, e) {
              void 0 === e && (e = {});
              var n = e.relativeTo,
                o = e.queryParams,
                i = e.fragment,
                a = e.preserveQueryParams,
                s = e.queryParamsHandling,
                u = e.preserveFragment;
              Xt() &&
                a &&
                console &&
                console.warn &&
                console.warn(
                  "preserveQueryParams is deprecated, use queryParamsHandling instead."
                );
              var l = n || this.routerState.root,
                c = u ? this.currentUrlTree.fragment : i,
                h = null;
              if (s)
                switch (s) {
                  case "merge":
                    h = Object(r.a)({}, this.currentUrlTree.queryParams, o);
                    break;
                  case "preserve":
                    h = this.currentUrlTree.queryParams;
                    break;
                  default:
                    h = o || null;
                }
              else h = a ? this.currentUrlTree.queryParams : o || null;
              return (
                null !== h && (h = this.removeEmptyProps(h)),
                (function (t, e, n, o, i) {
                  if (0 === n.length) return lh(e.root, e.root, e, o, i);
                  var a = (function (t) {
                    if (
                      "string" == typeof t[0] &&
                      1 === t.length &&
                      "/" === t[0]
                    )
                      return new ch(!0, 0, t);
                    var e = 0,
                      n = !1,
                      o = t.reduce(function (t, o, i) {
                        if ("object" == typeof o && null != o) {
                          if (o.outlets) {
                            var a = {};
                            return (
                              Sc(o.outlets, function (t, e) {
                                a[e] = "string" == typeof t ? t.split("/") : t;
                              }),
                              Object(r.d)(t, [{ outlets: a }])
                            );
                          }
                          if (o.segmentPath)
                            return Object(r.d)(t, [o.segmentPath]);
                        }
                        return "string" != typeof o
                          ? Object(r.d)(t, [o])
                          : 0 === i
                          ? (o.split("/").forEach(function (r, o) {
                              (0 == o && "." === r) ||
                                (0 == o && "" === r
                                  ? (n = !0)
                                  : ".." === r
                                  ? e++
                                  : "" != r && t.push(r));
                            }),
                            t)
                          : Object(r.d)(t, [o]);
                      }, []);
                    return new ch(n, e, o);
                  })(n);
                  if (a.toRoot()) return lh(e.root, new Oc([], {}), e, o, i);
                  var s = (function (t, e, n) {
                      if (t.isAbsolute) return new hh(e.root, !0, 0);
                      if (-1 === n.snapshot._lastPathIndex)
                        return new hh(n.snapshot._urlSegment, !0, 0);
                      var r = uh(t.commands[0]) ? 0 : 1;
                      return (function (t, e, n) {
                        for (var r = t, o = e, i = n; i > o; ) {
                          if (((i -= o), !(r = r.parent)))
                            throw new Error("Invalid number of '../'");
                          o = r.segments.length;
                        }
                        return new hh(r, !1, o - i);
                      })(
                        n.snapshot._urlSegment,
                        n.snapshot._lastPathIndex + r,
                        t.numberOfDoubleDots
                      );
                    })(a, e, t),
                    u = s.processChildren
                      ? dh(s.segmentGroup, s.index, a.commands)
                      : fh(s.segmentGroup, s.index, a.commands);
                  return lh(s.segmentGroup, u, e, o, i);
                })(l, this.currentUrlTree, t, h, c)
              );
            }),
            (t.prototype.navigateByUrl = function (t, e) {
              void 0 === e && (e = { skipLocationChange: !1 }),
                Xt() &&
                  this.isNgZoneEnabled &&
                  !ni.isInAngularZone() &&
                  this.console.warn(
                    "Navigation triggered outside Angular zone, did you forget to call 'ngZone.run()'?"
                  );
              var n = Ch(t) ? t : this.parseUrl(t),
                r = this.urlHandlingStrategy.merge(n, this.rawUrlTree);
              return this.scheduleNavigation(r, "imperative", null, e);
            }),
            (t.prototype.navigate = function (t, e) {
              return (
                void 0 === e && (e = { skipLocationChange: !1 }),
                (function (t) {
                  for (var e = 0; e < t.length; e++) {
                    var n = t[e];
                    if (null == n)
                      throw new Error(
                        "The requested path contains " +
                          n +
                          " segment at index " +
                          e
                      );
                  }
                })(t),
                this.navigateByUrl(this.createUrlTree(t, e), e)
              );
            }),
            (t.prototype.serializeUrl = function (t) {
              return this.urlSerializer.serialize(t);
            }),
            (t.prototype.parseUrl = function (t) {
              var e;
              try {
                e = this.urlSerializer.parse(t);
              } catch (n) {
                e = this.malformedUriErrorHandler(n, this.urlSerializer, t);
              }
              return e;
            }),
            (t.prototype.isActive = function (t, e) {
              if (Ch(t)) return Tc(this.currentUrlTree, t, e);
              var n = this.parseUrl(t);
              return Tc(this.currentUrlTree, n, e);
            }),
            (t.prototype.removeEmptyProps = function (t) {
              return Object.keys(t).reduce(function (e, n) {
                var r = t[n];
                return null != r && (e[n] = r), e;
              }, {});
            }),
            (t.prototype.processNavigations = function () {
              var t = this;
              this.navigations.subscribe(
                function (e) {
                  (t.navigated = !0),
                    (t.lastSuccessfulId = e.id),
                    t.events.next(
                      new Kl(
                        e.id,
                        t.serializeUrl(e.extractedUrl),
                        t.serializeUrl(t.currentUrlTree)
                      )
                    ),
                    (t.lastSuccessfulNavigation = t.currentNavigation),
                    (t.currentNavigation = null),
                    e.resolve(!0);
                },
                function (e) {
                  t.console.warn("Unhandled Navigation Error: ");
                }
              );
            }),
            (t.prototype.scheduleNavigation = function (t, e, n, r) {
              var o = this.getTransition();
              if (
                o &&
                "imperative" !== e &&
                "imperative" === o.source &&
                o.rawUrl.toString() === t.toString()
              )
                return Promise.resolve(!0);
              if (
                o &&
                "hashchange" == e &&
                "popstate" === o.source &&
                o.rawUrl.toString() === t.toString()
              )
                return Promise.resolve(!0);
              if (
                o &&
                "popstate" == e &&
                "hashchange" === o.source &&
                o.rawUrl.toString() === t.toString()
              )
                return Promise.resolve(!0);
              var i = null,
                a = null,
                s = new Promise(function (t, e) {
                  (i = t), (a = e);
                }),
                u = ++this.navigationId;
              return (
                this.setTransition({
                  id: u,
                  source: e,
                  restoredState: n,
                  currentUrlTree: this.currentUrlTree,
                  currentRawUrl: this.rawUrlTree,
                  rawUrl: t,
                  extras: r,
                  resolve: i,
                  reject: a,
                  promise: s,
                  currentSnapshot: this.routerState.snapshot,
                  currentRouterState: this.routerState,
                }),
                s.catch(function (t) {
                  return Promise.reject(t);
                })
              );
            }),
            (t.prototype.setBrowserUrl = function (t, e, n, o) {
              var i = this.urlSerializer.serialize(t);
              (o = o || {}),
                this.location.isCurrentPathEqualTo(i) || e
                  ? this.location.replaceState(
                      i,
                      "",
                      Object(r.a)({}, o, { navigationId: n })
                    )
                  : this.location.go(
                      i,
                      "",
                      Object(r.a)({}, o, { navigationId: n })
                    );
            }),
            (t.prototype.resetStateAndUrl = function (t, e, n) {
              (this.routerState = t),
                (this.currentUrlTree = e),
                (this.rawUrlTree = this.urlHandlingStrategy.merge(
                  this.currentUrlTree,
                  n
                )),
                this.resetUrlToCurrentUrlTree();
            }),
            (t.prototype.resetUrlToCurrentUrlTree = function () {
              this.location.replaceState(
                this.urlSerializer.serialize(this.rawUrlTree),
                "",
                { navigationId: this.lastSuccessfulId }
              );
            }),
            t
          );
        })(),
        hp = (function () {
          function t(t, e, n, r, o) {
            (this.router = t),
              (this.route = e),
              (this.commands = []),
              null == n && r.setAttribute(o.nativeElement, "tabindex", "0");
          }
          return (
            Object.defineProperty(t.prototype, "routerLink", {
              set: function (t) {
                this.commands = null != t ? (Array.isArray(t) ? t : [t]) : [];
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "preserveQueryParams", {
              set: function (t) {
                Xt() &&
                  console &&
                  console.warn &&
                  console.warn(
                    "preserveQueryParams is deprecated!, use queryParamsHandling instead."
                  ),
                  (this.preserve = t);
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.onClick = function () {
              var t = {
                skipLocationChange: fp(this.skipLocationChange),
                replaceUrl: fp(this.replaceUrl),
              };
              return this.router.navigateByUrl(this.urlTree, t), !0;
            }),
            Object.defineProperty(t.prototype, "urlTree", {
              get: function () {
                return this.router.createUrlTree(this.commands, {
                  relativeTo: this.route,
                  queryParams: this.queryParams,
                  fragment: this.fragment,
                  preserveQueryParams: fp(this.preserve),
                  queryParamsHandling: this.queryParamsHandling,
                  preserveFragment: fp(this.preserveFragment),
                });
              },
              enumerable: !0,
              configurable: !0,
            }),
            t
          );
        })(),
        pp = (function () {
          function t(t, e, n) {
            var r = this;
            (this.router = t),
              (this.route = e),
              (this.locationStrategy = n),
              (this.commands = []),
              (this.subscription = t.events.subscribe(function (t) {
                t instanceof Kl && r.updateTargetUrlAndHref();
              }));
          }
          return (
            Object.defineProperty(t.prototype, "routerLink", {
              set: function (t) {
                this.commands = null != t ? (Array.isArray(t) ? t : [t]) : [];
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "preserveQueryParams", {
              set: function (t) {
                Xt() &&
                  console &&
                  console.warn &&
                  console.warn(
                    "preserveQueryParams is deprecated, use queryParamsHandling instead."
                  ),
                  (this.preserve = t);
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.ngOnChanges = function (t) {
              this.updateTargetUrlAndHref();
            }),
            (t.prototype.ngOnDestroy = function () {
              this.subscription.unsubscribe();
            }),
            (t.prototype.onClick = function (t, e, n, r) {
              if (0 !== t || e || n || r) return !0;
              if ("string" == typeof this.target && "_self" != this.target)
                return !0;
              var o = {
                skipLocationChange: fp(this.skipLocationChange),
                replaceUrl: fp(this.replaceUrl),
                state: this.state,
              };
              return this.router.navigateByUrl(this.urlTree, o), !1;
            }),
            (t.prototype.updateTargetUrlAndHref = function () {
              this.href = this.locationStrategy.prepareExternalUrl(
                this.router.serializeUrl(this.urlTree)
              );
            }),
            Object.defineProperty(t.prototype, "urlTree", {
              get: function () {
                return this.router.createUrlTree(this.commands, {
                  relativeTo: this.route,
                  queryParams: this.queryParams,
                  fragment: this.fragment,
                  preserveQueryParams: fp(this.preserve),
                  queryParamsHandling: this.queryParamsHandling,
                  preserveFragment: fp(this.preserveFragment),
                });
              },
              enumerable: !0,
              configurable: !0,
            }),
            t
          );
        })();
      function fp(t) {
        return "" === t || !!t;
      }
      var dp = (function () {
          function t(t, e, n, r, o) {
            var i = this;
            (this.router = t),
              (this.element = e),
              (this.renderer = n),
              (this.link = r),
              (this.linkWithHref = o),
              (this.classes = []),
              (this.isActive = !1),
              (this.routerLinkActiveOptions = { exact: !1 }),
              (this.subscription = t.events.subscribe(function (t) {
                t instanceof Kl && i.update();
              }));
          }
          return (
            (t.prototype.ngAfterContentInit = function () {
              var t = this;
              this.links.changes.subscribe(function (e) {
                return t.update();
              }),
                this.linksWithHrefs.changes.subscribe(function (e) {
                  return t.update();
                }),
                this.update();
            }),
            Object.defineProperty(t.prototype, "routerLinkActive", {
              set: function (t) {
                var e = Array.isArray(t) ? t : t.split(" ");
                this.classes = e.filter(function (t) {
                  return !!t;
                });
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.ngOnChanges = function (t) {
              this.update();
            }),
            (t.prototype.ngOnDestroy = function () {
              this.subscription.unsubscribe();
            }),
            (t.prototype.update = function () {
              var t = this;
              this.links &&
                this.linksWithHrefs &&
                this.router.navigated &&
                Promise.resolve().then(function () {
                  var e = t.hasActiveLinks();
                  t.isActive !== e &&
                    ((t.isActive = e),
                    t.classes.forEach(function (n) {
                      e
                        ? t.renderer.addClass(t.element.nativeElement, n)
                        : t.renderer.removeClass(t.element.nativeElement, n);
                    }));
                });
            }),
            (t.prototype.isLinkActive = function (t) {
              var e = this;
              return function (n) {
                return t.isActive(n.urlTree, e.routerLinkActiveOptions.exact);
              };
            }),
            (t.prototype.hasActiveLinks = function () {
              var t = this.isLinkActive(this.router);
              return (
                (this.link && t(this.link)) ||
                (this.linkWithHref && t(this.linkWithHref)) ||
                this.links.some(t) ||
                this.linksWithHrefs.some(t)
              );
            }),
            t
          );
        })(),
        mp = (function () {
          return function () {
            (this.outlet = null),
              (this.route = null),
              (this.resolver = null),
              (this.children = new yp()),
              (this.attachRef = null);
          };
        })(),
        yp = (function () {
          function t() {
            this.contexts = new Map();
          }
          return (
            (t.prototype.onChildOutletCreated = function (t, e) {
              var n = this.getOrCreateContext(t);
              (n.outlet = e), this.contexts.set(t, n);
            }),
            (t.prototype.onChildOutletDestroyed = function (t) {
              var e = this.getContext(t);
              e && (e.outlet = null);
            }),
            (t.prototype.onOutletDeactivated = function () {
              var t = this.contexts;
              return (this.contexts = new Map()), t;
            }),
            (t.prototype.onOutletReAttached = function (t) {
              this.contexts = t;
            }),
            (t.prototype.getOrCreateContext = function (t) {
              var e = this.getContext(t);
              return e || ((e = new mp()), this.contexts.set(t, e)), e;
            }),
            (t.prototype.getContext = function (t) {
              return this.contexts.get(t) || null;
            }),
            t
          );
        })(),
        gp = (function () {
          function t(t, e, n, r, o) {
            (this.parentContexts = t),
              (this.location = e),
              (this.resolver = n),
              (this.changeDetector = o),
              (this.activated = null),
              (this._activatedRoute = null),
              (this.activateEvents = new To()),
              (this.deactivateEvents = new To()),
              (this.name = r || cc),
              t.onChildOutletCreated(this.name, this);
          }
          return (
            (t.prototype.ngOnDestroy = function () {
              this.parentContexts.onChildOutletDestroyed(this.name);
            }),
            (t.prototype.ngOnInit = function () {
              if (!this.activated) {
                var t = this.parentContexts.getContext(this.name);
                t &&
                  t.route &&
                  (t.attachRef
                    ? this.attach(t.attachRef, t.route)
                    : this.activateWith(t.route, t.resolver || null));
              }
            }),
            Object.defineProperty(t.prototype, "isActivated", {
              get: function () {
                return !!this.activated;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "component", {
              get: function () {
                if (!this.activated) throw new Error("Outlet is not activated");
                return this.activated.instance;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "activatedRoute", {
              get: function () {
                if (!this.activated) throw new Error("Outlet is not activated");
                return this._activatedRoute;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "activatedRouteData", {
              get: function () {
                return this._activatedRoute
                  ? this._activatedRoute.snapshot.data
                  : {};
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.detach = function () {
              if (!this.activated) throw new Error("Outlet is not activated");
              this.location.detach();
              var t = this.activated;
              return (this.activated = null), (this._activatedRoute = null), t;
            }),
            (t.prototype.attach = function (t, e) {
              (this.activated = t),
                (this._activatedRoute = e),
                this.location.insert(t.hostView);
            }),
            (t.prototype.deactivate = function () {
              if (this.activated) {
                var t = this.component;
                this.activated.destroy(),
                  (this.activated = null),
                  (this._activatedRoute = null),
                  this.deactivateEvents.emit(t);
              }
            }),
            (t.prototype.activateWith = function (t, e) {
              if (this.isActivated)
                throw new Error("Cannot activate an already activated outlet");
              this._activatedRoute = t;
              var n = (e = e || this.resolver).resolveComponentFactory(
                  t._futureSnapshot.routeConfig.component
                ),
                r = this.parentContexts.getOrCreateContext(this.name).children,
                o = new vp(t, r, this.location.injector);
              (this.activated = this.location.createComponent(
                n,
                this.location.length,
                o
              )),
                this.changeDetector.markForCheck(),
                this.activateEvents.emit(this.activated.instance);
            }),
            t
          );
        })(),
        vp = (function () {
          function t(t, e, n) {
            (this.route = t), (this.childContexts = e), (this.parent = n);
          }
          return (
            (t.prototype.get = function (t, e) {
              return t === th
                ? this.route
                : t === yp
                ? this.childContexts
                : this.parent.get(t, e);
            }),
            t
          );
        })(),
        bp = (function () {
          return function () {};
        })(),
        _p = (function () {
          function t() {}
          return (
            (t.prototype.preload = function (t, e) {
              return e().pipe(
                mu(function () {
                  return Bs(null);
                })
              );
            }),
            t
          );
        })(),
        wp = (function () {
          function t() {}
          return (
            (t.prototype.preload = function (t, e) {
              return Bs(null);
            }),
            t
          );
        })(),
        Cp = (function () {
          function t(t, e, n, r, o) {
            (this.router = t),
              (this.injector = r),
              (this.preloadingStrategy = o),
              (this.loader = new op(
                e,
                n,
                function (e) {
                  return t.triggerEvent(new nc(e));
                },
                function (e) {
                  return t.triggerEvent(new rc(e));
                }
              ));
          }
          return (
            (t.prototype.setUpPreloading = function () {
              var t = this;
              this.subscription = this.router.events
                .pipe(
                  tu(function (t) {
                    return t instanceof Kl;
                  }),
                  Iu(function () {
                    return t.preload();
                  })
                )
                .subscribe(function () {});
            }),
            (t.prototype.preload = function () {
              var t = this.injector.get(Mt);
              return this.processRoutes(t, this.router.config);
            }),
            (t.prototype.ngOnDestroy = function () {
              this.subscription.unsubscribe();
            }),
            (t.prototype.processRoutes = function (t, e) {
              var n,
                o,
                i = [];
              try {
                for (
                  var a = Object(r.e)(e), s = a.next();
                  !s.done;
                  s = a.next()
                ) {
                  var u = s.value;
                  if (u.loadChildren && !u.canLoad && u._loadedConfig) {
                    var l = u._loadedConfig;
                    i.push(this.processRoutes(l.module, l.routes));
                  } else
                    u.loadChildren && !u.canLoad
                      ? i.push(this.preloadConfig(t, u))
                      : u.children && i.push(this.processRoutes(t, u.children));
                }
              } catch (c) {
                n = { error: c };
              } finally {
                try {
                  s && !s.done && (o = a.return) && o.call(a);
                } finally {
                  if (n) throw n.error;
                }
              }
              return z(i).pipe(
                Q(),
                F(function (t) {})
              );
            }),
            (t.prototype.preloadConfig = function (t, e) {
              var n = this;
              return this.preloadingStrategy.preload(e, function () {
                return n.loader.load(t.injector, e).pipe(
                  B(function (t) {
                    return (
                      (e._loadedConfig = t), n.processRoutes(t.module, t.routes)
                    );
                  })
                );
              });
            }),
            t
          );
        })(),
        Ep = (function () {
          function t(t, e, n) {
            void 0 === n && (n = {}),
              (this.router = t),
              (this.viewportScroller = e),
              (this.options = n),
              (this.lastId = 0),
              (this.lastSource = "imperative"),
              (this.restoredId = 0),
              (this.store = {}),
              (n.scrollPositionRestoration =
                n.scrollPositionRestoration || "disabled"),
              (n.anchorScrolling = n.anchorScrolling || "disabled");
          }
          return (
            (t.prototype.init = function () {
              "disabled" !== this.options.scrollPositionRestoration &&
                this.viewportScroller.setHistoryScrollRestoration("manual"),
                (this.routerEventsSubscription = this.createScrollEvents()),
                (this.scrollEventsSubscription = this.consumeScrollEvents());
            }),
            (t.prototype.createScrollEvents = function () {
              var t = this;
              return this.router.events.subscribe(function (e) {
                e instanceof Ql
                  ? ((t.store[t.lastId] =
                      t.viewportScroller.getScrollPosition()),
                    (t.lastSource = e.navigationTrigger),
                    (t.restoredId = e.restoredState
                      ? e.restoredState.navigationId
                      : 0))
                  : e instanceof Kl &&
                    ((t.lastId = e.id),
                    t.scheduleScrollEvent(
                      e,
                      t.router.parseUrl(e.urlAfterRedirects).fragment
                    ));
              });
            }),
            (t.prototype.consumeScrollEvents = function () {
              var t = this;
              return this.router.events.subscribe(function (e) {
                e instanceof uc &&
                  (e.position
                    ? "top" === t.options.scrollPositionRestoration
                      ? t.viewportScroller.scrollToPosition([0, 0])
                      : "enabled" === t.options.scrollPositionRestoration &&
                        t.viewportScroller.scrollToPosition(e.position)
                    : e.anchor && "enabled" === t.options.anchorScrolling
                    ? t.viewportScroller.scrollToAnchor(e.anchor)
                    : "disabled" !== t.options.scrollPositionRestoration &&
                      t.viewportScroller.scrollToPosition([0, 0]));
              });
            }),
            (t.prototype.scheduleScrollEvent = function (t, e) {
              this.router.triggerEvent(
                new uc(
                  t,
                  "popstate" === this.lastSource
                    ? this.store[this.restoredId]
                    : null,
                  e
                )
              );
            }),
            (t.prototype.ngOnDestroy = function () {
              this.routerEventsSubscription &&
                this.routerEventsSubscription.unsubscribe(),
                this.scrollEventsSubscription &&
                  this.scrollEventsSubscription.unsubscribe();
            }),
            t
          );
        })(),
        Sp = new Et("ROUTER_CONFIGURATION"),
        kp = new Et("ROUTER_FORROOT_GUARD"),
        Tp = [
          ms,
          { provide: Nc, useClass: Rc },
          {
            provide: cp,
            useFactory: Rp,
            deps: [
              bi,
              Nc,
              yp,
              ms,
              Pe,
              wi,
              Qo,
              rp,
              Sp,
              [ip, new it()],
              [ep, new it()],
            ],
          },
          yp,
          { provide: th, useFactory: Dp, deps: [cp] },
          { provide: wi, useClass: Si },
          Cp,
          wp,
          _p,
          { provide: Sp, useValue: { enableTracing: !1 } },
        ];
      function xp() {
        return new di("Router", cp);
      }
      var Op = (function () {
        function t(t, e) {}
        var e;
        return (
          (e = t),
          (t.forRoot = function (t, n) {
            return {
              ngModule: e,
              providers: [
                Tp,
                Np(t),
                {
                  provide: kp,
                  useFactory: Ip,
                  deps: [[cp, new it(), new st()]],
                },
                { provide: Sp, useValue: n || {} },
                {
                  provide: fs,
                  useFactory: Ap,
                  deps: [hs, [new ot(ds), new it()], Sp],
                },
                { provide: Ep, useFactory: Pp, deps: [cp, Hs, Sp] },
                {
                  provide: bp,
                  useExisting:
                    n && n.preloadingStrategy ? n.preloadingStrategy : wp,
                },
                { provide: di, multi: !0, useFactory: xp },
                [
                  jp,
                  { provide: Po, multi: !0, useFactory: Mp, deps: [jp] },
                  { provide: Fp, useFactory: Vp, deps: [jp] },
                  { provide: Mo, multi: !0, useExisting: Fp },
                ],
              ],
            };
          }),
          (t.forChild = function (t) {
            return { ngModule: e, providers: [Np(t)] };
          }),
          t
        );
      })();
      function Pp(t, e, n) {
        return n.scrollOffset && e.setOffset(n.scrollOffset), new Ep(t, e, n);
      }
      function Ap(t, e, n) {
        return (
          void 0 === n && (n = {}), n.useHash ? new gs(t, e) : new vs(t, e)
        );
      }
      function Ip(t) {
        if (t)
          throw new Error(
            "RouterModule.forRoot() called twice. Lazy loaded modules should use RouterModule.forChild() instead."
          );
        return "guarded";
      }
      function Np(t) {
        return [
          { provide: Ve, multi: !0, useValue: t },
          { provide: rp, multi: !0, useValue: t },
        ];
      }
      function Rp(t, e, n, r, o, i, a, s, u, l, c) {
        void 0 === u && (u = {});
        var h = new cp(null, e, n, r, o, i, a, Cc(s));
        if (
          (l && (h.urlHandlingStrategy = l),
          c && (h.routeReuseStrategy = c),
          u.errorHandler && (h.errorHandler = u.errorHandler),
          u.malformedUriErrorHandler &&
            (h.malformedUriErrorHandler = u.malformedUriErrorHandler),
          u.enableTracing)
        ) {
          var p = Fu();
          h.events.subscribe(function (t) {
            p.logGroup("Router Event: " + t.constructor.name),
              p.log(t.toString()),
              p.log(t),
              p.logGroupEnd();
          });
        }
        return (
          u.onSameUrlNavigation &&
            (h.onSameUrlNavigation = u.onSameUrlNavigation),
          u.paramsInheritanceStrategy &&
            (h.paramsInheritanceStrategy = u.paramsInheritanceStrategy),
          u.urlUpdateStrategy && (h.urlUpdateStrategy = u.urlUpdateStrategy),
          u.relativeLinkResolution &&
            (h.relativeLinkResolution = u.relativeLinkResolution),
          h
        );
      }
      function Dp(t) {
        return t.routerState.root;
      }
      var jp = (function () {
        function t(t) {
          (this.injector = t),
            (this.initNavigation = !1),
            (this.resultOfPreactivationDone = new T());
        }
        return (
          (t.prototype.appInitializer = function () {
            var t = this;
            return this.injector
              .get(ps, Promise.resolve(null))
              .then(function () {
                var e = null,
                  n = new Promise(function (t) {
                    return (e = t);
                  }),
                  r = t.injector.get(cp),
                  o = t.injector.get(Sp);
                if (t.isLegacyDisabled(o) || t.isLegacyEnabled(o)) e(!0);
                else if ("disabled" === o.initialNavigation)
                  r.setUpLocationChangeListener(), e(!0);
                else {
                  if ("enabled" !== o.initialNavigation)
                    throw new Error(
                      "Invalid initialNavigation options: '" +
                        o.initialNavigation +
                        "'"
                    );
                  (r.hooks.afterPreactivation = function () {
                    return t.initNavigation
                      ? Bs(null)
                      : ((t.initNavigation = !0),
                        e(!0),
                        t.resultOfPreactivationDone);
                  }),
                    r.initialNavigation();
                }
                return n;
              });
          }),
          (t.prototype.bootstrapListener = function (t) {
            var e = this.injector.get(Sp),
              n = this.injector.get(Cp),
              r = this.injector.get(Ep),
              o = this.injector.get(cp),
              i = this.injector.get(bi);
            t === i.components[0] &&
              (this.isLegacyEnabled(e)
                ? o.initialNavigation()
                : this.isLegacyDisabled(e) && o.setUpLocationChangeListener(),
              n.setUpPreloading(),
              r.init(),
              o.resetRootComponentType(i.componentTypes[0]),
              this.resultOfPreactivationDone.next(null),
              this.resultOfPreactivationDone.complete());
          }),
          (t.prototype.isLegacyEnabled = function (t) {
            return (
              "legacy_enabled" === t.initialNavigation ||
              !0 === t.initialNavigation ||
              void 0 === t.initialNavigation
            );
          }),
          (t.prototype.isLegacyDisabled = function (t) {
            return (
              "legacy_disabled" === t.initialNavigation ||
              !1 === t.initialNavigation
            );
          }),
          t
        );
      })();
      function Mp(t) {
        return t.appInitializer.bind(t);
      }
      function Vp(t) {
        return t.bootstrapListener.bind(t);
      }
      var Fp = new Et("Router Initializer"),
        Lp = Kn({ encapsulation: 2, styles: [], data: {} });
      function Up(t) {
        return ea(
          0,
          [
            (t()(),
            Li(
              0,
              16777216,
              null,
              null,
              1,
              "router-outlet",
              [],
              null,
              null,
              null,
              null,
              null
            )),
            no(1, 212992, null, 0, gp, [yp, An, Ye, [8, null], ke], null, null),
          ],
          function (t, e) {
            t(e, 1, 0);
          },
          null
        );
      }
      function Hp(t) {
        return ea(
          0,
          [
            (t()(),
            Li(
              0,
              0,
              null,
              null,
              1,
              "ng-component",
              [],
              null,
              null,
              null,
              Up,
              Lp
            )),
            no(1, 49152, null, 0, lc, [], null, null),
          ],
          null,
          null
        );
      }
      var zp = Nr("ng-component", lc, Hp, {}, {}, []);
      function Bp(t) {
        return null != t && "" + t != "false";
      }
      function qp(t, e) {
        return (
          void 0 === e && (e = 0),
          (function (t) {
            return !isNaN(parseFloat(t)) && !isNaN(Number(t));
          })(t)
            ? Number(t)
            : e
        );
      }
      function Gp(t) {
        return t instanceof rn ? t.nativeElement : t;
      }
      var Wp,
        Qp = new hn("8.2.3");
      try {
        Wp = "undefined" != typeof Intl && Intl.v8BreakIterator;
      } catch ($v) {
        Wp = !1;
      }
      var Kp,
        Zp = (function () {
          function t(t) {
            (this._platformId = t),
              (this.isBrowser = this._platformId
                ? this._platformId === Ls
                : "object" == typeof document && !!document),
              (this.EDGE =
                this.isBrowser && /(edge)/i.test(navigator.userAgent)),
              (this.TRIDENT =
                this.isBrowser && /(msie|trident)/i.test(navigator.userAgent)),
              (this.BLINK =
                this.isBrowser &&
                !(!window.chrome && !Wp) &&
                "undefined" != typeof CSS &&
                !this.EDGE &&
                !this.TRIDENT),
              (this.WEBKIT =
                this.isBrowser &&
                /AppleWebKit/i.test(navigator.userAgent) &&
                !this.BLINK &&
                !this.EDGE &&
                !this.TRIDENT),
              (this.IOS =
                this.isBrowser &&
                /iPad|iPhone|iPod/.test(navigator.userAgent) &&
                !("MSStream" in window)),
              (this.FIREFOX =
                this.isBrowser &&
                /(firefox|minefield)/i.test(navigator.userAgent)),
              (this.ANDROID =
                this.isBrowser &&
                /android/i.test(navigator.userAgent) &&
                !this.TRIDENT),
              (this.SAFARI =
                this.isBrowser &&
                /safari/i.test(navigator.userAgent) &&
                this.WEBKIT);
          }
          return (
            (t.ngInjectableDef = ct({
              factory: function () {
                return new t(Rt(jo, 8));
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })(),
        $p = (function () {
          return function () {};
        })();
      function Xp(t) {
        return (function () {
          if (null == Kp && "undefined" != typeof window)
            try {
              window.addEventListener(
                "test",
                null,
                Object.defineProperty({}, "passive", {
                  get: function () {
                    return (Kp = !0);
                  },
                })
              );
            } finally {
              Kp = Kp || !1;
            }
          return Kp;
        })()
          ? t
          : !!t.capture;
      }
      var Jp = 650,
        Yp = Xp({ passive: !0, capture: !0 }),
        tf = (function () {
          function t(t, e) {
            var n = this;
            (this._ngZone = t),
              (this._platform = e),
              (this._origin = null),
              (this._windowFocused = !1),
              (this._elementInfo = new Map()),
              (this._monitoredElementCount = 0),
              (this._documentKeydownListener = function () {
                (n._lastTouchTarget = null),
                  n._setOriginForCurrentEventQueue("keyboard");
              }),
              (this._documentMousedownListener = function () {
                n._lastTouchTarget || n._setOriginForCurrentEventQueue("mouse");
              }),
              (this._documentTouchstartListener = function (t) {
                null != n._touchTimeoutId && clearTimeout(n._touchTimeoutId),
                  (n._lastTouchTarget = t.composedPath
                    ? t.composedPath()[0]
                    : t.target),
                  (n._touchTimeoutId = setTimeout(function () {
                    return (n._lastTouchTarget = null);
                  }, Jp));
              }),
              (this._windowFocusListener = function () {
                (n._windowFocused = !0),
                  (n._windowFocusTimeoutId = setTimeout(function () {
                    return (n._windowFocused = !1);
                  }));
              });
          }
          return (
            (t.prototype.monitor = function (t, e) {
              var n = this;
              if ((void 0 === e && (e = !1), !this._platform.isBrowser))
                return Bs(null);
              var r = Gp(t);
              if (this._elementInfo.has(r)) {
                var o = this._elementInfo.get(r);
                return (o.checkChildren = e), o.subject.asObservable();
              }
              var i = {
                unlisten: function () {},
                checkChildren: e,
                subject: new T(),
              };
              this._elementInfo.set(r, i),
                this._incrementMonitoredElementCount();
              var a = function (t) {
                  return n._onFocus(t, r);
                },
                s = function (t) {
                  return n._onBlur(t, r);
                };
              return (
                this._ngZone.runOutsideAngular(function () {
                  r.addEventListener("focus", a, !0),
                    r.addEventListener("blur", s, !0);
                }),
                (i.unlisten = function () {
                  r.removeEventListener("focus", a, !0),
                    r.removeEventListener("blur", s, !0);
                }),
                i.subject.asObservable()
              );
            }),
            (t.prototype.stopMonitoring = function (t) {
              var e = Gp(t),
                n = this._elementInfo.get(e);
              n &&
                (n.unlisten(),
                n.subject.complete(),
                this._setClasses(e),
                this._elementInfo.delete(e),
                this._decrementMonitoredElementCount());
            }),
            (t.prototype.focusVia = function (t, e, n) {
              var r = Gp(t);
              this._setOriginForCurrentEventQueue(e),
                "function" == typeof r.focus && r.focus(n);
            }),
            (t.prototype.ngOnDestroy = function () {
              var t = this;
              this._elementInfo.forEach(function (e, n) {
                return t.stopMonitoring(n);
              });
            }),
            (t.prototype._toggleClass = function (t, e, n) {
              n ? t.classList.add(e) : t.classList.remove(e);
            }),
            (t.prototype._setClasses = function (t, e) {
              this._elementInfo.get(t) &&
                (this._toggleClass(t, "cdk-focused", !!e),
                this._toggleClass(t, "cdk-touch-focused", "touch" === e),
                this._toggleClass(t, "cdk-keyboard-focused", "keyboard" === e),
                this._toggleClass(t, "cdk-mouse-focused", "mouse" === e),
                this._toggleClass(t, "cdk-program-focused", "program" === e));
            }),
            (t.prototype._setOriginForCurrentEventQueue = function (t) {
              var e = this;
              this._ngZone.runOutsideAngular(function () {
                (e._origin = t),
                  (e._originTimeoutId = setTimeout(function () {
                    return (e._origin = null);
                  }, 1));
              });
            }),
            (t.prototype._wasCausedByTouch = function (t) {
              var e = t.target;
              return (
                this._lastTouchTarget instanceof Node &&
                e instanceof Node &&
                (e === this._lastTouchTarget ||
                  e.contains(this._lastTouchTarget))
              );
            }),
            (t.prototype._onFocus = function (t, e) {
              var n = this._elementInfo.get(e);
              if (n && (n.checkChildren || e === t.target)) {
                var r = this._origin;
                r ||
                  (r =
                    this._windowFocused && this._lastFocusOrigin
                      ? this._lastFocusOrigin
                      : this._wasCausedByTouch(t)
                      ? "touch"
                      : "program"),
                  this._setClasses(e, r),
                  this._emitOrigin(n.subject, r),
                  (this._lastFocusOrigin = r);
              }
            }),
            (t.prototype._onBlur = function (t, e) {
              var n = this._elementInfo.get(e);
              !n ||
                (n.checkChildren &&
                  t.relatedTarget instanceof Node &&
                  e.contains(t.relatedTarget)) ||
                (this._setClasses(e), this._emitOrigin(n.subject, null));
            }),
            (t.prototype._emitOrigin = function (t, e) {
              this._ngZone.run(function () {
                return t.next(e);
              });
            }),
            (t.prototype._incrementMonitoredElementCount = function () {
              var t = this;
              1 == ++this._monitoredElementCount &&
                this._platform.isBrowser &&
                this._ngZone.runOutsideAngular(function () {
                  document.addEventListener(
                    "keydown",
                    t._documentKeydownListener,
                    Yp
                  ),
                    document.addEventListener(
                      "mousedown",
                      t._documentMousedownListener,
                      Yp
                    ),
                    document.addEventListener(
                      "touchstart",
                      t._documentTouchstartListener,
                      Yp
                    ),
                    window.addEventListener("focus", t._windowFocusListener);
                });
            }),
            (t.prototype._decrementMonitoredElementCount = function () {
              --this._monitoredElementCount ||
                (document.removeEventListener(
                  "keydown",
                  this._documentKeydownListener,
                  Yp
                ),
                document.removeEventListener(
                  "mousedown",
                  this._documentMousedownListener,
                  Yp
                ),
                document.removeEventListener(
                  "touchstart",
                  this._documentTouchstartListener,
                  Yp
                ),
                window.removeEventListener("focus", this._windowFocusListener),
                clearTimeout(this._windowFocusTimeoutId),
                clearTimeout(this._touchTimeoutId),
                clearTimeout(this._originTimeoutId));
            }),
            (t.ngInjectableDef = ct({
              factory: function () {
                return new t(Rt(ni), Rt(Zp));
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })(),
        ef = new hn("8.2.3"),
        nf = new Et("mat-sanity-checks", {
          providedIn: "root",
          factory: function () {
            return !0;
          },
        }),
        rf = (function () {
          function t(t, e) {
            (this._sanityChecksEnabled = t),
              (this._hammerLoader = e),
              (this._hasDoneGlobalChecks = !1),
              (this._hasCheckedHammer = !1),
              (this._document =
                "object" == typeof document && document ? document : null),
              (this._window =
                "object" == typeof window && window ? window : null),
              this._areChecksEnabled() &&
                !this._hasDoneGlobalChecks &&
                (this._checkDoctypeIsDefined(),
                this._checkThemeIsPresent(),
                this._checkCdkVersionMatch(),
                (this._hasDoneGlobalChecks = !0));
          }
          return (
            (t.prototype._areChecksEnabled = function () {
              return this._sanityChecksEnabled && Xt() && !this._isTestEnv();
            }),
            (t.prototype._isTestEnv = function () {
              var t = this._window;
              return t && (t.__karma__ || t.jasmine);
            }),
            (t.prototype._checkDoctypeIsDefined = function () {
              this._document &&
                !this._document.doctype &&
                console.warn(
                  "Current document does not have a doctype. This may cause some Angular Material components not to behave as expected."
                );
            }),
            (t.prototype._checkThemeIsPresent = function () {
              if (
                this._document &&
                this._document.body &&
                "function" == typeof getComputedStyle
              ) {
                var t = this._document.createElement("div");
                t.classList.add("mat-theme-loaded-marker"),
                  this._document.body.appendChild(t);
                var e = getComputedStyle(t);
                e &&
                  "none" !== e.display &&
                  console.warn(
                    "Could not find Angular Material core theme. Most Material components may not work as expected. For more info refer to the theming guide: https://material.angular.io/guide/theming"
                  ),
                  this._document.body.removeChild(t);
              }
            }),
            (t.prototype._checkCdkVersionMatch = function () {
              ef.full !== Qp.full &&
                console.warn(
                  "The Angular Material version (" +
                    ef.full +
                    ") does not match the Angular CDK version (" +
                    Qp.full +
                    ").\nPlease ensure the versions of these two packages exactly match."
                );
            }),
            (t.prototype._checkHammerIsAvailable = function () {
              !this._hasCheckedHammer &&
                this._window &&
                (!this._areChecksEnabled() ||
                  this._window.Hammer ||
                  this._hammerLoader ||
                  console.warn(
                    "Could not find HammerJS. Certain Angular Material components may not work correctly."
                  ),
                (this._hasCheckedHammer = !0));
            }),
            t
          );
        })();
      function of(t) {
        return (function (t) {
          function e() {
            for (var e = [], n = 0; n < arguments.length; n++)
              e[n] = arguments[n];
            var r = t.apply(this, e) || this;
            return (r._disabled = !1), r;
          }
          return (
            Object(r.b)(e, t),
            Object.defineProperty(e.prototype, "disabled", {
              get: function () {
                return this._disabled;
              },
              set: function (t) {
                this._disabled = Bp(t);
              },
              enumerable: !0,
              configurable: !0,
            }),
            e
          );
        })(t);
      }
      function af(t, e) {
        return (function (t) {
          function n() {
            for (var n = [], r = 0; r < arguments.length; r++)
              n[r] = arguments[r];
            var o = t.apply(this, n) || this;
            return (o.color = e), o;
          }
          return (
            Object(r.b)(n, t),
            Object.defineProperty(n.prototype, "color", {
              get: function () {
                return this._color;
              },
              set: function (t) {
                var n = t || e;
                n !== this._color &&
                  (this._color &&
                    this._elementRef.nativeElement.classList.remove(
                      "mat-" + this._color
                    ),
                  n && this._elementRef.nativeElement.classList.add("mat-" + n),
                  (this._color = n));
              },
              enumerable: !0,
              configurable: !0,
            }),
            n
          );
        })(t);
      }
      function sf(t) {
        return (function (t) {
          function e() {
            for (var e = [], n = 0; n < arguments.length; n++)
              e[n] = arguments[n];
            var r = t.apply(this, e) || this;
            return (r._disableRipple = !1), r;
          }
          return (
            Object(r.b)(e, t),
            Object.defineProperty(e.prototype, "disableRipple", {
              get: function () {
                return this._disableRipple;
              },
              set: function (t) {
                this._disableRipple = Bp(t);
              },
              enumerable: !0,
              configurable: !0,
            }),
            e
          );
        })(t);
      }
      var uf = (function () {
          var t = { FADING_IN: 0, VISIBLE: 1, FADING_OUT: 2, HIDDEN: 3 };
          return (
            (t[t.FADING_IN] = "FADING_IN"),
            (t[t.VISIBLE] = "VISIBLE"),
            (t[t.FADING_OUT] = "FADING_OUT"),
            (t[t.HIDDEN] = "HIDDEN"),
            t
          );
        })(),
        lf = (function () {
          function t(t, e, n) {
            (this._renderer = t),
              (this.element = e),
              (this.config = n),
              (this.state = uf.HIDDEN);
          }
          return (
            (t.prototype.fadeOut = function () {
              this._renderer.fadeOutRipple(this);
            }),
            t
          );
        })(),
        cf = { enterDuration: 450, exitDuration: 400 },
        hf = 800,
        pf = Xp({ passive: !0 }),
        ff = (function () {
          function t(t, e, n, r) {
            var o = this;
            (this._target = t),
              (this._ngZone = e),
              (this._isPointerDown = !1),
              (this._triggerEvents = new Map()),
              (this._activeRipples = new Set()),
              (this._onMousedown = function (t) {
                var e = (function (t) {
                    return 0 === t.buttons;
                  })(t),
                  n =
                    o._lastTouchStartEvent &&
                    Date.now() < o._lastTouchStartEvent + hf;
                o._target.rippleDisabled ||
                  e ||
                  n ||
                  ((o._isPointerDown = !0),
                  o.fadeInRipple(t.clientX, t.clientY, o._target.rippleConfig));
              }),
              (this._onTouchStart = function (t) {
                if (!o._target.rippleDisabled) {
                  (o._lastTouchStartEvent = Date.now()),
                    (o._isPointerDown = !0);
                  for (var e = t.changedTouches, n = 0; n < e.length; n++)
                    o.fadeInRipple(
                      e[n].clientX,
                      e[n].clientY,
                      o._target.rippleConfig
                    );
                }
              }),
              (this._onPointerUp = function () {
                o._isPointerDown &&
                  ((o._isPointerDown = !1),
                  o._activeRipples.forEach(function (t) {
                    !t.config.persistent &&
                      (t.state === uf.VISIBLE ||
                        (t.config.terminateOnPointerUp &&
                          t.state === uf.FADING_IN)) &&
                      t.fadeOut();
                  }));
              }),
              r.isBrowser &&
                ((this._containerElement = Gp(n)),
                this._triggerEvents
                  .set("mousedown", this._onMousedown)
                  .set("mouseup", this._onPointerUp)
                  .set("mouseleave", this._onPointerUp)
                  .set("touchstart", this._onTouchStart)
                  .set("touchend", this._onPointerUp)
                  .set("touchcancel", this._onPointerUp));
          }
          return (
            (t.prototype.fadeInRipple = function (t, e, n) {
              var o = this;
              void 0 === n && (n = {});
              var i = (this._containerRect =
                  this._containerRect ||
                  this._containerElement.getBoundingClientRect()),
                a = Object(r.a)({}, cf, n.animation);
              n.centered &&
                ((t = i.left + i.width / 2), (e = i.top + i.height / 2));
              var s =
                  n.radius ||
                  (function (t, e, n) {
                    var r = Math.max(
                        Math.abs(t - n.left),
                        Math.abs(t - n.right)
                      ),
                      o = Math.max(Math.abs(e - n.top), Math.abs(e - n.bottom));
                    return Math.sqrt(r * r + o * o);
                  })(t, e, i),
                u = t - i.left,
                l = e - i.top,
                c = a.enterDuration,
                h = document.createElement("div");
              h.classList.add("mat-ripple-element"),
                (h.style.left = u - s + "px"),
                (h.style.top = l - s + "px"),
                (h.style.height = 2 * s + "px"),
                (h.style.width = 2 * s + "px"),
                (h.style.backgroundColor = n.color || null),
                (h.style.transitionDuration = c + "ms"),
                this._containerElement.appendChild(h),
                window.getComputedStyle(h).getPropertyValue("opacity"),
                (h.style.transform = "scale(1)");
              var p = new lf(this, h, n);
              return (
                (p.state = uf.FADING_IN),
                this._activeRipples.add(p),
                n.persistent || (this._mostRecentTransientRipple = p),
                this._runTimeoutOutsideZone(function () {
                  var t = p === o._mostRecentTransientRipple;
                  (p.state = uf.VISIBLE),
                    n.persistent || (t && o._isPointerDown) || p.fadeOut();
                }, c),
                p
              );
            }),
            (t.prototype.fadeOutRipple = function (t) {
              var e = this._activeRipples.delete(t);
              if (
                (t === this._mostRecentTransientRipple &&
                  (this._mostRecentTransientRipple = null),
                this._activeRipples.size || (this._containerRect = null),
                e)
              ) {
                var n = t.element,
                  o = Object(r.a)({}, cf, t.config.animation);
                (n.style.transitionDuration = o.exitDuration + "ms"),
                  (n.style.opacity = "0"),
                  (t.state = uf.FADING_OUT),
                  this._runTimeoutOutsideZone(function () {
                    (t.state = uf.HIDDEN), n.parentNode.removeChild(n);
                  }, o.exitDuration);
              }
            }),
            (t.prototype.fadeOutAll = function () {
              this._activeRipples.forEach(function (t) {
                return t.fadeOut();
              });
            }),
            (t.prototype.setupTriggerEvents = function (t) {
              var e = this,
                n = Gp(t);
              n &&
                n !== this._triggerElement &&
                (this._removeTriggerEvents(),
                this._ngZone.runOutsideAngular(function () {
                  e._triggerEvents.forEach(function (t, e) {
                    n.addEventListener(e, t, pf);
                  });
                }),
                (this._triggerElement = n));
            }),
            (t.prototype._runTimeoutOutsideZone = function (t, e) {
              void 0 === e && (e = 0),
                this._ngZone.runOutsideAngular(function () {
                  return setTimeout(t, e);
                });
            }),
            (t.prototype._removeTriggerEvents = function () {
              var t = this;
              this._triggerElement &&
                this._triggerEvents.forEach(function (e, n) {
                  t._triggerElement.removeEventListener(n, e, pf);
                });
            }),
            t
          );
        })(),
        df = new Et("mat-ripple-global-options"),
        mf = (function () {
          function t(t, e, n, r, o) {
            (this._elementRef = t),
              (this.radius = 0),
              (this._disabled = !1),
              (this._isInitialized = !1),
              (this._globalOptions = r || {}),
              (this._rippleRenderer = new ff(this, e, t, n)),
              "NoopAnimations" === o &&
                (this._globalOptions.animation = {
                  enterDuration: 0,
                  exitDuration: 0,
                });
          }
          return (
            Object.defineProperty(t.prototype, "disabled", {
              get: function () {
                return this._disabled;
              },
              set: function (t) {
                (this._disabled = t), this._setupTriggerEventsIfEnabled();
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "trigger", {
              get: function () {
                return this._trigger || this._elementRef.nativeElement;
              },
              set: function (t) {
                (this._trigger = t), this._setupTriggerEventsIfEnabled();
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.ngOnInit = function () {
              (this._isInitialized = !0), this._setupTriggerEventsIfEnabled();
            }),
            (t.prototype.ngOnDestroy = function () {
              this._rippleRenderer._removeTriggerEvents();
            }),
            (t.prototype.fadeOutAll = function () {
              this._rippleRenderer.fadeOutAll();
            }),
            Object.defineProperty(t.prototype, "rippleConfig", {
              get: function () {
                return {
                  centered: this.centered,
                  radius: this.radius,
                  color: this.color,
                  animation: Object(r.a)(
                    {},
                    this._globalOptions.animation,
                    this.animation
                  ),
                  terminateOnPointerUp:
                    this._globalOptions.terminateOnPointerUp,
                };
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "rippleDisabled", {
              get: function () {
                return this.disabled || !!this._globalOptions.disabled;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype._setupTriggerEventsIfEnabled = function () {
              !this.disabled &&
                this._isInitialized &&
                this._rippleRenderer.setupTriggerEvents(this.trigger);
            }),
            (t.prototype.launch = function (t, e, n) {
              return (
                void 0 === e && (e = 0),
                "number" == typeof t
                  ? this._rippleRenderer.fadeInRipple(
                      t,
                      e,
                      Object(r.a)({}, this.rippleConfig, n)
                    )
                  : this._rippleRenderer.fadeInRipple(
                      0,
                      0,
                      Object(r.a)({}, this.rippleConfig, t)
                    )
              );
            }),
            t
          );
        })(),
        yf = (function () {
          return function () {};
        })(),
        gf = 100,
        vf = af(
          (function () {
            return function (t) {
              this._elementRef = t;
            };
          })(),
          "primary"
        ),
        bf = new Et("mat-progress-spinner-default-options", {
          providedIn: "root",
          factory: function () {
            return { diameter: gf };
          },
        }),
        _f = (function (t) {
          function e(e, n, r, o, i) {
            var a = t.call(this, e, n, r, o, i) || this;
            return (a.mode = "indeterminate"), a;
          }
          return Object(r.b)(e, t), e;
        })(
          (function (t) {
            function e(n, r, o, i, a) {
              var s = t.call(this, n) || this;
              (s._elementRef = n),
                (s._document = o),
                (s._diameter = gf),
                (s._value = 0),
                (s._fallbackAnimation = !1),
                (s.mode = "determinate");
              var u = e._diameters;
              return (
                u.has(o.head) || u.set(o.head, new Set([gf])),
                (s._fallbackAnimation = r.EDGE || r.TRIDENT),
                (s._noopAnimations =
                  "NoopAnimations" === i && !!a && !a._forceAnimations),
                a &&
                  (a.diameter && (s.diameter = a.diameter),
                  a.strokeWidth && (s.strokeWidth = a.strokeWidth)),
                s
              );
            }
            return (
              Object(r.b)(e, t),
              Object.defineProperty(e.prototype, "diameter", {
                get: function () {
                  return this._diameter;
                },
                set: function (t) {
                  (this._diameter = qp(t)),
                    !this._fallbackAnimation &&
                      this._styleRoot &&
                      this._attachStyleNode();
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(e.prototype, "strokeWidth", {
                get: function () {
                  return this._strokeWidth || this.diameter / 10;
                },
                set: function (t) {
                  this._strokeWidth = qp(t);
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(e.prototype, "value", {
                get: function () {
                  return "determinate" === this.mode ? this._value : 0;
                },
                set: function (t) {
                  this._value = Math.max(0, Math.min(100, qp(t)));
                },
                enumerable: !0,
                configurable: !0,
              }),
              (e.prototype.ngOnInit = function () {
                var t = this._elementRef.nativeElement;
                (this._styleRoot =
                  (function (t, e) {
                    if ("undefined" != typeof window) {
                      var n = e.head;
                      if (n && (n.createShadowRoot || n.attachShadow)) {
                        var r = t.getRootNode ? t.getRootNode() : null;
                        if (r instanceof window.ShadowRoot) return r;
                      }
                    }
                    return null;
                  })(t, this._document) || this._document.head),
                  this._attachStyleNode(),
                  t.classList.add(
                    "mat-progress-spinner-indeterminate" +
                      (this._fallbackAnimation ? "-fallback" : "") +
                      "-animation"
                  );
              }),
              Object.defineProperty(e.prototype, "_circleRadius", {
                get: function () {
                  return (this.diameter - 10) / 2;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(e.prototype, "_viewBox", {
                get: function () {
                  var t = 2 * this._circleRadius + this.strokeWidth;
                  return "0 0 " + t + " " + t;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(e.prototype, "_strokeCircumference", {
                get: function () {
                  return 2 * Math.PI * this._circleRadius;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(e.prototype, "_strokeDashOffset", {
                get: function () {
                  return "determinate" === this.mode
                    ? (this._strokeCircumference * (100 - this._value)) / 100
                    : this._fallbackAnimation && "indeterminate" === this.mode
                    ? 0.2 * this._strokeCircumference
                    : null;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(e.prototype, "_circleStrokeWidth", {
                get: function () {
                  return (this.strokeWidth / this.diameter) * 100;
                },
                enumerable: !0,
                configurable: !0,
              }),
              (e.prototype._attachStyleNode = function () {
                var t = this._styleRoot,
                  n = this._diameter,
                  r = e._diameters,
                  o = r.get(t);
                if (!o || !o.has(n)) {
                  var i = this._document.createElement("style");
                  i.setAttribute("mat-spinner-animation", n + ""),
                    (i.textContent = this._getAnimationText()),
                    t.appendChild(i),
                    o || ((o = new Set()), r.set(t, o)),
                    o.add(n);
                }
              }),
              (e.prototype._getAnimationText = function () {
                return "\n @keyframes mat-progress-spinner-stroke-rotate-DIAMETER {\n    0%      { stroke-dashoffset: START_VALUE;  transform: rotate(0); }\n    12.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(0); }\n    12.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(72.5deg); }\n    25%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(72.5deg); }\n\n    25.0001%   { stroke-dashoffset: START_VALUE;  transform: rotate(270deg); }\n    37.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(270deg); }\n    37.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(161.5deg); }\n    50%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(161.5deg); }\n\n    50.0001%  { stroke-dashoffset: START_VALUE;  transform: rotate(180deg); }\n    62.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(180deg); }\n    62.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(251.5deg); }\n    75%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(251.5deg); }\n\n    75.0001%  { stroke-dashoffset: START_VALUE;  transform: rotate(90deg); }\n    87.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(90deg); }\n    87.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(341.5deg); }\n    100%    { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(341.5deg); }\n  }\n"
                  .replace(
                    /START_VALUE/g,
                    "" + 0.95 * this._strokeCircumference
                  )
                  .replace(/END_VALUE/g, "" + 0.2 * this._strokeCircumference)
                  .replace(/DIAMETER/g, "" + this.diameter);
              }),
              (e._diameters = new WeakMap()),
              e
            );
          })(vf)
        ),
        wf = (function () {
          return function () {};
        })(),
        Cf = (function () {
          return function () {};
        })(),
        Ef = (function () {
          return function () {};
        })(),
        Sf = (function () {
          return function () {};
        })(),
        kf = "*";
      function Tf(t, e) {
        return void 0 === e && (e = null), { type: 2, steps: t, options: e };
      }
      function xf(t) {
        return { type: 6, styles: t, offset: null };
      }
      function Of(t) {
        Promise.resolve(null).then(t);
      }
      var Pf = (function () {
          function t(t, e) {
            void 0 === t && (t = 0),
              void 0 === e && (e = 0),
              (this._onDoneFns = []),
              (this._onStartFns = []),
              (this._onDestroyFns = []),
              (this._started = !1),
              (this._destroyed = !1),
              (this._finished = !1),
              (this.parentPlayer = null),
              (this.totalTime = t + e);
          }
          return (
            (t.prototype._onFinish = function () {
              this._finished ||
                ((this._finished = !0),
                this._onDoneFns.forEach(function (t) {
                  return t();
                }),
                (this._onDoneFns = []));
            }),
            (t.prototype.onStart = function (t) {
              this._onStartFns.push(t);
            }),
            (t.prototype.onDone = function (t) {
              this._onDoneFns.push(t);
            }),
            (t.prototype.onDestroy = function (t) {
              this._onDestroyFns.push(t);
            }),
            (t.prototype.hasStarted = function () {
              return this._started;
            }),
            (t.prototype.init = function () {}),
            (t.prototype.play = function () {
              this.hasStarted() || (this._onStart(), this.triggerMicrotask()),
                (this._started = !0);
            }),
            (t.prototype.triggerMicrotask = function () {
              var t = this;
              Of(function () {
                return t._onFinish();
              });
            }),
            (t.prototype._onStart = function () {
              this._onStartFns.forEach(function (t) {
                return t();
              }),
                (this._onStartFns = []);
            }),
            (t.prototype.pause = function () {}),
            (t.prototype.restart = function () {}),
            (t.prototype.finish = function () {
              this._onFinish();
            }),
            (t.prototype.destroy = function () {
              this._destroyed ||
                ((this._destroyed = !0),
                this.hasStarted() || this._onStart(),
                this.finish(),
                this._onDestroyFns.forEach(function (t) {
                  return t();
                }),
                (this._onDestroyFns = []));
            }),
            (t.prototype.reset = function () {}),
            (t.prototype.setPosition = function (t) {}),
            (t.prototype.getPosition = function () {
              return 0;
            }),
            (t.prototype.triggerCallback = function (t) {
              var e = "start" == t ? this._onStartFns : this._onDoneFns;
              e.forEach(function (t) {
                return t();
              }),
                (e.length = 0);
            }),
            t
          );
        })(),
        Af = (function () {
          function t(t) {
            var e = this;
            (this._onDoneFns = []),
              (this._onStartFns = []),
              (this._finished = !1),
              (this._started = !1),
              (this._destroyed = !1),
              (this._onDestroyFns = []),
              (this.parentPlayer = null),
              (this.totalTime = 0),
              (this.players = t);
            var n = 0,
              r = 0,
              o = 0,
              i = this.players.length;
            0 == i
              ? Of(function () {
                  return e._onFinish();
                })
              : this.players.forEach(function (t) {
                  t.onDone(function () {
                    ++n == i && e._onFinish();
                  }),
                    t.onDestroy(function () {
                      ++r == i && e._onDestroy();
                    }),
                    t.onStart(function () {
                      ++o == i && e._onStart();
                    });
                }),
              (this.totalTime = this.players.reduce(function (t, e) {
                return Math.max(t, e.totalTime);
              }, 0));
          }
          return (
            (t.prototype._onFinish = function () {
              this._finished ||
                ((this._finished = !0),
                this._onDoneFns.forEach(function (t) {
                  return t();
                }),
                (this._onDoneFns = []));
            }),
            (t.prototype.init = function () {
              this.players.forEach(function (t) {
                return t.init();
              });
            }),
            (t.prototype.onStart = function (t) {
              this._onStartFns.push(t);
            }),
            (t.prototype._onStart = function () {
              this.hasStarted() ||
                ((this._started = !0),
                this._onStartFns.forEach(function (t) {
                  return t();
                }),
                (this._onStartFns = []));
            }),
            (t.prototype.onDone = function (t) {
              this._onDoneFns.push(t);
            }),
            (t.prototype.onDestroy = function (t) {
              this._onDestroyFns.push(t);
            }),
            (t.prototype.hasStarted = function () {
              return this._started;
            }),
            (t.prototype.play = function () {
              this.parentPlayer || this.init(),
                this._onStart(),
                this.players.forEach(function (t) {
                  return t.play();
                });
            }),
            (t.prototype.pause = function () {
              this.players.forEach(function (t) {
                return t.pause();
              });
            }),
            (t.prototype.restart = function () {
              this.players.forEach(function (t) {
                return t.restart();
              });
            }),
            (t.prototype.finish = function () {
              this._onFinish(),
                this.players.forEach(function (t) {
                  return t.finish();
                });
            }),
            (t.prototype.destroy = function () {
              this._onDestroy();
            }),
            (t.prototype._onDestroy = function () {
              this._destroyed ||
                ((this._destroyed = !0),
                this._onFinish(),
                this.players.forEach(function (t) {
                  return t.destroy();
                }),
                this._onDestroyFns.forEach(function (t) {
                  return t();
                }),
                (this._onDestroyFns = []));
            }),
            (t.prototype.reset = function () {
              this.players.forEach(function (t) {
                return t.reset();
              }),
                (this._destroyed = !1),
                (this._finished = !1),
                (this._started = !1);
            }),
            (t.prototype.setPosition = function (t) {
              var e = t * this.totalTime;
              this.players.forEach(function (t) {
                var n = t.totalTime ? Math.min(1, e / t.totalTime) : 1;
                t.setPosition(n);
              });
            }),
            (t.prototype.getPosition = function () {
              var t = 0;
              return (
                this.players.forEach(function (e) {
                  var n = e.getPosition();
                  t = Math.min(n, t);
                }),
                t
              );
            }),
            (t.prototype.beforeDestroy = function () {
              this.players.forEach(function (t) {
                t.beforeDestroy && t.beforeDestroy();
              });
            }),
            (t.prototype.triggerCallback = function (t) {
              var e = "start" == t ? this._onStartFns : this._onDoneFns;
              e.forEach(function (t) {
                return t();
              }),
                (e.length = 0);
            }),
            t
          );
        })(),
        If = "!";
      function Nf() {
        return "undefined" != typeof process;
      }
      function Rf(t) {
        switch (t.length) {
          case 0:
            return new Pf();
          case 1:
            return t[0];
          default:
            return new Af(t);
        }
      }
      function Df(t, e, n, r, o, i) {
        void 0 === o && (o = {}), void 0 === i && (i = {});
        var a = [],
          s = [],
          u = -1,
          l = null;
        if (
          (r.forEach(function (t) {
            var n = t.offset,
              r = n == u,
              c = (r && l) || {};
            Object.keys(t).forEach(function (n) {
              var r = n,
                s = t[n];
              if ("offset" !== n)
                switch (((r = e.normalizePropertyName(r, a)), s)) {
                  case If:
                    s = o[n];
                    break;
                  case kf:
                    s = i[n];
                    break;
                  default:
                    s = e.normalizeStyleValue(n, r, s, a);
                }
              c[r] = s;
            }),
              r || s.push(c),
              (l = c),
              (u = n);
          }),
          a.length)
        )
          throw new Error(
            "Unable to animate due to the following errors:\n - " +
              a.join("\n - ")
          );
        return s;
      }
      function jf(t, e, n, r) {
        switch (e) {
          case "start":
            t.onStart(function () {
              return r(n && Mf(n, "start", t));
            });
            break;
          case "done":
            t.onDone(function () {
              return r(n && Mf(n, "done", t));
            });
            break;
          case "destroy":
            t.onDestroy(function () {
              return r(n && Mf(n, "destroy", t));
            });
        }
      }
      function Mf(t, e, n) {
        var r = n.totalTime,
          o = Vf(
            t.element,
            t.triggerName,
            t.fromState,
            t.toState,
            e || t.phaseName,
            null == r ? t.totalTime : r,
            !!n.disabled
          ),
          i = t._data;
        return null != i && (o._data = i), o;
      }
      function Vf(t, e, n, r, o, i, a) {
        return (
          void 0 === o && (o = ""),
          void 0 === i && (i = 0),
          {
            element: t,
            triggerName: e,
            fromState: n,
            toState: r,
            phaseName: o,
            totalTime: i,
            disabled: !!a,
          }
        );
      }
      function Ff(t, e, n) {
        var r;
        return (
          t instanceof Map
            ? (r = t.get(e)) || t.set(e, (r = n))
            : (r = t[e]) || (r = t[e] = n),
          r
        );
      }
      function Lf(t) {
        var e = t.indexOf(":");
        return [t.substring(1, e), t.substr(e + 1)];
      }
      var Uf = function (t, e) {
          return !1;
        },
        Hf = function (t, e) {
          return !1;
        },
        zf = function (t, e, n) {
          return [];
        },
        Bf = Nf();
      (Bf || "undefined" != typeof Element) &&
        ((Uf = function (t, e) {
          return t.contains(e);
        }),
        (Hf = (function () {
          if (Bf || Element.prototype.matches)
            return function (t, e) {
              return t.matches(e);
            };
          var t = Element.prototype,
            e =
              t.matchesSelector ||
              t.mozMatchesSelector ||
              t.msMatchesSelector ||
              t.oMatchesSelector ||
              t.webkitMatchesSelector;
          return e
            ? function (t, n) {
                return e.apply(t, [n]);
              }
            : Hf;
        })()),
        (zf = function (t, e, n) {
          var o = [];
          if (n) o.push.apply(o, Object(r.d)(t.querySelectorAll(e)));
          else {
            var i = t.querySelector(e);
            i && o.push(i);
          }
          return o;
        }));
      var qf = null,
        Gf = !1;
      function Wf(t) {
        qf ||
          ((qf = ("undefined" != typeof document ? document.body : null) || {}),
          (Gf = !!qf.style && "WebkitAppearance" in qf.style));
        var e = !0;
        return (
          qf.style &&
            !(function (t) {
              return "ebkit" == t.substring(1, 6);
            })(t) &&
            !(e = t in qf.style) &&
            Gf &&
            (e =
              "Webkit" + t.charAt(0).toUpperCase() + t.substr(1) in qf.style),
          e
        );
      }
      var Qf = Hf,
        Kf = Uf,
        Zf = zf;
      function $f(t) {
        var e = {};
        return (
          Object.keys(t).forEach(function (n) {
            var r = n.replace(/([a-z])([A-Z])/g, "$1-$2");
            e[r] = t[n];
          }),
          e
        );
      }
      var Xf = (function () {
          function t() {}
          return (
            (t.prototype.validateStyleProperty = function (t) {
              return Wf(t);
            }),
            (t.prototype.matchesElement = function (t, e) {
              return Qf(t, e);
            }),
            (t.prototype.containsElement = function (t, e) {
              return Kf(t, e);
            }),
            (t.prototype.query = function (t, e, n) {
              return Zf(t, e, n);
            }),
            (t.prototype.computeStyle = function (t, e, n) {
              return n || "";
            }),
            (t.prototype.animate = function (t, e, n, r, o, i, a) {
              return void 0 === i && (i = []), new Pf(n, r);
            }),
            t
          );
        })(),
        Jf = (function () {
          function t() {}
          return (t.NOOP = new Xf()), t;
        })(),
        Yf = 1e3;
      function td(t) {
        if ("number" == typeof t) return t;
        var e = t.match(/^(-?[\.\d]+)(m?s)/);
        return !e || e.length < 2 ? 0 : ed(parseFloat(e[1]), e[2]);
      }
      function ed(t, e) {
        switch (e) {
          case "s":
            return t * Yf;
          default:
            return t;
        }
      }
      function nd(t, e, n) {
        return t.hasOwnProperty("duration")
          ? t
          : (function (t, e, n) {
              var r,
                o = 0,
                i = "";
              if ("string" == typeof t) {
                var a = t.match(
                  /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i
                );
                if (null === a)
                  return (
                    e.push('The provided timing value "' + t + '" is invalid.'),
                    { duration: 0, delay: 0, easing: "" }
                  );
                r = ed(parseFloat(a[1]), a[2]);
                var s = a[3];
                null != s && (o = ed(parseFloat(s), a[4]));
                var u = a[5];
                u && (i = u);
              } else r = t;
              if (!n) {
                var l = !1,
                  c = e.length;
                r < 0 &&
                  (e.push(
                    "Duration values below 0 are not allowed for this animation step."
                  ),
                  (l = !0)),
                  o < 0 &&
                    (e.push(
                      "Delay values below 0 are not allowed for this animation step."
                    ),
                    (l = !0)),
                  l &&
                    e.splice(
                      c,
                      0,
                      'The provided timing value "' + t + '" is invalid.'
                    );
              }
              return { duration: r, delay: o, easing: i };
            })(t, e, n);
      }
      function rd(t, e) {
        return (
          void 0 === e && (e = {}),
          Object.keys(t).forEach(function (n) {
            e[n] = t[n];
          }),
          e
        );
      }
      function od(t, e, n) {
        if ((void 0 === n && (n = {}), e)) for (var r in t) n[r] = t[r];
        else rd(t, n);
        return n;
      }
      function id(t, e, n) {
        return n ? e + ":" + n + ";" : "";
      }
      function ad(t) {
        for (var e = "", n = 0; n < t.style.length; n++)
          e += id(0, (r = t.style.item(n)), t.style.getPropertyValue(r));
        for (var r in t.style)
          t.style.hasOwnProperty(r) &&
            !r.startsWith("_") &&
            (e += id(
              0,
              r.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
              t.style[r]
            ));
        t.setAttribute("style", e);
      }
      function sd(t, e, n) {
        t.style &&
          (Object.keys(e).forEach(function (r) {
            var o = md(r);
            n && !n.hasOwnProperty(r) && (n[r] = t.style[o]),
              (t.style[o] = e[r]);
          }),
          Nf() && ad(t));
      }
      function ud(t, e) {
        t.style &&
          (Object.keys(e).forEach(function (e) {
            var n = md(e);
            t.style[n] = "";
          }),
          Nf() && ad(t));
      }
      function ld(t) {
        return Array.isArray(t) ? (1 == t.length ? t[0] : Tf(t)) : t;
      }
      var cd = new RegExp("{{\\s*(.+?)\\s*}}", "g");
      function hd(t) {
        var e = [];
        if ("string" == typeof t) {
          for (var n = t.toString(), r = void 0; (r = cd.exec(n)); )
            e.push(r[1]);
          cd.lastIndex = 0;
        }
        return e;
      }
      function pd(t, e, n) {
        var r = t.toString(),
          o = r.replace(cd, function (t, r) {
            var o = e[r];
            return (
              e.hasOwnProperty(r) ||
                (n.push("Please provide a value for the animation param " + r),
                (o = "")),
              o.toString()
            );
          });
        return o == r ? t : o;
      }
      function fd(t) {
        for (var e = [], n = t.next(); !n.done; )
          e.push(n.value), (n = t.next());
        return e;
      }
      var dd = /-+([a-z0-9])/g;
      function md(t) {
        return t.replace(dd, function () {
          for (var t = [], e = 0; e < arguments.length; e++)
            t[e] = arguments[e];
          return t[1].toUpperCase();
        });
      }
      function yd(t, e) {
        return 0 === t || 0 === e;
      }
      function gd(t, e, n) {
        var r = Object.keys(n);
        if (r.length && e.length) {
          var o = e[0],
            i = [];
          if (
            (r.forEach(function (t) {
              o.hasOwnProperty(t) || i.push(t), (o[t] = n[t]);
            }),
            i.length)
          )
            for (
              var a = function () {
                  var n = e[s];
                  i.forEach(function (e) {
                    n[e] = bd(t, e);
                  });
                },
                s = 1;
              s < e.length;
              s++
            )
              a();
        }
        return e;
      }
      function vd(t, e, n) {
        switch (e.type) {
          case 7:
            return t.visitTrigger(e, n);
          case 0:
            return t.visitState(e, n);
          case 1:
            return t.visitTransition(e, n);
          case 2:
            return t.visitSequence(e, n);
          case 3:
            return t.visitGroup(e, n);
          case 4:
            return t.visitAnimate(e, n);
          case 5:
            return t.visitKeyframes(e, n);
          case 6:
            return t.visitStyle(e, n);
          case 8:
            return t.visitReference(e, n);
          case 9:
            return t.visitAnimateChild(e, n);
          case 10:
            return t.visitAnimateRef(e, n);
          case 11:
            return t.visitQuery(e, n);
          case 12:
            return t.visitStagger(e, n);
          default:
            throw new Error(
              "Unable to resolve animation metadata node #" + e.type
            );
        }
      }
      function bd(t, e) {
        return window.getComputedStyle(t)[e];
      }
      var _d = "*",
        wd = new Set(["true", "1"]),
        Cd = new Set(["false", "0"]);
      function Ed(t, e) {
        var n = wd.has(t) || Cd.has(t),
          r = wd.has(e) || Cd.has(e);
        return function (o, i) {
          var a = t == _d || t == o,
            s = e == _d || e == i;
          return (
            !a && n && "boolean" == typeof o && (a = o ? wd.has(t) : Cd.has(t)),
            !s && r && "boolean" == typeof i && (s = i ? wd.has(e) : Cd.has(e)),
            a && s
          );
        };
      }
      var Sd = new RegExp("s*:selfs*,?", "g");
      function kd(t, e, n) {
        return new Td(t).build(e, n);
      }
      var Td = (function () {
          function t(t) {
            this._driver = t;
          }
          return (
            (t.prototype.build = function (t, e) {
              var n = new xd(e);
              return this._resetContextStyleTimingState(n), vd(this, ld(t), n);
            }),
            (t.prototype._resetContextStyleTimingState = function (t) {
              (t.currentQuerySelector = ""),
                (t.collectedStyles = {}),
                (t.collectedStyles[""] = {}),
                (t.currentTime = 0);
            }),
            (t.prototype.visitTrigger = function (t, e) {
              var n = this,
                r = (e.queryCount = 0),
                o = (e.depCount = 0),
                i = [],
                a = [];
              return (
                "@" == t.name.charAt(0) &&
                  e.errors.push(
                    "animation triggers cannot be prefixed with an `@` sign (e.g. trigger('@foo', [...]))"
                  ),
                t.definitions.forEach(function (t) {
                  if ((n._resetContextStyleTimingState(e), 0 == t.type)) {
                    var s = t,
                      u = s.name;
                    u
                      .toString()
                      .split(/\s*,\s*/)
                      .forEach(function (t) {
                        (s.name = t), i.push(n.visitState(s, e));
                      }),
                      (s.name = u);
                  } else if (1 == t.type) {
                    var l = n.visitTransition(t, e);
                    (r += l.queryCount), (o += l.depCount), a.push(l);
                  } else
                    e.errors.push(
                      "only state() and transition() definitions can sit inside of a trigger()"
                    );
                }),
                {
                  type: 7,
                  name: t.name,
                  states: i,
                  transitions: a,
                  queryCount: r,
                  depCount: o,
                  options: null,
                }
              );
            }),
            (t.prototype.visitState = function (t, e) {
              var n = this.visitStyle(t.styles, e),
                r = (t.options && t.options.params) || null;
              if (n.containsDynamicStyles) {
                var o = new Set(),
                  i = r || {};
                if (
                  (n.styles.forEach(function (t) {
                    if (Od(t)) {
                      var e = t;
                      Object.keys(e).forEach(function (t) {
                        hd(e[t]).forEach(function (t) {
                          i.hasOwnProperty(t) || o.add(t);
                        });
                      });
                    }
                  }),
                  o.size)
                ) {
                  var a = fd(o.values());
                  e.errors.push(
                    'state("' +
                      t.name +
                      '", ...) must define default values for all the following style substitutions: ' +
                      a.join(", ")
                  );
                }
              }
              return {
                type: 0,
                name: t.name,
                style: n,
                options: r ? { params: r } : null,
              };
            }),
            (t.prototype.visitTransition = function (t, e) {
              (e.queryCount = 0), (e.depCount = 0);
              var n,
                r,
                o,
                i = vd(this, ld(t.animation), e);
              return {
                type: 1,
                matchers:
                  ((n = t.expr),
                  (r = e.errors),
                  (o = []),
                  "string" == typeof n
                    ? n.split(/\s*,\s*/).forEach(function (t) {
                        return (function (t, e, n) {
                          if (":" == t[0]) {
                            var r = (function (t, e) {
                              switch (t) {
                                case ":enter":
                                  return "void => *";
                                case ":leave":
                                  return "* => void";
                                case ":increment":
                                  return function (t, e) {
                                    return parseFloat(e) > parseFloat(t);
                                  };
                                case ":decrement":
                                  return function (t, e) {
                                    return parseFloat(e) < parseFloat(t);
                                  };
                                default:
                                  return (
                                    e.push(
                                      'The transition alias value "' +
                                        t +
                                        '" is not supported'
                                    ),
                                    "* => *"
                                  );
                              }
                            })(t, n);
                            if ("function" == typeof r) return void e.push(r);
                            t = r;
                          }
                          var o = t.match(
                            /^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/
                          );
                          if (null == o || o.length < 4)
                            return (
                              n.push(
                                'The provided transition expression "' +
                                  t +
                                  '" is not supported'
                              ),
                              e
                            );
                          var i = o[1],
                            a = o[2],
                            s = o[3];
                          e.push(Ed(i, s)),
                            "<" != a[0] ||
                              (i == _d && s == _d) ||
                              e.push(Ed(s, i));
                        })(t, o, r);
                      })
                    : o.push(n),
                  o),
                animation: i,
                queryCount: e.queryCount,
                depCount: e.depCount,
                options: Pd(t.options),
              };
            }),
            (t.prototype.visitSequence = function (t, e) {
              var n = this;
              return {
                type: 2,
                steps: t.steps.map(function (t) {
                  return vd(n, t, e);
                }),
                options: Pd(t.options),
              };
            }),
            (t.prototype.visitGroup = function (t, e) {
              var n = this,
                r = e.currentTime,
                o = 0,
                i = t.steps.map(function (t) {
                  e.currentTime = r;
                  var i = vd(n, t, e);
                  return (o = Math.max(o, e.currentTime)), i;
                });
              return (
                (e.currentTime = o),
                { type: 3, steps: i, options: Pd(t.options) }
              );
            }),
            (t.prototype.visitAnimate = function (t, e) {
              var n,
                r = (function (t, e) {
                  var n = null;
                  if (t.hasOwnProperty("duration")) n = t;
                  else if ("number" == typeof t)
                    return Ad(nd(t, e).duration, 0, "");
                  var r = t;
                  if (
                    r.split(/\s+/).some(function (t) {
                      return "{" == t.charAt(0) && "{" == t.charAt(1);
                    })
                  ) {
                    var o = Ad(0, 0, "");
                    return (o.dynamic = !0), (o.strValue = r), o;
                  }
                  return Ad((n = n || nd(r, e)).duration, n.delay, n.easing);
                })(t.timings, e.errors);
              e.currentAnimateTimings = r;
              var o = t.styles ? t.styles : xf({});
              if (5 == o.type) n = this.visitKeyframes(o, e);
              else {
                var i = t.styles,
                  a = !1;
                if (!i) {
                  a = !0;
                  var s = {};
                  r.easing && (s.easing = r.easing), (i = xf(s));
                }
                e.currentTime += r.duration + r.delay;
                var u = this.visitStyle(i, e);
                (u.isEmptyStep = a), (n = u);
              }
              return (
                (e.currentAnimateTimings = null),
                { type: 4, timings: r, style: n, options: null }
              );
            }),
            (t.prototype.visitStyle = function (t, e) {
              var n = this._makeStyleAst(t, e);
              return this._validateStyleAst(n, e), n;
            }),
            (t.prototype._makeStyleAst = function (t, e) {
              var n = [];
              Array.isArray(t.styles)
                ? t.styles.forEach(function (t) {
                    "string" == typeof t
                      ? t == kf
                        ? n.push(t)
                        : e.errors.push(
                            "The provided style string value " +
                              t +
                              " is not allowed."
                          )
                      : n.push(t);
                  })
                : n.push(t.styles);
              var r = !1,
                o = null;
              return (
                n.forEach(function (t) {
                  if (Od(t)) {
                    var e = t,
                      n = e.easing;
                    if ((n && ((o = n), delete e.easing), !r))
                      for (var i in e)
                        if (e[i].toString().indexOf("{{") >= 0) {
                          r = !0;
                          break;
                        }
                  }
                }),
                {
                  type: 6,
                  styles: n,
                  easing: o,
                  offset: t.offset,
                  containsDynamicStyles: r,
                  options: null,
                }
              );
            }),
            (t.prototype._validateStyleAst = function (t, e) {
              var n = this,
                r = e.currentAnimateTimings,
                o = e.currentTime,
                i = e.currentTime;
              r && i > 0 && (i -= r.duration + r.delay),
                t.styles.forEach(function (t) {
                  "string" != typeof t &&
                    Object.keys(t).forEach(function (r) {
                      if (n._driver.validateStyleProperty(r)) {
                        var a,
                          s,
                          u,
                          l = e.collectedStyles[e.currentQuerySelector],
                          c = l[r],
                          h = !0;
                        c &&
                          (i != o &&
                            i >= c.startTime &&
                            o <= c.endTime &&
                            (e.errors.push(
                              'The CSS property "' +
                                r +
                                '" that exists between the times of "' +
                                c.startTime +
                                'ms" and "' +
                                c.endTime +
                                'ms" is also being animated in a parallel animation between the times of "' +
                                i +
                                'ms" and "' +
                                o +
                                'ms"'
                            ),
                            (h = !1)),
                          (i = c.startTime)),
                          h && (l[r] = { startTime: i, endTime: o }),
                          e.options &&
                            ((a = e.errors),
                            (s = e.options.params || {}),
                            (u = hd(t[r])).length &&
                              u.forEach(function (t) {
                                s.hasOwnProperty(t) ||
                                  a.push(
                                    "Unable to resolve the local animation param " +
                                      t +
                                      " in the given list of values"
                                  );
                              }));
                      } else
                        e.errors.push(
                          'The provided animation property "' +
                            r +
                            '" is not a supported CSS property for animations'
                        );
                    });
                });
            }),
            (t.prototype.visitKeyframes = function (t, e) {
              var n = this,
                r = { type: 5, styles: [], options: null };
              if (!e.currentAnimateTimings)
                return (
                  e.errors.push(
                    "keyframes() must be placed inside of a call to animate()"
                  ),
                  r
                );
              var o = 0,
                i = [],
                a = !1,
                s = !1,
                u = 0,
                l = t.steps.map(function (t) {
                  var r = n._makeStyleAst(t, e),
                    l =
                      null != r.offset
                        ? r.offset
                        : (function (t) {
                            if ("string" == typeof t) return null;
                            var e = null;
                            if (Array.isArray(t))
                              t.forEach(function (t) {
                                if (Od(t) && t.hasOwnProperty("offset")) {
                                  var n = t;
                                  (e = parseFloat(n.offset)), delete n.offset;
                                }
                              });
                            else if (Od(t) && t.hasOwnProperty("offset")) {
                              var n = t;
                              (e = parseFloat(n.offset)), delete n.offset;
                            }
                            return e;
                          })(r.styles),
                    c = 0;
                  return (
                    null != l && (o++, (c = r.offset = l)),
                    (s = s || c < 0 || c > 1),
                    (a = a || c < u),
                    (u = c),
                    i.push(c),
                    r
                  );
                });
              s &&
                e.errors.push(
                  "Please ensure that all keyframe offsets are between 0 and 1"
                ),
                a &&
                  e.errors.push(
                    "Please ensure that all keyframe offsets are in order"
                  );
              var c = t.steps.length,
                h = 0;
              o > 0 && o < c
                ? e.errors.push(
                    "Not all style() steps within the declared keyframes() contain offsets"
                  )
                : 0 == o && (h = 1 / (c - 1));
              var p = c - 1,
                f = e.currentTime,
                d = e.currentAnimateTimings,
                m = d.duration;
              return (
                l.forEach(function (t, o) {
                  var a = h > 0 ? (o == p ? 1 : h * o) : i[o],
                    s = a * m;
                  (e.currentTime = f + d.delay + s),
                    (d.duration = s),
                    n._validateStyleAst(t, e),
                    (t.offset = a),
                    r.styles.push(t);
                }),
                r
              );
            }),
            (t.prototype.visitReference = function (t, e) {
              return {
                type: 8,
                animation: vd(this, ld(t.animation), e),
                options: Pd(t.options),
              };
            }),
            (t.prototype.visitAnimateChild = function (t, e) {
              return e.depCount++, { type: 9, options: Pd(t.options) };
            }),
            (t.prototype.visitAnimateRef = function (t, e) {
              return {
                type: 10,
                animation: this.visitReference(t.animation, e),
                options: Pd(t.options),
              };
            }),
            (t.prototype.visitQuery = function (t, e) {
              var n = e.currentQuerySelector,
                o = t.options || {};
              e.queryCount++, (e.currentQuery = t);
              var i = Object(r.c)(
                  (function (t) {
                    var e = !!t.split(/\s*,\s*/).find(function (t) {
                      return ":self" == t;
                    });
                    return (
                      e && (t = t.replace(Sd, "")),
                      [
                        (t = t
                          .replace(/@\*/g, ".ng-trigger")
                          .replace(/@\w+/g, function (t) {
                            return ".ng-trigger-" + t.substr(1);
                          })
                          .replace(/:animating/g, ".ng-animating")),
                        e,
                      ]
                    );
                  })(t.selector),
                  2
                ),
                a = i[0],
                s = i[1];
              (e.currentQuerySelector = n.length ? n + " " + a : a),
                Ff(e.collectedStyles, e.currentQuerySelector, {});
              var u = vd(this, ld(t.animation), e);
              return (
                (e.currentQuery = null),
                (e.currentQuerySelector = n),
                {
                  type: 11,
                  selector: a,
                  limit: o.limit || 0,
                  optional: !!o.optional,
                  includeSelf: s,
                  animation: u,
                  originalSelector: t.selector,
                  options: Pd(t.options),
                }
              );
            }),
            (t.prototype.visitStagger = function (t, e) {
              e.currentQuery ||
                e.errors.push("stagger() can only be used inside of query()");
              var n =
                "full" === t.timings
                  ? { duration: 0, delay: 0, easing: "full" }
                  : nd(t.timings, e.errors, !0);
              return {
                type: 12,
                animation: vd(this, ld(t.animation), e),
                timings: n,
                options: null,
              };
            }),
            t
          );
        })(),
        xd = (function () {
          return function (t) {
            (this.errors = t),
              (this.queryCount = 0),
              (this.depCount = 0),
              (this.currentTransition = null),
              (this.currentQuery = null),
              (this.currentQuerySelector = null),
              (this.currentAnimateTimings = null),
              (this.currentTime = 0),
              (this.collectedStyles = {}),
              (this.options = null);
          };
        })();
      function Od(t) {
        return !Array.isArray(t) && "object" == typeof t;
      }
      function Pd(t) {
        var e;
        return (
          t
            ? (t = rd(t)).params && (t.params = (e = t.params) ? rd(e) : null)
            : (t = {}),
          t
        );
      }
      function Ad(t, e, n) {
        return { duration: t, delay: e, easing: n };
      }
      function Id(t, e, n, r, o, i, a, s) {
        return (
          void 0 === a && (a = null),
          void 0 === s && (s = !1),
          {
            type: 1,
            element: t,
            keyframes: e,
            preStyleProps: n,
            postStyleProps: r,
            duration: o,
            delay: i,
            totalTime: o + i,
            easing: a,
            subTimeline: s,
          }
        );
      }
      var Nd = (function () {
          function t() {
            this._map = new Map();
          }
          return (
            (t.prototype.consume = function (t) {
              var e = this._map.get(t);
              return e ? this._map.delete(t) : (e = []), e;
            }),
            (t.prototype.append = function (t, e) {
              var n = this._map.get(t);
              n || this._map.set(t, (n = [])), n.push.apply(n, Object(r.d)(e));
            }),
            (t.prototype.has = function (t) {
              return this._map.has(t);
            }),
            (t.prototype.clear = function () {
              this._map.clear();
            }),
            t
          );
        })(),
        Rd = new RegExp(":enter", "g"),
        Dd = new RegExp(":leave", "g");
      function jd(t, e, n, r, o, i, a, s, u, l) {
        return (
          void 0 === i && (i = {}),
          void 0 === a && (a = {}),
          void 0 === l && (l = []),
          new Md().buildKeyframes(t, e, n, r, o, i, a, s, u, l)
        );
      }
      var Md = (function () {
          function t() {}
          return (
            (t.prototype.buildKeyframes = function (
              t,
              e,
              n,
              r,
              o,
              i,
              a,
              s,
              u,
              l
            ) {
              void 0 === l && (l = []), (u = u || new Nd());
              var c = new Fd(t, e, u, r, o, l, []);
              (c.options = s),
                c.currentTimeline.setStyles([i], null, c.errors, s),
                vd(this, n, c);
              var h = c.timelines.filter(function (t) {
                return t.containsAnimation();
              });
              if (h.length && Object.keys(a).length) {
                var p = h[h.length - 1];
                p.allowOnlyTimelineStyles() ||
                  p.setStyles([a], null, c.errors, s);
              }
              return h.length
                ? h.map(function (t) {
                    return t.buildKeyframes();
                  })
                : [Id(e, [], [], [], 0, 0, "", !1)];
            }),
            (t.prototype.visitTrigger = function (t, e) {}),
            (t.prototype.visitState = function (t, e) {}),
            (t.prototype.visitTransition = function (t, e) {}),
            (t.prototype.visitAnimateChild = function (t, e) {
              var n = e.subInstructions.consume(e.element);
              if (n) {
                var r = e.createSubContext(t.options),
                  o = e.currentTimeline.currentTime,
                  i = this._visitSubInstructions(n, r, r.options);
                o != i && e.transformIntoNewTimeline(i);
              }
              e.previousNode = t;
            }),
            (t.prototype.visitAnimateRef = function (t, e) {
              var n = e.createSubContext(t.options);
              n.transformIntoNewTimeline(),
                this.visitReference(t.animation, n),
                e.transformIntoNewTimeline(n.currentTimeline.currentTime),
                (e.previousNode = t);
            }),
            (t.prototype._visitSubInstructions = function (t, e, n) {
              var r = e.currentTimeline.currentTime,
                o = null != n.duration ? td(n.duration) : null,
                i = null != n.delay ? td(n.delay) : null;
              return (
                0 !== o &&
                  t.forEach(function (t) {
                    var n = e.appendInstructionToTimeline(t, o, i);
                    r = Math.max(r, n.duration + n.delay);
                  }),
                r
              );
            }),
            (t.prototype.visitReference = function (t, e) {
              e.updateOptions(t.options, !0),
                vd(this, t.animation, e),
                (e.previousNode = t);
            }),
            (t.prototype.visitSequence = function (t, e) {
              var n = this,
                r = e.subContextCount,
                o = e,
                i = t.options;
              if (
                i &&
                (i.params || i.delay) &&
                ((o = e.createSubContext(i)).transformIntoNewTimeline(),
                null != i.delay)
              ) {
                6 == o.previousNode.type &&
                  (o.currentTimeline.snapshotCurrentStyles(),
                  (o.previousNode = Vd));
                var a = td(i.delay);
                o.delayNextStep(a);
              }
              t.steps.length &&
                (t.steps.forEach(function (t) {
                  return vd(n, t, o);
                }),
                o.currentTimeline.applyStylesToKeyframe(),
                o.subContextCount > r && o.transformIntoNewTimeline()),
                (e.previousNode = t);
            }),
            (t.prototype.visitGroup = function (t, e) {
              var n = this,
                r = [],
                o = e.currentTimeline.currentTime,
                i = t.options && t.options.delay ? td(t.options.delay) : 0;
              t.steps.forEach(function (a) {
                var s = e.createSubContext(t.options);
                i && s.delayNextStep(i),
                  vd(n, a, s),
                  (o = Math.max(o, s.currentTimeline.currentTime)),
                  r.push(s.currentTimeline);
              }),
                r.forEach(function (t) {
                  return e.currentTimeline.mergeTimelineCollectedStyles(t);
                }),
                e.transformIntoNewTimeline(o),
                (e.previousNode = t);
            }),
            (t.prototype._visitTiming = function (t, e) {
              if (t.dynamic) {
                var n = t.strValue;
                return nd(e.params ? pd(n, e.params, e.errors) : n, e.errors);
              }
              return { duration: t.duration, delay: t.delay, easing: t.easing };
            }),
            (t.prototype.visitAnimate = function (t, e) {
              var n = (e.currentAnimateTimings = this._visitTiming(
                  t.timings,
                  e
                )),
                r = e.currentTimeline;
              n.delay && (e.incrementTime(n.delay), r.snapshotCurrentStyles());
              var o = t.style;
              5 == o.type
                ? this.visitKeyframes(o, e)
                : (e.incrementTime(n.duration),
                  this.visitStyle(o, e),
                  r.applyStylesToKeyframe()),
                (e.currentAnimateTimings = null),
                (e.previousNode = t);
            }),
            (t.prototype.visitStyle = function (t, e) {
              var n = e.currentTimeline,
                r = e.currentAnimateTimings;
              !r && n.getCurrentStyleProperties().length && n.forwardFrame();
              var o = (r && r.easing) || t.easing;
              t.isEmptyStep
                ? n.applyEmptyStep(o)
                : n.setStyles(t.styles, o, e.errors, e.options),
                (e.previousNode = t);
            }),
            (t.prototype.visitKeyframes = function (t, e) {
              var n = e.currentAnimateTimings,
                r = e.currentTimeline.duration,
                o = n.duration,
                i = e.createSubContext().currentTimeline;
              (i.easing = n.easing),
                t.styles.forEach(function (t) {
                  i.forwardTime((t.offset || 0) * o),
                    i.setStyles(t.styles, t.easing, e.errors, e.options),
                    i.applyStylesToKeyframe();
                }),
                e.currentTimeline.mergeTimelineCollectedStyles(i),
                e.transformIntoNewTimeline(r + o),
                (e.previousNode = t);
            }),
            (t.prototype.visitQuery = function (t, e) {
              var n = this,
                r = e.currentTimeline.currentTime,
                o = t.options || {},
                i = o.delay ? td(o.delay) : 0;
              i &&
                (6 === e.previousNode.type ||
                  (0 == r &&
                    e.currentTimeline.getCurrentStyleProperties().length)) &&
                (e.currentTimeline.snapshotCurrentStyles(),
                (e.previousNode = Vd));
              var a = r,
                s = e.invokeQuery(
                  t.selector,
                  t.originalSelector,
                  t.limit,
                  t.includeSelf,
                  !!o.optional,
                  e.errors
                );
              e.currentQueryTotal = s.length;
              var u = null;
              s.forEach(function (r, o) {
                e.currentQueryIndex = o;
                var s = e.createSubContext(t.options, r);
                i && s.delayNextStep(i),
                  r === e.element && (u = s.currentTimeline),
                  vd(n, t.animation, s),
                  s.currentTimeline.applyStylesToKeyframe(),
                  (a = Math.max(a, s.currentTimeline.currentTime));
              }),
                (e.currentQueryIndex = 0),
                (e.currentQueryTotal = 0),
                e.transformIntoNewTimeline(a),
                u &&
                  (e.currentTimeline.mergeTimelineCollectedStyles(u),
                  e.currentTimeline.snapshotCurrentStyles()),
                (e.previousNode = t);
            }),
            (t.prototype.visitStagger = function (t, e) {
              var n = e.parentContext,
                r = e.currentTimeline,
                o = t.timings,
                i = Math.abs(o.duration),
                a = i * (e.currentQueryTotal - 1),
                s = i * e.currentQueryIndex;
              switch (o.duration < 0 ? "reverse" : o.easing) {
                case "reverse":
                  s = a - s;
                  break;
                case "full":
                  s = n.currentStaggerTime;
              }
              var u = e.currentTimeline;
              s && u.delayNextStep(s);
              var l = u.currentTime;
              vd(this, t.animation, e),
                (e.previousNode = t),
                (n.currentStaggerTime =
                  r.currentTime -
                  l +
                  (r.startTime - n.currentTimeline.startTime));
            }),
            t
          );
        })(),
        Vd = {},
        Fd = (function () {
          function t(t, e, n, r, o, i, a, s) {
            (this._driver = t),
              (this.element = e),
              (this.subInstructions = n),
              (this._enterClassName = r),
              (this._leaveClassName = o),
              (this.errors = i),
              (this.timelines = a),
              (this.parentContext = null),
              (this.currentAnimateTimings = null),
              (this.previousNode = Vd),
              (this.subContextCount = 0),
              (this.options = {}),
              (this.currentQueryIndex = 0),
              (this.currentQueryTotal = 0),
              (this.currentStaggerTime = 0),
              (this.currentTimeline = s || new Ld(this._driver, e, 0)),
              a.push(this.currentTimeline);
          }
          return (
            Object.defineProperty(t.prototype, "params", {
              get: function () {
                return this.options.params;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.updateOptions = function (t, e) {
              var n = this;
              if (t) {
                var r = t,
                  o = this.options;
                null != r.duration && (o.duration = td(r.duration)),
                  null != r.delay && (o.delay = td(r.delay));
                var i = r.params;
                if (i) {
                  var a = o.params;
                  a || (a = this.options.params = {}),
                    Object.keys(i).forEach(function (t) {
                      (e && a.hasOwnProperty(t)) ||
                        (a[t] = pd(i[t], a, n.errors));
                    });
                }
              }
            }),
            (t.prototype._copyOptions = function () {
              var t = {};
              if (this.options) {
                var e = this.options.params;
                if (e) {
                  var n = (t.params = {});
                  Object.keys(e).forEach(function (t) {
                    n[t] = e[t];
                  });
                }
              }
              return t;
            }),
            (t.prototype.createSubContext = function (e, n, r) {
              void 0 === e && (e = null);
              var o = n || this.element,
                i = new t(
                  this._driver,
                  o,
                  this.subInstructions,
                  this._enterClassName,
                  this._leaveClassName,
                  this.errors,
                  this.timelines,
                  this.currentTimeline.fork(o, r || 0)
                );
              return (
                (i.previousNode = this.previousNode),
                (i.currentAnimateTimings = this.currentAnimateTimings),
                (i.options = this._copyOptions()),
                i.updateOptions(e),
                (i.currentQueryIndex = this.currentQueryIndex),
                (i.currentQueryTotal = this.currentQueryTotal),
                (i.parentContext = this),
                this.subContextCount++,
                i
              );
            }),
            (t.prototype.transformIntoNewTimeline = function (t) {
              return (
                (this.previousNode = Vd),
                (this.currentTimeline = this.currentTimeline.fork(
                  this.element,
                  t
                )),
                this.timelines.push(this.currentTimeline),
                this.currentTimeline
              );
            }),
            (t.prototype.appendInstructionToTimeline = function (t, e, n) {
              var r = {
                  duration: null != e ? e : t.duration,
                  delay:
                    this.currentTimeline.currentTime +
                    (null != n ? n : 0) +
                    t.delay,
                  easing: "",
                },
                o = new Ud(
                  this._driver,
                  t.element,
                  t.keyframes,
                  t.preStyleProps,
                  t.postStyleProps,
                  r,
                  t.stretchStartingKeyframe
                );
              return this.timelines.push(o), r;
            }),
            (t.prototype.incrementTime = function (t) {
              this.currentTimeline.forwardTime(
                this.currentTimeline.duration + t
              );
            }),
            (t.prototype.delayNextStep = function (t) {
              t > 0 && this.currentTimeline.delayNextStep(t);
            }),
            (t.prototype.invokeQuery = function (t, e, n, o, i, a) {
              var s = [];
              if ((o && s.push(this.element), t.length > 0)) {
                t = (t = t.replace(Rd, "." + this._enterClassName)).replace(
                  Dd,
                  "." + this._leaveClassName
                );
                var u = this._driver.query(this.element, t, 1 != n);
                0 !== n &&
                  (u = n < 0 ? u.slice(u.length + n, u.length) : u.slice(0, n)),
                  s.push.apply(s, Object(r.d)(u));
              }
              return (
                i ||
                  0 != s.length ||
                  a.push(
                    '`query("' +
                      e +
                      '")` returned zero elements. (Use `query("' +
                      e +
                      '", { optional: true })` if you wish to allow this.)'
                  ),
                s
              );
            }),
            t
          );
        })(),
        Ld = (function () {
          function t(t, e, n, r) {
            (this._driver = t),
              (this.element = e),
              (this.startTime = n),
              (this._elementTimelineStylesLookup = r),
              (this.duration = 0),
              (this._previousKeyframe = {}),
              (this._currentKeyframe = {}),
              (this._keyframes = new Map()),
              (this._styleSummary = {}),
              (this._pendingStyles = {}),
              (this._backFill = {}),
              (this._currentEmptyStepKeyframe = null),
              this._elementTimelineStylesLookup ||
                (this._elementTimelineStylesLookup = new Map()),
              (this._localTimelineStyles = Object.create(this._backFill, {})),
              (this._globalTimelineStyles =
                this._elementTimelineStylesLookup.get(e)),
              this._globalTimelineStyles ||
                ((this._globalTimelineStyles = this._localTimelineStyles),
                this._elementTimelineStylesLookup.set(
                  e,
                  this._localTimelineStyles
                )),
              this._loadKeyframe();
          }
          return (
            (t.prototype.containsAnimation = function () {
              switch (this._keyframes.size) {
                case 0:
                  return !1;
                case 1:
                  return this.getCurrentStyleProperties().length > 0;
                default:
                  return !0;
              }
            }),
            (t.prototype.getCurrentStyleProperties = function () {
              return Object.keys(this._currentKeyframe);
            }),
            Object.defineProperty(t.prototype, "currentTime", {
              get: function () {
                return this.startTime + this.duration;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.delayNextStep = function (t) {
              var e =
                1 == this._keyframes.size &&
                Object.keys(this._pendingStyles).length;
              this.duration || e
                ? (this.forwardTime(this.currentTime + t),
                  e && this.snapshotCurrentStyles())
                : (this.startTime += t);
            }),
            (t.prototype.fork = function (e, n) {
              return (
                this.applyStylesToKeyframe(),
                new t(
                  this._driver,
                  e,
                  n || this.currentTime,
                  this._elementTimelineStylesLookup
                )
              );
            }),
            (t.prototype._loadKeyframe = function () {
              this._currentKeyframe &&
                (this._previousKeyframe = this._currentKeyframe),
                (this._currentKeyframe = this._keyframes.get(this.duration)),
                this._currentKeyframe ||
                  ((this._currentKeyframe = Object.create(this._backFill, {})),
                  this._keyframes.set(this.duration, this._currentKeyframe));
            }),
            (t.prototype.forwardFrame = function () {
              (this.duration += 1), this._loadKeyframe();
            }),
            (t.prototype.forwardTime = function (t) {
              this.applyStylesToKeyframe(),
                (this.duration = t),
                this._loadKeyframe();
            }),
            (t.prototype._updateStyle = function (t, e) {
              (this._localTimelineStyles[t] = e),
                (this._globalTimelineStyles[t] = e),
                (this._styleSummary[t] = { time: this.currentTime, value: e });
            }),
            (t.prototype.allowOnlyTimelineStyles = function () {
              return this._currentEmptyStepKeyframe !== this._currentKeyframe;
            }),
            (t.prototype.applyEmptyStep = function (t) {
              var e = this;
              t && (this._previousKeyframe.easing = t),
                Object.keys(this._globalTimelineStyles).forEach(function (t) {
                  (e._backFill[t] = e._globalTimelineStyles[t] || kf),
                    (e._currentKeyframe[t] = kf);
                }),
                (this._currentEmptyStepKeyframe = this._currentKeyframe);
            }),
            (t.prototype.setStyles = function (t, e, n, r) {
              var o = this;
              e && (this._previousKeyframe.easing = e);
              var i = (r && r.params) || {},
                a = (function (t, e) {
                  var n,
                    r = {};
                  return (
                    t.forEach(function (t) {
                      "*" === t
                        ? (n = n || Object.keys(e)).forEach(function (t) {
                            r[t] = kf;
                          })
                        : od(t, !1, r);
                    }),
                    r
                  );
                })(t, this._globalTimelineStyles);
              Object.keys(a).forEach(function (t) {
                var e = pd(a[t], i, n);
                (o._pendingStyles[t] = e),
                  o._localTimelineStyles.hasOwnProperty(t) ||
                    (o._backFill[t] = o._globalTimelineStyles.hasOwnProperty(t)
                      ? o._globalTimelineStyles[t]
                      : kf),
                  o._updateStyle(t, e);
              });
            }),
            (t.prototype.applyStylesToKeyframe = function () {
              var t = this,
                e = this._pendingStyles,
                n = Object.keys(e);
              0 != n.length &&
                ((this._pendingStyles = {}),
                n.forEach(function (n) {
                  t._currentKeyframe[n] = e[n];
                }),
                Object.keys(this._localTimelineStyles).forEach(function (e) {
                  t._currentKeyframe.hasOwnProperty(e) ||
                    (t._currentKeyframe[e] = t._localTimelineStyles[e]);
                }));
            }),
            (t.prototype.snapshotCurrentStyles = function () {
              var t = this;
              Object.keys(this._localTimelineStyles).forEach(function (e) {
                var n = t._localTimelineStyles[e];
                (t._pendingStyles[e] = n), t._updateStyle(e, n);
              });
            }),
            (t.prototype.getFinalKeyframe = function () {
              return this._keyframes.get(this.duration);
            }),
            Object.defineProperty(t.prototype, "properties", {
              get: function () {
                var t = [];
                for (var e in this._currentKeyframe) t.push(e);
                return t;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.mergeTimelineCollectedStyles = function (t) {
              var e = this;
              Object.keys(t._styleSummary).forEach(function (n) {
                var r = e._styleSummary[n],
                  o = t._styleSummary[n];
                (!r || o.time > r.time) && e._updateStyle(n, o.value);
              });
            }),
            (t.prototype.buildKeyframes = function () {
              var t = this;
              this.applyStylesToKeyframe();
              var e = new Set(),
                n = new Set(),
                r = 1 === this._keyframes.size && 0 === this.duration,
                o = [];
              this._keyframes.forEach(function (i, a) {
                var s = od(i, !0);
                Object.keys(s).forEach(function (t) {
                  var r = s[t];
                  r == If ? e.add(t) : r == kf && n.add(t);
                }),
                  r || (s.offset = a / t.duration),
                  o.push(s);
              });
              var i = e.size ? fd(e.values()) : [],
                a = n.size ? fd(n.values()) : [];
              if (r) {
                var s = o[0],
                  u = rd(s);
                (s.offset = 0), (u.offset = 1), (o = [s, u]);
              }
              return Id(
                this.element,
                o,
                i,
                a,
                this.duration,
                this.startTime,
                this.easing,
                !1
              );
            }),
            t
          );
        })(),
        Ud = (function (t) {
          function e(e, n, r, o, i, a, s) {
            void 0 === s && (s = !1);
            var u = t.call(this, e, n, a.delay) || this;
            return (
              (u.element = n),
              (u.keyframes = r),
              (u.preStyleProps = o),
              (u.postStyleProps = i),
              (u._stretchStartingKeyframe = s),
              (u.timings = {
                duration: a.duration,
                delay: a.delay,
                easing: a.easing,
              }),
              u
            );
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.containsAnimation = function () {
              return this.keyframes.length > 1;
            }),
            (e.prototype.buildKeyframes = function () {
              var t = this.keyframes,
                e = this.timings,
                n = e.delay,
                r = e.duration,
                o = e.easing;
              if (this._stretchStartingKeyframe && n) {
                var i = [],
                  a = r + n,
                  s = n / a,
                  u = od(t[0], !1);
                (u.offset = 0), i.push(u);
                var l = od(t[0], !1);
                (l.offset = Hd(s)), i.push(l);
                for (var c = t.length - 1, h = 1; h <= c; h++) {
                  var p = od(t[h], !1);
                  (p.offset = Hd((n + p.offset * r) / a)), i.push(p);
                }
                (r = a), (n = 0), (o = ""), (t = i);
              }
              return Id(
                this.element,
                t,
                this.preStyleProps,
                this.postStyleProps,
                r,
                n,
                o,
                !0
              );
            }),
            e
          );
        })(Ld);
      function Hd(t, e) {
        void 0 === e && (e = 3);
        var n = Math.pow(10, e - 1);
        return Math.round(t * n) / n;
      }
      var zd = (function () {
          return function () {};
        })(),
        Bd = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.normalizePropertyName = function (t, e) {
              return md(t);
            }),
            (e.prototype.normalizeStyleValue = function (t, e, n, r) {
              var o = "",
                i = n.toString().trim();
              if (qd[e] && 0 !== n && "0" !== n)
                if ("number" == typeof n) o = "px";
                else {
                  var a = n.match(/^[+-]?[\d\.]+([a-z]*)$/);
                  a &&
                    0 == a[1].length &&
                    r.push(
                      "Please provide a CSS unit value for " + t + ":" + n
                    );
                }
              return i + o;
            }),
            e
          );
        })(zd),
        qd = (function () {
          return (
            (t =
              "width,height,minWidth,minHeight,maxWidth,maxHeight,left,top,bottom,right,fontSize,outlineWidth,outlineOffset,paddingTop,paddingLeft,paddingBottom,paddingRight,marginTop,marginLeft,marginBottom,marginRight,borderRadius,borderWidth,borderTopWidth,borderLeftWidth,borderRightWidth,borderBottomWidth,textIndent,perspective".split(
                ","
              )),
            (e = {}),
            t.forEach(function (t) {
              return (e[t] = !0);
            }),
            e
          );
          var t, e;
        })();
      function Gd(t, e, n, r, o, i, a, s, u, l, c, h, p) {
        return {
          type: 0,
          element: t,
          triggerName: e,
          isRemovalTransition: o,
          fromState: n,
          fromStyles: i,
          toState: r,
          toStyles: a,
          timelines: s,
          queriedElements: u,
          preStyleProps: l,
          postStyleProps: c,
          totalTime: h,
          errors: p,
        };
      }
      var Wd = {},
        Qd = (function () {
          function t(t, e, n) {
            (this._triggerName = t), (this.ast = e), (this._stateStyles = n);
          }
          return (
            (t.prototype.match = function (t, e, n, r) {
              return (function (t, e, n, r, o) {
                return t.some(function (t) {
                  return t(e, n, r, o);
                });
              })(this.ast.matchers, t, e, n, r);
            }),
            (t.prototype.buildStyles = function (t, e, n) {
              var r = this._stateStyles["*"],
                o = this._stateStyles[t],
                i = r ? r.buildStyles(e, n) : {};
              return o ? o.buildStyles(e, n) : i;
            }),
            (t.prototype.build = function (t, e, n, o, i, a, s, u, l, c) {
              var h = [],
                p = (this.ast.options && this.ast.options.params) || Wd,
                f = this.buildStyles(n, (s && s.params) || Wd, h),
                d = (u && u.params) || Wd,
                m = this.buildStyles(o, d, h),
                y = new Set(),
                g = new Map(),
                v = new Map(),
                b = "void" === o,
                _ = { params: Object(r.a)({}, p, d) },
                w = c ? [] : jd(t, e, this.ast.animation, i, a, f, m, _, l, h),
                C = 0;
              if (
                (w.forEach(function (t) {
                  C = Math.max(t.duration + t.delay, C);
                }),
                h.length)
              )
                return Gd(
                  e,
                  this._triggerName,
                  n,
                  o,
                  b,
                  f,
                  m,
                  [],
                  [],
                  g,
                  v,
                  C,
                  h
                );
              w.forEach(function (t) {
                var n = t.element,
                  r = Ff(g, n, {});
                t.preStyleProps.forEach(function (t) {
                  return (r[t] = !0);
                });
                var o = Ff(v, n, {});
                t.postStyleProps.forEach(function (t) {
                  return (o[t] = !0);
                }),
                  n !== e && y.add(n);
              });
              var E = fd(y.values());
              return Gd(e, this._triggerName, n, o, b, f, m, w, E, g, v, C);
            }),
            t
          );
        })(),
        Kd = (function () {
          function t(t, e) {
            (this.styles = t), (this.defaultParams = e);
          }
          return (
            (t.prototype.buildStyles = function (t, e) {
              var n = {},
                r = rd(this.defaultParams);
              return (
                Object.keys(t).forEach(function (e) {
                  var n = t[e];
                  null != n && (r[e] = n);
                }),
                this.styles.styles.forEach(function (t) {
                  if ("string" != typeof t) {
                    var o = t;
                    Object.keys(o).forEach(function (t) {
                      var i = o[t];
                      i.length > 1 && (i = pd(i, r, e)), (n[t] = i);
                    });
                  }
                }),
                n
              );
            }),
            t
          );
        })(),
        Zd = (function () {
          function t(t, e) {
            var n = this;
            (this.name = t),
              (this.ast = e),
              (this.transitionFactories = []),
              (this.states = {}),
              e.states.forEach(function (t) {
                n.states[t.name] = new Kd(
                  t.style,
                  (t.options && t.options.params) || {}
                );
              }),
              $d(this.states, "true", "1"),
              $d(this.states, "false", "0"),
              e.transitions.forEach(function (e) {
                n.transitionFactories.push(new Qd(t, e, n.states));
              }),
              (this.fallbackTransition = new Qd(
                t,
                {
                  type: 1,
                  animation: { type: 2, steps: [], options: null },
                  matchers: [
                    function (t, e) {
                      return !0;
                    },
                  ],
                  options: null,
                  queryCount: 0,
                  depCount: 0,
                },
                this.states
              ));
          }
          return (
            Object.defineProperty(t.prototype, "containsQueries", {
              get: function () {
                return this.ast.queryCount > 0;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.matchTransition = function (t, e, n, r) {
              return (
                this.transitionFactories.find(function (o) {
                  return o.match(t, e, n, r);
                }) || null
              );
            }),
            (t.prototype.matchStyles = function (t, e, n) {
              return this.fallbackTransition.buildStyles(t, e, n);
            }),
            t
          );
        })();
      function $d(t, e, n) {
        t.hasOwnProperty(e)
          ? t.hasOwnProperty(n) || (t[n] = t[e])
          : t.hasOwnProperty(n) && (t[e] = t[n]);
      }
      var Xd = new Nd(),
        Jd = (function () {
          function t(t, e, n) {
            (this.bodyNode = t),
              (this._driver = e),
              (this._normalizer = n),
              (this._animations = {}),
              (this._playersById = {}),
              (this.players = []);
          }
          return (
            (t.prototype.register = function (t, e) {
              var n = [],
                r = kd(this._driver, e, n);
              if (n.length)
                throw new Error(
                  "Unable to build the animation due to the following errors: " +
                    n.join("\n")
                );
              this._animations[t] = r;
            }),
            (t.prototype._buildPlayer = function (t, e, n) {
              var r = t.element,
                o = Df(0, this._normalizer, 0, t.keyframes, e, n);
              return this._driver.animate(
                r,
                o,
                t.duration,
                t.delay,
                t.easing,
                [],
                !0
              );
            }),
            (t.prototype.create = function (t, e, n) {
              var r = this;
              void 0 === n && (n = {});
              var o,
                i = [],
                a = this._animations[t],
                s = new Map();
              if (
                (a
                  ? (o = jd(
                      this._driver,
                      e,
                      a,
                      "ng-enter",
                      "ng-leave",
                      {},
                      {},
                      n,
                      Xd,
                      i
                    )).forEach(function (t) {
                      var e = Ff(s, t.element, {});
                      t.postStyleProps.forEach(function (t) {
                        return (e[t] = null);
                      });
                    })
                  : (i.push(
                      "The requested animation doesn't exist or has already been destroyed"
                    ),
                    (o = [])),
                i.length)
              )
                throw new Error(
                  "Unable to create the animation due to the following errors: " +
                    i.join("\n")
                );
              s.forEach(function (t, e) {
                Object.keys(t).forEach(function (n) {
                  t[n] = r._driver.computeStyle(e, n, kf);
                });
              });
              var u = Rf(
                o.map(function (t) {
                  var e = s.get(t.element);
                  return r._buildPlayer(t, {}, e);
                })
              );
              return (
                (this._playersById[t] = u),
                u.onDestroy(function () {
                  return r.destroy(t);
                }),
                this.players.push(u),
                u
              );
            }),
            (t.prototype.destroy = function (t) {
              var e = this._getPlayer(t);
              e.destroy(), delete this._playersById[t];
              var n = this.players.indexOf(e);
              n >= 0 && this.players.splice(n, 1);
            }),
            (t.prototype._getPlayer = function (t) {
              var e = this._playersById[t];
              if (!e)
                throw new Error(
                  "Unable to find the timeline player referenced by " + t
                );
              return e;
            }),
            (t.prototype.listen = function (t, e, n, r) {
              var o = Vf(e, "", "", "");
              return jf(this._getPlayer(t), n, o, r), function () {};
            }),
            (t.prototype.command = function (t, e, n, r) {
              if ("register" != n)
                if ("create" != n) {
                  var o = this._getPlayer(t);
                  switch (n) {
                    case "play":
                      o.play();
                      break;
                    case "pause":
                      o.pause();
                      break;
                    case "reset":
                      o.reset();
                      break;
                    case "restart":
                      o.restart();
                      break;
                    case "finish":
                      o.finish();
                      break;
                    case "init":
                      o.init();
                      break;
                    case "setPosition":
                      o.setPosition(parseFloat(r[0]));
                      break;
                    case "destroy":
                      this.destroy(t);
                  }
                } else this.create(t, e, r[0] || {});
              else this.register(t, r[0]);
            }),
            t
          );
        })(),
        Yd = [],
        tm = {
          namespaceId: "",
          setForRemoval: !1,
          setForMove: !1,
          hasAnimation: !1,
          removedBeforeQueried: !1,
        },
        em = {
          namespaceId: "",
          setForMove: !1,
          setForRemoval: !1,
          hasAnimation: !1,
          removedBeforeQueried: !0,
        },
        nm = "__ng_removed",
        rm = (function () {
          function t(t, e) {
            void 0 === e && (e = ""), (this.namespaceId = e);
            var n,
              r = t && t.hasOwnProperty("value");
            if (((this.value = null != (n = r ? t.value : t) ? n : null), r)) {
              var o = rd(t);
              delete o.value, (this.options = o);
            } else this.options = {};
            this.options.params || (this.options.params = {});
          }
          return (
            Object.defineProperty(t.prototype, "params", {
              get: function () {
                return this.options.params;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.absorbOptions = function (t) {
              var e = t.params;
              if (e) {
                var n = this.options.params;
                Object.keys(e).forEach(function (t) {
                  null == n[t] && (n[t] = e[t]);
                });
              }
            }),
            t
          );
        })(),
        om = new rm("void"),
        im = (function () {
          function t(t, e, n) {
            (this.id = t),
              (this.hostElement = e),
              (this._engine = n),
              (this.players = []),
              (this._triggers = {}),
              (this._queue = []),
              (this._elementListeners = new Map()),
              (this._hostClassName = "ng-tns-" + t),
              fm(e, this._hostClassName);
          }
          return (
            (t.prototype.listen = function (t, e, n, r) {
              var o,
                i = this;
              if (!this._triggers.hasOwnProperty(e))
                throw new Error(
                  'Unable to listen on the animation trigger event "' +
                    n +
                    '" because the animation trigger "' +
                    e +
                    "\" doesn't exist!"
                );
              if (null == n || 0 == n.length)
                throw new Error(
                  'Unable to listen on the animation trigger "' +
                    e +
                    '" because the provided event is undefined!'
                );
              if ("start" != (o = n) && "done" != o)
                throw new Error(
                  'The provided animation trigger event "' +
                    n +
                    '" for the animation trigger "' +
                    e +
                    '" is not supported!'
                );
              var a = Ff(this._elementListeners, t, []),
                s = { name: e, phase: n, callback: r };
              a.push(s);
              var u = Ff(this._engine.statesByElement, t, {});
              return (
                u.hasOwnProperty(e) ||
                  (fm(t, "ng-trigger"), fm(t, "ng-trigger-" + e), (u[e] = om)),
                function () {
                  i._engine.afterFlush(function () {
                    var t = a.indexOf(s);
                    t >= 0 && a.splice(t, 1), i._triggers[e] || delete u[e];
                  });
                }
              );
            }),
            (t.prototype.register = function (t, e) {
              return !this._triggers[t] && ((this._triggers[t] = e), !0);
            }),
            (t.prototype._getTrigger = function (t) {
              var e = this._triggers[t];
              if (!e)
                throw new Error(
                  'The provided animation trigger "' +
                    t +
                    '" has not been registered!'
                );
              return e;
            }),
            (t.prototype.trigger = function (t, e, n, r) {
              var o = this;
              void 0 === r && (r = !0);
              var i = this._getTrigger(e),
                a = new sm(this.id, e, t),
                s = this._engine.statesByElement.get(t);
              s ||
                (fm(t, "ng-trigger"),
                fm(t, "ng-trigger-" + e),
                this._engine.statesByElement.set(t, (s = {})));
              var u = s[e],
                l = new rm(n, this.id);
              if (
                (!(n && n.hasOwnProperty("value")) &&
                  u &&
                  l.absorbOptions(u.options),
                (s[e] = l),
                u || (u = om),
                "void" === l.value || u.value !== l.value)
              ) {
                var c = Ff(this._engine.playersByElement, t, []);
                c.forEach(function (t) {
                  t.namespaceId == o.id &&
                    t.triggerName == e &&
                    t.queued &&
                    t.destroy();
                });
                var h = i.matchTransition(u.value, l.value, t, l.params),
                  p = !1;
                if (!h) {
                  if (!r) return;
                  (h = i.fallbackTransition), (p = !0);
                }
                return (
                  this._engine.totalQueuedPlayers++,
                  this._queue.push({
                    element: t,
                    triggerName: e,
                    transition: h,
                    fromState: u,
                    toState: l,
                    player: a,
                    isFallbackTransition: p,
                  }),
                  p ||
                    (fm(t, "ng-animate-queued"),
                    a.onStart(function () {
                      dm(t, "ng-animate-queued");
                    })),
                  a.onDone(function () {
                    var e = o.players.indexOf(a);
                    e >= 0 && o.players.splice(e, 1);
                    var n = o._engine.playersByElement.get(t);
                    if (n) {
                      var r = n.indexOf(a);
                      r >= 0 && n.splice(r, 1);
                    }
                  }),
                  this.players.push(a),
                  c.push(a),
                  a
                );
              }
              if (
                !(function (t, e) {
                  var n = Object.keys(t),
                    r = Object.keys(e);
                  if (n.length != r.length) return !1;
                  for (var o = 0; o < n.length; o++) {
                    var i = n[o];
                    if (!e.hasOwnProperty(i) || t[i] !== e[i]) return !1;
                  }
                  return !0;
                })(u.params, l.params)
              ) {
                var f = [],
                  d = i.matchStyles(u.value, u.params, f),
                  m = i.matchStyles(l.value, l.params, f);
                f.length
                  ? this._engine.reportError(f)
                  : this._engine.afterFlush(function () {
                      ud(t, d), sd(t, m);
                    });
              }
            }),
            (t.prototype.deregister = function (t) {
              var e = this;
              delete this._triggers[t],
                this._engine.statesByElement.forEach(function (e, n) {
                  delete e[t];
                }),
                this._elementListeners.forEach(function (n, r) {
                  e._elementListeners.set(
                    r,
                    n.filter(function (e) {
                      return e.name != t;
                    })
                  );
                });
            }),
            (t.prototype.clearElementCache = function (t) {
              this._engine.statesByElement.delete(t),
                this._elementListeners.delete(t);
              var e = this._engine.playersByElement.get(t);
              e &&
                (e.forEach(function (t) {
                  return t.destroy();
                }),
                this._engine.playersByElement.delete(t));
            }),
            (t.prototype._signalRemovalForInnerTriggers = function (t, e, n) {
              var r = this;
              void 0 === n && (n = !1),
                this._engine.driver
                  .query(t, ".ng-trigger", !0)
                  .forEach(function (t) {
                    if (!t[nm]) {
                      var n = r._engine.fetchNamespacesByElement(t);
                      n.size
                        ? n.forEach(function (n) {
                            return n.triggerLeaveAnimation(t, e, !1, !0);
                          })
                        : r.clearElementCache(t);
                    }
                  });
            }),
            (t.prototype.triggerLeaveAnimation = function (t, e, n, r) {
              var o = this,
                i = this._engine.statesByElement.get(t);
              if (i) {
                var a = [];
                if (
                  (Object.keys(i).forEach(function (e) {
                    if (o._triggers[e]) {
                      var n = o.trigger(t, e, "void", r);
                      n && a.push(n);
                    }
                  }),
                  a.length)
                )
                  return (
                    this._engine.markElementAsRemoved(this.id, t, !0, e),
                    n &&
                      Rf(a).onDone(function () {
                        return o._engine.processLeaveNode(t);
                      }),
                    !0
                  );
              }
              return !1;
            }),
            (t.prototype.prepareLeaveAnimationListeners = function (t) {
              var e = this,
                n = this._elementListeners.get(t);
              if (n) {
                var r = new Set();
                n.forEach(function (n) {
                  var o = n.name;
                  if (!r.has(o)) {
                    r.add(o);
                    var i = e._triggers[o].fallbackTransition,
                      a = e._engine.statesByElement.get(t)[o] || om,
                      s = new rm("void"),
                      u = new sm(e.id, o, t);
                    e._engine.totalQueuedPlayers++,
                      e._queue.push({
                        element: t,
                        triggerName: o,
                        transition: i,
                        fromState: a,
                        toState: s,
                        player: u,
                        isFallbackTransition: !0,
                      });
                  }
                });
              }
            }),
            (t.prototype.removeNode = function (t, e) {
              var n = this,
                r = this._engine;
              if (
                (t.childElementCount &&
                  this._signalRemovalForInnerTriggers(t, e, !0),
                !this.triggerLeaveAnimation(t, e, !0))
              ) {
                var o = !1;
                if (r.totalAnimations) {
                  var i = r.players.length
                    ? r.playersByQueriedElement.get(t)
                    : [];
                  if (i && i.length) o = !0;
                  else
                    for (var a = t; (a = a.parentNode); )
                      if (r.statesByElement.get(a)) {
                        o = !0;
                        break;
                      }
                }
                this.prepareLeaveAnimationListeners(t),
                  o
                    ? r.markElementAsRemoved(this.id, t, !1, e)
                    : (r.afterFlush(function () {
                        return n.clearElementCache(t);
                      }),
                      r.destroyInnerAnimations(t),
                      r._onRemovalComplete(t, e));
              }
            }),
            (t.prototype.insertNode = function (t, e) {
              fm(t, this._hostClassName);
            }),
            (t.prototype.drainQueuedTransitions = function (t) {
              var e = this,
                n = [];
              return (
                this._queue.forEach(function (r) {
                  var o = r.player;
                  if (!o.destroyed) {
                    var i = r.element,
                      a = e._elementListeners.get(i);
                    a &&
                      a.forEach(function (e) {
                        if (e.name == r.triggerName) {
                          var n = Vf(
                            i,
                            r.triggerName,
                            r.fromState.value,
                            r.toState.value
                          );
                          (n._data = t), jf(r.player, e.phase, n, e.callback);
                        }
                      }),
                      o.markedForDestroy
                        ? e._engine.afterFlush(function () {
                            o.destroy();
                          })
                        : n.push(r);
                  }
                }),
                (this._queue = []),
                n.sort(function (t, n) {
                  var r = t.transition.ast.depCount,
                    o = n.transition.ast.depCount;
                  return 0 == r || 0 == o
                    ? r - o
                    : e._engine.driver.containsElement(t.element, n.element)
                    ? 1
                    : -1;
                })
              );
            }),
            (t.prototype.destroy = function (t) {
              this.players.forEach(function (t) {
                return t.destroy();
              }),
                this._signalRemovalForInnerTriggers(this.hostElement, t);
            }),
            (t.prototype.elementContainsData = function (t) {
              var e = !1;
              return (
                this._elementListeners.has(t) && (e = !0),
                !!this._queue.find(function (e) {
                  return e.element === t;
                }) || e
              );
            }),
            t
          );
        })(),
        am = (function () {
          function t(t, e, n) {
            (this.bodyNode = t),
              (this.driver = e),
              (this._normalizer = n),
              (this.players = []),
              (this.newHostElements = new Map()),
              (this.playersByElement = new Map()),
              (this.playersByQueriedElement = new Map()),
              (this.statesByElement = new Map()),
              (this.disabledNodes = new Set()),
              (this.totalAnimations = 0),
              (this.totalQueuedPlayers = 0),
              (this._namespaceLookup = {}),
              (this._namespaceList = []),
              (this._flushFns = []),
              (this._whenQuietFns = []),
              (this.namespacesByHostElement = new Map()),
              (this.collectedEnterElements = []),
              (this.collectedLeaveElements = []),
              (this.onRemovalComplete = function (t, e) {});
          }
          return (
            (t.prototype._onRemovalComplete = function (t, e) {
              this.onRemovalComplete(t, e);
            }),
            Object.defineProperty(t.prototype, "queuedPlayers", {
              get: function () {
                var t = [];
                return (
                  this._namespaceList.forEach(function (e) {
                    e.players.forEach(function (e) {
                      e.queued && t.push(e);
                    });
                  }),
                  t
                );
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.createNamespace = function (t, e) {
              var n = new im(t, e, this);
              return (
                e.parentNode
                  ? this._balanceNamespaceList(n, e)
                  : (this.newHostElements.set(e, n),
                    this.collectEnterElement(e)),
                (this._namespaceLookup[t] = n)
              );
            }),
            (t.prototype._balanceNamespaceList = function (t, e) {
              var n = this._namespaceList.length - 1;
              if (n >= 0) {
                for (var r = !1, o = n; o >= 0; o--)
                  if (
                    this.driver.containsElement(
                      this._namespaceList[o].hostElement,
                      e
                    )
                  ) {
                    this._namespaceList.splice(o + 1, 0, t), (r = !0);
                    break;
                  }
                r || this._namespaceList.splice(0, 0, t);
              } else this._namespaceList.push(t);
              return this.namespacesByHostElement.set(e, t), t;
            }),
            (t.prototype.register = function (t, e) {
              var n = this._namespaceLookup[t];
              return n || (n = this.createNamespace(t, e)), n;
            }),
            (t.prototype.registerTrigger = function (t, e, n) {
              var r = this._namespaceLookup[t];
              r && r.register(e, n) && this.totalAnimations++;
            }),
            (t.prototype.destroy = function (t, e) {
              var n = this;
              if (t) {
                var r = this._fetchNamespace(t);
                this.afterFlush(function () {
                  n.namespacesByHostElement.delete(r.hostElement),
                    delete n._namespaceLookup[t];
                  var e = n._namespaceList.indexOf(r);
                  e >= 0 && n._namespaceList.splice(e, 1);
                }),
                  this.afterFlushAnimationsDone(function () {
                    return r.destroy(e);
                  });
              }
            }),
            (t.prototype._fetchNamespace = function (t) {
              return this._namespaceLookup[t];
            }),
            (t.prototype.fetchNamespacesByElement = function (t) {
              var e = new Set(),
                n = this.statesByElement.get(t);
              if (n)
                for (var r = Object.keys(n), o = 0; o < r.length; o++) {
                  var i = n[r[o]].namespaceId;
                  if (i) {
                    var a = this._fetchNamespace(i);
                    a && e.add(a);
                  }
                }
              return e;
            }),
            (t.prototype.trigger = function (t, e, n, r) {
              if (um(e)) {
                var o = this._fetchNamespace(t);
                if (o) return o.trigger(e, n, r), !0;
              }
              return !1;
            }),
            (t.prototype.insertNode = function (t, e, n, r) {
              if (um(e)) {
                var o = e[nm];
                if (o && o.setForRemoval) {
                  (o.setForRemoval = !1), (o.setForMove = !0);
                  var i = this.collectedLeaveElements.indexOf(e);
                  i >= 0 && this.collectedLeaveElements.splice(i, 1);
                }
                if (t) {
                  var a = this._fetchNamespace(t);
                  a && a.insertNode(e, n);
                }
                r && this.collectEnterElement(e);
              }
            }),
            (t.prototype.collectEnterElement = function (t) {
              this.collectedEnterElements.push(t);
            }),
            (t.prototype.markElementAsDisabled = function (t, e) {
              e
                ? this.disabledNodes.has(t) ||
                  (this.disabledNodes.add(t), fm(t, "ng-animate-disabled"))
                : this.disabledNodes.has(t) &&
                  (this.disabledNodes.delete(t), dm(t, "ng-animate-disabled"));
            }),
            (t.prototype.removeNode = function (t, e, n, r) {
              if (um(e)) {
                var o = t ? this._fetchNamespace(t) : null;
                if (
                  (o
                    ? o.removeNode(e, r)
                    : this.markElementAsRemoved(t, e, !1, r),
                  n)
                ) {
                  var i = this.namespacesByHostElement.get(e);
                  i && i.id !== t && i.removeNode(e, r);
                }
              } else this._onRemovalComplete(e, r);
            }),
            (t.prototype.markElementAsRemoved = function (t, e, n, r) {
              this.collectedLeaveElements.push(e),
                (e[nm] = {
                  namespaceId: t,
                  setForRemoval: r,
                  hasAnimation: n,
                  removedBeforeQueried: !1,
                });
            }),
            (t.prototype.listen = function (t, e, n, r, o) {
              return um(e)
                ? this._fetchNamespace(t).listen(e, n, r, o)
                : function () {};
            }),
            (t.prototype._buildInstruction = function (t, e, n, r, o) {
              return t.transition.build(
                this.driver,
                t.element,
                t.fromState.value,
                t.toState.value,
                n,
                r,
                t.fromState.options,
                t.toState.options,
                e,
                o
              );
            }),
            (t.prototype.destroyInnerAnimations = function (t) {
              var e = this,
                n = this.driver.query(t, ".ng-trigger", !0);
              n.forEach(function (t) {
                return e.destroyActiveAnimationsForElement(t);
              }),
                0 != this.playersByQueriedElement.size &&
                  (n = this.driver.query(t, ".ng-animating", !0)).forEach(
                    function (t) {
                      return e.finishActiveQueriedAnimationOnElement(t);
                    }
                  );
            }),
            (t.prototype.destroyActiveAnimationsForElement = function (t) {
              var e = this.playersByElement.get(t);
              e &&
                e.forEach(function (t) {
                  t.queued ? (t.markedForDestroy = !0) : t.destroy();
                });
            }),
            (t.prototype.finishActiveQueriedAnimationOnElement = function (t) {
              var e = this.playersByQueriedElement.get(t);
              e &&
                e.forEach(function (t) {
                  return t.finish();
                });
            }),
            (t.prototype.whenRenderingDone = function () {
              var t = this;
              return new Promise(function (e) {
                if (t.players.length)
                  return Rf(t.players).onDone(function () {
                    return e();
                  });
                e();
              });
            }),
            (t.prototype.processLeaveNode = function (t) {
              var e = this,
                n = t[nm];
              if (n && n.setForRemoval) {
                if (((t[nm] = tm), n.namespaceId)) {
                  this.destroyInnerAnimations(t);
                  var r = this._fetchNamespace(n.namespaceId);
                  r && r.clearElementCache(t);
                }
                this._onRemovalComplete(t, n.setForRemoval);
              }
              this.driver.matchesElement(t, ".ng-animate-disabled") &&
                this.markElementAsDisabled(t, !1),
                this.driver
                  .query(t, ".ng-animate-disabled", !0)
                  .forEach(function (t) {
                    e.markElementAsDisabled(t, !1);
                  });
            }),
            (t.prototype.flush = function (t) {
              var e = this;
              void 0 === t && (t = -1);
              var n = [];
              if (
                (this.newHostElements.size &&
                  (this.newHostElements.forEach(function (t, n) {
                    return e._balanceNamespaceList(t, n);
                  }),
                  this.newHostElements.clear()),
                this.totalAnimations && this.collectedEnterElements.length)
              )
                for (var r = 0; r < this.collectedEnterElements.length; r++)
                  fm(this.collectedEnterElements[r], "ng-star-inserted");
              if (
                this._namespaceList.length &&
                (this.totalQueuedPlayers || this.collectedLeaveElements.length)
              ) {
                var o = [];
                try {
                  n = this._flushAnimations(o, t);
                } finally {
                  for (r = 0; r < o.length; r++) o[r]();
                }
              } else
                for (r = 0; r < this.collectedLeaveElements.length; r++)
                  this.processLeaveNode(this.collectedLeaveElements[r]);
              if (
                ((this.totalQueuedPlayers = 0),
                (this.collectedEnterElements.length = 0),
                (this.collectedLeaveElements.length = 0),
                this._flushFns.forEach(function (t) {
                  return t();
                }),
                (this._flushFns = []),
                this._whenQuietFns.length)
              ) {
                var i = this._whenQuietFns;
                (this._whenQuietFns = []),
                  n.length
                    ? Rf(n).onDone(function () {
                        i.forEach(function (t) {
                          return t();
                        });
                      })
                    : i.forEach(function (t) {
                        return t();
                      });
              }
            }),
            (t.prototype.reportError = function (t) {
              throw new Error(
                "Unable to process animations due to the following failed trigger transitions\n " +
                  t.join("\n")
              );
            }),
            (t.prototype._flushAnimations = function (t, e) {
              var n = this,
                o = new Nd(),
                i = [],
                a = new Map(),
                s = [],
                u = new Map(),
                l = new Map(),
                c = new Map(),
                h = new Set();
              this.disabledNodes.forEach(function (t) {
                h.add(t);
                for (
                  var e = n.driver.query(t, ".ng-animate-queued", !0), r = 0;
                  r < e.length;
                  r++
                )
                  h.add(e[r]);
              });
              var p = this.bodyNode,
                f = Array.from(this.statesByElement.keys()),
                d = hm(f, this.collectedEnterElements),
                m = new Map(),
                y = 0;
              d.forEach(function (t, e) {
                var n = "ng-enter" + y++;
                m.set(e, n),
                  t.forEach(function (t) {
                    return fm(t, n);
                  });
              });
              for (
                var g = [], v = new Set(), b = new Set(), _ = 0;
                _ < this.collectedLeaveElements.length;
                _++
              )
                (V = (M = this.collectedLeaveElements[_])[nm]) &&
                  V.setForRemoval &&
                  (g.push(M),
                  v.add(M),
                  V.hasAnimation
                    ? this.driver
                        .query(M, ".ng-star-inserted", !0)
                        .forEach(function (t) {
                          return v.add(t);
                        })
                    : b.add(M));
              var w = new Map(),
                C = hm(f, Array.from(v));
              C.forEach(function (t, e) {
                var n = "ng-leave" + y++;
                w.set(e, n),
                  t.forEach(function (t) {
                    return fm(t, n);
                  });
              }),
                t.push(function () {
                  d.forEach(function (t, e) {
                    var n = m.get(e);
                    t.forEach(function (t) {
                      return dm(t, n);
                    });
                  }),
                    C.forEach(function (t, e) {
                      var n = w.get(e);
                      t.forEach(function (t) {
                        return dm(t, n);
                      });
                    }),
                    g.forEach(function (t) {
                      n.processLeaveNode(t);
                    });
                });
              for (
                var E = [], S = [], k = this._namespaceList.length - 1;
                k >= 0;
                k--
              )
                this._namespaceList[k]
                  .drainQueuedTransitions(e)
                  .forEach(function (t) {
                    var e = t.player,
                      r = t.element;
                    if ((E.push(e), n.collectedEnterElements.length)) {
                      var a = r[nm];
                      if (a && a.setForMove) return void e.destroy();
                    }
                    var h = !p || !n.driver.containsElement(p, r),
                      f = w.get(r),
                      d = m.get(r),
                      y = n._buildInstruction(t, o, d, f, h);
                    if (y.errors && y.errors.length) S.push(y);
                    else {
                      if (h)
                        return (
                          e.onStart(function () {
                            return ud(r, y.fromStyles);
                          }),
                          e.onDestroy(function () {
                            return sd(r, y.toStyles);
                          }),
                          void i.push(e)
                        );
                      if (t.isFallbackTransition)
                        return (
                          e.onStart(function () {
                            return ud(r, y.fromStyles);
                          }),
                          e.onDestroy(function () {
                            return sd(r, y.toStyles);
                          }),
                          void i.push(e)
                        );
                      y.timelines.forEach(function (t) {
                        return (t.stretchStartingKeyframe = !0);
                      }),
                        o.append(r, y.timelines),
                        s.push({ instruction: y, player: e, element: r }),
                        y.queriedElements.forEach(function (t) {
                          return Ff(u, t, []).push(e);
                        }),
                        y.preStyleProps.forEach(function (t, e) {
                          var n = Object.keys(t);
                          if (n.length) {
                            var r = l.get(e);
                            r || l.set(e, (r = new Set())),
                              n.forEach(function (t) {
                                return r.add(t);
                              });
                          }
                        }),
                        y.postStyleProps.forEach(function (t, e) {
                          var n = Object.keys(t),
                            r = c.get(e);
                          r || c.set(e, (r = new Set())),
                            n.forEach(function (t) {
                              return r.add(t);
                            });
                        });
                    }
                  });
              if (S.length) {
                var T = [];
                S.forEach(function (t) {
                  T.push("@" + t.triggerName + " has failed due to:\n"),
                    t.errors.forEach(function (t) {
                      return T.push("- " + t + "\n");
                    });
                }),
                  E.forEach(function (t) {
                    return t.destroy();
                  }),
                  this.reportError(T);
              }
              var x = new Map(),
                O = new Map();
              s.forEach(function (t) {
                var e = t.element;
                o.has(e) &&
                  (O.set(e, e),
                  n._beforeAnimationBuild(
                    t.player.namespaceId,
                    t.instruction,
                    x
                  ));
              }),
                i.forEach(function (t) {
                  var e = t.element;
                  n._getPreviousPlayers(
                    e,
                    !1,
                    t.namespaceId,
                    t.triggerName,
                    null
                  ).forEach(function (t) {
                    Ff(x, e, []).push(t), t.destroy();
                  });
                });
              var P = g.filter(function (t) {
                  return ym(t, l, c);
                }),
                A = new Map();
              cm(A, this.driver, b, c, kf).forEach(function (t) {
                ym(t, l, c) && P.push(t);
              });
              var I = new Map();
              d.forEach(function (t, e) {
                cm(I, n.driver, new Set(t), l, If);
              }),
                P.forEach(function (t) {
                  var e = A.get(t),
                    n = I.get(t);
                  A.set(t, Object(r.a)({}, e, n));
                });
              var N = [],
                R = [],
                D = {};
              s.forEach(function (t) {
                var e = t.element,
                  r = t.player,
                  s = t.instruction;
                if (o.has(e)) {
                  if (h.has(e))
                    return (
                      r.onDestroy(function () {
                        return sd(e, s.toStyles);
                      }),
                      (r.disabled = !0),
                      r.overrideTotalTime(s.totalTime),
                      void i.push(r)
                    );
                  var u = D;
                  if (O.size > 1) {
                    for (var l = e, c = []; (l = l.parentNode); ) {
                      var p = O.get(l);
                      if (p) {
                        u = p;
                        break;
                      }
                      c.push(l);
                    }
                    c.forEach(function (t) {
                      return O.set(t, u);
                    });
                  }
                  var f = n._buildAnimation(r.namespaceId, s, x, a, I, A);
                  if ((r.setRealPlayer(f), u === D)) N.push(r);
                  else {
                    var d = n.playersByElement.get(u);
                    d && d.length && (r.parentPlayer = Rf(d)), i.push(r);
                  }
                } else
                  ud(e, s.fromStyles),
                    r.onDestroy(function () {
                      return sd(e, s.toStyles);
                    }),
                    R.push(r),
                    h.has(e) && i.push(r);
              }),
                R.forEach(function (t) {
                  var e = a.get(t.element);
                  if (e && e.length) {
                    var n = Rf(e);
                    t.setRealPlayer(n);
                  }
                }),
                i.forEach(function (t) {
                  t.parentPlayer
                    ? t.syncPlayerEvents(t.parentPlayer)
                    : t.destroy();
                });
              for (var j = 0; j < g.length; j++) {
                var M,
                  V = (M = g[j])[nm];
                if ((dm(M, "ng-leave"), !V || !V.hasAnimation)) {
                  var F = [];
                  if (u.size) {
                    var L = u.get(M);
                    L && L.length && F.push.apply(F, Object(r.d)(L));
                    for (
                      var U = this.driver.query(M, ".ng-animating", !0), H = 0;
                      H < U.length;
                      H++
                    ) {
                      var z = u.get(U[H]);
                      z && z.length && F.push.apply(F, Object(r.d)(z));
                    }
                  }
                  var B = F.filter(function (t) {
                    return !t.destroyed;
                  });
                  B.length ? mm(this, M, B) : this.processLeaveNode(M);
                }
              }
              return (
                (g.length = 0),
                N.forEach(function (t) {
                  n.players.push(t),
                    t.onDone(function () {
                      t.destroy();
                      var e = n.players.indexOf(t);
                      n.players.splice(e, 1);
                    }),
                    t.play();
                }),
                N
              );
            }),
            (t.prototype.elementContainsData = function (t, e) {
              var n = !1,
                r = e[nm];
              return (
                r && r.setForRemoval && (n = !0),
                this.playersByElement.has(e) && (n = !0),
                this.playersByQueriedElement.has(e) && (n = !0),
                this.statesByElement.has(e) && (n = !0),
                this._fetchNamespace(t).elementContainsData(e) || n
              );
            }),
            (t.prototype.afterFlush = function (t) {
              this._flushFns.push(t);
            }),
            (t.prototype.afterFlushAnimationsDone = function (t) {
              this._whenQuietFns.push(t);
            }),
            (t.prototype._getPreviousPlayers = function (t, e, n, r, o) {
              var i = [];
              if (e) {
                var a = this.playersByQueriedElement.get(t);
                a && (i = a);
              } else {
                var s = this.playersByElement.get(t);
                if (s) {
                  var u = !o || "void" == o;
                  s.forEach(function (t) {
                    t.queued || ((u || t.triggerName == r) && i.push(t));
                  });
                }
              }
              return (
                (n || r) &&
                  (i = i.filter(function (t) {
                    return !(
                      (n && n != t.namespaceId) ||
                      (r && r != t.triggerName)
                    );
                  })),
                i
              );
            }),
            (t.prototype._beforeAnimationBuild = function (t, e, n) {
              var o,
                i,
                a = e.element,
                s = e.isRemovalTransition ? void 0 : t,
                u = e.isRemovalTransition ? void 0 : e.triggerName,
                l = function (t) {
                  var r = t.element,
                    o = r !== a,
                    i = Ff(n, r, []);
                  c._getPreviousPlayers(r, o, s, u, e.toState).forEach(
                    function (t) {
                      var e = t.getRealPlayer();
                      e.beforeDestroy && e.beforeDestroy(),
                        t.destroy(),
                        i.push(t);
                    }
                  );
                },
                c = this;
              try {
                for (
                  var h = Object(r.e)(e.timelines), p = h.next();
                  !p.done;
                  p = h.next()
                )
                  l(p.value);
              } catch (f) {
                o = { error: f };
              } finally {
                try {
                  p && !p.done && (i = h.return) && i.call(h);
                } finally {
                  if (o) throw o.error;
                }
              }
              ud(a, e.fromStyles);
            }),
            (t.prototype._buildAnimation = function (t, e, n, r, o, i) {
              var a = this,
                s = e.triggerName,
                u = e.element,
                l = [],
                c = new Set(),
                h = new Set(),
                p = e.timelines.map(function (e) {
                  var p = e.element;
                  c.add(p);
                  var f = p[nm];
                  if (f && f.removedBeforeQueried)
                    return new Pf(e.duration, e.delay);
                  var d,
                    m,
                    y = p !== u,
                    g = ((d = (n.get(p) || Yd).map(function (t) {
                      return t.getRealPlayer();
                    })),
                    (m = []),
                    (function t(e, n) {
                      for (var r = 0; r < e.length; r++) {
                        var o = e[r];
                        o instanceof Af ? t(o.players, n) : n.push(o);
                      }
                    })(d, m),
                    m).filter(function (t) {
                      return !!t.element && t.element === p;
                    }),
                    v = o.get(p),
                    b = i.get(p),
                    _ = Df(0, a._normalizer, 0, e.keyframes, v, b),
                    w = a._buildPlayer(e, _, g);
                  if ((e.subTimeline && r && h.add(p), y)) {
                    var C = new sm(t, s, p);
                    C.setRealPlayer(w), l.push(C);
                  }
                  return w;
                });
              l.forEach(function (t) {
                Ff(a.playersByQueriedElement, t.element, []).push(t),
                  t.onDone(function () {
                    return (function (t, e, n) {
                      var r;
                      if (t instanceof Map) {
                        if ((r = t.get(e))) {
                          if (r.length) {
                            var o = r.indexOf(n);
                            r.splice(o, 1);
                          }
                          0 == r.length && t.delete(e);
                        }
                      } else (r = t[e]) && (r.length && ((o = r.indexOf(n)), r.splice(o, 1)), 0 == r.length && delete t[e]);
                      return r;
                    })(a.playersByQueriedElement, t.element, t);
                  });
              }),
                c.forEach(function (t) {
                  return fm(t, "ng-animating");
                });
              var f = Rf(p);
              return (
                f.onDestroy(function () {
                  c.forEach(function (t) {
                    return dm(t, "ng-animating");
                  }),
                    sd(u, e.toStyles);
                }),
                h.forEach(function (t) {
                  Ff(r, t, []).push(f);
                }),
                f
              );
            }),
            (t.prototype._buildPlayer = function (t, e, n) {
              return e.length > 0
                ? this.driver.animate(
                    t.element,
                    e,
                    t.duration,
                    t.delay,
                    t.easing,
                    n
                  )
                : new Pf(t.duration, t.delay);
            }),
            t
          );
        })(),
        sm = (function () {
          function t(t, e, n) {
            (this.namespaceId = t),
              (this.triggerName = e),
              (this.element = n),
              (this._player = new Pf()),
              (this._containsRealPlayer = !1),
              (this._queuedCallbacks = {}),
              (this.destroyed = !1),
              (this.markedForDestroy = !1),
              (this.disabled = !1),
              (this.queued = !0),
              (this.totalTime = 0);
          }
          return (
            (t.prototype.setRealPlayer = function (t) {
              var e = this;
              this._containsRealPlayer ||
                ((this._player = t),
                Object.keys(this._queuedCallbacks).forEach(function (n) {
                  e._queuedCallbacks[n].forEach(function (e) {
                    return jf(t, n, void 0, e);
                  });
                }),
                (this._queuedCallbacks = {}),
                (this._containsRealPlayer = !0),
                this.overrideTotalTime(t.totalTime),
                (this.queued = !1));
            }),
            (t.prototype.getRealPlayer = function () {
              return this._player;
            }),
            (t.prototype.overrideTotalTime = function (t) {
              this.totalTime = t;
            }),
            (t.prototype.syncPlayerEvents = function (t) {
              var e = this,
                n = this._player;
              n.triggerCallback &&
                t.onStart(function () {
                  return n.triggerCallback("start");
                }),
                t.onDone(function () {
                  return e.finish();
                }),
                t.onDestroy(function () {
                  return e.destroy();
                });
            }),
            (t.prototype._queueEvent = function (t, e) {
              Ff(this._queuedCallbacks, t, []).push(e);
            }),
            (t.prototype.onDone = function (t) {
              this.queued && this._queueEvent("done", t),
                this._player.onDone(t);
            }),
            (t.prototype.onStart = function (t) {
              this.queued && this._queueEvent("start", t),
                this._player.onStart(t);
            }),
            (t.prototype.onDestroy = function (t) {
              this.queued && this._queueEvent("destroy", t),
                this._player.onDestroy(t);
            }),
            (t.prototype.init = function () {
              this._player.init();
            }),
            (t.prototype.hasStarted = function () {
              return !this.queued && this._player.hasStarted();
            }),
            (t.prototype.play = function () {
              !this.queued && this._player.play();
            }),
            (t.prototype.pause = function () {
              !this.queued && this._player.pause();
            }),
            (t.prototype.restart = function () {
              !this.queued && this._player.restart();
            }),
            (t.prototype.finish = function () {
              this._player.finish();
            }),
            (t.prototype.destroy = function () {
              (this.destroyed = !0), this._player.destroy();
            }),
            (t.prototype.reset = function () {
              !this.queued && this._player.reset();
            }),
            (t.prototype.setPosition = function (t) {
              this.queued || this._player.setPosition(t);
            }),
            (t.prototype.getPosition = function () {
              return this.queued ? 0 : this._player.getPosition();
            }),
            (t.prototype.triggerCallback = function (t) {
              var e = this._player;
              e.triggerCallback && e.triggerCallback(t);
            }),
            t
          );
        })();
      function um(t) {
        return t && 1 === t.nodeType;
      }
      function lm(t, e) {
        var n = t.style.display;
        return (t.style.display = null != e ? e : "none"), n;
      }
      function cm(t, e, n, r, o) {
        var i = [];
        n.forEach(function (t) {
          return i.push(lm(t));
        });
        var a = [];
        r.forEach(function (n, r) {
          var i = {};
          n.forEach(function (t) {
            var n = (i[t] = e.computeStyle(r, t, o));
            (n && 0 != n.length) || ((r[nm] = em), a.push(r));
          }),
            t.set(r, i);
        });
        var s = 0;
        return (
          n.forEach(function (t) {
            return lm(t, i[s++]);
          }),
          a
        );
      }
      function hm(t, e) {
        var n = new Map();
        if (
          (t.forEach(function (t) {
            return n.set(t, []);
          }),
          0 == e.length)
        )
          return n;
        var r = new Set(e),
          o = new Map();
        return (
          e.forEach(function (t) {
            var e = (function t(e) {
              if (!e) return 1;
              var i = o.get(e);
              if (i) return i;
              var a = e.parentNode;
              return (i = n.has(a) ? a : r.has(a) ? 1 : t(a)), o.set(e, i), i;
            })(t);
            1 !== e && n.get(e).push(t);
          }),
          n
        );
      }
      var pm = "$$classes";
      function fm(t, e) {
        if (t.classList) t.classList.add(e);
        else {
          var n = t[pm];
          n || (n = t[pm] = {}), (n[e] = !0);
        }
      }
      function dm(t, e) {
        if (t.classList) t.classList.remove(e);
        else {
          var n = t[pm];
          n && delete n[e];
        }
      }
      function mm(t, e, n) {
        Rf(n).onDone(function () {
          return t.processLeaveNode(e);
        });
      }
      function ym(t, e, n) {
        var r = n.get(t);
        if (!r) return !1;
        var o = e.get(t);
        return (
          o
            ? r.forEach(function (t) {
                return o.add(t);
              })
            : e.set(t, r),
          n.delete(t),
          !0
        );
      }
      var gm = (function () {
        function t(t, e, n) {
          var r = this;
          (this.bodyNode = t),
            (this._driver = e),
            (this._triggerCache = {}),
            (this.onRemovalComplete = function (t, e) {}),
            (this._transitionEngine = new am(t, e, n)),
            (this._timelineEngine = new Jd(t, e, n)),
            (this._transitionEngine.onRemovalComplete = function (t, e) {
              return r.onRemovalComplete(t, e);
            });
        }
        return (
          (t.prototype.registerTrigger = function (t, e, n, r, o) {
            var i = t + "-" + r,
              a = this._triggerCache[i];
            if (!a) {
              var s = [],
                u = kd(this._driver, o, s);
              if (s.length)
                throw new Error(
                  'The animation trigger "' +
                    r +
                    '" has failed to build due to the following errors:\n - ' +
                    s.join("\n - ")
                );
              (a = (function (t, e) {
                return new Zd(t, e);
              })(r, u)),
                (this._triggerCache[i] = a);
            }
            this._transitionEngine.registerTrigger(e, r, a);
          }),
          (t.prototype.register = function (t, e) {
            this._transitionEngine.register(t, e);
          }),
          (t.prototype.destroy = function (t, e) {
            this._transitionEngine.destroy(t, e);
          }),
          (t.prototype.onInsert = function (t, e, n, r) {
            this._transitionEngine.insertNode(t, e, n, r);
          }),
          (t.prototype.onRemove = function (t, e, n, r) {
            this._transitionEngine.removeNode(t, e, r || !1, n);
          }),
          (t.prototype.disableAnimations = function (t, e) {
            this._transitionEngine.markElementAsDisabled(t, e);
          }),
          (t.prototype.process = function (t, e, n, o) {
            if ("@" == n.charAt(0)) {
              var i = Object(r.c)(Lf(n), 2);
              this._timelineEngine.command(i[0], e, i[1], o);
            } else this._transitionEngine.trigger(t, e, n, o);
          }),
          (t.prototype.listen = function (t, e, n, o, i) {
            if ("@" == n.charAt(0)) {
              var a = Object(r.c)(Lf(n), 2);
              return this._timelineEngine.listen(a[0], e, a[1], i);
            }
            return this._transitionEngine.listen(t, e, n, o, i);
          }),
          (t.prototype.flush = function (t) {
            void 0 === t && (t = -1), this._transitionEngine.flush(t);
          }),
          Object.defineProperty(t.prototype, "players", {
            get: function () {
              return this._transitionEngine.players.concat(
                this._timelineEngine.players
              );
            },
            enumerable: !0,
            configurable: !0,
          }),
          (t.prototype.whenRenderingDone = function () {
            return this._transitionEngine.whenRenderingDone();
          }),
          t
        );
      })();
      function vm(t, e) {
        var n = null,
          r = null;
        return (
          Array.isArray(e) && e.length
            ? ((n = _m(e[0])), e.length > 1 && (r = _m(e[e.length - 1])))
            : e && (n = _m(e)),
          n || r ? new bm(t, n, r) : null
        );
      }
      var bm = (function () {
        function t(e, n, r) {
          (this._element = e),
            (this._startStyles = n),
            (this._endStyles = r),
            (this._state = 0);
          var o = t.initialStylesByElement.get(e);
          o || t.initialStylesByElement.set(e, (o = {})),
            (this._initialStyles = o);
        }
        return (
          (t.prototype.start = function () {
            this._state < 1 &&
              (this._startStyles &&
                sd(this._element, this._startStyles, this._initialStyles),
              (this._state = 1));
          }),
          (t.prototype.finish = function () {
            this.start(),
              this._state < 2 &&
                (sd(this._element, this._initialStyles),
                this._endStyles &&
                  (sd(this._element, this._endStyles),
                  (this._endStyles = null)),
                (this._state = 1));
          }),
          (t.prototype.destroy = function () {
            this.finish(),
              this._state < 3 &&
                (t.initialStylesByElement.delete(this._element),
                this._startStyles &&
                  (ud(this._element, this._startStyles),
                  (this._endStyles = null)),
                this._endStyles &&
                  (ud(this._element, this._endStyles),
                  (this._endStyles = null)),
                sd(this._element, this._initialStyles),
                (this._state = 3));
          }),
          (t.initialStylesByElement = new WeakMap()),
          t
        );
      })();
      function _m(t) {
        for (var e = null, n = Object.keys(t), r = 0; r < n.length; r++) {
          var o = n[r];
          wm(o) && ((e = e || {})[o] = t[o]);
        }
        return e;
      }
      function wm(t) {
        return "display" === t || "position" === t;
      }
      var Cm = "animation",
        Em = "animationend",
        Sm = (function () {
          function t(t, e, n, r, o, i, a) {
            var s = this;
            (this._element = t),
              (this._name = e),
              (this._duration = n),
              (this._delay = r),
              (this._easing = o),
              (this._fillMode = i),
              (this._onDoneFn = a),
              (this._finished = !1),
              (this._destroyed = !1),
              (this._startTime = 0),
              (this._position = 0),
              (this._eventFn = function (t) {
                return s._handleCallback(t);
              });
          }
          return (
            (t.prototype.apply = function () {
              var t, e, n;
              (e =
                this._duration +
                "ms " +
                this._easing +
                " " +
                this._delay +
                "ms 1 normal " +
                this._fillMode +
                " " +
                this._name),
                (n = Am((t = this._element), "").trim()).length &&
                  ((function (t, e) {
                    for (var n = 0; n < t.length; n++) "," === t.charAt(n) && 0;
                  })(n),
                  (e = n + ", " + e)),
                Pm(t, "", e),
                Om(this._element, this._eventFn, !1),
                (this._startTime = Date.now());
            }),
            (t.prototype.pause = function () {
              km(this._element, this._name, "paused");
            }),
            (t.prototype.resume = function () {
              km(this._element, this._name, "running");
            }),
            (t.prototype.setPosition = function (t) {
              var e = Tm(this._element, this._name);
              (this._position = t * this._duration),
                Pm(this._element, "Delay", "-" + this._position + "ms", e);
            }),
            (t.prototype.getPosition = function () {
              return this._position;
            }),
            (t.prototype._handleCallback = function (t) {
              var e = t._ngTestManualTimestamp || Date.now(),
                n = 1e3 * parseFloat(t.elapsedTime.toFixed(3));
              t.animationName == this._name &&
                Math.max(e - this._startTime, 0) >= this._delay &&
                n >= this._duration &&
                this.finish();
            }),
            (t.prototype.finish = function () {
              this._finished ||
                ((this._finished = !0),
                this._onDoneFn(),
                Om(this._element, this._eventFn, !0));
            }),
            (t.prototype.destroy = function () {
              var t, e, n, r;
              this._destroyed ||
                ((this._destroyed = !0),
                this.finish(),
                (e = this._name),
                (r = xm((n = Am((t = this._element), "").split(",")), e)) >=
                  0 && (n.splice(r, 1), Pm(t, "", n.join(","))));
            }),
            t
          );
        })();
      function km(t, e, n) {
        Pm(t, "PlayState", n, Tm(t, e));
      }
      function Tm(t, e) {
        var n = Am(t, "");
        return n.indexOf(",") > 0 ? xm(n.split(","), e) : xm([n], e);
      }
      function xm(t, e) {
        for (var n = 0; n < t.length; n++) if (t[n].indexOf(e) >= 0) return n;
        return -1;
      }
      function Om(t, e, n) {
        n ? t.removeEventListener(Em, e) : t.addEventListener(Em, e);
      }
      function Pm(t, e, n, r) {
        var o = Cm + e;
        if (null != r) {
          var i = t.style[o];
          if (i.length) {
            var a = i.split(",");
            (a[r] = n), (n = a.join(","));
          }
        }
        t.style[o] = n;
      }
      function Am(t, e) {
        return t.style[Cm + e];
      }
      var Im = "linear",
        Nm = (function () {
          function t(t, e, n, r, o, i, a, s) {
            (this.element = t),
              (this.keyframes = e),
              (this.animationName = n),
              (this._duration = r),
              (this._delay = o),
              (this._finalStyles = a),
              (this._specialStyles = s),
              (this._onDoneFns = []),
              (this._onStartFns = []),
              (this._onDestroyFns = []),
              (this._started = !1),
              (this.currentSnapshot = {}),
              (this._state = 0),
              (this.easing = i || Im),
              (this.totalTime = r + o),
              this._buildStyler();
          }
          return (
            (t.prototype.onStart = function (t) {
              this._onStartFns.push(t);
            }),
            (t.prototype.onDone = function (t) {
              this._onDoneFns.push(t);
            }),
            (t.prototype.onDestroy = function (t) {
              this._onDestroyFns.push(t);
            }),
            (t.prototype.destroy = function () {
              this.init(),
                this._state >= 4 ||
                  ((this._state = 4),
                  this._styler.destroy(),
                  this._flushStartFns(),
                  this._flushDoneFns(),
                  this._specialStyles && this._specialStyles.destroy(),
                  this._onDestroyFns.forEach(function (t) {
                    return t();
                  }),
                  (this._onDestroyFns = []));
            }),
            (t.prototype._flushDoneFns = function () {
              this._onDoneFns.forEach(function (t) {
                return t();
              }),
                (this._onDoneFns = []);
            }),
            (t.prototype._flushStartFns = function () {
              this._onStartFns.forEach(function (t) {
                return t();
              }),
                (this._onStartFns = []);
            }),
            (t.prototype.finish = function () {
              this.init(),
                this._state >= 3 ||
                  ((this._state = 3),
                  this._styler.finish(),
                  this._flushStartFns(),
                  this._specialStyles && this._specialStyles.finish(),
                  this._flushDoneFns());
            }),
            (t.prototype.setPosition = function (t) {
              this._styler.setPosition(t);
            }),
            (t.prototype.getPosition = function () {
              return this._styler.getPosition();
            }),
            (t.prototype.hasStarted = function () {
              return this._state >= 2;
            }),
            (t.prototype.init = function () {
              this._state >= 1 ||
                ((this._state = 1),
                this._styler.apply(),
                this._delay && this._styler.pause());
            }),
            (t.prototype.play = function () {
              this.init(),
                this.hasStarted() ||
                  (this._flushStartFns(),
                  (this._state = 2),
                  this._specialStyles && this._specialStyles.start()),
                this._styler.resume();
            }),
            (t.prototype.pause = function () {
              this.init(), this._styler.pause();
            }),
            (t.prototype.restart = function () {
              this.reset(), this.play();
            }),
            (t.prototype.reset = function () {
              this._styler.destroy(), this._buildStyler(), this._styler.apply();
            }),
            (t.prototype._buildStyler = function () {
              var t = this;
              this._styler = new Sm(
                this.element,
                this.animationName,
                this._duration,
                this._delay,
                this.easing,
                "forwards",
                function () {
                  return t.finish();
                }
              );
            }),
            (t.prototype.triggerCallback = function (t) {
              var e = "start" == t ? this._onStartFns : this._onDoneFns;
              e.forEach(function (t) {
                return t();
              }),
                (e.length = 0);
            }),
            (t.prototype.beforeDestroy = function () {
              var t = this;
              this.init();
              var e = {};
              if (this.hasStarted()) {
                var n = this._state >= 3;
                Object.keys(this._finalStyles).forEach(function (r) {
                  "offset" != r &&
                    (e[r] = n ? t._finalStyles[r] : bd(t.element, r));
                });
              }
              this.currentSnapshot = e;
            }),
            t
          );
        })(),
        Rm = (function (t) {
          function e(e, n) {
            var r = t.call(this) || this;
            return (
              (r.element = e),
              (r._startingStyles = {}),
              (r.__initialized = !1),
              (r._styles = $f(n)),
              r
            );
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.init = function () {
              var e = this;
              !this.__initialized &&
                this._startingStyles &&
                ((this.__initialized = !0),
                Object.keys(this._styles).forEach(function (t) {
                  e._startingStyles[t] = e.element.style[t];
                }),
                t.prototype.init.call(this));
            }),
            (e.prototype.play = function () {
              var e = this;
              this._startingStyles &&
                (this.init(),
                Object.keys(this._styles).forEach(function (t) {
                  return e.element.style.setProperty(t, e._styles[t]);
                }),
                t.prototype.play.call(this));
            }),
            (e.prototype.destroy = function () {
              var e = this;
              this._startingStyles &&
                (Object.keys(this._startingStyles).forEach(function (t) {
                  var n = e._startingStyles[t];
                  n
                    ? e.element.style.setProperty(t, n)
                    : e.element.style.removeProperty(t);
                }),
                (this._startingStyles = null),
                t.prototype.destroy.call(this));
            }),
            e
          );
        })(Pf),
        Dm = (function () {
          function t() {
            (this._count = 0),
              (this._head = document.querySelector("head")),
              (this._warningIssued = !1);
          }
          return (
            (t.prototype.validateStyleProperty = function (t) {
              return Wf(t);
            }),
            (t.prototype.matchesElement = function (t, e) {
              return Qf(t, e);
            }),
            (t.prototype.containsElement = function (t, e) {
              return Kf(t, e);
            }),
            (t.prototype.query = function (t, e, n) {
              return Zf(t, e, n);
            }),
            (t.prototype.computeStyle = function (t, e, n) {
              return window.getComputedStyle(t)[e];
            }),
            (t.prototype.buildKeyframeElement = function (t, e, n) {
              n = n.map(function (t) {
                return $f(t);
              });
              var r = "@keyframes " + e + " {\n",
                o = "";
              n.forEach(function (t) {
                o = " ";
                var e = parseFloat(t.offset);
                (r += "" + o + 100 * e + "% {\n"),
                  (o += " "),
                  Object.keys(t).forEach(function (e) {
                    var n = t[e];
                    switch (e) {
                      case "offset":
                        return;
                      case "easing":
                        return void (
                          n &&
                          (r += o + "animation-timing-function: " + n + ";\n")
                        );
                      default:
                        return void (r += "" + o + e + ": " + n + ";\n");
                    }
                  }),
                  (r += o + "}\n");
              }),
                (r += "}\n");
              var i = document.createElement("style");
              return (i.innerHTML = r), i;
            }),
            (t.prototype.animate = function (t, e, n, r, o, i, a) {
              void 0 === i && (i = []), a && this._notifyFaultyScrubber();
              var s = i.filter(function (t) {
                  return t instanceof Nm;
                }),
                u = {};
              yd(n, r) &&
                s.forEach(function (t) {
                  var e = t.currentSnapshot;
                  Object.keys(e).forEach(function (t) {
                    return (u[t] = e[t]);
                  });
                });
              var l = (function (t) {
                var e = {};
                return (
                  t &&
                    (Array.isArray(t) ? t : [t]).forEach(function (t) {
                      Object.keys(t).forEach(function (n) {
                        "offset" != n && "easing" != n && (e[n] = t[n]);
                      });
                    }),
                  e
                );
              })((e = gd(t, e, u)));
              if (0 == n) return new Rm(t, l);
              var c = "gen_css_kf_" + this._count++,
                h = this.buildKeyframeElement(t, c, e);
              document.querySelector("head").appendChild(h);
              var p = vm(t, e),
                f = new Nm(t, e, c, n, r, o, l, p);
              return (
                f.onDestroy(function () {
                  var t;
                  (t = h).parentNode.removeChild(t);
                }),
                f
              );
            }),
            (t.prototype._notifyFaultyScrubber = function () {
              this._warningIssued ||
                (console.warn(
                  "@angular/animations: please load the web-animations.js polyfill to allow programmatic access...\n",
                  "  visit http://bit.ly/IWukam to learn more about using the web-animation-js polyfill."
                ),
                (this._warningIssued = !0));
            }),
            t
          );
        })(),
        jm = (function () {
          function t(t, e, n, r) {
            (this.element = t),
              (this.keyframes = e),
              (this.options = n),
              (this._specialStyles = r),
              (this._onDoneFns = []),
              (this._onStartFns = []),
              (this._onDestroyFns = []),
              (this._initialized = !1),
              (this._finished = !1),
              (this._started = !1),
              (this._destroyed = !1),
              (this.time = 0),
              (this.parentPlayer = null),
              (this.currentSnapshot = {}),
              (this._duration = n.duration),
              (this._delay = n.delay || 0),
              (this.time = this._duration + this._delay);
          }
          return (
            (t.prototype._onFinish = function () {
              this._finished ||
                ((this._finished = !0),
                this._onDoneFns.forEach(function (t) {
                  return t();
                }),
                (this._onDoneFns = []));
            }),
            (t.prototype.init = function () {
              this._buildPlayer(), this._preparePlayerBeforeStart();
            }),
            (t.prototype._buildPlayer = function () {
              var t = this;
              if (!this._initialized) {
                this._initialized = !0;
                var e = this.keyframes;
                (this.domPlayer = this._triggerWebAnimation(
                  this.element,
                  e,
                  this.options
                )),
                  (this._finalKeyframe = e.length ? e[e.length - 1] : {}),
                  this.domPlayer.addEventListener("finish", function () {
                    return t._onFinish();
                  });
              }
            }),
            (t.prototype._preparePlayerBeforeStart = function () {
              this._delay
                ? this._resetDomPlayerState()
                : this.domPlayer.pause();
            }),
            (t.prototype._triggerWebAnimation = function (t, e, n) {
              return t.animate(e, n);
            }),
            (t.prototype.onStart = function (t) {
              this._onStartFns.push(t);
            }),
            (t.prototype.onDone = function (t) {
              this._onDoneFns.push(t);
            }),
            (t.prototype.onDestroy = function (t) {
              this._onDestroyFns.push(t);
            }),
            (t.prototype.play = function () {
              this._buildPlayer(),
                this.hasStarted() ||
                  (this._onStartFns.forEach(function (t) {
                    return t();
                  }),
                  (this._onStartFns = []),
                  (this._started = !0),
                  this._specialStyles && this._specialStyles.start()),
                this.domPlayer.play();
            }),
            (t.prototype.pause = function () {
              this.init(), this.domPlayer.pause();
            }),
            (t.prototype.finish = function () {
              this.init(),
                this._specialStyles && this._specialStyles.finish(),
                this._onFinish(),
                this.domPlayer.finish();
            }),
            (t.prototype.reset = function () {
              this._resetDomPlayerState(),
                (this._destroyed = !1),
                (this._finished = !1),
                (this._started = !1);
            }),
            (t.prototype._resetDomPlayerState = function () {
              this.domPlayer && this.domPlayer.cancel();
            }),
            (t.prototype.restart = function () {
              this.reset(), this.play();
            }),
            (t.prototype.hasStarted = function () {
              return this._started;
            }),
            (t.prototype.destroy = function () {
              this._destroyed ||
                ((this._destroyed = !0),
                this._resetDomPlayerState(),
                this._onFinish(),
                this._specialStyles && this._specialStyles.destroy(),
                this._onDestroyFns.forEach(function (t) {
                  return t();
                }),
                (this._onDestroyFns = []));
            }),
            (t.prototype.setPosition = function (t) {
              this.domPlayer.currentTime = t * this.time;
            }),
            (t.prototype.getPosition = function () {
              return this.domPlayer.currentTime / this.time;
            }),
            Object.defineProperty(t.prototype, "totalTime", {
              get: function () {
                return this._delay + this._duration;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.beforeDestroy = function () {
              var t = this,
                e = {};
              this.hasStarted() &&
                Object.keys(this._finalKeyframe).forEach(function (n) {
                  "offset" != n &&
                    (e[n] = t._finished
                      ? t._finalKeyframe[n]
                      : bd(t.element, n));
                }),
                (this.currentSnapshot = e);
            }),
            (t.prototype.triggerCallback = function (t) {
              var e = "start" == t ? this._onStartFns : this._onDoneFns;
              e.forEach(function (t) {
                return t();
              }),
                (e.length = 0);
            }),
            t
          );
        })(),
        Mm = (function () {
          function t() {
            (this._isNativeImpl = /\{\s*\[native\s+code\]\s*\}/.test(
              Vm().toString()
            )),
              (this._cssKeyframesDriver = new Dm());
          }
          return (
            (t.prototype.validateStyleProperty = function (t) {
              return Wf(t);
            }),
            (t.prototype.matchesElement = function (t, e) {
              return Qf(t, e);
            }),
            (t.prototype.containsElement = function (t, e) {
              return Kf(t, e);
            }),
            (t.prototype.query = function (t, e, n) {
              return Zf(t, e, n);
            }),
            (t.prototype.computeStyle = function (t, e, n) {
              return window.getComputedStyle(t)[e];
            }),
            (t.prototype.overrideWebAnimationsSupport = function (t) {
              this._isNativeImpl = t;
            }),
            (t.prototype.animate = function (t, e, n, r, o, i, a) {
              if ((void 0 === i && (i = []), !a && !this._isNativeImpl))
                return this._cssKeyframesDriver.animate(t, e, n, r, o, i);
              var s = {
                duration: n,
                delay: r,
                fill: 0 == r ? "both" : "forwards",
              };
              o && (s.easing = o);
              var u = {},
                l = i.filter(function (t) {
                  return t instanceof jm;
                });
              yd(n, r) &&
                l.forEach(function (t) {
                  var e = t.currentSnapshot;
                  Object.keys(e).forEach(function (t) {
                    return (u[t] = e[t]);
                  });
                });
              var c = vm(
                t,
                (e = gd(
                  t,
                  (e = e.map(function (t) {
                    return od(t, !1);
                  })),
                  u
                ))
              );
              return new jm(t, e, s, c);
            }),
            t
          );
        })();
      function Vm() {
        return (
          ("undefined" != typeof window &&
            void 0 !== window.document &&
            Element.prototype.animate) ||
          {}
        );
      }
      var Fm = (function (t) {
          function e(e, n) {
            var r = t.call(this) || this;
            return (
              (r._nextAnimationId = 0),
              (r._renderer = e.createRenderer(n.body, {
                id: "0",
                encapsulation: Ut.None,
                styles: [],
                data: { animation: [] },
              })),
              r
            );
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.build = function (t) {
              var e = this._nextAnimationId.toString();
              this._nextAnimationId++;
              var n = Array.isArray(t) ? Tf(t) : t;
              return (
                Hm(this._renderer, null, e, "register", [n]),
                new Lm(e, this._renderer)
              );
            }),
            e
          );
        })(Ef),
        Lm = (function (t) {
          function e(e, n) {
            var r = t.call(this) || this;
            return (r._id = e), (r._renderer = n), r;
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.create = function (t, e) {
              return new Um(this._id, t, e || {}, this._renderer);
            }),
            e
          );
        })(Sf),
        Um = (function () {
          function t(t, e, n, r) {
            (this.id = t),
              (this.element = e),
              (this._renderer = r),
              (this.parentPlayer = null),
              (this._started = !1),
              (this.totalTime = 0),
              this._command("create", n);
          }
          return (
            (t.prototype._listen = function (t, e) {
              return this._renderer.listen(
                this.element,
                "@@" + this.id + ":" + t,
                e
              );
            }),
            (t.prototype._command = function (t) {
              for (var e = [], n = 1; n < arguments.length; n++)
                e[n - 1] = arguments[n];
              return Hm(this._renderer, this.element, this.id, t, e);
            }),
            (t.prototype.onDone = function (t) {
              this._listen("done", t);
            }),
            (t.prototype.onStart = function (t) {
              this._listen("start", t);
            }),
            (t.prototype.onDestroy = function (t) {
              this._listen("destroy", t);
            }),
            (t.prototype.init = function () {
              this._command("init");
            }),
            (t.prototype.hasStarted = function () {
              return this._started;
            }),
            (t.prototype.play = function () {
              this._command("play"), (this._started = !0);
            }),
            (t.prototype.pause = function () {
              this._command("pause");
            }),
            (t.prototype.restart = function () {
              this._command("restart");
            }),
            (t.prototype.finish = function () {
              this._command("finish");
            }),
            (t.prototype.destroy = function () {
              this._command("destroy");
            }),
            (t.prototype.reset = function () {
              this._command("reset");
            }),
            (t.prototype.setPosition = function (t) {
              this._command("setPosition", t);
            }),
            (t.prototype.getPosition = function () {
              return 0;
            }),
            t
          );
        })();
      function Hm(t, e, n, r, o) {
        return t.setProperty(e, "@@" + n + ":" + r, o);
      }
      var zm = (function () {
          function t(t, e, n) {
            (this.delegate = t),
              (this.engine = e),
              (this._zone = n),
              (this._currentId = 0),
              (this._microtaskId = 1),
              (this._animationCallbacksBuffer = []),
              (this._rendererCache = new Map()),
              (this._cdRecurDepth = 0),
              (this.promise = Promise.resolve(0)),
              (e.onRemovalComplete = function (t, e) {
                e && e.parentNode(t) && e.removeChild(t.parentNode, t);
              });
          }
          return (
            (t.prototype.createRenderer = function (t, e) {
              var n = this,
                r = this.delegate.createRenderer(t, e);
              if (!(t && e && e.data && e.data.animation)) {
                var o = this._rendererCache.get(r);
                return (
                  o ||
                    ((o = new Bm("", r, this.engine)),
                    this._rendererCache.set(r, o)),
                  o
                );
              }
              var i = e.id,
                a = e.id + "-" + this._currentId;
              return (
                this._currentId++,
                this.engine.register(a, t),
                e.data.animation.forEach(function (e) {
                  return n.engine.registerTrigger(i, a, t, e.name, e);
                }),
                new qm(this, a, r, this.engine)
              );
            }),
            (t.prototype.begin = function () {
              this._cdRecurDepth++,
                this.delegate.begin && this.delegate.begin();
            }),
            (t.prototype._scheduleCountTask = function () {
              var t = this;
              this.promise.then(function () {
                t._microtaskId++;
              });
            }),
            (t.prototype.scheduleListenerCallback = function (t, e, n) {
              var o = this;
              t >= 0 && t < this._microtaskId
                ? this._zone.run(function () {
                    return e(n);
                  })
                : (0 == this._animationCallbacksBuffer.length &&
                    Promise.resolve(null).then(function () {
                      o._zone.run(function () {
                        o._animationCallbacksBuffer.forEach(function (t) {
                          var e = Object(r.c)(t, 2);
                          (0, e[0])(e[1]);
                        }),
                          (o._animationCallbacksBuffer = []);
                      });
                    }),
                  this._animationCallbacksBuffer.push([e, n]));
            }),
            (t.prototype.end = function () {
              var t = this;
              this._cdRecurDepth--,
                0 == this._cdRecurDepth &&
                  this._zone.runOutsideAngular(function () {
                    t._scheduleCountTask(), t.engine.flush(t._microtaskId);
                  }),
                this.delegate.end && this.delegate.end();
            }),
            (t.prototype.whenRenderingDone = function () {
              return this.engine.whenRenderingDone();
            }),
            t
          );
        })(),
        Bm = (function () {
          function t(t, e, n) {
            (this.namespaceId = t),
              (this.delegate = e),
              (this.engine = n),
              (this.destroyNode = this.delegate.destroyNode
                ? function (t) {
                    return e.destroyNode(t);
                  }
                : null);
          }
          return (
            Object.defineProperty(t.prototype, "data", {
              get: function () {
                return this.delegate.data;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.destroy = function () {
              this.engine.destroy(this.namespaceId, this.delegate),
                this.delegate.destroy();
            }),
            (t.prototype.createElement = function (t, e) {
              return this.delegate.createElement(t, e);
            }),
            (t.prototype.createComment = function (t) {
              return this.delegate.createComment(t);
            }),
            (t.prototype.createText = function (t) {
              return this.delegate.createText(t);
            }),
            (t.prototype.appendChild = function (t, e) {
              this.delegate.appendChild(t, e),
                this.engine.onInsert(this.namespaceId, e, t, !1);
            }),
            (t.prototype.insertBefore = function (t, e, n) {
              this.delegate.insertBefore(t, e, n),
                this.engine.onInsert(this.namespaceId, e, t, !0);
            }),
            (t.prototype.removeChild = function (t, e, n) {
              this.engine.onRemove(this.namespaceId, e, this.delegate, n);
            }),
            (t.prototype.selectRootElement = function (t, e) {
              return this.delegate.selectRootElement(t, e);
            }),
            (t.prototype.parentNode = function (t) {
              return this.delegate.parentNode(t);
            }),
            (t.prototype.nextSibling = function (t) {
              return this.delegate.nextSibling(t);
            }),
            (t.prototype.setAttribute = function (t, e, n, r) {
              this.delegate.setAttribute(t, e, n, r);
            }),
            (t.prototype.removeAttribute = function (t, e, n) {
              this.delegate.removeAttribute(t, e, n);
            }),
            (t.prototype.addClass = function (t, e) {
              this.delegate.addClass(t, e);
            }),
            (t.prototype.removeClass = function (t, e) {
              this.delegate.removeClass(t, e);
            }),
            (t.prototype.setStyle = function (t, e, n, r) {
              this.delegate.setStyle(t, e, n, r);
            }),
            (t.prototype.removeStyle = function (t, e, n) {
              this.delegate.removeStyle(t, e, n);
            }),
            (t.prototype.setProperty = function (t, e, n) {
              "@" == e.charAt(0) && "@.disabled" == e
                ? this.disableAnimations(t, !!n)
                : this.delegate.setProperty(t, e, n);
            }),
            (t.prototype.setValue = function (t, e) {
              this.delegate.setValue(t, e);
            }),
            (t.prototype.listen = function (t, e, n) {
              return this.delegate.listen(t, e, n);
            }),
            (t.prototype.disableAnimations = function (t, e) {
              this.engine.disableAnimations(t, e);
            }),
            t
          );
        })(),
        qm = (function (t) {
          function e(e, n, r, o) {
            var i = t.call(this, n, r, o) || this;
            return (i.factory = e), (i.namespaceId = n), i;
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.setProperty = function (t, e, n) {
              "@" == e.charAt(0)
                ? "." == e.charAt(1) && "@.disabled" == e
                  ? this.disableAnimations(t, (n = void 0 === n || !!n))
                  : this.engine.process(this.namespaceId, t, e.substr(1), n)
                : this.delegate.setProperty(t, e, n);
            }),
            (e.prototype.listen = function (t, e, n) {
              var o,
                i,
                a,
                s = this;
              if ("@" == e.charAt(0)) {
                var u = (function (t) {
                    switch (t) {
                      case "body":
                        return document.body;
                      case "document":
                        return document;
                      case "window":
                        return window;
                      default:
                        return t;
                    }
                  })(t),
                  l = e.substr(1),
                  c = "";
                return (
                  "@" != l.charAt(0) &&
                    ((l = (o = Object(r.c)(
                      ((i = l),
                      (a = i.indexOf(".")),
                      [i.substring(0, a), i.substr(a + 1)]),
                      2
                    ))[0]),
                    (c = o[1])),
                  this.engine.listen(this.namespaceId, u, l, c, function (t) {
                    s.factory.scheduleListenerCallback(t._data || -1, n, t);
                  })
                );
              }
              return this.delegate.listen(t, e, n);
            }),
            e
          );
        })(Bm),
        Gm = (function (t) {
          function e(e, n, r) {
            return t.call(this, e.body, n, r) || this;
          }
          return Object(r.b)(e, t), e;
        })(gm);
      function Wm() {
        return "function" == typeof Vm() ? new Mm() : new Dm();
      }
      function Qm() {
        return new Bd();
      }
      function Km(t, e, n) {
        return new zm(t, e, n);
      }
      var Zm = new Et("AnimationModuleType"),
        $m = [
          { provide: Ef, useClass: Fm },
          { provide: zd, useFactory: Qm },
          { provide: gm, useClass: Gm },
          { provide: sn, useFactory: Km, deps: [pl, gm, ni] },
        ],
        Xm =
          (Object(r.d)(
            [
              { provide: Jf, useFactory: Wm },
              { provide: Zm, useValue: "BrowserAnimations" },
            ],
            $m
          ),
          Object(r.d)(
            [
              { provide: Jf, useClass: Xf },
              { provide: Zm, useValue: "NoopAnimations" },
            ],
            $m
          ),
          (function () {
            return function () {};
          })()),
        Jm = Kn({
          encapsulation: 2,
          styles: [
            ".mat-progress-spinner{display:block;position:relative}.mat-progress-spinner svg{position:absolute;transform:rotate(-90deg);top:0;left:0;transform-origin:center;overflow:visible}.mat-progress-spinner circle{fill:transparent;transform-origin:center;transition:stroke-dashoffset 225ms linear}._mat-animation-noopable.mat-progress-spinner circle{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate]{animation:mat-progress-spinner-linear-rotate 2s linear infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate]{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] circle{transition-property:stroke;animation-duration:4s;animation-timing-function:cubic-bezier(.35,0,.25,1);animation-iteration-count:infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] circle{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate]{animation:mat-progress-spinner-stroke-rotate-fallback 10s cubic-bezier(.87,.03,.33,1) infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate]{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate] circle{transition-property:stroke}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate] circle{transition:none;animation:none}@keyframes mat-progress-spinner-linear-rotate{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes mat-progress-spinner-stroke-rotate-100{0%{stroke-dashoffset:268.60617px;transform:rotate(0)}12.5%{stroke-dashoffset:56.54867px;transform:rotate(0)}12.5001%{stroke-dashoffset:56.54867px;transform:rotateX(180deg) rotate(72.5deg)}25%{stroke-dashoffset:268.60617px;transform:rotateX(180deg) rotate(72.5deg)}25.0001%{stroke-dashoffset:268.60617px;transform:rotate(270deg)}37.5%{stroke-dashoffset:56.54867px;transform:rotate(270deg)}37.5001%{stroke-dashoffset:56.54867px;transform:rotateX(180deg) rotate(161.5deg)}50%{stroke-dashoffset:268.60617px;transform:rotateX(180deg) rotate(161.5deg)}50.0001%{stroke-dashoffset:268.60617px;transform:rotate(180deg)}62.5%{stroke-dashoffset:56.54867px;transform:rotate(180deg)}62.5001%{stroke-dashoffset:56.54867px;transform:rotateX(180deg) rotate(251.5deg)}75%{stroke-dashoffset:268.60617px;transform:rotateX(180deg) rotate(251.5deg)}75.0001%{stroke-dashoffset:268.60617px;transform:rotate(90deg)}87.5%{stroke-dashoffset:56.54867px;transform:rotate(90deg)}87.5001%{stroke-dashoffset:56.54867px;transform:rotateX(180deg) rotate(341.5deg)}100%{stroke-dashoffset:268.60617px;transform:rotateX(180deg) rotate(341.5deg)}}@keyframes mat-progress-spinner-stroke-rotate-fallback{0%{transform:rotate(0)}25%{transform:rotate(1170deg)}50%{transform:rotate(2340deg)}75%{transform:rotate(3510deg)}100%{transform:rotate(4680deg)}}",
          ],
          data: {},
        });
      function Ym(t) {
        return ea(
          0,
          [
            (t()(),
            Li(
              0,
              0,
              null,
              null,
              0,
              ":svg:circle",
              [
                ["cx", "50%"],
                ["cy", "50%"],
              ],
              [
                [1, "r", 0],
                [4, "animation-name", null],
                [4, "stroke-dashoffset", "px"],
                [4, "stroke-dasharray", "px"],
                [4, "stroke-width", "%"],
              ],
              null,
              null,
              null,
              null
            )),
          ],
          null,
          function (t, e) {
            var n = e.component;
            t(
              e,
              0,
              0,
              n._circleRadius,
              "mat-progress-spinner-stroke-rotate-" + n.diameter,
              n._strokeDashOffset,
              n._strokeCircumference,
              n._circleStrokeWidth
            );
          }
        );
      }
      function ty(t) {
        return ea(
          0,
          [
            (t()(),
            Li(
              0,
              0,
              null,
              null,
              0,
              ":svg:circle",
              [
                ["cx", "50%"],
                ["cy", "50%"],
              ],
              [
                [1, "r", 0],
                [4, "stroke-dashoffset", "px"],
                [4, "stroke-dasharray", "px"],
                [4, "stroke-width", "%"],
              ],
              null,
              null,
              null,
              null
            )),
          ],
          null,
          function (t, e) {
            var n = e.component;
            t(
              e,
              0,
              0,
              n._circleRadius,
              n._strokeDashOffset,
              n._strokeCircumference,
              n._circleStrokeWidth
            );
          }
        );
      }
      function ey(t) {
        return ea(
          2,
          [
            (t()(),
            Li(
              0,
              0,
              null,
              null,
              5,
              ":svg:svg",
              [
                ["focusable", "false"],
                ["preserveAspectRatio", "xMidYMid meet"],
              ],
              [
                [4, "width", "px"],
                [4, "height", "px"],
                [1, "viewBox", 0],
              ],
              null,
              null,
              null,
              null
            )),
            no(1, 16384, null, 0, Ds, [], { ngSwitch: [0, "ngSwitch"] }, null),
            (t()(), Fi(16777216, null, null, 1, null, Ym)),
            no(
              3,
              278528,
              null,
              0,
              js,
              [An, On, Ds],
              { ngSwitchCase: [0, "ngSwitchCase"] },
              null
            ),
            (t()(), Fi(16777216, null, null, 1, null, ty)),
            no(
              5,
              278528,
              null,
              0,
              js,
              [An, On, Ds],
              { ngSwitchCase: [0, "ngSwitchCase"] },
              null
            ),
          ],
          function (t, e) {
            t(e, 1, 0, "indeterminate" === e.component.mode),
              t(e, 3, 0, !0),
              t(e, 5, 0, !1);
          },
          function (t, e) {
            var n = e.component;
            t(e, 0, 0, n.diameter, n.diameter, n._viewBox);
          }
        );
      }
      function ny(t, e) {
        return new w(function (n) {
          var r = t.length;
          if (0 !== r)
            for (
              var o = new Array(r),
                i = 0,
                a = 0,
                s = function (s) {
                  var u = z(t[s]),
                    l = !1;
                  n.add(
                    u.subscribe({
                      next: function (t) {
                        l || ((l = !0), a++), (o[s] = t);
                      },
                      error: function (t) {
                        return n.error(t);
                      },
                      complete: function () {
                        (++i !== r && l) ||
                          (a === r &&
                            n.next(
                              e
                                ? e.reduce(function (t, e, n) {
                                    return (t[e] = o[n]), t;
                                  }, {})
                                : o
                            ),
                          n.complete());
                      },
                    })
                  );
                },
                u = 0;
              u < r;
              u++
            )
              s(u);
          else n.complete();
        });
      }
      var ry = new Et("NgValueAccessor"),
        oy = (function () {
          function t(t, e) {
            (this._renderer = t),
              (this._elementRef = e),
              (this.onChange = function (t) {}),
              (this.onTouched = function () {});
          }
          return (
            (t.prototype.writeValue = function (t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "checked",
                t
              );
            }),
            (t.prototype.registerOnChange = function (t) {
              this.onChange = t;
            }),
            (t.prototype.registerOnTouched = function (t) {
              this.onTouched = t;
            }),
            (t.prototype.setDisabledState = function (t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "disabled",
                t
              );
            }),
            t
          );
        })(),
        iy = new Et("CompositionEventMode"),
        ay = (function () {
          function t(t, e, n) {
            var r;
            (this._renderer = t),
              (this._elementRef = e),
              (this._compositionMode = n),
              (this.onChange = function (t) {}),
              (this.onTouched = function () {}),
              (this._composing = !1),
              null == this._compositionMode &&
                (this._compositionMode =
                  ((r = Fu() ? Fu().getUserAgent() : ""),
                  !/android (\d+)/.test(r.toLowerCase())));
          }
          return (
            (t.prototype.writeValue = function (t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "value",
                null == t ? "" : t
              );
            }),
            (t.prototype.registerOnChange = function (t) {
              this.onChange = t;
            }),
            (t.prototype.registerOnTouched = function (t) {
              this.onTouched = t;
            }),
            (t.prototype.setDisabledState = function (t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "disabled",
                t
              );
            }),
            (t.prototype._handleInput = function (t) {
              (!this._compositionMode ||
                (this._compositionMode && !this._composing)) &&
                this.onChange(t);
            }),
            (t.prototype._compositionStart = function () {
              this._composing = !0;
            }),
            (t.prototype._compositionEnd = function (t) {
              (this._composing = !1), this._compositionMode && this.onChange(t);
            }),
            t
          );
        })(),
        sy = (function () {
          function t() {}
          return (
            Object.defineProperty(t.prototype, "value", {
              get: function () {
                return this.control ? this.control.value : null;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "valid", {
              get: function () {
                return this.control ? this.control.valid : null;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "invalid", {
              get: function () {
                return this.control ? this.control.invalid : null;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "pending", {
              get: function () {
                return this.control ? this.control.pending : null;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "disabled", {
              get: function () {
                return this.control ? this.control.disabled : null;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "enabled", {
              get: function () {
                return this.control ? this.control.enabled : null;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "errors", {
              get: function () {
                return this.control ? this.control.errors : null;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "pristine", {
              get: function () {
                return this.control ? this.control.pristine : null;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "dirty", {
              get: function () {
                return this.control ? this.control.dirty : null;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "touched", {
              get: function () {
                return this.control ? this.control.touched : null;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "status", {
              get: function () {
                return this.control ? this.control.status : null;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "untouched", {
              get: function () {
                return this.control ? this.control.untouched : null;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "statusChanges", {
              get: function () {
                return this.control ? this.control.statusChanges : null;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "valueChanges", {
              get: function () {
                return this.control ? this.control.valueChanges : null;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "path", {
              get: function () {
                return null;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.reset = function (t) {
              void 0 === t && (t = void 0),
                this.control && this.control.reset(t);
            }),
            (t.prototype.hasError = function (t, e) {
              return !!this.control && this.control.hasError(t, e);
            }),
            (t.prototype.getError = function (t, e) {
              return this.control ? this.control.getError(t, e) : null;
            }),
            t
          );
        })(),
        uy = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            Object(r.b)(e, t),
            Object.defineProperty(e.prototype, "formDirective", {
              get: function () {
                return null;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "path", {
              get: function () {
                return null;
              },
              enumerable: !0,
              configurable: !0,
            }),
            e
          );
        })(sy);
      function ly() {
        throw new Error("unimplemented");
      }
      var cy = (function (t) {
          function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            return (
              (e._parent = null),
              (e.name = null),
              (e.valueAccessor = null),
              (e._rawValidators = []),
              (e._rawAsyncValidators = []),
              e
            );
          }
          return (
            Object(r.b)(e, t),
            Object.defineProperty(e.prototype, "validator", {
              get: function () {
                return ly();
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "asyncValidator", {
              get: function () {
                return ly();
              },
              enumerable: !0,
              configurable: !0,
            }),
            e
          );
        })(sy),
        hy = (function () {
          function t(t) {
            this._cd = t;
          }
          return (
            Object.defineProperty(t.prototype, "ngClassUntouched", {
              get: function () {
                return !!this._cd.control && this._cd.control.untouched;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "ngClassTouched", {
              get: function () {
                return !!this._cd.control && this._cd.control.touched;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "ngClassPristine", {
              get: function () {
                return !!this._cd.control && this._cd.control.pristine;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "ngClassDirty", {
              get: function () {
                return !!this._cd.control && this._cd.control.dirty;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "ngClassValid", {
              get: function () {
                return !!this._cd.control && this._cd.control.valid;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "ngClassInvalid", {
              get: function () {
                return !!this._cd.control && this._cd.control.invalid;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "ngClassPending", {
              get: function () {
                return !!this._cd.control && this._cd.control.pending;
              },
              enumerable: !0,
              configurable: !0,
            }),
            t
          );
        })(),
        py = (function (t) {
          function e(e) {
            return t.call(this, e) || this;
          }
          return Object(r.b)(e, t), e;
        })(hy),
        fy = (function (t) {
          function e(e) {
            return t.call(this, e) || this;
          }
          return Object(r.b)(e, t), e;
        })(hy);
      function dy(t) {
        return null == t || 0 === t.length;
      }
      var my =
          /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        yy = (function () {
          function t() {}
          return (
            (t.min = function (t) {
              return function (e) {
                if (dy(e.value) || dy(t)) return null;
                var n = parseFloat(e.value);
                return !isNaN(n) && n < t
                  ? { min: { min: t, actual: e.value } }
                  : null;
              };
            }),
            (t.max = function (t) {
              return function (e) {
                if (dy(e.value) || dy(t)) return null;
                var n = parseFloat(e.value);
                return !isNaN(n) && n > t
                  ? { max: { max: t, actual: e.value } }
                  : null;
              };
            }),
            (t.required = function (t) {
              return dy(t.value) ? { required: !0 } : null;
            }),
            (t.requiredTrue = function (t) {
              return !0 === t.value ? null : { required: !0 };
            }),
            (t.email = function (t) {
              return dy(t.value)
                ? null
                : my.test(t.value)
                ? null
                : { email: !0 };
            }),
            (t.minLength = function (t) {
              return function (e) {
                if (dy(e.value)) return null;
                var n = e.value ? e.value.length : 0;
                return n < t
                  ? { minlength: { requiredLength: t, actualLength: n } }
                  : null;
              };
            }),
            (t.maxLength = function (t) {
              return function (e) {
                var n = e.value ? e.value.length : 0;
                return n > t
                  ? { maxlength: { requiredLength: t, actualLength: n } }
                  : null;
              };
            }),
            (t.pattern = function (e) {
              return e
                ? ("string" == typeof e
                    ? ((r = ""),
                      "^" !== e.charAt(0) && (r += "^"),
                      (r += e),
                      "$" !== e.charAt(e.length - 1) && (r += "$"),
                      (n = new RegExp(r)))
                    : ((r = e.toString()), (n = e)),
                  function (t) {
                    if (dy(t.value)) return null;
                    var e = t.value;
                    return n.test(e)
                      ? null
                      : { pattern: { requiredPattern: r, actualValue: e } };
                  })
                : t.nullValidator;
              var n, r;
            }),
            (t.nullValidator = function (t) {
              return null;
            }),
            (t.compose = function (t) {
              if (!t) return null;
              var e = t.filter(gy);
              return 0 == e.length
                ? null
                : function (t) {
                    return by(
                      (function (t, e) {
                        return e.map(function (e) {
                          return e(t);
                        });
                      })(t, e)
                    );
                  };
            }),
            (t.composeAsync = function (t) {
              if (!t) return null;
              var e = t.filter(gy);
              return 0 == e.length
                ? null
                : function (t) {
                    return (function () {
                      for (var t = [], e = 0; e < arguments.length; e++)
                        t[e] = arguments[e];
                      if (1 === t.length) {
                        var n = t[0];
                        if (o(n)) return ny(n, null);
                        if (
                          i(n) &&
                          Object.getPrototypeOf(n) === Object.prototype
                        ) {
                          var r = Object.keys(n);
                          return ny(
                            r.map(function (t) {
                              return n[t];
                            }),
                            r
                          );
                        }
                      }
                      if ("function" == typeof t[t.length - 1]) {
                        var a = t.pop();
                        return ny(
                          (t = 1 === t.length && o(t[0]) ? t[0] : t),
                          null
                        ).pipe(
                          F(function (t) {
                            return a.apply(void 0, t);
                          })
                        );
                      }
                      return ny(t, null);
                    })(
                      (function (t, e) {
                        return e.map(function (e) {
                          return e(t);
                        });
                      })(t, e).map(vy)
                    ).pipe(F(by));
                  };
            }),
            t
          );
        })();
      function gy(t) {
        return null != t;
      }
      function vy(t) {
        var e = Ge(t) ? z(t) : t;
        if (!We(e))
          throw new Error(
            "Expected validator to return Promise or Observable."
          );
        return e;
      }
      function by(t) {
        var e = t.reduce(function (t, e) {
          return null != e ? Object(r.a)({}, t, e) : t;
        }, {});
        return 0 === Object.keys(e).length ? null : e;
      }
      function _y(t) {
        return t.validate
          ? function (e) {
              return t.validate(e);
            }
          : t;
      }
      function wy(t) {
        return t.validate
          ? function (e) {
              return t.validate(e);
            }
          : t;
      }
      var Cy = (function () {
          function t(t, e) {
            (this._renderer = t),
              (this._elementRef = e),
              (this.onChange = function (t) {}),
              (this.onTouched = function () {});
          }
          return (
            (t.prototype.writeValue = function (t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "value",
                null == t ? "" : t
              );
            }),
            (t.prototype.registerOnChange = function (t) {
              this.onChange = function (e) {
                t("" == e ? null : parseFloat(e));
              };
            }),
            (t.prototype.registerOnTouched = function (t) {
              this.onTouched = t;
            }),
            (t.prototype.setDisabledState = function (t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "disabled",
                t
              );
            }),
            t
          );
        })(),
        Ey = (function () {
          function t() {
            this._accessors = [];
          }
          return (
            (t.prototype.add = function (t, e) {
              this._accessors.push([t, e]);
            }),
            (t.prototype.remove = function (t) {
              for (var e = this._accessors.length - 1; e >= 0; --e)
                if (this._accessors[e][1] === t)
                  return void this._accessors.splice(e, 1);
            }),
            (t.prototype.select = function (t) {
              var e = this;
              this._accessors.forEach(function (n) {
                e._isSameGroup(n, t) && n[1] !== t && n[1].fireUncheck(t.value);
              });
            }),
            (t.prototype._isSameGroup = function (t, e) {
              return (
                !!t[0].control &&
                t[0]._parent === e._control._parent &&
                t[1].name === e.name
              );
            }),
            t
          );
        })(),
        Sy = (function () {
          function t(t, e, n, r) {
            (this._renderer = t),
              (this._elementRef = e),
              (this._registry = n),
              (this._injector = r),
              (this.onChange = function () {}),
              (this.onTouched = function () {});
          }
          return (
            (t.prototype.ngOnInit = function () {
              (this._control = this._injector.get(cy)),
                this._checkName(),
                this._registry.add(this._control, this);
            }),
            (t.prototype.ngOnDestroy = function () {
              this._registry.remove(this);
            }),
            (t.prototype.writeValue = function (t) {
              (this._state = t === this.value),
                this._renderer.setProperty(
                  this._elementRef.nativeElement,
                  "checked",
                  this._state
                );
            }),
            (t.prototype.registerOnChange = function (t) {
              var e = this;
              (this._fn = t),
                (this.onChange = function () {
                  t(e.value), e._registry.select(e);
                });
            }),
            (t.prototype.fireUncheck = function (t) {
              this.writeValue(t);
            }),
            (t.prototype.registerOnTouched = function (t) {
              this.onTouched = t;
            }),
            (t.prototype.setDisabledState = function (t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "disabled",
                t
              );
            }),
            (t.prototype._checkName = function () {
              this.name &&
                this.formControlName &&
                this.name !== this.formControlName &&
                this._throwNameError(),
                !this.name &&
                  this.formControlName &&
                  (this.name = this.formControlName);
            }),
            (t.prototype._throwNameError = function () {
              throw new Error(
                '\n      If you define both a name and a formControlName attribute on your radio button, their values\n      must match. Ex: <input type="radio" formControlName="food" name="food">\n    '
              );
            }),
            t
          );
        })(),
        ky = (function () {
          function t(t, e) {
            (this._renderer = t),
              (this._elementRef = e),
              (this.onChange = function (t) {}),
              (this.onTouched = function () {});
          }
          return (
            (t.prototype.writeValue = function (t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "value",
                parseFloat(t)
              );
            }),
            (t.prototype.registerOnChange = function (t) {
              this.onChange = function (e) {
                t("" == e ? null : parseFloat(e));
              };
            }),
            (t.prototype.registerOnTouched = function (t) {
              this.onTouched = t;
            }),
            (t.prototype.setDisabledState = function (t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "disabled",
                t
              );
            }),
            t
          );
        })(),
        Ty =
          '\n    <div [formGroup]="myGroup">\n      <input formControlName="firstName">\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       firstName: new FormControl()\n    });',
        xy =
          '\n    <div [formGroup]="myGroup">\n       <div formGroupName="person">\n          <input formControlName="firstName">\n       </div>\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       person: new FormGroup({ firstName: new FormControl() })\n    });',
        Oy = (function () {
          function t() {}
          return (
            (t.controlParentException = function () {
              throw new Error(
                "formControlName must be used with a parent formGroup directive.  You'll want to add a formGroup\n       directive and pass it an existing FormGroup instance (you can create one in your class).\n\n      Example:\n\n      " +
                  Ty
              );
            }),
            (t.ngModelGroupException = function () {
              throw new Error(
                'formControlName cannot be used with an ngModelGroup parent. It is only compatible with parents\n       that also have a "form" prefix: formGroupName, formArrayName, or formGroup.\n\n       Option 1:  Update the parent to be formGroupName (reactive form strategy)\n\n        ' +
                  xy +
                  '\n\n        Option 2: Use ngModel instead of formControlName (template-driven strategy)\n\n        \n    <form>\n       <div ngModelGroup="person">\n          <input [(ngModel)]="person.name" name="firstName">\n       </div>\n    </form>'
              );
            }),
            (t.missingFormException = function () {
              throw new Error(
                "formGroup expects a FormGroup instance. Please pass one in.\n\n       Example:\n\n       " +
                  Ty
              );
            }),
            (t.groupParentException = function () {
              throw new Error(
                "formGroupName must be used with a parent formGroup directive.  You'll want to add a formGroup\n      directive and pass it an existing FormGroup instance (you can create one in your class).\n\n      Example:\n\n      " +
                  xy
              );
            }),
            (t.arrayParentException = function () {
              throw new Error(
                'formArrayName must be used with a parent formGroup directive.  You\'ll want to add a formGroup\n       directive and pass it an existing FormGroup instance (you can create one in your class).\n\n        Example:\n\n        \n    <div [formGroup]="myGroup">\n      <div formArrayName="cities">\n        <div *ngFor="let city of cityArray.controls; index as i">\n          <input [formControlName]="i">\n        </div>\n      </div>\n    </div>\n\n    In your class:\n\n    this.cityArray = new FormArray([new FormControl(\'SF\')]);\n    this.myGroup = new FormGroup({\n      cities: this.cityArray\n    });'
              );
            }),
            (t.disabledAttrWarning = function () {
              console.warn(
                "\n      It looks like you're using the disabled attribute with a reactive form directive. If you set disabled to true\n      when you set up this control in your component class, the disabled attribute will actually be set in the DOM for\n      you. We recommend using this approach to avoid 'changed after checked' errors.\n       \n      Example: \n      form = new FormGroup({\n        first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),\n        last: new FormControl('Drew', Validators.required)\n      });\n    "
              );
            }),
            (t.ngModelWarning = function (t) {
              console.warn(
                "\n    It looks like you're using ngModel on the same form field as " +
                  t +
                  ". \n    Support for using the ngModel input property and ngModelChange event with \n    reactive form directives has been deprecated in Angular v6 and will be removed \n    in Angular v7.\n    \n    For more information on this, see our API docs here:\n    https://angular.io/api/forms/" +
                  ("formControl" === t
                    ? "FormControlDirective"
                    : "FormControlName") +
                  "#use-with-ngmodel\n    "
              );
            }),
            t
          );
        })();
      function Py(t, e) {
        return Object(r.d)(e.path, [t]);
      }
      function Ay(t, e) {
        t || Dy(e, "Cannot find control with"),
          e.valueAccessor || Dy(e, "No value accessor for form control with"),
          (t.validator = yy.compose([t.validator, e.validator])),
          (t.asyncValidator = yy.composeAsync([
            t.asyncValidator,
            e.asyncValidator,
          ])),
          e.valueAccessor.writeValue(t.value),
          (function (t, e) {
            e.valueAccessor.registerOnChange(function (n) {
              (t._pendingValue = n),
                (t._pendingChange = !0),
                (t._pendingDirty = !0),
                "change" === t.updateOn && Iy(t, e);
            });
          })(t, e),
          (function (t, e) {
            t.registerOnChange(function (t, n) {
              e.valueAccessor.writeValue(t), n && e.viewToModelUpdate(t);
            });
          })(t, e),
          (function (t, e) {
            e.valueAccessor.registerOnTouched(function () {
              (t._pendingTouched = !0),
                "blur" === t.updateOn && t._pendingChange && Iy(t, e),
                "submit" !== t.updateOn && t.markAsTouched();
            });
          })(t, e),
          e.valueAccessor.setDisabledState &&
            t.registerOnDisabledChange(function (t) {
              e.valueAccessor.setDisabledState(t);
            }),
          e._rawValidators.forEach(function (e) {
            e.registerOnValidatorChange &&
              e.registerOnValidatorChange(function () {
                return t.updateValueAndValidity();
              });
          }),
          e._rawAsyncValidators.forEach(function (e) {
            e.registerOnValidatorChange &&
              e.registerOnValidatorChange(function () {
                return t.updateValueAndValidity();
              });
          });
      }
      function Iy(t, e) {
        t._pendingDirty && t.markAsDirty(),
          t.setValue(t._pendingValue, { emitModelToViewChange: !1 }),
          e.viewToModelUpdate(t._pendingValue),
          (t._pendingChange = !1);
      }
      function Ny(t, e) {
        null == t && Dy(e, "Cannot find control with"),
          (t.validator = yy.compose([t.validator, e.validator])),
          (t.asyncValidator = yy.composeAsync([
            t.asyncValidator,
            e.asyncValidator,
          ]));
      }
      function Ry(t) {
        return Dy(
          t,
          "There is no FormControl instance attached to form control element with"
        );
      }
      function Dy(t, e) {
        var n;
        throw (
          ((n =
            t.path.length > 1
              ? "path: '" + t.path.join(" -> ") + "'"
              : t.path[0]
              ? "name: '" + t.path + "'"
              : "unspecified name attribute"),
          new Error(e + " " + n))
        );
      }
      function jy(t) {
        return null != t ? yy.compose(t.map(_y)) : null;
      }
      function My(t) {
        return null != t ? yy.composeAsync(t.map(wy)) : null;
      }
      var Vy = [
        oy,
        ky,
        Cy,
        (function () {
          function t(t, e) {
            (this._renderer = t),
              (this._elementRef = e),
              (this._optionMap = new Map()),
              (this._idCounter = 0),
              (this.onChange = function (t) {}),
              (this.onTouched = function () {}),
              (this._compareWith = Ue);
          }
          return (
            Object.defineProperty(t.prototype, "compareWith", {
              set: function (t) {
                if ("function" != typeof t)
                  throw new Error(
                    "compareWith must be a function, but received " +
                      JSON.stringify(t)
                  );
                this._compareWith = t;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.writeValue = function (t) {
              this.value = t;
              var e = this._getOptionId(t);
              null == e &&
                this._renderer.setProperty(
                  this._elementRef.nativeElement,
                  "selectedIndex",
                  -1
                );
              var n = (function (t, e) {
                return null == t
                  ? "" + e
                  : (e && "object" == typeof e && (e = "Object"),
                    (t + ": " + e).slice(0, 50));
              })(e, t);
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "value",
                n
              );
            }),
            (t.prototype.registerOnChange = function (t) {
              var e = this;
              this.onChange = function (n) {
                (e.value = e._getOptionValue(n)), t(e.value);
              };
            }),
            (t.prototype.registerOnTouched = function (t) {
              this.onTouched = t;
            }),
            (t.prototype.setDisabledState = function (t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "disabled",
                t
              );
            }),
            (t.prototype._registerOption = function () {
              return (this._idCounter++).toString();
            }),
            (t.prototype._getOptionId = function (t) {
              var e, n;
              try {
                for (
                  var o = Object(r.e)(Array.from(this._optionMap.keys())),
                    i = o.next();
                  !i.done;
                  i = o.next()
                ) {
                  var a = i.value;
                  if (this._compareWith(this._optionMap.get(a), t)) return a;
                }
              } catch (s) {
                e = { error: s };
              } finally {
                try {
                  i && !i.done && (n = o.return) && n.call(o);
                } finally {
                  if (e) throw e.error;
                }
              }
              return null;
            }),
            (t.prototype._getOptionValue = function (t) {
              var e = (function (t) {
                return t.split(":")[0];
              })(t);
              return this._optionMap.has(e) ? this._optionMap.get(e) : t;
            }),
            t
          );
        })(),
        (function () {
          function t(t, e) {
            (this._renderer = t),
              (this._elementRef = e),
              (this._optionMap = new Map()),
              (this._idCounter = 0),
              (this.onChange = function (t) {}),
              (this.onTouched = function () {}),
              (this._compareWith = Ue);
          }
          return (
            Object.defineProperty(t.prototype, "compareWith", {
              set: function (t) {
                if ("function" != typeof t)
                  throw new Error(
                    "compareWith must be a function, but received " +
                      JSON.stringify(t)
                  );
                this._compareWith = t;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.writeValue = function (t) {
              var e,
                n = this;
              if (((this.value = t), Array.isArray(t))) {
                var r = t.map(function (t) {
                  return n._getOptionId(t);
                });
                e = function (t, e) {
                  t._setSelected(r.indexOf(e.toString()) > -1);
                };
              } else
                e = function (t, e) {
                  t._setSelected(!1);
                };
              this._optionMap.forEach(e);
            }),
            (t.prototype.registerOnChange = function (t) {
              var e = this;
              this.onChange = function (n) {
                var r = [];
                if (n.hasOwnProperty("selectedOptions"))
                  for (var o = n.selectedOptions, i = 0; i < o.length; i++) {
                    var a = o.item(i),
                      s = e._getOptionValue(a.value);
                    r.push(s);
                  }
                else
                  for (o = n.options, i = 0; i < o.length; i++)
                    (a = o.item(i)).selected &&
                      ((s = e._getOptionValue(a.value)), r.push(s));
                (e.value = r), t(r);
              };
            }),
            (t.prototype.registerOnTouched = function (t) {
              this.onTouched = t;
            }),
            (t.prototype.setDisabledState = function (t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "disabled",
                t
              );
            }),
            (t.prototype._registerOption = function (t) {
              var e = (this._idCounter++).toString();
              return this._optionMap.set(e, t), e;
            }),
            (t.prototype._getOptionId = function (t) {
              var e, n;
              try {
                for (
                  var o = Object(r.e)(Array.from(this._optionMap.keys())),
                    i = o.next();
                  !i.done;
                  i = o.next()
                ) {
                  var a = i.value;
                  if (this._compareWith(this._optionMap.get(a)._value, t))
                    return a;
                }
              } catch (s) {
                e = { error: s };
              } finally {
                try {
                  i && !i.done && (n = o.return) && n.call(o);
                } finally {
                  if (e) throw e.error;
                }
              }
              return null;
            }),
            (t.prototype._getOptionValue = function (t) {
              var e = (function (t) {
                return t.split(":")[0];
              })(t);
              return this._optionMap.has(e) ? this._optionMap.get(e)._value : t;
            }),
            t
          );
        })(),
        Sy,
      ];
      function Fy(t) {
        var e = Uy(t) ? t.validators : t;
        return Array.isArray(e) ? jy(e) : e || null;
      }
      function Ly(t, e) {
        var n = Uy(e) ? e.asyncValidators : t;
        return Array.isArray(n) ? My(n) : n || null;
      }
      function Uy(t) {
        return null != t && !Array.isArray(t) && "object" == typeof t;
      }
      var Hy = (function () {
          function t(t, e) {
            (this.validator = t),
              (this.asyncValidator = e),
              (this._onCollectionChange = function () {}),
              (this.pristine = !0),
              (this.touched = !1),
              (this._onDisabledChange = []);
          }
          return (
            Object.defineProperty(t.prototype, "parent", {
              get: function () {
                return this._parent;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "valid", {
              get: function () {
                return "VALID" === this.status;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "invalid", {
              get: function () {
                return "INVALID" === this.status;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "pending", {
              get: function () {
                return "PENDING" == this.status;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "disabled", {
              get: function () {
                return "DISABLED" === this.status;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "enabled", {
              get: function () {
                return "DISABLED" !== this.status;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "dirty", {
              get: function () {
                return !this.pristine;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "untouched", {
              get: function () {
                return !this.touched;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "updateOn", {
              get: function () {
                return this._updateOn
                  ? this._updateOn
                  : this.parent
                  ? this.parent.updateOn
                  : "change";
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.setValidators = function (t) {
              this.validator = Fy(t);
            }),
            (t.prototype.setAsyncValidators = function (t) {
              this.asyncValidator = Ly(t);
            }),
            (t.prototype.clearValidators = function () {
              this.validator = null;
            }),
            (t.prototype.clearAsyncValidators = function () {
              this.asyncValidator = null;
            }),
            (t.prototype.markAsTouched = function (t) {
              void 0 === t && (t = {}),
                (this.touched = !0),
                this._parent && !t.onlySelf && this._parent.markAsTouched(t);
            }),
            (t.prototype.markAllAsTouched = function () {
              this.markAsTouched({ onlySelf: !0 }),
                this._forEachChild(function (t) {
                  return t.markAllAsTouched();
                });
            }),
            (t.prototype.markAsUntouched = function (t) {
              void 0 === t && (t = {}),
                (this.touched = !1),
                (this._pendingTouched = !1),
                this._forEachChild(function (t) {
                  t.markAsUntouched({ onlySelf: !0 });
                }),
                this._parent && !t.onlySelf && this._parent._updateTouched(t);
            }),
            (t.prototype.markAsDirty = function (t) {
              void 0 === t && (t = {}),
                (this.pristine = !1),
                this._parent && !t.onlySelf && this._parent.markAsDirty(t);
            }),
            (t.prototype.markAsPristine = function (t) {
              void 0 === t && (t = {}),
                (this.pristine = !0),
                (this._pendingDirty = !1),
                this._forEachChild(function (t) {
                  t.markAsPristine({ onlySelf: !0 });
                }),
                this._parent && !t.onlySelf && this._parent._updatePristine(t);
            }),
            (t.prototype.markAsPending = function (t) {
              void 0 === t && (t = {}),
                (this.status = "PENDING"),
                !1 !== t.emitEvent && this.statusChanges.emit(this.status),
                this._parent && !t.onlySelf && this._parent.markAsPending(t);
            }),
            (t.prototype.disable = function (t) {
              void 0 === t && (t = {});
              var e = this._parentMarkedDirty(t.onlySelf);
              (this.status = "DISABLED"),
                (this.errors = null),
                this._forEachChild(function (e) {
                  e.disable(Object(r.a)({}, t, { onlySelf: !0 }));
                }),
                this._updateValue(),
                !1 !== t.emitEvent &&
                  (this.valueChanges.emit(this.value),
                  this.statusChanges.emit(this.status)),
                this._updateAncestors(
                  Object(r.a)({}, t, { skipPristineCheck: e })
                ),
                this._onDisabledChange.forEach(function (t) {
                  return t(!0);
                });
            }),
            (t.prototype.enable = function (t) {
              void 0 === t && (t = {});
              var e = this._parentMarkedDirty(t.onlySelf);
              (this.status = "VALID"),
                this._forEachChild(function (e) {
                  e.enable(Object(r.a)({}, t, { onlySelf: !0 }));
                }),
                this.updateValueAndValidity({
                  onlySelf: !0,
                  emitEvent: t.emitEvent,
                }),
                this._updateAncestors(
                  Object(r.a)({}, t, { skipPristineCheck: e })
                ),
                this._onDisabledChange.forEach(function (t) {
                  return t(!1);
                });
            }),
            (t.prototype._updateAncestors = function (t) {
              this._parent &&
                !t.onlySelf &&
                (this._parent.updateValueAndValidity(t),
                t.skipPristineCheck || this._parent._updatePristine(),
                this._parent._updateTouched());
            }),
            (t.prototype.setParent = function (t) {
              this._parent = t;
            }),
            (t.prototype.updateValueAndValidity = function (t) {
              void 0 === t && (t = {}),
                this._setInitialStatus(),
                this._updateValue(),
                this.enabled &&
                  (this._cancelExistingSubscription(),
                  (this.errors = this._runValidator()),
                  (this.status = this._calculateStatus()),
                  ("VALID" !== this.status && "PENDING" !== this.status) ||
                    this._runAsyncValidator(t.emitEvent)),
                !1 !== t.emitEvent &&
                  (this.valueChanges.emit(this.value),
                  this.statusChanges.emit(this.status)),
                this._parent &&
                  !t.onlySelf &&
                  this._parent.updateValueAndValidity(t);
            }),
            (t.prototype._updateTreeValidity = function (t) {
              void 0 === t && (t = { emitEvent: !0 }),
                this._forEachChild(function (e) {
                  return e._updateTreeValidity(t);
                }),
                this.updateValueAndValidity({
                  onlySelf: !0,
                  emitEvent: t.emitEvent,
                });
            }),
            (t.prototype._setInitialStatus = function () {
              this.status = this._allControlsDisabled() ? "DISABLED" : "VALID";
            }),
            (t.prototype._runValidator = function () {
              return this.validator ? this.validator(this) : null;
            }),
            (t.prototype._runAsyncValidator = function (t) {
              var e = this;
              if (this.asyncValidator) {
                this.status = "PENDING";
                var n = vy(this.asyncValidator(this));
                this._asyncValidationSubscription = n.subscribe(function (n) {
                  return e.setErrors(n, { emitEvent: t });
                });
              }
            }),
            (t.prototype._cancelExistingSubscription = function () {
              this._asyncValidationSubscription &&
                this._asyncValidationSubscription.unsubscribe();
            }),
            (t.prototype.setErrors = function (t, e) {
              void 0 === e && (e = {}),
                (this.errors = t),
                this._updateControlsErrors(!1 !== e.emitEvent);
            }),
            (t.prototype.get = function (t) {
              return (function (t, e, n) {
                return null == e
                  ? null
                  : (e instanceof Array || (e = e.split(".")),
                    e instanceof Array && 0 === e.length
                      ? null
                      : e.reduce(function (t, e) {
                          return t instanceof By
                            ? t.controls.hasOwnProperty(e)
                              ? t.controls[e]
                              : null
                            : (t instanceof qy && t.at(e)) || null;
                        }, t));
              })(this, t);
            }),
            (t.prototype.getError = function (t, e) {
              var n = e ? this.get(e) : this;
              return n && n.errors ? n.errors[t] : null;
            }),
            (t.prototype.hasError = function (t, e) {
              return !!this.getError(t, e);
            }),
            Object.defineProperty(t.prototype, "root", {
              get: function () {
                for (var t = this; t._parent; ) t = t._parent;
                return t;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype._updateControlsErrors = function (t) {
              (this.status = this._calculateStatus()),
                t && this.statusChanges.emit(this.status),
                this._parent && this._parent._updateControlsErrors(t);
            }),
            (t.prototype._initObservables = function () {
              (this.valueChanges = new To()), (this.statusChanges = new To());
            }),
            (t.prototype._calculateStatus = function () {
              return this._allControlsDisabled()
                ? "DISABLED"
                : this.errors
                ? "INVALID"
                : this._anyControlsHaveStatus("PENDING")
                ? "PENDING"
                : this._anyControlsHaveStatus("INVALID")
                ? "INVALID"
                : "VALID";
            }),
            (t.prototype._anyControlsHaveStatus = function (t) {
              return this._anyControls(function (e) {
                return e.status === t;
              });
            }),
            (t.prototype._anyControlsDirty = function () {
              return this._anyControls(function (t) {
                return t.dirty;
              });
            }),
            (t.prototype._anyControlsTouched = function () {
              return this._anyControls(function (t) {
                return t.touched;
              });
            }),
            (t.prototype._updatePristine = function (t) {
              void 0 === t && (t = {}),
                (this.pristine = !this._anyControlsDirty()),
                this._parent && !t.onlySelf && this._parent._updatePristine(t);
            }),
            (t.prototype._updateTouched = function (t) {
              void 0 === t && (t = {}),
                (this.touched = this._anyControlsTouched()),
                this._parent && !t.onlySelf && this._parent._updateTouched(t);
            }),
            (t.prototype._isBoxedValue = function (t) {
              return (
                "object" == typeof t &&
                null !== t &&
                2 === Object.keys(t).length &&
                "value" in t &&
                "disabled" in t
              );
            }),
            (t.prototype._registerOnCollectionChange = function (t) {
              this._onCollectionChange = t;
            }),
            (t.prototype._setUpdateStrategy = function (t) {
              Uy(t) && null != t.updateOn && (this._updateOn = t.updateOn);
            }),
            (t.prototype._parentMarkedDirty = function (t) {
              return (
                !t &&
                this._parent &&
                this._parent.dirty &&
                !this._parent._anyControlsDirty()
              );
            }),
            t
          );
        })(),
        zy = (function (t) {
          function e(e, n, r) {
            void 0 === e && (e = null);
            var o = t.call(this, Fy(n), Ly(r, n)) || this;
            return (
              (o._onChange = []),
              o._applyFormState(e),
              o._setUpdateStrategy(n),
              o.updateValueAndValidity({ onlySelf: !0, emitEvent: !1 }),
              o._initObservables(),
              o
            );
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.setValue = function (t, e) {
              var n = this;
              void 0 === e && (e = {}),
                (this.value = this._pendingValue = t),
                this._onChange.length &&
                  !1 !== e.emitModelToViewChange &&
                  this._onChange.forEach(function (t) {
                    return t(n.value, !1 !== e.emitViewToModelChange);
                  }),
                this.updateValueAndValidity(e);
            }),
            (e.prototype.patchValue = function (t, e) {
              void 0 === e && (e = {}), this.setValue(t, e);
            }),
            (e.prototype.reset = function (t, e) {
              void 0 === t && (t = null),
                void 0 === e && (e = {}),
                this._applyFormState(t),
                this.markAsPristine(e),
                this.markAsUntouched(e),
                this.setValue(this.value, e),
                (this._pendingChange = !1);
            }),
            (e.prototype._updateValue = function () {}),
            (e.prototype._anyControls = function (t) {
              return !1;
            }),
            (e.prototype._allControlsDisabled = function () {
              return this.disabled;
            }),
            (e.prototype.registerOnChange = function (t) {
              this._onChange.push(t);
            }),
            (e.prototype._clearChangeFns = function () {
              (this._onChange = []),
                (this._onDisabledChange = []),
                (this._onCollectionChange = function () {});
            }),
            (e.prototype.registerOnDisabledChange = function (t) {
              this._onDisabledChange.push(t);
            }),
            (e.prototype._forEachChild = function (t) {}),
            (e.prototype._syncPendingControls = function () {
              return !(
                "submit" !== this.updateOn ||
                (this._pendingDirty && this.markAsDirty(),
                this._pendingTouched && this.markAsTouched(),
                !this._pendingChange) ||
                (this.setValue(this._pendingValue, {
                  onlySelf: !0,
                  emitModelToViewChange: !1,
                }),
                0)
              );
            }),
            (e.prototype._applyFormState = function (t) {
              this._isBoxedValue(t)
                ? ((this.value = this._pendingValue = t.value),
                  t.disabled
                    ? this.disable({ onlySelf: !0, emitEvent: !1 })
                    : this.enable({ onlySelf: !0, emitEvent: !1 }))
                : (this.value = this._pendingValue = t);
            }),
            e
          );
        })(Hy),
        By = (function (t) {
          function e(e, n, r) {
            var o = t.call(this, Fy(n), Ly(r, n)) || this;
            return (
              (o.controls = e),
              o._initObservables(),
              o._setUpdateStrategy(n),
              o._setUpControls(),
              o.updateValueAndValidity({ onlySelf: !0, emitEvent: !1 }),
              o
            );
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.registerControl = function (t, e) {
              return this.controls[t]
                ? this.controls[t]
                : ((this.controls[t] = e),
                  e.setParent(this),
                  e._registerOnCollectionChange(this._onCollectionChange),
                  e);
            }),
            (e.prototype.addControl = function (t, e) {
              this.registerControl(t, e),
                this.updateValueAndValidity(),
                this._onCollectionChange();
            }),
            (e.prototype.removeControl = function (t) {
              this.controls[t] &&
                this.controls[t]._registerOnCollectionChange(function () {}),
                delete this.controls[t],
                this.updateValueAndValidity(),
                this._onCollectionChange();
            }),
            (e.prototype.setControl = function (t, e) {
              this.controls[t] &&
                this.controls[t]._registerOnCollectionChange(function () {}),
                delete this.controls[t],
                e && this.registerControl(t, e),
                this.updateValueAndValidity(),
                this._onCollectionChange();
            }),
            (e.prototype.contains = function (t) {
              return (
                this.controls.hasOwnProperty(t) && this.controls[t].enabled
              );
            }),
            (e.prototype.setValue = function (t, e) {
              var n = this;
              void 0 === e && (e = {}),
                this._checkAllValuesPresent(t),
                Object.keys(t).forEach(function (r) {
                  n._throwIfControlMissing(r),
                    n.controls[r].setValue(t[r], {
                      onlySelf: !0,
                      emitEvent: e.emitEvent,
                    });
                }),
                this.updateValueAndValidity(e);
            }),
            (e.prototype.patchValue = function (t, e) {
              var n = this;
              void 0 === e && (e = {}),
                Object.keys(t).forEach(function (r) {
                  n.controls[r] &&
                    n.controls[r].patchValue(t[r], {
                      onlySelf: !0,
                      emitEvent: e.emitEvent,
                    });
                }),
                this.updateValueAndValidity(e);
            }),
            (e.prototype.reset = function (t, e) {
              void 0 === t && (t = {}),
                void 0 === e && (e = {}),
                this._forEachChild(function (n, r) {
                  n.reset(t[r], { onlySelf: !0, emitEvent: e.emitEvent });
                }),
                this._updatePristine(e),
                this._updateTouched(e),
                this.updateValueAndValidity(e);
            }),
            (e.prototype.getRawValue = function () {
              return this._reduceChildren({}, function (t, e, n) {
                return (t[n] = e instanceof zy ? e.value : e.getRawValue()), t;
              });
            }),
            (e.prototype._syncPendingControls = function () {
              var t = this._reduceChildren(!1, function (t, e) {
                return !!e._syncPendingControls() || t;
              });
              return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
            }),
            (e.prototype._throwIfControlMissing = function (t) {
              if (!Object.keys(this.controls).length)
                throw new Error(
                  "\n        There are no form controls registered with this group yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      "
                );
              if (!this.controls[t])
                throw new Error(
                  "Cannot find form control with name: " + t + "."
                );
            }),
            (e.prototype._forEachChild = function (t) {
              var e = this;
              Object.keys(this.controls).forEach(function (n) {
                return t(e.controls[n], n);
              });
            }),
            (e.prototype._setUpControls = function () {
              var t = this;
              this._forEachChild(function (e) {
                e.setParent(t),
                  e._registerOnCollectionChange(t._onCollectionChange);
              });
            }),
            (e.prototype._updateValue = function () {
              this.value = this._reduceValue();
            }),
            (e.prototype._anyControls = function (t) {
              var e = this,
                n = !1;
              return (
                this._forEachChild(function (r, o) {
                  n = n || (e.contains(o) && t(r));
                }),
                n
              );
            }),
            (e.prototype._reduceValue = function () {
              var t = this;
              return this._reduceChildren({}, function (e, n, r) {
                return (n.enabled || t.disabled) && (e[r] = n.value), e;
              });
            }),
            (e.prototype._reduceChildren = function (t, e) {
              var n = t;
              return (
                this._forEachChild(function (t, r) {
                  n = e(n, t, r);
                }),
                n
              );
            }),
            (e.prototype._allControlsDisabled = function () {
              var t, e;
              try {
                for (
                  var n = Object(r.e)(Object.keys(this.controls)), o = n.next();
                  !o.done;
                  o = n.next()
                )
                  if (this.controls[o.value].enabled) return !1;
              } catch (i) {
                t = { error: i };
              } finally {
                try {
                  o && !o.done && (e = n.return) && e.call(n);
                } finally {
                  if (t) throw t.error;
                }
              }
              return Object.keys(this.controls).length > 0 || this.disabled;
            }),
            (e.prototype._checkAllValuesPresent = function (t) {
              this._forEachChild(function (e, n) {
                if (void 0 === t[n])
                  throw new Error(
                    "Must supply a value for form control with name: '" +
                      n +
                      "'."
                  );
              });
            }),
            e
          );
        })(Hy),
        qy = (function (t) {
          function e(e, n, r) {
            var o = t.call(this, Fy(n), Ly(r, n)) || this;
            return (
              (o.controls = e),
              o._initObservables(),
              o._setUpdateStrategy(n),
              o._setUpControls(),
              o.updateValueAndValidity({ onlySelf: !0, emitEvent: !1 }),
              o
            );
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.at = function (t) {
              return this.controls[t];
            }),
            (e.prototype.push = function (t) {
              this.controls.push(t),
                this._registerControl(t),
                this.updateValueAndValidity(),
                this._onCollectionChange();
            }),
            (e.prototype.insert = function (t, e) {
              this.controls.splice(t, 0, e),
                this._registerControl(e),
                this.updateValueAndValidity();
            }),
            (e.prototype.removeAt = function (t) {
              this.controls[t] &&
                this.controls[t]._registerOnCollectionChange(function () {}),
                this.controls.splice(t, 1),
                this.updateValueAndValidity();
            }),
            (e.prototype.setControl = function (t, e) {
              this.controls[t] &&
                this.controls[t]._registerOnCollectionChange(function () {}),
                this.controls.splice(t, 1),
                e && (this.controls.splice(t, 0, e), this._registerControl(e)),
                this.updateValueAndValidity(),
                this._onCollectionChange();
            }),
            Object.defineProperty(e.prototype, "length", {
              get: function () {
                return this.controls.length;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (e.prototype.setValue = function (t, e) {
              var n = this;
              void 0 === e && (e = {}),
                this._checkAllValuesPresent(t),
                t.forEach(function (t, r) {
                  n._throwIfControlMissing(r),
                    n
                      .at(r)
                      .setValue(t, { onlySelf: !0, emitEvent: e.emitEvent });
                }),
                this.updateValueAndValidity(e);
            }),
            (e.prototype.patchValue = function (t, e) {
              var n = this;
              void 0 === e && (e = {}),
                t.forEach(function (t, r) {
                  n.at(r) &&
                    n
                      .at(r)
                      .patchValue(t, { onlySelf: !0, emitEvent: e.emitEvent });
                }),
                this.updateValueAndValidity(e);
            }),
            (e.prototype.reset = function (t, e) {
              void 0 === t && (t = []),
                void 0 === e && (e = {}),
                this._forEachChild(function (n, r) {
                  n.reset(t[r], { onlySelf: !0, emitEvent: e.emitEvent });
                }),
                this._updatePristine(e),
                this._updateTouched(e),
                this.updateValueAndValidity(e);
            }),
            (e.prototype.getRawValue = function () {
              return this.controls.map(function (t) {
                return t instanceof zy ? t.value : t.getRawValue();
              });
            }),
            (e.prototype.clear = function () {
              this.controls.length < 1 ||
                (this._forEachChild(function (t) {
                  return t._registerOnCollectionChange(function () {});
                }),
                this.controls.splice(0),
                this.updateValueAndValidity());
            }),
            (e.prototype._syncPendingControls = function () {
              var t = this.controls.reduce(function (t, e) {
                return !!e._syncPendingControls() || t;
              }, !1);
              return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
            }),
            (e.prototype._throwIfControlMissing = function (t) {
              if (!this.controls.length)
                throw new Error(
                  "\n        There are no form controls registered with this array yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      "
                );
              if (!this.at(t))
                throw new Error("Cannot find form control at index " + t);
            }),
            (e.prototype._forEachChild = function (t) {
              this.controls.forEach(function (e, n) {
                t(e, n);
              });
            }),
            (e.prototype._updateValue = function () {
              var t = this;
              this.value = this.controls
                .filter(function (e) {
                  return e.enabled || t.disabled;
                })
                .map(function (t) {
                  return t.value;
                });
            }),
            (e.prototype._anyControls = function (t) {
              return this.controls.some(function (e) {
                return e.enabled && t(e);
              });
            }),
            (e.prototype._setUpControls = function () {
              var t = this;
              this._forEachChild(function (e) {
                return t._registerControl(e);
              });
            }),
            (e.prototype._checkAllValuesPresent = function (t) {
              this._forEachChild(function (e, n) {
                if (void 0 === t[n])
                  throw new Error(
                    "Must supply a value for form control at index: " + n + "."
                  );
              });
            }),
            (e.prototype._allControlsDisabled = function () {
              var t, e;
              try {
                for (
                  var n = Object(r.e)(this.controls), o = n.next();
                  !o.done;
                  o = n.next()
                )
                  if (o.value.enabled) return !1;
              } catch (i) {
                t = { error: i };
              } finally {
                try {
                  o && !o.done && (e = n.return) && e.call(n);
                } finally {
                  if (t) throw t.error;
                }
              }
              return this.controls.length > 0 || this.disabled;
            }),
            (e.prototype._registerControl = function (t) {
              t.setParent(this),
                t._registerOnCollectionChange(this._onCollectionChange);
            }),
            e
          );
        })(Hy),
        Gy = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.ngOnInit = function () {
              this._checkParentType(), this.formDirective.addFormGroup(this);
            }),
            (e.prototype.ngOnDestroy = function () {
              this.formDirective && this.formDirective.removeFormGroup(this);
            }),
            Object.defineProperty(e.prototype, "control", {
              get: function () {
                return this.formDirective.getFormGroup(this);
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "path", {
              get: function () {
                return Py(this.name, this._parent);
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "formDirective", {
              get: function () {
                return this._parent ? this._parent.formDirective : null;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "validator", {
              get: function () {
                return jy(this._validators);
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "asyncValidator", {
              get: function () {
                return My(this._asyncValidators);
              },
              enumerable: !0,
              configurable: !0,
            }),
            (e.prototype._checkParentType = function () {}),
            e
          );
        })(uy),
        Wy = (function () {
          return function () {};
        })(),
        Qy = new Et("NgModelWithFormControlWarning"),
        Ky = (function (t) {
          function e(e, n) {
            var r = t.call(this) || this;
            return (
              (r._validators = e),
              (r._asyncValidators = n),
              (r.submitted = !1),
              (r.directives = []),
              (r.form = null),
              (r.ngSubmit = new To()),
              r
            );
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.ngOnChanges = function (t) {
              this._checkFormPresent(),
                t.hasOwnProperty("form") &&
                  (this._updateValidators(),
                  this._updateDomValue(),
                  this._updateRegistrations());
            }),
            Object.defineProperty(e.prototype, "formDirective", {
              get: function () {
                return this;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "control", {
              get: function () {
                return this.form;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "path", {
              get: function () {
                return [];
              },
              enumerable: !0,
              configurable: !0,
            }),
            (e.prototype.addControl = function (t) {
              var e = this.form.get(t.path);
              return (
                Ay(e, t),
                e.updateValueAndValidity({ emitEvent: !1 }),
                this.directives.push(t),
                e
              );
            }),
            (e.prototype.getControl = function (t) {
              return this.form.get(t.path);
            }),
            (e.prototype.removeControl = function (t) {
              var e, n;
              (n = (e = this.directives).indexOf(t)) > -1 && e.splice(n, 1);
            }),
            (e.prototype.addFormGroup = function (t) {
              var e = this.form.get(t.path);
              Ny(e, t), e.updateValueAndValidity({ emitEvent: !1 });
            }),
            (e.prototype.removeFormGroup = function (t) {}),
            (e.prototype.getFormGroup = function (t) {
              return this.form.get(t.path);
            }),
            (e.prototype.addFormArray = function (t) {
              var e = this.form.get(t.path);
              Ny(e, t), e.updateValueAndValidity({ emitEvent: !1 });
            }),
            (e.prototype.removeFormArray = function (t) {}),
            (e.prototype.getFormArray = function (t) {
              return this.form.get(t.path);
            }),
            (e.prototype.updateModel = function (t, e) {
              this.form.get(t.path).setValue(e);
            }),
            (e.prototype.onSubmit = function (t) {
              return (
                (this.submitted = !0),
                (e = this.directives),
                this.form._syncPendingControls(),
                e.forEach(function (t) {
                  var e = t.control;
                  "submit" === e.updateOn &&
                    e._pendingChange &&
                    (t.viewToModelUpdate(e._pendingValue),
                    (e._pendingChange = !1));
                }),
                this.ngSubmit.emit(t),
                !1
              );
              var e;
            }),
            (e.prototype.onReset = function () {
              this.resetForm();
            }),
            (e.prototype.resetForm = function (t) {
              void 0 === t && (t = void 0),
                this.form.reset(t),
                (this.submitted = !1);
            }),
            (e.prototype._updateDomValue = function () {
              var t = this;
              this.directives.forEach(function (e) {
                var n = t.form.get(e.path);
                e.control !== n &&
                  ((function (t, e) {
                    e.valueAccessor.registerOnChange(function () {
                      return Ry(e);
                    }),
                      e.valueAccessor.registerOnTouched(function () {
                        return Ry(e);
                      }),
                      e._rawValidators.forEach(function (t) {
                        t.registerOnValidatorChange &&
                          t.registerOnValidatorChange(null);
                      }),
                      e._rawAsyncValidators.forEach(function (t) {
                        t.registerOnValidatorChange &&
                          t.registerOnValidatorChange(null);
                      }),
                      t && t._clearChangeFns();
                  })(e.control, e),
                  n && Ay(n, e),
                  (e.control = n));
              }),
                this.form._updateTreeValidity({ emitEvent: !1 });
            }),
            (e.prototype._updateRegistrations = function () {
              var t = this;
              this.form._registerOnCollectionChange(function () {
                return t._updateDomValue();
              }),
                this._oldForm &&
                  this._oldForm._registerOnCollectionChange(function () {}),
                (this._oldForm = this.form);
            }),
            (e.prototype._updateValidators = function () {
              var t = jy(this._validators);
              this.form.validator = yy.compose([this.form.validator, t]);
              var e = My(this._asyncValidators);
              this.form.asyncValidator = yy.composeAsync([
                this.form.asyncValidator,
                e,
              ]);
            }),
            (e.prototype._checkFormPresent = function () {
              this.form || Oy.missingFormException();
            }),
            e
          );
        })(uy),
        Zy = (function (t) {
          function e(e, n, r) {
            var o = t.call(this) || this;
            return (
              (o._parent = e), (o._validators = n), (o._asyncValidators = r), o
            );
          }
          return (
            Object(r.b)(e, t),
            (e.prototype._checkParentType = function () {
              Xy(this._parent) && Oy.groupParentException();
            }),
            e
          );
        })(Gy),
        $y = (function (t) {
          function e(e, n, r) {
            var o = t.call(this) || this;
            return (
              (o._parent = e), (o._validators = n), (o._asyncValidators = r), o
            );
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.ngOnInit = function () {
              this._checkParentType(), this.formDirective.addFormArray(this);
            }),
            (e.prototype.ngOnDestroy = function () {
              this.formDirective && this.formDirective.removeFormArray(this);
            }),
            Object.defineProperty(e.prototype, "control", {
              get: function () {
                return this.formDirective.getFormArray(this);
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "formDirective", {
              get: function () {
                return this._parent ? this._parent.formDirective : null;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "path", {
              get: function () {
                return Py(this.name, this._parent);
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "validator", {
              get: function () {
                return jy(this._validators);
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "asyncValidator", {
              get: function () {
                return My(this._asyncValidators);
              },
              enumerable: !0,
              configurable: !0,
            }),
            (e.prototype._checkParentType = function () {
              Xy(this._parent) && Oy.arrayParentException();
            }),
            e
          );
        })(uy);
      function Xy(t) {
        return !(t instanceof Zy || t instanceof Ky || t instanceof $y);
      }
      var Jy = (function (t) {
          function e(e, n, r, o, i) {
            var a = t.call(this) || this;
            return (
              (a._ngModelWarningConfig = i),
              (a._added = !1),
              (a.update = new To()),
              (a._ngModelWarningSent = !1),
              (a._parent = e),
              (a._rawValidators = n || []),
              (a._rawAsyncValidators = r || []),
              (a.valueAccessor = (function (t, e) {
                if (!e) return null;
                Array.isArray(e) ||
                  Dy(
                    t,
                    "Value accessor was not provided as an array for form control with"
                  );
                var n = void 0,
                  r = void 0,
                  o = void 0;
                return (
                  e.forEach(function (e) {
                    var i;
                    e.constructor === ay
                      ? (n = e)
                      : ((i = e),
                        Vy.some(function (t) {
                          return i.constructor === t;
                        })
                          ? (r &&
                              Dy(
                                t,
                                "More than one built-in value accessor matches form control with"
                              ),
                            (r = e))
                          : (o &&
                              Dy(
                                t,
                                "More than one custom value accessor matches form control with"
                              ),
                            (o = e)));
                  }),
                  o ||
                    r ||
                    n ||
                    (Dy(t, "No valid value accessor for form control with"),
                    null)
                );
              })(a, o)),
              a
            );
          }
          var n;
          return (
            Object(r.b)(e, t),
            (n = e),
            Object.defineProperty(e.prototype, "isDisabled", {
              set: function (t) {
                Oy.disabledAttrWarning();
              },
              enumerable: !0,
              configurable: !0,
            }),
            (e.prototype.ngOnChanges = function (t) {
              var e, r;
              this._added || this._setUpControl(),
                (function (t, e) {
                  if (!t.hasOwnProperty("model")) return !1;
                  var n = t.model;
                  return !!n.isFirstChange() || !Ue(e, n.currentValue);
                })(t, this.viewModel) &&
                  ("formControlName",
                  (e = n),
                  this,
                  (r = this._ngModelWarningConfig),
                  Xt() &&
                    "never" !== r &&
                    ((((null !== r && "once" !== r) ||
                      e._ngModelWarningSentOnce) &&
                      ("always" !== r || this._ngModelWarningSent)) ||
                      (Oy.ngModelWarning("formControlName"),
                      (e._ngModelWarningSentOnce = !0),
                      (this._ngModelWarningSent = !0))),
                  (this.viewModel = this.model),
                  this.formDirective.updateModel(this, this.model));
            }),
            (e.prototype.ngOnDestroy = function () {
              this.formDirective && this.formDirective.removeControl(this);
            }),
            (e.prototype.viewToModelUpdate = function (t) {
              (this.viewModel = t), this.update.emit(t);
            }),
            Object.defineProperty(e.prototype, "path", {
              get: function () {
                return Py(this.name, this._parent);
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "formDirective", {
              get: function () {
                return this._parent ? this._parent.formDirective : null;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "validator", {
              get: function () {
                return jy(this._rawValidators);
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "asyncValidator", {
              get: function () {
                return My(this._rawAsyncValidators);
              },
              enumerable: !0,
              configurable: !0,
            }),
            (e.prototype._checkParentType = function () {
              !(this._parent instanceof Zy) && this._parent instanceof Gy
                ? Oy.ngModelGroupException()
                : this._parent instanceof Zy ||
                  this._parent instanceof Ky ||
                  this._parent instanceof $y ||
                  Oy.controlParentException();
            }),
            (e.prototype._setUpControl = function () {
              this._checkParentType(),
                (this.control = this.formDirective.addControl(this)),
                this.control.disabled &&
                  this.valueAccessor.setDisabledState &&
                  this.valueAccessor.setDisabledState(!0),
                (this._added = !0);
            }),
            (e._ngModelWarningSentOnce = !1),
            e
          );
        })(cy),
        Yy = (function () {
          return function () {};
        })(),
        tg = (function () {
          function t() {}
          return (
            (t.prototype.group = function (t, e) {
              void 0 === e && (e = null);
              var n = this._reduceControls(t),
                r = null,
                o = null,
                i = void 0;
              return (
                null != e &&
                  ((function (t) {
                    return (
                      void 0 !== t.asyncValidators ||
                      void 0 !== t.validators ||
                      void 0 !== t.updateOn
                    );
                  })(e)
                    ? ((r = null != e.validators ? e.validators : null),
                      (o =
                        null != e.asyncValidators ? e.asyncValidators : null),
                      (i = null != e.updateOn ? e.updateOn : void 0))
                    : ((r = null != e.validator ? e.validator : null),
                      (o =
                        null != e.asyncValidator ? e.asyncValidator : null))),
                new By(n, { asyncValidators: o, updateOn: i, validators: r })
              );
            }),
            (t.prototype.control = function (t, e, n) {
              return new zy(t, e, n);
            }),
            (t.prototype.array = function (t, e, n) {
              var r = this,
                o = t.map(function (t) {
                  return r._createControl(t);
                });
              return new qy(o, e, n);
            }),
            (t.prototype._reduceControls = function (t) {
              var e = this,
                n = {};
              return (
                Object.keys(t).forEach(function (r) {
                  n[r] = e._createControl(t[r]);
                }),
                n
              );
            }),
            (t.prototype._createControl = function (t) {
              return t instanceof zy || t instanceof By || t instanceof qy
                ? t
                : Array.isArray(t)
                ? this.control(
                    t[0],
                    t.length > 1 ? t[1] : null,
                    t.length > 2 ? t[2] : null
                  )
                : this.control(t);
            }),
            t
          );
        })(),
        eg = (function () {
          function t() {}
          var e;
          return (
            (e = t),
            (t.withConfig = function (t) {
              return {
                ngModule: e,
                providers: [
                  { provide: Qy, useValue: t.warnOnNgModelWithFormControl },
                ],
              };
            }),
            t
          );
        })(),
        ng = "accent",
        rg = [
          "mat-button",
          "mat-flat-button",
          "mat-icon-button",
          "mat-raised-button",
          "mat-stroked-button",
          "mat-mini-fab",
          "mat-fab",
        ],
        og = (function (t) {
          function e(e, n, r) {
            var o = t.call(this, e) || this;
            (o._focusMonitor = n),
              (o._animationMode = r),
              (o.isRoundButton = o._hasHostAttributes(
                "mat-fab",
                "mat-mini-fab"
              )),
              (o.isIconButton = o._hasHostAttributes("mat-icon-button"));
            for (var i = 0, a = rg; i < a.length; i++) {
              var s = a[i];
              o._hasHostAttributes(s) && o._getHostElement().classList.add(s);
            }
            return (
              e.nativeElement.classList.add("mat-button-base"),
              o._focusMonitor.monitor(o._elementRef, !0),
              o.isRoundButton && (o.color = ng),
              o
            );
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.ngOnDestroy = function () {
              this._focusMonitor.stopMonitoring(this._elementRef);
            }),
            (e.prototype.focus = function (t, e) {
              void 0 === t && (t = "program"),
                this._focusMonitor.focusVia(this._getHostElement(), t, e);
            }),
            (e.prototype._getHostElement = function () {
              return this._elementRef.nativeElement;
            }),
            (e.prototype._isRippleDisabled = function () {
              return this.disableRipple || this.disabled;
            }),
            (e.prototype._hasHostAttributes = function () {
              for (var t = this, e = [], n = 0; n < arguments.length; n++)
                e[n] = arguments[n];
              return e.some(function (e) {
                return t._getHostElement().hasAttribute(e);
              });
            }),
            e
          );
        })(
          af(
            of(
              sf(
                (function () {
                  return function (t) {
                    this._elementRef = t;
                  };
                })()
              )
            )
          )
        ),
        ig = (function () {
          return function () {};
        })(),
        ag = Kn({
          encapsulation: 2,
          styles: [
            ".mat-button .mat-button-focus-overlay,.mat-icon-button .mat-button-focus-overlay{opacity:0}.mat-button:hover .mat-button-focus-overlay,.mat-stroked-button:hover .mat-button-focus-overlay{opacity:.04}@media (hover:none){.mat-button:hover .mat-button-focus-overlay,.mat-stroked-button:hover .mat-button-focus-overlay{opacity:0}}.mat-button,.mat-flat-button,.mat-icon-button,.mat-stroked-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible}.mat-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner{border:0}.mat-button[disabled],.mat-flat-button[disabled],.mat-icon-button[disabled],.mat-stroked-button[disabled]{cursor:default}.mat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-button.cdk-program-focused .mat-button-focus-overlay,.mat-flat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-flat-button.cdk-program-focused .mat-button-focus-overlay,.mat-icon-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-icon-button.cdk-program-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner{border:0}.mat-raised-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0,0,0);transition:background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1)}.mat-raised-button::-moz-focus-inner{border:0}.mat-raised-button[disabled]{cursor:default}.mat-raised-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-raised-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-raised-button::-moz-focus-inner{border:0}._mat-animation-noopable.mat-raised-button{transition:none;animation:none}.mat-stroked-button{border:1px solid currentColor;padding:0 15px;line-height:34px}.mat-stroked-button .mat-button-focus-overlay,.mat-stroked-button .mat-button-ripple.mat-ripple{top:-1px;left:-1px;right:-1px;bottom:-1px}.mat-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0,0,0);transition:background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);min-width:0;border-radius:50%;width:56px;height:56px;padding:0;flex-shrink:0}.mat-fab::-moz-focus-inner{border:0}.mat-fab[disabled]{cursor:default}.mat-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-fab{transition:none;animation:none}.mat-fab .mat-button-wrapper{padding:16px 0;display:inline-block;line-height:24px}.mat-mini-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0,0,0);transition:background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);min-width:0;border-radius:50%;width:40px;height:40px;padding:0;flex-shrink:0}.mat-mini-fab::-moz-focus-inner{border:0}.mat-mini-fab[disabled]{cursor:default}.mat-mini-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-mini-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-mini-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-mini-fab{transition:none;animation:none}.mat-mini-fab .mat-button-wrapper{padding:8px 0;display:inline-block;line-height:24px}.mat-icon-button{padding:0;min-width:0;width:40px;height:40px;flex-shrink:0;line-height:40px;border-radius:50%}.mat-icon-button .mat-icon,.mat-icon-button i{line-height:24px}.mat-button-focus-overlay,.mat-button-ripple.mat-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-button-ripple.mat-ripple:not(:empty){transform:translateZ(0)}.mat-button-focus-overlay{opacity:0;transition:opacity .2s cubic-bezier(.35,0,.25,1),background-color .2s cubic-bezier(.35,0,.25,1)}._mat-animation-noopable .mat-button-focus-overlay{transition:none}@media (-ms-high-contrast:active){.mat-button-focus-overlay{background-color:#fff}}@media (-ms-high-contrast:black-on-white){.mat-button-focus-overlay{background-color:#000}}.mat-button-ripple-round{border-radius:50%;z-index:1}.mat-button .mat-button-wrapper>*,.mat-fab .mat-button-wrapper>*,.mat-flat-button .mat-button-wrapper>*,.mat-icon-button .mat-button-wrapper>*,.mat-mini-fab .mat-button-wrapper>*,.mat-raised-button .mat-button-wrapper>*,.mat-stroked-button .mat-button-wrapper>*{vertical-align:middle}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button{display:block;font-size:inherit;width:2.5em;height:2.5em}@media (-ms-high-contrast:active){.mat-button,.mat-fab,.mat-flat-button,.mat-icon-button,.mat-mini-fab,.mat-raised-button{outline:solid 1px}}",
          ],
          data: {},
        });
      function sg(t) {
        return ea(
          2,
          [
            qi(671088640, 1, { ripple: 0 }),
            (t()(),
            Li(
              1,
              0,
              null,
              null,
              1,
              "span",
              [["class", "mat-button-wrapper"]],
              null,
              null,
              null,
              null,
              null
            )),
            (null,
            0,
            {
              nodeIndex: -1,
              parent: null,
              renderParent: null,
              bindingIndex: -1,
              outputIndex: -1,
              checkIndex: -1,
              flags: 8,
              childFlags: 0,
              directChildFlags: 0,
              childMatchedQueries: 0,
              matchedQueries: {},
              matchedQueryIds: 0,
              references: {},
              ngContentIndex: null,
              childCount: 0,
              bindings: [],
              bindingFlags: 0,
              outputs: [],
              element: null,
              provider: null,
              text: null,
              query: null,
              ngContent: { index: 0 },
            }),
            (t()(),
            Li(
              3,
              0,
              null,
              null,
              1,
              "div",
              [
                ["class", "mat-button-ripple mat-ripple"],
                ["matRipple", ""],
              ],
              [
                [2, "mat-button-ripple-round", null],
                [2, "mat-ripple-unbounded", null],
              ],
              null,
              null,
              null,
              null
            )),
            no(
              4,
              212992,
              [[1, 4]],
              0,
              mf,
              [rn, ni, Zp, [2, df], [2, Zm]],
              {
                centered: [0, "centered"],
                disabled: [1, "disabled"],
                trigger: [2, "trigger"],
              },
              null
            ),
            (t()(),
            Li(
              5,
              0,
              null,
              null,
              0,
              "div",
              [["class", "mat-button-focus-overlay"]],
              null,
              null,
              null,
              null,
              null
            )),
          ],
          function (t, e) {
            var n = e.component;
            t(
              e,
              4,
              0,
              n.isIconButton,
              n._isRippleDisabled(),
              n._getHostElement()
            );
          },
          function (t, e) {
            var n = e.component;
            t(e, 3, 0, n.isRoundButton || n.isIconButton, Br(e, 4).unbounded);
          }
        );
      }
      var ug = (function () {
          return function () {};
        })(),
        lg = (function () {
          return function () {};
        })(),
        cg = (function () {
          function t(t) {
            var e = this;
            (this.normalizedNames = new Map()),
              (this.lazyUpdate = null),
              t
                ? (this.lazyInit =
                    "string" == typeof t
                      ? function () {
                          (e.headers = new Map()),
                            t.split("\n").forEach(function (t) {
                              var n = t.indexOf(":");
                              if (n > 0) {
                                var r = t.slice(0, n),
                                  o = r.toLowerCase(),
                                  i = t.slice(n + 1).trim();
                                e.maybeSetNormalizedName(r, o),
                                  e.headers.has(o)
                                    ? e.headers.get(o).push(i)
                                    : e.headers.set(o, [i]);
                              }
                            });
                        }
                      : function () {
                          (e.headers = new Map()),
                            Object.keys(t).forEach(function (n) {
                              var r = t[n],
                                o = n.toLowerCase();
                              "string" == typeof r && (r = [r]),
                                r.length > 0 &&
                                  (e.headers.set(o, r),
                                  e.maybeSetNormalizedName(n, o));
                            });
                        })
                : (this.headers = new Map());
          }
          return (
            (t.prototype.has = function (t) {
              return this.init(), this.headers.has(t.toLowerCase());
            }),
            (t.prototype.get = function (t) {
              this.init();
              var e = this.headers.get(t.toLowerCase());
              return e && e.length > 0 ? e[0] : null;
            }),
            (t.prototype.keys = function () {
              return this.init(), Array.from(this.normalizedNames.values());
            }),
            (t.prototype.getAll = function (t) {
              return this.init(), this.headers.get(t.toLowerCase()) || null;
            }),
            (t.prototype.append = function (t, e) {
              return this.clone({ name: t, value: e, op: "a" });
            }),
            (t.prototype.set = function (t, e) {
              return this.clone({ name: t, value: e, op: "s" });
            }),
            (t.prototype.delete = function (t, e) {
              return this.clone({ name: t, value: e, op: "d" });
            }),
            (t.prototype.maybeSetNormalizedName = function (t, e) {
              this.normalizedNames.has(e) || this.normalizedNames.set(e, t);
            }),
            (t.prototype.init = function () {
              var e = this;
              this.lazyInit &&
                (this.lazyInit instanceof t
                  ? this.copyFrom(this.lazyInit)
                  : this.lazyInit(),
                (this.lazyInit = null),
                this.lazyUpdate &&
                  (this.lazyUpdate.forEach(function (t) {
                    return e.applyUpdate(t);
                  }),
                  (this.lazyUpdate = null)));
            }),
            (t.prototype.copyFrom = function (t) {
              var e = this;
              t.init(),
                Array.from(t.headers.keys()).forEach(function (n) {
                  e.headers.set(n, t.headers.get(n)),
                    e.normalizedNames.set(n, t.normalizedNames.get(n));
                });
            }),
            (t.prototype.clone = function (e) {
              var n = new t();
              return (
                (n.lazyInit =
                  this.lazyInit && this.lazyInit instanceof t
                    ? this.lazyInit
                    : this),
                (n.lazyUpdate = (this.lazyUpdate || []).concat([e])),
                n
              );
            }),
            (t.prototype.applyUpdate = function (t) {
              var e = t.name.toLowerCase();
              switch (t.op) {
                case "a":
                case "s":
                  var n = t.value;
                  if (("string" == typeof n && (n = [n]), 0 === n.length))
                    return;
                  this.maybeSetNormalizedName(t.name, e);
                  var o = ("a" === t.op ? this.headers.get(e) : void 0) || [];
                  o.push.apply(o, Object(r.d)(n)), this.headers.set(e, o);
                  break;
                case "d":
                  var i = t.value;
                  if (i) {
                    var a = this.headers.get(e);
                    if (!a) return;
                    0 ===
                    (a = a.filter(function (t) {
                      return -1 === i.indexOf(t);
                    })).length
                      ? (this.headers.delete(e), this.normalizedNames.delete(e))
                      : this.headers.set(e, a);
                  } else this.headers.delete(e), this.normalizedNames.delete(e);
              }
            }),
            (t.prototype.forEach = function (t) {
              var e = this;
              this.init(),
                Array.from(this.normalizedNames.keys()).forEach(function (n) {
                  return t(e.normalizedNames.get(n), e.headers.get(n));
                });
            }),
            t
          );
        })(),
        hg = (function () {
          function t() {}
          return (
            (t.prototype.encodeKey = function (t) {
              return pg(t);
            }),
            (t.prototype.encodeValue = function (t) {
              return pg(t);
            }),
            (t.prototype.decodeKey = function (t) {
              return decodeURIComponent(t);
            }),
            (t.prototype.decodeValue = function (t) {
              return decodeURIComponent(t);
            }),
            t
          );
        })();
      function pg(t) {
        return encodeURIComponent(t)
          .replace(/%40/gi, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/gi, "$")
          .replace(/%2C/gi, ",")
          .replace(/%3B/gi, ";")
          .replace(/%2B/gi, "+")
          .replace(/%3D/gi, "=")
          .replace(/%3F/gi, "?")
          .replace(/%2F/gi, "/");
      }
      var fg = (function () {
        function t(t) {
          var e,
            n,
            o,
            i = this;
          if (
            (void 0 === t && (t = {}),
            (this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = t.encoder || new hg()),
            t.fromString)
          ) {
            if (t.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map =
              ((e = t.fromString),
              (n = this.encoder),
              (o = new Map()),
              e.length > 0 &&
                e.split("&").forEach(function (t) {
                  var e = t.indexOf("="),
                    i = Object(r.c)(
                      -1 == e
                        ? [n.decodeKey(t), ""]
                        : [
                            n.decodeKey(t.slice(0, e)),
                            n.decodeValue(t.slice(e + 1)),
                          ],
                      2
                    ),
                    a = i[0],
                    s = i[1],
                    u = o.get(a) || [];
                  u.push(s), o.set(a, u);
                }),
              o);
          } else
            t.fromObject
              ? ((this.map = new Map()),
                Object.keys(t.fromObject).forEach(function (e) {
                  var n = t.fromObject[e];
                  i.map.set(e, Array.isArray(n) ? n : [n]);
                }))
              : (this.map = null);
        }
        return (
          (t.prototype.has = function (t) {
            return this.init(), this.map.has(t);
          }),
          (t.prototype.get = function (t) {
            this.init();
            var e = this.map.get(t);
            return e ? e[0] : null;
          }),
          (t.prototype.getAll = function (t) {
            return this.init(), this.map.get(t) || null;
          }),
          (t.prototype.keys = function () {
            return this.init(), Array.from(this.map.keys());
          }),
          (t.prototype.append = function (t, e) {
            return this.clone({ param: t, value: e, op: "a" });
          }),
          (t.prototype.set = function (t, e) {
            return this.clone({ param: t, value: e, op: "s" });
          }),
          (t.prototype.delete = function (t, e) {
            return this.clone({ param: t, value: e, op: "d" });
          }),
          (t.prototype.toString = function () {
            var t = this;
            return (
              this.init(),
              this.keys()
                .map(function (e) {
                  var n = t.encoder.encodeKey(e);
                  return t.map
                    .get(e)
                    .map(function (e) {
                      return n + "=" + t.encoder.encodeValue(e);
                    })
                    .join("&");
                })
                .join("&")
            );
          }),
          (t.prototype.clone = function (e) {
            var n = new t({ encoder: this.encoder });
            return (
              (n.cloneFrom = this.cloneFrom || this),
              (n.updates = (this.updates || []).concat([e])),
              n
            );
          }),
          (t.prototype.init = function () {
            var t = this;
            null === this.map && (this.map = new Map()),
              null !== this.cloneFrom &&
                (this.cloneFrom.init(),
                this.cloneFrom.keys().forEach(function (e) {
                  return t.map.set(e, t.cloneFrom.map.get(e));
                }),
                this.updates.forEach(function (e) {
                  switch (e.op) {
                    case "a":
                    case "s":
                      var n =
                        ("a" === e.op ? t.map.get(e.param) : void 0) || [];
                      n.push(e.value), t.map.set(e.param, n);
                      break;
                    case "d":
                      if (void 0 === e.value) {
                        t.map.delete(e.param);
                        break;
                      }
                      var r = t.map.get(e.param) || [],
                        o = r.indexOf(e.value);
                      -1 !== o && r.splice(o, 1),
                        r.length > 0
                          ? t.map.set(e.param, r)
                          : t.map.delete(e.param);
                  }
                }),
                (this.cloneFrom = this.updates = null));
          }),
          t
        );
      })();
      function dg(t) {
        return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer;
      }
      function mg(t) {
        return "undefined" != typeof Blob && t instanceof Blob;
      }
      function yg(t) {
        return "undefined" != typeof FormData && t instanceof FormData;
      }
      var gg = (function () {
          function t(t, e, n, r) {
            var o;
            if (
              ((this.url = e),
              (this.body = null),
              (this.reportProgress = !1),
              (this.withCredentials = !1),
              (this.responseType = "json"),
              (this.method = t.toUpperCase()),
              (function (t) {
                switch (t) {
                  case "DELETE":
                  case "GET":
                  case "HEAD":
                  case "OPTIONS":
                  case "JSONP":
                    return !1;
                  default:
                    return !0;
                }
              })(this.method) || r
                ? ((this.body = void 0 !== n ? n : null), (o = r))
                : (o = n),
              o &&
                ((this.reportProgress = !!o.reportProgress),
                (this.withCredentials = !!o.withCredentials),
                o.responseType && (this.responseType = o.responseType),
                o.headers && (this.headers = o.headers),
                o.params && (this.params = o.params)),
              this.headers || (this.headers = new cg()),
              this.params)
            ) {
              var i = this.params.toString();
              if (0 === i.length) this.urlWithParams = e;
              else {
                var a = e.indexOf("?");
                this.urlWithParams =
                  e + (-1 === a ? "?" : a < e.length - 1 ? "&" : "") + i;
              }
            } else (this.params = new fg()), (this.urlWithParams = e);
          }
          return (
            (t.prototype.serializeBody = function () {
              return null === this.body
                ? null
                : dg(this.body) ||
                  mg(this.body) ||
                  yg(this.body) ||
                  "string" == typeof this.body
                ? this.body
                : this.body instanceof fg
                ? this.body.toString()
                : "object" == typeof this.body ||
                  "boolean" == typeof this.body ||
                  Array.isArray(this.body)
                ? JSON.stringify(this.body)
                : this.body.toString();
            }),
            (t.prototype.detectContentTypeHeader = function () {
              return null === this.body
                ? null
                : yg(this.body)
                ? null
                : mg(this.body)
                ? this.body.type || null
                : dg(this.body)
                ? null
                : "string" == typeof this.body
                ? "text/plain"
                : this.body instanceof fg
                ? "application/x-www-form-urlencoded;charset=UTF-8"
                : "object" == typeof this.body ||
                  "number" == typeof this.body ||
                  Array.isArray(this.body)
                ? "application/json"
                : null;
            }),
            (t.prototype.clone = function (e) {
              void 0 === e && (e = {});
              var n = e.method || this.method,
                r = e.url || this.url,
                o = e.responseType || this.responseType,
                i = void 0 !== e.body ? e.body : this.body,
                a =
                  void 0 !== e.withCredentials
                    ? e.withCredentials
                    : this.withCredentials,
                s =
                  void 0 !== e.reportProgress
                    ? e.reportProgress
                    : this.reportProgress,
                u = e.headers || this.headers,
                l = e.params || this.params;
              return (
                void 0 !== e.setHeaders &&
                  (u = Object.keys(e.setHeaders).reduce(function (t, n) {
                    return t.set(n, e.setHeaders[n]);
                  }, u)),
                e.setParams &&
                  (l = Object.keys(e.setParams).reduce(function (t, n) {
                    return t.set(n, e.setParams[n]);
                  }, l)),
                new t(n, r, i, {
                  params: l,
                  headers: u,
                  reportProgress: s,
                  responseType: o,
                  withCredentials: a,
                })
              );
            }),
            t
          );
        })(),
        vg = (function (t) {
          return (
            (t[(t.Sent = 0)] = "Sent"),
            (t[(t.UploadProgress = 1)] = "UploadProgress"),
            (t[(t.ResponseHeader = 2)] = "ResponseHeader"),
            (t[(t.DownloadProgress = 3)] = "DownloadProgress"),
            (t[(t.Response = 4)] = "Response"),
            (t[(t.User = 5)] = "User"),
            t
          );
        })({}),
        bg = (function () {
          return function (t, e, n) {
            void 0 === e && (e = 200),
              void 0 === n && (n = "OK"),
              (this.headers = t.headers || new cg()),
              (this.status = void 0 !== t.status ? t.status : e),
              (this.statusText = t.statusText || n),
              (this.url = t.url || null),
              (this.ok = this.status >= 200 && this.status < 300);
          };
        })(),
        _g = (function (t) {
          function e(e) {
            void 0 === e && (e = {});
            var n = t.call(this, e) || this;
            return (n.type = vg.ResponseHeader), n;
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.clone = function (t) {
              return (
                void 0 === t && (t = {}),
                new e({
                  headers: t.headers || this.headers,
                  status: void 0 !== t.status ? t.status : this.status,
                  statusText: t.statusText || this.statusText,
                  url: t.url || this.url || void 0,
                })
              );
            }),
            e
          );
        })(bg),
        wg = (function (t) {
          function e(e) {
            void 0 === e && (e = {});
            var n = t.call(this, e) || this;
            return (
              (n.type = vg.Response),
              (n.body = void 0 !== e.body ? e.body : null),
              n
            );
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.clone = function (t) {
              return (
                void 0 === t && (t = {}),
                new e({
                  body: void 0 !== t.body ? t.body : this.body,
                  headers: t.headers || this.headers,
                  status: void 0 !== t.status ? t.status : this.status,
                  statusText: t.statusText || this.statusText,
                  url: t.url || this.url || void 0,
                })
              );
            }),
            e
          );
        })(bg),
        Cg = (function (t) {
          function e(e) {
            var n = t.call(this, e, 0, "Unknown Error") || this;
            return (
              (n.name = "HttpErrorResponse"),
              (n.ok = !1),
              (n.message =
                n.status >= 200 && n.status < 300
                  ? "Http failure during parsing for " +
                    (e.url || "(unknown url)")
                  : "Http failure response for " +
                    (e.url || "(unknown url)") +
                    ": " +
                    e.status +
                    " " +
                    e.statusText),
              (n.error = e.error || null),
              n
            );
          }
          return Object(r.b)(e, t), e;
        })(bg);
      function Eg(t, e) {
        return {
          body: e,
          headers: t.headers,
          observe: t.observe,
          params: t.params,
          reportProgress: t.reportProgress,
          responseType: t.responseType,
          withCredentials: t.withCredentials,
        };
      }
      var Sg = (function () {
          function t(t) {
            this.handler = t;
          }
          return (
            (t.prototype.request = function (t, e, n) {
              var r,
                o = this;
              if ((void 0 === n && (n = {}), t instanceof gg)) r = t;
              else {
                var i;
                i = n.headers instanceof cg ? n.headers : new cg(n.headers);
                var a = void 0;
                n.params &&
                  (a =
                    n.params instanceof fg
                      ? n.params
                      : new fg({ fromObject: n.params })),
                  (r = new gg(t, e, void 0 !== n.body ? n.body : null, {
                    headers: i,
                    params: a,
                    reportProgress: n.reportProgress,
                    responseType: n.responseType || "json",
                    withCredentials: n.withCredentials,
                  }));
              }
              var s = Bs(r).pipe(
                Iu(function (t) {
                  return o.handler.handle(t);
                })
              );
              if (t instanceof gg || "events" === n.observe) return s;
              var u = s.pipe(
                tu(function (t) {
                  return t instanceof wg;
                })
              );
              switch (n.observe || "body") {
                case "body":
                  switch (r.responseType) {
                    case "arraybuffer":
                      return u.pipe(
                        F(function (t) {
                          if (
                            null !== t.body &&
                            !(t.body instanceof ArrayBuffer)
                          )
                            throw new Error("Response is not an ArrayBuffer.");
                          return t.body;
                        })
                      );
                    case "blob":
                      return u.pipe(
                        F(function (t) {
                          if (null !== t.body && !(t.body instanceof Blob))
                            throw new Error("Response is not a Blob.");
                          return t.body;
                        })
                      );
                    case "text":
                      return u.pipe(
                        F(function (t) {
                          if (null !== t.body && "string" != typeof t.body)
                            throw new Error("Response is not a string.");
                          return t.body;
                        })
                      );
                    case "json":
                    default:
                      return u.pipe(
                        F(function (t) {
                          return t.body;
                        })
                      );
                  }
                case "response":
                  return u;
                default:
                  throw new Error(
                    "Unreachable: unhandled observe type " + n.observe + "}"
                  );
              }
            }),
            (t.prototype.delete = function (t, e) {
              return void 0 === e && (e = {}), this.request("DELETE", t, e);
            }),
            (t.prototype.get = function (t, e) {
              return void 0 === e && (e = {}), this.request("GET", t, e);
            }),
            (t.prototype.head = function (t, e) {
              return void 0 === e && (e = {}), this.request("HEAD", t, e);
            }),
            (t.prototype.jsonp = function (t, e) {
              return this.request("JSONP", t, {
                params: new fg().append(e, "JSONP_CALLBACK"),
                observe: "body",
                responseType: "json",
              });
            }),
            (t.prototype.options = function (t, e) {
              return void 0 === e && (e = {}), this.request("OPTIONS", t, e);
            }),
            (t.prototype.patch = function (t, e, n) {
              return (
                void 0 === n && (n = {}), this.request("PATCH", t, Eg(n, e))
              );
            }),
            (t.prototype.post = function (t, e, n) {
              return (
                void 0 === n && (n = {}), this.request("POST", t, Eg(n, e))
              );
            }),
            (t.prototype.put = function (t, e, n) {
              return void 0 === n && (n = {}), this.request("PUT", t, Eg(n, e));
            }),
            t
          );
        })(),
        kg = (function () {
          function t(t, e) {
            (this.next = t), (this.interceptor = e);
          }
          return (
            (t.prototype.handle = function (t) {
              return this.interceptor.intercept(t, this.next);
            }),
            t
          );
        })(),
        Tg = new Et("HTTP_INTERCEPTORS"),
        xg = (function () {
          function t() {}
          return (
            (t.prototype.intercept = function (t, e) {
              return e.handle(t);
            }),
            t
          );
        })(),
        Og = /^\)\]\}',?\n/,
        Pg = (function () {
          return function () {};
        })(),
        Ag = (function () {
          function t() {}
          return (
            (t.prototype.build = function () {
              return new XMLHttpRequest();
            }),
            t
          );
        })(),
        Ig = (function () {
          function t(t) {
            this.xhrFactory = t;
          }
          return (
            (t.prototype.handle = function (t) {
              var e = this;
              if ("JSONP" === t.method)
                throw new Error(
                  "Attempted to construct Jsonp request without JsonpClientModule installed."
                );
              return new w(function (n) {
                var r = e.xhrFactory.build();
                if (
                  (r.open(t.method, t.urlWithParams),
                  t.withCredentials && (r.withCredentials = !0),
                  t.headers.forEach(function (t, e) {
                    return r.setRequestHeader(t, e.join(","));
                  }),
                  t.headers.has("Accept") ||
                    r.setRequestHeader(
                      "Accept",
                      "application/json, text/plain, */*"
                    ),
                  !t.headers.has("Content-Type"))
                ) {
                  var o = t.detectContentTypeHeader();
                  null !== o && r.setRequestHeader("Content-Type", o);
                }
                if (t.responseType) {
                  var i = t.responseType.toLowerCase();
                  r.responseType = "json" !== i ? i : "text";
                }
                var a = t.serializeBody(),
                  s = null,
                  u = function () {
                    if (null !== s) return s;
                    var e = 1223 === r.status ? 204 : r.status,
                      n = r.statusText || "OK",
                      o = new cg(r.getAllResponseHeaders()),
                      i =
                        (function (t) {
                          return "responseURL" in t && t.responseURL
                            ? t.responseURL
                            : /^X-Request-URL:/m.test(t.getAllResponseHeaders())
                            ? t.getResponseHeader("X-Request-URL")
                            : null;
                        })(r) || t.url;
                    return (s = new _g({
                      headers: o,
                      status: e,
                      statusText: n,
                      url: i,
                    }));
                  },
                  l = function () {
                    var e = u(),
                      o = e.headers,
                      i = e.status,
                      a = e.statusText,
                      s = e.url,
                      l = null;
                    204 !== i &&
                      (l = void 0 === r.response ? r.responseText : r.response),
                      0 === i && (i = l ? 200 : 0);
                    var c = i >= 200 && i < 300;
                    if ("json" === t.responseType && "string" == typeof l) {
                      var h = l;
                      l = l.replace(Og, "");
                      try {
                        l = "" !== l ? JSON.parse(l) : null;
                      } catch (p) {
                        (l = h), c && ((c = !1), (l = { error: p, text: l }));
                      }
                    }
                    c
                      ? (n.next(
                          new wg({
                            body: l,
                            headers: o,
                            status: i,
                            statusText: a,
                            url: s || void 0,
                          })
                        ),
                        n.complete())
                      : n.error(
                          new Cg({
                            error: l,
                            headers: o,
                            status: i,
                            statusText: a,
                            url: s || void 0,
                          })
                        );
                  },
                  c = function (t) {
                    var e = u().url,
                      o = new Cg({
                        error: t,
                        status: r.status || 0,
                        statusText: r.statusText || "Unknown Error",
                        url: e || void 0,
                      });
                    n.error(o);
                  },
                  h = !1,
                  p = function (e) {
                    h || (n.next(u()), (h = !0));
                    var o = { type: vg.DownloadProgress, loaded: e.loaded };
                    e.lengthComputable && (o.total = e.total),
                      "text" === t.responseType &&
                        r.responseText &&
                        (o.partialText = r.responseText),
                      n.next(o);
                  },
                  f = function (t) {
                    var e = { type: vg.UploadProgress, loaded: t.loaded };
                    t.lengthComputable && (e.total = t.total), n.next(e);
                  };
                return (
                  r.addEventListener("load", l),
                  r.addEventListener("error", c),
                  t.reportProgress &&
                    (r.addEventListener("progress", p),
                    null !== a &&
                      r.upload &&
                      r.upload.addEventListener("progress", f)),
                  r.send(a),
                  n.next({ type: vg.Sent }),
                  function () {
                    r.removeEventListener("error", c),
                      r.removeEventListener("load", l),
                      t.reportProgress &&
                        (r.removeEventListener("progress", p),
                        null !== a &&
                          r.upload &&
                          r.upload.removeEventListener("progress", f)),
                      r.abort();
                  }
                );
              });
            }),
            t
          );
        })(),
        Ng = new Et("XSRF_COOKIE_NAME"),
        Rg = new Et("XSRF_HEADER_NAME"),
        Dg = (function () {
          return function () {};
        })(),
        jg = (function () {
          function t(t, e, n) {
            (this.doc = t),
              (this.platform = e),
              (this.cookieName = n),
              (this.lastCookieString = ""),
              (this.lastToken = null),
              (this.parseCount = 0);
          }
          return (
            (t.prototype.getToken = function () {
              if ("server" === this.platform) return null;
              var t = this.doc.cookie || "";
              return (
                t !== this.lastCookieString &&
                  (this.parseCount++,
                  (this.lastToken = Es(t, this.cookieName)),
                  (this.lastCookieString = t)),
                this.lastToken
              );
            }),
            t
          );
        })(),
        Mg = (function () {
          function t(t, e) {
            (this.tokenService = t), (this.headerName = e);
          }
          return (
            (t.prototype.intercept = function (t, e) {
              var n = t.url.toLowerCase();
              if (
                "GET" === t.method ||
                "HEAD" === t.method ||
                n.startsWith("http://") ||
                n.startsWith("https://")
              )
                return e.handle(t);
              var r = this.tokenService.getToken();
              return (
                null === r ||
                  t.headers.has(this.headerName) ||
                  (t = t.clone({ headers: t.headers.set(this.headerName, r) })),
                e.handle(t)
              );
            }),
            t
          );
        })(),
        Vg = (function () {
          function t(t, e) {
            (this.backend = t), (this.injector = e), (this.chain = null);
          }
          return (
            (t.prototype.handle = function (t) {
              if (null === this.chain) {
                var e = this.injector.get(Tg, []);
                this.chain = e.reduceRight(function (t, e) {
                  return new kg(t, e);
                }, this.backend);
              }
              return this.chain.handle(t);
            }),
            t
          );
        })(),
        Fg = (function () {
          function t() {}
          var e;
          return (
            (e = t),
            (t.disable = function () {
              return {
                ngModule: e,
                providers: [{ provide: Mg, useClass: xg }],
              };
            }),
            (t.withOptions = function (t) {
              return (
                void 0 === t && (t = {}),
                {
                  ngModule: e,
                  providers: [
                    t.cookieName ? { provide: Ng, useValue: t.cookieName } : [],
                    t.headerName ? { provide: Rg, useValue: t.headerName } : [],
                  ],
                }
              );
            }),
            t
          );
        })(),
        Lg = (function () {
          return function () {};
        })(),
        Ug = (function () {
          function t(t, e) {
            (this.http = t), (this.router = e), (this.isAuth$ = new qs(!1));
          }
          return (
            (t.prototype.createUser = function (t, e) {
              var n = this;
              return new Promise(function (r, o) {
                n.http
                  .post("http://localhost:3000/api/auth/signup", {
                    email: t,
                    password: e,
                  })
                  .subscribe(
                    function (t) {
                      r(t);
                    },
                    function (t) {
                      o(t);
                    }
                  );
              });
            }),
            (t.prototype.getToken = function () {
              return this.authToken;
            }),
            (t.prototype.getUserId = function () {
              return this.userId;
            }),
            (t.prototype.loginUser = function (t, e) {
              var n = this;
              return new Promise(function (r, o) {
                n.http
                  .post("http://localhost:3000/api/auth/login", {
                    email: t,
                    password: e,
                  })
                  .subscribe(
                    function (t) {
                      (n.userId = t.userId),
                        (n.authToken = t.token),
                        n.isAuth$.next(!0),
                        r();
                    },
                    function (t) {
                      o(t);
                    }
                  );
              });
            }),
            (t.prototype.logout = function () {
              (this.authToken = null),
                (this.userId = null),
                this.isAuth$.next(!1),
                this.router.navigate(["login"]);
            }),
            (t.ngInjectableDef = ct({
              factory: function () {
                return new t(Rt(Sg), Rt(cp));
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })(),
        Hg = (function () {
          function t(t, e, n) {
            (this.formBuilder = t), (this.auth = e), (this.router = n);
          }
          return (
            (t.prototype.ngOnInit = function () {
              this.signupForm = this.formBuilder.group({
                email: [null, [yy.required, yy.email]],
                password: [null, yy.required],
              });
            }),
            (t.prototype.onSignup = function () {
              var t = this;
              this.loading = !0;
              var e = this.signupForm.get("email").value,
                n = this.signupForm.get("password").value;
              this.auth
                .createUser(e, n)
                .then(function (r) {
                  console.log(r.message),
                    t.auth
                      .loginUser(e, n)
                      .then(function () {
                        (t.loading = !1), t.router.navigate(["/sauces"]);
                      })
                      .catch(function (e) {
                        (t.loading = !1),
                          console.error(e),
                          (t.errorMsg = e.error.message);
                      });
                })
                .catch(function (e) {
                  (t.loading = !1),
                    console.error(e),
                    (t.errorMsg = e.error.message);
                });
            }),
            t
          );
        })(),
        zg = Kn({
          encapsulation: 0,
          styles: [
            ["form[_ngcontent-%COMP%]{margin:2em auto;max-width:750px}"],
          ],
          data: {},
        });
      function Bg(t) {
        return ea(
          0,
          [
            (t()(),
            Li(
              0,
              0,
              null,
              null,
              1,
              "mat-spinner",
              [
                ["class", "mat-spinner mat-progress-spinner"],
                ["mode", "indeterminate"],
                ["role", "progressbar"],
              ],
              [
                [2, "_mat-animation-noopable", null],
                [4, "width", "px"],
                [4, "height", "px"],
              ],
              null,
              null,
              ey,
              Jm
            )),
            no(
              1,
              114688,
              null,
              0,
              _f,
              [rn, Zp, [2, Fs], [2, Zm], bf],
              null,
              null
            ),
          ],
          function (t, e) {
            t(e, 1, 0);
          },
          function (t, e) {
            t(
              e,
              0,
              0,
              Br(e, 1)._noopAnimations,
              Br(e, 1).diameter,
              Br(e, 1).diameter
            );
          }
        );
      }
      function qg(t) {
        return ea(
          0,
          [
            (t()(),
            Li(
              0,
              0,
              null,
              null,
              1,
              "p",
              [["class", "text-danger"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), Ji(1, null, ["", ""])),
          ],
          null,
          function (t, e) {
            t(e, 1, 0, e.component.errorMsg);
          }
        );
      }
      function Gg(t) {
        return ea(
          0,
          [
            (t()(),
            Li(
              0,
              0,
              null,
              null,
              27,
              "form",
              [["novalidate", ""]],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null],
              ],
              [
                [null, "submit"],
                [null, "reset"],
              ],
              function (t, e, n) {
                var r = !0;
                return (
                  "submit" === e && (r = !1 !== Br(t, 2).onSubmit(n) && r),
                  "reset" === e && (r = !1 !== Br(t, 2).onReset() && r),
                  r
                );
              },
              null,
              null
            )),
            no(1, 16384, null, 0, Wy, [], null, null),
            no(
              2,
              540672,
              null,
              0,
              Ky,
              [
                [8, null],
                [8, null],
              ],
              { form: [0, "form"] },
              null
            ),
            ro(2048, null, uy, null, [Ky]),
            no(4, 16384, null, 0, fy, [[4, uy]], null, null),
            (t()(),
            Li(
              5,
              0,
              null,
              null,
              8,
              "div",
              [["class", "form-group"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Li(
              6,
              0,
              null,
              null,
              1,
              "label",
              [["for", "email"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), Ji(-1, null, ["Email"])),
            (t()(),
            Li(
              8,
              0,
              null,
              null,
              5,
              "input",
              [
                ["class", "form-control"],
                ["formControlName", "email"],
                ["id", "email"],
                ["type", "email"],
              ],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null],
              ],
              [
                [null, "input"],
                [null, "blur"],
                [null, "compositionstart"],
                [null, "compositionend"],
              ],
              function (t, e, n) {
                var r = !0;
                return (
                  "input" === e &&
                    (r = !1 !== Br(t, 9)._handleInput(n.target.value) && r),
                  "blur" === e && (r = !1 !== Br(t, 9).onTouched() && r),
                  "compositionstart" === e &&
                    (r = !1 !== Br(t, 9)._compositionStart() && r),
                  "compositionend" === e &&
                    (r = !1 !== Br(t, 9)._compositionEnd(n.target.value) && r),
                  r
                );
              },
              null,
              null
            )),
            no(9, 16384, null, 0, ay, [ln, rn, [2, iy]], null, null),
            ro(
              1024,
              null,
              ry,
              function (t) {
                return [t];
              },
              [ay]
            ),
            no(
              11,
              671744,
              null,
              0,
              Jy,
              [
                [3, uy],
                [8, null],
                [8, null],
                [6, ry],
                [2, Qy],
              ],
              { name: [0, "name"] },
              null
            ),
            ro(2048, null, cy, null, [Jy]),
            no(13, 16384, null, 0, py, [[4, cy]], null, null),
            (t()(),
            Li(
              14,
              0,
              null,
              null,
              8,
              "div",
              [["class", "form-group"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Li(
              15,
              0,
              null,
              null,
              1,
              "label",
              [["for", "password"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), Ji(-1, null, ["Password"])),
            (t()(),
            Li(
              17,
              0,
              null,
              null,
              5,
              "input",
              [
                ["class", "form-control"],
                ["formControlName", "password"],
                ["id", "password"],
                ["type", "password"],
              ],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null],
              ],
              [
                [null, "input"],
                [null, "blur"],
                [null, "compositionstart"],
                [null, "compositionend"],
              ],
              function (t, e, n) {
                var r = !0;
                return (
                  "input" === e &&
                    (r = !1 !== Br(t, 18)._handleInput(n.target.value) && r),
                  "blur" === e && (r = !1 !== Br(t, 18).onTouched() && r),
                  "compositionstart" === e &&
                    (r = !1 !== Br(t, 18)._compositionStart() && r),
                  "compositionend" === e &&
                    (r = !1 !== Br(t, 18)._compositionEnd(n.target.value) && r),
                  r
                );
              },
              null,
              null
            )),
            no(18, 16384, null, 0, ay, [ln, rn, [2, iy]], null, null),
            ro(
              1024,
              null,
              ry,
              function (t) {
                return [t];
              },
              [ay]
            ),
            no(
              20,
              671744,
              null,
              0,
              Jy,
              [
                [3, uy],
                [8, null],
                [8, null],
                [6, ry],
                [2, Qy],
              ],
              { name: [0, "name"] },
              null
            ),
            ro(2048, null, cy, null, [Jy]),
            no(22, 16384, null, 0, py, [[4, cy]], null, null),
            (t()(),
            Li(
              23,
              0,
              null,
              null,
              2,
              "button",
              [
                ["color", "primary"],
                ["mat-raised-button", ""],
              ],
              [
                [1, "disabled", 0],
                [2, "_mat-animation-noopable", null],
              ],
              [[null, "click"]],
              function (t, e, n) {
                var r = !0;
                return (
                  "click" === e && (r = !1 !== t.component.onSignup() && r), r
                );
              },
              sg,
              ag
            )),
            no(
              24,
              180224,
              null,
              0,
              og,
              [rn, tf, [2, Zm]],
              { disabled: [0, "disabled"], color: [1, "color"] },
              null
            ),
            (t()(), Ji(-1, 0, ["SIGN UP"])),
            (t()(), Fi(16777216, null, null, 1, null, qg)),
            no(27, 16384, null, 0, As, [An, On], { ngIf: [0, "ngIf"] }, null),
          ],
          function (t, e) {
            var n = e.component;
            t(e, 2, 0, n.signupForm),
              t(e, 11, 0, "email"),
              t(e, 20, 0, "password"),
              t(e, 24, 0, n.signupForm.invalid, "primary"),
              t(e, 27, 0, n.errorMsg);
          },
          function (t, e) {
            t(
              e,
              0,
              0,
              Br(e, 4).ngClassUntouched,
              Br(e, 4).ngClassTouched,
              Br(e, 4).ngClassPristine,
              Br(e, 4).ngClassDirty,
              Br(e, 4).ngClassValid,
              Br(e, 4).ngClassInvalid,
              Br(e, 4).ngClassPending
            ),
              t(
                e,
                8,
                0,
                Br(e, 13).ngClassUntouched,
                Br(e, 13).ngClassTouched,
                Br(e, 13).ngClassPristine,
                Br(e, 13).ngClassDirty,
                Br(e, 13).ngClassValid,
                Br(e, 13).ngClassInvalid,
                Br(e, 13).ngClassPending
              ),
              t(
                e,
                17,
                0,
                Br(e, 22).ngClassUntouched,
                Br(e, 22).ngClassTouched,
                Br(e, 22).ngClassPristine,
                Br(e, 22).ngClassDirty,
                Br(e, 22).ngClassValid,
                Br(e, 22).ngClassInvalid,
                Br(e, 22).ngClassPending
              ),
              t(
                e,
                23,
                0,
                Br(e, 24).disabled || null,
                "NoopAnimations" === Br(e, 24)._animationMode
              );
          }
        );
      }
      function Wg(t) {
        return ea(
          0,
          [
            (t()(), Fi(16777216, null, null, 1, null, Bg)),
            no(1, 16384, null, 0, As, [An, On], { ngIf: [0, "ngIf"] }, null),
            (t()(), Fi(16777216, null, null, 1, null, Gg)),
            no(3, 16384, null, 0, As, [An, On], { ngIf: [0, "ngIf"] }, null),
          ],
          function (t, e) {
            var n = e.component;
            t(e, 1, 0, n.loading), t(e, 3, 0, !n.loading);
          },
          null
        );
      }
      function Qg(t) {
        return ea(
          0,
          [
            (t()(),
            Li(
              0,
              0,
              null,
              null,
              1,
              "app-signup",
              [],
              null,
              null,
              null,
              Wg,
              zg
            )),
            no(1, 114688, null, 0, Hg, [tg, Ug, cp], null, null),
          ],
          function (t, e) {
            t(e, 1, 0);
          },
          null
        );
      }
      var Kg = Nr("app-signup", Hg, Qg, {}, {}, []),
        Zg = (function () {
          function t(t, e, n) {
            (this.formBuilder = t), (this.auth = e), (this.router = n);
          }
          return (
            (t.prototype.ngOnInit = function () {
              this.loginForm = this.formBuilder.group({
                email: [null, [yy.required, yy.email]],
                password: [null, yy.required],
              });
            }),
            (t.prototype.onLogin = function () {
              var t = this;
              this.loading = !0;
              var e = this.loginForm.get("email").value,
                n = this.loginForm.get("password").value;
              this.auth
                .loginUser(e, n)
                .then(function () {
                  (t.loading = !1), t.router.navigate(["/sauces"]);
                })
                .catch(function (e) {
                  (t.loading = !1), (t.errorMsg = e.message);
                });
            }),
            t
          );
        })(),
        $g = Kn({
          encapsulation: 0,
          styles: [
            ["form[_ngcontent-%COMP%]{margin:2em auto;max-width:750px}"],
          ],
          data: {},
        });
      function Xg(t) {
        return ea(
          0,
          [
            (t()(),
            Li(
              0,
              0,
              null,
              null,
              1,
              "mat-spinner",
              [
                ["class", "mat-spinner mat-progress-spinner"],
                ["mode", "indeterminate"],
                ["role", "progressbar"],
              ],
              [
                [2, "_mat-animation-noopable", null],
                [4, "width", "px"],
                [4, "height", "px"],
              ],
              null,
              null,
              ey,
              Jm
            )),
            no(
              1,
              114688,
              null,
              0,
              _f,
              [rn, Zp, [2, Fs], [2, Zm], bf],
              null,
              null
            ),
          ],
          function (t, e) {
            t(e, 1, 0);
          },
          function (t, e) {
            t(
              e,
              0,
              0,
              Br(e, 1)._noopAnimations,
              Br(e, 1).diameter,
              Br(e, 1).diameter
            );
          }
        );
      }
      function Jg(t) {
        return ea(
          0,
          [
            (t()(),
            Li(
              0,
              0,
              null,
              null,
              1,
              "p",
              [["class", "text-danger"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), Ji(1, null, ["", ""])),
          ],
          null,
          function (t, e) {
            t(e, 1, 0, e.component.errorMsg);
          }
        );
      }
      function Yg(t) {
        return ea(
          0,
          [
            (t()(),
            Li(
              0,
              0,
              null,
              null,
              27,
              "form",
              [["novalidate", ""]],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null],
              ],
              [
                [null, "submit"],
                [null, "reset"],
              ],
              function (t, e, n) {
                var r = !0;
                return (
                  "submit" === e && (r = !1 !== Br(t, 2).onSubmit(n) && r),
                  "reset" === e && (r = !1 !== Br(t, 2).onReset() && r),
                  r
                );
              },
              null,
              null
            )),
            no(1, 16384, null, 0, Wy, [], null, null),
            no(
              2,
              540672,
              null,
              0,
              Ky,
              [
                [8, null],
                [8, null],
              ],
              { form: [0, "form"] },
              null
            ),
            ro(2048, null, uy, null, [Ky]),
            no(4, 16384, null, 0, fy, [[4, uy]], null, null),
            (t()(),
            Li(
              5,
              0,
              null,
              null,
              8,
              "div",
              [["class", "form-group"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Li(
              6,
              0,
              null,
              null,
              1,
              "label",
              [["for", "email"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), Ji(-1, null, ["Email"])),
            (t()(),
            Li(
              8,
              0,
              null,
              null,
              5,
              "input",
              [
                ["class", "form-control"],
                ["formControlName", "email"],
                ["id", "email"],
                ["type", "email"],
              ],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null],
              ],
              [
                [null, "input"],
                [null, "blur"],
                [null, "compositionstart"],
                [null, "compositionend"],
              ],
              function (t, e, n) {
                var r = !0;
                return (
                  "input" === e &&
                    (r = !1 !== Br(t, 9)._handleInput(n.target.value) && r),
                  "blur" === e && (r = !1 !== Br(t, 9).onTouched() && r),
                  "compositionstart" === e &&
                    (r = !1 !== Br(t, 9)._compositionStart() && r),
                  "compositionend" === e &&
                    (r = !1 !== Br(t, 9)._compositionEnd(n.target.value) && r),
                  r
                );
              },
              null,
              null
            )),
            no(9, 16384, null, 0, ay, [ln, rn, [2, iy]], null, null),
            ro(
              1024,
              null,
              ry,
              function (t) {
                return [t];
              },
              [ay]
            ),
            no(
              11,
              671744,
              null,
              0,
              Jy,
              [
                [3, uy],
                [8, null],
                [8, null],
                [6, ry],
                [2, Qy],
              ],
              { name: [0, "name"] },
              null
            ),
            ro(2048, null, cy, null, [Jy]),
            no(13, 16384, null, 0, py, [[4, cy]], null, null),
            (t()(),
            Li(
              14,
              0,
              null,
              null,
              8,
              "div",
              [["class", "form-group"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Li(
              15,
              0,
              null,
              null,
              1,
              "label",
              [["for", "password"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), Ji(-1, null, ["Password"])),
            (t()(),
            Li(
              17,
              0,
              null,
              null,
              5,
              "input",
              [
                ["class", "form-control"],
                ["formControlName", "password"],
                ["id", "password"],
                ["type", "password"],
              ],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null],
              ],
              [
                [null, "input"],
                [null, "blur"],
                [null, "compositionstart"],
                [null, "compositionend"],
              ],
              function (t, e, n) {
                var r = !0;
                return (
                  "input" === e &&
                    (r = !1 !== Br(t, 18)._handleInput(n.target.value) && r),
                  "blur" === e && (r = !1 !== Br(t, 18).onTouched() && r),
                  "compositionstart" === e &&
                    (r = !1 !== Br(t, 18)._compositionStart() && r),
                  "compositionend" === e &&
                    (r = !1 !== Br(t, 18)._compositionEnd(n.target.value) && r),
                  r
                );
              },
              null,
              null
            )),
            no(18, 16384, null, 0, ay, [ln, rn, [2, iy]], null, null),
            ro(
              1024,
              null,
              ry,
              function (t) {
                return [t];
              },
              [ay]
            ),
            no(
              20,
              671744,
              null,
              0,
              Jy,
              [
                [3, uy],
                [8, null],
                [8, null],
                [6, ry],
                [2, Qy],
              ],
              { name: [0, "name"] },
              null
            ),
            ro(2048, null, cy, null, [Jy]),
            no(22, 16384, null, 0, py, [[4, cy]], null, null),
            (t()(),
            Li(
              23,
              0,
              null,
              null,
              2,
              "button",
              [
                ["color", "primary"],
                ["mat-raised-button", ""],
              ],
              [
                [1, "disabled", 0],
                [2, "_mat-animation-noopable", null],
              ],
              [[null, "click"]],
              function (t, e, n) {
                var r = !0;
                return (
                  "click" === e && (r = !1 !== t.component.onLogin() && r), r
                );
              },
              sg,
              ag
            )),
            no(
              24,
              180224,
              null,
              0,
              og,
              [rn, tf, [2, Zm]],
              { disabled: [0, "disabled"], color: [1, "color"] },
              null
            ),
            (t()(), Ji(-1, 0, ["LOGIN"])),
            (t()(), Fi(16777216, null, null, 1, null, Jg)),
            no(27, 16384, null, 0, As, [An, On], { ngIf: [0, "ngIf"] }, null),
          ],
          function (t, e) {
            var n = e.component;
            t(e, 2, 0, n.loginForm),
              t(e, 11, 0, "email"),
              t(e, 20, 0, "password"),
              t(e, 24, 0, n.loginForm.invalid, "primary"),
              t(e, 27, 0, n.errorMsg);
          },
          function (t, e) {
            t(
              e,
              0,
              0,
              Br(e, 4).ngClassUntouched,
              Br(e, 4).ngClassTouched,
              Br(e, 4).ngClassPristine,
              Br(e, 4).ngClassDirty,
              Br(e, 4).ngClassValid,
              Br(e, 4).ngClassInvalid,
              Br(e, 4).ngClassPending
            ),
              t(
                e,
                8,
                0,
                Br(e, 13).ngClassUntouched,
                Br(e, 13).ngClassTouched,
                Br(e, 13).ngClassPristine,
                Br(e, 13).ngClassDirty,
                Br(e, 13).ngClassValid,
                Br(e, 13).ngClassInvalid,
                Br(e, 13).ngClassPending
              ),
              t(
                e,
                17,
                0,
                Br(e, 22).ngClassUntouched,
                Br(e, 22).ngClassTouched,
                Br(e, 22).ngClassPristine,
                Br(e, 22).ngClassDirty,
                Br(e, 22).ngClassValid,
                Br(e, 22).ngClassInvalid,
                Br(e, 22).ngClassPending
              ),
              t(
                e,
                23,
                0,
                Br(e, 24).disabled || null,
                "NoopAnimations" === Br(e, 24)._animationMode
              );
          }
        );
      }
      function tv(t) {
        return ea(
          0,
          [
            (t()(), Fi(16777216, null, null, 1, null, Xg)),
            no(1, 16384, null, 0, As, [An, On], { ngIf: [0, "ngIf"] }, null),
            (t()(), Fi(16777216, null, null, 1, null, Yg)),
            no(3, 16384, null, 0, As, [An, On], { ngIf: [0, "ngIf"] }, null),
          ],
          function (t, e) {
            var n = e.component;
            t(e, 1, 0, n.loading), t(e, 3, 0, !n.loading);
          },
          null
        );
      }
      function ev(t) {
        return ea(
          0,
          [
            (t()(),
            Li(0, 0, null, null, 1, "app-login", [], null, null, null, tv, $g)),
            no(1, 114688, null, 0, Zg, [tg, Ug, cp], null, null),
          ],
          function (t, e) {
            t(e, 1, 0);
          },
          null
        );
      }
      var nv = Nr("app-login", Zg, ev, {}, {}, []),
        rv = (function () {
          function t(t, e) {
            (this.http = t),
              (this.auth = e),
              (this.sauces$ = new T()),
              (this.tempSauces = [
                {
                  _id: "eizomfhazo",
                  name: "The Last Dab",
                  manufacturer: "Heatonist",
                  description:
                    'CAUTION! The Last Dab—the hottest sauce on Hot Ones, known for turning guests and fans alike into stuttering, fire-breathing lunatics—just got even crazier. The Last Dab first took the world by storm as the only sauce made with Smokin\' Ed Currie\'s infamous "Pepper X." This XX-rated edition gets its one-two punch of heat from addition of the equally lethal "Chocolate Pepper X." All you need is a dab to light the inferno and experience the Hot Ones tradition.',
                  heat: 10,
                  likes: 100,
                  dislikes: 0,
                  imageUrl:
                    "https://cdn.shopify.com/s/files/1/2086/9287/products/LAstdabReduxx_1024x1024-1_1024x1024.jpg?v=1527778720",
                  mainPepper: "Pepper X",
                  usersLiked: [],
                  usersDisliked: [],
                },
                {
                  _id: "oimhoiohmhoih",
                  name: "Los Calientes",
                  manufacturer: "Heatonist",
                  description:
                    "Hot Ones is the show where celebrities divulge their deepest secrets while eating progressively hotter wings. The middle of the lineup is where hot sauce magic happens—the perfect sweet spot between maximum flavor and pleasing heat. Inspired by our favorite Cali-Mex flavors, Los Calientes surfs over the palate with a punchy, smoky blend...",
                  heat: 5,
                  likes: 100,
                  dislikes: 0,
                  imageUrl:
                    "https://cdn.shopify.com/s/files/1/2086/9287/products/LOS_CALIENTES1_1024x1024.jpg?v=1527709467",
                  mainPepper: "Serrano",
                  usersLiked: [],
                  usersDisliked: [],
                },
                {
                  _id: "oimjoijlhui",
                  name: "Black Garlic",
                  manufacturer: "Bravado Spice Company",
                  description:
                    "Team Bravado is back at it with an elevated offering where Carolina Reaper meets aged black garlic. The sweetness of the slowly cooked garlic tempers the initial bitter burn of the Reaper, but not for long... This is a biting hot sauce you'll want in marinades, sauces, dressings, and on those garlic wings! ",
                  heat: 6,
                  likes: 100,
                  dislikes: 0,
                  imageUrl:
                    "https://cdn.shopify.com/s/files/1/2086/9287/products/bravado-blackgarlichotsauce_1024x1024.jpg?v=1527270029",
                  mainPepper: "Carolina Reaper",
                  usersLiked: [],
                  usersDisliked: [],
                },
                {
                  _id: "sildjhv",
                  name: "Smoked Onion",
                  manufacturer: "Butterfly Bakery",
                  description:
                    "The makers at Butterfly Bakery smoke Vermont onions with maplewood to mix with red jalapeños for this sweet and tangy sauce. Great on everything from bagels lox & cream cheese to hummus to pork and whatever else you can name. The medium heat level makes it the perfect smoky sauce for anyone!",
                  heat: 3,
                  likes: 100,
                  dislikes: 0,
                  imageUrl:
                    "https://cdn.shopify.com/s/files/1/2086/9287/products/smokedonion1_1024x1024_copy_1024x1024.jpg?v=1538413599",
                  mainPepper: "Jalapeños",
                  usersLiked: [],
                  usersDisliked: [],
                },
                {
                  _id: "eroimfgjlfh",
                  name: "Blair's Ultra Death Sauce",
                  manufacturer: "Blair's",
                  description:
                    "Blair's Ultra Death has established itself as a bit of a legend within the hot sauce world.\n\nIf there's one thing that creator Blair Lazar does well it's retaining the flavour in his super-hot sauces. They'll melt your face off for sure, but despite the extract they still taste damned fine.\n\nJust to emphasise the seriousness of the heat we're dealing with here, all Blair's super-hot sauces in the Death range now come in a nifty coffin box with his trademark skull keyring attached to the bottle.",
                  heat: 9,
                  likes: 100,
                  dislikes: 0,
                  imageUrl:
                    "https://www.chilliworld.com/content/images/thumbs/0000827_blairs-ultra-death-sauce-in-a-coffin_550.jpeg",
                  mainPepper: "Carolina Reaper",
                  usersLiked: [],
                  usersDisliked: [],
                },
              ]);
          }
          return (
            (t.prototype.getSauces = function () {
              var t = this;
              this.http.get("http://localhost:3000/api/sauces").subscribe(
                function (e) {
                  t.sauces$.next(e);
                },
                function (e) {
                  t.sauces$.next([]), console.error(e.error.message);
                }
              );
            }),
            (t.prototype.getSauceById = function (t) {
              var e = this;
              return new Promise(function (n, r) {
                e.http.get("http://localhost:3000/api/sauces/" + t).subscribe(
                  function (t) {
                    n(t);
                  },
                  function (t) {
                    r(t.error.message);
                  }
                );
              });
            }),
            (t.prototype.likeSauce = function (t, e) {
              var n = this;
              return new Promise(function (r, o) {
                n.http
                  .post("http://localhost:3000/api/sauces/" + t + "/like", {
                    userId: n.auth.getUserId(),
                    like: e ? 1 : 0,
                  })
                  .subscribe(
                    function (t) {
                      r(e);
                    },
                    function (t) {
                      o(t.error.message);
                    }
                  );
              });
            }),
            (t.prototype.dislikeSauce = function (t, e) {
              var n = this;
              return new Promise(function (r, o) {
                n.http
                  .post("http://localhost:3000/api/sauces/" + t + "/like", {
                    userId: n.auth.getUserId(),
                    like: e ? -1 : 0,
                  })
                  .subscribe(
                    function (t) {
                      r(e);
                    },
                    function (t) {
                      o(t.error.message);
                    }
                  );
              });
            }),
            (t.prototype.createSauce = function (t, e) {
              var n = this;
              return new Promise(function (r, o) {
                var i = new FormData();
                i.append("sauce", JSON.stringify(t)),
                  i.append("image", e),
                  n.http.post("http://localhost:3000/api/sauces", i).subscribe(
                    function (t) {
                      r(t);
                    },
                    function (t) {
                      o(t.error.message);
                    }
                  );
              });
            }),
            (t.prototype.modifySauce = function (t, e, n) {
              var r = this;
              return new Promise(function (o, i) {
                if ("string" == typeof n)
                  r.http
                    .put("http://localhost:3000/api/sauces/" + t, e)
                    .subscribe(
                      function (t) {
                        return o(t);
                      },
                      function (t) {
                        return i(t.error.message);
                      }
                    );
                else {
                  var a = new FormData();
                  a.append("sauce", JSON.stringify(e)),
                    a.append("image", n),
                    r.http
                      .put("http://localhost:3000/api/sauces/" + t, a)
                      .subscribe(
                        function (t) {
                          return o(t);
                        },
                        function (t) {
                          return i(t.error.message);
                        }
                      );
                }
              });
            }),
            (t.prototype.deleteSauce = function (t) {
              var e = this;
              return new Promise(function (n, r) {
                e.http
                  .delete("http://localhost:3000/api/sauces/" + t)
                  .subscribe(
                    function (t) {
                      n(t);
                    },
                    function (t) {
                      r(t.error.message);
                    }
                  );
              });
            }),
            (t.ngInjectableDef = ct({
              factory: function () {
                return new t(Rt(Sg), Rt(Ug));
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })(),
        ov = (function () {
          function t(t, e) {
            (this.sauce = t), (this.router = e);
          }
          return (
            (t.prototype.ngOnInit = function () {
              var t = this;
              (this.loading = !0),
                (this.sauceSub = this.sauce.sauces$.subscribe(
                  function (e) {
                    (t.sauces = e), (t.loading = !1), (t.errorMsg = null);
                  },
                  function (e) {
                    (t.errorMsg = JSON.stringify(e)), (t.loading = !1);
                  }
                )),
                this.sauce.getSauces();
            }),
            (t.prototype.onClickSauce = function (t) {
              this.router.navigate(["sauce", t]);
            }),
            t
          );
        })(),
        iv = Kn({
          encapsulation: 0,
          styles: [
            [
              ".sauce-list[_ngcontent-%COMP%]{display:flex;justify-content:space-around;flex-wrap:wrap}.sauce-list-item[_ngcontent-%COMP%]{text-align:center;width:220px;transition:all .1s ease-in-out;cursor:pointer}.sauce-list-item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:200px;max-height:250px}.sauce-list-item[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin:0;font-weight:500}.sauce-list-item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0}.sauce-list-item[_ngcontent-%COMP%]:hover{transform:scale(1.05);box-shadow:1px 1px 20px rgba(120,120,120,.3)}.list-title[_ngcontent-%COMP%]{text-align:center;margin:2em auto}",
            ],
          ],
          data: {},
        });
      function av(t) {
        return ea(
          0,
          [
            (t()(),
            Li(
              0,
              0,
              null,
              null,
              1,
              "mat-spinner",
              [
                ["class", "mat-spinner mat-progress-spinner"],
                ["mode", "indeterminate"],
                ["role", "progressbar"],
              ],
              [
                [2, "_mat-animation-noopable", null],
                [4, "width", "px"],
                [4, "height", "px"],
              ],
              null,
              null,
              ey,
              Jm
            )),
            no(
              1,
              114688,
              null,
              0,
              _f,
              [rn, Zp, [2, Fs], [2, Zm], bf],
              null,
              null
            ),
          ],
          function (t, e) {
            t(e, 1, 0);
          },
          function (t, e) {
            t(
              e,
              0,
              0,
              Br(e, 1)._noopAnimations,
              Br(e, 1).diameter,
              Br(e, 1).diameter
            );
          }
        );
      }
      function sv(t) {
        return ea(
          0,
          [
            (t()(),
            Li(0, 0, null, null, 1, "p", [], null, null, null, null, null)),
            (t()(), Ji(-1, null, [" No sauces to display!\n"])),
          ],
          null,
          null
        );
      }
      function uv(t) {
        return ea(
          0,
          [
            (t()(),
            Li(
              0,
              0,
              null,
              null,
              1,
              "p",
              [["class", "list-title"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), Ji(-1, null, ["THE SAUCES"])),
          ],
          null,
          null
        );
      }
      function lv(t) {
        return ea(
          0,
          [
            (t()(),
            Li(
              0,
              0,
              null,
              null,
              6,
              "div",
              [["class", "sauce-list-item"]],
              null,
              [[null, "click"]],
              function (t, e, n) {
                var r = !0;
                return (
                  "click" === e &&
                    (r =
                      !1 !==
                        t.component.onClickSauce(t.context.$implicit._id) && r),
                  r
                );
              },
              null,
              null
            )),
            (t()(),
            Li(
              1,
              0,
              null,
              null,
              0,
              "img",
              [],
              [[8, "src", 4]],
              null,
              null,
              null,
              null
            )),
            (t()(),
            Li(2, 0, null, null, 2, "h4", [], null, null, null, null, null)),
            (t()(), Ji(3, null, ["", ""])),
            Xi(128, 4, new Array(2)),
            (t()(),
            Li(5, 0, null, null, 1, "p", [], null, null, null, null, null)),
            (t()(), Ji(6, null, ["Heat: ", "/10"])),
          ],
          null,
          function (t, e) {
            t(e, 1, 0, e.context.$implicit.imageUrl);
            var n = (function (t, e, n, r) {
              if (ze.isWrapped(r)) {
                r = ze.unwrap(r);
                var o = t.def.nodes[3].bindingIndex + 0,
                  i = ze.unwrap(t.oldValues[o]);
                t.oldValues[o] = new ze(i);
              }
              return r;
            })(
              e,
              0,
              0,
              t(e, 4, 0, Br(e.parent.parent, 0), e.context.$implicit.name)
            );
            t(e, 3, 0, n), t(e, 6, 0, e.context.$implicit.heat);
          }
        );
      }
      function cv(t) {
        return ea(
          0,
          [
            (t()(),
            Li(
              0,
              0,
              null,
              null,
              2,
              "div",
              [["class", "sauce-list"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), Fi(16777216, null, null, 1, null, lv)),
            no(
              2,
              278528,
              null,
              0,
              Os,
              [An, On, En],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
          ],
          function (t, e) {
            t(e, 2, 0, e.component.sauces);
          },
          null
        );
      }
      function hv(t) {
        return ea(
          0,
          [
            ((e = 0), (n = Ms), (r = []), oo(-1, (e |= 16), null, 0, n, n, r)),
            (t()(), Fi(16777216, null, null, 1, null, av)),
            no(2, 16384, null, 0, As, [An, On], { ngIf: [0, "ngIf"] }, null),
            (t()(), Fi(16777216, null, null, 1, null, sv)),
            no(4, 16384, null, 0, As, [An, On], { ngIf: [0, "ngIf"] }, null),
            (t()(), Fi(16777216, null, null, 1, null, uv)),
            no(6, 16384, null, 0, As, [An, On], { ngIf: [0, "ngIf"] }, null),
            (t()(), Fi(16777216, null, null, 1, null, cv)),
            no(8, 16384, null, 0, As, [An, On], { ngIf: [0, "ngIf"] }, null),
          ],
          function (t, e) {
            var n = e.component;
            t(e, 2, 0, n.loading),
              t(e, 4, 0, !n.loading && n.sauces.length <= 0),
              t(e, 6, 0, !n.loading && n.sauces.length > 0),
              t(e, 8, 0, !n.loading && n.sauces.length > 0);
          },
          null
        );
        var e, n, r;
      }
      function pv(t) {
        return ea(
          0,
          [
            (t()(),
            Li(
              0,
              0,
              null,
              null,
              1,
              "app-sauce-list",
              [],
              null,
              null,
              null,
              hv,
              iv
            )),
            no(1, 114688, null, 0, ov, [rv, cp], null, null),
          ],
          function (t, e) {
            t(e, 1, 0);
          },
          null
        );
      }
      var fv = Nr("app-sauce-list", ov, pv, {}, {}, []),
        dv = (function () {
          function t(t, e, n, r) {
            (this.sauces = t),
              (this.route = e),
              (this.auth = n),
              (this.router = r);
          }
          return (
            (t.prototype.ngOnInit = function () {
              var t = this;
              (this.userId = this.auth.getUserId()),
                (this.loading = !0),
                this.route.params.subscribe(function (e) {
                  t.sauces.getSauceById(e.id).then(function (e) {
                    (t.sauce = e),
                      (t.loading = !1),
                      e.usersLiked.find(function (e) {
                        return e === t.userId;
                      })
                        ? (t.liked = !0)
                        : e.usersDisliked.find(function (e) {
                            return e === t.userId;
                          }) && (t.disliked = !0);
                  });
                }),
                (this.userId = this.auth.getUserId());
            }),
            (t.prototype.onLike = function () {
              var t = this;
              if (this.disliked) return 0;
              (this.likePending = !0),
                this.sauces
                  .likeSauce(this.sauce._id, !this.liked)
                  .then(function (e) {
                    (t.likePending = !1),
                      (t.liked = e),
                      e ? t.sauce.likes++ : t.sauce.likes--;
                  });
            }),
            (t.prototype.onDislike = function () {
              var t = this;
              if (this.liked) return 0;
              (this.likePending = !0),
                this.sauces
                  .dislikeSauce(this.sauce._id, !this.disliked)
                  .then(function (e) {
                    (t.likePending = !1),
                      (t.disliked = e),
                      e ? t.sauce.dislikes++ : t.sauce.dislikes--;
                  });
            }),
            (t.prototype.onBack = function () {
              this.router.navigate(["/sauces"]);
            }),
            (t.prototype.onModify = function () {
              this.router.navigate(["/modify-sauce", this.sauce._id]);
            }),
            (t.prototype.onDelete = function () {
              var t = this;
              (this.loading = !0),
                this.sauces
                  .deleteSauce(this.sauce._id)
                  .then(function (e) {
                    console.log(e.message),
                      (t.loading = !1),
                      t.router.navigate(["/sauces"]);
                  })
                  .catch(function (e) {
                    (t.loading = !1),
                      (t.errorMessage = e.message),
                      console.error(e);
                  });
            }),
            t
          );
        })(),
        mv = Kn({
          encapsulation: 0,
          styles: [
            [
              ".sauce-container[_ngcontent-%COMP%]{display:flex}.sauce-container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-height:70vh;flex:1}.sauce-info[_ngcontent-%COMP%]{padding:40px 20px;flex:1}.manufacturer[_ngcontent-%COMP%], .sauce-name[_ngcontent-%COMP%]{margin:0}.like-buttons[_ngcontent-%COMP%]{display:flex}.like-buttons[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{margin-right:.5em;cursor:pointer}.dislikes[_ngcontent-%COMP%], .likes[_ngcontent-%COMP%]{margin:0 .4em}.liked[_ngcontent-%COMP%]{color:#33db00}.disliked[_ngcontent-%COMP%]{color:#db3300}.like[_ngcontent-%COMP%]:hover{color:#33db00}.dislike[_ngcontent-%COMP%]{transform:scaleX(-1) translateY(5px)}.dislike[_ngcontent-%COMP%]:hover{color:#db3300}.disabled[_ngcontent-%COMP%]{cursor:none;color:#bebebe}.disabled[_ngcontent-%COMP%]:hover{color:#bebebe}.control-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin:1em 1em 0 0}",
            ],
          ],
          data: {},
        });
      function yv(t) {
        return ea(
          0,
          [
            (t()(),
            Li(
              0,
              0,
              null,
              null,
              1,
              "mat-spinner",
              [
                ["class", "mat-spinner mat-progress-spinner"],
                ["mode", "indeterminate"],
                ["role", "progressbar"],
              ],
              [
                [2, "_mat-animation-noopable", null],
                [4, "width", "px"],
                [4, "height", "px"],
              ],
              null,
              null,
              ey,
              Jm
            )),
            no(
              1,
              114688,
              null,
              0,
              _f,
              [rn, Zp, [2, Fs], [2, Zm], bf],
              null,
              null
            ),
          ],
          function (t, e) {
            t(e, 1, 0);
          },
          function (t, e) {
            t(
              e,
              0,
              0,
              Br(e, 1)._noopAnimations,
              Br(e, 1).diameter,
              Br(e, 1).diameter
            );
          }
        );
      }
      function gv(t) {
        return ea(
          0,
          [
            (t()(),
            Li(
              0,
              0,
              null,
              null,
              14,
              "div",
              [["class", "like-buttons"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Li(
              1,
              0,
              null,
              null,
              6,
              "div",
              [["class", "likes"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Li(
              2,
              0,
              null,
              null,
              3,
              "i",
              [["class", "like fa-thumbs-up fa-lg"]],
              null,
              [[null, "click"]],
              function (t, e, n) {
                var r = !0;
                return (
                  "click" === e && (r = !1 !== t.component.onLike() && r), r
                );
              },
              null,
              null
            )),
            ro(512, null, Ss, ks, [En, Sn, rn, ln]),
            no(
              4,
              278528,
              null,
              0,
              Ts,
              [Ss],
              { klass: [0, "klass"], ngClass: [1, "ngClass"] },
              null
            ),
            $i(5, { "fas liked": 0, far: 1, disabled: 2 }),
            (t()(),
            Li(6, 0, null, null, 1, "span", [], null, null, null, null, null)),
            (t()(), Ji(7, null, ["", ""])),
            (t()(),
            Li(
              8,
              0,
              null,
              null,
              6,
              "div",
              [["class", "dislikes"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Li(
              9,
              0,
              null,
              null,
              3,
              "i",
              [["class", "dislike fa-thumbs-down fa-lg"]],
              null,
              [[null, "click"]],
              function (t, e, n) {
                var r = !0;
                return (
                  "click" === e && (r = !1 !== t.component.onDislike() && r), r
                );
              },
              null,
              null
            )),
            ro(512, null, Ss, ks, [En, Sn, rn, ln]),
            no(
              11,
              278528,
              null,
              0,
              Ts,
              [Ss],
              { klass: [0, "klass"], ngClass: [1, "ngClass"] },
              null
            ),
            $i(12, { "fas disliked": 0, far: 1, disabled: 2 }),
            (t()(),
            Li(13, 0, null, null, 1, "span", [], null, null, null, null, null)),
            (t()(), Ji(14, null, ["", ""])),
          ],
          function (t, e) {
            var n = e.component,
              r = t(e, 5, 0, n.liked, !n.liked, n.disliked);
            t(e, 4, 0, "like fa-thumbs-up fa-lg", r);
            var o = t(e, 12, 0, n.disliked, !n.disliked, n.liked);
            t(e, 11, 0, "dislike fa-thumbs-down fa-lg", o);
          },
          function (t, e) {
            var n = e.component;
            t(e, 7, 0, n.sauce.likes), t(e, 14, 0, n.sauce.dislikes);
          }
        );
      }
      function vv(t) {
        return ea(
          0,
          [
            (t()(),
            Li(
              0,
              0,
              null,
              null,
              2,
              "div",
              [["class", "like-pending"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Li(
              1,
              0,
              null,
              null,
              1,
              "mat-spinner",
              [
                ["class", "white-spinner mat-spinner mat-progress-spinner"],
                ["mode", "indeterminate"],
                ["role", "progressbar"],
              ],
              [
                [2, "_mat-animation-noopable", null],
                [4, "width", "px"],
                [4, "height", "px"],
              ],
              null,
              null,
              ey,
              Jm
            )),
            no(
              2,
              114688,
              null,
              0,
              _f,
              [rn, Zp, [2, Fs], [2, Zm], bf],
              null,
              null
            ),
          ],
          function (t, e) {
            t(e, 2, 0);
          },
          function (t, e) {
            t(
              e,
              1,
              0,
              Br(e, 2)._noopAnimations,
              Br(e, 2).diameter,
              Br(e, 2).diameter
            );
          }
        );
      }
      function bv(t) {
        return ea(
          0,
          [
            (t()(),
            Li(
              0,
              0,
              null,
              null,
              2,
              "button",
              [
                ["color", "primary"],
                ["mat-raised-button", ""],
              ],
              [
                [1, "disabled", 0],
                [2, "_mat-animation-noopable", null],
              ],
              [[null, "click"]],
              function (t, e, n) {
                var r = !0;
                return (
                  "click" === e && (r = !1 !== t.component.onModify() && r), r
                );
              },
              sg,
              ag
            )),
            no(
              1,
              180224,
              null,
              0,
              og,
              [rn, tf, [2, Zm]],
              { color: [0, "color"] },
              null
            ),
            (t()(), Ji(-1, 0, ["MODIFY"])),
          ],
          function (t, e) {
            t(e, 1, 0, "primary");
          },
          function (t, e) {
            t(
              e,
              0,
              0,
              Br(e, 1).disabled || null,
              "NoopAnimations" === Br(e, 1)._animationMode
            );
          }
        );
      }
      function _v(t) {
        return ea(
          0,
          [
            (t()(),
            Li(
              0,
              0,
              null,
              null,
              2,
              "button",
              [
                ["color", "warn"],
                ["mat-raised-button", ""],
              ],
              [
                [1, "disabled", 0],
                [2, "_mat-animation-noopable", null],
              ],
              [[null, "click"]],
              function (t, e, n) {
                var r = !0;
                return (
                  "click" === e && (r = !1 !== t.component.onDelete() && r), r
                );
              },
              sg,
              ag
            )),
            no(
              1,
              180224,
              null,
              0,
              og,
              [rn, tf, [2, Zm]],
              { color: [0, "color"] },
              null
            ),
            (t()(), Ji(-1, 0, ["DELETE"])),
          ],
          function (t, e) {
            t(e, 1, 0, "warn");
          },
          function (t, e) {
            t(
              e,
              0,
              0,
              Br(e, 1).disabled || null,
              "NoopAnimations" === Br(e, 1)._animationMode
            );
          }
        );
      }
      function wv(t) {
        return ea(
          0,
          [
            (t()(),
            Li(
              0,
              0,
              null,
              null,
              22,
              "div",
              [["class", "sauce-container"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Li(
              1,
              0,
              null,
              null,
              0,
              "img",
              [["alt", ""]],
              [[8, "src", 4]],
              null,
              null,
              null,
              null
            )),
            (t()(),
            Li(
              2,
              0,
              null,
              null,
              20,
              "div",
              [["class", "sauce-info"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Li(
              3,
              0,
              null,
              null,
              1,
              "h1",
              [["class", "sauce-name"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), Ji(4, null, ["", ""])),
            (t()(),
            Li(
              5,
              0,
              null,
              null,
              1,
              "p",
              [["class", "manufacturer"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), Ji(6, null, ["by ", ""])),
            (t()(),
            Li(7, 0, null, null, 1, "h3", [], null, null, null, null, null)),
            (t()(), Ji(-1, null, ["Description"])),
            (t()(),
            Li(9, 0, null, null, 1, "p", [], null, null, null, null, null)),
            (t()(), Ji(10, null, ["", ""])),
            (t()(), Fi(16777216, null, null, 1, null, gv)),
            no(12, 16384, null, 0, As, [An, On], { ngIf: [0, "ngIf"] }, null),
            (t()(), Fi(16777216, null, null, 1, null, vv)),
            no(14, 16384, null, 0, As, [An, On], { ngIf: [0, "ngIf"] }, null),
            (t()(),
            Li(
              15,
              0,
              null,
              null,
              7,
              "div",
              [["class", "control-buttons"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Li(
              16,
              0,
              null,
              null,
              2,
              "button",
              [["mat-raised-button", ""]],
              [
                [1, "disabled", 0],
                [2, "_mat-animation-noopable", null],
              ],
              [[null, "click"]],
              function (t, e, n) {
                var r = !0;
                return (
                  "click" === e && (r = !1 !== t.component.onBack() && r), r
                );
              },
              sg,
              ag
            )),
            no(17, 180224, null, 0, og, [rn, tf, [2, Zm]], null, null),
            (t()(), Ji(-1, 0, ["BACK"])),
            (t()(), Fi(16777216, null, null, 1, null, bv)),
            no(20, 16384, null, 0, As, [An, On], { ngIf: [0, "ngIf"] }, null),
            (t()(), Fi(16777216, null, null, 1, null, _v)),
            no(22, 16384, null, 0, As, [An, On], { ngIf: [0, "ngIf"] }, null),
          ],
          function (t, e) {
            var n = e.component;
            t(e, 12, 0, !n.likePending),
              t(e, 14, 0, n.likePending),
              t(e, 20, 0, n.userId === n.sauce.userId),
              t(e, 22, 0, n.userId === n.sauce.userId);
          },
          function (t, e) {
            var n = e.component;
            t(e, 1, 0, null == n.sauce ? null : n.sauce.imageUrl),
              t(e, 4, 0, null == n.sauce ? null : n.sauce.name),
              t(e, 6, 0, null == n.sauce ? null : n.sauce.manufacturer),
              t(e, 10, 0, n.sauce.description),
              t(
                e,
                16,
                0,
                Br(e, 17).disabled || null,
                "NoopAnimations" === Br(e, 17)._animationMode
              );
          }
        );
      }
      function Cv(t) {
        return ea(
          0,
          [
            (t()(), Fi(16777216, null, null, 1, null, yv)),
            no(1, 16384, null, 0, As, [An, On], { ngIf: [0, "ngIf"] }, null),
            (t()(), Fi(16777216, null, null, 1, null, wv)),
            no(3, 16384, null, 0, As, [An, On], { ngIf: [0, "ngIf"] }, null),
          ],
          function (t, e) {
            var n = e.component;
            t(e, 1, 0, n.loading), t(e, 3, 0, !n.loading);
          },
          null
        );
      }
      function Ev(t) {
        return ea(
          0,
          [
            (t()(),
            Li(
              0,
              0,
              null,
              null,
              1,
              "app-single-sauce",
              [],
              null,
              null,
              null,
              Cv,
              mv
            )),
            no(1, 114688, null, 0, dv, [rv, th, Ug, cp], null, null),
          ],
          function (t, e) {
            t(e, 1, 0);
          },
          null
        );
      }
      var Sv = Nr("app-single-sauce", dv, Ev, {}, {}, []),
        kv = (function () {
          return function () {};
        })(),
        Tv = (function () {
          function t(t, e, n, r, o) {
            (this.formBuilder = t),
              (this.route = e),
              (this.router = n),
              (this.sauces = r),
              (this.auth = o);
          }
          return (
            (t.prototype.ngOnInit = function () {
              var t = this;
              (this.loading = !0),
                this.route.params.subscribe(function (e) {
                  e.id
                    ? ((t.mode = "edit"),
                      t.sauces
                        .getSauceById(e.id)
                        .then(function (e) {
                          (t.sauce = e), t.initModifyForm(e), (t.loading = !1);
                        })
                        .catch(function (e) {
                          t.errorMsg = JSON.stringify(e);
                        }))
                    : ((t.mode = "new"), t.initEmptyForm(), (t.loading = !1));
                });
            }),
            (t.prototype.initEmptyForm = function () {
              var t = this;
              (this.sauceForm = this.formBuilder.group({
                name: [null, yy.required],
                manufacturer: [null, yy.required],
                description: [null, yy.required],
                image: [null, yy.required],
                mainPepper: [null, yy.required],
                heat: [1, yy.required],
                heatValue: [{ value: 1, disabled: !0 }],
              })),
                this.sauceForm.get("heat").valueChanges.subscribe(function (e) {
                  t.sauceForm.get("heatValue").setValue(e);
                });
            }),
            (t.prototype.initModifyForm = function (t) {
              var e = this;
              (this.sauceForm = this.formBuilder.group({
                name: [this.sauce.name, yy.required],
                manufacturer: [this.sauce.manufacturer, yy.required],
                description: [this.sauce.description, yy.required],
                image: [this.sauce.imageUrl, yy.required],
                mainPepper: [this.sauce.mainPepper, yy.required],
                heat: [this.sauce.heat, yy.required],
                heatValue: [{ value: this.sauce.heat, disabled: !0 }],
              })),
                this.sauceForm.get("heat").valueChanges.subscribe(function (t) {
                  e.sauceForm.get("heatValue").setValue(t);
                }),
                (this.imagePreview = this.sauce.imageUrl);
            }),
            (t.prototype.onSubmit = function () {
              var t = this;
              this.loading = !0;
              var e = new kv();
              (e.name = this.sauceForm.get("name").value),
                (e.manufacturer = this.sauceForm.get("manufacturer").value),
                (e.description = this.sauceForm.get("description").value),
                (e.mainPepper = this.sauceForm.get("mainPepper").value),
                (e.heat = this.sauceForm.get("heat").value),
                (e.userId = this.auth.getUserId()),
                "new" === this.mode
                  ? this.sauces
                      .createSauce(e, this.sauceForm.get("image").value)
                      .then(function (e) {
                        console.log(e.message),
                          (t.loading = !1),
                          t.router.navigate(["/sauces"]);
                      })
                      .catch(function (e) {
                        console.error(e),
                          (t.loading = !1),
                          (t.errorMsg = e.message);
                      })
                  : "edit" === this.mode &&
                    this.sauces
                      .modifySauce(
                        this.sauce._id,
                        e,
                        this.sauceForm.get("image").value
                      )
                      .then(function (e) {
                        console.log(e.message),
                          (t.loading = !1),
                          t.router.navigate(["/sauces"]);
                      })
                      .catch(function (e) {
                        console.error(e),
                          (t.loading = !1),
                          (t.errorMsg = e.message);
                      });
            }),
            (t.prototype.onFileAdded = function (t) {
              var e = this,
                n = t.target.files[0];
              this.sauceForm.get("image").setValue(n),
                this.sauceForm.updateValueAndValidity();
              var r = new FileReader();
              (r.onload = function () {
                e.imagePreview = r.result;
              }),
                r.readAsDataURL(n);
            }),
            t
          );
        })(),
        xv = Kn({
          encapsulation: 0,
          styles: [
            [
              "form[_ngcontent-%COMP%]{margin:2em auto;max-width:750px}.heat-range[_ngcontent-%COMP%]{width:60%;display:block}.heat-container[_ngcontent-%COMP%]{display:flex}.heat-reading[_ngcontent-%COMP%]{width:5em;margin-left:1.5em;background-color:#fff}input[type=file][_ngcontent-%COMP%]{display:none}",
            ],
          ],
          data: {},
        });
      function Ov(t) {
        return ea(
          0,
          [
            (t()(),
            Li(
              0,
              0,
              null,
              null,
              1,
              "mat-spinner",
              [
                ["class", "mat-spinner mat-progress-spinner"],
                ["mode", "indeterminate"],
                ["role", "progressbar"],
              ],
              [
                [2, "_mat-animation-noopable", null],
                [4, "width", "px"],
                [4, "height", "px"],
              ],
              null,
              null,
              ey,
              Jm
            )),
            no(
              1,
              114688,
              null,
              0,
              _f,
              [rn, Zp, [2, Fs], [2, Zm], bf],
              null,
              null
            ),
          ],
          function (t, e) {
            t(e, 1, 0);
          },
          function (t, e) {
            t(
              e,
              0,
              0,
              Br(e, 1)._noopAnimations,
              Br(e, 1).diameter,
              Br(e, 1).diameter
            );
          }
        );
      }
      function Pv(t) {
        return ea(
          0,
          [
            (t()(),
            Li(
              0,
              0,
              null,
              null,
              0,
              "img",
              [["style", "max-height: 100px;display:block;margin-top:10px"]],
              [[8, "src", 4]],
              null,
              null,
              null,
              null
            )),
          ],
          null,
          function (t, e) {
            t(e, 0, 0, e.component.imagePreview);
          }
        );
      }
      function Av(t) {
        return ea(
          0,
          [
            (t()(),
            Li(
              0,
              0,
              null,
              null,
              68,
              "form",
              [["novalidate", ""]],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null],
              ],
              [
                [null, "submit"],
                [null, "reset"],
              ],
              function (t, e, n) {
                var r = !0;
                return (
                  "submit" === e && (r = !1 !== Br(t, 2).onSubmit(n) && r),
                  "reset" === e && (r = !1 !== Br(t, 2).onReset() && r),
                  r
                );
              },
              null,
              null
            )),
            no(1, 16384, null, 0, Wy, [], null, null),
            no(
              2,
              540672,
              null,
              0,
              Ky,
              [
                [8, null],
                [8, null],
              ],
              { form: [0, "form"] },
              null
            ),
            ro(2048, null, uy, null, [Ky]),
            no(4, 16384, null, 0, fy, [[4, uy]], null, null),
            (t()(),
            Li(
              5,
              0,
              null,
              null,
              8,
              "div",
              [["class", "form-group"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Li(
              6,
              0,
              null,
              null,
              1,
              "label",
              [["for", "name"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), Ji(-1, null, ["Name"])),
            (t()(),
            Li(
              8,
              0,
              null,
              null,
              5,
              "input",
              [
                ["class", "form-control"],
                ["formControlName", "name"],
                ["id", "name"],
                ["type", "text"],
              ],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null],
              ],
              [
                [null, "input"],
                [null, "blur"],
                [null, "compositionstart"],
                [null, "compositionend"],
              ],
              function (t, e, n) {
                var r = !0;
                return (
                  "input" === e &&
                    (r = !1 !== Br(t, 9)._handleInput(n.target.value) && r),
                  "blur" === e && (r = !1 !== Br(t, 9).onTouched() && r),
                  "compositionstart" === e &&
                    (r = !1 !== Br(t, 9)._compositionStart() && r),
                  "compositionend" === e &&
                    (r = !1 !== Br(t, 9)._compositionEnd(n.target.value) && r),
                  r
                );
              },
              null,
              null
            )),
            no(9, 16384, null, 0, ay, [ln, rn, [2, iy]], null, null),
            ro(
              1024,
              null,
              ry,
              function (t) {
                return [t];
              },
              [ay]
            ),
            no(
              11,
              671744,
              null,
              0,
              Jy,
              [
                [3, uy],
                [8, null],
                [8, null],
                [6, ry],
                [2, Qy],
              ],
              { name: [0, "name"] },
              null
            ),
            ro(2048, null, cy, null, [Jy]),
            no(13, 16384, null, 0, py, [[4, cy]], null, null),
            (t()(),
            Li(
              14,
              0,
              null,
              null,
              8,
              "div",
              [["class", "form-group"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Li(
              15,
              0,
              null,
              null,
              1,
              "label",
              [["for", "manufacturer"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), Ji(-1, null, ["Manufacturer"])),
            (t()(),
            Li(
              17,
              0,
              null,
              null,
              5,
              "input",
              [
                ["class", "form-control"],
                ["formControlName", "manufacturer"],
                ["id", "manufacturer"],
                ["type", "text"],
              ],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null],
              ],
              [
                [null, "input"],
                [null, "blur"],
                [null, "compositionstart"],
                [null, "compositionend"],
              ],
              function (t, e, n) {
                var r = !0;
                return (
                  "input" === e &&
                    (r = !1 !== Br(t, 18)._handleInput(n.target.value) && r),
                  "blur" === e && (r = !1 !== Br(t, 18).onTouched() && r),
                  "compositionstart" === e &&
                    (r = !1 !== Br(t, 18)._compositionStart() && r),
                  "compositionend" === e &&
                    (r = !1 !== Br(t, 18)._compositionEnd(n.target.value) && r),
                  r
                );
              },
              null,
              null
            )),
            no(18, 16384, null, 0, ay, [ln, rn, [2, iy]], null, null),
            ro(
              1024,
              null,
              ry,
              function (t) {
                return [t];
              },
              [ay]
            ),
            no(
              20,
              671744,
              null,
              0,
              Jy,
              [
                [3, uy],
                [8, null],
                [8, null],
                [6, ry],
                [2, Qy],
              ],
              { name: [0, "name"] },
              null
            ),
            ro(2048, null, cy, null, [Jy]),
            no(22, 16384, null, 0, py, [[4, cy]], null, null),
            (t()(),
            Li(
              23,
              0,
              null,
              null,
              8,
              "div",
              [["class", "form-group"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Li(
              24,
              0,
              null,
              null,
              1,
              "label",
              [["for", "description"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), Ji(-1, null, ["Description"])),
            (t()(),
            Li(
              26,
              0,
              null,
              null,
              5,
              "textarea",
              [
                ["class", "form-control"],
                ["formControlName", "description"],
                ["id", "description"],
                ["rows", "5"],
              ],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null],
              ],
              [
                [null, "input"],
                [null, "blur"],
                [null, "compositionstart"],
                [null, "compositionend"],
              ],
              function (t, e, n) {
                var r = !0;
                return (
                  "input" === e &&
                    (r = !1 !== Br(t, 27)._handleInput(n.target.value) && r),
                  "blur" === e && (r = !1 !== Br(t, 27).onTouched() && r),
                  "compositionstart" === e &&
                    (r = !1 !== Br(t, 27)._compositionStart() && r),
                  "compositionend" === e &&
                    (r = !1 !== Br(t, 27)._compositionEnd(n.target.value) && r),
                  r
                );
              },
              null,
              null
            )),
            no(27, 16384, null, 0, ay, [ln, rn, [2, iy]], null, null),
            ro(
              1024,
              null,
              ry,
              function (t) {
                return [t];
              },
              [ay]
            ),
            no(
              29,
              671744,
              null,
              0,
              Jy,
              [
                [3, uy],
                [8, null],
                [8, null],
                [6, ry],
                [2, Qy],
              ],
              { name: [0, "name"] },
              null
            ),
            ro(2048, null, cy, null, [Jy]),
            no(31, 16384, null, 0, py, [[4, cy]], null, null),
            (t()(),
            Li(
              32,
              0,
              null,
              null,
              6,
              "div",
              [["class", "form-group"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Li(
              33,
              0,
              [["imageInput", 1]],
              null,
              0,
              "input",
              [
                ["accept", "image/*"],
                ["type", "file"],
              ],
              null,
              [[null, "change"]],
              function (t, e, n) {
                var r = !0;
                return (
                  "change" === e &&
                    (r = !1 !== t.component.onFileAdded(n) && r),
                  r
                );
              },
              null,
              null
            )),
            (t()(),
            Li(
              34,
              0,
              null,
              null,
              2,
              "button",
              [
                ["color", "primary"],
                ["mat-raised-button", ""],
              ],
              [
                [1, "disabled", 0],
                [2, "_mat-animation-noopable", null],
              ],
              [[null, "click"]],
              function (t, e, n) {
                var r = !0;
                return "click" === e && (r = !1 !== Br(t, 33).click() && r), r;
              },
              sg,
              ag
            )),
            no(
              35,
              180224,
              null,
              0,
              og,
              [rn, tf, [2, Zm]],
              { color: [0, "color"] },
              null
            ),
            (t()(), Ji(-1, 0, ["ADD IMAGE"])),
            (t()(), Fi(16777216, null, null, 1, null, Pv)),
            no(38, 16384, null, 0, As, [An, On], { ngIf: [0, "ngIf"] }, null),
            (t()(),
            Li(
              39,
              0,
              null,
              null,
              8,
              "div",
              [["class", "form-group"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Li(
              40,
              0,
              null,
              null,
              1,
              "label",
              [["for", "main-pepper"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), Ji(-1, null, ["Main Pepper Ingredient"])),
            (t()(),
            Li(
              42,
              0,
              null,
              null,
              5,
              "input",
              [
                ["class", "form-control"],
                ["formControlName", "mainPepper"],
                ["id", "main-pepper"],
                ["type", "text"],
              ],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null],
              ],
              [
                [null, "input"],
                [null, "blur"],
                [null, "compositionstart"],
                [null, "compositionend"],
              ],
              function (t, e, n) {
                var r = !0;
                return (
                  "input" === e &&
                    (r = !1 !== Br(t, 43)._handleInput(n.target.value) && r),
                  "blur" === e && (r = !1 !== Br(t, 43).onTouched() && r),
                  "compositionstart" === e &&
                    (r = !1 !== Br(t, 43)._compositionStart() && r),
                  "compositionend" === e &&
                    (r = !1 !== Br(t, 43)._compositionEnd(n.target.value) && r),
                  r
                );
              },
              null,
              null
            )),
            no(43, 16384, null, 0, ay, [ln, rn, [2, iy]], null, null),
            ro(
              1024,
              null,
              ry,
              function (t) {
                return [t];
              },
              [ay]
            ),
            no(
              45,
              671744,
              null,
              0,
              Jy,
              [
                [3, uy],
                [8, null],
                [8, null],
                [6, ry],
                [2, Qy],
              ],
              { name: [0, "name"] },
              null
            ),
            ro(2048, null, cy, null, [Jy]),
            no(47, 16384, null, 0, py, [[4, cy]], null, null),
            (t()(),
            Li(
              48,
              0,
              null,
              null,
              17,
              "div",
              [["class", "form-group"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Li(
              49,
              0,
              null,
              null,
              1,
              "label",
              [["for", "heat"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), Ji(-1, null, ["Heat"])),
            (t()(),
            Li(
              51,
              0,
              null,
              null,
              14,
              "div",
              [["class", "heat-container"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Li(
              52,
              0,
              null,
              null,
              6,
              "input",
              [
                ["class", "custom-range heat-range"],
                ["formControlName", "heat"],
                ["id", "heat"],
                ["max", "10"],
                ["min", "1"],
                ["type", "range"],
              ],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null],
              ],
              [
                [null, "input"],
                [null, "blur"],
                [null, "compositionstart"],
                [null, "compositionend"],
                [null, "change"],
              ],
              function (t, e, n) {
                var r = !0;
                return (
                  "input" === e &&
                    (r = !1 !== Br(t, 53)._handleInput(n.target.value) && r),
                  "blur" === e && (r = !1 !== Br(t, 53).onTouched() && r),
                  "compositionstart" === e &&
                    (r = !1 !== Br(t, 53)._compositionStart() && r),
                  "compositionend" === e &&
                    (r = !1 !== Br(t, 53)._compositionEnd(n.target.value) && r),
                  "change" === e &&
                    (r = !1 !== Br(t, 54).onChange(n.target.value) && r),
                  "input" === e &&
                    (r = !1 !== Br(t, 54).onChange(n.target.value) && r),
                  "blur" === e && (r = !1 !== Br(t, 54).onTouched() && r),
                  r
                );
              },
              null,
              null
            )),
            no(53, 16384, null, 0, ay, [ln, rn, [2, iy]], null, null),
            no(54, 16384, null, 0, ky, [ln, rn], null, null),
            ro(
              1024,
              null,
              ry,
              function (t, e) {
                return [t, e];
              },
              [ay, ky]
            ),
            no(
              56,
              671744,
              null,
              0,
              Jy,
              [
                [3, uy],
                [8, null],
                [8, null],
                [6, ry],
                [2, Qy],
              ],
              { name: [0, "name"] },
              null
            ),
            ro(2048, null, cy, null, [Jy]),
            no(58, 16384, null, 0, py, [[4, cy]], null, null),
            (t()(),
            Li(
              59,
              0,
              null,
              null,
              6,
              "input",
              [
                ["class", "form-control heat-reading"],
                ["formControlName", "heatValue"],
                ["type", "number"],
              ],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null],
              ],
              [
                [null, "input"],
                [null, "blur"],
                [null, "compositionstart"],
                [null, "compositionend"],
                [null, "change"],
              ],
              function (t, e, n) {
                var r = !0;
                return (
                  "input" === e &&
                    (r = !1 !== Br(t, 60)._handleInput(n.target.value) && r),
                  "blur" === e && (r = !1 !== Br(t, 60).onTouched() && r),
                  "compositionstart" === e &&
                    (r = !1 !== Br(t, 60)._compositionStart() && r),
                  "compositionend" === e &&
                    (r = !1 !== Br(t, 60)._compositionEnd(n.target.value) && r),
                  "change" === e &&
                    (r = !1 !== Br(t, 61).onChange(n.target.value) && r),
                  "input" === e &&
                    (r = !1 !== Br(t, 61).onChange(n.target.value) && r),
                  "blur" === e && (r = !1 !== Br(t, 61).onTouched() && r),
                  r
                );
              },
              null,
              null
            )),
            no(60, 16384, null, 0, ay, [ln, rn, [2, iy]], null, null),
            no(61, 16384, null, 0, Cy, [ln, rn], null, null),
            ro(
              1024,
              null,
              ry,
              function (t, e) {
                return [t, e];
              },
              [ay, Cy]
            ),
            no(
              63,
              671744,
              null,
              0,
              Jy,
              [
                [3, uy],
                [8, null],
                [8, null],
                [6, ry],
                [2, Qy],
              ],
              { name: [0, "name"] },
              null
            ),
            ro(2048, null, cy, null, [Jy]),
            no(65, 16384, null, 0, py, [[4, cy]], null, null),
            (t()(),
            Li(
              66,
              0,
              null,
              null,
              2,
              "button",
              [
                ["color", "primary"],
                ["mat-raised-button", ""],
              ],
              [
                [1, "disabled", 0],
                [2, "_mat-animation-noopable", null],
              ],
              [[null, "click"]],
              function (t, e, n) {
                var r = !0;
                return (
                  "click" === e && (r = !1 !== t.component.onSubmit() && r), r
                );
              },
              sg,
              ag
            )),
            no(
              67,
              180224,
              null,
              0,
              og,
              [rn, tf, [2, Zm]],
              { disabled: [0, "disabled"], color: [1, "color"] },
              null
            ),
            (t()(), Ji(-1, 0, ["SUBMIT"])),
          ],
          function (t, e) {
            var n = e.component;
            t(e, 2, 0, n.sauceForm),
              t(e, 11, 0, "name"),
              t(e, 20, 0, "manufacturer"),
              t(e, 29, 0, "description"),
              t(e, 35, 0, "primary"),
              t(e, 38, 0, n.imagePreview),
              t(e, 45, 0, "mainPepper"),
              t(e, 56, 0, "heat"),
              t(e, 63, 0, "heatValue"),
              t(e, 67, 0, n.sauceForm.invalid, "primary");
          },
          function (t, e) {
            t(
              e,
              0,
              0,
              Br(e, 4).ngClassUntouched,
              Br(e, 4).ngClassTouched,
              Br(e, 4).ngClassPristine,
              Br(e, 4).ngClassDirty,
              Br(e, 4).ngClassValid,
              Br(e, 4).ngClassInvalid,
              Br(e, 4).ngClassPending
            ),
              t(
                e,
                8,
                0,
                Br(e, 13).ngClassUntouched,
                Br(e, 13).ngClassTouched,
                Br(e, 13).ngClassPristine,
                Br(e, 13).ngClassDirty,
                Br(e, 13).ngClassValid,
                Br(e, 13).ngClassInvalid,
                Br(e, 13).ngClassPending
              ),
              t(
                e,
                17,
                0,
                Br(e, 22).ngClassUntouched,
                Br(e, 22).ngClassTouched,
                Br(e, 22).ngClassPristine,
                Br(e, 22).ngClassDirty,
                Br(e, 22).ngClassValid,
                Br(e, 22).ngClassInvalid,
                Br(e, 22).ngClassPending
              ),
              t(
                e,
                26,
                0,
                Br(e, 31).ngClassUntouched,
                Br(e, 31).ngClassTouched,
                Br(e, 31).ngClassPristine,
                Br(e, 31).ngClassDirty,
                Br(e, 31).ngClassValid,
                Br(e, 31).ngClassInvalid,
                Br(e, 31).ngClassPending
              ),
              t(
                e,
                34,
                0,
                Br(e, 35).disabled || null,
                "NoopAnimations" === Br(e, 35)._animationMode
              ),
              t(
                e,
                42,
                0,
                Br(e, 47).ngClassUntouched,
                Br(e, 47).ngClassTouched,
                Br(e, 47).ngClassPristine,
                Br(e, 47).ngClassDirty,
                Br(e, 47).ngClassValid,
                Br(e, 47).ngClassInvalid,
                Br(e, 47).ngClassPending
              ),
              t(
                e,
                52,
                0,
                Br(e, 58).ngClassUntouched,
                Br(e, 58).ngClassTouched,
                Br(e, 58).ngClassPristine,
                Br(e, 58).ngClassDirty,
                Br(e, 58).ngClassValid,
                Br(e, 58).ngClassInvalid,
                Br(e, 58).ngClassPending
              ),
              t(
                e,
                59,
                0,
                Br(e, 65).ngClassUntouched,
                Br(e, 65).ngClassTouched,
                Br(e, 65).ngClassPristine,
                Br(e, 65).ngClassDirty,
                Br(e, 65).ngClassValid,
                Br(e, 65).ngClassInvalid,
                Br(e, 65).ngClassPending
              ),
              t(
                e,
                66,
                0,
                Br(e, 67).disabled || null,
                "NoopAnimations" === Br(e, 67)._animationMode
              );
          }
        );
      }
      function Iv(t) {
        return ea(
          0,
          [
            (t()(), Fi(16777216, null, null, 1, null, Ov)),
            no(1, 16384, null, 0, As, [An, On], { ngIf: [0, "ngIf"] }, null),
            (t()(), Fi(16777216, null, null, 1, null, Av)),
            no(3, 16384, null, 0, As, [An, On], { ngIf: [0, "ngIf"] }, null),
          ],
          function (t, e) {
            var n = e.component;
            t(e, 1, 0, n.loading), t(e, 3, 0, !n.loading);
          },
          null
        );
      }
      function Nv(t) {
        return ea(
          0,
          [
            (t()(),
            Li(
              0,
              0,
              null,
              null,
              1,
              "app-sauce-form",
              [],
              null,
              null,
              null,
              Iv,
              xv
            )),
            no(1, 114688, null, 0, Tv, [tg, th, cp, rv, Ug], null, null),
          ],
          function (t, e) {
            t(e, 1, 0);
          },
          null
        );
      }
      var Rv = Nr("app-sauce-form", Tv, Nv, {}, {}, []),
        Dv = (function () {
          function t(t) {
            this.auth = t;
          }
          return (
            (t.prototype.ngOnInit = function () {
              var t = this;
              this.authSubscription = this.auth.isAuth$.subscribe(function (e) {
                t.isAuth = e;
              });
            }),
            (t.prototype.onLogout = function () {
              this.auth.logout();
            }),
            (t.prototype.ngOnDestroy = function () {
              this.authSubscription.unsubscribe();
            }),
            t
          );
        })(),
        jv = Kn({
          encapsulation: 0,
          styles: [
            [
              "nav[_ngcontent-%COMP%]{box-sizing:border-box;width:100%;max-width:1400px;margin:auto;position:relative;top:0;left:0;display:flex;padding:20px;justify-content:space-between;border-bottom:thin solid #000}h1[_ngcontent-%COMP%]{font-weight:700;font-size:2.4em;margin:0}h5[_ngcontent-%COMP%]{font-size:1.2em;font-weight:400;margin:0}.logo[_ngcontent-%COMP%]{display:flex;align-items:center}.logo-text[_ngcontent-%COMP%]{text-align:center}.logo-image[_ngcontent-%COMP%]{margin-right:1em}.logo-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:4.5em}.left-nav[_ngcontent-%COMP%], .right-nav[_ngcontent-%COMP%]{align-self:center;width:30%}.right-nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{justify-content:flex-end}ul[_ngcontent-%COMP%]{list-style:none;padding:0;margin:0;display:flex}li[_ngcontent-%COMP%]{margin:0 15px}a[_ngcontent-%COMP%]{color:#000;font-weight:400;text-decoration:none;cursor:pointer}a[_ngcontent-%COMP%]:hover{text-decoration:underline}.active[_ngcontent-%COMP%]{font-weight:700;text-decoration:underline}",
            ],
          ],
          data: {},
        });
      function Mv(t) {
        return ea(
          0,
          [
            (t()(),
            Li(
              0,
              0,
              null,
              null,
              5,
              "a",
              [
                ["routerLink", "sauces"],
                ["routerLinkActive", "active"],
              ],
              [
                [1, "target", 0],
                [8, "href", 4],
              ],
              [[null, "click"]],
              function (t, e, n) {
                var r = !0;
                return (
                  "click" === e &&
                    (r =
                      !1 !==
                        Br(t, 1).onClick(
                          n.button,
                          n.ctrlKey,
                          n.metaKey,
                          n.shiftKey
                        ) && r),
                  r
                );
              },
              null,
              null
            )),
            no(
              1,
              671744,
              [[2, 4]],
              0,
              pp,
              [cp, th, fs],
              { routerLink: [0, "routerLink"] },
              null
            ),
            no(
              2,
              1720320,
              null,
              2,
              dp,
              [cp, rn, ln, [2, hp], [2, pp]],
              { routerLinkActive: [0, "routerLinkActive"] },
              null
            ),
            qi(603979776, 1, { links: 1 }),
            qi(603979776, 2, { linksWithHrefs: 1 }),
            (t()(), Ji(-1, null, [" ALL SAUCES "])),
          ],
          function (t, e) {
            t(e, 1, 0, "sauces"), t(e, 2, 0, "active");
          },
          function (t, e) {
            t(e, 0, 0, Br(e, 1).target, Br(e, 1).href);
          }
        );
      }
      function Vv(t) {
        return ea(
          0,
          [
            (t()(),
            Li(
              0,
              0,
              null,
              null,
              5,
              "a",
              [
                ["routerLink", "new-sauce"],
                ["routerLinkActive", "active"],
              ],
              [
                [1, "target", 0],
                [8, "href", 4],
              ],
              [[null, "click"]],
              function (t, e, n) {
                var r = !0;
                return (
                  "click" === e &&
                    (r =
                      !1 !==
                        Br(t, 1).onClick(
                          n.button,
                          n.ctrlKey,
                          n.metaKey,
                          n.shiftKey
                        ) && r),
                  r
                );
              },
              null,
              null
            )),
            no(
              1,
              671744,
              [[4, 4]],
              0,
              pp,
              [cp, th, fs],
              { routerLink: [0, "routerLink"] },
              null
            ),
            no(
              2,
              1720320,
              null,
              2,
              dp,
              [cp, rn, ln, [2, hp], [2, pp]],
              { routerLinkActive: [0, "routerLinkActive"] },
              null
            ),
            qi(603979776, 3, { links: 1 }),
            qi(603979776, 4, { linksWithHrefs: 1 }),
            (t()(), Ji(-1, null, [" ADD SAUCE "])),
          ],
          function (t, e) {
            t(e, 1, 0, "new-sauce"), t(e, 2, 0, "active");
          },
          function (t, e) {
            t(e, 0, 0, Br(e, 1).target, Br(e, 1).href);
          }
        );
      }
      function Fv(t) {
        return ea(
          0,
          [
            (t()(),
            Li(
              0,
              0,
              null,
              null,
              5,
              "a",
              [
                ["routerLink", "signup"],
                ["routerLinkActive", "active"],
              ],
              [
                [1, "target", 0],
                [8, "href", 4],
              ],
              [[null, "click"]],
              function (t, e, n) {
                var r = !0;
                return (
                  "click" === e &&
                    (r =
                      !1 !==
                        Br(t, 1).onClick(
                          n.button,
                          n.ctrlKey,
                          n.metaKey,
                          n.shiftKey
                        ) && r),
                  r
                );
              },
              null,
              null
            )),
            no(
              1,
              671744,
              [[6, 4]],
              0,
              pp,
              [cp, th, fs],
              { routerLink: [0, "routerLink"] },
              null
            ),
            no(
              2,
              1720320,
              null,
              2,
              dp,
              [cp, rn, ln, [2, hp], [2, pp]],
              { routerLinkActive: [0, "routerLinkActive"] },
              null
            ),
            qi(603979776, 5, { links: 1 }),
            qi(603979776, 6, { linksWithHrefs: 1 }),
            (t()(), Ji(-1, null, [" SIGN UP "])),
          ],
          function (t, e) {
            t(e, 1, 0, "signup"), t(e, 2, 0, "active");
          },
          function (t, e) {
            t(e, 0, 0, Br(e, 1).target, Br(e, 1).href);
          }
        );
      }
      function Lv(t) {
        return ea(
          0,
          [
            (t()(),
            Li(
              0,
              0,
              null,
              null,
              5,
              "a",
              [
                ["routerLink", "login"],
                ["routerLinkActive", "active"],
              ],
              [
                [1, "target", 0],
                [8, "href", 4],
              ],
              [[null, "click"]],
              function (t, e, n) {
                var r = !0;
                return (
                  "click" === e &&
                    (r =
                      !1 !==
                        Br(t, 1).onClick(
                          n.button,
                          n.ctrlKey,
                          n.metaKey,
                          n.shiftKey
                        ) && r),
                  r
                );
              },
              null,
              null
            )),
            no(
              1,
              671744,
              [[8, 4]],
              0,
              pp,
              [cp, th, fs],
              { routerLink: [0, "routerLink"] },
              null
            ),
            no(
              2,
              1720320,
              null,
              2,
              dp,
              [cp, rn, ln, [2, hp], [2, pp]],
              { routerLinkActive: [0, "routerLinkActive"] },
              null
            ),
            qi(603979776, 7, { links: 1 }),
            qi(603979776, 8, { linksWithHrefs: 1 }),
            (t()(), Ji(-1, null, [" LOGIN "])),
          ],
          function (t, e) {
            t(e, 1, 0, "login"), t(e, 2, 0, "active");
          },
          function (t, e) {
            t(e, 0, 0, Br(e, 1).target, Br(e, 1).href);
          }
        );
      }
      function Uv(t) {
        return ea(
          0,
          [
            (t()(),
            Li(
              0,
              0,
              null,
              null,
              1,
              "a",
              [],
              null,
              [[null, "click"]],
              function (t, e, n) {
                var r = !0;
                return (
                  "click" === e && (r = !1 !== t.component.onLogout() && r), r
                );
              },
              null,
              null
            )),
            (t()(), Ji(-1, null, [" LOGOUT "])),
          ],
          null,
          null
        );
      }
      function Hv(t) {
        return ea(
          0,
          [
            (t()(),
            Li(0, 0, null, null, 27, "nav", [], null, null, null, null, null)),
            (t()(),
            Li(
              1,
              0,
              null,
              null,
              7,
              "div",
              [["class", "left-nav"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Li(2, 0, null, null, 6, "ul", [], null, null, null, null, null)),
            (t()(),
            Li(3, 0, null, null, 2, "li", [], null, null, null, null, null)),
            (t()(), Fi(16777216, null, null, 1, null, Mv)),
            no(5, 16384, null, 0, As, [An, On], { ngIf: [0, "ngIf"] }, null),
            (t()(),
            Li(6, 0, null, null, 2, "li", [], null, null, null, null, null)),
            (t()(), Fi(16777216, null, null, 1, null, Vv)),
            no(8, 16384, null, 0, As, [An, On], { ngIf: [0, "ngIf"] }, null),
            (t()(),
            Li(
              9,
              0,
              null,
              null,
              7,
              "div",
              [["class", "logo"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Li(
              10,
              0,
              null,
              null,
              1,
              "div",
              [["class", "logo-image"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Li(
              11,
              0,
              null,
              null,
              0,
              "img",
              [["src", "../../assets/images/flame.png"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Li(
              12,
              0,
              null,
              null,
              4,
              "div",
              [["class", "logo-text"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Li(13, 0, null, null, 1, "h1", [], null, null, null, null, null)),
            (t()(), Ji(-1, null, [" HOT TAKES "])),
            (t()(),
            Li(15, 0, null, null, 1, "h5", [], null, null, null, null, null)),
            (t()(), Ji(-1, null, [" THE WEB'S BEST HOT SAUCE REVIEWS "])),
            (t()(),
            Li(
              17,
              0,
              null,
              null,
              10,
              "div",
              [["class", "right-nav"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Li(18, 0, null, null, 9, "ul", [], null, null, null, null, null)),
            (t()(),
            Li(19, 0, null, null, 2, "li", [], null, null, null, null, null)),
            (t()(), Fi(16777216, null, null, 1, null, Fv)),
            no(21, 16384, null, 0, As, [An, On], { ngIf: [0, "ngIf"] }, null),
            (t()(),
            Li(22, 0, null, null, 2, "li", [], null, null, null, null, null)),
            (t()(), Fi(16777216, null, null, 1, null, Lv)),
            no(24, 16384, null, 0, As, [An, On], { ngIf: [0, "ngIf"] }, null),
            (t()(),
            Li(25, 0, null, null, 2, "li", [], null, null, null, null, null)),
            (t()(), Fi(16777216, null, null, 1, null, Uv)),
            no(27, 16384, null, 0, As, [An, On], { ngIf: [0, "ngIf"] }, null),
          ],
          function (t, e) {
            var n = e.component;
            t(e, 5, 0, n.isAuth),
              t(e, 8, 0, n.isAuth),
              t(e, 21, 0, !n.isAuth),
              t(e, 24, 0, !n.isAuth),
              t(e, 27, 0, n.isAuth);
          },
          null
        );
      }
      var zv = Kn({
        encapsulation: 0,
        styles: [
          [
            ".container[_ngcontent-%COMP%]{position:relative;width:100%;max-width:1000px;margin:auto}",
          ],
        ],
        data: {},
      });
      function Bv(t) {
        return ea(
          0,
          [
            (t()(),
            Li(
              0,
              0,
              null,
              null,
              1,
              "app-header",
              [],
              null,
              null,
              null,
              Hv,
              jv
            )),
            no(1, 245760, null, 0, Dv, [Ug], null, null),
            (t()(),
            Li(
              2,
              0,
              null,
              null,
              2,
              "div",
              [["class", "container"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Li(
              3,
              16777216,
              null,
              null,
              1,
              "router-outlet",
              [],
              null,
              null,
              null,
              null,
              null
            )),
            no(4, 212992, null, 0, gp, [yp, An, Ye, [8, null], ke], null, null),
          ],
          function (t, e) {
            t(e, 1, 0), t(e, 4, 0);
          },
          null
        );
      }
      function qv(t) {
        return ea(
          0,
          [
            (t()(),
            Li(0, 0, null, null, 1, "app-root", [], null, null, null, Bv, zv)),
            no(1, 49152, null, 0, cs, [], null, null),
          ],
          null,
          null
        );
      }
      var Gv = Nr("app-root", cs, qv, {}, {}, []),
        Wv = (function () {
          function t(t, e) {
            (this.auth = t), (this.router = e);
          }
          return (
            (t.prototype.canActivate = function (t, e) {
              var n = this;
              return w.create(function (t) {
                n.auth.isAuth$.subscribe(function (e) {
                  e ? t.next(!0) : n.router.navigate(["/login"]);
                });
              });
            }),
            t
          );
        })(),
        Qv = (function () {
          function t(t) {
            this.auth = t;
          }
          return (
            (t.prototype.intercept = function (t, e) {
              var n = this.auth.getToken(),
                r = t.clone({
                  headers: t.headers.set("Authorization", "Bearer " + n),
                });
              return e.handle(r);
            }),
            t
          );
        })(),
        Kv = (function () {
          return function () {};
        })(),
        Zv = ss(ls, [cs], function (t) {
          return (function (t) {
            for (var e = {}, n = [], r = !1, o = 0; o < t.length; o++) {
              var i = t[o];
              i.token === xe && !0 === i.value && (r = !0),
                1073741824 & i.flags && n.push(i.token),
                (i.index = o),
                (e[Gn(i.token)] = i);
            }
            return {
              factory: null,
              providersByKey: e,
              providers: t,
              modules: n,
              isRoot: r,
            };
          })([
            kr(512, Ye, tn, [[8, [zp, Kg, nv, fv, Sv, Rv, Gv]], [3, Ye], Mt]),
            kr(5120, Fo, ji, [[3, Fo]]),
            kr(4608, ws, Cs, [Fo, [2, _s]]),
            kr(5120, bo, Mi, [ni]),
            kr(5120, Io, No, []),
            kr(5120, En, Ri, []),
            kr(5120, Sn, Di, []),
            kr(4608, jl, Ml, [Fs]),
            kr(6144, _e, null, [jl]),
            kr(4608, Ol, Al, []),
            kr(
              5120,
              el,
              function (t, e, n, r, o, i, a, s) {
                return [new Tl(t, e, n), new Dl(r), new Il(o, i, a, s)];
              },
              [Fs, ni, jo, Fs, Fs, Ol, Vo, [2, Pl]]
            ),
            kr(4608, nl, nl, [el, ni]),
            kr(135680, il, il, [Fs]),
            kr(4608, pl, pl, [nl, il, Io]),
            kr(5120, Jf, Wm, []),
            kr(5120, zd, Qm, []),
            kr(4608, gm, Gm, [Fs, Jf, zd]),
            kr(5120, sn, Km, [pl, gm, ni]),
            kr(6144, ol, null, [il]),
            kr(4608, ci, ci, [ni]),
            kr(5120, th, Dp, [cp]),
            kr(4608, wp, wp, []),
            kr(6144, bp, null, [wp]),
            kr(135680, Cp, Cp, [cp, wi, Qo, Pe, bp]),
            kr(4608, _p, _p, []),
            kr(5120, Ep, Pp, [cp, Hs, Sp]),
            kr(5120, Fp, Vp, [jp]),
            kr(
              5120,
              Mo,
              function (t) {
                return [t];
              },
              [Fp]
            ),
            kr(4608, Wv, Wv, [Ug, cp]),
            kr(4608, Dg, jg, [Fs, jo, Ng]),
            kr(4608, Mg, Mg, [Dg, Rg]),
            kr(
              5120,
              Tg,
              function (t, e) {
                return [t, new Qv(e)];
              },
              [Mg, Ug]
            ),
            kr(4608, Ag, Ag, []),
            kr(6144, Pg, null, [Ag]),
            kr(4608, Ig, Ig, [Pg]),
            kr(6144, lg, null, [Ig]),
            kr(4608, ug, Vg, [lg, Pe]),
            kr(4608, Sg, Sg, [ug]),
            kr(4608, tg, tg, []),
            kr(4608, Ey, Ey, []),
            kr(4608, Ef, Fm, [sn, Fs]),
            kr(1073742336, Vs, Vs, []),
            kr(1024, Kt, ql, []),
            kr(
              1024,
              di,
              function () {
                return [xp()];
              },
              []
            ),
            kr(512, jp, jp, [Pe]),
            kr(
              1024,
              Po,
              function (t, e) {
                return [
                  ((n = t),
                  Ju("probe", tl),
                  Ju(
                    "coreTokens",
                    Object(r.a)(
                      {},
                      Yu,
                      (n || []).reduce(function (t, e) {
                        return (t[e.name] = e.token), t;
                      }, {})
                    )
                  ),
                  function () {
                    return tl;
                  }),
                  Mp(e),
                ];
                var n;
              },
              [[2, di], jp]
            ),
            kr(512, Ao, Ao, [[2, Po]]),
            kr(131584, bi, bi, [ni, Vo, Pe, Kt, Ye, Ao]),
            kr(1073742336, Vi, Vi, [bi]),
            kr(1073742336, Gl, Gl, [[3, Gl]]),
            kr(1024, kp, Ip, [[3, cp]]),
            kr(512, Nc, Rc, []),
            kr(512, yp, yp, []),
            kr(256, Sp, {}, []),
            kr(1024, fs, Ap, [hs, [2, ds], Sp]),
            kr(512, ms, ms, [fs, hs]),
            kr(512, Qo, Qo, []),
            kr(512, wi, Si, [Qo, [2, Ci]]),
            kr(
              1024,
              rp,
              function () {
                return [
                  [
                    { path: "signup", component: Hg },
                    { path: "login", component: Zg },
                    { path: "sauces", component: ov, canActivate: [Wv] },
                    { path: "sauce/:id", component: dv, canActivate: [Wv] },
                    { path: "new-sauce", component: Tv, canActivate: [Wv] },
                    {
                      path: "modify-sauce/:id",
                      component: Tv,
                      canActivate: [Wv],
                    },
                    { path: "", pathMatch: "full", redirectTo: "sauces" },
                    { path: "**", redirectTo: "sauces" },
                  ],
                ];
              },
              []
            ),
            kr(1024, cp, Rp, [
              bi,
              Nc,
              yp,
              ms,
              Pe,
              wi,
              Qo,
              rp,
              Sp,
              [2, ip],
              [2, ep],
            ]),
            kr(1073742336, Op, Op, [
              [2, kp],
              [2, cp],
            ]),
            kr(1073742336, Kv, Kv, []),
            kr(1073742336, Fg, Fg, []),
            kr(1073742336, Lg, Lg, []),
            kr(1073742336, Yy, Yy, []),
            kr(1073742336, eg, eg, []),
            kr(1073742336, Xm, Xm, []),
            kr(1073742336, Cf, Cf, []),
            kr(1073742336, rf, rf, [
              [2, nf],
              [2, Pl],
            ]),
            kr(1073742336, wf, wf, []),
            kr(1073742336, $p, $p, []),
            kr(1073742336, yf, yf, []),
            kr(1073742336, ig, ig, []),
            kr(1073742336, ls, ls, []),
            kr(256, xe, !0, []),
            kr(256, Ng, "XSRF-TOKEN", []),
            kr(256, Rg, "X-XSRF-TOKEN", []),
            kr(256, Zm, "BrowserAnimations", []),
          ]);
        });
      (function () {
        if ($t)
          throw new Error("Cannot enable prod mode after platform setup.");
        Zt = !1;
      })(),
        Bl()
          .bootstrapModuleFactory(Zv)
          .catch(function (t) {
            return console.error(t);
          });
    },
  },
  [[0, 0]],
]);
