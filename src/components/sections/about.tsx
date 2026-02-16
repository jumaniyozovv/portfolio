import { Badge } from "@/components/ui/badge";

const techStack = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "PostgreSQL",
  "Prisma",
  "Docker",
  "Git",
  "Linux",
];

export function About() {
  return (
    <div className="pb-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mt-8 space-y-4 text-lg leading-relaxed text-muted-foreground">
          <p>
            I&apos;m a passionate developer who loves turning ideas into
            polished, performant web applications. With experience across the
            full stack, I enjoy working on everything from pixel-perfect UIs to
            scalable backend systems.
          </p>
          <p>
            When I&apos;m not coding, you&apos;ll find me exploring new
            technologies, contributing to open source, or diving into a good
            book.
          </p>
        </div>

        <div className="mt-10">
          <h3 className="mb-4 text-lg font-semibold">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-sm">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
