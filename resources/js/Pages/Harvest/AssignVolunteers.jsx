import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import AdminLayout from '@/Layouts/AdminLayout.jsx';

export default function AssignVolunteers({ request, volunteers, auth }) {
    const { data, setData, post, errors } = useForm({
        volunteers: [],
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('harvest-requests.assign.store', request.id));
    }
    console.log(volunteers);
    return (
        <AdminLayout
            user={auth.user}>
            <div>
                <h1>Assign Volunteers to {request.product_type} Collection</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                        <label>Select Volunteers</label>
                        {volunteers.map(volunteer => (
                            <div key={volunteer.id}>
                                <input
                                    type="checkbox"
                                    value={volunteer.id}
                                    onChange={e => {
                                        const selected = data.volunteers.includes(volunteer.id);
                                        setData('volunteers', selected
                                            ? data.volunteers.filter(v => v !== volunteer.id)
                                            : [...data.volunteers, volunteer.id]);
                                    }}
                                />
                                {volunteer.name} ({
                                [
                                    volunteer.benevole?.service1?.name,
                                    volunteer.benevole?.service2?.name,
                                    volunteer.benevole?.service3?.name
                                ].filter(Boolean).join(', ')
                            })
                            </div>
                        ))}
                        {errors.volunteers && <div className="text-danger">{errors.volunteers}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary">Assign Volunteers</button>
                </form>
            </div>
        </AdminLayout>
    );
}
