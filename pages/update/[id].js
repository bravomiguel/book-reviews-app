import data from '../../dummyData';

export default function Update({id}) {
  return (
    <div>Update {id}</div>
  )
}

export async function getStaticProps({params}) {
  return {
    props: {
      id: params.id,
    }
  }
}

export async function getStaticPaths() {
  const books = data;
  const paths = books.map((book) => ({params: { id: book._id}}));
  return {
    paths,
    fallback: true,
  };
}