import type { FieldValues } from 'react-hook-form';

export const removeIdFromFormData = <FORM extends FieldValues>(
  rawWatchAll: FORM,
): FORM => {
  function removeId(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map(removeId);
    } else if (obj !== null && typeof obj === 'object') {
      const newObj: { [key: string]: any } = {};
      Object.keys(obj).forEach((key) => {
        if (key !== 'id') {
          newObj[key] = removeId(obj[key]);
        }
      });
      return newObj;
    } else {
      return obj;
    }
  }

  return removeId({ ...rawWatchAll }) as FORM;
};

export const descriptionLimit = 1000;
