import React, { useState } from 'react';
import { Button, Image, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

// define the response type for the OpenAI API response
interface OpenAIResponse {
    choices: {
        message: {
            content: string;
        };
    }[];
}

const App = () => {
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);

    // function to request camera permissions and take a photo
    const pickImage = async (): Promise<void> => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        console.log('Camera permission status:', status); // Log the permission status
        if (status !== "granted") {
            alert("Permission to access camera is required!");
            return;
        }

        const pickImage = async () => {
            // Launch the image picker to take a photo
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                quality: 1,
            });

            console.log('Image picker result:', result); // Log the result of image picking
            if (!result.canceled) {
                const imageUri = result.assets[0].uri;
                console.log('Picked image URI:', imageUri); // Log the image URI
                setImageUri(imageUri); // Update state with the URI
            }
        };

        pickImage(); // Make sure to call the inner pickImage function
    };

    // Function to encode image to base64
    const encodeImage = async (imageUri: string): Promise<string> => {
        console.log('Encoding image:', imageUri); // Log the image URI to be encoded
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const reader = new FileReader();

        return new Promise((resolve, reject) => {
            reader.onloadend = () => {
                console.log('Base64 image data:', reader.result); // Log the base64 data
                resolve(reader.result as string);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };

    // Function to send the image to the OpenAI API
    const sendImageToAPI = async (imageUri: string): Promise<void> => {
        try {
            const base64Image = await encodeImage(imageUri);
            console.log('Sending image to API, base64 image:', base64Image); // Log the base64 image

            const response = await axios.post<OpenAIResponse>(
                'https://api.openai.com/v1/completions',
                {
                    model: 'gpt-4',
                    prompt: `Describe the food in this image.`,
                    max_tokens: 300,
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a food analysis assistant that estimates calories and sugar in food.',
                        },
                        {
                            role: 'user',
                            content: `This image contains food. Analyze it.`,
                        },
                    ],
                },
                {
                    headers: {
                        Authorization: `Bearer YOUR_OPENAI_API_KEY`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('API response:', response.data); // Log the API response
            const description = response.data.choices[0].message.content;
            setDescription(description);
        } catch (error) {
            console.error('Error sending image to API:', error); // Log any errors
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button title="Take a Photo" onPress={pickImage} />
            {imageUri && <Image source={{ uri: imageUri }} style={{ width: 300, height: 300, marginTop: 20 }} />}
            {description && <Text style={{ marginTop: 20 }}>{description}</Text>}
        </View>
    );
};

export default App;
