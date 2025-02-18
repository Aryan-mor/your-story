import Uuid from './uuid';

export type ImageSrc = Uuid & {
  __ImageSrc__: void;
};

type ImageData = {
  public_id: string;
  secure_url: ImageSrc;
};

export default ImageData;
