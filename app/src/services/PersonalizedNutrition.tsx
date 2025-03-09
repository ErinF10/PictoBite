import * as React from 'react';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Grid from '@mui/joy/Grid';

const PersonalizedNutrition: React.FC = () => {
    const [calories, setCalories] = React.useState<number | null>(null);
    const [protein, setProtein] = React.useState<number | null>(null);
    const [carbs, setCarbs] = React.useState<number | null>(null);
    const [fat, setFat] = React.useState<number | null>(null);
    const [sugar, setSugar] = React.useState<number | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const [isHovered, setIsHovered] = React.useState(false); // Track hover state for button

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        
        const height = Number(formJson.height);
        const weight = Number(formJson.weight);
        const age = Number(formJson.age);

        if (height && weight && age) {
            try {
                const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
                const recommendedCalories = bmr * 1.2;
                const recommendedProtein = weight * 1.2;
                const recommendedCarbs = (recommendedCalories * 0.5) / 4;
                const recommendedFat = (recommendedCalories * 0.25) / 9;
                const recommendedSugar = 25;

                setCalories(recommendedCalories);
                setProtein(recommendedProtein);
                setCarbs(recommendedCarbs);
                setFat(recommendedFat);
                setSugar(recommendedSugar);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <main style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
            <Typography level="h1" sx={{ mb: 3, textAlign: 'center' }}>
                Personalized Nutrition
            </Typography>

            <Card variant="outlined" sx={{ mb: 4, p: 3 }}>
                <CardContent>
                    <Typography level="h2" sx={{ mb: 3, textAlign: 'center' }}>
                        Enter Your Details
                    </Typography>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Stack spacing={2} sx={{ width: '100%', maxWidth: 400 }}>
                            <Input name="height" type="number" placeholder="Enter height in cm" required />
                            <Input name="weight" type="number" placeholder="Enter weight in kg" required />
                            <Input name="age" type="number" placeholder="Enter age in years" required />
                        </Stack>
                        <Button
                            type="submit"
                            loading={isLoading}
                            sx={{
                                mt: 2,
                                width: '100%',
                                maxWidth: 400,
                                backgroundColor: isHovered ? '#5dd284' : '#DA325D', // Dynamic color based on hover
                                color: 'white', // Text color remains white
                                '&:hover': {
                                    backgroundColor: '#5dd284', // Green color when hovered
                                },
                            }}
                            onMouseEnter={() => setIsHovered(true)} // When mouse enters, button turns green
                            onMouseLeave={() => setIsHovered(false)} // When mouse leaves, button turns red/pink
                        >
                            Calculate
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {calories && (
                <Card variant="outlined" sx={{ mb: 4, p: 3 }}>
                    <CardContent>
                        <Typography level="h2" sx={{ mb: 2, textAlign: 'center' }}>
                            Recommended Daily Intake
                        </Typography>
                        <Stack spacing={1} sx={{ textAlign: 'center' }}>
                            <Typography>Calories: {calories.toFixed(2)} kcal</Typography>
                            <Typography>Protein: {protein?.toFixed(2)} g</Typography>
                            <Typography>Carbs: {carbs?.toFixed(2)} g</Typography>
                            <Typography>Fat: {fat?.toFixed(2)} g</Typography>
                            <Typography>Sugar: {sugar?.toFixed(2)} g</Typography>
                        </Stack>
                    </CardContent>
                </Card>
            )}

            <Typography level="h2" sx={{ mb: 4, textAlign: 'center' }}>
                General Nutrition Information
            </Typography>

            <Grid container spacing={3} justifyContent="center">
                {[
                    { title: 'Calories', text: 'Calories are a unit of energy that our body gets from food. The recommended daily intake varies based on age, gender, and activity level.' },
                    { title: 'Protein', text: 'Protein helps build and repair tissues. The recommended intake is around 0.8g per kg of body weight for the average adult.' },
                    { title: 'Carbs', text: 'Carbohydrates are the body\'s main energy source. Healthy carbs include whole grains, fruits, and vegetables.' },
                    { title: 'Fat', text: 'Fat is essential for energy, cell function, and vitamin absorption. Healthy fats include those found in avocados, nuts, and olive oil.' },
                    { title: 'Sugar', text: 'Sugar should be consumed in moderation. Excess intake can lead to health issues like obesity and diabetes.' },
                ].map((item, index) => (
                    <Grid key={index} xs={12} sm={6} md={4}>
                        <Card variant="outlined" sx={{ height: '100%', p: 2 }}>
                            <CardContent>
                                <Typography level="title-lg" sx={{ mb: 2, textAlign: 'center' }}>
                                    {item.title}
                                </Typography>
                                <Typography level="body-md">{item.text}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </main>
    );
};

export default PersonalizedNutrition;
