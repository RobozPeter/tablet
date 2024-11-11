import { useEffect, useState } from "react";
import Menu from "./Menu";
import TabletComponent from "./Tablet";
import Card from "./card";
import './style.css';



export default function TabletLista() {
    const [tablets, setTablets] = useState<TabletComponent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [errorServer, setErrorServer] = useState<string>("");

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
         <div><Menu /></div>
            <div>
                <h2>Tabletek</h2>
                <table>

                    {tablets.map((tablet:TabletComponent) => (
                        <tr>

                            {Card(tablet)}
                        </tr>
                        
                    ))}
                    
                </table>
            </div>
        </>
    );
}
