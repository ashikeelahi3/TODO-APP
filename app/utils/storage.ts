import AsyncStorage from "@react-native-async-storage/async-storage";
import {Note} from "../state/notes/types"

const NOTES_KEY = "@notes";

export const NoteService = {
  async getNotes(): Promise<Note[]> {
    try{
      const notes = await AsyncStorage.getItem(NOTES_KEY);
      return notes? JSON.parse(notes) : [];
    } catch(error){
      console.error("Failed to fetch notes:", error);
      throw new Error("Could not load notes. Please try again.");
    }
  },

  async addNote(note: Note): Promise<void> {
    try {
      const notes = await this.getNotes();
      const updatedNotes = [note, ...notes];
      await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes));
    } catch(error){
      console.error("Failed to save note:", error);
      throw new Error("Could not save the note. Please try again.");
    }
  },
  
  async updateNote(updatedNote: Note): Promise<void> {
    try {
      const notes = await this.getNotes();
      const updatedNotes = notes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      );
      await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes));
    } catch(error) {
      console.error("Failed to update note:", error);
      throw new Error("Could not update the note. Please try again.");
    }
  },

  async deleteNote(noteId: string): Promise<void> {
    try {
      const notes = await this.getNotes();
      const updatedNotes = notes.filter((note) => note.id!== noteId);
      await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes));
    } catch(error) {
      console.error("Failed to delete note:", error);
      throw new Error("Could not delete the note. Please try again.");
    }
  },
}