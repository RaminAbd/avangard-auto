import { StatisticsResponseItem } from './StatisticsResponseItem.model';
export class StatisticsResponse{
  items: StatisticsResponseItem[];
  hasPrevious: boolean;
  hasNext: boolean;
  totalItems: number;
  totalPages: number;
  currentPage: number;
}
