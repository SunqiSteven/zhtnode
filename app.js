
const async = require("async");
const program = require("commander");
const logger = require("./logger");

let appConfig = require("./conf.js");
program.version(appConfig.version)
            .option("--port <port>","server listen port")
            .parse(process.argv);
if (program.port) {
    appConfig.port = program.port;
}
let log = logger({filename:appConfig.logFilePath,errorLevel:appConfig.logLevel});
// console.log('222');
async.auto({
    config:(cb)=>{
        // console.log("config");
        log.error("access log");
        cb(null,appConfig);
    },
    db:["config",(scope,cb)=>{
        const mysql = require("mysql");
        let db = mysql.createPool({
            "user":scope.config.database.user,
            "password":scope.config.database.password,
            "host":scope.config.database.host,
            "connectionLimit":scope.config.database.connectionLimit,
            "database":scope.config.database.database
        });
        cb(null,db);
    }],
    app:["config","db",(scope,cb)=>{
        // console.log("app");
        const express = require("express");
        let app = express();
        cb(null,app);
    }],
    routers:["app",(scope,cb)=>{
        // console.log("routers");
        let routers = {"Account":"./routers/accounts"};
        Object.keys(routers).forEach((key)=>{
            let r = require(routers[key]);
            let r_instance = new r(scope);
        });
        cb(null);
    }],
    ready:["config","app","routers",(scope,cb)=>{
        scope.app.listen(scope.config.port || 8542);
        cb(null);
    }]

},(err,scope)=>{
    if (err) {
        throw err;
    } else {
        console.log("application launched");
    }
});