"use client";
import axios from "axios";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function createEvent() {
  const router = useRouter()
  const listCategory = [
    "Sport",
    "Conference",
    "Expos",
    "Concerts",
    "Festivals",
    "Performing arts",
    "Community",
  ];
  const [data, setData] = useState({});
  const base_api = "http://localhost:8000/api";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${base_api}/event`,  data );

      router.push('/events/')
      toast.success("Event Created!")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="flex flex-1 items-center justify-center py-8">
      <div className="card w-full bg-base-100 p-8 shadow-xl">
        <div className="card-body">
          <h3 className="card-title mb-4 text-4xl">Create your Event</h3>
          <form className="form-control gap-4" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Event title</span>
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="title"
                placeholder="Event Title"
                className="input input-bordered w-full max-w-[50%]"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
              onChange={handleChangeSelect}
                name="category"
                className="select select-bordered w-full max-w-xs"
              >
                <option disabled selected>
                  Event Category
                </option>
                {listCategory.map((category) => {
                  return <option value={category}>{category}</option>;
                })}
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="location"
                placeholder="Event Location (City)"
                className="input input-bordered w-full max-w-[50%]"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Available Seats</span>
              </label>
              <input
              onChange={handleChange}
                type="number"
                name="maxAttendees"
                placeholder="Max Attendees"
                className="input input-bordered w-full max-w-[50%]"
              />
            </div>
            <div className="form-control max-w-[50%]">
              <label className="label cursor-pointer">
                <span className="label-text">Free</span>
                <input
                onChange={handleChange}
                value="free"
                  type="radio"
                  name="isFree"
                  className="radio checked:bg-red-500"
                  checked={true}
                />
              </label>
            </div>
            <div className="form-control max-w-[50%]">
              <label className="label cursor-pointer">
                <span className="label-text">Paid</span>
                <input
                onChange={handleChange}
                value="paid"
                  type="radio"
                  name="isFree"
                  className="radio checked:bg-blue-500"
                  checked={true}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Ticket Price</span>
              </label>
              <input
              onChange={handleChange}
                name="price"
                type="number"
                placeholder="Ticket Price"
                className="input input-bordered w-full max-w-[50%]"
              />
              <label className="label">
                <span className="label-text-alt">
                  Leave it if its a free event
                </span>
              </label>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Event Start</span>
                </label>
                <input
                onChange={handleChange}
                  type="date"
                  name="startDate"
                  className="input input-bordered w-full max-w-[50%]"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Event End</span>
                </label>
                <input
                onChange={handleChange}
                  type="date"
                  name="endDate"
                  className="input input-bordered w-full max-w-[50%]"
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
              onChange={handleChangeTextArea}
                name="description"
                className="textarea textarea-bordered w-full max-w-[50%]"
                placeholder="Event Description"
              ></textarea>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-outline btn-success mb-4 max-w-[50%]">
                Create Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
