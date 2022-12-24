import axios from "axios";
import { MAP_ID, TOKEN } from "../constants/config";
import { Move } from "../types/Move";
import { StackOfBags } from "../types/StackOfBags";

export function round(moves: Move[], stackOfBags: StackOfBags) {
    axios
        .post(
            "https://datsanta.dats.team/api/round",
            {
                mapID: MAP_ID,
                moves,
                stackOfBags,
            },
            {
                headers: {
                    "X-API-Key": TOKEN,
                    "Content-Type": "application/json",
                    "Accept-Encoding": "*",
                },
            }
        )
        .then((result) => console.log(result.data))
        .catch((error) => console.error(error));
}
