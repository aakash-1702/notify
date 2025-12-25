"use client";

import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import NoteCard from "@/components/Cards";
import { toast } from "sonner";
import AddNoteDialog from "@/components/AddNoteDialog";
import EditNoteDialog from "@/components/EditNoteDialog";

interface Note {
  _id: string;
  title: string;
  description: string;
  resource?: string;
  revisionStatus: string;
}
// Main Notes Page
const NotesPage = () => {
  // Example data structure - replace with your API data
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const handleEdit = async (note: any) => {
    setSelectedNote(note);
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (id: string | number) => {
    console.log("Delete note:", id);
    const res = await fetch(
      `http://localhost:5151/api/v1/users/delete-note/${id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // 🔑 Required for cookie auth
      }
    );

    const data = await res.json();
    if(!res.ok){
        toast.error("Failed to delete note", {
            description : data.message || "Unable to delete note"
        });
        return; 
    }

    toast.success("Note deleted", {
        description : data.message || "Note deleted successfully"
    });

    setNotes((prev) => prev.filter((note) => note._id !== id));

  };

  const fetchNotes = async () => {
    setIsLoading(true);
    const res = await fetch("http://localhost:5151/api/v1/users/get-notes", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      toast.error("Session Expired", {
        description: data.message || "Please log-in again",
      });
      setIsLoading(false);
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
      return;
    }

    setNotes(data.data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="pt-25 min-h-screen bg-gradient-to-br from-emerald-50/30 via-teal-50/50 to-cyan-50/30 dark:from-slate-900 dark:via-emerald-950/50 dark:to-teal-950/40">
      {/* Main Content Container - Aligned with navbar width */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
            My Notes
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage and organize your notes
          </p>
        </div>

        {/* Notes Container - Flex layout with wrap */}
        <div className="flex flex-wrap gap-6">
          {/* Map through your notes data */}
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {/* Empty State - Show when no notes */}
        {notes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900 dark:to-teal-900 flex items-center justify-center mb-4">
              <Plus className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">
              No notes yet
            </h3>
            <p className="text-sm text-muted-foreground">
              Click the + button to create your first note
            </p>
          </div>
        )}
      </div>

      {/* Floating Add Note Button - Bottom Right */}
      <Button
        onClick={() => setIsDialogOpen(true)}
        className="fixed bottom-8 right-8 h-14 w-14 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-2xl hover:shadow-emerald-500/50 hover:scale-110 transition-all duration-200"
        size="icon"
      >
        <Plus className="h-6 w-6" />
      </Button>
      <AddNoteDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onNoteCreated={fetchNotes}
      />
      <EditNoteDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        note={selectedNote}
        onNoteUpdated={fetchNotes}
      />
    </div>
  );
};

export default NotesPage;
