import authService from '../services/authService.js';


export const register = async (req, res) => {
    try {
      const { email, username, password } = req.body;  
      const newUser = await authService.register(email, username, password);
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  export const login = async (req, res) => {
    try {
      const { email, password } = req.body;  
      const token = await authService.login(email, password);
      res.status(200).json({ token });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  export const refreshToken = async (req, res) => {
    try {
      const { refreshToken } = req.body;
      const newAccessToken = await authService.refreshToken(refreshToken);
      res.status(200).json({ accessToken: newAccessToken });
    } catch (err) {
      res.status(403).json({ error: 'Invalid refresh token' });
    }
  };
  
  export const getProfile = (req, res) => {
    res.json(req.user);
  };
  
  export const logout = async (req, res) => {
    try {
      const { refreshToken } = req.body;
      await authService.logout(refreshToken);
      res.status(200).json({ message: 'Successfully logged out' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };