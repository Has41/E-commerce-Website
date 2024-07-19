import express from 'express'
import { addTodoTask, editTodoCheck, editTodoTask, getAllTasks, getAllUsers, getUserInfo, getUserPhoto , removeTodoTask, updateUser, updateUserPhoto } from '../controller/user.js'
import { isAdmin } from '../utils/checkAuth.js'
import formidable from 'express-formidable'

const router = express.Router()

router.get(`/me`, getUserInfo)
router.get('/me/allUsers' ,isAdmin, getAllUsers)
router.get('/me/photo/:userId', getUserPhoto)
router.put(`/me`, updateUser)
router.put(`/me/profilePic`, formidable(), updateUserPhoto)
router.post('/me/add-task' ,isAdmin, addTodoTask)
router.put('/me/edit-task/:userId/:taskId', isAdmin, editTodoTask)
router.put('/me/edit-check/:userId/:taskId' ,isAdmin, editTodoCheck)
router.delete('/me/delete-task/:userId/:taskId' ,isAdmin, removeTodoTask)
router.get('/me/get-task' ,isAdmin, getAllTasks)

export default router