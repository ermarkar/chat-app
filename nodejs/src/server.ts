import { Giuseppe } from "giuseppe";
import { GiuseppeReqResPlugin } from "giuseppe-reqres-plugin";

import * as bodyparser from "body-parser";
import express = require("express");
import nodeEnvFile = require("node-env-file");
import timeout = require("connect-timeout");

export class Server {

    static startServer() {
        // Load configuration file
        nodeEnvFile("./.env");

        const giusi = new Giuseppe();
        const expressApp = giusi.expressApp;
        expressApp.use(bodyparser.json());
        expressApp.use(bodyparser.urlencoded({ extended: true }));

        // static files
        expressApp.use(express.static("public"));
        expressApp.use(timeout("120000"));

        /* Middleware wrapper to filter specific URL path */
        const unless = function (path, middleware) {
            return function (req, res, next) {
                if (req.path.startsWith(path)) {
                    return next();
                } else {
                    return middleware(req, res, next);
                }
            };
        };

        giusi.expressApp.use(unless("/api", (req, res) => {
            console.log("Path : ", req.path);
            res.sendFile(process.cwd() + "/public/index.html");
        }));

        giusi.registerPlugin(new GiuseppeReqResPlugin());

        console.log(`Loading controllers from folder:  ${process.env.API_FOLDER}`);
        giusi.loadControllers(`./dist/${process.env.API_FOLDER}/**/*.js`)
            .then(() => {
                giusi.start(+process.env.PORT, "/api");
                console.log(`Server running on port ${process.env.PORT}.`);
            });
    }
}

Server.startServer();
