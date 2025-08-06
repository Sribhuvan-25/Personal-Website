#!/usr/bin/env node

// Script to verify image accessibility in content repository
import https from "https";

const REPO_BASE =
  "https://raw.githubusercontent.com/Sribhuvan-25/Personal-Website-Content/main";

const expectedImages = [
  // Personal images
  "personal/profile.jpg",

  // Company/Organization logos
  "images/Pearson.png",
  "images/NCR_Corporation_logo.svg.png",
  "images/TReNDS.jpeg",
  "images/GSU.jpg",

  // Project images
  "projects/driveThru.png",
  "projects/TumorDetection.png",
  "projects/CipherCloud.png",
  "projects/FitFusion.png",
  "projects/Melody.png",
  "projects/sLang.png",
];

function checkImage(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode === 200) {
          let size = 0;
          res.on("data", (chunk) => {
            size += chunk.length;
          });
          res.on("end", () => {
            resolve({
              success: true,
              size,
              contentType: res.headers["content-type"],
            });
          });
        } else {
          resolve({ success: false, error: `HTTP ${res.statusCode}` });
        }
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

async function verifyImages() {
  console.log("🖼️  Verifying Image Accessibility...");
  console.log("Repository:", "Sribhuvan-25/Personal-Website-Content");
  console.log("Base URL:", REPO_BASE);
  console.log("=".repeat(60));

  const results = {};
  let totalSuccess = 0;

  for (const image of expectedImages) {
    const url = `${REPO_BASE}/${image}`;
    console.log(`\n🖼️  Checking: ${image}`);
    console.log(`   URL: ${url}`);

    try {
      const result = await checkImage(url);
      results[image] = result;

      if (result.success) {
        const sizeKB = (result.size / 1024).toFixed(1);
        console.log(`   ✅ Success - ${sizeKB} KB (${result.contentType})`);
        totalSuccess++;
      } else {
        console.log(`   ❌ Failed - ${result.error}`);
      }
    } catch (error) {
      console.log(`   💥 Network Error: ${error.message}`);
      results[image] = { success: false, error: error.message };
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log("📊 IMAGE VERIFICATION SUMMARY");
  console.log("=".repeat(60));
  console.log(`Total images checked: ${expectedImages.length}`);
  console.log(`Successful: ${totalSuccess}`);
  console.log(`Failed: ${expectedImages.length - totalSuccess}`);

  if (totalSuccess === expectedImages.length) {
    console.log("\n🎉 All images are accessible and ready!");
    console.log("✅ Website should now display all images correctly.");
  } else {
    console.log("\n⚠️  Some images are missing or inaccessible.");
    console.log("❌ Check the failed images above.");
  }

  // Show detailed results for failed images
  const failedImages = Object.entries(results).filter(
    ([_, result]) => !result.success
  );
  if (failedImages.length > 0) {
    console.log("\n🔍 FAILED IMAGES DETAILS:");
    failedImages.forEach(([image, result]) => {
      console.log(`\n🖼️  ${image}:`);
      console.log(`   Error: ${result.error}`);
    });
  }

  return {
    total: expectedImages.length,
    success: totalSuccess,
    failed: expectedImages.length - totalSuccess,
    allSuccess: totalSuccess === expectedImages.length,
    results,
  };
}

// Run verification
verifyImages()
  .then((summary) => {
    process.exit(summary.allSuccess ? 0 : 1);
  })
  .catch((error) => {
    console.error("💥 Image verification failed:", error);
    process.exit(1);
  });

export { verifyImages };
