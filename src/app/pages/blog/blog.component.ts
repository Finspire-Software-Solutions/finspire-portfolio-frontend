import { Component, OnInit } from '@angular/core';
import { BlogService, BlogPost } from '../../services/blog.service';
import { ToastService } from '../../shared/toast/toast.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  posts: BlogPost[] = [];
  selectedTag: string = 'All';
  page = 0;
  size = 10;
  totalPages = 0;
  totalElements = 0;

  // Modal state
  showPostModal = false;
  activePost: BlogPost | null = null;

  constructor(private blogService: BlogService, private toast: ToastService) {
    // this.load();
  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.blogService.getBlogs(this.page, this.size).subscribe({
      next: (resp) => {
        this.posts = resp.content;
        console.log("posts loaded", this.posts);
        this.totalPages = resp.totalPages;
        this.totalElements = resp.totalElements;
      },
      error: (err) => {
        console.error('Failed to load blog posts', err);
        this.toast.error('Failed to load blog posts');
      }
    });
  }
  // loadCategories(): void {
  //   const projectCats = Array.from(new Set(this.posts.map(p => p.tags).filter(Boolean)));
  //   const merged = Array.from(new Set([
  //     ...projectCats
  //   ]));
  //   this.tags = ['All', ...merged];
  //   console.log('categories', this.tags);
  // }
  nextPage() {
    if (this.page + 1 < this.totalPages) {
      this.page += 1;
      this.load();
    }
  }

  prevPage() {
    if (this.page > 0) {
      this.page -= 1;
      this.load();
    }
  }

  goToPage(p: number) {
    if (p >= 0 && p < this.totalPages) {
      this.page = p;
      this.load();
    }
  }

  get tags(): string[] {
    const all = new Set<string>();
    this.posts.forEach(p => p.tags.forEach(t => all.add(t)));
    return ['All', ...Array.from(all).sort()];
  }

  get filtered(): BlogPost[] {
    if (this.selectedTag === 'All') return this.posts;
    return this.posts.filter(p => p.tags.includes(this.selectedTag));
  }

  openPost(post: BlogPost) {
    this.activePost = post;
    this.showPostModal = true;
  }

  closePostModal() {
    this.showPostModal = false;
    this.activePost = null;
  }

  // Safely check if content is longer than preview length
  isLong(post: BlogPost, limit = 180): boolean {
    const len = (post && (post as any).content) ? String((post as any).content).length : 0;
    return len > limit;
  }
}


