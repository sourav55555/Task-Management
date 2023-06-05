import { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { toast, Toaster } from "react-hot-toast";

const TaskList = ({ refetch, setRefetch }) => {
  const [list, setList] = useState([]);
  //   const [refetch, setRefetch] = useState(true);

  // fetching data with useEffect
  useEffect(() => {
    fetch("http://localhost:7000/task-list")
      .then((res) => res.json())
      .then((data) => setList(data));
  }, [refetch]);

  //   delete a task function
  const handleDelete = (id) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this task?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {

        fetch(`http://localhost:7000/task-list/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your task has been deleted.", "success");
              setRefetch(!refetch);
            }
          });
          
      }
    });

  };

  //   change complete status
  const handleComplete = (id, status) => {

    if (status !== "Completed") {

      fetch(`http://localhost:7000/task-list/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ status: "Completed" }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            toast.success("Task Status Updated.");
            setRefetch(!refetch);
          }
        });
    }

  };

  return (
    <div className="my-32 px-6">
      <p className=" font2 text-2xl text-center mb-8">All Tasks</p>

      <div className="w-full lg:w-3/5 mx-auto rounded-2xl shadow-lg shadow-slate-600 border-4 md:p-8 p-3 border-[#03203C]">

        <div>

          {list.map((data, index) => (

            <div className=" border-b-2 py-6 px-4 gap-4" key={data._id}>
              <div className="flex flex-col md:flex-row items-start gap-8 justify-between">

                <div className="flex gap-8">
                  <p>{index + 1}</p>
                  <h4 className="font-semibold">Task: {data.title}</h4>
                </div>

                <div className="flex items-center gap-8">

                  <div className="flex justify-between gap-4 border-2 rounded-lg p-2 items-center">
                    {data.status}
                    <button
                      onClick={() => handleComplete(data._id, data.status)}
                      className={`w-8 h-8 rounded-full hover:bg-blue-600 hover:text-white shadow-md shadow-slate-500 cursor-pointer ${
                        data.status == "Completed"
                          ? "bg-blue-600 text-white"
                          : "bg-blue-100"
                      }`}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                  </div>
                  <button
                    onClick={() => handleDelete(data._id)}
                    className="w-8 h-8 rounded-full hover:bg-red-900 shadow-md shadow-slate-500 bg-red-700 text-white"
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>

                </div>
              </div>

              <p className="mt-8">
                <span className="font-semibold">Description:</span>{" "}
                {data.description}
              </p>
            </div>

          ))}
        </div>
        {list.length === 0 && <p>No Task. Please Add.</p>}

      </div>
      <Toaster />

    </div>
  );
};

export default TaskList;
