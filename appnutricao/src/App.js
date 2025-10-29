import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import './components/ui/styles.css';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SummaryPage from './pages/SummaryPage';
import MealLogPage from './pages/MealLogPage';
import AddFoodPage from './pages/AddFoodPage';

function App() {
  return (
    <AuthProvider>
      <div className="app-layout">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/resumo" element={<SummaryPage />} />
            <Route path="/diario" element={<MealLogPage />} />
            <Route path="/adicionar/:mealType/:date" element={<AddFoodPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;