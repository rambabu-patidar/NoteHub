import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { FirebaseApp } from "utils/firebase";

export class NoteAPI {
  static async create(formValues) {
    const response = await addDoc(
      collection(FirebaseApp.db, "notes"),
      formValues
    );
    return {
      id: response.id,
      ...formValues,
    };
  }

  static async fetchAll() {
    const q = query(
      collection(FirebaseApp.db, "notes"),
      orderBy("created_at", "asc")
    );
    const response = await getDocs(q);
    return response.docs.map((document) => {
      return {
        id: document.id,
        ...document.data(),
      };
    });
  }
  static async deleteById(noteId) {
    deleteDoc(doc(FirebaseApp.db, "notes", noteId));
  }
  static async updateById(id, values) {
    const query = doc(FirebaseApp.db, "notes", id);
    await updateDoc(query, values);
    return {
      id,
      ...values,
    };
  }

  static onShouldSyncNotes(onChange) {
    const q = query(collection(FirebaseApp.db, "notes"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const isUserPerformingChange = querySnapshot.metadata.hasPendingWrites;
      if (!isUserPerformingChange) {
        console.log("You are not synced with the notes collection");
        onChange();
      }
    });
    return unsub;
  }
}
// This module handles CRUD (Create, Read, Update, Delete) operations related to notes using Firebase Firestore.
// It imports necessary functions from Firebase Firestore and the utils/firebase module.
// The create method creates a new note by calling the addDoc function and passing the formValues (note data) and
// the Firestore collection reference. 
//It returns the created note's ID and other form values.
// The fetchAll method fetches all notes from the Firestore database. It creates a query with the collection and orderBy functions 
//to retrieve notes sorted by the "created_at" field in ascending order. It then returns an array of note objects with their IDs and data.
// The deleteById method deletes a note with a specific ID by calling the deleteDoc function and passing the Firestore document reference.
// The updateById method updates a note with a specific ID by calling the updateDoc function and passing the Firestore document 
//reference and the updated values. It returns the updated note's ID and values.
// The onShouldSyncNotes method sets up a listener using the onSnapshot function on the Firestore collection "notes". 
//It checks if the user is not performing any changes (i.e., no pending writes) and logs a message and invokes the onChange callback if this condition is met.
// It returns an unsubscribe function to stop listening to changes.
// The code starts with the import of necessary functions from Firebase Firestore (firebase/firestore) 
//and the FirebaseApp module from utils/firebase.
// The NoteAPI class is exported, encapsulating methods related to note operations.
// The create method creates a new note. 
//It calls the addDoc function, passing the Firestore collection reference and the formValues (note data) as parameters. 
//It awaits the response and returns an object with the created note's ID and the original form values.
// The fetchAll method fetches all notes from the Firestore database. 
//It creates a query using the collection and orderBy functions, 
//specifying the "notes" collection and sorting the results by the "created_at" field in ascending order. 
//It then awaits the response from getDocs and transforms the response documents into an array of note objects, including their IDs and data.
// The deleteById method deletes a note with a specific ID. It calls the deleteDoc function,
// passing the Firestore document reference created with doc and the "notes" collection and the noteId as parameters.
// The updateById method updates a note with a specific ID. 
//It creates a Firestore document reference using doc, the "notes" collection, and the id.
// It then calls the updateDoc function, passing the document reference and the values to be updated. Finally, 
//it returns an object containing the updated note's ID and values.
// The onShouldSyncNotes method sets up a listener using the onSnapshot function on the Firestore collection "notes".
// It creates a query using the collection function. Within the listener,
// it checks if the user is not performing any changes by checking querySnapshot.metadata.hasPendingWrites.
//If there are no pending writes (indicating changes made by other users), it logs a message and invokes the onChange callback function. 
//It returns an unsubscribe function that can be used to stop listening to changes.