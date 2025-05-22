import os
import argparse
from datetime import datetime
from pathlib import Path
from crewai import Agent, Task, Crew, Process
from langchain.tools import tool
from utils import slugify, write_markdown, update_index, commit_and_push

class BlogTools:
    @tool("fetch_tech_news")
    def fetch_tech_news(self) -> str:
        """Fetch latest tech news from various sources"""
        import feedparser
        from newspaper import Article
        
        feeds = [
            "https://techcrunch.com/feed/",
            "https://www.theverge.com/rss/index.xml",
            "https://www.wired.com/feed/rss",
            "https://www.technologyreview.com/feed/",
            "https://feeds.arstechnica.com/arstechnica/technology-lab"
        ]
        
        all_entries = []
        for feed_url in feeds:
            try:
                feed = feedparser.parse(feed_url)
                all_entries.extend(feed.entries)
            except Exception as e:
                print(f"Error fetching {feed_url}: {e}")
        
        # Sort by publication date (newest first)
        all_entries = sorted(
            all_entries, 
            key=lambda x: x.get('published_parsed', 0), 
            reverse=True
        )
        
        # Take top 10 entries
        recent_entries = all_entries[:10]
        
        # Extract full content
        articles = []
        for entry in recent_entries:
            try:
                article = Article(entry.link)
                article.download()
                article.parse()
                
                articles.append({
                    "title": article.title,
                    "text": article.text[:1000] + "...",  # Truncate for brevity
                    "url": entry.link,
                    "source": entry.get('author', 'Unknown')
                })
            except Exception as e:
                print(f"Error extracting content from {entry.link}: {e}")
        
        return str(articles[:5])  # Return top 5 articles as string
    
    @tool("fetch_image")
    def fetch_image(self, topic: str, slug: str) -> str:
        """Fetch a relevant image from Unsplash"""
        import requests
        from PIL import Image
        from io import BytesIO
        
        unsplash_key = os.environ.get("UNSPLASH_ACCESS_KEY")
        if not unsplash_key:
            return "Error: UNSPLASH_ACCESS_KEY not set"
        
        try:
            search_url = "https://api.unsplash.com/photos/random"
            params = {
                "query": topic,
                "orientation": "landscape",
                "client_id": unsplash_key
            }
            
            response = requests.get(search_url, params=params)
            
            if response.status_code != 200:
                return f"Error: {response.status_code}, {response.text}"
            
            data = response.json()
            
            # Download the image
            img_url = data["urls"]["regular"]
            img_response = requests.get(img_url)
            
            if img_response.status_code != 200:
                return f"Error downloading image: {img_response.status_code}"
            
            # Save the image
            img_dir = Path("public/blog_img")
            img_dir.mkdir(parents=True, exist_ok=True)
            
            img_filename = f"{slug}.jpg"
            img_path = img_dir / img_filename
            
            # Process and save image
            img = Image.open(BytesIO(img_response.content))
            img.save(img_path, "JPEG", quality=85)
            
            # Get photographer credit and link
            photographer = data["user"]["name"]
            photo_link = data["links"]["html"]
            
            return f"Image saved to /blog_img/{img_filename}, Credit: {photographer}, Link: {photo_link}"
        
        except Exception as e:
            return f"Error: {str(e)}"
    
    @tool("extract_tags")
    def extract_tags(self, content: str) -> str:
        """Extract relevant tags from content"""
        from rake_nltk import Rake
        
        canonical_tags = [
            "AI", "Machine Learning", "Web Development", "Cloud", "DevOps",
            "Cybersecurity", "Blockchain", "Mobile", "Data Science", "IoT",
            "Programming", "Hardware", "Software", "Startups", "Tech News",
            "Gaming", "AR/VR", "Robotics", "5G", "Quantum Computing"
        ]
        
        try:
            rake = Rake()
            rake.extract_keywords_from_text(content)
            keywords = rake.get_ranked_phrases()[:10]
            
            tags = []
            for keyword in keywords:
                for tag in canonical_tags:
                    if tag.lower() in keyword.lower():
                        if tag not in tags:
                            tags.append(tag)
                            break
            
            # Ensure we have at least 3 tags
            if len(tags) < 3:
                for tag in ["Tech News", "Technology", "Innovation"]:
                    if tag not in tags:
                        tags.append(tag)
            
            return str(tags[:5])  # Return up to 5 tags
            
        except Exception as e:
            return f"Error extracting tags: {str(e)}"

