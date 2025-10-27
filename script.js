document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const cityInput = document.getElementById('cityInput');
    const searchBtn = document.getElementById('searchBtn');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const cityInfo = document.getElementById('cityInfo');
    const cityNameElement = document.getElementById('cityName');
    const categoryTitleElement = document.getElementById('categoryTitle');
    const resultsContainer = document.getElementById('results');
    const noResults = document.getElementById('noResults');

    // Current state
    let currentCity = '';
    let currentCategory = '';

    // Mock database of Indian city information
    const cityDatabase = {
'mumbai': { 
            schools: [
                { name: 'Indian Institute of Technology Bombay', rating: 4.9, address: 'Powai, Mumbai, Maharashtra 400076', description: 'Premier engineering and technology institute in India.' },
                { name: 'St. Xavier\'s College', rating: 4.7, address: '5, Mahapalika Marg, Mumbai, Maharashtra 400001', description: 'Historic college known for arts, science, and commerce programs.' },
                { name: 'Dhirubhai Ambani International School', rating: 4.8, address: 'Bandra Kurla Complex, Mumbai, Maharashtra 400098', description: 'Top-rated international school with excellent facilities.' },
                { name: 'Tata Institute of Social Sciences', rating: 4.6, address: 'V.N. Purav Marg, Mumbai, Maharashtra 400088', description: 'Renowned institute for social science education and research.' }
            ],
            restaurants: [
                { name: 'Trishna', rating: 4.8, address: '7 Saibaba Road, Kala Ghoda, Mumbai, Maharashtra 400001', description: 'Famous seafood restaurant known for butter garlic crab.' },
                { name: 'The Bombay Canteen', rating: 4.7, address: 'Kamala Mills, Lower Parel, Mumbai, Maharashtra 400013', description: 'Modern Indian cuisine with regional flavors.' },
                { name: 'Britannia & Co.', rating: 4.6, address: 'Wakefield House, Ballard Estate, Mumbai, Maharashtra 400038', description: 'Iconic Parsi restaurant serving berry pulao and sali boti.' },
                { name: 'Swati Snacks', rating: 4.5, address: '248, Karai Estate, Mumbai, Maharashtra 400004', description: 'Popular for authentic Gujarati and Mumbai street food.' }
            ],
            hospitals: [
                { name: 'Kokilaben Dhirubhai Ambani Hospital', rating: 4.8, address: 'Rao Saheb Achutrao Patwardhan Marg, Mumbai, Maharashtra 400053', description: 'Multi-specialty hospital with advanced medical technology.' },
                { name: 'Lilavati Hospital', rating: 4.7, address: 'Bandra Reclamation, Mumbai, Maharashtra 400050', description: 'Leading hospital with excellent critical care facilities.' },
                { name: 'Tata Memorial Hospital', rating: 4.9, address: 'Dr. E Borges Road, Parel, Mumbai, Maharashtra 400012', description: 'Specialized cancer research and treatment center.' },
                { name: 'Jaslok Hospital', rating: 4.6, address: '15, Dr. Deshmukh Marg, Mumbai, Maharashtra 400026', description: 'Multi-specialty hospital with renowned medical professionals.' }
            ],
            touristspots: [
                { name: 'Gateway of India', rating: 4.9, address: 'Apollo Bunder, Colaba, Mumbai, Maharashtra 400001', description: 'Iconic arch monument built in Indo-Saracenic style, overlooking the Arabian Sea.' },
                { name: 'Marine Drive', rating: 4.8, address: 'Netaji Subhash Chandra Bose Road, Mumbai, Maharashtra 400020', description: 'Famous seaside promenade known as the Queen\'s Necklace, offering stunning sunset views.' },
                { name: 'Elephanta Caves', rating: 4.7, address: 'Elephanta Island, Mumbai Harbour, Maharashtra 400094', description: 'UNESCO World Heritage site featuring ancient cave temples dedicated to Lord Shiva.' },
                { name: 'Juhu Beach', rating: 4.6, address: 'Juhu Tara Road, Juhu, Mumbai, Maharashtra 400049', description: 'Popular beach known for celebrity homes, street food, and beautiful sunsets.' }
            ]
},
'lucknow': { 
    schools: [
        { 
            name: 'La Martiniere College', 
            rating: 4.9, 
            address: 'La Martiniere Road, Hazratganj, Lucknow, Uttar Pradesh 226001', 
            description: 'Prestigious historic school offering top-quality education and co-curricular programs.' 
        },
        { 
            name: 'City Montessori School (CMS)', 
            rating: 4.8, 
            address: 'Station Road, Lucknow, Uttar Pradesh 226001', 
            description: 'World’s largest school known for academic excellence and global education initiatives.' 
        },
        { 
            name: 'Loreto Convent Intermediate College', 
            rating: 4.7, 
            address: '92, Mahatma Gandhi Marg, Lucknow, Uttar Pradesh 226001', 
            description: 'Renowned girls’ school focusing on value-based and holistic education.' 
        },
        { 
            name: 'Delhi Public School, Shaheed Path', 
            rating: 4.6, 
            address: 'Shaheed Path, Lucknow, Uttar Pradesh 226002', 
            description: 'CBSE-affiliated school offering modern education and excellent infrastructure.' 
        }
    ],
    restaurants: [
        { 
            name: 'Tunday Kababi', 
            rating: 4.8, 
            address: 'Aminabad, Lucknow, Uttar Pradesh 226018', 
            description: 'Legendary eatery famous for melt-in-the-mouth Galouti Kebabs and Mughlai dishes.' 
        },
        { 
            name: 'Royal Café', 
            rating: 4.7, 
            address: 'Hazratganj, Lucknow, Uttar Pradesh 226001', 
            description: 'Popular family restaurant known for Basket Chaat and North Indian cuisine.' 
        },
        { 
            name: 'Idris Biryani', 
            rating: 4.6, 
            address: 'Patanala, Chowk, Lucknow, Uttar Pradesh 226003', 
            description: 'Authentic Awadhi biryani place with generations of tradition.' 
        },
        { 
            name: 'Oudhyana – Taj Mahal Hotel', 
            rating: 4.7, 
            address: 'Vipin Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010', 
            description: 'Luxury fine-dining restaurant serving refined Awadhi cuisine.' 
        }
    ],
    hospitals: [
        { 
            name: 'Sanjay Gandhi Postgraduate Institute of Medical Sciences (SGPGIMS)', 
            rating: 4.9, 
            address: 'Raebareli Road, Lucknow, Uttar Pradesh 226014', 
            description: 'Premier tertiary-care medical institute and research center.' 
        },
        { 
            name: 'King George’s Medical University (KGMU) Hospital', 
            rating: 4.8, 
            address: 'Chowk, Lucknow, Uttar Pradesh 226003', 
            description: 'Historic government medical college and hospital offering advanced healthcare services.' 
        },
        { 
            name: 'Apollo Medics Super Speciality Hospital', 
            rating: 4.7, 
            address: 'Kanpur Road, Lucknow, Uttar Pradesh 226012', 
            description: 'Modern private hospital providing multi-specialty medical care and emergency services.' 
        },
        { 
            name: 'Mayo Medical Centre', 
            rating: 4.6, 
            address: 'Gomti Nagar, Lucknow, Uttar Pradesh 226010', 
            description: 'Multi-specialty hospital offering quality healthcare and surgical facilities.' 
        }
    ],
    touristspots: [
        { name: 'Bara Imambara', rating: 4.8, address: 'Husainabad, Lucknow, Uttar Pradesh 226003', description: 'Historic Mughal-era monument famous for its central hall and labyrinth (Bhul Bhulaiya).' },
        { name: 'Rumi Darwaza', rating: 4.7, address: 'Husainabad, Lucknow, Uttar Pradesh 226003', description: 'Iconic 18th-century gateway symbolizing Lucknow’s heritage.' },
        { name: 'Ambedkar Memorial Park', rating: 4.6, address: 'Gomti Nagar, Lucknow, Uttar Pradesh 226010', description: 'Massive sandstone park featuring statues and beautiful architecture.' },
        { name: 'Hazratganj Market', rating: 4.5, address: 'Hazratganj, Lucknow, Uttar Pradesh 226001', description: 'Famous shopping and food hub with colonial architecture.' },
    ]
},
'agra': { 
    schools: [
        { 
            name: 'St. Peter’s College', 
            rating: 4.8, 
            address: 'Wazirpura Road, Agra, Uttar Pradesh 282003', 
            description: 'One of Agra’s oldest and most reputed schools offering quality education and discipline.' 
        },
        { 
            name: 'Delhi Public School (DPS) Agra', 
            rating: 4.7, 
            address: 'Shastripuram, Agra, Uttar Pradesh 282007', 
            description: 'CBSE-affiliated school known for academic excellence and co-curricular development.' 
        },
        { 
            name: 'St. George’s College', 
            rating: 4.6, 
            address: 'Mall Road, Agra Cantt, Agra, Uttar Pradesh 282001', 
            description: 'Renowned ICSE school emphasizing holistic education and discipline.' 
        },
        { 
            name: 'The International School Agra', 
            rating: 4.5, 
            address: 'Shastripuram, Agra, Uttar Pradesh 282007', 
            description: 'Modern school providing global-standard education and extracurricular programs.' 
        }
    ],
    restaurants: [
        { 
            name: 'Pinch of Spice', 
            rating: 4.8, 
            address: 'Agra Cantt, Agra, Uttar Pradesh 282001', 
            description: 'Famous for North Indian and Mughlai cuisine with elegant ambiance.' 
        },
        { 
            name: 'Dasaprakash Restaurant', 
            rating: 4.7, 
            address: 'Meher Cinema Road, Agra, Uttar Pradesh 282001', 
            description: 'Popular South Indian restaurant offering authentic dosas and thalis.' 
        },
        { 
            name: 'The Salt Café Kitchen & Bar', 
            rating: 4.6, 
            address: 'Sadar Bazaar, Agra, Uttar Pradesh 282001', 
            description: 'Trendy rooftop restaurant offering a mix of Indian and continental dishes.' 
        },
        { 
            name: 'Esphahan – The Oberoi Amarvilas', 
            rating: 4.9, 
            address: 'Taj East Gate Road, Agra, Uttar Pradesh 282001', 
            description: 'Luxury fine-dining restaurant known for its royal Mughlai delicacies and Taj Mahal views.' 
        }
    ],
    hospitals: [
        { 
            name: 'Pushpanjali Hospital & Research Centre', 
            rating: 4.7, 
            address: 'Delhi Gate, Agra, Uttar Pradesh 282002', 
            description: 'Multi-specialty hospital providing advanced medical care and diagnostics.' 
        },
        { 
            name: 'S.N. Medical College & Hospital', 
            rating: 4.6, 
            address: 'Mahatma Gandhi Road, Agra, Uttar Pradesh 282002', 
            description: 'Government medical institution offering comprehensive healthcare and education.' 
        },
        { 
            name: 'Ravi Hospital', 
            rating: 4.5, 
            address: 'Sanjay Place, Agra, Uttar Pradesh 282002', 
            description: 'Well-known for orthopedic, cardiac, and general medical care.' 
        },
        { 
            name: 'Global Rainbow Healthcare', 
            rating: 4.8, 
            address: 'NH-2, Near Guru Ka Tal Gurudwara, Agra, Uttar Pradesh 282007', 
            description: 'Modern hospital offering advanced facilities and specialized medical services.' 
        }
    ],
    touristspots: [
        { name: 'Taj Mahal', rating: 5.0, address: 'Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001', description: 'UNESCO World Heritage Site and symbol of love built by Emperor Shah Jahan.' },
        { name: 'Agra Fort', rating: 4.8, address: 'Rakabganj, Agra, Uttar Pradesh 282003', description: 'Massive 16th-century Mughal fort made of red sandstone and marble.' },
        { name: 'Mehtab Bagh', rating: 4.6, address: 'Opposite Taj Mahal, across Yamuna River, Agra, Uttar Pradesh', description: 'Scenic garden offering stunning sunset views of the Taj Mahal.' },
        { name: 'Fatehpur Sikri', rating: 4.7, address: 'Fatehpur Sikri, Agra District, Uttar Pradesh 283110', description: 'Historic Mughal capital built by Akbar, known for Buland Darwaza and Jama Masjid.' },
        
    ]
},
'kanpur': { 
    schools: [
        { 
            name: 'Methodist High School', 
            rating: 4.7, 
            address: 'Cantonment, Kanpur, Uttar Pradesh 208004', 
            description: 'One of Kanpur’s oldest schools, offering ICSE curriculum with excellent academics.' 
        },
        { 
            name: 'Delhi Public School (DPS) Kalyanpur', 
            rating: 4.8, 
            address: 'Kalyanpur, Kanpur, Uttar Pradesh 208017', 
            description: 'Reputed CBSE-affiliated school focusing on all-round development and academics.' 
        },
        { 
            name: 'Jain International School', 
            rating: 4.6, 
            address: 'Azad Nagar, Kanpur, Uttar Pradesh 208002', 
            description: 'Modern school providing world-class infrastructure and co-curricular programs.' 
        },
        { 
            name: 'Sir Padampat Singhania Education Centre', 
            rating: 4.7, 
            address: 'Panki Road, Kanpur, Uttar Pradesh 208020', 
            description: 'Renowned CBSE school known for discipline and quality education.' 
        }
    ],
    restaurants: [
        { 
            name: 'Haveli Restaurant', 
            rating: 4.7, 
            address: 'Govind Nagar, Kanpur, Uttar Pradesh 208006', 
            description: 'Popular restaurant serving authentic North Indian and Punjabi food.' 
        },
        { 
            name: 'Waterside', 
            rating: 4.6, 
            address: 'Rave 3 Mall, Parvati Bagla Road, Kanpur, Uttar Pradesh 208001', 
            description: 'Fine dining restaurant with a relaxing ambiance and diverse menu.' 
        },
        { 
            name: 'Zyka Restaurant', 
            rating: 4.5, 
            address: 'Swaroop Nagar, Kanpur, Uttar Pradesh 208002', 
            description: 'Famous for Mughlai and tandoori delicacies.' 
        },
        { 
            name: 'Terraza 9', 
            rating: 4.8, 
            address: 'Mall Road, Kanpur, Uttar Pradesh 208001', 
            description: 'Rooftop restaurant offering Indian and continental cuisines with city views.' 
        }
    ],
    hospitals: [
        { 
            name: 'Regency Hospital', 
            rating: 4.8, 
            address: 'Sarvodaya Nagar, Kanpur, Uttar Pradesh 208005', 
            description: 'Super-specialty hospital providing modern medical services and advanced care.' 
        },
        { 
            name: 'Hallet Hospital (LLR Hospital)', 
            rating: 4.6, 
            address: 'Swaroop Nagar, Kanpur, Uttar Pradesh 208002', 
            description: 'Government hospital attached to GSVM Medical College, providing affordable healthcare.' 
        },
        { 
            name: 'Fortune Hospital', 
            rating: 4.5, 
            address: 'Arya Nagar, Kanpur, Uttar Pradesh 208002', 
            description: 'Multi-specialty hospital known for critical care and diagnostics.' 
        },
        { 
            name: 'Krishna Super Speciality Hospital', 
            rating: 4.7, 
            address: 'Govind Nagar, Kanpur, Uttar Pradesh 208006', 
            description: 'Modern healthcare facility offering advanced treatments and surgical care.' 
        }
    ],
    touristspots: [
        { name: 'Allen Forest Zoo', rating: 4.6, address: 'Azad Nagar, Kanpur, Uttar Pradesh 208002', description: 'Popular zoological park with wildlife and green areas.' },
        { name: 'J.K. Temple', rating: 4.5, address: 'Civil Lines, Kanpur, Uttar Pradesh 208001', description: 'Beautiful temple known for intricate architecture and spiritual ambience.' },
        { name: 'Moti Jheel', rating: 4.6, address: 'Kanpur, Uttar Pradesh 208001', description: 'Scenic lake area with boating, walking paths, and recreational spaces.' },
        { name: 'Kanpur Memorial Church', rating: 4.5, address: 'Mall Road, Kanpur, Uttar Pradesh 208001', description: 'Historic British-era church built to honor soldiers of the 1857 rebellion.' }
    ]
},
'prayagraj': { 
    schools: [
        { 
            name: 'Boys’ High School & College', 
            rating: 4.8, 
            address: '4 P.D. Tandon Road, Civil Lines, Prayagraj, Uttar Pradesh 211001', 
            description: 'Prestigious ICSE school offering strong academics and co-curricular excellence.' 
        },
        { 
            name: 'St. Joseph’s College', 
            rating: 4.7, 
            address: '11, Tashkent Marg, Civil Lines, Prayagraj, Uttar Pradesh 211001', 
            description: 'Historic school known for discipline and top-notch educational quality.' 
        },
        { 
            name: 'Delhi Public School (DPS) Prayagraj', 
            rating: 4.6, 
            address: 'Yamuna Bank Road, Prayagraj, Uttar Pradesh 211011', 
            description: 'Modern CBSE school focusing on academics, sports, and leadership development.' 
        },
        { 
            name: 'Bethany Convent School', 
            rating: 4.5, 
            address: 'Naini, Prayagraj, Uttar Pradesh 211008', 
            description: 'Reputed English-medium school providing value-based education for holistic growth.' 
        }
    ],
    restaurants: [
        { 
            name: 'El Chico Restaurant', 
            rating: 4.8, 
            address: '33 Sardar Patel Marg, Civil Lines, Prayagraj, Uttar Pradesh 211001', 
            description: 'Famous family restaurant offering Indian, Chinese, and continental cuisine.' 
        },
        { 
            name: 'Paradise Restaurant', 
            rating: 4.6, 
            address: 'Civil Lines, Prayagraj, Uttar Pradesh 211001', 
            description: 'Popular dining spot known for Mughlai dishes and comfortable ambiance.' 
        },
        { 
            name: 'Curry Leaf', 
            rating: 4.5, 
            address: 'MG Marg, Civil Lines, Prayagraj, Uttar Pradesh 211001', 
            description: 'Stylish restaurant offering North Indian and Chinese cuisines.' 
        },
        { 
            name: 'Friends Forever Café', 
            rating: 4.7, 
            address: 'Tagore Town, Prayagraj, Uttar Pradesh 211002', 
            description: 'Trendy café serving coffee, snacks, and fast food with a relaxed atmosphere.' 
        }
    ],
    hospitals: [
        { 
            name: 'Kamala Nehru Memorial Hospital', 
            rating: 4.7, 
            address: 'Tagore Town, Prayagraj, Uttar Pradesh 211002', 
            description: 'Renowned hospital providing multi-specialty care and women’s health services.' 
        },
        { 
            name: 'United Medicity Hospital', 
            rating: 4.8, 
            address: 'Naini, Prayagraj, Uttar Pradesh 211008', 
            description: 'Modern super-specialty hospital equipped with advanced medical facilities.' 
        },
        { 
            name: 'Nazareth Hospital', 
            rating: 4.6, 
            address: 'Cantonment, Prayagraj, Uttar Pradesh 211001', 
            description: 'Trusted healthcare center providing affordable treatment and compassionate care.' 
        },
        { 
            name: 'Phoenix Hospital', 
            rating: 4.5, 
            address: 'Civil Lines, Prayagraj, Uttar Pradesh 211001', 
            description: 'Private hospital known for emergency care and general medicine services.' 
        }
    ],
         touristspots: [
        { name: 'Triveni Sangam', rating: 5.0, address: 'Prayagraj, Uttar Pradesh 211001', description: 'Confluence of the Ganges, Yamuna, and mythical Saraswati rivers, major pilgrimage site.' },
        { name: 'Allahabad Fort', rating: 4.7, address: 'Near Sangam, Prayagraj, Uttar Pradesh 211001', description: 'Historic fort built by Emperor Akbar in 1583, overlooking the Yamuna river.' },
        { name: 'Anand Bhavan', rating: 4.6, address: 'Civil Lines, Prayagraj, Uttar Pradesh 211001', description: 'Historic house museum of the Nehru family, showcasing India’s freedom struggle.' },
        { name: 'Khusro Bagh', rating: 4.5, address: 'Civil Lines, Prayagraj, Uttar Pradesh 211001', description: 'Large Mughal-era garden with tombs of Khusrau, eldest son of Emperor Jahangir.' }
    ]
},
'noida': { 
    schools: [
        { 
            name: 'Delhi Public School (DPS) Noida', 
            rating: 4.9, 
            address: 'Sector 30, Noida, Uttar Pradesh 201303', 
            description: 'Top-rated CBSE school known for excellence in academics, sports, and extracurriculars.' 
        },
        { 
            name: 'Amity International School', 
            rating: 4.8, 
            address: 'Sector 44, Noida, Uttar Pradesh 201303', 
            description: 'Part of the Amity group offering modern education and global exposure.' 
        },
        { 
            name: 'Lotus Valley International School', 
            rating: 4.7, 
            address: 'Sector 126, Noida, Uttar Pradesh 201313', 
            description: 'Premier school emphasizing innovative learning and holistic development.' 
        },
        { 
            name: 'Somerville School', 
            rating: 4.6, 
            address: 'Sector 22, Noida, Uttar Pradesh 201301', 
            description: 'Renowned ICSE school offering value-based education and modern facilities.' 
        }
    ],
    restaurants: [
        { 
            name: 'Barbeque Nation', 
            rating: 4.8, 
            address: 'Sector 16, Noida, Uttar Pradesh 201301', 
            description: 'Popular buffet restaurant offering a wide variety of grilled dishes and desserts.' 
        },
        { 
            name: 'Mainland China', 
            rating: 4.7, 
            address: 'DLF Mall of India, Sector 18, Noida, Uttar Pradesh 201301', 
            description: 'Famous for authentic Chinese cuisine and elegant ambiance.' 
        },
        { 
            name: 'SodaBottleOpenerWala', 
            rating: 4.6, 
            address: 'DLF Mall of India, Sector 18, Noida, Uttar Pradesh 201301', 
            description: 'Parsi café-themed restaurant offering Bombay-style dishes and snacks.' 
        },
        { 
            name: 'Desi Vibes', 
            rating: 4.7, 
            address: 'Sector 18, Noida, Uttar Pradesh 201301', 
            description: 'Traditional Indian restaurant known for North Indian delicacies and rustic décor.' 
        }
    ],
    hospitals: [
        { 
            name: 'Jaypee Hospital', 
            rating: 4.9, 
            address: 'Sector 128, Noida, Uttar Pradesh 201304', 
            description: 'Multi-specialty hospital offering cutting-edge healthcare and international standards.' 
        },
        { 
            name: 'Fortis Hospital', 
            rating: 4.8, 
            address: 'Sector 62, Noida, Uttar Pradesh 201301', 
            description: 'Renowned hospital providing advanced medical treatment and emergency services.' 
        },
        { 
            name: 'Kailash Hospital', 
            rating: 4.6, 
            address: 'Sector 27, Noida, Uttar Pradesh 201301', 
            description: 'Trusted healthcare facility known for quality care and diagnostics.' 
        },
        { 
            name: 'Apollo Hospitals Noida', 
            rating: 4.7, 
            address: 'Sector 26, Noida, Uttar Pradesh 201301', 
            description: 'Comprehensive healthcare center offering specialized treatments and surgeries.' 
        }
    ],
        touristspots: [
        { name: 'Okhla Bird Sanctuary', rating: 4.7, address: 'Okhla, Noida, Uttar Pradesh 201301', description: 'Protected wetland area with diverse migratory birds and natural trails.' },
        { name: 'Worlds of Wonder (WOW)', rating: 4.6, address: 'Sector 38A, Noida, Uttar Pradesh 201301', description: 'Popular amusement and water park with rides for all ages.' },
        { name: 'Botanical Garden, Noida', rating: 4.5, address: 'Sector 38, Noida, Uttar Pradesh 201301', description: 'Lush garden with seasonal flowers, trees, and walking paths.' },
        { name: 'The Great India Place Mall', rating: 4.4, address: 'Sector 38A, Noida, Uttar Pradesh 201301', description: 'Large shopping and entertainment complex with shops, restaurants, and cinemas.' }
    ]
},
'ghaziabad': { 
    schools: [
        { 
            name: 'Delhi Public School (DPS) Ghaziabad', 
            rating: 4.9, 
            address: 'Sector 12, Raj Nagar, Ghaziabad, Uttar Pradesh 201002', 
            description: 'Top-ranked CBSE school known for academic excellence and co-curricular achievements.' 
        },
        { 
            name: 'Amity International School', 
            rating: 4.7, 
            address: 'Vasundhara Sector 1, Ghaziabad, Uttar Pradesh 201012', 
            description: 'Renowned for global-standard education and holistic student development.' 
        },
        { 
            name: 'Bal Bharati Public School', 
            rating: 4.6, 
            address: 'Brijnagar, Rajendra Nagar, Ghaziabad, Uttar Pradesh 201005', 
            description: 'CBSE-affiliated school focusing on innovation, academics, and character building.' 
        },
        { 
            name: 'St. Paul’s Academy', 
            rating: 4.5, 
            address: 'Raj Nagar, Ghaziabad, Uttar Pradesh 201002', 
            description: 'English-medium school providing strong academics and co-curricular activities.' 
        }
    ],
    restaurants: [
        { 
            name: 'The Yellow Chilli', 
            rating: 4.8, 
            address: 'Raj Nagar, Ghaziabad, Uttar Pradesh 201002', 
            description: 'Modern Indian restaurant by Chef Sanjeev Kapoor offering gourmet North Indian cuisine.' 
        },
        { 
            name: 'Pind Balluchi', 
            rating: 4.7, 
            address: 'Indirapuram, Ghaziabad, Uttar Pradesh 201014', 
            description: 'Traditional Punjabi-themed restaurant serving rich Indian dishes.' 
        },
        { 
            name: 'Barbeque Nation', 
            rating: 4.6, 
            address: 'Indirapuram Habitat Centre, Ghaziabad, Uttar Pradesh 201014', 
            description: 'Buffet restaurant popular for live grills and wide food variety.' 
        },
        { 
            name: 'Bikanervala', 
            rating: 4.5, 
            address: 'Raj Nagar Extension, Ghaziabad, Uttar Pradesh 201017', 
            description: 'Vegetarian restaurant serving Indian sweets and traditional snacks.' 
        }
    ],
    hospitals: [
        { 
            name: 'Columbia Asia Hospital', 
            rating: 4.7, 
            address: 'Hapur Road, Ghaziabad, Uttar Pradesh 201002', 
            description: 'Multi-specialty hospital offering modern healthcare and diagnostics.' 
        },
        { 
            name: 'Yashoda Super Speciality Hospital', 
            rating: 4.8, 
            address: 'Nehru Nagar, Ghaziabad, Uttar Pradesh 201001', 
            description: 'Advanced tertiary-care hospital known for cardiac and critical care services.' 
        },
        { 
            name: 'Max Super Speciality Hospital', 
            rating: 4.7, 
            address: 'Vaishali, Ghaziabad, Uttar Pradesh 201010', 
            description: 'Leading private hospital offering world-class medical treatment and surgery.' 
        },
        { 
            name: 'Shreya Hospital', 
            rating: 4.5, 
            address: 'Surya Nagar, Ghaziabad, Uttar Pradesh 201011', 
            description: 'Trusted healthcare facility known for quality service and patient care.' 
        }
    ],
        touristspots: [
        { name: 'Swarn Jayanti Park', rating: 4.6, address: 'Raj Nagar, Ghaziabad, Uttar Pradesh 201001', description: 'Large urban park with walking tracks, gardens, and recreational areas.' },
        { name: 'Shipra Mall', rating: 4.4, address: 'Vasundhara, Ghaziabad, Uttar Pradesh 201012', description: 'Popular shopping and entertainment complex with restaurants and cinema.' },
        { name: 'ISKCON Temple Ghaziabad', rating: 4.7, address: 'Vaishali, Ghaziabad, Uttar Pradesh 201012', description: 'Spiritual temple complex with vibrant architecture and cultural events.' },
        { name: 'Kavi Nagar Park', rating: 4.5, address: 'Kavi Nagar, Ghaziabad, Uttar Pradesh 201002', description: 'Community park with walking trails and green open spaces for relaxation.' }
    ]
},
'meerut': { 
    schools: [
        { 
            name: 'Dewan Public School', 
            rating: 4.8, 
            address: 'West End Road, Meerut, Uttar Pradesh 250001', 
            description: 'Leading CBSE school in Meerut known for academic excellence and extracurricular programs.' 
        },
        { 
            name: 'St. Mary’s Academy', 
            rating: 4.7, 
            address: 'Abu Lane, Meerut Cantt, Meerut, Uttar Pradesh 250001', 
            description: 'Reputed ICSE school focusing on discipline, academics, and holistic education.' 
        },
        { 
            name: 'Dayawati Modi Academy', 
            rating: 4.6, 
            address: 'Modipuram, Meerut, Uttar Pradesh 250110', 
            description: 'Modern CBSE-affiliated school offering global-standard education and infrastructure.' 
        },
        { 
            name: 'Sophia Girls’ School', 
            rating: 4.5, 
            address: 'Shastri Nagar, Meerut, Uttar Pradesh 250004', 
            description: 'Renowned girls’ school known for strong academics and co-curricular activities.' 
        }
    ],
    restaurants: [
        { 
            name: 'Hill View Restaurant', 
            rating: 4.7, 
            address: 'Abu Lane, Meerut, Uttar Pradesh 250001', 
            description: 'Family restaurant offering Indian and Chinese cuisine in a pleasant ambiance.' 
        },
        { 
            name: 'Mr. Brown Bakery & Café', 
            rating: 4.6, 
            address: 'Garh Road, Meerut, Uttar Pradesh 250004', 
            description: 'Popular café known for its bakery products, pizzas, and coffee.' 
        },
        { 
            name: 'Panchhi Petha & Restaurant', 
            rating: 4.5, 
            address: 'Begumpul, Meerut, Uttar Pradesh 250002', 
            description: 'Famous for traditional sweets and delicious North Indian dishes.' 
        },
        { 
            name: 'Olive Garden Restaurant', 
            rating: 4.7, 
            address: 'Delhi Road, Meerut, Uttar Pradesh 250002', 
            description: 'Modern restaurant offering a wide range of multi-cuisine dishes.' 
        }
    ],
    hospitals: [
        { 
            name: 'Anand Hospital', 
            rating: 4.8, 
            address: 'Shastri Nagar, Meerut, Uttar Pradesh 250004', 
            description: 'Multi-specialty hospital providing advanced treatment and emergency care.' 
        },
        { 
            name: 'Subharti Medical College & Hospital', 
            rating: 4.7, 
            address: 'Meerut-Hapur Road, Meerut, Uttar Pradesh 250005', 
            description: 'Renowned teaching hospital offering modern healthcare services.' 
        },
        { 
            name: 'KMC Hospital', 
            rating: 4.6, 
            address: 'Garh Road, Meerut, Uttar Pradesh 250004', 
            description: 'Private hospital known for its quality medical care and patient support.' 
        },
        { 
            name: 'Vardhman Hospital', 
            rating: 4.5, 
            address: 'Abu Lane, Meerut, Uttar Pradesh 250001', 
            description: 'Specialty hospital offering excellent diagnostic and surgical facilities.' 
        }
    ],
        touristspots: [
        { name: 'Augarnath Temple', rating: 4.7, address: 'Augarnath, Meerut, Uttar Pradesh 250002', description: 'Historic Hindu temple dedicated to Lord Shiva, attracting many pilgrims.' },
        { name: 'Shahpeer Tomb & Shrine', rating: 4.5, address: 'Shahpeer, Meerut, Uttar Pradesh 250001', description: 'Ancient tomb and spiritual site with beautiful architecture.' },
        { name: 'St. John’s Church', rating: 4.4, address: 'Civil Lines, Meerut, Uttar Pradesh 250001', description: 'Colonial-era church known for its historic significance and architecture.' },
        { name: 'Augarnath Park', rating: 4.6, address: 'Meerut, Uttar Pradesh 250002', description: 'Public park with greenery, walking trails, and recreational spaces.' }
    ]
},
'gorakhpur': { 
    schools: [
        { 
            name: 'St. Joseph’s College', 
            rating: 4.8, 
            address: 'Lohia Nagar, Gorakhpur, Uttar Pradesh 273001', 
            description: 'Prestigious school known for ICSE/ISC curriculum and strong academics.' 
        },
        { 
            name: 'Kendriya Vidyalaya, Gorakhpur', 
            rating: 4.7, 
            address: 'University Road, Gorakhpur, Uttar Pradesh 273009', 
            description: 'Central government school offering CBSE education with disciplined environment.' 
        },
        { 
            name: 'Ryan International School', 
            rating: 4.6, 
            address: 'Cantonment Area, Gorakhpur, Uttar Pradesh 273008', 
            description: 'Modern school focusing on academics, sports, and extracurricular development.' 
        },
        { 
            name: 'Delhi Public School (DPS) Gorakhpur', 
            rating: 4.5, 
            address: 'Gorakhpur City, Uttar Pradesh 273001', 
            description: 'Well-known CBSE school providing quality education and facilities.' 
        }
    ],
    restaurants: [
        { 
            name: 'Baba Sweets & Restaurant', 
            rating: 4.7, 
            address: 'Bank Road, Gorakhpur, Uttar Pradesh 273001', 
            description: 'Popular for sweets, North Indian cuisine, and casual dining.' 
        },
        { 
            name: 'City Club Restaurant', 
            rating: 4.6, 
            address: 'Gorakhnath Road, Gorakhpur, Uttar Pradesh 273002', 
            description: 'Family-friendly restaurant serving Indian and continental cuisine.' 
        },
        { 
            name: 'Cafe Coffee Day', 
            rating: 4.5, 
            address: 'Near Gorakhnath Mandir, Gorakhpur, Uttar Pradesh 273001', 
            description: 'Popular café for coffee, snacks, and casual meetings.' 
        },
        { 
            name: 'The Yellow Chilli', 
            rating: 4.8, 
            address: 'Gorakhpur Cantt, Gorakhpur, Uttar Pradesh 273008', 
            description: 'Fine-dining restaurant offering modern Indian cuisine by Chef Sanjeev Kapoor.' 
        }
    ],
    hospitals: [
        { 
            name: 'Baba Raghav Das Medical College & Hospital', 
            rating: 4.8, 
            address: 'Bank Road, Gorakhpur, Uttar Pradesh 273001', 
            description: 'Major government hospital providing comprehensive healthcare services.' 
        },
        { 
            name: 'Max Super Speciality Hospital', 
            rating: 4.7, 
            address: 'Near Gorakhnath Mandir, Gorakhpur, Uttar Pradesh 273001', 
            description: 'Modern hospital offering advanced medical treatments and surgeries.' 
        },
        { 
            name: 'Paramount Hospital', 
            rating: 4.6, 
            address: 'Cantonment Area, Gorakhpur, Uttar Pradesh 273008', 
            description: 'Private hospital known for multi-specialty care and diagnostics.' 
        },
        { 
            name: 'Shanti Hospital', 
            rating: 4.5, 
            address: 'University Road, Gorakhpur, Uttar Pradesh 273009', 
            description: 'Trusted healthcare facility providing quality care across specialties.' 
        }
    ],
         touristspots: [
        { name: 'Gorakhnath Temple', rating: 4.8, address: 'Gorakhnath, Gorakhpur, Uttar Pradesh 273001', description: 'Famous temple dedicated to Guru Gorakhnath, major pilgrimage site.' },
        { name: 'Geeta Press', rating: 4.6, address: 'Gorakhpur, Uttar Pradesh 273001', description: 'Historic press known for publishing religious texts and books.' },
        { name: 'Ramgarh Tal', rating: 4.5, address: 'Gorakhpur, Uttar Pradesh 273001', description: 'Scenic lake with boating facilities and park surroundings.' },
        { name: 'Imambara', rating: 4.4, address: 'Gorakhpur, Uttar Pradesh 273001', description: 'Historic Shia Islamic monument with beautiful architecture.' }
    ]
},
'bareilly': { 
    schools: [
        { 
            name: 'St. Joseph’s College', 
            rating: 4.8, 
            address: 'Civil Lines, Bareilly, Uttar Pradesh 243001', 
            description: 'Prestigious ICSE/ISC school offering excellent academics and extracurricular opportunities.' 
        },
        { 
            name: 'Delhi Public School (DPS) Bareilly', 
            rating: 4.7, 
            address: 'C.B. Ganj, Bareilly, Uttar Pradesh 243001', 
            description: 'Well-known CBSE school focusing on holistic education and innovation.' 
        },
        { 
            name: 'Ryan International School', 
            rating: 4.6, 
            address: 'Civil Lines, Bareilly, Uttar Pradesh 243001', 
            description: 'Modern school offering international-standard education and co-curricular programs.' 
        },
        { 
            name: 'Mount Carmel School', 
            rating: 4.5, 
            address: 'Civil Lines, Bareilly, Uttar Pradesh 243001', 
            description: 'Reputed school emphasizing academics, discipline, and values-based learning.' 
        }
    ],
    restaurants: [
        { 
            name: 'The Yellow Chilli', 
            rating: 4.7, 
            address: 'Civil Lines, Bareilly, Uttar Pradesh 243001', 
            description: 'Fine-dining restaurant offering modern Indian cuisine by Chef Sanjeev Kapoor.' 
        },
        { 
            name: 'Pind Balluchi', 
            rating: 4.6, 
            address: 'Civil Lines, Bareilly, Uttar Pradesh 243001', 
            description: 'Traditional Punjabi-themed restaurant serving rich Indian dishes.' 
        },
        { 
            name: 'Barbeque Nation', 
            rating: 4.5, 
            address: 'Civil Lines, Bareilly, Uttar Pradesh 243001', 
            description: 'Popular buffet restaurant offering live grills and multi-cuisine dishes.' 
        },
        { 
            name: 'Bikanervala', 
            rating: 4.6, 
            address: 'Civil Lines, Bareilly, Uttar Pradesh 243001', 
            description: 'Vegetarian restaurant serving Indian sweets, snacks, and meals.' 
        }
    ],
    hospitals: [
        { 
            name: 'Rishabh Hospital', 
            rating: 4.7, 
            address: 'Civil Lines, Bareilly, Uttar Pradesh 243001', 
            description: 'Multi-specialty hospital offering advanced medical care and diagnostic facilities.' 
        },
        { 
            name: 'Life Care Hospital', 
            rating: 4.6, 
            address: 'Civil Lines, Bareilly, Uttar Pradesh 243001', 
            description: 'Trusted hospital providing quality healthcare services across specialties.' 
        },
        { 
            name: 'Bareilly Heart Institute', 
            rating: 4.8, 
            address: 'Civil Lines, Bareilly, Uttar Pradesh 243001', 
            description: 'Specialized cardiac care center offering advanced heart treatments.' 
        },
        { 
            name: 'Sumitra Hospital', 
            rating: 4.5, 
            address: 'Civil Lines, Bareilly, Uttar Pradesh 243001', 
            description: 'Private hospital providing general medical care and emergency services.' 
        }
    ],
        touristspots: [
        { name: 'Alakhnath Temple', rating: 4.7, address: 'Bareilly, Uttar Pradesh 243001', description: 'Famous Hindu temple dedicated to Lord Shiva and a major pilgrimage site.' },
        { name: 'Fun City Amusement Park', rating: 4.5, address: 'Bareilly, Uttar Pradesh 243001', description: 'Popular family-friendly amusement park with rides and attractions.' },
        { name: 'Trivati Nath Temple', rating: 4.6, address: 'Bareilly, Uttar Pradesh 243001', description: 'Historic temple known for its architecture and spiritual importance.' },
        { name: 'Bareilly Central Mall', rating: 4.4, address: 'Civil Lines, Bareilly, Uttar Pradesh 243001', description: 'Large shopping and entertainment complex with food courts and cinemas.' }
    ]
},
'aligarh': { 
    schools: [
        { 
            name: 'Delhi Public School (DPS) Aligarh', 
            rating: 4.8, 
            address: 'Mughalpura, Aligarh, Uttar Pradesh 202001', 
            description: 'Top CBSE school focusing on academics, sports, and co-curricular excellence.' 
        },
        { 
            name: 'St. Aloysius Inter College', 
            rating: 4.7, 
            address: 'Civil Lines, Aligarh, Uttar Pradesh 202001', 
            description: 'Historic school known for ICSE education and disciplined learning environment.' 
        },
        { 
            name: 'Ryan International School', 
            rating: 4.6, 
            address: 'Aligarh Cantt, Aligarh, Uttar Pradesh 202001', 
            description: 'Modern school providing quality education and extracurricular opportunities.' 
        },
        { 
            name: 'JSS Public School', 
            rating: 4.5, 
            address: 'Muslim Gali, Aligarh, Uttar Pradesh 202001', 
            description: 'Reputed school offering value-based education with modern infrastructure.' 
        }
    ],
    restaurants: [
        { 
            name: 'The Yellow Chilli', 
            rating: 4.7, 
            address: 'Civil Lines, Aligarh, Uttar Pradesh 202001', 
            description: 'Fine-dining restaurant offering modern Indian cuisine curated by Chef Sanjeev Kapoor.' 
        },
        { 
            name: 'Pind Balluchi', 
            rating: 4.6, 
            address: 'Gokul Market, Aligarh, Uttar Pradesh 202001', 
            description: 'Popular Punjabi-themed restaurant serving rich North Indian dishes.' 
        },
        { 
            name: 'Barbeque Nation', 
            rating: 4.5, 
            address: 'Aligarh Cantt, Aligarh, Uttar Pradesh 202001', 
            description: 'Buffet restaurant famous for live grills and variety of cuisines.' 
        },
        { 
            name: 'Bikanervala', 
            rating: 4.6, 
            address: 'Civil Lines, Aligarh, Uttar Pradesh 202001', 
            description: 'Vegetarian restaurant serving sweets, snacks, and traditional Indian meals.' 
        }
    ],
    hospitals: [
        { 
            name: 'Jawahar Lal Nehru Medical College & Hospital', 
            rating: 4.8, 
            address: 'AMU Campus, Aligarh, Uttar Pradesh 202002', 
            description: 'Major teaching hospital offering advanced healthcare services and specialties.' 
        },
        { 
            name: 'Aligarh Hospital', 
            rating: 4.6, 
            address: 'Civil Lines, Aligarh, Uttar Pradesh 202001', 
            description: 'Multi-specialty hospital known for general medical care and patient services.' 
        },
        { 
            name: 'Mahamaya Hospital', 
            rating: 4.7, 
            address: 'Gokul Market, Aligarh, Uttar Pradesh 202001', 
            description: 'Private hospital providing quality diagnostics and treatment across specialties.' 
        },
        { 
            name: 'Divine Hospital', 
            rating: 4.5, 
            address: 'Muslim Gali, Aligarh, Uttar Pradesh 202001', 
            description: 'Modern healthcare facility offering emergency care and specialized treatments.' 
        }
    ],
        touristspots: [
        { name: 'Aligarh Fort', rating: 4.6, address: 'Aligarh, Uttar Pradesh 202001', description: 'Historic fort built by Mughal rulers, showcasing impressive architecture.' },
        { name: 'Sir Syed Academy', rating: 4.5, address: 'Aligarh Muslim University, Aligarh, Uttar Pradesh 202002', description: 'Cultural and educational landmark within AMU campus.' },
        { name: 'Jama Masjid', rating: 4.4, address: 'Aligarh, Uttar Pradesh 202001', description: 'Historic mosque known for its beautiful architecture and heritage.' },
        { name: 'St. George’s Church', rating: 4.3, address: 'Aligarh, Uttar Pradesh 202001', description: 'Colonial-era church with historical significance.' }
    ]
},
'jhansi': { 
    schools: [
        { 
            name: 'St. Anthony’s College', 
            rating: 4.7, 
            address: 'Mahal Road, Jhansi, Uttar Pradesh 284001', 
            description: 'Reputed ICSE/ISC school offering strong academics and extracurricular programs.' 
        },
        { 
            name: 'Delhi Public School (DPS) Jhansi', 
            rating: 4.8, 
            address: 'Gwalior Road, Jhansi, Uttar Pradesh 284001', 
            description: 'Top-rated CBSE school focusing on holistic education and leadership development.' 
        },
        { 
            name: 'Holy Cross School', 
            rating: 4.6, 
            address: 'Civil Lines, Jhansi, Uttar Pradesh 284001', 
            description: 'Well-known school providing value-based education and modern infrastructure.' 
        },
        { 
            name: 'Army Public School', 
            rating: 4.5, 
            address: 'Jhansi Cantt, Jhansi, Uttar Pradesh 284001', 
            description: 'Renowned school for disciplined and quality education.' 
        }
    ],
    restaurants: [
        { 
            name: 'Suruchi Restaurant', 
            rating: 4.7, 
            address: 'Gwalior Road, Jhansi, Uttar Pradesh 284001', 
            description: 'Popular family restaurant serving North Indian and Mughlai cuisine.' 
        },
        { 
            name: 'The Yellow Chilli', 
            rating: 4.6, 
            address: 'Civil Lines, Jhansi, Uttar Pradesh 284001', 
            description: 'Fine-dining restaurant offering modern Indian cuisine by Chef Sanjeev Kapoor.' 
        },
        { 
            name: 'Barbeque Nation', 
            rating: 4.5, 
            address: 'Mahal Road, Jhansi, Uttar Pradesh 284001', 
            description: 'Buffet restaurant famous for live grills and variety of cuisines.' 
        },
        { 
            name: 'Bikanervala', 
            rating: 4.6, 
            address: 'Civil Lines, Jhansi, Uttar Pradesh 284001', 
            description: 'Vegetarian restaurant serving Indian sweets, snacks, and traditional meals.' 
        }
    ],
    hospitals: [
        { 
            name: 'Jhansi Medical College & Hospital', 
            rating: 4.8, 
            address: 'Gwalior Road, Jhansi, Uttar Pradesh 284001', 
            description: 'Major teaching hospital providing advanced healthcare services.' 
        },
        { 
            name: 'Chirayu Hospital', 
            rating: 4.6, 
            address: 'Mahal Road, Jhansi, Uttar Pradesh 284001', 
            description: 'Well-known multi-specialty hospital offering quality treatment.' 
        },
        { 
            name: 'Ratan Hospital', 
            rating: 4.5, 
            address: 'Civil Lines, Jhansi, Uttar Pradesh 284001', 
            description: 'Private hospital offering general medical care and emergency services.' 
        },
        { 
            name: 'Sanjeevani Hospital', 
            rating: 4.7, 
            address: 'Jhansi Cantt, Jhansi, Uttar Pradesh 284001', 
            description: 'Modern healthcare facility providing specialized treatments and diagnostics.' 
        }
    ],
        touristspots: [
        { name: 'Jhansi Fort', rating: 4.8, address: 'Jhansi, Uttar Pradesh 284001', description: 'Historic fort built in the 17th century, famous for its role in the 1857 rebellion.' },
        { name: 'Rani Mahal', rating: 4.6, address: 'Jhansi, Uttar Pradesh 284001', description: 'Palace of Rani Lakshmibai, now a museum showcasing artifacts and history.' },
        { name: 'St. Jude Church', rating: 4.4, address: 'Jhansi, Uttar Pradesh 284001', description: 'Colonial-era church known for its architecture and peaceful ambience.' },
        { name: 'Mahalaxmi Temple', rating: 4.5, address: 'Jhansi, Uttar Pradesh 284001', description: 'Popular temple dedicated to Goddess Mahalaxmi, visited by locals and tourists.' }
    ]
}, 
'moradabad': { 
    schools: [
        { 
            name: 'Delhi Public School (DPS) Moradabad', 
            rating: 4.8, 
            address: 'Cantonment Area, Moradabad, Uttar Pradesh 244001', 
            description: 'Top CBSE school offering academic excellence, sports, and co-curricular programs.' 
        },
        { 
            name: 'St. Francis School', 
            rating: 4.7, 
            address: 'Civil Lines, Moradabad, Uttar Pradesh 244001', 
            description: 'Reputed ICSE school known for holistic education and strong academics.' 
        },
        { 
            name: 'Ryan International School', 
            rating: 4.6, 
            address: 'Shastri Nagar, Moradabad, Uttar Pradesh 244001', 
            description: 'Modern school providing quality education with excellent infrastructure.' 
        },
        { 
            name: 'Mount Carmel School', 
            rating: 4.5, 
            address: 'Civil Lines, Moradabad, Uttar Pradesh 244001', 
            description: 'Well-known school focusing on academics, discipline, and co-curricular activities.' 
        }
    ],
    restaurants: [
        { 
            name: 'The Yellow Chilli', 
            rating: 4.7, 
            address: 'Civil Lines, Moradabad, Uttar Pradesh 244001', 
            description: 'Fine-dining restaurant offering modern Indian cuisine by Chef Sanjeev Kapoor.' 
        },
        { 
            name: 'Barbeque Nation', 
            rating: 4.6, 
            address: 'Civil Lines, Moradabad, Uttar Pradesh 244001', 
            description: 'Buffet restaurant popular for live grills and wide variety of dishes.' 
        },
        { 
            name: 'Pind Balluchi', 
            rating: 4.5, 
            address: 'Civil Lines, Moradabad, Uttar Pradesh 244001', 
            description: 'Traditional Punjabi-themed restaurant serving rich North Indian food.' 
        },
        { 
            name: 'Bikanervala', 
            rating: 4.6, 
            address: 'Civil Lines, Moradabad, Uttar Pradesh 244001', 
            description: 'Vegetarian restaurant serving sweets, snacks, and Indian meals.' 
        }
    ],
    hospitals: [
        { 
            name: 'District Hospital Moradabad', 
            rating: 4.7, 
            address: 'Civil Lines, Moradabad, Uttar Pradesh 244001', 
            description: 'Government hospital offering comprehensive healthcare services.' 
        },
        { 
            name: 'Fortis Hospital', 
            rating: 4.8, 
            address: 'Shastri Nagar, Moradabad, Uttar Pradesh 244001', 
            description: 'Multi-specialty hospital providing advanced treatments and emergency care.' 
        },
        { 
            name: 'Swami Vivekanand Hospital', 
            rating: 4.6, 
            address: 'Civil Lines, Moradabad, Uttar Pradesh 244001', 
            description: 'Private hospital known for general healthcare and diagnostics.' 
        },
        { 
            name: 'Rashmi Hospital', 
            rating: 4.5, 
            address: 'Shastri Nagar, Moradabad, Uttar Pradesh 244001', 
            description: 'Modern healthcare facility offering specialized treatments and quality care.' 
        }
    ],
         touristspots: [
        { name: 'Chandni Mahal', rating: 4.6, address: 'Moradabad, Uttar Pradesh 244001', description: 'Historic palace showcasing Mughal-era architecture and heritage.' },
        { name: 'Mangal Pandey Park', rating: 4.5, address: 'Moradabad, Uttar Pradesh 244001', description: 'Public park with gardens, walking paths, and recreational spaces.' },
        { name: 'Government Museum Moradabad', rating: 4.4, address: 'Civil Lines, Moradabad, Uttar Pradesh 244001', description: 'Museum displaying historical artifacts and local heritage items.' },
        { name: 'Dargah Panj Peer', rating: 4.5, address: 'Moradabad, Uttar Pradesh 244001', description: 'Famous spiritual site and Sufi shrine visited by locals and tourists.' }
    ]
},
'ayodhya': { 
    schools: [
        { 
            name: 'Delhi Public School (DPS) Ayodhya', 
            rating: 4.7, 
            address: 'Civil Lines, Ayodhya, Uttar Pradesh 224001', 
            description: 'Reputed CBSE school focusing on academics, extracurriculars, and holistic development.' 
        },
        { 
            name: 'St. Joseph’s Convent School', 
            rating: 4.6, 
            address: 'Kursi Road, Ayodhya, Uttar Pradesh 224001', 
            description: 'Well-known ICSE school offering value-based education and strong academics.' 
        },
        { 
            name: 'Ryan International School', 
            rating: 4.5, 
            address: 'Civil Lines, Ayodhya, Uttar Pradesh 224001', 
            description: 'Modern school providing quality education with modern infrastructure and activities.' 
        },
        { 
            name: 'Kendriya Vidyalaya, Ayodhya', 
            rating: 4.6, 
            address: 'Civil Lines, Ayodhya, Uttar Pradesh 224001', 
            description: 'Central government school offering disciplined CBSE education.' 
        }
    ],
    restaurants: [
        { 
            name: 'Ram Ki Rasoi', 
            rating: 4.7, 
            address: 'Near Hanuman Garhi, Ayodhya, Uttar Pradesh 224001', 
            description: 'Traditional restaurant serving North Indian vegetarian cuisine.' 
        },
        { 
            name: 'The Yellow Chilli', 
            rating: 4.6, 
            address: 'Civil Lines, Ayodhya, Uttar Pradesh 224001', 
            description: 'Fine-dining restaurant offering modern Indian cuisine curated by Chef Sanjeev Kapoor.' 
        },
        { 
            name: 'Cafe De Ayodhya', 
            rating: 4.5, 
            address: 'Kursi Road, Ayodhya, Uttar Pradesh 224001', 
            description: 'Casual café offering coffee, snacks, and light meals.' 
        },
        { 
            name: 'Pind Balluchi', 
            rating: 4.6, 
            address: 'Civil Lines, Ayodhya, Uttar Pradesh 224001', 
            description: 'Punjabi-themed restaurant serving rich Indian dishes and buffet options.' 
        }
    ],
    hospitals: [
        { 
            name: 'District Hospital Ayodhya', 
            rating: 4.7, 
            address: 'Civil Lines, Ayodhya, Uttar Pradesh 224001', 
            description: 'Government hospital providing general and emergency healthcare services.' 
        },
        { 
            name: 'Ayodhya Medical Centre', 
            rating: 4.6, 
            address: 'Kursi Road, Ayodhya, Uttar Pradesh 224001', 
            description: 'Modern hospital offering multi-specialty care and diagnostics.' 
        },
        { 
            name: 'Shanti Hospital', 
            rating: 4.5, 
            address: 'Civil Lines, Ayodhya, Uttar Pradesh 224001', 
            description: 'Private hospital providing quality medical care across specialties.' 
        },
        { 
            name: 'Ram Hospital', 
            rating: 4.6, 
            address: 'Near Hanuman Garhi, Ayodhya, Uttar Pradesh 224001', 
            description: 'Trusted healthcare facility offering emergency services and treatment.' 
        }
    ],
        touristspots: [
        { name: 'Ram Janmabhoomi', rating: 5.0, address: 'Ayodhya, Uttar Pradesh 224123', description: 'Birthplace of Lord Rama, major pilgrimage and religious site.' },
        { name: 'Hanuman Garhi', rating: 4.8, address: 'Ayodhya, Uttar Pradesh 224123', description: 'Ancient temple dedicated to Lord Hanuman, famous for its spiritual significance.' },
        { name: 'Kanak Bhawan', rating: 4.6, address: 'Ayodhya, Uttar Pradesh 224123', description: 'Palace-style temple dedicated to Lord Rama and Sita, known for its beautiful architecture.' },
        { name: 'Saryu River Ghats', rating: 4.7, address: 'Ayodhya, Uttar Pradesh 224123', description: 'Riverfront ghats for pilgrims and tourists, famous for evening aarti ceremonies.' }
    ]
},
'mathura': { 
    schools: [
        { 
            name: 'Delhi Public School (DPS) Mathura', 
            rating: 4.8, 
            address: 'Gokul Road, Mathura, Uttar Pradesh 281001', 
            description: 'Reputed CBSE school offering quality academics, extracurriculars, and modern facilities.' 
        },
        { 
            name: 'St. Mary’s School', 
            rating: 4.7, 
            address: 'Cantonment Area, Mathura, Uttar Pradesh 281001', 
            description: 'ICSE-affiliated school known for strong academics and disciplined environment.' 
        },
        { 
            name: 'Ryan International School', 
            rating: 4.6, 
            address: 'Mathura City, Uttar Pradesh 281001', 
            description: 'Modern school providing value-based education and co-curricular activities.' 
        },
        { 
            name: 'Kendriya Vidyalaya, Mathura', 
            rating: 4.5, 
            address: 'Railway Road, Mathura, Uttar Pradesh 281001', 
            description: 'Central government school offering CBSE education with disciplined approach.' 
        }
    ],
    restaurants: [
        { 
            name: 'The Yellow Chilli', 
            rating: 4.7, 
            address: 'Gokul Road, Mathura, Uttar Pradesh 281001', 
            description: 'Fine-dining restaurant offering modern Indian cuisine curated by Chef Sanjeev Kapoor.' 
        },
        { 
            name: 'Pind Balluchi', 
            rating: 4.6, 
            address: 'Cantonment Area, Mathura, Uttar Pradesh 281001', 
            description: 'Punjabi-themed restaurant serving North Indian dishes and buffet options.' 
        },
        { 
            name: 'Barbeque Nation', 
            rating: 4.5, 
            address: 'Railway Road, Mathura, Uttar Pradesh 281001', 
            description: 'Popular buffet restaurant offering live grills and wide cuisine variety.' 
        },
        { 
            name: 'Bikanervala', 
            rating: 4.6, 
            address: 'Gokul Road, Mathura, Uttar Pradesh 281001', 
            description: 'Vegetarian restaurant known for Indian sweets, snacks, and traditional meals.' 
        }
    ],
    hospitals: [
        { 
            name: 'District Hospital Mathura', 
            rating: 4.7, 
            address: 'Gokul Road, Mathura, Uttar Pradesh 281001', 
            description: 'Government hospital providing general and emergency healthcare services.' 
        },
        { 
            name: 'Shri Krishna Hospital', 
            rating: 4.6, 
            address: 'Railway Road, Mathura, Uttar Pradesh 281001', 
            description: 'Private multi-specialty hospital offering advanced medical care.' 
        },
        { 
            name: 'Mathura Medical Centre', 
            rating: 4.5, 
            address: 'Cantonment Area, Mathura, Uttar Pradesh 281001', 
            description: 'Trusted healthcare facility providing quality treatment across specialties.' 
        },
        { 
            name: 'Vardhman Hospital', 
            rating: 4.6, 
            address: 'Gokul Road, Mathura, Uttar Pradesh 281001', 
            description: 'Modern hospital offering diagnostics, emergency care, and multi-specialty services.' 
        }
    ],
        touristspots: [
        { name: 'Krishna Janmabhoomi', rating: 5.0, address: 'Mathura, Uttar Pradesh 281001', description: 'Birthplace of Lord Krishna, major pilgrimage site with temples and shrines.' },
        { name: 'Vishram Ghat', rating: 4.8, address: 'Mathura, Uttar Pradesh 281001', description: 'Famous ghat on the Yamuna River where Lord Krishna is said to have rested.' },
        { name: 'Govardhan Hill', rating: 4.7, address: 'Mathura District, Uttar Pradesh 281201', description: 'Sacred hill associated with Lord Krishna’s legends, popular for parikrama (circumambulation).' },
        { name: 'Dwarkadheesh Temple', rating: 4.6, address: 'Mathura, Uttar Pradesh 281001', description: 'Ancient temple dedicated to Lord Krishna, known for its architecture and religious significance.' }
    ]
},
'saharanpur': { 
    schools: [
        { 
            name: 'Delhi Public School (DPS) Saharanpur', 
            rating: 4.7, 
            address: 'Railway Road, Saharanpur, Uttar Pradesh 247001', 
            description: 'Top CBSE school providing strong academics and extracurricular programs.' 
        },
        { 
            name: 'St. Mary’s Convent School', 
            rating: 4.6, 
            address: 'Civil Lines, Saharanpur, Uttar Pradesh 247001', 
            description: 'ICSE school known for disciplined learning and quality education.' 
        },
        { 
            name: 'Ryan International School', 
            rating: 4.5, 
            address: 'Saharanpur City, Uttar Pradesh 247001', 
            description: 'Modern school offering value-based education and co-curricular activities.' 
        },
        { 
            name: 'Kendriya Vidyalaya, Saharanpur', 
            rating: 4.6, 
            address: 'Railway Road, Saharanpur, Uttar Pradesh 247001', 
            description: 'Central government school with CBSE curriculum and disciplined teaching.' 
        }
    ],
    restaurants: [
        { 
            name: 'The Yellow Chilli', 
            rating: 4.7, 
            address: 'Civil Lines, Saharanpur, Uttar Pradesh 247001', 
            description: 'Fine-dining restaurant offering modern Indian cuisine by Chef Sanjeev Kapoor.' 
        },
        { 
            name: 'Pind Balluchi', 
            rating: 4.6, 
            address: 'Railway Road, Saharanpur, Uttar Pradesh 247001', 
            description: 'Punjabi-themed restaurant serving North Indian dishes and buffet options.' 
        },
        { 
            name: 'Barbeque Nation', 
            rating: 4.5, 
            address: 'Civil Lines, Saharanpur, Uttar Pradesh 247001', 
            description: 'Popular buffet restaurant offering live grills and wide variety of dishes.' 
        },
        { 
            name: 'Bikanervala', 
            rating: 4.6, 
            address: 'Railway Road, Saharanpur, Uttar Pradesh 247001', 
            description: 'Vegetarian restaurant known for Indian sweets, snacks, and traditional meals.' 
        }
    ],
    hospitals: [
        { 
            name: 'District Hospital Saharanpur', 
            rating: 4.7, 
            address: 'Railway Road, Saharanpur, Uttar Pradesh 247001', 
            description: 'Government hospital offering general and emergency healthcare services.' 
        },
        { 
            name: 'Max Super Speciality Hospital', 
            rating: 4.6, 
            address: 'Civil Lines, Saharanpur, Uttar Pradesh 247001', 
            description: 'Multi-specialty hospital providing advanced treatments and diagnostics.' 
        },
        { 
            name: 'Shanti Hospital', 
            rating: 4.5, 
            address: 'Railway Road, Saharanpur, Uttar Pradesh 247001', 
            description: 'Private hospital offering quality medical care across specialties.' 
        },
        { 
            name: 'Vardhman Hospital', 
            rating: 4.6, 
            address: 'Civil Lines, Saharanpur, Uttar Pradesh 247001', 
            description: 'Modern healthcare facility providing diagnostics, emergency care, and specialized treatments.' 
        }
    ],
        touristspots: [
        { name: 'Saharanpur Botanical Garden', rating: 4.7, address: 'Saharanpur, Uttar Pradesh 247001', description: 'Lush garden featuring diverse plant species, walking paths, and peaceful surroundings.' },
        { name: 'Shakumbhari Devi Temple', rating: 4.8, address: 'Saharanpur, Uttar Pradesh 247001', description: 'Famous temple dedicated to Goddess Shakumbhari, attracting thousands of devotees.' },
        { name: 'Saharanpur Fort', rating: 4.5, address: 'Saharanpur, Uttar Pradesh 247001', description: 'Historic fort with remnants of old architecture and historical significance.' },
        { name: 'Deoband Madrasa (Darul Uloom)', rating: 4.6, address: 'Deoband, Saharanpur, Uttar Pradesh 247554', description: 'Renowned Islamic educational institution with historical and cultural importance.' }
    ]
},
'firozabad': { 
    schools: [
        { 
            name: 'Delhi Public School (DPS) Firozabad', 
            rating: 4.7, 
            address: 'Railway Road, Firozabad, Uttar Pradesh 283203', 
            description: 'Top CBSE school providing strong academics, extracurriculars, and modern facilities.' 
        },
        { 
            name: 'St. Mary’s Convent School', 
            rating: 4.6, 
            address: 'Civil Lines, Firozabad, Uttar Pradesh 283203', 
            description: 'ICSE-affiliated school known for discipline and high-quality education.' 
        },
        { 
            name: 'Ryan International School', 
            rating: 4.5, 
            address: 'Firozabad City, Uttar Pradesh 283203', 
            description: 'Modern school offering value-based education and co-curricular activities.' 
        },
        { 
            name: 'Kendriya Vidyalaya, Firozabad', 
            rating: 4.6, 
            address: 'Railway Road, Firozabad, Uttar Pradesh 283203', 
            description: 'Central government school providing CBSE curriculum with disciplined learning.' 
        }
    ],
    restaurants: [
        { 
            name: 'The Yellow Chilli', 
            rating: 4.7, 
            address: 'Civil Lines, Firozabad, Uttar Pradesh 283203', 
            description: 'Fine-dining restaurant offering modern Indian cuisine by Chef Sanjeev Kapoor.' 
        },
        { 
            name: 'Pind Balluchi', 
            rating: 4.6, 
            address: 'Railway Road, Firozabad, Uttar Pradesh 283203', 
            description: 'Punjabi-themed restaurant serving North Indian dishes and buffet options.' 
        },
        { 
            name: 'Barbeque Nation', 
            rating: 4.5, 
            address: 'Civil Lines, Firozabad, Uttar Pradesh 283203', 
            description: 'Popular buffet restaurant offering live grills and a variety of cuisines.' 
        },
        { 
            name: 'Bikanervala', 
            rating: 4.6, 
            address: 'Railway Road, Firozabad, Uttar Pradesh 283203', 
            description: 'Vegetarian restaurant serving Indian sweets, snacks, and traditional meals.' 
        }
    ],
    hospitals: [
        { 
            name: 'District Hospital Firozabad', 
            rating: 4.7, 
            address: 'Railway Road, Firozabad, Uttar Pradesh 283203', 
            description: 'Government hospital offering general and emergency healthcare services.' 
        },
        { 
            name: 'Max Super Speciality Hospital', 
            rating: 4.6, 
            address: 'Civil Lines, Firozabad, Uttar Pradesh 283203', 
            description: 'Multi-specialty hospital providing advanced treatments and diagnostics.' 
        },
        { 
            name: 'Shanti Hospital', 
            rating: 4.5, 
            address: 'Railway Road, Firozabad, Uttar Pradesh 283203', 
            description: 'Private hospital providing quality medical care across specialties.' 
        },
        { 
            name: 'Vardhman Hospital', 
            rating: 4.6, 
            address: 'Civil Lines, Firozabad, Uttar Pradesh 283203', 
            description: 'Modern healthcare facility offering diagnostics, emergency care, and specialized treatments.' 
        }
    ],
        touristspots: [
        { name: 'Singh Dwar', rating: 4.5, address: 'Firozabad, Uttar Pradesh 283203', description: 'Historic gate and landmark in the city, showcasing Mughal-era architecture.' },
        { name: 'Shri Ram Mandir', rating: 4.6, address: 'Firozabad, Uttar Pradesh 283203', description: 'Famous temple dedicated to Lord Rama, visited by locals and tourists.' },
        { name: 'Glass City Market', rating: 4.4, address: 'Firozabad, Uttar Pradesh 283203', description: 'Famous market known for glassware and bangles, reflecting the city’s craft heritage.' },
        { name: 'Bhartendu Natya Academy', rating: 4.3, address: 'Firozabad, Uttar Pradesh 283203', description: 'Cultural center promoting performing arts and local traditions.' }
    ]
},
'etawah': { 
    schools: [
        { 
            name: 'Delhi Public School (DPS) Etawah', 
            rating: 4.7, 
            address: 'Railway Road, Etawah, Uttar Pradesh 206001', 
            description: 'Top CBSE school offering strong academics, extracurricular activities, and modern infrastructure.' 
        },
        { 
            name: 'St. Joseph’s Convent School', 
            rating: 4.6, 
            address: 'Civil Lines, Etawah, Uttar Pradesh 206001', 
            description: 'ICSE-affiliated school known for quality education and disciplined environment.' 
        },
        { 
            name: 'Ryan International School', 
            rating: 4.5, 
            address: 'Etawah City, Uttar Pradesh 206001', 
            description: 'Modern school providing value-based education and co-curricular opportunities.' 
        },
        { 
            name: 'Kendriya Vidyalaya, Etawah', 
            rating: 4.6, 
            address: 'Railway Road, Etawah, Uttar Pradesh 206001', 
            description: 'Central government school offering CBSE curriculum and disciplined teaching.' 
        }
    ],
    restaurants: [
        { 
            name: 'The Yellow Chilli', 
            rating: 4.7, 
            address: 'Civil Lines, Etawah, Uttar Pradesh 206001', 
            description: 'Fine-dining restaurant offering modern Indian cuisine curated by Chef Sanjeev Kapoor.' 
        },
        { 
            name: 'Pind Balluchi', 
            rating: 4.6, 
            address: 'Railway Road, Etawah, Uttar Pradesh 206001', 
            description: 'Punjabi-themed restaurant serving North Indian dishes and buffet options.' 
        },
        { 
            name: 'Barbeque Nation', 
            rating: 4.5, 
            address: 'Civil Lines, Etawah, Uttar Pradesh 206001', 
            description: 'Popular buffet restaurant offering live grills and wide variety of dishes.' 
        },
        { 
            name: 'Bikanervala', 
            rating: 4.6, 
            address: 'Railway Road, Etawah, Uttar Pradesh 206001', 
            description: 'Vegetarian restaurant serving Indian sweets, snacks, and traditional meals.' 
        }
    ],
    hospitals: [
        { 
            name: 'District Hospital Etawah', 
            rating: 4.7, 
            address: 'Railway Road, Etawah, Uttar Pradesh 206001', 
            description: 'Government hospital providing general and emergency healthcare services.' 
        },
        { 
            name: 'Max Super Speciality Hospital', 
            rating: 4.6, 
            address: 'Civil Lines, Etawah, Uttar Pradesh 206001', 
            description: 'Multi-specialty hospital offering advanced treatments and diagnostics.' 
        },
        { 
            name: 'Shanti Hospital', 
            rating: 4.5, 
            address: 'Railway Road, Etawah, Uttar Pradesh 206001', 
            description: 'Private hospital providing quality care across medical specialties.' 
        },
        { 
            name: 'Vardhman Hospital', 
            rating: 4.6, 
            address: 'Civil Lines, Etawah, Uttar Pradesh 206001', 
            description: 'Modern healthcare facility offering diagnostics, emergency care, and specialized treatments.' 
        }
    ],
        touristspots: [
        { name: 'Etawah Safari Park (Kanha Zoo)', rating: 4.7, address: 'Etawah, Uttar Pradesh 206001', description: 'Large wildlife park and safari with tigers, lions, and other animals.' },
        { name: 'Gautam Buddha Wildlife Sanctuary', rating: 4.6, address: 'Etawah, Uttar Pradesh 206001', description: 'Protected forest area with rich biodiversity and nature trails.' },
        { name: 'Shergarh Fort', rating: 4.5, address: 'Etawah, Uttar Pradesh 206001', description: 'Historic fort with Mughal-era architecture and scenic views.' },
        { name: 'Phaphund Ghats', rating: 4.4, address: 'Etawah, Uttar Pradesh 206001', description: 'Riverfront ghats used for religious ceremonies and local recreation.' }
    ]
},
'shahjahanpur': { 
    schools: [
        { 
            name: 'Delhi Public School (DPS) Shahjahanpur', 
            rating: 4.7, 
            address: 'Civil Lines, Shahjahanpur, Uttar Pradesh 242001', 
            description: 'Top CBSE school offering strong academics, extracurriculars, and modern facilities.' 
        },
        { 
            name: 'St. Mary’s Convent School', 
            rating: 4.6, 
            address: 'Railway Road, Shahjahanpur, Uttar Pradesh 242001', 
            description: 'ICSE-affiliated school known for discipline and quality education.' 
        },
        { 
            name: 'Ryan International School', 
            rating: 4.5, 
            address: 'Shahjahanpur City, Uttar Pradesh 242001', 
            description: 'Modern school providing value-based education and co-curricular opportunities.' 
        },
        { 
            name: 'Kendriya Vidyalaya, Shahjahanpur', 
            rating: 4.6, 
            address: 'Civil Lines, Shahjahanpur, Uttar Pradesh 242001', 
            description: 'Central government school offering CBSE curriculum with disciplined teaching.' 
        }
    ],
    restaurants: [
        { 
            name: 'The Yellow Chilli', 
            rating: 4.7, 
            address: 'Civil Lines, Shahjahanpur, Uttar Pradesh 242001', 
            description: 'Fine-dining restaurant offering modern Indian cuisine curated by Chef Sanjeev Kapoor.' 
        },
        { 
            name: 'Pind Balluchi', 
            rating: 4.6, 
            address: 'Railway Road, Shahjahanpur, Uttar Pradesh 242001', 
            description: 'Punjabi-themed restaurant serving North Indian dishes and buffet options.' 
        },
        { 
            name: 'Barbeque Nation', 
            rating: 4.5, 
            address: 'Civil Lines, Shahjahanpur, Uttar Pradesh 242001', 
            description: 'Popular buffet restaurant offering live grills and variety of cuisines.' 
        },
        { 
            name: 'Bikanervala', 
            rating: 4.6, 
            address: 'Railway Road, Shahjahanpur, Uttar Pradesh 242001', 
            description: 'Vegetarian restaurant serving Indian sweets, snacks, and traditional meals.' 
        }
    ],
    hospitals: [
        { 
            name: 'District Hospital Shahjahanpur', 
            rating: 4.7, 
            address: 'Civil Lines, Shahjahanpur, Uttar Pradesh 242001', 
            description: 'Government hospital providing general and emergency healthcare services.' 
        },
        { 
            name: 'Max Super Speciality Hospital', 
            rating: 4.6, 
            address: 'Railway Road, Shahjahanpur, Uttar Pradesh 242001', 
            description: 'Multi-specialty hospital providing advanced treatments and diagnostics.' 
        },
        { 
            name: 'Shanti Hospital', 
            rating: 4.5, 
            address: 'Civil Lines, Shahjahanpur, Uttar Pradesh 242001', 
            description: 'Private hospital offering quality medical care across specialties.' 
        },
        { 
            name: 'Vardhman Hospital', 
            rating: 4.6, 
            address: 'Railway Road, Shahjahanpur, Uttar Pradesh 242001', 
            description: 'Modern healthcare facility providing diagnostics, emergency care, and specialized treatments.' 
        }
    ],
        touristspots: [
        { name: 'Shahjahanpur Fort', rating: 4.6, address: 'Shahjahanpur, Uttar Pradesh 242001', description: 'Historic fort built during the Mughal era, showcasing old architecture.' },
        { name: 'Shahi Jama Masjid', rating: 4.5, address: 'Shahjahanpur, Uttar Pradesh 242001', description: 'Historic mosque known for its architecture and cultural significance.' },
        { name: 'Kali Mandir', rating: 4.4, address: 'Shahjahanpur, Uttar Pradesh 242001', description: 'Popular temple dedicated to Goddess Kali, visited by locals and tourists.' },
        { name: 'Kothi Bagh', rating: 4.3, address: 'Shahjahanpur, Uttar Pradesh 242001', description: 'Local park offering greenery, walking paths, and recreational space.' }
    ]
},
'farrukhabad': { 
    schools: [
        { 
            name: 'Delhi Public School (DPS) Farrukhabad', 
            rating: 4.7, 
            address: 'Civil Lines, Farrukhabad, Uttar Pradesh 209625', 
            description: 'Top CBSE school offering academics, sports, and extracurricular programs.' 
        },
        { 
            name: 'St. Mary’s Convent School', 
            rating: 4.6, 
            address: 'Railway Road, Farrukhabad, Uttar Pradesh 209625', 
            description: 'ICSE-affiliated school known for discipline and quality education.' 
        },
        { 
            name: 'Ryan International School', 
            rating: 4.5, 
            address: 'Farrukhabad City, Uttar Pradesh 209625', 
            description: 'Modern school providing value-based education and co-curricular activities.' 
        },
        { 
            name: 'Kendriya Vidyalaya, Farrukhabad', 
            rating: 4.6, 
            address: 'Civil Lines, Farrukhabad, Uttar Pradesh 209625', 
            description: 'Central government school offering CBSE curriculum with disciplined teaching.' 
        }
    ],
    restaurants: [
        { 
            name: 'The Yellow Chilli', 
            rating: 4.7, 
            address: 'Civil Lines, Farrukhabad, Uttar Pradesh 209625', 
            description: 'Fine-dining restaurant offering modern Indian cuisine curated by Chef Sanjeev Kapoor.' 
        },
        { 
            name: 'Pind Balluchi', 
            rating: 4.6, 
            address: 'Railway Road, Farrukhabad, Uttar Pradesh 209625', 
            description: 'Punjabi-themed restaurant serving North Indian dishes and buffet options.' 
        },
        { 
            name: 'Barbeque Nation', 
            rating: 4.5, 
            address: 'Civil Lines, Farrukhabad, Uttar Pradesh 209625', 
            description: 'Popular buffet restaurant offering live grills and wide variety of dishes.' 
        },
        { 
            name: 'Bikanervala', 
            rating: 4.6, 
            address: 'Railway Road, Farrukhabad, Uttar Pradesh 209625', 
            description: 'Vegetarian restaurant serving Indian sweets, snacks, and traditional meals.' 
        }
    ],
    hospitals: [
        { 
            name: 'District Hospital Farrukhabad', 
            rating: 4.7, 
            address: 'Civil Lines, Farrukhabad, Uttar Pradesh 209625', 
            description: 'Government hospital providing general and emergency healthcare services.' 
        },
        { 
            name: 'Max Super Speciality Hospital', 
            rating: 4.6, 
            address: 'Railway Road, Farrukhabad, Uttar Pradesh 209625', 
            description: 'Multi-specialty hospital providing advanced treatments and diagnostics.' 
        },
        { 
            name: 'Shanti Hospital', 
            rating: 4.5, 
            address: 'Civil Lines, Farrukhabad, Uttar Pradesh 209625', 
            description: 'Private hospital offering quality medical care across specialties.' 
        },
        { 
            name: 'Vardhman Hospital', 
            rating: 4.6, 
            address: 'Railway Road, Farrukhabad, Uttar Pradesh 209625', 
            description: 'Modern healthcare facility offering diagnostics, emergency care, and specialized treatments.' 
        }
    ],
         touristspots: [
        { name: 'Farrukhabad Fort', rating: 4.6, address: 'Farrukhabad, Uttar Pradesh 209625', description: 'Historic fort built during the Mughal period, showcasing old architecture.' },
        { name: 'Shahid Smarak', rating: 4.5, address: 'Farrukhabad, Uttar Pradesh 209625', description: 'Memorial dedicated to local freedom fighters, with historical significance.' },
        { name: 'Shahi Jama Masjid', rating: 4.4, address: 'Farrukhabad, Uttar Pradesh 209625', description: 'Ancient mosque known for its architectural beauty and religious importance.' },
        { name: 'Ramleela Maidan', rating: 4.3, address: 'Farrukhabad, Uttar Pradesh 209625', description: 'Local ground used for cultural events, fairs, and festivals.' }
    ]
},
'ballia': { 
        schools: [
        { 
            name: 'Delhi Public School (DPS) Ballia', 
            rating: 4.7, 
            address: 'Civil Lines, Ballia, Uttar Pradesh 277001', 
            description: 'Top CBSE school offering academics, sports, and extracurricular programs.' 
        },
        { 
            name: 'St. Joseph’s Convent School', 
            rating: 4.6, 
            address: 'Railway Road, Ballia, Uttar Pradesh 277001', 
            description: 'ICSE-affiliated school known for quality education and disciplined environment.' 
        },
        { 
            name: 'Ryan International School', 
            rating: 4.5, 
            address: 'Ballia City, Uttar Pradesh 277001', 
            description: 'Modern school providing value-based education and co-curricular activities.' 
        },
        { 
            name: 'Kendriya Vidyalaya, Ballia', 
            rating: 4.6, 
            address: 'Civil Lines, Ballia, Uttar Pradesh 277001', 
            description: 'Central government school offering CBSE curriculum with disciplined teaching.' 
        }
    ],
    restaurants: [
        { 
            name: 'The Yellow Chilli', 
            rating: 4.7, 
            address: 'Civil Lines, Ballia, Uttar Pradesh 277001', 
            description: 'Fine-dining restaurant offering modern Indian cuisine curated by Chef Sanjeev Kapoor.' 
        },
        { 
            name: 'Pind Balluchi', 
            rating: 4.6, 
            address: 'Railway Road, Ballia, Uttar Pradesh 277001', 
            description: 'Punjabi-themed restaurant serving North Indian dishes and buffet options.' 
        },
        { 
            name: 'Barbeque Nation', 
            rating: 4.5, 
            address: 'Civil Lines, Ballia, Uttar Pradesh 277001', 
            description: 'Popular buffet restaurant offering live grills and variety of cuisines.' 
        },
        { 
            name: 'Bikanervala', 
            rating: 4.6, 
            address: 'Railway Road, Ballia, Uttar Pradesh 277001', 
            description: 'Vegetarian restaurant serving Indian sweets, snacks, and traditional meals.' 
        }
    ],
    hospitals: [
        { 
            name: 'District Hospital Ballia', 
            rating: 4.7, 
            address: 'Civil Lines, Ballia, Uttar Pradesh 277001', 
            description: 'Government hospital providing general and emergency healthcare services.' 
        },
        { 
            name: 'Max Super Speciality Hospital', 
            rating: 4.6, 
            address: 'Railway Road, Ballia, Uttar Pradesh 277001', 
            description: 'Multi-specialty hospital offering advanced treatments and diagnostics.' 
        },
        { 
            name: 'Shanti Hospital', 
            rating: 4.5, 
            address: 'Civil Lines, Ballia, Uttar Pradesh 277001', 
            description: 'Private hospital providing quality care across medical specialties.' 
        },
        { 
            name: 'Vardhman Hospital', 
            rating: 4.6, 
            address: 'Railway Road, Ballia, Uttar Pradesh 277001', 
            description: 'Modern healthcare facility providing diagnostics, emergency care, and specialized treatments.' 
        }
    ],
        touristspots: [
        { name: 'Ghaghara River Ghats', rating: 4.7, address: 'Ballia, Uttar Pradesh 277001', description: 'Scenic riverfront ghats used for religious rituals and local recreation.' },
        { name: 'Shiv Mandir', rating: 4.6, address: 'Ballia, Uttar Pradesh 277001', description: 'Popular temple dedicated to Lord Shiva, visited by locals and tourists.' },
        { name: 'Ballia Museum', rating: 4.5, address: 'Ballia, Uttar Pradesh 277001', description: 'Museum showcasing local history, artifacts, and cultural heritage.' },
        { name: 'Rameshwar Nath Mandir', rating: 4.4, address: 'Ballia, Uttar Pradesh 277001', description: 'Historic temple dedicated to Lord Shiva with traditional architecture.' }
    ]
},
'rampur': { 
    schools: [
        { 
            name: 'Delhi Public School (DPS) Rampur', 
            rating: 4.7, 
            address: 'Civil Lines, Rampur, Uttar Pradesh 244901', 
            description: 'Top CBSE school offering academics, sports, and extracurricular programs.' 
        },
        { 
            name: 'St. Mary’s Convent School', 
            rating: 4.6, 
            address: 'Railway Road, Rampur, Uttar Pradesh 244901', 
            description: 'ICSE-affiliated school known for quality education and disciplined environment.' 
        },
        { 
            name: 'Ryan International School', 
            rating: 4.5, 
            address: 'Rampur City, Uttar Pradesh 244901', 
            description: 'Modern school providing value-based education and co-curricular activities.' 
        },
        { 
            name: 'Kendriya Vidyalaya, Rampur', 
            rating: 4.6, 
            address: 'Civil Lines, Rampur, Uttar Pradesh 244901', 
            description: 'Central government school offering CBSE curriculum with disciplined teaching.' 
        }
    ],
    restaurants: [
        { 
            name: 'The Yellow Chilli', 
            rating: 4.7, 
            address: 'Civil Lines, Rampur, Uttar Pradesh 244901', 
            description: 'Fine-dining restaurant offering modern Indian cuisine curated by Chef Sanjeev Kapoor.' 
        },
        { 
            name: 'Pind Balluchi', 
            rating: 4.6, 
            address: 'Railway Road, Rampur, Uttar Pradesh 244901', 
            description: 'Punjabi-themed restaurant serving North Indian dishes and buffet options.' 
        },
        { 
            name: 'Barbeque Nation', 
            rating: 4.5, 
            address: 'Civil Lines, Rampur, Uttar Pradesh 244901', 
            description: 'Popular buffet restaurant offering live grills and variety of cuisines.' 
        },
        { 
            name: 'Bikanervala', 
            rating: 4.6, 
            address: 'Railway Road, Rampur, Uttar Pradesh 244901', 
            description: 'Vegetarian restaurant serving Indian sweets, snacks, and traditional meals.' 
        }
    ],
    hospitals: [
        { 
            name: 'District Hospital Rampur', 
            rating: 4.7, 
            address: 'Civil Lines, Rampur, Uttar Pradesh 244901', 
            description: 'Government hospital providing general and emergency healthcare services.' 
        },
        { 
            name: 'Max Super Speciality Hospital', 
            rating: 4.6, 
            address: 'Railway Road, Rampur, Uttar Pradesh 244901', 
            description: 'Multi-specialty hospital offering advanced treatments and diagnostics.' 
        },
        { 
            name: 'Shanti Hospital', 
            rating: 4.5, 
            address: 'Civil Lines, Rampur, Uttar Pradesh 244901', 
            description: 'Private hospital providing quality care across medical specialties.' 
        },
        { 
            name: 'Vardhman Hospital', 
            rating: 4.6, 
            address: 'Railway Road, Rampur, Uttar Pradesh 244901', 
            description: 'Modern healthcare facility providing diagnostics, emergency care, and specialized treatments.' 
        }
    ],
        touristspots: [
        { name: 'Rampur Raza Library', rating: 4.8, address: 'Rampur, Uttar Pradesh 244901', description: 'Historic library with rare manuscripts, books, and Islamic heritage collections.' },
        { name: 'Rampur Fort', rating: 4.6, address: 'Rampur, Uttar Pradesh 244901', description: 'Historic fort showcasing Mughal-era architecture and royal heritage.' },
        { name: 'Shahi Jama Masjid', rating: 4.5, address: 'Rampur, Uttar Pradesh 244901', description: 'Famous mosque built during the Nawabi period with intricate architecture.' },
        { name: 'Raza Bagh Park', rating: 4.4, address: 'Rampur, Uttar Pradesh 244901', description: 'Public park offering greenery, walking trails, and recreational space.' }
    ]
},
'budaun': { 
    schools: [
        { 
            name: 'Delhi Public School (DPS) Budaun', 
            rating: 4.7, 
            address: 'Civil Lines, Budaun, Uttar Pradesh 243601', 
            description: 'Top CBSE school offering academics, sports, and extracurricular programs.' 
        },
        { 
            name: 'St. Mary’s Convent School', 
            rating: 4.6, 
            address: 'Railway Road, Budaun, Uttar Pradesh 243601', 
            description: 'ICSE-affiliated school known for quality education and disciplined environment.' 
        },
        { 
            name: 'Ryan International School', 
            rating: 4.5, 
            address: 'Budaun City, Uttar Pradesh 243601', 
            description: 'Modern school providing value-based education and co-curricular activities.' 
        },
        { 
            name: 'Kendriya Vidyalaya, Budaun', 
            rating: 4.6, 
            address: 'Civil Lines, Budaun, Uttar Pradesh 243601', 
            description: 'Central government school offering CBSE curriculum with disciplined teaching.' 
        }
    ],
    restaurants: [
        { 
            name: 'The Yellow Chilli', 
            rating: 4.7, 
            address: 'Civil Lines, Budaun, Uttar Pradesh 243601', 
            description: 'Fine-dining restaurant offering modern Indian cuisine curated by Chef Sanjeev Kapoor.' 
        },
        { 
            name: 'Pind Balluchi', 
            rating: 4.6, 
            address: 'Railway Road, Budaun, Uttar Pradesh 243601', 
            description: 'Punjabi-themed restaurant serving North Indian dishes and buffet options.' 
        },
        { 
            name: 'Barbeque Nation', 
            rating: 4.5, 
            address: 'Civil Lines, Budaun, Uttar Pradesh 243601', 
            description: 'Popular buffet restaurant offering live grills and variety of cuisines.' 
        },
        { 
            name: 'Bikanervala', 
            rating: 4.6, 
            address: 'Railway Road, Budaun, Uttar Pradesh 243601', 
            description: 'Vegetarian restaurant serving Indian sweets, snacks, and traditional meals.' 
        }
    ],
    hospitals: [
        { 
            name: 'District Hospital Budaun', 
            rating: 4.7, 
            address: 'Civil Lines, Budaun, Uttar Pradesh 243601', 
            description: 'Government hospital providing general and emergency healthcare services.' 
        },
        { 
            name: 'Max Super Speciality Hospital', 
            rating: 4.6, 
            address: 'Railway Road, Budaun, Uttar Pradesh 243601', 
            description: 'Multi-specialty hospital offering advanced treatments and diagnostics.' 
        },
        { 
            name: 'Shanti Hospital', 
            rating: 4.5, 
            address: 'Civil Lines, Budaun, Uttar Pradesh 243601', 
            description: 'Private hospital providing quality care across medical specialties.' 
        },
        { 
            name: 'Vardhman Hospital', 
            rating: 4.6, 
            address: 'Railway Road, Budaun, Uttar Pradesh 243601', 
            description: 'Modern healthcare facility providing diagnostics, emergency care, and specialized treatments.' 
        }
    ],
        touristspots: [
        { name: 'Shah Jahani Masjid', rating: 4.6, address: 'Budaun, Uttar Pradesh 243601', description: 'Historic mosque built during the Mughal era, known for its architecture.' },
        { name: 'Budaun Fort', rating: 4.5, address: 'Budaun, Uttar Pradesh 243601', description: 'Ancient fort with remnants of Mughal-era structures and local history.' },
        { name: 'Aliganj Park', rating: 4.4, address: 'Budaun, Uttar Pradesh 243601', description: 'Public park with walking paths, gardens, and recreational spaces.' },
        { name: 'Shahi Jama Masjid', rating: 4.3, address: 'Budaun, Uttar Pradesh 243601', description: 'Historic mosque visited by locals and tourists for religious significance.' }
    ]
},
'hardoi': { 
    schools: [
        { 
            name: 'St. John’s School', 
            rating: 4.7, 
            address: 'Sandi Road, Hardoi, Uttar Pradesh 241001', 
            description: 'CBSE-affiliated school offering excellent academic and extracurricular programs.' 
        },
        { 
            name: 'Delhi Public School Hardoi', 
            rating: 4.6, 
            address: 'Lucknow Road, Hardoi, Uttar Pradesh 241001', 
            description: 'Renowned for quality education, modern facilities, and strong discipline.' 
        },
        { 
            name: 'Kendriya Vidyalaya, Hardoi', 
            rating: 4.5, 
            address: 'Civil Lines, Hardoi, Uttar Pradesh 241001', 
            description: 'Government-run CBSE school with emphasis on holistic education.' 
        },
        { 
            name: 'Sacred Heart School', 
            rating: 4.6, 
            address: 'Naya Bazar, Hardoi, Uttar Pradesh 241001', 
            description: 'Popular English medium school focusing on moral and academic excellence.' 
        }
    ],
    restaurants: [
        { 
            name: 'Royal Treat Restaurant', 
            rating: 4.7, 
            address: 'Civil Lines, Hardoi, Uttar Pradesh 241001', 
            description: 'Family restaurant serving Indian and Chinese cuisines in a comfortable setting.' 
        },
        { 
            name: 'Zaika Family Restaurant', 
            rating: 4.6, 
            address: 'Naya Bazar, Hardoi, Uttar Pradesh 241001', 
            description: 'Known for North Indian and Mughlai dishes with good ambience.' 
        },
        { 
            name: 'Spice Garden', 
            rating: 4.5, 
            address: 'Sandi Road, Hardoi, Uttar Pradesh 241001', 
            description: 'Casual dining restaurant serving vegetarian and non-vegetarian options.' 
        },
        { 
            name: 'Haveli Restaurant', 
            rating: 4.5, 
            address: 'Lucknow Road, Hardoi, Uttar Pradesh 241001', 
            description: 'Ethnic-style restaurant offering traditional Indian thalis and tandoori meals.' 
        }
    ],
    hospitals: [
        { 
            name: 'District Hospital Hardoi', 
            rating: 4.7, 
            address: 'Civil Lines, Hardoi, Uttar Pradesh 241001', 
            description: 'Government hospital offering general healthcare and emergency services.' 
        },
        { 
            name: 'Saraswati Hospital', 
            rating: 4.6, 
            address: 'Naya Bazar, Hardoi, Uttar Pradesh 241001', 
            description: 'Private hospital known for maternity, surgical, and diagnostic services.' 
        },
        { 
            name: 'Aarogya Multi-Speciality Hospital', 
            rating: 4.5, 
            address: 'Sandi Road, Hardoi, Uttar Pradesh 241001', 
            description: 'Equipped with modern medical facilities and experienced doctors.' 
        },
        { 
            name: 'City Hospital', 
            rating: 4.6, 
            address: 'Lucknow Road, Hardoi, Uttar Pradesh 241001', 
            description: 'Multi-specialty hospital offering general and emergency healthcare.' 
        }
    ],
        touristspots: [
        { name: 'Bageshwar Temple', rating: 4.7, address: 'Hardoi, Uttar Pradesh 241001', description: 'Historic temple dedicated to Lord Shiva, visited by pilgrims and tourists.' },
        { name: 'Chaturbhuj Nath Temple', rating: 4.6, address: 'Hardoi, Uttar Pradesh 241001', description: 'Ancient temple known for its architecture and religious significance.' },
        { name: 'Hardoi Park', rating: 4.5, address: 'Hardoi, Uttar Pradesh 241001', description: 'Public park with greenery, walking paths, and recreational areas.' },
        { name: 'Shani Dev Temple', rating: 4.4, address: 'Hardoi, Uttar Pradesh 241001', description: 'Popular temple dedicated to Lord Shani, attracting locals and tourists.' }
    ]
},
'ayodhya': { 
    schools: [
        { 
            name: 'Delhi Public School Ayodhya', 
            rating: 4.7, 
            address: 'Faizabad Road, Ayodhya, Uttar Pradesh 224001', 
            description: 'Reputed CBSE-affiliated school providing holistic education with modern facilities.' 
        },
        { 
            name: 'St. Mary’s Inter College', 
            rating: 4.6, 
            address: 'Civil Lines, Ayodhya, Uttar Pradesh 224001', 
            description: 'One of the oldest and most respected schools in the city, known for discipline and academics.' 
        },
        { 
            name: 'Kendriya Vidyalaya Ayodhya Cantt', 
            rating: 4.6, 
            address: 'Cantonment Area, Ayodhya, Uttar Pradesh 224001', 
            description: 'Government-run school providing CBSE education and co-curricular exposure.' 
        },
        { 
            name: 'Lucknow Public School Ayodhya', 
            rating: 4.5, 
            address: 'Faizabad Road, Ayodhya, Uttar Pradesh 224001', 
            description: 'Modern school focusing on academics, personality development, and values.' 
        }
    ],
    restaurants: [
        { 
            name: 'Brij Bhoomi Restaurant', 
            rating: 4.7, 
            address: 'Civil Lines, Ayodhya, Uttar Pradesh 224001', 
            description: 'Traditional vegetarian restaurant offering North Indian thalis and sweets.' 
        },
        { 
            name: 'The Food Court', 
            rating: 4.6, 
            address: 'Station Road, Ayodhya, Uttar Pradesh 224001', 
            description: 'Popular multi-cuisine restaurant serving Indian, Chinese, and Continental dishes.' 
        },
        { 
            name: 'Ram Rasoi', 
            rating: 4.6, 
            address: 'Near Ram Janmabhoomi Temple, Ayodhya, Uttar Pradesh 224001', 
            description: 'Pure vegetarian restaurant serving local Awadhi and temple-style food.' 
        },
        { 
            name: 'Royal Tadka', 
            rating: 4.5, 
            address: 'Faizabad Road, Ayodhya, Uttar Pradesh 224001', 
            description: 'Family restaurant offering Indian and Chinese cuisine with pleasant ambience.' 
        }
    ],
    hospitals: [
        { 
            name: 'District Hospital Ayodhya', 
            rating: 4.7, 
            address: 'Civil Lines, Ayodhya, Uttar Pradesh 224001', 
            description: 'Main government hospital providing emergency and general healthcare services.' 
        },
        { 
            name: 'Ayodhya Multi-Speciality Hospital', 
            rating: 4.6, 
            address: 'Faizabad Road, Ayodhya, Uttar Pradesh 224001', 
            description: 'Private healthcare facility offering specialized treatments and diagnostics.' 
        },
        { 
            name: 'Shree Ram Hospital', 
            rating: 4.5, 
            address: 'Station Road, Ayodhya, Uttar Pradesh 224001', 
            description: 'Well-equipped hospital providing maternity, pediatric, and surgical care.' 
        },
        { 
            name: 'Sanjeevani Hospital', 
            rating: 4.6, 
            address: 'Civil Lines, Ayodhya, Uttar Pradesh 224001', 
            description: 'Modern hospital with experienced doctors and advanced medical technology.' 
        }
    ],
        touristspots: [
        { name: 'Ram Janmabhoomi', rating: 5.0, address: 'Ayodhya, Uttar Pradesh 224123', description: 'Birthplace of Lord Rama, major pilgrimage and religious site.' },
        { name: 'Hanuman Garhi', rating: 4.8, address: 'Ayodhya, Uttar Pradesh 224123', description: 'Ancient temple dedicated to Lord Hanuman, famous for its spiritual significance.' },
        { name: 'Kanak Bhawan', rating: 4.6, address: 'Ayodhya, Uttar Pradesh 224123', description: 'Palace-style temple dedicated to Lord Rama and Sita, known for its beautiful architecture.' },
        { name: 'Saryu River Ghats', rating: 4.7, address: 'Ayodhya, Uttar Pradesh 224123', description: 'Riverfront ghats for pilgrims and tourists, famous for evening aarti ceremonies.' }
    ]
},

'varanasi': { 
    schools: [
        { 
            name: 'Banaras Hindu University (BHU)', 
            rating: 4.9, 
            address: 'Ajagara, Varanasi, Uttar Pradesh 221005', 
            description: 'One of India’s largest and most prestigious universities offering diverse academic programs.' 
        },
        { 
            name: 'Central Hindu Boys School', 
            rating: 4.7, 
            address: 'Kamachha, Varanasi, Uttar Pradesh 221010', 
            description: 'Historic school known for strong academics and discipline, affiliated with BHU.' 
        },
        { 
            name: 'St. John’s School', 
            rating: 4.7, 
            address: 'BLW, Lahartara, Varanasi, Uttar Pradesh 221004', 
            description: 'Popular English-medium school offering quality education and modern facilities.' 
        },
        { 
            name: 'Sunbeam School', 
            rating: 4.6, 
            address: 'Bhagwanpur, Varanasi, Uttar Pradesh 221005', 
            description: 'Reputed CBSE school focusing on holistic education and extracurricular excellence.' 
        }
    ],
    restaurants: [
        { 
            name: 'Kashi Chat Bhandar', 
            rating: 4.8, 
            address: 'Godowlia, Varanasi, Uttar Pradesh 221001', 
            description: 'Famous for authentic Banarasi street food like tamatar chaat and tikki.' 
        },
        { 
            name: 'Brown Bread Bakery', 
            rating: 4.7, 
            address: 'Pandey Ghat, Varanasi, Uttar Pradesh 221001', 
            description: 'Organic café offering bakery items and rooftop views of the Ganges.' 
        },
        { 
            name: 'Pizzeria Vatika Café', 
            rating: 4.6, 
            address: 'Assi Ghat, Varanasi, Uttar Pradesh 221005', 
            description: 'Popular riverside café known for wood-fired pizzas and apple pie.' 
        },
        { 
            name: 'Baati Chokha Restaurant', 
            rating: 4.5, 
            address: 'Lanka, Varanasi, Uttar Pradesh 221005', 
            description: 'Traditional dining experience featuring UP-Bihar style baati chokha.' 
        }
    ],
    hospitals: [
        { 
            name: 'Heritage Hospital', 
            rating: 4.7, 
            address: 'Lanka, Varanasi, Uttar Pradesh 221005', 
            description: 'Multi-specialty hospital offering advanced medical services and care.' 
        },
        { 
            name: 'Sparsh Super Speciality Hospital', 
            rating: 4.6, 
            address: 'DLW, Varanasi, Uttar Pradesh 221004', 
            description: 'Known for orthopedic and trauma care with modern equipment.' 
        },
        { 
            name: 'Galaxy Hospital', 
            rating: 4.5, 
            address: 'Bhelupur, Varanasi, Uttar Pradesh 221010', 
            description: 'Offers quality healthcare services across multiple specialties.' 
        },
        { 
            name: 'SS Hospital (IMS BHU)', 
            rating: 4.8, 
            address: 'Banaras Hindu University Campus, Varanasi, Uttar Pradesh 221005', 
            description: 'Renowned teaching hospital associated with the Institute of Medical Sciences, BHU.' 
        }
    ],
        touristspots: [
        { name: 'Kashi Vishwanath Temple', rating: 5.0, address: 'Vishwanath Gali, Varanasi, Uttar Pradesh 221001', description: 'One of the 12 Jyotirlingas, dedicated to Lord Shiva, located on the western bank of the Ganges.' },
        { name: 'Dashashwamedh Ghat', rating: 4.9, address: 'Godowlia, Varanasi, Uttar Pradesh 221001', description: 'Main ghat on the Ganges River, known for the grand Ganga Aarti.' },
        { name: 'Assi Ghat', rating: 4.8, address: 'Assi, Varanasi, Uttar Pradesh 221005', description: 'Popular ghat where pilgrims bathe before visiting Kashi Vishwanath Temple.' },
        { name: 'Sarnath', rating: 4.8, address: 'Sarnath, Varanasi, Uttar Pradesh 221007', description: 'Buddhist pilgrimage site where Lord Buddha gave his first sermon.' },
    ]
},
'amroha': { 
    schools: [
        { name: 'Delhi Public School Amroha', rating: 4.7, address: 'Civil Lines, Amroha, Uttar Pradesh 244221', description: 'Top CBSE school with strong academics and extracurricular activities.' },
        { name: 'St. Xavier’s School', rating: 4.6, address: 'Railway Road, Amroha, Uttar Pradesh 244221', description: 'Well-known ICSE school with a focus on holistic education.' },
        { name: 'Mount Carmel School', rating: 4.5, address: 'Civil Lines, Amroha, Uttar Pradesh 244221', description: 'CBSE school offering modern facilities and quality education.' },
        { name: 'Kendriya Vidyalaya Amroha', rating: 4.4, address: 'Civil Lines, Amroha, Uttar Pradesh 244221', description: 'Government school following CBSE curriculum with disciplined teaching.' }
    ],
    restaurants: [
        { name: 'Royal Restaurant', rating: 4.6, address: 'Civil Lines, Amroha, Uttar Pradesh 244221', description: 'Popular for North Indian cuisine and traditional dishes.' },
        { name: 'Shahi Zaika', rating: 4.5, address: 'Railway Road, Amroha, Uttar Pradesh 244221', description: 'Famous for Mughlai cuisine and local favorites.' },
        { name: 'Punjabi Tandoor', rating: 4.4, address: 'Civil Lines, Amroha, Uttar Pradesh 244221', description: 'North Indian and Punjabi dishes with tandoori specialties.' },
        { name: 'Chatori Rasoi', rating: 4.3, address: 'Civil Lines, Amroha, Uttar Pradesh 244221', description: 'Street-style snacks and local delicacies.' }
    ],
    hospitals: [
        { name: 'Amroha District Hospital', rating: 4.5, address: 'Civil Lines, Amroha, Uttar Pradesh 244221', description: 'Government hospital providing general and emergency care.' },
        { name: 'Shree Hospital', rating: 4.4, address: 'Railway Road, Amroha, Uttar Pradesh 244221', description: 'Multi-specialty hospital with modern facilities.' },
        { name: 'Sai Nursing Home', rating: 4.3, address: 'Civil Lines, Amroha, Uttar Pradesh 244221', description: 'Private healthcare center offering specialized treatments.' },
        { name: 'Kiran Hospital', rating: 4.2, address: 'Civil Lines, Amroha, Uttar Pradesh 244221', description: 'General hospital providing quality healthcare services.' }
    ],
        touristspots: [
        { name: 'Dargah Shah Wilayat', rating: 4.6, address: 'Amroha, Uttar Pradesh 244221', description: 'Historic Sufi shrine attracting devotees and tourists.' },
        { name: 'Amroha Fort', rating: 4.5, address: 'Amroha, Uttar Pradesh 244221', description: 'Ancient fort with remnants of old architecture and history.' },
        { name: 'Naugaza Tomb', rating: 4.4, address: 'Amroha, Uttar Pradesh 244221', description: 'Historic tomb known for Mughal-era architecture.' },
        { name: 'Jama Masjid Amroha', rating: 4.3, address: 'Amroha, Uttar Pradesh 244221', description: 'Ancient mosque with architectural and cultural significance.' }
    ]
},
'sitapur': { 
    schools: [
        { name: 'Delhi Public School Sitapur', rating: 4.7, address: 'Civil Lines, Sitapur, Uttar Pradesh 261001', description: 'Top CBSE school with modern facilities and quality education.' },
        { name: 'St. Joseph’s Convent School', rating: 4.6, address: 'Sitapur, Uttar Pradesh 261001', description: 'Well-known school offering ICSE curriculum and holistic education.' },
        { name: 'Kendriya Vidyalaya Sitapur', rating: 4.5, address: 'Civil Lines, Sitapur, Uttar Pradesh 261001', description: 'Government school following CBSE curriculum with disciplined teaching.' },
        { name: 'Mount Carmel School Sitapur', rating: 4.4, address: 'Civil Lines, Sitapur, Uttar Pradesh 261001', description: 'CBSE school focusing on academics and extracurriculars.' }
    ],
    restaurants: [
        { name: 'Shahi Zaika', rating: 4.6, address: 'Civil Lines, Sitapur, Uttar Pradesh 261001', description: 'North Indian and Mughlai cuisine with great ambiance.' },
        { name: 'Punjabi Tandoor', rating: 4.5, address: 'Sitapur, Uttar Pradesh 261001', description: 'Famous for tandoori dishes and authentic Punjabi food.' },
        { name: 'Royal Rasoi', rating: 4.4, address: 'Sitapur, Uttar Pradesh 261001', description: 'Local favorite for traditional Indian meals.' },
        { name: 'Chatori Rasoi', rating: 4.3, address: 'Civil Lines, Sitapur, Uttar Pradesh 261001', description: 'Street-style snacks and local delicacies.' }
    ],
    hospitals: [
        { name: 'Sitapur District Hospital', rating: 4.5, address: 'Civil Lines, Sitapur, Uttar Pradesh 261001', description: 'Government hospital providing general and emergency care.' },
        { name: 'Shree Hospital Sitapur', rating: 4.4, address: 'Sitapur, Uttar Pradesh 261001', description: 'Multi-specialty hospital with modern medical facilities.' },
        { name: 'Sai Nursing Home', rating: 4.3, address: 'Civil Lines, Sitapur, Uttar Pradesh 261001', description: 'Private healthcare center offering specialized treatments.' },
        { name: 'City Hospital', rating: 4.2, address: 'Sitapur, Uttar Pradesh 261001', description: 'General hospital providing quality healthcare services.' }
    ],
        touristspots: [
        { name: 'Sitapur Fort', rating: 4.6, address: 'Sitapur, Uttar Pradesh 261001', description: 'Historic fort with local Mughal architecture.' },
        { name: 'Ramleela Maidan', rating: 4.5, address: 'Sitapur, Uttar Pradesh 261001', description: 'Local ground used for festivals, cultural events, and fairs.' },
        { name: 'Sitapur Park', rating: 4.4, address: 'Sitapur, Uttar Pradesh 261001', description: 'Public park with greenery and walking paths.' },
        { name: 'Jama Masjid Sitapur', rating: 4.3, address: 'Sitapur, Uttar Pradesh 261001', description: 'Historic mosque visited by locals and tourists.' }
    ]
},
'hapur': { 
    schools: [
        { name: 'Delhi Public School Hapur', rating: 4.7, address: 'Civil Lines, Hapur, Uttar Pradesh 245101', description: 'Top CBSE school offering strong academics and extracurricular programs.' },
        { name: 'St. Xavier’s School Hapur', rating: 4.6, address: 'Hapur, Uttar Pradesh 245101', description: 'Well-known ICSE school providing holistic education.' },
        { name: 'Kendriya Vidyalaya Hapur', rating: 4.5, address: 'Civil Lines, Hapur, Uttar Pradesh 245101', description: 'Government school following CBSE curriculum with disciplined teaching.' },
        { name: 'Mount Carmel School Hapur', rating: 4.4, address: 'Hapur, Uttar Pradesh 245101', description: 'CBSE school focusing on academics and extracurriculars.' }
    ],
    restaurants: [
        { name: 'Shahi Zaika', rating: 4.6, address: 'Hapur, Uttar Pradesh 245101', description: 'North Indian and Mughlai cuisine with great ambiance.' },
        { name: 'Punjabi Tandoor', rating: 4.5, address: 'Hapur, Uttar Pradesh 245101', description: 'Famous for tandoori dishes and authentic Punjabi food.' },
        { name: 'Royal Rasoi', rating: 4.4, address: 'Civil Lines, Hapur, Uttar Pradesh 245101', description: 'Local favorite for traditional Indian meals.' },
        { name: 'Chatori Rasoi', rating: 4.3, address: 'Hapur, Uttar Pradesh 245101', description: 'Street-style snacks and local delicacies.' }
    ],
    hospitals: [
        { name: 'Hapur District Hospital', rating: 4.5, address: 'Civil Lines, Hapur, Uttar Pradesh 245101', description: 'Government hospital providing general and emergency care.' },
        { name: 'Shree Hospital Hapur', rating: 4.4, address: 'Hapur, Uttar Pradesh 245101', description: 'Multi-specialty hospital with modern medical facilities.' },
        { name: 'Sai Nursing Home', rating: 4.3, address: 'Civil Lines, Hapur, Uttar Pradesh 245101', description: 'Private healthcare center offering specialized treatments.' },
        { name: 'City Hospital', rating: 4.2, address: 'Hapur, Uttar Pradesh 245101', description: 'General hospital providing quality healthcare services.' }
    ],
        touristspots: [
        { name: 'Hapur Fort', rating: 4.5, address: 'Hapur, Uttar Pradesh 245101', description: 'Historic fort with remnants of old architecture.' },
        { name: 'Gurudwara Singh Sabha', rating: 4.6, address: 'Hapur, Uttar Pradesh 245101', description: 'Religious site visited by locals and tourists.' },
        { name: 'Ramleela Ground', rating: 4.4, address: 'Hapur, Uttar Pradesh 245101', description: 'Venue for local events, fairs, and festivals.' },
        { name: 'City Park Hapur', rating: 4.3, address: 'Hapur, Uttar Pradesh 245101', description: 'Public park with walking paths and green spaces.' }
    ]
},
'mau': { 
    schools: [
        { name: 'Delhi Public School Mau', rating: 4.7, address: 'Civil Lines, Mau, Uttar Pradesh 265001', description: 'Top CBSE school offering excellent academics and extracurricular activities.' },
        { name: 'St. Xavier’s School Mau', rating: 4.6, address: 'Mau, Uttar Pradesh 265001', description: 'Well-known ICSE school providing holistic education.' },
        { name: 'Kendriya Vidyalaya Mau', rating: 4.5, address: 'Civil Lines, Mau, Uttar Pradesh 265001', description: 'Government school following CBSE curriculum with disciplined teaching.' },
        { name: 'Mount Carmel School Mau', rating: 4.4, address: 'Mau, Uttar Pradesh 265001', description: 'CBSE school focusing on academics and extracurriculars.' }
    ],
    restaurants: [
        { name: 'Shahi Zaika', rating: 4.6, address: 'Mau, Uttar Pradesh 265001', description: 'North Indian and Mughlai cuisine with great ambiance.' },
        { name: 'Punjabi Tandoor', rating: 4.5, address: 'Mau, Uttar Pradesh 265001', description: 'Famous for tandoori dishes and authentic Punjabi food.' },
        { name: 'Royal Rasoi', rating: 4.4, address: 'Civil Lines, Mau, Uttar Pradesh 265001', description: 'Local favorite for traditional Indian meals.' },
        { name: 'Chatori Rasoi', rating: 4.3, address: 'Mau, Uttar Pradesh 265001', description: 'Street-style snacks and local delicacies.' }
    ],
    hospitals: [
        { name: 'Mau District Hospital', rating: 4.5, address: 'Civil Lines, Mau, Uttar Pradesh 265001', description: 'Government hospital providing general and emergency care.' },
        { name: 'Shree Hospital Mau', rating: 4.4, address: 'Mau, Uttar Pradesh 265001', description: 'Multi-specialty hospital with modern medical facilities.' },
        { name: 'Sai Nursing Home', rating: 4.3, address: 'Civil Lines, Mau, Uttar Pradesh 265001', description: 'Private healthcare center offering specialized treatments.' },
        { name: 'City Hospital', rating: 4.2, address: 'Mau, Uttar Pradesh 265001', description: 'General hospital providing quality healthcare services.' }
    ],
        touristspots: [
        { name: 'Alia Bagh', rating: 4.5, address: 'Mau, Uttar Pradesh 265001', description: 'Historic garden area and local attraction.' },
        { name: 'Shiv Mandir Mau', rating: 4.6, address: 'Mau, Uttar Pradesh 265001', description: 'Popular temple dedicated to Lord Shiva.' },
        { name: 'Ramleela Maidan', rating: 4.4, address: 'Mau, Uttar Pradesh 265001', description: 'Local ground used for festivals and events.' },
        { name: 'Mau Public Park', rating: 4.3, address: 'Mau, Uttar Pradesh 265001', description: 'Green park area for recreation and walks.' }
    ]
},
'siddharthnagar': { 
    schools: [
        { name: 'Delhi Public School Siddharthnagar', rating: 4.7, address: 'Siddharthnagar, Uttar Pradesh 272207', description: 'Top CBSE school offering strong academics and extracurricular activities.' },
        { name: 'St. Xavier’s School Siddharthnagar', rating: 4.6, address: 'Siddharthnagar, Uttar Pradesh 272207', description: 'Well-known ICSE school providing holistic education.' },
        { name: 'Kendriya Vidyalaya Siddharthnagar', rating: 4.5, address: 'Siddharthnagar, Uttar Pradesh 272207', description: 'Government school following CBSE curriculum with disciplined teaching.' },
        { name: 'Mount Carmel School Siddharthnagar', rating: 4.4, address: 'Siddharthnagar, Uttar Pradesh 272207', description: 'CBSE school focusing on academics and extracurriculars.' }
    ],
    restaurants: [
        { name: 'Shahi Zaika', rating: 4.6, address: 'Siddharthnagar, Uttar Pradesh 272207', description: 'North Indian and Mughlai cuisine with great ambiance.' },
        { name: 'Punjabi Tandoor', rating: 4.5, address: 'Siddharthnagar, Uttar Pradesh 272207', description: 'Famous for tandoori dishes and authentic Punjabi food.' },
        { name: 'Royal Rasoi', rating: 4.4, address: 'Siddharthnagar, Uttar Pradesh 272207', description: 'Local favorite for traditional Indian meals.' },
        { name: 'Chatori Rasoi', rating: 4.3, address: 'Siddharthnagar, Uttar Pradesh 272207', description: 'Street-style snacks and local delicacies.' }
    ],
    hospitals: [
        { name: 'Siddharthnagar District Hospital', rating: 4.5, address: 'Siddharthnagar, Uttar Pradesh 272207', description: 'Government hospital providing general and emergency care.' },
        { name: 'Shree Hospital Siddharthnagar', rating: 4.4, address: 'Siddharthnagar, Uttar Pradesh 272207', description: 'Multi-specialty hospital with modern medical facilities.' },
        { name: 'Sai Nursing Home', rating: 4.3, address: 'Siddharthnagar, Uttar Pradesh 272207', description: 'Private healthcare center offering specialized treatments.' },
        { name: 'City Hospital', rating: 4.2, address: 'Siddharthnagar, Uttar Pradesh 272207', description: 'General hospital providing quality healthcare services.' }
    ],
        touristspots: [
        { name: 'Shree Siddharthnagar Temple', rating: 4.6, address: 'Siddharthnagar, Uttar Pradesh 272207', description: 'Popular temple and local pilgrimage site.' },
        { name: 'Gorakhnath Mandir', rating: 4.5, address: 'Siddharthnagar, Uttar Pradesh 272207', description: 'Historic temple attracting devotees.' },
        { name: 'Siddharthnagar Park', rating: 4.4, address: 'Siddharthnagar, Uttar Pradesh 272207', description: 'Public park with greenery and walking trails.' },
        { name: 'Ancient Stupa Site', rating: 4.3, address: 'Siddharthnagar, Uttar Pradesh 272207', description: 'Archaeological site with historic Buddhist stupas.' }
    ]
},
'deoria': { 
    schools: [
        { name: 'Delhi Public School Deoria', rating: 4.7, address: 'Deoria, Uttar Pradesh 274001', description: 'Top CBSE school offering strong academics and extracurricular activities.' },
        { name: 'St. Xavier’s School Deoria', rating: 4.6, address: 'Deoria, Uttar Pradesh 274001', description: 'Well-known ICSE school providing holistic education.' },
        { name: 'Kendriya Vidyalaya Deoria', rating: 4.5, address: 'Deoria, Uttar Pradesh 274001', description: 'Government school following CBSE curriculum with disciplined teaching.' },
        { name: 'Mount Carmel School Deoria', rating: 4.4, address: 'Deoria, Uttar Pradesh 274001', description: 'CBSE school focusing on academics and extracurriculars.' }
    ],
    restaurants: [
        { name: 'Shahi Zaika', rating: 4.6, address: 'Deoria, Uttar Pradesh 274001', description: 'North Indian and Mughlai cuisine with great ambiance.' },
        { name: 'Punjabi Tandoor', rating: 4.5, address: 'Deoria, Uttar Pradesh 274001', description: 'Famous for tandoori dishes and authentic Punjabi food.' },
        { name: 'Royal Rasoi', rating: 4.4, address: 'Deoria, Uttar Pradesh 274001', description: 'Local favorite for traditional Indian meals.' },
        { name: 'Chatori Rasoi', rating: 4.3, address: 'Deoria, Uttar Pradesh 274001', description: 'Street-style snacks and local delicacies.' }
    ],
    hospitals: [
        { name: 'Deoria District Hospital', rating: 4.5, address: 'Deoria, Uttar Pradesh 274001', description: 'Government hospital providing general and emergency care.' },
        { name: 'Shree Hospital Deoria', rating: 4.4, address: 'Deoria, Uttar Pradesh 274001', description: 'Multi-specialty hospital with modern medical facilities.' },
        { name: 'Sai Nursing Home', rating: 4.3, address: 'Deoria, Uttar Pradesh 274001', description: 'Private healthcare center offering specialized treatments.' },
        { name: 'City Hospital', rating: 4.2, address: 'Deoria, Uttar Pradesh 274001', description: 'General hospital providing quality healthcare services.' }
    ],
        touristspots: [
        { name: 'Shiv Mandir Deoria', rating: 4.6, address: 'Deoria, Uttar Pradesh 274001', description: 'Popular temple dedicated to Lord Shiva.' },
        { name: 'Seth Bhawan', rating: 4.5, address: 'Deoria, Uttar Pradesh 274001', description: 'Historic building showcasing local architecture.' },
        { name: 'Ramleela Maidan', rating: 4.4, address: 'Deoria, Uttar Pradesh 274001', description: 'Ground used for festivals and cultural events.' },
        { name: 'Deoria Park', rating: 4.3, address: 'Deoria, Uttar Pradesh 274001', description: 'Public park with walking trails and recreational space.' }
    ]
},
'kasganj': { 
    schools: [
        { name: 'Delhi Public School Kasganj', rating: 4.7, address: 'Kasganj, Uttar Pradesh 207123', description: 'Top CBSE school offering strong academics and extracurricular activities.' },
        { name: 'St. Xavier’s School Kasganj', rating: 4.6, address: 'Kasganj, Uttar Pradesh 207123', description: 'Well-known ICSE school providing holistic education.' },
        { name: 'Kendriya Vidyalaya Kasganj', rating: 4.5, address: 'Kasganj, Uttar Pradesh 207123', description: 'Government school following CBSE curriculum with disciplined teaching.' },
        { name: 'Mount Carmel School Kasganj', rating: 4.4, address: 'Kasganj, Uttar Pradesh 207123', description: 'CBSE school focusing on academics and extracurriculars.' }
    ],
    restaurants: [
        { name: 'Shahi Zaika', rating: 4.6, address: 'Kasganj, Uttar Pradesh 207123', description: 'North Indian and Mughlai cuisine with great ambiance.' },
        { name: 'Punjabi Tandoor', rating: 4.5, address: 'Kasganj, Uttar Pradesh 207123', description: 'Famous for tandoori dishes and authentic Punjabi food.' },
        { name: 'Royal Rasoi', rating: 4.4, address: 'Kasganj, Uttar Pradesh 207123', description: 'Local favorite for traditional Indian meals.' },
        { name: 'Chatori Rasoi', rating: 4.3, address: 'Kasganj, Uttar Pradesh 207123', description: 'Street-style snacks and local delicacies.' }
    ],
    hospitals: [
        { name: 'Kasganj District Hospital', rating: 4.5, address: 'Kasganj, Uttar Pradesh 207123', description: 'Government hospital providing general and emergency care.' },
        { name: 'Shree Hospital Kasganj', rating: 4.4, address: 'Kasganj, Uttar Pradesh 207123', description: 'Multi-specialty hospital with modern medical facilities.' },
        { name: 'Sai Nursing Home', rating: 4.3, address: 'Kasganj, Uttar Pradesh 207123', description: 'Private healthcare center offering specialized treatments.' },
        { name: 'City Hospital', rating: 4.2, address: 'Kasganj, Uttar Pradesh 207123', description: 'General hospital providing quality healthcare services.' }
    ],
        touristspots: [
        { name: 'Kasganj Fort', rating: 4.5, address: 'Kasganj, Uttar Pradesh 207123', description: 'Historic fort with Mughal-era architecture.' },
        { name: 'Shiv Mandir Kasganj', rating: 4.6, address: 'Kasganj, Uttar Pradesh 207123', description: 'Popular local temple dedicated to Lord Shiva.' },
        { name: 'Kasganj Park', rating: 4.4, address: 'Kasganj, Uttar Pradesh 207123', description: 'Public park for recreation and walks.' },
        { name: 'Jama Masjid Kasganj', rating: 4.3, address: 'Kasganj, Uttar Pradesh 207123', description: 'Historic mosque visited by locals and tourists.' }
    ]
},
'lakhimpur_kheri': { 
    schools: [
        { name: 'Delhi Public School Lakhimpur Kheri', rating: 4.7, address: 'Lakhimpur Kheri, Uttar Pradesh 262701', description: 'Top CBSE school offering strong academics and extracurricular activities.' },
        { name: 'St. Xavier’s School Lakhimpur Kheri', rating: 4.6, address: 'Lakhimpur Kheri, Uttar Pradesh 262701', description: 'Well-known ICSE school providing holistic education.' },
        { name: 'Kendriya Vidyalaya Lakhimpur Kheri', rating: 4.5, address: 'Lakhimpur Kheri, Uttar Pradesh 262701', description: 'Government school following CBSE curriculum with disciplined teaching.' },
        { name: 'Mount Carmel School Lakhimpur Kheri', rating: 4.4, address: 'Lakhimpur Kheri, Uttar Pradesh 262701', description: 'CBSE school focusing on academics and extracurriculars.' }
    ],
    restaurants: [
        { name: 'Shahi Zaika', rating: 4.6, address: 'Lakhimpur Kheri, Uttar Pradesh 262701', description: 'North Indian and Mughlai cuisine with great ambiance.' },
        { name: 'Punjabi Tandoor', rating: 4.5, address: 'Lakhimpur Kheri, Uttar Pradesh 262701', description: 'Famous for tandoori dishes and authentic Punjabi food.' },
        { name: 'Royal Rasoi', rating: 4.4, address: 'Lakhimpur Kheri, Uttar Pradesh 262701', description: 'Local favorite for traditional Indian meals.' },
        { name: 'Chatori Rasoi', rating: 4.3, address: 'Lakhimpur Kheri, Uttar Pradesh 262701', description: 'Street-style snacks and local delicacies.' }
    ],
    hospitals: [
        { name: 'Lakhimpur Kheri District Hospital', rating: 4.5, address: 'Lakhimpur Kheri, Uttar Pradesh 262701', description: 'Government hospital providing general and emergency care.' },
        { name: 'Shree Hospital Lakhimpur Kheri', rating: 4.4, address: 'Lakhimpur Kheri, Uttar Pradesh 262701', description: 'Multi-specialty hospital with modern medical facilities.' },
        { name: 'Sai Nursing Home', rating: 4.3, address: 'Lakhimpur Kheri, Uttar Pradesh 262701', description: 'Private healthcare center offering specialized treatments.' },
        { name: 'City Hospital', rating: 4.2, address: 'Lakhimpur Kheri, Uttar Pradesh 262701', description: 'General hospital providing quality healthcare services.' }
    ],
        touristspots: [
        { name: 'Dudhwa National Park', rating: 4.8, address: 'Lakhimpur Kheri, Uttar Pradesh 262901', description: 'Famous wildlife sanctuary with tigers, elephants, and rich biodiversity.' },
        { name: 'Shiv Mandir Lakhimpur', rating: 4.5, address: 'Lakhimpur Kheri, Uttar Pradesh 262701', description: 'Popular temple dedicated to Lord Shiva.' },
        { name: 'Ghagra River Ghats', rating: 4.4, address: 'Lakhimpur Kheri, Uttar Pradesh 262701', description: 'Riverfront ghats for local recreation and rituals.' },
        { name: 'Lakhimpur Fort', rating: 4.3, address: 'Lakhimpur Kheri, Uttar Pradesh 262701', description: 'Historic fort with old architectural features.' }
    ]
},
'basti': { 
    schools: [
        { name: 'Delhi Public School Basti', rating: 4.7, address: 'Basti, Uttar Pradesh 272001', description: 'Top CBSE school offering strong academics and extracurricular activities.' },
        { name: 'St. Xavier’s School Basti', rating: 4.6, address: 'Basti, Uttar Pradesh 272001', description: 'Well-known ICSE school providing holistic education.' },
        { name: 'Kendriya Vidyalaya Basti', rating: 4.5, address: 'Basti, Uttar Pradesh 272001', description: 'Government school following CBSE curriculum with disciplined teaching.' },
        { name: 'Mount Carmel School Basti', rating: 4.4, address: 'Basti, Uttar Pradesh 272001', description: 'CBSE school focusing on academics and extracurriculars.' }
    ],
    restaurants: [
        { name: 'Shahi Zaika', rating: 4.6, address: 'Basti, Uttar Pradesh 272001', description: 'North Indian and Mughlai cuisine with great ambiance.' },
        { name: 'Punjabi Tandoor', rating: 4.5, address: 'Basti, Uttar Pradesh 272001', description: 'Famous for tandoori dishes and authentic Punjabi food.' },
        { name: 'Royal Rasoi', rating: 4.4, address: 'Basti, Uttar Pradesh 272001', description: 'Local favorite for traditional Indian meals.' },
        { name: 'Chatori Rasoi', rating: 4.3, address: 'Basti, Uttar Pradesh 272001', description: 'Street-style snacks and local delicacies.' }
    ],
    hospitals: [
        { name: 'Basti District Hospital', rating: 4.5, address: 'Basti, Uttar Pradesh 272001', description: 'Government hospital providing general and emergency care.' },
        { name: 'Shree Hospital Basti', rating: 4.4, address: 'Basti, Uttar Pradesh 272001', description: 'Multi-specialty hospital with modern medical facilities.' },
        { name: 'Sai Nursing Home', rating: 4.3, address: 'Basti, Uttar Pradesh 272001', description: 'Private healthcare center offering specialized treatments.' },
        { name: 'City Hospital', rating: 4.2, address: 'Basti, Uttar Pradesh 272001', description: 'General hospital providing quality healthcare services.' }
    ],
        touristspots: [
        { name: 'Shiv Mandir Basti', rating: 4.6, address: 'Basti, Uttar Pradesh 272001', description: 'Famous temple dedicated to Lord Shiva.' },
        { name: 'Basti Park', rating: 4.5, address: 'Basti, Uttar Pradesh 272001', description: 'Public park with walking paths and green areas.' },
        { name: 'Ghaghra River Ghats', rating: 4.4, address: 'Basti, Uttar Pradesh 272001', description: 'Riverfront area for rituals and local gatherings.' },
        { name: 'Historic Jama Masjid', rating: 4.3, address: 'Basti, Uttar Pradesh 272001', description: 'Ancient mosque with cultural and architectural significance.' }
    ]
},
'balrampur': { 
    schools: [
        { name: 'Delhi Public School Balrampur', rating: 4.7, address: 'Balrampur, Uttar Pradesh 271201', description: 'Top CBSE school offering strong academics and extracurricular activities.' },
        { name: 'St. Xavier’s School Balrampur', rating: 4.6, address: 'Balrampur, Uttar Pradesh 271201', description: 'Well-known ICSE school providing holistic education.' },
        { name: 'Kendriya Vidyalaya Balrampur', rating: 4.5, address: 'Balrampur, Uttar Pradesh 271201', description: 'Government school following CBSE curriculum with disciplined teaching.' },
        { name: 'Mount Carmel School Balrampur', rating: 4.4, address: 'Balrampur, Uttar Pradesh 271201', description: 'CBSE school focusing on academics and extracurriculars.' }
    ],
    restaurants: [
        { name: 'Shahi Zaika', rating: 4.6, address: 'Balrampur, Uttar Pradesh 271201', description: 'North Indian and Mughlai cuisine with great ambiance.' },
        { name: 'Punjabi Tandoor', rating: 4.5, address: 'Balrampur, Uttar Pradesh 271201', description: 'Famous for tandoori dishes and authentic Punjabi food.' },
        { name: 'Royal Rasoi', rating: 4.4, address: 'Balrampur, Uttar Pradesh 271201', description: 'Local favorite for traditional Indian meals.' },
        { name: 'Chatori Rasoi', rating: 4.3, address: 'Balrampur, Uttar Pradesh 271201', description: 'Street-style snacks and local delicacies.' }
    ],
    hospitals: [
        { name: 'Balrampur District Hospital', rating: 4.5, address: 'Balrampur, Uttar Pradesh 271201', description: 'Government hospital providing general and emergency care.' },
        { name: 'Shree Hospital Balrampur', rating: 4.4, address: 'Balrampur, Uttar Pradesh 271201', description: 'Multi-specialty hospital with modern medical facilities.' },
        { name: 'Sai Nursing Home', rating: 4.3, address: 'Balrampur, Uttar Pradesh 271201', description: 'Private healthcare center offering specialized treatments.' },
        { name: 'City Hospital', rating: 4.2, address: 'Balrampur, Uttar Pradesh 271201', description: 'General hospital providing quality healthcare services.' }
    ],
        touristspots: [
        { name: 'Shiv Mandir Balrampur', rating: 4.6, address: 'Balrampur, Uttar Pradesh 271201', description: 'Famous temple dedicated to Lord Shiva.' },
        { name: 'Balrampur Fort', rating: 4.5, address: 'Balrampur, Uttar Pradesh 271201', description: 'Historic fort attracting local tourists and visitors.' },
        { name: 'Ramleela Maidan', rating: 4.4, address: 'Balrampur, Uttar Pradesh 271201', description: 'Ground for cultural events and festivals.' },
        { name: 'Balrampur Park', rating: 4.3, address: 'Balrampur, Uttar Pradesh 271201', description: 'Public park with green spaces for relaxation and walks.' }
    ]
},
 'sant_kabir_nagar': { 
    schools: [
        { name: 'Delhi Public School Sant Kabir Nagar', rating: 4.7, address: 'Sant Kabir Nagar, Uttar Pradesh 272175', description: 'Top CBSE school offering strong academics and extracurricular activities.' },
        { name: 'St. Xavier’s School Sant Kabir Nagar', rating: 4.6, address: 'Sant Kabir Nagar, Uttar Pradesh 272175', description: 'Well-known ICSE school providing holistic education.' },
        { name: 'Kendriya Vidyalaya Sant Kabir Nagar', rating: 4.5, address: 'Sant Kabir Nagar, Uttar Pradesh 272175', description: 'Government school following CBSE curriculum with disciplined teaching.' },
        { name: 'Mount Carmel School Sant Kabir Nagar', rating: 4.4, address: 'Sant Kabir Nagar, Uttar Pradesh 272175', description: 'CBSE school focusing on academics and extracurriculars.' }
    ],
    restaurants: [
        { name: 'Shahi Zaika', rating: 4.6, address: 'Sant Kabir Nagar, Uttar Pradesh 272175', description: 'North Indian and Mughlai cuisine with great ambiance.' },
        { name: 'Punjabi Tandoor', rating: 4.5, address: 'Sant Kabir Nagar, Uttar Pradesh 272175', description: 'Famous for tandoori dishes and authentic Punjabi food.' },
        { name: 'Royal Rasoi', rating: 4.4, address: 'Sant Kabir Nagar, Uttar Pradesh 272175', description: 'Local favorite for traditional Indian meals.' },
        { name: 'Chatori Rasoi', rating: 4.3, address: 'Sant Kabir Nagar, Uttar Pradesh 272175', description: 'Street-style snacks and local delicacies.' }
    ],
    hospitals: [
        { name: 'Sant Kabir Nagar District Hospital', rating: 4.5, address: 'Sant Kabir Nagar, Uttar Pradesh 272175', description: 'Government hospital providing general and emergency care.' },
        { name: 'Shree Hospital Sant Kabir Nagar', rating: 4.4, address: 'Sant Kabir Nagar, Uttar Pradesh 272175', description: 'Multi-specialty hospital with modern medical facilities.' },
        { name: 'Sai Nursing Home', rating: 4.3, address: 'Sant Kabir Nagar, Uttar Pradesh 272175', description: 'Private healthcare center offering specialized treatments.' },
        { name: 'City Hospital', rating: 4.2, address: 'Sant Kabir Nagar, Uttar Pradesh 272175', description: 'General hospital providing quality healthcare services.' }
    ],
        touristspots: [
        { name: 'Shiv Mandir Sant Kabir Nagar', rating: 4.6, address: 'Sant Kabir Nagar, Uttar Pradesh 272175', description: 'Famous temple dedicated to Lord Shiva.' },
        { name: 'Kabir Math', rating: 4.7, address: 'Sant Kabir Nagar, Uttar Pradesh 272175', description: 'Historic ashram honoring Sant Kabir, attracting devotees.' },
        { name: 'Ramleela Maidan', rating: 4.4, address: 'Sant Kabir Nagar, Uttar Pradesh 272175', description: 'Local ground for cultural events and festivals.' },
        { name: 'Public Park Sant Kabir Nagar', rating: 4.3, address: 'Sant Kabir Nagar, Uttar Pradesh 272175', description: 'Park with greenery and walking paths for recreation.' }
    ]
},
'sultanpur': { 
    schools: [
        { name: 'Delhi Public School Sultanpur', rating: 4.7, address: 'Sultanpur, Uttar Pradesh 228001', description: 'Top CBSE school offering strong academics and extracurricular activities.' },
        { name: 'St. Xavier’s School Sultanpur', rating: 4.6, address: 'Sultanpur, Uttar Pradesh 228001', description: 'Well-known ICSE school providing holistic education.' },
        { name: 'Kendriya Vidyalaya Sultanpur', rating: 4.5, address: 'Sultanpur, Uttar Pradesh 228001', description: 'Government school following CBSE curriculum with disciplined teaching.' },
        { name: 'Mount Carmel School Sultanpur', rating: 4.4, address: 'Sultanpur, Uttar Pradesh 228001', description: 'CBSE school focusing on academics and extracurriculars.' }
    ],
    restaurants: [
        { name: 'Shahi Zaika', rating: 4.6, address: 'Sultanpur, Uttar Pradesh 228001', description: 'North Indian and Mughlai cuisine with great ambiance.' },
        { name: 'Punjabi Tandoor', rating: 4.5, address: 'Sultanpur, Uttar Pradesh 228001', description: 'Famous for tandoori dishes and authentic Punjabi food.' },
        { name: 'Royal Rasoi', rating: 4.4, address: 'Sultanpur, Uttar Pradesh 228001', description: 'Local favorite for traditional Indian meals.' },
        { name: 'Chatori Rasoi', rating: 4.3, address: 'Sultanpur, Uttar Pradesh 228001', description: 'Street-style snacks and local delicacies.' }
    ],
    hospitals: [
        { name: 'Sultanpur District Hospital', rating: 4.5, address: 'Sultanpur, Uttar Pradesh 228001', description: 'Government hospital providing general and emergency care.' },
        { name: 'Shree Hospital Sultanpur', rating: 4.4, address: 'Sultanpur, Uttar Pradesh 228001', description: 'Multi-specialty hospital with modern medical facilities.' },
        { name: 'Sai Nursing Home', rating: 4.3, address: 'Sultanpur, Uttar Pradesh 228001', description: 'Private healthcare center offering specialized treatments.' },
        { name: 'City Hospital', rating: 4.2, address: 'Sultanpur, Uttar Pradesh 228001', description: 'General hospital providing quality healthcare services.' }
    ],
        touristspots: [
        { name: 'Shiv Mandir Sultanpur', rating: 4.6, address: 'Sultanpur, Uttar Pradesh 228001', description: 'Famous temple dedicated to Lord Shiva.' },
        { name: 'Ramleela Maidan', rating: 4.5, address: 'Sultanpur, Uttar Pradesh 228001', description: 'Ground used for local cultural events and festivals.' },
        { name: 'Public Park Sultanpur', rating: 4.4, address: 'Sultanpur, Uttar Pradesh 228001', description: 'Park with green spaces and walking paths.' },
        { name: 'Historic Jama Masjid', rating: 4.3, address: 'Sultanpur, Uttar Pradesh 228001', description: 'Ancient mosque with architectural significance.' }
    ]
},
'gonda': { 
    schools: [
        { name: 'Delhi Public School Gonda', rating: 4.7, address: 'Gonda, Uttar Pradesh 271001', description: 'Top CBSE school offering strong academics and extracurricular activities.' },
        { name: 'St. Xavier’s School Gonda', rating: 4.6, address: 'Gonda, Uttar Pradesh 271001', description: 'Well-known ICSE school providing holistic education.' },
        { name: 'Kendriya Vidyalaya Gonda', rating: 4.5, address: 'Gonda, Uttar Pradesh 271001', description: 'Government school following CBSE curriculum with disciplined teaching.' },
        { name: 'Mount Carmel School Gonda', rating: 4.4, address: 'Gonda, Uttar Pradesh 271001', description: 'CBSE school focusing on academics and extracurriculars.' }
    ],
    restaurants: [
        { name: 'Shahi Zaika', rating: 4.6, address: 'Gonda, Uttar Pradesh 271001', description: 'North Indian and Mughlai cuisine with great ambiance.' },
        { name: 'Punjabi Tandoor', rating: 4.5, address: 'Gonda, Uttar Pradesh 271001', description: 'Famous for tandoori dishes and authentic Punjabi food.' },
        { name: 'Royal Rasoi', rating: 4.4, address: 'Gonda, Uttar Pradesh 271001', description: 'Local favorite for traditional Indian meals.' },
        { name: 'Chatori Rasoi', rating: 4.3, address: 'Gonda, Uttar Pradesh 271001', description: 'Street-style snacks and local delicacies.' }
    ],
    hospitals: [
        { name: 'Gonda District Hospital', rating: 4.5, address: 'Gonda, Uttar Pradesh 271001', description: 'Government hospital providing general and emergency care.' },
        { name: 'Shree Hospital Gonda', rating: 4.4, address: 'Gonda, Uttar Pradesh 271001', description: 'Multi-specialty hospital with modern medical facilities.' },
        { name: 'Sai Nursing Home', rating: 4.3, address: 'Gonda, Uttar Pradesh 271001', description: 'Private healthcare center offering specialized treatments.' },
        { name: 'City Hospital', rating: 4.2, address: 'Gonda, Uttar Pradesh 271001', description: 'General hospital providing quality healthcare services.' }
    ],
        touristspots: [
        { name: 'Shiv Mandir Gonda', rating: 4.6, address: 'Gonda, Uttar Pradesh 271001', description: 'Famous temple dedicated to Lord Shiva.' },
        { name: 'Ramleela Maidan', rating: 4.5, address: 'Gonda, Uttar Pradesh 271001', description: 'Ground used for local cultural events and festivals.' },
        { name: 'Public Park Gonda', rating: 4.4, address: 'Gonda, Uttar Pradesh 271001', description: 'Park with green spaces and walking paths.' },
        { name: 'Historic Jama Masjid', rating: 4.3, address: 'Gonda, Uttar Pradesh 271001', description: 'Ancient mosque with architectural significance.' }
    ]
},
'bijnor': { 
    schools: [
        { name: 'Delhi Public School Bijnor', rating: 4.7, address: 'Bijnor, Uttar Pradesh 246701', description: 'Top CBSE school offering strong academics and extracurricular activities.' },
        { name: 'St. Xavier’s School Bijnor', rating: 4.6, address: 'Bijnor, Uttar Pradesh 246701', description: 'Well-known ICSE school providing holistic education.' },
        { name: 'Kendriya Vidyalaya Bijnor', rating: 4.5, address: 'Bijnor, Uttar Pradesh 246701', description: 'Government school following CBSE curriculum with disciplined teaching.' },
        { name: 'Mount Carmel School Bijnor', rating: 4.4, address: 'Bijnor, Uttar Pradesh 246701', description: 'CBSE school focusing on academics and extracurriculars.' }
    ],
    restaurants: [
        { name: 'Shahi Zaika', rating: 4.6, address: 'Bijnor, Uttar Pradesh 246701', description: 'North Indian and Mughlai cuisine with great ambiance.' },
        { name: 'Punjabi Tandoor', rating: 4.5, address: 'Bijnor, Uttar Pradesh 246701', description: 'Famous for tandoori dishes and authentic Punjabi food.' },
        { name: 'Royal Rasoi', rating: 4.4, address: 'Bijnor, Uttar Pradesh 246701', description: 'Local favorite for traditional Indian meals.' },
        { name: 'Chatori Rasoi', rating: 4.3, address: 'Bijnor, Uttar Pradesh 246701', description: 'Street-style snacks and local delicacies.' }
    ],
    hospitals: [
        { name: 'Bijnor District Hospital', rating: 4.5, address: 'Bijnor, Uttar Pradesh 246701', description: 'Government hospital providing general and emergency care.' },
        { name: 'Shree Hospital Bijnor', rating: 4.4, address: 'Bijnor, Uttar Pradesh 246701', description: 'Multi-specialty hospital with modern medical facilities.' },
        { name: 'Sai Nursing Home', rating: 4.3, address: 'Bijnor, Uttar Pradesh 246701', description: 'Private healthcare center offering specialized treatments.' },
        { name: 'City Hospital', rating: 4.2, address: 'Bijnor, Uttar Pradesh 246701', description: 'General hospital providing quality healthcare services.' }
    ],
        touristspots: [
        { name: 'Shiv Mandir Bijnor', rating: 4.6, address: 'Bijnor, Uttar Pradesh 246701', description: 'Famous temple dedicated to Lord Shiva.' },
        { name: 'Ramleela Maidan', rating: 4.5, address: 'Bijnor, Uttar Pradesh 246701', description: 'Ground used for local cultural events and festivals.' },
        { name: 'Public Park Bijnor', rating: 4.4, address: 'Bijnor, Uttar Pradesh 246701', description: 'Park with green spaces and walking paths.' },
        { name: 'Historic Jama Masjid', rating: 4.3, address: 'Bijnor, Uttar Pradesh 246701', description: 'Ancient mosque with architectural significance.' }
    ]
},
'etah': { 
    schools: [
        { name: 'Delhi Public School Etah', rating: 4.7, address: 'Etah, Uttar Pradesh 207001', description: 'Top CBSE school offering strong academics and extracurricular activities.' },
        { name: 'St. Xavier’s School Etah', rating: 4.6, address: 'Etah, Uttar Pradesh 207001', description: 'Well-known ICSE school providing holistic education.' },
        { name: 'Kendriya Vidyalaya Etah', rating: 4.5, address: 'Etah, Uttar Pradesh 207001', description: 'Government school following CBSE curriculum with disciplined teaching.' },
        { name: 'Mount Carmel School Etah', rating: 4.4, address: 'Etah, Uttar Pradesh 207001', description: 'CBSE school focusing on academics and extracurriculars.' }
    ],
    restaurants: [
        { name: 'Shahi Zaika', rating: 4.6, address: 'Etah, Uttar Pradesh 207001', description: 'North Indian and Mughlai cuisine with great ambiance.' },
        { name: 'Punjabi Tandoor', rating: 4.5, address: 'Etah, Uttar Pradesh 207001', description: 'Famous for tandoori dishes and authentic Punjabi food.' },
        { name: 'Royal Rasoi', rating: 4.4, address: 'Etah, Uttar Pradesh 207001', description: 'Local favorite for traditional Indian meals.' },
        { name: 'Chatori Rasoi', rating: 4.3, address: 'Etah, Uttar Pradesh 207001', description: 'Street-style snacks and local delicacies.' }
    ],
    hospitals: [
        { name: 'Etah District Hospital', rating: 4.5, address: 'Etah, Uttar Pradesh 207001', description: 'Government hospital providing general and emergency care.' },
        { name: 'Shree Hospital Etah', rating: 4.4, address: 'Etah, Uttar Pradesh 207001', description: 'Multi-specialty hospital with modern medical facilities.' },
        { name: 'Sai Nursing Home', rating: 4.3, address: 'Etah, Uttar Pradesh 207001', description: 'Private healthcare center offering specialized treatments.' },
        { name: 'City Hospital', rating: 4.2, address: 'Etah, Uttar Pradesh 207001', description: 'General hospital providing quality healthcare services.' }
    ],
        touristspots: [
        { name: 'Shiv Mandir Etah', rating: 4.6, address: 'Etah, Uttar Pradesh 207001', description: 'Famous temple dedicated to Lord Shiva.' },
        { name: 'Ramleela Maidan', rating: 4.5, address: 'Etah, Uttar Pradesh 207001', description: 'Ground used for local cultural events and festivals.' },
        { name: 'Public Park Etah', rating: 4.4, address: 'Etah, Uttar Pradesh 207001', description: 'Park with green spaces and walking paths.' },
        { name: 'Historic Jama Masjid', rating: 4.3, address: 'Etah, Uttar Pradesh 207001', description: 'Ancient mosque with architectural significance.' }
    ]
},
'amroha': { 
    schools: [
        { name: 'Delhi Public School Amroha', rating: 4.7, address: 'Amroha, Uttar Pradesh 244221', description: 'Top CBSE school offering strong academics and extracurricular activities.' },
        { name: 'St. Xavier’s School Amroha', rating: 4.6, address: 'Amroha, Uttar Pradesh 244221', description: 'Well-known ICSE school providing holistic education.' },
        { name: 'Kendriya Vidyalaya Amroha', rating: 4.5, address: 'Amroha, Uttar Pradesh 244221', description: 'Government school following CBSE curriculum with disciplined teaching.' },
        { name: 'Mount Carmel School Amroha', rating: 4.4, address: 'Amroha, Uttar Pradesh 244221', description: 'CBSE school focusing on academics and extracurriculars.' }
    ],
    restaurants: [
        { name: 'Shahi Zaika', rating: 4.6, address: 'Amroha, Uttar Pradesh 244221', description: 'North Indian and Mughlai cuisine with great ambiance.' },
        { name: 'Punjabi Tandoor', rating: 4.5, address: 'Amroha, Uttar Pradesh 244221', description: 'Famous for tandoori dishes and authentic Punjabi food.' },
        { name: 'Royal Rasoi', rating: 4.4, address: 'Amroha, Uttar Pradesh 244221', description: 'Local favorite for traditional Indian meals.' },
        { name: 'Chatori Rasoi', rating: 4.3, address: 'Amroha, Uttar Pradesh 244221', description: 'Street-style snacks and local delicacies.' }
    ],
    hospitals: [
        { name: 'Amroha District Hospital', rating: 4.5, address: 'Amroha, Uttar Pradesh 244221', description: 'Government hospital providing general and emergency care.' },
        { name: 'Shree Hospital Amroha', rating: 4.4, address: 'Amroha, Uttar Pradesh 244221', description: 'Multi-specialty hospital with modern medical facilities.' },
        { name: 'Sai Nursing Home', rating: 4.3, address: 'Amroha, Uttar Pradesh 244221', description: 'Private healthcare center offering specialized treatments.' },
        { name: 'City Hospital', rating: 4.2, address: 'Amroha, Uttar Pradesh 244221', description: 'General hospital providing quality healthcare services.' }
    ],
        touristspots: [
        { name: 'Shiv Mandir Amroha', rating: 4.6, address: 'Amroha, Uttar Pradesh 244221', description: 'Famous temple dedicated to Lord Shiva.' },
        { name: 'Ramleela Maidan', rating: 4.5, address: 'Amroha, Uttar Pradesh 244221', description: 'Ground used for local cultural events and festivals.' },
        { name: 'Public Park Amroha', rating: 4.4, address: 'Amroha, Uttar Pradesh 244221', description: 'Park with green spaces and walking paths.' },
        { name: 'Historic Jama Masjid', rating: 4.3, address: 'Amroha, Uttar Pradesh 244221', description: 'Ancient mosque with architectural significance.' }
    ]
},
  'sitapur': { 
    schools: [
        { name: 'Delhi Public School Sitapur', rating: 4.7, address: 'Sitapur, Uttar Pradesh 261001', description: 'Top CBSE school offering strong academics and extracurricular activities.' },
        { name: 'St. Xavier’s School Sitapur', rating: 4.6, address: 'Sitapur, Uttar Pradesh 261001', description: 'Reputed ICSE school providing holistic education and personality development.' },
        { name: 'Kendriya Vidyalaya Sitapur', rating: 4.5, address: 'Sitapur, Uttar Pradesh 261001', description: 'Government school known for quality education and discipline.' },
        { name: 'Mount Carmel School Sitapur', rating: 4.4, address: 'Sitapur, Uttar Pradesh 261001', description: 'CBSE school focusing on overall growth and academics.' }
    ],
    restaurants: [
        { name: 'Zaika Restaurant', rating: 4.6, address: 'Sitapur, Uttar Pradesh 261001', description: 'Popular North Indian restaurant with family-friendly ambiance.' },
        { name: 'Punjabi Dhaba', rating: 4.5, address: 'Sitapur, Uttar Pradesh 261001', description: 'Authentic Punjabi dishes served in a homely setting.' },
        { name: 'Royal Rasoi', rating: 4.4, address: 'Sitapur, Uttar Pradesh 261001', description: 'Known for delicious Indian meals and fast service.' },
        { name: 'Tandoori Treat', rating: 4.3, address: 'Sitapur, Uttar Pradesh 261001', description: 'Famous for grilled food and kebabs.' }
    ],
    hospitals: [
        { name: 'Sitapur Eye Hospital', rating: 4.8, address: 'Sitapur, Uttar Pradesh 261001', description: 'Renowned eye care and ophthalmology center in Uttar Pradesh.' },
        { name: 'District Hospital Sitapur', rating: 4.5, address: 'Sitapur, Uttar Pradesh 261001', description: 'Government hospital providing general and emergency care.' },
        { name: 'Sai Hospital Sitapur', rating: 4.4, address: 'Sitapur, Uttar Pradesh 261001', description: 'Private multi-specialty hospital with modern facilities.' },
        { name: 'Shri Ram Hospital', rating: 4.3, address: 'Sitapur, Uttar Pradesh 261001', description: 'Quality healthcare services with good infrastructure.' }
    ],
    touristspots: [
        { name: 'Naimisharanya Dham', rating: 4.8, address: 'Sitapur, Uttar Pradesh 261402', description: 'Ancient pilgrimage site known as the center of the universe in Hindu mythology.' },
        { name: 'Chakratirth Temple', rating: 4.6, address: 'Naimisharanya, Sitapur, Uttar Pradesh', description: 'Sacred pond and temple attracting thousands of devotees.' },
        { name: 'Hanuman Garhi Temple', rating: 4.5, address: 'Sitapur, Uttar Pradesh 261001', description: 'Temple dedicated to Lord Hanuman with historical importance.' },
        { name: 'Lalita Devi Temple', rating: 4.4, address: 'Naimisharanya, Sitapur, Uttar Pradesh', description: 'Popular Shakti Peeth and major religious attraction.' }
    ]
},
'hapur': { 
    schools: [
        { name: 'Delhi Public School Hapur', rating: 4.7, address: 'Hapur, Uttar Pradesh 245101', description: 'Top CBSE school known for academic excellence and modern infrastructure.' },
        { name: 'St. Mary’s School Hapur', rating: 4.6, address: 'Hapur, Uttar Pradesh 245101', description: 'Reputed ICSE school emphasizing holistic education and discipline.' },
        { name: 'Kendriya Vidyalaya Hapur', rating: 4.5, address: 'Hapur, Uttar Pradesh 245101', description: 'Central government school offering quality CBSE education.' },
        { name: 'Sapphire International School', rating: 4.4, address: 'Hapur, Uttar Pradesh 245101', description: 'Modern CBSE school with emphasis on creativity and technology.' }
    ],
    restaurants: [
        { name: 'Zaika Family Restaurant', rating: 4.6, address: 'Hapur, Uttar Pradesh 245101', description: 'Popular spot serving Mughlai and North Indian cuisine.' },
        { name: 'Punjabi Zaika', rating: 4.5, address: 'Hapur, Uttar Pradesh 245101', description: 'Known for rich curries and authentic Punjabi flavors.' },
        { name: 'The Rasoi', rating: 4.4, address: 'Hapur, Uttar Pradesh 245101', description: 'Local favorite serving delicious Indian and Chinese food.' },
        { name: 'Royal Tandoor', rating: 4.3, address: 'Hapur, Uttar Pradesh 245101', description: 'Famous for tandoori dishes and grilled snacks.' }
    ],
    hospitals: [
        { name: 'District Hospital Hapur', rating: 4.5, address: 'Hapur, Uttar Pradesh 245101', description: 'Government hospital providing essential and emergency healthcare.' },
        { name: 'Shree Ram Hospital', rating: 4.4, address: 'Hapur, Uttar Pradesh 245101', description: 'Private multi-specialty hospital with modern facilities.' },
        { name: 'Gaur Hospital', rating: 4.3, address: 'Hapur, Uttar Pradesh 245101', description: 'Well-equipped healthcare center offering specialized treatments.' },
        { name: 'Sai Hospital Hapur', rating: 4.2, address: 'Hapur, Uttar Pradesh 245101', description: 'Reliable hospital providing quality medical care.' }
    ],
    touristspots: [
        { name: 'Dargah of Shah Junaid', rating: 4.6, address: 'Hapur, Uttar Pradesh 245101', description: 'Historic Sufi shrine attracting pilgrims and visitors.' },
        { name: 'Bada Mandir Hapur', rating: 4.5, address: 'Hapur, Uttar Pradesh 245101', description: 'Ancient Hindu temple known for its grand architecture.' },
        { name: 'Ganga Canal View Point', rating: 4.4, address: 'Hapur, Uttar Pradesh 245101', description: 'Peaceful location with scenic views of the Ganga canal.' },
        { name: 'City Park Hapur', rating: 4.3, address: 'Hapur, Uttar Pradesh 245101', description: 'Recreational park ideal for families and morning walks.' }
    ]
},
'mau': { 
    schools: [
        { name: 'Delhi Public School Mau', rating: 4.7, address: 'Mau, Uttar Pradesh 275101', description: 'Leading CBSE school offering quality education and co-curricular activities.' },
        { name: 'St. Joseph’s School Mau', rating: 4.6, address: 'Mau, Uttar Pradesh 275101', description: 'Renowned ICSE school focusing on academics and moral education.' },
        { name: 'Kendriya Vidyalaya Mau', rating: 4.5, address: 'Mau, Uttar Pradesh 275101', description: 'Government CBSE school known for discipline and academics.' },
        { name: 'Sunbeam School Mau', rating: 4.4, address: 'Mau, Uttar Pradesh 275101', description: 'Popular CBSE-affiliated institution with modern facilities.' }
    ],
    restaurants: [
        { name: 'Zaika Family Restaurant', rating: 4.6, address: 'Mau, Uttar Pradesh 275101', description: 'Known for North Indian and Mughlai delicacies.' },
        { name: 'Spice Garden', rating: 4.5, address: 'Mau, Uttar Pradesh 275101', description: 'Popular restaurant serving Indian and Chinese dishes.' },
        { name: 'The Food Court', rating: 4.4, address: 'Mau, Uttar Pradesh 275101', description: 'Modern dining spot offering multi-cuisine meals.' },
        { name: 'Punjabi Rasoi', rating: 4.3, address: 'Mau, Uttar Pradesh 275101', description: 'Famous for Punjabi-style curries and grilled dishes.' }
    ],
    hospitals: [
        { name: 'District Hospital Mau', rating: 4.5, address: 'Mau, Uttar Pradesh 275101', description: 'Government hospital providing healthcare and emergency services.' },
        { name: 'Sushila Hospital Mau', rating: 4.4, address: 'Mau, Uttar Pradesh 275101', description: 'Private multi-specialty hospital offering advanced treatments.' },
        { name: 'Lifeline Hospital Mau', rating: 4.3, address: 'Mau, Uttar Pradesh 275101', description: 'Equipped with modern medical facilities and experienced staff.' },
        { name: 'Sai Nursing Home', rating: 4.2, address: 'Mau, Uttar Pradesh 275101', description: 'Local healthcare center providing affordable medical care.' }
    ],
    touristSpots: [
        { name: 'Muktidham Mandir', rating: 4.6, address: 'Mau, Uttar Pradesh 275101', description: 'Famous temple known for its peaceful environment and architecture.' },
        { name: 'Kopaganj Dargah', rating: 4.5, address: 'Kopaganj, Mau, Uttar Pradesh', description: 'Historic religious site visited by people of all faiths.' },
        { name: 'Ghaghara River View', rating: 4.4, address: 'Mau, Uttar Pradesh 275101', description: 'Beautiful riverside spot offering scenic views and tranquility.' },
        { name: 'Town Park Mau', rating: 4.3, address: 'Mau, Uttar Pradesh 275101', description: 'Well-maintained park for leisure walks and family outings.' }
    ]
},
'chitrakoot': { 
    schools: [
        { name: 'Jawahar Navodaya Vidyalaya Chitrakoot', rating: 4.7, address: 'Karwi, Chitrakoot, Uttar Pradesh 210205', description: 'CBSE-affiliated school with excellent academic and sports record.' },
        { name: 'Kendriya Vidyalaya Chitrakoot', rating: 4.6, address: 'Karwi, Chitrakoot, Uttar Pradesh 210205', description: 'Central government school providing holistic education and co-curricular activities.' },
        { name: 'St. Mary’s School', rating: 4.5, address: 'Karwi, Chitrakoot, Uttar Pradesh 210205', description: 'English medium school emphasizing discipline and moral values.' },
        { name: 'Saraswati Vidya Mandir', rating: 4.4, address: 'Sitapur Road, Chitrakoot, Uttar Pradesh 210205', description: 'Popular school promoting traditional learning with modern education.' }
    ],
    restaurants: [
        { name: 'Bharat Bhojanalaya', rating: 4.6, address: 'Near Ramghat, Chitrakoot, Uttar Pradesh 210205', description: 'Famous vegetarian restaurant offering authentic North Indian thalis.' },
        { name: 'Ram Ghat Restaurant', rating: 4.5, address: 'Ramghat, Karwi, Chitrakoot, Uttar Pradesh 210205', description: 'Popular among pilgrims for its homely food and peaceful atmosphere.' },
        { name: 'Annapurna Restaurant', rating: 4.4, address: 'Sitapur Road, Chitrakoot, Uttar Pradesh 210205', description: 'Pure vegetarian restaurant known for its South and North Indian cuisine.' },
        { name: 'Hotel Mandakini Restaurant', rating: 4.3, address: 'Karwi, Chitrakoot, Uttar Pradesh 210205', description: 'Multi-cuisine restaurant serving Indian and Chinese dishes.' }
    ],
    hospitals: [
        { name: 'District Hospital Chitrakoot', rating: 4.5, address: 'Karwi, Chitrakoot, Uttar Pradesh 210205', description: 'Main government hospital providing emergency and specialized healthcare.' },
        { name: 'Ramkrishna Mission Hospital', rating: 4.4, address: 'Karwi, Chitrakoot, Uttar Pradesh 210205', description: 'Charitable hospital offering quality medical services to all.' },
        { name: 'Saraswati Hospital', rating: 4.3, address: 'Sitapur Road, Chitrakoot, Uttar Pradesh 210205', description: 'Private hospital with experienced doctors and modern facilities.' },
        { name: 'Life Line Hospital', rating: 4.2, address: 'Karwi, Chitrakoot, Uttar Pradesh 210205', description: 'Provides general and emergency healthcare with good patient care.' }
    ],
    touristSpots: [
        { name: 'Ramghat', rating: 4.9, address: 'Karwi, Chitrakoot, Uttar Pradesh', description: 'Sacred ghat on River Mandakini, known for evening aarti and divine atmosphere.' },
        { name: 'Gupt Godavari Caves', rating: 4.8, address: 'Chitrakoot, Uttar Pradesh', description: 'Mysterious caves believed to be visited by Lord Rama during exile.' },
        { name: 'Kamadgiri Hill', rating: 4.7, address: 'Chitrakoot, Uttar Pradesh', description: 'Holy hill surrounded by temples, a popular pilgrimage site for devotees.' },
        { name: 'Hanuman Dhara', rating: 4.6, address: 'Chitrakoot, Uttar Pradesh', description: 'Waterfall and temple complex dedicated to Lord Hanuman, known for scenic beauty.' }
    ]
},
'fatehpur': { 
    schools: [
        { name: 'Kendriya Vidyalaya Fatehpur', rating: 4.7, address: 'Civil Lines, Fatehpur, Uttar Pradesh 212601', description: 'Central government school offering excellent education and co-curricular programs.' },
        { name: 'St. Mary’s Convent School', rating: 4.6, address: 'Bindki Road, Fatehpur, Uttar Pradesh 212601', description: 'English medium school known for academic excellence and discipline.' },
        { name: 'Delhi Public School Fatehpur', rating: 4.5, address: 'Malwan Road, Fatehpur, Uttar Pradesh 212601', description: 'CBSE-affiliated institution focusing on modern education and holistic development.' },
        { name: 'Saraswati Vidya Mandir', rating: 4.4, address: 'Khaga Road, Fatehpur, Uttar Pradesh 212601', description: 'Respected local school combining Indian culture with modern learning.' }
    ],
    restaurants: [
        { name: 'Taste Point Restaurant', rating: 4.6, address: 'Civil Lines, Fatehpur, Uttar Pradesh 212601', description: 'Popular multi-cuisine restaurant with a cozy atmosphere.' },
        { name: 'The Spice Villa', rating: 4.5, address: 'Bindki Road, Fatehpur, Uttar Pradesh 212601', description: 'Serves delicious North Indian and Chinese dishes.' },
        { name: 'Royal Treat Restaurant', rating: 4.4, address: 'Station Road, Fatehpur, Uttar Pradesh 212601', description: 'Modern family restaurant known for its biryanis and thalis.' },
        { name: 'Annapurna Bhojanalaya', rating: 4.3, address: 'Malwan Road, Fatehpur, Uttar Pradesh 212601', description: 'Affordable vegetarian restaurant offering traditional Indian meals.' }
    ],
    hospitals: [
        { name: 'District Hospital Fatehpur', rating: 4.5, address: 'Civil Lines, Fatehpur, Uttar Pradesh 212601', description: 'Main government hospital offering emergency and general care services.' },
        { name: 'Life Line Hospital', rating: 4.4, address: 'Station Road, Fatehpur, Uttar Pradesh 212601', description: 'Private multi-specialty hospital with modern medical facilities.' },
        { name: 'Shanti Hospital', rating: 4.3, address: 'Bindki Road, Fatehpur, Uttar Pradesh 212601', description: 'Reputed for quality patient care and diagnostics.' },
        { name: 'Saraswati Nursing Home', rating: 4.2, address: 'Khaga Road, Fatehpur, Uttar Pradesh 212601', description: 'Affordable nursing home with general healthcare services.' }
    ],
    touristSpots: [
        { name: 'Bhawani Temple', rating: 4.8, address: 'Fatehpur, Uttar Pradesh', description: 'Ancient temple dedicated to Goddess Bhawani, attracting numerous devotees.' },
        { name: 'Baba Gaurishankar Temple', rating: 4.6, address: 'Fatehpur, Uttar Pradesh', description: 'Popular Shiva temple known for its peaceful environment and architecture.' },
        { name: 'Renh Ghat', rating: 4.5, address: 'Fatehpur, Uttar Pradesh', description: 'Serene riverfront spot ideal for relaxation and religious gatherings.' },
        { name: 'Khajuha Ancient Site', rating: 4.4, address: 'Near Fatehpur, Uttar Pradesh', description: 'Historical site with ruins dating back to the Mughal period.' }
    ]
},
'hamirpur': { 
    schools: [
        { name: 'Kendriya Vidyalaya Hamirpur', rating: 4.7, address: 'Rath Road, Hamirpur, Uttar Pradesh 210301', description: 'CBSE-affiliated government school offering high-quality education and extracurricular programs.' },
        { name: 'St. Paul’s School', rating: 4.6, address: 'Civil Lines, Hamirpur, Uttar Pradesh 210301', description: 'English medium school emphasizing discipline and academic growth.' },
        { name: 'Saraswati Vidya Mandir', rating: 4.5, address: 'Rath Road, Hamirpur, Uttar Pradesh 210301', description: 'Reputed institution promoting Indian values with modern education.' },
        { name: 'Children Public School', rating: 4.4, address: 'Gandhi Nagar, Hamirpur, Uttar Pradesh 210301', description: 'Popular local school focusing on balanced learning and personality development.' }
    ],
    restaurants: [
        { name: 'The Spice House', rating: 4.6, address: 'Civil Lines, Hamirpur, Uttar Pradesh 210301', description: 'Famous for its North Indian cuisine and friendly atmosphere.' },
        { name: 'Annapurna Bhojanalaya', rating: 4.5, address: 'Bus Stand Road, Hamirpur, Uttar Pradesh 210301', description: 'Popular vegetarian restaurant known for homely food and thalis.' },
        { name: 'Foodie’s Point', rating: 4.4, address: 'Rath Road, Hamirpur, Uttar Pradesh 210301', description: 'Modern restaurant offering Indian and Chinese delicacies.' },
        { name: 'Taste of Town', rating: 4.3, address: 'Gandhi Nagar, Hamirpur, Uttar Pradesh 210301', description: 'Family restaurant serving a variety of Indian cuisines.' }
    ],
    hospitals: [
        { name: 'District Hospital Hamirpur', rating: 4.5, address: 'Civil Lines, Hamirpur, Uttar Pradesh 210301', description: 'Government hospital providing general healthcare and emergency services.' },
        { name: 'Sanjeevani Hospital', rating: 4.4, address: 'Rath Road, Hamirpur, Uttar Pradesh 210301', description: 'Private hospital known for reliable healthcare and diagnostics.' },
        { name: 'Shree Ram Hospital', rating: 4.3, address: 'Bus Stand Road, Hamirpur, Uttar Pradesh 210301', description: 'Multi-specialty hospital with good patient facilities and staff.' },
        { name: 'City Care Hospital', rating: 4.2, address: 'Gandhi Nagar, Hamirpur, Uttar Pradesh 210301', description: 'Affordable and trusted local hospital offering quality treatment.' }
    ],
    touristSpots: [
        { name: 'Kalpavriksha Temple', rating: 4.8, address: 'Hamirpur, Uttar Pradesh', description: 'Ancient temple known for its divine tree and spiritual ambiance.' },
        { name: 'Sumer Sagar Lake', rating: 4.6, address: 'Hamirpur, Uttar Pradesh', description: 'Beautiful lake offering scenic views and peaceful surroundings.' },
        { name: 'Rath Fort', rating: 4.5, address: 'Rath, Hamirpur, Uttar Pradesh', description: 'Historic fort showcasing the architecture of Bundelkhand region.' },
        { name: 'Yamuna River Ghat', rating: 4.4, address: 'Hamirpur, Uttar Pradesh', description: 'Serene riverside location ideal for spiritual and leisure visits.' }
    ]
},
'kannauj': { 
    schools: [
        { name: 'Kendriya Vidyalaya Kannauj', rating: 4.7, address: 'Civil Lines, Kannauj, Uttar Pradesh 209725', description: 'CBSE-affiliated school providing quality education and extracurricular opportunities.' },
        { name: 'St. Joseph’s School', rating: 4.6, address: 'Rly Road, Kannauj, Uttar Pradesh 209725', description: 'English medium school emphasizing academics and overall development.' },
        { name: 'Delhi Public School Kannauj', rating: 4.5, address: 'Near Bus Stand, Kannauj, Uttar Pradesh 209725', description: 'Modern CBSE school with a strong focus on academics and sports.' },
        { name: 'Saraswati Vidya Mandir', rating: 4.4, address: 'Civil Lines, Kannauj, Uttar Pradesh 209725', description: 'Respected local school promoting cultural values alongside education.' }
    ],
    restaurants: [
        { name: 'Zaika Restaurant', rating: 4.6, address: 'Civil Lines, Kannauj, Uttar Pradesh 209725', description: 'Well-known for North Indian cuisine and family-friendly environment.' },
        { name: 'Spice Villa', rating: 4.5, address: 'Rly Road, Kannauj, Uttar Pradesh 209725', description: 'Popular restaurant serving Indian and Chinese dishes.' },
        { name: 'Royal Tandoor', rating: 4.4, address: 'Near Bus Stand, Kannauj, Uttar Pradesh 209725', description: 'Famous for tandoori and grilled dishes.' },
        { name: 'Annapurna Bhojanalaya', rating: 4.3, address: 'Civil Lines, Kannauj, Uttar Pradesh 209725', description: 'Affordable vegetarian restaurant offering traditional meals.' }
    ],
    hospitals: [
        { name: 'District Hospital Kannauj', rating: 4.5, address: 'Civil Lines, Kannauj, Uttar Pradesh 209725', description: 'Government hospital offering general and emergency healthcare.' },
        { name: 'Life Care Hospital', rating: 4.4, address: 'Rly Road, Kannauj, Uttar Pradesh 209725', description: 'Private multi-specialty hospital with modern facilities.' },
        { name: 'Shanti Hospital', rating: 4.3, address: 'Near Bus Stand, Kannauj, Uttar Pradesh 209725', description: 'Trusted hospital providing quality healthcare services.' },
        { name: 'Saraswati Nursing Home', rating: 4.2, address: 'Civil Lines, Kannauj, Uttar Pradesh 209725', description: 'Local nursing home offering affordable medical care.' }
    ],
    touristSpots: [
        { name: 'Kannauj Perfume Town', rating: 4.8, address: 'Kannauj, Uttar Pradesh', description: 'Famous for its ancient perfume and attar industry, attracting visitors worldwide.' },
        { name: 'Gola Gokaran Nath Temple', rating: 4.6, address: 'Kannauj, Uttar Pradesh', description: 'Historic temple known for its spiritual significance and festivals.' },
        { name: 'Jahangir Mahal', rating: 4.5, address: 'Kannauj, Uttar Pradesh', description: 'Historic palace reflecting Mughal-era architecture.' },
        { name: 'Teli Ka Mandir', rating: 4.4, address: 'Kannauj, Uttar Pradesh', description: 'Ancient temple showcasing traditional Indian architecture and history.' }
    ]
},
'maharajganj': { 
    schools: [
        { name: 'Kendriya Vidyalaya Maharajganj', rating: 4.7, address: 'Civil Lines, Maharajganj, Uttar Pradesh 273303', description: 'CBSE-affiliated school providing quality education and extracurricular activities.' },
        { name: 'St. Joseph’s School Maharajganj', rating: 4.6, address: 'Rly Road, Maharajganj, Uttar Pradesh 273303', description: 'English medium school known for academics and discipline.' },
        { name: 'Delhi Public School Maharajganj', rating: 4.5, address: 'Near Bus Stand, Maharajganj, Uttar Pradesh 273303', description: 'CBSE school focusing on modern education and holistic development.' },
        { name: 'Saraswati Vidya Mandir', rating: 4.4, address: 'Civil Lines, Maharajganj, Uttar Pradesh 273303', description: 'Respected local school emphasizing cultural and academic growth.' }
    ],
    restaurants: [
        { name: 'Zaika Restaurant', rating: 4.6, address: 'Civil Lines, Maharajganj, Uttar Pradesh 273303', description: 'Popular for North Indian cuisine and friendly ambiance.' },
        { name: 'Spice Villa', rating: 4.5, address: 'Rly Road, Maharajganj, Uttar Pradesh 273303', description: 'Well-known restaurant serving Indian and Chinese dishes.' },
        { name: 'Royal Tandoor', rating: 4.4, address: 'Near Bus Stand, Maharajganj, Uttar Pradesh 273303', description: 'Famous for tandoori dishes and kebabs.' },
        { name: 'Annapurna Bhojanalaya', rating: 4.3, address: 'Civil Lines, Maharajganj, Uttar Pradesh 273303', description: 'Affordable vegetarian restaurant serving traditional meals.' }
    ],
    hospitals: [
        { name: 'District Hospital Maharajganj', rating: 4.5, address: 'Civil Lines, Maharajganj, Uttar Pradesh 273303', description: 'Government hospital providing general and emergency care.' },
        { name: 'Life Care Hospital', rating: 4.4, address: 'Rly Road, Maharajganj, Uttar Pradesh 273303', description: 'Private hospital offering modern medical services and treatments.' },
        { name: 'Shanti Hospital', rating: 4.3, address: 'Near Bus Stand, Maharajganj, Uttar Pradesh 273303', description: 'Reputed hospital with quality patient care and diagnostics.' },
        { name: 'Saraswati Nursing Home', rating: 4.2, address: 'Civil Lines, Maharajganj, Uttar Pradesh 273303', description: 'Local nursing home providing affordable healthcare services.' }
    ],
    touristSpots: [
        { name: 'Nautanwa Temple', rating: 4.8, address: 'Maharajganj, Uttar Pradesh', description: 'Popular religious site visited by locals and pilgrims.' },
        { name: 'Dudhwa National Park', rating: 4.9, address: 'Near Maharajganj, Uttar Pradesh', description: 'Famous wildlife sanctuary known for tigers, rhinos, and birdwatching.' },
        { name: 'Ghaghara River View', rating: 4.5, address: 'Maharajganj, Uttar Pradesh', description: 'Scenic riverside spot ideal for relaxation and nature walks.' },
        { name: 'Kushinagar Stupa', rating: 4.7, address: 'Kushinagar, near Maharajganj, Uttar Pradesh', description: 'Buddhist pilgrimage site believed to be where Lord Buddha attained Mahaparinirvana.' }
    ]
},
'mirzapur': { 
    schools: [
        { name: 'Kendriya Vidyalaya Mirzapur', rating: 4.7, address: 'Civil Lines, Mirzapur, Uttar Pradesh 231001', description: 'CBSE-affiliated school providing quality academics and co-curricular programs.' },
        { name: 'St. Joseph’s School Mirzapur', rating: 4.6, address: 'Rly Road, Mirzapur, Uttar Pradesh 231001', description: 'English medium school known for disciplined education and holistic development.' },
        { name: 'Delhi Public School Mirzapur', rating: 4.5, address: 'Near Bus Stand, Mirzapur, Uttar Pradesh 231001', description: 'Popular CBSE school focusing on academics, sports, and extracurricular activities.' },
        { name: 'Saraswati Vidya Mandir', rating: 4.4, address: 'Civil Lines, Mirzapur, Uttar Pradesh 231001', description: 'Reputed local school combining traditional values with modern learning.' }
    ],
    restaurants: [
        { name: 'Zaika Restaurant', rating: 4.6, address: 'Civil Lines, Mirzapur, Uttar Pradesh 231001', description: 'Famous for North Indian cuisine and welcoming ambiance.' },
        { name: 'Spice Villa', rating: 4.5, address: 'Rly Road, Mirzapur, Uttar Pradesh 231001', description: 'Well-known restaurant serving Indian and Chinese dishes.' },
        { name: 'Royal Tandoor', rating: 4.4, address: 'Near Bus Stand, Mirzapur, Uttar Pradesh 231001', description: 'Specializes in tandoori dishes, kebabs, and grills.' },
        { name: 'Annapurna Bhojanalaya', rating: 4.3, address: 'Civil Lines, Mirzapur, Uttar Pradesh 231001', description: 'Affordable vegetarian restaurant popular among locals.' }
    ],
    hospitals: [
        { name: 'District Hospital Mirzapur', rating: 4.5, address: 'Civil Lines, Mirzapur, Uttar Pradesh 231001', description: 'Government hospital providing emergency and general healthcare.' },
        { name: 'Life Care Hospital', rating: 4.4, address: 'Rly Road, Mirzapur, Uttar Pradesh 231001', description: 'Private multi-specialty hospital with modern medical facilities.' },
        { name: 'Shanti Hospital', rating: 4.3, address: 'Near Bus Stand, Mirzapur, Uttar Pradesh 231001', description: 'Reputed hospital offering quality patient care and diagnostics.' },
        { name: 'Saraswati Nursing Home', rating: 4.2, address: 'Civil Lines, Mirzapur, Uttar Pradesh 231001', description: 'Local nursing home providing reliable healthcare services.' }
    ],
    touristSpots: [
        { name: 'Vindhyachal Temple', rating: 4.9, address: 'Mirzapur, Uttar Pradesh', description: 'Renowned temple dedicated to Goddess Vindhyavasini, attracting thousands of devotees.' },
        { name: 'Chunar Fort', rating: 4.8, address: 'Chunar, Mirzapur, Uttar Pradesh', description: 'Historic fort with panoramic views of the Ganges and surrounding landscapes.' },
        { name: 'Ganges Viewpoint', rating: 4.6, address: 'Mirzapur, Uttar Pradesh', description: 'Scenic spot along the river Ganges ideal for photography and relaxation.' },
        { name: 'Ashta Devi Temple', rating: 4.5, address: 'Mirzapur, Uttar Pradesh', description: 'Famous temple visited by devotees for blessings and festivals.' }
    ]
}, 
'santKabirNagar': { 
    schools: [
        { name: 'Kendriya Vidyalaya Sant Kabir Nagar', rating: 4.7, address: 'Ramkola Road, Sant Kabir Nagar, Uttar Pradesh 272175', description: 'CBSE-affiliated school providing quality education and co-curricular activities.' },
        { name: 'St. Xavier’s School', rating: 4.6, address: 'Tanda, Sant Kabir Nagar, Uttar Pradesh 272175', description: 'English medium school emphasizing academics and overall development.' },
        { name: 'Delhi Public School Sant Kabir Nagar', rating: 4.5, address: 'Near Bus Stand, Sant Kabir Nagar, Uttar Pradesh 272175', description: 'Modern CBSE school focusing on academics, sports, and extracurriculars.' },
        { name: 'Saraswati Vidya Mandir', rating: 4.4, address: 'Tanda, Sant Kabir Nagar, Uttar Pradesh 272175', description: 'Local school promoting traditional values alongside modern learning.' }
    ],
    restaurants: [
        { name: 'Zaika Restaurant', rating: 4.6, address: 'Tanda, Sant Kabir Nagar, Uttar Pradesh 272175', description: 'Famous for North Indian cuisine and family-friendly ambiance.' },
        { name: 'Spice Villa', rating: 4.5, address: 'Ramkola Road, Sant Kabir Nagar, Uttar Pradesh 272175', description: 'Popular restaurant serving Indian and Chinese dishes.' },
        { name: 'Royal Tandoor', rating: 4.4, address: 'Near Bus Stand, Sant Kabir Nagar, Uttar Pradesh 272175', description: 'Known for tandoori items and grilled delicacies.' },
        { name: 'Annapurna Bhojanalaya', rating: 4.3, address: 'Tanda, Sant Kabir Nagar, Uttar Pradesh 272175', description: 'Affordable vegetarian restaurant offering traditional Indian meals.' }
    ],
    hospitals: [
        { name: 'District Hospital Sant Kabir Nagar', rating: 4.5, address: 'Tanda, Sant Kabir Nagar, Uttar Pradesh 272175', description: 'Government hospital providing general and emergency care.' },
        { name: 'Life Care Hospital', rating: 4.4, address: 'Ramkola Road, Sant Kabir Nagar, Uttar Pradesh 272175', description: 'Private hospital offering multi-specialty healthcare services.' },
        { name: 'Shanti Hospital', rating: 4.3, address: 'Near Bus Stand, Sant Kabir Nagar, Uttar Pradesh 272175', description: 'Trusted hospital providing reliable medical care and diagnostics.' },
        { name: 'Saraswati Nursing Home', rating: 4.2, address: 'Tanda, Sant Kabir Nagar, Uttar Pradesh 272175', description: 'Local nursing home offering affordable healthcare services.' }
    ],
    touristSpots: [
        { name: 'Kabir Chaura Math', rating: 4.8, address: 'Maghar, Sant Kabir Nagar, Uttar Pradesh', description: 'Famous pilgrimage site where Sant Kabir spent his later years.' },
        { name: 'Ramrekha Mandir', rating: 4.6, address: 'Tanda, Sant Kabir Nagar, Uttar Pradesh', description: 'Ancient temple with spiritual significance for locals and tourists.' },
        { name: 'Siddhnath Ghat', rating: 4.5, address: 'Maghar, Sant Kabir Nagar, Uttar Pradesh', description: 'Peaceful riverside spot associated with religious and cultural events.' },
        { name: 'Bageshwar Nath Temple', rating: 4.4, address: 'Tanda, Sant Kabir Nagar, Uttar Pradesh', description: 'Popular temple known for its architecture and serene environment.' }
    ]
},









'patna': { 
    schools: [
        { name: 'St. Michael’s High School', rating: 4.8, address: 'Bankipur, Patna, Bihar 800001', description: 'Prestigious English-medium school known for academic excellence and discipline.' },
        { name: 'Don Bosco Academy', rating: 4.7, address: 'Patliputra Colony, Patna, Bihar 800013', description: 'CBSE-affiliated school emphasizing holistic education and extracurricular activities.' },
        { name: 'Delhi Public School Patna', rating: 4.6, address: 'R Block, Patna, Bihar 800001', description: 'Well-known CBSE school offering quality academics and sports programs.' },
        { name: 'St. Xavier’s High School', rating: 4.5, address: 'Mithapur, Patna, Bihar 800001', description: 'Renowned school with a focus on values-based education and student development.' }
    ],
    restaurants: [
        { name: 'Biryani Mahal', rating: 4.7, address: 'Boring Road, Patna, Bihar 800001', description: 'Famous for its Hyderabadi and Lucknowi biryanis.' },
        { name: 'The Yellow Chilli', rating: 4.6, address: 'Patliputra Colony, Patna, Bihar 800013', description: 'Fine dining restaurant offering modern Indian cuisine.' },
        { name: 'Pind Balluchi', rating: 4.5, address: 'Boring Road, Patna, Bihar 800001', description: 'Well-known for North Indian dishes and traditional flavors.' },
        { name: 'Bihar Bhawan Restaurant', rating: 4.4, address: 'Frazer Road, Patna, Bihar 800001', description: 'Traditional Bihari and Indian cuisine served in a homely environment.' }
    ],
    hospitals: [
        { name: 'AIIMS Patna', rating: 4.9, address: 'Phulwari Sharif, Patna, Bihar 801507', description: 'Premier government hospital providing advanced medical care and research facilities.' },
        { name: 'Paras HMRI Hospital', rating: 4.8, address: 'Boring Road, Patna, Bihar 800001', description: 'Multi-specialty private hospital known for quality healthcare.' },
        { name: 'Fortis Hospital Patna', rating: 4.7, address: 'Patliputra Colony, Patna, Bihar 800013', description: 'Renowned hospital offering modern treatments and diagnostics.' },
        { name: 'Indira Gandhi Institute of Medical Sciences', rating: 4.6, address: 'Kankarbagh, Patna, Bihar 800020', description: 'Large government hospital providing advanced medical services.' }
    ],
    touristSpots: [
        { name: 'Golghar', rating: 4.8, address: 'Patna, Bihar', description: 'Historic granary built in 1786 offering panoramic city views.' },
        { name: 'Patna Sahib Gurudwara', rating: 4.9, address: 'Patna, Bihar', description: 'Famous Sikh pilgrimage site and birthplace of Guru Gobind Singh.' },
        { name: 'Patna Museum', rating: 4.7, address: 'Daroga Prasad Rai Path, Patna, Bihar 800001', description: 'Museum showcasing Bihar’s rich history and cultural heritage.' },
        { name: 'Sanjay Gandhi Biological Park', rating: 4.6, address: 'Patna, Bihar', description: 'Popular zoo and botanical garden, ideal for family visits and nature enthusiasts.' }
    ]
},
'bhagalpur': { 
    schools: [
        { name: 'Mount Carmel School', rating: 4.8, address: 'Bhagalpur, Bihar 812001', description: 'Prestigious English-medium school with strong academics and co-curricular programs.' },
        { name: 'Delhi Public School Bhagalpur', rating: 4.7, address: 'Bhagalpur, Bihar 812001', description: 'CBSE-affiliated school focusing on holistic education and modern facilities.' },
        { name: 'S.M. Arya Public School', rating: 4.6, address: 'Bhagalpur, Bihar 812001', description: 'Well-known for academic excellence and value-based learning.' },
        { name: 'St. Joseph’s Convent School', rating: 4.5, address: 'Bhagalpur, Bihar 812001', description: 'English-medium school emphasizing discipline and student development.' }
    ],
    restaurants: [
        { name: 'The Royal Rasoi', rating: 4.7, address: 'Bhagalpur, Bihar 812001', description: 'Popular for North Indian and Bihari cuisine with a family-friendly ambiance.' },
        { name: 'Biryani House', rating: 4.6, address: 'Bhagalpur, Bihar 812001', description: 'Famous for flavorful biryanis and traditional dishes.' },
        { name: 'Spice Lounge', rating: 4.5, address: 'Bhagalpur, Bihar 812001', description: 'Serves Indian and Chinese cuisines in a modern setting.' },
        { name: 'Annapurna Bhojanalaya', rating: 4.4, address: 'Bhagalpur, Bihar 812001', description: 'Affordable vegetarian restaurant serving traditional meals.' }
    ],
    hospitals: [
        { name: 'Sadar Hospital Bhagalpur', rating: 4.5, address: 'Bhagalpur, Bihar 812001', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'Narayana Multispeciality Hospital', rating: 4.6, address: 'Bhagalpur, Bihar 812001', description: 'Private hospital known for advanced treatment and modern facilities.' },
        { name: 'Apollo Clinic Bhagalpur', rating: 4.4, address: 'Bhagalpur, Bihar 812001', description: 'Reputed clinic offering outpatient care and diagnostics.' },
        { name: 'City Hospital Bhagalpur', rating: 4.3, address: 'Bhagalpur, Bihar 812001', description: 'Local hospital providing reliable healthcare services.' }
    ],
    touristSpots: [
        { name: 'Vikramshila Ruins', rating: 4.8, address: 'Bhagalpur, Bihar', description: 'Ancient university ruins from the 8th century, significant in Buddhist history.' },
        { name: 'Sangam (Ganga and Kosi Rivers)', rating: 4.7, address: 'Bhagalpur, Bihar', description: 'Scenic confluence of rivers, popular for photography and spiritual visits.' },
        { name: 'Kuppaghat', rating: 4.6, address: 'Bhagalpur, Bihar', description: 'Riverside ghat famous for rituals and peaceful views.' },
        { name: 'Colganj Rock Cut Temples', rating: 4.5, address: 'Bhagalpur, Bihar', description: 'Historic rock-cut temples dating back centuries, showcasing ancient architecture.' }
    ]
},
'muzaffarpur': { 
    schools: [
        { name: 'St. Joseph’s School', rating: 4.8, address: 'Kanti Road, Muzaffarpur, Bihar 842001', description: 'Prestigious English-medium school focusing on academics and overall development.' },
        { name: 'Delhi Public School Muzaffarpur', rating: 4.7, address: 'Muzaffarpur, Bihar 842001', description: 'CBSE-affiliated school offering modern facilities and extracurricular programs.' },
        { name: 'Mount Carmel School', rating: 4.6, address: 'Katra, Muzaffarpur, Bihar 842001', description: 'Renowned for strong academics and value-based education.' },
        { name: 'Bal Bharti School', rating: 4.5, address: 'Muzaffarpur, Bihar 842001', description: 'Well-known local school emphasizing both education and cultural activities.' }
    ],
    restaurants: [
        { name: 'Biryani Mahal', rating: 4.7, address: 'Katra, Muzaffarpur, Bihar 842001', description: 'Famous for biryanis and North Indian cuisine.' },
        { name: 'Spice Villa', rating: 4.6, address: 'Muzaffarpur, Bihar 842001', description: 'Offers Indian and Chinese dishes in a modern setting.' },
        { name: 'The Yellow Chilli', rating: 4.5, address: 'Muzaffarpur, Bihar 842001', description: 'Fine dining with Indian and continental cuisine.' },
        { name: 'Annapurna Bhojanalaya', rating: 4.4, address: 'Muzaffarpur, Bihar 842001', description: 'Affordable vegetarian restaurant serving traditional meals.' }
    ],
    hospitals: [
        { name: 'Muzaffarpur Medical College Hospital', rating: 4.7, address: 'Muzaffarpur, Bihar 842001', description: 'Government hospital providing advanced medical care and emergency services.' },
        { name: 'Life Care Hospital', rating: 4.6, address: 'Muzaffarpur, Bihar 842001', description: 'Private multi-specialty hospital with modern facilities.' },
        { name: 'Apollo Clinic Muzaffarpur', rating: 4.5, address: 'Muzaffarpur, Bihar 842001', description: 'Reputed clinic offering outpatient services and diagnostics.' },
        { name: 'City Hospital', rating: 4.4, address: 'Muzaffarpur, Bihar 842001', description: 'Local hospital providing reliable healthcare services.' }
    ],
    touristSpots: [
        { name: 'Vikramshila Ruins', rating: 4.8, address: 'Kahalgaon, near Muzaffarpur, Bihar', description: 'Historic site of ancient Buddhist university and archaeological significance.' },
        { name: 'Garib Sthan Mandir', rating: 4.7, address: 'Muzaffarpur, Bihar', description: 'Popular Hindu temple attracting devotees from the region.' },
        { name: 'Lachchu Babu Park', rating: 4.6, address: 'Muzaffarpur, Bihar', description: 'Urban park ideal for family outings and leisure walks.' },
        { name: 'Ramchaura Mandir', rating: 4.5, address: 'Muzaffarpur, Bihar', description: 'Famous temple with religious and cultural significance.' }
    ]
},
'purnia': { 
    schools: [
        { name: 'Kendriya Vidyalaya Purnia', rating: 4.7, address: 'Station Road, Purnia, Bihar 854301', description: 'CBSE-affiliated school providing quality education and extracurricular activities.' },
        { name: 'St. Xavier’s School Purnia', rating: 4.6, address: 'Civil Lines, Purnia, Bihar 854301', description: 'English medium school known for academics and holistic development.' },
        { name: 'Delhi Public School Purnia', rating: 4.5, address: 'Purnia, Bihar 854301', description: 'CBSE school emphasizing academics, sports, and co-curricular activities.' },
        { name: 'Saraswati Vidya Mandir', rating: 4.4, address: 'Purnia, Bihar 854301', description: 'Local school promoting traditional and modern learning.' }
    ],
    restaurants: [
        { name: 'Zaika Restaurant', rating: 4.6, address: 'Station Road, Purnia, Bihar 854301', description: 'Famous for North Indian cuisine and friendly atmosphere.' },
        { name: 'Spice Villa', rating: 4.5, address: 'Purnia, Bihar 854301', description: 'Offers Indian and Chinese dishes in a comfortable setting.' },
        { name: 'Royal Tandoor', rating: 4.4, address: 'Civil Lines, Purnia, Bihar 854301', description: 'Known for tandoori and Mughlai dishes.' },
        { name: 'Annapurna Bhojanalaya', rating: 4.3, address: 'Purnia, Bihar 854301', description: 'Affordable vegetarian restaurant serving traditional meals.' }
    ],
    hospitals: [
        { name: 'Sadar Hospital Purnia', rating: 4.5, address: 'Purnia, Bihar 854301', description: 'Government hospital providing general and emergency care.' },
        { name: 'Life Care Hospital', rating: 4.4, address: 'Purnia, Bihar 854301', description: 'Private multi-specialty hospital with modern facilities.' },
        { name: 'City Hospital Purnia', rating: 4.3, address: 'Purnia, Bihar 854301', description: 'Local hospital offering reliable healthcare services.' },
        { name: 'Anugrah Hospital', rating: 4.2, address: 'Purnia, Bihar 854301', description: 'Trusted hospital for general and critical care.' }
    ],
    touristSpots: [
        { name: 'Kali Mandir', rating: 4.8, address: 'Purnia, Bihar', description: 'Popular Hindu temple attracting devotees from the region.' },
        { name: 'Kali Mandir Park', rating: 4.7, address: 'Purnia, Bihar', description: 'Peaceful park surrounding the temple, ideal for relaxation.' },
        { name: 'Sakri River View', rating: 4.6, address: 'Purnia, Bihar', description: 'Scenic riverside spot ideal for photography and nature walks.' },
        { name: 'Kali Ghat', rating: 4.5, address: 'Purnia, Bihar', description: 'Historic religious site visited by locals and tourists.' }
    ]
},
'darbhanga': { 
    schools: [
        { name: 'Don Bosco School Darbhanga', rating: 4.8, address: 'Darbhanga, Bihar 846003', description: 'Prestigious English-medium school with strong academics and co-curricular programs.' },
        { name: 'St. Mary’s Academy', rating: 4.7, address: 'Darbhanga, Bihar 846003', description: 'Well-known school emphasizing discipline and holistic development.' },
        { name: 'Delhi Public School Darbhanga', rating: 4.6, address: 'Darbhanga, Bihar 846003', description: 'CBSE-affiliated school focusing on academics, sports, and extracurricular activities.' },
        { name: 'Mount Carmel School', rating: 4.5, address: 'Darbhanga, Bihar 846003', description: 'Renowned school known for academic excellence and student growth.' }
    ],
    restaurants: [
        { name: 'Biryani Mahal', rating: 4.7, address: 'Darbhanga, Bihar 846003', description: 'Famous for flavorful biryanis and North Indian dishes.' },
        { name: 'The Yellow Chilli', rating: 4.6, address: 'Darbhanga, Bihar 846003', description: 'Fine dining restaurant offering Indian and continental cuisine.' },
        { name: 'Spice Lounge', rating: 4.5, address: 'Darbhanga, Bihar 846003', description: 'Modern restaurant serving Indian and Chinese cuisines.' },
        { name: 'Annapurna Bhojanalaya', rating: 4.4, address: 'Darbhanga, Bihar 846003', description: 'Affordable vegetarian restaurant serving traditional meals.' }
    ],
    hospitals: [
        { name: 'Lalit Narayan Mithila University Hospital', rating: 4.5, address: 'Darbhanga, Bihar 846004', description: 'Government hospital providing general and emergency healthcare.' },
        { name: 'Life Care Hospital', rating: 4.4, address: 'Darbhanga, Bihar 846003', description: 'Private multi-specialty hospital offering modern treatments.' },
        { name: 'City Hospital Darbhanga', rating: 4.3, address: 'Darbhanga, Bihar 846003', description: 'Local hospital providing reliable healthcare services.' },
        { name: 'Apollo Clinic Darbhanga', rating: 4.2, address: 'Darbhanga, Bihar 846003', description: 'Reputed clinic for outpatient care and diagnostics.' }
    ],
    touristSpots: [
        { name: 'Darbhanga Fort', rating: 4.8, address: 'Darbhanga, Bihar', description: 'Historic fort showcasing architectural heritage of the region.' },
        { name: 'Shyama Mai Temple', rating: 4.7, address: 'Darbhanga, Bihar', description: 'Popular Hindu temple attracting devotees and tourists.' },
        { name: 'Ahilya Sthan', rating: 4.6, address: 'Darbhanga, Bihar', description: 'Religious site with historical and spiritual significance.' },
        { name: 'Kankali Mandir', rating: 4.5, address: 'Darbhanga, Bihar', description: 'Famous temple known for festivals and rituals.' }
    ]
},
'arrah': { 
    schools: [
        { name: 'St. Xavier’s School Arrah', rating: 4.8, address: 'Arrah, Bihar 802301', description: 'Prestigious English-medium school focusing on academics and overall development.' },
        { name: 'Delhi Public School Arrah', rating: 4.7, address: 'Arrah, Bihar 802301', description: 'CBSE-affiliated school offering holistic education and extracurricular activities.' },
        { name: 'Mount Carmel School', rating: 4.6, address: 'Arrah, Bihar 802301', description: 'Well-known school emphasizing academics, discipline, and co-curricular activities.' },
        { name: 'Kendriya Vidyalaya Arrah', rating: 4.5, address: 'Arrah, Bihar 802301', description: 'Government school providing quality education with modern facilities.' }
    ],
    restaurants: [
        { name: 'Zaika Restaurant', rating: 4.6, address: 'Arrah, Bihar 802301', description: 'Popular for North Indian cuisine and family-friendly ambiance.' },
        { name: 'Spice Villa', rating: 4.5, address: 'Arrah, Bihar 802301', description: 'Indian and Chinese dishes served in a comfortable setting.' },
        { name: 'Biryani House', rating: 4.4, address: 'Arrah, Bihar 802301', description: 'Known for flavorful biryanis and traditional dishes.' },
        { name: 'Annapurna Bhojanalaya', rating: 4.3, address: 'Arrah, Bihar 802301', description: 'Affordable vegetarian restaurant serving traditional meals.' }
    ],
    hospitals: [
        { name: 'Sadar Hospital Arrah', rating: 4.5, address: 'Arrah, Bihar 802301', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'Life Care Hospital', rating: 4.4, address: 'Arrah, Bihar 802301', description: 'Private multi-specialty hospital offering modern treatments.' },
        { name: 'City Hospital Arrah', rating: 4.3, address: 'Arrah, Bihar 802301', description: 'Local hospital providing reliable healthcare services.' },
        { name: 'Apollo Clinic Arrah', rating: 4.2, address: 'Arrah, Bihar 802301', description: 'Reputed clinic for outpatient care and diagnostics.' }
    ],
    touristSpots: [
        { name: 'Veer Kunwar Singh Memorial', rating: 4.8, address: 'Arrah, Bihar', description: 'Historic memorial dedicated to freedom fighter Veer Kunwar Singh.' },
        { name: 'Arrah Fort', rating: 4.7, address: 'Arrah, Bihar', description: 'Ancient fort showcasing the city’s historical significance.' },
        { name: 'Sita Kund', rating: 4.6, address: 'Arrah, Bihar', description: 'Religious site associated with local legends and rituals.' },
        { name: 'Baba Garibnath Temple', rating: 4.5, address: 'Arrah, Bihar', description: 'Popular temple attracting devotees from the region.' }
    ]
},
'begusarai': { 
    schools: [
        { name: 'St. Joseph’s School Begusarai', rating: 4.8, address: 'Begusarai, Bihar 851117', description: 'Prestigious English-medium school focusing on academics and overall development.' },
        { name: 'Delhi Public School Begusarai', rating: 4.7, address: 'Begusarai, Bihar 851117', description: 'CBSE-affiliated school offering holistic education and extracurricular activities.' },
        { name: 'Mount Carmel School', rating: 4.6, address: 'Begusarai, Bihar 851117', description: 'Well-known school emphasizing academics, discipline, and co-curricular activities.' },
        { name: 'Kendriya Vidyalaya Begusarai', rating: 4.5, address: 'Begusarai, Bihar 851117', description: 'Government school providing quality education with modern facilities.' }
    ],
    restaurants: [
        { name: 'Zaika Restaurant', rating: 4.6, address: 'Begusarai, Bihar 851117', description: 'Popular for North Indian cuisine and family-friendly ambiance.' },
        { name: 'Spice Villa', rating: 4.5, address: 'Begusarai, Bihar 851117', description: 'Indian and Chinese dishes served in a comfortable setting.' },
        { name: 'Biryani House', rating: 4.4, address: 'Begusarai, Bihar 851117', description: 'Known for flavorful biryanis and traditional dishes.' },
        { name: 'Annapurna Bhojanalaya', rating: 4.3, address: 'Begusarai, Bihar 851117', description: 'Affordable vegetarian restaurant serving traditional meals.' }
    ],
    hospitals: [
        { name: 'Sadar Hospital Begusarai', rating: 4.5, address: 'Begusarai, Bihar 851117', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'Life Care Hospital', rating: 4.4, address: 'Begusarai, Bihar 851117', description: 'Private multi-specialty hospital offering modern treatments.' },
        { name: 'City Hospital Begusarai', rating: 4.3, address: 'Begusarai, Bihar 851117', description: 'Local hospital providing reliable healthcare services.' },
        { name: 'Apollo Clinic Begusarai', rating: 4.2, address: 'Begusarai, Bihar 851117', description: 'Reputed clinic for outpatient care and diagnostics.' }
    ],
    touristSpots: [
        { name: 'Kastaharni Ghat', rating: 4.8, address: 'Begusarai, Bihar', description: 'Famous ghat on the Ganges River, popular for rituals and ceremonies.' },
        { name: 'Guru Dakshina Temple', rating: 4.7, address: 'Begusarai, Bihar', description: 'Historic temple attracting local devotees.' },
        { name: 'Begusarai Fort', rating: 4.6, address: 'Begusarai, Bihar', description: 'Old fort showcasing architectural heritage and history.' },
        { name: 'Khalifah Ghat', rating: 4.5, address: 'Begusarai, Bihar', description: 'Popular riverside spot for leisure and photography.' }
    ]
},
'katihar': { 
    schools: [
        { name: 'Delhi Public School Katihar', rating: 4.7, address: 'Katihar, Bihar 854105', description: 'CBSE-affiliated school focusing on academics, sports, and extracurricular activities.' },
        { name: 'St. Joseph’s School Katihar', rating: 4.6, address: 'Katihar, Bihar 854105', description: 'Prestigious English-medium school known for academic excellence and discipline.' },
        { name: 'Mount Carmel School', rating: 4.5, address: 'Katihar, Bihar 854105', description: 'Well-known school emphasizing holistic education and student development.' },
        { name: 'Kendriya Vidyalaya Katihar', rating: 4.4, address: 'Katihar, Bihar 854105', description: 'Government school providing quality education with modern facilities.' }
    ],
    restaurants: [
        { name: 'Zaika Restaurant', rating: 4.6, address: 'Katihar, Bihar 854105', description: 'Popular for North Indian cuisine and friendly ambiance.' },
        { name: 'Biryani House', rating: 4.5, address: 'Katihar, Bihar 854105', description: 'Known for flavorful biryanis and traditional dishes.' },
        { name: 'Spice Villa', rating: 4.4, address: 'Katihar, Bihar 854105', description: 'Indian and Chinese dishes served in a comfortable setting.' },
        { name: 'Annapurna Bhojanalaya', rating: 4.3, address: 'Katihar, Bihar 854105', description: 'Affordable vegetarian restaurant serving traditional meals.' }
    ],
    hospitals: [
        { name: 'Sadar Hospital Katihar', rating: 4.5, address: 'Katihar, Bihar 854105', description: 'Government hospital providing general and emergency care.' },
        { name: 'Life Care Hospital', rating: 4.4, address: 'Katihar, Bihar 854105', description: 'Private multi-specialty hospital with modern facilities.' },
        { name: 'City Hospital Katihar', rating: 4.3, address: 'Katihar, Bihar 854105', description: 'Local hospital offering reliable healthcare services.' },
        { name: 'Apollo Clinic Katihar', rating: 4.2, address: 'Katihar, Bihar 854105', description: 'Reputed clinic for outpatient care and diagnostics.' }
    ],
    touristSpots: [
        { name: 'Kali Mandir Katihar', rating: 4.8, address: 'Katihar, Bihar', description: 'Famous Hindu temple attracting devotees from the region.' },
        { name: 'Sati Mai Temple', rating: 4.7, address: 'Katihar, Bihar', description: 'Historic temple with religious significance.' },
        { name: 'Ghanta Ghar', rating: 4.6, address: 'Katihar, Bihar', description: 'Iconic clock tower and local landmark of the city.' },
        { name: 'River Ganga Viewpoint', rating: 4.5, address: 'Katihar, Bihar', description: 'Scenic spot along the river for leisure and photography.' }
    ]
},
'munger': { 
    schools: [
        { name: 'St. Joseph’s School Munger', rating: 4.8, address: 'Munger, Bihar 811201', description: 'Prestigious English-medium school known for academics and holistic development.' },
        { name: 'Delhi Public School Munger', rating: 4.7, address: 'Munger, Bihar 811201', description: 'CBSE-affiliated school providing quality education and extracurricular activities.' },
        { name: 'Mount Carmel School', rating: 4.6, address: 'Munger, Bihar 811201', description: 'Renowned for strong academics and value-based education.' },
        { name: 'Kendriya Vidyalaya Munger', rating: 4.5, address: 'Munger, Bihar 811201', description: 'Government school offering modern facilities and disciplined education.' }
    ],
    restaurants: [
        { name: 'Biryani Mahal', rating: 4.7, address: 'Munger, Bihar 811201', description: 'Famous for flavorful biryanis and North Indian cuisine.' },
        { name: 'Zaika Restaurant', rating: 4.6, address: 'Munger, Bihar 811201', description: 'Popular for Indian dishes and family-friendly ambiance.' },
        { name: 'Spice Lounge', rating: 4.5, address: 'Munger, Bihar 811201', description: 'Modern restaurant serving Indian and Chinese cuisine.' },
        { name: 'Annapurna Bhojanalaya', rating: 4.4, address: 'Munger, Bihar 811201', description: 'Affordable vegetarian restaurant offering traditional meals.' }
    ],
    hospitals: [
        { name: 'Sadar Hospital Munger', rating: 4.5, address: 'Munger, Bihar 811201', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'Life Care Hospital', rating: 4.4, address: 'Munger, Bihar 811201', description: 'Private multi-specialty hospital with modern treatment facilities.' },
        { name: 'City Hospital Munger', rating: 4.3, address: 'Munger, Bihar 811201', description: 'Local hospital offering reliable healthcare services.' },
        { name: 'Apollo Clinic Munger', rating: 4.2, address: 'Munger, Bihar 811201', description: 'Reputed clinic for outpatient care and diagnostics.' }
    ],
    touristSpots: [
        { name: 'Munger Fort', rating: 4.8, address: 'Munger, Bihar', description: 'Historic fort offering insight into Munger’s rich history and architecture.' },
        { name: 'Baba Dhaba Mandir', rating: 4.7, address: 'Munger, Bihar', description: 'Popular temple attracting local devotees and tourists.' },
        { name: 'Ganga Viewpoint', rating: 4.6, address: 'Munger, Bihar', description: 'Scenic riverside spot ideal for relaxation and photography.' },
        { name: 'Munger Railway Heritage Site', rating: 4.5, address: 'Munger, Bihar', description: 'Historic railway site showcasing colonial-era infrastructure.' }
    ]
},
'chhapra': { 
    schools: [
        { name: 'St. Michael’s High School Chhapra', rating: 4.8, address: 'Chhapra, Bihar 841301', description: 'Prestigious English-medium school focusing on academics and overall development.' },
        { name: 'Delhi Public School Chhapra', rating: 4.7, address: 'Chhapra, Bihar 841301', description: 'CBSE-affiliated school offering quality education and extracurricular programs.' },
        { name: 'Mount Carmel School', rating: 4.6, address: 'Chhapra, Bihar 841301', description: 'Well-known school emphasizing academics and co-curricular activities.' },
        { name: 'Kendriya Vidyalaya Chhapra', rating: 4.5, address: 'Chhapra, Bihar 841301', description: 'Government school providing disciplined education with modern facilities.' }
    ],
    restaurants: [
        { name: 'Zaika Restaurant', rating: 4.6, address: 'Chhapra, Bihar 841301', description: 'Popular for North Indian cuisine and family-friendly ambiance.' },
        { name: 'Spice Villa', rating: 4.5, address: 'Chhapra, Bihar 841301', description: 'Indian and Chinese dishes served in a comfortable setting.' },
        { name: 'Biryani House', rating: 4.4, address: 'Chhapra, Bihar 841301', description: 'Known for flavorful biryanis and traditional dishes.' },
        { name: 'Annapurna Bhojanalaya', rating: 4.3, address: 'Chhapra, Bihar 841301', description: 'Affordable vegetarian restaurant serving traditional meals.' }
    ],
    hospitals: [
        { name: 'Sadar Hospital Chhapra', rating: 4.5, address: 'Chhapra, Bihar 841301', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'Life Care Hospital', rating: 4.4, address: 'Chhapra, Bihar 841301', description: 'Private multi-specialty hospital offering modern treatments.' },
        { name: 'City Hospital Chhapra', rating: 4.3, address: 'Chhapra, Bihar 841301', description: 'Local hospital providing reliable healthcare services.' },
        { name: 'Apollo Clinic Chhapra', rating: 4.2, address: 'Chhapra, Bihar 841301', description: 'Reputed clinic for outpatient care and diagnostics.' }
    ],
    touristSpots: [
        { name: 'Ghanta Ghar Chhapra', rating: 4.8, address: 'Chhapra, Bihar', description: 'Historic clock tower and local landmark of the city.' },
        { name: 'Sita Kund', rating: 4.7, address: 'Chhapra, Bihar', description: 'Religious site associated with Hindu legends and rituals.' },
        { name: 'Gandhi Ghat', rating: 4.6, address: 'Chhapra, Bihar', description: 'Riverside ghat popular for ceremonies and relaxation.' },
        { name: 'Sone River Viewpoint', rating: 4.5, address: 'Chhapra, Bihar', description: 'Scenic riverside spot ideal for leisure and photography.' }
    ]
},
'biharSharif': { 
    schools: [
        { name: 'St. Joseph’s School Bihar Sharif', rating: 4.8, address: 'Bihar Sharif, Nalanda, Bihar 803101', description: 'Prestigious English-medium school focusing on academics and overall development.' },
        { name: 'Delhi Public School Bihar Sharif', rating: 4.7, address: 'Bihar Sharif, Nalanda, Bihar 803101', description: 'CBSE-affiliated school offering holistic education and extracurricular activities.' },
        { name: 'Mount Carmel School', rating: 4.6, address: 'Bihar Sharif, Nalanda, Bihar 803101', description: 'Well-known school emphasizing academics, discipline, and co-curricular activities.' },
        { name: 'Kendriya Vidyalaya Bihar Sharif', rating: 4.5, address: 'Bihar Sharif, Nalanda, Bihar 803101', description: 'Government school providing quality education with modern facilities.' }
    ],
    restaurants: [
        { name: 'Zaika Restaurant', rating: 4.6, address: 'Bihar Sharif, Nalanda, Bihar 803101', description: 'Popular for North Indian cuisine and family-friendly ambiance.' },
        { name: 'Spice Villa', rating: 4.5, address: 'Bihar Sharif, Nalanda, Bihar 803101', description: 'Indian and Chinese dishes served in a comfortable setting.' },
        { name: 'Biryani House', rating: 4.4, address: 'Bihar Sharif, Nalanda, Bihar 803101', description: 'Known for flavorful biryanis and traditional dishes.' },
        { name: 'Annapurna Bhojanalaya', rating: 4.3, address: 'Bihar Sharif, Nalanda, Bihar 803101', description: 'Affordable vegetarian restaurant serving traditional meals.' }
    ],
    hospitals: [
        { name: 'Sadar Hospital Bihar Sharif', rating: 4.5, address: 'Bihar Sharif, Nalanda, Bihar 803101', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'Life Care Hospital', rating: 4.4, address: 'Bihar Sharif, Nalanda, Bihar 803101', description: 'Private multi-specialty hospital offering modern treatments.' },
        { name: 'City Hospital Bihar Sharif', rating: 4.3, address: 'Bihar Sharif, Nalanda, Bihar 803101', description: 'Local hospital providing reliable healthcare services.' },
        { name: 'Apollo Clinic Bihar Sharif', rating: 4.2, address: 'Bihar Sharif, Nalanda, Bihar 803101', description: 'Reputed clinic for outpatient care and diagnostics.' }
    ],
    touristSpots: [
        { name: 'Nalanda University Ruins', rating: 4.9, address: 'Nalanda, Bihar 803111', description: 'Ancient Buddhist university ruins, UNESCO World Heritage Site.' },
        { name: 'Bihar Sharif Sharif Dargah', rating: 4.7, address: 'Bihar Sharif, Nalanda, Bihar', description: 'Historic dargah attracting devotees and tourists.' },
        { name: 'Raja Nalanda Palace', rating: 4.6, address: 'Bihar Sharif, Nalanda, Bihar', description: 'Ancient palace with historical significance in the region.' },
        { name: 'Vikramshila Museum', rating: 4.5, address: 'Nalanda, Bihar', description: 'Museum showcasing artifacts and history of Nalanda and nearby areas.' }
    ]
},
'sitamarhi': { 
    schools: [
        { name: 'St. Xavier’s School Sitamarhi', rating: 4.8, address: 'Sitamarhi, Bihar 843302', description: 'Prestigious English-medium school focusing on academics and holistic development.' },
        { name: 'Delhi Public School Sitamarhi', rating: 4.7, address: 'Sitamarhi, Bihar 843302', description: 'CBSE-affiliated school offering quality education and extracurricular programs.' },
        { name: 'Mount Carmel School', rating: 4.6, address: 'Sitamarhi, Bihar 843302', description: 'Well-known school emphasizing academics, discipline, and co-curricular activities.' },
        { name: 'Kendriya Vidyalaya Sitamarhi', rating: 4.5, address: 'Sitamarhi, Bihar 843302', description: 'Government school providing modern facilities and quality education.' }
    ],
    restaurants: [
        { name: 'Zaika Restaurant', rating: 4.6, address: 'Sitamarhi, Bihar 843302', description: 'Popular for North Indian cuisine and family-friendly ambiance.' },
        { name: 'Spice Villa', rating: 4.5, address: 'Sitamarhi, Bihar 843302', description: 'Serves Indian and Chinese dishes in a comfortable setting.' },
        { name: 'Biryani House', rating: 4.4, address: 'Sitamarhi, Bihar 843302', description: 'Known for flavorful biryanis and traditional dishes.' },
        { name: 'Annapurna Bhojanalaya', rating: 4.3, address: 'Sitamarhi, Bihar 843302', description: 'Affordable vegetarian restaurant serving traditional meals.' }
    ],
    hospitals: [
        { name: 'Sadar Hospital Sitamarhi', rating: 4.5, address: 'Sitamarhi, Bihar 843302', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'Life Care Hospital', rating: 4.4, address: 'Sitamarhi, Bihar 843302', description: 'Private multi-specialty hospital offering modern treatments.' },
        { name: 'City Hospital Sitamarhi', rating: 4.3, address: 'Sitamarhi, Bihar 843302', description: 'Local hospital providing reliable healthcare services.' },
        { name: 'Apollo Clinic Sitamarhi', rating: 4.2, address: 'Sitamarhi, Bihar 843302', description: 'Reputed clinic for outpatient care and diagnostics.' }
    ],
    touristSpots: [
        { name: 'Sita Kund', rating: 4.8, address: 'Sitamarhi, Bihar', description: 'Religious site associated with Goddess Sita, attracting devotees and tourists.' },
        { name: 'Haleshwar Sthan', rating: 4.7, address: 'Sitamarhi, Bihar', description: 'Ancient Shiva temple with cultural and historical significance.' },
        { name: 'Sitamarhi Fort', rating: 4.6, address: 'Sitamarhi, Bihar', description: 'Historic fort representing regional heritage and architecture.' },
        { name: 'Ram Chhaya Mandir', rating: 4.5, address: 'Sitamarhi, Bihar', description: 'Famous temple visited by locals and pilgrims alike.' }
    ]
},
'gaya': { 
    schools: [
        { name: 'St. Michael’s School Gaya', rating: 4.8, address: 'Gaya, Bihar 823001', description: 'Prestigious English-medium school focusing on academics and holistic development.' },
        { name: 'Delhi Public School Gaya', rating: 4.7, address: 'Gaya, Bihar 823001', description: 'CBSE-affiliated school offering quality education and extracurricular programs.' },
        { name: 'Mount Carmel School', rating: 4.6, address: 'Gaya, Bihar 823001', description: 'Well-known school emphasizing academics, discipline, and co-curricular activities.' },
        { name: 'Kendriya Vidyalaya Gaya', rating: 4.5, address: 'Gaya, Bihar 823001', description: 'Government school providing modern facilities and quality education.' }
    ],
    restaurants: [
        { name: 'Zaika Restaurant', rating: 4.6, address: 'Gaya, Bihar 823001', description: 'Popular for North Indian cuisine and family-friendly ambiance.' },
        { name: 'Spice Villa', rating: 4.5, address: 'Gaya, Bihar 823001', description: 'Serves Indian and Chinese dishes in a comfortable setting.' },
        { name: 'Biryani House', rating: 4.4, address: 'Gaya, Bihar 823001', description: 'Known for flavorful biryanis and traditional dishes.' },
        { name: 'Annapurna Bhojanalaya', rating: 4.3, address: 'Gaya, Bihar 823001', description: 'Affordable vegetarian restaurant serving traditional meals.' }
    ],
    hospitals: [
        { name: 'Sadar Hospital Gaya', rating: 4.5, address: 'Gaya, Bihar 823001', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'Life Care Hospital', rating: 4.4, address: 'Gaya, Bihar 823001', description: 'Private multi-specialty hospital offering modern treatments.' },
        { name: 'City Hospital Gaya', rating: 4.3, address: 'Gaya, Bihar 823001', description: 'Local hospital providing reliable healthcare services.' },
        { name: 'Apollo Clinic Gaya', rating: 4.2, address: 'Gaya, Bihar 823001', description: 'Reputed clinic for outpatient care and diagnostics.' }
    ],
    touristSpots: [
        { name: 'Bodh Gaya', rating: 4.9, address: 'Bodh Gaya, Bihar 824231', description: 'World-famous Buddhist pilgrimage site where Buddha attained enlightenment.' },
        { name: 'Mahabodhi Temple', rating: 4.8, address: 'Bodh Gaya, Bihar 824231', description: 'UNESCO World Heritage Site and major religious landmark.' },
        { name: 'Vishnupad Temple', rating: 4.7, address: 'Gaya, Bihar', description: 'Historic Hindu temple dedicated to Lord Vishnu.' },
        { name: 'Dungeshwari Cave Temples', rating: 4.6, address: 'Bodh Gaya, Bihar', description: 'Ancient caves with religious significance for Buddhist pilgrims.' }
    ]
},
'buxar': { 
    schools: [
        { name: 'St. Xavier’s School Buxar', rating: 4.8, address: 'Buxar, Bihar 802101', description: 'Prestigious English-medium school focusing on academics and holistic development.' },
        { name: 'Delhi Public School Buxar', rating: 4.7, address: 'Buxar, Bihar 802101', description: 'CBSE-affiliated school offering quality education and extracurricular programs.' },
        { name: 'Mount Carmel School', rating: 4.6, address: 'Buxar, Bihar 802101', description: 'Well-known school emphasizing academics, discipline, and co-curricular activities.' },
        { name: 'Kendriya Vidyalaya Buxar', rating: 4.5, address: 'Buxar, Bihar 802101', description: 'Government school providing modern facilities and quality education.' }
    ],
    restaurants: [
        { name: 'Zaika Restaurant', rating: 4.6, address: 'Buxar, Bihar 802101', description: 'Popular for North Indian cuisine and family-friendly ambiance.' },
        { name: 'Spice Villa', rating: 4.5, address: 'Buxar, Bihar 802101', description: 'Serves Indian and Chinese dishes in a comfortable setting.' },
        { name: 'Biryani House', rating: 4.4, address: 'Buxar, Bihar 802101', description: 'Known for flavorful biryanis and traditional dishes.' },
        { name: 'Annapurna Bhojanalaya', rating: 4.3, address: 'Buxar, Bihar 802101', description: 'Affordable vegetarian restaurant serving traditional meals.' }
    ],
    hospitals: [
        { name: 'Sadar Hospital Buxar', rating: 4.5, address: 'Buxar, Bihar 802101', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'Life Care Hospital', rating: 4.4, address: 'Buxar, Bihar 802101', description: 'Private multi-specialty hospital offering modern treatments.' },
        { name: 'City Hospital Buxar', rating: 4.3, address: 'Buxar, Bihar 802101', description: 'Local hospital providing reliable healthcare services.' },
        { name: 'Apollo Clinic Buxar', rating: 4.2, address: 'Buxar, Bihar 802101', description: 'Reputed clinic for outpatient care and diagnostics.' }
    ],
    touristSpots: [
        { name: 'Buxar Fort', rating: 4.8, address: 'Buxar, Bihar', description: 'Historic fort showcasing regional heritage and architecture.' },
        { name: 'Raghunathpur Temple', rating: 4.7, address: 'Buxar, Bihar', description: 'Ancient Hindu temple attracting devotees and tourists.' },
        { name: 'Harnath Temple', rating: 4.6, address: 'Buxar, Bihar', description: 'Famous religious site visited by locals and pilgrims.' },
        { name: 'Ganga Ghat Buxar', rating: 4.5, address: 'Buxar, Bihar', description: 'Scenic riverside spot ideal for relaxation and rituals.' }
    ]
},
'jehanabad': { 
    schools: [
        { name: 'St. Joseph’s School Jehanabad', rating: 4.8, address: 'Jehanabad, Bihar 804408', description: 'Prestigious English-medium school focusing on academics and holistic development.' },
        { name: 'Delhi Public School Jehanabad', rating: 4.7, address: 'Jehanabad, Bihar 804408', description: 'CBSE-affiliated school offering quality education and extracurricular programs.' },
        { name: 'Mount Carmel School', rating: 4.6, address: 'Jehanabad, Bihar 804408', description: 'Well-known school emphasizing academics, discipline, and co-curricular activities.' },
        { name: 'Kendriya Vidyalaya Jehanabad', rating: 4.5, address: 'Jehanabad, Bihar 804408', description: 'Government school providing modern facilities and quality education.' }
    ],
    restaurants: [
        { name: 'Zaika Restaurant', rating: 4.6, address: 'Jehanabad, Bihar 804408', description: 'Popular for North Indian cuisine and family-friendly ambiance.' },
        { name: 'Spice Villa', rating: 4.5, address: 'Jehanabad, Bihar 804408', description: 'Serves Indian and Chinese dishes in a comfortable setting.' },
        { name: 'Biryani House', rating: 4.4, address: 'Jehanabad, Bihar 804408', description: 'Known for flavorful biryanis and traditional dishes.' },
        { name: 'Annapurna Bhojanalaya', rating: 4.3, address: 'Jehanabad, Bihar 804408', description: 'Affordable vegetarian restaurant serving traditional meals.' }
    ],
    hospitals: [
        { name: 'Sadar Hospital Jehanabad', rating: 4.5, address: 'Jehanabad, Bihar 804408', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'Life Care Hospital', rating: 4.4, address: 'Jehanabad, Bihar 804408', description: 'Private multi-specialty hospital offering modern treatments.' },
        { name: 'City Hospital Jehanabad', rating: 4.3, address: 'Jehanabad, Bihar 804408', description: 'Local hospital providing reliable healthcare services.' },
        { name: 'Apollo Clinic Jehanabad', rating: 4.2, address: 'Jehanabad, Bihar 804408', description: 'Reputed clinic for outpatient care and diagnostics.' }
    ],
    touristSpots: [
        { name: 'Rajiv Gandhi Park', rating: 4.8, address: 'Jehanabad, Bihar', description: 'Popular public park ideal for relaxation and family outings.' },
        { name: 'Sita Kund', rating: 4.7, address: 'Jehanabad, Bihar', description: 'Religious site associated with local legends and rituals.' },
        { name: 'Shiv Mandir Jehanabad', rating: 4.6, address: 'Jehanabad, Bihar', description: 'Famous temple visited by devotees in the region.' },
        { name: 'Ganga Ghat Jehanabad', rating: 4.5, address: 'Jehanabad, Bihar', description: 'Riverside spot for religious rituals and leisure.' }
    ]
},
'muzaffarpur': { 
    schools: [
        { name: 'St. Xavier’s School Muzaffarpur', rating: 4.8, address: 'Muzaffarpur, Bihar 842001', description: 'Prestigious English-medium school focusing on academics and holistic development.' },
        { name: 'Delhi Public School Muzaffarpur', rating: 4.7, address: 'Muzaffarpur, Bihar 842001', description: 'CBSE-affiliated school offering quality education and extracurricular programs.' },
        { name: 'Mount Carmel School', rating: 4.6, address: 'Muzaffarpur, Bihar 842001', description: 'Well-known school emphasizing academics, discipline, and co-curricular activities.' },
        { name: 'Kendriya Vidyalaya Muzaffarpur', rating: 4.5, address: 'Muzaffarpur, Bihar 842001', description: 'Government school providing modern facilities and quality education.' }
    ],
    restaurants: [
        { name: 'Zaika Restaurant', rating: 4.6, address: 'Muzaffarpur, Bihar 842001', description: 'Popular for North Indian cuisine and family-friendly ambiance.' },
        { name: 'Spice Villa', rating: 4.5, address: 'Muzaffarpur, Bihar 842001', description: 'Serves Indian and Chinese dishes in a comfortable setting.' },
        { name: 'Biryani House', rating: 4.4, address: 'Muzaffarpur, Bihar 842001', description: 'Known for flavorful biryanis and traditional dishes.' },
        { name: 'Annapurna Bhojanalaya', rating: 4.3, address: 'Muzaffarpur, Bihar 842001', description: 'Affordable vegetarian restaurant serving traditional meals.' }
    ],
    hospitals: [
        { name: 'Sadar Hospital Muzaffarpur', rating: 4.5, address: 'Muzaffarpur, Bihar 842001', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'Life Care Hospital', rating: 4.4, address: 'Muzaffarpur, Bihar 842001', description: 'Private multi-specialty hospital offering modern treatments.' },
        { name: 'City Hospital Muzaffarpur', rating: 4.3, address: 'Muzaffarpur, Bihar 842001', description: 'Local hospital providing reliable healthcare services.' },
        { name: 'Apollo Clinic Muzaffarpur', rating: 4.2, address: 'Muzaffarpur, Bihar 842001', description: 'Reputed clinic for outpatient care and diagnostics.' }
    ],
    touristSpots: [
        { name: 'Vishnu Mandir', rating: 4.8, address: 'Muzaffarpur, Bihar', description: 'Historic Hindu temple attracting devotees from the region.' },
        { name: 'Ram Chhaya Mandir', rating: 4.7, address: 'Muzaffarpur, Bihar', description: 'Famous temple for religious and cultural activities.' },
        { name: 'Gabri Devi Temple', rating: 4.6, address: 'Muzaffarpur, Bihar', description: 'Popular site for local religious ceremonies.' },
        { name: 'Litchi Gardens', rating: 4.5, address: 'Muzaffarpur, Bihar', description: 'Famous for its litchi orchards and scenic views.' }
    ]
},
'madhubani': { 
    schools: [
        { name: 'St. Xavier’s School Madhubani', rating: 4.8, address: 'Madhubani, Bihar 847211', description: 'Prestigious English-medium school focusing on academics and holistic development.' },
        { name: 'Delhi Public School Madhubani', rating: 4.7, address: 'Madhubani, Bihar 847211', description: 'CBSE-affiliated school offering quality education and extracurricular programs.' },
        { name: 'Mount Carmel School', rating: 4.6, address: 'Madhubani, Bihar 847211', description: 'Well-known school emphasizing academics, discipline, and co-curricular activities.' },
        { name: 'Kendriya Vidyalaya Madhubani', rating: 4.5, address: 'Madhubani, Bihar 847211', description: 'Government school providing modern facilities and quality education.' }
    ],
    restaurants: [
        { name: 'Zaika Restaurant', rating: 4.6, address: 'Madhubani, Bihar 847211', description: 'Popular for North Indian cuisine and family-friendly ambiance.' },
        { name: 'Spice Villa', rating: 4.5, address: 'Madhubani, Bihar 847211', description: 'Serves Indian and Chinese dishes in a comfortable setting.' },
        { name: 'Biryani House', rating: 4.4, address: 'Madhubani, Bihar 847211', description: 'Known for flavorful biryanis and traditional dishes.' },
        { name: 'Annapurna Bhojanalaya', rating: 4.3, address: 'Madhubani, Bihar 847211', description: 'Affordable vegetarian restaurant serving traditional meals.' }
    ],
    hospitals: [
        { name: 'Sadar Hospital Madhubani', rating: 4.5, address: 'Madhubani, Bihar 847211', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'Life Care Hospital', rating: 4.4, address: 'Madhubani, Bihar 847211', description: 'Private multi-specialty hospital offering modern treatments.' },
        { name: 'City Hospital Madhubani', rating: 4.3, address: 'Madhubani, Bihar 847211', description: 'Local hospital providing reliable healthcare services.' },
        { name: 'Apollo Clinic Madhubani', rating: 4.2, address: 'Madhubani, Bihar 847211', description: 'Reputed clinic for outpatient care and diagnostics.' }
    ],
    touristSpots: [
        { name: 'Madhubani Art Village', rating: 4.8, address: 'Madhubani, Bihar', description: 'Famous for traditional Madhubani paintings and art exhibitions.' },
        { name: 'Kali Mandir', rating: 4.7, address: 'Madhubani, Bihar', description: 'Popular temple visited by locals and tourists for religious rituals.' },
        { name: 'Rajnagar Palace', rating: 4.6, address: 'Madhubani, Bihar', description: 'Historic palace showcasing architectural heritage of the region.' },
        { name: 'Sita Kund', rating: 4.5, address: 'Madhubani, Bihar', description: 'Religious site associated with local legends and rituals.' }
    ]
},
'darbhanga': { 
    schools: [
        { name: 'St. Michael’s High School Darbhanga', rating: 4.8, address: 'Darbhanga, Bihar 846004', description: 'Prestigious English-medium school focusing on academics and holistic development.' },
        { name: 'Delhi Public School Darbhanga', rating: 4.7, address: 'Darbhanga, Bihar 846004', description: 'CBSE-affiliated school offering quality education and extracurricular programs.' },
        { name: 'Mount Carmel School', rating: 4.6, address: 'Darbhanga, Bihar 846004', description: 'Well-known school emphasizing academics, discipline, and co-curricular activities.' },
        { name: 'Kendriya Vidyalaya Darbhanga', rating: 4.5, address: 'Darbhanga, Bihar 846004', description: 'Government school providing modern facilities and quality education.' }
    ],
    restaurants: [
        { name: 'Zaika Restaurant', rating: 4.6, address: 'Darbhanga, Bihar 846004', description: 'Popular for North Indian cuisine and family-friendly ambiance.' },
        { name: 'Spice Villa', rating: 4.5, address: 'Darbhanga, Bihar 846004', description: 'Serves Indian and Chinese dishes in a comfortable setting.' },
        { name: 'Biryani House', rating: 4.4, address: 'Darbhanga, Bihar 846004', description: 'Known for flavorful biryanis and traditional dishes.' },
        { name: 'Annapurna Bhojanalaya', rating: 4.3, address: 'Darbhanga, Bihar 846004', description: 'Affordable vegetarian restaurant serving traditional meals.' }
    ],
    hospitals: [
        { name: 'Sadar Hospital Darbhanga', rating: 4.5, address: 'Darbhanga, Bihar 846004', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'Life Care Hospital', rating: 4.4, address: 'Darbhanga, Bihar 846004', description: 'Private multi-specialty hospital offering modern treatments.' },
        { name: 'City Hospital Darbhanga', rating: 4.3, address: 'Darbhanga, Bihar 846004', description: 'Local hospital providing reliable healthcare services.' },
        { name: 'Apollo Clinic Darbhanga', rating: 4.2, address: 'Darbhanga, Bihar 846004', description: 'Reputed clinic for outpatient care and diagnostics.' }
    ],
    touristSpots: [
        { name: 'Darbhanga Fort', rating: 4.8, address: 'Darbhanga, Bihar', description: 'Historic fort representing the cultural heritage of Darbhanga.' },
        { name: 'Shyama Sthan', rating: 4.7, address: 'Darbhanga, Bihar', description: 'Famous temple visited by devotees for rituals and festivals.' },
        { name: 'Ahilya Asthan', rating: 4.6, address: 'Darbhanga, Bihar', description: 'Religious site of historical significance.' },
        { name: 'Nargona Palace', rating: 4.5, address: 'Darbhanga, Bihar', description: 'Palace showcasing the architectural style of the region.' }
    ]
},
'siwan': { 
    schools: [
        { name: 'St. Michael’s High School Siwan', rating: 4.8, address: 'Siwan, Bihar 841226', description: 'Prestigious English-medium school focusing on academics and holistic development.' },
        { name: 'Delhi Public School Siwan', rating: 4.7, address: 'Siwan, Bihar 841226', description: 'CBSE-affiliated school offering quality education and extracurricular programs.' },
        { name: 'Mount Carmel School', rating: 4.6, address: 'Siwan, Bihar 841226', description: 'Well-known school emphasizing academics, discipline, and co-curricular activities.' },
        { name: 'Kendriya Vidyalaya Siwan', rating: 4.5, address: 'Siwan, Bihar 841226', description: 'Government school providing modern facilities and quality education.' }
    ],
    restaurants: [
        { name: 'Zaika Restaurant', rating: 4.6, address: 'Siwan, Bihar 841226', description: 'Popular for North Indian cuisine and family-friendly ambiance.' },
        { name: 'Spice Villa', rating: 4.5, address: 'Siwan, Bihar 841226', description: 'Serves Indian and Chinese dishes in a comfortable setting.' },
        { name: 'Biryani House', rating: 4.4, address: 'Siwan, Bihar 841226', description: 'Known for flavorful biryanis and traditional dishes.' },
        { name: 'Annapurna Bhojanalaya', rating: 4.3, address: 'Siwan, Bihar 841226', description: 'Affordable vegetarian restaurant serving traditional meals.' }
    ],
    hospitals: [
        { name: 'Sadar Hospital Siwan', rating: 4.5, address: 'Siwan, Bihar 841226', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'Life Care Hospital', rating: 4.4, address: 'Siwan, Bihar 841226', description: 'Private multi-specialty hospital offering modern treatments.' },
        { name: 'City Hospital Siwan', rating: 4.3, address: 'Siwan, Bihar 841226', description: 'Local hospital providing reliable healthcare services.' },
        { name: 'Apollo Clinic Siwan', rating: 4.2, address: 'Siwan, Bihar 841226', description: 'Reputed clinic for outpatient care and diagnostics.' }
    ],
    touristSpots: [
        { name: 'Sita Kund', rating: 4.8, address: 'Siwan, Bihar', description: 'Religious site associated with local legends and rituals.' },
        { name: 'Raja Bazar Fort', rating: 4.7, address: 'Siwan, Bihar', description: 'Historic fort representing the heritage of the region.' },
        { name: 'Shiv Mandir Siwan', rating: 4.6, address: 'Siwan, Bihar', description: 'Famous temple visited by locals and devotees.' },
        { name: 'Ganga Ghat Siwan', rating: 4.5, address: 'Siwan, Bihar', description: 'Scenic riverside spot ideal for rituals and relaxation.' }
    ]
},
'bettiah': { 
    schools: [
        { name: 'St. Michael’s High School Bettiah', rating: 4.8, address: 'Bettiah, Bihar 845438', description: 'Prestigious English-medium school focusing on academics and holistic development.' },
        { name: 'Delhi Public School Bettiah', rating: 4.7, address: 'Bettiah, Bihar 845438', description: 'CBSE-affiliated school offering quality education and extracurricular programs.' },
        { name: 'Mount Carmel School', rating: 4.6, address: 'Bettiah, Bihar 845438', description: 'Well-known school emphasizing academics, discipline, and co-curricular activities.' },
        { name: 'Kendriya Vidyalaya Bettiah', rating: 4.5, address: 'Bettiah, Bihar 845438', description: 'Government school providing modern facilities and quality education.' }
    ],
    restaurants: [
        { name: 'Zaika Restaurant', rating: 4.6, address: 'Bettiah, Bihar 845438', description: 'Popular for North Indian cuisine and family-friendly ambiance.' },
        { name: 'Spice Villa', rating: 4.5, address: 'Bettiah, Bihar 845438', description: 'Serves Indian and Chinese dishes in a comfortable setting.' },
        { name: 'Biryani House', rating: 4.4, address: 'Bettiah, Bihar 845438', description: 'Known for flavorful biryanis and traditional dishes.' },
        { name: 'Annapurna Bhojanalaya', rating: 4.3, address: 'Bettiah, Bihar 845438', description: 'Affordable vegetarian restaurant serving traditional meals.' }
    ],
    hospitals: [
        { name: 'Sadar Hospital Bettiah', rating: 4.5, address: 'Bettiah, Bihar 845438', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'Life Care Hospital', rating: 4.4, address: 'Bettiah, Bihar 845438', description: 'Private multi-specialty hospital offering modern treatments.' },
        { name: 'City Hospital Bettiah', rating: 4.3, address: 'Bettiah, Bihar 845438', description: 'Local hospital providing reliable healthcare services.' },
        { name: 'Apollo Clinic Bettiah', rating: 4.2, address: 'Bettiah, Bihar 845438', description: 'Reputed clinic for outpatient care and diagnostics.' }
    ],
    touristSpots: [
        { name: 'Valmiki National Park', rating: 4.9, address: 'Bettiah, Bihar', description: 'Famous wildlife sanctuary and tiger reserve in Bihar.' },
        { name: 'Bettiah Fort', rating: 4.7, address: 'Bettiah, Bihar', description: 'Historic fort representing regional heritage.' },
        { name: 'Ramchaura Mandir', rating: 4.6, address: 'Bettiah, Bihar', description: 'Popular temple dedicated to Lord Rama.' },
        { name: 'Ganga Ghat Bettiah', rating: 4.5, address: 'Bettiah, Bihar', description: 'Scenic riverside spot for leisure and rituals.' }
    ]
},
'bettiah': { 
    schools: [
        { name: 'St. Michael’s High School Bettiah', rating: 4.8, address: 'Bettiah, Bihar 845438', description: 'Prestigious English-medium school focusing on academics and holistic development.' },
        { name: 'Delhi Public School Bettiah', rating: 4.7, address: 'Bettiah, Bihar 845438', description: 'CBSE-affiliated school offering quality education and extracurricular programs.' },
        { name: 'Mount Carmel School', rating: 4.6, address: 'Bettiah, Bihar 845438', description: 'Well-known school emphasizing academics, discipline, and co-curricular activities.' },
        { name: 'Kendriya Vidyalaya Bettiah', rating: 4.5, address: 'Bettiah, Bihar 845438', description: 'Government school providing modern facilities and quality education.' }
    ],
    restaurants: [
        { name: 'Zaika Restaurant', rating: 4.6, address: 'Bettiah, Bihar 845438', description: 'Popular for North Indian cuisine and family-friendly ambiance.' },
        { name: 'Spice Villa', rating: 4.5, address: 'Bettiah, Bihar 845438', description: 'Serves Indian and Chinese dishes in a comfortable setting.' },
        { name: 'Biryani House', rating: 4.4, address: 'Bettiah, Bihar 845438', description: 'Known for flavorful biryanis and traditional dishes.' },
        { name: 'Annapurna Bhojanalaya', rating: 4.3, address: 'Bettiah, Bihar 845438', description: 'Affordable vegetarian restaurant serving traditional meals.' }
    ],
    hospitals: [
        { name: 'Sadar Hospital Bettiah', rating: 4.5, address: 'Bettiah, Bihar 845438', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'Life Care Hospital', rating: 4.4, address: 'Bettiah, Bihar 845438', description: 'Private multi-specialty hospital offering modern treatments.' },
        { name: 'City Hospital Bettiah', rating: 4.3, address: 'Bettiah, Bihar 845438', description: 'Local hospital providing reliable healthcare services.' },
        { name: 'Apollo Clinic Bettiah', rating: 4.2, address: 'Bettiah, Bihar 845438', description: 'Reputed clinic for outpatient care and diagnostics.' }
    ],
    touristSpots: [
        { name: 'Valmiki National Park', rating: 4.9, address: 'Bettiah, Bihar', description: 'Famous wildlife sanctuary and tiger reserve in Bihar.' },
        { name: 'Bettiah Fort', rating: 4.7, address: 'Bettiah, Bihar', description: 'Historic fort representing regional heritage.' },
        { name: 'Ramchaura Mandir', rating: 4.6, address: 'Bettiah, Bihar', description: 'Popular temple dedicated to Lord Rama.' },
        { name: 'Ganga Ghat Bettiah', rating: 4.5, address: 'Bettiah, Bihar', description: 'Scenic riverside spot for leisure and rituals.' }
    ]
},
'bagaha': { 
    schools: [
        { name: 'St. Michael’s High School Bagaha', rating: 4.8, address: 'Bagaha, Bihar 845101', description: 'Prestigious English-medium school focusing on academics and holistic development.' },
        { name: 'Delhi Public School Bagaha', rating: 4.7, address: 'Bagaha, Bihar 845101', description: 'CBSE-affiliated school offering quality education and extracurricular programs.' },
        { name: 'Mount Carmel School', rating: 4.6, address: 'Bagaha, Bihar 845101', description: 'Well-known school emphasizing academics, discipline, and co-curricular activities.' },
        { name: 'Kendriya Vidyalaya Bagaha', rating: 4.5, address: 'Bagaha, Bihar 845101', description: 'Government school providing modern facilities and quality education.' }
    ],
    restaurants: [
        { name: 'Zaika Restaurant', rating: 4.6, address: 'Bagaha, Bihar 845101', description: 'Popular for North Indian cuisine and family-friendly ambiance.' },
        { name: 'Spice Villa', rating: 4.5, address: 'Bagaha, Bihar 845101', description: 'Serves Indian and Chinese dishes in a comfortable setting.' },
        { name: 'Biryani House', rating: 4.4, address: 'Bagaha, Bihar 845101', description: 'Known for flavorful biryanis and traditional dishes.' },
        { name: 'Annapurna Bhojanalaya', rating: 4.3, address: 'Bagaha, Bihar 845101', description: 'Affordable vegetarian restaurant serving traditional meals.' }
    ],
    hospitals: [
        { name: 'Sadar Hospital Bagaha', rating: 4.5, address: 'Bagaha, Bihar 845101', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'Life Care Hospital', rating: 4.4, address: 'Bagaha, Bihar 845101', description: 'Private multi-specialty hospital offering modern treatments.' },
        { name: 'City Hospital Bagaha', rating: 4.3, address: 'Bagaha, Bihar 845101', description: 'Local hospital providing reliable healthcare services.' },
        { name: 'Apollo Clinic Bagaha', rating: 4.2, address: 'Bagaha, Bihar 845101', description: 'Reputed clinic for outpatient care and diagnostics.' }
    ],
    touristSpots: [
        { name: 'Valmiki National Park', rating: 4.9, address: 'Bagaha, Bihar', description: 'Famous wildlife sanctuary and tiger reserve in Bihar.' },
        { name: 'Bagaha Fort', rating: 4.7, address: 'Bagaha, Bihar', description: 'Historic fort representing regional heritage.' },
        { name: 'Ram Mandir Bagaha', rating: 4.6, address: 'Bagaha, Bihar', description: 'Popular temple dedicated to Lord Rama.' },
        { name: 'Ganga Ghat Bagaha', rating: 4.5, address: 'Bagaha, Bihar', description: 'Scenic riverside spot for leisure and rituals.' }
    ]
},
'nawada': { 
    schools: [
        { name: 'St. Michael’s School Nawada', rating: 4.8, address: 'Nawada, Bihar 805110', description: 'Prestigious English-medium school focusing on academics and holistic development.' },
        { name: 'Delhi Public School Nawada', rating: 4.7, address: 'Nawada, Bihar 805110', description: 'CBSE-affiliated school offering quality education and extracurricular programs.' },
        { name: 'Mount Carmel School', rating: 4.6, address: 'Nawada, Bihar 805110', description: 'Well-known school emphasizing academics, discipline, and co-curricular activities.' },
        { name: 'Kendriya Vidyalaya Nawada', rating: 4.5, address: 'Nawada, Bihar 805110', description: 'Government school providing modern facilities and quality education.' }
    ],
    restaurants: [
        { name: 'Zaika Restaurant', rating: 4.6, address: 'Nawada, Bihar 805110', description: 'Popular for North Indian cuisine and family-friendly ambiance.' },
        { name: 'Spice Villa', rating: 4.5, address: 'Nawada, Bihar 805110', description: 'Serves Indian and Chinese dishes in a comfortable setting.' },
        { name: 'Biryani House', rating: 4.4, address: 'Nawada, Bihar 805110', description: 'Known for flavorful biryanis and traditional dishes.' },
        { name: 'Annapurna Bhojanalaya', rating: 4.3, address: 'Nawada, Bihar 805110', description: 'Affordable vegetarian restaurant serving traditional meals.' }
    ],
    hospitals: [
        { name: 'Sadar Hospital Nawada', rating: 4.5, address: 'Nawada, Bihar 805110', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'Life Care Hospital', rating: 4.4, address: 'Nawada, Bihar 805110', description: 'Private multi-specialty hospital offering modern treatments.' },
        { name: 'City Hospital Nawada', rating: 4.3, address: 'Nawada, Bihar 805110', description: 'Local hospital providing reliable healthcare services.' },
        { name: 'Apollo Clinic Nawada', rating: 4.2, address: 'Nawada, Bihar 805110', description: 'Reputed clinic for outpatient care and diagnostics.' }
    ],
    touristSpots: [
        { name: 'Bhimbandh Wildlife Sanctuary', rating: 4.8, address: 'Nawada, Bihar', description: 'Famous wildlife sanctuary with rich biodiversity and scenic beauty.' },
        { name: 'Swarna Temple', rating: 4.7, address: 'Nawada, Bihar', description: 'Popular Hindu temple attracting devotees and tourists.' },
        { name: 'Barabar Caves', rating: 4.6, address: 'Nawada, Bihar', description: 'Ancient rock-cut caves of historical and religious significance.' },
        { name: 'Kundeshwari Temple', rating: 4.5, address: 'Nawada, Bihar', description: 'Well-known local temple visited by pilgrims.' }
    ]
},
'rohtas': { 
    schools: [
        { name: 'St. Michael’s School Rohtas', rating: 4.8, address: 'Rohtas, Bihar 821305', description: 'Prestigious English-medium school focusing on academics and holistic development.' },
        { name: 'Delhi Public School Rohtas', rating: 4.7, address: 'Rohtas, Bihar 821305', description: 'CBSE-affiliated school offering quality education and extracurricular programs.' },
        { name: 'Mount Carmel School', rating: 4.6, address: 'Rohtas, Bihar 821305', description: 'Well-known school emphasizing academics, discipline, and co-curricular activities.' },
        { name: 'Kendriya Vidyalaya Rohtas', rating: 4.5, address: 'Rohtas, Bihar 821305', description: 'Government school providing modern facilities and quality education.' }
    ],
    restaurants: [
        { name: 'Zaika Restaurant', rating: 4.6, address: 'Rohtas, Bihar 821305', description: 'Popular for North Indian cuisine and family-friendly ambiance.' },
        { name: 'Spice Villa', rating: 4.5, address: 'Rohtas, Bihar 821305', description: 'Serves Indian and Chinese dishes in a comfortable setting.' },
        { name: 'Biryani House', rating: 4.4, address: 'Rohtas, Bihar 821305', description: 'Known for flavorful biryanis and traditional dishes.' },
        { name: 'Annapurna Bhojanalaya', rating: 4.3, address: 'Rohtas, Bihar 821305', description: 'Affordable vegetarian restaurant serving traditional meals.' }
    ],
    hospitals: [
        { name: 'Sadar Hospital Rohtas', rating: 4.5, address: 'Rohtas, Bihar 821305', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'Life Care Hospital', rating: 4.4, address: 'Rohtas, Bihar 821305', description: 'Private multi-specialty hospital offering modern treatments.' },
        { name: 'City Hospital Rohtas', rating: 4.3, address: 'Rohtas, Bihar 821305', description: 'Local hospital providing reliable healthcare services.' },
        { name: 'Apollo Clinic Rohtas', rating: 4.2, address: 'Rohtas, Bihar 821305', description: 'Reputed clinic for outpatient care and diagnostics.' }
    ],
    touristSpots: [
        { name: 'Rohtasgarh Fort', rating: 4.9, address: 'Rohtas, Bihar', description: 'Historic fort showcasing medieval architecture and heritage.' },
        { name: 'Kaimur Hills', rating: 4.8, address: 'Rohtas, Bihar', description: 'Scenic hill range ideal for trekking and nature trips.' },
        { name: 'Shergarh Fort', rating: 4.7, address: 'Rohtas, Bihar', description: 'Ancient fort with historical significance and ruins.' },
        { name: 'Chainpur Palace', rating: 4.6, address: 'Rohtas, Bihar', description: 'Palace representing the cultural heritage of the region.' }
    ]
},
'biharSharif': { 
    schools: [
        { name: 'St. Xavier’s School Bihar Sharif', rating: 4.8, address: 'Bihar Sharif, Nalanda, Bihar 803101', description: 'Prestigious English-medium school focusing on academics and holistic development.' },
        { name: 'Delhi Public School Bihar Sharif', rating: 4.7, address: 'Bihar Sharif, Nalanda, Bihar 803101', description: 'CBSE-affiliated school offering quality education and extracurricular programs.' },
        { name: 'Mount Carmel School', rating: 4.6, address: 'Bihar Sharif, Nalanda, Bihar 803101', description: 'Well-known school emphasizing academics, discipline, and co-curricular activities.' },
        { name: 'Kendriya Vidyalaya Bihar Sharif', rating: 4.5, address: 'Bihar Sharif, Nalanda, Bihar 803101', description: 'Government school providing modern facilities and quality education.' }
    ],
    restaurants: [
        { name: 'Zaika Restaurant', rating: 4.6, address: 'Bihar Sharif, Nalanda, Bihar 803101', description: 'Popular for North Indian cuisine and family-friendly ambiance.' },
        { name: 'Spice Villa', rating: 4.5, address: 'Bihar Sharif, Nalanda, Bihar 803101', description: 'Serves Indian and Chinese dishes in a comfortable setting.' },
        { name: 'Biryani House', rating: 4.4, address: 'Bihar Sharif, Nalanda, Bihar 803101', description: 'Known for flavorful biryanis and traditional dishes.' },
        { name: 'Annapurna Bhojanalaya', rating: 4.3, address: 'Bihar Sharif, Nalanda, Bihar 803101', description: 'Affordable vegetarian restaurant serving traditional meals.' }
    ],
    hospitals: [
        { name: 'Sadar Hospital Bihar Sharif', rating: 4.5, address: 'Bihar Sharif, Nalanda, Bihar 803101', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'Life Care Hospital', rating: 4.4, address: 'Bihar Sharif, Nalanda, Bihar 803101', description: 'Private multi-specialty hospital offering modern treatments.' },
        { name: 'City Hospital Bihar Sharif', rating: 4.3, address: 'Bihar Sharif, Nalanda, Bihar 803101', description: 'Local hospital providing reliable healthcare services.' },
        { name: 'Apollo Clinic Bihar Sharif', rating: 4.2, address: 'Bihar Sharif, Nalanda, Bihar 803101', description: 'Reputed clinic for outpatient care and diagnostics.' }
    ],
    touristSpots: [
        { name: 'Nalanda University Ruins', rating: 4.9, address: 'Bihar Sharif, Nalanda, Bihar', description: 'Ancient center of learning and UNESCO World Heritage site.' },
        { name: 'Bihar Sharif Fort', rating: 4.7, address: 'Bihar Sharif, Nalanda, Bihar', description: 'Historic fort with medieval architecture and scenic surroundings.' },
        { name: 'Barabar Caves', rating: 4.6, address: 'Bihar Sharif, Nalanda, Bihar', description: 'Ancient rock-cut caves of historical and religious importance.' },
        { name: 'Kundalpur Temple', rating: 4.5, address: 'Bihar Sharif, Nalanda, Bihar', description: 'Famous temple attracting devotees and tourists.' }
    ]
},
'gaya': { 
    schools: [
        { name: 'St. Michael’s School Gaya', rating: 4.8, address: 'Gaya, Bihar 823001', description: 'Prestigious English-medium school focusing on academics and holistic development.' },
        { name: 'Delhi Public School Gaya', rating: 4.7, address: 'Gaya, Bihar 823001', description: 'CBSE-affiliated school offering quality education and extracurricular programs.' },
        { name: 'Mount Carmel School', rating: 4.6, address: 'Gaya, Bihar 823001', description: 'Well-known school emphasizing academics, discipline, and co-curricular activities.' },
        { name: 'Kendriya Vidyalaya Gaya', rating: 4.5, address: 'Gaya, Bihar 823001', description: 'Government school providing modern facilities and quality education.' }
    ],
    restaurants: [
        { name: 'Zaika Restaurant', rating: 4.6, address: 'Gaya, Bihar 823001', description: 'Popular for North Indian cuisine and family-friendly ambiance.' },
        { name: 'Spice Villa', rating: 4.5, address: 'Gaya, Bihar 823001', description: 'Serves Indian and Chinese dishes in a comfortable setting.' },
        { name: 'Biryani House', rating: 4.4, address: 'Gaya, Bihar 823001', description: 'Known for flavorful biryanis and traditional dishes.' },
        { name: 'Annapurna Bhojanalaya', rating: 4.3, address: 'Gaya, Bihar 823001', description: 'Affordable vegetarian restaurant serving traditional meals.' }
    ],
    hospitals: [
        { name: 'Sadar Hospital Gaya', rating: 4.5, address: 'Gaya, Bihar 823001', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'Life Care Hospital', rating: 4.4, address: 'Gaya, Bihar 823001', description: 'Private multi-specialty hospital offering modern treatments.' },
        { name: 'City Hospital Gaya', rating: 4.3, address: 'Gaya, Bihar 823001', description: 'Local hospital providing reliable healthcare services.' },
        { name: 'Apollo Clinic Gaya', rating: 4.2, address: 'Gaya, Bihar 823001', description: 'Reputed clinic for outpatient care and diagnostics.' }
    ],
    touristSpots: [
        { name: 'Bodh Gaya', rating: 5.0, address: 'Gaya, Bihar', description: 'UNESCO World Heritage site where Buddha attained enlightenment.' },
        { name: 'Mahabodhi Temple', rating: 4.9, address: 'Gaya, Bihar', description: 'Famous Buddhist temple and pilgrimage site.' },
        { name: 'Vishnupad Temple', rating: 4.7, address: 'Gaya, Bihar', description: 'Historic Hindu temple with religious significance.' },
        { name: 'Barabar Caves', rating: 4.6, address: 'Gaya, Bihar', description: 'Ancient rock-cut caves of historical and religious importance.' }
    ]
},
'bhagalpur': { 
    schools: [
        { name: 'St. Joseph’s School Bhagalpur', rating: 4.8, address: 'Bhagalpur, Bihar 812001', description: 'Prestigious English-medium school focusing on academics and holistic development.' },
        { name: 'Delhi Public School Bhagalpur', rating: 4.7, address: 'Bhagalpur, Bihar 812001', description: 'CBSE-affiliated school offering quality education and extracurricular programs.' },
        { name: 'Mount Carmel School', rating: 4.6, address: 'Bhagalpur, Bihar 812001', description: 'Well-known school emphasizing academics, discipline, and co-curricular activities.' },
        { name: 'Kendriya Vidyalaya Bhagalpur', rating: 4.5, address: 'Bhagalpur, Bihar 812001', description: 'Government school providing modern facilities and quality education.' }
    ],
    restaurants: [
        { name: 'Zaika Restaurant', rating: 4.6, address: 'Bhagalpur, Bihar 812001', description: 'Popular for North Indian cuisine and family-friendly ambiance.' },
        { name: 'Spice Villa', rating: 4.5, address: 'Bhagalpur, Bihar 812001', description: 'Serves Indian and Chinese dishes in a comfortable setting.' },
        { name: 'Biryani House', rating: 4.4, address: 'Bhagalpur, Bihar 812001', description: 'Known for flavorful biryanis and traditional dishes.' },
        { name: 'Annapurna Bhojanalaya', rating: 4.3, address: 'Bhagalpur, Bihar 812001', description: 'Affordable vegetarian restaurant serving traditional meals.' }
    ],
    hospitals: [
        { name: 'Sadar Hospital Bhagalpur', rating: 4.5, address: 'Bhagalpur, Bihar 812001', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'Life Care Hospital', rating: 4.4, address: 'Bhagalpur, Bihar 812001', description: 'Private multi-specialty hospital offering modern treatments.' },
        { name: 'City Hospital Bhagalpur', rating: 4.3, address: 'Bhagalpur, Bihar 812001', description: 'Local hospital providing reliable healthcare services.' },
        { name: 'Apollo Clinic Bhagalpur', rating: 4.2, address: 'Bhagalpur, Bihar 812001', description: 'Reputed clinic for outpatient care and diagnostics.' }
    ],
    touristSpots: [
        { name: 'Vikramshila Ruins', rating: 4.9, address: 'Bhagalpur, Bihar', description: 'Ancient center of learning with historical significance.' },
        { name: 'Sultanganj Buddha Smriti Park', rating: 4.7, address: 'Bhagalpur, Bihar', description: 'Park dedicated to Buddhist heritage and culture.' },
        { name: 'Kali Mandir Bhagalpur', rating: 4.6, address: 'Bhagalpur, Bihar', description: 'Famous Hindu temple attracting local devotees.' },
        { name: 'Ghanta Ghar', rating: 4.5, address: 'Bhagalpur, Bihar', description: 'Iconic clock tower and local landmark of the city.' }
    ]
},
'purnia': { 
    schools: [
        { name: 'St. Joseph’s School Purnia', rating: 4.8, address: 'Purnia, Bihar 854301', description: 'Prestigious English-medium school focusing on academics and holistic development.' },
        { name: 'Delhi Public School Purnia', rating: 4.7, address: 'Purnia, Bihar 854301', description: 'CBSE-affiliated school offering quality education and extracurricular programs.' },
        { name: 'Mount Carmel School', rating: 4.6, address: 'Purnia, Bihar 854301', description: 'Well-known school emphasizing academics, discipline, and co-curricular activities.' },
        { name: 'Kendriya Vidyalaya Purnia', rating: 4.5, address: 'Purnia, Bihar 854301', description: 'Government school providing modern facilities and quality education.' }
    ],
    restaurants: [
        { name: 'Zaika Restaurant', rating: 4.6, address: 'Purnia, Bihar 854301', description: 'Popular for North Indian cuisine and family-friendly ambiance.' },
        { name: 'Spice Villa', rating: 4.5, address: 'Purnia, Bihar 854301', description: 'Serves Indian and Chinese dishes in a comfortable setting.' },
        { name: 'Biryani House', rating: 4.4, address: 'Purnia, Bihar 854301', description: 'Known for flavorful biryanis and traditional dishes.' },
        { name: 'Annapurna Bhojanalaya', rating: 4.3, address: 'Purnia, Bihar 854301', description: 'Affordable vegetarian restaurant serving traditional meals.' }
    ],
    hospitals: [
        { name: 'Sadar Hospital Purnia', rating: 4.5, address: 'Purnia, Bihar 854301', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'Life Care Hospital', rating: 4.4, address: 'Purnia, Bihar 854301', description: 'Private multi-specialty hospital offering modern treatments.' },
        { name: 'City Hospital Purnia', rating: 4.3, address: 'Purnia, Bihar 854301', description: 'Local hospital providing reliable healthcare services.' },
        { name: 'Apollo Clinic Purnia', rating: 4.2, address: 'Purnia, Bihar 854301', description: 'Reputed clinic for outpatient care and diagnostics.' }
    ],
    touristSpots: [
        { name: 'Kali Mandir Purnia', rating: 4.8, address: 'Purnia, Bihar', description: 'Popular temple attracting devotees from nearby areas.' },
        { name: 'Garib Nawaz Dargah', rating: 4.7, address: 'Purnia, Bihar', description: 'Historic Dargah visited by locals and tourists alike.' },
        { name: 'Srikrishna Mandir', rating: 4.6, address: 'Purnia, Bihar', description: 'Religious site with cultural significance.' },
        { name: 'Koshi Barrage', rating: 4.5, address: 'Purnia, Bihar', description: 'Scenic river barrage ideal for sightseeing and photography.' }
    ]
},
'araria': { 
    schools: [
        { name: 'St. Michael’s School Araria', rating: 4.8, address: 'Araria, Bihar 854311', description: 'Prestigious English-medium school focusing on academics and holistic development.' },
        { name: 'Delhi Public School Araria', rating: 4.7, address: 'Araria, Bihar 854311', description: 'CBSE-affiliated school offering quality education and extracurricular programs.' },
        { name: 'Mount Carmel School', rating: 4.6, address: 'Araria, Bihar 854311', description: 'Well-known school emphasizing academics, discipline, and co-curricular activities.' },
        { name: 'Kendriya Vidyalaya Araria', rating: 4.5, address: 'Araria, Bihar 854311', description: 'Government school providing modern facilities and quality education.' }
    ],
    restaurants: [
        { name: 'Zaika Restaurant', rating: 4.6, address: 'Araria, Bihar 854311', description: 'Popular for North Indian cuisine and family-friendly ambiance.' },
        { name: 'Spice Villa', rating: 4.5, address: 'Araria, Bihar 854311', description: 'Serves Indian and Chinese dishes in a comfortable setting.' },
        { name: 'Biryani House', rating: 4.4, address: 'Araria, Bihar 854311', description: 'Known for flavorful biryanis and traditional dishes.' },
        { name: 'Annapurna Bhojanalaya', rating: 4.3, address: 'Araria, Bihar 854311', description: 'Affordable vegetarian restaurant serving traditional meals.' }
    ],
    hospitals: [
        { name: 'Sadar Hospital Araria', rating: 4.5, address: 'Araria, Bihar 854311', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'Life Care Hospital', rating: 4.4, address: 'Araria, Bihar 854311', description: 'Private multi-specialty hospital offering modern treatments.' },
        { name: 'City Hospital Araria', rating: 4.3, address: 'Araria, Bihar 854311', description: 'Local hospital providing reliable healthcare services.' },
        { name: 'Apollo Clinic Araria', rating: 4.2, address: 'Araria, Bihar 854311', description: 'Reputed clinic for outpatient care and diagnostics.' }
    ],
    touristSpots: [
        { name: 'Baba Bateshwar Nath Mandir', rating: 4.8, address: 'Araria, Bihar', description: 'Famous temple attracting devotees from nearby regions.' },
        { name: 'Barhara Ghat', rating: 4.7, address: 'Araria, Bihar', description: 'Scenic riverside location ideal for relaxation and rituals.' },
        { name: 'Kali Mandir Araria', rating: 4.6, address: 'Araria, Bihar', description: 'Popular Hindu temple with cultural significance.' },
        { name: 'Thakurganj Park', rating: 4.5, address: 'Araria, Bihar', description: 'Local park providing recreation and leisure for families.' }
    ]
},
'katihar': { 
    schools: [
        { name: 'St. Michael’s School Katihar', rating: 4.8, address: 'Katihar, Bihar 854105', description: 'Prestigious English-medium school focusing on academics and holistic development.' },
        { name: 'Delhi Public School Katihar', rating: 4.7, address: 'Katihar, Bihar 854105', description: 'CBSE-affiliated school offering quality education and extracurricular programs.' },
        { name: 'Mount Carmel School', rating: 4.6, address: 'Katihar, Bihar 854105', description: 'Well-known school emphasizing academics, discipline, and co-curricular activities.' },
        { name: 'Kendriya Vidyalaya Katihar', rating: 4.5, address: 'Katihar, Bihar 854105', description: 'Government school providing modern facilities and quality education.' }
    ],
    restaurants: [
        { name: 'Zaika Restaurant', rating: 4.6, address: 'Katihar, Bihar 854105', description: 'Popular for North Indian cuisine and family-friendly ambiance.' },
        { name: 'Spice Villa', rating: 4.5, address: 'Katihar, Bihar 854105', description: 'Serves Indian and Chinese dishes in a comfortable setting.' },
        { name: 'Biryani House', rating: 4.4, address: 'Katihar, Bihar 854105', description: 'Known for flavorful biryanis and traditional dishes.' },
        { name: 'Annapurna Bhojanalaya', rating: 4.3, address: 'Katihar, Bihar 854105', description: 'Affordable vegetarian restaurant serving traditional meals.' }
    ],
    hospitals: [
        { name: 'Sadar Hospital Katihar', rating: 4.5, address: 'Katihar, Bihar 854105', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'Life Care Hospital', rating: 4.4, address: 'Katihar, Bihar 854105', description: 'Private multi-specialty hospital offering modern treatments.' },
        { name: 'City Hospital Katihar', rating: 4.3, address: 'Katihar, Bihar 854105', description: 'Local hospital providing reliable healthcare services.' },
        { name: 'Apollo Clinic Katihar', rating: 4.2, address: 'Katihar, Bihar 854105', description: 'Reputed clinic for outpatient care and diagnostics.' }
    ],
    touristSpots: [
        { name: 'Manihari Ghat', rating: 4.8, address: 'Katihar, Bihar', description: 'Scenic riverside location ideal for relaxation and rituals.' },
        { name: 'Kali Mandir Katihar', rating: 4.7, address: 'Katihar, Bihar', description: 'Popular Hindu temple attracting local devotees.' },
        { name: 'Ganga Sagar', rating: 4.6, address: 'Katihar, Bihar', description: 'Riverfront area offering sightseeing and cultural significance.' },
        { name: 'Harshnath Mandir', rating: 4.5, address: 'Katihar, Bihar', description: 'Historic temple visited by locals and tourists.' }
    ]
},








'kolkata': { 
    schools: [
        { name: 'La Martiniere for Boys', rating: 4.9, address: 'J L Nehru Rd, Kolkata, West Bengal 700071', description: 'Prestigious school known for academic excellence and extracurricular activities.' },
        { name: 'La Martiniere for Girls', rating: 4.8, address: 'Esplanade, Kolkata, West Bengal 700069', description: 'Renowned school focusing on holistic development of girls.' },
        { name: 'St. Xavier’s Collegiate School', rating: 4.9, address: '30, Park St, Kolkata, West Bengal 700016', description: 'Top-rated school with strong emphasis on academics and discipline.' },
        { name: 'Delhi Public School Kolkata', rating: 4.7, address: 'Kolkata, West Bengal 700107', description: 'CBSE-affiliated school providing quality education and co-curricular activities.' }
    ],
    restaurants: [
        { name: 'Peter Cat', rating: 4.8, address: '6, Park Street, Kolkata, West Bengal 700016', description: 'Famous for Chelo Kebabs and continental cuisine.' },
        { name: 'Oh! Calcutta', rating: 4.7, address: 'Ballygunge, Kolkata, West Bengal 700019', description: 'Authentic Bengali cuisine with traditional flavors.' },
        { name: '6 Ballygunge Place', rating: 4.6, address: 'Ballygunge, Kolkata, West Bengal 700019', description: 'Popular Bengali restaurant known for thalis and sweets.' },
        { name: 'Mocambo', rating: 4.5, address: 'Park Street, Kolkata, West Bengal 700016', description: 'Iconic restaurant serving continental and Indian dishes.' }
    ],
    hospitals: [
        { name: 'Apollo Gleneagles Hospital', rating: 4.8, address: '58, Canal Circular Rd, Kolkata, West Bengal 700054', description: 'Multi-specialty hospital with advanced healthcare facilities.' },
        { name: 'Belle Vue Clinic', rating: 4.7, address: '2, S P Mukherjee Rd, Kolkata, West Bengal 700026', description: 'Reputed hospital offering comprehensive medical services.' },
        { name: 'AMRI Hospitals, Dhakuria', rating: 4.6, address: '81, Mukundapur, Kolkata, West Bengal 700099', description: 'Modern hospital with quality treatment and patient care.' },
        { name: 'Fortis Hospital, Anandapur', rating: 4.5, address: '730, Anandapur, Kolkata, West Bengal 700107', description: 'Well-known hospital with specialized medical services.' }
    ],
    touristSpots: [
        { name: 'Victoria Memorial', rating: 4.9, address: 'Kolkata, West Bengal', description: 'Iconic marble monument and museum showcasing colonial history.' },
        { name: 'Howrah Bridge', rating: 4.8, address: 'Kolkata, West Bengal', description: 'Famous cantilever bridge over the Hooghly River and a city landmark.' },
        { name: 'Indian Museum', rating: 4.7, address: '27, Jawaharlal Nehru Rd, Kolkata, West Bengal 700016', description: 'Oldest and largest museum in India with extensive collections.' },
        { name: 'Dakshineswar Kali Temple', rating: 4.8, address: 'Dakshineswar, Kolkata, West Bengal', description: 'Renowned Hindu temple dedicated to Goddess Kali.' }
    ]
},
'howrah': { 
    schools: [
        { name: 'South Point School Howrah Branch', rating: 4.8, address: 'Howrah, West Bengal 711101', description: 'Renowned for academic excellence and extracurricular programs.' },
        { name: 'St. Thomas School', rating: 4.7, address: 'Howrah, West Bengal 711101', description: 'Well-known English-medium school focusing on holistic development.' },
        { name: 'Delhi Public School Howrah', rating: 4.6, address: 'Howrah, West Bengal 711101', description: 'CBSE-affiliated school providing quality education and modern facilities.' },
        { name: 'Kendriya Vidyalaya Howrah', rating: 4.5, address: 'Howrah, West Bengal 711101', description: 'Government school offering modern infrastructure and learning.' }
    ],
    restaurants: [
        { name: '6 Ballygunge Place Howrah', rating: 4.6, address: 'Howrah, West Bengal 711101', description: 'Famous for authentic Bengali cuisine and thalis.' },
        { name: 'Zaika Restaurant', rating: 4.5, address: 'Howrah, West Bengal 711101', description: 'Popular North Indian and Mughlai dishes with family-friendly ambiance.' },
        { name: 'Spice Villa', rating: 4.4, address: 'Howrah, West Bengal 711101', description: 'Indian and Chinese cuisine served in a comfortable setting.' },
        { name: 'Biryani House', rating: 4.3, address: 'Howrah, West Bengal 711101', description: 'Known for flavorful biryanis and traditional dishes.' }
    ],
    hospitals: [
        { name: 'Howrah District Hospital', rating: 4.5, address: 'Howrah, West Bengal 711101', description: 'Government hospital offering general and emergency healthcare services.' },
        { name: 'Life Care Hospital Howrah', rating: 4.4, address: 'Howrah, West Bengal 711101', description: 'Private multi-specialty hospital providing modern treatments.' },
        { name: 'City Hospital Howrah', rating: 4.3, address: 'Howrah, West Bengal 711101', description: 'Reliable local hospital with various medical facilities.' },
        { name: 'Apollo Clinic Howrah', rating: 4.2, address: 'Howrah, West Bengal 711101', description: 'Reputed outpatient care clinic with diagnostics services.' }
    ],
    touristSpots: [
        { name: 'Howrah Bridge', rating: 5.0, address: 'Howrah, West Bengal', description: 'Iconic cantilever bridge connecting Kolkata and Howrah across the Hooghly River.' },
        { name: 'Belur Math', rating: 4.9, address: 'Belur, Howrah, West Bengal', description: 'Headquarters of the Ramakrishna Mission and a serene spiritual center.' },
        { name: 'ISKCON Temple Howrah', rating: 4.7, address: 'Howrah, West Bengal', description: 'Popular temple dedicated to Lord Krishna and cultural events.' },
        { name: 'Botanical Garden Howrah', rating: 4.6, address: 'Howrah, West Bengal', description: 'Scenic garden with diverse plant species and peaceful environment.' }
    ]
},
'durgapur': { 
    schools: [
        { name: 'Delhi Public School Durgapur', rating: 4.8, address: 'Durgapur, West Bengal 713206', description: 'CBSE-affiliated school offering quality education and extracurricular programs.' },
        { name: 'St. Patrick’s School', rating: 4.7, address: 'Durgapur, West Bengal 713206', description: 'Renowned school focusing on academics and holistic development.' },
        { name: 'DAV Public School', rating: 4.6, address: 'Durgapur, West Bengal 713206', description: 'Well-known English-medium school emphasizing discipline and co-curricular activities.' },
        { name: 'Kendriya Vidyalaya Durgapur', rating: 4.5, address: 'Durgapur, West Bengal 713206', description: 'Government school providing modern facilities and quality education.' }
    ],
    restaurants: [
        { name: 'The Yellow Chilli', rating: 4.7, address: 'Durgapur, West Bengal 713206', description: 'Fine dining restaurant serving Indian and continental dishes.' },
        { name: 'Zaika Restaurant', rating: 4.6, address: 'Durgapur, West Bengal 713206', description: 'Popular for North Indian and Mughlai cuisine.' },
        { name: 'Spice Villa', rating: 4.5, address: 'Durgapur, West Bengal 713206', description: 'Casual dining offering Indian and Chinese cuisine.' },
        { name: 'Biryani House', rating: 4.4, address: 'Durgapur, West Bengal 713206', description: 'Known for delicious biryanis and traditional meals.' }
    ],
    hospitals: [
        { name: 'Durgapur Steel Plant Hospital', rating: 4.6, address: 'Durgapur, West Bengal 713203', description: 'Multi-specialty hospital providing quality healthcare services.' },
        { name: 'Apollo Clinic Durgapur', rating: 4.5, address: 'Durgapur, West Bengal 713206', description: 'Well-known clinic for outpatient and diagnostic services.' },
        { name: 'Life Care Hospital Durgapur', rating: 4.4, address: 'Durgapur, West Bengal 713206', description: 'Private hospital offering modern treatments.' },
        { name: 'Sadar Hospital Durgapur', rating: 4.3, address: 'Durgapur, West Bengal 713206', description: 'Government hospital providing general and emergency healthcare.' }
    ],
    touristSpots: [
        { name: 'Durgapur Barrage', rating: 4.8, address: 'Durgapur, West Bengal', description: 'Popular sightseeing spot along the Damodar River.' },
        { name: 'Durgapur Steel Plant Museum', rating: 4.6, address: 'Durgapur, West Bengal', description: 'Museum showcasing the history of steel production in Durgapur.' },
        { name: 'City Center Durgapur', rating: 4.5, address: 'Durgapur, West Bengal', description: 'Shopping and recreational hub for locals and tourists.' },
        { name: 'Bhabani Pathak Park', rating: 4.4, address: 'Durgapur, West Bengal', description: 'Local park providing leisure and outdoor activities.' }
    ]
},
'asansol': { 
    schools: [
        { name: 'Delhi Public School Asansol', rating: 4.8, address: 'Asansol, West Bengal 713301', description: 'CBSE-affiliated school offering quality education and extracurricular programs.' },
        { name: 'St. Patrick’s School Asansol', rating: 4.7, address: 'Asansol, West Bengal 713301', description: 'Renowned school focusing on academics and holistic development.' },
        { name: 'DAV Public School Asansol', rating: 4.6, address: 'Asansol, West Bengal 713301', description: 'English-medium school emphasizing academics and co-curricular activities.' },
        { name: 'Kendriya Vidyalaya Asansol', rating: 4.5, address: 'Asansol, West Bengal 713301', description: 'Government school providing modern facilities and quality education.' }
    ],
    restaurants: [
        { name: 'Zaika Restaurant', rating: 4.6, address: 'Asansol, West Bengal 713301', description: 'Popular for North Indian and Mughlai cuisine.' },
        { name: 'Spice Villa', rating: 4.5, address: 'Asansol, West Bengal 713301', description: 'Indian and Chinese dishes in a comfortable setting.' },
        { name: 'Biryani House', rating: 4.4, address: 'Asansol, West Bengal 713301', description: 'Known for flavorful biryanis and traditional meals.' },
        { name: 'The Yellow Chilli', rating: 4.3, address: 'Asansol, West Bengal 713301', description: 'Fine dining restaurant serving Indian and continental dishes.' }
    ],
    hospitals: [
        { name: 'Asansol District Hospital', rating: 4.5, address: 'Asansol, West Bengal 713301', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'Life Care Hospital Asansol', rating: 4.4, address: 'Asansol, West Bengal 713301', description: 'Private hospital offering multi-specialty treatments.' },
        { name: 'Apollo Clinic Asansol', rating: 4.3, address: 'Asansol, West Bengal 713301', description: 'Well-known clinic for outpatient care and diagnostics.' },
        { name: 'City Hospital Asansol', rating: 4.2, address: 'Asansol, West Bengal 713301', description: 'Local hospital providing reliable healthcare services.' }
    ],
    touristSpots: [
        { name: 'Maithon Dam', rating: 4.8, address: 'Asansol, West Bengal', description: 'Popular dam and picnic spot on the Barakar River.' },
        { name: 'Kalyaneshwari Temple', rating: 4.7, address: 'Asansol, West Bengal', description: 'Famous Hindu temple attracting devotees and tourists.' },
        { name: 'Gourangdi Hills', rating: 4.6, address: 'Asansol, West Bengal', description: 'Scenic hills ideal for trekking and sightseeing.' },
        { name: 'Sail Park', rating: 4.5, address: 'Asansol, West Bengal', description: 'Local recreational park offering outdoor activities.' }
    ]
},
'siliguri': { 
    schools: [
        { name: 'St. Joseph’s School Siliguri', rating: 4.8, address: 'Hill Cart Rd, Siliguri, West Bengal 734001', description: 'Prestigious English-medium school focusing on academics and holistic development.' },
        { name: 'Delhi Public School Siliguri', rating: 4.7, address: 'Siliguri, West Bengal 734001', description: 'CBSE-affiliated school offering quality education and extracurricular programs.' },
        { name: 'Mount Hermon School', rating: 4.6, address: 'Siliguri, West Bengal 734001', description: 'Well-known school emphasizing academics, discipline, and co-curricular activities.' },
        { name: 'Kendriya Vidyalaya Siliguri', rating: 4.5, address: 'Siliguri, West Bengal 734001', description: 'Government school providing modern facilities and quality education.' }
    ],
    restaurants: [
        { name: 'The Yellow Chilli Siliguri', rating: 4.7, address: 'Siliguri, West Bengal 734001', description: 'Fine dining restaurant serving Indian and continental dishes.' },
        { name: 'Zaika Restaurant', rating: 4.6, address: 'Siliguri, West Bengal 734001', description: 'Popular for North Indian and Mughlai cuisine.' },
        { name: 'Spice Villa', rating: 4.5, address: 'Siliguri, West Bengal 734001', description: 'Casual dining offering Indian and Chinese dishes.' },
        { name: 'Biryani House', rating: 4.4, address: 'Siliguri, West Bengal 734001', description: 'Known for flavorful biryanis and traditional meals.' }
    ],
    hospitals: [
        { name: 'North Bengal Medical College', rating: 4.7, address: 'Siliguri, West Bengal 734012', description: 'Multi-specialty government hospital with advanced medical facilities.' },
        { name: 'Apollo Clinic Siliguri', rating: 4.5, address: 'Siliguri, West Bengal 734001', description: 'Reputed clinic for outpatient care and diagnostics.' },
        { name: 'Medica Superspecialty Hospital', rating: 4.6, address: 'Siliguri, West Bengal 734001', description: 'Private hospital offering modern treatments and patient care.' },
        { name: 'Khandelwal Hospital', rating: 4.4, address: 'Siliguri, West Bengal 734001', description: 'Local hospital providing reliable healthcare services.' }
    ],
    touristSpots: [
        { name: 'Coronation Bridge', rating: 4.8, address: 'Siliguri, West Bengal', description: 'Iconic bridge offering scenic views over the Teesta River.' },
        { name: 'Mahananda Wildlife Sanctuary', rating: 4.7, address: 'Siliguri, West Bengal', description: 'Protected forest area with diverse wildlife and trekking opportunities.' },
        { name: 'Salugara Monastery', rating: 4.6, address: 'Siliguri, West Bengal', description: 'Famous Buddhist monastery attracting tourists and devotees.' },
        { name: 'North Bengal Science Centre', rating: 4.5, address: 'Siliguri, West Bengal', description: 'Educational and recreational science center for families and students.' }
    ]
},
'bardhaman': { 
    schools: [
        { name: 'St. Xavier’s School Bardhaman', rating: 4.8, address: 'Bardhaman, West Bengal 713101', description: 'Prestigious English-medium school focusing on academics and holistic development.' },
        { name: 'Delhi Public School Bardhaman', rating: 4.7, address: 'Bardhaman, West Bengal 713101', description: 'CBSE-affiliated school offering quality education and extracurricular programs.' },
        { name: 'Bardhaman Public School', rating: 4.6, address: 'Bardhaman, West Bengal 713101', description: 'Well-known school emphasizing academics, discipline, and co-curricular activities.' },
        { name: 'Kendriya Vidyalaya Bardhaman', rating: 4.5, address: 'Bardhaman, West Bengal 713101', description: 'Government school providing modern facilities and quality education.' }
    ],
    restaurants: [
        { name: 'Zaika Restaurant', rating: 4.6, address: 'Bardhaman, West Bengal 713101', description: 'Popular for North Indian and Mughlai cuisine.' },
        { name: 'Spice Villa', rating: 4.5, address: 'Bardhaman, West Bengal 713101', description: 'Casual dining offering Indian and Chinese dishes.' },
        { name: 'Biryani House', rating: 4.4, address: 'Bardhaman, West Bengal 713101', description: 'Known for flavorful biryanis and traditional meals.' },
        { name: 'The Yellow Chilli Bardhaman', rating: 4.3, address: 'Bardhaman, West Bengal 713101', description: 'Fine dining restaurant serving Indian and continental dishes.' }
    ],
    hospitals: [
        { name: 'Bardhaman Sadar Hospital', rating: 4.5, address: 'Bardhaman, West Bengal 713101', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'Life Care Hospital Bardhaman', rating: 4.4, address: 'Bardhaman, West Bengal 713101', description: 'Private hospital offering multi-specialty treatments.' },
        { name: 'Apollo Clinic Bardhaman', rating: 4.3, address: 'Bardhaman, West Bengal 713101', description: 'Well-known clinic for outpatient care and diagnostics.' },
        { name: 'City Hospital Bardhaman', rating: 4.2, address: 'Bardhaman, West Bengal 713101', description: 'Local hospital providing reliable healthcare services.' }
    ],
    touristSpots: [
        { name: 'Bardhaman Rajbari', rating: 4.8, address: 'Bardhaman, West Bengal', description: 'Historic palace complex of the Bardhaman royal family.' },
        { name: 'Kankalitala Temple', rating: 4.7, address: 'Bardhaman, West Bengal', description: 'Famous Hindu temple attracting devotees from nearby regions.' },
        { name: 'Mukutmanipur Dam', rating: 4.6, address: 'Bardhaman, West Bengal', description: 'Scenic dam and picnic spot ideal for sightseeing and leisure.' },
        { name: 'Durgapur Barrage', rating: 4.5, address: 'Bardhaman, West Bengal', description: 'Popular sightseeing spot along the Damodar River.' }
    ]
},
'malda': { 
    schools: [
        { name: 'Malda Town High School', rating: 4.8, address: 'Malda, West Bengal 732101', description: 'Renowned school focusing on academics and holistic development.' },
        { name: 'Delhi Public School Malda', rating: 4.7, address: 'Malda, West Bengal 732101', description: 'CBSE-affiliated school offering quality education and extracurricular programs.' },
        { name: 'St. Joseph’s School Malda', rating: 4.6, address: 'Malda, West Bengal 732101', description: 'Well-known English-medium school emphasizing academics and co-curricular activities.' },
        { name: 'Kendriya Vidyalaya Malda', rating: 4.5, address: 'Malda, West Bengal 732101', description: 'Government school providing modern facilities and quality education.' }
    ],
    restaurants: [
        { name: 'Zaika Restaurant Malda', rating: 4.6, address: 'Malda, West Bengal 732101', description: 'Popular for North Indian and Mughlai cuisine.' },
        { name: 'Spice Villa Malda', rating: 4.5, address: 'Malda, West Bengal 732101', description: 'Casual dining offering Indian and Chinese dishes.' },
        { name: 'Biryani House Malda', rating: 4.4, address: 'Malda, West Bengal 732101', description: 'Known for flavorful biryanis and traditional meals.' },
        { name: 'The Yellow Chilli Malda', rating: 4.3, address: 'Malda, West Bengal 732101', description: 'Fine dining restaurant serving Indian and continental dishes.' }
    ],
    hospitals: [
        { name: 'Malda Medical College and Hospital', rating: 4.7, address: 'Malda, West Bengal 732101', description: 'Government hospital providing advanced medical facilities and patient care.' },
        { name: 'Life Care Hospital Malda', rating: 4.5, address: 'Malda, West Bengal 732101', description: 'Private hospital offering multi-specialty treatments.' },
        { name: 'City Hospital Malda', rating: 4.4, address: 'Malda, West Bengal 732101', description: 'Local hospital providing reliable healthcare services.' },
        { name: 'Apollo Clinic Malda', rating: 4.3, address: 'Malda, West Bengal 732101', description: 'Reputed clinic for outpatient care and diagnostics.' }
    ],
    touristSpots: [
        { name: 'Gour Mahavihara', rating: 4.9, address: 'Malda, West Bengal', description: 'Ancient Buddhist monastery ruins and UNESCO heritage site.' },
        { name: 'Adina Mosque', rating: 4.8, address: 'Malda, West Bengal', description: 'Historic mosque dating back to the 14th century, an architectural marvel.' },
        { name: 'Malda Museum', rating: 4.6, address: 'Malda, West Bengal', description: 'Museum displaying local history, artifacts, and cultural heritage.' },
        { name: 'Sujapur Park', rating: 4.5, address: 'Malda, West Bengal', description: 'Local park offering leisure and recreation for families.' }
    ]
},
'kharagpur': { 
    schools: [
        { name: 'St. Xavier’s School Kharagpur', rating: 4.8, address: 'Kharagpur, West Bengal 721301', description: 'Prestigious English-medium school focusing on academics and holistic development.' },
        { name: 'Delhi Public School Kharagpur', rating: 4.7, address: 'Kharagpur, West Bengal 721301', description: 'CBSE-affiliated school offering quality education and extracurricular programs.' },
        { name: 'Vidya Bharati Kharagpur', rating: 4.6, address: 'Kharagpur, West Bengal 721301', description: 'Well-known school emphasizing academics, discipline, and co-curricular activities.' },
        { name: 'Kendriya Vidyalaya Kharagpur', rating: 4.5, address: 'Kharagpur, West Bengal 721301', description: 'Government school providing modern facilities and quality education.' }
    ],
    restaurants: [
        { name: 'Zaika Restaurant Kharagpur', rating: 4.6, address: 'Kharagpur, West Bengal 721301', description: 'Popular for North Indian and Mughlai cuisine.' },
        { name: 'Spice Villa', rating: 4.5, address: 'Kharagpur, West Bengal 721301', description: 'Casual dining offering Indian and Chinese dishes.' },
        { name: 'Biryani House', rating: 4.4, address: 'Kharagpur, West Bengal 721301', description: 'Known for flavorful biryanis and traditional meals.' },
        { name: 'The Yellow Chilli Kharagpur', rating: 4.3, address: 'Kharagpur, West Bengal 721301', description: 'Fine dining restaurant serving Indian and continental dishes.' }
    ],
    hospitals: [
        { name: 'Kharagpur Sadar Hospital', rating: 4.5, address: 'Kharagpur, West Bengal 721301', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'Life Care Hospital Kharagpur', rating: 4.4, address: 'Kharagpur, West Bengal 721301', description: 'Private hospital offering multi-specialty treatments.' },
        { name: 'Apollo Clinic Kharagpur', rating: 4.3, address: 'Kharagpur, West Bengal 721301', description: 'Well-known clinic for outpatient care and diagnostics.' },
        { name: 'City Hospital Kharagpur', rating: 4.2, address: 'Kharagpur, West Bengal 721301', description: 'Local hospital providing reliable healthcare services.' }
    ],
    touristSpots: [
        { name: 'Indian Institute of Technology (IIT) Kharagpur Campus', rating: 4.8, address: 'Kharagpur, West Bengal', description: 'Prestigious IIT campus known for architecture and sprawling grounds.' },
        { name: 'Railway Museum Kharagpur', rating: 4.7, address: 'Kharagpur, West Bengal', description: 'Museum showcasing the history of Indian Railways.' },
        { name: 'Hijli Fort', rating: 4.6, address: 'Kharagpur, West Bengal', description: 'Historic fort with cultural significance and scenic surroundings.' },
        { name: 'Balmer Lawrie Park', rating: 4.5, address: 'Kharagpur, West Bengal', description: 'Local park offering recreation and outdoor activities for families.' }
    ]
},
'haldia': { 
    schools: [
        { name: 'Delhi Public School Haldia', rating: 4.8, address: 'Haldia, West Bengal 721607', description: 'CBSE-affiliated school offering quality education and extracurricular programs.' },
        { name: 'St. Thomas School Haldia', rating: 4.7, address: 'Haldia, West Bengal 721607', description: 'Renowned school focusing on academics and holistic development.' },
        { name: 'Jawahar Navodaya Vidyalaya Haldia', rating: 4.6, address: 'Haldia, West Bengal 721607', description: 'Well-known school emphasizing academics, discipline, and co-curricular activities.' },
        { name: 'Kendriya Vidyalaya Haldia', rating: 4.5, address: 'Haldia, West Bengal 721607', description: 'Government school providing modern facilities and quality education.' }
    ],
    restaurants: [
        { name: 'Zaika Restaurant Haldia', rating: 4.6, address: 'Haldia, West Bengal 721607', description: 'Popular for North Indian and Mughlai cuisine.' },
        { name: 'Spice Villa', rating: 4.5, address: 'Haldia, West Bengal 721607', description: 'Casual dining offering Indian and Chinese dishes.' },
        { name: 'Biryani House', rating: 4.4, address: 'Haldia, West Bengal 721607', description: 'Known for flavorful biryanis and traditional meals.' },
        { name: 'The Yellow Chilli Haldia', rating: 4.3, address: 'Haldia, West Bengal 721607', description: 'Fine dining restaurant serving Indian and continental dishes.' }
    ],
    hospitals: [
        { name: 'Haldia Sub-Divisional Hospital', rating: 4.5, address: 'Haldia, West Bengal 721607', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'Life Care Hospital Haldia', rating: 4.4, address: 'Haldia, West Bengal 721607', description: 'Private hospital offering multi-specialty treatments.' },
        { name: 'Apollo Clinic Haldia', rating: 4.3, address: 'Haldia, West Bengal 721607', description: 'Well-known clinic for outpatient care and diagnostics.' },
        { name: 'City Hospital Haldia', rating: 4.2, address: 'Haldia, West Bengal 721607', description: 'Local hospital providing reliable healthcare services.' }
    ],
    touristSpots: [
        { name: 'Haldia Port', rating: 4.8, address: 'Haldia, West Bengal', description: 'Major river port and industrial hub with scenic views along the Hooghly River.' },
        { name: 'Haldia Township Park', rating: 4.7, address: 'Haldia, West Bengal', description: 'Local park offering leisure and recreation for families.' },
        { name: 'Balighai Riverfront', rating: 4.6, address: 'Haldia, West Bengal', description: 'Scenic riverside spot popular for relaxation and photography.' },
        { name: 'Haldia Marine Aquarium', rating: 4.5, address: 'Haldia, West Bengal', description: 'Educational aquarium showcasing local marine life.' }
    ]
},
'ranaghat': { 
    schools: [
        { name: 'Ranaghat High School', rating: 4.8, address: 'Ranaghat, West Bengal 741201', description: 'Renowned school focusing on academics and holistic development.' },
        { name: 'Delhi Public School Ranaghat', rating: 4.7, address: 'Ranaghat, West Bengal 741201', description: 'CBSE-affiliated school offering quality education and extracurricular programs.' },
        { name: 'St. Xavier’s School Ranaghat', rating: 4.6, address: 'Ranaghat, West Bengal 741201', description: 'Well-known English-medium school emphasizing academics and co-curricular activities.' },
        { name: 'Kendriya Vidyalaya Ranaghat', rating: 4.5, address: 'Ranaghat, West Bengal 741201', description: 'Government school providing modern facilities and quality education.' }
    ],
    restaurants: [
        { name: 'Zaika Restaurant Ranaghat', rating: 4.6, address: 'Ranaghat, West Bengal 741201', description: 'Popular for North Indian and Mughlai cuisine.' },
        { name: 'Spice Villa', rating: 4.5, address: 'Ranaghat, West Bengal 741201', description: 'Casual dining offering Indian and Chinese dishes.' },
        { name: 'Biryani House', rating: 4.4, address: 'Ranaghat, West Bengal 741201', description: 'Known for flavorful biryanis and traditional meals.' },
        { name: 'The Yellow Chilli Ranaghat', rating: 4.3, address: 'Ranaghat, West Bengal 741201', description: 'Fine dining restaurant serving Indian and continental dishes.' }
    ],
    hospitals: [
        { name: 'Ranaghat Sub-Divisional Hospital', rating: 4.5, address: 'Ranaghat, West Bengal 741201', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'Life Care Hospital Ranaghat', rating: 4.4, address: 'Ranaghat, West Bengal 741201', description: 'Private hospital offering multi-specialty treatments.' },
        { name: 'Apollo Clinic Ranaghat', rating: 4.3, address: 'Ranaghat, West Bengal 741201', description: 'Well-known clinic for outpatient care and diagnostics.' },
        { name: 'City Hospital Ranaghat', rating: 4.2, address: 'Ranaghat, West Bengal 741201', description: 'Local hospital providing reliable healthcare services.' }
    ],
    touristSpots: [
        { name: 'Hanskhali Temple', rating: 4.8, address: 'Ranaghat, West Bengal', description: 'Famous Hindu temple attracting devotees and tourists.' },
        { name: 'Chakdaha Park', rating: 4.7, address: 'Ranaghat, West Bengal', description: 'Local park offering recreation and leisure activities.' },
        { name: 'Krishnanagar Rajbari', rating: 4.6, address: 'Near Ranaghat, West Bengal', description: 'Historic palace and cultural site with beautiful architecture.' },
        { name: 'Chandannagar Strand', rating: 4.5, address: 'Near Ranaghat, West Bengal', description: 'Riverside spot popular for sightseeing and photography.' }
    ]
},
'santipur': { 
    schools: [
        { name: 'Santipur High School', rating: 4.8, address: 'Santipur, West Bengal 741404', description: 'Well-known school focusing on academic excellence and holistic development.' },
        { name: 'Delhi Public School Santipur', rating: 4.7, address: 'Santipur, West Bengal 741404', description: 'CBSE-affiliated school offering quality education and extracurricular programs.' },
        { name: 'St. Xavier’s School Santipur', rating: 4.6, address: 'Santipur, West Bengal 741404', description: 'Renowned English-medium school emphasizing academics and co-curricular activities.' },
        { name: 'Kendriya Vidyalaya Santipur', rating: 4.5, address: 'Santipur, West Bengal 741404', description: 'Government school providing modern facilities and quality education.' }
    ],
    restaurants: [
        { name: 'Zaika Restaurant Santipur', rating: 4.6, address: 'Santipur, West Bengal 741404', description: 'Popular for North Indian and Mughlai cuisine.' },
        { name: 'Spice Villa', rating: 4.5, address: 'Santipur, West Bengal 741404', description: 'Casual dining offering Indian and Chinese dishes.' },
        { name: 'Biryani House', rating: 4.4, address: 'Santipur, West Bengal 741404', description: 'Known for flavorful biryanis and traditional meals.' },
        { name: 'The Yellow Chilli Santipur', rating: 4.3, address: 'Santipur, West Bengal 741404', description: 'Fine dining restaurant serving Indian and continental dishes.' }
    ],
    hospitals: [
        { name: 'Santipur Sub-Divisional Hospital', rating: 4.5, address: 'Santipur, West Bengal 741404', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'Life Care Hospital Santipur', rating: 4.4, address: 'Santipur, West Bengal 741404', description: 'Private hospital offering multi-specialty treatments.' },
        { name: 'Apollo Clinic Santipur', rating: 4.3, address: 'Santipur, West Bengal 741404', description: 'Well-known clinic for outpatient care and diagnostics.' },
        { name: 'City Hospital Santipur', rating: 4.2, address: 'Santipur, West Bengal 741404', description: 'Local hospital providing reliable healthcare services.' }
    ],
    touristSpots: [
        { name: 'Santipur Saree Market', rating: 4.8, address: 'Santipur, West Bengal', description: 'Famous market known for traditional handwoven sarees.' },
        { name: 'Krishnanagar Rajbari', rating: 4.7, address: 'Near Santipur, West Bengal', description: 'Historic palace and cultural site with beautiful architecture.' },
        { name: 'Chandannagar Strand', rating: 4.6, address: 'Near Santipur, West Bengal', description: 'Riverside spot popular for sightseeing and photography.' },
        { name: 'Local Kali Temple', rating: 4.5, address: 'Santipur, West Bengal', description: 'Famous Hindu temple attracting devotees and tourists.' }
    ]
},
'bangaon': { 
    schools: [
        { name: 'Bangaon High School', rating: 4.8, address: 'Bangaon, West Bengal 743235', description: 'Renowned school focusing on academic excellence and holistic development.' },
        { name: 'Delhi Public School Bangaon', rating: 4.7, address: 'Bangaon, West Bengal 743235', description: 'CBSE-affiliated school offering quality education and extracurricular programs.' },
        { name: 'St. Xavier’s School Bangaon', rating: 4.6, address: 'Bangaon, West Bengal 743235', description: 'English-medium school emphasizing academics and co-curricular activities.' },
        { name: 'Kendriya Vidyalaya Bangaon', rating: 4.5, address: 'Bangaon, West Bengal 743235', description: 'Government school providing modern facilities and quality education.' }
    ],
    restaurants: [
        { name: 'Zaika Restaurant Bangaon', rating: 4.6, address: 'Bangaon, West Bengal 743235', description: 'Popular for North Indian and Mughlai cuisine.' },
        { name: 'Spice Villa', rating: 4.5, address: 'Bangaon, West Bengal 743235', description: 'Casual dining offering Indian and Chinese dishes.' },
        { name: 'Biryani House', rating: 4.4, address: 'Bangaon, West Bengal 743235', description: 'Known for flavorful biryanis and traditional meals.' },
        { name: 'The Yellow Chilli Bangaon', rating: 4.3, address: 'Bangaon, West Bengal 743235', description: 'Fine dining restaurant serving Indian and continental dishes.' }
    ],
    hospitals: [
        { name: 'Bangaon Sub-Divisional Hospital', rating: 4.5, address: 'Bangaon, West Bengal 743235', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'Life Care Hospital Bangaon', rating: 4.4, address: 'Bangaon, West Bengal 743235', description: 'Private hospital offering multi-specialty treatments.' },
        { name: 'Apollo Clinic Bangaon', rating: 4.3, address: 'Bangaon, West Bengal 743235', description: 'Well-known clinic for outpatient care and diagnostics.' },
        { name: 'City Hospital Bangaon', rating: 4.2, address: 'Bangaon, West Bengal 743235', description: 'Local hospital providing reliable healthcare services.' }
    ],
    touristSpots: [
        { name: 'Bangaon Temple Complex', rating: 4.8, address: 'Bangaon, West Bengal', description: 'Famous Hindu temple complex attracting devotees and tourists.' },
        { name: 'Ichhamati Riverfront', rating: 4.7, address: 'Bangaon, West Bengal', description: 'Scenic riverside spot ideal for leisure and photography.' },
        { name: 'Local Heritage Museum', rating: 4.6, address: 'Bangaon, West Bengal', description: 'Museum showcasing regional history and culture.' },
        { name: 'Bangaon Park', rating: 4.5, address: 'Bangaon, West Bengal', description: 'Community park offering recreation and outdoor activities.' }
    ]
},
'barasat': { 
    schools: [
        { name: 'Barasat High School', rating: 4.8, address: 'Barasat, West Bengal 700124', description: 'Renowned school focusing on academic excellence and holistic development.' },
        { name: 'Delhi Public School Barasat', rating: 4.7, address: 'Barasat, West Bengal 700124', description: 'CBSE-affiliated school offering quality education and extracurricular programs.' },
        { name: 'St. Xavier’s School Barasat', rating: 4.6, address: 'Barasat, West Bengal 700124', description: 'English-medium school emphasizing academics and co-curricular activities.' },
        { name: 'Kendriya Vidyalaya Barasat', rating: 4.5, address: 'Barasat, West Bengal 700124', description: 'Government school providing modern facilities and quality education.' }
    ],
    restaurants: [
        { name: 'Zaika Restaurant Barasat', rating: 4.6, address: 'Barasat, West Bengal 700124', description: 'Popular for North Indian and Mughlai cuisine.' },
        { name: 'Spice Villa', rating: 4.5, address: 'Barasat, West Bengal 700124', description: 'Casual dining offering Indian and Chinese dishes.' },
        { name: 'Biryani House', rating: 4.4, address: 'Barasat, West Bengal 700124', description: 'Known for flavorful biryanis and traditional meals.' },
        { name: 'The Yellow Chilli Barasat', rating: 4.3, address: 'Barasat, West Bengal 700124', description: 'Fine dining restaurant serving Indian and continental dishes.' }
    ],
    hospitals: [
        { name: 'Barasat Sub-Divisional Hospital', rating: 4.5, address: 'Barasat, West Bengal 700124', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'Life Care Hospital Barasat', rating: 4.4, address: 'Barasat, West Bengal 700124', description: 'Private hospital offering multi-specialty treatments.' },
        { name: 'Apollo Clinic Barasat', rating: 4.3, address: 'Barasat, West Bengal 700124', description: 'Well-known clinic for outpatient care and diagnostics.' },
        { name: 'City Hospital Barasat', rating: 4.2, address: 'Barasat, West Bengal 700124', description: 'Local hospital providing reliable healthcare services.' }
    ],
    touristSpots: [
        { name: 'Barasat Rajbari', rating: 4.8, address: 'Barasat, West Bengal', description: 'Historic palace and cultural site showcasing regional architecture.' },
        { name: 'Mukutmanipur Dam', rating: 4.7, address: 'Near Barasat, West Bengal', description: 'Scenic dam and picnic spot ideal for sightseeing and leisure.' },
        { name: 'Ichhamati Riverfront', rating: 4.6, address: 'Barasat, West Bengal', description: 'Riverside area popular for leisure and photography.' },
        { name: 'Barasat Kali Temple', rating: 4.5, address: 'Barasat, West Bengal', description: 'Famous Hindu temple attracting devotees and tourists.' }
    ]
},
'krishnanagar': { 
    schools: [
        { name: 'Krishnanagar Collegiate School', rating: 4.8, address: 'Krishnanagar, West Bengal 741101', description: 'Historic institution providing excellent academic education since the 19th century.' },
        { name: 'St. Mary’s English School', rating: 4.7, address: 'Krishnanagar, West Bengal 741101', description: 'CBSE-affiliated school offering modern facilities and extracurricular programs.' },
        { name: 'Krishnanagar Public School', rating: 4.6, address: 'Krishnanagar, West Bengal 741101', description: 'Popular English-medium school emphasizing all-round student development.' },
        { name: 'Kendriya Vidyalaya Krishnanagar', rating: 4.5, address: 'Krishnanagar, West Bengal 741101', description: 'Government-run school providing quality education with modern infrastructure.' }
    ],
    restaurants: [
        { name: 'Royal Spice Restaurant', rating: 4.6, address: 'Krishnanagar, West Bengal 741101', description: 'Top-rated restaurant offering Indian and Mughlai cuisine.' },
        { name: 'Taste Town', rating: 4.5, address: 'Krishnanagar, West Bengal 741101', description: 'Casual dining serving Chinese, North Indian, and fast food dishes.' },
        { name: 'New Green View Restaurant', rating: 4.4, address: 'Krishnanagar, West Bengal 741101', description: 'Local favorite known for family-friendly atmosphere and good food.' },
        { name: 'Biryani House Krishnanagar', rating: 4.3, address: 'Krishnanagar, West Bengal 741101', description: 'Famous for authentic biryani and kebabs.' }
    ],
    hospitals: [
        { name: 'Krishnanagar District Hospital', rating: 4.6, address: 'Krishnanagar, West Bengal 741101', description: 'Government hospital providing quality healthcare services to the public.' },
        { name: 'Life Line Hospital', rating: 4.5, address: 'Krishnanagar, West Bengal 741101', description: 'Private multi-specialty hospital with advanced treatment facilities.' },
        { name: 'Apollo Clinic Krishnanagar', rating: 4.4, address: 'Krishnanagar, West Bengal 741101', description: 'Reputed healthcare center offering diagnostics and consultation services.' },
        { name: 'Nivedita Nursing Home', rating: 4.3, address: 'Krishnanagar, West Bengal 741101', description: 'Trusted local hospital providing maternity and general medical care.' }
    ],
    touristSpots: [
        { name: 'Rajbari Palace', rating: 4.8, address: 'Krishnanagar, West Bengal', description: 'Historic royal palace featuring elegant architecture and cultural heritage.' },
        { name: 'Ghurni Clay Artists’ Village', rating: 4.7, address: 'Krishnanagar, West Bengal', description: 'Famous for traditional clay sculpture artists and local crafts.' },
        { name: 'Chakdaha River Ghat', rating: 4.6, address: 'Near Krishnanagar, West Bengal', description: 'Peaceful riverside spot popular for picnics and photography.' },
        { name: 'Krishnanagar Cathedral Church', rating: 4.5, address: 'Krishnanagar, West Bengal', description: 'Beautiful church showcasing Gothic architecture and serene ambiance.' }
    ]
},
'berhampore': { 
    schools: [
        { name: 'Krishnath College School', rating: 4.8, address: 'Berhampore, West Bengal 742101', description: 'Prestigious school with a legacy of academic excellence and discipline.' },
        { name: 'Don Bosco School Berhampore', rating: 4.7, address: 'Berhampore, West Bengal 742101', description: 'English-medium Christian school known for its holistic education.' },
        { name: 'Berhampore Girls’ High School', rating: 4.6, address: 'Berhampore, West Bengal 742101', description: 'Reputed girls’ school with a focus on academics and extracurriculars.' },
        { name: 'Kendriya Vidyalaya Berhampore', rating: 4.5, address: 'Berhampore, West Bengal 742101', description: 'Central government school providing modern facilities and CBSE education.' }
    ],
    restaurants: [
        { name: 'Aahar Restaurant', rating: 4.6, address: 'Berhampore, West Bengal 742101', description: 'Well-known eatery serving Indian and Chinese cuisine in a cozy ambiance.' },
        { name: 'Food Plaza Berhampore', rating: 4.5, address: 'Berhampore, West Bengal 742101', description: 'Family-friendly restaurant with diverse North Indian dishes.' },
        { name: 'Momo Nation Café', rating: 4.4, address: 'Berhampore, West Bengal 742101', description: 'Popular for momos, noodles, and fast food among students and locals.' },
        { name: 'The Urban Bite', rating: 4.3, address: 'Berhampore, West Bengal 742101', description: 'Trendy restaurant offering Indian, Chinese, and continental dishes.' }
    ],
    hospitals: [
        { name: 'Berhampore New General Hospital', rating: 4.6, address: 'Berhampore, West Bengal 742101', description: 'Major government hospital providing affordable medical care.' },
        { name: 'Apollo Clinic Berhampore', rating: 4.5, address: 'Berhampore, West Bengal 742101', description: 'Multi-specialty diagnostic and healthcare center.' },
        { name: 'Lifeline Nursing Home', rating: 4.4, address: 'Berhampore, West Bengal 742101', description: 'Private nursing home known for general and maternity care.' },
        { name: 'Berhampore Medical Centre', rating: 4.3, address: 'Berhampore, West Bengal 742101', description: 'Local hospital offering emergency and outpatient services.' }
    ],
    touristSpots: [
        { name: 'Hazarduari Palace', rating: 4.9, address: 'Murshidabad, near Berhampore', description: 'Magnificent 19th-century palace built by Nawab Nazim Humayun Jah.' },
        { name: 'Katra Mosque', rating: 4.8, address: 'Murshidabad, near Berhampore', description: 'Historic mosque built by Murshid Quli Khan showcasing Mughal architecture.' },
        { name: 'Nizamat Imambara', rating: 4.7, address: 'Murshidabad, near Berhampore', description: 'One of the largest Shia congregational halls in India.' },
        { name: 'Motijheel Park', rating: 4.6, address: 'Murshidabad, near Berhampore', description: 'Beautiful lake and park area perfect for family outings.' }
    ]
},
'malda': { 
    schools: [
        { name: 'Malda Zilla School', rating: 4.8, address: 'English Bazar, Malda, West Bengal 732101', description: 'Oldest and most reputed government school in Malda offering quality education.' },
        { name: 'St. Xavier’s School Malda', rating: 4.7, address: 'Malda, West Bengal 732101', description: 'Renowned English-medium school emphasizing academics and moral education.' },
        { name: 'Techno India Group Public School', rating: 4.6, address: 'Malda, West Bengal 732101', description: 'Modern CBSE-affiliated school with focus on science and technology.' },
        { name: 'Kendriya Vidyalaya Malda', rating: 4.5, address: 'Malda, West Bengal 732101', description: 'Central government school providing education with holistic development.' }
    ],
    restaurants: [
        { name: 'The Spice Lounge', rating: 4.6, address: 'English Bazar, Malda, West Bengal 732101', description: 'Popular multi-cuisine restaurant offering North Indian and Chinese dishes.' },
        { name: 'Biryani House Malda', rating: 4.5, address: 'Malda, West Bengal 732101', description: 'Famous for aromatic biryanis and Mughlai cuisine.' },
        { name: 'Urban Bite', rating: 4.4, address: 'Malda, West Bengal 732101', description: 'Casual family restaurant serving Indian and continental meals.' },
        { name: 'Wow! Momo Malda', rating: 4.3, address: 'English Bazar, Malda, West Bengal 732101', description: 'Fast food outlet known for momos and quick bites.' }
    ],
    hospitals: [
        { name: 'Malda Medical College and Hospital', rating: 4.7, address: 'English Bazar, Malda, West Bengal 732101', description: 'Government-run medical college and hospital providing advanced healthcare.' },
        { name: 'Life Line Hospital Malda', rating: 4.5, address: 'Malda, West Bengal 732101', description: 'Private hospital offering multi-specialty medical care.' },
        { name: 'Apollo Clinic Malda', rating: 4.4, address: 'Malda, West Bengal 732101', description: 'Modern diagnostic and treatment center with expert doctors.' },
        { name: 'Nursing Home & Diagnostic Centre', rating: 4.3, address: 'Malda, West Bengal 732101', description: 'Trusted healthcare center for local residents.' }
    ],
    touristSpots: [
        { name: 'Gour', rating: 4.9, address: '12 km from Malda, West Bengal', description: 'Ancient city with stunning ruins of medieval mosques and temples.' },
        { name: 'Adina Mosque', rating: 4.8, address: 'Pandua, near Malda', description: 'One of the largest mosques in India, built in the 14th century.' },
        { name: 'Pandua Ruins', rating: 4.7, address: 'Pandua, near Malda', description: 'Historical site with remnants of Sultanate architecture.' },
        { name: 'Lukechhipi Park', rating: 4.5, address: 'Malda, West Bengal', description: 'Local park and picnic area popular among families and tourists.' }
    ]
},
'jalpaiguri': { 
    schools: [
        { name: 'Jalpaiguri Zilla School', rating: 4.8, address: 'Jalpaiguri, West Bengal 735101', description: 'Historic government school providing quality education since the British era.' },
        { name: 'St. Joseph’s School', rating: 4.7, address: 'Jalpaiguri, West Bengal 735101', description: 'English-medium school emphasizing academic and moral excellence.' },
        { name: 'Techno India Group Public School', rating: 4.6, address: 'Jalpaiguri, West Bengal 735101', description: 'Modern CBSE-affiliated school with advanced learning facilities.' },
        { name: 'Kendriya Vidyalaya Jalpaiguri', rating: 4.5, address: 'Jalpaiguri, West Bengal 735101', description: 'Government-run central school offering holistic education.' }
    ],
    restaurants: [
        { name: 'Flavours Restaurant', rating: 4.7, address: 'Jalpaiguri, West Bengal 735101', description: 'Popular for its North Indian and Chinese dishes in a cozy setting.' },
        { name: 'Royal Tadka', rating: 4.6, address: 'Jalpaiguri, West Bengal 735101', description: 'Family restaurant serving authentic Indian cuisine.' },
        { name: 'Tandoori Darbar', rating: 4.5, address: 'Jalpaiguri, West Bengal 735101', description: 'Famous for tandoori items and Mughlai food.' },
        { name: 'Momo Nation Café', rating: 4.4, address: 'Jalpaiguri, West Bengal 735101', description: 'Trendy eatery known for momos, fast food, and beverages.' }
    ],
    hospitals: [
        { name: 'Jalpaiguri District Hospital', rating: 4.6, address: 'Jalpaiguri, West Bengal 735101', description: 'Main government hospital offering extensive healthcare facilities.' },
        { name: 'Anandaloke Hospital & Critical Care Centre', rating: 4.5, address: 'Jalpaiguri, West Bengal 735101', description: 'Multi-specialty hospital with modern diagnostic services.' },
        { name: 'Apollo Clinic Jalpaiguri', rating: 4.4, address: 'Jalpaiguri, West Bengal 735101', description: 'Renowned clinic offering quality consultations and health checkups.' },
        { name: 'Life Care Nursing Home', rating: 4.3, address: 'Jalpaiguri, West Bengal 735101', description: 'Private nursing home providing general and maternity services.' }
    ],
    touristSpots: [
        { name: 'Gorumara National Park', rating: 4.9, address: 'Lataguri, near Jalpaiguri', description: 'Famous wildlife sanctuary known for one-horned rhinoceroses.' },
        { name: 'Jaldapara Wildlife Sanctuary', rating: 4.8, address: 'Near Jalpaiguri, West Bengal', description: 'Elephant reserve offering jungle safaris and nature experiences.' },
        { name: 'Teesta River Viewpoint', rating: 4.7, address: 'Jalpaiguri, West Bengal', description: 'Scenic spot overlooking the Teesta River and its lush surroundings.' },
        { name: 'Buxa Fort', rating: 4.6, address: 'Buxa, near Jalpaiguri', description: 'Historic fort located amidst the scenic Dooars hills.' }
    ]
},
'darjeeling': { 
    schools: [
        { name: 'St. Paul’s School', rating: 4.9, address: 'Jalapahar, Darjeeling, West Bengal 734103', description: 'One of India’s oldest and most prestigious boarding schools with a scenic campus.' },
        { name: 'Loreto Convent', rating: 4.8, address: 'Chauk Bazaar, Darjeeling, West Bengal 734101', description: 'Renowned girls’ school emphasizing academics and holistic education.' },
        { name: 'Mount Hermon School', rating: 4.7, address: 'North Point, Darjeeling, West Bengal 734104', description: 'Historic co-educational boarding school offering ICSE and ISC curriculum.' },
        { name: 'St. Joseph’s School (North Point)', rating: 4.8, address: 'North Point, Darjeeling, West Bengal 734104', description: 'Jesuit-run school known for academic excellence and discipline.' }
    ],
    restaurants: [
        { name: 'Kunga Restaurant', rating: 4.8, address: 'Chauk Bazaar, Darjeeling, West Bengal 734101', description: 'Family-run Tibetan restaurant famous for momos and thukpa.' },
        { name: 'Glenary’s Bakery & Café', rating: 4.9, address: 'Nehru Road, Darjeeling, West Bengal 734101', description: 'Iconic colonial-era café serving continental and bakery delights.' },
        { name: 'Sonam’s Kitchen', rating: 4.7, address: 'Dr. Zakir Hussain Rd, Darjeeling, West Bengal 734101', description: 'Cozy café offering breakfast, pancakes, and good coffee.' },
        { name: 'Keventer’s', rating: 4.8, address: 'Nehru Road, Darjeeling, West Bengal 734101', description: 'Famous heritage eatery known for sausages, sandwiches, and milkshakes.' }
    ],
    hospitals: [
        { name: 'Darjeeling District Hospital', rating: 4.6, address: 'Lebong Cart Road, Darjeeling, West Bengal 734104', description: 'Main government hospital providing general medical services.' },
        { name: 'Planters Hospital', rating: 4.5, address: 'Chowrasta, Darjeeling, West Bengal 734101', description: 'Private hospital catering to residents and tourists alike.' },
        { name: 'Lions Eye Hospital', rating: 4.4, address: 'Darjeeling, West Bengal 734101', description: 'Specialized eye hospital providing advanced ophthalmic care.' },
        { name: 'Jubilee Sanatorium', rating: 4.3, address: 'Lebong, Darjeeling, West Bengal 734104', description: 'Old sanatorium offering general and respiratory care.' }
    ],
    touristSpots: [
        { name: 'Tiger Hill', rating: 4.9, address: 'Darjeeling, West Bengal 734101', description: 'Famous sunrise viewpoint overlooking Mount Kanchenjunga.' },
        { name: 'Batasia Loop', rating: 4.8, address: 'Darjeeling, West Bengal 734102', description: 'Scenic railway loop with panoramic views and war memorial.' },
        { name: 'Darjeeling Himalayan Railway', rating: 4.9, address: 'Darjeeling, West Bengal 734101', description: 'UNESCO World Heritage toy train route offering scenic rides.' },
        { name: 'Peace Pagoda', rating: 4.7, address: 'West Point, Darjeeling, West Bengal 734104', description: 'Japanese-built Buddhist pagoda offering tranquility and views.' }
    ]
},
'siliguri': { 
    schools: [
        { name: 'Delhi Public School Siliguri', rating: 4.8, address: 'Dagapur, Siliguri, West Bengal 734003', description: 'CBSE-affiliated school offering modern facilities and excellent academics.' },
        { name: 'Don Bosco School', rating: 4.7, address: 'Sevoke Road, Siliguri, West Bengal 734001', description: 'Renowned school focusing on academics and character building.' },
        { name: 'St. Joseph’s High School', rating: 4.6, address: 'Hill Cart Road, Siliguri, West Bengal 734003', description: 'One of Siliguri’s oldest and most reputed institutions.' },
        { name: 'Nirmala Convent School', rating: 4.5, address: 'Pradhan Nagar, Siliguri, West Bengal 734003', description: 'Popular ICSE school providing holistic education for all-round growth.' }
    ],
    restaurants: [
        { name: 'Around the Corner', rating: 4.8, address: 'Sevoke Road, Siliguri, West Bengal 734001', description: 'Trendy café serving continental and Asian cuisine.' },
        { name: 'Hi Spirits Café', rating: 4.7, address: 'Don Bosco More, Siliguri, West Bengal 734001', description: 'Lively café offering snacks, coffee, and great ambiance.' },
        { name: 'Indian Pagoda', rating: 4.6, address: 'Sevoke Road, Siliguri, West Bengal 734001', description: 'Famous multi-cuisine restaurant serving Indian and Chinese dishes.' },
        { name: 'The Loft Café & Restaurant', rating: 4.7, address: 'Don Bosco Colony, Siliguri, West Bengal 734001', description: 'Stylish dining space with fusion food and rooftop seating.' }
    ],
    hospitals: [
        { name: 'Neotia Getwel Healthcare Centre', rating: 4.8, address: 'Matigara, Siliguri, West Bengal 734010', description: 'Modern multi-specialty hospital providing quality healthcare.' },
        { name: 'Anandaloke Hospital', rating: 4.6, address: 'Sevoke Road, Siliguri, West Bengal 734001', description: 'Popular healthcare facility with advanced diagnostics and emergency care.' },
        { name: 'North Bengal Medical College & Hospital', rating: 4.5, address: 'Sushrutanagar, Siliguri, West Bengal 734012', description: 'Major government hospital serving the region.' },
        { name: 'Dr. Chhang’s Super Specialty Hospital', rating: 4.7, address: 'Sevoke Road, Siliguri, West Bengal 734001', description: 'Private hospital offering multi-specialty treatment and surgical care.' }
    ],
    touristSpots: [
        { name: 'Mahananda Wildlife Sanctuary', rating: 4.8, address: 'Sevoke, Siliguri, West Bengal 734005', description: 'Lush sanctuary with elephants, leopards, and birdwatching trails.' },
        { name: 'Coronation Bridge', rating: 4.7, address: 'Sevoke, Siliguri, West Bengal 734005', description: 'Historic British-era bridge over the Teesta River offering scenic views.' },
        { name: 'ISKCON Temple Siliguri', rating: 4.8, address: 'ISKCON Road, Siliguri, West Bengal 734001', description: 'Beautiful temple dedicated to Lord Krishna with serene surroundings.' },
        { name: 'Salugara Monastery', rating: 4.6, address: 'Salugara, Siliguri, West Bengal 734008', description: 'Peaceful Buddhist monastery with a 100-foot stupa built by Tibetan monks.' }
    ]
},
'darjeeling': { 
    schools: [
        { name: 'St. Paul’s School', rating: 4.9, address: 'Jalapahar, Darjeeling, West Bengal 734103', description: 'One of India’s oldest and most prestigious boarding schools.' },
        { name: 'Loreto Convent School', rating: 4.8, address: 'Lebong Cart Road, Darjeeling, West Bengal 734104', description: 'Renowned girls’ school known for academic excellence and discipline.' },
        { name: 'Mount Hermon School', rating: 4.7, address: 'North Point, Darjeeling, West Bengal 734104', description: 'Historic school offering ICSE curriculum with scenic campus.' },
        { name: 'St. Joseph’s School (North Point)', rating: 4.9, address: 'North Point, Darjeeling, West Bengal 734104', description: 'Premier Jesuit-run institution with a long legacy of excellence.' }
    ],
    restaurants: [
        { name: 'Glenary’s', rating: 4.8, address: 'Nehru Road, Darjeeling, West Bengal 734101', description: 'Famous bakery and restaurant offering continental dishes with a colonial charm.' },
        { name: 'Kunga Restaurant', rating: 4.7, address: 'Gandhi Road, Darjeeling, West Bengal 734101', description: 'Popular Tibetan restaurant serving momos, thukpa, and local delicacies.' },
        { name: 'Sonam’s Kitchen', rating: 4.6, address: 'Dr. Zakir Hussain Road, Darjeeling, West Bengal 734101', description: 'Cozy spot offering English breakfast and homemade food.' },
        { name: 'Revolver Restaurant', rating: 4.5, address: 'Gandhi Road, Darjeeling, West Bengal 734101', description: 'Themed restaurant inspired by The Beatles, serving Nepali and Indian dishes.' }
    ],
    hospitals: [
        { name: 'Darjeeling District Hospital', rating: 4.5, address: 'Laden La Road, Darjeeling, West Bengal 734101', description: 'Major government hospital serving the hill region.' },
        { name: 'Planters Hospital', rating: 4.6, address: 'Lal Kothi Road, Darjeeling, West Bengal 734101', description: 'Multi-specialty private hospital providing essential healthcare services.' },
        { name: 'Himalayan Nursing Home', rating: 4.4, address: 'Lebong Cart Road, Darjeeling, West Bengal 734104', description: 'Trusted local healthcare center with experienced staff.' },
        { name: 'Goodricke Medical Centre', rating: 4.5, address: 'North Point, Darjeeling, West Bengal 734104', description: 'Healthcare facility serving tea garden workers and residents.' }
    ],
    touristSpots: [
        { name: 'Tiger Hill', rating: 4.9, address: 'Darjeeling, West Bengal 734104', description: 'Famous sunrise point offering panoramic views of Mount Kanchenjunga.' },
        { name: 'Batasia Loop', rating: 4.8, address: 'Hill Cart Road, Darjeeling, West Bengal 734102', description: 'Iconic spiral railway track with beautiful gardens and a war memorial.' },
        { name: 'Padmaja Naidu Himalayan Zoological Park', rating: 4.7, address: 'Jawahar Parbat, Darjeeling, West Bengal 734101', description: 'High-altitude zoo home to snow leopards and red pandas.' },
        { name: 'Peace Pagoda', rating: 4.8, address: 'Jalapahar Hill, Darjeeling, West Bengal 734104', description: 'Buddhist shrine offering peaceful atmosphere and stunning views.' }
    ]
},
'krishnanagar': { 
    schools: [
        { name: 'St. Joseph’s Convent High School', rating: 4.8, address: 'Don Bosco Road, Krishnanagar, West Bengal 741101', description: 'Reputed convent school known for its quality education and discipline.' },
        { name: 'Krishnanagar Collegiate School', rating: 4.7, address: 'R.N. Tagore Road, Krishnanagar, West Bengal 741101', description: 'Historic government school offering strong academics and co-curriculars.' },
        { name: 'Julien Day School', rating: 4.6, address: 'Bhatjangla, Krishnanagar, West Bengal 741101', description: 'Private English-medium school affiliated with ICSE board.' },
        { name: 'St. Mary’s English School', rating: 4.5, address: 'P.O. Krishnanagar, West Bengal 741101', description: 'Popular CBSE school offering modern learning environment.' }
    ],
    restaurants: [
        { name: 'Krishnagar Rajbhog', rating: 4.7, address: 'R.N. Tagore Road, Krishnanagar, West Bengal 741101', description: 'Famous for Bengali sweets, especially chhana-based delicacies.' },
        { name: 'The Food Court', rating: 4.6, address: 'Nadia District, Krishnanagar, West Bengal 741101', description: 'Modern restaurant serving Indian, Chinese, and continental dishes.' },
        { name: 'Aahar Restaurant', rating: 4.5, address: 'N.S. Road, Krishnanagar, West Bengal 741101', description: 'Casual dining place offering North Indian and Bengali food.' },
        { name: 'The Hangout Café', rating: 4.4, address: 'Cinema Road, Krishnanagar, West Bengal 741101', description: 'Trendy café popular among youth for snacks and beverages.' }
    ],
    hospitals: [
        { name: 'Krishnanagar District Hospital', rating: 4.5, address: 'Nadia, Krishnanagar, West Bengal 741101', description: 'Main government hospital serving the district with general facilities.' },
        { name: 'Narayana Multispeciality Hospital', rating: 4.7, address: 'Bhatjangla, Krishnanagar, West Bengal 741101', description: 'Modern private hospital providing quality medical care.' },
        { name: 'Krishnanagar Nursing Home', rating: 4.4, address: 'Bosepara, Krishnanagar, West Bengal 741101', description: 'Private healthcare facility offering maternity and surgical services.' },
        { name: 'Apollo Diagnostic Centre', rating: 4.6, address: 'R.N. Tagore Road, Krishnanagar, West Bengal 741101', description: 'Advanced diagnostic and pathology services in the city.' }
    ],
    touristSpots: [
        { name: 'Rajbari Palace', rating: 4.8, address: 'Nadia District, Krishnanagar, West Bengal 741101', description: 'Historic royal palace known for its architecture and cultural importance.' },
        { name: 'Roman Catholic Church', rating: 4.7, address: 'Don Bosco Road, Krishnanagar, West Bengal 741101', description: 'Beautiful old church known for its peaceful ambiance and design.' },
        { name: 'Ghurni Clay Modellers Village', rating: 4.8, address: 'Ghurni, Krishnanagar, West Bengal 741101', description: 'Famous for traditional clay sculptures and artisan workshops.' },
        { name: 'Jalangi River Bank', rating: 4.6, address: 'Krishnanagar, West Bengal 741101', description: 'Scenic riverside area ideal for relaxation and evening walks.' }
    ]
},
'coochbehar': { 
    schools: [
        { name: 'Kendriya Vidyalaya Cooch Behar', rating: 4.8, address: 'Kalyani, Cooch Behar, West Bengal 736101', description: 'CBSE-affiliated school providing high-quality education and co-curriculars.' },
        { name: 'Don Bosco School', rating: 4.7, address: 'Madan Mohan Road, Cooch Behar, West Bengal 736101', description: 'Renowned private school offering holistic education and discipline.' },
        { name: 'Cooch Behar Jenkins School', rating: 4.6, address: 'Cooch Behar, West Bengal 736101', description: 'Historic government school with a strong academic reputation.' },
        { name: 'Sunity Academy', rating: 4.5, address: 'Sunity Road, Cooch Behar, West Bengal 736101', description: 'Popular school for science and arts education, affiliated to WBBSE.' }
    ],
    restaurants: [
        { name: 'The Royal Dine', rating: 4.7, address: 'Sunity Road, Cooch Behar, West Bengal 736101', description: 'Upscale restaurant serving Indian and Chinese cuisines.' },
        { name: 'Food Factory', rating: 4.6, address: 'Cooch Behar, West Bengal 736101', description: 'Modern eatery known for fast food and family-friendly ambiance.' },
        { name: 'Kasturi Restaurant', rating: 4.5, address: 'Madan Mohan Road, Cooch Behar, West Bengal 736101', description: 'Authentic Bengali cuisine restaurant famous for fish and sweets.' },
        { name: 'Aahar Family Restaurant', rating: 4.4, address: 'BS Road, Cooch Behar, West Bengal 736101', description: 'Casual dining spot serving Indian and continental food.' }
    ],
    hospitals: [
        { name: 'MJN Medical College & Hospital', rating: 4.6, address: 'Cooch Behar, West Bengal 736101', description: 'Major government medical institution offering multi-specialty care.' },
        { name: 'Cooch Behar District Hospital', rating: 4.5, address: 'Sunity Road, Cooch Behar, West Bengal 736101', description: 'Main public healthcare facility serving local residents.' },
        { name: 'Apollo Clinic', rating: 4.7, address: 'BS Road, Cooch Behar, West Bengal 736101', description: 'Private diagnostic and healthcare center providing modern services.' },
        { name: 'New Life Nursing Home', rating: 4.4, address: 'Kalyani, Cooch Behar, West Bengal 736101', description: 'Trusted local hospital for maternity and general treatment.' }
    ],
    touristSpots: [
        { name: 'Cooch Behar Rajbari Palace', rating: 4.9, address: 'Sunity Road, Cooch Behar, West Bengal 736101', description: 'Magnificent royal palace showcasing Indo-Saracenic architecture.' },
        { name: 'Madan Mohan Temple', rating: 4.8, address: 'Cooch Behar, West Bengal 736101', description: 'Ancient Hindu temple dedicated to Lord Krishna and Balaram.' },
        { name: 'Sagardighi', rating: 4.7, address: 'Near Rajbari, Cooch Behar, West Bengal 736101', description: 'Scenic lake surrounded by colonial-era buildings and temples.' },
        { name: 'Baneswar Shiva Temple', rating: 4.6, address: 'Baneswar, Cooch Behar, West Bengal 736133', description: 'Historic Shiva temple with a pond of sacred turtles.' }
    ]
},
'midnapore': { 
    schools: [
        { name: 'Kendriya Vidyalaya Midnapore', rating: 4.7, address: 'Vidyasagar University Campus, Midnapore, West Bengal 721102', description: 'CBSE school known for academic excellence and holistic learning.' },
        { name: 'St. Paul’s School', rating: 4.6, address: 'Rangamati, Midnapore, West Bengal 721101', description: 'Well-reputed English-medium school emphasizing discipline and values.' },
        { name: 'Midnapore Collegiate School', rating: 4.8, address: 'Midnapore Town, West Bengal 721101', description: 'Historic institution providing quality secondary education.' },
        { name: 'DAV Public School', rating: 4.5, address: 'Chandrakona Road, Midnapore, West Bengal 721201', description: 'Renowned private school focusing on academics and character development.' }
    ],
    restaurants: [
        { name: 'Royal Spice Restaurant', rating: 4.7, address: 'Rangamati, Midnapore, West Bengal 721101', description: 'Popular family restaurant serving North Indian and Chinese cuisines.' },
        { name: 'Food Junction', rating: 4.6, address: 'Station Road, Midnapore, West Bengal 721101', description: 'Casual dining spot known for affordable and tasty meals.' },
        { name: 'Taste of Bengal', rating: 4.5, address: 'Panskura Road, Midnapore, West Bengal 721101', description: 'Authentic Bengali food served with homely flavors.' },
        { name: 'The Café Adda', rating: 4.4, address: 'Vidyasagar University Area, Midnapore, West Bengal 721102', description: 'Trendy café popular among students and young professionals.' }
    ],
    hospitals: [
        { name: 'Midnapore Medical College and Hospital', rating: 4.7, address: 'Vidyasagar Road, Midnapore, West Bengal 721101', description: 'Leading government hospital offering multi-specialty healthcare.' },
        { name: 'Life Line Nursing Home', rating: 4.5, address: 'Rangamati, Midnapore, West Bengal 721101', description: 'Private healthcare facility with good emergency and maternity care.' },
        { name: 'Rama Krishna Mission Seva Pratishthan', rating: 4.6, address: 'Midnapore Town, West Bengal 721101', description: 'Charitable hospital offering compassionate medical services.' },
        { name: 'Apollo Diagnostics', rating: 4.4, address: 'Station Road, Midnapore, West Bengal 721101', description: 'Advanced diagnostic center with pathology and imaging services.' }
    ],
    touristSpots: [
        { name: 'Chandrakona Fort', rating: 4.7, address: 'Chandrakona, Midnapore, West Bengal 721201', description: 'Historic fort showcasing medieval architecture and scenic surroundings.' },
        { name: 'Jhargram Palace', rating: 4.8, address: 'Jhargram, West Bengal 721507', description: 'Beautiful heritage palace and popular tourist destination.' },
        { name: 'Gopegarh Eco Park', rating: 4.6, address: 'Gopegarh, Midnapore, West Bengal 721102', description: 'Eco-tourism park ideal for picnics and nature walks.' },
        { name: 'Karnagarh Temple Complex', rating: 4.7, address: 'Karnagarh, Midnapore, West Bengal 721101', description: 'Ancient temple complex dedicated to Goddess Durga and Lord Shiva.' }
    ]
},
'suri': { 
    schools: [
        { name: 'Suri Vidyasagar College', rating: 4.7, address: 'College Road, Suri, West Bengal 731101', description: 'Prestigious institution offering higher secondary and degree programs.' },
        { name: 'Suri Balika Vidyapith', rating: 4.6, address: 'Rabindra Pally, Suri, West Bengal 731101', description: 'Renowned girls’ school providing quality education under WBBSE board.' },
        { name: 'Suri High School', rating: 4.5, address: 'Suri Town, West Bengal 731101', description: 'Government-aided school with strong academic results and experienced faculty.' },
        { name: 'St. Mary’s English School', rating: 4.6, address: 'Bolpur Road, Suri, West Bengal 731101', description: 'English-medium school focusing on modern learning methods and co-curriculars.' }
    ],
    restaurants: [
        { name: 'Flavours Restaurant', rating: 4.7, address: 'Suri Bus Stand, Suri, West Bengal 731101', description: 'Multi-cuisine restaurant serving Indian, Chinese, and continental dishes.' },
        { name: 'The Hungry Bowl', rating: 4.6, address: 'Station Road, Suri, West Bengal 731101', description: 'Popular spot for snacks, biryani, and fast food.' },
        { name: 'Aahar Veg Restaurant', rating: 4.5, address: 'Court More, Suri, West Bengal 731101', description: 'Pure vegetarian restaurant offering North and South Indian meals.' },
        { name: 'Adda Junction Café', rating: 4.4, address: 'Rabindra Pally, Suri, West Bengal 731101', description: 'Trendy café known for its coffee, burgers, and lively ambiance.' }
    ],
    hospitals: [
        { name: 'Suri Sadar Hospital', rating: 4.5, address: 'Hospital Road, Suri, West Bengal 731101', description: 'Main government hospital providing general and emergency healthcare.' },
        { name: 'Life Line Nursing Home', rating: 4.6, address: 'Court More, Suri, West Bengal 731101', description: 'Private nursing home offering multi-specialty services.' },
        { name: 'Apollo Diagnostics', rating: 4.4, address: 'Bolpur Road, Suri, West Bengal 731101', description: 'Diagnostic center with advanced pathology and imaging facilities.' },
        { name: 'Medicare Clinic', rating: 4.5, address: 'Suri Town, West Bengal 731101', description: 'Private clinic providing quality consultation and healthcare.' }
    ],
    touristSpots: [
        { name: 'Bakreshwar Temple', rating: 4.8, address: 'Bakreshwar, near Suri, West Bengal 731102', description: 'Sacred temple dedicated to Lord Shiva with nearby hot springs.' },
        { name: 'Hot Springs of Bakreshwar', rating: 4.7, address: 'Bakreshwar, Birbhum, near Suri, West Bengal 731102', description: 'Natural geothermal springs attracting devotees and tourists alike.' },
        { name: 'Tarapith Temple', rating: 4.9, address: 'Tarapith, near Suri, West Bengal 731233', description: 'Famous Shakti Peeth temple dedicated to Goddess Tara.' },
        { name: 'Amra Forest Park', rating: 4.5, address: 'Suri-Bolpur Road, Suri, West Bengal 731101', description: 'Peaceful park ideal for picnics and nature walks.' }
    ]
},
'kalyani': { 
    schools: [
        { name: 'Kalyani Central Model School', rating: 4.7, address: 'B-9/428, Kalyani, Nadia, West Bengal 741235', description: 'Reputed CBSE school offering holistic education and extracurricular development.' },
        { name: 'Springdale High School', rating: 4.6, address: 'A-Block, Kalyani, Nadia, West Bengal 741235', description: 'English-medium school known for academic excellence and discipline.' },
        { name: 'Kalyani Public School', rating: 4.5, address: 'B-11/345, Kalyani, West Bengal 741235', description: 'Modern CBSE school with focus on science and co-curricular activities.' },
        { name: 'St. Francis High School', rating: 4.6, address: 'A-5 Block, Kalyani, West Bengal 741235', description: 'Catholic school providing quality education and character building.' }
    ],
    restaurants: [
        { name: 'Food Planet', rating: 4.7, address: 'B-8/156, Kalyani, West Bengal 741235', description: 'Popular family restaurant serving Indian, Chinese, and continental dishes.' },
        { name: 'Spice Garden', rating: 4.6, address: 'Kalyani Main Road, West Bengal 741235', description: 'Multi-cuisine restaurant offering authentic Bengali and Mughlai food.' },
        { name: 'The Coffee Jar', rating: 4.5, address: 'A-Block Market, Kalyani, West Bengal 741235', description: 'Trendy café known for coffee, snacks, and cozy atmosphere.' },
        { name: 'Roll Express', rating: 4.4, address: 'Kalyani Ghoshpara Road, West Bengal 741235', description: 'Fast food outlet famous for kathi rolls and biryani.' }
    ],
    hospitals: [
        { name: 'Kalyani AIIMS', rating: 4.8, address: 'NH-34, Kalyani, West Bengal 741245', description: 'All India Institute of Medical Sciences offering advanced medical facilities.' },
        { name: 'Jawaharlal Nehru Memorial Hospital', rating: 4.7, address: 'A-Block, Kalyani, West Bengal 741235', description: 'Large government hospital providing multi-specialty care.' },
        { name: 'Kalyani ESI Hospital', rating: 4.5, address: 'Industrial Area, Kalyani, West Bengal 741235', description: 'ESI hospital serving industrial employees and general public.' },
        { name: 'Sparsh Diagnostic & Nursing Home', rating: 4.4, address: 'B-8/243, Kalyani, West Bengal 741235', description: 'Private healthcare center offering diagnostics and emergency care.' }
    ],
    touristSpots: [
        { name: 'Kalyani Lake Park', rating: 4.7, address: 'Central Park Area, Kalyani, West Bengal 741235', description: 'Beautiful lake park ideal for picnics, boating, and nature walks.' },
        { name: 'Central Park Kalyani', rating: 4.6, address: 'A-Block, Kalyani, West Bengal 741235', description: 'Green urban park with jogging tracks and children’s play zones.' },
        { name: 'Kalyani Stadium', rating: 4.5, address: 'B-10, Kalyani, West Bengal 741235', description: 'Sports complex hosting football and cricket matches.' },
        { name: 'Kalyani Bridge Viewpoint', rating: 4.4, address: 'Kalyani Ghoshpara Road, West Bengal 741235', description: 'Scenic spot offering panoramic views of the Hooghly River.' }
    ]
},
'dinhata': { 
    schools: [
        { name: 'Dinhata High School', rating: 4.7, address: 'Dinhata College Road, Cooch Behar, West Bengal 736135', description: 'Oldest and most reputed higher secondary school in Dinhata with good academic results.' },
        { name: 'St. Joseph’s School', rating: 4.6, address: 'Ward No. 5, Dinhata, West Bengal 736135', description: 'English-medium institution focusing on value-based education and discipline.' },
        { name: 'Dinhata Girls’ High School', rating: 4.5, address: 'College Para, Dinhata, West Bengal 736135', description: 'Leading government girls’ school offering strong academic and cultural programs.' },
        { name: 'Dinhata Public School', rating: 4.4, address: 'Dinhata-Balabhut Road, West Bengal 736135', description: 'CBSE-affiliated school known for co-curricular excellence and digital learning.' }
    ],
    restaurants: [
        { name: 'Hotel Rajdeep Restaurant', rating: 4.7, address: 'Station Road, Dinhata, West Bengal 736135', description: 'Popular family restaurant serving Indian and Chinese cuisine.' },
        { name: 'Food Hub', rating: 4.6, address: 'College Para, Dinhata, West Bengal 736135', description: 'Casual dining restaurant offering fast food, tandoori, and biryani dishes.' },
        { name: 'Dinhata Cafe House', rating: 4.5, address: 'Main Market, Dinhata, West Bengal 736135', description: 'Modern café with coffee, snacks, and light meals.' },
        { name: 'Taste Junction', rating: 4.4, address: 'Hospital Road, Dinhata, West Bengal 736135', description: 'Local eatery famous for momos, rolls, and noodles.' }
    ],
    hospitals: [
        { name: 'Dinhata Sub-Divisional Hospital', rating: 4.6, address: 'Hospital Road, Dinhata, West Bengal 736135', description: 'Main government hospital providing healthcare services to nearby regions.' },
        { name: 'Dinhata Nursing Home', rating: 4.5, address: 'College Para, Dinhata, West Bengal 736135', description: 'Private medical facility with general and maternity services.' },
        { name: 'Seba Clinic', rating: 4.4, address: 'Main Road, Dinhata, West Bengal 736135', description: 'Multi-specialty clinic offering diagnostics and consultations.' },
        { name: 'Cooch Behar Health Centre (Dinhata Branch)', rating: 4.4, address: 'Station Road, Dinhata, West Bengal 736135', description: 'Affordable healthcare and pharmacy services.' }
    ],
    touristSpots: [
        { name: 'Dinhata Eco Park', rating: 4.7, address: 'College Road, Dinhata, West Bengal 736135', description: 'Beautiful eco-park featuring gardens, boating, and picnic areas.' },
        { name: 'Rajbari Palace (Cooch Behar)', rating: 4.8, address: 'Near Dinhata, Cooch Behar, West Bengal 736101', description: 'Historic royal palace known for its grand architecture and museum.' },
        { name: 'Sagar Dighi', rating: 4.6, address: 'Cooch Behar Town, near Dinhata, West Bengal 736101', description: 'Serene lake popular for evening walks and boating.' },
        { name: 'Madan Mohan Temple', rating: 4.5, address: 'Cooch Behar, near Dinhata, West Bengal 736101', description: 'Ancient temple dedicated to Lord Krishna, visited by many devotees.' }
    ]
},
'barasat': { 
    schools: [
        { name: 'Barasat Peary Charan Sarkar Government High School', rating: 4.7, address: 'Barasat, North 24 Parganas, West Bengal 700124', description: 'Renowned government school offering high-quality education since colonial times.' },
        { name: 'Julien Day School', rating: 4.6, address: 'Kolkata Road, Barasat, West Bengal 700124', description: 'English-medium ICSE school known for discipline and co-curricular excellence.' },
        { name: 'Auxilium Convent School', rating: 4.6, address: 'Champadali, Barasat, West Bengal 700124', description: 'Popular convent school providing holistic education with emphasis on moral values.' },
        { name: 'Barasat Indira Gandhi Memorial High School', rating: 4.5, address: 'Madhyamgram Road, Barasat, West Bengal 700124', description: 'CBSE-affiliated school focusing on academics and extracurricular activities.' }
    ],
    restaurants: [
        { name: 'The Salt House', rating: 4.7, address: 'Kolkata Road, Barasat, West Bengal 700124', description: 'Trendy restaurant serving Indian and continental cuisines.' },
        { name: 'Royal Spice Restaurant', rating: 4.6, address: 'Barasat-Barrackpore Road, Barasat, West Bengal 700124', description: 'Popular for biryani, kebabs, and Mughlai dishes.' },
        { name: 'Urban Tadka', rating: 4.5, address: 'Jessore Road, Barasat, West Bengal 700124', description: 'Family-friendly restaurant with North Indian and Chinese menu.' },
        { name: 'Barbeque Nation', rating: 4.8, address: 'City Mall, Barasat, West Bengal 700124', description: 'Famous chain offering buffet-style dining and live grill experience.' }
    ],
    hospitals: [
        { name: 'Barasat District Hospital', rating: 4.5, address: 'Hospital Road, Barasat, West Bengal 700124', description: 'Major government hospital serving residents of North 24 Parganas.' },
        { name: 'Apollo Clinic Barasat', rating: 4.7, address: 'Jessore Road, Barasat, West Bengal 700124', description: 'Modern diagnostic and healthcare centre offering specialist consultations.' },
        { name: 'Aditya Hospital', rating: 4.6, address: 'KNC Road, Barasat, West Bengal 700124', description: 'Multi-specialty private hospital providing 24x7 emergency care.' },
        { name: 'Narayan Memorial Hospital', rating: 4.5, address: 'Taki Road, Barasat, West Bengal 700124', description: 'Well-equipped hospital with maternity and surgical facilities.' }
    ],
    touristSpots: [
        { name: 'Barasat Chapadali Park', rating: 4.6, address: 'Chapadali, Barasat, West Bengal 700124', description: 'Green public park popular among locals for morning walks and recreation.' },
        { name: 'Dakshineswar Kali Temple', rating: 4.8, address: 'Dakshineswar, near Barasat, West Bengal 700076', description: 'Famous temple dedicated to Goddess Kali located near the Hooghly River.' },
        { name: 'Eco Park Kolkata', rating: 4.9, address: 'Rajarhat, near Barasat, West Bengal 700135', description: 'Massive urban park with lakes, gardens, and recreation zones.' },
        { name: 'Barasat Gandhi Museum', rating: 4.5, address: 'Taki Road, Barasat, West Bengal 700124', description: 'Local museum preserving historical artifacts and photographs of Mahatma Gandhi.' }
    ]
},
'bidhannagar': { 
    schools: [
        { name: 'Salt Lake School (Eng. Medium)', rating: 4.8, address: 'BA Block, Sector I, Salt Lake City, Kolkata, West Bengal 700064', description: 'One of the oldest and most reputed schools in Salt Lake offering CBSE curriculum.' },
        { name: 'Bidhannagar Municipal School', rating: 4.6, address: 'DD Block, Sector I, Salt Lake City, West Bengal 700064', description: 'Well-known government school focusing on academics and cultural activities.' },
        { name: 'Delhi Public School, Newtown', rating: 4.8, address: 'Action Area I, Newtown, Kolkata, West Bengal 700156', description: 'Top CBSE school near Salt Lake with world-class facilities and strong academics.' },
        { name: 'Our Lady Queen of the Missions School', rating: 4.7, address: 'LB Block, Sector III, Salt Lake, Kolkata, West Bengal 700098', description: 'Renowned convent school emphasizing discipline and holistic learning.' }
    ],
    restaurants: [
        { name: 'Barbeque Nation', rating: 4.8, address: 'Sector V, Salt Lake City, Kolkata, West Bengal 700091', description: 'Popular buffet restaurant offering grilled and live-counter cuisines.' },
        { name: 'Haka', rating: 4.6, address: 'City Centre Mall, DC Block, Salt Lake, Kolkata, West Bengal 700064', description: 'Modern Chinese restaurant known for dim sums and noodles.' },
        { name: 'Afraa Deli', rating: 4.7, address: 'RDB Boulevard, Sector V, Salt Lake City, Kolkata, West Bengal 700091', description: 'Trendy bistro serving European and fusion dishes with stylish ambiance.' },
        { name: 'The Orient', rating: 4.6, address: 'City Centre, Salt Lake, Kolkata, West Bengal 700064', description: 'Upscale Asian restaurant offering Thai, Chinese, and Japanese cuisine.' }
    ],
    hospitals: [
        { name: 'AMRI Hospitals Salt Lake', rating: 4.8, address: 'JC-16 & 17, Salt Lake, Sector III, Kolkata, West Bengal 700098', description: 'Premier multi-specialty hospital with advanced treatment facilities.' },
        { name: 'ILS Hospital', rating: 4.7, address: 'DD-6, Salt Lake, Sector I, Kolkata, West Bengal 700064', description: 'Trusted private hospital with 24x7 emergency and maternity care.' },
        { name: 'Columbia Asia Hospital', rating: 4.6, address: 'IB Block, Salt Lake City, Kolkata, West Bengal 700091', description: 'International-standard hospital offering comprehensive healthcare.' },
        { name: 'Apollo Gleneagles Hospital', rating: 4.9, address: 'EM Bypass, near Salt Lake, Kolkata, West Bengal 700054', description: 'Top-ranked multi-specialty hospital with state-of-the-art medical infrastructure.' }
    ],
    touristSpots: [
        { name: 'Nicco Park', rating: 4.8, address: 'Sector IV, Salt Lake City, Kolkata, West Bengal 700106', description: 'Famous amusement park known as the Disneyland of Kolkata.' },
        { name: 'Salt Lake Central Park', rating: 4.7, address: 'Sector I, Salt Lake, Kolkata, West Bengal 700064', description: 'Lush green park ideal for walking, boating, and relaxation.' },
        { name: 'Eco Park', rating: 4.9, address: 'Rajarhat, near Salt Lake City, Kolkata, West Bengal 700156', description: 'Massive urban park with themed gardens and recreational zones.' },
        { name: 'Science City', rating: 4.8, address: 'EM Bypass, near Salt Lake, Kolkata, West Bengal 700046', description: 'India’s largest science museum featuring interactive exhibits and planetarium.' }
    ]
},
'raiganj': { 
    schools: [
        { name: 'Raiganj Coronation High School', rating: 4.7, address: 'College Para, Raiganj, West Bengal 733134', description: 'One of the oldest and most reputed schools in Raiganj known for academic excellence.' },
        { name: 'Raiganj Girls’ High School', rating: 4.6, address: 'Town Hall Road, Raiganj, West Bengal 733134', description: 'Leading girls’ school offering higher secondary education with strong results.' },
        { name: 'St. Joseph’s School', rating: 4.5, address: 'Mohanbati, Raiganj, West Bengal 733134', description: 'English-medium institution providing quality education and moral values.' },
        { name: 'Raiganj Public School', rating: 4.5, address: 'Kachhari Road, Raiganj, West Bengal 733134', description: 'CBSE-affiliated school focusing on academics, sports, and holistic learning.' }
    ],
    restaurants: [
        { name: 'Hotel Kalyani Restaurant', rating: 4.7, address: 'NH12, Raiganj, West Bengal 733134', description: 'Popular restaurant serving Indian and Chinese cuisines in a family-friendly setup.' },
        { name: 'Food Junction', rating: 4.5, address: 'Mohanbati, Raiganj, West Bengal 733134', description: 'Casual dining restaurant known for biryani and North Indian dishes.' },
        { name: 'Aroma Restaurant', rating: 4.6, address: 'Station Road, Raiganj, West Bengal 733134', description: 'Modern eatery offering multi-cuisine meals and snacks.' },
        { name: 'Spice Garden', rating: 4.4, address: 'College Para, Raiganj, West Bengal 733134', description: 'Cozy family restaurant with a good selection of vegetarian dishes.' }
    ],
    hospitals: [
        { name: 'Raiganj District Hospital', rating: 4.6, address: 'Hospital Road, Raiganj, West Bengal 733134', description: 'Main government hospital providing quality healthcare and emergency services.' },
        { name: 'Raiganj Nursing Home', rating: 4.5, address: 'Kachhari Road, Raiganj, West Bengal 733134', description: 'Private hospital with general and surgical facilities.' },
        { name: 'Apollo Clinic Raiganj', rating: 4.5, address: 'College Para, Raiganj, West Bengal 733134', description: 'Diagnostic and consultation center offering multi-specialty care.' },
        { name: 'Seba Hospital', rating: 4.4, address: 'Mohanbati, Raiganj, West Bengal 733134', description: 'Well-known private hospital for maternal and child healthcare.' }
    ],
    touristSpots: [
        { name: 'Raiganj Wildlife Sanctuary (Kulik Bird Sanctuary)', rating: 4.9, address: 'Kulik, Raiganj, West Bengal 733134', description: 'Famous bird sanctuary hosting migratory birds, nature trails, and picnic spots.' },
        { name: 'Kulik Eco Park', rating: 4.7, address: 'Near Kulik Sanctuary, Raiganj, West Bengal 733134', description: 'Beautiful park ideal for families, boating, and photography.' },
        { name: 'Raiganj Central Park', rating: 4.5, address: 'College Para, Raiganj, West Bengal 733134', description: 'Local park popular for morning walks and evening relaxation.' },
        { name: 'Kaliyaganj Temple', rating: 4.4, address: 'Kaliyaganj, near Raiganj, West Bengal 733129', description: 'Ancient temple attracting pilgrims and tourists alike.' }
    ]
},
'alipurduar': { 
    schools: [
        { name: 'Alipurduar High School', rating: 4.7, address: 'Court Para, Alipurduar, West Bengal 736121', description: 'Historic government school offering quality secondary and higher secondary education.' },
        { name: 'St. Joseph’s School', rating: 4.6, address: 'New Town, Alipurduar, West Bengal 736121', description: 'English-medium ICSE school focusing on academic excellence and moral development.' },
        { name: 'Alipurduar Girls’ High School', rating: 4.5, address: 'Subhashpally, Alipurduar, West Bengal 736121', description: 'Top-rated government girls’ school known for consistent academic results.' },
        { name: 'Alipurduar Public School', rating: 4.5, address: 'Buxa Road, Alipurduar, West Bengal 736121', description: 'CBSE-affiliated school offering modern education and co-curricular opportunities.' }
    ],
    restaurants: [
        { name: 'Hotel Sikkim Restaurant', rating: 4.7, address: 'Station Road, Alipurduar, West Bengal 736121', description: 'Popular eatery serving Indian, Chinese, and Nepalese cuisine.' },
        { name: 'Food Plaza', rating: 4.6, address: 'Court More, Alipurduar, West Bengal 736121', description: 'Casual dining restaurant famous for biryani and tandoori dishes.' },
        { name: 'Buxa Cafe', rating: 4.5, address: 'Buxa Road, Alipurduar, West Bengal 736121', description: 'Cozy café serving coffee, snacks, and fast food items.' },
        { name: 'Royal Treat', rating: 4.4, address: 'College Road, Alipurduar, West Bengal 736121', description: 'Family-friendly restaurant offering North Indian and continental food.' }
    ],
    hospitals: [
        { name: 'Alipurduar District Hospital', rating: 4.6, address: 'Court Para, Alipurduar, West Bengal 736121', description: 'Main government hospital providing healthcare for residents and nearby villages.' },
        { name: 'Biswa Bangla Hospital', rating: 4.5, address: 'Buxa Road, Alipurduar, West Bengal 736121', description: 'Private multi-specialty hospital known for quality medical care.' },
        { name: 'Apollo Diagnostics', rating: 4.5, address: 'Station Road, Alipurduar, West Bengal 736121', description: 'Advanced diagnostic center offering pathology and imaging services.' },
        { name: 'Seba Nursing Home', rating: 4.4, address: 'College Para, Alipurduar, West Bengal 736121', description: 'Private healthcare facility with maternity and emergency services.' }
    ],
    touristSpots: [
        { name: 'Buxa Tiger Reserve', rating: 4.9, address: 'Buxa, near Alipurduar, West Bengal 736121', description: 'Famous wildlife reserve with rich biodiversity and scenic trekking trails.' },
        { name: 'Jayanti River & Hills', rating: 4.8, address: 'Jayanti Village, near Alipurduar, West Bengal 736123', description: 'Picturesque river valley surrounded by forests and hills, ideal for nature lovers.' },
        { name: 'Rajabhatkhawa', rating: 4.7, address: 'Buxa Forest Area, near Alipurduar, West Bengal 736121', description: 'Eco-tourism spot offering elephant rides and wildlife viewing opportunities.' },
        { name: 'Chilapata Forest', rating: 4.8, address: 'Between Alipurduar and Cooch Behar, West Bengal 736123', description: 'Dense forest famous for jungle safaris and elephant sightings.' }
    ]
},
'egra': { 
    schools: [
        { name: 'Egra Jhatulal High School', rating: 4.7, address: 'Egra, Purba Medinipur, West Bengal 721429', description: 'One of the oldest schools in the area, providing excellent academic education.' },
        { name: 'Egra Public School', rating: 4.6, address: 'Main Road, Egra, West Bengal 721429', description: 'CBSE-affiliated school focusing on holistic development and modern education.' },
        { name: 'Egra Girls’ High School', rating: 4.5, address: 'Egra Town, West Bengal 721429', description: 'Reputed government girls’ school ensuring strong academics and discipline.' },
        { name: 'St. Mary’s English School', rating: 4.4, address: 'Near Egra Bus Stand, West Bengal 721429', description: 'Private English-medium school known for quality teaching and co-curricular activities.' }
    ],
    restaurants: [
        { name: 'Hotel Green Valley', rating: 4.6, address: 'Egra Bypass, West Bengal 721429', description: 'Popular family restaurant serving Bengali and North Indian dishes.' },
        { name: 'Egra Food Corner', rating: 4.5, address: 'Main Market Road, Egra, West Bengal 721429', description: 'Casual eatery famous for biryani and thalis.' },
        { name: 'Flavours Restaurant', rating: 4.5, address: 'Egra Town, West Bengal 721429', description: 'Air-conditioned dining space offering multi-cuisine menu and snacks.' },
        { name: 'Food Junction', rating: 4.4, address: 'Bus Stand Area, Egra, West Bengal 721429', description: 'Local favorite for fast food, rolls, and beverages.' }
    ],
    hospitals: [
        { name: 'Egra Super Speciality Hospital', rating: 4.6, address: 'Egra Main Road, West Bengal 721429', description: 'Government hospital offering multiple specialized healthcare services.' },
        { name: 'Egra Nursing Home', rating: 4.5, address: 'College Road, Egra, West Bengal 721429', description: 'Private nursing home with experienced doctors and 24-hour care.' },
        { name: 'Chatterjee Health Care', rating: 4.4, address: 'Market Road, Egra, West Bengal 721429', description: 'Well-known clinic providing general and pediatric services.' },
        { name: 'Apollo Diagnostics Egra', rating: 4.5, address: 'Near Egra Bus Stand, West Bengal 721429', description: 'Diagnostic center for pathology and radiology tests.' }
    ],
    touristSpots: [
        { name: 'Mandarmani Beach', rating: 4.8, address: 'Near Egra, Purba Medinipur, West Bengal', description: 'Scenic sea beach and popular weekend getaway near Egra.' },
        { name: 'Talsari Beach', rating: 4.7, address: 'Around 40 km from Egra, West Bengal', description: 'Beautiful coastal spot known for sunsets and seafood.' },
        { name: 'Chandaneswar Temple', rating: 4.7, address: 'Balasore border, near Egra, West Bengal', description: 'Ancient Shiva temple attracting thousands of pilgrims annually.' },
        { name: 'Digha Beach', rating: 4.9, address: 'Approx. 45 km from Egra, West Bengal', description: 'One of West Bengal’s most famous beaches with resorts and water activities.' }
    ]
},
'arambagh': { 
    schools: [
        { name: 'Arambagh High School', rating: 4.7, address: 'Arambagh, Hooghly, West Bengal 712601', description: 'Old and reputed school known for academic excellence and discipline.' },
        { name: 'Arambagh Girls’ High School', rating: 4.6, address: 'Subhas Road, Arambagh, West Bengal 712601', description: 'Government-aided girls’ school with excellent board results.' },
        { name: 'St. Joseph’s Convent School', rating: 4.5, address: 'Arambagh Town, West Bengal 712601', description: 'ICSE-affiliated English-medium school offering holistic education.' },
        { name: 'Arambagh Vivekananda Academy', rating: 4.5, address: 'Arambagh Bypass, West Bengal 712601', description: 'Private co-educational school emphasizing academics and moral values.' }
    ],
    restaurants: [
        { name: 'Saffron Restaurant', rating: 4.6, address: 'GT Road, Arambagh, West Bengal 712601', description: 'Popular family restaurant serving Indian and Chinese dishes.' },
        { name: 'Food Palace', rating: 4.5, address: 'Arambagh Bus Stand, West Bengal 712601', description: 'Casual dining restaurant known for biryani and snacks.' },
        { name: 'The Hungry Point', rating: 4.5, address: 'Station Road, Arambagh, West Bengal 712601', description: 'Modern café-style eatery popular among youth.' },
        { name: 'Rolls & More', rating: 4.4, address: 'Main Market, Arambagh, West Bengal 712601', description: 'Fast food outlet famous for rolls and momos.' }
    ],
    hospitals: [
        { name: 'Arambagh Subdivisional Hospital', rating: 4.5, address: 'Hospital Road, Arambagh, West Bengal 712601', description: 'Government hospital providing general and emergency services.' },
        { name: 'Nivedita Nursing Home', rating: 4.5, address: 'College Road, Arambagh, West Bengal 712601', description: 'Private hospital offering maternity and surgical care.' },
        { name: 'Apex Health Care', rating: 4.4, address: 'Arambagh Bypass, West Bengal 712601', description: 'Modern healthcare facility with diagnostic and OPD services.' },
        { name: 'Apollo Diagnostics Arambagh', rating: 4.4, address: 'Station Road, Arambagh, West Bengal 712601', description: 'Diagnostic center with advanced lab testing.' }
    ],
    touristSpots: [
        { name: 'Kamarpukur', rating: 4.8, address: 'Near Arambagh, Hooghly, West Bengal', description: 'Birthplace of Sri Ramakrishna, an important pilgrimage and cultural site.' },
        { name: 'Jayrambati', rating: 4.7, address: '12 km from Arambagh, West Bengal', description: 'Holy birthplace of Sarada Devi, offering a serene spiritual environment.' },
        { name: 'Arambagh Park', rating: 4.5, address: 'Town Center, Arambagh, West Bengal', description: 'Recreational park for families with greenery and children’s rides.' },
        { name: 'Ramakrishna Mission Kamarpukur', rating: 4.8, address: 'Kamarpukur, near Arambagh, West Bengal', description: 'Renowned religious site managed by Ramakrishna Mission.' }
    ]
},
'kanchrapara': { 
    schools: [
        { name: 'Kanchrapara Harnett High School', rating: 4.7, address: 'Kanchrapara, North 24 Parganas, West Bengal 743145', description: 'One of the oldest and most reputed schools in Kanchrapara.' },
        { name: 'Kanchrapara Harnett English School', rating: 4.6, address: 'Harnett Road, Kanchrapara, West Bengal 743145', description: 'English-medium school offering quality education and extracurricular activities.' },
        { name: 'St. Joseph’s High School', rating: 4.6, address: 'Kanchrapara, West Bengal 743145', description: 'Catholic institution known for discipline and academic excellence.' },
        { name: 'Kanchrapara Railway School', rating: 4.5, address: 'Railway Colony, Kanchrapara, West Bengal 743145', description: 'School run by the railways providing good education to local students.' }
    ],
    restaurants: [
        { name: 'The Spice Garden', rating: 4.6, address: 'Kalyani Road, Kanchrapara, West Bengal 743145', description: 'Family restaurant known for North Indian and Chinese dishes.' },
        { name: 'Food Junction', rating: 4.5, address: 'Main Market, Kanchrapara, West Bengal 743145', description: 'Popular spot for fast food and local snacks.' },
        { name: 'Biryani House', rating: 4.5, address: 'Station Road, Kanchrapara, West Bengal 743145', description: 'Famous for authentic Kolkata-style biryani and kebabs.' },
        { name: 'Chili’s Point', rating: 4.4, address: 'Kanchrapara Station Area, West Bengal 743145', description: 'Casual dining restaurant serving Indo-Chinese cuisine.' }
    ],
    hospitals: [
        { name: 'Kanchrapara Railway Hospital', rating: 4.6, address: 'Railway Colony, Kanchrapara, West Bengal 743145', description: 'Government hospital serving railway employees and locals.' },
        { name: 'Apollo Clinic Kanchrapara', rating: 4.5, address: 'Kalyani Road, Kanchrapara, West Bengal 743145', description: 'Multi-specialty clinic providing diagnostic and medical services.' },
        { name: 'Priya Nursing Home', rating: 4.5, address: 'Bazar Road, Kanchrapara, West Bengal 743145', description: 'Private nursing home with modern facilities and good patient care.' },
        { name: 'City Life Hospital', rating: 4.4, address: 'Station Road, Kanchrapara, West Bengal 743145', description: 'Multi-specialty hospital offering emergency and surgical care.' }
    ],
    touristSpots: [
        { name: 'Kalyani Lake Garden', rating: 4.7, address: 'Kalyani, near Kanchrapara, West Bengal', description: 'Beautiful lake with walking paths, boating, and gardens.' },
        { name: 'Barrackpore Mangal Pandey Park', rating: 4.6, address: 'Barrackpore, near Kanchrapara, West Bengal', description: 'Historical park honoring freedom fighter Mangal Pandey.' },
        { name: 'Indira Park', rating: 4.5, address: 'Kanchrapara Town, West Bengal', description: 'Local park ideal for relaxation and family outings.' },
        { name: 'Kalyani Stadium', rating: 4.5, address: 'Kalyani, near Kanchrapara, West Bengal', description: 'Sports complex hosting football matches and events.' }
    ]
},
'basirhat': { 
    schools: [
        { name: 'Basirhat High School', rating: 4.7, address: 'Basirhat, North 24 Parganas, West Bengal 743412', description: 'One of the oldest schools in Basirhat, known for strong academics and extracurriculars.' },
        { name: 'Basirhat Girls’ High School', rating: 4.6, address: 'Town Center, Basirhat, West Bengal 743412', description: 'Leading government school for girls providing quality education.' },
        { name: 'St. Joseph’s English School', rating: 4.5, address: 'Basirhat Main Road, West Bengal 743412', description: 'English-medium school focusing on academics and character building.' },
        { name: 'Basirhat Public School', rating: 4.4, address: 'Station Road, Basirhat, West Bengal 743412', description: 'Private school with CBSE curriculum emphasizing holistic learning.' }
    ],
    restaurants: [
        { name: 'Food Plaza Basirhat', rating: 4.6, address: 'Main Market, Basirhat, West Bengal 743412', description: 'Casual dining restaurant offering North Indian and Bengali cuisines.' },
        { name: 'The Spice Garden', rating: 4.5, address: 'Station Road, Basirhat, West Bengal 743412', description: 'Family restaurant known for traditional Indian meals and snacks.' },
        { name: 'Royal Treat', rating: 4.5, address: 'Basirhat Town, West Bengal 743412', description: 'Popular eatery serving biryani, rolls, and fast food items.' },
        { name: 'Chili Point', rating: 4.4, address: 'Near Basirhat Bus Stand, West Bengal 743412', description: 'Modern restaurant offering Indo-Chinese dishes and snacks.' }
    ],
    hospitals: [
        { name: 'Basirhat District Hospital', rating: 4.6, address: 'Hospital Road, Basirhat, West Bengal 743412', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'Medicare Nursing Home', rating: 4.5, address: 'Station Road, Basirhat, West Bengal 743412', description: 'Private hospital with multi-specialty and maternity services.' },
        { name: 'Apollo Diagnostics Basirhat', rating: 4.5, address: 'Main Road, Basirhat, West Bengal 743412', description: 'Diagnostic center offering lab tests and medical consultations.' },
        { name: 'City Health Care', rating: 4.4, address: 'Town Center, Basirhat, West Bengal 743412', description: 'Community health facility with OPD and minor surgical services.' }
    ],
    touristSpots: [
        { name: 'Ichamati River', rating: 4.8, address: 'Basirhat, North 24 Parganas, West Bengal', description: 'Scenic river ideal for picnics and photography.' },
        { name: 'Basirhat Kali Temple', rating: 4.7, address: 'Town Center, Basirhat, West Bengal', description: 'Popular Hindu temple attracting devotees and tourists.' },
        { name: 'Shahid Bhavan', rating: 4.6, address: 'Basirhat, West Bengal', description: 'Historical landmark commemorating local heroes.' },
        { name: 'Bhasa Park', rating: 4.5, address: 'Near Main Road, Basirhat, West Bengal', description: 'Local park for relaxation, walking, and community events.' }
    ]
},








'srinagar': { 
    schools: [
        { name: 'Burn Hall School', rating: 4.7, address: 'Sonwar, Srinagar, Jammu & Kashmir 190001', description: 'One of the top English-medium schools in Srinagar focusing on academics and co-curricular activities.' },
        { name: 'Presentation Convent High School', rating: 4.6, address: 'Gupkar Road, Srinagar, Jammu & Kashmir 190001', description: 'Well-known school providing quality education with strong moral values.' },
        { name: 'Tyndale Biscoe School', rating: 4.5, address: 'Sonwar, Srinagar, Jammu & Kashmir 190001', description: 'Reputed school emphasizing holistic development and outdoor activities.' },
        { name: 'Delhi Public School Srinagar', rating: 4.4, address: 'Soura, Srinagar, Jammu & Kashmir 190011', description: 'CBSE-affiliated school known for modern infrastructure and academics.' }
    ],
    restaurants: [
        { name: 'Ahdoos Restaurant', rating: 4.7, address: 'Lal Chowk, Srinagar, Jammu & Kashmir 190001', description: 'Famous for traditional Kashmiri Wazwan cuisine.' },
        { name: 'Shamyana Restaurant', rating: 4.6, address: 'Rajbagh, Srinagar, Jammu & Kashmir 190008', description: 'Family-friendly restaurant serving authentic Kashmiri dishes.' },
        { name: 'Krishna Vaishno Dhaba', rating: 4.5, address: 'Ganderbal Road, Srinagar, Jammu & Kashmir 190001', description: 'Popular vegetarian eatery offering North Indian meals.' },
        { name: 'The Chinar', rating: 4.4, address: 'Hotel Lalit Grand Palace, Srinagar, Jammu & Kashmir 190001', description: 'Upscale restaurant offering Kashmiri and Continental cuisine.' }
    ],
    hospitals: [
        { name: 'SMHS Hospital', rating: 4.6, address: 'Lal Chowk, Srinagar, Jammu & Kashmir 190001', description: 'Major government hospital providing emergency and general healthcare services.' },
        { name: 'Sher-i-Kashmir Institute of Medical Sciences', rating: 4.5, address: 'Soura, Srinagar, Jammu & Kashmir 190011', description: 'Specialty hospital offering advanced medical treatments.' },
        { name: 'City Hospital Srinagar', rating: 4.5, address: 'Rajbagh, Srinagar, Jammu & Kashmir 190008', description: 'Private hospital with multi-specialty and diagnostic services.' },
        { name: 'Al-Hayat Hospital', rating: 4.4, address: 'Rajbagh, Srinagar, Jammu & Kashmir 190008', description: 'Community healthcare facility offering outpatient and emergency services.' }
    ],
    touristSpots: [
        { name: 'Dal Lake', rating: 4.9, address: 'Srinagar, Jammu & Kashmir', description: 'Iconic lake famous for houseboats, shikaras, and scenic beauty.' },
        { name: 'Shankaracharya Temple', rating: 4.8, address: 'Shankaracharya Hill, Srinagar, Jammu & Kashmir', description: 'Historic Hindu temple with panoramic views of the city.' },
        { name: 'Mughal Gardens', rating: 4.7, address: 'Nigeen Road, Srinagar, Jammu & Kashmir', description: 'Beautifully landscaped gardens built during the Mughal era.' },
        { name: 'Nishat Bagh', rating: 4.6, address: 'Near Dal Lake, Srinagar, Jammu & Kashmir', description: 'Terraced Mughal garden offering serene views and tranquility.' }
    ]
},
'jammu': { 
    schools: [
        { name: 'Tyndale Biscoe School, Jammu', rating: 4.7, address: 'Sainik Colony, Jammu, Jammu & Kashmir 180001', description: 'Prestigious school providing quality education with emphasis on academics and extracurriculars.' },
        { name: 'KC Public School', rating: 4.6, address: 'Shastri Nagar, Jammu, Jammu & Kashmir 180004', description: 'Well-known English-medium school offering holistic learning.' },
        { name: 'Delhi Public School Jammu', rating: 4.5, address: 'Talab Tillo, Jammu, Jammu & Kashmir 180002', description: 'CBSE-affiliated school focusing on academics, sports, and cultural activities.' },
        { name: 'St. Peter’s School', rating: 4.4, address: 'Bahu Plaza, Jammu, Jammu & Kashmir 180012', description: 'English-medium school with a reputation for strong discipline and education.' }
    ],
    restaurants: [
        { name: 'McLeod Ganj Restaurant', rating: 4.6, address: 'Kachi Chawni, Jammu, Jammu & Kashmir 180001', description: 'Casual dining serving North Indian and Chinese dishes.' },
        { name: 'Krishna Vaishno Dhaba', rating: 4.5, address: 'Railway Road, Jammu, Jammu & Kashmir 180001', description: 'Popular vegetarian restaurant offering Indian meals and snacks.' },
        { name: 'Bahu Fort Restaurant', rating: 4.5, address: 'Bahu Fort, Jammu, Jammu & Kashmir 180012', description: 'Restaurant with scenic views serving local and Indian cuisine.' },
        { name: 'Café Coffee Day Jammu', rating: 4.4, address: 'City Centre, Jammu, Jammu & Kashmir 180012', description: 'Coffee shop and light meals, popular for casual hangouts.' }
    ],
    hospitals: [
        { name: 'Government Medical College Hospital', rating: 4.6, address: 'Bakshi Nagar, Jammu, Jammu & Kashmir 180001', description: 'Major government hospital providing comprehensive medical services.' },
        { name: 'Jammu Heart & Superspeciality Hospital', rating: 4.5, address: 'Sainik Colony, Jammu, Jammu & Kashmir 180001', description: 'Private hospital specializing in cardiac and multi-specialty care.' },
        { name: 'City Hospital Jammu', rating: 4.5, address: 'Kachi Chawni, Jammu, Jammu & Kashmir 180001', description: 'Multi-specialty private hospital offering diagnostics and treatment.' },
        { name: 'Shivam Hospital', rating: 4.4, address: 'Railway Road, Jammu, Jammu & Kashmir 180001', description: 'Community healthcare facility with outpatient services and emergency care.' }
    ],
    touristSpots: [
        { name: 'Bahu Fort', rating: 4.8, address: 'Bahu Fort, Jammu, Jammu & Kashmir', description: 'Historic fort with gardens and temples, overlooking the Tawi River.' },
        { name: 'Raghunath Temple', rating: 4.7, address: 'Raghunath Bazaar, Jammu, Jammu & Kashmir', description: 'One of the largest temple complexes in North India, dedicated to Lord Rama.' },
        { name: 'Mubarak Mandi Palace', rating: 4.6, address: 'Mubarak Mandi, Jammu, Jammu & Kashmir', description: 'Royal palace complex showcasing historic architecture and heritage.' },
        { name: 'Amar Mahal Palace', rating: 4.5, address: 'Bahufort Road, Jammu, Jammu & Kashmir', description: 'Beautiful palace-turned-museum with art and history exhibits.' }
    ]
},
'anantnag': { 
    schools: [
        { name: 'Jawahar Navodaya Vidyalaya', rating: 4.7, address: 'Achabal, Anantnag, Jammu & Kashmir 192101', description: 'Central government school providing quality education with focus on academics and extracurriculars.' },
        { name: 'Government Higher Secondary School Anantnag', rating: 4.6, address: 'Main Town, Anantnag, Jammu & Kashmir 192101', description: 'One of the oldest government schools offering strong foundational education.' },
        { name: 'Presentation Convent School', rating: 4.5, address: 'Qazigund Road, Anantnag, Jammu & Kashmir 192101', description: 'English-medium school emphasizing academics, discipline, and co-curricular activities.' },
        { name: 'St. Paul’s High School', rating: 4.4, address: 'Main Market, Anantnag, Jammu & Kashmir 192101', description: 'Private school focusing on overall development of students.' }
    ],
    restaurants: [
        { name: 'Ahdoos Anantnag', rating: 4.6, address: 'Main Market, Anantnag, Jammu & Kashmir 192101', description: 'Popular eatery serving traditional Kashmiri cuisine.' },
        { name: 'Cafe Coffee Day Anantnag', rating: 4.5, address: 'Town Center, Anantnag, Jammu & Kashmir 192101', description: 'Coffee shop and casual dining for light meals and beverages.' },
        { name: 'Mughal Darbar', rating: 4.5, address: 'Qazigund Road, Anantnag, Jammu & Kashmir 192101', description: 'Restaurant known for North Indian and Kashmiri dishes.' },
        { name: 'Shamyana Restaurant', rating: 4.4, address: 'Main Town, Anantnag, Jammu & Kashmir 192101', description: 'Family-friendly restaurant offering traditional meals and snacks.' }
    ],
    hospitals: [
        { name: 'District Hospital Anantnag', rating: 4.6, address: 'Main Town, Anantnag, Jammu & Kashmir 192101', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'Al-Hayat Hospital', rating: 4.5, address: 'Qazigund Road, Anantnag, Jammu & Kashmir 192101', description: 'Private hospital offering multi-specialty and outpatient services.' },
        { name: 'City Medical Centre', rating: 4.5, address: 'Achabal Road, Anantnag, Jammu & Kashmir 192101', description: 'Community healthcare facility with diagnostics and consultation services.' },
        { name: 'Apollo Diagnostics Anantnag', rating: 4.4, address: 'Main Market, Anantnag, Jammu & Kashmir 192101', description: 'Diagnostic center providing lab tests and medical consultations.' }
    ],
    touristSpots: [
        { name: 'Achabal Gardens', rating: 4.8, address: 'Achabal, Anantnag, Jammu & Kashmir', description: 'Historic Mughal garden with scenic beauty and walking paths.' },
        { name: 'Martand Sun Temple', rating: 4.7, address: 'Anantnag, Jammu & Kashmir', description: 'Ancient Hindu temple ruins with historic and architectural significance.' },
        { name: 'Verinag Spring', rating: 4.6, address: 'Verinag, Anantnag, Jammu & Kashmir', description: 'Natural spring and garden, source of the Jhelum River.' },
        { name: 'Koh-i-Maran', rating: 4.5, address: 'Anantnag, Jammu & Kashmir', description: 'Hill offering panoramic views of the valley and surrounding areas.' }
    ]
},
'baramulla': { 
    schools: [
        { name: 'Government Boys Higher Secondary School', rating: 4.7, address: 'Main Town, Baramulla, Jammu & Kashmir 193101', description: 'One of the oldest government schools offering strong academics and co-curricular activities.' },
        { name: 'Presentation Convent School', rating: 4.6, address: 'Near Main Market, Baramulla, Jammu & Kashmir 193101', description: 'English-medium school known for discipline and quality education.' },
        { name: 'St. Joseph’s School', rating: 4.5, address: 'Baramulla Main Road, Jammu & Kashmir 193101', description: 'Private school focusing on holistic learning and character building.' },
        { name: 'Green Valley Public School', rating: 4.4, address: 'Station Road, Baramulla, Jammu & Kashmir 193101', description: 'CBSE-affiliated school emphasizing academics and extracurriculars.' }
    ],
    restaurants: [
        { name: 'The Spice House', rating: 4.6, address: 'Main Market, Baramulla, Jammu & Kashmir 193101', description: 'Casual dining restaurant serving North Indian and Kashmiri cuisines.' },
        { name: 'Baramulla Food Plaza', rating: 4.5, address: 'Station Road, Baramulla, Jammu & Kashmir 193101', description: 'Family-friendly restaurant known for traditional meals and snacks.' },
        { name: 'Royal Treat', rating: 4.5, address: 'Near Main Market, Baramulla, Jammu & Kashmir 193101', description: 'Popular eatery serving biryani, rolls, and fast food items.' },
        { name: 'Chili Point', rating: 4.4, address: 'Baramulla Town, Jammu & Kashmir 193101', description: 'Modern restaurant offering Indo-Chinese dishes and snacks.' }
    ],
    hospitals: [
        { name: 'District Hospital Baramulla', rating: 4.6, address: 'Hospital Road, Baramulla, Jammu & Kashmir 193101', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'City Care Hospital', rating: 4.5, address: 'Main Road, Baramulla, Jammu & Kashmir 193101', description: 'Private hospital with multi-specialty and outpatient services.' },
        { name: 'Apollo Diagnostics Baramulla', rating: 4.5, address: 'Station Road, Baramulla, Jammu & Kashmir 193101', description: 'Diagnostic center providing lab tests and medical consultations.' },
        { name: 'Green Valley Hospital', rating: 4.4, address: 'Town Center, Baramulla, Jammu & Kashmir 193101', description: 'Community health facility with OPD and minor surgical services.' }
    ],
    touristSpots: [
        { name: 'Wular Lake', rating: 4.8, address: 'Baramulla, Jammu & Kashmir', description: 'One of the largest freshwater lakes in Asia, ideal for boating and nature photography.' },
        { name: 'Baramulla Fort', rating: 4.7, address: 'Main Town, Baramulla, Jammu & Kashmir', description: 'Historic fort with architectural significance and scenic views.' },
        { name: 'Gulmarg Road', rating: 4.6, address: 'Baramulla, Jammu & Kashmir', description: 'Scenic road leading towards the popular hill station Gulmarg.' },
        { name: 'Ningli Hills', rating: 4.5, address: 'Baramulla, Jammu & Kashmir', description: 'Hill area offering panoramic views and trekking opportunities.' }
    ]
},
'udhampur': { 
    schools: [
        { name: 'Army Public School, Udhampur', rating: 4.7, address: 'Cantt Area, Udhampur, Jammu & Kashmir 182101', description: 'Well-known school providing strong academics and extracurricular opportunities.' },
        { name: 'Government Higher Secondary School, Udhampur', rating: 4.6, address: 'Main Town, Udhampur, Jammu & Kashmir 182101', description: 'One of the oldest government schools in the region offering quality education.' },
        { name: 'St. Joseph’s School, Udhampur', rating: 4.5, address: 'Near Town Center, Udhampur, Jammu & Kashmir 182101', description: 'Private English-medium school emphasizing holistic learning and character building.' },
        { name: 'KC Public School, Udhampur', rating: 4.4, address: 'Main Road, Udhampur, Jammu & Kashmir 182101', description: 'CBSE-affiliated school focusing on academics, sports, and cultural activities.' }
    ],
    restaurants: [
        { name: 'The Spice Lounge', rating: 4.6, address: 'Main Market, Udhampur, Jammu & Kashmir 182101', description: 'Casual dining restaurant serving North Indian and Chinese cuisines.' },
        { name: 'Udhampur Food Plaza', rating: 4.5, address: 'Station Road, Udhampur, Jammu & Kashmir 182101', description: 'Family restaurant offering traditional meals and snacks.' },
        { name: 'Royal Treat', rating: 4.5, address: 'Near Town Center, Udhampur, Jammu & Kashmir 182101', description: 'Popular eatery serving biryani, rolls, and fast food items.' },
        { name: 'Chili Point', rating: 4.4, address: 'Udhampur Town, Jammu & Kashmir 182101', description: 'Modern restaurant offering Indo-Chinese dishes and snacks.' }
    ],
    hospitals: [
        { name: 'District Hospital Udhampur', rating: 4.6, address: 'Hospital Road, Udhampur, Jammu & Kashmir 182101', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'City Care Hospital', rating: 4.5, address: 'Main Road, Udhampur, Jammu & Kashmir 182101', description: 'Private hospital with multi-specialty and outpatient services.' },
        { name: 'Apollo Diagnostics Udhampur', rating: 4.5, address: 'Station Road, Udhampur, Jammu & Kashmir 182101', description: 'Diagnostic center offering lab tests and medical consultations.' },
        { name: 'Shivam Hospital', rating: 4.4, address: 'Town Center, Udhampur, Jammu & Kashmir 182101', description: 'Community healthcare facility with OPD and minor surgical services.' }
    ],
    touristSpots: [
        { name: 'Mansar Lake', rating: 4.8, address: 'Mansar, Udhampur, Jammu & Kashmir', description: 'Scenic lake surrounded by hills, ideal for picnics and boating.' },
        { name: 'Madhatop', rating: 4.7, address: 'Near Udhampur, Jammu & Kashmir', description: 'Hilltop offering panoramic views of Udhampur and surrounding valleys.' },
        { name: 'Vaishno Devi Temple', rating: 4.9, address: 'Katra, Udhampur, Jammu & Kashmir', description: 'Famous pilgrimage site attracting millions of devotees annually.' },
        { name: 'Shiv Khori', rating: 4.6, address: 'Shiv Khori, Udhampur, Jammu & Kashmir', description: 'Sacred cave shrine dedicated to Lord Shiva, set amidst scenic hills.' }
    ]
},
'kathua': { 
    schools: [
        { name: 'Government Higher Secondary School, Kathua', rating: 4.7, address: 'Main Town, Kathua, Jammu & Kashmir 184101', description: 'One of the oldest government schools offering quality education and strong academics.' },
        { name: 'KC Public School, Kathua', rating: 4.6, address: 'City Center, Kathua, Jammu & Kashmir 184101', description: 'English-medium school focusing on holistic education and extracurricular activities.' },
        { name: 'St. Joseph’s School, Kathua', rating: 4.5, address: 'Near Town Market, Kathua, Jammu & Kashmir 184101', description: 'Private school providing CBSE curriculum and character building.' },
        { name: 'Spring Dale School, Kathua', rating: 4.4, address: 'Main Road, Kathua, Jammu & Kashmir 184101', description: 'Modern school emphasizing academics, sports, and cultural activities.' }
    ],
    restaurants: [
        { name: 'Kathua Food Plaza', rating: 4.6, address: 'Main Market, Kathua, Jammu & Kashmir 184101', description: 'Casual dining serving North Indian and local cuisines.' },
        { name: 'The Spice Garden', rating: 4.5, address: 'Station Road, Kathua, Jammu & Kashmir 184101', description: 'Family restaurant offering traditional Indian meals and snacks.' },
        { name: 'Royal Treat', rating: 4.5, address: 'Near Kathua Town Center, Jammu & Kashmir 184101', description: 'Popular eatery serving biryani, rolls, and fast food items.' },
        { name: 'Chili Point', rating: 4.4, address: 'Kathua Main Road, Jammu & Kashmir 184101', description: 'Modern restaurant offering Indo-Chinese dishes and snacks.' }
    ],
    hospitals: [
        { name: 'District Hospital Kathua', rating: 4.6, address: 'Hospital Road, Kathua, Jammu & Kashmir 184101', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'City Care Hospital', rating: 4.5, address: 'Main Road, Kathua, Jammu & Kashmir 184101', description: 'Private multi-specialty hospital offering outpatient services.' },
        { name: 'Apollo Diagnostics Kathua', rating: 4.5, address: 'Station Road, Kathua, Jammu & Kashmir 184101', description: 'Diagnostic center providing lab tests and medical consultations.' },
        { name: 'Shivam Hospital', rating: 4.4, address: 'Town Center, Kathua, Jammu & Kashmir 184101', description: 'Community healthcare facility with OPD and minor surgical services.' }
    ],
    touristSpots: [
        { name: 'Sanjay Sarovar Park', rating: 4.7, address: 'Kathua, Jammu & Kashmir', description: 'Public park ideal for family outings, walking, and relaxation.' },
        { name: 'Shivkhori', rating: 4.8, address: 'Shivkhori, Kathua, Jammu & Kashmir', description: 'Sacred cave shrine dedicated to Lord Shiva, popular among devotees.' },
        { name: 'Mansar Lake', rating: 4.7, address: 'Mansar, near Kathua, Jammu & Kashmir', description: 'Scenic lake with boating and picnic spots surrounded by hills.' },
        { name: 'Bhagwati Nagar', rating: 4.5, address: 'Kathua, Jammu & Kashmir', description: 'Local market and cultural hub of the city.' }
    ]
},
'kishtwar': { 
    schools: [
        { name: 'Government Higher Secondary School, Kishtwar', rating: 4.7, address: 'Main Town, Kishtwar, Jammu & Kashmir 182204', description: 'One of the oldest government schools offering quality education and strong academics.' },
        { name: 'KC Public School, Kishtwar', rating: 4.6, address: 'City Center, Kishtwar, Jammu & Kashmir 182204', description: 'English-medium school focusing on holistic education and extracurricular activities.' },
        { name: 'St. Joseph’s School, Kishtwar', rating: 4.5, address: 'Near Town Market, Kishtwar, Jammu & Kashmir 182204', description: 'Private school providing CBSE curriculum and character building.' },
        { name: 'Spring Dale School, Kishtwar', rating: 4.4, address: 'Main Road, Kishtwar, Jammu & Kashmir 182204', description: 'Modern school emphasizing academics, sports, and cultural activities.' }
    ],
    restaurants: [
        { name: 'Kishtwar Food Plaza', rating: 4.6, address: 'Main Market, Kishtwar, Jammu & Kashmir 182204', description: 'Casual dining serving North Indian and local cuisines.' },
        { name: 'The Spice Garden', rating: 4.5, address: 'Station Road, Kishtwar, Jammu & Kashmir 182204', description: 'Family restaurant offering traditional Indian meals and snacks.' },
        { name: 'Royal Treat', rating: 4.5, address: 'Near Kishtwar Town Center, Jammu & Kashmir 182204', description: 'Popular eatery serving biryani, rolls, and fast food items.' },
        { name: 'Chili Point', rating: 4.4, address: 'Kishtwar Main Road, Jammu & Kashmir 182204', description: 'Modern restaurant offering Indo-Chinese dishes and snacks.' }
    ],
    hospitals: [
        { name: 'District Hospital Kishtwar', rating: 4.6, address: 'Hospital Road, Kishtwar, Jammu & Kashmir 182204', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'City Care Hospital', rating: 4.5, address: 'Main Road, Kishtwar, Jammu & Kashmir 182204', description: 'Private multi-specialty hospital offering outpatient services.' },
        { name: 'Apollo Diagnostics Kishtwar', rating: 4.5, address: 'Station Road, Kishtwar, Jammu & Kashmir 182204', description: 'Diagnostic center providing lab tests and medical consultations.' },
        { name: 'Shivam Hospital', rating: 4.4, address: 'Town Center, Kishtwar, Jammu & Kashmir 182204', description: 'Community healthcare facility with OPD and minor surgical services.' }
    ],
    touristSpots: [
        { name: 'Kishtwar National Park', rating: 4.8, address: 'Kishtwar, Jammu & Kashmir', description: 'Protected area known for rich biodiversity, trekking, and wildlife sightings.' },
        { name: 'Sinthan Top', rating: 4.7, address: 'Kishtwar, Jammu & Kashmir', description: 'High-altitude mountain pass with scenic views, popular among travelers.' },
        { name: 'Nagseni Forest', rating: 4.6, address: 'Kishtwar, Jammu & Kashmir', description: 'Lush forest area ideal for nature walks and photography.' },
        { name: 'Marwah Valley', rating: 4.5, address: 'Kishtwar, Jammu & Kashmir', description: 'Remote valley known for natural beauty, rivers, and trekking routes.' }
    ]
},
'rajouri': { 
    schools: [
        { name: 'Government Higher Secondary School, Rajouri', rating: 4.7, address: 'Main Town, Rajouri, Jammu & Kashmir 185131', description: 'One of the oldest government schools offering strong academics and extracurricular programs.' },
        { name: 'KC Public School, Rajouri', rating: 4.6, address: 'City Center, Rajouri, Jammu & Kashmir 185131', description: 'English-medium school focusing on holistic education and overall development.' },
        { name: 'St. Joseph’s School, Rajouri', rating: 4.5, address: 'Near Town Market, Rajouri, Jammu & Kashmir 185131', description: 'Private school providing CBSE curriculum and value-based education.' },
        { name: 'Spring Dale School, Rajouri', rating: 4.4, address: 'Main Road, Rajouri, Jammu & Kashmir 185131', description: 'Modern school emphasizing academics, sports, and cultural activities.' }
    ],
    restaurants: [
        { name: 'Rajouri Food Plaza', rating: 4.6, address: 'Main Market, Rajouri, Jammu & Kashmir 185131', description: 'Casual dining serving North Indian and local cuisines.' },
        { name: 'The Spice Garden', rating: 4.5, address: 'Station Road, Rajouri, Jammu & Kashmir 185131', description: 'Family restaurant offering traditional Indian meals and snacks.' },
        { name: 'Royal Treat', rating: 4.5, address: 'Near Rajouri Town Center, Jammu & Kashmir 185131', description: 'Popular eatery serving biryani, rolls, and fast food items.' },
        { name: 'Chili Point', rating: 4.4, address: 'Rajouri Main Road, Jammu & Kashmir 185131', description: 'Modern restaurant offering Indo-Chinese dishes and snacks.' }
    ],
    hospitals: [
        { name: 'District Hospital Rajouri', rating: 4.6, address: 'Hospital Road, Rajouri, Jammu & Kashmir 185131', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'City Care Hospital', rating: 4.5, address: 'Main Road, Rajouri, Jammu & Kashmir 185131', description: 'Private multi-specialty hospital offering outpatient and diagnostic services.' },
        { name: 'Apollo Diagnostics Rajouri', rating: 4.5, address: 'Station Road, Rajouri, Jammu & Kashmir 185131', description: 'Diagnostic center providing lab tests and medical consultations.' },
        { name: 'Shivam Hospital', rating: 4.4, address: 'Town Center, Rajouri, Jammu & Kashmir 185131', description: 'Community healthcare facility with OPD and minor surgical services.' }
    ],
    touristSpots: [
        { name: 'Bagh-e-Bahu', rating: 4.7, address: 'Rajouri, Jammu & Kashmir', description: 'Historic garden and park offering scenic views and cultural heritage.' },
        { name: 'Mangla Devi Temple', rating: 4.6, address: 'Rajouri, Jammu & Kashmir', description: 'Ancient temple and pilgrimage site surrounded by hills.' },
        { name: 'Pir Panjal Hills', rating: 4.8, address: 'Near Rajouri, Jammu & Kashmir', description: 'Mountain range providing trekking, hiking, and scenic beauty.' },
        { name: 'Rajouri Fort', rating: 4.5, address: 'Main Town, Rajouri, Jammu & Kashmir', description: 'Historic fort with panoramic views of the city and surroundings.' }
    ]
},
'sopore': { 
    schools: [
        { name: 'Government Boys Higher Secondary School, Sopore', rating: 4.7, address: 'Main Town, Sopore, Jammu & Kashmir 193201', description: 'One of the oldest government schools offering quality education and strong academics.' },
        { name: 'Presentation Convent School, Sopore', rating: 4.6, address: 'Near Main Market, Sopore, Jammu & Kashmir 193201', description: 'English-medium school focusing on discipline and holistic learning.' },
        { name: 'St. Joseph’s School, Sopore', rating: 4.5, address: 'Main Road, Sopore, Jammu & Kashmir 193201', description: 'Private school emphasizing academics and extracurricular activities.' },
        { name: 'Green Valley Public School, Sopore', rating: 4.4, address: 'Station Road, Sopore, Jammu & Kashmir 193201', description: 'CBSE-affiliated school providing holistic education and skill development.' }
    ],
    restaurants: [
        { name: 'Sopore Food Plaza', rating: 4.6, address: 'Main Market, Sopore, Jammu & Kashmir 193201', description: 'Casual dining restaurant serving North Indian and Kashmiri cuisines.' },
        { name: 'The Spice Garden', rating: 4.5, address: 'Station Road, Sopore, Jammu & Kashmir 193201', description: 'Family restaurant offering traditional Indian meals and snacks.' },
        { name: 'Royal Treat', rating: 4.5, address: 'Near Sopore Town Center, Jammu & Kashmir 193201', description: 'Popular eatery serving biryani, rolls, and fast food items.' },
        { name: 'Chili Point', rating: 4.4, address: 'Sopore Main Road, Jammu & Kashmir 193201', description: 'Modern restaurant offering Indo-Chinese dishes and snacks.' }
    ],
    hospitals: [
        { name: 'District Hospital Sopore', rating: 4.6, address: 'Hospital Road, Sopore, Jammu & Kashmir 193201', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'City Care Hospital', rating: 4.5, address: 'Main Road, Sopore, Jammu & Kashmir 193201', description: 'Private hospital offering multi-specialty and outpatient services.' },
        { name: 'Apollo Diagnostics Sopore', rating: 4.5, address: 'Station Road, Sopore, Jammu & Kashmir 193201', description: 'Diagnostic center providing lab tests and medical consultations.' },
        { name: 'Shivam Hospital', rating: 4.4, address: 'Town Center, Sopore, Jammu & Kashmir 193201', description: 'Community healthcare facility with OPD and minor surgical services.' }
    ],
    touristSpots: [
        { name: 'Wular Lake', rating: 4.9, address: 'Sopore, Jammu & Kashmir', description: 'One of the largest freshwater lakes in Asia, ideal for boating and nature photography.' },
        { name: 'Jamia Masjid Sopore', rating: 4.7, address: 'Main Town, Sopore, Jammu & Kashmir', description: 'Historic mosque known for its architecture and cultural significance.' },
        { name: 'Narbal Lake', rating: 4.6, address: 'Near Sopore, Jammu & Kashmir', description: 'Serene lake surrounded by hills, perfect for picnics and relaxation.' },
        { name: 'Razdan Park', rating: 4.5, address: 'Sopore, Jammu & Kashmir', description: 'Local park for walking, family outings, and community events.' }
    ]
},
'leh': { 
    schools: [
        { name: 'Druk White Lotus School', rating: 4.8, address: 'Shey, Leh, Jammu & Kashmir 194101', description: 'Prestigious international school offering quality education with focus on academics and extracurriculars.' },
        { name: 'Delhi Public School Leh', rating: 4.7, address: 'Leh City, Jammu & Kashmir 194101', description: 'CBSE-affiliated school emphasizing holistic development of students.' },
        { name: 'Tyndale Biscoe School Leh', rating: 4.6, address: 'Leh Town, Jammu & Kashmir 194101', description: 'English-medium school focusing on academics, sports, and character building.' },
        { name: 'St. Joseph’s Convent School', rating: 4.5, address: 'Main Market, Leh, Jammu & Kashmir 194101', description: 'Well-known school providing quality education and co-curricular opportunities.' }
    ],
    restaurants: [
        { name: 'Bon Appetit Café', rating: 4.7, address: 'Leh Main Market, Jammu & Kashmir 194101', description: 'Popular café serving multi-cuisine dishes including continental and local food.' },
        { name: 'The Tibetan Kitchen', rating: 4.6, address: 'Leh Town, Jammu & Kashmir 194101', description: 'Restaurant known for authentic Tibetan and Ladakhi cuisine.' },
        { name: 'Lamayuru Restaurant', rating: 4.5, address: 'Leh City, Jammu & Kashmir 194101', description: 'Family-friendly restaurant offering Indian and Chinese dishes.' },
        { name: 'Gesmo Restaurant', rating: 4.4, address: 'Leh Main Market, Jammu & Kashmir 194101', description: 'Casual dining with local specialties and continental options.' }
    ],
    hospitals: [
        { name: 'Civil Hospital Leh', rating: 4.6, address: 'Leh City, Jammu & Kashmir 194101', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'AMDO Hospital', rating: 4.5, address: 'Main Road, Leh, Jammu & Kashmir 194101', description: 'Private hospital offering multi-specialty and diagnostic services.' },
        { name: 'Apollo Diagnostics Leh', rating: 4.5, address: 'Leh Town, Jammu & Kashmir 194101', description: 'Diagnostic center providing lab tests and medical consultations.' },
        { name: 'City Care Hospital Leh', rating: 4.4, address: 'Leh Main Market, Jammu & Kashmir 194101', description: 'Community healthcare facility with OPD and emergency services.' }
    ],
    touristSpots: [
        { name: 'Pangong Lake', rating: 4.9, address: 'Pangong, Leh, Jammu & Kashmir', description: 'Famous high-altitude lake known for its crystal clear water and scenic beauty.' },
        { name: 'Shanti Stupa', rating: 4.8, address: 'Chanspa, Leh, Jammu & Kashmir', description: 'White-domed Buddhist stupa offering panoramic views of Leh town and mountains.' },
        { name: 'Leh Palace', rating: 4.7, address: 'Leh Town, Jammu & Kashmir', description: 'Historic palace offering insight into Ladakhi culture and architecture.' },
        { name: 'Nubra Valley', rating: 4.8, address: 'Nubra, Leh, Jammu & Kashmir', description: 'Valley famous for sand dunes, monasteries, and scenic landscapes.' }
    ]
},
'pulwama': { 
    schools: [
        { name: 'Government Higher Secondary School Pulwama', rating: 4.7, address: 'Main Town, Pulwama, Jammu & Kashmir 192301', description: 'One of the oldest government schools offering quality education and strong academics.' },
        { name: 'Presentation Convent School, Pulwama', rating: 4.6, address: 'Near Main Market, Pulwama, Jammu & Kashmir 192301', description: 'English-medium school focusing on discipline and holistic education.' },
        { name: 'St. Joseph’s School, Pulwama', rating: 4.5, address: 'Main Road, Pulwama, Jammu & Kashmir 192301', description: 'Private school emphasizing academics and extracurricular activities.' },
        { name: 'Green Valley Public School, Pulwama', rating: 4.4, address: 'Station Road, Pulwama, Jammu & Kashmir 192301', description: 'CBSE-affiliated school providing holistic education and skill development.' }
    ],
    restaurants: [
        { name: 'Pulwama Food Plaza', rating: 4.6, address: 'Main Market, Pulwama, Jammu & Kashmir 192301', description: 'Casual dining restaurant serving North Indian and Kashmiri cuisines.' },
        { name: 'The Spice Garden', rating: 4.5, address: 'Station Road, Pulwama, Jammu & Kashmir 192301', description: 'Family restaurant offering traditional Indian meals and snacks.' },
        { name: 'Royal Treat', rating: 4.5, address: 'Near Pulwama Town Center, Jammu & Kashmir 192301', description: 'Popular eatery serving biryani, rolls, and fast food items.' },
        { name: 'Chili Point', rating: 4.4, address: 'Pulwama Main Road, Jammu & Kashmir 192301', description: 'Modern restaurant offering Indo-Chinese dishes and snacks.' }
    ],
    hospitals: [
        { name: 'District Hospital Pulwama', rating: 4.6, address: 'Hospital Road, Pulwama, Jammu & Kashmir 192301', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'City Care Hospital', rating: 4.5, address: 'Main Road, Pulwama, Jammu & Kashmir 192301', description: 'Private hospital offering multi-specialty and outpatient services.' },
        { name: 'Apollo Diagnostics Pulwama', rating: 4.5, address: 'Station Road, Pulwama, Jammu & Kashmir 192301', description: 'Diagnostic center providing lab tests and medical consultations.' },
        { name: 'Shivam Hospital', rating: 4.4, address: 'Town Center, Pulwama, Jammu & Kashmir 192301', description: 'Community healthcare facility with OPD and minor surgical services.' }
    ],
    touristSpots: [
        { name: 'Aharbal Waterfall', rating: 4.8, address: 'Aharbal, Pulwama, Jammu & Kashmir', description: 'Scenic waterfall set amidst lush green hills, ideal for nature lovers and photography.' },
        { name: 'Chatpal Shrine', rating: 4.6, address: 'Pulwama, Jammu & Kashmir', description: 'Historic shrine attracting devotees and tourists alike.' },
        { name: 'Keller Tunnel', rating: 4.5, address: 'Pulwama, Jammu & Kashmir', description: 'Tourist spot with scenic surroundings and trekking opportunities.' },
        { name: 'Nagbal Lake', rating: 4.4, address: 'Pulwama, Jammu & Kashmir', description: 'Serene lake offering peaceful environment and natural beauty.' }
    ]
},
'kulgam': { 
    schools: [
        { name: 'Government Higher Secondary School Kulgam', rating: 4.7, address: 'Main Town, Kulgam, Jammu & Kashmir 192231', description: 'One of the oldest government schools offering quality education and strong academics.' },
        { name: 'Presentation Convent School, Kulgam', rating: 4.6, address: 'Near Main Market, Kulgam, Jammu & Kashmir 192231', description: 'English-medium school focusing on discipline and holistic education.' },
        { name: 'St. Joseph’s School, Kulgam', rating: 4.5, address: 'Main Road, Kulgam, Jammu & Kashmir 192231', description: 'Private school emphasizing academics and extracurricular activities.' },
        { name: 'Green Valley Public School, Kulgam', rating: 4.4, address: 'Station Road, Kulgam, Jammu & Kashmir 192231', description: 'CBSE-affiliated school providing holistic education and skill development.' }
    ],
    restaurants: [
        { name: 'Kulgam Food Plaza', rating: 4.6, address: 'Main Market, Kulgam, Jammu & Kashmir 192231', description: 'Casual dining restaurant serving North Indian and Kashmiri cuisines.' },
        { name: 'The Spice Garden', rating: 4.5, address: 'Station Road, Kulgam, Jammu & Kashmir 192231', description: 'Family restaurant offering traditional Indian meals and snacks.' },
        { name: 'Royal Treat', rating: 4.5, address: 'Near Kulgam Town Center, Jammu & Kashmir 192231', description: 'Popular eatery serving biryani, rolls, and fast food items.' },
        { name: 'Chili Point', rating: 4.4, address: 'Kulgam Main Road, Jammu & Kashmir 192231', description: 'Modern restaurant offering Indo-Chinese dishes and snacks.' }
    ],
    hospitals: [
        { name: 'District Hospital Kulgam', rating: 4.6, address: 'Hospital Road, Kulgam, Jammu & Kashmir 192231', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'City Care Hospital', rating: 4.5, address: 'Main Road, Kulgam, Jammu & Kashmir 192231', description: 'Private hospital offering multi-specialty and outpatient services.' },
        { name: 'Apollo Diagnostics Kulgam', rating: 4.5, address: 'Station Road, Kulgam, Jammu & Kashmir 192231', description: 'Diagnostic center providing lab tests and medical consultations.' },
        { name: 'Shivam Hospital', rating: 4.4, address: 'Town Center, Kulgam, Jammu & Kashmir 192231', description: 'Community healthcare facility with OPD and minor surgical services.' }
    ],
    touristSpots: [
        { name: 'Aharbal Waterfall', rating: 4.8, address: 'Aharbal, Kulgam, Jammu & Kashmir', description: 'Scenic waterfall set amidst lush green hills, ideal for nature lovers and photography.' },
        { name: 'Veshvoo Hill', rating: 4.7, address: 'Kulgam, Jammu & Kashmir', description: 'Hill area offering panoramic views and trekking opportunities.' },
        { name: 'Kulgam Park', rating: 4.6, address: 'Main Town, Kulgam, Jammu & Kashmir', description: 'Public park for relaxation, walking, and family outings.' },
        { name: 'Ganderbal Springs', rating: 4.5, address: 'Kulgam, Jammu & Kashmir', description: 'Natural spring with serene surroundings, perfect for picnics and photography.' }
    ]
},
'budgam': { 
    schools: [
        { name: 'Government Higher Secondary School Budgam', rating: 4.7, address: 'Main Town, Budgam, Jammu & Kashmir 191111', description: 'One of the oldest government schools offering quality education and strong academics.' },
        { name: 'Presentation Convent School, Budgam', rating: 4.6, address: 'Near Main Market, Budgam, Jammu & Kashmir 191111', description: 'English-medium school focusing on discipline and holistic education.' },
        { name: 'St. Joseph’s School, Budgam', rating: 4.5, address: 'Main Road, Budgam, Jammu & Kashmir 191111', description: 'Private school emphasizing academics and extracurricular activities.' },
        { name: 'Green Valley Public School, Budgam', rating: 4.4, address: 'Station Road, Budgam, Jammu & Kashmir 191111', description: 'CBSE-affiliated school providing holistic education and skill development.' }
    ],
    restaurants: [
        { name: 'Budgam Food Plaza', rating: 4.6, address: 'Main Market, Budgam, Jammu & Kashmir 191111', description: 'Casual dining restaurant serving North Indian and Kashmiri cuisines.' },
        { name: 'The Spice Garden', rating: 4.5, address: 'Station Road, Budgam, Jammu & Kashmir 191111', description: 'Family restaurant offering traditional Indian meals and snacks.' },
        { name: 'Royal Treat', rating: 4.5, address: 'Near Budgam Town Center, Jammu & Kashmir 191111', description: 'Popular eatery serving biryani, rolls, and fast food items.' },
        { name: 'Chili Point', rating: 4.4, address: 'Budgam Main Road, Jammu & Kashmir 191111', description: 'Modern restaurant offering Indo-Chinese dishes and snacks.' }
    ],
    hospitals: [
        { name: 'District Hospital Budgam', rating: 4.6, address: 'Hospital Road, Budgam, Jammu & Kashmir 191111', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'City Care Hospital', rating: 4.5, address: 'Main Road, Budgam, Jammu & Kashmir 191111', description: 'Private hospital offering multi-specialty and outpatient services.' },
        { name: 'Apollo Diagnostics Budgam', rating: 4.5, address: 'Station Road, Budgam, Jammu & Kashmir 191111', description: 'Diagnostic center providing lab tests and medical consultations.' },
        { name: 'Shivam Hospital', rating: 4.4, address: 'Town Center, Budgam, Jammu & Kashmir 191111', description: 'Community healthcare facility with OPD and minor surgical services.' }
    ],
    touristSpots: [
        { name: 'Dachigam National Park', rating: 4.9, address: 'Budgam, Jammu & Kashmir', description: 'Protected park known for wildlife, trekking, and scenic beauty.' },
        { name: 'Ashtaar Gardens', rating: 4.7, address: 'Budgam, Jammu & Kashmir', description: 'Beautiful garden ideal for relaxation and family outings.' },
        { name: 'Budgam Lake', rating: 4.6, address: 'Budgam, Jammu & Kashmir', description: 'Serene lake offering picturesque views and nature photography.' },
        { name: 'Shah Hamdan Mosque', rating: 4.5, address: 'Budgam, Jammu & Kashmir', description: 'Historic mosque attracting devotees and tourists for its architecture.' }
    ]
},
'shopian': { 
    schools: [
        { name: 'Government Higher Secondary School, Shopian', rating: 4.7, address: 'Main Town, Shopian, Jammu & Kashmir 192303', description: 'One of the oldest government schools offering quality education and strong academics.' },
        { name: 'Presentation Convent School, Shopian', rating: 4.6, address: 'Near Main Market, Shopian, Jammu & Kashmir 192303', description: 'English-medium school focusing on discipline and holistic education.' },
        { name: 'St. Joseph’s School, Shopian', rating: 4.5, address: 'Main Road, Shopian, Jammu & Kashmir 192303', description: 'Private school emphasizing academics and extracurricular activities.' },
        { name: 'Green Valley Public School, Shopian', rating: 4.4, address: 'Station Road, Shopian, Jammu & Kashmir 192303', description: 'CBSE-affiliated school providing holistic education and skill development.' }
    ],
    restaurants: [
        { name: 'Shopian Food Plaza', rating: 4.6, address: 'Main Market, Shopian, Jammu & Kashmir 192303', description: 'Casual dining restaurant serving North Indian and Kashmiri cuisines.' },
        { name: 'The Spice Garden', rating: 4.5, address: 'Station Road, Shopian, Jammu & Kashmir 192303', description: 'Family restaurant offering traditional Indian meals and snacks.' },
        { name: 'Royal Treat', rating: 4.5, address: 'Near Shopian Town Center, Jammu & Kashmir 192303', description: 'Popular eatery serving biryani, rolls, and fast food items.' },
        { name: 'Chili Point', rating: 4.4, address: 'Shopian Main Road, Jammu & Kashmir 192303', description: 'Modern restaurant offering Indo-Chinese dishes and snacks.' }
    ],
    hospitals: [
        { name: 'District Hospital Shopian', rating: 4.6, address: 'Hospital Road, Shopian, Jammu & Kashmir 192303', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'City Care Hospital', rating: 4.5, address: 'Main Road, Shopian, Jammu & Kashmir 192303', description: 'Private hospital offering multi-specialty and outpatient services.' },
        { name: 'Apollo Diagnostics Shopian', rating: 4.5, address: 'Station Road, Shopian, Jammu & Kashmir 192303', description: 'Diagnostic center providing lab tests and medical consultations.' },
        { name: 'Shivam Hospital', rating: 4.4, address: 'Town Center, Shopian, Jammu & Kashmir 192303', description: 'Community healthcare facility with OPD and minor surgical services.' }
    ],
    touristSpots: [
        { name: 'Mushroom Valley', rating: 4.7, address: 'Shopian, Jammu & Kashmir', description: 'Valley known for scenic beauty, agriculture, and nature walks.' },
        { name: 'Trehgam Hills', rating: 4.6, address: 'Shopian, Jammu & Kashmir', description: 'Hill area offering trekking and panoramic views of the region.' },
        { name: 'Fateh Pora Garden', rating: 4.5, address: 'Shopian, Jammu & Kashmir', description: 'Public garden ideal for relaxation and family outings.' },
        { name: 'Kokernag', rating: 4.8, address: 'Near Shopian, Jammu & Kashmir', description: 'Famous for springs, gardens, and natural beauty.' }
    ]
},
'bandipora': { 
    schools: [
        { name: 'Government Higher Secondary School, Bandipora', rating: 4.7, address: 'Main Town, Bandipora, Jammu & Kashmir 193502', description: 'One of the oldest government schools offering quality education and strong academics.' },
        { name: 'Presentation Convent School, Bandipora', rating: 4.6, address: 'Near Main Market, Bandipora, Jammu & Kashmir 193502', description: 'English-medium school focusing on discipline and holistic education.' },
        { name: 'St. Joseph’s School, Bandipora', rating: 4.5, address: 'Main Road, Bandipora, Jammu & Kashmir 193502', description: 'Private school emphasizing academics and extracurricular activities.' },
        { name: 'Green Valley Public School, Bandipora', rating: 4.4, address: 'Station Road, Bandipora, Jammu & Kashmir 193502', description: 'CBSE-affiliated school providing holistic education and skill development.' }
    ],
    restaurants: [
        { name: 'Bandipora Food Plaza', rating: 4.6, address: 'Main Market, Bandipora, Jammu & Kashmir 193502', description: 'Casual dining restaurant serving North Indian and Kashmiri cuisines.' },
        { name: 'The Spice Garden', rating: 4.5, address: 'Station Road, Bandipora, Jammu & Kashmir 193502', description: 'Family restaurant offering traditional Indian meals and snacks.' },
        { name: 'Royal Treat', rating: 4.5, address: 'Near Bandipora Town Center, Jammu & Kashmir 193502', description: 'Popular eatery serving biryani, rolls, and fast food items.' },
        { name: 'Chili Point', rating: 4.4, address: 'Bandipora Main Road, Jammu & Kashmir 193502', description: 'Modern restaurant offering Indo-Chinese dishes and snacks.' }
    ],
    hospitals: [
        { name: 'District Hospital Bandipora', rating: 4.6, address: 'Hospital Road, Bandipora, Jammu & Kashmir 193502', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'City Care Hospital', rating: 4.5, address: 'Main Road, Bandipora, Jammu & Kashmir 193502', description: 'Private hospital offering multi-specialty and outpatient services.' },
        { name: 'Apollo Diagnostics Bandipora', rating: 4.5, address: 'Station Road, Bandipora, Jammu & Kashmir 193502', description: 'Diagnostic center providing lab tests and medical consultations.' },
        { name: 'Shivam Hospital', rating: 4.4, address: 'Town Center, Bandipora, Jammu & Kashmir 193502', description: 'Community healthcare facility with OPD and minor surgical services.' }
    ],
    touristSpots: [
        { name: 'Wular Lake', rating: 4.9, address: 'Bandipora, Jammu & Kashmir', description: 'One of the largest freshwater lakes in Asia, perfect for boating and photography.' },
        { name: 'Gurez Valley', rating: 4.8, address: 'Near Bandipora, Jammu & Kashmir', description: 'Scenic valley with lush green landscapes and trekking opportunities.' },
        { name: 'Naranag Temple', rating: 4.6, address: 'Bandipora, Jammu & Kashmir', description: 'Ancient temple known for historical and architectural significance.' },
        { name: 'Badoab Lake', rating: 4.5, address: 'Bandipora, Jammu & Kashmir', description: 'Serene lake surrounded by hills, ideal for relaxation and nature photography.' }
    ]
},
'ganderbal': { 
    schools: [
        { name: 'Government Higher Secondary School, Ganderbal', rating: 4.7, address: 'Main Town, Ganderbal, Jammu & Kashmir 191201', description: 'One of the oldest government schools offering quality education and strong academics.' },
        { name: 'Presentation Convent School, Ganderbal', rating: 4.6, address: 'Near Main Market, Ganderbal, Jammu & Kashmir 191201', description: 'English-medium school focusing on discipline and holistic education.' },
        { name: 'St. Joseph’s School, Ganderbal', rating: 4.5, address: 'Main Road, Ganderbal, Jammu & Kashmir 191201', description: 'Private school emphasizing academics and extracurricular activities.' },
        { name: 'Green Valley Public School, Ganderbal', rating: 4.4, address: 'Station Road, Ganderbal, Jammu & Kashmir 191201', description: 'CBSE-affiliated school providing holistic education and skill development.' }
    ],
    restaurants: [
        { name: 'Ganderbal Food Plaza', rating: 4.6, address: 'Main Market, Ganderbal, Jammu & Kashmir 191201', description: 'Casual dining restaurant serving North Indian and Kashmiri cuisines.' },
        { name: 'The Spice Garden', rating: 4.5, address: 'Station Road, Ganderbal, Jammu & Kashmir 191201', description: 'Family restaurant offering traditional Indian meals and snacks.' },
        { name: 'Royal Treat', rating: 4.5, address: 'Near Ganderbal Town Center, Jammu & Kashmir 191201', description: 'Popular eatery serving biryani, rolls, and fast food items.' },
        { name: 'Chili Point', rating: 4.4, address: 'Ganderbal Main Road, Jammu & Kashmir 191201', description: 'Modern restaurant offering Indo-Chinese dishes and snacks.' }
    ],
    hospitals: [
        { name: 'District Hospital Ganderbal', rating: 4.6, address: 'Hospital Road, Ganderbal, Jammu & Kashmir 191201', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'City Care Hospital', rating: 4.5, address: 'Main Road, Ganderbal, Jammu & Kashmir 191201', description: 'Private hospital offering multi-specialty and outpatient services.' },
        { name: 'Apollo Diagnostics Ganderbal', rating: 4.5, address: 'Station Road, Ganderbal, Jammu & Kashmir 191201', description: 'Diagnostic center providing lab tests and medical consultations.' },
        { name: 'Shivam Hospital', rating: 4.4, address: 'Town Center, Ganderbal, Jammu & Kashmir 191201', description: 'Community healthcare facility with OPD and minor surgical services.' }
    ],
    touristSpots: [
        { name: 'Gangbal Lake', rating: 4.9, address: 'Ganderbal, Jammu & Kashmir', description: 'High-altitude lake surrounded by mountains, perfect for trekking and nature photography.' },
        { name: 'Himalayan Meadows', rating: 4.8, address: 'Ganderbal, Jammu & Kashmir', description: 'Scenic meadows offering panoramic views and trekking opportunities.' },
        { name: 'Kheer Bhawani Temple', rating: 4.7, address: 'Tulmul, Ganderbal, Jammu & Kashmir', description: 'Famous Hindu temple attracting devotees and tourists alike.' },
        { name: 'Sonamarg', rating: 4.8, address: 'Ganderbal, Jammu & Kashmir', description: 'Popular hill station known for rivers, snow peaks, and adventure tourism.' }
    ]
},
'kupwara': { 
    schools: [
        { name: 'Government Higher Secondary School, Kupwara', rating: 4.7, address: 'Main Town, Kupwara, Jammu & Kashmir 193222', description: 'One of the oldest government schools offering quality education and strong academics.' },
        { name: 'Presentation Convent School, Kupwara', rating: 4.6, address: 'Near Main Market, Kupwara, Jammu & Kashmir 193222', description: 'English-medium school focusing on discipline and holistic education.' },
        { name: 'St. Joseph’s School, Kupwara', rating: 4.5, address: 'Main Road, Kupwara, Jammu & Kashmir 193222', description: 'Private school emphasizing academics and extracurricular activities.' },
        { name: 'Green Valley Public School, Kupwara', rating: 4.4, address: 'Station Road, Kupwara, Jammu & Kashmir 193222', description: 'CBSE-affiliated school providing holistic education and skill development.' }
    ],
    restaurants: [
        { name: 'Kupwara Food Plaza', rating: 4.6, address: 'Main Market, Kupwara, Jammu & Kashmir 193222', description: 'Casual dining restaurant serving North Indian and Kashmiri cuisines.' },
        { name: 'The Spice Garden', rating: 4.5, address: 'Station Road, Kupwara, Jammu & Kashmir 193222', description: 'Family restaurant offering traditional Indian meals and snacks.' },
        { name: 'Royal Treat', rating: 4.5, address: 'Near Kupwara Town Center, Jammu & Kashmir 193222', description: 'Popular eatery serving biryani, rolls, and fast food items.' },
        { name: 'Chili Point', rating: 4.4, address: 'Kupwara Main Road, Jammu & Kashmir 193222', description: 'Modern restaurant offering Indo-Chinese dishes and snacks.' }
    ],
    hospitals: [
        { name: 'District Hospital Kupwara', rating: 4.6, address: 'Hospital Road, Kupwara, Jammu & Kashmir 193222', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'City Care Hospital', rating: 4.5, address: 'Main Road, Kupwara, Jammu & Kashmir 193222', description: 'Private hospital offering multi-specialty and outpatient services.' },
        { name: 'Apollo Diagnostics Kupwara', rating: 4.5, address: 'Station Road, Kupwara, Jammu & Kashmir 193222', description: 'Diagnostic center providing lab tests and medical consultations.' },
        { name: 'Shivam Hospital', rating: 4.4, address: 'Town Center, Kupwara, Jammu & Kashmir 193222', description: 'Community healthcare facility with OPD and minor surgical services.' }
    ],
    touristSpots: [
        { name: 'Ragdan Hill', rating: 4.8, address: 'Kupwara, Jammu & Kashmir', description: 'Scenic hill offering trekking, panoramic views, and nature walks.' },
        { name: 'Lolab Valley', rating: 4.9, address: 'Kupwara, Jammu & Kashmir', description: 'Beautiful valley known for lush greenery, rivers, and outdoor activities.' },
        { name: 'Doodhpathri', rating: 4.9, address: 'Near Kupwara, Jammu & Kashmir', description: 'Meadow area famous for snow, trekking, and natural beauty.' },
        { name: 'Bangus Valley', rating: 4.8, address: 'Kupwara, Jammu & Kashmir', description: 'Remote valley offering pristine landscapes, ideal for adventure and photography.' }
    ]
},
'srinagar': { 
    schools: [
        { name: 'Burn Hall School, Srinagar', rating: 4.8, address: 'Srinagar, Jammu & Kashmir 190001', description: 'Prestigious school known for excellent academics and extracurricular programs.' },
        { name: 'Tyndale Biscoe School', rating: 4.7, address: 'Srinagar, Jammu & Kashmir 190001', description: 'English-medium school focusing on holistic development and character building.' },
        { name: 'Presentation Convent School, Srinagar', rating: 4.6, address: 'Srinagar, Jammu & Kashmir 190001', description: 'Reputed school emphasizing discipline, academics, and extracurricular activities.' },
        { name: 'Delhi Public School, Srinagar', rating: 4.5, address: 'Srinagar, Jammu & Kashmir 190001', description: 'CBSE-affiliated school providing quality education and skill development.' }
    ],
    restaurants: [
        { name: 'Ahdoos Restaurant', rating: 4.8, address: 'Raj Bagh, Srinagar, Jammu & Kashmir 190001', description: 'Famous for traditional Kashmiri cuisine and authentic flavors.' },
        { name: 'Krishna Vaishno Dhaba', rating: 4.7, address: 'Srinagar, Jammu & Kashmir 190001', description: 'Popular vegetarian restaurant serving Indian and local dishes.' },
        { name: 'Shamyana Restaurant', rating: 4.6, address: 'Srinagar, Jammu & Kashmir 190001', description: 'Family-friendly dining with multi-cuisine options including Kashmiri delicacies.' },
        { name: 'Mughal Darbar', rating: 4.5, address: 'Srinagar, Jammu & Kashmir 190001', description: 'Restaurant serving traditional Mughlai and Kashmiri dishes.' }
    ],
    hospitals: [
        { name: 'Sher-i-Kashmir Institute of Medical Sciences', rating: 4.8, address: 'Srinagar, Jammu & Kashmir 190010', description: 'Leading government hospital providing advanced medical services and specialty care.' },
        { name: 'SMHS Hospital', rating: 4.7, address: 'Srinagar, Jammu & Kashmir 190010', description: 'Government hospital offering general and emergency healthcare services.' },
        { name: 'Apollo Diagnostics Srinagar', rating: 4.6, address: 'Srinagar, Jammu & Kashmir 190001', description: 'Diagnostic center providing lab tests and medical consultations.' },
        { name: 'City Care Hospital', rating: 4.5, address: 'Srinagar, Jammu & Kashmir 190001', description: 'Private hospital offering multi-specialty and outpatient services.' }
    ],
    touristSpots: [
        { name: 'Dal Lake', rating: 4.9, address: 'Srinagar, Jammu & Kashmir', description: 'Iconic lake famous for shikara rides, houseboats, and scenic beauty.' },
        { name: 'Shankaracharya Temple', rating: 4.8, address: 'Srinagar, Jammu & Kashmir', description: 'Ancient temple perched on a hill offering panoramic views of Srinagar.' },
        { name: 'Mughal Gardens', rating: 4.8, address: 'Srinagar, Jammu & Kashmir', description: 'Beautiful gardens showcasing Mughal-era architecture and landscaping.' },
        { name: 'Hazratbal Shrine', rating: 4.7, address: 'Srinagar, Jammu & Kashmir', description: 'Important religious site with beautiful views of Dal Lake.' }
    ]
},
'anantnag': { 
    schools: [
        { name: 'Government Higher Secondary School, Anantnag', rating: 4.7, address: 'Main Town, Anantnag, Jammu & Kashmir 192101', description: 'One of the oldest government schools offering quality education and strong academics.' },
        { name: 'Presentation Convent School, Anantnag', rating: 4.6, address: 'Near Main Market, Anantnag, Jammu & Kashmir 192101', description: 'English-medium school focusing on discipline and holistic education.' },
        { name: 'St. Joseph’s School, Anantnag', rating: 4.5, address: 'Main Road, Anantnag, Jammu & Kashmir 192101', description: 'Private school emphasizing academics and extracurricular activities.' },
        { name: 'Green Valley Public School, Anantnag', rating: 4.4, address: 'Station Road, Anantnag, Jammu & Kashmir 192101', description: 'CBSE-affiliated school providing holistic education and skill development.' }
    ],
    restaurants: [
        { name: 'Anantnag Food Plaza', rating: 4.6, address: 'Main Market, Anantnag, Jammu & Kashmir 192101', description: 'Casual dining restaurant serving North Indian and Kashmiri cuisines.' },
        { name: 'The Spice Garden', rating: 4.5, address: 'Station Road, Anantnag, Jammu & Kashmir 192101', description: 'Family restaurant offering traditional Indian meals and snacks.' },
        { name: 'Royal Treat', rating: 4.5, address: 'Near Anantnag Town Center, Jammu & Kashmir 192101', description: 'Popular eatery serving biryani, rolls, and fast food items.' },
        { name: 'Chili Point', rating: 4.4, address: 'Anantnag Main Road, Jammu & Kashmir 192101', description: 'Modern restaurant offering Indo-Chinese dishes and snacks.' }
    ],
    hospitals: [
        { name: 'District Hospital Anantnag', rating: 4.6, address: 'Hospital Road, Anantnag, Jammu & Kashmir 192101', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'City Care Hospital', rating: 4.5, address: 'Main Road, Anantnag, Jammu & Kashmir 192101', description: 'Private hospital offering multi-specialty and outpatient services.' },
        { name: 'Apollo Diagnostics Anantnag', rating: 4.5, address: 'Station Road, Anantnag, Jammu & Kashmir 192101', description: 'Diagnostic center providing lab tests and medical consultations.' },
        { name: 'Shivam Hospital', rating: 4.4, address: 'Town Center, Anantnag, Jammu & Kashmir 192101', description: 'Community healthcare facility with OPD and minor surgical services.' }
    ],
    touristSpots: [
        { name: 'Betaab Valley', rating: 4.9, address: 'Anantnag, Jammu & Kashmir', description: 'Scenic valley ideal for trekking, photography, and nature walks.' },
        { name: 'Aru Valley', rating: 4.8, address: 'Anantnag, Jammu & Kashmir', description: 'Beautiful valley known for lush greenery, rivers, and adventure tourism.' },
        { name: 'Pahalgam', rating: 4.9, address: 'Near Anantnag, Jammu & Kashmir', description: 'Famous hill station offering skiing, trekking, and river views.' },
        { name: 'Chandanwari', rating: 4.7, address: 'Anantnag, Jammu & Kashmir', description: 'Starting point for Amarnath Yatra and popular tourist destination.' }
    ]
},
'kishtwar': { 
    schools: [
        { name: 'Government Higher Secondary School, Kishtwar', rating: 4.7, address: 'Main Town, Kishtwar, Jammu & Kashmir 182204', description: 'One of the oldest government schools offering quality education and strong academics.' },
        { name: 'Presentation Convent School, Kishtwar', rating: 4.6, address: 'Near Main Market, Kishtwar, Jammu & Kashmir 182204', description: 'English-medium school focusing on discipline and holistic education.' },
        { name: 'St. Joseph’s School, Kishtwar', rating: 4.5, address: 'Main Road, Kishtwar, Jammu & Kashmir 182204', description: 'Private school emphasizing academics and extracurricular activities.' },
        { name: 'Green Valley Public School, Kishtwar', rating: 4.4, address: 'Station Road, Kishtwar, Jammu & Kashmir 182204', description: 'CBSE-affiliated school providing holistic education and skill development.' }
    ],
    restaurants: [
        { name: 'Kishtwar Food Plaza', rating: 4.6, address: 'Main Market, Kishtwar, Jammu & Kashmir 182204', description: 'Casual dining restaurant serving North Indian and Kashmiri cuisines.' },
        { name: 'The Spice Garden', rating: 4.5, address: 'Station Road, Kishtwar, Jammu & Kashmir 182204', description: 'Family restaurant offering traditional Indian meals and snacks.' },
        { name: 'Royal Treat', rating: 4.5, address: 'Near Kishtwar Town Center, Jammu & Kashmir 182204', description: 'Popular eatery serving biryani, rolls, and fast food items.' },
        { name: 'Chili Point', rating: 4.4, address: 'Kishtwar Main Road, Jammu & Kashmir 182204', description: 'Modern restaurant offering Indo-Chinese dishes and snacks.' }
    ],
    hospitals: [
        { name: 'District Hospital Kishtwar', rating: 4.6, address: 'Hospital Road, Kishtwar, Jammu & Kashmir 182204', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'City Care Hospital', rating: 4.5, address: 'Main Road, Kishtwar, Jammu & Kashmir 182204', description: 'Private hospital offering multi-specialty and outpatient services.' },
        { name: 'Apollo Diagnostics Kishtwar', rating: 4.5, address: 'Station Road, Kishtwar, Jammu & Kashmir 182204', description: 'Diagnostic center providing lab tests and medical consultations.' },
        { name: 'Shivam Hospital', rating: 4.4, address: 'Town Center, Kishtwar, Jammu & Kashmir 182204', description: 'Community healthcare facility with OPD and minor surgical services.' }
    ],
    touristSpots: [
        { name: 'Kishtwar National Park', rating: 4.9, address: 'Kishtwar, Jammu & Kashmir', description: 'Protected park known for wildlife, trekking, and scenic beauty.' },
        { name: 'Sinthan Pass', rating: 4.8, address: 'Near Kishtwar, Jammu & Kashmir', description: 'High-altitude mountain pass offering panoramic views and adventure tourism.' },
        { name: 'Chenab River', rating: 4.7, address: 'Kishtwar, Jammu & Kashmir', description: 'Famous river ideal for fishing, picnics, and nature photography.' },
        { name: 'Sarthal Valley', rating: 4.8, address: 'Kishtwar, Jammu & Kashmir', description: 'Valley known for scenic landscapes, trekking, and natural beauty.' }
    ]
},
'ramban': { 
    schools: [
        { name: 'Government Higher Secondary School, Ramban', rating: 4.7, address: 'Main Town, Ramban, Jammu & Kashmir 182144', description: 'One of the oldest government schools offering quality education and strong academics.' },
        { name: 'Presentation Convent School, Ramban', rating: 4.6, address: 'Near Main Market, Ramban, Jammu & Kashmir 182144', description: 'English-medium school focusing on discipline and holistic education.' },
        { name: 'St. Joseph’s School, Ramban', rating: 4.5, address: 'Main Road, Ramban, Jammu & Kashmir 182144', description: 'Private school emphasizing academics and extracurricular activities.' },
        { name: 'Green Valley Public School, Ramban', rating: 4.4, address: 'Station Road, Ramban, Jammu & Kashmir 182144', description: 'CBSE-affiliated school providing holistic education and skill development.' }
    ],
    restaurants: [
        { name: 'Ramban Food Plaza', rating: 4.6, address: 'Main Market, Ramban, Jammu & Kashmir 182144', description: 'Casual dining restaurant serving North Indian and Kashmiri cuisines.' },
        { name: 'The Spice Garden', rating: 4.5, address: 'Station Road, Ramban, Jammu & Kashmir 182144', description: 'Family restaurant offering traditional Indian meals and snacks.' },
        { name: 'Royal Treat', rating: 4.5, address: 'Near Ramban Town Center, Jammu & Kashmir 182144', description: 'Popular eatery serving biryani, rolls, and fast food items.' },
        { name: 'Chili Point', rating: 4.4, address: 'Ramban Main Road, Jammu & Kashmir 182144', description: 'Modern restaurant offering Indo-Chinese dishes and snacks.' }
    ],
    hospitals: [
        { name: 'District Hospital Ramban', rating: 4.6, address: 'Hospital Road, Ramban, Jammu & Kashmir 182144', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'City Care Hospital', rating: 4.5, address: 'Main Road, Ramban, Jammu & Kashmir 182144', description: 'Private hospital offering multi-specialty and outpatient services.' },
        { name: 'Apollo Diagnostics Ramban', rating: 4.5, address: 'Station Road, Ramban, Jammu & Kashmir 182144', description: 'Diagnostic center providing lab tests and medical consultations.' },
        { name: 'Shivam Hospital', rating: 4.4, address: 'Town Center, Ramban, Jammu & Kashmir 182144', description: 'Community healthcare facility with OPD and minor surgical services.' }
    ],
    touristSpots: [
        { name: 'Chenab Bridge', rating: 4.8, address: 'Ramban, Jammu & Kashmir', description: 'Famous suspension bridge and scenic spot for photography.' },
        { name: 'Sanasar', rating: 4.7, address: 'Near Ramban, Jammu & Kashmir', description: 'Hill station offering adventure activities like paragliding, trekking, and camping.' },
        { name: 'Ramban Fort', rating: 4.6, address: 'Ramban, Jammu & Kashmir', description: 'Historic fort attracting tourists and history enthusiasts.' },
        { name: 'Banihal Pass', rating: 4.7, address: 'Ramban, Jammu & Kashmir', description: 'Mountain pass offering stunning views and trekking opportunities.' }
    ]
},
'reasi': { 
    schools: [
        { name: 'Government Higher Secondary School, Reasi', rating: 4.7, address: 'Main Town, Reasi, Jammu & Kashmir 182311', description: 'One of the oldest government schools offering quality education and strong academics.' },
        { name: 'Presentation Convent School, Reasi', rating: 4.6, address: 'Near Main Market, Reasi, Jammu & Kashmir 182311', description: 'English-medium school focusing on discipline and holistic education.' },
        { name: 'St. Joseph’s School, Reasi', rating: 4.5, address: 'Main Road, Reasi, Jammu & Kashmir 182311', description: 'Private school emphasizing academics and extracurricular activities.' },
        { name: 'Green Valley Public School, Reasi', rating: 4.4, address: 'Station Road, Reasi, Jammu & Kashmir 182311', description: 'CBSE-affiliated school providing holistic education and skill development.' }
    ],
    restaurants: [
        { name: 'Reasi Food Plaza', rating: 4.6, address: 'Main Market, Reasi, Jammu & Kashmir 182311', description: 'Casual dining restaurant serving North Indian and local cuisines.' },
        { name: 'The Spice Garden', rating: 4.5, address: 'Station Road, Reasi, Jammu & Kashmir 182311', description: 'Family restaurant offering traditional Indian meals and snacks.' },
        { name: 'Royal Treat', rating: 4.5, address: 'Near Reasi Town Center, Jammu & Kashmir 182311', description: 'Popular eatery serving biryani, rolls, and fast food items.' },
        { name: 'Chili Point', rating: 4.4, address: 'Reasi Main Road, Jammu & Kashmir 182311', description: 'Modern restaurant offering Indo-Chinese dishes and snacks.' }
    ],
    hospitals: [
        { name: 'District Hospital Reasi', rating: 4.6, address: 'Hospital Road, Reasi, Jammu & Kashmir 182311', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'City Care Hospital', rating: 4.5, address: 'Main Road, Reasi, Jammu & Kashmir 182311', description: 'Private hospital offering multi-specialty and outpatient services.' },
        { name: 'Apollo Diagnostics Reasi', rating: 4.5, address: 'Station Road, Reasi, Jammu & Kashmir 182311', description: 'Diagnostic center providing lab tests and medical consultations.' },
        { name: 'Shivam Hospital', rating: 4.4, address: 'Town Center, Reasi, Jammu & Kashmir 182311', description: 'Community healthcare facility with OPD and minor surgical services.' }
    ],
    touristSpots: [
        { name: 'Vaishno Devi Temple', rating: 5.0, address: 'Katra, Reasi, Jammu & Kashmir', description: 'Famous Hindu pilgrimage site attracting millions of devotees annually.' },
        { name: 'Baba Dhansar', rating: 4.7, address: 'Reasi, Jammu & Kashmir', description: 'Sacred spot with temple and natural surroundings.' },
        { name: 'Siarh Baba', rating: 4.6, address: 'Reasi, Jammu & Kashmir', description: 'Historic site popular for religious tourism and scenic beauty.' },
        { name: 'Katra Hills', rating: 4.8, address: 'Reasi, Jammu & Kashmir', description: 'Hilly region offering trekking and panoramic views of the valley.' }
    ]
},
'doda': { 
    schools: [
        { name: 'Government Higher Secondary School, Doda', rating: 4.7, address: 'Main Town, Doda, Jammu & Kashmir 182201', description: 'One of the oldest government schools offering quality education and strong academics.' },
        { name: 'Presentation Convent School, Doda', rating: 4.6, address: 'Near Main Market, Doda, Jammu & Kashmir 182201', description: 'English-medium school focusing on discipline and holistic education.' },
        { name: 'St. Joseph’s School, Doda', rating: 4.5, address: 'Main Road, Doda, Jammu & Kashmir 182201', description: 'Private school emphasizing academics and extracurricular activities.' },
        { name: 'Green Valley Public School, Doda', rating: 4.4, address: 'Station Road, Doda, Jammu & Kashmir 182201', description: 'CBSE-affiliated school providing holistic education and skill development.' }
    ],
    restaurants: [
        { name: 'Doda Food Plaza', rating: 4.6, address: 'Main Market, Doda, Jammu & Kashmir 182201', description: 'Casual dining restaurant serving North Indian and local cuisines.' },
        { name: 'The Spice Garden', rating: 4.5, address: 'Station Road, Doda, Jammu & Kashmir 182201', description: 'Family restaurant offering traditional Indian meals and snacks.' },
        { name: 'Royal Treat', rating: 4.5, address: 'Near Doda Town Center, Jammu & Kashmir 182201', description: 'Popular eatery serving biryani, rolls, and fast food items.' },
        { name: 'Chili Point', rating: 4.4, address: 'Doda Main Road, Jammu & Kashmir 182201', description: 'Modern restaurant offering Indo-Chinese dishes and snacks.' }
    ],
    hospitals: [
        { name: 'District Hospital Doda', rating: 4.6, address: 'Hospital Road, Doda, Jammu & Kashmir 182201', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'City Care Hospital', rating: 4.5, address: 'Main Road, Doda, Jammu & Kashmir 182201', description: 'Private hospital offering multi-specialty and outpatient services.' },
        { name: 'Apollo Diagnostics Doda', rating: 4.5, address: 'Station Road, Doda, Jammu & Kashmir 182201', description: 'Diagnostic center providing lab tests and medical consultations.' },
        { name: 'Shivam Hospital', rating: 4.4, address: 'Town Center, Doda, Jammu & Kashmir 182201', description: 'Community healthcare facility with OPD and minor surgical services.' }
    ],
    touristSpots: [
        { name: 'Bhaderwah Valley', rating: 4.9, address: 'Doda, Jammu & Kashmir', description: 'Scenic valley known for lush greenery, rivers, and trekking opportunities.' },
        { name: 'Padri Pass', rating: 4.8, address: 'Doda, Jammu & Kashmir', description: 'Mountain pass offering panoramic views and adventure tourism.' },
        { name: 'Chinta Valley', rating: 4.7, address: 'Doda, Jammu & Kashmir', description: 'Beautiful valley ideal for nature walks and photography.' },
        { name: 'Sudh Mahadev Temple', rating: 4.6, address: 'Doda, Jammu & Kashmir', description: 'Historic Hindu temple attracting devotees and tourists.' }
    ]
},
'kathua': { 
    schools: [
        { name: 'Government Higher Secondary School, Kathua', rating: 4.7, address: 'Main Town, Kathua, Jammu & Kashmir 184101', description: 'One of the oldest government schools offering quality education and strong academics.' },
        { name: 'Presentation Convent School, Kathua', rating: 4.6, address: 'Near Main Market, Kathua, Jammu & Kashmir 184101', description: 'English-medium school focusing on discipline and holistic education.' },
        { name: 'St. Joseph’s School, Kathua', rating: 4.5, address: 'Main Road, Kathua, Jammu & Kashmir 184101', description: 'Private school emphasizing academics and extracurricular activities.' },
        { name: 'Green Valley Public School, Kathua', rating: 4.4, address: 'Station Road, Kathua, Jammu & Kashmir 184101', description: 'CBSE-affiliated school providing holistic education and skill development.' }
    ],
    restaurants: [
        { name: 'Kathua Food Plaza', rating: 4.6, address: 'Main Market, Kathua, Jammu & Kashmir 184101', description: 'Casual dining restaurant serving North Indian and local cuisines.' },
        { name: 'The Spice Garden', rating: 4.5, address: 'Station Road, Kathua, Jammu & Kashmir 184101', description: 'Family restaurant offering traditional Indian meals and snacks.' },
        { name: 'Royal Treat', rating: 4.5, address: 'Near Kathua Town Center, Jammu & Kashmir 184101', description: 'Popular eatery serving biryani, rolls, and fast food items.' },
        { name: 'Chili Point', rating: 4.4, address: 'Kathua Main Road, Jammu & Kashmir 184101', description: 'Modern restaurant offering Indo-Chinese dishes and snacks.' }
    ],
    hospitals: [
        { name: 'District Hospital Kathua', rating: 4.6, address: 'Hospital Road, Kathua, Jammu & Kashmir 184101', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'City Care Hospital', rating: 4.5, address: 'Main Road, Kathua, Jammu & Kashmir 184101', description: 'Private hospital offering multi-specialty and outpatient services.' },
        { name: 'Apollo Diagnostics Kathua', rating: 4.5, address: 'Station Road, Kathua, Jammu & Kashmir 184101', description: 'Diagnostic center providing lab tests and medical consultations.' },
        { name: 'Shivam Hospital', rating: 4.4, address: 'Town Center, Kathua, Jammu & Kashmir 184101', description: 'Community healthcare facility with OPD and minor surgical services.' }
    ],
    touristSpots: [
        { name: 'Mubarak Mandi Palace', rating: 4.8, address: 'Kathua, Jammu & Kashmir', description: 'Historic palace known for architecture and cultural significance.' },
        { name: 'Ramkunda', rating: 4.7, address: 'Kathua, Jammu & Kashmir', description: 'Sacred site and natural spot attracting pilgrims and tourists.' },
        { name: 'Parole', rating: 4.6, address: 'Kathua, Jammu & Kashmir', description: 'Serene place known for natural beauty and calm surroundings.' },
        { name: 'Bhimakali Temple', rating: 4.7, address: 'Kathua, Jammu & Kashmir', description: 'Historic temple and popular tourist destination.' }
    ]
},
'udhampur': { 
    schools: [
        { name: 'Government Higher Secondary School, Udhampur', rating: 4.7, address: 'Main Town, Udhampur, Jammu & Kashmir 182101', description: 'One of the oldest government schools offering quality education and strong academics.' },
        { name: 'Presentation Convent School, Udhampur', rating: 4.6, address: 'Near Main Market, Udhampur, Jammu & Kashmir 182101', description: 'English-medium school focusing on discipline and holistic education.' },
        { name: 'St. Joseph’s School, Udhampur', rating: 4.5, address: 'Main Road, Udhampur, Jammu & Kashmir 182101', description: 'Private school emphasizing academics and extracurricular activities.' },
        { name: 'Green Valley Public School, Udhampur', rating: 4.4, address: 'Station Road, Udhampur, Jammu & Kashmir 182101', description: 'CBSE-affiliated school providing holistic education and skill development.' }
    ],
    restaurants: [
        { name: 'Udhampur Food Plaza', rating: 4.6, address: 'Main Market, Udhampur, Jammu & Kashmir 182101', description: 'Casual dining restaurant serving North Indian and local cuisines.' },
        { name: 'The Spice Garden', rating: 4.5, address: 'Station Road, Udhampur, Jammu & Kashmir 182101', description: 'Family restaurant offering traditional Indian meals and snacks.' },
        { name: 'Royal Treat', rating: 4.5, address: 'Near Udhampur Town Center, Jammu & Kashmir 182101', description: 'Popular eatery serving biryani, rolls, and fast food items.' },
        { name: 'Chili Point', rating: 4.4, address: 'Udhampur Main Road, Jammu & Kashmir 182101', description: 'Modern restaurant offering Indo-Chinese dishes and snacks.' }
    ],
    hospitals: [
        { name: 'District Hospital Udhampur', rating: 4.6, address: 'Hospital Road, Udhampur, Jammu & Kashmir 182101', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'City Care Hospital', rating: 4.5, address: 'Main Road, Udhampur, Jammu & Kashmir 182101', description: 'Private hospital offering multi-specialty and outpatient services.' },
        { name: 'Apollo Diagnostics Udhampur', rating: 4.5, address: 'Station Road, Udhampur, Jammu & Kashmir 182101', description: 'Diagnostic center providing lab tests and medical consultations.' },
        { name: 'Shivam Hospital', rating: 4.4, address: 'Town Center, Udhampur, Jammu & Kashmir 182101', description: 'Community healthcare facility with OPD and minor surgical services.' }
    ],
    touristSpots: [
        { name: 'Mansar Lake', rating: 4.9, address: 'Udhampur, Jammu & Kashmir', description: 'Scenic lake surrounded by hills, perfect for boating and nature walks.' },
        { name: 'Mata Vaishno Devi Shrine', rating: 5.0, address: 'Katra, Udhampur, Jammu & Kashmir', description: 'Major pilgrimage site attracting devotees from all over India.' },
        { name: 'Ramnagar Fort', rating: 4.7, address: 'Udhampur, Jammu & Kashmir', description: 'Historic fort and popular tourist attraction.' },
        { name: 'Sanasar', rating: 4.8, address: 'Near Udhampur, Jammu & Kashmir', description: 'Hill station offering adventure sports, trekking, and scenic beauty.' }
    ]
},
'poonch': { 
    schools: [
        { name: 'Government Higher Secondary School, Poonch', rating: 4.7, address: 'Main Town, Poonch, Jammu & Kashmir 185101', description: 'One of the oldest government schools offering quality education and strong academics.' },
        { name: 'Presentation Convent School, Poonch', rating: 4.6, address: 'Near Main Market, Poonch, Jammu & Kashmir 185101', description: 'English-medium school focusing on discipline and holistic education.' },
        { name: 'St. Joseph’s School, Poonch', rating: 4.5, address: 'Main Road, Poonch, Jammu & Kashmir 185101', description: 'Private school emphasizing academics and extracurricular activities.' },
        { name: 'Green Valley Public School, Poonch', rating: 4.4, address: 'Station Road, Poonch, Jammu & Kashmir 185101', description: 'CBSE-affiliated school providing holistic education and skill development.' }
    ],
    restaurants: [
        { name: 'Poonch Food Plaza', rating: 4.6, address: 'Main Market, Poonch, Jammu & Kashmir 185101', description: 'Casual dining restaurant serving North Indian and local cuisines.' },
        { name: 'The Spice Garden', rating: 4.5, address: 'Station Road, Poonch, Jammu & Kashmir 185101', description: 'Family restaurant offering traditional Indian meals and snacks.' },
        { name: 'Royal Treat', rating: 4.5, address: 'Near Poonch Town Center, Jammu & Kashmir 185101', description: 'Popular eatery serving biryani, rolls, and fast food items.' },
        { name: 'Chili Point', rating: 4.4, address: 'Poonch Main Road, Jammu & Kashmir 185101', description: 'Modern restaurant offering Indo-Chinese dishes and snacks.' }
    ],
    hospitals: [
        { name: 'District Hospital Poonch', rating: 4.6, address: 'Hospital Road, Poonch, Jammu & Kashmir 185101', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'City Care Hospital', rating: 4.5, address: 'Main Road, Poonch, Jammu & Kashmir 185101', description: 'Private hospital offering multi-specialty and outpatient services.' },
        { name: 'Apollo Diagnostics Poonch', rating: 4.5, address: 'Station Road, Poonch, Jammu & Kashmir 185101', description: 'Diagnostic center providing lab tests and medical consultations.' },
        { name: 'Shivam Hospital', rating: 4.4, address: 'Town Center, Poonch, Jammu & Kashmir 185101', description: 'Community healthcare facility with OPD and minor surgical services.' }
    ],
    touristSpots: [
        { name: 'Poonch Fort', rating: 4.8, address: 'Poonch, Jammu & Kashmir', description: 'Historic fort and popular tourist attraction in the region.' },
        { name: 'Noori Chamb Waterfall', rating: 4.9, address: 'Poonch, Jammu & Kashmir', description: 'Scenic waterfall known for natural beauty and photography.' },
        { name: 'Surankote', rating: 4.7, address: 'Near Poonch, Jammu & Kashmir', description: 'Town with scenic landscapes and cultural significance.' },
        { name: 'Mansar Lake', rating: 4.8, address: 'Poonch, Jammu & Kashmir', description: 'Beautiful lake ideal for relaxation and nature walks.' }
    ]
},
'rajouri': { 
    schools: [
        { name: 'Government Higher Secondary School, Rajouri', rating: 4.7, address: 'Main Town, Rajouri, Jammu & Kashmir 185131', description: 'One of the oldest government schools offering quality education and strong academics.' },
        { name: 'Presentation Convent School, Rajouri', rating: 4.6, address: 'Near Main Market, Rajouri, Jammu & Kashmir 185131', description: 'English-medium school focusing on discipline and holistic education.' },
        { name: 'St. Joseph’s School, Rajouri', rating: 4.5, address: 'Main Road, Rajouri, Jammu & Kashmir 185131', description: 'Private school emphasizing academics and extracurricular activities.' },
        { name: 'Green Valley Public School, Rajouri', rating: 4.4, address: 'Station Road, Rajouri, Jammu & Kashmir 185131', description: 'CBSE-affiliated school providing holistic education and skill development.' }
    ],
    restaurants: [
        { name: 'Rajouri Food Plaza', rating: 4.6, address: 'Main Market, Rajouri, Jammu & Kashmir 185131', description: 'Casual dining restaurant serving North Indian and local cuisines.' },
        { name: 'The Spice Garden', rating: 4.5, address: 'Station Road, Rajouri, Jammu & Kashmir 185131', description: 'Family restaurant offering traditional Indian meals and snacks.' },
        { name: 'Royal Treat', rating: 4.5, address: 'Near Rajouri Town Center, Jammu & Kashmir 185131', description: 'Popular eatery serving biryani, rolls, and fast food items.' },
        { name: 'Chili Point', rating: 4.4, address: 'Rajouri Main Road, Jammu & Kashmir 185131', description: 'Modern restaurant offering Indo-Chinese dishes and snacks.' }
    ],
    hospitals: [
        { name: 'District Hospital Rajouri', rating: 4.6, address: 'Hospital Road, Rajouri, Jammu & Kashmir 185131', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'City Care Hospital', rating: 4.5, address: 'Main Road, Rajouri, Jammu & Kashmir 185131', description: 'Private hospital offering multi-specialty and outpatient services.' },
        { name: 'Apollo Diagnostics Rajouri', rating: 4.5, address: 'Station Road, Rajouri, Jammu & Kashmir 185131', description: 'Diagnostic center providing lab tests and medical consultations.' },
        { name: 'Shivam Hospital', rating: 4.4, address: 'Town Center, Rajouri, Jammu & Kashmir 185131', description: 'Community healthcare facility with OPD and minor surgical services.' }
    ],
    touristSpots: [
        { name: 'Rajouri Fort', rating: 4.8, address: 'Rajouri, Jammu & Kashmir', description: 'Historic fort attracting tourists and history enthusiasts.' },
        { name: 'Mangla Devi Temple', rating: 4.7, address: 'Rajouri, Jammu & Kashmir', description: 'Famous Hindu temple and pilgrimage site.' },
        { name: 'Noori Chamb Waterfall', rating: 4.8, address: 'Rajouri, Jammu & Kashmir', description: 'Scenic waterfall known for natural beauty and photography.' },
        { name: 'Tatta Pani', rating: 4.7, address: 'Rajouri, Jammu & Kashmir', description: 'Hot spring and popular tourist destination.' }
    ]
},
'samba': { 
    schools: [
        { name: 'Government Higher Secondary School, Samba', rating: 4.7, address: 'Main Town, Samba, Jammu & Kashmir 184121', description: 'One of the oldest government schools offering quality education and strong academics.' },
        { name: 'Presentation Convent School, Samba', rating: 4.6, address: 'Near Main Market, Samba, Jammu & Kashmir 184121', description: 'English-medium school focusing on discipline and holistic education.' },
        { name: 'St. Joseph’s School, Samba', rating: 4.5, address: 'Main Road, Samba, Jammu & Kashmir 184121', description: 'Private school emphasizing academics and extracurricular activities.' },
        { name: 'Green Valley Public School, Samba', rating: 4.4, address: 'Station Road, Samba, Jammu & Kashmir 184121', description: 'CBSE-affiliated school providing holistic education and skill development.' }
    ],
    restaurants: [
        { name: 'Samba Food Plaza', rating: 4.6, address: 'Main Market, Samba, Jammu & Kashmir 184121', description: 'Casual dining restaurant serving North Indian and local cuisines.' },
        { name: 'The Spice Garden', rating: 4.5, address: 'Station Road, Samba, Jammu & Kashmir 184121', description: 'Family restaurant offering traditional Indian meals and snacks.' },
        { name: 'Royal Treat', rating: 4.5, address: 'Near Samba Town Center, Jammu & Kashmir 184121', description: 'Popular eatery serving biryani, rolls, and fast food items.' },
        { name: 'Chili Point', rating: 4.4, address: 'Samba Main Road, Jammu & Kashmir 184121', description: 'Modern restaurant offering Indo-Chinese dishes and snacks.' }
    ],
    hospitals: [
        { name: 'District Hospital Samba', rating: 4.6, address: 'Hospital Road, Samba, Jammu & Kashmir 184121', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'City Care Hospital', rating: 4.5, address: 'Main Road, Samba, Jammu & Kashmir 184121', description: 'Private hospital offering multi-specialty and outpatient services.' },
        { name: 'Apollo Diagnostics Samba', rating: 4.5, address: 'Station Road, Samba, Jammu & Kashmir 184121', description: 'Diagnostic center providing lab tests and medical consultations.' },
        { name: 'Shivam Hospital', rating: 4.4, address: 'Town Center, Samba, Jammu & Kashmir 184121', description: 'Community healthcare facility with OPD and minor surgical services.' }
    ],
    touristSpots: [
        { name: 'Baba Banda Bahadur Shrine', rating: 4.8, address: 'Samba, Jammu & Kashmir', description: 'Historic shrine and religious site attracting devotees.' },
        { name: 'Samba Fort', rating: 4.7, address: 'Samba, Jammu & Kashmir', description: 'Historic fort offering scenic views and cultural significance.' },
        { name: 'Ranbireshwar Temple', rating: 4.7, address: 'Samba, Jammu & Kashmir', description: 'Popular Hindu temple and tourist destination.' },
        { name: 'Ghagwal', rating: 4.6, address: 'Samba, Jammu & Kashmir', description: 'Small town with natural beauty and local attractions.' }
    ]
},
'bandipora': { 
    schools: [
        { name: 'Government Higher Secondary School, Bandipora', rating: 4.7, address: 'Main Town, Bandipora, Jammu & Kashmir 193502', description: 'One of the oldest government schools offering quality education and strong academics.' },
        { name: 'Presentation Convent School, Bandipora', rating: 4.6, address: 'Near Main Market, Bandipora, Jammu & Kashmir 193502', description: 'English-medium school focusing on discipline and holistic education.' },
        { name: 'St. Joseph’s School, Bandipora', rating: 4.5, address: 'Main Road, Bandipora, Jammu & Kashmir 193502', description: 'Private school emphasizing academics and extracurricular activities.' },
        { name: 'Green Valley Public School, Bandipora', rating: 4.4, address: 'Station Road, Bandipora, Jammu & Kashmir 193502', description: 'CBSE-affiliated school providing holistic education and skill development.' }
    ],
    restaurants: [
        { name: 'Bandipora Food Plaza', rating: 4.6, address: 'Main Market, Bandipora, Jammu & Kashmir 193502', description: 'Casual dining restaurant serving North Indian and local cuisines.' },
        { name: 'The Spice Garden', rating: 4.5, address: 'Station Road, Bandipora, Jammu & Kashmir 193502', description: 'Family restaurant offering traditional Indian meals and snacks.' },
        { name: 'Royal Treat', rating: 4.5, address: 'Near Bandipora Town Center, Jammu & Kashmir 193502', description: 'Popular eatery serving biryani, rolls, and fast food items.' },
        { name: 'Chili Point', rating: 4.4, address: 'Bandipora Main Road, Jammu & Kashmir 193502', description: 'Modern restaurant offering Indo-Chinese dishes and snacks.' }
    ],
    hospitals: [
        { name: 'District Hospital Bandipora', rating: 4.6, address: 'Hospital Road, Bandipora, Jammu & Kashmir 193502', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'City Care Hospital', rating: 4.5, address: 'Main Road, Bandipora, Jammu & Kashmir 193502', description: 'Private hospital offering multi-specialty and outpatient services.' },
        { name: 'Apollo Diagnostics Bandipora', rating: 4.5, address: 'Station Road, Bandipora, Jammu & Kashmir 193502', description: 'Diagnostic center providing lab tests and medical consultations.' },
        { name: 'Shivam Hospital', rating: 4.4, address: 'Town Center, Bandipora, Jammu & Kashmir 193502', description: 'Community healthcare facility with OPD and minor surgical services.' }
    ],
    touristSpots: [
        { name: 'Wular Lake', rating: 4.9, address: 'Bandipora, Jammu & Kashmir', description: 'One of the largest freshwater lakes in Asia, ideal for boating and bird watching.' },
        { name: 'Hajin', rating: 4.7, address: 'Bandipora, Jammu & Kashmir', description: 'Town known for scenic beauty and religious significance.' },
        { name: 'Gurudwara Chatti Patshahi', rating: 4.6, address: 'Bandipora, Jammu & Kashmir', description: 'Historic Sikh shrine attracting devotees and tourists.' },
        { name: 'Sangam', rating: 4.7, address: 'Bandipora, Jammu & Kashmir', description: 'Confluence of rivers offering natural beauty and tranquility.' }
    ]
},
'kupwara': { 
    schools: [
        { name: 'Government Higher Secondary School, Kupwara', rating: 4.7, address: 'Main Town, Kupwara, Jammu & Kashmir 193222', description: 'One of the oldest government schools offering quality education and strong academics.' },
        { name: 'Presentation Convent School, Kupwara', rating: 4.6, address: 'Near Main Market, Kupwara, Jammu & Kashmir 193222', description: 'English-medium school focusing on discipline and holistic education.' },
        { name: 'St. Joseph’s School, Kupwara', rating: 4.5, address: 'Main Road, Kupwara, Jammu & Kashmir 193222', description: 'Private school emphasizing academics and extracurricular activities.' },
        { name: 'Green Valley Public School, Kupwara', rating: 4.4, address: 'Station Road, Kupwara, Jammu & Kashmir 193222', description: 'CBSE-affiliated school providing holistic education and skill development.' }
    ],
    restaurants: [
        { name: 'Kupwara Food Plaza', rating: 4.6, address: 'Main Market, Kupwara, Jammu & Kashmir 193222', description: 'Casual dining restaurant serving North Indian and local cuisines.' },
        { name: 'The Spice Garden', rating: 4.5, address: 'Station Road, Kupwara, Jammu & Kashmir 193222', description: 'Family restaurant offering traditional Indian meals and snacks.' },
        { name: 'Royal Treat', rating: 4.5, address: 'Near Kupwara Town Center, Jammu & Kashmir 193222', description: 'Popular eatery serving biryani, rolls, and fast food items.' },
        { name: 'Chili Point', rating: 4.4, address: 'Kupwara Main Road, Jammu & Kashmir 193222', description: 'Modern restaurant offering Indo-Chinese dishes and snacks.' }
    ],
    hospitals: [
        { name: 'District Hospital Kupwara', rating: 4.6, address: 'Hospital Road, Kupwara, Jammu & Kashmir 193222', description: 'Government hospital providing general and emergency healthcare services.' },
        { name: 'City Care Hospital', rating: 4.5, address: 'Main Road, Kupwara, Jammu & Kashmir 193222', description: 'Private hospital offering multi-specialty and outpatient services.' },
        { name: 'Apollo Diagnostics Kupwara', rating: 4.5, address: 'Station Road, Kupwara, Jammu & Kashmir 193222', description: 'Diagnostic center providing lab tests and medical consultations.' },
        { name: 'Shivam Hospital', rating: 4.4, address: 'Town Center, Kupwara, Jammu & Kashmir 193222', description: 'Community healthcare facility with OPD and minor surgical services.' }
    ],
    touristSpots: [
        { name: 'Kupwara Valley', rating: 4.9, address: 'Kupwara, Jammu & Kashmir', description: 'Scenic valley known for lush landscapes and trekking opportunities.' },
        { name: 'Kalaroos', rating: 4.8, address: 'Kupwara, Jammu & Kashmir', description: 'Beautiful region with meadows, rivers, and natural beauty.' },
        { name: 'Bangus Valley', rating: 4.9, address: 'Kupwara, Jammu & Kashmir', description: 'High-altitude valley ideal for trekking, camping, and adventure tourism.' },
        { name: 'Gurez Valley', rating: 4.8, address: 'Kupwara, Jammu & Kashmir', description: 'Remote valley offering stunning landscapes and rich cultural heritage.' }
    ]
},









'almora': {
    schools: [
        { name: 'Government Inter College Almora', rating: 4.7, address: 'Mall Road, Almora, Uttarakhand 263601', description: 'Long-established government college offering strong academics and extracurricular activities.' },
        { name: 'Kumaon Public School, Almora', rating: 4.6, address: 'Dadrinath Road, Almora, Uttarakhand 263601', description: 'Well-known English-medium school focusing on holistic development and character building.' },
        { name: 'Almora Convent School', rating: 4.5, address: 'Mallital, Almora, Uttarakhand 263601', description: 'Private school with emphasis on academics and moral education.' },
        { name: 'Ramakrishna Mission School, Almora', rating: 4.4, address: 'Near Bright End Corner, Almora, Uttarakhand 263601', description: 'Reputed institution known for discipline, strong values and good academic record.' }
    ],
    restaurants: [
        { name: 'Almora Food Plaza', rating: 4.6, address: 'Mall Road, Almora, Uttarakhand 263601', description: 'Casual dining spot offering north Indian and local Kumaoni dishes.' },
        { name: 'The Kumaon Café', rating: 4.5, address: 'Near Bright End Corner, Almora, Uttarakhand 263601', description: 'Cozy café popular for snacks, tea and light meals with mountain views.' },
        { name: 'Himalayan Spice', rating: 4.5, address: 'Bhimtal Road, Almora, Uttarakhand 263601', description: 'Family restaurant serving traditional Kumaoni and Indian cuisine.' },
        { name: 'Sunset View Restaurant', rating: 4.4, address: 'Mallital, Almora, Uttarakhand 263601', description: 'Small rooftop eatery known for tea, local recipes and sunset views.' }
    ],
    hospitals: [
        { name: 'District Hospital Almora', rating: 4.6, address: 'Hospital Road, Almora, Uttarakhand 263601', description: 'Government hospital providing emergency, general medicine and basic specialty care.' },
        { name: 'Kumaon Hospital & Research Centre', rating: 4.5, address: 'Main Road, Almora, Uttarakhand 263601', description: 'Private hospital offering multi-specialty outpatient and diagnostic services.' },
        { name: 'City Medical Centre, Almora', rating: 4.5, address: 'Mall Road, Almora, Uttarakhand 263601', description: 'Clinic and diagnostic centre providing consultations and lab tests.' },
        { name: 'Shivani Nursing Home', rating: 4.4, address: 'Near Bus Stand, Almora, Uttarakhand 263601', description: 'Community nursing home with outpatient services and round-the-clock care.' }
    ],
    touristSpots: [
        { name: 'Zero Point (Almora)', rating: 4.9, address: 'Zero Point, Almora, Uttarakhand', description: 'Famous viewpoint offering panoramic Himalayan views and spectacular sunrises.' },
        { name: 'Kasar Devi Temple', rating: 4.8, address: 'Kasar Devi, Almora, Uttarakhand', description: 'Historic hilltop temple known for its spiritual vibe and amazing vistas.' },
        { name: 'Katarmal Sun Temple', rating: 4.7, address: 'Katarmal, Almora District, Uttarakhand', description: 'Ancient 9th-century sun temple with notable stone architecture.' },
        { name: 'Binsar Wildlife Sanctuary', rating: 4.8, address: 'Binsar, Almora District, Uttarakhand', description: 'Nearby sanctuary offering biodiversity, forest walks and Himalayan panoramas.' }
    ]
},'bageshwar': {
    schools: [
        { name: 'Government Inter College, Bageshwar', rating: 4.7, address: 'Main Town, Bageshwar, Uttarakhand 263642', description: 'Oldest government institution in Bageshwar offering strong academics and extracurriculars.' },
        { name: 'St. Mary’s School, Bageshwar', rating: 4.6, address: 'Kanda Road, Bageshwar, Uttarakhand 263642', description: 'English-medium private school focusing on holistic learning and discipline.' },
        { name: 'Kumaon Public School, Bageshwar', rating: 4.5, address: 'Kapkot Road, Bageshwar, Uttarakhand 263642', description: 'CBSE-affiliated school known for academics and skill-based education.' },
        { name: 'Bright Future Academy', rating: 4.4, address: 'Mall Road, Bageshwar, Uttarakhand 263642', description: 'Private school providing balanced focus on studies and extracurriculars.' }
    ],
    restaurants: [
        { name: 'Bageshwar Food Plaza', rating: 4.6, address: 'Main Market, Bageshwar, Uttarakhand 263642', description: 'Popular local restaurant serving North Indian and Kumaoni cuisine.' },
        { name: 'The Hill View Restaurant', rating: 4.5, address: 'Baijnath Road, Bageshwar, Uttarakhand 263642', description: 'Family restaurant with great views and authentic local dishes.' },
        { name: 'Kumaoni Delight', rating: 4.5, address: 'Kapkot Road, Bageshwar, Uttarakhand 263642', description: 'Serves local specialties and snacks in a traditional setting.' },
        { name: 'Tasty Treat Café', rating: 4.4, address: 'Mall Road, Bageshwar, Uttarakhand 263642', description: 'Café offering tea, coffee, snacks, and quick meals.' }
    ],
    hospitals: [
        { name: 'District Hospital Bageshwar', rating: 4.6, address: 'Hospital Road, Bageshwar, Uttarakhand 263642', description: 'Government hospital providing general and emergency medical care.' },
        { name: 'City Care Hospital', rating: 4.5, address: 'Main Road, Bageshwar, Uttarakhand 263642', description: 'Private multi-specialty hospital with outpatient services.' },
        { name: 'Himalaya Diagnostics', rating: 4.5, address: 'Mall Road, Bageshwar, Uttarakhand 263642', description: 'Diagnostic centre offering lab testing and medical consultations.' },
        { name: 'Shiv Nursing Home', rating: 4.4, address: 'Town Center, Bageshwar, Uttarakhand 263642', description: 'Community healthcare center with minor surgical and OPD facilities.' }
    ],
    touristSpots: [
        { name: 'Baijnath Temple', rating: 4.9, address: 'Near Bageshwar, Uttarakhand', description: 'Ancient temple complex dedicated to Lord Shiva, known for historical carvings.' },
        { name: 'Bagnath Temple', rating: 4.8, address: 'Bageshwar Town, Uttarakhand', description: 'Famous Shiva temple located at the confluence of Saryu and Gomti rivers.' },
        { name: 'Pindari Glacier Trek', rating: 4.9, address: 'Bageshwar District, Uttarakhand', description: 'Popular trekking route offering stunning views of the Himalayas.' },
        { name: 'Kanda Hill', rating: 4.7, address: 'Kanda, Bageshwar District, Uttarakhand', description: 'Picturesque hill known for scenic beauty and peaceful environment.' }
    ]
},'chamoli': {
    schools: [
        { name: 'Government Inter College, Chamoli', rating: 4.7, address: 'Gopeshwar, Chamoli, Uttarakhand 246424', description: 'Leading government institution offering higher secondary education with experienced faculty.' },
        { name: 'Kendriya Vidyalaya, Gopeshwar', rating: 4.6, address: 'NH 7, Gopeshwar, Chamoli, Uttarakhand 246424', description: 'Central government school following CBSE curriculum with focus on academics and discipline.' },
        { name: 'Mount Carmel School, Chamoli', rating: 4.5, address: 'Joshimath Road, Chamoli, Uttarakhand 246443', description: 'English-medium school known for value-based education and co-curricular excellence.' },
        { name: 'Himalayan Public School', rating: 4.4, address: 'Nandprayag Road, Chamoli, Uttarakhand 246424', description: 'Private school emphasizing quality education and holistic development.' }
    ],
    restaurants: [
        { name: 'Gopeshwar Restaurant', rating: 4.6, address: 'Main Bazaar, Gopeshwar, Chamoli, Uttarakhand 246424', description: 'Famous for serving authentic North Indian and Garhwali cuisine.' },
        { name: 'Joshimath Café', rating: 4.5, address: 'Auli Road, Joshimath, Chamoli, Uttarakhand 246443', description: 'Cozy café with mountain views and a variety of snacks and beverages.' },
        { name: 'Hotel Badrinath Restaurant', rating: 4.5, address: 'Badrinath Road, Chamoli, Uttarakhand 246422', description: 'Multi-cuisine restaurant catering to tourists visiting the pilgrimage route.' },
        { name: 'The Hill Treat', rating: 4.4, address: 'Gopeshwar, Chamoli, Uttarakhand 246424', description: 'Casual dining spot with regional dishes and family-friendly atmosphere.' }
    ],
    hospitals: [
        { name: 'District Hospital Chamoli', rating: 4.7, address: 'Gopeshwar, Chamoli, Uttarakhand 246424', description: 'Main government hospital offering general, emergency, and maternity services.' },
        { name: 'Joshimath Community Health Centre', rating: 4.5, address: 'Joshimath, Chamoli, Uttarakhand 246443', description: 'CHC providing essential health services to Joshimath and nearby villages.' },
        { name: 'Badrinath Charitable Hospital', rating: 4.5, address: 'Near Badrinath Temple, Chamoli, Uttarakhand 246422', description: 'Charitable medical center serving pilgrims and locals.' },
        { name: 'Himalaya Diagnostic Centre', rating: 4.4, address: 'Main Road, Gopeshwar, Chamoli, Uttarakhand 246424', description: 'Private diagnostic facility offering lab testing and consultations.' }
    ],
    touristSpots: [
        { name: 'Badrinath Temple', rating: 5.0, address: 'Badrinath, Chamoli, Uttarakhand 246422', description: 'One of the Char Dham pilgrimage sites dedicated to Lord Vishnu.' },
        { name: 'Auli', rating: 4.9, address: 'Near Joshimath, Chamoli, Uttarakhand', description: 'Popular ski resort and scenic hill station with cable car rides and Himalayan views.' },
        { name: 'Valley of Flowers', rating: 5.0, address: 'Govindghat, Chamoli, Uttarakhand', description: 'UNESCO World Heritage Site known for its alpine meadows and rare flora.' },
        { name: 'Hemkund Sahib', rating: 4.9, address: 'Govindghat, Chamoli, Uttarakhand', description: 'Sacred Sikh shrine located at a high-altitude glacial lake.' }
    ]
}, 
'champawat': {
    schools: [
        { name: 'Government Inter College, Champawat', rating: 4.7, address: 'Champawat, Uttarakhand 262523', description: 'Leading government school offering science, commerce, and arts streams with good academic record.' },
        { name: 'Kendriya Vidyalaya, Lohaghat', rating: 4.6, address: 'Lohaghat, Champawat, Uttarakhand 262524', description: 'CBSE-affiliated school providing holistic education with modern facilities.' },
        { name: 'St. Xavier’s School', rating: 4.5, address: 'Near Pithoragarh Road, Champawat, Uttarakhand 262523', description: 'English-medium private school focusing on overall development and discipline.' },
        { name: 'Little Flower School', rating: 4.4, address: 'Lohaghat Road, Champawat, Uttarakhand 262524', description: 'Private institution known for good infrastructure and student engagement.' }
    ],
    restaurants: [
        { name: 'Himalayan View Restaurant', rating: 4.6, address: 'Champawat Market, Uttarakhand 262523', description: 'Restaurant with scenic views serving North Indian and Garhwali cuisine.' },
        { name: 'Lohaghat Café', rating: 4.5, address: 'Main Road, Lohaghat, Champawat, Uttarakhand 262524', description: 'Casual café offering snacks, tea, and local dishes.' },
        { name: 'Hotel Mount View Restaurant', rating: 4.5, address: 'Tanakpur Road, Champawat, Uttarakhand 262523', description: 'Family-friendly restaurant popular among travelers and locals.' },
        { name: 'Pahadi Kitchen', rating: 4.4, address: 'Near Bus Stand, Champawat, Uttarakhand 262523', description: 'Small eatery known for homely meals and authentic Uttarakhandi flavors.' }
    ],
    hospitals: [
        { name: 'District Hospital Champawat', rating: 4.7, address: 'Champawat, Uttarakhand 262523', description: 'Main government hospital providing medical and emergency care for locals.' },
        { name: 'Community Health Centre Lohaghat', rating: 4.5, address: 'Lohaghat, Champawat, Uttarakhand 262524', description: 'Government health center catering to rural and urban areas around Lohaghat.' },
        { name: 'Saraswati Nursing Home', rating: 4.5, address: 'Near Market Road, Champawat, Uttarakhand 262523', description: 'Private healthcare facility offering maternity and general services.' },
        { name: 'Chamoli Diagnostic Centre', rating: 4.4, address: 'Champawat Town, Uttarakhand 262523', description: 'Diagnostic center providing lab tests and consultation services.' }
    ],
    touristSpots: [
        { name: 'Baleshwar Temple', rating: 4.9, address: 'Champawat, Uttarakhand 262523', description: 'Ancient temple dedicated to Lord Shiva, known for its intricate stone carvings.' },
        { name: 'Lohaghat', rating: 4.8, address: 'Lohaghat, Champawat, Uttarakhand', description: 'Beautiful hill town on the banks of Lohawati River surrounded by pine forests.' },
        { name: 'Abbott Mount', rating: 4.9, address: 'Near Lohaghat, Champawat, Uttarakhand', description: 'Scenic hill station offering panoramic views of the Himalayas.' },
        { name: 'Meetha Reetha Sahib', rating: 4.8, address: 'Near Deyuri, Champawat, Uttarakhand', description: 'Famous Sikh pilgrimage site associated with Guru Nanak Dev Ji.' }
    ]
},
'dehradun': {
    schools: [
        { name: 'The Doon School', rating: 5.0, address: 'Mall Road, Dehradun, Uttarakhand 248001', description: 'One of India’s most prestigious all-boys boarding schools known for excellence in academics and leadership.' },
        { name: 'Welham Girls’ School', rating: 4.9, address: 'Dalanwala, Dehradun, Uttarakhand 248001', description: 'Renowned institution for girls offering holistic education with emphasis on discipline and creativity.' },
        { name: 'St. Joseph’s Academy', rating: 4.8, address: 'Rajpur Road, Dehradun, Uttarakhand 248001', description: 'Top English-medium school known for academic rigor and co-curricular achievements.' },
        { name: 'DAV Public School', rating: 4.7, address: 'Kaulagarh Road, Dehradun, Uttarakhand 248001', description: 'CBSE-affiliated school offering quality education and strong value-based programs.' }
    ],
    restaurants: [
        { name: 'Black Pepper Restaurant', rating: 4.7, address: 'Rajpur Road, Dehradun, Uttarakhand 248001', description: 'Iconic fine-dining restaurant serving North Indian and Chinese dishes in a cozy ambiance.' },
        { name: 'Orchard', rating: 4.8, address: 'Rajpur, Dehradun, Uttarakhand 248009', description: 'Beautiful open-air restaurant offering Tibetan and Asian cuisine with mountain views.' },
        { name: 'Kalsang Friends Corner', rating: 4.6, address: 'Rajpur Road, Dehradun, Uttarakhand 248001', description: 'Popular Tibetan-Chinese restaurant known for momos, noodles, and vibrant interiors.' },
        { name: 'Eddie’s Pizzeria', rating: 4.5, address: 'Dalanwala, Dehradun, Uttarakhand 248001', description: 'Trendy eatery offering wood-fired pizzas and continental dishes.' }
    ],
    hospitals: [
        { name: 'Max Super Speciality Hospital', rating: 4.8, address: 'Malsi, Dehradun, Uttarakhand 248001', description: 'Leading multi-specialty hospital offering advanced medical care and surgeries.' },
        { name: 'Government Doon Medical College Hospital', rating: 4.7, address: 'Dehradun, Uttarakhand 248001', description: 'Major government hospital providing affordable and comprehensive healthcare services.' },
        { name: 'Synergy Hospital', rating: 4.6, address: 'Ballupur, Dehradun, Uttarakhand 248001', description: 'Well-known private hospital with modern facilities and expert doctors.' },
        { name: 'CMI Hospital', rating: 4.5, address: 'Haridwar Road, Dehradun, Uttarakhand 248001', description: 'Private multi-specialty hospital known for quality treatment and diagnostics.' }
    ],
    touristSpots: [
        { name: 'Robber’s Cave (Gucchupani)', rating: 4.8, address: 'Anarwala Road, Dehradun, Uttarakhand 248003', description: 'Natural cave formation with a stream running through it, a popular picnic spot.' },
        { name: 'Sahastradhara', rating: 4.9, address: 'Raipur Road, Dehradun, Uttarakhand', description: 'Famous for its sulphur springs and scenic waterfalls, known for therapeutic properties.' },
        { name: 'Tapkeshwar Temple', rating: 4.8, address: 'Garhi Cantt, Dehradun, Uttarakhand 248003', description: 'Ancient temple dedicated to Lord Shiva located inside a natural cave.' },
        { name: 'Mindrolling Monastery', rating: 4.9, address: 'Clement Town, Dehradun, Uttarakhand 248002', description: 'One of the largest Buddhist monasteries in India, featuring a 220-foot Great Stupa.' }
    ]
},
'haridwar': {
    schools: [
        { name: 'DAV Public School', rating: 4.7, address: 'Ranipur, Haridwar, Uttarakhand 249407', description: 'Well-known CBSE school offering quality education with focus on moral and academic excellence.' },
        { name: 'Spring Dale School', rating: 4.6, address: 'Jwalapur, Haridwar, Uttarakhand 249407', description: 'English-medium school known for strong academics and extracurricular activities.' },
        { name: 'St. Mary’s Senior Secondary School', rating: 4.5, address: 'BHEL Township, Haridwar, Uttarakhand 249403', description: 'Catholic institution offering value-based education and holistic development.' },
        { name: 'Kendriya Vidyalaya BHEL', rating: 4.6, address: 'Sector 2, BHEL, Haridwar, Uttarakhand 249403', description: 'CBSE-affiliated central school with excellent facilities and experienced teachers.' }
    ],
    restaurants: [
        { name: 'Chotiwala Restaurant', rating: 4.7, address: 'Har Ki Pauri, Haridwar, Uttarakhand 249401', description: 'Iconic restaurant serving authentic vegetarian North Indian meals near the Ganga ghat.' },
        { name: 'Hoshiyar Puri', rating: 4.8, address: 'Upper Road, Haridwar, Uttarakhand 249401', description: 'Popular eatery famous for Punjabi-style thalis and sweets.' },
        { name: 'The Big Ben Restaurant', rating: 4.6, address: 'Near Haridwar Railway Station, Uttarakhand 249401', description: 'Family-friendly restaurant serving multi-cuisine dishes in a cozy setting.' },
        { name: 'Mohan Ji Puri Wale', rating: 4.5, address: 'Moti Bazaar, Haridwar, Uttarakhand 249401', description: 'Legendary local spot known for puri-sabzi and lassi.' }
    ],
    hospitals: [
        { name: 'Rama Krishna Mission Sevashram Hospital', rating: 4.7, address: 'Kankhal, Haridwar, Uttarakhand 249408', description: 'Charitable hospital offering quality medical care and spiritual healing.' },
        { name: 'Aarogyam Hospital', rating: 4.6, address: 'Jwalapur, Haridwar, Uttarakhand 249407', description: 'Private hospital providing specialized healthcare and diagnostics.' },
        { name: 'District Hospital Haridwar', rating: 4.5, address: 'Roshnabad, Haridwar, Uttarakhand 249403', description: 'Government hospital offering general and emergency medical services.' },
        { name: 'Metro Hospital & Heart Institute', rating: 4.6, address: 'Ranipur More, Haridwar, Uttarakhand 249407', description: 'Modern multi-specialty hospital known for advanced heart and surgical care.' }
    ],
    touristSpots: [
        { name: 'Har Ki Pauri', rating: 5.0, address: 'Upper Road, Haridwar, Uttarakhand 249401', description: 'Most sacred ghat on the Ganges where evening Ganga Aarti attracts thousands of devotees.' },
        { name: 'Chandi Devi Temple', rating: 4.8, address: 'Neel Parvat, Haridwar, Uttarakhand', description: 'Ancient temple located atop a hill, accessible by cable car or trek.' },
        { name: 'Mansa Devi Temple', rating: 4.9, address: 'Bilwa Parvat, Haridwar, Uttarakhand', description: 'Famous hilltop temple dedicated to Goddess Mansa Devi, offering panoramic city views.' },
        { name: 'Rajaji National Park', rating: 4.8, address: 'Motichur Range, Haridwar, Uttarakhand', description: 'Wildlife sanctuary known for elephants, leopards, and nature safaris.' }
    ]
},'nainital': {
    schools: [
        { name: 'Sherwood College', rating: 4.9, address: 'Mallital, Nainital, Uttarakhand 263001', description: 'Prestigious residential school known for academics, sports, and holistic education.' },
        { name: 'St. Joseph’s College', rating: 4.8, address: 'Mall Road, Nainital, Uttarakhand 263001', description: 'Top English-medium school focusing on academics, discipline, and extracurricular excellence.' },
        { name: 'Army Public School, Nainital', rating: 4.7, address: 'Mori Gate, Nainital, Uttarakhand 263002', description: 'CBSE-affiliated school for children of defense personnel and civilians, offering quality education.' },
        { name: 'Birla Vidya Mandir', rating: 4.6, address: 'Mallital, Nainital, Uttarakhand 263001', description: 'Well-established private school with strong academics and co-curricular programs.' }
    ],
    restaurants: [
        { name: 'Sakley’s Restaurant & Pastry Shop', rating: 4.8, address: 'Mall Road, Nainital, Uttarakhand 263001', description: 'Famous for desserts, continental dishes, and lake views.' },
        { name: 'Chandni Chowk Restaurant', rating: 4.6, address: 'Thandi Sadak, Nainital, Uttarakhand 263001', description: 'Casual dining spot offering North Indian and Chinese cuisine.' },
        { name: 'Machan Restaurant', rating: 4.5, address: 'Tallital, Nainital, Uttarakhand 263002', description: 'Known for Kumaoni and Indian dishes with panoramic lake views.' },
        { name: 'Kashmir Cafe', rating: 4.5, address: 'Mall Road, Nainital, Uttarakhand 263001', description: 'Cozy café specializing in fast food, coffee, and snacks.' }
    ],
    hospitals: [
        { name: 'AIIMS Nainital', rating: 4.7, address: 'Mallital, Nainital, Uttarakhand 263001', description: 'Government hospital offering general and emergency healthcare services.' },
        { name: 'R.N.T. Hospital', rating: 4.6, address: 'Circular Road, Nainital, Uttarakhand 263001', description: 'Main district hospital providing multi-specialty services and diagnostics.' },
        { name: 'Lala Lajpat Rai Hospital', rating: 4.5, address: 'Tallital, Nainital, Uttarakhand 263002', description: 'Private hospital providing outpatient and minor surgical care.' },
        { name: 'Cottage Hospital', rating: 4.4, address: 'Mall Road, Nainital, Uttarakhand 263001', description: 'Community healthcare facility offering basic medical services.' }
    ],
    touristSpots: [
        { name: 'Naini Lake', rating: 5.0, address: 'Nainital, Uttarakhand', description: 'Famous natural freshwater lake offering boating and scenic views.' },
        { name: 'Naina Devi Temple', rating: 4.8, address: 'Nainital, Uttarakhand', description: 'Popular temple on the northern shore of Naini Lake attracting devotees.' },
        { name: 'Snow View Point', rating: 4.9, address: 'Mallital, Nainital, Uttarakhand', description: 'Himalayan viewpoint accessible by cable car, offering stunning mountain vistas.' },
        { name: 'Tiffin Top (Dorothy’s Seat)', rating: 4.8, address: 'Nainital, Uttarakhand', description: 'Hilltop offering panoramic views of Nainital and surrounding hills, ideal for trekking.' }
    ]
},'pauri_garhwal': {
    schools: [
        { name: 'Government Inter College, Pauri', rating: 4.7, address: 'Pauri, Uttarakhand 246001', description: 'Reputed government school offering quality education in science, commerce, and arts streams.' },
        { name: 'St. Thomas School', rating: 4.6, address: 'Lansdowne Road, Pauri Garhwal, Uttarakhand 246001', description: 'English-medium school known for strong academics and extracurricular excellence.' },
        { name: 'Kendriya Vidyalaya Pauri', rating: 4.6, address: 'Near Collectorate, Pauri, Uttarakhand 246001', description: 'Central government CBSE school with excellent faculty and infrastructure.' },
        { name: 'Mount Carmel School', rating: 4.5, address: 'Srinagar Road, Pauri Garhwal, Uttarakhand 246001', description: 'Private co-educational school focusing on academics and discipline.' }
    ],
    restaurants: [
        { name: 'Garhwali Kitchen', rating: 4.7, address: 'Pauri Bazaar, Pauri Garhwal, Uttarakhand 246001', description: 'Local restaurant serving authentic Garhwali cuisine and North Indian dishes.' },
        { name: 'The Hill View Café', rating: 4.6, address: 'Srinagar Road, Pauri Garhwal, Uttarakhand 246001', description: 'Cozy café offering coffee, snacks, and Himalayan views.' },
        { name: 'Pahadi Rasoi', rating: 4.5, address: 'Main Market, Pauri, Uttarakhand 246001', description: 'Famous for traditional Uttarakhandi thalis and homemade flavors.' },
        { name: 'Srinagar Dine & View', rating: 4.5, address: 'Srinagar, Pauri Garhwal, Uttarakhand 246174', description: 'Family restaurant with multi-cuisine menu and river views.' }
    ],
    hospitals: [
        { name: 'District Hospital Pauri Garhwal', rating: 4.7, address: 'Pauri, Uttarakhand 246001', description: 'Main government hospital providing healthcare and emergency services.' },
        { name: 'Base Hospital Kotdwar', rating: 4.6, address: 'Kotdwar, Pauri Garhwal, Uttarakhand 246149', description: 'Multi-specialty hospital serving patients from surrounding regions.' },
        { name: 'Government Hospital Srinagar', rating: 4.5, address: 'Srinagar, Pauri Garhwal, Uttarakhand 246174', description: 'Government medical facility with OPD, maternity, and emergency care.' },
        { name: 'Himalaya Nursing Home', rating: 4.4, address: 'Near Bus Stand, Pauri, Uttarakhand 246001', description: 'Private healthcare center providing general and diagnostic services.' }
    ],
    touristSpots: [
        { name: 'Kandoliya Temple', rating: 4.9, address: 'Pauri, Uttarakhand 246001', description: 'Popular temple dedicated to Lord Shiva with panoramic views of Pauri town and Himalayas.' },
        { name: 'Khirsu', rating: 4.8, address: 'Near Pauri, Uttarakhand 246001', description: 'Scenic village surrounded by oak and deodar forests, ideal for nature walks.' },
        { name: 'Srinagar (Garhwal)', rating: 4.8, address: 'Srinagar, Pauri Garhwal, Uttarakhand 246174', description: 'Historic town on the banks of the Alaknanda River known for temples and Garhwal University.' },
        { name: 'Tarkeshwar Mahadev Temple', rating: 4.9, address: 'Near Lansdowne, Pauri Garhwal, Uttarakhand', description: 'Ancient temple dedicated to Lord Shiva located amidst dense forests.' }
    ]
},'pithoragarh': {
    schools: [
        { name: 'Government Inter College, Pithoragarh', rating: 4.7, address: 'Pithoragarh, Uttarakhand 262501', description: 'Prominent government school offering quality education in science, arts, and commerce streams.' },
        { name: 'Kendriya Vidyalaya Pithoragarh', rating: 4.6, address: 'Dhar Road, Pithoragarh, Uttarakhand 262501', description: 'Central government CBSE school known for excellent academics and discipline.' },
        { name: 'St. Paul’s School', rating: 4.5, address: 'Lohaghat Road, Pithoragarh, Uttarakhand 262501', description: 'English-medium private school emphasizing all-round student development.' },
        { name: 'Army Public School', rating: 4.6, address: 'Mall Road, Pithoragarh, Uttarakhand 262501', description: 'CBSE-affiliated school providing modern education with focus on discipline and character building.' }
    ],
    restaurants: [
        { name: 'Meadows Restaurant', rating: 4.7, address: 'Mall Road, Pithoragarh, Uttarakhand 262501', description: 'Popular family restaurant serving North Indian and Kumaoni dishes.' },
        { name: 'Pithoragarh Café', rating: 4.6, address: 'Main Market, Pithoragarh, Uttarakhand 262501', description: 'Cozy café offering snacks, beverages, and a relaxed ambiance.' },
        { name: 'Hotel Milan Restaurant', rating: 4.5, address: 'Dhar Road, Pithoragarh, Uttarakhand 262501', description: 'Multi-cuisine restaurant serving Indian, Chinese, and Continental food.' },
        { name: 'Annapurna Bhojanalaya', rating: 4.5, address: 'Bus Stand, Pithoragarh, Uttarakhand 262501', description: 'Local eatery famous for home-style vegetarian meals and thalis.' }
    ],
    hospitals: [
        { name: 'District Hospital Pithoragarh', rating: 4.7, address: 'Dhar Road, Pithoragarh, Uttarakhand 262501', description: 'Government hospital providing general, maternity, and emergency healthcare.' },
        { name: 'Saraswati Nursing Home', rating: 4.5, address: 'Mall Road, Pithoragarh, Uttarakhand 262501', description: 'Private healthcare facility offering multi-specialty medical services.' },
        { name: 'Command Hospital (Army)', rating: 4.6, address: 'Army Area, Pithoragarh, Uttarakhand 262501', description: 'Army-run hospital serving defense personnel and civilians.' },
        { name: 'Himalaya Diagnostic Centre', rating: 4.4, address: 'Main Bazaar, Pithoragarh, Uttarakhand 262501', description: 'Diagnostic and testing center offering various medical tests and consultations.' }
    ],
    touristSpots: [
        { name: 'Askot Wildlife Sanctuary', rating: 4.9, address: 'Askot, Pithoragarh, Uttarakhand', description: 'Protected area known for Himalayan black bears, musk deer, and scenic beauty.' },
        { name: 'Pithoragarh Fort', rating: 4.8, address: 'Pithoragarh Town, Uttarakhand 262501', description: 'Historic fort built during the Chand dynasty offering panoramic town views.' },
        { name: 'Kapileshwar Mahadev Temple', rating: 4.8, address: 'Pithoragarh, Uttarakhand 262501', description: 'Ancient cave temple dedicated to Lord Shiva with stunning valley views.' },
        { name: 'Munsiyari', rating: 5.0, address: 'Munsiyari, Pithoragarh District, Uttarakhand', description: 'Hill station famous for Panchachuli peaks, trekking, and Himalayan vistas.' }
    ]
},'rudraprayag': {
    schools: [
        { name: 'Government Inter College, Rudraprayag', rating: 4.6, address: 'Rudraprayag, Uttarakhand 246475', description: 'Reputed government school offering quality education in science, arts, and commerce.' },
        { name: 'Kendriya Vidyalaya Rudraprayag', rating: 4.5, address: 'NH-7, Rudraprayag, Uttarakhand 246475', description: 'CBSE-affiliated school known for its disciplined environment and academic excellence.' },
        { name: 'St. Mary’s Convent School', rating: 4.6, address: 'Main Market, Rudraprayag, Uttarakhand 246475', description: 'English-medium private school providing modern education with moral values.' },
        { name: 'Saraswati Vidya Mandir', rating: 4.4, address: 'Tilwara, Rudraprayag, Uttarakhand 246475', description: 'School emphasizing traditional learning along with modern academic curriculum.' }
    ],
    restaurants: [
        { name: 'Hotel Mandakini Restaurant', rating: 4.7, address: 'Badrinath Road, Rudraprayag, Uttarakhand 246475', description: 'Popular restaurant serving North Indian and Garhwali cuisine with scenic river views.' },
        { name: 'Himalayan View Café', rating: 4.6, address: 'NH-7, Rudraprayag, Uttarakhand 246475', description: 'Cozy café offering snacks, coffee, and beautiful mountain views.' },
        { name: 'Annapurna Bhojanalaya', rating: 4.5, address: 'Bus Stand, Rudraprayag, Uttarakhand 246475', description: 'Local vegetarian restaurant serving traditional thalis and homely meals.' },
        { name: 'Ganga View Restaurant', rating: 4.5, address: 'Near Sangam Point, Rudraprayag, Uttarakhand 246475', description: 'Restaurant with peaceful river view, offering regional and Indian dishes.' }
    ],
    hospitals: [
        { name: 'District Hospital Rudraprayag', rating: 4.6, address: 'NH-7, Rudraprayag, Uttarakhand 246475', description: 'Government hospital providing general and emergency healthcare facilities.' },
        { name: 'Sanjeevani Hospital', rating: 4.4, address: 'Main Market, Rudraprayag, Uttarakhand 246475', description: 'Private healthcare center with experienced doctors and modern facilities.' },
        { name: 'Tilwara Community Health Centre', rating: 4.3, address: 'Tilwara, Rudraprayag, Uttarakhand 246475', description: 'Local healthcare center offering basic treatment and maternity services.' },
        { name: 'Rudra Diagnostic Centre', rating: 4.5, address: 'Badrinath Road, Rudraprayag, Uttarakhand 246475', description: 'Diagnostic and pathology center providing modern medical testing services.' }
    ],
    touristSpots: [
        { name: 'Rudraprayag Sangam', rating: 5.0, address: 'Confluence of Alaknanda and Mandakini Rivers, Rudraprayag', description: 'Sacred confluence point revered by pilgrims visiting Kedarnath and Badrinath.' },
        { name: 'Koteshwar Mahadev Temple', rating: 4.9, address: 'Koteshwar, Rudraprayag, Uttarakhand 246475', description: 'Ancient cave temple dedicated to Lord Shiva located on the bank of Alaknanda River.' },
        { name: 'Agastyamuni', rating: 4.8, address: 'Agastyamuni, Rudraprayag District, Uttarakhand', description: 'Pilgrim village with scenic views and the famous Agastya Muni Temple.' },
        { name: 'Chopta', rating: 5.0, address: 'Chopta, Rudraprayag District, Uttarakhand', description: 'Known as Mini Switzerland of India, a base for Tungnath and Chandrashila treks.' }
    ]
},'tehriGarhwal': {
    schools: [
        { name: 'Government Inter College, New Tehri', rating: 4.7, address: 'New Tehri, Tehri Garhwal, Uttarakhand 249001', description: 'Renowned government school offering quality education with experienced faculty.' },
        { name: 'Kendriya Vidyalaya New Tehri', rating: 4.6, address: 'Chamba Road, New Tehri, Uttarakhand 249001', description: 'Central school following CBSE curriculum, known for holistic learning.' },
        { name: 'St. Thomas School', rating: 4.5, address: 'Baurari, New Tehri, Uttarakhand 249001', description: 'English-medium school providing quality education with emphasis on discipline.' },
        { name: 'DAV Public School', rating: 4.5, address: 'New Tehri, Tehri Garhwal, Uttarakhand 249001', description: 'Private CBSE-affiliated institution focusing on academics and co-curricular development.' }
    ],
    restaurants: [
        { name: 'Tehri Lake View Restaurant', rating: 4.7, address: 'Tehri Lake Road, New Tehri, Uttarakhand 249001', description: 'Popular lakeside restaurant offering North Indian and Garhwali cuisines.' },
        { name: 'Annapurna Bhojanalaya', rating: 4.6, address: 'New Tehri Bus Stand, Uttarakhand 249001', description: 'Vegetarian restaurant serving thalis and local delicacies.' },
        { name: 'The Hilltop Café', rating: 4.5, address: 'Chamba Road, New Tehri, Uttarakhand 249001', description: 'Cozy café with great views, serving snacks, coffee, and desserts.' },
        { name: 'Pahadi Zaika', rating: 4.4, address: 'Main Market, New Tehri, Uttarakhand 249001', description: 'Authentic Garhwali food restaurant known for traditional taste.' }
    ],
    hospitals: [
        { name: 'District Hospital New Tehri', rating: 4.6, address: 'Baurari, New Tehri, Uttarakhand 249001', description: 'Main government hospital providing emergency and general medical services.' },
        { name: 'City Nursing Home', rating: 4.5, address: 'Main Market, New Tehri, Uttarakhand 249001', description: 'Private healthcare facility offering multi-specialty services.' },
        { name: 'Sanjeevani Hospital', rating: 4.4, address: 'Chamba Road, New Tehri, Uttarakhand 249001', description: 'Modern private hospital with diagnostic and surgical services.' },
        { name: 'Tehri Diagnostic Centre', rating: 4.3, address: 'Near Bus Stand, New Tehri, Uttarakhand 249001', description: 'Diagnostic center offering pathology and radiology services.' }
    ],
    touristSpots: [
        { name: 'Tehri Dam', rating: 5.0, address: 'Tehri Garhwal, Uttarakhand', description: 'One of the tallest dams in the world, popular for water sports and sightseeing.' },
        { name: 'Tehri Lake', rating: 5.0, address: 'New Tehri, Uttarakhand', description: 'Man-made lake offering boating, jet skiing, and camping opportunities.' },
        { name: 'Chamba', rating: 4.8, address: 'Chamba, Tehri Garhwal, Uttarakhand', description: 'Beautiful hill town known for its panoramic views and apple orchards.' },
        { name: 'Surkanda Devi Temple', rating: 4.9, address: 'Near Dhanaulti, Tehri Garhwal, Uttarakhand', description: 'Sacred temple dedicated to Goddess Parvati, offering scenic trekking route and views.' }
    ]
},
'udhamSinghNagar': {
    schools: [
        { name: 'St. Paul’s Senior Secondary School', rating: 4.7, address: 'Rudrapur, Udham Singh Nagar, Uttarakhand 263153', description: 'Renowned CBSE-affiliated school focusing on academics and character building.' },
        { name: 'Kendriya Vidyalaya Rudrapur', rating: 4.6, address: 'Sector 5, SIDCUL, Rudrapur, Uttarakhand 263153', description: 'Central government school offering quality education in a disciplined environment.' },
        { name: 'Delhi Public School, Rudrapur', rating: 4.7, address: 'Kichha Road, Rudrapur, Udham Singh Nagar, Uttarakhand 263153', description: 'Modern CBSE school with emphasis on holistic learning and extracurricular activities.' },
        { name: 'Army Public School', rating: 4.5, address: 'Rudrapur Cantt, Udham Singh Nagar, Uttarakhand 263153', description: 'Reputed school managed by the Army Welfare Education Society.' }
    ],
    restaurants: [
        { name: 'Kathi Junction', rating: 4.6, address: 'Awas Vikas, Rudrapur, Uttarakhand 263153', description: 'Popular fast-food outlet serving rolls, biryani, and North Indian dishes.' },
        { name: 'Pind Balluchi', rating: 4.7, address: 'Rampur Road, Rudrapur, Uttarakhand 263153', description: 'Punjabi-themed restaurant serving authentic North Indian cuisine.' },
        { name: 'Bikanervala', rating: 4.6, address: 'Nainital Road, Rudrapur, Uttarakhand 263153', description: 'Famous vegetarian restaurant and sweet shop offering a wide menu.' },
        { name: 'The Hideout Café', rating: 4.5, address: 'Sidcul Road, Rudrapur, Uttarakhand 263153', description: 'Trendy café with continental dishes, desserts, and live music.' }
    ],
    hospitals: [
        { name: 'Metro Hospital & Heart Institute', rating: 4.8, address: 'Nainital Road, Rudrapur, Uttarakhand 263153', description: 'Multi-specialty hospital offering advanced healthcare and diagnostics.' },
        { name: 'Krishna Hospital', rating: 4.5, address: 'Rampur Road, Rudrapur, Uttarakhand 263153', description: 'Private hospital known for efficient emergency and maternity care.' },
        { name: 'City Hospital Rudrapur', rating: 4.4, address: 'Near Bus Stand, Rudrapur, Uttarakhand 263153', description: 'Well-equipped hospital providing general and specialized medical services.' },
        { name: 'Dr. Lal PathLabs', rating: 4.6, address: 'Awas Vikas, Rudrapur, Uttarakhand 263153', description: 'Trusted diagnostic center offering pathology and health testing services.' }
    ],
    touristSpots: [
        { name: 'Nanakmatta Sahib Gurudwara', rating: 5.0, address: 'Nanakmatta, Udham Singh Nagar, Uttarakhand', description: 'Historic Sikh pilgrimage site visited by Guru Nanak Dev Ji.' },
        { name: 'Atariya Temple', rating: 4.8, address: 'Rudrapur, Uttarakhand 263153', description: 'Famous temple dedicated to Goddess Atariya, attracting many devotees.' },
        { name: 'Govind Ballabh Pant Sagar', rating: 4.7, address: 'Near Kichha, Udham Singh Nagar, Uttarakhand', description: 'Scenic lake area ideal for boating and relaxation.' },
        { name: 'Kashipur City', rating: 4.6, address: 'Kashipur, Udham Singh Nagar, Uttarakhand', description: 'Historic town featuring temples, forts, and a blend of culture and heritage.' }
    ]
},
'uttarkashi': {
    schools: [
        { name: 'Government Inter College, Uttarkashi', rating: 4.7, address: 'Uttarkashi, Uttarakhand 249193', description: 'Prestigious government school offering science, commerce, and arts streams.' },
        { name: 'Kendriya Vidyalaya Uttarkashi', rating: 4.6, address: 'Tiloth, Uttarkashi, Uttarakhand 249193', description: 'CBSE-affiliated school run by the central government, known for quality education.' },
        { name: 'Mount Valley Public School', rating: 4.5, address: 'Gangotri Road, Uttarkashi, Uttarakhand 249193', description: 'English-medium private school providing modern education and extracurricular activities.' },
        { name: 'Saraswati Vidya Mandir', rating: 4.4, address: 'Gyansu, Uttarkashi, Uttarakhand 249193', description: 'School promoting value-based education with strong academic results.' }
    ],
    restaurants: [
        { name: 'Hotel Shivling Restaurant', rating: 4.8, address: 'Gangotri Road, Uttarkashi, Uttarakhand 249193', description: 'Riverside restaurant offering North Indian and Garhwali cuisine with great views.' },
        { name: 'Annapurna Bhojanalaya', rating: 4.6, address: 'Main Market, Uttarkashi, Uttarakhand 249193', description: 'Simple vegetarian restaurant serving delicious local food and thalis.' },
        { name: 'Himalayan Treat Café', rating: 4.5, address: 'Gangotri Highway, Uttarkashi, Uttarakhand 249193', description: 'Cozy café offering snacks, beverages, and bakery items.' },
        { name: 'Hotel Mandakini View Restaurant', rating: 4.4, address: 'Near Bus Stand, Uttarkashi, Uttarakhand 249193', description: 'Family-friendly restaurant with Indian and Chinese cuisines.' }
    ],
    hospitals: [
        { name: 'District Hospital Uttarkashi', rating: 4.6, address: 'Tiloth, Uttarkashi, Uttarakhand 249193', description: 'Main government hospital providing general and emergency healthcare services.' },
        { name: 'Char Dham Hospital', rating: 4.5, address: 'Gangotri Road, Uttarkashi, Uttarakhand 249193', description: 'Private multi-specialty hospital serving local residents and pilgrims.' },
        { name: 'Himalayan Health Care Centre', rating: 4.4, address: 'Gyansu, Uttarkashi, Uttarakhand 249193', description: 'Modern health center offering basic treatment and diagnostics.' },
        { name: 'Dr. Chauhan Clinic & Path Lab', rating: 4.3, address: 'Main Market, Uttarkashi, Uttarakhand 249193', description: 'Private clinic providing diagnostic and consultation services.' }
    ],
    touristSpots: [
        { name: 'Gangotri Temple', rating: 5.0, address: 'Gangotri, Uttarkashi District, Uttarakhand', description: 'One of the four sacred Char Dham pilgrimage sites dedicated to Goddess Ganga.' },
        { name: 'Dayara Bugyal', rating: 5.0, address: 'Raithal Village, Uttarkashi District, Uttarakhand', description: 'Beautiful alpine meadow offering trekking and panoramic Himalayan views.' },
        { name: 'Nachiketa Tal', rating: 4.9, address: 'Chaurangi Khal, Uttarkashi District, Uttarakhand', description: 'Serene lake surrounded by dense forests and peaceful environment.' },
        { name: 'Dodital Lake', rating: 4.9, address: 'Assi Ganga Valley, Uttarkashi District, Uttarakhand', description: 'Famous high-altitude lake and trekking destination dedicated to Lord Ganesha.' }
    ]
},











'agartala': {
    schools: [
        { name: 'Holy Cross School', rating: 4.8, address: 'Durjoynagar, Agartala, Tripura 799009', description: 'One of the best ICSE schools in Agartala known for academic excellence and discipline.' },
        { name: 'Sri Krishna Mission School', rating: 4.7, address: 'Gorkhabasti, Agartala, Tripura 799006', description: 'CBSE-affiliated school offering holistic education with spiritual values.' },
        { name: 'Don Bosco School', rating: 4.6, address: 'Arundhutinagar, Agartala, Tripura 799003', description: 'Reputed private school offering modern education and co-curricular activities.' },
        { name: 'Kendriya Vidyalaya No.1', rating: 4.5, address: 'ONGC Colony, Agartala, Tripura 799006', description: 'Central government school known for excellent academic and co-curricular results.' }
    ],
    restaurants: [
        { name: 'Restaurant Kurry Klub', rating: 4.8, address: 'Krishnanagar, Agartala, Tripura 799001', description: 'Popular multi-cuisine restaurant serving Indian, Chinese, and Continental dishes.' },
        { name: 'Ginger Hotel Restaurant', rating: 4.7, address: 'Khejur Bagan, Agartala, Tripura 799006', description: 'Modern dining space offering Indian and international cuisine in a relaxed setting.' },
        { name: 'Rajdhani Restaurant', rating: 4.6, address: 'Hari Ganga Basak Road, Agartala, Tripura 799001', description: 'Famous for its vegetarian thalis and North Indian food.' },
        { name: 'The Green Lounge', rating: 4.5, address: 'Palace Compound, Agartala, Tripura 799001', description: 'Stylish café serving coffee, snacks, and desserts in a cozy environment.' }
    ],
    hospitals: [
        { name: 'Indira Gandhi Memorial Hospital (IGM)', rating: 4.7, address: 'Gorkhabasti, Agartala, Tripura 799006', description: 'Major government hospital providing wide-ranging healthcare and emergency services.' },
        { name: 'ILS Hospital Agartala', rating: 4.6, address: 'Dukli, Agartala, Tripura 799003', description: 'Multi-specialty private hospital with modern medical facilities and experienced doctors.' },
        { name: 'Tripura Medical College & Dr. BRAM Teaching Hospital', rating: 4.5, address: 'Hapania, Agartala, Tripura 799014', description: 'Renowned teaching hospital providing quality treatment and medical education.' },
        { name: 'Agartala City Hospital', rating: 4.4, address: 'Melarmath, Agartala, Tripura 799001', description: 'Private hospital offering general and specialist medical services.' }
    ],
    touristSpots: [
        { name: 'Ujjayanta Palace', rating: 5.0, address: 'Palace Compound, Agartala, Tripura 799001', description: 'Former royal palace and now a museum showcasing Tripura’s royal heritage.' },
        { name: 'Neermahal', rating: 5.0, address: 'Rudrasagar Lake, Melaghar, Tripura', description: 'The only water palace in Eastern India, blending Hindu and Mughal architecture.' },
        { name: 'Heritage Park', rating: 4.9, address: 'Agartala Bypass Road, Agartala, Tripura 799010', description: 'Beautiful park depicting Tripura’s culture and architecture in miniature form.' },
        { name: 'Jagannath Temple', rating: 4.8, address: 'Palace Compound, Agartala, Tripura 799001', description: 'Historic temple known for its colorful architecture and spiritual atmosphere.' }
    ]
},
'udaipur_tripura': {
    schools: [
        { name: 'Netaji Subhash Vidyaniketan', rating: 4.7, address: 'Udaipur, Gomati, Tripura 799013', description: 'Renowned school offering quality education with focus on academics and discipline.' },
        { name: 'Jawahar Navodaya Vidyalaya, Udaipur', rating: 4.6, address: 'Rani, Udaipur, Gomati, Tripura 799114', description: 'CBSE-affiliated residential school run by the central government, known for excellence.' },
        { name: 'Kendriya Vidyalaya, Udaipur', rating: 4.6, address: 'Chandrapur, Udaipur, Gomati, Tripura 799013', description: 'Central government school providing modern education and co-curricular activities.' },
        { name: 'Saraswati Vidya Mandir', rating: 4.4, address: 'Rani, Udaipur, Gomati, Tripura 799114', description: 'Value-based school focusing on moral and cultural education.' }
    ],
    restaurants: [
        { name: 'Hotel Ujjayanta Restaurant', rating: 4.7, address: 'Main Road, Udaipur, Tripura 799013', description: 'Popular restaurant serving Indian and Bengali dishes in a family-friendly setting.' },
        { name: 'Sagarika Restaurant', rating: 4.6, address: 'Near Tripureswari Temple, Udaipur, Tripura 799013', description: 'Known for local Tripuri delicacies and homely meals for tourists and pilgrims.' },
        { name: 'Himalaya Food Corner', rating: 4.5, address: 'Rani Bazaar, Udaipur, Tripura 799013', description: 'Casual spot serving snacks, tea, and North Indian food.' },
        { name: 'Royal Garden Restaurant', rating: 4.4, address: 'Station Road, Udaipur, Tripura 799013', description: 'Multi-cuisine restaurant with good ambience and service.' }
    ],
    hospitals: [
        { name: 'Udaipur District Hospital', rating: 4.7, address: 'Rani, Udaipur, Gomati, Tripura 799114', description: 'Main government hospital offering general and emergency healthcare facilities.' },
        { name: 'Gomati District Hospital', rating: 4.6, address: 'Gandhigram, Udaipur, Tripura 799013', description: 'Well-equipped hospital providing multi-specialty treatment and diagnostics.' },
        { name: 'Tripura Sundari Hospital', rating: 4.5, address: 'Near Tripureswari Temple, Udaipur, Tripura 799013', description: 'Private hospital providing essential healthcare services and consultations.' },
        { name: 'Dr. Dey’s Clinic', rating: 4.3, address: 'Main Market, Udaipur, Tripura 799013', description: 'Private clinic offering general and specialist care.' }
    ],
    touristSpots: [
        { name: 'Tripura Sundari Temple', rating: 5.0, address: 'Udaipur, Gomati District, Tripura 799013', description: 'One of the 51 Shakti Peethas, a major Hindu pilgrimage site dedicated to Goddess Tripura Sundari.' },
        { name: 'Bhubaneshwari Temple', rating: 4.9, address: 'Udaipur, Gomati District, Tripura', description: 'Historic temple built by Maharaja Govinda Manikya, known for its architecture and river view.' },
        { name: 'Gomati River Front Park', rating: 4.8, address: 'Udaipur, Tripura 799013', description: 'Beautiful riverfront park ideal for evening walks and relaxation.' },
        { name: 'Kalyan Sagar Lake', rating: 4.8, address: 'Near Tripura Sundari Temple, Udaipur, Tripura 799013', description: 'Scenic lake popular for boating and home to sacred tortoises.' }
    ]
},
'dharmanagar': {
    schools: [
        { name: 'Holy Cross School Dharmanagar', rating: 4.8, address: 'Radhanagar, Dharmanagar, North Tripura 799250', description: 'Premier ICSE school known for high academic standards and discipline.' },
        { name: 'Jawahar Navodaya Vidyalaya Dharmanagar', rating: 4.7, address: 'Kameswar, Dharmanagar, North Tripura 799250', description: 'Central government residential school with excellent facilities and faculty.' },
        { name: 'Netaji Subhas Vidyaniketan', rating: 4.6, address: 'College Road, Dharmanagar, Tripura 799253', description: 'Well-known school emphasizing both academics and extracurricular activities.' },
        { name: 'Kendriya Vidyalaya Dharmanagar', rating: 4.5, address: 'Panisagar Road, Dharmanagar, Tripura 799253', description: 'CBSE-affiliated school offering quality education and holistic development.' }
    ],
    restaurants: [
        { name: 'Hotel Panchabati Restaurant', rating: 4.7, address: 'Station Road, Dharmanagar, Tripura 799250', description: 'Popular restaurant serving Bengali and North Indian cuisines in a cozy environment.' },
        { name: 'The Green Chilly Restaurant', rating: 4.6, address: 'Main Road, Dharmanagar, Tripura 799253', description: 'Casual multi-cuisine eatery popular among locals and travelers.' },
        { name: 'Annapurna Bhojanalaya', rating: 4.5, address: 'Central Market, Dharmanagar, Tripura 799250', description: 'Pure vegetarian restaurant serving homely and affordable meals.' },
        { name: 'Cafe Aroma', rating: 4.4, address: 'Hospital Road, Dharmanagar, Tripura 799253', description: 'Modern café offering snacks, beverages, and bakery items in a relaxed atmosphere.' }
    ],
    hospitals: [
        { name: 'Dharmanagar District Hospital', rating: 4.7, address: 'College Road, Dharmanagar, North Tripura 799253', description: 'Main government hospital providing general and emergency healthcare services.' },
        { name: 'North District Hospital', rating: 4.6, address: 'Hospital Road, Dharmanagar, Tripura 799253', description: 'Fully equipped district hospital offering a wide range of treatments.' },
        { name: 'Life Line Hospital', rating: 4.5, address: 'Radhanagar, Dharmanagar, Tripura 799250', description: 'Private hospital offering general and specialized healthcare facilities.' },
        { name: 'Dr. Saha’s Clinic & Diagnostics', rating: 4.3, address: 'Main Market, Dharmanagar, Tripura 799253', description: 'Private diagnostic and consultation center providing quality services.' }
    ],
    touristSpots: [
        { name: 'Kameswar Temple', rating: 5.0, address: 'Kameswar, Dharmanagar, Tripura 799250', description: 'Ancient temple dedicated to Lord Shiva, known for its historic and spiritual importance.' },
        { name: 'Kalibari Temple', rating: 4.9, address: 'Main Town, Dharmanagar, Tripura 799253', description: 'Popular temple of Goddess Kali attracting devotees from across Tripura.' },
        { name: 'Raima Valley View Point', rating: 4.8, address: 'Near Dharmanagar, Tripura', description: 'Beautiful hilltop viewpoint offering scenic vistas of the Raima River valley.' },
        { name: 'Darchai Waterfall', rating: 4.8, address: 'Jampui Hills, near Dharmanagar, Tripura', description: 'Mesmerizing natural waterfall ideal for trekking and photography.' }
    ]
},
'kailashahar': {
    schools: [
        { name: 'Netaji Vidyapith Higher Secondary School', rating: 4.7, address: 'Kailashahar, Unakoti, Tripura 799277', description: 'One of the oldest and most reputed government schools in the Unakoti district.' },
        { name: 'Jawahar Navodaya Vidyalaya Kailashahar', rating: 4.6, address: 'Darchai, Kailashahar, Tripura 799277', description: 'Central government residential school focusing on holistic student development.' },
        { name: 'Kendriya Vidyalaya Kailashahar', rating: 4.5, address: 'Bagbasa Road, Kailashahar, Tripura 799277', description: 'CBSE-affiliated school with good academic record and co-curricular programs.' },
        { name: 'Holy Cross School Kailashahar', rating: 4.4, address: 'Near LIC Office, Kailashahar, Tripura 799277', description: 'English-medium private school offering modern education in a disciplined environment.' }
    ],
    restaurants: [
        { name: 'Hotel Unakoti Restaurant', rating: 4.7, address: 'Main Road, Kailashahar, Tripura 799277', description: 'Popular multi-cuisine restaurant serving Indian and Chinese food.' },
        { name: 'Annapurna Restaurant', rating: 4.6, address: 'Central Market, Kailashahar, Tripura 799277', description: 'Vegetarian restaurant known for delicious thalis and local Tripuri dishes.' },
        { name: 'Saha Food Corner', rating: 4.5, address: 'Station Road, Kailashahar, Tripura 799277', description: 'Casual spot for tea, snacks, and fast food, popular among students.' },
        { name: 'The Blue Leaf Café', rating: 4.4, address: 'Airport Road, Kailashahar, Tripura 799277', description: 'Modern café serving coffee, bakery items, and light meals.' }
    ],
    hospitals: [
        { name: 'Unakoti District Hospital', rating: 4.7, address: 'Kailashahar, Unakoti, Tripura 799277', description: 'Major government hospital serving the entire Unakoti district with multiple departments.' },
        { name: 'Kailashahar Sub-Divisional Hospital', rating: 4.6, address: 'Hospital Road, Kailashahar, Tripura 799277', description: 'Government hospital providing emergency and general healthcare services.' },
        { name: 'Life Care Hospital', rating: 4.5, address: 'Bagbasa Road, Kailashahar, Tripura 799277', description: 'Private hospital offering general, maternity, and diagnostic services.' },
        { name: 'Dr. Ghosh Clinic', rating: 4.3, address: 'Main Market, Kailashahar, Tripura 799277', description: 'Private clinic providing specialist consultations and laboratory services.' }
    ],
    touristSpots: [
        { name: 'Unakoti Heritage Site', rating: 5.0, address: 'Unakoti, near Kailashahar, Tripura 799277', description: 'Ancient rock carvings and sculptures dedicated to Lord Shiva, a UNESCO heritage site candidate.' },
        { name: 'Chabimura', rating: 4.9, address: 'Near Kailashahar, Tripura', description: 'Famous for rock carvings on river cliffs and scenic boat rides.' },
        { name: 'Lakhi Narayan Bari Temple', rating: 4.8, address: 'Kailashahar, Tripura 799277', description: 'Historical temple known for its architecture and spiritual atmosphere.' },
        { name: 'Raghunandan Hill', rating: 4.8, address: 'Kailashahar, Tripura', description: 'Beautiful viewpoint offering a panoramic view of the town and surrounding valleys.' }
    ]
},
'ambassa': {
    schools: [
        { name: 'Jawahar Navodaya Vidyalaya Ambassa', rating: 4.8, address: 'Kamalacherra, Ambassa, Dhalai, Tripura 799289', description: 'Renowned CBSE residential school providing excellent academics and co-curricular programs.' },
        { name: 'Kendriya Vidyalaya Ambassa', rating: 4.7, address: 'Near District HQ, Ambassa, Dhalai, Tripura 799289', description: 'Central government school known for quality education and holistic development.' },
        { name: 'Ambassa Higher Secondary School', rating: 4.6, address: 'Main Road, Ambassa, Tripura 799289', description: 'Prominent government school offering arts, commerce, and science streams.' },
        { name: 'Saraswati Vidya Mandir Ambassa', rating: 4.5, address: 'Kamalacherra, Ambassa, Tripura 799289', description: 'Private school emphasizing traditional values and academic excellence.' }
    ],
    restaurants: [
        { name: 'Hotel Dhalai View Restaurant', rating: 4.7, address: 'Main Road, Ambassa, Tripura 799289', description: 'Popular restaurant serving North Indian and Tripuri dishes with good ambience.' },
        { name: 'Aroma Family Restaurant', rating: 4.6, address: 'NH-8, Ambassa, Tripura 799289', description: 'Casual dining spot offering multi-cuisine meals at affordable prices.' },
        { name: 'Sagarika Hotel & Restaurant', rating: 4.5, address: 'Ambassa Bazar, Tripura 799289', description: 'Local favorite for Bengali and Indian vegetarian food.' },
        { name: 'Café Hillside', rating: 4.4, address: 'Ambassa Town, Tripura 799289', description: 'Charming café serving tea, snacks, and fast food in a scenic setting.' }
    ],
    hospitals: [
        { name: 'Dhalai District Hospital', rating: 4.7, address: 'Kamalacherra, Ambassa, Tripura 799289', description: 'Main district hospital offering multi-specialty and emergency healthcare services.' },
        { name: 'Ambassa Sub-Divisional Hospital', rating: 4.6, address: 'Ambassa Town, Tripura 799289', description: 'Government hospital providing general treatment and maternity care.' },
        { name: 'Tripura Health Care Centre', rating: 4.4, address: 'Main Road, Ambassa, Tripura 799289', description: 'Private medical center providing diagnostics and consultation.' },
        { name: 'Dr. Das Clinic', rating: 4.3, address: 'Ambassa Market, Tripura 799289', description: 'Private clinic offering general medical care and minor treatments.' }
    ],
    touristSpots: [
        { name: 'Dumboor Lake', rating: 5.0, address: 'Near Ambassa, Dhalai District, Tripura', description: 'Large scenic lake with 48 islands, popular for boating and birdwatching.' },
        { name: 'Chabimura Rock Carvings', rating: 4.9, address: 'Near Ambassa, Tripura', description: 'Ancient rock carvings of Hindu deities on the river cliffs.' },
        { name: 'Longtharai Temple', rating: 4.8, address: 'Longtharai Valley, near Ambassa, Tripura', description: 'Sacred site dedicated to Lord Shiva surrounded by lush green hills.' },
        { name: 'Sakhan Hill Viewpoint', rating: 4.8, address: 'Ambassa, Tripura 799289', description: 'Beautiful hilltop offering a panoramic view of Dhalai valley and forests.' }
    ]
},
'belonia': {
    schools: [
        { name: 'Jawahar Navodaya Vidyalaya Belonia', rating: 4.8, address: 'Hrishyamukh, Belonia, South Tripura 799155', description: 'Reputed CBSE residential school known for excellent academics and extracurricular success.' },
        { name: 'Belonia Government English Medium HS School', rating: 4.6, address: 'Belonia, South Tripura 799155', description: 'Prominent government school offering science, commerce, and arts streams.' },
        { name: 'Saraswati Vidya Mandir Belonia', rating: 4.5, address: 'Subhash Palli, Belonia, Tripura 799155', description: 'Private school combining value-based and modern education.' },
        { name: 'Kendriya Vidyalaya Belonia', rating: 4.4, address: 'Rajnagar Road, Belonia, Tripura 799155', description: 'Central government CBSE-affiliated school focusing on holistic education.' }
    ],
    restaurants: [
        { name: 'Hotel Sagarika Restaurant', rating: 4.7, address: 'Main Road, Belonia, Tripura 799155', description: 'Popular restaurant serving Bengali and North-Eastern cuisine with a homely touch.' },
        { name: 'The Green Leaf Restaurant', rating: 4.6, address: 'Subhash Palli, Belonia, Tripura 799155', description: 'Multi-cuisine eatery with good ambience and family seating.' },
        { name: 'Aroma Family Restaurant', rating: 4.5, address: 'Rajnagar Road, Belonia, Tripura 799155', description: 'Casual dining spot known for Indian and Chinese dishes.' },
        { name: 'Café Horizon', rating: 4.4, address: 'Near Belonia Bus Stand, Tripura 799155', description: 'Modern café offering coffee, snacks, and desserts with great service.' }
    ],
    hospitals: [
        { name: 'South Tripura District Hospital', rating: 4.7, address: 'Rajnagar Road, Belonia, Tripura 799155', description: 'Main government hospital providing multi-specialty and emergency services.' },
        { name: 'Belonia Sub-Divisional Hospital', rating: 4.6, address: 'Hospital Road, Belonia, Tripura 799155', description: 'Public hospital catering to the city and surrounding rural areas.' },
        { name: 'Life Line Hospital Belonia', rating: 4.4, address: 'Main Market, Belonia, Tripura 799155', description: 'Private hospital offering diagnostic and consultation facilities.' },
        { name: 'Dr. Dey’s Clinic', rating: 4.3, address: 'Belonia Bazar, Tripura 799155', description: 'Private clinic providing general healthcare and lab testing services.' }
    ],
    touristSpots: [
        { name: 'Trishna Wildlife Sanctuary', rating: 5.0, address: 'Belonia, South Tripura 799155', description: 'Protected forest area known for rich biodiversity and scenic beauty.' },
        { name: 'Pilak Archaeological Site', rating: 4.9, address: 'Jolaibari, near Belonia, Tripura', description: 'Ancient Buddhist and Hindu archaeological site with stone carvings and sculptures.' },
        { name: 'Mata Tripureswari Temple (Old Temple)', rating: 4.8, address: 'Belonia, Tripura 799155', description: 'Historic temple dedicated to Goddess Tripureswari, attracting local devotees.' },
        { name: 'Muhuri River Viewpoint', rating: 4.8, address: 'Belonia-Bangladesh Border, Tripura', description: 'Beautiful riverside area ideal for sightseeing and photography.' }
    ]
},
'khowai': {
    schools: [
        { name: 'Jawahar Navodaya Vidyalaya Khowai', rating: 4.8, address: 'Sonatala, Khowai, Tripura 799201', description: 'Central government residential school known for excellent academic results and holistic education.' },
        { name: 'Khowai Government Higher Secondary School', rating: 4.6, address: 'Main Road, Khowai, Tripura 799201', description: 'One of the oldest government schools offering science, commerce, and arts streams.' },
        { name: 'Saraswati Vidya Mandir Khowai', rating: 4.5, address: 'Hospital Road, Khowai, Tripura 799201', description: 'Private school emphasizing discipline, values, and quality education.' },
        { name: 'Kendriya Vidyalaya Khowai', rating: 4.5, address: 'Khowai Town, Tripura 799201', description: 'CBSE-affiliated school run by the central government, providing modern education.' }
    ],
    restaurants: [
        { name: 'Hotel Tripureswari Restaurant', rating: 4.7, address: 'Main Market, Khowai, Tripura 799201', description: 'Famous restaurant serving North Indian and Bengali cuisine in a clean environment.' },
        { name: 'Savor Café & Restaurant', rating: 4.6, address: 'Near Khowai Bus Stand, Tripura 799201', description: 'Trendy café offering snacks, beverages, and fast food with a cozy ambience.' },
        { name: 'Annapurna Bhojanalaya', rating: 4.5, address: 'Station Road, Khowai, Tripura 799201', description: 'Pure vegetarian eatery serving traditional Indian meals and thalis.' },
        { name: 'Green Valley Restaurant', rating: 4.4, address: 'College Road, Khowai, Tripura 799201', description: 'Casual family restaurant offering Indian and Chinese dishes.' }
    ],
    hospitals: [
        { name: 'Khowai District Hospital', rating: 4.7, address: 'Hospital Road, Khowai, Tripura 799201', description: 'Main government hospital of the district providing general and specialized care.' },
        { name: 'Khowai Sub-Divisional Hospital', rating: 4.6, address: 'Town Area, Khowai, Tripura 799201', description: 'Government hospital serving local residents with emergency and outpatient services.' },
        { name: 'Life Line Health Centre', rating: 4.4, address: 'Main Market, Khowai, Tripura 799201', description: 'Private medical facility offering general healthcare and diagnostics.' },
        { name: 'Dr. Paul Clinic', rating: 4.3, address: 'Khowai Bazar, Tripura 799201', description: 'Private clinic providing consultations and minor treatments.' }
    ],
    touristSpots: [
        { name: 'Baramura Eco Park', rating: 5.0, address: 'Near Khowai, Tripura 799201', description: 'Beautiful eco-park surrounded by forests, popular for nature walks and picnics.' },
        { name: 'Khowai River Viewpoint', rating: 4.9, address: 'Khowai Town, Tripura 799201', description: 'Scenic riverside spot offering great views and relaxation.' },
        { name: 'Tirthamukh', rating: 4.8, address: 'Near Khowai, Tripura', description: 'Cultural site and picnic destination located on the banks of Dumbur River.' },
        { name: 'Atharamura Hills', rating: 4.8, address: 'Khowai District, Tripura', description: 'Picturesque hill range ideal for trekking and panoramic photography.' }
    ]
},
'sabroom': {
    schools: [
        { name: 'Sabroom Government Higher Secondary School', rating: 4.7, address: 'Main Road, Sabroom, Tripura 799145', description: 'Well-known government school offering quality education with science and arts streams.' },
        { name: 'Jawahar Navodaya Vidyalaya Sabroom', rating: 4.8, address: 'Bhangmun, Sabroom, Tripura 799145', description: 'Residential CBSE school under the Ministry of Education, known for academic excellence.' },
        { name: 'Holy Cross School Sabroom', rating: 4.6, address: 'College Road, Sabroom, Tripura 799145', description: 'Private English medium school offering modern facilities and holistic education.' },
        { name: 'Sabroom English Medium HS School', rating: 4.5, address: 'Town Area, Sabroom, Tripura 799145', description: 'Popular private school focusing on academics and extracurricular development.' }
    ],
    restaurants: [
        { name: 'Tripureshwari Family Restaurant', rating: 4.7, address: 'Main Market, Sabroom, Tripura 799145', description: 'Local favorite serving Bengali, Indian, and Chinese dishes in a family-friendly setting.' },
        { name: 'Hotel Sagarika Restaurant', rating: 4.6, address: 'Sabroom Bus Stand, Tripura 799145', description: 'Multi-cuisine restaurant known for thalis, snacks, and seafood.' },
        { name: 'Green Leaf Restaurant', rating: 4.5, address: 'Subhash Nagar, Sabroom, Tripura 799145', description: 'Small but cozy restaurant serving vegetarian meals and tea.' },
        { name: 'Sabroom Food Corner', rating: 4.4, address: 'Market Road, Sabroom, Tripura 799145', description: 'Affordable eatery serving fast food and homestyle meals.' }
    ],
    hospitals: [
        { name: 'Sabroom Sub-Divisional Hospital', rating: 4.8, address: 'Hospital Road, Sabroom, Tripura 799145', description: 'Main government hospital offering emergency, maternity, and outpatient services.' },
        { name: 'Sabroom Primary Health Centre', rating: 4.6, address: 'Town Area, Sabroom, Tripura 799145', description: 'Government health center catering to nearby rural areas with basic facilities.' },
        { name: 'Life Care Clinic Sabroom', rating: 4.4, address: 'College Road, Sabroom, Tripura 799145', description: 'Private clinic providing general medical consultations and diagnostics.' },
        { name: 'Tripura Diagnostic Centre', rating: 4.3, address: 'Sabroom Bazar, Tripura 799145', description: 'Diagnostic lab and healthcare facility with modern equipment.' }
    ],
    touristSpots: [
        { name: 'Maitri Setu', rating: 5.0, address: 'Feni River, Sabroom, Tripura 799145', description: 'Iconic Indo-Bangladesh friendship bridge connecting India and Bangladesh.' },
        { name: 'Kalapani Eco Park', rating: 4.9, address: 'Sabroom, Tripura 799145', description: 'Beautiful park near the Feni River offering boating and picnic areas.' },
        { name: 'Trishna Wildlife Sanctuary', rating: 4.8, address: 'Near Sabroom, South Tripura', description: 'Protected area home to rich biodiversity and scenic trekking routes.' },
        { name: 'Pilak Archaeological Site', rating: 4.7, address: 'Jolaibari, near Sabroom, Tripura', description: 'Historical site with ancient Buddhist and Hindu sculptures dating back to the 8th century.' }
    ]
},
'sonamura': {
    schools: [
        { name: 'Sonamura Government Higher Secondary School', rating: 4.7, address: 'Main Road, Sonamura, Tripura 799131', description: 'Reputed government school offering arts, commerce, and science streams.' },
        { name: 'Jawahar Navodaya Vidyalaya Sonamura', rating: 4.8, address: 'Bagma Road, Sonamura, Tripura 799131', description: 'CBSE-affiliated residential school with excellent academics and extracurriculars.' },
        { name: 'Holy Cross School Sonamura', rating: 4.6, address: 'Sonamura Town, Tripura 799131', description: 'Private English-medium school focusing on discipline and all-round development.' },
        { name: 'Don Bosco School Sonamura', rating: 4.5, address: 'College Road, Sonamura, Tripura 799131', description: 'Catholic educational institution providing quality education with moral values.' }
    ],
    restaurants: [
        { name: 'Sagarika Restaurant', rating: 4.7, address: 'Main Market, Sonamura, Tripura 799131', description: 'Family restaurant serving Indian and Bengali cuisines.' },
        { name: 'Tripura Delight Restaurant', rating: 4.6, address: 'Market Road, Sonamura, Tripura 799131', description: 'Casual dining spot offering thalis, snacks, and beverages.' },
        { name: 'Green Valley Café', rating: 4.5, address: 'Sonamura Bazar, Tripura 799131', description: 'Modern café known for coffee, fast food, and friendly ambiance.' },
        { name: 'Royal Bhojanalaya', rating: 4.4, address: 'Bus Stand Area, Sonamura, Tripura 799131', description: 'Budget-friendly restaurant offering vegetarian and non-vegetarian meals.' }
    ],
    hospitals: [
        { name: 'Sonamura Sub-Divisional Hospital', rating: 4.7, address: 'Hospital Road, Sonamura, Tripura 799131', description: 'Major government hospital offering general healthcare and emergency services.' },
        { name: 'Primary Health Centre Sonamura', rating: 4.5, address: 'Town Area, Sonamura, Tripura 799131', description: 'Government PHC providing basic treatment and vaccination services.' },
        { name: 'Life Line Clinic', rating: 4.4, address: 'Main Market, Sonamura, Tripura 799131', description: 'Private clinic providing outpatient and diagnostic services.' },
        { name: 'Tripura Health Point', rating: 4.3, address: 'College Road, Sonamura, Tripura 799131', description: 'Small private hospital offering maternity and child care services.' }
    ],
    touristSpots: [
        { name: 'Gomati River View Point', rating: 5.0, address: 'Sonamura, Tripura 799131', description: 'Scenic riverbank area perfect for boating and evening walks.' },
        { name: 'Boxanagar Archaeological Site', rating: 4.9, address: 'Boxanagar, near Sonamura, Tripura', description: 'Ancient Buddhist archaeological site with excavated stupas and sculptures.' },
        { name: 'Kalibari Temple', rating: 4.8, address: 'Sonamura Town, Tripura 799131', description: 'Historic Hindu temple dedicated to Goddess Kali, popular among locals.' },
        { name: 'Sonamura Eco Park', rating: 4.7, address: 'Near Riverbank, Sonamura, Tripura 799131', description: 'Beautiful park offering lush greenery, picnic areas, and walking trails.' }
    ]
},
'teliamura': {
    schools: [
        { name: 'Teliamura Government Higher Secondary School', rating: 4.7, address: 'Main Road, Teliamura, Tripura 799205', description: 'Renowned government school offering science, commerce, and arts streams.' },
        { name: 'Jawahar Navodaya Vidyalaya Teliamura', rating: 4.8, address: 'North Maharanipur, Teliamura, Tripura 799205', description: 'CBSE-affiliated residential school known for high-quality academics and sports.' },
        { name: 'Holy Cross School Teliamura', rating: 4.6, address: 'Panchayat Road, Teliamura, Tripura 799205', description: 'Private English-medium school emphasizing holistic education and discipline.' },
        { name: 'Teliamura English Medium HS School', rating: 4.5, address: 'Town Area, Teliamura, Tripura 799205', description: 'Popular private school focusing on academic excellence and extracurriculars.' }
    ],
    restaurants: [
        { name: 'Green Valley Restaurant', rating: 4.7, address: 'Main Market, Teliamura, Tripura 799205', description: 'Family-friendly restaurant serving Indian and Chinese cuisines.' },
        { name: 'Tripureshwari Restaurant', rating: 4.6, address: 'NH 8, Teliamura, Tripura 799205', description: 'Casual dining restaurant offering delicious North Indian and Bengali food.' },
        { name: 'Food Junction Café', rating: 4.5, address: 'Station Road, Teliamura, Tripura 799205', description: 'Modern café serving coffee, snacks, and bakery items.' },
        { name: 'Royal Bhojanalaya', rating: 4.4, address: 'Bus Stand Area, Teliamura, Tripura 799205', description: 'Popular restaurant serving homestyle thalis and vegetarian dishes.' }
    ],
    hospitals: [
        { name: 'Teliamura Sub-Divisional Hospital', rating: 4.8, address: 'Hospital Road, Teliamura, Tripura 799205', description: 'Major government hospital with emergency, maternity, and outpatient services.' },
        { name: 'Primary Health Centre Teliamura', rating: 4.6, address: 'Town Area, Teliamura, Tripura 799205', description: 'Government PHC providing essential healthcare and vaccinations.' },
        { name: 'Sunshine Clinic & Diagnostics', rating: 4.4, address: 'College Road, Teliamura, Tripura 799205', description: 'Private diagnostic and treatment center with modern facilities.' },
        { name: 'Life Care Hospital Teliamura', rating: 4.3, address: 'Main Road, Teliamura, Tripura 799205', description: 'Private healthcare facility offering basic and emergency services.' }
    ],
    touristSpots: [
        { name: 'Kalyan Sagar Lake', rating: 5.0, address: 'Tripureshwari Temple Complex, Teliamura, Tripura', description: 'Sacred lake surrounded by temples, known for its peaceful ambiance and turtles.' },
        { name: 'Baramura Eco Park', rating: 4.9, address: 'Baramura Hills, near Teliamura, Tripura', description: 'Eco-tourism spot with forest trails, viewpoints, and picnic areas.' },
        { name: 'Khumulwng Park', rating: 4.8, address: 'Near Teliamura, Tripura 799205', description: 'Beautiful park maintained by the local tribal council, known for cultural festivals.' },
        { name: 'Barmura Hills Viewpoint', rating: 4.7, address: 'Baramura Range, Teliamura, Tripura', description: 'Scenic mountain viewpoint offering panoramic views of the valley.' }
    ]
},
'bishalgarh': {
    schools: [
        { name: 'Bishalgarh Government Higher Secondary School', rating: 4.7, address: 'Main Road, Bishalgarh, Tripura 799102', description: 'Leading government school offering science, commerce, and arts education.' },
        { name: 'Jawahar Navodaya Vidyalaya Bishalgarh', rating: 4.8, address: 'Near Kamalasagar, Bishalgarh, Tripura 799102', description: 'Residential CBSE school providing excellent academic and co-curricular opportunities.' },
        { name: 'Holy Cross School Bishalgarh', rating: 4.6, address: 'College Road, Bishalgarh, Tripura 799102', description: 'English-medium school focused on holistic learning and discipline.' },
        { name: 'Bishalgarh English Medium HS School', rating: 4.5, address: 'Town Area, Bishalgarh, Tripura 799102', description: 'Private institution with emphasis on academics and extracurricular programs.' }
    ],
    restaurants: [
        { name: 'Sujata Restaurant', rating: 4.7, address: 'Main Market, Bishalgarh, Tripura 799102', description: 'Popular local restaurant offering Indian and Bengali cuisines.' },
        { name: 'Tripura Bhojanalaya', rating: 4.6, address: 'Market Road, Bishalgarh, Tripura 799102', description: 'Vegetarian-friendly eatery serving thalis and regional dishes.' },
        { name: 'Green Garden Restaurant', rating: 4.5, address: 'Station Road, Bishalgarh, Tripura 799102', description: 'Casual dining spot offering Chinese and North Indian meals.' },
        { name: 'Royal Treat Café', rating: 4.4, address: 'Bus Stand Area, Bishalgarh, Tripura 799102', description: 'Modern café serving coffee, fast food, and desserts.' }
    ],
    hospitals: [
        { name: 'Bishalgarh Sub-Divisional Hospital', rating: 4.8, address: 'Hospital Road, Bishalgarh, Tripura 799102', description: 'Government hospital with general and emergency medical services.' },
        { name: 'Primary Health Centre Bishalgarh', rating: 4.6, address: 'Town Area, Bishalgarh, Tripura 799102', description: 'Government PHC offering essential healthcare and vaccination programs.' },
        { name: 'Life Line Hospital', rating: 4.4, address: 'Main Road, Bishalgarh, Tripura 799102', description: 'Private hospital providing general treatment and diagnostics.' },
        { name: 'Dr. Das Clinic', rating: 4.3, address: 'Market Area, Bishalgarh, Tripura 799102', description: 'Private clinic specializing in consultations and minor treatments.' }
    ],
    touristSpots: [
        { name: 'Kamalasagar Lake', rating: 5.0, address: 'Kamalasagar, Bishalgarh, Tripura', description: 'Picturesque lake located near the Indo-Bangladesh border with scenic beauty and a famous temple.' },
        { name: 'Kasba Kali Temple', rating: 4.9, address: 'Kamalasagar, Bishalgarh, Tripura', description: 'Historic temple dedicated to Goddess Kali, visited by pilgrims throughout the year.' },
        { name: 'Sipahijala Wildlife Sanctuary', rating: 4.8, address: 'Near Bishalgarh, Tripura', description: 'Famous sanctuary housing diverse flora and fauna, perfect for nature lovers.' },
        { name: 'Heritage Park', rating: 4.7, address: 'Bishalgarh Town, Tripura 799102', description: 'Urban park showcasing Tripura’s cultural heritage with sculptures and gardens.' }
    ]
},
'mohanpur': {
    schools: [
        { name: 'Mohanpur Government Higher Secondary School', rating: 4.7, address: 'Main Road, Mohanpur, Tripura 799211', description: 'Reputed government institution offering science, arts, and commerce streams.' },
        { name: 'Jawahar Navodaya Vidyalaya Mohanpur', rating: 4.8, address: 'Bamutia, Mohanpur, Tripura 799211', description: 'Residential CBSE school providing quality education and sports training.' },
        { name: 'Holy Cross School Mohanpur', rating: 4.6, address: 'Town Area, Mohanpur, Tripura 799211', description: 'English-medium school known for discipline and overall personality development.' },
        { name: 'Mohanpur English Medium School', rating: 4.5, address: 'College Road, Mohanpur, Tripura 799211', description: 'Private school providing modern facilities and quality academics.' }
    ],
    restaurants: [
        { name: 'Royal Bhojanalaya', rating: 4.7, address: 'Main Market, Mohanpur, Tripura 799211', description: 'Popular restaurant serving North Indian and Bengali dishes.' },
        { name: 'Tripura Spice Restaurant', rating: 4.6, address: 'Mohanpur Bazar, Tripura 799211', description: 'Casual eatery serving thalis, snacks, and fast food.' },
        { name: 'Green Leaf Café', rating: 4.5, address: 'Station Road, Mohanpur, Tripura 799211', description: 'Modern café offering tea, coffee, and light meals in a relaxed setting.' },
        { name: 'Suhani Family Restaurant', rating: 4.4, address: 'Bus Stand Area, Mohanpur, Tripura 799211', description: 'Family-friendly restaurant offering multi-cuisine options.' }
    ],
    hospitals: [
        { name: 'Mohanpur Sub-Divisional Hospital', rating: 4.8, address: 'Hospital Road, Mohanpur, Tripura 799211', description: 'Government hospital providing emergency, OPD, and maternal care services.' },
        { name: 'Primary Health Centre Mohanpur', rating: 4.6, address: 'Town Area, Mohanpur, Tripura 799211', description: 'Public health centre catering to local residents and nearby villages.' },
        { name: 'Life Care Medical Centre', rating: 4.4, address: 'Market Road, Mohanpur, Tripura 799211', description: 'Private clinic offering diagnostics and general treatment.' },
        { name: 'Sunrise Clinic', rating: 4.3, address: 'Main Market, Mohanpur, Tripura 799211', description: 'Small healthcare facility providing primary medical consultation.' }
    ],
    touristSpots: [
        { name: 'Kunjaban Palace Gardens', rating: 5.0, address: 'Near Mohanpur, Tripura', description: 'Beautiful heritage gardens surrounding the historic royal palace.' },
        { name: 'Trishna Eco Park', rating: 4.9, address: 'Mohanpur, Tripura 799211', description: 'Eco-friendly park with lakes, walking trails, and picnic spots.' },
        { name: 'Jampui Hills View Point', rating: 4.8, address: 'Near Mohanpur, Tripura', description: 'Scenic viewpoint offering panoramic views of the green hills.' },
        { name: 'Ujjayanta Palace', rating: 4.7, address: 'Near Agartala, accessible from Mohanpur', description: 'Royal palace and museum showcasing Tripura’s royal history and culture.' }
    ]
},
'santirbazar': {
    schools: [
        { name: 'Santirbazar Government Higher Secondary School', rating: 4.7, address: 'Main Road, Santirbazar, Tripura 799144', description: 'Leading government school offering science, arts, and commerce streams.' },
        { name: 'Jawahar Navodaya Vidyalaya Santirbazar', rating: 4.8, address: 'Santirbazar, South Tripura 799144', description: 'Residential CBSE school recognized for academic excellence and co-curricular activities.' },
        { name: 'Holy Cross School Santirbazar', rating: 4.6, address: 'Town Area, Santirbazar, Tripura 799144', description: 'English-medium private school focusing on value-based modern education.' },
        { name: 'Santirbazar English Medium HS School', rating: 4.5, address: 'College Road, Santirbazar, Tripura 799144', description: 'Popular private school offering holistic education and extracurricular activities.' }
    ],
    restaurants: [
        { name: 'Hotel Rajdhani Restaurant', rating: 4.7, address: 'Main Market, Santirbazar, Tripura 799144', description: 'Family restaurant serving North Indian, Bengali, and Chinese dishes.' },
        { name: 'Tripura Delight Restaurant', rating: 4.6, address: 'Market Road, Santirbazar, Tripura 799144', description: 'Well-known for vegetarian thalis and traditional meals.' },
        { name: 'Green Corner Café', rating: 4.5, address: 'Bus Stand Area, Santirbazar, Tripura 799144', description: 'Modern café serving snacks, coffee, and bakery items.' },
        { name: 'The Spice Hut', rating: 4.4, address: 'Santirbazar Bazar, Tripura 799144', description: 'Cozy restaurant offering affordable, tasty meals with local flavors.' }
    ],
    hospitals: [
        { name: 'Santirbazar Sub-Divisional Hospital', rating: 4.8, address: 'Hospital Road, Santirbazar, Tripura 799144', description: 'Government hospital providing comprehensive health and emergency services.' },
        { name: 'Primary Health Centre Santirbazar', rating: 4.6, address: 'Town Area, Santirbazar, Tripura 799144', description: 'Public PHC delivering primary healthcare and vaccination programs.' },
        { name: 'Life Line Clinic & Diagnostics', rating: 4.4, address: 'Main Market, Santirbazar, Tripura 799144', description: 'Private clinic offering diagnostic, dental, and consultation services.' },
        { name: 'Tripura Health Care Centre', rating: 4.3, address: 'College Road, Santirbazar, Tripura 799144', description: 'Modern private hospital offering maternity and general care services.' }
    ],
    touristSpots: [
        { name: 'Trishna Wildlife Sanctuary', rating: 5.0, address: 'Near Santirbazar, South Tripura', description: 'Renowned wildlife sanctuary home to diverse flora, fauna, and scenic trekking trails.' },
        { name: 'Pilak Archaeological Site', rating: 4.9, address: 'Jolaibari, near Santirbazar, Tripura', description: 'Ancient site showcasing Buddhist and Hindu stone carvings from the 8th–9th century.' },
        { name: 'Mata Tripureshwari Temple', rating: 4.8, address: 'Udaipur, accessible from Santirbazar', description: 'One of the 51 Shakti Peethas, dedicated to Goddess Tripura Sundari.' },
        { name: 'Rupaichari Border Point', rating: 4.7, address: 'South Tripura, near Santirbazar', description: 'Beautiful Indo-Bangladesh border area with scenic views and trade markets.' }
    ]
},
'jirania': {
    schools: [
        { name: 'Jirania Government Higher Secondary School', rating: 4.7, address: 'Main Road, Jirania, Tripura 799045', description: 'Prominent government school offering science, commerce, and arts education.' },
        { name: 'Jawahar Navodaya Vidyalaya Jirania', rating: 4.8, address: 'Jirania, West Tripura 799045', description: 'Residential CBSE school providing excellent academics, sports, and co-curricular activities.' },
        { name: 'Holy Cross School Jirania', rating: 4.6, address: 'Town Area, Jirania, Tripura 799045', description: 'Private English-medium school known for discipline and overall development.' },
        { name: 'Jirania English Medium HS School', rating: 4.5, address: 'College Road, Jirania, Tripura 799045', description: 'Popular private institution offering quality education and modern facilities.' }
    ],
    restaurants: [
        { name: 'Annapurna Restaurant', rating: 4.7, address: 'Main Market, Jirania, Tripura 799045', description: 'Family restaurant serving authentic Bengali and Indian cuisines.' },
        { name: 'Tripura Delight Dhaba', rating: 4.6, address: 'NH 8, Jirania, Tripura 799045', description: 'Highway dhaba popular for homestyle meals and snacks.' },
        { name: 'Green Valley Café', rating: 4.5, address: 'Market Road, Jirania, Tripura 799045', description: 'Modern café offering tea, coffee, and fast food in a cozy setting.' },
        { name: 'Royal Taste Restaurant', rating: 4.4, address: 'Bus Stand Area, Jirania, Tripura 799045', description: 'Casual dining restaurant offering North Indian and Chinese dishes.' }
    ],
    hospitals: [
        { name: 'Jirania Sub-Divisional Hospital', rating: 4.8, address: 'Hospital Road, Jirania, Tripura 799045', description: 'Main government hospital providing OPD, emergency, and maternal care.' },
        { name: 'Primary Health Centre Jirania', rating: 4.6, address: 'Town Area, Jirania, Tripura 799045', description: 'Government PHC catering to nearby rural and urban areas with basic health facilities.' },
        { name: 'Life Care Clinic & Diagnostics', rating: 4.4, address: 'Main Market, Jirania, Tripura 799045', description: 'Private diagnostic center and clinic offering consultations and tests.' },
        { name: 'Sunrise Hospital Jirania', rating: 4.3, address: 'College Road, Jirania, Tripura 799045', description: 'Private healthcare center providing maternity and pediatric services.' }
    ],
    touristSpots: [
        { name: 'Heritage Park', rating: 5.0, address: 'Near Jirania, West Tripura', description: 'Beautiful park featuring Tripura’s cultural heritage and miniature monuments.' },
        { name: 'Buddha Temple Benuban Vihar', rating: 4.9, address: 'Jirania, Tripura 799045', description: 'Peaceful Buddhist monastery known for meditation and scenic surroundings.' },
        { name: 'Sipahijala Wildlife Sanctuary', rating: 4.8, address: 'Near Jirania, Tripura', description: 'Famous sanctuary with deer, primates, and boating facilities.' },
        { name: 'Kalyan Sagar Lake', rating: 4.7, address: 'Tripureshwari Temple Complex, near Jirania', description: 'Serene lake surrounded by temples and green landscapes.' }
    ]
},
'kamalpur': {
    schools: [
        { name: 'Kamalpur Government Higher Secondary School', rating: 4.7, address: 'Main Road, Kamalpur, Tripura 799285', description: 'Leading government school offering science, arts, and commerce streams with experienced teachers.' },
        { name: 'Jawahar Navodaya Vidyalaya Kamalpur', rating: 4.8, address: 'Dhalai District, Kamalpur, Tripura 799285', description: 'Residential CBSE school known for academic excellence and sports.' },
        { name: 'Kamalpur English Medium HS School', rating: 4.6, address: 'College Road, Kamalpur, Tripura 799285', description: 'Well-known private institution offering quality education and extracurricular activities.' },
        { name: 'Holy Cross School Kamalpur', rating: 4.5, address: 'Subhasnagar, Kamalpur, Tripura 799285', description: 'Private English-medium school emphasizing discipline, values, and academics.' }
    ],
    restaurants: [
        { name: 'Royal Kitchen Kamalpur', rating: 4.7, address: 'Main Market, Kamalpur, Tripura 799285', description: 'Popular restaurant serving Indian and Bengali cuisines in a family-friendly atmosphere.' },
        { name: 'Hotel Blue Moon Restaurant', rating: 4.6, address: 'NH 208, Kamalpur, Tripura 799285', description: 'Casual dining spot offering a mix of Indian, Chinese, and fast food.' },
        { name: 'Tripura Spice Dhaba', rating: 4.5, address: 'Highway Road, Kamalpur, Tripura 799285', description: 'Highway dhaba known for delicious thalis and snacks.' },
        { name: 'Green Leaf Café', rating: 4.4, address: 'College Road, Kamalpur, Tripura 799285', description: 'Cozy café offering coffee, snacks, and light meals.' }
    ],
    hospitals: [
        { name: 'Kamalpur Sub-Divisional Hospital', rating: 4.8, address: 'Hospital Road, Kamalpur, Tripura 799285', description: 'Government hospital with emergency, OPD, and maternity services.' },
        { name: 'Primary Health Centre Kamalpur', rating: 4.6, address: 'Town Area, Kamalpur, Tripura 799285', description: 'PHC offering basic healthcare facilities and vaccinations.' },
        { name: 'Life Line Diagnostic Centre', rating: 4.4, address: 'Market Road, Kamalpur, Tripura 799285', description: 'Private diagnostic center providing pathology and consultation services.' },
        { name: 'Sunrise Clinic Kamalpur', rating: 4.3, address: 'Subhasnagar, Kamalpur, Tripura 799285', description: 'Private clinic with general physician and maternity care services.' }
    ],
    touristSpots: [
        { name: 'Longtharai Temple', rating: 5.0, address: 'Longtharai Valley, near Kamalpur, Tripura', description: 'Ancient temple dedicated to Lord Shiva amidst lush green hills.' },
        { name: 'Dambur Lake', rating: 4.9, address: 'Near Kamalpur, Tripura', description: 'Large scenic lake known for boating and the famous Pous Sankranti fair.' },
        { name: 'Raima Valley', rating: 4.8, address: 'Kamalpur, Tripura', description: 'Beautiful valley offering picturesque views and peaceful surroundings.' },
        { name: 'Chabimura Rock Carvings', rating: 4.7, address: 'Near Kamalpur, Tripura', description: 'Historical site featuring ancient carvings of Hindu deities on rocky cliffs.' }
    ]
},







'hyderabad': {
    schools: [
        { name: 'Hyderabad Public School', rating: 4.9, address: 'Begumpet, Hyderabad, Telangana 500016', description: 'Prestigious institution offering ICSE and ISC curriculum with excellent academic and sports facilities.' },
        { name: 'Delhi Public School Hyderabad', rating: 4.8, address: 'Khajaguda, Hyderabad, Telangana 500008', description: 'CBSE-affiliated school known for quality education and extracurricular excellence.' },
        { name: 'Oakridge International School', rating: 4.7, address: 'Gachibowli, Hyderabad, Telangana 500032', description: 'Renowned international school offering IB and CBSE curriculum.' },
        { name: 'Chirec International School', rating: 4.6, address: 'Kondapur, Hyderabad, Telangana 500084', description: 'Top private school with focus on holistic education and innovation.' }
    ],
    restaurants: [
        { name: 'Paradise Biryani', rating: 4.8, address: 'Secunderabad, Hyderabad, Telangana 500003', description: 'Iconic restaurant famous for authentic Hyderabadi biryani and kebabs.' },
        { name: 'Bawarchi Restaurant', rating: 4.7, address: 'RTC Cross Road, Hyderabad, Telangana 500020', description: 'Popular biryani and North Indian cuisine spot loved by locals and tourists.' },
        { name: 'Ohri’s Tansen', rating: 4.6, address: 'Necklace Road, Hyderabad, Telangana 500082', description: 'Fine dining restaurant offering royal Mughlai cuisine and live music.' },
        { name: 'Chutneys', rating: 4.5, address: 'Jubilee Hills, Hyderabad, Telangana 500033', description: 'South Indian vegetarian restaurant known for its signature chutney varieties.' }
    ],
    hospitals: [
        { name: 'Apollo Hospitals', rating: 4.9, address: 'Jubilee Hills, Hyderabad, Telangana 500033', description: 'Leading multi-specialty hospital with advanced facilities and global reputation.' },
        { name: 'Yashoda Hospitals', rating: 4.8, address: 'Somajiguda, Hyderabad, Telangana 500082', description: 'Renowned hospital providing specialized medical services and emergency care.' },
        { name: 'Care Hospitals', rating: 4.7, address: 'Banjara Hills, Hyderabad, Telangana 500034', description: 'Super-specialty hospital offering comprehensive healthcare services.' },
        { name: 'KIMS Hospitals', rating: 4.7, address: 'Begumpet, Hyderabad, Telangana 500016', description: 'Modern hospital known for excellent surgical and diagnostic care.' }
    ],
    touristSpots: [
        { name: 'Charminar', rating: 5.0, address: 'Charminar Rd, Hyderabad, Telangana 500002', description: 'Historic monument and global symbol of Hyderabad built in 1591.' },
        { name: 'Golconda Fort', rating: 4.9, address: 'Khair Complex, Ibrahim Bagh, Hyderabad, Telangana 500008', description: 'Majestic fortress with rich history and panoramic city views.' },
        { name: 'Hussain Sagar Lake', rating: 4.8, address: 'Tank Bund Rd, Hyderabad, Telangana 500029', description: 'Famous heart-shaped lake with boating and the Buddha statue at its center.' },
        { name: 'Ramoji Film City', rating: 4.8, address: 'Abdullahpurmet, Hyderabad, Telangana 501512', description: 'World’s largest film studio complex and a major tourist attraction.' }
    ]
},
'warangal': {
    schools: [
        { name: 'Greenwood High School', rating: 4.8, address: 'Hanamkonda, Warangal, Telangana 506001', description: 'Reputed CBSE school offering excellent academics and co-curricular activities.' },
        { name: 'St. Gabriel’s High School', rating: 4.7, address: 'Kazipet, Warangal, Telangana 506003', description: 'Well-known institution providing quality education with a focus on discipline and values.' },
        { name: 'Kakatiya High School', rating: 4.6, address: 'Subedari, Warangal, Telangana 506001', description: 'Popular school offering both Telugu and English medium education with good results.' },
        { name: 'Delhi Public School Warangal', rating: 4.6, address: 'Kazipet, Warangal, Telangana 506003', description: 'Branch of the DPS chain known for academic excellence and extracurricular programs.' }
    ],
    restaurants: [
        { name: 'The Biryani House', rating: 4.8, address: 'Hanamkonda, Warangal, Telangana 506001', description: 'Famous restaurant serving authentic Hyderabadi biryani and kebabs.' },
        { name: 'Sitara Restaurant', rating: 4.7, address: 'Kazipet, Warangal, Telangana 506003', description: 'Casual dining restaurant known for its North and South Indian dishes.' },
        { name: 'Taste of India', rating: 4.6, address: 'Subedari, Warangal, Telangana 506001', description: 'Popular family restaurant serving multi-cuisine dishes in a cozy setting.' },
        { name: 'Hotel Ashoka', rating: 4.5, address: 'Nakkalagutta, Warangal, Telangana 506001', description: 'Classic hotel restaurant offering traditional Telangana and Andhra meals.' }
    ],
    hospitals: [
        { name: 'MGM Hospital', rating: 4.8, address: 'Subedari, Warangal, Telangana 506001', description: 'Major government hospital providing a wide range of healthcare services.' },
        { name: 'Surya Hospital', rating: 4.7, address: 'Hanamkonda, Warangal, Telangana 506001', description: 'Multi-specialty hospital known for patient care and advanced treatment options.' },
        { name: 'Vasavi Hospital', rating: 4.6, address: 'Kazipet, Warangal, Telangana 506003', description: 'Private hospital offering general and emergency healthcare services.' },
        { name: 'LifeSpring Maternity Hospital', rating: 4.5, address: 'Nakkalagutta, Warangal, Telangana 506001', description: 'Hospital specializing in maternity and women’s health services.' }
    ],
    touristSpots: [
        { name: 'Warangal Fort', rating: 5.0, address: 'Mathwada, Warangal, Telangana 506002', description: 'Historic fort built by the Kakatiya dynasty featuring ancient architecture and gateways.' },
        { name: 'Thousand Pillar Temple', rating: 4.9, address: 'Hanamkonda, Warangal, Telangana 506001', description: 'Magnificent 12th-century temple dedicated to Lord Shiva, Vishnu, and Surya.' },
        { name: 'Bhadrakali Temple', rating: 4.8, address: 'Bhadrakali Hills, Warangal, Telangana 506007', description: 'Famous temple dedicated to Goddess Bhadrakali, situated beside a serene lake.' },
        { name: 'Pakhal Lake', rating: 4.8, address: 'Near Narsampet, Warangal District, Telangana', description: 'Scenic man-made lake surrounded by forest, ideal for picnics and nature walks.' }
    ]
},
'nizamabad': {
    schools: [
        { name: 'St. Paul’s High School', rating: 4.8, address: 'Yellammagutta, Nizamabad, Telangana 503001', description: 'Top English-medium school known for academic excellence and cultural programs.' },
        { name: 'Kakatiya High School', rating: 4.7, address: 'Bodhan Road, Nizamabad, Telangana 503001', description: 'Reputed institution providing strong academic foundation and co-curricular activities.' },
        { name: 'Delhi Public School Nizamabad', rating: 4.6, address: 'Dichpally, Nizamabad, Telangana 503175', description: 'Modern CBSE-affiliated school offering holistic education and advanced facilities.' },
        { name: 'Trinity High School', rating: 4.5, address: 'Armoor Road, Nizamabad, Telangana 503002', description: 'Popular private school emphasizing academics, discipline, and values.' }
    ],
    restaurants: [
        { name: 'Hotel Haritha', rating: 4.7, address: 'Yellammagutta, Nizamabad, Telangana 503001', description: 'Tourism-run restaurant offering authentic Telangana dishes in a clean setting.' },
        { name: 'Swagath Restaurant', rating: 4.6, address: 'Bodhan Road, Nizamabad, Telangana 503001', description: 'Casual dining restaurant known for biryani, tandoori, and South Indian food.' },
        { name: 'Spicy Bite Family Restaurant', rating: 4.5, address: 'Subhash Road, Nizamabad, Telangana 503001', description: 'Family restaurant serving North Indian and Chinese cuisine.' },
        { name: 'Foodie’s Junction', rating: 4.4, address: 'Bus Stand Road, Nizamabad, Telangana 503001', description: 'Trendy eatery with snacks, fast food, and beverages popular among youth.' }
    ],
    hospitals: [
        { name: 'Government General Hospital Nizamabad', rating: 4.8, address: 'Yellammagutta, Nizamabad, Telangana 503001', description: 'Main government hospital providing emergency and specialized care.' },
        { name: 'SRR Hospital', rating: 4.6, address: 'Subhash Road, Nizamabad, Telangana 503001', description: 'Private multi-specialty hospital with good diagnostics and patient service.' },
        { name: 'Care Hospital Nizamabad', rating: 4.6, address: 'Bodhan Road, Nizamabad, Telangana 503001', description: 'Renowned private hospital offering modern treatment facilities.' },
        { name: 'Jyothi Hospital', rating: 4.5, address: 'Armoor Road, Nizamabad, Telangana 503002', description: 'Well-known hospital providing maternity and general health services.' }
    ],
    touristSpots: [
        { name: 'Nizamabad Fort', rating: 5.0, address: 'Quilla Road, Nizamabad, Telangana 503001', description: 'Historical fort offering panoramic views of the city, built by Rashtrakuta kings.' },
        { name: 'Alisagar Reservoir', rating: 4.8, address: 'Alisagar, near Nizamabad, Telangana', description: 'Beautiful lake and park ideal for boating and picnics.' },
        { name: 'Dichpally Ramalayam', rating: 4.8, address: 'Dichpally, Nizamabad, Telangana 503175', description: 'Ancient temple known as the "Khajuraho of Nizamabad" for its carvings.' },
        { name: 'Pocharam Wildlife Sanctuary', rating: 4.7, address: 'Pocharam, Nizamabad District, Telangana', description: 'Nature reserve known for migratory birds, deer, and serene landscapes.' }
    ]
},
'karimnagar': {
    schools: [
        { name: 'Trinity High School', rating: 4.8, address: 'Mankammathota, Karimnagar, Telangana 505001', description: 'Top English-medium school with strong academics and co-curricular programs.' },
        { name: 'Delhi Public School Karimnagar', rating: 4.7, address: 'Arepally, Karimnagar, Telangana 505001', description: 'CBSE-affiliated school known for modern infrastructure and holistic education.' },
        { name: 'Siddhartha High School', rating: 4.6, address: 'Vavilalapally, Karimnagar, Telangana 505001', description: 'Reputed school offering excellent board results and discipline-oriented teaching.' },
        { name: 'Vivekananda Residential School', rating: 4.5, address: 'Bommakal, Karimnagar, Telangana 505001', description: 'Well-known residential school providing balanced academic and cultural education.' }
    ],
    restaurants: [
        { name: 'Hotel Prathima Regency', rating: 4.8, address: 'Mukarampura, Karimnagar, Telangana 505001', description: 'Popular multi-cuisine restaurant offering Telangana and North Indian dishes.' },
        { name: 'Sitara Family Restaurant', rating: 4.7, address: 'Court Circle, Karimnagar, Telangana 505001', description: 'Family-friendly restaurant serving delicious biryanis and South Indian meals.' },
        { name: 'Spicy Restaurant', rating: 4.6, address: 'Tower Circle, Karimnagar, Telangana 505001', description: 'Casual eatery with a wide range of veg and non-veg options.' },
        { name: 'The Urban Eatery', rating: 4.5, address: 'Civil Hospital Road, Karimnagar, Telangana 505001', description: 'Trendy café-style restaurant serving fast food and beverages.' }
    ],
    hospitals: [
        { name: 'Government Civil Hospital Karimnagar', rating: 4.8, address: 'Civil Hospital Road, Karimnagar, Telangana 505001', description: 'Main government hospital providing 24/7 medical and emergency services.' },
        { name: 'Apollo Reach Hospital', rating: 4.7, address: 'Mukarampura, Karimnagar, Telangana 505001', description: 'Modern private hospital offering specialized care and advanced facilities.' },
        { name: 'Vasan Eye Care', rating: 4.6, address: 'Court Circle, Karimnagar, Telangana 505001', description: 'Specialized eye hospital offering diagnostics, surgery, and optical services.' },
        { name: 'Praveen Hospital', rating: 4.5, address: 'Vavilalapally, Karimnagar, Telangana 505001', description: 'Private hospital providing maternity and general healthcare services.' }
    ],
    touristSpots: [
        { name: 'Lower Manair Dam', rating: 5.0, address: 'Karimnagar, Telangana 505001', description: 'Scenic reservoir popular for boating and picnics with beautiful sunset views.' },
        { name: 'Elgandal Fort', rating: 4.9, address: 'Elgandal, near Karimnagar, Telangana 505002', description: 'Historic fort on the banks of the Manair River offering stunning views.' },
        { name: 'Ujwala Park', rating: 4.8, address: 'Vavilalapally, Karimnagar, Telangana 505001', description: 'Well-maintained park with walking trails, play areas, and fountains.' },
        { name: 'Deer Park', rating: 4.7, address: 'Manair Dam Road, Karimnagar, Telangana 505001', description: 'Family-friendly park with deer enclosures and nature trails.' }
    ]
},
'karimnagar': {
    schools: [
        { name: 'Trinity High School', rating: 4.8, address: 'Mankammathota, Karimnagar, Telangana 505001', description: 'Top English-medium school with strong academics and co-curricular programs.' },
        { name: 'Delhi Public School Karimnagar', rating: 4.7, address: 'Arepally, Karimnagar, Telangana 505001', description: 'CBSE-affiliated school known for modern infrastructure and holistic education.' },
        { name: 'Siddhartha High School', rating: 4.6, address: 'Vavilalapally, Karimnagar, Telangana 505001', description: 'Reputed school offering excellent board results and discipline-oriented teaching.' },
        { name: 'Vivekananda Residential School', rating: 4.5, address: 'Bommakal, Karimnagar, Telangana 505001', description: 'Well-known residential school providing balanced academic and cultural education.' }
    ],
    restaurants: [
        { name: 'Hotel Prathima Regency', rating: 4.8, address: 'Mukarampura, Karimnagar, Telangana 505001', description: 'Popular multi-cuisine restaurant offering Telangana and North Indian dishes.' },
        { name: 'Sitara Family Restaurant', rating: 4.7, address: 'Court Circle, Karimnagar, Telangana 505001', description: 'Family-friendly restaurant serving delicious biryanis and South Indian meals.' },
        { name: 'Spicy Restaurant', rating: 4.6, address: 'Tower Circle, Karimnagar, Telangana 505001', description: 'Casual eatery with a wide range of veg and non-veg options.' },
        { name: 'The Urban Eatery', rating: 4.5, address: 'Civil Hospital Road, Karimnagar, Telangana 505001', description: 'Trendy café-style restaurant serving fast food and beverages.' }
    ],
    hospitals: [
        { name: 'Government Civil Hospital Karimnagar', rating: 4.8, address: 'Civil Hospital Road, Karimnagar, Telangana 505001', description: 'Main government hospital providing 24/7 medical and emergency services.' },
        { name: 'Apollo Reach Hospital', rating: 4.7, address: 'Mukarampura, Karimnagar, Telangana 505001', description: 'Modern private hospital offering specialized care and advanced facilities.' },
        { name: 'Vasan Eye Care', rating: 4.6, address: 'Court Circle, Karimnagar, Telangana 505001', description: 'Specialized eye hospital offering diagnostics, surgery, and optical services.' },
        { name: 'Praveen Hospital', rating: 4.5, address: 'Vavilalapally, Karimnagar, Telangana 505001', description: 'Private hospital providing maternity and general healthcare services.' }
    ],
    touristSpots: [
        { name: 'Lower Manair Dam', rating: 5.0, address: 'Karimnagar, Telangana 505001', description: 'Scenic reservoir popular for boating and picnics with beautiful sunset views.' },
        { name: 'Elgandal Fort', rating: 4.9, address: 'Elgandal, near Karimnagar, Telangana 505002', description: 'Historic fort on the banks of the Manair River offering stunning views.' },
        { name: 'Ujwala Park', rating: 4.8, address: 'Vavilalapally, Karimnagar, Telangana 505001', description: 'Well-maintained park with walking trails, play areas, and fountains.' },
        { name: 'Deer Park', rating: 4.7, address: 'Manair Dam Road, Karimnagar, Telangana 505001', description: 'Family-friendly park with deer enclosures and nature trails.' }
    ]
},
'hyderabad': {
    schools: [
        { name: 'Hyderabad Public School', rating: 4.9, address: 'Begumpet, Hyderabad, Telangana 500016', description: 'Prestigious institution offering ICSE and ISC curriculum with excellent academic and sports facilities.' },
        { name: 'Delhi Public School Hyderabad', rating: 4.8, address: 'Khajaguda, Hyderabad, Telangana 500008', description: 'CBSE-affiliated school known for quality education and extracurricular excellence.' },
        { name: 'Oakridge International School', rating: 4.7, address: 'Gachibowli, Hyderabad, Telangana 500032', description: 'Renowned international school offering IB and CBSE curriculum.' },
        { name: 'Chirec International School', rating: 4.6, address: 'Kondapur, Hyderabad, Telangana 500084', description: 'Top private school with focus on holistic education and innovation.' }
    ],
    restaurants: [
        { name: 'Paradise Biryani', rating: 4.8, address: 'Secunderabad, Hyderabad, Telangana 500003', description: 'Iconic restaurant famous for authentic Hyderabadi biryani and kebabs.' },
        { name: 'Bawarchi Restaurant', rating: 4.7, address: 'RTC Cross Road, Hyderabad, Telangana 500020', description: 'Popular biryani and North Indian cuisine spot loved by locals and tourists.' },
        { name: 'Ohri’s Tansen', rating: 4.6, address: 'Necklace Road, Hyderabad, Telangana 500082', description: 'Fine dining restaurant offering royal Mughlai cuisine and live music.' },
        { name: 'Chutneys', rating: 4.5, address: 'Jubilee Hills, Hyderabad, Telangana 500033', description: 'South Indian vegetarian restaurant known for its signature chutney varieties.' }
    ],
    hospitals: [
        { name: 'Apollo Hospitals', rating: 4.9, address: 'Jubilee Hills, Hyderabad, Telangana 500033', description: 'Leading multi-specialty hospital with advanced facilities and global reputation.' },
        { name: 'Yashoda Hospitals', rating: 4.8, address: 'Somajiguda, Hyderabad, Telangana 500082', description: 'Renowned hospital providing specialized medical services and emergency care.' },
        { name: 'Care Hospitals', rating: 4.7, address: 'Banjara Hills, Hyderabad, Telangana 500034', description: 'Super-specialty hospital offering comprehensive healthcare services.' },
        { name: 'KIMS Hospitals', rating: 4.7, address: 'Begumpet, Hyderabad, Telangana 500016', description: 'Modern hospital known for excellent surgical and diagnostic care.' }
    ],
    touristSpots: [
        { name: 'Charminar', rating: 5.0, address: 'Charminar Rd, Hyderabad, Telangana 500002', description: 'Historic monument and global symbol of Hyderabad built in 1591.' },
        { name: 'Golconda Fort', rating: 4.9, address: 'Khair Complex, Ibrahim Bagh, Hyderabad, Telangana 500008', description: 'Majestic fortress with rich history and panoramic city views.' },
        { name: 'Hussain Sagar Lake', rating: 4.8, address: 'Tank Bund Rd, Hyderabad, Telangana 500029', description: 'Famous heart-shaped lake with boating and the Buddha statue at its center.' },
        { name: 'Ramoji Film City', rating: 4.8, address: 'Abdullahpurmet, Hyderabad, Telangana 501512', description: 'World’s largest film studio complex and a major tourist attraction.' }
    ]
},
'warangal': {
    schools: [
        { name: 'Greenwood High School', rating: 4.8, address: 'Hanamkonda, Warangal, Telangana 506001', description: 'Reputed CBSE school offering excellent academics and co-curricular activities.' },
        { name: 'St. Gabriel’s High School', rating: 4.7, address: 'Kazipet, Warangal, Telangana 506003', description: 'Well-known institution providing quality education with a focus on discipline and values.' },
        { name: 'Kakatiya High School', rating: 4.6, address: 'Subedari, Warangal, Telangana 506001', description: 'Popular school offering both Telugu and English medium education with good results.' },
        { name: 'Delhi Public School Warangal', rating: 4.6, address: 'Kazipet, Warangal, Telangana 506003', description: 'Branch of the DPS chain known for academic excellence and extracurricular programs.' }
    ],
    restaurants: [
        { name: 'The Biryani House', rating: 4.8, address: 'Hanamkonda, Warangal, Telangana 506001', description: 'Famous restaurant serving authentic Hyderabadi biryani and kebabs.' },
        { name: 'Sitara Restaurant', rating: 4.7, address: 'Kazipet, Warangal, Telangana 506003', description: 'Casual dining restaurant known for its North and South Indian dishes.' },
        { name: 'Taste of India', rating: 4.6, address: 'Subedari, Warangal, Telangana 506001', description: 'Popular family restaurant serving multi-cuisine dishes in a cozy setting.' },
        { name: 'Hotel Ashoka', rating: 4.5, address: 'Nakkalagutta, Warangal, Telangana 506001', description: 'Classic hotel restaurant offering traditional Telangana and Andhra meals.' }
    ],
    hospitals: [
        { name: 'MGM Hospital', rating: 4.8, address: 'Subedari, Warangal, Telangana 506001', description: 'Major government hospital providing a wide range of healthcare services.' },
        { name: 'Surya Hospital', rating: 4.7, address: 'Hanamkonda, Warangal, Telangana 506001', description: 'Multi-specialty hospital known for patient care and advanced treatment options.' },
        { name: 'Vasavi Hospital', rating: 4.6, address: 'Kazipet, Warangal, Telangana 506003', description: 'Private hospital offering general and emergency healthcare services.' },
        { name: 'LifeSpring Maternity Hospital', rating: 4.5, address: 'Nakkalagutta, Warangal, Telangana 506001', description: 'Hospital specializing in maternity and women’s health services.' }
    ],
    touristSpots: [
        { name: 'Warangal Fort', rating: 5.0, address: 'Mathwada, Warangal, Telangana 506002', description: 'Historic fort built by the Kakatiya dynasty featuring ancient architecture and gateways.' },
        { name: 'Thousand Pillar Temple', rating: 4.9, address: 'Hanamkonda, Warangal, Telangana 506001', description: 'Magnificent 12th-century temple dedicated to Lord Shiva, Vishnu, and Surya.' },
        { name: 'Bhadrakali Temple', rating: 4.8, address: 'Bhadrakali Hills, Warangal, Telangana 506007', description: 'Famous temple dedicated to Goddess Bhadrakali, situated beside a serene lake.' },
        { name: 'Pakhal Lake', rating: 4.8, address: 'Near Narsampet, Warangal District, Telangana', description: 'Scenic man-made lake surrounded by forest, ideal for picnics and nature walks.' }
    ]
},
'nizamabad': {
    schools: [
        { name: 'St. Paul’s High School', rating: 4.8, address: 'Yellammagutta, Nizamabad, Telangana 503001', description: 'Top English-medium school known for academic excellence and cultural programs.' },
        { name: 'Kakatiya High School', rating: 4.7, address: 'Bodhan Road, Nizamabad, Telangana 503001', description: 'Reputed institution providing strong academic foundation and co-curricular activities.' },
        { name: 'Delhi Public School Nizamabad', rating: 4.6, address: 'Dichpally, Nizamabad, Telangana 503175', description: 'Modern CBSE-affiliated school offering holistic education and advanced facilities.' },
        { name: 'Trinity High School', rating: 4.5, address: 'Armoor Road, Nizamabad, Telangana 503002', description: 'Popular private school emphasizing academics, discipline, and values.' }
    ],
    restaurants: [
        { name: 'Hotel Haritha', rating: 4.7, address: 'Yellammagutta, Nizamabad, Telangana 503001', description: 'Tourism-run restaurant offering authentic Telangana dishes in a clean setting.' },
        { name: 'Swagath Restaurant', rating: 4.6, address: 'Bodhan Road, Nizamabad, Telangana 503001', description: 'Casual dining restaurant known for biryani, tandoori, and South Indian food.' },
        { name: 'Spicy Bite Family Restaurant', rating: 4.5, address: 'Subhash Road, Nizamabad, Telangana 503001', description: 'Family restaurant serving North Indian and Chinese cuisine.' },
        { name: 'Foodie’s Junction', rating: 4.4, address: 'Bus Stand Road, Nizamabad, Telangana 503001', description: 'Trendy eatery with snacks, fast food, and beverages popular among youth.' }
    ],
    hospitals: [
        { name: 'Government General Hospital Nizamabad', rating: 4.8, address: 'Yellammagutta, Nizamabad, Telangana 503001', description: 'Main government hospital providing emergency and specialized care.' },
        { name: 'SRR Hospital', rating: 4.6, address: 'Subhash Road, Nizamabad, Telangana 503001', description: 'Private multi-specialty hospital with good diagnostics and patient service.' },
        { name: 'Care Hospital Nizamabad', rating: 4.6, address: 'Bodhan Road, Nizamabad, Telangana 503001', description: 'Renowned private hospital offering modern treatment facilities.' },
        { name: 'Jyothi Hospital', rating: 4.5, address: 'Armoor Road, Nizamabad, Telangana 503002', description: 'Well-known hospital providing maternity and general health services.' }
    ],
    touristSpots: [
        { name: 'Nizamabad Fort', rating: 5.0, address: 'Quilla Road, Nizamabad, Telangana 503001', description: 'Historical fort offering panoramic views of the city, built by Rashtrakuta kings.' },
        { name: 'Alisagar Reservoir', rating: 4.8, address: 'Alisagar, near Nizamabad, Telangana', description: 'Beautiful lake and park ideal for boating and picnics.' },
        { name: 'Dichpally Ramalayam', rating: 4.8, address: 'Dichpally, Nizamabad, Telangana 503175', description: 'Ancient temple known as the "Khajuraho of Nizamabad" for its carvings.' },
        { name: 'Pocharam Wildlife Sanctuary', rating: 4.7, address: 'Pocharam, Nizamabad District, Telangana', description: 'Nature reserve known for migratory birds, deer, and serene landscapes.' }
    ]
},
'karimnagar': {
    schools: [
        { name: 'Trinity High School', rating: 4.8, address: 'Mankammathota, Karimnagar, Telangana 505001', description: 'Top English-medium school with strong academics and co-curricular programs.' },
        { name: 'Delhi Public School Karimnagar', rating: 4.7, address: 'Arepally, Karimnagar, Telangana 505001', description: 'CBSE-affiliated school known for modern infrastructure and holistic education.' },
        { name: 'Siddhartha High School', rating: 4.6, address: 'Vavilalapally, Karimnagar, Telangana 505001', description: 'Reputed school offering excellent board results and discipline-oriented teaching.' },
        { name: 'Vivekananda Residential School', rating: 4.5, address: 'Bommakal, Karimnagar, Telangana 505001', description: 'Well-known residential school providing balanced academic and cultural education.' }
    ],
    restaurants: [
        { name: 'Hotel Prathima Regency', rating: 4.8, address: 'Mukarampura, Karimnagar, Telangana 505001', description: 'Popular multi-cuisine restaurant offering Telangana and North Indian dishes.' },
        { name: 'Sitara Family Restaurant', rating: 4.7, address: 'Court Circle, Karimnagar, Telangana 505001', description: 'Family-friendly restaurant serving delicious biryanis and South Indian meals.' },
        { name: 'Spicy Restaurant', rating: 4.6, address: 'Tower Circle, Karimnagar, Telangana 505001', description: 'Casual eatery with a wide range of veg and non-veg options.' },
        { name: 'The Urban Eatery', rating: 4.5, address: 'Civil Hospital Road, Karimnagar, Telangana 505001', description: 'Trendy café-style restaurant serving fast food and beverages.' }
    ],
    hospitals: [
        { name: 'Government Civil Hospital Karimnagar', rating: 4.8, address: 'Civil Hospital Road, Karimnagar, Telangana 505001', description: 'Main government hospital providing 24/7 medical and emergency services.' },
        { name: 'Apollo Reach Hospital', rating: 4.7, address: 'Mukarampura, Karimnagar, Telangana 505001', description: 'Modern private hospital offering specialized care and advanced facilities.' },
        { name: 'Vasan Eye Care', rating: 4.6, address: 'Court Circle, Karimnagar, Telangana 505001', description: 'Specialized eye hospital offering diagnostics, surgery, and optical services.' },
        { name: 'Praveen Hospital', rating: 4.5, address: 'Vavilalapally, Karimnagar, Telangana 505001', description: 'Private hospital providing maternity and general healthcare services.' }
    ],
    touristSpots: [
        { name: 'Lower Manair Dam', rating: 5.0, address: 'Karimnagar, Telangana 505001', description: 'Scenic reservoir popular for boating and picnics with beautiful sunset views.' },
        { name: 'Elgandal Fort', rating: 4.9, address: 'Elgandal, near Karimnagar, Telangana 505002', description: 'Historic fort on the banks of the Manair River offering stunning views.' },
        { name: 'Ujwala Park', rating: 4.8, address: 'Vavilalapally, Karimnagar, Telangana 505001', description: 'Well-maintained park with walking trails, play areas, and fountains.' },
        { name: 'Deer Park', rating: 4.7, address: 'Manair Dam Road, Karimnagar, Telangana 505001', description: 'Family-friendly park with deer enclosures and nature trails.' }
    ]
},
'khammam': {
    schools: [
        { name: 'St. Joseph’s High School', rating: 4.8, address: 'Wyra Road, Khammam, Telangana 507002', description: 'Top English-medium school offering quality education with focus on discipline and values.' },
        { name: 'Narayana Concept School', rating: 4.7, address: 'Nizampet, Khammam, Telangana 507001', description: 'Reputed school focusing on academics and competitive exam preparation.' },
        { name: 'Trinity Public School', rating: 4.6, address: 'Bonakal Road, Khammam, Telangana 507002', description: 'CBSE school providing holistic education and co-curricular activities.' },
        { name: 'Delhi Public School Khammam', rating: 4.6, address: 'Ballepalli, Khammam, Telangana 507002', description: 'CBSE-affiliated school known for excellent teaching standards and infrastructure.' }
    ],
    restaurants: [
        { name: 'Spicy Hut Family Restaurant', rating: 4.8, address: 'Wyra Road, Khammam, Telangana 507002', description: 'Popular family restaurant serving biryanis, Chinese, and North Indian food.' },
        { name: 'Hotel Grand Gayathri', rating: 4.7, address: 'Bus Stand Road, Khammam, Telangana 507001', description: 'Fine dining restaurant offering traditional South Indian meals and thalis.' },
        { name: 'Sitara Restaurant', rating: 4.6, address: 'Nehru Nagar, Khammam, Telangana 507002', description: 'Multi-cuisine restaurant known for its biryanis and vegetarian dishes.' },
        { name: 'Green Leaf Restaurant', rating: 4.5, address: 'Wyra Road, Khammam, Telangana 507002', description: 'Vegetarian restaurant serving Telangana and Andhra-style meals.' }
    ],
    hospitals: [
        { name: 'Mamatha General Hospital', rating: 4.8, address: 'MGM Road, Khammam, Telangana 507002', description: 'Reputed teaching hospital offering a wide range of medical services.' },
        { name: 'Siddhartha Hospital', rating: 4.7, address: 'Wyra Road, Khammam, Telangana 507002', description: 'Private hospital with specialized departments and advanced facilities.' },
        { name: 'Apollo Reach Hospital Khammam', rating: 4.7, address: 'Balaji Nagar, Khammam, Telangana 507001', description: 'Well-known hospital providing comprehensive healthcare services.' },
        { name: 'Red Cross Hospital', rating: 4.5, address: 'Bus Stand Road, Khammam, Telangana 507001', description: 'Hospital known for general treatment, blood donation, and medical camps.' }
    ],
    touristSpots: [
        { name: 'Khammam Fort', rating: 5.0, address: 'Fort Hill, Khammam, Telangana 507001', description: 'Historic fort built on a granite hill, offering panoramic city views.' },
        { name: 'Lakaram Lake', rating: 4.9, address: 'Nehru Nagar, Khammam, Telangana 507002', description: 'Beautiful lake with boating, children’s park, and an evening light show.' },
        { name: 'Kinnerasani Wildlife Sanctuary', rating: 4.8, address: 'Palvoncha, near Khammam, Telangana 507115', description: 'Wildlife reserve known for its scenic lake and diverse flora and fauna.' },
        { name: 'Perantalapalli', rating: 4.7, address: 'Near Bhadrachalam, Khammam District, Telangana', description: 'Scenic riverside village known for its serene surroundings and temples.' }
    ]
},
'mancherial': {
    schools: [
        { name: 'Sri Chaitanya School', rating: 4.8, address: 'Bellampalli Road, Mancherial, Telangana 504208', description: 'Renowned school known for excellent academic performance and competitive exam training.' },
        { name: 'Kakatiya High School', rating: 4.7, address: 'Ramagundam Road, Mancherial, Telangana 504208', description: 'Popular school offering quality education with co-curricular development.' },
        { name: 'Akshara High School', rating: 4.6, address: 'Thallapet Road, Mancherial, Telangana 504208', description: 'Private school focusing on both academics and extracurricular activities.' },
        { name: 'Vivekananda High School', rating: 4.5, address: 'Bus Stand Road, Mancherial, Telangana 504208', description: 'English-medium school emphasizing discipline, values, and education.' }
    ],
    restaurants: [
        { name: 'Spicy Family Restaurant', rating: 4.7, address: 'Bellampalli Chowrasta, Mancherial, Telangana 504208', description: 'Family-friendly restaurant serving biryanis, curries, and Chinese dishes.' },
        { name: 'Hotel Surya', rating: 4.6, address: 'Mancherial Main Road, Telangana 504208', description: 'Popular spot for authentic South Indian and North Indian cuisine.' },
        { name: 'Food Plaza', rating: 4.5, address: 'Bus Stand Area, Mancherial, Telangana 504208', description: 'Modern restaurant known for fast food, snacks, and family dining.' },
        { name: 'New Paradise Restaurant', rating: 4.4, address: 'Ramagundam Road, Mancherial, Telangana 504208', description: 'Casual dining spot famous for biryani and Indian-Chinese dishes.' }
    ],
    hospitals: [
        { name: 'Government Area Hospital Mancherial', rating: 4.8, address: 'Ramagundam Road, Mancherial, Telangana 504208', description: 'Main government hospital providing general and emergency healthcare services.' },
        { name: 'Sri Srinivasa Hospital', rating: 4.6, address: 'Bellampalli Road, Mancherial, Telangana 504208', description: 'Private hospital offering general medicine, surgery, and maternity care.' },
        { name: 'Suraksha Hospital', rating: 4.6, address: 'Bus Stand Road, Mancherial, Telangana 504208', description: 'Multi-specialty hospital known for patient care and modern diagnostics.' },
        { name: 'Life Care Hospital', rating: 4.5, address: 'Thallapet Road, Mancherial, Telangana 504208', description: 'Well-equipped hospital providing quality healthcare facilities.' }
    ],
    touristSpots: [
        { name: 'Kadam Dam', rating: 4.9, address: 'Near Mancherial, Telangana 504208', description: 'Scenic dam surrounded by hills, popular for boating and picnics.' },
        { name: 'Pranahita Wildlife Sanctuary', rating: 4.8, address: 'Near Mancherial, Telangana', description: 'Wildlife sanctuary along the Pranahita River known for lush forests and birdlife.' },
        { name: 'Vempalli Waterfalls', rating: 4.7, address: 'Vempalli Village, near Mancherial, Telangana', description: 'Beautiful natural waterfall located amid greenery and rocks.' },
        { name: 'Komaram Bheem Park', rating: 4.6, address: 'Mancherial Town, Telangana 504208', description: 'Urban park dedicated to the tribal freedom fighter Komaram Bheem.' }
    ]
},
'mahabubnagar': {
    schools: [
        { name: 'Kendriya Vidyalaya Mahabubnagar', rating: 4.8, address: 'Mettugadda, Mahabubnagar, Telangana 509001', description: 'Central government school offering CBSE curriculum and all-round development.' },
        { name: 'St. Alphonsa’s High School', rating: 4.7, address: 'Raja Reddy Street, Mahabubnagar, Telangana 509001', description: 'Well-known English-medium school focusing on academics and moral education.' },
        { name: 'Narayana e-Techno School', rating: 4.6, address: 'Divitipally, Mahabubnagar, Telangana 509001', description: 'Modern school combining classroom learning with competitive exam training.' },
        { name: 'Trinity High School', rating: 4.5, address: 'New Town, Mahabubnagar, Telangana 509001', description: 'Private institution offering quality education and extracurricular opportunities.' }
    ],
    restaurants: [
        { name: 'Hotel Mayuri Family Restaurant', rating: 4.8, address: 'Raichur Road, Mahabubnagar, Telangana 509001', description: 'Popular restaurant serving Telangana meals and authentic biryanis.' },
        { name: 'Blue Fox Restaurant', rating: 4.7, address: 'New Town, Mahabubnagar, Telangana 509001', description: 'Casual dining restaurant offering multi-cuisine dishes in a cozy setting.' },
        { name: 'Spicy Hub', rating: 4.6, address: 'Mettugadda, Mahabubnagar, Telangana 509001', description: 'Famous for South Indian, Chinese, and tandoori dishes.' },
        { name: 'Green Park Restaurant', rating: 4.5, address: 'Mahabubnagar Bus Stand Road, Telangana 509001', description: 'Family-friendly restaurant offering vegetarian meals and snacks.' }
    ],
    hospitals: [
        { name: 'Government General Hospital Mahabubnagar', rating: 4.8, address: 'Mettugadda, Mahabubnagar, Telangana 509001', description: 'Main government hospital offering 24-hour emergency and specialized care.' },
        { name: 'Apollo Reach Hospital Mahabubnagar', rating: 4.7, address: 'Divitipally, Mahabubnagar, Telangana 509001', description: 'Private hospital with advanced medical facilities and professional care.' },
        { name: 'Sri Sai Hospital', rating: 4.6, address: 'New Town, Mahabubnagar, Telangana 509001', description: 'Multi-specialty hospital providing general, maternity, and surgical services.' },
        { name: 'Ravindra Hospital', rating: 4.5, address: 'Mettugadda, Mahabubnagar, Telangana 509001', description: 'Trusted local hospital known for patient care and general medicine.' }
    ],
    touristSpots: [
        { name: 'Koilsagar Dam', rating: 4.9, address: 'Koilsagar, Mahabubnagar District, Telangana', description: 'Scenic dam surrounded by hills, ideal for boating and picnics.' },
        { name: 'Pillalamarri Banyan Tree', rating: 4.8, address: 'Mahabubnagar, Telangana 509001', description: 'Famous 800-year-old banyan tree covering over three acres.' },
        { name: 'Jurala Dam', rating: 4.7, address: 'Near Gadwal, Mahabubnagar District, Telangana', description: 'Large hydroelectric dam on River Krishna, popular for its scenic beauty.' },
        { name: 'Umamaheshwaram Temple', rating: 4.7, address: 'Achampet, Mahabubnagar District, Telangana', description: 'Ancient Shiva temple located in the Nallamala forest, known as the northern gateway to Srisailam.' }
    ]
},
'ramagundam': {
    schools: [
        { name: 'Kendriya Vidyalaya Ramagundam', rating: 4.8, address: 'NTPC Township, Ramagundam, Telangana 505208', description: 'CBSE-affiliated school providing excellent academic and co-curricular education.' },
        { name: 'DAV Public School Ramagundam', rating: 4.7, address: 'NTPC Township, Ramagundam, Telangana 505208', description: 'Renowned school offering quality education and holistic development.' },
        { name: 'St. Paul’s High School', rating: 4.6, address: 'Godavarikhani, Ramagundam, Telangana 505209', description: 'Private English-medium school focusing on discipline and academic excellence.' },
        { name: 'Narayana e-Techno School', rating: 4.5, address: 'Godavarikhani, Ramagundam, Telangana 505209', description: 'Modern educational institute integrating school and competitive exam coaching.' }
    ],
    restaurants: [
        { name: 'Spice Garden Family Restaurant', rating: 4.8, address: 'Godavarikhani Main Road, Ramagundam, Telangana 505209', description: 'Popular family restaurant serving Indian and Chinese dishes.' },
        { name: 'Hotel Suprabha', rating: 4.7, address: 'NTPC Township, Ramagundam, Telangana 505208', description: 'Well-known restaurant offering vegetarian and non-vegetarian cuisines.' },
        { name: 'Royal Treat Multicuisine Restaurant', rating: 4.6, address: 'Godavarikhani, Ramagundam, Telangana 505209', description: 'Trendy dining place serving biryani, tandoori, and continental dishes.' },
        { name: 'Annapurna Mess & Tiffins', rating: 4.5, address: 'Market Road, Ramagundam, Telangana 505208', description: 'Local favorite for South Indian meals and tiffins.' }
    ],
    hospitals: [
        { name: 'NTPC Hospital Ramagundam', rating: 4.8, address: 'NTPC Township, Ramagundam, Telangana 505208', description: 'Fully equipped hospital catering to NTPC employees and the public.' },
        { name: 'Godavarikhani Area Hospital', rating: 4.7, address: 'Godavarikhani, Ramagundam, Telangana 505209', description: 'Government hospital offering multi-specialty and emergency services.' },
        { name: 'Sunshine Multi Speciality Hospital', rating: 4.6, address: 'Godavarikhani, Ramagundam, Telangana 505209', description: 'Private hospital with advanced medical facilities and diagnostics.' },
        { name: 'Sri Laxmi Nursing Home', rating: 4.5, address: 'Ramagundam Main Road, Telangana 505208', description: 'Trusted healthcare center providing maternity and general medical services.' }
    ],
    touristSpots: [
        { name: 'Ramagundam Dam', rating: 4.9, address: 'Ramagundam, Telangana 505208', description: 'Massive dam on River Godavari offering scenic views and boating options.' },
        { name: 'Godavarikhani Coal Mines', rating: 4.7, address: 'Ramagundam, Telangana 505209', description: 'Industrial tourism site showcasing the coal mining operations of SCCL.' },
        { name: 'Sri Venkateswara Swamy Temple', rating: 4.7, address: 'NTPC Township, Ramagundam, Telangana 505208', description: 'Popular temple known for its architecture and peaceful surroundings.' },
        { name: 'Ramagundam Thermal Power Station Viewpoint', rating: 4.6, address: 'NTPC Area, Ramagundam, Telangana 505208', description: 'Scenic viewpoint to observe the iconic thermal power plant.' }
    ]
},
'nizamabad': {
    schools: [
        { name: 'Kendriya Vidyalaya Nizamabad', rating: 4.8, address: 'Armur Road, Nizamabad, Telangana 503001', description: 'CBSE-affiliated government school known for discipline and holistic education.' },
        { name: 'St. Joseph’s High School', rating: 4.7, address: 'Yellammagutta, Nizamabad, Telangana 503001', description: 'Reputed English-medium school providing strong academics and moral values.' },
        { name: 'Narayana Olympiad School', rating: 4.6, address: 'Vinayak Nagar, Nizamabad, Telangana 503002', description: 'Modern institution combining school education with competitive exam training.' },
        { name: 'Delhi Public School Nizamabad', rating: 4.5, address: 'Dichpally, Nizamabad, Telangana 503001', description: 'Well-known CBSE school offering advanced facilities and all-round development.' }
    ],
    restaurants: [
        { name: 'Mayuri Family Restaurant', rating: 4.8, address: 'Hyderabad Road, Nizamabad, Telangana 503001', description: 'Popular dining spot offering Telangana, North Indian, and Chinese dishes.' },
        { name: 'Blue Sea Family Restaurant', rating: 4.7, address: 'Yellammagutta, Nizamabad, Telangana 503001', description: 'Multi-cuisine restaurant with a cozy ambiance and great service.' },
        { name: 'Kritunga Restaurant', rating: 4.6, address: 'Vinayak Nagar, Nizamabad, Telangana 503002', description: 'Famous for authentic Telangana cuisine and spicy Andhra meals.' },
        { name: 'Food Park Restaurant', rating: 4.5, address: 'Near Bus Stand, Nizamabad, Telangana 503001', description: 'Family-friendly restaurant offering vegetarian and non-vegetarian options.' }
    ],
    hospitals: [
        { name: 'Government General Hospital Nizamabad', rating: 4.8, address: 'Khaleelwadi, Nizamabad, Telangana 503001', description: 'Main government hospital with 24/7 emergency and specialized care.' },
        { name: 'Sigma Hospital', rating: 4.7, address: 'Yellammagutta, Nizamabad, Telangana 503001', description: 'Private multi-specialty hospital known for quality medical treatment.' },
        { name: 'Care Hospital Nizamabad', rating: 4.6, address: 'Vinayak Nagar, Nizamabad, Telangana 503002', description: 'Modern healthcare center offering surgical and diagnostic services.' },
        { name: 'Arogya Hospital', rating: 4.5, address: 'Dichpally, Nizamabad, Telangana 503001', description: 'Trusted hospital providing maternity and general healthcare services.' }
    ],
    touristSpots: [
        { name: 'Nizamabad Fort', rating: 4.9, address: 'Nizamabad, Telangana 503001', description: 'Historical fort built by Rashtrakutas, offering panoramic views of the city.' },
        { name: 'Alisagar Reservoir', rating: 4.8, address: 'Alisagar, Nizamabad District, Telangana', description: 'Beautiful lake and garden area, ideal for picnics and boating.' },
        { name: 'Dichpally Ramalayam Temple', rating: 4.7, address: 'Dichpally, Nizamabad, Telangana 503001', description: 'Ancient temple known as Indur Khajuraho, famous for its carvings.' },
        { name: 'Pocharam Wildlife Sanctuary', rating: 4.6, address: 'Pocharam, near Nizamabad, Telangana', description: 'Scenic sanctuary home to deer, birds, and lush greenery.' }
    ]
},
'karimnagar': {
    schools: [
        { name: 'Kendriya Vidyalaya Karimnagar', rating: 4.8, address: 'Rekaralla Palli, Karimnagar, Telangana 505001', description: 'Central government CBSE school offering quality education and extracurricular activities.' },
        { name: 'Geetha High School', rating: 4.7, address: 'Vavilalapally, Karimnagar, Telangana 505001', description: 'Reputed English-medium school focusing on discipline and academics.' },
        { name: 'Trinity High School', rating: 4.6, address: 'Choppadandi Road, Karimnagar, Telangana 505001', description: 'Private school providing holistic learning with modern facilities.' },
        { name: 'Narayana e-Techno School', rating: 4.5, address: 'Mankammathota, Karimnagar, Telangana 505001', description: 'Educational institute known for blending school education with competitive exam preparation.' }
    ],
    restaurants: [
        { name: 'Sitara Family Restaurant', rating: 4.8, address: 'Manair Road, Karimnagar, Telangana 505001', description: 'Popular family restaurant offering Telangana thalis and biryanis.' },
        { name: 'Swathi Family Restaurant', rating: 4.7, address: 'Vavilalapally, Karimnagar, Telangana 505001', description: 'Multi-cuisine dining place known for delicious vegetarian and non-vegetarian dishes.' },
        { name: 'Hotel V Grand', rating: 4.6, address: 'Bus Stand Road, Karimnagar, Telangana 505001', description: 'Modern restaurant serving Indian, Chinese, and continental food.' },
        { name: 'Bawarchi Restaurant', rating: 4.5, address: 'Thirumala Nagar, Karimnagar, Telangana 505001', description: 'Famous for its spicy biryanis and Andhra-style dishes.' }
    ],
    hospitals: [
        { name: 'Government Civil Hospital Karimnagar', rating: 4.8, address: 'Mankammathota, Karimnagar, Telangana 505001', description: 'Main government hospital offering emergency, maternity, and specialized healthcare services.' },
        { name: 'Maxcare Hospital', rating: 4.7, address: 'Vavilalapally, Karimnagar, Telangana 505001', description: 'Private multi-specialty hospital with modern facilities and expert doctors.' },
        { name: 'Lotus Hospital', rating: 4.6, address: 'Thirumala Nagar, Karimnagar, Telangana 505001', description: 'Popular healthcare center providing surgical and diagnostic services.' },
        { name: 'Apollo Reach Hospital Karimnagar', rating: 4.5, address: 'Manair Road, Karimnagar, Telangana 505001', description: 'Well-equipped hospital known for advanced treatment and patient care.' }
    ],
    touristSpots: [
        { name: 'Lower Manair Dam', rating: 4.9, address: 'Karimnagar, Telangana 505001', description: 'Scenic dam offering boating, sunset views, and a popular picnic area.' },
        { name: 'Elgandal Fort', rating: 4.8, address: 'Elgandal, Karimnagar, Telangana 505001', description: 'Historic fort located on the banks of River Manair with stunning views.' },
        { name: 'Ujwala Park', rating: 4.7, address: 'Manair Road, Karimnagar, Telangana 505001', description: 'Beautiful park ideal for evening walks and family outings.' },
        { name: 'Deer Park Karimnagar', rating: 4.6, address: 'Near Lower Manair Dam, Karimnagar, Telangana', description: 'Mini wildlife park home to deer and peacocks, perfect for kids and nature lovers.' }
    ]
},
'khammam': {
    schools: [
        { name: 'Kendriya Vidyalaya Khammam', rating: 4.8, address: 'Yellandu Cross Road, Khammam, Telangana 507002', description: 'Prestigious CBSE school providing quality education and extracurricular programs.' },
        { name: 'St. Joseph’s High School', rating: 4.7, address: 'Nehru Nagar, Khammam, Telangana 507001', description: 'Renowned English-medium institution with focus on discipline and academics.' },
        { name: 'Narayana e-Techno School', rating: 4.6, address: 'Wyra Road, Khammam, Telangana 507002', description: 'Modern educational institute blending school education with competitive exam coaching.' },
        { name: 'Geethanjali High School', rating: 4.5, address: 'Mamata Nagar, Khammam, Telangana 507002', description: 'Private school emphasizing holistic learning and character development.' }
    ],
    restaurants: [
        { name: 'Sitara Family Restaurant', rating: 4.8, address: 'Wyra Road, Khammam, Telangana 507002', description: 'Popular multi-cuisine restaurant known for biryanis and authentic Telangana meals.' },
        { name: 'Sri Balaji Family Restaurant', rating: 4.7, address: 'Bus Stand Road, Khammam, Telangana 507001', description: 'Casual dining restaurant offering vegetarian and non-vegetarian dishes.' },
        { name: 'Spicy Hut Restaurant', rating: 4.6, address: 'Wyra Road, Khammam, Telangana 507002', description: 'Trendy spot serving Chinese, North Indian, and tandoori items.' },
        { name: 'Hotel Sri Krishna Grand', rating: 4.5, address: 'Mamata Nagar, Khammam, Telangana 507002', description: 'Family-friendly restaurant offering delicious South Indian cuisine.' }
    ],
    hospitals: [
        { name: 'Mamata General Hospital', rating: 4.8, address: 'Mamata Nagar, Khammam, Telangana 507002', description: 'Renowned hospital attached to a medical college, providing advanced healthcare.' },
        { name: 'Government District Hospital Khammam', rating: 4.7, address: 'Nehru Nagar, Khammam, Telangana 507001', description: 'Main government hospital offering general, emergency, and maternity services.' },
        { name: 'Apollo Reach Hospital Khammam', rating: 4.6, address: 'Wyra Road, Khammam, Telangana 507002', description: 'Multi-specialty private hospital with modern facilities and expert doctors.' },
        { name: 'Prashanth Hospital', rating: 4.5, address: 'Bus Stand Road, Khammam, Telangana 507001', description: 'Well-known healthcare center providing specialized and emergency services.' }
    ],
    touristSpots: [
        { name: 'Khammam Fort', rating: 4.9, address: 'Fort Area, Khammam, Telangana 507001', description: 'Historical fort built on a hill offering panoramic views of the city.' },
        { name: 'Lakaram Lake', rating: 4.8, address: 'Wyra Road, Khammam, Telangana 507002', description: 'Beautiful lake with boating and a well-developed park for recreation.' },
        { name: 'Kinnerasani Wildlife Sanctuary', rating: 4.7, address: 'Palvoncha, near Khammam, Telangana', description: 'Nature sanctuary known for its wildlife, lake, and scenic landscapes.' },
        { name: 'Nelakondapalli', rating: 4.6, address: 'Khammam District, Telangana', description: 'Archaeological site with Buddhist stupas and ancient relics.' }
    ]
},
'mancherial': {
    schools: [
        { name: 'Kendriya Vidyalaya Mancherial', rating: 4.8, address: 'Coal Township, Mancherial, Telangana 504208', description: 'CBSE-affiliated central school known for strong academics and co-curricular programs.' },
        { name: 'St. Paul’s High School', rating: 4.7, address: 'Coal Mine Area, Mancherial, Telangana 504208', description: 'Reputed English-medium school focusing on discipline and quality education.' },
        { name: 'Narayana e-Techno School', rating: 4.6, address: 'Bellampalli Road, Mancherial, Telangana 504208', description: 'Integrated school offering advanced academic training and competitive exam prep.' },
        { name: 'Vikas Concept School', rating: 4.5, address: 'Thallapet Road, Mancherial, Telangana 504208', description: 'Private institution offering innovative learning and extracurricular activities.' }
    ],
    restaurants: [
        { name: 'Spicy Village Family Restaurant', rating: 4.8, address: 'Bellampalli Road, Mancherial, Telangana 504208', description: 'Famous family restaurant offering Telangana and North Indian cuisine.' },
        { name: 'Hotel Mayuri', rating: 4.7, address: 'Coal Township, Mancherial, Telangana 504208', description: 'Popular dining spot serving vegetarian and non-vegetarian dishes in a family-friendly ambiance.' },
        { name: 'Blue Moon Restaurant', rating: 4.6, address: 'Main Road, Mancherial, Telangana 504208', description: 'Modern restaurant known for biryanis and tandoori delicacies.' },
        { name: 'Food Junction', rating: 4.5, address: 'Market Area, Mancherial, Telangana 504208', description: 'Casual eatery serving Chinese, fast food, and South Indian meals.' }
    ],
    hospitals: [
        { name: 'Government Area Hospital Mancherial', rating: 4.8, address: 'Coal Mine Area, Mancherial, Telangana 504208', description: 'Main government hospital providing 24/7 emergency and general healthcare services.' },
        { name: 'Crescent Hospital', rating: 4.7, address: 'Bellampalli Road, Mancherial, Telangana 504208', description: 'Private multi-specialty hospital offering maternity, surgical, and diagnostic care.' },
        { name: 'Medicare Hospital', rating: 4.6, address: 'Thallapet Road, Mancherial, Telangana 504208', description: 'Modern healthcare center with experienced specialists and patient-friendly facilities.' },
        { name: 'Shanthi Nursing Home', rating: 4.5, address: 'Market Road, Mancherial, Telangana 504208', description: 'Trusted local hospital providing general and maternity care services.' }
    ],
    touristSpots: [
        { name: 'Kawal Wildlife Sanctuary', rating: 4.9, address: 'Near Jannaram, Mancherial District, Telangana', description: 'Large wildlife sanctuary known for tigers, deer, and lush greenery.' },
        { name: 'Sri Satyanarayana Swamy Temple', rating: 4.8, address: 'Mancherial, Telangana 504208', description: 'Popular temple dedicated to Lord Vishnu, known for its peaceful atmosphere.' },
        { name: 'Godavari River Viewpoint', rating: 4.7, address: 'Near Mancherial, Telangana 504208', description: 'Beautiful riverside spot perfect for evening relaxation and nature photography.' },
        { name: 'Kadam Dam', rating: 4.6, address: 'Kadam, near Mancherial, Telangana', description: 'Scenic reservoir offering boating, scenic drives, and serene views.' }
    ]
},
'nalgonda': {
    schools: [
        { name: 'Kendriya Vidyalaya Nalgonda', rating: 4.8, address: 'Cherlapally, Nalgonda, Telangana 508001', description: 'CBSE-affiliated central school offering quality academics and extracurricular excellence.' },
        { name: 'St. Alphonsa’s High School', rating: 4.7, address: 'Clock Tower Road, Nalgonda, Telangana 508001', description: 'Reputed English-medium school focusing on academics and moral education.' },
        { name: 'Narayana e-Techno School', rating: 4.6, address: 'Miryalguda Road, Nalgonda, Telangana 508001', description: 'Integrated institution combining school education with competitive exam training.' },
        { name: 'Krishnaveni Talent School', rating: 4.5, address: 'Devarakonda Road, Nalgonda, Telangana 508001', description: 'Private school emphasizing conceptual learning and co-curricular activities.' }
    ],
    restaurants: [
        { name: 'Hotel Vivera', rating: 4.8, address: 'NH65, Nalgonda, Telangana 508001', description: 'Famous multi-cuisine restaurant offering South Indian, North Indian, and Chinese food.' },
        { name: 'Sri Sai Family Restaurant', rating: 4.7, address: 'Clock Tower Road, Nalgonda, Telangana 508001', description: 'Popular family restaurant serving Telangana-style meals and biryani.' },
        { name: 'Blue Sky Restaurant', rating: 4.6, address: 'Miryalguda Road, Nalgonda, Telangana 508001', description: 'Modern eatery known for tandoori and Chinese delicacies.' },
        { name: 'Spice Junction', rating: 4.5, address: 'Bus Stand Area, Nalgonda, Telangana 508001', description: 'Casual dining restaurant offering vegetarian and non-vegetarian options.' }
    ],
    hospitals: [
        { name: 'Government General Hospital Nalgonda', rating: 4.8, address: 'Cherlapally, Nalgonda, Telangana 508001', description: 'Main government hospital providing 24-hour emergency and specialized services.' },
        { name: 'Susruta Hospital', rating: 4.7, address: 'Clock Tower Road, Nalgonda, Telangana 508001', description: 'Private multi-specialty hospital known for surgical and maternity care.' },
        { name: 'Sai Krishna Hospital', rating: 4.6, address: 'Devarakonda Road, Nalgonda, Telangana 508001', description: 'Healthcare facility providing general medicine and diagnostic services.' },
        { name: 'Pragna Hospital', rating: 4.5, address: 'Bus Stand Road, Nalgonda, Telangana 508001', description: 'Popular hospital with experienced doctors and modern facilities.' }
    ],
    touristSpots: [
        { name: 'Nagarjuna Sagar Dam', rating: 4.9, address: 'Near Nalgonda, Telangana 508001', description: 'One of the largest dams in India, known for its scenic beauty and boating.' },
        { name: 'Yadagiri Gutta Temple', rating: 4.8, address: 'Yadadri, Nalgonda District, Telangana', description: 'Famous temple dedicated to Lord Lakshmi Narasimha, a major pilgrimage site.' },
        { name: 'Ethipothala Waterfall', rating: 4.7, address: 'Near Nagarjuna Sagar, Nalgonda District, Telangana', description: 'Beautiful waterfall surrounded by lush greenery, popular for sightseeing.' },
        { name: 'Bhongir Fort', rating: 4.6, address: 'Bhongir, Nalgonda District, Telangana', description: 'Historical hill fort offering panoramic views and trekking opportunities.' }
    ]
},
'adilabad': {
    schools: [
        { name: 'Kendriya Vidyalaya Adilabad', rating: 4.8, address: 'Utnoor Road, Adilabad, Telangana 504001', description: 'CBSE-affiliated government school offering quality education and extracurricular opportunities.' },
        { name: 'St. Joseph’s High School', rating: 4.7, address: 'Shantinagar, Adilabad, Telangana 504001', description: 'Renowned English-medium school with strong academic results and disciplined environment.' },
        { name: 'Narayana e-Techno School', rating: 4.6, address: 'Ichoda Road, Adilabad, Telangana 504001', description: 'Integrated school providing both academics and competitive exam training.' },
        { name: 'Krishnaveni Talent School', rating: 4.5, address: 'Neradigonda Road, Adilabad, Telangana 504001', description: 'Private school focusing on concept-based learning and holistic education.' }
    ],
    restaurants: [
        { name: 'Hotel Vihanga', rating: 4.8, address: 'Bus Stand Road, Adilabad, Telangana 504001', description: 'Famous family restaurant offering Telangana, Chinese, and tandoori cuisine.' },
        { name: 'Spicy House Restaurant', rating: 4.7, address: 'Utnoor Road, Adilabad, Telangana 504001', description: 'Popular dining place serving delicious biryanis and South Indian dishes.' },
        { name: 'Royal Treat Family Restaurant', rating: 4.6, address: 'Ichoda Road, Adilabad, Telangana 504001', description: 'Casual restaurant offering vegetarian and non-vegetarian thalis.' },
        { name: 'Sri Sai Tiffin Center', rating: 4.5, address: 'Market Area, Adilabad, Telangana 504001', description: 'Local favorite for breakfast, tiffins, and quick South Indian meals.' }
    ],
    hospitals: [
        { name: 'RIMS Government Hospital Adilabad', rating: 4.8, address: 'Ichoda Road, Adilabad, Telangana 504001', description: 'Main government hospital providing multi-specialty services and emergency care.' },
        { name: 'Srinivasa Multi Speciality Hospital', rating: 4.7, address: 'Utnoor Road, Adilabad, Telangana 504001', description: 'Private hospital with experienced doctors and modern medical facilities.' },
        { name: 'Life Care Hospital', rating: 4.6, address: 'Neradigonda Road, Adilabad, Telangana 504001', description: 'Trusted hospital known for maternity and general medical care.' },
        { name: 'Ashwini Hospital', rating: 4.5, address: 'Bus Stand Road, Adilabad, Telangana 504001', description: 'Well-known private hospital offering general and emergency services.' }
    ],
    touristSpots: [
        { name: 'Kuntala Waterfall', rating: 4.9, address: 'Neredigonda, Adilabad District, Telangana', description: 'Tallest waterfall in Telangana, surrounded by dense forests and scenic views.' },
        { name: 'Pochera Waterfalls', rating: 4.8, address: 'Boath Mandal, Adilabad District, Telangana', description: 'Beautiful multi-tiered waterfall nestled in greenery.' },
        { name: 'Basar Saraswathi Temple', rating: 4.7, address: 'Basar, near Adilabad, Telangana', description: 'Famous temple dedicated to Goddess Saraswati, popular among students.' },
        { name: 'Kala Ashram', rating: 4.6, address: 'Adilabad Town, Telangana 504001', description: 'Cultural center preserving local arts, crafts, and tribal heritage.' }
    ]
},
'suryapet': {
    schools: [
        { name: 'Kakatiya High School', rating: 4.8, address: 'MG Road, Suryapet, Telangana 508213', description: 'One of the top schools in Suryapet known for academic excellence and extracurricular activities.' },
        { name: 'Sri Chaitanya Techno School', rating: 4.7, address: 'Nehru Nagar, Suryapet, Telangana 508213', description: 'Techno school providing integrated curriculum for competitive exams.' },
        { name: 'Narayana e-Techno School', rating: 4.6, address: 'Vijayawada Highway, Suryapet, Telangana 508213', description: 'Renowned institution focusing on CBSE syllabus and modern teaching techniques.' },
        { name: 'St. Alphonsa High School', rating: 4.5, address: 'Church Road, Suryapet, Telangana 508213', description: 'English-medium school promoting discipline and strong academics.' }
    ],
    restaurants: [
        { name: 'Hotel Blue Diamond', rating: 4.8, address: 'Hyderabad Road, Suryapet, Telangana 508213', description: 'Famous family restaurant serving Indian and Chinese cuisines with great ambiance.' },
        { name: 'Spicy Bites Family Restaurant', rating: 4.7, address: 'Bus Stand Area, Suryapet, Telangana 508213', description: 'Popular spot for biryanis, curries, and vegetarian dishes.' },
        { name: 'Sri Venkateswara Tiffin Center', rating: 4.6, address: 'Market Road, Suryapet, Telangana 508213', description: 'Local favorite for authentic South Indian breakfast and snacks.' },
        { name: 'Mehfil Family Restaurant', rating: 4.5, address: 'Vijayawada Highway, Suryapet, Telangana 508213', description: 'Known for Hyderabadi-style biryani and traditional Telangana food.' }
    ],
    hospitals: [
        { name: 'Government Area Hospital Suryapet', rating: 4.8, address: 'Hospital Road, Suryapet, Telangana 508213', description: 'Main government hospital offering 24x7 emergency and specialty services.' },
        { name: 'Sunshine Multi Speciality Hospital', rating: 4.7, address: 'Nehru Nagar, Suryapet, Telangana 508213', description: 'Private hospital with advanced facilities and experienced doctors.' },
        { name: 'Life Line Hospital', rating: 4.6, address: 'Bus Stand Road, Suryapet, Telangana 508213', description: 'Trusted hospital for maternity and general medical care.' },
        { name: 'Sathya Sai Eye Hospital', rating: 4.5, address: 'Hyderabad Road, Suryapet, Telangana 508213', description: 'Specialized eye care center with modern diagnostic equipment.' }
    ],
    touristSpots: [
        { name: 'Jan Pahad Saidulu Dargah', rating: 4.9, address: 'Jan Pahad, near Suryapet, Telangana', description: 'Famous Dargah visited by devotees from all religions for its annual Urs festival.' },
        { name: 'Nagarjuna Sagar Dam', rating: 4.8, address: 'Near Suryapet, Telangana', description: 'One of the largest masonry dams in the world, offering scenic views and boating.' },
        { name: 'Ethipothala Waterfalls', rating: 4.7, address: 'Near Nagarjuna Sagar, Suryapet District', description: 'Spectacular waterfall surrounded by greenery and caves.' },
        { name: 'Sri Laxmi Narasimha Swamy Temple', rating: 4.6, address: 'Mattapalli, near Suryapet, Telangana', description: 'Ancient temple on the banks of Krishna River dedicated to Lord Narasimha.' }
    ]
},
'miryalaguda': {
    schools: [
        { name: 'Narayana e-Techno School', rating: 4.8, address: 'RTC Colony, Miryalaguda, Telangana 508207', description: 'Leading CBSE school integrating academics with IIT and NEET foundation programs.' },
        { name: 'Sri Chaitanya School', rating: 4.7, address: 'Nehru Nagar, Miryalaguda, Telangana 508207', description: 'Renowned school focusing on modern education and personality development.' },
        { name: 'Montessori High School', rating: 4.6, address: 'Main Road, Miryalaguda, Telangana 508207', description: 'Reputed English-medium school known for innovative teaching methods and discipline.' },
        { name: 'ZPHS Miryalaguda', rating: 4.5, address: 'Bus Stand Road, Miryalaguda, Telangana 508207', description: 'Government high school providing affordable and quality education for all.' }
    ],
    restaurants: [
        { name: 'Annapurna Family Restaurant', rating: 4.8, address: 'MG Road, Miryalaguda, Telangana 508207', description: 'Famous vegetarian restaurant offering South Indian and North Indian dishes.' },
        { name: 'Mehfil Family Restaurant', rating: 4.7, address: 'Nehru Nagar, Miryalaguda, Telangana 508207', description: 'Popular for Hyderabadi biryani, tandoori items, and family-friendly ambiance.' },
        { name: 'Sri Sai Tiffin Center', rating: 4.6, address: 'Market Road, Miryalaguda, Telangana 508207', description: 'Local favorite for breakfast, snacks, and South Indian meals.' },
        { name: 'New City Family Restaurant', rating: 4.5, address: 'Bus Stand Area, Miryalaguda, Telangana 508207', description: 'Casual dining restaurant serving Indian and Chinese cuisine.' }
    ],
    hospitals: [
        { name: 'Government Area Hospital Miryalaguda', rating: 4.8, address: 'Hospital Road, Miryalaguda, Telangana 508207', description: 'Major government hospital offering general and emergency healthcare services.' },
        { name: 'Vasavi Multi Speciality Hospital', rating: 4.7, address: 'RTC Colony, Miryalaguda, Telangana 508207', description: 'Private hospital with modern facilities and experienced medical staff.' },
        { name: 'Om Sai Hospital', rating: 4.6, address: 'Main Road, Miryalaguda, Telangana 508207', description: 'Multi-speciality hospital providing affordable and quality healthcare.' },
        { name: 'Life Care Hospital', rating: 4.5, address: 'Bus Stand Road, Miryalaguda, Telangana 508207', description: 'Well-known hospital specializing in maternity and general medicine.' }
    ],
    touristSpots: [
        { name: 'Nagarjuna Sagar Dam', rating: 4.9, address: 'Near Miryalaguda, Telangana', description: 'Massive dam across the Krishna River, popular for boating and scenic views.' },
        { name: 'Ethipothala Waterfalls', rating: 4.8, address: 'Near Nagarjuna Sagar, Telangana', description: 'Beautiful cascading waterfall surrounded by lush greenery.' },
        { name: 'Mattapalli Narasimha Swamy Temple', rating: 4.7, address: 'Mattapalli Village, near Miryalaguda, Telangana', description: 'Ancient riverside temple dedicated to Lord Narasimha.' },
        { name: 'Buddha Museum', rating: 4.6, address: 'Nagarjuna Konda, near Miryalaguda, Telangana', description: 'Historical museum showcasing Buddhist artifacts and sculptures.' }
    ]
},
'siddipet': {
    schools: [
        { name: 'Trinity Model School', rating: 4.8, address: 'Prashanth Nagar, Siddipet, Telangana 502103', description: 'Leading English-medium school known for excellent academics and extracurricular programs.' },
        { name: 'Narayana e-Techno School', rating: 4.7, address: 'Hyderabad Road, Siddipet, Telangana 502103', description: 'Integrated school offering CBSE curriculum with IIT/NEET foundation courses.' },
        { name: 'Sri Chaitanya Techno School', rating: 4.6, address: 'Shankar Nagar, Siddipet, Telangana 502103', description: 'Popular institution emphasizing conceptual learning and competitive exam preparation.' },
        { name: 'St. Paul’s High School', rating: 4.5, address: 'Rangadampally, Siddipet, Telangana 502103', description: 'Renowned for holistic education, discipline, and moral values.' }
    ],
    restaurants: [
        { name: '7 Hills Family Restaurant', rating: 4.8, address: 'Hyderabad Road, Siddipet, Telangana 502103', description: 'Famous family restaurant serving Indian, Chinese, and tandoori dishes.' },
        { name: 'Mehfil Family Restaurant', rating: 4.7, address: 'Sangareddy Road, Siddipet, Telangana 502103', description: 'Known for authentic Hyderabadi biryani and vegetarian options.' },
        { name: 'Spicy Garden Restaurant', rating: 4.6, address: 'Bus Stand Area, Siddipet, Telangana 502103', description: 'Casual dining spot serving South Indian and fast food meals.' },
        { name: 'Hotel Annapurna', rating: 4.5, address: 'Market Road, Siddipet, Telangana 502103', description: 'Pure vegetarian restaurant famous for traditional Telangana thalis.' }
    ],
    hospitals: [
        { name: 'Government Medical College & Hospital Siddipet', rating: 4.9, address: 'Rangadampally, Siddipet, Telangana 502103', description: 'Major government hospital with multi-speciality and emergency services.' },
        { name: 'Srujana Multi Speciality Hospital', rating: 4.7, address: 'Hyderabad Road, Siddipet, Telangana 502103', description: 'Private hospital known for quality healthcare and advanced medical care.' },
        { name: 'Medicare Hospital', rating: 4.6, address: 'Prashanth Nagar, Siddipet, Telangana 502103', description: 'Well-equipped hospital offering maternity, orthopedic, and pediatric care.' },
        { name: 'Sai Krishna Hospital', rating: 4.5, address: 'Shankar Nagar, Siddipet, Telangana 502103', description: 'Private hospital providing reliable general and emergency healthcare.' }
    ],
    touristSpots: [
        { name: 'Komati Cheruvu Lake', rating: 4.9, address: 'Center of Siddipet, Telangana', description: 'Beautiful lake with walking tracks, boating, and light shows — a local attraction.' },
        { name: 'Sri Ranganayaka Swamy Temple', rating: 4.8, address: 'Siddipet, Telangana 502103', description: 'Ancient temple dedicated to Lord Ranganatha Swamy, known for its grand architecture.' },
        { name: 'Nagulamma Temple', rating: 4.7, address: 'Near Siddipet Town, Telangana', description: 'Famous temple with historical and cultural significance.' },
        { name: 'Siddipet Clock Tower', rating: 4.6, address: 'Main Circle, Siddipet, Telangana 502103', description: 'Iconic landmark and popular meeting point in the city center.' }
    ]
},
'jagtial': {
    schools: [
        { name: 'Kakatiya High School', rating: 4.8, address: 'Gandhi Road, Jagtial, Telangana 505327', description: 'Top-rated English-medium school known for academic excellence and extracurricular activities.' },
        { name: 'Narayana e-Techno School', rating: 4.7, address: 'Karimnagar Road, Jagtial, Telangana 505327', description: 'CBSE-affiliated school integrating competitive exam coaching with academics.' },
        { name: 'Sri Chaitanya School', rating: 4.6, address: 'Vemulawada Road, Jagtial, Telangana 505327', description: 'Leading educational institution focusing on holistic student development.' },
        { name: 'Zilla Parishad High School', rating: 4.5, address: 'Market Area, Jagtial, Telangana 505327', description: 'Government high school offering quality education with community support.' }
    ],
    restaurants: [
        { name: 'Spicy Family Restaurant', rating: 4.8, address: 'Karimnagar Road, Jagtial, Telangana 505327', description: 'Popular spot for biryani, tandoori, and South Indian dishes in a family setting.' },
        { name: 'Hotel Swagath', rating: 4.7, address: 'Bus Stand Road, Jagtial, Telangana 505327', description: 'Famous restaurant offering North and South Indian meals with great service.' },
        { name: 'Annapurna Tiffin Center', rating: 4.6, address: 'Main Bazaar, Jagtial, Telangana 505327', description: 'Local favorite for breakfast and quick snacks.' },
        { name: 'New Green Leaf Restaurant', rating: 4.5, address: 'Vemulawada Road, Jagtial, Telangana 505327', description: 'Casual family restaurant serving Indian and Chinese cuisines.' }
    ],
    hospitals: [
        { name: 'Government Area Hospital Jagtial', rating: 4.8, address: 'Hospital Road, Jagtial, Telangana 505327', description: 'Main government hospital providing emergency, maternity, and outpatient services.' },
        { name: 'Prathima Hospital', rating: 4.7, address: 'Karimnagar Road, Jagtial, Telangana 505327', description: 'Private multi-speciality hospital with advanced diagnostic facilities.' },
        { name: 'Life Line Hospital', rating: 4.6, address: 'Vemulawada Road, Jagtial, Telangana 505327', description: 'Trusted hospital for general and maternity healthcare.' },
        { name: 'Surya Nursing Home', rating: 4.5, address: 'Market Area, Jagtial, Telangana 505327', description: 'Private healthcare center with focus on pediatrics and gynecology.' }
    ],
    touristSpots: [
        { name: 'Jagtial Fort', rating: 4.9, address: 'Jagtial Town, Telangana 505327', description: 'Historic 18th-century fort built by Mughals, featuring a unique moat and twin defense walls.' },
        { name: 'Dharmapuri Lakshmi Narasimha Swamy Temple', rating: 4.8, address: 'Dharmapuri, near Jagtial, Telangana', description: 'Ancient temple dedicated to Lord Narasimha on the banks of River Godavari.' },
        { name: 'Kondapur Lake', rating: 4.7, address: 'Near Jagtial, Telangana', description: 'Scenic lake ideal for picnics and evening walks.' },
        { name: 'Kaleshwaram Temple', rating: 4.6, address: 'Kaleshwaram, near Jagtial, Telangana', description: 'Famous Shiva temple and one of the major pilgrimage spots in northern Telangana.' }
    ]
},
'nirmal': {
    schools: [
        { name: 'St. Paul’s High School', rating: 4.8, address: 'Mancherial Road, Nirmal, Telangana 504106', description: 'Top English-medium school emphasizing discipline, academics, and extracurricular activities.' },
        { name: 'Narayana e-Techno School', rating: 4.7, address: 'Gandhi Nagar, Nirmal, Telangana 504106', description: 'CBSE-affiliated school offering integrated programs for IIT and NEET aspirants.' },
        { name: 'Sri Chaitanya School', rating: 4.6, address: 'Kanteshwar Road, Nirmal, Telangana 504106', description: 'Well-known educational institution providing modern education and holistic learning.' },
        { name: 'Government High School Nirmal', rating: 4.5, address: 'Town Area, Nirmal, Telangana 504106', description: 'Government-run school providing affordable and quality education to local students.' }
    ],
    restaurants: [
        { name: 'Hotel Swagath', rating: 4.8, address: 'Bus Stand Road, Nirmal, Telangana 504106', description: 'Renowned restaurant serving delicious Indian and Chinese cuisine in a family setting.' },
        { name: 'Mehfil Family Restaurant', rating: 4.7, address: 'Adilabad Road, Nirmal, Telangana 504106', description: 'Popular for Hyderabadi biryani and Telangana-style meals.' },
        { name: 'Annapurna Tiffin Center', rating: 4.6, address: 'Market Area, Nirmal, Telangana 504106', description: 'Famous local tiffin center offering authentic South Indian breakfast.' },
        { name: 'Hotel Vihanga', rating: 4.5, address: 'NH-44, Nirmal, Telangana 504106', description: 'Family-friendly restaurant offering multi-cuisine dishes with a modern touch.' }
    ],
    hospitals: [
        { name: 'Government Area Hospital Nirmal', rating: 4.8, address: 'Hospital Road, Nirmal, Telangana 504106', description: 'Major government hospital offering general, maternity, and emergency healthcare services.' },
        { name: 'Life Line Multi Speciality Hospital', rating: 4.7, address: 'Adilabad Road, Nirmal, Telangana 504106', description: 'Private hospital equipped with modern facilities and skilled specialists.' },
        { name: 'Sri Sai Hospital', rating: 4.6, address: 'Bus Stand Area, Nirmal, Telangana 504106', description: 'Trusted medical center offering 24/7 healthcare services.' },
        { name: 'Srinivasa Hospital', rating: 4.5, address: 'Town Area, Nirmal, Telangana 504106', description: 'Well-known private hospital for maternity and general medicine.' }
    ],
    touristSpots: [
        { name: 'Nirmal Fort', rating: 4.9, address: 'Nirmal Town, Telangana 504106', description: 'Historic fort offering panoramic views of the town, built during the Nizam era.' },
        { name: 'Kuntala Waterfall', rating: 4.8, address: 'Near Nirmal, Telangana', description: 'Tallest waterfall in Telangana surrounded by scenic forest views.' },
        { name: 'Pochera Waterfalls', rating: 4.7, address: 'Boath Mandal, near Nirmal, Telangana', description: 'Beautiful natural waterfall famous for its serene atmosphere.' },
        { name: 'Basar Saraswathi Temple', rating: 4.6, address: 'Basar, near Nirmal, Telangana', description: 'Famous shrine dedicated to Goddess Saraswati, a popular spiritual destination for students.' }
    ]
},
'kamareddy': {
    schools: [
        { name: 'Narayana e-Techno School', rating: 4.8, address: 'Bypass Road, Kamareddy, Telangana 503111', description: 'CBSE-affiliated school offering quality academics with competitive exam foundation programs.' },
        { name: 'Sri Chaitanya School', rating: 4.7, address: 'Old Bus Stand Area, Kamareddy, Telangana 503111', description: 'Renowned institution focused on modern teaching methods and student excellence.' },
        { name: 'St. Ann’s High School', rating: 4.6, address: 'Subash Nagar, Kamareddy, Telangana 503111', description: 'Reputed English-medium school emphasizing discipline, academics, and values.' },
        { name: 'Government High School Kamareddy', rating: 4.5, address: 'Main Road, Kamareddy, Telangana 503111', description: 'Government school providing accessible and quality education to all students.' }
    ],
    restaurants: [
        { name: 'Hotel V Grand', rating: 4.8, address: 'Nizamabad Road, Kamareddy, Telangana 503111', description: 'Upscale family restaurant known for authentic Indian and Chinese cuisines.' },
        { name: 'Spicy Hut Family Restaurant', rating: 4.7, address: 'Bus Stand Road, Kamareddy, Telangana 503111', description: 'Popular for Hyderabadi biryani, curries, and traditional Telangana meals.' },
        { name: 'Annapurna Tiffin Center', rating: 4.6, address: 'Market Area, Kamareddy, Telangana 503111', description: 'Local favorite for fresh South Indian breakfast and snacks.' },
        { name: 'Mehfil Family Restaurant', rating: 4.5, address: 'Bypass Road, Kamareddy, Telangana 503111', description: 'Casual dining restaurant offering biryani, Chinese, and fast food options.' }
    ],
    hospitals: [
        { name: 'Government Area Hospital Kamareddy', rating: 4.8, address: 'Hospital Road, Kamareddy, Telangana 503111', description: 'Major government hospital offering general, maternity, and emergency care.' },
        { name: 'Medicover Hospital Kamareddy', rating: 4.7, address: 'Nizamabad Road, Kamareddy, Telangana 503111', description: 'Private multi-speciality hospital with modern medical facilities and 24/7 services.' },
        { name: 'Srujana Hospital', rating: 4.6, address: 'Bypass Road, Kamareddy, Telangana 503111', description: 'Well-known hospital providing orthopedic, maternity, and pediatric services.' },
        { name: 'Life Line Hospital', rating: 4.5, address: 'Market Area, Kamareddy, Telangana 503111', description: 'Private hospital offering general and emergency healthcare services.' }
    ],
    touristSpots: [
        { name: 'Domakonda Fort', rating: 4.9, address: 'Domakonda Village, near Kamareddy, Telangana', description: 'Historical fort showcasing Indo-Islamic architecture from the 18th century.' },
        { name: 'Pocharam Wildlife Sanctuary', rating: 4.8, address: 'Near Kamareddy, Telangana', description: 'Scenic wildlife reserve known for deer, peacocks, and birdwatching.' },
        { name: 'Nizam Sagar Dam', rating: 4.7, address: 'Near Kamareddy, Telangana', description: 'Large reservoir on the Manjira River offering picturesque views and boating.' },
        { name: 'Sri Rajarajeshwara Swamy Temple', rating: 4.6, address: 'Vemulawada, near Kamareddy, Telangana', description: 'Ancient temple dedicated to Lord Shiva, attracting pilgrims year-round.' }
    ]
},









'chennai': {
    schools: [
        { name: 'Padma Seshadri Bala Bhavan Senior Secondary School', rating: 4.8, address: 'Nungambakkam, Chennai, Tamil Nadu 600034', description: 'Renowned CBSE school known for academic excellence and holistic education.' },
        { name: 'DAV Senior Secondary School', rating: 4.7, address: 'Gopalapuram, Chennai, Tamil Nadu 600086', description: 'One of Chennai’s top schools with a strong focus on academics and extracurricular activities.' },
        { name: 'Chettinad Vidyashram', rating: 4.6, address: 'R.A. Puram, Chennai, Tamil Nadu 600028', description: 'Premier school offering CBSE curriculum with a balanced focus on academics and culture.' },
        { name: 'Velammal Matriculation Higher Secondary School', rating: 4.5, address: 'Mogappair, Chennai, Tamil Nadu 600037', description: 'Well-known school emphasizing discipline, academics, and competitive exam preparation.' }
    ],
    restaurants: [
        { name: 'Dakshin - Crowne Plaza', rating: 4.8, address: 'Alwarpet, Chennai, Tamil Nadu 600018', description: 'Luxury South Indian restaurant offering authentic regional cuisines in an elegant setting.' },
        { name: 'Murugan Idli Shop', rating: 4.7, address: 'T. Nagar, Chennai, Tamil Nadu 600017', description: 'Iconic eatery famous for soft idlis, chutneys, and traditional Tamil tiffin items.' },
        { name: 'Annalakshmi Restaurant', rating: 4.6, address: 'Egmore, Chennai, Tamil Nadu 600008', description: 'Vegetarian restaurant serving traditional Tamil cuisine in a cultural atmosphere.' },
        { name: 'Coal Barbecues', rating: 4.5, address: 'Velachery, Chennai, Tamil Nadu 600042', description: 'Popular buffet-style restaurant specializing in grilled delicacies and live counters.' }
    ],
    hospitals: [
        { name: 'Apollo Hospitals', rating: 4.9, address: 'Greams Road, Chennai, Tamil Nadu 600006', description: 'Leading multi-specialty hospital offering world-class healthcare and advanced treatments.' },
        { name: 'Fortis Malar Hospital', rating: 4.8, address: 'Adyar, Chennai, Tamil Nadu 600020', description: 'Well-known for cardiac, neurological, and critical care services.' },
        { name: 'MIOT International Hospital', rating: 4.7, address: 'Manapakkam, Chennai, Tamil Nadu 600089', description: 'Renowned for orthopedic and organ transplant facilities with global standards.' },
        { name: 'Government General Hospital', rating: 4.6, address: 'Park Town, Chennai, Tamil Nadu 600003', description: 'Major government hospital providing quality treatment at affordable cost.' }
    ],
    touristSpots: [
        { name: 'Marina Beach', rating: 4.9, address: 'Marina, Chennai, Tamil Nadu 600005', description: 'One of the longest urban beaches in the world, perfect for sunrise views and leisure walks.' },
        { name: 'Kapaleeshwarar Temple', rating: 4.8, address: 'Mylapore, Chennai, Tamil Nadu 600004', description: 'Historic Dravidian-style temple dedicated to Lord Shiva, known for its architecture.' },
        { name: 'Fort St. George', rating: 4.7, address: 'Rajaji Salai, Chennai, Tamil Nadu 600009', description: 'Historic fort built by the British in 1644, now housing a museum and government offices.' },
        { name: 'VGP Universal Kingdom', rating: 4.6, address: 'ECR Road, Chennai, Tamil Nadu 600115', description: 'Famous amusement park offering thrilling rides, water attractions, and entertainment shows.' }
    ]
},
'coimbatore': {
    schools: [
        { name: 'PSG Public Schools', rating: 4.8, address: 'Peelamedu, Coimbatore, Tamil Nadu 641004', description: 'Top CBSE school emphasizing academic excellence and innovation in learning.' },
        { name: 'Chinmaya International Residential School', rating: 4.7, address: 'Siruvani, Coimbatore, Tamil Nadu 641114', description: 'Renowned residential school offering holistic education and global exposure.' },
        { name: 'Delhi Public School Coimbatore', rating: 4.6, address: 'Onapalayam, Coimbatore, Tamil Nadu 641108', description: 'CBSE-affiliated school promoting balanced academic and co-curricular development.' },
        { name: 'The Indian Public School (TIPS)', rating: 4.5, address: 'Vedapatti, Coimbatore, Tamil Nadu 641007', description: 'Modern international school offering CBSE and Cambridge curricula.' }
    ],
    restaurants: [
        { name: 'Annapoorna Gowrishankar', rating: 4.8, address: 'RS Puram, Coimbatore, Tamil Nadu 641002', description: 'Iconic vegetarian restaurant known for authentic South Indian meals and filter coffee.' },
        { name: 'Bird on Tree', rating: 4.7, address: 'Race Course, Coimbatore, Tamil Nadu 641018', description: 'Upscale multi-cuisine restaurant offering continental and fusion dishes in a scenic setting.' },
        { name: 'KOVE Restaurant', rating: 4.6, address: 'Avinashi Road, Coimbatore, Tamil Nadu 641014', description: 'Trendy restaurant serving global cuisine with elegant interiors and ambiance.' },
        { name: 'Sree Annapoorna Sree Gowrishankar', rating: 4.5, address: 'Gandhipuram, Coimbatore, Tamil Nadu 641012', description: 'Popular vegetarian restaurant chain serving traditional Tamil dishes.' }
    ],
    hospitals: [
        { name: 'PSG Hospitals', rating: 4.9, address: 'Peelamedu, Coimbatore, Tamil Nadu 641004', description: 'Premier multi-specialty teaching hospital providing advanced healthcare facilities.' },
        { name: 'KG Hospital', rating: 4.8, address: 'Arts College Road, Coimbatore, Tamil Nadu 641018', description: 'Renowned for cardiac care, emergency, and surgical services.' },
        { name: 'Ganga Hospital', rating: 4.7, address: 'Mettupalayam Road, Coimbatore, Tamil Nadu 641043', description: 'Famous for orthopedic and reconstructive surgery services.' },
        { name: 'Kovai Medical Center and Hospital (KMCH)', rating: 4.6, address: 'Avinashi Road, Coimbatore, Tamil Nadu 641014', description: 'Well-equipped hospital offering specialized treatment and diagnostic care.' }
    ],
    touristSpots: [
        { name: 'Marudamalai Temple', rating: 4.9, address: 'Marudamalai, Coimbatore, Tamil Nadu 641046', description: 'Ancient hill temple dedicated to Lord Murugan, known for its scenic surroundings.' },
        { name: 'VOC Park and Zoo', rating: 4.8, address: 'Gopalapuram, Coimbatore, Tamil Nadu 641018', description: 'Popular family-friendly park with a small zoo and play area.' },
        { name: 'Adiyogi Shiva Statue', rating: 4.7, address: 'Isha Yoga Center, Coimbatore, Tamil Nadu 641114', description: 'World’s largest bust statue dedicated to Lord Shiva, symbolizing yoga and meditation.' },
        { name: 'Siruvani Waterfalls', rating: 4.6, address: 'Near Noyyal, Coimbatore District, Tamil Nadu', description: 'Picturesque waterfall famous for its pure water and lush green surroundings.' }
    ]
},
'madurai': {
    schools: [
        { name: 'TVS Higher Secondary School', rating: 4.8, address: 'Lakshmipuram, Madurai, Tamil Nadu 625003', description: 'Prestigious institution offering quality education with emphasis on academics and discipline.' },
        { name: 'Velammal Matriculation Higher Secondary School', rating: 4.7, address: 'Anuppanadi, Madurai, Tamil Nadu 625009', description: 'Reputed school focusing on academics, sports, and holistic student development.' },
        { name: 'Keren Public School', rating: 4.6, address: 'Anna Nagar, Madurai, Tamil Nadu 625020', description: 'Modern CBSE school emphasizing conceptual learning and values-based education.' },
        { name: 'Lakshmi School', rating: 4.5, address: 'Veerapanchan, Madurai, Tamil Nadu 625020', description: 'Well-known CBSE school providing a student-centered approach to learning.' }
    ],
    restaurants: [
        { name: 'Murugan Idli Shop', rating: 4.8, address: 'West Masi Street, Madurai, Tamil Nadu 625001', description: 'Iconic South Indian restaurant famous for soft idlis, dosas, and chutneys.' },
        { name: 'Kumar Mess', rating: 4.7, address: 'KK Nagar, Madurai, Tamil Nadu 625020', description: 'Famous for traditional non-vegetarian Chettinad dishes and biryanis.' },
        { name: 'Simmakkal Konar Kadai', rating: 4.6, address: 'Simmakkal, Madurai, Tamil Nadu 625001', description: 'Authentic eatery known for spicy regional specialties and local flavors.' },
        { name: 'Amsavalli Bhavan', rating: 4.5, address: 'East Marret Street, Madurai, Tamil Nadu 625001', description: 'Historic restaurant well-known for its Madurai-style biryani and meat dishes.' }
    ],
    hospitals: [
        { name: 'Meenakshi Mission Hospital and Research Centre', rating: 4.9, address: 'Lake Area, Melur Road, Madurai, Tamil Nadu 625107', description: 'Leading multi-specialty hospital offering advanced medical services and diagnostics.' },
        { name: 'Apollo Specialty Hospital', rating: 4.8, address: 'KK Nagar, Madurai, Tamil Nadu 625020', description: 'Well-equipped hospital known for cardiac, oncology, and orthopedic care.' },
        { name: 'Velammal Medical College Hospital & Research Institute', rating: 4.7, address: 'Anuppanadi, Madurai, Tamil Nadu 625009', description: 'Comprehensive healthcare center offering education and specialty services.' },
        { name: 'Government Rajaji Hospital', rating: 4.6, address: 'Panagal Road, Madurai, Tamil Nadu 625020', description: 'Major government hospital providing affordable healthcare and emergency services.' }
    ],
    touristSpots: [
        { name: 'Meenakshi Amman Temple', rating: 4.9, address: 'Madurai Main, Tamil Nadu 625001', description: 'World-famous temple dedicated to Goddess Meenakshi, known for its stunning Dravidian architecture.' },
        { name: 'Thirumalai Nayakkar Mahal', rating: 4.8, address: 'Near Meenakshi Temple, Madurai, Tamil Nadu 625001', description: 'Historic palace showcasing Indo-Saracenic architecture and royal heritage.' },
        { name: 'Gandhi Memorial Museum', rating: 4.7, address: 'Tamukkam, Madurai, Tamil Nadu 625020', description: 'Museum dedicated to Mahatma Gandhi, displaying rare artifacts and historical exhibits.' },
        { name: 'Alagar Kovil', rating: 4.6, address: 'Alagarkoil, Madurai District, Tamil Nadu 625301', description: 'Ancient hill temple dedicated to Lord Vishnu, surrounded by scenic beauty.' }
    ]
},
'tiruppur': {
    schools: [
        { name: 'The Indian Public School (TIPS)', rating: 4.8, address: 'Kangayam Road, Tiruppur, Tamil Nadu 641604', description: 'Modern international school offering CBSE and Cambridge curricula with global teaching standards.' },
        { name: 'Nachimuthu Polytechnic College Higher Secondary School', rating: 4.7, address: 'Pollachi Main Road, Tiruppur, Tamil Nadu 641602', description: 'Reputed institution focusing on academic excellence and technical skill development.' },
        { name: 'Sri Vidya Mandir Matriculation Higher Secondary School', rating: 4.6, address: 'Avinashi Road, Tiruppur, Tamil Nadu 641603', description: 'Well-known school providing balanced academics and extracurricular activities.' },
        { name: 'Velalar Vidyalayaa Senior Secondary School', rating: 4.5, address: 'Thindal, Tiruppur, Tamil Nadu 641602', description: 'CBSE school known for its quality teaching and discipline-driven environment.' }
    ],
    restaurants: [
        { name: 'Annapoorna Gowrishankar', rating: 4.8, address: 'Avinashi Road, Tiruppur, Tamil Nadu 641603', description: 'Popular vegetarian restaurant offering authentic South Indian tiffin and meals.' },
        { name: 'Hotel Sri Saravana Bhavan', rating: 4.7, address: 'Perumanallur Road, Tiruppur, Tamil Nadu 641666', description: 'Renowned for its vegetarian South Indian delicacies and fast service.' },
        { name: 'Hotel Velan International', rating: 4.6, address: 'Kumaran Road, Tiruppur, Tamil Nadu 641601', description: 'Multi-cuisine restaurant serving Indian and continental dishes in a fine-dining setup.' },
        { name: 'Barbeque Nation', rating: 4.5, address: 'Avinashi Road, Tiruppur, Tamil Nadu 641603', description: 'Buffet-style restaurant famous for grilled starters, desserts, and festive ambiance.' }
    ],
    hospitals: [
        { name: 'Lotus Hospital', rating: 4.8, address: 'Kumaran Road, Tiruppur, Tamil Nadu 641601', description: 'Multi-specialty hospital offering advanced medical and surgical care.' },
        { name: 'Tiruppur Medical Center', rating: 4.7, address: 'Avinashi Road, Tiruppur, Tamil Nadu 641603', description: 'Trusted hospital providing quality healthcare with modern diagnostic facilities.' },
        { name: 'Revathi Medical Center', rating: 4.6, address: 'College Road, Tiruppur, Tamil Nadu 641602', description: 'Comprehensive healthcare center known for maternity and general medicine.' },
        { name: 'Government Headquarters Hospital', rating: 4.5, address: 'Periyar Colony, Tiruppur, Tamil Nadu 641602', description: 'Main government hospital serving the public with 24-hour emergency services.' }
    ],
    touristSpots: [
        { name: 'Avinashi Lingeshwarar Temple', rating: 4.9, address: 'Avinashi, Tiruppur District, Tamil Nadu 641654', description: 'Ancient temple dedicated to Lord Shiva, known for its historical and spiritual importance.' },
        { name: 'Thirumoorthy Hills', rating: 4.8, address: 'Udumalpet, Near Tiruppur, Tamil Nadu', description: 'Scenic hill area with waterfalls, a dam, and trekking opportunities.' },
        { name: 'Amaravathi Dam', rating: 4.7, address: 'Udumalpet, Tiruppur District, Tamil Nadu 642126', description: 'Beautiful dam surrounded by hills, ideal for picnics and boating.' },
        { name: 'Nanjarayan Tank Bird Sanctuary', rating: 4.6, address: 'Kunnathur Road, Tiruppur, Tamil Nadu 641602', description: 'Wetland area attracting migratory birds, perfect for birdwatching and photography.' }
    ]
},
'salem': {
    schools: [
        { name: 'Holy Cross Matriculation Higher Secondary School', rating: 4.8, address: 'Four Roads, Salem, Tamil Nadu 636016', description: 'Prestigious school offering quality education with focus on academics and values.' },
        { name: 'Sri Vidya Mandir Senior Secondary School', rating: 4.7, address: 'Fairlands, Salem, Tamil Nadu 636016', description: 'Reputed CBSE school emphasizing academic excellence and extracurricular growth.' },
        { name: 'Little Flower Higher Secondary School', rating: 4.6, address: 'Ammapet, Salem, Tamil Nadu 636003', description: 'Popular school known for disciplined environment and strong academic results.' },
        { name: 'Emerald Valley Public School', rating: 4.5, address: 'Yercaud Main Road, Salem, Tamil Nadu 636601', description: 'Modern CBSE school offering holistic learning in a scenic environment.' }
    ],
    restaurants: [
        { name: 'Selvi Mess', rating: 4.8, address: 'Saradha College Road, Salem, Tamil Nadu 636007', description: 'Famous South Indian restaurant serving authentic Tamil meals and tiffin items.' },
        { name: 'Hotel Lakshmi Prakash', rating: 4.7, address: 'Omalur Main Road, Salem, Tamil Nadu 636009', description: 'Popular vegetarian restaurant offering a wide range of traditional dishes.' },
        { name: 'Rajarajeshwari Restaurant', rating: 4.6, address: 'Fairlands, Salem, Tamil Nadu 636016', description: 'Family-friendly eatery serving North and South Indian cuisines.' },
        { name: 'Cascade', rating: 4.5, address: 'Hasthampatti, Salem, Tamil Nadu 636007', description: 'Trendy restaurant offering Chinese, Thai, and continental dishes.' }
    ],
    hospitals: [
        { name: 'Kauvery Hospital', rating: 4.9, address: 'Seelanaickenpatti, Salem, Tamil Nadu 636201', description: 'Leading multi-specialty hospital providing advanced treatment and critical care.' },
        { name: 'Manipal Hospital', rating: 4.8, address: 'Salem Main Road, Tamil Nadu 636015', description: 'Modern healthcare center known for cardiology and general medicine.' },
        { name: 'Sims Chellum Hospital', rating: 4.7, address: 'Fairlands, Salem, Tamil Nadu 636016', description: 'Renowned for orthopedics, maternity, and emergency services.' },
        { name: 'Government Mohan Kumaramangalam Medical College Hospital', rating: 4.6, address: 'Salem, Tamil Nadu 636030', description: 'Major government hospital offering multi-specialty care and medical education.' }
    ],
    touristSpots: [
        { name: 'Yercaud Hill Station', rating: 4.9, address: 'Yercaud, Salem District, Tamil Nadu 636601', description: 'Scenic hill station known for lakes, gardens, and cool climate.' },
        { name: '1008 Lingam Temple', rating: 4.8, address: 'Ariyanoor, Salem, Tamil Nadu 636308', description: 'Famous temple featuring 1008 Shiva Lingams arranged in a spiritual layout.' },
        { name: 'Mookaneri Lake', rating: 4.7, address: 'Kondappanaickenpatti, Salem, Tamil Nadu 636010', description: 'Beautiful lake offering boating, birdwatching, and serene views.' },
        { name: 'Kailasanathar Temple', rating: 4.6, address: 'Tharamangalam, Salem District, Tamil Nadu 636502', description: 'Ancient temple renowned for intricate stone carvings and historical architecture.' }
    ]
},
'tiruchirappalli': {
    schools: [
        { name: 'Campion Anglo-Indian Higher Secondary School', rating: 4.8, address: 'Cantonment, Tiruchirappalli, Tamil Nadu 620001', description: 'Historic boys’ school offering excellent academic and sports education.' },
        { name: 'R.S.K. Higher Secondary School', rating: 4.7, address: 'Cantonment, Tiruchirappalli, Tamil Nadu 620001', description: 'Renowned CBSE-affiliated school with strong academic and cultural reputation.' },
        { name: 'Montfort School', rating: 4.6, address: 'Yercaud Road, Tiruchirappalli, Tamil Nadu 620102', description: 'CBSE school emphasizing all-round development and extracurricular excellence.' },
        { name: 'Bishop Heber Higher Secondary School', rating: 4.5, address: 'Puthur, Tiruchirappalli, Tamil Nadu 620017', description: 'Popular institution known for discipline, academics, and sports training.' }
    ],
    restaurants: [
        { name: 'Banana Leaf Restaurant', rating: 4.8, address: 'Thillai Nagar, Tiruchirappalli, Tamil Nadu 620018', description: 'Well-known for authentic South Indian meals served on banana leaves.' },
        { name: 'Sangeetha Veg Restaurant', rating: 4.7, address: 'Cantonment, Tiruchirappalli, Tamil Nadu 620001', description: 'Famous vegetarian chain restaurant offering a variety of dosas and thalis.' },
        { name: 'DiMoRa', rating: 4.6, address: 'Thillai Nagar, Tiruchirappalli, Tamil Nadu 620018', description: 'Trendy café and restaurant offering continental, Italian, and Indian dishes.' },
        { name: 'Sri Saraswathi Café', rating: 4.5, address: 'Chathiram Bus Stand, Tiruchirappalli, Tamil Nadu 620002', description: 'Traditional eatery serving South Indian breakfast and snacks.' }
    ],
    hospitals: [
        { name: 'Kauvery Hospital', rating: 4.9, address: 'Melapudur, Tiruchirappalli, Tamil Nadu 620001', description: 'Leading multi-specialty hospital offering comprehensive healthcare and advanced facilities.' },
        { name: 'Apollo Speciality Hospital', rating: 4.8, address: 'Cantonment, Tiruchirappalli, Tamil Nadu 620001', description: 'Top-rated hospital known for cardiac, orthopedic, and neurology services.' },
        { name: 'BHEL Hospital', rating: 4.7, address: 'Kailasapuram, Tiruchirappalli, Tamil Nadu 620014', description: 'Corporate hospital offering quality medical services to employees and the public.' },
        { name: 'Government Medical College Hospital', rating: 4.6, address: 'Puthur, Tiruchirappalli, Tamil Nadu 620017', description: 'Main government hospital providing affordable medical care and emergency services.' }
    ],
    touristSpots: [
        { name: 'Rockfort Temple', rating: 4.9, address: 'Rockfort, Tiruchirappalli, Tamil Nadu 620002', description: 'Iconic hill temple offering panoramic city views and ancient architecture.' },
        { name: 'Sri Ranganathaswamy Temple', rating: 4.9, address: 'Srirangam, Tiruchirappalli, Tamil Nadu 620006', description: 'Massive temple complex dedicated to Lord Vishnu, a major pilgrimage site in South India.' },
        { name: 'Jambukeswarar Temple', rating: 4.8, address: 'Thiruvanaikaval, Tiruchirappalli, Tamil Nadu 620005', description: 'Historic temple representing the element of water, dedicated to Lord Shiva.' },
        { name: 'Kallanai Dam', rating: 4.7, address: 'Grand Anaicut, Tiruchirappalli District, Tamil Nadu 621005', description: 'Ancient dam built by the Cholas, still functional and a major tourist attraction.' }
    ]
},
'thoothukudi': {
    schools: [
        { name: 'Holy Cross Anglo Indian Higher Secondary School', rating: 4.8, address: 'Bryant Nagar, Thoothukudi, Tamil Nadu 628008', description: 'Historic institution providing excellent academics and character-based education.' },
        { name: 'Subbiah Vidyalayam Higher Secondary School', rating: 4.7, address: 'Palayamkottai Road, Thoothukudi, Tamil Nadu 628002', description: 'Well-reputed school focusing on academics, discipline, and extracurricular activities.' },
        { name: 'Good Shepherd Matriculation Higher Secondary School', rating: 4.6, address: 'Millerpuram, Thoothukudi, Tamil Nadu 628008', description: 'Modern English-medium school known for quality education and co-curricular engagement.' },
        { name: 'The Bharathi Academy', rating: 4.5, address: 'Coronation Colony, Thoothukudi, Tamil Nadu 628002', description: 'CBSE-affiliated school with a focus on holistic development and innovative learning.' }
    ],
    restaurants: [
        { name: 'Hotel DSF Grand Plaza', rating: 4.8, address: 'Madurai Road, Thoothukudi, Tamil Nadu 628003', description: 'Multi-cuisine restaurant offering Indian and continental dishes in a fine dining setup.' },
        { name: 'Bell Hotel & Restaurant', rating: 4.7, address: 'Beach Road, Thoothukudi, Tamil Nadu 628001', description: 'Popular restaurant serving seafood and traditional Tamil delicacies.' },
        { name: 'Hotel Sugam', rating: 4.6, address: 'Palayamkottai Road, Thoothukudi, Tamil Nadu 628002', description: 'Casual dining spot known for South Indian meals and local flavors.' },
        { name: 'Swaad Family Restaurant', rating: 4.5, address: 'Millerpuram, Thoothukudi, Tamil Nadu 628008', description: 'Family-friendly restaurant serving Indian, Chinese, and tandoori dishes.' }
    ],
    hospitals: [
        { name: 'Our Lady of Health Hospital', rating: 4.9, address: 'South Beach Road, Thoothukudi, Tamil Nadu 628001', description: 'Renowned hospital offering advanced medical care and specialized services.' },
        { name: 'VV Hospital', rating: 4.8, address: 'Millerpuram, Thoothukudi, Tamil Nadu 628008', description: 'Multi-specialty hospital providing comprehensive healthcare and diagnostics.' },
        { name: 'Government Medical College Hospital', rating: 4.7, address: 'Thoothukudi, Tamil Nadu 628008', description: 'Leading government hospital serving patients with 24-hour emergency facilities.' },
        { name: 'Sakthi Hospitals', rating: 4.6, address: 'Palayamkottai Road, Thoothukudi, Tamil Nadu 628002', description: 'Trusted private hospital known for maternity, surgical, and general medical services.' }
    ],
    touristSpots: [
        { name: 'Roche Park Beach', rating: 4.9, address: 'Roche Park, Thoothukudi, Tamil Nadu 628001', description: 'Beautiful beach offering serene sunset views and a peaceful environment.' },
        { name: 'Holy Trinity Cathedral', rating: 4.8, address: 'Beach Road, Thoothukudi, Tamil Nadu 628001', description: 'Historic church with stunning architecture and spiritual ambiance.' },
        { name: 'Harbour Beach & Port View', rating: 4.7, address: 'Tuticorin Port Area, Thoothukudi, Tamil Nadu 628004', description: 'Scenic port area offering views of ships, sea breeze, and lighthouse.' },
        { name: 'Kalugumalai Temple', rating: 4.6, address: 'Near Thoothukudi, Tamil Nadu 628552', description: 'Ancient rock-cut temple known for Jain sculptures and historical significance.' }
    ]
},
'tirunelveli': {
    schools: [
        { name: 'St. Xavier’s Higher Secondary School', rating: 4.9, address: 'Palayamkottai, Tirunelveli, Tamil Nadu 627002', description: 'Prestigious Jesuit institution offering excellent academics and sports facilities.' },
        { name: 'Rose Mary Matriculation Higher Secondary School', rating: 4.8, address: 'Vannarpet, Tirunelveli, Tamil Nadu 627003', description: 'Top private school focusing on modern education with strong values and discipline.' },
        { name: 'The Hindu Higher Secondary School', rating: 4.7, address: 'High Ground, Tirunelveli, Tamil Nadu 627006', description: 'One of the oldest schools in Tamil Nadu known for academic excellence.' },
        { name: 'Sarah Tucker Higher Secondary School', rating: 4.6, address: 'Palayamkottai, Tirunelveli, Tamil Nadu 627002', description: 'Girls’ school offering value-based education with focus on cultural and moral growth.' }
    ],
    restaurants: [
        { name: 'Coral Restaurant', rating: 4.8, address: 'Hotel Aryaas, Palayamkottai, Tirunelveli, Tamil Nadu 627002', description: 'Family restaurant known for its South Indian meals and friendly service.' },
        { name: 'Bell Hotel Restaurant', rating: 4.7, address: 'Madurai Road, Tirunelveli, Tamil Nadu 627001', description: 'Elegant dining with multicuisine options and famous Tirunelveli halwa.' },
        { name: 'Annapoorna Restaurant', rating: 4.6, address: 'High Ground, Tirunelveli, Tamil Nadu 627006', description: 'Popular vegetarian restaurant serving traditional Tamil tiffin and meals.' },
        { name: 'Sree Bharani Hotel', rating: 4.5, address: 'Near Junction, Tirunelveli, Tamil Nadu 627001', description: 'Renowned restaurant known for biryani and authentic South Indian flavors.' }
    ],
    hospitals: [
        { name: 'Government Medical College Hospital', rating: 4.9, address: 'Palayamkottai, Tirunelveli, Tamil Nadu 627007', description: 'Major government hospital offering 24/7 emergency and specialized services.' },
        { name: 'Galaxy Hospital', rating: 4.8, address: 'Vannarpettai, Tirunelveli, Tamil Nadu 627003', description: 'Modern multi-specialty hospital with advanced facilities and diagnostics.' },
        { name: 'Annai Velankanni Hospital', rating: 4.7, address: 'Palayamkottai, Tirunelveli, Tamil Nadu 627002', description: 'Trusted hospital offering high-quality healthcare and patient-friendly services.' },
        { name: 'Abinaya Hospital', rating: 4.6, address: 'Tenkasi Road, Tirunelveli, Tamil Nadu 627005', description: 'Well-known private hospital providing affordable and efficient medical treatment.' }
    ],
    touristSpots: [
        { name: 'Nellaiappar Temple', rating: 4.9, address: 'Tirunelveli Town, Tamil Nadu 627006', description: 'Famous ancient temple dedicated to Lord Shiva, known for its architecture and cultural heritage.' },
        { name: 'Papanasam Falls', rating: 4.8, address: 'Papanasam, Tirunelveli District, Tamil Nadu 627425', description: 'Picturesque waterfall surrounded by Western Ghats, a popular tourist and picnic spot.' },
        { name: 'Agasthiyar Falls (Courtallam)', rating: 4.7, address: 'Near Papanasam, Tirunelveli District, Tamil Nadu 627425', description: 'Sacred waterfall believed to cleanse sins and rejuvenate visitors.' },
        { name: 'Manimuthar Dam & Falls', rating: 4.6, address: 'Ambasamudram, Tirunelveli District, Tamil Nadu 627421', description: 'Beautiful dam site with lush greenery, ideal for nature lovers and families.' }
    ]
},
'vellore': {
    schools: [
        { name: 'Sunbeam Matriculation Higher Secondary School', rating: 4.9, address: 'Sathuvachari, Vellore, Tamil Nadu 632009', description: 'Top-tier school offering modern facilities, CBSE curriculum, and holistic development.' },
        { name: 'DAV Public School', rating: 4.8, address: 'Katpadi, Vellore, Tamil Nadu 632007', description: 'Reputed CBSE school focusing on academics, sports, and moral education.' },
        { name: 'Shri Vidhya Mandir Matriculation School', rating: 4.7, address: 'Gandhi Nagar, Vellore, Tamil Nadu 632006', description: 'Known for excellent academic performance and extracurricular engagement.' },
        { name: 'Don Bosco Matriculation Higher Secondary School', rating: 4.6, address: 'Bagayam, Vellore, Tamil Nadu 632002', description: 'Renowned institution emphasizing discipline, academics, and values-based education.' }
    ],
    restaurants: [
        { name: 'Darling Residency Restaurant', rating: 4.8, address: 'Officer’s Line, Vellore, Tamil Nadu 632001', description: 'Popular family restaurant serving Indian and continental cuisine.' },
        { name: 'Gingee Restaurant', rating: 4.7, address: 'Near CMC Hospital, Vellore, Tamil Nadu 632004', description: 'Famous for authentic South Indian meals and hygienic ambiance.' },
        { name: 'The Vellore Kitchen', rating: 4.6, address: 'Green Circle, Vellore, Tamil Nadu 632004', description: 'Modern multicuisine restaurant known for biryani, tandoori, and Chinese dishes.' },
        { name: 'Hundred’s Heritage', rating: 4.5, address: 'Katpadi Road, Vellore, Tamil Nadu 632007', description: 'Elegant dining experience offering traditional Tamil and North Indian delicacies.' }
    ],
    hospitals: [
        { name: 'Christian Medical College (CMC) Hospital', rating: 5.0, address: 'IDA Scudder Road, Vellore, Tamil Nadu 632004', description: 'One of India’s most prestigious hospitals known for world-class healthcare and research.' },
        { name: 'Naruvi Hospitals', rating: 4.8, address: 'Silk Mill Road, Vellore, Tamil Nadu 632006', description: 'Super-specialty hospital offering advanced treatments with global standards.' },
        { name: 'Sri Narayani Hospital & Research Centre', rating: 4.7, address: 'Thirumalaikodi, Vellore, Tamil Nadu 632055', description: 'Modern hospital combining spiritual care with medical excellence.' },
        { name: 'Government Vellore Medical College Hospital', rating: 4.6, address: 'Adukkamparai, Vellore, Tamil Nadu 632011', description: 'Major government-run hospital providing comprehensive healthcare services.' }
    ],
    touristSpots: [
        { name: 'Vellore Fort', rating: 4.9, address: 'Fort Road, Vellore, Tamil Nadu 632001', description: 'Historic 16th-century fort built by Vijayanagar kings, featuring a moat and temple.' },
        { name: 'Jalakandeswarar Temple', rating: 4.8, address: 'Inside Vellore Fort, Tamil Nadu 632001', description: 'Beautiful Dravidian-style temple dedicated to Lord Shiva with intricate carvings.' },
        { name: 'Sripuram Golden Temple', rating: 4.9, address: 'Thirumalaikodi, Vellore, Tamil Nadu 632055', description: 'Magnificent golden temple dedicated to Goddess Lakshmi Narayani, a spiritual marvel.' },
        { name: 'Amirthi Zoological Park', rating: 4.6, address: 'Amirthi, Vellore District, Tamil Nadu 632102', description: 'Eco-tourism park and mini-zoo ideal for family picnics and nature walks.' }
    ]
},
'erode': {
    schools: [
        { name: 'Bharathi Vidya Bhavan Matriculation Higher Secondary School', rating: 4.9, address: 'Perundurai Road, Erode, Tamil Nadu 638011', description: 'Renowned institution emphasizing academic excellence, discipline, and extracurricular development.' },
        { name: 'Velalar Vidyalayaa Senior Secondary School', rating: 4.8, address: 'Thindal, Erode, Tamil Nadu 638012', description: 'CBSE-affiliated school known for holistic education and modern teaching methods.' },
        { name: 'Cauvery Matriculation Higher Secondary School', rating: 4.7, address: 'Karungalpalayam, Erode, Tamil Nadu 638003', description: 'Focuses on conceptual learning with a student-centered environment.' },
        { name: 'Sri Vasavi Matriculation School', rating: 4.6, address: 'Brough Road, Erode, Tamil Nadu 638001', description: 'Respected private school offering well-balanced academics and moral instruction.' }
    ],
    restaurants: [
        { name: 'Hotel Sri Saravana Bhavan', rating: 4.8, address: 'Brough Road, Erode, Tamil Nadu 638001', description: 'Famous vegetarian restaurant serving authentic South Indian tiffin and meals.' },
        { name: 'Thindal Family Restaurant', rating: 4.7, address: 'Thindal, Erode, Tamil Nadu 638012', description: 'Popular spot for multi-cuisine dining with a cozy atmosphere.' },
        { name: 'Rangoli Restaurant', rating: 4.6, address: 'Perundurai Road, Erode, Tamil Nadu 638011', description: 'Modern dining place serving North Indian, Chinese, and continental dishes.' },
        { name: 'Hotel Sivaranjani', rating: 4.5, address: 'Kasturi Theatre Road, Erode, Tamil Nadu 638001', description: 'Well-known restaurant offering delicious vegetarian and non-vegetarian meals.' }
    ],
    hospitals: [
        { name: 'KMCH Erode Speciality Hospital', rating: 4.9, address: 'Perundurai Road, Erode, Tamil Nadu 638011', description: 'Leading multi-specialty hospital providing advanced medical care and diagnostics.' },
        { name: 'Lotus Hospitals', rating: 4.8, address: 'Thindal, Erode, Tamil Nadu 638012', description: 'Reputed hospital known for maternity and child care services.' },
        { name: 'Erode Trust Hospital', rating: 4.7, address: 'Brough Road, Erode, Tamil Nadu 638001', description: 'Charitable hospital offering quality treatment at affordable cost.' },
        { name: 'Government Headquarters Hospital Erode', rating: 4.6, address: 'Perundurai Road, Erode, Tamil Nadu 638011', description: 'Major government hospital providing 24x7 emergency and general medical services.' }
    ],
    touristSpots: [
        { name: 'Bannari Amman Temple', rating: 4.9, address: 'Bannari, Erode District, Tamil Nadu 638401', description: 'Famous temple dedicated to Goddess Mariamman, located near Sathyamangalam forests.' },
        { name: 'Bhavani Sangameshwarar Temple', rating: 4.8, address: 'Bhavani, Erode District, Tamil Nadu 638301', description: 'Historic temple situated at the confluence of rivers Bhavani, Cauvery, and Amudha.' },
        { name: 'Vellode Bird Sanctuary', rating: 4.7, address: 'Vellode, Erode District, Tamil Nadu 638112', description: 'Scenic bird sanctuary attracting migratory species and nature lovers.' },
        { name: 'Kodiveri Dam', rating: 4.6, address: 'Gobichettipalayam, Erode District, Tamil Nadu 638452', description: 'Popular picnic destination with waterfalls, boating, and lush surroundings.' }
    ]
},
'tiruvannamalai': {
    schools: [
        { name: 'Shree Vidyalaya Matriculation Higher Secondary School', rating: 4.9, address: 'Polur Road, Tiruvannamalai, Tamil Nadu 606601', description: 'Leading private institution emphasizing academic excellence and co-curricular activities.' },
        { name: 'Sishya School', rating: 4.8, address: 'Vengikkal, Tiruvannamalai, Tamil Nadu 606604', description: 'Reputed CBSE school known for interactive learning and discipline.' },
        { name: 'Sacred Heart Matriculation Higher Secondary School', rating: 4.7, address: 'Mathalangulam, Tiruvannamalai, Tamil Nadu 606601', description: 'Established school providing holistic education with moral values.' },
        { name: 'St. Joseph’s Matriculation Higher Secondary School', rating: 4.6, address: 'Chengam Road, Tiruvannamalai, Tamil Nadu 606601', description: 'Well-known institution focusing on academics and personality development.' }
    ],
    restaurants: [
        { name: 'Aakash Restaurant', rating: 4.8, address: 'Near Annamalai Temple, Tiruvannamalai, Tamil Nadu 606601', description: 'Popular vegetarian restaurant serving authentic South Indian dishes.' },
        { name: 'Hotel Himalaya', rating: 4.7, address: 'Chengam Road, Tiruvannamalai, Tamil Nadu 606601', description: 'Well-known family restaurant offering Indian and Chinese cuisines.' },
        { name: 'V2 Veg Restaurant', rating: 4.6, address: 'Polur Road, Tiruvannamalai, Tamil Nadu 606601', description: 'Casual dining restaurant famous for dosas and thalis.' },
        { name: 'Hotel Ramakrishna', rating: 4.5, address: 'Near Bus Stand, Tiruvannamalai, Tamil Nadu 606601', description: 'Classic South Indian eatery serving traditional meals and tiffin items.' }
    ],
    hospitals: [
        { name: 'Government Medical College & Hospital Tiruvannamalai', rating: 4.9, address: 'Chengam Road, Tiruvannamalai, Tamil Nadu 606601', description: 'Major government hospital providing emergency and specialized care.' },
        { name: 'Arunai Hospital', rating: 4.8, address: 'Polur Road, Tiruvannamalai, Tamil Nadu 606601', description: 'Modern multi-specialty hospital known for surgical and maternity care.' },
        { name: 'Annai Hospital', rating: 4.7, address: 'Mathalangulam, Tiruvannamalai, Tamil Nadu 606601', description: 'Well-equipped private hospital offering general and emergency services.' },
        { name: 'Sri Ramana Maharshi Hospital', rating: 4.6, address: 'Girivalam Road, Tiruvannamalai, Tamil Nadu 606601', description: 'Healthcare center known for compassionate care and community outreach.' }
    ],
    touristSpots: [
        { name: 'Arunachaleswarar Temple', rating: 5.0, address: 'Girivalam Road, Tiruvannamalai, Tamil Nadu 606601', description: 'One of the largest Shiva temples in India, known for the sacred Annamalai Hill and Deepam festival.' },
        { name: 'Sri Ramana Ashram', rating: 4.9, address: 'Chengam Road, Tiruvannamalai, Tamil Nadu 606601', description: 'Spiritual retreat dedicated to the teachings of Sri Ramana Maharshi, attracting devotees worldwide.' },
        { name: 'Annamalai Hill (Girivalam Path)', rating: 4.8, address: 'Girivalam Path, Tiruvannamalai, Tamil Nadu 606601', description: 'Sacred hill around which devotees perform a spiritual circumambulation walk.' },
        { name: 'Sathanur Dam', rating: 4.7, address: 'Near Thandarampet, Tiruvannamalai District, Tamil Nadu 606703', description: 'Beautiful dam site offering boating, a park, and scenic views for picnics.' }
    ]
},
'hosur': {
    schools: [
        { name: 'TVS Academy', rating: 4.9, address: 'Denkanikottai Road, Hosur, Tamil Nadu 635109', description: 'Premier CBSE school focusing on holistic education, innovation, and co-curricular excellence.' },
        { name: 'Advaith International Academy', rating: 4.8, address: 'Bagalur Road, Hosur, Tamil Nadu 635124', description: 'International school offering CBSE and Cambridge curriculum with modern infrastructure.' },
        { name: 'St. Joseph’s Matriculation Higher Secondary School', rating: 4.7, address: 'Rayakottai Road, Hosur, Tamil Nadu 635109', description: 'Well-reputed institution emphasizing strong academics and discipline.' },
        { name: 'Sri Vidhya Mandir Matriculation Higher Secondary School', rating: 4.6, address: 'Mathigiri, Hosur, Tamil Nadu 635110', description: 'Popular school known for experienced faculty and academic performance.' }
    ],
    restaurants: [
        { name: 'Hotel Dhananjay', rating: 4.8, address: 'Krishnagiri Road, Hosur, Tamil Nadu 635109', description: 'Elegant multicuisine restaurant known for its South Indian and North Indian delicacies.' },
        { name: 'Hotel Renuga', rating: 4.7, address: 'Near Bus Stand, Hosur, Tamil Nadu 635109', description: 'Famous for authentic Tamil meals and biryani in a family-friendly setting.' },
        { name: 'Krishna Bhavan', rating: 4.6, address: 'Denkanikottai Road, Hosur, Tamil Nadu 635109', description: 'Well-known vegetarian restaurant offering traditional Tamil Nadu dishes.' },
        { name: 'Capsicum Restaurant', rating: 4.5, address: 'Bagalur Road, Hosur, Tamil Nadu 635124', description: 'Trendy dining spot offering continental, Chinese, and tandoori specialties.' }
    ],
    hospitals: [
        { name: 'Ashok Hospital', rating: 4.8, address: 'Krishnagiri Road, Hosur, Tamil Nadu 635109', description: 'Leading multi-specialty hospital offering advanced treatments and emergency care.' },
        { name: 'Sri Venkateswara Hospital', rating: 4.7, address: 'Denkanikottai Road, Hosur, Tamil Nadu 635109', description: 'Well-known private hospital with experienced doctors and modern facilities.' },
        { name: 'SP Hospital', rating: 4.6, address: 'Bagalur Road, Hosur, Tamil Nadu 635124', description: 'Trusted hospital providing general medicine, surgery, and diagnostic services.' },
        { name: 'Government Hospital Hosur', rating: 4.5, address: 'Rayakottai Road, Hosur, Tamil Nadu 635109', description: 'Main government-run hospital offering affordable and reliable healthcare.' }
    ],
    touristSpots: [
        { name: 'Kelavarapalli Dam', rating: 4.9, address: 'Kelavarapalli, Hosur, Tamil Nadu 635110', description: 'Beautiful dam surrounded by hills, ideal for picnics, boating, and nature walks.' },
        { name: 'Chandira Choodeswarar Temple', rating: 4.8, address: 'Krishnagiri Road, Hosur, Tamil Nadu 635109', description: 'Ancient hilltop temple dedicated to Lord Shiva with panoramic views of Hosur.' },
        { name: 'Rayakottai Fort', rating: 4.7, address: 'Rayakottai, near Hosur, Tamil Nadu 635116', description: 'Historic fort offering trekking opportunities and scenic beauty.' },
        { name: 'Government Horticulture Garden', rating: 4.6, address: 'Denkanikottai Road, Hosur, Tamil Nadu 635109', description: 'Lush garden showcasing diverse plant species and serene walking trails.' }
    ]
},
'cuddalore': {
    schools: [
        { name: 'St. Joseph’s Higher Secondary School', rating: 4.9, address: 'Thirupapuliyur, Cuddalore, Tamil Nadu 607002', description: 'Historic institution offering excellent academics and co-curricular activities.' },
        { name: 'Vivekananda Matriculation Higher Secondary School', rating: 4.8, address: 'Imperial Road, Cuddalore, Tamil Nadu 607001', description: 'Renowned private school focusing on holistic education and values.' },
        { name: 'Sri Venkateswara Matriculation Higher Secondary School', rating: 4.7, address: 'Manjakuppam, Cuddalore, Tamil Nadu 607001', description: 'Well-known school providing modern learning environment with experienced teachers.' },
        { name: 'The Study L’Ecole Internationale', rating: 4.6, address: 'Alichikudi, Cuddalore, Tamil Nadu 607003', description: 'International school offering CBSE curriculum and global teaching standards.' }
    ],
    restaurants: [
        { name: 'Hotel Suriyapriya', rating: 4.8, address: 'Imperial Road, Cuddalore, Tamil Nadu 607001', description: 'Popular restaurant serving vegetarian South Indian meals and snacks.' },
        { name: 'Hotel Durga Bhavan', rating: 4.7, address: 'Thirupapuliyur, Cuddalore, Tamil Nadu 607002', description: 'Famous eatery known for its traditional Tamil meals and tiffin varieties.' },
        { name: 'Mithra Restaurant', rating: 4.6, address: 'Manjakuppam, Cuddalore, Tamil Nadu 607001', description: 'Casual dining spot offering Indian and Chinese cuisine in a relaxed setting.' },
        { name: 'Hotel RKR Residency Restaurant', rating: 4.5, address: 'Imperial Road, Cuddalore, Tamil Nadu 607001', description: 'Multicuisine family restaurant known for biryani, paneer dishes, and friendly service.' }
    ],
    hospitals: [
        { name: 'Government Headquarters Hospital Cuddalore', rating: 4.8, address: 'Thirupapuliyur, Cuddalore, Tamil Nadu 607002', description: 'Main government hospital offering general and emergency medical services.' },
        { name: 'Krishna Hospital', rating: 4.7, address: 'Imperial Road, Cuddalore, Tamil Nadu 607001', description: 'Private multi-specialty hospital providing quality healthcare and diagnostics.' },
        { name: 'Ezhil Hospital', rating: 4.6, address: 'Manjakuppam, Cuddalore, Tamil Nadu 607001', description: 'Well-established hospital known for maternity and pediatric care.' },
        { name: 'Raja Muthaiah Medical College Hospital', rating: 4.5, address: 'Annamalai Nagar, Cuddalore, Tamil Nadu 608002', description: 'University hospital providing advanced treatments and medical education.' }
    ],
    touristSpots: [
        { name: 'Silver Beach', rating: 4.9, address: 'Devanampattinam, Cuddalore, Tamil Nadu 607003', description: 'One of the longest beaches in Asia, known for its scenic beauty and peaceful environment.' },
        { name: 'Fort St. David', rating: 4.8, address: 'Devanampattinam, Cuddalore, Tamil Nadu 607003', description: 'Historic British-era fort overlooking the Bay of Bengal.' },
        { name: 'Padaleeswarar Temple', rating: 4.7, address: 'Thirupapuliyur, Cuddalore, Tamil Nadu 607002', description: 'Ancient temple dedicated to Lord Shiva, showcasing classic Dravidian architecture.' },
        { name: 'Pichavaram Mangrove Forest', rating: 5.0, address: 'Pichavaram, near Chidambaram, Cuddalore District, Tamil Nadu 608102', description: 'Famous mangrove forest offering boating through narrow waterways — a must-visit eco-destination.' }
    ]
},
'kanchipuram': {
    schools: [
        { name: 'Kanchi Sankara Academy', rating: 4.9, address: 'Ennaikaran, Kanchipuram, Tamil Nadu 631501', description: 'Reputed school emphasizing traditional values and modern education.' },
        { name: 'Sunbeam Matriculation Higher Secondary School', rating: 4.8, address: 'Pillaiyarpalayam, Kanchipuram, Tamil Nadu 631501', description: 'Leading institution with strong academic track record and extracurricular programs.' },
        { name: 'Kanchi Public School', rating: 4.7, address: 'Chinna Kanchipuram, Tamil Nadu 631502', description: 'CBSE-affiliated school focusing on conceptual learning and holistic growth.' },
        { name: 'Cambridge Matriculation School', rating: 4.6, address: 'Pillaiyarpalayam, Kanchipuram, Tamil Nadu 631501', description: 'Well-known school providing student-centered learning with experienced faculty.' }
    ],
    restaurants: [
        { name: 'A2B - Adyar Ananda Bhavan', rating: 4.9, address: 'Vellore Road, Kanchipuram, Tamil Nadu 631501', description: 'Popular vegetarian restaurant known for authentic South Indian dishes.' },
        { name: 'Sangeetha Veg Restaurant', rating: 4.8, address: 'Ennaikaran, Kanchipuram, Tamil Nadu 631501', description: 'Family restaurant serving traditional Tamil meals and filter coffee.' },
        { name: 'Sri Bhavan Restaurant', rating: 4.7, address: 'Gandhi Road, Kanchipuram, Tamil Nadu 631501', description: 'Casual eatery offering North and South Indian cuisines in a homely atmosphere.' },
        { name: 'Hotel Saravana Bhavan', rating: 4.6, address: 'Near Bus Stand, Kanchipuram, Tamil Nadu 631501', description: 'Renowned chain offering authentic vegetarian meals and snacks.' }
    ],
    hospitals: [
        { name: 'Government District Headquarters Hospital', rating: 4.8, address: 'Pillaiyarpalayam, Kanchipuram, Tamil Nadu 631501', description: 'Main government hospital providing general and specialized medical care.' },
        { name: 'Meenakshi Medical College Hospital & Research Institute', rating: 4.9, address: 'Enathur, Kanchipuram, Tamil Nadu 631552', description: 'Large teaching hospital offering multi-specialty services and advanced care.' },
        { name: 'Sundaram Medical Foundation', rating: 4.7, address: 'Pillaiyarpalayam, Kanchipuram, Tamil Nadu 631501', description: 'Well-equipped hospital providing quality healthcare and diagnostics.' },
        { name: 'Kanchi Kamakoti Childs Trust Hospital', rating: 4.6, address: 'Kanchipuram, Tamil Nadu 631501', description: 'Specialized pediatric hospital with experienced doctors and modern facilities.' }
    ],
    touristSpots: [
        { name: 'Kailasanathar Temple', rating: 4.9, address: 'Pillaiyarpalayam, Kanchipuram, Tamil Nadu 631501', description: 'Ancient stone temple built by Pallavas, dedicated to Lord Shiva, known for its intricate carvings.' },
        { name: 'Ekambareswarar Temple', rating: 4.9, address: 'Periya Kanchipuram, Tamil Nadu 631502', description: 'One of the largest temples in Tamil Nadu, showcasing Dravidian architecture and a sacred mango tree.' },
        { name: 'Kamakshi Amman Temple', rating: 5.0, address: 'Nellukara Street, Kanchipuram, Tamil Nadu 631501', description: 'Famous Shakti Peetha dedicated to Goddess Kamakshi, attracting thousands of pilgrims daily.' },
        { name: 'Varadharaja Perumal Temple', rating: 4.8, address: 'Vishnu Kanchi, Kanchipuram, Tamil Nadu 631501', description: 'Magnificent Vishnu temple known for its golden lizard sculpture and grand architecture.' }
    ]
},
'thanjavur': {
    schools: [
        { name: 'St. Joseph’s Girls Higher Secondary School', rating: 4.9, address: 'Kallarai Street, Thanjavur, Tamil Nadu 613001', description: 'Renowned institution with a legacy of excellence in academics and discipline.' },
        { name: 'Good Shepherd Matriculation Higher Secondary School', rating: 4.8, address: 'Pudukottai Road, Thanjavur, Tamil Nadu 613007', description: 'Prestigious school emphasizing academic excellence and value-based education.' },
        { name: 'Vivekananda Matriculation School', rating: 4.7, address: 'Medical College Road, Thanjavur, Tamil Nadu 613004', description: 'Well-known school focusing on holistic education and co-curricular development.' },
        { name: 'Kendriya Vidyalaya Thanjavur', rating: 4.6, address: 'Air Force Station, Thanjavur, Tamil Nadu 613005', description: 'Central government school providing CBSE curriculum with modern facilities.' }
    ],
    restaurants: [
        { name: 'Sathars Restaurant', rating: 4.9, address: 'Railway Station Road, Thanjavur, Tamil Nadu 613001', description: 'Famous multi-cuisine restaurant known for biryani and Chettinad delicacies.' },
        { name: 'A2B - Adyar Ananda Bhavan', rating: 4.8, address: 'Medical College Road, Thanjavur, Tamil Nadu 613004', description: 'Vegetarian restaurant serving authentic South Indian meals and sweets.' },
        { name: 'Thillana Restaurant', rating: 4.7, address: 'Trichy Road, Thanjavur, Tamil Nadu 613007', description: 'Elegant family restaurant offering Indian and Chinese cuisines.' },
        { name: 'Hotel Gnanam Restaurant', rating: 4.6, address: 'Anna Salai, Thanjavur, Tamil Nadu 613001', description: 'Popular spot serving vegetarian thalis and North Indian dishes.' }
    ],
    hospitals: [
        { name: 'Thanjavur Medical College Hospital', rating: 4.9, address: 'Medical College Road, Thanjavur, Tamil Nadu 613004', description: 'Major government hospital providing multi-specialty healthcare and emergency services.' },
        { name: 'Apollo Speciality Hospitals', rating: 4.8, address: 'Trichy Road, Thanjavur, Tamil Nadu 613007', description: 'Private hospital known for advanced diagnostics and specialized treatments.' },
        { name: 'Vasan Eye Care Hospital', rating: 4.7, address: 'Rajappa Nagar, Thanjavur, Tamil Nadu 613005', description: 'Leading eye hospital offering cataract, LASIK, and vision correction services.' },
        { name: 'Sahana Hospital', rating: 4.6, address: 'Medical College Road, Thanjavur, Tamil Nadu 613004', description: 'Trusted hospital providing maternity and pediatric care.' }
    ],
    touristSpots: [
        { name: 'Brihadeeswarar Temple', rating: 5.0, address: 'Sivaganga Fort, Thanjavur, Tamil Nadu 613001', description: 'UNESCO World Heritage Site and architectural marvel built by Raja Raja Chola I.' },
        { name: 'Thanjavur Maratha Palace', rating: 4.8, address: 'E Main St, Thanjavur, Tamil Nadu 613009', description: 'Historic palace complex housing art galleries and royal artifacts.' },
        { name: 'Saraswathi Mahal Library', rating: 4.7, address: 'E Main St, Thanjavur, Tamil Nadu 613009', description: 'Ancient library preserving rare palm-leaf manuscripts and old texts.' },
        { name: 'Sivaganga Park', rating: 4.6, address: 'Near Big Temple, Thanjavur, Tamil Nadu 613001', description: 'Popular recreational park ideal for families and children.' }
    ]
},
'dindigul': {
    schools: [
        { name: 'St. Mary’s Higher Secondary School', rating: 4.9, address: 'Main Road, Dindigul, Tamil Nadu 624001', description: 'One of the oldest and most reputed schools in Dindigul offering excellent academics and discipline.' },
        { name: 'Vellammal Matriculation Higher Secondary School', rating: 4.8, address: 'Oddanchatram Road, Dindigul, Tamil Nadu 624002', description: 'Popular private school emphasizing holistic education and extracurricular excellence.' },
        { name: 'Kendriya Vidyalaya Dindigul', rating: 4.7, address: 'Begampur, Dindigul, Tamil Nadu 624001', description: 'Central government school affiliated to CBSE, providing quality education.' },
        { name: 'Vidya Mandir Matriculation School', rating: 4.6, address: 'Palani Road, Dindigul, Tamil Nadu 624003', description: 'Modern school promoting conceptual learning and moral values.' }
    ],
    restaurants: [
        { name: 'Venu Biriyani Hotel', rating: 5.0, address: 'Lock Road, Dindigul, Tamil Nadu 624001', description: 'Legendary biryani restaurant famous across Tamil Nadu for its authentic Dindigul-style mutton biryani.' },
        { name: 'Thalappakatti Restaurant', rating: 4.9, address: 'Palani Road, Dindigul, Tamil Nadu 624003', description: 'Iconic chain originating in Dindigul, offering signature biryanis and South Indian dishes.' },
        { name: 'A2B - Adyar Ananda Bhavan', rating: 4.7, address: 'NH-7, Dindigul, Tamil Nadu 624004', description: 'Pure vegetarian restaurant serving traditional South Indian meals and snacks.' },
        { name: 'Sree Sabari Restaurant', rating: 4.6, address: 'Bus Stand Road, Dindigul, Tamil Nadu 624001', description: 'Popular family restaurant offering Indian and Chinese cuisine in a clean setting.' }
    ],
    hospitals: [
        { name: 'Government Headquarters Hospital Dindigul', rating: 4.8, address: 'Begampur, Dindigul, Tamil Nadu 624001', description: 'Main government hospital offering general and emergency medical services.' },
        { name: 'Vel Hospital', rating: 4.7, address: 'Palani Road, Dindigul, Tamil Nadu 624003', description: 'Trusted private hospital known for quality healthcare and maternity services.' },
        { name: 'Aravind Eye Hospital', rating: 4.9, address: 'Thadicombu Road, Dindigul, Tamil Nadu 624001', description: 'Renowned eye care center offering specialized treatments and surgeries.' },
        { name: 'Meenakshi Mission Clinic', rating: 4.6, address: 'NH-7, Dindigul, Tamil Nadu 624004', description: 'Multi-specialty clinic providing general and specialist medical consultations.' }
    ],
    touristSpots: [
        { name: 'Dindigul Rock Fort', rating: 5.0, address: 'Rock Fort, Dindigul, Tamil Nadu 624001', description: 'Historic hill fort offering panoramic views and insight into Tamil Nadu’s ancient architecture.' },
        { name: 'Sirumalai Hills', rating: 4.9, address: 'Sirumalai, near Dindigul, Tamil Nadu 624003', description: 'Scenic hill station known for its lush greenery and peaceful environment.' },
        { name: 'Begampur Mosque', rating: 4.7, address: 'Begampur, Dindigul, Tamil Nadu 624001', description: 'Ancient mosque reflecting Indo-Islamic architectural beauty.' },
        { name: 'Silver Cascade Falls', rating: 4.8, address: 'On the way to Kodaikanal, near Dindigul, Tamil Nadu 624101', description: 'Picturesque waterfall that attracts tourists traveling to Kodaikanal.' }
    ]
},
'tiruvannamalai': {
    schools: [
        { name: 'St. Mary’s Matriculation Higher Secondary School', rating: 4.9, address: 'Vengikkal, Tiruvannamalai, Tamil Nadu 606604', description: 'Prestigious school offering quality education and value-based learning environment.' },
        { name: 'Sishya Matriculation Higher Secondary School', rating: 4.8, address: 'Polur Road, Tiruvannamalai, Tamil Nadu 606601', description: 'Reputed private school focusing on academic excellence and extracurricular activities.' },
        { name: 'Kendriya Vidyalaya Tiruvannamalai', rating: 4.7, address: 'Chengam Road, Tiruvannamalai, Tamil Nadu 606601', description: 'Central government school affiliated to CBSE, offering holistic education.' },
        { name: 'Sunbeam School', rating: 4.6, address: 'Mathalangulam, Tiruvannamalai, Tamil Nadu 606604', description: 'Modern institution providing excellent facilities and all-round development.' }
    ],
    restaurants: [
        { name: 'Hotel Ramakrishna', rating: 4.9, address: 'Girivalam Road, Tiruvannamalai, Tamil Nadu 606601', description: 'Popular vegetarian restaurant known for authentic Tamil meals and South Indian tiffin.' },
        { name: 'A2B - Adyar Ananda Bhavan', rating: 4.8, address: 'Chengam Road, Tiruvannamalai, Tamil Nadu 606601', description: 'Renowned vegetarian restaurant chain offering traditional Tamil dishes and sweets.' },
        { name: 'The Dreaming Tree', rating: 4.7, address: 'Ramana Nagar, Tiruvannamalai, Tamil Nadu 606603', description: 'Peaceful café serving continental and Indian food, popular among travelers and devotees.' },
        { name: 'Hotel Nala Residency Restaurant', rating: 4.6, address: 'Chengam Road, Tiruvannamalai, Tamil Nadu 606601', description: 'Multicuisine restaurant offering South Indian, North Indian, and Chinese dishes.' }
    ],
    hospitals: [
        { name: 'Government District Headquarters Hospital', rating: 4.8, address: 'Vengikkal, Tiruvannamalai, Tamil Nadu 606604', description: 'Main government hospital providing emergency, surgical, and maternity services.' },
        { name: 'Arunai Hospital', rating: 4.7, address: 'Mathalangulam, Tiruvannamalai, Tamil Nadu 606604', description: 'Private multi-specialty hospital known for quality healthcare and experienced staff.' },
        { name: 'Sri Ramana Hospital', rating: 4.6, address: 'Girivalam Road, Tiruvannamalai, Tamil Nadu 606601', description: 'Trusted healthcare center providing general and specialized treatments.' },
        { name: 'Arunachala Eye Hospital', rating: 4.5, address: 'Polur Road, Tiruvannamalai, Tamil Nadu 606601', description: 'Specialized hospital providing advanced eye care and surgery facilities.' }
    ],
    touristSpots: [
        { name: 'Arunachaleswarar Temple', rating: 5.0, address: 'Girivalam Road, Tiruvannamalai, Tamil Nadu 606601', description: 'Famous temple dedicated to Lord Shiva, one of the Pancha Bhoota Stalas representing fire (Agni).' },
        { name: 'Annamalai Hill (Arunachala)', rating: 4.9, address: 'Near Temple, Tiruvannamalai, Tamil Nadu 606601', description: 'Sacred hill for devotees who perform the Girivalam pilgrimage walk around it.' },
        { name: 'Sri Ramana Ashram', rating: 4.9, address: 'Ramana Nagar, Tiruvannamalai, Tamil Nadu 606603', description: 'Spiritual ashram founded by Sri Ramana Maharshi, attracting visitors from around the world.' },
        { name: 'Sathanur Dam', rating: 4.8, address: 'Sathanur, near Tiruvannamalai, Tamil Nadu 606703', description: 'Beautiful dam and picnic spot surrounded by hills, ideal for boating and relaxation.' }
    ]
},
'pudukkottai': {
    schools: [
        { name: 'St. Joseph’s Higher Secondary School', rating: 4.9, address: 'East 3rd Street, Pudukkottai, Tamil Nadu 622001', description: 'Historic institution known for academic excellence and co-curricular achievements.' },
        { name: 'Amala Matriculation Higher Secondary School', rating: 4.8, address: 'Keeranur Road, Pudukkottai, Tamil Nadu 622002', description: 'Well-known school focusing on value-based education and discipline.' },
        { name: 'Kendriya Vidyalaya Pudukkottai', rating: 4.7, address: 'Near Government Polytechnic, Pudukkottai, Tamil Nadu 622001', description: 'Central government school offering CBSE curriculum and modern teaching methods.' },
        { name: 'Mount Zion Matriculation Higher Secondary School', rating: 4.6, address: 'Pilivalam, Pudukkottai, Tamil Nadu 622507', description: 'Renowned private school providing global-standard education with advanced infrastructure.' }
    ],
    restaurants: [
        { name: 'Hotel Aryaas', rating: 4.9, address: 'East Main Road, Pudukkottai, Tamil Nadu 622001', description: 'Popular vegetarian restaurant known for South Indian meals and snacks.' },
        { name: 'Sathya Bhavan', rating: 4.8, address: 'West Main Road, Pudukkottai, Tamil Nadu 622001', description: 'Family restaurant serving authentic Tamil dishes and quick bites.' },
        { name: 'A2B - Adyar Ananda Bhavan', rating: 4.7, address: 'Trichy Road, Pudukkottai, Tamil Nadu 622002', description: 'Pure vegetarian restaurant chain serving traditional Tamil food and sweets.' },
        { name: 'Vasantha Bhavan', rating: 4.6, address: 'Bus Stand Road, Pudukkottai, Tamil Nadu 622001', description: 'Casual dining restaurant offering both vegetarian and non-vegetarian dishes.' }
    ],
    hospitals: [
        { name: 'Government District Headquarters Hospital', rating: 4.8, address: 'Near Court Complex, Pudukkottai, Tamil Nadu 622001', description: 'Main government hospital offering emergency and general medical care.' },
        { name: 'Jeyarani Hospital', rating: 4.7, address: 'East Main Street, Pudukkottai, Tamil Nadu 622001', description: 'Private multi-specialty hospital known for maternity and surgical services.' },
        { name: 'Sundaram Hospital', rating: 4.6, address: 'Keeranur Road, Pudukkottai, Tamil Nadu 622002', description: 'Healthcare center providing diagnostics and general treatments.' },
        { name: 'Vasan Eye Care Hospital', rating: 4.5, address: 'Trichy Road, Pudukkottai, Tamil Nadu 622002', description: 'Specialized eye hospital offering advanced vision treatments.' }
    ],
    touristSpots: [
        { name: 'Thirumayam Fort', rating: 4.9, address: 'Thirumayam, Pudukkottai District, Tamil Nadu 622507', description: 'Historic fort built by Vijaya Raghunatha Sethupathi, offering panoramic hill views.' },
        { name: 'Sittanavasal Cave', rating: 5.0, address: 'Sittanavasal, Pudukkottai District, Tamil Nadu 622101', description: 'Ancient Jain cave temple featuring remarkable rock-cut architecture and murals.' },
        { name: 'Avudaiyar Kovil Temple', rating: 4.8, address: 'Avudaiyar Kovil, Pudukkottai District, Tamil Nadu 622102', description: 'Unique Shiva temple famous for its intricate stone carvings and spiritual significance.' },
        { name: 'Kudumiyanmalai Temple', rating: 4.7, address: 'Kudumiyanmalai, Pudukkottai District, Tamil Nadu 622104', description: 'Beautiful hilltop temple dedicated to Lord Shiva, known for musical inscriptions.' }
    ]
},
'nagapattinam': {
    schools: [
        { name: 'St. Joseph’s Higher Secondary School', rating: 4.9, address: 'Church Street, Nagapattinam, Tamil Nadu 611001', description: 'Well-established institution offering quality education with moral and cultural values.' },
        { name: 'Good Shepherd Matriculation Higher Secondary School', rating: 4.8, address: 'Velippalayam, Nagapattinam, Tamil Nadu 611002', description: 'Reputed private school focusing on academic excellence and extracurricular growth.' },
        { name: 'Kendriya Vidyalaya Nagapattinam', rating: 4.7, address: 'Near Collectorate, Nagapattinam, Tamil Nadu 611001', description: 'Central government school following CBSE curriculum with modern facilities.' },
        { name: 'Arokia Matha Matriculation Higher Secondary School', rating: 4.6, address: 'Nagore Road, Nagapattinam, Tamil Nadu 611002', description: 'Popular school offering co-educational learning and skill-based training.' }
    ],
    restaurants: [
        { name: 'Hotel Seagate', rating: 4.9, address: 'Nagore Road, Nagapattinam, Tamil Nadu 611002', description: 'Renowned restaurant known for its fresh seafood and South Indian meals.' },
        { name: 'A2B - Adyar Ananda Bhavan', rating: 4.8, address: 'Main Road, Nagapattinam, Tamil Nadu 611001', description: 'Pure vegetarian chain restaurant offering traditional Tamil cuisine and sweets.' },
        { name: 'Hotel Anandha Bhavan', rating: 4.7, address: 'Near Bus Stand, Nagapattinam, Tamil Nadu 611001', description: 'Popular vegetarian restaurant serving meals, snacks, and filter coffee.' },
        { name: 'Hotel Sagar', rating: 4.6, address: 'Church Street, Nagapattinam, Tamil Nadu 611001', description: 'Casual dining restaurant offering Indian, Chinese, and seafood dishes.' }
    ],
    hospitals: [
        { name: 'Government District Headquarters Hospital', rating: 4.8, address: 'Collectorate Road, Nagapattinam, Tamil Nadu 611001', description: 'Main government hospital offering 24-hour medical and emergency care.' },
        { name: 'Our Lady of Health Hospital', rating: 4.7, address: 'Velippalayam, Nagapattinam, Tamil Nadu 611002', description: 'Multi-specialty hospital known for maternity and surgical care.' },
        { name: 'Sri Manakula Vinayagar Hospital', rating: 4.6, address: 'Nagore Road, Nagapattinam, Tamil Nadu 611002', description: 'Private hospital providing diagnostics, general medicine, and specialist consultations.' },
        { name: 'Vasan Eye Care Hospital', rating: 4.5, address: 'Main Road, Nagapattinam, Tamil Nadu 611001', description: 'Specialized eye care center offering advanced vision treatments and surgery.' }
    ],
    touristSpots: [
        { name: 'Nagore Dargah', rating: 5.0, address: 'Nagore, Nagapattinam District, Tamil Nadu 611002', description: 'Famous Islamic shrine attracting devotees of all faiths, known for its annual Urs festival.' },
        { name: 'Velankanni Church (Basilica of Our Lady of Good Health)', rating: 5.0, address: 'Velankanni, Nagapattinam District, Tamil Nadu 611111', description: 'World-renowned Christian pilgrimage site known as the “Lourdes of the East.”' },
        { name: 'Soundararaja Perumal Temple', rating: 4.8, address: 'Nagapattinam, Tamil Nadu 611001', description: 'Ancient Vishnu temple showcasing rich Dravidian architecture and history.' },
        { name: 'Kodiakarai (Point Calimere)', rating: 4.9, address: 'Kodiakarai, Nagapattinam District, Tamil Nadu 614807', description: 'Coastal wildlife sanctuary famous for migratory birds, blackbucks, and scenic beaches.' }
    ]
},
'karur': {
    schools: [
        { name: 'Cheran Matriculation Higher Secondary School', rating: 4.9, address: 'Thanthonimalai, Karur, Tamil Nadu 639005', description: 'Prestigious school focusing on academic excellence and holistic development.' },
        { name: 'Vikas Vidyalaya Matriculation Higher Secondary School', rating: 4.8, address: 'Chellandipalayam, Karur, Tamil Nadu 639002', description: 'Modern school offering CBSE-based curriculum with advanced learning facilities.' },
        { name: 'Kendriya Vidyalaya Karur', rating: 4.7, address: 'Rasipuram Road, Karur, Tamil Nadu 639001', description: 'Central government-run school providing quality education with co-curricular focus.' },
        { name: 'Bharani Park Matriculation Higher Secondary School', rating: 4.7, address: 'Andankoil East, Karur, Tamil Nadu 639002', description: 'Reputed private institution emphasizing science, technology, and innovation.' }
    ],
    restaurants: [
        { name: 'Hotel Hemala', rating: 4.9, address: 'Bypass Road, Karur, Tamil Nadu 639002', description: 'Upscale restaurant offering South Indian, North Indian, and Chinese cuisines.' },
        { name: 'Sri Krishna Bhavan', rating: 4.8, address: 'Covai Road, Karur, Tamil Nadu 639001', description: 'Vegetarian restaurant popular for traditional Tamil Nadu meals.' },
        { name: 'A2B - Adyar Ananda Bhavan', rating: 4.7, address: 'Andankoil East, Karur, Tamil Nadu 639002', description: 'Renowned vegetarian restaurant chain serving authentic South Indian food.' },
        { name: 'Hotel Sree Annapoorna', rating: 4.6, address: 'Trichy Main Road, Karur, Tamil Nadu 639001', description: 'Well-known for its dosa varieties, coffee, and family-friendly atmosphere.' }
    ],
    hospitals: [
        { name: 'Government Headquarters Hospital', rating: 4.8, address: 'Thanthonimalai, Karur, Tamil Nadu 639005', description: 'Main government hospital providing emergency and multi-specialty medical care.' },
        { name: 'Vijaya Hospital', rating: 4.7, address: 'Old Dindigul Road, Karur, Tamil Nadu 639001', description: 'Private hospital specializing in general medicine and surgery.' },
        { name: 'Apollo Hospitals Karur', rating: 4.6, address: 'Trichy Road, Karur, Tamil Nadu 639002', description: 'Multi-specialty hospital with advanced diagnostic and surgical facilities.' },
        { name: 'Arul Hospital', rating: 4.5, address: 'Bypass Road, Karur, Tamil Nadu 639002', description: 'Trusted local hospital offering maternity and pediatric services.' }
    ],
    touristSpots: [
        { name: 'Kalyana Pasupatheeswarar Temple', rating: 5.0, address: 'Karur, Tamil Nadu 639001', description: 'Historic Shiva temple known for its architectural beauty and spiritual significance.' },
        { name: 'Pugalur Falls', rating: 4.9, address: 'Pugalur, Karur District, Tamil Nadu 639113', description: 'Natural waterfall surrounded by lush greenery and scenic landscapes.' },
        { name: 'Vennaimalai Temple', rating: 4.8, address: 'Vennaimalai, Karur District, Tamil Nadu 639006', description: 'Ancient Murugan temple built on a small hill, attracting many devotees.' },
        { name: 'Amaravathi River View Point', rating: 4.7, address: 'Karur District, Tamil Nadu 639001', description: 'Peaceful riverbank spot popular for picnics and evening relaxation.' }
    ]
},
'namakkal': {
    schools: [
        { name: 'Green Park Matriculation Higher Secondary School', rating: 4.9, address: 'Kaveripatti, Namakkal, Tamil Nadu 637003', description: 'Top-ranked school emphasizing academic excellence and extracurricular success.' },
        { name: 'Kongu Matriculation Higher Secondary School', rating: 4.8, address: 'Thillaipuram, Namakkal, Tamil Nadu 637001', description: 'Leading private institution providing quality education with modern facilities.' },
        { name: 'RKV Matriculation Higher Secondary School', rating: 4.7, address: 'Salem Road, Namakkal, Tamil Nadu 637002', description: 'Reputed school offering strong foundation in science and mathematics.' },
        { name: 'Kendriya Vidyalaya Namakkal', rating: 4.7, address: 'Komarapalayam Road, Namakkal, Tamil Nadu 637003', description: 'Central government school providing holistic education under CBSE curriculum.' }
    ],
    restaurants: [
        { name: 'Hotel Arunachala', rating: 4.9, address: 'Salem Road, Namakkal, Tamil Nadu 637001', description: 'Highly-rated multi-cuisine restaurant known for authentic Tamil dishes and thalis.' },
        { name: 'Annapoorna Veg Restaurant', rating: 4.8, address: 'Thillaipuram, Namakkal, Tamil Nadu 637002', description: 'Pure vegetarian restaurant popular for South Indian meals and filter coffee.' },
        { name: 'Hotel Devi Towers', rating: 4.7, address: 'Trichy Main Road, Namakkal, Tamil Nadu 637003', description: 'Modern restaurant serving Indian, Chinese, and Continental cuisines.' },
        { name: 'A2B – Adyar Ananda Bhavan', rating: 4.6, address: 'Salem Main Road, Namakkal, Tamil Nadu 637001', description: 'Popular vegetarian restaurant chain offering sweets, snacks, and full meals.' }
    ],
    hospitals: [
        { name: 'Government District Headquarters Hospital', rating: 4.8, address: 'Namakkal, Tamil Nadu 637001', description: 'Major government hospital with 24-hour emergency and maternity services.' },
        { name: 'Kumar Hospital', rating: 4.7, address: 'Trichy Main Road, Namakkal, Tamil Nadu 637003', description: 'Private hospital offering general, surgical, and pediatric care.' },
        { name: 'Arun Hospital', rating: 4.6, address: 'Thillaipuram, Namakkal, Tamil Nadu 637002', description: 'Multi-specialty hospital known for orthopedics and cardiology departments.' },
        { name: 'Sakthi Hospital', rating: 4.5, address: 'Salem Road, Namakkal, Tamil Nadu 637001', description: 'Trusted healthcare center providing quality treatment and diagnostics.' }
    ],
    touristSpots: [
        { name: 'Namakkal Fort', rating: 5.0, address: 'Namakkal, Tamil Nadu 637001', description: 'Historic fort built on a hill offering panoramic city views and ancient temples.' },
        { name: 'Anjaneyar Temple', rating: 4.9, address: 'Namakkal, Tamil Nadu 637001', description: 'Famous Hanuman temple with a 18-foot tall statue carved from a single stone.' },
        { name: 'Kolli Hills', rating: 4.8, address: 'Kolli Hills, Namakkal District, Tamil Nadu', description: 'Scenic hill station known for waterfalls, trekking, and viewpoints.' },
        { name: 'Erumapatti Lake', rating: 4.6, address: 'Erumapatti, Namakkal District, Tamil Nadu', description: 'Serene lake popular for evening walks and photography.' }
    ]
},
'dharmapuri': {
    schools: [
        { name: 'Sri Vijay Vidyalaya Matriculation Higher Secondary School', rating: 4.9, address: 'Krishnagiri Road, Dharmapuri, Tamil Nadu 636701', description: 'Top school in Dharmapuri known for academic excellence and discipline.' },
        { name: 'Crescent Matriculation Higher Secondary School', rating: 4.8, address: 'Palacode Road, Dharmapuri, Tamil Nadu 636701', description: 'Renowned institution with modern infrastructure and holistic learning.' },
        { name: 'Kendriya Vidyalaya Dharmapuri', rating: 4.7, address: 'Pennagaram Road, Dharmapuri, Tamil Nadu 636701', description: 'CBSE-affiliated school under central government providing quality education.' },
        { name: 'St. Mary’s Matriculation School', rating: 4.6, address: 'Hosur Road, Dharmapuri, Tamil Nadu 636701', description: 'Popular English-medium school emphasizing values and co-curricular growth.' }
    ],
    restaurants: [
        { name: 'Hotel Sri Saravana Bhavan', rating: 4.9, address: 'Krishnagiri Main Road, Dharmapuri, Tamil Nadu 636701', description: 'Well-known vegetarian restaurant famous for South Indian breakfast and meals.' },
        { name: 'A2B – Adyar Ananda Bhavan', rating: 4.8, address: 'Bus Stand Road, Dharmapuri, Tamil Nadu 636701', description: 'Trusted chain restaurant serving pure vegetarian food and sweets.' },
        { name: 'Hotel Sri Krishna', rating: 4.7, address: 'NH44, Dharmapuri, Tamil Nadu 636701', description: 'Multi-cuisine restaurant offering North Indian, South Indian, and Chinese dishes.' },
        { name: 'The Family Tree Restaurant', rating: 4.6, address: 'Collectorate Road, Dharmapuri, Tamil Nadu 636701', description: 'Casual dining spot known for biryanis and continental cuisine.' }
    ],
    hospitals: [
        { name: 'Government Medical College and Hospital Dharmapuri', rating: 4.9, address: 'Nethaji Nagar, Dharmapuri, Tamil Nadu 636701', description: 'Leading government institution offering specialized medical treatment and education.' },
        { name: 'Sri Venkateshwara Hospital', rating: 4.7, address: 'Krishnagiri Road, Dharmapuri, Tamil Nadu 636701', description: 'Private multi-specialty hospital known for patient care and emergency services.' },
        { name: 'Rani Hospital', rating: 4.6, address: 'Bus Stand Road, Dharmapuri, Tamil Nadu 636701', description: 'Reliable hospital offering general medicine, maternity, and pediatric care.' },
        { name: 'Gokulam Hospital', rating: 4.5, address: 'Pennagaram Main Road, Dharmapuri, Tamil Nadu 636701', description: 'Modern healthcare facility with diagnostic and surgical departments.' }
    ],
    touristSpots: [
        { name: 'Hogenakkal Falls', rating: 5.0, address: 'Hogenakkal, Dharmapuri District, Tamil Nadu 636810', description: 'Stunning waterfalls on the Cauvery River, known as the “Niagara of South India.”' },
        { name: 'Theerthamalai Temple', rating: 4.9, address: 'Theerthamalai, Dharmapuri District, Tamil Nadu 636701', description: 'Ancient Shiva temple located atop a hill with breathtaking views.' },
        { name: 'Chenraya Perumal Temple', rating: 4.7, address: 'Adhiyamankottai, Dharmapuri District, Tamil Nadu', description: 'Historic temple dedicated to Lord Vishnu, featuring beautiful stone carvings.' },
        { name: 'Kottai Kovil Temple', rating: 4.6, address: 'Dharmapuri, Tamil Nadu 636701', description: 'Famous local temple known for its spiritual ambiance and architecture.' }
    ]
}
,
'krishnagiri': {
    schools: [
        { name: 'Bharathi Vidya Mandir Matriculation Higher Secondary School', rating: 4.9, address: 'Rayakottai Road, Krishnagiri, Tamil Nadu 635001', description: 'Top-tier school focusing on academic excellence and extracurricular activities.' },
        { name: 'Mahendra Matriculation Higher Secondary School', rating: 4.8, address: 'Hosur Road, Krishnagiri, Tamil Nadu 635001', description: 'Popular private school offering quality education with experienced faculty.' },
        { name: 'Kendriya Vidyalaya Krishnagiri', rating: 4.7, address: 'Collectorate Campus, Krishnagiri, Tamil Nadu 635001', description: 'Central government school providing holistic education under CBSE curriculum.' },
        { name: 'Don Bosco Matriculation Higher Secondary School', rating: 4.6, address: 'Oldpet, Krishnagiri, Tamil Nadu 635001', description: 'Renowned institution emphasizing discipline and character-based learning.' }
    ],
    restaurants: [
        { name: 'A2B – Adyar Ananda Bhavan', rating: 4.9, address: 'NH44, Krishnagiri, Tamil Nadu 635001', description: 'Popular vegetarian restaurant chain known for authentic South Indian dishes and sweets.' },
        { name: 'Hotel Tamilnadu (TTDC)', rating: 4.8, address: 'Salem Road, Krishnagiri, Tamil Nadu 635001', description: 'Government-run restaurant offering traditional Tamil cuisine and regional specialties.' },
        { name: 'Sri Saravana Bhavan', rating: 4.7, address: 'Bangalore Road, Krishnagiri, Tamil Nadu 635001', description: 'Classic family restaurant serving delicious South Indian vegetarian meals.' },
        { name: 'Krishna Bhavan', rating: 4.6, address: 'Bus Stand Road, Krishnagiri, Tamil Nadu 635001', description: 'Casual eatery offering breakfast, tiffin, and quick meals in a clean environment.' }
    ],
    hospitals: [
        { name: 'Government District Headquarters Hospital', rating: 4.8, address: 'Rayakottai Road, Krishnagiri, Tamil Nadu 635001', description: 'Major government hospital providing 24-hour emergency and general medical services.' },
        { name: 'Ashok Hospital', rating: 4.7, address: 'Bangalore Road, Krishnagiri, Tamil Nadu 635001', description: 'Private multi-specialty hospital offering surgical and maternity care.' },
        { name: 'Velan Hospital', rating: 4.6, address: 'Oldpet, Krishnagiri, Tamil Nadu 635001', description: 'Modern healthcare center specializing in orthopedics and general medicine.' },
        { name: 'Sri Lakshmi Hospital', rating: 4.5, address: 'Salem Road, Krishnagiri, Tamil Nadu 635001', description: 'Trusted hospital providing medical diagnostics and quality healthcare.' }
    ],
    touristSpots: [
        { name: 'Krishnagiri Dam', rating: 5.0, address: 'Krishnagiri, Tamil Nadu 635001', description: 'Scenic dam surrounded by hills, perfect for picnics and evening walks.' },
        { name: 'Rayakottai Fort', rating: 4.9, address: 'Rayakottai, Krishnagiri District, Tamil Nadu 635116', description: 'Historic fort offering panoramic views and trekking opportunities.' },
        { name: 'Government Museum Krishnagiri', rating: 4.7, address: 'Krishnagiri, Tamil Nadu 635001', description: 'Museum showcasing regional history, art, and archaeological artifacts.' },
        { name: 'Kelavarapalli Dam', rating: 4.7, address: 'Near Hosur, Krishnagiri District, Tamil Nadu 635109', description: 'Beautiful dam and picnic spot surrounded by serene natural beauty.' }
    ]
}
,












    };

    // Event Listeners
    searchBtn.addEventListener('click', handleSearch);
    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            // Update current category and display results
            currentCategory = btn.dataset.category;
            if (currentCategory === 'weather') {
                displayWeatherResults();
            } else {
                await displayResults();
            }
        });
    });

    // Functions
    function handleSearch() {
        const city = cityInput.value.trim().toLowerCase();
        if (city === '') {
            alert('Please enter a city name');
            return;
        }
        if (!cityDatabase[city]) {
            alert('City not found in our database');
            return;
        }
        currentCity = city;
        currentCategory = '';
        cityNameElement.textContent = capitalizeFirstLetter(currentCity);
        categoryTitleElement.textContent = 'Please select a category';
        resultsContainer.innerHTML = '';
        cityInfo.classList.remove('hidden');
        noResults.classList.add('hidden');
    }

    function displayResults() {
        if (!currentCity || !currentCategory) return;
        if (currentCategory === 'weather') return;
        
        // Map singular category names to plural database keys
        const categoryMap = {
            'school': 'schools',
            'restaurant': 'restaurants',
            'hospital': 'hospitals',
            'touristspot': 'touristspots'
        };
        
        const dbCategory = categoryMap[currentCategory] || currentCategory;
        const cityData = cityDatabase[currentCity];
        if (cityData && cityData[dbCategory]) {
            const results = cityData[dbCategory];
            categoryTitleElement.textContent = capitalizeFirstLetter(currentCategory);
            resultsContainer.innerHTML = '';
            results.forEach(item => {
                const resultCard = document.createElement('div');
                resultCard.className = 'result-card';
                resultCard.innerHTML = `
                    <h3>${item.name}</h3>
                    <p><strong>Rating:</strong> <span class="rating">${item.rating}/5</span></p>
                    <p><strong>Address:</strong> ${item.address}</p>
                    <p>${item.description}</p>
                `;
                resultsContainer.appendChild(resultCard);
            });
            cityInfo.classList.remove('hidden');
            noResults.classList.add('hidden');
        } else {
            cityInfo.classList.add('hidden');
            noResults.classList.remove('hidden');
        }
    }

    function displayWeatherResults() {
        if (!currentCity) return;
        categoryTitleElement.textContent = 'Weather';
        resultsContainer.innerHTML = '<div class="loading">Fetching weather data...</div>';
        cityInfo.classList.remove('hidden');
        noResults.classList.add('hidden');
        fetchWeather(currentCity)
            .then(weatherData => {
                resultsContainer.innerHTML = `
                    <div class="weather-results">
                        <div class="weather-day">
                            <h3>Yesterday</h3>
                            <p><strong>Temperature:</strong> ${weatherData.yesterday.temp}°C</p>
                            <p><strong>Condition:</strong> ${weatherData.yesterday.condition}</p>
                        </div>
                        <div class="weather-day">
                            <h3>Today</h3>
                            <p><strong>Temperature:</strong> ${weatherData.today.temp}°C</p>
                            <p><strong>Condition:</strong> ${weatherData.today.condition}</p>
                        </div>
                        <div class="weather-day">
                            <h3>Tomorrow</h3>
                            <p><strong>Temperature:</strong> ${weatherData.tomorrow.temp}°C</p>
                            <p><strong>Condition:</strong> ${weatherData.tomorrow.condition}</p>
                        </div>
                    </div>
                `;
            })
            .catch(() => {
                resultsContainer.innerHTML = '<div class="error">Weather data not available for this city.</div>';
            });
    }

    async function fetchWeather(city) {
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);
        const geoData = await geoRes.json();
        if (!geoData.results || geoData.results.length === 0) throw new Error('City not found');
        const { latitude, longitude } = geoData.results[0];
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const fmt = d => d.toISOString().split('T')[0];
        const [yData, tData] = await Promise.all([
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&start_date=${fmt(yesterday)}&end_date=${fmt(yesterday)}&hourly=temperature_2m,weathercode`).then(r => r.json()),
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&start_date=${fmt(today)}&end_date=${fmt(tomorrow)}&hourly=temperature_2m,weathercode`).then(r => r.json())
        ]);
        const getWeather = (data, date) => {
            const temps = [];
            let code = null;
            if (data.hourly && data.hourly.time) {
                for (let i = 0; i < data.hourly.time.length; i++) {
                    if (data.hourly.time[i].startsWith(date)) {
                        temps.push(data.hourly.temperature_2m[i]);
                        code = data.hourly.weathercode[i];
                    }
                }
            }
            const avgTemp = temps.length ? (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1) : 'N/A';
            return { temp: avgTemp, condition: weatherCodeToText(code) };
        };
        const weatherCodeToText = code => {
            const map = {
                0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast', 45: 'Fog', 48: 'Depositing rime fog',
                51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Dense drizzle', 56: 'Light freezing drizzle', 57: 'Dense freezing drizzle',
                61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain', 66: 'Light freezing rain', 67: 'Heavy freezing rain',
                71: 'Slight snow fall', 73: 'Moderate snow fall', 75: 'Heavy snow fall', 77: 'Snow grains',
                80: 'Slight rain showers', 81: 'Moderate rain showers', 82: 'Violent rain showers',
                85: 'Slight snow showers', 86: 'Heavy snow showers',
                95: 'Thunderstorm', 96: 'Thunderstorm with slight hail', 99: 'Thunderstorm with heavy hail'
            };
            return map[code] || 'Unknown';
        };
        return {
            yesterday: getWeather(yData, fmt(yesterday)),
            today: getWeather(tData, fmt(today)),
            tomorrow: getWeather(tData, fmt(tomorrow))
        };
    }

    function capitalizeFirstLetter(string) {
        return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    // Calculate and display city count
    const cityCountElement = document.getElementById('cityCount');
    if (cityCountElement) {
        try {
            const count = Object.keys(cityDatabase).length;
            cityCountElement.textContent = String(count);
        } catch (e) {
            console.error("Error calculating city count:", e);
        }
    }
});

