import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import UploadPage from '../components/Upload';


const Upload: React.FC = () => {
  return (
    <Layout>
      <Hero title="Upload" />
        <UploadPage />
    </Layout>
  );
};

export default Upload;