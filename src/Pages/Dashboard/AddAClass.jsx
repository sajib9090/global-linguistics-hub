import React, { useState } from "react";
import useAuth from "../../Hooks/UseAuth";
import { Toaster, toast } from "react-hot-toast";

const AddAClass = () => {
  const { user, loading } = useAuth();

  const handleAddClass = (e) => {
    e.preventDefault();
    const className = e.target.className.value;
    const classImage = e.target.classImage.value;
    const instructorName = e.target.instructorName.value;
    const instructorEmail = e.target.instructorEmail.value;
    const availableSeats = parseInt(e.target.availableSeats.value);
    const price = parseFloat(e.target.price.value);

    if (availableSeats < 0 || availableSeats === 0) {
      toast.error("Available seats must be greater than 0");
      return;
    }
    if (price < 0 || price === 0) {
      toast.error("Classes price must be greater than 0");
      return;
    }

    const addClassInfo = {
      className,
      classImage,
      instructorName,
      instructorEmail,
      availableSeats,
      price,
      status: "pending",
    };
    console.log(addClassInfo);
    fetch(`http://localhost:5000/classes`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(addClassInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        toast.success("Class added successfully with pending status");
      });
  };

  return (
    <div>
      <div className="">
        <h1 className="font-bold text-5xl text-center pt-6">Add a class</h1>
      </div>
      <div className="md:h-[90vh] flex items-center justify-center">
        <form
          onSubmit={handleAddClass}
          className="w-[70%] bg-[#007CFF] mx-auto rounded-md px-8 py-6 bg-opacity-30"
        >
          <div className="md:flex gap-8">
            <div className="form-control md:w-[50%]">
              <label className="label">
                <span className="label-text">Class Name</span>
              </label>
              <input
                type="text"
                placeholder="Class Name"
                name="className"
                className="input input-bordered"
              />
            </div>
            <div className="form-control md:w-[50%]">
              <label className="label">
                <span className="label-text">Class Image</span>
              </label>
              <input
                type="url"
                name="classImage"
                placeholder="Enter image url"
                className="input input-bordered"
              />
            </div>
          </div>
          <div className="md:flex gap-8">
            <div className="form-control md:w-[50%]">
              <label className="label">
                <span className="label-text">Instructor Name</span>
              </label>
              <input
                type="text"
                defaultValue={user.displayName}
                readOnly
                name="instructorName"
                className="input input-bordered"
              />
            </div>
            <div className="form-control md:w-[50%]">
              <label className="label">
                <span className="label-text">Instructor Email</span>
              </label>
              <input
                type="text"
                defaultValue={user.email}
                readOnly
                name="instructorEmail"
                className="input input-bordered"
              />
            </div>
          </div>
          <div className="md:flex gap-8">
            <div className="form-control md:w-[50%]">
              <label className="label">
                <span className="label-text">Available Seats</span>
              </label>
              <input
                type="number"
                placeholder="Available Seats"
                name="availableSeats"
                className="input input-bordered"
              />
            </div>
            <div className="form-control md:w-[50%]">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                placeholder="Price"
                name="price"
                className="input input-bordered"
              />
            </div>
          </div>
          <div className="md:flex gap-8">
            <div className="form-control md:w-[100%]">
              <input
                type="submit"
                value="Add class"
                className="bg-[#007CFF] btn hover:bg-slate-500 border-none duration-500 text-white mt-4 cursor-pointer rounded-md"
              />
            </div>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default AddAClass;
