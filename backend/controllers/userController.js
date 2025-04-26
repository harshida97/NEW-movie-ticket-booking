import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new user
        const user = new User({ name, email, password: hashedPassword, role });
        await user.save();

        

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {

    const { role } = req.query; // Role passed in query
    console.log(role,"role")
    const { email, password } = req.body;

    try {
        // Check if the role is provided in the query string
        if (!role) {
            return res.status(400).json({ message: 'Role is required' });
        }

    
        const userExist = await User.findOne({ email,role });

        // If no user found or the role doesn't match the user's role, return error
        if (!userExist) {
            return res.status(400).json({ message: 'user not found' });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, userExist.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token with the user's ID and role (from the database)
        const token = jwt.sign({ id: userExist._id, role: userExist.role }, process.env.SECRET_KEY, { expiresIn: '1h' });

        res.json({
            token,
            user: {
                id: userExist._id,
                role: userExist.role,
                email: userExist.email,
                name: userExist.name,
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fetch all users with role 'user'

export const getUsers = async (req, res) => {
    try {
        // Check if the user making the request is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        // Fetch all users with the role 'user'
        const users = await User.find({ role: 'user' });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

