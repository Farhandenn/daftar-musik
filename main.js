
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// ===== Config =====
const firebaseConfig = {
  apiKey: "AIzaSyDf84tuPbEIrQ4b2jcU0MeXjg4OY3kE-yU",
  authDomain: "insancemerlang-7c3fb.firebaseapp.com",
  projectId: "insancemerlang-7c3fb",
  storageBucket: "insancemerlang-7c3fb.firebasestorage.app",
  messagingSenderId: "775357332019",
  appId: "1:775357332019:web:25b794ac39eceb84f00146",
  measurementId: "G-2T6Q5VM932"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const musikCollection = collection(db, "musik");



// TAMPILKAN DAFTAR MUSIK
export async function daftarmusik() {
  const snapshot = await getDocs(musikCollection);
  const tabel = document.getElementById("tabelData");
  tabel.innerHTML = "";

  snapshot.forEach((d) => {
    const data = d.data();
    const id = d.id;

    const baris = document.createElement("tr");

    const kolomJudul = document.createElement("td");
    kolomJudul.textContent = data.judul;

    const kolomArtis = document.createElement("td");
    kolomArtis.textContent = data.artis;

    const kolomGenre = document.createElement("td");
    kolomGenre.textContent = data.genre;

    const kolomAksi = document.createElement("td");

    // tombol edit
    const tombolEdit = document.createElement("a");
    tombolEdit.textContent = "Edit";
    tombolEdit.href = "edit.html?id=" + id;
    tombolEdit.className = "button edit";

    // tombol hapus
    const tombolHapus = document.createElement("button");
    tombolHapus.textContent = "Hapus";
    tombolHapus.onclick = () => hapusmusik(id);

    kolomAksi.appendChild(tombolEdit);
    kolomAksi.appendChild(document.createTextNode(" "));
    kolomAksi.appendChild(tombolHapus);

    baris.appendChild(kolomJudul);
    baris.appendChild(kolomArtis);
    baris.appendChild(kolomGenre);
    baris.appendChild(kolomAksi);

    tabel.appendChild(baris);
  });
}


// TAMBAH MUSIK

export async function tambahmusik() {
  const judul = document.getElementById("judul").value;
  const artis = document.getElementById("artis").value;
  const genre = document.getElementById("genre").value;

  await addDoc(musikCollection, {
    judul: judul,
    artis: artis,
    genre: genre
  });

  window.location.href = "daftar.html";
}



// HAPUS MUSIK

export async function hapusmusik(id) {
  if (!confirm("Yakin ingin menghapus data ini?")) return;

  await deleteDoc(doc(db, "musik", id));
  await daftarmusik();
}


// AMBIL DATA MUSIK
export async function ambildatamusik(id) {
  const ref = doc(db, "musik", id);
  const snap = await getDoc(ref);
  return snap.data();
}



// UBAH DATA MUSIK

export async function ubahdatamusik(id) {
  const judul = document.getElementById("judul").value;
  const artis = document.getElementById("artis").value;
  const genre = document.getElementById("genre").value;

  await updateDoc(doc(db, "musik", id), {
    judul: judul,
    artis: artis,
    genre: genre
  });

  window.location.href = "daftar.html";
}
 const musik = document.getElementById("musik");