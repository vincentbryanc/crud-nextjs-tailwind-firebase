import ReactLoading from 'react-loading'

const Loading = ({type, color}) => {
	return (
		<div className="flex items-center justify-center h-screen">
			<ReactLoading type={type} color={color} />
		</div>
	)
}

export default Loading
