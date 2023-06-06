import React from 'react';
import './App.css';

import Navbar from "./components/Navbar/Navbar";
import Homepage from './components/Homepage';
import Footer from "./components/Footer/Footer";
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { Food } from './components/Food/Food';
import Trainer from './components/Trainer2';
const App = () => {
  return (
    <div>
      <Navbar />
      <BrowserRouter>
      <Routes>
        <Route path="/" element ={<Homepage/>}></Route>
        <Route path="/food" element={<Food/>}></Route>
        <Route path="/trainer" element={<Trainer/>}></Route>
      </Routes>
      </BrowserRouter>
      <Footer />
    </div >
  );
}

export default App;
