import "./singleroom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import useFetch from "../../hooks/useFetch";
import { Link, useLocation } from "react-router-dom";

const SingleRoom = () => {
  const location = useLocation()
  const id = location.pathname.split("/")[2];
  const path = location.pathname.split("/")[1];
  const {data,loading,error}= useFetch(`/rooms/find/${id}`)
  console.log(data);
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
          <Link to={`/rooms/edit/${id}`}>
            <div className="editButton">Edit</div>
            </Link>
            <h1 className="title">Information</h1>
         {loading ? "Loading" : (   <div className="item">
              
              <div className="details">
                <h1 className="itemTitle">{data.title}</h1>
                <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue">{data.description}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Max People</span>
                  <span className="itemValue">{data.maxPeople}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Room Numbers</span>
                  {data.roomNumbers?.map(rNumber=>(
                    <span className="itemValue roomNumber">
                   {rNumber.number}
                   </span>
                  ))
                  }
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price</span>
                  <span className="itemValue">
                   {data.price}
                  </span>
                </div>
              
              </div>
            </div>)}
          </div>
          
        </div>
        
      </div>
    </div>
  );
};

export default SingleRoom;
