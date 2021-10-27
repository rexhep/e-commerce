import React from 'react';
import Carousel from 're-carousel';
import imageOne from "./images/slider1.png";
import imageTwo from "./images/slider2.jpg";
import imageThree from "./images/slider3.jpg";
import imageFour from "./images/slider4.jpg";
import imageFive from "./images/slider5.png";

const HeaderSlider = () => {
   return (
    <Carousel auto>
    <div style={{
      backgroundColor: 'rgb(250, 247, 238)',
       height: '100%', 
       backgroundImage: `url(${imageFive})`,
      //  backgroundAttachment: 'fixed',
      //  backgrounSsize: 'auto 100%',
      //  backgroundPosition: 'center',
       backgroundRepeat: 'no-repeat'
       }}>
         <div className="desc" style={{
               right: '-29%',
               left: 'initial'
         }}>
           <h2 className="title" style={{
             color: '#000'
           }}>Welcome to our page</h2>
           <p  style={{
             color: '#000',
             float: 'right'
           }}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
         </div>
       </div>
    <div style={{
      backgroundColor: 'rgb(250, 247, 238)', 
    height: '100%', 
    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.7) 100%), url(${imageTwo})`,
    backgroundAttachment: 'fixed',
       backgrounSsize: 'auto 100%',
       backgroundPosition: 'center',
       backgroundRepeat: 'no-repeat'
       }}>
         <div className="desc">
           <h2 className="title">Welcome to our page</h2>
           <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
         </div>
       </div>
    <div style={{
      backgroundColor: 'rgb(250, 247, 238)', 
      height: '100%', 
      backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.7) 100%), url(${imageThree})`,
      backgroundAttachment: 'fixed',
       backgrounSsize: 'auto 100%',
       backgroundPosition: 'center',
       backgroundRepeat: 'no-repeat'
      }}>
        <div className="desc">
           <h2 className="title">Welcome to our page</h2>
           <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
         </div>
      </div>
  </Carousel>
   )
}

export default HeaderSlider;