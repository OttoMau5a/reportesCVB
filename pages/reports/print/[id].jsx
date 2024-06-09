import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { alertService } from 'services';
import { eventService } from 'services/event.service';
import { Portada } from 'components/reports/Portada';
import { Context } from 'components/reports/Context';
import { Target } from 'components/reports/Target';
import { KeyPoints } from 'components/reports/KeyPoints';
import { Anexos } from 'components/reports/Anexos';
import { DatabaseTable } from 'components/reports/DatabaseTable';
export default Print;
function Print() {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const [event, setEvent] = useState(null);
    const [events, setEvents] = useState(null);
    const { id } = router.query;

    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                setIsLoading(true);
                if (!id) return;
                const result = await eventService.getAllByEventId(id);
                if (!result || result.length === 0) {
                    throw new Error('No data found');
                }
                setEvent(result);
                setEvents(result[0]);
            } catch (error) {
                console.error("Error fetching data:", error);
                alertService.error('Error fetching data: ' + error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDataAsync();
    }, [id]);

    if (isLoading) {
        return (
            <>
                <h1>Loading...</h1>
                <div className="loader">
                    <style jsx>{`
                    .loader {
                        border: 16px solid #f3f3f3; /* Light grey */
                        border-top: 16px solid #3498db; /* Blue */
                        border-radius: 50%;
                        width: 120px;
                        height: 120px;
                        animation: spin 2s linear infinite;
                    }

                    @keyframes spin {
                        0% {
                            transform: rotate(0deg);
                        }
                        100% {
                            transform: rotate(360deg);
                        }
                    }
                `}</style>
                </div>
            </>
        );
    }

    console.log('events', events);
    return (
        <>
            <Portada events={events} />

            <img
                style={{
                    width: "8.5in",
                    height: "11in",
                }}
                src="/img/Contenido.png"
                alt="Contenido"
            />

            <Context events={events} />
            <Target events={events} />
            <KeyPoints events={events} />
            <Anexos events={events} />
            <DatabaseTable events={events} />
        </>
    );
}