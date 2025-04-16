import React, { useState } from "react";

import { Textarea, TextareaInput } from "@/components/ui/textarea";
import Toast from "react-native-toast-message";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { ScrollView } from "react-native";
import { KeyboardAvoidingView, ActivityIndicator } from "react-native";

import Container from "@/components/common/Container";

import dao from "@/api/dao";

import { useUser } from "@/contexts/UserContext";

import ProfileDrawerLayout from "@/components/custom/ProfileDrawerLayout";

const FeedbackPage = () => {
  const { user } = useUser();

  const [feedback, setFeedback] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFeedbackSubmit = async () => {
    if (isSubmitting || !feedback) return;
    setIsSubmitting(true);
    setError(null);
    try {
      if (!user) {
        throw new Error("User not found");
      }
      const response = await dao.postFeedback(user.id, feedback);
      console.log("Feedback submitted:", response);
      Toast.show({
        type: "success",
        text1: "Feedback Submitted",
        text2: "Thank you for your feedback!",
      });
      setFeedback("");
    } catch (err) {
      setError("Failed to submit feedback. Please try again later.");
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error || "An unexpected error occurred.",
      });
      console.error(err);
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1000);
    }
  };

  return (
    <ProfileDrawerLayout>
      <Container>
        <VStack className="px-5 py-4 flex-1 dark:bg-black bg-white" space="xl">
          <Heading className="my-4">Feedback</Heading>
          <ScrollView showsVerticalScrollIndicator={false}>
            <VStack space="xl">
              <Textarea
                size="md"
                isReadOnly={false}
                isInvalid={false}
                isDisabled={false}
                className="w-full"
              >
                <TextareaInput
                  placeholder="Type your feedback here..."
                  value={feedback}
                  onChangeText={setFeedback}
                />
              </Textarea>
            </VStack>
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }} />
          </ScrollView>
          <Button onPress={handleFeedbackSubmit} size="md">
            {isSubmitting ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <ButtonText>Submit Feedback</ButtonText>
            )}
          </Button>
        </VStack>
      </Container>
    </ProfileDrawerLayout>
  );
};

export default FeedbackPage;
