import axios from "axios";
import { Move } from "../types/Move";
import { StackOfBags } from "../types/StackOfBags";

export function round(moves: Move[], stackOfBags: StackOfBags) {
    axios
        .post(
            "https://datsanta.dats.team/api/round",
            {
                mapID: import.meta.env.MAP_ID,
                moves,
                stackOfBags,
            },
            {
                headers: {
                    "X-API-Key": import.meta.env.TOKEN,
                    "Content-Type": "application/json",
                    "Accept-Encoding": "*",
                },
            }
        )
        .then((result) => console.log(result.data))
        .catch((error) => console.error(error));
}
