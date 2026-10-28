const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Initial Mock Properties (Synchronized with Tricity domain)
export const initialProperties = [
  {
    id: '1',
    title: '3 BHK Ultra-Luxury Highrise Residence',
    price: 11800000,
    formattedPrice: '₹ 1.18 Cr',
    pricePerSqFt: '₹ 6,840 / sq.ft.',
    location: 'Airport Road, Sector 82, Mohali',
    city: 'Mohali',
    locality: 'Sector 82',
    bedrooms: 3,
    bathrooms: 3,
    bhk: '3 BHK',
    area: '1,725 sq.ft.',
    carpetArea: '1,320 sq.ft.',
    type: 'Apartment',
    possessionStatus: 'Ready to Move',
    listingSource: 'Verified Developer',
    status: 'Approved',
    postedDate: 'March 22, 2026',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    description: 'Corner 3 BHK apartment with modular Italian kitchen, private clubhouse access, 100% power backup, and pristine park view on PR-7 Airport Road.'
  },
  {
    id: '2',
    title: 'Modern 4 BHK Independent Luxury Floor',
    price: 24500000,
    formattedPrice: '₹ 2.45 Cr',
    pricePerSqFt: '₹ 9,800 / sq.ft.',
    location: 'Sector 34, Chandigarh',
    city: 'Chandigarh',
    locality: 'Sector 34',
    bedrooms: 4,
    bathrooms: 4,
    bhk: '4 BHK',
    area: '2,500 sq.ft.',
    carpetArea: '2,050 sq.ft.',
    type: 'Independent Floor',
    possessionStatus: 'Ready to Move',
    listingSource: 'Direct Owner',
    status: 'Approved',
    postedDate: 'March 20, 2026',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
    description: 'Exclusive freehold builder floor with dedicated private lift, Italian marble flooring, 2 reserved stilt car parkings, and prime central connectivity.'
  },
  {
    id: '3',
    title: 'Premium 3 BHK Golf-Facing Apartment',
    price: 16500000,
    formattedPrice: '₹ 1.65 Cr',
    pricePerSqFt: '₹ 7,500 / sq.ft.',
    location: 'Sector 20, Panchkula',
    city: 'Panchkula',
    locality: 'Sector 20',
    bedrooms: 3,
    bathrooms: 3,
    bhk: '3 BHK',
    area: '2,200 sq.ft.',
    carpetArea: '1,680 sq.ft.',
    type: 'Apartment',
    possessionStatus: 'Under Construction',
    listingSource: 'Verified Developer',
    status: 'Pending',
    postedDate: 'April 02, 2026',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
    description: 'Panoramic Shivalik hill views, smart security automation, EV charging bay, infinity pool, and landscaped zen gardens.'
  },
  {
    id: '4',
    title: 'Gated 2 BHK Smart Lifestyle Flat',
    price: 6800000,
    formattedPrice: '₹ 68 Lakhs',
    pricePerSqFt: '₹ 5,440 / sq.ft.',
    location: 'PR7 Airport Road, Zirakpur',
    city: 'Zirakpur',
    locality: 'PR7 Airport Road',
    bedrooms: 2,
    bathrooms: 2,
    bhk: '2 BHK',
    area: '1,250 sq.ft.',
    carpetArea: '950 sq.ft.',
    type: 'Apartment',
    possessionStatus: 'Ready to Move',
    listingSource: 'Authorized Partner',
    status: 'Sold',
    postedDate: 'February 15, 2026',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
    description: 'Well-ventilated north-east facing 2 BHK near international school belt, 15 min drive to Chandigarh airport, with 24/7 security & shopping arcade.'
  },
  {
    id: '5',
    title: '5 BHK Spanish Architecture Grand Villa',
    price: 38500000,
    formattedPrice: '₹ 3.85 Cr',
    pricePerSqFt: '₹ 11,000 / sq.ft.',
    location: 'Sector 82 Alpha, Mohali',
    city: 'Mohali',
    locality: 'Sector 82',
    bedrooms: 5,
    bathrooms: 6,
    bhk: '5 BHK',
    area: '3,500 sq.ft.',
    carpetArea: '2,900 sq.ft.',
    type: 'Villa',
    possessionStatus: 'Ready to Move',
    listingSource: 'Direct Owner',
    status: 'Pending',
    postedDate: 'April 05, 2026',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=80',
    description: 'Palatial custom-crafted Mediterranean villa with private swimming pool, home automation, double-height foyer, and landscaped terrace lounge.'
  }
];

