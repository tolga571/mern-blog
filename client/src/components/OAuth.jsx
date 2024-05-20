import React from 'react';
import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from "../firebase";
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const auth = getAuth(app);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });

        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider);
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL
                })
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Network response was not ok: ${errorText}`);
            }

            const data = await res.json().catch(() => {
                throw new Error('Failed to parse JSON response');
            });

            dispatch(signInSuccess(data));
            navigate('/');
        } catch (error) {
            console.error('Error during sign-in:', error);
            // Kullanıcıya hata mesajı göstermek için bir mekanizma ekleyin
            alert('Google ile oturum açma işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.');
        }
    };

    return (
        <Button type="button" gradientDuoTone="pinkToOrange" outline onClick={handleGoogleClick}>
            <AiFillGoogleCircle className="w-6 h-6 mr-2" />
            Continue with Google
        </Button>
    );
}
