//komponen untuk "How eveny works?"

export default function Explanation() {
  return <div className="flex w-full flex-col lg:flex-row">
    <div className="card grid h-32 flex-grow place-items-center rounded-box bg-base-300">
      <h1 className="text-lg font-semibold ">Explore Events.</h1>
      <p className="">Try something new, or do more of what you like.</p>
    </div>
    <div className="divider lg:divider-horizontal">OR</div>
    <div className="card grid h-32 flex-grow place-items-center rounded-box bg-base-300">
      <h1 className="text-lg font-semibold">Create Events.</h1>
      <p>Create your own event and reach to your people.</p>
    </div>
    <div className="divider lg:divider-horizontal">OR</div>
    <div className="card grid h-32 flex-grow place-items-center rounded-box bg-base-300">
      <h1 className="text-lg font-semibold">Stay Connected.</h1>
      <p>Empowerment in Triads: Explore, Create, Connect</p>
    </div>
  </div>;
}
