import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/Dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { Badge } from "@/components/ui/Badge";
import { Textarea } from "@/components/ui/Textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/Select";
import { ScrollArea } from "@/components/ui/ScrollArea";
import {
  Search, Moon, Sun, Book, Video, Calculator, MessageSquare,
  HelpCircle, Users, FileText, Download, Trophy, Star,
  PlayCircle, FastForward, Rewind, Volume2, Subtitles,
  Bookmark, Share2, ThumbsUp, Award, Sparkles, Filter,
  Upload, Clock, Send, PlusCircle, ChevronRight, Calendar,
  CheckCircle, AlertCircle, FileUp, MessageCircle, Printer,
  Brain, TrendingUp, Mic, MicOff, History, ChevronDown, Activity, Target,
  BarChart, Crown, Zap, Globe, Languages, Compass
} from 'lucide-react';
import { useVoiceRecognition } from '@/hooks/useVoiceRecognition';
import { useAI } from '@/hooks/useAI';
import { getBMICategory, getBMIAdvice } from '@/lib/bmi';
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/Popover";
import { Slider } from "@/components/ui/Slider";
import { Switch } from "@/components/ui/Switch";

interface Resource {
  id: string;
  title: string;
  type: 'video' | 'pdf' | 'guide';
  category: string;
  url: string;
  thumbnail?: string;
  description: string;
}

interface ConsultationForm {
  specialty: string;
  date: string;
  description: string;
  files: File[];
}

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  date: string;
  replies: Array<{
    id: string;
    content: string;
    author: {
      id: string;
      name: string;
      avatar?: string;
    };
    date: string;
    likes: number;
  }>;
  likes: number;
  isAnonymous: boolean;
  tags: string[];
}

interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
}

interface SearchFilters {
  format: string[];
  difficulty: string;
  sortBy: string;
  language: string;
}

interface UserPreferences {
  interests: string[];
  level: string;
  language: string;
  goals: string[];
}

interface SearchSuggestion {
  text: string;
  type: 'history' | 'trending' | 'ai';
  confidence: number;
}

const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Complete Wellness Guide',
    type: 'pdf',
    category: 'wellness',
    url: '/guides/wellness.pdf',
    thumbnail: '/images/wellness-preview.jpg',
    description: 'Comprehensive guide to physical and mental wellness'
  },
  {
    id: '2',
    title: 'Meditation Basics',
    type: 'video',
    category: 'mental',
    url: '/videos/meditation-basics.mp4',
    thumbnail: '/images/meditation-preview.jpg',
    description: 'Learn fundamental meditation techniques for beginners'
  },
  {
    id: '3',
    title: 'Balanced Diet Planning',
    type: 'guide',
    category: 'nutrition',
    url: '/guides/diet-planning.pdf',
    thumbnail: '/images/diet-preview.jpg',
    description: 'Create a balanced diet plan tailored to your needs'
  },
  {
    id: '4',
    title: 'Home Workout Series',
    type: 'video',
    category: 'fitness',
    url: '/videos/home-workout.mp4',
    thumbnail: '/images/workout-preview.jpg',
    description: 'No-equipment workout routines for all fitness levels'
  },
  {
    id: '5',
    title: 'Stress Management Guide',
    type: 'pdf',
    category: 'mental',
    url: '/guides/stress-management.pdf',
    thumbnail: '/images/stress-preview.jpg',
    description: 'Effective techniques for managing daily stress'
  },
  {
    id: '6',
    title: 'Yoga for Beginners',
    type: 'video',
    category: 'wellness',
    url: '/videos/yoga-basics.mp4',
    thumbnail: '/images/yoga-preview.jpg',
    description: 'Start your yoga journey with basic poses and breathing'
  },
  {
    id: '7',
    title: 'Healthy Recipes Collection',
    type: 'pdf',
    category: 'nutrition',
    url: '/guides/healthy-recipes.pdf',
    thumbnail: '/images/recipes-preview.jpg',
    description: '100+ nutritious and delicious recipes'
  },
  {
    id: '8',
    title: 'Cardio Workout Guide',
    type: 'video',
    category: 'fitness',
    url: '/videos/cardio-workout.mp4',
    thumbnail: '/images/cardio-preview.jpg',
    description: 'High-intensity cardio workouts for fat burning'
  },
  {
    id: '9',
    title: 'Sleep Improvement Guide',
    type: 'pdf',
    category: 'wellness',
    url: '/guides/sleep-improvement.pdf',
    thumbnail: '/images/sleep-preview.jpg',
    description: 'Tips and techniques for better sleep quality'
  },
  {
    id: '10',
    title: 'Anxiety Management',
    type: 'guide',
    category: 'mental',
    url: '/guides/anxiety-management.pdf',
    thumbnail: '/images/anxiety-preview.jpg',
    description: 'Understanding and managing anxiety effectively'
  }
];

