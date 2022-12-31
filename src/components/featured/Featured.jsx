import useFetch from '../../hooks/useFetch'
import './featured.scss'

function Featured() {
    const {data,loading,error} = useFetch("/hotels/CountByCity?cities=Bangalore,Hyderabad,Mumbai")
  
  return (
    <div className='featured'>
       {<> <div className="featuredItem">
            <img src="https://cf.bstatic.com/xdata/images/city/max500/684534.webp?k=d1fe86c22f2433f4e2dda14ddcbe80feb024b0fb30305e5684a1241fba5d4cff&o=" alt="" className="featuredImg" />
            <div className="featuredTitles">
                <h1>Bangalore</h1>
                <h2>{data[0]} Properties</h2>
            </div>
        </div>
        <div className="featuredItem">
            <img src="https://cf.bstatic.com/xdata/images/city/max500/684572.webp?k=f74af2be72834d9953c8096834db666c7769c5f6c1ba230d6fe5591ba84dd33d&o=" alt="" className="featuredImg" />
            <div className="featuredTitles">
                <h1>Hyderabad</h1>
                <h2>{data[1]} Properties</h2>
            </div>
    
        </div>
        <div className="featuredItem">
            <img src="https://cf.bstatic.com/xdata/images/city/max500/900032.webp?k=f47c4d5159bf1986a19a832c2ee17a5f3a446d9fd3a22aa603432bd02e666681&o=" alt="" className="featuredImg" />
            <div className="featuredTitles">
                <h1>Mumbai</h1>
                <h2>{data[2]} Properties</h2>
            </div>
        </div></>}
     
    </div>
  )
}

export default Featured