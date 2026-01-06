import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ImageContext } from '../store/image-context';
import Error from './Error';
import Gallery from './Gallery';
import LoadingSpinner from './LoadingSpinner';

interface ContainerProps {
  searchText?: string;
  showTitle?: boolean;
  onOpen: () => void;
}

const Container = (props: ContainerProps) => {
  const { searchText: propsSearchText, showTitle, onOpen } = props;
  const params = useParams<{ searchText: string }>();
  const searchText = params.searchText || propsSearchText || '';
  
  const imagesCtx = useContext(ImageContext);
  const { requestDatas, images, error, isLoading } = imagesCtx;

  useEffect(() => {
    if (searchText) {
      requestDatas(searchText);
    }
  }, [requestDatas, searchText]);

  return (
    <div className="output">
      {showTitle && !isLoading && <h2 className="search-title">{searchText}</h2>}
      {!error && !isLoading && <Gallery data={images} onOpen={onOpen} />}
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {error && <Error>{error}</Error>}
    </div>
  );
};

export default Container;
