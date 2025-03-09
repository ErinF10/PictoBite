import Api from "./services/api";
import Tracker from "./services/tracker";
import { Routes, Route } from "react-router-dom";
import * as React from 'react';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import HomeRounded from '@mui/icons-material/HomeRounded';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import { useNavigate } from 'react-router-dom';
import "./App.css";
import PersonalizedNutrition from "./services/PersonalizedNutrition";

// Temporary placeholder component
// const DietPlanPlaceholder = () => (
//   <div className="placeholder">
//     <h2>Diet Plan Coming Soon!</h2>
//     <p>This feature is currently under development.</p>
//   </div>
// );

function NavigationMenu() {
  const navigate = useNavigate();
  
  return (
    <Box 
      sx={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bgcolor: '#2CA081',
        zIndex: 1000,
      }}
    >
      <List
        role="menubar"
        orientation="horizontal"
        sx={{
          '--List-radius': '8px',
          '--List-padding': '4px',
          '--List-gap': '8px',
          '--ListItem-gap': '0px',
          display: 'flex',
          justifyContent: 'center',
          boxShadow: 'sm',
        }}
      >
        <ListItem role="none">
          <ListItemButton
            role="menuitem"
            component="a"
            onClick={() => navigate('/')}
            sx={{
              '&:hover': {
                bgcolor: '#bec5a0', // slightly darker shade for hover effect
              }
            }}
          >
            <ListItemDecorator>
              <HomeRounded />
            </ListItemDecorator>
            Home
          </ListItemButton>
        </ListItem>
        <ListItem role="none">
          <ListItemButton
            role="menuitem"
            component="a"
            onClick={() => navigate('/diet')}
            sx={{
              '&:hover': {
                bgcolor: '#bec5a0',
              }
            }}
          >
            <ListItemDecorator>
              <RestaurantMenuIcon />
            </ListItemDecorator>
            Diet Plan
          </ListItemButton>
        </ListItem>
        <ListItem role="none">
          <ListItemButton
            role="menuitem"
            component="a"
            onClick={() => navigate('/tracker')}
            sx={{
              '&:hover': {
                bgcolor: '#bec5a0',
              }
            }}
          >
            <ListItemDecorator>
              <MonitorWeightIcon />
            </ListItemDecorator>
            Calorie Tracker
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}

function App() {
  return (
    <>
      <NavigationMenu />
      <Box sx={{ pt: '60px' }}>
        <Routes>
          <Route path="/" element={<Api />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/diet" element={<PersonalizedNutrition />} />
        </Routes>
      </Box>

    </>
  );
}

export default App;
