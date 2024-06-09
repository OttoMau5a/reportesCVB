import React, { useState, useEffect } from "react";

const items = ["PreviewDB", "QR_DB"];

function DatabaseTable(params) {
	console.log(params.events);
	const events = params?.events;
	console.log(events);
	return (
		<>

			{/* Subportada targets */}
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
							fontSize: '38px',
						}}
						className='monumentUltraBold'
					>
						Base de datos
					</h1>
					<h2
						style={{
							color: '#302c56',
							fontSize: '50px',
						}}
						className='monumentRegular'
					>
						{events?.name}
					</h2>
				</div>
			</div>
			{/* Pagina 1 de database */}
			<div className="pageStyle">
				<img
					style={{
						position: 'absolute',
						zIndex: '0',
						height: '11in',
						right: '0',
						bottom: '0',
					}}
					src="/img/basededatos.png"
					alt="anexos"
				/>
				<div
					style={{
						position: 'absolute',
						zIndex: '3',
						marginTop: '16%',
						marginLeft: '17%',
						display: 'flex',
						flexDirection: 'column', // Añadido para organizar los divs en columnas
					}}
				>
					<div
						style={{
							display: 'flex', // Añadido para usar flexbox
						}}
					>
						<img
							style={{
								height: '200px',
								margin: '10px',
							}}
							src={events?.DataBases?.[0]?.imageURLPreview}
							alt="Foto Evento"
						/>
					</div>
					<div
						style={{
							display: 'flex', // Añadido para usar flexbox
						}}
					>
						<img
							style={{
								height: '290px',
								marginTop: '240px',
								marginLeft: '170px',
							}}
							src={events?.DataBases?.[0]?.imageURLQR}
							alt="Foto Evento"
						/>
					</div>
				</div>
			</div>

		</>
	);
}

export { DatabaseTable };
