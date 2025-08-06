#!/usr/bin/env node

// Script to verify content repository structure and accessibility
import https from "https";

const REPO_BASE =
  "https://raw.githubusercontent.com/Sribhuvan-25/Personal-Website-Content/main";

const expectedFiles = [
  "personal/bio.json",
  "personal/experience.json",
  "personal/research.json",
  "personal/skills.json",
  "projects/index.json",
  "blog/index.json",
];

function fetchFile(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          if (res.statusCode === 200) {
            try {
              const json = JSON.parse(data);
              resolve({ success: true, data: json, size: data.length });
            } catch (error) {
              resolve({ success: false, error: "Invalid JSON", raw: data });
            }
          } else {
            resolve({
              success: false,
              error: `HTTP ${res.statusCode}`,
              raw: data,
            });
          }
        });
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

async function verifyRepository() {
  console.log("🔍 Verifying Content Repository Structure...");
  console.log("Repository:", "Sribhuvan-25/Personal-Website-Content");
  console.log("Base URL:", REPO_BASE);
  console.log("=".repeat(60));

  const results = {};
  let totalSuccess = 0;

  for (const file of expectedFiles) {
    const url = `${REPO_BASE}/${file}`;
    console.log(`\n📄 Checking: ${file}`);
    console.log(`   URL: ${url}`);

    try {
      const result = await fetchFile(url);
      results[file] = result;

      if (result.success) {
        console.log(`   ✅ Success - ${result.size} bytes`);
        if (Array.isArray(result.data)) {
          console.log(`   📊 Array with ${result.data.length} items`);
        } else if (typeof result.data === "object") {
          console.log(
            `   📊 Object with ${Object.keys(result.data).length} properties`
          );
        }
        totalSuccess++;
      } else {
        console.log(`   ❌ Failed - ${result.error}`);
        if (result.raw && result.raw.length < 200) {
          console.log(`   📝 Response: ${result.raw}`);
        }
      }
    } catch (error) {
      console.log(`   💥 Network Error: ${error.message}`);
      results[file] = { success: false, error: error.message };
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log("📊 SUMMARY");
  console.log("=".repeat(60));
  console.log(`Total files checked: ${expectedFiles.length}`);
  console.log(`Successful: ${totalSuccess}`);
  console.log(`Failed: ${expectedFiles.length - totalSuccess}`);

  if (totalSuccess === expectedFiles.length) {
    console.log("\n🎉 All content files are accessible and valid!");
    console.log("✅ Content repository is ready for use.");
  } else {
    console.log("\n⚠️  Some content files are missing or invalid.");
    console.log("❌ Content repository needs attention.");
  }

  // Show detailed results for failed files
  const failedFiles = Object.entries(results).filter(
    ([_, result]) => !result.success
  );
  if (failedFiles.length > 0) {
    console.log("\n🔍 FAILED FILES DETAILS:");
    failedFiles.forEach(([file, result]) => {
      console.log(`\n📄 ${file}:`);
      console.log(`   Error: ${result.error}`);
      if (result.raw && result.raw.length < 500) {
        console.log(`   Response: ${result.raw}`);
      }
    });
  }

  return {
    total: expectedFiles.length,
    success: totalSuccess,
    failed: expectedFiles.length - totalSuccess,
    allSuccess: totalSuccess === expectedFiles.length,
    results,
  };
}

// Run verification if called directly
verifyRepository()
  .then((summary) => {
    process.exit(summary.allSuccess ? 0 : 1);
  })
  .catch((error) => {
    console.error("💥 Verification failed:", error);
    process.exit(1);
  });

export { verifyRepository };
