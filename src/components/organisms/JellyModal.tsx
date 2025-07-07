import React, { useState, useEffect, useRef } from 'react';
import { Modal, ModalDialog, Button, Typography, Chip, Tooltip, Alert, Box, Input, FormControl, FormLabel } from '@mui/joy';
import CheckIcon from '@mui/icons-material/Check';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ShieldIcon from '@mui/icons-material/Shield';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import type { Jelly } from '../../store';
import type { Card } from '../../data/cards';
import { useJellyStore } from '../../store';
import AttributeDots from '../atoms/AttributeDots';
import JellyCardDisplay from '../molecules/JellyCardDisplay';
import { useHotkeys } from 'react-hotkeys-hook';
import { CtrlKey, EnterKey, BackspaceKey } from '../atoms/ShortcutDecorator';

interface JellyModalProps {
  open: boolean;
  onClose: () => void;
  editingJelly: Jelly | null;
  cards: Card[];
}

const MAX_ATTRIBUTE = 10;
const MAX_TOTAL = 18;
const CARDS_REQUIRED = 4;

const JellyModal: React.FC<JellyModalProps> = ({ open, onClose, editingJelly, cards }) => {
  const addJelly = useJellyStore(s => s.addJelly);
  const updateJelly = useJellyStore(s => s.updateJelly);

  const [name, setName] = useState('');
  const [body, setBody] = useState(1);
  const [reflexes, setReflexes] = useState(1);
  const [skill, setSkill] = useState(1);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editingJelly) {
      setName(editingJelly.name || '');
      setBody(editingJelly.body);
      setReflexes(editingJelly.reflexes);
      setSkill(editingJelly.skill);
      setSelectedCards(editingJelly.cards);
    } else {
      setName('');
      setBody(1);
      setReflexes(1);
      setSkill(1);
      setSelectedCards([]);
    }
    setError(null);
  }, [editingJelly, open]);

  const total = body + reflexes + skill;

  const handleDotClick = (setter: (v: number) => void, value: number) => {
    if (total - (body + reflexes + skill) + value <= MAX_TOTAL) {
      setter(value);
    } else if (value < (body + reflexes + skill)) {
      setter(value);
    }
  };

  const handleCardToggle = (id: string) => {
    if (selectedCards.includes(id)) {
      setSelectedCards(selectedCards.filter(cid => cid !== id));
    } else if (selectedCards.length < CARDS_REQUIRED) {
      setSelectedCards([...selectedCards, id]);
    }
  };

  const validate = () => {
    if (total > MAX_TOTAL) {
      setError('Total attribute points cannot exceed 18.');
      return false;
    }
    if (selectedCards.length !== CARDS_REQUIRED) {
      setError('You must assign exactly 4 cards.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSave = () => {
    if (!validate()) return;
    const jelly: Jelly = {
      id: editingJelly?.id || Math.random().toString(36).slice(2, 10),
      name: name.trim(),
      body,
      reflexes,
      skill,
      cards: selectedCards,
    };
    if (editingJelly) {
      updateJelly(jelly);
    } else {
      addJelly(jelly);
    }
    onClose();
  };

  useHotkeys(
    'ctrl+enter',
    (e) => {
      if (open) {
        e.preventDefault();
        handleSave();
      }
    },
    { enableOnFormTags: true },
    [open, handleSave]
  );
  useHotkeys(
    'ctrl+backspace',
    (e) => {
      if (open) {
        e.preventDefault();
        onClose();
      }
    },
    { enableOnFormTags: true },
    [open, onClose]
  );

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="jelly-modal-title">
      <ModalDialog ref={dialogRef}>
        <Typography id="jelly-modal-title" level="h4" className="mb-4">
          {editingJelly ? 'Edit Jelly' : 'Create Jelly'}
        </Typography>
        <FormControl className="mb-4">
          <FormLabel>Jelly Name</FormLabel>
          <Input value={name} onChange={e => setName(e.target.value)} placeholder="Enter a name for your jelly" />
        </FormControl>
        <Box className="mb-2">
          <Typography level="body-sm" className="flex items-center gap-1">
            <FitnessCenterIcon fontSize="small" /> Body
          </Typography>
          <AttributeDots value={body} onChange={setBody} />
        </Box>
        <Box className="mb-2">
          <Typography level="body-sm" className="flex items-center gap-1">
            <DirectionsRunIcon fontSize="small" /> Reflexes
          </Typography>
          <AttributeDots value={reflexes} onChange={setReflexes} />
        </Box>
        <Box className="mb-2">
          <Typography level="body-sm" className="flex items-center gap-1">
            <PsychologyIcon fontSize="small" /> Skill
          </Typography>
          <AttributeDots value={skill} onChange={setSkill} />
        </Box>
        <Box className="mb-4">
          <Typography level="body-sm">Assign 4 Cards</Typography>
          <Box className="flex flex-wrap gap-2 mt-2">
            {cards.map(card => {
              const selected = selectedCards.includes(card.id);
              return (
                <JellyCardDisplay
                  key={card.id}
                  card={card}
                  selected={selected}
                  onClick={() => handleCardToggle(card.id)}
                />
              );
            })}
          </Box>
        </Box>
        {error && <Alert color="danger" className="mb-4">{error}</Alert>}
        <Box className="flex justify-end gap-2 mt-4">
          <Button variant="plain" onClick={onClose} endDecorator={<><CtrlKey /><BackspaceKey /></>}>
            Cancel
          </Button>
          <Button variant="solid" onClick={handleSave} endDecorator={<><CtrlKey /><EnterKey /></>}>
            Save
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  );
};

export default JellyModal; 