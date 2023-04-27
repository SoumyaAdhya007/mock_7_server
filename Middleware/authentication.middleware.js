const jwt=require("jsonwebtoken");
require("dotenv").config();
const authentiation=(req,res,next)=>{
    let token= req.headers.authorization;
    if(!token){
        res.status(400).send({msg:"Login To Access"})
    }
    jwt.verify(token,process.env.key, async(err,decode)=>{
        try {
            if(err){
                return res.status(400).send({msg:err})
            }else{
                req.body.userId=decode.id;
                next()
            }

        } catch (error) {
            return res.status(404).send({msg:err})
            
        }
    })
}
module.exports={
    authentiation
}