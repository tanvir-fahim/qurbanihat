"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LottieHover from "@/components/LottieHover";
import lottieTips from "@/assets/lottieTips.json";
import lottieFeature from "@/assets/lottieFeature.json";
import { FaCheckCircle, FaShieldAlt, FaTruck } from "react-icons/fa";

export default function Home() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/animals.json")
      .then((res) => res.json())
      .then((data) => {
        setAnimals(data.slice(0, 4));
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="hero min-h-[70vh] bg-base-200" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=1200)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Find Your Perfect Qurbani Animal</h1>
            <p className="mb-5">Experience a hassle-free, modern marketplace for the best livestock in the country. Quality and health guaranteed.</p>
            <Link href="/animals" className="btn btn-warning">Browse All Animals</Link>
          </div>
        </div>
      </div>

      <section className="py-16 px-8 max-w-7xl mx-auto">
        <div className="flex justify-center align-items-center gap-2">
          <LottieHover animationData={lottieFeature} size={40} />
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Featured Animals</h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <span className="loading loading-bars loading-lg text-warning"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {animals.map((animal) => (
              <div key={animal.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition">
                <figure className="h-48 overflow-hidden">
                  <Image
                    src={animal.image}
                    alt={animal.name}
                    width={400}
                    height={300}
                    className="object-cover w-full h-full"
                    priority
                  />
                </figure>
                <div className="card-body p-5">
                  <h2 className="card-title text-lg">{animal.name}</h2>
                  <p className="text-sm text-gray-500">{animal.breed} • {animal.location}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold text-orange-600">৳{animal.price}</span>
                    <Link href={`/details/${animal.id}`} className="btn btn-sm btn-outline btn-warning">Details</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="bg-orange-50 py-16 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center align-items-center gap-2">
            <LottieHover animationData={lottieTips} size={40} />
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Qurbani Preparation Tips</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-orange-600 mb-2">Check Health</h3>
              <p className="text-sm">Ensure the animal is active, has clear eyes, and no visible wounds or broken horns.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-orange-600 mb-2">Age Verification</h3>
              <p className="text-sm">Cows should be at least 2 years old and goats at least 1 year old for Qurbani.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Explore Top Breeds</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Brahman Cross", img: "/brahman.webp" },
            { name: "Black Bengal", img: "/blackbengal.avif" },
            { name: "Sahiwal", img: "/shahiwalBull.webp" },
            { name: "Jamunapari", img: "/jamunaGoat.webp" }
          ].map((breed) => (
            <div key={breed.name} className="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer h-40">
              <Image
                src={breed.img}
                alt={breed.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
              <div className="absolute inset-0 flex items-end p-4">
                <p className="text-white font-bold text-lg">{breed.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose QurbaniHat?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 text-center">
              <div className="flex justify-center mb-6 text-orange-600 text-3xl">
                <FaCheckCircle />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Verified Farmers</h3>
              <p className="text-gray-600 text-sm leading-relaxed">We strictly screen our sellers to ensure you receive healthy, well-cared-for animals.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 text-center">
              <div className="flex justify-center mb-6 text-orange-600 text-3xl">
                <FaShieldAlt />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Health Guaranteed</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Every animal goes through a preliminary health check before being listed on our platform.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 text-center">
              <div className="flex justify-center mb-6 text-orange-600 text-3xl">
                <FaTruck />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Easy Delivery</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Coordinate pickup or delivery easily with our integrated marketplace tools.</p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}