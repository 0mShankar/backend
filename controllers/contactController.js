const asyncHandler=require("express-async-handler");
const Contact=require("../models/contactModel");
// @desc Get all contacts
//@route Get /api/contacts
// @accesss public

const getContacts=asyncHandler(async(req,res)=>{
    const contacts=await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
})

// @descCreate New Contact
//@route Post /api/contacts
// @accesss public

const createContact=asyncHandler(async(req,res)=>{
    console.log("The request body is:", req.body);
    const{name,email,phone}=req.body;
    if(!name ||!email||!phone){
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    const contact=await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    })
    res.status(200).json(contact);
})

// @descCreate New Contact
//@route Post /api/contacts/:id
// @accesss public

const getContact=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
}
)
// @desc update Contact
//@route Put /api/contacts/:id
// @accesss public

const updateContact=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
   if(contact.user_id.toString()!==req.user.id){
    res.status(403);
    throw new Error("User don't have permission to update other user contact");
   }

    const updateContact=await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true}
    );
    res.status(200).json(updateContact);
})

// @desc Delete Contact
//@route Delete /api/contacts/:id
// @accesss public

const deleteContact=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update other user contact");
       }
    await Contact.deleteOne({_id:req.params.id});
    res.status(200).json(contact);
}
)



module.exports={getContacts, createContact, getContact, updateContact,deleteContact};