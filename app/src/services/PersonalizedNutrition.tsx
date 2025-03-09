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
    const [isHovered, setIsHovered] = React.useState(false);

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
        <main style={{ 
            maxWidth: '1000px', 
            margin: 'auto', 
            padding: 'clamp(1rem, 3vw, 2rem)',
            animation: 'fadeIn 0.8s ease-out'
        }}>
            <Typography 
                level="h1" 
                sx={{ 
                    mb: 4,
                    textAlign: 'center',
                    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                    position: 'relative',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: '-10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '60px',
                        height: '3px',
                        background: '#DA325D',
                        borderRadius: '2px'
                    }
                }}
            >
                Personalized Nutrition
            </Typography>

            <Card 
                variant="outlined" 
                sx={{ 
                    mb: 4,
                    p: { xs: 2, sm: 3 },
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
                    }
                }}
            >
                <CardContent>
                    <Typography 
                        level="h2" 
                        sx={{ 
                            mb: 3,
                            textAlign: 'center',
                            fontSize: 'clamp(1.4rem, 3vw, 1.8rem)'
                        }}
                    >
                        Enter Your Details
                    </Typography>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Stack spacing={2} sx={{ width: '100%', maxWidth: 400 }}>
                            <Input 
                                name="height" 
                                type="number" 
                                placeholder="Enter height in cm" 
                                required
                                sx={{
                                    transition: 'transform 0.2s ease',
                                    '&:focus': {
                                        transform: 'scale(1.02)'
                                    }
                                }}
                            />
                            <Input 
                                name="weight" 
                                type="number" 
                                placeholder="Enter weight in kg" 
                                required
                                sx={{
                                    transition: 'transform 0.2s ease',
                                    '&:focus': {
                                        transform: 'scale(1.02)'
                                    }
                                }}
                            />
                            <Input 
                                name="age" 
                                type="number" 
                                placeholder="Enter age in years" 
                                required
                                sx={{
                                    transition: 'transform 0.2s ease',
                                    '&:focus': {
                                        transform: 'scale(1.02)'
                                    }
                                }}
                            />
                        </Stack>
                        <Button
                            type="submit"
                            loading={isLoading}
                            sx={{
                                mt: 3,
                                width: '100%',
                                maxWidth: 400,
                                backgroundColor: isHovered ? '#5dd284' : '#DA325D',
                                color: 'white',
                                fontSize: '1.1rem',
                                py: 1.5,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: '#5dd284',
                                    transform: 'translateY(-2px)'
                                }
                            }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            Calculate
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {calories && (
                <Card 
                    variant="outlined" 
                    sx={{ 
                        mb: 4,
                        p: { xs: 2, sm: 3 },
                        animation: 'slideIn 0.5s ease-out',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
                        }
                    }}
                >
                    <CardContent>
                        <Typography 
                            level="h2" 
                            sx={{ 
                                mb: 3,
                                textAlign: 'center',
                                fontSize: 'clamp(1.4rem, 3vw, 1.8rem)'
                            }}
                        >
                            Recommended Daily Intake
                        </Typography>
                        <Stack 
                            spacing={2} 
                            sx={{ 
                                textAlign: 'center',
                                '& .MuiTypography-root': {
                                    p: 1.5,
                                    borderRadius: 1,
                                    backgroundColor: 'rgba(218, 50, 93, 0.1)',
                                    transition: 'transform 0.2s ease',
                                    '&:hover': {
                                        transform: 'translateX(5px)'
                                    }
                                }
                            }}
                        >
                            <Typography>Calories: {calories.toFixed(2)} kcal</Typography>
                            <Typography>Protein: {protein?.toFixed(2)} g</Typography>
                            <Typography>Carbs: {carbs?.toFixed(2)} g</Typography>
                            <Typography>Fat: {fat?.toFixed(2)} g</Typography>
                            <Typography>Sugar: {sugar?.toFixed(2)} g</Typography>
                        </Stack>
                    </CardContent>
                </Card>
            )}

            <Typography 
                level="h2" 
                sx={{ 
                    mb: 4,
                    textAlign: 'center',
                    fontSize: 'clamp(1.4rem, 3vw, 1.8rem)'
                }}
            >
                General Nutrition Information
            </Typography>

            <Grid 
                container 
                spacing={{ xs: 2, sm: 3 }} 
                justifyContent="center"
            >
                {[
                    { title: 'Calories', text: 'Calories are a unit of energy that our body gets from food. The recommended daily intake varies based on age, gender, and activity level.' },
                    { title: 'Protein', text: 'Protein helps build and repair tissues. The recommended intake is around 0.8g per kg of body weight for the average adult.' },
                    { title: 'Carbs', text: 'Carbohydrates are the body\'s main energy source. Healthy carbs include whole grains, fruits, and vegetables.' },
                    { title: 'Fat', text: 'Fat is essential for energy, cell function, and vitamin absorption. Healthy fats include those found in avocados, nuts, and olive oil.' },
                    { title: 'Sugar', text: 'Sugar should be consumed in moderation. Excess intake can lead to health issues like obesity and diabetes.' },
                ].map((item, index) => (
                    <Grid key={index} xs={12} sm={6} md={4}>
                        <Card 
                            variant="outlined" 
                            sx={{ 
                                height: '100%',
                                p: { xs: 2, sm: 2.5 },
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
                                }
                            }}
                        >
                            <CardContent>
                                <Typography 
                                    level="title-lg" 
                                    sx={{ 
                                        mb: 2,
                                        textAlign: 'center',
                                        color: '#DA325D',
                                        fontWeight: 600
                                    }}
                                >
                                    {item.title}
                                </Typography>
                                <Typography 
                                    level="body-md"
                                    sx={{
                                        lineHeight: 1.6,
                                        textAlign: 'center'
                                    }}
                                >
                                    {item.text}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideIn {
                    from { opacity: 0; transform: translateX(-20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
            `}</style>
        </main>
    );
};

export default PersonalizedNutrition;
