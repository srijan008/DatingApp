import React, { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const ClassifiedForm = () => {
  const [creating, setCreating] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    email: "",
    mobile_number: "",
    name: "",
    age: "",
    gender: "",
    height: "",
    location: {
      state: "",
      district: "",
      city: ""
    },
    job_location: {
      state: "",
      city: ""
    },
    photos_videos: null,
    income: "",
    class_assets: null,
    education: "",
    profession: "",
    occupation_type: "",
    company: "",
    family_members: "",
    religion: "",
    caste: "",
    bio: "",
    languages_known: [],
    personality_type: ""
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
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
        [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
      }));
    }
  };

  const handleArrayChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value.split(",").map((item) => item.trim()).filter(Boolean),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setCreating(true);
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("Missing authentication token");
      }

      // Clean up the form data before submission
      const cleanFormData = Object.entries(formData).reduce((acc, [key, value]) => {
        // Remove empty strings, empty arrays, and null values
        if (value === "" || value === null || (Array.isArray(value) && value.length === 0)) {
          return acc;
        }
        // Handle nested objects
        if (typeof value === "object" && !Array.isArray(value) && value !== null) {
          const cleanNested = Object.entries(value).reduce((nestedAcc, [nestedKey, nestedValue]) => {
            if (nestedValue !== "") {
              nestedAcc[nestedKey] = nestedValue;
            }
            return nestedAcc;
          }, {});
          if (Object.keys(cleanNested).length > 0) {
            acc[key] = cleanNested;
          }
          return acc;
        }
        // Convert number strings to numbers for specific fields
        if (key === "mobile_number" || key === "age" || key === "family_members") {
          acc[key] = value === "" ? null : Number(value);
        } else if (key === "height") {
          acc[key] = value === "" ? null : parseFloat(value);
        } else {
          acc[key] = value;
        }
        return acc;
      }, {});

      const response = await axios.post(
        "http://13.235.72.216/auth/create-classified",
        cleanFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.message) {
        toast.success("Classified created successfully!");
        setInterval(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating classified");
      setCreating(false);
      console.error("Error:", error);
    }
  };

  return (
    <div className="mx-auto p-6">
      <Toaster />
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-50 rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold mb-6">Create Classified</h2>
          
          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              rows="3"
            ></textarea>
          </div>

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
                Height (in feet)
              </label>
              <input
                type="number"
                step="0.1"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                placeholder="5.8"
              />
            </div>
          </div>

          {/* Location Information */}
          <div className="border-t pt-6 mb-6">
            <h3 className="text-xl font-medium mb-4">Location Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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

            <h4 className="text-lg font-medium mb-4">Job Location</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <input
                  type="text"
                  name="job_location.state"
                  value={formData.job_location.state}
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
                  name="job_location.city"
                  value={formData.job_location.city}
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
                  <option value="Government">Government</option>
                  <option value="Private">Private</option>
                  <option value="Business">Business</option>
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
                  placeholder="e.g., Not Disclosed"
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
                  Personality Type
                </label>
                <input
                  type="text"
                  name="personality_type"
                  value={formData.personality_type}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  placeholder="e.g., Introvert, Extrovert"
                />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="border-t pt-6">
            <div className="mb-6">
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
          </div>

          {creating ? ( <button
            className="w-full bg-gray-300 cursor-wait text-black font-medium py-2 px-4 rounded-xl"
          >
            Creating...
          </button>): (
            <button
            onClick={handleSubmit}
            className="w-full bg-black hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-xl"
          >
            Create Classified
          </button>)}


        </div>
      </form>
    </div>
  );
};

export default ClassifiedForm;