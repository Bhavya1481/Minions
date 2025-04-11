import { Outlet, Link } from 'react-router-dom';

export default function PatientNavigation() {

return (
    <div>
      <h2>Patient Section</h2>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/patients/reports">Reports</Link> |{' '}
        <Link to="/patients/appointments">Appointments</Link> |{' '}
        <Link to="/patients/billing">Billing</Link>
      </nav>
      <Outlet />
    </div>
  );
}
