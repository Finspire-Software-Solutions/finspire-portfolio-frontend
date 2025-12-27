import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { Work, WorksService } from 'src/app/services/works.service';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Component({
  selector: 'app-our-works',
  templateUrl: './our-works.component.html',
  styleUrls: ['./our-works.component.scss']
})
export class OurWorksComponent implements OnInit {

  works: Work[] = [];
  featuredWork: Work | null = null;
  thumbnails: Work[] = [];
  isLoading = true;
  isMobile = false;
  activeCategory: string = 'all';

  private categoryCounts = new Map<string, number>();

  constructor(
    private worksService: WorksService,
    private route: ActivatedRoute,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {
    this.checkMobile();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const featuredId = params['featured'] ? parseInt(params['featured']) : 0;
      this.loadWorks(featuredId);
    });
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkMobile();
  }

  checkMobile(): void {
    this.isMobile = window.innerWidth < 768;
  }

  setFeaturedWork(workId: number): void {
    const work = this.works.find(w => w.id === workId);
    if (work) {
      this.featuredWork = work;
    } else if (this.works.length > 0) {
      this.featuredWork = this.works[0];
    }
  }

  filterThumbnails(): void {
    if (!this.featuredWork) {
      this.thumbnails = [...this.works];
      return;
    }
    
    this.thumbnails = this.works.filter(work => 
      work.id !== this.featuredWork!.id && 
      (this.activeCategory === 'all' || work.category === this.activeCategory)
    );
  }

  selectWork(work: Work): void {
    if (this.featuredWork?.id === work.id) return;
    
    // Move current featured to thumbnails
    if (this.featuredWork) {
      this.thumbnails = this.thumbnails.filter(w => w.id !== work.id);
      this.thumbnails.unshift(this.featuredWork);
    }
    
    // Set new featured
    this.featuredWork = work;
    
    // Update URL
    this.updateUrl(work.id);
    
    // Smooth scroll to top on mobile
    if (this.isMobile) {
      setTimeout(() => {
        this.viewportScroller.scrollToPosition([0, 0]);
      }, 100);
    }
  }

  updateUrl(workId: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { featured: workId },
      queryParamsHandling: 'merge'
    });
  }

  setCategory(category: string): void {
    this.activeCategory = category;
    this.filterThumbnails();
  }

  navigateBack(): void {
    this.router.navigate(['/']);
  }



  loadWorks(featuredId?: number): void {
    this.isLoading = true;
    
    this.worksService.getAllWorks().subscribe({
      next: (works) => {
        this.works = works;
        this.calculateCategoryCounts();
        this.setFeaturedWork(featuredId || works[0]?.id);
        this.filterThumbnails();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading works:', error);
        this.isLoading = false;
      }
    });
  }

  // Cache category counts for better performance
  private calculateCategoryCounts(): void {
    this.categoryCounts.clear();
    
    // Initialize with 'all'
    this.categoryCounts.set('all', this.works.length);
    
    // Count each category
    this.works.forEach(work => {
      this.categoryCounts.set(
        work.category, 
        (this.categoryCounts.get(work.category) || 0) + 1
      );
    });
  }

  // Fast lookup from cache
  getCategoryCount(category: string): number {
    return this.categoryCounts.get(category) || 0;
  }

  // Get categories with cached counts
  getCategories(): Array<{name: string, count: number}> {
    return Array.from(this.categoryCounts.entries()).map(([name, count]) => ({
      name,
      count
    }));
  }

  // Get just category names
  getCategoryList(): string[] {
    return Array.from(this.categoryCounts.keys());
  }
}
