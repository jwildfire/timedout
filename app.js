// ============================================================
// TIMED OUT - A Wikipedia-powered timeline game
// ============================================================

const MAX_LIVES = 3;
const EVENTS_PER_GAME = 20;

// ============ Curated Event Pools by Difficulty ============
// Easy: Iconic events everyone learns in school
const EASY_EVENTS = [
    { year: 1492, text: "Christopher Columbus reaches the Americas" },
    { year: 1776, text: "The United States Declaration of Independence is adopted" },
    { year: 1789, text: "The French Revolution begins with the storming of the Bastille" },
    { year: 1861, text: "The American Civil War begins" },
    { year: 1865, text: "Abraham Lincoln is assassinated at Ford's Theatre" },
    { year: 1876, text: "Alexander Graham Bell patents the telephone" },
    { year: 1903, text: "The Wright Brothers achieve the first powered airplane flight" },
    { year: 1912, text: "The RMS Titanic sinks on its maiden voyage" },
    { year: 1914, text: "World War I begins after the assassination of Archduke Franz Ferdinand" },
    { year: 1929, text: "The Wall Street Crash triggers the Great Depression" },
    { year: 1939, text: "World War II begins as Germany invades Poland" },
    { year: 1941, text: "Japan attacks Pearl Harbor, bringing the US into World War II" },
    { year: 1945, text: "The United States drops atomic bombs on Hiroshima and Nagasaki" },
    { year: 1947, text: "India gains independence from British rule" },
    { year: 1955, text: "Rosa Parks refuses to give up her bus seat, sparking the Montgomery Bus Boycott" },
    { year: 1963, text: "Martin Luther King Jr. delivers his 'I Have a Dream' speech" },
    { year: 1969, text: "Neil Armstrong and Buzz Aldrin become the first humans to walk on the Moon" },
    { year: 1989, text: "The Berlin Wall falls, marking the end of the Cold War era" },
    { year: 1994, text: "Nelson Mandela becomes the first Black president of South Africa" },
    { year: 2001, text: "The September 11 attacks occur in the United States" },
    { year: 2007, text: "Apple releases the first iPhone" },
    { year: 2020, text: "The COVID-19 pandemic spreads worldwide" },
    { year: 1957, text: "The Soviet Union launches Sputnik, the first artificial satellite" },
    { year: 1953, text: "Edmund Hillary and Tenzing Norgay reach the summit of Mount Everest" },
    { year: 2004, text: "Facebook is founded by Mark Zuckerberg" },
];

// Medium: Important milestones an educated person would likely know
const MEDIUM_EVENTS = [
    { year: 1215, text: "The Magna Carta is sealed by King John of England" },
    { year: 1440, text: "Johannes Gutenberg develops the movable-type printing press" },
    { year: 1517, text: "Martin Luther posts his 95 Theses, sparking the Protestant Reformation" },
    { year: 1543, text: "Copernicus publishes his theory that the Earth revolves around the Sun" },
    { year: 1687, text: "Isaac Newton publishes his Principia Mathematica" },
    { year: 1796, text: "Edward Jenner develops the first successful smallpox vaccine" },
    { year: 1804, text: "Napoleon Bonaparte crowns himself Emperor of France" },
    { year: 1815, text: "Napoleon is defeated at the Battle of Waterloo" },
    { year: 1848, text: "Karl Marx and Friedrich Engels publish The Communist Manifesto" },
    { year: 1859, text: "Charles Darwin publishes On the Origin of Species" },
    { year: 1869, text: "The Suez Canal opens, connecting the Mediterranean and Red Seas" },
    { year: 1879, text: "Thomas Edison demonstrates the first practical incandescent light bulb" },
    { year: 1905, text: "Albert Einstein publishes his special theory of relativity" },
    { year: 1917, text: "The Russian Revolution overthrows the Tsarist autocracy" },
    { year: 1928, text: "Alexander Fleming discovers penicillin" },
    { year: 1948, text: "The State of Israel is established" },
    { year: 1961, text: "Yuri Gagarin becomes the first human in space" },
    { year: 1975, text: "The Vietnam War ends with the fall of Saigon" },
    { year: 1986, text: "The Chernobyl nuclear disaster occurs in Ukraine" },
    { year: 1990, text: "Tim Berners-Lee creates the World Wide Web" },
    { year: 2003, text: "The Human Genome Project is completed" },
    { year: 2012, text: "The Higgs boson particle is discovered at CERN" },
    { year: 1833, text: "Slavery is abolished throughout the British Empire" },
    { year: 1588, text: "The English Navy defeats the Spanish Armada" },
    { year: 1564, text: "William Shakespeare is born in Stratford-upon-Avon" },
];

// Hard: Obscure events that only history buffs would know
const HARD_EVENTS = [
    { year: 776, text: "The first recorded Olympic Games are held in Olympia, Greece" },
    { year: 1054, text: "The Great Schism splits Christianity into Roman Catholic and Eastern Orthodox" },
    { year: 1347, text: "The Black Death arrives in Europe via Genoese trading ships" },
    { year: 1453, text: "Constantinople falls to the Ottoman Turks, ending the Byzantine Empire" },
    { year: 1519, text: "Ferdinand Magellan begins the first circumnavigation of the Earth" },
    { year: 1607, text: "Jamestown, the first permanent English settlement in America, is founded" },
    { year: 1610, text: "Galileo observes the moons of Jupiter through his telescope" },
    { year: 1648, text: "The Treaty of Westphalia ends the Thirty Years' War in Europe" },
    { year: 1707, text: "The Acts of Union unite England and Scotland into Great Britain" },
    { year: 1752, text: "Benjamin Franklin demonstrates that lightning is electrical" },
    { year: 1804, text: "Haiti declares independence, becoming the first free Black republic" },
    { year: 1826, text: "Joseph Nicéphore Niépce captures the earliest surviving photograph" },
    { year: 1854, text: "Florence Nightingale begins nursing soldiers during the Crimean War" },
    { year: 1884, text: "The Berlin Conference divides Africa among European colonial powers" },
    { year: 1885, text: "Karl Benz builds the first true automobile powered by gasoline" },
    { year: 1893, text: "New Zealand becomes the first country to grant women the right to vote" },
    { year: 1895, text: "The Lumière brothers hold the first public film screening in Paris" },
    { year: 1898, text: "Marie Curie discovers the radioactive elements polonium and radium" },
    { year: 1920, text: "The 19th Amendment grants American women the right to vote" },
    { year: 1923, text: "Hyperinflation devastates the Weimar Republic's economy" },
    { year: 1937, text: "Amelia Earhart disappears over the Pacific Ocean during a flight" },
    { year: 1944, text: "The Bretton Woods Conference establishes the World Bank and IMF" },
    { year: 1956, text: "The Suez Crisis erupts as Britain, France, and Israel invade Egypt" },
    { year: 1971, text: "Nixon ends the gold standard, transforming the global monetary system" },
    { year: 1973, text: "The first mobile phone call is made by Martin Cooper of Motorola" },
    { year: 1981, text: "IBM releases its first personal computer, the IBM 5150" },
    { year: 1997, text: "Dolly the sheep, the first cloned mammal, is revealed to the public" },
    { year: 2008, text: "The collapse of Lehman Brothers triggers the global financial crisis" },
    { year: 2011, text: "The Arab Spring wave of protests sweeps across the Middle East" },
    { year: 2016, text: "AlphaGo defeats world champion Go player Lee Sedol" },
];

const EVENT_POOLS = { easy: EASY_EVENTS, medium: MEDIUM_EVENTS, hard: HARD_EVENTS };

