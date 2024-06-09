import React, { useState, useEffect } from "react";


function Anexos(params) {
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
						ANEXOS
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
			{/* Pagina 1 de anexos */}
			<div className="pageStyle">
				<img
					style={{
						position: 'absolute',
						zIndex: '0',
						height: '11in',
						right: '0',
						bottom: '0',
					}}
					src="/img/anexos1.png"
					alt="anexos"
				/>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						zIndex: '2',
						position: 'absolute',
						marginTop: '23%',
						width: '100%',
					}}
					className="gothamBook"
				>
					<img
						style={{
							height: '350px',
						}}
						src={events?.Anexos?.[0]?.imageURLSaveTheDate}
						alt="Invitacion Oficial"
					/>
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						zIndex: '2',
						position: 'absolute',
						marginTop: '76%',
						width: '100%',
					}}
					className="gothamBook"
				>
					<img
						style={{
							height: '350px',
						}}
						src={events?.Anexos?.[0]?.imageURLInvitacionOficial}
						alt="Invitacion Oficial"
					/>
				</div>
			</div>
			{/* Pagina 2 de anexos */}
			<div className="pageStyle">
				<img
					style={{
						position: 'absolute',
						zIndex: '0',
						height: '11in',
						right: '0',
						bottom: '0',
					}}
					src="/img/anexos2.png"
					alt="anexos"
				/>
				<div
					style={{
						position: 'absolute',
						zIndex: '3',
						marginTop: '15%',
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
								height: '400px',
								margin: '10px',
							}}
							src={events?.Anexos?.[0]?.imageURLFotoEvento5}
							alt="Foto Evento"
						/>
						<img
							style={{
								height: '400px',
								margin: '10px',
							}}
							src={events?.Anexos?.[0]?.imageURLFotoEvento6}
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
								height: '400px',
								margin: '10px',
							}}
							src={events?.Anexos?.[0]?.imageURLFotoEvento7}
							alt="Foto Evento"
						/>
						<img
							style={{
								height: '400px',
								margin: '10px',
							}}
							src={events?.Anexos?.[0]?.imageURLFotoEvento8}
							alt="Foto Evento"
						/>
					</div>
				</div>
			</div>
			{/* Pagina 3 de anexos */}
			<div className="pageStyle">
				<img
					style={{
						position: 'absolute',
						zIndex: '0',
						height: '11in',
						right: '0',
						bottom: '0',
					}}
					src="/img/anexos3.png"
					alt="anexos3"
				/>
				<div
					style={{
						position: 'absolute',
						zIndex: '3',
						marginTop: '15%',
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
								height: '400px',
								margin: '10px',
							}}
							src={events?.Anexos?.[0]?.imageURLFotoEvento1}
							alt="Foto Evento"
						/>
						<img
							style={{
								height: '400px',
								margin: '10px',
							}}
							src={events?.Anexos?.[0]?.imageURLFotoEvento2}
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
								height: '400px',
								margin: '10px',
							}}
							src={events?.Anexos?.[0]?.imageURLFotoEvento3}
							alt="Foto Evento"
						/>
						<img
							style={{
								height: '400px',
								margin: '10px',
							}}
							src={events?.Anexos?.[0]?.imageURLFotoEvento4}
							alt="Foto Evento"
						/>
					</div>
				</div>
			</div>
			{/* Pagina 4 de anexos */}
			<div className="pageStyle">
				<img
					style={{
						position: 'absolute',
						zIndex: '0',
						height: '11in',
						right: '0',
						bottom: '0',
					}}
					src="/img/anexos4.png"
					alt="anexos"
				/>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						zIndex: '2',
						position: 'absolute',
						marginTop: '18%',
						width: '100%',
					}}
				>
					<img
						style={{
							height: '350px',
						}}
						src={events?.Anexos?.[0]?.imageURLPromocionales}
						alt="Save the date"
					/>
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						zIndex: '2',
						position: 'absolute',
						marginTop: '73%',
						width: '100%',
					}}
					className="gothamBook"
				>
					<img
						style={{
							height: '350px',
						}}
						src={events?.Anexos?.[0]?.imageURLMaterialImpreso}
						alt="Invitacion Oficial"
					/>
				</div>
			</div>
		</>
	);
}

export { Anexos };
