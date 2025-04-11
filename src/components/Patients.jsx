import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Patients.css';

const Patients = () => {
    const [patients, setPatients] = useState([]);
    const [newPatient, setNewPatient] = useState({
        name: '',
        age: '',
        condition: '',
        status: 'Active'
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [darkMode, setDarkMode] = useState(false);

    // Load from localStorage on first load
    useEffect(() => {
        const storedPatients = localStorage.getItem('patients');
        const storedTheme = localStorage.getItem('darkMode');
        if (storedPatients) {
            setPatients(JSON.parse(storedPatients));
        } else {
            const initialPatients = [
                { id: 1, name: 'John Doe', age: 45, condition: 'Diabetes', status: 'Active' },
                { id: 2, name: 'Jane Smith', age: 32, condition: 'Hypertension', status: 'Inactive' },
            ];
            setPatients(initialPatients);
            localStorage.setItem('patients', JSON.stringify(initialPatients));
        }

        if (storedTheme === 'true') setDarkMode(true);
    }, []);

    // Save to localStorage whenever patients or theme change
    useEffect(() => {
        localStorage.setItem('patients', JSON.stringify(patients));
    }, [patients]);

    useEffect(() => {
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPatient(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddPatient = (e) => {
        e.preventDefault();
        if (!newPatient.name || !newPatient.age || !newPatient.condition) return;

        const updatedPatients = [
            ...patients,
            { id: Date.now(), ...newPatient }
        ];
        setPatients(updatedPatients);

        setNewPatient({
            name: '',
            age: '',
            condition: '',
            status: 'Active'
        });
    };

    const handleDeletePatient = (id) => {
        const updatedPatients = patients.filter(patient => patient.id !== id);
        setPatients(updatedPatients);
    };

    const filteredPatients = patients.filter(patient => {
        const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || patient.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className={`patients-container ${darkMode ? 'dark-mode' : ''}`}>
            <div className="top-bar">
                <h2>Patient Management System</h2>
                <button
                    onClick={() => setDarkMode(prev => !prev)}
                    className="dark-toggle-btn"
                >
                    {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
                </button>
            </div>

            <div className="controls">
                <input
                    type="text"
                    placeholder="Search patients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="status-filter"
                >
                    <option value="all">All Patients</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>

            <motion.form
                onSubmit={handleAddPatient}
                className="add-patient-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <input
                    type="text"
                    name="name"
                    placeholder="Patient Name"
                    value={newPatient.name}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={newPatient.age}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="condition"
                    placeholder="Medical Condition"
                    value={newPatient.condition}
                    onChange={handleInputChange}
                />
                <select name="status" value={newPatient.status} onChange={handleInputChange}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
                <button type="submit">Add Patient</button>
            </motion.form>

            <div className="patients-list">
                {filteredPatients.map(patient => (
                    <div key={patient.id} className="patient-card">
                        <h3>{patient.name}</h3>
                        <p>Age: {patient.age}</p>
                        <p>Condition: {patient.condition}</p>
                        <p>Status: <span className={`status ${patient.status.toLowerCase()}`}>{patient.status}</span></p>
                        <button onClick={() => handleDeletePatient(patient.id)} className="delete-btn">
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Patients;
