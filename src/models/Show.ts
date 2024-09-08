export interface Show {
    show: any;
    cast: any;
    id:             number;
    image?: {
        medium: string;
      };
    name:           string;
    genres:         string[];
    rating:         {average?: number};
    summary?:        string;
  }

export interface Cast {
    id:     number;
    name:   string;
    image?: {
      medium: string;
    };
}