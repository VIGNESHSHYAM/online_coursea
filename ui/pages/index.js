import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useStateContext } from "../context_setup";
import { check_If_Image } from "../utils";

const Index = () => {
  const { connect, createPropertyFunction , address , contract , Online_course, getPropertiesData} = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [form, setForm] = useState({
    propertyTitle: "",
    description: "",
    category: "",
    price: "", // corrected property name
    images: "",
    propertyAddress: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if any required fields are empty
    if (!form.propertyTitle || !form.description || !form.category || !form.price || !form.images || !form.propertyAddress) {
      alert("Please fill in all fields");
      return;
    }

    check_If_Image(form.images, async (exists) => {
      if (exists) {
        setIsLoading(true);
        try {
          await createPropertyFunction({
            ...form,
            price: ethers.utils.parseUnits(form.price.toString(), 18), // Convert to string before parsing
          });
          
          setIsLoading(false);
        } catch (error) {
          console.error("Error creating property:", error.message);
          setIsLoading(false);
        }
      } else {
        alert("Invalid image URL");
        setForm({ ...form, images: "" });
      }
    });
  };
const fetchProperty = async()=>{
  setIsLoading(true);
  const data = await getPropertiesData();
  setProperties(data);
  setIsLoading(false);
}
useEffect(()=>{
  if(contract) fetchProperty();
},[address, contract]);

console.log(properties)
  return (
    <div>
      <h1>Create</h1>
      <button onClick={connect}>Connect</button> {/* Added connect method */}
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" placeholder="Property Title" onChange={(e) => handleFormFieldChange("propertyTitle", e)} />
        </div>
        <div>
          <input type="text" placeholder="Description" onChange={(e) => handleFormFieldChange("description", e)} />
        </div>
        <div>
          <input type="text" placeholder="Category" onChange={(e) => handleFormFieldChange("category", e)} />
        </div>
        <div>
          <input type="number" placeholder="Price" onChange={(e) => handleFormFieldChange("price", e)} />
        </div>
        <div>
          <input type="url" placeholder="Images" onChange={(e) => handleFormFieldChange("images", e)} />
        </div>
        <div>
          <input type="text" placeholder="Property Address" onChange={(e) => handleFormFieldChange("propertyAddress", e)} />
        </div>
        <div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Index;
