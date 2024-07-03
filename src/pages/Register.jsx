import React, { useState } from 'react'
import Form from '../components/Forms/Form'
import Input from '../components/inputs/Input'
import axiosInstance from '../axiosInstance';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

function Register() {

    const [error, setError] = useState();

    const navigate = useNavigate();

    const handleSubmit = async (formData) => {
        try {
            if(formData.password !== formData.confirmPassword){
                setError("Les mots de passes ne correspondent pas !");
                return
            }

            const response = await axiosInstance.post('/api/register', {
                email: formData.email,
                password: formData.password
            });
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
    <Header/>
    <div className='px-4'>

        <h2 className='font-bold text-xl pb-4'>S'inscrire</h2>
        <Form onSubmit={handleSubmit}>
            <Input label="Entrer votre email" placeholder="johndoe@exemple.com" style="border px-2 rounded-md py-2 focus:outline-none" name="email" type="email"/>
            <Input label="Entrer votre mot de passe" placeholder="Mot de passe" style="border px-2 rounded-md py-2 focus:outline-none" name="password" type="password"/>
            <Input label="Confirmez votre mot de passe" placeholder="Mot de passe" style="border px-2 rounded-md py-2 focus:outline-none" name="confirmPassword" type="password"/>
            {error && (<div role="alert" className="rounded border-s-4 border-red-500 bg-red-50 p-4 my-4">
                <strong className="block font-medium text-red-800" >{error}</strong>
            </div>)} 
        </Form>
    </div>
    </>
  )
}

export default Register