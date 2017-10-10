"use strict";

const helpers = require("../helpers");
class Accounts {
    constructor(scope){
        this.scope = scope;
        var router = require("express").Router();
        var bodyParser = require("body-parser");
        var auth = require("../auth");
        router.get("/",this.getAccount.bind(this));
        router.post("/login",bodyParser.json(),this.login.bind(this));
        scope.app.use("/api/accounts",router);
    }
    register(req,res){
    }
    getAccount(req,res){
        return res.send({"data":this.scope.config.port});
    }
    login(req,res){
        var jwt = require("jwt-simple");
        var payload = req.body;
        payload.exp = Math.round(Date.now/1000)+3600*2;
        var self = this;
        var token = jwt.encode(payload,self.scope.config.secret);
        return res.send({token:token});
    }
}

module.exports = Accounts;