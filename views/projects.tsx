import ProjectCard from "components/project-card";
import projects from "content/projects.json";

export default function Projects() {
  return (
    <section id="projekty" className="pb-24">
      <h2 className="section-header">Projekty</h2>
      {projects
        .sort((a, b) => b.id - a.id)
        .map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
    </section>
  );
}
