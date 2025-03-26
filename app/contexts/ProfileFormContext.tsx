import React, { createContext, useContext, useEffect, useState } from "react";
import { useForm, FormProvider, FieldErrors } from "react-hook-form";
import { User } from "../types/responses/User"; // Don't use this
import { UserProfile } from "../types/responses/UserProfile"; // Don't use this
import { UserProfileForm } from "../types/requests/UserProfileForm"; // Use this
import { Gender, GenderLabels } from "../types/enums/GenderEnum";
import { useUser } from "./UserContext";
import dao from "../ajax/dao";
import { ActivityIndicator } from "react-native";
import { useMatchableProfiles } from "./MatchableProfilesContext";
import { profileSchema, UserFormSchema } from "../validation/profileSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import Toast from "react-native-toast-message";
import { Lifestyle } from "../types/enums/LifestyleEnum";
import { Location } from "../types/enums/LocationEnum";
import { Preferences } from "../types/responses/Preferences";
import { Cleanliness } from "../types/enums/CLeanlinessEnum";

interface ProfileFormContextProps {
  loading: boolean;
  onSubmit: (data: UserProfileForm) => Promise<void>;
  onError?: (errors: any) => void;
  formState: { errors: FieldErrors<UserProfileForm> };
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
  const [userProfile, setUserProfile] = useState<UserProfileForm | null>(null);

  const methods = useForm<UserFormSchema>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      age: 18,
      gender: Gender.OTHER,
      maxRent: 1000,
      lifestyle: [],
      bio: "",
      minAgePreference: 18,
      maxAgePreference: 99,
      genderPreferences: [],
      locationPreferences: [],
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

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
        const userResponse: User = await dao.getUser(
          user.userProfile.id
        );

        const preferencesResponse: Preferences = await dao.getUserPreferences(
          user.userProfile.id
        );

        console.log("Fetched user profile", userResponse.userProfile);
        const updatedProfile: UserProfileForm = {
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          gender: user.gender || Gender.NOT_IMPORTANT,
          age: user.age || 18,
          maxRent: preferencesResponse.roomPreference?.maxRent || 1000,
          lifestyle: userResponse.userProfile.lifestyle || ([] as Lifestyle[]),
          cleanliness: userResponse.userProfile.cleanliness || Cleanliness.TIDY,
          bio: userResponse.userProfile.bio || "",
          minAgePreference:
            preferencesResponse.roommatePreference?.minAgePreference || 21,
          maxAgePreference:
            preferencesResponse.roommatePreference?.maxAgePreference || 44,
          genderPreferences: preferencesResponse.roommatePreference
            ?.genderPreferences || [Gender.NOT_IMPORTANT],
          locationPreferences: preferencesResponse.roommatePreference
            ?.locationPreferences || [
            Location.HELSINKI,
            Location.ESPOO,
            Location.VANTAA,
          ],
        };
        setUserProfile(updatedProfile);
        reset(updatedProfile);
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, reset]);

  // Submit handler (updates existing profile or creates a new one)
  const onSubmit = async (data: UserProfileForm) => {
    console.log("Trying to submit profile", data);
    try {
      if (Object.keys(errors).length > 0) {
        Toast.show({
          type: "info",
          text1: "Invalid Input",
          text2: "Cannot submit this shit.",
        });
        return;
      }
      setLoading(true);
      if (user) {
        const updatedProfile = await dao.updateProfile(user.id, data);
        reset(updatedProfile); // Sync form with updated profile
        Toast.show({
          type: "success",
          text1: "Profile Updated",
          text2: "Your changes have been saved.",
        });
        refreshMatchableProfiles(); // Refresh matchable profiles after updating profile
      } else {
        // TODO: implement create profile dao method
        // const newProfile = await dao.createUserProfile(data);
        // reset(newProfile);
        Toast.show({
          type: "success",
          text1: "Profile Created",
          text2: "Your Profile has been created!.",
        });
        refreshMatchableProfiles(); // Refresh matchable profiles after creating profile
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Toast.show({
        type: "error",
        text1: "Update Failed",
        text2: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Error handler for form validation failures
  const onError = (errors: any) => {
    Toast.show({
      type: "error",
      text1: "Invalid Input",
      text2: "Please fix the errors before submitting.",
    });
  };

  return (
    <ProfileFormContext.Provider
      value={{ loading, onSubmit, onError, formState: { errors } }}
    >
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
