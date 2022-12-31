import useFetch from '../../hooks/useFetch'
import './propertylist.scss'

function PropertyList() {
    const {data,loading,error} = useFetch("/hotels/countByType")
   
    const images = [
        "https://r-xx.bstatic.com/xdata/images/xphoto/300x240/57584488.jpeg?k=d8d4706fc72ee789d870eb6b05c0e546fd4ad85d72a3af3e30fb80ca72f0ba57&o=",
        "https://q-xx.bstatic.com/xdata/images/xphoto/300x240/45450066.jpeg?k=4adfab312f5d26da9f81da48d8c95ca8f108215b2c84085590891a9e0e17b144&o=",
        "https://r-xx.bstatic.com/xdata/images/xphoto/300x240/45450084.jpeg?k=f8c2954e867a1dd4b479909c49528531dcfb676d8fbc0d60f51d7b51bb32d1d9&o=",
        "https://r-xx.bstatic.com/xdata/images/xphoto/300x240/45450056.jpeg?k=251e2507d43a24a4c58bb961b8d157147d56efbf91b49f9606bc768c58f581e4&o="
    ]
  return (
    <div className='pList'>
     {loading ? ("Loading") :( <>  
       
       
       {data && images.map((img,i)=>(
        <div key={i} className="pListItem">
            <img src={img} alt="" className="pListImg" />
            <div className="pListTitles">
                <h1>{data[i]?.type}</h1>
                <h2>{data[i]?.count} {data[i]?.type}</h2>
            </div>
        </div>
       ))}
        </>)}
    </div>
  )
}

export default PropertyList