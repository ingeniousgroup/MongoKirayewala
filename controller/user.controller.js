import email from "../Authentication/email.js";
import { User } from "../model/user.model.js";
export const userCheck = async (request,response,next)=>{
    try{
        console.log(request.body);
        const data = await User.findOne({email : request.body.email});
        if(!data?.email)
            {
                console.log('Yaha pe aa gya...');
                if(request.body.status)
                {
                    console.log('Yaha pe aa gya...2');
                    email(request.body.email,"User verification from Kirayewala",request.body.name,request.body.otp);
                }
            }
        data?.email ?  response.status(200).json({user:data,status : false}) : response.status(200).json({message : 'You can register now...',status : true});
    }   
    catch(err)
    {
        console.log(err);
        return response.status(500).json({message : 'Ohho something goes wrong',status:false})
    }
}
export const createUser = async (request,response,next)=>{
try{
    const user = await User.create(request.body);
    return response.status(200).json({message : 'User Logged in by google',status : true});
}
catch(err){
    console.log(err);
    return response.status(500).json({message : 'Internal Server error',status:false});
}
}