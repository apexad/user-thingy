import type { NextApiRequest, NextApiResponse } from "next";
import type { User } from "../../interfaces";

// Fake users data
export const users: User[] = [
    {
        id: 1,
        name: "Alex Martin",
        location: "Milwaukee, WI",
        gender: "Male",
        friends: [2, 3, 4, 5, 6, 7]
    },
    {
        id: 2,
        name: "John Martin",
        location: "Phoenix, AZ",
        friends: [3, 4, 5, 6, 7]
    },
    {
        id: 3,
        name: "Maggie Martin",
        location: "Peoria, AZ",
        friends: [4, 5, 6, 7]
    },
    {
        id: 4,
        name: "Bernice Martin",
        location: "Chicago, IL",
        gender: "Female",
        friends: [5, 6, 7]
    },
    {
        id: 5,
        name: "Thomas Martin",
        location: "Milwaukee, WI",
        gender: "Male"
    },
    {
        id: 6,
        name: "Jocelyn Martin",
        location: "Chicago, IL",
        gender: "Female"
    },
    {
        id: 7,
        name: "Amee Martin",
        location: "Payson, AZ",
        gender: "Female"
    },
];

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<User[]>,
) {
  // Get data from your database
  res.status(200).json(users);
}
