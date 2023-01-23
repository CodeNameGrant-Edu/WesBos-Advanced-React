import gql from 'graphql-tag';
import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    //  Tells apollo that this function will handle "everything" (no clue what that encompasses)
    keyArgs: false,

    // Runs when Apollo queries the cache for data to serve
    read(existing = [], { args, cache }) {
      // console.log('read', { existing, args, cache });
      const { skip, first } = args;

      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;

      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      const items = existing.slice(skip, skip + first).filter((item) => item); // Filters out undefined items

      // 2.1 If there are fewer items that the number requested and we are on the last page
      // JUST SEND IT
      if (items.length && items.length !== first && page === pages) {
        return items;
      }

      if (items.length !== first) {
        // 1. return false, which triggers a network request
        return false;
      }

      // 2.2 Return items that are already in cache
      if (items.length) {
        return items;
      }

      // Fallback to network request
      return false;
    },

    // Runs when apollo client comes back from network with items
    merge(existing, incoming, { args }) {
      // console.log('merge', { existing, incoming, args });
      const merged = existing ? existing.slice(0) : [];
      const { skip } = args;

      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }

      // Return merged items to be cached
      return merged;
    }
  };
}
