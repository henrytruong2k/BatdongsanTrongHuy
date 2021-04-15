import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase } from './counterSlice';

CounterFeature.propTypes = {};

function CounterFeature(props) {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);
  const handleIncreaseClick = () => {
    const action = increase();
    dispatch(action);
  };
  const handleDecreaseClick = () => {
    const action = decrease();
    dispatch(action);
  };
  return (
    <>
      <h3 className="text-center">Counter: {counter}</h3>
      <div>
        <button onClick={handleIncreaseClick}>+</button>
        <button onClick={handleDecreaseClick}>-</button>
      </div>
    </>
  );
}

export default CounterFeature;
