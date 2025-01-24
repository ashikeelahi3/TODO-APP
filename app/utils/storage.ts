import AsyncStorage from "@react-native-async-storage/async-storage";
import {Note} from "../state/notes/types"

const NOTES_KEY = "@notes";

export const NoteService = {
  async getNotes(): Promise<Note[]> {
    const notes = await AsyncStorage.getItem(NOTES_KEY);
    return notes? JSON.parse(notes) : [];
  },

  async addNote(note: Note): Promise<void> {
    const notes = await this.getNotes();
    const updatedNotes = [note, ...notes];
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes));
  },
  
  async updateNote(updatedNote: Note): Promise<void> {
    const notes = await this.getNotes();
    const updatedNotes = notes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes));
  },

  async deleteNote(noteId: string): Promise<void> {
    const notes = await this.getNotes();
    const updatedNotes = notes.filter((note) => note.id!== noteId);
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes));
  },
}