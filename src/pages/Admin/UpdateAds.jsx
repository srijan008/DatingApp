
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UpdateForm = () => {
  const [selectedFields, setSelectedFields] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentAd, setCurrentAd] = useState({});
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
    wanted: ""
  });

  const {id} = useParams();

  // useEffect(() => {
  //   const getAds = async () => {
  //     const token = window.sessionStorage.getItem("token");
  //     if (!token) {
  //       console.error("Authentication token not found!");
  //       return;
  //     }
  //     try {
  //       const response = await axios.get(
  //         "http://13.235.72.216/auth/get-classifieduser-for-admin",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       if(response.data.message === "classifieduser retrieved successfully") {
  //         toast.success(response.data.message);
  //         const ad = response.data.classifieduser.find(ad => ad.id === id);
  //         setCurrentAd(ad);
  //         setLoading(false);
  //     } else {
  //       toast.error("Failed to retrieve ads");
  //       console.error("Failed to retrieve ads");
  //     }

  //     } catch (error) {
  //       console.error("Error fetching ads:", error);
  //     }
  //   };

  //   getAds();
  // }, []);

  const handleFieldToggle = (fieldName) => {
    setSelectedFields(prev => ({
      ...prev,
      [fieldName]: !prev[fieldName]
    }));
  };

  const handleInputChange = (field, value) => {
    if (field === 'smoking') {
      setFormData(prev => ({
        ...prev,
        [field]: value === 'true'
      }));
      return;
    }

    if (Array.isArray(formData[field])) {
      setFormData(prev => ({
        ...prev,
        [field]: value.split(',').map(item => item.trim())
      }));
      return;
    }

    if (typeof formData[field] === 'object' && !Array.isArray(formData[field])) {
      // Handle nested objects (location and job_location)
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

    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
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
    console.log('Updated fields:', updatedFields);
  };

  const renderInput = (fieldName, value) => {
    if (fieldName === 'smoking') {
      return (
        <select 
          value={value.toString()} 
          onChange={(e) => handleInputChange(fieldName, e.target.value)}
          className="border p-1 rounded ml-2"
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      );
    }

    if (Array.isArray(value)) {
      return (
        <input
          type="text"
          value={value.join(', ')}
          onChange={(e) => handleInputChange(fieldName, e.target.value)}
          placeholder="Enter comma-separated values"
          className="border p-1 rounded ml-2"
        />
      );
    }

    if (typeof value === 'object' && value !== null) {
      return Object.keys(value).map(key => (
        <div key={key} className="ml-4 mt-1">
          <input
            type="checkbox"
            checked={selectedFields[`${fieldName}.${key}`] || false}
            onChange={() => handleFieldToggle(`${fieldName}.${key}`)}
            className="mr-2"
          />
          <label>{key}:</label>
          {selectedFields[`${fieldName}.${key}`] && (
            <input
              type="text"
              value={value[key]}
              onChange={(e) => handleInputChange(`${fieldName}.${key}`, e.target.value)}
              className="border p-1 rounded ml-2"
            />
          )}
        </div>
      ));
    }

    return (
      <input
        type="text"
        value={value}
        onChange={(e) => handleInputChange(fieldName, e.target.value)}
        className="border p-1 rounded ml-2"
      />
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white">
      <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        {Object.entries(formData).map(([field, value]) => {
          if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            return (
              <div key={field} className="mb-4">
                <div className="font-semibold">{field}:</div>
                {renderInput(field, value)}
              </div>
            );
          }

          return (
            <div key={field} className="flex items-start">
              <input
                type="checkbox"
                checked={selectedFields[field] || false}
                onChange={() => handleFieldToggle(field)}
                className="mt-1 mr-2"
              />
              <label className="min-w-[150px]">{field}:</label>
              {selectedFields[field] && renderInput(field, value)}
            </div>
          );
        })}
        <button 
          type="submit" 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={Object.values(selectedFields).every(v => !v)}
        >
          Update Selected Fields
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;