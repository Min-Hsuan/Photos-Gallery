import React, { useState } from 'react';

export const UserContext = React.createContext({
  images: [],
  addLike: (item)=>{},
  removeLike: (id)=>{}
})


const UserContextProvider = (props)=>{
  const [images, setImages] = useState([]);

  const addLikeHandler = (item)=>{
    const existingItem = images.find(image=>item.id === image.id);
    if(existingItem){
      return;
    }else{
      setImages((prevState)=>prevState.concat(item))
    }
  };

  const removeLikeHandler = (id)=>{
    setImages((prevState)=>prevState.filter(item=> item.id!==id));
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