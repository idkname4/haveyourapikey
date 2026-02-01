import { Bot } from 'lucide-react';

export function Header() {
  return (
    <header className="w-full border-b border-border/40">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Bot className="h-7 w-7 text-accent" />
          <h1 className="text-xl font-bold text-foreground">Web2API Agent</h1>
        </div>
      </div>
    </header>
  );
}
