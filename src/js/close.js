// 闭包

var arr = [1, 3, 5, 6, 8, 22];
for(var i = 0; i< arr.length; i ++) {
    console.log('i:', i);
}

for(var j = 0; j < arr.length; j++) {
    (function(j){
        console.log('j:', j)
    })(j)
}