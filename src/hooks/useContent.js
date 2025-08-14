import { useQuery } from "@tanstack/react-query";
import contentService from "../services/contentService";

// Hook for personal information
export const usePersonalInfo = () => {
  return useQuery({
    queryKey: ["personalInfo"],
    queryFn: () => contentService.getPersonalInfo(),
    staleTime: 1000 * 60 * 60, // 1 hour
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

// Hook for experiences
export const useExperiences = () => {
  return useQuery({
    queryKey: ["experiences"],
    queryFn: () => contentService.getExperiences(),
    staleTime: 1000 * 60 * 60, // 1 hour
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

// Hook for projects
export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => contentService.getProjects(),
    staleTime: 1000 * 60 * 60, // 1 hour
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

// Hook for research
export const useResearch = () => {
  return useQuery({
    queryKey: ["research"],
    queryFn: () => contentService.getResearch(),
    staleTime: 1000 * 60 * 60, // 1 hour
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

// Hook for tech stack
export const useTechStack = () => {
  return useQuery({
    queryKey: ["techStack"],
    queryFn: () => contentService.getTechStack(),
    staleTime: 1000 * 60 * 60, // 1 hour
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

// Hook for image URL
export const useImageUrl = (imagePath, options = {}) => {
  return contentService.getImageUrl(imagePath, options);
};