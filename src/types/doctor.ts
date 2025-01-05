export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  languages: string[];
  availability: string;
  consultationFee: number;
  image?: string;
  rating?: number;
  reviews?: number;
  location?: string;
  qualifications?: string[];
}
