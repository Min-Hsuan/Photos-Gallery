const ImageItem = (props) =>{
  return <li className='item'>
    <img src={props.url} alt={props.title} />
  </li>
}


export default ImageItem;