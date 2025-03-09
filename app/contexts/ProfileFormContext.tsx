import React, { createContext, useContext, useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { User } from "../types/User";
import { Gender } from "../types/enums/GenderEnum";
import { useUser } from "./UserContext";
import dao from "../ajax/dao";
import { ActivityIndicator } from "react-native";
import { useMatchableProfiles } from "./MatchableProfilesContext";

interface ProfileFormContextProps {
  loading: boolean;
  onSubmit: (data: User) => Promise<void>;
}

const ProfileFormContext = createContext<ProfileFormContextProps | undefined>(
  undefined
);

export const ProfileFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(true);
  const { refreshMatchableProfiles } = useMatchableProfiles();

  const methods = useForm<User>({
    defaultValues: {
      firstName: "",
      lastName: "",
      age: 18,
      gender: Gender.OTHER,
      maxRent: "HIGH",
      lifestyle: [],
      bio: "",
      minAgePreference: 18,
      maxAgePreference: 99,
      preferredGenders: [],
      preferredLocations: [],
    },
  });

  const { reset, handleSubmit } = methods;

  // Fetch profile info when user changes
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        console.warn("No user found");
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const userProfile = await dao.getUserProfile(user.id);
        reset(userProfile); // Update form with fetched data
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, reset]);

  // Submit handler (updates existing profile or creates a new one)
  const onSubmit = async (data: User) => {
    try {
      setLoading(true);
      if (user) {
        const updatedProfile = await dao.updateUserProfile(user.id, data);
        reset(updatedProfile); // Sync form with updated profile
        alert("Profile updated successfully!");
        refreshMatchableProfiles(); // Refresh matchable profiles after updating profile
      } else {
        // TODO: implement create profile dao method
        // const newProfile = await dao.createUserProfile(data);
        // reset(newProfile);
        alert("Profile created successfully!");
        refreshMatchableProfiles(); // Refresh matchable profiles after creating profile
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProfileFormContext.Provider value={{ loading, onSubmit }}>
      <FormProvider {...methods}>
        {loading ? <ActivityIndicator size="large" color="#fff" /> : children}
      </FormProvider>
    </ProfileFormContext.Provider>
  );
};

// Hook to use the profile form context
export const useProfileForm = () => {
  const context = useContext(ProfileFormContext);
  if (!context) {
    throw new Error("useProfileForm must be used within a ProfileFormProvider");
  }
  return context;
};
