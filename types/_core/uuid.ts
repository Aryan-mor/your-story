type Uuid = string & {
  __uuid__: void;
};

export const newUuid = (): Uuid => {
  return (Date.now().toString(36) +
    Math.random().toString(36).substring(2)) as Uuid;
};

export default Uuid;
