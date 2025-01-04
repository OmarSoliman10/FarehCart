import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import Slider from "react-slick";

export default function ProductsDetails() {
  let { id } = useParams()
  const [productsDetails, setProductsDetails] = useState(null)

  function getProductsDetails(id){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then(({data})=> {  
      setProductsDetails(data.data)
    })
  }

    useEffect(() => {
      getProductsDetails(id)
    }, [])

    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

  return <>
  <div className="flex flex-wrap px-4 items-center justify-center" >



      <div className="w-1/4">
      <Slider {...settings}>
        {productsDetails?.images?.map((image) => <img className="w-full" src={image} alt={productsDetails.title} />)}
      </Slider>
      </div>

      <div className="w-1/2 p-6 ">
        <h1 className="text-lg font-normal text-gray-950 ">{productsDetails?.title}</h1>
        <p className="text-gray-600 font-light mt-4">{productsDetails?.description}</p>

        <div className="flex justify-between items-center mt-4">
          <p className="text-lg font-semibold">{productsDetails?.price} EGP</p>
          <p className="text-lg font-semibold">{productsDetails?.ratingsAverage} <i className="fas fa-star text-yellow-500"></i></p>
        </div>
        <button className="btn px-4 py-2 mt-2 w-full rounded-lg text-white bg-green-600">add to cart</button>
      
      </div>



  </div>
  
  </>
}
