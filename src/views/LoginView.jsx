import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, TextField, Button, Alert, Link, Checkbox, FormControlLabel } from '@mui/material';

function LoginView() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const result = await login(email, password);
        if (!result.success) {
            setError(result.message);
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5', 
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)', }}>
            <Box sx={{ display: 'flex', height: '60vh', width: '60%' }}>
            {/* Sección Izquierda - Verde con Logo */}
            <Box
                sx={{
                    flex: 1,
                    backgroundColor: '#1db959',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '8px 0 0 8px',
                    '@media (max-width: 900px)': {
                        display: 'none'
                    }
                }}
            >
                <Box
                    component="img"
                    src="/img/logo.webp"
                    alt="COMPUNET Logo"
                    sx={{
                        maxWidth: '300px',
                        maxHeight: '300px',
                        objectFit: 'contain'
                    }}
                />
            </Box>

            {/* Sección Derecha - Formulario */}
            <Box
                sx={{
                    backgroundColor: 'white',
                    borderRadius: '0 8px 8px 0',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    width: '100%', 
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f5f5f5',
                    
                    '@media (max-width: 900px)': {
                        flex: '1 1 100%'
                    }
                }}
            >
                <Box
                    sx={{
                        
                        
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: '600',
                            marginBottom: '8px',
                            color: '#333',
                            textAlign: 'center',
                            marginBottom: '44px'
                        }}
                    >
                        Iniciar sesión
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{
                            color: '#666',
                            marginBottom: '24px'
                        }}
                    >
                        Introduce tus credenciales para acceder a tu cuenta.
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                        <Box sx={{ width: '100%', maxWidth: '300px' }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: '600',
                                    marginBottom: '8px',
                                    color: '#333'
                                }}
                            >
                                Correo electrónico
                            </Typography>
                            <TextField
                                fullWidth
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                variant="outlined"
                                size="small"
                                sx={{
                                    marginBottom: '16px',
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#ddd'
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#bbb'
                                        }
                                    }
                                }}
                            />

                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: '600',
                                    marginBottom: '8px',
                                    color: '#333'
                                }}
                            >
                                Contraseña
                            </Typography>
                            <TextField
                                fullWidth
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                variant="outlined"
                                size="small"
                                sx={{
                                    marginBottom: '12px',
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#ddd'
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#bbb'
                                        }
                                    }
                                }}
                            />
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '24px'
                            }}
                        >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={remember}
                                        onChange={(e) => setRemember(e.target.checked)}
                                        size="small"
                                    />
                                }
                                label={
                                    <Typography variant="body2" sx={{ color: '#666' }}>
                                        Recuérdame
                                    </Typography>
                                }
                            />
                            <Link
                                component={RouterLink}
                                to="/forgot-password"
                                variant="body2"
                                sx={{
                                    color: '#1db959',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        textDecoration: 'underline'
                                    }
                                }}
                            >
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </Box>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                bgcolor: '#1db959',
                                color: 'white',
                                fontWeight: '600',
                                padding: '10px',
                                marginBottom: '16px',
                                textTransform: 'uppercase',
                                fontSize: '14px',
                                '&:hover': {
                                    bgcolor: '#158a43'
                                }
                            }}
                        >
                            Iniciar Sesión
                        </Button>

                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="body2" sx={{ color: '#666' }}>
                                ¿No tienes cuenta?{' '}
                                <Link
                                    component={RouterLink}
                                    to="/register"
                                    sx={{
                                        color: '#1db959',
                                        fontWeight: '600',
                                        textDecoration: 'none',
                                        '&:hover': {
                                            textDecoration: 'underline'
                                        }
                                    }}
                                >
                                    Crear una
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
        </Box>
    );
}

export default LoginView;
