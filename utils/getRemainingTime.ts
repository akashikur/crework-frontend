export const getRemainingTime = (deadline: string | undefined): string => {
  if (!deadline) return "No deadline set";

  const now = new Date();
  const deadlineDate = new Date(deadline);
  const difference = deadlineDate.getTime() - now.getTime();

  if (difference <= 0) return "Deadline has passed";

  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours} hours and ${minutes} minutes remaining`;
};
