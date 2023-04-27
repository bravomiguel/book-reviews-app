import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

export default function BookSearch({
  value = null,
  inputValue = '',
  results = [],
  onChange = () => {},
  onInputChange = () => {},
}) {
  // if (error) return <p>Error: {error}</p>;
  // if (status === 'loading') return <p>Loading...</p>;
  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'min-content auto',
          gridTemplateRows: 'auto',
          gridTemplateAreas: `'img search'`,
        }}
      >
        <Avatar
          variant="square"
          src={value?.avatarUrl}
          sx={{
            display: value ? 'block' : 'none',
            marginRight: '1em',
            width: '2em',
            height: '100%',
            // maxHeight: '7em',
            border: '0.5px solid grey',
            gridArea: 'img',
          }}
        >
          {value?.avatarUrl ? null : (
            <AutoStoriesIcon sx={{ height: '2.4em' }} />
          )}
        </Avatar>
        <Autocomplete
          sx={{ gridArea: 'search' }}
          id="google-books-search"
          filterOptions={(x) => x}
          options={inputValue.length === 0 ? [] : results}
          getOptionLabel={(option) => {
            if (!option) {
              return inputValue;
            }
            return option.author
              ? `${option.title}, ${option.author}`
              : option.title;
          }}
          noOptionsText="Search Book"
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <img loading="lazy" width="20" src={option.avatarUrl} alt="" />
              {option.author
                ? `${option.title}, ${option.author}`
                : option.title}
            </Box>
          )}
          value={value}
          onChange={onChange}
          inputValue={inputValue}
          onInputChange={onInputChange}
          // sx={{ marginBlockEnd: '2em' }}
          renderInput={(params) => (
            <TextField {...params} label="Search Book" key={params} />
          )}
        />
      </div>
      <Divider sx={{ margin: '2em 0' }} />
    </>
  );
}