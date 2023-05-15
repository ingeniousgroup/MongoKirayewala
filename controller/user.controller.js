import { User } from "../model/user.model.js";
export const userCheck = async (request,response,next)=>{
    try{
        const data = await User.findOne({email : request.body.email});
        console.log(data);
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