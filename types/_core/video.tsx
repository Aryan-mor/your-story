import Uuid from './uuid';

export type VideoSrc = Uuid & {
  __ImageSrc__: void;
};

type VideoData = {
  public_id: string;
  secure_url: VideoSrc;
};

export default VideoData;
