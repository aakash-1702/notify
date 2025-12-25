"use client";

import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Note {
  _id: string;
  title: string;
  description: string;
  resource?: string;
  revisionStatus: string;
}

interface EditNoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  note: Note | null;
  onNoteUpdated: () => void; // Add this callback
}

const EditNoteDialog = ({
  open,
  onOpenChange,
  note,
  onNoteUpdated,
}: EditNoteDialogProps) => {
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    resource: "",
    revisionStatus: "pending",
  });
  const [isLoading, setIsLoading] = React.useState(false);

  // Pre-fill form when note changes
  React.useEffect(() => {
    if (note) {
      setFormData({
        title: note.title,
        description: note.description,
        resource: note.resource || "",
        revisionStatus: note.revisionStatus,
      });
    }
  }, [note]);

  const handleSubmit = async () => {
    if (!note) return;

    setIsLoading(true);

    try {
      const res = await fetch(
        `https://notely-backend-9bno.onrender.com/api/v1/users/update-note/${note._id}`,
        {
          method: "PATCH", // or 'PATCH' depending on your API
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        if (
          res.status === 401 ||
          data.message?.toLowerCase().includes("login")
        ) {
          toast.error("Session expired", {
            description: "Please login again",
          });

          setTimeout(() => {
            window.location.href = "/login";
          }, 1500);

          return true;
        }
        toast.error("Update failed", {
          description: data.message || "Unable to update the note",
        });
        setIsLoading(false);
        return;
      }

      toast.success("Note updated successfully!", {
        description: "Your changes have been saved",
      });

      onNoteUpdated(); // Refresh the notes list
      onOpenChange(false);
    } catch (error) {
      toast.error("Something went wrong", {
        description: "Please try again later",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!note) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] border-2 border-emerald-200/50 dark:border-emerald-800/50">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>

        <DialogHeader className="pt-2">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
            Edit Note
          </DialogTitle>
          <DialogDescription>Update your note details</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title">Title</Label>
            <Input
              id="edit-title"
              placeholder="Enter note title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="border-2 focus:border-emerald-500 dark:focus:border-emerald-400"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              placeholder="Enter note description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="border-2 focus:border-emerald-500 dark:focus:border-emerald-400 min-h-[100px]"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-resource">Resource Link</Label>
            <Input
              id="edit-resource"
              type="url"
              placeholder="https://example.com"
              value={formData.resource}
              onChange={(e) =>
                setFormData({ ...formData, resource: e.target.value })
              }
              className="border-2 focus:border-emerald-500 dark:focus:border-emerald-400"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-status">Revision Status</Label>
            <Select
              value={formData.revisionStatus}
              onValueChange={(value) =>
                setFormData({ ...formData, revisionStatus: value })
              }
              disabled={isLoading}
            >
              <SelectTrigger className="border-2 focus:border-emerald-500 dark:focus:border-emerald-400">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="to-revise-again">To Revise Again</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-2"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditNoteDialog;
