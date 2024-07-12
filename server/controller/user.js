import User from "../model/User.js"
import fs from 'fs'

const getUserInfo = async (req,res,next) => {
    if (!req.user || !req.user.id) {
        return res.status(400).json({ error: 'User not authenticated or ID missing' })
    }
    try{
        const data = await User.findById(req.user.id).select('name email address phone bio role verification')

        if (!data) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        return res.status(200).json(data)
    } catch(err) {
        return next(err)
    }
}

const getAllUsers = async (req,res,next) => {
    try {
        // Exclude admin info
        const allUsers = await User.find({ role: { $ne: 'admin' } }).select('-profilePic')
        return res.status(200).json(allUsers)
    } catch (err) {
        return next(err)
    }
}

const getUserPhoto = async (req,res,next) => {
    try {
        const userPhoto = await User.findById(req.params.userId).select('profilePic')
        if (userPhoto.profilePic.data) {
            res.set('Content-type', userPhoto.profilePic.contentType)
            return res.status(200).send(userPhoto.profilePic.data)
        }
    } catch (err) {
        return next(err)
    }
}

const updateUser = async (req, res, next) => {
    try{
        const { name, email, address, phone, bio } = req.body
        const updateData = await User.findByIdAndUpdate(req.user.id, { name, email, address, phone, bio },{
            new: true
        }).select('name email address phone bio')
        return res.status(200).json(updateData)
    } catch(err) {
        return next(err)
    }
}

const updateUserPhoto = async (req,res,next) => {
    try {
        const { profilePhoto } = req.files
        const user = await User.findById(req.user.id)

        if (profilePhoto) {
            user.profilePic.data = fs.readFileSync(profilePhoto.path)
            user.profilePic.contentType = profilePhoto.type
            await user.save()
            return res.status(200).json({ message: 'File updated successfully' })
        } else {
            return res.status(404).json({ message: 'Failed to update pic' })
        }
    } catch (err) {
        return next(err)
    }
}

const addTodoTask = async (req,res,next) => {
    try {
        const { task } = req.body
        const user = await User.findById(req.user.id).select('taskList')

        if (!user) {
            return res.status(404).send({ message: "User not found!" })
        }

        if (!task) {
            return res.status(404).send({ message: "Task not entered!" })
        }

        const newTask = {
            task: task, 
            completed: false 
        }

        user.taskList.push(newTask)

        const addedUser = await user.save()

        if (addedUser) {
            return res.status(201).json(addedUser)
        } else {
            return res.status(400).send({ message: "Error Adding Task!" });
        }

    } catch (err) {
        return next(err)
    }
}

const editTodoTask = async (req,res,next) => {
    try {
        const { newTask } = req.body
        const { userId, taskId } = req.params

        const updatedUser = await User.findOneAndUpdate(
            { 
                _id: userId, 
                "taskList._id": taskId
            },
            { $set: { "taskList.$.task": newTask } },
            { new: true }
        )

        if (updatedUser) {
            return res.status(201).json(updatedUser)
        } else {
            return res.status(400).send({ message: "Error Editing Task!" });
        }
    } catch (err) {
        console.error("Error editing task:", err)
        return next(err)
    }
}

const editTodoCheck = async (req,res,next) => {
    try {
        const { completed } = req.body
        const { userId, taskId } = req.params

        const updatedUser = await User.findOneAndUpdate(
            { 
                _id: userId, 
                "taskList._id": taskId
            },
            { $set: { "taskList.$.completed": completed } },
            { new: true }
        )

        if (updatedUser) {
            return res.status(201).json(updatedUser.taskList)
        } else {
            return res.status(400).send({ message: "Error Checking Task!" });
        }
    } catch (err) {
        console.error("Error editing task:", err)
        return next(err)
    }
}

const removeTodoTask = async (req, res, next) => {
    try {
      const { userId, taskId } = req.params;
  
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $pull: { taskList: { _id: taskId } } },
        { new: true }
      );
  
      if (updatedUser) {
        return res.status(200).json(updatedUser);
      } else {
        return res.status(404).send({ message: "User or Task not found!" });
      }
    } catch (err) {
      console.error("Error removing task:", err);
      return next(err);
    }
  };
  

const getAllTasks = async (req,res,next) => {
    try {
        const user = await User.findById(req.user.id).select('taskList')

        if (!user) {
            return res.status(404).send({ message: "User not found!" })
        }

        return res.status(201).json(user.taskList)
    } catch (err) {
        return next(err)
    }
}

export { getUserInfo, getAllUsers, removeTodoTask, getAllTasks, editTodoTask, editTodoCheck, updateUser, getUserPhoto, updateUserPhoto, addTodoTask }