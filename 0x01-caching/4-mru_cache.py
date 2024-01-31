#!/usr/bin/env python3
""" 4-mru_cache module
"""
from base_caching import BaseCaching


class MRUCache(BaseCaching):
    """ MRUCache class:
    """

    def __init__(self):
        """ Initialize
        """
        super().__init__()
        self.keys = []

    def put(self, key, item):
        """ Add an item in the cache
        """
        if key is not None and item is not None:
            if key in self.cache_data:
                self.keys.remove(key)
            elif len(self.keys) == BaseCaching.MAX_ITEMS:
                discard = self.keys.pop()
                self.cache_data.pop(discard)
                print("DISCARD: {}".format(discard))
            self.keys.append(key)
            self.cache_data[key] = item

    def get(self, key):
        """ Get an item by key
        """
        if key is not None and key in self.cache_data:
            self.keys.remove(key)
            self.keys.append(key)
            return self.cache_data[key]
        else:
            return None
