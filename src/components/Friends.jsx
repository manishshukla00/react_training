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
    <div className="min-h-screen bg-gray-100 px-4 py-6 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white p-4 sm:p-6 rounded-2xl shadow-lg">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-700">
            Friends List
          </h1>

          <button
            onClick={() => setShowPhones(!showPhones)}
            className="
              w-full sm:w-auto
              px-4 py-2
              rounded-lg
              bg-blue-500
              text-white
              font-semibold
              hover:bg-blue-600
              transition
            "
          >
            {showPhones ? "Hide Phones" : "Show Phones"}
          </button>
        </div>

        {/* Friends Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {friendsData.map((friend) => (
            <div
              key={friend.id}
              className="
                flex items-center gap-4
                p-4
                border
                rounded-xl
                shadow-sm
                hover:shadow-md
                transition
              "
            >
              <img
                src={friend.img}
                alt={friend.name}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border"
              />

              <div className="flex-1 min-w-0">
                <h2 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
                  {friend.name}
                </h2>

                <p className="text-sm sm:text-base text-gray-600">
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
