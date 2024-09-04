import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../utils/firebase";
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        setUser({ ...user, ...userDoc.data() });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  const register = async (email, password, firstName, lastName, role) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
        role,
      });

      return user;
    } catch (error) {
      console.error("Error registering new user:", error);
      throw error;
    }
  };

  const addPatient = async (patientData) => {
    if (!user) return;
    try {
      const docRef = await addDoc(collection(db, "patients"), {
        ...patientData,
        doctorId: user.uid,
      });
      return docRef.id;
    } catch (error) {
      console.error("Error adding patient:", error);
      throw error;
    }
  };

  const getPatients = async () => {
    if (!user) return [];
    try {
      const q = query(
        collection(db, "patients"),
        where("doctorId", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error getting patients:", error);
      throw error;
    }
  };

  const addAppointment = async (appointmentData) => {
    if (!user) return;
    try {
      const docRef = await addDoc(collection(db, "appointments"), {
        ...appointmentData,
        doctorId: user.uid,
        completed: false,
      });
      return docRef.id;
    } catch (error) {
      console.error("Error adding appointment:", error);
      throw error;
    }
  };

  const getAppointments = async () => {
    if (!user) return [];
    try {
      const q = query(
        collection(db, "appointments"),
        where("doctorId", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error getting appointments:", error);
      throw error;
    }
  };

  const completeAppointment = async (appointmentId) => {
    if (!user) return;
    try {
      await updateDoc(doc(db, "appointments", appointmentId), {
        completed: true,
      });
    } catch (error) {
      console.error("Error completing appointment:", error);
      throw error;
    }
  };

  const deleteAppointment = async (appointmentId) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, "appointments", appointmentId));
    } catch (error) {
      console.error("Error deleting appointment:", error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signOut,
    register,
    addPatient,
    getPatients,
    addAppointment,
    getAppointments,
    completeAppointment,
    deleteAppointment,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
