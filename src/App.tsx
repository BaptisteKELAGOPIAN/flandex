import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import MapPage from './pages/MapPage';
import FlandexPage from './pages/FlandexPage';
import FlanDetailsPage from './pages/FlanDetailsPage';
import CollectionPage from './pages/CollectionPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MapPage />} />
          <Route path="flandex" element={<CollectionPage />} />
          <Route path="elite" element={<FlandexPage />} />
          <Route path="flan/:id" element={<FlanDetailsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