// Initial Deals Pipeline (Image 2 style)
export const initialDeals = [
  {
    id: 'deal-1',
    clientName: 'Amanda Chen',
    clientEmail: 'amanda.chen@example.com',
    clientPhone: '+91 98721 44520',
    propertyTitle: 'Luxury Condo - Miami Beach (PR-7 Palm)',
    propertyType: 'Residential Sale',
    value: 2200000,
    formattedValue: '₹ 2.20 Cr',
    stage: 'New Lead',
    daysInStage: 4,
    notes: 'Inquired about corner unit with park-facing balcony.',
    assignedAgent: 'ThemeMu'
  },
  {
    id: 'deal-2',
    clientName: 'Christopher Lee',
    clientEmail: 'chris.lee@example.com',
    clientPhone: '+91 98150 99821',
    propertyTitle: 'Industrial Lot - Sector 82 IT Park',
    propertyType: 'Land',
    value: 890000,
    formattedValue: '₹ 89.0 Lakhs',
    stage: 'New Lead',
    daysInStage: 2,
    notes: 'Looking for warehouse or tech office zoning approval.',
    assignedAgent: 'Cameron Williamson'
  },
  {
    id: 'deal-3',
    clientName: 'Olivia Grant',
    clientEmail: 'olivia.g@example.com',
    clientPhone: '+91 99880 12345',
    propertyTitle: '3 Bed Apartment in Sector 34',
    propertyType: 'Residential Rent',
    value: 975000,
    formattedValue: '₹ 97.5 Lakhs',
    stage: 'Viewing Scheduled',
    daysInStage: 49,
    notes: 'Site visit confirmed for this Saturday 11:30 AM.',
    assignedAgent: 'Themesflat'
  },
  {
    id: 'deal-4',
    clientName: 'James Patterson',
    clientEmail: 'james.p@example.com',
    clientPhone: '+91 98765 43210',
    propertyTitle: 'Retail Strip Mall - PR7 Airport Road',
    propertyType: 'Commercial Sale',
    value: 3100000,
    formattedValue: '₹ 3.10 Cr',
    stage: 'Viewing Scheduled',
    daysInStage: 12,
    notes: 'High-yield commercial anchor tenant showroom space.',
    assignedAgent: 'Esther Howard'
  },
  {
    id: 'deal-5',
    clientName: 'Sarah Jenkins',
    clientEmail: 'sarah.j@example.com',
    clientPhone: '+91 98884 56789',
    propertyTitle: 'Land Parcel - New Chandigarh EcoCity',
    propertyType: 'Land',
    value: 1500000,
    formattedValue: '₹ 1.50 Cr',
    stage: 'Viewing Completed',
    daysInStage: 18,
    notes: 'Buyer requested boundary registry verification docs.',
    assignedAgent: 'ThemeMu'
  },
  {
    id: 'deal-6',
    clientName: 'Maria Rodriguez',
    clientEmail: 'maria.r@example.com',
    clientPhone: '+91 97790 88712',
    propertyTitle: '2 Bed Townhouse - Panchkula Extension',
    propertyType: 'Residential Sale',
    value: 680000,
    formattedValue: '₹ 68.0 Lakhs',
    stage: 'Viewing Completed',
    daysInStage: 7,
    notes: 'Follow up after home loan pre-approval with HDFC.',
    assignedAgent: 'Themesflat'
  },
  {
    id: 'deal-7',
    clientName: 'Ngozi Eze',
    clientEmail: 'ngozi.eze@example.com',
    clientPhone: '+91 98144 77219',
    propertyTitle: '5 BHK Spanish Villa - Mohali Hills',
    propertyType: 'Residential Sale',
    value: 3850000,
    formattedValue: '₹ 3.85 Cr',
    stage: 'Under Negotiation',
    daysInStage: 43,
    notes: 'Price counter-offer submitted at ₹3.75 Cr.',
    assignedAgent: 'Cameron Williamson'
  },
  {
    id: 'deal-8',
    clientName: 'Folake Adesanya',
    clientEmail: 'folake@example.com',
    clientPhone: '+91 99155 63210',
    propertyTitle: 'Penthouse Suite - Sector 20 Panchkula',
    propertyType: 'Residential Sale',
    value: 2750000,
    formattedValue: '₹ 2.75 Cr',
    stage: 'Closed Won',
    daysInStage: 5,
    notes: 'Token advance received. Sale deed registration next week.',
    assignedAgent: 'Themesflat'
  }
];

