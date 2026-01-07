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
  aspect?: number;
  width_m?: number;
  height_m?: number;
}

export interface LikedPhoto {
  url: string;
  title: string;
  downloadUrl: string;
  id: string;
}
