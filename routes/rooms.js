import express from "express"
import { createRoom, deleteRoom, getAllRooms, getRoom, updateRoom, updateRoomAvailability } from "../controllers/room.js"

import { verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router()



//CREATE
router.post("/:hotelId",verifyAdmin,createRoom)
//UPDATE
router.put("/:id",verifyAdmin,updateRoom)
router.put("/availability/:id",updateRoomAvailability)
//DELETE
router.delete("/:id/:hotelId",deleteRoom)
//GET
router.get("/find/:id",getRoom)
//GET ALL
router.get("/",getAllRooms)


export default router