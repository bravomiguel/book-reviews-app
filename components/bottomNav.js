import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

export default function BottomNav() {
  return (
    <BottomNavigation
      showLabels
      value={0}
      onChange={(event, newValue) => {
      }}
      sx={{
        position: 'fixed',
        bottom: 0,
        zIndex: 2,
        width: '100%',
        height: '4em',
        backgroundColor: '#CC5500',
        display: {
          xs: 'flex',
          sm: 'none',
        },
        paddingBottom: '3.5em',
        paddingTop: '1.5em',
        borderTop: '1px solid #D3D3D3',
        justifyContent: 'space-evenly',
      }}
    >
      <BottomNavigationAction
        label="Reviews"
        icon={<AutoStoriesIcon />}
        // component={Link}
        to={'/'}
      />
      <BottomNavigationAction
        label="New Review"
        icon={<AddCircleIcon />}
        // component={Link}
        to={'/add'}
      />
    </BottomNavigation>
  );
}
