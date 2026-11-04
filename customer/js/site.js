const indicativePrices = Object.freeze({
  linear: 400,
  hexagonal: 450,
  interlocking: 500,
  square: 450,
  decorative: 550,
});

const copy = {
  rw: {
    text: {
      'Skip to content': 'Jya ku bikubiye ku rupapuro',
      'PAVERS / RECYCLED PLASTIC + SAND': 'AMAPAVE / PULASITIKI YONGEYE GUKORESHWA + UMUCANGA',
      'MADE WITH RECYCLED PLASTIC + SAND': 'BIKOZWE MU PULASITIKI YONGEYE GUKORESHWA + UMUCANGA',
      'Toggle navigation': 'Fungura cyangwa ufunge imiterere y’urubuga',
      'GREENPAVERS home': 'Ahabanza kuri GREENPAVERS',
      'Choose language': 'Hitamo ururimi',
      'Main navigation': 'Imiterere y’urubuga',
      'Made with recycled plastic and sand': 'Bikozwe muri pulasitiki yongeye gukoreshwa n’umucanga',
      'About': 'Ibyerekeye GREENPAVERS',
      'Pavers': 'Amapave yo gutunganya inzira',
      'Our process': 'Uko tuyakora',
      'Gallery': 'Amafoto',
      'Contact': 'Twandikire',
      'Request pavers': 'Saba amapave',
      'PAVERS FROM RECYCLED PLASTIC + SAND': 'Amapave akozwe mu bikoresho byasubiwemo',
      'A better ground': 'Ubutaka bwiza',
      'to': 'bwo',
      'build on.': 'kubakaho.',
      'GREENPAVERS makes pavers from recycled plastic and sand for paths, courtyards and outdoor spaces.': 'GREENPAVERS ikora amapave mu pulasitiki yongeye gukoreshwa n’umucanga, akoreshwa mu nzira, mu mbuga no ahandi hanze.',
      'Explore products': 'Reba amapave dukora',
      'RECYCLED PLASTIC.': 'IMYANDA, IHAWE UNDI MUMARO.',
      'MADE INTO PAVERS.': 'INZIRA, MU ISURA NSHYA.',
      'GREENPAVERS MATERIALS': 'IBIKORESHO BYA GREENPAVERS',
      'MADE FROM': 'BIKOZWE MU',
      'RECLAIMED': 'BIKORESHO',
      'MATERIALS': 'BYONGEYE GUKORESHWA',
      'DESIGNED FOR REAL PLACES': 'BIKOZWE KU AHANTU NYAHO',
      'RECYCLED PLASTIC': 'PULASITIKI YONGEYE GUKORESHWA',
      'SAND': 'UMUCANGA',
      'SCROLL TO EXPLORE': 'KOMEZA UREBE',
      '01 / WHAT WE MAKE': '01 / UBWOKO BUSHYA BW’AMAPAVE',
      'GREENPAVERS / MATERIALS': 'GREENPAVERS / IBIKORESHO',
      '01 / OUR POINT OF VIEW': '01 / UKO TUBONA IBINTU',
      'MADE FOR REAL PLACES': 'BIKOZWE KU AHANTU NYAHO',
      '02 / WHAT GUIDES US': '02 / IBITUREBERA',
      'THREE SIMPLE PRINCIPLES': 'AMAHAME ATATU YOROHEJE',
      'HAVE A PLACE IN MIND?': 'UFITE AHANTU UTEKEREZA?',
      'LET’S TALK MATERIALS.': 'REKA TUGANIRE KU BIKORESHO.',
      'LET’S MAKE IT A LITTLE MORE RESOURCEFUL.': 'REKA DUKORESHE NEZA IBIRIMO.',
      'READY TO TAKE A CLOSER LOOK?': 'WITEGUYE KUREBA NEZA?',
      'LET’S TALK ABOUT YOUR PROJECT.': 'REKA TUGANIRE KU MUSHINGA WAWE.',
      'LET’S MAKE SOMETHING USEFUL.': 'REKA DUKORE IKINTU GIFITE UMUMARO.',
      'MATERIAL, WITH INTENTION': 'IBIKORESHO, BYAHISEMO NEZA',
      'MATERIALS, WITH INTENTION': 'IBIKORESHO, BYAHISEMO NEZA',
      'THE GREENPAVERS RANGE / 02': 'UBWOKO BWA GREENPAVERS / 02',
      '01 / PAVERS': '01 / AMAPAVE',
      'THREE WAYS TO LAY IT OUT': 'UBURYO BUTATU BWO KUYATONDEKA',
      '02 / PAVERS': '02 / AMAPAVE',
      'THE MAKING': 'UKO BIKORWA',
      'RECOVER / PREPARE / FORM': 'KUSANYA / GUTEGURA / GUKORA',
      '01 / THE MAKING': '01 / UKO BIKORWA',
      'RECOVER / PREPARE / FORM': 'KUSANYA / GUTEGURA / GUKORA',
      'MATERIALS IN VIEW / 04': 'KUREBA IBIKORESHO / 04',
      'OUR MATERIALS': 'IBIKORESHO BYACU',
      'PRODUCT RANGE': 'UBWOKO BW’IBICURUZWA',
      '01 / FORM': '01 / ISHUSHO',
      '02 / FORM': '02 / ISHUSHO',
      '03 / FORM': '03 / ISHUSHO',
      'OUR PROCESS': 'UBURYO DUKORA',
      '/ RECOVER': '/ KUSANYA',
      '/ COMBINE': '/ KUVANGA',
      '/ FORM': '/ GUKORA ISHUSHO',
      'GALLERY': 'AMAFOTO',
      'YOUR PROJECT COULD BE NEXT': 'UMUSHINGA WAWE WABA UTAHA',
      'GREENPAVERS / PROJECT ENQUIRIES': 'GREENPAVERS / IBIBAZO BY’IMISHINGA',
      '01 / SHARE': '01 / SANGIZA AMAKURU',
      '02 / EXPLORE': '02 / SHAKISHA',
      '03 / PREPARE': '03 / TEGURA',
      '01 / IN PLACE': '01 / MU MWANYA WABYO',
      '02 / THE DETAIL': '02 / IBISOBANURO',
      '01 / THE COLLECTION': '01 / AMAFOTO',
      'REFERENCE PHOTOS / NOT GREENPAVERS PROJECTS': 'AMASHUSHO Y’AGATEGANYO / AMAFOTO AZONGERWAMO',
      '01 / LET’S TALK': '01 / REKA TUGANIRE',
      'NO PROJECT TOO EARLY': 'UMUSHINGA WABA UTARAMBIRIRA',
      'PROJECT ENQUIRY / 06': 'KUBAZA KU MUSHINGA / 06',
      'GREENPAVERS / CUSTOMER': 'GREENPAVERS / ABAGUZI',
      '02 / FROM MATERIAL TO PLACE': '02 / KUVA KU GIKORESHO KUGEZA KU NZIRA',
      '03 / FROM MATERIAL TO PLACE': '03 / KUVA KU GIKORESHO KUGEZA KU NZIRA',
      '04 / A CLOSER LOOK': '04 / TUREBE NEZA',
      'REFERENCE PAVER PHOTOS': 'GREENPAVERS MU BIKORWA',
      '01 / YOUR PROJECT': '01 / UMUSHINGA WAWE',
      'ALL FIELDS WITH * ARE REQUIRED': 'AHARI * HAGOMBA KUZUZWA',
      'Preferred color': 'Ibara wifuza',
      'Delivery required?': 'Ukeneye ko tubigeza aho uri?',
      'Questions about the process?': 'Ufite ikibazo ku buryo bikorwa?',
      'Learn about our process': 'Menya uko tubikora',
      'See the pavers': 'Reba amapave',
      'Explore the process': 'Reba uko bikorwa',
      'Visit the gallery': 'Reba amafoto',
      'Meet the pavers': 'Menya amapave',
      'Discuss your project': 'Vuga ku mushinga wawe',
      'Talk through an application': 'Tuganire ku mikoreshereze yayo',
      'Open the request form': 'Fungura urupapuro rwo gusaba',
      'Browse pavers': 'Reba amapave',
      'Make a paver request': 'Saba amapave',
      'Talk about a project': 'Vuga ku mushinga',
      'View all pavers': 'Reba amapave yose',
      'PAVERS / RECYCLED PLASTIC + SAND': 'AMAPAVE AKOZWE MU PULASITIKI YONGEYE GUKORESHWA N’UMUCANGA',
      'PAVERS FROM RECYCLED PLASTIC + SAND': 'AMAPAVE AKOZWE MU PULASITIKI YONGEYE GUKORESHWA',
      'RECYCLED PLASTIC.': 'PULASITIKI YONGEYE GUKORESHWA.',
      'MADE INTO PAVERS.': 'BIKORWAMO AMAPAVE.',
      'GREENPAVERS makes pavers from recycled plastic and sand for paths, courtyards and outdoor spaces.': 'GREENPAVERS ikora amapave mu pulasitiki yongeye gukoreshwa n’umucanga, akoreshwa mu nzira, mu mbuga no ahandi hanze.',
      'GREENPAVERS combines recycled plastic and sand to make paving blocks for outdoor spaces.': 'GREENPAVERS ihuza pulasitiki yongeye gukoreshwa n’umucanga, igakora amapave akoreshwa hanze.',
      'We make pavers from recycled plastic and sand in three styles: interlocking, linear and landscape.': 'Dukora amapave mu pulasitiki yongeye gukoreshwa n’umucanga, mu moko atatu: afungana, y’urukiramende n’ayo mu busitani.',
      'Choose a paver style.': 'Hitamo ubwoko bw’amapave.',
      'Interlocking blocks for paths and courtyards.': 'Amapave ahuza akoreshwa mu nzira no mu mbuga.',
      'Long rectangular blocks for walkways and edges.': 'Amapave maremare y’urukiramende akoreshwa mu nzira no ku mbibi.',
      'Modular blocks for garden paths and outdoor spaces.': 'Amapave atondekwa mu buryo butandukanye, akoreshwa mu busitani no hanze.',
      'These names describe the three paver styles. Confirm sizes, finishes and suitability for your project.': 'Aya mazina agaragaza ubwoko butatu bw’amapave. Banza wemeze ingano, imiterere n’aho akwiriye gukoreshwa.',
      'GREENPAVERS combines recycled plastic and sand, then forms the material into paving blocks.': 'GREENPAVERS ivanga pulasitiki yongeye gukoreshwa n’umucanga, hanyuma ikabikoramo amapave.',
      'The exact production method and product specifications have not been confirmed. This page gives a general overview of the materials.': 'Uburyo nyabwo bwo gukora n’ibisobanuro by’igicuruzwa ntibiramenyekana. Uru rupapuro rusobanura ibikoresho muri rusange.',
      'The material is formed into pavers. Confirm product details before choosing them for a project.': 'Ibyo bikoresho bikorwamo amapave. Banza wemeze ibisobanuro by’igicuruzwa mbere yo kugikoresha mu mushinga.',
      'These reference photos show concrete paver patterns and paved outdoor spaces. They are examples, not GREENPAVERS projects.': 'Aya ni amafoto y’urugero agaragaza amapave n’inzira zikozeho. Ntabwo ari ibicuruzwa cyangwa imishinga bya GREENPAVERS.',
      'These are reference photos from Wikimedia Commons. They show paving examples, not GREENPAVERS products or projects. Replace them with owner photos when available.': 'Aya ni amafoto y’urugero yo muri Wikimedia Commons. Ntabwo agaragaza ibicuruzwa cyangwa imishinga bya GREENPAVERS. Azasimbuzwa amafoto nyayo igihe azaboneka.',
      'Tell us where the project is and what you need. Use the request form to send the details.': 'Tubwire aho umushinga uri n’ibyo ukeneye. Koresha urupapuro rwo gusaba amapave utwoherereze ibisobanuro.',
      'We do not yet have confirmed phone or email details to publish. For now, please use the project request form.': 'Ntabwo turabona nimero ya telefoni cyangwa imeyili byemejwe byo gushyira ku rubuga. Kugeza ubu, koresha urupapuro rwo gusaba amapave.',
      'Tell us the project location, what the space will be used for and how many pavers you need.': 'Tubwire aho umushinga uri, icyo aho hantu hazakoreshwa n’ingano y’amapave ukeneye.',
      'Tell us where the project is, which pavers you need, the quantity and whether you need delivery.': 'Tubwire aho umushinga uri, ubwoko bw’amapave ukeneye, ingano yayo n’uko ukeneye ko tuyakugezaho.',
      'Complete the required fields. We will confirm product suitability, price and delivery for your project.': 'Uzuza ibisabwa. Tuzemeza niba amapave akwiriye umushinga wawe, igiciro n’uko yatangwa.',
      'Approximate quantity (pavers or m2)': 'Ingano ukeneye (umubare w’amapave cyangwa m²)',
      'Your request is saved for review. Do not include payment details or other sensitive information.': 'Ubusabe bwawe burabitswe kugira ngo busuzumwe. Ntushyiremo amakuru yo kwishyura cyangwa andi makuru y’ibanga.',
      'GREENPAVERS makes paving blocks by combining recycled plastic and sand.': 'GREENPAVERS ikora amapave ihuza pulasitiki yongeye gukoreshwa n’umucanga.',
      'Paving blocks are used in paths, courtyards and other outdoor spaces. We make them using recycled plastic and sand.': 'Amapave akoreshwa mu nzira, mu mbuga no ahandi hanze. Tuyakora mu pulasitiki yongeye gukoreshwa n’umucanga.',
      'GREENPAVERS makes paving blocks from recycled plastic and sand. The range includes interlocking, linear and landscape styles.': 'GREENPAVERS ikora amapave mu pulasitiki yongeye gukoreshwa n’umucanga. Ubwoko burimo amapave afungana, ay’urukiramende n’ayo mu busitani.',
      'We will share confirmed product details and ask about your project needs.': 'Tuzatanga ibisobanuro by’ibicuruzwa byemejwe kandi tubaze ibyo umushinga wawe ukeneye.',
      'MATERIAL / BEFORE THE MOULD': 'IBIKORESHO / MBERE YO GUKORA AMAPAVE',
      'MATERIAL / BEFORE THEY BECOME SURFACE': 'IBIKORESHO / MBERE YO GUKORAMO INZIRA',
      'Reference photo: interlocking pavers': 'Ishusho / ahuza',
      'Reference photo: colored pavers': 'Ishusho / maremare',
      'Reference photo: paved walkway': 'Mu mwanya / inzira yo mu busitani',
      'Detail / texture and edge': 'Ibisobanuro / imiterere n’imbibi',
      'Reference photo: paver surface': 'Ibikoresho / mbere yo gukora amapave',
      'Material': 'Igikoresho',
      'Recycled plastic + sand': 'Pulasitiki yongeye gukoreshwa + umucanga',
      'Format': 'Ingano',
      'Confirm for your project': 'Emeza ku mushinga wawe',
      'Color': 'Ibara',
      'Ask about availability': 'Baza ibihari',
      'Ask about interlocking': 'Baza ayahuza',
      'Ask about linear': 'Baza amaremare',
      'Ask about landscape': 'Baza akoreshwa hanze',
      'See our approach': 'Reba uko tubikora',
      'Put the details in motion': 'Tangira utange ibisobanuro',
      'Giving useful material': 'Ibikoresho bifite akamaro',
      'a': '',
      'lasting place.': 'umwanya urambye.',
      'GREENPAVERS combines recycled plastic and sand to make paving blocks for outdoor spaces.': 'GREENPAVERS ikora amapave yo gutunganya inzira mu plastic yongeye gukoreshwa n’umucanga, igaha ibyo bikoresho bisanzwe undi mumaro.',
      'About GREENPAVERS': 'Menya GREENPAVERS',
      'RECOVER': 'KUSANYA',
      'Plastic diverted for reuse': 'Pulasitiki itabwa ahabugenewe kugira ngo yongere ikoreshwe',
      'REMAKE': 'GUTUNGANYA',
      'Made into useful products': 'Guhindura ibikoresho bifite akamaro',
      'REBUILD': 'KUBAKA',
      'Put to work in your project': 'Kubikoresha mu mushinga wawe',
      '02 / THE RANGE': '02 / UBWOKO BW’AMAPAVE',
      '01—03 / PAVERS': '01—03 / AMAPAVE',
      'EVERYDAY SURFACES, RECONSIDERED': 'DUHA AGACIRO IBIBANZA BYO BURI MUNSI',
      'Pavers with': 'Amapave afite',
      'another life.': 'ubundi buzima.',
      'View all pavers': 'Reba amapave yose',
      'Interlocking': 'Afungana',
      'Interlocking blocks for paths and courtyards.': 'Amapave afungana akoreshwa mu nzira no mu mbuga.',
      'FOR PATHS / COURTYARDS': 'KU NZIRA / MU NZITSI',
      'Linear': 'Aremare',
      'Long rectangular blocks for walkways and edges.': 'Amapave maremare y’urukiramende akoreshwa mu nzira no ku mbibi.',
      'FOR EDGES / WALKWAYS': 'KU MBIBI / KU NZIRA',
      'Landscape': 'Akoreshwa hanze',
      'Modular blocks for garden paths and outdoor spaces.': 'Akwiriye guhuza ubusitani n’ahantu hateganyijwe ibikorwa byo hanze.',
      'FOR GARDENS / TERRACES': 'MU BUSITANI / KU RUBARAZA',
      'Formats, colors and project suitability vary. Share your requirements and we’ll help you find the right fit.': 'Ingano, amabara n’aho akoreshwa biratandukanye. Tubwire ibyo ukeneye tugufashe guhitamo.',
      'MATERIALS / BEFORE THEY BECOME SURFACE': 'IBIKORESHO / MBERE YUKO BIBA INZIRA',
      'LESS WASTE. MORE PURPOSE.': 'IMYANDA MIKE. UMUMARO MWINSHI.',
      'Waste is a material': 'Icyari imyanda',
      'in the': 'gishobora kuba',
      'wrong place.': 'ahantu hakwiye.',
      'Discarded plastic can stay in circulation when it is recovered and remade into something useful. GREENPAVERS brings recycled plastic and sand together in paving blocks designed for everyday use.': 'Plastic yajugunywe ashobora kongera gukoreshwa iyo akusanyijwe agatunganywa. GREENPAVERS iyahuza n’umucanga igakora amapave yo gutunganya inzira akoreshwa buri munsi.',
      'See how we make them': 'Reba uko tuyakora',
      'Every project is a chance to choose materials with a little more intention.': 'Buri mushinga ni amahirwe yo guhitamo ibikoresho tubitekerejeho neza.',
      '03 / FROM MATERIAL TO PLACE': '03 / KUVA KU GIKORESHO KUGEZA KU NZIRA',
      'OUR APPROACH': 'UBURYO DUKORESHAMO',
      'A PRACTICAL PROCESS': 'UBURYO BWOROHEJE',
      'Collected.': 'Birakusanywa.',
      'Made useful.': 'Bigahabwa umumaro.',
      'A straightforward journey from recovered plastic to a finished paving block.': 'Urugendo rworoshye ruva kuri pulasitiki yakusanyijwe rukagera ku ipave rirangiye.',
      'Recover': 'Gukusanya',
      'Plastic is collected and prepared for a new use.': 'Plastic arakusanywa agategurwa kongera gukoreshwa.',
      'Combine': 'Kuvanga',
      'Recycled plastic is brought together with sand.': 'Pulasitiki yongeye gukoreshwa ivangwa n’umucanga.',
      'Form': 'Gukora ishusho',
      'The mix is shaped into paving blocks for outdoor spaces.': 'Ibyo bikoresho bivanzemo bikorwamo amapave yo hanze.',
      'Made for the': 'Byakorewe',
      'everyday.': 'ubuzima bwa buri munsi.',
      'Real materials.': 'Ibikoresho nyabyo.',
      'Real projects.': 'Imishinga nyayo.',
      'More to come.': 'Ibindi biracyaza.',
      'Let’s pave': 'Reka dutunganye',
      'what’s next.': 'ibizakurikiraho.',
      'Tell us what you’re planning and where. We’ll help you explore the right pavers for your project.': 'Tubwire icyo uteganya n’aho kiri. Turagufasha kureba amapave akwiriye umushinga wawe.',
      'Better use for recovered material.': 'Gukoresha neza ibikoresho byakusanyijwe.',
      'Better ground for what comes next.': 'Gutegurira inzira nziza ibizaza.',
      'ABOUT GREENPAVERS / 01': 'IBYEREKEYE GREENPAVERS / 01',
      'Useful by': 'Bifite akamaro',
      'nature.': 'mu miterere yabyo.',
      'GREENPAVERS makes paving blocks by combining recycled plastic and sand.': 'GREENPAVERS ihuza pulasitiki yongeye gukoreshwa n’umucanga, ikabikoramo amapave.',
      'Small change': 'Impinduka nto',
      'in the mix.': 'mu bikoresho.',
      'Lasting change': 'Impinduka irambye',
      'in the way we think.': 'mu mitekerereze yacu.',
      'Paving blocks are used in paths, courtyards and other outdoor spaces. We make them using recycled plastic and sand.': 'Inzira zikoze mu mabuye ni igice cy’ahantu twese dukoresha buri munsi. Turatekereza ku bindi byakorwa muri ayo mabuye.',
      'GREENPAVERS makes paving blocks from recycled plastic and sand. The range includes interlocking, linear and landscape styles.': 'GREENPAVERS ni umushinga ukora amapave yo gutunganya inzira mu plastic yongeye gukoreshwa n’umucanga. Intego ni ugukora ibikoresho bifite akamaro no kongera gukoresha ibyakabaye imyanda.',
      'We will share confirmed product details and ask about your project needs.': 'Twibanda ku gukoresha neza ibikoresho, gutanga amakuru yizewe ku bicuruzwa no kumenya neza ibyo umushinga wawe ukeneye.',
      'Resourceful': 'Gukoresha neza',
      'by design.': 'ni yo ntego.',
      'We start with recovered plastic and look for a useful next application.': 'Dutangirira kuri pulasitiki yakusanyijwe, tukayishakira indi mikoreshereze ifite akamaro.',
      'Practical': 'Ibifasha',
      'by nature.': 'mu buzima.',
      'Pavers should make sense in real outdoor spaces, from paths to shared areas.': 'Amapave akwiye ahantu nyaho ho hanze, kuva ku nzira kugeza ahantu rusange.',
      'Clear': 'Gusobanura neza',
      'by default.': 'ni ingenzi.',
      'We discuss the details that matter: format, finish, quantity and intended use.': 'Tuganira ku ngano, isura, ingano ikenewe n’aho azakoreshwa.',
      'MATERIALS, WITH INTENTION': 'IBIKORESHO, BYAHISEMO NEZA',
      'A better use': 'Umumaro mwiza',
      'for what remains.': 'ku bisigaye.',
      'Recycling is most meaningful when material finds a useful destination. By combining recycled plastic with sand, GREENPAVERS makes paving blocks for projects that value a more considered choice.': 'Kongera gukoresha ibikoresho birushaho kugira umumaro iyo bibonye aho bikoreshwa. GREENPAVERS ihuza pulasitiki yongeye gukoreshwa n’umucanga, igakora amapave.',
      'Start with': 'Tangira',
      'a conversation.': 'ikiganiro.',
      'Tell us about your site, quantity and intended use. We’ll help you explore the next step.': 'Tubwire aho umushinga uri, ingano ukeneye n’icyo uzakoreshwa. Turagufasha kumenya intambwe ikurikira.',
      'THE GREENPAVERS RANGE / 02': 'UBWOKO BWA GREENPAVERS / 02',
      'Find your': 'Hitamo',
      'footing.': 'ibikubereye.',
      'We make pavers from recycled plastic and sand in three styles: interlocking, linear and landscape.': 'Dukora amapave mu pulasitiki yongeye gukoreshwa n’umucanga, mu moko atatu: afungana, y’urukiramende n’ayo mu busitani.',
      'One material idea.': 'Igitekerezo kimwe ku bikoresho.',
      'Different directions.': 'Uburyo butandukanye.',
      'Choose a form that suits the character of your space. Final specifications, dimensions, colors and availability should be confirmed for each project.': 'Hitamo ishusho ijyanye n’ahantu hawe. Ingano, amabara n’ibihari bigomba kubanza kwemezwa kuri buri mushinga.',
      'PATHS / COURTYARDS': 'INZIRA / IMBUGA',
      'Interlocking pavers for paths and shared outdoor areas.': 'Imiterere imenyerewe kandi ihinduka ijyanye n’inzira n’ahantu ho hanze.',
      'EDGES / WALKWAYS': 'IMBIBI / INZIRA',
      'Long rectangular pavers for paths, edges and walkways.': 'Imiterere ndende ikoreshwa ku mirongo igororotse no guhuza ibice bitandukanye.',
      'GARDENS / TERRACES': 'UBUSITANI / IMBUGA',
      'Modular pavers for garden paths and outdoor spaces.': 'Amapave ashobora gutondekwa mu buryo butandukanye, agahuza ubusitani n’ahantu abantu bahurira.',
      'Product names describe style categories for this website. Confirm actual product formats, performance, finishes and suitability with GREENPAVERS before specifying.': 'Amazina y’ibicuruzwa asobanura amoko y’amapave. Banza wemeze ingano, imiterere n’aho akoreshwa na GREENPAVERS mbere yo kuyahitamo.',
      'NOT SURE WHAT FITS?': 'NTURAMENYA IBIGUKWIRIYE?',
      'Start with': 'Tangira',
      'your space.': 'ku hantu hawe.',
      'Share the project location, intended use and approximate quantity. We can take it from there.': 'Tanga aho umushinga uri, icyo uzakoreshwa n’ingano ukeneye. Tuzagufasha gukomeza.',
      'HOW WE MAKE THEM / 03': 'UKO TUYAKORA / 03',
      'From waste': 'Kuva ku myanda',
      'to wayfinding.': 'ku nzira nziza.',
      'GREENPAVERS combines recycled plastic and sand, then forms the material into paving blocks.': 'GREENPAVERS ivanga pulasitiki yongeye gukoreshwa n’umucanga, hanyuma ikabikoramo amapave.',
      'Three clear steps.': 'Intambwe eshatu zisobanutse.',
      'A useful next life.': 'Ubundi buzima bufite umumaro.',
      'The exact production method and product specifications have not been confirmed. This page gives a general overview of the materials.': 'Uburyo bwo gukora n’ingano biterwa n’igicuruzwa cya GREENPAVERS. Ibi bisobanura urugendo rw’ibikoresho muri rusange.',
      'Start with recovered plastic.': 'Tangira kuri pulasitiki yakusanyijwe.',
      'Recycled plastic is collected and prepared for use in the paving-block mix.': 'Pulasitiki yongeye gukoreshwa irakusanywa kandi igategurwa kugira ngo ikoreshwe mu gukora amapave.',
      'Bring materials together.': 'Huza ibikoresho.',
      'Recycled plastic is combined with sand to make paving blocks.': 'Pulasitiki yongeye gukoreshwa ivangwa n’umucanga, bikorwamo amapave.',
      'Make a surface for daily life.': 'Kora inzira ikoreshwa buri munsi.',
      'The material is formed into pavers. Confirm product details before choosing them for a project.': 'Ibyo bikoresho bikorwamo amapave yo gutunganya inzira, nyuma yo kwemeza amakuru y’igicuruzwa n’aho kizakoreshwa.',
      'A MATERIAL CHOICE': 'GUHITAMO IBIKORESHO',
      'Better use': 'Gukoresha neza',
      'starts upstream.': 'bitangirira ku nkomoko.',
      'Before ordering, confirm that the paver type, installation and maintenance suit your project.': 'Gukoresha ibikoresho byasubiwemo ni kimwe mu bigize igisubizo. Aho igicuruzwa gikoreshwa, uko gishyirwaho n’uko kitabwaho na byo ni ingenzi. Banza wemeze amakuru y’igicuruzwa mbere yo kugitumiza.',
      'Make room for': 'Tegura umwanya',
      'a better mix.': 'w’ibikoresho byiza.',
      'Tell us what you’re planning and we’ll help you identify the details to confirm.': 'Tubwire icyo uteganya tugufashe kumenya amakuru agomba kwemezwa.',
      'MATERIALS IN VIEW / 04': 'KUREBA IBIKORESHO / 04',
      'Look a little': 'Reba neza',
      'closer.': 'ibikoresho.',
      'These reference photos show concrete paver patterns and paved outdoor spaces. They are examples, not GREENPAVERS projects.': 'Reba ibikoresho, uko bikorwamo n’aho amapave ya GREENPAVERS ashobora gukoreshwa.',
      'Material to': 'Kuva ku gikoresho',
      'moment.': 'ku gikorwa.',
      'These are reference photos from Wikimedia Commons. They show paving examples, not GREENPAVERS products or projects. Replace them with owner photos when available.': 'Aha hateganyijwe gushyirwamo amafoto ya GREENPAVERS. Shyira amafoto ya JPG mu bubiko bwa assets kugira ngo asimbure aya mashusho y’agateganyo.',
      'Bring us': 'Tuzanire',
      'your place.': 'umushinga wawe.',
      'Tell us about the surface you’re planning. We’ll help you explore a suitable direction.': 'Tubwire inzira uteganya gukora. Turagufasha kureba uburyo buboneye.',
      'CONTACT / 05': 'TWANDIKIRE / 05',
      'Good projects': 'Imishinga myiza',
      'start here.': 'itangirira hano.',
      'Tell us where the project is and what you need. Use the request form to send the details.': 'Tubwire iby’ahantu ukorera. Turagufasha kumenya ibindi bisobanuro bikenewe.',
      'Product fit': 'Guhuza igicuruzwa n’umushinga',
      'Quantities': 'Ingano ikenewe',
      'Delivery planning': 'Gutegura kugeza ibicuruzwa',
      'Tell us what': 'Tubwire icyo',
      'you’re building.': 'wubaka.',
      'Tell us the project location, what the space will be used for and how many pavers you need.': 'Iby’ingenzi tubanza kumenya ni aho umushinga uri, icyo aho hantu hazakoreshwa n’ingano y’amapave ukeneye.',
      'We do not yet have confirmed phone or email details to publish. For now, please use the project request form.': 'Amakuru ya telefoni, imeyili n’aho GREENPAVERS ibarizwa azongerwaho amaze kwemezwa. Ubu koresha urupapuro rwo gusaba amapave utange amakuru y’umushinga.',
      'Your project basics': 'Amakuru y’ibanze ku mushinga',
      'Location, intended use and an approximate quantity help shape the conversation.': 'Aho uri, icyo ukeneye n’ingano bigufasha gusobanura umushinga.',
      'Find a starting point': 'Shaka aho uhera',
      'Review paver styles and the recycled-material process before making a selection.': 'Banza urebe ubwoko bw’amapave n’uko ibikoresho byasubiwemo bikoreshwa.',
      'Confirm the details': 'Emeza ibisobanuro',
      'Product availability, technical specifications and delivery options need project-specific confirmation.': 'Ibihari, ibisobanuro bya tekiniki n’uburyo bwo kubigeza aho uri bigomba kwemezwa kuri buri mushinga.',
      'Have a project taking shape?': 'Umushinga wawe urimo gutegurwa?',
      'PROJECT ENQUIRY / 06': 'KUBAZA KU MUSHINGA / 06',
      'GREENPAVERS / CUSTOMER': 'GREENPAVERS / ABAGUZI',
      'START WITH THE DETAILS': 'TANGIRA UTANGA IBISOBANURO',
      'Let’s make': 'Reka dukore',
      'some ground.': 'inzira nziza.',
      'Tell us where the project is, which pavers you need, the quantity and whether you need delivery.': 'Tubwire ibyo uteganya. Ibisobanuro by’umushinga bidufasha kumenya amapave, ingano n’uko wifuza kuyagezwaho.',
      '01 / YOUR PROJECT': '01 / UMUSHINGA WAWE',
      'A few details': 'Ibisobanuro bike',
      'go a long way.': 'birafasha cyane.',
      'Fields marked with an asterisk are required. Product suitability, pricing and delivery will need to be confirmed for your project.': 'Ahari inyenyeri (*) hagomba kuzuzwa. Tuzabanza kwemeza niba amapave akwiriye umushinga wawe, igiciro n’uko yatangwa.',
      'Project request': 'Gusaba amapave',
      'ALL FIELDS WITH * ARE REQUIRED': 'AHARI * HAGOMBA KUZUZWA',
      'Full name': 'Amazina yawe',
      'Phone number': 'Nimero ya telefoni',
      'Email': 'Imeyili',
      'OPTIONAL': 'Ntabwo ari ngombwa',
      'Project location': 'Aho umushinga uri',
      'Paver type': 'Ubwoko bw’ipave',
      'Select a style': 'Hitamo ubwoko',
      'Approximate quantity (pavers or m2)': 'Ingano ukeneye (umubare w’amapave cyangwa m²)',
      'Natural': 'Ibara risanzwe',
      'Charcoal': 'Ivu ryijimye',
      'Red / clay': 'Umutuku / ibumba',
      'Other / unsure': 'Irindi / simbyizeye',
      'Delivery required?': 'Ukeneye ko tubigeza aho uri?',
      'Yes': 'Yego',
      'No': 'Oya',
      'Not sure': 'Sindabyemeza',
      'Not sure yet': 'Sindabyemeza',
      'Additional message': 'Andi makuru',
      'Tell us about the space, timing or anything else we should know.': 'Tubwire iby’ahantu, igihe uteganya cyangwa andi makuru.',
      'Prepare request': 'Ohereza ubusabe',
      'This preview form is not connected to a submission service yet.': 'Iyi fishi y’igerageza ntihuza n’uburyo bwo kohereza ubusabe.',
      'Your details will be sent to GREENPAVERS for this request.': 'Amakuru yawe azoherezwa kuri GREENPAVERS kugira ngo ikurikirane ubu busabe.',
      'Your request is stored for GREENPAVERS to review. Do not include payment details or other sensitive information in your message.': 'Ubusabe bwawe bubikwa kugira ngo GREENPAVERS ibusuzume. Ntushyiremo amakuru yo kwishyura cyangwa andi makuru y’ibanga.',
      'PLEASE NOTE': 'ICYITONDERWA',
      'This page collects no data and sends no request. When the PHP backend is ready, connect the form to the approved submission and privacy workflow.': 'Uru rupapuro ntirukusanya amakuru cyangwa ngo rwohereze ubusabe. Iyo sisitemu ya PHP izaba yiteguye, huza ifishi n’uburyo bwemejwe bwo kohereza ubusabe no kurinda amakuru.',
      'Questions about the process?': 'Ufite ikibazo ku buryo bikorwa?',
      'View pavers': 'Reba amapave',
      'Start a project': 'Tangira umushinga',
      'About': 'Ibyerekeye GREENPAVERS',
      'Pavers': 'Amapave yo gutunganya inzira',
      'Contact': 'Twandikire',
      'Request pavers': 'Saba amapave',
      'Explore the process': 'Reba uko bikorwa',
      'Visit the gallery': 'Reba amafoto',
      'Meet the pavers': 'Menya amapave',
      'Discuss your project': 'Vuga ku mushinga wawe',
      'Talk through an application': 'Tuganire ku mikoreshereze yayo',
      'Open the request form': 'Fungura urupapuro rwo gusaba',
      'Browse pavers': 'Reba amapave',
      'Make a paver request': 'Saba amapave',
      'Talk about a project': 'Vuga ku mushinga',
      'View all pavers': 'Reba amapave yose',
    },
    attributes: {
      'Town, city or area': 'Umudugudu, umujyi cyangwa agace',
      'e.g. 500 pavers or 40 m²': 'Urugero: amapave 500 cyangwa 40 m²',
      'Tell us about the space, timing or anything else we should know.': 'Tubwire iby’ahantu, igihe uteganya cyangwa andi makuru.',
      'Reference photograph of a paved outdoor walkway. Not a GREENPAVERS project.': 'Ifoto y’urugero y’inzira yo hanze ikozwe mu mapave. Ntabwo ari umushinga wa GREENPAVERS.',
      'Reference photograph of textured interlocking pavers; not a GREENPAVERS product.': 'Ifoto y’urugero y’amapave ahuza. Ntabwo ari igicuruzwa cya GREENPAVERS.',
      'Reference photograph of textured interlocking concrete pavers.': 'Ifoto y’urugero y’amapave ahuza agaragaza imiterere yayo.',
      'Reference photograph of rectangular concrete pavers in a colored pattern.': 'Ifoto y’urugero y’amapave y’urukiramende atondekanye mu mabara.',
      'Reference photograph of rectangular pavers in a colored pattern.': 'Ifoto y’urugero y’amapave y’urukiramende atondekanye mu mabara.',
      'Reference photograph of a paved outdoor walkway.': 'Ifoto y’urugero y’inzira yo hanze ikozwe mu mapave.',
      'Reference photograph of an outdoor walkway paved with interlocking concrete blocks.': 'Ifoto y’urugero y’inzira yo hanze itunganijwe n’amapave ahuza.',
      'Reference photograph of concrete pavers; it does not show recycled plastic or sand.': 'Ifoto y’urugero y’amapave. Ntabwo igaragaza pulasitiki yongeye gukoreshwa cyangwa umucanga.',
      'Reference photograph of interlocking concrete pavers.': 'Ifoto y’urugero y’amapave ahuza.',
      'Reference photograph of an outdoor paved surface.': 'Ifoto y’urugero y’ahantu ho hanze hakozwe mu mapave.',
      'Close-up reference photograph of textured concrete pavers.': 'Ifoto yegereye y’urugero y’amapave agaragaza imiterere yayo.',
      'Reference photograph of concrete pavers. It does not show GREENPAVERS materials or production.': 'Ifoto y’urugero y’amapave. Ntabwo igaragaza ibikoresho cyangwa uburyo bwo gukora bwa GREENPAVERS.',
      'Reference photograph of concrete pavers in a colored pattern.': 'Ifoto y’urugero y’amapave atondekanye mu mabara.',
      'Reference photograph of concrete pavers on an outdoor surface; not a GREENPAVERS project.': 'Ifoto y’urugero y’amapave yo hanze. Ntabwo ari umushinga wa GREENPAVERS.',
      'Reference photograph of an interlocking concrete paver pattern.': 'Ifoto y’urugero y’imiterere y’amapave ahuza.',
      'Reference photograph of an outdoor path paved with interlocking concrete blocks.': 'Ifoto y’urugero y’inzira yo hanze ikozwe mu mapave ahuza.',
    },
    headings: {
      'Pavers from recycled plastic + sand.': 'Amapave akozwe mu pulasitiki yongeye gukoreshwa n’umucanga.',
      'Pavers made from recycled materials.': 'Amapave akozwe mu bikoresho byasubiwemo.',
      'Three paver styles.': 'Ubwoko butatu bw’amapave.',
      'Waste is a material in the wrong place.': 'Icyari imyanda<br><em>gishobora kugira umumaro.</em>',
      'Collected. Made useful.': 'Bikusanywa.<br><em>Bihabwa umumaro.</em>',
      'Made for the everyday.': 'Byakorewe<br><em>ubuzima bwa buri munsi.</em>',
      'Let’s pave what’s next.': 'Reka dutunganye<br><em>ibizakurikiraho.</em>',
      'What we make.': 'Ibyo dukora.',
      'Made from recycled plastic and sand.': 'Bikozwe mu pulasitiki yongeye gukoreshwa n’umucanga.',
      'Resourceful by design.': 'Gukoresha neza<br><em>ni yo ntego.</em>',
      'Practical by nature.': 'Ibifasha<br><em>mu buzima.</em>',
      'Clear by default.': 'Gusobanura neza<br><em>ni ingenzi.</em>',
      'A better use for what remains.': 'Gukoresha neza<br><em>ibisigaye.</em>',
      'Start with a conversation.': 'Tangira<br><em>ikiganiro.</em>',
      'Pavers for outdoor spaces.': 'Amapave y’ahantu ho hanze.',
      'Choose a paver style.': 'Hitamo ubwoko bw’amapave.',
      'Start with your space.': 'Tangira<br><em>ku hantu hawe.</em>',
      'How we make paving blocks.': 'Uko dukora amapave.',
      'Three clear steps. A useful next life.': 'Intambwe eshatu zisobanutse.<br><em>Ubundi buzima bufite umumaro.</em>',
      'Better use starts upstream.': 'Gukoresha neza<br><em>bitangirira ku nkomoko.</em>',
      'Make room for a better mix.': 'Tegura umwanya<br><em>w’ibikoresho byiza.</em>',
      'Paver reference photos.': 'Amafoto y’urugero y’amapave.',
      'Examples of paved surfaces.': 'Ingero z’ahantu hatunganijwe n’amapave.',
      'The idea behind GREENPAVERS.': 'Igitekerezo<br>cyatangije <em>GREENPAVERS.</em>',
      'Bring us your place.': 'Tuzanire<br><em>umushinga wawe.</em>',
      'Contact GREENPAVERS.': 'Twandikire GREENPAVERS.',
      'What we make.': 'Ibyo dukora.',
      'Made from recycled plastic and sand.': 'Bikozwe mu pulasitiki yongeye gukoreshwa n’umucanga.',
      'Tell us what you’re building.': 'Tubwire icyo<br><em>wubaka.</em>',
      'Request pavers.': 'Saba amapave.',
      'A few details go a long way.': 'Ibisobanuro bike<br><em>birafasha cyane.</em>',
      'From recycled plastic to paving blocks.': 'Kuva kuri pulasitiki yongeye gukoreshwa kugeza ku mapave.',
    },
    titles: {
      'GREENPAVERS | Pavers from recycled plastic and sand': 'GREENPAVERS | Amapave akozwe mu pulasitiki yongeye gukoreshwa n’umucanga',
      'About GREENPAVERS | What we make': 'Ibyerekeye GREENPAVERS | Ibyo dukora',
      'Pavers | GREENPAVERS': 'Amapave | GREENPAVERS',
      'How we make pavers | GREENPAVERS': 'Uko dukora amapave | GREENPAVERS',
      'Paver reference photos | GREENPAVERS': 'Amafoto y’urugero y’amapave | GREENPAVERS',
      'Contact GREENPAVERS': 'Twandikire GREENPAVERS',
      'Request Pavers | GREENPAVERS': 'Saba amapave | GREENPAVERS',
    },
    messages: {
      required: 'Uzuza amakuru asabwa mbere yo gukomeza.',
      validation: 'Reba amakuru washyizemo, ukosore ibitaruzura cyangwa bitari byo.',
      unavailable: 'Ntitwabashije kubika ubusabe bwawe ubu. Ongera ugerageze nyuma.',
      failed: 'Habaye ikibazo. Ongera ugerageze nyuma.',
      connection: 'Ntitwashoboye kugera kuri seriveri. Reba ko urubuga rukorera kuri XAMPP, wongere ugerageze.',
      success: 'Ubusabe bwawe bwakiriwe kandi bubitswe. Nimero yabwo ni',
      trackingNotReady: 'Gukurikirana ubusabe ntibiraboneka ubu.',
      sending: 'Ubusabe bwawe burimo koherezwa...',
      trackSending: 'Turimo kureba ubusabe bwawe...',
      trackInvalid: 'Nta busabe bufite iyo nimero twabonye. Reba kode wongere ugerageze.',
      trackRateLimited: 'Wagerageje inshuro nyinshi. Tegereza gato wongere ugerageze.',
      trackUnavailable: 'Kugenzura ubusabe ntibishoboka ubu. Ongera ugerageze nyuma.',
      trackUnexpected: 'Habaye ikibazo. Ongera ugerageze nyuma.',
      trackStatuses: {
        Pending: 'Iri gusuzumwa',
        Approved: 'Yemejwe',
        'In Production': 'Irimo gukorwa',
        Ready: 'Yiteguye',
        Completed: 'Yarangiye',
        Cancelled: 'Yahagaritswe',
      },
      darkMode: 'Fungura uburyo bwijimye',
      lightMode: 'Fungura uburyo busanzwe',
      chooseLanguage: 'Hitamo ururimi',
      priceToConfirm: 'Igiciro kizemezwa',
      quantityPrompt: 'Andika umubare w’amapave',
    },
  },
  en: {
    text: {},
    attributes: {},
    headings: {},
    titles: {},
    messages: {
      required: 'Please complete the required fields before continuing.',
      validation: 'Please review the information and correct any incomplete or invalid fields.',
      unavailable: 'We could not save your request right now. Please try again later.',
      failed: 'Something went wrong. Please try again later.',
      connection: 'We could not reach the server. Check that the site is running through XAMPP, then try again.',
      success: 'Your request was received and saved. Your reference number is',
      trackingNotReady: 'Private request tracking is not available yet.',
      sending: 'Sending your request...',
      trackSending: 'Checking your request...',
      trackInvalid: 'No request was found for that reference. Check the code and try again.',
      trackRateLimited: 'There have been too many attempts. Wait a little before trying again.',
      trackUnavailable: 'Request tracking is temporarily unavailable. Please try again later.',
      trackUnexpected: 'Something went wrong. Please try again later.',
      trackStatuses: {
        Pending: 'Pending',
        Approved: 'Approved',
        'In Production': 'In production',
        Ready: 'Ready',
        Completed: 'Completed',
        Cancelled: 'Cancelled',
      },
      darkMode: 'Switch to dark mode',
      lightMode: 'Switch to light mode',
      chooseLanguage: 'Choose language',
      priceToConfirm: 'Price to be confirmed',
      quantityPrompt: 'Enter the number of pavers',
    },
  },
};

