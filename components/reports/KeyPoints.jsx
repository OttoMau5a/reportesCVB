import React, { useState, useEffect } from "react";

function KeyPoints(params) {
	console.log(params.events);
	const events = params?.events;
	console.log(events);

	return (
		<>

			{/* Subportada keypoints */}
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
						Keypoints
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
			{/* Pagina 1 de target */}
			<div className="pageStyle">
				<img
					style={{
						position: 'absolute',
						zIndex: '0',
						width: '100%',
					}}
					src="/img/fondokeypoints.png"
					alt="fondokeypoints"
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
						marginTop: '45%',
					}}
					src='/img/contexto5.png'
					alt="contexto5"
				/>
				<img
					style={{
						height: '43%',
						width: '100%',
						zIndex: '1',
					}}
					src={events?.Keypoints?.[0]?.imageURL}
					alt="Keypoints Image"
				/>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						zIndex: '2',
						position: 'absolute',
						marginTop: '15%',
						width: '100%',
					}}
				>
					<div
						style={{
							display: 'flex', // Para colocar los h1 en fila
							justifyContent: 'space-between', // Para dar espacio entre los h1
						}}
						className="gothamBook"
					>
						<h1 style={{
							fontSize: '50px',
							margin: '0 88px', // Añadido para dar más espacio entre los h1
						}}>
							{events?.Keypoints?.[0]?.countInvitados}
						</h1>
						<h1 style={{
							fontSize: '50px',
							margin: '0 88px', // Añadido para dar más espacio entre los h1
						}}>
							{events?.Keypoints?.[0]?.countAsistentesReales}
						</h1>
						<h1 style={{
							fontSize: '50px',
							margin: '0 88px', // Añadido para dar más espacio entre los h1
						}}>
							{events?.Keypoints?.[0]?.countIndustrias}
						</h1>
					</div>
				</div>
				<div
					style={{
						display: 'flex', // Para colocar los h1 en fila
						// justifyContent: 'space-between', // Para dar espacio entre los h1
						zIndex: '3',
						position: 'absolute',
						marginTop: '42%',
						width: '100%',
						// marginLeft: '32%',
					}}
					className="gothamBook"
				>
					<h1 style={{
						fontSize: '20px',
						marginLeft: '248px',
						color: '#fff',
					}}>
						{events?.Keypoints?.[0]?.countPromotor}%
						{/* 100% */}
					</h1>
					<h1 style={{
						fontSize: '20px',
						marginLeft: '108px',
					}}>
						{events?.Keypoints?.[0]?.countPasivo}
					</h1>
					<h1 style={{
						fontSize: '20px',
						marginLeft: '125px',
					}}>
						{events?.Keypoints?.[0]?.countDetractor}
					</h1>
					<h1 style={{
						fontSize: '20px',
						marginLeft: '140px',
					}}>
						{events?.Keypoints?.[0]?.countNPS}
					</h1>
				</div>
				<div
					style={{
						display: 'flex',
						zIndex: '4',
						position: 'absolute',
						marginTop: '45%',
						marginLeft: '50px',
						width: '40%', // Aumenta el ancho aquí
						height: '200px', // Disminuye la altura aquí
						transform: 'rotate(270deg)',
					}}
					className="gothamBook"
				>
					<div style={{
						height: '20px',
						width: '100%',
						backgroundColor: '#ccc',
						marginLeft: '124px',
					}}>
						<div style={{
							height: '100%',
							width: `${events?.Keypoints?.[0]?.countSatisfaccion}%`,
							// width: '80%',
							backgroundColor: '#13538a',
						}} />
					</div>
				</div>
			</div >

		</>
	);
}

export { KeyPoints };
