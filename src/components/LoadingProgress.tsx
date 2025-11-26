import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';

interface LoadingProgressProps {
  message?: string;
}

export const LoadingProgress = ({
  message = 'Analyzing your text...'
}: LoadingProgressProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col items-center justify-center space-y-8 py-20 backdrop-blur-xl bg-card/50 border border-border/50 rounded-3xl p-12 shadow-2xl"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        className="relative"
      >
        <Loader2 className="w-16 h-16 text-primary" />
        <motion.div
          className="absolute inset-0 w-16 h-16 rounded-full border-4 border-primary/20"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      <div className="w-full max-w-md space-y-4">
        <motion.p
          className="text-center text-xl font-semibold"
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {message}
        </motion.p>

        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-center text-sm text-muted-foreground">
            {Math.round(progress)}% complete
          </p>
        </div>

        <motion.p
          className="text-center text-sm text-muted-foreground pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Scanning through millions of sources...
        </motion.p>
      </div>
    </motion.div>
  );
};
