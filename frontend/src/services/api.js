const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const fetchProperties = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.type && filters.type !== 'All') params.append('type', filters.type);
    if (filters.location) params.append('location', filters.location);

    const query = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`${API_BASE_URL}/properties${query}`);
    if (!res.ok) throw new Error('Failed to fetch properties from server');
    return await res.json();
  } catch (err) {
    console.warn('API fetch failed, falling back to local mock data:', err.message);
    // Fallback if backend is not yet started
    return {
      success: true,
      data: [
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
      ]
    };
  }
};

export const fetchPropertyById = async (id) => {
  const res = await fetch(`${API_BASE_URL}/properties/${id}`);
  if (!res.ok) throw new Error('Property not found');
  return await res.json();
};

export const createProperty = async (propertyData) => {
  const res = await fetch(`${API_BASE_URL}/properties`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(propertyData),
  });
  if (!res.ok) throw new Error('Failed to create property');
  return await res.json();
};
