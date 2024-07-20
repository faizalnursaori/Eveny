import Image from "next/image"

export default function About(){
    return (
        <div className="w-screen h-screen">
            <div className="text-center flex flex-col justify-center items-center h-full">
            <h1 className="text-5xl font-bold mb-5">About Us</h1>
            <p className="text-xl ">Eveny adalah situs yang mempermudah kita dalam mencari dan membuat event yang kita inginkan.</p>
            <div className="divider divider-success">Teams</div>
            <div className="flex w-full">
                <div className="card bg-base-300 rounded-box grid h-20 flex-grow place-items-center">
                    <h1>Faizal Nursaori</h1>
                    <p className="text-sm">Tech Lead</p>
                </div>
                <div className="divider divider-horizontal">AND</div>
                <div className="card bg-base-300 rounded-box grid h-20 flex-grow place-items-center">
                    <h1>Muhammad Haris</h1>
                    <p className="text-sm">Junior webdev</p>
                </div>
            </div>
            </div>
        </div>
    )
}