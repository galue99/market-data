import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import microfrontendLayout from "./microfrontend-layout.html";

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});

const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);

setTimeout(() => {
  layoutEngine.activate();
  start();
  // Activate the layout engine once the styleguide CSS is loaded

  /* let ele = document.getElementById("spinner");
  ele.classList.remove("spinner");

  let body = document.body;
  body.classList.add("spinner-body-transition");
  body.classList.remove("spinner-body");*/
}, 1000);
start();
