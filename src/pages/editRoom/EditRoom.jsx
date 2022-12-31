import "./editroom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useLocation } from "react-router-dom";

const EditRoom = () => {
  const location = useLocation()
  const id = location.pathname.split("/")[3];
  const rData = useFetch(`/rooms/find/${id}`)

  const {data,loading,error} = useFetch("/hotels")
  const [info,setInfo] = useState({})
  const [rooms,setRooms] = useState([])
  const [hotelId,setHotelId] = useState(undefined)
const handleChange = (e)=>{
  setInfo((prev)=>({...prev,[e.target.id]:e.target.value}))

}

const handleClick =async()=>{
  const roomNumbers = rooms.split(",").map((room)=>({number:room}))
 try {
  await axios.put(`/rooms/${hotelId}`,{...info,roomNumbers})
 } catch (error) {
  
 }
}

const renderRoomsNumber=(roomData)=>{
 return roomData.roomNumbers?.map(rNumber=>{return rNumber.number})
}

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Edit Room</h1>
        </div>
        <div className="bottom">
          
          <div className="right">
            <form>
             

             
                <div className="formInput" >
                  <label>Title</label>
                  <input type="text" id="title" defaultValue={rData.data.title}
                  onChange={handleChange} />
                </div>
            
              <div className="formInput">
                  <label>Choose a hotel</label>
                  <select id="hotelId" onChange={e=>setHotelId(e.target.value)}>
                    {loading ? "Loading" : data && data.map(hotel=>(
                      <option key={hotel._id}  value={hotel.id}>{hotel.name}</option>
                    ))}
                  </select>
                </div>
                <div className="formInput" >
                  <label>Rooms</label>
                  <textarea onChange={e=>setRooms(e.target.value)} defaultValue={renderRoomsNumber(rData.data)}/>
                </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRoom;
