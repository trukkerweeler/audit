import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';

const About: React.FC = () => {
  return (
    <Layout>
      <Hero title="Checklists"/>
      {/* Create modal for entering audit header information */}
      <section
        className='dialog rounded-md bg-white w-11/12 md:w-1/2 border-green-500 border-2'
        style={{ position: 'absolute' }}
        open
      >
        {/* <div className='modal px-2'>
          <div className='modal-header'>            
            <button
              className='close-button float-right bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md'
              data-dismiss='dialog'
              aria-label='close'              
            >
              X
            </button> */}
            <h3 className="text-center mb-8 text-xxl">Add Audit Header</h3>
          {/* </div> */}
          <form id='auditid' action="submit" className='border-black border-2 rounded-md px-1 text-lg '>
            <label htmlFor="auditTitle">Audit Title</label>
            <input type="text" name="auditTitle" id="auditTitle" className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'/>
            <label htmlFor="qmsRef">QMS Reference</label>
            <input type="text" name="qmsRef" id="qmsRef" className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'/>
            {/* <label htmlFor="auditLocation">Audit Location</label>
            <input type="text" name="auditLocation" id="auditLocation" className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'/> */}
            <p className='text-center'><button type="submit" className='bg-green-500 rounded-md text-white px-6 mb-2'>Save</button></p>
          </form>
          {/* <div className='modal-footer'>
            <button
              className='close-button'
              data-dismiss='dialog'
              aria-label='close'
            >
              Close
            </button>
          </div>
        </div> */}
      </section>
      <section id='checklist'>
        <div className='container mx-auto'>
          <div className='flex flex-wrap'>
            <div className='w-full md:w-1/2 lg:w-1/3'>
              <div className='p-2'>
                <div className='bg-white border rounded shadow'>
                  <div className='border-b p-3'>
                    <h5 className='font-bold uppercase text-gray-600'>Audit Header</h5>
                  </div>
                  <div className='p-5'>
                    <form action='submit' className='border-black border-2 rounded-md px-1 text-lg '>
                      <label htmlFor='auditTitle'>Audit Title</label>
                      <input
                        type='text'
                        name='auditTitle'
                        id='auditTitle'
                        className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                      />
                      <label htmlFor='qmsRef'>QMS Reference</label>
                      <input
                        type='text'
                        name='qmsRef'
                        id='qmsRef'
                        className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                      />
                      {/* <label htmlFor="auditLocation">Audit Location</label>
                      <input type="text" name="auditLocation" id="auditLocation" className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'/> */}
                      <p className='text-center'>
                        <button
                          type='submit'
                          className='bg-green-500 rounded-md text-white px-6 mb-2'
                        >
                          Save
                        </button>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full md:w-1/2 lg:w-1/3'>
              <div className='p-2'>
                <div className='bg-white border rounded shadow'>
                  <div className='border-b p-3'>
                    <h5 className='font-bold uppercase text-gray-600'>
                      Audit Header

                    </h5>
                  </div>
                
              
              </div>
      </section>
    </Layout>
  );
};

export default About;

