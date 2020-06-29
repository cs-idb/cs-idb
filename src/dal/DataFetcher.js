import { raw_collections, raw_paintkits, raw_rarities, raw_skins, raw_weapons, raw_knives } from '../stores';
import localforage from 'localforage';

const sessionDataKey = 'csidb/loadeddata';
const pathsToFetch = {
  collections: raw_collections,
  paintkits: raw_paintkits,
  rarities: raw_rarities,
  weapons: raw_weapons,
  skins: raw_skins,
  knives: raw_knives 
};

async function isDataLoadedLocally() {
  const firstLocalItem = localforage.getItem(Object.keys(pathsToFetch)[0]);
  return firstLocalItem !== null;
}

function isSessionDataSet() {
  return sessionDataKey in sessionStorage;
}

function setSessionDataLoaded() {
  sessionStorage[sessionDataKey] = '1';
}

async function fetchData() {
  const promises = [];
  Object.keys(pathsToFetch).forEach(path => {
    promises.push(fetchSinglePath(path));
  });
  await Promise.all(promises);
}

async function fetchSinglePath(path) {
  const data = await baseFetch(path);
  pathsToFetch[path].set(data);
}

async function baseFetch(name) {
  const url = '__BASE_API_URL__' + name;
  const res = await fetch(url).catch(() => {
    throw new Error(`Error fetching ${name}...`);
  });
  const data = await res.json();
  return data;
}

export { isDataLoadedLocally, isSessionDataSet, setSessionDataLoaded, fetchData };
