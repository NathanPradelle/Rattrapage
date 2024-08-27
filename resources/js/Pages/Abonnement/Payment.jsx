import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Inertia } from "@inertiajs/inertia";

export default function Payment({ auth, stripeKey }) {
    const stripePromise = loadStripe(stripeKey);
    const [error, setError] = useState(null);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Payment" />
            <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-gray-800 text-2xl font-bold mb-6">Devenez Membre Particulier+</h2>
                <p className="text-gray-800 mb-6">
                    En devenant membre Particulier+, vous aurez accès à tous les services de l'association pour seulement 5.99 euros par an.
                </p>

                {error ? (
                    <p className="text-red-600 text-lg font-semibold text-center">{error}</p>
                ) : (
                    <Elements stripe={stripePromise}>
                        <PaymentForm setError={setError} />
                    </Elements>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

function PaymentForm({ setError }) {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        axios.post(route('abonnement.payment.intent'))
            .then(response => {
                setClientSecret(response.data.clientSecret);
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    setError(error.response.data.error);
                } else {
                    setError("Une erreur est survenue lors de la création de l'intention de paiement.");
                    console.error('Error fetching clientSecret:', error);
                }
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
            setError(`Erreur de paiement : ${error.message}`);
            console.error('Payment error:', error);
        } else if (paymentIntent.status === 'succeeded') {
            // Payment succeeded, handle it with Inertia
            Inertia.post(route('abonnement.handlePayment'));
        } else {
            setError("Le paiement n'a pas pu être complété. Veuillez réessayer.");
            console.error('Payment intent status:', paymentIntent.status);
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
