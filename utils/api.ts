import axios from "axios";

const apiUrl = "https://api.consumet.org";

export async function getPopularAnime(page=1){
    try {
        const data = await axios.get(`${apiUrl}/meta/anilist/popular?page=${page}`);
        return data.data;
    } catch (error) {
        return [];
    }
}
export async function getTrendingAnime(page=1){
    try {
        const data = await axios.get(`${apiUrl}/meta/anilist/trending?page=${page}`);
        return data.data;
    } catch (error) {
        return [];
    }
}


export async function getRecentEpisodes(page=1){
    try {
        const data = await axios.get(`${apiUrl}/meta/anilist/recent-episodes?page=${page}`);
        return data.data;
    } catch (error) {
        return [];
    }
}


//belom tau bener engganya
export async function searchAnime(query:string,page?:number|0){
    try {
        const data = await axios.get(`${apiUrl}/meta/anilist/advanced-search?query=${query}&page=${page}`);
        return data.data;
    } catch (error) {
        return [];
    }
}


export async function getAnimeInfo(id:string, dub = false){
    try {
        const data = await axios.get(`${apiUrl}/meta/anilist/info/${id}?provider=gogoanime&dub=${dub}`);
        return data.data;
    } catch (error) {
        return [];
    }
}

export async function getAnimeVideoLink(id:string){
  const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36"
    try {
        const data = await axios.get(`${apiUrl}/meta/anilist/watch/${id}`, {
            headers: {
                'User-Agent': USER_AGENT,
                'X-Requested-With': 'XMLHttpRequest',
            },
        });
        return data.data;
    } catch (error) {
        return [];
    }
}