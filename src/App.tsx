import { useState } from "react";
import Home from "./pages/Home";
import PhilosopherList from "./pages/PhilosopherList";
import ChatRoom from "./pages/ChatRoom";
import './App.css'

function App() {
  // Controla qué pantalla se muestra
  const [screen, setScreen] = useState<"home" | "list" | "chat">("home");
  const [selectedPhilosopher, setSelectedPhilosopher] = useState<string | null>(null);

  // Manejadores de cambio de vista
  const goToList = () => setScreen("list");
  const goToChat = (name: string) => {
    setSelectedPhilosopher(name);
    setScreen("chat");
  };
  const goHome = () => setScreen("home");

  // Renderizado condicional
  return (
    <>
      {screen === "home" && <Home onEnter={goToList} />}
      {screen === "list" && (
        <PhilosopherList onSelectPhilosopher={goToChat} onBack={goHome} />
      )}
      {screen === "chat" && selectedPhilosopher && (
        <ChatRoom philosopher={selectedPhilosopher} onBack={goToList} />
      )}
    </>
  );
}

export default App;
