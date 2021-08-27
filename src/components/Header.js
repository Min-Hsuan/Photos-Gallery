import { useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const populars = ['nature', 'ocean' , 'froest', 'sunrise', 'snow'];

const Header = (props) => {
  const [enteredInput, setEnteredInput] = useState('');
  const inputChangeHandler = (event) => {
    setEnteredInput(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLoadSearch(enteredInput);
    setEnteredInput('');
  };
  return (
    <div>
      <Link to='/' className="logo">Photos Gallery</Link>
      <p className="subtitle">All photos are from Flickr</p>
      <form onSubmit={submitHandler}>
        <div className="action">
          <input
            className="input"
            type="text"
            placeholder="Search for high-resolution photos"
            value={enteredInput}
            onChange={inputChangeHandler}
            required
          />
          <button className="button" type="submit">
            <BiSearchAlt />
          </button>
        </div>
      </form>
      <ul className='keyword-list'>
        <span>Most popular:</span>
        {populars.map((popular) => (
          <li key={Math.random() * 100} className='keyword'>
            <Link to={`/search/${popular}`}>{popular}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Header;
