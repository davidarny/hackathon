import axios from "axios";

import * as dotenv from "dotenv";
import { Order } from "../types/phase-2/Order";

dotenv.config();

export function round2(order: Order) {
    axios
        .post(
            "https://datsanta.dats.team/api/round2",
            {
                mapID: process.env.MAP_ID,
                presentingGifts: order.presentingGifts,
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
