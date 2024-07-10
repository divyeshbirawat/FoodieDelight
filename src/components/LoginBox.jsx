import { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import useStore from '../store/useStore';
import HomePage from '../pages/Homepage';

const LoginBox = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const store = useStore();

  const user = import.meta.env.VITE_USERNAME || 'admin@res.com';
  const pass = import.meta.env.VITE_PASSWORD || 'admin';

  useEffect(() => {
  }, [store.isLoggedIn]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email === user && password === pass) {
      await store.login();
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <Container className='w-full h-full'>
    {store.isLoggedIn ? 
        <HomePage />
        :
      <form className='m-auto p-5 border-2 shadow-xl w-2/4 relative top-[30%] flex flex-col justify-center items-center' onSubmit={handleLogin}>
        <Typography variant="h4" component="h1" className="text-black text-center uppercase" style={{fontWeight: 700}}>Foodie Delight</Typography>
        <Typography variant="h4" component="h1" className="text-black text-center py-4" style={{fontWeight: 500}}>Login</Typography>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
          className="w-3/4"
        />
        <br />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
          className="w-3/4"
        />
        <br />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
        {error && <p>{error}</p>}
      </form>
    }
    </Container>
  );
};

export default LoginBox;
