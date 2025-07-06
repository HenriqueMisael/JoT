import { Typography, Box } from '@mui/joy';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Typography level="h2">
        {t('home.welcome')}
      </Typography>
    </Box>
  );
};

export default Home; 