export interface IPlayerProps {
  id: number;
  name: string;
  level: number;
}

export interface IFetchPlayerRequest {
  data: IPlayerProps[];
  isLoading: boolean;
}
