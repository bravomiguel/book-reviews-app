import Link from 'next/link';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { useSelector, useDispatch } from 'react-redux';

import { selectBnDisplay, selectBnValue, setBnValue } from '@/redux/slices/bottomNavSlice';

export default function BottomNav() {
  const bnValue = useSelector(selectBnValue);
  const bnDisplay = useSelector(selectBnDisplay);
  const dispatch = useDispatch();

  return (
    <BottomNavigation
      showLabels
      value={bnValue}
      onChange={(event, newValue) => {
        dispatch(setBnValue(newValue));
      }}
      sx={{
        position: 'fixed',
        bottom: 0,
        zIndex: 2,
        width: '100%',
        height: '4em',
        backgroundColor: '#CC5500',
        display: {
          xs: `${bnDisplay}`,
          sm: 'none',
        },
        paddingBottom: '1.5em',
        paddingTop: '1.5em',
        borderTop: '1px solid #D3D3D3',
        justifyContent: 'space-evenly',
      }}
    >
      <BottomNavigationAction
        label="Reviews"
        icon={<AutoStoriesIcon />}
        component={Link}
        href={'/'}
      />
      <BottomNavigationAction
        label="New Review"
        icon={<AddCircleIcon />}
        component={Link}
        href={'/add'}
      />
    </BottomNavigation>
  );
}
