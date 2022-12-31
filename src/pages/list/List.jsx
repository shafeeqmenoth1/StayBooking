import React,{useState} from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import {format } from 'date-fns'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import "./list.scss"
import SearchItem from '../../components/searchItem/SearchItem'
import useFetch from '../../hooks/useFetch'

function List() {

  const location = useLocation()

  const [destination,setDestination] = useState(location.state.destination)
  const [dates,setDates] = useState(location.state.dates)
  const [options,setOptions] = useState(location.state.options)
  const [openDate,setOpenDate] = useState(false)
  const [min,setMin] = useState(undefined)
  const [max,setMax] = useState(undefined)
  const {data,loading,error,reFetch} = useFetch(`/hotels?city=${destination}&min=${min || 0}&max=${max || 99999}`)

  const handleClick = ()=>{
    reFetch()
  }
  return (
    <div>
      <Navbar/>
      <Header type= "list"/>
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label >Destination</label>
              <input type="text" placeholder={destination}/>
            </div>
            <div className="lsItem">
              <label >Check-in date</label>
              <span className='date' onClick={()=>setOpenDate(!openDate)}>{`${format(dates[0].startDate, "dd/MM/yyyy")}
            to ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
           {openDate&& <DateRange
              onChange={item => setDates([item.selection])}
              ranges={dates}
              minDate={new Date()}
              />}
            </div>
            <div className="lsItem">
              <label >Options</label>
              <div className="lsOptions">
           <div className="lsOptionItem">
            <span className="isOptionText">
              Min price <small>per night</small>
            </span> 
            <input type="number" onChange={e=>{setMin(e.target.value)}} className='lsOptionInput' />
           </div>
           <div className="lsOptionItem">
            <span className="isOptionText">
              Max price <small>per night</small>
            </span> 
            <input type="number" onChange={e=>{setMax(e.target.value)}}  className='lsOptionInput' />
           </div>
           <div className="lsOptionItem">
            <span className="isOptionText">
              Adult 
            </span> 
            <input type="number" className='lsOptionInput' min={1} placeholder={options.adult} />
           </div>
           <div className="lsOptionItem">
            <span className="isOptionText">
              Children
            </span> 
            <input type="number" min={0} className='lsOptionInput' placeholder={options.children} />
           </div>
           <div className="lsOptionItem">
            <span className="isOptionText">
              Room
            </span> 
            <input type="number" min={1} className='lsOptionInput' placeholder={options.room} />
           </div>
            </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? "Loading" : <>
            {
              data.map(item=>(
              <SearchItem item={item} key={item._id}/>
              ))
            }
            </>}
            
          
          </div>
        </div>
      </div>
    </div>
  )
}

export default List