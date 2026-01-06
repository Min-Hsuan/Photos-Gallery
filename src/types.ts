export interface Photo {
  id: string;
  owner: string;
  secret: string;
  server: string;
  farm: number;
  title: string;
  ispublic: number;
  isfriend: number;
  isfamily: number;
}

export interface PhotoCard{
    url: string;
    title: string;
    downloadUrl: string;
    id: string;
    onOpen: ()=> void
}