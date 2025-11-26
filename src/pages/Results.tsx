import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { HighlightedTextViewer } from '@/components/HighlightedTextViewer';
import { SourceCard } from '@/components/SourceCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertTriangle, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface AnalysisResult {
  totalSimilarity: number;
  sources: Array<{
    title: string;
    url: string;
    similarity: number;
  }>;
  highlightedSections: Array<{
    start: number;
    end: number;
  }>;
  originalText: string;
}

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    const state = location.state as AnalysisResult;
    if (state) {
      setResult(state);
    } else {
      navigate('/');
    }
  }, [location, navigate]);

  if (!result) return null;

  const getSimilarityLevel = (similarity: number) => {
    if (similarity >= 75) return {
      text: 'High Risk',
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
      icon: AlertTriangle
    };
    if (similarity >= 50) return {
      text: 'Medium Risk',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      icon: AlertCircle
    };
    if (similarity >= 25) return {
      text: 'Low Risk',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      icon: CheckCircle2
    };
    return {
      text: 'Original Content',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      icon: CheckCircle2
    };
  };

  const level = getSimilarityLevel(result.totalSimilarity);
  const Icon = level.icon;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 pointer-events-none" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <Navbar />

        <main className="container mx-auto px-4 py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Back button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="mb-8 group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                New Analysis
              </Button>
            </motion.div>

            {/* Results header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Analysis Complete
              </h1>

              <Card className={`p-8 backdrop-blur-xl bg-card/80 border-2 ${level.bgColor} border-border/50 rounded-2xl shadow-xl`}>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                    >
                      <Icon className={`w-12 h-12 ${level.color}`} />
                    </motion.div>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-1">
                        <span className={level.color}>{result.totalSimilarity}%</span>
                        <span className="text-muted-foreground text-xl ml-2">Match Found</span>
                      </h2>
                      <p className="text-lg text-muted-foreground">
                        Classification: <span className={`${level.color} font-semibold`}>{level.text}</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-1">Sources Found</p>
                    <p className="text-3xl font-bold">{result.sources.length}</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Results grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Text viewer - takes 3 columns */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="lg:col-span-3"
              >
                <HighlightedTextViewer
                  text={result.originalText}
                  highlights={result.highlightedSections}
                />
              </motion.div>

              {/* Sources list - takes 2 columns */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-2"
              >
                <Card className="p-6 backdrop-blur-xl bg-card/80 border border-border/50 rounded-2xl shadow-xl sticky top-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                      Matching Sources
                    </span>
                    <span className="text-sm font-normal text-muted-foreground">
                      ({result.sources.length})
                    </span>
                  </h2>

                  <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto pr-2 custom-scrollbar">
                    <AnimatePresence mode="popLayout">
                      {result.sources.length > 0 ? (
                        result.sources.map((source, index) => (
                          <SourceCard key={index} source={source} index={index} />
                        ))
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-center py-12"
                        >
                          <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
                          <p className="text-muted-foreground text-lg">
                            No significant matches found
                          </p>
                          <p className="text-sm text-muted-foreground mt-2">
                            Your content appears to be original
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </main>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: hsl(var(--muted) / 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--primary) / 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--primary) / 0.7);
        }
      `}</style>
    </div>
  );
};

export default Results;
