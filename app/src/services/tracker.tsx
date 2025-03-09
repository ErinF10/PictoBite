import { useState, useEffect } from 'react';
import './tracker.css';

interface Nutrients {
  protein: string;
  carbs: string;
  fat: string;
  sugar: string;
}

interface Analysis {
  description: string;
  calories: number;
  nutrients: Nutrients;
}

interface FoodItem {
  formattedDate: string;
  formattedTime: string;
  analysis: Analysis;
}

export default function Tracker() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);

  useEffect(() => {
    const storedItems = localStorage.getItem("foodItems");
    if (storedItems === null) {
      const defaultItem: FoodItem[] = [
        {
          formattedDate: "3/9/2025",
          formattedTime: "6:08:06 AM",
          analysis: {
            description: "A bunch of ripe yellow bananas.",
            calories: 420,
            nutrients: {
              protein: "5g",
              carbs: "105g",
              fat: "1.5g",
              sugar: "56g",
            },
          },
        },
      ];
      setFoodItems(defaultItem);
      localStorage.setItem("foodItems", JSON.stringify(defaultItem));
    } else {
      // Remove duplicates based on date, time, and description
      const items = JSON.parse(storedItems) as FoodItem[];
      const uniqueItems = items.filter((item, index, self) =>
        index === self.findIndex((t) => (
          t.formattedDate === item.formattedDate &&
          t.formattedTime === item.formattedTime &&
          t.analysis.description === item.analysis.description
        ))
      );
      
      // Update localStorage if duplicates were removed
      if (items.length !== uniqueItems.length) {
        localStorage.setItem("foodItems", JSON.stringify(uniqueItems));
      }
      
      setFoodItems(uniqueItems);
    }
  }, []);

  const handleDelete = (index: number) => {
    const newItems = foodItems.filter((_, i: number) => i !== index);
    setFoodItems(newItems);
    localStorage.setItem("foodItems", JSON.stringify(newItems));
  };
  
  return (
    <div className="tracker-container">
      <h1>Nutritional Tracker</h1>
      <table className="tracker-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Nutritional Info</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {foodItems.map((item, index) => (
            <tr key={`${item.formattedDate}-${item.formattedTime}-${index}`}>
              <td className="date-time">
                {item.formattedDate} at {item.formattedTime}
              </td>
              <td className="food-description">{item.analysis.description}</td>
              <td>
                <ul>
                  <li data-label="Calories">Calories: {item.analysis.calories}</li>
                  <li data-label="Carbs">Carbs: {item.analysis.nutrients.carbs}</li>
                  <li data-label="Fat">Fat: {item.analysis.nutrients.fat}</li>
                  <li data-label="Sugar">Sugar: {item.analysis.nutrients.sugar}</li>
                </ul>
              </td>
              <td>
                <button 
                  className="delete-button"
                  onClick={() => handleDelete(index)}
                  aria-label="Delete entry"
                >
                  ×
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
