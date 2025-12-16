import React from "react";

interface Philosopher {
  name: string;
  image: string;
  description: string;
  bio: string;
}

interface PhilosopherModalProps {
  philosopher: Philosopher;
  onClose: () => void;
  onChat: () => void;
}

const PhilosopherModal: React.FC<PhilosopherModalProps> = ({
  philosopher,
  onClose,
  onChat,
}) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
        >
          ✕
        </button>

        <img
          src={philosopher.image}
          alt={philosopher.name}
          className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
        />

        <h2 className="text-2xl font-serif font-semibold text-center">
          {philosopher.name}
        </h2>
        <p className="italic text-gray-600 text-center mt-2 mb-4">
          interests: <br/>{philosopher.description}
        </p>
        <p className="text-gray-700 text-sm leading-relaxed text-center mb-6">
          {philosopher.bio}
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onChat}
            className="px-6 py-2 rounded-full bg-[#C04E33] text-white hover:bg-[#a93f2c] transition"
          >
            Chat
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhilosopherModal;
