import React, { useState } from 'react'
import Form from '../components/Forms/Form'
import Input from '../components/inputs/Input'
import axiosInstance from '../axiosInstance'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();

    const [error, setError] = useState();

    const handleSubmit = async (formData, setSuccess) => {
        try {
            const response = await axiosInstance.post('/api/login_check', {
                username: formData.email,
                password: formData.password
            });
            Cookies.set('token', response.data.token, { expires: 1});
            navigate('/');
        } catch (error) {
            if(error.response.status === 401){
                setError(error.response.data.message);
            }
        }
    }

  return (
    <div className='px-4 mt-4'>
        <h2 className='font-bold text-xl'>Connexion</h2>
        <Form onSubmit={handleSubmit} successMessage="Connexion réussi" buttonText="Se connecter">
            <Input label="Entrer votre email" placeholder="johndoe@exemple.com" style="border px-2 rounded-md py-2 focus:outline-none" name="email"/>
            <Input label="Entrer votre mot de passe" placeholder="Mot de passe" style="border px-2 rounded-md py-2 focus:outline-none" name="password" type="password"/>
            {error && (<div role="alert" className="rounded border-s-4 border-red-500 bg-red-50 p-4 my-4">
                <strong className="block font-medium text-red-800" >{error}</strong>
            </div>)}    
        </Form>
    </div>
  )
}

export default Login