import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link
        color="inherit"
        target="_blank"
        rel="noopener"
        href="https://github.com/caitlinboldt"
      >
        Plantsky Caregiver
      </Link>{' '}
      and{' '}
      <Link
        color="inherit"
        target="_blank"
        rel="noopener"
        href="https://github.com/arstrel"
      >
        Gardener
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
