import express, { Router } from "express";
import {
  userSignUp,
  userLogin,
  createNotes,
  updateNotes,
  getAllNotes,
  deleteNote,
} from "../controllers/user.controllers.js";
import authenticatedUser from "../middlewares/auth.middlewares.js";
const userRouter = Router();

// for non authenticated user only
userRouter.post("/signUp", userSignUp);
userRouter.post("/login", userLogin);

// for authenticated users
userRouter.post("/create-note", authenticatedUser, createNotes);
userRouter.patch("/update-note/:id", authenticatedUser, updateNotes);
userRouter.get("/get-notes", authenticatedUser, getAllNotes);
userRouter.delete("/delete-note/:id", authenticatedUser, deleteNote);

export { userRouter };
