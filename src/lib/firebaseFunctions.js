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
      // Check if the 'points' field exists and 'pointsRedeemed' is false
      if (userDoc.data().points !== undefined && userDoc.data().pointsRedeemed !== undefined) {
        return userDoc.data().points;
      } else {
        console.error("'points' field or 'pointsRedeemed' field not found in the user document");
        return 0; // or return a default value
      }
    } else {
      // User document does not exist, create a new document
      console.error('User document not found. Creating a new document.');

      // Create a new user document with initial values
      await setDoc(userRef, { points: 0, pointsRedeemed: false });

      return 0; // or return a default value
    }
  } catch (error) {
    console.error('Error getting points:', error.message);
    return 0;
  }
};

export const setRedeemStatus = async (userId, status) => {
  const userRef = doc(db, 'users', userId);

  try {
    await setDoc(userRef, { pointsRedeemed: status }, { merge: true });
  } catch (error) {
    console.error('Error setting redeem status:', error.message);
  }
};

export const getRedeemStatus = async (userId) => {
  const userRef = doc(db, 'users', userId);

  try {
    const userDoc = await getDoc(userRef);

    // Check if the user document exists
    if (userDoc.exists()) {
      // Check if the 'pointsRedeemed' field exists
      if (userDoc.data().pointsRedeemed !== undefined) {
        return userDoc.data().pointsRedeemed;
      } else {
        console.error("'pointsRedeemed' field not found in the user document");
        return false; // or return a default value
      }
    } else {
      // User document does not exist, create a new document
      console.error('User document not found. Creating a new document.');
      await setDoc(userRef, { pointsRedeemed: false });
      return false; // or return a default value
    }
  } catch (error) {
    console.error('Error getting redeem status:', error.message);
    return false;
  }
};
