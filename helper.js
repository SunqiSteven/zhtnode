
exports.getTimestamp = function (){
    return Math.round(Date.now()/1000);
}
exports.isInteger = function(v){
    return typeof v === "string" && /^\d+$/.test(v);
}
exports.isArray = function(v){
    return Object.prototype.toString.call(v) === "[object Array]";
}
exports.isObject = function (v) {
    return Object.prototype.toString.call(v) === "[object Object]";
}
exports.checkCellphone = function (v){
    return typeof v === "string" && /^1[358]\d{9}$/.test(v);
}
exports.checkEmail = function(v){
    return typeof v === "string" && /^[a-z0-9]+[-_]*[a-z0-9]*@[a-z0-9]+(\.\w{2,3}){1,3}$/.test(v);
}
exports.genRandom = function(){
    var n = (Math.random()*100).toFixed(0);
    return Number(n);
}
