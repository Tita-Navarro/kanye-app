import fetch from 'isomorphic-fetch';

export default async url=>{
    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
}