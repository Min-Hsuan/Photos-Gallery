import { useEffect, useState } from 'react';
import ImageItem from './ImageItem';


function group(array, subGroupLength) {
  var index = 0;
  var newArray = [];

  while (index < array.length) {
    newArray.push(array.slice(index, (index += subGroupLength)));
  }
  return newArray;
}

const Gallery = (props) => {

  //get latest window size when window has been resized.
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
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
    content = newArray.map((array) => {
      const items = array.map((image) => {
        let imgUrl = `https://live.staticflickr.com/${image.server}/${image.id}_${image.secret}_z.jpg`;
        let downloadUrl = `https://live.staticflickr.com/${image.server}/${image.id}_${image.secret}_z_d.jpg`;

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
        <ul className="list" key={Math.random() * 100}>
          {items}
        </ul>
      );
    });
  } else {
    content = <p>No Images Found</p>;
  }

  return (
    <div className="list-box" style={{ '--column': dividNum }}>
      {content}
    </div>
  );
};

export default Gallery;
