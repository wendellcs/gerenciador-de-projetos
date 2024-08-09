import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCeSk3iYLnV6R18OWkTXHGeCSqOd3syOG0",
  authDomain: "gerenciador-de-projetos-a659d.firebaseapp.com",
  projectId: "gerenciador-de-projetos-a659d",
  storageBucket: "gerenciador-de-projetos-a659d.appspot.com",
  messagingSenderId: "592023467683",
  appId: "1:592023467683:web:974a5a2e77353479447116"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };