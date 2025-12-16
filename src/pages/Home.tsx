

interface HomeProps {
  onEnter: () => void; // función que cambia de pantalla en App.tsx
}

const Home = ({ onEnter }: HomeProps) => {
  return (
    <div className="relative flex flex-col min-h-120 items-center justify-center bg-white text-gray-900 overflow-hidden">
      {/* Imagen difusa de fondo */}
      

      {/* Contenido principal */}
      <main className="text-center px-21">
        <h1 className="text-5xl md:text-6xl font-serif font-semibold tracking-tight">
          THE THOUGHT ROOM
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Where ideas transcend time and minds meet beyond centuries.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={onEnter}
            className="px-8 py-3 rounded-full font-medium shadow-md transition-transform transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300 bg-white hover:bg-[#C04E33] text-[#C04E33] hover:text-white"
          >
            Enter the Room
          </button>

          <button
            onClick={() =>
              alert("This section will soon include details about the project.")
            }
            className="px-8 py-3 rounded-full font-medium transition-all border-2 border-[#C04E33] text-[#C04E33] bg-white hover:bg-[#C04E33] hover:text-white shadow-sm"
          >
            Learn More
          </button>
        </div>
      </main>

      {/* Footer opcional */}
      <footer className="mt-16 mb-3 text-sm text-gray-500">
        © {new Date().getFullYear()} The Thought Room
      </footer>
    </div>
  );
};

export default Home;
