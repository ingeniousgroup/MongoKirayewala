import { User } from "../model/user.model.js"

export const signup = async (request,response,next)=>{
  try {
    let user =  await User.create(request.body)
    return response.status(200).json({message:"Success FUll",status:true})
  } catch (error) {
    console.log(error);
  }
}