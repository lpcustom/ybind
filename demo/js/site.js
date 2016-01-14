ybind.set("test1", {name: 'hi', value: "Works"});
ybind.set("test2", "Yup");
ybind.set("test3", "What's up?");
ybind.set("test4", 4);
ybind.set("test5", 504565555);
ybind.set("test6", -43);
ybind.set('test7', 'textarea');
ybind.set("test8", "234");
for(var i = 9; i < 101; i++) {
    ybind.set("test" + i, i);
}
ybind.apply();

