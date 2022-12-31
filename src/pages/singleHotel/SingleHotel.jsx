import "./singlehotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import useFetch from "../../hooks/useFetch";
import { Link, useLocation } from "react-router-dom";

const SingleHotel = () => {
  const location = useLocation()
  const id = location.pathname.split("/")[2];
  const {data,loading,error}= useFetch(`/hotels/find/${id}`)

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
          <Link to={`/hotels/edit/${id}`}>
            <div className="editButton">Edit</div>
            </Link>
            <h1 className="title">Information</h1>
         {loading ? "Loading" : (   <div className="item">
              <img src={
                data.photos ? data.photos[0]:"https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns="} alt="" className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{data.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Type:</span>
                  <span className="itemValue">{data.type}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">City:</span>
                  <span className="itemValue">{data.city}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                   {data.address}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Distance:</span>
                  <span className="itemValue">
                   {data.distance}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Title:</span>
                  <span className="itemValue">
                   {data.title}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Descrption:</span>
                  <span className="itemValue">
                   {data.desc}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price:</span>
                  <span className="itemValue">
                   {data.cheapestPrice}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Rooms:</span>
                  <span className="itemValue">
                   {data.rooms}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Rating:</span>
                  <span className="itemValue">
                   {data?.rating}
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

export default SingleHotel;
