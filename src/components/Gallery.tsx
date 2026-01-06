import { useEffect, useState, CSSProperties } from 'react';
import ImageItem from './ImageItem';
import { Photo } from '../types'

function group(array: Photo[], subGroupLength: number): Photo[][] {
  let index = 0;
  const newArray: Photo[][] = [];

  while (index < array.length) {
    newArray.push(array.slice(index, (index += subGroupLength)));
  }
  return newArray;
}

interface GalleryProps {
  data: Photo[];
  onOpen: () => void;
}

const Gallery = (props: GalleryProps) => {
  //get latest window size when window has been resized.
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  //set columns of the grid depend on window size.
  let dividNum = 3;
  if (width < 768) {
    dividNum = 2;
  }
  if (width < 480) {
    dividNum = 1;
  }
  const divide = Math.floor(props.data.length / dividNum);
  
  let content;
  if (props.data.length > 0) {
    const newArray = group(props.data, divide);
    content = newArray.map((array, index) => {
      const items = array.map((image) => {
        const imgUrl = `https://live.staticflickr.com/${image.server}/${image.id}_${image.secret}_z.jpg`;
        const downloadUrl = `https://live.staticflickr.com/${image.server}/${image.id}_${image.secret}_z_d.jpg`;

        return (
          <ImageItem
            key={image.id}
            url={imgUrl}
            title={image.title}
            downloadUrl={downloadUrl}
            id={image.id}
            onOpen={props.onOpen}
          />
        );
      });
      return (
        <ul className="list" key={index}>
          {items}
        </ul>
      );
    });
  } else {
    content = <p>No Images Found</p>;
  }

  return (
    <div 
      className="list-box" 
      style={{ '--column': dividNum } as CSSProperties & { '--column': number }}
    >
      {content}
    </div>
  );
};

export default Gallery;
