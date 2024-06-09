//import zoneService from "services/zone.service";
export async function fetchData(zones, host) {
    // 1. Get the current month and year
    const today = new Date();
    const currentMonth = today.getMonth(); // Months are 0-indexed
    const currentYear = today.getFullYear();
    // 2. Calculate start and end dates of the current month
    // 2. Calculate start and end dates of the current month
    const startDate = new Date(Date.UTC(currentYear, currentMonth, 1, 6, 1, 0)); // First day of the month at 06:01:00
    const endDate = new Date(Date.UTC(currentYear, currentMonth + 1, 0, 23, 59, 0)); // Last day of the month at 23:59:00
    // 3. Format dates if needed (adjust formatting as required)
    const formattedStart = startDate.toISOString();
    const formattedEnd = endDate.toISOString();
    const start = formattedStart;
    const end = formattedEnd;
    const hostNames = host.map((h) => h.name);
    const hosts = hostNames.map((name) => `"${name}"`).join(", ");
    // Extract the required data from each zone
    // Create an array of promises, each corresponding to a different query
    let query1 = ''
    const promises = zones.map((zone) => {
        const name = zone.name;
        const tag = zone.zoneId;
        query1 = `${name}: zones(filter: {zoneTag: "${tag}"}) {
            # Traffic device types
                 domain:httpRequestsAdaptiveGroups(
                    filter: {
                    datetime_gt: "${start}"
                    datetime_lt: "${end}"
                    clientRequestHTTPHost_in: [
                        ${hosts}
                        ]
                    }
                    limit: 7
                    orderBy: [
                    count_DESC
                    ]
                ) {
                    count
                    dimensions {
                        clientRequestHTTPHost
                    }
                }
            # Para graficas de trafico
                trafficWbGraph:httpRequestsAdaptiveGroups(
                    filter: {
                        datetime_gt: "${start}"
                        datetime_lt: "${end}"
                        clientRequestHTTPHost_in: [
                            ${hosts}
                        ]
                    }
                    limit: 220
                    orderBy: [date_ASC]
                ){
                    count
                    date: dimensions { date } 
                    dimensions { clientRequestHTTPHost }
                }
    
            # Perspectivas/Insights inicio
            # Source device types
                top3DeviceTypes: httpRequestsAdaptiveGroups(
                    filter: {
                    datetime_gt: "${start}"
                    datetime_lt: "${end}"
                    }
                    limit: 3
                    orderBy: [
                    count_DESC
                    ]
                ) {
                    count
                    dimensions {
                    device: clientDeviceType
                    }
                }
            # Edge status code 
                edgeStatusCodes: httpRequestsAdaptiveGroups(
                    filter: {
                        datetime_gt: "${start}"
                        datetime_lt: "${end}"
                    }
                limit: 5
                orderBy: [
                    count_DESC
                ]
                ) {
                    count
                    dimensions {
                        edgeResponseStatus
                    }
                }
    
            # Source IP 
                sourceIP: httpRequestsAdaptiveGroups(
                    filter: {
                        datetime_gt: "${start}"
                        datetime_lt: "${end}"
                    }
                limit: 5
                orderBy: [
                    count_DESC
                ]
                ) {
                    count
                    dimensions {
                        clientIP
                    }
                }    
            # Cache Statuses 
                cacheStatuses: httpRequestsAdaptiveGroups(
                    filter: {
                        datetime_gt: "${start}"
                        datetime_lt: "${end}"
                    }
                limit: 5
                orderBy: [
                    count_DESC
                ]
                ) {
                    count
                    dimensions {
                        cacheStatus
                    }
                }
            # Fin perspectivas/insights
    
            # Eventos de seguridad
                eventosSeguridad: firewallEventsAdaptiveGroups(
                    filter: { datetime_gt: "${start}", datetime_lt: "${end}",
                    action_in: [
                            "log",
                            "skip",
                            "block",
                            "managed_challenge",
                        ]
                    }
                    limit: 4
                    orderBy: [
                        count_DESC
                    ]
                ) {
                    count
                    dimensions {
                        action
                    }
                }
    
            # Para graficas de seguridad
                securityEventsGraph:firewallEventsAdaptiveGroups(
                    filter: {
                        datetime_gt: "${start}",
                        datetime_lt: "${end}",
                        action_in: [
                            "log",
                            "skip",
                            "block",
                            "managed_challenge",
                        ]
                    }
                    limit: 220
                    orderBy: [date_ASC]
                ){
                    count
                    date: dimensions { date } 
                    dimensions { action }
                }
    
            # Eventor por servicio
            # securitylevel esta raro, no da parecido a la plataforma, solo ese
                eventsPerService: firewallEventsAdaptiveGroups(
                    filter: { datetime_gt: "${start}", datetime_lt: "${end}",
                    source_in: [
                            "firewallCustom",
                            "securitylevel",
                            "country",
                            "firewallManaged",
                            "bic"
                        ]
                    }
                    limit: 5
                    orderBy: [ count_DESC ]
                ) {
                    count
                    dimensions {
                        source
                    }
                }
            # Inicio Perspectivas/insights
            # Host
                host: firewallEventsAdaptiveGroups(
                    filter: { datetime_gt: "${start}", datetime_lt: "${end}", 
                    clientRequestHTTPHost_in: [
                            ${hosts}
                        ]
                    }
                    limit: 5
                    orderBy: [ count_DESC ]
                ) {
                    count
                    dimensions {
                        clientRequestHTTPHost
                    }
                }
            # Firewall rules y que inserte el id
                customRules: firewallEventsAdaptiveGroups(
                    filter: { datetime_gt: "${start}", datetime_lt: "${end}", 
                    source_in:[
                        "firewallCustom"
                    ]
                    }
                    limit: 5
                    orderBy: [ count_DESC ]
                ) {
                    count
                    dimensions {
                        description
                    }
                }
            # Managed rules insertar el id
                managedRules: firewallEventsAdaptiveGroups(
                    filter: { datetime_gt: "${start}", datetime_lt: "${end}", 
                    source_in:[
                        "firewallManaged"
                    ]
                    }
                    limit: 5
                    orderBy: [ count_DESC ]
                ) {
                    count
                    dimensions {
                        description
                    }
                }
            # Fin Perspectivas/insights
            
            # Trafico de bots
                botsTraffic: httpRequestsAdaptiveGroups(
                    filter: { datetime_gt: "${start}", datetime_lt: "${end}", 
                    botManagementDecision_in: [
                        "likely_human",
                        "automated",
                        "verified_bot",
                        "likely_automated"
                    ] }
                    limit: 4
                    
                    orderBy: [ count_DESC ]
                ) {
                    count
                    dimensions {
                        botManagementDecision
                    }
                }
    
            # Para graficas de bots
                botTrafficGraph:httpRequestsAdaptiveGroups(
                    filter: {
                        datetime_gt: "${start}"
                        datetime_lt: "${end}"
                        botManagementDecision_in: [
                            "likely_human",
                            "automated",
                            "verified_bot",
                            "likely_automated"
                        ]
                    }
                    limit: 220
                    orderBy: [date_ASC]
                ){
                    count
                    date: dimensions { date } 
                    dimensions { botManagementDecision }
                }
            }\n`;
        // Rest of the query remains the same
        return fetch("http://localhost:3000/api/proxy", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: `query{ viewer { ${query1} } }`,
            }),
        });
    });
    // Send all queries concurrently and wait for all to complete
    const responses = await Promise.all(promises);
    // Check if any response is not ok
    responses.forEach((response, i) => {
        if (!response.ok) {
            throw new Error(`HTTP error for query ${i + 1}! Status: ${response.status}`);
        }
    });
    // Parse JSON for all responses and extract the relevant part
    const data = await Promise.all(responses.map((response) => response.json().then((json) => json.data.viewer)));
    // Combine the data from all responses
    const combinedData = zones.reduce((acc, zone, index) => {
        return { ...acc, [zone.name]: data[index][zone.name] };
    }, {});
    // Wrap the combined data in the desired structure
    const finalData = {
        data: {
            viewer: combinedData,
        },
    };
    console.log(finalData, "data");
    console.log(query1, "query");
    return finalData;
}
