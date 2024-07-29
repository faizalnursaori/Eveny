"use client";
import axios from "axios";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CreateEvent() {
  const router = useRouter();
  const listCategory = [
    "Sport",
    "Conference",
    "Expos",
    "Concerts",
    "Festivals",
    "Performing arts",
    "Community",
  ];
  const [data, setData] = useState({
    title: "",
    category: "",
    location: "",
    maxAttendees: 0,
    isFree: true,
    price: 0,
    startDate: "",
    endDate: "",
    description: "",
    tickets: [],
  });
  const [image, setImage] = useState<File | null>(null);

  const base_api = "http://localhost:8000/api";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, isFree: e.target.value === "free" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

      if (!token || userInfo.role !== "organizer") {
        toast.error("You don't have permission to create events.");
        return;
      }

      const formData = new FormData();

      // Append all data fields to formData
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });

      // Append organizerId and availableSeat
      formData.append("organizerId", userInfo.id);
      formData.append("availableSeat", data.maxAttendees.toString());

      // Append the image file if it exists
      if (image) {
        formData.append("image", image);
      }

      console.log("Form Data:", Object.fromEntries(formData.entries()));
      const res = await axios.post(`${base_api}/events`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      router.push("/events");
      toast.success("Event Created!");
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          toast.error("Unauthorized. Only Organizer");
        } else {
          toast.error(`Failed to create event: ${error.response.data.message}`);
        }
      } else {
        toast.error("An unexpected error occurred.");
      }
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
                value={data.title}
                placeholder="Event Title"
                className="input input-bordered w-full max-w-[50%]"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Event Image</span>
              </label>
              <input
                onChange={handleFileChange}
                type="file"
                name="image"
                accept="image/*"
                className="file-input file-input-bordered w-full max-w-[50%]"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                onChange={handleChangeSelect}
                name="category"
                value={data.category}
                className="select select-bordered w-full max-w-xs"
                required
              >
                <option value="" disabled>
                  Event Category
                </option>
                {listCategory.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
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
                value={data.location}
                placeholder="Event Location (City)"
                className="input input-bordered w-full max-w-[50%]"
                required
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
                value={data.maxAttendees || ""}
                placeholder="Max Attendees"
                className="input input-bordered w-full max-w-[50%]"
                required
              />
            </div>
            <div className="form-control max-w-[50%]">
              <label className="label cursor-pointer">
                <span className="label-text">Free</span>
                <input
                  onChange={handleRadioChange}
                  value="free"
                  type="radio"
                  name="isFree"
                  className="radio checked:bg-red-500"
                  checked={data.isFree}
                />
              </label>
            </div>
            <div className="form-control max-w-[50%]">
              <label className="label cursor-pointer">
                <span className="label-text">Paid</span>
                <input
                  onChange={handleRadioChange}
                  value="paid"
                  type="radio"
                  name="isFree"
                  className="radio checked:bg-blue-500"
                  checked={!data.isFree}
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
                value={data.price || ""}
                placeholder="Ticket Price"
                className="input input-bordered w-full max-w-[50%]"
                disabled={data.isFree}
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
                  value={data.startDate}
                  className="input input-bordered w-full max-w-[50%]"
                  required
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
                  value={data.endDate}
                  className="input input-bordered w-full max-w-[50%]"
                  required
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
                value={data.description}
                className="textarea textarea-bordered w-full max-w-[50%]"
                placeholder="Event Description"
                required
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
