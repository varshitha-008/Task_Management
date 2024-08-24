import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

class AuthService {
  // Register a new user
  async register(email, username, password) {
    // Validate the input fields
    if (!email || !username || !password) {
      throw new Error('All fields (email, username, password) are required.');
    }

    // Ensure email doesn't exist already
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('Email is already registered.');
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the user with hashed password
    const user = new User({ email, username, password: hashedPassword });
    await user.save();

    return user;
  }

  // Login the user and return a JWT token
  async login(email, password) {
    // Validate the input fields
    if (!email || !password) {
      throw new Error('Both email and password are required.');
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials.');
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials.');
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return token;
  }
}

export default new AuthService();
