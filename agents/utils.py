import os
import re
import json
import git
from datetime import datetime
from pathlib import Path

def slugify(text):
    """Convert text to URL-friendly slug"""
    text = text.lower()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    text = re.sub(r'^-+|-+$', '', text)
    return text

def write_markdown(content, title, slug, img_path, credit, link, tags):
    """Write content to markdown file with frontmatter"""
    today = datetime.now().strftime("%Y-%m-%d")
    
    frontmatter = f"""---
title: "{title}"
date: "{today}"
tags: {json.dumps(tags)}
hero: "{img_path}"
image_credit: "{credit} (Unsplash)"
image_link: "{link}"
---

{content}
"""
    
    post_dir = Path("content/posts")
    post_dir.mkdir(parents=True, exist_ok=True)
    
    post_path = post_dir / f"{slug}.md"
    with open(post_path, "w", encoding="utf-8") as f:
        f.write(frontmatter)
    
    return post_path

def update_index(slug, title, date, tags, hero):
    """Update the index.json file with new post metadata"""
    index_path = Path("content/index.json")
    
    if index_path.exists():
        with open(index_path, "r", encoding="utf-8") as f:
            posts = json.load(f)
    else:
        posts = []
    
    # Add new post to the beginning of the list
    posts.insert(0, {
        "slug": slug,
        "title": title,
        "date": date,
        "tags": tags,
        "hero": hero
    })
    
    # Write updated index
    with open(index_path, "w", encoding="utf-8") as f:
        json.dump(posts, f, indent=2)

def commit_and_push():
    """Commit new post and push to GitHub"""
    try:
        repo = git.Repo()
        today = datetime.now().strftime("%Y-%m-%d")
        
        # Add all changes
        repo.git.add("content/")
        repo.git.add("public/blog_img/")
        
        # Commit
        commit_message = f"feat(blog): Add new post for {today}"
        repo.git.commit("-m", commit_message)
        
        # Push
        repo.git.push()
        
        return True
    except Exception as e:
        print(f"Error in Git operations: {e}")
        return False 