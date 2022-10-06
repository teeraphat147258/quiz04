import { checkToken } from "../../backendLibs/checkToken";
import { readUsersDB } from "../../backendLibs/dbLib";

export default function summaryRoute(req, res) {
  if (req.method === "GET") {
    const user = checkToken(req);
    if (!user || !user.isAdmin) {
      return res.status(403).json({
        ok: false,
        message: "Permission denied",
      });
    }
    //check authentication
    //return res.status(403).json({ ok: false, message: "Permission denied" });
    const users = readUsersDB();
    let userCount = 0;
    let adminCount = 0;
    let totalMoney = 0;
    for (const us of users) {
      if (us.isAdmin) {
        adminCount++;
      } else {
        userCount++;
        if (us.money > 0) {
          totalMoney += us.money;
        }
      }
    }
    return res.json({ ok: true, userCount, adminCount, totalMoney });
    //compute DB summary
    //return response
  } else {
    return res.status(400).json({ ok: false, message: "Invalid HTTP Method" });
  }
}
