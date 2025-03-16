import React from 'react';

import { View, Text, ScrollView, Image } from 'react-native';
import Section from '../components/Section';
import {Box} from '@/components/ui/box';

import { useUser } from "../contexts/UserContext";

import styles from "../ui/styles";

const Separator = () => <View style={styles.separator} />;

export default function ProfilePhotosScreen() {

    const { user } = useUser();

    return (
        <ScrollView style={styles.scrollContainer}>
            <Box style={{backgroundColor: 'white'}}>
            <Text style={styles.subtitle}>{ user?.firstName } photos</Text>
            <Separator />
            {user?.userPhotos?.map((photo, index) => (
                <Section key={index} />
            ))}
                    </Box>
        </ScrollView>

    );
}