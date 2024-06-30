import React from 'react'
import Form from '../components/Forms/Form'
import Input from '../components/inputs/Input'
import axiosInstance from '../axiosInstance'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();

    const handleSubmit = async (formData, setSuccess) => {
        try {
            const response = await axiosInstance.post('/api/login_check', {
                username: formData.email,
                password: formData.password
            });
            Cookies.set('token', response.data.token, { expires: 1});
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <Form onSubmit={handleSubmit} successMessage="Connexion réussi">
        <Input label="Entrer votre email" placeholder="user@exemple.com" style="border px-2 rounded-md py-2 focus:outline-none" name="email"/>
        <Input label="Entrer votre mot de passe" placeholder="Mot de passe" style="border px-2 rounded-md py-2 focus:outline-none" name="password" type="password"/>
    </Form>
  )
}

export default Login