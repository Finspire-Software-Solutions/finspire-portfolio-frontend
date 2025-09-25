import { Component, OnInit } from '@angular/core';
import { ProjectService, Project } from '../../services/project.service';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Component({
  selector: 'app-our-works',
  templateUrl: './our-works.component.html',
  styleUrls: ['./our-works.component.scss']
})
export class OurWorksComponent implements OnInit {

  works: Project[] = [];
  categories: string[] = [];
  selectedCategory = 'All';

  // Modal state
  showWorkModal = false;
  activeWork: Project | null = null;

  constructor(private projectService: ProjectService,private toast: ToastService) { }

  ngOnInit(): void {
    this.loadWorks();
    this.loadCategories();
  }

  loadWorks(): void {
    this.projectService.getProjects().subscribe({
      next: (resp) => {
        this.works = resp.content;
        console.log('works loaded', this.works);
      },
      error: (err) => {
        console.error('Failed to load works', err);
        this.toast.error('Failed to load works');
      }
    });
  }

  loadCategories(): void {
    const projectCats = Array.from(new Set(this.works.map(p => p.category).filter(Boolean)));
    const merged = Array.from(new Set([
      ...projectCats
    ]));
    this.categories = ['All', ...merged];
  }

  filterWorks(category: string) {
    this.selectedCategory = category;
  }

  get filteredWorks() {
    if (this.selectedCategory === 'All') {
      return this.works;
    }
    return this.works.filter(work => work.category === this.selectedCategory);
  }

  openWork(work: Project) {
    this.activeWork = work;
    this.showWorkModal = true;
  }

  closeWorkModal() {
    this.showWorkModal = false;
    this.activeWork = null;
  }

  // Safe description length check for template
  isLongDescription(work: Project, limit = 140): boolean {
    const len = (work && (work as any).description) ? String((work as any).description).length : 0;
    return len > limit;
  }

}
