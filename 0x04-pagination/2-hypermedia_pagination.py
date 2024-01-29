#!/usr/bin/env python3
""" Simple pagination """
import csv
import math
from typing import List
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


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """Get page
            Args:
                page: page number.
                page_size: number of items per page.
            Return:
                The appropriate page of the dataset.
        """
        self.dataset()
        for i in [page, page_size]:
            assert isinstance(i, int) and page > 0
        assert page_size > 0
        range_i = index_range(page, page_size)
        return self.__dataset[range_i[0]:range_i[1]]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> dict:
        """Get hypermedia pagination.
            Args:
                page: page number.
                page_size: number of items per page.
            Return:
                A dictionary.
        """
        data: int = self.get_page(page, page_size)
        totalPages: int = math.ceil(len(self.__dataset) / page_size)
        return {
            'page_size': len(data),
            'page': page,
            'data': data,
            'next_page': page + 1 if (page + 1) <= totalPages else None,
            'prev_page': page - 1 if (page - 1) > 0 else None,
            'total_pages': totalPages
        }
