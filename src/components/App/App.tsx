//import React, { useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './App.css';

const App: React.FC = () => {
  //const [notes, setNotes] = useState([]);
  //const [activeNote, setActiveNote] = useState('');

  return (
    <div className='app'>
      <Header />
      <Footer />
    </div>
  );
};

export default App;
