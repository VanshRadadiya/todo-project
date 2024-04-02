import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { CompleteTask, UpdateStatus, ProgressTask, AllTask,UpdatePriority } from './app/counter/counterSlice';
import { Link } from 'react-router-dom';
import { BsStarFill } from "react-icons/bs";
import { BsStar } from "react-icons/bs";
function ViewTask() {

  useEffect(() => {
    const handleDropdown = (event) => {
      const dropdownButton = document.getElementById('dropdownActionButton');
      const dropdownMenu = document.getElementById('dropdownAction');

      if (!dropdownButton || !dropdownMenu) return;

      if (dropdownButton.contains(event.target) || dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.toggle('hidden');
      } else {
        dropdownMenu.classList.add('hidden');
      }
    };

    document.addEventListener('click', handleDropdown);

    return () => {
      document.removeEventListener('click', handleDropdown);
    };
  }, []);

  var task = useSelector((state) => state.counter.task);
  const dispatch = useDispatch();
  const handleCheck = (index) => {
    const CheckTasks = task.map((task, i) => {
      if (i === index) {
        return { ...task, checked: !task.checked };
      }
      return task;
    });
    dispatch(UpdateStatus(CheckTasks));
  };

  const handlePriority = (index) => {
    const StarTasks = task.map((task, i) => {
      if (i === index) {
        return { ...task, priority: !task.priority };
      }
      return task;
    });
    dispatch(UpdatePriority(StarTasks));
  };


  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(task));
  }, [task]);
  return (
    <div>
      <button onClick={() => dispatch(CompleteTask())}>Complete</button>
      <button onClick={() => dispatch(ProgressTask())}>In Progress</button>
      <button onClick={() => dispatch(AllTask())}>All</button>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-1/3 m-auto" style={{ width: "80%" }}>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Task Title
              </th>
              <th scope="col" class="px-6 py-3">
                Task Description
              </th>
              <th scope="col" class="px-6 py-3">
                Date & Time
              </th>
              <th scope="col" class="px-6 py-3">
                Remaining Days
              </th>
              <th scope="col" class="px-6 py-3">
                Status
              </th>
              <th scope="col" class="px-6 py-3">
                Priority
              </th>
            </tr>
          </thead>
          <tbody>
            {
              task.map((data, index) => {
                return (
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {data.title}
                    </th>
                    <td class="px-6 py-4">
                      {data.discription}
                    </td>
                    <td class="px-6 py-4">
                      {data.date}
                    </td>
                    <td class="px-6 py-4">
                      {data.total_days} Days || {data.hours} H : {data.minutes} M : {data.seconds} S
                    </td>
                    <td>
                      <div className="flex items-center">
                        <input id={`checkbox-${index}`} type="checkbox" checked={data.checked} onChange={() => handleCheck(index)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor={`checkbox-${index}`} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Status</label>
                      </div>
                    </td>
                    <td>
                      {/* Star icon/button to toggle priority */}
                      {data.priority ? (
                        <BsStarFill
                          onClick={() => handlePriority(index)}
                          className="text-yellow-500 cursor-pointer"
                        />
                      ) : (
                        <BsStar
                          onClick={() => handlePriority(index)}
                          className="text-gray-500 cursor-pointer"
                        />
                      )}
                    </td>
                  </tr>
                )
              })
            }

          </tbody>
        </table>
      </div>
    </div>


  )
}

export default ViewTask
