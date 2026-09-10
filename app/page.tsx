import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { EducationAchievements } from "@/components/EducationAchievements";
import { Footer } from "@/components/Footer";
import headerData from "@/data/header.json";

export default function Home() {
  return (
    <>
      <Nav name={headerData.name} />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <EducationAchievements />
      </main>
      <Footer />
    </>
  );
}
