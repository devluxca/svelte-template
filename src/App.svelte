<script>
	import { Styles, Container, Row, Col, Card, Button, Input, Label } from 'sveltestrap'
	import { liveQuery } from 'dexie'

	import { isArray } from '$utils'
	import { useState } from '$utils/hook'
	import { db } from '$service/db'

	const [name, setName] = useState('')

	const createTodo = async () => {
	  await db.todos.add({
	    name: $name,
	    status: 'TODO',
	  })

	  setName('')
	}

	const setterName = ({ target: { value }}) => setName(value)

	const todos = liveQuery(async () => {
	  return await db.todos.toArray()
	})
</script>

<Styles />

<main>
	<Container>
		<Row noGutters>
			<h1>Registre suas tarefas!</h1>
		</Row>
		<Row noGutters class="justify-content-center">
			<Col sm={{ size: 6 }}>
				<Label for="todoText">Quais tarefas temos pra hoje?</Label>
				<Input type="textarea" name="text" id="todoText" on:keyup={setterName} />
			</Col>
		</Row>
		<Row noGutters class="mb-5 justify-content-center mt-4">
			<Col sm={{ size: 2 }}>
				<Button on:click={createTodo} block color={'dark'}>Criar tarefa</Button>
			</Col>
		</Row>
		<Row noGutters>
			<Col sm={{ size: 4 }} />
			<Col sm={{ size: 4 }}>
				{#if isArray($todos)}
					{#each $todos as todo}
						<Card body>{todo.name}</Card>
					{/each}
				{/if}
			</Col>
			<Col sm={{ size: 4 }} />
		</Row>
	</Container>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>