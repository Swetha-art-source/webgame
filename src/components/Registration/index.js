import React, { useState } from 'react';
import "./index.css";


const Registration = ({ onStart }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');

  const handleStartClick = () => {
    if (name && email && mobile && difficulty) {
      onStart({ name, email, mobile, difficulty });
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className='bg-container'>
      <h1 className='heading'>User Registration</h1>
      <div className='layout'>
      <div className='card-container'>
      <input
      className='input'
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
      className='input'
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
      className='input'
        type="text"
        placeholder="Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <select className='input' value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
      <button onClick={handleStartClick} className='button'>Register Now</button>
      </div>
      </div>
    </div>
  );
};

export default Registration;
