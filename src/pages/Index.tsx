import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ParticleBackground } from "@/components/ParticleBackground";
import { FeaturedArticle } from "@/components/FeaturedArticle";
import { CategoryCard } from "@/components/CategoryCard";
import { Shield, Lock, Terminal, Bug, Network, Code } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts, fetchCategories, getFeaturedImage, getAuthorName, formatDate, stripHtml } from "@/lib/wordpress";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  // Fetch posts from WordPress
  const { data: posts = [], isLoading: postsLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetchPosts({ per_page: 6 }),
  });

  // Fetch categories from WordPress
  const { data: wpCategories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  // Fallback data when WordPress not configured yet
  const fallbackArticles = [
    {
      title: "Advanced SQL Injection Techniques in 2025",
      excerpt: "Explore the latest SQL injection methods and how to protect your applications from these sophisticated attacks.",
      date: "Jan 15, 2025",
      author: "Alex Hunter",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=450&fit=crop"
    },
    {
      title: "Zero-Day Vulnerability Discovery Process",
      excerpt: "Learn the systematic approach to finding and reporting zero-day vulnerabilities in modern software systems.",
      date: "Jan 12, 2025",
      author: "Sarah Chen",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=450&fit=crop"
    },
    {
      title: "Building Your First Penetration Testing Lab",
      excerpt: "A comprehensive guide to setting up a professional penetration testing environment from scratch.",
      date: "Jan 10, 2025",
      author: "Mike Torres",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop"
    }
  ];

  // Use WordPress posts or fallback to static content
  const featuredArticles = posts.length > 0
    ? posts.slice(0, 3).map(post => ({
        title: post.title.rendered,
        excerpt: stripHtml(post.excerpt.rendered),
        date: formatDate(post.date),
        author: getAuthorName(post),
        image: getFeaturedImage(post),
      }))
    : fallbackArticles;

  // Category icons mapping
  const categoryIcons: Record<string, any> = {
    'cyber-news-risks': Shield,
    'penetration-testing': Bug,
    'network-security': Network,
    'cryptography': Lock,
    'exploit-development': Code,
    'terminal-tools': Terminal,
  };

  // Fallback categories
  const fallbackCategories = [
    {
      name: "Cyber News & Risks",
      description: "Latest cybersecurity threats and industry news",
      icon: Shield,
      articleCount: 42
    },
    {
      name: "Penetration Testing",
      description: "Hands-on pentesting guides and techniques",
      icon: Bug,
      articleCount: 38
    },
    {
      name: "Network Security",
      description: "Securing networks and infrastructure",
      icon: Network,
      articleCount: 31
    },
    {
      name: "Cryptography",
      description: "Encryption, hashing, and secure communication",
      icon: Lock,
      articleCount: 27
    },
    {
      name: "Exploit Development",
      description: "Writing and analyzing security exploits",
      icon: Code,
      articleCount: 24
    },
    {
      name: "Terminal & Tools",
      description: "Command-line tools and automation",
      icon: Terminal,
      articleCount: 35
    }
  ];

  // Use WordPress categories or fallback to static content
  const categories = wpCategories.length > 0
    ? wpCategories.slice(0, 6).map(cat => ({
        name: cat.name,
        description: cat.description || `Explore ${cat.name.toLowerCase()} articles`,
        icon: categoryIcons[cat.slug] || Shield,
        articleCount: cat.count,
      }))
    : fallbackCategories;

  return (
    <div className="min-h-screen flex flex-col relative">
      <ParticleBackground />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="max-w-3xl mx-auto text-center space-y-4">
                <div className="inline-block mb-4">
                  <span className="text-primary font-mono text-sm animate-glow">
                    [root@hackernull]# ls -la /learn/
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  Learn <span className="text-primary glow-text-strong">Ethical Hacking</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Master cybersecurity skills, penetration testing techniques, and stay updated with the latest security trends.
                </p>
              </div>
            </div>
          </section>

          {/* Featured Articles */}
          <section className="py-12">
            <div className="container">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-primary font-mono text-sm terminal-prompt"></span>
                  <span className="text-primary font-mono text-sm">cat featured_articles.txt</span>
                </div>
                <h2 className="text-3xl font-bold">Featured Articles</h2>
              </div>
              {postsLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-80 bg-card/50" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredArticles.map((article, index) => (
                    <FeaturedArticle key={index} {...article} />
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Categories */}
          <section className="py-12">
            <div className="container">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-primary font-mono text-sm terminal-prompt"></span>
                  <span className="text-primary font-mono text-sm">ls /categories/</span>
                </div>
                <h2 className="text-3xl font-bold">Explore Topics</h2>
              </div>
              {categoriesLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Skeleton key={i} className="h-40 bg-card/50" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories.map((category, index) => (
                    <CategoryCard key={index} {...category} />
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Index;
