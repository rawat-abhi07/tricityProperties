// Mock in-memory property data for initial setup
let properties = [
  {
    id: '1',
    title: 'Modern Luxury Villa',
    price: 850000,
    location: 'Beverly Hills, CA',
    bedrooms: 4,
    bathrooms: 3,
    area: '3,200 sqft',
    type: 'Villa',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    description: 'Beautiful modern villa with private pool, panoramic views, and smart home automation.'
  },
  {
    id: '2',
    title: 'Downtown Skyline Apartment',
    price: 450000,
    location: 'Downtown, NY',
    bedrooms: 2,
    bathrooms: 2,
    area: '1,150 sqft',
    type: 'Apartment',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    description: 'Chic downtown apartment featuring floor-to-ceiling windows and high-end finishes.'
  },
  {
    id: '3',
    title: 'Cozy Suburb Family Home',
    price: 320000,
    location: 'Austin, TX',
    bedrooms: 3,
    bathrooms: 2,
    area: '2,100 sqft',
    type: 'House',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80',
    description: 'Spacious suburban house with large backyard, open kitchen, and close to top schools.'
  }
];

// @desc    Get all properties
// @route   GET /api/properties
export const getProperties = (req, res) => {
  const { type, location } = req.query;
  let filtered = [...properties];

  if (type) {
    filtered = filtered.filter(p => p.type.toLowerCase() === type.toLowerCase());
  }

  if (location) {
    filtered = filtered.filter(p => p.location.toLowerCase().includes(location.toLowerCase()));
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

// @desc    Create new property
// @route   POST /api/properties
export const createProperty = (req, res) => {
  const { title, price, location, bedrooms, bathrooms, area, type, image, description } = req.body;

  if (!title || !price || !location) {
    return res.status(400).json({
      success: false,
      message: 'Please provide title, price, and location',
    });
  }

  const newProperty = {
    id: String(Date.now()),
    title,
    price: Number(price),
    location,
    bedrooms: Number(bedrooms) || 1,
    bathrooms: Number(bathrooms) || 1,
    area: area || 'N/A',
    type: type || 'House',
    image: image || 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80',
    description: description || ''
  };

  properties.unshift(newProperty);

  res.status(201).json({
    success: true,
    data: newProperty,
  });
};
