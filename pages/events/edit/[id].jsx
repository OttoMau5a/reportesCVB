import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Layout, AddEdit } from 'components/events';
import { Spinner } from 'components';
import { alertService } from 'services';
import { eventService } from 'services/event.service';
export default Edit;
function Edit() {
    const router = useRouter();
    const [event, setEvent] = useState(null);
    useEffect(() => {
        const { id } = router.query;
        if (!id) return;
        eventService.getAllByEventId(id)
            .then(x => setEvent(x))
            .catch(alertService.error)
    }, [router]);
    return (
        <>
            <Layout>
                <h1 className='flex justify-center text-white p-2'>
                    <span id="welcome" style={{ background: 'rgba(0, 0, 0, 0.5)' }} className='px-4'>
                        Edit event
                    </span>
                </h1>
                {event ? <AddEdit event={event} /> : <Spinner />}
            </Layout>
        </>
    );
}