import { Router, type IRouter } from "express";

const router: IRouter = Router();

const HUDSON_ROCK_BASE = "https://www.hudsonrock.com/api/json/v2/stats/website-results";
const CLEARBIT_BASE = "https://autocomplete.clearbit.com/v1/companies";

async function proxyGet(url: string): Promise<{ data: unknown; status: number }> {
  const res = await fetch(url, {
    headers: {
      "Accept": "application/json",
      "User-Agent": "CTI-Demo/1.0",
    },
  });
  const data = await res.json();
  return { data, status: res.status };
}

router.get("/search/suggestions", async (req, res) => {
  const { query } = req.query;
  if (!query || typeof query !== "string") {
    res.status(400).json({ error: "query parameter is required" });
    return;
  }
  try {
    const { data, status } = await proxyGet(
      `${CLEARBIT_BASE}/suggest?query=${encodeURIComponent(query)}`
    );
    res.status(status).json(data);
  } catch (err) {
    console.error("Error fetching suggestions:", err);
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
});

router.get("/domain/:domain/counts", async (req, res) => {
  const { domain } = req.params;
  try {
    const { data, status } = await proxyGet(`${HUDSON_ROCK_BASE}/counts/${domain}`);
    res.status(status).json(data);
  } catch (err) {
    console.error("Error fetching counts:", err);
    res.status(500).json({ error: "Failed to fetch counts" });
  }
});

router.get("/domain/:domain/urls", async (req, res) => {
  const { domain } = req.params;
  try {
    const { data, status } = await proxyGet(`${HUDSON_ROCK_BASE}/urls/${domain}`);
    res.status(status).json(data);
  } catch (err) {
    console.error("Error fetching URLs:", err);
    res.status(500).json({ error: "Failed to fetch URLs" });
  }
});

router.get("/domain/:domain/applications", async (req, res) => {
  const { domain } = req.params;
  try {
    const { data, status } = await proxyGet(`${HUDSON_ROCK_BASE}/applications/${domain}`);
    res.status(status).json(data);
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

router.get("/domain/:domain/passwords", async (req, res) => {
  const { domain } = req.params;
  try {
    const { data, status } = await proxyGet(`${HUDSON_ROCK_BASE}/passwords/${domain}`);
    res.status(status).json(data);
  } catch (err) {
    console.error("Error fetching passwords:", err);
    res.status(500).json({ error: "Failed to fetch passwords" });
  }
});

router.get("/domain/:domain/stealer-families", async (req, res) => {
  const { domain } = req.params;
  try {
    const { data, status } = await proxyGet(`${HUDSON_ROCK_BASE}/stealer-families/${domain}`);
    res.status(status).json(data);
  } catch (err) {
    console.error("Error fetching stealer families:", err);
    res.status(500).json({ error: "Failed to fetch stealer families" });
  }
});

router.get("/domain/:domain/antiviruses", async (req, res) => {
  const { domain } = req.params;
  try {
    const { data, status } = await proxyGet(`${HUDSON_ROCK_BASE}/antiviruses/${domain}`);
    res.status(status).json(data);
  } catch (err) {
    console.error("Error fetching antiviruses:", err);
    res.status(500).json({ error: "Failed to fetch antiviruses" });
  }
});

export default router;
