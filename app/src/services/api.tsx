import React, { useState } from 'react';
import axios from 'axios';

  
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

const Api: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);
    const [analysis, setAnalysis] = useState<FoodAnalysis | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const analyzeFood = async () => {
        setLoading(true);
        setError(null);
        try {
            const requestBody = {
                model: 'gpt-4o',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a precise nutritionist specialized in analyzing food images. Provide accurate calorie estimates and nutritional information. Always respond in this exact format:\nDescription: [description]\nCalories: [number] calories\nProtein: [number]g\nCarbs: [number]g\nFat: [number]g'
                    },
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'text',
                                text: 'Analyze this food image and provide nutritional information in the specified format.'
                            },
                            {
                                type: 'image_url',
                                image_url: { url: image }
                            }
                        ]
                    }
                ],
                max_tokens: 500
            };

            const response = await axios.post('https://api.openai.com/v1/chat/completions', requestBody, {
                headers: {
                    'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            });

            const content = response.data.choices[0].message.content;
            console.log('API Response:', content);

            const parsedAnalysis: FoodAnalysis = {
                description: content.match(/Description:\s*(.+?)(?=\n|$)/i)?.[1] || '',
                calories: parseInt(content.match(/Calories:\s*(\d+)/i)?.[1] || '0'),
                nutrients: {
                    protein: content.match(/Protein:\s*([\d.]+g)/i)?.[1] || 'N/A',
                    carbs: content.match(/Carbs:\s*([\d.]+g)/i)?.[1] || 'N/A',
                    fat: content.match(/Fat:\s*([\d.]+g)/i)?.[1] || 'N/A'
                }
            };

            console.log('Parsed Analysis:', parsedAnalysis);

            setAnalysis(parsedAnalysis);
        } catch (err: any) {
            setError('Failed to analyze food: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1>Food Analysis App</h1>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {image && <img src={image} alt="Food" className="food-image" />}
            <button onClick={analyzeFood} disabled={!image || loading}>
                {loading ? 'Analyzing...' : 'Analyze Food'}
            </button>

            {error && <p className="error">{error}</p>}

            {analysis && (
                <div className="analysis">
                    <p>Description: {analysis.description}</p>
                    <p>Calories: {analysis.calories}</p>
                    <div>
                        <p>Protein: {analysis.nutrients.protein}</p>
                        <p>Carbs: {analysis.nutrients.carbs}</p>
                        <p>Fat: {analysis.nutrients.fat}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Api;
