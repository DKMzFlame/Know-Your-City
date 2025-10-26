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
},'balrampur': { 
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
