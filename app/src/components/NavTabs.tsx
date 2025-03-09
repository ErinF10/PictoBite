import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function samePageLinkNavigation(
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
) {
  if (
    event.defaultPrevented ||
    event.button !== 0 || // ignore everything but left-click
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false;
  }
  return true;
}

interface LinkTabProps {
  label?: string;
  href?: string;
  selected?: boolean;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        // Routing libraries handle this, you can remove the onClick handle when using them.
        if (samePageLinkNavigation(event)) {
          event.preventDefault();
        }
      }}
      aria-current={props.selected && 'page'}
      sx={{
        color: '#ffffff !important', // Force white color
        fontSize: '1rem',
        fontWeight: 500,
        '&:hover': {
          color: '#ffd700 !important', // Force gold color on hover
        },
        '&.Mui-selected': {
          color: '#ffd700 !important', // Force gold color when selected
        }
      }}
      {...props}
    />
  );
}

export default function NavTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    // event.type can be equal to focus with selectionFollowsFocus.
    if (
      event.type !== 'click' ||
      (event.type === 'click' &&
        samePageLinkNavigation(
          event as React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        ))
    ) {
      setValue(newValue);
    }
  };

  return (
    <Box sx={{ 
      width: '100%', 
      bgcolor: '#1976d2', // Material UI's primary blue
      padding: '8px',
      marginBottom: '16px'
    }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="nav tabs example"
        role="navigation"
        sx={{
          '& .MuiTabs-indicator': {
            backgroundColor: '#ffd700', // gold underline
          }
        }}
      >
        <LinkTab label="Home" href="/" />
        <LinkTab label="Diet Plan" href="/diet" />
        <LinkTab label="Calorie Tracker" href="/tracker" />
      </Tabs>
    </Box>
  );
} 