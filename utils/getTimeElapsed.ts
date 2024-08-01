export const getTimeElapsed = (date: string): string => {
  const now = new Date();
  const updateDate = new Date(date);
  const difference = now.getTime() - updateDate.getTime();

  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  if (hours > 0) {
    return `${hours} hours and ${minutes} minutes ago`;
  } else if (minutes > 0) {
    return `${minutes} minutes and ${seconds} seconds ago`;
  } else {
    return `${seconds} seconds ago`;
  }
};
