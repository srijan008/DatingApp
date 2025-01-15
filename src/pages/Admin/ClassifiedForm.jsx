import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const ClassifiedForm = () => {
  const [formData, setFormData] = useState({
    description: "",
    email: "",
    mobile_number: "",
    name: "",
    age: "",
    gender: "",
    height: "",
    location: { state: "", district: "", city: "" },
    job_location: { state: "", city: "" },
    income: "",
    class_assets: { property: "", vehicles: [] },
    education: "",
    profession: "",
    occupation_type: "",
    company: "",
    family_members: "",
    religion: "",
    caste: "",
    pets: [],
    places: [],
    bio: "",
    languages_known: [],
    personality_type: "",
    drinking_habits: "",
    smoking: false,
    diet: "",
    sports: [],
    travel: [],
    exercise: [],
    gambling_habits: "",
    zodiac: "",
    marital_status: "Single",
    places_interested: [],
    wanted: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleArrayChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    try {
      // Retrieve token from sessionStorage
      const token = sessionStorage.getItem("token");
  
      // Validate token presence (optional but recommended)
      if (!token) {
        throw new Error("Missing authentication token");
      }
  
      // Prepare request body with formData
      const requestBody = JSON.stringify(formData);
  
      // Make the POST request with authorization header
      const response = await axios.post(
        "http://13.235.72.216/auth/create-classified",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Handle successful response
      if (response.data.message) {
        toast.success("Classified created successfully!");
      } else {
        console.warn("Unexpected response:", response.data); // Log unexpected response data
      }
    } catch (error) {
      // Handle errors gracefully
      toast.error(error.response?.data?.message || "Error creating classified");
      console.error("Error:", error);
    }
  };
  return (
    <div className="mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-50 rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold mb-6">Create Classified</h2>
          
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <input
                type="number"
                name="mobile_number"
                value={formData.mobile_number}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height (in cm)
              </label>
              <input
                type="number"
                step="0.01"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Location Information */}
          <div className="border-t pt-6 mb-6">
            <h3 className="text-xl font-medium mb-4">Location Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <input
                  type="text"
                  name="location.state"
                  value={formData.location.state}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  District
                </label>
                <input
                  type="text"
                  name="location.district"
                  value={formData.location.district}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="location.city"
                  value={formData.location.city}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="border-t pt-6 mb-6">
            <h3 className="text-xl font-medium mb-4">Professional Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Education
                </label>
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profession
                </label>
                <input
                  type="text"
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Occupation Type
                </label>
                <select
                  name="occupation_type"
                  value={formData.occupation_type}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">Select Type</option>
                  <option value="Govt">Government</option>
                  <option value="Pvt">Private</option>
                  <option value="Buss">Business</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Income
                </label>
                <input
                  type="text"
                  name="income"
                  value={formData.income}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="border-t pt-6 mb-6">
            <h3 className="text-xl font-medium mb-4">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Religion
                </label>
                <input
                  type="text"
                  name="religion"
                  value={formData.religion}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Caste
                </label>
                <input
                  type="text"
                  name="caste"
                  value={formData.caste}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Marital Status
                </label>
                <select
                  name="marital_status"
                  value={formData.marital_status}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Family Members
                </label>
                <input
                  type="number"
                  name="family_members"
                  value={formData.family_members}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Languages Known (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.languages_known.join(", ")}
                  onChange={(e) => handleArrayChange("languages_known", e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="English, Hindi, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zodiac Sign
                </label>
                <input
                  type="text"
                  name="zodiac"
                  value={formData.zodiac}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Lifestyle Information */}
          <div className="border-t pt-6 mb-6">
            <h3 className="text-xl font-medium mb-4">Lifestyle</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Drinking Habits
                </label>
                <select
                  name="drinking_habits"
                  value={formData.drinking_habits}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">Select Option</option>
                  <option value="Never">Never</option>
                  <option value="Occasionally">Occasionally</option>
                  <option value="Regularly">Regularly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Diet
                </label>
                <select
                  name="diet"
                  value={formData.diet}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">Select Diet</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="smoking"
                  checked={formData.smoking}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600"
                />
                <label className="ml-2 text-sm font-medium text-gray-700">
                  Smoking
                </label>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="border-t pt-6">
            <h3 className="text-xl font-medium mb-4">Additional Information</h3>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  rows="4"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Places Interested (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.places_interested.join(", ")}
                  onChange={(e) => handleArrayChange("places_interested", e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Mountains, Beaches, etc."
                />
              </div>
              </div>
            </div>
            <button onClick={handleSubmit} className="w-full hover:bg-gray-700 bg-black px-3 py-2 rounded-xl text-white mt-4 font-medium">
            Create
          </button>
          </div>


      </form>
    </div>);
}

export default ClassifiedForm;