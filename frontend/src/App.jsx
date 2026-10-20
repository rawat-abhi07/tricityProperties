import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Properties from './pages/Properties';
import AddProperty from './pages/AddProperty';
import { fetchProperties, createProperty } from './services/api';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      setLoading(true);
      const res = await fetchProperties();
      if (res && res.data) {
        setProperties(res.data);
      }
    } catch (err) {
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToProperties = (newFilters = {}) => {
    setFilters(newFilters);
    setActiveTab('properties');
  };

  const handleAddProperty = async (newPropertyData) => {
    const res = await createProperty(newPropertyData);
    if (res && res.data) {
      setProperties((prev) => [res.data, ...prev]);
    }
    return res;
  };

  return (
    <div className="app-container">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="main-content">
        {loading ? (
          <div className="loader-container">
            <div className="spinner"></div>
            <p>Loading real estate listings...</p>
          </div>
        ) : (
          <>
            {activeTab === 'home' && (
              <Home
                properties={properties}
                onNavigateToProperties={handleNavigateToProperties}
              />
            )}
            {activeTab === 'properties' && (
              <Properties
                properties={properties}
                initialFilters={filters}
              />
            )}
            {activeTab === 'add' && (
              <AddProperty onPropertyCreated={handleAddProperty} />
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
