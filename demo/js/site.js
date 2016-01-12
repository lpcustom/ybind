ybind.ready(function() {
    ybind.set("test1", "Works");
    ybind.set("test2", "Yup");
    ybind.set("test3", "What's up?");
    ybind.set("test4", 4);
    ybind.set("test5", 504565555);
    ybind.set("test6", -43);
    ybind.set("test8", "234");
    for(var i = 9; i < 10000; i++) {
        ybind.set("test" + i, i);
    }
    ybind.apply();
});
