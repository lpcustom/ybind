### ybind

*Easy Directional Data Binding*

___

**Do not use unless you wish to contribute to the code!**

___

I love data-binding using a library like AngularJS, but I've found that large data sets pose a problem for the two-way approach. In a lot of cases, the data that you want to bind only needs to change in one direction. Meaning that, DOM changes can make one-way instant changes to javascript without the need for a watcher, and/or javascript value changes affects the DOM values when required. The goal of the ybind approach is to eliminate labor-intense watcher loops and allow developers to get the same functionality as two-way binding with faster browser response times.
 
Another issue I have with Angular two-way binding is that I would prefer to have the power to influence when the DOM is updated with new values from the server. That allows for no interval of watchers. This simply means that instead of just updating the values in javascript and expecting the binding library to automatically update the values on the DOM, in ybind, we apply those changes when we need them to occur via:

`ybind.apply()`
 
To hopefully alleviate some of the issues that present themselves when working with two-way data-binding in javascript, I've created ybind. The focus of ybind is to be light and flexible. It's also meant to be simple to use. 

___

**Do not use unless you wish to contribute to the code!**

___

######Notes on Usage

  * `ybind.ready(function() {...});` <br> Fired when ybind has fully loaded. Include all your initial logic here.  
  * `ybind.set(key,value);` <br> Used to set a key to a specific value. This is currently only useful for primitives. Objects and arrays coming soon!  
  * `<input data-bind-to='key' />` <br> Used to set the value from a form element (one way binding where the user changes the value.  
  * `<span data-bind-from='key'>` <br> Used to set the value from javascript (one way binding where the browser changes the value of the data.   
  * Using both `data-bind-from` and `data-bind-to` with the same attribute value <key> will simulate two-way data-binding for an input element.  
  * `ybind.apply()` <br> Used to apply changes which have just been made to the javascript value to the DOM  

-------