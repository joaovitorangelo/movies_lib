import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"; // Importar o Storage
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth"; // Importar o Auth

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD5ABuLuSr_8pBUaeMMisIpNzYcIG49LCA",
  authDomain: "movies-fd75c.firebaseapp.com",
  projectId: "movies-fd75c",
  storageBucket: "movies-fd75c.appspot.com",
  messagingSenderId: "616780436611",
  appId: "1:616780436611:web:d3e677dc74c6ba578677b6",
  measurementId: "G-GGH7GCXWE4",
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app); // Inicializar o Storage
const database = getDatabase(app);
const auth = getAuth(app); // Inicializar o Auth

export { storage, database, auth }; // Exportar o Auth
