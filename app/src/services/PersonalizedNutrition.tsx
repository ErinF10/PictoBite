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
        <main className="nutrition-container">
            <header>
                <Typography level="h1" sx={{ mb: 2 }}>Personalized Nutrition</Typography>
            </header>
            
            <Card variant="outlined" sx={{ mb: 4 }}>
                <CardContent>
                    <Typography level="h2" sx={{ mb: 3 }}>Enter Your Details</Typography>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2} sx={{ maxWidth: 400 }}>
                            <Input
                                name="height"
                                type="number"
                                placeholder="Enter height in cm"
                                required
                            />
                            <Input
                                name="weight"
                                type="number"
                                placeholder="Enter weight in kg"
                                required
                            />
                            <Input
                                name="age"
                                type="number"
                                placeholder="Enter age in years"
                                required
                            />
                            <Button 
                                type="submit"
                                loading={isLoading}
                            >
                                Calculate
                            </Button>
                        </Stack>
                    </form>
                </CardContent>
            </Card>

            {calories && (
                <Card variant="outlined" sx={{ mb: 4 }}>
                    <CardContent>
                        <Typography level="h2" sx={{ mb: 2 }}>Recommended Daily Intake</Typography>
                        <Stack spacing={1}>
                            <Typography>Calories: {calories.toFixed(2)} kcal</Typography>
                            <Typography>Protein: {protein?.toFixed(2)} g</Typography>
                            <Typography>Carbs: {carbs?.toFixed(2)} g</Typography>
                            <Typography>Fat: {fat?.toFixed(2)} g</Typography>
                            <Typography>Sugar: {sugar?.toFixed(2)} g</Typography>
                        </Stack>
                    </CardContent>
                </Card>
            )}

            <section className="nutrition-info">
                <Typography level="h2" sx={{ mb: 4 }}>General Nutrition Information</Typography>
                <Grid 
                    container 
                    spacing={4} 
                    sx={{ 
                        flexGrow: 1,
                        px: 2,
                        gap: 2,
                        justifyContent: 'center'
                    }}
                >
                    {/* First row - 3 cards */}
                    <Grid xs={12} sm={6} md={4}>
                        <Card 
                            variant="outlined" 
                            sx={{ 
                                height: '100%',
                                mb: 2
                            }}
                        >
                            <CardContent>
                                <Typography level="title-lg" sx={{ mb: 2 }}>Calories</Typography>
                                <Typography level="body-md">
                                    Calories are a unit of energy that our body gets from food. The recommended
                                    daily intake of calories varies based on age, gender, activity level, and other
                                    factors. On average, adult women need around 2,000 calories per day, while adult men
                                    need around 2,500 calories.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid xs={12} sm={6} md={4}>
                        <Card 
                            variant="outlined" 
                            sx={{ 
                                height: '100%',
                                mb: 2
                            }}
                        >
                            <CardContent>
                                <Typography level="title-lg" sx={{ mb: 2 }}>Protein</Typography>
                                <Typography level="body-md">
                                    Protein is an essential macronutrient that helps build and repair tissues, muscles, and
                                    organs. The recommended daily intake of protein is around 0.8 grams per kilogram of body
                                    weight for the average adult. Protein is found in meat, fish, eggs, dairy, and plant-based
                                    sources like beans and lentils.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid xs={12} sm={6} md={4}>
                        <Card 
                            variant="outlined" 
                            sx={{ 
                                height: '100%',
                                mb: 2
                            }}
                        >
                            <CardContent>
                                <Typography level="title-lg" sx={{ mb: 2 }}>Carbs</Typography>
                                <Typography level="body-md">
                                    Carbohydrates are the body's main source of energy. They are broken down into glucose,
                                    which fuels our brain and muscles. Healthy carbs include whole grains, fruits, and vegetables.
                                    A healthy diet typically consists of 45-65% of calories from carbohydrates.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Second row - 2 cards */}
                    <Grid xs={12} sm={6} md={4}>
                        <Card 
                            variant="outlined" 
                            sx={{ 
                                height: '100%',
                                mb: 2
                            }}
                        >
                            <CardContent>
                                <Typography level="title-lg" sx={{ mb: 2 }}>Fat</Typography>
                                <Typography level="body-md">
                                    Fat is an essential nutrient that provides energy, supports cell function, and helps the
                                    body absorb vitamins. Not all fats are bad – healthy fats like those found in avocados,
                                    nuts, and olive oil are beneficial. Aim for fat to make up 20-35% of your total daily calories.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid xs={12} sm={6} md={4}>
                        <Card 
                            variant="outlined" 
                            sx={{ 
                                height: '100%',
                                mb: 2
                            }}
                        >
                            <CardContent>
                                <Typography level="title-lg" sx={{ mb: 2 }}>Sugar</Typography>
                                <Typography level="body-md">
                                    Sugar provides energy but should be consumed in moderation. Excessive sugar intake can lead
                                    to health problems like obesity and diabetes. The American Heart Association recommends
                                    that women limit added sugars to 25 grams per day and men to 37.5 grams.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </section>
        </main>
    );
};

export default PersonalizedNutrition;
