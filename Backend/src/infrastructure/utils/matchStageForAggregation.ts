export function getMatchStage(
  timeframe: string
): { $match: { createdAt: { $gte: Date; $lt: Date } } } | { $match: {} } {
  let matchStage:
    | { $match: { createdAt: { $gte: Date; $lt: Date } } }
    | { $match: {} };

  switch (timeframe) {
    case "daily":
      matchStage = {
        $match: {
          createdAt: {
            $gte: new Date(new Date().setHours(0, 0, 0, 0)),
            $lt: new Date(new Date().setHours(24, 0, 0, 0)),
          },
        },
      };
      break;
    case "weekly":
      const currentDate = new Date();
      const currentDay = currentDate.getDay();
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDay);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 7);
      console.log("Start of Week:", startOfWeek);
      console.log("End of Week:", endOfWeek);

      matchStage = {
        $match: {
          createdAt: {
            $gte: startOfWeek,
            $lt: endOfWeek,
          },
        },
      };
      break;
    case "monthly":
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      matchStage = {
        $match: {
          createdAt: {
            $gte: new Date(currentYear, currentMonth, 1),
            $lt: new Date(currentYear, currentMonth + 1, 1),
          },
        },
      };
      break;
    default:
      // Match all documents if no timeframe is specified
      matchStage = { $match: {} };
      break;
  }

  return matchStage;
}
