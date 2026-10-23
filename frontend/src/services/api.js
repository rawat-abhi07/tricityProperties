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
    sellerPhone: '+91 99155 77665',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
    description: 'GMADA approved north-east facing plot overlooking wide 60 ft road. Clear registry title, immediate registry and construction ready.'
  }
];

export const fetchProperties = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.type && filters.type !== 'All') params.append('type', filters.type);
    if (filters.city && filters.city !== 'All') params.append('city', filters.city);
    if (filters.location) params.append('location', filters.location);
    if (filters.bhk && filters.bhk !== 'All') params.append('bhk', filters.bhk);

    const query = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`${API_BASE_URL}/properties${query}`);
    if (!res.ok) throw new Error('Failed to fetch from server');
    return await res.json();
  } catch (err) {
    console.warn('API fetch failed, falling back to local mock data:', err.message);
    let filtered = [...fallbackProperties];
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
        p.locality.toLowerCase().includes(loc) ||
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
  try {
    const res = await fetch(`${API_BASE_URL}/properties`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(propertyData),
    });
    if (!res.ok) throw new Error('Failed to create property');
    return await res.json();
  } catch (err) {
    const numPrice = Number(propertyData.price);
    const formatted = numPrice >= 10000000 
      ? `₹ ${(numPrice / 10000000).toFixed(2)} Cr`
      : `₹ ${(numPrice / 100000).toFixed(1)} Lakhs`;

    const newProp = {
      id: String(Date.now()),
      ...propertyData,
      formattedPrice: formatted,
      pricePerSqFt: 'Market Rate',
      reraNumber: 'Verified Listing',
      isVerified: true,
      sellerPhone: '+91 98888 XXXXX',
      image: propertyData.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      images: propertyData.images && propertyData.images.length > 0 ? propertyData.images : [propertyData.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80'],
    };
    fallbackProperties.unshift(newProp);
    return { success: true, data: newProp };
  }
};
