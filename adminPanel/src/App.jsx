import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import DashboardOverview from './pages/DashboardOverview';
import PendingApprovals from './pages/PendingApprovals';
import PropertiesManagement from './pages/PropertiesManagement';
import PromotionsManager from './pages/PromotionsManager';
import DealsPipeline from './pages/DealsPipeline';
import ClientsLeads from './pages/ClientsLeads';
import ReviewsPage from './pages/ReviewsPage';
import MessagesPage from './pages/MessagesPage';
import InsightsPage from './pages/InsightsPage';
import AddPropertyModal from './components/AddPropertyModal';
import EditPropertyModal from './components/EditPropertyModal';
import AddDealModal from './components/AddDealModal';
import {
  fetchProperties,
  createProperty,
  updateProperty,
  updatePropertyStatus,
  deleteProperty,
  fetchDeals,
  updateDealStage,
  fetchLeads,
  fetchMessages,
  fetchReviews,
  fetchBanners,
  createBanner,
  updateBanner,
  deleteBanner,
  initialProperties,
  initialDeals,
  initialLeads,
  initialMessages,
  initialReviews,
  initialBanners,
} from './services/adminApi';
import { MessageCircle } from 'lucide-react';
import './App.css';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  // Data states
  const [properties, setProperties] = useState(initialProperties);
  const [deals, setDeals] = useState(initialDeals);
  const [leads, setLeads] = useState(initialLeads);
  const [banners, setBanners] = useState(initialBanners);
  const [messages, setMessages] = useState(initialMessages);
  const [reviews, setReviews] = useState(initialReviews);
  const [loading, setLoading] = useState(true);

  // Modals
  const [isAddPropOpen, setIsAddPropOpen] = useState(false);
  const [isEditPropOpen, setIsEditPropOpen] = useState(false);
  const [propertyToEdit, setPropertyToEdit] = useState(null);
  const [isAddDealOpen, setIsAddDealOpen] = useState(false);

  // Load data on mount & listen for shared updates
  useEffect(() => {
    loadAllData();

    // Listen for storage changes from frontend submissions
    const handleStorageChange = () => {
      loadAllData();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [propsData, dealsData, leadsData, bannersData, msgsData, revsData] = await Promise.all([
        fetchProperties(),
        fetchDeals(),
        fetchLeads(),
        fetchBanners(),
        fetchMessages(),
        fetchReviews(),
      ]);
      if (propsData && propsData.length > 0) setProperties(propsData);
      if (dealsData && dealsData.length > 0) setDeals(dealsData);
      if (leadsData && leadsData.length > 0) setLeads(leadsData);
      if (bannersData && bannersData.length > 0) setBanners(bannersData);
      if (msgsData && msgsData.length > 0) setMessages(msgsData);
      if (revsData && revsData.length > 0) setReviews(revsData);
    } catch (err) {
      console.warn('Using local mock data for Admin Suite:', err);
    } finally {
      setLoading(false);
    }
  };

  // Property Handlers
  const handleAddProperty = async (newPropData) => {
    const created = await createProperty(newPropData);
    if (created) {
      setProperties((prev) => [created, ...prev]);
    }
  };

  const handleOpenEdit = (prop) => {
    setPropertyToEdit(prop);
    setIsEditPropOpen(true);
  };

  const handleUpdateProperty = async (id, updatedFields) => {
    const updated = await updateProperty(id, updatedFields);
    if (updated) {
      setProperties((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
    }
  };

  // 1-Click Approve Functionality (Publishes immediately to frontend)
  const handleApproveProperty = async (id) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'Approved', isVerified: true } : p))
    );
    await updatePropertyStatus(id, 'Approved');
  };

  // Reject Functionality
  const handleRejectProperty = async (id) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'Rejected' } : p))
    );
    await updatePropertyStatus(id, 'Rejected');
  };

  const handleToggleStatus = async (id, newStatus) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );
    await updatePropertyStatus(id, newStatus);
  };

  const handleDeleteProperty = async (id) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
    await deleteProperty(id);
  };

  // Deal Handlers
  const handleUpdateDealStage = async (dealId, targetStage) => {
    setDeals((prev) =>
      prev.map((d) => (d.id === dealId ? { ...d, stage: targetStage, daysInStage: 0 } : d))
    );
    await updateDealStage(dealId, targetStage);
  };

  const handleAddDeal = (dealData) => {
    const num = Number(dealData.value);
    const formatted =
      num >= 10000000
        ? `₹ ${(num / 10000000).toFixed(2)} Cr`
        : `₹ ${(num / 100000).toFixed(1)} Lakhs`;

    const newDeal = {
      id: `deal-${Date.now()}`,
      ...dealData,
      formattedValue: formatted,
      daysInStage: 0,
    };
    setDeals((prev) => [newDeal, ...prev]);
  };

  // Lead Status Handler
  const handleUpdateLeadStatus = (leadId, newStatus) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
  };

  // Banner Handlers
  const handleCreateBanner = async (data) => {
    const created = await createBanner(data);
    if (created) setBanners((prev) => [created, ...prev]);
  };

  const handleUpdateBanner = async (id, data) => {
    await updateBanner(id, data);
    setBanners((prev) => prev.map((b) => (b.id === id ? { ...b, ...data } : b)));
  };

  const handleDeleteBanner = async (id) => {
    await deleteBanner(id);
    setBanners((prev) => prev.filter((b) => b.id !== id));
  };

  const pendingPropertiesList = properties.filter((p) => p.status === 'Pending');
  const unreadMessagesCount = messages.filter((m) => m.unread).length;

  return (
    <div className="admin-layout">
      {/* Sidebar Navigation */}
      <Sidebar
        activeView={activeView}
        onSelectView={setActiveView}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        listingCount={properties.length}
        pendingCount={pendingPropertiesList.length}
        unreadMessagesCount={unreadMessagesCount}
      />

      {/* Main View Area */}
      <main className="admin-main">
        {/* Topbar */}
        <Topbar
          activeView={activeView}
          onOpenAddProperty={() => setIsAddPropOpen(true)}
          onOpenAddDeal={() => setIsAddDealOpen(true)}
          searchQuery={globalSearch}
          onSearchChange={setGlobalSearch}
        />

        {/* Page Content */}
        <div className="admin-content">
          {activeView === 'dashboard' && (
            <DashboardOverview
              properties={properties}
              deals={deals}
              messages={messages}
              reviews={reviews}
              onEditProperty={handleOpenEdit}
              onDeleteProperty={handleDeleteProperty}
              onToggleStatus={handleToggleStatus}
              onNavigateToView={setActiveView}
            />
          )}

          {activeView === 'pending-approvals' && (
            <PendingApprovals
              pendingProperties={pendingPropertiesList}
              onApprove={handleApproveProperty}
              onReject={handleRejectProperty}
              onEdit={handleOpenEdit}
            />
          )}

          {activeView === 'properties' && (
            <PropertiesManagement
              properties={properties}
              onOpenAddModal={() => setIsAddPropOpen(true)}
              onEditProperty={handleOpenEdit}
              onDeleteProperty={handleDeleteProperty}
              onToggleStatus={handleToggleStatus}
            />
          )}

          {activeView === 'promotions' && (
            <PromotionsManager
              banners={banners}
              onCreateBanner={handleCreateBanner}
              onUpdateBanner={handleUpdateBanner}
              onDeleteBanner={handleDeleteBanner}
            />
          )}

          {activeView === 'deals' && (
            <DealsPipeline
              deals={deals}
              onUpdateDealStage={handleUpdateDealStage}
              onOpenAddDeal={() => setIsAddDealOpen(true)}
            />
          )}

          {activeView === 'clients' && (
            <ClientsLeads
              leads={leads}
              onUpdateLeadStatus={handleUpdateLeadStatus}
            />
          )}

          {activeView === 'reviews' && <ReviewsPage reviews={reviews} />}

          {activeView === 'messages' && <MessagesPage messages={messages} />}

          {activeView === 'insights' && <InsightsPage />}
        </div>
      </main>

      {/* Floating Support Chat Button (Image 2 Style) */}
      <button
        className="floating-support-btn"
        onClick={() => setActiveView('messages')}
        title="Live Messages & Chat"
        aria-label="Live Chat"
      >
        <MessageCircle size={22} />
      </button>

      {/* Add Property Modal */}
      <AddPropertyModal
        isOpen={isAddPropOpen}
        onClose={() => setIsAddPropOpen(false)}
        onAddProperty={handleAddProperty}
      />

      {/* Edit Property Modal */}
      <EditPropertyModal
        isOpen={isEditPropOpen}
        onClose={() => {
          setIsEditPropOpen(false);
          setPropertyToEdit(null);
        }}
        property={propertyToEdit}
        onUpdateProperty={handleUpdateProperty}
      />

      {/* Add Deal Modal */}
      <AddDealModal
        isOpen={isAddDealOpen}
        onClose={() => setIsAddDealOpen(false)}
        onAddDeal={handleAddDeal}
      />
    </div>
  );
}
