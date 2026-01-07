import { ReactNode, useState, createContext } from 'react';
import { LikedPhoto } from '../types'

interface UserContextType {
  images: LikedPhoto[];
  addLike: (item: LikedPhoto) => void;
  removeLike: (id: string) => void;
}

export const UserContext = createContext<UserContextType>({
  images: [],
  addLike: () => {},
  removeLike: () => {},
});

interface UserContextProviderProps {
  children: ReactNode;
}

const UserContextProvider = (props: UserContextProviderProps) => {
  const [images, setImages] = useState<LikedPhoto[]>([])

  const addLikeHandler = (item: LikedPhoto) => {
    const existingItem = images.find(image => item.id === image.id);
    if (existingItem) {
      return;
    } else {
      setImages((prevState) => prevState.concat(item))
    }
  };

  const removeLikeHandler = (id: string) => {
    setImages((prevState) => prevState.filter(item => item.id !== id));
  }

  const userContext: UserContextType = {
    images,
    addLike: addLikeHandler,
    removeLike: removeLikeHandler
  }

  return <UserContext.Provider value={userContext}>
    {props.children}
  </UserContext.Provider>
}

export default UserContextProvider;
