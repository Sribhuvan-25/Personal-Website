import contentService from "../services/contentService.js";

// Test utility for content service
class ContentServiceTester {
  constructor() {
    this.results = [];
  }

  log(message, type = "info") {
    const timestamp = new Date().toISOString();
    const logEntry = { timestamp, message, type };
    this.results.push(logEntry);

    const styles = {
      info: "color: blue",
      success: "color: green",
      error: "color: red",
      warning: "color: orange",
    };

    console.log(`%c[${timestamp}] ${message}`, styles[type] || styles.info);
  }

  async testBasicFunctionality() {
    this.log("🧪 Testing basic content service functionality...", "info");

    try {
      // Test personal info
      this.log("Testing personal info fetch...", "info");
      const personalInfo = await contentService.getPersonalInfo();
      this.log(
        `✅ Personal info loaded: ${personalInfo?.name || "No name found"}`,
        "success"
      );

      // Test experience
      this.log("Testing experience fetch...", "info");
      const experience = await contentService.getExperience();
      this.log(
        `✅ Experience loaded: ${
          Array.isArray(experience) ? experience.length : 0
        } items`,
        "success"
      );

      // Test projects
      this.log("Testing projects fetch...", "info");
      const projects = await contentService.getProjects();
      this.log(
        `✅ Projects loaded: ${
          Array.isArray(projects) ? projects.length : 0
        } items`,
        "success"
      );

      // Test research
      this.log("Testing research fetch...", "info");
      const research = await contentService.getResearch();
      this.log(
        `✅ Research loaded: ${
          Array.isArray(research) ? research.length : 0
        } items`,
        "success"
      );

      // Test technologies
      this.log("Testing technologies fetch...", "info");
      const technologies = await contentService.getTechnologies();
      this.log(
        `✅ Technologies loaded: ${
          Array.isArray(technologies) ? technologies.length : 0
        } items`,
        "success"
      );

      return true;
    } catch (error) {
      this.log(`❌ Basic functionality test failed: ${error.message}`, "error");
      return false;
    }
  }

  async testCaching() {
    this.log("🧪 Testing caching functionality...", "info");

    try {
      // Clear cache first
      contentService.clearCache();
      this.log("Cache cleared", "info");

      // First fetch (should hit network)
      const start1 = performance.now();
      await contentService.getPersonalInfo();
      const time1 = performance.now() - start1;
      this.log(`First fetch took: ${time1.toFixed(2)}ms`, "info");

      // Second fetch (should hit cache)
      const start2 = performance.now();
      await contentService.getPersonalInfo();
      const time2 = performance.now() - start2;
      this.log(`Second fetch took: ${time2.toFixed(2)}ms`, "info");

      if (time2 < time1 * 0.5) {
        this.log(
          "✅ Caching is working (second fetch was significantly faster)",
          "success"
        );
      } else {
        this.log("⚠️ Caching might not be working as expected", "warning");
      }

      // Check cache status
      const cacheStatus = contentService.getCacheStatus();
      this.log(
        `Cache status: ${Object.keys(cacheStatus).length} items cached`,
        "info"
      );

      return true;
    } catch (error) {
      this.log(`❌ Caching test failed: ${error.message}`, "error");
      return false;
    }
  }

  async testErrorHandling() {
    this.log("🧪 Testing error handling...", "info");

    try {
      // Test with invalid path
      this.log("Testing invalid path handling...", "info");
      const invalidData = await contentService.fetchContent(
        "invalid/path.json"
      );

      if (invalidData && Object.keys(invalidData).length === 0) {
        this.log("✅ Invalid path returns empty fallback data", "success");
      } else {
        this.log("⚠️ Invalid path handling might need improvement", "warning");
      }

      return true;
    } catch (error) {
      this.log(`❌ Error handling test failed: ${error.message}`, "error");
      return false;
    }
  }

  async testImageUrls() {
    this.log("🧪 Testing image URL generation...", "info");

    try {
      // Test different image path formats
      const testCases = [
        {
          input: "projects/project1.jpg",
          expected: "should contain raw.githubusercontent.com",
        },
        { input: "/local/image.jpg", expected: "should return as-is" },
        {
          input: "https://example.com/image.jpg",
          expected: "should return as-is",
        },
        { input: null, expected: "should return default" },
        { input: "", expected: "should return default" },
      ];

      for (const testCase of testCases) {
        const result = contentService.getImageUrl(testCase.input);
        this.log(`Image URL for "${testCase.input}": ${result}`, "info");
      }

      this.log("✅ Image URL generation test completed", "success");
      return true;
    } catch (error) {
      this.log(`❌ Image URL test failed: ${error.message}`, "error");
      return false;
    }
  }

  async testPreloading() {
    this.log("🧪 Testing content preloading...", "info");

    try {
      // Clear cache first
      contentService.clearCache();

      // Test preloading
      const start = performance.now();
      await contentService.preloadCriticalContent();
      const time = performance.now() - start;

      this.log(`Preloading took: ${time.toFixed(2)}ms`, "info");

      // Check if content is now cached
      const cacheStatus = contentService.getCacheStatus();
      const cachedItems = Object.keys(cacheStatus).length;

      if (cachedItems > 0) {
        this.log(
          `✅ Preloading successful: ${cachedItems} items cached`,
          "success"
        );
      } else {
        this.log("⚠️ Preloading might not be working", "warning");
      }

      return true;
    } catch (error) {
      this.log(`❌ Preloading test failed: ${error.message}`, "error");
      return false;
    }
  }

  async runAllTests() {
    this.log("🚀 Starting Content Service Tests...", "info");
    this.log("=====================================", "info");

    const tests = [
      { name: "Basic Functionality", fn: () => this.testBasicFunctionality() },
      { name: "Caching", fn: () => this.testCaching() },
      { name: "Error Handling", fn: () => this.testErrorHandling() },
      { name: "Image URLs", fn: () => this.testImageUrls() },
      { name: "Preloading", fn: () => this.testPreloading() },
    ];

    const results = {};

    for (const test of tests) {
      this.log(`\n--- Running ${test.name} Test ---`, "info");
      try {
        results[test.name] = await test.fn();
      } catch (error) {
        this.log(`Test ${test.name} threw an error: ${error.message}`, "error");
        results[test.name] = false;
      }
    }

    // Summary
    this.log("\n=====================================", "info");
    this.log("📊 Test Results Summary:", "info");

    const passed = Object.values(results).filter(Boolean).length;
    const total = Object.keys(results).length;

    for (const [testName, passed] of Object.entries(results)) {
      this.log(
        `${passed ? "✅" : "❌"} ${testName}`,
        passed ? "success" : "error"
      );
    }

    this.log(
      `\nOverall: ${passed}/${total} tests passed`,
      passed === total ? "success" : "warning"
    );

    return { results, summary: { passed, total, success: passed === total } };
  }

  getResults() {
    return this.results;
  }
}

// Export for use in components or manual testing
export default ContentServiceTester;

// Note: Auto-run removed to prevent interference with manual testing
