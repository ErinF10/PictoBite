import React, { useState } from 'react';

const PersonalizedNutrition: React.FC = () => {
    const [height, setHeight] = useState<number>();
    const [weight, setWeight] = useState<number>();
    const [age, setAge] = useState<number>();
    const [calories, setCalories] = useState<number | null>(null);
    const [protein, setProtein] = useState<number | null>(null);
    const [carbs, setCarbs] = useState<number | null>(null);
    const [fat, setFat] = useState<number | null>(null);
    const [sugar, setSugar] = useState<number | null>(null);

    const calculateNutrition = () => {
        if (height && weight && age) {
            // Example formula for calorie calculation (Basal Metabolic Rate, BMR)
            const bmr = 10 * weight + 6.25 * height - 5 * age + 5; // for men
            const recommendedCalories = bmr * 1.2; // adjust for activity level, 1.2 is sedentary
            const recommendedProtein = weight * 1.2; // grams of protein per kg of body weight
            const recommendedCarbs = (recommendedCalories * 0.5) / 4; // 50% of calories from carbs
            const recommendedFat = (recommendedCalories * 0.25) / 9; // 25% of calories from fat
            const recommendedSugar = 25; // recommended daily sugar intake (in grams)

            setCalories(recommendedCalories);
            setProtein(recommendedProtein);
            setCarbs(recommendedCarbs);
            setFat(recommendedFat);
            setSugar(recommendedSugar);
        } else {
            alert('Please enter valid height, weight, and age!');
        }
    };

    return (
        <main className="nutrition-container">
            <header>
                <h1>Personalized Nutrition</h1>
            </header>
            
            <section className="input-form">
                <h2>Enter Your Details</h2>
                <form onSubmit={(e) => { e.preventDefault(); calculateNutrition(); }}>
                    <label htmlFor="height">Height (cm):</label>
                    <input
                        id="height"
                        type="number"
                        value={height}
                        placeholder='Enter your height...'
                        onChange={(e) => setHeight(Number(e.target.value))}
                    />
                    
                    <label htmlFor="weight">Weight (kg):</label>
                    <input
                        id="weight"
                        type="number"
                        value={weight}
                        placeholder='Enter your weight...'
                        onChange={(e) => setWeight(Number(e.target.value))}
                    />
                    
                    <label htmlFor="age">Age (years):</label>
                    <input
                        id="age"
                        type="number"
                        value={age}
                        placeholder='Enter your age...'
                        onChange={(e) => setAge(Number(e.target.value))}
                    />
                    
                    <button type="submit">Calculate</button>
                </form>
            </section>

            {calories && (
                <section className="nutrition-stats">
                    <h2>Recommended Daily Intake</h2>
                    <ul>
                        <li>Calories: {calories.toFixed(2)} kcal</li>
                        <li>Protein: {protein?.toFixed(2)} g</li>
                        <li>Carbs: {carbs?.toFixed(2)} g</li>
                        <li>Fat: {fat?.toFixed(2)} g</li>
                        <li>Sugar: {sugar?.toFixed(2)} g</li>
                    </ul>
                </section>
            )}

            <section className="nutrition-info">
                <h2>General Nutrition Information</h2>
                <article className="nutrition-facts">
                    <h3>Calories:</h3>
                    <p>
                        Calories are a unit of energy that our body gets from food. The recommended
                        daily intake of calories varies based on age, gender, activity level, and other
                        factors. On average, adult women need around 2,000 calories per day, while adult men
                        need around 2,500 calories.
                    </p>
                </article>

                <article className="nutrition-facts">
                    <h3>Protein:</h3>
                    <p>
                        Protein is an essential macronutrient that helps build and repair tissues, muscles, and
                        organs. The recommended daily intake of protein is around 0.8 grams per kilogram of body
                        weight for the average adult. Protein is found in meat, fish, eggs, dairy, and plant-based
                        sources like beans and lentils.
                    </p>
                </article>

                <article className="nutrition-facts">
                    <h3>Carbs:</h3>
                    <p>
                        Carbohydrates are the body's main source of energy. They are broken down into glucose,
                        which fuels our brain and muscles. Healthy carbs include whole grains, fruits, and vegetables.
                        A healthy diet typically consists of 45-65% of calories from carbohydrates.
                    </p>
                </article>

                <article className="nutrition-facts">
                    <h3>Fat:</h3>
                    <p>
                        Fat is an essential nutrient that provides energy, supports cell function, and helps the
                        body absorb vitamins. Not all fats are bad – healthy fats like those found in avocados,
                        nuts, and olive oil are beneficial. Aim for fat to make up 20-35% of your total daily calories.
                    </p>
                </article>

                <article className="nutrition-facts">
                    <h3>Sugar:</h3>
                    <p>
                        Sugar provides energy but should be consumed in moderation. Excessive sugar intake can lead
                        to health problems like obesity and diabetes. The American Heart Association recommends
                        that women limit added sugars to 25 grams per day and men to 37.5 grams.
                    </p>
                </article>
            </section>
        </main>
    );
};

export default PersonalizedNutrition;
