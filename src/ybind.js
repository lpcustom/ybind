var ybind = {
    nextId: 0,
    bindObjs: [],
    bindFromReady: false,
    bindToReady: false,
    ready: false,
    changeEvent: function(ele) {
        var key     = ele.getAttribute('data-bind-to');
        v = ele.value;
        ybind.set(key, v);
        ybind.apply();
    },
    startBindTo: function() {
        var elements = document.querySelectorAll('[data-bind-to]');
        for(var i = 0; i < elements.length; i++) {
            var id      = ybind.getNextId();
            var key     = elements[i].getAttribute('data-bind-to');
            var value   = elements[i].value;
            var obj     = { key : key, value: value, id: id };
            ybind.bindObjs.push(obj);
            elements[i].setAttribute("data-yid", "yb-" + id);
            var v = null;

            var ele = elements[i];
            if(window.addEventListener) {
                elements[i].addEventListener('change', function() { ybind.changeEvent(ele); });
                elements[i].addEventListener('keyup', function() { ybind.changeEvent(ele); });
                elements[i].addEventListener('paste', function() { ybind.changeEvent(ele); });
            } else if(window.attachEvent) {
                elements[i].attachEvent('onchange', function() { ybind.changeEvent(ele); });
                elements[i].attachEvent('onkeyup', function() { ybind.changeEvent(ele); });
                elements[i].attachEvent('onpaste', function() { ybind.changeEvent(ele); });
            }
        }
        ybind.bindToReady = true;
    },
    startBindFrom: function() {
        var elements = document.querySelectorAll('[data-bind-from]');
        for(var i = 0; i < elements.length; i++) {
            var id = ybind.getNextId();
            ybind.bindObjs.push({ key : elements[i].getAttribute('data-bind-from'), value: elements[i].innerHTML, id: id });
            elements[i].setAttribute("data-yid", "yb-" + id);
        }
        ybind.bindFromReady = true;
    },
    apply: function() {
        for(var i = 0; i < ybind.bindObjs.length; i++) {
            element = document.querySelector('[data-yid="yb-' + ybind.bindObjs[i].id + '"]');
            if(typeof element !== 'undefined' && element !== null) {
                if(element.tagName.toLowerCase() === "input") {
                    element.value = ybind.bindObjs[i].value;
                } else {
                    element.innerHTML = ybind.bindObjs[i].value;
                }
            }
        }
    },
    getNextId: function() {
        var old = ybind.nextId;
        ybind.nextId++;
        return old;
    },
    set: function(key, value) {
        var exists = false;
        for(var i = 0; i < ybind.bindObjs.length; i++) {
            if(ybind.bindObjs[i].key === key) {
                ybind.bindObjs[i].value = value;
                exists = true;
            }
        }
        if(!exists) {
            var id = ybind.getNextId();
            ybind.bindObjs.push({key: key, value: value, id: id});
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