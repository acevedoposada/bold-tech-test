import attempt from '@/shared/lib/attempt';
import { apiInstance } from '@/shared/lib/interceptors';
import { Transaction } from '@/shared/types/movements';
import { AxiosResponse } from 'axios';

export const fetchMovementsEffect = async () => {
  const [response, error] = await attempt<AxiosResponse<Transaction[]>>(
    apiInstance.get,
    '/api',
  );
  if (!response || error) {
    return {
      success: false,
      data: null,
    };
  }
  return {
    succes: true,
    data: response.data.sort((x, y) => y.createdAt - x.createdAt),
  };
};
