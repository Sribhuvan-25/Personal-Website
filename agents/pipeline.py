import os
import argparse
from datetime import datetime
from pathlib import Path

from extractor import Extractor
from summariser import Summariser
from writer import Writer
from reviewer import Reviewer
from image_tag import ImageTagger
from utils import slugify, write_markdown, update_index, commit_and_push

def main(dry_run=False):
    print("Starting blog post generation pipeline...")
    
    # Initialize components
    extractor = Extractor()
    summariser = Summariser()
    writer = Writer()
    reviewer = Reviewer()
    image_tagger = ImageTagger()
    
    # Step 1: Collect articles
    print("Collecting articles...")
    articles = extractor.collect_articles()
    
    # Step 2: Create outline and summarize
    print("Creating outline...")
    outline, bullets = summariser.outline(articles)
    
    # Step 3: Draft the post
    print("Drafting post...")
    raw_draft = writer.draft(outline)
    
    # Step 4: Review and improve
    print("Reviewing post...")
    final_post = reviewer.review(raw_draft)
    
    # Extract title from the post (first heading)
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
    
    # Step 5: Get image and tags
    print("Fetching image and generating tags...")
    main_topic = bullets[0]["title"] if bullets else title
    img_path, credit, link = image_tagger.fetch_image(main_topic, slug)
    tags = image_tagger.extract_tags(final_post)
    
    # Step 6: Write to markdown file
    print("Writing markdown file...")
    today = datetime.now().strftime("%Y-%m-%d")
    post_path = write_markdown(final_post, title, slug, img_path, credit, link, tags)
    
    # Step 7: Update index
    print("Updating index...")
    update_index(slug, title, today, tags, img_path)
    
    print(f"Blog post generated: {post_path}")
    
    # Step 8: Commit and push if not dry run
    if not dry_run:
        print("Committing and pushing changes...")
        if commit_and_push():
            print("Changes pushed successfully!")
        else:
            print("Failed to push changes.")
    else:
        print("Dry run - skipping git commit and push.")
    
    print("Pipeline completed!")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate AI blog post")
    parser.add_argument("--dry_run", action="store_true", help="Run without git commit and push")
    args = parser.parse_args()
    
    main(dry_run=args.dry_run) 