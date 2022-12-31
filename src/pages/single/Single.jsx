import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import useFetch from "../../hooks/useFetch";
import { Link, useLocation } from "react-router-dom";

const Single = () => {
  const location = useLocation()
  const id = location.pathname.split("/")[2];
  const path = location.pathname.split("/")[1];
console.log(path);
  const {data,loading,error}= useFetch(`/users/find/${id}`)
  console.log(data);
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <Link to={`/users/edit/${id}`}>
            <div className="editButton">Edit</div>
            </Link>
            <h1 className="title">Information</h1>
         {loading ? "Loading" : (   <div className="item">
              <img src={
                data.img ? data.img  :"https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns="} alt="" className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{data.username}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email: </span>
                  <span className="itemValue">{data.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{data.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    {data.city}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">{data.country}</span>
                </div>
              </div>
            </div>)}
          </div>
          
        </div>
        
      </div>
    </div>
  );
};

export default Single;
