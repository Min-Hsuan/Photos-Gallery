import React from 'react';
import ReactDOM from 'react-dom';

import { CSSTransition } from 'react-transition-group';
import './Modal.css';

const ModalOverlay = (props) => {
  return (
    <CSSTransition
      in={props.show}
      timeout={300}
      mountOnEnter
      unmountOnExit
      classNames={{
        enter: '',
        enterActive: 'ModalOpen',
        exit: '',
        exitActive: 'ModalClosed',
      }}
    >
      <div className="overlay">{props.children}</div>
    </CSSTransition>
  );
};

const Backdrop = (props) => {
  return (
    <CSSTransition in={props.show} mountOnEnter unmountOnExit timeout={0}>
      <div className="backdrop" onClick={props.onClose}></div>
    </CSSTransition>
  );
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} show={props.show} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay onClose={props.onClose} show={props.show}>
          {props.children}
        </ModalOverlay>,
        portalElement
      )}
    </React.Fragment>
  );
};

export default Modal;
