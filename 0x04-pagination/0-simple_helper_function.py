#!/usr/bin/env python3
""" Simple helper function """
from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """ Type-annotated function index_range that takes a integer arguments.
        Args:
            page: page number.
            page_size: number of items per page.
        Return:
            A tuple with a start index and an end index.
    """
    return ((page - 1) * page_size, page * page_size)
