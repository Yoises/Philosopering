// services/philosophers.ts
export async function fetchPhilosophers() {
  const res = await fetch("https://philosophersapi.com/api/philosophers");
  if (!res.ok) throw new Error("Error al obtener filósofos");

  const data = await res.json();

  return data.map((item: any) => ({
    name: item.name,
    image: item.images?.faceImages?.face500x500
      ? "https://philosophersapi.com" + item.images.faceImages.face500x500
      : "",
    description: item.interests || "No descrition",
    bio: item.life || "Biography not available.",
  }));
}
