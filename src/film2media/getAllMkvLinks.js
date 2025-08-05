import { nodeEnv } from '../config.js';

export default async function getAllMkvLinks(imdbId) {
  try {
    const pageAddress = await this.getPageAddress(imdbId);
    if (pageAddress?.err) throw new Error(pageAddress.err.message);
    nodeEnv === 'development' && console.log({ pageAddress });
    if (!pageAddress) return { mkvLinks: [], provider: this.name };
    const mkvLinks = await this.getMkvLinks(pageAddress);
    if (mkvLinks?.err) throw new Error(mkvLinks?.err.message);
    nodeEnv === 'development' && console.log({ mkvLinks });
    return { mkvLinks, provider: this.name };
  } catch (err) {
    console.error(`Failed to create mkvLinks in film2media: ${err.message}`);
    return { mkvLinks: [], provider: this.name, err };
  }
}
