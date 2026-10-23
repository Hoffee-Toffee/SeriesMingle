// server/index.ts
import dotenv3 from "dotenv";

// server/server.ts
import express from "express";
import * as Path2 from "node:path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { dirname } from "path";
import fs2 from "fs";
import dotenv2 from "dotenv";

// server/routes/tmdb.ts
import { Router } from "express";
import fetch from "node-fetch";

// server/queueManager.ts
var QueueManager = class {
  constructor() {
    this.queue = [];
    this.processing = false;
    this.interval = null;
    this.maxPerTick = 5;
    this.tickMs = 100;
  }
  start() {
    if (!this.interval) {
      this.interval = setInterval(() => this.processQueue(), this.tickMs);
    }
  }
  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
  enqueue(fn, priority = "low") {
    return new Promise((resolve4, reject) => {
      this.queue.push({ fn, resolve: resolve4, reject, priority, enqueuedAt: Date.now() });
    });
  }
  processQueue() {
    if (this.processing)
      return;
    this.processing = true;
    try {
      this.queue.sort((a, b) => a.enqueuedAt - b.enqueuedAt);
      const highs = this.queue.filter((q) => q.priority === "high");
      const lows = this.queue.filter((q) => q.priority === "low");
      const toProcess = [];
      for (let i = 0; i < 4; i++) {
        if (highs.length)
          toProcess.push(highs.shift());
        else if (lows.length)
          toProcess.push(lows.shift());
      }
      if (lows.length)
        toProcess.push(lows.shift());
      else if (highs.length)
        toProcess.push(highs.shift());
      this.queue = this.queue.filter((q) => !toProcess.includes(q));
      toProcess.forEach((item) => {
        item.fn().then(item.resolve).catch(item.reject);
      });
    } finally {
      this.processing = false;
    }
  }
};
var queueManager = new QueueManager();
queueManager.start();
var queueManager_default = queueManager;

// server/routes/tmdb.ts
import dotenv from "dotenv";

// server/firebase.ts
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
var firebaseConfig = {
  apiKey: "AIzaSyA68z99T8toa5Hkd7TpocTHfuWU63pN3HI",
  authDomain: "series-mingle.firebaseapp.com",
  projectId: "series-mingle",
  storageBucket: "series-mingle.appspot.com",
  messagingSenderId: "823676525510",
  appId: "1:823676525510:web:653fcb2efeac7c78b930c7",
  measurementId: "G-92TJZLM50Z"
};
var app = initializeApp(firebaseConfig);
var firestore = getFirestore(app);
var auth = getAuth(app);

