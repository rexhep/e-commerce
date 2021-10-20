import React, { useEffect, useRef, useState } from 'react';

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

    return (
        <div>
            
        </div>
    )
}
