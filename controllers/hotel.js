import Hotels from "../models/Hotels.js"
import Rooms from "../models/Rooms.js";

export const createHotel = async(req,res,next)=>{
    const newHotel = new Hotels(req.body)
    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (error) {
        next(error)
    }

}

export const updateHotel = async(req,res,next)=>{
    try {
        
        const updatedHotel = await Hotels.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedHotel)
    } catch (error) {
        next(error)
    }

}

export const deleteHotel = async(req,res,next)=>{
    try {
        await Hotels.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been deleted...")
    } catch (error) {
        next(error)
    }

}

export const getHotel = async(req,res,next)=>{
    
    try {
        const hotel = await Hotels.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (error) {
        next(error)
    }

}


export const getAllHotelByQuery = async(req,res,next)=>{
   
    const {min, max, ...others} =req.query
try {
   
    
    const hotels = await Hotels.find({cheapestPrice :{$gt:min ||1,$lt:max||99999},...others}).limit(req.query.limit)
    res.status(200).json(hotels)
} catch (error) {
    next(error)
}

}

export const countByCity = async(req,res,next)=>{
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city=>{
            return Hotels.countDocuments({city:city})
        }))
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }

}

export const countByType = async(req,res,next)=>{
 
    try {
       const hotelCount =await Hotels.countDocuments({type:"hotel"})
       const homestayCount =await Hotels.countDocuments({type:"homestay"})
       const resortCount =await Hotels.countDocuments({type:"resort"})
       const apartmentCount =await Hotels.countDocuments({type:"apartment"})
        res.status(200).json([
            {type:"hotel",count: hotelCount},
            {type:"homestay",count: homestayCount},
            {type:"resort",count: resortCount},
            {type:"apartment",count: apartmentCount}
        ])
    } catch (error) {
        next(error)
    }

}

export const getHotelRooms =async (req,res,next)=>{
    try {
       const hotel = await Hotels.findById(req.params.id)
       const list = await Promise.all(hotel.rooms.map(room=>{
        return Rooms.findById(room)
       })) 
       res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}