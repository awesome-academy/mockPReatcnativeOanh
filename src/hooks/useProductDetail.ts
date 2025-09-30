import { getPlantById } from '@/api/plant';
import { getPlantPotById } from '@/api/pot';
import { getToolById } from '@/api/tool';
import { PRODUCT_TYPE, ProductType } from '@/constants/product';
import { Plant, PlantPot, Tool } from '@/types/product';
import { useState, useEffect, useCallback, useRef } from 'react';

export function useProductDetail(
  id: string | number,
  type: ProductType,
) {
  const [detail, setDetail] = useState<Plant | PlantPot | Tool | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const controllerRef = useRef<AbortController | null>(null);

  const fetchDetail = useCallback(async () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      let data;
      switch (type) {
        case PRODUCT_TYPE.PLANT:
          data = await getPlantById(id, { signal: controller.signal });
          break;
        case PRODUCT_TYPE.TOOL:
          data = await getToolById(id, { signal: controller.signal });
          break;
        case PRODUCT_TYPE.PLANT_POT:
          data = await getPlantPotById(id, { signal: controller.signal });
          break;
        default:
          throw new Error('Invalid product type');
      }

      setDetail(data ?? null);
    } catch (e: any) {
      if (e.name !== 'CanceledError' && e.name !== 'AbortError') {
        setError(e.message || 'Failed to fetch detail');
      }
    } finally {
      setLoading(false);
    }
  }, [id, type]);

  useEffect(() => {
    if (!id || !type) return;
    fetchDetail();

    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [fetchDetail, id, type]);

  return { detail, loading, error, fetchDetail };
}
