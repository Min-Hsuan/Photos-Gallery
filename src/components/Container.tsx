import { useContext, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ImageContext } from '../store/image-context';
import Error from './Error';
import { UserContext } from '../store/user-context';
import LoadingSpinner from './LoadingSpinner';
import { Masonry, useInfiniteLoader } from 'masonic';
import { FaHeart } from 'react-icons/fa';
import { HiDownload } from 'react-icons/hi';
import { Photo } from '../types';

interface ContainerProps {
  searchText?: string;
  showTitle?: boolean;
  onOpen: () => void;
}

const Container = (props: ContainerProps) => {
  const { searchText: propsSearchText, showTitle, onOpen } = props;
  const params = useParams<{ searchText: string }>();
  const searchText = params.searchText || propsSearchText || '';
  const userCtx = useContext(UserContext);

  const prevSearchTextRef = useRef<string>('');
  const imagesCtx = useContext(ImageContext);
  const { requestDatas, images, error, isLoading, pageNum, hasMore, resetData } = imagesCtx;

  // Masonic 的無限滾動載入
  const maybeLoadMore = useInfiniteLoader(
    async (startIndex: number, stopIndex: number) => {
      if (hasMore && !isLoading && searchText) {
        await requestDatas(searchText, pageNum);
      }
    },
    {
      isItemLoaded: (index: number) => index < images.length,
      minimumBatchSize: 48,
      threshold: 3,
    }
  );

  // 當搜尋改變時，重置數據並載入第一頁
  useEffect(() => {
    if (searchText && searchText !== prevSearchTextRef.current) {
      prevSearchTextRef.current = searchText;
      resetData();
      requestDatas(searchText, 1);
    }
  }, [searchText, requestDatas, resetData]);

  // ImageItem 組件
  const ImageItem = ({ data, width }: { data: Photo; width: number }) => {
    const imgUrl = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_z.jpg`;
    const downloadUrl = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_z_d.jpg`;
    
    const addLikeHandler = () => {
      console.log('add like', data.id);
      userCtx.addLike({ url: imgUrl, title: data.title, downloadUrl, id: data.id });
      onOpen();
    };

    return (
      <li className="item">
        <img src={imgUrl} alt={data.title} loading="lazy" style={{ width: '100%' }} />
        <div className="user-actions">
          <button className="user-action" onClick={addLikeHandler}>
            <FaHeart />
          </button>
          <a href={downloadUrl} download className="user-action">
            <HiDownload />
          </a>
        </div>
      </li>
    );
  };

  return (
    <div className="output">
      {showTitle && !isLoading && <h2 className="search-title">{searchText}</h2>}
      {isLoading && images.length === 0 && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!error && images.length > 0 && (
        <Masonry
          items={images}
          columnGutter={16}
          columnWidth={300}
          render={ImageItem}
          onRender={maybeLoadMore}
        />
      )}
      {isLoading && images.length > 0 && (
        <div className="center" style={{ marginTop: '20px' }}>
          <LoadingSpinner />
        </div>
      )}
      {error && <Error>{error}</Error>}
    </div>
  );
};

export default Container;
