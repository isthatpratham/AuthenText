export interface AnalysisResult {
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
}

// Simulate plagiarism analysis with realistic mock data
export const analyzePlagiarism = async (text: string): Promise<AnalysisResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const textLength = text.length;
  const wordCount = text.split(/\s+/).length;

  // Generate realistic similarity score based on text length
  const baseSimilarity = Math.min(Math.floor(Math.random() * 40) + 20, 85);
  
  // Generate mock sources
  const mockSources = [
    {
      title: "Academic Research Paper on Similar Topics",
      url: "https://scholar.google.com/example-paper-1",
      similarity: baseSimilarity + Math.floor(Math.random() * 10)
    },
    {
      title: "Wikipedia Article - Related Subject Matter",
      url: "https://en.wikipedia.org/wiki/Example_Topic",
      similarity: baseSimilarity - Math.floor(Math.random() * 15)
    },
    {
      title: "Educational Resource Database",
      url: "https://education.example.com/resource-123",
      similarity: baseSimilarity - Math.floor(Math.random() * 20)
    },
    {
      title: "Online Journal Publication",
      url: "https://journal.example.org/article/456",
      similarity: baseSimilarity - Math.floor(Math.random() * 25)
    },
    {
      title: "Research Database Entry",
      url: "https://research.example.edu/entry/789",
      similarity: Math.max(baseSimilarity - Math.floor(Math.random() * 30), 15)
    }
  ];

  // Sort by similarity and filter
  const sources = mockSources
    .filter(s => s.similarity > 20)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 4);

  // Calculate total similarity (weighted average of top sources)
  const totalSimilarity = sources.length > 0
    ? Math.round(sources.slice(0, 3).reduce((sum, s) => sum + s.similarity, 0) / Math.min(3, sources.length))
    : 0;

  // Generate highlighted sections based on similarity
  const highlightedSections: Array<{ start: number; end: number }> = [];
  if (totalSimilarity > 30 && wordCount > 20) {
    const numHighlights = Math.min(4, Math.floor(totalSimilarity / 20));
    const segmentSize = Math.floor(textLength / (numHighlights + 1));
    
    for (let i = 0; i < numHighlights; i++) {
      const baseStart = segmentSize * (i + 1);
      const start = Math.max(0, baseStart - 30 - Math.floor(Math.random() * 20));
      const length = 80 + Math.floor(Math.random() * 40);
      const end = Math.min(textLength, start + length);
      
      if (start < end && end <= textLength) {
        highlightedSections.push({ start, end });
      }
    }
  }

  return {
    totalSimilarity,
    sources,
    highlightedSections
  };
};
