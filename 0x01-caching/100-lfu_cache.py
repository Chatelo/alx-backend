#!/usr/bin/env python3
""" 100-lfu_cache module
"""
from base_caching import BaseCaching


class LFUCache(BaseCaching):
    """ LFUCache class:
    """

    def __init__(self):
        """ Initialize
        """
        super().__init__()
        self.keys = []
        self.count = {}

    def put(self, key, item):
        """ Add an item in the cache
        """
        if key is not None and item is not None:
            if key in self.cache_data:
                self.keys.remove(key)
                self.count[key] += 1
            else:
                if len(self.keys) == BaseCaching.MAX_ITEMS:
                    min_freq_key = min(self.count, key=self.count.get)
                    self.keys.remove(min_freq_key)
                    self.cache_data.pop(min_freq_key)
                    self.count.pop(min_freq_key)
                    print("DISCARD: {}".format(min_freq_key))
                self.count[key] = 1
            self.keys.append(key)
            self.cache_data[key] = item

    def get(self, key):
        """ Get an item by key
        """
        if key is not None and key in self.cache_data:
            self.keys.remove(key)
            self.keys.append(key)
            self.count[key] += 1
            return self.cache_data[key]
        else:
            return None
