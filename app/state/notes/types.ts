export interface Note {
  id: string; // Unique ID for each note
  title: string;
  description: string;
  createdAt: string; // Timestamp for when the note was created
  updatedAt: string; // Timestamp for the last update
}
