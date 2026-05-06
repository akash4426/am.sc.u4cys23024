const { getDepots, getVehicles } = require("../services/api_service");
const selectBestTasks = require("./utils/knapsack");

const scheduleTasks = async (req, res) => {
  try {
    const depots = await getDepots();
    const vehicles = await getVehicles();

    const result = [];

    for (const depot of depots) {
      const best = selectBestTasks(
        vehicles,
        depot.MechanicHours
      );

      const totalImpact = best.reduce(
        (sum, t) => sum + t.Impact,
        0
      );

      result.push({
        depotId: depot.ID,
        totalImpact,
        selectedTasks: best
      });
    }

    res.json({
      success: true,
      data: result
    });

  } catch (err) {
    console.error("Scheduling error:", err.message);

    res.status(500).json({
      success: false,
      message: "Failed to schedule tasks"
    });
  }
};

module.exports = { scheduleTasks };