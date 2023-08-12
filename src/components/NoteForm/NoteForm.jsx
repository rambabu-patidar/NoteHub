import { useState } from "react";

import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary";
import { FieldError } from "components/FieldError/FieldError";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import { ValidatorService } from "utils/validator";

import styles from "./style.module.css";

const VALIDATOR = {
	title: (value) => {
		return ValidatorService.min(value, 3) || ValidatorService.max(value, 20);
	},
	content: (value) => {
		return ValidatorService.min(value, 3);
	},
};

export function NoteForm(props) {
	const [formValues, setFormValues] = useState({
		title: props.note?.title,
		content: props.note?.content,
	});
	const [formErrors, setFormErrors] = useState({
		title: props.note?.title ? undefined : true,
		content: props.note?.content ? undefined : true,
	});

	const updateFormValues = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setFormValues({ ...formValues, [name]: value });
		validate(name, value);
	};

	const validate = (fieldName, fieldValue) => {
		setFormErrors({
			...formErrors,
			[fieldName]: VALIDATOR[fieldName](fieldValue),
		});
	};

	const hasError = () => {
		for (const fieldName in formErrors) {
			if (formErrors[fieldName]) {
				return true;
			}
		}
		return false;
	};

	const actionIcons = (
		<>
			<div className="col-1">
				{props.onClickEdit && (
					<PencilFill onClick={props.onClickEdit} className={styles.icon} />
				)}
			</div>
			<div className="col-1">
				{props.onClickDelete && (
					<TrashFill onClick={props.onClickDelete} className={styles.icon} />
				)}
			</div>
		</>
	);
	const titleInput = (
		<div className="mb-5">
			<label className="form-label">Title</label>
			<input
				onChange={updateFormValues}
				type="text"
				name="title"
				className="form-control"
				value={formValues.title}
			/>
			<FieldError msg={formErrors.title} />
		</div>
	);
	const contentInput = (
		<div className="mb-5">
			<label className="form-label">Content</label>
			<textarea
				onChange={updateFormValues}
				type="text"
				name="content"
				className="form-control"
				row="5"
				value={formValues.content}
			/>
			<FieldError msg={formErrors.content} />
		</div>
	);

	const submitBtn = (
		<div className={styles.submit_btn}>
			<ButtonPrimary
				isDisabled={hasError()}
				onClick={() => props.onSubmit(formValues)}
			>
				Submit
			</ButtonPrimary>
		</div>
	);

	return (
		<div className={styles.container}>
			<div className="row justify-content-space-between">
				<div className="col-10">
					<h2 className="mb-3">{props.title}</h2>
				</div>
				{actionIcons}
			</div>
			<div className={`mb-3 ${styles.title_input_container}`}>
				{props.isEditable && titleInput}
			</div>
			<div className="mb-3">
				{props.isEditable ? contentInput : <pre>{props.note.content}</pre>}
			</div>
			{props.onSubmit && submitBtn}
		</div>
	);
}
