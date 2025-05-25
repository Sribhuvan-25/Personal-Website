# Content Management Architecture

## Overview
Separate content repository approach for managing personal website data including blog posts, projects, experience, and personal information.

## Repository Structure

### Main Website Repo (`Personal-Website`)
```
src/
├── components/
├── routes/
├── services/
│   └── contentService.js  # Handles all content fetching
└── constants/
    └── config.js         # Content repo URLs and settings
```

### Content Repo (`Personal-Website-Content`)
```
content/
├── personal/
│   ├── bio.json
│   ├── experience.json
│   └── skills.json
├── projects/
│   ├── index.json
│   └── images/
├── blog/
│   ├── index.json
│   ├── posts/
│   │   ├── 2024-01-15-ai-trends.json
│   │   └── 2024-01-16-react-performance.json
│   └── images/
└── config/
    └── site-settings.json
```

## Implementation Plan

### Phase 1: Content Service Layer
1. Create `contentService.js` to handle all GitHub API calls
2. Implement caching strategy for better performance
3. Add error handling and fallback content

### Phase 2: Content Repository Setup
1. Create new GitHub repo for content
2. Migrate existing constants to JSON files
3. Set up proper file structure

### Phase 3: AI Integration
1. Update AI blog pipeline to commit to content repo
2. Set up webhooks to trigger website rebuilds
3. Implement content validation

## Benefits

### For Development
- Clean separation of concerns
- Easier testing with mock content
- Independent deployment cycles

### For Content Management
- Non-technical users can edit content via GitHub UI
- Version control for all content changes
- Easy backup and migration

### For AI Pipeline
- Direct integration with GitHub API
- Automated content publishing
- Content review workflow via pull requests

## Technical Implementation

### Content Service Example
```javascript
class ContentService {
  constructor() {
    this.baseUrl = 'https://api.github.com/repos/username/Personal-Website-Content';
    this.cache = new Map();
  }

  async fetchContent(path) {
    // Implementation with caching and error handling
  }
}
```

### Caching Strategy
- Browser localStorage for frequently accessed content
- Service worker for offline support
- TTL-based cache invalidation

## Migration Steps
1. Create content repository
2. Export existing data to JSON format
3. Update website to use content service
4. Test thoroughly before switching
5. Update AI pipeline configuration 