const mockFAQs: FAQ[] = [
  {
    id: '1',
    category: 'General',
    question: 'How do I book an appointment?',
    answer: 'You can book an appointment through our Resources page...'
  },
  // Add more FAQs...
];

const mockForumPosts: ForumPost[] = [
  {
    id: '1',
    title: 'Tips for managing stress',
    content: 'What are some effective ways to manage daily stress? I\'ve been trying meditation but would love to hear other techniques that work for you.',
    author: {
      id: 'user1',
      name: 'HealthSeeker',
      avatar: '/avatars/user1.jpg'
    },
    date: '2025-01-04',
    replies: [
      {
        id: 'reply1',
        content: 'I find that regular exercise, especially yoga, helps tremendously with stress management.',
        author: {
          id: 'user2',
          name: 'YogaEnthusiast',
          avatar: '/avatars/user2.jpg'
        },
        date: '2025-01-04',
        likes: 15
      },
      {
        id: 'reply2',
        content: 'Deep breathing exercises work great for me, especially during work breaks.',
        author: {
          id: 'user3',
          name: 'MindfulPro',
          avatar: '/avatars/user3.jpg'
        },
        date: '2025-01-05',
        likes: 8
      }
    ],
    likes: 45,
    isAnonymous: false,
    tags: ['stress', 'mental-health', 'wellness']
  },
  {
    id: '2',
    title: 'Healthy meal prep ideas',
    content: 'Looking for quick and nutritious meal prep ideas for a busy work week. Any suggestions?',
    author: {
      id: 'user4',
      name: 'NutritionNewbie',
      avatar: '/avatars/user4.jpg'
    },
    date: '2025-01-05',
    replies: [
      {
        id: 'reply3',
        content: 'I prepare overnight oats and mason jar salads on Sundays. Saves so much time!',
        author: {
          id: 'user5',
          name: 'MealPrepMaster',
          avatar: '/avatars/user5.jpg'
        },
        date: '2025-01-05',
        likes: 12
      }
    ],
    likes: 32,
    isAnonymous: false,
    tags: ['nutrition', 'meal-prep', 'healthy-eating']
  }
];

const mockTrending = [
  'Mental health tips',
  'Home workout routines',
  'Healthy meal plans',
  'Stress management',
];

const categoryStats = {
  all: { total: 150, trending: 5, completed: 45 },
  wellness: { total: 40, trending: 2, completed: 12 },
  mental: { total: 35, trending: 1, completed: 8 },
  nutrition: { total: 45, trending: 1, completed: 15 },
  fitness: { total: 30, trending: 1, completed: 10 }
};

const categories = [
  { id: 'all', label: 'All Resources', color: 'from-purple-500 to-pink-500' },
  { id: 'wellness', label: 'Wellness', color: 'from-green-400 to-emerald-500' },
  { id: 'mental', label: 'Mental Health', color: 'from-blue-400 to-indigo-500' },
  { id: 'nutrition', label: 'Nutrition', color: 'from-orange-400 to-red-500' },
  { id: 'fitness', label: 'Fitness', color: 'from-teal-400 to-cyan-500' }
];

