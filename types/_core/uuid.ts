type Uuid = string & {
  __uuid__: void;
};

export const newUuid = <ID extends Uuid>(): ID => {
  return (Date.now().toString(36) +
    Math.random().toString(36).substring(2)) as ID;
};

export default Uuid;
