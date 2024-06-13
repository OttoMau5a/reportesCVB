import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { alertService } from "services";
import { clientService } from "services/personal.service";
import { eventService } from "services/event.service";
import { contextService } from "services/context.service";
import { targetService } from "services/target.service";
import { keypointsService } from "services/keypoints.service";
import { anexosService } from "services/anexos.service";
import { databasesService } from "services/databases.service";
import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import UploadImg from "../UploadImg";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import InfoButton from "../InfoButton";
let ReactQuill;
if (typeof window !== "undefined") {
	ReactQuill = require("react-quill");
}
import "react-quill/dist/quill.snow.css";

export { AddEdit };

function AddEdit(props) {
	const [allClients, setAllClients] = useState([]);

	const [clients, setClients] = useState("");
	const [targets, setTargets] = useState([{ name: "", count: "", idTipoTarget: "" }]);
	const [context, setContext] = useState({
		imageURL: "",
		introduccion: "",
		eventFormat: "",
		fecha: "",
		lugar: "",
		hora: "",
	});
	const [keyPoints, setKeyPoints] = useState({
		imageURL: "",
		countInvitados: "",
		countAsistentesReales: "",
		countIndustrias: "",
		countSatisfaccion: "",
		countPromotor: "",
		countPasivo: "",
		countDetractor: "",
		countNPS: "",
	});
	const [anexos, setAnexos] = useState({
		imageURLSaveTheDate: "",
		imageURLInvitacionOficial: "",
		imageURLFotoEvento1: "",
		imageURLFotoEvento2: "",
		imageURLFotoEvento3: "",
		imageURLFotoEvento4: "",
		imageURLFotoEvento5: "",
		imageURLFotoEvento6: "",
		imageURLFotoEvento7: "",
		imageURLFotoEvento8: "",
		imageURLPromocionales: "",
		imageURLMaterialImpreso: "",
	});
	const [baseDeDatos, setBaseDeDatos] = useState({
		imageURLPreview: "",
		imageURLQR: "",
	});
	const [tipoTargets, setTipoTargets] = useState([]);

	const router = useRouter();
	const event = props?.event ? props.event[0] : undefined;

	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Name is required"),
		partnerId: Yup.string().required("Partner is required"),
	});

	const formOptions = { resolver: yupResolver(validationSchema) };
	const [charCount, setCharCount] = useState({
		introduccion: event?.Contexts?.[0]?.introduction.length,
		eventFormat: event?.Contexts?.[0]?.eventFormat.length,
	});
	if (event) {
		formOptions.defaultValues = {
			...props?.event[0],
			context: {
				imageURL: event?.Contexts?.[0]?.imageURL || "",
				introduccion: event?.Contexts?.[0]?.introduction || "",
				eventFormat: event?.Contexts?.[0]?.eventFormat || "",
				fecha: event?.Contexts?.[0]?.fecha || "",
				lugar: event?.Contexts?.[0]?.lugar || "",
				hora: event?.Contexts?.[0]?.hora || "",
			},
			keypoints: event?.Keypoints?.[0] || {},
			anexos: event?.Anexos?.[0] || {},
			baseDeDatos: event?.DataBases?.[0] || {},
		};
	}

	useEffect(() => {
		if (event) {
			setClients(event.Client.id);
			setContext({
				imageURL: event?.Contexts?.[0]?.imageURL || "",
				introduccion: event?.Contexts?.[0]?.introduction || "",
				eventFormat: event?.Contexts?.[0]?.eventFormat || "",
				fecha: event?.Contexts?.[0]?.fecha || "",
				lugar: event?.Contexts?.[0]?.lugar || "",
				hora: event?.Contexts?.[0]?.hora || "",
			});
			setTargets(
				event.Targets.map((target) => ({
					name: target.name,
					count: target.count,
					idTipoTarget: target.TargetType.id,
				}))
			);
			setKeyPoints(event?.Keypoints?.[0] || {});
			setAnexos(event?.Anexos?.[0] || {});
			setBaseDeDatos(event?.DataBases?.[0] || {});
		}

		const fetchClients = async () => {
			const cl = await clientService.getByStatus(true);
			setAllClients(cl);
		};

		const fetchTipoTargets = async () => {
			const tt = [
				{ id: 1, name: "Industries" },
				{ id: 2, name: "AssistantProfile" },
			];
			setTipoTargets(tt);
		};

		fetchClients();
		fetchTipoTargets();
	}, [event]);

	const { register, handleSubmit, reset, formState, setValue } = useForm(formOptions);
	const { errors } = formState;

	const handleTargetChange = (index, e) => {
		const { name, value } = e.target;
		const newTargets = [...targets];
		newTargets[index][name] = value;
		setTargets(newTargets);
	};

	const addTarget = () => {
		setTargets([...targets, { name: "", count: "", idTipoTarget: "" }]);
	};

	const removeTarget = (index) => {
		const newTargets = [...targets];
		newTargets.splice(index, 1);
		setTargets(newTargets);
	};

	const handleChange = (e, section) => {
		const { name, value } = e.target;
		if (section === "context") {
			setContext((prevContext) => ({
				...prevContext,
				[name]: value,
			}));
		} else if (section === "keypoints") {
			setKeyPoints((prevKeyPoints) => ({
				...prevKeyPoints,
				[name]: value,
			}));
		} else if (section === "anexos") {
			setAnexos((prevAnexos) => ({
				...prevAnexos,
				[name]: value,
			}));
		} else if (section === "baseDeDatos") {
			setBaseDeDatos((prevBaseDeDatos) => ({
				...prevBaseDeDatos,
				[name]: value,
			}));
		}
	};

	const handleQuillChange = (content, field, maxChar) => {
		if (content.length <= maxChar) {
			setCharCount((prevCount) => ({ ...prevCount, [field]: content.length }));
			setContext((prevContext) => ({
				...prevContext,
				[field]: content,
			}));
			setValue(`context.${field}`, content);
		} else {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: `Maximum character limit of ${maxChar} exceeded`,
			});
		}
	};

	const handleUpload = (section, fieldName, url) => {
		if (section === "context") {
			setContext((prevContext) => ({
				...prevContext,
				[fieldName]: url,
			}));
		} else if (section === "anexos") {
			setAnexos((prevAnexos) => ({
				...prevAnexos,
				[fieldName]: url,
			}));
		} else if (section === "keypoints") {
			setKeyPoints((prevKeyPoints) => ({
				...prevKeyPoints,
				[fieldName]: url,
			}));
		} else if (section === "baseDeDatos") {
			setBaseDeDatos((prevBaseDeDatos) => ({
				...prevBaseDeDatos,
				[fieldName]: url,
			}));
		}
		setValue(`${section}.${fieldName}`, url); // Set the URL in the form state
	};

	async function onSubmit(data) {
		alertService.clear();
		try {
			let newEvent;
			const eventData = {
				name: data.name,
				status: 1,
				ClientId: data.partnerId,
			};

			if (event) {
				// Update existing event
				await eventService.update(event.id, eventData);
				newEvent = event;
			} else {
				// Create new event
				newEvent = await eventService.create(eventData);
			}

			const newEventId = newEvent.id;

			const contextData = {
				imageURL: data.context.imageURL || "",
				introduction: data.context.introduccion || "",
				eventFormat: data.context.eventFormat || "",
				fecha: data.context.fecha || "",
				lugar: data.context.lugar || "",
				hora: data.context.hora || "",
				EventId: newEventId,
			};

			const targetData = targets.map((target, index) => ({
				name: target.name || "",
				count: target.count || "",
				TargetTypeId: target.idTipoTarget || "",
				EventId: newEventId,
				id: event?.Targets?.[index]?.id, // Ensure the correct id is passed for update
			}));

			const keypointData = {
				imageURL: data.keypoints.imageURL || "",
				countInvitados: data.keypoints.countInvitados || "",
				countAsistentesReales: data.keypoints.countAsistentesReales || "",
				countIndustrias: data.keypoints.countIndustrias || "",
				countSatisfaccion: data.keypoints.countSatisfaccion || "",
				countPromotor: data.keypoints.countPromotor || "",
				countPasivo: data.keypoints.countPasivo || "",
				countDetractor: data.keypoints.countDetractor || "",
				countNPS: data.keypoints.countNPS || "",
				EventId: newEventId,
			};

			const anexosData = data.anexos || {
				imageURLSaveTheDate: "",
				imageURLInvitacionOficial: "",
				imageURLFotoEvento1: "",
				imageURLFotoEvento2: "",
				imageURLFotoEvento3: "",
				imageURLFotoEvento4: "",
				imageURLFotoEvento5: "",
				imageURLFotoEvento6: "",
				imageURLFotoEvento7: "",
				imageURLFotoEvento8: "",
				imageURLPromocionales: "",
				imageURLMaterialImpreso: "",
			};
			anexosData.EventId = newEventId;

			const databaseData = data.baseDeDatos || {
				imageURLPreview: "",
				imageURLQR: "",
			};
			databaseData.EventId = newEventId;

			const apiCalls = [];

			if (event) {
				// Update existing related data
				apiCalls.push(contextService.update(event.Contexts[0].id, contextData));
				apiCalls.push(...targetData.map((target) => (target.id ? targetService.update(target.id, target) : targetService.create(target))));
				apiCalls.push(keypointsService.update(event.Keypoints[0].id, keypointData));

				if (Object.values(anexosData).some((value) => value !== "" && value !== newEventId)) {
					apiCalls.push(anexosService.update(event.Anexos[0].id, anexosData));
				}

				if (Object.values(databaseData).some((value) => value !== "" && value !== newEventId)) {
					apiCalls.push(databasesService.update(event.DataBases[0].id, databaseData));
				}
			} else {
				// Create new related data
				apiCalls.push(contextService.create(contextData));
				apiCalls.push(...targetData.map((target) => targetService.create(target)));
				apiCalls.push(keypointsService.create(keypointData));

				if (Object.values(anexosData).some((value) => value !== "" && value !== newEventId)) {
					apiCalls.push(anexosService.create(anexosData));
				}

				if (Object.values(databaseData).some((value) => value !== "" && value !== newEventId)) {
					apiCalls.push(databasesService.create(databaseData));
				}
			}

			await Promise.allSettled(apiCalls);

			Swal.fire({
				position: "center",
				icon: "success",
				title: event ? "Event updated" : "Event added",
				showConfirmButton: false,
				timer: 2000,
			});
			router.push("/events");
		} catch (error) {
			Swal.fire({
				position: "center",
				icon: "error",
				title: error.message || "An error occurred",
				showConfirmButton: false,
				timer: 2000,
			});
			console.error(error);
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-4">
			<div className="mb-6">
				<label className="block text-gray-700 font-bold mb-2">Event Name</label>
				<input
					name="name"
					type="text"
					{...register("name")}
					className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
						errors.name ? "border-red-500" : ""
					}`}
				/>
				{errors.name && <p className="text-red-500 text-xs italic mt-2">{errors.name.message}</p>}
			</div>
			<div className="mb-6">
				<label className="block text-gray-700 font-bold mb-2">Partner</label>
				<select
					{...register("partnerId")}
					className="block w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					value={clients}
					onChange={(e) => setClients(e.target.value)}
				>
					<option value=""></option>
					{allClients.map((cl) => (
						<option key={cl.id} value={cl.id}>
							{cl.name}
						</option>
					))}
				</select>
			</div>

			<Accordion className="mb-6">
				<AccordionSummary expandIcon={<ArrowDownwardIcon />} aria-controls="contexto-content" id="contexto-header">
					<label className="font-bold">Contexto</label>
				</AccordionSummary>
				<AccordionDetails>
					<div className="mb-6">
						<InfoButton cName="left-1" infoText="Subir unicamente imagenes en horizontal." />
						<UploadImg fieldName="imageURL" label="Image Context" onUpload={(fieldName, url) => handleUpload("context", fieldName, url)} />
						{context.imageURL && <img src={context.imageURL} alt="Uploaded" className="w-32 h-32 object-cover mt-2 rounded-md" />}
					</div>
					<div className="mb-6" style={{ marginBottom: "20px" }}>
						<label className="block text-gray-700 font-bold mb-2">Introducción</label>
						<ReactQuill
							value={context.introduccion}
							onChange={(content) => handleQuillChange(content, "introduccion", 1500)}
							style={{ height: "300px", marginBottom: "20px" }}
						/>
						<p>{`${charCount.introduccion}/1500`}</p>
						<br />
					</div>
					<div className="mb-6" style={{ marginBottom: "20px" }}>
						<label className="block text-gray-700 font-bold mb-2">Event Format</label>
						<ReactQuill
							value={context.eventFormat}
							onChange={(content) => handleQuillChange(content, "eventFormat", 4000)}
							style={{ height: "300px", marginBottom: "20px" }}
						/>
						<p>{`${charCount.eventFormat}/4000`}</p>
						<br />
					</div>

					<div className="mb-6">
						<label className="block text-gray-700 font-bold mb-2">Fecha</label>
						<input
							type="text"
							name="fecha"
							{...register("context.fecha")}
							onChange={(e) => handleChange(e, "context")}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>
					<div className="mb-6">
						<label className="block text-gray-700 font-bold mb-2">Lugar</label>
						<input
							type="text"
							name="lugar"
							{...register("context.lugar")}
							onChange={(e) => handleChange(e, "context")}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>
					<div className="mb-6">
						<label className="block text-gray-700 font-bold mb-2">Hora</label>
						<input
							type="text"
							name="hora"
							{...register("context.hora")}
							onChange={(e) => handleChange(e, "context")}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>
				</AccordionDetails>
			</Accordion>

			<Accordion className="mb-6">
				<AccordionSummary expandIcon={<ArrowDownwardIcon />} aria-controls="target-content" id="target-header">
					<label className="font-bold">Target</label>
				</AccordionSummary>
				<AccordionDetails>
					<InfoButton
						cName="left-1"
						infoText="Agrega el nombre de la industria o perfil de asistente, la cantidad de asistentes y su clasificación si es industria o tipo de perfil de asistente."
					/>
					{targets.map((target, index) => (
						<div key={index} className="mb-4 border rounded p-4">
							<div className="mb-4">
								<label className="block text-gray-700 font-bold mb-2">Name</label>
								<input
									type="text"
									name="name"
									value={target.name}
									onChange={(e) => handleTargetChange(index, e)}
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								/>
							</div>
							<div className="mb-4">
								<label className="block text-gray-700 font-bold mb-2">Count</label>
								<input
									type="number"
									name="count"
									value={target.count}
									onChange={(e) => handleTargetChange(index, e)}
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									min={0}
									onKeyDown={(e) => {
										if (e.key === "." || e.key === "," || e.key === "-") {
											e.preventDefault();
										}
									}}
								/>
							</div>
							<div className="mb-4">
								<label className="block text-gray-700 font-bold mb-2">Tipo Target</label>
								<select
									name="idTipoTarget"
									value={target.idTipoTarget}
									onChange={(e) => handleTargetChange(index, e)}
									className="block w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								>
									<option value=""></option>
									{tipoTargets.map((tipo) => (
										<option key={tipo.id} value={tipo.id}>
											{tipo.name}
										</option>
									))}
								</select>
							</div>
							<button type="button" onClick={() => removeTarget(index)} className="text-red-500 hover:text-red-700">
								Remove
							</button>
						</div>
					))}
					<button type="button" onClick={addTarget} className="text-blue-500 hover:text-blue-700">
						Add Target
					</button>
				</AccordionDetails>
			</Accordion>

			<Accordion className="mb-6">
				<AccordionSummary expandIcon={<ArrowDownwardIcon />} aria-controls="keypoints-content" id="keypoints-header">
					<label className="font-bold">Key Points</label>
				</AccordionSummary>
				<AccordionDetails>
					<div className="mb-6">
						<InfoButton cName="left-1" infoText="Subir unicamente imagenes en horizontal." />
						<UploadImg fieldName="imageURL" label="Image URL" onUpload={(fieldName, url) => handleUpload("keypoints", fieldName, url)} />
						{keyPoints.imageURL && <img src={keyPoints.imageURL} alt="Uploaded" className="w-32 h-32 object-cover mt-2 rounded-md" />}
					</div>
					<div className="mb-6">
						<label className="block text-gray-700 font-bold mb-2">Count Invitados</label>
						<input
							type="number"
							name="countInvitados"
							{...register("keypoints.countInvitados")}
							onChange={(e) => handleChange(e, "keypoints")}
							onKeyDown={(e) => {
								if (e.key === "." || e.key === "," || e.key === "-") {
									e.preventDefault();
								}
							}}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							min={0}
						/>
					</div>
					<div className="mb-6">
						<label className="block text-gray-700 font-bold mb-2">Count Asistentes Reales</label>
						<input
							type="number"
							name="countAsistentesReales"
							{...register("keypoints.countAsistentesReales")}
							onChange={(e) => handleChange(e, "keypoints")}
							onKeyDown={(e) => {
								if (e.key === "." || e.key === "," || e.key === "-") {
									e.preventDefault();
								}
							}}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							min={0}
						/>
					</div>
					<div className="mb-6">
						<label className="block text-gray-700 font-bold mb-2">Count Industrias</label>
						<input
							type="number"
							name="countIndustrias"
							{...register("keypoints.countIndustrias")}
							onChange={(e) => handleChange(e, "keypoints")}
							onKeyDown={(e) => {
								if (e.key === "." || e.key === "," || e.key === "-") {
									e.preventDefault();
								}
							}}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							min={0}
						/>
					</div>
					<div className="mb-6">
						<div className="flex justify-between">
							<label className="block text-gray-700 font-bold mb-2">Count Satisfacción</label>
							<InfoButton cName="left-1" infoText="Ingresa el nivel de satisfacción del evento de 0 a 100." />
						</div>
						<input
							type="number"
							name="countSatisfaccion"
							{...register("keypoints.countSatisfaccion")}
							onChange={(e) => handleChange(e, "keypoints")}
							onKeyDown={(e) => {
								if (e.key === "." || e.key === "," || e.key === "-") {
									e.preventDefault();
								}
							}}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							defaultValue={0}
							min={0}
							max={100}
						/>
					</div>
					<div className="mb-6">
						<div className="flex justify-between">
							<label className="block text-gray-700 font-bold mb-2">Count Promotor</label>
							<InfoButton cName="left-1" infoText="Ingresa el nivel de promotor del evento de 0 a 100." />
						</div>
						<input
							type="number"
							name="countPromotor"
							{...register("keypoints.countPromotor")}
							onChange={(e) => handleChange(e, "keypoints")}
							onKeyDown={(e) => {
								if (e.key === "." || e.key === "," || e.key === "-") {
									e.preventDefault();
								}
							}}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							defaultValue={100}
							min={0}
							max={100}
						/>
					</div>
					<div className="mb-6">
						<label className="block text-gray-700 font-bold mb-2">Count Pasivo</label>
						<input
							type="number"
							name="countPasivo"
							{...register("keypoints.countPasivo")}
							onChange={(e) => handleChange(e, "keypoints")}
							onKeyDown={(e) => {
								if (e.key === "." || e.key === "," || e.key === "-") {
									e.preventDefault();
								}
							}}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							defaultValue={0}
							min={0}
						/>
					</div>
					<div className="mb-6">
						<label className="block text-gray-700 font-bold mb-2">Count Detractor</label>
						<input
							type="number"
							name="countDetractor"
							{...register("keypoints.countDetractor")}
							onChange={(e) => handleChange(e, "keypoints")}
							onKeyDown={(e) => {
								if (e.key === "." || e.key === "," || e.key === "-") {
									e.preventDefault();
								}
							}}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							defaultValue={0}
							min={0}
						/>
					</div>
					<div className="mb-6">
						<label className="block text-gray-700 font-bold mb-2">Count NPS</label>
						<input
							type="number"
							name="countNPS"
							{...register("keypoints.countNPS")}
							onChange={(e) => handleChange(e, "keypoints")}
							onKeyDown={(e) => {
								if (e.key === "." || e.key === "," || e.key === "-") {
									e.preventDefault();
								}
							}}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							defaultValue={0}
							min={0}
						/>
					</div>
				</AccordionDetails>
			</Accordion>

			<Accordion className="mb-6">
				<AccordionSummary expandIcon={<ArrowDownwardIcon />} aria-controls="anexos-content" id="anexos-header">
					<label className="font-bold">Anexos</label>
				</AccordionSummary>
				<AccordionDetails>
					<div className="mb-6">
						<label className="block text-gray-700 font-bold mb-2">Save The Date</label>
						<UploadImg fieldName="imageURLSaveTheDate" label="Save The Date" onUpload={(fieldName, url) => handleUpload("anexos", fieldName, url)} />
						{anexos.imageURLSaveTheDate && <img src={anexos.imageURLSaveTheDate} alt="Uploaded" className="w-32 h-32 object-cover mt-2 rounded-md" />}
					</div>
					<div className="mb-6">
						<label className="block text-gray-700 font-bold mb-2">Invitacion Oficial</label>
						<UploadImg fieldName="imageURLInvitacionOficial" label="Invitacion Oficial" onUpload={(fieldName, url) => handleUpload("anexos", fieldName, url)} />
						{anexos.imageURLInvitacionOficial && <img src={anexos.imageURLInvitacionOficial} alt="Uploaded" className="w-32 h-32 object-cover mt-2 rounded-md" />}
					</div>
					<div className="mb-6">
						<div className="flex justify-between">
							<label className="block text-gray-700 font-bold mb-2">Foto Evento 1</label>
							<InfoButton cName="left-1" infoText="En las fotos del evento solamente subir fotos tomadas en vertical para mantener un formato estable" />
						</div>
						<UploadImg fieldName="imageURLFotoEvento1" label="Foto Evento 1" onUpload={(fieldName, url) => handleUpload("anexos", fieldName, url)} />
						{anexos.imageURLFotoEvento1 && <img src={anexos.imageURLFotoEvento1} alt="Uploaded" className="w-32 h-32 object-cover mt-2 rounded-md" />}
					</div>
					<div className="mb-6">
						<label className="block text-gray-700 font-bold mb-2">Foto Evento 2</label>
						<UploadImg fieldName="imageURLFotoEvento2" label="Foto Evento 2" onUpload={(fieldName, url) => handleUpload("anexos", fieldName, url)} />
						{anexos.imageURLFotoEvento2 && <img src={anexos.imageURLFotoEvento2} alt="Uploaded" className="w-32 h-32 object-cover mt-2 rounded-md" />}
					</div>
					<div className="mb-6">
						<label className="block text-gray-700 font-bold mb-2">Foto Evento 3</label>
						<UploadImg fieldName="imageURLFotoEvento3" label="Foto Evento 3" onUpload={(fieldName, url) => handleUpload("anexos", fieldName, url)} />
						{anexos.imageURLFotoEvento3 && <img src={anexos.imageURLFotoEvento3} alt="Uploaded" className="w-32 h-32 object-cover mt-2 rounded-md" />}
					</div>
					<div className="mb-6">
						<label className="block text-gray-700 font-bold mb-2">Foto Evento 4</label>
						<UploadImg fieldName="imageURLFotoEvento4" label="Foto Evento 4" onUpload={(fieldName, url) => handleUpload("anexos", fieldName, url)} />
						{anexos.imageURLFotoEvento4 && <img src={anexos.imageURLFotoEvento4} alt="Uploaded" className="w-32 h-32 object-cover mt-2 rounded-md" />}
					</div>
					<div className="mb-6">
						<label className="block text-gray-700 font-bold mb-2">Foto Evento 5</label>
						<UploadImg fieldName="imageURLFotoEvento5" label="Foto Evento 5" onUpload={(fieldName, url) => handleUpload("anexos", fieldName, url)} />
						{anexos.imageURLFotoEvento5 && <img src={anexos.imageURLFotoEvento5} alt="Uploaded" className="w-32 h-32 object-cover mt-2 rounded-md" />}
					</div>
					<div className="mb-6">
						<label className="block text-gray-700 font-bold mb-2">Foto Evento 6</label>
						<UploadImg fieldName="imageURLFotoEvento6" label="Foto Evento 6" onUpload={(fieldName, url) => handleUpload("anexos", fieldName, url)} />
						{anexos.imageURLFotoEvento6 && <img src={anexos.imageURLFotoEvento6} alt="Uploaded" className="w-32 h-32 object-cover mt-2 rounded-md" />}
					</div>
					<div className="mb-6">
						<label className="block text-gray-700 font-bold mb-2">Foto Evento 7</label>
						<UploadImg fieldName="imageURLFotoEvento7" label="Foto Evento 7" onUpload={(fieldName, url) => handleUpload("anexos", fieldName, url)} />
						{anexos.imageURLFotoEvento7 && <img src={anexos.imageURLFotoEvento7} alt="Uploaded" className="w-32 h-32 object-cover mt-2 rounded-md" />}
					</div>
					<div className="mb-6">
						<label className="block text-gray-700 font-bold mb-2">Foto Evento 8</label>
						<UploadImg fieldName="imageURLFotoEvento8" label="Foto Evento 8" onUpload={(fieldName, url) => handleUpload("anexos", fieldName, url)} />
						{anexos.imageURLFotoEvento8 && <img src={anexos.imageURLFotoEvento8} alt="Uploaded" className="w-32 h-32 object-cover mt-2 rounded-md" />}
					</div>
					<div className="mb-6">
						<label className="block text-gray-700 font-bold mb-2">Promocionales</label>
						<UploadImg fieldName="imageURLPromocionales" label="Promocionales" onUpload={(fieldName, url) => handleUpload("anexos", fieldName, url)} />
						{anexos.imageURLPromocionales && <img src={anexos.imageURLPromocionales} alt="Uploaded" className="w-32 h-32 object-cover mt-2 rounded-md" />}
					</div>
					<div className="mb-6">
						<label className="block text-gray-700 font-bold mb-2">Material Impreso</label>
						<UploadImg fieldName="imageURLMaterialImpreso" label="Material Impreso" onUpload={(fieldName, url) => handleUpload("anexos", fieldName, url)} />
						{anexos.imageURLMaterialImpreso && <img src={anexos.imageURLMaterialImpreso} alt="Uploaded" className="w-32 h-32 object-cover mt-2 rounded-md" />}
					</div>
				</AccordionDetails>
			</Accordion>

			<Accordion className="mb-6">
				<AccordionSummary expandIcon={<ArrowDownwardIcon />} aria-controls="baseDeDatos-content" id="baseDeDatos-header">
					<label className="font-bold">Base de Datos</label>
				</AccordionSummary>
				<AccordionDetails>
					<div className="mb-6">
						<label className="block text-gray-700 font-bold mb-2">Image Preview</label>
						<UploadImg fieldName="imageURLPreview" label="Image Preview" onUpload={(fieldName, url) => handleUpload("baseDeDatos", fieldName, url)} />
						{baseDeDatos.imageURLPreview && <img src={baseDeDatos.imageURLPreview} alt="Uploaded" className="w-32 h-32 object-cover mt-2 rounded-md" />}
					</div>
					<div className="mb-6">
						<label className="block text-gray-700 font-bold mb-2">Image QR</label>
						<UploadImg fieldName="imageURLQR" label="Image QR" onUpload={(fieldName, url) => handleUpload("baseDeDatos", fieldName, url)} />
						{baseDeDatos.imageURLQR && <img src={baseDeDatos.imageURLQR} alt="Uploaded" className="w-32 h-32 object-cover mt-2 rounded-md" />}
					</div>
				</AccordionDetails>
			</Accordion>

			<div className="flex justify-center">
				<button
					type="submit"
					disabled={formState.isSubmitting}
					className="mr-2 font-bold inline-flex items-center px-10 py-2 border border-transparent rounded-full shadow-sm text-white bg-blue-800 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					{formState.isSubmitting && <span className="animate-spin inline-block w-4 h-4 border border-white rounded-full mr-2"></span>}
					Save
				</button>
				<button
					onClick={() => reset(formOptions.defaultValues)}
					type="button"
					disabled={formState.isSubmitting}
					className="font-bold mr-2 inline-flex items-center px-10 py-2 border border-gray-300 rounded-full shadow-sm text-gray-700 bg-white hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 md:ml-2 mt-2 md:mt-0"
				>
					Reset
				</button>
				<Link
					href="/events"
					className="font-bold mr-2 inline-flex items-center px-10 py-2 border border-gray-300 rounded-full shadow-sm text-gray-700 bg-white hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 md:ml-2 mt-2 md:mt-0"
				>
					Cancel
				</Link>
			</div>
		</form>
	);
}
