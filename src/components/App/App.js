//Core
import React, { Component } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import PNotify from 'pnotify/dist/es/PNotify';
//Components
import ImageGallery from '../ImageGallery/ImageGallery';
import SearchBar from '../SearchBar/SearchBar';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
//styles
import styles from './App.module.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'pnotify/dist/PNotifyBrightTheme.css';

// https://pixabay.com/api/?q=что_искать&page=номер_страницы&key=твой_ключ&image_type=photo&orientation=horizontal&per_page=12

const PICS_PER_PAGE = 12;
const API_KEY = '14481243-ffa5b678be0edea71dcb3ff43';
const API_URL =
  'https://pixabay.com/api/?image_type=photo&orientation=horizontal&key=' +
  API_KEY +
  '&per_page=' +
  PICS_PER_PAGE;

export default class App extends Component {
  state = {
    images: [],
    isLoading: false,
    page: 1,
    querry: '',
    isShowModal: false,
    modalImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.getDataByQuerry();
    }
  }

  incrementPage = () => {
    this.setState(state => ({
      ...state,
      page: state.page + 1,
    }));
  };

  handleImageClick = url => {
    this.setState({ isShowModal: true, modalImageURL: url });
  };

  handleCloseModal = () => {
    this.setState({ isShowModal: false, modalImageURL: '' });
  };

  handleSubmit = querry => {
    this.setState({ images: [], isLoading: false, page: 1, querry: '' });
    this.getDataByQuerry(querry);
  };

  getDataByQuerry = (querry = this.state.querry) => {
    this.setState({ isLoading: true, querry: querry });
    axios
      .get(API_URL + '&q=' + querry + '&page=' + this.state.page)
      .then(({ data }) =>
        this.setState({
          images: [...this.state.images, ...data.hits],
        }),
      )
      .catch(e => PNotify.error(e.message))
      .finally(() => {
        this.setState({ isLoading: false });
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      });
  };

  render() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
    const { images, isLoading } = this.state;
    return (
      <>
        {this.state.isShowModal && (
          <Modal onCloseModal={this.handleCloseModal}>
            <img src={this.state.modalImageURL} alt={this.state.querry} />
          </Modal>
        )}
        <div className={styles.App}>
          <SearchBar onFormSubmit={this.handleSubmit} />
          {images.length > 0 && (
            <ImageGallery
              images={images}
              onImageClick={this.handleImageClick}
            />
          )}
          {isLoading && (
            <Loader
              style={{ margin: '0 auto' }}
              type="ThreeDots"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={3000}
            />
          )}
        </div>
        {images.length > 0 && <Button onClick={this.incrementPage} />}
      </>
    );
  }
}
