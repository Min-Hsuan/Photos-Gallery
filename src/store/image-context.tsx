import { ReactNode, useReducer, useCallback, createContext } from 'react';
const apiKey = import.meta.env.VITE_API_KEY
import { Photo } from '../types'
interface ImageContextType {
  images: Photo[];
  isLoading: boolean;
  error: string | null;
  requestDatas: (searchText: string) => void;
}

export const ImageContext = createContext<ImageContextType>({
  images: [],
  isLoading: false,
  error: null,
  requestDatas: () => {},
});

interface State {
  datas: Photo[];
  isLoading: boolean;
  error: string | null;
}

interface Action {
  type: 'SEND' | 'SUCCESS' | 'FAILED';
  datas?: Photo[];
  errorMessage?: string;
}

const initialState: State = {
  datas: [],
  isLoading: false,
  error: null,
};

const imagesReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SEND':
      return { datas: [], isLoading: true, error: null };
    case 'SUCCESS':
      return { datas: action.datas || [], isLoading: false, error: null };
    case 'FAILED':
      return { datas: [], isLoading: false, error: action.errorMessage || null };
    default:
      throw new Error('Should not be reached!');
  }
};

interface ImageContextProviderProps {
  children: ReactNode;
}

const ImageContextProvider = (props: ImageContextProviderProps) => {
  const [state, dispatch] = useReducer(imagesReducer, initialState);

  const requestDataHandler = useCallback(async (searchText: string) => {
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
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      dispatch({ type: 'FAILED', errorMessage });
    }
  }, []);

  const contextValue: ImageContextType = {
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
