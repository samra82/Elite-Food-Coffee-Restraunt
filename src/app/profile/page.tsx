"use client";

import { useAuth } from "@/lib/useAuth";
import { useState, useEffect, useRef } from "react";
import { updateProfile, updatePassword } from "firebase/auth";
import { auth, storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression"; // Updated import
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera, Edit, Save, X, Lock } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize user data
  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  // Handle profile update
  const handleSave = async () => {
    if (!user) {
      toast.error("You must be logged in to update your profile.");
      return;
    }

    try {
      await updateProfile(auth.currentUser!, {
        displayName,
        photoURL,
      });
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
      console.error("Error updating profile:", error);
    }
  };

  // Handle file upload with compression
  const handleFileUpload = async (file: File) => {
    if (!file || !user) return;

    setUploading(true);
    try {
      // Compress the image
      const options = {
        maxSizeMB: 0.5, // Max size in MB
        maxWidthOrHeight: 800, // Max width/height
        useWebWorker: true, // Use web worker for faster compression
      };
      const compressedFile = await imageCompression(file, options);

      const storageRef = ref(storage, `profile-pictures/${user.uid}`);
      const snapshot = await uploadBytes(storageRef, compressedFile);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setPhotoURL(downloadURL);
      toast.success("Profile picture uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload profile picture. Please try again.");
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  // Handle password update
  const handlePasswordUpdate = async () => {
    if (!user) {
      toast.error("You must be logged in to update your password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await updatePassword(auth.currentUser!, newPassword);
      toast.success("Password updated successfully!");
      setIsPasswordEditing(false);
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error("Failed to update password. Please try again.");
      console.error("Error updating password:", error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600">You must be logged in to view this page.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold ">Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={photoURL || "/default-avatar.png"} alt="Profile" />
                  <AvatarFallback>{user.displayName?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                >
                  <Camera className="w-5 h-5 text-gray-700" />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
              </div>
              {isEditing && (
                <Input
                  type="text"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  placeholder="Enter image URL"
                />
              )}
            </div>

            {/* Display Name Section */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Display Name</label>
              {isEditing ? (
                <Input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              ) : (
                <p className="text-lg text-gray-800">{displayName}</p>
              )}
            </div>

            {/* Email Section */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="text-lg text-gray-800">{user.email}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              {isEditing ? (
                <>
                  <Button onClick={handleSave} className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </Button>
              )}
            </div>

            {/* Password Update Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Change Password</h2>
              {isPasswordEditing ? (
                <div className="space-y-4">
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New Password"
                  />
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm New Password"
                  />
                  <div className="flex space-x-4">
                    <Button onClick={handlePasswordUpdate} className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Update Password
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsPasswordEditing(false)}
                      className="flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={() => setIsPasswordEditing(true)}
                  className="flex items-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Change Password
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}