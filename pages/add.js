import BookSearch from "@/components/bookSearch"
import BookForm from "@/components/forms/bookForm"
import Typography from "@mui/material/Typography"

export default function Add() {
  return (
    <>
      <Typography variant="h4" component="h3" sx={{ marginBottom: '0.5em' }}>
        Add Review
      </Typography>
      <BookSearch />
      <BookForm />
    </>
  )
}