// Initial Messages (Image 1 style)
export const initialMessages = [
  {
    id: 'msg-1',
    sender: 'Themesflat',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    timeAgo: '3 day ago',
    preview: 'Buyer asked if the 3 BHK corner unit at Sector 82 includes 2 covered stilt parkings.',
    unread: true
  },
  {
    id: 'msg-2',
    sender: 'ThemeMu',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    timeAgo: '3 day ago',
    preview: 'Nullam lacinia lorem id sapien suscipit, vitae pellentesque metus maximus.',
    unread: false
  },
  {
    id: 'msg-3',
    sender: 'Cameron Williamson',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    timeAgo: '3 day ago',
    preview: 'In consequat lacus augue, a vestibulum est aliquam non. Sent registry verification docs.',
    unread: false
  },
  {
    id: 'msg-4',
    sender: 'Esther Howard',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    timeAgo: '3 day ago',
    preview: 'Cras congue in justo vel dapibus. Client wants to reschedule Sunday site tour.',
    unread: true
  }
];

// Initial Reviews (Image 1 style)
export const initialReviews = [
  {
    id: 'rev-1',
    author: 'Bessie Cooper',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    timeAgo: '3 day ago',
    rating: 5,
    propertyTitle: 'Hero Homes Sector 82',
    comment: 'Maecenas eu lorem et urna accumsan vestibulum vel vitae magna. Exceptional transparency throughout the paperwork!'
  },
  {
    id: 'rev-2',
    author: 'Annette Black',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    timeAgo: '3 day ago',
    rating: 5,
    propertyTitle: 'Belleza PR-7 Airport Road',
    comment: 'Nullam rhoncus dolor arcu, et commodo tellus semper vitae. Aenean finibus tristique lectus, ac lobortis mauris venenatis ac.'
  },
  {
    id: 'rev-3',
    author: 'Ralph Edwards',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
    timeAgo: '3 day ago',
    rating: 5,
    propertyTitle: 'Panchkula Golf Greens',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Direct developer pricing saved us 2% brokerage!'
  },
  {
    id: 'rev-4',
    author: 'Jerome Bell',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
    timeAgo: '3 day ago',
    rating: 5,
    propertyTitle: 'Sector 34 Builder Floor',
    comment: 'Fusce sit amet purus eget quam eleifend hendrerit nec a erat. Private lift and parking are top notch.'
  },
  {
    id: 'rev-5',
    author: 'Albert Flores',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
    timeAgo: '3 day ago',
    rating: 5,
    propertyTitle: 'New Chandigarh Villa',
    comment: 'Donec bibendum nibh quis nisl luctus, at aliquet ipsum bibendum. Professional guidance by the agent.'
  }
];

