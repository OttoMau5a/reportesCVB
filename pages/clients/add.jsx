import { Layout, AddEdit } from 'components/clients';
export default Add;
function Add() {
    return (
        <>
            <Layout>
                <h1 className='flex justify-center text-white p-2'>
                    <span id="welcome" style={{ background: 'rgba(0, 0, 0, 0.5)' }} className='px-4'>
                        Add Partner
                    </span>
                </h1>
                <AddEdit />
            </Layout>
        </>
    );
}