def main(dry_run=False):
    print("Starting CrewAI blog post generation pipeline...")
    
    # Initialize tools
    tools = BlogTools()
    
    # Create agents
    extractor = Agent(
        role="Tech News Extractor",
        goal="Find the most relevant and interesting tech news from reliable sources",
        backstory="You are an expert at finding and extracting the most important tech news. You have a keen eye for what's trending and what matters in the tech world.",
        verbose=True,
        allow_delegation=False,
        tools=[tools.fetch_tech_news]
    )
    
    summariser = Agent(
        role="Content Summarizer",
        goal="Create concise and informative summaries of tech news articles",
        backstory="You are skilled at distilling complex information into clear, concise summaries. You can identify the key points in any article and create an outline that captures the essence of the story.",
        verbose=True,
        allow_delegation=True
    )
    
    writer = Agent(
        role="Tech Blogger",
        goal="Write engaging, informative tech blog posts",
        backstory="You are a professional tech blogger with years of experience. You can turn outlines and summaries into well-structured, engaging blog posts that are factually accurate and interesting to read.",
        verbose=True,
        allow_delegation=True
    )
    
    reviewer = Agent(
        role="Content Editor",
        goal="Ensure blog posts are high-quality, error-free, and well-structured",
        backstory="You are a meticulous editor with an eye for detail. You can spot grammar issues, improve flow, and ensure content is accurate and engaging.",
        verbose=True,
        allow_delegation=True
    )
    
    image_tagger = Agent(
        role="Image Finder and Tagger",
        goal="Find relevant images and extract appropriate tags for blog posts",
        backstory="You are skilled at finding the perfect image to complement a blog post and identifying the most relevant tags to categorize content.",
        verbose=True,
        allow_delegation=False,
        tools=[tools.fetch_image, tools.extract_tags]
    )
    
    # Create tasks
    extract_task = Task(
        description="Find and extract the latest tech news articles. Return the top 5 most interesting and relevant articles.",
        agent=extractor
    )
    
    summarize_task = Task(
        description="""
        Create a comprehensive outline based on the extracted articles.
        The outline should:
        1. Include a main title for the blog post
        2. Have sections for each main topic
        3. Include key points for each section
        4. Be well-structured for a tech blog post
        
        Return the outline in Markdown format.
        """,
        agent=summariser,
        dependencies=[extract_task]
    )
    
    write_task = Task(
        description="""
        Write a complete blog post based on the provided outline.
        The post should:
        1. Be approximately 900 words
        2. Use proper Markdown formatting
        3. Include section headers
        4. Be engaging and informative
        5. Be factually accurate
        
        Return the complete blog post in Markdown format.
        """,
        agent=writer,
        dependencies=[summarize_task]
    )
    
    review_task = Task(
        description="""
        Review and improve the blog post.
        Focus on:
        1. Grammar and spelling
        2. Flow and readability
        3. Factual accuracy
        4. Proper Markdown formatting
        5. Ensuring the post is under 1000 words
        
        Return the improved blog post in Markdown format.
        """,
        agent=reviewer,
        dependencies=[write_task]
    )
    
    image_tag_task = Task(
        description="""
        Based on the final blog post:
        1. Extract the main topic from the title or first paragraph
        2. Find a relevant image for that topic
        3. Extract 3-5 relevant tags from the content
        
        Return the image path, credit information, and tags.
        """,
        agent=image_tagger,
        dependencies=[review_task]
    )
    
    # Create the crew
    crew = Crew(
        agents=[extractor, summariser, writer, reviewer, image_tagger],
        tasks=[extract_task, summarize_task, write_task, review_task, image_tag_task],
        verbose=2,
        process=Process.sequential
    )
    
    # Run the crew
    result = crew.kickoff()
    
    # Process the results
    try:
        # Extract title from the post (first heading)
        final_post = result["review_task"]
        lines = final_post.split('\n')
        title = ""
        for line in lines:
            if line.startswith('# '):
                title = line[2:].strip()
                break
        
        if not title:
            title = "Tech News Roundup"
        
        # Create slug from title
        slug = slugify(title)
        
        # Parse image and tag info
        image_tag_result = result["image_tag_task"]
        img_info = image_tag_result.split("Image saved to ")[1].split(", Credit: ")
        img_path = img_info[0]
        credit_link = img_info[1].split(", Link: ")
        credit = credit_link[0]
        link = credit_link[1].split("\n")[0]
        
        # Parse tags
        tags_str = image_tag_result.split("['")[1].split("']")[0]
        tags = [tag.strip("' ") for tag in tags_str.split("', '")]
        
        # Write to markdown file
        print("Writing markdown file...")
        today = datetime.now().strftime("%Y-%m-%d")
        post_path = write_markdown(final_post, title, slug, img_path, credit, link, tags)
        
        # Update index
        print("Updating index...")
        update_index(slug, title, today, tags, img_path)
        
        print(f"Blog post generated: {post_path}")
        
        # Commit and push if not dry run
        if not dry_run:
            print("Committing and pushing changes...")
            if commit_and_push():
                print("Changes pushed successfully!")
            else:
                print("Failed to push changes.")
        else:
            print("Dry run - skipping git commit and push.")
        
    except Exception as e:
        print(f"Error processing results: {e}")
    
    print("Pipeline completed!")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate AI blog post using CrewAI")
    parser.add_argument("--dry_run", action="store_true", help="Run without git commit and push")
    args = parser.parse_args()
    
    main(dry_run=args.dry_run) 