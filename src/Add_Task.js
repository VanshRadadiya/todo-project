import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { AddTask, DeleteTask, UpdateTask } from './app/counter/counterSlice';
import { Link } from 'react-router-dom'; function Add_Task() {

    let [title, setTitle] = useState("");
    let [discription, setDescription] = useState("");
    let [date, setDate] = useState("");
    let [index, setIndex] = useState();
    let [isUpdating, setIsUpdating] = useState(false);
    var task = useSelector((state) => state.counter.task);
    var todo = JSON.parse(localStorage.getItem('tasks'));
    var dispatch = useDispatch();

// --------------------Date & Time --------------------//
    const completion_date = new Date(date);
    const today = new Date();
    let difference_days = completion_date - today;
    let total_days = Math.ceil(difference_days / (1000 * 60 * 60 * 24))

    let seconds = Math.floor(difference_days / 1000);
    difference_days -= seconds * 1000;

    let minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;

    let hours = Math.floor(minutes / 60);
    minutes -= hours * 60;

// -------------------- Update Task --------------------//
    const update = (data) => {
        console.log(data);
        setTitle(data.title ? data.title : title);
        setDescription(data.discription ? data.discription : discription);
        setDate((data.date ? data.date : date))
        setIndex(data.ind)
        setIsUpdating(true);
    }

// -------------------- Task Add --------------------//
    const handleTask = () => {
        if (isUpdating) {
            dispatch(UpdateTask({ title, discription, ind: index, date, checked: false,total_days,seconds,minutes,hours  }));
            setIsUpdating(false);
        } else {
            dispatch(AddTask({ title, discription, date, checked: false, total_days,seconds,minutes,hours }));
        }
        setTitle('');
        setDescription('');
    }
    return (
        <div>
            <div>
                {/* --------------------- Add Task Form--------------------- */}
                <section className="text-gray-600 body-font relative">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-col text-center w-full mb-12">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Add Task</h1>
                            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">You Have To Add Task Title and its Description.</p>
                        </div>
                        <div className="lg:w-1/2 md:w-2/3 mx-auto">
                            <div className="md:flex flex-wrap justify-center -m-2">
                                <div className="p-2 md:w-1/2">
                                    <div className="relative">
                                        <label htmlFor="title" className="leading-7 text-sm text-gray-600">Title</label>
                                        <input type="text" id="title" name="title" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e) => setTitle(e.target.value)} value={title} />
                                    </div>
                                </div>
                                <div className="p-2 md:w-1/2">
                                    <div className="relative">
                                        <label htmlFor="description" className="leading-7 text-sm text-gray-600">Description</label>
                                        <input type="text" id="description" name="description" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e) => setDescription(e.target.value)} value={discription} />
                                    </div>
                                </div>
                                <div className="p-2 md:w-1/2">
                                    <div className="relative">
                                        <label htmlFor="date" className="leading-7 text-sm text-gray-600">Submission Date</label>
                                        <input type="datetime-local" id="date" name="date" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e) => setDate(e.target.value)} value={date} />
                                    </div>
                                </div>

                                <div className="p-2 w-full">
                                    <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={() => handleTask()}>{isUpdating ? 'Update Task' : 'Add Task'}</button>
                                </div>
                                <div className="p-2 w-full">
                                    <Link to={"/ViewTask"}><button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" >View Task</button></Link>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

                {/* --------------------- Task Table--------------------- */}
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg mx-5 rounded-lg md:mx-10 lg:mx-52 xl:mx-80">
                    <table class="w-full text-sm text-gray-500 dark:text-gray-400 text-center">
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
                                    <span class="sr-only">Edit</span>
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    <span class="sr-only">Update</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                              todo && todo.map((data, ind) => {
                                    return (
                                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={ind}>
                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {data.title}
                                            </th>
                                            <td class="px-6 py-4">
                                                {data.discription}
                                            </td>
                                            <td class="px-6 py-4">
                                                {data.date}
                                            </td>
                                            <td class="px-6 py-4 text-center">
                                                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => dispatch(DeleteTask(ind))}>Delete</a>
                                            </td>
                                            <td class="px-6 py-4 text-center">
                                                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => { update({ title: data.title, discription: data.discription, ind: ind, date: data.date }) }}>Update</a>
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
    )
}

export default Add_Task
