"use client";
import { useState, useEffect, use } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaMapMarkerAlt, FaWeightHanging, FaCalendarAlt, FaArrowLeft } from "react-icons/fa";

const AnimalDetails = ({ params: paramsPromise }) => {
  const params = use(paramsPromise);
  const id = params.id;
  const router = useRouter();

  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const isLoggedIn = true; 

  useEffect(() => {
    fetch("/animals.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item.id === parseInt(id));
        setAnimal(found);
        setLoading(false);
      });
  }, [id]);

  const { name, breed, location, type, description, weight, age, price, image, category } = animal || {};

  const handleBooking = (e) => {
    e.preventDefault();
    toast.success("Booking Successful! Our team will contact you.");
    e.target.reset();
    document.getElementById('booking_modal').close();
  };

  if (loading) return <div className="min-h-screen flex justify-center items-center"><span className="loading loading-ring loading-lg"></span></div>;
  if (!animal) return <div className="min-h-screen text-center py-20 text-2xl font-bold">Animal Not Found!</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <button 
        onClick={() => router.back()} 
        className="btn btn-ghost gap-2 mb-6 hover:bg-orange-100 text-orange-700"
      >
        <FaArrowLeft /> Back to All Animals
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className="rounded-3xl overflow-hidden shadow-2xl relative h-112 border-4 border-white">
            <Image src={image} alt={name} fill className="object-cover" />
            <div className="absolute top-4 left-4 badge badge-warning p-4 font-bold shadow-lg">
                {category}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-5xl font-bold text-gray-800 mb-2">{name}</h1>
            <p className="text-xl font-semibold text-orange-600 mb-6">{breed}</p>
            
            <div className="flex gap-4 mb-8">
                <div className="badge badge-outline p-4">{location}</div>
                <div className="badge badge-outline p-4">{type}</div>
            </div>

            <p className="text-gray-600 leading-relaxed text-lg mb-8">
              { description}
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-base-200 p-4 rounded-2xl text-center border-b-4 border-warning">
                <FaWeightHanging className="mx-auto text-warning mb-2" />
                <p className="text-xs font-bold text-gray-500">WEIGHT</p>
                <p className="font-bold text-lg">{weight}kg</p>
              </div>
              <div className="bg-base-200 p-4 rounded-2xl text-center border-b-4 border-warning">
                <FaCalendarAlt className="mx-auto text-warning mb-2" />
                <p className="text-xs font-bold text-gray-500">AGE</p>
                <p className="font-bold text-lg">{age}</p>
              </div>
              <div className="bg-base-200 p-4 rounded-2xl text-center border-b-4 border-warning">
                <FaMapMarkerAlt className="mx-auto text-warning mb-2" />
                <p className="text-xs font-bold text-gray-500">CITY</p>
                <p className="font-bold text-lg">{location}</p>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 p-6 rounded-3xl flex items-center justify-between border border-orange-100">
            <div>
                <p className="text-sm font-bold text-gray-500">PRICE</p>
                <p className="text-4xl font-extrabold text-gray-800">৳{price.toLocaleString()}</p>
            </div>
            
            {isLoggedIn ? (
              <button 
                className="btn btn-warning btn-lg px-10 shadow-lg"
                onClick={() => document.getElementById('booking_modal').showModal()}
              >
                Book Now
              </button>
            ) : (
              <button 
                className="btn btn-disabled btn-lg" 
                title="Login to book"
              >
                Login to Book
              </button>
            )}
          </div>
        </div>
      </div>

      <dialog id="booking_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white">
          <h3 className="font-bold text-2xl mb-4">Complete Your Booking</h3>
          <p className="text-sm text-gray-500 mb-6">You are booking: <span className="font-bold">{name}</span></p>
          
          <form onSubmit={handleBooking} className="space-y-4">
            <input type="text" placeholder="Full Name" className="input input-bordered w-full" required />
            <input type="email" placeholder="Email Address" className="input input-bordered w-full" required />
            <input type="text" placeholder="Phone Number" className="input input-bordered w-full" required />
            <textarea className="textarea textarea-bordered w-full h-24" placeholder="Delivery Address" required></textarea>
            
            <div className="modal-action">
              <button type="button" className="btn" onClick={() => document.getElementById('booking_modal').close()}>Cancel</button>
              <button type="submit" className="btn btn-success">Confirm Booking</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AnimalDetails;