import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';

interface TextInputBoxProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const TextInputBox = ({ value, onChange, disabled }: TextInputBoxProps) => {
  return (
    <div className="w-full space-y-3">
      <Label htmlFor="text-input" className="text-lg font-semibold text-foreground">
        Enter your text
      </Label>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Textarea
          id="text-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="Paste or type the text you want to check for plagiarism. The more content you provide, the more accurate the analysis will be..."
          className="min-h-[350px] text-base resize-none rounded-2xl border-2 border-border/50 focus:border-primary/50 transition-all duration-300 bg-background/50 backdrop-blur-sm shadow-inner"
        />
      </motion.div>
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {value.length} characters • {value.trim().split(/\s+/).filter(w => w).length} words
        </p>
        <p className="text-xs text-muted-foreground">
          Minimum 10 words required
        </p>
      </div>
    </div>
  );
};
