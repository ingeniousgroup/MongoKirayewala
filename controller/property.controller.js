import { request } from "express";
import { Property } from "../model/property.modal.js";

export const  List = async (request,response,next)=>{
    try {
      let property = await Property.find();   
       return response.status(200).json({message:"Property Found",status:true,property})
    } catch (err) {
      console.log(err);
       return response.status(500).json({message:"Internal Server Error",status:false})
    }
  }

export const nearByHouse = async (request,response,next)=>{
    try {
        let property = await Property.find();
        property =  property.filter(item=>distance(request.body.latitude,request.body.longitude,item.latitude,item.longitude,"K" )<= 5.0);
        return response.status(200).json({message:"Property Found",status:true,property})
    } catch (err) {
        console.log(err);
       return response.status(500).json({message:"Internal Server Error",status:false});
    }
}  

function distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }

    return dist
}
  

export const categoryCount = async(request,response,next)=>{
  try {
    let villa = await Property.countDocuments({houseCategory:"villa"});
    let flate = await Property.countDocuments({houseCategory:"flat"});
    let farmhouse = await Property.countDocuments({houseCategory:"formHouse"});
    let office = await Property.countDocuments({houseCategory:"office"});
    let plot = await Property.countDocuments({houseCategory:"plot"});
    let category = {villa,flate,farmhouse,office,plot};
     return response.status(200).json({message:"Property Found",status:true,category});
  } catch (err) {
    console.log(err);
     return response.status(500).json({message:"Internal Server Error",status:false})
  }
}