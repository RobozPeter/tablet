import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './style.css';
import Tablet from "./Tablet";

export default function TabletReszletek() {
  const [tablet, setTablet] = useState<Tablet>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorServer, setErrorServer] = useState<string>("");

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetch(`http://localhost:3000/tablets/${id}`)
      .then((response) => {
        if (response.status === 404) {
          setErrorServer("Resource not found (404)");
        }
        if (!response.ok) {
          setErrorServer(`Server responded with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setTablet(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (errorServer) {
    return <p>Error: {errorServer}</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div>
        <h2>Tablet Részletek</h2>
        <a href="/tabletfelvetel">Új tablet felvétele</a>
        <br />
        <a href="/tabletstorles">Tablet törlése</a>
        {tablet ? (
          <div>
            <h2>{tablet.Nev}</h2>
            <p>Operációs Rendszer: {tablet.opRendszer}</p>
            <p>Kijelző Méret: {tablet.kijelzoMeret} hüvelyk</p>
            <p>Kijelző Felbontás: {tablet.kijelzoFelbontas}</p>
            <p>RAM: {tablet.RAM} GB</p>
            <p>Leírás: {tablet.leiras}</p>
            <p>Ár: {tablet.ar} USD</p>
          </div>
        ) : (
          <p>No tablet data available</p>
        )}
      </div>
    </>
  );
}
