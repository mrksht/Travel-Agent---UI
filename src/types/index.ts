export interface TripFormData {
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: string;
  interests: string[];
  additionalInfo: string;
}

export interface ResponseItem {
  id: string;
  query: string;
  response: string;
  timestamp: Date;
  isLoading?: boolean;
}