import axios from "axios";
import { Move } from "../types/Move";
import { StackOfBags } from "../types/StackOfBags";

import * as dotenv from "dotenv";

dotenv.config();

export function round(moves: Move[], stackOfBags: StackOfBags) {
    axios
        .post(
            "https://datsanta.dats.team/api/round",
            {
                mapID: process.env.MAP_ID,
                moves,
                stackOfBags,
            },
            {
                headers: {
                    "X-API-Key": process.env.TOKEN,
                    "Content-Type": "application/json",
                    "Accept-Encoding": "*",
                },
            }
        )
        .then((result) => console.log(result.data))
        .catch((error) => console.error(error));
}
