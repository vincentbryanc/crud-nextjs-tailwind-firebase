import { deleteDoc, doc } from '@firebase/firestore'
import { db } from '../firebase'
import moment from 'moment'
import { useContext } from 'react'
import { TodoContext } from 'pages/TodoContext'
import { useRouter } from 'next/router'

function Todo({ id, timestamp, title, description }) {
	const { setTodo } = useContext(TodoContext)
	const router = useRouter()

	const deleteTodo = async (id, e) => {
		e.stopPropagation()
		const docRef = doc(db, "todos", id)
		await deleteDoc(docRef)
		swal('Successfully deleted', `Todo with title of ${docRef.id} was deleted successfully`, "success")
	}

	const seeMore = async (id, e) => {
		e.stopPropagation()
		router.push(`/todos/${id}`)
	}

	return (
		<div className="shadow-lg px-8 py-6 mb-5" onClick={() => setTodo({ id, title, description, timestamp })}>
			<div className="flex items-center gap-x-10">
				<div className="flex-grow">
					<h3 className="font-bold">{title}</h3>
					<p className="text-sm py-1 text-justify overflow-ellipsis overflow-hidden">{description}</p>
					<p className="text-xs">{moment(timestamp).format("MMMM d, yyyy hh:mm A")}</p>
				</div>
				<div className="flex gap-x-2">
					<button onClick={e => seeMore(id, e)}>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
						</svg>
					</button>
					<button onClick={e => deleteTodo(id, e)}>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
						</svg>
					</button>
				</div>
			</div>
		</div>

	)
}

export default Todo
