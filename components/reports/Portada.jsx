import React, { useState, useEffect } from "react";

function Portada(params) {
    console.log(params.events);
    const events = params?.events;
    console.log(events);
    const pageStyle = {
		width: "8.5in",
		height: "11in",
		padding: "0", // Remove padding to ensure the image fills the entire page
		boxSizing: "border-box",
		pageBreakAfter: "always",
		position: "relative",
		overflow: "hidden",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between', // Ensure no content overflows the page
	};
    return (
        <>
            <div style={pageStyle}>
                <img
                    style={{
                        position: 'absolute',
                        zIndex: '-1',
                        width: '100%',
                        // height: '100%'
                    }}
                    src="/img/portada.png"
                    alt="portada"
                />
                <img
                    style={{
                        margin: '10px',
                        width: '25%',
                    }}
                    src="/img/LogoES.png"
                    alt="logoES"
                />
                <div>
                    <div
                        style={{
                            marginLeft: '50px',
                        }}
                    >
                        <h1
                            style={{
                                color: '#004aad',
                                fontSize: '90px',
                            }}
                            className='monumentUltraBold'
                        >
                            Reporte
                        </h1>
                        <h2
                            style={{
                                color: '#38bddf',
                                fontSize: '40px',
                                textTransform: 'capitalize',
                            }}
                            className='monumentRegular'
                        >
                            {events?.name}
                        </h2>
                        <img
                            src={events?.Client.logo}
                            alt="Partner Logo"
                            style={{
                                width: '60%',
                                // marginTop: "10px"
                            }}
                        />
                    </div>
                    <br /><br /><br />
                    <img
                        src="/img/BarraAzul.png"
                        alt="Barra azul"
                        style={{
                            position: 'absolute',
                            width: '40%',
                            left: '0',
                        }}
                    />
                </div>
                <img
                    style={{
                        // position: 'absolute',
                        bottom: '0',
                        left: '0',
                    }}
                    src="/img/Footer.png"
                    alt="footer"
                />
            </div>
        </>
    );
}

export { Portada };
