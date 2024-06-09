import React, { useState } from "react";

function Context(params) {
	console.log(params.events);
	const events = params?.events;
	console.log(events);
	const today = new Date();
	const currentYear = today.getFullYear();
	console.log(currentYear, 'currentYear');
	return (
		<>
			{/* Subportada contexto */}
			<div className="coverPageStyle">
				<div
					style={{
						margin: '10px',
						height: '15%',
					}}
				>
					<img
						style={{
							width: '40%',
						}}
						src={events?.Client?.logo}
						alt="Partner Logo"
					/>
				</div>

				<img
					style={{
						position: 'absolute',
						zIndex: '-1',
						width: '100%',
					}}
					src="/img/Contenido-21.png"
					alt="portada"
				/>
				<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						marginTop: '11px',
						width: '100%', // Añadido para asegurar que el div ocupa todo el ancho
					}}
				>
					<h1
						style={{
							marginTop: '5px',
							color: '#ffffff',
							fontSize: '40px',
						}}
						className='monumentUltraBold'
					>
						CONTEXTO
					</h1>
					<h2
						style={{
							color: '#302c56',
							fontSize: '50px',
							textTransform: 'uppercase',
						}}
						className='monumentRegular'
					>
						{events?.name}
					</h2>
				</div>
			</div>
			{/* Pagina 1 de contexto */}
			<div className="pageStyle">
				<img
					style={{
						position: 'absolute',
						zIndex: '0',
						width: "8.5in",
						height: "11in",
					}}
					src="/img/contexto1.png"
					alt="contexto1"
				/>
				<img
					style={{
						position: 'absolute',
						height: '10%',
						zIndex: '2',
						right: '0',
						marginTop: '2%',
					}}
					src='/img/contexto2.png'
					alt="contexto2"
				/>
				<img
					style={{
						position: 'absolute',
						height: '10%',
						zIndex: '2',
						left: '0',
						marginTop: '38%',
					}}
					src='/img/contexto5.png'
					alt="contexto5"
				/>
				<img
					style={{
						height: '38%',
						width: '100%',
						zIndex: '1',
					}}
					src={events?.Contexts?.[0]?.imageURL}
					alt="Context Image"
				/>
				<div
					style={{
						display: 'flex',
						position: 'absolute',
						zIndex: '2',
						justifyContent: 'center',
						bottom: '0',
						width: '100%',
					}}
				>
					<img
						style={{
							height: '200px',
						}}
						src='/img/Topics.png'
						alt="Topics"
					/>
				</div>
				<h1
					style={{
						marginTop: '10px',
						marginLeft: '50%',
						fontSize: '75px',
						zIndex: '2',
						color: 'rgba(10, 40, 157, 0.3)',
					}}
					className="monumentUltraBold"
				>
					{currentYear}
				</h1>
				<div
					style={{
						margin: '8px',
						height: '10%',
					}}
				></div>
				<p
					style={{
						marginLeft: '17%',
						fontSize: '11px',
						textAlign: 'justify',
						marginRight: '3%',
					}}
					className="gothamBook"
					dangerouslySetInnerHTML={{ __html: events?.Contexts?.[0]?.introduction }}
				/>
			</div >
			{/* Pagina 2 de contexto */}
			<div className="pageStyle">
				<img
					style={{
						position: 'absolute',
						width: '100%',
						zIndex: '1',
					}}
					src='/img/contexto4.png'
					alt="contexto2"
				/>
				<div
					style={{
						position: 'absolute', // Añadido para colocar este div encima de los otros
						margin: '10px',
						zIndex: '3',
						marginTop: '17%',
					}}
				>
					<p
						style={{
							marginLeft: '5%',
							fontSize: '11px',
							marginRight: '3%',
						}}
						className="gothamBook"
						dangerouslySetInnerHTML={{ __html: events?.Contexts?.[0]?.eventFormat }}
					/>
				</div>
				<div
					style={{
						position: 'absolute', // Añadido para colocar este div debajo del div de eventFormat
						marginLeft: '18%',
						fontSize: '11px',
						marginRight: '4%',
						zIndex: '2',
						marginTop: '84%',
					}}
					className="gothamBook"
				>
					<p style={{
						fontSize: '11px',
					}}>
						<strong>Fecha: </strong>{events?.Contexts?.[0]?.fecha}
					</p>
					<p style={{
						fontSize: '11px',
					}}>
						<strong>Lugar: </strong>{events?.Contexts?.[0]?.lugar}
					</p>
					<p style={{
						fontSize: '11px',
					}}>
						<strong>Hora: </strong>{events?.Contexts?.[0]?.hora}
					</p>
				</div>

				<img
					style={{
						position: 'absolute',
						zIndex: '0',
						height: '11in',
						right: '0',
						bottom: '0',
					}}
					src="/img/contexto3.png"
					alt="contexto1"
				/>
			</div>
		</>
	);
}

export { Context };