const mockAchievements = [
  {
    id: '1',
    title: 'Wellness Warrior',
    description: 'Completed 10 wellness resources',
    icon: Trophy,
    progress: 80,
    reward: '100 points'
  },
  {
    id: '2',
    title: 'Nutrition Expert',
    description: 'Finished all nutrition guides',
    icon: Award,
    progress: 65,
    reward: '150 points'
  },
  {
    id: '3',
    title: 'Fitness Enthusiast',
    description: 'Watched 20 workout videos',
    icon: Target,
    progress: 45,
    reward: '200 points'
  },
  {
    id: '4',
    title: 'Mental Health Champion',
    description: 'Completed mental health course',
    icon: Brain,
    progress: 100,
    reward: '250 points'
  },
  {
    id: '5',
    title: 'Early Bird',
    description: 'Logged in 7 days in a row',
    icon: Sun,
    progress: 90,
    reward: '50 points'
  },
  {
    id: '6',
    title: 'Resource Explorer',
    description: 'Accessed all resource types',
    icon: Compass,
    progress: 75,
    reward: '100 points'
  },
  {
    id: '7',
    title: 'Community Helper',
    description: 'Helped 10 community members',
    icon: Users,
    progress: 60,
    reward: '150 points'
  },
  {
    id: '8',
    title: 'Knowledge Seeker',
    description: 'Read 50 articles',
    icon: Book,
    progress: 40,
    reward: '200 points'
  }
];

