

export interface SignupPayload {
    email: string;
    password: string;
  }
  
export interface SignupResponse {
    [x: string]: any;
    data: {
      user: any;
      message: string;
    };
  }

export  interface User {
    // Define the properties of your User object here
    id: string;
    email: string;
  }

export interface DecodedUser {
    _id: string;
}

export interface Expert {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  nationality: string;
  academic_qualifications: string[];
  professional_affiliation: string;
  specialization: string[];
  geographic_specialization: string[];
  spoken_languages: string[];
  social_media_profiles: string[];
  docUpload: string[];
  year_of_experience: number;
  status: string;
  verified: boolean;
  terms_condition: boolean;
  total_scholarship: number;
  createdAt: string;
  application_status_count: {
    completed: number;
    processed: number;
    pending: number;
    canceled: number;
  };
  ratingsCategories: {
    five: object;
    four: object;
    three: object;
    two: object;
    one: object;
  };
  ratingsCount: number;
}

export interface ProfileState {
  profile: any;
  isLoading: boolean;
  expertId: string | null;
  wallet: Wallet | null;
  applications: PaymentVerification[];
}

export interface Wallet {
  balance: number;
  transactions: any[];
  userId: string;
  _id: string;
}

interface Scholar {
  // Define the expected properties for the scholar object
  [key: string]: any; // Adjust based on actual properties
}

interface Scholarship {
  title: string;
  application_fee: number;
}

export interface PaymentVerification {
  _id: string;
  createdAt: string; 
  scholar: Scholar;
  scholarship: Scholarship;
  status: string;
}