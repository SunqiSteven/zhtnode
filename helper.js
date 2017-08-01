
exports.getTimestamp = function (){
    return Math.round(Date.now()/1000);
};
exports.isInteger = function(v){
    return typeof v === "string" && /^\d+$/.test(v);
};
exports.isArray = function(v){
    return Object.prototype.toString.call(v) === "[object Array]";
};
exports.isObject = function (v) {
    return Object.prototype.toString.call(v) === "[object Object]";
};
exports.checkCellphone = function (v){
    return typeof v === "string" && /^1[358]\d{9}$/.test(v);
};
exports.checkEmail = function(v){
    return typeof v === "string" && /^[a-z0-9]+[-_]*[a-z0-9]*@[a-z0-9]+(\.\w{2,3}){1,3}$/.test(v);
};
exports.genRandom = function(){
    var n = (Math.random()*100).toFixed(0);
    return Number(n);
};
exports.decrypt = function(ciphertext,key,algo){
    var crypto = require("crypto");
    try{
        var decipher = crypto.createDecipher(algo,key);
        var decrypted = decipher.update(ciphertext,"hex","utf8");
        var decrypted = decrypted += decipher.final("utf8");
        return decrypted;
    }catch(e){
        return false;
    }
};
exports.encrypt = function(data,key,algo){
    const crypto = require("crypto");
    const cipher = crypto.createCipher(algo, key);
    var encrypted = cipher.update(data, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
};
//safe float number computation
exports.f_add = function(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (mul(a, e) + mul(b, e)) / e;
};
exports.f_sub = function(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (mul(a, e) - mul(b, e)) / e;
};
exports.f_mul = function(a, b) {
    var c = 0,
        d = a.toString(),
        e = b.toString();
    try {
        c += d.split(".")[1].length;
    } catch (f) {}
    try {
        c += e.split(".")[1].length;
    } catch (f) {}
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
};
exports.f_div = function (a, b) {
    var c, d, e = 0,
        f = 0;
    try {
        e = a.toString().split(".")[1].length;
    } catch (g) {}
    try {
        f = b.toString().split(".")[1].length;
    } catch (g) {}
    return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e));
};

