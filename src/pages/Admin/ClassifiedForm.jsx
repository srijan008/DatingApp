import React, { useState } from "react";

const ClassifiedForm = () => {
  const [formData, setFormData] = useState({
    adId: "",
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
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Form submitted!");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Classified Form</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Ad ID */}
        <div>
          <label className="block text-sm font-medium mb-1">Ad ID</label>
          <input
            type="number"
            name="adId"
            value={formData.adId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-sm font-medium mb-1">Mobile Number</label>
          <input
            type="number"
            name="mobile_number"
            value={formData.mobile_number}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-medium mb-1">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium mb-1">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>

        {/* Height */}
        <div>
          <label className="block text-sm font-medium mb-1">Height (cm)</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Location */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Location</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input
              type="text"
              name="location.state"
              placeholder="State"
              value={formData.location.state}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="location.district"
              placeholder="District"
              value={formData.location.district}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="location.city"
              placeholder="City"
              value={formData.location.city}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>
        </div>

        {/* Income */}
        <div>
          <label className="block text-sm font-medium mb-1">Income</label>
          <input
            type="text"
            name="income"
            value={formData.income}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Marital Status */}
        <div>
          <label className="block text-sm font-medium mb-1">Marital Status</label>
          <select
            name="marital_status"
            value={formData.marital_status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </select>
        </div>

        {/* Wanted */}
        <div>
          <label className="block text-sm font-medium mb-1">Wanted</label>
          <select
            name="wanted"
            value={formData.wanted}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select</option>
            <option value="Bride">Bride</option>
            <option value="Groom">Groom</option>
          </select>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClassifiedForm;
