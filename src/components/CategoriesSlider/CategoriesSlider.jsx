import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";

export default function CategoriesSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 8,
    slidesToScroll: 2,
    autoplay: true,
  };
const [Categories, setCategories] = useState([])
  function getCategories(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then(({data})=> {  
      setCategories(data.data)
    })
  }

    useEffect(() => {
      getCategories()
    }, [])

  return <>
  <div className="py-5">
    <h2 className="py-4 text-gray-800 text-3xl font-bold">Shop Popular Categories</h2>
      <Slider {...settings}>
            {Categories.map((Category) =><div key={Category.id} className="flex flex-col items-center justify-center">
              <img className="w-full h-[13rem]" src={Category.image} alt={Category.name} />
              <h3 className="my-2" >{Category.name}</h3>
              </div>)}
      </Slider>  
  </div>

  </>
}
