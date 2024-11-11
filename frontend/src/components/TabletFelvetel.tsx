import { useState } from "react";
import Menu from "./Menu";
import './style.css';

export default function TabletFelvetel() {
    const [Nev, setNev] = useState<string>('');
    const [opRendszer, setOpRendszer] = useState<string>('');
    const [procOrajel, setProcOrajel] = useState<number | ''>('');
    const [procMagok, setProcMagok] = useState<number | ''>('');
    const [kijelzoMeret, setKijelzoMeret] = useState<number | ''>('');
    const [kijelzoFelbontas, setKijelzoFelbontas] = useState<string>('');
    const [RAM, setRAM] = useState<number | ''>('');
    const [leiras, setLeiras] = useState<string>('');
    const [ar, setAr] = useState<number | ''>('');
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const newTablet = {
            Nev,
            opRendszer,
            procOrajel: Number(procOrajel),
            procMagok: Number(procMagok),
            kijelzoMeret: Number(kijelzoMeret),
            kijelzoFelbontas,
            RAM: Number(RAM),
            leiras,
            ar: Number(ar)
        };

        try {
            const response = await fetch('http://localhost:3000/tablets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTablet)
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error);
                throw new Error(`Hiba történt: ${response.status}`);
            }

            setSuccess(true);
            setNev('');
            setOpRendszer('');
            setProcOrajel('');
            setProcMagok('');
            setKijelzoMeret('');
            setKijelzoFelbontas('');
            setRAM('');
            setLeiras('');
            setAr('');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <>
        <Menu/>
            <h2>Tablet Felvétele</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Név:</p>
                    <input
                        type="text"
                        value={Nev}
                        onChange={(e) => setNev(e.target.value)}
                    />
                </label>
                <label>
                    <p>Operációs Rendszer:</p>
                    <input
                        type="text"
                        value={opRendszer}
                        onChange={(e) => setOpRendszer(e.target.value)}
                    />
                </label>
                <label>
                    <p>Processzor Órajel (GHz):</p>
                    <input
                        type="number"
                        value={procOrajel}
                        onChange={(e) => setProcOrajel(parseInt(e.target.value))}
                    />
                </label>
                <label>
                    <p>Processzor Magok:</p>
                    <input
                        type="number"
                        value={procMagok}
                        onChange={(e) => setProcMagok(parseInt(e.target.value))}
                    />
                </label>
                <label>
                    <p>Kijelző Méret (hüvelyk):</p>
                    <input
                        type="number"
                        value={kijelzoMeret}
                        onChange={(e) => setKijelzoMeret(parseFloat(e.target.value))}
                    />
                </label>
                <label>
                    <p>Kijelző Felbontás:</p>
                    <input
                        type="text"
                        value={kijelzoFelbontas}
                        onChange={(e) => setKijelzoFelbontas(e.target.value)}
                    />
                </label>
                <label>
                    <p>RAM (GB):</p>
                    <input
                        type="number"
                        value={RAM}
                        onChange={(e) => setRAM(parseInt(e.target.value))}
                    />
                </label>
                <label>
                    <p>Leírás:</p>
                    <textarea
                        value={leiras}
                        onChange={(e) => setLeiras(e.target.value)}
                    />
                </label>
                <label>
                    <p>Ár (USD):</p>
                    <input
                        type="number"
                        value={ar}
                        onChange={(e) => setAr(parseFloat(e.target.value))}
                    />
                </label>
                <br />
                <br />
                <button type="submit">Tablet Felvétele</button>
                {error && <p>{error}</p>}
                {success && <p>Sikeresen megtörtént a tablet felvétele.</p>}
            </form>
        </>
    );
} 
