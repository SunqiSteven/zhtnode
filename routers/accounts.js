"use strict";

const helper = require("../helper");
class Accounts {
    constructor(scope){
        this.scope = scope;
        let router = require("express").Router();
        let bodyParser = require("body-parser");
        let auth = require("../auth");
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
        let jwt = require("jwt-simple");
        let payload = req.body;
        payload.exp = Math.round(Date.now/1000)+3600*2;
        let self = this;
        let token = jwt.encode(payload,self.scope.config.secret);
        return res.send({token:token});
    }
    withdraw(req,res){
        // if (!helper.isInteger(req.uid)){
        //     return res.send({success:false,error:"invalid uid"});
        // }
    }
}

module.exports = Accounts;