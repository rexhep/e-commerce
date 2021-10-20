import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import ReactImageMagnify from 'react-image-magnify';

const useStyles = makeStyles((theme) => ({
    imageMagnifyImg: {
        height: "550px !important",
        objectFit: "cover",
        objectPosition: "50% 50%"
    }
}));

export default function ImageCarousel({ images }) {
    const classes = useStyles();
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState();
    const carouselItemsRef = useRef([]);

    useEffect(() => {
        if (images && images[0]) {
          carouselItemsRef.current = carouselItemsRef.current.slice(
            0,
            images.length
          );
    
          setSelectedImageIndex(0);
          setSelectedImage(images[0]);
        }
      }, [images]);

      const handleSelectedImageChange = (newIdx) => {
        console.log('newIdx', newIdx);
        if (images && images.length > 0) {
          setSelectedImage(images[newIdx]);
          setSelectedImageIndex(newIdx);
          if (carouselItemsRef?.current[newIdx]) {
            carouselItemsRef?.current[newIdx]?.scrollIntoView({
              inline: "center",
              behavior: "smooth"
            });
          }
        }
      };

      const handleRightClick = () => {
        if (images && images.length > 0) {
          let newIdx = selectedImageIndex + 1;
          if (newIdx >= images.length) {
            newIdx = 0;
          }
          handleSelectedImageChange(newIdx);
        }
      };

      const handleLeftClick = () => {
        if (images && images.length > 0) {
          let newIdx = selectedImageIndex - 1;
          if (newIdx < 0) {
            newIdx = images.length - 1;
          }
          handleSelectedImageChange(newIdx);
        }
      };

    return (
        <div className={`${classes.containerSlider} carousel-container`}>
            {/* <div
                className="selected-image"
                style={{ backgroundImage: `url(${selectedImage?.url})` }}
            /> */}
            <ReactImageMagnify {...{
                smallImage: {
                    alt: 'Wristwatch by Ted Baker London',
                    isFluidWidth: true,
                    src: selectedImage?.url,
                    sizes: '(min-width: 480px) 30vw, 80vw'
                },
                largeImage: {
                    alt: '',
                    src: selectedImage?.url,
                    width: 1200,
                    height: 1800
                },
                enlargedImageContainerClassName: "test",
                enlargedImageContainerStyle: {
                    position: 'absolute',
                    left: '-10px',
                    top: 0
                },
                // imageClassName: classes.imageMagnifyImg
                }} 
            />
            <div className="carousel">
                <div className="carousel__images">
                    {images &&
                        images.map((image, idx) => (
                        <div
                            onClick={() => handleSelectedImageChange(idx)}
                            style={{ backgroundImage: `url(${image.url})` }}
                            key={image.id}
                            className={`carousel__image ${
                            selectedImageIndex === idx && "carousel__image-selected"
                            }`}
                            ref={(el) => (carouselItemsRef.current[idx] = el)}
                        />
                        ))}
                </div>
                <button
                    className="carousel__button carousel__button-left"
                    onClick={handleLeftClick}
                    >
                    Prev
                </button>
                <button
                className="carousel__button carousel__button-right"
                onClick={handleRightClick}
                >
                Next
                </button>
            </div>
        </div>
    )
}
