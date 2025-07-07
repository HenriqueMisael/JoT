import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/joy';
import AddIcon from '@mui/icons-material/Add';
import CasinoIcon from '@mui/icons-material/Casino';
import { useJellyStore, type Jelly } from '../store/jellyStore';
import { PREDEFINED_CARDS } from '../data/cards';
import JellyCard from '../components/organisms/JellyCard';
import JellyModal from '../components/organisms/JellyModal';

const JellyCollection: React.FC = () => {
  const jellies = useJellyStore(state => state.jellies);
  const removeJelly = useJellyStore(state => state.removeJelly);
  const addRandomJelly = useJellyStore(state => state.addRandomJelly);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingJelly, setEditingJelly] = useState<Jelly | null>(null);

  const handleAdd = () => {
    setEditingJelly(null);
    setModalOpen(true);
  };

  const handleEdit = (jelly: Jelly) => {
    setEditingJelly(jelly);
    setModalOpen(true);
  };

  const handleRemove = (id: string) => {
    removeJelly(id);
  };

  const handleRandom = () => {
    addRandomJelly();
  };

  return (
    <Box className="p-8">
      <Box className="flex items-center mb-6">
        <Typography level="h2" className="flex-1">
          Jelly Collection
        </Typography>
        <Button startDecorator={<AddIcon />} onClick={handleAdd} variant="plain" color="neutral">
          Add Jelly
        </Button>
        <Button startDecorator={<CasinoIcon />} onClick={handleRandom} variant="plain" color="neutral">
          Random Jelly
        </Button>
      </Box>
      {jellies.length === 0 ? (
        <Box className="flex flex-col items-center justify-center h-96">
          <Typography level="body-lg" className="mb-4">No jellies yet. Start your collection!</Typography>
        </Box>
      ) : (
        <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {jellies.map(jelly => (
            <JellyCard
              key={jelly.id}
              jelly={jelly}
              cards={PREDEFINED_CARDS}
              onEdit={handleEdit}
              onRemove={handleRemove}
            />
          ))}
        </Box>
      )}
      <JellyModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        editingJelly={editingJelly}
        cards={PREDEFINED_CARDS}
      />
    </Box>
  );
};

export default JellyCollection; 