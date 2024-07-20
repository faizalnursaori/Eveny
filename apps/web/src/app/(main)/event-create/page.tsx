export default function createEvent() {
  const listCategory = [
    "Sport",
    "Conference",
    "Expos", 
    "Concerts",
    "Festivals",
    "Performing arts",
    "Community",
  ];
  return (
    <section className="flex flex-1 items-center justify-center py-8">
      <div className="card w-full bg-base-100 p-8 shadow-xl">
        <div className="card-body">
          <h3 className="card-title mb-4 text-4xl">Create your Event</h3>
          <form className="form-control gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Event title</span>
              </label>
              <input
                type="text"
                name="Title"
                placeholder="Event Title"
                className="input input-bordered w-full max-w-[50%]"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                name="category"
                className="select select-bordered w-full max-w-xs"
              >
                <option disabled selected>
                  Event Category
                </option>
                {listCategory.map((category) => {
                  return <option>{category}</option>;
                })}
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input
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
                type="number"
                placeholder="Ticket Price"
                className="input input-bordered w-full max-w-[50%]"
              />
              <label className="label">
                <span className="label-text-alt">
                  Leave it if its a free event
                </span>
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                name="description"
                className="textarea textarea-bordered max-w-[50%] w-full"
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
