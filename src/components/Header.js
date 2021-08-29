import { useState, useContext } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { UserContext } from '../store/user-context';

const populars = ['nature', 'ocean', 'froest', 'sunrise', 'snow'];

const Header = (props) => {
  const userCtx = useContext(UserContext);
  const [enteredInput, setEnteredInput] = useState('');
  const likeListTotal = userCtx.images.length;

  const inputChangeHandler = (event) => {
    setEnteredInput(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLoadSearch(enteredInput);
    setEnteredInput('');
  };
  return (
    <header>
      <div className="head">
        <Link to="/" className="logo">
          Photos Gallery
        </Link>
        <button onClick={props.onOpen} className="like-button">
          <span className='total-number'>{likeListTotal}</span>
          <FaHeart />
        </button>
      </div>
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
      <ul className="keyword-list">
        <span>Most popular:</span>
        {populars.map((popular) => (
          <li key={Math.random() * 100} className="keyword">
            <Link to={`/search/${popular}`}>{popular}</Link>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
