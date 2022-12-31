import { Link } from 'react-router-dom'
import './searchItem.scss'

function SearchItem({item}) {
  return (
    <div className='searchItem'>
        <img src={item.photos.length >0 ? item.photos[0]:"https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns="} alt="" className="siImg" />
        <div className="siDesc">
            <h1 className="siTitle">{item.name}</h1>
            <span className="siDistance">{item.distance}m from center</span>
            <span className="siTaxiOp">Free airport taxi</span>
            <span className="siSubtitle">Studio Apartment with airCoditioning</span>
            <span className="siFeature">
                {item.desc}
            </span>
            <span className="siCancelOp">Free Cancellation</span>
            <span className="siCancelOpSubtitle">
                You can cancel later, so lock in this grate price today!
            </span>
        </div>
        <div className="siDetails">
          {item.rating &&  <div className="siRating">
                <span>Excellent</span>
                <button>{item.rating}</button>
            </div>}
            <div className="siDetailTexts">
                <span className="siPrice">₹{item.cheapestPrice}</span>
                <span className="siTaxOp">includes taxes and fees</span>
                <Link to={`/hotels/${item._id}`}>
                <button className="siCheckBtn">See availability</button>
                </Link>
                
            </div>
        </div>
    </div>
  )
}

export default SearchItem