// Initial Site Visit Leads
export const initialLeads = [
  {
    id: 'lead-1',
    name: 'Gurpreet Singh',
    phone: '+91 98765 12340',
    propertyTitle: '3 BHK Ultra-Luxury Highrise Residence',
    location: 'Airport Road, Sector 82, Mohali',
    slot: 'Tomorrow, Morning (10 AM - 1 PM)',
    needCab: true,
    status: 'New',
    createdAt: '2026-10-27'
  },
  {
    id: 'lead-2',
    name: 'Pooja Verma',
    phone: '+91 98140 88231',
    propertyTitle: 'Modern 4 BHK Independent Luxury Floor',
    location: 'Sector 34, Chandigarh',
    slot: 'This Saturday, Afternoon (1 PM - 4 PM)',
    needCab: false,
    status: 'Visit Scheduled',
    createdAt: '2026-10-26'
  },
  {
    id: 'lead-3',
    name: 'Rohan Sharma',
    phone: '+91 98882 34567',
    propertyTitle: 'Premium 3 BHK Golf-Facing Apartment',
    location: 'Sector 20, Panchkula',
    slot: 'Flexible / Weekday, Morning',
    needCab: true,
    status: 'Contacted',
    createdAt: '2026-10-25'
  }
];

// LocalStorage helpers for persistent offline edits
const STORAGE_PROP_KEY = 'th_admin_properties';
const STORAGE_DEALS_KEY = 'th_admin_deals';
const STORAGE_LEADS_KEY = 'th_admin_leads';

export const getStoredProperties = () => {
  try {
    const data = localStorage.getItem(STORAGE_PROP_KEY);
    return data ? JSON.parse(data) : initialProperties;
  } catch {
    return initialProperties;
  }
};

export const saveStoredProperties = (props) => {
  try {
    localStorage.setItem(STORAGE_PROP_KEY, JSON.stringify(props));
  } catch {
    // silent
  }
};

// API Services
export const fetchProperties = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/properties`);
    if (!res.ok) throw new Error('Network response failed');
    const json = await res.json();
    return json.data || initialProperties;
  } catch {
    return getStoredProperties();
  }
};

export const createProperty = async (data) => {
  try {
    const res = await fetch(`${API_BASE_URL}/properties`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Create failed');
    const json = await res.json();
    return json.data;
  } catch {
    const numPrice = Number(data.price);
    const formatted = numPrice >= 10000000
      ? `₹ ${(numPrice / 10000000).toFixed(2)} Cr`
      : `₹ ${(numPrice / 100000).toFixed(1)} Lakhs`;

    const newProp = {
      id: String(Date.now()),
      ...data,
      formattedPrice: formatted,
      pricePerSqFt: 'Market Rate',
      status: data.status || 'Approved',
      postedDate: 'Today',
      image: data.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    };
    const current = getStoredProperties();
    const updated = [newProp, ...current];
    saveStoredProperties(updated);
    return newProp;
  }
};

export const updateProperty = async (id, data) => {
  try {
    const res = await fetch(`${API_BASE_URL}/properties/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Update failed');
    const json = await res.json();
    return json.data;
  } catch {
    const current = getStoredProperties();
    const updated = current.map(p => (p.id === id ? { ...p, ...data } : p));
    saveStoredProperties(updated);
    return updated.find(p => p.id === id);
  }
};

export const updatePropertyStatus = async (id, status) => {
  try {
    const res = await fetch(`${API_BASE_URL}/properties/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Status update failed');
    const json = await res.json();
    return json.data;
  } catch {
    const current = getStoredProperties();
    const updated = current.map(p => (p.id === id ? { ...p, status } : p));
    saveStoredProperties(updated);
    return updated.find(p => p.id === id);
  }
};

export const deleteProperty = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/properties/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Delete failed');
    return true;
  } catch {
    const current = getStoredProperties();
    const updated = current.filter(p => p.id !== id);
    saveStoredProperties(updated);
    return true;
  }
};

// Deals API
export const fetchDeals = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/crm/deals`);
    if (!res.ok) throw new Error('Deals fetch failed');
    const json = await res.json();
    return json.data || initialDeals;
  } catch {
    try {
      const stored = localStorage.getItem(STORAGE_DEALS_KEY);
      return stored ? JSON.parse(stored) : initialDeals;
    } catch {
      return initialDeals;
    }
  }
};

export const updateDealStage = async (id, stage) => {
  try {
    const res = await fetch(`${API_BASE_URL}/crm/deals/${id}/stage`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stage }),
    });
    if (!res.ok) throw new Error('Deal stage update failed');
    const json = await res.json();
    return json.data;
  } catch {
    return { id, stage };
  }
};

