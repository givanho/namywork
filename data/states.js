const states = [
  {  "Abia": [
        "Aba North LGA",
        "Aba South LGA",
        "Arochukwu LGA",
        "Bende LGA",
        "Ikwuano LGA",
        "Isiala Ngwa North LGA",
        " Isiala Ngwa South LGA",
        "Isuikwuato LGA",
        "Obi Ngwa LGA",
        "Ohafia LGA",
        "Osisioma Ngwa LGA",
        "Ugwunagbo LGA",
        "Ukwa East LGA",
        "Ukwa West LGA",
        "Umuahia North LGA",
        "Umuahia South LGA",
        "Umu Nneochi LGA"
    ]},
    {"Adamawa": [
        "Demsa LGA",
        "Fufore LGA",
        "Ganye LGA",
        "Girei LGA",
        "Gombi LGA",
        "Guyuk LGA",
        "Hong LGA",
        "Jada LGA",
        "Lamurde LGA",
        "Madagali LGA",
        "Maiha LGA",
        "Mayo-Belwa",
        "Michika LGA",
        "Mubi North LGA",
        "Mubi South LGA",
        "Numan LGA",
        "Shelleng LGA",
        "Song LGA",
        "Toungo LGA",
        "Yola North (State capital) LGA",
        "Yola South LGA"
    ]},
    {"Anambra": [
        " Aguata LGA",
        "Awka North LGA",
        "Awka South LGA",
        "Anambra East LGA",
"Anambra West LGA",
"Anaocha LGA",
"Ayamelum LGA",
"Dunukofia LGA",
"Ekwusigo LGA",
"Idemili North LGA",
"Idemili South LGA",
"Ihiala LGA",
"Njikoka LGA",
"Nnewi North LGA",
"Nnewi South LGA",
"Ogbaru LGA",
"Onitsha North LGA",
"Onitsha South LGA",
"Orumba North LGA",
"Orumba South LGA",
"Oyi LGA"    ]},
{"Akwa Ibom":[
    "Abak LGA",
"Eastern Obolo LGA",
"Eket LGA",
"Esit-Eket LGA",
"Essien Udim LGA",
"Etim-Ekpo LGA",
"Etinan LGA",
"Ibeno LGA",
"Ibesikpo-Asutan LGA",
"Ibiono-Ibom LGA",
"Ika LGA",
"Ikono LGA",
"Ikot Abasi LGA",
"Ikot Ekpene LGA",
"Ini LGA",
"Itu LGA",
"Mbo LGA",
"Mkpat-Enin LGA",
"Nsit-Atai LGA",
"Nsit-Ibom LGA",
"Nsit-Ubium LGA",
"Obot-Akara LGA",
"Okobo LGA",
"Onna LGA",
"Oron LGA",
"Oruk Anam LGA",
"Ukanafun LGA",
"Udung-Uko LGA",
"Uruan LGA",
"Urue-Offong/Oruko LGA",
"Uyo LGA"
]}, 
{"Bauchi":[
   " Alkaleri LGA",
"Bauchi LGA",
"Bauchi Town Area",
"Bogoro LGA",
"Dambam LGA",
"Darazo LGA",
"Dass LGA",
"Gamawa LGA",
"Ganjuwa LGA",
"Giade LGA",
"Itas/Gadau LGA",
"Jama’re LGA",
"Katagum LGA",
"Kirfi LGA",
"Misau LGA",
"Ningi LGA",
"Shira LGA",
"Tafawa Balewa LGA",
"Toro LGA",
"Warji LGA",
"Zaki LGA"
]},
{"Bayelsa":[
"Brass LGA",
"Ekeremor LGA",
"Kolokuma/Opokuma LGA",
"Nembe LGA",
"Ogbia LGA",
"Sagbama LGA",
"Southern Ijaw LGA",
"Yenagoa LGA"
]}, 
{"Benue":[
"Ado",
"Agatu LGA",
"Apa LGA",
"Ado LGA",
"Buruku LGA",
"Gboko LGA",
"Guma LGA",
"Gwer East/West LGA",
"Katsina-Ala LGA",
"Konshisha LGA",
"Kwande LGA",
"Logo LGA",
"Makurdi LGA",
"Obi LGA",
"Ogbadibo LGA",
"Ohimini LGA",
"Oju LGA",
"Okpokwu LGA",
"Otukpo LGA",
"Tarka LGA",
"Ukum LGA",
"Ushongo LGA",
"Vandeikya LGA"
]},
{"Borno":[
    "Abadam LGA",
"Askira/Uba LGA",
"Bama LGA",
"Bayo LGA",
"Biu",
"Chibok LGA",
"Damboa LGA",
"Dikwa LGA",
"Gubio LGA",
"Guzamala LGA",
"Gwoza LGA",
"Hawul LGA",
"Jere LGA",
"Kala/Balge LGA",
"Kaga LGA",
"Konduga LGA",
"Kukawa LGA",
"Kwaya Kusar LGA",
"Mafa LGA",
"Magumeri LGA",
"Maiduguri",
"Marte LGA",
"Mobbar LGA",
"Monguno LGA",
"Ngala LGA",
"Nganzai LGA",
"Shani LGA"
]},
{"Cross-River" : [
   "Abi LGA",
"Akamkpa LGA",
"Akpabuyo LGA",
"Bakassi LGA",
"Bekwarra LGA",
"Biase LGA",
"Boki LGA",
"Calabar Municipal LGA",
"Calabar South LGA",
"Etung LGA",
"Ikom LGA",
"Obanliku LGA",
"Obubra LGA",
"Obudu LGA",
"Odukpani LGA",
"Ogoja LGA",
"Yakuur LGA",
"Yala LGA"
]},
{"Delta": [
    "Ethiope East",
    " Ethiope West",
    " Okpe, Sapele",
     "Udu", 
     "Ughelli North",
     " Ughelli South",
     " Uvwie", 
     "Aniocha North",
      "Aniocha South",
       "Ika North East",
        "Ikaa South",
        "Ndokwa East",
        "Ndokwa West", 
        "Oshimili North",
        "Oshimili South",
        "Ukwuani",
        "Bomadi",
        "Burutu",
        "Isoko North",
        "Isoko South",
        "Patani",
        "Warri North",
        "Warri South", 
        "Warri South-West"
]}, 
{"Ebonyi" :[
   " Abakaliki LGA",
"Afikpo North LGA",
"Afikpo South (Edda) LGA",
"Ebonyi LGA",
"Ezza North LGA",
"Ezza South LGA",
"Ikwo LGA",
"Ishielu LGA",
"Ivo LGA",
"Izzi LGA",
"Ohaozara LGA",
"Ohaukwu LGA",
"Onicha LGA",
]}, 
{"Edo" :[
    "Akoko-Edo LGA",
"Egor LGA",
"Esan Central LGA",
"Esan North-East LGA",
"Esan South-East LGA",
"Esan West LGA",
"Etsako Central LGA",
"Etsako East LGA",
"Etsako West LGA",
"Igueben LGA",
"Ikpoba-Okha LGA",
"Oredo LGA",
"Orhionmwon LGA",
"Ovia North-East LGA",
"Ovia South-West LGA",
"Owan East LGA",
"Owan West LGA",
"Uhunmwonde LGA"

]},
{"Ekiti" : [
    "Ado-Ekiti LGA",
"Ikere LGA",
"Oye LGA",
"Aiyekire (Gbonyin) LGA",
"Efon LGA",
"Ekiti East LGA",
"Ekiti South-West LGA",
"Ekiti West LGA",
"Emure LGA",
"Ido-Osi LGA",
"Ijero LGA",
"Ikole LGA",
"Ilejemeje LGA",
"Irepodun/Ifelodun LGA",
"Ise/Orun LGA",
"Moba LGA",
]},
{"Enugu" :[
   " Aninri LGA",
"Awgu LGA",
"Enugu East LGA",
"Enugu North LGA",
"Enugu South LGA",
"Ezeagu LGA",
"Igbo Etiti LGA",
"Igbo Eze North LGA",
"Igbo Eze South LGA",
"Isi Uzo LGA",
"Nkanu East LGA",
"Nkanu West LGA",
"Nsukka LGA",
"Oji River LGA",
"Udenu LGA",
"Udi LGA",
"Uzo-Uwani LGA"
]},
{"FCT" :[
    "Abaji LGA",
"Bwari LGA",
"Gwaywalada LGA",
"Kuje LGA",
"Kwali LGA",
"Abuja Municipal Area Council"
]},
{"Gombe" :[
    "Akko LGA",
"Balanga LGA",
"Billiri LGA",
"Dukku LGA",
"Funakaya LGA",
"Gombe LGA",
"Kaitnugo LGA",
"Kwami LGA",
"Nafada LGA",
"Shongom LGA",
"Yamaltu Deba LGA"
]},
{"Imo" :[
    "Aboh Mbaise LGA",
"Ahiazu Mbaise LGA",
"Ehime Mbano LGA",
"Ezinihitte Mbaise LGA",
"Ideato North LGA",
"Ideato South LGA",
"Ihitte/Uboma LGA",
"Ikeduru LGA",
"Isiala Mbano LGA",
"Isu LGA",
"Mbaitoli LGA",
"Ngor Okpala LGA",
"Njaba LGA",
"Nkwerre LGA",
"Nwangele LGA",
"Obowo/Obowu LGA",
"Oguta LGA",
"Ohaji/Egbema LGA",
"Okigwe LGA",
"Onuimo LGA",
"Orlu LGA",
"Orsu LGA",
"Oru East LGA",
"Oru West LGA",
"Owerri Municipal LGA",
"Owerri North LGA",
"Owerri West LGA"
]},
{"Jigawa" :[
    "Auyo LGA",
"Babura LGA",
"Biriniwa LGA",
"Birnin Kudu LGA",
"Buji LGA",
"Dutse LGA",
"Gagarawa LGA",
"Garki LGA",
"Gumel LGA",
"Guri LGA",
"Gwaram LGA",
"Gwiwa LGA",
"Hadejia LGA",
"Jahun LGA",
"Kafin Hausa LGA",
"Kaugama LGA",
"Kazaure LGA",
"Kiri Kasama LGA",
"Kiyawa LGA",
"Maigatari LGA",
"Malam Madori LGA",
"Miga LGA",
"Ringim LGA",
"Roni LGA",
"Sule Tankarkar LGA",
"Taura LGA",
"Yankwashi LGA"
]},
{"Kaduna" :[
    "Birnin Gwari LGA",
"Chikun LGA",
"Giwa LGA",
"Igabi LGA",
"Ikara LGA",
"Jaba LGA",
"Jema’a LGA",
"Kachia LGA",
"Kaduna North LGA",
"Kaduna South LGA",
"Kagarko LGA",
"Kajuru LGA",
"Kaura LGA",
"Kauru LGA",
"Kubau LGA",
"Kudan LGA",
"Lere LGA",
"Makarfi LGA",
"Sabon Gari LGA",
"Sanga LGA",
"Soba LGA",
"Zangon Kataf LGA",
"Zaria LGA"
]},
{"Kano" :[
   " Ajingi LGA",
"Albasu LGA",
"Bagwai LGA",
"Bebeji LGA",
"Bichi LGA",
"Bunkure LGA",
"Dala LGA",
"Dambatta LGA",
"Dawakin Kudu LGA",
"Dawakin Tofa LGA",
"Doguwa LGA",
"Fagge LGA",
"Gabasawa LGA",
"Garko LGA",
"Garun Mallam LGA",
"Gaya LGA",
"Gezawa LGA",
"Gwale LGA",
"Gwarzo LGA",
"Kabo LGA",
"Kano City/Municipal LGA",
"Karaye LGA",
"Kibiya LGA",
"Kiru LGA",
"kumbotso LGA",
"Kunchi LGA",
"Kura LGA",
"Madobi LGA",
"Makoda LGA",
"Minjibir LGA",
"Nasarawa LGA",
"Rano LGA",
"Rimin Gado LGA",
"Rogo LGA",
"Shanono LGA",
"Sumaila LGA",
"Takai LGA",
"Tarauni LGA",
"Tofa LGA",
"Tsanyawa LGA",
"Tudun Wada LGA",
 "Ungogo LGA",
"Warawa LGA",
 "Wudil LGA",
]},
{"Katsina" :[
    "Bakori LGA",
"Batagarawa LGA",
"Batsari LGA",
"Baure LGA",
"Bindawa LGA",
"Charanchi LGA",
"Dan Musa LGA",
"Dandume LGA",
"Danja LGA",
"Daura LGA",
"Dutsi LGA",
"Dutsin-Ma LGA",
"Faskari LGA",
"Funtua LGA",
"Ingawa LGA",
"Jibia LGA",
"Kafur LGA",
"Kaita LGA",
"Kankara LGA",
"Kankia LGA",
"Katsina LGA",
"Kurfi LGA",
"Kusada LGA",
"Mai’Adua LGA",
"Malumfashi LGA",
"Mani LGA",
"Mashi LGA",
"Matazu LGA",
"Musawa LGA",
"Rimi LGA",
"Sabuwa LGA",
"Safana LGA",
"Sandamu LGA",
"Zango LGA",
]},
{"Kebbi" :[
    "Aleiro LGA",
"Arewa Dandi LGA",
"Argungu LGA",
"Augie LGA",
"Bagudo LGA",
"Birnin Kebbi LGA",
"Bunza LGA",
"Dandi LGA",
"Fakai LGA",
"Gwandu LGA",
"Jega LGA",
"Kalgo LGA",
"Koko/Besse LGA",
"Maiyama LGA",
"Ngaski LGA",
"Sakaba LGA",
"Shanga LGA",
"Suru LGA",
"Danko/Wasagu LGA",
"Yauri LGA",
"Zuru LGA",
]},
{"Kogi" :[
    "Adavi LGA",
"Ajaokuta LGA",
"Ankpa LGA",
"Bassa LGA",
"Dekina LGA",
"Ibaji LGA",
"Idah LGA",
"Igalamela Odolu LGA",
"Ijumu LGA",
"Kabba/Bunu LGA",
"Kabba Town Area",
"Koton Karfe LGA",
"Kogi LGA",
"Lokoja LGA",
"Mopa Muro LGA",
"Ofu LGA",
"Ogori/Magongo LGA",
"Okehi LGA",
"Okene LGA",
"Olamaboro LGA",
"Omala LGA",
"Yagba East LGA",
"Yagba West LGA",
]},
{"Kwara" : [
"Asa LGA",
"Baruten LGA",
"Edu LGA",
"Ekiti LGA",
"Ifelodun LGA",
"Ilorin East LGA",
"Ilorin South LGA",
"Ilorin West LGA",
"Irepodun LGA",
"Isin LGA",
"Kaiama LGA",
"Moro LGA",
"Offa LGA",
"Oke Ero LGA",
"Oyun LGA",
"Pategi LGA",
]},
{"Lagos" : [
    "Agege LGA",
"Alimosho LGA",
"Ajeromi-Ifelodun LGA",
"Amuwo-Odofin LGA",
"Apapa LGA",
"Badagry LGA",
"Epe LGA",
"Eti-Osa LGA",
"Ibeju-Lekki LGA",
"Ifako-Ijaye LGA",
"Ikeja LGA",
"Ikorodu LGA",
"Kosofe LGA",
"Lagos Mainland LGA",
"Lagos Island LGA",
"Mushin LGA",
"Ojo LGA",
"Oshodi-Isolo LGA",
"Shomolu LGA",
"Surulere LGA",

]},
{"Nasarawa" : [
    "Akwanga LGA",
"Awe LGA",
"Doma LGA",
"Karu LGA",
"Keana LGA",
"Keffi LGA",
"Kokona LGA",
"Lafia LGA",
"Nasarawa LGA",
"Nasarawa Egon LGA",
"Obi LGA",
"Toto LGA",
"Wamba LGA",
]},
{"Niger" :[
    "Agaie LGA",
"Agwara LGA",
"Bida LGA",
"Borgu LGA",
"Bosso LGA",
"Chanchaga LGA",
"Edati LGA",
"Gbako LGA",
"Gurara LGA",
"Katcha LGA",
"Kontagora LGA",
"Lapai LGA",
"Lavun LGA",
"Magama LGA",
"Mariga LGA",
"Mashegu LGA",
"Mokwa LGA",
"Moya LGA",
"Paikoro LGA",
"Rafi LGA",
"Rijau LGA",
"Shiroro LGA",
"Suleja LGA",
"Tafa LGA",
"Wushishi LGA"
]},
{"Ogun" : [
    "Abeokuta North LGA",
"Abeokuta South LGA",
"Ado-Odo/Ota LGA",
"Ewekoro LGA",
"Ifo LGA",
"Ijebu East LGA",
"Ijebu North LGA",
"Ijebu North-East LGA",
"Ijebu Ode LGA",
"Ikenne LGA",
"Imeko Afon LGA",
"Ipokia LGA",
"Obafemi Owode LGA",
"Odogbolu LGA",
"Odeda LGA",
"Ogun Waterside LGA",
"Remo North LGA",
"Sagamu LGA (Shagamu)",
"Sango Ota",
"Yewa North LGA" ,
"Yewa South LGA ",
]},
{"Ondo" :[
    "Akoko North-East LGA",
"Akoko North-West LGA",
"Akoko South-East LGA",
"Akoko South-West LGA",
"Akure North LGA",
"Akure South LGA",
"Ese Odo LGA",
"Idanre LGA",
"Ifedore LGA",
"Ilaje LGA",
"Ile Oluji/Okeigbo LGA",
"Irele LGA",
"Odigbo LGA",
"Okitipupa LGA",
"Ondo East LGA",
"Ondo West LGA",
"Ose LGA",
"Owo LGA",
]},
{"Osun" : [
    "Aiyedaade LGA",
"Aiyedire LGA",
"Atakunmosa East LGA",
"Atakunmosa West LGA",
"Boluwaduro LGA",
"Boripe LGA",
"Ede North LGA",
"Ede South LGA",
"Egbedore LGA",
"Ejigbo LGA",
"Ife Central LGA",
"Ife East LGA",
"Ife North LGA",
"Ife South LGA",
"Ifedayo LGA",
"Ifelodun LGA",
"Ila LGA",
"Ilesa East LGA",
"Ilesa West LGA",
"Irepodun LGA",
"Irewole LGA",
"Isokan LGA",
"Iwo LGA",
"Obokun LGA",
"Odo Otin LGA",
"Ola Oluwa LGA",
"Olorunda LGA",
"Oriade LGA",
"Orolu LGA",
"Osogbo LGA"
]},
{"Oyo" :[
    "Akinyele LGA",
"Afijio LGA",
"Atiba LGA",
"Atisbo LGA",
"Egbeda LGA",
"Ibadan North LGA",
"Ibadan North-East LGA",
"Ibadan North-West LGA",
"Ibadan South-West LGA",
"Ibadan South-East LGA",
"Ibarapa Central LGA",
"Ibarapa East LGA",
"Ibarapa North LGA",
"Ido LGA",
"Irepo LGA",
"Iseyin LGA",
"Itesiwaju LGA",
"Iwajowa LGA",
"Kajola LGA",
"Lagelu LGA",
"Ogbomosho North LGA",
"Ogbomosho South LGA",
"Oyo East LGA",
"Oyo West LGA",
"Olorunsogo LGA",
"Oluyole LGA",
"Ogo Oluwa LGA",
"Orelope LGA",
"Ori Ire LGA",
"Ona Ara LGA",
"Saki West LGA",
]},
{"Plateau" :[
   " Barkin Ladi LGA",
"Bassa LGA",
"Bokkos LGA",
"Jos East LGA",
"Jos North LGA",
"Jos South LGA",
"Kanam LGA",
"Kanke LGA",
"Langtang South LGA",
"Langtang North LGA",
"Mangu LGA",
"Mikang LGA",
"Pankshin LGA",
"Qua’an Pan LGA",
"Riyom LGA",
"Shendam LGA",
"Wase LGA",
]},
{"Rivers" :[
    "Port Harcourt",
"Obio-Akpor LGA",
"Oyigbo LGA",
"Opobo–Nkoro LGA",
"Abua–Odual LGA",
"Ahoada East LGA",
"Ahoada West LGA",
"Akuku-Toru LGA",
"Andoni LGA",
"Asari-Toru LGA",
"Bonny LGA",
"Degema LGA",
"Eleme LGA",
"Emohua LGA",
"Etche LGA",
"Gokana LGA",
"Ikwerre LGA",
"Khana LGA",
"Ogba–Egbema–Ndoni LGA",
"Ogu–Bolo LGA",
"Okrika LGA",
"Omuma LGA",
"Tai LGA",


]},
{"Sokoto" :[
   " Binji LGA",
"Bodinga LGA",
"Dange Shuni LGA",
"Gada LGA",
"Goronyo LGA",
"Gudu LGA",
"Gwadabawa LGA",
"Illela LGA",
"Isa LGA",
"Kebbe LGA",
"Kware LGA",
"Rabah LGA",
"Sabon Birni LGA",
"Shagari LGA",
"Silame LGA",
"Sokoto North LGA",
"Sokoto South LGA",
"Tambuwal LGA",
"Tangaza LGA",
"Tureta LGA",
"Wamako LGA",
"Wurno LGA",
"Yabo LGA",
]},
{"Taraba" :[
   " Ardo-kola LGA",
"Bali LGA",
"Donga LGA",
"Gashaka LGA",
"Gassol LGA",
"Ibi LGA",
"Jalingo LGA",
"Karin-Lamido LGA",
"Kurmi LGA",
"Lau LGA",
"Sardauna LGA",
"Takum LGA",
"Ussa LGA",
"Wukari LGA",
"Yorro LGA",
"Zing LGA",
]},
{"Yobe" :[
    "Bade LGA",
"Busari LGA",
"Damaturu LGA",
"Fika LGA",
"Fune LGA",
"Geidam LGA",
"Gujba LGA",
"Gulani LGA",
"Jakusko LGA",
"Karasuwa LGA",
"Machina LGA",
"Nangere LGA",
"Nguru LGA",
"Potiskum LGA",
"Tarmuwa LGA",
"Yunusa LGA",
"Yusufari LGA",
]},
{"Zamfara" :[
    "Anka LGA",
"Bakura LGA",
"Birnin Magaji/Kiyaw LGA",
"Bukkuyum LGA",
"Bungudu LGA",
"Tsafe LGA",
"Gummi LGA",
"Gusau LGA",
"Kaura Namoda LGA",
"Maradun LGA",
"Maru LGA",
"Shinkafi LGA",
"Talata Mafara LGA",
"Zurmi LGA"
]}








]
    export default states