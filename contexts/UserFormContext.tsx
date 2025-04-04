import React, { createContext, useContext, useEffect, useRef } from "react";
import { ActivityIndicator } from "react-native";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "./UserContext";
import { useQuery } from "@tanstack/react-query";
import { getUserQueryOptions } from "../api/queries/userQueries";
import { useUpdateUserMutation } from "../api/queries/userMutations";
import { Gender } from "../types/enums/GenderEnum";
import { LookingFor } from "../types/enums/LookingForEnum";
import { UserForm, userFormSchema } from "../validation/userFormSchema";
import Toast from "react-native-toast-message";

const UserFormContext = createContext<any>(undefined);

export const UserFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isMounted = useRef(false);
  const { user } = useUser();

  const mutation = useUpdateUserMutation(user?.id);

  const { isPending, data: person } = useQuery(getUserQueryOptions(user?.id));

  const formatDateArray = (arr?: number[]) => {
    if (!arr || arr.length !== 3) return "";
    const [year, month, day] = arr;
    // Pad month and day to 2 digits
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
      2,
      "0"
    )}`;
  };

  const methods = useForm<UserForm>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      dateOfBirth: formatDateArray([1970, 1, 1]),
      lookingFor: LookingFor.USER_PROFILES,
      gender: Gender.NOT_IMPORTANT,
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (person) {
      reset({
        firstName: person.firstName ?? "",
        lastName: person.lastName ?? "",
        email: person.email ?? "",
        dateOfBirth: formatDateArray(person.dateOfBirth ?? [1970, 1, 1]),
        gender: person.gender ?? Gender.NOT_IMPORTANT,
        lookingFor: person.lookingFor ?? LookingFor.USER_PROFILES,
      });
    }
  }, [person]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  const onSubmit = async (data: UserForm) => {
    console.log("On submit data:", data);
    if (isMounted.current) {
      await mutation!.mutateAsync(data, {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "Saved",
            text2: "Personal info updated",
          });
        },
        onError: (error) => {
          console.error("Error updating user:", error);
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Failed to update personal info",
          });
        },
      });
    }
  };

  return (
    <UserFormContext.Provider value={{ onSubmit, formState: { errors } }}>
      <FormProvider {...methods}>
        {isPending ? <ActivityIndicator size="large" color="#fff" /> : children}
      </FormProvider>
    </UserFormContext.Provider>
  );
};

export const useUserForm = () => {
  const context = useContext(UserFormContext);
  if (!context)
    throw new Error("useUserForm must be used within UserFormProvider");
  return context;
};
