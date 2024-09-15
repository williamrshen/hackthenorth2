import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

    
    const [name, setName] = useState('');
    const [users, setUsers] = useState([]);

    // Fetch users from the backend on component load
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users', { name });
            setUsers([...users, response.data]); // Add new user to the list
            setName(''); // Clear the input field
        } catch (error) {
            console.error('Error submitting name:', error);
        }
    };
    
    const [gender, setGender] = useState('');

    const handlePredict = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/predict', { name });
            setGender(response.data.gender);
        } catch (error) {
            console.error('Error predicting gender:', error);
        }
    };

    // Function to handle removing a user
    const handleRemove = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/users/${id}`);
            if (response.status === 200) {
                // Only remove the user from the UI if the server successfully deletes them
                setUsers(users.filter(user => user._id !== id));
            } else {
                console.error('Failed to remove user:', response.data.message);
            }
        } catch (error) {
            console.error('Error removing user:', error);
        }
    };

    return (
        <div className="App">
            <h1>User Form</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                />
                <button type="submit">Submit</button>
            </form>

            <h2>Users</h2>
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        {user.name} 
                        <button onClick={() => handleRemove(user._id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <div className="App">
            <h1>Name Gender Predictor</h1>
            <form onSubmit={handlePredict}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter a name"
                />
                <button type="submit">Predict</button>
            </form>
            {gender && <p>Predicted Gender: {gender}</p>}
        </div>
        </div>
        
    );
}

export default App;