// server/routes/tmdb.ts
dotenv.config();
var router = Router();
var api = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.TMDB_API_KEY
  }
};
console.log(api);
router.get("/search", async (req, res) => {
  const url = "https://api.themoviedb.org/3/search/multi?language=en-US&query=" + req.query.q + "&page=1&include_adult=false";
  queueManager_default.enqueue(() => fetch(url, api).then((r) => r.json()), "high").then((results) => res.json(results)).catch(
    (error) => res.status(500).json({ message: "Something went wrong", error })
  );
});
router.get("/movie", async (req, res) => {
  const url = "https://api.themoviedb.org/3/movie/" + req.query.id + "?append_to_response=external_ids&language=en-US";
  queueManager_default.enqueue(
    () => fetch(url, api).then((r) => r.json()),
    "high"
  ).then(
    (movie) => res.json({
      id: movie.id,
      type: "movie",
      title: movie.title,
      year: (movie.release_date || "").split("-")[0],
      runtime: movie.runtime,
      overview: movie.overview,
      imdb_id: movie.external_ids.imdb_id
    })
  ).catch(
    (error) => res.status(500).json({ message: "Something went wrong", error })
  );
});
var tvImdbCache = /* @__PURE__ */ new Map();
router.get("/tv", async (req, res) => {
  const url = "https://api.themoviedb.org/3/tv/" + req.query.id + "?language=en-US";
  try {
    const show = await queueManager_default.enqueue(
      () => fetch(url, api).then((r) => r.json()),
      "high"
    );
    const numOfSeasons = show.number_of_seasons;
    let withRuntime = 0;
    const seasons = await Promise.all(
      Array(numOfSeasons).fill(null).map(async (_, season) => {
        const seasonUrl = `https://api.themoviedb.org/3/tv/${show.id}/season/${season + 1}?language=en-US`;
        const seasonData = await queueManager_default.enqueue(
          () => fetch(seasonUrl, api).then(
            (r) => r.json()
          ),
          "high"
        );
        const episodes = seasonData.episodes.map((episode) => ({
          id: episode.id,
          type: "episode",
          title: episode.name,
          runtime: episode.runtime,
          episode: episode.episode_number,
          overview: episode.overview,
          imdb_id: null,
          // placeholder
          still_path: episode.still_path,
          vote_average: episode.vote_average,
          vote_count: episode.vote_count
        }));
        return {
          season: seasonData.season_number,
          episodes
        };
      })
    );
    const coreData = {
      id: show.id,
      type: "tv",
      title: show.name,
      year: (show.first_air_date || "").split("-")[0],
      episode_run_time: Math.round(
        seasons.reduce(
          (grandTotal, season) => grandTotal + season.episodes.reduce((seasonTotal, episode) => {
            if ((episode.runtime || 0) > 0)
              withRuntime++;
            return seasonTotal + (episode.runtime || 0);
          }, 0),
          0
        ) / Math.max(withRuntime, 1)
      ),
      seasons,
      imdb_pending: true
    };
    res.json(coreData);
    (async () => {
      const imdbSeasons = await Promise.all(
        Array(numOfSeasons).fill(null).map(async (_, season) => {
          const seasonUrl = `https://api.themoviedb.org/3/tv/${show.id}/season/${season + 1}?language=en-US`;
          const seasonData = await queueManager_default.enqueue(
            () => fetch(seasonUrl, api).then(
              (r) => r.json()
            ),
            "low"
          );
          const episodes = await Promise.all(
            seasonData.episodes.map(async (episode) => {
              const idsUrl = `https://api.themoviedb.org/3/tv/${show.id}/season/${season + 1}/episode/${episode.episode_number}/external_ids`;
              const ids = await queueManager_default.enqueue(
                () => fetch(idsUrl, api).then(
                  (r) => r.json()
                ),
                "low"
              );
              return {
                id: episode.id,
                type: "episode",
                title: episode.name,
                runtime: episode.runtime,
                episode: episode.episode_number,
                overview: episode.overview,
                imdb_id: ids.imdb_id,
                still_path: episode.still_path,
                vote_average: episode.vote_average,
                vote_count: episode.vote_count
              };
            })
          );
          return {
            season: seasonData.season_number,
            episodes
          };
        })
      );
      console.log(
        "Updating Firestore with imdbSeasons:",
        JSON.stringify(imdbSeasons, null, 2)
      );
      tvImdbCache.set(String(show.id), {
        ...coreData,
        seasons: imdbSeasons,
        imdb_pending: false
      });
      try {
        const projectsCol = collection(firestore, "projects");
        const projectsSnap = await getDocs(projectsCol);
        for (const projectDoc of projectsSnap.docs) {
          const projectData = projectDoc.data();
          if (projectData && projectData.data && projectData.data.tv && projectData.data.tv[show.id]) {
            const tvData = projectData.data.tv;
            await updateDoc(doc(firestore, "projects", projectDoc.id), {
              [`data.tv.${show.id}.seasons`]: imdbSeasons,
              [`data.tv.${show.id}.imdb_pending`]: false
            });
          }
        }
      } catch (err) {
        console.error("Failed to update Firestore with IMDB data:", err);
      }
    })();
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
});
router.get("/tv/imdb", (req, res) => {
  const id = String(req.query.id);
  if (tvImdbCache.has(id)) {
    res.json(tvImdbCache.get(id));
  } else {
    res.status(404).json({ message: "No IMDB data available yet." });
  }
});
var tmdb_default = router;

// server/routes/projects.ts
import { Router as Router2 } from "express";
var router2 = Router2();
router2.get("/user/:user", async (req, res) => {
  const user = req.params.user;
  const projectQuery = collection(firestore, "projects");
  const querySnapshot = await getDocs(projectQuery);
  const projectArr = [];
  querySnapshot.forEach((doc2) => {
    const data = doc2.data();
    if (data.user === user) {
      projectArr.push({
        id: doc2.id,
        ...data,
        state: data.state && typeof data.state === "string" ? JSON.parse(data.state) : void 0
      });
    }
  });
  res.send(projectArr);
});
router2.post("/create", async (req, res) => {
  const data = await req.body;
  const userId = data.user;
  const newProjectRef = await addDoc(collection(firestore, "projects"), {
    user: userId,
    lastModified: (/* @__PURE__ */ new Date()).getTime()
  });
  res.send({ id: newProjectRef.id });
});
router2.get("/:id", async (req, res) => {
  const id = req.params.id;
  const projectRef = doc(firestore, "projects", id);
  const querySnapshot = await getDoc(projectRef);
  let projectData = null;
  if (querySnapshot.exists()) {
    const data = querySnapshot.data();
    projectData = {
      ...data,
      state: data.state ? JSON.parse(data.state) : void 0
    };
  }
  res.send(projectData);
});
router2.post("/", async (req, res) => {
  const projectData = await req.body;
  const props = projectData.props;
  const toUpdate = props.reduce(
    (obj, prop) => ({ ...obj, [prop]: projectData[prop] }),
    {
      lastModified: (/* @__PURE__ */ new Date()).getTime()
    }
  );
  if (!projectData || !projectData.id) {
    return res.status(400);
  }
  try {
    const projectRef = doc(firestore, "projects", projectData.id);
    if (projectData.state) {
      await setDoc(projectRef, {
        ...projectData,
        state: null,
        lastModified: (/* @__PURE__ */ new Date()).getTime()
      });
    } else {
      await updateDoc(projectRef, toUpdate);
    }
    res.send("Project updated successfully");
  } catch (error) {
    console.error("Error setting document: ", error);
    res.status(500).send("Error setting project data");
  }
});
router2.get("/delete/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400);
  }
  try {
    const projectRef = doc(firestore, "projects", id);
    await deleteDoc(projectRef);
    res.send("Project deleted successfully");
  } catch (error) {
    console.error("Error deleting document: ", error);
    res.status(500).send("Error deleting project data");
  }
});
router2.post("/clone", async (req, res) => {
  const data = await req.body;
  const id = data.id;
  if (!id) {
    return res.status(400);
  }
  try {
    const projectRef = doc(firestore, "projects", id);
    const projectSnapshot = await getDoc(projectRef);
    if (projectSnapshot.exists()) {
      const projectData = projectSnapshot.data();
      const newProjectRef = await addDoc(collection(firestore, "projects"), {
        ...projectData,
        title: `Clone of '${projectData.title || "Untitled Schedule"}'`,
        user: data.user
      });
      res.send({ id: newProjectRef.id });
    } else {
      res.status(404).send("Project does not exist");
    }
  } catch (error) {
    console.error("Error cloning document: ", error);
    res.status(500).send("Error cloning project data");
  }
});
var projects_default = router2;

