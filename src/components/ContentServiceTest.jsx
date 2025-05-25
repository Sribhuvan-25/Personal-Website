import { useState } from 'react';
import ContentServiceTester from '../utils/testContentService.js';
import contentService from '../services/contentService.js';

const ContentServiceTest = ({ isDarkMode }) => {
  const [testResults, setTestResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [cacheStatus, setCacheStatus] = useState({});

  const runTests = async () => {
    setIsRunning(true);
    setTestResults(null);
    
    try {
      const tester = new ContentServiceTester();
      const results = await tester.runAllTests();
      setTestResults(results);
      
      // Update cache status
      setCacheStatus(contentService.getCacheStatus());
    } catch (error) {
      console.error('Test execution failed:', error);
      setTestResults({
        results: {},
        summary: { passed: 0, total: 0, success: false },
        error: error.message
      });
    } finally {
      setIsRunning(false);
    }
  };

  const clearCache = () => {
    contentService.clearCache();
    setCacheStatus({});
  };

  const refreshCacheStatus = () => {
    setCacheStatus(contentService.getCacheStatus());
  };

  return (
    <div className={`min-h-screen p-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Content Service Testing</h1>
        
        {/* Control Panel */}
        <div className={`p-6 rounded-lg mb-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h2 className="text-xl font-semibold mb-4">Test Controls</h2>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={runTests}
              disabled={isRunning}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                isRunning 
                  ? 'bg-gray-500 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isRunning ? 'Running Tests...' : 'Run All Tests'}
            </button>
            
            <button
              onClick={clearCache}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                isDarkMode 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-red-500 hover:bg-red-600 text-white'
              }`}
            >
              Clear Cache
            </button>
            
            <button
              onClick={refreshCacheStatus}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                isDarkMode 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              Refresh Cache Status
            </button>
          </div>
        </div>

        {/* Cache Status */}
        <div className={`p-6 rounded-lg mb-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h2 className="text-xl font-semibold mb-4">Cache Status</h2>
          {Object.keys(cacheStatus).length === 0 ? (
            <p className="text-gray-500">No cached items</p>
          ) : (
            <div className="space-y-2">
              {Object.entries(cacheStatus).map(([key, status]) => (
                <div key={key} className={`p-3 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{key}</span>
                    <span className={`px-2 py-1 rounded text-sm ${
                      status.isExpired 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {status.isExpired ? 'Expired' : 'Valid'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Age: {status.age}s | Size: {status.size} bytes
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Test Results */}
        {testResults && (
          <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <h2 className="text-xl font-semibold mb-4">Test Results</h2>
            
            {testResults.error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <strong>Error:</strong> {testResults.error}
              </div>
            ) : (
              <>
                {/* Summary */}
                <div className={`p-4 rounded-lg mb-6 ${
                  testResults.summary.success 
                    ? 'bg-green-100 border border-green-400 text-green-700' 
                    : 'bg-yellow-100 border border-yellow-400 text-yellow-700'
                }`}>
                  <h3 className="font-semibold">
                    Overall Result: {testResults.summary.passed}/{testResults.summary.total} tests passed
                  </h3>
                  <p>
                    {testResults.summary.success ? '✅ All tests passed!' : '⚠️ Some tests failed'}
                  </p>
                </div>

                {/* Individual Test Results */}
                <div className="space-y-4">
                  {Object.entries(testResults.results).map(([testName, passed]) => (
                    <div 
                      key={testName} 
                      className={`p-4 rounded-lg border ${
                        passed 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-red-50 border-red-200'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">
                          {passed ? '✅' : '❌'}
                        </span>
                        <span className="font-medium">{testName}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Repository Info */}
        <div className={`p-6 rounded-lg mt-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h2 className="text-xl font-semibold mb-4">Repository Configuration</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Repository:</strong> Sribhuvan-25/Personal-Website-Content</p>
            <p><strong>Raw URL:</strong> https://raw.githubusercontent.com/Sribhuvan-25/Personal-Website-Content/main</p>
            <p><strong>API URL:</strong> https://api.github.com/repos/Sribhuvan-25/Personal-Website-Content/contents</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentServiceTest; 