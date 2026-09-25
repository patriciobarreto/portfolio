import { Intro } from "@/components/Intro";
import { Soundboard } from "@/components/Soundboard";
import { PlatformArchitecture } from "@/components/PlatformArchitecture";
import { Features } from "@/components/Features";
import { HowIBuildAgents } from "@/components/HowIBuildAgents";
import { WorkingWithoutPM } from "@/components/WorkingWithoutPM";
import { Code } from "@/components/Code";
import { Experience } from "@/components/Experience";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Intro />
      <Soundboard />
      <PlatformArchitecture />
      <Features />
      <HowIBuildAgents />
      <WorkingWithoutPM />
      <Code />
      <Experience />
      <About />
      <Contact />
    </main>
  );
}
