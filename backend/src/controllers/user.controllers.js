import { asyncHandler } from "../utils/asyncHandler.js";
import USERS from "../schemas/user.schema.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import NOTES from "../schemas/notes.schema.js";

const userSignUp = asyncHandler(async(req,res) => {
    console.log("requrest reached the signUp endpoint");
    const {userName , email , password} = req.body;
    if(!req.body || !userName || !email || !password) throw new ApiError(400,"Please provide the input fields");
    // checking if the user already exists
    const userExists = await USERS.findOne({
        email : email
    },{
        userName : 1, email : 1,
    });

    // if the user exists , we return saying user is already registered , please logIn again
    if(userExists) {
        return res.status(200).json(new ApiResponse(
            200,userExists,"User is already registered"
        ));
    } 


    const newUser = await USERS.create({
        userName : userName,
        email : email,  
        password : password      
    });


    if(!newUser) throw new ApiError(401,"Something went wrong while registering the employee");

    if(newUser) return res 
                .status(201)
                .json(new ApiResponse(201,newUser,"User created successfully"));


})



const userLogin = asyncHandler(async(req,res) => {
    if(!req.body) throw new ApiError(400,"Please provide the email adn password");
    const {email , password} = req.body;

    if(!email || !password) throw new ApiError(400,"Please provide the email and password");
    
    // have to check if the user exists and if the password matches or not
    const userExists = await USERS.findOne({
        email
    });

    if(!userExists) throw new ApiError(401,"User is not signed Up");

    // seeing if the password is correct
    const isPasswordCorrect = await userExists.isPasswordCorrect(password);

    if(!isPasswordCorrect) throw new ApiError(401,"Password is incorrect , please provide it again");

    

    const accessToken = await userExists.generateAccessToken();
    const refreshToken = await userExists.generateRefreshToken();


    const updatedUserwithRefreshToken = await USERS.findByIdAndUpdate({
        _id : userExists._id
    },{
        refreshToken : refreshToken
    },{new : true   
    });

    res.cookie("accessToken",accessToken,{
        httpOnly : true,
        secure : process.env.NODE_ENV == "production"
    });
    res.cookie("refreshToken",refreshToken,{
        httpOnly : true,
        secure : process.env.NODE_ENV == "production"
    });

    return res.status(200).json(new ApiResponse(200,updatedUserwithRefreshToken,"User loggedin Successfully"));
    
})



const createNotes = async(req,res) =>{
    const {title , description , resource } = req.body;
    if(!title) throw new ApiError(400,"Title is required to create a note");
    const userId = req.user._id;
    const newNote = await NOTES.create({
        userId : userId,
        title : title,
        description : description,
        resource : resource || ""
    });    
    
    return res.status(201).json(new ApiResponse(201,newNote,"Note created successfully"));
}


// Controller: Update an existing note by ID
// -------------------------------------------------------------
// This handler receives a note ID from the route parameter,
// validates it, filters allowed fields from the request body,
// and updates the note in MongoDB.
// -------------------------------------------------------------

const updateNotes = async (req, res) => {
  // Extract note ID from route parameters:  /update-note/:id
  const { id } = req.params;
  console.log("Updating note with id:", id);

  // If no ID is passed, stop immediately
  if (!id) throw new ApiError(400, "Note ID is required to update the note");

  // Only these fields are allowed to be updated — anything else is ignored
  const allowedUpdates = ["title", "description", "resource", "revisionStatus"];

  // Object to hold only valid fields from req.body
  const updates = {};

  // Loop through the incoming body fields
  Object.keys(req.body).forEach((field) => {
    // Add the field only if it’s allowed
    if (allowedUpdates.includes(field)) {
      updates[field] = req.body[field];
    }
  });

  // If no valid fields are passed, stop
  if (Object.keys(updates).length === 0) {
    throw new ApiError(
      400,
      "Please provide at least one valid field to update"
    );
  }

  // -------------------------------------------------------------
  // Update the note in MongoDB
  // Using findByIdAndUpdate:
  //   - First argument: the document ID
  //   - Second argument: what to update
  //   - Third argument: { new: true } returns the updated document
  // -------------------------------------------------------------
  const noteTobeEdited = await NOTES.findByIdAndUpdate(
    id,
    { $set: updates },
    { new: true }
  );

  // If no note was found with the given ID
  if (!noteTobeEdited) {
    throw new ApiError(404, `Unable to find the note with id ${id}`);
  }

  // Send back success response
  return res
    .status(200)
    .json(
      new ApiResponse(200, noteTobeEdited, "Note updated successfully")
    );
};


const getAllNotes = async (req, res) => {

  // `req.user` is attached by the auth middleware after verifying the JWT.
  // It contains the logged-in user's data ( _id, userName, email, etc )
  const user = req.user;

  // Query the NOTES collection and fetch only those documents
  // where the userId field matches the current user's _id.
  // This ensures users can access ONLY their own notes.
  const allNotes = await NOTES.find({
      userId: user._id
  })
  // Sort notes so that the newest note appears first.
  .sort({ createdAt: -1 });

  // Return a standardized success response
  return res.status(200).json(
    new ApiResponse(
      200,
      allNotes,
      `All notes for the user : ${user.userName} fetched successfully`
    )
  );
};




const deleteNote = async (req,res) => {
    const {id} = req.params;
    if(!id) throw new ApiError(401,"Please provide the id for deleting the note");

    const deletedNote = await NOTES.findByIdAndDelete({
        _id : id
    });

    if(!deletedNote) throw new ApiError(401,"Unable to delete the note at the moement");
    return res.status(200).json(new ApiResponse(200,deletedNote,"Note deleted successfully"));
}







export {userSignUp , userLogin , createNotes , updateNotes , getAllNotes , deleteNote };