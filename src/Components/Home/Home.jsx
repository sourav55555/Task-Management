import { json } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import banner from "../../assets/—Pngtree—overtime catch up plan task_3934540.png";
import './Home.css';
import TaskList from "../TaskList/TaskList";
import { useState } from "react";

const Home = () => {

    const [refetch, setRefetch] = useState(true);

    // add task function 
    const handleSubmit = event => {
        event.preventDefault();

        const form = event.target;
        const title = form.title.value;
        const status = form.status.value;
        const description = form.description.value;
        const values = {title, status, description};

        fetch("http://localhost:7000/task-list", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(values)
        })
        .then(res => res.json())
        .then(data => {
            if(data.acknowledged){
                toast.success('Task Added Successfully');
                setRefetch(!refetch);
                form.reset();
            }
        });

    }

    return (
        <div className="container mx-auto">
            
            {/* header section  */}
            <div className="h-fit lg:py-28 py-20 px-8 bg-[#03203C] flex lg:flex-row flex-col w-full justify-center items-center">
                <div className="lg:w-1/2">
                    <img className="lg:w-3/4 md:w-3/4 mx-auto" src={banner} alt="" />
                </div>
                <div className="lg:w-1/2 w-full lg:mt-0 mt-20">
                    <div className="w-full md:w-3/5 rounded-3xl mx-auto py-12 md:px-12 px-8 bg-slate-200">
                        <p className=" font2 text-2xl text-center">Add A Task</p>

                {/* form section  */}

                    <form onSubmit={handleSubmit} className="mt-8 w-full">
                        <div className="flex flex-col mb-6">
                            <label className="mb-3 text-lg" htmlFor="">Title</label>
                            <input className="px-5 shadow-md shadow-slate-400 focus:shadow-slate-600  rounded-xl outline-none py-2 border-width" type="text" name="title" placeholder="Enter task title" id="" />
                        </div>

                        <div className="flex flex-col mb-6">

                            <select className="px-5 shadow-md shadow-slate-400 focus:shadow-slate-600  rounded-xl outline-none py-2 border-width" name="status" id="">
                                <option value="">Select Status</option>
                                <option value="Completed">Completed</option>
                                <option value="Not-Complete">Not Complete</option>
                            </select>
                        </div>

                        <div className="flex flex-col mb-6">
                            <label className="mb-3 text-lg"  htmlFor="">Description</label>
                            <textarea className="px-5 shadow-md shadow-slate-400 focus:shadow-slate-600 rounded-xl outline-none py-2 border-width" type="text" placeholder="Enter task description" name="description"  cols="30" rows="5"></textarea>
                        </div>

                        <input type="submit" className="w-full py-2 bg-[#063057] shadow-md shadow-slate-600 hover:shadow-slate-800 cursor-pointer text-white rounded-xl" value="Add Task" name="" id="" />
                    </form>
                    <Toaster />
                    </div>
                </div>
            </div>

            {/* All task section  */}
            <TaskList refetch={refetch} setRefetch={setRefetch}/>
        </div>
    );
};

export default Home;