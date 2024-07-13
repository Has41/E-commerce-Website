/* eslint-disable */
import React, { useState, useEffect } from 'react'
import Chart from "react-apexcharts"
import AdminSearch from './AdminSearch'
import moment from 'moment'

const Dashboard = () => {
  const [adminData, setAdminData] = useState(null)
  const [usersData, setUsersData] = useState([])
  const [isUserExpanded, setIsUserExpanded] = useState(false)
  const [isEmailExpanded, setIsEmailExpanded] = useState(false)
  const [isAddressExpanded, setIsAddressExpanded] = useState(false)
  const [isTaskExpanded, setIsTaskExpanded] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const [task, setTask] = useState('')
  const [allTasks, setAllTasks] = useState([])
  const [editable, setEditable] = useState(null)

  const expandUser = isUserExpanded ? 'break-words' : 'overflow-hidden overflow-ellipsis'
  const expandEmail = isEmailExpanded ? 'break-words' : 'overflow-hidden overflow-ellipsis'
  const expandAddress = isAddressExpanded ? 'break-words' : 'overflow-hidden overflow-ellipsis'
  const expandTask = isTaskExpanded ? 'break-words' : 'overflow-hidden overflow-ellipsis'
    
  const [chart, setChart] = useState({
        series: [44, 55, 41, 17],
          chartOptions: {
          labels: ['In Progress', 'Completed', 'Shipped', 'Cancelled']
        },
          options : {
            series: [44, 55, 13, 33],
            labels: ['In Progress', 'Completed', 'Shipped', 'Cancelled']
        }
    })

    const toggleUserExpansion = () => {
      setIsEmailExpanded((prevExpanded) => !prevExpanded)
    }

    const toggleEmailExpansion = () => {
      setIsEmailExpanded((prevExpanded) => !prevExpanded)
    }

    const toggleAddressExpansion = () => {
      setIsAddressExpanded((prevExpanded) => !prevExpanded)
    }

    const toggleTaskExpansion = () => {
      setIsTaskExpanded((prevExpanded) => !prevExpanded)
    }

    const handleEditClick = (id) => {
      setEditable(id)
    }

    const addTask = async () => {
      try {
        const res = await fetch('https://e-commerce-website-server-eta.vercel.app/api/users/me/add-task', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task: task })
        })

        if (res.ok) {
          getAllTask()
          setTask('')
          setShowInput(false)
        } else {
          console.error("Error Adding Tasks!")
        }

      } catch (err) {
        console.error(err)
      }
    }

    const editTask = async (userId, taskId ,updatedTask) => {
      try {
        const res = await fetch(`https://e-commerce-website-server-eta.vercel.app/api/users/me/edit-task/${userId}/${taskId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ newTask: updatedTask }),
        })
        if (res.ok) {
          getAllTask()
          setEditable(null)
        } else {
          console.error('Error updating Task!')
        }
      } catch (err) {
        console.error(err)
      }
  }

  const editCompleted = async (userId, taskId, taskCompleted) => {
    const newCompleted = !taskCompleted
    try {
      const res = await fetch(`https://e-commerce-website-server-eta.vercel.app/api/users/me/edit-check/${userId}/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: newCompleted }),
      })
      if (res.ok) {
        const updatedTasks = allTasks.map((task) => {
          if (task._id === taskId) {
            return { ...task, completed: newCompleted }
          }
          return task;
        })
        getAllTask(updatedTasks)
      } else {
        console.error('Error updating Task!')
      }
    } catch (err) {
      console.error(err)
    }
}

  const removeTask = async (userId, taskId) => {
    try {
        const res = await fetch(`https://e-commerce-website-server-eta.vercel.app/api/users/me/delete-task/${userId}/${taskId}`, {
            method: 'DELETE'
        })
        if (res.ok) {
            setAllTasks(allTasks.filter((item) => item._id !== taskId))
        } else {
            console.error('Error removing category!')
        }
    } catch (err) {
        console.error(err);
    }
}

    const getAllTask = async () => {
      try {
        const res = await fetch('https://e-commerce-website-server-eta.vercel.app/api/users/me/get-task')

        if (res.ok) {
          const data = await res.json()
          setAllTasks(data)
        } else {
          console.error("Error Getting Tasks!")
        }

      } catch (err) {
        console.error(err)
      }
    }

    const getAllUsers = async () => {
      try {
        const res = await fetch('https://e-commerce-website-server-eta.vercel.app/api/users/me/allUsers', {
          method: "GET",
          credentials: "include"
        })
  
        if (res.ok) {
          const data = await res.json()
          setUsersData(data)
        } else {
          console.error('Error getting user info')
        }
      } catch (err) {
        console.error(err)
      }
    }

    const getAdminInfo = async () => {
      try {
        const res = await fetch('https://e-commerce-website-server-eta.vercel.app/api/users/me', {
          method: "GET",
          credentials: "include"
        })
  
        if (res.ok) {
          const data = await res.json()
          setAdminData(data)
        } else {
          console.error('Error getting user info')
        }
      } catch (err) {
        console.error(err)
      }
    }
  
    useEffect(() => {
      getAllUsers()
      getAdminInfo()

    }, [])

    useEffect(() => {
      getAllTask()
    }, [])
          

  return (
    <>
    <main className='w-[80%] bg-slate-50 fixed right-0 bottom-0 h-full shadow-md overflow-y-auto font-poppins'>
          <AdminSearch />
        <div className='mt-20 px-6 py-4'>
          <h3 className='text-lg'>Welcome, {adminData?.name}</h3>
          <p className='text-black/70'>Here's what's happening with your store today.</p>
        </div>

        <div className='max-w-full grid grid-cols-3 items-center justify-center ml-14 mt-4'>

          <div>
            <div className='bg-white w-[270px] h-[180px] shadow-md flex flex-col items-center justify-center gap-y-6'>
              <div className='flex gap-x-8'>
                <p className='font-semibold uppercase'>Total Earning!</p>
                <div className='flex gap-x-1'>
                  <i className='bx bx-trending-up text-green-400'></i>
                  <p className='text-green-400'>+16.41%</p>
                </div>
              </div>
              <div className='mr-28'>
                <p className='text-xl font-semibold'>$516.20k</p>
              </div>
              <div className='flex items-center gap-x-14'>
                <p className='uppercase'>All Orders</p>
                <div className=''>
                  <i className='bx bxs-dollar-circle text-green-400 text-[50px]'></i>
                </div>
              </div>
            </div>
          </div>


          <div>
            <div className='bg-white w-[270px] h-[180px] shadow-md flex flex-col items-center justify-center gap-y-6'>
              <div className='flex gap-x-8'>
                <p className='font-semibold uppercase'>Orders!</p>
                <div className='flex gap-x-1'>
                  <i className='bx bx-trending-down text-amber-500'></i>
                  <p className='text-amber-500'>+20.53%</p>
                </div>
              </div>
              <div className='mr-28'>
                <p className='text-xl font-semibold'>36,789</p>
              </div>
              <div className='flex items-center gap-x-14'>
                <p className='uppercase'>All Orders</p>
                <div className=''>
                  <i className='bx bxs-shopping-bag text-amber-500 text-[50px]'></i>
                </div>
              </div>
            </div>
          </div>



          <div>
            <div className='bg-white w-[270px] h-[180px] shadow-md flex flex-col items-center justify-center gap-y-6'>
              <div className='flex gap-x-8'>
                <p className='font-semibold uppercase'>Customers</p>
                <div className='flex gap-x-1'>
                  <i className='bx bx-trending-up text-gray-400'></i>
                  <p className='text-gray-400'>+16.41%</p>
                </div>
              </div>
              <div className='mr-28'>
                <p className='text-xl font-semibold'>183.5M</p>
              </div>
              <div className='flex items-center gap-x-14'>
                <p className='uppercase'>All Customers</p>
                <div className=''>
                  <i className='bx bxs-user-circle text-[50px] text-gray-400'></i>
                </div>
              </div>
            </div>
          </div>


        </div>

        <div className='mt-10'>
        <table className="w-[80%] mx-auto text-sm text-left text-gray-500 shadow-lg">
        <thead className="text-base text-white uppercase bg-black/80">
            <tr>
                <th scope="col" className="px-6 py-3">
                    #
                </th>
                <th scope="col" className="px-6 py-3">
                    User
                </th>
                <th scope="col" className="px-6 py-3">
                    Username
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Email
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Address
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Phone
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Created
                </th>
            </tr>
        </thead>
        <tbody>
          {usersData?.map((user, index) => {
              return <tr key={user._id} className="bg-white border hover:bg-gray-50 text-[14px]">
              <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">             
                  {index+1}
              </td>
              <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">             
                  <img className='rounded-full w-[50px] h-[50px]' src={`/api/users/me/photo/${user._id}`} alt="" />
              </td>
              <td scope="row" className={`px-6 py-4 cursor-pointer font-medium text-gray-900 whitespace-nowrap text-center ${expandUser}`} onClick={toggleUserExpansion}>             
                  {user.name}
              </td>
              <td scope="row" className={`px-6 cursor-pointer py-4 max-w-[180px] font-medium text-gray-900 ${expandEmail}`} onClick={toggleEmailExpansion}>             
                  {user.email}
              </td>
              <td scope="row" className={`px-6 py-4 cursor-pointer font-medium max-w-[180px] text-gray-900 whitespace-nowrap ${expandAddress}`} onClick={toggleAddressExpansion}>             
                  {user.address}
              </td>
              <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">             
                  +92 {user.phone}
              </td>
              <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">             
                  {/* {new Date(user.createdAt).toLocaleDateString()} */}
                  {moment(user.createdAt).format('MMMM Do, YYYY')}
              </td>
          </tr>
          })}
        </tbody>
    </table>
        </div>

      <div className='flex'>

        <div className='mt-14 ml-14 bg-white w-[40%] h-[38%] pt-2 shadow-md mb-8'>
          <div className='text-lg pl-5 pt-3 pb-3 mb-4 border-b'>Orders Status</div>
          <Chart series={chart.series} options={chart.options} width={400} height={500} type='donut' />
        </div>

        <div className='mt-14 ml-8 bg-white w-[50%] h-[38%] pt-2 shadow-md mb-8'>
          <div className='px-5 pt-3 pb-3 bg-black/80 text-white border-b flex justify-between'>
            <div className='text-lg font-semibold'>TODO List</div>
            <div>
              <button onClick={() => setShowInput(!showInput)} className='bg-green-500 font-semibold text-white px-4 py-1 flex items-center rounded-sm gap-x-1 hover:bg-green-600 hover:transition-all hover:duration-300 uppercase'>
                <i className='bx bx-plus'></i>
                <p>Add</p>
              </button>
            </div>
          </div>
          {/* Show all tasks */}
          <div className='overflow-y-auto max-h-72'>
          {allTasks?.map((tasks, index) => {       
              return <div key={index} className={`pl-4 py-3 border-b text-[14px] flex justify-between ${tasks.completed === true ? 'line-through' : 'none'}`}>
                    {editable === tasks._id ? (
                        <div>
                            <input
                                type='text'
                                value={tasks.task}
                                className='border border-slate-300 w-[350px]'
                                onChange={(e) => {
                                    const updatedTasks = allTasks.map((item) => {
                                        if (item._id === tasks._id) {
                                            return { ...item, task: e.target.value };
                                       }
                                        return item;
                                    });
                                    setAllTasks(updatedTasks)
                                }}
                            />
                        </div>
                    ) : (
                        <div onClick={toggleTaskExpansion} className={`max-w-[350px] cursor-pointer ${expandTask}`}>{tasks.task}</div>
                    )}

                        
                <div className='flex gap-x-3 mr-6'>

                  <button onClick={() => { editCompleted(adminData._id, tasks._id, tasks.completed); }} className='font-medium text-black/80 hover:text-blue-500 duration-500 transition-all'>
                      <i className='bx bx-task text-xl'></i>
                  </button>

                    {editable === tasks._id ? (
                       <button onClick={() => editTask(adminData._id, tasks._id, tasks.task)} className='font-medium text-black/80 hover:text-blue-600 duration-500 transition-all'>
                         <i className='bx bx-check text-[28px]'></i>
                       </button>
                     ) : (
                       <button onClick={() => handleEditClick(tasks._id)} className='font-medium text-black/80 hover:text-green-600 duration-500 transition-all'>
                          <i className='bx bxs-edit-alt text-[22px]' ></i>
                       </button>
                     )}

                  <button onClick={() => removeTask(adminData._id, tasks._id)} className='font-medium text-black/80 hover:text-red-600 duration-500 transition-all'>
                      <i className='bx bxs-trash text-xl'></i>
                  </button>

                </div>
              </div>
          })}
          </div>
          {showInput && (
            <div className='px-5 py-3 border-b text-[14px] flex justify-between'>
              <div>
                <input className='w-[300px]' value={task} onChange={(e) => setTask(e.target.value)} type="text" />
              </div>
              <div className='pr-2'>
                <button onClick={addTask} className='font-medium text-black/80 hover:text-green-600 duration-500 transition-all'>
                  <i className='bx bx-check text-3xl'></i>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

    </main>
    </>
  )
}

export default Dashboard