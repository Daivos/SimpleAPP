import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ProductCard, { P1 } from './ProductCard/ProductCard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<P1 />, div);
});
