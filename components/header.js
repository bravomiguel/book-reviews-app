import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';

export default function Header() {
  return (
    <AppBar
      elevation={0}
      sx={{ position: 'fixed', top: 0, borderBottom: '1px solid #D3D3D3', zIndex: 2}}
    >
      <Toolbar sx={{ gap: '1em', height: '4em', display: 'flex', justifyContent: 'space-between', paddingTop: {xs:'3.5em', sm: '1em'}, paddingBottom: '1em' }}>
        <Button
          variant='text'
          onClick={() => {}}
          sx={{
            color: 'inherit',
            textTransform: 'none',
            fontSize: '1.2em',
            fontWeight: 400,
            padding: 0,
          }}
        >
          Lolo's Reads
        </Button>
        <div style={{display: 'flex', alignItems: 'center', gap: '0.5em'}}>
          <Typography
            variant="button"
            // component={NavLink}
            to="/add"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              margin: 0,
              display: { xs: 'none', sm: 'block' },
            }}
          >
            New Review
          </Typography>
          <Fab
            color="secondary"
            aria-label="add"
            // component={NavLink}
            to="/add"
            sx={{
              height: '3em',
              width: '3em',
              display: { xs: 'none', sm: 'flex' },
            }}
          >
            <AddIcon sx={{ width: 'max-content' }} />
          </Fab>
        </div>
      </Toolbar>
    </AppBar>
  );
}