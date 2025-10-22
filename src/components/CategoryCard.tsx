import { Card, CardContent } from "./ui/card";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  name: string;
  description: string;
  icon: LucideIcon;
  articleCount: number;
}

export const CategoryCard = ({ name, description, icon: Icon, articleCount }: CategoryCardProps) => {
  return (
    <Card className="group cursor-pointer border-primary/10 bg-[hsl(120,100%,8%)] hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,0,0.15)]">
      <CardContent className="p-8">
        <div className="mb-6">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-sm text-primary/70 mb-4 leading-relaxed">
          {description}
        </p>
        <div className="text-sm text-primary font-medium">
          {articleCount} articles
        </div>
      </CardContent>
    </Card>
  );
};
