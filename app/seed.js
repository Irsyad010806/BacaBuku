// seed.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBHsOGIHsWIcHTiRnAaYauHEEOQaHzOjjk",
  authDomain: "bacabukuapp.firebaseapp.com",
  projectId: "bacabukuapp",
  storageBucket: "bacabukuapp.firebasestorage.app",
  messagingSenderId: "170249844744",
  appId: "1:170249844744:web:81ed69c0d850ea0eb739bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app};
export default function BukuList() {
  const [buku, setBuku] = useState([]);

const seed = async () => {
  try {
    const bukuList = [
      {
        judul: 'Matematika SMK Kelas 10',
        pengarang: 'Kemendikbud',
        fileUrl: 'https://contoh.com/matematika.pdf'
      },
      {
        judul: 'Bahasa Indonesia SMK Kelas 10',
        pengarang: 'Kemendikbud',
        fileUrl: 'https://contoh.com/indonesia.pdf'
      }
      // Tambahkan buku lainnya di sini
    ];

    for (const buku of bukuList) {
      await addDoc(collection(db, 'buku'), {
        ...buku,
        createdAt: new Date()
      });
      console.log(`✔ Buku "${buku.judul}" berhasil ditambahkan`);
    }
  } catch (e) {
    console.error('❌ Gagal input data:', e);
  }
};
}
