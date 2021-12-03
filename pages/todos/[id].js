import { collection, doc, getDoc, getDocs } from "@firebase/firestore"
import { db } from "../../firebase"
import Link from 'next/link'

const Details = ({ todosProps }) => {
	const todo = JSON.parse(todosProps)
	return (
		<div className="max-w-2xl container mx-auto h-screen pt-20">
			<div className="container mx-auto shadow-lg px-6 py-8">
				<h3 className="font-bold">{todo.title}</h3>
				<p>{todo.description}</p>
				<div className="mt-4">
					<Link href='/'>
						<a className="text-blue-500">
							Back to home
						</a>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Details

export const getStaticPaths = async () => {
	const snapshot = await getDocs(collection(db, 'todos'))
	const paths = snapshot.docs.map(doc => {
		return {
			params: { id: doc.id.toString() }
		}
	})

	return {
		paths,
		fallback: false
	}
}

export const getStaticProps = async (context) => {
	const id = context.params.id

	const docRef = doc(db, "todos", id)
	const docSnap = await getDoc(docRef)

	return {
		props: {
			todosProps: JSON.stringify(docSnap.data()) || null
		}
	}
}