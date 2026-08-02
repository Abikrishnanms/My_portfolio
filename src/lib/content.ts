import profileData from '../../content/profile.json';
import socialsData from '../../content/socials.json';
import skillsData from '../../content/skills.json';
import projectsData from '../../content/projects.json';
import experienceData from '../../content/experience.json';
import educationData from '../../content/education.json';
import certificatesData from '../../content/certificates.json';
import resumesData from '../../content/resumes.json';

const contentMap: Record<string, any> = {
  profile: profileData,
  socials: socialsData,
  skills: skillsData,
  projects: projectsData,
  experience: experienceData,
  education: educationData,
  certificates: certificatesData,
  resumes: resumesData,
};

export function getContentData<T>(filename: string): T {
  return contentMap[filename] as T;
}
