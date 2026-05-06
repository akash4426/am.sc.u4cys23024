function selectbesttasks(tasks, hoursLimit) {
  const totaltasks = tasks.length;

  const dp = Array(totaltasks + 1)
    .fill(null)
    .map(() => Array(hoursLimit + 1).fill(0));

  for (let i = 1; i <= totaltasks; i++) {
    const { Duration, Impact } = tasks[i - 1];

    for (let h = 0; h <= hoursLimit; h++) {
      if (Duration <= h) {
        dp[i][h] = Math.max(
          dp[i - 1][h],
          Impact + dp[i - 1][h - Duration]
        );
      } else {
        dp[i][h] = dp[i - 1][h];
      }
    }
  }

  let h = hoursLimit;
  const chosen = [];

  for (let i = totaltasks; i > 0; i--) {
    if (dp[i][h] !== dp[i - 1][h]) {
      chosen.push(tasks[i - 1]);
      h -= tasks[i - 1].Duration;
    }
  }

  return chosen;
}

module.exports = selectBestTasks;