export const categories = [
  { id: "greetings", name: "Greetings", icon: "👋" },
  { id: "directions", name: "Directions", icon: "🗺️" },
  { id: "restaurant", name: "Restaurant", icon: "🍽️" },
  { id: "emergency", name: "Emergency", icon: "🚨" },
];

export const phrases: Record<string, { german: string; english: string; pronunciation: string }[]> = {
  greetings: [
    { german: "Guten Tag", english: "Good day / Hello", pronunciation: "GOO-ten tahk" },
    { german: "Wie geht es Ihnen?", english: "How are you? (formal)", pronunciation: "vee gayt es EE-nen" },
    { german: "Sprechen Sie Englisch?", english: "Do you speak English?", pronunciation: "SHPREH-khen zee ENG-lish" },
    { german: "Entschuldigung", english: "Excuse me / Sorry", pronunciation: "ent-SHOOL-di-goong" }
  ],
  directions: [
    { german: "Wo ist...?", english: "Where is...?", pronunciation: "voh ist" },
    { german: "Wie komme ich zum Bahnhof?", english: "How do I get to the train station?", pronunciation: "vee KOM-meh ikh tsum BAHN-hohf" },
    { german: "Links / Rechts", english: "Left / Right", pronunciation: "links / rekhts" },
    { german: "Geradeaus", english: "Straight ahead", pronunciation: "geh-RAH-deh-ows" }
  ],
  restaurant: [
    { german: "Ich hätte gern...", english: "I would like...", pronunciation: "ikh HET-teh gairn" },
    { german: "Die Rechnung, bitte", english: "The bill, please", pronunciation: "dee REKH-noong BIT-teh" },
    { german: "Ist das vegetarisch?", english: "Is this vegetarian?", pronunciation: "ist das veh-geh-TAH-rish" },
    { german: "Das war sehr lecker", english: "That was very delicious", pronunciation: "das vahr zair LEK-ker" }
  ],
  emergency: [
    { german: "Hilfe!", english: "Help!", pronunciation: "HIL-feh" },
    { german: "Rufen Sie einen Arzt", english: "Call a doctor", pronunciation: "ROO-fen zee I-nen artst" },
    { german: "Wo ist das Krankenhaus?", english: "Where is the hospital?", pronunciation: "voh ist das KRAN-ken-hows" },
    { german: "Ich verstehe nicht", english: "I don't understand", pronunciation: "ikh fer-SHTAY-eh nikht" }
  ]
};
