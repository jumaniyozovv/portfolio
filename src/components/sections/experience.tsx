"use client";

import { Badge } from "@/components/ui/badge";
import { LinkPreview } from "@/components/ui/link-preview";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { Timeline } from "@/components/ui/timeline";
import { motion } from "framer-motion";
import {
  Briefcase,
  Code2,
  GraduationCap,
  Rocket,
  School,
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
];

const timelineData = [
  {
    title: "2022",
    content: (
      <div>
        <motion.div {...fadeIn} className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10">
              <School className="h-5 w-5 text-cyan-400" />
            </div>
            <h4 className="text-lg font-semibold text-foreground md:text-xl">
              Finished{" "}
              <LinkPreview imageSrc="/school.png" width={280}
              
               height={180}>
                School
              </LinkPreview>
            </h4>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            Completed my secondary education, building a{" "}
            <span className="font-medium text-foreground">
              strong foundation in mathematics and sciences
            </span>{" "}
            that would later fuel my passion for technology and programming.
          </p>
        </motion.div>

        <motion.div
          {...fadeIn}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
              <GraduationCap className="h-5 w-5 text-purple-400" />
            </div>
            <h4 className="text-lg font-semibold text-foreground md:text-xl">
              Admitted to{" "}
              <LinkPreview imageSrc="/ursu.png" width={280} height={180}>
                Urgench State University
              </LinkPreview>
            </h4>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            Started my journey in{" "}
            <span className="font-medium text-foreground">
              Computer Science
            </span>{" "}
            at the{" "}
            <span className="font-medium text-foreground">
              Faculty of Physics and Mathematics
            </span>
            . This marked the beginning of my deep dive into algorithms, data
            structures, and software engineering principles.
          </p>
          <div className="rounded-lg border border-border/50 bg-card/50 p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              University
            </p>
            <p className="mt-1 text-sm font-semibold text-foreground">
              <LinkPreview imageSrc="/ursu.png" width={240} height={150}>
                Urgench State University (UrSU)
              </LinkPreview>
            </p>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mt-3">
              Major
            </p>
            <p className="mt-1 text-sm font-semibold text-foreground">
              Computer Science — Physics & Mathematics Faculty
            </p>
          </div>
        </motion.div>
      </div>
    ),
  },
  {
    title: "2022–2026",
    content: (
      <div>
        <motion.div {...fadeIn} className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
              <Code2 className="h-5 w-5 text-blue-400" />
            </div>
            <h4 className="text-lg font-semibold text-foreground md:text-xl">
              Discovering Web Development
            </h4>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            During my university years, I discovered my passion for{" "}
            <span className="font-medium text-foreground">
              web application development
            </span>
            . I immersed myself in modern web technologies, building projects
            and constantly expanding my skill set.
          </p>
          <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
            <span>Currently working with</span>
            <ContainerTextFlip
              words={skills}
              interval={2500}
              className="!text-sm !py-1 !px-0"
              textClassName="!text-sm"
            />
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="border-border/50 text-xs"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </motion.div>

        <motion.div
          {...fadeIn}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
              <GraduationCap className="h-5 w-5 text-green-400" />
            </div>
            <h4 className="text-lg font-semibold text-foreground md:text-xl">
              Completing University
            </h4>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            Now in my final year at{" "}
            <LinkPreview imageSrc="/ursu.png" width={240} height={150}>
              UrSU
            </LinkPreview>
            , about to earn my degree in Computer Science. The combination of
            theoretical knowledge and hands-on development experience has
            prepared me for real-world challenges.
          </p>
        </motion.div>
      </div>
    ),
  },
  {
    title: "Present",
    content: (
      <div>
        <motion.div {...fadeIn} className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
              <Briefcase className="h-5 w-5 text-orange-400" />
            </div>
            <h4 className="text-lg font-semibold text-foreground md:text-xl">
              Frontend Developer at IT-Forelead
            </h4>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            Working as a{" "}
            <span className="font-medium text-foreground">
              Frontend Developer
            </span>{" "}
            at{" "}
            <span className="font-medium text-foreground">IT-Forelead</span>{" "}
            for the past 5 months. Building modern, performant web applications
            using cutting-edge technologies.
          </p>
          <div className="rounded-lg border border-border/50 bg-card/50 p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Company
            </p>
            <p className="mt-1 text-sm font-semibold text-foreground">
              IT-Forelead
            </p>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mt-3">
              Role
            </p>
            <p className="mt-1 text-sm font-semibold text-foreground">
              Frontend Developer
            </p>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mt-3">
              Duration
            </p>
            <p className="mt-1 text-sm font-semibold text-foreground">
              5 months
            </p>
          </div>
        </motion.div>

        <motion.div
          {...fadeIn}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-500/10">
              <Rocket className="h-5 w-5 text-pink-400" />
            </div>
            <h4 className="text-lg font-semibold text-foreground md:text-xl">
              What&apos;s Next
            </h4>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            Continuously growing as a developer, exploring new technologies, and
            building impactful web applications. Eager to take on{" "}
            <span className="font-medium text-foreground">
              new challenges
            </span>{" "}
            and contribute to innovative projects.
          </p>
        </motion.div>
      </div>
    ),
  },
];

export function ExperienceSection() {
  return (
    <div className="pb-10">
      <Timeline data={timelineData} />
    </div>
  );
}
