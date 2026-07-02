import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactSection() {
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Get in Touch
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Have a question or want to work together? I'd love to hear from you.
        </p>
        <Button asChild size="lg" className="mt-8">
          <a href="mailto:njumaniyozov001@gmail.com">
            <Mail size={18} />
            Send an Email
          </a>
        </Button>
      </div>
    </section>
  );
}
