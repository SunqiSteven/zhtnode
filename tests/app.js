
const  test = require("tape");
const request = require("request");

test("app testing",function(t){
    t.pass("app passed");
    t.end();
});
test("app testing",function(t){
    t.plan(1);
    let username = "steven";
    t.equal(typeof username, "string");
});