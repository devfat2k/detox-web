import { useQuery } from "@tanstack/react-query";
import { getPlans, getPlanById } from "@/services/plans.service";
import { PLANS_DATA, type Plan } from "@/data/plans";

export const planQueryKeys = {
  all: ["plans"] as const,
  lists: () => [...planQueryKeys.all, "list"] as const,
  detail: (id: string) => [...planQueryKeys.all, "detail", id] as const,
};

export function usePlansQuery() {
  return useQuery<readonly Plan[], Error>({
    queryKey: planQueryKeys.lists(),
    queryFn: () => getPlans(),
    placeholderData: PLANS_DATA,
    staleTime: 5 * 60 * 1000,
  });
}

export function usePlanDetailQuery(id: string) {
  return useQuery<Plan | null, Error>({
    queryKey: planQueryKeys.detail(id),
    queryFn: () => getPlanById(id),
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
  });
}
