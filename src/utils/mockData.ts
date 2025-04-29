import { Article, Category } from '../types';

// Helper function to create dates relative to current time
const getRelativeDate = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'New AI Model Breaks Records in Natural Language Understanding',
    description: 'A revolutionary AI model has demonstrated unprecedented capabilities in understanding and generating human language, surpassing previous benchmarks by a significant margin.',
    content: `Researchers at OpenAI have unveiled a groundbreaking artificial intelligence model that demonstrates remarkable proficiency in understanding and generating human language. The model, trained on a diverse dataset of text from the internet, has set new records on various language understanding benchmarks.

According to the researchers, the new model exhibits a deeper comprehension of context, nuance, and implicit meaning in text compared to its predecessors. "We're seeing capabilities that suggest a fundamental leap in how these systems process language," said Dr. Emma Rodriguez, lead researcher on the project.

The model's applications range from improved virtual assistants to more sophisticated content creation tools. However, the researchers also acknowledge potential risks, including the generation of misleading information if not properly constrained.

The team has emphasized their commitment to responsible deployment, implementing safeguards to prevent misuse of the technology.`,
    author: 'Jane Smith',
    source: 'Tech Chronicle',
    url: 'https://example.com/tech-chronicle/ai-breakthrough',
    imageUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
    category: 'technology',
    publishedAt: getRelativeDate(0),
    trending: true,
  },
  {
    id: '2',
    title: 'Global Markets Reach All-Time High as Economic Recovery Accelerates',
    description: 'Stock markets worldwide have surged to unprecedented levels as economic indicators suggest a faster-than-expected recovery from recent downturns.',
    content: `Global financial markets achieved record highs today as investors responded to a series of positive economic indicators suggesting a robust recovery is underway. Major indices in the United States, Europe, and Asia all posted significant gains, with several reaching unprecedented levels.

The rally appears driven by stronger-than-expected employment figures, robust consumer spending, and diminishing inflationary pressures. "We're seeing a convergence of positive factors that are restoring investor confidence," explained Michael Chen, chief market strategist at Global Investments.

Central banks have indicated they may begin easing monetary policy sooner than previously anticipated, further fueling market optimism. However, some analysts urge caution, noting that valuations in certain sectors have reached potentially unsustainable levels.

"While the overall economic picture is improving, investors should remain selective and vigilant about potential corrections in overheated segments of the market," advised financial analyst Sarah Johnson.`,
    author: 'Michael Johnson',
    source: 'Financial Times',
    url: 'https://example.com/financial-times/markets-high',
    imageUrl: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg',
    category: 'business',
    publishedAt: getRelativeDate(1),
    trending: true,
  },
  {
    id: '3',
    title: 'Breakthrough Cancer Treatment Shows Promise in Clinical Trials',
    description: 'A novel therapeutic approach has demonstrated significant efficacy against multiple cancer types in early-stage clinical trials, offering hope for patients with limited treatment options.',
    content: `A pioneering cancer treatment approach has shown remarkable results in early clinical trials, potentially opening new avenues for patients with previously untreatable forms of the disease. The therapy, which combines targeted immunotherapy with precision genetic modification, has demonstrated efficacy across multiple cancer types.

In the Phase I trial involving 78 patients with advanced-stage cancers that had not responded to conventional treatments, 62% showed significant tumor reduction, with 28% experiencing complete remission.

"These results are unprecedented for patients at this stage of disease," said Dr. Robert Anderson, the lead oncologist for the trial. "While we must remain cautious until larger studies are completed, this represents a potentially transformative approach to cancer treatment."

The research team is now preparing for expanded Phase II trials, which will involve a larger patient population and more diverse cancer types. If successful, the treatment could be available to patients within five years.`,
    author: 'Sarah Williams',
    source: 'Health Science Journal',
    url: 'https://example.com/health-science/cancer-breakthrough',
    imageUrl: 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg',
    category: 'health',
    publishedAt: getRelativeDate(2),
    trending: false,
  },
  {
    id: '4',
    title: 'Major Film Studio Announces Expansion into Streaming Platform',
    description: 'One of Hollywood\'s oldest studios is launching its own streaming service, challenging established players in the increasingly competitive digital entertainment landscape.',
    content: `Legacy Pictures, one of Hollywood's most venerable film studios, announced plans today to launch its own dedicated streaming platform, entering an already crowded digital entertainment marketplace. The service, named LegacyMax, will feature the studio's extensive catalog of classic films alongside new, exclusive content.

"This represents the next chapter in our studio's storied history," said CEO Victoria Reynolds during a press conference. "We're bringing our century of storytelling expertise directly to audiences worldwide."

The announcement comes as traditional studios increasingly pivot toward direct-to-consumer models in response to changing viewer habits. Industry analysts note that while the streaming market is becoming increasingly saturated, Legacy's vast content library gives it a competitive advantage.

The service will launch in North America next quarter, with a global rollout planned for the following year. Subscription pricing is expected to be competitive with existing major platforms.`,
    author: 'Robert Davis',
    source: 'Entertainment Weekly',
    url: 'https://example.com/entertainment/studio-streaming',
    imageUrl: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
    category: 'entertainment',
    publishedAt: getRelativeDate(1),
    trending: true,
  },
  {
    id: '5',
    title: 'Astronomers Discover Earth-Like Planet in Habitable Zone',
    description: 'Scientists have identified a planet with characteristics remarkably similar to Earth orbiting a sun-like star within its habitable zone, making it a prime candidate for future exploration.',
    content: `An international team of astronomers has announced the discovery of a potentially habitable exoplanet orbiting a sun-like star approximately 42 light-years from Earth. The planet, designated Kepler-687b, is located within its star's habitable zone and appears to have conditions that could potentially support life.

Initial observations indicate that Kepler-687b is approximately 1.2 times the size of Earth with a similar density, suggesting a rocky composition. Spectroscopic analysis has detected the presence of an atmosphere containing water vapor and other compounds essential for life as we understand it.

"This is among the most Earth-like planets we've discovered to date," explained Dr. James Wong, lead astronomer on the project. "The similarities in size, composition, and orbital characteristics make it an exceptional candidate for further study."

The research team plans to conduct follow-up observations using the James Webb Space Telescope to obtain more detailed information about the planet's atmospheric composition and surface conditions.`,
    author: 'Emily Chen',
    source: 'Astronomy Today',
    url: 'https://example.com/astronomy/earth-like-planet',
    imageUrl: 'https://images.pexels.com/photos/355935/pexels-photo-355935.jpeg',
    category: 'science',
    publishedAt: getRelativeDate(3),
    trending: false,
  },
  {
    id: '6',
    title: 'Underdog Team Makes Stunning Championship Run',
    description: 'A team that began the season with low expectations has defied the odds to reach the championship finals, captivating fans worldwide with their inspiring journey.',
    content: `In what sports commentators are calling one of the most remarkable underdog stories in recent memory, the Riverside Raptors have secured a spot in the national championship finals after a season that began with minimal expectations. The team, which was widely predicted to finish near the bottom of the standings, has mounted an extraordinary run through the playoffs, defeating several top-seeded opponents.

"What this team has accomplished goes beyond sports," said head coach Marcus Johnson. "It's a testament to perseverance, teamwork, and believing in yourself when others don't."

The Raptors' success has been built on a combination of tactical innovation, exceptional team chemistry, and breakout performances from several previously unheralded players. Rookie point guard Jamal Williams has emerged as a particular star, averaging 24 points and 8 assists during the playoff run.

The championship final begins next week, where the Raptors will face the defending champions in what promises to be a compelling clash of contrasting styles and narratives.`,
    author: 'Carlos Rodriguez',
    source: 'Sports Network',
    url: 'https://example.com/sports/underdog-championship',
    imageUrl: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg',
    category: 'sports',
    publishedAt: getRelativeDate(0),
    trending: true,
  },
  {
    id: '7',
    title: 'Landmark Climate Legislation Passes with Bipartisan Support',
    description: 'In a rare display of cross-party cooperation, lawmakers have approved comprehensive climate legislation that sets ambitious targets for emissions reduction and renewable energy adoption.',
    content: `In a significant legislative achievement, Congress has passed a sweeping climate bill with support from both major political parties. The legislation, titled the Climate Action and Energy Transition Act, establishes ambitious targets for greenhouse gas reduction and provides substantial funding for renewable energy development and climate resilience projects.

The bill mandates a 50% reduction in carbon emissions by 2035 and net-zero emissions by 2050. It also allocates $300 billion over the next decade for clean energy infrastructure, research, and workforce development.

"This represents a turning point in our nation's approach to the climate crisis," said Senator Eleanor Martinez, one of the bill's lead sponsors. "By working across the aisle, we've crafted a solution that addresses environmental imperatives while ensuring economic opportunities."

Environmental organizations have largely praised the legislation, though some advocacy groups argue the timeline should be accelerated. Industry representatives have expressed cautious optimism, noting the bill provides predictability for long-term planning and investment.`,
    author: 'Thomas Anderson',
    source: 'Washington Post',
    url: 'https://example.com/politics/climate-legislation',
    imageUrl: 'https://images.pexels.com/photos/2990650/pexels-photo-2990650.jpeg',
    category: 'politics',
    publishedAt: getRelativeDate(2),
    trending: false,
  },
  {
    id: '8',
    title: 'Innovative Urban Transport System Launched in Major City',
    description: 'A groundbreaking public transportation network combining autonomous vehicles and smart infrastructure has begun operations, promising to revolutionize urban mobility.',
    content: `A major metropolitan area has unveiled a first-of-its-kind integrated urban transport system that combines autonomous electric shuttles, smart infrastructure, and an AI-powered traffic management platform. The system, which has been under development for five years, aims to dramatically reduce congestion, lower emissions, and improve mobility throughout the city.

The network features a fleet of 200 self-driving electric shuttles that operate on dedicated lanes but can also navigate regular streets when necessary. The vehicles communicate with each other and with smart traffic signals to optimize routes and minimize travel time.

"This represents a fundamental rethinking of urban transportation," explained Dr. Sophia Chang, the project's chief engineer. "Rather than simply adding more vehicles or lanes, we've created an intelligent system that maximizes efficiency and sustainability."

Early data from the system's first weeks of operation shows a 30% reduction in travel times along major corridors and a significant decrease in emissions. City officials are already fielding inquiries from other municipalities interested in implementing similar solutions.`,
    author: 'David Wilson',
    source: 'Urban Innovation Journal',
    url: 'https://example.com/technology/urban-transport',
    imageUrl: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg',
    category: 'technology',
    publishedAt: getRelativeDate(1),
    trending: false,
  },
];

export const categories: Category[] = [
  'technology',
  'business',
  'entertainment',
  'health',
  'science',
  'sports',
  'politics'
];