export const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-card/50 backdrop-blur">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="text-primary terminal-prompt"></span>
            <span className="font-mono">© {new Date().getFullYear()} HackerNull - Empowering Ethical Hackers</span>
          </div>
          <nav className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};
