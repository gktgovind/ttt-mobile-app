const products = [
    'Laptop',
    'Smartphone',
    'Tablet',
    'Monitor',
    'Keyboard',
    'Mouse',
    'Headphones',
    'Camera',
    'Smartwatch',
    'Printer',
  ];
  
  export default function handler(req, res) {
    const { query } = req.query;
  
    if (!query || query.length < 3) {
      res.status(200).json({ suggestions: [] });
      return;
    }
  
    const lowercasedQuery = query.toLowerCase();
    const filteredProducts = products.filter(product =>
      product.toLowerCase().includes(lowercasedQuery)
    );
  
    res.status(200).json({ suggestions: filteredProducts });
  }
  