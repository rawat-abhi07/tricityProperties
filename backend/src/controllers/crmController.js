// CRM Controller for Admin Panel (Sales Pipeline, Leads, Reviews, Messages, AI Insights)

let deals = [
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

let leads = [
  {
    id: 'lead-1',
    name: 'Gurpreet Singh',
    phone: '+91 98765 12340',
    propertyId: '1',
    propertyTitle: '3 BHK Ultra-Luxury Highrise Residence',
    location: 'Airport Road, Sector 82, Mohali',
    slot: 'Tomorrow, Morning (10 AM - 1 PM)',
    needCab: true,
    status: 'New',
    createdAt: '2026-10-27T10:30:00.000Z'
  },
  {
    id: 'lead-2',
    name: 'Pooja Verma',
    phone: '+91 98140 88231',
    propertyId: '2',
    propertyTitle: 'Modern 4 BHK Independent Luxury Floor',
    location: 'Sector 34, Chandigarh',
    slot: 'This Saturday, Afternoon (1 PM - 4 PM)',
    needCab: false,
    status: 'Visit Scheduled',
    createdAt: '2026-10-26T16:15:00.000Z'
  },
  {
    id: 'lead-3',
    name: 'Rohan Sharma',
    phone: '+91 98882 34567',
    propertyId: '3',
    propertyTitle: 'Premium 3 BHK Golf-Facing Apartment',
    location: 'Sector 20, Panchkula',
    slot: 'Flexible / Weekday, Morning',
    needCab: true,
    status: 'Contacted',
    createdAt: '2026-10-25T11:45:00.000Z'
  }
];

let messages = [
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

let reviews = [
  {
    id: 'rev-1',
    author: 'Bessie Cooper',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    timeAgo: '3 day ago',
    rating: 5,
    propertyTitle: 'Hero Homes Sector 82',
    comment: 'Exceptional transparency throughout the paperwork. Verified RERA credentials and clean escrow handoff.'
  },
  {
    id: 'rev-2',
    author: 'Annette Black',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    timeAgo: '3 day ago',
    rating: 5,
    propertyTitle: 'Belleza PR-7 Airport Road',
    comment: 'Nullam rhoncus dolor arcu, et commodo tellus semper vitae. The free cab tour service was completely seamless.'
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

// Get all deals
export const getDeals = (req, res) => {
  res.status(200).json({ success: true, count: deals.length, data: deals });
};

// Create new deal
export const createDeal = (req, res) => {
  const { clientName, propertyTitle, propertyType, value, stage, assignedAgent, notes } = req.body;
  if (!clientName || !value) {
    return res.status(400).json({ success: false, message: 'Client name and value are required' });
  }

  const numVal = Number(value);
  const formatted = numVal >= 10000000
    ? `₹ ${(numVal / 10000000).toFixed(2)} Cr`
    : `₹ ${(numVal / 100000).toFixed(1)} Lakhs`;

  const newDeal = {
    id: `deal-${Date.now()}`,
    clientName,
    clientEmail: req.body.clientEmail || `${clientName.toLowerCase().replace(/\s+/g, '')}@example.com`,
    clientPhone: req.body.clientPhone || '+91 98888 XXXXX',
    propertyTitle: propertyTitle || 'Prime Tricity Property',
    propertyType: propertyType || 'Residential Sale',
    value: numVal,
    formattedValue: formatted,
    stage: stage || 'New Lead',
    daysInStage: 0,
    notes: notes || 'New pipeline entry.',
    assignedAgent: assignedAgent || 'Admin Team'
  };

  deals.unshift(newDeal);
  res.status(201).json({ success: true, data: newDeal });
};

// Update deal stage
export const updateDealStage = (req, res) => {
  const { stage } = req.body;
  const deal = deals.find(d => d.id === req.params.id);
  if (!deal) {
    return res.status(404).json({ success: false, message: 'Deal not found' });
  }

  deal.stage = stage;
  deal.daysInStage = 0;
  res.status(200).json({ success: true, data: deal });
};

// Delete deal
export const deleteDeal = (req, res) => {
  const index = deals.findIndex(d => d.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Deal not found' });
  }
  const removed = deals.splice(index, 1);
  res.status(200).json({ success: true, data: removed[0] });
};

// Leads & Inquiries
export const getLeads = (req, res) => {
  res.status(200).json({ success: true, count: leads.length, data: leads });
};

export const createLead = (req, res) => {
  const { name, phone, propertyId, propertyTitle, location, slot, needCab } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ success: false, message: 'Name and phone are required' });
  }

  const newLead = {
    id: `lead-${Date.now()}`,
    name,
    phone,
    propertyId: propertyId || '1',
    propertyTitle: propertyTitle || 'Verified Tricity Property',
    location: location || 'Tricity',
    slot: slot || 'Tomorrow, Morning',
    needCab: !!needCab,
    status: 'New',
    createdAt: new Date().toISOString()
  };

  leads.unshift(newLead);
  res.status(201).json({ success: true, data: newLead });
};

export const updateLeadStatus = (req, res) => {
  const { status } = req.body;
  const lead = leads.find(l => l.id === req.params.id);
  if (!lead) {
    return res.status(404).json({ success: false, message: 'Lead not found' });
  }

  lead.status = status || 'Contacted';
  res.status(200).json({ success: true, data: lead });
};

// Reviews & Messages
export const getReviews = (req, res) => {
  res.status(200).json({ success: true, count: reviews.length, data: reviews });
};

export const getMessages = (req, res) => {
  res.status(200).json({ success: true, count: messages.length, data: messages });
};


// Promotional Hero Banners (Featured on Home page)
let banners = [
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

export const getBanners = (req, res) => {
  res.status(200).json({ success: true, count: banners.length, data: banners });
};

export const createBanner = (req, res) => {
  const newBanner = {
    id: 'banner-' + Date.now(),
    ...req.body,
    isActive: req.body.isActive !== undefined ? req.body.isActive : true
  };
  banners.unshift(newBanner);
  res.status(201).json({ success: true, data: newBanner });
};

export const updateBanner = (req, res) => {
  const index = banners.findIndex(b => b.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Banner not found' });
  }
  banners[index] = { ...banners[index], ...req.body };
  res.status(200).json({ success: true, data: banners[index] });
};

export const deleteBanner = (req, res) => {
  const index = banners.findIndex(b => b.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Banner not found' });
  }
  const removed = banners.splice(index, 1);
  res.status(200).json({ success: true, data: removed[0] });
};
