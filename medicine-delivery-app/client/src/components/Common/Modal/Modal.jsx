import React from 'react'
import cl from './Modal.module.scss'
import { useDispatch } from 'react-redux'
import { clearGlobalError, clearGlobalMessage } from '../../../redux/appSlice'
import { toggleIsOrderSubmitted } from '../../../redux/shoppingSlice'
import { useNavigate } from 'react-router-dom'

const Modal = ({ error, message }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const closeModal = () => {
		if (!!error.length) {
			dispatch(clearGlobalError())
		} else {
			dispatch(clearGlobalMessage())
			dispatch(toggleIsOrderSubmitted(false))
			navigate('/')
		}
	}

	const errorList = error.map(error => (
		<div key={error.message} className={cl.errorItem}>
			Error status {error.statusCode} — {error.message}
		</div>
	))
	return (
		<div className={cl.modalContainer}>
			<div className={cl.modal}>
				{!!error.length ? (
					<div className={cl.errorBody}>
						<h1 className={cl.errorTitle}>Something went wrong</h1>
						{errorList}
					</div>
				) : (
					<div>
						<h1 className={cl.messageTitle}>{message.title}</h1>
						<div className={cl.messageBody}>{message.body}</div>
					</div>
				)}
				<button className={cl.btnClose} onClick={closeModal}>
					Confirm
				</button>
			</div>
		</div>
	)
}

export default Modal
