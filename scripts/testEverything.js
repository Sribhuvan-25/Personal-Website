#!/usr/bin/env node

// Comprehensive test script for content service integration
import { verifyRepository } from "./verifyContentRepo.js";
import { verifyImages } from "./verifyImages.js";
import { setupContentIntegration } from "./setupContentIntegration.js";

async function runAllTests() {
  console.log("🚀 Running Comprehensive Content Service Tests...");
  console.log("=".repeat(80));

  const results = {
    contentRepo: null,
    images: null,
    integration: null,
  };

  try {
    // Test 1: Content Repository Verification
    console.log("\n📋 TEST 1: Content Repository Verification");
    console.log("-".repeat(50));
    results.contentRepo = await verifyRepository();

    if (results.contentRepo.allSuccess) {
      console.log("✅ Content repository test PASSED");
    } else {
      console.log("❌ Content repository test FAILED");
    }
  } catch (error) {
    console.error("💥 Content repository test ERROR:", error.message);
    results.contentRepo = { allSuccess: false, error: error.message };
  }

  try {
    // Test 2: Image Accessibility Verification
    console.log("\n🖼️  TEST 2: Image Accessibility Verification");
    console.log("-".repeat(50));
    results.images = await verifyImages();

    if (results.images.allSuccess) {
      console.log("✅ Image accessibility test PASSED");
    } else {
      console.log("❌ Image accessibility test FAILED");
    }
  } catch (error) {
    console.error("💥 Image accessibility test ERROR:", error.message);
    results.images = { allSuccess: false, error: error.message };
  }

  try {
    // Test 3: Component Integration Analysis
    console.log("\n🔧 TEST 3: Component Integration Analysis");
    console.log("-".repeat(50));
    results.integration = await setupContentIntegration();

    const allComponentsUpdated = results.integration.summary.needsUpdate === 0;
    if (allComponentsUpdated) {
      console.log("✅ Component integration test PASSED");
    } else {
      console.log("❌ Component integration test FAILED");
    }
  } catch (error) {
    console.error("💥 Component integration test ERROR:", error.message);
    results.integration = {
      summary: { needsUpdate: -1 },
      error: error.message,
    };
  }

  // Final Summary
  console.log("\n" + "=".repeat(80));
  console.log("📊 COMPREHENSIVE TEST RESULTS");
  console.log("=".repeat(80));

  const tests = [
    {
      name: "Content Repository",
      passed: results.contentRepo?.allSuccess || false,
      details: results.contentRepo?.allSuccess
        ? `${results.contentRepo.success}/${results.contentRepo.total} files accessible`
        : "Failed to verify content files",
    },
    {
      name: "Image Accessibility",
      passed: results.images?.allSuccess || false,
      details: results.images?.allSuccess
        ? `${results.images.success}/${results.images.total} images accessible`
        : "Failed to verify images",
    },
    {
      name: "Component Integration",
      passed: results.integration?.summary?.needsUpdate === 0 || false,
      details: results.integration?.summary
        ? `${results.integration.summary.alreadyUpdated}/${results.integration.summary.total} components using contentService`
        : "Failed to analyze components",
    },
  ];

  let allPassed = true;
  tests.forEach((test) => {
    const status = test.passed ? "✅ PASS" : "❌ FAIL";
    console.log(`${status} ${test.name}: ${test.details}`);
    if (!test.passed) allPassed = false;
  });

  console.log("\n" + "=".repeat(80));
  if (allPassed) {
    console.log(
      "🎉 ALL TESTS PASSED! Your content service integration is ready!"
    );
    console.log("");
    console.log("🌐 Next Steps:");
    console.log(
      "   1. Visit your website: http://localhost:5175/ (or check your terminal for the correct port)"
    );
    console.log(
      "   2. Test the content service: http://localhost:5175/test-content-service"
    );
    console.log("   3. Verify all images are displaying correctly");
    console.log("   4. Check that all data loads from the GitHub repository");
    console.log("");
    console.log("✅ Content Service Integration Complete!");
  } else {
    console.log("⚠️  SOME TESTS FAILED. Please review the errors above.");
    console.log("");
    console.log("🔧 Troubleshooting:");
    console.log("   1. Check your internet connection");
    console.log("   2. Verify GitHub repository is accessible");
    console.log("   3. Ensure all images were uploaded correctly");
    console.log("   4. Review component code for any syntax errors");
  }

  return {
    allPassed,
    results,
    summary: {
      contentRepo: results.contentRepo?.allSuccess || false,
      images: results.images?.allSuccess || false,
      integration: results.integration?.summary?.needsUpdate === 0 || false,
    },
  };
}

// Run all tests
runAllTests()
  .then((summary) => {
    process.exit(summary.allPassed ? 0 : 1);
  })
  .catch((error) => {
    console.error("\n💥 Test suite failed:", error);
    process.exit(1);
  });

export { runAllTests };