// Leads API
export const fetchLeads = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/crm/leads`);
    if (!res.ok) throw new Error('Leads fetch failed');
    const json = await res.json();
    return json.data || initialLeads;
  } catch {
    try {
      const stored = localStorage.getItem(STORAGE_LEADS_KEY);
      return stored ? JSON.parse(stored) : initialLeads;
    } catch {
      return initialLeads;
    }
  }
};

// Messages & Reviews API
export const fetchMessages = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/crm/messages`);
    if (!res.ok) throw new Error('Messages fetch failed');
    const json = await res.json();
    return json.data || initialMessages;
  } catch {
    return initialMessages;
  }
};

export const fetchReviews = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/crm/reviews`);
    if (!res.ok) throw new Error('Reviews fetch failed');
    const json = await res.json();
    return json.data || initialReviews;
  } catch {
    return initialReviews;
  }
};


// Promotional Hero Banners (Featured on Home page)
export const initialBanners = [
  {
    id: 'banner-1',
    presenter: 'HERO HOMES PRESENTS',
    config: '3 & 4 BHK',
    tag: 'PREMIUM RESIDENCES',
    price: '₹1.18 Cr* Onwards',
    name: 'Leafsong Retreat',
    subname: 'BY HERO HOMES',
    location: 'Sector 82, Airport Road, Mohali',
    tagline: 'LIFE AT EASE • BREATHE BETTER WITH AQI-CONTROLLED HOMES',
    rera: 'PBRERA-SAS80-PR0641',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    isActive: true
  },
  {
    id: 'banner-2',
    presenter: 'SUSHMA GROUP PRESENTS',
    config: '3 & 4 BHK',
    tag: 'ULTRA-LUXURY LIVING',
    price: '₹1.35 Cr* Onwards',
    name: 'Belleza Residences',
    subname: 'PR-7 AIRPORT RING ROAD',
    location: 'PR-7 Airport Road, Zirakpur',
    tagline: 'SPANISH ARCHITECTURE • 100% POWER BACKUP & RESORT AMENITIES',
    rera: 'PBRERA-ZRK-1102',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    isActive: true
  }
];

export const fetchBanners = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/crm/banners`);
    if (!res.ok) throw new Error('Banners fetch failed');
    const json = await res.json();
    return json.data || initialBanners;
  } catch {
    try {
      const stored = localStorage.getItem('th_admin_banners');
      return stored ? JSON.parse(stored) : initialBanners;
    } catch {
      return initialBanners;
    }
  }
};

export const createBanner = async (data) => {
  try {
    const res = await fetch(`${API_BASE_URL}/crm/banners`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Create banner failed');
    const json = await res.json();
    return json.data;
  } catch {
    const newB = { id: `banner-${Date.now()}`, ...data, isActive: true };
    try {
      const stored = localStorage.getItem('th_admin_banners');
      const list = stored ? JSON.parse(stored) : [...initialBanners];
      list.unshift(newB);
      localStorage.setItem('th_admin_banners', JSON.stringify(list));
    } catch {}
    return newB;
  }
};

export const updateBanner = async (id, data) => {
  try {
    const res = await fetch(`${API_BASE_URL}/crm/banners/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Update banner failed');
    const json = await res.json();
    return json.data;
  } catch {
    try {
      const stored = localStorage.getItem('th_admin_banners');
      const list = stored ? JSON.parse(stored) : [...initialBanners];
      const updated = list.map(b => b.id === id ? { ...b, ...data } : b);
      localStorage.setItem('th_admin_banners', JSON.stringify(updated));
    } catch {}
    return { id, ...data };
  }
};

export const deleteBanner = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/crm/banners/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Delete banner failed');
    return true;
  } catch {
    try {
      const stored = localStorage.getItem('th_admin_banners');
      const list = stored ? JSON.parse(stored) : [...initialBanners];
      const filtered = list.filter(b => b.id !== id);
      localStorage.setItem('th_admin_banners', JSON.stringify(filtered));
    } catch {}
    return true;
  }
};
