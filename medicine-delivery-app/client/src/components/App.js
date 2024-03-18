import { useSelector } from 'react-redux'
import cl from '../style/App.module.scss'
import Header from './Header/Header'
import Main from './Main/Main'
import Modal from './Common/Modal/Modal'

function App() {
	const error = useSelector(state => state.app.globalError)
	const message = useSelector(state => state.app.globalMessage)
	const isOpenModal = useSelector(state => state.app.isOpenModal)
	return (
		<div className={cl.app}>
			<Header />
			<Main />
			{isOpenModal && <Modal error={error} message={message}/>}
		</div>
	)
}

export default App
