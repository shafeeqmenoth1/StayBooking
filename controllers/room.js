import Rooms from "../models/Rooms.js";
import { createError } from "../utils/error.js";
import Hotels from "../models/Hotels.js"

export const createRoom = async (req,res,next)=>{

    const hotelId = req.params.hotelId
    const newRoom = new Rooms(req.body)

    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotels.findByIdAndUpdate(hotelId,{$push:{rooms:savedRoom._id}})
        } catch (error) {
            next(error)
        }
        res.status(200).json(savedRoom)
    } catch (error) {
        next(error)
    }
}

export const updateRoom = async(req,res,next)=>{
    
    try {
        const updatedRoom = await Rooms.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedRoom)
    } catch (error) {
        next(error)
    }

}
export const updateRoomAvailability = async(req,res,next)=>{
    console.log(req.body.dates);
    try {
       await Rooms.updateOne({"roomNumbers._id":req.params.id},{
            $push:{
                "roomNumbers.$.unavailableDates":req.body.dates
            }
        })
        res.status(200).json("Room Status has been Updated")
    } catch (error) {
        next(error)
    }

}

export const deleteRoom = async(req,res,next)=>{
    const hotelId = req.params.hotelId
    try {
        await Rooms.findByIdAndDelete(req.params.id)
        try {
            await Hotels.findByIdAndUpdate(hotelId,{$pull:{rooms:req.params.id}})
        } catch (error) {
            next(error)
        }
        res.status(200).json("Room has been deleted...")
    } catch (error) {
        next(error)
    }

}

export const getRoom = async(req,res,next)=>{
    
    try {
        const room = await Rooms.findById(req.params.id)
        res.status(200).json(room)
    } catch (error) {
        next(error)
    }

}

export const getAllRooms = async(req,res,next)=>{
    try {
        const rooms = await Rooms.find()
        res.status(200).json(rooms)
    } catch (error) {
        next(error)
    }

}