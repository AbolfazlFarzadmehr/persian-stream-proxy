import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import getSizeOfArrLinks from '../utils/getFileSize.js';

export default async function getMkvLinks(pageAddress) {
  try {
    const res = await fetch(pageAddress);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    const $ = cheerio.load(html);
    const mkvLinks = [];
    $('a').each((_, el) => {
      const href = $(el).attr('href');
      if (href?.endsWith('mkv') || href?.endsWith('mp4')) {
        mkvLinks.push({ url: href });
      }
    });
    const trailer = $('video').first().attr('src');
    if (trailer) mkvLinks.push({ url: trailer });
    return mkvLinks;
  } catch (err) {
    console.error(
      `Failed to get links from ${pageAddress} in film2media: ${err.message}`
    );
    return { err };
  }
}
