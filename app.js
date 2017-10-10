
const async = require("async");
const program = require("commander");
const logger = require("./logger");

var appConfig = require("./conf.js");
program.version(appConfig.version)
            .option("--port <port>","server listen port")
            .parse(process.argv);
if (program.port) {
    appConfig.port = program.port;
}
var log = logger({filename:appConfig.logFilePath,errorLevel:appConfig.logLevel});

async.auto({
    config:(cb)=>{
        // console.log("config");
        // log.error("access log");
        cb(null,appConfig);
    },
    db:["config",(scope,cb)=>{
        const mysql = require("mysql");
        var db = mysql.createPool({
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
        var app = express();
        app.disable("x-powered-by");
        // app.set("views",__dirname+"/public/views/");
        // app.engine(".html", require("ejs").__express);
        // app.set("view engine", "html");
        app.use("/",function(req,res,next){
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods","PUT,POST,GET,DEvarE,OPTIONS");
            res.header("Access-Control-Allow-Headers","x-requested-with,content-type");
            res.header("Content-Type", "application/json; charset=utf-8");
            next();
        });
        cb(null,app);
    }],
    routers:["app",(scope,cb)=>{
        // console.log("routers");
        var routers = {"Account":"./routers/accounts"};
        Object.keys(routers).forEach((key)=>{
            var r = require(routers[key]);
            var r_instance = new r(scope);
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
        /*
        graceful shutdown ,close all databases connections, 
        clear data queues or whatever.
        */
        process.on('SIGINT',()=>{
            // console.log('2222');
            log.error('graceful shutdown');
            scope.db.end((err)=>{
                process.exit(err ? 1 : 0);
            });
        });
    }
});