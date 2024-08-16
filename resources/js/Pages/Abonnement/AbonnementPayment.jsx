import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {Inertia} from "@inertiajs/inertia";

export default function AbonnementPayment({ auth, stripeKey }) {
    const stripePromise = loadStripe(stripeKey);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="AbonnementPayment" />
            <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-gray-800 text-2xl font-bold mb-6">Devenez Membre Particulier+</h2>
                <p className="text-gray-800 mb-6">En devenant membre Particulier+, vous aurez accès à tous les services de l'association pour seulement 5.99 euros par an.</p>

                <Elements stripe={stripePromise}>
                    <PaymentForm />
                </Elements>
            </div>
        </AuthenticatedLayout>
    );
}

function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        // Utiliser axios pour récupérer le clientSecret
        axios.post(route('abonnement.payment.intent'))
            .then(response => {
                setClientSecret(response.data.clientSecret);
            })
            .catch(error => {
                console.error('Error fetching clientSecret:', error);
            });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
            },
        });

        if (error) {
            console.error(error);
        } else if (paymentIntent.status === 'succeeded') {
            // Payment succeeded, handle it with Inertia
            Inertia.post(route('abonnement.handlePayment'));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement className="p-4 border border-gray-300 rounded-md mb-6" />
            <button
                type="submit"
                disabled={!stripe || !clientSecret}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
                Payer 5.99 euros
            </button>
        </form>
    );
}