Object.assign(copy.rw.text, {
  'GREENPAVERS paver photo.': 'Ifoto y’amapave ya GREENPAVERS.',
  'Owner-supplied photo of GREENPAVERS pavers.': 'Ifoto y’amapave ya GREENPAVERS yatanzwe na nyir’urubuga.',
  'Indicative price per paver:': 'Igiciro cy’agateganyo kuri buri pave:',
  'Prices are proposed estimates, not confirmed quotes. Confirm prices and style availability with GREENPAVERS.':
    'Ibi ni ibiciro by’agateganyo, ntibirabyemezwa. Emeza ibiciro n’ubwoko buboneka ubaza GREENPAVERS.',
  'Paver style preference': 'Ubwoko bw’ipave wifuza',
  'Select a paver style': 'Hitamo ubwoko bw’ipave',
  'Rectangular / Linear Pavers': 'Amapave maremare y’urukiramende',
  'Rectangular / Linear Pavers — availability to be confirmed': 'Amapave y’urukiramende — kuboneka kwayo kuracyemezwa',
  'Hexagonal Pavers — availability to be confirmed': 'Amapave y’impande esheshatu — kuboneka kwayo kuracyemezwa',
  'Square Pavers — availability to be confirmed': 'Amapave kare — kuboneka kwayo kuracyemezwa',
  'Decorative Pavers — availability to be confirmed': 'Amapave yo gushariza — kuboneka kwayo kuracyemezwa',
  'Landscape Pavers — availability to be confirmed': 'Amapave yo mu busitani — kuboneka kwayo kuracyemezwa',
  'Hexagonal Pavers': 'Amapave y’impande esheshatu',
  'Hexagonal style': 'ubwoko bw’impande esheshatu',
  'Quantity (whole pavers)': 'Umubare w’amapave yuzuye',
  'Selected style': 'Ubwoko wahisemo',
  'Price per paver': 'Igiciro kuri buri pave',
  'Quantity': 'Umubare',
  'Estimated subtotal': 'Igiteranyo cy’agateganyo',
  'This is an indicative estimate only. The final quote, style availability and delivery must be confirmed by GREENPAVERS.':
    'Iki ni igiciro cy’agateganyo gusa. Igiciro cya nyuma, ubwoko buboneka no kugeza amapave bigomba kwemezwa na GREENPAVERS.',
  'Current styles + options': 'Ubwoko buriho n’ubundi wahitamo',
  'REQUEST OPTION': 'UBWOKO USABWA',
  'Explore the existing styles and ask about additional shapes. Confirm price, availability and suitability for your project.':
    'Reba ubwoko buriho cyangwa ubaze ku yindi miterere. Emeza igiciro, ibihari n’aho bikwiriye gukoreshwa.',
  'Request this shape as a preference. GREENPAVERS must confirm whether it is offered and confirm dimensions, finish and project suitability before quoting.':
    'Saba iyi miterere nk’iyo wifuza. GREENPAVERS igomba kubanza kwemeza ko iboneka, ingano yayo, imiterere n’aho ikoreshwa mbere yo kuguha igiciro.',
  'STYLE / AVAILABILITY TO BE CONFIRMED': 'UBWOKO / KUBONEKA BIRACYEMEZWA',
  'CURRENT STYLES + OPTIONS': 'UBWOKO BURIHO N’UBUNDI WAHITAMO',
  'Proposed prices are indicative and not confirmed quotes. Confirm price, availability and project suitability with GREENPAVERS.':
    'Ibiciro byatanzwe ni iby’agateganyo kandi ntibirabyemezwa. Emeza igiciro, ibihari n’aho bikwiriye gukoreshwa ubaza GREENPAVERS.',
  'Proposed prices are indicative only, not confirmed by management. Confirm prices, sizes, finishes, style availability and suitability with GREENPAVERS. No specifications are implied for request-only styles.':
    'Ibiciro ni iby’agateganyo gusa, ntibyemejwe n’ubuyobozi. Emeza ibiciro, ingano, imiterere, ubwoko buboneka n’aho bukoreshwa ubaza GREENPAVERS. Nta bisobanuro bya tekiniki bivugwa ku bwoko busabwa gusa.',
  'The first two GREENPAVERS photos were supplied for this project. Other images are Wikimedia Commons references and do not show GREENPAVERS products or projects.':
    'Amafoto abiri ya mbere ya GREENPAVERS yatanzwe kuri uyu mushinga. Andi ni amafoto y’urugero yo muri Wikimedia Commons, ntiyerekana ibicuruzwa cyangwa imishinga ya GREENPAVERS.',
  'This gallery combines owner-supplied GREENPAVERS photos with clearly labelled reference images. Reference images are not GREENPAVERS projects.':
    'Aya mafoto arimo amafoto ya GREENPAVERS yatanzwe na nyir’urubuga n’andi agaragajwe neza nk’ay’urugero. Amafoto y’urugero si imishinga ya GREENPAVERS.',
  'OWNER PHOTOS + REFERENCE PHOTOS': 'AMAFOTO NYAYO N’AMAFOTO Y’URUGERO',
  'GREENPAVERS photo: paver blocks': 'Ifoto ya GREENPAVERS: amapave',
  'GREENPAVERS photo: paver detail': 'Ifoto ya GREENPAVERS: ibisobanuro by’amapave',
  'Ask about hexagonal style': 'Baza ku bwoko bw’impande esheshatu',
  'Interlocking Pavers': 'Amapave afungana',
  'Linear / Rectangular Pavers': 'Amapave maremare y’urukiramende',
  'Landscape Pavers': 'Amapave yo mu busitani',
  'Natural': 'Ibara ry’umwimerere',
  'Charcoal': 'Ibara ry’ivu ryijimye',
  'Red / clay': 'Umutuku / ibara ry’ibumba',
  'Other / unsure': 'Irindi bara / sinzi neza',
  'Not sure': 'Sinzi neza',
  'Not sure yet': 'Sinzi neza',
  'Request our pavers': 'Saba amapave yacu',
  'CONTACT / RWANDA': 'TWANDIKIRE / U RWANDA',
  'CEO — Nsanzirema Alphonse': 'Umuyobozi mukuru — Nsanzirema Alphonse',
  'IT contact — Cyuzuzo Fabrice': 'Ushinzwe ikoranabuhanga — Cyuzuzo Fabrice',
  'Gashwati Cell, Mushubi Sector, Nyamagabe District, Rwanda.': 'Akagari ka Gashwati, Umurenge wa Mushubi, Akarere ka Nyamagabe, mu Rwanda.',
  'Contact details': 'Amakuru yo kutwandikira',
  'Business location': 'Aho GREENPAVERS ikorera',
  'Official channels': 'Uburyo bwemewe bwo kutwandikira',
  'MORE WAYS TO CONNECT': 'UBUNDI BURYO BWO KUTWANDIKIRA',
  'Official business email and social links will be listed here when available.': 'Aderesi ya imeyili y’akazi n’imbuga nkoranyambaga bizashyirwa hano nibimara kuboneka.',
  'Tell us where the project is and what you need. Use the request form to send the details.': 'Tubwire aho umushinga uri n’ibyo ukeneye. Koresha urupapuro rwo gusaba amapave utwoherereze ibisobanuro.',
  'Send your project details through the request form, or contact the team directly using the details below.': 'Ohereza ibisobanuro by’umushinga wawe ukoresheje ifishi yo gusaba, cyangwa uvugane n’itsinda rya GREENPAVERS ukoresheje amakuru ari hano hepfo.',
  'Tell us the project location, what the space will be used for and how many pavers you need.': 'Tubwire aho umushinga uri, icyo aho hantu hazakoreshwa n’ingano y’amapave ukeneye.',
  '02 / THE PEOPLE BEHIND THE PROJECT': '02 / ABANTU BARI INYUMA Y’UMUSHINGA',
  'BUSINESS IDEA / SOFTWARE DEVELOPMENT': 'IGITEKEREZO CY’UBUCURUZI / ITERAMBERE RYA POROGARAMU',
  '02 / BUSINESS IDEA / SOFTWARE DEVELOPMENT': '02 / IGITEKEREZO CY’UBUCURUZI / ITERAMBERE RYA POROGARAMU',
  'BUSINESS LEADERSHIP': 'UBUYOBOZI BW’UBUCURUZI',
  'WEBSITE & SYSTEM DEVELOPMENT': 'ITERAMBERE RY’URUBUGA NA SISITEMU',
  'Nsanzirema Alphonse originated the GREENPAVERS business idea and leads the project as its CEO.': 'Nsanzirema Alphonse ni we wazanye igitekerezo cy’ubucuruzi bwa GREENPAVERS kandi ayobora uyu mushinga nka muyobozi mukuru (CEO).',
  'Cyuzuzo Fabrice developed the GREENPAVERS website and system. His role is software development; the business idea and project leadership belong to Nsanzirema Alphonse as CEO.': 'Cyuzuzo Fabrice ni we wakoze urubuga na sisitemu bya GREENPAVERS. Inshingano ze ni ugukora porogaramu; igitekerezo cy’ubucuruzi n’ubuyobozi bw’umushinga ni ibya Nsanzirema Alphonse nka CEO.',
  'Website & System developed by': 'Urubuga na sisitemu byakozwe na',
  '/ Senior Software Developer': '/ Umuhanga mukuru mu iterambere rya porogaramu',
  '01—03 / PAVERS': '01—03 / AMAPAVE',
  'GREENPAVERS combines recycled plastic and sand to make paving blocks for outdoor spaces.': 'GREENPAVERS ihuza pulasitiki yongeye gukoreshwa n’umucanga, igakora amapave akoreshwa hanze.',
  'These reference photos show concrete paver patterns and paved outdoor spaces. They are examples, not GREENPAVERS projects.': 'Aya ni amafoto y’urugero agaragaza amapave n’inzira zikozeho. Ntabwo ari ibicuruzwa cyangwa imishinga bya GREENPAVERS.',
  'These are reference photos from Wikimedia Commons. They show paving examples, not GREENPAVERS products or projects. Replace them with owner photos when available.': 'Aya ni amafoto y’urugero yo muri Wikimedia Commons. Ntabwo agaragaza ibicuruzwa cyangwa imishinga bya GREENPAVERS. Azasimbuzwa amafoto nyayo igihe azaboneka.',
  'GREENPAVERS makes paving blocks by combining recycled plastic and sand.': 'GREENPAVERS ikora amapave ihuza pulasitiki yongeye gukoreshwa n’umucanga.',
  'GREENPAVERS makes paving blocks from recycled plastic and sand. The range includes interlocking, linear and landscape styles.': 'GREENPAVERS ikora amapave mu pulasitiki yongeye gukoreshwa n’umucanga. Ubwoko bwayo burimo amapave afungana, ay’urukiramende n’ayo mu busitani.',
  'Tell us where the project is and what you need. Use the request form to send the details.': 'Tubwire aho umushinga uri n’ibyo ukeneye. Koresha urupapuro rwo gusaba amapave utwoherereze ibisobanuro.',
  'We do not yet have confirmed phone or email details to publish. For now, please use the project request form.': 'Ntabwo turabona nimero ya telefoni cyangwa imeyili byemejwe byo gushyira ku rubuga. Kugeza ubu, koresha urupapuro rwo gusaba amapave.',
  'Tell us the project location, what the space will be used for and how many pavers you need.': 'Tubwire aho umushinga uri, icyo aho hantu hazakoreshwa n’ingano y’amapave ukeneye.',
  'Tell us where the project is, which pavers you need, the quantity and whether you need delivery.': 'Tubwire aho umushinga uri, ubwoko bw’amapave ukeneye, ingano yayo n’uko ukeneye ko tuyakugezaho.',
  'Complete the required fields. We will confirm product suitability, price and delivery for your project.': 'Uzuza ibisabwa. Tuzemeza niba amapave akwiriye umushinga wawe, igiciro n’uburyo bwo kuyakugezaho.',
  'Your request is saved for review. Do not include payment details or other sensitive information.': 'Ubusabe bwawe burabitswe kugira ngo busuzumwe. Ntushyiremo amakuru yo kwishyura cyangwa andi makuru y’ibanga.',
  'REFERENCE PHOTOS / NOT GREENPAVERS PROJECTS': 'AMAFOTO Y’URUGERO / SI IMISHINGA YA GREENPAVERS',
  'REFERENCE PAVER PHOTOS': 'AMAFOTO Y’URUGERO Y’AMAPAVE',
  'THREE STYLES': 'UBWOKO BUTATU',
  'Choose a style for your space. Confirm sizes, colors and availability with us.': 'Hitamo ubwoko bubereye ahantu hawe. Emeza ingano, amabara n’ibihari.',
  'These names describe the three paver styles. Confirm sizes, finishes and suitability for your project.': 'Aya mazina agaragaza ubwoko butatu bw’amapave. Emeza ingano, imiterere n’aho akwiriye gukoreshwa.',
  'RECYCLED PLASTIC + SAND': 'PULASITIKI YONGEYE GUKORESHWA + UMUCANGA',
  'Interlocking pavers for paths and shared outdoor areas.': 'Amapave afungana akoreshwa mu nzira no mu mbuga.',
  'Long rectangular pavers for paths, edges and walkways.': 'Amapave maremare y’urukiramende akoreshwa mu nzira no ku mbibi.',
  'Modular pavers for garden paths and outdoor spaces.': 'Amapave yo mu busitani no mu bindi bibanza byo hanze.',
  'See how pavers are made': 'Reba uko amapave akorwa',
  'Collect': 'Gukusanya',
  'GREENPAVERS combines recycled plastic and sand to make paving blocks for outdoor spaces. Confirm product details and suitability for your project.': 'GREENPAVERS ihuza pulasitiki yongeye gukoreshwa n’umucanga, igakora amapave akoreshwa hanze. Banza wemeze ibisobanuro by’igicuruzwa n’aho akwiriye gukoreshwa.',
  'Ask us to confirm sizes, colors and availability for your project.': 'Twandikire kugira ngo wemeze ingano, amabara n’ibihari ku mushinga wawe.',
  'HOW THE MATERIALS ARE USED': 'UKO IBIKORESHO BIKORESHWA',
  'Recycled plastic is combined with sand and formed into paving blocks.': 'Pulasitiki yongeye gukoreshwa ivangwa n’umucanga, bikorwamo amapave.',
  'Recycled plastic is collected and prepared.': 'Pulasitiki yongeye gukoreshwa irakusanywa kandi igategurwa.',
  'Plastic is combined with sand.': 'Pulasitiki ivangwa n’umucanga.',
  'The mix is formed into paving blocks.': 'Ibyo bivanzemo bikorwamo amapave.',
  'See the process': 'Reba uko bikorwa',
  'HAVE A PROJECT?': 'UFITE UMUSHINGA?',
  'REQUEST PAVERS': 'SABA AMAPAVE',
  'Track request': 'Kurikirana ubusabe',
  'CUSTOMER REQUEST / TRACKING': 'GUKURIKIRANA UBUSABE / UMWANYA WAWE',
  'PRIVATE REQUEST REFERENCE': 'KODE Y’IBANGA YO GUKURIKIRANA UBUSABE',
  'Enter the private reference shown after you submitted your request. It is required to look up the current status.': 'Andikamo kode y’ibanga wahawe umaze kohereza ubusabe. Irasabwa kugira ngo urebe aho ubusabe bwawe bugeze.',
  '01 / REQUEST STATUS': '01 / AHO UBUSABE BUZIR',
  'The private reference is a 64-character code. GREENPAVERS never asks for your password or payment details here.': 'Kode y’ibanga igizwe n’inyuguti n’imibare 64. GREENPAVERS ntizagusaba ijambo ry’ibanga cyangwa amakuru yo kwishyura hano.',
  'Check request status': 'Reba aho ubusabe bugeze',
  'PRIVATE REFERENCE REQUIRED': 'KODE Y’IBANGA IRASABWA',
  'Tracking reference': 'Kode yo gukurikirana ubusabe',
  'Enter the full reference you saved after submitting your request.': 'Andikamo kode yose wabitse umaze kohereza ubusabe.',
  'Check status': 'Reba uko buhagaze',
  'CURRENT REQUEST STATUS': 'AHO UBUSABE BUZIR UBU',
  'Submitted': 'Byoherejwe',
  'KEEP IT PRIVATE': 'BIKEBE',
  "Your tracking reference acts like a key. Anyone with it can view this request's status, so keep it somewhere safe.": 'Kode yo gukurikirana ubusabe ni urufunguzo. Uyibonye ashobora kureba uko ubusabe buhagaze; yibike ahatekanye.',
  'Make a new request': 'Ohereza ubundi busabe',
  'Track your request': 'Kurikirana ubusabe bwawe',
  'Save this private tracking reference; it will only be shown once:': 'Bika iyi kode y’ibanga yo gukurikirana ubusabe; igaragazwa inshuro imwe gusa:',
  'Share the location, intended use and approximate quantity. We will help confirm the next steps.': 'Tanga aho umushinga uri, icyo amapave azakoreshwa n’ingano ukeneye. Tuzagufasha kumenya intambwe ikurikira.',
  'Tell us the location, intended use and approximate quantity you need.': 'Tubwire aho umushinga uri, icyo amapave azakoreshwa n’ingano ukeneye.',
  'Need pavers': 'Ukeneye amapave',
  'for a project?': 'ku mushinga wawe?',
  'Tell us about': 'Tubwire',
  'your project.': 'iby’umushinga wawe.',
  'Plastic, sand': 'Pulasitiki n’umucanga',
  'and pavers.': 'n’amapave.',
  'Plastic made': 'Pulasitiki ikorwamo',
  'into pavers.': 'amapave.',
  'Reference photo: paver surface': 'Ifoto y’urugero: amapave yo hasi',
  'Reference photo: interlocking pavers': 'Ifoto y’urugero: amapave afungana',
  'Reference photo: paved walkway': 'Ifoto y’urugero: inzira ikozwe mu mapave',
  'Reference photo: colored pavers': 'Ifoto y’urugero: amapave y’amabara',
  'PAVERS / RECYCLED PLASTIC + SAND': 'AMAPAVE / PULASITIKI YONGEYE GUKORESHWA + UMUCANGA',
});
Object.assign(copy.rw.headings, {
  'Examples of paved surfaces.': 'Ingero z’ahantu<br><em>hatunganijwe n’amapave.</em>',
  'Plastic made into pavers.': 'Pulasitiki ikorwamo<br><em>amapave.</em>',
  'Plastic, sand and pavers.': 'Pulasitiki n’umucanga<br><em>n’amapave.</em>',
  'Tell us about your project.': 'Tubwire iby’umushinga wawe.',
  'Need pavers for a project?': 'Ukeneye amapave ku mushinga wawe?',
  'Recycled materials, put to use.': 'Ibikoresho byasubiwemo,<br><em>bikoreshwe mu buryo bufite akamaro.</em>',
});
Object.assign(copy.rw.attributes, {
  'GREENPAVERS paver photo.': 'Ifoto y’amapave ya GREENPAVERS.',
  'Owner-supplied photo of GREENPAVERS pavers.': 'Ifoto y’amapave ya GREENPAVERS yatanzwe na nyir’urubuga.',
  'e.g. 500 pavers or 40 m²': 'Urugero: amapave 500 cyangwa 40 m²',
  'Reference photograph of a paved outdoor walkway. Not a GREENPAVERS project.': 'Ifoto y’urugero y’inzira yo hanze ikozwe mu mapave. Ntabwo ari umushinga wa GREENPAVERS.',
  'Reference photograph of textured interlocking pavers; not a GREENPAVERS product.': 'Ifoto y’urugero y’amapave afungana. Ntabwo ari igicuruzwa cya GREENPAVERS.',
  'Reference photograph of textured interlocking concrete pavers.': 'Ifoto y’urugero y’amapave afungana.',
  'Reference photograph of rectangular concrete pavers in a colored pattern.': 'Ifoto y’urugero y’amapave y’urukiramende atondekanye mu mabara.',
  'Reference photograph of rectangular pavers in a colored pattern.': 'Ifoto y’urugero y’amapave y’urukiramende atondekanye mu mabara.',
  'Reference photograph of a paved outdoor walkway.': 'Ifoto y’urugero y’inzira yo hanze ikozwe mu mapave.',
  'Reference photograph of an outdoor walkway paved with interlocking concrete blocks.': 'Ifoto y’urugero y’inzira yo hanze itunganijwe n’amapave ahuza.',
  'Reference photograph of concrete pavers; it does not show recycled plastic or sand.': 'Ifoto y’urugero y’amapave. Ntabwo igaragaza pulasitiki yongeye gukoreshwa cyangwa umucanga.',
  'Reference photograph of interlocking concrete pavers.': 'Ifoto y’urugero y’amapave ahuza.',
  'Reference photograph of an outdoor paved surface.': 'Ifoto y’urugero y’ahantu ho hanze hakozwe mu mapave.',
  'Close-up reference photograph of textured concrete pavers.': 'Ifoto yegereye y’urugero y’amapave agaragaza imiterere yayo.',
  'Reference photograph of concrete pavers. It does not show GREENPAVERS materials or production.': 'Ifoto y’urugero y’amapave. Ntabwo igaragaza ibikoresho cyangwa uburyo bwo gukora bwa GREENPAVERS.',
  'Reference photograph of concrete pavers in a colored pattern.': 'Ifoto y’urugero y’amapave atondekanye mu mabara.',
  'Reference photograph of concrete pavers on an outdoor surface; not a GREENPAVERS project.': 'Ifoto y’urugero y’amapave yo hanze. Ntabwo ari umushinga wa GREENPAVERS.',
  'Reference photograph of an interlocking concrete paver pattern.': 'Ifoto y’urugero y’imiterere y’amapave ahuza.',
  'Reference photograph of an outdoor path paved with interlocking concrete blocks.': 'Ifoto y’urugero y’inzira yo hanze ikozwe mu mapave ahuza.',
});
Object.assign(copy.rw.titles, {
  'GREENPAVERS | Pavers from recycled plastic and sand': 'GREENPAVERS | Amapave akozwe mu pulasitiki yongeye gukoreshwa n’umucanga',
  'About GREENPAVERS | What we make': 'Ibyerekeye GREENPAVERS | Ibyo dukora',
  'Pavers | GREENPAVERS': 'Amapave | GREENPAVERS',
  'How we make pavers | GREENPAVERS': 'Uko dukora amapave | GREENPAVERS',
  'Paver reference photos | GREENPAVERS': 'Amafoto y’urugero y’amapave | GREENPAVERS',
  'Contact GREENPAVERS': 'Twandikire GREENPAVERS',
  'Request Pavers | GREENPAVERS': 'Saba amapave | GREENPAVERS',
  'Track a request | GREENPAVERS': 'Kurikirana ubusabe | GREENPAVERS',
});
Object.assign(copy.rw.headings, {
  'Track your request.': 'Kurikirana ubusabe bwawe.',
});

