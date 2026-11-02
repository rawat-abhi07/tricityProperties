import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Properties from './pages/Properties';
import Localities from './pages/Localities';
import Principles from './pages/Principles';
import AddProperty from './pages/AddProperty';
import PropertyDetail from './pages/PropertyDetail';
import ContextualLeadModal from './components/ContextualLeadModal';
import ComparisonDrawer from './components/ComparisonDrawer';
import ComparisonModal from './components/ComparisonModal';
import SavedModal from './components/SavedModal';
import { fetchProperties, createProperty, fallbackProperties } from './services/api';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [previousTab, setPreviousTab] = useState('properties');
  const [selectedCity, setSelectedCity] = useState('All Tricity');
  const [properties, setProperties] = useState(fallbackProperties);
  const [loading, setLoading] = useState(true);
  const [exploreFilters, setExploreFilters] = useState({});

  // Single Property Detail Navigation state
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);

  // Comparison State
  const [comparedProperties, setComparedProperties] = useState([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);

  // Shortlist State (stored in localStorage for persistence)
  const [savedPropertyIds, setSavedPropertyIds] = useState(() => {
    try {
      const stored = localStorage.getItem('th_saved_ids');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [showSavedModal, setShowSavedModal] = useState(false);

  // Contextual Lead Modal
  const [leadModalState, setLeadModalState] = useState({
    isOpen: false,
    property: null,
    mode: 'visit',
  });

  const loadProperties = async () => {
    try {
      setLoading(true);
      const res = await fetchProperties();
      if (res && res.data && res.data.length > 0) {
        setProperties(res.data);
      }
    } catch (err) {
      console.warn('Using local fallback listings:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load properties on initial mount
  useEffect(() => {
    loadProperties();
  }, []);

  // Listen for browser URL hash changes for sharable direct listing links (#property/:id)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#property/')) {
        const id = hash.replace('#property/', '').trim();
        if (id) {
          setSelectedPropertyId(id);
          const found = properties.find((p) => String(p.id) === String(id));
          if (found) {
            setSelectedProperty(found);
          }
          setActiveTab('property-detail');
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [properties]);

  // Save to localStorage when shortlist changes
  useEffect(() => {
    try {
      localStorage.setItem('th_saved_ids', JSON.stringify(savedPropertyIds));
    } catch {
      // LocalStorage error handling
    }
  }, [savedPropertyIds]);

  // Tab change & scroll to top
  const handleTabChange = (newTab) => {
    if (window.location.hash.startsWith('#property/')) {
      window.history.pushState(null, '', window.location.pathname);
    }
    setActiveTab(newTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (newTab === 'home' || newTab === 'properties') {
      loadProperties();
    }
  };

  // Select Single Property & navigate to Single Listing Page
  const handleSelectProperty = (property) => {
    setPreviousTab(activeTab === 'property-detail' ? 'properties' : activeTab);
    setSelectedProperty(property);
    setSelectedPropertyId(property.id);
    setActiveTab('property-detail');
    window.location.hash = `#property/${property.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back from Single Listing Page
  const handleBackFromDetail = () => {
    window.history.pushState(null, '', window.location.pathname);
    handleTabChange(previousTab || 'properties');
  };

  // City change handler
  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  // Navigate to Explore Properties with filters
  const handleNavigateToExplore = (filters = {}) => {
    if (filters.city) {
      setSelectedCity(filters.city);
    }
    setExploreFilters(filters);
    handleTabChange('properties');
  };

  // Compare Toggle
  const handleToggleCompare = (property) => {
    setComparedProperties((prev) => {
      const exists = prev.find((p) => p.id === property.id);
      if (exists) {
        return prev.filter((p) => p.id !== property.id);
      }
      if (prev.length >= 3) {
        alert('You can compare a maximum of 3 properties simultaneously.');
        return prev;
      }
      return [...prev, property];
    });
  };

  const handleRemoveCompare = (id) => {
    setComparedProperties((prev) => prev.filter((p) => p.id !== id));
  };

  const handleClearCompare = () => {
    setComparedProperties([]);
  };

  // Save/Shortlist Toggle
  const handleToggleSave = (id) => {
    setSavedPropertyIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Open Contextual Lead Modal
  const handleOpenLeadModal = (property, mode = 'visit') => {
    setLeadModalState({
      isOpen: true,
      property: property || properties[0],
      mode,
    });
  };

  const handleCloseLeadModal = () => {
    setLeadModalState({ isOpen: false, property: null, mode: 'visit' });
  };

  // Handle Create Property
  const handleAddProperty = async (newPropData) => {
    const res = await createProperty(newPropData);
    if (res && res.data) {
      setProperties((prev) => [res.data, ...prev]);
    }
    return res;
  };

  // Only Approved properties are visible on the buyer marketplace
  const approvedProperties = properties.filter((p) => !p.status || p.status === 'Approved');
  const savedPropertiesList = approvedProperties.filter((p) => savedPropertyIds.includes(p.id));
  const comparedIds = comparedProperties.map((p) => p.id);

  return (
    <div className="app-layout">
      {/* Subtle Header */}
      <Navbar
        selectedCity={selectedCity}
        onCityChange={handleCityChange}
        activeTab={activeTab === 'property-detail' ? 'properties' : activeTab}
        onTabChange={handleTabChange}
        savedCount={savedPropertyIds.length}
        compareCount={comparedProperties.length}
        onOpenComparison={() => setShowComparisonModal(true)}
        onOpenSaved={() => setShowSavedModal(true)}
      />

      {/* Main Content Area */}
      <main className="main-viewport">
        {loading ? (
          <div className="loader-container">
            <div className="spinner"></div>
            <p>Loading verified Tricity listings...</p>
          </div>
        ) : (
          <>
            {activeTab === 'home' && (
              <Home
                properties={approvedProperties}
                selectedCity={selectedCity}
                onCityChange={handleCityChange}
                onNavigateToProperties={handleNavigateToExplore}
                onOpenLeadModal={handleOpenLeadModal}
                onToggleCompare={handleToggleCompare}
                onToggleSave={handleToggleSave}
                onSelectProperty={handleSelectProperty}
                comparedIds={comparedIds}
                savedIds={savedPropertyIds}
              />
            )}

            {activeTab === 'properties' && (
              <Properties
                properties={approvedProperties}
                initialFilters={exploreFilters}
                selectedCity={selectedCity}
                onCityChange={handleCityChange}
                onOpenLeadModal={handleOpenLeadModal}
                onToggleCompare={handleToggleCompare}
                onToggleSave={handleToggleSave}
                onSelectProperty={handleSelectProperty}
                comparedIds={comparedIds}
                savedIds={savedPropertyIds}
              />
            )}

            {activeTab === 'localities' && (
              <Localities
                onSelectLocality={(locName, city) => {
                  handleNavigateToExplore({ location: locName, city });
                }}
              />
            )}

            {activeTab === 'principles' && (
              <Principles onBrowseHomes={() => handleTabChange('properties')} />
            )}

            {activeTab === 'add' && (
              <AddProperty
                onPropertyCreated={handleAddProperty}
                onCancel={() => handleTabChange('home')}
              />
            )}

            {activeTab === 'property-detail' && (
              <PropertyDetail
                key={selectedPropertyId || selectedProperty?.id || 'detail'}
                property={selectedProperty}
                propertyId={selectedPropertyId}
                allProperties={approvedProperties}
                onBack={handleBackFromDetail}
                onOpenLeadModal={handleOpenLeadModal}
                onToggleCompare={handleToggleCompare}
                onToggleSave={handleToggleSave}
                onSelectProperty={handleSelectProperty}
                isCompared={selectedProperty ? comparedIds.includes(selectedProperty.id) : false}
                isSaved={selectedProperty ? savedPropertyIds.includes(selectedProperty.id) : false}
                comparedIds={comparedIds}
                savedIds={savedPropertyIds}
              />
            )}
          </>
        )}
      </main>

      {/* Persistent Bottom Comparison Drawer (when 1+ items selected) */}
      <ComparisonDrawer
        items={comparedProperties}
        onOpenComparison={() => setShowComparisonModal(true)}
        onClear={handleClearCompare}
        onRemoveItem={handleRemoveCompare}
      />

      {/* Side-by-Side Comparison Modal */}
      {showComparisonModal && (
        <ComparisonModal
          items={comparedProperties}
          onRemove={handleRemoveCompare}
          onClose={() => setShowComparisonModal(false)}
          onSelectLead={handleOpenLeadModal}
          onSelectProperty={handleSelectProperty}
        />
      )}

      {/* Saved / Shortlist Modal */}
      {showSavedModal && (
        <SavedModal
          savedProperties={savedPropertiesList}
          onClose={() => setShowSavedModal(false)}
          onToggleSave={handleToggleSave}
          onToggleCompare={handleToggleCompare}
          onOpenLeadModal={handleOpenLeadModal}
          onSelectProperty={handleSelectProperty}
          comparedIds={comparedIds}
        />
      )}

      {/* Contextual Lead Capture Modal */}
      {leadModalState.isOpen && (
        <ContextualLeadModal
          property={leadModalState.property}
          mode={leadModalState.mode}
          onClose={handleCloseLeadModal}
        />
      )}

      {/* Subtle High-Trust Footer */}
      <Footer onCitySelect={(city) => handleNavigateToExplore({ city })} />
    </div>
  );
}
