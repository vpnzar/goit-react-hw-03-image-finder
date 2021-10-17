import React, { Component } from 'react';
import Loader from '../Loader/Loader';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';
import Pixabay from '../Services/Pixabay';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const base_url = 'https://pixabay.com/api/';
const api_key = '23038221-87f79236823d8e345a162521c';
const newPixabay = new Pixabay(base_url, api_key);

class ImageGalleryItem extends Component {
  state = {
    status: 'init',
    searchResults: [],
    activeImgIdx: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const { queryImg, pageNum, imgItemsList } = this.props;
    if (prevProps.queryImg !== queryImg) {
      this.setState({ status: 'pending' });
      newPixabay.searchQuery = queryImg;
      newPixabay
        .searchPhotos()
        .then(searchResults => {
          if (searchResults.length !== 0) {
            this.setState(prev => ({
              searchResults: searchResults,
              status: 'success',
            }));
          } else {
            toast.error('PLEASE, INPUT CORRECT REQUEST!!!');
            this.setState({ status: 'incorrect' });
          }
        })
        .catch(err => {
          this.setState({ status: 'error' });
        });

      setTimeout(() => {
        imgItemsList(this.state.searchResults.length);
      }, 300);
    }

    if (prevProps.pageNum !== pageNum) {
      this.setState({ status: 'pending' });
      newPixabay.searchPage = pageNum;
      newPixabay
        .searchPhotos()
        .then(searchResults => {
          this.setState(prev => ({
            searchResults: [...prev.searchResults, ...searchResults],
            status: 'success',
          }));
        })
        .catch(err => {
          this.setState({ status: 'error' });
        });
    }
  }

  setActiveImgIdx = index => {
    const { searchResults, activeImgIdx } = this.state;
    this.setState({ activeImgIdx: index });
    setTimeout(() => {
      const activeImg = searchResults[activeImgIdx];
      this.props.onClick(activeImg);
    }, 300);
  };

  render() {
    const { status, searchResults } = this.state;

    if (status === 'init') {
      return <h1>Hello! Search something...</h1>;
    }
    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'incorrect') {
      return <h1>No results were found...</h1>;
    }
    if (status === 'success') {
      return (
        <>
          {searchResults.length > 0 &&
            searchResults.map((img, index) => {
              return (
                <li key={img.id} className={s.ImageGalleryItem}>
                  <img
                    src={img.webformatURL}
                    alt={img.tags}
                    className={s.ImageGalleryItemImage}
                    onClick={() => this.setActiveImgIdx(index)}
                  />
                </li>
              );
            })}
        </>
      );
    }
    if (status === 'error') {
      return toast.error('ALARM!!!');
    }
  }
}

ImageGalleryItem.propTypes = {
  queryImg: PropTypes.string.isRequired,
  pageNum: PropTypes.number.isRequired,
  imgItemsList: PropTypes.func.isRequired,
  activeImg: PropTypes.number,
};

export default ImageGalleryItem;
