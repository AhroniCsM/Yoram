import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Articles from './pages/Articles';
import Policy from './pages/Policy';
import Accessibility from './pages/Accessibility';

const App: React.FC = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/accessibility" element={<Accessibility />} />
      <Route path="*" element={<Home />} />
    </Route>
  </Routes>
);

export default App;
