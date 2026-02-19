
import { validateCartItems } from '@/lib/payment-utils';
import { createClient } from '@supabase/supabase-js';

// Mock Supabase
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(),
}));

describe('validateCartItems', () => {
  const mockSelect = jest.fn();
  const mockIn = jest.fn();
  const mockSupabase = {
    from: jest.fn(() => ({
      select: mockSelect,
    })),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (createClient as jest.Mock).mockReturnValue(mockSupabase);
    mockSelect.mockReturnValue({ in: mockIn });
  });

  it('validates items correctly using a single query', async () => {
    const cartItems = [
      { id: 'p1', quantity: 1, name: 'Product 1', price: 100, slug: 'p1', image: 'img1' },
      { id: 'p2', quantity: 2, name: 'Product 2', price: 200, slug: 'p2', image: 'img2' },
    ];

    const dbProducts = [
      { id: 'p1', price: 1000, name: 'Real Product 1', slug: 'p1' },
      { id: 'p2', price: 2000, name: 'Real Product 2', slug: 'p2' },
    ];

    mockIn.mockResolvedValue({ data: dbProducts, error: null });

    const result = await validateCartItems(cartItems);

    expect(mockSupabase.from).toHaveBeenCalledWith('products');
    expect(mockSelect).toHaveBeenCalledWith('id, price, name, slug');
    // Verify it uses .in() with array of IDs
    expect(mockIn).toHaveBeenCalledWith('id', ['p1', 'p2']);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      id: 'p1',
      name: 'Real Product 1',
      price: 1000,
      quantity: 1,
    });
    expect(result[1]).toEqual({
      id: 'p2',
      name: 'Real Product 2',
      price: 2000,
      quantity: 2,
    });
  });

  it('throws error if a product is not found', async () => {
    const cartItems = [
      { id: 'p1', quantity: 1, name: 'Product 1', price: 100, slug: 'p1', image: 'img1' },
    ];

    mockIn.mockResolvedValue({ data: [], error: null }); // No products found

    await expect(validateCartItems(cartItems)).rejects.toThrow('Invalid product: p1');
  });

  it('throws error if database query fails', async () => {
    const cartItems = [
      { id: 'p1', quantity: 1, name: 'Product 1', price: 100, slug: 'p1', image: 'img1' },
    ];

    mockIn.mockResolvedValue({ data: null, error: { message: 'DB Error' } });

    await expect(validateCartItems(cartItems)).rejects.toThrow('Failed to validate products');
  });
});
