import {BiErrorCircle} from 'react-icons/bi';

const Error = (props)=>{
  return <div className='error'>
    <BiErrorCircle />
    {props.children}
  </div>
}

export default Error;