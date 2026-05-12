"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { RiArrowDropDownLine } from "react-icons/ri";

const AllAnimals = () => {
    const [displayAnimals, setDisplayAnimals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/animals.json")
            .then((res) => res.json())
            .then((data) => {
                setDisplayAnimals(data);
                setLoading(false);
            });
    }, []);

    const handleSort = (sortBy) => {
        let sortedData = [...displayAnimals];

        if (sortBy === "lowToHigh") {
            sortedData.sort((a, b) => a.price - b.price);
        } else if (sortBy === "highToLow") {
            sortedData.sort((a, b) => b.price - a.price);
        }

        setDisplayAnimals(sortedData);
    };

    return (
        <div className="p-8 max-w-7xl mx-auto min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <div>
                    <h1 className="text-4xl font-bold">Available Animals</h1>
                    <p className="text-gray-500">Find the right animal for your Qurbani</p>
                </div>

                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-outline border-gray-300">
                        Sort by Price <RiArrowDropDownLine className="text-2xl" />
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-1 menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><button onClick={() => handleSort("lowToHigh")}>Low to High</button></li>
                        <li><button onClick={() => handleSort("highToLow")}>High to Low</button></li>
                    </ul>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <span className="loading loading-spinner loading-lg text-warning"></span>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayAnimals.map((animal) => (
                        <div key={animal.id} className={`card bg-base-100 shadow-xl overflow-hidden border-b-5 ${animal.price > 100000 ? 'border-red-500' : 'border-green-500'
                                        }`}>
                            <figure className="h-60 relative">
                                <Image
                                    src={animal.image}
                                    alt={animal.name}
                                    fill
                                    className="object-cover"
                                />
                            </figure>
                            <div className="card-body">
                                <div className="flex justify-between items-start">
                                    <h2 className="card-title text-xl">{animal.name}</h2>
                                    <div className={`badge badge-secondary outline-none border-none font-bold ${animal.type === 'Cow'
                                            ? 'bg-orange-200 text-orange-500'
                                            : animal.type === 'Goat'
                                                ? 'bg-green-200 text-green-500'
                                                : animal.type === 'Sheep'
                                                    ? 'bg-purple-200 text-purple-500'
                                                    : 'bg-gray-100 text-gray-700'
                                        }`}>
                                        {animal.type}
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm line-clamp-2">{animal.description}</p>

                                <div className="divider my-1"></div>

                                <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-gray-500 uppercase">
                                    <span>Weight: {animal.weight}kg</span>
                                    <span>Age: {animal.age}</span>
                                    <span>Breed: {animal.breed}</span>
                                    <span>Loc: {animal.location}</span>
                                </div>

                                <div className="card-actions justify-between items-center mt-4">
                                    <span className="text-2xl font-bold text-orange-600">৳{animal.price.toLocaleString()}</span>
                                    <Link href={`/details/${animal.id}`} className="btn btn-warning btn-sm">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllAnimals;