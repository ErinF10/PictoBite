export default function Tracker() {
  let arr;
  if (localStorage.getItem("foodItems") === null) {
    arr = [
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
  } else {
    arr = JSON.parse(localStorage.getItem("foodItems") || "[]");
  }
  console.log("my arr", arr);
  return (
    <>
      <h1>Calorie Tracker</h1>
      <table style={{ border: "1px solid" }}>
        <tbody>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Nutritional Info</th>
          </tr>
        </tbody>
        <tbody>
          {arr.map((item: any, index: number) => (
            <tr key={index}>
              <td>
                {item.formattedDate} at {item.formattedTime}
              </td>
              <td>{item.analysis.description}</td>
              <td>
                <ul>
                  <li>Calories: {item.analysis.calories}</li>
                  <li>Carbs: {item.analysis.nutrients.carbs}</li>
                  <li>Fat: {item.analysis.nutrients.fat}</li>
                  <li>Sugar: {item.analysis.nutrients.sugar}</li>
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
