var ybind = {
    bindObjs: {},
    bindFromReady: false,
    bindToReady: false,
    ready: false,
    changeEvent: function(ele,event) {
        var key     = ele.getAttribute('data-bind-to');
        v = ele.value;
        ybind.set(key, v);
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
            console.log(id);
            if(window.addEventListener) {
                elements[i].addEventListener('fromUpdated', function(event) {
                    if(this.tagName.toLowerCase() === "input" || this.tagName.toLowerCase() === 'select') {
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
                    if(this.tagName.toLowerCase() === "input" || elements[i].tagName.toLowerCase() === 'select') {
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
                if(elements[i].tagName.toLowerCase() === 'input' || elements[i].tagName.toLowerCase() === 'select') {
                    v = elements[i].value;
                } else {
                    v = elements[i].innerHTML;
                }
                ybind.bindObjs[id] = { value: v, dirty: false, elements: [elements[i]] };
            }
        }
        ybind.bindFromReady = true;
    },
    apply: function(key) {
        if(ybind.bindObjs[key].dirty) {
            if(typeof ybind.bindObjs[key].elements !== 'undefined' && ybind.bindObjs[key].elements !== null && ybind.bindObjs[key].elements.length > 0) {
                for(var j = 0; j < ybind.bindObjs[key].elements.length; j++) {
                    if(typeof ybind.bindObjs[key].elements[j] !== 'undefined' && ybind.bindObjs[key].elements[j] !== null) {
                        var event = new CustomEvent("fromUpdated", {detail: ybind.bindObjs[key].value});
                        ybind.bindObjs[key].elements[j].dispatchEvent(event);
                    }
                }
            }
            ybind.bindObjs[key].dirty = false;
        }
        return this;
    },
    set: function(key, value) {
        if(!ybind.ready()) {
            setTimeout(function() {
                ybind.set(key,value);
            }, 100);
            return this;
        } else {
            var exists = false;
            if(typeof ybind.bindObjs[key] !== 'undefined') {
                ybind.bindObjs[key].value = value;
                ybind.bindObjs[key].dirty = true;
            }
            else {
                ybind.bindObjs[key] = { value: value, dirty: true, elements: [] };
            }
        }
        return this.apply(key);
    },
    _start: function() {
        "use strict";
        document.addEventListener('DOMContentLoaded', function(event) {
            ybind.startBindTo();
            ybind.startBindFrom();
        });
    },
    ready:function() {
        if(ybind.bindFromReady && ybind.bindToReady) {
            return true;
        } else {
            return false;
        }
    }
};
ybind._start();