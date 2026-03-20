import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import {
  Shield,
  Search,
  Lock,
  Database,
  Globe,
  AlertTriangle,
  Eye,
  Wifi,
  Users,
  Building2,
  Landmark,
  Zap,
  BriefcaseBusiness,
} from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero */}
      <section className="container mx-auto px-4 pt-28 pb-20 text-center max-w-5xl">
        <motion.div
          {...fadeUp(0)}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          Operated by the International Cybersecurity Community for Africa (ICCA)
        </motion.div>

        <motion.h1
          {...fadeUp(0.1)}
          className="text-5xl md:text-7xl font-display font-bold text-foreground mb-6 tracking-tight leading-tight"
        >
          Africa's Infostealer{" "}
          <span className="text-primary">Threat Intelligence</span> Platform
        </motion.h1>

        <motion.p
          {...fadeUp(0.2)}
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed"
        >
          UMURINZI CTI continuously monitors infostealer ecosystems across Africa — collecting,
          analyzing, and alerting on stolen credentials and session data before attackers can
          weaponize them against your organization.
        </motion.p>

        <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-4 justify-center">
          <Link href="/search">
            <Button size="lg" className="h-14 px-8 text-base rounded-xl shadow-sm">
              <Search className="w-5 h-5 mr-2" />
              Search a Domain
            </Button>
          </Link>
          <a href="#sectors">
            <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-xl">
              View Threat Landscape
            </Button>
          </a>
        </motion.div>
      </section>

      {/* Key Stats */}
      <section className="bg-primary text-primary-foreground py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
            {[
              { value: "20M+", label: "Compromised Records" },
              { value: "54", label: "African Countries Monitored" },
              { value: "5", label: "Active Stealer Families" },
              { value: "24/7", label: "Dark Web Monitoring" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-display font-bold mb-1">{stat.value}</div>
                <div className="text-primary-foreground/70 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Targeted Sectors */}
      <section id="sectors" className="container mx-auto px-4 py-20 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Targeted Sectors in Africa
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Infostealer campaigns are not random — threat actors specifically filter for
            high-value African organizations across the following sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <SectorCard
            icon={Landmark}
            title="Financial Institutions"
            pct="38%"
            color="text-blue-600"
            bg="bg-blue-50 dark:bg-blue-950/30"
            assets="Banking credentials, transaction systems, customer data"
          />
          <SectorCard
            icon={Building2}
            title="Government Agencies"
            pct="26%"
            color="text-violet-600"
            bg="bg-violet-50 dark:bg-violet-950/30"
            assets="Citizen databases, internal systems, diplomatic communications"
          />
          <SectorCard
            icon={Shield}
            title="Military / Defence"
            pct="18%"
            color="text-red-600"
            bg="bg-red-50 dark:bg-red-950/30"
            assets="Operational systems, personnel records, classified networks"
          />
          <SectorCard
            icon={Zap}
            title="Critical Infrastructure"
            pct="12%"
            color="text-orange-500"
            bg="bg-orange-50 dark:bg-orange-950/30"
            assets="Energy, telecommunications, water management systems"
          />
          <SectorCard
            icon={BriefcaseBusiness}
            title="Private Enterprise"
            pct="6%"
            color="text-green-600"
            bg="bg-green-50 dark:bg-green-950/30"
            assets="Corporate IP, employee credentials, supplier access"
          />
        </div>
      </section>

      {/* How Infostealers Work */}
      <section className="bg-muted/40 py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              How Infostealer Attacks Work
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Unlike ransomware, infostealers operate silently — harvesting credentials and session
              tokens before exfiltrating them to attacker-controlled infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CapabilityCard
              icon={Lock}
              title="Credential Harvesting"
              desc="Extracts saved usernames and passwords from all major browsers, password managers, VPN clients, and email configurations."
            />
            <CapabilityCard
              icon={Eye}
              title="Session & Cookie Theft"
              desc="Captures browser session cookies allowing attackers to impersonate authenticated users without needing a password or OTP — bypassing MFA entirely."
            />
            <CapabilityCard
              icon={Database}
              title="File Exfiltration"
              desc="Scans victim systems for high-value documents, SSH keys, API config files, cryptocurrency wallets, and corporate spreadsheets."
            />
            <CapabilityCard
              icon={Wifi}
              title="Keylogging"
              desc="Records keystrokes in real-time, capturing credentials as they are typed — even banking PINs entered manually and never saved in a browser."
            />
            <CapabilityCard
              icon={Globe}
              title="System Fingerprinting"
              desc="Profiles each infected machine: OS version, installed software, geolocation, browser extensions including crypto wallets, and running processes."
            />
            <CapabilityCard
              icon={Users}
              title="Dark Web Trading"
              desc="Harvested logs are sold on platforms like Russian Market and Telegram channels. Attackers specifically filter for .rw, .ke, .ng, .za, .gh, and other African domains."
            />
          </div>
        </div>
      </section>

      {/* Active Stealer Families */}
      <section className="container mx-auto px-4 py-20 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Active Malware Families
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            These infostealer families are actively observed targeting African victims and
            organizations, distributed as Malware-as-a-Service on dark web forums and Telegram.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            {
              name: "RedLine",
              desc: "Most widely deployed globally. Targets browser credentials, crypto wallets, session tokens, and FTP clients.",
            },
            {
              name: "Lumma",
              desc: "Sophisticated variant with strong anti-analysis capabilities. Distributed via malvertising and phishing.",
            },
            {
              name: "Raccoon",
              desc: "Broad browser and application credential targeting sold on a subscription model with active developer support.",
            },
            {
              name: "Vidar",
              desc: "Based on the Arkei framework. Targets browser data, credentials, documents, and cryptocurrency wallets.",
            },
            {
              name: "MetaStealer",
              desc: "Notable for targeting macOS environments, expanding the threat beyond Windows systems.",
            },
          ].map((f) => (
            <div
              key={f.name}
              className="p-5 rounded-xl bg-card border border-border hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-destructive shrink-0" />
                <span className="font-display font-semibold text-foreground">{f.name}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary/5 border-t border-b border-primary/10 py-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-display font-bold text-foreground mb-4">
            Is your organization exposed?
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Search any domain to instantly see if its employees or clients have been compromised
            by infostealer malware — before attackers exploit the data.
          </p>
          <Link href="/search">
            <Button size="lg" className="h-14 px-10 text-base rounded-xl shadow-sm">
              <Search className="w-5 h-5 mr-2" />
              Search a Domain Now
            </Button>
          </Link>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground bg-background">
        <p className="mb-1">
          UMULINZI CTI — operated by the{" "}
          <span className="font-medium text-foreground">
            International Cybersecurity Community for Africa (ICCA)
          </span>
        </p>
        <p>© {new Date().getFullYear()} All rights reserved.</p>
      </footer>
    </div>
  );
}

function SectorCard({
  icon: Icon,
  title,
  pct,
  assets,
  color,
  bg,
}: {
  icon: any;
  title: string;
  pct: string;
  assets: string;
  color: string;
  bg: string;
}) {
  return (
    <div className="p-6 rounded-xl bg-card border border-border hover:shadow-md transition-all duration-300">
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4 ${bg} ${color}`}>
        <Icon className="w-3.5 h-3.5" />
        {pct} of targeting
      </div>
      <h3 className="font-display font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{assets}</p>
    </div>
  );
}

function CapabilityCard({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) {
  return (
    <div className="p-6 rounded-xl bg-card border border-border hover:shadow-md transition-all duration-300">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <h3 className="font-display font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}
