import { useState } from "react";

export default function useNotes() {
  const [notes, setNotes] = useState([]);
  return { notes, setNotes };
}
