import "./edituser.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { userInputs } from "../../formSource";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const EditUser = () => {
  const [file, setFile] = useState("");
  const [info,setInfo] = useState({})
  const location = useLocation()
  const id = location.pathname.split("/")[3];
  const {data,loading,error}= useFetch(`/users/find/${id}`)
  console.log(data);
const handleChange = (e)=>{
  setInfo((prev)=>({...prev,[e.target.id]:e.target.defaultValue}))
}
console.log(info);
const handleClick = async(e)=>{
  e.preventDefault()
  const fdata = new FormData()
  fdata.append("file",file)
  fdata.append("upload_preset","upload")
  try {
    let url = ""
    if(file){
      const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dqpeu3u6i/image/upload",fdata)
      console.log(uploadRes);
     url = uploadRes.data.url 
    }
   

   
    await axios.put(`/users/${id}`,{...info,img:url ? url :data.img})
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
          <h1>Edit User</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={!file?
                data.img:URL.createObjectURL(file)
                  
                 
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
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

                <div className="formInput" >
                  <label>Username</label>
                  <input type="text" id="username" defaultValue={data.username} onChange={handleChange}
                  />
                </div>
                <div className="formInput" >
                  <label>Email</label>
                  <input type="email" id="email" defaultValue={data.email} onChange={handleChange}
                  />
                </div>
                <div className="formInput" >
                  <label>Phone</label>
                  <input type="text" id="phone" defaultValue={data.phone} onChange={handleChange}
                  />
                </div>
                <div className="formInput" >
                  <label>City</label>
                  <input type="text" id="city" defaultValue={data.city} onChange={handleChange}
                  />
                </div>
                <div className="formInput" >
                  <label>Country</label>
                  <input type="text" id="country" defaultValue={data.country} onChange={handleChange}
                  />
                </div>
              
              
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
