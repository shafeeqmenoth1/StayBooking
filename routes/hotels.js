import express from "express"
import { countByCity, createHotel, deleteHotel, getHotel, updateHotel,countByType, getHotelRooms, getAllHotelByQuery } from "../controllers/hotel.js"
import Hotels from "../models/Hotels.js"
import { createError } from "../utils/error.js"
import { verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router()



//CREATE
router.post("/",verifyAdmin,createHotel)
//UPDATE
router.put("/:id",verifyAdmin,updateHotel)
//DELETE
router.delete("/:id",deleteHotel)
//GET
router.get("/find/:id",getHotel)
//GET ALL

router.get("/",getAllHotelByQuery)
// get Hotel Count
router.get("/countByCity",countByCity)
router.get("/countByType",countByType)
router.get("/room/:id",getHotelRooms)


export default router