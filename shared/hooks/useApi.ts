import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, QueryClient } from '@tanstack/react-query';

interface ApiConfig {
  baseUrl: string;
  timeout?: number;
  headers?: Record<string, string>;
}

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
  metadata?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
    hasNext?: boolean;
    hasPrevious?: boolean;
  };
}

interface ApiError {
  success: false;
  error: string;
  message?: string;
  statusCode: number;
  timestamp: string;
  path?: string;
}

export const useApi = (config: ApiConfig) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2,
        retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
        staleTime: 5 * 60 * 1000, // 5 minutes
      },
    },
  });

  const makeRequest = useCallback(async (
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const url = `${config.baseUrl}${endpoint}`;
      const headers = {
        'Content-Type': 'application/json',
        ...config.headers,
        ...options.headers,
      };

      const response = await fetch(url, {
        ...options,
        headers,
        signal: AbortSignal.timeout(config.timeout || 10000),
      });

      const data = await response.json();

      if (!response.ok) {
        throw {
          success: false,
          error: data.error || 'Request failed',
          message: data.message,
          statusCode: response.status,
          timestamp: new Date().toISOString(),
          path: endpoint,
        } as ApiError;
      }

      return data;
    } catch (err: any) {
      const error = err as ApiError;
      setError(error.error || 'An unexpected error occurred');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [config]);

  // GET request hook
  const useGet = <T>(endpoint: string, enabled = true) =>
    useQuery<ApiResponse<T>, ApiError>({
      queryKey: [endpoint],
      queryFn: () => makeRequest(endpoint, { method: 'GET' }),
      enabled,
    });

  // POST mutation hook
  const usePost = <T, D = any>(endpoint: string) =>
    useMutation<ApiResponse<T>, ApiError, D>({
      mutationFn: (data) =>
        makeRequest(endpoint, {
          method: 'POST',
          body: JSON.stringify(data),
        }),
      onSuccess: () => {
        // Invalidate and refetch related queries
        queryClient.invalidateQueries({ queryKey: [endpoint] });
      },
    });

  // PUT mutation hook
  const usePut = <T, D = any>(endpoint: string) =>
    useMutation<ApiResponse<T>, ApiError, D>({
      mutationFn: (data) =>
        makeRequest(endpoint, {
          method: 'PUT',
          body: JSON.stringify(data),
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [endpoint] });
      },
    });

  // DELETE mutation hook
  const useDelete = <T>(endpoint: string) =>
    useMutation<ApiResponse<T>, ApiError, void>({
      mutationFn: () => makeRequest(endpoint, { method: 'DELETE' }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [endpoint] });
      },
    });

  // Manual request function
  const request = useCallback(
    (endpoint: string, options?: RequestInit) => makeRequest(endpoint, options),
    [makeRequest]
  );

  // Paginated request hook
  const usePaginated = <T>(
    endpoint: string,
    page: number = 1,
    limit: number = 10,
    filters: Record<string, any> = {}
  ) => {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...Object.entries(filters).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          acc[key] = String(value);
        }
        return acc;
      }, {} as Record<string, string>),
    });

    return useQuery<ApiResponse<T[]>, ApiError>({
      queryKey: [endpoint, page, limit, filters],
      queryFn: () => makeRequest(`${endpoint}?${queryParams}`, { method: 'GET' }),
    });
  };

  // Health check hook
  const useHealthCheck = () =>
    useQuery<ApiResponse<{ status: string }>, ApiError>({
      queryKey: ['health'],
      queryFn: () => makeRequest('/health', { method: 'GET' }),
      refetchInterval: 30000, // Check every 30 seconds
    });

  return {
    // State
    isLoading,
    error,
    
    // Query hooks
    useGet,
    usePaginated,
    useHealthCheck,
    
    // Mutation hooks
    usePost,
    usePut,
    useDelete,
    
    // Manual request
    request,
    
    // Query client for advanced usage
    queryClient,
    
    // Utilities
    clearError: () => setError(null),
    invalidateQueries: (queryKey: string[]) => queryClient.invalidateQueries({ queryKey }),
    prefetchQuery: (endpoint: string) => 
      queryClient.prefetchQuery({
        queryKey: [endpoint],
        queryFn: () => makeRequest(endpoint, { method: 'GET' }),
      }),
  };
};

export default useApi;
