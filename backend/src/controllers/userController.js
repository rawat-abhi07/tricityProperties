// Mock controller for user / authentication
export const registerUser = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide all fields' });
  }

  res.status(201).json({
    success: true,
    data: {
      id: 'user_123',
      name,
      email,
      token: 'sample_jwt_token'
    }
  });
};

export const loginUser = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide email and password' });
  }

  res.status(200).json({
    success: true,
    data: {
      id: 'user_123',
      name: 'Demo Agent',
      email,
      token: 'sample_jwt_token'
    }
  });
};
