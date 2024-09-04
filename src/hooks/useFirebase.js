import { useState, useEffect } from "react";
import { auth, db } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

export function useFirebase() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const addPatient = async (patientData) => {
    if (!user) return;
    const patientRef = doc(db, "patients", patientData.id);
    await setDoc(patientRef, patientData);
  };

  const addAppointment = async (appointmentData) => {
    if (!user) return;
    const appointmentRef = doc(db, "appointments", appointmentData.id);
    await setDoc(appointmentRef, appointmentData);
  };

  const shareRecord = async (patientId, friendId) => {
    if (!user) return;
    const patientRef = doc(db, "patients", patientId);
    await updateDoc(patientRef, {
      sharedWith: arrayUnion(friendId),
    });
  };

  return { user, addPatient, addAppointment, shareRecord };
}
