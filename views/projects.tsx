import ProjectCard from "components/project-card";
import projects from "content/projects.json";
import React from "react";

const Projects = () => {
  return (
    <section id="projekty" className="projects">
      <h2 className="section-header">Projekty</h2>
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </section>
  );
};

export default Projects;
