import React, { useState } from 'react';
import { 
  Network, Cpu, Globe, Terminal, ShieldCheck, Scale, 
  ChevronDown, ChevronUp, Home, Key, Utensils, Bot, 
  Lock, FileText, Menu, X, Languages
} from 'lucide-react';

// --- CONTENT DATA (English & Sinhala) ---
const CONTENT = {
  en: {
    nav: {
      title: "Hack/Build",
      start: "Start",
      mod1: "Networking",
      mod2: "OS",
      mod3: "Web",
      mod4: "Scripting",
      mod5: "Security",
      mod6: "Ethics",
      langLabel: "Switch to Sinhala"
    },
    header: {
      title: "Ethical Hacking",
      subtitle: "Demystified",
      desc: "A jargon-free guide to understanding how computers talk, listen, and keep secrets. Designed for non-technical beginners.",
      cta: "Start Learning"
    },
    labels: {
      term: "The Technical Term",
      analogy: "The Analogy",
      mechanics: "The Mechanics",
      showDetails: "Reveal How It Actually Works",
      hideDetails: "Hide Technical Details"
    },
    modules: [
      {
        id: "mod1",
        title: "Module 1: Networking",
        icon: Network,
        color: "bg-blue-500",
        cards: [
          {
            term: "IP Address",
            icon: Home,
            analogyTitle: "The House Address",
            analogyText: "Imagine the internet is a giant city. Every computer is a house. For the mailman (the internet) to deliver a letter (data) to your house, you need a unique address.",
            mechanicsTitle: "DHCP & IPv4/IPv6",
            mechanicsPoints: [
              "DHCP: When you join Wi-Fi, the Router acts like a landlord assigning you a temporary apartment number.",
              "IPv4: Old style (192.168.1.1). We ran out of these.",
              "IPv6: New style. Complex and infinite. Like giving every grain of sand a phone number."
            ]
          },
          {
            term: "DNS",
            icon: Globe,
            analogyTitle: "The Phonebook",
            analogyText: "You don't memorize your friend's phone number; you tap their name in your contacts. You type 'google.com', but the computer needs the actual number.",
            mechanicsTitle: "DNS Resolution & Spoofing",
            mechanicsPoints: [
              "Resolution: Your computer secretly asks a DNS Server: 'What is the number for Google?' It replies '142.250.190.46'.",
              "The Hack: DNS Spoofing is like hacking the phonebook. You type 'Mom', but the phone calls the scammer."
            ]
          },
          {
            term: "Port",
            icon: Home,
            analogyTitle: "The Doors & Windows",
            analogyText: "The mail arrives at the house (IP), but where does it go? The Living Room (Web), the Boiler Room (Admin), or the Mailbox (Email)?",
            mechanicsTitle: "TCP/UDP Ports",
            mechanicsPoints: [
              "Port 80/443: Web Traffic (The Front Door).",
              "Port 22: SSH/Admin (The Locked Back Door).",
              "Scanning: Hackers knock on every door to see which one is unlocked."
            ]
          }
        ]
      },
      {
        id: "mod2",
        title: "Module 2: Operating Systems",
        icon: Cpu,
        color: "bg-indigo-500",
        cards: [
          {
            term: "The Kernel",
            icon: Cpu,
            analogyTitle: "The Subconscious Brain",
            analogyText: "You (the user) don't tell your heart to beat. You just think 'Run', and the brain handles the muscles. The Kernel is that brain.",
            mechanicsTitle: "Hardware Interaction",
            mechanicsPoints: [
              "The Kernel talks directly to the hardware (CPU, RAM). If a hacker compromises the Kernel, they control the 'reality' of that machine."
            ]
          },
          {
            term: "File Permissions",
            icon: Key,
            analogyTitle: "The Key Ring",
            analogyText: "In a hotel, your key opens one room. The Manager's key opens EVERY room. We want the Manager's key.",
            mechanicsTitle: "Read, Write, Execute (rwx)",
            mechanicsPoints: [
              "777 Permission: Everyone can Read, Write, and Execute. This is dangerous.",
              "Privilege Escalation: Starting as a Guest and finding a flaw that lets you become Admin (Root)."
            ]
          }
        ]
      },
      {
        id: "mod3",
        title: "Module 3: Web Technologies",
        icon: Globe,
        color: "bg-cyan-500",
        cards: [
          {
            term: "Client-Server",
            icon: Utensils,
            analogyTitle: "The Restaurant",
            analogyText: "You (Client) are the customer. The Server is the Kitchen. You order food, but you don't see how it's cooked.",
            mechanicsTitle: "Request & Response",
            mechanicsPoints: [
              "You send an HTTP Request (The Order Ticket). The Server processes it and sends back HTML (The Food). Hackers mess with the ticket before it reaches the kitchen."
            ]
          },
          {
            term: "Cookies",
            icon: FileText,
            analogyTitle: "The Table Number",
            analogyText: "The Kitchen is busy. They forget you instantly. To remember you, they give you a plastic number stand (Cookie).",
            mechanicsTitle: "Session Hijacking",
            mechanicsPoints: [
              "If I steal your table number and put it on my table, the waiter brings YOUR food to ME. I become you without needing your password."
            ]
          }
        ]
      },
      {
        id: "mod4",
        title: "Module 4: Scripting",
        icon: Terminal,
        color: "bg-green-500",
        cards: [
          {
            term: "Automation",
            icon: Bot,
            analogyTitle: "The Robot Butler",
            analogyText: "Manual hacking is like washing dishes by hand. Scripting is building a dishwasher to do it for you while you sleep.",
            mechanicsTitle: "Loops & Variables",
            mechanicsPoints: [
              "Loop: 'Try password 0000. Did it work? No. Try 0001.' Repeat 10,000 times per second.",
              "Efficiency: Humans act in seconds. Scripts act in milliseconds."
            ]
          }
        ]
      },
      {
        id: "mod5",
        title: "Module 5: Security Concepts",
        icon: Lock,
        color: "bg-red-500",
        cards: [
          {
            term: "Hashing",
            icon: Utensils,
            analogyTitle: "The Fruit Smoothie",
            analogyText: "You blend a strawberry and banana. You get pink sludge. You CANNOT turn the sludge back into a strawberry.",
            mechanicsTitle: "One-Way Functions",
            mechanicsPoints: [
              "Banks store the 'sludge' (Hash), not your password. When you login, they blend your input. If the sludge matches, you get in. This protects passwords during a data breach."
            ]
          },
          {
            term: "VPN",
            icon: Lock,
            analogyTitle: "The Concrete Tunnel",
            analogyText: "Imagine walking down a glass hallway. Everyone sees what you are carrying. A VPN builds a concrete tunnel around you inside that hallway.",
            mechanicsTitle: "Encrypted Tunnels",
            mechanicsPoints: [
              "People on the outside (Internet Service Provider, Hackers on Wi-Fi) can see the tunnel exists, but cannot see the data inside it."
            ]
          }
        ]
      },
      {
        id: "mod6",
        title: "Module 6: Ethics",
        icon: Scale,
        color: "bg-yellow-500",
        cards: [
          {
            term: "White Hat vs Black Hat",
            icon: ShieldCheck,
            analogyTitle: "Locksmith vs Burglar",
            analogyText: "Both know exactly how to pick the lock. The tools are the same. The ONLY difference is permission.",
            mechanicsTitle: "Scope of Work",
            mechanicsPoints: [
              "A 'Get Out of Jail Free' card. It is a legal contract signed by the company authorizing you to break in. Without this paper, you are a criminal."
            ]
          }
        ]
      }
    ]
  },
  si: {
    nav: {
      title: "Hack/Build",
      start: "ආරම්භය",
      mod1: "Networking",
      mod2: "OS",
      mod3: "Web",
      mod4: "Scripting",
      mod5: "Security",
      mod6: "Ethics",
      langLabel: "English"
    },
    header: {
      title: "Ethical Hacking",
      subtitle: "සරලව ඉගෙන ගනිමු",
      desc: "පරිගණක එකිනෙක සම්බන්ධ වන ආකාරය සහ රහස් සුරකින ආකාරය ගැන තාක්ෂණික වචන භාවිතයෙන් තොරව සරලව තේරුම් ගැනීමට සකස් කළ මාර්ගෝපදේශයකි.",
      cta: "පාඩම අරඹන්න"
    },
    labels: {
      term: "The Technical Term",
      analogy: "The Analogy (සරලව)",
      mechanics: "The Mechanics (ක්‍රියාකාරීත්වය)",
      showDetails: "Show How It Works",
      hideDetails: "Hide Details"
    },
    modules: [
      {
        id: "mod1",
        title: "Module 1: Networking",
        icon: Network,
        color: "bg-blue-500",
        cards: [
          {
            term: "IP Address",
            icon: Home,
            analogyTitle: "The House Address",
            analogyText: "අන්තර්ජාලය විශාල නගරයක් යැයි සිතන්න. සෑම පරිගණකයක්ම එම නගරයේ ඇති නිවසක් වැනිය. තැපැල්කරුවාට (Internet) ඔබේ නිවසට ලිපියක් (Data) ගෙන ඒමට නම්, ඔබට අනන්‍ය වූ ලිපිනයක් තිබිය යුතුය.",
            mechanicsTitle: "DHCP & IPv4/IPv6",
            mechanicsPoints: [
              "DHCP: ඔබ Wi-Fi එකට සම්බන්ධ වූ විට, Router එක විසින් ඔබට තාවකාලික ලිපිනයක් ලබා දෙයි. මෙය හරියට නිවාස සංකීර්ණයක කළමනාකරු ඔබට තාවකාලික කාමර අංකයක් ලබා දෙනවා වැනිය.",
              "IPv4: පැරණි ක්‍රමය (192.168.1.1). මෙම ලිපින දැන් අවසන් වී ඇත.",
              "IPv6: නවතම ක්‍රමය. මෙය ඉතා සංකීර්ණ සහ විශාල පරාසයක් ඇත."
            ]
          },
          {
            term: "DNS",
            icon: Globe,
            analogyTitle: "The Phonebook",
            analogyText: "ඔබ ඔබේ මිතුරන්ගේ දුරකථන අංක කටපාඩම් කරන්නේ නැත; ඔබ කරන්නේ ඔවුන්ගේ නම සෙවීමයි. ඔබ 'google.com' ලෙස ටයිප් කළද, පරිගණකයට අවශ්‍ය වන්නේ ඊට අදාළ අංකයයි (IP Address).",
            mechanicsTitle: "DNS Resolution & Spoofing",
            mechanicsPoints: [
              "Resolution: ඔබේ පරිගණකය රහසිගතව DNS server එකෙන් අසයි: 'Google එකේ අංකය කුමක්ද?' එවිට එය '142.250.190.46' ලෙස පිළිතුරු දෙයි.",
              "The Hack: DNS Spoofing යනු දුරකථන නාමාවලිය වෙනස් කිරීම වැනිය. ඔබ 'අම්මා' කියා සිතා ඇමතුම ගත්තද, එය සම්බන්ධ වන්නේ වංචාකරුවෙකුටය."
            ]
          },
          {
            term: "Port",
            icon: Home,
            analogyTitle: "The Doors & Windows",
            analogyText: "තැපැල්කරු නිවසට (IP Address) පැමිණියද, ලිපිය ලබා දිය යුත්තේ කාටද? සාලයටද (Web)? නැත්නම් කාර්යාල කාමරයටද (Email)? Ports යනු එම දොරවල්ය.",
            mechanicsTitle: "TCP/UDP Ports",
            mechanicsPoints: [
              "Port 80/443: Web Traffic (ප්‍රධාන දොරටුව).",
              "Port 22: SSH/Admin (අගුලු දැමූ පසුපස දොර).",
              "Scanning: Hackers සියලුම දොරවල් වලට තට්ටු කර බලන්නේ කුමන දොරක් විවෘතව ඇත්දැයි බැලීමටයි."
            ]
          }
        ]
      },
      {
        id: "mod2",
        title: "Module 2: Operating Systems",
        icon: Cpu,
        color: "bg-indigo-500",
        cards: [
          {
            term: "The Kernel",
            icon: Cpu,
            analogyTitle: "The Subconscious Brain",
            analogyText: "ඔබ ඔබේ හදවතට ගැහෙන්න යැයි විධාන දෙන්නේ නැත. ඔබ සිතන්නේ 'දුවන්න' කියා පමණි, ඉතිරිය මොළය විසින් පාලනය කරයි. Kernel එක යනු පරිගණකයේ එම මොළයයි.",
            mechanicsTitle: "Hardware Interaction",
            mechanicsPoints: [
              "Kernel එක ඍජුවම Hardware (CPU, RAM) සමඟ ගනුදෙනු කරයි. Hacker කෙනෙක් Kernel එක පාලනය කලහොත්, ඔහුට මුළු පරිගණකයම පාලනය කළ හැක."
            ]
          },
          {
            term: "File Permissions",
            icon: Key,
            analogyTitle: "The Key Ring",
            analogyText: "හෝටලයකදී, ඔබේ යතුරෙන් ඇරිය හැක්කේ ඔබේ කාමරය පමණි. නමුත් කළමනාකරුගේ (Manager) යතුරෙන් ඕනෑම කාමරයක් ඇරිය හැක. Hackers ලාට අවශ්‍ය වන්නේ එම Manager යතුරයි.",
            mechanicsTitle: "Read, Write, Execute (rwx)",
            mechanicsPoints: [
              "777 Permission: ඕනෑම කෙනෙකුට බලන්න, ලියන්න සහ වෙනස් කරන්න පුළුවන්. මෙය ඉතා අනතුරුදායකයි.",
              "Privilege Escalation: සාමාන්‍ය අමුත්තෙක් (Guest) ලෙස පැමිණ, පද්ධතියේ ඇති අඩුපාඩුවක් සොයාගෙන Admin (Root) බවට පත්වීම."
            ]
          }
        ]
      },
      {
        id: "mod3",
        title: "Module 3: Web Technologies",
        icon: Globe,
        color: "bg-cyan-500",
        cards: [
          {
            term: "Client-Server",
            icon: Utensils,
            analogyTitle: "The Restaurant",
            analogyText: "ඔබ (Client) පාරිභෝගිකයා වේ. Server යනු මුළුතැන්ගෙයයි (Kitchen). ඔබ ආහාර ඇණවුම් කළද, එය උයන ආකාරය ඔබ දකින්නේ නැත.",
            mechanicsTitle: "Request & Response",
            mechanicsPoints: [
              "ඔබ HTTP Request එකක් යවයි (ඇණවුම් පත). Server එක එය සකසා HTML (ආහාරය) එවයි. Hackers කරන්නේ එම ඇණවුම් පත කුස්සියට යාමට පෙර වෙනස් කිරීමයි."
            ]
          },
          {
            term: "Cookies",
            icon: FileText,
            analogyTitle: "The Table Number",
            analogyText: "කුස්සිය ඉතා කාර්යබහුලයි. ඔවුන්ට ඔබව මතක නැත. ඔබව මතක තබා ගැනීමට ඔවුන් ඔබට අංකයක් සහිත පුවරුවක් (Cookie) ලබා දෙයි.",
            mechanicsTitle: "Session Hijacking",
            mechanicsPoints: [
              "මම ඔබේ මේස අංකය සොරාගෙන මගේ මේසය මත තබා ගත්තොත්, වේටර්වරයා ඔබේ කෑම මට ගෙනැවිත් දෙයි. ඔබේ Password එක නොමැතිව මට ඔබ ලෙස පෙනී සිටිය හැක."
            ]
          }
        ]
      },
      {
        id: "mod4",
        title: "Module 4: Scripting",
        icon: Terminal,
        color: "bg-green-500",
        cards: [
          {
            term: "Automation",
            icon: Bot,
            analogyTitle: "The Robot Butler",
            analogyText: "අතින් පිඟන් සේදීම ඉතා වෙහෙසකරයි. Script එකක් ලිවීම යනු පිඟන් සෝදන යන්ත්‍රයක් (Dishwasher) සෑදීම වැනිය. එවිට ඔබට නිදා සිටින අතරතුර එය වැඩ කරයි.",
            mechanicsTitle: "Loops & Variables",
            mechanicsPoints: [
              "Loop: 'Password එක 0000 ද කියා බලන්න. වැරදිද? එහෙනම් 0001 ද කියා බලන්න.' මෙය තත්පරයකට වාර 10,000ක් පමණ සිදු කරයි.",
              "Efficiency: මිනිසුන් වැඩ කිරීමට තත්පර ගණනක් ගන්නා විට, Scripts එය මිලි තත්පර වලින් සිදු කරයි."
            ]
          }
        ]
      },
      {
        id: "mod5",
        title: "Module 5: Security Concepts",
        icon: Lock,
        color: "bg-red-500",
        cards: [
          {
            term: "Hashing",
            icon: Utensils,
            analogyTitle: "The Fruit Smoothie",
            analogyText: "ඔබ ස්ට්‍රෝබෙරි සහ කෙසෙල් බ්ලෙන්ඩර් කළ විට ජූස් එකක් ලැබෙයි. ඔබට එම ජූස් එක නැවත ස්ට්‍රෝබෙරි ගෙඩියක් බවට පත් කළ නොහැක.",
            mechanicsTitle: "One-Way Functions",
            mechanicsPoints: [
              "බැංකු විසින් ගබඩා කරන්නේ ඔබේ Password එක නොවේ, එම 'ජූස්' (Hash) එකයි. යම් හෙයකින් දත්ත සොරා ගත්තද, ඔවුන්ට ඔබේ නියම Password එක සොයාගත නොහැක."
            ]
          },
          {
            term: "VPN",
            icon: Lock,
            analogyTitle: "The Concrete Tunnel",
            analogyText: "ඔබ වීදුරු බිත්ති ඇති කොරිඩෝවක යන විට ඔබ ගෙනියන දේ සැමට පෙනේ. VPN එකක් යනු එම කොරිඩෝව ඇතුලේ සාදන ලද කොන්ක්‍රීට් උමගක් වැනිය.",
            mechanicsTitle: "Encrypted Tunnels",
            mechanicsPoints: [
              "පිටත සිටින අයට (ISP හෝ Hackers ලාට) උමගක් ඇති බව පෙනුනද, ඒ තුලින් ගමන් කරන්නේ කුමක්දැයි බැලිය නොහැක."
            ]
          }
        ]
      },
      {
        id: "mod6",
        title: "Module 6: Ethics",
        icon: Scale,
        color: "bg-yellow-500",
        cards: [
          {
            term: "White Hat vs Black Hat",
            icon: ShieldCheck,
            analogyTitle: "Locksmith vs Burglar",
            analogyText: "මේ දෙදෙනාම දොර අගුළු කඩන හැටි දනී. දෙදෙනාම භාවිතා කරන්නේ එකම මෙවලම්ය. වෙනස ඇත්තේ 'අවසරය' (Permission) මත පමණි.",
            mechanicsTitle: "Scope of Work",
            mechanicsPoints: [
              "නීතිමය ගිවිසුමක් නොමැතිව Hacking කිරීම අපරාධයකි. ඔබ යමක් කිරීමට පෙර අයිතිකරුගෙන් ලිඛිත අවසරයක් ලබා ගත යුතුය."
            ]
          }
        ]
      }
    ]
  }
};