const EnhancedSearch = ({
  searchQuery,
  setSearchQuery,
  filters,
  setFilters,
  onSearch,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  onSearch: (query: string) => void;
}) => {
  const { isListening, startListening, stopListening, transcript } = useVoiceRecognition();
  const { getSuggestions, analyze } = useAI();
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (searchQuery.length > 2) {
      const getSuggestionsAsync = async () => {
        const aiSuggestions = await getSuggestions(searchQuery);
        setSuggestions(aiSuggestions);
      };
      getSuggestionsAsync();
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resources..."
            className="pl-10 pr-12 w-full bg-white/10 backdrop-blur-sm border-transparent focus:border-primary"
          />
          <button
            onClick={() => isListening ? stopListening() : startListening()}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary"
          >
            {isListening ? (
              <MicOff className="h-5 w-5" />
            ) : (
              <Mic className="h-5 w-5" />
            )}
          </button>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 bg-white border shadow-lg">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Format</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {['PDF', 'Video', 'Article', 'Interactive'].map(format => (
                    <div key={format} className="flex items-center gap-2">
                      <Switch
                        checked={filters.format.includes(format)}
                        onCheckedChange={(checked) => {
                          setFilters({
                            ...filters,
                            format: checked
                              ? [...filters.format, format]
                              : filters.format.filter(f => f !== format)
                          });
                        }}
                      />
                      <span>{format}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Difficulty Level</label>
                <Select
                  value={filters.difficulty}
                  onValueChange={(value) => setFilters({ ...filters, difficulty: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Sort By</label>
                <Select
                  value={filters.sortBy}
                  onValueChange={(value) => setFilters({ ...filters, sortBy: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Language</label>
                <Select
                  value={filters.language}
                  onValueChange={(value) => setFilters({ ...filters, language: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Search Suggestions */}
      <AnimatePresence>
        {(suggestions.length > 0 || searchQuery.length > 2) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border p-2 z-50"
          >
            <div className="space-y-2">
              {/* Trending Searches */}
              {searchQuery.length < 3 && (
                <div>
                  <div className="flex items-center gap-2 px-3 py-1 text-sm text-gray-500">
                    <TrendingUp className="h-4 w-4" />
                    <span>Trending Searches</span>
                  </div>
                  {mockTrending.map((trend, index) => (
                    <button
                      key={index}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      onClick={() => {
                        setSearchQuery(trend);
                        onSearch(trend);
                      }}
                    >
                      {trend}
                    </button>
                  ))}
                </div>
              )}

              {/* AI Suggestions */}
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center justify-between"
                  onClick={() => {
                    setSearchQuery(suggestion.text);
                    onSearch(suggestion.text);
                  }}
                >
                  <div className="flex items-center gap-2">
                    {suggestion.type === 'ai' && <Brain className="h-4 w-4 text-primary" />}
                    {suggestion.type === 'trending' && <TrendingUp className="h-4 w-4 text-orange-500" />}
                    {suggestion.type === 'history' && <History className="h-4 w-4 text-blue-500" />}
                    <span>{suggestion.text}</span>
                  </div>
                  {suggestion.type === 'ai' && (
                    <span className="text-sm text-gray-500">
                      {Math.round(suggestion.confidence * 100)}% match
                    </span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CategoryCard = ({
  category,
  isSelected,
  onClick,
  stats,
}: {
  category: typeof categories[0];
  isSelected: boolean;
  onClick: () => void;
  stats: { total: number; trending: number; completed: number };
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`relative rounded-lg p-4 cursor-pointer transition-all ${
        isSelected
          ? `bg-gradient-to-r ${category.color} text-white`
          : 'bg-white dark:bg-gray-800'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium">{category.label}</span>
        {stats.trending > 0 && (
          <Badge variant={isSelected ? 'secondary' : 'default'}>
            <TrendingUp className="h-3 w-3 mr-1" />
            {stats.trending} trending
          </Badge>
        )}
      </div>
      <div className="mt-2 text-sm opacity-80">
        {stats.total} resources • {stats.completed} completed
      </div>
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-primary/20"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: stats.completed / stats.total }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
};

export default function Resources() {
  // State management for all features
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeResource, setActiveResource] = useState<Resource | null>(null);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [showPDFPreview, setShowPDFPreview] = useState(false);
  const [showBMICalculator, setShowBMICalculator] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showFAQs, setShowFAQs] = useState(false);
  const [bmiData, setBmiData] = useState({ height: '', weight: '' });
  const [userPoints, setUserPoints] = useState({
    total: 0,
    level: 1,
    badges: [] as string[],
    progress: 0
  });

  // Video player controls
  const [videoProgress, setVideoProgress] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Chat and support
  const [chatMessages, setChatMessages] = useState<Array<{ text: string; isBot: boolean }>>([
    { text: 'Hello! How can I help you today?', isBot: true }
  ]);
  const [newMessage, setNewMessage] = useState('');

  // New state management for additional features
  const [consultationForm, setConsultationForm] = useState<ConsultationForm>({
    specialty: '',
    date: '',
    description: '',
    files: []
  });
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const [forumPosts, setForumPosts] = useState<ForumPost[]>(mockForumPosts);
  const [newForumPost, setNewForumPost] = useState({
    title: '',
    content: '',
    isAnonymous: false,
    tags: [] as string[]
  });
  const [showForumPost, setShowForumPost] = useState(false);
  const [searchFAQ, setSearchFAQ] = useState('');
  const [selectedChecklist, setSelectedChecklist] = useState<string[]>([]);
  const [showChecklist, setShowChecklist] = useState(false);

  // Search filters
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    format: [],
    difficulty: '',
    sortBy: 'relevance',
    language: 'en'
  });

  // User preferences
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    interests: [],
    level: 'beginner',
    language: 'en',
    goals: []
  });

  // Forum state
  const [replyContent, setReplyContent] = useState<Record<string, string>>({});

  // Handle resource interactions
  const handleResourceClick = (resource: Resource) => {
    setActiveResource(resource);
    if (resource.type === 'video') {
      setShowVideoPlayer(true);
    } else {
      setShowPDFPreview(true);
    }
    addPoints(5, `Viewed ${resource.title}`);
  };

  // Gamification system
  const addPoints = (points: number, achievement?: string) => {
    setUserPoints(prev => {
      const newTotal = prev.total + points;
      const newLevel = Math.floor(newTotal / 100) + 1;
      const newProgress = (newTotal % 100);
      const newBadges = achievement ? [...prev.badges, achievement] : prev.badges;
      return {
        total: newTotal,
        level: newLevel,
        badges: newBadges,
        progress: newProgress
      };
    });
  };

  // BMI Calculator functionality
  const calculateBMI = () => {
    const height = parseFloat(bmiData.height) / 100;
    const weight = parseFloat(bmiData.weight);
    const bmi = weight / (height * height);
    return {
      value: Math.round(bmi * 10) / 10,
      category: getBMICategory(bmi),
      advice: getBMIAdvice(bmi)
    };
  };

  // Chat functionality
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    setChatMessages(prev => [...prev, { text: newMessage, isBot: false }]);
    setNewMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        text: "I'll help you with that! Let me check our resources...",
        isBot: true
      }]);
    }, 1000);
  };

  // Handle file upload for consultation
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setConsultationForm(prev => ({
        ...prev,
        files: [...prev.files, ...Array.from(event.target.files!)]
      }));
    }
  };

  // Handle consultation submission
  const handleConsultationSubmit = () => {
    // Handle form submission
    console.log('Consultation form submitted:', consultationForm);
    setShowConsultationForm(false);
    addPoints(20, 'Booked First Consultation');
  };

  // Handle forum post submission
  const handleForumPost = () => {
    if (!newForumPost.title.trim() || !newForumPost.content.trim()) {
      // Show error message
      return;
    }

    const newPost: ForumPost = {
      id: `post${forumPosts.length + 1}`,
      title: newForumPost.title,
      content: newForumPost.content,
      author: {
        id: 'currentUser', // Replace with actual user ID
        name: 'Current User', // Replace with actual user name
        avatar: '/avatars/current-user.jpg' // Replace with actual user avatar
      },
      date: new Date().toISOString().split('T')[0],
      replies: [],
      likes: 0,
      isAnonymous: newForumPost.isAnonymous,
      tags: newForumPost.tags
    };

    setForumPosts(prev => [newPost, ...prev]);
    setNewForumPost({
      title: '',
      content: '',
      isAnonymous: false,
      tags: []
    });
    setShowForumPost(false);
    addPoints(10, 'Created Forum Post');
  };

  // Handle post like
  const handlePostLike = (postId: string) => {
    setForumPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    );
  };

  // Handle reply submission
  const handleReplySubmit = (postId: string) => {
    const content = replyContent[postId];
    if (!content?.trim()) return;

    setForumPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? {
              ...post,
              replies: [
                ...post.replies,
                {
                  id: `reply${post.replies.length + 1}`,
                  content,
                  author: {
                    id: 'currentUser', // Replace with actual user ID
                    name: 'Current User', // Replace with actual user name
                    avatar: '/avatars/current-user.jpg' // Replace with actual user avatar
                  },
                  date: new Date().toISOString().split('T')[0],
                  likes: 0
                }
              ]
            }
          : post
      )
    );

    setReplyContent(prev => ({ ...prev, [postId]: '' }));
    addPoints(5, 'Replied to Discussion');
  };

  // Handle reply like
  const handleReplyLike = (postId: string, replyId: string) => {
    setForumPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? {
              ...post,
              replies: post.replies.map(reply =>
                reply.id === replyId
                  ? { ...reply, likes: reply.likes + 1 }
                  : reply
              )
            }
          : post
      )
    );
  };

  // Filter FAQs based on search
  const filteredFAQs = mockFAQs.filter(faq =>
    faq.question.toLowerCase().includes(searchFAQ.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchFAQ.toLowerCase())
  );

  // Health checklist template
  const healthChecklistTemplate = [
    'Annual physical examination',
    'Dental checkup (every 6 months)',
    'Eye examination',
    'Blood pressure check',
    'Vaccination updates',
    'Cholesterol screening',
    // Add more checklist items...
  ];

  // Handle checklist print
  const handlePrintChecklist = () => {
    window.print();
  };

  return (
    <div className={`min-h-screen p-6 ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Search Section */}
        <div className="mb-8">
          <EnhancedSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filters={searchFilters}
            setFilters={setSearchFilters}
            onSearch={(query) => {
              // Handle search
              console.log('Searching for:', query);
            }}
          />
        </div>

        {/* Category Filter */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              isSelected={selectedCategory === category.id}
              onClick={() => setSelectedCategory(category.id)}
              stats={categoryStats[category.id as keyof typeof categoryStats]}
            />
          ))}
        </div>

        {/* Header with Search and Controls */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text">
              Healthcare Resources Hub
            </h1>
            <div className="flex items-center gap-4 mt-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <span className="font-medium">Level {userPoints.level}</span>
                  <Progress value={userPoints.progress} className="w-32 bg-gradient-to-r from-blue-500 to-purple-500" />
                </div>
              </motion.div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setIsDarkMode(!isDarkMode);
                document.documentElement.classList.toggle('dark');
              }}
              className="rounded-full bg-white/10 backdrop-blur-sm"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="educational" className="space-y-6">
          <TabsList className="grid grid-cols-6 gap-4 bg-transparent">
            <TabsTrigger value="educational">Educational</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="downloads">Downloads</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          {/* Educational Content */}
          <TabsContent value="educational">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockResources
                .filter(resource => 
                  selectedCategory === 'all' || resource.category === selectedCategory
                )
                .map(resource => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card className="group hover:shadow-lg transition-all">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          {resource.type === 'video' ? (
                            <Video className="h-5 w-5" />
                          ) : resource.type === 'pdf' ? (
                            <FileText className="h-5 w-5" />
                          ) : (
                            <Book className="h-5 w-5" />
                          )}
                          {resource.title}
                        </CardTitle>
                        <CardDescription>{resource.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div 
                          className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden cursor-pointer"
                          onClick={() => handleResourceClick(resource)}
                        >
                          {resource.thumbnail && (
                            <img
                              src={resource.thumbnail}
                              alt={resource.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">
                          <Bookmark className="mr-2 h-4 w-4" /> Save
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleResourceClick(resource)}
                        >
                          {resource.type === 'video' ? 'Watch Now' : 'Read Now'}
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </TabsContent>

          {/* Achievements Content */}
          <TabsContent value="achievements">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockAchievements.map(achievement => (
                <Card key={achievement.id} className="group hover:shadow-lg transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {React.createElement(achievement.icon, { className: "h-5 w-5" })}
                      {achievement.title}
                    </CardTitle>
                    <CardDescription>{achievement.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Progress value={achievement.progress} className="w-full" />
                      <div className="flex justify-between text-sm">
                        <span>{achievement.progress}% Complete</span>
                        <span className="text-primary">{achievement.reward}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Badge variant={achievement.progress === 100 ? "default" : "outline"}>
                      {achievement.progress === 100 ? "Completed" : "In Progress"}
                    </Badge>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tools Content */}
          <TabsContent value="tools">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>BMI Calculator</CardTitle>
                  <CardDescription>Calculate your Body Mass Index</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Height (cm)</label>
                      <Input
                        type="number"
                        value={bmiData.height}
                        onChange={(e) => setBmiData({ ...bmiData, height: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Weight (kg)</label>
                      <Input
                        type="number"
                        value={bmiData.weight}
                        onChange={(e) => setBmiData({ ...bmiData, weight: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => {
                        const result = calculateBMI();
                        // Show result in a nice UI
                      }}
                    >
                      Calculate BMI
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Add more tools */}
            </div>
          </TabsContent>

          {/* Support Content */}
          <TabsContent value="support">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Chat Support</CardTitle>
                  <CardDescription>Get instant help from our AI assistant</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex flex-col">
                    <div className="flex-1 overflow-y-auto space-y-4 p-4">
                      {chatMessages.map((msg, index) => (
                        <div
                          key={index}
                          className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              msg.isBot
                                ? 'bg-gray-100 dark:bg-gray-800'
                                : 'bg-primary text-white'
                            }`}
                          >
                            {msg.text}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 border-t">
                      <div className="flex gap-2">
                        <Input
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type your message..."
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <Button onClick={handleSendMessage}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>FAQs</CardTitle>
                  <CardDescription>Find quick answers to common questions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="Search FAQs..."
                    className="mb-4"
                    value={searchFAQ}
                    onChange={(e) => setSearchFAQ(e.target.value)}
                  />
                  <div className="space-y-4">
                    {filteredFAQs.map(faq => (
                      <div key={faq.id} className="p-4 border-b last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                        <h3 className="font-medium">{faq.question}</h3>
                        <p className="text-sm text-gray-500">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Consultation Section */}
          <TabsContent value="consultation">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Request Consultation
                </CardTitle>
                <CardDescription>
                  Book an online or in-person consultation with our specialists
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full"
                  onClick={() => setShowConsultationForm(true)}
                >
                  Book Consultation
                </Button>
              </CardContent>
            </Card>

            <Dialog open={showConsultationForm} onOpenChange={setShowConsultationForm}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Request a Consultation</DialogTitle>
                  <DialogDescription>
                    Fill in the details below to schedule your consultation
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Specialty</label>
                    <Select
                      value={consultationForm.specialty}
                      onValueChange={(value) => 
                        setConsultationForm(prev => ({ ...prev, specialty: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Medicine</SelectItem>
                        <SelectItem value="cardiology">Cardiology</SelectItem>
                        <SelectItem value="dermatology">Dermatology</SelectItem>
                        <SelectItem value="pediatrics">Pediatrics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Preferred Date</label>
                    <Input
                      type="date"
                      value={consultationForm.date}
                      onChange={(e) => 
                        setConsultationForm(prev => ({ ...prev, date: e.target.value }))
                      }
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      value={consultationForm.description}
                      onChange={(e) => 
                        setConsultationForm(prev => ({ ...prev, description: e.target.value }))
                      }
                      placeholder="Describe your health concern..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Upload Documents (optional)</label>
                    <div className="mt-2">
                      <label className="flex items-center gap-2 p-4 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary">
                        <FileUp className="h-5 w-5" />
                        <span>Click to upload or drag and drop</span>
                        <input
                          type="file"
                          className="hidden"
                          multiple
                          onChange={handleFileUpload}
                        />
                      </label>
                    </div>
                    {consultationForm.files.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {consultationForm.files.length} file(s) selected
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleConsultationSubmit}>
                    Submit Request
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Community Section */}
          <TabsContent value="community">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Community Forum</h2>
                  <p className="text-gray-500">Join discussions or start your own topic</p>
                </div>
                <Button 
                  onClick={() => setShowForumPost(true)}
                  className="bg-primary hover:bg-primary/90"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Start New Discussion
                </Button>
              </div>

              <div className="grid gap-6">
                {forumPosts.map(post => (
                  <Card key={post.id} className="hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-4">
                          {!post.isAnonymous && post.author.avatar && (
                            <img
                              src={post.author.avatar}
                              alt={post.author.name}
                              className="w-10 h-10 rounded-full"
                            />
                          )}
                          <div>
                            <CardTitle className="text-xl">{post.title}</CardTitle>
                            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                              <span>{post.isAnonymous ? 'Anonymous' : post.author.name}</span>
                              <span>•</span>
                              <span>{post.date}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {post.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="capitalize">
                              {tag.replace('-', ' ')}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{post.content}</p>
                      <div className="flex items-center gap-4 mt-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="gap-2"
                          onClick={() => handlePostLike(post.id)}
                        >
                          <ThumbsUp className={`h-4 w-4 ${post.likes > 0 ? 'text-primary fill-primary' : ''}`} />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-2">
                          <MessageSquare className="h-4 w-4" />
                          {post.replies.length} Replies
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Share2 className="h-4 w-4" />
                          Share
                        </Button>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="w-full space-y-4">
                        {post.replies.map(reply => (
                          <div key={reply.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                            {reply.author.avatar && (
                              <img
                                src={reply.author.avatar}
                                alt={reply.author.name}
                                className="w-8 h-8 rounded-full"
                              />
                            )}
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{reply.author.name}</span>
                                <span className="text-sm text-gray-500">{reply.date}</span>
                              </div>
                              <p className="mt-1 text-gray-600">{reply.content}</p>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="gap-2 mt-2"
                                onClick={() => handleReplyLike(post.id, reply.id)}
                              >
                                <ThumbsUp className={`h-4 w-4 ${reply.likes > 0 ? 'text-primary fill-primary' : ''}`} />
                                {reply.likes}
                              </Button>
                            </div>
                          </div>
                        ))}
                        <div className="flex gap-4 mt-4">
                          <Input 
                            placeholder="Write a reply..." 
                            className="flex-1"
                            value={replyContent[post.id] || ''}
                            onChange={(e) => setReplyContent(prev => ({
                              ...prev,
                              [post.id]: e.target.value
                            }))}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleReplySubmit(post.id);
                              }
                            }}
                          />
                          <Button onClick={() => handleReplySubmit(post.id)}>Reply</Button>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            {/* New Discussion Dialog */}
            <Dialog open={showForumPost} onOpenChange={setShowForumPost}>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Start New Discussion</DialogTitle>
                  <DialogDescription>
                    Share your thoughts, questions, or experiences with the community
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={newForumPost.title}
                      onChange={(e) => setNewForumPost(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Give your discussion a clear title"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Content</label>
                    <Textarea
                      value={newForumPost.content}
                      onChange={(e) => setNewForumPost(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Share your thoughts or questions..."
                      rows={5}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={newForumPost.isAnonymous}
                      onCheckedChange={(checked) => 
                        setNewForumPost(prev => ({ ...prev, isAnonymous: checked }))
                      }
                    />
                    <label className="text-sm">Post anonymously</label>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowForumPost(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleForumPost} className="gap-2">
                    <Send className="h-4 w-4" />
                    Post Discussion
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Add remaining tab contents */}
        </Tabs>
      </div>

      {/* Video Player Dialog */}
      <Dialog open={showVideoPlayer} onOpenChange={setShowVideoPlayer}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{activeResource?.title}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video bg-black rounded-lg relative">
            <video
              ref={videoRef}
              src={activeResource?.url}
              className="w-full h-full"
              controls
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center justify-between text-white">
                <div className="flex gap-4">
                  <Button variant="ghost" size="sm">
                    <Rewind className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <PlayCircle className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <FastForward className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-4">
                  <select
                    value={playbackSpeed}
                    onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                    className="bg-transparent border-none text-white"
                  >
                    <option value="0.5">0.5x</option>
                    <option value="1">1x</option>
                    <option value="1.5">1.5x</option>
                    <option value="2">2x</option>
                  </select>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSubtitles(!showSubtitles)}
                  >
                    <Subtitles className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* PDF Preview Dialog */}
      <Dialog open={showPDFPreview} onOpenChange={setShowPDFPreview}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{activeResource?.title}</DialogTitle>
          </DialogHeader>
          <div className="h-[600px] bg-white rounded-lg p-4">
            <iframe
              src={activeResource?.url}
              className="w-full h-full"
              title="PDF Preview"
            />
          </div>
          <Button className="mt-4" onClick={() => {/* Handle download */}}>
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
