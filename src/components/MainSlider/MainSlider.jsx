import mainSlider from "../../assets/images/slider/0a865359-651e-4038-96e3-cf1f853014ee.gif";
import slider1 from "../../assets/images/slider/._grocery -banner.png";
import slider2 from "../../assets/images/slider/20e3efeb-9ac1-4d75-acb4-015419b4170e.avif";
import slider3 from "../../assets/images/slider/682b6f34-76ec-401e-bcf8-b4323c97baab.avif";

import Slider from "react-slick";

export default function MainSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,

  };

  return <>
  <div className="">
    <Slider {...settings}>
      <img src={mainSlider} className="w-full h-[270px]" alt="" />
      <img src={slider1} className="w-full h-[270px]" alt="" />
      <img src={slider2} className="w-full h-[270px]" alt="" />
      <img src={slider3} className="w-full h-[270px]" alt="" />
      </Slider>
  </div>
 
</>
}
