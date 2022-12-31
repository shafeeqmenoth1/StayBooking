import useFetch from '../../hooks/useFetch'
import './featuredProperties.scss'

function FeaturedProperties() {
    const {data,loading,error} = useFetch("/hotels?featured=true&limit=4")
console.log(data);

  return (
    <div className='fp'>
     {loading? "Loading" : (  <>{data.map(item=>(
        <div key={item._id} className="fpItem">

        <img src={item.photos.length >0 ? item.photos[0]:"https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns="} alt="" className="fpImg" />
        <span className="fpName">{item.name}</span>
        <span className="fpCity">{item.city}</span>
        <span className="fpPrice">Starting from {item.cheapestPrice}</span>
  
       {item.rating&& <div className="fpRating">
            <button>{item.rating}</button>
            <span>Excellent</span>
        </div>}
        </div>
     )

     ) }</>)}
        
    </div>
  )
}

export default FeaturedProperties