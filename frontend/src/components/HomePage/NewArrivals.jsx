import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../Product/ProductCard'; // Assumendo che ProductCard funzioni correttamente
import './NewArrivals.css';

const NewArrivals = () => {
    const [products, setProducts] = useState([]); // Stato per i prodotti
    const [loading, setLoading] = useState(true); // Stato per il caricamento
    const [error, setError] = useState(null); // Stato per gli errori

    // URL API
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5004/api';

    useEffect(() => {
        const fetchNewArrivals = async () => {
            try {
                // Effettua la chiamata API
                const response = await axios.get(`${apiUrl}/products/this-products/new-arrivals`);
                
                // Imposta i dati ricevuti nello stato
                if (Array.isArray(response.data)) {
                    setProducts(response.data);
                } else {
                    throw new Error('La risposta del server non è valida.');
                }
            } catch (err) {
                // Gestione errori
                console.error('Errore durante il fetch:', err);
                setError(err.message || 'Errore sconosciuto');
            } finally {
                // Disattiva lo stato di caricamento
                setLoading(false);
            }
        };

        fetchNewArrivals();
    }, [apiUrl]);

    // Mostra il caricamento
    if (loading) {
        return <p>Caricamento in corso...</p>;
    }

    // Mostra eventuali errori
    if (error) {
        return <p>Errore: {error}</p>;
    }

    // Mostra i prodotti
    return (
        <div className="new-arrivals">
            <h2>Nuovi Arrivi</h2>
            <div className="products-grid">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id || Math.random()}>
                            <ProductCard product={product} variant="new-arrivals-cards" />
                        </div>
                    ))
                ) : (
                    <p>Non ci sono nuovi arrivi al momento.</p>
                )}
            </div>
        </div>
    );
};

export default NewArrivals;

