import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Turnstile } from "@marsidev/react-turnstile";
import { useToast } from "@/hooks/use-toast";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!turnstileToken) {
      toast({
        title: "Verification required",
        description: "Please complete the captcha verification.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // TODO: Add your newsletter signup endpoint here
    // For now, just simulate a successful signup
    setTimeout(() => {
      toast({
        title: "Successfully subscribed!",
        description: "You'll receive our latest cybersecurity updates.",
      });
      setEmail("");
      setTurnstileToken(null);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-16 bg-card/30 backdrop-blur-sm border-y border-border/40">
      <div className="container max-w-2xl">
        <div className="text-center space-y-4 mb-8">
          <div className="inline-block mb-2">
            <span className="text-primary font-mono text-sm animate-glow">
              [root@hackernull]# cat newsletter.txt
            </span>
          </div>
          <h2 className="text-3xl font-bold">Stay Updated</h2>
          <p className="text-muted-foreground">
            Get the latest cybersecurity news, tutorials, and exclusive content delivered to your inbox.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="your.email@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-background/50 border-primary/20 focus:border-primary"
            />
            <Button 
              type="submit" 
              disabled={!turnstileToken || isSubmitting}
              className="sm:w-auto w-full"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </div>

          <div className="flex justify-center">
            <Turnstile
              siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
              onSuccess={(token) => setTurnstileToken(token)}
              onError={() => setTurnstileToken(null)}
              onExpire={() => setTurnstileToken(null)}
              options={{ theme: "dark" }}
            />
          </div>

          <p className="text-xs text-muted-foreground text-center">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      </div>
    </section>
  );
};
