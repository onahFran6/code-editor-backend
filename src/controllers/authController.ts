import { Request, Response, NextFunction } from 'express';
import {
  registerUser,
  loginUser,
  uploadImagesAndReturnUrls,
} from '../services/userService';
import { sendCustomResponse } from '../utils/customResponse';
import cloudinary from '../config/cloudinaryConfig';
import User from '../models/userModel';
import { UploadedFilesType } from '../types/index.type';
import { UploadedFile } from 'express-fileupload';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const result = await registerUser({
      firstName,
      lastName,
      email,
      password,
    });
    sendCustomResponse({
      res,
      statusCode: 201,
      message: 'User registered successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser({ email, password });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

// export const uploadProfileImageold = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const userId = req.user?.id; // Assuming you have authenticated the user and have their ID
//     // const file = req.files?.profileImage as UploadedFile;
//     // // Upload the image to Cloudinary
//     // const result = await cloudinary.uploader.upload(file.tempFilePath);
//     // const imageUrl = result.secure_url;

//     const rawFiles = req.files as UploadedFilesType;

//     if (!rawFiles) {
//       return res.status(400).json({ message: 'No profile image provided' });
//     }

//     console.log('good2');
//     const imageUrl = await uploadImagesAndReturnUrls({ rawFiles });

//     // Update the user's profile image URL in the database
//     const updatedUser = await User.update(
//       { profilePicture: imageUrl },
//       { where: { id: userId }, returning: true },
//     );

//     if (updatedUser[0] === 0) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Retrieve the full details of the updated user
//     const user = await User.findByPk(userId, {
//       attributes: { exclude: ['password'] }, // Exclude sensitive information like the password
//     });

//     return res
//       .status(200)
//       .json({ message: 'Profile image uploaded successfully', user });
//   } catch (error) {
//     console.error('Error uploading profile image:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };

export const uploadProfileImage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id; // Assuming you have authenticated the user and have their ID
    const file = req.files?.profileImage as UploadedFile;

    if (!file) {
      return res.status(400).json({ message: 'No profile image provided' });
    }

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(file.tempFilePath);
    const imageUrl = result.secure_url;

    // Update the user's profile image URL in the database
    const updatedUser = await User.update(
      { profilePicture: imageUrl },
      { where: { id: userId }, returning: true },
    );

    if (updatedUser[0] === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Retrieve the full details of the updated user
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }, // Exclude sensitive information like the password
    });

    return res
      .status(200)
      .json({ message: 'Profile image uploaded successfully', user });
  } catch (error) {
    console.error('Error uploading profile image:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
