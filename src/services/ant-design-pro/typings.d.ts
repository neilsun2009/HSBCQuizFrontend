declare namespace API {
  type Comment = {
    comment: string;
  };

  type AutoCompletionComment = {
    comment: string;
    isLoading: boolean;
  };

  type Keyword = {
    word: string;
    occurrence: number;
    rank: number;
  };

  type KeywordOccurrenceStat = {
    threshold: number;
    totalOccurrence: number;
    numWords: number;
  };

  type Product = {
    asin: string;
    avgOverall: number;
    avgRating: number;
    avgSentiment: number;
    brand: string;
    categories: string[];
    imageUrl: string;
    price: number;
    reviewCount: number;
    title: string;
  };

  type Customer = {
    customerId: string;
    cluster: number;
    name: string;
  };

  type CommentSample = {
    customer: Customer;
    product: Product;
    overall: number;
    sentiment: number;
    rating: number;
    summary: string;
    review: string;
    timestamp: number;
    wordCount: number;
  };

  type Overview = {
    customers: number;
    comments: number;
    products: number;
    keywords: number;
  };

  type BestWorstProductStat = {
    rank: number;
    samples: CommentSample[];
  };

  type ProductCommentCountStat = {
    category: string;
    count: number;
  };

  type CustomerClusterStat = {
    cluster: number;
    count: number;
    samples: CommentSample[];
  };

  type CustomerClusterPoint = {
    cluster: number;
    x: number;
    y: number;
  };

  type CommentRatingStat = {
    rating: number;
    count: number;
    samples: CommentSample[];
  };

  type CommonStat = {
    category: string;
    count: number;
    samples: CommentSample[];
  };
}
