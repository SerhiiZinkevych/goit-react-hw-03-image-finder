import React, { Component, createRef } from 'react';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';

export default class Modal extends Component {
  overlayRef = createRef();

  static propTypes = {
    onCloseModal: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = e => {
    if (e.code !== 'Escape') return;
    this.props.onCloseModal();
  };

  handleOverlayClick = e => {
    const { current } = this.overlayRef;
    if (current && current !== e.target) return;
    this.props.onCloseModal();
  };

  render() {
    const { children } = this.props;
    return (
      <div
        className={styles.Overlay}
        ref={this.overlayRef}
        onClick={this.handleOverlayClick}
      >
        <div className={styles.Modal}>{children}</div>
      </div>
    );
  }
}
