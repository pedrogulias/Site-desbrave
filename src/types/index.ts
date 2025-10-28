export interface Route {
  id: string;
  name: string;
  mood: string[];
  distance: string;
  duration: string;
  difficulty: string;
  terrain: string;
  includes: string;
  notIncludes: string;
  nextDate: string;
  description: string;
  itinerary: string[];
  whatToBring: string[];
}

export interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  interest: string;
  city: string;
  lgpdConsent: boolean;
}

export interface CustomRouteData {
  experienceType: string;
  distance: string;
  pace: string;
  terrain: string;
  needBike: string;
  bikeType: string;
  needTransfer: string;
  groupLevel: string;
  participants: string;
  dateWindow: string;
  originCity: string;
  healthNotes: string;
  riskConsent: boolean;
  cancelConsent: boolean;
}

export interface FAQ {
  q: string;
  a: string;
}
