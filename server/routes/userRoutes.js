import express from 'express'
import { applyForJob, getUserData, getUserJobApplications, updateUserResume, registerUser, loginUser, googleAuthUser } from '../controllers/userController.js'
import upload from '../config/multer.js'
import { protectUser } from '../middleware/authMiddleware.js'

const router = express.Router()

// Authentication routes
router.post('/register', upload.single('image'), registerUser)
router.post('/login', loginUser)
router.post('/google-auth', googleAuthUser)

// Protected user data and actions
router.get('/user', protectUser, getUserData)
router.post('/apply', protectUser, applyForJob)
router.get('/applications', protectUser, getUserJobApplications)
router.post('/update-resume', protectUser, upload.single('resume'), updateUserResume)

export default router;