// --- COMPONENTS ---

const CourseModule = ({ title, icon: Icon, color, children, id }) => (
  <section id={id} className="mb-16 scroll-mt-24 animate-fadeIn">
    <div className={`flex items-center gap-4 mb-6 pb-4 border-b border-slate-700`}>
      <div className={`p-3 rounded-xl ${color} bg-opacity-20`}>
        <Icon className={`w-8 h-8 ${color.replace('bg-', 'text-')}`} />
      </div>
      <h2 className="text-3xl font-bold text-white">{title}</h2>
    </div>
    <div className="grid gap-8">
      {children}
    </div>
  </section>
);

const ConceptCard = ({ data, labels, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 shadow-lg">
      {/* Header / Term */}
      <div className="bg-slate-900/50 p-6 border-b border-slate-700 flex justify-between items-start">
        <div>
          <span className="text-cyan-400 text-sm font-mono uppercase tracking-wider">{labels.term}</span>
          <h3 className="text-2xl font-bold text-white mt-1">{data.term}</h3>
        </div>
        <div className="p-2 bg-slate-800 rounded-lg">
          <Icon className="w-6 h-6 text-slate-400" />
        </div>
      </div>

      {/* Analogy Section (Always Visible) */}
      <div className="p-6 bg-slate-800">
        <div className="flex items-start gap-4">
          <div className="mt-1">
            <div className="bg-purple-500/20 p-2 rounded-lg">
              <span className="text-2xl">💡</span>
            </div>
          </div>
          <div>
            <span className="text-purple-400 text-sm font-bold uppercase tracking-wide">{labels.analogy}</span>
            <h4 className="text-lg font-semibold text-slate-200 mt-1">{data.analogyTitle}</h4>
            <p className="text-slate-400 mt-2 leading-relaxed">{data.analogyText}</p>
          </div>
        </div>
      </div>

      {/* Mechanics Section (Collapsible) */}
      <div className="border-t border-slate-700">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-4 text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors text-sm font-medium"
        >
          <span>{isOpen ? labels.hideDetails : labels.showDetails}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        
        {isOpen && (
          <div className="p-6 bg-slate-900/80 border-t border-slate-700 animate-slideDown">
            <span className="text-green-400 text-xs font-bold uppercase tracking-wide flex items-center gap-2">
              <Terminal className="w-3 h-3" /> {labels.mechanics}
            </span>
            <h4 className="text-md font-semibold text-slate-200 mt-2">{data.mechanicsTitle}</h4>
            <div className="text-slate-400 mt-2 space-y-2 text-sm leading-relaxed font-mono">
              {data.mechanicsPoints.map((point, i) => (
                <p key={i}>• {point}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const NavBar = ({ content, activeSection, scrollToSection, isMobileMenuOpen, setIsMobileMenuOpen, lang, toggleLang }) => {
  const navItems = [
    { id: 'intro', label: content.start },
    { id: 'mod1', label: content.mod1 },
    { id: 'mod2', label: content.mod2 },
    { id: 'mod3', label: content.mod3 },
    { id: 'mod4', label: content.mod4 },
    { id: 'mod5', label: content.mod5 },
    { id: 'mod6', label: content.mod6 },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl text-white">
          <ShieldCheck className="text-cyan-400" />
          <span>{content.title} <span className="text-xs text-slate-500 ml-1">{lang === 'en' ? '(English)' : '(Sinhala)'}</span></span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeSection === item.id 
                  ? 'bg-cyan-500/10 text-cyan-400' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="h-6 w-px bg-slate-700 mx-2"></div>
          <button 
            onClick={toggleLang}
            className="flex items-center gap-2 px-3 py-2 bg-purple-600/20 text-purple-300 hover:bg-purple-600 hover:text-white rounded-lg transition-all text-sm font-semibold border border-purple-500/30"
          >
            <Languages className="w-4 h-4" />
            {content.langLabel}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 p-4">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className="px-4 py-3 rounded-lg text-left text-sm font-medium text-slate-300 hover:bg-slate-800"
              >
                {item.label}
              </button>
            ))}
            <hr className="border-slate-800 my-2"/>
            <button 
              onClick={() => {
                toggleLang();
                setIsMobileMenuOpen(false);
              }}
              className="px-4 py-3 rounded-lg text-left text-sm font-medium text-purple-400 hover:bg-purple-900/20 flex items-center gap-2"
            >
              <Languages className="w-4 h-4" />
              {content.langLabel}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const App = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState('en'); // 'en' or 'si'

  const toggleLang = () => setLang(prev => prev === 'en' ? 'si' : 'en');
  const t = CONTENT[lang];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-cyan-500/30">
      <NavBar 
        content={t.nav}
        activeSection={activeSection} 
        scrollToSection={scrollToSection} 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        lang={lang}
        toggleLang={toggleLang}
      />

      <main className="max-w-4xl mx-auto px-4 pt-24 pb-20">
        
        {/* Intro Header */}
        <section id="intro" className="text-center py-16 mb-12 border-b border-slate-800">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            {t.header.title} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              {t.header.subtitle}
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
            {t.header.desc}
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => scrollToSection('mod1')}
              className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg transition-all transform hover:-translate-y-1 shadow-lg shadow-cyan-500/20"
            >
              {t.header.cta}
            </button>
          </div>
        </section>

        {/* Modules Loop */}
        {t.modules.map((mod) => (
          <CourseModule 
            key={mod.id} 
            id={mod.id}
            title={mod.title} 
            icon={mod.icon} 
            color={mod.color}
          >
            {mod.cards.map((card, index) => (
              <ConceptCard 
                key={index}
                data={card}
                labels={t.labels}
                icon={card.icon}
              />
            ))}
          </CourseModule>
        ))}

        <footer className="text-center text-slate-500 pt-12 border-t border-slate-800">
          <p>© Ethical Hacking Fundamentals. {lang === 'en' ? 'Built for the curious.' : 'කුතුහලයෙන් පිරි අය වෙනුවෙන් නිර්මාණය කරන ලදී.'}</p>
        </footer>

      </main>
    </div>
  );
};

export default App;
