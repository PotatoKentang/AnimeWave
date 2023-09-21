import axios from "axios";

const apiUrl = "https://api.consumet.org";

export async function getPopularAnime(){
    try {
        const data = await axios.get(`${apiUrl}/meta/anilist/popular`);
        return data.data;
    } catch (error) {
        return [];
    }
}
export async function getTrendingAnime(){
    try {
        const data = await axios.get(`${apiUrl}/meta/anilist/trending?perPage=24`);
        return data.data;
    } catch (error) {
        return [];
    }
}
export async function recentEpisode(){
    try {
        const data = await axios.get(`${apiUrl}/meta/anilist/recent-episodes`);
        return data.data;
    } catch (error) {
        return [];
    }
}

export async function searchAnime(query:string){
    try {
        const data = await axios.get(`${apiUrl}/meta/anilist/advanced-search?query=${query}&perPage=16`);
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