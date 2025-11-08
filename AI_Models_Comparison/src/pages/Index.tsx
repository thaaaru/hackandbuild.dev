import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Brain, Search, Shield, Code, Globe, Zap, Star, Clock, DollarSign, FileText } from "lucide-react";

const Index = () => {
  const models = [
    {
      name: "ChatGPT",
      company: "OpenAI",
      icon: <Brain className="w-6 h-6" />,
      color: "bg-green-500",
      time: 9.47,
      cost: 0.00544,
      words: 364,
      tokens: 567,
      uniqueAttributes: [
        "Custom GPTs with personalized instructions",
        "Memory feature for consistent conversations",
        "File upload & analysis (PDFs, DOCXs, spreadsheets)",
        "Code Interpreter for data analysis",
        "Voice Mode & Slash Commands",
        "Strong multimodal support",
        "Real-time web access (Pro version)"
      ],
      strengths: [
        "Broad general knowledge",
        "Conversational fluency",
        "Creative writing excellence",
        "Strong API ecosystem",
        "User-friendly interface"
      ],
      weaknesses: [
        "Can hallucinate information",
        "Sometimes verbose",
        "No real-time web access in free version"
      ],
      bestFor: "General tasks, coding, creative writing"
    },
    {
      name: "Gemini",
      company: "Google",
      icon: <Globe className="w-6 h-6" />,
      color: "bg-blue-500",
      time: 9.93,
      cost: 0.00042,
      words: 684,
      tokens: 1080,
      uniqueAttributes: [
        "Deep Google integration (Gmail, Docs, Maps)",
        "Multimodal from ground up (text, images, audio, video)",
        "Massive context window (1M+ tokens)",
        "Real-time Google Search integration",
        "YouTube video analysis capabilities",
        "Native multimedia processing"
      ],
      strengths: [
        "Excellent STEM and research capabilities",
        "Strong mathematical reasoning",
        "Cost-effective performance",
        "Seamless Google ecosystem integration",
        "Advanced multimodal understanding"
      ],
      weaknesses: [
        "Sometimes overly cautious responses",
        "Less creative in storytelling",
        "Google's safety filters can be restrictive"
      ],
      bestFor: "STEM research, Google integration, multimedia tasks"
    },
    {
      name: "Claude",
      company: "Anthropic",
      icon: <Shield className="w-6 h-6" />,
      color: "bg-purple-500",
      time: 15.43,
      cost: 0.00848,
      words: 323,
      tokens: 591,
      uniqueAttributes: [
        "Constitutional AI with built-in ethical principles",
        "Extended context window (200K tokens)",
        "Nuanced refusals with explanations",
        "Artifacts feature for interactive content",
        "Strong document analysis capabilities",
        "Safety-first design approach"
      ],
      strengths: [
        "Excellent safety and alignment",
        "Superior long-form content generation",
        "Strong legal and compliance focus",
        "Thoughtful, nuanced conversations",
        "Advanced reasoning capabilities"
      ],
      weaknesses: [
        "Sometimes overly cautious",
        "Can be verbose in responses",
        "Limited multimodal capabilities"
      ],
      bestFor: "Legal documents, long-form content, safety-critical applications"
    },
    {
      name: "Perplexity",
      company: "Perplexity AI",
      icon: <Search className="w-6 h-6" />,
      color: "bg-orange-500",
      time: 14.20,
      cost: 0.00087,
      words: 496,
      tokens: 871,
      uniqueAttributes: [
        "Search-first design as AI search engine",
        "Always provides source citations",
        "Real-time web access for every response",
        "Focus mode for specialized searches",
        "Thread-based research conversations",
        "Fact-checking emphasis"
      ],
      strengths: [
        "Excellent for research and fact-finding",
        "Always cites reliable sources",
        "Up-to-date information access",
        "Concise, accurate responses",
        "Strong academic and professional use"
      ],
      weaknesses: [
        "Less creative writing capability",
        "Limited customization options",
        "Not ideal for open-ended conversations"
      ],
      bestFor: "Research, fact-checking, academic work"
    },
    {
      name: "DeepSeek",
      company: "DeepSeek AI",
      icon: <Code className="w-6 h-6" />,
      color: "bg-indigo-500",
      time: 46.74,
      cost: 0.00033,
      words: 680,
      tokens: 1189,
      uniqueAttributes: [
        "Mixture-of-experts (MoE) architecture",
        "Very long context windows (32K tokens)",
        "Exceptional logical reasoning",
        "Mathematical problem-solving focus",
        "Open-source ecosystem availability",
        "Cost-effective training and inference"
      ],
      strengths: [
        "Superior coding and programming",
        "Strong mathematical capabilities",
        "Efficient architecture design",
        "Free and open-weight models",
        "Excellent for technical tasks"
      ],
      weaknesses: [
        "Less known globally",
        "Limited multimodal support",
        "Primarily text-based processing"
      ],
      bestFor: "Coding, mathematics, technical problem-solving"
    },
    {
      name: "Qwen",
      company: "Alibaba",
      icon: <Zap className="w-6 h-6" />,
      color: "bg-red-500",
      time: 23.76,
      cost: 0.00029,
      words: 503,
      tokens: 736,
      uniqueAttributes: [
        "Massive multilingual training corpus (20+ trillion tokens)",
        "Multiple model sizes (1.8B to 72B parameters)",
        "Very large context windows (up to 1M tokens experimental)",
        "Strong multimodal capabilities",
        "Open-source ecosystem",
        "Exceptional Asian language support"
      ],
      strengths: [
        "Outstanding multilingual support",
        "Strong Chinese and Asian languages",
        "Open-source availability",
        "E-commerce optimization",
        "Scalable architecture"
      ],
      weaknesses: [
        "Less optimized for Western languages",
        "Limited third-party integrations outside China",
        "Documentation primarily in Chinese"
      ],
      bestFor: "Multilingual tasks, Chinese language, e-commerce"
    }
  ];

  const performanceData = [
    { model: "ChatGPT", time: 9.47, cost: 0.00544, words: 364, tokens: 567, efficiency: 85 },
    { model: "Gemini", time: 9.93, cost: 0.00042, words: 684, tokens: 1080, efficiency: 95 },
    { model: "Claude", time: 15.43, cost: 0.00848, words: 323, tokens: 591, efficiency: 70 },
    { model: "Perplexity", time: 14.20, cost: 0.00087, words: 496, tokens: 871, efficiency: 80 },
    { model: "DeepSeek", time: 46.74, cost: 0.00033, words: 680, tokens: 1189, efficiency: 60 },
    { model: "Qwen", time: 23.76, cost: 0.00029, words: 503, tokens: 736, efficiency: 75 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              AI Models Comparison
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Discover the unique attributes of leading AI models
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Brain className="w-4 h-4 mr-1" />
                6 Models Analyzed
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Star className="w-4 h-4 mr-1" />
                Comprehensive Comparison
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Zap className="w-4 h-4 mr-1" />
                Performance Metrics
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="overview">Model Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
            <TabsTrigger value="comparison">Detailed Comparison</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {models.map((model, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${model.color} text-white`}>
                          {model.icon}
                        </div>
                        <div>
                          <CardTitle className="text-xl">{model.name}</CardTitle>
                          <CardDescription>{model.company}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline">{model.bestFor.split(',')[0]}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        Key Strengths
                      </h4>
                      <ul className="text-sm space-y-1">
                        {model.strengths.slice(0, 3).map((strength, i) => (
                          <li key={i} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm text-muted-foreground">
                        <strong>Best for:</strong> {model.bestFor}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Performance Metrics Overview
                </CardTitle>
                <CardDescription>
                  Comparative analysis of response time, cost, and efficiency
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Model</TableHead>
                      <TableHead>Time (s)</TableHead>
                      <TableHead>Cost ($)</TableHead>
                      <TableHead>Words</TableHead>
                      <TableHead>Tokens</TableHead>
                      <TableHead>Efficiency</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {performanceData.map((data, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{data.model}</TableCell>
                        <TableCell>{data.time}</TableCell>
                        <TableCell>${data.cost.toFixed(5)}</TableCell>
                        <TableCell>{data.words}</TableCell>
                        <TableCell>{data.tokens}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={data.efficiency} className="w-16" />
                            <span className="text-sm">{data.efficiency}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-green-600">
                    <Clock className="w-5 h-5 mr-2" />
                    Fastest Response
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">ChatGPT</div>
                  <p className="text-muted-foreground">9.47 seconds</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-600">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Most Cost-Effective
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Qwen</div>
                  <p className="text-muted-foreground">$0.00029</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-purple-600">
                    <FileText className="w-5 h-5 mr-2" />
                    Most Comprehensive
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">DeepSeek</div>
                  <p className="text-muted-foreground">1,189 tokens</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-8">
            {models.map((model, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className={`${model.color} text-white`}>
                  <div className="flex items-center space-x-3">
                    {model.icon}
                    <div>
                      <CardTitle className="text-2xl">{model.name}</CardTitle>
                      <CardDescription className="text-white/80">
                        by {model.company}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-green-600">Unique Attributes</h4>
                      <ul className="space-y-2">
                        {model.uniqueAttributes.map((attr, i) => (
                          <li key={i} className="flex items-start text-sm">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {attr}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3 text-blue-600">Strengths</h4>
                      <ul className="space-y-2">
                        {model.strengths.map((strength, i) => (
                          <li key={i} className="flex items-start text-sm">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3 text-red-600">Limitations</h4>
                      <ul className="space-y-2">
                        {model.weaknesses.map((weakness, i) => (
                          <li key={i} className="flex items-start text-sm">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {weakness}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                        <p className="text-sm">
                          <strong>Best Use Cases:</strong> {model.bestFor}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Summary Section */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="text-2xl">Key Takeaways</CardTitle>
            <CardDescription>
              Choose the right AI model based on your specific needs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">For General Use</h4>
                <p className="text-sm text-green-700">ChatGPT or Gemini offer the best balance of capabilities and ease of use.</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">For Research</h4>
                <p className="text-sm text-blue-700">Perplexity excels with real-time information and source citations.</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">For Safety-Critical Tasks</h4>
                <p className="text-sm text-purple-700">Claude's constitutional AI approach ensures ethical and safe responses.</p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <h4 className="font-semibold text-indigo-800 mb-2">For Coding</h4>
                <p className="text-sm text-indigo-700">DeepSeek offers superior programming capabilities and mathematical reasoning.</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">For Multilingual Tasks</h4>
                <p className="text-sm text-red-700">Qwen provides exceptional support for Chinese and Asian languages.</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">For Cost Efficiency</h4>
                <p className="text-sm text-orange-700">Gemini and Qwen offer the best performance per dollar spent.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;