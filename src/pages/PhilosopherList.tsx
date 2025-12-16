import { useState, useEffect } from "react";
import PhilosopherModal from "../components/PhilosopherModal";
import { fetchPhilosophers } from "../services/philosophers";

interface Philosopher {
  name: string;
  image: string;
  description: string;
  bio: string;
}

interface PhilosopherListProps {
  onSelectPhilosopher: (name: string) => void;
  onBack: () => void;
}

const PhilosopherList = ({ onSelectPhilosopher, onBack }: PhilosopherListProps) => {
  const [philosophers, setPhilosophers] = useState<Philosopher[]>([]);
  const [selected, setSelected] = useState<Philosopher | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Cargar desde API
  useEffect(() => {
    fetchPhilosophers()
      .then((list) => {
        setPhilosophers(list);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load philosophers");
        setLoading(false);
      });
  }, []);

  const filteredPhilosophers = philosophers.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return (
      <div className="text-center mt-20 text-xl font-semibold">Loading philosophers...</div>
    );

  if (error)
    return (
      <div className="text-center mt-20 text-xl text-red-600 font-semibold">{error}</div>
    );

  return (
    <div className="h-screen bg-white text-gray-900 relative flex flex-col items-center py-10 px-6 overflow-hidden">
      <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-7 text-center">
        Choose a Philosopher
      </h1>
      <div className="flex items-center p-6">
        
        {/* Botón volver */}
        <button
          onClick={onBack}
          className="mx-4 px-6 py-2 border-2 border-[#C04E33] text-[#C04E33] rounded-full hover:bg-[#C04E33] hover:text-white transition"
        >
          Back
        </button>
        {/* Buscador */}
        <input
          type="text"
          placeholder="Search philosopher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 w-screen max-w-md px-6 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300"
        />
      </div>
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl">
        {filteredPhilosophers.map((philosopher) => (
          <div
            key={philosopher.name}
            className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-4 text-center border border-gray-100 hover:border-red-200"
            onClick={() => setSelected(philosopher)}
          >
            <img
              src={philosopher.image}
              alt={philosopher.name}
              className="w-32 h-32 mx-auto object-cover rounded-full mb-4"
            />
            <h2 className="text-xl font-serif font-semibold mb-2">{philosopher.name}</h2>
            <p className="text-sm italic text-gray-600">- {philosopher.bio} -</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <PhilosopherModal
          philosopher={selected}
          onClose={() => setSelected(null)}
          onChat={() => onSelectPhilosopher(selected.name)}
        />
      )}
    </div>
  );
};

export default PhilosopherList;
