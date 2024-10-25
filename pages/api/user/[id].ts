import type { NextApiRequest, NextApiResponse } from "next";
import type { ResponseUser } from "../../../interfaces";
import find from "lodash/find";
import { users } from "../users";

export default function userHandler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseUser>,
) {
  const { query, method } = req;
  const id = parseInt(query.id as string, 10);

  switch (method) {
    case "GET":
        const user = find(users, (userToFind) => userToFind.id === id);
        if (user) {
          const responseUser = {...user, friends: user.friends ? user.friends.map((friendId) => find(users, (friendToFind) => friendToFind.id === friendId)) : [] };
            res.status(200).json(responseUser);
        } else {
            res.status(404).end(`User with id ${id} not found`);
        }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
