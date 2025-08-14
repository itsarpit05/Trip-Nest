import { Property } from "../models/property.models.js";
  


// creating a property
export const createProperty = async(req,res)=>{
   try {
        const property = new Property({
            title,
            description,
            address,
            pricePerNight,
            images,
            amenities,
            maxGuests, // The amenities array will now be correctly included
            owner: req.user.id
        }); // owner is automatically sent from req.user.id
       await property.save() // saves this created property in mongoDB
       res
       .status(201)
       .json(property)    // responds with the created property
   } catch (error) {
       res
       .status(400)
       .json({error:error.message})
   }
}


// Read all properties

export const getAllProperties = async(req,res)=>{

    try {
        const properties = await Property.find().populate("owner","name email")   // finds all the properties saved in db
        res.json(properties)    // responds with those properties
    } catch (error) {
        res
        .status(500)
        .json({error:error.message})
    }
}

// Read one property

export const findProperty = async(req,res)=>{
    try {
        const property = await Property.findById(req.params.id).populate("owner","name email")
        if(!property){
           return res
           .status(400)
           .json({msg:"Property not found"})
        }

        res.json(property)
    } catch (error) {
        res
        .status(500)
        .json({error:error.message})
    }
}

//update a property
export const updateProperty = async (req, res) => {
    try {
        const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!property) return res.status(404).json({ message: "Property not found" });
          if (property.owner.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized to update this property" }); // to prevent self booking by host
    }
        res.json(property);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// deletes a property
export const deleteProperty = async(req,res)=>{

    try {
        const property = await Property.findByIdAndDelete(req.params.id);
         if (!property) return res.status(404).json({ message: "Property not found" });
           if (property.owner.toString() !== req.user.id) {
            return res.status(403).json({ msg: "Not authorized to delete this property" });
        }
        res.json({msg:"Property deleted successfully"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
