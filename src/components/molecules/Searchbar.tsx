import { Input, List, ListItem, ListItemButton, Typography, Box } from '@mui/joy';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHotkeys } from 'react-hotkeys-hook';
import { CtrlKey, KKey } from '../atoms/ShortcutDecorator';

interface Page {
  name: string;
  description: string;
  route: string;
}

const pages: Page[] = [
  {
    name: 'Home',
    description: 'Home page containing dashboard information',
    route: '/'
  },
  {
    name: 'Preferences',
    description: 'Preference page containing basic user configurations',
    route: '/preferences'
  },
  {
    name: 'Jelly Collection',
    description: "Page for managing the user's collection of Jellies",
    route: '/collections/jellies'
  }
];

const Searchbar = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Filter pages based on query
  const filteredPages = pages.filter(page => 
    page.name.toLowerCase().includes(query.toLowerCase()) ||
    page.description.toLowerCase().includes(query.toLowerCase())
  );

  // Focus searchbar with Ctrl+K using react-hotkeys-hook
  useHotkeys('ctrl+k', (e) => {
    e.preventDefault();
    console.log('ctrl+k pressed', inputRef);
    inputRef.current?.focus();
  });

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Single function to handle page selection (DRY principle)
  const selectPage = (page: Page) => {
    navigate(page.route);
    setQuery('');
    setIsOpen(false);
    inputRef.current?.blur();
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      e.stopPropagation();
      setSelectedIndex(prev => Math.min(prev + 1, filteredPages.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      e.stopPropagation();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && filteredPages.length > 0) {
      e.preventDefault();
      e.stopPropagation();
      selectPage(filteredPages[selectedIndex]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  return (
    <Box ref={containerRef} className="relative w-80">
      <Input
        placeholder="Search pages..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        slotProps={{
          input: {
            ref: inputRef,
          },
        }}
        endDecorator={<><CtrlKey/><KKey/></>}
      />
      
      {isOpen && filteredPages.length > 0 && (
        <Box
          className="absolute top-full left-0 right-0 z-1000 border-1 border-radius-sm mt-1 max-h-80 overflow-auto bg-background"
        >
          <List>
            {filteredPages.map((page, index) => (
              <ListItem key={page.route} className="p-0">
                <ListItemButton
                  selected={index === selectedIndex}
                  aria-selected={index === selectedIndex}
                  onClick={() => selectPage(page)}
                  className="flex p-2"
                >
                  <Box className="flex flex-col items-start p-2">
                  <Typography level="body-sm" className="font-bold">
                    {page.name}
                  </Typography>
                  <Typography
                    level="body-xs"
                    className="truncate whitespace-nowrap overflow-hidden text-ellipsis"
                  >
                    {page.description}
                  </Typography>
                  </Box>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default Searchbar; 