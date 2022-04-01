// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";

// Añade aquí tus credenciales
const firebaseConfig = {
    apiKey: "AIzaSyDkkRNuA9f3BKA57XL3vTpZuf69xjSHUuk",
    authDomain: "proyectofrontendeddi.firebaseapp.com",
    projectId: "proyectofrontendeddi",
    storageBucket: "proyectofrontendeddi.appspot.com",
    messagingSenderId: "67541018465",
    appId: "1:67541018465:web:32783548d0cc0f5029c720"
};

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export default firebaseApp;