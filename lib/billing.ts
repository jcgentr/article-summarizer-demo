import { BillingCycleInfo } from "@/app/(protected)/types";

// summaries per month
export const SUMMARY_LIMITS = {
  free: 5,
  pro: 0,
} as const;

export function shouldResetBillingCycle(
  cycleStart: Date,
  now: Date
): BillingCycleInfo {
  const nextCycle = new Date(cycleStart);
  nextCycle.setMonth(nextCycle.getMonth() + 1);

  return {
    shouldReset: now >= nextCycle,
    nextBillingDate: nextCycle,
  };
}