// ============ Wikipedia Service ============
const WikipediaService = {
    getRandomDates(count) {
        const dates = [];
        const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        for (let i = 0; i < count; i++) {
            const month = Math.floor(Math.random() * 12) + 1;
            const maxDay = daysInMonth[month - 1];
            const day = Math.floor(Math.random() * maxDay) + 1;
            dates.push({ month, day });
        }
        return dates;
    },

    async fetchEventsForDate(month, day) {
        const mm = String(month).padStart(2, '0');
        const dd = String(day).padStart(2, '0');
        const url = `https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${mm}/${dd}`;

        const response = await fetch(url, {
            headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        return (data.events || []).map(e => ({
            year: e.year,
            text: e.text,
            pageCount: (e.pages || []).length
        }));
    },

    async fetchEvents(difficulty, statusCallback) {
        const dates = this.getRandomDates(10);
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        // Fetch in parallel
        const promises = dates.map(async ({ month, day }) => {
            if (statusCallback) {
                statusCallback(`Searching ${monthNames[month - 1]} ${day}...`);
            }
            try {
                return await this.fetchEventsForDate(month, day);
            } catch {
                return [];
            }
        });

        const results = await Promise.all(promises);
        let allEvents = results.flat();

        // Base filtering
        allEvents = allEvents
            .filter(e => e.year && e.text)
            .filter(e => e.year > 0 && e.year <= 2024)
            .filter(e => e.text.length > 20 && e.text.length < 200);

        // Difficulty-based filtering using page count as a notability proxy
        // More linked Wikipedia pages = more notable = easier to know
        let filtered;
        if (difficulty === 'easy') {
            // High notability: many linked pages, well-known
            filtered = allEvents.filter(e => e.pageCount >= 4);
        } else if (difficulty === 'medium') {
            // Moderate notability
            filtered = allEvents.filter(e => e.pageCount >= 2 && e.pageCount <= 5);
        } else {
            // Low notability: fewer linked pages, more obscure
            filtered = allEvents.filter(e => e.pageCount <= 2);
        }

        // If filtering was too aggressive, relax it
        if (filtered.length < 15) {
            filtered = allEvents;
        }

        // Deduplicate by year (keep one per year for cleaner gameplay)
        const byYear = new Map();
        for (const event of filtered) {
            if (!byYear.has(event.year) || event.text.length < byYear.get(event.year).text.length) {
                byYear.set(event.year, event);
            }
        }
        const unique = Array.from(byYear.values());

        return this.selectDiverse(unique, EVENTS_PER_GAME);
    },

    selectDiverse(events, count) {
        if (events.length <= count) return this.shuffle(events);

        // Bucket by century
        const buckets = new Map();
        for (const event of events) {
            const century = Math.floor(event.year / 100);
            if (!buckets.has(century)) buckets.set(century, []);
            buckets.get(century).push(event);
        }

        for (const [, bucket] of buckets) {
            this.shuffleInPlace(bucket);
        }

        // Round-robin pick from centuries for variety
        const selected = [];
        const centuries = Array.from(buckets.keys()).sort((a, b) => a - b);
        let idx = 0;
        while (selected.length < count) {
            const century = centuries[idx % centuries.length];
            const bucket = buckets.get(century);
            if (bucket.length > 0) {
                selected.push(bucket.pop());
            } else {
                centuries.splice(idx % centuries.length, 1);
                if (centuries.length === 0) break;
                continue;
            }
            idx++;
        }

        return this.shuffle(selected);
    },

    // ---- Custom Topic Search ----

    // MediaWiki API helper
    async wikiApi(params) {
        const qs = new URLSearchParams({ format: 'json', origin: '*', ...params });
        const r = await fetch(`https://en.wikipedia.org/w/api.php?${qs}`);
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
    },

    // Search Wikipedia for pages related to the topic
    async searchPages(topic) {
        const data = await this.wikiApi({
            action: 'query',
            list: 'search',
            srsearch: topic,
            srlimit: 10,
        });
        return (data.query?.search || []).map(p => p.title);
    },

    // Fetch rendered HTML for a page and parse events from it.
    // Works with tables (timeline pages), lists, and prose.
    async fetchAndParsePageEvents(title) {
        const slug = encodeURIComponent(title.replace(/ /g, '_'));
        const r = await fetch(`https://en.wikipedia.org/api/rest_v1/page/html/${slug}`, {
            headers: { 'Accept': 'text/html' }
        });
        if (!r.ok) return [];
        const html = await r.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');

        const events = [];
        const seen = new Set();

        const addEvent = (year, text) => {
            text = text.replace(/\[\d+\]/g, '').trim(); // strip citation brackets
            text = text.split(/\.\s/)[0].trim();         // first sentence only
            text = text.replace(/\.$/, '');
            // Reject fragments: must start with uppercase or digit, not a conjunction/preposition
            if (/^(and|but|or|nor|yet|so|the|which|that|while|as|also|with|from|for|to|by|at|it)\s/i.test(text) && /^[a-z]/.test(text)) {
                return;
            }
            // Must start with uppercase letter or digit (skip sentence fragments)
            if (text.length > 0 && !/^[A-Z0-9"'(]/.test(text)) {
                return;
            }
            if (year > 100 && year <= 2024 && text.length >= 15 && text.length < 200 && !seen.has(year)) {
                seen.add(year);
                events.push({ year, text });
            }
        };

        // Strategy 1: Parse table rows (timeline pages)
        const rows = doc.querySelectorAll('tr');
        for (const row of rows) {
            const cells = row.querySelectorAll('td, th');
            if (cells.length < 2) continue;
            const firstText = cells[0].textContent.trim();
            // Extract year from first cell (may contain full date like "4 October 1957")
            const ym = firstText.match(/\b(\d{3,4})\b/);
            if (!ym) continue;
            const year = parseInt(ym[1]);
            // Second cell is usually the event description
            const desc = cells[1].textContent.trim();
            if (desc.length >= 10) addEvent(year, desc);
        }

        // Strategy 2: Parse list items with years
        const listItems = doc.querySelectorAll('li');
        for (const li of listItems) {
            const text = li.textContent.trim();
            // "YYYY – description"
            let m = text.match(/^(\d{3,4})\s*[–\-—:]+\s*(.+)/);
            if (m) { addEvent(parseInt(m[1]), m[2]); continue; }
            // "In YYYY, description"
            m = text.match(/^[Ii]n\s+(\d{3,4}),?\s+(.{15,})/);
            if (m) { addEvent(parseInt(m[1]), m[2]); }
        }

        // Strategy 3: Parse paragraphs — extract sentences starting with "In YYYY"
        const paras = doc.querySelectorAll('p');
        for (const p of paras) {
            const text = p.textContent.trim();
            // Split into sentences and look for ones starting with "In YYYY"
            const sentences = text.split(/(?<=\.)\s+/);
            for (const sentence of sentences) {
                const m = sentence.match(/^[Ii]n\s+(\d{3,4}),?\s+(.{15,})/);
                if (m) addEvent(parseInt(m[1]), m[2]);
            }
        }

        return events;
    },

    // Main entry: search Wikipedia for topic-related events
    async searchTopicEvents(topic, statusCallback) {
        if (statusCallback) statusCallback(`Searching Wikipedia for "${topic}"...`);

        // Strategy: search for "Timeline of X", "History of X", and plain "X"
        const searchQueries = [
            `Timeline of ${topic}`,
            `History of ${topic}`,
            topic,
        ];

        // Find relevant page titles
        let allTitles = [];
        for (const q of searchQueries) {
            try {
                const titles = await this.searchPages(q);
                allTitles.push(...titles);
            } catch { /* continue */ }
        }

        // Deduplicate titles, prioritise timeline/history pages
        const uniqueTitles = [...new Set(allTitles)];
        uniqueTitles.sort((a, b) => {
            const scoreA = /^(timeline|history)/i.test(a) ? 0 : 1;
            const scoreB = /^(timeline|history)/i.test(b) ? 0 : 1;
            return scoreA - scoreB;
        });

        // Fetch content from top pages (limit to 5 to be respectful of API)
        const pagesToFetch = uniqueTitles.slice(0, 5);
        let allEvents = [];

        const promises = pagesToFetch.map(async (title) => {
            if (statusCallback) statusCallback(`Reading "${title}"...`);
            try {
                return await this.fetchAndParsePageEvents(title);
            } catch {
                return [];
            }
        });

        const results = await Promise.all(promises);
        allEvents = results.flat();

        // Deduplicate by year (keep first occurrence — timeline pages are parsed first)
        const byYear = new Map();
        for (const e of allEvents) {
            if (!byYear.has(e.year)) {
                byYear.set(e.year, e);
            }
        }

        const unique = Array.from(byYear.values());
        if (statusCallback) statusCallback(`Found ${unique.length} events`);
        return this.selectDiverse(unique, EVENTS_PER_GAME);
    },

    shuffle(arr) {
        const a = [...arr];
        this.shuffleInPlace(a);
        return a;
    },

    shuffleInPlace(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
};

// ============ Game State ============
class Game {
    constructor() {
        this.reset();
    }

    reset() {
        this.timeline = [];
        this.deck = [];
        this.currentCard = null;
        this.lives = MAX_LIVES;
        this.score = 0;
        this.difficulty = 'easy';
    }

    init(events, difficulty) {
        this.reset();
        this.difficulty = difficulty;
        const shuffled = WikipediaService.shuffle(events);

        // Seed the timeline with the first event
        this.timeline = [shuffled[0]];

        // Rest goes to the deck
        this.deck = shuffled.slice(1);

        // Draw first card
        this.currentCard = this.deck.pop();
    }

    isCorrectPosition(position) {
        const year = this.currentCard.year;
        const before = position > 0 ? this.timeline[position - 1] : null;
        const after = position < this.timeline.length ? this.timeline[position] : null;

        if (before && year < before.year) return false;
        if (after && year > after.year) return false;
        return true;
    }

    getCorrectPosition(year) {
        for (let i = 0; i < this.timeline.length; i++) {
            if (year <= this.timeline[i].year) return i;
        }
        return this.timeline.length;
    }

    placeCard(position) {
        const card = this.currentCard;
        const correct = this.isCorrectPosition(position);

        if (correct) {
            this.score++;
        } else {
            this.lives--;
        }

        // Always insert at the correct sorted position
        const correctPos = this.getCorrectPosition(card.year);
        this.timeline.splice(correctPos, 0, card);

        // Draw next card
        this.currentCard = this.deck.length > 0 ? this.deck.pop() : null;

        return {
            correct,
            event: card,
            insertedAt: correctPos,
            chosenPosition: position
        };
    }

    get isGameOver() {
        return this.lives <= 0 || this.currentCard === null;
    }

    get isWin() {
        return this.lives > 0 && this.currentCard === null;
    }
}

// ============ UI Controller ============
class GameUI {
    constructor() {
        this.game = new Game();
        this.isAnimating = false;
        this.bindElements();
        this.bindEvents();
    }

    bindElements() {
        this.screens = {
            start: document.getElementById('screen-start'),
            loading: document.getElementById('screen-loading'),
            game: document.getElementById('screen-game'),
            gameover: document.getElementById('screen-gameover'),
        };
        this.scoreEl = document.getElementById('score');
        this.livesEl = document.getElementById('lives');
        this.currentCardEl = document.getElementById('current-card');
        this.currentTextEl = document.getElementById('current-event-text');
        this.timelineEl = document.getElementById('timeline');
        this.toastEl = document.getElementById('feedback-toast');
        this.instructionEl = document.getElementById('instruction');
        this.loadingStatus = document.getElementById('loading-status');
        this.finalScoreEl = document.getElementById('final-score');
        this.finalTimelineEl = document.getElementById('final-timeline');
        this.gameoverTitleEl = document.getElementById('gameover-title');
        this.gameoverIconEl = document.getElementById('gameover-icon');
        this.gameoverMsgEl = document.getElementById('gameover-message');
    }

    bindEvents() {
        // Difficulty buttons on the start screen
        document.querySelectorAll('.btn-difficulty').forEach(btn => {
            btn.addEventListener('click', () => {
                const difficulty = btn.dataset.difficulty;
                this.startGame(difficulty);
            });
        });

        // Custom topic mode
        const customBtn = document.getElementById('btn-custom');
        const customArea = document.getElementById('custom-input-area');
        const customInput = document.getElementById('custom-topic');
        const customGo = document.getElementById('btn-go');
        const customError = document.getElementById('custom-error');

        customBtn.addEventListener('click', () => {
            customArea.classList.toggle('hidden');
            customError.classList.add('hidden');
            if (!customArea.classList.contains('hidden')) {
                customInput.focus();
            }
        });

        customGo.addEventListener('click', () => this.startCustomGame());
        customInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.startCustomGame();
        });

        document.getElementById('btn-replay').addEventListener('click', () => {
            // Reset the custom input area when returning to start
            customArea.classList.add('hidden');
            customError.classList.add('hidden');
            customInput.value = '';
            this.showScreen('start');
        });
    }

    showScreen(name) {
        for (const [key, el] of Object.entries(this.screens)) {
            el.classList.toggle('active', key === name);
        }
    }

    async startGame(difficulty) {
        this.showScreen('loading');

        // Strategy: curated events are the backbone for Easy/Medium (quality guarantee).
        // Wikipedia events supplement Medium and are primary for Hard (more obscure).
        const curated = WikipediaService.shuffle(EVENT_POOLS[difficulty] || EASY_EVENTS);

        let wikiEvents = [];
        if (difficulty === 'hard' || difficulty === 'medium') {
            try {
                wikiEvents = await WikipediaService.fetchEvents(difficulty, (status) => {
                    this.loadingStatus.textContent = status;
                });
            } catch {
                wikiEvents = [];
            }
        }

        let events;
        if (difficulty === 'easy') {
            // Easy: curated only — these are guaranteed well-known
            this.loadingStatus.textContent = 'Preparing well-known events...';
            events = curated.slice(0, EVENTS_PER_GAME);
        } else if (difficulty === 'medium') {
            // Medium: curated first, fill remaining slots with Wikipedia
            const curatedYears = new Set(curated.map(e => e.year));
            const wikiFiltered = wikiEvents.filter(e => !curatedYears.has(e.year));
            events = [...curated, ...WikipediaService.shuffle(wikiFiltered)]
                .slice(0, EVENTS_PER_GAME);
        } else {
            // Hard: Wikipedia first (obscure events), curated as backup
            if (wikiEvents.length >= 12) {
                const wikiYears = new Set(wikiEvents.map(e => e.year));
                const curatedFiltered = curated.filter(e => !wikiYears.has(e.year));
                events = [...wikiEvents, ...WikipediaService.shuffle(curatedFiltered)]
                    .slice(0, EVENTS_PER_GAME);
            } else {
                events = curated.slice(0, EVENTS_PER_GAME);
            }
        }

        this.game.init(events, difficulty);
        this.showScreen('game');
        this.renderAll();
    }

    async startCustomGame() {
        const input = document.getElementById('custom-topic');
        const errorEl = document.getElementById('custom-error');
        const topic = input.value.trim();

        if (!topic) {
            errorEl.textContent = 'Please enter a topic.';
            errorEl.classList.remove('hidden');
            return;
        }

        errorEl.classList.add('hidden');
        this.showScreen('loading');

        let events;
        try {
            events = await WikipediaService.searchTopicEvents(topic, (status) => {
                this.loadingStatus.textContent = status;
            });
        } catch {
            events = [];
        }

        if (events.length < 5) {
            // Not enough events found — go back and show error
            this.showScreen('start');
            document.getElementById('custom-input-area').classList.remove('hidden');
            errorEl.textContent = `Only found ${events.length} events for "${topic}". Try a broader topic.`;
            errorEl.classList.remove('hidden');
            return;
        }

        this.game.init(events, 'custom');
        this.game.topicName = topic;
        this.showScreen('game');
        this.renderAll();
    }

    renderAll() {
        this.renderScore();
        this.renderLives();
        this.renderCurrentCard();
        this.renderTimeline();
    }

    renderScore() {
        this.scoreEl.textContent = this.game.score;
    }

    renderLives() {
        let html = '';
        for (let i = 0; i < MAX_LIVES; i++) {
            const lost = i >= this.game.lives;
            html += `<span class="life ${lost ? 'lost' : ''}">⏳</span>`;
        }
        this.livesEl.innerHTML = html;
    }

    renderCurrentCard() {
        const card = this.game.currentCard;
        if (!card) return;

        this.currentTextEl.textContent = card.text;
        this.currentCardEl.style.animation = 'none';
        this.currentCardEl.offsetHeight; // reflow
        this.currentCardEl.style.animation = 'fadeInUp 0.4s ease';
    }

    renderTimeline() {
        this.timelineEl.innerHTML = '';
        const timeline = this.game.timeline;

        for (let i = 0; i <= timeline.length; i++) {
            // Drop zone
            const dz = document.createElement('button');
            dz.className = 'drop-zone';
            dz.innerHTML = '<span class="drop-icon">+</span>';
            dz.setAttribute('aria-label', `Place event at position ${i}`);
            const pos = i;
            dz.addEventListener('click', () => this.handlePlace(pos));
            this.timelineEl.appendChild(dz);

            // Event card
            if (i < timeline.length) {
                const event = timeline[i];
                const card = document.createElement('div');
                card.className = 'timeline-card';
                card.id = `tcard-${i}`;
                card.innerHTML = `
                    <div class="timeline-year">${event.year}</div>
                    <div class="timeline-text">${this.truncate(event.text, 80)}</div>
                `;
                this.timelineEl.appendChild(card);
            }
        }

        // Scroll to center
        requestAnimationFrame(() => {
            const scroll = this.timelineEl.closest('.timeline-scroll');
            if (scroll) {
                scroll.scrollLeft = (scroll.scrollWidth - scroll.clientWidth) / 2;
            }
        });
    }

    handlePlace(position) {
        if (this.isAnimating || this.game.isGameOver) return;
        this.isAnimating = true;

        const result = this.game.placeCard(position);

        // Re-render timeline with the new card highlighted
        this.renderTimeline();

        const insertedCard = document.getElementById(`tcard-${result.insertedAt}`);
        if (insertedCard) {
            insertedCard.classList.add('just-placed');
            insertedCard.classList.add(result.correct ? 'correct' : 'wrong');

            requestAnimationFrame(() => {
                insertedCard.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            });
        }

        this.showToast(result);
        this.renderScore();
        this.renderLives();

        setTimeout(() => {
            if (insertedCard) {
                insertedCard.classList.remove('correct', 'wrong');
            }

            if (this.game.isGameOver) {
                this.showGameOver();
            } else {
                this.renderCurrentCard();
            }
            this.isAnimating = false;
        }, 1500);
    }

    showToast(result) {
        const { correct, event } = result;
        this.toastEl.className = `feedback-toast ${correct ? 'correct' : 'wrong'} show`;

        if (correct) {
            this.toastEl.textContent = `✓ Correct! (${event.year})`;
        } else {
            this.toastEl.textContent = `✗ Nope — that was ${event.year}`;
        }

        setTimeout(() => {
            this.toastEl.classList.remove('show');
        }, 1200);
    }

    showGameOver() {
        const isWin = this.game.isWin;
        const diff = this.game.difficulty;
        const diffLabel = diff.charAt(0).toUpperCase() + diff.slice(1);

        if (isWin) {
            this.gameoverIconEl.textContent = '🏆';
            this.gameoverTitleEl.textContent = 'YOU WIN!';
        } else {
            this.gameoverIconEl.textContent = '⏰';
            this.gameoverTitleEl.textContent = 'TIMED OUT!';
        }

        this.gameoverMsgEl.textContent = this.getGameOverMessage(this.game.score, isWin, diff);
        this.finalScoreEl.textContent = this.game.score;

        // Render the final timeline
        this.finalTimelineEl.innerHTML = '';
        for (const event of this.game.timeline) {
            const card = document.createElement('div');
            card.className = 'mini-card';
            card.innerHTML = `
                <div class="mini-year">${event.year}</div>
                <div class="mini-text">${this.truncate(event.text, 50)}</div>
            `;
            this.finalTimelineEl.appendChild(card);
        }

        setTimeout(() => {
            this.showScreen('gameover');
        }, 600);
    }

    getGameOverMessage(score, isWin, difficulty) {
        const topicName = this.game.topicName;
        if (isWin) {
            if (difficulty === 'custom') return `Perfect! You nailed every "${topicName}" event!`;
            if (difficulty === 'hard') return "Incredible! You mastered the hardest events!";
            if (difficulty === 'medium') return "Impressive — you nailed every event!";
            return "Perfect run! Ready for a harder challenge?";
        }
        if (difficulty === 'custom') {
            if (score <= 2) return `"${topicName}" is trickier than you thought!`;
            if (score <= 5) return `Not bad for "${topicName}"! Give it another shot.`;
            return `Impressive "${topicName}" knowledge!`;
        }
        if (score <= 2) return "History is full of surprises — try again!";
        if (score <= 5) return "Not bad! You've got some historical sense.";
        if (score <= 10) return "Great job! You really know your history.";
        return "Amazing! You're practically a time traveler!";
    }

    truncate(text, maxLen) {
        if (text.length <= maxLen) return text;
        return text.substring(0, maxLen).replace(/\s+\S*$/, '') + '…';
    }
}

// ============ Initialize ============
document.addEventListener('DOMContentLoaded', () => {
    new GameUI();
});
