import { Typography, Box } from '@mui/joy';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  return (
    <Box sx={{ color: 'text.primary' }}>
      <Typography level="h2" sx={{ color: 'text.primary' }}>
        {t('home.welcome')}
      </Typography>
    </Box>
  );
};

export default Home; 