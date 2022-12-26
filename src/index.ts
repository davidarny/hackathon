import { round2 } from "./api/round2";
import { Phase2 } from "./core/Phase2";

const main = () => {
    const app = new Phase2();
    app.run();
    const order = app.build();
    app.cleanup();

    round2(order);
};

main();

setInterval(() => main(), 6 * 60 * 1000); // every 6 minutes
