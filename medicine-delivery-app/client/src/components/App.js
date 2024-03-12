import cl from '../style/App.module.scss'
import Header from './Header/Header'
import Main from './Main/Main'

function App() {
	return (
		<div className={cl.app}>
			<Header/>
			<Main/>
		</div>
	)
}

export default App
