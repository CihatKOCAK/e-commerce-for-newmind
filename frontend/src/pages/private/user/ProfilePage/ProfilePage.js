import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import defaultPP from "../../../../assets/avatar.png";
import { storage } from "../../../../utils/localStorageUtils";
import { useAuth } from "../../../../context/AuthContext";
import APIService_User from "../../../../services/Api/UserService";
import APIService_UploadFile from "../../../../services/Api/UploadFileService";
import { API_MAIN_URL } from "../../../../config/apiConfig";

const ProfilePage = () => {
  const { user, updateUserData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profileImage: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    storage.setItem("user", user);
    setFormData({
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
    });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let uploadedImageUrl = "";
      if (selectedFile) {
        const response = await APIService_UploadFile(selectedFile, "profile");
        uploadedImageUrl = response.data.filePath;
      }

      // Profil güncelleme isteği gönder
      const updatedUserData = {
        ...formData,
        profileImage: uploadedImageUrl || formData.profileImage, // Eğer resim yüklenmediyse eski resmi koru
      };
      const response = await APIService_User.updateUserProfile(user._id, updatedUserData);

      updateUserData(response.data.user); // Kullanıcı verilerini güncelle
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="profile-page">Loading...</div>;
  if (error) return <div className="profile-page error">{error}</div>;

  return (
    <div className="profile-page">
      {!isEditing ? (
        <>
          <div className="profile-header">
            <img
              src={user.profileImage ? API_MAIN_URL + user.profileImage : defaultPP}
              alt={`${user.name}'s avatar`}
              style={{ width: 200, height: 200, objectFit: "cover" }}
              className="profile-image"
            />
            <h1 className="profile-name">{user.name}</h1>
            <p className="profile-role">{user.role}</p>
          </div>
          <div className="profile-details">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Member Since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        </>
      ) : (
        <form className="edit-profile-form" onSubmit={handleFormSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Profile Image:
            <input
              type="file"
              name="profileImage"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
          <button type="submit" className="save-button" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
          <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default ProfilePage;
