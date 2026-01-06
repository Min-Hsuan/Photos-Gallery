import { useContext } from 'react';
import { FaHeart } from 'react-icons/fa';
import { HiDownload } from 'react-icons/hi';
import { UserContext } from '../store/user-context';


const ImageItem = (props) => {
  const {downloadUrl,url,id,title,onOpen} = props;
  const userCtx = useContext(UserContext);

  const addLikeHandler = ()=>{
    userCtx.addLike({
      id,
      url,
      downloadUrl,
      title
    })
    onOpen();
  };
  return (
    <li className="item">
      <img src={url} alt={title} />
      <div className='user-actions'>
        <button className='user-action' onClick={addLikeHandler}>
          <FaHeart />
        </button>
        <a href={downloadUrl} download className='user-action'  >
          <HiDownload />
        </a>
      </div>
    </li>
  );
};

export default ImageItem;
