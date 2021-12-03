import { collection, onSnapshot, orderBy, query, where } from "@firebase/firestore"
import { useAuth } from "Auth"
import { useEffect, useState } from "react"
import { db } from "../firebase"
import Todo from "./Todo"

const TodoList = ({ todosProps }) => {
	const [todos, setTodos] = useState([])
	const { currentUser } = useAuth()
	useEffect(() => {
		setTodos(JSON.parse(todosProps))
	}, [])
	useEffect(() => {
		const collectionRef = collection(db, "todos")

		const q = query(collectionRef, where("email", "==", currentUser?.email), orderBy("timestamp", "desc"))

		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			setTodos(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, timestamp: doc.data().timestamp?.toDate().getTime() })))
		})

		return unsubscribe
	}, [])

	return (
		<div>
			{todos.map(todo => <Todo key={todo.id} id={todo.id} title={todo.title} description={todo.description} timestamp={todo.timestamp} />)}
		</div>
	)
}

export default TodoList
