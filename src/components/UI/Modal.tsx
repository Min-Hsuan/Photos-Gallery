import { useContext, ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ModalContext } from '../../store/modal-context';
import { CSSTransition } from 'react-transition-group';
import './Modal.css';

interface ModalOverlayProps {
  show: boolean;
  children: ReactNode;
}

const ModalOverlay = (props: ModalOverlayProps) => {
  const nodeRef = useRef<HTMLDivElement>(null)
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
      nodeRef={nodeRef}
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
  const nodeRef = useRef<HTMLDivElement>(null)

  return (
    <CSSTransition in={props.show} mountOnEnter unmountOnExit timeout={0} nodeRef={nodeRef}>
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
  const modalContext = useContext(ModalContext);

  return (
    <>
      {createPortal(
        <Backdrop onClose={modalContext.setModalClosed} show={props.show} />,
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
