import React, { useState, useRef, useEffect } from 'react';
import { storage, database, auth } from '../components/FireBase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { set, ref as dbRef } from 'firebase/database';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // para redirecionar

import "./uploadmovie.css";

const UploadMovie = () => {
  const [movieName, setMovieName] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false); // Estado para loading
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Para verificar login
  const containerRef = useRef(null); // Cria uma referência
  const navigate = useNavigate(); // Hook para redirecionar

  useEffect(() => {
    // Verifica se o usuário está autenticado
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true); // Usuário está autenticado
      } else {
        setIsAuthenticated(false); // Usuário não está autenticado
        navigate('/login'); // Redireciona para a página de login
      }
    });
  }, [navigate]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert("Por favor, escolha um arquivo para fazer o upload.");
      return;
    }

    const storageRef = ref(storage, `movies/${file.name}`);
    setLoading(true); // Inicia o loading

    try {
      // Fazendo o upload do arquivo
      await uploadBytes(storageRef, file);

      // Obtendo a URL do arquivo
      const fileURL = await getDownloadURL(storageRef);
      
      // Referência ao Realtime Database
      const movieRef = dbRef(database, 'movies/' + Date.now());

      // Inserindo os dados no Realtime Database
      await set(movieRef, {
        href: fileURL,
        title: movieName,
      });

      setMovieName(''); // Limpando o nome do filme
      setFile(null); // Limpando o arquivo
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
      alert("Falha ao fazer upload.");
    } finally {
      setLoading(false); // Para o loading após o upload
    }
  };

  useEffect(() => {
    if (containerRef.current) { // Verifica se o elemento existe
      if (loading) {
        containerRef.current.classList.add('loading-active');
      } else {
        containerRef.current.classList.remove('loading-active');
      }
    }
  }, [loading]);

  return (
    <div className='form-upload-container'>
      {loading && <div className="loading">Carregando <AiOutlineLoading3Quarters className='circle' /></div>} {/* Exibe o loading */}
      <form ref={containerRef} onSubmit={handleSubmit}>
        <label htmlFor="movie_name">Nome oficial do filme:</label>
        <input
          type="text"
          name="movie_name"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
        />
        <label className='upload-label' htmlFor="movie_archive">Selecionar filme</label>
        <input className='upload-input' type="file" name="movie_archive" id='movie_archive' onChange={handleFileChange} />
        <button type="submit">Fazer upload</button>
      </form>
    </div>
  );
};

export default UploadMovie;
