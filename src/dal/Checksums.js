import { get } from 'svelte/store';
import { raw_checksums } from '../stores';

async function fetchChecksums() {
  const currentChecksums = get(raw_checksums);
  const res = await fetch('__BASE_API_URL__' + 'checksums').catch(() => {
    throw new Error('Error fetching checksums...');
  });
  const checksum_data = await res.json();

  let names_to_fetch = [];

  if (!currentChecksums) {
    names_to_fetch = checksum_data;
  } else {
    checksum_data.forEach(checksum => {
      checkChecksum(names_to_fetch, currentChecksums, checksum);
    });
  }

  return names_to_fetch;
}

function checkChecksum(names_to_fetch, current_values, checksum) {
  const { name, hash } = checksum;
  const current_value = current_values.find(c => c.name === name);

  if (!current_value || current_value.hash !== hash) {
    names_to_fetch.push({
      name,
      hash,
    });
  }
}

export { fetchChecksums };
