import React, { useState } from 'react';
import { auth } from './FireBase'; // Importa o auth do Firebase
import { signInWithEmailAndPassword } from 'firebase/auth'; // Função para login
import { useNavigate } from 'react-router-dom'; // Para redirecionar o usuário
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Hook para redirecionar

  const handleSubmit = (e) => {
    e.preventDefault();

    // Autenticar o usuário com email e senha
    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        // Usuário autenticado com sucesso
        const user = userCredential.user;
        console.log('Login realizado:', user);

        // Redireciona para a página de upload de filmes
        navigate('/uploadmovie');
      })
      .catch((error) => {
        console.error('Erro ao fazer login:', error);
        setErrorMessage('Falha no login. Verifique suas credenciais.');
      });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="senha">Senha</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Exibe mensagem de erro */}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
