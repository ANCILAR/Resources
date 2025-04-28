import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { RecoilRoot } from 'recoil';
import store from './redux/store';
import { ReduxPage } from './pages/ReduxPage';
import { ZustandPage } from './pages/ZustandPage';
import { JotaiPage } from './pages/JotaiPage';
import { RecoilPage } from './pages/RecoilPage';

const App: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <nav className="mb-8 flex justify-center gap-6">
        <Link to="/redux" className="text-blue-600 hover:underline">Redux</Link>
        <Link to="/zustand" className="text-blue-600 hover:underline">Zustand</Link>
        <Link to="/jotai" className="text-blue-600 hover:underline">Jotai</Link>
        <Link to="/recoil" className="text-blue-600 hover:underline">Recoil</Link>
      </nav>

      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <Routes>
          <Route path="/redux" element={<Provider store={store}><ReduxPage /></Provider>} />
          <Route path="/zustand" element={<ZustandPage />} />
          <Route path="/jotai" element={<JotaiPage />} />
          <Route path="/recoil" element={<RecoilRoot><RecoilPage /></RecoilRoot>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
