import React from "react";

function ProductCard({ name, price, location, image }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition duration-300">

      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover"
      />

      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>

        <p className="text-green-700 font-bold mb-1">
          Rs. {price} /kg
        </p>

        <p className="text-gray-500 mb-4">{location}</p>

        <button className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition font-semibold">
          View Details
        </button>
      </div>

    </div>
  );
}

export default ProductCard;