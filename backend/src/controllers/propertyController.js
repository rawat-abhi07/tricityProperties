// Verified listings for Tricity Housing Marketplace
let properties = [
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
    sellerPhone: '+91 99880 12345',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
    description: 'Double-height commercial showroom with 25 ft frontage on PR7 200-ft Airport Ring Road. High footfall zone with national retail brands.'
  }
];

// @desc    Get all properties (Sale only)
// @route   GET /api/properties
export const getProperties = (req, res) => {
  const { type, location, city, minPrice, maxPrice, bhk } = req.query;
  let filtered = [...properties];

  if (type && type !== 'All') {
    filtered = filtered.filter(p => p.type.toLowerCase() === type.toLowerCase());
  }

  if (city && city !== 'All') {
    filtered = filtered.filter(p => p.city.toLowerCase() === city.toLowerCase());
  }

  if (location) {
    const loc = location.toLowerCase();
    filtered = filtered.filter(p => 
      p.location.toLowerCase().includes(loc) ||
      p.locality.toLowerCase().includes(loc) ||
      p.city.toLowerCase().includes(loc) ||
      p.title.toLowerCase().includes(loc)
    );
  }

  if (bhk && bhk !== 'All') {
    filtered = filtered.filter(p => p.bhk.toLowerCase().includes(bhk.toLowerCase()));
  }

  if (minPrice) {
    filtered = filtered.filter(p => p.price >= Number(minPrice));
  }

  if (maxPrice) {
    filtered = filtered.filter(p => p.price <= Number(maxPrice));
  }

  res.status(200).json({
    success: true,
    count: filtered.length,
    data: filtered,
  });
};

// @desc    Get single property by ID
// @route   GET /api/properties/:id
export const getPropertyById = (req, res) => {
  const property = properties.find(p => p.id === req.params.id);

  if (!property) {
    return res.status(404).json({
      success: false,
      message: 'Property not found',
    });
  }

  res.status(200).json({
    success: true,
    data: property,
  });
};

// @desc    Create new property (User/Seller listing)
// @route   POST /api/properties
export const createProperty = (req, res) => {
  const { title, price, location, city, bedrooms, bathrooms, area, type, image, images, description, bhk, listingSource, possessionStatus } = req.body;

  if (!title || !price || !location) {
    return res.status(400).json({
      success: false,
      message: 'Please provide title, price, and location',
    });
  }

  const numPrice = Number(price);
  const formatted = numPrice >= 10000000 
    ? `₹ ${(numPrice / 10000000).toFixed(2)} Cr`
    : `₹ ${(numPrice / 100000).toFixed(1)} Lakhs`;

  const finalImg = image || (images && images[0]) || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80';
  const finalImages = images && images.length > 0 ? images : [finalImg];

  const newProperty = {
    id: String(Date.now()),
    title,
    price: numPrice,
    formattedPrice: formatted,
    pricePerSqFt: 'Market Rate',
    location,
    city: city || 'Mohali',
    locality: location.split(',')[0] || location,
    bedrooms: Number(bedrooms) || 2,
    bathrooms: Number(bathrooms) || 2,
    bhk: bhk || `${bedrooms || 2} BHK`,
    area: area || '1,500 sq.ft.',
    carpetArea: '1,150 sq.ft.',
    type: type || 'Apartment',
    possessionStatus: possessionStatus || 'Ready to Move',
    listingSource: listingSource || 'Direct Owner',
    reraNumber: 'Verified Listing',
    isVerified: true,
    sellerPhone: '+91 98888 XXXXX',
    image: finalImg,
    images: finalImages,
    description: description || 'Verified residential property in prime Tricity location.'
  };

  properties.unshift(newProperty);

  res.status(201).json({
    success: true,
    data: newProperty,
  });
};
