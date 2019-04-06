import {Video} from '../../components/VideoCard';

export interface SuccessResponse {
  Response: string;
  Search: Video[];
  totalResults: string;
}

export interface FailResponse {
  Response: string;
  Error: string;
}

export type ApiResponse = SuccessResponse | FailResponse | null;