import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const schema = yup.object().shape({
  title: yup.string().required('title required'),
  author: yup.string().required('author required'),
  avatarUrl: yup.string().url('must be url'),
  feelings: yup.string(),
  characters: yup.string(),
  writingStyle: yup.string(),
  notLiked: yup.string(),
  mostEnjoyed: yup.string(),
  other: yup.string(),
  rating: yup
    .number('must be a number')
    .min(0, 'must be a number between 0-5')
    .max(5, 'must be between 0-5')
    .required('rating required'),
});

const defaults = {
  title: '',
  author: '',
  avatarUrl: '',
  feelings: '',
  characters: '',
  writingStyle: '',
  notLiked: '',
  mostEnjoyed: '',
  other: '',
  rating: '',
};

export default function BookForm({ book, submitHandler = () => {}, searchValue = null }) {
  const {
    handleSubmit,
    reset,
    control,
    formState: { isDirty, isValid, isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: book || defaults,
  });

  // pre-populate form with book search values
  useEffect(() => {
    if (searchValue !== null) {
      reset({
        ...defaults,
        title: searchValue?.title,
        author: searchValue?.author,
        avatarUrl: searchValue?.avatarUrl,
      });
    } else {
      reset(defaults);
    }
  }, [searchValue]);

  // pre-populate form if book passed (i.e. when updating)?
  useEffect(() => {
    if (book) {
      reset(book);
    }
  }, [book, reset]);

  const formRowStyle = {
    marginBlockEnd: '1em',
  };

  let submitFn = (vals) => {
    reset({...defaults, ...vals});
    // console.log(`vals`, vals);
    book ? submitHandler(book._id, vals) : submitHandler(vals);
  };
  
  return (
    <form onSubmit={handleSubmit(submitFn)}>
      <div style={formRowStyle}>
        <Controller
          control={control}
          name="title"
          defaultValue={''}
          render={({ field }) => (
            <TextField
              type="text"
              {...field}
              label="*Title"
              fullWidth
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          )}
        />
      </div>
      <div style={formRowStyle}>
        <Controller
          control={control}
          name="author"
          defaultValue={''}
          render={({ field }) => (
            <TextField
              type="text"
              {...field}
              label="*Author"
              fullWidth
              error={!!errors.author}
              helperText={errors.author?.message}
            />
          )}
        />
      </div>
      <div style={formRowStyle}>
        <Controller
          control={control}
          name="avatarUrl"
          defaultValue={''}
          render={({ field }) => (
            <TextField
              sx={{ display: 'none' }}
              type="text"
              {...field}
              label="Book Image URL"
              fullWidth
              error={!!errors.avatarUrl}
              helperText={errors.avatarUrl?.message}
            />
          )}
        />
      </div>
      <div style={formRowStyle}>
        <Controller
          control={control}
          name="feelings"
          defaultValue={''}
          render={({ field }) => (
            <TextField
              type="text"
              {...field}
              label="How did this book make you feel?"
              fullWidth
              error={!!errors.feelings}
              helperText={errors.feelings?.message}
              multiline
              // rows={5}
              maxRows={10}
            />
          )}
        />
      </div>
      <div style={formRowStyle}>
        <Controller
          control={control}
          name="characters"
          defaultValue={''}
          render={({ field }) => (
            <TextField
              type="characters"
              {...field}
              label="Who were your favourite characters?"
              fullWidth
              error={!!errors.characters}
              helperText={errors.characters?.message}
              multiline
              // rows={5}
              maxRows={10}
            />
          )}
        />
      </div>
      <div style={formRowStyle}>
        <Controller
          control={control}
          name="writingStyle"
          defaultValue={''}
          render={({ field }) => (
            <TextField
              type="text"
              {...field}
              label="What were your thoughts on the writing style?"
              fullWidth
              error={!!errors.writingStyle}
              helperText={errors.writingStyle?.message}
              multiline
              // rows={5}
              maxRows={10}
            />
          )}
        />
      </div>
      <div style={formRowStyle}>
        <Controller
          control={control}
          name="notLiked"
          defaultValue={''}
          render={({ field }) => (
            <TextField
              type="text"
              {...field}
              label="Was there anything you didn't like?"
              fullWidth
              error={!!errors.notLiked}
              helperText={errors.notLiked?.message}
              multiline
              // rows={5}
              maxRows={10}
            />
          )}
        />
      </div>
      <div style={formRowStyle}>
        <Controller
          control={control}
          name="mostEnjoyed"
          defaultValue={''}
          render={({ field }) => (
            <TextField
              type="text"
              {...field}
              label="What did you most enjoy?"
              fullWidth
              error={!!errors.mostEnjoyed}
              helperText={errors.mostEnjoyed?.message}
              multiline
              // rows={5}
              maxRows={10}
            />
          )}
        />
      </div>
      <div style={formRowStyle}>
        <Controller
          control={control}
          name="other"
          defaultValue={''}
          render={({ field }) => (
            <TextField
              type="text"
              {...field}
              label="Any other comments?"
              fullWidth
              error={!!errors.other}
              helperText={errors.other?.message}
              multiline
              // rows={5}
              maxRows={10}
            />
          )}
        />
      </div>
      <div style={formRowStyle}>
        <Controller
          control={control}
          name="rating"
          defaultValue={''}
          render={({ field }) => (
            <TextField
              type="text"
              {...field}
              label="*Rating (out of 5)"
              fullWidth
              error={!!errors.rating}
              // helperText={errors.rating?.message}
              helperText={
                errors.rating?.type === 'typeError'
                  ? 'must be a number'
                  : errors.rating?.message
              }
            />
          )}
        />
      </div>
      <div
        style={{
          marginTop: '0.5em',
          display: 'flex',
          gap: '0.5em',
          justifyContent: 'space-between',
        }}
      >
        <Button
          type="reset"
          onClick={() => reset()}
          variant="contained"
          disabled={!isDirty}
          size="large"
          sx={{ flex: 'auto' }}
        >
          Reset
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting || !isDirty || (isDirty && !isValid)}
          primary="true"
          size="large"
          sx={{ flex: 'auto' }}
        >
          Submit
        </Button>
      </div>
    </form>
  );
}