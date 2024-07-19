import hero from './../../public/hero-img.jpg'
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <Image src= {hero} alt='Hero-Image' className='max-w-lg rounded-lg shadow-2xl'/>
        <div>
          <h1 className="text-5xl font-bold">Find Your Next Event!</h1>
          <p className="py-6">
            With Eveny. we'll help you find events that you like and the closest one to you!
          </p>
          <button className="btn btn-success">Get Started!</button>
        </div>
      </div>
    </div>
  );
}
