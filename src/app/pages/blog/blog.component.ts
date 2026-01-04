import { Component, Input, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { ToastService } from '../../shared/toast/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
interface Bubble {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
}
interface BlogPost {
  id: number;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage: string;
  author: string;
  createdDate: string;
  tags: string[];
  category: string;
  instagramLink?: string;
  facebookLink?: string;
  linkedinLink?: string;
  githubLink?: string;
}
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
 @Input() title: string = 'Blogs';
 @Input() subtitle: string = '';
 @Input() breadcrumbs: { label: string; link?: string }[] = [];
 @Input() limitProducts: number = 0;
 @Input() showFilters: boolean = true;
 @Input() showViewAll: boolean = false;
 @Input() showHero: boolean = true;

  bubbles: Bubble[] = [];
  ripples = [0, 1, 2];

  posts: BlogPost[] = [];
  selectedTag: string = 'All';
  page = 0;
  size = 10;
  totalPages = 0;
  totalElements = 0;

  // Modal state
  showPostModal = false;
  activePost: BlogPost | null = null;

  constructor(private blogService: BlogService, private toast: ToastService,private route: ActivatedRoute, private router: Router) {
    // this.load();
  }

  ngOnInit(): void {
    // this.load();
    this.generateBubbles();
    this.loadBlogs();
    
    // Check if coming from homepage with a specific blog slug
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.setFeaturedBySlug(slug);
      }
    });

    // Also check query params as alternative
    this.route.queryParamMap.subscribe(params => {
      const blogId = params.get('featured');
      if (blogId) {
        this.setFeaturedById(+blogId);
      }
    });
  }

  generateBubbles(): void {
    this.bubbles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 40 + 15,
      left: Math.random() * 100,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 4
    }));
  }

  featuredBlog: BlogPost | null = null;
  otherBlogs: BlogPost[] = [];
  
  tags: string[] = ['All'];
  pageSize = 6;

  loadBlogs(): void {
    // Replace with your actual service call
    // this.blogService.getBlogs().subscribe(blogs => {
    //   this.blogs = blogs;
    //   this.extractTags();
    //   this.updateDisplayedBlogs();
    // });
    
    // For now, after loading:
    this.extractTags();
    this.updateDisplayedBlogs();
  }

  extractTags(): void {
    const allTags = new Set<string>();
    this.blogs.forEach(blog => {
      blog.tags.forEach(tag => allTags.add(tag));
    });
    this.tags = ['All', ...Array.from(allTags)];
  }

  setFeaturedBySlug(slug: string): void {
    const blog = this.blogs.find(b => b.slug === slug);
    if (blog) {
      this.featuredBlog = blog;
      this.updateDisplayedBlogs();
    }
  }

  setFeaturedById(id: number): void {
    const blog = this.blogs.find(b => b.id === id);
    if (blog) {
      this.featuredBlog = blog;
      this.updateDisplayedBlogs();
    }
  }

  selectFeatured(blog: BlogPost): void {
    this.featuredBlog = blog;
    this.updateDisplayedBlogs();
    
    // Update URL without full navigation
    this.router.navigate(['/blog', blog.slug], { 
      replaceUrl: true,
      queryParamsHandling: 'preserve'
    });
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  clearFeatured(): void {
    this.featuredBlog = null;
    this.updateDisplayedBlogs();
    this.router.navigate(['/blog'], { replaceUrl: true });
  }

  updateDisplayedBlogs(): void {
  let filtered = this.blogs;

  // Apply tag filter
  if (this.selectedTag !== 'All') {
    filtered = filtered.filter(b => b.tags.includes(this.selectedTag));
  }

  // Remove featured blog from list
  if (this.featuredBlog) {
    filtered = filtered.filter(b => b.id !== this.featuredBlog!.id);
  }

  // ✅ LIMIT FOR HOME PAGE
  if (this.limitProducts && this.limitProducts > 0) {
    this.otherBlogs = filtered.slice(0, this.limitProducts);
    this.totalElements = this.otherBlogs.length;
    this.totalPages = 1;
    return;
  }

  // ✅ NORMAL PAGINATION (BLOG PAGE)
  this.totalElements = filtered.length;
  this.totalPages = Math.ceil(this.totalElements / this.pageSize);

  const start = this.page * this.pageSize;
  this.otherBlogs = filtered.slice(start, start + this.pageSize);
}


  onTagChange(): void {
    this.page = 0;
    // Check if featured blog still matches filter
    if (this.featuredBlog && this.selectedTag !== 'All') {
      if (!this.featuredBlog.tags.includes(this.selectedTag)) {
        this.featuredBlog = null;
      }
    }
    this.updateDisplayedBlogs();
  }

  // Pagination methods
  prevPage(): void {
    if (this.page > 0) {
      this.page--;
      this.updateDisplayedBlogs();
    }
  }

  nextPage(): void {
    if (this.page + 1 < this.totalPages) {
      this.page++;
      this.updateDisplayedBlogs();
    }
  }

  goToPage(p: number): void {
    this.page = p;
    this.updateDisplayedBlogs();
  }

  isLong(blog: BlogPost, length: number): boolean {
    return blog.content.length > length;
  }

blogs: BlogPost[] = [
  {
    id: 1,
    slug: "upload-images-to-cloudinary-spring-boot-angular",
    title: "How to Upload Images to Cloudinary Using Spring Boot and Angular",
    excerpt:
      "Learn how to upload and manage images efficiently using Cloudinary with a Spring Boot backend and Angular frontend.",
    content:
      "Uploading images is a common requirement in modern web applications. Cloudinary provides a powerful cloud-based solution for image storage, optimization, and delivery.\n\nIn this guide, we demonstrate how to integrate Cloudinary with a Spring Boot backend and an Angular frontend.\n\nBackend Configuration:\n\nStart by creating a Spring Boot application and adding the Cloudinary dependency. Configure your Cloudinary credentials securely using environment variables or application properties. Create a REST API endpoint to handle multipart file uploads and forward them to Cloudinary.\n\nAngular Frontend:\n\nOn the Angular side, create a file upload component using reactive forms. Use HttpClient to send multipart/form-data requests to the Spring Boot API. Display uploaded images instantly using the returned Cloudinary URL.\n\nBenefits:\n\n- Secure cloud-based image storage\n- Automatic image optimization\n- Scalable and fast content delivery\n\nBy following this approach, you can build a robust and production-ready image upload feature for your applications.",
    coverImage:"https://res.cloudinary.com/dc7gkgjja/image/upload/v1759476111/nsbl254xlv3gwtqjj1hc.svg",
    author: "Admin",
    createdDate: "2025-01-15T10:30:00Z",
    tags: ["cloudinary", "spring-boot", "angular", "file-upload"],
    category: "Backend & Frontend",
    linkedinLink: "https://linkedin.com"
  },
  {
    id: 2,
    slug: "websockets-spring-boot-angular",
    title: "Real-Time Communication with WebSockets Using Spring Boot and Angular",
    excerpt:
      "A practical guide to building real-time applications using WebSockets with Spring Boot and Angular.",
    content:
      "Real-time communication is essential for applications such as chats, notifications, and live dashboards. WebSockets provide a full-duplex communication channel between client and server.\n\nWebSockets in Spring Boot:\n\nSpring Boot offers built-in WebSocket support with STOMP over SockJS. Configure a WebSocket message broker, define endpoints, and handle messages using @MessageMapping.\n\nAngular Integration:\n\nIn Angular, use libraries such as @stomp/stompjs and sockjs-client to connect to the WebSocket endpoint. Subscribe to topics and update the UI dynamically when messages are received.\n\nUse Cases:\n\n- Live chat systems\n- Real-time notifications\n- Monitoring dashboards\n\nBy combining Spring Boot and Angular with WebSockets, you can deliver fast, interactive, and scalable real-time experiences.",
    coverImage:
      "https://res.cloudinary.com/dc7gkgjja/image/upload/v1759423678/oubamzheex2e9v5agcii.png",
    author: "Admin",
    createdDate: "2025-01-10T14:00:00Z",
    tags: ["websockets", "spring-boot", "angular", "real-time"],
    category: "Real-Time Systems",
    linkedinLink: "https://linkedin.com"
  },
  {
    id: 3,
    slug: "notify-lk-spring-boot-sms-notifications",
    title: "Sending SMS Notifications with Notify.lk and Spring Boot",
    excerpt:
      "Learn how to integrate Notify.lk with Spring Boot to send reliable local SMS notifications in Sri Lanka.",
    content:
      "SMS notifications are still one of the most reliable communication channels for alerts and confirmations. Notify.lk is a popular local SMS gateway in Sri Lanka.\n\nGetting Started:\n\nBegin by registering for a Notify.lk account and obtaining your API credentials. Create a Spring Boot service to send HTTP requests to the Notify.lk API.\n\nImplementation:\n\nUse RestTemplate or WebClient to send SMS messages programmatically. Encapsulate the logic inside a service layer to keep your code clean and reusable.\n\nCommon Use Cases:\n\n- OTP verification\n- Order confirmations\n- System alerts\n\nIntegrating Notify.lk with Spring Boot allows you to build cost-effective and reliable SMS notification systems tailored for local users.",
    coverImage:"https://res.cloudinary.com/dc7gkgjja/image/upload/v1759307424/v1h0mdfdrqtw5hxiresl.png"
      ,
    author: "Admin",
    createdDate: "2025-01-05T09:15:00Z",
    tags: ["notify-lk", "spring-boot", "sms", "notifications"],
    category: "Integrations",
    facebookLink: "https://facebook.com"
  }
];


}


