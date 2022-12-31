import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocation } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Header from "../../components/header/Header"
import Navbar from "../../components/navbar/Navbar"
import MailList from "../../components/mailList/MailList"
import Footer from "../../components/footer/Footer"
import "./hotel.scss"
import { useContext, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import useFetch from "../../hooks/useFetch.js"
import { SearchContext } from "../../context/SerachContext"
import { AuthContext } from "../../context/AuthContext"
import Reserve from "../../components/reserve/Reserve"

function Hotel() {

  const [slideNumber,setSlideNumber] = useState(0)
  const [openSlide,setOpenSlide] = useState(false)
  const [openModal,setOpenModal] = useState(false)

  const location = useLocation()
  const id = location.pathname.split("/")[2]
  const {data,loading,error,reFetch} = useFetch(`/hotels/find/${id}`)

  const handleOpen = (i)=>{
    setSlideNumber(i)
    setOpenSlide(true)
  }
const {dates,options} = useContext(SearchContext)

const {user} = useContext(AuthContext)

const MILLISECONDS_PER_DAY = 1000 *60*60*24;

function dayDifference(date1,date2) {
  const timeDiff = Math.abs(date2.getTime()-date1.getTime())
  const diffDays = Math.ceil(timeDiff/MILLISECONDS_PER_DAY)
  return diffDays
}
const days = dayDifference(dates[0].startDate,dates[0].endDate)

  const handleMove = (direction)=>{
    let newSlideNumber;
    if(direction === "l"){
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1
    }else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1
    }

    setSlideNumber(newSlideNumber)
  }
  const navigate = useNavigate()
  const handleClick = (e)=>{
    if(user){
      setOpenModal(true)
    }else{
      navigate("/login")
    }
  }
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? " Loading" : (<div className="hotelContainer">
        {openSlide&&<div className="slider">
          <  FontAwesomeIcon icon={faCircleXmark} className="close" onClick={()=>{setOpenSlide(false)}}/>
          <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={()=>{handleMove("l")}} />
          <div className="sliderWrapper">
            <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
          </div>
          <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={()=>{handleMove("r")}}/>
        
        </div>}
        <div className="hotelWrapper">
          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAdress">
            <FontAwesomeIcon icon={faLocation} />
            <span> {data.address}
            </span>
          </div>
          <span className="hotelDistance">
            Excellent location - {data.distance}m from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over ₹{data.cheapestPrice} at this property
          </span>
          <div className="hotelImages">
            {
              data.photos?.map((photo,i )=> (
                <div className="hotelImgWrapper">
                  <img onClick={()=>handleOpen(i)} src={photo} alt="" className="hotelImg" />
                </div>
              ))
            }
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{data.title}</h1>
              <p className="hotelDesc">
                {data.desc} 
              </p>
            </div>
            <div className="hotelDetailsprice">
              <h1>Perfect for a {days} night stay</h1>
              <span>Located in heart of Hyderabad, this property has an excellent location score of 9.8!</span>
            <h2><b>₹{days*data.cheapestPrice * options.room}</b> ({days} nights)</h2>
            <button onClick={handleClick}>Reserve or Book now!</button>
            </div>
          </div>
        </div>
        <MailList/>
        <Footer/>
      </div>)}
      {openModal && <Reserve setOpen = {setOpenModal} hotelId={id}/>}
    </div>
  )
}

export default Hotel