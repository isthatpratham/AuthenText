import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { TextInputBox } from '@/components/TextInputBox';
import { FileUploader } from '@/components/FileUploader';
import { AnalyzeButton } from '@/components/AnalyzeButton';
import { LoadingProgress } from '@/components/LoadingProgress';
import { ErrorState } from '@/components/ErrorState';
import { analyzePlagiarism } from '@/utils/mockResults';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!text.trim()) {
      toast({
        title: 'No text provided',
        description: 'Please enter some text to analyze',
        variant: 'destructive',
      });
      return;
    }

    if (text.trim().split(/\s+/).length < 10) {
      toast({
        title: 'Text too short',
        description: 'Please enter at least 10 words for meaningful analysis',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await analyzePlagiarism(text);

      navigate('/results', {
        state: {
          ...result,
          originalText: text,
        },
      });
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze text');
      toast({
        title: 'Analysis failed',
        description: 'Please try again',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 pointer-events-none" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <Navbar />

        <main className="container mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-5xl mx-auto"
          >
            {/* Hero Section */}
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                    Detect plagiarism
                  </span>
                  <br />
                  <span className="text-foreground">instantly.</span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light"
              >
                Advanced AI-powered plagiarism detection with intelligent source matching
              </motion.p>
            </div>

            {/* Main Content */}
            {loading ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <LoadingProgress message="Analyzing your text for plagiarism..." />
              </motion.div>
            ) : error ? (
              <ErrorState message={error} onRetry={handleAnalyze} />
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="space-y-8"
              >
                {/* Glass card container */}
                <div className="backdrop-blur-xl bg-card/50 border border-border/50 rounded-3xl p-8 md:p-12 shadow-2xl">
                  <TextInputBox
                    value={text}
                    onChange={setText}
                    disabled={loading}
                  />

                  <div className="mt-6">
                    <FileUploader
                      onFileSelect={setText}
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Action button */}
                <div className="flex justify-center pt-4">
                  <AnalyzeButton
                    onClick={handleAnalyze}
                    disabled={!text.trim()}
                    loading={loading}
                  />
                </div>

                {/* Feature highlights */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12"
                >
                  {[
                    { title: 'Fast Analysis', desc: 'Get results in seconds' },
                    { title: 'Source Matching', desc: 'Find original sources' },
                    { title: 'Detailed Reports', desc: 'Visual plagiarism highlights' }
                  ].map((feature, idx) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + idx * 0.1, duration: 0.5 }}
                      className="text-center p-6 rounded-2xl bg-accent/30 backdrop-blur-sm border border-border/30"
                    >
                      <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm">{feature.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/50 mt-32 py-8 backdrop-blur-sm">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">
              &copy; 2025 AuthenText. By prathamfrsure.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
