"use client";

import { ExternalLink, Github } from "lucide-react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";

export function ProjectsSection() {
  const displayProjects = projects.filter((p) => p.featured);

  return (
    <div className="pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mt-4 text-center text-lg text-muted-foreground">
          A selection of things I've built.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayProjects.map((project) => (
            <CardContainer key={project.id} containerClassName="py-0">
              <CardBody className="group/card relative flex h-full w-full flex-col rounded-xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
                <CardItem translateZ="50" className="w-full">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                </CardItem>

                <CardItem translateZ="30" className="mt-4 w-full flex-1">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <Badge key={t} variant="outline" className="text-xs">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </CardItem>

                <CardItem translateZ="40" className="mt-6 flex w-full gap-2">
                  {project.github && (
                    <Button asChild variant="ghost" size="sm">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github size={16} />
                        Code
                      </a>
                    </Button>
                  )}
                  {project.live && (
                    <Button asChild variant="ghost" size="sm">
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={16} />
                        Live
                      </a>
                    </Button>
                  )}
                </CardItem>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </div>
    </div>
  );
}
