import React, { useState } from "react";

const friendsData = [
  {
    id: 1,
    name: "Amit Sharma",
    phone: "9876543210",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Neha Verma",
    phone: "9123456780",
    img: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    id: 3,
    name: "Rahul Singh",
    phone: "9988776655",
    img: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    id: 4,
    name: "Pooja Gupta",
    phone: "9012345678",
    img: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    id: 5,
    name: "Karan Mehta",
    phone: "8899001122",
    img: "https://randomuser.me/api/portraits/men/77.jpg",
  },
];

const Friends = () => {
  const [showPhones, setShowPhones] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-700">Friends List</h1>

          <button
            onClick={() => setShowPhones(!showPhones)}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
          >
            {showPhones ? "Hide Phones" : "Show Phones"}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {friendsData.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center gap-4 p-4 border rounded-xl shadow-sm hover:shadow-md transition"
            >
              <img
                src={friend.img}
                alt={friend.name}
                className="w-16 h-16 rounded-full object-cover border"
              />

              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-800">
                  {friend.name}
                </h2>

                <p className="text-gray-600">
                  {showPhones ? friend.phone : "**********"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Friends;
