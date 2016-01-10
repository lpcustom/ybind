var ybind = {
    nextId: 0,
    bindFromWatchers: [],
    bindToWatchers: [],
    bindFromReady: false,
    bindToReady: false,
    ready: false,

    startBindTo: function() {
        var elements = document.querySelectorAll('[data-bind-to]');
        ybind.bindToReady = true;
    },

    startBindFrom: function() {
        var elements = document.querySelectorAll('[data-bind-from]');
        for(var i = 0; i < elements.length; i++) {
            var id = ybind.getNextId();
            ybind.bindFromWatchers.push({ key : elements[i].getAttribute('data-bind-from'), value: elements[i].innerHTML, id: id });
            elements[i].setAttribute("data-yid", "f" + id);
            console.log(elements[i]);
        }
        ybind.bindFromReady = true;
    },

    apply: function() {
        for(var i = 0; i < ybind.bindFromWatchers.length; i++) {
            element = document.querySelector('[data-yid="f' + ybind.bindFromWatchers[i].id + '"]');
            if(typeof element !== 'undefined') {
                element.innerHTML = ybind.bindFromWatchers[i].value;
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
        for(var i = 0; i < ybind.bindFromWatchers.length; i++) {
            if(ybind.bindFromWatchers[i].key === key) {
                ybind.bindFromWatchers[i].value = value;
                exists = true;
            }
        }
        if(!exists) {
            var id = ybind.getNextId();
            ybind.bindFromWatchers.push({key: key, value: value, id: id});
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