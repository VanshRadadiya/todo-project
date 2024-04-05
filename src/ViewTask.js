import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { CompleteTask, UpdateStatus, ProgressTask, AllTask, UpdatePriority, UpdateTask } from './app/counter/counterSlice';
import { Link } from 'react-router-dom';
import { BsStarFill } from "react-icons/bs";
import { BsStar } from "react-icons/bs";
function ViewTask() {
  var task = useSelector((state) => state.counter.task);
  var todo = JSON.parse(localStorage.getItem('tasks'));
  const dispatch = useDispatch();

  // ---------------- Task Status ------------------//
  const handleCheck = (index) => {
    const CheckTasks = task.map((task, i) => {
      if (i === index) {
        return { ...task, checked: !task.checked };
      }
      return task;
    });
    dispatch(UpdateStatus(CheckTasks));
  };

  // ---------------- Task Priority ------------------//
  const handlePriority = (index) => {
    const StarTasks = task.map((task, i) => {
      if (i === index) {
        return { ...task, priority: !task.priority };
      }
      return task;
    });
    dispatch(UpdatePriority(StarTasks));
  };

  return (
    <div>
      <div>
        {/* ------------------ View Task ------------------ */}
        <div className="flex flex-wrap -mx-3 mb-5">
          <div className="w-full max-w-full px-3 mb-6  mx-auto" >
            <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
              <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30" style={{backgroundColor:"#374151"}}>
                {/* card header */}
                <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-5 bg-transparent">
                  <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                    <span className="mr-3 font-bold text-dark">Task Deliveries</span>
                    <span className="mt-1 font-sans text-secondary-dark text-lg/normal text-gray-300">All Task from the IT Company</span>
                  </h3>
                  <div className="relative flex flex-wrap items-center my-2">
                    <button className='border-2 sm:mx-3 me-3 my-3 border-black rounded'style={{backgroundColor:"#1f2937",color:"white",padding:"3px 15px"}} onClick={() => dispatch(CompleteTask())}>Complete</button>
                    <button className='border-2 sm:mx-3 me-3 my-3 border-black rounded'style={{backgroundColor:"#1f2937",color:"white",padding:"3px 15px"}} onClick={() => dispatch(ProgressTask())}>In Progress</button>
                    <button className='border-2 sm:mx-3 me-3 my-3 border-black rounded'style={{backgroundColor:"#1f2937",color:"white",padding:"3px 15px"}} onClick={() => dispatch(AllTask())}>All Task</button>
                  </div>
                </div>
                {/* end card header */}
                {/* card body  */}
                <div className="flex-auto block py-8 pt-6 px-9">
                  <div className="overflow-x-auto">
                    <table className="w-full my-0 align-middle text-dark border-neutral-200 text-xs lg:text-base">
                      <thead className="align-bottom">
                        <tr className="font-semibold text-gray-300">
                          <th className="pb-3 px-5 md:px-3 text-center ">PRIORITY</th>
                          <th className="pb-3 px-5 md:px-3 text-center ">STATUS</th>
                          <th className="pb-3 px-5 md:px-3 text-center ">NAME</th>
                          <th className="pb-3 px-5 md:px-3 text-center ">DESCRIPTION</th>
                          <th className="pb-3 px-5 md:px-3 text-center ">DEADLINE</th>
                          <th className="pb-3 px-5 md:px-3 text-center ">REMAINING DAYS</th>
                          <th className="pb-3 px-5 md:px-3 text-center ">REMAINING TIME</th>
                        </tr>
                      </thead>
                      <tbody style={{backgroundColor:"#1f2937"}}>
                        {
                          task.map((data, index) => {
                            return (
                              <tr className="border-b border-gray-700 last:border-b-0 font-semibold text-center text-gray-400">
                                <td className='py-4'>
                                  {data.priority ? (
                                    <BsStarFill
                                      onClick={() => handlePriority(index)}
                                      className="text-yellow-500 cursor-pointer mx-auto"
                                    />
                                  ) : (
                                    <BsStar
                                      onClick={() => handlePriority(index)}
                                      className="text-gray-500 cursor-pointer mx-auto"
                                    />
                                  )}
                                </td>
                                <td className='px-2'>
                                  <div className="flex items-center justify-center">
                                    <input id={`checkbox-${index}`} type="checkbox" checked={data.checked} onChange={() => handleCheck(index)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor={`checkbox-${index}`} className="ms-2 text-sm font-medium">Status</label>
                                  </div>
                                </td>
                                <td class=" py-4">
                                  {data.title}
                                </td>
                                <td class=" py-4">
                                  {data.discription}
                                </td>
                                <td class=" py-4">
                                  {data.date}
                                </td>
                                <td class=" py-4">
                                  {data.total_days} Days
                                </td>
                                <td class=" py-4">
                                  {data.hours} H : {data.minutes} M : {data.seconds} S
                                </td>
                              </tr>
                            )
                          })
                        }

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>


  )
}

export default ViewTask
