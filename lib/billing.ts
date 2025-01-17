// summaries per month
export const SUMMARY_LIMITS = {
  free: 15,
  pro: 100,
} as const;

export type PlanType = keyof typeof SUMMARY_LIMITS;

interface BillingCycleInfo {
  shouldReset: boolean;
  nextBillingDate: Date | null;
}

export function shouldResetBillingCycle(
  cycleStart: Date,
  now: Date
): BillingCycleInfo {
  const nextCycle = new Date(cycleStart);
  nextCycle.setMonth(nextCycle.getMonth() + 1);

  return {
    shouldReset: now >= nextCycle,
    nextBillingDate: now >= nextCycle ? nextCycle : null,
  };
}
