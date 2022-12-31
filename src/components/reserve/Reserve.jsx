import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { nextDay } from 'date-fns/esm'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SerachContext'
import useFetch from '../../hooks/useFetch.js'
import './reserve.scss'

function Reserve({setOpen,hotelId}) {
    const [selectedRooms,setSelectedRooms] = useState([])
    const {dates} = useContext(SearchContext)
    const {data,loading,error} = useFetch(`/hotels/room/${hotelId}`)
    const handleSelect = (e)=>{
        const checked = e.target.checked
        const value = e.target.value
        setSelectedRooms(checked ? [...selectedRooms,value]:selectedRooms.filter((item)=>item !== value))
    }
    const navigate= useNavigate()
    const getDatesInRange = (startDate,endDate)=>{
        const start = new Date(startDate)
        const end = new Date(endDate)

        const date = new Date(start.getTime())
        const dates = []
        while(date <= end){
            dates.push(new Date(date).getTime())
            date.setDate(date.getDate() + 1)
        }
        return dates
    }
    const allDates = getDatesInRange(dates[0].startDate,dates[0].endDate)
console.log(allDates);
    const isAvailable = (roomNumber)=>{
        const isFound = roomNumber.unavailableDates.some((date)=>
            allDates.includes(new Date(date).getTime())
        )
        return !isFound
    }
    const handleClick = async()=>{
        try {
            await Promise.all(selectedRooms.map((roomId)=>{
                const res = axios.put(`/rooms/availability/${roomId}`,{dates:allDates})
                return res.data
            }))
            setOpen(false)
            navigate("/")
            
        } catch (error) {
            
        }
    }
  return (
    <div className='reserve'>
        <div className="rContainer">
          
            <FontAwesomeIcon icon={faCircleXmark} className='rClose' onClick={()=>setOpen(false)}/>
            <span>Select your rooms:</span>
            {data.map(item=>(
                <div className="rItem">
                    <div className="rItemInfo">
                        <div className="rTitle">{item.title}</div>
                        <div className="rDesc">{item.desc}</div>
                        <div className="rMax">MAx People:<b>{item.maxPeople}</b></div>
                        <div className="rPrice"><b>{item.price}</b></div>
                    </div>
                    <div className="rSelectRoom">
                    {item.roomNumbers.map(roomNumber=>(
                        <div className="room">
                            <label htmlFor="">{roomNumber.number}</label>
                            <input type="checkbox" value={roomNumber._id} onChange={handleSelect} 
                            disabled={!isAvailable(roomNumber)}/>
                        </div>

                    ))}
                    </div>
                   
                </div>
            ))}
             <button onClick={handleClick} className="rButton">Reserve now !</button>
        </div>
    </div>
  )
}

export default Reserve