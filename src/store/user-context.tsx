import { ReactNode, useState, createContext } from 'react';
import { PhotoCard } from '../types'

interface UserContextType {
  images: PhotoCard[];
  addLike: (item: PhotoCard) => void;
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
  const [images, setImages] = useState<PhotoCard[]>([])

  const addLikeHandler = (item: PhotoCard) => {
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
