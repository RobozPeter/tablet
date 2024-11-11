import { useEffect, useState } from "react";
import Menu from "./Menu";
import  Tablet  from "./Tablet";
import card from "./card";
import './style.css';

export default function TabletTorles() {
    const [tablets, setTablets] = useState<Tablet[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [errorServer, setErrorServer] = useState<string>("");

    async function handleDeleteTablet(id: number) {
        await fetch(`http://localhost:3000/tablets/${id}`, {
            method: 'DELETE'
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Server responded with status ${response.status}`);
            }
            return response.json();
        })
        .then(() => {
            setTablets(tablets.filter((tablet) => tablet.id !== id));
        })
        .catch((error) => {
            setError(error.message);
        });
    }

    useEffect(() => {
        fetch('http://localhost:3000/tablets')
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
                setTablets(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

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
         <Menu/>
            <div>
                <h2>Tabletek törlése</h2>

                <table>
                    {tablets.map((tablet) => (
                        

                        <tr style={{display:"flex"}} key={tablet.id}>
                            {card(tablet)}
                            <span
                                style={{ color: 'red', cursor: 'pointer' }}
                                onClick={() => handleDeleteTablet(tablet.id)}
                                >
                                törlés
                            </span>
                        </tr>
                            
                    ))}
                </table>
            </div>
        </>
    );
}
