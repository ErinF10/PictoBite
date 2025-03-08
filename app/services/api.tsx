import React, { useState } from 'react';
import { Button, Image, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { OPENAI_API_KEY } from '@env';

// define the response type for the OpenAI API response
interface OpenAIResponse {
    choices: {
        message: {
            content: string;
        };
    }[];
}

interface FoodAnalysis {
    calories: number;
    description: string;
    nutrients: {
        protein?: string;
        carbs?: string;
        fat?: string;
    };
}

const App = () => {
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [analysis, setAnalysis] = useState<FoodAnalysis | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // function to request camera permissions and take a photo
    const pickImage = async (): Promise<void> => {
        try {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== "granted") {
                setError("Permission to access camera is required!");
                return;
            }

            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                const imageUri = result.assets[0].uri;
                setImageUri(imageUri);
                await analyzeFood(imageUri);
            }
        } catch (err: any) {
            setError('Failed to take photo: ' + err.message);
        }
    };

    // Function to encode image to base64
    const encodeImage = async (imageUri: string): Promise<string> => {
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const reader = new FileReader();

        return new Promise((resolve, reject) => {
            reader.onloadend = () => {
                const base64data = reader.result as string;
                // Remove the data URL prefix
                resolve(base64data.split(',')[1]);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };

    // Function to analyze food using GPT-4 Vision
    const analyzeFood = async (imageUri: string): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const base64Image = await encodeImage(imageUri);
            console.log('Image encoded successfully, length:', base64Image.length);

            const requestBody = {
                model: 'gpt-4o',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a precise nutritionist specialized in analyzing food images. Provide accurate calorie estimates and nutritional information.'
                    },
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'text',
                                text: 'Analyze this food image. Provide: 1) Brief description 2) Estimated calories 3) Key nutrients (protein, carbs, fat if visible). Be precise but concise.'
                            },
                            {
                                type: 'image_url',
                                image_url: {
                                    url: `data:image/jpeg;base64,${base64Image}`
                                }
                            }
                        ]
                    }
                ],
                max_tokens: 500
            };

            console.log('Request configuration:', {
                model: requestBody.model,
                messageCount: requestBody.messages.length,
                imageIncluded: !!base64Image
            });

            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                requestBody,
                {
                    headers: {
                        'Authorization': `Bearer ${OPENAI_API_KEY}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('Received response from OpenAI');

            const content = response.data.choices[0].message.content;
            console.log('API Response content:', content);
            
            // Parse the response into structured data
            const parsedAnalysis: FoodAnalysis = {
                description: content.split('\n')[0],
                calories: parseInt(content.match(/\d+(?=\s*calories)/i)?.[0] || '0'),
                nutrients: {
                    protein: content.match(/protein:?\s*([\d.]+g)/i)?.[1],
                    carbs: content.match(/carbs?:?\s*([\d.]+g)/i)?.[1],
                    fat: content.match(/fat:?\s*([\d.]+g)/i)?.[1]
                }
            };
            console.log('Parsed analysis:', parsedAnalysis);

            setAnalysis(parsedAnalysis);
        } catch (error: any) {
            console.error('Full error object:', error);
            console.error('Error response:', error.response?.data);
            setError('Failed to analyze food: ' + (error.response?.data?.error?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Take Food Photo" onPress={pickImage} />
            
            {imageUri && (
                <Image 
                    source={{ uri: imageUri }} 
                    style={styles.image} 
                />
            )}

            {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={styles.loadingText}>Analyzing your food...</Text>
                </View>
            )}

            {error && (
                <Text style={styles.errorText}>{error}</Text>
            )}

            {analysis && (
                <View style={styles.analysisContainer}>
                    <Text style={styles.description}>{analysis.description}</Text>
                    <Text style={styles.calories}>{analysis.calories} calories</Text>
                    {analysis.nutrients && (
                        <View style={styles.nutrientsContainer}>
                            {analysis.nutrients.protein && (
                                <Text style={styles.nutrient}>Protein: {analysis.nutrients.protein}</Text>
                            )}
                            {analysis.nutrients.carbs && (
                                <Text style={styles.nutrient}>Carbs: {analysis.nutrients.carbs}</Text>
                            )}
                            {analysis.nutrients.fat && (
                                <Text style={styles.nutrient}>Fat: {analysis.nutrients.fat}</Text>
                            )}
                        </View>
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5'
    },
    image: {
        width: 300,
        height: 300,
        marginTop: 20,
        borderRadius: 15,
        marginBottom: 20
    },
    loadingContainer: {
        marginTop: 20,
        alignItems: 'center'
    },
    loadingText: {
        marginTop: 10,
        color: '#666'
    },
    errorText: {
        color: 'red',
        marginTop: 20,
        textAlign: 'center'
    },
    analysisContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '100%',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
        color: '#333'
    },
    calories: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2ecc71',
        marginBottom: 10
    },
    nutrientsContainer: {
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 10
    },
    nutrient: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5
    }
});

export default App;
