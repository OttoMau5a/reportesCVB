import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Layout, AddEdit } from 'components/clients';
import { Spinner } from 'components';
import { alertService } from 'services';
import { clientService } from 'services/personal.service';
export default Edit;
function Edit() {
    const router = useRouter();
    const [client, setClient] = useState(null);
    useEffect(() => {
        const { id } = router.query;
        if (!id) return;
        clientService.getById(id)
            .then(x => setClient(x))
            .catch(alertService.error)
    }, [router]);
    return (
        <>
            <Layout>
                <h1 className='flex justify-center text-white p-2'>
                    <span id="welcome" style={{ background: 'rgba(0, 0, 0, 0.5)' }} className='px-4'>
                        Edit partner
                    </span>
                </h1>
                {client ? <AddEdit client={client} /> : <Spinner />}
            </Layout>
        </>
    );
}