const navigation = document.querySelector('.primary-nav');
const navigationToggle = document.querySelector('.nav-toggle');
const languageStorageKey = 'greenpave-language';
const themeStorageKey = 'greenpave-theme';

function getSavedValue(key, allowed, fallback) {
  try {
    const value = localStorage.getItem(key);
    return allowed.includes(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

function formatRwf(amount, language) {
  const locale = language === 'rw' ? 'rw-RW' : 'en-RW';
  return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(amount)} RWF`;
}

function updateIndicativePriceLabels(language) {
  document.querySelectorAll('[data-price-key]').forEach((element) => {
    const amount = indicativePrices[element.dataset.priceKey];
    if (amount !== undefined) element.textContent = formatRwf(amount, language);
  });
}

function updateRequestEstimate() {
  const form = document.querySelector('[data-request-form]');
  if (!form) return;

  const language = getSavedValue(languageStorageKey, ['rw', 'en'], 'rw');
  const product = form.querySelector('[name="product_type"]');
  const quantity = form.querySelector('[name="quantity"]');
  const selectedType = form.querySelector('[data-estimate-type]');
  const unitPrice = form.querySelector('[data-estimate-unit]');
  const estimatedQuantity = form.querySelector('[data-estimate-quantity]');
  const subtotal = form.querySelector('[data-estimate-total]');
  if (!product || !quantity || !selectedType || !unitPrice || !estimatedQuantity || !subtotal) return;

  const amount = indicativePrices[product.value];
  const quantityValue = Number(quantity.value);
  const validQuantity = Number.isSafeInteger(quantityValue) && quantityValue >= 1 && quantityValue <= 1000000;
  selectedType.textContent = product.selectedOptions[0]?.textContent.trim() || '';
  estimatedQuantity.textContent = validQuantity
    ? new Intl.NumberFormat(language === 'rw' ? 'rw-RW' : 'en-RW').format(quantityValue)
    : '—';

  if (amount === undefined) {
    unitPrice.textContent = copy[language].messages.priceToConfirm;
    subtotal.textContent = copy[language].messages.priceToConfirm;
  } else {
    unitPrice.textContent = formatRwf(amount, language);
    subtotal.textContent = validQuantity
      ? formatRwf(amount * quantityValue, language)
      : copy[language].messages.quantityPrompt;
  }
}

function addPreferenceControls() {
  if (!navigation || navigation.querySelector('[data-site-controls]')) return null;

  const controls = document.createElement('div');
  controls.className = 'site-controls';
  controls.dataset.siteControls = '';
  controls.innerHTML = '<label class="language-control"><span class="visually-hidden" data-language-label></span><select data-language-switch aria-label="Choose language"><option value="rw">RW Kinyarwanda</option><option value="en">EN English</option></select></label><button class="theme-toggle" type="button" data-theme-toggle aria-pressed="false"><span class="theme-glyph" aria-hidden="true">☀</span><span class="visually-hidden" data-theme-label></span></button>';

  const callToAction = navigation.querySelector('.nav-cta');
  if (callToAction) navigation.insertBefore(controls, callToAction);
  else navigation.append(controls);
  return controls;
}

function applyLanguage(language) {
  const languageCopy = copy[language];
  if (!languageCopy) return;

  document.documentElement.lang = language;
  const title = document.querySelector('title');
  if (title) {
    if (!title.dataset.originalTitle) title.dataset.originalTitle = title.textContent;
    title.textContent = languageCopy.titles[title.dataset.originalTitle] || title.dataset.originalTitle;
  }

  document.querySelectorAll('h1, h2, h3').forEach((heading) => {
    if (heading.dataset.originalHeadingHtml === undefined) {
      heading.dataset.originalHeadingHtml = heading.innerHTML;
      heading.dataset.originalHeadingText = heading.innerText.replace(/\s+/g, ' ').trim();
    }
    const originalText = heading.dataset.originalHeadingText;
    const translatedHeading = languageCopy.headings[originalText];
    if (translatedHeading) {
      heading.dataset.i18nCompound = 'true';
      heading.innerHTML = translatedHeading;
    } else {
      heading.innerHTML = heading.dataset.originalHeadingHtml;
      delete heading.dataset.i18nCompound;
    }
  });

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.parentElement?.closest('[data-site-controls], [data-i18n-compound]')) continue;
    if (node.originalGreenpaveText === undefined) node.originalGreenpaveText = node.nodeValue;
    const original = node.originalGreenpaveText;
    const trimmed = original.trim();
    const translated = languageCopy.text[trimmed];
    if (translated) {
      const leading = original.match(/^\s*/)?.[0] || '';
      const trailing = original.match(/\s*$/)?.[0] || '';
      node.nodeValue = `${leading}${translated}${trailing}`;
    } else if (language === 'en') {
      node.nodeValue = original;
    }
  }

  document.querySelectorAll('[placeholder]').forEach((field) => {
    if (field.dataset.originalPlaceholder === undefined) field.dataset.originalPlaceholder = field.placeholder;
    field.placeholder = language === 'rw'
      ? (languageCopy.attributes[field.dataset.originalPlaceholder] || field.dataset.originalPlaceholder)
      : field.dataset.originalPlaceholder;
  });

  document.querySelectorAll('[aria-label]').forEach((element) => {
    if (element.dataset.originalAriaLabel === undefined) element.dataset.originalAriaLabel = element.getAttribute('aria-label');
    const original = element.dataset.originalAriaLabel;
    element.setAttribute('aria-label', language === 'rw' ? (languageCopy.text[original] || original) : original);
  });

  document.querySelectorAll('[alt]').forEach((element) => {
    if (element.dataset.originalAlt === undefined) element.dataset.originalAlt = element.getAttribute('alt');
    const original = element.dataset.originalAlt;
    element.setAttribute('alt', language === 'rw' ? (languageCopy.attributes[original] || original) : original);
  });

  const languageLabel = document.querySelector('[data-language-label]');
  if (languageLabel) languageLabel.textContent = languageCopy.messages.chooseLanguage;
  const themeLabel = document.querySelector('[data-theme-label]');
  const themeToggle = document.querySelector('[data-theme-toggle]');
  if (themeLabel && themeToggle) {
    const darkIsOn = document.documentElement.dataset.theme === 'dark';
    themeLabel.textContent = languageCopy.messages[darkIsOn ? 'lightMode' : 'darkMode'];
    themeToggle.setAttribute('aria-label', themeLabel.textContent);
    themeToggle.title = themeLabel.textContent;
  }

  const switcher = document.querySelector('[data-language-switch]');
  if (switcher) {
    switcher.value = language;
    switcher.setAttribute('aria-label', languageCopy.messages.chooseLanguage);
  }
  updateIndicativePriceLabels(language);
  updateRequestEstimate();

  const trackedStatus = document.querySelector('[data-tracking-status]');
  const trackedTime = document.querySelector('[data-tracking-date]');
  const savedReference = document.querySelector('[data-reference-value]');
  if (savedReference?.dataset.reference) {
    savedReference.textContent = savedReference.dataset.reference;
  }
  const savedRequestStatus = document.querySelector('[data-request-form] .form-status');
  if (savedRequestStatus?.dataset.requestId) {
    savedRequestStatus.textContent = `${languageCopy.messages.success} #${savedRequestStatus.dataset.requestId}.`;
  }
  if (trackedStatus?.dataset.statusKey) {
    trackedStatus.textContent = languageCopy.messages.trackStatuses[trackedStatus.dataset.statusKey];
  }
  if (trackedTime?.dateTime) {
    const date = new Date(trackedTime.dateTime);
    if (!Number.isNaN(date.getTime())) {
      trackedTime.textContent = new Intl.DateTimeFormat(language === 'rw' ? 'rw-RW' : 'en-GB', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(date);
    }
  }
}

function applyTheme(theme) {
  const darkIsOn = theme === 'dark';
  document.documentElement.dataset.theme = darkIsOn ? 'dark' : 'light';
  const language = getSavedValue(languageStorageKey, ['rw', 'en'], 'rw');
  const languageCopy = copy[language];
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const themeLabel = document.querySelector('[data-theme-label]');
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(darkIsOn));
    themeToggle.querySelector('.theme-glyph').textContent = darkIsOn ? '☾' : '☀';
  }
  if (themeLabel && languageCopy) {
    themeLabel.textContent = languageCopy.messages[darkIsOn ? 'lightMode' : 'darkMode'];
    themeToggle.setAttribute('aria-label', themeLabel.textContent);
    themeToggle.title = themeLabel.textContent;
  }
}

