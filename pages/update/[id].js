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
  const paths = [
    {
      params: {
        id: "1",
      },
    },
  ]
  return {
    paths,
    fallback: true,
  }
}