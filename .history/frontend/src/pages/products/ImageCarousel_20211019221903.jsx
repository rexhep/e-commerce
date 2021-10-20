import React, { useEffect, useRef, useState } from 'react';
import ReactImageMagnify from 'react-image-magnify';

export default function ImageCarousel({ images }) {
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
        <div className="carousel-container">
            {/* <div
                className="selected-image"
                style={{ backgroundImage: `url(${selectedImage?.url})` }}
            /> */}
            <ReactImageMagnify {...{
                smallImage: {
                    alt: 'Wristwatch by Ted Baker London',
                    isFluidWidth: true,
                    src: selectedImage?.url,
                    sizes: '(min-width: 480px) 400px, 800px'
                },
                largeImage: {
                    alt: '',
                    src: selectedImage?.url,
                    width: 400,
                    height: 800
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
