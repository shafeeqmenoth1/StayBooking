import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './header.scss'
import { DateRange } from 'react-date-range';
import {useContext, useState} from 'react'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format } from 'date-fns'
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SerachContext';
import { AuthContext } from '../../context/AuthContext';

function Header({type}) {
  
  const [destination,setDestination] = useState("")
  const [openDate,setOpenDate] = useState(false)
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [openOption,setOpenOption] = useState(false)
  const [options,setOptions] = useState({
    adult : 1,
    children :0,
    room:1
  })

  const {user} = useContext(AuthContext)

  const handleoption = (name,operation)=>{
    setOptions((prev)=>{return {
      ...prev, [name]: operation === "i" ? options[name] +1 : options[name] - 1
    }})
  }
  const {dispatch} = useContext(SearchContext)
 const navigate = useNavigate()
  const handleSearch = ()=>{
    dispatch({type:"NEW_SEARCH",payload:{destination,dates,options}})
    navigate("/hotels", {state: {destination,dates,options}})
  }
  return (
    <div className='header'>
        <div className={ type === "list" ? 'headerContainer listMode' : 'headerContainer'}>
        <div className="headerList">
            <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
            </div>
            <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
            </div>
            <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
            </div>
            <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
            </div>
            <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
            </div>
        </div>
       {type !== "list" && <>  <h1 className="headerTitle">A Lifetime of discounts? It's Genius.</h1>
      <p className='headerDesc'>Search low prices on hotels, homes and much more...</p>
        {!user &&<button className="headerBtn">Sign in / Register</button>}
        <div className="headerSearch">
            <div className="headerSearchItem">
            <FontAwesomeIcon icon={faBed} className="headerIcon"/>
            <input onChange={e=>{setDestination(e.target.value)}} type="text" placeholder='Where are you going ?' className='headerSearchInput'/>
            </div>
            <div className="headerSearchItem">
            <FontAwesomeIcon icon={faCalendarDays} className="headerIcon"/>
            <span onClick={()=>{setOpenDate(!openDate)}} className='headerSearchText'>{`${format(dates[0].startDate, "dd/MM/yyyy")}
            to ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
         { openDate &&  <DateRange
                editableDateInputs={true}
                onChange={item => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                minDate={new Date()}
                className="date"
            />}
           
            </div>
            <div className="headerSearchItem">
            <FontAwesomeIcon icon={faPerson} className="headerIcon"/>
            <span className='headerSearchText' onClick={()=>setOpenOption(!openOption)}>{`${options.adult} adult . ${options.children} children . ${options.room} room`}</span>
       { openOption &&   <div className="options" >
            <div className="optionItem">
              <span className="optionText">Adult</span>
              <div className="optionCounter">
              <button className="optionCounterBtn" disabled={options.adult <=1} onClick={()=>handleoption("adult","d")}>-</button>
              <span className="optionCounterNumber">{options.adult}</span>
              <button className="optionCounterBtn" onClick={()=>handleoption("adult","i")}>+</button>
              </div>
            </div>
            <div className="optionItem">
              <span className="optionText">Children</span>
              <div className="optionCounter">
              <button className="optionCounterBtn" disabled={options.children <=0} onClick={()=>handleoption("children","d")}>-</button>
              <span className="optionCounterNumber">{options.children}</span>
              <button className="optionCounterBtn" onClick={()=>handleoption("children","i")}>+</button>
              </div>
            </div>
            <div className="optionItem">
              <span className="optionText">Room</span>
              <div className="optionCounter">
              <button className="optionCounterBtn" disabled={options.room <=1} onClick={()=>handleoption("room","d")}>-</button>
              <span className="optionCounterNumber">{options.room}</span>
              <button className="optionCounterBtn" onClick={()=>handleoption("room","i")}>+</button>
              </div>
            </div>
           </div>}
            </div>
            <div className="headerSearchItem">
           <button className="headerBtn" onClick={handleSearch}>Search</button>
            </div>
        </div> </>}
        </div>
    </div>
  )
}

export default Header