import { useQuery } from "@tanstack/react-query";
import axios from "axios"
import { useContext } from "react";
import {  Link } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import { CartContext } from "../../Context/CartContext";
import toast from 'react-hot-toast';

export default function RecentProducts() {

let {addToCart} = useContext(CartContext);

async function addProduct(productId){
  let response = await addToCart(productId);
  if(response.data.status === "success"){
    console.log("product added successfully")
    toast.success('product added successfully',{
      duration: 2000,
    });
  }
  else{
    toast.error('Error adding Product to your cart',{
      duration: 2000,
    });
    console.log("error");
  }
  console.log(response);
}

// useQuery
  function setProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
   let {data , isError , error ,isLoading , isFetching} = useQuery({
    queryKey: "recentProducts",
    queryFn: setProducts,
  })
  if (isLoading) 
  return <div className="py-8 w-full flex justify-center items-center">
    <HashLoader color="green"/>
  </div> 

if (isError)
 return <div className="py-8 w-full flex justify-center items-center">
  <h3>{error}</h3>
</div> 
  // let [products, setProducts] = useState([]); 
  // function getRecentProducts(){
  //   axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  //   .then(({data})=> {
  //     setProducts(data.data)
  //   })
  // }
  // useEffect(() => {
  //   getRecentProducts()
  // }, [])


  return <>
  <div className="flex flex-wrap px-4   items-center ">
    {data?.data.data.map((product) =>     <div key={product.id} className="w-1/6 px-4">
        <div className="product py-3 h-100">
          <Link to={`/productsdetails/${product.id}`}>
          <img src={product.imageCover} alt={product.image} className="w-full" />
          <h2 className="text-lg  font-semibold text-green-600">{product.category.name}</h2>
          <h2 className="text-lg  font-normal text-gray-900">{product.title.split(' ').slice(0,2).join(" ") }</h2>

            <div className="flex justify-between items-center mt-4">
              <p className="text-lg font-semibold">{product.price} EGP</p>
              <p className="text-lg font-semibold">{product.ratingsAverage} <i className="fas fa-star text-yellow-500"></i></p>
            </div>

            </Link>
            <button onClick={()=>addProduct(product.id)} className="btn px-4 py-2 mt-2 w-full rounded-lg text-white bg-green-600">add to cart</button>
        </div>

      </div> )}

  </div>
 </>
}
