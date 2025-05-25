#!/usr/bin/env node

// Setup script for content integration phases
import fs from "fs/promises";
import path from "path";

const COMPONENTS_TO_UPDATE = [
  {
    file: "src/components/Me.jsx",
    service: "getPersonalInfo",
    description: "Personal bio and contact information",
  },
  {
    file: "src/components/Experience.jsx",
    service: "getExperience",
    description: "Work experience data",
  },
  {
    file: "src/components/Research.jsx",
    service: "getResearch",
    description: "Research experience data",
  },
  {
    file: "src/components/Projects.jsx",
    service: "getProjects",
    description: "Projects portfolio data",
  },
  {
    file: "src/components/TechStack.jsx",
    service: "getTechnologies",
    description: "Technologies and skills data",
  },
];

async function checkFileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function analyzeComponent(filePath) {
  try {
    const content = await fs.readFile(filePath, "utf-8");

    const analysis = {
      exists: true,
      hasContentService: content.includes("contentService"),
      hasUseEffect: content.includes("useEffect"),
      hasUseState: content.includes("useState"),
      usesConstants: content.includes('from "../constants'),
      linesOfCode: content.split("\n").length,
      needsUpdate: !content.includes("contentService"),
    };

    return analysis;
  } catch (error) {
    return {
      exists: false,
      error: error.message,
    };
  }
}

async function generateComponentUpdate(componentInfo) {
  const { file, service, description } = componentInfo;

  return `
// Updated ${path.basename(file)} to use Content Service
// ${description}

import { useState, useEffect } from 'react';
import contentService from '../services/contentService.js';

const ${path.basename(file, ".jsx")} = ({ isDarkMode }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await contentService.${service}();
        setData(result);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch ${description}:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">Failed to load ${description}</p>
        <p className="text-sm text-gray-500 mt-2">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">No ${description} available</p>
      </div>
    );
  }

  // TODO: Implement component-specific rendering logic
  // This is a template - you'll need to customize based on your existing component structure
  
  return (
    <div className="py-20">
      <h2 className="text-3xl font-bold text-center mb-12">
        ${path.basename(file, ".jsx")}
      </h2>
      <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

export default ${path.basename(file, ".jsx")};
`;
}

async function setupContentIntegration() {
  console.log("🚀 Setting up Content Integration...");
  console.log("=".repeat(60));

  // Phase 2: Analyze current components
  console.log("\n📋 Phase 2: Component Analysis");
  console.log("-".repeat(40));

  const componentAnalysis = {};

  for (const component of COMPONENTS_TO_UPDATE) {
    console.log(`\n📄 Analyzing: ${component.file}`);

    const exists = await checkFileExists(component.file);
    if (!exists) {
      console.log(`   ❌ File not found`);
      componentAnalysis[component.file] = { exists: false };
      continue;
    }

    const analysis = await analyzeComponent(component.file);
    componentAnalysis[component.file] = analysis;

    console.log(`   ✅ File exists (${analysis.linesOfCode} lines)`);
    console.log(
      `   📊 Uses contentService: ${analysis.hasContentService ? "✅" : "❌"}`
    );
    console.log(`   📊 Has useState: ${analysis.hasUseState ? "✅" : "❌"}`);
    console.log(`   📊 Has useEffect: ${analysis.hasUseEffect ? "✅" : "❌"}`);
    console.log(
      `   📊 Uses constants: ${analysis.usesConstants ? "⚠️" : "✅"}`
    );
    console.log(`   🔄 Needs update: ${analysis.needsUpdate ? "✅" : "❌"}`);
  }

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("📊 COMPONENT ANALYSIS SUMMARY");
  console.log("=".repeat(60));

  const existingComponents = Object.values(componentAnalysis).filter(
    (a) => a.exists
  ).length;
  const needsUpdate = Object.values(componentAnalysis).filter(
    (a) => a.exists && a.needsUpdate
  ).length;
  const alreadyUpdated = Object.values(componentAnalysis).filter(
    (a) => a.exists && !a.needsUpdate
  ).length;

  console.log(`Total components: ${COMPONENTS_TO_UPDATE.length}`);
  console.log(`Existing components: ${existingComponents}`);
  console.log(`Already using contentService: ${alreadyUpdated}`);
  console.log(`Need updates: ${needsUpdate}`);

  // Phase 3: Generate update templates
  if (needsUpdate > 0) {
    console.log("\n📝 Phase 3: Generating Update Templates");
    console.log("-".repeat(40));

    const templatesDir = "scripts/component-templates";

    try {
      await fs.mkdir(templatesDir, { recursive: true });
      console.log(`✅ Created templates directory: ${templatesDir}`);
    } catch (error) {
      console.log(`⚠️  Templates directory exists: ${templatesDir}`);
    }

    for (const component of COMPONENTS_TO_UPDATE) {
      const analysis = componentAnalysis[component.file];

      if (analysis?.exists && analysis.needsUpdate) {
        const template = await generateComponentUpdate(component);
        const templateFile = path.join(
          templatesDir,
          `${path.basename(component.file)}.template`
        );

        await fs.writeFile(templateFile, template);
        console.log(`📄 Generated template: ${templateFile}`);
      }
    }
  }

  // Phase 4: AI Integration Setup
  console.log("\n🤖 Phase 4: AI Integration Setup");
  console.log("-".repeat(40));

  const aiIntegrationFiles = [
    "scripts/ai-blog-pipeline.js",
    "scripts/content-updater.js",
    ".github/workflows/ai-blog.yml",
  ];

  for (const file of aiIntegrationFiles) {
    const exists = await checkFileExists(file);
    console.log(`📄 ${file}: ${exists ? "✅ Exists" : "❌ Missing"}`);
  }

  // Next steps recommendations
  console.log("\n" + "=".repeat(60));
  console.log("🎯 NEXT STEPS RECOMMENDATIONS");
  console.log("=".repeat(60));

  console.log("\n1. 🔧 Component Updates:");
  if (needsUpdate > 0) {
    console.log(`   • Update ${needsUpdate} components to use contentService`);
    console.log(`   • Templates generated in scripts/component-templates/`);
    console.log(`   • Preserve existing styling and functionality`);
  } else {
    console.log(`   ✅ All components already use contentService`);
  }

  console.log("\n2. 🧪 Testing:");
  console.log(`   • Visit http://localhost:5173/test-content-service`);
  console.log(`   • Run content service tests`);
  console.log(`   • Verify all data loads correctly`);

  console.log("\n3. 🤖 AI Integration:");
  console.log(`   • Set up GitHub Actions workflow`);
  console.log(`   • Configure AI blog pipeline`);
  console.log(`   • Test automated content generation`);

  console.log("\n4. 🚀 Deployment:");
  console.log(`   • Update environment variables`);
  console.log(`   • Configure webhooks (optional)`);
  console.log(`   • Deploy to production`);

  return {
    componentAnalysis,
    summary: {
      total: COMPONENTS_TO_UPDATE.length,
      existing: existingComponents,
      needsUpdate,
      alreadyUpdated,
    },
  };
}

// Run setup if called directly
setupContentIntegration()
  .then((result) => {
    console.log("\n✅ Content integration setup completed!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 Setup failed:", error);
    process.exit(1);
  });

export { setupContentIntegration };
