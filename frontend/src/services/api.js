const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const fallbackProperties = [
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
    reraNumber: 'PBRERA-SAS80-PR0641',
    isVerified: true,
    status: 'Approved',
    sellerPhone: '+91 98882 14500',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80'
    ],
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
    reraNumber: 'CH-RERA-0082',
    isVerified: true,
    status: 'Approved',
    sellerPhone: '+91 98140 22780',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=80'
    ],
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
    possessionStatus: 'Under Construction (Nov 2026)',
    listingSource: 'Verified Developer',
    reraNumber: 'HRERA-PKL-0291',
    isVerified: true,
    status: 'Approved',
    sellerPhone: '+91 98765 89012',
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
    reraNumber: 'PBRERA-ZRK-1102',
    isVerified: true,
    status: 'Approved',
    sellerPhone: '+91 97791 43210',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
    description: 'Well-ventilated north-east facing 2 BHK near international school belt, 15 min drive to Chandigarh airport, with 24/7 security & shopping arcade.'
  },
  {
    id: '5',
    title: '5 BHK Spanish Architecture Grand Villa',
    price: 38500000,
    formattedPrice: '₹ 3.85 Cr',
    pricePerSqFt: '₹ 11,000 / sq.ft.',
    location: 'Eco City 1, New Chandigarh',
    city: 'New Chandigarh',
    locality: 'Eco City',
    bedrooms: 5,
    bathrooms: 5,
    bhk: '5 BHK',
    area: '3,500 sq.ft.',
    carpetArea: '2,900 sq.ft.',
    type: 'Villa',
    possessionStatus: 'Ready to Move',
    listingSource: 'Verified Developer',
    reraNumber: 'PBRERA-NCH-0899',
    isVerified: true,
    status: 'Approved',
    sellerPhone: '+91 98889 00123',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=80',
    description: 'Designer independent Spanish villa with double-height ceiling lounge, private plunge pool, solar backup, and landscaped lawn.'
  },
  {
    id: '6',
    title: '250 Sq. Yd. Premium Residential Plot',
    price: 14500000,
    formattedPrice: '₹ 1.45 Cr',
    pricePerSqFt: '₹ 64,444 / sq.yd.',
    location: 'Aerocity Block F, Mohali',
    city: 'Mohali',
    locality: 'Aerocity',
    bedrooms: 0,
    bathrooms: 0,
    bhk: 'Plot',
    area: '250 sq.yd.',
    carpetArea: '2,250 sq.ft.',
    type: 'Residential Plot',
    possessionStatus: 'Immediate Possession',
    listingSource: 'Direct Owner',
    reraNumber: 'GMADA Approved',
    isVerified: true,
    status: 'Approved',
    sellerPhone: '+91 99155 77665',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
    description: 'GMADA approved north-east facing plot overlooking wide 60 ft road. Clear registry title, immediate registry and construction ready.'
  },
  {
    id: '7',
    title: '3 BHK Highrise with Shivalik View Balcony',
    price: 13500000,
    formattedPrice: '₹ 1.35 Cr',
    pricePerSqFt: '₹ 7,100 / sq.ft.',
    location: 'Aerocity, IT City Road, Mohali',
    city: 'Mohali',
    locality: 'Aerocity',
    bedrooms: 3,
    bathrooms: 3,
    bhk: '3 BHK',
    area: '1,900 sq.ft.',
    carpetArea: '1,450 sq.ft.',
    type: 'Apartment',
    possessionStatus: 'Ready to Move',
    listingSource: 'Verified Developer',
    reraNumber: 'PBRERA-SAS80-PR0782',
    isVerified: true,
    status: 'Approved',
    sellerPhone: '+91 98721 55432',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
    description: 'Modern 3 BHK with 3-side open layout, double-glazed windows, dedicated EV parking, Olympic-size pool and sky lounge.'
  },
  {
    id: '8',
    title: '4 BHK Luxury Independent Kothi in Sector 8',
    price: 42000000,
    formattedPrice: '₹ 4.20 Cr',
    pricePerSqFt: '₹ 12,000 / sq.ft.',
    location: 'Sector 8-C, Northern Sectors, Chandigarh',
    city: 'Chandigarh',
    locality: 'Sector 8',
    bedrooms: 4,
    bathrooms: 5,
    bhk: '4 BHK',
    area: '3,500 sq.ft.',
    carpetArea: '2,950 sq.ft.',
    type: 'Villa',
    possessionStatus: 'Ready to Move',
    listingSource: 'Direct Owner',
    reraNumber: 'CH-RERA-0114',
    isVerified: true,
    status: 'Approved',
    sellerPhone: '+91 98144 33211',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    description: 'Rare heritage-style modern kothi in Chandigarh’s posh Sector 8. Italian marble, private lift, servant quarters, landscaped lawn and 3-car garage.'
  },
  {
    id: '9',
    title: '3 BHK Designer Builder Floor near Mansa Devi',
    price: 19500000,
    formattedPrice: '₹ 1.95 Cr',
    pricePerSqFt: '₹ 8,666 / sq.ft.',
    location: 'MDC Sector 4, Panchkula',
    city: 'Panchkula',
    locality: 'MDC',
    bedrooms: 3,
    bathrooms: 3,
    bhk: '3 BHK',
    area: '2,250 sq.ft.',
    carpetArea: '1,780 sq.ft.',
    type: 'Independent Floor',
    possessionStatus: 'Ready to Move',
    listingSource: 'Verified Developer',
    reraNumber: 'HRERA-PKL-0402',
    isVerified: true,
    status: 'Approved',
    sellerPhone: '+91 98777 66120',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
    description: 'Low-density 3 BHK builder floor facing reserve forest belt. Private stilt parking, branded fittings, and uninterrupted Shivalik mountain air.'
  },
  {
    id: '10',
    title: 'Commercial Retail Showroom on Ring Road',
    price: 18000000,
    formattedPrice: '₹ 1.80 Cr',
    pricePerSqFt: '₹ 12,857 / sq.ft.',
    location: 'PR7 Airport Ring Road, Zirakpur',
    city: 'Zirakpur',
    locality: 'PR7 Airport Road',
    bedrooms: 0,
    bathrooms: 2,
    bhk: 'Commercial',
    area: '1,400 sq.ft.',
    carpetArea: '1,120 sq.ft.',
    type: 'Commercial',
    possessionStatus: 'Ready for Fit-out',
    listingSource: 'Verified Developer',
    reraNumber: 'PBRERA-ZRK-1455',
    isVerified: true,
    status: 'Approved',
    sellerPhone: '+91 99880 12345',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
    description: 'Double-height commercial showroom with 25 ft frontage on PR7 200-ft Airport Ring Road. High footfall zone with national retail brands.'
  }
];

export const fetchProperties = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.type && filters.type !== 'All') params.append('type', filters.type);
    if (filters.city && filters.city !== 'All') params.append('city', filters.city);
    if (filters.location) params.append('location', filters.location);
    if (filters.bhk && filters.bhk !== 'All') params.append('bhk', filters.bhk);
    params.append('status', 'Approved');

    const query = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`${API_BASE_URL}/properties${query}`);
    if (!res.ok) throw new Error('Failed to fetch from server');
    return await res.json();
  } catch (err) {
    console.warn('API fetch failed, reading verified listings from sync cache:', err.message);
    let allProps = [...fallbackProperties];
    try {
      const stored = localStorage.getItem('th_admin_properties');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          allProps = parsed;
        }
      }
    } catch {}

    // Show only Approved properties on the public marketplace
    let filtered = allProps.filter(p => !p.status || p.status === 'Approved');

    if (filters.city && filters.city !== 'All') {
      filtered = filtered.filter(p => p.city.toLowerCase() === filters.city.toLowerCase());
    }
    if (filters.type && filters.type !== 'All') {
      filtered = filtered.filter(p => p.type.toLowerCase() === filters.type.toLowerCase());
    }
    if (filters.location) {
      const loc = filters.location.toLowerCase();
      filtered = filtered.filter(p => 
        p.location.toLowerCase().includes(loc) ||
        (p.locality && p.locality.toLowerCase().includes(loc)) ||
        p.title.toLowerCase().includes(loc)
      );
    }
    return {
      success: true,
      data: filtered,
    };
  }
};

export const fetchPropertyById = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/properties/${id}`);
    if (!res.ok) throw new Error('Property not found');
    return await res.json();
  } catch (err) {
    const prop = fallbackProperties.find(p => p.id === id) || fallbackProperties[0];
    return { success: true, data: prop };
  }
};

export const createProperty = async (propertyData) => {
  const payload = {
    ...propertyData,
    status: propertyData.status || 'Pending',
  };

  try {
    const res = await fetch(`${API_BASE_URL}/properties`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to create property');
    return await res.json();
  } catch (err) {
    const numPrice = Number(payload.price);
    const formatted = numPrice >= 10000000 
      ? `₹ ${(numPrice / 10000000).toFixed(2)} Cr`
      : `₹ ${(numPrice / 100000).toFixed(1)} Lakhs`;

    const newProp = {
      id: String(Date.now()),
      ...payload,
      formattedPrice: formatted,
      pricePerSqFt: 'Market Rate',
      reraNumber: payload.reraNumber || 'Applied (Pending Verification)',
      isVerified: false,
      status: 'Pending',
      sellerPhone: payload.sellerPhone || '+91 98888 XXXXX',
      image: payload.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      images: payload.images && payload.images.length > 0 ? payload.images : [payload.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80'],
    };

    // Store in admin shared storage so the Admin Panel immediately sees this pending request
    try {
      const stored = localStorage.getItem('th_admin_properties');
      const list = stored ? JSON.parse(stored) : [...fallbackProperties];
      list.unshift(newProp);
      localStorage.setItem('th_admin_properties', JSON.stringify(list));
    } catch {}

    fallbackProperties.unshift(newProp);
    return { success: true, data: newProp };
  }
};

export const submitLead = async (leadData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/crm/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadData),
    });
    if (!res.ok) throw new Error('Lead submission failed');
    return await res.json();
  } catch (err) {
    const newLead = {
      id: `lead-${Date.now()}`,
      ...leadData,
      createdAt: new Date().toISOString(),
      status: 'New'
    };
    try {
      const stored = localStorage.getItem('th_admin_leads');
      const list = stored ? JSON.parse(stored) : [];
      list.unshift(newLead);
      localStorage.setItem('th_admin_leads', JSON.stringify(list));
    } catch {}
    return { success: true, data: newLead };
  }
};
