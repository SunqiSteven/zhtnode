
const  test = require("tape");
const request = require("request");


test("order api test",function(t){
    t.plan(2);
    const server = "http://www.gailougaoshou.com";
    // const server = "http://www.intelvest.com";
    request({
        url:server+"/intelvest/api/alipay/create",
        method:"POST",
        body:{uid:8137,taocan_id:1},
        json:true,
    },function(err,response,body){
        if (err) {
            t.fail(err.message);
        }
        console.log(body);
        t.equal(body.success,true);
        var tradeno = body.data.order_no;
        const crypto = require("crypto");
        const secret_key = "98123beshiapi";
        var kstr = crypto.createHash("md5").update(tradeno+secret_key).digest("hex");
        request({
            url:server+"/intelvest/api/alipay?kstr="+kstr+"&tradeno="+tradeno,
            method:"GET"
        },function(err,response,body){
            console.log(body);
            body = JSON.parse(body);
            t.equal(body.success,true);
        })
    })
})