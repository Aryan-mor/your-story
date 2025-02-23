import type { UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'react';
import CObject from '@/utils/cObject';
import Uuid from '@/types/_core/uuid';

export type HookOptions = { enabled?: undefined | boolean };
export const defaultHookOptions: HookOptions = {
  enabled: true,
};

type Result = Record<any, any> & { id: Uuid };

type HOOK<
  HOOK_PARAMS,
  HOOK_OPTIONS extends HookOptions,
  RESULT_ITEM extends Result,
> = (
  params?: HOOK_PARAMS,
  options?: HOOK_OPTIONS,
) => Pick<UseQueryResult<RESULT_ITEM[]>, 'data' | 'isLoading'>;

const useObjectify = <
  HOOK_PARAMS,
  HOOK_OPTIONS extends HookOptions,
  RESULT_ITEM extends Result,
>(
  useHook: HOOK<HOOK_PARAMS, HOOK_OPTIONS, RESULT_ITEM>,
  params?: HOOK_PARAMS,
  options?: HOOK_OPTIONS,
) => {
  const { data: baseData, isLoading, isFetching } = useHook(params, options);
  const data = useMemo(() => {
    if (!baseData) return undefined;
    return CObject.objectifyWithId(baseData);
  }, [baseData]);
  return useMemo(
    () => ({
      data,
      isLoading,
      isFetching,
    }),
    [data, isLoading, isFetching],
  );
};

const objectifyHook = <
  HOOK_PARAMS,
  HOOK_OPTIONS extends HookOptions,
  RESULT_ITEM extends Result,
>(
  useHook: HOOK<HOOK_PARAMS, HOOK_OPTIONS, RESULT_ITEM>,
) => {
  return (params?: HOOK_PARAMS, options?: HOOK_OPTIONS) => {
    return useObjectify<HOOK_PARAMS, HOOK_OPTIONS, RESULT_ITEM>(
      useHook,
      params,
      options,
    );
  };
};

const getOneFromHook = <
  HOOK_PARAMS,
  HOOK_OPTIONS extends HookOptions,
  RESULT_ITEM extends Result,
  ID extends Uuid,
>(
  useHook: HOOK<HOOK_PARAMS, HOOK_OPTIONS, RESULT_ITEM>,
) => {
  return (
    params: HOOK_PARAMS & { id: null | undefined | ID },
    options?: HOOK_OPTIONS,
  ) => {
    const {
      data: baseData,
      isLoading,
      isFetching,
    } = useObjectify<HOOK_PARAMS, HOOK_OPTIONS, RESULT_ITEM>(
      useHook,
      params,
      options,
    );
    const data = useMemo<RESULT_ITEM | undefined>(
      () => (params.id ? baseData?.[params.id] : undefined),
      [baseData, params.id],
    );

    return useMemo(
      () => ({
        data,
        isLoading,
        isFetching,
      }),
      [data, isLoading, isFetching],
    );
  };
};

const ReactQueryHook = <
  HOOK_PARAMS,
  HOOK_OPTIONS extends HookOptions,
  RESULT_ITEM extends Result,
>(
  useHook: HOOK<HOOK_PARAMS, HOOK_OPTIONS, RESULT_ITEM>,
) => {
  return {
    use: useHook,
    useObjectify: objectifyHook(useHook),
    useOne: getOneFromHook(useHook),
  };
};

export default ReactQueryHook;
