import React, { useReducer, useCallback } from 'react';
const apiKey = '80f6bdf0e158fc0cbcb0079320efec39';

export const ImageContext = React.createContext({
  images: [],
  isLoading: false,
  error: null,
  requestDatas: (searchText) => {},
});

const initialState = {
  datas: [],
  isLoading: false,
  error: null,
};

const imagesReducer = (state, action) => {
  switch (action.type) {
    case 'SEND':
      return { datas: [], isLoading: true, error: null };
    case 'SUCCESS':
      return { datas: action.datas, isLoading: false, error: null };
    case 'FAILED':
      return { datas: [], isLoading: false, error: action.errorMessage };
    default:
      throw new Error('Should not be reached!');
  }
};

const ImageContextProvider = (props) => {
  const [state, dispatch] = useReducer(imagesReducer, initialState);

  const requestDataHandler = useCallback(async (searchText) => {
    dispatch({ type: 'SEND' });
    try {
      const response = await fetch(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${searchText}&per_page=24&format=json&nojsoncallback=1`
      );
      const data = await response.json();
      if (data.stat!=='ok') {
        throw new Error("Encountered an error with fetching and parsing data. "+data.message);
      }
      dispatch({ type: 'SUCCESS', datas: data.photos.photo });

    } catch (error) {
      dispatch({ type: 'FAILED', errorMessage: error.message });
    }
  },[]);

  const contextValue = {
    images: state.datas,
    isLoading: state.isLoading,
    error: state.error,
    requestDatas: requestDataHandler,
  };

  return (
    <ImageContext.Provider value={contextValue}>
      {props.children}
    </ImageContext.Provider>
  );
};

export default ImageContextProvider;
