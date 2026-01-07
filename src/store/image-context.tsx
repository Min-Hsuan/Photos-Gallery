import { ReactNode, useReducer, useCallback, createContext } from 'react';
const apiKey = import.meta.env.VITE_API_KEY;
import { Photo } from '../types';

interface ImageContextType {
  images: Photo[];
  isLoading: boolean;
  error: string | null;
  pageNum: number;
  hasMore: boolean;
  requestDatas: (searchText: string, pageNum: number) => Promise<void>;
  resetData: () => void;
}

export const ImageContext = createContext<ImageContextType>({
  images: [],
  isLoading: false,
  error: null,
  pageNum: 1,
  hasMore: true,
  requestDatas: async () => {},
  resetData: () => {},
});

interface State {
  datas: Photo[];
  isLoading: boolean;
  error: string | null;
  pageNum: number;
  hasMore: boolean;
}

interface Action {
  type: 'SEND' | 'SUCCESS' | 'FAILED' | 'RESET';
  datas?: Photo[];
  errorMessage?: string;
  hasMore?: boolean;
}

const initialState: State = {
  datas: [],
  isLoading: false,
  error: null,
  pageNum: 1,
  hasMore: true
};

const imagesReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SEND':
      return { 
        ...state, 
        isLoading: true, 
        error: null 
      };
    case 'SUCCESS':
      return { 
        datas: [...state.datas, ...(action.datas || [])],
        isLoading: false, 
        error: null,
        pageNum: state.pageNum + 1, 
        hasMore: action.hasMore ?? true
      };
    case 'FAILED':
      return { 
        ...state,
        isLoading: false, 
        error: action.errorMessage || null 
      };
    case 'RESET':
      return initialState;
    default:
      throw new Error('Should not be reached!');
  }
};

interface ImageContextProviderProps {
  children: ReactNode;
}

interface FlickrPhoto extends Photo {
  width_m?: number;
  height_m?: number;
  aspect?: number;
}

const ImageContextProvider = (props: ImageContextProviderProps) => {
  const [state, dispatch] = useReducer(imagesReducer, initialState);

  const resetDataHandler = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const requestDataHandler = useCallback(async (searchText: string, pageNum: number): Promise<void> => {
    dispatch({ type: 'SEND' });
    try {
      const response = await fetch(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${searchText}&per_page=48&page=${pageNum}&extras=url_m,width_m,height_m&format=json&nojsoncallback=1`
      );
      const data = await response.json();
      if (data.stat !== 'ok') {
        throw new Error("Encountered an error with fetching and parsing data. " + data.message);
      }
      const filteredPhotos: FlickrPhoto[] = data.photos.photo.map((photo: FlickrPhoto) => {
        return {
          ...photo,
          aspect: photo.width_m && photo.height_m ? photo.width_m / photo.height_m : 1
        }
      });
      dispatch({ 
        type: 'SUCCESS', 
        datas: filteredPhotos, 
        hasMore: data.photos.pages > pageNum
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      dispatch({ type: 'FAILED', errorMessage });
    }
  }, []);

  const contextValue: ImageContextType = {
    images: state.datas,
    isLoading: state.isLoading,
    error: state.error,
    pageNum: state.pageNum,
    hasMore: state.hasMore,
    requestDatas: requestDataHandler,
    resetData: resetDataHandler,
  };

  return (
    <ImageContext.Provider value={contextValue}>
      {props.children}
    </ImageContext.Provider>
  );
};

export default ImageContextProvider;
