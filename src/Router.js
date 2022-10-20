import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Auth from 'pages/Auth';
import Todo from 'pages/Todo';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="/auth/:sign" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
