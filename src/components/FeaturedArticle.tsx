import { Card, CardContent } from "./ui/card";
import { Calendar, User } from "lucide-react";

interface FeaturedArticleProps {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  link: string;
}

export const FeaturedArticle = ({ title, excerpt, date, author, image, link }: FeaturedArticleProps) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="block">
      <Card className="group cursor-pointer overflow-hidden border-border/40 bg-card hover:border-primary/50 transition-all duration-300 terminal-shadow hover:shadow-[0_0_30px_rgba(0,255,0,0.2)]">
      <div className="aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors glow-text">
          {title}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {excerpt}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{author}</span>
          </div>
        </div>
      </CardContent>
    </Card>
    </a>
  );
};
