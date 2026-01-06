import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import './Modal.css';

interface ModalOverlayProps {
  show: boolean;
  children: ReactNode;
}

const ModalOverlay = (props: ModalOverlayProps) => {
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

interface BackdropProps {
  show: boolean;
  onClose: () => void;
}

const Backdrop = (props: BackdropProps) => {
  return (
    <CSSTransition in={props.show} mountOnEnter unmountOnExit timeout={0}>
      <div className="backdrop" onClick={props.onClose}></div>
    </CSSTransition>
  );
};

const portalElement = document.getElementById('overlays')!;

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = (props: ModalProps) => {
  return (
    <>
      {createPortal(
        <Backdrop onClose={props.onClose} show={props.show} />,
        portalElement
      )}
      {createPortal(
        <ModalOverlay show={props.show}>
          {props.children}
        </ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
