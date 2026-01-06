import { useState, createContext } from 'react';
import { PhotoCard} from '../types'
export const UserContext = createContext<UserContextType>()
interface UserContextType{
  images: PhotoCard[],
  addLike: (item: PhotoCard) => void;
  removeLike: (id: string)=>void;
}

const UserContextProvider = (props) => {
  const [images, setImages] = useState<PhotoCard[]>([])

  const addLikeHandler = (item: PhotoCard) => {
    const existingItem = images.find(image => item.id === image.id);
    if (existingItem) {
      return;
    } else {
      setImages((prevState) => prevState.concat(item))
    }
  };

  const removeLikeHandler = (id: String) => {
    setImages((prevState) => prevState.filter(item => item.id !== id));
  }


  const userContext = {
    images,
    addLike: addLikeHandler,
    removeLike: removeLikeHandler
  }

  return <UserContext.Provider value={userContext}>
    {props.children}
  </UserContext.Provider>
}

export default UserContextProvider;
