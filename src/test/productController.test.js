const ProductController = require('../controllers/productController');
const product = require('../models/productModel');

// Mock Sequelize and Product Model
jest.mock('../models/productModel', () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
}));

describe('Product Controller', () => {
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  it('should create a new product', async () => {
    const req = { body: { productName: 'Test Product', price: 100, description: 'Test Description' } };
    const res = mockResponse();

    product.create.mockResolvedValue(req.body);
    await ProductController.createProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining(req.body));
  });

  it('should return all products', async () => {
    const req = {};
    const res = mockResponse();
    product.findAll.mockResolvedValue([{ id: 1, productName: 'Test Product' }]);

    await ProductController.getAllProducts(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.arrayContaining([{ id: 1, productName: 'Test Product' }])
    );
  });

  it('should return a product by ID', async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();
    product.findByPk.mockResolvedValue({ id: 1, productName: 'Test Product' });

    await ProductController.getProductById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));
  });

  it('should return 404 if product not found', async () => {
    const req = { params: { id: 2 } };
    const res = mockResponse();
    product.findByPk.mockResolvedValue(null);

    await ProductController.getProductById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Product not found' });
  });
});