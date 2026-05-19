"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type PromiseState<T> = {
    data: T | undefined;
    error: string | null;
    isLoading: boolean;
    refetch: () => Promise<void>;
};

type PromiseOptions<T> = {
    enabled?: boolean;
    deps?: React.DependencyList;
    onSuccess?: (data: T) => void;
    onError?: (error: string) => void;
};

function usePromise<T>(promiseFn: () => Promise<T>, options?: PromiseOptions<T>): PromiseState<T> {
    const { enabled = true, deps = [], onSuccess, onError } = options || {};

    const [data, setData] = useState<T>();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(enabled);

    const requestIdRef = useRef(0);

    const handleExecutePromise = useCallback(async () => {
        const currentRequestId = ++requestIdRef.current;

        try {
            setIsLoading(true);
            setError(null);
            setData(undefined);

            const result = await promiseFn();

            if (currentRequestId !== requestIdRef.current) {
                return;
            }

            setData(result);
            onSuccess?.(result);
        } catch (error) {
            if (currentRequestId !== requestIdRef.current) {
                return;
            }

            const errorMessage = error instanceof Error ? error.message : "Ocorreu um erro ao efetuar a requisição.";

            setError(errorMessage);
            onError?.(errorMessage);
        } finally {
            if (currentRequestId === requestIdRef.current) {
                setIsLoading(false);
            }
        }
    }, [onError, onSuccess, promiseFn]);

    useEffect(() => {
        if (!enabled) {
            return;
        }

        handleExecutePromise();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enabled, ...deps]);

    return {
        data,
        error,
        isLoading,
        refetch: handleExecutePromise,
    };
}

export default usePromise;
