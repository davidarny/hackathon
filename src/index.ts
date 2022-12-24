import { round } from "./api/round";
import { App } from "./lib/app";

const app = new App();

app.run();

const route = app.getRoute();

app.cleanup();

round(route.moves, route.stackOfBags);
