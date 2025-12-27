export interface ProjectRequestDto {
    title: string;
    category: string;
    description: string;
    technologies: string[];
    mediaType?:'image' | 'video' | string | null;
    featured: boolean;
}