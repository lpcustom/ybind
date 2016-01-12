var ybind = {
    nextId: 0,
    bindObjs: {},
    bindFromReady: false,
    bindToReady: false,
    ready: false,
    changeEvent: function(ele,event) {
        var key     = ele.getAttribute('data-bind-to');
        v = ele.value;
        ybind.set(key, v);
        ybind.apply();
    },
    startBindTo: function() {
        var elements = document.querySelectorAll('[data-bind-to]');

        for(var i = 0; i < elements.length; i++) {
            var id     = elements[i].getAttribute('data-bind-to');
            var value   = elements[i].value;
            var obj     = { value: value, dirty: false, elements: [] };
            ybind.bindObjs[id] = obj;
            var v = null;
            if(window.addEventListener) {
                elements[i].addEventListener('change', function(e) { ybind.changeEvent(this,e); });
                elements[i].addEventListener('keyup', function(e)  { ybind.changeEvent(this,e); });
                elements[i].addEventListener('paste', function(e)  { ybind.changeEvent(this,e); });
            } else if(window.attachEvent) {
                elements[i].attachEvent('onchange', function(e)    { ybind.changeEvent(this,e); });
                elements[i].attachEvent('onkeyup', function(e)     { ybind.changeEvent(this,e); });
                elements[i].attachEvent('onpaste', function(e)     { ybind.changeEvent(this,e); });
            }
        }
        ybind.bindToReady = true;
    },
    startBindFrom: function() {
        var elements = document.querySelectorAll('[data-bind-from]');

        for(var i = 0; i < elements.length; i++) {
            var id = elements[i].getAttribute('data-bind-from');
            if(window.addEventListener) {
                elements[i].addEventListener('fromUpdated', function(event) {
                    if(this.tagName.toLowerCase() === "input") {
                        if(this.value !== event.detail) {
                            this.value = event.detail;
                        }
                    } else {
                        if(this.innerHTML !== event.detail) {
                            this.innerHTML = event.detail;
                        }
                    }
                });
            } else if (window.attachEvent) {
                elements[i].attachEvent('fromUpdated', function(event) {
                    if(this.tagName.toLowerCase() === "input") {
                        if(this.value !== event.detail) {
                            this.value = event.detail;
                        }
                    } else {
                        if(this.innerHTML !== event.detail) {
                            this.innerHTML = event.detail;
                        }
                    }
                });
            }
            if(typeof ybind.bindObjs[id] !== "undefined") {
                ybind.bindObjs[id].elements.push(elements[i]);
            } else {
                var v = null;
                if(elements[i].tagName.toLowerCase() === 'input') {
                    v = elements[i].value;
                } else {
                    v = elements[i].innerHTML;
                }
                ybind.bindObjs[id] = { value: v, dirty: false, elements: [elements[i]] };
            }
        }
        ybind.bindFromReady = true;
    },
    apply: function() {
        for(var i in ybind.bindObjs) {
            if(ybind.bindObjs[i].dirty) {
                if(typeof ybind.bindObjs[i].elements !== 'undefined' && ybind.bindObjs[i].elements !== null && ybind.bindObjs[i].elements.length > 0) {
                    for(var j = 0; j < ybind.bindObjs[i].elements.length; j++) {
                        if(typeof ybind.bindObjs[i].elements[j] !== 'undefined' && ybind.bindObjs[i].elements[j] !== null) {
                            var event = new CustomEvent("fromUpdated", {detail: ybind.bindObjs[i].value});
                            ybind.bindObjs[i].elements[j].dispatchEvent(event);
                        }
                    }
                }
                ybind.bindObjs[i].dirty = false;
            }
        }
    },
    set: function(key, value) {
        var exists = false;
        if(typeof ybind.bindObjs[key] !== 'undefined') {
            ybind.bindObjs[key].value = value;
            ybind.bindObjs[key].dirty = true;
        }
        else {
            ybind.bindObjs[key] = {value: value, dirty: true, elements: []};
        }
    },
    _start: function() {
        "use strict";
        document.addEventListener('DOMContentLoaded', function(event) {
            ybind.startBindTo();
            ybind.startBindFrom();
        });
    },
    ready:function(callback) {
        var interval = setInterval(function() {
            if(ybind.bindFromReady && ybind.bindToReady) {
                if(typeof callback === 'function') {
                    clearInterval(interval);
                    callback();
                }
            }
        }, 20);
    }
};
ybind._start();