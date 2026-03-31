import AppRoutes from './routes/AppRoutes.jsx';
import Navbar from './components/Navbar.jsx';

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <main className="container">
        <AppRoutes />
      </main>
    </div>
  );
};

export default App;
