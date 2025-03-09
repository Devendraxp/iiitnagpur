import express from "express";
import Club from "../models/club.model.js";
import OrganizedEvent from "../models/organisedEvent.model.js";
const router = express.Router();

router.route("/").get((_, res) => {
    res.render("club/index.ejs");
});

    const renderClubRouteWithEvents = async (req, res, title, clubName) => {
        try {
            const club = await Club.findOne({ title });
            const events = await OrganizedEvent.find({ clubName });

            console.log(events, club)
            if (!club) return res.status(404).send("Club not found");
            res.render("club/club.ejs", { club, events });
        } catch (err) {
            res.status(500).send(err.message);
        }
    };

    router.route("/dotslash").get((req, res) =>
        renderClubRouteWithEvents(req, res, "DotSlash", "dotslash")
    );

    router.route("/elevate").get((req, res) =>
        renderClubRouteWithEvents(req, res, "Elevate", "elevate")
    );

    router.route("/strokes").get((req, res) =>
        renderClubRouteWithEvents(req, res, "Strokes", "strokes")
    );

    router.route("/iotics").get((req, res) =>
        renderClubRouteWithEvents(req, res, "Iotics", "iotics")
    );

    router.route("/dimensions").get((req, res) =>
        renderClubRouteWithEvents(req, res, "Dimensions", "dimensions")
    );

    router.route("/udyam").get((req, res) =>
        renderClubRouteWithEvents(req, res, "Udyam", "udyam")
    );

    router.route("/crispr").get((req, res) =>
        renderClubRouteWithEvents(req, res, "CRISPR", "crispr")
    );

    router.route("/crescendo").get((req, res) =>
        renderClubRouteWithEvents(req, res, "Crescendo", "crescendo")
    );

    router.route("/dtraxia").get((req, res) =>
        renderClubRouteWithEvents(req, res, "DTraxia", "dtraxia")
    );

    router.route("/estoria").get((req, res) =>
        renderClubRouteWithEvents(req, res, "Estoria", "estoria")
    );

    router.route("/orator").get((req, res) =>
        renderClubRouteWithEvents(req, res, "Orator", "orator")
    );

    router.route("/probe").get((req, res) =>
        renderClubRouteWithEvents(req, res, "Probe", "probe")
    );

    router.route("/eklavya").get((req, res) =>
        renderClubRouteWithEvents(req, res, "Eklavya", "eklavya")
    );

export default router;