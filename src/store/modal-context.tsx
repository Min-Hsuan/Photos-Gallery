import { createContext, useState, ReactNode } from "react"

interface ModalContextType {
  modalIsOpened: boolean;
  setModalOpened: () => void;
  setModalClosed: () => void;
}

export const ModalContext = createContext<ModalContextType>({
  modalIsOpened: false,
  setModalOpened: () => {},
  setModalClosed: () => {}
})

const ModalContextProvider = (props: { children: ReactNode }) => {
  const [modalIsOpened, setModalIsOpened] = useState(false)
  
  const setModalOpenedHandler = () => {
    setModalIsOpened(true)
  }
  
  const setModalClosedHandler = () => {
    setModalIsOpened(false)
  }
  
  const modalContext: ModalContextType = {
    modalIsOpened: modalIsOpened,
    setModalOpened: setModalOpenedHandler,
    setModalClosed: setModalClosedHandler
  }
  
  return <ModalContext.Provider value={modalContext}>{props.children}</ModalContext.Provider>
}

export default ModalContextProvider
