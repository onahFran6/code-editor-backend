"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProfileImage = exports.login = exports.register = void 0;
const userService_1 = require("../services/userService");
const customResponse_1 = require("../utils/customResponse");
const userModel_1 = __importDefault(require("../models/userModel"));
// import { UploadedFile } from 'express-fileupload';
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password } = req.body;
        const result = yield (0, userService_1.registerUser)({
            firstName,
            lastName,
            email,
            password,
        });
        (0, customResponse_1.sendCustomResponse)({
            res,
            statusCode: 201,
            message: 'User registered successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const result = yield (0, userService_1.loginUser)({ email, password });
        res.json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const uploadProfileImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // Assuming you have authenticated the user and have their ID
        const rawFiles = req.files;
        if (!rawFiles) {
            return res.status(400).json({ message: 'No profile image provided' });
        }
        console.log('good2', { rawFiles });
        const imageUrl = yield (0, userService_1.uploadImagesAndReturnUrls)({ rawFiles });
        // Update the user's profile image URL in the database
        const updatedUser = yield userModel_1.default.update({ profilePicture: imageUrl }, { where: { id: userId }, returning: true });
        if (updatedUser[0] === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Retrieve the full details of the updated user
        const user = yield userModel_1.default.findByPk(userId, {
            attributes: { exclude: ['password'] }, // Exclude sensitive information like the password
        });
        return res
            .status(200)
            .json({ message: 'Profile image uploaded successfully', user });
    }
    catch (error) {
        console.error('Error uploading profile image:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.uploadProfileImage = uploadProfileImage;
// export const uploadProfileImage = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const userId = req.user?.id; // Assuming you have authenticated the user and have their ID
//     const file = req.files?.profileImage as UploadedFile;
//     console.log('good2', { file });
//     if (!file) {
//       return res.status(400).json({ message: 'No profile image provided' });
//     }
//     // Upload the image to Cloudinary
//     const result = await cloudinary.uploader.upload(file.tempFilePath);
//     const imageUrl = result.secure_url;
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
//# sourceMappingURL=authController.js.map