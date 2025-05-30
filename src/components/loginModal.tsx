"use client"

import {
  Modal,
  Box,
  Typography,
  Button,
  Stack,
  Fade,
  Backdrop,
} from '@mui/material';
import { useRouter } from 'next/navigation';

interface LoginPromptModalProps {
  open: boolean;
  onClose: () => void;
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#000',
  color: '#fff',
  border: '2px solid #FFD700',
  borderRadius: '12px',
  boxShadow: 24,
  p: 4,
  width: 350,
  textAlign: 'center',
};

const LoginPromptModal: React.FC<LoginPromptModalProps> = ({
  open,
  onClose,
}) => {
  const router = useRouter();

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography variant='h6' sx={{ mb: 2, color: '#FFD700' }}>
            Hold On!
          </Typography>
          <Typography variant='body1' sx={{ mb: 3 }}>
            Please login or sign up before adding items to your cart.
          </Typography>
          <Stack direction='row' spacing={2} justifyContent='center'>
            <Button
              variant='contained'
              onClick={() => router.push('/login')}
              sx={{
                backgroundColor: '#FFD700',
                color: '#000',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#e6c200',
                },
              }}
            >
              Login
            </Button>
            <Button
              variant='outlined'
              onClick={() => router.push('/signup')}
              sx={{
                borderColor: '#FFD700',
                color: '#FFD700',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#FFD700',
                  color: '#000',
                },
              }}
            >
              Sign Up
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};

export default LoginPromptModal;
