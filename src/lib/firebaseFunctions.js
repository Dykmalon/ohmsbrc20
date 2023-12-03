// lib/firebaseFunctions.js
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export const addPoints = async (userId, points) => {
  const userRef = doc(db, 'users', userId);

  try {
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      // User already exists in the database
      const currentPoints = userDoc.data().points || 0;
      await setDoc(userRef, { points: currentPoints + points }, { merge: true });
    } else {
      // User does not exist in the database, create a new document
      await setDoc(userRef, { points });
    }
  } catch (error) {
    console.error('Error adding points:', error.message);
  }
};

export const getPoints = async (userId) => {
  const userRef = doc(db, 'users', userId);

  try {
    const userDoc = await getDoc(userRef);

    // Check if the user document exists
    if (userDoc.exists()) {
      // Check if the 'points' field exists
      if (userDoc.data().points !== undefined) {
        return userDoc.data().points;
      } else {
        console.error("'points' field not found in the user document");
        return 0; // or return a default value
      }
    } else {
      // User document does not exist, create a new document
      console.error('User document not found. Creating a new document.');
      await setDoc(userRef, { points: 0 });
      return 0; // or return a default value
    }
  } catch (error) {
    console.error('Error getting points:', error.message);
    return 0;
  }
};
