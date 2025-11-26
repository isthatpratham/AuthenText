import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface HighlightSection {
  start: number;
  end: number;
}

interface HighlightedTextViewerProps {
  text: string;
  highlights: HighlightSection[];
}

export const HighlightedTextViewer = ({ text, highlights }: HighlightedTextViewerProps) => {
  const renderHighlightedText = () => {
    if (!highlights || highlights.length === 0) {
      return <span className="text-foreground/90 leading-relaxed">{text}</span>;
    }

    const sortedHighlights = [...highlights].sort((a, b) => a.start - b.start);
    const parts: JSX.Element[] = [];
    let lastIndex = 0;

    sortedHighlights.forEach((highlight, index) => {
      if (highlight.start > lastIndex) {
        parts.push(
          <span key={`text-${index}`} className="text-foreground/90">
            {text.substring(lastIndex, highlight.start)}
          </span>
        );
      }

      parts.push(
        <motion.mark
          key={`highlight-${index}`}
          initial={{ backgroundColor: 'rgba(239, 68, 68, 0)' }}
          animate={{ backgroundColor: 'rgba(239, 68, 68, 0.25)' }}
          transition={{ duration: 0.6, delay: index * 0.15 }}
          className="rounded-lg px-1.5 py-0.5 font-medium text-foreground border-l-2 border-destructive/60"
        >
          {text.substring(highlight.start, highlight.end)}
        </motion.mark>
      );

      lastIndex = highlight.end;
    });

    if (lastIndex < text.length) {
      parts.push(
        <span key="text-end" className="text-foreground/90">
          {text.substring(lastIndex)}
        </span>
      );
    }

    return parts;
  };

  return (
    <Card className="p-8 backdrop-blur-xl bg-card/80 border border-border/50 rounded-2xl shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Your Text
        </h2>
        {highlights.length > 0 && (
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 bg-destructive/25 rounded border-l-2 border-destructive/60" />
            <span className="text-muted-foreground">Matched sections</span>
          </div>
        )}
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="whitespace-pre-wrap leading-relaxed text-base">
          {renderHighlightedText()}
        </div>
      </div>
    </Card>
  );
};
