import { addDoc, collection, serverTimestamp, updateDoc, doc } from "@firebase/firestore"
import { db } from "../firebase"
import { useContext, useEffect, useRef } from "react"
import swal from "sweetalert"
import { TodoContext } from "pages/TodoContext"
import { useAuth } from "Auth"

const TodoForm = () => {
	const inputAreaRef = useRef()
	const { currentUser } = useAuth()
	const { todo, setTodo } = useContext(TodoContext)
	const onSubmit = async (event) => {
		event.preventDefault()
		if (todo?.hasOwnProperty('timestamp')) {
			// update the to-do
			const docRef = doc(db, "todos", todo.id)
			const todoUpdated = { ...todo, timestamp: serverTimestamp() }
			updateDoc(docRef, todoUpdated)
			setTodo({ title: '', description: '' })
			swal('Successfully updated', `Todo with id of ${docRef.id} was updated successfully`, "success")
		} else {
			const collectionRef = collection(db, "todos")
			const docRef = await addDoc(collectionRef, { ...todo, email: currentUser.email, timestamp: serverTimestamp() })
			setTodo({ title: '', description: '' })
			swal('Successfully saved', `Todo with title of ${docRef.title} was added successfully`, "success")
		}
	}

	useEffect(() => {
		const checkIfClickedOutside = e => {
			if (!inputAreaRef.current.contains(e.target)) {
				console.log('Outside input area')
				setTodo({ title: '', description: '' })
			} else {
				console.log('Inside input area')
			}
		}
		document.addEventListener("mousedown", checkIfClickedOutside)
		return () => {
			document.removeEventListener("mousedown", checkIfClickedOutside)
		}
	}, [])
	return (
		<div>
			<form className="max-w-2xl container mx-auto mb-10" onSubmit={onSubmit} ref={inputAreaRef}>
				<div className="form-item">
					<label htmlFor="title">Title</label>
					<input
						name="title"
						className="form-control"
						value={todo.title}
						onChange={e => setTodo({ ...todo, title: e.target.value })} />
				</div>
				<div className="form-item">
					<label htmlFor="description">Description</label>
					<textarea
						name="description"
						rows="4"
						className="form-control"
						value={todo.description}
						onChange={e => setTodo({ ...todo, description: e.target.value })} />
				</div>
				<div className="form-item">
					<button className="btn-primary">
						{todo.hasOwnProperty('timestamp') ? 'Update To-do' : 'Add New To-do'}
					</button>
				</div>
			</form>
		</div>
	)
}

export default TodoForm
