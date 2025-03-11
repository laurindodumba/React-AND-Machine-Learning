import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [ticker, setTicker] = useState('');
    const [imageUrl, setImageUrl] = useState(''); // Estado para armazenar a imagem
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setImageUrl(''); // Limpa a imagem antes de carregar uma nova

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/predict/', {
                ticker: ticker
            });

            console.log(response.data);
            setImageUrl(`http://127.0.0.1:8000${response.data.image_url}`); // Define a URL da imagem
        } catch (error) {
            console.error('Erro ao buscar previsão:', error);
            setError('Erro ao buscar a previsão. Verifique o ticker e tente novamente.');
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Digite a ação para prever"
                            value={ticker}
                            onChange={(e) => setTicker(e.target.value)}
                            required
                        />
                        <button type="submit" className="btn btn-info mt-3">Ver Previsão</button>
                    </form>

                    {error && <p className="text-danger mt-3">{error}</p>}

                    {imageUrl && (
                        <div className="mt-4">
                            <h3>Previsão para {ticker}</h3>
                            <img src={imageUrl} alt="Gráfico da previsão" className="img-fluid" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
