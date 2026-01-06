import { useContext } from 'react';
import { UserContext } from '../store/user-context';

import { FaHeart } from 'react-icons/fa';
import { HiDownload } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import classes from './LikeList.module.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { PhotoCard } from '../types'

interface LikeListProps {
  onClose: () => void;
}

const LikeList = (props: LikeListProps) => {
  const userCtx = useContext(UserContext);
  const { images, removeLike } = userCtx;
  const likeListTotal = userCtx.images.length;

  const content = images.map((item: PhotoCard) => {
    const removeItemHandler = () => {
      removeLike(item.id);
    };
    return (
      <CSSTransition key={item.id} timeout={200} classNames='fade-out'>
        <li className={classes['like-item']}>
          <div className={classes.img}>
            <img src={item.url} alt={item.title} />
          </div>
          <div className={classes.actions}>
            <button onClick={removeItemHandler} className={classes.button}>
              -
            </button>
            <a download href={item.downloadUrl} className={classes.button}>
              <HiDownload />
            </a>
          </div>
        </li>
      </CSSTransition>
    );
  });
  
  return (
    <>
      <div className={classes.title}>
        <span>Collection list</span>
        <div className="like-button">
          <span className="total-number">{likeListTotal}</span>
          <FaHeart />
        </div>
      </div>
      <TransitionGroup component='ul' className={classes['like-list']}>
        {content}
      </TransitionGroup>
      <button className={classes['close-button']} onClick={props.onClose}>
        <MdClose />
      </button>
    </>
  );
};

export default LikeList;
