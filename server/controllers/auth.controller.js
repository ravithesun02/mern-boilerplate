import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import config from '../../config/config';
import expressJwt from 'express-jwt';
const signin=async (req,res)=>{
    try
    {
        let user=await User.findOne({"email":req.body.email})

        console.log(user);
        if(!user)
            return res.status('401').json({error: 'User not found'});
            
        if(!user.authenticate(req.body.password))
            return res.status('401').json({error: 'Email and password don\'t match'});
        
        console.log(user.authenticate(req.body.password));

        const token=jwt.sign({_id:user._id},config.jwtSecret)
        res.cookie('t',token,{expire: new Date()+9999});

        return res.status('200').json({
            token,user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                
            }
        })
    }
    catch(err)
    {
        console.log(err);
        return res.status('401').json({error:"Could not sign in"});
    }
}

const signout=(req,res)=>{
    res.clearCookie("t");
    return res.status('200').json({message:'Signed out'});
}

const requireSignin=expressJwt({
    secret:config.jwtSecret,
    userProperty:'auth',
    algorithms: ['HS256'],
    
})

const hasAuthorization=(req,res,next)=>{
    const authorized=req.profile && req.auth && req.profile._id == req.auth._id
    if(!authorized)
        return res.status('403').json({message:'Authorization required'});        
    next()
}

export default {signin,signout,requireSignin,hasAuthorization};
