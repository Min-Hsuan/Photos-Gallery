import { useReducer, useCallback, createContext } from 'react';
const apiKey = '80f6bdf0e158fc0cbcb0079320efec39';
import { Photo} from '../types'

interface ImageContextType{
  images: Photo[];
  isLoading: boolean;
  error: string | null;
  requestDatas: (searchText: string) => void;
}
export const ImageContext = createContext<ImageContextType>()

interface InitialState{
  datas: Photo[];
  isLoading: boolean;
  error: string | null;
}
interface State{
  datas: Photo[];
  isLoading: boolean;
  error: string | null;
}
interface Action{
  type: 'SEND' | 'SUCCESS'| 'FAILED';
  datas?: Photo[];
  errorMessage?: string;
}

const imagesReducer = (state: State, action:Action) => {
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

  const requestDataHandler = useCallback(async (searchText: String) => {
    dispatch({ type: 'SEND' });
    try {
      const response = await fetch(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${searchText}&per_page=48&format=json&nojsoncallback=1`
      );
      const data = await response.json();
      if (data.stat !== 'ok') {
        throw new Error("Encountered an error with fetching and parsing data. " + data.message);
      }
      dispatch({ type: 'SUCCESS', datas: data.photos.photo });

    } catch (error) {
      dispatch({ type: 'FAILED', errorMessage: error.message });
    }
  }, []);

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
