import { useContext, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ImageContext } from '../store/image-context';
import Error from './Error';
import Gallery from './Gallery';
import LoadingSpinner from './LoadingSpinner';

import useIntersectionObserver from './hooks/useIntersectionObserver';

interface ContainerProps {
  searchText?: string;
  showTitle?: boolean;
  onOpen: () => void;
}

const Container = (props: ContainerProps) => {
  const { searchText: propsSearchText, showTitle, onOpen } = props;
  const params = useParams<{ searchText: string }>();
  const searchText = params.searchText || propsSearchText || '';
  
  const prevSearchTextRef = useRef<string>('');

  const [ref, isVisible] = useIntersectionObserver({ rootMargin: '100px' });
  const imagesCtx = useContext(ImageContext);
  const { requestDatas, images, error, isLoading, pageNum, hasMore, resetData } = imagesCtx;

  // 當搜尋改變時，重置數據並載入第一頁
  useEffect(() => {
    if (searchText && searchText !== prevSearchTextRef.current) {
      prevSearchTextRef.current = searchText;
      resetData();
      requestDatas(searchText, 1);
    }
  }, [searchText, requestDatas, resetData]);

  // 無限滾動：當滾動到底部時載入更多
  useEffect(() => {
    if (isVisible && hasMore && !isLoading && searchText && images.length > 0) {
      console.log('Loading more images, page:', pageNum);
      requestDatas(searchText, pageNum);
    }
  }, [isVisible]);

  return (
    <div className="output">
      {showTitle && !isLoading && <h2 className="search-title">{searchText}</h2>}
      {!error && <Gallery data={images} onOpen={onOpen} />}
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {hasMore && !isLoading && images.length > 0 && (
        <div ref={ref} className='placeholder'></div>
      )}
      {error && <Error>{error}</Error>}
    </div>
  );
};

export default Container;
