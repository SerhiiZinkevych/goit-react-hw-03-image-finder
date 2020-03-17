// Core
import React from 'react';
import PropTypes from 'prop-types';
// Styles
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ link, alt, onImageClick }) => (
  <li className={styles.ImageGalleryItem} onClick={onImageClick}>
    <img src={link} alt={alt} className={styles.ImageGalleryItemImage} />
  </li>
);

ImageGalleryItem.propTypes = {
  link: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
