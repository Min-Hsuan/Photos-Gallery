import { useContext, useEffect } from 'react';
import { ImageContext } from '../store/image-context';
import Error from './Error';
import Gallery from './Gallery';
import LoadingSpinner from './LoadingSpinner';

const Container = (props) => {
  const { searchText, showTitle,onOpen } = props;
  const imagesCtx = useContext(ImageContext);
  const { requestDatas, images, error, isLoading } = imagesCtx;

  useEffect(() => {
    requestDatas(searchText);
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
