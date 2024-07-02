import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../components/utils/UserUtils';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import Input from '../components/inputs/Input';
import Form from '../components/Forms/Form';
import Cookies from 'js-cookie';

function MyAccount() {

    const navigate = useNavigate();

    const [userData, setUserData] = useState({});

    const isConnected = isAuthenticated(); 
    
    const [error, setError] = useState();

    const fetchUser = async () => {
        try {
            const response = await axiosInstance.get(`/api/user/${isConnected.username}`);
            setUserData(response.data);
        } catch (error) {
            console.log(error);    
        }
    }

    const handleSubmit = async (formData) => {
        try {
            if(formData.password !== formData.confirmPassword){
                setError("Les mots de passes ne correspondent pas !");
                return;
            }
            const response = await axiosInstance.patch(`/api/user`, {
                email: formData.email,
                password: formData.password
            });
            if(response.data.id){
                setError(null);
                Cookies.remove('token');
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(!isConnected){
            navigate('/login');
            return;
        }
        fetchUser();
    }, [])


  return (
    <div>
        <h2 className='font-bold text-xl p-4'>Mon compte</h2>
        <div className='px-4 mb-4'>
            <div role="alert" className="rounded border-s-4 border-red-500 bg-red-50 p-4">
                <div className="flex items-center gap-2 text-red-800">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path
                        fillRule="evenodd"
                        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                        clipRule="evenodd"
                    />
                    </svg>

                    <strong className="block font-medium"> Attention </strong>
                </div>

                <p className="mt-2 text-sm text-red-700">
                Vous devrez vous reconnecter après le changement de vos informations
                </p>
            </div>
        </div>
        
        <div className='px-4'>
            <Form buttonText="Changer mes informations" onSubmit={handleSubmit}>
                <Input label="Votre email" placeholder="user@exemple.com" style="border px-2 rounded-md py-2 focus:outline-none" name="email" value={userData.email} type="email"/>
                <Input label="Votre mot de passe" placeholder="Mot de passe" style="border px-2 rounded-md py-2 focus:outline-none" name="password" type="password"/>
                <Input label="Confirmez votre mot de passe" placeholder="Mot de passe" style="border px-2 rounded-md py-2 focus:outline-none" name="confirmPassword" type="password"/>
            </Form>
            {error && (<div role="alert" className="rounded border-s-4 border-red-500 bg-red-50 p-4 my-4">
                <strong className="block font-medium text-red-800" >{error}</strong>
            </div>)}
        </div>
    </div>
  )
}

export default MyAccount