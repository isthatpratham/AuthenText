import { Moon, Sun, FileCheck } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
          <motion.div
            whileHover={{ rotate: 5, scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <FileCheck className="w-7 h-7 text-primary" />
          </motion.div>
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            AuthenText
          </span>
        </Link>
        
        <motion.button
          onClick={toggleTheme}
          className="p-3 rounded-xl hover:bg-accent/50 transition-colors backdrop-blur-sm border border-border/30"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle theme"
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: theme === 'dark' ? 180 : 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-foreground" />
            ) : (
              <Sun className="w-5 h-5 text-foreground" />
            )}
          </motion.div>
        </motion.button>
      </div>
    </nav>
  );
};
