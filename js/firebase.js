// ─── Firebase ─────────────────────────────────────────────────────────────────
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD2ruf_InPdRoTIiT2cXM6Dy9YpC2UCKmk",
  authDomain: "sorteio-do-amor.firebaseapp.com",
  projectId: "sorteio-do-amor",
  storageBucket: "sorteio-do-amor.firebasestorage.app",
  messagingSenderId: "1072943347181",
  appId: "1:1072943347181:web:0b115d28f22f52e7faa3e4"
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

const DOC_REF = doc(db, "config", "senhas");

export async function carregarSenhas() {
  try {
    const snap = await getDoc(DOC_REF);
    if (snap.exists()) return snap.data();
    return null;
  } catch (e) {
    console.error("Erro ao carregar senhas:", e);
    return null;
  }
}

export async function salvarSenhasFirebase(senhas) {
  try {
    await setDoc(DOC_REF, senhas);
  } catch (e) {
    console.error("Erro ao salvar senhas:", e);
  }
}
