import { ReactNode } from 'react';
import { BiErrorCircle } from 'react-icons/bi';

interface ErrorProps {
  children: ReactNode;
}

const Error = (props: ErrorProps) => {
  return (
    <div className='error'>
      <BiErrorCircle />
      {props.children}
    </div>
  );
}

export default Error;
