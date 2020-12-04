import Layout from '../../components/Layout';
import axiosClient from '../../config/axios';

// generate static files for every link /link/123123 /link/1 /link/2

export async function getServerSideProps({ params }) {

  const { link } = params;

  const response = await axiosClient.get(`/api/links/${link}`);
  console.log(response.data);
  return {
    props: {
      link: response.data
    }
  }
}

export async function getServerSidePaths() {
  const links = await axiosClient.get('/api/links');
  return {
    paths: links.data.links.map( link => ({
      params: { link : link.url }
    })),
    fallback: false
  }
}

export default ( {link} ) => {
  console.log(link)
  return (
    <Layout>
      <h1 className="text-4xl text-center text-gray-700">Descarga tu archivo</h1>
      <div className="flex items-center justify-center mt-10">
        <a href={`${process.env.backendURL}/api/files/${link.file}`} className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer">Aquí</a>

      </div>
    </Layout>
  )
}