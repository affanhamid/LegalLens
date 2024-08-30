import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyB0NpT_mft5OM6mfrs0MwOcBlTCR10Eu9I',
	authDomain: 'legallens-b6aca.firebaseapp.com',
	projectId: 'legallens-b6aca',
	storageBucket: 'legallens-b6aca.appspot.com',
	messagingSenderId: '413591903826',
	appId: '1:413591903826:web:36a89a77982bc08ed8898b',
	measurementId: 'G-49TYKPQ1TZ'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
