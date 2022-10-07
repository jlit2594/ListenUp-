import React from 'react';

import Search from '../components/Search';
import TopSongsList from '../components/TopSongsList';

const Home = () => {
    return (
        <div>
            <Search />
            <TopSongsList songs={songs.top}/>
        </div>
    )
}

export default Home;