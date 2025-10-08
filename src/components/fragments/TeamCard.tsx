// src/components/TeamCard.tsx
import React from "react";

const TeamCard: React.FC = () => {
  const teamMembers = [
    {
      name: "Ahmad Rafi'i",
      role: "Back End, Business",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Bintang Adi Alvaro",
      role: "UI/UX, Copywriting",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Dafa Ghaitsa Yogatama",
      role: "Front End, Dev Ops",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <section className="container mx-auto mb-20 px-4">
      {/* Judul */}
      <h2 className="dark:text-white text-black text-4xl font-bold text-center mb-12">
        Tim Kami
      </h2>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="w-92 bg-gray-300 dark:bg-gray-100 rounded-2xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300"
          >
            <div className="w-24 h-24 rounded-full border-4 border-red-500 overflow-hidden mb-4">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-black text-lg font-semibold text-center">
              {member.name}
            </h3>
            <p className="text-gray-600 text-sm text-center">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamCard;
