import User from '../models/userModel.js';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export const createUser = async (req, res) => {
  try {
    const { files, body } = req;
    const newUser = new User({
      ...body,
      marksheet: files.marksheet?.[0]?.filename,
      image: files.image?.[0]?.filename,
      checkBook: files.checkBook?.[0]?.filename,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const uploadFiles = upload.fields([
  { name: 'marksheet', maxCount: 1 },
  { name: 'image', maxCount: 1 },
  { name: 'checkBook', maxCount: 1 },
]);



export const getUsers = async (req, res) => {
    try {
      const users = await User.find({}, 'name phone availability qualification category city'); // Select only the needed fields
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  

 
export const getUsersByPinCode = async (req, res) => {
    const { pinCode } = req.query;
    try {
      if (pinCode.length !== 6) {
        return res.status(400).json({ error: 'Invalid pin code' });
      }
      const users = await User.find({ pinCode });
      if (users.length === 0) {
        return res.status(404).json({ message: 'Sorry, we are not in this city' });
      }
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users by pin code:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  