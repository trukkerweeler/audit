// components/Signup.tsx
import React, { useRef } from 'react';
import { trpc } from '@/utils/trpc';
import bcrypt from 'bcryptjs';

const Register: React.FC = () => {
	const username = useRef();
	const password = useRef();
	const fName = useRef();
	const lName = useRef();

	const registerMutation = trpc.insertUser.useMutation({
		onSuccess: () => {
		  console.log('Registration successful');
		  // Extra logic for successful registraton
		},
		onError: (error: any) => {
		  console.error('Error:', error);
		  // Handle errors
		},
	  });
	

	const handleRegistration = async () => {
		console.log('registering');
		try {
			// encrypt password
			let salt = bcrypt.genSaltSync(10);
			let hash = bcrypt.hashSync(password.current || '', salt);
			console.log(hash);
			// let firstName = fName.current || '';
		  // Trigger the registration mutation
		  await registerMutation.mutateAsync({
			fName: fName.current || '',
			lName: lName.current || '',
			username: username.current || '',
			password: hash,
		  });	
		  // After successful registration, you can redirect to another page or perform additional actions
		} catch (error) {
		  console.error('Error:', error);
		  // Handle errors
		}
	};
	


	return (
		<div className="max-w-md mx-auto p-8">
		<form onSubmit={handleRegistration}>
			<div className="mb-4">
			<label htmlFor="fName" className="block text-sm font-medium text-gray-700">
				First Name
			</label>
			<input
				type="text"
				id="fName"
				name="fName"
				ref={fName.current}
				className="mt-1 p-2 w-full border rounded-md"
			/>
			</div>

			<div className="mb-4">
			<label htmlFor="lName" className="block text-sm font-medium text-gray-700">
				Last Name
			</label>
			<input
				type="text"
				id="lName"
				name="lName"
				ref={lName.current}
				className="mt-1 p-2 w-full border rounded-md"
			/>
			</div>

			<div className="mb-4">
			<label htmlFor="username" className="block text-sm font-medium text-gray-700">
				Username
			</label>
			<input
				type="text"
				id="username"
				name="username"
				ref={username.current}
				className="mt-1 p-2 w-full border rounded-md"
			/>
			</div>
			<div className="mb-4">
			<label htmlFor="password" className="block text-sm font-medium text-gray-700">
				Password
			</label>
			<input
				type="password"
				id="password"
				name="password"
				ref={password.current}
				className="mt-1 p-2 w-full border rounded-md"
			/>
			</div>
			<button
			type="submit"
			className="bg-blue-500 text-white p-2 rounded-md hover:bg-gray-400 border border-black"
			>
			Sign up
			</button>
		</form>
		</div>
	);
};

export default Register;
