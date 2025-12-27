export interface ProjectDTO {
  id: string;
    title: string;
  category: string;
  description: string;
  technologies: string[];
  image: string; // can be URL or data URL
  mediaType?:'image' | 'video' | string | null;
  featured: boolean;
  createdDate: Date;
}