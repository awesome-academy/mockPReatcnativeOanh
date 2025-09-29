import { getTutorialById } from '@/api/setting';
import { Tutorial } from '@/types/setting';
import { useState, useEffect, useCallback } from 'react';

export function useTutorialDetail(id: string | number) {
  const [detail, setDetail] = useState<Tutorial | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getTutorialById(id);
      setDetail(data);
    } catch (e) {
      setError('Failed to fetch detail');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail, id]);

  return { detail, loading, error, fetchDetail };
}
