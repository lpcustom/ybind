ybind
======
*Easy Directional Data Binding*

Early Development; Do not use unless you wish to contribute to the code!
-------

 I love data-binding using a library like AngularJS, but I've found that large datasets pose a 
 problem for the two-way approach. In a lot of cases, the data that you need to bind to is only 
 needed in a one-way approach. Meaning, that instead of DOM changes making instance changes to the 
 javascript objects, it's usually better to only read from those javascript objects when they change.
 
 To hopefully alleviate some of the issues to present themselves when working with two-way data-binding
 in javascript, I've created ybind. The focus of ybind is to be light and flexible. It's also meant to be 
 simple to use. 

Do not attempt to use ybind at this time. It is in very early development.
-----

###### Uses:

| function | description |
| -------- | ----------- |
|ybind.ready(function() {...});|fired when ybind has fully loaded|
|ybind.set(key,value);|used to set a key to a specific (currently only useful for primitives with objects and arrays coming soon)|
 
