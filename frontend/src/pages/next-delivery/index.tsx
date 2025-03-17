import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { apiServerHost } from '../../config';
import { Greeting } from '../../../../shared/types';
import './styles.css';

function NextDelivery() {
    let { userId } = useParams();  
    const [greeting, setGreeting] = useState<Greeting>();

    useEffect(() => {
        fetch(`${apiServerHost}/comms/your-next-delivery/${userId}`)
        .then((response) => response.json())
        .then((data: Greeting) => {
            setGreeting(data);
        })
        .catch((error) => console.error('Error fetching data:', error));
    }, [userId]);

    return (
        <div className="card__container">
            <img className='card__tiny-image' src="/cute-cat.jpg" alt="Cat image"/>
            <div className='card__large-image'>
                <img  src="/cute-cat.jpg" alt="Cat image"/>
            </div>
            <div className="card__info-wrapper">
                <div className="card__title">{greeting?.title}</div>
                <div className="card__message">{greeting?.message}</div>
                <div className="card__total-price">Total price: £{greeting?.totalPrice.toFixed(2)}</div>
                <div className="card__actions">
                    <button className="card__button" aria-label="See delivery details">SEE DETAILS</button>
                    <button className="card__button card__button--inverted" aria-label="Edit delivery details">EDIT DELIVERY</button>
                </div>
                {greeting?.freeGift? <div className="card__free-gift">FREE GIFT</div>:""}
            </div>
        </div>
    );
}
export default NextDelivery;