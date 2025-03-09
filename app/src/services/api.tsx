import React, { useState } from 'react';
import axios from 'axios';
import './api.css';

interface FoodAnalysis {
  calories: number;
  description: string;
  nutrients: {
    protein?: string;
    carbs?: string;
    fat?: string;
    sugar?: string;
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
      reader.onloadend = async () => {
        const imageData = reader.result as string;
        setImage(imageData);
        await analyzeFood(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeFood = async (imageData: string) => {
    setLoading(true);
    setError(null);
    try {
      const requestBody = {
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "You are a precise nutritionist specialized in analyzing food images. Provide accurate calorie estimates and nutritional information. Always respond in this exact format:\nDescription: [description]\nCalories: [number] calories\nProtein: [number]g\nCarbs: [number]g\nFat: [number]g\nSugars: [number]",
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analyze this food image and provide nutritional information in the specified format.",
              },
              {
                type: "image_url",
                image_url: { url: imageData },
              },
            ],
          },
        ],
        max_tokens: 500,
      };

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const content = response.data.choices[0].message.content;
      console.log("API Response:", content);

      const parsedAnalysis: FoodAnalysis = {
        description: content.match(/Description:\s*(.+?)(?=\n|$)/i)?.[1] || "",
        calories: parseFloat(
          content.match(/Calories:\s*(\d+\.?\d*)/i)?.[1] || "0"
        ),
        nutrients: {
          protein: content.match(/Protein:\s*(\d+\.?\d*g)/i)?.[1] || "N/A",
          carbs: content.match(/Carbs:\s*(\d+\.?\d*g)/i)?.[1] || "N/A",
          fat: content.match(/Fat:\s*(\d+\.?\d*g)/i)?.[1] || "N/A",
          sugar: content.match(/Sugars:\s*(\d+\.?\d*g)/i)?.[1] || "N/A",
        },
      };

      console.log("Parsed Analysis:", parsedAnalysis);

      setAnalysis(parsedAnalysis);
    } catch (err: any) {
      setError("Failed to analyze food: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const date = new Date();
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();
  const dateAnalysis = {
    formattedDate: formattedDate,
    formattedTime: formattedTime,
    analysis,
  };
  if (analysis) {
    if (localStorage.getItem("foodItems") === null) {
      localStorage.setItem("foodItems", JSON.stringify([dateAnalysis]));
    } else {
      let arr = JSON.parse(localStorage.getItem("foodItems") || "[]");
      const findFood = arr.find(
        (item: any) => item.description === dateAnalysis.analysis?.description
      );
      arr.push(dateAnalysis);
      localStorage.setItem("foodItems", JSON.stringify(arr));
    }
  }

    return (
        <div className="container">
            <h1>Food Analysis App</h1>
            <p>Upload or take a photo of your food and we will provide calories and other nutritional details!</p>

                <div className='functionality-container'>  
                    <div className='image-button-container'>
                        <div className="image-container">
                            {image ? (
                                <img src={image} alt="Food" className="food-image" />
                            ) : (
                                <div className="placeholder">No image selected</div>
                            )}
                        </div>   

                        <label className="custom-file-upload">
                            Upload Photo
                            <input type="file" accept="image/*" onChange={handleImageUpload} />
                        </label>   
                    </div>
  

                    {/* {loading && <p>Analyzing...</p>} */}
                    {error && <p className="error">{error}</p>}

                    <div className='analysis-container'>

                        {analysis ? (
                            <div className="analysis">
                                <p>Description: {analysis.description}</p>
                                <p>Calories: {analysis.calories}</p>
                                <div>
                                    <p>Protein: {analysis.nutrients.protein}</p>
                                    <p>Carbs: {analysis.nutrients.carbs}</p>
                                    <p>Fat: {analysis.nutrients.fat}</p>
                                    <p>Sugar: {analysis.nutrients.sugar}</p>
                                </div>
                            </div>
                        ) : (
                            loading ? (
                                    <div>Analyzing...</div>
                                ) : (
                                    <div className="analysis-placeholder">Upload or take a photo to analyze</div>
                                )
                        )
                    }
                    </div>

            </div>

        </div>
    );
};

export default Api;
