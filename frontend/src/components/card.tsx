
import Tablet from './Tablet';
import './style.css';


function Card(tablet: Tablet) {
    const { id, ...tabletDetails } = tablet;

    return (
        <div className="card">
            {Object.entries(tabletDetails).map(([key, value]) => (
                <td key={key}><strong>{key}:</strong> {value}</td>
            ))}
        </div>
    );
}

export default Card;
