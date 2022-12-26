import { round2 } from "./api/round2";
import { Phase2 } from "./core/Phase2";

const app = new Phase2();
app.run();
const order = app.build();
app.cleanup();

round2(order);
