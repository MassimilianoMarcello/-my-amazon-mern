import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { token } = useParams();  // Usa useParams per ottenere il token direttamente dalla URL
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5004/api';
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Controlla che le password corrispondano
    if (newPassword !== confirmPassword) {
      setError('Le password non corrispondono');
      return;
    }

    try {
      // Invia la nuova password al server con il token
      await axios.post(
        `${apiUrl}/auth/reset-password/${token}`,
        { newPassword }
      );
      
      // Mostra un messaggio di successo
      setSuccess('Password aggiornata con successo!');
      
      // Dopo un po', naviga all'area di login
      setTimeout(() => navigate('/login'), 2000);
      
    } catch (err) {
      // Gestisci eventuali errori, mostrando il messaggio dell'errore
      const errorMessage = err.response ? err.response.data.message : 'Errore nel recupero della password, prova di nuovo.';
      setError(errorMessage);
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="newPassword">Nuova Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword">Conferma Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Resetta Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;