// server/eastereggs/decrypt.ts
import cryptoPKG from "crypto";
import fs from "fs";
import * as Path from "node:path";
import { fileURLToPath } from "url";
import { join } from "node:path";
import { config } from "dotenv";
config();
var __filename = fileURLToPath(import.meta.url);
var __dirname = join(
  __filename,
  "../".repeat(process.env.NODE_ENV === "production" ? 2 : 3) + "server/eastereggs"
);
function decrypt(passphrase = "test123") {
  const encodedFiles = fs.readdirSync(Path.resolve(__dirname));
  for (const file of encodedFiles) {
    if (file.endsWith(".txt")) {
      console.log(`Trying to decrypt ${file}...`);
      try {
        return decryptFile(file.split(".")[0], passphrase);
      } catch (e) {
        continue;
      }
    }
  }
  return null;
}
function decryptFile(componentName = "test", passphrase = "test123") {
  const encodedFile = Path.resolve(__dirname, `${componentName}.txt`);
  const data = fs.readFileSync(encodedFile, "utf8");
  const [ivHex, encrypted] = data.split(":::");
  const iv = Buffer.from(ivHex, "hex");
  const key = cryptoPKG.scryptSync(passphrase, "salt", 32);
  const decipher = cryptoPKG.createDecipheriv("aes-256-ctr", key, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  if (!decrypted.startsWith(`// Code: ${componentName}`)) {
    throw new Error("Invalid passphrase");
  }
  return decrypted;
}

// server/server.ts
var __dirname2 = dirname(fileURLToPath2(import.meta.url));
dotenv2.config();
var server = express();
server.use(express.json({ limit: "50mb" }));
server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use("/api/v1", tmdb_default);
server.use("/api/v1/projects", projects_default);
server.get("/api/v1/secret", (req, res) => {
  if (typeof req.query.passphrase !== "string") {
    return res.status(400).send("Invalid passphrase");
  }
  const decryption = decrypt(req.query.passphrase);
  console.log(decryption);
  res.send(decryption);
});
if (process.env.NODE_ENV === "production") {
  server.use(express.static(Path2.resolve("public")));
  server.use("/assets", express.static(Path2.resolve(__dirname2, "assets")));
  server.use(
    "/icons/:icon",
    (req, res) => ["512.png", "192.png"].includes(req.params.icon) && res.sendFile(Path2.resolve(__dirname2, "icons", req.params.icon))
  );
  [
    "favicon.ico",
    "manifest.json",
    "robots.txt",
    "service-worker.js",
    "sitemap.xml"
  ].forEach(
    (file) => server.get(
      `/${file}`,
      (_, res) => res.sendFile(Path2.resolve(__dirname2, file))
    )
  );
  server.get("*", (req, res) => {
    const index = fs2.readFileSync(
      Path2.resolve(__dirname2, "index.html"),
      "utf-8"
    );
    const page = req.url.split("/")[1].toLowerCase();
    const data = {
      title: "SeriesMingle",
      description: "Create your own TV and movie schedules with SeriesMingle.",
      long_description: "Create your own watch schedules for shows and movies! Define layers of shows and movies, with each layer watched in order, but all layers watched simultaneously. Select start and end points for shows, so you can watch only the range you want. Bookmark your progress, seeing statistics on your progress. Add custom entries such as books or activities to your schedule. Share and create schedules with friends. And much more with SeriesMingle!",
      url: "https://seriesmingle.com",
      image: "https://repository-images.githubusercontent.com/792981103/55633c4f-81a0-407d-99a2-baa5621836a0"
      // app: `<div id="${page || 'home'}">${ReactDOMServer.renderToString(Outlet({}))}</div>`,
    };
    if (["login", "dashboard", "project"].includes(page)) {
      data.title = `${page.charAt(0).toUpperCase()}${page.slice(1)} | ${data.title}`;
      if (page === "project") {
        data.description = "Check out my TV and movie schedule on SeriesMingle!";
      }
    }
    const html = Object.entries(data).reduce(
      (acc, [key, value]) => acc.replace(new RegExp(`%${key.toUpperCase()}%`, "g"), value),
      index
    );
    res.contentType("text/html");
    res.send(html);
  });
}
var server_default = server;

// server/index.ts
import fs3 from "fs";
import { dirname as dirname2 } from "path";
import { fileURLToPath as fileURLToPath3 } from "url";
import * as Path3 from "node:path";
dotenv3.config();
var __dirname3 = Path3.join(dirname2(fileURLToPath3(import.meta.url)), "..");
[
  "favicon.ico",
  "manifest.json",
  "robots.txt",
  "service-worker.js",
  "sitemap.xml"
].forEach(
  (file) => fs3.copyFileSync(
    Path3.resolve(__dirname3, file),
    Path3.resolve(__dirname3, "dist", file)
  )
);
fs3.mkdirSync(Path3.resolve(__dirname3, "dist", "icons"), { recursive: true });
["512.png", "192.png"].forEach(
  (file) => fs3.copyFileSync(
    Path3.resolve(__dirname3, "icons", file),
    Path3.resolve(__dirname3, "dist/icons", file)
  )
);
var PORT = process.env.PORT || 3e3;
server_default.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
var server_default2 = server_default;
export {
  server_default2 as default
};
