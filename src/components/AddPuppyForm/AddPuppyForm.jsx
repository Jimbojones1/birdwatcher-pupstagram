import { useState } from 'react'

import { Button, Form, Segment} from 'semantic-ui-react'

export default function AddPuppyForm({handleAddPost}){

	const [caption, setCaption] = useState('')

	const [selectedFile, setSelectedFile] = useState('')

	function handleChange(e){
		setCaption(e.target.value)
	}

	function handleFileInput(e){
		setSelectedFile(e.target.files[0])
	}

	function handleSubmit(e){
		e.preventDefault();

		// make our state into formData
		// WE have to do this because need to send a 
		// multipart/formdata request to our express because
		// we are sending a photo over!
		const formData = new FormData();
		formData.append('caption', caption);
		formData.append('photo', selectedFile);

		handleAddPost(formData); // handleAddPost comes from the Feed component, because we are storing state there, so we'll define the api call in that component
		// then we can our api call! to our express server!

	}

	return (
		<Segment>
			<Form onSubmit={handleSubmit}>
				<Form.Input 
					placeholder='What on your pups mind?'
					required
					name="caption"
					onChange={handleChange}
				/>
				<Form.Input 
					type='file'
					placeholder="upload image"
					onChange={handleFileInput}
				/>
				<Button type="submit">Add Puppy</Button>
			</Form>
		</Segment>
	)
}