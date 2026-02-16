import { About } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { ProjectsSection } from "@/components/sections/projects";
import { LampSection } from "@/components/ui/lamp";

export default function Home() {
  return (
    <>
      <Hero />
      <div id="about">
        <LampSection title="About Me">
          <About />
        </LampSection>
      </div>
      <div id="projects">
        <LampSection title="Projects">
          <ProjectsSection />
        </LampSection>
      </div>
      <ContactSection />
    </>
  );
}
