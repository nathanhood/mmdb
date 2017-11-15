const seedData = [
    {
        vote_count: 8527,
        id: 278,
        video: false,
        vote_average: 8.5,
        title: 'The Shawshank Redemption',
        popularity: 64.298786,
        poster_path: '/9O7gLzmreU0nGkIB6K3BsJbzvNv.jpg',
        original_language: 'en',
        original_title: 'The Shawshank Redemption',
        genre_ids: [
            18,
            80
        ],
        backdrop_path: '/xBKGJQsAIeweesB79KC89FpBrVr.jpg',
        adult: false,
        overview: 'Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.',
        release_date: '1994-09-23',
    },
    {
        vote_count: 6189,
        id: 238,
        video: false,
        vote_average: 8.5,
        title: 'The Godfather',
        popularity: 58.674777,
        poster_path: '/rPdtLWNsZmAtoZl9PK7S2wE3qiS.jpg',
        original_language: 'en',
        original_title: 'The Godfather',
        genre_ids: [
            18,
            80
        ],
        backdrop_path: '/6xKCYgH16UuwEGAyroLU6p8HLIn.jpg',
        adult: false,
        overview: 'Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.',
        release_date: '1972-03-14',
    },
    {
        vote_count: 76,
        id: 414419,
        video: false,
        vote_average: 8.4,
        title: 'Kill Bill: The Whole Bloody Affair',
        popularity: 8.533859,
        poster_path: '/a9CRI9V1xGRQVNDEMnLvmoQCpQn.jpg',
        original_language: 'en',
        original_title: 'Kill Bill: The Whole Bloody Affair',
        genre_ids: [
            80,
            28
        ],
        backdrop_path: '/lCQ5SxicnUrTpRHgeueD1HLhst4.jpg',
        adult: false,
        overview: 'Kill Bill: The Whole Bloody affair is a complete edit of the two part martial arts action films Kill Bill: Volume 1 and Kill Bill: Volume 2. The film was originally scheduled to be released as one part. However, due to the film\'s over 4 hour running time, it was split into two parts.',
        release_date: '2011-03-28',
    },
    {
        vote_count: 4588,
        id: 424,
        video: false,
        vote_average: 8.3,
        title: 'Schindler\'s List',
        popularity: 50.482688,
        poster_path: '/yPisjyLweCl1tbgwgtzBCNCBle.jpg',
        original_language: 'en',
        original_title: 'Schindler\'s List',
        genre_ids: [
            18,
            36,
            10752
        ],
        backdrop_path: '/rIpSszng8P0DL0TimSzZbpfnvh1.jpg',
        adult: false,
        overview: 'The true story of how businessman Oskar Schindler saved over a thousand Jewish lives from the Nazis while they worked as slaves in his factory during World War II.',
        release_date: '1993-11-29',
    },
    {
        vote_count: 4127,
        id: 129,
        video: false,
        vote_average: 8.3,
        title: 'Spirited Away',
        popularity: 50.006412,
        poster_path: '/dL11DBPcRhWWnJcFXl9A07MrqTI.jpg',
        original_language: 'ja',
        original_title: '千と千尋の神隠し',
        genre_ids: [
            16,
            10751,
            14
        ],
        backdrop_path: '/mnpRKVSXBX6jb56nabvmGKA0Wig.jpg',
        adult: false,
        overview: 'A young girl, Chihiro, becomes trapped in a strange new world of spirits. When her parents undergo a mysterious transformation, she must call upon the courage she never knew she had to free her family.',
        release_date: '2001-07-20',
    },
    {
        vote_count: 3525,
        id: 240,
        video: false,
        vote_average: 8.3,
        title: 'The Godfather: Part II',
        popularity: 45.826902,
        poster_path: '/bVq65huQ8vHDd1a4Z37QtuyEvpA.jpg',
        original_language: 'en',
        original_title: 'The Godfather: Part II',
        genre_ids: [
            18,
            80
        ],
        backdrop_path: '/gLbBRyS7MBrmVUNce91Hmx9vzqI.jpg',
        adult: false,
        overview: 'In the continuing saga of the Corleone crime family, a young Vito Corleone grows up in Sicily and in 1910s New York. In the 1950s, Michael Corleone attempts to expand the family business into Las Vegas, Hollywood and Cuba.',
        release_date: '1974-12-20',
    },
    {
        vote_count: 4507,
        id: 244786,
        video: false,
        vote_average: 8.3,
        title: 'Whiplash',
        popularity: 110.538777,
        poster_path: '/lIv1QinFqz4dlp5U4lQ6HaiskOZ.jpg',
        original_language: 'en',
        original_title: 'Whiplash',
        genre_ids: [
            18
        ],
        backdrop_path: '/6bbZ6XyvgfjhQwbplnUh1LSj1ky.jpg',
        adult: false,
        overview: 'Under the direction of a ruthless instructor, a talented young drummer begins to pursue perfection at any cost, even his humanity.',
        release_date: '2014-10-10',
    },
    {
        vote_count: 77,
        id: 38288,
        video: false,
        vote_average: 8.3,
        title: 'I Corti',
        popularity: 9.087201,
        poster_path: '/82KeyiTv5lyfz4K2KzokXJrn7kR.jpg',
        original_language: 'it',
        original_title: 'I Corti',
        genre_ids: [],
        backdrop_path: '/y1YrEQazmKcEKgMi4w0JqxxssGX.jpg',
        adult: false,
        overview: 'The shorts of Aldo , Giovanni &amp; Giacomo was the first theatrical show of the trio of comedians Aldo , Giovanni &amp; Giacomo , with the participation of Marina Massironi .  The show is the son of the fortunate trio \'s holdings in television as Mai dire Gol, and shows such as The Circus by Paolo Rossi and on the head !  The short was recorded live at the Teatro Nuovo in Ferrara on 28 and 29 March 1996. Produced by Agidi , the theater director is entrusted to the change artist Arturo Brachetti .',
        release_date: '1996-01-01',
    },
    {
        vote_count: 132,
        id: 40096,
        video: false,
        vote_average: 8.3,
        title: 'A Dog\'s Will',
        popularity: 17.880259,
        poster_path: '/uHEmM49YphluJnGep8Ef1qwD2QX.jpg',
        original_language: 'pt',
        original_title: 'O Auto da Compadecida',
        genre_ids: [
            12,
            35,
            18
        ],
        backdrop_path: '/alQqTpmEkxSLgajfEYTsTH6nAKB.jpg',
        adult: false,
        overview: 'The lively João Grilo and the sly Chicó are poor guys living in the hinterland who cheat a bunch of people in a small Northeast Brazil town. But when they die, they have to be judged by Christ, the Devil and the Virgin Mary, before they are admitted to paradise.',
        release_date: '2000-09-10',
    },
    {
        vote_count: 9979,
        id: 550,
        video: false,
        vote_average: 8.3,
        title: 'Fight Club',
        popularity: 61.998842,
        poster_path: '/adw6Lq9FiC9zjYEpOqfq03ituwp.jpg',
        original_language: 'en',
        original_title: 'Fight Club',
        genre_ids: [
            18
        ],
        backdrop_path: '/8uO0gUM8aNqYLs1OsTBQiXu0fEv.jpg',
        adult: false,
        overview: 'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground \'fight clubs\' forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.',
        release_date: '1999-10-15',
    },
    {
        vote_count: 194,
        id: 455661,
        video: false,
        vote_average: 8.3,
        title: 'In a Heartbeat',
        popularity: 39.719455,
        poster_path: '/wJUJROdLOtOzMixkjkx1aaZGSLl.jpg',
        original_language: 'en',
        original_title: 'In a Heartbeat',
        genre_ids: [
            10751,
            16,
            10749,
            35
        ],
        backdrop_path: '/4datX8btikWEikf7esqEe6fhw.jpg',
        adult: false,
        overview: 'A closeted boy runs the risk of being outed by his own heart after it pops out of his chest to chase down the boy of his dreams.',
        release_date: '2017-06-01',
    },
    {
        vote_count: 3814,
        id: 637,
        video: false,
        vote_average: 8.3,
        title: 'Life Is Beautiful',
        popularity: 49.931946,
        poster_path: '/f7DImXDebOs148U4uPjI61iDvaK.jpg',
        original_language: 'it',
        original_title: 'La vita è bella',
        genre_ids: [
            35,
            18
        ],
        backdrop_path: '/bORe0eI72D874TMawOOFvqWS6Xe.jpg',
        adult: false,
        overview: 'A touching story of an Italian book seller of Jewish ancestry who lives in his own little fairy tale. His creative and happy life would come to an abrupt halt when his entire family is deported to a concentration camp during World War II. While locked up he tries to convince his son that the whole thing is just a game.',
        release_date: '1997-12-20',
    },
    {
        vote_count: 2518,
        id: 539,
        video: false,
        vote_average: 8.3,
        title: 'Psycho',
        popularity: 41.32961,
        poster_path: '/81d8oyEFgj7FlxJqSDXWr8JH8kV.jpg',
        original_language: 'en',
        original_title: 'Psycho',
        genre_ids: [
            18,
            27,
            53
        ],
        backdrop_path: '/3md49VBCeqY6MSNyAVY6d5eC6bA.jpg',
        adult: false,
        overview: 'When larcenous real estate clerk Marion Crane goes on the lam with a wad of cash and hopes of starting a new life, she ends up at the notorious Bates Motel, where manager Norman Bates cares for his housebound mother. The place seems quirky, but fine… until Marion decides to take a shower.',
        release_date: '1960-06-16',
    },
    {
        vote_count: 8985,
        id: 680,
        video: false,
        vote_average: 8.3,
        title: 'Pulp Fiction',
        popularity: 217.613767,
        poster_path: '/dM2w364MScsjFf8pfMbaWUcWrR.jpg',
        original_language: 'en',
        original_title: 'Pulp Fiction',
        genre_ids: [
            53,
            80
        ],
        backdrop_path: '/9rZg1J6vMQoDVSgRyWcpJa8IAGy.jpg',
        adult: false,
        overview: 'A burger-loving hit man, his philosophical partner, a drug-addled gangster\'s moll and a washed-up boxer converge in this sprawling, comedic crime caper. Their adventures unfurl in three stories that ingeniously trip back and forth in time.',
        release_date: '1994-09-10',
    },
    {
        vote_count: 3109,
        id: 510,
        video: false,
        vote_average: 8.3,
        title: 'One Flew Over the Cuckoo\'s Nest',
        popularity: 44.208521,
        poster_path: '/2Sns5oMb356JNdBHgBETjIpRYy9.jpg',
        original_language: 'en',
        original_title: 'One Flew Over the Cuckoo\'s Nest',
        genre_ids: [
            18
        ],
        backdrop_path: '/4E7YQcwui0PfNXguf4V2X8YocPC.jpg',
        adult: false,
        overview: 'While serving time for insanity at a state mental hospital, implacable rabble-rouser, Randle Patrick McMurphy inspires his fellow patients to rebel against the authoritarian rule of head nurse, Mildred Ratched.',
        release_date: '1975-11-18',
    },
    {
        vote_count: 258,
        id: 374430,
        video: false,
        vote_average: 8.3,
        title: 'Black Mirror: White Christmas',
        popularity: 39.556499,
        poster_path: '/he609rnU3tiwBjRklKNa4n2jQSd.jpg',
        original_language: 'en',
        original_title: 'Black Mirror: White Christmas',
        genre_ids: [
            18,
            27,
            9648,
            878,
            53,
            10770
        ],
        backdrop_path: '/rMCew7St2vy9iV3QOPzx15sAkFJ.jpg',
        adult: false,
        overview: 'This feature-length special consists of three interwoven stories. In a mysterious and remote snowy outpost, Matt and Potter share a Christmas meal, swapping creepy tales of their earlier lives in the outside world. Matt is a charismatic American trying to bring the reserved, secretive Potter out of his shell. But are both men who they appear to be? A woman gets thrust into a nightmarish world of \'smart\' gadgetry. Plus a look at what would happen if you could \'block\' people in real life.',
        release_date: '2014-12-16',
    },
    {
        vote_count: 12529,
        id: 155,
        video: false,
        vote_average: 8.3,
        title: 'The Dark Knight',
        popularity: 66.858435,
        poster_path: '/1hRoyzDtpgMU7Dz4JF22RANzQO7.jpg',
        original_language: 'en',
        original_title: 'The Dark Knight',
        genre_ids: [
            18,
            28,
            80,
            53
        ],
        backdrop_path: '/hqkIcbrOHL86UncnHIsHVcVmzue.jpg',
        adult: false,
        overview: 'Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.',
        release_date: '2008-07-16',
    },
    {
        vote_count: 309,
        id: 313106,
        video: false,
        vote_average: 8.3,
        title: 'Doctor Who: The Day of the Doctor',
        popularity: 11.548352,
        poster_path: '/lQy2QVcacuH55k37K9Ox0gw3YpZ.jpg',
        original_language: 'en',
        original_title: 'Doctor Who: The Day of the Doctor',
        genre_ids: [
            878,
            12
        ],
        backdrop_path: '/8bxjRFqFztBoXdVEx6q2u66a0s1.jpg',
        adult: false,
        overview: 'In 2013, something terrible is awakening in London\'s National Gallery; in 1562, a murderous plot is afoot in Elizabethan England; and somewhere in space an ancient battle reaches its devastating conclusion. All of reality is at stake as the Doctor\'s own dangerous past comes back to haunt him.',
        release_date: '2013-11-23',
    }
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    const posters = seedData.map(movie => ({
        fileName: movie.poster_path.replace('/', ''),
        width: 1000,
        height: 1000,
        extension: 'jpg',
        type: 'poster',
        createdAt: new Date(),
        updatedAt: new Date(),
    }));

    const backdrops = seedData.map(movie => ({
        fileName: movie.backdrop_path.replace('/', ''),
        width: 1000,
        height: 1000,
        extension: 'jpg',
        type: 'backdrop',
        createdAt: new Date(),
        updatedAt: new Date(),
    }));

    const movies = seedData.map((movie) => ({
        tmdbId: movie.id,
        imdbId: movie.imdb_id,
        title: movie.title,
        slug: movie.title.toLowerCase().replace(' ', '-'),
        overview: movie.overview,
        tagline: movie.tagline,
        releaseDate: new Date(movie.release_date),
        poster: movie.poster_path,
        backdrop: movie.backdrop_path,
        rating: (Math.ceil(Math.random() * 100)),
        status: 'Released',
        budget: 100,
        revenue: 100,
        language: 'en',
        createdAt: new Date(),
        updatedAt: new Date(),
    }));

    const userMovies = seedData.map((movie, i) => ({
        userId: 1,
        movieId: i + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    }));

    const movieGenre = seedData.map((movie, i) => ({
        movieId: i + 1,
        genreId: (Math.ceil(Math.random() * 19)),
        createdAt: new Date(),
        updatedAt: new Date(),
    }));

    return queryInterface.bulkInsert('Images', posters, {})
        .then(() => queryInterface.bulkInsert('Images', backdrops, {}))
        .then(() => queryInterface.bulkInsert('Movies', movies, {}))
        .then(() => queryInterface.bulkInsert('MovieGenres', movieGenre, {}))
        .then(() => queryInterface.bulkInsert('UserMovies', userMovies, {}));
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Images', null, {})
        .then(() => queryInterface.bulkDelete('Movies'))
        .then(() => queryInterface.bulkDelete('UserMovies'));
  }
};
