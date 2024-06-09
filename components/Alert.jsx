import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { alertService } from 'services';

export { Alert };

function Alert() {
    const router = useRouter();
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        // subscribe to new alert notifications
        const subscription = alertService.alert.subscribe(alert => {
            setAlert(alert);
            // Automatically clear the alert after 5 seconds
            if (alert) {
                setTimeout(() => {
                    alertService.clear();
                }, 5000); // 5000 milliseconds (5 seconds)
            }
        });

        // unsubscribe when the component unmounts
        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        // clear alert on location change
        alertService.clear();
    }, [router]);

    if (!alert) return null;

    return (
        <div className="container mx-auto">
            <div className="m-3">
                <div
                    className={`flex justify-between rounded-md p-4 ${alert.type === 'alert-success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                        }`}
                >
                    {alert.message}
                    <button
                        type="button"
                        className="ml-4 inline-flex p-1 rounded-full hover:bg-red-800 focus:outline-none"
                        onClick={() => alertService.clear()}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M14.293 5.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 111.414-1.414L10 8.586l4.293-4.293z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
