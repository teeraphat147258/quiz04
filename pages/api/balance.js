import { checkToken } from "../../backendLibs/checkToken";
import { readUsersDB } from "../../backendLibs/dbLib";

export default function balanceRoute(req, res) {
  if (req.method === "GET") {
    //check authentication
    const user = checkToken(req);
    if (!user || user.isAdmin) {
      return res.status(403).json({
        ok: false,
        message: "You do not have permission to create account",
      });
    }

    const users = readUsersDB();

    const foundUser = users.find((x) => x.username === user.username);

    //find user in DB and get their money value
    if (foundUser) return res.json({ ok: true, money: foundUser.money });

    //return response
  } else {
    return res.status(400).json({ ok: false, message: "Invalid HTTP Method" });
  }
}
