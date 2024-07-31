import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { deleteEvent, editEvent } from "@/api/event";
import React, { useState } from "react";


export function DeleteEventDialog({ id }: { id: number }) {
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    deleteEvent(Number(id));
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p>Delete</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Event</DialogTitle>
          <DialogDescription>
            Are you sure you want to <span className="font-bold">delete</span>{" "}
            this event
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2">
          <DialogClose>
            <button className="btn btn-outline btn-success">Cancel</button>
          </DialogClose>
          <button className="btn btn-error" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function EditEventDialog({
  id,
  prevData,
}: {
  id: number;
  prevData: {
    title: string;
    category: string;
    location: string;
    maxAttendees: number;
    isFree: boolean;
    price: number;
    startDate: string;
    endDate: string;
    description: string;
  };
}) {
  const [updatedData, setData] = useState({
    title: prevData.title,
    category: prevData.category,
    location: prevData.location,
    maxAttendees: prevData.maxAttendees,
    isFree: prevData.isFree,
    price: prevData.price,
    startDate: prevData.startDate,
    endDate: prevData.endDate,
    description: prevData.description,
  });
  const listCategory = [
    "Sport",
    "Conference",
    "Expos",
    "Concerts",
    "Festivals",
    "Performing arts",
    "Community",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...updatedData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.files;
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...updatedData, isFree: e.target.value === "free" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      editEvent(id, updatedData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p>Edit</p>
      </DialogTrigger>
      <DialogContent className="h-full sm:max-w-[75%]">
        <DialogHeader>
          <DialogTitle>Edit Event's Details</DialogTitle>
          <DialogDescription>
            Make changes to your event's details here. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <form
          className="form-control grid grid-cols-3 gap-3"
          onSubmit={handleSubmit}
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text">Event title</span>
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="title"
              value={updatedData.title}
              placeholder={prevData.title}
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
              value={updatedData.category}
              className="select select-bordered w-full max-w-xs"
              required
            >
              <option value="" disabled>
                {prevData.category}
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
              value={updatedData.location}
              placeholder={prevData.location}
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
              value={updatedData.maxAttendees || ""}
              placeholder={`${prevData.maxAttendees}`}
              className="input input-bordered w-full max-w-[50%]"
              required
            />
          </div>
          <div>
            <div className="form-control max-w-[50%]">
              <label className="label cursor-pointer">
                <span className="label-text">Free</span>
                <input
                  onChange={handleRadioChange}
                  value="free"
                  type="radio"
                  name="isFree"
                  className="radio checked:bg-red-500"
                  checked={updatedData.isFree}
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
                  checked={!updatedData.isFree}
                />
              </label>
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Ticket Price</span>
            </label>
            <input
              onChange={handleChange}
              name="price"
              type="number"
              value={updatedData.price || ""}
              placeholder={`${prevData.price}`}
              className="input input-bordered w-full max-w-[50%]"
              disabled={updatedData.isFree}
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
                value={updatedData.startDate}
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
                value={updatedData.endDate}
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
              value={updatedData.description}
              className="textarea textarea-bordered w-full max-w-[50%]"
              placeholder={prevData.description}
              required
            ></textarea>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-outline btn-success mb-4 max-w-[50%]">
              Update Event
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
