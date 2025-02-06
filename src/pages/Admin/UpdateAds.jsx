import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';

const UpdateForm = () => {
  const [selectedFields, setSelectedFields] = useState({});
  const [loading, setLoading] = useState(true);
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

  const { id } = useParams();

  useEffect(() => {
    const fetchCurrentAd = async () => {
      const token = window.sessionStorage.getItem("token");
      if (!token) {
        console.error("Authentication token not found!");
        return;
      }

      try {
        const response = await axios.get(
          "http://13.235.72.216/auth/get-classifieduser-for-admin",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.message === "classifieduser retrieved successfully") {
          const ad = response.data.classifieduser.find(ad => ad.id === id);
          setFormData(prevData => ({
            ...prevData,
            ...ad
          }));
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching ad:", error);
      }
    };

    fetchCurrentAd();
  }, [id]);

  const handleFieldToggle = (fieldName) => {
    setSelectedFields(prev => ({
      ...prev,
      [fieldName]: !prev[fieldName]
    }));
  };

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
      return;
    }

    if (field === 'languages_known') {
      setFormData(prev => ({
        ...prev,
        [field]: value.split(',').map(item => item.trim())
      }));
      return;
    }

    if (field === 'mobile_number' || field === 'age' || field === 'height' || field === 'family_members') {
      const numValue = parseFloat(value) || '';
      setFormData(prev => ({
        ...prev,
        [field]: numValue
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFields = {};
    
    Object.keys(selectedFields).forEach(field => {
      if (selectedFields[field]) {
        if (field.includes('.')) {
          const [parent, child] = field.split('.');
          if (!updatedFields[parent]) updatedFields[parent] = {};
          updatedFields[parent][child] = formData[parent][child];
        } else {
          updatedFields[field] = formData[field];
        }
      }
    });

    try {
      const token = window.sessionStorage.getItem("token");
      const response = await axios.post(
        `http://13.235.72.216/auth/update-classified/`,
        {
          "cls_id" : id,
          ...updatedFields
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (response.data.message === "classifieduser updated successfully") {
        alert("Profile updated successfully!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  if (loading) {
    return <div className='flex justify-center items-center h-screen'><Loader /></div>;
  }

  const renderField = (fieldName, label, type = "text") => {
    const value = fieldName.includes('.')
      ? formData[fieldName.split('.')[0]][fieldName.split('.')[1]]
      : formData[fieldName];

    return (
      <div className="mb-4">
        <div className="flex items-start">
          <input
            type="checkbox"
            checked={selectedFields[fieldName] || false}
            onChange={() => handleFieldToggle(fieldName)}
            className="mt-2 mr-2"
          />
          <div className="flex-1">
            <label className="block text-gray-700 text-lg mb-2">
              {label}
            </label>
            {selectedFields[fieldName] && (
              <input
                type={type}
                value={value || ''}
                onChange={(e) => handleInputChange(fieldName, e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100/50 rounded-lg py-8">
      <div className="max-w-4xl mx-auto bg-white/60 rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Update Profile
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 text-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xl">
            {renderField("name", "Full Name")}
            {renderField("email", "Email", "email")}
            {renderField("mobile_number", "Mobile Number", "number")}
            {renderField("age", "Age", "number")}
            {renderField("gender", "Gender")}
            {renderField("height", "Height (in feet)", "number")}
            {renderField("location.state", "State")}
            {renderField("location.district", "District")}
            {renderField("location.city", "City")}
            {renderField("job_location.state", "Job Location State")}
            {renderField("job_location.city", "Job Location City")}
            {renderField("income", "Income")}
            {renderField("education", "Education")}
            {renderField("profession", "Profession")}
            {renderField("occupation_type", "Occupation Type")}
            {renderField("company", "Company")}
            {renderField("family_members", "Family Members", "number")}
            {renderField("religion", "Religion")}
            {renderField("caste", "Caste")}
            {renderField("languages_known", "Languages Known (comma-separated)")}
            {renderField("personality_type", "Personality Type")}
          </div>

          <div className="mt-6">
            {renderField("description", "Description")}
            {renderField("bio", "Bio")}
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={Object.values(selectedFields).every(v => !v)}
            >
              Update Selected Fields
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;