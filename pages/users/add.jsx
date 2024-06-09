import { Layout, AddEdit } from 'components/users';

export default Add;

function Add() {
    return (
        <Layout>
            <h1 className='flex justify-center text-white p-2'>
                <span id="welcome" style={{ background: 'rgba(0, 0, 0, 0.5)' }} className='px-4'>
                    Add Admin
                </span>
            </h1>
            <AddEdit />
        </Layout>
    );
}