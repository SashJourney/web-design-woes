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
    <Card className="group cursor-pointer border-border/40 bg-card hover:border-primary/50 transition-all duration-300 terminal-shadow hover:shadow-[0_0_30px_rgba(0,255,0,0.2)]">
      <CardContent className="p-6">
        <div className="mb-4 inline-flex p-3 rounded-lg bg-secondary">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {description}
        </p>
        <div className="text-xs text-primary">
          {articleCount} articles
        </div>
      </CardContent>
    </Card>
  );
};
