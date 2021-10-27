import React, { useState, useRef } from 'react';
import Carousel from 're-carousel';
import Slider from "react-slick";
import imageOne from "./images/slider1.png";
import imageTwo from "./images/slider2.jpg";
import imageThree from "./images/slider3.jpg";

const HeaderSlider = () => {
  const [index, setIndex] = useState();
  const sliderRef = useRef();
  const carouselRef = useRef();

  const beforeChange = (prev, next) => {
    let element = document.querySelector('.slick-active');
    element?.classList.add('next-slide-anim');
    setIndex(next);
  };

  const afterChange = (index) => {
    let element = document.querySelector('.slick-active');
    element.classList.remove('next-slide-anim')
  };

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 2000,
    infinite: false,
    beforeChange,
    afterChange,
    useCSS: false,
    useTransform : false
  }

  const next = () => {
    sliderRef.current.slickNext()
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };

  const slides = [imageOne, imageThree, imageThree]

   return (
    <div className="home-slider container">
      <Slider {...settings} className="carousel-inner" ref={ref => sliderRef.current = ref}>
                {
                  slides.map((slide, index) => {
                    console.log('SLIDE', slide);
                    return (
                      // <div className="carousel-item" key={index} ref={ref => carouselRef.current = ref}>
                      //   <div className="slide-content">
                      //     {index !== slides.length - 1 &&
                      //       <>
                      //         <h3>{slide.username}</h3>
                      //         <span id="user-icon-link">
                      //           dfdsfdsfdf
                      //         </span>
                      //       </>
                      //     }
                      //   </div>
                      //   <img src={slide} alt="Chicago" width="1100" height="500" />
                      // </div>
                      <div>
                        <img src={slide} alt="Chicago" />
                      </div>
                    );
                  })
                }
              </Slider>
              {/* {((slides.length !== 0) && (index !== slides.length - 1)) &&
                <>
                  {(index !== 0) && <a href="#/" className="carousel-control-prev" onClick={previous}>
                    <img src={slides[0]} alt="Los Angeles" />
                  </a>}
                  {index !== slides.length - 1 && <a href="#/" className="carousel-control-next" id="next-btn" onClick={next}  >
                    <img src={slides[1]} alt="Los Angeles" />
                  </a>}
                </>
              } */}
    </div>
  //   <Carousel auto>
  //   <div style={{
  //     backgroundColor: 'tomato',
  //      height: '100%', 
  //      backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.7) 100%), url(${imageOne})`,
  //      backgroundAttachment: 'fixed',
  //      backgrounSsize: 'auto 100%',
  //      backgroundPosition: 'center',
  //      backgroundRepeat: 'no-repeat'
  //      }}>
  //        <div className="desc">
  //          <h2 className="title">Welcome to our page</h2>
  //          <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
  //        </div>
  //      </div>
  //   <div style={{
  //     backgroundColor: 'tomato', 
  //   height: '100%', 
  //   backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.7) 100%), url(${imageTwo})`,
  //   backgroundAttachment: 'fixed',
  //      backgrounSsize: 'auto 100%',
  //      backgroundPosition: 'center',
  //      backgroundRepeat: 'no-repeat'
  //      }}>
  //        <div className="desc">
  //          <h2 className="title">Welcome to our page</h2>
  //          <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
  //        </div>
  //      </div>
  //   <div style={{
  //     backgroundColor: 'tomato', 
  //     height: '100%', 
  //     backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.7) 100%), url(${imageThree})`,
  //     backgroundAttachment: 'fixed',
  //      backgrounSsize: 'auto 100%',
  //      backgroundPosition: 'center',
  //      backgroundRepeat: 'no-repeat'
  //     }}>
  //       <div className="desc">
  //          <h2 className="title">Welcome to our page</h2>
  //          <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
  //        </div>
  //     </div>
  // </Carousel>
   )
}

export default HeaderSlider;