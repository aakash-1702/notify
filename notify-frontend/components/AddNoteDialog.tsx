"use client";

import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
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
import { toast } from "sonner";

interface AddNoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNoteCreated: () => void;

}

const AddNoteDialog = ({ open, onOpenChange , onNoteCreated }: AddNoteDialogProps) => {
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    resource: "",
    revisionStatus: "pending",
  });

  

  

  const handleSubmit = async () => {
    console.log("Note data:", formData);
    if(!formData.title.trim()){
    toast.error("Title not given",{
        description : "Please provide the title"
    })
    return;
  }
    // Add your API call here to save the note
    const res = await fetch("http://localhost:5151/api/v1/users/create-note", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // 🔑 Required for cookie auth
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if(!res.ok){
        toast.error("Notes creation failed",{
            description : data.message || "Something went wrong"
        });
        return;
    }

    toast.success("Note added",{
        description : data.message || "Note created successfully"
    });

    onNoteCreated();

    
    
    onOpenChange(false);
    // Reset form
    setFormData({
      title: "",
      description: "",
      resource: "",
      revisionStatus: "pending",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] border-2 border-emerald-200/50 dark:border-emerald-800/50">
        {/* Top gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>

        <DialogHeader className="pt-2">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
            Add New Note
          </DialogTitle>
          <DialogDescription>
            Create a new note with all the details
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Title Field */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter note title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="border-2 focus:border-emerald-500 dark:focus:border-emerald-400"
            />
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter note description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="border-2 focus:border-emerald-500 dark:focus:border-emerald-400 min-h-[100px]"
            />
          </div>

          {/* Resource Link Field */}
          <div className="space-y-2">
            <Label htmlFor="resource">Resource Link</Label>
            <Input
              id="resource"
              type="url"
              placeholder="https://example.com"
              value={formData.resource}
              onChange={(e) =>
                setFormData({ ...formData, resource: e.target.value })
              }
              className="border-2 focus:border-emerald-500 dark:focus:border-emerald-400"
            />
          </div>

          {/* Confidence Status Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="status">Revision Status</Label>
            <Select
              value={formData.revisionStatus}
              onValueChange={(value) =>
                setFormData({ ...formData, revisionStatus: value })
              }
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

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-2"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
          >
            Add Note
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddNoteDialog;
