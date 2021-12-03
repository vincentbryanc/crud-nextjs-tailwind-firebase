import TodoForm from '@/components/TodoForm'
import Head from 'next/head'
import { useState } from 'react'
import TodoList from '@/components/TodoList'
import { TodoContext } from './TodoContext'
import { useAuth } from 'Auth'
import { auth, db } from '../firebase'
import { verifyIdToken } from '../firebaseAdmin'
import { collection, getDocs, orderBy, query, where } from '@firebase/firestore'
import nookies from 'nookies'

export default function Home({ todosProps }) {
	const { currentUser } = useAuth()
	const [todo, setTodo] = useState({ title: '', description: '' })
	return (
		<div className="flex justify-center min-h-screen py-10">
			<Head>
				<title>NextJS CRUD with firebase</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="container mx-auto max-w-lg">
				<TodoContext.Provider value={{ todo, setTodo }}>
					<div className="flex gap-x-6">
						<img src={currentUser.photoURL} alt="Image failed to load" className="rounded-full mb-6" />
						<div>
							<h1 className="font-bold text-lg mt-4">{currentUser.displayName}</h1>
							<p className="text-blue-800 text-sm cursor-pointer hover:text-blue-600" onClick={() => auth.signOut()}>Logout</p>
						</div>
					</div>
					<TodoForm />
					<TodoList todosProps={todosProps} />
				</TodoContext.Provider>
			</main>
		</div>
	)
}

export async function getServerSideProps(context) {
	try {
		const cookies = nookies.get(context)
		const token = await verifyIdToken(cookies.token)
		const { email } = token
		const collectionRef = collection(db, "todos")
		const q = query(collectionRef, where("email", "==", email), orderBy("timestamp", "desc"))
		const querySnapshot = await getDocs(q)
		let todos = []
		querySnapshot.forEach((doc) => {
			todos.push({ ...doc.data(), id: doc.id, timestamp: doc.data().timestamp.toDate().getTime() })
		})
		console.log('todos', todos)

		return {
			props: {
				todosProps: JSON.stringify(todos) || []
			}
		}
	} catch (error) {
		return {
			props: {}
		}
	}
}
