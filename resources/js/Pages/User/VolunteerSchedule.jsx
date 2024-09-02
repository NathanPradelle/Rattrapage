import React from 'react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';

const VolunteerSchedule = ({ assignments }) => {
  console.log(assignments);
  return (
    <AuthenticatedLayout>
      <div className='h-screen'>
        <h1>Your Schedule</h1>
        <table className='table'>
          <thead>
            <tr>
              <th>Date</th>
              <th>Mission</th>
              <th>Location</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment.id}>
                <td>{assignment.date}</td>
                <td>{assignment.mission}</td>
                <td>{assignment.location}</td>
                <td>{assignment.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AuthenticatedLayout>
  );
};

export default VolunteerSchedule;
