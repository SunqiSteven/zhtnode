
const jwt = require("jwt-simple");

module.exports = (req,res,next)=>{
    var appConfig = require("./conf");
    try{
        var payload = jwt.decode(req.query.token,appConfig.secret);
        console.log(payload);
        if (payload.exp < Math.round(Date.now/1000)) {
            return res.send({success:false,error:"access token expired"});
        }
        next();
    }catch(e){
        return res.send({success:false,error:e.message});
    }
};
