import "./edithotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch"
import axios from "axios";
import { useLocation } from "react-router-dom";
const EditHotel = () => {


  const location = useLocation()
  const id = location.pathname.split("/")[3];
  const {data,loading,error} = useFetch(`/hotels/find/${id}`)
  const roomData = useFetch(`/rooms`)
  console.log(roomData);
  const [files, setFiles] = useState("");
  const [info,setInfo] = useState({})
  const [rooms,setRooms] = useState([])
const handleChange = (e)=>{
  setInfo((prev)=>({...prev,[e.target.id]:e.target.value}))
}

const handleSelect =(e)=>{
  const value = Array.from(e.target.selectedOptions,option=>option.value)
  setRooms(value)
}
const handleClick = async(e)=>{
  e.preventDefault()
  try {
    let list =[]
    if(files){
    list= await Promise.all(Object.values(files).map(async(file) =>{
      const fdata = new FormData()
      fdata.append("file", file)
      fdata.append("upload_preset","upload")

     
    
        const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dqpeu3u6i/image/upload",fdata)
     
      const url = uploadRes.data.url 
      
      return url
    }))
  }
  
    await axios.put(`/hotels/${id}`,{...info,photos:list?list:data.photos})
  } catch (error) {
    console.log(error);
  }
}
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Edit Hotel</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                !files?  "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  : URL.createObjectURL(files[0])
                
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                multiple
                  type="file"
                  id="file"
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

           
                <div className="formInput" >
                  <label>Name</label>
                  <input type="text" defaultValue={data.name}
                  onChange={handleChange}
                  id="name" />
                </div>
                <div className="formInput" >
                  <label>Type</label>
                  <input type="text" defaultValue={data.type}
                  onChange={handleChange}
                  id="type" />
                </div>
                <div className="formInput" >
                  <label>City</label>
                  <input type="text" defaultValue={data.city}
                  onChange={handleChange}
                  id="city" />
                </div>
                <div className="formInput" >
                  <label>Address</label>
                  <input type="text" defaultValue={data.address}
                  onChange={handleChange}
                  id="address" />
                </div>
                <div className="formInput" >
                  <label>Distance</label>
                  <input type="text" defaultValue={data.distance}
                  onChange={handleChange}
                  id="distance" />
                </div>
                <div className="formInput" >
                  <label>Title</label>
                  <input type="text" defaultValue={data.title}
                  onChange={handleChange}
                  id="tile" />
                </div>
                <div className="formInput" >
                  <label>Description</label>
                  <input type="text" defaultValue={data.desc}
                  onChange={handleChange}
                  id="desc" />
                </div>
                <div className="formInput" >
                  <label>Price</label>
                  <input type="text" defaultValue={data.cheapestPrice}
                  onChange={handleChange}
                  id="cheapestPrice" />
                </div>
               <div className="formInput" >
                  <label>Featured</label>
                 <select id="featured" value ={data.featured} onChange={handleChange}>
                
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                 </select>
                </div>
                <div className="selectRoom" >
                  <label>Select Room</label>
                 <select id="rooms" multiple onChange={handleSelect}>
                  { roomData.data.map(room=>(
                    <option key={room._id} value={room._id}>{room.title}</option>
                  ))}
                 </select>
                </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHotel;