const preferenceControls = addPreferenceControls();
const languageSwitch = preferenceControls?.querySelector('[data-language-switch]');
const themeSwitch = preferenceControls?.querySelector('[data-theme-toggle]');
const currentLanguage = getSavedValue(languageStorageKey, ['rw', 'en'], 'rw');
const currentTheme = getSavedValue(themeStorageKey, ['light', 'dark'], 'light');

applyTheme(currentTheme);
applyLanguage(currentLanguage);

languageSwitch?.addEventListener('change', () => {
  const language = languageSwitch.value;
  try { localStorage.setItem(languageStorageKey, language); } catch { /* Storage may be unavailable in private browsing. */ }
  applyLanguage(language);
});

themeSwitch?.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem(themeStorageKey, theme); } catch { /* Storage may be unavailable in private browsing. */ }
  applyTheme(theme);
});

if (navigation && navigationToggle) {
  document.body.classList.add('menu-enhanced');
  navigationToggle.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('is-open');
    navigationToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      navigation.classList.remove('is-open');
      navigationToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

document.querySelectorAll('[data-year]').forEach((year) => {
  year.textContent = String(new Date().getFullYear());
});

const requestForm = document.querySelector('[data-request-form]');
if (requestForm) {
  requestForm.addEventListener('input', (event) => {
    event.target.removeAttribute('aria-invalid');
    updateRequestEstimate();
  });
  requestForm.addEventListener('change', (event) => {
    event.target.removeAttribute('aria-invalid');
    updateRequestEstimate();
  });
  updateRequestEstimate();
  requestForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const status = requestForm.querySelector('.form-status');
    const submitButton = requestForm.querySelector('button[type="submit"]');
    const language = getSavedValue(languageStorageKey, ['rw', 'en'], 'rw');
    const message = copy[language].messages;
    if (!requestForm.reportValidity()) {
      if (status) status.textContent = message.required;
      return;
    }

    const formData = new FormData(requestForm);
    const payload = Object.fromEntries(formData.entries());
    if (status) {
      status.classList.remove('is-error', 'is-success');
      status.textContent = message.sending;
    }
    const referenceNotice = requestForm.querySelector('[data-request-reference]');
    const referenceValue = requestForm.querySelector('[data-reference-value]');
    if (submitButton) submitButton.disabled = true;

    let responseReceived = false;
    try {
      const response = await fetch('../backend/api/requests.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      });
      responseReceived = true;
      let result;
      try {
        result = await response.json();
      } catch {
        if (status) {
          status.classList.add('is-error');
          status.textContent = message.failed;
        }
        return;
      }

      if (!result || typeof result !== 'object' || Array.isArray(result)) {
        if (status) {
          status.classList.add('is-error');
          status.textContent = message.failed;
        }
        return;
      }

      if (
        response.ok
        && result.success === true
        && Number.isInteger(result.request_id)
        && result.request_id > 0
        && (
          result.tracking_reference === null
          || (
            typeof result.tracking_reference === 'string'
            && /^[a-f0-9]{64}$/i.test(result.tracking_reference)
          )
        )
      ) {
        const hasTrackingReference = typeof result.tracking_reference === 'string';
        requestForm.reset();
        requestForm.querySelectorAll('[aria-invalid="true"]').forEach((field) => field.removeAttribute('aria-invalid'));
        if (status) {
          status.classList.add('is-success');
          status.dataset.requestId = String(result.request_id);
          status.textContent = `${message.success} #${result.request_id}.${hasTrackingReference ? '' : ` ${message.trackingNotReady}`}`;
        }
        if (hasTrackingReference && referenceValue && referenceNotice) {
          referenceValue.dataset.reference = result.tracking_reference.toUpperCase();
          referenceValue.textContent = result.tracking_reference.toUpperCase();
          referenceNotice.hidden = false;
        } else if (referenceNotice) {
          referenceNotice.hidden = true;
        }
        return;
      }

      if (response.ok && result.success === true) {
        if (status) {
          status.classList.add('is-error');
          status.textContent = message.unavailable;
        }
        return;
      }

      if (result.errors && typeof result.errors === 'object') {
        Object.keys(result.errors).forEach((name) => {
          requestForm.querySelectorAll(`[name="${name}"]`).forEach((field) => field.setAttribute('aria-invalid', 'true'));
        });
      }

      const errorMessage = result.code === 'validation_error'
        ? message.validation
        : result.code === 'database_unavailable'
          ? message.unavailable
          : message.failed;
      if (status) {
        status.classList.add('is-error');
        status.textContent = errorMessage;
      }
    } catch {
      if (status) {
        status.classList.add('is-error');
        status.textContent = responseReceived ? message.failed : message.connection;
      }
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
}

const trackingForm = document.querySelector('[data-tracking-form]');
if (trackingForm) {
  trackingForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!trackingForm.reportValidity()) return;

    const language = getSavedValue(languageStorageKey, ['rw', 'en'], 'rw');
    const message = copy[language].messages;
    const statusMessage = trackingForm.querySelector('[data-tracking-message]');
    const resultPanel = trackingForm.querySelector('[data-tracking-result]');
    const statusHeading = trackingForm.querySelector('[data-tracking-status]');
    const submittedAt = trackingForm.querySelector('[data-tracking-date]');
    const submitButton = trackingForm.querySelector('button[type="submit"]');
    if (statusMessage) {
      statusMessage.classList.remove('is-error', 'is-success');
      statusMessage.textContent = message.trackSending;
    }
    if (resultPanel) resultPanel.hidden = true;
    if (submitButton) submitButton.disabled = true;

    try {
      const response = await fetch('../backend/api/track-request.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ tracking_reference: new FormData(trackingForm).get('tracking_reference') }),
      });
      const result = await response.json();
      if (response.ok && result && result.success === true && result.request) {
        const customerStatus = message.trackStatuses[result.request.status];
        const date = new Date(result.request.submitted_at);
        if (!customerStatus || Number.isNaN(date.getTime())) throw new Error('Invalid tracking response.');
        if (statusHeading) {
          statusHeading.dataset.statusKey = result.request.status;
          statusHeading.textContent = customerStatus;
        }
        if (submittedAt) {
          submittedAt.dateTime = date.toISOString();
          submittedAt.textContent = new Intl.DateTimeFormat(language === 'rw' ? 'rw-RW' : 'en-GB', {
            dateStyle: 'medium',
            timeStyle: 'short',
          }).format(date);
        }
        if (resultPanel) resultPanel.hidden = false;
        if (statusMessage) statusMessage.textContent = '';
        return;
      }

      if (statusMessage) {
        statusMessage.classList.add('is-error');
        statusMessage.textContent = response.status === 429
          ? message.trackRateLimited
          : result?.code === 'tracking_unavailable'
            ? message.trackUnavailable
            : result?.code === 'request_not_found'
              ? message.trackInvalid
              : message.trackUnexpected;
      }
    } catch {
      if (statusMessage) {
        statusMessage.classList.add('is-error');
        statusMessage.textContent = message.trackUnexpected;
      }
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
}
