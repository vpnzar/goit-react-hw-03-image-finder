import './App.css';
import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Components/Searchbar/Searchbar';
import ImageGallery from './Components/ImageGallery/ImageGallery';
import ImageGalleryItem from './Components/ImageGalleryItem/ImageGalleryItem';
import Button from './Components/Button/Button';
import Modal from './Components/Modal/Modal';

class App extends Component {
  state = {
    queryImg: '',
    showModal: false,
    pageNum: 1,
    imgItem: [],
    imgItems: 0,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleSearchFormSubmit = queryImg => {
    this.setState({ queryImg });
  };

  handleBtnNum = pageNum => {
    this.setState({ pageNum });
  };

  handleImgItem = imgItem => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
    this.setState({ imgItem });
  };

  imgItemsListLength = imgItems => {
    this.setState({ imgItems });
  };

  render() {
    const { showModal, queryImg, pageNum, imgItem, imgItems } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearchFormSubmit} />
        <ToastContainer autoClose={3000} />
        <ImageGallery>
          <ImageGalleryItem
            queryImg={queryImg}
            pageNum={pageNum}
            imgItemsList={this.imgItemsListLength}
            onClick={this.handleImgItem}
          />
        </ImageGallery>
        {imgItems > 0 && <Button onClick={this.handleBtnNum} />}
        {showModal && <Modal imgItem={imgItem} onClose={this.toggleModal} />}
      </div>
    );
  }
}

export default App;
