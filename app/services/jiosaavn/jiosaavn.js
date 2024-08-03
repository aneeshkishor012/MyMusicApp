import React, { useState, useEffect, useMemo } from 'react';

/**********************Global Search Songs, Artist, Albums and Playlists**********************/
async function jioSaavnGblSearch(query, page = 1, limit = 10) {
    /* function to get songs, album, artist and playlist */
    try {
        let response = await fetch(`https://saavn.dev/api/search?query=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
        return await response.json();
    } catch (err) {
        console.error('Error fetching data from JioSaavn:', err);
        throw err;
    }
}

export function useJioSaavnSearch(query) {
    /* hook which will get and return the songs, album, artist and playlist */
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!query) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await jioSaavnGblSearch(query);
                setResults(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [query]);

    return { results, loading, error };
}

/**********************Search Song with Song_id**********************/
async function getSongWithId(id) {
    /* function to get a single songs */
    try {
        let response = await fetch(`https://saavn.dev/api/songs/${id}`);
        return await response.json();
    } catch (err) {
        console.error('Error fetching data from JioSaavn:', err);
        throw err;
    }
}

export function useGetSongWithId(id) {
    /* hook which will get and return the song */
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getSongWithId(id);
                setResults(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    return { results, loading, error };
}

/**********************Search Song with Song_id**********************/

async function getPlayListWithId(id, page, limit) {
    /* function to get a single playlist */
    try {
        let link = `https://saavn.dev/api/playlists?id=${encodeURIComponent(id)}&page=${page}&limit=${limit}`
        console.log(JSON.stringify(link));
        const response = await fetch(link);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return await response.json();
    } catch (err) {
        console.error('Error fetching data from JioSaavn:', err);
        throw err;
    }
}

export function useGetPlayListWithId(id, totalPlayList) {
    /* hook which will get and return the playlist */
    const [selPlayListResults, setSelPlayListResults] = useState({});
    const [selPlayListLoading, setSelPlayListLoading] = useState(false);
    const [selPlayListError, setSelPlayListError] = useState(null);

    useEffect(() => {
        const limit = 10;

        if (!id) return;

        let isMounted = true;

        const fetchData = async () => {
            let page = 1;
            let allPlayList = [];
            let hasMorePages = true;

            setSelPlayListLoading(true);
            setSelPlayListError(null);
            try {
                const initialData = await getPlayListWithId(id, page, limit);
                const totalSongs = totalPlayList;
                const maxPages = Math.min(10, Math.ceil(totalSongs / limit));

                let data = {}
                while (hasMorePages && page <= maxPages) {
                    data = page === 1 ? initialData : await getPlayListWithId(id, page, limit);

                    let newResults = data.data.songs ?? [];

                    newResults = newResults.map(song => ({
                        ...song,
                        description: `${song?.label} ${song?.releaseDate}`,
                        imageUri: song?.image[2]?.url,
                        url: song?.downloadUrl[4]?.url,
                        duration: (song?.duration / 60).toFixed(2) // Convert to minutes and format to 2 decimal places
                    }));

                    allPlayList = [...allPlayList, ...newResults];

                    hasMorePages = page < maxPages;
                    page++;
                    data.data.songList = allPlayList;
                    data.data.url = data.data.image[2]?.url;
                }
                if (isMounted) {
                    setSelPlayListResults(data.data.songList);
                }
            } catch (err) {
                if (isMounted) {
                    setSelPlayListError(err);
                }
            } finally {
                if (isMounted) {
                    setSelPlayListLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [id]);

    return { selPlayListResults, selPlayListLoading, selPlayListError };
}

/**********************Search SongList**********************/
async function getSongListOnSearch(query, page, limit) {
    /* function to get a single songs */
    try {
        let response = await fetch(`https://saavn.dev/api/search/songs?query=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
        return await response.json();
    } catch (err) {
        console.error('Error fetching data from JioSaavn:', err);
        throw err;
    }
}

export function useGetSongListOnSearch(query) {
    /* hook which will get and return the song */
    const limit = 10;

    const [searchSongList, setSearchSongList] = useState([]);
    const [searchSongListLoading, setSearchSongListLoading] = useState(null);
    const [searchSongListError, setSearchSongListError] = useState(null);

    useEffect(() => {
        if (!query) return;

        const fetchData = async () => {
            let page = 1;
            let allSongs = [];
            let hasMorePages = true;

            setSearchSongListLoading(true);
            setSearchSongListError(null);

            try {
                const initialData = await getSongListOnSearch(query, page, limit);
                const totalSongs = initialData.data.total;
                const maxPages = Math.min(10, Math.ceil(totalSongs / limit));

                while (hasMorePages && page <= maxPages) {
                    const data = page === 1 ? initialData : await getSongListOnSearch(query, page, limit);
                    let newResults = data.data.results ?? [];

                    // Convert duration from seconds to minutes
                    newResults = newResults.map(song => ({
                        description: song?.artists?.primary[0]?.name,
                        imageUri: song?.image[2]?.url,
                        ...song,
                        url: song?.downloadUrl[4]?.url,
                        duration: (song?.duration / 60).toFixed(2) // Convert to minutes and format to 2 decimal places
                    }));

                    allSongs = [...allSongs, ...newResults];

                    hasMorePages = page < maxPages;
                    page++;
                }
                // console.log("-------------------------------------------------------------------------------------------------------------------------------");
                // console.log(JSON.stringify(allSongs));
                // console.log("-------------------------------------------------------------------------------------------------------------------------------");
                setSearchSongList(allSongs);
            } catch (err) {
                setSearchSongListError(err);
            } finally {
                setSearchSongListLoading(false);
            }
        };

        fetchData();
    }, [query]);

    return { searchSongList, searchSongListLoading, searchSongListError };
}

/**********************Search ArtistList**********************/

async function getArtistListOnSearch(query, page, limit) {
    try {
        let response = await fetch(`https://saavn.dev/api/search/artists?query=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
        return await response.json();
    } catch (err) {
        console.error('Error fetching data from JioSaavn:', err);
        throw err;
    }
}

export function useGetArtistListOnSearch(query) {
    const limit = 10;
    const [searchArtistList, setSearchArtistList] = useState([]);
    const [searchArtistListLoading, setSearchArtistListLoading] = useState(null);
    const [searchArtistListError, setSearchArtistListError] = useState(null);

    useEffect(() => {
        if (!query) return;

        const fetchData = async () => {
            let page = 1;
            let allArtist = [];
            let hasMorePages = true;

            setSearchArtistListLoading(true);
            setSearchArtistListError(null);

            try {
                const initialData = await getArtistListOnSearch(query, page, limit);
                const totalArtist = initialData.data.total;
                const maxPages = Math.min(5, Math.ceil(totalArtist / limit));

                while (hasMorePages && page <= maxPages) {
                    const data = page === 1 ? initialData : await getArtistListOnSearch(query, page, limit);
                    let newResults = data.data.results ?? [];
                    newResults = newResults.map(song => ({
                        description: song?.role,
                        imageUri: song?.image[2].url,
                        ...song
                    }));
                    allArtist = [...allArtist, ...newResults];
                    hasMorePages = page < maxPages;
                    page++;
                }
                setSearchArtistList(allArtist);
            } catch (err) {
                setSearchArtistListError(err);
            } finally {
                setSearchArtistListLoading(false);
            }
        };

        fetchData();
    }, [query]);

    return { searchArtistList, searchArtistListLoading, searchArtistListError };
}

/**********************Search AlbumList**********************/

async function getAlbumListOnSearch(query, page, limit) {
    try {
        let response = await fetch(`https://saavn.dev/api/search/albums?query=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
        return await response.json();
    } catch (err) {
        console.error('Error fetching data from JioSaavn:', err);
        throw err;
    }
}

export function useGetAlbumListOnSearch(query) {
    const limit = 10;
    const [searchAlbumList, setSearchAlbumList] = useState([]);
    const [searchAlbumListLoading, setSearchAlbumListLoading] = useState(null);
    const [searchAlbumListError, setSearchAlbumListError] = useState(null);

    useEffect(() => {
        if (!query) return;

        const fetchData = async () => {
            let page = 1;
            let allAlbum = [];
            let hasMorePages = true;

            setSearchAlbumListLoading(true);
            setSearchAlbumListError(null);

            try {
                const initialData = await getAlbumListOnSearch(query, page, limit);
                const totalAlbum = initialData.data.total;
                const maxPages = Math.min(5, Math.ceil(totalAlbum / limit));

                while (hasMorePages && page <= maxPages) {
                    const data = page === 1 ? initialData : await getAlbumListOnSearch(query, page, limit);
                    let newResults = data.data.results ?? [];

                    // Convert duration from seconds to minutes
                    newResults = newResults.map(song => ({
                        description: song?.artists?.primary[0]?.name,
                        imageUri: song?.image[2]?.url,
                        ...song
                    }));

                    allAlbum = [...allAlbum, ...newResults];

                    hasMorePages = page < maxPages;
                    page++;
                }
                setSearchAlbumList(allAlbum);
            } catch (err) {
                setSearchAlbumListError(err);
            } finally {
                setSearchAlbumListLoading(false);
            }
        };

        fetchData();
    }, [query]);

    return { searchAlbumList, searchAlbumListLoading, searchAlbumListError };
}

/**********************Search PlayList**********************/

async function getPlayListOnSearch(query, page, limit) {
    try {
        let response = await fetch(`https://saavn.dev/api/search/playlists?query=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
        return await response.json();
    } catch (err) {
        console.error('Error fetching data from JioSaavn:', err);
        throw err;
    }
}

export function useGetPlayListOnSearch(query) {
    const limit = 10;
    const [searchPlayList, setSearchPlayList] = useState([]);
    const [searchPlayListLoading, setSearchPlayListLoading] = useState(null);
    const [searchPlayListError, setSearchPlayListError] = useState(null);

    useEffect(() => {
        if (!query) return;

        const fetchData = async () => {
            let page = 1;
            let allPlayList = [];
            let hasMorePages = true;

            setSearchPlayListLoading(true);
            setSearchPlayListError(null);

            try {
                const initialData = await getPlayListOnSearch(query, page, limit);
                const totalPlayList = initialData.data.total;
                const maxPages = Math.min(5, Math.ceil(totalPlayList / limit));

                while (hasMorePages && page <= maxPages) {
                    const data = page === 1 ? initialData : await getPlayListOnSearch(query, page, limit);
                    let newResults = data.data.results ?? [];

                    newResults = newResults.map(song => ({
                        description: song?.songCount,
                        imageUri: song?.image[2]?.url,
                        ...song
                    }));

                    allPlayList = [...allPlayList, ...newResults];

                    hasMorePages = page < maxPages;
                    page++;
                }
                setSearchPlayList(allPlayList);
            } catch (err) {
                setSearchPlayListError(err);
            } finally {
                setSearchPlayListLoading(false);
            }
        };

        fetchData();
    }, [query]);

    return { searchPlayList, searchPlayListLoading, searchPlayListError };
}



