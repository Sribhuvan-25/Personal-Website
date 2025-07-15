import React from 'react';

const NewProjects = () => {
  const projects = [
    { name: 'Project One', description: 'Description of project one.' },
    { name: 'Project Two', description: 'Description of project two.' },
    { name: 'Project Three', description: 'Description of project three.' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">New Projects</h1>
      <ul>
        {projects.map((project, index) => (
          <li key={index} className="mb-4">
            <h2 className="text-2xl font-semibold">{project.name}</h2>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewProjects;