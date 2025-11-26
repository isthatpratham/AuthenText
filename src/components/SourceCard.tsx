import { ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface Source {
  title: string;
  url: string;
  similarity: number;
}

interface SourceCardProps {
  source: Source;
  index: number;
}

export const SourceCard = ({ source, index }: SourceCardProps) => {
  const getSimilarityStyle = (similarity: number) => {
    if (similarity >= 75) return {
      variant: 'destructive' as const,
      bgClass: 'bg-destructive/10',
      borderClass: 'border-destructive/30'
    };
    if (similarity >= 50) return {
      variant: 'secondary' as const,
      bgClass: 'bg-secondary/10',
      borderClass: 'border-secondary/30'
    };
    return {
      variant: 'default' as const,
      bgClass: 'bg-primary/10',
      borderClass: 'border-primary/30'
    };
  };

  const style = getSimilarityStyle(source.similarity);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{
        delay: index * 0.08,
        type: 'spring',
        stiffness: 300,
        damping: 25
      }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className={`p-5 backdrop-blur-sm bg-card/50 border-2 ${style.borderClass} ${style.bgClass} rounded-xl hover:shadow-lg transition-all duration-300 group`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground mb-2 truncate group-hover:text-primary transition-colors">
              {source.title}
            </h3>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 truncate group"
            >
              <span className="truncate">{new URL(source.url).hostname}</span>
              <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.08 + 0.2, type: 'spring', stiffness: 200 }}
          >
            <Badge
              variant={style.variant}
              className="flex-shrink-0 text-base font-bold px-3 py-1 rounded-lg"
            >
              {source.similarity}%
            </Badge>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};
