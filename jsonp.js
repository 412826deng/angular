
var script = document.createElement('script');
let funcName = 'callback'+new Date();
script.src = 'http://127.0.0.1:3000/getMsg?callback='+funcName;
document.appendChildren(script);
window[funcName] = function(data){
    console.log('aaaa')
}