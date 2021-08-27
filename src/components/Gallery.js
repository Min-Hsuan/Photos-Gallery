import { useEffect, useState } from 'react';
import ImageItem from './ImageItem';
import classes from './Gallery.module.css';

function group(array, subGroupLength) {
  var index = 0;
  var newArray = [];

  while (index < array.length) {
    newArray.push(array.slice(index, (index += subGroupLength)));
  }
  return newArray;
}

const Gallery = (props) => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
  }, []);

  let content;
  let divide = Math.floor(props.data.length / 3);
  if (width < 768) {
    divide = Math.floor(props.data.length / 2);
  }

  if (props.data.length > 0) {
    const newArray = group(props.data, divide);
    content = newArray.map((array) => {
      const items = array.map((image) => {
        let imgUrl = `https://live.staticflickr.com/${image.server}/${image.id}_${image.secret}_z.jpg`;
        return <ImageItem key={image.id} url={imgUrl} title={image.title} />;
      });
      return (
        <ul className={classes.list} key={Math.random() * 100}>
          {items}
        </ul>
      );
    });
  } else {
    content = <p>No Images Found</p>;
  }

  return (
    <div
      className={classes['list-box']}
      style={{ '--column': width > 768 ? '3' : '2' }}
    >
      {content}
    </div>
  );
};

export default Gallery;
